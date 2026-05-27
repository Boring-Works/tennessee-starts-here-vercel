import type { Metadata } from 'next'
import Link from 'next/link'
import { Claim } from '@/components/evidence/Claim'
import { PAGE_METADATA } from '@/lib/copy/metadata'
import groupsData from '@/data/groups.json'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: PAGE_METADATA.groups.title,
  description: PAGE_METADATA.groups.description,
  openGraph: {
    title: PAGE_METADATA.groups.ogTitle,
    description: PAGE_METADATA.groups.ogDescription,
    url: 'https://tennesseestartshere.com/groups',
  },
}

// Map group types from JSON
const GROUP_TYPES = groupsData.types.map((type) => type.name)

// Map rates from JSON with formatted display
const RATES = groupsData.rates.map((rate) => ({
  tier: rate.label,
  price: rate.price === 0 ? 'Complimentary' : `$${rate.price}/person`,
  note: rate.notes || '',
}))

// Map what to know from JSON
const WHAT_TO_KNOW = groupsData.whatToKnow.map((item) => item.text)

export default function GroupsPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="groups-heading">
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>Group Visits</p>
          <h1 id="groups-heading" className={styles.headline}>
            Bring Your Group
          </h1>
          <p className={styles.subhead}>Special rates for tours, reunions, and organizations</p>
        </div>
      </section>

      {/* Hero Testimonial */}
      <section className={styles['testimonial-hero']} aria-label="Educator testimonial">
        <div className={styles['testimonial-hero-inner']}>
          <blockquote className={styles['testimonial-quote']}>
            <p className={styles['testimonial-text']}>
              Loved the homeschool day activities—meeting all of the educators who so wonderfully
              shared the life skills of a working 1700s farm.
            </p>
            <footer className={styles['testimonial-attribution']}>
              <cite className={styles['testimonial-source']}>Texas family visitor</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* We Welcome */}
      <section className={styles.welcome} aria-labelledby="welcome-heading">
        <div className={styles['welcome-inner']}>
          <h2 id="welcome-heading" className={styles['welcome-headline']}>
            We Welcome
          </h2>
          <ul className={styles['welcome-list']} >
            {GROUP_TYPES.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Historical Context */}
      <section className={styles.history} aria-label="Historical context">
        <div className={styles['history-inner']}>
          <p className={styles['history-text']}>
            Your group will tour the home where{' '}
            <Claim doc="blount-arrival-1790" passage="glass-windows">
              Governor Blount noted the rare &quot;Glass Windows&quot;
            </Claim>{' '}
            in 1790—Tennessee&apos;s first capital. View{' '}
            <Link href="/evidence" className={styles['history-link']}>
              primary source documents
              <span className="sr-only"> (opens evidence page)</span>
              <span aria-hidden="true"> →</span>
            </Link>
          </p>
        </div>
      </section>

      {/* Rates */}
      <section className={styles.rates} aria-labelledby="rates-heading">
        <div className={styles['rates-inner']}>
          <h2 id="rates-heading" className={styles['rates-headline']}>
            Group Rates
          </h2>
          <dl className={styles['rates-table']}>
            {RATES.map((rate) => (
              <div key={rate.tier} className={styles['rates-row']}>
                <dt className={styles['rates-tier']}>{rate.tier}</dt>
                <dd className={styles['rates-price']}>
                  {rate.price}
                  {rate.note && <span className={styles['rates-note']}> {rate.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
          <p className={styles['rates-includes']}>
            All visits include: {groupsData.includes.slice(0, 2).join(', ').toLowerCase()}
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials} aria-labelledby="testimonials-heading">
        <div className={styles['testimonials-inner']}>
          <h2 id="testimonials-heading" className={styles['testimonials-headline']}>
            What Visitors Say
          </h2>
          <div className={styles['testimonials-grid']}>
            <blockquote className={styles['testimonial-card']}>
              <p className={styles['testimonial-text']}>
                Children ages 8 and 11 were engaged for hours at the different stations and
                buildings.
              </p>
              <footer className={styles['testimonial-attribution']}>
                <cite className={styles['testimonial-source']}>Harvest Festival visitor</cite>
              </footer>
            </blockquote>
            <blockquote className={styles['testimonial-card']}>
              <p className={styles['testimonial-text']}>
                Spooky stories told and historical facts given—educational and interesting
              </p>
              <footer className={styles['testimonial-attribution']}>
                <cite className={styles['testimonial-source']}>Haunted Rocky Mount visitor</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Contact Form CTA */}
      <section className={styles.contact} aria-labelledby="contact-heading">
        <div className={styles['contact-inner']}>
          <h2 id="contact-heading" className={styles['contact-headline']}>
            Plan Your Group Visit
          </h2>
          <p className={styles['contact-desc']}>Contact us to schedule your group tour.</p>
          <div className={styles['contact-methods']} role="group" aria-label="Contact options">
            <a
              href={`tel:+1${groupsData.booking.phone.replace(/[^0-9]/g, '')}`}
              className={styles['contact-btn-primary']}
              aria-label={`Call us at ${groupsData.booking.phone}`}
            >
              Call {groupsData.booking.phone}
            </a>
            <a
              href={`mailto:${groupsData.booking.email}`}
              className={styles['contact-btn-secondary']}
              aria-label={`Email us at ${groupsData.booking.email}`}
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* What to Know */}
      <section className={styles.know} aria-labelledby="know-heading">
        <div className={styles['know-inner']}>
          <h2 id="know-heading" className={styles['know-headline']}>
            What to Know
          </h2>
          <ul className={styles['know-list']} >
            {WHAT_TO_KNOW.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
