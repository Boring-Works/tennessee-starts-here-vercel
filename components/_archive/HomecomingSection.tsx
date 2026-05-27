'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from '@/app/(main)/home/page.module.css'
import { HOOKS } from '@/lib/copy'

// Frontier horizon silhouette
const HorizonSilhouette = () => (
  <svg viewBox="0 0 1200 200" preserveAspectRatio="none" fill="currentColor">
    {/* Rolling hills */}
    <path
      d="M0 200 L0 140 Q100 100 200 120 T400 100 T600 130 T800 90 T1000 110 T1200 80 L1200 200 Z"
      opacity="0.15"
    />
    <path
      d="M0 200 L0 160 Q150 130 300 150 T600 120 T900 140 T1200 100 L1200 200 Z"
      opacity="0.25"
    />
    <path d="M0 200 L0 170 Q200 150 400 165 T800 145 T1200 160 L1200 200 Z" opacity="0.4" />

    {/* Cabin silhouette */}
    <g transform="translate(580, 95)">
      <path d="M0 45 L20 25 L40 45 L40 65 L0 65 Z" /> {/* Cabin body */}
      <path d="M-5 45 L20 20 L45 45" fill="none" stroke="currentColor" strokeWidth="3" />{' '}
      {/* Roof */}
      <rect x="15" y="50" width="10" height="15" opacity="0.5" /> {/* Door */}
      <path d="M35 30 L35 15 L40 15 L40 35" /> {/* Chimney */}
    </g>

    {/* Trees */}
    <g transform="translate(480, 110)">
      <path d="M10 50 L10 35 M5 40 L10 35 L15 40 M3 45 L10 38 L17 45" />
    </g>
    <g transform="translate(720, 105)">
      <path d="M10 55 L10 40 M5 45 L10 40 L15 45 M3 50 L10 43 L17 50" />
    </g>

    {/* Sun/moon */}
    <circle cx="900" cy="60" r="25" opacity="0.2" />
  </svg>
)

// Compass rose for map card
const CompassRose = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.75">
    <circle cx="20" cy="20" r="16" opacity="0.3" />
    <circle cx="20" cy="20" r="8" opacity="0.2" />
    <path d="M20 4v6M20 30v6M4 20h6M30 20h6" strokeWidth="1" />
    <path d="M20 4l-2 6h4l-2-6z" fill="currentColor" opacity="0.6" />
    <path d="M8 8l4 4M28 28l4 4M8 32l4-4M28 8l4-4" opacity="0.4" />
    <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.5" />
  </svg>
)

export default function HomecomingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const taglineTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Delay tagline animation
          taglineTimeoutRef.current = setTimeout(() => setShowTagline(true), 1200)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      if (taglineTimeoutRef.current) {
        clearTimeout(taglineTimeoutRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={styles['homecoming-section']}
      aria-labelledby="homecoming-heading"
    >
      {/* Frontier horizon illustration */}
      <div
        className={`${styles['homecoming-horizon']} ${isVisible ? styles['homecoming-horizon--visible'] : ''}`}
        aria-hidden="true"
      >
        <HorizonSilhouette />
      </div>

      {/* Decorative border frame */}
      <div className={styles['homecoming-frame']} aria-hidden="true">
        <span
          className={`${styles['homecoming-frame-corner']} ${styles['homecoming-frame-corner--tl']}`}
        />
        <span
          className={`${styles['homecoming-frame-corner']} ${styles['homecoming-frame-corner--tr']}`}
        />
        <span
          className={`${styles['homecoming-frame-corner']} ${styles['homecoming-frame-corner--bl']}`}
        />
        <span
          className={`${styles['homecoming-frame-corner']} ${styles['homecoming-frame-corner--br']}`}
        />
      </div>

      <div className={styles['homecoming-container']}>
        {/* Location eyebrow */}
        <p
          className={`${styles['homecoming-eyebrow']} ${isVisible ? styles['homecoming-eyebrow--visible'] : ''}`}
        >
          <svg
            className={styles['homecoming-pin']}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          200 Hyder Hill Road · Piney Flats, Tennessee
        </p>

        {/* Headline */}
        <h2
          id="homecoming-heading"
          className={`${styles['homecoming-headline']} ${isVisible ? styles['homecoming-headline--visible'] : ''}`}
        >
          This Is Where It Started
        </h2>

        {/* Experiential hook - Fame Bridge */}
        <p
          className={`${styles['homecoming-hook']} ${isVisible ? styles['homecoming-hook--visible'] : ''}`}
        >
          {HOOKS.fameBridge} Meet costumed interpreters living as 1790 settlers.
        </p>

        {/* Vintage map location card */}
        <div
          className={`${styles['homecoming-map-card']} ${isVisible ? styles['homecoming-map-card--visible'] : ''}`}
        >
          {/* Torn edge top */}
          <div
            className={`${styles['homecoming-map-tear']} ${styles['homecoming-map-tear--top']}`}
            aria-hidden="true"
          />

          {/* Compass rose */}
          <div className={styles['homecoming-map-compass']} aria-hidden="true">
            <CompassRose />
          </div>

          <div className={styles['homecoming-map-content']}>
            <p className={styles['homecoming-location-name']}>Rocky Mount State Historic Site</p>
            <p className={styles['homecoming-location-coords']}>36°26&apos;N · 82°18&apos;W</p>
            <p className={styles['homecoming-location-distances']}>
              30 min from Johnson City · 45 min from Knoxville
            </p>
            <a
              href="https://maps.google.com/?q=200+Hyder+Hill+Rd+Piney+Flats+TN"
              target="_blank"
              rel="noopener noreferrer"
              className={styles['homecoming-location-link']}
            >
              View on Google Maps
              <span aria-hidden="true">↗</span>
            </a>
            <p className={styles['homecoming-location-duration']}>Plan 2–3 hours for your visit</p>
          </div>

          {/* Torn edge bottom */}
          <div
            className={`${styles['homecoming-map-tear']} ${styles['homecoming-map-tear--bottom']}`}
            aria-hidden="true"
          />
        </div>

        {/* Period signpost info bar */}
        <div
          className={`${styles['homecoming-signpost']} ${isVisible ? styles['homecoming-signpost--visible'] : ''}`}
        >
          <div
            className={`${styles['homecoming-signpost-plank']} ${styles['homecoming-signpost-plank--hours']}`}
          >
            <span className={styles['homecoming-signpost-label']}>Hours</span>
            <span className={styles['homecoming-signpost-value']}>Wed–Sat 10am–5pm</span>
          </div>
          <div className={styles['homecoming-signpost-post']} aria-hidden="true" />
          <div
            className={`${styles['homecoming-signpost-plank']} ${styles['homecoming-signpost-plank--admission']}`}
          >
            <span className={styles['homecoming-signpost-label']}>Admission</span>
            <span className={styles['homecoming-signpost-value']}>
              Adults $12 · Seniors $10 · Children $8 · Under 6 free
            </span>
          </div>
        </div>

        {/* Pulsing CTA with wax seal */}
        <div
          className={`${styles['homecoming-cta-wrapper']} ${isVisible ? styles['homecoming-cta-wrapper--visible'] : ''}`}
        >
          <Link href="/visit" className={styles['homecoming-cta']}>
            <span className={styles['homecoming-cta-seal']} aria-hidden="true">
              ★
            </span>
            <span className={styles['homecoming-cta-text']}>Visit Rocky Mount</span>
          </Link>
        </div>

        {/* Animated closing tagline */}
        <p
          className={`${styles['homecoming-closing']} ${showTagline ? styles['homecoming-closing--visible'] : ''}`}
        >
          <span className={styles['homecoming-closing-main']}>
            {HOOKS.closingTagline.split('.')[0]}.
          </span>
          <em className={styles['homecoming-closing-question']}>
            {HOOKS.closingTagline.split('.')[1]?.trim()}
          </em>
        </p>
      </div>
    </section>
  )
}
