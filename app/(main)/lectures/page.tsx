'use client'

import { useMemo, useCallback } from 'react'
import Link from 'next/link'
import lecturesData from '@/data/lectures.json'
import type { LecturesData, Speaker } from '@/types/data'
import { useContact } from '@/lib/hooks/useContact'
import styles from './page.module.css'

const typedLecturesData = lecturesData as LecturesData

// Roman numerals for chapter numbers
const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V'] as const

// Narrative connections between lectures
const LECTURE_CONNECTIONS: Readonly<Record<number, string>> = {
  1: 'Understanding frontier faith sets the stage for the sacrifices that followed.',
  2: "Mary Patton's powder enabled the march you'll learn about next.",
  3: "The Overmountain Men's victory made westward expansion possible.",
  4: "Blount's arrival at Rocky Mount began Tennessee's government.",
  // Lecture 5 has no "next" connection
}

// Credential badges for speakers
const CREDENTIAL_BADGES: Readonly<Record<string, string>> = {
  'Vanderbilt University': 'Vanderbilt Scholar',
  'Sycamore Shoals State Historic Park': 'Living History',
  'Independent Scholar': 'Historian',
}

/**
 * Get speaker credential badge text
 */
function getSpeakerCredential(speaker: Speaker): string {
  if (speaker.institution && speaker.institution in CREDENTIAL_BADGES) {
    return CREDENTIAL_BADGES[speaker.institution]
  }
  return speaker.title
}

/**
 * Format date string to full display format
 * Uses fixed timezone approach to prevent hydration mismatches
 */
function formatDate(dateStr: string): string {
  // Parse YYYY-MM-DD format manually to avoid timezone issues
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day, 12, 0, 0)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format date string to short month/day format
 * Uses fixed timezone approach to prevent hydration mismatches
 */
function formatShortDate(dateStr: string): { month: string; day: string } {
  // Parse YYYY-MM-DD format manually to avoid timezone issues
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day, 12, 0, 0)
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: day.toString(),
  }
}

// Note: Metadata export moved to layout.tsx or generateMetadata function
// This is now a Client Component due to useContact() hook usage

export default function LecturesPage() {
  const { lectures } = typedLecturesData
  const contact = useContact()

  // Memoize formatted dates to prevent recalculation on every render
  const formattedDates = useMemo(() => {
    return lectures.map((lecture) => ({
      id: lecture.id,
      shortDate: formatShortDate(lecture.date),
      fullDate: formatDate(lecture.date),
    }))
  }, [])

  // Create a lookup for formatted dates by lecture id
  const getFormattedDates = useCallback(
    (lectureId: number) => {
      return (
        formattedDates.find((d) => d.id === lectureId) ?? {
          shortDate: { month: '', day: '' },
          fullDate: '',
        }
      )
    },
    [formattedDates]
  )

  return (
    <>
      {/* ============================================
          HERO - First-Ever Milestone
          ============================================ */}
      <section className={styles['series-hero']} aria-labelledby="series-heading">
        <div className={styles['series-hero-content']}>
          {/* Milestone badge */}
          <p className={styles['series-milestone-badge']}>
            <span className={styles['series-milestone-icon']} aria-hidden="true">
              ★
            </span>
            Rocky Mount&apos;s First-Ever Lecture Series
          </p>

          {/* Main headline */}
          <h1 id="series-heading" className={styles['series-headline']}>
            <span className={styles['series-headline-small']}>The Founding Story</span>
            <span className={styles['series-headline-large']}>In {lectures.length} Lectures</span>
          </h1>

          {/* Journey framing */}
          <p className={styles['series-journey']}>
            From frontier faith to founding government — {lectures.length} distinguished speakers
            trace the path that led to Tennessee.
          </p>

          {/* Quick stats */}
          <div className={styles['series-stats']}>
            <div className={styles['series-stat']}>
              <span className={styles['series-stat-number']}>{lectures.length}</span>
              <span className={styles['series-stat-label']}>Lectures</span>
            </div>
            <div className={styles['series-stat-divider']} aria-hidden="true" />
            <div className={styles['series-stat']}>
              <span className={styles['series-stat-number']}>4</span>
              <span className={styles['series-stat-label']}>Months</span>
            </div>
            <div className={styles['series-stat-divider']} aria-hidden="true" />
            <div className={styles['series-stat']}>
              <span className={styles['series-stat-number']}>1</span>
              <span className={styles['series-stat-label']}>Historic Year</span>
            </div>
          </div>

          {/* Admission note */}
          <p className={styles['series-admission']}>
            Advance registration recommended · Seating limited
          </p>
        </div>
      </section>

      {/* ============================================
          VISUAL TIMELINE - March to June
          ============================================ */}
      <nav className={styles['series-timeline']} aria-label="Lecture schedule">
        <div className={styles['series-timeline-inner']}>
          <div className={styles['series-timeline-track']}>
            {lectures.map((lecture, index) => {
              const { shortDate } = getFormattedDates(lecture.id)
              return (
                <a
                  key={lecture.id}
                  href={`#lecture-${lecture.id}`}
                  className={styles['series-timeline-point']}
                  aria-label={`Jump to Lecture ${index + 1}: ${lecture.title}`}
                >
                  <span className={styles['series-timeline-chapter']}>{ROMAN_NUMERALS[index]}</span>
                  <span className={styles['series-timeline-dot']} aria-hidden="true" />
                  <span className={styles['series-timeline-date']}>
                    {shortDate.month} {shortDate.day}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </nav>

      {/* ============================================
          WHY THESE LECTURES - Prologue
          ============================================ */}
      <section className={styles['series-prologue']} aria-labelledby="prologue-heading">
        <div className={styles['series-prologue-inner']}>
          <h2 id="prologue-heading" className={styles['series-prologue-headline']}>
            Why These Lectures?
          </h2>
          <p className={styles['series-prologue-text']}>
            Rocky Mount wasn&apos;t just a log house on the frontier. It was where Tennessee&apos;s
            government began — where William Blount, appointed by George Washington, established the
            Southwest Territory in 1790. To understand that moment, you need to understand what came
            before: the faith that sustained settlers, the heroes who secured the frontier, and the
            gambles that made expansion possible.
          </p>
          <p className={styles['series-prologue-text']}>
            This series tells that story. Each lecture builds on the last, creating a complete
            picture of how Tennessee came to be.
          </p>
        </div>
      </section>

      {/* ============================================
          THE LECTURES - Five Chapters
          ============================================ */}
      <section className={styles['series-lectures']} aria-labelledby="lectures-heading">
        <h2 id="lectures-heading" className="sr-only">
          The 2026 Lecture Series
        </h2>

        <div className={styles['series-lectures-list']}>
          {lectures.map((lecture, index) => {
            const chapter = ROMAN_NUMERALS[index]
            const { shortDate, fullDate } = getFormattedDates(lecture.id)
            const credential = getSpeakerCredential(lecture.speaker)
            const connection = LECTURE_CONNECTIONS[lecture.id]
            const isLastLecture = index === lectures.length - 1

            return (
              <article
                key={lecture.id}
                id={`lecture-${lecture.id}`}
                className={`${styles['series-lecture']} ${isLastLecture ? styles['series-lecture--finale'] : ''}`}
              >
                {/* Chapter marker */}
                <div className={styles['series-lecture-marker']}>
                  <span className={styles['series-lecture-chapter']}>{chapter}</span>
                  <div className={styles['series-lecture-line']} aria-hidden="true" />
                </div>

                {/* Lecture content */}
                <div className={styles['series-lecture-content']}>
                  {/* Header */}
                  <header className={styles['series-lecture-header']}>
                    <div className={styles['series-lecture-date-block']}>
                      <time dateTime={lecture.date} className={styles['series-lecture-date']}>
                        <span className={styles['series-lecture-date-month']}>
                          {shortDate.month}
                        </span>
                        <span className={styles['series-lecture-date-day']}>{shortDate.day}</span>
                      </time>
                      <span className={styles['series-lecture-time']}>{lecture.time}</span>
                    </div>

                    <div className={styles['series-lecture-title-group']}>
                      <h3 className={styles['series-lecture-title']}>{lecture.title}</h3>
                      <p className={styles['series-lecture-full-date']}>{fullDate}</p>
                    </div>
                  </header>

                  {/* Speaker */}
                  <div className={styles['series-lecture-speaker']}>
                    <div className={styles['series-lecture-speaker-info']}>
                      <p className={styles['series-lecture-speaker-name']}>
                        {lecture.speaker.portraying
                          ? `${lecture.speaker.name} as ${lecture.speaker.portraying}`
                          : lecture.speaker.name}
                      </p>
                      <p className={styles['series-lecture-speaker-title']}>
                        {lecture.speaker.title}
                        {lecture.speaker.institution &&
                          lecture.speaker.institution !== 'Independent Scholar' && (
                            <>, {lecture.speaker.institution}</>
                          )}
                      </p>
                    </div>
                    <span className={styles['series-lecture-credential']}>{credential}</span>
                  </div>

                  {/* Description */}
                  <p className={styles['series-lecture-desc']}>{lecture.description}</p>

                  {/* Format note if applicable */}
                  {lecture.format && (
                    <p className={styles['series-lecture-format']}>
                      <strong>Format:</strong> {lecture.format}
                    </p>
                  )}

                  {/* You'll Discover */}
                  <div className={styles['series-lecture-discover']}>
                    <p className={styles['series-lecture-discover-label']}>You&apos;ll Discover</p>
                    <ul className={styles['series-lecture-discover-list']}>
                      {lecture.topics.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Speaker bio (expandable) */}
                  <details className={styles['series-lecture-bio']}>
                    <summary className={styles['series-lecture-bio-toggle']}>
                      About {lecture.speaker.name.split(' ')[0]}
                      <svg
                        className={styles['series-lecture-bio-icon']}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>
                    <p className={styles['series-lecture-bio-text']}>{lecture.speaker.bio}</p>
                  </details>

                  {/* Connection to next lecture */}
                  {connection && (
                    <p className={styles['series-lecture-connection']}>
                      <span className={styles['series-lecture-connection-icon']} aria-hidden="true">
                        →
                      </span>
                      {connection}
                    </p>
                  )}

                  {/* Special note */}
                  {lecture.note && <p className={styles['series-lecture-note']}>{lecture.note}</p>}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ============================================
          CTA - Join the Learning Community
          ============================================ */}
      <section className={styles['series-cta']} aria-labelledby="series-cta-heading">
        <div className={styles['series-cta-inner']}>
          <h2 id="series-cta-heading" className={styles['series-cta-headline']}>
            {lectures.length} Lectures. One Historic Year.
          </h2>
          <p className={styles['series-cta-subheadline']}>
            Seating is limited. Join us at Rocky Mount.
          </p>

          <div className={styles['series-cta-actions']}>
            <Link
              href="/visit"
              className={`${styles['series-cta-btn']} ${styles['series-cta-btn--primary']}`}
            >
              Plan Your Visit
            </Link>
            <Link
              href="/events"
              className={`${styles['series-cta-btn']} ${styles['series-cta-btn--secondary']}`}
            >
              Full 2026 Calendar
            </Link>
          </div>

          <p className={styles['series-cta-location']}>
            <svg
              className={styles['series-cta-location-icon']}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Rocky Mount State Historic Site · Piney Flats, Tennessee
          </p>

          <p className={styles['series-cta-location']}>
            <svg
              className={styles['series-cta-location-icon']}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <a href={contact.phoneHref}>{contact.phoneFormatted}</a>
          </p>
        </div>
      </section>
    </>
  )
}
