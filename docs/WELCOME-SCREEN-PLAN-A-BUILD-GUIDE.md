# Welcome Screen Build Guide: Plan A
## "The Commemorative Moment"
### Rocky Mount State Historic Site | Tennessee Starts Here

---

## Overview

This guide specifies the updated welcome screen for tennesseestartshere.com. The welcome screen serves as the entry portal to Rocky Mount's 2026 commemorative programming.

**Philosophy:** Dignified, institutional, commemorative. This is a state historic site celebrating America's 250th and Tennessee's 230th—not a SaaS landing page. The welcome screen should feel like arriving at a national monument, not signing up for a newsletter.

**Project Path:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here`

---

## Design Principles

1. **Brand Coherence** — Use established "Tennessee Starts Here" brand, not new taglines
2. **Commemorative Gravitas** — This is a once-in-250-years moment
3. **Sullivan County Authority** — Weather at top establishes regional presence
4. **Minimal Friction** — "ENTER SITE" is primary; let visitors explore
5. **Utility Pathways** — Almanac and Pantry as secondary options
6. **Period Aesthetic** — 1790s correspondence feel, not modern SaaS

---

## Visual Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│              ☀️ Sullivan County, Tennessee · 47°F · Clear                │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                              ┌─────────┐                                 │
│         AMERICA 250          │   RM    │         TENNESSEE 230           │
│           138 days           │  1770   │           126 days              │
│                              └─────────┘                                 │
│                                                                          │
│                                                                          │
│                            ROCKY MOUNT                                   │
│                       STATE HISTORIC SITE                                │
│                                                                          │
│              ═══════════════════════════════════════                     │
│                                                                          │
│                       TENNESSEE STARTS HERE                              │
│                                                                          │
│              ═══════════════════════════════════════                     │
│                                                                          │
│                     Piney Flats, Tennessee                               │
│                                                                          │
│                                                                          │
│                  ┌────────────────────────────┐                          │
│                  │    ✦  ENTER SITE  ✦        │                          │
│                  └────────────────────────────┘                          │
│                                                                          │
│                        ─────── ✦ ───────                                 │
│                                                                          │
│       ┌───────────────────┐         ┌───────────────────┐               │
│       │ THE 1775 ALMANAC  │         │  ROCKY MOUNT      │               │
│       │                   │         │  PANTRY           │               │
│       │ Weather & Wisdom  │         │                   │               │
│       │ Sullivan County   │         │  Heritage Foods   │               │
│       │                   │         │                   │               │
│       │    [ Open → ]     │         │  Coming Soon      │               │
│       │                   │         │                   │               │
│       └───────────────────┘         └───────────────────┘               │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Element Hierarchy

| Priority | Element | Purpose |
|----------|---------|---------|
| **1** | Weather Header | Sullivan County authority, ambient life |
| **2** | Dual Countdown + Wax Seal | Urgency, commemorative framing |
| **3** | Title Block | Institutional identity |
| **4** | "TENNESSEE STARTS HERE" | Brand statement |
| **5** | "ENTER SITE" Button | Primary CTA |
| **6** | Almanac Card | Utility pathway |
| **7** | Pantry Card (Coming Soon) | Future pathway |

---

## Files to Create

| File | Purpose |
|------|---------|
| `/components/welcome/WeatherHeader.tsx` | Live weather for Sullivan County at top |
| `/components/welcome/DualCountdown.tsx` | Days until America 250 + Tennessee 230 |

---

## Files to Modify

| File | Changes |
|------|---------|
| `/app/(welcome)/page.tsx` | New layout structure |
| `/app/(welcome)/welcome.css` | Styles for new elements |

---

## Component Specifications

### 1. WeatherHeader.tsx (NEW)

**Location:** `/components/welcome/WeatherHeader.tsx`

**Purpose:** Display live weather for Sullivan County at the top of the welcome screen. Establishes regional authority and adds ambient life to the page.

**API:** Open-Meteo (free, no key required)
**Coordinates:** Rocky Mount: `36.4539, -82.3109`

```tsx
'use client'

import { useEffect, useState } from 'react'

interface WeatherData {
  temp: number
  condition: string
  icon: string
}

export function WeatherHeader() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const lat = 36.4539
    const lon = -82.3109

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/New_York`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Weather fetch failed')
        return res.json()
      })
      .then((data) => {
        const code = data.current.weather_code
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: getConditionText(code),
          icon: getWeatherIcon(code),
        })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  // Don't render anything while loading or on error
  if (loading || !weather) {
    return (
      <div className="weather-header weather-header--loading">
        <span className="weather-text">Sullivan County, Tennessee</span>
      </div>
    )
  }

  return (
    <div className="weather-header">
      <span className="weather-icon" aria-hidden="true">
        {weather.icon}
      </span>
      <span className="weather-text">
        Sullivan County, Tennessee · {weather.temp}°F · {weather.condition}
      </span>
    </div>
  )
}

function getConditionText(code: number): string {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Partly Cloudy'
  if (code <= 49) return 'Foggy'
  if (code <= 59) return 'Drizzle'
  if (code <= 69) return 'Rainy'
  if (code <= 79) return 'Snowy'
  if (code <= 82) return 'Showers'
  if (code <= 99) return 'Stormy'
  return 'Fair'
}

function getWeatherIcon(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 49) return '🌫️'
  if (code <= 59) return '🌦️'
  if (code <= 69) return '🌧️'
  if (code <= 79) return '🌨️'
  if (code <= 82) return '🌧️'
  if (code <= 99) return '⛈️'
  return '🌤️'
}
```

---

### 2. DualCountdown.tsx (NEW)

**Location:** `/components/welcome/DualCountdown.tsx`

**Purpose:** Display days remaining until both commemorations. Creates urgency and frames the commemorative moment.

**Target Dates:**
- America 250: July 4, 2026
- Tennessee 230: June 1, 2026 (statehood day)

```tsx
'use client'

import { useEffect, useState } from 'react'

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = target.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function DualCountdown() {
  const [daysAmerica, setDaysAmerica] = useState<number>(getDaysUntil('2026-07-04'))
  const [daysTennessee, setDaysTennessee] = useState<number>(getDaysUntil('2026-06-01'))

  useEffect(() => {
    // Update at midnight
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const msUntilMidnight = tomorrow.getTime() - now.getTime()

    const timeout = setTimeout(() => {
      setDaysAmerica(getDaysUntil('2026-07-04'))
      setDaysTennessee(getDaysUntil('2026-06-01'))
    }, msUntilMidnight)

    return () => clearTimeout(timeout)
  }, [daysAmerica, daysTennessee])

  return (
    <div className="dual-countdown">
      <div className="countdown-item">
        <span className="countdown-label">AMERICA 250</span>
        <span className="countdown-days">{daysAmerica} days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-label">TENNESSEE 230</span>
        <span className="countdown-days">{daysTennessee} days</span>
      </div>
    </div>
  )
}
```

---

### 3. Updated page.tsx

**Location:** `/app/(welcome)/page.tsx`

**Changes:**
- Add WeatherHeader at top
- Add DualCountdown flanking wax seal
- Update title block structure
- Add "TENNESSEE STARTS HERE" as prominent brand line
- Keep Almanac card active
- Update Pantry card with "Coming Soon"
- Remove WeatherFooter (moved to top)

```tsx
import Link from 'next/link'
import { WeatherHeader } from '@/components/welcome/WeatherHeader'
import { DualCountdown } from '@/components/welcome/DualCountdown'
import { WaxSeal } from '@/components/welcome/WaxSeal'
import './welcome.css'

export const metadata = {
  title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
  description:
    'Welcome to Rocky Mount State Historic Site in Piney Flats, Tennessee. Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
  openGraph: {
    title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
    description:
      'Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
    images: [{ url: '/og-welcome.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
    description:
      'Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
  },
}

export default function WelcomePage() {
  return (
    <main className="welcome-page">
      {/* Weather Header - Sullivan County Authority */}
      <WeatherHeader />

      <div className="welcome-content">
        {/* Commemorative Header: Countdown + Seal + Countdown */}
        <div className="welcome-header">
          <DualCountdown />
        </div>

        {/* Wax Seal */}
        <div className="seal-container">
          <WaxSeal />
        </div>

        {/* Title Block */}
        <div className="welcome-title-block">
          <h1 className="welcome-title">ROCKY MOUNT</h1>
          <p className="welcome-subtitle">STATE HISTORIC SITE</p>
        </div>

        {/* Brand Statement */}
        <div className="brand-statement">
          <span className="brand-line-left" aria-hidden="true"></span>
          <span className="brand-text">TENNESSEE STARTS HERE</span>
          <span className="brand-line-right" aria-hidden="true"></span>
        </div>

        {/* Location */}
        <p className="welcome-location">Piney Flats, Tennessee</p>

        {/* Primary CTA */}
        <Link
          href="/home"
          className="enter-button"
          aria-label="Enter Rocky Mount State Historic Site"
        >
          <span className="button-ornament" aria-hidden="true">
            ✦
          </span>
          ENTER SITE
          <span className="button-ornament" aria-hidden="true">
            ✦
          </span>
        </Link>

        {/* Divider */}
        <div className="divider" role="separator" aria-hidden="true">
          <span className="divider-ornament">✦</span>
        </div>

        {/* Feature Cards */}
        <div className="cards-container">
          {/* Almanac Card - Active */}
          <Link
            href="/almanac"
            className="feature-card"
            aria-label="Open The 1775 Almanac"
          >
            <h3 className="card-title">THE 1775 ALMANAC</h3>
            <p className="card-description">Weather &amp; Wisdom</p>
            <p className="card-description">Sullivan County</p>
            <span className="card-cta" aria-hidden="true">
              Open →
            </span>
          </Link>

          {/* Pantry Card - Coming Soon */}
          <div
            className="feature-card feature-card--disabled"
            aria-label="Rocky Mount Pantry - Coming Soon"
          >
            <h3 className="card-title">ROCKY MOUNT PANTRY</h3>
            <p className="card-description">Heritage Foods</p>
            <p className="card-coming-soon">Coming Soon</p>
          </div>
        </div>
      </div>
    </main>
  )
}
```

---

### 4. Updated welcome.css

**Location:** `/app/(welcome)/welcome.css`

**Changes:**
- Add weather header styles
- Add dual countdown styles
- Add brand statement styles
- Update spacing/layout
- Remove weather footer styles (no longer needed)

```css
/* ===========================================
   WELCOME SCREEN STYLES
   Rocky Mount State Historic Site
   Plan A: The Commemorative Moment
   =========================================== */

/* CSS Custom Properties */
.welcome-page {
  --welcome-bg: #0a1628;
  --text-primary: #f5f1e8;
  --text-secondary: #a0977d;
  --text-muted: rgba(245, 241, 232, 0.5);
  --gold: #c9a227;
  --gold-muted: rgba(201, 162, 39, 0.6);
  --rust: #722f37;
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-border: rgba(201, 162, 39, 0.2);
  --card-hover-border: rgba(201, 162, 39, 0.5);
  --disabled-opacity: 0.45;
}

/* Page Container */
.welcome-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--welcome-bg);
}

/* ===========================================
   WEATHER HEADER
   =========================================== */

.weather-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(201, 162, 39, 0.15);
}

.weather-header--loading {
  opacity: 0.6;
}

.weather-icon {
  font-size: 1rem;
}

.weather-text {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 0.85rem;
  color: rgba(245, 241, 232, 0.6);
  letter-spacing: 0.02em;
}

/* ===========================================
   CONTENT WRAPPER
   =========================================== */

.welcome-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}

/* ===========================================
   DUAL COUNTDOWN
   =========================================== */

.welcome-header {
  margin-bottom: 1rem;
}

.dual-countdown {
  display: flex;
  justify-content: center;
  gap: 4rem;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.countdown-label {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--gold-muted);
  text-transform: uppercase;
}

.countdown-days {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  font-style: italic;
  color: rgba(245, 241, 232, 0.7);
}

@media (max-width: 480px) {
  .dual-countdown {
    gap: 2rem;
  }

  .countdown-label {
    font-size: 0.5rem;
  }

  .countdown-days {
    font-size: 0.8rem;
  }
}

/* ===========================================
   WAX SEAL
   =========================================== */

.seal-container {
  margin: 1rem 0;
}

.wax-seal {
  width: 100px;
  height: 100px;
  background: radial-gradient(
    circle at 35% 35%,
    #b85a62,
    #722f37 40%,
    #5a2329 70%,
    #4a1f24
  );
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5),
    inset 0 2px 4px rgba(255, 255, 255, 0.15),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2);
  border: 3px solid rgba(201, 162, 39, 0.4);
  flex-shrink: 0;
}

.seal-text {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #4a1f24;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1),
    -1px -1px 0 rgba(0, 0, 0, 0.2);
  line-height: 1;
}

.seal-date {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #4a1f24;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1);
  margin-top: 2px;
  text-transform: uppercase;
}

@media (min-width: 640px) {
  .wax-seal {
    width: 110px;
    height: 110px;
  }

  .seal-text {
    font-size: 2rem;
  }

  .seal-date {
    font-size: 0.55rem;
  }
}

/* ===========================================
   TITLE BLOCK
   =========================================== */

.welcome-title-block {
  margin-bottom: 0.75rem;
}

.welcome-title {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: clamp(2rem, 8vw, 3.5rem);
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.welcome-subtitle {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: clamp(0.6rem, 2vw, 0.8rem);
  font-weight: 400;
  letter-spacing: 0.35em;
  color: var(--text-secondary);
  margin: 0;
  text-transform: uppercase;
}

/* ===========================================
   BRAND STATEMENT
   =========================================== */

.brand-statement {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.25rem 0;
  width: 100%;
  max-width: 500px;
}

.brand-line-left,
.brand-line-right {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(201, 162, 39, 0.5),
    rgba(201, 162, 39, 0.5)
  );
  max-width: 100px;
}

.brand-line-right {
  background: linear-gradient(
    90deg,
    rgba(201, 162, 39, 0.5),
    rgba(201, 162, 39, 0.5),
    transparent
  );
}

.brand-text {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: clamp(0.7rem, 2.5vw, 0.9rem);
  font-weight: 600;
  letter-spacing: 0.25em;
  color: var(--gold);
  white-space: nowrap;
}

@media (max-width: 480px) {
  .brand-statement {
    gap: 0.75rem;
  }

  .brand-line-left,
  .brand-line-right {
    max-width: 40px;
  }
}

/* ===========================================
   LOCATION
   =========================================== */

.welcome-location {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  font-style: italic;
  color: var(--text-muted);
  margin: 0 0 2rem 0;
}

/* ===========================================
   ENTER BUTTON
   =========================================== */

.enter-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--gold);
  background: transparent;
  border: 2px solid var(--gold);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.enter-button:hover {
  background: var(--gold);
  color: var(--welcome-bg);
}

.enter-button:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 4px;
}

.button-ornament {
  font-size: 0.65rem;
  opacity: 0.7;
}

/* ===========================================
   DIVIDER
   =========================================== */

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  width: 100%;
}

.divider::before,
.divider::after {
  content: '';
  width: 80px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(201, 162, 39, 0.4),
    transparent
  );
}

.divider-ornament {
  color: rgba(201, 162, 39, 0.5);
  font-size: 0.75rem;
}

/* ===========================================
   FEATURE CARDS
   =========================================== */

.cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  max-width: 520px;
  width: 100%;
}

@media (max-width: 500px) {
  .cards-container {
    grid-template-columns: 1fr;
    max-width: 260px;
  }
}

.feature-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: 1.25rem 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.feature-card:hover:not(.feature-card--disabled) {
  border-color: var(--card-hover-border);
  background: rgba(255, 255, 255, 0.04);
}

.feature-card:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

.feature-card--disabled {
  opacity: var(--disabled-opacity);
  cursor: default;
}

.card-title {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  margin: 0 0 0.6rem 0;
}

.card-description {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0.15rem 0;
}

.card-cta {
  display: inline-block;
  margin-top: 0.75rem;
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--gold);
}

.card-coming-soon {
  margin-top: 0.75rem;
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 0.85rem;
  font-style: italic;
  color: rgba(245, 241, 232, 0.4);
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
  .enter-button,
  .feature-card {
    transition: none;
  }
}
```

---

## Implementation Checklist

### Phase 1: Create New Components
- [ ] Create `/components/welcome/WeatherHeader.tsx`
- [ ] Create `/components/welcome/DualCountdown.tsx`

### Phase 2: Update Existing Files
- [ ] Replace `/app/(welcome)/page.tsx` with new structure
- [ ] Replace `/app/(welcome)/welcome.css` with new styles

### Phase 3: Verify Existing Components
- [ ] Confirm `/components/welcome/WaxSeal.tsx` exists and works
- [ ] Confirm WaxSeal displays "RM" and "Est. 1770"

### Phase 4: Testing
- [ ] Desktop: Check layout at 1440px, 1920px
- [ ] Tablet: Check layout at 768px, 1024px
- [ ] Mobile: Check stacking at 375px, 414px
- [ ] Weather API: Verify it loads correctly
- [ ] Countdown: Verify accuracy (July 4, 2026 and June 1, 2026)
- [ ] Almanac link: Verify `/almanac` route works
- [ ] Enter Site link: Verify `/home` route works
- [ ] Accessibility: Tab navigation, screen reader

### Phase 5: Build Verification
- [ ] Run `npm run build` — no errors
- [ ] Run `npm run dev` — visual check

---

## Key Dates Reference

| Date | Event | Countdown Target |
|------|-------|------------------|
| June 1, 2026 | Tennessee's 230th Statehood Day | Tennessee 230 |
| July 4, 2026 | America's 250th Birthday | America 250 |

---

## Historical Context

| Date | Significance |
|------|--------------|
| ~1770 | Rocky Mount site settled (shown on wax seal) |
| 1775 | Tennessee's oldest documented farm established (Century Farms) |
| 1790-1792 | Rocky Mount served as Southwest Territory capital |
| 1796 | Tennessee becomes 16th state |

---

## Typography Reference

| Element | Font | Size | Weight | Style |
|---------|------|------|--------|-------|
| Weather text | Cormorant Garamond | 0.85rem | 400 | Normal |
| Countdown label | Cinzel | 0.55rem | 600 | Uppercase |
| Countdown days | Cormorant Garamond | 0.9rem | 400 | Italic |
| Title "ROCKY MOUNT" | Cinzel | clamp(2rem, 8vw, 3.5rem) | 700 | Uppercase |
| Subtitle | Cinzel | clamp(0.6rem, 2vw, 0.8rem) | 400 | Uppercase |
| Brand text | Cinzel | clamp(0.7rem, 2.5vw, 0.9rem) | 600 | Uppercase |
| Location | Cormorant Garamond | clamp(0.9rem, 2.5vw, 1.1rem) | 400 | Italic |
| Button | Cinzel | 0.8rem | 600 | Uppercase |
| Card title | Cinzel | 0.85rem | 600 | Uppercase |
| Card description | Cormorant Garamond | 0.9rem | 400 | Normal |

---

## Color Reference

| Variable | Value | Usage |
|----------|-------|-------|
| `--welcome-bg` | #0a1628 | Page background |
| `--text-primary` | #f5f1e8 | Main text |
| `--text-secondary` | #a0977d | Subdued text |
| `--text-muted` | rgba(245,241,232,0.5) | Very subdued |
| `--gold` | #c9a227 | Accent, CTAs |
| `--gold-muted` | rgba(201,162,39,0.6) | Subdued accent |
| `--rust` | #722f37 | Wax seal |

---

## Success Criteria

1. ✅ Weather header shows Sullivan County conditions at top
2. ✅ Dual countdown shows days until both commemorations
3. ✅ Wax seal displays "RM" + "Est. 1770"
4. ✅ "TENNESSEE STARTS HERE" is prominent brand statement
5. ✅ "ENTER SITE" → `/home`
6. ✅ Almanac card → `/almanac`
7. ✅ Pantry card shows "Coming Soon"
8. ✅ Mobile responsive
9. ✅ Accessible
10. ✅ Build passes

---

## What This Does NOT Include

- ❌ "Easy Never Built Tennessee" tagline (not established brand)
- ❌ First 250 enrollment block (per user request)
- ❌ Telegraph ticker (complexity without clear ROI)
- ❌ Atmospheric effects (keeps it lightweight)
- ❌ Parallax/mouse tracking (performance concern)

---

## Notes for Claude Code

1. **Do not invent new brand elements** — Use only what's specified
2. **Preserve existing WaxSeal component** — Just verify it works
3. **Weather API is free** — No API key needed for Open-Meteo
4. **Fonts should already be loaded** — Cinzel + Cormorant Garamond in layout.tsx
5. **Test countdown math** — Days should match actual calendar
6. **Mobile first** — Stack elements vertically on small screens
