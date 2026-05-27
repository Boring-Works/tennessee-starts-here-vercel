'use client'

import Link from 'next/link'
import { memo } from 'react'
import styles from './welcome.module.css'

interface CTAGroupProps {
  primaryText: string
  primaryHref: string
  archiveText: string
  archiveDescription: string
  archiveHref: string
  secondaryText: string
  secondaryHref: string
}

export const CTAGroup = memo(function CTAGroup({
  primaryText,
  primaryHref,
  archiveText,
  archiveDescription,
  archiveHref,
  secondaryText,
  secondaryHref,
}: CTAGroupProps) {
  return (
    <nav className={styles.ctaGroup} aria-label="Main navigation">
      <Link
        href={primaryHref}
        className={styles.primaryCTA}
        aria-label={`${primaryText} - Enter the main site`}
      >
        {primaryText}
      </Link>

      <Link
        href={archiveHref}
        className={styles.archiveCTA}
        aria-label={`${archiveText} - ${archiveDescription}`}
      >
        <span className={styles.archiveTitle}>{archiveText}</span>
        <span className={styles.archiveDescription}>{archiveDescription}</span>
        <span className={styles.archiveArrow} aria-hidden="true">
          Enter the Archive →
        </span>
      </Link>

      <Link href={secondaryHref} className={styles.secondaryLink} aria-label={secondaryText}>
        {secondaryText} <span aria-hidden="true">→</span>
      </Link>
    </nav>
  )
})
