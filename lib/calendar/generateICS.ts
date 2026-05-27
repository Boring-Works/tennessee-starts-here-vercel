/**
 * Generate ICS (iCalendar) file content for an event
 *
 * RFC 5545 compliant format that works with:
 * - Apple Calendar
 * - Google Calendar
 * - Microsoft Outlook
 * - Any standard calendar app
 */

interface ICSEvent {
  id: string
  title: string
  date: string // YYYY-MM-DD
  endDate?: string | null
  time?: string | null // "10:00 AM" or "9:00 AM - 3:00 PM"
  description: string
}

const LOCATION = 'Rocky Mount State Historic Site, 200 Hyder Hill Rd, Piney Flats, TN 37686'
const PRODID = '-//Tennessee Starts Here//Events//EN'

/**
 * Escape special characters for ICS format
 */
function escapeICS(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n')
}

/**
 * Convert 12-hour time string to 24-hour format
 * "10:00 AM" -> "100000"
 * "2:00 PM" -> "140000"
 */
function parseTime(timeStr: string): string | null {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) return null

  let hours = parseInt(match[1], 10)
  const minutes = match[2]
  const period = match[3].toUpperCase()

  if (period === 'PM' && hours !== 12) {
    hours += 12
  } else if (period === 'AM' && hours === 12) {
    hours = 0
  }

  return `${hours.toString().padStart(2, '0')}${minutes}00`
}

/**
 * Format date for ICS (YYYYMMDD or YYYYMMDDTHHMMSS)
 */
function formatICSDate(dateStr: string, timeStr?: string | null): string {
  const date = dateStr.replace(/-/g, '')

  if (!timeStr) {
    // All-day event
    return date
  }

  // Extract start time from time range like "9:00 AM - 3:00 PM"
  const startTime = timeStr.split('-')[0].trim()
  const time = parseTime(startTime)

  if (!time) {
    // Fallback to all-day if time parsing fails
    return date
  }

  return `${date}T${time}`
}

/**
 * Get end date/time for ICS
 */
function formatICSEndDate(event: ICSEvent): string {
  // Multi-day event
  if (event.endDate) {
    if (event.time) {
      // Multi-day with time - use end date + time
      const timeParts = event.time.split('-')
      const endTimeStr = timeParts.length > 1 ? timeParts[1].trim() : timeParts[0].trim()
      const endTime = parseTime(endTimeStr)
      if (endTime) {
        return `${event.endDate.replace(/-/g, '')}T${endTime}`
      }
    }
    // Multi-day all-day - add one day to end date for ICS spec
    const endDate = new Date(`${event.endDate}T12:00:00`)
    endDate.setDate(endDate.getDate() + 1)
    return endDate.toISOString().slice(0, 10).replace(/-/g, '')
  }

  // Single-day event
  if (event.time) {
    // Check for time range "9:00 AM - 3:00 PM"
    const timeParts = event.time.split('-')
    if (timeParts.length > 1) {
      const endTime = parseTime(timeParts[1].trim())
      if (endTime) {
        return `${event.date.replace(/-/g, '')}T${endTime}`
      }
    }
    // No end time specified - default to 1 hour later
    const startTime = parseTime(timeParts[0].trim())
    if (startTime) {
      const hours = parseInt(startTime.slice(0, 2), 10)
      const newHours = (hours + 1).toString().padStart(2, '0')
      return `${event.date.replace(/-/g, '')}T${newHours}${startTime.slice(2)}`
    }
  }

  // All-day single day - add one day for ICS spec
  const endDate = new Date(`${event.date}T12:00:00`)
  endDate.setDate(endDate.getDate() + 1)
  return endDate.toISOString().slice(0, 10).replace(/-/g, '')
}

/**
 * Generate ICS file content for an event
 */
export function generateICS(event: ICSEvent): string {
  const now = `${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`
  const isAllDay = !event.time

  const dtStart = formatICSDate(event.date, event.time)
  const dtEnd = formatICSEndDate(event)

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${PRODID}`,
    'BEGIN:VEVENT',
    `UID:${event.id}@tennesseestartshere.com`,
    `DTSTAMP:${now}`,
  ]

  // Add date/time fields
  if (isAllDay) {
    lines.push(`DTSTART;VALUE=DATE:${dtStart}`)
    lines.push(`DTEND;VALUE=DATE:${dtEnd}`)
  } else {
    lines.push(`DTSTART:${dtStart}`)
    lines.push(`DTEND:${dtEnd}`)
  }

  // Add event details
  lines.push(`SUMMARY:${escapeICS(event.title)}`)
  lines.push(`DESCRIPTION:${escapeICS(event.description)}`)
  lines.push(`LOCATION:${escapeICS(LOCATION)}`)
  lines.push(`URL:https://tennesseestartshere.com/events#${event.id}`)
  lines.push('STATUS:CONFIRMED')
  lines.push('END:VEVENT')
  lines.push('END:VCALENDAR')

  return lines.join('\r\n')
}

/**
 * Generate a filename for the ICS download
 */
export function generateICSFilename(event: ICSEvent): string {
  return `${event.id}.ics`
}
