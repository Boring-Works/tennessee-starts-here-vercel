import Link from 'next/link'

interface EventCardProps {
  id?: string // Reserved for future linking/anchoring
  title: string
  date: string
  endDate?: string | null
  time?: string | null
  type: 'new' | 'enhanced' | 'recurring' | 'milestone'
  description: string
  featured?: boolean
  compact?: boolean
}

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function formatDateRange(start: string, end?: string | null): string {
  if (!end) return formatDate(start)

  const startDate = new Date(`${start}T12:00:00`)
  const endDate = new Date(`${end}T12:00:00`)

  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })}-${endDate.getDate()}`
  }

  return `${formatDate(start)} - ${formatDate(end)}`
}

function formatShortDate(dateStr: string): { month: string; day: string } {
  const date = new Date(`${dateStr}T12:00:00`)
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: date.getDate().toString(),
  }
}

function TypeBadge({ type }: { type: EventCardProps['type'] }) {
  const badges = {
    new: { label: 'New for 2026', className: 'bg-accent text-primary' },
    enhanced: { label: 'Enhanced', className: 'bg-secondary text-white' },
    recurring: { label: 'Annual', className: 'bg-text-light text-white' },
    milestone: { label: 'Milestone', className: 'bg-primary text-white' },
  }

  const badge = badges[type]
  return (
    <span
      className={`inline-block px-2.5 py-1 text-[10px] font-semibold rounded-sm uppercase tracking-wider ${badge.className}`}
    >
      {badge.label}
    </span>
  )
}

export default function EventCard({
  title,
  date,
  endDate,
  time,
  type,
  description,
  compact = false,
}: EventCardProps) {
  const shortDate = formatShortDate(date)

  if (compact) {
    return (
      <article className="card-hover bg-white border border-gray-200 rounded-sm p-4 hover:border-secondary/50">
        <div className="flex items-start justify-between gap-2 mb-2">
          <time dateTime={date} className="text-sm text-secondary font-semibold">
            {formatDateRange(date, endDate)}
          </time>
          <TypeBadge type={type} />
        </div>
        <h3 className="font-serif text-lg font-bold text-primary mb-2">{title}</h3>
        {time && <p className="text-sm text-text-light">{time}</p>}
      </article>
    )
  }

  return (
    <article className="card-hover bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:border-secondary/50 group">
      {/* Date Badge */}
      <div className="flex">
        <div className="bg-secondary text-white px-4 py-3 flex flex-col items-center justify-center min-w-[70px]">
          <span className="text-xs font-semibold tracking-wider">{shortDate.month}</span>
          <span className="text-2xl font-serif font-bold">{shortDate.day}</span>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-serif text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                {title}
              </h3>
              {time && <p className="text-sm text-text-light">{time}</p>}
              {endDate && <p className="text-xs text-text-light">Through {formatDate(endDate)}</p>}
            </div>
            <TypeBadge type={type} />
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 border-t border-gray-100">
        <p className="text-foreground text-sm mt-3 leading-relaxed">{description}</p>
      </div>
    </article>
  )
}

export function FeaturedEventCard({
  title,
  date,
  endDate,
  time,
  type,
  description,
}: EventCardProps) {
  const shortDate = formatShortDate(date)

  return (
    <article className="card-hover bg-white border-2 border-accent/30 rounded-sm overflow-hidden shadow-md hover:border-accent hover:shadow-lg group">
      {/* Accent top bar */}
      <div className="h-1 bg-gradient-to-r from-accent via-accent/80 to-accent" />

      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Date block */}
          <time
            dateTime={date}
            className="bg-secondary text-white rounded-sm px-3 py-2 flex flex-col items-center min-w-[60px]"
          >
            <span className="text-xs font-semibold tracking-wider">{shortDate.month}</span>
            <span className="text-xl font-serif font-bold">{shortDate.day}</span>
          </time>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-serif text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                {title}
              </h3>
              <TypeBadge type={type} />
            </div>
            {time && <p className="text-sm text-text-light mb-1">{time}</p>}
            {endDate && (
              <p className="text-xs text-text-light">
                Through <time dateTime={endDate}>{formatDate(endDate)}</time>
              </p>
            )}
          </div>
        </div>

        <p className="text-foreground mt-4 leading-relaxed">{description}</p>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href="/events"
            className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors link-underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
          >
            View all events
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
