'use client'

import { useEffect, useRef, useState } from 'react'
import styles from '@/app/(main)/home/page.module.css'

// Period-authentic engraving-style icons
const QuillInkwellIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Inkwell */}
    <ellipse cx="20" cy="52" rx="12" ry="4" />
    <path d="M8 52v-8c0-2 2-4 4-4h16c2 0 4 2 4 4v8" />
    <ellipse cx="20" cy="40" rx="12" ry="3" />
    <path d="M14 40v-4c0-1 2-2 6-2s6 1 6 2v4" strokeWidth="1" opacity="0.5" />
    {/* Quill pen */}
    <path d="M36 8c8 4 12 16 8 32l-8-4" />
    <path d="M36 8c-2 8-1 16 0 24" strokeWidth="1" />
    <path d="M36 36l8 4-4 8-6-2" />
    <path d="M34 46l-10 10" strokeWidth="2" />
    {/* Feather details */}
    <path d="M40 12c4 2 6 8 4 16" strokeWidth="1" opacity="0.4" />
    <path d="M38 16c2 4 2 10 0 14" strokeWidth="1" opacity="0.3" />
  </svg>
)

const GavelDocumentIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Document */}
    <path d="M12 8h28l8 8v40H12V8z" />
    <path d="M40 8v8h8" />
    {/* Document lines */}
    <path d="M18 24h24" strokeWidth="1" opacity="0.5" />
    <path d="M18 30h20" strokeWidth="1" opacity="0.4" />
    <path d="M18 36h22" strokeWidth="1" opacity="0.3" />
    <path d="M18 42h16" strokeWidth="1" opacity="0.3" />
    {/* Gavel */}
    <rect x="38" y="12" width="18" height="8" rx="2" transform="rotate(45 47 16)" />
    <path d="M44 22l8 8" strokeWidth="3" />
    <path d="M52 30l4 4" strokeWidth="2" />
    {/* Sound block */}
    <ellipse cx="56" cy="38" rx="6" ry="3" />
    <path d="M50 38v4c0 1.5 2.5 3 6 3s6-1.5 6-3v-4" />
  </svg>
)

const CompassRose = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Outer circle */}
    <circle cx="24" cy="24" r="20" opacity="0.3" />
    {/* Inner circle */}
    <circle cx="24" cy="24" r="12" opacity="0.2" />
    {/* Cardinal points */}
    <path d="M24 4v8M24 36v8M4 24h8M36 24h8" strokeWidth="1.5" />
    {/* N arrow (filled) */}
    <path d="M24 4l-3 8h6l-3-8z" fill="currentColor" opacity="0.6" />
    {/* Intercardinal points */}
    <path d="M10 10l5 5M33 33l5 5M10 38l5-5M33 15l5-5" opacity="0.4" />
    {/* Center */}
    <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.5" />
    {/* Letters */}
    <text
      x="24"
      y="9"
      textAnchor="middle"
      fontSize="4"
      fill="currentColor"
      opacity="0.7"
      fontFamily="serif"
    >
      N
    </text>
    <text
      x="24"
      y="45"
      textAnchor="middle"
      fontSize="4"
      fill="currentColor"
      opacity="0.5"
      fontFamily="serif"
    >
      S
    </text>
    <text
      x="7"
      y="25.5"
      textAnchor="middle"
      fontSize="4"
      fill="currentColor"
      opacity="0.5"
      fontFamily="serif"
    >
      W
    </text>
    <text
      x="41"
      y="25.5"
      textAnchor="middle"
      fontSize="4"
      fill="currentColor"
      opacity="0.5"
      fontFamily="serif"
    >
      E
    </text>
  </svg>
)

// Animated counter hook
function useCountUp(end: number, duration: number = 1500, isVisible: boolean) {
  const [count, setCount] = useState(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isVisible) return

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isVisible])

  return count
}

export default function LedgerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Animated counters
  const miles = useCountUp(600, 1500, isVisible)
  const years = useCountUp(14, 1200, isVisible)

  return (
    <section ref={sectionRef} className={styles['ledger-section']} aria-labelledby="ledger-heading">
      {/* Ledger ruling lines background */}
      <div className={styles['ledger-ruling']} aria-hidden="true" />

      <div className={styles['ledger-container']}>
        {/* Section header */}
        <header className={styles['ledger-header']}>
          <p className={styles['ledger-eyebrow']}>The Official Record of Expansion</p>
          <h2 id="ledger-heading" className={styles['ledger-headline']}>
            Two Dates. One Story.
          </h2>
          <p className={styles['ledger-intro']}>
            Independence was declared in Philadelphia. It was <em>proven</em> on the frontier.
          </p>
        </header>

        {/* The two-column ledger book */}
        <div
          className={`${styles['ledger-book']} ${isVisible ? styles['ledger-book--visible'] : ''}`}
        >
          {/* 1776 - The Promise */}
          <article className={`${styles['ledger-card']} ${styles['ledger-card--promise']}`}>
            {/* Page corner lift effect */}
            <span className={styles['ledger-page-corner']} aria-hidden="true" />

            {/* Wax seal - faded gray */}
            <div
              className={`${styles['ledger-seal']} ${styles['ledger-seal--faded']}`}
              aria-hidden="true"
            >
              <span className={styles['ledger-seal-inner']}>US</span>
            </div>

            <div className={styles['ledger-card-header']}>
              <span className={styles['ledger-card-year']}>1776</span>
              <span className={styles['ledger-card-label']}>The Promise</span>
            </div>

            <div className={styles['ledger-card-content']}>
              <h3 className={styles['ledger-card-location']}>Philadelphia</h3>
              <p className={styles['ledger-card-coords']}>39°57&apos;N · 75°10&apos;W</p>
              <p className={styles['ledger-card-role']}>The Theory</p>
              <p className={styles['ledger-card-text']}>
                Fifty-six men signed a document declaring all men are created equal, with
                unalienable rights to life, liberty, and the pursuit of happiness.
              </p>
              <p className={styles['ledger-card-emphasis']}>Words on parchment. A promise made.</p>
            </div>

            <div className={styles['ledger-card-icon']} aria-hidden="true">
              <QuillInkwellIcon />
            </div>
          </article>

          {/* Binding spine with compass and journey line */}
          <div className={styles['ledger-spine']} aria-hidden="true">
            <span className={styles['ledger-spine-top']} />

            {/* Journey line */}
            <div className={styles['ledger-journey']}>
              <span className={styles['ledger-journey-line']} />
              <span className={styles['ledger-journey-arrow']}>→</span>
            </div>

            {/* Compass rose */}
            <div className={styles['ledger-compass']}>
              <CompassRose />
            </div>

            {/* VS text */}
            <span className={styles['ledger-spine-vs']}>vs</span>

            <span className={styles['ledger-spine-bottom']} />
          </div>

          {/* 1790 - The Proof */}
          <article className={`${styles['ledger-card']} ${styles['ledger-card--proof']}`}>
            {/* Page corner lift effect */}
            <span className={styles['ledger-page-corner']} aria-hidden="true" />

            {/* Wax seal - vibrant burgundy */}
            <div
              className={`${styles['ledger-seal']} ${styles['ledger-seal--active']}`}
              aria-hidden="true"
            >
              <span className={styles['ledger-seal-inner']}>SW</span>
            </div>

            <div className={styles['ledger-card-header']}>
              <span className={styles['ledger-card-year']}>1790</span>
              <span className={styles['ledger-card-label']}>The Proof</span>
            </div>

            <div className={styles['ledger-card-content']}>
              <h3 className={styles['ledger-card-location']}>Rocky Mount</h3>
              <p className={styles['ledger-card-coords']}>36°26&apos;N · 82°18&apos;W</p>
              <p className={styles['ledger-card-role']}>The Practice</p>
              <p className={styles['ledger-card-text']}>
                William Blount arrived at this frontier outpost and established the Southwest
                Territory&apos;s government—turning the Constitution into frontier law.
              </p>
              <p className={styles['ledger-card-emphasis']}>
                Action on the frontier. A promise kept.
              </p>
            </div>

            <div className={styles['ledger-card-icon']} aria-hidden="true">
              <GavelDocumentIcon />
            </div>
          </article>
        </div>

        {/* Bottom stat bar */}
        <div
          className={`${styles['ledger-stats']} ${isVisible ? styles['ledger-stats--visible'] : ''}`}
        >
          <div className={styles['ledger-stat']}>
            <span className={styles['ledger-stat-value']}>{miles}</span>
            <span className={styles['ledger-stat-label']}>miles from Philadelphia</span>
          </div>
          <div className={styles['ledger-stat-divider']} aria-hidden="true">
            <span>◆</span>
          </div>
          <div className={styles['ledger-stat']}>
            <span className={styles['ledger-stat-value']}>{years}</span>
            <span className={styles['ledger-stat-label']}>years to prove the promise</span>
          </div>
          <div className={styles['ledger-stat-divider']} aria-hidden="true">
            <span>◆</span>
          </div>
          <div className={styles['ledger-stat']}>
            <span className={styles['ledger-stat-value']}>16th</span>
            <span className={styles['ledger-stat-label']}>state to join the Union</span>
          </div>
        </div>
      </div>
    </section>
  )
}
