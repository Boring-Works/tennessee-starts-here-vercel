# TypeScript Types Guide

## Overview

The `types/` directory contains centralized TypeScript interfaces for all JSON data structures in the Tennessee Starts Here project. This ensures type safety across components and maintains a single source of truth for data shapes.

## File Structure

```
types/
├── index.ts          # Central re-export point (use this for imports)
├── data.ts           # Comprehensive data type definitions
├── events.ts         # Event filter type
└── evidence.ts       # Document location type
```

## Quick Import Patterns

### Pattern 1: Import Specific Types (Recommended)

```typescript
import type { NavItem, Testimonial, Event } from '@/types'

function MyComponent({ nav }: { nav: NavItem }) {
  return <div>{nav.label}</div>
}
```

### Pattern 2: Import All as Namespace

```typescript
import type * as DataTypes from '@/types'

function MyComponent({ data }: { data: DataTypes.Event }) {
  return <div>{data.title}</div>
}
```

### Pattern 3: Import Direct from data.ts (Advanced)

```typescript
import type { NavigationData, EventsData } from '@/types/data'

// For working with complete JSON file types
const nav: NavigationData = require('@/data/navigation.json')
```

## Data Type Categories

### 1. Navigation Types

For the site's navigation structure:

```typescript
import type { NavItem, NavDropdownItem, NavigationData } from '@/types'

// Single nav link
const link: NavItem = {
  label: 'Visit',
  href: '/visit',
  dropdown: [
    {
      label: 'Plan Your Visit',
      href: '/visit',
      description: 'Hours, admission & directions',
    },
  ],
}

// Load full navigation
const nav: NavigationData = require('@/data/navigation.json')
```

**Data file:** `/data/navigation.json`
**Used by:** Header, Footer, Mobile Menu

### 2. Testimonials Types

For visitor reviews and social proof:

```typescript
import type { Testimonial, TestimonialsData } from '@/types'

// Single testimonial
const review: Testimonial = {
  id: 'ta-teleported',
  quote: 'It was like you got teleported back in time...',
  attribution: 'Rocky Mount visitor',
  source: 'TripAdvisor',
  rating: 5,
}

// Load all testimonials
const testimonials: TestimonialsData = require('@/data/testimonials.json')
testimonials.featured.forEach((t) => console.log(t.quote))
```

**Data file:** `/data/testimonials.json`
**Used by:** TestimonialCarousel, ReviewCTA, Social Proof sections

### 3. Timeline Types

For historical events and milestones:

```typescript
import type { TimelineEvent, TimelineData } from '@/types'

// Single timeline event
const event: TimelineEvent = {
  year: '1790',
  title: 'Capital',
  text: 'Governor Blount made it the seat of government...',
  icon: 'building',
  highlight: true,
}

// Load timeline data
const timeline: TimelineData = require('@/data/timeline.json')
```

**Data file:** `/data/timeline.json`
**Used by:** Homepage story section, Historical timeline page

### 4. Experiences Types

For visitor activities and tour information:

```typescript
import type { ExperienceMoment, TourType, ExperiencesData } from '@/types'

// Experience moment
const experience: ExperienceMoment = {
  numeral: 'I',
  title: 'Stand on Historic Ground',
  description: 'Walk the same grounds...',
  icon: 'footprints',
  category: 'immersion',
}

// Tour type
const tour: TourType = {
  id: 'museum-gallery',
  name: 'Museum Gallery Tour',
  duration: '30-45 minutes',
  description: 'Self-guided exploration...',
  accessibility: 'Fully wheelchair accessible',
  included: true,
}
```

**Data file:** `/data/experiences.json`
**Used by:** Experience section, Tour information cards

### 5. Site Hours & Status Types

For calculating and displaying site operating status:

```typescript
import type { SiteStatus, SpecialHours, HoursConfig } from '@/types'
import { getSiteStatus } from '@/lib/siteHours'

// Get current status
const status: SiteStatus = getSiteStatus()
// {
//   isOpen: true,
//   reason: 'Open',
//   message: 'Open 10:00 AM-5:00 PM',
//   specialHours: undefined
// }

// Special event hours
const specialHours: SpecialHours = {
  opens: 18,
  closes: 21,
  reason: 'Special hours for Haunting on the Mount',
  eventTitle: 'Haunting on the Mount',
  replacesRegularHours: true,
}
```

**Used by:** SiteStatusBanner, Hours display, Booking flow
**Related:** `lib/siteHours.ts`

### 6. Site Info Types

For location, contact, and general site information:

```typescript
import type { SiteInfoData, Address, Coordinates } from '@/types'

// Load site info
const siteInfo: SiteInfoData = require('@/data/siteInfo.json')

const address: Address = siteInfo.location.address
// {
//   street: '200 Hyder Hill Road',
//   city: 'Piney Flats',
//   state: 'Tennessee',
//   zip: '37686'
// }

const coords: Coordinates = siteInfo.location.coordinates
// { lat: 36.4081, lng: -82.3247 }
```

**Data file:** `/data/siteInfo.json`
**Used by:** Contact information, Maps, Directions, Footer

### 7. Events Types

For the events calendar and ticket information:

```typescript
import type { Event, RecurringProgram, EventsData, Pricing } from '@/types'

// Single event
const event: Event = {
  id: 'july-4th',
  title: 'Colonial Independence Day',
  date: '2026-07-04',
  type: 'milestone',
  category: 'celebration',
  description: 'Join us for fireworks...',
  requiresTicket: true,
  pricing: {
    adult: 15,
    child: 8,
    members: null,
  },
}

// Recurring program
const program: RecurringProgram = {
  id: 'blacksmith-demo',
  title: 'Blacksmith Demonstrations',
  tagline: 'See history in action',
  schedule: 'Saturdays',
  time: '2:00 PM',
  duration: '45 minutes',
  requiresTicket: false,
  category: 'craft',
  icon: 'hammer',
}

// Load all events
const events: EventsData = require('@/data/events.json')
```

**Data file:** `/data/events.json`
**Used by:** Events calendar, QuickBookingCard, Event detail pages

### 8. Lectures Types

For lecture series and speaker information:

```typescript
import type { Lecture, Speaker, LecturesData } from '@/types'

// Speaker
const speaker: Speaker = {
  name: 'Dr. Catherine Dever',
  title: 'Professor of History',
  institution: 'East Tennessee State University',
  bio: 'Specialist in territorial history...',
}

// Lecture
const lecture: Lecture = {
  id: 1,
  title: 'Negotiating Nations: The Treaty of Holston',
  date: '2026-09-12',
  time: '2:00 PM',
  speaker,
  description: 'Explore the diplomatic negotiations...',
  topics: ['Diplomacy', 'Treaty', 'Cherokee'],
}

// Load lectures
const lectures: LecturesData = require('@/data/lectures.json')
```

**Data file:** `/data/lectures.json`
**Used by:** Lectures page, Speaker information

### 9. Document Evidence Types

For historical documents and primary sources:

```typescript
import type { DocumentLocation } from '@/types'

// Document location in physical site
const location: DocumentLocation = {
  building: "Governor's Office",
  room: 'East Room',
  description: 'Original correspondence on display',
}
```

**Used by:** Evidence room, Document detail pages

## Common Patterns

### Loading JSON with Type Safety

```typescript
import type { EventsData } from '@/types'
import eventsJson from '@/data/events.json'

// ✓ Fully typed
const events: EventsData = eventsJson
events.events.forEach((e) => console.log(e.title))

// Or with require (also typed)
const events2: EventsData = require('@/data/events.json')
```

### Component Props

```typescript
import type { Event, Testimonial } from '@/types'

interface EventCardProps {
  event: Event
  onBook?: () => void
}

export function EventCard({ event, onBook }: EventCardProps) {
  return (
    <div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      {event.requiresTicket && onBook && (
        <button onClick={onBook}>Book Tickets</button>
      )}
    </div>
  )
}

interface TestimonialProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialProps) {
  return (
    <figure>
      <blockquote>{testimonial.quote}</blockquote>
      <figcaption>
        {testimonial.attribution} • {testimonial.source}
      </figcaption>
    </figure>
  )
}
```

### Array Filtering

```typescript
import type { Event } from '@/types'
import events from '@/data/events.json'

// Get free events
const freeEvents: Event[] = events.events.filter((e) => !e.requiresTicket)

// Get ticketed events with pricing
const ticketedWithPrice = events.events.filter(
  (e): e is Event & { pricing: NonNullable<Event['pricing']> } =>
    e.requiresTicket && e.pricing !== null && e.pricing !== undefined
)
```

## Type Extensions

For component-specific types, extend the base types:

```typescript
import type { Event } from '@/types'

interface EventWithStatus extends Event {
  status: 'available' | 'sold-out' | 'cancelled'
  registeredCount?: number
}

function EventWithAvailability(props: EventWithStatus) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>Status: {props.status}</p>
    </div>
  )
}
```

## Validation

All JSON data files must conform to their corresponding TypeScript interfaces. Run validation:

```bash
npm run validate:data
```

This checks:

- Schema compliance against interfaces
- Required fields present
- Data type matches
- Valid date formats
- Logical constraints (e.g., events on open days)

See `docs/DATA-STANDARDS.md` for full validation rules.

## Guidelines

### Do's

- Use TypeScript types for all props and data
- Import from `@/types` for brevity
- Keep types immutable (readonly where appropriate)
- Document complex nested types

### Don'ts

- Don't define inline interfaces for JSON data
- Don't use `any` type for JSON data
- Don't duplicate types across files
- Don't break interfaces without updating all references

## Adding New Types

When adding a new data file:

1. Create the interface in `types/data.ts`
2. Add JSDoc comments explaining the interface
3. Re-export in `types/index.ts`
4. Add validation rules to `DATA-STANDARDS.md`
5. Document the data file location and usage

Example:

```typescript
// types/data.ts
/**
 * My new data type
 */
export interface MyNewData {
  id: string
  name: string
  // ... more fields
}

/**
 * Complete my new data structure
 */
export interface MyNewDataFile {
  _meta: MetaInfo
  items: MyNewData[]
}
```

```typescript
// types/index.ts
export type { MyNewData, MyNewDataFile } from './data'
```

## Troubleshooting

### Type Not Found

Error: `Cannot find name 'Event'`

Solution: Make sure you're importing from `@/types`:

```typescript
import type { Event } from '@/types' // ✓ Correct
import type { Event } from './data' // ✗ Wrong path
```

### Mismatch with JSON

Error: Property `X` is required but missing from JSON

Solution: Check `data/` file against type definition. Update either:

1. The type definition (make field optional with `?`)
2. The JSON data (add the missing field)

See `docs/DATA-STANDARDS.md` for validation guide.

## Related Documentation

- `docs/DATA-STANDARDS.md` - JSON validation and schema rules
- `docs/PROJECT.md` - Project architecture overview
- `CONTRIBUTING.md` - Code standards and conventions
