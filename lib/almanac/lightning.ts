/**
 * Lightning Strike Detection and Safety Alerts
 *
 * Data source: Blitzortung.org community lightning detection network
 * API: https://map.blitzortung.org/GEOjson/GEOjson_strikes_1.json (last hour)
 *
 * Safety thresholds based on NOAA/NWS guidelines:
 * - Lightning can strike 10-15 miles from the storm (NOAA)
 * - "If you can hear thunder, you are within striking distance" (NWS)
 * - 30/30 Rule: Seek shelter when flash-to-bang is 30 sec (~6 miles)
 *
 * Our alert levels (conservative for outdoor worker safety):
 * - DANGER (≤10 mi): Immediate shelter required - within typical strike range
 * - WARNING (≤20 mi): Prepare to seek shelter - storm approaching
 * - WATCH (≤50 mi): Monitor conditions - storms in the area
 *
 * Sources:
 * - https://www.weather.gov/safety/lightning-safety
 * - https://www.noaa.gov/jetstream/lightning/lightning-safety
 * - National Severe Storms Laboratory: 6-8 mile "safe" distance
 *
 * Distance calculation: Haversine formula (great-circle distance)
 * Earth radius: 3959 miles (mean radius)
 */
import type { LightningStrike, LightningData, LightningAlertLevel } from './types'

/**
 * Calculate distance between two points using Haversine formula
 * @returns Distance in miles
 */
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Calculate compass direction from one point to another
 */
export function calculateDirection(
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number
): string {
  const dLon = toRadians(toLon - fromLon)
  const lat1 = toRadians(fromLat)
  const lat2 = toRadians(toLat)

  const y = Math.sin(dLon) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)

  let bearing = Math.atan2(y, x)
  bearing = (bearing * 180) / Math.PI
  bearing = (bearing + 360) % 360

  // Convert bearing to compass direction
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(bearing / 45) % 8
  return directions[index]
}

/**
 * Fetch lightning strikes from Blitzortung and filter within radius
 * @param lat User's latitude
 * @param lon User's longitude
 * @param radiusMiles Maximum distance to include (default 50)
 * @returns Lightning data with strikes within radius
 */
export async function fetchLightningData(
  lat: number,
  lon: number,
  radiusMiles: number = 50
): Promise<LightningData> {
  try {
    // Blitzortung provides global strike data in GeoJSON format
    // The _1 suffix means last 1 hour of data
    const response = await fetch('https://map.blitzortung.org/GEOjson/GEOjson_strikes_1.json', {
      headers: {
        Accept: 'application/json',
      },
      // No caching - we want fresh data
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Blitzortung API error: ${response.status}`)
    }

    const data = await response.json()

    // Blitzortung returns GeoJSON format
    // features array with each feature having geometry.coordinates [lon, lat]
    // and properties.time (unix timestamp)
    const strikes: LightningStrike[] = []

    if (data.features && Array.isArray(data.features)) {
      for (const feature of data.features) {
        if (feature.geometry?.coordinates) {
          const strikeLon = feature.geometry.coordinates[0]
          const strikeLat = feature.geometry.coordinates[1]
          const timestamp = feature.properties?.time || Date.now()

          const distance = haversineDistance(lat, lon, strikeLat, strikeLon)

          if (distance <= radiusMiles) {
            strikes.push({
              lat: strikeLat,
              lon: strikeLon,
              timestamp,
              distanceMiles: Math.round(distance * 10) / 10,
            })
          }
        }
      }
    }

    // Sort by distance (nearest first)
    strikes.sort((a, b) => a.distanceMiles - b.distanceMiles)

    const nearestMiles = strikes.length > 0 ? strikes[0].distanceMiles : null

    // Determine alert level
    let alertLevel: LightningAlertLevel = null
    if (nearestMiles !== null) {
      if (nearestMiles <= 10) alertLevel = 'danger'
      else if (nearestMiles <= 20) alertLevel = 'warning'
      else if (nearestMiles <= 50) alertLevel = 'watch'
    }

    return {
      strikes,
      nearestMiles,
      alertLevel,
      strikeCount: strikes.length,
    }
  } catch {
    // Return empty data on error - fail gracefully
    return {
      strikes: [],
      nearestMiles: null,
      alertLevel: null,
      strikeCount: 0,
    }
  }
}

/**
 * Get the direction to the nearest lightning strike
 */
export function getNearestStrikeDirection(
  userLat: number,
  userLon: number,
  strikes: LightningStrike[]
): string | null {
  if (strikes.length === 0) return null
  const nearest = strikes[0]
  return calculateDirection(userLat, userLon, nearest.lat, nearest.lon)
}
