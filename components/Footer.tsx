'use client'

import { memo, useCallback } from 'react'
import Link from 'next/link'
import siteInfo from '@/data/siteInfo.json'
import styles from './Footer/Footer.module.css'
import { ReviewCTA } from './ReviewCTA'

// Period-authentic quill icon
const QuillIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles['footer-icon']}
  >
    <path d="M20 2c-2 2-4 6-4 10l-3-1" />
    <path d="M13 11l-3 3-2 8 8-2 3-3" />
    <path d="M16 8c-2 2-1 4 0 6" strokeWidth="1" opacity="0.5" />
  </svg>
)

// Compass icon for location
const CompassIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles['footer-icon']}
  >
    <circle cx="12" cy="12" r="10" />
    <path
      d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
      fill="currentColor"
      opacity="0.2"
    />
  </svg>
)

// Social media icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={styles['footer-social-icon']}>
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
)

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles['footer-social-icon']}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={styles['footer-social-icon']}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
)

/**
 * Footer Component
 *
 * Site footer with navigation, contact info, social links, and newsletter signup.
 * Memoized to prevent unnecessary re-renders.
 */
function FooterComponent() {
  // Back to top scroll handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return (
    <footer className={styles['site-footer']} role="contentinfo">
      {/* Back to Top Button */}
      <button
        type="button"
        className={styles['footer-back-to-top']}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        <span className={styles['footer-back-to-top-text']}>Return to Top</span>
      </button>

      {/* Decorative top border with flourishes */}
      <div className={styles['footer-border']} aria-hidden="true">
        <span className={styles['footer-border-line']} />
        <span className={styles['footer-border-flourish']}>❧</span>
        <span className={styles['footer-border-ornament']}>✦</span>
        <span
          className={`${styles['footer-border-flourish']} ${styles['footer-border-flourish--flip']}`}
        >
          ❧
        </span>
        <span className={styles['footer-border-line']} />
      </div>

      {/* Corner bracket decorations */}
      <span
        className={`${styles['footer-corner']} ${styles['footer-corner--tl']}`}
        aria-hidden="true"
      />
      <span
        className={`${styles['footer-corner']} ${styles['footer-corner--tr']}`}
        aria-hidden="true"
      />
      <span
        className={`${styles['footer-corner']} ${styles['footer-corner--bl']}`}
        aria-hidden="true"
      />
      <span
        className={`${styles['footer-corner']} ${styles['footer-corner--br']}`}
        aria-hidden="true"
      />

      <div className={styles['footer-container']}>
        <div className={styles['footer-grid']}>
          {/* Site Info with Wax Seal */}
          <div className={styles['footer-brand']}>
            {/* Wax seal */}
            <div className={styles['footer-seal']} aria-hidden="true">
              <span className={styles['footer-seal-inner']}>RM</span>
            </div>

            <h3 className={styles['footer-title']}>
              <span className={styles['footer-title-main']}>Rocky Mount</span>
              <span className={styles['footer-title-sub']}>State Historic Site</span>
            </h3>

            <p className={styles['footer-tagline']}>Where Tennessee&apos;s government began.</p>

            <address className={styles['footer-address']}>
              <CompassIcon />
              <span>
                {siteInfo.location.address.street}
                <br />
                {siteInfo.location.address.city}, TN {siteInfo.location.address.zip}
              </span>
            </address>

            {/* Hours Display */}
            <div className={styles['footer-hours']}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={styles['footer-icon']}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>
                {siteInfo.hours.formatted.days}
                <br />
                {siteInfo.hours.formatted.time}
              </span>
            </div>

            {/* Phone Number Link */}
            <a
              href={`tel:${siteInfo.contact.phone.replace(/[^\d]/g, '')}`}
              className={styles['footer-directions']}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={styles['footer-directions-icon']}
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {siteInfo.contact.phone}
            </a>

            {/* Get Directions Link */}
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${siteInfo.location.address.street} ${siteInfo.location.address.city} TN`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles['footer-directions']}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={styles['footer-directions-icon']}
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Get Directions
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={styles['footer-directions-arrow']}
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>

            {/* Social Media Links */}
            <div className={styles['footer-social']}>
              <a
                href={`https://www.facebook.com/${siteInfo.contact.social.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['footer-social-link']}
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={`https://www.instagram.com/${siteInfo.contact.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['footer-social-link']}
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={`https://www.tiktok.com/@${siteInfo.contact.social.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['footer-social-link']}
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon />
              </a>
            </div>

            <p className={styles['footer-established']}>
              <span className={styles['footer-established-line']} aria-hidden="true" />
              Capital 1790–1792
              <span className={styles['footer-established-line']} aria-hidden="true" />
            </p>
          </div>

          {/* VISIT Column */}
          <nav className={styles['footer-nav']} aria-label="Visit navigation">
            <h3 className={styles['footer-nav-title']}>
              <QuillIcon />
              Visit
            </h3>
            <ul className={styles['footer-nav-list']}>
              <li>
                <Link href="/visit" className={styles['footer-link']}>
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  Plan Your Visit
                </Link>
              </li>
              <li>
                <Link href="/groups" className={styles['footer-link']}>
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  Group Visits
                </Link>
              </li>
              <li>
                <a href={`mailto:${siteInfo.contact.email}`} className={styles['footer-link']}>
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* EVENTS Column */}
          <nav className={styles['footer-nav']} aria-label="Events navigation">
            <h3 className={styles['footer-nav-title']}>
              <QuillIcon />
              Events
            </h3>
            <ul className={styles['footer-nav-list']}>
              <li>
                <Link href="/events" className={styles['footer-link']}>
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  Full Calendar
                </Link>
              </li>
              <li>
                <Link href="/lectures" className={styles['footer-link']}>
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  Lectures
                </Link>
              </li>
            </ul>
          </nav>

          {/* DISCOVER Column */}
          <nav className={styles['footer-nav']} aria-label="Explore navigation">
            <h3 className={styles['footer-nav-title']}>
              <QuillIcon />
              Explore
            </h3>
            <ul className={styles['footer-nav-list']}>
              <li>
                <Link href="/our-story" className={styles['footer-link']}>
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/evidence" className={styles['footer-link']}>
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  Evidence Room
                </Link>
              </li>
              <li>
                <Link href="/educators" className={styles['footer-link']}>
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  For Educators
                </Link>
              </li>
            </ul>
          </nav>

          {/* SUPPORT Column */}
          <nav className={styles['footer-nav']} aria-label="Support navigation">
            <h3 className={styles['footer-nav-title']}>
              <QuillIcon />
              Support
            </h3>
            <ul className={styles['footer-nav-list']}>
              <li>
                <a
                  href="https://rockymountmuseum.z2systems.com/np/clients/rockymountmuseum/membershipJoin.jsp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['footer-link']}
                >
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  Membership
                  <span className={styles['footer-link-external']} aria-hidden="true">
                    {' '}
                    →
                  </span>
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://rockymountmuseum.z2systems.com/np/clients/rockymountmuseum/donation.jsp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['footer-link']}
                >
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  Donate
                  <span className={styles['footer-link-external']} aria-hidden="true">
                    {' '}
                    →
                  </span>
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteInfo.contact.email}?subject=Volunteer%20Inquiry`}
                  className={styles['footer-link']}
                >
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  Volunteer
                </a>
              </li>
              <li>
                <Link href="/first-250" className={styles['footer-link']}>
                  <span className={styles['footer-link-bullet']} aria-hidden="true">
                    ◆
                  </span>
                  First 250
                </Link>
              </li>
            </ul>
          </nav>

          {/* America 250 Badge - Enhanced */}
          <div className={styles['footer-commemoration']}>
            <div className={`${styles['footer-badge']} ${styles['footer-badge--prominent']}`}>
              <div className={styles['footer-badge-seal']} aria-hidden="true">
                <span className={styles['footer-badge-seal-inner']}>250</span>
              </div>
              <div className={styles['footer-badge-content']}>
                <p className={styles['footer-badge-label']}>Official Partner</p>
                <p className={styles['footer-badge-text']}>America&apos;s 250th Anniversary</p>
                <p className={styles['footer-badge-subtext']}>Tennessee&apos;s 230th Statehood</p>
              </div>
              <div className={styles['footer-badge-years']} aria-hidden="true">
                <span className={styles['footer-badge-year']}>1776</span>
                <span className={styles['footer-badge-divider']}>—</span>
                <span className={styles['footer-badge-year']}>2026</span>
              </div>
            </div>

            {/* Newsletter Signup - See data/integrations.json for setup */}
            <div className={styles['footer-newsletter']}>
              <h4 className={styles['footer-newsletter-title']}>Stay Informed</h4>
              <p className={styles['footer-newsletter-desc']}>
                Follow us on social media for event updates, or call{' '}
                <a href="tel:+14235387396" className={styles['footer-newsletter-link']}>
                  (423) 538-7396
                </a>{' '}
                to join our mailing list.
              </p>
              {/* Newsletter form - uncomment when email service is configured
              <form className={styles['footer-newsletter-form']} action="#" method="POST">
                <div className={styles['footer-newsletter-input-wrapper']}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className={styles['footer-newsletter-input']}
                    aria-label="Email address for newsletter"
                    required
                  />
                  <button
                    type="submit"
                    className={styles['footer-newsletter-btn']}
                    aria-label="Subscribe to newsletter"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
              */}
            </div>
          </div>
        </div>

        {/* Review CTA - Data-driven from integrations.json */}
        <ReviewCTA
          variant="footer"
          headline="Enjoyed Your Visit?"
          subtext="Help future visitors discover Rocky Mount by sharing your experience."
          className="border-t border-white/10 mt-8"
        />

        {/* Bottom Bar with decorative rule */}
        <div className={styles['footer-bottom']}>
          <div className={styles['footer-bottom-rule']} aria-hidden="true">
            <span className={styles['footer-bottom-rule-line']} />
            <span className={styles['footer-bottom-rule-star']}>★</span>
            <span className={styles['footer-bottom-rule-line']} />
          </div>

          <p className={styles['footer-copyright']}>
            &copy; 2026 Rocky Mount Historical Association
          </p>
          <p className={styles['footer-legal']}>
            A Tennessee Historical Commission property operated by the nonprofit Rocky Mount
            Historical Association
          </p>
        </div>
      </div>
    </footer>
  )
}

export default memo(FooterComponent)
