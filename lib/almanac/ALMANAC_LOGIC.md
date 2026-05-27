# Rocky Mount Almanac — Technical Logic Document

**Version:** 3.7
**Last Updated:** January 26, 2026  
**Location:** Sullivan County, Tennessee (36.52°N, 82.26°W, ~1,500 ft elevation)  
**Site:** Rocky Mount State Historic Site — First Southwest Territory Capital (1790-1792)

---

## Table of Contents

1. [Overview & Purpose](#overview--purpose)
2. [Data Architecture](#data-architecture)
3. [⚠️ Critical: The past_days Offset](#-critical-the-past_days-offset)
4. [Unit Conversions](#unit-conversions)
5. [Scientific Formulas](#scientific-formulas)
6. [Task Score Logic](#task-score-logic)
7. [Threshold Calibration Reference](#threshold-calibration-reference)
8. [Native Pulse — Seed Stratification](#native-pulse--seed-stratification)
9. [Regional Considerations](#regional-considerations)
10. [Weather Code Reference](#weather-code-reference)
11. [Testing Scenarios](#testing-scenarios)
12. [Future Enhancements](#future-enhancements)
13. [Appendix: Sources & Citations](#appendix-sources--citations)

---

## Overview & Purpose

The Rocky Mount Almanac is a heritage-informed weather decision tool designed for the Southern Appalachian context. It translates meteorological data into actionable guidance for four primary user personas:

| Score | Internal Key | UI Display Name | Target User | Primary Concerns |
|-------|--------------|-----------------|-------------|------------------|
| **Sower's Index** | `sower` | Sower's Index | Home gardeners, small farmers | Soil temp, frost, precipitation, workable ground |
| **Outdoor Alert** | `shepherd` | Outdoor Alert | Pet owners, parents, livestock managers | Heat stress, cold exposure, ice hazards |
| **Keeper's Gauge** | `keeper` | Keeper's Gauge | Homeowners, painters, handymen | Paint cure conditions, ladder safety, dew point |
| **Builder's Grade** | `builder` | Builder's Grade | Contractors, site managers | Concrete curing, OSHA compliance, crane operations |

> **Note:** The second score is internally named "shepherd" (for Shepherd's Watch) but displays as "Outdoor Alert" in the UI for broader appeal.

### Design Philosophy

This is not a generic weather app. It's calibrated for:
- **East Tennessee climate** — Humid subtropical with mountain influence
- **Heritage agriculture** — Cool-season crops, native plants, traditional timing
- **Working people** — Practical "can I do this today?" answers
- **Safety-first** — Errs toward caution on ice, heat, and wind

---

## Data Architecture

### Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         OPEN-METEO API                               │
│  (Free, no API key, European Centre for Medium-Range Forecasts)     │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      /api/weather/route.ts                          │
│  • Fetches from Open-Meteo with past_days=2, forecast_days=7        │
│  • Uses DEFAULT_LOCATION from geocoding.ts                          │
│  • Returns raw JSON (no transformation at API layer)                │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    lib/almanac/weather.ts                           │
│  • transformWeatherData() converts units                            │
│  • Snow depth: meters → inches                                      │
│  • Snowfall: centimeters → inches                                   │
│  • Creates typed WeatherData object                                 │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   lib/almanac/taskScores.ts                         │
│  • buildExtendedMetrics() — calculates derived values               │
│  • analyzeConditions() — winter/forecast analysis                   │
│  • calculate[Sower|Outdoor|Keeper|Builder]Score()                   │
│  • Re-exports dateUtils functions for UI convenience                │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      UI Components                                   │
│  • CurrentConditionsCard.tsx — current weather display              │
│  • WeatherDetails.tsx — hourly/daily forecasts                      │
│  • WeatherAlertBanner.tsx — storm warnings (uses dateUtils)         │
│  • TaskScores.tsx — the four score gauges                           │
└─────────────────────────────────────────────────────────────────────┘
```

### File Organization

| File | Purpose | Key Exports |
|------|---------|-------------|
| `geocoding.ts` | **Single source of truth for DEFAULT_LOCATION** | `DEFAULT_LOCATION`, `searchLocation`, `formatLocationName` |
| `dateUtils.ts` | All date/time utilities | `findTodayDailyIndex`, `findTodayHourlyIndex`, `getEasternHour`, `isDateToday`, etc. |
| `types.ts` | TypeScript interfaces | `WeatherData`, `TaskScore`, `MoonData`, `isSnowCode`, `isIceCode` |
| `weather.ts` | API response transformation | `transformWeatherData` |
| `taskScores.ts` | Score calculation engine | `calculateAllTaskScores`, `buildExtendedMetrics`, `calculateNativePulse` |
| `storage.ts` | localStorage persistence | `saveLocation`, `loadLocation`, `clearLocation` |
| `moonPhase.ts` | Moon calculations | `getMoonData`, `isDay` |
| `sayings.ts` | Frontier sayings | `getSaying` |
| `weatherIcons.tsx` | Weather code → icon mapping | `getWeatherIcon` |

**Import Guidelines:**
- For default location: `import { DEFAULT_LOCATION } from '@/lib/almanac/geocoding'`
- For date utilities: `import { ... } from '@/lib/almanac/dateUtils'`
- For weather codes: `import { isSnowCode, isIceCode, getWeatherInfo } from '@/lib/almanac/types'`

### API Request Parameters

```typescript
// Route: /api/weather/route.ts
const params = {
  latitude: 36.52,
  longitude: -82.26,
  current: [
    'temperature_2m', 'relative_humidity_2m', 'apparent_temperature',
    'precipitation', 'weather_code', 'wind_speed_10m', 'wind_direction_10m',
    'wind_gusts_10m', 'surface_pressure', 'soil_temperature_6cm',
    'snow_depth', 'cloud_cover', 'visibility', 'dew_point_2m', 'uv_index', 'is_day'
  ],
  hourly: [
    'temperature_2m', 'apparent_temperature', 'precipitation_probability',
    'precipitation', 'weather_code', 'snowfall', 'snow_depth',
    'wind_speed_10m', 'wind_gusts_10m', 'visibility', 'uv_index'
  ],
  daily: [
    'temperature_2m_max', 'temperature_2m_min', 'precipitation_sum',
    'precipitation_probability_max', 'weather_code', 'sunrise', 'sunset',
    'snowfall_sum', 'wind_speed_10m_max', 'wind_gusts_10m_max', 'uv_index_max'
  ],
  temperature_unit: 'fahrenheit',
  wind_speed_unit: 'mph',
  precipitation_unit: 'inch',  // NOTE: Does NOT affect snowfall!
  timezone: 'America/New_York',
  past_days: 2,        // ⚠️ CRITICAL — see next section
  forecast_days: 7
}
```

---

## ⚠️ Critical: The past_days Offset

### The Problem

When `past_days=2` is set, Open-Meteo prepends historical data to all arrays:

```
DAILY ARRAY (9 elements with past_days=2, forecast_days=7):
┌─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Index 0 │ Index 1 │ Index 2 │ Index 3 │ Index 4 │ Index 5 │ Index 6 │ Index 7 │ Index 8 │
├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ 2 days  │ Yester- │  TODAY  │ Tomorrow│  Day+2  │  Day+3  │  Day+4  │  Day+5  │  Day+6  │
│   ago   │   day   │         │         │         │         │         │         │         │
└─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

HOURLY ARRAY (216 elements = 9 days × 24 hours):
┌──────────────┬──────────────┬──────────────┬──────────────┬─────────────────┐
│ Index 0-23   │ Index 24-47  │ Index 48-71  │ Index 72-95  │ Index 96+       │
├──────────────┼──────────────┼──────────────┼──────────────┼─────────────────┤
│ 2 days ago   │ Yesterday    │ TODAY        │ Tomorrow     │ Future days     │
│ (hours 0-23) │ (hours 0-23) │ (hours 0-23) │ (hours 0-23) │                 │
└──────────────┴──────────────┴──────────────┴──────────────┴─────────────────┘
```

### Why This Matters

**BUG EXAMPLE (before fix):**
```typescript
// ❌ WRONG — This reads 2 days ago, not today!
for (let i = 0; i < 3; i++) {
  if (i === 0) forecastWarning = "Snow expected today"  // Actually 2 days ago!
}

// ❌ WRONG — currentHour=14 reads index 14, which is 2 days ago at 2pm
precipProbability: weather.hourly.precipitationProbability[currentHour]
```

### The Solution

**Always use the date utility functions:**

```typescript
import { findTodayDailyIndex, findTodayHourlyIndex } from './dateUtils'

// ✅ CORRECT — Find today's actual index
const todayDailyIdx = findTodayDailyIndex(weather.daily.time)  // Returns 2
const todayHourlyStart = findTodayHourlyIndex(weather.hourly.time)  // Returns 48

// ✅ CORRECT — Forecast loop starts from today
for (let offset = 0; offset < 3; offset++) {
  const i = todayDailyIdx + offset  // 2, 3, 4 (today, tomorrow, day after)
}

// ✅ CORRECT — Current hour's precipitation
const currentHourlyIdx = todayHourlyStart + currentHour  // 48 + 14 = 62
precipProbability: weather.hourly.precipitationProbability[currentHourlyIdx]
```

### Why We Use past_days=2

Historical data enables:
1. **Ice detection** — Freeze-thaw cycles create black ice
2. **Snow persistence** — Did it snow recently and stay cold enough to accumulate?
3. **Ground condition inference** — Has it been wet/frozen for multiple days?
4. **Trend analysis** — Is it warming up or cooling down?

**Do not remove past_days=2** — the winter safety logic depends on it.

### ⚠️ Timezone: Always Use Eastern Time

The API returns data in `America/New_York` timezone. **Never use `new Date().getHours()`** to index hourly data — it returns the browser's local timezone, not Eastern Time.

```typescript
// ❌ WRONG — Uses browser timezone (e.g., PST returns 14 when it's 5pm ET)
const currentHour = new Date().getHours()
precipProbability: weather.hourly.precipitationProbability[todayHourlyStart + currentHour]

// ✅ CORRECT — Use getEasternHour() from dateUtils
import { getEasternHour } from './dateUtils'
const currentHour = getEasternHour()  // Returns 17 when it's 5pm ET
precipProbability: weather.hourly.precipitationProbability[todayHourlyStart + currentHour]
```

**Files that must use `getEasternHour()`:**
- `taskScores.ts` — `buildExtendedMetrics()` and `analyzeConditions()`
- `WeatherDetails.tsx` — hourly forecast display

---

## Unit Conversions

### Conversion Constants

```typescript
// lib/almanac/weather.ts
const METERS_TO_INCHES = 39.3701    // 1 meter = 39.3701 inches
const CM_TO_INCHES = 0.393701      // 1 cm = 0.393701 inches (1/2.54)
```

### What Open-Meteo Returns vs What We Display

| Field | API Returns | API Unit | We Convert To | Display Unit |
|-------|-------------|----------|---------------|--------------|
| temperature_2m | Number | °F | — | °F |
| wind_speed_10m | Number | mph | — | mph |
| precipitation | Number | inch | — | inch |
| **snow_depth** | Number | **meters** | × 39.3701 | inches |
| **snowfall** | Number | **cm** | × 0.393701 | inches |
| **snowfall_sum** | Number | **cm** | × 0.393701 | inches |
| surface_pressure | Number | hPa | ÷ 33.864 | inHg |
| visibility | Number | meters | ÷ 1609.34 | miles |

### ⚠️ Snowfall Gotcha

Even with `precipitation_unit: 'inch'`, **snowfall is ALWAYS returned in centimeters** from Open-Meteo. This is per their API documentation. The `precipitation_unit` parameter only affects rain.

```typescript
// ❌ BUG — Displays 2.54× too high (cm labeled as inches)
snowfallSum: data.daily.snowfall_sum

// ✅ FIX — Convert cm to inches
snowfallSum: data.daily.snowfall_sum?.map(s => s * CM_TO_INCHES)
```

---

## Scientific Formulas

### Heat Index (NOAA Rothfusz Regression)

Used when temperature ≥ 80°F. This is the official NWS formula.

```typescript
function calculateHeatIndex(tempF: number, humidity: number): number {
  if (tempF < 80) return tempF
  
  const T = tempF, R = humidity
  let HI = -42.379 + 2.04901523*T + 10.14333127*R - 0.22475541*T*R 
    - 0.00683783*T*T - 0.05481717*R*R + 0.00122874*T*T*R 
    + 0.00085282*T*R*R - 0.00000199*T*T*R*R
  
  // Low humidity adjustment (RH < 13%, 80-112°F)
  if (R < 13 && T >= 80 && T <= 112) {
    HI -= ((13-R)/4) * Math.sqrt((17-Math.abs(T-95))/17)
  }
  
  // High humidity adjustment (RH > 85%, 80-87°F)
  if (R > 85 && T >= 80 && T <= 87) {
    HI += ((R-85)/10) * ((87-T)/5)
  }
  
  return Math.round(HI)
}
```

**Source:** [NOAA Weather Prediction Center](https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml)

**Validation Points:**
| Temp | RH | Heat Index |
|------|-----|------------|
| 80°F | 40% | 80°F |
| 90°F | 50% | 95°F |
| 95°F | 60% | 111°F |
| 100°F | 40% | 109°F |

### Wind Chill (NWS Formula, Post-2001)

Used when temperature ≤ 50°F and wind ≥ 3 mph.

```typescript
function calculateWindChill(tempF: number, windMph: number): number {
  if (tempF > 50 || windMph < 3) return Math.round(tempF)
  
  return Math.round(
    35.74 + 0.6215*tempF - 35.75*Math.pow(windMph, 0.16) 
    + 0.4275*tempF*Math.pow(windMph, 0.16)
  )
}
```

**Source:** [NWS Wind Chill Chart](https://www.weather.gov/safety/cold-wind-chill-chart)

**Validation Points:**
| Temp | Wind | Wind Chill |
|------|------|------------|
| 30°F | 10 mph | 21°F |
| 20°F | 15 mph | 6°F |
| 10°F | 20 mph | -9°F |
| 0°F | 30 mph | -26°F |

### Dew Point (Magnus-Tetens Approximation)

Using Sonntag 1990 constants (a=17.27, b=237.7°C).

```typescript
function calculateDewPoint(tempF: number, humidity: number): number {
  const tempC = (tempF - 32) * 5/9
  const alpha = (17.27 * tempC)/(237.7 + tempC) + Math.log(humidity/100)
  const dewPointC = (237.7 * alpha)/(17.27 - alpha)
  return Math.round(dewPointC * 9/5 + 32)
}
```

**Dew Point Spread** = Temperature - Dew Point

This matters for painting/finishing work. Paint manufacturers require ≥5°F spread to prevent moisture condensation on the surface before cure.

### Temperature-Humidity Index (THI)

Standard livestock heat stress formula used in agricultural extension.

```typescript
function calculateTHI(tempF: number, humidity: number): number {
  const tempC = (tempF - 32) * 5/9
  return Math.round(
    (1.8*tempC + 32) - ((0.55 - 0.0055*humidity) * (1.8*tempC - 26))
  )
}
```

**THI Categories (Livestock):**
| THI | Category | Effect |
|-----|----------|--------|
| < 72 | Normal | No heat stress |
| 72-79 | Mild | Reduced feed intake |
| 79-89 | Moderate | Panting, seeking shade |
| 89-99 | Severe | Drooling, open-mouth breathing |
| ≥ 99 | Emergency | Heat stroke risk |

**Source:** [Oklahoma State University Extension](https://extension.okstate.edu/)

---

## Task Score Logic

All scores follow the same pattern:
1. Check for **blocking conditions** (return immediately with score 1-3)
2. Start at **score = 10**
3. Apply **penalties** based on conditions
4. Clamp to **range 1-10**
5. Return score, label, and instruction

### Score Labels

```typescript
function getScoreLabel(score: number): string {
  if (score >= 9) return 'Perfect'
  if (score >= 7) return 'Good'
  if (score >= 5) return 'Fair'
  if (score >= 3) return 'Poor'
  return 'Avoid'
}
```

### Sower's Index (Gardening)

**Blocking Conditions (return immediately):**
- Ground is icy → Score 1
- Snow on ground → Score 1
- Ground is frozen → Score 2
- Actively snowing → Score 2

**Penalties:**
| Condition | Penalty | Notes |
|-----------|---------|-------|
| Soil temp < 35°F | -5 | Too cold for anything |
| Soil temp 35-40°F | -3 | Only garlic, cover crops |
| Soil temp 40-50°F | -1 | Cool-season crops OK |
| Air temp < 32°F | -4 | Frost conditions |
| Air temp 32-40°F | -2 | Cool-season only |
| Air temp > 95°F | -4 | Heat stress |
| Precipitation > 0.5" | -5 | Heavy rain |
| Precipitation > 0.1" | -3 | Active rain |
| Precip probability > 70% | -2 | Rain likely |
| Wind > 25 mph | -3 | Too windy for transplants |
| Wind 15-25 mph | -1 | Challenging |
| Wet ground | -2 | Soil compaction risk |

### Shepherd's Watch (Outdoor Safety)

**Blocking Conditions:**
- Ground is icy → Score 3 (not 1, because pets still need bathroom breaks)

**Penalties:**
| Condition | Penalty | Notes |
|-----------|---------|-------|
| Snow depth > 4" | -3 | Small dogs struggle |
| Snow depth 1-4" | -1 | Check paws after |
| Actively snowing | -1 | Shorter walks |
| THI ≥ 99 | -6 | Heat emergency |
| THI 89-99 | -4 | Dangerous heat |
| THI 79-89 | -2 | Heat stress risk |
| THI 72-79 | -1 | Provide shade/water |
| Wind chill < 0°F | -5 | Frostbite in minutes |
| Wind chill 0-15°F | -3 | Limit to 10-15 min |
| Wind chill 15-25°F | -2 | Coats for short-haired |
| Wind chill 25-32°F | -1 | Watch small breeds |
| Freezing rain | -4 | Stay inside |
| Wind > 35 mph | -2 | Debris hazard |

### Keeper's Gauge (Property Maintenance)

**Blocking Conditions:**
- Ground is icy → Score 1 (ladders deadly)
- Snow on ground → Score 1
- Actively snowing → Score 2

**Penalties:**
| Condition | Penalty | Notes |
|-----------|---------|-------|
| Temp < 35°F | -5 | Too cold for any finish |
| Temp 35-40°F | -4 | Repairs only |
| Temp 40-50°F | -3 | Limited products work |
| Dew point spread < 3°F | -4 | Paint will fail (if temp ≥ 50°F) |
| Dew point spread 3-5°F | -2 | Work midday only |
| Humidity > 85% | -2 | Extended cure times |
| Precipitation > 0.1" | -5 | All exterior on hold |
| Precip probability > 70% | -3 | Finish early |
| Wind gusts > 40 mph | -5 | No ladder work |
| Wind gusts 30-40 mph | -3 | Stay off ladders |
| Wind gusts 20-30 mph | -2 | Low work only |

### Builder's Grade (Construction)

**Blocking Conditions:**
- Ground is icy → Score 2 (limited interior work only)

**Penalties:**
| Condition | Penalty | Notes |
|-----------|---------|-------|
| Snow > 4" | -5 | Clear before operations |
| Snow 1-4" | -3 | Traction issues |
| Snow < 1" | -1 | Clear work areas |
| Actively snowing | -2 | Conditions deteriorating |
| Wind chill < 0°F | -5 | Site closed |
| Wind chill 0-20°F | -4 | OSHA cold stress |
| Wind chill 20-32°F | -3 | Concrete won't cure |
| Temp < 40°F | -2 | Concrete needs additives |
| Heat index ≥ 115°F | -5 | Site closed |
| Heat index 103-115°F | -4 | Early AM only |
| Heat index 91-103°F | -2 | Mandatory water breaks |
| Precipitation > 0.25" | -4 | Site work suspended |
| Precipitation > 0.1" | -2 | Covered work only |
| Wind gusts > 45 mph | -5 | Cranes down |
| Wind gusts 35-45 mph | -3 | No crane work |
| Frozen ground | -2 | No excavation |

---

## Threshold Calibration Reference

### Paint & Coatings (Keeper's Gauge)

| Threshold | Value | Source |
|-----------|-------|--------|
| Minimum temp for latex paint | 50°F | Sherwin-Williams, Benjamin Moore specs |
| Minimum temp for oil-based | 40°F | Manufacturer recommendations |
| Minimum dew point spread | 5°F | Industry standard (PDCA) |
| Maximum humidity for good cure | 85% | Paint manufacturer guidelines |

### Concrete (Builder's Grade)

| Threshold | Value | Source |
|-----------|-------|--------|
| Protection needed | < 40°F | ACI 306R Cold Weather Concreting |
| Curing stops | < 32°F | Water in mix freezes |
| Hot weather concerns | > 90°F | ACI 305R Hot Weather Concreting |

### OSHA Heat Illness Prevention (Builder's Grade)

| Heat Index | Risk Level | Requirements |
|------------|------------|--------------|
| < 91°F | Low | Basic precautions |
| 91-103°F | Moderate | Mandatory water breaks |
| 103-115°F | High | Reduce work duration |
| ≥ 115°F | Extreme | Stop outdoor work |

**Source:** [OSHA Heat Illness Prevention Campaign](https://www.osha.gov/heat)

### OSHA Cold Stress (Builder's Grade)

| Wind Chill | Risk | Time to Frostbite |
|------------|------|-------------------|
| 0°F to -10°F | High | 30 minutes |
| -10°F to -25°F | Very High | 10-30 minutes |
| < -25°F | Extreme | < 10 minutes |

**Source:** [OSHA Cold Stress Guide](https://www.osha.gov/cold-stress)

### Ladder Safety (Keeper's & Builder's)

| Wind Speed | Guidance | Source |
|------------|----------|--------|
| > 25 mph sustained | No ladder work | OSHA 1926.1053 |
| > 40 mph gusts | No exterior work | Industry best practice |
| > 45 mph gusts | Cranes must be secured | OSHA 1926.1417 |

### Pet & Livestock Safety (Shepherd's Watch)

| Condition | Threshold | Source |
|-----------|-----------|--------|
| Cold risk begins | < 45°F (small/short-haired dogs) | AVMA |
| Limit outdoor time | < 20°F | PetMD, ASPCA |
| Frostbite risk | < 0°F wind chill | Veterinary guidelines |
| Heat danger | > 80°F (brachycephalic breeds) | AVMA |
| Heat emergency | THI ≥ 99 | Livestock extension |

### Soil Temperature (Sower's Index)

| Crop Type | Minimum Soil Temp | Source |
|-----------|-------------------|--------|
| Peas, lettuce, spinach | 40°F | University Extension |
| Onion sets, garlic | 35°F | University Extension |
| Beans | 50°F | University Extension |
| Tomatoes, peppers | 60°F | University Extension |
| Corn, squash | 60°F | University Extension |

---

## Native Pulse — Seed Stratification

### Overview

The Native Pulse tracks cold moist stratification progress for native seeds. Many Tennessee native plants (coneflowers, milkweed, native grasses) require 60-90 days of cold stratification to break seed dormancy.

### Stratification Phases

```
December 1 ──────────────────────────────────────── February 28
│                    STRATIFICATION PERIOD                    │
│  Seeds need consistent 28-40°F with moisture                │
│  Progress bar shows days elapsed / 90                       │
└─────────────────────────────────────────────────────────────┘

March 1 ─────────────────────────────────────────── April 30
│                  GERMINATION TRIGGER                        │
│  Watching for: soil temp > 55°F + rain event               │
│  "Warm rain" triggers native germination                    │
└─────────────────────────────────────────────────────────────┘

May 1 ───────────────────────────────────────────── October 31
│                    GROWING SEASON                           │
│  Peak: May-June | Midsummer: July-Aug | Winding: Sep-Oct   │
└─────────────────────────────────────────────────────────────┘

November 1 ──────────────────────────────────────── November 30
│                      DORMANT                                │
│  Seed collection time                                       │
└─────────────────────────────────────────────────────────────┘
```

### Temperature Alerts During Stratification

| Condition | Alert |
|-----------|-------|
| 28-40°F | "Active stratification in progress" |
| < 28°F | "Hard freeze—protect seed beds" |
| > 40°F | "Warm spell may interrupt stratification" |

### Tennessee Native Plants Referenced

- **Purple Coneflower** (*Echinacea purpurea*) — 60-90 days stratification
- **Common Milkweed** (*Asclepias syriaca*) — 30-90 days stratification
- **Black-eyed Susan** (*Rudbera hirta*) — 30 days stratification
- **Little Bluestem** (*Schizachyrium scoparium*) — 60 days stratification
- **Eastern Columbine** (*Aquilegia canadensis*) — 60 days stratification

---

## Regional Considerations

### Sullivan County, Tennessee Climate Profile

| Factor | Value | Implication |
|--------|-------|-------------|
| USDA Zone | 7a (-5°F to 0°F) | Most winters see single digits |
| Elevation | 1,200-2,000 ft | Cooler than valley floor |
| Avg first frost | October 15 | Plan fall garden accordingly |
| Avg last frost | April 15 | Safe for warm-season after |
| Annual rainfall | 42 inches | Well-distributed |
| Annual snowfall | 12-18 inches | Significant but variable |

### Appalachian Weather Patterns

**Elevation Effects:**
- Temperature drops ~3.5°F per 1,000 ft elevation
- Rocky Mount at ~1,500 ft is typically 2-3°F cooler than Bristol valley
- Cold air drainage can create temperature inversions

**Moisture Patterns:**
- Upslope flow from the west brings enhanced precipitation
- "Wraparound" moisture from nor'easters can produce significant snow
- Summer afternoon thunderstorms common (orographic lift)

**Ice Storm Corridor:**
- Sullivan County is in the "I-81 ice corridor"
- Freezing rain when warm air overrides cold surface air
- Particularly dangerous: temperatures in 30-35°F range with precipitation

### Historical Context (Rocky Mount)

Rocky Mount served as the first capital of the Southwest Territory (1790-1792), the precursor to Tennessee statehood. The site represents one of Tennessee's oldest documented farms, with the Masengill family connection to Century Farms (established 1775).

The almanac's heritage framing honors this agricultural history while providing modern utility.

---

## Weather Code Reference

Open-Meteo uses WMO (World Meteorological Organization) weather codes.

### Code Lookup Table

| Code | Description | Category |
|------|-------------|----------|
| 0 | Clear sky | Clear |
| 1 | Mainly clear | Clear |
| 2 | Partly cloudy | Cloudy |
| 3 | Overcast | Cloudy |
| 45 | Fog | Fog |
| 48 | Depositing rime fog | Fog/Ice |
| 51 | Light drizzle | Rain |
| 53 | Moderate drizzle | Rain |
| 55 | Dense drizzle | Rain |
| 56 | Light freezing drizzle | Ice ⚠️ |
| 57 | Dense freezing drizzle | Ice ⚠️ |
| 61 | Slight rain | Rain |
| 63 | Moderate rain | Rain |
| 65 | Heavy rain | Rain |
| 66 | Light freezing rain | Ice ⚠️ |
| 67 | Heavy freezing rain | Ice ⚠️ |
| 71 | Slight snow | Snow ❄️ |
| 73 | Moderate snow | Snow ❄️ |
| 75 | Heavy snow | Snow ❄️ |
| 77 | Snow grains | Snow ❄️ |
| 80 | Slight rain showers | Rain |
| 81 | Moderate rain showers | Rain |
| 82 | Violent rain showers | Rain |
| 85 | Slight snow showers | Snow ❄️ |
| 86 | Heavy snow showers | Snow ❄️ |
| 95 | Thunderstorm | Storm |
| 96 | Thunderstorm with slight hail | Storm |
| 99 | Thunderstorm with heavy hail | Storm |

### Helper Functions

```typescript
// lib/almanac/types.ts
export function isSnowCode(code: number): boolean {
  return [71, 73, 75, 77, 85, 86].includes(code)
}

export function isIceCode(code: number): boolean {
  return [56, 57, 66, 67].includes(code)  // Freezing drizzle/rain
}
```

---

## Testing Scenarios

Use these scenarios to validate score calculations after any changes.

### Scenario 1: Perfect Spring Day

```typescript
const conditions = {
  temperature: 72,
  humidity: 45,
  windSpeed: 5,
  windGusts: 8,
  precipitation: 0,
  precipProbability: 10,
  soilTemperature: 58,
  snowDepth: 0,
  groundCondition: 'clear',
  weatherCode: 1  // Mainly clear
}

// Expected:
// Sower: 9-10 (Perfect) - "Excellent conditions for planting!"
// Shepherd: 9-10 (Perfect) - "Great conditions for outdoor time!"
// Keeper: 9-10 (Perfect) - Good dew point spread
// Builder: 9-10 (Perfect) - "Full operations"
```

### Scenario 2: Ice Storm

```typescript
const conditions = {
  temperature: 33,
  humidity: 95,
  windSpeed: 15,
  windGusts: 25,
  precipitation: 0.2,
  precipProbability: 90,
  soilTemperature: 34,
  snowDepth: 0,
  groundCondition: 'icy',
  weatherCode: 66  // Freezing rain
}

// Expected:
// Sower: 1 (Avoid) - "Ice on ground. No gardening possible."
// Shepherd: 3 (Poor) - "ICE ON GROUND. Slip hazard—very short trips only."
// Keeper: 1 (Avoid) - "ICE ON SURFACES. Ladders deadly."
// Builder: 2 (Avoid) - "ICE ON SITE. Equipment slides."
```

### Scenario 3: Heavy Snow Accumulation

```typescript
const conditions = {
  temperature: 28,
  humidity: 85,
  windSpeed: 10,
  windGusts: 20,
  precipitation: 0,
  precipProbability: 20,
  soilTemperature: 32,
  snowDepth: 6,  // 6 inches
  groundCondition: 'snowy',
  weatherCode: 3  // Overcast (snow stopped)
}

// Expected:
// Sower: 1 (Avoid) - "6.0" of snow. Wait for complete melt."
// Shepherd: 7 (Good) - Snow affects small dogs but OK for larger breeds
// Keeper: 1 (Avoid) - "Snow covering surfaces."
// Builder: 5 (Fair) - "6" snow. Clear before operations."
```

### Scenario 4: Summer Heat Wave

```typescript
const conditions = {
  temperature: 98,
  humidity: 70,
  windSpeed: 5,
  windGusts: 10,
  precipitation: 0,
  precipProbability: 0,
  soilTemperature: 85,
  snowDepth: 0,
  groundCondition: 'clear',
  weatherCode: 1
}

// Heat Index calculation: ~118°F
// THI calculation: ~93 (Severe stress)

// Expected:
// Sower: 5-6 (Fair) - "Heat index 118°F. Work early morning only."
// Shepherd: 4-5 (Poor) - "HEAT EMERGENCY" or "Dangerous heat"
// Keeper: 7-8 (Good) - Heat doesn't block painting
// Builder: 5 (Fair) - "SITE CLOSED" at 115°F+ or "DANGER" 103-115°F
```

### Scenario 5: Cold but Clear Winter Day

```typescript
const conditions = {
  temperature: 35,
  humidity: 50,
  windSpeed: 8,
  windGusts: 12,
  precipitation: 0,
  precipProbability: 5,
  soilTemperature: 38,
  snowDepth: 0,
  groundCondition: 'clear',
  weatherCode: 1
}

// Wind chill: ~29°F
// Dew point spread: ~17°F (excellent)

// Expected:
// Sower: 5-6 (Fair) - "Soil at 38°F. Only very hardy seeds."
// Shepherd: 8-9 (Good) - "Chilly at 29°F. Most dogs fine."
// Keeper: 5-6 (Fair) - "Only 35°F. Too cold for exterior finishes."
// Builder: 8 (Good) - Above freezing, good conditions
```

### Scenario 6: Spring Planting Window

```typescript
const conditions = {
  temperature: 55,
  humidity: 60,
  windSpeed: 10,
  windGusts: 15,
  precipitation: 0,
  precipProbability: 30,
  soilTemperature: 48,
  snowDepth: 0,
  groundCondition: 'clear',
  weatherCode: 2  // Partly cloudy
}

// Expected:
// Sower: 8-9 (Good/Perfect) - "Soil at 48°F. Good for peas, lettuce, spinach."
// Shepherd: 9-10 (Perfect)
// Keeper: 7-8 (Good) - Temp at threshold
// Builder: 9-10 (Perfect)
```

---

## Future Enhancements

### Planned Features

1. **Frost Date Integration**
   - Track days from last spring frost
   - Countdown to first fall frost
   - Frost probability based on historical data

2. **Moon Phase Integration**
   - Traditional planting by moon phase
   - Fishing/hunting solunar tables
   - Historical almanac tradition

3. **UV Index Guidance**
   - Sunburn time estimates
   - Work break recommendations
   - Garden timing (avoid midday transplanting)

4. **Microclimate Adjustments**
   - User can input elevation offset
   - North-facing vs south-facing slope
   - Urban heat island effect

5. **Historical Comparison**
   - "This day in weather history"
   - Compare to 30-year normals
   - Climate trend visualization

6. **Alert System**
   - Push notifications for frost warnings
   - Ice storm alerts
   - Heat advisory notifications

### Data Enhancements

1. **Soil Moisture**
   - Currently inferred from precipitation
   - Could add soil moisture API integration
   - Better "workable ground" predictions

2. **Pollen & Air Quality**
   - Allergy alerts for outdoor work
   - Air quality index for sensitive groups

3. **Stream/River Levels**
   - Flood warning integration
   - Fishing conditions

### Community Features

1. **Local Knowledge Database**
   - User-submitted microclimate notes
   - "My garden is always 3° cooler"
   - Community frost reports

2. **Historical Records**
   - First/last frost dates by year
   - Snow accumulation records
   - Notable weather events

---

## Appendix: Sources & Citations

### Official Government Sources

- **NOAA Heat Index:** https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
- **NWS Wind Chill:** https://www.weather.gov/safety/cold-wind-chill-chart
- **OSHA Heat Illness:** https://www.osha.gov/heat
- **OSHA Cold Stress:** https://www.osha.gov/cold-stress
- **OSHA Fall Protection:** https://www.osha.gov/fall-protection

### Industry Standards

- **ACI 306R:** Cold Weather Concreting (American Concrete Institute)
- **ACI 305R:** Hot Weather Concreting
- **PDCA:** Painting and Decorating Contractors of America standards

### Agricultural Extension

- **UT Extension:** https://extension.tennessee.edu/
- **Oklahoma State THI:** https://extension.okstate.edu/
- **Soil Temperature Guides:** Various land-grant university publications

### Veterinary Guidelines

- **AVMA:** American Veterinary Medical Association
- **ASPCA:** Animal poison control and weather safety
- **PetMD:** Veterinary-reviewed pet care information

### Weather Data

- **Open-Meteo:** https://open-meteo.com/ (API documentation)
- **WMO Weather Codes:** World Meteorological Organization standard

### Historical Context

- **Rocky Mount State Historic Site:** Tennessee Historical Commission
- **Century Farms Program:** Tennessee Department of Agriculture
- **Southwest Territory History:** Tennessee State Library and Archives

---

## Changelog

### v3.7 (January 26, 2026)
- **ROBUSTNESS:** SunBarometer now displays pressure in inHg (was hPa) to match CurrentConditionsCard
- **ROBUSTNESS:** PrecipitationRadar now has exponential backoff retry logic (3 retries with 1s/2s/4s delays)
- **ROBUSTNESS:** LocationPicker now shows user feedback when localStorage fails (toast notification)
- **CLEANUP:** All edge cases now handled gracefully with user-visible feedback

### v3.6 (January 26, 2026)
- **CODE CLEANUP:** Comprehensive codebase audit and consolidation
  - WeatherAlertBanner.tsx now imports from dateUtils (removed 60 lines of duplicate code)
  - Fixed typo: `analyzeForecasAlerts` → `analyzeForecastAlerts`
  - Removed dead code: `fetchWeatherData` from weather.ts, `getWeatherCondition` from weatherIcons.tsx
  - Removed unused `WeatherMetrics` interface from types.ts
  - Consolidated DEFAULT_LOCATION: now single source of truth in geocoding.ts
  - route.ts imports DEFAULT_LOCATION instead of defining own constants
- **DOCUMENTATION:** Added File Organization table and Import Guidelines
- **CLARIFICATION:** Added note that "Outdoor Alert" UI name maps to internal `shepherd` key

### v3.5 (January 27, 2026)
- **CRITICAL FIX:** Added `getEasternHour()` to fix timezone bug for non-ET users
  - API data is in America/New_York timezone, but `new Date().getHours()` uses browser timezone
  - Users in PST/CST/MST were seeing wrong hourly data (off by 1-3 hours)
  - Now all hourly index calculations use `getEasternHour()` for correct ET hour
- Added `getEasternDateString()` for timezone-aware date matching
- Added empty array bounds checks to `findTodayDailyIndex()` and `findTodayHourlyIndex()`
- Deduplicated date utilities in `page.tsx` and `WeatherDetails.tsx` (now import from dateUtils)
- Updated `taskScores.ts` to re-export `getEasternHour`

### v3.4 (January 26, 2026)
- Created centralized `dateUtils.ts` for date handling
- Re-exported date utilities from `taskScores.ts` for UI components
- Added comprehensive documentation

### v3.3 (January 26, 2026)
- **CRITICAL FIX:** Forecast analysis now accounts for `past_days=2` offset
- **CRITICAL FIX:** `precipProbability` reads from correct hourly index
- **FIX:** Snowfall converted from cm to inches in `weather.ts`
- Added `findTodayDailyIndex()` and `findTodayHourlyIndex()` helpers

### v3.2 (January 2026)
- Added forecast awareness (snow warnings)
- Recalibrated Keeper's Gauge: temperature check before dew point
- Recalibrated Sower's Index: 40°F soil OK for cool-season crops
- Stricter Builder's Grade cold penalties

### v3.1 (January 2026)
- Fixed floating point display (Math.round everywhere)
- Added winter condition detection
- Improved ice risk analysis

### v3.0 (January 2026)
- Complete refactor with TypeScript
- Added Extended Metrics calculation
- Four task scores implemented
- Native Pulse stratification tracker added

---

*This document should be updated whenever logic changes are made to the almanac system.*
