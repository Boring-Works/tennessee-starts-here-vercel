# Data Schema Reference

**Rocky Mount State Historic Site - Tennessee Starts Here**

Quick reference for all JSON data file structures.

---

## operatingSchedule.json

**Purpose:** Year-agnostic configuration for hours, seasons, closures, and pricing
**Location:** `data/config/operatingSchedule.json`
**Update Frequency:** Annually (January)

### Key Fields

```typescript
{
  currentYear: number              // 2026, 2027, etc.
  operatingDays: string[]          // ["wednesday", "thursday", "friday", "saturday"]
  hours: {
    standard: {
      open: string                 // "10:00 AM"
      close: string                // "5:00 PM"
      lastTourStart: string        // "4:00 PM"
    }
    tourInterval: number           // 60 minutes
  }
  seasonalWindow: {
    year: number
    startDate: string              // "2026-03-04"
    startPattern: string           // "first-wednesday-march"
    endDate: string                // "2026-12-15"
    endPattern: string             // "second-wednesday-december"
  }
  nextYearTemplate: {              // Copy to seasonalWindow next year
    year: number
    startPattern: string
    endPattern: string
  }
  closures: {
    annual: Array<{
      id: string
      name: string
      recurring: boolean
      recurrencePattern: string    // "fourth-thursday-november"
      startDate: string
      endDate: string
    }>
    oneOff: Array<{
      id: string
      name: string
      startDate: string
      endDate: string
    }>
  }
  pricingSchedule: {
    tiers: Array<{
      id: string                   // "adult", "senior", "child"
      label: string
      ageMin: number
      ageMax: number | null
      priceUSD: number
      validFrom: string            // "2026-01-01"
      validUntil: string           // "2026-12-31"
      status: "active" | "inactive"
    }>
  }
}
```

### Recurrence Patterns

Common patterns used throughout:

```
first-wednesday-march       → March 1-7 (first Wed)
second-wednesday-december   → December 1-14 (second Wed)
fourth-thursday-november    → November 22-28 (4th Thu = Thanksgiving)
july-4-every-year           → July 4 (fixed)
december-21 to january-5    → Fixed Dec 21 - Jan 5 (spans year boundary)
```

### Usage Example

```typescript
import schedule from '@/data/config/operatingSchedule.json'

// Check if open today
function isSiteOpen(date: Date): boolean {
  const dayName = getDayName(date)
  return schedule.operatingDays.includes(dayName)
}

// Get current price
function getPrice(age: number): number {
  const tier = schedule.pricingSchedule.tiers.find(
    (t) =>
      new Date() >= new Date(t.validFrom) &&
      new Date() <= new Date(t.validUntil) &&
      age >= t.ageMin &&
      age <= (t.ageMax || 999)
  )
  return tier?.priceUSD ?? 0
}
```

---

## events.json

**Purpose:** Event calendar for the year
**Location:** `data/events.json`
**Update Frequency:** Annually (January)

### Structure

```typescript
{
  events: Array<{
    id: string // Unique ID (kebab-case)
    title: string // Event name
    date: string // Start date (YYYY-MM-DD)
    endDate: string | null // End date for multi-day
    time: string // "10:00 AM - 4:00 PM"
    type: 'new' | 'enhanced' | 'recurring' | 'milestone'
    category: 'digital' | 'lecture' | 'festival' | 'signature' | 'seasonal'
    description: string // 2-3 sentences
    speaker?: string // For lectures
    speakerTitle?: string
    ticketUrl?: string | null // Link to booking
    requiresTicket: boolean
    featured: boolean // Show in featured
  }>
}
```

### Validation Rules

- `date` must be YYYY-MM-DD format
- `date` must be on Wed-Sat (not Sun-Mon-Tue)
- `date` must not fall during closures
- `endDate` must be >= `date` if present
- `type` should match event (lecture → lecture type)

### Example

```json
{
  "id": "colonial-independence-day",
  "title": "Colonial Independence Day",
  "date": "2026-07-04",
  "endDate": null,
  "time": "10:00 AM - 4:00 PM",
  "type": "signature",
  "category": "festival",
  "description": "America's 250th birthday celebration...",
  "requiresTicket": true,
  "featured": true
}
```

---

## lectures.json

**Purpose:** Lecture series with speaker details
**Location:** `data/lectures.json`
**Update Frequency:** Annually (January)

### Structure

```typescript
{
  series: {
    title: string
    subtitle: string
    description: string
    year: number // 2026
  }
  lectures: Array<{
    id: number // 1, 2, 3, etc. (sequential)
    title: string // Lecture title
    date: string // YYYY-MM-DD (must be Wed-Sat)
    time: string // HH:MM AM/PM format
    speaker: {
      name: string
      title: string // Professor, Dr., etc.
      institution: string // University/organization
      bio: string // 2-3 sentence biography
      portraying?: string // Character name if applicable
    }
    description: string // Full lecture description
    topics: string[] // 3-5 key topics
    format?: string // "First-person interpretation"
    note?: string
  }>
}
```

### Validation Rules

- `id` must be sequential (1, 2, 3, 4, 5, 6)
- `date` must be on Wed-Sat during season
- `topics` should have 3-5 items
- `bio` should be 2-3 sentences

### Example

```json
{
  "id": 1,
  "title": "Colonial Religion on the Frontier",
  "date": "2026-03-27",
  "time": "2:00 PM",
  "speaker": {
    "name": "Dr. James P. Byrd",
    "title": "Professor",
    "institution": "Vanderbilt University",
    "bio": "Dr. Byrd is a professor at Vanderbilt Divinity School..."
  },
  "description": "Explore how faith shaped life on the Tennessee frontier...",
  "topics": ["Religious diversity", "Frontier communities"]
}
```

---

## testimonials.json

**Purpose:** Visitor reviews and feedback
**Location:** `data/testimonials.json`
**Update Frequency:** Quarterly

### Structure

```typescript
{
  _meta: {
    description: string
    updated: string                // ISO date
    sources: string[]              // ["TripAdvisor", "Google Reviews"]
    policy: string                 // Only verified real testimonials
  }
  featured: Array<{
    id: string
    quote: string
    attribution: string            // Visitor name or "TripAdvisor reviewer"
    source: string                 // "TripAdvisor", "Google Reviews", "Facebook"
    sourceUrl: string | null       // Link to original review
    rating: number                 // 1-5 stars
    date: string | null            // ISO date if known
    tags: string[]                 // ["authenticity", "family"]
    usedOn: string[]               // Pages using this testimonial
  }>
  byCategory: {
    [key: string]: Array<{
      id: string
      quote: string
      attribution: string
      source: string
      rating: number
      tags: string[]
    }>
  }
  stats: {
    tripAdvisor: {
      rating: number               // 4.5
      totalReviews: number
      excellentPercent: number     // 78
    }
    google: {
      rating: number
      totalReviews: number | null
    }
  }
}
```

### Best Practices

- Only use verified real testimonials
- Update `stats` quarterly from live sources
- Add new featured quotes from recent reviews
- Categorize by experience type (family, authenticity, events, etc.)

---

## navigation.json

**Purpose:** Site navigation structure
**Location:** `data/navigation.json`
**Update Frequency:** Rarely (only if nav structure changes)

### Structure

```typescript
{
  mainNav: Array<{
    label: string                  // "Visit", "Events"
    href: string                   // "/visit", "/events"
    dropdown: Array<{
      label: string
      href: string
      description: string
      featured?: boolean           // Highlight in nav
      badge?: string               // "Limited", "New"
    }>
  }>
  utilityNav: Array<{
    label: string
    href: string
    external?: boolean
  }>
  footerNav: {
    [section: string]: Array<{     // "visit", "events", "discover"
      label: string
      href: string
      external?: boolean
    }>
  }
  mobileNav: {
    primaryCTA: { label, href }
    secondaryCTA: { label, href, external? }
  }
}
```

---

## siteInfo.json

**Purpose:** Core site information (location, hours, contact)
**Location:** `data/siteInfo.json`
**Update Frequency:** Rarely

### Main Sections

```typescript
{
  site: {
    name: string
    tagline: string
    established: string
    territorialCapital?: { start: number, end: number, description: string }
  }
  location: {
    address: { street, city, state, zip, county }
    coordinates: { lat, lng }
    directions: string
    drivingDistances: Array<{ city, miles, time, route }>
  }
  contact: {
    phone: string
    email: string
    website: string
    social: { facebook, instagram, tiktok }
  }
  admission: {
    adults, seniors, children, childrenFree: { price, label }
    groups?: { note }
    note: string
  }
  // ... and many more sections
}
```

**Note:** Pricing now lives in `operatingSchedule.json` instead. Keep `siteInfo.json` for historical info.

---

## experiences.json

**Purpose:** Tour types and visitor experience moments
**Location:** `data/experiences.json`
**Update Frequency:** Rarely

### Structure

```typescript
{
  experienceMoments: Array<{
    numeral: string                // "I", "II", "III"
    title: string
    description: string
    icon: string                   // Icon name
    category: string               // "immersion", "interpretation", "hands-on", "education"
  }>
  tourTypes: Array<{
    id: string
    name: string
    duration: string               // "30-45 minutes"
    description: string
    accessibility: string
    included: boolean
    requiresTicket?: boolean
  }>
  visitIncludes: Array<{
    icon: string
    title: string
    description: string
  }>
  highlights: string[]
}
```

---

## integrations.json

**Purpose:** External service configurations
**Location:** `data/integrations.json`
**Update Frequency:** As services change

### Structure

```typescript
{
  integrations: {
    [serviceName: string]: {
      name: string
      location: string             // Component path
      status: "active" | "partial" | "ready" | "planned"
      configured: boolean
      config: object               // Service-specific config
      priority: "high" | "medium" | "low" | "complete"
      notes: string
    }
  }
  environmentVariables: {
    configured: Array<{ name, service, status }>
    ready: Array<{ name, service, status }>
    future: Array<{ name, service, status }>
  }
}
```

### Common Services

- **fareHarbor** - Booking system (configured: true)
- **analytics** - GA4, Facebook Pixel, Vercel
- **reviews** - TripAdvisor, Google, Facebook
- **newsletter** - Email signup (configured: false)
- **weather** - AQICN, RainViewer, USGS, NWS

---

## timeline.json

**Purpose:** Historical events (primarily 1790-1796)
**Location:** `content/timeline-events.json`
**Update Frequency:** Never (historical record)

### Structure

```typescript
Array<{
  id: string // Unique ID
  date: string // YYYY-MM-DD
  title: string
  description: string
  documentId: string | null // Reference to source document
  type: 'proclamation' | 'letter' | 'treaty' | 'event' | 'newspaper' | 'speech'
  featured: boolean // Show in featured view
}>
```

---

## Template Files

### template-events.json

**Purpose:** Base structure for recurring annual events
**Location:** `data/templates/template-events.json`
**Usage:** Copy events, update year in date fields

### Structure

```typescript
{
  recurringEvents: Array<{
    id: string
    title: string
    dateTemplate: string // "2026-07-04"
    dateFor2027: string // "2027-07-04"
    day: string // "Saturday"
    time: string
    type: string
    category: string
    description: string
    featured: boolean
    requiresTicket: boolean
    recurring: 'annual' | 'monthly'
    notes: string // "Adjust if doesn't fall on open day"
  }>
}
```

---

## Common Date Formats

All dates use ISO 8601 format:

- Dates: `YYYY-MM-DD` (2026-03-04)
- Times: `HH:MM AM/PM` (2:00 PM) or `HH:MM` (14:00)
- Timestamps: `YYYY-MM-DDTHH:MM:SSZ` (2026-01-30T16:35:00Z)

---

## Common Validation Rules

### Dates

- Must be valid calendar dates
- Must use format `YYYY-MM-DD`
- Start dates must be ≤ end dates
- Event dates should fall on open days (Wed-Sat)
- Event dates should not fall during closure windows

### Contact Info

- Email must be valid format
- Phone should be consistent format
- URLs must be valid and accessible
- At least one contact method required

### Pricing

- Prices in USD (no currency symbol)
- Prices ≥ 0
- Integer or .00/.50 only
- Groups pricing documented
- Age ranges non-overlapping

### Text Fields

- Descriptions: 2-3 sentences typical
- Titles: Concise, 5-10 words
- Bios: 2-3 sentences
- No Lorem ipsum or placeholder text

---

## Metadata Fields (All Files)

Every file should include:

```json
{
  "_meta": {
    "description": "What this file contains",
    "updated": "2026-01-30",
    "version": "1.0.0",
    "lastUpdated": "2026-01-30T16:35:00Z"
  }
}
```

---

## Related Documentation

- **Full Analysis:** See `DATA-ARCHITECTURE-ANALYSIS.md`
- **Implementation:** See `IMPLEMENTATION-SUMMARY.md`
- **Maintenance:** See `MAINTENANCE-CHECKLIST.md`
- **Quick Start:** See `QUICK-START-GUIDE.md`

---

_Last updated: January 30, 2026_
