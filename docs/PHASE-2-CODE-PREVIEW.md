# Phase 2: Code Preview

This document shows the exact code that will be written in Phase 2. Use as a reference during implementation.

---

## 1. lib/almanac/weatherCache.ts

```typescript
/**
 * Browser-based weather caching utility
 *
 * Three-tier strategy:
 * 1. Browser HTTP Cache (60s)
 * 2. localStorage (30min)
 * 3. API fetch (fresh)
 *
 * Graceful degradation: If cache fails, app still works
 */

import { logger } from '@/lib/logger'
import type { WeatherData, GeoLocation } from './types'

// ============================================================================
// TYPES
// ============================================================================

export interface CachedWeatherData {
  /** When was this cached? (milliseconds since epoch) */
  timestamp: number
  /** When does this cache expire? (milliseconds since epoch) */
  expiresAt: number
  /** Schema version for future migrations */
  version: 1
  /** Which location is this cache for? */
  location: GeoLocation
  /** The actual weather data */
  data: WeatherData
}

export interface CacheStatus {
  /** Does cached data exist? */
  isCached: boolean
  /** Is it past the TTL? */
  isStale: boolean
  /** Is it past expiresAt? */
  isExpired: boolean
  /** How old is the cache (seconds)? */
  ageSeconds: number
  /** How many seconds until it expires? */
  expiresInSeconds: number
  /** Freshness percentage (100 = just cached, 0 = expired) */
  remainingTTL: number
  /** Where will data come from? */
  source: 'fresh' | 'browser-cache' | 'localStorage' | 'offline'
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_TTL_SECONDS = 1800 // 30 minutes
const CACHE_KEY_PREFIX = 'weather-cache-'

// ============================================================================
// STORAGE KEY GENERATION
// ============================================================================

/**
 * Generate cache key for a location
 * Rounds to 2 decimal places for consistency (~1.1km precision)
 */
function getCacheKey(location: GeoLocation): string {
  const lat = Math.round(location.latitude * 100) / 100
  const lon = Math.round(location.longitude * 100) / 100
  return `${CACHE_KEY_PREFIX}${lat},${lon}`
}

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Save weather data to localStorage with expiration
 *
 * @param data - The weather data to cache
 * @param location - Where is this data for?
 * @param ttlSeconds - Time to live (default 30 minutes)
 * @returns true if successful, false if storage failed
 */
export function saveWeatherToCache(
  data: WeatherData,
  location: GeoLocation,
  ttlSeconds: number = DEFAULT_TTL_SECONDS
): boolean {
  if (!canUseLocalStorage()) {
    return false
  }

  try {
    const key = getCacheKey(location)
    const now = Date.now()

    const cacheEntry: CachedWeatherData = {
      timestamp: now,
      expiresAt: now + ttlSeconds * 1000,
      version: 1,
      location,
      data,
    }

    localStorage.setItem(key, JSON.stringify(cacheEntry))
    return true
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      logger.warn('localStorage quota exceeded. Cache not saved.')
    } else {
      logger.error('Failed to save weather cache:', error)
    }
    return false
  }
}

/**
 * Load weather data from localStorage (any age)
 *
 * @param location - Which location to load for?
 * @returns Cached data (may be expired) or null if not found
 */
export function loadWeatherFromCache(location: GeoLocation): CachedWeatherData | null {
  if (!canUseLocalStorage()) {
    return null
  }

  try {
    const key = getCacheKey(location)
    const stored = localStorage.getItem(key)

    if (!stored) {
      return null
    }

    const parsed: unknown = JSON.parse(stored)

    // Validate schema
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'version' in parsed &&
      'data' in parsed &&
      'timestamp' in parsed &&
      'expiresAt' in parsed
    ) {
      return parsed as CachedWeatherData
    }

    return null
  } catch (error) {
    logger.warn('Failed to load weather cache (corrupted?):', error)
    return null
  }
}

/**
 * Check if cached data is still fresh (not expired)
 */
export function isCacheValid(cache: CachedWeatherData): boolean {
  return cache.expiresAt > Date.now()
}

/**
 * Get age of cached data in seconds
 */
export function getCacheAge(cache: CachedWeatherData): number {
  return Math.max(0, (Date.now() - cache.timestamp) / 1000)
}

/**
 * Get complete cache status information
 */
export function getCacheStatus(cache: CachedWeatherData | null): CacheStatus {
  if (!cache) {
    return {
      isCached: false,
      isStale: true,
      isExpired: true,
      ageSeconds: 0,
      expiresInSeconds: 0,
      remainingTTL: 0,
      source: 'fresh', // Will be overridden by caller
    }
  }

  const now = Date.now()
  const ageMs = now - cache.timestamp
  const remainingMs = Math.max(0, cache.expiresAt - now)
  const totalMs = cache.expiresAt - cache.timestamp

  return {
    isCached: true,
    isStale: ageMs > 30 * 60 * 1000, // Older than 30 minutes
    isExpired: !isCacheValid(cache),
    ageSeconds: Math.round(ageMs / 1000),
    expiresInSeconds: Math.round(remainingMs / 1000),
    remainingTTL: totalMs > 0 ? Math.round((remainingMs / totalMs) * 100) : 0,
    source: cache ? 'localStorage' : 'fresh',
  }
}

/**
 * Clear weather cache for specific location or all locations
 */
export function clearWeatherCache(location?: GeoLocation): void {
  try {
    if (!canUseLocalStorage()) {
      return
    }

    if (location) {
      // Clear specific location
      const key = getCacheKey(location)
      localStorage.removeItem(key)
    } else {
      // Clear all weather caches
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith(CACHE_KEY_PREFIX)) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key))
    }
  } catch (error) {
    logger.error('Failed to clear weather cache:', error)
  }
}

/**
 * Check if localStorage is available (not in private mode)
 */
export function canUseLocalStorage(): boolean {
  try {
    if (typeof window === 'undefined') {
      return false
    }

    const testKey = '__localStorage_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * Get approximate storage size used by weather caches
 */
export function getStorageSize(): number {
  let total = 0
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(CACHE_KEY_PREFIX)) {
        total += key.length + (localStorage.getItem(key)?.length ?? 0)
      }
    }
  } catch {
    // Ignore errors
  }
  return total
}

// ============================================================================
// EXPORTS
// ============================================================================

export const weatherCache = {
  save: saveWeatherToCache,
  load: loadWeatherFromCache,
  isValid: isCacheValid,
  getAge: getCacheAge,
  getStatus: getCacheStatus,
  clear: clearWeatherCache,
  canUse: canUseLocalStorage,
  getSize: getStorageSize,
}
```

---

## 2. lib/almanac/networkStatus.ts

```typescript
/**
 * Network status detection hook
 * Listens for online/offline events and provides status
 */

import { useState, useEffect } from 'react'

/**
 * React hook to detect online/offline status
 * Updates when network connection changes
 */
export function useNetworkStatus(): boolean {
  const [isOnline, setIsOnline] = useState(() => {
    // Initialize from current navigator status (handles SSR)
    if (typeof window === 'undefined') {
      return true
    }
    return navigator.onLine
  })

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

/**
 * Synchronous check for online status (use in non-React contexts)
 */
export function isOnline(): boolean {
  if (typeof window === 'undefined') {
    return true
  }
  return navigator.onLine
}
```

---

## 3. components/almanac/CacheStatusBanner.tsx

```typescript
'use client'

import { motion } from 'framer-motion'
import { RefreshCw, AlertCircle, Wifi, WifiOff } from 'lucide-react'

interface CacheStatusBannerProps {
  source: 'fresh' | 'browser-cache' | 'localStorage' | 'offline'
  ageSeconds?: number
  expiresInSeconds?: number
  onRefresh?: () => void
}

function formatAge(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`
  return `${Math.round(seconds / 3600)}h`
}

export function CacheStatusBanner({
  source,
  ageSeconds = 0,
  expiresInSeconds = 0,
  onRefresh,
}: CacheStatusBannerProps) {
  const config = {
    fresh: {
      bg: 'bg-green-900/30',
      border: 'border-green-500/50',
      icon: <Wifi className="w-4 h-4 text-green-400" />,
      text: '✓ Live data',
      color: 'text-green-200',
    },
    'browser-cache': {
      bg: 'bg-blue-900/30',
      border: 'border-blue-500/50',
      icon: <RefreshCw className="w-4 h-4 text-blue-400" />,
      text: `⟳ Updated ${formatAge(ageSeconds)} ago`,
      color: 'text-blue-200',
    },
    localStorage: {
      bg: 'bg-amber-900/30',
      border: 'border-amber-500/50',
      icon: <AlertCircle className="w-4 h-4 text-amber-400" />,
      text: `⚠ Cached ${formatAge(ageSeconds)} ago`,
      color: 'text-amber-200',
    },
    offline: {
      bg: 'bg-orange-900/30',
      border: 'border-orange-500/50',
      icon: <WifiOff className="w-4 h-4 text-orange-400" />,
      text: `⛔ Offline - ${formatAge(ageSeconds)} old`,
      color: 'text-orange-200',
    },
  }

  const style = config[source]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${style.bg} ${style.border}`}
    >
      <div className="flex items-center gap-2">
        {style.icon}
        <span className={style.color}>{style.text}</span>
      </div>
      {onRefresh && source !== 'fresh' && (
        <button
          onClick={onRefresh}
          className="px-2 py-1 rounded hover:bg-white/10 transition-colors text-xs underline"
        >
          Refresh
        </button>
      )}
    </motion.div>
  )
}
```

---

## 4. Modified: app/api/weather/route.ts (Key lines)

```typescript
// Around line 114-118, modify the return statement:

return NextResponse.json(data, {
  headers: {
    // Add max-age=60 for browser cache (60 seconds)
    'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  },
})
```

---

## 5. Modified: app/(almanac)/almanac/page.tsx (Key changes)

```typescript
// Add imports at top
import {
  loadWeatherFromCache,
  saveWeatherToCache,
  isCacheValid,
  getCacheAge,
} from '@/lib/almanac/weatherCache'
import { useNetworkStatus } from '@/lib/almanac/networkStatus'
import { CacheStatusBanner } from '@/components/almanac/CacheStatusBanner'

export default function AlmanacPage() {
  // ... existing state ...
  const [dataSource, setDataSource] = useState<'fresh' | 'browser-cache' | 'localStorage' | 'offline'>('fresh')
  const [cacheAgeSeconds, setCacheAgeSeconds] = useState(0)
  const isOnline = useNetworkStatus()

  // Modified fetchWeather function
  const fetchWeather = useCallback(async (loc: GeoLocation, attempt = 0) => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // If offline, use cache immediately
    if (!isOnline) {
      const cached = loadWeatherFromCache(loc)
      if (cached && isCacheValid(cached)) {
        const weatherData = transformWeatherData(cached.data)
        setWeather(weatherData)
        setDataSource('offline')
        setCacheAgeSeconds(getCacheAge(cached))
        setLoading(false)
        return
      }
      setError('Offline and no cached data available')
      setLoading(false)
      return
    }

    // Create new abort controller for this request
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    // Set timeout for slow connections
    const timeoutId = setTimeout(() => abortController.abort(), 3000)

    try {
      setLoading(true)
      setRetryCount(attempt)

      const response = await fetch(`/api/weather?lat=${loc.latitude}&lon=${loc.longitude}`, {
        signal: abortController.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const weatherData = transformWeatherData(data)

      // Success: save to cache
      saveWeatherToCache(weatherData, loc)
      setWeather(weatherData)
      setDataSource('fresh')
      setError(null)
      setRetryCount(0)
    } catch (err) {
      clearTimeout(timeoutId)

      // Handle aborted requests
      if (err instanceof Error && err.name === 'AbortError') {
        // Check cache before retrying
        const cached = loadWeatherFromCache(loc)
        if (cached && isCacheValid(cached)) {
          const weatherData = transformWeatherData(cached.data)
          setWeather(weatherData)
          setDataSource('localStorage')
          setCacheAgeSeconds(getCacheAge(cached))
          setLoading(false)
          return
        }
      }

      logger.error('Weather fetch error:', err)

      // Retry logic
      if (attempt < MAX_RETRIES - 1) {
        const delay = RETRY_DELAYS[attempt] || RETRY_DELAYS[RETRY_DELAYS.length - 1]
        await new Promise((resolve) => setTimeout(resolve, delay))
        return fetchWeather(loc, attempt + 1)
      }

      setError('Unable to load weather data after multiple attempts. Please try again.')
      setRetryCount(0)
    } finally {
      setLoading(false)
    }
  }, [isOnline])

  // ... rest of component ...

  // Add cache status banner to render (in JSX section)
  <div className="flex justify-end mb-4">
    <CacheStatusBanner
      source={dataSource}
      ageSeconds={cacheAgeSeconds}
      onRefresh={() => location && fetchWeather(location)}
    />
  </div>
}
```

---

## 6. Unit Test Template

**File:** `__tests__/lib/almanac/weatherCache.test.ts`

```typescript
import {
  saveWeatherToCache,
  loadWeatherFromCache,
  isCacheValid,
  getCacheAge,
  canUseLocalStorage,
} from '@/lib/almanac/weatherCache'
import type { WeatherData, GeoLocation } from '@/lib/almanac/types'

describe('weatherCache', () => {
  const mockLocation: GeoLocation = {
    latitude: 36.48,
    longitude: -82.26,
    name: 'Rocky Mount',
  }

  const mockWeatherData: WeatherData = {
    current: {
      temperature: 38,
      humidity: 75,
      weatherCode: 61,
      // ... other fields
    },
    hourly: {
      /* ... */
    },
    daily: {
      /* ... */
    },
  }

  beforeEach(() => {
    localStorage.clear()
  })

  describe('saveWeatherToCache', () => {
    test('saves data with correct structure', () => {
      const result = saveWeatherToCache(mockWeatherData, mockLocation)
      expect(result).toBe(true)

      const stored = localStorage.getItem('weather-cache-36.48,-82.26')
      expect(stored).toBeDefined()

      const parsed = JSON.parse(stored!)
      expect(parsed.version).toBe(1)
      expect(parsed.data).toEqual(mockWeatherData)
      expect(parsed.timestamp).toBeLessThanOrEqual(Date.now())
    })

    test('handles quota exceeded gracefully', () => {
      const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError')
      })

      const result = saveWeatherToCache(mockWeatherData, mockLocation)
      expect(result).toBe(false)

      spy.mockRestore()
    })
  })

  describe('loadWeatherFromCache', () => {
    test('returns null if not cached', () => {
      const result = loadWeatherFromCache(mockLocation)
      expect(result).toBeNull()
    })

    test('loads valid cached data', () => {
      saveWeatherToCache(mockWeatherData, mockLocation)
      const result = loadWeatherFromCache(mockLocation)

      expect(result).not.toBeNull()
      expect(result?.data).toEqual(mockWeatherData)
    })

    test('returns null if data is corrupted', () => {
      localStorage.setItem('weather-cache-36.48,-82.26', 'invalid-json')
      const result = loadWeatherFromCache(mockLocation)
      expect(result).toBeNull()
    })
  })

  describe('isCacheValid', () => {
    test('returns true if not expired', () => {
      const cache = {
        timestamp: Date.now(),
        expiresAt: Date.now() + 3600000,
        version: 1 as const,
        location: mockLocation,
        data: mockWeatherData,
      }
      expect(isCacheValid(cache)).toBe(true)
    })

    test('returns false if expired', () => {
      const cache = {
        timestamp: Date.now() - 3600000,
        expiresAt: Date.now() - 60000,
        version: 1 as const,
        location: mockLocation,
        data: mockWeatherData,
      }
      expect(isCacheValid(cache)).toBe(false)
    })
  })

  describe('getCacheAge', () => {
    test('calculates age correctly', () => {
      const cache = {
        timestamp: Date.now() - 45000,
        expiresAt: Date.now() + 3555000,
        version: 1 as const,
        location: mockLocation,
        data: mockWeatherData,
      }
      const age = getCacheAge(cache)
      expect(age).toBeCloseTo(45, 1)
    })
  })

  describe('canUseLocalStorage', () => {
    test('returns true in normal browser', () => {
      expect(canUseLocalStorage()).toBe(true)
    })
  })
})
```

---

## 7. All 5 API Routes Modification

Apply same change to:

- `app/api/weather/route.ts` (line 116)
- `app/api/air-quality/route.ts` (line 125)
- `app/api/nws-alerts/route.ts` (line 143)
- `app/api/stream-levels/route.ts` (line 259)
- `app/api/precipitation-radar/route.ts` (line 14)

**Change from:**

```typescript
'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
```

**Change to:**

```typescript
'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
```

---

## Summary

These code snippets represent the complete Phase 2 implementation:

1. **Core utility** (weatherCache.ts) - 8 functions, ~250 lines
2. **Network detection** (networkStatus.ts) - 1 hook, ~40 lines
3. **UI indicator** (CacheStatusBanner.tsx) - 1 component, ~50 lines
4. **API headers** (5 files) - 1-line changes, 5 places
5. **Page integration** (almanac/page.tsx) - ~50 lines modified
6. **Tests** (weatherCache.test.ts) - ~150 lines

**Total new code:** ~550 lines
**Modified code:** ~50 lines
**Deleted code:** 0 lines

---

**Prepared by:** Dr. Elena Volkov
**Date:** January 30, 2026
**Status:** Ready for development
