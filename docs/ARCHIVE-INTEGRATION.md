# Archive Integration - Phase 5.2

UI components for displaying primary source links in the almanac.

## Overview

This system creates natural, period-appropriate links from almanac weather content to historical documents in the evidence archive. The integration is designed to feel contextual and educational, not forced or spammy.

## Components

### PrimarySourceLink

**Location:** `/components/almanac/PrimarySourceLink.tsx`

**Purpose:** Small, inline link component for subtle primary source references.

**Usage:**

```tsx
import { PrimarySourceLink } from '@/components/almanac/PrimarySourceLink'

;<PrimarySourceLink
  quote="Blount to Knox on territorial agriculture, 1791"
  href="/evidence/documents/blount-knox-agriculture-1791"
  type="document"
/>
```

**Props:**

- `quote` (string) - Brief quote or description of the source
- `href` (string) - Full path to document or person page
- `linkText` (string, optional) - CTA text (default: "View Source")
- `type` ('document' | 'person', optional) - Type of source (default: 'document')
- `icon` (ReactNode, optional) - Custom icon override

**Design:**

- Parchment aesthetic matching almanac
- Small, non-intrusive
- Icon + quote + subtle arrow CTA
- Gold-leaf color scheme

**Where to use:**

- Moon phase guidance
- Task score cards (expanded view only)
- Weather condition descriptions
- Planting intelligence sections

---

### ArchiveLinkCard

**Location:** `/components/almanac/ArchiveLinkCard.tsx`

**Purpose:** Larger, featured card format for archive references.

**Usage:**

```tsx
import { ArchiveLinkCard } from '@/components/almanac/ArchiveLinkCard'

;<ArchiveLinkCard
  title="Governor Blount's Agricultural Report"
  description="Observations on crop yields and soil conditions in the Southwest Territory, 1791"
  href="/evidence/documents/blount-agricultural-report-1791"
  type="document"
  date="May 12, 1791"
  category="Agriculture"
/>
```

**Props:**

- `title` (string) - Card title
- `description` (string) - Brief description of the document/person
- `href` (string) - Full path to evidence page
- `type` ('document' | 'person') - Type of source
- `date` (string, optional) - Date for context
- `category` (string, optional) - Category tag
- `icon` (ReactNode, optional) - Custom icon override

**Design:**

- Matches Governor's Briefing aesthetic
- Gold gradient header bar
- Parchment background
- Hover effects with shadow
- Date and category metadata

**Where to use:**

- Farmer's Memory "From the Archive" section
- Dedicated archive callout sections
- Featured document highlights
- Seasonal reference boxes

---

## Archive Mapping System

**Location:** `/lib/almanac/archiveMapping.ts`

This module contains the mapping between weather conditions and relevant historical documents.

### Key Exports:

#### Document Collections

```typescript
AGRICULTURE_DOCUMENTS: ArchiveDocument[]
RIVER_DOCUMENTS: ArchiveDocument[]
WEATHER_DOCUMENTS: ArchiveDocument[]
CHEROKEE_DOCUMENTS: ArchiveDocument[]
TERRITORIAL_DOCUMENTS: ArchiveDocument[]
TRAVEL_DOCUMENTS: ArchiveDocument[]
```

#### Helper Functions

```typescript
// Get documents matching current conditions
getRelevantDocuments(conditions: {
  temperature: number
  month: number
  hasRain: boolean
  hasSnow: boolean
  windSpeed?: number
  taskScores?: {
    sower: number
    shepherd: number
    keeper: number
    builder: number
  }
}): ArchiveDocument[]

// Get documents by theme
getDocumentsByTheme(theme): ArchiveDocument[]

// Get a specific collection
getCollection(id: string): ArchiveCollection | undefined
```

### Document Structure

```typescript
interface ArchiveDocument {
  slug: string // Matches /evidence/documents/[slug]
  title: string // Display title
  context: string // Why this document is relevant
  date: string // Document date
  theme: string // Category
  triggers: ArchiveTrigger[] // When to show this link
}
```

### Trigger System

Documents include triggers that determine when they should be shown:

```typescript
interface ArchiveTrigger {
  temperature?: { min?: number; max?: number }
  precipitation?: 'any' | 'none' | 'rain' | 'snow'
  wind?: { min?: number; max?: number }
  months?: number[]
  season?: 'spring' | 'summer' | 'fall' | 'winter'
  riverCondition?: 'high' | 'low' | 'normal' | 'frozen'
  taskScore?: {
    type: 'sower' | 'shepherd' | 'keeper' | 'builder'
    threshold?: number
    operator?: 'above' | 'below'
  }
}
```

**Example:**

```typescript
{
  slug: 'knoxville-gazette-1792-04-14',
  title: 'Spring Planting Season',
  context: 'Frontier farmers planted corn, wheat, tobacco. This gazette describes spring cultivation.',
  date: '1792-04-14',
  theme: 'agriculture',
  triggers: [
    {
      months: [3, 4, 5],
      season: 'spring',
      temperature: { min: 45, max: 75 }
    },
    {
      taskScore: {
        type: 'sower',
        threshold: 60,
        operator: 'above'
      }
    }
  ]
}
```

---

## Integration Examples

### Farmer's Memory (Currently Active)

**File:** `/components/almanac/FarmerMemory.tsx`

Shows relevant historical documents based on current weather conditions.

```tsx
// Get relevant archive documents for current conditions
const relevantDocs = getRelevantDocuments({
  temperature,
  month,
  hasRain: false,
  hasSnow: false,
  windSpeed,
})

// Pick the first matching document
const featuredDoc = relevantDocs[0]

// Render featured document card
{
  featuredDoc && (
    <div className="p-4 border-t border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <History className="w-4 h-4 text-gold-leaf" />
        <h3 className="text-sm font-medium text-gold-leaf">From the Archive</h3>
      </div>
      <ArchiveLinkCard
        title={featuredDoc.title}
        description={featuredDoc.context}
        href={`/evidence/documents/${featuredDoc.slug}`}
        type="document"
        date={featuredDoc.date}
        category={featuredDoc.theme}
      />
    </div>
  )
}
```

### Future Integration Points

#### Moon Phase

Add inline source link for lunar planting traditions:

```tsx
{
  relevantDocs.length > 0 && (
    <PrimarySourceLink
      quote={relevantDocs[0].context}
      href={`/evidence/documents/${relevantDocs[0].slug}`}
      type="document"
    />
  )
}
```

#### Task Scores

Add contextual source links to individual task cards:

```tsx
// Filter for task-specific documents
const taskDocs = relevantDocs.filter((doc) =>
  doc.triggers.some((t) => t.taskScore?.type === 'sower')
)

{
  taskDocs.length > 0 && (
    <PrimarySourceLink
      quote={taskDocs[0].context}
      href={`/evidence/documents/${taskDocs[0].slug}`}
      type="document"
    />
  )
}
```

#### Weather Conditions

Add to current conditions display:

```tsx
const weatherDocs = getDocumentsByTheme('weather')

{
  weatherDocs.length > 0 && <ArchiveLinkCard {...weatherDocs[0]} />
}
```

---

## Design Principles

1. **Non-intrusive:** Links should feel natural, not forced
2. **Period-appropriate:** Visual design matches 1790s aesthetic
3. **Contextual:** Documents appear when weather conditions match their content
4. **Educational:** Links provide historical context without being preachy
5. **Mobile-friendly:** Components are responsive and touch-friendly

---

## Color Scheme

Matches almanac palette:

- Primary gold: `--color-gold-leaf` (#c5a059)
- Parchment text: `--color-almanac-parchment` (#f4ecd8)
- Background: Translucent parchment overlays
- Borders: Gold with 20-40% opacity
- Hover states: Increased gold saturation + shadows

---

## Adding New Documents

1. Add document metadata to `/lib/almanac/archiveMapping.ts`
2. Define appropriate triggers (temperature, season, task scores, etc.)
3. Ensure document exists at `/evidence/documents/[slug]`
4. Test that triggers work correctly in different weather conditions

**Example:**

```typescript
{
  slug: 'new-document-slug',
  title: 'Document Title',
  context: 'Brief explanation of why this is relevant',
  date: 'YYYY-MM-DD',
  theme: 'agriculture', // or weather, rivers, etc.
  triggers: [
    {
      months: [6, 7, 8],
      season: 'summer',
      temperature: { min: 75 }
    }
  ]
}
```

---

## Testing

**Manual testing checklist:**

1. Build succeeds: `npm run build`
2. Lint passes: `npm run lint`
3. Components render correctly in almanac
4. Links navigate to correct evidence pages
5. Responsive design works on mobile
6. Triggers activate correctly based on weather
7. No archive spam - links feel natural

**Test different conditions:**

- Spring day (March-May)
- Summer day (June-August)
- Fall day (September-November)
- Winter day (December-February)
- Rainy conditions
- High/low temperatures
- Different task scores

---

## Future Enhancements

Potential improvements for future phases:

1. **Personalization:** Remember which documents users have already viewed
2. **Related documents:** Show "You might also be interested in..." sections
3. **Seasonal collections:** Curated document sets for each season
4. **Interactive timeline:** Link weather patterns to historical events
5. **Cherokee seasonal calendar:** Integrate indigenous agricultural knowledge
6. **Archive stats:** Track which documents are most viewed from almanac

---

## Questions or Issues?

Contact the UI Integration Manager or Archive Mapping Manager for assistance with:

- Component usage
- Document mapping
- Trigger conditions
- Design patterns
- Integration bugs
