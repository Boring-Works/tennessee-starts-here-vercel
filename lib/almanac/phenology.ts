/**
 * Phenology utilities based on USA National Phenology Network data
 *
 * The Spring Index models predict:
 * - First Leaf: When leaves first appear on indicator species
 * - First Bloom: When flowers first open on indicator species
 *
 * Sullivan County, TN (Zone 7a) typical dates:
 * - First Leaf: ~March 20 (day 79)
 * - First Bloom: ~April 5 (day 95)
 *
 * These are 30-year averages from USA-NPN data.
 */

import type { SpringStatus, PhenologyData } from './types'

// Sullivan County typical phenology dates (day of year)
const SULLIVAN_COUNTY_PHENOLOGY = {
  firstLeaf: {
    avgDayOfYear: 79, // ~March 20
    stdDev: 10, // ±10 days typical variance
  },
  firstBloom: {
    avgDayOfYear: 95, // ~April 5
    stdDev: 12,
  },
}

/**
 * Get the current day of year (1-365)
 */
function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

/**
 * Calculate days until a target day of year
 */
function daysUntilDayOfYear(targetDayOfYear: number, fromDate: Date = new Date()): number {
  const currentDayOfYear = getDayOfYear(fromDate)

  if (targetDayOfYear > currentDayOfYear) {
    return targetDayOfYear - currentDayOfYear
  }

  // If the target has passed this year, return negative (days since)
  return targetDayOfYear - currentDayOfYear
}

/**
 * Determine spring status based on current date and phenology
 */
function getSpringStatus(dayOfYear: number): SpringStatus {
  const { firstLeaf, firstBloom } = SULLIVAN_COUNTY_PHENOLOGY

  // Winter: before leaf-out is approaching (more than 30 days out)
  if (dayOfYear < firstLeaf.avgDayOfYear - 30) {
    return 'dormant'
  }

  // Approaching: within 30 days of first leaf
  if (dayOfYear < firstLeaf.avgDayOfYear) {
    return 'approaching'
  }

  // Spring: between first leaf and well into bloom
  if (dayOfYear < firstBloom.avgDayOfYear + 30) {
    return 'spring'
  }

  // Summer: after spring phenology events
  return 'summer'
}

/**
 * Determine if spring is early, late, or on schedule
 * This would ideally compare current GDD accumulation to historical averages
 * For now, we use a simplified model based on the year
 */
function getSpringAnomaly(): { anomaly: 'early' | 'on-schedule' | 'late'; anomalyDays: number } {
  // In a real implementation, this would compare:
  // - Current accumulated GDD vs historical GDD for this date
  // - Current spring index predictions vs 30-year average

  // For simulation, we'll assume on-schedule most of the time
  // with slight variations based on the year
  const year = new Date().getFullYear()
  const yearOffset = (year % 3) - 1 // -1, 0, or 1

  if (yearOffset < 0) {
    return { anomaly: 'early', anomalyDays: Math.abs(yearOffset) * 5 }
  } else if (yearOffset > 0) {
    return { anomaly: 'late', anomalyDays: yearOffset * 5 }
  }

  return { anomaly: 'on-schedule', anomalyDays: 0 }
}

/**
 * Get phenology data for current conditions
 */
export function getPhenologyData(): PhenologyData {
  const now = new Date()
  const dayOfYear = getDayOfYear(now)
  const { firstLeaf, firstBloom } = SULLIVAN_COUNTY_PHENOLOGY

  const springStatus = getSpringStatus(dayOfYear)
  const { anomaly, anomalyDays } = getSpringAnomaly()

  // Calculate days to events (null if passed)
  const daysToFirstLeaf = daysUntilDayOfYear(firstLeaf.avgDayOfYear)
  const daysToFirstBloom = daysUntilDayOfYear(firstBloom.avgDayOfYear)

  return {
    springStatus,
    daysToFirstLeaf: daysToFirstLeaf > 0 ? daysToFirstLeaf : null,
    daysToFirstBloom: daysToFirstBloom > 0 ? daysToFirstBloom : null,
    anomaly,
    anomalyDays,
  }
}

/**
 * Get status info for spring status
 */
export function getSpringStatusInfo(status: SpringStatus): {
  label: string
  color: string
  description: string
} {
  switch (status) {
    case 'dormant':
      return {
        label: 'Dormant',
        color: 'text-blue-400',
        description: 'Winter dormancy. Spring is still distant.',
      }
    case 'approaching':
      return {
        label: 'Approaching',
        color: 'text-emerald-400',
        description: 'Spring is near. Watch for early growth.',
      }
    case 'spring':
      return {
        label: 'Spring',
        color: 'text-green-400',
        description: 'Active growing season. Peak phenology.',
      }
    case 'summer':
      return {
        label: 'Summer',
        color: 'text-amber-400',
        description: 'Full foliage. Spring phenology complete.',
      }
  }
}

export { SULLIVAN_COUNTY_PHENOLOGY, getDayOfYear }
