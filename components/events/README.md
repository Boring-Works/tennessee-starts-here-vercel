# Event Components

Client-side filtering system for the Tennessee Starts Here events page.

## Files

- **`EventFilters.tsx`** - Filter UI component (pill buttons with period styling)
- **`USAGE.md`** - Integration guide and examples

## Quick Start

```tsx
'use client'

import { useState } from 'react'
import { EventFilters } from '@/components/events/EventFilters'
import { filterEvents, getEventCounts } from '@/lib/events/filterEvents'
import type { EventFilter } from '@/types/events'

export default function EventsPage({ events }) {
  const [filter, setFilter] = useState<EventFilter>('all')
  const counts = getEventCounts(events)
  const filtered = filterEvents(events, filter)

  return (
    <div>
      <EventFilters activeFilter={filter} onFilterChange={setFilter} eventCounts={counts} />
      {/* Render filtered events */}
    </div>
  )
}
```

## Visual Preview

```
┌─────────────────────────────────────────────────────────────────┐
│  [All Events (25)]  [Free Events (10)]  [Camps (5)]            │
│  [Lectures (8)]  [Festivals (3)]  [Family (12)]                 │
└─────────────────────────────────────────────────────────────────┘

Active button:  Amber (bg-amber-700) with white text
Inactive:       Cream (bg-cream) with brown text
Hover:          Slight lift with shadow effect
```

## Styling

Period-appropriate amber and brown colors matching the 1790s era aesthetic:

- **Active:** `bg-amber-700 border-amber-800 text-white`
- **Inactive:** `bg-cream border-secondary/30 text-secondary`
- **Hover:** Lift animation with subtle shadow

## Accessibility

- Full keyboard navigation
- ARIA labels with event counts
- Focus indicators
- Screen reader support
