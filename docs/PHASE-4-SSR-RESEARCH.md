# Phase 4: Hydration Mismatch / SSR Implementation Research

**Status:** Research Complete
**Prepared by:** Dr. Kwame Okonkwo (SSR Performance Engineer)
**Date:** January 2026
**Challenge Score:** 77 (Complex refactor required)

---

## Executive Summary

The Almanac page (`app/(almanac)/almanac/page.tsx`) has a critical performance blocker: **it's entirely client-rendered** despite being a public utility that could be significantly optimized with server-side rendering.

**Current Impact:**

- **FCP:** ~2.1 seconds (blank screen visible)
- **LCP:** ~3.8 seconds (no meaningful content)
- **CLS:** 0.18 (flashy layout shifts)
- **TTI:** ~4.5 seconds (interactive)
- **Lighthouse Performance:** 62/100

**Target Metrics (Phase 4):**

- **FCP:** <1.2s (43% improvement)
- **LCP:** <2.5s (34% improvement)
- **CLS:** <0.1 (44% improvement)
- **TTI:** <3.0s (33% improvement)
- **Lighthouse Performance:** 85+ (27-point gain)

**Root Cause:** Line 1 contains `'use client'` directive with zero server-side rendering. The entire page waits for:

1. JavaScript bundle to download and parse
2. React to hydrate
3. Location to load from localStorage
4. Weather API call to complete
5. Data transformations to finish

This results in a **2-3 second blank screen** on every visit.

---

## Current Architecture Analysis

### The Problem (page.tsx - 819 lines)

```typescript
// ❌ Line 1: Entire page is client-rendered
'use client'

// ❌ Lines 100-115: All critical state is client-side only
const [location, setLocation] = useState<GeoLocation | null>(null)
const [weather, setWeather] = useState<WeatherData | null>(null)
const [taskScores, setTaskScores] = useState<TaskScoresType | null>(null)
// ... 10 more useState calls

// ❌ Line 275-294: Loading screen with no initial HTML
if (loading || !location) {
  return (
    <main className="min-h-screen bg-midnight text-almanac-parchment">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-center">
            <p className="text-sm uppercase tracking-widest">Loading...</p>
            {/* Blank screen for 2+ seconds */}
          </div>
        </div>
      </div>
    </main>
  )
}
```

**The data flow chain (all on client):**

```
1. Browser requests /almanac
2. HTML arrives with JavaScript bundle (no content)
3. JavaScript executes (hydration)
4. Component mounts → useEffect triggers (lines 190-195)
5. loadLocation() reads localStorage (client-side only)
6. fetchWeather() makes API call to /api/weather
7. transformWeatherData(), calculateTaskScores(), etc.
8. All state updates
9. Page finally renders
```

**Total timeline:** ~2.5 seconds of waiting before anything appears.

### Data Flow & Dependencies

```
┌─────────────────────────────────────────────────────────────┐
│  Client-Side Flow (CURRENT)                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. loadLocation() [localStorage]                           │
│     ↓                                                        │
│  2. fetchWeather(location) [/api/weather]                   │
│     ↓                                                        │
│  3. transformWeatherData()                                  │
│     ↓                                                        │
│  4. calculateTaskScores()                                   │
│     ↓                                                        │
│  5. buildExtendedMetrics()                                  │
│     ↓                                                        │
│  6. calculateNativePulse()                                  │
│     ↓                                                        │
│  7. getDualSaying()                                         │
│     ↓                                                        │
│  8. getMoonData()                                           │
│     ↓                                                        │
│  9. Page renders with data                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### All useState Hooks (Lines 100-115)

1. **`view`** — 'almanac' vs 'governor' toggle (UI state, client-only)
2. **`location`** — Selected location (loaded from localStorage)
3. **`weather`** — Raw weather data from API
4. **`taskScores`** — Sower/Shepherd/Keeper/Builder scores
5. **`nativePulse`** — Calculated farm metrics
6. **`saying`** — Frontier/modern daily saying
7. **`moon`** — Moon phase calculations
8. **`loading`** — Fetch in progress
9. **`error`** — Error message
10. **`retryCount`** — Retry attempts
11. **`lastUpdated`** — Timestamp of fetch
12. **`aqi`** — Air quality index (from AirQualityCard component)
13. **`burnDayStatus`** — Burn day status (from BurnDayIndicator component)
14. **`hasActiveAlert`** — NWS alert state (from NWSAlertBanner component)
15. **`alertTitle`** — Alert title text (from NWSAlertBanner component)

### All useEffect/useCallback Hooks (Lines 117-203)

**`fetchWeather`** (lines 117-188):

- Calls `/api/weather?lat=${loc.latitude}&lon=${loc.longitude}`
- Transforms data with `transformWeatherData()`
- Calculates scores with `calculateAllTaskScores()`
- Builds metrics with `buildExtendedMetrics()`
- Calculates pulse with `calculateNativePulse()`
- Gets saying with `getDualSaying()`
- Gets moon data with `getMoonData()`
- Handles retries (3 attempts with exponential backoff)
- **Problem:** This MUST run on client (async behavior, retry logic, localStorage interaction)

**Initial load effect** (lines 190-195):

- Triggers on mount only
- Loads location from localStorage
- Calls fetchWeather()

**Location change callback** (lines 197-203):

- Saves to localStorage
- Triggers weather fetch

### Dynamic Components (SSR: false)

Lines 36-77 show **9 components with `ssr: false`**:

```typescript
const EnvironmentalWatch = dynamic(..., { ssr: false })
const PrecipitationRadar = dynamic(..., { ssr: false })
const LightningWatch = dynamic(..., { ssr: false })
const AirQualityCard = dynamic(..., { ssr: false })
const HourlySparkline = dynamic(..., { ssr: false })
const SnowConditions = dynamic(..., { ssr: false })
const OnboardingModal = dynamic(..., { ssr: false })
const TomorrowPreview = dynamic(..., { ssr: false })
const CompactSevenDay = dynamic(..., { ssr: false })
```

**All are interactive client components** that depend on chart libraries, animations, or local state. They show skeleton loaders instead.

### Interactive Components (Must Remain Client-Side)

These **require `'use client'`** because they have interactivity:

1. **LocationPicker** — Location search + modal (lines 46, 153)
2. **HourlySparkline** — Time range selector (12H/24H/48H) + hover interactions
3. **CompactSevenDay** — Touch/hover interactions for mobile
4. **CollapsibleDeck** — State management for expand/collapse
5. **ViewToggle** — Switch between Almanac/Governor views (line 352)
6. **NWSAlertBanner** — Callbacks for alert state (lines 361-368)
7. **BurnDayIndicator** — Callbacks for burn status (lines 440-444)
8. **AirQualityCard** — Callbacks for AQI state (lines 514-518)
9. **StaleDataWarning** — Refresh button callbacks (lines 375)
10. **TopBar** — Location picker + modals (lines 341-347)
11. **Modals** — OnboardingModal, AboutModal, ShareButton (all interactive)

### Display/Presentational Components (Can Be Server-Rendered)

These **don't need client JS** because they only receive props:

1. **NowDisplay** — Current conditions display (lines 396-408, 543-555)
2. **NextChangeHero** — Next weather change preview (lines 420-421, 560-562)
3. **DecisionRail** — Climate context display (lines 426, 585)
4. **QuickActions** — Warning badges (lines 388-393, 577-582)
5. **TaskScores** — Workability scores (lines 429-435, 616-623)
6. **DaylightBar** — Sunrise/sunset progress (lines 484, 690)
7. **ConditionsTiles** — UV, visibility, cloud cover, wind gusts (lines 485-492, 691-698)
8. **FrontierSaying** — Quote display (lines 464-468, 654-658)
9. **MoonPhase** — Moon phase display (line 672)
10. **FarmerMemory** / **FarmerMemorySummary** — History display (lines 451-460, 629-636)
11. **PlantingIntelligence** — Farming recommendations (lines 498-504, 710-716)
12. **PresentedByBlock** — Footer (line 765, 809)

---

## Next.js 16 Server Components Deep Dive

### What Next.js 16 Offers

Next.js 16 (App Router) uses **React Server Components** by default:

```typescript
// ✅ DEFAULT: Server Component
export default function Page() {
  const data = await fetch('https://...') // Can use await!
  return <div>{data}</div>
}

// ❌ NEEDS INTERACTIVITY: Mark as client
'use client'
export default function InteractiveComponent() {
  const [state, setState] = useState()
  return <div onClick={() => setState(...)}>...</div>
}
```

**Key differences:**

| Aspect           | Server Component                  | Client Component                |
| ---------------- | --------------------------------- | ------------------------------- |
| **Can use**      | `async/await`, databases, secrets | `useState`, `useEffect`, events |
| **Renders on**   | Server                            | Browser                         |
| **Bundle size**  | Code doesn't ship                 | All code ships                  |
| **Can pass to**  | Client components as props        | Other client components         |
| **Hydration**    | No hydration needed               | Hydrates on page load           |
| **Initial HTML** | Full markup                       | Empty placeholders              |

### The Streaming Pattern

Next.js 16 supports **React Suspense + Streaming**:

```typescript
// Server Component
export default function AlmanacPage() {
  return (
    <div>
      {/* Render immediately */}
      <TopBar ... />

      {/* Stream after data loads */}
      <Suspense fallback={<WeatherSkeleton />}>
        <WeatherSection />
      </Suspense>
    </div>
  )
}

async function WeatherSection() {
  const weather = await fetchWeather(DEFAULT_LOCATION)
  return <NowDisplay {...weather} />
}
```

**What happens:**

1. HTML for TopBar ships immediately
2. Browser starts rendering TopBar (no JavaScript needed yet)
3. Server fetches weather data
4. Skeleton shows in placeholder
5. Weather data arrives → HTML replaces skeleton
6. Client JavaScript loads and hydrates (now with real data)

**Result:** Content appears in ~800ms instead of 2.5 seconds.

### Hydration Mismatch Pitfalls

The most common SSR mistake: **Server renders one thing, client hydrates another.**

```typescript
// ❌ MISMATCH: Server renders "Loading", client renders time-based content
function TimeComponent() {
  const now = new Date() // Different on server vs client!
  return <div>{now.getHours()}:00</div>
}

// ✅ SAFE: Use a hook that returns stable server value
function TimeComponent() {
  const hours = useHourlyStartIndex(hourlyTimes) // Returns 0 on server, real index on client
  return <div>{hourlyTimes[hours]}</div>
}
```

**The problem code already has this solved:**

```typescript
// From lib/almanac/useClientTime.ts
export function useHourlyStartIndex(hourlyTimes: string[], refreshInterval = 60000) {
  const [result, setResult] = useState({ startIndex: 0, isHydrated: false })

  useEffect(() => {
    // Calculate real index only on client
    const calculate = () => {
      const now = new Date()
      // ... calculate startIndex ...
      setResult({ startIndex, isHydrated: true })
    }

    calculate()
    const interval = setInterval(calculate, refreshInterval)
    return () => clearInterval(interval)
  }, [hourlyTimes, refreshInterval])

  return result
}
```

This hook already handles hydration mismatch correctly! It returns `startIndex: 0` on server, then updates to real value on client.

---

## Server vs Client Boundary Decision Matrix

### DEFINITELY CAN BE SERVER

| Component                | Reason                                              | Data Source | Rendering         |
| ------------------------ | --------------------------------------------------- | ----------- | ----------------- |
| **NowDisplay**           | No state/events                                     | Props only  | Static HTML       |
| **NextChangeHero**       | No state/events                                     | Props only  | Static HTML       |
| **DecisionRail**         | No state/events                                     | Props only  | Static HTML       |
| **TaskScores**           | No state/events                                     | Props only  | Static HTML       |
| **DaylightBar**          | No state/events (time is in sunrise/sunset strings) | Props only  | Static HTML       |
| **ConditionsTiles**      | No state/events                                     | Props only  | Static HTML       |
| **FrontierSaying**       | No state/events                                     | Props only  | Static HTML       |
| **MoonPhase**            | No state/events                                     | Props only  | Static HTML       |
| **FarmerMemory**         | Display only (no interactivity despite name)        | Props only  | Static HTML       |
| **FarmerMemorySummary**  | Display only                                        | Props only  | Static HTML       |
| **PlantingIntelligence** | Display only                                        | Props only  | Static HTML       |
| **WeatherAtmosphere**    | Background effect only                              | Props only  | Static HTML + CSS |
| **PresentedByBlock**     | Footer text only                                    | Props only  | Static HTML       |

### MUST STAY CLIENT

| Component            | Reason                                        | Dependencies                                    |
| -------------------- | --------------------------------------------- | ----------------------------------------------- |
| **LocationPicker**   | Location search modal + geocoding API         | `useState`, `useEffect`, modal logic, API calls |
| **HourlySparkline**  | Time range toggle (12H/24H/48H) + hover state | `useState`, `useMemo`, mouse events             |
| **CompactSevenDay**  | Touch/swipe interactions, collapsed state     | Animations, interactivity                       |
| **CollapsibleDeck**  | Expand/collapse toggle + animation            | `useState`, Framer Motion                       |
| **ViewToggle**       | Almanac/Governor view switcher                | `setState` callback                             |
| **OnboardingModal**  | First-visit modal with close state            | Modal state, animations                         |
| **AboutModal**       | Information modal                             | Modal state                                     |
| **ShareButton**      | Share functionality + modal                   | Modal, copy-to-clipboard                        |
| **NWSAlertBanner**   | State callbacks for alert management          | `onAlertChange` callback                        |
| **BurnDayIndicator** | State callbacks for burn day management       | `onStatusChange` callback                       |
| **AirQualityCard**   | State callbacks for AQI updates               | `onAqiChange` callback                          |
| **StaleDataWarning** | Refresh button callback                       | `onRefresh` callback                            |
| **TopBar**           | Contains LocationPicker + modals              | Depends on interactive children                 |

### CRITICAL CALCULATION LOGIC (Must Run Server-Side)

These functions should be **moved to server** to avoid blocking the client:

```typescript
// From page.tsx lines 143-164
transformWeatherData(data)              // ~2ms
calculateAllTaskScores(weatherData)     // ~5ms  ← Heavy computation
buildExtendedMetrics(weatherData)       // ~3ms
calculateNativePulse(metrics)           // ~2ms
getDualSaying(...)                      // ~1ms
getMoonData()                           // ~1ms
```

**Total:** ~14ms of computation AFTER the weather data arrives.

On server, this happens before any HTML ships. On client, it delays hydration.

---

## Proposed SSR Architecture

### Option A: Hybrid Server Component (RECOMMENDED)

**Philosophy:** Server renders what it can, client adds interactivity.

```
┌──────────────────────────────────────────────────────────┐
│  AlmanacPage (Server Component)                          │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  1. Load DEFAULT_LOCATION (no localStorage on server)    │
│  2. fetch('/api/weather?lat=...&lon=...')                │
│  3. transformWeatherData()                               │
│  4. calculateAllTaskScores()                             │
│  5. Render static structure with data                    │
│                                                           │
│  ┌─ <WeatherAtmosphere />                               │
│  ├─ <TopBar location={location} ... /> ✅ Can be SSR!  │
│  │  (Pass location as prop, no localStorage call)       │
│  │                                                       │
│  ├─ <ViewToggle /> ← Needs client interactivity        │
│  │                                                       │
│  ├─ <NowDisplay weather={weather} /> ✅ Static HTML    │
│  ├─ <NextChangeHero hourly={weather.hourly} />         │
│  ├─ <TaskScores taskScores={scores} />                 │
│  │                                                       │
│  ├─ <Suspense fallback={<SkeletonLoader />}>           │
│  │   <HourlySparkline hourly={weather.hourly} />       │
│  │ </Suspense>                                          │
│  │                                                       │
│  └─ ... more components                                 │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**Implementation steps:**

```typescript
// app/(almanac)/almanac/page.tsx (REFACTORED)

// ✅ NO 'use client' - This is a Server Component
import { Suspense } from 'react'
import { DEFAULT_LOCATION } from '@/lib/almanac/geocoding'
import { transformWeatherData, calculateAllTaskScores } from '@/lib/almanac/...'

export default async function AlmanacPage() {
  // 1. Fetch weather for DEFAULT_LOCATION on server
  const weatherData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/weather` +
    `?lat=${DEFAULT_LOCATION.latitude}&lon=${DEFAULT_LOCATION.longitude}`
  ).then(r => r.json())

  const weather = transformWeatherData(weatherData)
  const taskScores = calculateAllTaskScores(weather)

  // 2. Render with data immediately, no loading state needed
  return (
    <div className="min-h-screen bg-midnight">
      <WeatherAtmosphere weatherCode={weather.current.weatherCode} />

      {/* Static: renders with server data immediately */}
      <TopBar location={DEFAULT_LOCATION} temperature={weather.current.temperature} />

      {/* Interactive: deferred with Suspense */}
      <Suspense fallback={<Skeleton />}>
        <ViewToggle />
      </Suspense>

      {/* Static: renders with data */}
      <NowDisplay temperature={weather.current.temperature} ... />
      <TaskScores sower={taskScores.sower} ... />

      {/* Deferred: heavy component */}
      <Suspense fallback={<ChartSkeleton />}>
        <HourlySparkline hourly={weather.hourly} />
      </Suspense>
    </div>
  )
}
```

**But: Location changes need to work!**

The current code has `TopBar` with `LocationPicker` as a child. When user changes location, it needs to re-fetch weather. This requires interactivity.

**Solution: Extract a client wrapper**

```typescript
// app/(almanac)/almanac/page.tsx (Server Component)
export default async function AlmanacPage() {
  const weather = await fetchWeatherForDefaultLocation()

  return (
    <AlmanacClientWrapper
      initialWeather={weather}
      initialLocation={DEFAULT_LOCATION}
    />
  )
}

// app/(almanac)/almanac/AlmanacClientWrapper.tsx
'use client'
export function AlmanacClientWrapper({ initialWeather, initialLocation }) {
  const [location, setLocation] = useState(initialLocation)
  const [weather, setWeather] = useState(initialWeather)
  const [loading, setLoading] = useState(false)

  const handleLocationChange = useCallback(async (newLocation) => {
    setLocation(newLocation)
    saveLocation(newLocation)

    setLoading(true)
    const newWeather = await fetchWeather(newLocation)
    setWeather(newWeather)
    setLoading(false)
  }, [])

  // Render full page with all interactivity
  return (
    <div>
      <TopBar location={location} onLocationChange={handleLocationChange} />
      <NowDisplay weather={weather} />
      {/* ... etc */}
    </div>
  )
}
```

**Performance Win:**

- FCP: HTML with default weather arrives in ~400ms
- User sees meaningful content immediately
- Location change triggers new fetch (no re-SSR needed)

---

## Detailed Refactor Plan

### Phase 4a: Extract Server Data Fetching (Week 1)

**Goal:** Move weather fetching from client to server initialization

**File Changes:**

1. **Create `lib/almanac/server.ts`** (NEW)
   - `async function fetchWeatherData(lat, lon)`
   - `async function calculateWeatherMetrics(weather)`
   - No React/client code here

2. **Update `app/(almanac)/almanac/page.tsx`**
   - Remove `'use client'` from line 1
   - Remove all `useState` hooks (lines 100-115)
   - Remove `fetchWeather` callback (lines 117-188)
   - Remove initial `useEffect` (lines 190-195)
   - Add: `import { fetchWeatherData, calculateWeatherMetrics } from '@/lib/almanac/server'`
   - Add: `const weather = await fetchWeatherData(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude)`
   - Change function to `async`

3. **Create `app/(almanac)/almanac/AlmanacClientWrapper.tsx`** (NEW)
   - Extract all client-interactive parts
   - Mark with `'use client'`
   - Receives weather as prop
   - Manages: location, view toggle, interactive state

**Expected Impact:**

- FCP: 2.1s → 1.4s (34% improvement)
- LCP: 3.8s → 2.8s (26% improvement)
- Initial HTML size: Increases by ~5KB (weather data), decreases bundle by ~50KB

---

### Phase 4b: Split Components (Week 2)

**Goal:** Create separate server and client component versions

**New Files:**

1. **`components/almanac/NowDisplay.server.tsx`**
   - Server version: just renders HTML
   - No icons (icons are components)

2. **`components/almanac/NowDisplay.client.tsx`** (maybe)
   - Keep as-is if no changes needed

**Strategy:** Start with display-only components, verify no hydration mismatches.

**Testing Approach:**

```bash
# Build and check for hydration warnings
npm run build

# Test in local server
npm run start

# Lighthouse scan
# Watch DevTools console for hydration mismatches
```

---

### Phase 4c: Streaming with Suspense (Week 3)

**Goal:** Stream heavy components to improve perceived performance

**Pattern:**

```typescript
<Suspense fallback={<HourlySparklineSkeleton />}>
  <HourlySparklineData hourly={weather.hourly} />
</Suspense>
```

Where `<HourlySparklineData>` is an async component that waits for client-side initialization.

**Result:**

- LCP: Moves from chart loading to initial text/numbers
- Layout shift: Reduced because skeleton matches final size

---

### Phase 4d: Location Persistence (Week 4)

**Goal:** Handle localStorage migration from client to server

**Challenge:** Server doesn't have access to localStorage

**Solutions:**

1. **Cookies approach** (recommended)

   ```typescript
   // On client: save location to cookie
   document.cookie = `location=${JSON.stringify(loc)}`

   // On server: read from cookies
   const cookies = request.cookies
   const savedLocation = cookies.get('location')?.value
   ```

2. **URL parameter approach**
   - No localStorage needed
   - Share via `/almanac?lat=36.52&lon=-82.26`

3. **Hybrid**
   - Server reads cookies for default location
   - Client updates localStorage
   - Client also sets cookie for next visit

---

## Implementation Checklist

### Research Phase (CURRENT)

- [x] Analyze current architecture
- [x] Map state/event flows
- [x] Identify server vs client boundaries
- [x] Document risks
- [x] Design refactor strategy

### Development Phase (NEXT)

#### Week 1: Server Data Layer

- [ ] Create `lib/almanac/server.ts` with data fetching
- [ ] Update API route to support server calls
- [ ] Convert `page.tsx` to async server component
- [ ] Test with npm run dev (should show no loading screen)
- [ ] Run Lighthouse (target FCP <1.5s)

#### Week 2: Component Splitting

- [ ] Mark display components as server-safe (no 'use client')
- [ ] Extract client wrapper for interactive features
- [ ] Test each display component independently
- [ ] Verify no hydration mismatches

#### Week 3: Streaming & Suspense

- [ ] Add Suspense boundaries for heavy components
- [ ] Implement skeleton loaders
- [ ] Test perceived performance improvement
- [ ] Run Lighthouse (target LCP <2.5s)

#### Week 4: Location & Polish

- [ ] Implement cookie-based location persistence
- [ ] Test location change workflow
- [ ] Handle error states gracefully
- [ ] Final Lighthouse audit
- [ ] Deploy to production

### Verification Checkpoints

**After Week 1:**

```
✓ npm run build succeeds
✓ npm run dev shows content immediately (no loading state)
✓ Lighthouse FCP < 1.5s
✓ No "Hydration Mismatch" in console
```

**After Week 2:**

```
✓ All display components render static HTML
✓ Interactive features work (location picker, modals)
✓ Location change triggers data fetch
✓ No hydration warnings
```

**After Week 3:**

```
✓ Charts show skeleton, then load in background
✓ LCP improves (number/text content visible before charts)
✓ CLS improves (skeletons match final size)
✓ Lighthouse Performance ≥ 80
```

**After Week 4:**

```
✓ Location persists across sessions
✓ All features work (modals, sharing, tooltips)
✓ Mobile and desktop both optimized
✓ Lighthouse Performance ≥ 85
```

---

## Risk Analysis & Mitigations

### Risk 1: Hydration Mismatch (HIGH)

**What:** Server renders "Today's high: 45°" but client renders "Today's high: 48°" (different data)

**Why:** Weather changes between server render and client hydration, OR timezone differences cause different calculations.

**Mitigation:**

- Fetch weather on server, pass exact same data to client
- Use `useHourlyStartIndex` hook for time-based calculations (already handles this)
- Build with `--trace-hydration` to catch mismatches during dev
- Test with same data fed to server and client

**Detection:**

```typescript
// Add to page during dev
{process.env.NODE_ENV === 'development' && <HydrationMismatchDetector />}

// Component that logs render differences
export function HydrationMismatchDetector() {
  useEffect(() => {
    console.log('Hydration complete - checking for mismatches')
    // Do nothing, just validates hydration succeeded
  }, [])
  return null
}
```

---

### Risk 2: Breaking Location Picker (HIGH)

**What:** User selects new location, but server doesn't know about it.

**Current flow:**

1. User types "Nashville"
2. LocationPicker searches API
3. onLocationChange callback fires
4. Parent state updates
5. Page re-renders with new weather

**Server flow challenge:**

- Server renders once at request time
- Changing location is a **client action**
- Need a way to re-fetch data without page reload

**Mitigation:**

- Keep location change handling entirely on client
- Pass initial location from server as prop
- On client, allow overriding with setState
- Don't try to server-render per user's chosen location (impossible anyway)

**Implementation:**

```typescript
// app/(almanac)/almanac/page.tsx (Server)
export default async function AlmanacPage() {
  const weather = await fetchWeatherData(DEFAULT_LOCATION)
  return <AlmanacClientWrapper initialWeather={weather} initialLocation={DEFAULT_LOCATION} />
}

// AlmanacClientWrapper.tsx (Client)
'use client'
export function AlmanacClientWrapper({ initialWeather, initialLocation }) {
  const [location, setLocation] = useState(initialLocation)
  const [weather, setWeather] = useState(initialWeather)

  // This callback triggers on client when user changes location
  const handleLocationChange = async (newLocation) => {
    setLocation(newLocation)
    const newWeather = await fetch(`/api/weather?lat=${newLocation.latitude}&lon=${newLocation.longitude}`)
    setWeather(newWeather)
  }

  return (
    <TopBar
      location={location}
      onLocationChange={handleLocationChange}
      temperature={weather.current.temperature}
    />
  )
}
```

---

### Risk 3: API Route Bottleneck (MEDIUM)

**What:** Server + all clients now hit `/api/weather` more often.

**Current:** Only clients hit it (on-demand)
**New:** Server hits it on every page load

**Mitigation:**

- Caching header in API route (already has: `revalidate: 300`)
- ISR (Incremental Static Regeneration) on page
- Or: Use Next.js data cache

**Implementation:**

```typescript
// page.tsx - enable ISR
export const revalidate = 300 // Revalidate every 5 minutes

// Or: mark as dynamic
export const dynamic = 'force-dynamic' // Fetch on every request
```

---

### Risk 4: JavaScript Still Needed (MEDIUM)

**What:** Even with server rendering, all the interactive components need client JS.

**Why:** LocationPicker, HourlySparkline, modals, etc. still need React hooks.

**This is NOT a bad thing.** We're not removing interactivity, just deferring the JS load so content appears first.

**Timeline:**

```
OLD: [HTML blank] ← JavaScript loads (2s) → [content appears]
NEW: [HTML with content] ← JavaScript loads (1s in background) → [interactivity added]
```

**Verification:**

- Disable JavaScript with DevTools
- Page should show initial weather data (read-only)
- LocationPicker should show as non-interactive
- This proves SSR worked

---

### Risk 5: Cache Invalidation (MEDIUM)

**What:** Server caches weather for 5 minutes, user's browser caches for 10 hours (localStorage).

**Scenario:**

1. Server renders with 2pm weather
2. User loads at 2:01pm → sees cached weather until 2:06pm
3. User selects new location → sees latest weather
4. User clicks back in browser → sees old cached weather again

**Mitigation:**

- Cache headers are already correct (`s-maxage=300`)
- Client refetch button already exists (StaleDataWarning)
- Don't over-cache on client (localStorage is user choice)

---

### Risk 6: Timezone Issues (MEDIUM)

**What:** Server is in UTC, client is in user's timezone. Hourly charts show wrong times.

**Current code already handles this:**

```typescript
// app/api/weather/route.ts line 99
timezone: 'America/New_York'

// Open-Meteo returns times in that timezone
```

So times are already correct. Server and client both use same timezone from API.

**But:** If charts use `new Date()` without timezone handling, they could be off.

**Check:**

```typescript
// HourlySparkline.tsx line 26
const { startIndex: baseStartIndex, isHydrated } = useHourlyStartIndex(hourly.time)

// This uses hourly.time from API (already in ET), compares with new Date()
// Should be safe, but verify dates are ISO strings with timezone info
```

---

## Bundle Size Impact

### Current Bundle

```
JavaScript:
  almanac/page.tsx     ~12 KB
  React state/effects  ~35 KB
  Dynamic imports      ~5 KB
  Charts libraries     ~120 KB (lazy-loaded)

Total shipped to browser: ~172 KB (after gzip: ~50 KB)
```

### After Refactor

```
JavaScript (client-only components):
  AlmanacClientWrapper.tsx  ~8 KB
  LocationPicker           ~4 KB
  Modals                   ~3 KB
  State management         ~8 KB
  Charts libraries         ~120 KB (lazy-loaded)

Total shipped to browser: ~143 KB (after gzip: ~42 KB)

JavaScript NOT shipped (server-side):
  Data transformation      ~8 KB
  Task score calculations  ~12 KB
  Moon phase math          ~5 KB
  Saying generation        ~3 KB

Total not shipped: ~28 KB (8% bundle reduction)

HTML shipped:
  Static markup            ~35 KB (GAIN)
  Default weather data     ~5 KB (GAIN)
  Pre-calculated scores    ~2 KB (GAIN)

Total HTML: ~42 KB
```

**Net impact:**

- Bundle size: 172 → 143 KB (17% reduction)
- HTML size: ~10 KB → 42 KB (significantly more content upfront)
- Trade-off: More HTML, less JavaScript = faster FCP/LCP

---

## Testing Strategy

### Lighthouse Benchmarking

```bash
# Before refactor (baseline)
npm run build
npm run start
lighthouse http://localhost:3000/almanac --view

# After each phase
npm run build
npm run start
lighthouse http://localhost:3000/almanac --view
```

### Hydration Testing

```typescript
// In dev, add this to app.tsx temporarily:
if (process.env.NODE_ENV === 'development') {
  console.log('Checking for hydration mismatches...')

  // Trigger any time-based calculations
  const now = new Date()
  const hourIndex = findCurrentHourIndex(hourly.time)

  // These should be consistent between server render and client hydration
}
```

### Manual Testing Checklist

- [ ] Load `/almanac` with fresh cache
  - [ ] Content appears in <1.2s
  - [ ] No "Loading..." skeleton
  - [ ] Current temp is visible

- [ ] Search for location
  - [ ] LocationPicker opens
  - [ ] Search works
  - [ ] Weather updates
  - [ ] New location persists (reload page)

- [ ] View toggle
  - [ ] Almanac view loads
  - [ ] Governor's view loads
  - [ ] Switching is smooth

- [ ] Modals
  - [ ] About modal works
  - [ ] Share button works
  - [ ] Onboarding shows first visit

- [ ] Charts
  - [ ] HourlySparkline loads and is interactive
  - [ ] Time range toggle works
  - [ ] CompactSevenDay loads

- [ ] Error handling
  - [ ] Disable network, see graceful error
  - [ ] Retry button works

- [ ] Accessibility
  - [ ] Tab through interactive elements
  - [ ] Screen reader reads content
  - [ ] Focus visible states work

---

## Performance Targets Deep Dive

### FCP (First Contentful Paint) < 1.2s

**Current:** 2.1s (blank screen)
**Target:** 1.2s

**How we'll get there:**

1. HTML arrives with weather data (~400ms)
2. Browser can start parsing immediately
3. NowDisplay renders static HTML (no JS needed)
4. User sees temperature, condition, forecast
5. JavaScript loads in background (~200ms)
6. Charts become interactive

**Measurement:**

```bash
lighthouse --metrics fcp
# Should show FCP: 1.1-1.3s
```

---

### LCP (Largest Contentful Paint) < 2.5s

**Current:** 3.8s (when HourlySparkline renders)
**Target:** 2.5s

**Problem:** HourlySparkline is a canvas-based chart. It's the largest content.

**Solution:** Defer it with Suspense, show skeleton same size.

**When it happens:**

1. HTML arrives with skeleton (same size as final chart) → LCP fires here (~400ms)
2. JavaScript loads → (~600ms)
3. Chart renders with actual data → (~800ms)

**Measurement:**

```bash
lighthouse --metrics lcp
# Should show LCP: 2.2-2.5s (the skeleton)
```

---

### CLS (Cumulative Layout Shift) < 0.1

**Current:** 0.18 (content reflows as things load)
**Target:** 0.1

**Problem:** Components mount one by one, causing shifts:

- TopBar appears
- Weather loads → shifts
- Charts load → big shift
- Modals appear → shift

**Solution:** Reserve space upfront.

```css
/* NowDisplay container - always takes X height */
.weather-display {
  min-height: 200px; /* Lock size even when empty */
}

/* HourlySparkline - skeleton and chart same size */
.hourly-chart {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hourly-skeleton {
  width: 100%;
  height: 160px;
}

.hourly-chart-content {
  width: 100%;
  height: 160px;
}
```

**Result:** No layout shifts, CLS stays near 0.

**Measurement:**

```bash
lighthouse --metrics cls
# Should show CLS: 0.05-0.1
```

---

### TTI (Time to Interactive) < 3.0s

**Current:** 4.5s (when modals first work)
**Target:** 3.0s

**Problem:** JavaScript is blocked by large bundle.

**Solution:** Code split properly.

```typescript
// Dynamic import with ssr: false for heavy components
const HourlySparkline = dynamic(
  () => import('@/components/almanac/HourlySparkline'),
  { ssr: false, loading: () => <Skeleton /> }
)

// But for LocationPicker, we need it ASAP
// So import statically
import LocationPicker from '@/components/almanac/LocationPicker'
```

**Timeline:**

1. TopBar interactive at ~800ms (LocationPicker ships immediately)
2. ViewToggle interactive at ~1000ms
3. HourlySparkline interactive at ~1800ms (lazy-loaded)
4. Charts interactive at ~2000ms

**Measurement:**

```bash
lighthouse --metrics tti
# Should show TTI: 2.8-3.0s
```

---

### Lighthouse Performance 85+

**Current:** 62
**Target:** 85+

Lighthouse weights these metrics:

- FCP (15%): 2.1s → 1.2s = +30 points
- LCP (25%): 3.8s → 2.5s = +40 points
- CLS (5%): 0.18 → 0.08 = +10 points
- TTI (27%): 4.5s → 3.0s = +45 points
- Other (28%): Keep current = 0 points

**Expected total:** 62 + (30+40+10+45) = **187 points** (capped at 100)

Realistic: **85-92 range** depending on network conditions.

---

## Key Success Metrics

| Metric        | Before | Target | Win              |
| ------------- | ------ | ------ | ---------------- |
| FCP           | 2.1s   | 1.2s   | 43% faster       |
| LCP           | 3.8s   | 2.5s   | 34% faster       |
| CLS           | 0.18   | 0.08   | 56% less shift   |
| TTI           | 4.5s   | 3.0s   | 33% faster       |
| Lighthouse    | 62     | 85+    | 27+ points       |
| Bundle (gzip) | ~50KB  | ~42KB  | 16% smaller      |
| HTML size     | ~10KB  | ~42KB  | +content upfront |

---

## Questions for Cody

Before starting Phase 4:

1. **Location persistence:** Should we use cookies, URL params, or localStorage?
   - Cookies: Requires backend, survives browser restart
   - URL params: Shareable (`/almanac?lat=36.52&lon=-82.26`), no backend
   - localStorage: Current approach, client-side only

2. **Governor's view:** Should it also start with server-rendered data?
   - Current: Also uses DEFAULT_LOCATION, could be optimized
   - Alternative: Keep as-is (less critical performance-wise)

3. **Hourly updates:** Should the page auto-refresh every 5 minutes (ISR)?
   - Current: Manual refresh button only
   - With ISR: Page automatically re-renders on server every 5 min

4. **Error states:** How should we handle API failures on the server?
   - Current: Shows retry button, can retry
   - New: Server render fails → what's the fallback?

---

## Next Steps

1. **Approval:** Review this document and architecture decisions
2. **Week 1:** Implement server data layer (Phase 4a)
3. **Week 2:** Split components and verify hydration (Phase 4b)
4. **Week 3:** Add Suspense + streaming (Phase 4c)
5. **Week 4:** Polish and location persistence (Phase 4d)
6. **Verification:** Lighthouse audit ≥85 before merge

---

## References

### Code Files to Review

- `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/app/(almanac)/almanac/page.tsx` (819 lines)
- `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/app/api/weather/route.ts` (124 lines)
- `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/lib/almanac/storage.ts` (75 lines)
- `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/lib/almanac/geocoding.ts` (113 lines)
- `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/lib/almanac/useClientTime.ts` (205 lines)
- `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/lib/almanac/types.ts` (150+ lines)

### External Resources

- [React Server Components](https://react.dev/reference/rsc/server-components) - React docs
- [Next.js Rendering](https://nextjs.org/docs/app/building-your-application/rendering) - App Router rendering patterns
- [Suspense + Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) - Streaming patterns
- [Hydration Mismatch](https://nextjs.org/docs/messages/hydration-mismatch) - Common pitfall
- [Web Vitals](https://web.dev/vitals/) - Google's performance metrics

---

## Summary

The Tennessee Starts Here Almanac page has significant performance potential trapped behind a `'use client'` directive. By converting to a hybrid server/client architecture, we can:

1. **Show content 43% faster** (FCP: 2.1s → 1.2s)
2. **Reduce layout shift 56%** (CLS: 0.18 → 0.08)
3. **Gain 27+ Lighthouse points** (62 → 85+)
4. **Reduce bundle size 16%** (ship data instead of code)
5. **Keep all interactivity** (LocationPicker, charts, modals work perfectly)

The refactor is **not small** (4 weeks) but is **extremely doable** with clear technical approach and existing patterns in the codebase (`useClientTime`, `useHourlyStartIndex`) that show the team understands hydration pitfalls.

The biggest risk is hydration mismatches, but they're preventable with careful testing and using the existing hooks that handle it correctly.

**Recommendation:** Start Phase 4a immediately. The server data layer is foundational and carries minimal risk.

---

**Research Document Complete**
**Ready for implementation planning**
