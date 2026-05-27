/**
 * Rocky Mount Site Hours Utility
 *
 * Pattern-based calculation for seasonal hours, closures, and special events.
 * Designed to work year-round without hardcoded dates.
 *
 * Season: First week of March through December 20th (every year)
 * Regular Hours: Wed-Sat, 10am-5pm
 * Closures: Thanksgiving (Thursday + Friday only)
 * Special Events: Haunting (evening), Candlelight Christmas (evening)
 */

export interface SpecialHours {
  opens: number // 24-hour format (14 = 2pm)
  closes: number
  reason: string
  eventTitle?: string
  replacesRegularHours?: boolean
  dayClosedMessage?: string
}

export interface SiteStatus {
  isOpen: boolean
  reason: string
  message: string
  nextOpen?: Date
  specialHours?: SpecialHours
}

export interface HoursConfig {
  regularHours: {
    open: number
    close: number
  }
  openDays: number[] // 0=Sun, 1=Mon, ... 6=Sat (we use [3,4,5,6] for Wed-Sat)
  seasonStart: {
    month: number
    weekOfMonth: number
    dayOfWeek: number
  }
  seasonEnd: {
    month: number
    day: number
  }
  closures: Closure[]
  specialEvents: SpecialEvent[]
}

interface Closure {
  type: 'thanksgiving' | 'christmas' | 'custom'
  calculateDate?: (year: number) => Date
  customDate?: string // YYYY-MM-DD
  reason: string
  endOffsetDays?: number // How many days the closure lasts
}

interface SpecialEvent {
  eventTitle: string
  type: 'haunting' | 'candlelight' | 'other'
  datePattern: {
    month: number
    approximateDay?: number
    weekOfMonth?: number
    dayOfWeek?: number
  }
  hours: {
    open: number
    close: number
  }
  replacesRegularHours: boolean // If true, site closed during day
  dayClosedMessage?: string // Marketing message when closed during day for prep
}

/**
 * Default configuration for Rocky Mount 2026
 */
export const ROCKY_MOUNT_HOURS_CONFIG: HoursConfig = {
  regularHours: {
    open: 10, // 10am
    close: 17, // 5pm
  },
  openDays: [3, 4, 5, 6], // Wed-Sat (3=Wed, 6=Sat)
  seasonStart: {
    month: 3, // March
    weekOfMonth: 1, // First
    dayOfWeek: 3, // Wednesday
  },
  seasonEnd: {
    month: 12,
    day: 20, // Always December 20th
  },
  closures: [
    {
      type: 'thanksgiving',
      calculateDate: (year) => getThanksgivingDate(year),
      endOffsetDays: 1, // Thanksgiving Thursday + Friday (2 days total)
      reason: 'Thanksgiving Holiday',
    },
    // No Christmas closure needed - season ends December 20th
  ],
  specialEvents: [
    {
      eventTitle: 'Haunting on the Mount',
      type: 'haunting',
      datePattern: {
        month: 10, // October
        approximateDay: 15,
      },
      hours: {
        open: 18, // 6pm
        close: 21, // 9pm
      },
      replacesRegularHours: true,
      dayClosedMessage:
        "As we prepare for tonight's Haunting on the Mount, the site is closed during the day. Join us this evening for a spine-tingling journey through history.",
    },
    {
      eventTitle: 'Candlelight Christmas',
      type: 'candlelight',
      datePattern: {
        month: 12, // December
        approximateDay: 4,
      },
      hours: {
        open: 16, // 4pm
        close: 20, // 8pm
      },
      replacesRegularHours: true,
      dayClosedMessage:
        "As we prepare for tonight's Candlelight Christmas, the site is closed during the day. Return this evening to experience the warmth of an 18th-century holiday by candlelight.",
    },
  ],
}

/**
 * Calculate the date of Thanksgiving (4th Thursday of November)
 */
export function getThanksgivingDate(year: number): Date {
  const nov1 = new Date(year, 10, 1) // November 1st
  const firstThursday = nov1.getDay() === 4 ? 1 : (11 - nov1.getDay()) % 7 || 7
  const fourthThursday = firstThursday + 21 // 3 weeks = 21 days
  return new Date(year, 10, fourthThursday)
}

/**
 * Calculate the date of the nth occurrence of a weekday in a month
 * @param year - The year
 * @param month - 0-indexed month (0 = January)
 * @param weekday - 0-6 (0 = Sunday, 6 = Saturday)
 * @param nth - 1 for first, 2 for second, etc.
 */
export function getNthWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  nth: number
): Date {
  const firstDay = new Date(year, month, 1)
  let date = 1 + ((weekday - firstDay.getDay() + 7) % 7)
  date += (nth - 1) * 7
  return new Date(year, month, date)
}

/**
 * Get the last Saturday before or on a given date in a month
 * Used for season end (last Saturday before Dec 20)
 */
export function getLastSaturdayBefore(year: number, month: number, beforeDay: number): Date {
  const date = new Date(year, month, beforeDay)
  // Backtrack to the last Saturday
  while (date.getDay() !== 6) {
    date.setDate(date.getDate() - 1)
  }
  return date
}

/**
 * Check if a date falls within the site's operating season
 */
export function isSeasonOpen(date: Date, config: HoursConfig = ROCKY_MOUNT_HOURS_CONFIG): boolean {
  const year = date.getFullYear()

  // Season start: First Wednesday of March
  const seasonStart = getNthWeekdayOfMonth(
    year,
    config.seasonStart.month - 1,
    config.seasonStart.dayOfWeek,
    config.seasonStart.weekOfMonth
  )

  // Season end: Last Saturday before Dec 20
  const seasonEnd = getLastSaturdayBefore(year, config.seasonEnd.month - 1, config.seasonEnd.day)

  return date >= seasonStart && date <= seasonEnd
}

/**
 * Check if a date is one of the site's open days (Wed-Sat)
 */
export function isDayOpen(date: Date, config: HoursConfig = ROCKY_MOUNT_HOURS_CONFIG): boolean {
  return config.openDays.includes(date.getDay())
}

/**
 * Check if a specific time is within operating hours
 * Does NOT check if the day/season is open—use other functions for that
 */
export function isTimeOpen(date: Date, config: HoursConfig = ROCKY_MOUNT_HOURS_CONFIG): boolean {
  const hours = date.getHours()
  return hours >= config.regularHours.open && hours < config.regularHours.close
}

/**
 * Check if a date is a closure (Thanksgiving, Christmas, etc.)
 */
export function isClosure(
  date: Date,
  config: HoursConfig = ROCKY_MOUNT_HOURS_CONFIG
): { closed: boolean; reason?: string; closureEnd?: Date } {
  const year = date.getFullYear()

  for (const closure of config.closures) {
    if (closure.type === 'thanksgiving') {
      const thanksgivingDate = closure.calculateDate?.(year)
      if (!thanksgivingDate) continue

      const daysOffset = closure.endOffsetDays || 7
      const closureStart = new Date(thanksgivingDate)
      const closureEnd = new Date(thanksgivingDate)
      closureEnd.setDate(closureEnd.getDate() + daysOffset)

      if (date >= closureStart && date <= closureEnd) {
        return {
          closed: true,
          reason: closure.reason,
          closureEnd,
        }
      }
    }

    if (closure.type === 'christmas') {
      // Christmas closure: Dec 24 through Jan 2
      const christmasStart = new Date(year, 11, 24) // Dec 24
      const christmasEnd = new Date(year + 1, 0, 2) // Jan 2 next year

      if (date >= christmasStart && date <= christmasEnd) {
        return {
          closed: true,
          reason: closure.reason,
          closureEnd: christmasEnd,
        }
      }
    }

    if (closure.type === 'custom' && closure.customDate) {
      const customDate = parseDate(closure.customDate)
      if (date.toDateString() === customDate.toDateString()) {
        return {
          closed: true,
          reason: closure.reason,
        }
      }
    }
  }

  return { closed: false }
}

/**
 * Get special hours for a date if there's a special event
 */
export function getSpecialHours(
  date: Date,
  config: HoursConfig = ROCKY_MOUNT_HOURS_CONFIG
): SpecialHours | null {
  const month = date.getMonth() + 1 // Convert to 1-indexed
  const day = date.getDate()

  for (const event of config.specialEvents) {
    // Check if month matches
    if (event.datePattern.month !== month) continue

    // For events with approximate day, check within ±3 days
    if (event.datePattern.approximateDay) {
      const dayDiff = Math.abs(day - event.datePattern.approximateDay)
      if (dayDiff <= 3) {
        return {
          opens: event.hours.open,
          closes: event.hours.close,
          reason: `Special hours for ${event.eventTitle}`,
          eventTitle: event.eventTitle,
          replacesRegularHours: event.replacesRegularHours,
          dayClosedMessage: event.dayClosedMessage,
        }
      }
    }

    // For events with specific week pattern
    if (event.datePattern.weekOfMonth && event.datePattern.dayOfWeek) {
      const targetDate = getNthWeekdayOfMonth(
        date.getFullYear(),
        month - 1,
        event.datePattern.dayOfWeek,
        event.datePattern.weekOfMonth
      )
      if (date.toDateString() === targetDate.toDateString()) {
        return {
          opens: event.hours.open,
          closes: event.hours.close,
          reason: `Special hours for ${event.eventTitle}`,
          eventTitle: event.eventTitle,
          replacesRegularHours: event.replacesRegularHours,
          dayClosedMessage: event.dayClosedMessage,
        }
      }
    }
  }

  return null
}

/**
 * Get comprehensive site status for a given date and time
 */
export function getSiteStatus(
  date: Date = new Date(),
  config: HoursConfig = ROCKY_MOUNT_HOURS_CONFIG
): SiteStatus {
  // Check closures first
  const closure = isClosure(date, config)
  if (closure.closed) {
    const reason = closure.reason || 'Closed'
    let message = reason
    if (closure.closureEnd) {
      message += ` (closed through ${formatDate(closure.closureEnd)})`
    }
    return {
      isOpen: false,
      reason,
      message,
      nextOpen: getNextOpenDate(date, config),
    }
  }

  // Check if season is open
  if (!isSeasonOpen(date, config)) {
    const seasonStart = getNthWeekdayOfMonth(
      date.getFullYear(),
      config.seasonStart.month - 1,
      config.seasonStart.dayOfWeek,
      config.seasonStart.weekOfMonth
    )

    // If before season, next open is season start
    if (date < seasonStart) {
      return {
        isOpen: false,
        reason: 'Before operating season',
        message: `Season opens ${formatDate(seasonStart)}`,
        nextOpen: seasonStart,
      }
    }

    // If after season, next open is next year's season start
    const nextSeasonStart = getNthWeekdayOfMonth(
      date.getFullYear() + 1,
      config.seasonStart.month - 1,
      config.seasonStart.dayOfWeek,
      config.seasonStart.weekOfMonth
    )

    return {
      isOpen: false,
      reason: 'After operating season',
      message: `Season ends mid-December. Next season opens ${formatDate(nextSeasonStart)}`,
      nextOpen: nextSeasonStart,
    }
  }

  // Check if it's an open day (Wed-Sat)
  if (!isDayOpen(date, config)) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return {
      isOpen: false,
      reason: 'Not an open day',
      message: `Open Wed-Sat only. It's ${dayNames[date.getDay()]}`,
      nextOpen: getNextOpenDate(date, config),
    }
  }

  // Check special hours first
  const specialHours = getSpecialHours(date, config)
  if (specialHours) {
    const now = new Date()
    const currentHour = now.getHours()
    const isCurrentlyOpen = isTimeInRange(
      currentHour,
      now.getMinutes(),
      specialHours.opens,
      specialHours.closes
    )

    if (isCurrentlyOpen) {
      return {
        isOpen: true,
        reason: `Open (special hours for ${specialHours.eventTitle})`,
        message: `Open ${formatTime(specialHours.opens)}-${formatTime(specialHours.closes)} for ${specialHours.eventTitle}`,
        specialHours,
      }
    }

    // If event replaces regular hours and it's daytime, show the prep message
    if (specialHours.replacesRegularHours && currentHour < specialHours.opens) {
      return {
        isOpen: false,
        reason: `Preparing for ${specialHours.eventTitle}`,
        message:
          specialHours.dayClosedMessage ||
          `Closed during the day. Join us tonight for ${specialHours.eventTitle}!`,
        specialHours,
      }
    }

    return {
      isOpen: false,
      reason: 'Currently closed (outside special event hours)',
      message: `Special event hours ${formatTime(specialHours.opens)}-${formatTime(specialHours.closes)} for ${specialHours.eventTitle}`,
      nextOpen: getNextOpenDate(date, config),
      specialHours,
    }
  }

  // Regular hours
  const now = new Date()
  const isCurrentlyOpen = isTimeInRange(
    now.getHours(),
    now.getMinutes(),
    config.regularHours.open,
    config.regularHours.close
  )

  if (isCurrentlyOpen) {
    return {
      isOpen: true,
      reason: 'Open',
      message: `Open ${formatTime(config.regularHours.open)}-${formatTime(config.regularHours.close)}`,
    }
  }

  return {
    isOpen: false,
    reason: 'Currently closed',
    message: `Open ${formatTime(config.regularHours.open)}-${formatTime(config.regularHours.close)}. Last tour at 4pm.`,
    nextOpen: getNextOpenDate(date, config),
  }
}

/**
 * Get the next date/time the site will be open
 */
export function getNextOpenDate(
  date: Date = new Date(),
  config: HoursConfig = ROCKY_MOUNT_HOURS_CONFIG
): Date {
  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)

  // Move forward one day to start checking
  checkDate.setDate(checkDate.getDate() + 1)

  // Limit search to 2 years ahead
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 2)

  while (checkDate <= maxDate) {
    // Check all conditions
    if (
      isSeasonOpen(checkDate, config) &&
      !isClosure(checkDate, config).closed &&
      isDayOpen(checkDate, config)
    ) {
      // Found a valid day, set to opening time
      const nextOpen = new Date(checkDate)
      nextOpen.setHours(config.regularHours.open, 0, 0, 0)
      return nextOpen
    }

    checkDate.setDate(checkDate.getDate() + 1)
  }

  // If no open date found within 2 years, return next season start
  const nextSeasonStart = getNthWeekdayOfMonth(
    date.getFullYear() + 1,
    config.seasonStart.month - 1,
    config.seasonStart.dayOfWeek,
    config.seasonStart.weekOfMonth
  )
  nextSeasonStart.setHours(config.regularHours.open, 0, 0, 0)
  return nextSeasonStart
}

/**
 * Get hourly tour schedule for a specific date
 */
export function getTourSchedule(
  date: Date,
  config: HoursConfig = ROCKY_MOUNT_HOURS_CONFIG
): { time: string; hour: number }[] {
  const specialHours = getSpecialHours(date, config)
  const openHour = specialHours?.opens ?? config.regularHours.open
  const closeHour = specialHours?.closes ?? config.regularHours.close

  const tours: { time: string; hour: number }[] = []

  for (let hour = openHour; hour < closeHour; hour++) {
    tours.push({
      time: formatTime(hour),
      hour,
    })
  }

  return tours
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Parse a date string (YYYY-MM-DD format)
 */
function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T12:00:00`)
}

/**
 * Format a date for display
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format an hour (24-hour) as 12-hour AM/PM
 */
function formatTime(hour: number): string {
  const meridiem = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:00 ${meridiem}`
}

/**
 * Check if a time (hours:minutes) falls within a range
 */
function isTimeInRange(
  hours: number,
  minutes: number,
  openHour: number,
  closeHour: number
): boolean {
  const totalMinutes = hours * 60 + minutes
  const openMinutes = openHour * 60
  const closeMinutes = closeHour * 60
  return totalMinutes >= openMinutes && totalMinutes < closeMinutes
}

// ============================================================================
// Export convenience functions for common queries
// ============================================================================

/**
 * Simple check: is the site open right now?
 */
export function isOpenNow(config: HoursConfig = ROCKY_MOUNT_HOURS_CONFIG): boolean {
  const status = getSiteStatus(new Date(), config)
  return status.isOpen
}

/**
 * Simple check: is the site open on a specific date?
 * Returns true only if season is open, it's an open day, and not a closure
 */
export function isOpenOnDate(date: Date, config: HoursConfig = ROCKY_MOUNT_HOURS_CONFIG): boolean {
  return isSeasonOpen(date, config) && !isClosure(date, config).closed && isDayOpen(date, config)
}
