/**
 * Browser Storage for User Preferences
 *
 * Persists user's chosen location to localStorage for return visits.
 * Falls back to DEFAULT_LOCATION if nothing saved or on error.
 *
 * Storage key: 'almanac-location'
 * Format: JSON-serialized GeoLocation object
 *
 * Error handling:
 * - QuotaExceededError: Logged, returns false
 * - Parse errors: Logged, returns default
 * - SSR (no window): Returns default gracefully
 */
import { logger } from '@/lib/logger'
import { type GeoLocation, DEFAULT_LOCATION } from './geocoding'

const STORAGE_KEY = 'almanac-location'

/**
 * Save user's chosen location to localStorage
 * @returns true if save succeeded, false if storage quota exceeded or other error
 */
export function saveLocation(location: GeoLocation): boolean {
  if (typeof window === 'undefined') return false

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
    return true
  } catch (error) {
    // Handle QuotaExceededError and other storage errors
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      logger.warn('localStorage quota exceeded. Location not saved.')
    } else {
      logger.error('Failed to save location:', error)
    }
    return false
  }
}

/**
 * Load saved location from localStorage
 * Returns DEFAULT_LOCATION if nothing saved
 */
export function loadLocation(): GeoLocation {
  if (typeof window === 'undefined') return DEFAULT_LOCATION

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    logger.error('Failed to load location:', error)
  }

  return DEFAULT_LOCATION
}

/**
 * Clear saved location (reset to default)
 * @returns true if clear succeeded, false on error
 */
export function clearLocation(): boolean {
  if (typeof window === 'undefined') return false

  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    logger.error('Failed to clear location:', error)
    return false
  }
}
