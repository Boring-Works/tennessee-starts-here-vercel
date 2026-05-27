'use client'

import { useMemo, memo } from 'react'
import Link from 'next/link'
import eventsData from '@/data/events.json'
import siteInfo from '@/data/siteInfo.json'
import { getTicketUrl } from '@/lib/data'
import { BookingButton } from '@/components/booking'
import styles from './page.module.css'

/** Type for recurring program data from events.json */
interface RecurringProgram {
  id: string
  title: string
  tagline: string
  description: string
  schedule: string
  scheduleNote?: string
  time: string
  duration: string
  fareHarborId?: string
  ticketUrl?: string
  requiresTicket: boolean
  category: string
  icon: string
  pricing?: {
    adult?: number | null
    senior?: number | null
    child?: number | null
    underFive?: number | null
    members?: number | null
  } | null
  highlights?: string[]
  dates?: string[]
  capacity?: number
}

/** Icon component props */
interface IconProps {
  name: string
  className?: string
}

/** Memoized icon component with proper ARIA attributes */
const ProgramIcon = memo(function ProgramIcon({ name, className }: IconProps) {
  const iconPaths: Record<string, React.ReactNode> = {
    anvil: <path d="M4 16h16M6 12h12l2 4H4l2-4zM8 8h8l1 4H7l1-4zM10 4h4l1 4H9l1-4z" />,
    flame: (
      <>
        <path d="M12 2c0 4-4 6-4 10a4 4 0 108 0c0-4-4-6-4-10z" />
        <path d="M12 12c0 2-1.5 3-1.5 5a1.5 1.5 0 103 0c0-2-1.5-3-1.5-5z" />
      </>
    ),
    sunset: (
      <>
        <path d="M3 17h18M5 13l2 2M19 13l-2 2M12 3v4M7 8l1.5 1.5M17 8l-1.5 1.5" />
        <path d="M6 17a6 6 0 0112 0" />
      </>
    ),
    book: (
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
    ),
    key: (
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    ),
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
      role="img"
    >
      {iconPaths[name] || iconPaths.key}
    </svg>
  )
})

/** Section divider component */
const SectionDivider = memo(function SectionDivider({
  variant = 'default',
}: {
  variant?: 'default' | 'light' | 'dark'
}) {
  return (
    <div className={`section-divider section-divider--${variant}`} aria-hidden="true">
      <span className="section-divider-line" />
      <span className="section-divider-flourish">&#10087;</span>
      <span className="section-divider-ornament">&#10022;</span>
      <span className="section-divider-flourish section-divider-flourish--flip">&#10087;</span>
      <span className="section-divider-line" />
    </div>
  )
})

/** Format dates for display - client-side only to avoid hydration mismatch */
function formatNextDate(dates: string[] | undefined, today: Date): string {
  if (!dates || dates.length === 0) return 'By appointment'

  const upcoming = dates
    .map((d) => new Date(`${d}T00:00:00`)) // Parse as local time
    .filter((d) => d >= today)
    .sort((a, b) => a.getTime() - b.getTime())

  if (upcoming.length === 0) return 'Check back for 2027 dates'

  const next = upcoming[0]
  return next.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** Count upcoming dates - client-side only */
function countUpcomingDates(dates: string[] | undefined, today: Date): number {
  if (!dates) return 0
  return dates.filter((d) => new Date(`${d}T00:00:00`) >= today).length
}

/** Program card component */
interface ProgramCardProps {
  program: RecurringProgram
  today: Date
  contactPhone: string
}

const ProgramCard = memo(function ProgramCard({ program, today, contactPhone }: ProgramCardProps) {
  const upcomingCount = countUpcomingDates(program.dates, today)
  const nextDate = formatNextDate(program.dates, today)

  return (
    <article key={program.id} className={styles['program-card']}>
      {/* Icon */}
      <div className={styles['program-card-icon']}>
        <ProgramIcon name={program.icon} />
      </div>

      {/* Content */}
      <div className={styles['program-card-content']}>
        <div className={styles['program-card-header']}>
          <h3 className={styles['program-card-title']}>{program.title}</h3>
          <span className={styles['program-card-tagline']}>{program.tagline}</span>
        </div>

        <p className={styles['program-card-description']}>{program.description}</p>

        {/* Highlights */}
        {program.highlights && program.highlights.length > 0 && (
          <ul
            className={styles['program-card-highlights']}
            aria-label={`${program.title} highlights`}
          >
            {program.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight}>
                <span className={styles['program-card-check']} aria-hidden="true">
                  &#10003;
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {/* Schedule info */}
        <dl className={styles['program-card-schedule']}>
          <div className={styles['program-card-schedule-item']}>
            <dt className={styles['program-card-schedule-label']}>Schedule</dt>
            <dd className={styles['program-card-schedule-value']}>{program.schedule}</dd>
          </div>
          <div className={styles['program-card-schedule-item']}>
            <dt className={styles['program-card-schedule-label']}>Duration</dt>
            <dd className={styles['program-card-schedule-value']}>{program.duration}</dd>
          </div>
          <div className={styles['program-card-schedule-item']}>
            <dt className={styles['program-card-schedule-label']}>Next Date</dt>
            <dd className={styles['program-card-schedule-value']}>{nextDate}</dd>
          </div>
          {program.capacity && (
            <div className={styles['program-card-schedule-item']}>
              <dt className={styles['program-card-schedule-label']}>Capacity</dt>
              <dd className={styles['program-card-schedule-value']}>{program.capacity} guests</dd>
            </div>
          )}
        </dl>

        {/* Upcoming dates badge */}
        {upcomingCount > 0 && (
          <p className={styles['program-card-dates-remaining']}>
            {upcomingCount} date{upcomingCount !== 1 ? 's' : ''} remaining in 2026
          </p>
        )}
      </div>

      {/* CTA */}
      <div className={styles['program-card-cta']}>
        {program.requiresTicket ? (
          <BookingButton
            itemId={program.fareHarborId || null}
            fallbackUrl={getTicketUrl(program) || '#'}
            className={`${styles['program-card-btn']} btn-small`}
            eventData={{
              id: program.id,
              title: program.title,
              fareHarborId: program.fareHarborId,
              pricing: program.pricing,
            }}
          >
            Reserve Your Spot
          </BookingButton>
        ) : (
          <a
            href={`tel:${contactPhone.replace(/[^0-9]/g, '')}`}
            className={`${styles['program-card-btn']} ${styles['program-card-btn--secondary']} btn-small`}
            aria-label={`Call to register for ${program.title}`}
          >
            Call to Register
          </a>
        )}
      </div>
    </article>
  )
})

export function ProgramsContent() {
  const { recurringPrograms } = eventsData
  const { contact } = siteInfo

  // Memoize today's date - only calculated once on client
  const today = useMemo(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
  }, [])

  // Convert object to array and memoize
  const programs = useMemo(
    () => Object.values(recurringPrograms) as RecurringProgram[],
    []
  )

  return (
    <>
      {/* ============================================
          HERO
          ============================================ */}
      <section className={styles['programs-hero']} aria-labelledby="programs-heading">
        <div className={styles['programs-hero-grain']} aria-hidden="true" />

        <div className={styles['programs-hero-content']}>
          <p className={styles['programs-hero-eyebrow']}>Beyond the Tour</p>
          <h1 id="programs-heading" className={styles['programs-hero-headline']}>
            Experience History
            <br />
            <span className={styles['programs-hero-headline-accent']}>Hands-On</span>
          </h1>
          <p className={styles['programs-hero-intro']}>
            Workshops, exclusive tours, and educational programs that go deeper than a regular
            visit. Learn frontier skills, handle real artifacts, and create lasting memories.
          </p>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ============================================
          PROGRAMS GRID
          ============================================ */}
      <section className={styles['programs-grid-section']} aria-labelledby="offerings-heading">
        <div className={styles['programs-grid-inner']}>
          <header className={styles['programs-grid-header']}>
            <h2 id="offerings-heading" className={styles['programs-grid-title']}>
              Our Programs
            </h2>
            <p className={styles['programs-grid-subtitle']}>
              From hands-on workshops to exclusive tours, find your way to experience Rocky Mount.
            </p>
          </header>

          <div className={styles['programs-grid']} role="list">
            {programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                today={today}
                contactPhone={contact.phone}
              />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* ============================================
          GROUP & PRIVATE BOOKINGS
          ============================================ */}
      <section className={styles['programs-groups']} aria-labelledby="groups-heading">
        <div className={styles['programs-groups-inner']}>
          <div className={styles['programs-groups-content']}>
            <h2 id="groups-heading" className={styles['programs-groups-headline']}>
              Private &amp; Group Experiences
            </h2>
            <p className={styles['programs-groups-desc']}>
              Planning a team building event, birthday party, or private workshop? We offer
              customized experiences for groups of all sizes.
            </p>
            <ul className={styles['programs-groups-list']} aria-label="Group experience options">
              <li>Private blacksmithing sessions</li>
              <li>Group hearth cooking experiences</li>
              <li>After-hours exclusive tours</li>
              <li>Corporate team building</li>
            </ul>
          </div>

          <div className={styles['programs-groups-actions']}>
            <a
              href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
              className={`${styles['programs-groups-btn']} ${styles['programs-groups-btn--primary']} btn-medium`}
              aria-label={`Call us at ${contact.phone} for group bookings`}
            >
              Call {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}?subject=Private%20Group%20Experience%20Inquiry`}
              className={`${styles['programs-groups-btn']} ${styles['programs-groups-btn--secondary']} btn-medium`}
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ============================================
          FIELD TRIPS CTA
          ============================================ */}
      <section className={styles['programs-education']} aria-labelledby="education-heading">
        <div className={styles['programs-education-inner']}>
          <div className={styles['programs-education-icon']}>
            <ProgramIcon name="book" />
          </div>
          <h2 id="education-heading" className={styles['programs-education-headline']}>
            Planning a Field Trip?
          </h2>
          <p className={styles['programs-education-desc']}>
            School groups receive special rates and curriculum-aligned programming. Our education
            team works with you to create the perfect experience.
          </p>
          <Link href="/educators" className={`${styles['programs-education-btn']} btn-medium`}>
            Educator Information
          </Link>
        </div>
      </section>
    </>
  )
}
