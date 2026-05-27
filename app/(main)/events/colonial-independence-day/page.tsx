import type { Metadata } from 'next'
import Link from 'next/link'
import { BookingButton } from '@/components/booking'
import VintageGauge from '@/components/VintageGauge'
import enrollmentData from '@/data/enrollment.json'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Colonial Independence Day | Tennessee Starts Here',
  description:
    "America turns 250—and you're standing where Tennessee began. July 4, 2026 at Rocky Mount. The First 250 ceremony reads each enrolled name aloud. Don't watch history—be part of it.",
  openGraph: {
    title: 'Colonial Independence Day | Tennessee Starts Here',
    description:
      "America's 250th birthday at Tennessee's first capitol. Muskets fire. Period music plays. Your name read aloud.",
    url: 'https://tennesseestartshere.com/events/colonial-independence-day',
  },
}

// Enrollment data
const CURRENT_ENROLLED = enrollmentData.currentEnrolled
const TOTAL_SPOTS = enrollmentData.totalSpots

export default function ColonialIndependenceDayPage() {
  return (
    <>
      {/* ============================================
          HERO - The Day. The Place.
          ============================================ */}
      <section className={styles['ind-hero']} aria-labelledby="ind-heading">
        <div className={styles['ind-hero-content']}>
          {/* Eyebrow */}
          <p className={styles['ind-eyebrow']}>
            <time dateTime="2026-07-04">July 4, 2026</time> · America&apos;s 250th Birthday
          </p>

          {/* Main headline */}
          <h1 id="ind-heading" className={styles['ind-headline']}>
            <span className={styles['ind-headline-small']}>250 Years.</span>
            <span className={styles['ind-headline-large']}>One Day. This Ground.</span>
          </h1>

          {/* Emotional hook */}
          <p className={styles['ind-hook']}>
            America turns 250—and you&apos;re standing where Tennessee began. The First 250 ceremony
            reads each enrolled name aloud. Muskets fire. Period music plays. The flag rises.
          </p>

          {/* Scarcity signal */}
          <div className={styles['ind-hero-gauge']}>
            <VintageGauge
              current={CURRENT_ENROLLED}
              total={TOTAL_SPOTS}
              label="First 250 Registry"
              showRemaining={true}
              size="small"
              theme="dark"
            />
          </div>

          {/* CTA */}
          <div className={styles['ind-hero-cta-group']}>
            <BookingButton
              itemId="562810"
              fallbackUrl="https://fareharbor.com/rockymountmuseum/items/562810/"
              className={styles['ind-hero-cta']}
              eventData={{
                id: 'colonial-independence-day',
                title: 'Colonial Independence Day',
                fareHarborId: '562810',
                pricing: {
                  adult: 1200,
                  senior: 1000,
                  child: 800,
                  underFive: 0,
                  members: 0,
                },
              }}
            >
              Claim Your Place in History
            </BookingButton>
            <Link href="/first-250" className={styles['ind-hero-cta-secondary']}>
              Join the First 250 Registry
            </Link>
          </div>

          {/* Signature badge */}
          <p className={styles['ind-badge']}>
            <span className={styles['ind-badge-icon']} aria-hidden="true">
              ★
            </span>
            Signature Event
          </p>
        </div>
      </section>

      {/* ============================================
          WHY THIS DAY MATTERS
          ============================================ */}
      <section className={styles['ind-why']} aria-labelledby="why-heading">
        <div className={styles['ind-why-inner']}>
          <p className={styles['ind-why-eyebrow']}>Why This Matters</p>
          <h2 id="why-heading" className={styles['ind-why-headline']}>
            This Isn&apos;t Just Another Fourth of July
          </h2>

          <div className={styles['ind-why-grid']}>
            <article className={styles['ind-why-card']}>
              <span className={styles['ind-why-number']} aria-hidden="true">
                250
              </span>
              <h3 className={styles['ind-why-card-title']}>A Once-in-Generations Moment</h3>
              <p className={styles['ind-why-card-text']}>
                The last time America celebrated a milestone like this was the Bicentennial in 1976.
                The next won&apos;t come until 2076. This is your generation&apos;s moment.
              </p>
            </article>

            <article className={styles['ind-why-card']}>
              <span className={styles['ind-why-number']} aria-hidden="true">
                1790
              </span>
              <h3 className={styles['ind-why-card-title']}>Where Tennessee Began</h3>
              <p className={styles['ind-why-card-text']}>
                Rocky Mount was the first capitol of the Southwest Territory. William Blount
                governed from this ground. The state that followed started here.
              </p>
            </article>

            <article className={styles['ind-why-card']}>
              <span className={styles['ind-why-number']} aria-hidden="true">
                You
              </span>
              <h3 className={styles['ind-why-card-title']}>Your Name in History</h3>
              <p className={styles['ind-why-card-text']}>
                The First 250 Registry participants will have their names read aloud during the
                ceremony—a permanent part of this commemoration.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          FAME BRIDGE - Historical Figures
          ============================================ */}
      <section className={styles['ind-famous']} aria-labelledby="famous-heading">
        <div className={styles['ind-famous-inner']}>
          <p className={styles['ind-famous-eyebrow']}>Fame Bridge</p>
          <h2 id="famous-heading" className={styles['ind-famous-headline']}>
            They Stood Here
          </h2>

          <p className={styles['ind-famous-subtext']}>
            The men who shaped Tennessee walked this ground. Governor Blount governed from here.
            Colonel Sevier rallied troops here. On July 4, you&apos;ll stand where they stood.
          </p>

          <div className={styles['ind-famous-grid']}>
            <article className={styles['ind-famous-card']}>
              <h3 className={styles['ind-famous-card-name']}>William Blount</h3>
              <p className={styles['ind-famous-card-title']}>Territorial Governor</p>
              <p className={styles['ind-famous-card-text']}>
                Appointed by George Washington himself, Blount established the government of the
                Southwest Territory right here at Rocky Mount in 1790. From this ground, Tennessee
                was born.
              </p>
              <p className={styles['ind-famous-card-hook']}>
                You&apos;ll stand where government began.
              </p>
            </article>

            <article className={styles['ind-famous-card']}>
              <h3 className={styles['ind-famous-card-name']}>Barsheba Cobb</h3>
              <p className={styles['ind-famous-card-title']}>Frontier Matriarch</p>
              <p className={styles['ind-famous-card-text']}>
                Barsheba Cobb fed the territorial government. Governor Blount, officials, surveyors,
                and forty-two Cherokee chiefs all ate meals she prepared. Without her labor, there
                would have been no negotiations, no treaties, no Tennessee.
              </p>
              <p className={styles['ind-famous-card-hook']}>
                You&apos;ll stand where hospitality made history.
              </p>
            </article>

            <article className={styles['ind-famous-card']}>
              <h3 className={styles['ind-famous-card-name']}>John Sevier</h3>
              <p className={styles['ind-famous-card-title']}>First Governor of Tennessee</p>
              <p className={styles['ind-famous-card-text']}>
                In September 1780, Sevier mustered troops at Rocky Mount for the Kings Mountain
                campaign. Tennessee&apos;s first governor returned during the territorial capital
                years, conducting militia business with Governor Blount on this ground.
              </p>
              <p className={styles['ind-famous-card-hook']}>
                You&apos;ll stand where Sevier rallied the Overmountain Men.
              </p>
            </article>
          </div>

          <p className={styles['ind-famous-closing']}>
            <span className={styles['ind-famous-closing-emphasis']}>
              You&apos;ll stand where they stood.
            </span>
            On the same ground. On America&apos;s 250th birthday.
          </p>
        </div>
      </section>

      {/* ============================================
          PICTURE THIS - The Moment
          ============================================ */}
      <section className={styles['ind-vision']} aria-labelledby="vision-heading">
        <div className={styles['ind-vision-inner']}>
          <h2 id="vision-heading" className={styles['ind-vision-headline']}>
            The Moment Arrives
          </h2>

          <div className={styles['ind-vision-scene']}>
            <p className={styles['ind-vision-text']}>
              It&apos;s 10:00 AM on July 4, 2026. You&apos;re standing on the grounds of Rocky
              Mount. The morning sun filters through ancient oaks as fife and drum music drifts
              across the meadow.
            </p>
            <p className={styles['ind-vision-text']}>
              A musket volley cracks the air—thirteen times for thirteen colonies. The crowd falls
              silent as names begin to be read. And then you hear yours.
            </p>
            <p className={`${styles['ind-vision-text']} ${styles['ind-vision-text--emphasis']}`}>
              Your name, spoken aloud at Tennessee&apos;s first capitol, on the day America turns
              250.
            </p>
          </div>

          <p className={styles['ind-vision-question']}>
            Don&apos;t watch history. <span className="signature-text">Be part of it.</span>
          </p>
        </div>
      </section>

      {/* ============================================
          SCHEDULE OF EVENTS
          ============================================ */}
      <section className={styles['ind-schedule']} aria-labelledby="schedule-heading">
        <div className={styles['ind-schedule-inner']}>
          <h2 id="schedule-heading" className={styles['ind-schedule-headline']}>
            The Day&apos;s Events
          </h2>

          <div className={styles['ind-schedule-timeline']}>
            <div className={styles['ind-schedule-item']}>
              <time dateTime="2026-07-04T10:00:00" className={styles['ind-schedule-time']}>
                10:00 AM
              </time>
              <div className={styles['ind-schedule-content']}>
                <h3 className={styles['ind-schedule-title']}>Gates Open</h3>
                <p className={styles['ind-schedule-desc']}>
                  Arrive early for the best viewing positions. Colonial vendors, period
                  refreshments, and living history begin.
                </p>
              </div>
            </div>

            <div className={styles['ind-schedule-item']}>
              <time dateTime="2026-07-04T11:00:00" className={styles['ind-schedule-time']}>
                11:00 AM
              </time>
              <div className={styles['ind-schedule-content']}>
                <h3 className={styles['ind-schedule-title']}>Musical Prelude</h3>
                <p className={styles['ind-schedule-desc']}>
                  Fife and drum corps perform Revolutionary-era music as guests gather for the
                  ceremony.
                </p>
              </div>
            </div>

            <div
              className={`${styles['ind-schedule-item']} ${styles['ind-schedule-item--highlight']}`}
            >
              <time dateTime="2026-07-04T12:00:00" className={styles['ind-schedule-time']}>
                12:00 PM
              </time>
              <div className={styles['ind-schedule-content']}>
                <h3 className={styles['ind-schedule-title']}>The First 250 Ceremony</h3>
                <p className={styles['ind-schedule-desc']}>
                  The main event. 250 names read aloud. Thirteen-gun salute. Flag raising. The
                  moment you&apos;ll remember forever.
                </p>
              </div>
            </div>

            <div className={styles['ind-schedule-item']}>
              <time dateTime="2026-07-04T13:00:00" className={styles['ind-schedule-time']}>
                1:00 PM
              </time>
              <div className={styles['ind-schedule-content']}>
                <h3 className={styles['ind-schedule-title']}>Colonial Feast</h3>
                <p className={styles['ind-schedule-desc']}>
                  Period-inspired lunch available for purchase. Eat what the founders ate—with
                  modern conveniences.
                </p>
              </div>
            </div>

            <div className={styles['ind-schedule-item']}>
              <time dateTime="2026-07-04T14:00:00" className={styles['ind-schedule-time']}>
                2:00 PM
              </time>
              <div className={styles['ind-schedule-content']}>
                <h3 className={styles['ind-schedule-title']}>Living History</h3>
                <p className={styles['ind-schedule-desc']}>
                  Militia demonstrations, blacksmith forge, hearth cooking, and children&apos;s
                  colonial games throughout the afternoon.
                </p>
              </div>
            </div>

            <div className={styles['ind-schedule-item']}>
              <time dateTime="2026-07-04T16:00:00" className={styles['ind-schedule-time']}>
                4:00 PM
              </time>
              <div className={styles['ind-schedule-content']}>
                <h3 className={styles['ind-schedule-title']}>Closing</h3>
                <p className={styles['ind-schedule-desc']}>
                  Final musket salute. Gates close. Carry this day with you forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT VISITORS EXPERIENCE - Testimonials
          ============================================ */}
      <section className={styles['ind-testimonials']} aria-labelledby="testimonials-heading">
        <div className={styles['ind-testimonials-inner']}>
          <h2 id="testimonials-heading" className={styles['ind-testimonials-headline']}>
            What Visitors Experience
          </h2>

          <div className={styles['ind-testimonials-grid']}>
            <article className={styles['ind-testimonial-card']}>
              <blockquote className={styles['ind-testimonial-quote']}>
                <p className={styles['ind-testimonial-text']}>
                  &ldquo;Really enjoyable for adults and kids to see how people lived many, many
                  years ago&rdquo;
                </p>
                <footer className={styles['ind-testimonial-source']}>
                  <cite>TripAdvisor</cite>
                </footer>
              </blockquote>
            </article>

            <article className={styles['ind-testimonial-card']}>
              <blockquote className={styles['ind-testimonial-quote']}>
                <p className={styles['ind-testimonial-text']}>
                  &ldquo;Residents act and talk as if it were the 1700&apos;s—if you ask about
                  computers, cars, etc., they don&apos;t know anything about them.&rdquo;
                </p>
                <footer className={styles['ind-testimonial-source']}>
                  <cite>TripAdvisor</cite>
                </footer>
              </blockquote>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT TO BRING
          ============================================ */}
      <section className={styles['ind-bring']} aria-labelledby="bring-heading">
        <div className={styles['ind-bring-inner']}>
          <h2 id="bring-heading" className={styles['ind-bring-headline']}>
            Plan Your Visit
          </h2>

          <div className={styles['ind-bring-grid']}>
            <div className={styles['ind-bring-item']}>
              <h3 className={styles['ind-bring-title']}>Bring</h3>
              <ul className={styles['ind-bring-list']}>
                <li>Lawn chairs or blankets</li>
                <li>Sunscreen and hats (July in Tennessee!)</li>
                <li>Camera for the ceremony</li>
                <li>Cash for vendors</li>
              </ul>
            </div>

            <div className={styles['ind-bring-item']}>
              <h3 className={styles['ind-bring-title']}>Know</h3>
              <ul className={styles['ind-bring-list']}>
                <li>Parking is free on-site</li>
                <li>Period refreshments available</li>
                <li>Restrooms provided</li>
                <li>Rain or shine event</li>
              </ul>
            </div>

            <div className={styles['ind-bring-item']}>
              <h3 className={styles['ind-bring-title']}>Children</h3>
              <ul className={styles['ind-bring-list']}>
                <li>Under 5 attend free</li>
                <li>Colonial games and activities</li>
                <li>Strollers welcome on paths</li>
                <li>Nursing areas available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FIRST 250 CALLOUT
          ============================================ */}
      <section className={styles['ind-first250']} aria-labelledby="first250-heading">
        <div className={styles['ind-first250-inner']}>
          <h2 id="first250-heading" className={styles['ind-first250-headline']}>
            Join the First 250 Registry
          </h2>
          <p className={styles['ind-first250-text']}>
            Don&apos;t just attend—be part of history. Enroll in the First 250 Registry and have
            your name read aloud during the ceremony. Limited to 250 participants.
          </p>

          <div className={styles['ind-first250-gauge']}>
            <VintageGauge
              current={CURRENT_ENROLLED}
              total={TOTAL_SPOTS}
              label="Registry Capacity"
              showRemaining={true}
              size="medium"
              theme="light"
            />
          </div>

          <Link href="/first-250" className={styles['ind-first250-cta']}>
            Learn More & Enroll
          </Link>
        </div>
      </section>

      {/* ============================================
          FAQ
          ============================================ */}
      <section className={styles['ind-faq']} aria-labelledby="faq-heading">
        <div className={styles['ind-faq-inner']}>
          <h2 id="faq-heading" className={styles['ind-faq-headline']}>
            Questions?
          </h2>

          <div
            className={styles['ind-faq-grid']}
            role="region"
            aria-label="Frequently asked questions"
          >
            <details className={styles['ind-faq-item']}>
              <summary id="faq-q1" className={styles['ind-faq-question']}>
                Do I need a ticket if I&apos;m in the First 250?
              </summary>
              <p className={styles['ind-faq-answer']} aria-labelledby="faq-q1">
                First 250 Registry members receive complimentary admission and priority seating for
                the ceremony. General admission tickets are for guests not enrolled in the registry.
              </p>
            </details>

            <details className={styles['ind-faq-item']}>
              <summary id="faq-q2" className={styles['ind-faq-question']}>
                What if it rains?
              </summary>
              <p className={styles['ind-faq-answer']} aria-labelledby="faq-q2">
                This is a rain-or-shine event. The ceremony will proceed under covered areas if
                needed. We recommend bringing ponchos or umbrellas just in case.
              </p>
            </details>

            <details className={styles['ind-faq-item']}>
              <summary id="faq-q3" className={styles['ind-faq-question']}>
                Is food available?
              </summary>
              <p className={styles['ind-faq-answer']} aria-labelledby="faq-q3">
                Yes! Colonial-inspired refreshments and modern conveniences will be available for
                purchase. You&apos;re also welcome to bring a picnic.
              </p>
            </details>

            <details className={styles['ind-faq-item']}>
              <summary id="faq-q4" className={styles['ind-faq-question']}>
                Can I bring my dog?
              </summary>
              <p className={styles['ind-faq-answer']} aria-labelledby="faq-q4">
                Due to loud musket fire, large crowds, and heritage animals on site, we ask that
                pets stay home for this event. Service animals are always welcome.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className={styles['ind-closing']} aria-labelledby="closing-heading">
        <div className={styles['ind-closing-inner']}>
          <p className={styles['ind-closing-question']}>
            July 4, 2026. Tennessee&apos;s first capitol.
          </p>
          <h2 id="closing-heading" className={styles['ind-closing-headline']}>
            Will You Be There?
          </h2>
          <p className={styles['ind-closing-subtext']}>
            The First 250 will have their names read aloud during the ceremony—a permanent record of
            those who chose to be part of America&apos;s 250th celebration on the ground where
            Tennessee began.
          </p>

          <div className={styles['ind-closing-cta-group']}>
            <BookingButton
              itemId="562810"
              fallbackUrl="https://fareharbor.com/rockymountmuseum/items/562810/"
              className={styles['ind-closing-cta']}
              eventData={{
                id: 'colonial-independence-day',
                title: 'Colonial Independence Day',
                fareHarborId: '562810',
                pricing: {
                  adult: 1200,
                  senior: 1000,
                  child: 800,
                  underFive: 0,
                  members: 0,
                },
              }}
            >
              Claim Your Place in History
            </BookingButton>
            <p className={styles['ind-closing-note']}>
              Limited capacity. Adult $12 · Senior $10 · Child $8 · Under 5 Free · Members Free
            </p>
          </div>

          <p className={styles['ind-closing-contact']}>
            Questions? Call{' '}
            <a href="tel:+14235387396" className={styles['ind-closing-link']}>
              (423) 538-7396
            </a>
          </p>

          <Link href="/events" className={styles['ind-closing-back']}>
            <span aria-hidden="true">←</span> Back to All Events
          </Link>
        </div>
      </section>
    </>
  )
}
