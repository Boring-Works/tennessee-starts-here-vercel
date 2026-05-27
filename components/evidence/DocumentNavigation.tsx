'use client'

import Link from 'next/link'
import styles from './DocumentNavigation.module.css'

interface DocumentNavigationProps {
  previousDoc?: { slug: string; title: string } | null
  nextDoc?: { slug: string; title: string } | null
  currentIndex: number
  totalCount: number
  collectionName?: string
}

export function DocumentNavigation({
  previousDoc,
  nextDoc,
  currentIndex,
  totalCount,
  collectionName,
}: DocumentNavigationProps) {
  return (
    <nav className={styles.documentNav} aria-label="Document navigation">
      <div className={styles.documentNavPrev}>
        {previousDoc ? (
          <Link href={`/evidence/documents/${previousDoc.slug}`} className={styles.documentNavLink}>
            <span className={styles.documentNavArrow}>←</span>
            <span className={styles.documentNavDirection}>Previous</span>
            <span className={styles.documentNavTitle}>{previousDoc.title}</span>
          </Link>
        ) : (
          <span className={styles.documentNavEmpty} />
        )}
      </div>

      <div className={styles.documentNavPosition}>
        <span className={styles.documentNavCount}>
          {currentIndex} of {totalCount}
        </span>
        {collectionName && <span className={styles.documentNavCollection}>{collectionName}</span>}
      </div>

      <div className={styles.documentNavNext}>
        {nextDoc ? (
          <Link href={`/evidence/documents/${nextDoc.slug}`} className={styles.documentNavLink}>
            <span className={styles.documentNavDirection}>Next</span>
            <span className={styles.documentNavTitle}>{nextDoc.title}</span>
            <span className={styles.documentNavArrow}>→</span>
          </Link>
        ) : (
          <span className={styles.documentNavEmpty} />
        )}
      </div>
    </nav>
  )
}
