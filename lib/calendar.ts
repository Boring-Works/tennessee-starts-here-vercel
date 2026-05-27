/**
 * Generate and download an .ics calendar file
 */

interface CalendarEvent {
  title: string
  date: string // YYYY-MM-DD
  endDate?: string | null // YYYY-MM-DD
  location?: string
  description?: string
  url?: string
}

// Format date to ICS format (YYYYMMDD)
function formatICSDate(dateStr: string): string {
  return dateStr.replace(/-/g, '')
}

// Generate a unique ID for the event
function generateUID(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}@rockymountmuseum.com`
}

// Get current timestamp in ICS format
function getTimestamp(): string {
  const now = new Date()
  return `${now.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`
}

/**
 * Generate ICS file content
 */
export function generateICS(event: CalendarEvent): string {
  const startDate = formatICSDate(event.date)
  // For all-day events, end date should be the day after
  const endDateStr = event.endDate || event.date

  // Calculate the day after for all-day event end
  const [year, month, day] = endDateStr.split('-').map(Number)
  const nextDay = new Date(year, month - 1, day + 1)
  const endDatePlusOne = `${nextDay.getFullYear()}${String(nextDay.getMonth() + 1).padStart(2, '0')}${String(nextDay.getDate()).padStart(2, '0')}`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rocky Mount State Historic Site//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${generateUID()}`,
    `DTSTAMP:${getTimestamp()}`,
    `DTSTART;VALUE=DATE:${startDate}`,
    `DTEND;VALUE=DATE:${endDatePlusOne}`,
    `SUMMARY:${escapeICSText(event.title)}`,
  ]

  if (event.location) {
    lines.push(`LOCATION:${escapeICSText(event.location)}`)
  }

  if (event.description) {
    lines.push(`DESCRIPTION:${escapeICSText(event.description)}`)
  }

  if (event.url) {
    lines.push(`URL:${event.url}`)
  }

  lines.push('END:VEVENT', 'END:VCALENDAR')

  return lines.join('\r\n')
}

/**
 * Escape special characters for ICS format
 */
function escapeICSText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

/**
 * Download ICS file
 */
export function downloadICS(event: CalendarEvent): void {
  const icsContent = generateICS(event)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Rocky Mount default location
 */
export const ROCKY_MOUNT_LOCATION = '200 Hyder Hill Road, Piney Flats, TN 37686'
export const ROCKY_MOUNT_URL = 'https://rockymountmuseum.com/events'
