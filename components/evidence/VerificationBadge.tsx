'use client'

import { useState, useId, useEffect, useCallback } from 'react'
import type { DocumentVerification } from '@/lib/evidence/types'

interface VerificationBadgeProps {
  verification: DocumentVerification
  size?: 'sm' | 'md'
}

const BADGE_CONFIG = {
  verified: {
    label: 'Verified',
    icon: '✓',
    className: 'bg-green-900/30 text-green-400 border-green-500/30',
  },
  'single-source': {
    label: 'Single Source',
    icon: '○',
    className: 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30',
  },
  nuance: {
    label: 'Nuance',
    icon: '⚠',
    className: 'bg-orange-900/20 text-orange-400 border-orange-500/30',
  },
  'under-review': {
    label: 'Under Review',
    icon: '…',
    className: 'bg-gray-900/30 text-gray-400 border-gray-500/30',
  },
}

export function VerificationBadge({ verification, size = 'md' }: VerificationBadgeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const tooltipId = useId()
  const config = BADGE_CONFIG[verification.status]

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

  // Close tooltip on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    },
    [isOpen]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className={`
          inline-flex items-center gap-1.5 rounded-full border
          font-medium cursor-help min-h-[44px] min-w-[44px]
          bg-transparent appearance-none
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-almanac-parchment/50
          ${config.className}
          ${sizeClasses}
        `}
        aria-describedby={tooltipId}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        <span aria-hidden="true">{config.icon}</span>
        <span>{config.label}</span>
      </button>

      {/* Tooltip with details - visible on hover and focus */}
      <div
        id={tooltipId}
        role="tooltip"
        className={`
          absolute top-full right-0 mt-2 w-64 p-3 rounded-lg
          bg-midnight border border-white/10 shadow-xl
          transition-all z-10
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <p className="text-xs text-almanac-parchment/80">
          {verification.source_count} source{verification.source_count !== 1 ? 's' : ''} verified
        </p>
        {verification.method && (
          <p className="text-xs text-almanac-parchment/60 mt-1">{verification.method}</p>
        )}
        {verification.notes && (
          <p className="text-xs text-orange-400/80 mt-2">Note: {verification.notes}</p>
        )}
      </div>
    </div>
  )
}
