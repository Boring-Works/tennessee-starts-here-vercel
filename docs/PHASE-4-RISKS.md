# Phase 4: Risk Assessment & Mitigation

**Summary:** Hydration mismatches and state management are the primary risks. All are preventable with proper testing.

---

## Risk Register

### 🔴 HIGH RISK

#### 1. Hydration Mismatch on Time-Based Values

**Problem:** Server renders one value, client renders different value → UI jumps or looks broken

**Example:**

```typescript
// ❌ BAD: Different on server vs client
function HourlyChart() {
  const now = new Date() // Different on server vs client!
  const hourIndex = findCurrentHour(now)
  return <Chart startIndex={hourIndex} />
}
```

**Consequences:**

- UI elements flicker
- Unexpected content shifts
- Console error: "Hydration failed"
- Page becomes non-interactive

**Likelihood:** MEDIUM (we control the code)
**Impact:** CRITICAL (breaks entire page)

**Mitigation:**

1. **Use existing `useHourlyStartIndex` hook** (already in codebase)
   - Returns `startIndex: 0` on server
   - Updates to real value after hydration
   - No mismatch possible

2. **Audit time-based calculations:**

   ```typescript
   // SAFE: Server-only calculation
   const todayIndex = findTodayDailyIndex(weather.daily.time)
   // Passes as prop, no client-side time calc needed

   // SAFE: Hook handles hydration
   const { startIndex, isHydrated } = useHourlyStartIndex(hourly.time)
   ```

3. **Test with `--trace-hydration`:**

   ```bash
   npm run build -- --trace-hydration
   # Shows exact element that mismatches
   ```

4. **Manual testing checklist:**
   - [ ] Disable JavaScript
   - [ ] Page should show readable content (weather, numbers)
   - [ ] Enable JavaScript
   - [ ] Page should add interactivity without layout shift
   - [ ] DevTools > Console should have NO hydration warnings

**Testing:**

```typescript
// In dev, add temporary logging
if (process.env.NODE_ENV === 'development') {
  useEffect(() => {
    // After hydration, verify calculations match server render
    console.log('Verifying hydration integrity...')

    // These should all be consistent
    const todayIndex = findTodayDailyIndex(weather.daily.time)
    const currentHour = new Date().getHours()

    console.log('✓ Hydration check passed', { todayIndex, currentHour })
  }, [])
}
```

---

#### 2. Location Picker Stops Working

**Problem:** Component tries to save/load location, but data structures don't match

**Example:**

```typescript
// Server sends initialLocation as prop
<AlmanacClientWrapper initialLocation={{ name: 'Rocky Mount', latitude: 36.52, ... }} />

// Client tries to save it
saveLocation(newLocation) // Saves to localStorage

// User reloads, client loads it
const saved = loadLocation() // ✓ Should work, same structure
```

**Consequences:**

- Location doesn't persist across page reloads
- LocationPicker doesn't save user's choice
- Every visit starts at DEFAULT_LOCATION

**Likelihood:** LOW (straightforward code)
**Impact:** MEDIUM (feature stops working)

**Mitigation:**

1. **Keep exact same GeoLocation interface:**

   ```typescript
   interface GeoLocation {
     name: string
     latitude: number
     longitude: number
     admin1?: string
     country?: string
     timezone?: string
   }

   // Server sends same structure
   // Client saves/loads same structure
   // No mismatch possible
   ```

2. **Test location persistence:**

   ```bash
   # 1. Visit /almanac
   # 2. Search for "Nashville"
   # 3. Weather updates ✓
   # 4. Reload page (Cmd+R)
   # 5. Should still show Nashville ✓
   # 6. localStorage should have the location
   const location = JSON.parse(localStorage.getItem('almanac-location'))
   console.log(location) // Should show Nashville
   ```

3. **Verify localStorage structure:**
   ```typescript
   // After location change
   const saved = localStorage.getItem('almanac-location')
   console.log(saved)
   // Should be valid JSON:
   // {"name":"Nashville","latitude":36.16...,"longitude":-86.78...}
   ```

**Prevention:**

- Don't change GeoLocation interface
- Don't change STORAGE_KEY constant
- Keep saveLocation/loadLocation functions identical
- Test reload after location change

---

#### 3. Weather Data Fetch Fails on Server

**Problem:** Server tries to fetch weather, API is down/slow, page render hangs or fails

**Timeline:**

```
1. User requests /almanac
2. Server calls fetchAlmanacData()
3. Makes request to /api/weather
4. API is down, request hangs for 30s
5. Page render times out
6. User sees error page
```

**Consequences:**

- Entire page fails to render
- 500 error instead of showing cached data
- No graceful fallback
- User experience broken

**Likelihood:** LOW (API rarely down)
**Impact:** MEDIUM (page shows error)

**Mitigation:**

1. **Add timeout to fetch:**

   ```typescript
   // lib/almanac/server.ts
   export async function fetchAlmanacData(lat, lon) {
     const controller = new AbortController()
     const timeout = setTimeout(() => controller.abort(), 5000) // 5 second timeout

     try {
       const response = await fetch(url, {
         signal: controller.signal,
         next: { revalidate: 300 },
       })
       // ...
     } catch (error) {
       if (error.name === 'AbortError') {
         throw new Error('Weather service timeout')
       }
       // handle other errors
     } finally {
       clearTimeout(timeout)
     }
   }
   ```

2. **Handle errors gracefully:**

   ```typescript
   // page.tsx
   export default async function AlmanacPage() {
     try {
       const data = await fetchAlmanacData()
       return <AlmanacClientWrapper {...data} />
     } catch (error) {
       // Show error state with retry link
       return (
         <main className="min-h-screen bg-midnight text-white">
           <div className="flex items-center justify-center h-screen">
             <div className="text-center">
               <h1>Unable to load weather data</h1>
               <p>{error.message}</p>
               <a href="/almanac" className="mt-4 px-4 py-2 bg-blue-500 rounded">
                 Try again
               </a>
             </div>
           </div>
         </main>
       )
     }
   }
   ```

3. **Monitor API health:**
   - Check Vercel dashboard for API errors
   - Set up alerts for high error rates
   - Monitor API response times

4. **Test failure scenarios:**
   ```bash
   # Temporarily disable API
   # Try to load /almanac
   # Should show graceful error message
   ```

---

### 🟡 MEDIUM RISK

#### 4. Timezone Mismatch in Charts

**Problem:** Server calculates times in UTC, client calculates in user's timezone → chart shows wrong times

**Example:**

```typescript
// Server at 5pm UTC
const now = new Date() // 5pm UTC
const hourIndex = 17

// Client at 5pm Eastern (1am UTC)
const now = new Date() // 1am UTC, but displayed as 5pm ET
const hourIndex = 1 // Wrong!
```

**Consequences:**

- HourlySparkline shows wrong hour
- "Current hour" pointer off by several hours
- Forecast timing confusing

**Likelihood:** LOW (API returns correct timezone)
**Impact:** LOW (user can still see data, just offset)

**Mitigation:**

1. **API already handles timezone:**

   ```typescript
   // app/api/weather/route.ts line 99
   timezone: 'America/New_York'
   // Open-Meteo returns times in that timezone
   ```

2. **All time calculations use API times:**

   ```typescript
   // hourly.time is from API, already in correct timezone
   const hourlyTimes: string[] = weather.hourly.time

   // useHourlyStartIndex compares new Date() with API times
   // Both should be in same timezone
   ```

3. **Test with timezone changes:**
   - Open DevTools > Settings > Overrides > User Agent
   - Change timezone (requires DevTools extension or system change)
   - Verify chart times match local time

**Prevention:**

- Don't modify timezone strings from API
- Don't manually convert times
- Let Open-Meteo handle timezone conversion
- Test on machines with different system timezones

---

#### 5. Bundle Size Doesn't Improve

**Problem:** Refactoring to SSR but JavaScript bundle doesn't shrink

**Why it might happen:**

- Code splitting not configured properly
- Components still import unused modules
- Tree-shaking not working

**Consequences:**

- Performance improvements smaller than expected
- Slower hydration
- Slower chart interactivity

**Likelihood:** MEDIUM
**Impact:** MEDIUM (still get FCP improvement, but less LCP improvement)

**Mitigation:**

1. **Check bundle analysis:**

   ```bash
   # Install webpack bundle analyzer
   npm install --save-dev @next/bundle-analyzer

   # Add to next.config.js
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   })
   export default withBundleAnalyzer({})

   # Run analysis
   ANALYZE=true npm run build
   ```

2. **Verify dynamic imports:**

   ```typescript
   // Should use dynamic import
   const HourlySparkline = dynamic(() => import('...'), { ssr: false })

   // Not:
   import HourlySparkline from '...' // Ships all code upfront
   ```

3. **Check for unused imports:**
   ```bash
   # ESLint should catch some, but manual review helps
   # Look for imports that are only used in removed code
   ```

---

#### 6. ISR Revalidation Not Working

**Problem:** Set `revalidate: 300` but page cache doesn't update

**Why it might happen:**

- Vercel cache not clearing
- Fetch has wrong headers
- Pages with params don't use ISR properly

**Consequences:**

- Old weather data shown for >5 minutes
- User sees stale information
- Real-time feel lost

**Likelihood:** LOW (basic ISR)
**Impact:** LOW-MEDIUM (user can refresh manually)

**Mitigation:**

1. **Verify revalidation is set:**

   ```typescript
   // page.tsx
   export const revalidate = 300 // Must be at top level

   // NOT inside function
   export default async function Page() {
     // This won't work:
     // export const revalidate = 300 // Can't export inside function
   }
   ```

2. **Check API cache headers:**

   ```typescript
   // app/api/weather/route.ts
   return NextResponse.json(data, {
     headers: {
       'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
     },
   })
   ```

3. **Monitor cache behavior:**
   - Visit /almanac
   - Check response headers: `Cache-Control`
   - Should show `public, s-maxage=300`
   - Wait 5+ minutes
   - Refresh page
   - Should show new data

4. **Test with manual revalidation:**
   ```bash
   # Vercel CLI
   vercel env pull
   vercel revalidate /almanac
   ```

---

### 🟢 LOW RISK

#### 7. Performance Not Meeting Targets

**Problem:** After refactoring, metrics don't hit targets (FCP 1.2s, LCP 2.5s, etc.)

**Why it might happen:**

- Network conditions vary
- Browser caching differs
- Other background processes

**Consequences:**

- Phase 4 considered incomplete
- May need additional optimization

**Likelihood:** MEDIUM (real-world performance varies)
**Impact:** LOW (still significant improvement from baseline)

**Mitigation:**

1. **Measure correctly:**

   ```bash
   # Use Lighthouse CLI with consistent settings
   lighthouse http://localhost:3000/almanac \
     --view \
     --preset=mobile \
     --throttling.mobileCpuSlowdownMultiplier=4
   ```

2. **Average multiple runs:**
   - Run Lighthouse 5 times
   - Take average (accounts for variance)
   - Network conditions can add 0.5-1s variance

3. **Baseline comparison:**
   - Measure before ANY changes
   - Measure after server refactor (Week 1)
   - Measure after Suspense/skeletons (Week 3)
   - Each phase should show improvement

4. **Real user monitoring:**
   - Add Vercel Speed Insights
   - Track actual user FCP/LCP
   - May differ from synthetic measurements

---

## Testing Strategy by Risk

### High Risk: Hydration Mismatch

**Test matrix:**

| Scenario         | Expected             | Test Method                       |
| ---------------- | -------------------- | --------------------------------- |
| Page loads       | No errors in console | Run Lighthouse, check console     |
| JS disabled      | Content visible      | DevTools: Disable JavaScript      |
| Location changes | No layout shift      | Record video, check for jumps     |
| Time updates     | Smooth               | Watch HourlySparkline, no flicker |
| Reload page      | State persists       | Change location, reload           |

**Automated test:**

```typescript
// __tests__/almanac-hydration.test.tsx
import { render } from '@testing-library/react'
import { AlmanacClientWrapper } from '@/app/(almanac)/almanac/AlmanacClientWrapper'
import { mockWeatherData } from '@/__tests__/fixtures'

describe('Hydration Safety', () => {
  it('should not cause hydration mismatch with time-based values', () => {
    // Render with same data
    const { container } = render(
      <AlmanacClientWrapper
        initialWeather={mockWeatherData}
        // ... other props
      />
    )

    // Check for hydration errors
    expect(console.error).not.toHaveBeenCalledWith(
      expect.stringContaining('Hydration')
    )
  })

  it('should match server and client hourly indices', () => {
    // Use useHourlyStartIndex hook
    const { result } = renderHook(() =>
      useHourlyStartIndex(mockWeatherData.hourly.time)
    )

    // On server, should start at 0
    // On client, should update to current hour
    expect(result.current.isHydrated).toBe(true)
    expect(result.current.startIndex).toBeGreaterThanOrEqual(0)
  })
})
```

### Medium Risk: Location Picker

**Manual test cases:**

1. [ ] Search for location
2. [ ] Change location
3. [ ] Weather updates
4. [ ] Reload page
5. [ ] Location persists
6. [ ] Reset to default
7. [ ] Invalid location shows error

### Low Risk: Performance

**Lighthouse targets:**

- FCP: < 1.2s ← Focus here for week 1
- LCP: < 2.5s ← Improves with skeletons (week 3)
- CLS: < 0.1 ← Improves with proper sizing
- TTI: < 3.0s ← Code splitting helps

---

## Rollback Plan

If Phase 4 causes critical issues:

### Immediate Rollback (< 5 minutes)

```bash
# Revert to pre-refactor state
git revert <commit-hash>
npm run build
vercel deploy

# Or: manually revert files
git checkout HEAD~1 -- app/(almanac)/almanac/
git checkout HEAD~1 -- lib/almanac/server.ts
npm run build
vercel deploy
```

### Partial Rollback (< 15 minutes)

If only certain features broken:

```bash
# Keep server refactor, revert client wrapper
git checkout HEAD~2 -- app/(almanac)/almanac/AlmanacClientWrapper.tsx

# Keep original page.tsx behavior (might lose some optimization)
git checkout HEAD~3 -- app/(almanac)/almanac/page.tsx

npm run build
```

### If Hydration Broken

```bash
# Check for hydration-specific errors
npm run build -- --trace-hydration

# Likely culprit: time-based calculations
# Fix: replace with useHourlyStartIndex hook
# Or: remove time-dependent server rendering
```

---

## Monitoring During Rollout

### Real User Monitoring

Add to verify improvements:

```typescript
// Vercel Speed Insights
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  )
}
```

### Log Key Metrics

```typescript
// Temporary logging for phase 4
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    // Log when content becomes interactive
    const handleInteractive = () => {
      console.log('🟢 Page interactive at', new Date().toISOString())
    }

    // Log hydration completion
    document.addEventListener('load', handleInteractive)

    return () => document.removeEventListener('load', handleInteractive)
  }
}, [])
```

### Check Logs

```bash
# Vercel Functions logs
vercel logs /almanac

# Look for errors in API calls
# Monitor API response times
# Watch for timeouts
```

---

## Success Criteria by Week

### Week 1: Server Refactor

- ✅ FCP improves to ~1.0-1.4s (from 2.1s)
- ✅ No hydration errors in console
- ✅ Location picker works
- ✅ Content visible immediately

### Week 2: Component Split

- ✅ All display components render as server HTML
- ✅ No increased bundle size
- ✅ No new hydration mismatches
- ✅ All interactive features work

### Week 3: Suspense + Streaming

- ✅ LCP improves to <2.5s
- ✅ CLS improves to <0.1
- ✅ Charts show skeleton first
- ✅ Lighthouse ≥80

### Week 4: Polish

- ✅ Location persistence works
- ✅ ISR caching works
- ✅ Error handling graceful
- ✅ Lighthouse ≥85

---

## Questions to Ask Before Starting

1. **If API is slow:** Should we timeout at 5s, 10s, or longer?
2. **If location changes:** Should we show loading skeleton or update in place?
3. **If user has JavaScript disabled:** Should the page still be readable? (Yes, but limited)
4. **If cache expires:** Should we show old data while fetching new? (Yes, with stale indicator)

---

## Post-Launch Monitoring

After deploying to production:

1. **Week 1:** Watch error rate (should be 0)
2. **Week 2:** Monitor FCP/LCP from Vercel Analytics
3. **Week 3:** Check if users are still clicking "Try Again"
4. **Week 4:** Gather user feedback (faster loads?)

**Success:** Error rate stays <0.1%, user complaints drop, pageviews increase (faster = more usage)

---

**Risk assessment complete. Ready to proceed with Week 1.**
