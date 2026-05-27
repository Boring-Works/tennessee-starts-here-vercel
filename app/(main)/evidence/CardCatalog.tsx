'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

// Collection catalog for navigation
interface Collection {
  id: string
  label: string
  code: string
  category: 'letters' | 'treaty' | 'reference' | 'library'
  count?: number
  isLink?: boolean
  href?: string
}

const COLLECTIONS: Collection[] = [
  {
    id: 'document-library',
    label: 'Document Library',
    code: 'LIBRARY',
    category: 'library',
    isLink: true,
    href: '/evidence/documents',
  },
  {
    id: 'blount-letter',
    label: 'Blount Correspondence',
    code: 'MSS.1790',
    category: 'letters',
    count: 1,
  },
  {
    id: 'washington-question',
    label: 'Washington Papers',
    code: 'MSS.1790',
    category: 'letters',
    count: 1,
  },
  {
    id: 'appointment',
    label: 'Williamson Letters',
    code: 'MSS.1790',
    category: 'letters',
    count: 1,
  },
  {
    id: 'federal-authority',
    label: 'Executive Orders',
    code: 'MSS.1791',
    category: 'letters',
    count: 1,
  },
  {
    id: 'treaty-signers',
    label: 'Treaty Signatories',
    code: 'TREATY',
    category: 'treaty',
    count: 42,
  },
  { id: 'timeline', label: 'Chronology', code: 'CHRON', category: 'reference', count: 12 },
  { id: 'sources', label: 'Repository Index', code: 'REF', category: 'reference', count: 6 },
]

export function CardCatalog() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [userInteracting, setUserInteracting] = useState(false)

  // Filter collections based on search
  const filteredCollections = useMemo(() => {
    if (!searchQuery.trim()) return COLLECTIONS

    const query = searchQuery.toLowerCase()
    return COLLECTIONS.filter(
      (c) => c.label.toLowerCase().includes(query) || c.code.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Derive announcement from active section and search results
  const announcement = useMemo(() => {
    const announcements = []

    if (searchQuery) {
      const matchCount = filteredCollections.length
      announcements.push(`${matchCount} section${matchCount !== 1 ? 's' : ''} found`)
    }

    if (activeSection) {
      const collection = COLLECTIONS.find((c) => c.id === activeSection)
      if (collection) {
        announcements.push(`Now viewing: ${collection.label}`)
      }
    }

    return announcements.join('. ')
  }, [activeSection, searchQuery, filteredCollections.length])

  useEffect(() => {
    // Get all section elements
    const sectionIds = COLLECTIONS.map((c) => c.id)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length > 0 && !userInteracting) {
          // Sort by intersection ratio (most visible first)
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in upper-middle of viewport
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    // Observe all sections
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [userInteracting])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setUserInteracting(true)
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      setActiveSection(id)
      setTimeout(() => setUserInteracting(false), 1000)
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredCollections.length > 0) {
      const firstMatch = filteredCollections.find((c) => !c.isLink)
      if (firstMatch) {
        const element = document.getElementById(firstMatch.id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          setSearchQuery('')
        }
      }
    }
    if (e.key === 'Escape') {
      setSearchQuery('')
    }
  }

  return (
    <nav className={styles.cardCatalog} aria-label="Collection navigation">
      {/* Screen reader announcement for section changes */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      <div className={styles.cardCatalogHeader}>
        <span className={styles.cardCatalogTitle}>Card Catalog</span>
      </div>

      {/* Search Input */}
      <div className={styles.cardCatalogSearch}>
        <input
          type="search"
          placeholder="Find section..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className={styles.cardCatalogSearchInput}
          aria-label="Search Evidence Room sections"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className={styles.cardCatalogSearchClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <ul className={styles.cardCatalogList}>
        {filteredCollections.length === 0 ? (
          <li className={styles.cardCatalogEmpty}>No matching sections</li>
        ) : (
          <>
            {/* Document Library - Featured */}
            {filteredCollections
              .filter(
                (c): c is Collection & { href: string } =>
                  c.category === 'library' && c.isLink === true && typeof c.href === 'string'
              )
              .map((collection) => (
                <li key={collection.id}>
                  <Link
                    href={collection.href}
                    className={`${styles.cardCatalogLink} ${styles.cardCatalogLinkFeatured}`}
                  >
                    <span className={styles.cardCatalogCode}>{collection.code}</span>
                    <span className={styles.cardCatalogLabel}>{collection.label}</span>
                  </Link>
                </li>
              ))}

            {/* Letters Section */}
            {filteredCollections.some((c) => c.category === 'letters') && (
              <>
                <li className={styles.cardCatalogCategory}>
                  <span className={styles.cardCatalogCategoryTitle} id="category-letters">
                    Letters
                  </span>
                </li>
                {filteredCollections
                  .filter((c) => c.category === 'letters')
                  .map((collection) => (
                    <li key={collection.id}>
                      <a
                        href={`#${collection.id}`}
                        onClick={(e) => handleClick(e, collection.id)}
                        className={`${styles.cardCatalogLink} ${
                          activeSection === collection.id ? styles.cardCatalogLinkActive : ''
                        }`}
                        aria-current={activeSection === collection.id ? 'true' : undefined}
                        aria-describedby="category-letters"
                      >
                        <span className={styles.cardCatalogCode}>{collection.code}</span>
                        <span className={styles.cardCatalogLabel}>
                          {collection.label}
                          {collection.count && (
                            <span className={styles.cardCatalogCount}>({collection.count})</span>
                          )}
                        </span>
                      </a>
                    </li>
                  ))}
              </>
            )}

            {/* Treaty Records Section */}
            {filteredCollections.some((c) => c.category === 'treaty') && (
              <>
                <li className={styles.cardCatalogCategory}>
                  <span className={styles.cardCatalogCategoryTitle} id="category-treaty">
                    Treaty Records
                  </span>
                </li>
                {filteredCollections
                  .filter((c) => c.category === 'treaty')
                  .map((collection) => (
                    <li key={collection.id}>
                      <a
                        href={`#${collection.id}`}
                        onClick={(e) => handleClick(e, collection.id)}
                        className={`${styles.cardCatalogLink} ${
                          activeSection === collection.id ? styles.cardCatalogLinkActive : ''
                        }`}
                        aria-current={activeSection === collection.id ? 'true' : undefined}
                        aria-describedby="category-treaty"
                      >
                        <span className={styles.cardCatalogCode}>{collection.code}</span>
                        <span className={styles.cardCatalogLabel}>
                          {collection.label}
                          {collection.count && (
                            <span className={styles.cardCatalogCount}>({collection.count})</span>
                          )}
                        </span>
                      </a>
                    </li>
                  ))}
              </>
            )}

            {/* Reference Section */}
            {filteredCollections.some((c) => c.category === 'reference') && (
              <>
                <li className={styles.cardCatalogCategory}>
                  <span className={styles.cardCatalogCategoryTitle} id="category-reference">
                    Reference
                  </span>
                </li>
                {filteredCollections
                  .filter((c) => c.category === 'reference')
                  .map((collection) => (
                    <li key={collection.id}>
                      <a
                        href={`#${collection.id}`}
                        onClick={(e) => handleClick(e, collection.id)}
                        className={`${styles.cardCatalogLink} ${
                          activeSection === collection.id ? styles.cardCatalogLinkActive : ''
                        }`}
                        aria-current={activeSection === collection.id ? 'true' : undefined}
                        aria-describedby="category-reference"
                      >
                        <span className={styles.cardCatalogCode}>{collection.code}</span>
                        <span className={styles.cardCatalogLabel}>
                          {collection.label}
                          {collection.count && (
                            <span className={styles.cardCatalogCount}>({collection.count})</span>
                          )}
                        </span>
                      </a>
                    </li>
                  ))}
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  )
}
