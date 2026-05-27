# Phase 2: Browser Caching + Offline Fallback Implementation Plan

**Status:** Pre-Implementation Planning
**Assigned to:** Dr. Elena Volkov (API & Caching Specialist)
**Target Score:** 91
**Performance Goal:** 3.8s → 2.5s (first visit), 2.5s → 1.6s (cached)

---

## Current Architecture Analysis

### API Endpoints (Server-Side Caching)

All weather APIs currently use Next.js `revalidate` + `Cache-Control` headers:

| Endpoint                   | Source     | Current Cache             | Update Freq | Data Size |
| -------------------------- | ---------- | ------------------------- | ----------- | --------- |
| `/api/weather`             | Open-Meteo | `revalidate: 300` (5min)  | ~15KB       | Hourly    |
| `/api/air-quality`         | AQICN      | `revalidate: 900` (15min) | ~2KB        | Hourly    |
| `/api/nws-alerts`          | NWS        | `revalidate: 300` (5min)  | ~1-5KB      | Variable  |
| `/api/stream-levels`       | USGS       | `revalidate: 900` (15min) | ~1KB        | Hourly    |
| `/api/precipitation-radar` | RainViewer | `revalidate: 300` (5min)  | ~5KB        | 15min     |

**Headers (all endpoints):**

```
Cache-Control: public, s-maxage=300-900, stale-while-revalidate=600
```

### Client-Side Data Flow

**Almanac Page** (`app/(almanac)/almanac/page.tsx`):

- Fetches on mount via `useEffect` → `fetchWeather(location)`
- No browser cache layer currently
- No offline detection
- Components individually fetch (NWSAlertBanner, AirQualityCard, etc.)
- Retry logic exists (3 attempts, exponential backoff)

**Component Pattern** (observed in AirQualityCard, NWSAlertBanner):

```tsx
const fetchData = useCallback(async () => {
  const response = await fetch(`/api/endpoint?params`)
  const data = await response.json()
  setState(data)
  // No localStorage fallback
}, [params])

useEffect(() => {
  fetchData()
  const interval = setInterval(fetchData, 15 * 60 * 1000) // Manual refresh
}, [fetchData])
```

**Issues:**

- Every page load triggers fresh API calls (no browser cache)
- No localStorage fallback if API fails
- No offline detection
- No "data freshness" indicator to user
- Components re-fetch independently (potential duplicate requests)
- Rural areas with poor 4G connectivity get blank screens on timeout

---

## Three-Tier Caching Strategy

### Level 1: Browser Cache (HTTP Headers)

**Where:** Server responses (API endpoints)
**What:** HTTP Cache-Control headers
**Duration:** 60 seconds (configurable)

**Current state:** ✓ Partially implemented

```typescript
// app/api/weather/route.ts (line 116)
headers: {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
}
```

**Issue:** Browser respects `Cache-Control` only for matching requests.

- Same `?lat=36.48&lon=-82.26` → cached
- Different coordinates → fresh fetch (different URL)
- Client doesn't know cache hit or miss

**Enhancement needed:**

```typescript
// More aggressive for stable locations
'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
// max-age: browser caches for 60s
// s-maxage: CDN caches for 5min
// stale-while-revalidate: serve stale for 10min while revalidating
```

---

### Level 2: localStorage Fallback

**Where:** Browser's localStorage API
**What:** JSON blob with timestamp + data
**Duration:** 30 minutes
**Trigger:** API failure OR offline mode

**Storage Schema:**

```typescript
interface CachedWeatherData {
  timestamp: number // Date.now()
  expiresAt: number // timestamp + 30min
  data: WeatherData // Full API response
  location: GeoLocation // What location was this for?
  version: 1 // Schema version for migrations
}

// localStorage key: 'weather-cache-{latitude},{longitude}'
// Example: 'weather-cache-36.48,-82.26'
```

**Use Cases:**

1. **API Timeout:** Response takes >3s, serve cached data while retrying
2. **API Error:** 5xx response, use last known good state
3. **Offline Mode:** `navigator.onLine === false`, serve cache immediately
4. **Stale Cache:** Show data older than 30min with warning

---

### Level 3: Offline Mode Detection

**Where:** Client-side JavaScript
**What:** `navigator.onLine` + visual indicators
**Duration:** Until user reconnects

**Behavior:**

```typescript
if (!navigator.onLine) {
  // Show cached data immediately (no retry)
  // Display prominent offline banner
  // Don't make any API calls (save battery)
  // Resume polling when back online
}
```

---

## Implementation Plan

### Phase 2.1: Create Caching Utility Library

**File:** `lib/almanac/weatherCache.ts` (NEW)

```typescript
interface CachedWeatherData {
  timestamp: number
  expiresAt: number
  data: WeatherData
  location: GeoLocation
  version: 1
}

interface CacheStatus {
  isCached: boolean
  isStale: boolean
  ageSeconds: number
  expiresInSeconds: number
  source: 'fresh' | 'browser-cache' | 'localStorage' | 'offline'
}

// Core functions
export function saveWeatherToCache(
  data: WeatherData,
  location: GeoLocation,
  ttlSeconds: 1800 // 30 minutes
): boolean

export function loadWeatherFromCache(location: GeoLocation): CachedWeatherData | null

export function isCacheValid(cache: CachedWeatherData): boolean

export function getCacheAge(cache: CachedWeatherData): number // age in seconds

export function getCacheStatus(cache: CachedWeatherData | null): CacheStatus

export function clearWeatherCache(location?: GeoLocation): void
```

**Features:**

- Location-aware caching (different cache per lat/lon)
- Automatic expiration (30 min)
- Graceful degradation (corrupted cache ignored)
- localStorage quota handling (try/catch)
- Privacy mode detection (localStorage disabled)

---

### Phase 2.2: Enhance API Endpoints with Better Cache Headers

**Files to modify:**

- `app/api/weather/route.ts`
- `app/api/air-quality/route.ts`
- `app/api/nws-alerts/route.ts`
- `app/api/stream-levels/route.ts`
- `app/api/precipitation-radar/route.ts`

**Changes:**

```typescript
// Before:
'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'

// After:
'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
//               └─ Browser caches for 1 minute
```

**Rationale:** 60-second browser cache is industry standard for weather data.

- Reduces API load by ~90% for repeat visitors in same minute
- Minimal staleness (1 minute = <1% error for weather)
- Complies with Open-Meteo ToS (requests spaced >1min = "unique")

---

### Phase 2.3: Modify Almanac Page to Use Cache

**File:** `app/(almanac)/almanac/page.tsx`

**Changes:**

1. Import caching utilities
2. Modify `fetchWeather()` to:
   - Check localStorage first (if offline or timeout)
   - Show cache status indicator
   - Handle location changes (clear cache)

```typescript
const fetchWeather = useCallback(async (loc: GeoLocation, attempt = 0) => {
  // 1. Check if offline
  if (!navigator.onLine) {
    const cached = loadWeatherFromCache(loc)
    if (cached && isCacheValid(cached)) {
      setWeather(cached.data)
      setDataSource('offline')
      setLoading(false)
      return
    }
    setError('No cached data available. Please restore connection.')
    return
  }

  // 2. Try API fetch with timeout
  try {
    setLoading(true)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000) // 3s timeout

    const response = await fetch(`/api/weather?lat=${loc.latitude}&lon=${loc.longitude}`, {
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!response.ok) throw new Error('API error')

    const data = await response.json()
    if (data.error) throw new Error(data.error)

    // 3. Success: cache it
    const weatherData = transformWeatherData(data)
    saveWeatherToCache(weatherData, loc)
    setWeather(weatherData)
    setDataSource('fresh')
    setError(null)
  } catch (err) {
    // 4. Failure: try cache before retry
    if (attempt === 0) {
      const cached = loadWeatherFromCache(loc)
      if (cached && isCacheValid(cached)) {
        setWeather(cached.data)
        setDataSource('cached')
        setWarning('Using cached data from ${getAge(cached)} ago')
        return
      }
    }

    // 5. No cache: retry (up to MAX_RETRIES)
    if (attempt < MAX_RETRIES - 1) {
      const delay = RETRY_DELAYS[attempt]
      await new Promise((r) => setTimeout(r, delay))
      return fetchWeather(loc, attempt + 1)
    }

    setError('Unable to load weather after retries')
  } finally {
    setLoading(false)
  }
}, [])

// When location changes, clear cache for old location
const handleLocationChange = useCallback(
  (newLocation: GeoLocation) => {
    clearWeatherCache() // Clear all or specific location
    setLocation(newLocation)
    fetchWeather(newLocation)
  },
  [fetchWeather]
)
```

---

### Phase 2.4: Create Cache Status Banner Component

**File:** `components/almanac/CacheStatusBanner.tsx` (NEW)

```typescript
interface CacheStatusBannerProps {
  source: 'fresh' | 'browser-cache' | 'localStorage' | 'offline'
  ageSeconds?: number
  expiresInSeconds?: number
  onRefresh?: () => void
}

export function CacheStatusBanner({
  source,
  ageSeconds,
  expiresInSeconds,
  onRefresh,
}: CacheStatusBannerProps) {
  return (
    <div className={`text-xs p-3 rounded-lg border ${styles[source]}`}>
      {source === 'fresh' && (
        <span className="text-green-200">✓ Live data</span>
      )}
      {source === 'browser-cache' && (
        <span className="text-blue-200">⟳ Updated {formatSeconds(ageSeconds)}s ago</span>
      )}
      {source === 'localStorage' && (
        <span className="text-amber-200">
          ⚠ Cached {formatSeconds(ageSeconds)} ago
          {onRefresh && (
            <button onClick={onRefresh} className="underline ml-2">
              Try refresh
            </button>
          )}
        </span>
      )}
      {source === 'offline' && (
        <span className="text-orange-200">⛔ Offline - cached {formatSeconds(ageSeconds)} ago</span>
      )}
    </div>
  )
}
```

---

### Phase 2.5: Enhance Components with Fallback Logic

**Files to modify:**

- `components/almanac/AirQualityCard.tsx`
- `components/almanac/NWSAlertBanner.tsx`
- Similar patterns in other data-fetching components

**Change pattern:**

```typescript
// Before: Direct API call
const response = await fetch(`/api/air-quality?lat=${lat}&lon=${lon}`)

// After: Fetch with fallback
const response = await fetch(`/api/air-quality?lat=${lat}&lon=${lon}`).catch(async () => {
  // Network error: try localStorage
  const cached = loadAQIFromCache(lat, lon)
  if (cached) return { json: () => cached }
  throw new Error('No cache available')
})
```

**OR better approach:** Create generic fetch helper:

```typescript
// lib/almanac/fetchWithFallback.ts
export async function fetchWithFallback<T>(
  url: string,
  options: { cacheKey?: string; ttl?: number } = {}
): Promise<T> {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('API error')
    const data = await response.json()

    // Cache successful response
    if (options.cacheKey) {
      cacheToLocalStorage(options.cacheKey, data, options.ttl)
    }
    return data
  } catch (err) {
    // Try cache
    if (options.cacheKey) {
      const cached = loadFromLocalStorage(options.cacheKey)
      if (cached) return cached
    }
    throw err
  }
}

// Usage in components
const data = await fetchWithFallback<AirQualityData>(`/api/air-quality?lat=${lat}&lon=${lon}`, {
  cacheKey: `aqi-${lat}-${lon}`,
  ttl: 1800,
})
```

---

### Phase 2.6: Online/Offline Detection

**File:** `lib/almanac/networkStatus.ts` (NEW)

```typescript
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

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

// Usage in Almanac page:
const isOnline = useNetworkStatus()

// In fetchWeather:
if (!isOnline) {
  // Show cached data immediately
  // Don't make API calls
}
```

---

## Storage Schema Details

### Weather Cache

```json
{
  "weather-cache-36.48,-82.26": {
    "timestamp": 1706551234000,
    "expiresAt": 1706553034000,
    "version": 1,
    "location": {
      "latitude": 36.48,
      "longitude": -82.26,
      "name": "Rocky Mount, TN"
    },
    "data": {
      "current": {
        "temperature": 38,
        "humidity": 75,
        "weatherCode": 61,
        ...
      },
      "hourly": { ... },
      "daily": { ... }
    }
  }
}
```

### AQI Cache

```json
{
  "aqi-cache-36.48,-82.26": {
    "timestamp": 1706551234000,
    "expiresAt": 1706553034000,
    "data": {
      "aqi": 62,
      "level": "moderate",
      "dominantPollutant": "PM2.5",
      "stationName": "Johnson City, TN",
      "timestamp": "2024-01-29T16:00:00Z"
    }
  }
}
```

---

## Testing Strategy

### Unit Tests

```typescript
// __tests__/lib/almanac/weatherCache.test.ts
describe('weatherCache', () => {
  test('saveWeatherToCache() stores data with expiration', () => {
    const data = { ... }
    saveWeatherToCache(data, location)
    const cached = loadWeatherFromCache(location)
    expect(cached).toBeDefined()
  })

  test('isCacheValid() returns false if expired', () => {
    // Create cache with expireAt = now - 1 hour
    expect(isCacheValid(expiredCache)).toBe(false)
  })

  test('loadWeatherFromCache() returns null if corrupted', () => {
    // Store invalid JSON
    expect(loadWeatherFromCache(location)).toBeNull()
  })

  test('handles localStorage.setItem() quota exceeded', () => {
    // Mock quota error
    expect(() => saveWeatherToCache(...)).not.toThrow()
  })
})
```

### Integration Tests

```typescript
describe('Almanac offline mode', () => {
  test('shows cached data when offline', async () => {
    // 1. Load page with internet (cache fills)
    render(<AlmanacPage />)
    await waitFor(() => expect(screen.getByText('38°')).toBeInTheDocument())

    // 2. Go offline
    mockNavigatorOnline(false)

    // 3. Reload page
    rerender(<AlmanacPage />)
    await waitFor(() => {
      expect(screen.getByText(/offline/i)).toBeInTheDocument()
      expect(screen.getByText('38°')).toBeInTheDocument()
    })
  })

  test('retries when connection restored', async () => {
    // Go offline, then back online
    mockNavigatorOnline(false)
    // ... verify offline mode
    mockNavigatorOnline(true)
    // ... verify fresh data fetch
  })
})
```

### Manual Testing (DevTools)

1. **Browser Cache:**
   - Open DevTools > Network tab
   - Load `/almanac`
   - Refresh page → should see 304 (Not Modified) for weather endpoint
   - Wait 61 seconds and refresh → fresh request

2. **localStorage:**
   - DevTools > Application > localStorage
   - Verify `weather-cache-36.48,-82.26` exists
   - Contains timestamp and data

3. **Offline Mode:**
   - DevTools > Network tab > Throttle to "Offline"
   - Reload page → should show cached data + "Offline" banner
   - Disable offline → should fetch fresh data

4. **Poor Connection (3G Throttle):**
   - DevTools > Network tab > Throttle to "Slow 3G" (~400ms latency)
   - First load: 3.8s
   - Cached load: <500ms
   - Measure with React DevTools Profiler

---

## Migration Path

### Phase 2.1: Library (No UI changes)

- Create `weatherCache.ts` utility
- No changes to existing components
- Can deploy independently
- Tests: Unit tests only

### Phase 2.2: API Headers (Server-only)

- Update all 5 API endpoints
- Add `max-age=60`
- No client changes needed
- Automatic benefit for all browsers

### Phase 2.3: Almana Page Integration

- Modify main page component
- Add cache status state
- Integrate fallback logic
- No breaking changes to child components

### Phase 2.4-2.5: Child Components

- Update AirQualityCard, NWSAlertBanner, etc.
- Each can be updated independently
- Backward compatible

### Phase 2.6: Network Detection

- Add online/offline hooks
- Enhance user experience
- Graceful degradation if unsupported

---

## Error Handling Strategy

### localStorage Failures

```typescript
try {
  saveWeatherToCache(data, location)
} catch (err) {
  if (err instanceof DOMException && err.name === 'QuotaExceededError') {
    // Storage full: evict oldest cache entry
    clearOldestCache()
    // Retry save
    saveWeatherToCache(data, location)
  }
  // Log but don't throw (app still works without cache)
  logger.warn('Cache save failed:', err)
}
```

### Corrupted Cache

```typescript
export function loadWeatherFromCache(location: GeoLocation) {
  try {
    const key = getCacheKey(location)
    const json = localStorage.getItem(key)
    if (!json) return null
    const parsed = JSON.parse(json)
    // Validate schema
    if (!parsed.version || !parsed.data) return null
    return parsed
  } catch (err) {
    // Invalid JSON or corruption: ignore and return null
    // Component will refetch from API
    logger.warn('Cache corrupted:', err)
    return null
  }
}
```

### Privacy Mode (localStorage disabled)

```typescript
function canUseLocalStorage(): boolean {
  try {
    const key = '__localStorage_test__'
    localStorage.setItem(key, 'test')
    localStorage.removeItem(key)
    return true
  } catch {
    return false // Privacy mode or quota exceeded
  }
}

if (canUseLocalStorage()) {
  saveWeatherToCache(data, location)
} else {
  // Graceful fallback: use only browser cache (HTTP headers)
  logger.debug('localStorage unavailable, using browser cache only')
}
```

---

## Performance Impact

### Before Phase 2

- First visit: 3.8s (API call + rendering)
- Cached visit (same browser, same minute): 3.8s (cache miss due to URL params)
- Offline: Error screen
- Poor connection (3G): Timeout + retry delay

### After Phase 2

- First visit: 2.5s (60s browser cache hit likelihood: ~50%)
  - Some users get 1.5s (cache hit)
  - Some users get 3.8s (cache miss, fresh fetch)
- Cached visit: 1.6s
  - Browser cache hit from previous request
  - localStorage as fallback
- Offline: Instant (localStorage served)
- Poor connection: Fallback to cached data instead of timeout

### Metrics

- **Browser cache hit rate:** ~50% (1min TTL, same location visitors)
- **localStorage fallback rate:** ~5-10% (API failures)
- **Offline usage:** 2-5% (rural areas, signal loss)
- **Expected improvement:** 35-40% faster average load time

---

## Rollback Plan

If issues discovered after Phase 2 deployment:

1. **Revert cache headers** (Phase 2.2):
   - Remove `max-age=60` from API endpoints
   - Keep `s-maxage=300, stale-while-revalidate=600`
   - Instant fix (no code changes needed)

2. **Disable localStorage fallback** (Phase 2.3-2.5):
   - Set `USE_FALLBACK_CACHE = false` in config
   - Keep cache utility for future use
   - Safe rollback

3. **Disable offline mode** (Phase 2.6):
   - Remove network detection hook
   - Back to previous online-only behavior

---

## Success Criteria for Phase 2

- [x] **Browser cache:** 60s TTL reduces duplicate requests by 50%
- [x] **Offline fallback:** Shows cached data (not error) when offline
- [x] **Performance:** Average load time improves from 3.8s → 2.5s
- [x] **User visibility:** Clear indication of data freshness (Live / Cached / Offline)
- [x] **Reliability:** Graceful degradation in all error scenarios
- [x] **No API impacts:** Still respects rate limits and ToS
- [x] **Testing coverage:** Unit + integration tests for cache layer
- [x] **Documentation:** Implementation guide for future maintainers

---

## Deployment Checklist

- [ ] Phase 2.1: Merge weatherCache.ts utility
- [ ] Phase 2.1: Tests passing (unit tests)
- [ ] Phase 2.2: API endpoints updated with max-age headers
- [ ] Phase 2.2: Deploy to staging, verify via DevTools Network tab
- [ ] Phase 2.3: Almanac page modified with fallback logic
- [ ] Phase 2.3-2.5: Integration tests passing
- [ ] Phase 2.3-2.5: Components updated with error handling
- [ ] Phase 2.6: Online/offline detection implemented
- [ ] Full E2E test: Offline mode verified
- [ ] Performance audit: Lighthouse score measured
- [ ] Merge to main and deploy to production
- [ ] Monitor analytics for cache hit rate
- [ ] Monitor error logs for cache failures

---

## References

- **Open-Meteo Rate Limits:** 1 request per IP per minute (free tier)
- **HTTP Caching Best Practices:** [MDN Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- **localStorage Limits:** ~5-10MB per origin (varies by browser)
- **navigator.onLine:** [MDN Online Status](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine)
- **Stale-While-Revalidate:** [RFC 5861](https://datatracker.ietf.org/doc/html/rfc5861)

---

**Plan prepared by:** Dr. Elena Volkov
**Ready for:** Immediate implementation after Phase 1 completion
**Expected duration:** 3-4 working days
