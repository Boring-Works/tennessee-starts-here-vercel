import type { Metadata } from 'next'
import Link from 'next/link'
import { Claim } from '@/components/evidence/Claim'
import siteInfo from '@/data/siteInfo.json'
import educatorPrograms from '@/data/educatorPrograms.json'
import styles from './page.module.css'

/** Section divider component for period-authentic transitions */
function SectionDivider({ variant = 'default' }: { variant?: 'default' | 'light' | 'dark' }) {
  return (
    <div className={`section-divider section-divider--${variant}`} aria-hidden="true">
      <span className="section-divider-line" />
      <span className="section-divider-flourish">&#10087;</span>
      <span className="section-divider-ornament">&#10022;</span>
      <span className="section-divider-flourish section-divider-flourish--flip">&#10087;</span>
      <span className="section-divider-line" />
    </div>
  )
}

import { PAGE_METADATA } from '@/lib/copy/metadata'

export const metadata: Metadata = {
  title: PAGE_METADATA.educators.title,
  description: PAGE_METADATA.educators.description,
  openGraph: {
    title: PAGE_METADATA.educators.ogTitle,
    description: PAGE_METADATA.educators.ogDescription,
    url: 'https://tennesseestartshere.com/educators',
  },
}

/** Icon name to emoji mapping for highlights */
const ICON_MAP: Record<string, string> = {
  CheckCircle: '📚',
  Hands: '🎓',
  Bus: '🚌',
}

/** Map JSON programs to display format */
const PROGRAMS = educatorPrograms.programs.map((program) => ({
  name: program.name,
  duration: program.duration,
  capacity: program.capacity,
  description: program.description,
}))

/** Map JSON highlights to stats format */
const STATS = educatorPrograms.highlights.map((highlight) => ({
  label: highlight.text,
  icon: ICON_MAP[highlight.icon] || '📋',
}))

export default function EducatorsPage() {
  const phoneNumber = siteInfo.contact.phone.replace(/[^0-9]/g, '')

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="educators-heading">
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>For Educators</p>
          <h1 id="educators-heading" className={styles.headline}>
            Tennessee&apos;s Government Started Here
          </h1>
          <p className={styles.subhead}>
            Give your students a tangible connection to Tennessee&apos;s founding.
          </p>
          <a
            href={educatorPrograms.bookingInfo.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles['cta-primary']} btn-medium`}
            aria-label="Book a field trip (opens in new tab)"
          >
            Book a Field Trip
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.stats} aria-label="Site features">
        <div className={styles['stats-inner']}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles['stats-item']}>
              <span className={styles['stats-icon']} aria-hidden="true">
                {stat.icon}
              </span>
              <span className={styles['stats-label']}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why This Place */}
      <section className={styles.history} aria-labelledby="history-heading">
        <div className={styles['history-inner']}>
          <h2 id="history-heading" className={styles['history-headline']}>
            Why This Place Matters
          </h2>
          <p className={styles['history-text']}>
            Rocky Mount is where{' '}
            <Claim doc="blount-arrival-1790" passage="glass-windows">
              Governor William Blount established the first seat of territorial government
            </Claim>{' '}
            in October 1790. Here, students stand where the{' '}
            <Claim doc="treaty-holston-1791" passage="article-1-peace">
              Treaty of Holston was planned
            </Claim>
            &mdash;a peace agreement between the United States and Cherokee Nation that shaped
            Tennessee&apos;s borders.
          </p>
          <Link href="/evidence" className={styles['history-link']}>
            Explore primary sources
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Programs */}
      <section className={styles.programs} aria-labelledby="programs-heading">
        <div className={styles['programs-inner']}>
          <h2 id="programs-heading" className={styles['programs-headline']}>
            Programs
          </h2>
          <div className={styles['programs-grid']} role="list">
            {PROGRAMS.map((program) => (
              <article key={program.name} className={styles['program-card']} role="listitem">
                <h3 className={styles['program-name']}>{program.name}</h3>
                <div className={styles['program-meta']}>
                  <span>{program.duration}</span>
                  <span className={styles['program-divider']} aria-hidden="true">
                    &middot;
                  </span>
                  <span>{program.capacity}</span>
                </div>
                <p className={styles['program-desc']}>{program.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* Book CTA */}
      <section className={styles.booking} aria-labelledby="booking-heading">
        <div className={styles['booking-inner']}>
          <h2 id="booking-heading" className={styles['booking-headline']}>
            Book a Field Trip
          </h2>
          <a
            href={educatorPrograms.bookingInfo.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles['cta-primary']} btn-medium`}
            aria-label="Book a field trip (opens in new tab)"
          >
            Book a Field Trip
            <span aria-hidden="true"> &rarr;</span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <p className={styles['booking-contact']}>
            Questions?{' '}
            <a
              href={`mailto:${educatorPrograms.bookingInfo.email}`}
              aria-label="Email Rocky Mount Museum"
            >
              {educatorPrograms.bookingInfo.email}
            </a>{' '}
            |{' '}
            <a href={`tel:+1${phoneNumber}`} aria-label={`Call ${siteInfo.contact.phone}`}>
              {siteInfo.contact.phone}
            </a>
          </p>
        </div>
      </section>

      {/* Funding */}
      <section className={styles.funding} aria-labelledby="funding-heading">
        <div className={styles['funding-inner']}>
          <h2 id="funding-heading" className={styles['funding-headline']}>
            Funding Your Trip
          </h2>
          <ul className={styles['funding-list']}>
            {educatorPrograms.funding.sources.map((source) => (
              <li key={source.name}>
                <strong>{source.name}:</strong> {source.description}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Resources */}
      <section className={styles.resources} aria-labelledby="resources-heading">
        <div className={styles['resources-inner']}>
          <h2 id="resources-heading" className={styles['resources-headline']}>
            Downloadable Resources
          </h2>
          <p className={styles['resources-coming']}>Classroom materials coming March 2026.</p>
          <p className={styles['resources-email']}>Or email us for current materials.</p>
        </div>
      </section>
    </>
  )
}
