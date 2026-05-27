'use client'

import Link from 'next/link'
import { FileText, User } from 'lucide-react'

interface PrimarySourceLinkProps {
  /** Brief quote or description of the source */
  quote: string
  /** Link to document or person page */
  href: string
  /** Call-to-action text for the link */
  linkText?: string
  /** Type of source (document or person) */
  type?: 'document' | 'person'
  /** Optional icon override */
  icon?: React.ReactNode
}

/**
 * PrimarySourceLink - Subtle inline reference to primary sources
 *
 * Designed to feel natural and period-appropriate, not spammy.
 * Uses parchment aesthetic matching the almanac design.
 *
 * @example
 * <PrimarySourceLink
 *   quote="Blount to Knox on territorial agriculture, 1791"
 *   href="/evidence/documents/blount-knox-agriculture-1791"
 *   type="document"
 * />
 */
export function PrimarySourceLink({
  quote,
  href,
  linkText = 'View Source',
  type = 'document',
  icon,
}: PrimarySourceLinkProps) {
  const defaultIcon =
    type === 'document' ? (
      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
    ) : (
      <User className="w-3.5 h-3.5" aria-hidden="true" />
    )

  return (
    <div className="mt-3 pt-3 border-t border-white/5">
      <div className="flex items-start gap-2 text-xs">
        <div className="flex-shrink-0 mt-0.5 text-gold-leaf/60">{icon ?? defaultIcon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-almanac-parchment/50 italic leading-relaxed mb-1.5">
            &ldquo;{quote}&rdquo;
          </p>
          <Link
            href={href}
            className="
              inline-flex items-center gap-1.5
              text-gold-leaf hover:text-almanac-gold
              transition-colors duration-300
              group
            "
          >
            <span className="text-[10px] uppercase tracking-wider font-medium">{linkText}</span>
            <span
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
                text-xs
              "
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
