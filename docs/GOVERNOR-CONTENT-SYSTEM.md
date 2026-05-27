# Governor's View Content System

**Version:** 1.0
**Created:** January 2026
**Purpose:** Content strategies for Governor's View improvements — TL;DR summaries and Planning Intelligence

---

## Overview

This document defines the content systems for two Governor's View enhancements:

1. **TL;DR Summary** — One-sentence verdict before the full 200-300 word briefing
2. **Planning Intelligence** — Two-line visitor planning section below brass instruments

Both maintain the heritage brand voice (period-appropriate language) while delivering modern clarity for visitors planning their day.

---

## Core Principles

### 1. Heritage Tone + Modern Clarity

**What This Means:**

- Use period-appropriate vocabulary (favorable, concerning, agreeable, temperate)
- Avoid historically inaccurate terms (never "safe," "dangerous," "optimal")
- Prioritize visitor actionability over atmospheric language
- 8th-grade reading level minimum

**Example (Good):**

```
SUMMARY: Favorable conditions - clear, mild, no concerns
```

**Example (Poor):**

```
SUMMARY: Meteorologically propitious with negligible precipitation probability
```

### 2. Visitor-First Language

**What This Means:**

- Every statement answers: "Should I visit today?"
- Focus on comfort and safety, not farming conditions
- Lead with what matters most to tourists (outdoor touring, walking, photo opportunities)
- Be specific (not "bad weather" but "rain expected this afternoon")

### 3. Consistency Across Views

**What This Means:**

- TL;DR and Planning Intelligence must align with full Governor's Briefing tone
- Share vocabulary (if briefing says "favorable," summary says "favorable")
- Maintain period-appropriate metaphors (instruments, glass/barometer, conditions)

---

## TASK 1: TL;DR Summary System

### Format

```
SUMMARY: [verdict] - [key detail]
```

**Word Budget:** Maximum 15 words total
**Placement:** Top of Governor's Briefing, before full text
**Update Frequency:** Generated dynamically from weather data

### Verdict Options

The verdict must be a single word or two-word phrase chosen from this approved list:

| Verdict         | When To Use                                                                                       | Example                                    |
| --------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **Favorable**   | Clear or mostly clear skies, comfortable temps (55-75°F), light winds (<12 mph), no precipitation | 68°F, clear, no concerns                   |
| **Agreeable**   | Partly cloudy, comfortable temps (50-80°F), light winds, maybe traces of drizzle                  | 62°F, partly cloudy, light shower possible |
| **Temperate**   | Overcast, comfortable temps (45-80°F), moderate winds (12-18 mph), low precipitation risk         | 58°F, overcast, no rain expected           |
| **Concerning**  | Rain/snow/storms likely, extreme heat/cold (>85°F or <35°F), strong winds (18-25 mph)             | Afternoon rain, 82°F, bring water          |
| **Challenging** | Heavy precipitation (rain/snow), unsafe winds (>25 mph), dangerous temps (<25°F or >95°F)         | Heavy rain, 38°F, indoor tours advised     |
| **Hazardous**   | Thunderstorms, severe wind, extreme heat/cold, advisory/warning conditions                        | Thunderstorms likely, lightning risk       |

### Key Detail Options

After the verdict, include ONE key detail from this priority list:

**Priority 1 (Safety Concerns):**

- Active thunderstorm warnings/advisories
- Severe wind (gusts >35 mph)
- Extreme heat (>95°F) or extreme cold (<20°F)
- Heavy precipitation (>0.5" expected)

**Priority 2 (Comfort/Planning):**

- Current temp + high/low for day
- Precipitation type + probability
- Notable wind conditions (strong/gusty)
- Unusual conditions (first freeze, heat wave)

**Priority 3 (Minor Details):**

- Cloud cover changes
- Humidity levels
- UV index (high)

### Example TL;DR Summaries

**Excellent Days (3 examples):**

```
SUMMARY: Favorable conditions - 68°F, clear, no concerns
SUMMARY: Favorable touring day - mild 71°F, light clouds, dry
SUMMARY: Agreeable conditions - 65°F, partly sunny, pleasant breeze
```

**Good Days (3 examples):**

```
SUMMARY: Temperate touring weather - 59°F, overcast, no rain
SUMMARY: Agreeable day - 72°F, mostly cloudy, light shower possible
SUMMARY: Favorable morning conditions - 54°F, clear, warming to 68°F
```

**Fair Days (3 examples):**

```
SUMMARY: Concerning afternoon ahead - 82°F by 2 PM, bring water
SUMMARY: Unsettled conditions - rain likely this afternoon, 55°F
SUMMARY: Challenging morning - fog clearing by 10 AM, 48°F
```

**Poor Days (3 examples):**

```
SUMMARY: Challenging conditions - rain all day, 38°F, indoor tours advised
SUMMARY: Hazardous evening - thunderstorms expected 4-8 PM, lightning risk
SUMMARY: Concerning day - heavy snow, 28°F, roads may be difficult
```

**Cold Days (3 examples):**

```
SUMMARY: Cold but clear - 32°F, no precipitation, bundle up
SUMMARY: Freezing conditions - 18°F, clear, dangerous wind chill
SUMMARY: Frost risk tonight - 28°F, clear, cover sensitive plants
```

**Hot Days (3 examples):**

```
SUMMARY: Hot touring day - 91°F expected, high UV, seek shade
SUMMARY: Favorable morning - 88°F expected, clear, heat risk afternoon
SUMMARY: Hazardous heat - 96°F forecast, drink water, limit outdoor time
```

### Generation Logic

```typescript
function generateTLDRSummary(weather: WeatherData): string {
  const verdict = getVerdictFromConditions(weather)
  const keyDetail = getKeyDetail(weather, verdict)

  // Ensure total is <= 15 words
  const summary = `SUMMARY: ${verdict} - ${keyDetail}`
  return summary.split(' ').length <= 15 ? summary : truncate(summary)
}
```

### Tone Notes

- Verdicts should be **conversational, not clinical**
- Use actual temperatures/conditions (not "cool" but "54°F, clear")
- Avoid redundancy (don't say "clear" twice)
- If multiple concerns exist, lead with the most urgent (safety > comfort > minor)
- Never use relative language ("somewhat," "kind of," "pretty")

---

## TASK 2: Planning Intelligence Section

### Component Spec

**Visual Layout:**

```
┌──────────────────────────────┐
│ TODAY'S VISITOR OUTLOOK      │
├──────────────────────────────┤
│ [Icon] [Status] - [Verdict]  │
│ [Key Detail for Planning]    │
└──────────────────────────────┘
```

**Placement:** Below brass instruments (thermometer, barometer, weathervane)
**Line Budget:** Exactly 2 lines
**Update Frequency:** Generated dynamically from weather data

### Status Icons

| Icon             | Condition                    | Example                                |
| ---------------- | ---------------------------- | -------------------------------------- |
| 🟢 Green circle  | Perfect/Favorable conditions | Clear, comfortable temp, dry           |
| 🟡 Yellow circle | Good/Agreeable conditions    | Mostly pleasant, minor concerns        |
| 🟠 Orange circle | Fair/Temperate conditions    | Overcast but manageable                |
| 🔴 Red circle    | Poor/Concerning conditions   | Rain, extreme temps, unsafe conditions |

### Line 1: Status + Verdict

**Format:** `[Icon] [Status Level] - [Condition Summary]`

**Status Levels (pick one):**

- Perfect conditions for touring
- Good conditions for touring
- Fair touring weather
- Challenging conditions
- Unsafe conditions (for visitor safety only)

**Condition Summary (be specific):**

- Temperature + trend (if notable)
- Primary weather concern (or "clear")
- One special note (if applicable)

**Examples (Line 1):**

```
🟢 Perfect conditions for touring - 68°F, clear skies
🟡 Good conditions for touring - 72°F, mostly cloudy
🟠 Fair touring weather - warm afternoon ahead
🔴 Challenging conditions - rain expected all day
🔴 Unsafe conditions - severe thunderstorms this afternoon
```

### Line 2: Most Important Detail for Visitors

**Priority for Outdoor Touring (ranked):**

1. **Precipitation Reality**
   - "No rain through evening"
   - "Afternoon showers expected around 2 PM"
   - "Heavy rain likely, bring umbrella"

2. **Temperature Guidance**
   - "Perfect 68°F, no adjustments needed"
   - "82°F by 2 PM, bring water and hat"
   - "Cold at 35°F, dress in layers"

3. **Special Considerations**
   - "High UV index 8, sunscreen recommended"
   - "Strong winds 20-25 mph, keep loose items secured"
   - "Lightning risk 3-7 PM, stay indoors during storms"

4. **Time-Specific Guidance**
   - "Fog clearing by 10 AM"
   - "Best touring before 3 PM"
   - "Evening clearing, sunset at 5:15 PM"

**Examples (Line 2):**

```
No rain expected through evening

Warming to 82°F by afternoon, bring water

Light shower possible 1-3 PM, quick clearing

Heavy rain, indoor tours recommended

Lightning risk 4-8 PM, stay covered

Fog clears by 10 AM, clear afternoon

First freeze tonight: 28°F

High winds 22 mph, secure loose items
```

### Complete Examples

**Perfect Day:**

```
🟢 Perfect conditions for touring - 68°F, clear skies
No rain expected through evening
```

**Good Day:**

```
🟡 Good conditions for touring - 71°F, mostly sunny
Afternoon warmth: 76°F by 2 PM
```

**Fair Day:**

```
🟠 Fair touring weather - 59°F, overcast clearing
Light shower possible 1-3 PM, quick clearing
```

**Concerning Day:**

```
🔴 Challenging conditions - rain expected all day
Rain likely through evening, plan indoor activities
```

**Storm Day:**

```
🔴 Unsafe conditions - severe thunderstorms expected
Lightning risk 3-7 PM, stay indoors during storms
```

**Cold Day:**

```
🟠 Fair touring weather - chilly at 34°F
First freeze tonight: 28°F, dress warmly
```

**Hot Day:**

```
🟡 Good conditions for touring - hot at 88°F
Intense sun: bring water, seek shade midday
```

### Tone Guidelines

- **Line 1:** Upbeat, verdict-focused ("Perfect conditions")
- **Line 2:** Specific, actionable ("Afternoon showers expected around 2 PM")
- **Never apologetic** ("Unfortunately rain..." → "Rain expected...")
- **Lead with visitor benefit** (not "pressure dropping" but "clearing by 2 PM")
- **Be precise on time** ("afternoon" not exact; "2 PM" is exact and helpful)

---

## Weather Scenario Matrix

### Clear/Sunny Conditions

**Temperature: 55-75°F**

```
TL;DR: Favorable conditions - 68°F, clear, no concerns
Planning Intelligence:
🟢 Perfect conditions for touring - 68°F, clear skies
No rain expected through evening
```

**Temperature: 45-54°F**

```
TL;DR: Favorable touring weather - 52°F, clear, cool
Planning Intelligence:
🟡 Good conditions for touring - 52°F, clear but crisp
Layer up: cold in morning, warming to 62°F
```

**Temperature: 76-85°F**

```
TL;DR: Favorable day for visiting - 80°F, clear, sunny
Planning Intelligence:
🟡 Good conditions for touring - 80°F, clear and bright
Heat building: 85°F by 2 PM, bring water
```

**Temperature: 86-95°F**

```
TL;DR: Concerning afternoon - 92°F expected, heat advisory
Planning Intelligence:
🟠 Fair touring weather - intense heat at 92°F
High UV, seek shade: tour early morning or late afternoon
```

### Partly Cloudy Conditions

**Temperature: 55-75°F, No Rain**

```
TL;DR: Agreeable conditions - 65°F, partly cloudy, dry
Planning Intelligence:
🟡 Good conditions for touring - 65°F, mostly cloudy
Clearing trend: sunny by noon
```

**Temperature: 55-75°F, Light Precipitation Possible**

```
TL;DR: Agreeable day - 70°F, mixed clouds, possible drizzle
Planning Intelligence:
🟡 Good conditions for touring - 70°F, partly cloudy
Light shower possible 1-3 PM, quick clearing
```

### Overcast Conditions

**Temperature: 50-75°F, No Rain**

```
TL;DR: Temperate touring weather - 58°F, overcast, dry
Planning Intelligence:
🟠 Fair touring weather - 58°F, overcast
No rain expected, clearing possible later
```

**Temperature: 50-75°F, Drizzle/Light Rain**

```
TL;DR: Unsettled conditions - overcast, light rain, 62°F
Planning Intelligence:
🟠 Fair touring weather - drizzle possible, 62°F
Rain ending by afternoon, bring rain jacket
```

### Rain Conditions

**Light Rain (< 0.25")**

```
TL;DR: Concerning morning - light rain, 55°F, clearing later
Planning Intelligence:
🟠 Fair touring weather - light rain, 55°F
Rain clears by 2 PM, tour then or morning
```

**Moderate Rain (0.25-0.5")**

```
TL;DR: Challenging day - rain likely, 48°F, plan indoor
Planning Intelligence:
🔴 Challenging conditions - rain expected much of day
Rain continues through afternoon, indoor tours recommended
```

**Heavy Rain (> 0.5")**

```
TL;DR: Challenging conditions - heavy rain, 45°F, indoor advised
Planning Intelligence:
🔴 Challenging conditions - heavy rain all day
Prolonged rain: ground will be wet, indoor activities best
```

### Snow Conditions

**Light Snow Expected**

```
TL;DR: Challenging day - snow beginning, 28°F
Planning Intelligence:
🔴 Challenging conditions - snow likely, 28°F
Accumulation possible: roads may be difficult, dress warmly
```

**Heavy Snow Expected**

```
TL;DR: Hazardous conditions - heavy snow, 22°F, travel difficult
Planning Intelligence:
🔴 Unsafe conditions - heavy snow forecasted
Travel may be dangerous, please check road conditions
```

### Thunderstorm Conditions

**Thunderstorms Possible**

```
TL;DR: Hazardous afternoon - thunderstorms expected 4-8 PM
Planning Intelligence:
🔴 Unsafe conditions - severe thunderstorms expected
Lightning risk 4-8 PM, stay indoors during storms
```

**Thunderstorms Ongoing**

```
TL;DR: Hazardous conditions - thunderstorms active now
Planning Intelligence:
🔴 Unsafe conditions - active thunderstorms in area
Seek shelter immediately, stay indoors until all clear
```

### Extreme Heat

**90-95°F**

```
TL;DR: Concerning heat - 93°F expected, heat index higher
Planning Intelligence:
🟠 Fair touring weather - dangerous heat at 93°F
Heat index 98°F: tour early/late, drink water constantly
```

**95°F+**

```
TL;DR: Hazardous heat - 97°F, heat advisory in effect
Planning Intelligence:
🔴 Unsafe conditions - extreme heat 97°F
Consider postponing: heat advisory active, heat index dangerous
```

### Extreme Cold

**20-32°F**

```
TL;DR: Cold but clear - 24°F, no precipitation, bundle up
Planning Intelligence:
🟡 Good conditions for touring - cold at 24°F
Dress warmly: cold wind chill, tour midday for warmth
```

**Below 20°F**

```
TL;DR: Hazardous cold - 12°F, dangerous wind chill
Planning Intelligence:
🔴 Unsafe conditions - dangerous cold 12°F
Wind chill near 0°F: only short outdoor time advisable
```

### Wind Conditions

**Strong Wind (18-25 mph)**

```
TL;DR: Concerning day - strong winds 22 mph, 65°F
Planning Intelligence:
🟠 Fair touring weather - strong winds 22 mph
Secure loose items: excellent visibility but windy
```

**Dangerous Wind (> 25 mph)**

```
TL;DR: Hazardous conditions - dangerous winds 35+ mph
Planning Intelligence:
🔴 Unsafe conditions - dangerous winds 35+ mph gusting
Outdoor activity not advisable, seek indoor shelter
```

### Frost/Freeze Conditions

**Frost Risk Tonight (28-35°F)**

```
TL;DR: Cold night coming - frost likely, 30°F tonight
Planning Intelligence:
🟡 Good conditions for touring - cold risk overnight
First freeze warning: 28°F tonight, cover sensitive plants
```

**Freeze Warning (Below 28°F)**

```
TL;DR: Freezing conditions - freeze warning, 24°F tonight
Planning Intelligence:
🔴 Challenging conditions - freeze warning 24°F
Roads may ice overnight: caution if traveling after dark
```

---

## Decision Tree for Verdict Selection

```
START: Analyze current + next 24 hours

├─ SAFETY CONCERNS? (Storm, extreme wind, heat advisory)
│  └─→ HAZARDOUS (stop here)
│
├─ NEXT 24 HOURS: HEAVY RAIN or SNOW?
│  └─→ CHALLENGING (stop here)
│
├─ TEMPERATURE + COMFORT LEVEL?
│  ├─ 55-75°F + clear/partly cloudy + no rain?
│  │  └─→ FAVORABLE
│  ├─ 50-80°F + mostly pleasant + light rain possible?
│  │  └─→ AGREEABLE
│  ├─ 45-80°F + overcast + low rain risk?
│  │  └─→ TEMPERATE
│  ├─ 35-50°F or 80-90°F + light rain/overcast?
│  │  └─→ CONCERNING
│  └─ OTHER?
│     └─→ CONCERNING
│
└─ END: Return verdict with key detail
```

---

## Implementation Notes

### For Developers

**File to Edit:** `/lib/almanac/generateBriefing.ts`

**Functions to Add:**

```typescript
// Generate one-sentence TL;DR summary
export function generateTLDRSummary(weather: WeatherData): string {
  const verdict = determineVerdict(weather)
  const keyDetail = selectKeyDetail(weather, verdict)
  return buildSummaryString(verdict, keyDetail)
}

// Generate Planning Intelligence content
export function generatePlanningIntelligence(weather: WeatherData): {
  icon: string
  line1: string
  line2: string
} {
  const statusIcon = getStatusIcon(weather)
  const line1 = buildStatusLine(weather, statusIcon)
  const line2 = buildDetailLine(weather)
  return { icon: statusIcon, line1, line2 }
}
```

### For Designers

**TL;DR Placement:** Above Governor's Briefing text (inside GovernorsBriefing component)

```tsx
<div className="mb-6 p-4 bg-amber-100/50 border-l-4 border-amber-700">
  <p className="font-serif text-sm text-amber-900">{tldrSummary}</p>
</div>
```

**Planning Intelligence Placement:** Below brass instruments (new section in almanac page)

```tsx
<div className="grid grid-cols-1 gap-4 mb-8">
  <PlanningIntelligence weather={weather} />
</div>
```

---

## Tone Vocabulary Reference

### Approved Words & Phrases

**Verdicts & Status:**

- favorable, agreeable, temperate, concerning, challenging, hazardous
- perfect conditions, good conditions, fair weather
- conditions advise, advise caution, recommend

**Temperature Language:**

- dangerously cold, freezing, quite cold, cool but comfortable, moderate and pleasant, warm, hot, dangerously hot
- (avoid: frigid, scorching, chilly)

**Wind Language:**

- calm, light breeze, gentle breeze, moderate breeze, fresh breeze, strong wind, gale conditions
- (avoid: blustery, gusty as adjective before wind)

**Precipitation Language:**

- rain probable, likely precipitation, drizzle expected, downpour, light shower, heavy rain
- (avoid: wet, damp, moisture)

**Time References:**

- this afternoon, this evening, through evening, by 2 PM, clearing by morning
- (avoid: later, tonight without clock time)

**Action Words:**

- bring water, dress warmly, layer up, seek shade, stay indoors, use caution
- (avoid: recommend, suggest, consider)

---

## Maintenance Notes

### When to Update This Document

- After implementing TL;DR or Planning Intelligence features
- When brand voice changes (update vocabulary references)
- After receiving user feedback on wording
- When new weather scenarios emerge (add to matrix)

### Testing Checklist

- [ ] TL;DR summaries are always ≤15 words
- [ ] Planning Intelligence is exactly 2 lines
- [ ] All verdicts match approved list
- [ ] No STOP phrases from COPY.md appear
- [ ] Temperature mentions use °F (not Celsius)
- [ ] Times use 12-hour format (2 PM, not 14:00)
- [ ] All examples generate from actual weather data
- [ ] Heritage tone maintained (8th-grade reading level)
- [ ] Visitor benefit is clear in every line

---

## Related Documentation

- `docs/COPY.md` — Brand guidelines (vocabulary, STOP/START dictionary)
- `lib/almanac/generateBriefing.ts` — Current briefing generation logic
- `components/almanac/GovernorsBriefing.tsx` — Component structure
- `ALMANAC.md` — Feature overview and dependencies

---

_Created January 2026 | Dr. Jonas Lindström, Content Strategy_
