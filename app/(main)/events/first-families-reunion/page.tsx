import type { Metadata } from 'next'
import Link from 'next/link'
import { BookingButton } from '@/components/booking'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'First Families Reunion | America 250 Signature Event | Tennessee Starts Here',
  description:
    'October 11-13, 2026. Descendants of Revolutionary patriots and early frontier families gather at Rocky Mount. America 250 signature event hosted by the Cobb, Massingale & Defriece families.',
  openGraph: {
    title: 'First Families Reunion | America 250 Signature Event',
    description:
      'October 11-13, 2026. Revolutionary patriots and frontier families gather where Tennessee began. SAR/DAR members welcome.',
    url: 'https://tennesseestartshere.com/events/first-families-reunion',
  },
}

// Known founding family surnames for "Am I a First Family?" section
const FOUNDING_FAMILIES = [
  'Cobb',
  'Sevier',
  'Shelby',
  'Robertson',
  'Blount',
  'Jackson',
  'White',
  'Ramsey',
  'Henderson',
  'Bean',
  'Carter',
  'Taylor',
  'Campbell',
  'Preston',
  'McDowell',
  'Tipton',
  'Love',
  'Christian',
  'Anderson',
  'Dunham',
  'Lane',
] as const

export default function FirstFamiliesReunionPage() {
  return (
    <>
      {/* ============================================
          HERO - Emotional Homecoming
          ============================================ */}
      <section className={styles['reunion-hero']} aria-labelledby="reunion-heading">
        <div className={styles['reunion-hero-content']}>
          {/* Eyebrow */}
          <p className={styles['reunion-eyebrow']}>
            <time dateTime="2026-10-11">October 11–13, 2026</time> · America 250 Signature Event
          </p>

          {/* Main headline */}
          <h1 id="reunion-heading" className={styles['reunion-headline']}>
            <span className={styles['reunion-headline-small']}>Your Family Built Tennessee.</span>
            <span className={styles['reunion-headline-large']}>Now Come Home.</span>
          </h1>

          {/* Emotional hook */}
          <p className={styles['reunion-hook']}>
            As America celebrates its 250th anniversary, Rocky Mount invites all descendants of
            Revolutionary patriots and early frontier families to gather at the place where southern
            expansion formally began under federal authority.
          </p>

          {/* Host families note */}
          <p className={styles['reunion-hook']}>
            <strong>Hosted by the original Cobb, Massingale & Defriece Families.</strong> As the
            families who literally opened their home to create Tennessee, they now invite all First
            Families to gather at the place where it all began.
          </p>

          {/* Scarcity signal */}
          <p className={styles['reunion-scarcity']}>
            <strong>First-time event.</strong> Friday Heritage Evening limited to registered
            descendants.
          </p>

          {/* CTA */}
          <div className={styles['reunion-hero-cta-group']}>
            <BookingButton
              itemId="562813"
              fallbackUrl="https://fareharbor.com/rockymountmuseum/items/562813/"
              className={styles['reunion-hero-cta']}
              eventData={{
                id: 'first-families-reunion',
                title: 'First Families of Tennessee Reunion',
                fareHarborId: '562813',
                pricing: {
                  adult: 2500,
                  senior: 2000,
                  child: 1500,
                  underFive: 0,
                  members: 0,
                },
              }}
            >
              Claim Your Heritage
            </BookingButton>
            <a href="#am-i-first-family" className={styles['reunion-hero-cta-secondary']}>
              Am I a First Family?
            </a>
          </div>

          {/* Signature badge */}
          <p className={styles['reunion-badge']}>
            <span className={styles['reunion-badge-icon']} aria-hidden="true">
              ★
            </span>
            Signature Event
          </p>
        </div>
      </section>

      {/* ============================================
          PICTURE THIS - The Moment
          ============================================ */}
      <section className={styles['reunion-vision']} aria-labelledby="vision-heading">
        <div className={styles['reunion-vision-inner']}>
          <h2 id="vision-heading" className={styles['reunion-vision-headline']}>
            The Homecoming
          </h2>

          <div className={styles['reunion-vision-scene']}>
            <p className={styles['reunion-vision-text']}>
              You&apos;re standing on the same ground where your ancestors stood 236 years ago.
              Around you are cousins you&apos;ve never met—descendants of the same brave men and
              women who carved Tennessee from the wilderness.
            </p>
            <p className={styles['reunion-vision-text']}>
              Someone shares a story passed down through seven generations. Another pulls out a
              tattered family Bible. The genealogist finds a connection you never knew existed.
            </p>
            <p
              className={`${styles['reunion-vision-text']} ${styles['reunion-vision-text--emphasis']}`}
            >
              This is more than a reunion. This is a homecoming—236 years in the making.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          AM I A FIRST FAMILY - Surname Check
          ============================================ */}
      <section
        id="am-i-first-family"
        className={styles['reunion-surnames']}
        aria-labelledby="surnames-heading"
      >
        <div className={styles['reunion-surnames-inner']}>
          <p className={styles['reunion-surnames-eyebrow']}>Who Is Invited?</p>
          <h2 id="surnames-heading" className={styles['reunion-surnames-headline']}>
            Am I a First Family?
          </h2>
          <p className={styles['reunion-surnames-intro']}>
            <strong>You&apos;re invited if your ancestors:</strong>
          </p>
          <ul className={styles['reunion-eligibility-list']}>
            <li>
              <strong>Served in the American Revolution</strong> (SAR/DAR members welcome!)
            </li>
            <li>
              <strong>Lived in the Southwest Territory</strong> before Tennessee statehood (June 1,
              1796)
            </li>
            <li>
              <strong>Settled the American frontier</strong> from the Appalachians westward before
              1800
            </li>
            <li>
              <strong>Served in territorial government, militia, or early state positions</strong>
            </li>
            <li>
              <strong>Established homesteads, businesses, or churches</strong> in early settlements
            </li>
            <li>
              <strong>Descend from any of America&apos;s founding families</strong> who pushed
              westward
            </li>
          </ul>
          <p className={styles['reunion-surnames-intro']}>
            <em>
              If you&apos;re eligible for SAR, DAR, or similar patriotic societies, you&apos;re part
              of our First Families story.
            </em>
          </p>
          <p className={styles['reunion-surnames-intro']}>
            Common founding family surnames include:
          </p>

          <div className={styles['reunion-surnames-grid']}>
            {FOUNDING_FAMILIES.map((name) => (
              <span key={name} className={styles['reunion-surname']}>
                {name}
              </span>
            ))}
            <span className={`${styles['reunion-surname']} ${styles['reunion-surname--more']}`}>
              + many more
            </span>
          </div>

          <p className={styles['reunion-surnames-note']}>
            Not sure if you qualify?{' '}
            <a href="tel:+14235387396" className={styles['reunion-surnames-link']}>
              Call (423) 538-7396
            </a>{' '}
            and we&apos;ll help you research your connection.
          </p>
        </div>
      </section>

      {/* ============================================
          WEEKEND SCHEDULE
          ============================================ */}
      <section className={styles['reunion-schedule']} aria-labelledby="schedule-heading">
        <div className={styles['reunion-schedule-inner']}>
          <h2 id="schedule-heading" className={styles['reunion-schedule-headline']}>
            Three Days. Generations of Stories.
          </h2>

          <div className={styles['reunion-schedule-grid']}>
            {/* Friday */}
            <article className={styles['reunion-day']}>
              <header className={styles['reunion-day-header']}>
                <time dateTime="2026-10-11" className={styles['reunion-day-date']}>
                  <span className={styles['reunion-day-weekday']}>Friday</span>
                  <span className={styles['reunion-day-number']}>Oct 11</span>
                </time>
                <span className={styles['reunion-day-badge']}>By Invitation</span>
              </header>
              <div className={styles['reunion-day-content']}>
                <h3 className={styles['reunion-day-title']}>Host Family Evening</h3>
                <p className={styles['reunion-day-time']}>6:00 PM – 9:00 PM</p>
                <p className={styles['reunion-day-description']}>
                  Private reception for Cobb, Massingale, and Defriece family descendants. Special
                  recognition ceremony and intimate gathering at Rocky Mount.
                </p>
                <p className={styles['reunion-day-note']}>
                  <strong>By invitation only</strong> (Cobb/Massingale/Defriece descendants)
                </p>
              </div>
            </article>

            {/* Saturday */}
            <article className={`${styles['reunion-day']} ${styles['reunion-day--featured']}`}>
              <header className={styles['reunion-day-header']}>
                <time dateTime="2026-10-12" className={styles['reunion-day-date']}>
                  <span className={styles['reunion-day-weekday']}>Saturday</span>
                  <span className={styles['reunion-day-number']}>Oct 12</span>
                </time>
                <span
                  className={`${styles['reunion-day-badge']} ${styles['reunion-day-badge--public']}`}
                >
                  Registered Families
                </span>
              </header>
              <div className={styles['reunion-day-content']}>
                <h3 className={styles['reunion-day-title']}>Main Gathering</h3>
                <p className={styles['reunion-day-time']}>10:00 AM – 5:00 PM</p>
                <ul className={styles['reunion-day-list']}>
                  <li>Living history demonstrations with period interpreters</li>
                  <li>Genealogy workshops with SAR/DAR representatives</li>
                  <li>Historical presentations on Revolutionary ideals & westward expansion</li>
                  <li>Family connection sessions with fellow descendants</li>
                  <li>Period music and traditional crafts</li>
                  <li>Family photo sessions</li>
                  <li>Catered frontier-style meal</li>
                </ul>
                <p className={styles['reunion-day-note']}>Open to all registered First Families</p>
              </div>
            </article>

            {/* Sunday */}
            <article className={styles['reunion-day']}>
              <header className={styles['reunion-day-header']}>
                <time dateTime="2026-10-13" className={styles['reunion-day-date']}>
                  <span className={styles['reunion-day-weekday']}>Sunday</span>
                  <span className={styles['reunion-day-number']}>Oct 13</span>
                </time>
                <span
                  className={`${styles['reunion-day-badge']} ${styles['reunion-day-badge--public']}`}
                >
                  Free & Open
                </span>
              </header>
              <div className={styles['reunion-day-content']}>
                <h3 className={styles['reunion-day-title']}>Frontier Worship Service</h3>
                <p className={styles['reunion-day-time']}>10:00 AM – 12:00 PM</p>
                <p className={styles['reunion-day-description']}>
                  Optional 1791-style worship service in the historic tradition of early Tennessee
                  congregations.
                </p>
                <p className={styles['reunion-day-note']}>
                  <strong>Free admission</strong> · Open to the public
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT TO BRING
          ============================================ */}
      <section className={styles['reunion-bring']} aria-labelledby="bring-heading">
        <div className={styles['reunion-bring-inner']}>
          <h2 id="bring-heading" className={styles['reunion-bring-headline']}>
            What to Bring
          </h2>

          <div className={styles['reunion-bring-grid']}>
            <div className={styles['reunion-bring-item']}>
              <span className={styles['reunion-bring-icon']} aria-hidden="true">
                📜
              </span>
              <h3 className={styles['reunion-bring-title']}>Family Documents</h3>
              <p className={styles['reunion-bring-text']}>
                Family Bibles with birth/death records, letters and correspondence pre-1850, land
                grants and deeds, military records (Revolutionary War, War of 1812), and marriage
                certificates. Our genealogists will help verify connections.
              </p>
            </div>

            <div className={styles['reunion-bring-item']}>
              <span className={styles['reunion-bring-icon']} aria-hidden="true">
                📖
              </span>
              <h3 className={styles['reunion-bring-title']}>Your Stories</h3>
              <p className={styles['reunion-bring-text']}>
                Oral histories are preserved and recorded. What did your grandparents tell you?
              </p>
            </div>

            <div className={styles['reunion-bring-item']}>
              <span className={styles['reunion-bring-icon']} aria-hidden="true">
                👟
              </span>
              <h3 className={styles['reunion-bring-title']}>Walking Shoes</h3>
              <p className={styles['reunion-bring-text']}>
                Explore the same paths your ancestors traveled 236 years ago.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIAL / EMOTIONAL PULL
          ============================================ */}
      <section className={styles['reunion-quote']}>
        <div className={styles['reunion-quote-inner']}>
          <blockquote className={styles['reunion-blockquote']} aria-label="Visitor testimonial">
            <p className={styles['reunion-quote-text']}>
              &ldquo;It was like you got teleported back in time. The way the buildings are stocked
              and furnished is incredibly convincing—Rocky Mount looks like a place where people
              actually live. There is so much history here.&rdquo;
            </p>
            <footer className={styles['reunion-quote-footer']}>
              <cite className={styles['reunion-quote-cite']}>
                — Rocky Mount visitor, TripAdvisor
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ============================================
          FAQ
          ============================================ */}
      <section className={styles['reunion-faq']} aria-labelledby="faq-heading">
        <div className={styles['reunion-faq-inner']}>
          <h2 id="faq-heading" className={styles['reunion-faq-headline']}>
            Questions?
          </h2>

          <div
            className={styles['reunion-faq-grid']}
            role="region"
            aria-label="Frequently asked questions"
          >
            <details className={styles['reunion-faq-item']}>
              <summary id="reunion-faq-q1" className={styles['reunion-faq-question']}>
                Do I need to prove my ancestry to attend?
              </summary>
              <p className={styles['reunion-faq-answer']} aria-labelledby="reunion-faq-q1">
                Friday&apos;s Heritage Evening requires descendant registration. Saturday and Sunday
                are open to everyone—even if you&apos;re just curious about Tennessee history. Our
                genealogists can help verify connections at the event.
              </p>
            </details>

            <details className={styles['reunion-faq-item']}>
              <summary id="reunion-faq-q2" className={styles['reunion-faq-question']}>
                What if I&apos;m not sure about my family history?
              </summary>
              <p className={styles['reunion-faq-answer']} aria-labelledby="reunion-faq-q2">
                That&apos;s exactly why we have genealogy experts on site. Bring whatever documents
                you have—birth certificates, old photos, family Bibles—and they&apos;ll help you
                trace your roots.
              </p>
            </details>

            <details className={styles['reunion-faq-item']}>
              <summary id="reunion-faq-q3" className={styles['reunion-faq-question']}>
                Is this event suitable for children?
              </summary>
              <p className={styles['reunion-faq-answer']} aria-labelledby="reunion-faq-q3">
                Absolutely. Saturday and Sunday include activities for all ages. Children under 5
                attend free. It&apos;s a meaningful way to teach the next generation about their
                heritage.
              </p>
            </details>

            <details className={styles['reunion-faq-item']}>
              <summary id="reunion-faq-q4" className={styles['reunion-faq-question']}>
                Where should I stay?
              </summary>
              <p className={styles['reunion-faq-answer']} aria-labelledby="reunion-faq-q4">
                Hotels in Johnson City and Kingsport are 15-20 minutes away. We&apos;ll provide a
                list of recommended accommodations when you register.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className={styles['reunion-closing']} aria-labelledby="closing-heading">
        <div className={styles['reunion-closing-inner']}>
          <p className={styles['reunion-closing-question']}>236 years of family history.</p>
          <h2 id="closing-heading" className={styles['reunion-closing-headline']}>
            Isn&apos;t It Time You Came Home?
          </h2>
          <p className={styles['reunion-closing-subtext']}>
            Three days to reconnect with your roots, meet cousins you never knew existed, and walk
            the same paths your ancestors traveled—all while making new memories with people who
            share your blood and your history.
          </p>

          <div className={styles['reunion-closing-cta-group']}>
            <BookingButton
              itemId="562813"
              fallbackUrl="https://fareharbor.com/rockymountmuseum/items/562813/"
              className={styles['reunion-closing-cta']}
              eventData={{
                id: 'first-families-reunion',
                title: 'First Families of Tennessee Reunion',
                fareHarborId: '562813',
                pricing: {
                  adult: 2500,
                  senior: 2000,
                  child: 1500,
                  underFive: 0,
                  members: 0,
                },
              }}
            >
              Claim Your Heritage
            </BookingButton>
            <p className={styles['reunion-closing-note']}>
              Adult $25 · Senior $20 · Child $15 · Under 5 Free
            </p>
          </div>

          <p className={styles['reunion-closing-contact']}>
            Questions? Call{' '}
            <a href="tel:+14235387396" className={styles['reunion-closing-link']}>
              (423) 538-7396
            </a>
          </p>

          <Link href="/events" className={styles['reunion-closing-back']}>
            <span aria-hidden="true">←</span> Back to All Events
          </Link>
        </div>
      </section>
    </>
  )
}
