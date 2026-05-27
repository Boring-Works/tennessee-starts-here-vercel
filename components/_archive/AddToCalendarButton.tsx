'use client'

import { downloadICS, ROCKY_MOUNT_LOCATION } from '@/lib/calendar'
import styles from './AddToCalendarButton.module.css'

interface AddToCalendarButtonProps {
  title: string
  date: string
  endDate?: string | null
  description: string
  eventId: string
}

export default function AddToCalendarButton({
  title,
  date,
  endDate,
  description,
  eventId,
}: AddToCalendarButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    downloadICS({
      title,
      date,
      endDate,
      location: ROCKY_MOUNT_LOCATION,
      description,
      url: `https://rockymountmuseum.com/events#${eventId}`,
    })
  }

  return (
    <button
      type="button"
      className={styles.calendarBtn}
      onClick={handleClick}
      aria-label={`Add ${title} to calendar`}
    >
      <span className={styles.calendarIcon} aria-hidden="true">
        📅
      </span>
      Add to Calendar
    </button>
  )
}
