import type { Metadata } from 'next'
import Link from 'next/link'
import { BookingButton } from '@/components/booking'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Stitching Independence | Tennessee Starts Here',
  description:
    "Two days of stars, stripes, and stitches at Rocky Mount's Stitching Independence event. Saturday: flag historian David Doan and America 250 flag dedication. Sunday: the Betsy Ross Sip & Sew wine and needlework workshop.",
  openGraph: {
    title: 'Stitching Independence | Tennessee Starts Here',
    description:
      "Two days celebrating the American flag. David Doan's flag history lecture Saturday, Betsy Ross Sip & Sew Sunday. June 13-14, 2026.",
    url: 'https://tennesseestartshere.com/events/stitching-independence',
  },
}

export default function StitchingIndependencePage() {
  return (
    <>
      {/* ============================================
          HERO - Stars, Stripes, Stitches
          ============================================ */}
      <section className={styles['stitch-hero']} aria-labelledby="stitch-heading">
        <div className={styles['stitch-hero-content']}>
          {/* Eyebrow */}
          <p className={styles['stitch-eyebrow']}>
            <time dateTime="2026-06-13">June 13–14, 2026</time> · National Flag Day Celebration ·
            Rocky Mount State Historic Site
          </p>

          {/* Main headline */}
          <h1 id="stitch-heading" className={styles['stitch-headline']}>
            <span className={styles['stitch-headline-small']}>Stitch Your Name</span>
            <span className={styles['stitch-headline-large']}>Into History</span>
          </h1>

          {/* Hook */}
          <p className={styles['stitch-hook']}>
            Celebrate the American flag at Tennessee&apos;s birthplace. Where Blount and Washington
            founded a state, we honor the flag that binds our nation. Saturday: flag historian David
            Doan traces 250 years of stars and stripes, followed by Rocky Mount&apos;s America 250
            commemorative flag dedication. Sunday (National Flag Day): wine, needles, and the art of
            flag-making at the Betsy Ross Sip & Sew beneath century-old oaks.
          </p>

          {/* CTA */}
          <div className={styles['stitch-hero-cta-group']}>
            <BookingButton
              itemId="562806"
              fallbackUrl="https://fareharbor.com/rockymountmuseum/items/562806/"
              className={styles['stitch-hero-cta']}
              eventData={{
                id: 'stitching-independence',
                title: 'Stitching Independence',
                fareHarborId: '562806',
                pricing: {
                  adult: 1200,
                  senior: 1000,
                  child: 800,
                  underFive: 0,
                  members: 0,
                },
              }}
            >
              Reserve Your Seat
            </BookingButton>
            <a href="#sip-and-sew" className={styles['stitch-hero-cta-secondary']}>
              About Sip & Sew
            </a>
          </div>

          {/* Signature badge */}
          <p className={styles['stitch-badge']}>
            <span className={styles['stitch-badge-icon']} aria-hidden="true">
              ★
            </span>
            Signature Event
          </p>
        </div>
      </section>

      {/* ============================================
          WEEKEND OVERVIEW
          ============================================ */}
      <section className={styles['stitch-overview']} aria-labelledby="overview-heading">
        <div className={styles['stitch-overview-inner']}>
          <h2 id="overview-heading" className={styles['stitch-overview-headline']}>
            One Weekend. Two Experiences.
          </h2>

          <div className={styles['stitch-overview-grid']}>
            {/* Saturday */}
            <article className={styles['stitch-day']}>
              <header className={styles['stitch-day-header']}>
                <time dateTime="2026-06-13" className={styles['stitch-day-date']}>
                  <span className={styles['stitch-day-weekday']}>Saturday</span>
                  <span className={styles['stitch-day-number']}>June 13</span>
                </time>
              </header>
              <div className={styles['stitch-day-content']}>
                <h3 className={styles['stitch-day-title']}>The Story of the Flag</h3>
                <p className={styles['stitch-day-desc']}>
                  Flag historian David Doan traces 250 years of stars and stripes, followed by Rocky
                  Mount&apos;s America 250 commemorative flag dedication.
                </p>
                <ul className={styles['stitch-day-features']}>
                  <li>David Doan lecture at 11:00 AM</li>
                  <li>Flag dedication ceremony</li>
                  <li>Living history demonstrations</li>
                  <li>All ages welcome</li>
                </ul>
              </div>
            </article>

            {/* Sunday */}
            <article
              id="sip-and-sew"
              className={`${styles['stitch-day']} ${styles['stitch-day--featured']}`}
            >
              <header className={styles['stitch-day-header']}>
                <time dateTime="2026-06-14" className={styles['stitch-day-date']}>
                  <span className={styles['stitch-day-weekday']}>Sunday</span>
                  <span className={styles['stitch-day-number']}>June 14</span>
                </time>
                <span className={styles['stitch-day-badge']}>National Flag Day</span>
              </header>
              <div className={styles['stitch-day-content']}>
                <h3 className={styles['stitch-day-title']}>Betsy Ross Sip & Sew</h3>
                <p className={styles['stitch-day-desc']}>
                  Wine and needlework beneath the oaks. Learn flag-making techniques from colonial
                  textile experts while enjoying local wines. Create your own star to take home.
                </p>
                <ul className={styles['stitch-day-features']}>
                  <li>Adults only (21+)</li>
                  <li>Wine & refreshments included</li>
                  <li>Take home your handiwork</li>
                  <li>All skill levels welcome</li>
                </ul>
                <p className={styles['stitch-day-note']}>
                  Sip & Sew requires separate registration
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED SPEAKER - David Doan
          ============================================ */}
      <section className={styles['stitch-speaker']} aria-labelledby="speaker-heading">
        <div className={styles['stitch-speaker-inner']}>
          <header className={styles['stitch-speaker-header']}>
            <p className={styles['stitch-speaker-eyebrow']}>Saturday, June 13 at 11:00 AM</p>
            <h2 id="speaker-heading" className={styles['stitch-speaker-headline']}>
              The Story of the American Flag
            </h2>
          </header>

          <div className={styles['stitch-speaker-content']}>
            <div className={styles['stitch-speaker-info']}>
              <h3 className={styles['stitch-speaker-name']}>David Doan</h3>
              <p className={styles['stitch-speaker-title']}>
                President, Overmountain Victory Trail Association
              </p>
              <p className={styles['stitch-speaker-bio']}>
                David Doan of Blountville, Tennessee serves as President of the Overmountain Victory
                Trail Association and President of the Rocky Mount Chapter. A University of
                Tennessee Knoxville graduate and eight-year National Guard veteran, David has
                dedicated his life to preserving Revolutionary War history. His lectures bring the
                Overmountain Men&apos;s story to life—the same men who marched past Rocky Mount to
                Kings Mountain in 1780. He speaks regularly at historic sites and veteran ceremonies
                throughout the region.
              </p>
            </div>

            <div className={styles['stitch-speaker-topics']}>
              <h4 className={styles['stitch-speaker-topics-title']}>You&apos;ll Discover</h4>
              <ul className={styles['stitch-speaker-topics-list']}>
                <li>The Grand Union flag that flew at Boston</li>
                <li>The truth about Betsy Ross</li>
                <li>How stars and stripes evolved over 250 years</li>
                <li>The flag that inspired the Star-Spangled Banner</li>
              </ul>
            </div>
          </div>

          <div className={styles['stitch-speaker-ceremony']}>
            <h4 className={styles['stitch-speaker-ceremony-title']}>Following the Lecture</h4>
            <p className={styles['stitch-speaker-ceremony-text']}>
              Join us for the dedication of Rocky Mount&apos;s America 250 commemorative flag—a
              lasting symbol of our commitment to preserving Tennessee&apos;s founding story.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SIP & SEW DETAILS
          ============================================ */}
      <section className={styles['stitch-sip']} aria-labelledby="sip-heading">
        <div className={styles['stitch-sip-inner']}>
          <header className={styles['stitch-sip-header']}>
            <p className={styles['stitch-sip-eyebrow']}>Sunday, June 14 · National Flag Day</p>
            <h2 id="sip-heading" className={styles['stitch-sip-headline']}>
              Betsy Ross Sip & Sew
            </h2>
            <p className={styles['stitch-sip-tagline']}>Wine. Needles. History.</p>
          </header>

          <div className={styles['stitch-sip-content']}>
            <p className={styles['stitch-sip-intro']}>
              Beneath the shade of ancient oaks, learn the needle arts that created our
              nation&apos;s first flags. Colonial textile experts guide you through traditional
              stitching techniques while you enjoy wines from local Tennessee vineyards.
            </p>

            <div className={styles['stitch-sip-details']}>
              <div className={styles['stitch-sip-detail']}>
                <h4 className={styles['stitch-sip-detail-title']}>What&apos;s Included</h4>
                <ul className={styles['stitch-sip-detail-list']}>
                  <li>Expert instruction in colonial needlework</li>
                  <li>All materials and supplies</li>
                  <li>Wine tastings from Tennessee vineyards</li>
                  <li>Light refreshments</li>
                  <li>Your completed star to take home</li>
                </ul>
              </div>

              <div className={styles['stitch-sip-detail']}>
                <h4 className={styles['stitch-sip-detail-title']}>Good to Know</h4>
                <ul className={styles['stitch-sip-detail-list']}>
                  <li>Adults 21+ only</li>
                  <li>No sewing experience needed</li>
                  <li>2-hour workshop session</li>
                  <li>Limited to 24 participants</li>
                  <li>Outdoor seating (weather permitting)</li>
                </ul>
              </div>
            </div>
            <div className={styles['stitch-sip-pricing']}>
              <p>
                <strong>Saturday Admission:</strong> Adult $12 · Senior $10 · Child $8 · Under 5
                Free
              </p>
              <p>
                <strong>Sunday Sip & Sew:</strong> $18 per person (21+ only, limited to 24)
              </p>
              <p>
                <strong>Weekend Bundle:</strong> Saturday + Sunday = $28 (save $2)
              </p>
            </div>

            <div className={styles['stitch-sip-cta-wrapper']}>
              <p className={styles['stitch-sip-note']}>
                Sip & Sew requires separate registration from Saturday admission.
              </p>
              <p className={styles['stitch-sip-waitlist']}>
                <strong>Limited to 24 participants.</strong> Join the waitlist to be notified when
                registration opens.
              </p>
              <a
                href="mailto:info@rockymountmuseum.com?subject=Sip%20%26%20Sew%20Waitlist&body=Please%20add%20me%20to%20the%20Betsy%20Ross%20Sip%20%26%20Sew%20waitlist%20for%20June%2014%2C%202026."
                className={styles['stitch-sip-cta']}
              >
                Join the Waitlist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIAL - CRAFT DEMONSTRATIONS
          ============================================ */}
      <section className={styles['stitch-testimonial']} aria-labelledby="testimonial-heading">
        <div className={styles['stitch-testimonial-inner']}>
          <blockquote className={styles['stitch-testimonial-quote']}>
            <p id="testimonial-heading" className={styles['stitch-testimonial-text']}>
              Rocky Mount&apos;s craft demonstrations feature amazing and talented
              artisans—you&apos;ll learn hands-on techniques from experts who bring history to life.
            </p>
            <footer className={styles['stitch-testimonial-footer']}>
              <p className={styles['stitch-testimonial-credit']}>— Visitor Review</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ============================================
          PRACTICAL INFO
          ============================================ */}
      <section className={styles['stitch-info']} aria-labelledby="info-heading">
        <div className={styles['stitch-info-inner']}>
          <h2 id="info-heading" className={styles['stitch-info-headline']}>
            Plan Your Visit
          </h2>

          <div className={styles['stitch-info-grid']}>
            <div className={styles['stitch-info-item']}>
              <h3 className={styles['stitch-info-title']}>Saturday Schedule</h3>
              <ul className={styles['stitch-info-list']}>
                <li>
                  <strong>10:00 AM</strong> — Gates open
                </li>
                <li>
                  <strong>11:00 AM</strong> — David Doan lecture
                </li>
                <li>
                  <strong>12:30 PM</strong> — Flag dedication ceremony
                </li>
                <li>
                  <strong>1:00–5:00 PM</strong> — Living history
                </li>
              </ul>
            </div>

            <div className={styles['stitch-info-item']}>
              <h3 className={styles['stitch-info-title']}>Sunday Schedule</h3>
              <ul className={styles['stitch-info-list']}>
                <li>
                  <strong>12:00 PM</strong> — Sip & Sew check-in
                </li>
                <li>
                  <strong>12:30–2:30 PM</strong> — Workshop session 1
                </li>
                <li>
                  <strong>3:00–5:00 PM</strong> — Workshop session 2
                </li>
              </ul>
            </div>

            <div className={styles['stitch-info-item']}>
              <h3 className={styles['stitch-info-title']}>What to Bring</h3>
              <ul className={styles['stitch-info-list']}>
                <li>Lawn chairs for Saturday</li>
                <li>Sunscreen and hats</li>
                <li>Photo ID (Sunday, 21+)</li>
                <li>Reading glasses if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ
          ============================================ */}
      <section className={styles['stitch-faq']} aria-labelledby="faq-heading">
        <div className={styles['stitch-faq-inner']}>
          <h2 id="faq-heading" className={styles['stitch-faq-headline']}>
            Questions?
          </h2>

          <div
            className={styles['stitch-faq-grid']}
            role="region"
            aria-label="Frequently asked questions"
          >
            <details className={styles['stitch-faq-item']}>
              <summary id="stitch-faq-q1" className={styles['stitch-faq-question']}>
                Do I need to attend both days?
              </summary>
              <p className={styles['stitch-faq-answer']} aria-labelledby="stitch-faq-q1">
                No! Saturday and Sunday are separate experiences. You can attend one or both. Most
                guests come for the David Doan lecture Saturday and return for Sip & Sew Sunday.
              </p>
            </details>

            <details className={styles['stitch-faq-item']}>
              <summary id="stitch-faq-q2" className={styles['stitch-faq-question']}>
                I&apos;ve never sewn before. Can I do Sip & Sew?
              </summary>
              <p className={styles['stitch-faq-answer']} aria-labelledby="stitch-faq-q2">
                Absolutely! Our textile experts guide you through every stitch. The techniques are
                simple enough for complete beginners, and you&apos;ll leave with something
                beautiful.
              </p>
            </details>

            <details className={styles['stitch-faq-item']}>
              <summary id="stitch-faq-q3" className={styles['stitch-faq-question']}>
                Can children attend Saturday?
              </summary>
              <p className={styles['stitch-faq-answer']} aria-labelledby="stitch-faq-q3">
                Yes! Saturday is family-friendly. Children under 5 attend free. The lecture is
                appropriate for ages 10+ but younger children may enjoy the living history
                demonstrations.
              </p>
            </details>

            <details className={styles['stitch-faq-item']}>
              <summary id="stitch-faq-q4" className={styles['stitch-faq-question']}>
                What if I don&apos;t drink alcohol?
              </summary>
              <p className={styles['stitch-faq-answer']} aria-labelledby="stitch-faq-q4">
                Non-alcoholic beverages are also available at Sip & Sew. You&apos;re welcome to
                participate in the needlework without the wine—but you must still be 21+ to attend.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className={styles['stitch-closing']} aria-labelledby="closing-heading">
        <div className={styles['stitch-closing-inner']}>
          <p className={styles['stitch-closing-question']}>250 years of stars and stripes.</p>
          <h2 id="closing-heading" className={styles['stitch-closing-headline']}>
            Stitch Yourself Into the Story
          </h2>
          <p className={styles['stitch-closing-subtext']}>
            Two days. Two experiences. One symbol that unified a nation. Saturday: trace the
            flag&apos;s 250-year evolution with historian David Doan. Sunday: stitch your own star
            to take home—a hands-on connection to Betsy Ross&apos;s craft.
          </p>

          <div className={styles['stitch-closing-cta-group']}>
            <BookingButton
              itemId="562806"
              fallbackUrl="https://fareharbor.com/rockymountmuseum/items/562806/"
              className={styles['stitch-closing-cta']}
              eventData={{
                id: 'stitching-independence',
                title: 'Stitching Independence',
                fareHarborId: '562806',
                pricing: {
                  adult: 1200,
                  senior: 1000,
                  child: 800,
                  underFive: 0,
                  members: 0,
                },
              }}
            >
              Reserve Your Seat
            </BookingButton>
            <p className={styles['stitch-closing-note']}>
              <strong>Saturday only:</strong> Adult $12 · Senior $10 · Child $8 · Under 5 Free
              <br />
              <strong>Add Sip & Sew Sunday:</strong> +$18 per person
            </p>
          </div>

          <p className={styles['stitch-closing-contact']}>
            Questions? Call{' '}
            <a href="tel:+14235387396" className={styles['stitch-closing-link']}>
              (423) 538-7396
            </a>
          </p>

          <Link href="/events" className={styles['stitch-closing-back']}>
            <span aria-hidden="true">←</span> Back to All Events
          </Link>
        </div>
      </section>
    </>
  )
}
