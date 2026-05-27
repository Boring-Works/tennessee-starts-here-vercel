# Phase 4: Implementation Guide

**Quick Reference for Executing the SSR Refactor**

---

## Architecture Decision: Hybrid Server/Client

```
Server Renders          Client Adds Interactivity
├─ Default weather      ├─ Location picker
├─ Static layout        ├─ View toggle
├─ Initial HTML         ├─ Chart interactions
├─ Pre-calculated data  ├─ Modals
└─ Suspense boundaries  └─ Local state
```

---

## Week 1: Server Data Layer

### Step 1: Create Server-Side Data Functions

**File: `lib/almanac/server.ts`** (NEW)

```typescript
/**
 * Server-side weather data layer
 * These functions run on the server during page render
 * Never exported to client
 */

import { DEFAULT_LOCATION } from './geocoding'
import { transformWeatherData } from './weather'
import { calculateAllTaskScores, buildExtendedMetrics, calculateNativePulse } from './taskScores'
import { getDualSaying } from './sayings'
import { getMoonData, isDay } from './moonPhase'
import type { WeatherData, TaskScores as TaskScoresType, MoonData, DualSaying } from './types'

const WEATHER_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export interface AlmanacServerData {
  weather: WeatherData
  taskScores: TaskScoresType
  nativePulse: any
  saying: DualSaying
  moon: MoonData
  lastUpdated: Date
}

/**
 * Fetch and process all weather data for display
 * This runs on the server and returns fully processed data
 */
export async function fetchAlmanacData(
  latitude: number = DEFAULT_LOCATION.latitude,
  longitude: number = DEFAULT_LOCATION.longitude
): Promise<AlmanacServerData> {
  try {
    // 1. Fetch raw weather data
    const response = await fetch(
      `${WEATHER_API_BASE}/api/weather?lat=${latitude}&lon=${longitude}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const rawData = await response.json()

    // 2. Transform to internal format
    const weather = transformWeatherData(rawData)

    // 3. Calculate all metrics
    const metrics = buildExtendedMetrics(weather)
    const taskScores = calculateAllTaskScores(weather)
    const nativePulse = calculateNativePulse(metrics)

    // 4. Generate contextual content
    const daylight = isDay(new Date(), latitude, longitude)
    const saying = getDualSaying(
      weather.current.weatherCode,
      weather.current.temperature,
      weather.current.windSpeed,
      daylight
    )

    // 5. Get moon data
    const moon = getMoonData()

    return {
      weather,
      taskScores,
      nativePulse,
      saying,
      moon,
      lastUpdated: new Date(),
    }
  } catch (error) {
    console.error('Server data fetch error:', error)

    // Return error object that client can handle
    throw new Error('Unable to load weather data. Please try refreshing.')
  }
}
```

**Key Points:**

- No `'use client'` needed
- No React imports needed
- Returns plain objects (JSON serializable)
- Handles retries/errors on server
- Caching is built-in (`next: { revalidate: 300 }`)

---

### Step 2: Convert Page to Server Component

**File: `app/(almanac)/almanac/page.tsx`** (MODIFY)

**BEFORE:**

```typescript
'use client'  // ❌ LINE 1 PROBLEM

export default function AlmanacPage() {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  // ... 13 more useState calls ...

  useEffect(() => {
    const savedLocation = loadLocation()
    setLocation(savedLocation)
    fetchWeather(savedLocation)
  }, [])

  if (loading || !location) {
    return <LoadingScreen /> // ❌ Shows blank screen
  }

  return (
    <div>
      <TopBar location={location} onLocationChange={handleLocationChange} />
      {/* ... rest of page ... */}
    </div>
  )
}
```

**AFTER:**

```typescript
// ✅ NO 'use client' - THIS IS A SERVER COMPONENT NOW

import { Suspense } from 'react'
import { DEFAULT_LOCATION } from '@/lib/almanac/geocoding'
import { fetchAlmanacData } from '@/lib/almanac/server'
import { AlmanacClientWrapper } from './AlmanacClientWrapper'

export const revalidate = 300 // ISR: revalidate every 5 minutes

export default async function AlmanacPage() {
  // ✅ Fetch on server - no loading state needed!
  const data = await fetchAlmanacData(
    DEFAULT_LOCATION.latitude,
    DEFAULT_LOCATION.longitude
  )

  // ✅ Pass data to client wrapper
  // Client wrapper handles interactivity, state, location changes
  return (
    <AlmanacClientWrapper
      initialWeather={data.weather}
      initialTaskScores={data.taskScores}
      initialNativePulse={data.nativePulse}
      initialSaying={data.saying}
      initialMoon={data.moon}
      initialLocation={DEFAULT_LOCATION}
      lastUpdated={data.lastUpdated}
    />
  )
}
```

**Changes Summary:**

- ✅ Remove `'use client'`
- ✅ Make function `async`
- ✅ Remove all `useState` calls
- ✅ Remove all `useEffect` calls
- ✅ Remove `fetchWeather` callback
- ✅ Import `fetchAlmanacData` from server
- ✅ Call it and pass result to client wrapper
- ✅ Add ISR revalidation

---

### Step 3: Create Client Wrapper Component

**File: `app/(almanac)/almanac/AlmanacClientWrapper.tsx`** (NEW)

```typescript
'use client'

import { useState, useCallback, useMemo } from 'react'
import { Sprout, Leaf } from 'lucide-react'
import { WeatherAtmosphere } from '@/components/almanac/WeatherAtmosphere'
import { TopBar } from '@/components/almanac/TopBar'
import { ViewToggle } from '@/components/almanac/ViewToggle'
import { NowDisplay } from '@/components/almanac/NowDisplay'
import { TaskScores } from '@/components/almanac/TaskScores'
// ... import other components ...

import { formatLocationName, type GeoLocation } from '@/lib/almanac/geocoding'
import { saveLocation } from '@/lib/almanac/storage'
import type { WeatherData, TaskScores as TaskScoresType, MoonData, DualSaying, NativePulseResult } from '@/lib/almanac/types'
import { findTodayDailyIndex } from '@/lib/almanac/dateUtils'

interface AlmanacClientWrapperProps {
  // Data from server
  initialWeather: WeatherData
  initialTaskScores: TaskScoresType
  initialNativePulse: NativePulseResult
  initialSaying: DualSaying
  initialMoon: MoonData
  initialLocation: GeoLocation
  lastUpdated: Date
}

export function AlmanacClientWrapper({
  initialWeather,
  initialTaskScores,
  initialNativePulse,
  initialSaying,
  initialMoon,
  initialLocation,
  lastUpdated,
}: AlmanacClientWrapperProps) {
  // ✅ Keep only interactive state
  const [view, setView] = useState<'almanac' | 'governor'>('almanac')
  const [location, setLocation] = useState<GeoLocation>(initialLocation)
  const [weather, setWeather] = useState<WeatherData>(initialWeather)
  const [taskScores, setTaskScores] = useState<TaskScoresType>(initialTaskScores)
  const [nativePulse, setNativePulse] = useState<NativePulseResult>(initialNativePulse)
  const [saying, setSaying] = useState<DualSaying>(initialSaying)
  const [moon, setMoon] = useState<MoonData>(initialMoon)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdatedTime, setLastUpdatedTime] = useState<Date>(lastUpdated)
  const [aqi, setAqi] = useState<number | null>(null)
  const [burnDayStatus, setBurnDayStatus] = useState<'burn' | 'no-burn' | 'unknown'>('unknown')
  const [hasActiveAlert, setHasActiveAlert] = useState(false)
  const [alertTitle, setAlertTitle] = useState<string | undefined>()

  // ✅ Location change handler - remains the same
  const handleLocationChange = useCallback(
    async (newLocation: GeoLocation) => {
      setLocation(newLocation)
      saveLocation(newLocation)
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/weather?lat=${newLocation.latitude}&lon=${newLocation.longitude}`
        )

        if (!response.ok) throw new Error('Failed to fetch weather')

        const data = await response.json()

        // ✅ Transform and calculate (same as before)
        const weatherData = transformWeatherData(data)
        const metrics = buildExtendedMetrics(weatherData)
        const scores = calculateAllTaskScores(weatherData)
        const pulse = calculateNativePulse(metrics)

        setWeather(weatherData)
        setTaskScores(scores)
        setNativePulse(pulse)
        setLastUpdatedTime(new Date())
      } catch (err) {
        setError('Failed to load weather for new location')
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // ✅ Memoize derived values
  const todayIndex = useMemo(() => {
    return findTodayDailyIndex(weather.daily.time)
  }, [weather])

  const freezeInfo = useMemo(() => {
    const isBelow32 = weather.current.temperature <= 32
    const frostRisk = weather.current.temperature <= 36 && weather.current.humidity > 80
    let nextFreezeHours: number | undefined
    if (weather.current.temperature > 32) {
      for (let i = 0; i < Math.min(24, weather.hourly.temperature.length); i++) {
        if (weather.hourly.temperature[i] <= 32) {
          nextFreezeHours = i
          break
        }
      }
    }
    return { isBelow32, frostRisk, nextFreezeHours }
  }, [weather])

  // ✅ Rest of render logic stays exactly the same
  // Just moved from page.tsx to here

  return (
    <div className="min-h-screen bg-midnight">
      <WeatherAtmosphere weatherCode={weather.current.weatherCode} />

      <TopBar
        location={location}
        onLocationChange={handleLocationChange}
        temperature={weather.current.temperature}
        condition={getWeatherInfo(weather.current.weatherCode).condition}
        isLoading={loading}
      />

      <main id="main-content" className="min-h-screen text-almanac-parchment relative z-10">
        <div className="max-w-3xl lg:max-w-7xl mx-auto px-4 lg:px-6 pt-6">
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        {view === 'almanac' && (
          <div className="max-w-3xl lg:max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
            {/* ... rest of page JSX goes here ... */}
            <NowDisplay
              temperature={weather.current.temperature}
              feelsLike={weather.current.feelsLike}
              // ... other props ...
            />
            <TaskScores
              sower={taskScores.sower}
              shepherd={taskScores.shepherd}
              keeper={taskScores.keeper}
              builder={taskScores.builder}
              aqi={aqi}
            />
            {/* ... continue rest of JSX ... */}
          </div>
        )}

        {/* ... governor view ... */}
      </main>
    </div>
  )
}
```

**Strategy:**

- Keep all the original JSX (it's not broken, just was on server before)
- Keep all the state management for interactivity
- Add props for initial data from server
- Location change still works exactly as before

---

### Step 4: Update `page.tsx` to Import New Component

**File: `app/(almanac)/almanac/page.tsx`** (SIMPLIFY)

After creating the wrapper, `page.tsx` becomes very short:

```typescript
import { Suspense } from 'react'
import { DEFAULT_LOCATION } from '@/lib/almanac/geocoding'
import { fetchAlmanacData } from '@/lib/almanac/server'
import { AlmanacClientWrapper } from './AlmanacClientWrapper'

export const revalidate = 300

export default async function AlmanacPage() {
  const data = await fetchAlmanacData(
    DEFAULT_LOCATION.latitude,
    DEFAULT_LOCATION.longitude
  )

  return (
    <AlmanacClientWrapper
      initialWeather={data.weather}
      initialTaskScores={data.taskScores}
      initialNativePulse={data.nativePulse}
      initialSaying={data.saying}
      initialMoon={data.moon}
      initialLocation={DEFAULT_LOCATION}
      lastUpdated={data.lastUpdated}
    />
  )
}
```

**That's it!** The page now:

1. Fetches data on server (no JS needed)
2. Ships HTML with data embedded
3. Passes to client wrapper for interactivity
4. Client wrapper uses exact same logic as before

---

### Step 5: Testing Checklist

```bash
# Build and verify no errors
npm run build
# ✓ Should compile successfully

# Start dev server
npm run dev

# Visit /almanac in browser
# ✓ Content should appear IMMEDIATELY (no loading skeleton)
# ✓ Check DevTools Network tab: HTML arrives with weather data

# Lighthouse scan
lighthouse http://localhost:3000/almanac --view
# ✓ FCP should be ~1.0-1.4s (was 2.1s)
# ✓ No "Hydration Mismatch" in console

# Test location change
# ✓ Click location picker
# ✓ Search for "Nashville"
# ✓ Weather updates
# ✓ Reload page - location persists (from localStorage)

# Test error handling
# Turn off network (DevTools)
# ✓ Should see graceful error message
# ✓ Retry button should work when network comes back
```

---

## Week 2-4: Refinement

### Performance Optimization Priorities

**Quick wins (1-2 days each):**

1. Add Suspense boundaries to heavy components
2. Implement proper skeleton loaders
3. Code split charts/maps
4. Optimize images

**Medium effort (3-5 days):**

1. Cookie-based location persistence (if needed)
2. ISR for periodic revalidation
3. Mobile optimization

**Nice to have:**

1. Service worker for offline support
2. Analytics integration
3. A/B testing

---

## Monitoring & Rollback

### Before Deploying

```bash
# 1. Local build verification
npm run build
npm run start

# 2. Lighthouse scorecard
lighthouse http://localhost:3000/almanac --view

# 3. Manual feature testing
# - Location picker works
# - Charts load
# - Modals work
# - Error states show

# 4. Network throttling test
# DevTools > Network > Slow 4G
# Should still show content in <2s

# 5. Hydration check
# DevTools > Console
# No warnings about hydration mismatches
```

### If Something Breaks

**Hydration mismatch?**

- Check console for specific element diff
- Verify time-based values use `useHourlyStartIndex` hook
- Use `--trace-hydration` during build

**Location not persisting?**

- Still uses localStorage (that works on client)
- If switching to cookies, verify cookie is being set

**Charts not rendering?**

- Check Suspense fallback is displaying
- Verify chart library is dynamic imported
- Check console for JavaScript errors

**Performance not improving?**

- Run Lighthouse again (different network conditions?)
- Check if API caching is working (5 min ISR)
- Verify static files are being served (check .next/static)

---

## Commit Strategy

### Week 1 Commits

```
1. "refactor: extract server-side weather data fetching"
   - Add lib/almanac/server.ts
   - Update app/api/weather/route.ts for server calls

2. "refactor: split almanac page into server and client components"
   - Convert page.tsx to async server component
   - Create AlmanacClientWrapper.tsx
   - Verify no hydration mismatches

3. "perf: enable ISR for almanac page"
   - Set revalidate = 300
   - Verify Lighthouse improvement
```

### Week 2-4 Commits

```
4. "perf: add Suspense boundaries for heavy components"
5. "perf: implement skeleton loaders for charts"
6. "feat: cookie-based location persistence"
7. "perf: optimize bundle with code splitting"
8. "docs: update CLAUDE.md with new architecture"
```

---

## FAQ

**Q: Will this break the location picker?**
A: No. Location picker works the same, just starts with DEFAULT_LOCATION instead of loading nothing.

**Q: Do I need to change component files?**
A: No. They work exactly as before. You're just moving where the data flows from (server vs client).

**Q: What about real-time updates?**
A: Currently handled by manual refresh button (StaleDataWarning). ISR will auto-refresh server copy every 5 min.

**Q: Will charts still work?**
A: Yes. They're dynamically imported with `ssr: false`, so they still lazy-load. You'll just see skeleton instead of blank space.

**Q: What if the API is slow?**
A: Server waits up to ~10s. If API fails, page render fails. Might want a fallback state.

**Q: Do I need to update database?**
A: No. This is all client/server rendering logic. Data sources unchanged.

---

## Success Criteria

After Week 1:

- [ ] `npm run build` succeeds
- [ ] `/almanac` loads with no blank screen
- [ ] Content visible in <1.2s
- [ ] Lighthouse FCP < 1.5s
- [ ] No hydration warnings in console
- [ ] Location picker works after loading

After Week 2-4:

- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TTI < 3.0s
- [ ] Lighthouse Performance ≥ 85
- [ ] All features working (modals, sharing, etc.)
- [ ] Error handling graceful

---

## Files Changed Summary

### Created

- `lib/almanac/server.ts` — Server data fetching functions
- `app/(almanac)/almanac/AlmanacClientWrapper.tsx` — Client interactive component

### Modified

- `app/(almanac)/almanac/page.tsx` — Convert to async server component

### No Changes Needed

- All component files (NowDisplay, TaskScores, etc.)
- API routes
- Type definitions
- Business logic

---

**Ready to implement. Questions? Ask before starting Week 1.**
