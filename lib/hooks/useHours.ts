import siteInfo from '@/data/siteInfo.json'

/**
 * Day of week type
 */
type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

/**
 * Hours information interface
 */
export interface Hours {
  /** Regular hours by day */
  regular: {
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
    monday: string
    tuesday: string
  }
  /** Formatted hour strings */
  formatted: {
    /** Days open: "Wednesday - Saturday" */
    days: string
    /** Time range: "10am - 5pm" */
    time: string
    /** Short format: "Wed-Sat 10am-5pm" */
    short: string
  }
  /** Season description */
  season: string
  /** Season note */
  seasonNote: string
  /** Tour schedule description */
  tourSchedule: string
  /** Last tour time */
  lastTour: string
  /** Tour note */
  tourNote: string
  /** General hours note */
  note: string
  /** Check if site is open today */
  isOpenToday: () => boolean
  /** Get today's hours string */
  getTodayHours: () => string
  /** Get next open day name */
  getNextOpenDay: () => string
  /** Get hours for specific day */
  getHoursForDay: (day: DayOfWeek) => string
  /** Check if specific day is open */
  isOpenOnDay: (day: DayOfWeek) => boolean
}

/**
 * Get current day of week as lowercase string
 */
function getCurrentDay(): DayOfWeek {
  const days: DayOfWeek[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]
  return days[new Date().getDay()]
}

/**
 * Hours hook with "is open today" logic
 *
 * Provides operating hours with helper functions to determine if the site
 * is open today, get today's hours, and find the next open day.
 *
 * @returns Hours information with helper functions
 *
 * @example
 * ```tsx
 * function HoursDisplay() {
 *   const hours = useHours()
 *
 *   return (
 *     <div>
 *       {hours.isOpenToday() ? (
 *         <p>Open today: {hours.getTodayHours()}</p>
 *       ) : (
 *         <p>Closed today. Next open: {hours.getNextOpenDay()}</p>
 *       )}
 *       <p>{hours.formatted.short}</p>
 *     </div>
 *   )
 * }
 * ```
 */
export function useHours(): Hours {
  const { hours } = siteInfo

  /**
   * Check if site is open on a specific day
   */
  const isOpenOnDay = (day: DayOfWeek): boolean => {
    const dayHours = hours.regular[day]
    return dayHours.toLowerCase() !== 'closed'
  }

  /**
   * Check if site is open today
   */
  const isOpenToday = (): boolean => {
    return isOpenOnDay(getCurrentDay())
  }

  /**
   * Get hours for a specific day
   */
  const getHoursForDay = (day: DayOfWeek): string => {
    return hours.regular[day]
  }

  /**
   * Get today's hours string
   */
  const getTodayHours = (): string => {
    return getHoursForDay(getCurrentDay())
  }

  /**
   * Get next open day name
   */
  const getNextOpenDay = (): string => {
    const days: DayOfWeek[] = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ]
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const today = new Date().getDay()

    // Check next 7 days
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (today + i) % 7
      const nextDay = days[nextDayIndex]

      if (isOpenOnDay(nextDay)) {
        return dayNames[nextDayIndex]
      }
    }

    // Fallback (should never happen if at least one day is open)
    return 'Wednesday'
  }

  return {
    regular: hours.regular,
    formatted: hours.formatted,
    season: hours.season,
    seasonNote: hours.seasonNote,
    tourSchedule: hours.tourSchedule,
    lastTour: hours.lastTour,
    tourNote: hours.tourNote,
    note: hours.note,
    isOpenToday,
    getTodayHours,
    getNextOpenDay,
    getHoursForDay,
    isOpenOnDay,
  }
}
