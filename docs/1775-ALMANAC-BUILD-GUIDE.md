# The 1775 Almanac — Complete Build Guide

> **Version:** 2.1 (Final Spec — Pantry Removed, Copy Improved)  
> **Target:** Rebrand + Customer Experience Enhancements  
> **Effort Estimate:** 2.5–3 hours  
> **Last Updated:** January 26, 2026

---

## ⚠️ CRITICAL DIRECTIVE

**REBRAND, NOT REDUCE.**

This is a visual and branding update ONLY. **Every feature from the existing app must be preserved.** Do not remove any functionality. If a component exists, it stays — just reskinned to fit the 1775 Almanac brand.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Brand & Positioning](#brand--positioning)
3. [Component Inventory & Rebrand Map](#component-inventory--rebrand-map)
4. [Technical Architecture](#technical-architecture)
5. [Implementation Checklist](#implementation-checklist)
6. [File-by-File Changes](#file-by-file-changes)
7. [New Components](#new-components)
8. [Marketing Copy](#marketing-copy)
9. [Testing Checklist](#testing-checklist)
10. [Launch Checklist](#launch-checklist)
11. [Customer Experience Enhancements](#customer-experience-enhancements-launch-features)
12. [Future Roadmap](#future-roadmap-v11)

---

## Executive Summary

### What We're Building

Rebrand the existing Rocky Mount Almanac as **"The 1775 Almanac"** — a weather and agricultural intelligence tool for Sullivan County, Tennessee, anchored in the authority of Tennessee's oldest documented farm (est. 1775).

### Why

- Establish Rocky Mount and Sullivan County as THE agricultural heritage authority
- Create a daily-use digital tool that drives awareness beyond event-based visitation
- Position for potential statewide expansion (architecture ready, marketing not promised)

### Core Philosophy: "The Statesman-Farmer"

This is not a weather app. This is an **intelligence briefing** — practical utility delivered with the gravitas of 250 years of Tennessee farming wisdom. The tone is: *Modern Intelligence, Ancestral Wisdom.*

### What Changes

| Change | Type | Effort |
|--------|------|--------|
| Add "The 1775 Almanac" masthead/header | Branding | Low |
| Add "Est. 1775" badge | Branding | Low |
| Update page title and metadata | Branding | Low |
| Update footer with Rocky Mount attribution | Branding | Low |
| Update FrontierSaying to dual-line proverb format | Branding | Medium |
| Rebrand NativePulse → "The Seedkeeper's Watch" | Branding | Low |
| Add AboutModal component with origin story | New Component | Medium |
| Update sayings.ts with 1775/2026 dual-line format | Content | Medium |

### What Stays the Same (ALL FUNCTIONALITY PRESERVED)

- ✅ **LocationPicker** — Users can still change location (defaults to Sullivan County)
- ✅ **NativePulse** — Rebranded as "The Seedkeeper's Watch"
- ✅ All weather data and API integrations
- ✅ All workability scores (Sower's, Outdoor Alert, Keeper's, Builder's)
- ✅ Soil temperature with planting suggestions
- ✅ Moon phase with planting guidance
- ✅ Precipitation radar with animation
- ✅ Current conditions card
- ✅ Snow conditions display
- ✅ Sun/barometer card
- ✅ Weather alert banner
- ✅ 24-hour forecast
- ✅ 7-day forecast
- ✅ Dark "midnight" color palette
- ✅ Mobile responsiveness

---

## Brand & Positioning

### Brand Name

**The 1775 Almanac**

### Tagline Options

- "Modern Intelligence, Ancestral Wisdom"
- "Weather & Wisdom from Tennessee's Oldest Farm"
- "Sullivan County Weather, Est. 1775"

### The 1775 Claim (Verified Facts)

The 15-acre parcel acquired by Rocky Mount Historical Association in 2021 is part of **Tennessee's oldest documented farm**, established in 1775 per the Tennessee Century Farms program. The Massengill family has held this land continuously since before the Declaration of Independence.

**Key talking points:**
- One year before the Declaration of Independence
- Part of the Massengill Century Farm (Tennessee Century Farms program)
- Now cared for by Rocky Mount Historical Association (separate from THC-owned historic site)
- Adjacent to Rocky Mount State Historic Site — first Southwest Territory capital (1790–1792)

**What NOT to claim:**
- NOT the first US territorial capital (that's Marietta, OH, 1788)
- NOT Tennessee's first state capital (that's Knoxville)
- The main Rocky Mount building dates to the 1820s, not 1770s
- The 15 acres is NOT "part of" Rocky Mount State Historic Site — it's separately owned by the Association

### Brand Voice: The Statesman-Farmer

| Attribute | Description |
|-----------|-------------|
| **Tone** | Authoritative, warm, grounded |
| **Persona** | A stoic mentor, not a folksy grandfather |
| **Language** | Direct, rhythmic, respectful of the user's time |
| **Feeling** | Executive briefing meets frontier wisdom |

### Visual Identity

| Element | Specification |
|---------|---------------|
| **Primary Color** | Midnight (`#0A1128`) |
| **Accent Color** | Gold Leaf (`#C5A059`) |
| **Text Color** | Parchment (`#F4ECD8`) |
| **Typography** | Serif for titles (`font-serif`), sans for data |
| **Badge** | "Est. 1775" in gold, small caps |

---

## Component Inventory & Rebrand Map

**IMPORTANT: All components are KEPT. This table shows what gets rebranded.**

| Component | Current Name | New Name / Treatment | Action |
|-----------|--------------|---------------------|--------|
| `AlmanacHero.tsx` | (temperature display) | Add "Est. 1775" context | MODIFY |
| `FrontierSaying.tsx` | "Frontier Saying" | "The Daily Proverb" (dual-line 1775/2026) | MODIFY |
| `TaskScores.tsx` | "Today's Workability" | "Today's Workability" (keep as-is) | NO CHANGE |
| `LocationPicker.tsx` | Location picker | **KEEP** — users can change location | NO CHANGE |
| `NativePulse.tsx` | "NativePulse" | **"The Seedkeeper's Watch"** | MODIFY |
| `SoilTemperature.tsx` | "Soil Temperature" | Keep as-is | NO CHANGE |
| `MoonPhase.tsx` | Moon phase display | Keep as-is | NO CHANGE |
| `PrecipitationRadar.tsx` | "Regional Radar" | Keep as-is | NO CHANGE |
| `CurrentConditionsCard.tsx` | "Current Conditions" | Keep as-is | NO CHANGE |
| `SnowConditions.tsx` | Snow depth display | Keep as-is | NO CHANGE |
| `SunBarometer.tsx` | Sun/barometer card | Keep as-is | NO CHANGE |
| `WeatherAlertBanner.tsx` | Alert banners | Keep as-is | NO CHANGE |
| `WeatherDetails.tsx` | Hourly/daily forecasts | Keep as-is | NO CHANGE |
| `ScoreExplainer.tsx` | Score info modals | Keep as-is | NO CHANGE |
| **NEW** `AboutModal.tsx` | — | Origin story modal | CREATE |

---

## Technical Architecture

### Project Structure

```
tennessee-starts-here/
├── app/
│   └── almanac/
│       ├── page.tsx          # Main almanac page (MODIFY)
│       ├── layout.tsx        # Metadata (MODIFY)
│       └── almanac.css       # Styles (NO CHANGE)
├── components/
│   └── almanac/
│       ├── AlmanacHero.tsx        # (NO CHANGE or minor)
│       ├── FrontierSaying.tsx     # (MODIFY - dual-line format)
│       ├── LocationPicker.tsx     # (KEEP - no changes)
│       ├── NativePulse.tsx        # (MODIFY - rebrand to Seedkeeper's Watch)
│       ├── AboutModal.tsx         # (NEW - create this)
│       └── ... (other components unchanged)
├── lib/
│   └── almanac/
│       ├── sayings.ts        # (MODIFY - add 1775/2026 sayings)
│       ├── taskScores.ts     # (NO CHANGE)
│       ├── geocoding.ts      # (NO CHANGE - keep DEFAULT_LOCATION)
│       └── ... (other utils unchanged)
└── docs/
    └── 1775-ALMANAC-BUILD-GUIDE.md  # This file
```

### Default Location

The existing `DEFAULT_LOCATION` in `lib/almanac/geocoding.ts` is already set correctly:

```typescript
export const DEFAULT_LOCATION: GeoLocation = {
  name: 'Sullivan County',
  latitude: 36.52,
  longitude: -82.26,
  admin1: 'Tennessee',
  country: 'United States',
  timezone: 'America/New_York',
}
```

**LocationPicker stays enabled.** Users who want to check weather for Bristol, Kingsport, Johnson City, or anywhere else can do so. We just don't *market* it as a 95-county tool — the default is Sullivan County, and that's where the brand authority lives.

---

## Implementation Checklist

### Phase 1: Header & Metadata (30 minutes)

- [ ] Update `app/almanac/layout.tsx` metadata (title, description, OG tags)
- [ ] Add "The 1775 Almanac" masthead to `app/almanac/page.tsx`
- [ ] Add "Est. 1775" badge next to title
- [ ] Add "Our Story" link that triggers AboutModal
- [ ] Keep LocationPicker in place (no changes needed)

### Phase 2: Component Rebrands (1–2 hours)

- [ ] Update `FrontierSaying.tsx` to support dual-line proverb format
- [ ] Update `NativePulse.tsx` to display as "The Seedkeeper's Watch"
- [ ] Update footer in `app/almanac/page.tsx` with new copy

### Phase 3: Content Updates (1–2 hours)

- [ ] Update `lib/almanac/sayings.ts` with new dual-line sayings
- [ ] Create `AboutModal.tsx` component
- [ ] Write About modal content (origin story)

### Phase 4: Testing & Polish (1 hour)

- [ ] Test on mobile (iPhone, Android)
- [ ] Test on desktop (Chrome, Safari, Firefox)
- [ ] Verify ALL features still work:
  - [ ] LocationPicker opens and searches work
  - [ ] NativePulse / Seedkeeper's Watch displays
  - [ ] All four workability scores display
  - [ ] Soil temperature displays
  - [ ] Moon phase displays
  - [ ] Radar loads and animates
  - [ ] Weather alerts appear when warranted
  - [ ] 24-hour forecast scrolls
  - [ ] 7-day forecast displays
- [ ] Test About modal open/close
- [ ] Accessibility check (keyboard nav, screen reader)

---

## File-by-File Changes

### 1. `app/almanac/layout.tsx`

**Purpose:** Update metadata for "The 1775 Almanac" branding.

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The 1775 Almanac | Sullivan County Weather & Wisdom',
  description: 'Weather and agricultural intelligence for Sullivan County, Tennessee. Workability scores, soil temps, frost alerts, moon phases, and native seed tracking — from Tennessee\'s oldest documented farm, est. 1775.',
  keywords: [
    'weather',
    'Sullivan County',
    'Tennessee',
    'almanac',
    '1775',
    'Rocky Mount',
    'farming',
    'gardening',
    'planting calendar',
    'frost dates',
    'soil temperature',
    'native plants',
    'seed starting',
  ],
  authors: [{ name: 'Rocky Mount State Historic Site' }],
  openGraph: {
    title: 'The 1775 Almanac',
    description: 'Sullivan County weather & wisdom from Tennessee\'s oldest documented farm. Free workability scores, soil temps, and planting guidance.',
    type: 'website',
    siteName: 'The 1775 Almanac',
    locale: 'en_US',
    images: [
      {
        url: '/og-1775-almanac.png',
        width: 1200,
        height: 630,
        alt: 'The 1775 Almanac - Sullivan County Weather & Wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The 1775 Almanac',
    description: 'Sullivan County weather from Tennessee\'s oldest farm. Est. 1775.',
    images: ['/og-1775-almanac.png'],
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': '1775 Almanac',
  },
}

export default function AlmanacLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
```

---

### 2. `app/almanac/page.tsx`

**Purpose:** Add masthead header, add AboutModal, update footer. **KEEP all existing functionality.**

**Changes required:**

1. **Add new import:**
```typescript
import AboutModal from '@/components/almanac/AboutModal'
```

2. **Add masthead ABOVE the LocationPicker:**

Find this section:
```tsx
{/* Location Picker */}
<div className="flex justify-center mb-4">
  <LocationPicker location={location} onLocationChange={handleLocationChange} />
</div>
```

**ADD this masthead BEFORE it:**
```tsx
{/* Masthead */}
<header className="text-center mb-6">
  <div className="flex items-center justify-center gap-2 mb-2">
    <h1 className="font-serif text-2xl md:text-3xl text-almanac-gold tracking-wide">
      The 1775 Almanac
    </h1>
    <span className="text-xs text-almanac-gold/70 border border-almanac-gold/30 px-2 py-0.5 rounded-sm font-medium tracking-widest uppercase">
      Est. 1775
    </span>
  </div>
  <AboutModal />
</header>

{/* Location Picker - KEEP THIS */}
<div className="flex justify-center mb-4">
  <LocationPicker location={location} onLocationChange={handleLocationChange} />
</div>
```

3. **Update footer:**

Replace the existing footer with:
```tsx
<motion.footer
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.5 }}
  className="text-center py-8 border-t border-white/5 mt-8"
>
  <p className="text-sm text-almanac-gold font-serif">
    From Tennessee's oldest documented farm
  </p>
  <p className="text-xs text-almanac-parchment/50 mt-2">
    Powered by Rocky Mount State Historic Site
  </p>
  <p className="text-xs text-almanac-parchment/40 mt-1">
    Piney Flats, Tennessee
  </p>
  
  <div className="mt-6 pt-4 border-t border-white/5">
    <p className="text-xs text-almanac-parchment/30">
      Weather data via Open-Meteo • Guidance based on NWS and OSHA resources
    </p>
    {lastUpdated && (
      <p className="text-xs text-almanac-parchment/20 mt-2">
        Last updated: {lastUpdated.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        })}
      </p>
    )}
    <p className="text-xs text-almanac-parchment/20 mt-4 max-w-md mx-auto leading-relaxed">
      This almanac is a work in progress — built for information and entertainment, 
      not life-or-death decisions. Always consult official sources for severe weather. 
      The old-timers had instincts; you've got the National Weather Service.
    </p>
  </div>
</motion.footer>
```

**⚠️ DO NOT remove any existing components from the page. All JSX stays.**

---

### 3. `components/almanac/NativePulse.tsx`

**Purpose:** Rebrand from "NativePulse" to "The Seedkeeper's Watch" with heritage framing.

**Replace the component content:**

```tsx
'use client'

import { motion } from 'framer-motion'
import type { NativePulseResult } from '@/lib/almanac/taskScores'

interface NativePulseProps {
  pulse: NativePulseResult
}

export default function NativePulse({ pulse }: NativePulseProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl" role="img" aria-label={pulse.status}>
          {pulse.icon}
        </span>
        <div>
          <h2 className="font-serif text-xl text-almanac-gold">The Seedkeeper's Watch</h2>
          <p className="text-sm text-almanac-parchment/60">Native Seed Stratification</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className={`text-lg font-medium ${pulse.color}`}>
            {pulse.status}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-almanac-midnight rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pulse.progress}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            className="absolute h-full bg-gradient-to-r from-almanac-gold/60 to-almanac-gold rounded-full"
          />
        </div>

        {/* Tip */}
        <p className="text-almanac-parchment/80 text-sm leading-relaxed">
          {pulse.tip}
        </p>

        {/* Heritage Context */}
        <div className="pt-3 border-t border-almanac-gold/10">
          <p className="text-xs text-almanac-parchment/50">
            Tracking Tennessee native plant cycles — the same species settlers relied on 
            for food, medicine, and trade since 1775.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
```

---

### 4. `components/almanac/FrontierSaying.tsx`

**Purpose:** Update to support the dual-line "1775 / 2026" proverb format while maintaining backward compatibility.

**Replace entire file:**

```tsx
'use client'

interface FrontierSayingProps {
  saying: string
  modernLine?: string
}

export function FrontierSaying({ saying, modernLine }: FrontierSayingProps) {
  // If no modern line provided, display as single saying (backward compatible)
  if (!modernLine) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-sm p-6 max-w-xl mx-auto">
        <p className="font-serif italic text-xl text-almanac-parchment/90 leading-relaxed text-center">
          "{saying}"
        </p>
      </div>
    )
  }

  // Dual-line format: 1775 wisdom + 2026 application
  return (
    <div className="bg-white/5 border border-white/10 rounded-sm p-6 max-w-xl mx-auto">
      <p className="text-xs text-almanac-gold/50 text-center mb-3 font-medium tracking-widest uppercase">
        The Daily Proverb
      </p>
      <div className="space-y-3">
        {/* 1775 Line */}
        <div className="flex items-start gap-3">
          <span className="text-xs text-almanac-gold/60 font-medium tracking-wide mt-1 shrink-0">
            1775
          </span>
          <p className="font-serif italic text-lg text-almanac-parchment/90 leading-relaxed">
            {saying}
          </p>
        </div>
        
        {/* 2026 Line */}
        <div className="flex items-start gap-3">
          <span className="text-xs text-almanac-gold/60 font-medium tracking-wide mt-1 shrink-0">
            2026
          </span>
          <p className="font-serif italic text-lg text-almanac-parchment/70 leading-relaxed">
            {modernLine}
          </p>
        </div>
      </div>
    </div>
  )
}
```

---

### 5. `lib/almanac/sayings.ts`

**Purpose:** Add dual-line sayings that pair 1775 frontier wisdom with 2026 modern application.

**ADD this new type and data structure AFTER the existing `FRONTIER_SAYINGS` (do not remove the existing sayings):**

```typescript
// ============================================
// DUAL-LINE SAYINGS (1775 / 2026 format)
// ============================================

export interface DualSaying {
  frontier: string  // 1775 line
  modern: string    // 2026 line
}

export const DUAL_SAYINGS: Record<SayingCategory, DualSaying[]> = {
  clear_day: [
    {
      frontier: "Sky is blue as a whetstone. A fair day for open-air labor.",
      modern: "Perfect conditions. Get outside and get it done."
    },
    {
      frontier: "High pressure is holding firm. Make hay while the sun shines.",
      modern: "The weather's cooperating. Knock out the big stuff."
    },
    {
      frontier: "Not a cloud to trouble the eye. The kind of day worth remembering.",
      modern: "Lock it in—this is a get-ahead day."
    },
  ],

  clear_night: [
    {
      frontier: "Stars are sharp tonight. Frost may kiss the meadows by dawn.",
      modern: "Clear and cold. Cover the tender plants before bed."
    },
    {
      frontier: "Moon is bright—a good night to finish the late chores.",
      modern: "You can see well enough. Wrap up what's left."
    },
  ],

  partly_cloudy: [
    {
      frontier: "Fair skies with a few travelers. Should hold for the work ahead.",
      modern: "Clouds are passing through. Stay on task."
    },
    {
      frontier: "The sun plays hide-and-seek. Conditions remain favorable.",
      modern: "Keep working, but keep watching."
    },
  ],

  overcast: [
    {
      frontier: "Gray skies pressing low. The rain may hold, but don't wager on it.",
      modern: "Could go either way. Have a backup plan."
    },
    {
      frontier: "Clouds have drawn the curtain. A day for steady, covered work.",
      modern: "Good day for the garage, the barn, or the desk."
    },
  ],

  fog: [
    {
      frontier: "Fog thick as wool in the hollows. Travel slow this morning.",
      modern: "Headlights on. Take it slow."
    },
    {
      frontier: "Morning fog means the day will warm. Patience.",
      modern: "Give it an hour. The sun's coming."
    },
  ],

  light_rain: [
    {
      frontier: "A light soaking coming down. Good for the gardens, poor for the roads.",
      modern: "The plants are happy. Your commute won't be."
    },
    {
      frontier: "Steady drizzle settling in. Keep to the covered work.",
      modern: "Not worth getting soaked. Work under a roof."
    },
  ],

  heavy_rain: [
    {
      frontier: "A gully-washer is upon us. Stay clear of the low fords.",
      modern: "Turn around, don't drown."
    },
    {
      frontier: "Rain coming down in sheets. This is a day for the hearth.",
      modern: "Stay home if you can. It's not letting up."
    },
  ],

  thunderstorm: [
    {
      frontier: "Thunder rolling through the mountains. Seek solid shelter.",
      modern: "When thunder roars, go indoors."
    },
    {
      frontier: "Storm clouds stacking in the west. The lightning will follow.",
      modern: "It's coming. Wrap up outdoor work now."
    },
  ],

  light_snow: [
    {
      frontier: "Snow falling light as cotton. Pretty to watch, easy to manage.",
      modern: "A dusting. Drive careful, but don't panic."
    },
    {
      frontier: "First flakes of the season. The ground isn't ready to hold it.",
      modern: "It'll melt. Enjoy it while it lasts."
    },
  ],

  heavy_snow: [
    {
      frontier: "Snow is piling fast. Check the roof load and stay close.",
      modern: "This is accumulating. Clear the walks before it sets."
    },
    {
      frontier: "A proper snowstorm settling in. Hunker down.",
      modern: "Work from home if you can. The roads won't improve."
    },
  ],

  freezing: [
    {
      frontier: "Bitter cold has arrived. Keep the hearth stoked through the night.",
      modern: "Set your thermostat. Check on elderly neighbors."
    },
    {
      frontier: "Cold enough to crack stone. Limit your time outside.",
      modern: "Frostbite weather. Minimize exposure."
    },
    {
      frontier: "The kind of cold that finds every gap. Seal up tight.",
      modern: "Insulate, insulate, insulate. Your pipes will thank you."
    },
  ],

  hot: [
    {
      frontier: "Heat is bearing down heavy. Work the early hours, rest at noon.",
      modern: "Start at sunrise, stop by 10. It's not worth the risk."
    },
    {
      frontier: "Too hot for man or beast to labor. Wait for the evening cool.",
      modern: "It's unsafe out there. Quit early or don't start."
    },
  ],

  windy: [
    {
      frontier: "Wind is kicking up something fierce. Secure anything loose.",
      modern: "Tie it down or lose it."
    },
    {
      frontier: "Strong gusts across the ridges. No day for ladder work.",
      modern: "Skip the roof work. Not worth the fall risk."
    },
  ],
}

/**
 * Get a dual-line saying (1775 + 2026) based on conditions
 */
export function getDualSaying(
  weatherCode: number,
  temperature: number,
  windSpeed: number,
  isDay: boolean
): DualSaying {
  const category = getCategoryFromConditions(weatherCode, temperature, windSpeed, isDay)
  const sayings = DUAL_SAYINGS[category]
  
  // Use same deterministic selection as single sayings
  const date = new Date()
  const dayOfYear = getDayOfYear(date)
  const categoryIndex = Object.keys(DUAL_SAYINGS).indexOf(category)
  const seed = dayOfYear * 100 + categoryIndex
  const index = Math.floor(seededRandom(seed) * sayings.length)
  
  return sayings[index]
}
```

---

### 6. `app/almanac/page.tsx` — Update Saying Logic

**Update the fetchWeather function to use dual sayings:**

**Add import at top:**
```typescript
import { getDualSaying } from '@/lib/almanac/sayings'
import type { DualSaying } from '@/lib/almanac/sayings'
```

**Update state (change the type):**
```typescript
// CHANGE FROM:
// const [saying, setSaying] = useState<string>('')
// TO:
const [saying, setSaying] = useState<DualSaying | null>(null)
```

**In fetchWeather, replace the getSaying call:**
```typescript
// CHANGE FROM:
// const frontierSaying = getSaying(...)
// setSaying(frontierSaying)

// TO:
const daylight = isDay(new Date(), loc.latitude, loc.longitude)
const dualSaying = getDualSaying(
  weatherData.current.weatherCode,
  weatherData.current.temperature,
  weatherData.current.windSpeed,
  daylight
)
setSaying(dualSaying)
```

**Update the FrontierSaying JSX:**
```tsx
{/* CHANGE FROM: */}
{/* <FrontierSaying saying={saying} /> */}

{/* TO: */}
{saying && (
  <FrontierSaying 
    saying={saying.frontier} 
    modernLine={saying.modern} 
  />
)}
```

---

## New Components

### `components/almanac/AboutModal.tsx`

**Purpose:** Display the 1775 origin story when user clicks "Our Story".

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X } from 'lucide-react'

export default function AboutModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs text-almanac-parchment/50 hover:text-almanac-gold transition-colors mt-2"
      >
        <Info className="w-3 h-3" />
        <span>Our Story</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full bg-almanac-midnight border border-almanac-gold/30 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-4 border-b border-almanac-gold/20">
                <div>
                  <h2 className="font-serif text-xl text-almanac-gold">The 1775 Almanac</h2>
                  <p className="text-sm text-almanac-parchment/60">Our Story</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-almanac-parchment/40 hover:text-almanac-parchment transition-colors p-1"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4">
                <section>
                  <h3 className="text-sm font-semibold text-almanac-gold mb-2">
                    Before Tennessee Was Tennessee
                  </h3>
                  <p className="text-sm text-almanac-parchment/80 leading-relaxed">
                    In 1775—one year before the Declaration of Independence—the Massengill 
                    family began working ground in what would become Sullivan County. 
                    No Tennessee yet—just soil, seasons, and the knowledge to read both.
                  </p>
                </section>

                <section>
                  <p className="text-sm text-almanac-parchment/80 leading-relaxed">
                    That farm is still here. Part of it is now cared for by <strong className="text-almanac-gold">Rocky Mount 
                    State Historic Site</strong>—where Tennessee's territorial government operated 
                    from 1790 to 1792. Tennessee's oldest documented farm. The first capital 
                    of what became the sixteenth state.
                  </p>
                </section>

                <section>
                  <h3 className="text-sm font-semibold text-almanac-gold mb-2">
                    Modern Tools, Ancestral Wisdom
                  </h3>
                  <p className="text-sm text-almanac-parchment/80 leading-relaxed">
                    The 1775 Almanac isn't a history lesson. It's a daily briefing.
                  </p>
                  <p className="text-sm text-almanac-parchment/80 leading-relaxed mt-2">
                    We pull real-time weather data, soil temperatures, frost probabilities, 
                    and lunar cycles. We translate that data into actionable guidance: when 
                    to plant, when to harvest, when to stay inside.
                  </p>
                  <p className="text-sm text-almanac-parchment/80 leading-relaxed mt-2">
                    But we do it through a lens that's been focused for two and a half centuries. 
                    The same ground that taught the Massengills how to survive a frontier winter 
                    is now teaching you when to protect your pipes.
                  </p>
                </section>

                <section>
                  <h3 className="text-sm font-semibold text-almanac-gold mb-2">
                    What You'll Find Here
                  </h3>
                  <ul className="text-sm text-almanac-parchment/70 space-y-1">
                    <li>• <strong>Workability Scores</strong> — Know if today's good for planting, outdoor work, or staying in</li>
                    <li>• <strong>Soil Temperature</strong> — Real-time data for planting decisions</li>
                    <li>• <strong>The Seedkeeper's Watch</strong> — Native seed stratification tracking</li>
                    <li>• <strong>Moon Phases</strong> — Traditional planting guidance by the moon</li>
                    <li>• <strong>The Daily Proverb</strong> — Frontier wisdom meets modern life</li>
                    <li>• <strong>Forecasts & Radar</strong> — Hourly, daily, and 7-day outlooks</li>
                  </ul>
                </section>

                <section className="pt-4 border-t border-almanac-gold/10">
                  <p className="text-xs text-almanac-parchment/50 leading-relaxed">
                    The 1775 Almanac is powered by Rocky Mount State Historic Site in Piney Flats, 
                    Tennessee—adjacent to Tennessee's oldest documented farm and the first capital of 
                    the Southwest Territory.
                  </p>
                  <a
                    href="https://rockymountmuseum.com/visit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-almanac-gold hover:text-almanac-gold/80 transition-colors"
                  >
                    Plan Your Visit →
                  </a>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
```

---

## Marketing Copy

### Social Media Launch Posts

**Post 1: Announcement**
```
Introducing The 1775 Almanac — weather, planting guidance, and workability 
intelligence for Sullivan County.

Built on Tennessee's oldest documented farm. Updated daily. Free.

🌾 rockymountmuseum.com/almanac
```

**Post 2: Heritage Angle**
```
In 1775, the Massengill family started farming this ground — one year before 
the Declaration of Independence.

250 years later, we're still learning from it.

The 1775 Almanac: Sullivan County's weather & growing intelligence from 
Tennessee's oldest farm.

🌾 rockymountmuseum.com/almanac
```

**Post 3: Utility Angle**
```
Soil temps. Frost alerts. Moon phases. Workability scores. Native seed tracking.

The 1775 Almanac — built for Sullivan County residents who actually 
work outside.

Free at Rocky Mount.

🌾 rockymountmuseum.com/almanac
```

---

### Commissioner Talking Points

> "We've built a free digital almanac for Sullivan County — weather, planting 
> calendars, workability indices, native seed tracking — powered by Rocky Mount 
> and our 1775 heritage.
>
> It's live now for Sullivan County residents at no cost. It positions Rocky Mount 
> as a daily resource, not just an occasional destination. And it reinforces 
> Sullivan County as the place where Tennessee's agricultural story began."

---

### Press Release Headline

**FOR IMMEDIATE RELEASE**

**Rocky Mount State Historic Site Launches "The 1775 Almanac" — Free Weather 
& Agricultural Intelligence for Sullivan County**

*Digital tool brings 250 years of farming wisdom to modern Tennessee residents*

---

## Testing Checklist

### Functional Tests — ALL FEATURES MUST WORK

- [ ] Page loads without errors
- [ ] Weather data fetches and displays
- [ ] **LocationPicker opens and location search works**
- [ ] **NativePulse / "Seedkeeper's Watch" displays with progress bar**
- [ ] All four workability scores display with correct colors
- [ ] Soil temperature displays with planting suggestions
- [ ] Moon phase displays with emoji and guidance
- [ ] Radar loads and animates
- [ ] Current conditions card displays
- [ ] Snow conditions display (when applicable)
- [ ] Sun/barometer card displays
- [ ] 24-hour forecast scrolls horizontally
- [ ] 7-day forecast displays correctly
- [ ] Weather alerts appear when conditions warrant
- [ ] About modal opens and closes
- [ ] About modal scrolls on mobile
- [ ] Footer displays correctly

### Visual Tests

- [ ] "The 1775 Almanac" header displays centered
- [ ] "Est. 1775" badge displays next to title
- [ ] "Our Story" link is visible and works
- [ ] LocationPicker button is visible below header
- [ ] Dual-line proverb (1775/2026) displays correctly
- [ ] "The Seedkeeper's Watch" title displays on NativePulse
- [ ] Footer shows Rocky Mount attribution
- [ ] All text is readable (contrast check)
- [ ] No horizontal scroll on mobile
- [ ] Cards don't overflow on small screens

### Accessibility Tests

- [ ] Tab navigation works through all interactive elements
- [ ] About modal can be closed with Escape key
- [ ] LocationPicker modal can be closed with Escape key
- [ ] Screen reader announces page title correctly
- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA

### Browser Tests

- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)

---

## Launch Checklist

### Pre-Launch (Day Before)

- [ ] All code changes committed and pushed
- [ ] Staging/preview deployment tested
- [ ] OG image created (`/public/og-1775-almanac.png`)
- [ ] Social posts drafted and scheduled
- [ ] Staff briefed on new feature
- [ ] Board notified (if required)

### Launch Day

- [ ] Deploy to production
- [ ] Verify production site loads correctly
- [ ] Test on real mobile device
- [ ] Verify all features work (especially LocationPicker and NativePulse)
- [ ] Publish social posts
- [ ] Update Rocky Mount website navigation (if applicable)
- [ ] Monitor for errors (check console, Vercel logs)

### Post-Launch (Week 1)

- [ ] Monitor traffic (Vercel Analytics or similar)
- [ ] Collect user feedback
- [ ] Note any bugs or UX issues
- [ ] Plan v1.1 improvements

---

## Future Roadmap (v1.1)

These features are **NOT** part of the Sullivan County launch but are architected for future development:

### "The Briefing" Layout Restructure

Full implementation of Path C / Statesman-Farmer vision:
- Hero becomes structured "THE NUMBERS" + "THE BRIEFING" + "THE ACTION" format
- More executive/intelligence-briefing aesthetic
- Higher "joy factor" and screenshot-worthiness

### Multi-County Marketing

- Current architecture already supports any location via LocationPicker
- Future: Market as "statewide tool from Sullivan County"
- Add county selector dropdown with Sullivan County default

### Seedkeeper's Watch Expansion

- Add more native plant species
- Integrate with planting calendar
- Add native plant recommendations by season
- Connect to Rocky Mount's heritage seed program (if applicable)

---

## Customer Experience Enhancements (Launch Features)

These five enhancements ship with the 1775 rebrand. They're low-risk, use existing data, and require no new APIs.

### 1. Data Staleness Warning

**Purpose:** Prevent users from making decisions on old weather data.

**Behavior:**
- After 15 minutes since last fetch, show amber warning banner
- After 30 minutes, show more urgent warning
- Includes "Refresh Now" button that triggers re-fetch

**Component:** `components/almanac/StaleDataWarning.tsx`

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface StaleDataWarningProps {
  lastUpdated: Date | null
  onRefresh: () => void
  isLoading: boolean
}

export default function StaleDataWarning({ lastUpdated, onRefresh, isLoading }: StaleDataWarningProps) {
  const [minutesOld, setMinutesOld] = useState(0)

  useEffect(() => {
    if (!lastUpdated) return

    const updateAge = () => {
      const age = Math.floor((Date.now() - lastUpdated.getTime()) / 60000)
      setMinutesOld(age)
    }

    updateAge()
    const interval = setInterval(updateAge, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [lastUpdated])

  // Don't show if data is fresh (< 15 min)
  if (!lastUpdated || minutesOld < 15) return null

  const isUrgent = minutesOld >= 30

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg mb-4 ${
          isUrgent 
            ? 'bg-almanac-danger/20 border border-almanac-danger/30' 
            : 'bg-almanac-warning/20 border border-almanac-warning/30'
        }`}
      >
        <div className="flex items-center gap-2">
          <AlertCircle className={`w-4 h-4 ${isUrgent ? 'text-almanac-danger' : 'text-almanac-warning'}`} />
          <span className={`text-sm ${isUrgent ? 'text-almanac-danger' : 'text-almanac-warning'}`}>
            Data is {minutesOld} minutes old
          </span>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded transition-colors ${
            isUrgent
              ? 'bg-almanac-danger/30 text-almanac-parchment hover:bg-almanac-danger/40'
              : 'bg-almanac-warning/30 text-almanac-parchment hover:bg-almanac-warning/40'
          } disabled:opacity-50`}
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
```

**Integration in page.tsx:**
```tsx
import StaleDataWarning from '@/components/almanac/StaleDataWarning'

// In JSX, after LocationPicker:
<StaleDataWarning 
  lastUpdated={lastUpdated} 
  onRefresh={() => location && fetchWeather(location)} 
  isLoading={loading}
/>
```

---

### 2. First-Visit Onboarding Modal

**Purpose:** Help new users understand what the workability scores mean.

**Behavior:**
- Shows once on first visit (stored in localStorage)
- Dismissable with "Got it" button or clicking outside
- Explains the core value proposition in 5 seconds

**Component:** `components/almanac/OnboardingModal.tsx`

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sprout, HardHat, Thermometer, Moon } from 'lucide-react'

const STORAGE_KEY = 'almanac-onboarding-seen'

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeen = localStorage.getItem(STORAGE_KEY)
    if (!hasSeen) {
      // Small delay so page loads first
      const timer = setTimeout(() => setIsOpen(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/70 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full bg-almanac-midnight border border-almanac-gold/30 rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-almanac-parchment/40 hover:text-almanac-parchment transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="font-serif text-xl text-almanac-gold mb-2">
                  Welcome to The 1775 Almanac
                </h2>
                <p className="text-sm text-almanac-parchment/70">
                  Weather intelligence from Tennessee's oldest farm
                </p>
              </div>

              {/* Key insight */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-center text-almanac-parchment/90">
                  <strong className="text-almanac-gold">The scores tell you what to DO</strong>
                  <br />
                  <span className="text-sm">Not just what the weather is.</span>
                </p>
              </div>

              {/* Score preview */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-almanac-parchment/70">
                  <Sprout className="w-4 h-4 text-almanac-success" />
                  <span>Sower's Score — <em>When to plant</em></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-almanac-parchment/70">
                  <Thermometer className="w-4 h-4 text-almanac-warning" />
                  <span>Outdoor Alert — <em>When to protect yourself</em></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-almanac-parchment/70">
                  <Moon className="w-4 h-4 text-blue-400" />
                  <span>Keeper's Score — <em>Livestock & pets</em></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-almanac-parchment/70">
                  <HardHat className="w-4 h-4 text-orange-400" />
                  <span>Builder's Score — <em>Projects & repairs</em></span>
                </div>
              </div>

              <p className="text-xs text-center text-almanac-parchment/50 mb-6">
                Tap any score to see how it's calculated.
              </p>

              {/* CTA */}
              <button
                onClick={handleDismiss}
                className="w-full py-3 bg-almanac-gold text-almanac-midnight font-medium rounded-lg hover:bg-almanac-gold/90 transition-colors"
              >
                Got it — Show me the weather
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

**Integration in page.tsx:**
```tsx
import OnboardingModal from '@/components/almanac/OnboardingModal'

// At end of JSX, before closing </main>:
<OnboardingModal />
```

---

### 4. Share Button (Copy Text)

**Purpose:** Let users share today's proverb and conditions.

**Behavior:**
- Copies formatted text to clipboard
- Shows brief "Copied!" confirmation
- Non-intrusive placement below the proverb

**Component:** `components/almanac/ShareButton.tsx`

```tsx
'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'

interface ShareButtonProps {
  frontierLine: string
  modernLine?: string
  temperature: number
  location: string
}

export default function ShareButton({ frontierLine, modernLine, temperature, location }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    })
    
    const text = modernLine
      ? `📜 Today's Briefing from The 1775 Almanac\n${today} • ${location}\n\n1775: "${frontierLine}"\n2026: "${modernLine}"\n\n🌡️ Currently ${Math.round(temperature)}°F\n\n🔗 tennessee-starts-here.vercel.app/almanac`
      : `📜 Today's Briefing from The 1775 Almanac\n${today} • ${location}\n\n"${frontierLine}"\n\n🌡️ Currently ${Math.round(temperature)}°F\n\n🔗 tennessee-starts-here.vercel.app/almanac`

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-xs text-almanac-parchment/40 hover:text-almanac-gold transition-colors mt-3"
      aria-label="Share today's briefing"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5" />
          <span>Share today's briefing</span>
        </>
      )}
    </button>
  )
}
```

**Integration in FrontierSaying.tsx:**
```tsx
import ShareButton from '@/components/almanac/ShareButton'

// Add props for share functionality:
interface FrontierSayingProps {
  saying: string
  modernLine?: string
  temperature?: number
  location?: string
}

// At bottom of component, after the proverb:
{temperature !== undefined && location && (
  <div className="text-center">
    <ShareButton 
      frontierLine={saying} 
      modernLine={modernLine}
      temperature={temperature}
      location={location}
    />
  </div>
)}
```

---

### 5. Tomorrow Preview Card

**Purpose:** Help users plan tomorrow's work today.

**Behavior:**
- Shows tomorrow's high/low, precipitation chance
- Calculates and shows top workability score for tomorrow
- Compact, non-intrusive placement

**Component:** `components/almanac/TomorrowPreview.tsx`

```tsx
'use client'

import { motion } from 'framer-motion'
import { Calendar, Droplets, ThermometerSun, ThermometerSnowflake } from 'lucide-react'

interface TomorrowData {
  high: number
  low: number
  precipChance: number
  weatherCode: number
}

interface TomorrowPreviewProps {
  tomorrow: TomorrowData | null
}

function getWeatherEmoji(code: number): string {
  if ([0, 1].includes(code)) return '☀️'
  if ([2, 3].includes(code)) return '⛅'
  if ([45, 48].includes(code)) return '🌫️'
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌧️'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️'
  if ([95, 96, 99].includes(code)) return '⛈️'
  return '🌤️'
}

function getTomorrowOutlook(data: TomorrowData): { text: string; color: string } {
  if (data.precipChance > 60) {
    return { text: 'Rain likely — plan indoor work', color: 'text-blue-400' }
  }
  if (data.high > 90) {
    return { text: 'Hot — work early or late', color: 'text-orange-400' }
  }
  if (data.low < 32) {
    return { text: 'Frost risk — protect plants', color: 'text-cyan-400' }
  }
  if (data.precipChance < 20 && data.high > 50 && data.high < 85) {
    return { text: 'Good conditions expected', color: 'text-almanac-success' }
  }
  return { text: 'Fair conditions expected', color: 'text-almanac-parchment/70' }
}

export default function TomorrowPreview({ tomorrow }: TomorrowPreviewProps) {
  if (!tomorrow) return null

  const outlook = getTomorrowOutlook(tomorrow)
  const emoji = getWeatherEmoji(tomorrow.weatherCode)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 border border-white/10 rounded-lg p-4 mt-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-almanac-gold" />
        <h3 className="text-sm font-medium text-almanac-gold">Tomorrow at a Glance</h3>
      </div>

      <div className="flex items-center justify-between">
        {/* Weather summary */}
        <div className="flex items-center gap-4">
          <span className="text-2xl">{emoji}</span>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-almanac-parchment/80">
              <ThermometerSun className="w-3.5 h-3.5 text-orange-400" />
              {Math.round(tomorrow.high)}°
            </span>
            <span className="flex items-center gap-1 text-almanac-parchment/60">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-blue-400" />
              {Math.round(tomorrow.low)}°
            </span>
            {tomorrow.precipChance > 0 && (
              <span className="flex items-center gap-1 text-almanac-parchment/60">
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                {tomorrow.precipChance}%
              </span>
            )}
          </div>
        </div>

        {/* Outlook */}
        <p className={`text-xs ${outlook.color}`}>
          {outlook.text}
        </p>
      </div>
    </motion.div>
  )
}
```

**Integration in page.tsx:**
```tsx
import TomorrowPreview from '@/components/almanac/TomorrowPreview'

// After the FrontierSaying, compute tomorrow's data:
const todayIndex = findTodayDailyIndex(weather.daily.time)
const tomorrowData = todayIndex !== -1 && weather.daily.time[todayIndex + 1] ? {
  high: weather.daily.temperatureMax[todayIndex + 1],
  low: weather.daily.temperatureMin[todayIndex + 1],
  precipChance: weather.daily.precipitationProbabilityMax[todayIndex + 1] || 0,
  weatherCode: weather.daily.weatherCode[todayIndex + 1]
} : null

// In JSX, after FrontierSaying:
<TomorrowPreview tomorrow={tomorrowData} />
```

---

## Appendix: Color Reference

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Midnight | `#0A1128` | `--color-almanac-midnight` | Page background |
| Gold Leaf | `#C5A059` | `--color-almanac-gold` | Accents, titles, badge |
| Parchment | `#F4ECD8` | `--color-almanac-parchment` | Body text |
| Success | `#4A7C59` | `--color-almanac-success` | Good scores |
| Warning | `#D4A84B` | `--color-almanac-warning` | Fair scores |
| Danger | `#8B3A3A` | `--color-almanac-danger` | Poor/Avoid scores |

---

## Appendix: File Checklist Summary

| File | Action | Priority |
|------|--------|----------|
| `app/almanac/layout.tsx` | MODIFY (metadata) | High |
| `app/almanac/page.tsx` | MODIFY (header, footer, saying logic) | High |
| `components/almanac/FrontierSaying.tsx` | MODIFY (dual-line format) | High |
| `components/almanac/NativePulse.tsx` | MODIFY (rebrand to Seedkeeper's Watch) | High |
| `components/almanac/AboutModal.tsx` | CREATE | High |
| `lib/almanac/sayings.ts` | MODIFY (add dual sayings) | High |
| `components/almanac/LocationPicker.tsx` | **NO CHANGE — KEEP** | — |
| `components/almanac/AlmanacHero.tsx` | OPTIONAL (minor) | Low |
| `public/og-1775-almanac.png` | CREATE | Medium |

---

## ⚠️ Final Reminder

**DO NOT REMOVE ANY FUNCTIONALITY.**

Every component that exists today must exist after the rebrand. This is a reskin, not a reduction.

- ✅ LocationPicker stays
- ✅ NativePulse stays (rebranded)
- ✅ All weather features stay
- ✅ All scores stay
- ✅ All forecasts stay

---

**End of Build Guide**

*Document Version: 2.1*  
*Created: January 26, 2026*  
*For: The 1775 Almanac — Sullivan County Launch*
