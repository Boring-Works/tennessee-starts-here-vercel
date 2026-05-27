import Link from 'next/link'

interface GradientCategoryCardProps {
  count: number
  label: string
  icon: string
  gradient: 'gold-burgundy' | 'burgundy-navy' | 'gold-navy'
  href?: string
}

/**
 * GradientCategoryCard - Vibrant event category card with gradient background
 *
 * Displays event count with bold gradient styling for visual impact.
 * Used in homepage events section to showcase event types.
 */
export function GradientCategoryCard({
  count,
  label,
  icon,
  gradient,
  href = '/events',
}: GradientCategoryCardProps) {
  const gradientClasses = {
    'gold-burgundy': 'bg-gradient-to-br from-[var(--gold-primary)] to-[var(--burgundy)]',
    'burgundy-navy': 'bg-gradient-to-br from-[var(--burgundy)] to-[var(--primary)]',
    'gold-navy': 'bg-gradient-to-br from-[var(--gold-hover)] to-[var(--primary-dark)]',
  }

  return (
    <Link
      href={href}
      className={`group relative overflow-hidden ${gradientClasses[gradient]} p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,162,39,0.4)] hover:-translate-y-1`}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise"
        aria-hidden="true"
      />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-radial-glow" />

      <div className="relative z-10">
        {/* Icon */}
        <span className="text-3xl mb-3 block transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>

        {/* Count */}
        <div className="mb-2">
          <span className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{count}</span>
        </div>

        {/* Label */}
        <p className="text-sm text-white/90 font-medium mb-3">{label}</p>

        {/* Mini CTA */}
        <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-white/80 group-hover:text-white transition-colors">
          View {label}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}
