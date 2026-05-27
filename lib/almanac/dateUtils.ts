/**
 * Date Utilities for Almanac
 *
 * Centralized date handling to account for past_days offset in Open-Meteo API.
 * When past_days=2 is set, arrays include 2 days of historical data:
 *   - Index 0 = 2 days ago
 *   - Index 1 = yesterday
 *   - Index 2 = TODAY
 *   - Index 3+ = future days
 *
 * IMPORTANT: All API data is in America/New_York timezone. Use getEasternHour()
 * instead of new Date().getHours() to avoid timezone bugs for non-ET users.
 */

/**
 * Parse date string to get year, month, day components
 * Handles both "YYYY-MM-DD" and "YYYY-MM-DDTHH:MM" formats
 */
export function getDateComponents(dateString: string): {
  year: number
  month: number
  day: number
} {
  const datePart = dateString.split('T')[0]
  const [year, month, day] = datePart.split('-').map(Number)
  return { year, month, day }
}

/**
 * Get today's date as YYYY-MM-DD string in Eastern Time.
 * CRITICAL: Use getEasternDateString() instead - this is kept for backwards compatibility.
 * @deprecated Use getEasternDateString() for API data matching
 */
export function getTodayString(): string {
  return getEasternDateString()
}

/**
 * Check if a date string represents today (in Eastern Time)
 */
export function isDateToday(dateString: string): boolean {
  const { year, month, day } = getDateComponents(dateString)
  const now = new Date()
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
  return (
    year === eastern.getFullYear() && month === eastern.getMonth() + 1 && day === eastern.getDate()
  )
}

/**
 * Check if a date string represents tomorrow (in Eastern Time)
 */
export function isDateTomorrow(dateString: string): boolean {
  const { year, month, day } = getDateComponents(dateString)
  const now = new Date()
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
  eastern.setDate(eastern.getDate() + 1)
  return (
    year === eastern.getFullYear() && month === eastern.getMonth() + 1 && day === eastern.getDate()
  )
}

/**
 * Get weekday name from date string
 */
export function getWeekdayName(dateString: string, format: 'short' | 'long' = 'short'): string {
  const { year, month, day } = getDateComponents(dateString)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', { weekday: format })
}

/**
 * Find index of today in a daily time array.
 * With past_days=2, today is typically at index 2.
 *
 * @param dailyTimes Array of date strings from API
 * @returns Index of today, or first future date if today not found
 */
export function findTodayDailyIndex(dailyTimes: string[]): number {
  // Bounds check: empty array
  if (!dailyTimes || dailyTimes.length === 0) {
    return 0
  }

  // First pass: look for exact match
  for (let i = 0; i < dailyTimes.length; i++) {
    if (isDateToday(dailyTimes[i])) {
      return i
    }
  }

  // Fallback: find first date >= today (handles edge cases around midnight)
  // Use Eastern Time since API data is in ET
  const now = new Date()
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
  const todayNum =
    eastern.getFullYear() * 10000 + (eastern.getMonth() + 1) * 100 + eastern.getDate()

  for (let i = 0; i < dailyTimes.length; i++) {
    const { year, month, day } = getDateComponents(dailyTimes[i])
    const dateNum = year * 10000 + month * 100 + day
    if (dateNum >= todayNum) {
      return i
    }
  }

  // Last resort: assume past_days=2, with bounds check
  return Math.min(2, Math.max(0, dailyTimes.length - 1))
}

/**
 * Find the starting index for today's hours in the hourly time array.
 * With past_days=2, today starts at index 48 (2 days × 24 hours).
 *
 * @param hourlyTimes Array of datetime strings from API
 * @returns Starting index of today's hours
 */
export function findTodayHourlyIndex(hourlyTimes: string[]): number {
  // Bounds check: empty or too-short array
  if (!hourlyTimes || hourlyTimes.length === 0) {
    return 0
  }

  const todayStr = getTodayString()

  for (let i = 0; i < hourlyTimes.length; i++) {
    if (hourlyTimes[i].startsWith(todayStr)) {
      return i
    }
  }

  // Fallback: assume past_days=2 means 48 hours offset, with bounds check
  const fallbackIndex = Math.max(0, hourlyTimes.length - 24)
  return Math.min(48, fallbackIndex)
}

/**
 * Get a human-readable day name for display
 */
export function getDayDisplayName(dateString: string, format: 'short' | 'long' = 'short'): string {
  if (isDateToday(dateString)) {
    return 'Today'
  }
  if (isDateTomorrow(dateString)) {
    return format === 'short' ? 'Tmrw' : 'Tomorrow'
  }
  return getWeekdayName(dateString, format)
}

/**
 * Get the current hour in Eastern Time (America/New_York).
 *
 * CRITICAL: Open-Meteo API returns hourly data indexed by Eastern Time.
 * Using browser's local time (new Date().getHours()) causes wrong data
 * to be displayed for users not in the Eastern timezone.
 *
 * Example: At 2pm PST (5pm ET), getHours() returns 14, but the API's
 * hour 14 is 2pm ET, not the current hour. This function returns 17.
 *
 * @returns Hour of day in Eastern Time (0-23)
 */
export function getEasternHour(): number {
  const now = new Date()
  // Format the current time in Eastern timezone and extract the hour
  const easternTime = now.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    hour12: false,
  })
  // Handle "24" edge case (midnight) - toLocaleString can return "24" for midnight
  const hour = parseInt(easternTime, 10)
  return hour === 24 ? 0 : hour
}

/**
 * Get today's date string in Eastern Time (YYYY-MM-DD format).
 * Use this instead of getTodayString() when matching API data.
 */
export function getEasternDateString(): string {
  const now = new Date()
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
  return `${eastern.getFullYear()}-${String(eastern.getMonth() + 1).padStart(2, '0')}-${String(eastern.getDate()).padStart(2, '0')}`
}
