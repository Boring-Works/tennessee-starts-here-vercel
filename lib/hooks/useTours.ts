import siteInfo from '@/data/siteInfo.json'

/**
 * Tour time interface
 */
interface TourTime {
  /** Hour in 24-hour format */
  hour: number
  /** Formatted time string (12-hour with AM/PM) */
  formatted: string
  /** Whether this is the last tour of the day */
  isLastTour: boolean
}

/**
 * Tours information interface
 */
export interface Tours {
  /** Tour schedule description */
  schedule: string
  /** Last tour time */
  lastTour: string
  /** Tour note/details */
  note: string
  /** Tour duration */
  duration: string
  /** Get next tour time from current time */
  getNextTourTime: () => TourTime | null
  /** Get all tour times for today */
  getTodayTours: () => TourTime[]
  /** Get number of tours remaining today */
  getToursRemaining: () => number
  /** Check if tours are running now */
  areToursRunning: () => boolean
  /** Get time until next tour in minutes */
  getMinutesUntilNextTour: () => number | null
}

/**
 * Parse time string like "4:00 PM" into 24-hour format
 */
function parseTime(timeStr: string): number {
  const [time, period] = timeStr.split(' ')
  const [hourStr] = time.split(':')
  let hour = parseInt(hourStr, 10)

  if (period === 'PM' && hour !== 12) {
    hour += 12
  } else if (period === 'AM' && hour === 12) {
    hour = 0
  }

  return hour
}

/**
 * Format hour (0-23) to 12-hour time string
 */
function formatHour(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  return `${displayHour}:00 ${period}`
}

/**
 * Tours hook with "next tour" logic
 *
 * Provides tour schedule information with helper functions to determine
 * next tour time, remaining tours, and whether tours are currently running.
 *
 * Tours run hourly from 10:00 AM to 4:00 PM (last tour) on open days.
 *
 * @returns Tours information with helper functions
 *
 * @example
 * ```tsx
 * function TourSchedule() {
 *   const tours = useTours()
 *   const nextTour = tours.getNextTourTime()
 *   const remaining = tours.getToursRemaining()
 *
 *   return (
 *     <div>
 *       {tours.areToursRunning() ? (
 *         <div>
 *           <p>Next tour: {nextTour?.formatted}</p>
 *           <p>{remaining} tours remaining today</p>
 *         </div>
 *       ) : (
 *         <p>Tours finished for today</p>
 *       )}
 *     </div>
 *   )
 * }
 * ```
 */
export function useTours(): Tours {
  const { hours, whatToExpect } = siteInfo

  // Tour times: 10 AM, 11 AM, 12 PM, 1 PM, 2 PM, 3 PM, 4 PM (last tour)
  const TOUR_HOURS = [10, 11, 12, 13, 14, 15, 16]
  const lastTourHour = parseTime(hours.lastTour)

  /**
   * Get all tour times for today
   */
  const getTodayTours = (): TourTime[] => {
    return TOUR_HOURS.map((hour) => ({
      hour,
      formatted: formatHour(hour),
      isLastTour: hour === lastTourHour,
    }))
  }

  /**
   * Get next tour time from current time
   */
  const getNextTourTime = (): TourTime | null => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    // Find next tour (tours start at top of hour)
    for (const tourHour of TOUR_HOURS) {
      // If tour is later today, or tour is this hour but hasn't started yet
      if (tourHour > currentHour || (tourHour === currentHour && currentMinute < 60)) {
        return {
          hour: tourHour,
          formatted: formatHour(tourHour),
          isLastTour: tourHour === lastTourHour,
        }
      }
    }

    // No more tours today
    return null
  }

  /**
   * Get number of tours remaining today
   */
  const getToursRemaining = (): number => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    let remaining = 0

    for (const tourHour of TOUR_HOURS) {
      if (tourHour > currentHour || (tourHour === currentHour && currentMinute < 60)) {
        remaining++
      }
    }

    return remaining
  }

  /**
   * Check if tours are running now (between first and last tour time)
   */
  const areToursRunning = (): boolean => {
    const now = new Date()
    const currentHour = now.getHours()

    // Tours run from 10 AM through 4 PM (last tour starts at 4)
    return currentHour >= TOUR_HOURS[0] && currentHour <= lastTourHour
  }

  /**
   * Get time until next tour in minutes
   */
  const getMinutesUntilNextTour = (): number | null => {
    const nextTour = getNextTourTime()
    if (!nextTour) return null

    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    // Calculate minutes until next tour (which starts at top of hour)
    const minutesInCurrentHour = 60 - currentMinute
    const hoursDifference = nextTour.hour - currentHour - 1

    return hoursDifference * 60 + minutesInCurrentHour
  }

  return {
    schedule: hours.tourSchedule,
    lastTour: hours.lastTour,
    note: hours.tourNote,
    duration: whatToExpect.tourDuration,
    getNextTourTime,
    getTodayTours,
    getToursRemaining,
    areToursRunning,
    getMinutesUntilNextTour,
  }
}
