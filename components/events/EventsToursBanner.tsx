'use client'

import Link from 'next/link'
import { useHours } from '@/lib/hooks/useHours'
import styles from '@/app/(main)/events/page.module.css'

/**
 * Daily Tours Banner for Events Page
 * Uses dynamic hours from useHours hook instead of hard-coded text
 */
export function EventsToursBanner() {
  const hours = useHours()

  return (
    <aside className={styles['calendar-tours-banner']} aria-labelledby="tours-banner-heading">
      <div className={styles['calendar-tours-banner-inner']}>
        <h2 id="tours-banner-heading" className={styles['calendar-tours-banner-headline']}>
          Can&apos;t make this event?
        </h2>
        <p className={styles['calendar-tours-banner-text']}>
          Guided Living History Tours run {hours.formatted.days}, {hours.tourSchedule.toLowerCase()}{' '}
          from {hours.formatted.time}. Experience the territorial capital any day we&apos;re open.
        </p>
        <Link href="/visit" className={styles['calendar-tours-banner-btn']}>
          Book a Tour <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  )
}
