'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { logger } from '@/lib/logger'
import styles from './error.module.css'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function VisitError({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error('Visit page error:', error)
  }, [error])

  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Something went wrong</h1>
      <p className={styles.errorMessage}>
        We couldn&apos;t load the visit information. Please try again.
      </p>
      <div className={styles.errorActions}>
        <button onClick={reset} className={styles.errorButton}>
          Try Again
        </button>
        <Link href="/events" className={styles.errorButtonSecondary}>
          View Events
        </Link>
      </div>
    </div>
  )
}
