'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import styles from './SmartCommemorativeCard.module.css'
import eventsData from '@/data/events.json'
import {
  EXCLUDED_EVENT_IDS,
  DIGITAL_ONLY_EVENT_IDS,
  daysUntil,
  formatCountdown,
  getEventStatus,
  getEventDisplayConfig,
  TN_230_DATE,
  USA_250_DATE,
  type EventStatus,
} from '@/lib/eventUtils'
import { downloadICS, ROCKY_MOUNT_LOCATION, ROCKY_MOUNT_URL } from '@/lib/calendar'

interface Event {
  id: string
  title: string
  date: string
  endDate: string | null
}

interface ProcessedEvent {
  id: string
  title: string
  icon: string
  date: string
  endDate: string | null
  days: number
  status: EventStatus
}

// Parse date string as local time (avoids timezone offset issues)
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Format milestone date for display
function formatMilestoneDate(dateStr: string): string {
  const date = parseLocalDate(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function SmartCommemorativeCard() {
  const [mounted, setMounted] = useState(false)
  const [_currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    setMounted(true)

    // Update at midnight
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const msUntilMidnight = tomorrow.getTime() - now.getTime()

    const timeout = setTimeout(() => {
      setCurrentDate(new Date())
    }, msUntilMidnight)

    return () => clearTimeout(timeout)
  }, [])

  // Filter and process events - skip lectures and digital-only events
  const nextEvent = useMemo((): ProcessedEvent | null => {
    const eligibleEvents = (eventsData.events as Event[])
      .filter((e) => !EXCLUDED_EVENT_IDS.includes(e.id))
      .filter((e) => !DIGITAL_ONLY_EVENT_IDS.includes(e.id))
      .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime())

    for (const event of eligibleEvents) {
      const status = getEventStatus(event.date, event.endDate)
      if (status === 'passed') continue

      const displayConfig = getEventDisplayConfig(event.id)
      const days = daysUntil(event.date)

      return {
        id: event.id,
        title: displayConfig?.title || event.title,
        icon: displayConfig?.icon || '📅',
        date: event.date,
        endDate: event.endDate,
        days,
        status,
      }
    }

    return null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Milestone status
  const tn230Status = getEventStatus(TN_230_DATE, null)
  const usa250Status = getEventStatus(USA_250_DATE, null)

  // Format date for display (using local parsing)
  const formatEventDate = (date: string, endDate: string | null): string => {
    const start = parseLocalDate(date)
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
    if (endDate) {
      const end = parseLocalDate(endDate)
      return `${start.toLocaleDateString('en-US', options)} – ${end.toLocaleDateString('en-US', options)}`
    }
    return start.toLocaleDateString('en-US', options)
  }

  if (!nextEvent) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>2026 Commemorative Year</span>
        </div>
        <div className={styles.featured}>
          <span className={styles.featuredIcon}>🌅</span>
          <h3 className={styles.featuredTitle}>2027 Season</h3>
          <p className={styles.featuredDate}>Coming Soon</p>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/events#${nextEvent.id}`} className={`${styles.card} ${styles.cardClickable}`}>
      {/* Corner accents */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>2026 Commemorative Year</span>
      </div>

      {/* Featured Event */}
      <div
        className={`${styles.featured} ${
          nextEvent.status === 'happening' ? styles.featuredHappening : ''
        }`}
      >
        {/* Urgency Badge */}
        <span className={styles.urgencyBadge}>
          {nextEvent.status === 'happening' ? '● Happening Now' : '★ Annual Event'}
        </span>

        <span className={styles.featuredIcon}>{nextEvent.icon}</span>
        <h3 className={styles.featuredTitle}>{nextEvent.title}</h3>
        <p className={styles.featuredDate}>{formatEventDate(nextEvent.date, nextEvent.endDate)}</p>
        <p className={styles.featuredCountdown}>
          {mounted
            ? nextEvent.status === 'happening'
              ? 'Today!'
              : formatCountdown(nextEvent.days)
            : '—'}
        </p>
      </div>

      {/* Milestone Dates - Simplified with actual dates */}
      <div className={styles.milestones}>
        <div className={styles.milestone}>
          <span className={styles.milestoneLabel}>
            {tn230Status === 'passed' ? '✓ ' : ''}Tennessee 230th
          </span>
          <span className={styles.milestoneDays}>
            {mounted
              ? tn230Status === 'passed'
                ? 'Celebrated'
                : formatMilestoneDate(TN_230_DATE)
              : '—'}
          </span>
        </div>
        <span className={styles.milestoneDivider}>·</span>
        <div className={styles.milestone}>
          <span className={styles.milestoneLabel}>
            {usa250Status === 'passed' ? '✓ ' : ''}USA 250th
          </span>
          <span className={styles.milestoneDays}>
            {mounted
              ? usa250Status === 'passed'
                ? 'Celebrated'
                : formatMilestoneDate(USA_250_DATE)
              : '—'}
          </span>
        </div>
      </div>

      {/* Footer with CTA and Calendar */}
      <div className={styles.cardFooter}>
        <div className={styles.cardCta}>
          <span>View Event Details</span>
          <span className={styles.cardCtaArrow}>→</span>
        </div>
        <button
          type="button"
          className={styles.calendarLink}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            downloadICS({
              title: nextEvent.title,
              date: nextEvent.date,
              endDate: nextEvent.endDate,
              location: ROCKY_MOUNT_LOCATION,
              description: `Join us at Rocky Mount State Historic Site for ${nextEvent.title}. Tennessee starts here.`,
              url: ROCKY_MOUNT_URL,
            })
          }}
          aria-label={`Add ${nextEvent.title} to calendar`}
        >
          <svg
            className={styles.calendarIcon}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"
              clipRule="evenodd"
            />
          </svg>
          Add to Calendar
        </button>
      </div>
    </Link>
  )
}
