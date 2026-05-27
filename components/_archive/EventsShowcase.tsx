'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import eventsData from '@/data/events.json'
import styles from '@/app/(main)/home/page.module.css'

// Period-authentic engraving-style icons for categories
const LecternIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Lectern/podium */}
    <path d="M12 12h24l-2 8H14l-2-8z" />
    <path d="M14 20l-2 20h4l2-16h12l2 16h4l-2-20" />
    <path d="M18 40h12" />
    {/* Book on lectern */}
    <path d="M16 14h16M18 17h12" strokeWidth="1" opacity="0.6" />
    {/* Candle */}
    <path d="M36 8v4M35 6c0-1 2-1 2 0" strokeWidth="1" />
    <ellipse cx="36" cy="5" rx="1" ry="1.5" fill="currentColor" opacity="0.4" />
  </svg>
)

const BannerIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Crossed flags/banners */}
    <path d="M14 8v32" />
    <path d="M14 8h14c0 4-4 6 0 10H14" />
    <path d="M34 8v32" />
    <path d="M34 8h-14c0 4 4 6 0 10h14" />
    {/* Flag details */}
    <path d="M17 11h8M17 15h6" strokeWidth="1" opacity="0.5" />
    <path d="M31 11h-8M31 15h-6" strokeWidth="1" opacity="0.5" />
    {/* Base */}
    <path d="M10 40h28" strokeWidth="1" />
  </svg>
)

const WreathIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Wreath circle */}
    <circle cx="24" cy="24" r="14" strokeWidth="1" opacity="0.3" />
    {/* Leaves around wreath */}
    <path d="M24 8c-2 2-2 4 0 4s2-2 0-4" />
    <path d="M32 10c-1 2.5 0 4 2 3s1-3-2-3" />
    <path d="M38 16c0 2.5 1.5 4 3 2.5s0-3-3-2.5" />
    <path d="M40 24c-2 2-2 4 0 4s2-2 0-4" transform="rotate(90 24 24)" />
    <path d="M38 32c0-2.5-1.5-4-3-2.5s0 3 3 2.5" />
    <path d="M32 38c1-2.5 0-4-2-3s-1 3 2 3" />
    <path d="M24 40c2-2 2-4 0-4s-2 2 0 4" />
    <path d="M16 38c-1-2.5 0-4 2-3s1 3-2 3" />
    <path d="M10 32c0-2.5 1.5-4 3-2.5s0 3-3 2.5" />
    <path d="M8 24c2-2 2-4 0-4s-2 2 0 4" transform="rotate(90 24 24)" />
    <path d="M10 16c0 2.5 1.5 4 3 2.5s0-3-3-2.5" />
    <path d="M16 10c1 2.5 0 4-2 3s-1-3 2-3" />
    {/* Candle in center */}
    <path d="M24 20v8" strokeWidth="2" />
    <path d="M22 28h4" strokeWidth="1" />
    <ellipse cx="24" cy="18" rx="1.5" ry="2" fill="currentColor" opacity="0.5" />
  </svg>
)

// Get categorized events
const lectures = eventsData.events.filter((e) => e.category === 'lecture')
const festivals = eventsData.events.filter(
  (e) => e.category === 'festival' || e.category === 'signature'
)
const seasonal = eventsData.events.filter((e) => e.category === 'seasonal')

// Get next upcoming event
function getNextEvent() {
  return eventsData.events[0]
}

// Animated counter hook
function useCountUp(end: number, duration: number = 1500, isVisible: boolean) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isVisible) return

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)

      // Ease out cubic
      const eased = 1 - (1 - progress) ** 3
      countRef.current = Math.floor(eased * end)
      setCount(countRef.current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isVisible])

  return count
}

export default function EventsShowcase() {
  const nextEvent = getNextEvent()
  const eventCount = eventsData.events.length
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Parse the date for calendar display
  const eventDate = new Date(`${nextEvent.date}T12:00:00`)
  const monthShort = eventDate.toLocaleDateString('en-US', { month: 'short' })
  const dayNum = eventDate.getDate()
  const year = eventDate.getFullYear()

  // Animated counters
  const animatedEventCount = useCountUp(eventCount, 1500, isVisible)
  const animatedMonths = useCountUp(10, 1200, isVisible)

  return (
    <section
      ref={sectionRef}
      className={styles['showcase-section']}
      aria-labelledby="showcase-heading"
    >
      {/* Constellation/star pattern background */}
      <div className={styles['showcase-stars']} aria-hidden="true" />

      <div className={styles['showcase-container']}>
        {/* Header */}
        <header className={styles['showcase-header']}>
          <p className={styles['showcase-eyebrow']}>2026 Programming</p>
          <h2 id="showcase-heading" className={styles['showcase-headline']}>
            The Commemorative Year
          </h2>
          <p className={styles['showcase-intro']}>
            {eventCount} events celebrating America&apos;s 250th and Tennessee&apos;s 230th—from
            scholarly lectures to frontier festivals.
          </p>
        </header>

        {/* Event Categories Grid */}
        <div className={styles['showcase-grid']}>
          {/* Next Upcoming Event - Featured */}
          <article className={styles['showcase-featured']}>
            {/* Ribbon badge */}
            <div className={styles['showcase-ribbon']} aria-hidden="true">
              <span className={styles['showcase-ribbon-text']}>Coming Up</span>
            </div>

            {/* Calendar-style date */}
            <div className={styles['showcase-calendar']}>
              <span className={styles['showcase-calendar-month']}>{monthShort}</span>
              <span className={styles['showcase-calendar-day']}>{dayNum}</span>
              <span className={styles['showcase-calendar-year']}>{year}</span>
              <span className={styles['showcase-calendar-tear']} aria-hidden="true" />
            </div>

            <div className={styles['showcase-featured-content']}>
              <h3 className={styles['showcase-title']}>{nextEvent.title}</h3>
              <p className={styles['showcase-desc']}>{nextEvent.description.split('. ')[0]}.</p>
              <div className={styles['showcase-featured-footer']}>
                <Link href={`/events#${nextEvent.id}`} className={styles['showcase-link']}>
                  Event Details <span aria-hidden="true">→</span>
                </Link>
                <span className={styles['showcase-pricing']}>
                  Adults $12 · Seniors $10 · Children $8
                </span>
              </div>
            </div>
          </article>

          {/* Ornamental divider - vertical on desktop */}
          <div
            className={`${styles['showcase-divider']} ${styles['showcase-divider--vertical']}`}
            aria-hidden="true"
          >
            <span className={styles['showcase-divider-line']} />
            <span className={styles['showcase-divider-ornament']}>✦</span>
            <span className={styles['showcase-divider-line']} />
          </div>

          {/* Lecture Series Card */}
          <article className={`${styles['showcase-category']} ${styles['showcase-lectures']}`}>
            <span className={styles['showcase-category-icon']} aria-hidden="true">
              <LecternIcon />
            </span>
            <div className={styles['showcase-category-header']}>
              <span className={styles['showcase-category-count']}>{lectures.length}</span>
              <h3 className={styles['showcase-category-title']}>Lecture Series</h3>
            </div>
            <p className={styles['showcase-category-desc']}>
              Historians and interpreters explore the founding era
            </p>
            <div className={styles['showcase-speakers']}>
              {lectures.slice(0, 3).map((l) => (
                <span key={l.id} className={styles['showcase-speaker']}>
                  {l.speaker?.split(' ').slice(-1)[0]}
                </span>
              ))}
              {lectures.length > 3 && (
                <span className={styles['showcase-more']}>+{lectures.length - 3} more</span>
              )}
            </div>
            <Link href="/lectures" className={styles['showcase-link']}>
              View Series <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* Festivals Card */}
          <article className={`${styles['showcase-category']} ${styles['showcase-festivals']}`}>
            <span className={styles['showcase-category-icon']} aria-hidden="true">
              <BannerIcon />
            </span>
            <div className={styles['showcase-category-header']}>
              <span className={styles['showcase-category-count']}>{festivals.length}</span>
              <h3 className={styles['showcase-category-title']}>Festivals &amp; Events</h3>
            </div>
            <p className={styles['showcase-category-desc']}>
              Living history, trade fairs, and celebration
            </p>
            <ul className={styles['showcase-list']}>
              <li>Woolly Days &amp; Colonial Gardening</li>
              <li>Early Frontier Days</li>
              <li>Colonial Independence Day</li>
            </ul>
            <Link href="/events" className={styles['showcase-link']}>
              Full Calendar <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* Seasonal Events Card */}
          <article className={`${styles['showcase-category']} ${styles['showcase-seasonal']}`}>
            <span className={styles['showcase-category-icon']} aria-hidden="true">
              <WreathIcon />
            </span>
            <div className={styles['showcase-category-header']}>
              <span className={styles['showcase-category-count']}>{seasonal.length}</span>
              <h3 className={styles['showcase-category-title']}>Seasonal Traditions</h3>
            </div>
            <p className={styles['showcase-category-desc']}>
              Haunting tales and candlelit holidays
            </p>
            <ul className={styles['showcase-list']}>
              <li>Haunting on the Mount</li>
              <li>Frontier Christmas</li>
              <li>Candlelight Christmas</li>
            </ul>
            <Link href="/events" className={styles['showcase-link']}>
              See Dates <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>

        {/* Footer with animated stats */}
        <footer className={styles['showcase-footer']}>
          <div className={styles['showcase-stats']}>
            <div className={styles['showcase-stat']}>
              <span className={styles['showcase-stat-value']}>{animatedEventCount}</span>
              <span className={styles['showcase-stat-label']}>Events</span>
            </div>
            <div className={styles['showcase-stat-divider']} aria-hidden="true">
              ◆
            </div>
            <div className={styles['showcase-stat']}>
              <span className={styles['showcase-stat-value']}>{animatedMonths}</span>
              <span className={styles['showcase-stat-label']}>Months</span>
            </div>
            <div className={styles['showcase-stat-divider']} aria-hidden="true">
              ◆
            </div>
            <div className={styles['showcase-stat']}>
              <span className={styles['showcase-stat-value']}>1</span>
              <span className={styles['showcase-stat-label']}>Historic Site</span>
            </div>
          </div>
          <Link href="/events" className={styles['showcase-cta']}>
            View Full 2026 Calendar
          </Link>
        </footer>
      </div>
    </section>
  )
}
