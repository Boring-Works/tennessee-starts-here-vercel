import type React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FoundingBanner } from './FoundingBanner'
import styles from './page.module.css'
import membershipData from '@/data/membership.json'

export const metadata: Metadata = {
  title: 'Membership | Rocky Mount State Historic Site',
  description:
    'Join Rocky Mount and support the preservation of where Tennessee began. Founding Member registration opens March 4, 2026.',
  openGraph: {
    title: 'Membership | Tennessee Starts Here',
    description:
      'Join Rocky Mount and support the preservation of where Tennessee began. Founding Member registration opens March 4, 2026.',
    url: 'https://tennesseestartshere.com/membership',
  },
}

// NeonCRM membership portal URL from JSON data
const NEONCRM_URL = membershipData.urls.join

// Badge type for membership tiers
type BadgeType = 'value' | 'popular'

// Membership tier interface
interface MembershipTier {
  id: string
  name: string
  tagline: string
  price: number
  badge: string | null
  badgeType?: BadgeType
  benefits: string[]
  cta: string
  highlighted: boolean
}

// Badge mapping: tier id -> display badge and type
const BADGE_MAP: Record<string, { badge: string; badgeType: BadgeType }> = {
  'patriot-pass': { badge: 'BEST VALUE', badgeType: 'value' },
  'frontier-family': { badge: 'MOST POPULAR', badgeType: 'popular' },
}

// Transform JSON tiers to page format
const MEMBERSHIP_TIERS: MembershipTier[] = membershipData.tiers.map((tier) => {
  const badgeInfo = BADGE_MAP[tier.id]
  return {
    id: tier.id,
    name: tier.name,
    tagline: tier.tagline,
    price: tier.price,
    badge: badgeInfo?.badge ?? null,
    badgeType: badgeInfo?.badgeType,
    benefits: tier.benefits,
    cta: tier.cta,
    highlighted: tier.featured,
  }
})

// FAQ item interface
interface FAQItemData {
  question: string
  answer: string
}

// Transform JSON FAQs to page format
const FAQ_ITEMS: FAQItemData[] = membershipData.faqs.map((faq) => ({
  question: faq.question,
  answer: faq.answer,
}))

// Section divider variant type
type DividerVariant = 'default' | 'light' | 'dark'

// Section divider component
function SectionDivider({ variant = 'default' }: { variant?: DividerVariant }) {
  return (
    <div
      className={`section-divider section-divider--${variant}`}
      aria-hidden="true"
      role="presentation"
    >
      <span className="section-divider-line" />
      <span className="section-divider-flourish">&#10087;</span>
      <span className="section-divider-ornament">&#10022;</span>
      <span className="section-divider-flourish section-divider-flourish--flip">&#10087;</span>
      <span className="section-divider-line" />
    </div>
  )
}

// FAQ Accordion Item props
interface FAQItemProps {
  question: string
  answer: string
  index: number
}

// FAQ Accordion Item with proper accessibility
function FAQItem({ question, answer, index }: FAQItemProps): React.ReactElement {
  const id = `faq-${index}`
  return (
    <details className={styles['faq-item']}>
      <summary
        className={styles['faq-question']}
        id={`${id}-question`}
        aria-controls={`${id}-answer`}
      >
        {question}
        <span className={styles['faq-icon']} aria-hidden="true">
          +
        </span>
      </summary>
      <div
        className={styles['faq-answer']}
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
      >
        <p>{answer}</p>
      </div>
    </details>
  )
}

export default function MembershipPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="membership-hero-title">
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>2026 Membership</p>
          <h1 id="membership-hero-title" className={styles.headline}>
            Tennessee Starts Here. So Should Your Year.
          </h1>
          <p className={styles.subhead}>One membership. Every festival. Every tour. All year.</p>
        </div>
      </section>

      {/* Founding Member Banner - Client Component for hydration safety */}
      <FoundingBanner neonCrmUrl={NEONCRM_URL} />

      <SectionDivider variant="light" />

      {/* Membership Tiers */}
      <section className={styles.tiers} aria-labelledby="tiers-headline">
        <div className={styles['tiers-inner']}>
          <h2 id="tiers-headline" className={styles['tiers-headline']}>
            Choose Your Level
          </h2>
          <p className={styles['tiers-intro']}>
            All memberships include unlimited admission and support our mission.
          </p>

          <div className={styles['tiers-grid']} role="list">
            {MEMBERSHIP_TIERS.map((tier) => (
              <article
                key={tier.id}
                className={`${styles['tier-card']} ${tier.highlighted ? styles['tier-card--highlighted'] : ''}`}
                role="listitem"
                aria-labelledby={`tier-${tier.id}-name`}
              >
                {tier.badge && (
                  <span
                    className={`${styles['tier-badge']} ${tier.badgeType ? styles[`tier-badge--${tier.badgeType}`] : ''}`}
                    aria-label={tier.badge}
                  >
                    {tier.badge}
                  </span>
                )}
                <h3 id={`tier-${tier.id}-name`} className={styles['tier-name']}>
                  {tier.name}
                </h3>
                <p className={styles['tier-tagline']}>{tier.tagline}</p>
                <p className={styles['tier-price']}>
                  <span className={styles['tier-price-amount']}>
                    ${tier.price.toLocaleString()}
                  </span>
                  <span className={styles['tier-price-period']}>/year</span>
                </p>
                <ul className={styles['tier-benefits']} aria-label={`${tier.name} benefits`}>
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className={styles['tier-benefit']}>
                      <span className={styles['tier-benefit-check']} aria-hidden="true">
                        &#10003;
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <a
                  href={NEONCRM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles['tier-cta']} ${tier.highlighted ? styles['tier-cta--primary'] : ''}`}
                  aria-label={`${tier.cta} (opens in new tab)`}
                >
                  {tier.cta} &rarr;
                </a>
              </article>
            ))}
          </div>

          <p className={styles['tiers-note']}>
            Secure checkout via NeonCRM &bull; Questions?{' '}
            <a href="mailto:rockymountmuseum@gmail.com">Email us</a>
          </p>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* Passport Bonus */}
      <section className={styles.passport} aria-labelledby="passport-headline">
        <div className={styles['passport-inner']}>
          <div className={styles['passport-content']}>
            <span className={styles['passport-badge']}>Included With Every Membership</span>
            <h2 id="passport-headline" className={styles['passport-headline']}>
              The 2026 Event Passport
            </h2>
            <p className={styles['passport-desc']}>
              Every member receives the America 250 Event Passport &mdash; a physical booklet to
              track your commemorative year. Attend events, collect stamps, and earn recognition.
              Collect 8 or more stamps and receive a commemorative pin at our December ceremony.
            </p>
            <p className={styles['passport-hashtag']}>#TN250Passport</p>
            <Link href="/events" className={styles['passport-link']}>
              View 2026 Events &rarr;
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Upgrade Comparison */}
      <section className={styles.comparison} aria-labelledby="comparison-headline">
        <div className={styles['comparison-inner']}>
          <h2 id="comparison-headline" className={styles['comparison-headline']}>
            Family vs. Patriot
          </h2>
          <p className={styles['comparison-intro']}>
            Not sure which level is right for you? Here&apos;s a quick comparison.
          </p>

          <div className={styles['comparison-table-wrapper']}>
            <table
              className={styles['comparison-table']}
              aria-label="Comparison of Frontier Family and Patriot Pass memberships"
            >
              <thead>
                <tr>
                  <th scope="col" className={styles['comparison-th']}>
                    Benefit
                  </th>
                  <th scope="col" className={styles['comparison-th']}>
                    Frontier Family
                  </th>
                  <th scope="col" className={styles['comparison-th']}>
                    Patriot Pass
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className={styles['comparison-td']}>
                    Price
                  </th>
                  <td className={styles['comparison-td']}>$100/year</td>
                  <td className={styles['comparison-td']}>$200/year</td>
                </tr>
                <tr>
                  <th scope="row" className={styles['comparison-td']}>
                    Admission
                  </th>
                  <td className={styles['comparison-td']}>2 adults + 4 children</td>
                  <td className={styles['comparison-td']}>2 adults + 4 children</td>
                </tr>
                <tr>
                  <th scope="row" className={styles['comparison-td']}>
                    Festivals
                  </th>
                  <td className={styles['comparison-td']}>FREE</td>
                  <td className={styles['comparison-td']}>FREE</td>
                </tr>
                <tr>
                  <th scope="row" className={styles['comparison-td']}>
                    Haunting on the Mount
                    <br />
                    <span className={styles['comparison-subtext']}>Candlelight Christmas</span>
                  </th>
                  <td className={styles['comparison-td']}>50% off</td>
                  <td className={styles['comparison-td']}>FREE</td>
                </tr>
                <tr>
                  <th scope="row" className={styles['comparison-td']}>
                    Behind the Scenes
                  </th>
                  <td className={styles['comparison-td']}>1 FREE</td>
                  <td className={styles['comparison-td']}>2 FREE</td>
                </tr>
                <tr>
                  <th scope="row" className={styles['comparison-td']}>
                    Guest passes
                  </th>
                  <td className={styles['comparison-td']}>2 per year</td>
                  <td className={styles['comparison-td']}>4 per year</td>
                </tr>
                <tr>
                  <th scope="row" className={styles['comparison-td']}>
                    2026 Event Passport
                  </th>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']} aria-hidden="true">
                      &#10003;
                    </span>
                    <span className="sr-only">Included</span>
                  </td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']} aria-hidden="true">
                      &#10003;
                    </span>
                    <span className="sr-only">Included</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={styles['comparison-td']}>
                    Newsletter + early registration
                  </th>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']} aria-hidden="true">
                      &#10003;
                    </span>
                    <span className="sr-only">Included</span>
                  </td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']} aria-hidden="true">
                      &#10003;
                    </span>
                    <span className="sr-only">Included</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles['comparison-callout']}>
            Attend 2 premium events and the $100 upgrade pays for itself.
          </p>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* FAQ Section */}
      <section className={styles.faq} aria-labelledby="faq-headline">
        <div className={styles['faq-inner']}>
          <h2 id="faq-headline" className={styles['faq-headline']}>
            Common Questions
          </h2>

          <div className={styles['faq-list']} role="list" aria-label="Frequently asked questions">
            {FAQ_ITEMS.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} index={index} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Emotional Close */}
      <section className={styles.close} aria-labelledby="close-headline">
        <div className={styles['close-inner']}>
          <h2 id="close-headline" className={styles['close-headline']}>
            In 2026, America turns 250. Tennessee turns 230.
          </h2>
          <p className={styles['close-desc']}>
            And for one year, Rocky Mount will celebrate both&mdash;with festivals, tours,
            ceremonies, and moments you can&apos;t replicate.
          </p>
          <p className={styles['close-question']}>
            Your grandchildren will ask you someday: &ldquo;Where were you when America turned
            250?&rdquo;
          </p>
          <p className={styles['close-answer']}>
            You could answer: &ldquo;I watched it on TV.&rdquo;
          </p>
          <p className={styles['close-answer-alt']}>
            Or you could answer: &ldquo;I was there. I stood where Tennessee began. And I have the
            passport to prove it.&rdquo;
          </p>
          <a
            href={NEONCRM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['close-cta']}
            aria-label="Become a Member (opens in new tab)"
          >
            Become a Member &rarr;
          </a>
          <p className={styles['close-note']}>
            Questions? <a href="mailto:rockymountmuseum@gmail.com">rockymountmuseum@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  )
}
