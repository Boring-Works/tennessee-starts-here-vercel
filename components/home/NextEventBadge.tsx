'use client'

import { Calendar } from 'lucide-react'
import Link from 'next/link'
import type { Event } from '@/lib/schemas/events'

interface NextEventBadgeProps {
  nextEvent: Event | null
}

/**
 * NextEventBadge - Shows the next upcoming event
 *
 * Displays the event passed via props. logic moved to parent server component.
 */
export function NextEventBadge({ nextEvent }: NextEventBadgeProps) {
  if (!nextEvent) {
    return null
  }

  // Format date as "May 22" or "May 22-24" for multi-day
  const formatEventDate = () => {
    // Parse date safely
    const start = new Date(nextEvent.date)
    // Adjust for UTC if needed, but assuming date string YYYY-MM-DD is parsed correctly by new Date() in browser usually as UTC or local?
    // Actually, "YYYY-MM-DD" is parsed as UTC in ES5, but inconsistent in some browsers.
    // However, if we assume the input string is just a date, we should handle timezone carefully.
    // Given the previous code didn't handle timezone explicitly beyond `toLocaleDateString`, let's stick to simple parsing.
    // Better yet, let's use the same logic as Commemorative2026 if we want consistency, but here we just need month/day.
    const month = start.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
    const day = start.getUTCDate()

    if (nextEvent.endDate) {
      const end = new Date(nextEvent.endDate)
      const endDay = end.getUTCDate()
      return `${month} ${day}–${endDay}`
    }

    return `${month} ${day}`
  }

  return (
    <Link
      href={`/events/${nextEvent.id}`}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-sm transition-colors group"
    >
      <Calendar className="w-3.5 h-3.5 text-accent" />
      <span className="text-[11px] uppercase tracking-[0.15em] text-accent font-medium">
        {formatEventDate()}: {nextEvent.title}
      </span>
      <span className="text-accent/60 group-hover:text-accent transition-colors">→</span>
    </Link>
  )
}
