/**
 * Next Weather Change Detection
 *
 * Analyzes hourly forecast data to detect the next significant weather change
 * and provide actionable alerts for users.
 *
 * NOTE: This module uses Date objects for time calculations. When called
 * during SSR, the server time will be used. The calling component should
 * handle hydration by deferring the calculation to client-side only.
 */

import type { HourlyForecast } from './types'

export type ChangeType =
  | 'freeze'
  | 'thaw'
  | 'precip_start'
  | 'precip_end'
  | 'wind_increase'
  | 'wind_decrease'
  | 'stable'

export interface NextChange {
  type: ChangeType
  hoursUntil: number
  timeString: string // "3:00 PM"
  headline: string // "Freeze warning in 4 hours"
  subtext: string // "Protect tender plants"
  severity: 'critical' | 'warning' | 'info'
  icon: string // emoji
}

// Thresholds
const FREEZE_TEMP = 32
const PRECIP_THRESHOLD = 20 // % chance
const WIND_GUST_THRESHOLD = 25 // mph

/**
 * Detect the next significant weather change in the next 24 hours.
 *
 * @param hourly - Hourly forecast data
 * @param currentTemp - Current temperature
 * @param referenceTime - Optional reference time (defaults to now). Pass a stable time for SSR.
 */
export function detectNextChange(
  hourly: HourlyForecast,
  currentTemp: number,
  referenceTime?: Date
): NextChange {
  const now = referenceTime ?? new Date()

  // Look ahead 24 hours
  const lookAheadHours = 24

  // Find current index in hourly data
  let startIndex = 0
  for (let i = 0; i < hourly.time.length; i++) {
    const hourDate = new Date(hourly.time[i])
    if (hourDate >= now) {
      startIndex = i
      break
    }
  }

  const endIndex = Math.min(startIndex + lookAheadHours, hourly.time.length)

  // Check for freeze/thaw crossing
  const isCurrentlyAboveFreezing = currentTemp > FREEZE_TEMP

  for (let i = startIndex; i < endIndex; i++) {
    const temp = hourly.temperature[i]
    const precip = hourly.precipitationProbability[i]
    const time = new Date(hourly.time[i])
    const hoursUntil = Math.round((time.getTime() - now.getTime()) / (1000 * 60 * 60))
    const timeString = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

    // Check for freeze crossing
    if (isCurrentlyAboveFreezing && temp <= FREEZE_TEMP) {
      return {
        type: 'freeze',
        hoursUntil,
        timeString,
        headline: hoursUntil <= 1 ? 'Freeze imminent' : `Freeze in ${hoursUntil} hours`,
        subtext: 'Protect tender plants & pipes',
        severity: hoursUntil <= 2 ? 'critical' : 'warning',
        icon: '🥶',
      }
    }

    // Check for thaw
    if (!isCurrentlyAboveFreezing && temp > FREEZE_TEMP) {
      return {
        type: 'thaw',
        hoursUntil,
        timeString,
        headline: `Thaw by ${timeString}`,
        subtext: 'Temperatures rising above freezing',
        severity: 'info',
        icon: '🌡️',
      }
    }

    // Check for precipitation start (if currently dry)
    const currentPrecip = hourly.precipitationProbability[startIndex] || 0
    if (currentPrecip < PRECIP_THRESHOLD && precip >= PRECIP_THRESHOLD) {
      return {
        type: 'precip_start',
        hoursUntil,
        timeString,
        headline: hoursUntil <= 1 ? 'Rain arriving soon' : `Rain likely by ${timeString}`,
        subtext: `${precip}% chance of precipitation`,
        severity: hoursUntil <= 2 ? 'warning' : 'info',
        icon: '🌧️',
      }
    }
  }

  // Check wind gusts in next few hours
  for (let i = startIndex; i < Math.min(startIndex + 6, endIndex); i++) {
    // If windSpeed available in hourly data
    const windSpeed = hourly.windSpeed?.[i]
    if (windSpeed && windSpeed > WIND_GUST_THRESHOLD) {
      const time = new Date(hourly.time[i])
      const hoursUntil = Math.round((time.getTime() - now.getTime()) / (1000 * 60 * 60))
      const timeString = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

      return {
        type: 'wind_increase',
        hoursUntil,
        timeString,
        headline: `Gusty winds by ${timeString}`,
        subtext: `Winds to ${Math.round(windSpeed)} mph`,
        severity: 'info',
        icon: '💨',
      }
    }
  }

  // No significant changes detected
  return {
    type: 'stable',
    hoursUntil: 24,
    timeString: '',
    headline: 'Stable conditions',
    subtext: 'No major changes expected in 24 hours',
    severity: 'info',
    icon: '✓',
  }
}

/**
 * Get display properties for a NextChange object
 */
export function getNextChangeDisplay(change: NextChange): {
  primary: string
  secondary: string
  color: string
} {
  const colorMap = {
    critical: 'text-red-400',
    warning: 'text-amber-400',
    info: 'text-almanac-parchment/80',
  }

  return {
    primary: `${change.icon} ${change.headline}`,
    secondary: change.subtext,
    color: colorMap[change.severity],
  }
}
