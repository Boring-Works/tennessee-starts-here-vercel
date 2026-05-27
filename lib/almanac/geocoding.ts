/**
 * Location Search using Open-Meteo Geocoding API
 *
 * API Documentation: https://open-meteo.com/en/docs/geocoding-api
 *
 * Features:
 * - Free tier with no API key required
 * - Returns coordinates, timezone, and administrative regions
 * - Supports city names, zip codes, and partial matches
 *
 * Default location: Sullivan County, TN (Rocky Mount State Historic Site)
 * Coordinates: 36.52°N, 82.26°W
 */
import { logger } from '@/lib/logger'

export interface GeoLocation {
  name: string
  latitude: number
  longitude: number
  admin1?: string // State
  country?: string
  timezone?: string
}

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'

// Default: Sullivan County center (Rocky Mount area)
export const DEFAULT_LOCATION: GeoLocation = {
  name: 'Sullivan County',
  latitude: 36.52,
  longitude: -82.26,
  admin1: 'Tennessee',
  country: 'United States',
  timezone: 'America/New_York',
}

// Maximum query length to prevent abuse
const MAX_QUERY_LENGTH = 100

/**
 * Search for a location by name or zip code
 * Works for any US location, optimized for Tennessee
 */
export async function searchLocation(query: string): Promise<GeoLocation | null> {
  const cleanQuery = query.trim()

  // Validate query
  if (!cleanQuery) return null
  if (cleanQuery.length > MAX_QUERY_LENGTH) {
    logger.warn('Geocoding query too long, truncating')
    return searchLocation(cleanQuery.slice(0, MAX_QUERY_LENGTH))
  }

  try {
    const params = new URLSearchParams({
      name: cleanQuery,
      count: '5',
      language: 'en',
      format: 'json',
    })

    const res = await fetch(`${GEOCODING_URL}?${params}`)

    if (!res.ok) {
      throw new Error('Geocoding failed')
    }

    const data = await res.json()

    if (!data.results || data.results.length === 0) {
      return null
    }

    // Prefer Tennessee results, but accept any US result
    const tnResult = data.results.find(
      (r: { admin1?: string; country_code?: string }) =>
        r.admin1 === 'Tennessee' || r.country_code === 'US'
    )

    const result = tnResult || data.results[0]

    return {
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      admin1: result.admin1,
      country: result.country,
      timezone: result.timezone,
    }
  } catch (error) {
    logger.error('Geocoding error:', error)
    return null
  }
}

/**
 * Check if location is in Tennessee
 */
export function isInTennessee(location: GeoLocation): boolean {
  return location.admin1 === 'Tennessee'
}

/**
 * Format location for display: "Nashville, TN"
 */
export function formatLocationName(location: GeoLocation): string {
  if (location.admin1) {
    const state = location.admin1 === 'Tennessee' ? 'TN' : location.admin1
    return `${location.name}, ${state}`
  }
  return location.name
}
