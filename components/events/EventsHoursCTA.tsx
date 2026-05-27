'use client'

import Link from 'next/link'
import { useHours } from '@/lib/hooks/useHours'
import styles from '@/app/(main)/events/page.module.css'

interface SiteInfo {
  admission: {
    adults: { price: number }
    seniors: { price: number }
    children: { price: number }
  }
}

interface EventsHoursCTAProps {
  siteInfo: SiteInfo
}

/**
 * Visit CTA section with dynamic hours from useHours hook
 * Replaces hard-coded "Open Wed–Sat 10am–5pm · Last tour 4pm"
 */
export function EventsHoursCTA({ siteInfo }: EventsHoursCTAProps) {
  const hours = useHours()

  return (
    <section className={styles['calendar-cta']} aria-labelledby="calendar-cta-heading">
      <div className={styles['calendar-cta-inner']}>
        <div className={styles['calendar-cta-content']}>
          <p className={styles['calendar-cta-eyebrow']}>Experience History</p>
          <h2 id="calendar-cta-heading" className={styles['calendar-cta-headline']}>
            See Where Tennessee Began
          </h2>
          <p className={styles['calendar-cta-desc']}>
            Walk the same grounds as William Blount and Andrew Jackson. Living history tours daily.
          </p>
        </div>

        <div className={styles['calendar-cta-action']}>
          <Link href="/visit" className={styles['calendar-cta-btn']}>
            Plan Your Visit
          </Link>
          <p className={styles['calendar-cta-hours']}>
            {hours.formatted.short} · Last tour {hours.lastTour}
          </p>
          {/* Regular Site Admission */}
          <div className={styles['calendar-cta-admission']}>
            <p className={styles['calendar-cta-admission-label']}>
              Regular Site Admission (Non-Event Days)
            </p>
            <p className={styles['calendar-cta-admission-prices']}>
              Adults ${siteInfo.admission.adults.price} · Seniors $
              {siteInfo.admission.seniors.price} · Children ${siteInfo.admission.children.price} ·
              Under 6 Free
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
