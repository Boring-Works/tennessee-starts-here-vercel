# Types Quick Reference

## Import Everything

```typescript
import type {
  // Navigation
  NavItem,
  NavDropdownItem,
  NavigationData,
  // Testimonials
  Testimonial,
  ReviewStats,
  TestimonialsData,
  // Timeline
  TimelineEvent,
  TimelineData,
  // Experiences
  ExperienceMoment,
  TourType,
  ExperiencesData,
  // Site Hours
  SiteStatus,
  SpecialHours,
  HoursConfig,
  // Site Info
  Address,
  Coordinates,
  SiteInfoData,
  // Events
  Event,
  RecurringProgram,
  EventsData,
  // Lectures
  Lecture,
  Speaker,
  LecturesData,
} from '@/types'
```

## Common Usage

### Navigation Component

```typescript
import type { NavItem } from '@/types'
import nav from '@/data/navigation.json'

const { mainNav } = nav as NavigationData

mainNav.forEach((item: NavItem) => {
  console.log(item.label, item.href)
})
```

### Event Card Component

```typescript
import type { Event } from '@/types'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div>
      <h3>{event.title}</h3>
      <p>{event.date}</p>
      {event.requiresTicket && <span>Tickets Required</span>}
    </div>
  )
}
```

### Testimonials Section

```typescript
import type { Testimonial, TestimonialsData } from '@/types'
import testimonials from '@/data/testimonials.json'

const featured: Testimonial[] = (testimonials as TestimonialsData).featured

featured.forEach((t) => {
  console.log(`"${t.quote}" - ${t.attribution}`)
})
```

### Site Status

```typescript
import type { SiteStatus } from '@/types'
import { getSiteStatus } from '@/lib/siteHours'

const status: SiteStatus = getSiteStatus()

if (status.isOpen) {
  console.log(status.message) // "Open 10:00 AM-5:00 PM"
}
```

## Complete Type Hierarchy

```
MetaInfo
├── NavigationData
│   ├── NavItem
│   └── NavDropdownItem
├── TestimonialsData
│   ├── Testimonial
│   └── ReviewStats
├── TimelineData
│   ├── TimelineEvent
│   └── ContrastStatement
├── ExperiencesData
│   ├── ExperienceMoment
│   ├── TourType
│   └── VisitInclude
├── SiteInfoData
│   ├── SiteIdentity
│   ├── SiteLocation
│   │   ├── Address
│   │   ├── Coordinates
│   │   └── DrivingDistance
│   └── ContactInfo
├── EventsData
│   ├── Event
│   │   └── Pricing
│   ├── RecurringProgram
│   │   └── Pricing
│   └── First250Config
├── LecturesData
│   ├── Lecture
│   └── Speaker
├── SiteStatus
│   └── SpecialHours
├── HoursConfig
│   ├── Closure
│   └── SpecialEvent
└── DocumentLocation
```

## File-to-Type Mapping

| JSON File           | Primary Type     | Import                                            |
| ------------------- | ---------------- | ------------------------------------------------- |
| `navigation.json`   | NavigationData   | `import type { NavigationData } from '@/types'`   |
| `testimonials.json` | TestimonialsData | `import type { TestimonialsData } from '@/types'` |
| `timeline.json`     | TimelineData     | `import type { TimelineData } from '@/types'`     |
| `experiences.json`  | ExperiencesData  | `import type { ExperiencesData } from '@/types'`  |
| `siteInfo.json`     | SiteInfoData     | `import type { SiteInfoData } from '@/types'`     |
| `events.json`       | EventsData       | `import type { EventsData } from '@/types'`       |
| `lectures.json`     | LecturesData     | `import type { LecturesData } from '@/types'`     |

## Getting Started

1. **See all types:** Open `types/data.ts`
2. **Import types:** `import type { YourType } from '@/types'`
3. **Full guide:** Read `docs/TYPES-GUIDE.md`
4. **Validate data:** Run `npm run validate:data`

## Key Principles

- All types are imported as `type` only (not runtime)
- Every data file has a `_meta` field with description/updated info
- Types support optional fields with `?`
- Pricing, Hours, and Status are separate concepts
- Events can be one-time, recurring, or special programs

## Need Help?

- Type doesn't exist? Check `types/data.ts` line count or search for it
- JSON doesn't match type? Run `npm run validate:data` to see errors
- Want to add new type? Follow pattern in `types/data.ts` and re-export in `types/index.ts`
