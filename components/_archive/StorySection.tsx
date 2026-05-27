'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from '@/app/(main)/home/page.module.css'

// Milestone icons - engraving style
const CabinIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 16l12-10 12 10" />
    <path d="M6 16v12h20V16" />
    <path d="M12 28v-8h8v8" />
    <path d="M16 20v2" strokeWidth="1" />
    <path d="M22 14v-4h3v6" />
  </svg>
)

const CapitolIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 28h24" />
    <path d="M6 28V18M10 28V18M14 28V18M18 28V18M22 28V18M26 28V18" />
    <path d="M4 18h24" />
    <path d="M6 18l10-8 10 8" />
    <circle cx="16" cy="12" r="2" strokeWidth="1" />
  </svg>
)

const WagonIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 20h20l2-8H8l-4 8z" />
    <circle cx="8" cy="24" r="3" />
    <circle cx="22" cy="24" r="3" />
    <path d="M11 24h8" />
    <path d="M26 12c2 0 4 2 4 4v4h-4" strokeWidth="1" />
  </svg>
)

const StarFlagIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 4v24" />
    <path d="M6 4h18l-4 6 4 6H6" />
    <path
      d="M14 10l1.5-3 1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z"
      strokeWidth="1"
      fill="currentColor"
      opacity="0.3"
    />
  </svg>
)

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, isVisible: boolean) {
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

const milestones = [
  {
    year: '1770',
    label: 'Settlement',
    text: 'William Cobb stakes his claim on the Tennessee frontier.',
    icon: <CabinIcon />,
  },
  {
    year: '1790',
    label: 'The First Capital',
    text: "Rocky Mount becomes the seat of the Southwest Territory. Tennessee's government begins here.",
    quote: 'I have arrived at this place.',
    icon: <CapitolIcon />,
    isHero: true,
  },
  {
    year: '1792',
    label: 'Transition',
    text: "The capital moves to Knoxville; Rocky Mount's legacy endures.",
    icon: <WagonIcon />,
  },
  {
    year: '1796',
    label: 'Statehood',
    text: 'Tennessee joins the Union as the 16th state.',
    icon: <StarFlagIcon />,
  },
]

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleMilestones, setVisibleMilestones] = useState<number[]>([])
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    const timeouts = timeoutRefs.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Stagger milestone reveals
          milestones.forEach((_, index) => {
            const timeout = setTimeout(
              () => {
                setVisibleMilestones((prev) => [...prev, index])
              },
              300 + index * 250
            )
            timeouts.push(timeout)
          })
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
      timeouts.forEach(clearTimeout)
    }
  }, [])

  const yearCount = useCountUp(26, 2000, isVisible)

  return (
    <section ref={sectionRef} className={styles['story-section']} aria-labelledby="story-heading">
      <div className={styles['story-container']}>
        {/* Decorative chapter heading */}
        <header className={styles['story-header']}>
          <div className={styles['story-chapter']} aria-hidden="true">
            <span className={styles['story-chapter-rule']} />
            <span className={styles['story-chapter-number']}>Chapter I</span>
            <span className={styles['story-chapter-rule']} />
          </div>

          <p className={styles['story-eyebrow']}>The Story</p>
          <h2 id="story-heading" className={styles['story-headline']}>
            The Road to Tennessee
          </h2>

          {/* Animated year counter */}
          <div
            className={`${styles['story-counter']} ${isVisible ? styles['story-counter--visible'] : ''}`}
          >
            <span className={styles['story-counter-number']}>{yearCount}</span>
            <span className={styles['story-counter-unit']}>Years</span>
          </div>
          <p className={styles['story-counter-caption']}>
            From frontier settlement to American statehood
          </p>

          <div className={styles['story-chapter-close']} aria-hidden="true">
            <span className={styles['story-chapter-ornament']}>✦</span>
          </div>
        </header>

        {/* Map trail visualization */}
        <div className={styles['story-trail']} aria-hidden="true">
          <div className={styles['story-trail-path']}>
            <svg viewBox="0 0 400 60" preserveAspectRatio="none">
              {/* Winding path */}
              <path
                d="M0 30 Q50 10, 100 25 T200 20 T300 35 T400 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 4"
                className={styles['story-trail-line']}
              />
              {/* Mile markers */}
              <circle cx="0" cy="30" r="4" fill="currentColor" opacity="0.4" />
              <circle
                cx="308"
                cy="32"
                r="6"
                fill="currentColor"
                className={styles['story-trail-marker']}
              />
              <circle cx="400" cy="25" r="4" fill="currentColor" opacity="0.4" />
            </svg>
          </div>
          <div className={styles['story-trail-labels']}>
            <span
              className={`${styles['story-trail-label']} ${styles['story-trail-label--start']}`}
            >
              Philadelphia
              <br />
              <small>1776</small>
            </span>
            <span className={`${styles['story-trail-label']} ${styles['story-trail-label--mid']}`}>
              Rocky Mount
              <br />
              <small>1790</small>
            </span>
            <span className={`${styles['story-trail-label']} ${styles['story-trail-label--end']}`}>
              Statehood
              <br />
              <small>1796</small>
            </span>
          </div>
        </div>

        {/* Vertical timeline with connecting line */}
        <div className={styles['story-timeline-wrapper']}>
          {/* The connecting line */}
          <div className={styles['story-timeline-line']} aria-hidden="true">
            <span
              className={`${styles['story-timeline-line-fill']} ${isVisible ? styles['story-timeline-line-fill--visible'] : ''}`}
            />
          </div>

          <ol className={styles['story-timeline']} aria-label="Rocky Mount timeline">
            {milestones.map((milestone, index) => (
              <li
                key={milestone.year}
                className={`${styles['story-milestone']} ${milestone.isHero ? styles['story-milestone-hero'] : ''} ${visibleMilestones.includes(index) ? styles['story-milestone--visible'] : ''}`}
              >
                {/* Timeline node */}
                <span
                  className={`${styles['story-milestone-node']} ${milestone.isHero ? styles['story-milestone-node--hero'] : ''}`}
                  aria-hidden="true"
                />

                {/* Icon */}
                <span className={styles['story-milestone-icon']} aria-hidden="true">
                  {milestone.icon}
                </span>

                {/* Content */}
                <div className={styles['story-milestone-content']}>
                  <span className={styles['story-milestone-year']}>{milestone.year}</span>
                  <span className={styles['story-milestone-label']}>{milestone.label}</span>

                  {milestone.quote && (
                    <blockquote className={styles['story-milestone-quote']}>
                      &ldquo;{milestone.quote}&rdquo;
                    </blockquote>
                  )}

                  <p className={styles['story-milestone-text']}>{milestone.text}</p>
                </div>

                {/* Wax seal for hero milestone */}
                {milestone.isHero && (
                  <div className={styles['story-milestone-seal']} aria-hidden="true">
                    <span className={styles['story-milestone-seal-inner']}>SW</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Footer */}
        <footer
          className={`${styles['story-footer']} ${isVisible ? styles['story-footer--visible'] : ''}`}
        >
          <p className={styles['story-footer-text']}>
            <strong>230 years later</strong>, we remember where it started.
          </p>
          <Link href="/visit" className={styles['story-footer-cta']}>
            Visit Rocky Mount
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </section>
  )
}
