'use client'

import type React from 'react'
import { useSyncExternalStore, useCallback } from 'react'
import styles from './page.module.css'

// Founding Member deadline - March 4, 2026
// Using ISO string to ensure consistent parsing across environments
const FOUNDING_MEMBER_DEADLINE_MS = new Date('2026-03-04T23:59:59-05:00').getTime()

// Subscribe to nothing (we just need the snapshot pattern for hydration safety)
const subscribe = (): (() => void) => () => {}

// Get current state on client - compare timestamps for reliability
const getSnapshot = (): boolean => Date.now() < FOUNDING_MEMBER_DEADLINE_MS

// Server always returns null to avoid hydration mismatch
const getServerSnapshot = (): null => null

interface FoundingBannerProps {
  neonCrmUrl: string
}

export function FoundingBanner({ neonCrmUrl }: FoundingBannerProps): React.ReactElement | null {
  // Use useSyncExternalStore to safely check date on client only
  const showBanner = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Memoize the click handler for performance
  const handleLinkClick = useCallback(() => {
    // Analytics tracking could go here in the future
  }, [])

  // Don't render anything during SSR (null) or after deadline (false)
  if (showBanner === null || !showBanner) {
    return null
  }

  return (
    <section className={styles['founding-banner']} aria-labelledby="founding-banner-title">
      <div className={styles['founding-banner-inner']}>
        <div className={styles['founding-banner-content']}>
          <span className={styles['founding-banner-badge']} aria-label="Limited time opportunity">
            Limited Opportunity
          </span>
          <h2 id="founding-banner-title" className={styles['founding-banner-headline']}>
            Founding Member Registry
          </h2>
          <p className={styles['founding-banner-desc']}>
            Join before March 4, 2026 and be recognized as a Founding Member in America&apos;s 250th
            year. Your name will be permanently displayed at Rocky Mount. This opportunity closes
            forever on March 4 and will never return.
          </p>
          <a
            href={neonCrmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['founding-banner-link']}
            onClick={handleLinkClick}
            aria-label="Become a Founding Member (opens in new tab)"
          >
            Become a Founding Member &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
