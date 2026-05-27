# Phase 2 Technical Specification: weatherCache Module

**Module:** `lib/almanac/weatherCache.ts`
**Type:** Utility library (no components)
**Dependencies:** None (pure TypeScript)
**Browser APIs:** localStorage, navigator.onLine
**Exported:** 8 functions + 2 types

---

## Type Definitions

```typescript
/**
 * Raw cached weather data structure
 */
export interface CachedWeatherData {
  timestamp: number // Date.now() when cached
  expiresAt: number // timestamp + ttl (ms)
  version: 1 // Schema version for migrations
  location: GeoLocation // Reference for which location
  data: WeatherData // Full API response
}

/**
 * Information about cache state (read-only)
 */
export interface CacheStatus {
  isCached: boolean // true if data exists
  isStale: boolean // true if older than ttl
  isExpired: boolean // true if past expiresAt
  ageSeconds: number // How old is the cache?
  expiresInSeconds: number // How long until expiry?
  remainingTTL: number // Percentage: 100% fresh, 0% expired
  source: 'fresh' | 'browser-cache' | 'localStorage' | 'offline'
}

/**
 * GeoLocation type (from geocoding.ts)
 */
export interface GeoLocation {
  latitude: number
  longitude: number
  name?: string
}

/**
 * WeatherData type (from types.ts)
 */
export interface WeatherData {
  current: CurrentWeather
  hourly: HourlyForecast
  daily: DailyForecast
}
```

---

## Core Functions

### 1. saveWeatherToCache

**Purpose:** Store fetched weather data with expiration timestamp

**Signature:**

```typescript
export function saveWeatherToCache(
  data: WeatherData,
  location: GeoLocation,
  ttlSeconds: number = 1800 // 30 minutes default
): boolean
```

**Behavior:**

- Creates a cache key from location: `weather-cache-{lat},{lon}`
- Rounds coordinates to 2 decimal places for consistency
- Stores: timestamp, expiresAt, version, location, data
- Returns `true` if successful, `false` if localStorage fails

**Error Handling:**

- Catches `QuotaExceededError` (storage full)
- Catches any parse/JSON errors
- Returns `false` but doesn't throw
- Logs warning to console

**Example:**

```typescript
const success = saveWeatherToCache(weatherData, {
  latitude: 36.48,
  longitude: -82.26,
  name: 'Rocky Mount',
})

if (!success) {
  logger.warn('Cache save failed - proceeding without cache')
}
```

---

### 2. loadWeatherFromCache

**Purpose:** Retrieve cached weather data (any age)

**Signature:**

```typescript
export function loadWeatherFromCache(location: GeoLocation): CachedWeatherData | null
```

**Behavior:**

- Rounds coordinates to 2 decimal places
- Looks up key `weather-cache-{lat},{lon}`
- Parses JSON (validates schema version)
- Returns data even if expired (caller checks validity)
- Returns `null` if not found or corrupted

**Error Handling:**

- Catches JSON parse errors silently
- Returns `null` if schema version mismatch
- Returns `null` if required fields missing

**Example:**

```typescript
const cached = loadWeatherFromCache({
  latitude: 36.48,
  longitude: -82.26,
})

if (cached && isCacheValid(cached)) {
  // Use cached data
  setWeather(cached.data)
} else if (cached) {
  // Data exists but stale - show with warning
  showCachedDataWarning(cached)
} else {
  // No cache - must fetch
  fetchFromAPI()
}
```

---

### 3. isCacheValid

**Purpose:** Check if cached data is fresh (not expired)

**Signature:**

```typescript
export function isCacheValid(cache: CachedWeatherData): boolean
```

**Behavior:**

- Compares `cache.expiresAt` to current time
- Returns `true` if `expiresAt > Date.now()`
- Returns `false` if expired or invalid

**Edge Cases:**

- Handles clock skew (user changes system time)
- Handles `expiresAt` in future (OK)
- Handles `expiresAt` in past (stale)

**Example:**

```typescript
const cache = loadWeatherFromCache(location)
if (cache && isCacheValid(cache)) {
  return cache.data // Fresh
} else if (cache) {
  return cache.data // Stale but display warning
} else {
  return null // No cache
}
```

---

### 4. getCacheAge

**Purpose:** How old is the cached data? (in seconds)

**Signature:**

```typescript
export function getCacheAge(cache: CachedWeatherData): number
```

**Returns:** `Math.max(0, (Date.now() - cache.timestamp) / 1000)`

**Range:** 0 (just cached) to TTL (at expiry) to 999999 (ancient)

**Example:**

```typescript
const cache = loadWeatherFromCache(location)
if (cache) {
  const ageSeconds = getCacheAge(cache)
  console.log(`Data is ${ageSeconds}s old`)
  if (ageSeconds > 3600) {
    showStaleWarning() // Older than 1 hour
  }
}
```

---

### 5. getCacheStatus

**Purpose:** Get complete cache state (composite of multiple checks)

**Signature:**

```typescript
export function getCacheStatus(cache: CachedWeatherData | null): CacheStatus
```

**Returns:**

```typescript
{
  isCached: true,              // Does cache exist?
  isStale: false,              // Past TTL?
  isExpired: false,            // Past expiresAt?
  ageSeconds: 45,              // How old?
  expiresInSeconds: 1755,      // How long until expiry?
  remainingTTL: 97,            // Percentage (100 = fresh)
  source: 'localStorage'       // Where will we use from?
}
```

**Logic:**

```typescript
{
  isCached: cache !== null,
  isStale: cache ? getCacheAge(cache) > TTL : true,
  isExpired: cache ? !isCacheValid(cache) : true,
  ageSeconds: cache ? getCacheAge(cache) : 0,
  expiresInSeconds: cache ? Math.max(0, cache.expiresAt - Date.now()) / 1000 : 0,
  remainingTTL: cache ? Math.max(0, 100 * (cache.expiresAt - Date.now()) / (cache.expiresAt - cache.timestamp)) : 0,
  source: determineSource(cache)
}
```

**Example:**

```typescript
const status = getCacheStatus(loadWeatherFromCache(location))
console.log(`Cache status: ${status.source} (${status.ageSeconds}s old)`)
if (status.isStale) {
  retryFetchFromAPI()
}
```

---

### 6. clearWeatherCache

**Purpose:** Remove cached data (manual cleanup)

**Signature:**

```typescript
export function clearWeatherCache(location?: GeoLocation): void
```

**Behavior:**

- If `location` provided: Remove only that location's cache
- If no `location`: Remove ALL weather caches
- Does not throw on failure

**Example:**

```typescript
// Clear specific location
clearWeatherCache({ latitude: 36.48, longitude: -82.26 })

// Clear all caches (e.g., on logout)
clearWeatherCache()

// Clear when changing location
const handleLocationChange = (newLocation) => {
  clearWeatherCache(currentLocation) // Clear old
  fetchWeather(newLocation) // Fetch new
}
```

---

### 7. canUseLocalStorage

**Purpose:** Detect if localStorage is available (privacy mode check)

**Signature:**

```typescript
export function canUseLocalStorage(): boolean
```

**Behavior:**

- Attempts to write a test key to localStorage
- Attempts to read it back
- Cleans up test key
- Returns `true` if successful
- Returns `false` if:
  - Browser in private/incognito mode
  - localStorage disabled
  - Quota exceeded
  - SSR context (no `window`)

**Example:**

```typescript
if (canUseLocalStorage()) {
  saveWeatherToCache(data, location) // Will work
} else {
  console.log('Using browser cache only (localStorage unavailable)')
  // Rely on HTTP Cache-Control headers
}
```

---

### 8. getStorageSize

**Purpose:** Monitor localStorage usage (optional, for debugging)

**Signature:**

```typescript
export function getStorageSize(): number
```

**Returns:** Approximate size in bytes of all weather cache entries

**Calculation:**

```typescript
let total = 0
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  if (key?.startsWith('weather-cache-')) {
    total += key.length + (localStorage.getItem(key)?.length ?? 0)
  }
}
return total
```

**Example:**

```typescript
const sizeBytes = getStorageSize()
const sizeKB = (sizeBytes / 1024).toFixed(1)
console.log(`Weather cache size: ${sizeKB} KB`)
if (sizeBytes > 5_000_000) {
  console.warn('Cache exceeding 5MB - clearing old entries')
  clearWeatherCache()
}
```

---

## Implementation Details

### Storage Key Format

```
weather-cache-{latitude},{longitude}

Examples:
- weather-cache-36.48,-82.26
- weather-cache-35.12,-86.78
- weather-cache-36.0,-82.0
```

**Why:** Each location gets its own cache entry (independent TTL)

### Location Rounding

All functions round coordinates to 2 decimal places (~1.1km precision):

```typescript
const latRounded = Math.round(location.latitude * 100) / 100
const lonRounded = Math.round(location.longitude * 100) / 100
```

**Why:** Prevents duplicate caches for nearly-identical coordinates

### TTL Defaults

```typescript
const DEFAULT_TTL_SECONDS = 1800 // 30 minutes
```

**Reasoning:**

- Weather rarely changes significantly in 30 min
- 30 min = reasonable stale window
- Allows multiple saves within session
- Balances storage vs freshness

### Error Handling Philosophy

**Fail silently, log verbosely:**

```typescript
try {
  // attempt cache operation
} catch (error) {
  logger.warn('Cache operation failed:', error)
  // Continue without cache - app remains functional
  return false // or null
}
```

**Why:** Cache is optimization, not critical. Failures must not break the app.

---

## Usage in Components

### Basic Pattern: fetchWeather with fallback

```typescript
// app/(almanac)/almanac/page.tsx
import { loadWeatherFromCache, saveWeatherToCache, isCacheValid } from '@/lib/almanac/weatherCache'

const fetchWeather = useCallback(async (location: GeoLocation) => {
  try {
    // 1. Try API
    const response = await fetch(`/api/weather?lat=${location.latitude}&lon=${location.longitude}`)
    const data = await response.json()

    // 2. Transform and cache
    const weatherData = transformWeatherData(data)
    saveWeatherToCache(weatherData, location)

    // 3. Update state
    setWeather(weatherData)
    setDataSource('fresh')
  } catch (error) {
    // 4. Fallback to cache
    const cached = loadWeatherFromCache(location)
    if (cached && isCacheValid(cached)) {
      setWeather(cached.data)
      setDataSource('cached')
    } else if (cached) {
      setWeather(cached.data)
      setDataSource('stale-cache')
      setWarning(`Using cached data from ${(getCacheAge(cached) / 60) | 0} minutes ago`)
    } else {
      setError('Unable to load weather data')
    }
  }
}, [])
```

### Advanced Pattern: Online/Offline handling

```typescript
const fetchWeather = useCallback(async (location: GeoLocation) => {
  // If offline, use cache immediately
  if (!navigator.onLine) {
    const cached = loadWeatherFromCache(location)
    if (cached && isCacheValid(cached)) {
      setWeather(cached.data)
      setDataSource('offline-cache')
      return
    }
    setError('Offline and no cached data available')
    return
  }

  // If online, try API
  try {
    const response = await fetch(/* ... */)
    // ... as above
  } catch (error) {
    // ... fallback logic
  }
}, [])
```

---

## Testing Strategy

### Unit Tests Structure

```typescript
describe('weatherCache', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  describe('saveWeatherToCache', () => {
    test('saves data with correct schema', () => {
      const data = {
        /* weather data */
      }
      const location = { latitude: 36.48, longitude: -82.26 }

      const result = saveWeatherToCache(data, location)

      expect(result).toBe(true)
      const stored = localStorage.getItem('weather-cache-36.48,-82.26')
      expect(stored).toBeDefined()
      const parsed = JSON.parse(stored!)
      expect(parsed.version).toBe(1)
      expect(parsed.data).toEqual(data)
    })

    test('rounds coordinates to 2 decimal places', () => {
      const location = { latitude: 36.486789, longitude: -82.264321 }
      saveWeatherToCache(data, location)

      expect(localStorage.getItem('weather-cache-36.49,-82.26')).toBeDefined()
    })

    test('handles quota exceeded gracefully', () => {
      // Mock localStorage.setItem to throw
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError')
      })

      const result = saveWeatherToCache(data, location)

      expect(result).toBe(false)
      expect(logger.warn).toHaveBeenCalled()
    })
  })

  describe('loadWeatherFromCache', () => {
    test('returns null if not cached', () => {
      const location = { latitude: 36.48, longitude: -82.26 }
      const result = loadWeatherFromCache(location)
      expect(result).toBeNull()
    })

    test('returns cached data if valid', () => {
      const data = {
        /* weather data */
      }
      const location = { latitude: 36.48, longitude: -82.26 }
      saveWeatherToCache(data, location)

      const result = loadWeatherFromCache(location)
      expect(result?.data).toEqual(data)
    })

    test('returns null if data is corrupted', () => {
      localStorage.setItem('weather-cache-36.48,-82.26', 'invalid-json')
      const result = loadWeatherFromCache({ latitude: 36.48, longitude: -82.26 })
      expect(result).toBeNull()
    })
  })

  describe('isCacheValid', () => {
    test('returns true if not expired', () => {
      const cache: CachedWeatherData = {
        timestamp: Date.now(),
        expiresAt: Date.now() + 3600000, // 1 hour
        version: 1,
        location: { latitude: 36.48, longitude: -82.26 },
        data: {
          /* ... */
        },
      }
      expect(isCacheValid(cache)).toBe(true)
    })

    test('returns false if expired', () => {
      const cache: CachedWeatherData = {
        timestamp: Date.now() - 3600000,
        expiresAt: Date.now() - 60000, // Expired 1 min ago
        version: 1,
        location: { latitude: 36.48, longitude: -82.26 },
        data: {
          /* ... */
        },
      }
      expect(isCacheValid(cache)).toBe(false)
    })
  })

  describe('getCacheAge', () => {
    test('calculates age in seconds', () => {
      const cache: CachedWeatherData = {
        timestamp: Date.now() - 45000, // 45 seconds ago
        expiresAt: Date.now() + 3555000,
        version: 1,
        location: { latitude: 36.48, longitude: -82.26 },
        data: {
          /* ... */
        },
      }
      const age = getCacheAge(cache)
      expect(age).toBeCloseTo(45, 1)
    })
  })

  describe('getCacheStatus', () => {
    test('returns complete status object', () => {
      const cache = saveWeatherToCache(data, location)
      const status = getCacheStatus(cache)

      expect(status).toHaveProperty('isCached', true)
      expect(status).toHaveProperty('isStale', false)
      expect(status).toHaveProperty('ageSeconds')
      expect(status).toHaveProperty('source')
    })
  })

  describe('canUseLocalStorage', () => {
    test('returns true in normal browser', () => {
      expect(canUseLocalStorage()).toBe(true)
    })

    test('returns false in private mode', () => {
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError')
      })
      expect(canUseLocalStorage()).toBe(false)
    })
  })
})
```

---

## Migration & Backwards Compatibility

### Schema Version

All cached data includes `"version": 1` for future migrations.

**Future migration example (v2):**

```typescript
export function loadWeatherFromCache(location: GeoLocation) {
  const cached = JSON.parse(localStorage.getItem(key))

  // Handle old v1 format
  if (cached.version === 1) {
    // Convert to v2 if needed
    return migrateFromV1(cached)
  }

  return cached
}
```

---

## Performance Characteristics

| Operation              | Time  | Memory            |
| ---------------------- | ----- | ----------------- |
| saveWeatherToCache()   | <5ms  | ~15KB (one entry) |
| loadWeatherFromCache() | <2ms  | Minimal (pointer) |
| isCacheValid()         | <1ms  | Minimal           |
| getCacheAge()          | <1ms  | Minimal           |
| getCacheStatus()       | <1ms  | Minimal           |
| canUseLocalStorage()   | ~10ms | Minimal           |

**Total localStorage usage:**

- Per location: ~15-20KB
- Typical: 1-3 locations cached = 30-60KB
- Max before warning: ~1MB (50+ locations)

---

## Deployment Checklist

- [ ] All 8 functions implemented
- [ ] TypeScript types exported
- [ ] Unit tests passing (100% coverage)
- [ ] Error handling tested (quota, corruption, privacy mode)
- [ ] logger.warn/error calls verified
- [ ] No breaking changes to existing types
- [ ] Documentation matches implementation
- [ ] Code review approved
- [ ] Ready for Phase 2.3 (page integration)

---

**Prepared by:** Dr. Elena Volkov
**Date:** January 30, 2026
**Status:** Ready for development
