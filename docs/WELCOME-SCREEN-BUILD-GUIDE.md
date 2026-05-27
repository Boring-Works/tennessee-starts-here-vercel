# Tennessee Starts Here — Welcome Screen Build Guide
## Version 1.2 | January 26, 2026

---

## Overview

A full-screen welcome/splash page that serves as the entry point to the Tennessee Starts Here website. Rocky Mount is the hero. Two secondary paths (Almanac + Pantry) provide utility and future revenue. Live weather data adds ambient value.

---

## ⚠️ CRITICAL: Layout Architecture

The current `/app/layout.tsx` includes Navigation, Footer, and MobileStickyCTA. The Welcome Screen needs a **clean full-screen layout without these**.

### Solution: Next.js Route Groups

Route groups use parentheses `(groupname)` to organize routes with different layouts **without affecting URLs**.

### New File Structure

```
/app
  /layout.tsx                    ← Root layout (fonts, html/body ONLY)
  
  /(welcome)                     ← Route group for splash screen
    /layout.tsx                  ← Minimal layout (no nav/footer)
    /page.tsx                    ← Welcome screen → URL: /
    /welcome.css
    
  /(main)                        ← Route group for main site
    /layout.tsx                  ← Full layout (nav, footer, sticky CTA)
    /home
      /page.tsx                  ← Homepage → URL: /home
    /almanac                     ← Move existing almanac here
      /page.tsx                  → URL: /almanac
    /events                      ← Move existing routes
    /visit
    /about
    /support
    /contact
```

### Step-by-Step Migration

**1. Modify `/app/layout.tsx`**

Keep ONLY:
- HTML structure (`<html>`, `<body>`)
- Font loading
- Global CSS imports

Remove:
- Navigation
- Footer
- MobileStickyCTA

```tsx
// /app/layout.tsx (AFTER modification)
import './globals.css'
import { cinzel, cormorantGaramond } from './fonts'

export const metadata = { /* ... */ }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorantGaramond.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
```

**2. Create `/(welcome)/layout.tsx`**

Minimal wrapper — no navigation or footer:

```tsx
// /app/(welcome)/layout.tsx
export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

**3. Create `/(main)/layout.tsx`**

Move Navigation, Footer, MobileStickyCTA here:

```tsx
// /app/(main)/layout.tsx
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import MobileStickyCTA from '@/components/MobileStickyCTA'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
      <MobileStickyCTA />
    </>
  )
}
```

**4. Move all existing routes into `/(main)/`:**

```
/app/page.tsx         → /app/(main)/home/page.tsx
/app/almanac/*        → /app/(main)/almanac/*
/app/events/*         → /app/(main)/events/*
/app/visit/*          → /app/(main)/visit/*
/app/about/*          → /app/(main)/about/*
/app/support/*        → /app/(main)/support/*
/app/contact/*        → /app/(main)/contact/*
```

**5. Create Welcome Screen at `/(welcome)/page.tsx`**

---

## URL Mapping After Migration

| URL | Route Group | Layout | File |
|-----|-------------|--------|------|
| `/` | `(welcome)` | No nav/footer | `/(welcome)/page.tsx` |
| `/home` | `(main)` | Full site | `/(main)/home/page.tsx` |
| `/almanac` | `(main)` | Full site | `/(main)/almanac/page.tsx` |
| `/events` | `(main)` | Full site | `/(main)/events/page.tsx` |
| etc. | `(main)` | Full site | ... |

---

## User Flow

```
User arrives at tennesseestartshere.com
              ↓
      Welcome Screen (this page)
         No nav/footer
              ↓
    ┌─────────┴─────────┐
    ↓                   ↓
ENTER SITE          THE 1775 ALMANAC
(/home)                (/almanac)
Has nav/footer         Has nav/footer
```

---

## Visual Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                         ┌───────┐                            │
│      AMERICA 250        │  RM   │        TENNESSEE 230       │
│                         │ 1770  │                            │
│                         └───────┘                            │
│                                                              │
│                      ROCKY MOUNT                             │
│                 STATE  HISTORIC  SITE                        │
│                  Piney Flats, Tennessee                      │
│                                                              │
│                                                              │
│                  ┌──────────────────┐                        │
│                  │   ✦ ENTER SITE ✦ │                        │
│                  └──────────────────┘                        │
│                                                              │
│                                                              │
│              ─────────── ✦ ───────────                       │
│                                                              │
│                                                              │
│    ┌─────────────────────┐    ┌─────────────────────┐       │
│    │                     │    │                     │       │
│    │   THE 1775 ALMANAC  │    │   ROCKY MOUNT       │       │
│    │                     │    │   PANTRY            │       │
│    │   Weather & Wisdom  │    │                     │       │
│    │   Sullivan County   │    │   Heritage Foods    │       │
│    │                     │    │   Coming Soon       │       │
│    │   [ Open → ]        │    │                     │       │
│    │                     │    │                     │       │
│    └─────────────────────┘    └─────────────────────┘       │
│                                                              │
│                                                              │
│              ─────────── ✦ ───────────                       │
│                                                              │
│             ☀️ Sullivan County • 47°F • Clear                │
│                    H: 58° / L: 34°                           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Historical Context for Dates

| Date | What It Refers To | Used Where |
|------|-------------------|------------|
| **1770** | When Rocky Mount site was settled | Wax seal on Welcome Screen |
| **1775** | Tennessee's oldest documented farm (Century Farms) | The 1775 Almanac branding |
| **1790-1792** | Territorial capital period | Site history content |
| **1820s** | Current building construction | Architecture details |

Both "Est. 1770" (Welcome Screen) and "1775" (Almanac) are accurate for their respective contexts.

---

## Component Hierarchy

| Priority | Element | Purpose |
|----------|---------|---------|
| **1** | Wax Seal + Branding | Identity — Rocky Mount is the hero |
| **1** | ENTER SITE button | Primary CTA — enters main website |
| **2** | Almanac Card | Secondary — daily utility tool |
| **2** | Pantry Card | Secondary — future revenue (Coming Soon) |
| **3** | Live Weather Footer | Ambient — adds life, no action required |

---

## Design Specifications

### Colors

```css
:root {
  /* Background */
  --welcome-bg: #0A1628;           /* Midnight */
  
  /* Text */
  --text-primary: #F5F1E8;         /* Parchment/Cream */
  --text-secondary: #A0977D;       /* Muted gold */
  --text-muted: rgba(245, 241, 232, 0.5);
  
  /* Accents */
  --gold: #C9A227;                 /* Gold accents */
  --gold-muted: rgba(201, 162, 39, 0.6);
  --rust: #722F37;                 /* Wax seal red */
  
  /* Cards */
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-border: rgba(201, 162, 39, 0.2);
  --card-hover-border: rgba(201, 162, 39, 0.5);
  
  /* Disabled state (Pantry) */
  --disabled-opacity: 0.45;
}
```

### Typography

```css
/* Title - "ROCKY MOUNT" */
.welcome-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-primary);
}

/* Subtitle - "STATE HISTORIC SITE" */
.welcome-subtitle {
  font-family: 'Cinzel', serif;
  font-size: clamp(0.7rem, 2vw, 1rem);
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

/* Location - "Piney Flats, Tennessee" */
.welcome-location {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-style: italic;
  color: var(--text-muted);
}

/* Commemorative badges - "AMERICA 250" / "TENNESSEE 230" */
.welcome-badge {
  font-family: 'Cinzel', serif;
  font-size: clamp(0.6rem, 1.5vw, 0.75rem);
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold-muted);
}

/* Card titles */
.card-title {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--text-primary);
}

/* Card descriptions */
.card-description {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

/* Weather footer */
.weather-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  color: var(--text-muted);
}
```

### Font Loading

The project should already have Cinzel and Cormorant Garamond configured. If not:

```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

---

## Component Specifications

### 1. Wax Seal (with "Est. 1770")

Enhanced seal with gold ring border and embossed effect:

```tsx
// /components/welcome/WaxSeal.tsx
export function WaxSeal() {
  return (
    <div className="wax-seal" role="img" aria-label="Rocky Mount seal, established 1770">
      <span className="seal-text">RM</span>
      <span className="seal-date">Est. 1770</span>
    </div>
  )
}
```

```css
.wax-seal {
  width: 100px;
  height: 100px;
  background: radial-gradient(
    circle at 35% 35%, 
    #B85A62, 
    #722F37 40%, 
    #5A2329 70%, 
    #4A1F24
  );
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.5),
    inset 0 2px 4px rgba(255, 255, 255, 0.15),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2);
  border: 3px solid rgba(201, 162, 39, 0.4);
  flex-shrink: 0;
}

.seal-text {
  font-family: 'Cinzel', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #4A1F24;
  text-shadow: 
    1px 1px 0 rgba(255, 255, 255, 0.1),
    -1px -1px 0 rgba(0, 0, 0, 0.2);
  line-height: 1;
}

.seal-date {
  font-family: 'Cinzel', serif;
  font-size: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #4A1F24;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1);
  margin-top: 2px;
  text-transform: uppercase;
}

@media (min-width: 640px) {
  .wax-seal {
    width: 120px;
    height: 120px;
  }
  
  .seal-text {
    font-size: 2.2rem;
  }
  
  .seal-date {
    font-size: 0.55rem;
  }
}
```

### 2. Commemorative Badges

```jsx
<div className="welcome-header">
  <span className="welcome-badge">AMERICA 250</span>
  <WaxSeal />
  <span className="welcome-badge">TENNESSEE 230</span>
</div>
```

```css
.welcome-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 480px) {
  .welcome-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .welcome-badge:first-child { order: 1; }
  .wax-seal { order: 0; }
  .welcome-badge:last-child { order: 2; }
}
```

### 3. Enter Site Button

```jsx
<Link 
  href="/home" 
  className="enter-button"
  aria-label="Enter Rocky Mount State Historic Site"
>
  <span className="button-ornament" aria-hidden="true">✦</span>
  ENTER SITE
  <span className="button-ornament" aria-hidden="true">✦</span>
</Link>
```

```css
.enter-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  background: transparent;
  border: 2px solid var(--gold);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
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
  font-size: 0.7rem;
  opacity: 0.7;
}
```

### 4. Decorative Divider

```jsx
<div className="divider" role="separator" aria-hidden="true">
  <span className="divider-ornament">✦</span>
</div>
```

```css
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2.5rem 0;
  width: 100%;
}

.divider::before,
.divider::after {
  content: "";
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-muted), transparent);
}

.divider-ornament {
  color: var(--gold-muted);
  font-size: 0.8rem;
}
```

### 5. Feature Cards

```jsx
<div className="cards-container">
  {/* Almanac Card - Active */}
  <Link 
    href="/almanac" 
    className="feature-card"
    aria-label="Open The 1775 Almanac - Weather and Wisdom for Sullivan County"
  >
    <h3 className="card-title">THE 1775 ALMANAC</h3>
    <p className="card-description">Weather & Wisdom</p>
    <p className="card-description">Sullivan County</p>
    <span className="card-cta" aria-hidden="true">Open →</span>
  </Link>
  
  {/* Pantry Card - Disabled */}
  <div 
    className="feature-card feature-card--disabled"
    aria-label="Rocky Mount Pantry - Coming Soon"
  >
    <h3 className="card-title">ROCKY MOUNT PANTRY</h3>
    <p className="card-description">Heritage Foods</p>
    <p className="card-coming-soon">Coming Soon</p>
  </div>
</div>
```

```css
.cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 540px) {
  .cards-container {
    grid-template-columns: 1fr;
    max-width: 280px;
  }
}

.feature-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: 1.5rem;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.feature-card:hover:not(.feature-card--disabled) {
  border-color: var(--card-hover-border);
  background: rgba(255, 255, 255, 0.05);
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
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
}

.card-description {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0.25rem 0;
}

.card-cta {
  display: inline-block;
  margin-top: 1rem;
  font-family: 'Cinzel', serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: var(--gold);
}

.card-coming-soon {
  margin-top: 1rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--text-muted);
}
```

### 6. Live Weather Footer (with Loading State)

```tsx
// /components/welcome/WeatherFooter.tsx
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
  
  // Loading state
  if (loading) {
    return (
      <div className="weather-footer weather-footer--loading" aria-live="polite">
        <span className="weather-text">Loading conditions...</span>
      </div>
    )
  }
  
  // Error state - hide gracefully
  if (error || !weather) {
    return null
  }
  
  const condition = getConditionText(weather.code)
  const icon = getWeatherIcon(weather.code)
  
  return (
    <div className="weather-footer" aria-label={`Current weather: ${weather.temp}°F, ${condition}`}>
      <span className="weather-icon" aria-hidden="true">{icon}</span>
      <span className="weather-text">
        Sullivan County • {weather.temp}°F • {condition}
      </span>
      <span className="weather-hilo">
        H: {weather.high}° / L: {weather.low}°
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

```css
.weather-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem;
  min-height: 80px; /* Prevent layout shift */
}

.weather-footer--loading {
  opacity: 0.6;
  justify-content: center;
}

.weather-icon {
  font-size: 1.25rem;
}

.weather-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.weather-hilo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.8rem;
  color: var(--text-muted);
  opacity: 0.7;
}
```

---

## Full Welcome Page Component

### File: `/app/(welcome)/page.tsx`

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
        
        <Link 
          href="/home" 
          className="enter-button"
          aria-label="Enter Rocky Mount State Historic Site"
        >
          <span className="button-ornament" aria-hidden="true">✦</span>
          ENTER SITE
          <span className="button-ornament" aria-hidden="true">✦</span>
        </Link>
        
        <div className="divider" role="separator" aria-hidden="true">
          <span className="divider-ornament">✦</span>
        </div>
        
        <div className="cards-container">
          <Link 
            href="/almanac" 
            className="feature-card"
            aria-label="Open The 1775 Almanac"
          >
            <h3 className="card-title">THE 1775 ALMANAC</h3>
            <p className="card-description">Weather & Wisdom</p>
            <p className="card-description">Sullivan County</p>
            <span className="card-cta" aria-hidden="true">Open →</span>
          </Link>
          
          <div 
            className="feature-card feature-card--disabled"
            aria-label="Rocky Mount Pantry - Coming Soon"
          >
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

## Implementation Checklist

### Architecture Changes
- [ ] Modify `/app/layout.tsx` — remove Navigation, Footer, MobileStickyCTA
- [ ] Create `/app/(welcome)/layout.tsx` — minimal wrapper
- [ ] Create `/app/(main)/layout.tsx` — with Navigation, Footer, MobileStickyCTA
- [ ] Move all existing routes into `/(main)/`

### Welcome Screen
- [ ] Create `/components/welcome/WaxSeal.tsx`
- [ ] Create `/components/welcome/WeatherFooter.tsx`
- [ ] Create `/app/(welcome)/welcome.css`
- [ ] Create `/app/(welcome)/page.tsx`

### Homepage
- [ ] Move current homepage to `/app/(main)/home/page.tsx`
- [ ] Update any internal links from `/` to `/home`

### Testing
- [ ] `npm run build` passes
- [ ] `/` shows Welcome Screen (NO nav/footer)
- [ ] `/home` shows homepage (WITH nav/footer)
- [ ] `/almanac` still works (WITH nav/footer)
- [ ] All other routes work
- [ ] Mobile responsive
- [ ] Weather loading state works
- [ ] Keyboard navigation works

---

## Success Criteria

1. ✅ Welcome screen at `/` — NO navigation or footer
2. ✅ All other pages have navigation and footer
3. ✅ Wax seal shows "RM" + "Est. 1770"
4. ✅ "ENTER SITE" → `/home`
5. ✅ Almanac card → `/almanac`
6. ✅ Pantry shows "Heritage Foods" + "Coming Soon"
7. ✅ Weather loads with loading state
8. ✅ Mobile responsive
9. ✅ Accessible
10. ✅ Build passes

---

## Notes

### Coordinates
- Rocky Mount: `36.4539, -82.3109` (200 Hyder Hill Road, Piney Flats, TN 37686)

### Historical Dates
- "Est. 1770" = Rocky Mount site settlement
- "1775" = Oldest documented farm (Century Farms)

### Accessibility
- All interactive elements have `:focus-visible` states
- Decorative elements marked with `aria-hidden="true"`
- Semantic HTML structure
- `role="separator"` on dividers
