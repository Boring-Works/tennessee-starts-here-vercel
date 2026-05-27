'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CollapsibleDeckProps {
  title: string
  icon?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
  badge?: string | number
}

export function CollapsibleDeck({
  title,
  icon,
  defaultOpen = false,
  children,
  badge,
}: CollapsibleDeckProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = `collapsible-${title.toLowerCase().replace(/\s+/g, '-')}-content`

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      {/* Header - always visible */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full min-h-[44px] flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-almanac-gold active:bg-white/15"
      >
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-almanac-gold" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="font-medium text-almanac-parchment">{title}</span>
          {badge !== undefined && (
            <span className="text-xs px-2 py-0.5 bg-almanac-gold/20 text-almanac-gold rounded-full">
              {badge}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-almanac-parchment/50" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 text-almanac-parchment/50" aria-hidden="true" />
        )}
      </button>

      {/* Content - collapsible with staggered animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, staggerChildren: 0.05 }}
          >
            <div className="p-4 border-t border-white/10">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
