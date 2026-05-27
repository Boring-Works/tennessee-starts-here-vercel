# Welcome Screen Implementation for Tennessee Starts Here

You are implementing a Welcome Screen splash page for Rocky Mount State Historic Site.

## Project Location
```
/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/
```

## Reference Documentation
Read `/docs/WELCOME-SCREEN-BUILD-GUIDE.md` for full CSS and component specifications.

---

## CRITICAL: Layout Architecture

The current `/app/layout.tsx` includes Navigation, Footer, and MobileStickyCTA. The Welcome Screen needs a **clean full-screen layout without these**.

**Solution: Use Next.js Route Groups**

Route groups use parentheses `(groupname)` to organize routes with different layouts without affecting URLs.

### New File Structure

```
/app
  /layout.tsx                    ← Root layout (fonts, html/body only)
  /(welcome)
    /layout.tsx                  ← Minimal layout (no nav/footer)
    /page.tsx                    ← Welcome screen → URL: /
  /(main)
    /layout.tsx                  ← Full layout (nav, footer, sticky CTA)
    /home
      /page.tsx                  ← Homepage → URL: /home
    /almanac                     ← Move existing almanac here
      /page.tsx                  → URL: /almanac
    /events                      ← Move existing events here
    /visit                       ← Move existing visit here
    /about                       ← Move existing about here
    /support                     ← Move existing support here
    /contact                     ← Move existing contact here
```

### Step-by-Step Migration

1. **Modify `/app/layout.tsx`** — Keep only:
   - HTML structure (`<html>`, `<body>`)
   - Font loading
   - Global CSS imports
   - Remove: Navigation, Footer, MobileStickyCTA

2. **Create `/(welcome)/layout.tsx`** — Minimal wrapper:
   ```tsx
   export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
     return <>{children}</>
   }
   ```

3. **Create `/(welcome)/page.tsx`** — The welcome screen

4. **Create `/(main)/layout.tsx`** — Move Navigation, Footer, MobileStickyCTA here:
   ```tsx
   import Navigation from '@/components/Navigation'
   import Footer from '@/components/Footer'
   import MobileStickyCTA from '@/components/MobileStickyCTA'

   export default function MainLayout({ children }: { children: React.ReactNode }) {
     return (
       <>
         <Navigation />
         {children}
         <Footer />
         <MobileStickyCTA />
       </>
     )
   }
   ```

5. **Move current homepage** from `/app/page.tsx` to `/(main)/home/page.tsx`

6. **Move all other routes** into `/(main)/`:
   - `/app/almanac/*` → `/app/(main)/almanac/*`
   - `/app/events/*` → `/app/(main)/events/*`
   - etc.

---

## Summary

Create a full-screen welcome page at `/` without nav/footer. All other site pages get nav/footer via the `(main)` route group.

**Elements:**
1. Wax seal with "RM" + "Est. 1770" (gold ring border)
2. Badges: "AMERICA 250" | [seal] | "TENNESSEE 230"
3. Title: "ROCKY MOUNT / STATE HISTORIC SITE / Piney Flats, Tennessee"
4. Button: "✦ ENTER SITE ✦" → links to `/home`
5. Cards: THE 1775 ALMANAC (active → `/almanac`) | ROCKY MOUNT PANTRY (disabled)
6. Weather footer: Live Sullivan County conditions

---

## Files to Create

```
/app/(welcome)/layout.tsx        ← Minimal layout
/app/(welcome)/page.tsx          ← Welcome screen
/app/(main)/layout.tsx           ← Full layout with nav/footer
/app/(main)/home/page.tsx        ← Current homepage moves here
/components/welcome/WaxSeal.tsx
/components/welcome/WeatherFooter.tsx
/app/(welcome)/welcome.css       ← Welcome screen styles
```

## Files to Modify

```
/app/layout.tsx                  ← Remove Navigation, Footer, MobileStickyCTA
```

## Files to Move

```
/app/almanac/*      → /app/(main)/almanac/*
/app/events/*       → /app/(main)/events/*
/app/visit/*        → /app/(main)/visit/*
/app/about/*        → /app/(main)/about/*
/app/support/*      → /app/(main)/support/*
/app/contact/*      → /app/(main)/contact/*
```

---

## Design Tokens

```css
--welcome-bg: #0A1628;
--text-primary: #F5F1E8;
--text-secondary: #A0977D;
--text-muted: rgba(245, 241, 232, 0.5);
--gold: #C9A227;
--gold-muted: rgba(201, 162, 39, 0.6);
--card-bg: rgba(255, 255, 255, 0.03);
--card-border: rgba(201, 162, 39, 0.2);
--disabled-opacity: 0.45;
```

**Fonts:** Cinzel (titles), Cormorant Garamond (body)

---

## Component: WaxSeal.tsx

```tsx
export function WaxSeal() {
  return (
    <div className="wax-seal" role="img" aria-label="Rocky Mount seal, established 1770">
      <span className="seal-text">RM</span>
      <span className="seal-date">Est. 1770</span>
    </div>
  )
}
```

---

## Component: WeatherFooter.tsx

```tsx
'use client'

import { useEffect, useState } from 'react'

interface WeatherData {
  temp: number
  code: number
  high: number
  low: number
}

export function WeatherFooter() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Rocky Mount: 200 Hyder Hill Road, Piney Flats, TN 37686
    const lat = 36.4539
    const lon = -82.3109

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America/New_York&forecast_days=1`
    )
      .then(res => {
        if (!res.ok) throw new Error('Weather fetch failed')
        return res.json()
      })
      .then(data => {
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
        })
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="weather-footer weather-footer--loading" aria-live="polite">
        <span className="weather-text">Loading conditions...</span>
      </div>
    )
  }

  if (error || !weather) return null

  const condition = getConditionText(weather.code)
  const icon = getWeatherIcon(weather.code)

  return (
    <div className="weather-footer" aria-label={`Current weather: ${weather.temp}°F, ${condition}`}>
      <span className="weather-icon" aria-hidden="true">{icon}</span>
      <span className="weather-text">Sullivan County • {weather.temp}°F • {condition}</span>
      <span className="weather-hilo">H: {weather.high}° / L: {weather.low}°</span>
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

## Main Welcome Page: /(welcome)/page.tsx

```tsx
import Link from 'next/link'
import { WeatherFooter } from '@/components/welcome/WeatherFooter'
import { WaxSeal } from '@/components/welcome/WaxSeal'
import './welcome.css'

export const metadata = {
  title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
  description: 'Welcome to Rocky Mount State Historic Site in Piney Flats, Tennessee. Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
  openGraph: {
    title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
    description: 'Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
    images: [{ url: '/og-welcome.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
    description: 'Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
  },
}

export default function WelcomePage() {
  return (
    <main className="welcome-page">
      <div className="welcome-content">

        <div className="welcome-header">
          <span className="welcome-badge">AMERICA 250</span>
          <WaxSeal />
          <span className="welcome-badge">TENNESSEE 230</span>
        </div>

        <div className="welcome-title-block">
          <h1 className="welcome-title">ROCKY MOUNT</h1>
          <p className="welcome-subtitle">STATE HISTORIC SITE</p>
          <p className="welcome-location">Piney Flats, Tennessee</p>
        </div>

        <Link href="/home" className="enter-button" aria-label="Enter Rocky Mount State Historic Site">
          <span className="button-ornament" aria-hidden="true">✦</span>
          ENTER SITE
          <span className="button-ornament" aria-hidden="true">✦</span>
        </Link>

        <div className="divider" role="separator" aria-hidden="true">
          <span className="divider-ornament">✦</span>
        </div>

        <div className="cards-container">
          <Link href="/almanac" className="feature-card" aria-label="Open The 1775 Almanac">
            <h3 className="card-title">THE 1775 ALMANAC</h3>
            <p className="card-description">Weather & Wisdom</p>
            <p className="card-description">Sullivan County</p>
            <span className="card-cta" aria-hidden="true">Open →</span>
          </Link>

          <div className="feature-card feature-card--disabled" aria-label="Rocky Mount Pantry - Coming Soon">
            <h3 className="card-title">ROCKY MOUNT PANTRY</h3>
            <p className="card-description">Heritage Foods</p>
            <p className="card-coming-soon">Coming Soon</p>
          </div>
        </div>

        <div className="divider" role="separator" aria-hidden="true">
          <span className="divider-ornament">✦</span>
        </div>

        <WeatherFooter />

      </div>
    </main>
  )
}
```

---

## Critical Requirements

| Item | Correct Value |
|------|---------------|
| Seal text | "RM" + "Est. 1770" |
| Pantry description | "Heritage Foods" (NOT "Goods") |
| Weather coordinates | lat: 36.4539, lon: -82.3109 |
| Weather loading | Show "Loading conditions..." |
| Primary CTA | Links to `/home` |
| Almanac card | Links to `/almanac` |
| Pantry card | Disabled, no link, opacity 0.45 |

---

## Protected — BE CAREFUL

The almanac routes and components work correctly. When moving to `/(main)/almanac/`, preserve all existing functionality:

```
/app/almanac/*           → /app/(main)/almanac/*
/components/almanac/*    → NO CHANGE (stays in place)
/lib/almanac/*           → NO CHANGE (stays in place)
```

---

## Verification Checklist

After implementation:

- [ ] `npm run build` passes
- [ ] `/` shows Welcome Screen (NO nav/footer)
- [ ] `/home` shows main homepage (WITH nav/footer)
- [ ] `/almanac` works (WITH nav/footer)
- [ ] All other routes work with nav/footer
- [ ] Seal shows "RM" + "Est. 1770"
- [ ] "ENTER SITE" navigates to `/home`
- [ ] Almanac card navigates to `/almanac`
- [ ] Pantry card shows "Heritage Foods" + "Coming Soon" (not clickable)
- [ ] Weather shows loading, then data
- [ ] Mobile responsive (cards stack on small screens)
- [ ] Tab navigation works

---

## Commit Message

```
feat: add welcome screen with route groups for layout isolation

- New splash page at / using (welcome) route group
- All main site pages moved to (main) route group
- Welcome screen has no nav/footer
- Main pages retain nav/footer/sticky CTA
- Live weather footer with loading state
- Pantry disabled (Heritage Foods - Coming Soon)
- Full accessibility support
- Mobile responsive
```
