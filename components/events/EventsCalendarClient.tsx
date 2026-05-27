'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EventFilters } from './EventFilters'
import { AddToCalendarButton } from './AddToCalendarButton'
import { SmartBadges } from './SmartBadge'
import { BookingButton } from '@/components/booking'
import { filterEvents, getEventCounts } from '@/lib/events/filterEvents'
import { getSmartBadges } from '@/lib/events/smartBadges'
import { getTicketUrl } from '@/lib/data'
import type { EventFilter } from '@/types/events'
import styles from '@/app/(main)/events/page.module.css'

// Event type - matches JSON data structure
// Using string for type/category since JSON inference provides string, not union
interface Event {
  id: string
  title: string
  date: string
  endDate: string | null
  time: string | null
  type: string // 'new' | 'enhanced' | 'recurring' | 'milestone' in practice
  category: string
  description: string
  requiresTicket: boolean
  ticketUrl?: string | null
  fareHarborId?: string | null
  capacity?: number
  pricing?: {
    adult?: number | null
    senior?: number | null
    child?: number | null
    underFive?: number | null
    members?: number | null
  } | null
  featured?: boolean
  speaker?: string
  speakerTitle?: string
}

interface EventsCalendarClientProps {
  groupedEvents: Record<string, Event[]>
  allEvents: Event[]
  monthCharacters: Record<string, string>
}

function getEventDuration(event: Event): number {
  if (!event.endDate) return 1
  const start = new Date(`${event.date}T12:00:00`)
  const end = new Date(`${event.endDate}T12:00:00`)
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function formatDateRange(start: string, end?: string | null): string {
  if (!end) return formatDate(start)

  const startDate = new Date(`${start}T12:00:00`)
  const endDate = new Date(`${end}T12:00:00`)

  if (startDate.getUTCMonth() === endDate.getUTCMonth()) {
    return `${startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    })}–${endDate.getUTCDate()}`
  }

  return `${formatDate(start)} – ${formatDate(end)}`
}

function formatPrice(cents: number): string {
  const dollars = cents / 100
  return dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`
}

function formatPricingDetails(event: Event): string | null {
  if (!event.requiresTicket || !event.pricing) {
    return null
  }

  const prices: string[] = []

  if (event.pricing.adult) prices.push(`Adult ${formatPrice(event.pricing.adult)}`)
  if (event.pricing.senior) prices.push(`Senior ${formatPrice(event.pricing.senior)}`)
  if (event.pricing.child) prices.push(`Child ${formatPrice(event.pricing.child)}`)
  if (event.pricing.underFive === 0) prices.push('Under 5 FREE')
  if (event.pricing.members === 0) prices.push('Members FREE')

  return prices.length > 0 ? prices.join(' • ') : null
}

export function EventsCalendarClient({
  groupedEvents,
  allEvents,
  monthCharacters,
}: EventsCalendarClientProps) {
  const [activeFilter, setActiveFilter] = useState<EventFilter>('all')
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  // Get counts for filter badges
  const eventCounts = getEventCounts(allEvents)

  // Filter events
  const filteredEvents = filterEvents(allEvents, activeFilter)
  const filteredIds = new Set(filteredEvents.map((e) => e.id))

  // Handler to update filter and trigger announcement
  const handleFilterChange = (filter: EventFilter) => {
    setActiveFilter(filter)
    // Compute and set announcement message for screen readers
    const filtered = filterEvents(allEvents, filter)
    const filterLabel = filter === 'all' ? 'all events' : `${filter} events`
    setStatusMessage(`Showing ${filtered.length} ${filterLabel}`)
  }

  return (
    <>
      {/* Screen reader announcement for filter changes */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {statusMessage}
      </div>

      {/* Filter Bar */}
      <div className={styles['filter-bar']}>
        <div className={styles['filter-bar-inner']}>
          <EventFilters
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            eventCounts={eventCounts}
          />
        </div>
      </div>

      {/* Events by Month */}
      <section
        className={styles['living-calendar']}
        aria-labelledby="living-calendar-heading"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        <h2 id="living-calendar-heading" className="sr-only">
          2026 Events by Month
        </h2>

        {Object.entries(groupedEvents).map(([month, events]) => {
          const monthId = month.toLowerCase().replace(/\s+/g, '-')
          const character = monthCharacters[month] || ''
          const visibleEvents = events.filter((e) => filteredIds.has(e.id))

          // Skip months with no matching events
          if (visibleEvents.length === 0) return null

          return (
            <article
              key={month}
              id={monthId}
              className={styles['calendar-month']}
              aria-labelledby={`${monthId}-heading`}
            >
              {/* Month header */}
              <header className={styles['calendar-month-header']}>
                <div className={styles['calendar-month-title-group']}>
                  <h3 id={`${monthId}-heading`} className={styles['calendar-month-title']}>
                    {month.split(' ')[0]}
                  </h3>
                  <p className={styles['calendar-month-character']}>{character}</p>
                </div>
                <span className={styles['calendar-month-count']}>
                  {visibleEvents.length} event{visibleEvents.length !== 1 ? 's' : ''}
                </span>
              </header>

              {/* Events grid */}
              <div className={styles['calendar-month-events']}>
                {visibleEvents.map((event) => {
                  const duration = getEventDuration(event)
                  const isMultiDay = duration > 1
                  const isLecture = event.category === 'lecture'
                  const isSignature = event.category === 'signature'
                  const isMilestone = event.type === 'milestone'

                  // Determine card size class
                  let sizeClass = styles['calendar-event--standard']
                  if (isMultiDay && duration >= 3) {
                    sizeClass = styles['calendar-event--large']
                  } else if (isMultiDay || isSignature || isLecture) {
                    // Lectures get medium size to stand out as important programming
                    sizeClass = styles['calendar-event--medium']
                  }

                  // Determine type class
                  let typeClass = ''
                  if (isSignature) typeClass = styles['calendar-event--signature']
                  else if (isLecture) typeClass = styles['calendar-event--lecture']
                  else if (isMilestone) typeClass = styles['calendar-event--milestone']
                  else if (event.type === 'new') typeClass = styles['calendar-event--new']

                  return (
                    <article
                      key={event.id}
                      id={event.id}
                      className={`${styles['calendar-event']} ${sizeClass} ${typeClass}`}
                    >
                      {/* Date block */}
                      <div className={styles['calendar-event-date']}>
                        <time dateTime={event.date} className={styles['calendar-event-date-inner']}>
                          {isMultiDay ? (
                            <>
                              <span className={styles['calendar-event-date-range']}>
                                {formatDateRange(event.date, event.endDate)}
                              </span>
                              <span className={styles['calendar-event-date-duration']}>
                                {duration} days
                              </span>
                            </>
                          ) : (
                            <>
                              <span className={styles['calendar-event-date-month']}>
                                {new Date(`${event.date}T12:00:00`).toLocaleDateString('en-US', {
                                  month: 'short',
                                  timeZone: 'UTC',
                                })}
                              </span>
                              <span className={styles['calendar-event-date-day']}>
                                {new Date(`${event.date}T12:00:00`).getUTCDate()}
                              </span>
                            </>
                          )}
                        </time>
                      </div>

                      {/* Content */}
                      <div className={styles['calendar-event-content']}>
                        {/* Event type badge */}
                        <span
                          className={`${styles['calendar-event-badge']} ${
                            isSignature
                              ? styles['calendar-event-badge--signature']
                              : styles[`calendar-event-badge--${event.type}`]
                          }`}
                        >
                          {isSignature && 'Signature Event'}
                          {!isSignature && event.type === 'new' && 'New for 2026'}
                          {!isSignature && event.type === 'enhanced' && 'Enhanced'}
                          {!isSignature && event.type === 'recurring' && 'Annual Tradition'}
                          {!isSignature && event.type === 'milestone' && 'Milestone'}
                        </span>

                        {/* Smart Badges - Urgency & Value signals */}
                        <SmartBadges
                          badges={getSmartBadges(event, { maxBadges: 2, includeTiming: true })}
                          className="mt-1.5"
                        />

                        {/* Title */}
                        <h4 className={styles['calendar-event-title']}>{event.title}</h4>

                        {/* Time */}
                        {event.time && (
                          <p className={styles['calendar-event-time']}>{event.time}</p>
                        )}

                        {/* Pricing */}
                        {!event.requiresTicket ? (
                          <p className={styles['calendar-event-price']}>
                            <span className={styles['calendar-event-price-free']}>
                              Free Event — No Ticket Required
                            </span>
                          </p>
                        ) : (
                          formatPricingDetails(event) && (
                            <p className={styles['calendar-event-price']}>
                              {formatPricingDetails(event)}
                            </p>
                          )
                        )}

                        {/* Speaker (for lectures) */}
                        {isLecture && event.speaker && (
                          <p className={styles['calendar-event-speaker']}>
                            <span className={styles['calendar-event-speaker-name']}>
                              {event.speaker}
                            </span>
                            {event.speakerTitle && (
                              <span className={styles['calendar-event-speaker-title']}>
                                {event.speakerTitle}
                              </span>
                            )}
                          </p>
                        )}

                        {/* Description */}
                        <p className={styles['calendar-event-desc']}>{event.description}</p>

                        {/* Subtle link for July 4 signature event */}
                        {isSignature && event.id === 'colonial-independence-day' && (
                          <p className={styles['calendar-event-note']}>
                            <Link href="/first-250" className={styles['calendar-event-note-link']}>
                              Learn about the First 250 Registry
                            </Link>
                          </p>
                        )}

                        {/* Event CTAs */}
                        <div className={styles['calendar-event-cta']}>
                          {event.category === 'digital' ? (
                            <span className={styles['calendar-event-cta-btn-disabled']}>
                              Online Event
                            </span>
                          ) : event.requiresTicket ? (
                            <>
                              <BookingButton
                                itemId={event.fareHarborId || null}
                                fallbackUrl={
                                  getTicketUrl({
                                    requiresTicket: event.requiresTicket,
                                    ticketUrl: event.ticketUrl,
                                  }) || `/events/${event.id}`
                                }
                                className={styles['calendar-event-cta-btn']}
                                eventData={{
                                  id: event.id,
                                  title: event.title,
                                  fareHarborId: event.fareHarborId || undefined,
                                  pricing: event.pricing || null,
                                }}
                              >
                                Reserve Your Spot
                              </BookingButton>
                              <p className="text-xs text-stone-500 mt-2">
                                Questions?{' '}
                                <a
                                  href="tel:+14235387396"
                                  className="text-amber-800 hover:text-amber-900 underline underline-offset-2"
                                >
                                  Call (423) 538-7396
                                </a>{' '}
                                — we&apos;ll call you back
                              </p>
                            </>
                          ) : (
                            <Link
                              href="/visit"
                              className={styles['calendar-event-cta-btn-secondary']}
                            >
                              Plan Your Visit <span aria-hidden="true">→</span>
                            </Link>
                          )}

                          {/* Add to Calendar */}
                          <AddToCalendarButton
                            event={{
                              id: event.id,
                              title: event.title,
                              date: event.date,
                              endDate: event.endDate,
                              time: event.time,
                              description: event.description,
                            }}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </article>
          )
        })}

        {/* Empty state when filter has no results */}
        {filteredEvents.length === 0 && (
          <div className={styles['empty-state']}>
            <p>No events match this filter.</p>
            <button onClick={() => setActiveFilter('all')} className={styles['empty-state-btn']}>
              Show all events
            </button>
          </div>
        )}
      </section>
    </>
  )
}
