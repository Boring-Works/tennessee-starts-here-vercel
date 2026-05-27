'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from '@/app/(main)/home/page.module.css'
import { BUTTONS } from '@/lib/copy'

interface ExperienceMoment {
  numeral: string
  title: string
  description: string
  icon: React.ReactNode
}

// Period-authentic engraving-style SVG icons
const GroundsIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Classical building/capitol */}
    <path d="M8 52h48M12 52V32M52 32v20" />
    <path d="M12 32h40" />
    <path d="M16 32V22M24 32V22M32 32V22M40 32V22M48 32V22" />
    <path d="M10 22h44l-22-12-22 12z" />
    <circle cx="32" cy="16" r="2" />
    {/* Ground line details */}
    <path d="M4 56h56" strokeWidth="1" opacity="0.5" />
    <path
      d="M6 54c2-1 4-1 6 0s4 1 6 0 4-1 6 0 4 1 6 0 4-1 6 0 4 1 6 0 4-1 6 0 4 1 6 0"
      strokeWidth="1"
      opacity="0.3"
    />
  </svg>
)

const SettlersIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Colonial figure with tricorn hat */}
    <ellipse cx="32" cy="18" rx="8" ry="9" />
    <path d="M24 14c-4-2-6 0-8 2h0c2 4 6 4 8 2" />
    <path d="M40 14c4-2 6 0 8 2h0c-2 4-6 4-8 2" />
    <path d="M26 22s2 4 6 4 6-4 6-4" />
    {/* Coat/clothing */}
    <path d="M24 27l-8 28h8l8-18 8 18h8l-8-28" />
    <path d="M28 27v12M36 27v12" />
    {/* Buttons */}
    <circle cx="32" cy="32" r="1" fill="currentColor" />
    <circle cx="32" cy="38" r="1" fill="currentColor" />
    <circle cx="32" cy="44" r="1" fill="currentColor" />
  </svg>
)

const BuildingsIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Log cabin */}
    <path d="M8 32l24-16 24 16" />
    <path d="M12 32v22h40V32" />
    {/* Door */}
    <path d="M26 54V40h12v14" />
    <circle cx="35" cy="47" r="1" fill="currentColor" />
    {/* Window */}
    <rect x="16" y="38" width="8" height="8" />
    <path d="M20 38v8M16 42h8" />
    <rect x="40" y="38" width="8" height="8" />
    <path d="M44 38v8M40 42h8" />
    {/* Chimney */}
    <path d="M44 20v-6h6v10" />
    {/* Log texture lines */}
    <path d="M12 36h14M38 36h14" strokeWidth="1" opacity="0.5" />
    <path d="M12 44h14M38 44h14" strokeWidth="1" opacity="0.5" />
    <path d="M12 50h14M38 50h14" strokeWidth="1" opacity="0.5" />
  </svg>
)

const ScrollIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Scroll/document */}
    <path d="M16 8c-4 0-6 2-6 6v36c0 4 2 6 6 6" />
    <path d="M16 8h32c4 0 6 2 6 6v28c0 4-2 6-6 6H20" />
    <path d="M16 56c4 0 6-2 6-6V14c0-4-2-6-6-6" />
    {/* Roll at bottom */}
    <ellipse cx="18" cy="52" rx="4" ry="6" />
    {/* Text lines */}
    <path d="M26 20h20" strokeWidth="1" />
    <path d="M26 26h18" strokeWidth="1" opacity="0.7" />
    <path d="M26 32h16" strokeWidth="1" opacity="0.5" />
    <path d="M26 38h14" strokeWidth="1" opacity="0.3" />
    {/* Quill accent */}
    <path d="M44 44l6-6c2-2 4-1 4 1l-8 8c-1 1-3 0-2-3z" strokeWidth="1" />
  </svg>
)

const experiences: ExperienceMoment[] = [
  {
    numeral: 'I',
    icon: <GroundsIcon />,
    title: 'Stand on Historic Ground',
    description:
      "The same ground where Governor Blount established Tennessee's government in 1790.",
  },
  {
    numeral: 'II',
    icon: <SettlersIcon />,
    title: 'Meet the Settlers',
    description: 'Costumed interpreters bring 1790s frontier life to vivid reality.',
  },
  {
    numeral: 'III',
    icon: <BuildingsIcon />,
    title: 'Enter the Past',
    description: "Historic structures on the ground where Tennessee's government began.",
  },
  {
    numeral: 'IV',
    icon: <ScrollIcon />,
    title: 'Hear the Story',
    description: "Guided tours reveal how Tennessee's government began at this frontier outpost.",
  },
]

export default function ExperiencePreview() {
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

  return (
    <section
      ref={sectionRef}
      className={styles['experience-section']}
      aria-labelledby="experience-heading"
    >
      <div className={styles['experience-container']}>
        {/* Decorative header with bracket flourishes */}
        <header className={styles['experience-header']}>
          <p className={styles['experience-eyebrow']}>The Living History Experience</p>

          {/* Headline with decorative brackets */}
          <div className={styles['experience-headline-wrapper']}>
            <span
              className={`${styles['experience-bracket']} ${styles['experience-bracket--left']}`}
              aria-hidden="true"
            >
              [
            </span>
            <h2 id="experience-heading" className={styles['experience-headline']}>
              Step Into 1790
            </h2>
            <span
              className={`${styles['experience-bracket']} ${styles['experience-bracket--right']}`}
              aria-hidden="true"
            >
              ]
            </span>
          </div>

          <p className={styles['experience-intro']}>
            More than a museum. Rocky Mount is a living window into the birth of Tennessee.
          </p>

          {/* Audience tags */}
          <div className={styles['experience-audience']} aria-label="Perfect for">
            <span className={styles['experience-audience-tag']}>Perfect for families</span>
            <span className={styles['experience-audience-divider']} aria-hidden="true">
              •
            </span>
            <span className={styles['experience-audience-tag']}>History enthusiasts</span>
            <span className={styles['experience-audience-divider']} aria-hidden="true">
              •
            </span>
            <span className={styles['experience-audience-tag']}>School groups</span>
          </div>

          {/* Decorative rule */}
          <div className={styles['experience-rule']} aria-hidden="true">
            <span className={styles['experience-rule-line']} />
            <span className={styles['experience-rule-ornament']}>✦</span>
            <span className={styles['experience-rule-line']} />
          </div>

          {/* Visitor Testimonial with Staff Photo */}
          <div className={styles['experience-testimonial-wrapper']}>
            {/* Staff Photo */}
            <figure className={styles['experience-testimonial-photo']}>
              <div className={styles['experience-testimonial-photo-frame']}>
                {/* Placeholder silhouette - replace with actual image */}
                <svg
                  className={styles['experience-testimonial-photo-placeholder']}
                  viewBox="0 0 80 80"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {/* Colonial figure silhouette */}
                  <circle cx="40" cy="28" r="14" opacity="0.3" />
                  <path d="M20 75c0-16 9-25 20-25s20 9 20 25" opacity="0.25" />
                  {/* Tricorn hat suggestion */}
                  <path
                    d="M26 22c0-4 6-10 14-10s14 6 14 10c0 2-4 3-14 3s-14-1-14-3z"
                    opacity="0.2"
                  />
                </svg>
              </div>
              <figcaption className={styles['experience-testimonial-photo-caption']}>
                Meet our 1790 settlers
              </figcaption>
            </figure>

            {/* Testimonial Content */}
            <blockquote className={styles['experience-testimonial']}>
              <div className={styles['experience-testimonial-stars']} aria-label="5 out of 5 stars">
                <span aria-hidden="true">★★★★★</span>
              </div>
              <p className={styles['experience-testimonial-quote']}>
                &ldquo;The kids were mesmerized — it felt like stepping back in time. The costumed
                interpreters really brought 1790 to life.&rdquo;
              </p>
              <footer className={styles['experience-testimonial-attribution']}>
                — Sarah M., Nashville
              </footer>
            </blockquote>
          </div>
        </header>

        {/* Staggered card grid */}
        <div
          className={`${styles['experience-grid']} ${isVisible ? styles['experience-grid--visible'] : ''}`}
        >
          {experiences.map((exp, i) => (
            <article
              key={i}
              className={styles['experience-card']}
              style={{ '--card-index': i } as React.CSSProperties}
            >
              {/* Corner curl effect */}
              <span className={styles['experience-card-curl']} aria-hidden="true" />

              {/* Numeral marker */}
              <span className={styles['experience-numeral']} aria-hidden="true">
                {exp.numeral}
              </span>

              {/* Engraving-style icon */}
              <span className={styles['experience-icon']} aria-hidden="true">
                {exp.icon}
              </span>

              <h3 className={styles['experience-title']}>{exp.title}</h3>
              <p className={styles['experience-desc']}>{exp.description}</p>
            </article>
          ))}
        </div>

        <footer className={styles['experience-footer']}>
          <Link href="/visit" className={styles['experience-cta']}>
            <span className={styles['experience-cta-text']}>{BUTTONS.primary}</span>
            <span className={styles['experience-cta-arrow']} aria-hidden="true">
              →
            </span>
          </Link>
        </footer>
      </div>
    </section>
  )
}
