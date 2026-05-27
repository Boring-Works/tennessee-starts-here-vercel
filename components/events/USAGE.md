# EventFilters Component Usage

## Overview

The `EventFilters` component provides a client-side filtering UI for the events page with period-appropriate styling (amber/brown colors).

## Files Created

1. **`types/events.ts`** - Filter type definitions
2. **`lib/events/filterEvents.ts`** - Filter logic and utilities
3. **`components/events/EventFilters.tsx`** - UI component

## Basic Usage

```tsx
'use client'

import { useState } from 'react'
import { EventFilters } from '@/components/events/EventFilters'
import { filterEvents, getEventCounts } from '@/lib/events/filterEvents'
import { EventFilter } from '@/types/events'
import { Event } from '@/types/data'

export default function EventsPage({ events }: { events: Event[] }) {
  const [activeFilter, setActiveFilter] = useState<EventFilter>('all')

  // Calculate counts for badges
  const eventCounts = getEventCounts(events)

  // Apply filter to events
  const filteredEvents = filterEvents(events, activeFilter)

  return (
    <div>
      {/* Filter UI */}
      <div className="mb-8">
        <EventFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          eventCounts={eventCounts}
        />
      </div>

      {/* Event Grid */}
      <div className="grid gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <p className="text-center text-text-light py-12">No events found for this filter.</p>
      )}
    </div>
  )
}
```

## Filter Types

| Filter     | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| `all`      | All events (default)                                          |
| `free`     | Events where `requiresTicket === false`                       |
| `camp`     | Events with category `'camp'`                                 |
| `lecture`  | Events with category `'lecture'`                              |
| `festival` | Events with category `'festival'`                             |
| `family`   | Events with category `'camp'`, `'education'`, or `'festival'` |

## Component Props

### `EventFilters`

```typescript
interface EventFiltersProps {
  /** Current active filter (required) */
  activeFilter: EventFilter

  /** Callback when filter changes (required) */
  onFilterChange: (filter: EventFilter) => void

  /** Event counts for each filter (optional) */
  eventCounts?: Partial<Record<EventFilter, number>>
}
```

## Utilities

### `filterEvents(events, filter)`

Filters an array of events based on the selected filter type.

```typescript
import { filterEvents } from '@/lib/events/filterEvents'
import { Event } from '@/types/data'

const events: Event[] = [...] // Your events
const filtered = filterEvents(events, 'free') // Only free events
```

### `getEventCounts(events)`

Returns count of events for each filter type.

```typescript
import { getEventCounts } from '@/lib/events/filterEvents'

const counts = getEventCounts(events)
// Returns: { all: 25, free: 10, camp: 5, lecture: 8, festival: 3, family: 12 }
```

## Styling

The component uses period-appropriate colors from the project's design system:

- **Inactive buttons:** Cream background (`bg-cream`), brown border (`border-secondary/30`)
- **Active button:** Amber background (`bg-amber-700`), darker border (`border-amber-800`)
- **Hover states:** Subtle lift animation with shadow
- **Count badges:** Matching color scheme with active/inactive states

## Accessibility

- Proper ARIA roles and labels
- Keyboard navigation support
- Focus ring indicators
- Screen reader friendly count announcements
- Semantic HTML with `<button>` elements

## Next Steps

To integrate into the events page:

1. Import the component and utilities
2. Add state management for active filter
3. Replace or update existing event list rendering
4. Add empty state handling
5. Test with various filter combinations
