'use client'

import Link from 'next/link'
import styles from './EntryRoom.module.css'

interface Collection {
  id: string
  icon: string
  name: string
  count: number
  unit: string
  href: string
  featured?: boolean
}

interface EntryRoomProps {
  /** Total document count - computed from actual data when available */
  totalDocuments?: number
  /** Total collection count */
  totalCollections?: number
}

const COLLECTIONS: Collection[] = [
  {
    id: 'blount-papers',
    icon: '📜',
    name: 'The Blount Papers',
    count: 9,
    unit: 'documents',
    href: '/evidence/collections/blount-papers',
  },
  {
    id: 'treaties',
    icon: '🖋️',
    name: 'Treaties & Proclamations',
    count: 4,
    unit: 'documents',
    href: '/evidence/collections/treaties',
  },
  {
    id: 'knoxville-gazette',
    icon: '📰',
    name: 'The Knoxville Gazette',
    count: 14,
    unit: 'issues',
    href: '/evidence/collections/knoxville-gazette',
  },
  {
    id: 'federal-correspondence',
    icon: '✉️',
    name: 'Federal Correspondence',
    count: 8,
    unit: 'documents',
    href: '/evidence/collections/federal-correspondence',
  },
  {
    id: 'cherokee-signatories',
    icon: '🪶',
    name: 'Cherokee Signatories',
    count: 42,
    unit: 'people',
    href: '/evidence/people',
    featured: true,
  },
  {
    id: 'timeline',
    icon: '📅',
    name: 'Timeline',
    count: 40,
    unit: 'events',
    href: '/evidence/timeline',
  },
]

export function EntryRoom({ totalDocuments = 97, totalCollections = 6 }: EntryRoomProps) {
  const handleCollectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a hash link, handle smooth scroll
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.getElementById(href.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    // Otherwise let the Link component handle navigation
  }

  return (
    <section className={styles.entryRoom}>
      <div className={styles.entryRoomInner}>
        <p className={styles.welcome}>{totalCollections} Collections · {totalDocuments} Documents</p>

        <div className={styles.collectionGrid}>
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              onClick={(e) => handleCollectionClick(e, collection.href)}
              className={`${styles.collectionCard} ${collection.featured ? styles.collectionCardFeatured : ''}`}
            >
              <span className={styles.collectionIcon}>{collection.icon}</span>
              <span className={styles.collectionName}>{collection.name}</span>
              <span className={styles.collectionCount}>
                {collection.count} {collection.unit}
              </span>
            </Link>
          ))}
        </div>

        <Link href="/evidence/documents" className={styles.libraryLink}>
          <span className={styles.libraryIcon}>📖</span>
          <span className={styles.libraryText}>
            <strong>Full Document Library</strong>
            <span>Read complete transcriptions with citations</span>
          </span>
          <span className={styles.libraryArrow}>→</span>
        </Link>

      </div>
    </section>
  )
}
