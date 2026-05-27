# Data Schema Documentation

This document describes the structure and requirements for all JSON data files in the `/data/` directory.

---

## Existing Files

### `events.json`

**Purpose:** Complete event calendar for 2026 America 250 programming

**Structure:**

```typescript
{
  events: Array<{
    id: string // Unique identifier (kebab-case)
    title: string // Event name
    date: string // Start date (YYYY-MM-DD)
    endDate: string | null // End date for multi-day events
    time: string // Time or time range (e.g., "2:00 PM")
    type: 'new' | 'enhanced' | 'recurring' | 'milestone'
    category: 'digital' | 'lecture' | 'festival' | 'signature' | 'seasonal'
    description: string // Full event description (2-3 sentences)
    speaker?: string // Speaker name (for lectures)
    speakerTitle?: string // Speaker affiliation or role
    ticketUrl?: string | null // Link to ticket purchase
    requiresTicket: boolean // Whether admission required
    featured: boolean // Show in featured section
  }>
}
```

**Validation:**

- `date` must be >= "2026-03-04" and <= "2026-12-31"
- `endDate` must be >= `date` if provided
- `category` must match type (lecture → lecture category expected)
- `requiresTicket` should be true for paid events

**Example:**

```json
{
  "id": "colonial-independence-day",
  "title": "Colonial Independence Day",
  "date": "2026-07-04",
  "endDate": null,
  "time": "10:00 AM - 4:00 PM",
  "type": "new",
  "category": "signature",
  "description": "America's 250th birthday at Rocky Mount...",
  "requiresTicket": true,
  "featured": true
}
```

---

### `lectures.json`

**Purpose:** Detailed lecture series programming with speaker bios

**Structure:**

```typescript
{
  series: {
    title: string               // Series name
    subtitle: string            // Series tagline
    description: string         // Series overview
    year: number                // Year (2026)
  }
  lectures: Array<{
    id: number                  // Sequential ID (1-6)
    title: string               // Lecture title
    date: string                // Date (YYYY-MM-DD)
    time: string                // Time (HH:MM AM/PM)
    speaker: {
      name: string              // Full name
      title: string             // Job title
      institution: string       // Organization/university
      bio: string               // 2-3 sentence biography
      portraying?: string       // Character name (for living history)
    }
    description: string         // Lecture description (3+ sentences)
    topics: string[]            // Topic list (3-5 items)
    format?: string             // Format (e.g., "First-person interpretation")
    note?: string               // Additional notes
  }>
  additionalProgramming?: {
    title: string
    date: string
    endDate: string
    speaker: object
    description: string
    note: string
  }
}
```

**Validation:**

- `id` must be sequential starting from 1
- `date` format must be YYYY-MM-DD
- `topics` should have 3-5 items
- `bio` should be 2-3 sentences

**Example:**

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
    "bio": "Dr. James P. Byrd is a professor at Vanderbilt Divinity School..."
  },
  "description": "Explore how faith shaped life on the Tennessee frontier...",
  "topics": ["Religious diversity on the frontier", "The role of churches in frontier communities"]
}
```

---

### `siteInfo.json`

**Purpose:** Core information about Rocky Mount State Historic Site

**Structure:**

```typescript
{
  site: {
    name: string                // "Rocky Mount State Historic Site"
    tagline: string             // "Tennessee Starts Here"
    established: string         // Year founded
    territorialCapital?: {
      start: number             // Year as capital
      end: number
      description: string
    }
  }

  location: {
    address: {
      street: string
      city: string
      state: string
      zip: string
      county: string
    }
    coordinates: {
      lat: number               // Latitude
      lng: number               // Longitude
    }
    directions: string          // Driving directions summary
    drivingDistances: Array<{
      city: string              // "Johnson City, TN"
      miles: number             // Distance in miles
      time: string              // "25 min"
      route: string             // "US-23 North"
    }>
  }

  contact: {
    phone: string               // "(423) 538-7396"
    email: string               // "rockymountmuseum@gmail.com"
    website: string             // "https://rockymountmuseum.com"
    social: {
      facebook: string          // Username (without URL)
      instagram: string
      tiktok: string
    }
  }

  hours: {
    regular: {
      monday: string            // "Closed" or "HH:MM AM/PM - HH:MM AM/PM"
      tuesday: string
      wednesday: string
      thursday: string
      friday: string
      saturday: string
      sunday: string
    }
    formatted: {
      days: string              // "Wednesday - Saturday"
      time: string              // "10am - 5pm"
      short: string             // "Wed-Sat 10am-5pm"
    }
    season: string              // Note on seasonal hours
    seasonNote: string          // Additional seasonal context
    tourSchedule: string        // "Hourly"
    lastTour: string            // "4:00 PM"
    tourNote: string            // Tour scheduling details
    note: string                // General hours note
  }

  admissionIncludes: string[]   // What admission includes (e.g., "Guided living history tour")

  admission: {
    adults: { price: number, label: string }
    seniors: { price: number, label: string }
    children: { price: number, label: string }
    childrenFree: { price: number, label: string }
    groups?: {
      note: string              // "Groups of 10 or more, please call"
    }
    note: string                // Additional pricing notes
  }

  whatToExpect: {
    tourDuration: string        // "Approximately 1 hour"
    features: string[]          // What to see/do
    accessibility: {
      summary: string           // Overview of accessibility options
      museumGallery: {
        name: string            // "Museum Gallery Tour"
        description: string     // Tour description
        adaCompliant: boolean
        features: string[]      // Accessibility features
      }
      historicSiteTour: {
        name: string            // "Historic Site Tour"
        description: string     // Tour description
        adaCompliant: boolean
        features: string[]      // Accessibility features/limitations
        note?: string           // Additional notes
      }
    }
    recommendations: string[]   // Tips for visitors
  }

  sisterSites: Array<{
    name: string                // Site name
    city: string                // City location
    miles: number               // Distance in miles
    time: string                // Drive time
    description: string         // Site description
    website: string             // Site URL
  }>

  nearbyAttractions: Array<{
    name: string
    distance: string            // "15 minutes"
    description: string         // Attraction description
  }>

  first250: {
    program: string             // "First 250"
    description: string
    enrollmentStart: string     // YYYY-MM-DD
    enrollmentEnd: string       // YYYY-MM-DD
    goal: number                // 250
    ceremony: string            // YYYY-MM-DD
    benefits: string[]          // Program benefits
    tiers: Array<{
      name: string
      price: number
      benefits: string[]
    }>
  }

  america250: {
    year: number                // 2026
    significance: string
    tn230: {
      date: string              // YYYY-MM-DD
      significance: string
    }
    rockymountRole: string
  }

  historicalFigures: Array<{
    id: string                  // Unique identifier (e.g., "williamBlount")
    name: string                // Full name
    title: string               // Historical title/position
    years: string               // Active years (e.g., "1790–1796")
    hook: string                // Brief compelling summary
    highlight: string           // Key distinction (e.g., "Constitution Signer")
    details: string[]           // Detailed bullet points
  }>
}
```

---

### `enrollment.json`

**Purpose:** Track First 250 enrollment progress

**Structure:**

```typescript
{
  currentEnrolled: number // Current enrollment count
  totalSpots: number // 250
  note: string // Update instructions
}
```

**Example:**

```json
{
  "currentEnrolled": 147,
  "totalSpots": 250,
  "note": "Update this file when enrollment changes. All pages pull from here."
}
```

---

## New Files (To Be Created)

### `staff.json` [PRIORITY 1]

**Purpose:** Leadership and staff directory

**Structure:**

```typescript
{
  director: {
    name: string
    title: string               // "Executive Director"
    bio: string                 // 2-3 sentences
    email: string
    phone: string
    since?: number              // Year joined
    photo?: string              // Image URL or file path
  }

  board: Array<{
    name: string
    title: string               // "Board Member"
    role: string                // "Treasurer", "Secretary", etc.
    affiliation?: string        // Organization/company
    bio?: string
    since?: number
    photo?: string
  }>

  staff: Array<{
    name: string
    role: string                // Job title
    department?: string         // Operations, Education, etc.
    bio?: string
    email?: string
    phone?: string
    since?: number
    photo?: string
  }>

  metadata?: {
    lastUpdated: string         // ISO 8601 timestamp
    version: string             // Semantic versioning
  }
}
```

---

### `faqs.json` [PRIORITY 1]

**Purpose:** Comprehensive FAQ content

**Structure:**

```typescript
{
  categories: {
    [key: string]: {            // "visiting", "first250", "tickets", etc.
      title: string             // Display name
      icon?: string             // Icon name or emoji
      description?: string      // Category description
      questions: Array<{
        id: string              // Unique ID (e.g., "v1", "f1")
        question: string        // Question text
        answer: string          // Answer (can include markdown)
        related?: string[]      // Related question IDs
        keywords?: string[]     // Search keywords
      }>
    }
  }

  metadata?: {
    lastUpdated: string
    version: string
  }
}
```

**Required Categories:**

- `visiting` — General visit FAQs
- `first250` — First 250 program FAQs
- `tickets` — Tickets and pricing
- `groups` — Group visits
- `accessibility` — ADA/accessibility
- `other` — General questions

---

### `accessibility.json` [PRIORITY 1]

**Purpose:** Detailed accessibility and ADA compliance information

**Structure:**

```typescript
{
  parking: {
    available: boolean
    accessible_spaces: number   // ADA-compliant spaces
    distance_to_entrance: string // "50 feet"
    surface: string             // "paved" or "gravel"
    fee: boolean
    note?: string
  }

  wheelchair_access: {
    main_house: {
      accessible: boolean
      access_type: string       // "ramp", "door", etc.
      note?: string
    }
    outbuildings: {
      accessible: boolean
      note: string              // Details on limitations
    }
    pathways: {
      mixed: boolean            // Combination of surfaces
      details: string
    }
  }

  restrooms: {
    location: string
    accessible: boolean
    ada_compliant: boolean
    note?: string
  }

  service_animals: {
    welcome: boolean
    requires_documentation: boolean
    note?: string
  }

  mobility_aids: {
    wheelchairs: boolean
    walkers: boolean
    canes: boolean
  }

  other_accommodations: string[]  // ["Seating available", "Shaded rest areas"]

  contact_for_accommodations: {
    phone: string
    email: string
    advance_notice: string      // "Recommended for special needs"
  }

  metadata?: {
    lastUpdated: string
    version: string
  }
}
```

---

### `memberships.json` [PRIORITY 2]

**Purpose:** Membership and ticket tier information

**Structure:**

```typescript
{
  annual_passes: Array<{
    id: string                  // "annual-individual"
    name: string
    price: number               // USD
    currency: string            // "USD"
    duration: string            // "12 months"
    member_count?: number       // For family passes
    benefits: string[]
    renewal_date?: string
    restrictions?: string[]
  }>

  group_rates: {
    minimum_size: number        // 10
    pricing_model: string       // "per-person" or "flat-rate"
    base_price?: number
    per_person_rate?: number
    contact: string             // Phone
    email?: string
    note: string
    advance_notice: string      // "2-4 weeks recommended"
  }

  educational_rates: {
    available: boolean
    school_groups: boolean
    university_groups: boolean
    contact: string
    email: string
    advance_notice: string
    discount_percent?: number
  }

  first250: Array<{
    id: string
    name: string
    price: number
    benefits: string[]
    enrollment_deadline: string // YYYY-MM-DD
  }>

  metadata?: {
    lastUpdated: string
    version: string
  }
}
```

---

### `opportunities.json` [PRIORITY 2]

**Purpose:** Volunteer and employment opportunities

**Structure:**

```typescript
{
  volunteer: {
    description: string
    contact_email: string
    contact_phone: string

    positions: Array<{
      id: string
      title: string
      description: string       // Full job description
      requirements: string[]    // Required skills/qualifications
      responsibilities: string[]
      time_commitment: string   // "Weekends (flexible)"
      application_process: string
      active: boolean
    }>
  }

  employment: {
    description: string
    contact_email: string
    contact_phone: string

    positions: Array<{
      id: string
      title: string
      department: string
      description: string
      requirements: string[]
      salary_range?: string     // Optional
      hours: string             // "Full-time", "Part-time"
      posted_date: string       // YYYY-MM-DD
      application_deadline?: string
      active: boolean
    }>
  }

  metadata?: {
    lastUpdated: string
    version: string
  }
}
```

---

### `education.json` [PRIORITY 2]

**Purpose:** School and educational programs

**Structure:**

```typescript
{
  programs: Array<{
    id: string
    name: string
    grade_levels: string[]      // ["K-5", "6-8", "9-12"]
    duration: string            // "90 minutes"
    group_size: {
      minimum: number
      maximum: number
      recommended: number
    }
    description: string         // Full program description
    learning_objectives: string[]
    topics: string[]
    activities: string[]        // What students do
    cost_per_student?: number
    total_cost?: number
    includes: string[]          // What's included (tour, materials, etc.)
    requirements: string[]      // Student requirements
    advanced_notice: string     // "2-4 weeks"
    active: boolean
  }>

  booking: {
    contact_email: string
    contact_phone: string
    online_booking: boolean
    booking_url?: string
    advance_notice_required: string // "2-4 weeks recommended"
    cancellation_policy: string
  }

  field_trips: {
    description: string
    available: boolean
    contact: string
  }

  metadata?: {
    lastUpdated: string
    version: string
  }
}
```

---

## Common Fields

### Timestamps

All files should include optional metadata:

```json
{
  "metadata": {
    "lastUpdated": "2026-01-28T15:30:00Z",
    "version": "1.0.0",
    "maintainer": "email@rockymountmuseum.com"
  }
}
```

### Pricing

All prices in USD (no currency symbol in JSON):

```json
{
  "price": 12,
  "currency": "USD"
}
```

### Dates

Use ISO 8601 format: `YYYY-MM-DD`
For timestamps: `YYYY-MM-DDTHH:MM:SSZ`

### Phone Numbers

Store in E.164 format preferred, but display format acceptable:

- Preferred: "+14235387396"
- Acceptable: "(423) 538-7396"

---

## Validation Rules

### For All Files

- Valid JSON syntax (run `npm run build` to check)
- No trailing commas
- All required fields present
- No unused fields

### For Dates

- Must be valid dates in format `YYYY-MM-DD`
- Future dates only (for events, programs)
- `startDate` ≤ `endDate` when both present

### For Prices

- Must be >= 0
- Should be whole numbers or .00/.50 only
- Groups of 10+: price must be documented

### For Contact Info

- Email must be valid format
- Phone must be valid format
- At least one contact method required

---

## Adding New Files

1. Create file in `/data/` directory
2. Validate with `npm run build`
3. Document schema above
4. Reference in `/data/SCHEMA.md`
5. Add to website's data loader

---

## Updating Files

When modifying any JSON file:

1. Increment `metadata.version` (semver)
2. Update `metadata.lastUpdated` to current ISO timestamp
3. Test with `npm run build`
4. Commit with clear message describing changes
5. Deploy to production

---

## API Usage (in React Components)

```typescript
import events from '@/data/events.json'
import staff from '@/data/staff.json'
import faqs from '@/data/faqs.json'

export default function EventsPage() {
  return (
    <div>
      {events.events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
```

---

_Last updated: 2026-01-29_
