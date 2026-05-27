'use client'

import { memo, useSyncExternalStore, useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from './welcome.module.css'

interface PeakData {
  label: string
  date: string
  targetDate: string // ISO date string
}

interface DualPeaksProps {
  peaks: readonly [PeakData, PeakData]
}

function calculateDaysRemaining(targetDate: string): number {
  const target = new Date(`${targetDate}T00:00:00`)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

// Empty subscribe - we don't need to listen for changes
const subscribe = () => () => {}

// Use useSyncExternalStore to safely handle hydration
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true, // client snapshot
    () => false // server snapshot
  )
}

// Memoized animation config to prevent recreation on each render
const motionAnimationConfig = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.15, 1] },
  transition: { duration: 0.4, ease: 'easeInOut' as const },
}

export const DualPeaks = memo(function DualPeaks({ peaks }: DualPeaksProps) {
  const isClient = useIsClient()

  // Memoize days calculations
  const daysData = useMemo(() => {
    if (!isClient) return [null, null] as const
    return peaks.map((peak) => calculateDaysRemaining(peak.targetDate)) as [number, number]
  }, [isClient, peaks])

  return (
    <section className={styles.peaksContainer} aria-label="Commemorative countdown timers">
      {peaks.map((peak, index) => {
        const days = daysData[index]
        return (
          <article key={peak.targetDate} className={styles.peakBadge}>
            <span className={styles.peakLabel}>{peak.label}</span>
            <motion.span
              className={styles.peakDays}
              key={days}
              {...motionAnimationConfig}
              role="timer"
              aria-live="polite"
              aria-label={`${days !== null ? days : 'Loading'} days remaining until ${peak.label}`}
            >
              {days !== null ? days : '—'}
              <span aria-hidden="true"> days</span>
            </motion.span>
            <span className={styles.peakDate}>{peak.date}</span>
          </article>
        )
      })}
    </section>
  )
})
