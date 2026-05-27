import type { Metadata } from 'next'
import eventsData from '@/data/events.json'
import siteInfo from '@/data/siteInfo.json'
import { JsonLd } from '@/components/JsonLd'
import { generateEventsListSchema, generateBreadcrumbSchema } from '@/lib/seo'
import type { Event } from '@/lib/schemas/events'
import { EventsToursBanner } from '@/components/events/EventsToursBanner'
import { EventsHoursCTA } from '@/components/events/EventsHoursCTA'
import { EventsCalendarClient } from '@/components/events/EventsCalendarClient'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '2026 Events Calendar',
  description:
    "2026 events calendar at Rocky Mount State Historic Site. New programming for America's 250th anniversary and Tennessee's 230th birthday.",
  openGraph: {
    title: '2026 Events Calendar | Tennessee Starts Here',
    description:
      "2026 events calendar at Rocky Mount State Historic Site. New programming for America's 250th anniversary and Tennessee's 230th birthday.",
    url: 'https://tennesseestartshere.com/events',
  },
}

// Month character lines - the personality of each month
const monthCharacters: Record<string, string> = {
  'March 2026': 'The journey begins',
  'April 2026': 'Stories come alive',
  'May 2026': 'The frontier awakens',
  'June 2026': 'Tennessee celebrates 230',
  'July 2026': 'America turns 250',
  'August 2026': 'Honoring all who shaped this land',
  'September 2026': 'Descendants gather',
  'October 2026': 'Harvest and haunting',
  'November 2026': 'Traditions begin',
  'December 2026': 'The year closes by candlelight',
}

// All months in order for the progress bar
const allMonths = [
  'March 2026',
  'April 2026',
  'May 2026',
  'June 2026',
  'July 2026',
  'August 2026',
  'September 2026',
  'October 2026',
  'November 2026',
  'December 2026',
]

function groupEventsByMonth(
  events: typeof eventsData.events
): Record<string, typeof eventsData.events> {
  const grouped: Record<string, typeof eventsData.events> = {}

  for (const event of events) {
    const date = new Date(`${event.date}T12:00:00`)
    const monthKey = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })

    if (!grouped[monthKey]) {
      grouped[monthKey] = []
    }
    grouped[monthKey].push(event)
  }

  return grouped
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

function formatPrice(cents: number): string {
  const dollars = cents / 100
  return dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`
}

// Get next 3 upcoming events
function getUpcomingEvents(count: number = 3) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming: { event: Event; daysAway: number }[] = []
  const events = eventsData.events as unknown as Event[]

  for (const event of events) {
    const eventDate = new Date(`${event.date}T12:00:00`)
    if (eventDate >= today) {
      const diffTime = eventDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      upcoming.push({ event, daysAway: diffDays })
      if (upcoming.length >= count) break
    }
  }

  return upcoming
}

const eventsBreadcrumbs = [
  { name: 'Home', url: 'https://tennesseestartshere.com' },
  { name: 'Events', url: 'https://tennesseestartshere.com/events' },
]

export default function EventsPage() {
  const groupedEvents = groupEventsByMonth(eventsData.events)
  const upcomingEvents = getUpcomingEvents(3)

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(eventsBreadcrumbs)} />
      <JsonLd data={generateEventsListSchema(eventsData.events)} />
      {/* ============================================
          PAGE HEADER - The Commemorative Year
          ============================================ */}
      <section className={styles['calendar-header']} aria-labelledby="calendar-page-heading">
        <div className={styles['calendar-header-content']}>
          {/* Eyebrow */}
          <p className={styles['calendar-eyebrow']}>Rocky Mount State Historic Site</p>

          {/* Main headline */}
          <h1 id="calendar-page-heading" className={styles['calendar-headline']}>
            <span className={styles['calendar-headline-year']}>2026</span>
            <span className={styles['calendar-headline-text']}>The Commemorative Year</span>
          </h1>

          {/* Subheadline - Brand-approved tagline */}
          <p className={styles['calendar-subheadline']}>
            The nation turns 250. Tennessee turns 230.
            <br />
            <span className={styles['calendar-subheadline-tagline']}>
              This is where that story started.
            </span>
          </p>

          {/* Decorative divider */}
          <div className={styles['calendar-divider']} aria-hidden="true" />

          {/* Coming Up - Featured Strip with 3 events */}
          {upcomingEvents.length > 0 && (
            <div className={styles['coming-up']}>
              <h2 className={styles['coming-up-label']} id="coming-up-heading">
                Coming Up
              </h2>
              <div
                className={styles['coming-up-grid']}
                role="region"
                aria-labelledby="coming-up-heading"
              >
                {upcomingEvents.map((item, index) => (
                  <a
                    key={item.event.id}
                    href={`#${item.event.id}`}
                    className={`${styles['coming-up-card']} ${index === 0 ? styles['coming-up-card--next'] : ''}`}
                  >
                    {index === 0 && <span className={styles['coming-up-card-badge']}>Next</span>}
                    <span className={styles['coming-up-card-title']}>{item.event.title}</span>
                    <span className={styles['coming-up-card-meta']}>
                      <span className={styles['coming-up-card-date']}>
                        {formatDate(item.event.date)}
                        {item.daysAway <= 7 && (
                          <span className={styles['coming-up-card-urgency']}>
                            {item.daysAway === 0
                              ? ' — Today!'
                              : item.daysAway === 1
                                ? ' — Tomorrow!'
                                : ` — ${item.daysAway} days`}
                          </span>
                        )}
                      </span>
                      <span className={styles['coming-up-card-price']}>
                        {!item.event.requiresTicket
                          ? 'Free'
                          : 'pricing' in item.event &&
                              item.event.pricing &&
                              item.event.pricing.adult
                            ? `From ${formatPrice(item.event.pricing.adult)}`
                            : 'Ticketed'}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Ticket note - clearer language */}
          <p className={styles['calendar-pricing-note']}>
            Most events require advance tickets · Separate from regular site admission
          </p>

          {/* Booking CTA - Prominent call to action */}
          <div className="text-center mb-8 max-w-2xl mx-auto mt-8">
            <a
              href="https://fareharbor.com/embeds/book/rockymountmuseum/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Reserve Your Spot for 2026 Events
              <span aria-hidden="true">→</span>
            </a>
            <p className="text-sm text-secondary dark:text-white/60 mt-3">
              Most events require advance tickets · Book early to secure your place
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          YEAR PROGRESS BAR - Sticky Navigation
          ============================================ */}
      <nav className={styles['year-progress']} aria-label="Navigate by month">
        <div className={styles['year-progress-inner']}>
          <div className={styles['year-progress-track']}>
            {allMonths.map((month) => {
              const hasEvents = groupedEvents[month] && groupedEvents[month].length > 0
              const monthId = month.toLowerCase().replace(/\s+/g, '-')
              const shortMonth = month.split(' ')[0].slice(0, 3)

              return hasEvents ? (
                <a
                  key={month}
                  href={`#${monthId}`}
                  className={`${styles['year-progress-month']} ${styles['year-progress-month--active']}`}
                  aria-label={`Jump to ${month}`}
                >
                  <span className={styles['year-progress-month-dot']} aria-hidden="true" />
                  <span className={styles['year-progress-month-label']}>{shortMonth}</span>
                </a>
              ) : (
                <span
                  key={month}
                  className={`${styles['year-progress-month']} ${styles['year-progress-month--empty']}`}
                  aria-hidden="true"
                >
                  <span className={styles['year-progress-month-dot']} aria-hidden="true" />
                  <span className={styles['year-progress-month-label']}>{shortMonth}</span>
                </span>
              )
            })}
          </div>
        </div>
      </nav>

      {/* ============================================
          FILTER BAR + LIVING CALENDAR (Client Component)
          ============================================ */}
      <EventsCalendarClient
        groupedEvents={groupedEvents}
        allEvents={eventsData.events}
        monthCharacters={monthCharacters}
      />

      {/* ============================================
          DAILY TOURS BANNER
          ============================================ */}
      <EventsToursBanner />

      {/* ============================================
          VISIT CTA - See It In Person
          ============================================ */}
      <EventsHoursCTA siteInfo={siteInfo} />

      {/* ============================================
          CONTACT - Group Visits
          ============================================ */}
      <section className={styles['calendar-contact']} aria-labelledby="calendar-contact-heading">
        <div className={styles['calendar-contact-inner']}>
          <h2 id="calendar-contact-heading" className={styles['calendar-contact-headline']}>
            Planning a Group Visit?
          </h2>
          <p className={styles['calendar-contact-desc']}>
            Group rates for 10+. School programs and private tours available.
          </p>
          <a
            href={`tel:+1${siteInfo.contact.phone.replace(/[^0-9]/g, '')}`}
            className={styles['calendar-contact-btn']}
          >
            {siteInfo.contact.phone}
          </a>
        </div>
      </section>
    </>
  )
}
