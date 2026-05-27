'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import styles from './Timeline.module.css'

// Import timeline events from JSON data file
import timelineEventsData from '@/content/timeline-events.json'

/**
 * Timeline event types matching the document content types
 * plus a general 'event' type for milestones
 */
export type TimelineEventType = 'treaty' | 'letter' | 'proclamation' | 'newspaper' | 'event'

/**
 * A single event on the timeline
 */
export interface TimelineEvent {
  id: string
  date: string // YYYY-MM-DD format
  title: string
  description: string
  documentId?: string | null // Links to /evidence/documents/[id]
  type: TimelineEventType
  featured?: boolean
}

/**
 * Timeline data: key events from 1790-1796
 * covering the Southwest Territory period
 *
 * Data loaded from content/timeline-events.json for migration-readiness
 */
const TIMELINE_EVENTS: TimelineEvent[] = timelineEventsData as TimelineEvent[]

/**
 * Get label for event type
 */
function getTypeLabel(type: TimelineEventType): string {
  const labels: Record<TimelineEventType, string> = {
    treaty: 'Treaty',
    letter: 'Letter',
    proclamation: 'Proclamation',
    newspaper: 'Newspaper',
    event: 'Event',
  }
  return labels[type]
}

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/**
 * Extract year from date string
 */
function getYear(dateString: string): number {
  return parseInt(dateString.substring(0, 4), 10)
}

/**
 * Extract month from date string (1-12)
 */
function getMonth(dateString: string): number {
  return parseInt(dateString.substring(5, 7), 10)
}

/**
 * Get abbreviated month name
 */
function getMonthAbbrev(month: number): string {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return months[month - 1]
}

export interface TimelineProps {
  /** Additional CSS class */
  className?: string
  /** Show only events in these years */
  filterYears?: number[]
}

export function Timeline({ className, filterYears }: TimelineProps) {
  // Get unique years from events
  const years = useMemo(() => {
    const yearSet = new Set(TIMELINE_EVENTS.map((e) => getYear(e.date)))
    return Array.from(yearSet).sort()
  }, [])

  // Active year filter
  const [activeYear, setActiveYear] = useState<number | null>(null)
  // Active month filter (only when year is selected)
  const [activeMonth, setActiveMonth] = useState<number | null>(null)

  // Get months available for the selected year
  const monthsInYear = useMemo(() => {
    if (activeYear === null) return []
    const monthSet = new Set(
      TIMELINE_EVENTS.filter((e) => getYear(e.date) === activeYear).map((e) => getMonth(e.date))
    )
    return Array.from(monthSet).sort((a, b) => a - b)
  }, [activeYear])

  // Handler for year selection
  const handleYearClick = (year: number | null) => {
    setActiveYear(year)
    setActiveMonth(null) // Reset month when year changes
  }

  // Filter events by year and month if specified
  const filteredEvents = useMemo(() => {
    let events = TIMELINE_EVENTS

    // Apply prop-based filter
    if (filterYears && filterYears.length > 0) {
      events = events.filter((e) => filterYears.includes(getYear(e.date)))
    }

    // Apply user-selected year filter
    if (activeYear !== null) {
      events = events.filter((e) => getYear(e.date) === activeYear)
    }

    // Apply user-selected month filter
    if (activeMonth !== null) {
      events = events.filter((e) => getMonth(e.date) === activeMonth)
    }

    // Sort by date
    return events.sort((a, b) => a.date.localeCompare(b.date))
  }, [filterYears, activeYear, activeMonth])

  // Group events by year
  const eventsByYear = useMemo(() => {
    const grouped: Record<number, TimelineEvent[]> = {}
    for (const event of filteredEvents) {
      const year = getYear(event.date)
      if (!grouped[year]) {
        grouped[year] = []
      }
      grouped[year].push(event)
    }
    return grouped
  }, [filteredEvents])

  // Years that have events in the filtered set
  const displayYears = Object.keys(eventsByYear).map(Number).sort()

  return (
    <div className={`${styles.timelinePage} ${className || ''}`}>
      {/* Year Selector */}
      <nav className={styles.yearSelector} aria-label="Filter by year">
        <div className={styles.yearSelectorInner}>
          <button
            className={`${styles.yearButton} ${activeYear === null ? styles.yearButtonActive : ''}`}
            onClick={() => handleYearClick(null)}
            type="button"
            aria-current={activeYear === null ? 'true' : undefined}
          >
            All Years
          </button>
          {years.map((year) => (
            <button
              key={year}
              className={`${styles.yearButton} ${activeYear === year ? styles.yearButtonActive : ''}`}
              onClick={() => handleYearClick(year)}
              type="button"
              aria-current={activeYear === year ? 'true' : undefined}
            >
              {year}
            </button>
          ))}
        </div>

        <div
          className={styles.monthSelector}
          style={{
            maxHeight: activeYear !== null && monthsInYear.length > 1 ? '100px' : '0',
            overflow: 'hidden',
            opacity: activeYear !== null && monthsInYear.length > 1 ? 1 : 0,
            transition: 'max-height 0.3s ease, opacity 0.3s ease',
          }}
        >
          <button
            className={`${styles.monthButton} ${activeMonth === null ? styles.monthButtonActive : ''}`}
            onClick={() => setActiveMonth(null)}
            type="button"
            aria-current={activeMonth === null ? 'true' : undefined}
          >
            All {activeYear}
          </button>
          {monthsInYear.map((month) => (
            <button
              key={month}
              className={`${styles.monthButton} ${activeMonth === month ? styles.monthButtonActive : ''}`}
              onClick={() => setActiveMonth(month)}
              type="button"
              aria-current={activeMonth === month ? 'true' : undefined}
            >
              {getMonthAbbrev(month)}
            </button>
          ))}
        </div>
      </nav>

      {/* Timeline Content */}
      <div className={styles.timelineContainer}>
        {displayYears.length > 0 ? (
          displayYears.map((year) => (
              <section key={year} className={styles.yearGroup} id={`year-${year}`}>
                <div className={styles.yearLabel}>
                  <h2 className={styles.yearLabelInner}>
                    <span>{year}</span>
                    <span className={styles.yearLabelLine} aria-hidden="true" />
                  </h2>
                </div>

                <div className={styles.track}>
                  {eventsByYear[year].map((event) => {
                    const typeClassName = `eventType${event.type.charAt(0).toUpperCase() + event.type.slice(1)}`

                    const content = (
                      <div
                        className={`${styles.eventContent} ${event.featured ? styles.eventContentFeatured : ''}`}
                      >
                        <time className={styles.eventDate} dateTime={event.date}>
                          {formatDate(event.date)}
                        </time>
                        <h3 className={styles.eventTitle}>{event.title}</h3>
                        <p className={styles.eventDescription}>{event.description}</p>
                        <div className={styles.eventMeta}>
                          <span className={styles.eventType}>
                            <span className={styles.eventTypeLabel}>
                              {getTypeLabel(event.type)}
                            </span>
                          </span>
                          {event.documentId && (
                            <span className={styles.eventLink}>
                              View Document <span className={styles.eventLinkArrow}>→</span>
                            </span>
                          )}
                        </div>
                      </div>
                    )

                    return (
                      <article
                        key={event.id}
                        className={`${styles.event} ${event.featured ? styles.eventFeatured : ''} ${styles[typeClassName] || ''}`}
                      >
                        <div className={styles.eventDot} aria-hidden="true" />
                        {event.documentId ? (
                          <Link href={`/evidence/documents/${event.documentId}`}>{content}</Link>
                        ) : (
                          content
                        )}
                      </article>
                    )
                  })}
                </div>
              </section>
            ))
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyStateText}>No events found for the selected filters.</p>
            <button
              onClick={() => {
                setActiveYear(null)
                setActiveMonth(null)
              }}
              className={styles.clearFiltersBtn}
              type="button"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Legend */}
        <aside className={styles.legend}>
          <h3 className={styles.legendTitle}>Event Types</h3>
          <div className={styles.legendItems}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendDotLetter}`} />
              <span className={styles.legendLabel}>Letter</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendDotTreaty}`} />
              <span className={styles.legendLabel}>Treaty</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendDotProclamation}`} />
              <span className={styles.legendLabel}>Proclamation</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendDotNewspaper}`} />
              <span className={styles.legendLabel}>Newspaper</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendDotEvent}`} />
              <span className={styles.legendLabel}>Event</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
