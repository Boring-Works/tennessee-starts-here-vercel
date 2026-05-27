import { type NextRequest, NextResponse } from 'next/server'
import type { AirQualityData, AQILevel } from '@/lib/almanac/types'
import { logger } from '@/lib/logger'

// AQICN API response type
interface AQICNResponse {
  status: string
  data: {
    aqi: number
    idx: number
    attributions: Array<{
      url: string
      name: string
    }>
    city: {
      geo: [number, number]
      name: string
      url: string
    }
    dominentpol?: string
    iaqi: {
      pm25?: { v: number }
      pm10?: { v: number }
      o3?: { v: number }
      no2?: { v: number }
      so2?: { v: number }
      co?: { v: number }
      [key: string]: { v: number } | undefined
    }
    time: {
      s: string
      tz: string
      v: number
      iso: string
    }
    forecast?: {
      daily: {
        o3?: Array<{ avg: number; day: string; max: number; min: number }>
        pm10?: Array<{ avg: number; day: string; max: number; min: number }>
        pm25?: Array<{ avg: number; day: string; max: number; min: number }>
      }
    }
  }
}

function getAQILevelFromValue(aqi: number): AQILevel {
  if (aqi <= 50) return 'good'
  if (aqi <= 100) return 'moderate'
  if (aqi <= 150) return 'sensitive'
  if (aqi <= 200) return 'unhealthy'
  if (aqi <= 300) return 'very-unhealthy'
  return 'hazardous'
}

function getDominantPollutantName(pol: string | undefined): string {
  if (!pol) return 'Unknown'
  const names: Record<string, string> = {
    pm25: 'PM2.5',
    pm10: 'PM10',
    o3: 'Ozone',
    no2: 'Nitrogen Dioxide',
    so2: 'Sulfur Dioxide',
    co: 'Carbon Monoxide',
  }
  return names[pol] || pol.toUpperCase()
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat/lon parameters' }, { status: 400 })
  }

  // Parse and validate coordinates
  const latNum = parseFloat(lat)
  const lonNum = parseFloat(lon)
  if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
    return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 })
  }

  // Round coordinates to 2 decimal places for cache efficiency
  const latRounded = Math.round(latNum * 100) / 100
  const lonRounded = Math.round(lonNum * 100) / 100

  const apiKey = process.env.AQICN_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'AQICN API key not configured' }, { status: 500 })
  }

  try {
    // AQICN geo-based feed endpoint
    const url = `https://api.waqi.info/feed/geo:${latRounded};${lonRounded}/?token=${apiKey}`

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      // Cache for 15 minutes - AQI updates hourly
      next: { revalidate: 900 },
    })

    if (!response.ok) {
      throw new Error(`AQICN API error: ${response.status}`)
    }

    const data: AQICNResponse = await response.json()

    if (data.status !== 'ok') {
      throw new Error('AQICN API returned non-ok status')
    }

    const airQuality: AirQualityData = {
      aqi: data.data.aqi,
      level: getAQILevelFromValue(data.data.aqi),
      dominantPollutant: getDominantPollutantName(data.data.dominentpol),
      stationName: data.data.city.name,
      timestamp: data.data.time.iso,
    }

    return NextResponse.json(airQuality, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    logger.error('Air quality fetch error:', error)
    // Return null data on error - component should handle gracefully
    return NextResponse.json(
      {
        aqi: null,
        level: null,
        dominantPollutant: null,
        stationName: null,
        timestamp: null,
        error: error instanceof Error ? error.message : 'Failed to fetch air quality data',
      },
      {
        status: 200, // Return 200 so component can handle gracefully
        headers: {
          'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=600',
        },
      }
    )
  }
}
