'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './EvidenceNav.module.css'

const EVIDENCE_NAV_ITEMS = [
  { label: 'Full Document Library', href: '/evidence/documents', primary: true },
  { label: 'Collections', href: '/evidence/collections' },
  { label: 'People', href: '/evidence/people' },
  { label: 'Timeline', href: '/evidence/timeline' },
  { label: 'Overview', href: '/evidence' },
]

interface EvidenceNavProps {
  /** Set to true when nav is at top of page (needs padding for fixed header) */
  isPageTop?: boolean
}

export function EvidenceNav({ isPageTop = false }: EvidenceNavProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/evidence') {
      return pathname === '/evidence'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`${styles.evidenceNav} ${isPageTop ? styles['evidenceNav--pageTop'] : ''}`}
      aria-label="Evidence Room navigation"
    >
      <div className={styles.evidenceNavHeader}>
        <span className={styles.evidenceNavIcon}>📜</span>
        <span className={styles.evidenceNavTitle}>EVIDENCE ROOM</span>
      </div>
      <div className={styles.evidenceNavDivider} aria-hidden="true" />
      <ul className={styles.evidenceNavList}>
        {EVIDENCE_NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${styles.evidenceNavLink} ${
                isActive(item.href) ? styles['evidenceNavLink--active'] : ''
              } ${'primary' in item && item.primary ? styles['evidenceNavLink--primary'] : ''}`}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
