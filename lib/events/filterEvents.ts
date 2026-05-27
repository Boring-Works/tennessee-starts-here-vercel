import type { EventFilter } from '@/types/events'

// Minimal event interface for filtering
interface FilterableEvent {
  id: string
  category: string
  requiresTicket: boolean
}

/**
 * Filter events based on the selected filter type
 */
export function filterEvents<T extends FilterableEvent>(events: T[], filter: EventFilter): T[] {
  switch (filter) {
    case 'all':
      return events

    case 'free':
      return events.filter((event) => !event.requiresTicket)

    case 'camp':
      return events.filter((event) => event.category === 'camp')

    case 'lecture':
      return events.filter((event) => event.category === 'lecture')

    case 'festival':
      return events.filter((event) => event.category === 'festival')

    case 'family':
      return events.filter(
        (event) =>
          event.category === 'camp' ||
          event.category === 'education' ||
          event.category === 'festival'
      )

    default:
      return events
  }
}

/**
 * Count events for each filter type
 */
export function getEventCounts<T extends FilterableEvent>(
  events: T[]
): Record<EventFilter, number> {
  return {
    all: events.length,
    free: filterEvents(events, 'free').length,
    camp: filterEvents(events, 'camp').length,
    lecture: filterEvents(events, 'lecture').length,
    festival: filterEvents(events, 'festival').length,
    family: filterEvents(events, 'family').length,
  }
}
