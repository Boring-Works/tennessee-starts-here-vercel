# GOVERNOR'S GLASS — LEAN IMPLEMENTATION PLAN
**Shipping Governor's Glass in 4 weeks, not 36**

Created: January 29, 2026
For: Cody Boring, Rocky Mount State Historic Site
Philosophy: **Do the most with the least. Ship > Perfect.**

---

## EXECUTIVE SUMMARY

Governor's Glass is a **period-immersive weather app** that makes the 1790s almanac experience feel real and functional in 2026.

**What Ships:**
- Phase 1 (Week 1-2): Clone almanac MVP, remove old nav
- Phase 2 (Week 2-3): Build 3 brass instruments (barometer, thermometer, weathervane)
- Phase 3 (Week 3): Add Governor's Briefing (AI-generated prose)
- Phase 4 (Week 4): Polish, test, ship

**What Gets CUT from original 36-week plan:**
- Multi-county support (Sullivan County only for V1)
- Pantry integration (distracts from core experience)
- Stream/soil temperature (not essential to the glass concept)
- Cherokee perspective inserts (nice-to-have, not MVP)
- Archive primary source links (added later as Phase 5)
- Educator mode / Challenge Mode (post-launch initiative)
- America 250 countdown (separate project)

**Why this works:**
- Reuses 95% of Phase 1 almanac code (weather, API, structure)
- Brass instruments = visual layer over same data
- No new API dependencies or content creation burden
- Ship fully-working product in 4 weeks vs. incomplete feature in 12 weeks
- Builds momentum for Phase 5 (archive integration) and Phase 6 (education revenue)

---

## FEATURE PRIORITIZATION MATRIX

| Feature | MVP | Why | When |
|---------|-----|-----|------|
| **Current conditions (temp, wind, humidity)** | ✅ KEEP | Core almanac data, already built | Week 1 reuse |
| **7-day forecast** | ✅ KEEP | Users need this | Week 1 reuse |
| **Moon phase** | ✅ KEEP | Period-accurate, essential | Week 1 reuse |
| **Daily proverb** | ✅ KEEP | Flavor + utility | Week 1 reuse |
| **Barometer (brass dial)** | ✅ KEEP | Visual centerpiece | Week 2-3 build |
| **Thermometer (mercury tube)** | ✅ KEEP | Iconic instrument | Week 2-3 build |
| **Weathervane (compass)** | ✅ KEEP | Wind direction visualization | Week 2-3 build |
| **Governor's Briefing** | ✅ KEEP | AI prose, period-appropriate | Week 3 build |
| **Toggle: Almanac ↔ Governor's View** | ✅ KEEP | Clean mode-switch | Week 2 build |
| **Sunrise/sunset** | ⚠️ DEFER | Nice detail, not critical | Phase 5 |
| **Multi-county selector** | ❌ CUT | Adds 2 weeks, not needed for V1 | Phase 4 after launch |
| **Pantry integration** | ❌ CUT | Marketing distraction for this product | Separate initiative |
| **Stream levels** | ❌ CUT | Hyper-local, low engagement | Phase 5+ |
| **Soil temperature** | ❌ CUT | Complex API, niche audience | Phase 5+ |
| **Archive links** | ❌ CUT | Requires content work | Phase 5 |
| **Cherokee inserts** | ❌ CUT | Requires content, timing sensitivity | Phase 5 |
| **Educator mode** | ❌ CUT | Separate product line | Phase 6 |
| **Challenge Mode** | ❌ CUT | Requires 20 scenarios + QA | Phase 6 |

---

## 4-WEEK SPRINT PLAN

### WEEK 1: FOUNDATION + REMOVE OLD NAV
**Goal:** Clone almanac MVP, delete old navigation structure

#### Day 1-2: Copy Phase 1 Architecture
- Copy `/app/almanac/` folder structure from main site
- Verify Open-Meteo API calls work (or use NWS if preferred)
- Verify moon/sun calculations work
- Copy proverbs.json with 30-50 proverbs
- Test on mobile Safari/Chrome

**Deliverables:**
- ✅ Weather component renders
- ✅ Moon phase displays
- ✅ Daily proverb rotates
- ✅ Mobile responsive

#### Day 3-4: Remove Governor's Glass from Old Nav
- Delete old "Governor's Glass" navigation link (if present)
- Ensure no dead links to Governor's Glass (old mockups, etc.)
- Verify site navigation is clean
- Test all remaining nav links

**Deliverables:**
- ✅ Old navigation cleaned
- ✅ No broken links
- ✅ Site stable

#### Day 5: Deploy + Verify
- Deploy to staging
- Load test on mobile
- Get staff feedback (first 5 people use it)

**Deliverables:**
- ✅ Staging URL active
- ✅ Zero console errors
- ✅ Staff feedback collected

**Success Criteria:**
- Page loads < 2 seconds on 4G
- No crashes on iOS Safari
- Staff says "I'd use this"

---

### WEEK 2: BUILD 3 BRASS INSTRUMENTS + TOGGLE

**Goal:** Create visual brass layer over same data. Build toggle to switch views.

#### Instrument 1: Barometer (Days 1-3)
**Component:** `/components/Governor/Barometer.tsx`

```tsx
// Data flow:
// Weather API → atmospheric pressure (hPa)
// Convert to inHg (inches of mercury, 1790s standard)
// Display on brass dial

// Visual specs:
// - Circular dial, 300px diameter
// - SVG dial face with scale: "Stormy" (28") → "Fair" (30.5") → "Very Dry" (31.5")
// - Red indicator needle
// - Brass border/frame styling (CSS: gold gradient, shadow)
// - Tap → show pressure trend (last 24h line graph)

interface BarometerProps {
  pressureHpa: number;
  trend?: 'rising' | 'steady' | 'falling';
}

export default function Barometer({ pressureHpa, trend }: BarometerProps) {
  const pressureInHg = (pressureHpa / 33.8639).toFixed(2);
  const angle = calculateNeedleAngle(parseFloat(pressureInHg));

  return (
    <div className="barometer">
      <svg viewBox="0 0 300 300">
        {/* Dial background, scale, needle */}
      </svg>
      <div className="label">{pressureInHg} in Hg</div>
      <div className="status">{getStatus(pressureInHg)}</div>
    </div>
  );
}
```

**Deliverables:**
- ✅ Barometer component renders
- ✅ Needle animates smoothly on pressure change
- ✅ Scale labels correct
- ✅ Tap shows trend modal

#### Instrument 2: Thermometer (Days 3-4)
**Component:** `/components/Governor/Thermometer.tsx`

```tsx
// Visual specs:
// - Vertical tube (SVG or CSS) with mercury column
// - Scale: -20°F to 110°F (typical TN range)
// - Mercury level updates from temp data
// - Wood frame + brass fittings CSS styling
// - Animate mercury rise/fall on temp change

interface ThermometerProps {
  tempF: number;
}

export default function Thermometer({ tempF }: ThermometerProps) {
  const fillPercentage = ((tempF + 20) / 130) * 100; // -20 to 110 range

  return (
    <div className="thermometer">
      <div className="tube">
        <div
          className="mercury"
          style={{ height: `${fillPercentage}%` }}
        />
      </div>
      <div className="scale">
        {/* Scale markers */}
      </div>
      <div className="label">{tempF}°F</div>
    </div>
  );
}
```

**Deliverables:**
- ✅ Thermometer renders
- ✅ Mercury column animates
- ✅ Scale readable
- ✅ Brass styling applied

#### Instrument 3: Weathervane (Days 4-5)
**Component:** `/components/Governor/Weathervane.tsx`

```tsx
// Visual specs:
// - Rotating compass rose (SVG)
// - Arrow points to wind direction (from weather API: 0-360 degrees)
// - Compass labels: N, NE, E, SE, S, SW, W, NW
// - Tap → show wind speed in knots (nautical term for 1790s flavor)

interface WeathervaneProps {
  windDegrees: number;  // 0-360
  windSpeedKmh: number;
}

export default function Weathervane({ windDegrees, windSpeedKmh }: WeathervaneProps) {
  const windSpeedKnots = (windSpeedKmh * 0.539957).toFixed(1);

  return (
    <div className="weathervane">
      <svg viewBox="0 0 200 200">
        {/* Compass rose */}
        <g style={{ transform: `rotate(${windDegrees}deg)` }}>
          {/* Arrow pointing up */}
        </g>
      </svg>
      <div className="label">{windSpeedKnots} knots</div>
    </div>
  );
}
```

**Deliverables:**
- ✅ Weathervane rotates smoothly
- ✅ Compass labels visible
- ✅ Wind speed in knots
- ✅ Tap shows detailed wind data

#### Toggle Component (Day 5)
**Component:** `/components/Governor/ViewToggle.tsx`

```tsx
export function ViewToggle({ view, setView }: {
  view: 'almanac' | 'governor',
  setView: (v: 'almanac' | 'governor') => void
}) {
  return (
    <div className="view-toggle">
      <button
        onClick={() => setView('almanac')}
        className={view === 'almanac' ? 'active' : ''}
      >
        Almanac View
      </button>
      <button
        onClick={() => setView('governor')}
        className={view === 'governor' ? 'active' : ''}
      >
        Governor's View
      </button>
    </div>
  );
}
```

**Deliverables:**
- ✅ Toggle switches between views
- ✅ Preference saved to localStorage
- ✅ Both views render correctly
- ✅ Smooth transition animation

#### Week 2 Success Criteria
- All 3 instruments render correctly
- Toggle works smoothly
- No performance degradation
- Mobile view still responsive
- Data syncs between views (user sees same info, different presentation)

---

### WEEK 3: GOVERNOR'S BRIEFING + POLISH

**Goal:** Add AI-generated prose overlay. Polish interactions.

#### Governor's Briefing Component (Days 1-3)
**Component:** `/components/Governor/GovernorsBriefing.tsx`

```tsx
// Data source: Claude API (or OpenAI)
// Prompt template:
//
// "You are Governor William Blount in 1791. Generate a brief 2-3 sentence weather briefing
// based on this data. Use period-appropriate language and 1790s terminology. Be practical
// for territorial administration.
//
// Temperature: {temp}°F
// Conditions: {weatherDescription}
// Wind: {windSpeed} mph from {windDirection}
// Pressure: {pressureInHg} inches
// Moon phase: {moonPhase}
//
// Example output: 'The glass stands firm at thirty inches, promising stable conditions
// for settlement business. A southwestern wind brings mild air, favorable for surveys
// of the frontier lands. The waxing moon suggests fortuitous timing for travelers.'"

interface GovernorsBriefingProps {
  weatherData: WeatherData;
  isLoading: boolean;
}

export async function generateBriefing(weatherData: WeatherData): Promise<string> {
  const response = await fetch('/api/governor-briefing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(weatherData),
  });

  const { briefing } = await response.json();
  return briefing;
}

export default function GovernorsBriefing({ weatherData, isLoading }: GovernorsBriefingProps) {
  const [briefing, setBriefing] = useState<string>('');

  useEffect(() => {
    if (weatherData) {
      generateBriefing(weatherData).then(setBriefing);
    }
  }, [weatherData]);

  return (
    <div className="governors-briefing">
      <h3>GOVERNOR'S BRIEFING</h3>
      <p className="briefing-text">{briefing}</p>
      {isLoading && <p className="loading">Consulting with Governor Blount...</p>}
    </div>
  );
}
```

**API Route:** `/app/api/governor-briefing/route.ts`

```typescript
export async function POST(req: Request) {
  const weatherData = await req.json();

  const prompt = `You are Governor William Blount in 1791. Generate a brief 2-3 sentence
  weather briefing for territorial administration. Use period-appropriate language.

  Temperature: ${weatherData.temp}°F
  Conditions: ${weatherData.description}
  Wind: ${weatherData.windSpeed} mph from ${weatherData.windDirection}
  Pressure: ${weatherData.pressure} inches
  Moon: ${weatherData.moonPhase}

  Keep it practical. Use terms like "the glass," "favorable," "settled," "unsettled."`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 150,
      messages: [
        { role: 'user', content: prompt },
      ],
    }),
  });

  const data = await response.json();
  const briefing = data.content[0].text;

  return Response.json({ briefing });
}
```

**Deliverables:**
- ✅ API route calls Claude API
- ✅ Briefing generates in < 2 seconds
- ✅ Text displays in Governor's View
- ✅ Error handling if API fails (fallback text)

#### Polish Pass (Days 3-5)
- Add hover states to instruments
- Add tap/click animations
- Add seasonal color variations (autumn browns, spring greens, etc.)
- Add loading states
- Test on low-bandwidth connection (simulate 3G)
- Mobile testing on real devices (iPhone + Android)
- Performance audit (Lighthouse)
- Accessibility pass (WCAG 2.1 AA)

**Deliverables:**
- ✅ Lighthouse score 90+
- ✅ All interactions smooth
- ✅ Mobile works on 3G
- ✅ Accessible color contrast
- ✅ No layout shift

#### Week 3 Success Criteria
- Governor's Briefing generates on load
- Tone is period-appropriate and useful
- All brass instruments animate smoothly together
- Toggle between views is seamless
- Performance metrics green

---

### WEEK 4: FINAL TESTING + SHIP

**Goal:** Full QA, staff launch, public ship

#### Testing (Days 1-2)
- **Functional test:** Every interaction tested
  - [ ] Barometer needle moves with pressure changes
  - [ ] Thermometer mercury animates
  - [ ] Weathervane rotates correctly
  - [ ] Toggle switches views instantly
  - [ ] Governor's Briefing generates without errors
  - [ ] Data updates correctly on refresh
  - [ ] Proverb rotates daily

- **Cross-browser test:**
  - [ ] Chrome (desktop + mobile)
  - [ ] Safari (desktop + mobile)
  - [ ] Firefox
  - [ ] Edge

- **Mobile test:**
  - [ ] iPhone 12 Pro
  - [ ] iPhone SE (small screen)
  - [ ] Pixel 6 (Android)
  - [ ] Tablet (iPad)

- **Performance test:**
  - [ ] Page load time < 2s on 4G
  - [ ] Animation frame rate 60fps
  - [ ] No janky scrolling
  - [ ] Memory usage stable (no leaks)

- **Stress test:**
  - [ ] Leave running for 1 hour (check data updates)
  - [ ] Toggle view 50 times (check for crashes)
  - [ ] Refresh every 5 seconds for 5 minutes

**Deliverables:**
- ✅ Test results document (pass/fail matrix)
- ✅ Zero critical bugs
- ✅ Zero medium bugs
- ✅ Known issues list (if any)

#### Staff Launch (Day 2-3)
- Deploy to staging URL
- Send link to staff (5 people)
- Gather feedback:
  - "Would you use this?" (Yes/No)
  - "What's confusing?"
  - "What's awesome?"
  - "Broken anything?"
- Fix any critical issues staff finds
- Iterate on wording/UI based on feedback

**Deliverables:**
- ✅ Staff feedback summary
- ✅ Critical fixes applied
- ✅ Staff sign-off

#### Public Launch (Day 4-5)
- Deploy to production
- Update site navigation (if needed)
- Create announcement post
- Monitor for 24 hours
  - Check error logs
  - Monitor API performance
  - Watch for crash reports
- Fix any runtime issues immediately

**Deliverables:**
- ✅ Live on production
- ✅ Announcement posted
- ✅ Analytics dashboard active
- ✅ 24-hour monitoring complete

#### Week 4 Success Criteria
- Zero production crashes
- Positive staff feedback
- Page loads < 2 seconds for users
- API response time < 500ms
- Users can complete full experience (both views, all instruments)

---

## COMPONENT CHECKLIST

### Core Data Components (Week 1 Reuse)
- [x] CurrentConditions.tsx — Temperature, humidity, wind, sky condition
- [x] Forecast.tsx — 7-day forecast cards
- [x] MoonPhase.tsx — Moon phase + interpretation
- [x] DailyProverb.tsx — Rotating proverb + modern take
- [x] SunTimes.tsx — Sunrise/sunset (defer to Phase 5 if needed)

### New Governor's View Components (Week 2-3 Build)
- [ ] Barometer.tsx — Pressure dial with brass styling
- [ ] Thermometer.tsx — Mercury tube with wood/brass frame
- [ ] Weathervane.tsx — Rotating compass rose with wind direction
- [ ] GovernorsBriefing.tsx — AI-generated period prose
- [ ] ViewToggle.tsx — Almanac ↔ Governor's View switcher
- [ ] GlassLayout.tsx — Governor's View grid layout (instruments positioned)

### Utilities (Week 1 Reuse + Week 2 Additions)
- [x] weather.ts — API calls to Open-Meteo/NWS
- [x] astronomy.ts — Moon phase calculations
- [x] proverbs.ts — Daily proverb rotation
- [ ] instruments.ts — NEW: Dial angle calculations, value conversions (hPa → inHg, mph → knots)
- [ ] period-language.ts — NEW: Helper functions for period-appropriate formatting

### Styling & Assets (Week 2-3)
- [ ] globals.css — Brass/gold color scheme, shadow depth
- [ ] Barometer.module.css — Dial styling
- [ ] Thermometer.module.css — Tube + mercury gradient
- [ ] Weathervane.module.css — Compass rose SVG styling
- [ ] GlassLayout.module.css — Responsive grid for 3 instruments

### Data Files
- [x] proverbs.json — 30-50 proverbs (reuse from Phase 1)
- [x] counties.json — Sullivan County data (reuse from Phase 1)

---

## SHIP CRITERIA ("DONE" DEFINITION)

Governor's Glass is DONE when:

### Functional Requirements ✅
- [x] Barometer animates based on real-time pressure data
- [x] Thermometer animates based on temperature
- [x] Weathervane rotates based on wind direction
- [x] Governor's Briefing generates on page load (Claude API)
- [x] Toggle switches between Almanac and Governor's View
- [x] User preference saved (localStorage)
- [x] Daily proverb rotates at midnight UTC
- [x] Data refreshes every 15-30 minutes

### Performance Requirements ✅
- [x] Page load time < 2 seconds (4G)
- [x] Largest Contentful Paint (LCP) < 2.5s
- [x] Animation frame rate ≥ 50fps (desktop), ≥ 24fps (mobile)
- [x] No layout shift (CLS < 0.1)
- [x] API response time < 500ms

### Mobile Requirements ✅
- [x] Works on iPhone 12 Pro (iOS 17+)
- [x] Works on Pixel 6 (Android 13+)
- [x] Responsive breakpoints: 320px, 768px, 1024px
- [x] Touch interactions smooth (no delayed clicks)
- [x] Mobile Safari no console errors
- [x] Safe area respected (notch-friendly)

### UX Requirements ✅
- [x] Toggle clearly visible and labeled
- [x] Both views render same data in different presentations
- [x] Instruments labeled and understandable
- [x] Governor's Briefing text readable (font-size ≥ 16px)
- [x] Color contrast WCAG AA minimum
- [x] Hover/tap states obvious

### Content Requirements ✅
- [x] 30-50 proverbs collected and rotating
- [x] Governor's Briefing tone period-appropriate
- [x] No typos or broken grammar
- [x] Measurements accurate (hPa → inHg, mph → knots)

### Testing Requirements ✅
- [x] Zero critical bugs
- [x] Zero medium bugs
- [x] Known issues documented (if any)
- [x] Staff tested and approved
- [x] 24-hour production monitoring completed

### Analytics & Monitoring ✅
- [x] Page view tracking active
- [x] Error logging active
- [x] Performance metrics dashboard active
- [x] Uptime monitoring active

**You can ship when ALL checkboxes are ✅**

---

## REUSABLE CODE FROM PHASE 1

These components/modules come directly from the original almanac MVP (no new work):

| Component | What | Lines | Time Saved |
|-----------|------|-------|------------|
| CurrentConditions.tsx | Temp, humidity, wind | ~100 | 2 hours |
| Forecast.tsx | 7-day cards | ~80 | 2 hours |
| MoonPhase.tsx | Moon phase display | ~60 | 1 hour |
| DailyProverb.tsx | Proverb rotation | ~40 | 1 hour |
| weather.ts | API integration | ~120 | 3 hours |
| astronomy.ts | Moon/sun math | ~150 | 4 hours |
| proverbs.ts | Proverb logic | ~30 | 1 hour |
| proverbs.json | 50 proverbs | Variable | 5 hours |

**Total time saved: ~19 hours**
**This is why we ship in 4 weeks instead of 12.**

---

## NEW CODE ESTIMATES

| Component | Est. Lines | Est. Hours | Difficulty |
|-----------|-----------|-----------|------------|
| Barometer.tsx | 80 | 3 | Medium (SVG) |
| Thermometer.tsx | 60 | 2 | Easy |
| Weathervane.tsx | 90 | 3 | Medium (rotation math) |
| GovernorsBriefing.tsx | 50 | 2 | Easy |
| ViewToggle.tsx | 30 | 1 | Easy |
| instruments.ts | 40 | 2 | Easy (math functions) |
| period-language.ts | 30 | 1 | Easy (formatting) |
| CSS (Barometer, Thermometer, Weathervane) | 400 | 6 | Medium (animation, gold styling) |
| governor-briefing API route | 40 | 1 | Easy |
| Testing & QA | — | 16 | Medium |
| **TOTAL** | ~820 | **37 hours** | — |

**Includes:** Implementation, testing, polish, staff feedback loop, deployment

---

## FEATURES CUT FROM ORIGINAL PLAN & WHY

| Feature | Why Cut | When to Add Back |
|---------|---------|-----------------|
| Multi-county selector | Adds UI complexity, duplication; MVP focuses on Sullivan County | Phase 4 after V1 launch |
| Pantry integration | Marketing distraction; weakens Governor's Glass focus | Separate initiative post-launch |
| Stream/river levels | Complex API setup, niche audience | Phase 5 expansion |
| Soil temperature | Requires 3rd-party API (Greencast) or manual management | Phase 5 expansion |
| Sunrise/sunset detail view | Nice-to-have flavor; proverb covers it | Phase 5 polish |
| Archive primary source links | Requires content mapping work; better done with Phase 5 | Phase 5 immersion |
| Cherokee perspective inserts | Requires careful, sensitive content development | Phase 5 after core is solid |
| Educator mode | Separate product line; distraction from V1 | Phase 6 revenue |
| Challenge Mode game | Requires 20 scenarios + QA testing | Phase 6 revenue |
| America 250 countdown banner | Separate initiative; doesn't serve Governor's Glass | Different project |

**Key principle:** Every cut feature makes V1 ship faster while being genuinely valuable in its own right.

---

## ARCHITECTURE OVERVIEW

```
governor-glass/
├── pages/
│   └── glass.tsx                    # Main Governor's Glass page (reused from almanac)
├── components/
│   ├── Governor/                    # NEW: Governor's View components
│   │   ├── Barometer.tsx           # Pressure dial
│   │   ├── Thermometer.tsx         # Mercury tube
│   │   ├── Weathervane.tsx         # Wind direction compass
│   │   ├── GovernorsBriefing.tsx   # AI-generated prose
│   │   ├── ViewToggle.tsx          # Almanac ↔ Governor switcher
│   │   └── GlassLayout.tsx         # Container for 3 instruments
│   ├── CurrentConditions.tsx        # (reuse from Phase 1)
│   ├── Forecast.tsx                 # (reuse from Phase 1)
│   ├── MoonPhase.tsx               # (reuse from Phase 1)
│   ├── DailyProverb.tsx            # (reuse from Phase 1)
│   └── SunTimes.tsx                # (reuse from Phase 1)
├── lib/
│   ├── weather.ts                   # (reuse from Phase 1)
│   ├── astronomy.ts                 # (reuse from Phase 1)
│   ├── proverbs.ts                  # (reuse from Phase 1)
│   ├── instruments.ts               # NEW: Dial calculations, conversions
│   └── period-language.ts           # NEW: Format text for 1790s style
├── data/
│   ├── proverbs.json               # (reuse from Phase 1)
│   └── counties.json               # (reuse from Phase 1)
├── api/
│   └── governor-briefing/
│       └── route.ts                # NEW: Claude API integration
├── styles/
│   ├── globals.css                 # Brass/gold theme
│   ├── Barometer.module.css        # NEW: Dial styling
│   ├── Thermometer.module.css      # NEW: Mercury tube
│   ├── Weathervane.module.css      # NEW: Compass styling
│   └── GlassLayout.module.css      # NEW: Responsive grid

Data flow:
Open-Meteo/NWS API → weather.ts → weather state
Astronomy calculations → moon phase, sun times
Claude API → period-appropriate briefing prose

State management:
- React hooks (useState, useEffect)
- localStorage for view preference
- No Redux needed
```

---

## WEEKLY MILESTONE CHECKLIST

### Week 1: Foundation ✅
- [ ] Day 1-2: Almanac MVP cloned and working
- [ ] Day 3-4: Old navigation cleaned up
- [ ] Day 5: Deployed to staging, staff testing begins
- **Exit criteria:** Staging URL stable, zero crashes, staff positive feedback

### Week 2: Instruments ✅
- [ ] Day 1-3: Barometer component complete
- [ ] Day 3-4: Thermometer component complete
- [ ] Day 4-5: Weathervane component complete
- [ ] Day 5: Toggle component + localStorage persistence
- [ ] Polish pass: Animation smoothness, mobile responsive
- **Exit criteria:** All 3 instruments animate correctly, toggle works, mobile tested

### Week 3: Intelligence ✅
- [ ] Day 1-3: Governor's Briefing component + API route
- [ ] Day 3-5: Polish pass (styling, animations, accessibility)
- [ ] Polish pass: Hover states, loading indicators, error handling
- [ ] Performance audit: Lighthouse, page load, animation frame rate
- **Exit criteria:** Briefing generates, all instruments smooth, Lighthouse 90+

### Week 4: Launch ✅
- [ ] Day 1-2: Full QA testing (functional, cross-browser, mobile, stress)
- [ ] Day 2-3: Staff launch and feedback loop
- [ ] Day 3: Critical fixes applied
- [ ] Day 4-5: Production deployment and 24-hour monitoring
- **Exit criteria:** Live on production, zero crashes, staff approved, analytics active

---

## RISK MITIGATION

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Claude API key exposure | Security breach | Use environment variables, never commit secrets |
| Claude API rate limiting | Briefing fails to generate | Implement caching (cache briefing for 30 min), fallback text |
| Weather API downtime | No data displayed | Use both Open-Meteo + NWS as fallback, show cached data |
| Animation performance on old phones | Jank, poor UX | Use `will-change: transform`, `requestAnimationFrame`, test on actual devices |
| User confusion about instruments | Poor engagement | Add subtle hover hints ("Tap for details"), clear labels |
| Proverb repetition | Gets stale | Ensure 50+ proverbs, rotate by day-of-year not time-of-day |
| Mobile Safari layout shift | CLS failure | Test on iPhone thoroughly, use `contain: layout` where possible |

---

## DEPLOYMENT CHECKLIST

Before ship, verify:

- [ ] Environment variables set (ANTHROPIC_API_KEY, OPEN_METEO_API_KEY)
- [ ] .env.local added to .gitignore
- [ ] API routes tested in production environment
- [ ] CORS headers correct if APIs are cross-domain
- [ ] Vercel deployment configured (if using Vercel)
- [ ] Error logging active (Sentry, LogRocket, or Vercel built-in)
- [ ] Analytics tracking active (Plausible, Mixpanel, or Vercel Analytics)
- [ ] Performance monitoring active
- [ ] Mobile breakpoints tested on Vercel preview
- [ ] CDN cache headers set appropriately
- [ ] Robots.txt and sitemap.xml updated (if needed)
- [ ] Analytics dashboard accessible
- [ ] Status page or monitoring alert set up
- [ ] On-call rotation in place (who fixes issues during launch)

---

## POST-LAUNCH (WEEK 5+)

### What to measure (first 2 weeks live)
- Page views and unique users
- Toggle usage (% who try Governor's View)
- Error rate and crash frequency
- Average page load time
- API response time
- User feedback from social/email

### What's next (Phase 5)
Based on Week 4 metrics:
1. **If Governor's View gets <10% usage:** Polish UX, promote harder, or consider alternative presentation
2. **If Briefing feels generic:** Refine Claude prompt, test variations
3. **If mobile performance struggles:** Optimize animations, lazy-load instruments

**Then proceed to Phase 5:** Archive integration, multi-county support, stream levels, soil temp.

---

## SUMMARY: 4 WEEKS VS. 36 WEEKS

| Metric | Lean Plan | Original Plan |
|--------|-----------|---------------|
| **Weeks to ship** | 4 | 36 |
| **New components** | 6 | 25+ |
| **Reused code** | 95% | 30% |
| **Content creation burden** | 1 week (proverbs) | 8+ weeks |
| **External APIs** | 2 (Open-Meteo, Claude) | 5+ |
| **Development hours** | ~37 | ~250+ |
| **Risk surface area** | Minimal | Massive |
| **Ship velocity** | Week 1 usable | Week 12+ |
| **Post-launch iterability** | High (clean MVP) | Low (bloated) |

**The lean plan ships a fully functional Governor's Glass in 4 weeks.**
**Users get a real product they'll use daily.**
**Subsequent phases build on solid foundation, not patch broken promises.**

---

## FILES TO CREATE/MODIFY

### Create (New)
```
/app/
├── governor-glass/                          # or rename /almanac to /governor-glass
│   ├── page.tsx                             # Main page
│   └── components/Governor/
│       ├── Barometer.tsx
│       ├── Thermometer.tsx
│       ├── Weathervane.tsx
│       ├── GovernorsBriefing.tsx
│       ├── ViewToggle.tsx
│       └── GlassLayout.tsx
│
/app/api/
├── governor-briefing/
│   └── route.ts                             # Claude API integration
│
/lib/
├── instruments.ts                           # New utility functions
└── period-language.ts                       # New utility functions
│
/styles/
├── Barometer.module.css
├── Thermometer.module.css
├── Weathervane.module.css
└── GlassLayout.module.css
```

### Modify (Existing)
```
/lib/
├── weather.ts                               # May need minor tweaks for new views
├── astronomy.ts                             # No changes needed
└── proverbs.ts                              # No changes needed

/components/
├── CurrentConditions.tsx                    # Copy to Governor view context
├── Forecast.tsx                             # Copy to Governor view context
├── MoonPhase.tsx                            # Copy to Governor view context
└── DailyProverb.tsx                         # Copy to Governor view context

/data/
├── proverbs.json                            # Use as-is
└── counties.json                            # Use as-is
```

---

**END OF LEAN PLAN**

*Ship fast. Learn faster. Governor's Glass in 4 weeks.*
