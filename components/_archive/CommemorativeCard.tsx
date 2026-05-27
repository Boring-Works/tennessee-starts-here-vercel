'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './CommemorativeCard.module.css'

export default function CommemorativeCard() {
  const [daysToTN230, setDaysToTN230] = useState(0)
  const [daysToUSA250, setDaysToUSA250] = useState(0)
  const [mounted, setMounted] = useState(false)
  const mountedRef = useRef(false)

  useEffect(() => {
    // Use ref to track mount status without triggering re-render cascade
    mountedRef.current = true
    let intervalId: NodeJS.Timeout | null = null

    const calculateDays = () => {
      const now = new Date()
      const tn230 = new Date('2026-06-01T00:00:00-04:00')
      const usa250 = new Date('2026-07-04T00:00:00-04:00')

      setDaysToTN230(Math.ceil((tn230.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
      setDaysToUSA250(Math.ceil((usa250.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    }

    calculateDays()

    // Defer mount state update to avoid sync setState in effect
    queueMicrotask(() => {
      if (mountedRef.current) {
        setMounted(true)
      }
    })

    // Calculate ms until next midnight
    const now = new Date()
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const msUntilMidnight = tomorrow.getTime() - now.getTime()

    const timeout = setTimeout(() => {
      calculateDays()
      // After first midnight, set up daily interval
      intervalId = setInterval(calculateDays, 24 * 60 * 60 * 1000)
    }, msUntilMidnight)

    return () => {
      mountedRef.current = false
      clearTimeout(timeout)
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [])

  return (
    <div className={styles.card}>
      {/* Corner accents */}
      <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

      {/* Header */}
      <header className={styles.header}>
        <span className={styles.eyebrow}>Rocky Mount State Historic Site</span>
        <h2 className={styles.title}>2026 Commemorative Year</h2>
        <p className={styles.tagline}>&ldquo;Where Tennessee Began&rdquo;</p>
      </header>

      {/* Textile Journey - From Fleece to Flag */}
      <nav className={styles.journey} aria-label="2026 Textile Event Journey">
        <div className={styles.event}>
          <span className={styles.eventIcon} aria-hidden="true">
            🐑
          </span>
          <span className={styles.eventName}>Woolly Days</span>
          <span className={styles.eventDate}>Apr 25-26</span>
        </div>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        <div className={`${styles.event} ${styles.eventHighlight}`}>
          <span className={styles.eventIcon} aria-hidden="true">
            🧵
          </span>
          <span className={styles.eventName}>Stitching Independence</span>
          <span className={styles.eventDate}>Jun 13-14</span>
        </div>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        <div className={styles.event}>
          <span className={styles.eventIcon} aria-hidden="true">
            🇺🇸
          </span>
          <span className={styles.eventName}>America 250</span>
          <span className={styles.eventDate}>Jul 4</span>
        </div>
      </nav>

      {/* Dual Countdown */}
      <div className={styles.countdowns}>
        <div className={styles.countdown}>
          <span className={styles.countdownLabel}>TENNESSEE 230</span>
          <span className={styles.countdownTitle}>Statehood Day</span>
          <span className={styles.countdownDate}>June 1</span>
          <span
            className={styles.countdownDays}
            aria-label={`${daysToTN230} days until Tennessee's 230th birthday`}
          >
            {mounted ? daysToTN230 : '—'} days
          </span>
        </div>
        <div className={styles.countdown}>
          <span className={styles.countdownLabel}>AMERICA 250</span>
          <span className={styles.countdownTitle}>Birthday</span>
          <span className={styles.countdownDate}>July 4</span>
          <span
            className={styles.countdownDays}
            aria-label={`${daysToUSA250} days until America's 250th birthday`}
          >
            {mounted ? daysToUSA250 : '—'} days
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider} aria-hidden="true">
        <span className={styles.dividerLine} />
        <span className={styles.dividerOrnament}>✦</span>
        <span className={styles.dividerLine} />
      </div>

      {/* First Families Reunion */}
      <section className={styles.reunion}>
        <span className={styles.reunionEyebrow}>First Families of Tennessee</span>
        <h3 className={styles.reunionTitle}>Reunion</h3>
        <p className={styles.reunionSubtitle}>September 11-13 · A Gathering of Descendants</p>
        <Link href="/events/first-families" className={styles.reunionCta}>
          Register Your Family
        </Link>
      </section>
    </div>
  )
}
