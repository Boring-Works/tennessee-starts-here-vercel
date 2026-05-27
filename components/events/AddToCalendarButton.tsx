'use client'

import { generateICS, generateICSFilename } from '@/lib/calendar/generateICS'

interface AddToCalendarButtonProps {
  event: {
    id: string
    title: string
    date: string
    endDate?: string | null
    time?: string | null
    description: string
  }
  className?: string
}

/**
 * AddToCalendarButton Component
 *
 * Downloads an .ics file when clicked, allowing users to add the event
 * to their preferred calendar app (Apple Calendar, Google Calendar, Outlook, etc.)
 *
 * Small, unobtrusive design - secondary to the main booking CTA.
 */
export function AddToCalendarButton({ event, className = '' }: AddToCalendarButtonProps) {
  const handleClick = () => {
    // Generate ICS file content
    const icsContent = generateICS(event)
    const filename = generateICSFilename(event)

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      aria-label={`Add ${event.title} to calendar`}
    >
      <span aria-hidden="true">📅</span>
      <span>Add to Calendar</span>
    </button>
  )
}
