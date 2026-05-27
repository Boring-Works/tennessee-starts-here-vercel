# Governor's Content System — Implementation Guide

**For:** Next.js/TypeScript developers integrating TL;DR summaries and Planning Intelligence

---

## Quick Start

### 1. Import the Content Functions

```typescript
// app/(almanac)/almanac/page.tsx
import { generateTLDRSummary, generatePlanningIntelligence } from '@/lib/almanac/governorContent'
```

### 2. Generate Content in Governor View

```typescript
{view === 'governor' && (
  <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
    {/* ... alerts and instruments ... */}

    {/* NEW: Planning Intelligence Section */}
    {weather && (
      <PlanningIntelligence
        intelligence={generatePlanningIntelligence(weather)}
      />
    )}

    {/* UPDATED: Governor's Briefing with TL;DR */}
    {weather && (
      <GovernorsBriefing
        briefing={generateGovernorsBriefing(weather)}
        tldr={generateTLDRSummary(weather)}
      />
    )}
  </div>
)}
```

---

## File Locations

| Purpose              | File                                        |
| -------------------- | ------------------------------------------- |
| Content functions    | `/lib/almanac/governorContent.ts`           |
| Component spec       | `/components/almanac/GovernorsBriefing.tsx` |
| Examples reference   | `/docs/GOVERNOR-CONTENT-EXAMPLES.md`        |
| System documentation | `/docs/GOVERNOR-CONTENT-SYSTEM.md`          |
| This guide           | `/docs/GOVERNOR-IMPLEMENTATION-GUIDE.md`    |

---

## Component Updates Required

### 1. Update GovernorsBriefing Component

**File:** `/components/almanac/GovernorsBriefing.tsx`

**Add TL;DR above briefing text:**

```tsx
'use client'

interface GovernorsBriefingProps {
  briefing: string
  tldr?: string // NEW
}

export function GovernorsBriefing({ briefing, tldr }: GovernorsBriefingProps) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-cream border-4 border-amber-900 rounded-lg p-8 shadow-2xl">
      {/* ... header ... */}

      {/* NEW: TL;DR Summary */}
      {tldr && (
        <div className="mb-6 p-4 bg-amber-100/50 border-l-4 border-amber-700 rounded">
          <p className="font-serif text-sm italic text-amber-900">{tldr}</p>
        </div>
      )}

      {/* Existing briefing content */}
      <div className="prose prose-lg prose-amber max-w-none">
        <div className="font-serif leading-relaxed text-amber-900 whitespace-pre-wrap border-l-4 border-amber-300 pl-6 py-2">
          {briefing}
        </div>
      </div>

      {/* ... footer ... */}
    </div>
  )
}
```

### 2. Create PlanningIntelligence Component

**File:** `/components/almanac/PlanningIntelligence.tsx` (new)

```tsx
'use client'

import type { PlanningIntelligence } from '@/lib/almanac/governorContent'

interface PlanningIntelligenceProps {
  intelligence: PlanningIntelligence
}

export function PlanningIntelligence({ intelligence }: PlanningIntelligenceProps) {
  return (
    <div className="mb-8 bg-gradient-to-br from-cream to-amber-50 border-4 border-amber-700 rounded-lg p-6 shadow-lg">
      {/* Header */}
      <h3 className="text-sm font-serif font-bold text-amber-900 mb-4 uppercase tracking-wider">
        Today's Visitor Outlook
      </h3>

      {/* Content */}
      <div className="space-y-2">
        <p className="font-serif text-base text-amber-900">
          <span className="text-xl mr-2">{intelligence.icon}</span>
          {intelligence.line1}
        </p>
        <p className="font-serif text-sm text-amber-800 pl-6">{intelligence.line2}</p>
      </div>
    </div>
  )
}
```

### 3. Update Almanac Page Layout

**File:** `/app/(almanac)/almanac/page.tsx`

**In Governor view section (around line 772):**

```tsx
{view === 'governor' && (
  <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
    {/* Alerts */}
    <NWSAlertBanner ... />
    <LightningWatch ... />
    <StaleDataWarning ... />

    {/* Brass Instruments */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <BrassBarometer ... />
      <MercuryThermometer ... />
      <CopperWeathervane ... />
    </div>

    {/* NEW: Planning Intelligence */}
    {weather && (
      <PlanningIntelligence
        intelligence={generatePlanningIntelligence(weather)}
      />
    )}

    {/* Governor's Intelligence Briefing */}
    {weather && (
      <GovernorsBriefing
        briefing={generateGovernorsBriefing(weather)}
        tldr={generateTLDRSummary(weather)}
      />
    )}

    {/* Footer */}
    <PresentedByBlock ... />
  </div>
)}
```

### 4. Import in Almanac Page

**Top of page.tsx, add:**

```typescript
import { generateTLDRSummary, generatePlanningIntelligence } from '@/lib/almanac/governorContent'
import { PlanningIntelligence } from '@/components/almanac/PlanningIntelligence'
```

---

## Key Functions Reference

### generateTLDRSummary()

**Input:** `WeatherData` object
**Output:** String, format: `"SUMMARY: [verdict] - [key detail]"`
**Word Budget:** ≤15 words
**Example:** `"SUMMARY: Favorable conditions - 68°F, clear, no concerns"`

```typescript
const summary = generateTLDRSummary(weather)
// Returns: "SUMMARY: Favorable conditions - 68°F, clear, no concerns"
```

### generatePlanningIntelligence()

**Input:** `WeatherData` object
**Output:** Object with icon, line1, line2
**Word Budget:** Line 1: ~10 words, Line 2: ~8 words

```typescript
const planning = generatePlanningIntelligence(weather)
// Returns:
// {
//   icon: "🟢",
//   line1: "Perfect conditions for touring - 68°F, clear skies",
//   line2: "No rain expected through evening"
// }
```

---

## Verdict Reference

| Verdict         | When Used              | Icon | Example                     |
| --------------- | ---------------------- | ---- | --------------------------- |
| **Favorable**   | Clear/comfortable/dry  | 🟢   | 68°F, sunny, no rain        |
| **Agreeable**   | Partly cloudy/pleasant | 🟡   | 70°F, clouds, minor concern |
| **Temperate**   | Overcast/manageable    | 🟠   | 58°F, overcast, no rain     |
| **Concerning**  | Mixed issues present   | 🔴   | 82°F, rain possible         |
| **Challenging** | Multiple problems      | 🔴   | Heavy rain, 48°F            |
| **Hazardous**   | Safety concerns        | 🔴   | Thunderstorms, extreme heat |

---

## Testing Scenarios

### Test 1: Perfect Clear Day

```typescript
// Mock perfect day data
const weather = {
  current: {
    temperature: 68,
    precipitation: 0,
    windSpeed: 8,
    // ... other fields
  },
  hourly: {
    weatherCode: [0, 0, 0, 0, 0, 0, 0, 0, ...], // 0 = clear
    // ...
  },
  daily: {
    // ...
  }
}

const summary = generateTLDRSummary(weather)
// Expected: "SUMMARY: Favorable conditions - 68°F, clear, no concerns"

const planning = generatePlanningIntelligence(weather)
// Expected icon: 🟢
// Expected line1: "Perfect conditions for touring - 68°F, clear skies"
// Expected line2: "No rain expected through evening"
```

### Test 2: Rainy Day

```typescript
const weather = {
  current: {
    temperature: 48,
    precipitation: 0.75,
    windSpeed: 12,
  },
  hourly: {
    weatherCode: [61, 61, 61, 61, ...], // Rain
  },
  // ...
}

const summary = generateTLDRSummary(weather)
// Expected: Contains "Challenging" + rain detail

const planning = generatePlanningIntelligence(weather)
// Expected icon: 🔴
// Expected line1: Should indicate "rain expected"
// Expected line2: Should suggest indoor activities
```

### Test 3: Storm Coming

```typescript
const weather = {
  current: { temperature: 72 },
  hourly: {
    weatherCode: [3, 3, 3, 95, 95, 95, 4, 4, ...], // Storms starting hour 3
  },
  // ...
}

const summary = generateTLDRSummary(weather)
// Expected: "Hazardous" + "thunderstorms" mention

const planning = generatePlanningIntelligence(weather)
// Expected icon: 🔴
// Expected mention of "lightning risk" + time window
```

---

## Word Count Verification

### Ensure TL;DR <= 15 words

```typescript
function countWords(str: string): number {
  return str.trim().split(/\s+/).length
}

const summary = generateTLDRSummary(weather)
console.assert(
  countWords(summary) <= 15,
  `Summary exceeds 15 words: "${summary}" (${countWords(summary)} words)`
)
```

### Ensure Planning Lines Are Reasonable

```typescript
const planning = generatePlanningIntelligence(weather)
console.assert(planning.line1.split(/\s+/).length <= 15, `Line 1 too long: "${planning.line1}"`)
console.assert(planning.line2.split(/\s+/).length <= 15, `Line 2 too long: "${planning.line2}"`)
```

---

## Styling Notes

### TL;DR Summary Styling

- **Background:** Subtle, contrasting (amber-100/50)
- **Border:** Left border accent (amber-700)
- **Font:** Serif, small, italic
- **Color:** Amber-900 (text color consistent with briefing)
- **Spacing:** Padding 1rem, margin-bottom for separation

### Planning Intelligence Styling

- **Background:** Gradient cream → amber-50
- **Border:** 4px amber-900 (matches briefing)
- **Header:** Serif, bold, uppercase, tracking-wider
- **Icon:** Large (text-xl), emoji
- **Text:** Serif, amber-900 for line1, amber-800 for line2
- **Spacing:** Grid/space-y for line separation

---

## Accessibility Notes

- All color-coded information (icons) should be accompanied by text
- Use semantic HTML (no divs for content structure)
- Planning Intelligence should be a `<section>` with `aria-label="Today's Visitor Outlook"`
- Ensure contrast ratios meet WCAG AA standards (amber on cream checked)

---

## Deployment Checklist

Before pushing to production:

- [ ] Both functions generate content without errors
- [ ] TL;DR summaries are always ≤15 words
- [ ] Planning Intelligence lines are readable length
- [ ] All weather scenarios produce appropriate verdicts
- [ ] No console errors in browser DevTools
- [ ] Responsive design tested on mobile (iOS/Android)
- [ ] Brass instruments render above Planning Intelligence
- [ ] Planning Intelligence renders above briefing
- [ ] No build warnings in `npm run build`
- [ ] ESLint passes: `npm run lint`

---

## Troubleshooting

### TL;DR too long

**Problem:** Summary exceeds 15 words

**Solution:** Edit `/lib/almanac/governorContent.ts`, function `selectKeyDetail()`. Shorten the detail string or use abbreviations.

### Wrong icon for conditions

**Problem:** Icon doesn't match expected severity

**Solution:** Check `determineVerdict()` and `getStatusIcon()` logic. Verify weather code ranges in comment at bottom of file.

### Planning line is confusing

**Problem:** Line 2 doesn't clearly guide visitor

**Solution:** Edit `/lib/almanac/governorContent.ts`, function `buildDetailLine()`. Add specific time or clearer action language.

### Not using period-appropriate language

**Problem:** Content sounds too modern

**Solution:** Search `/lib/almanac/governorContent.ts` for modern terms. Replace with approved vocabulary from `docs/GOVERNOR-CONTENT-SYSTEM.md` under "Tone Vocabulary Reference."

---

## Related Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Type check
npm run type-check

# Test the Governor's page
open http://localhost:3000/almanac
# Click "View Governor's Briefing" or similar toggle
```

---

## Support & Questions

For content tone/wording: See `docs/GOVERNOR-CONTENT-SYSTEM.md`
For weather scenario examples: See `docs/GOVERNOR-CONTENT-EXAMPLES.md`
For brand guidelines: See `docs/COPY.md`
For TypeScript types: See `lib/almanac/types.ts`

---

_Created January 2026 | Implementation Guide v1.0_
