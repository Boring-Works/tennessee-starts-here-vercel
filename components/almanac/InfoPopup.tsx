'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X } from 'lucide-react'

// ============================================
// TYPES
// ============================================

export interface InfoContent {
  title: string
  scale?: { label: string; value: string; color: string }[]
  whyItMatters: string
  source: string
  updateFrequency?: string
}

interface InfoPopupProps {
  content: InfoContent
  iconSize?: 'sm' | 'md'
}

// ============================================
// INFO POPUP COMPONENT
// ============================================

export function InfoPopup({ content, iconSize = 'sm' }: InfoPopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  const iconClassName = iconSize === 'sm' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center text-almanac-parchment/40 hover:text-almanac-gold transition-colors -m-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-almanac-gold active:scale-95"
        aria-label={`Learn more about ${content.title}`}
      >
        <Info className={iconClassName} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && <InfoModal content={content} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

// ============================================
// MODAL COMPONENT
// ============================================

interface InfoModalProps {
  content: InfoContent
  onClose: () => void
}

function InfoModal({ content, onClose }: InfoModalProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 z-[70]"
      />

      {/* Mobile: Bottom sheet / Desktop: Centered modal */}
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full md:mx-4 bg-midnight border border-almanac-gold/30 rounded-t-2xl md:rounded-lg shadow-2xl z-[70] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-almanac-gold/20">
          <h2 className="font-serif text-xl text-gold-leaf">{content.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-almanac-parchment/40 hover:text-almanac-parchment transition-colors -m-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-almanac-gold active:scale-95"
            aria-label="Close"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 max-h-[70vh] overflow-y-auto space-y-5">
          {/* Scale Legend (optional) */}
          {content.scale && content.scale.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-almanac-gold mb-2">Scale</h3>
              <div className="space-y-2">
                {content.scale.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span
                      className="text-sm font-mono font-bold w-12"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </span>
                    <span className="text-sm text-almanac-parchment/70">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why It Matters */}
          <div>
            <h3 className="text-sm font-semibold text-almanac-gold mb-2">Why It Matters</h3>
            <p className="text-sm text-almanac-parchment/80 leading-relaxed">
              {content.whyItMatters}
            </p>
          </div>

          {/* Source & Frequency */}
          <div className="pt-3 border-t border-almanac-gold/10">
            <p className="text-xs text-almanac-parchment/40">
              <span className="font-medium">Source:</span> {content.source}
              {content.updateFrequency && (
                <>
                  {' '}
                  <span className="mx-1">|</span> <span className="font-medium">Updates:</span>{' '}
                  {content.updateFrequency}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Mobile drag indicator */}
        <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-almanac-parchment/20 rounded-full" />
      </motion.div>
    </>
  )
}
