# The 1775 Almanac — Information Architecture Redesign

> **Created:** January 27, 2026
> **Status:** Approved
> **Goal:** Reorganize the almanac into clear sections that serve both glancers (70%) and power users (30%)

---

## The Problem

The current almanac has ~20 components in a loose layout. Users who want a quick glance get overwhelmed. Users who want depth have to hunt for tools. We need to serve both without deleting any existing functionality.

## Design Principles

1. **Answer 7 questions without scrolling** — Match Apple Weather on 1-5, beat them on 6-7
2. **Progressive disclosure of understanding, not data** — Tiles show max info; ⓘ icons explain context
3. **Three clear sections** — Glanceable → Today's Details → For Working Farmers
4. **No heavy dependencies** — CSS-only animations, remove Framer Motion where possible

---

## The 7 Questions (Above the Fold)

Every weather app user asks these. We must answer all 7 without scrolling:

1. **What's it like right now?** — Temperature, conditions
2. **Do I need a jacket/umbrella?** — Rain chance, feels like
3. **What's happening today?** — High/low
4. **What's the week look like?** — 7-day compact
5. **Is anything dangerous coming?** — Alerts
6. **Can I do my outdoor thing?** — Task scores (our advantage over Apple)
7. **When will it change?** — Dark Sky-style precipitation timing (our killer feature)

---

## Section 1: Glanceable (Above the Fold)

**Purpose:** Answer all 7 questions in under 5 seconds.

### Mobile Layout

```
┌─────────────────────────────┐
│ ⚠️ NWS ALERT (if active)    │
├─────────────────────────────┤
│                             │
│         72°                 │
│    Partly Cloudy            │
│     H: 78° L: 54°           │
│                             │
│  ☔ Rain in 45 min          │
│                             │
├──────────┬──────────────────┤
│ SOWER  8 │ SHEPHERD  7      │
├──────────┼──────────────────┤
│ KEEPER 6 │ BUILDER   9      │
├──────────┴──────────────────┤
│ ▁▂▃▄▅▆▅▄▃▂  Hourly Trend    │
├─────────────────────────────┤
│ M  T  W  T  F  S  S         │
│ 78 75 72 68 70 74 76        │
│ ☀️ 🌧️ 🌧️ ⛅ ☀️ ☀️ ⛅          │
└─────────────────────────────┘
```

### Components

| Component                    | Questions Answered       |
| ---------------------------- | ------------------------ |
| Alert Banner                 | #5 (danger)              |
| Hero (temp, conditions, H/L) | #1, #2, #3               |
| Precipitation Timing         | #7 (when will it change) |
| Task Scores (2x2 grid)       | #6 (can I work outside)  |
| Hourly Sparkline             | #2, #3 (trend)           |
| 7-Day Compact                | #4 (week ahead)          |

---

## Section 2: Today's Details

**Divider:** `─────────── Today's Details ───────────`

**Purpose:** Deeper context about current conditions. Not farmer-specific.

### Components

| Component          | What it shows                    | ⓘ Context                     |
| ------------------ | -------------------------------- | ----------------------------- |
| Tomorrow Preview   | High/low, precip chance          | Why tomorrow matters          |
| Burn Day Indicator | Yes/No/Marginal                  | Local regulations             |
| Air Quality        | AQI + scale bar                  | EPA scale, health recs        |
| Sun & Barometer    | Sunrise/sunset, pressure         | How pressure predicts changes |
| Current Conditions | Dew point, visibility, UV, gusts | Practical meaning             |
| Frontier Proverb   | Saying + modern translation      | Folklore tradition            |
| Moon Phase         | Visual + name + %                | Lunar cycle history           |
| Radar              | Animated map                     | How to read it                |
| Snow Conditions    | Depth, melt risk                 | Seasonal, conditional         |

---

## Section 3: For Working Farmers, Gardeners & Naturalists

**Divider:** `───── For Working Farmers, Gardeners & Naturalists ─────`

**Purpose:** Deep tools for users making decisions based on weather data.

### Components

| Component             | What it shows                        | ⓘ Context            |
| --------------------- | ------------------------------------ | -------------------- |
| Planting Intelligence | Soil temp, frost countdown, VPD, GDD | Planting decisions   |
| Farmer's Memory       | Historical pattern matching          | How comparison works |
| Native Pulse          | Phenology signals, spring index      | What plants indicate |
| Environmental Watch   | Creek levels, drought, spring index  | USGS/NOAA sources    |

### Future Additions (V1.1+)

- **Best Window Today** — Optimal outdoor hours
- **Livestock Heat Stress** — THI with species thresholds
- **Pest Degree Days** — Crop-specific pest timing

### Optional Enhancement

Section can collapse to just the header on mobile. Saves scroll for glancers. Remembers preference in localStorage.

---

## Precipitation Timing Feature ("Rain in 45 min")

### Data Source

RainViewer API (already integrated):

- Past radar frames (~2 hours history)
- Nowcast frames (~1-2 hours ahead)

### Algorithm

```
For user's coordinates:
1. Sample pixel intensity at (lat, lon) across all frames
2. If precipitation in nowcast → calculate arrival time
3. If raining now → check when nowcast shows clearing
4. If dry in all frames → "Dry for the next 2 hours"
```

### Display States

| Condition              | Display                       |
| ---------------------- | ----------------------------- |
| Rain approaching       | ☔ Rain in 45 min             |
| Raining, clearing soon | 🌧️ Clearing by 2:30pm         |
| Raining, continues     | 🌧️ Rain for 2+ hours          |
| Dry, stays dry         | ☀️ Dry for 2 hours            |
| No radar data          | Falls back to hourly precip % |

### Limitations

- ~2 hour lookahead max (radar nowcasting limit)
- Works for rain/snow, not cloud cover
- Mountain terrain affects accuracy

### Fallback

If RainViewer fails, show hourly precipitation probability from Open-Meteo.

---

## Context Popup System (ⓘ Icons)

### Interaction

- Tap ⓘ → popup appears
- Tap outside or swipe down → dismisses
- CSS transitions only (no animation library)

### Container by Platform

- **Mobile:** Bottom sheet (40-60% of screen)
- **Desktop:** Popover anchored near ⓘ icon

### Content Structure

```
┌─────────────────────────────┐
│ Air Quality Index      ✕   │
├─────────────────────────────┤
│                             │
│ SCALE                       │
│ 0-50     Good        🟢     │
│ 51-100   Moderate    🟡     │
│ 101-150  Sensitive   🟠     │
│ 151-200  Unhealthy   🔴     │
│ 201+     Hazardous   🟣     │
│                             │
│ WHY IT MATTERS              │
│ Affects outdoor work,       │
│ exercise, and sensitive     │
│ groups.                     │
│                             │
│ SOURCE                      │
│ EPA via Open-Meteo          │
│ Updated every 15 min        │
└─────────────────────────────┘
```

### Standard Sections

1. **Scale/Reference** (if applicable)
2. **Why It Matters** — practical implications
3. **Source** — data origin + update frequency

---

## Implementation Plan

### New Components

| Component             | Purpose                        |
| --------------------- | ------------------------------ |
| `PrecipitationTiming` | Dark Sky-style "Rain in X min" |
| `InfoPopup`           | Reusable context popup         |
| `SectionDivider`      | Subtle line with label         |
| `CompactSevenDay`     | Condensed 7-day row            |

### Modified Components

- Every existing tile — add ⓘ icon + context content
- `AlmanacPage` — reorganize into 3 sections
- Remove Framer Motion dependency where possible

### Content to Write

~15 tiles × 3 sections each = ~45 pieces of context copy

### Not in Scope

- Best Window Today (V1.1)
- Livestock THI (V1.1)
- Pest Degree Days (V1.1)
- Collapsible sections (enhancement)

---

## Success Criteria

1. All 7 questions answerable without scrolling on mobile
2. Clear visual separation between 3 sections
3. Every tile has working ⓘ context popup
4. Precipitation timing feature shows accurate estimates
5. No Framer Motion dependency (CSS-only animations)
6. Page still loads fast (<3s on 3G)
