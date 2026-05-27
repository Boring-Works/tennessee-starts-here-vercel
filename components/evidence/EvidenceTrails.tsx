'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './EvidenceTrails.module.css'
import trailsData from '@/content/evidence-trails.json'

/**
 * A single document in a trail
 */
interface TrailDocument {
  id: string
  title: string
  date: string
  type: 'letter' | 'treaty' | 'proclamation' | 'newspaper' | 'inventory' | 'legal'
  excerpt: string
}

/**
 * A narrative trail through documents
 */
interface Trail {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  documents: TrailDocument[]
  cta: string
}

const TRAILS: Trail[] = trailsData as Trail[]

/**
 * Get CSS class for document type
 */
function getTypeClass(type: TrailDocument['type']): string {
  const classes: Record<TrailDocument['type'], string> = {
    letter: styles.typeLetter,
    treaty: styles.typeTreaty,
    proclamation: styles.typeProclamation,
    newspaper: styles.typeNewspaper,
    inventory: styles.typeInventory,
    legal: styles.typeLegal,
  }
  return classes[type] || ''
}

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

interface EvidenceTrailsProps {
  /** Additional CSS class */
  className?: string
}

/**
 * EvidenceTrails - Narrative navigation through documents
 *
 * Presents documents as thematic "trails" instead of a flat list.
 * Each trail tells a story through 3-5 key documents in narrative order.
 */
export function EvidenceTrails({ className }: EvidenceTrailsProps) {
  const [activeTrail, setActiveTrail] = useState<string>('the-question')

  const currentTrail = TRAILS.find((t) => t.id === activeTrail) || TRAILS[0]

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = TRAILS.findIndex((t) => t.id === activeTrail)
    let newIndex = currentIndex

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        newIndex = currentIndex + 1 >= TRAILS.length ? 0 : currentIndex + 1
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        newIndex = currentIndex - 1 < 0 ? TRAILS.length - 1 : currentIndex - 1
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = TRAILS.length - 1
        break
      default:
        return
    }

    setActiveTrail(TRAILS[newIndex].id)
  }

  return (
    <section className={`${styles.trailsSection} ${className || ''}`}>
      {/* Header */}
      <header className={styles.trailsHeader}>
        <span className={styles.badge}>Evidence Trails</span>
        <h2 className={styles.title}>Follow the Story</h2>
        <p className={styles.subtitle}>
          History isn&apos;t a list. It&apos;s a narrative. Choose a trail and follow the documents
          that tell each chapter of Rocky Mount&apos;s story.
        </p>
      </header>

      {/* Trail Selection Tabs */}
      <nav
        className={styles.trailTabs}
        aria-label="Select a trail"
        onKeyDown={handleKeyDown}
      >
        {TRAILS.map((trail) => (
          <button
            key={trail.id}
            id={`tab-${trail.id}`}
            className={`${styles.trailTab} ${activeTrail === trail.id ? styles.trailTabActive : ''}`}
            onClick={() => setActiveTrail(trail.id)}
            role="tab"
            aria-selected={activeTrail === trail.id}
            aria-controls={`tabpanel-${trail.id}`}
            tabIndex={activeTrail === trail.id ? 0 : -1}
            type="button"
          >
            <span className={styles.tabIcon} aria-hidden="true">
              {trail.icon}
            </span>
            <span className={styles.tabTitle}>{trail.title}</span>
          </button>
        ))}
      </nav>

      {/* Active Trail Content */}
      <div
        className={styles.trailContent}
        role="tabpanel"
        id={`tabpanel-${activeTrail}`}
        aria-labelledby={`tab-${activeTrail}`}
      >
        {/* Trail Description */}
        <div className={styles.trailIntro}>
          <h3 className={styles.trailTitle}>
            <span className={styles.trailIcon} aria-hidden="true">
              {currentTrail.icon}
            </span>
            {currentTrail.title}
          </h3>
          <p className={styles.trailSubtitle}>{currentTrail.subtitle}</p>
          <p className={styles.trailDescription}>{currentTrail.description}</p>
        </div>

        {/* Document Path */}
        <div className={styles.documentPath}>
          {/* Visual Path Line */}
          <div className={styles.pathLine} aria-hidden="true" />

          {/* Document Cards */}
          {currentTrail.documents.map((doc, index) => (
            <article key={doc.id} className={styles.documentCard}>
              {/* Path Node */}
              <div className={`${styles.pathNode} ${getTypeClass(doc.type)}`} aria-hidden="true">
                <span className={styles.nodeNumber}>{index + 1}</span>
              </div>

              {/* Document Content */}
              <Link href={`/evidence/documents/${doc.id}`} className={styles.documentLink}>
                <time className={styles.documentDate} dateTime={doc.date}>
                  {formatDate(doc.date)}
                </time>
                <h4 className={styles.documentTitle}>{doc.title}</h4>
                <p className={styles.documentExcerpt}>{doc.excerpt}</p>
                <span className={styles.documentArrow}>
                  Read document <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </article>
          ))}
        </div>

        {/* Trail CTA */}
        <div className={styles.trailCTA}>
          <Link
            href={`/evidence/documents/${currentTrail.documents[0].id}`}
            className={styles.startButton}
          >
            <span className={styles.startIcon} aria-hidden="true">
              &#9654;
            </span>
            {currentTrail.cta}
          </Link>
          <span className={styles.ctaNote}>
            {currentTrail.documents.length} documents in this trail
          </span>
        </div>
      </div>

      {/* All Trails Overview (Mobile-friendly cards) */}
      <div className={styles.trailCards}>
        <h3 className={styles.cardsHeading}>All Evidence Trails</h3>
        <div className={styles.cardsGrid}>
          {TRAILS.map((trail) => (
            <button
              key={trail.id}
              className={`${styles.trailCard} ${activeTrail === trail.id ? styles.trailCardActive : ''}`}
              onClick={() => setActiveTrail(trail.id)}
              type="button"
            >
              <span className={styles.cardIcon} aria-hidden="true">
                {trail.icon}
              </span>
              <span className={styles.cardTitle}>{trail.title}</span>
              <span className={styles.cardSubtitle}>{trail.subtitle}</span>
              <span className={styles.cardCount}>{trail.documents.length} documents</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
