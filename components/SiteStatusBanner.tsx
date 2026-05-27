'use client'

import { useState, useEffect } from 'react'
import { getSiteStatus, type SiteStatus } from '@/lib/siteHours'

interface SiteStatusBannerProps {
  /** Optional CSS class name for custom styling */
  className?: string
}

/**
 * SiteStatusBanner - Displays current site operating status with live updates
 *
 * Shows one of four states:
 * - Open: Green badge with closing time
 * - Closed: Amber badge with reason and next open time
 * - Special Event Prep: Amber badge with event details
 * - Special Event Active: Gold badge with event hours
 *
 * Updates every minute to reflect current status. SSR-safe with hydration handling.
 *
 * @example
 * <SiteStatusBanner />
 *
 * @example
 * <SiteStatusBanner className="sticky top-0 z-50" />
 */
export function SiteStatusBanner({ className = '' }: SiteStatusBannerProps) {
  const [status, setStatus] = useState<SiteStatus | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Use timeout to avoid synchronous setState in effect body
    const initialTimeout = setTimeout(() => {
      setStatus(getSiteStatus())
      setMounted(true)
    }, 0)

    // Update every minute
    const interval = setInterval(() => {
      setStatus(getSiteStatus())
    }, 60000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || !status) {
    return null
  }

  // Determine badge styling based on status
  const isOpen = status.isOpen
  const isSpecialEvent = !!status.specialHours
  const isDuringEvent = isOpen && isSpecialEvent
  const isPreparing = !isOpen && status.reason.includes('Preparing')

  // Badge background and text colors
  const badgeClasses = isDuringEvent
    ? 'bg-[--gold-primary]/15 border border-[--gold-primary]/40 shadow-[--shadow-gold-sm]'
    : isOpen
      ? 'bg-green-50 border border-green-200 shadow-sm'
      : isPreparing
        ? 'bg-amber-50 border border-amber-200 shadow-sm'
        : 'bg-slate-50 border border-slate-200 shadow-sm'

  const textClasses = isDuringEvent
    ? 'text-[--gold-primary]'
    : isOpen
      ? 'text-green-700'
      : isPreparing
        ? 'text-amber-700'
        : 'text-slate-700'

  const badgeIndicatorClasses = isDuringEvent
    ? 'bg-[--gold-primary]'
    : isOpen
      ? 'bg-green-500'
      : isPreparing
        ? 'bg-amber-500'
        : 'bg-slate-400'

  // Format the message
  let displayMessage = status.message

  // For next open dates, make it more user-friendly
  if (status.nextOpen && !isOpen) {
    const nextOpen = new Date(status.nextOpen)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const isTonight =
      nextOpen.toDateString() === today.toDateString() &&
      nextOpen.getHours() >= today.getHours() + 2

    const isTomorrow = nextOpen.toDateString() === tomorrow.toDateString()
    const isThisWeek = nextOpen.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000

    if (isTonight) {
      const hour = nextOpen.getHours() > 12 ? nextOpen.getHours() - 12 : nextOpen.getHours()
      const meridiem = nextOpen.getHours() >= 12 ? 'PM' : 'AM'
      displayMessage = `Closed. Open again tonight at ${hour}:00 ${meridiem}`
    } else if (isTomorrow) {
      const hour = nextOpen.getHours() > 12 ? nextOpen.getHours() - 12 : nextOpen.getHours()
      const meridiem = nextOpen.getHours() >= 12 ? 'PM' : 'AM'
      displayMessage = `Closed. Open tomorrow at ${hour}:00 ${meridiem}`
    } else if (isThisWeek) {
      const dayName = nextOpen.toLocaleDateString('en-US', { weekday: 'short' })
      const hour = nextOpen.getHours() > 12 ? nextOpen.getHours() - 12 : nextOpen.getHours()
      const meridiem = nextOpen.getHours() >= 12 ? 'PM' : 'AM'
      displayMessage = `Closed. Open ${dayName} at ${hour}:00 ${meridiem}`
    }
  }

  return (
    <div className={`w-full px-4 py-3 md:py-2.5 ${className}`}>
      <div
        className={`inline-flex items-center gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full border transition-all duration-300 ${badgeClasses}`}
      >
        {/* Status indicator dot */}
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full animate-pulse ${badgeIndicatorClasses}`} />
          <div className={`text-sm md:text-base font-medium ${textClasses}`}>
            {isOpen ? 'Open Now' : isPreparing ? 'Preparing' : 'Closed'}
          </div>
        </div>

        {/* Separator */}
        <div
          className={`h-4 w-px ${isDuringEvent ? 'bg-[--gold-primary]/20' : isOpen ? 'bg-green-200' : isPreparing ? 'bg-amber-200' : 'bg-slate-200'}`}
        />

        {/* Status message */}
        <div className={`text-xs md:text-sm font-normal ${textClasses} leading-tight`}>
          {displayMessage}
        </div>
      </div>
    </div>
  )
}
