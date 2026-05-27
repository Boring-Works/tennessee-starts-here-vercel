/**
 * Drought Monitor utilities
 *
 * The US Drought Monitor provides weekly updates on drought conditions.
 * Data is released every Thursday.
 *
 * Drought levels:
 * - None: No drought
 * - D0: Abnormally Dry
 * - D1: Moderate Drought
 * - D2: Severe Drought
 * - D3: Extreme Drought
 * - D4: Exceptional Drought
 */

import type { DroughtLevel, DroughtData } from './types'

// Sullivan County, TN FIPS code
const SULLIVAN_COUNTY_FIPS = '47163'

// Drought level information
export const DROUGHT_LEVELS: Record<
  DroughtLevel,
  { label: string; color: string; bgColor: string; description: string }
> = {
  None: {
    label: 'No Drought',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    description: 'Normal or wet conditions',
  },
  D0: {
    label: 'Abnormally Dry',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    description: 'Going into drought: short-term dryness',
  },
  D1: {
    label: 'Moderate Drought',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    description: 'Some damage to crops, pastures',
  },
  D2: {
    label: 'Severe Drought',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    description: 'Crop/pasture losses likely, water shortages',
  },
  D3: {
    label: 'Extreme Drought',
    color: 'text-red-500',
    bgColor: 'bg-red-600/20',
    description: 'Major crop/pasture losses, water shortages',
  },
  D4: {
    label: 'Exceptional Drought',
    color: 'text-rose-600',
    bgColor: 'bg-rose-700/20',
    description: 'Exceptional and widespread losses',
  },
}

/**
 * Get drought level info
 */
export function getDroughtLevelInfo(level: DroughtLevel) {
  return DROUGHT_LEVELS[level]
}

/**
 * Determine the worst drought level from area percentages
 */
export function getWorstDroughtLevel(areaPercentages: {
  none: number
  d0: number
  d1: number
  d2: number
  d3: number
  d4: number
}): { level: DroughtLevel; percentArea: number } {
  if (areaPercentages.d4 > 0) return { level: 'D4', percentArea: areaPercentages.d4 }
  if (areaPercentages.d3 > 0) return { level: 'D3', percentArea: areaPercentages.d3 }
  if (areaPercentages.d2 > 0) return { level: 'D2', percentArea: areaPercentages.d2 }
  if (areaPercentages.d1 > 0) return { level: 'D1', percentArea: areaPercentages.d1 }
  if (areaPercentages.d0 > 0) return { level: 'D0', percentArea: areaPercentages.d0 }
  return { level: 'None', percentArea: 100 - areaPercentages.none }
}

/**
 * Get simulated drought data for Sullivan County
 * In production, this would fetch from the US Drought Monitor API
 *
 * Note: The USDM API requires specific formatting and may have CORS restrictions.
 * For a production app, you'd proxy this through your own API route.
 */
export function getSimulatedDroughtData(): DroughtData {
  // Simulate based on time of year
  // Tennessee typically sees drought conditions in late summer/early fall
  const now = new Date()
  const month = now.getMonth() + 1

  // Late summer/early fall tends to be drier
  if (month >= 7 && month <= 9) {
    return {
      level: 'D0',
      label: 'Abnormally Dry',
      percentArea: 15,
      lastUpdated: getLastThursday().toISOString(),
    }
  }

  // Winter/spring tends to be wetter
  return {
    level: 'None',
    label: 'No Drought',
    percentArea: 0,
    lastUpdated: getLastThursday().toISOString(),
  }
}

/**
 * Get the date of the last Thursday (when USDM updates)
 */
function getLastThursday(): Date {
  const now = new Date()
  const day = now.getDay()
  const diff = day >= 4 ? day - 4 : day + 3
  const lastThursday = new Date(now)
  lastThursday.setDate(now.getDate() - diff)
  lastThursday.setHours(8, 0, 0, 0) // USDM releases at 8am ET
  return lastThursday
}

export { SULLIVAN_COUNTY_FIPS }
