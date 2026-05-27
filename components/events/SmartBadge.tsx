import type { ReactElement } from 'react'
import type { SmartBadge as SmartBadgeType } from '@/lib/events/smartBadges'

interface SmartBadgeProps {
  badge: SmartBadgeType
  /** Size variant */
  size?: 'sm' | 'md'
  /** Additional class name */
  className?: string
}

/**
 * SmartBadge Component
 *
 * Renders a conversion-focused badge with appropriate styling
 * based on badge type (urgency, value, popularity, timing).
 */
export function SmartBadge({ badge, size = 'sm', className = '' }: SmartBadgeProps) {
  // Type-based styles
  const typeStyles: Record<SmartBadgeType['type'], string> = {
    urgency: 'bg-red-50 text-red-800 border-red-200',
    value: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    popularity: 'bg-amber-50 text-amber-800 border-amber-200',
    timing: 'bg-blue-50 text-blue-800 border-blue-200',
  }

  // Size styles
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  }

  // Icon components (inline SVGs for performance)
  const icons: Record<NonNullable<SmartBadgeType['icon']>, ReactElement> = {
    clock: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    users: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    star: (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    fire: (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.941 1.806-5.476 2.916-6.664A1 1 0 019.5 9h.5V4.5a1 1 0 011.707-.707l.586.586c1.414 1.414 3.207 3.207 3.207 5.621 0 1.166-.28 2.21-.75 3.137.47.042.9.143 1.279.293A7 7 0 0019 16c0 3.866-3.134 7-7 7z" />
      </svg>
    ),
    heart: (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    gift: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
        />
      </svg>
    ),
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1
        font-medium rounded-full border
        ${typeStyles[badge.type]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {badge.icon && icons[badge.icon]}
      {badge.label}
    </span>
  )
}

interface SmartBadgesProps {
  badges: SmartBadgeType[]
  /** Size variant */
  size?: 'sm' | 'md'
  /** Additional class name */
  className?: string
}

/**
 * SmartBadges Component
 *
 * Renders multiple smart badges in a row.
 */
export function SmartBadges({ badges, size = 'sm', className = '' }: SmartBadgesProps) {
  if (badges.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {badges.map((badge, index) => (
        <SmartBadge key={`${badge.type}-${index}`} badge={badge} size={size} />
      ))}
    </div>
  )
}
