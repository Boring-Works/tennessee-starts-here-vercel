import { type NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

// USGS Water Services API
// Documentation: https://waterservices.usgs.gov/rest/IV-Service.html

interface USGSSite {
  siteCode: string
  siteName: string
  latitude: number
  longitude: number
}

interface USGSReading {
  siteCode: string
  siteName: string
  gageHeight: number | null
  streamflow: number | null
  timestamp: string
}

// Known USGS stations near Sullivan County, TN
// These are pre-selected stations in the region
const REGIONAL_STATIONS: USGSSite[] = [
  {
    siteCode: '03473000',
    siteName: 'South Fork Holston River at Bluff City',
    latitude: 36.4731,
    longitude: -82.2606,
  },
  {
    siteCode: '03474000',
    siteName: 'Holston River near Rogersville',
    latitude: 36.4153,
    longitude: -82.9642,
  },
  {
    siteCode: '03471500',
    siteName: 'Watauga River at Johnson City',
    latitude: 36.3192,
    longitude: -82.3522,
  },
  {
    siteCode: '03469000',
    siteName: 'South Holston River near Damascus',
    latitude: 36.6303,
    longitude: -81.8044,
  },
  {
    siteCode: '03475000',
    siteName: 'North Fork Holston River near Gate City',
    latitude: 36.6378,
    longitude: -82.5831,
  },
]

/**
 * Calculate distance between two points using Haversine formula
 */
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Find the nearest station to the given coordinates
 */
function findNearestStation(
  lat: number,
  lon: number,
  maxDistance: number = 50
): { station: USGSSite; distance: number } | null {
  let nearest: { station: USGSSite; distance: number } | null = null

  for (const station of REGIONAL_STATIONS) {
    const distance = haversineDistance(lat, lon, station.latitude, station.longitude)
    if (distance <= maxDistance && (!nearest || distance < nearest.distance)) {
      nearest = { station, distance }
    }
  }

  return nearest
}

/**
 * Fetch current readings from USGS for a specific station
 * Parameter codes:
 * - 00065: Gage height (ft)
 * - 00060: Streamflow (cfs)
 */
async function fetchUSGSData(siteCode: string): Promise<USGSReading | null> {
  const url = new URL('https://waterservices.usgs.gov/nwis/iv/')
  url.searchParams.set('format', 'json')
  url.searchParams.set('sites', siteCode)
  url.searchParams.set('parameterCd', '00065,00060')
  url.searchParams.set('siteStatus', 'active')

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 900 }, // Cache for 15 minutes
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    if (!data.value?.timeSeries?.length) {
      return null
    }

    const timeSeries = data.value.timeSeries
    let gageHeight: number | null = null
    let streamflow: number | null = null
    let timestamp = ''
    let siteName = ''

    for (const series of timeSeries) {
      const paramCode = series.variable?.variableCode?.[0]?.value
      const values = series.values?.[0]?.value

      if (!siteName && series.sourceInfo?.siteName) {
        siteName = series.sourceInfo.siteName
      }

      if (values?.length > 0) {
        const latestValue = values[values.length - 1]
        const numValue = parseFloat(latestValue.value)

        if (!Number.isNaN(numValue) && numValue >= 0) {
          if (paramCode === '00065') {
            gageHeight = numValue
            timestamp = latestValue.dateTime
          } else if (paramCode === '00060') {
            streamflow = numValue
            if (!timestamp) timestamp = latestValue.dateTime
          }
        }
      }
    }

    return {
      siteCode,
      siteName,
      gageHeight,
      streamflow,
      timestamp,
    }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = parseFloat(searchParams.get('lat') || '')
  const lon = parseFloat(searchParams.get('lon') || '')

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 })
  }

  // Round coordinates to 2 decimal places for cache efficiency
  const latRounded = Math.round(lat * 100) / 100
  const lonRounded = Math.round(lon * 100) / 100

  // Find nearest station
  const nearest = findNearestStation(latRounded, lonRounded)

  if (!nearest) {
    return NextResponse.json(
      {
        data: null,
        message: 'No USGS stations found within 50 miles',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  }

  // Fetch current readings
  let reading: USGSReading | null = null
  try {
    reading = await fetchUSGSData(nearest.station.siteCode)
  } catch (error) {
    logger.error('Stream levels fetch error:', error)
  }

  if (!reading) {
    return NextResponse.json(
      {
        data: null,
        message: 'Unable to fetch stream data',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  }

  // Determine stream status based on typical ranges
  // This is simplified - ideally we'd compare to historical percentiles
  let status: 'flood' | 'high' | 'normal' | 'low' | 'drought' = 'normal'
  let percentile = 50

  if (reading.gageHeight !== null) {
    // Rough status based on gage height (varies by station)
    // These thresholds are approximate for small-medium rivers
    if (reading.gageHeight > 12) {
      status = 'flood'
      percentile = 95
    } else if (reading.gageHeight > 8) {
      status = 'high'
      percentile = 80
    } else if (reading.gageHeight > 2) {
      status = 'normal'
      percentile = 50
    } else if (reading.gageHeight > 1) {
      status = 'low'
      percentile = 20
    } else {
      status = 'drought'
      percentile = 5
    }
  }

  return NextResponse.json(
    {
      data: {
        siteName: reading.siteName || nearest.station.siteName,
        siteCode: reading.siteCode,
        gageHeight: reading.gageHeight,
        streamflow: reading.streamflow,
        status,
        percentile,
        distanceMiles: Math.round(nearest.distance * 10) / 10,
        timestamp: reading.timestamp,
      },
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  )
}
