'use client'

import Link from 'next/link'
import { FileText, User, Calendar, Tag } from 'lucide-react'
import { motion } from 'framer-motion'

interface ArchiveLinkCardProps {
  /** Card title */
  title: string
  /** Brief description of the document/person */
  description: string
  /** Link to the evidence page */
  href: string
  /** Type of source */
  type: 'document' | 'person'
  /** Optional date for documents */
  date?: string
  /** Optional category tag */
  category?: string
  /** Optional icon override */
  icon?: React.ReactNode
}

/**
 * ArchiveLinkCard - Featured card format for archive references
 *
 * Larger, more prominent than PrimarySourceLink.
 * Use for dedicated "From the Archive" sections or featured callouts.
 * Matches Governor's Briefing aesthetic with parchment texture.
 *
 * @example
 * <ArchiveLinkCard
 *   title="Governor Blount's Agricultural Report"
 *   description="Observations on crop yields and soil conditions in the Southwest Territory, 1791"
 *   href="/evidence/documents/blount-agricultural-report-1791"
 *   type="document"
 *   date="May 12, 1791"
 *   category="Agriculture"
 * />
 */
export function ArchiveLinkCard({
  title,
  description,
  href,
  type,
  date,
  category,
  icon,
}: ArchiveLinkCardProps) {
  const defaultIcon =
    type === 'document' ? (
      <FileText className="w-5 h-5" aria-hidden="true" />
    ) : (
      <User className="w-5 h-5" aria-hidden="true" />
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <Link
        href={href}
        className="
          block
          bg-gradient-to-br from-amber-50/10 to-cream/5
          border border-gold-leaf/20
          rounded-sm
          overflow-hidden
          transition-all duration-300
          hover:border-gold-leaf/40
          hover:shadow-lg hover:shadow-gold-leaf/10
          group
        "
      >
        {/* Decorative header bar */}
        <div className="h-1 bg-gradient-to-r from-gold-leaf/40 via-gold-leaf/60 to-gold-leaf/40" />

        {/* Content */}
        <div className="p-4">
          {/* Header with icon */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 text-gold-leaf/70 mt-1">{icon ?? defaultIcon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg text-gold-leaf mb-1 group-hover:text-almanac-gold transition-colors">
                {title}
              </h3>
              {(date || category) && (
                <div className="flex flex-wrap items-center gap-3 text-xs text-almanac-parchment/50">
                  {date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      <span>{date}</span>
                    </div>
                  )}
                  {category && (
                    <div className="flex items-center gap-1">
                      <Tag className="w-3 h-3" aria-hidden="true" />
                      <span className="capitalize">{category}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-almanac-parchment/70 leading-relaxed mb-3">{description}</p>

          {/* Call to action */}
          <div className="flex items-center gap-2 text-gold-leaf group-hover:text-almanac-gold transition-colors">
            <span className="text-xs uppercase tracking-wider font-medium">
              {type === 'document' ? 'Read Document' : 'View Profile'}
            </span>
            <span
              className="
                transition-transform duration-300
                group-hover:translate-x-1
                text-sm
              "
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </div>

        {/* Bottom border */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-leaf/20 to-transparent" />
      </Link>
    </motion.div>
  )
}
