import Link from 'next/link'
import events from '@/data/events.json'
import { getTicketUrl } from '@/lib/data'

interface QuickBookingCardProps {
  /** Optional CSS class */
  className?: string
}

/**
 * QuickBookingCard - Server Component
 *
 * Displays the next upcoming ticketed event with booking CTA.
 * Calculates next event at render time (no client-side logic needed).
 *
 * @example
 * <QuickBookingCard />
 * <QuickBookingCard className="max-w-sm" />
 */
export function QuickBookingCard({ className = '' }: QuickBookingCardProps) {
  // Calculate next event at render time
  const today = new Date().toISOString().split('T')[0]

  const nextEvent = events.events
    .filter((e) => e.requiresTicket && e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0]

  if (!nextEvent) {
    return (
      <div
        className={`rounded-lg border-2 border-[--gold-primary] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${className}`}
      >
        <p className="text-center text-[--text-light]">Check back for upcoming ticketed events.</p>
      </div>
    )
  }

  // Format date
  const eventDate = new Date(`${nextEvent.date}T00:00:00`)
  const todayDate = new Date(`${today}T00:00:00`)
  const daysUntil = Math.ceil((eventDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24))
  const isThisWeekend = daysUntil > 0 && daysUntil <= 2

  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const ticketUrl = getTicketUrl(nextEvent)

  // Extract price from pricing object (prefer child/member pricing if available)
  let displayPrice: string | null = null
  if (nextEvent.pricing) {
    const price = nextEvent.pricing.members || nextEvent.pricing.child || nextEvent.pricing.adult
    if (price) {
      displayPrice = `$${(price / 100).toFixed(2)}`
    }
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border-2 border-[--gold-primary] bg-white shadow-[var(--shadow-lg)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(201,162,39,0.25)] hover:-translate-y-1 ${className}`}
    >
      {/* Gold accent bar at top with shimmer effect */}
      <div className="h-2 bg-gradient-to-r from-[--gold-primary] via-[--gold-hover] to-[--gold-primary] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>

      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[--gold-primary] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-8">
        {/* Event Category Badge */}
        <div className="mb-4 flex items-center gap-2">
          {isThisWeekend && (
            <div className="inline-block rounded-full bg-gradient-to-r from-[--gold-primary] to-[--gold-hover] px-3 py-1 shadow-sm">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                This Weekend!
              </span>
            </div>
          )}
          <span className="text-2xl">🎟️</span>
        </div>

        {/* Event Title — Larger, more prominent */}
        <h3 className="mb-3 text-2xl md:text-3xl font-bold text-[--primary] leading-tight">
          {nextEvent.title}
        </h3>

        {/* Date with icon */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[--gold-primary]">📅</span>
          <p className="text-base text-[--text-light] font-medium">{formattedDate}</p>
        </div>

        {/* Days Until with countdown styling */}
        {daysUntil > 0 && (
          <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 bg-[--cream] rounded-full">
            <span className="w-2 h-2 bg-[--gold-primary] rounded-full animate-pulse" />
            <p className="text-sm text-[--primary] font-semibold">
              {daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
            </p>
          </div>
        )}

        {/* Event Description (if available) */}
        {nextEvent.description && (
          <p className="mb-5 text-sm text-[--text-light] leading-relaxed line-clamp-2">
            {nextEvent.description}
          </p>
        )}

        {/* Price with emphasis */}
        {displayPrice && (
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider text-[--text-light] block mb-1">
              From
            </span>
            <p className="text-3xl font-bold text-[--gold-primary]">{displayPrice}</p>
          </div>
        )}

        {/* Enhanced CTA Button */}
        {ticketUrl && (
          <Link
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[--gold-primary] px-6 py-4 text-base font-bold text-white uppercase tracking-wider transition-all duration-300 hover:bg-[--gold-hover] hover:shadow-[0_8px_30px_rgba(201,162,39,0.4)] active:scale-95 group-hover:gap-3"
          >
            Book Your Tickets
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        )}

        {/* Booking note */}
        {ticketUrl && (
          <p className="mt-3 text-center text-xs text-[--text-light]">
            Secure online booking · Limited availability
          </p>
        )}
      </div>
    </div>
  )
}
