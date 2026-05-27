/**
 * Date Utilities for Rocky Mount
 *
 * Centralized date formatting to eliminate duplication across pages.
 * All functions handle the T12:00:00 timezone-safe pattern internally.
 */

/**
 * Parse a YYYY-MM-DD date string safely (avoids timezone issues)
 */
export function parseLocalDate(dateStr: string): Date {
  return new Date(`${dateStr}T12:00:00`)
}

/**
 * Format a date for display
 * @param dateStr - YYYY-MM-DD format
 * @param format - 'short' (Fri, Mar 27), 'long' (Friday, March 27), 'compact' (Mar 27)
 */
export function formatDate(
  dateStr: string,
  format: 'short' | 'long' | 'compact' = 'short'
): string {
  const date = parseLocalDate(dateStr)

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  }

  if (format === 'short') {
    options.weekday = 'short'
  } else if (format === 'long') {
    options.weekday = 'long'
    options.month = 'long'
  }

  return date.toLocaleDateString('en-US', options)
}

/**
 * Format a date range (e.g., "Mar 22–24" or "Mar 22 – Apr 2")
 */
export function formatDateRange(start: string, end?: string | null): string {
  if (!end) return formatDate(start)

  const startDate = parseLocalDate(start)
  const endDate = parseLocalDate(end)

  // Same month: "Mar 22–24"
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${endDate.getDate()}`
  }

  // Different months: "Mar 22 – Apr 2"
  return `${formatDate(start, 'compact')} – ${formatDate(end, 'compact')}`
}

/**
 * Get short date parts for calendar display
 */
export function getShortDateParts(dateStr: string): { month: string; day: number } {
  const date = parseLocalDate(dateStr)
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.getDate(),
  }
}

/**
 * Get day of week (0 = Sunday, 6 = Saturday)
 */
export function getDayOfWeek(dateStr: string): number {
  return parseLocalDate(dateStr).getDay()
}

/**
 * Check if a date is on a closed day (Sun, Mon, Tue)
 */
export function isClosedDay(dateStr: string): boolean {
  const day = getDayOfWeek(dateStr)
  return day === 0 || day === 1 || day === 2
}

/**
 * Calculate days between two dates
 */
export function daysBetween(start: string, end: string): number {
  const startDate = parseLocalDate(start)
  const endDate = parseLocalDate(end)
  return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
}

/**
 * Calculate days from today to a date
 */
export function daysFromNow(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = parseLocalDate(dateStr)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}
