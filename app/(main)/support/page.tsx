import type { Metadata } from 'next'
import Link from 'next/link'
import siteInfo from '@/data/siteInfo.json'
import membershipData from '@/data/membership.json'
import styles from './page.module.css'

// Get lowest membership price from tiers
const lowestTier = membershipData.tiers.reduce((min, tier) => (tier.price < min.price ? tier : min))
const membershipStartPrice = lowestTier.price

// Section divider variant type
type DividerVariant = 'default' | 'light' | 'dark'

// Section divider component for period-authentic transitions
function SectionDivider({ variant = 'default' }: { variant?: DividerVariant }): React.ReactElement {
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

export const metadata: Metadata = {
  title: 'Support Rocky Mount | Tennessee Starts Here',
  description:
    "Support Rocky Mount State Historic Site. Become a member, make a gift, or volunteer to preserve Tennessee's origin story.",
  openGraph: {
    title: 'Support Rocky Mount | Tennessee Starts Here',
    description:
      'Support Rocky Mount State Historic Site. Become a member, make a gift, or volunteer.',
    url: 'https://tennesseestartshere.com/support',
  },
}

// Impact statement interface
interface ImpactStatement {
  stat: string
  label: string
  description: string
}

// Support option interface
interface SupportOption {
  title: string
  description: string
  price: string
  cta: string
  href: string
  external: boolean
  trustLabel: string
}

const IMPACT_STATEMENTS: ImpactStatement[] = [
  {
    stat: '10,000+',
    label: 'Annual Visitors',
    description:
      'Students, families, and history enthusiasts experience the birthplace of Tennessee.',
  },
  {
    stat: '250 Years',
    label: 'Preserving History',
    description:
      'From 1770s frontier home to the first capital of the Territory of the United States South of the River Ohio (1790–1792)—maintained for future generations.',
  },
  {
    stat: '5,000+',
    label: 'Students Served',
    description:
      'Field trips bring Tennessee history to life through hands-on learning and primary sources.',
  },
]

const SUPPORT_OPTIONS: SupportOption[] = [
  {
    title: 'Become a Member',
    description: 'Join our community of history supporters',
    price: `Memberships from $${membershipStartPrice}/year`,
    cta: 'View Options',
    href: '/membership',
    external: false,
    trustLabel: '',
  },
  {
    title: 'Make a Gift',
    description: 'Support preservation and education',
    price: 'Gifts of any amount welcome',
    cta: 'Donate',
    href: membershipData.urls.donate,
    external: true,
    trustLabel: 'Secure checkout',
  },
  {
    title: 'Volunteer',
    description: 'Give time as interpreter or event support',
    price: 'Contact us to learn more',
    cta: 'Learn More',
    href: 'mailto:rockymountmuseum@gmail.com?subject=Volunteer%20Inquiry',
    external: false,
    trustLabel: '',
  },
]

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="support-hero-title">
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>Support Rocky Mount</p>
          <h1 id="support-hero-title" className={styles.headline}>
            Preserve Where Tennessee Began
          </h1>
          <p className={styles.subhead}>
            Rocky Mount preserves the place where Tennessee&apos;s government began. Your support
            maintains these historic grounds, expands educational programs, and shares this story
            with future generations.
          </p>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Your Impact */}
      <section className={styles.impact} aria-labelledby="impact-headline">
        <div className={styles['impact-inner']}>
          <h2 id="impact-headline" className={styles['impact-headline']}>
            Your Impact
          </h2>
          <p className={styles['impact-intro']}>
            Your support helps preserve the place where Tennessee&apos;s government was born and
            share this story with thousands of visitors each year.
          </p>
          <div className={styles['impact-grid']} role="list">
            {IMPACT_STATEMENTS.map((item) => (
              <article
                key={item.label}
                className={styles['impact-card']}
                role="listitem"
                aria-labelledby={`impact-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <p className={styles['impact-stat']} aria-label={`${item.stat} ${item.label}`}>
                  {item.stat}
                </p>
                <h3
                  id={`impact-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={styles['impact-label']}
                >
                  {item.label}
                </h3>
                <p className={styles['impact-desc']}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* Ways to Support */}
      <section className={styles.options} aria-labelledby="options-headline">
        <div className={styles['options-inner']}>
          <h2 id="options-headline" className={styles['options-headline']}>
            Ways to Support
          </h2>
          <div className={styles['options-grid']} role="list">
            {SUPPORT_OPTIONS.map((option) => (
              <article
                key={option.title}
                className={styles['option-card']}
                role="listitem"
                aria-labelledby={`option-${option.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <h3
                  id={`option-${option.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={styles['option-title']}
                >
                  {option.title}
                </h3>
                <p className={styles['option-desc']}>{option.description}</p>
                <p className={styles['option-price']}>{option.price}</p>
                <a
                  href={option.href}
                  target={option.external ? '_blank' : undefined}
                  rel={option.external ? 'noopener noreferrer' : undefined}
                  className={`${styles['option-cta']} btn-small`}
                  aria-label={option.external ? `${option.cta} (opens in new tab)` : option.cta}
                >
                  {option.cta} {option.external && '→'}
                </a>
                {option.trustLabel && <p className={styles['option-trust']}>{option.trustLabel}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* First 250 */}
      <section className={styles.first250} aria-labelledby="first250-headline">
        <div className={styles['first250-inner']}>
          <h2 id="first250-headline" className={styles['first250-headline']}>
            The First 250
          </h2>
          <p className={styles['first250-desc']}>
            Join our founding circle for America&apos;s 250th.
          </p>
          <p className={styles['first250-limit']}>Limited to 250 members</p>
          <p className={styles['first250-opens']}>Enrollment opens March 4, 2026</p>
          <Link href="/first-250" className={`${styles['first250-cta']} btn-small`}>
            Learn More →
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contact} aria-label="Contact information">
        <div className={styles['contact-inner']}>
          <p className={styles['contact-text']}>
            Questions?{' '}
            <a href="mailto:rockymountmuseum@gmail.com" aria-label="Email Rocky Mount Museum">
              rockymountmuseum@gmail.com
            </a>{' '}
            |{' '}
            <a
              href={`tel:+1${siteInfo.contact.phone.replace(/[^0-9]/g, '')}`}
              aria-label={`Call Rocky Mount at ${siteInfo.contact.phone}`}
            >
              {siteInfo.contact.phone}
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
