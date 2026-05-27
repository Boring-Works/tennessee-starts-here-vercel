import type { Metadata } from 'next'
import Link from 'next/link'
import EmailSignup from '@/components/EmailSignup'
import { Claim } from '@/components/evidence'
import siteInfo from '@/data/siteInfo.json'
import enrollmentData from '@/data/enrollment.json'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'The First 250 Registry',
  description:
    "Claim your place among 250 signatories whose names will be read aloud on July 4, 2026 at Rocky Mount—where Tennessee's government began.",
  openGraph: {
    title: 'The First 250 Registry | Tennessee Starts Here',
    description:
      "Claim your place among 250 signatories whose names will be read aloud on July 4, 2026 at Rocky Mount—where Tennessee's government began.",
    url: 'https://tennesseestartshere.com/first-250',
  },
}

// Enrollment data from shared source
const CURRENT_ENROLLED = enrollmentData.currentEnrolled
const TOTAL_SPOTS = enrollmentData.totalSpots

// Tier names with emotional framing (with fallbacks for safety)
const tierFraming: Record<number, { name: string; tagline: string }> = {
  0: { name: 'Participant', tagline: 'Be counted' },
  1: { name: 'Patron', tagline: 'Be honored' },
  2: { name: 'Founding Family', tagline: 'Be remembered forever' },
}

const defaultFraming = { name: '', tagline: '' }

export default function First250Page() {
  const { first250 } = siteInfo

  return (
    <>
      {/* ============================================
          HERO - Scarcity + Emotion
          ============================================ */}
      <section className={styles['legacy-hero']} aria-labelledby="legacy-heading">
        <div className={styles['legacy-hero-content']}>
          {/* Scarcity Alert - Moved to Top */}
          <div className={styles['legacy-scarcity-alert']}>
            <span className={styles['legacy-scarcity-number']}>
              {TOTAL_SPOTS - CURRENT_ENROLLED}
            </span>
            <span className={styles['legacy-scarcity-text']}>Spots Remaining</span>
          </div>

          {/* Eyebrow */}
          <p className={styles['legacy-eyebrow']}>
            <time dateTime="2026-07-04">July 4, 2026</time> · America&apos;s 250th Birthday
          </p>

          {/* Main headline */}
          <h1 id="legacy-heading" className={styles['legacy-headline']}>
            <span className={styles['legacy-headline-small']}>Limited to</span>
            <span className={styles['legacy-headline-large']}>250 Signatories</span>
          </h1>

          {/* Emotional hook */}
          <p className={styles['legacy-hook']}>
            Your name, read aloud at Tennessee&apos;s first capital, on the day America turns 250.
          </p>

          {/* Early CTA */}
          <a href="#choose-your-legacy" className={styles['legacy-hero-cta']}>
            Reserve Your Spot
          </a>

          {/* Deadline reminder */}
          <p className={styles['legacy-deadline']}>
            Enrollment closes <time dateTime="2026-06-01">June 1, 2026</time>
          </p>
        </div>
      </section>

      {/* ============================================
          PICTURE THIS - Ceremony Visualization
          ============================================ */}
      <section className={styles['legacy-vision']} aria-labelledby="vision-heading">
        <div className={styles['legacy-vision-inner']}>
          <h2 id="vision-heading" className={styles['legacy-vision-headline']}>
            Picture This
          </h2>

          <div className={styles['legacy-vision-scene']}>
            <p className={styles['legacy-vision-text']}>
              It&apos;s <strong>July 4, 2026</strong>. You&apos;re standing on the grounds of Rocky
              Mount — the same soil where{' '}
              <Claim doc="blount-arrival-1790" passage="glass-windows">
                William Blount established Tennessee&apos;s first government
              </Claim>{' '}
              236 years ago.
            </p>
            <p className={styles['legacy-vision-text']}>
              Around you, 250 Tennesseans have gathered. The American flag flies overhead. A voice
              begins to read names — and then you hear <em>yours</em>.
            </p>
            <p
              className={`${styles['legacy-vision-text']} ${styles['legacy-vision-text--emphasis']}`}
            >
              Your name, spoken aloud at a historic site, on the most significant Independence Day
              in 50 years.
            </p>
          </div>

          <p className={styles['legacy-vision-question']}>
            Will <span className="signature-text">your name</span> be among the 250?
          </p>
        </div>
      </section>

      {/* ============================================
          WHY THIS MATTERS - Historic Significance
          ============================================ */}
      <section className={styles['legacy-why']} aria-labelledby="why-heading">
        <div className={styles['legacy-why-inner']}>
          <p className={styles['legacy-why-eyebrow']}>Why This Matters</p>
          <h2 id="why-heading" className={styles['legacy-why-headline']}>
            This Isn&apos;t Just Any Event
          </h2>

          <div className={styles['legacy-why-grid']}>
            <article className={styles['legacy-why-card']}>
              <span className={styles['legacy-why-number']} aria-hidden="true">
                1790
              </span>
              <h3 className={styles['legacy-why-card-title']}>The First Capital</h3>
              <p className={styles['legacy-why-card-text']}>
                <Claim doc="washington-to-knox-1790-08" passage="residence-question">
                  Rocky Mount was the first capital of the Southwest Territory
                </Claim>
                . This is where Tennessee&apos;s government began.
              </p>
            </article>

            <article className={styles['legacy-why-card']}>
              <span className={styles['legacy-why-number']} aria-hidden="true">
                250
              </span>
              <h3 className={styles['legacy-why-card-title']}>A Once-in-Generations Moment</h3>
              <p className={styles['legacy-why-card-text']}>
                <Claim doc="washington-proclamation-1791" passage="binding-law">
                  America&apos;s 250th birthday
                </Claim>{' '}
                happens once. Being part of this commemoration means joining a legacy.
              </p>
            </article>

            <article className={styles['legacy-why-card']}>
              <span className={styles['legacy-why-number']} aria-hidden="true">
                You
              </span>
              <h3 className={styles['legacy-why-card-title']}>Your Name in History</h3>
              <p className={styles['legacy-why-card-text']}>
                The First 250 participants will be recorded as founding members of this
                commemoration — forever.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          CHOOSE YOUR LEGACY - Tiers
          ============================================ */}
      <section
        id="choose-your-legacy"
        className={styles['legacy-tiers']}
        aria-labelledby="tiers-heading"
      >
        <div className={styles['legacy-tiers-inner']}>
          <header className={styles['legacy-tiers-header']}>
            <h2 id="tiers-heading" className={styles['legacy-tiers-headline']}>
              Choose Your Legacy
            </h2>
            <p className={styles['legacy-tiers-subtitle']}>
              Every signatory&apos;s name will be read aloud. Choose how you&apos;ll be remembered.
            </p>
          </header>

          <div className={styles['legacy-tiers-grid']}>
            {first250.tiers.map((tier, index) => {
              const framing = tierFraming[index] ?? {
                name: tier.name,
                tagline: defaultFraming.tagline,
              }
              const isFeatured = index === 1

              return (
                <article
                  key={tier.name}
                  className={`${styles['legacy-tier']} ${isFeatured ? styles['legacy-tier--featured'] : ''}`}
                >
                  {isFeatured && <p className={styles['legacy-tier-badge']}>Most Popular</p>}

                  <header className={styles['legacy-tier-header']}>
                    <p className={styles['legacy-tier-tagline']}>{framing.tagline}</p>
                    <h3 className={styles['legacy-tier-name']}>{framing.name}</h3>
                    <div className={styles['legacy-tier-price-wrapper']}>
                      <p className={styles['legacy-tier-price']}>
                        {tier.price === 0 ? (
                          <span className={styles['legacy-tier-price-free']}>Free</span>
                        ) : (
                          <>
                            <span className={styles['legacy-tier-price-currency']}>$</span>
                            <span className={styles['legacy-tier-price-amount']}>{tier.price}</span>
                          </>
                        )}
                      </p>
                      {tier.price > 0 && (
                        <p className={styles['legacy-tier-value-prop']}>
                          {tier.price === 25 ? 'Make it memorable' : 'Create a lasting legacy'}
                        </p>
                      )}
                    </div>
                  </header>

                  <ul className={styles['legacy-tier-benefits']}>
                    {index === 0 && (
                      <>
                        <li
                          className={`${styles['legacy-tier-benefit']} ${styles['legacy-tier-benefit--core']}`}
                        >
                          <svg
                            className={styles['legacy-tier-benefit-icon']}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Name read aloud July 4, 2026
                        </li>
                        <li className={styles['legacy-tier-benefit']}>
                          <svg
                            className={styles['legacy-tier-benefit-icon']}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Exclusive program updates
                        </li>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <li
                          className={`${styles['legacy-tier-benefit']} ${styles['legacy-tier-benefit--inherited']}`}
                        >
                          Everything in Participant, plus:
                        </li>
                        <li
                          className={`${styles['legacy-tier-benefit']} ${styles['legacy-tier-benefit--core']}`}
                        >
                          <svg
                            className={styles['legacy-tier-benefit-icon']}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Commemorative certificate
                        </li>
                        <li className={styles['legacy-tier-benefit']}>
                          <svg
                            className={styles['legacy-tier-benefit-icon']}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Priority seating at ceremony
                        </li>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <li
                          className={`${styles['legacy-tier-benefit']} ${styles['legacy-tier-benefit--inherited']}`}
                        >
                          Everything in Patron, plus:
                        </li>
                        <li
                          className={`${styles['legacy-tier-benefit']} ${styles['legacy-tier-benefit--core']}`}
                        >
                          <svg
                            className={styles['legacy-tier-benefit-icon']}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Founding Family dinner invitation
                        </li>
                        <li className={styles['legacy-tier-benefit']}>
                          <svg
                            className={styles['legacy-tier-benefit-icon']}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Permanent recognition at Rocky Mount
                        </li>
                      </>
                    )}
                  </ul>

                  <div className={styles['legacy-tier-cta-wrapper']}>
                    {/* In production, these would link to enrollment forms */}
                    <button
                      type="button"
                      className={styles['legacy-tier-cta']}
                      disabled
                      aria-label={`Enroll as ${framing.name} - Coming March 4, 2026`}
                    >
                      Enrollment Opens March 4
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          KEY DATES - Timeline
          ============================================ */}
      <section className={styles['legacy-dates']} aria-labelledby="dates-heading">
        <div className={styles['legacy-dates-inner']}>
          <h2 id="dates-heading" className={styles['legacy-dates-headline']}>
            Key Dates
          </h2>

          <ol className={styles['legacy-dates-timeline']}>
            <li className={styles['legacy-dates-item']}>
              <time dateTime="2026-03-04" className={styles['legacy-dates-date']}>
                <span className={styles['legacy-dates-month']}>Mar</span>
                <span className={styles['legacy-dates-day']}>4</span>
              </time>
              <div className={styles['legacy-dates-content']}>
                <p className={styles['legacy-dates-label']}>Enrollment Opens</p>
                <p className={styles['legacy-dates-desc']}>
                  Be among the first to reserve your spot
                </p>
              </div>
            </li>

            <li className={styles['legacy-dates-connector']} aria-hidden="true" />

            <li
              className={`${styles['legacy-dates-item']} ${styles['legacy-dates-item--warning']}`}
            >
              <time dateTime="2026-06-01" className={styles['legacy-dates-date']}>
                <span className={styles['legacy-dates-month']}>Jun</span>
                <span className={styles['legacy-dates-day']}>1</span>
              </time>
              <div className={styles['legacy-dates-content']}>
                <p className={styles['legacy-dates-label']}>Enrollment Closes</p>
                <p className={styles['legacy-dates-desc']}>Final day to join the First 250</p>
              </div>
            </li>

            <li className={styles['legacy-dates-connector']} aria-hidden="true" />

            <li
              className={`${styles['legacy-dates-item']} ${styles['legacy-dates-item--highlight']}`}
            >
              <time dateTime="2026-07-04" className={styles['legacy-dates-date']}>
                <span className={styles['legacy-dates-month']}>Jul</span>
                <span className={styles['legacy-dates-day']}>4</span>
              </time>
              <div className={styles['legacy-dates-content']}>
                <p className={styles['legacy-dates-label']}>The Ceremony</p>
                <p className={styles['legacy-dates-desc']}>Your name read aloud at Rocky Mount</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ============================================
          EMAIL SIGNUP - Stay Informed
          ============================================ */}
      <section className={styles['legacy-notify']} aria-labelledby="notify-heading">
        <div className={styles['legacy-notify-inner']}>
          <h2 id="notify-heading" className={styles['legacy-notify-headline']}>
            Get Notified When Enrollment Opens
          </h2>
          <p className={styles['legacy-notify-desc']}>
            Don&apos;t miss your chance. We&apos;ll email you the moment enrollment begins.
          </p>

          <div className={styles['legacy-notify-form']}>
            <EmailSignup />
          </div>

          <p className={styles['legacy-notify-privacy']}>
            One email when enrollment opens. No spam.
          </p>
        </div>
      </section>

      {/* ============================================
          SOCIAL PROOF - Trust Building
          ============================================ */}
      <section className={styles['legacy-social-proof']} aria-labelledby="proof-heading">
        <div className={styles['legacy-social-proof-inner']}>
          <h2 id="proof-heading" className={styles['legacy-social-proof-headline']}>
            Join Fellow Tennesseans in Honoring Our Founding
          </h2>

          <div className={styles['legacy-social-proof-grid']}>
            <div className={styles['legacy-social-proof-stat']}>
              <span className={styles['legacy-social-proof-number']}>{CURRENT_ENROLLED}</span>
              <span className={styles['legacy-social-proof-label']}>Already Enrolled</span>
            </div>
            <div className={styles['legacy-social-proof-stat']}>
              <span className={styles['legacy-social-proof-number']}>
                {Math.round(((TOTAL_SPOTS - CURRENT_ENROLLED) / TOTAL_SPOTS) * 100)}%
              </span>
              <span className={styles['legacy-social-proof-label']}>Spots Available</span>
            </div>
            <div className={styles['legacy-social-proof-stat']}>
              <span className={styles['legacy-social-proof-number']}>1</span>
              <span className={styles['legacy-social-proof-label']}>Chance in a Lifetime</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA - Closing
          ============================================ */}
      <section className={styles['legacy-closing']} aria-labelledby="closing-heading">
        <div className={styles['legacy-closing-inner']}>
          <p className={styles['legacy-closing-question']}>
            250 years of America. 250 signatories.
          </p>
          <h2 id="closing-heading" className={styles['legacy-closing-headline']}>
            Will yours be one of them?
          </h2>

          {/* Scarcity reminder */}
          <div className={styles['legacy-closing-scarcity']}>
            <p className={styles['legacy-closing-scarcity-text']}>
              Only <strong>{TOTAL_SPOTS - CURRENT_ENROLLED} spots</strong> remain in the First 250
              Registry
            </p>
          </div>

          <a href="#choose-your-legacy" className={styles['legacy-closing-cta']}>
            Reserve Your Spot
          </a>

          <Link href="/events#colonial-independence-day" className={styles['legacy-closing-link']}>
            Learn more about Colonial Independence Day
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
