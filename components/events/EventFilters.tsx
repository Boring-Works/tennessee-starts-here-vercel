'use client'

import type { EventFilter } from '@/types/events'
import { cn } from '@/lib/utils'

interface EventFiltersProps {
  /** Current active filter */
  activeFilter: EventFilter
  /** Callback when filter changes */
  onFilterChange: (filter: EventFilter) => void
  /** Event counts for each filter (optional) */
  eventCounts?: Partial<Record<EventFilter, number>>
}

interface FilterButton {
  id: EventFilter
  label: string
}

const FILTER_BUTTONS: FilterButton[] = [
  { id: 'all', label: 'All Events' },
  { id: 'free', label: 'Free Events' },
  { id: 'camp', label: 'Camps' },
  { id: 'lecture', label: 'Lectures' },
  { id: 'festival', label: 'Festivals' },
  { id: 'family', label: 'Family' },
]

/**
 * EventFilters - Client-side filter component for events page
 *
 * Features:
 * - Pill/chip button style filters
 * - Period-appropriate amber/brown colors
 * - Accessible keyboard navigation
 * - Optional count badges
 *
 * @example
 * ```tsx
 * const [activeFilter, setActiveFilter] = useState<EventFilter>('all')
 * const counts = getEventCounts(events)
 *
 * <EventFilters
 *   activeFilter={activeFilter}
 *   onFilterChange={setActiveFilter}
 *   eventCounts={counts}
 * />
 * ```
 */
export function EventFilters({ activeFilter, onFilterChange, eventCounts }: EventFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter events by category"
      className="flex flex-wrap items-center gap-2"
    >
      {FILTER_BUTTONS.map((button) => {
        const isActive = activeFilter === button.id
        const count = eventCounts?.[button.id]
        const hasCount = typeof count === 'number'

        return (
          <button
            key={button.id}
            onClick={() => onFilterChange(button.id)}
            aria-pressed={isActive}
            aria-label={
              hasCount ? `${button.label} (${count} event${count !== 1 ? 's' : ''})` : button.label
            }
            className={cn(
              // Base styles - min-height: 44px for WCAG 2.1 AAA / Apple HIG touch targets
              'inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full',
              'min-h-[44px] text-sm font-medium tracking-wide transition-all duration-200',
              'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
              // Inactive state - cream background with brown border
              'bg-cream border-secondary/30 text-secondary',
              'hover:bg-white hover:border-secondary/50 hover:-translate-y-0.5',
              'hover:shadow-[0_2px_8px_rgba(139,69,19,0.15)]',
              // Active state - amber background with stronger border
              isActive &&
                'bg-amber-700 border-amber-800 text-white shadow-[0_2px_12px_rgba(139,69,19,0.25)]',
              isActive && 'hover:bg-amber-800 hover:border-amber-900',
              isActive && 'hover:shadow-[0_4px_16px_rgba(139,69,19,0.3)]'
            )}
          >
            <span>{button.label}</span>
            {hasCount && (
              <span
                className={cn(
                  'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full',
                  'text-xs font-semibold tabular-nums',
                  isActive ? 'bg-amber-900 text-white' : 'bg-secondary/15 text-secondary'
                )}
                aria-hidden="true"
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
