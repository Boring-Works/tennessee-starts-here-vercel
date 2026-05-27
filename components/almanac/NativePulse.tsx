'use client'

import { motion } from 'framer-motion'
import type { NativePulseResult } from '@/lib/almanac/taskScores'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

interface NativePulseProps {
  pulse: NativePulseResult
}

export default function NativePulse({ pulse }: NativePulseProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-6 h-full card-hover"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label={pulse.status}>
            {pulse.icon}
          </span>
          <div>
            <h2 className="font-serif text-xl text-almanac-gold">The Seedkeeper&apos;s Watch</h2>
            <p className="text-sm text-almanac-parchment/60">Native Seed Stratification</p>
          </div>
        </div>
        <InfoPopup content={INFO_CONTENT.nativePulse} iconSize="sm" />
      </div>

      <div className="space-y-4">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className={`text-lg font-medium ${pulse.color}`}>{pulse.status}</span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-almanac-parchment/50 uppercase tracking-wide">
              Season Progress
            </span>
            <span className="text-xs text-almanac-parchment/50">{pulse.progress}%</span>
          </div>
          <div className="relative h-2 bg-almanac-midnight rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pulse.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
              className="absolute h-full bg-gradient-to-r from-almanac-gold/60 to-almanac-gold rounded-full"
            />
          </div>
        </div>

        {/* Tip */}
        <p className="text-almanac-parchment/80 text-sm leading-relaxed">{pulse.tip}</p>

        {/* Heritage Context */}
        <div className="pt-3 border-t border-almanac-gold/10">
          <p className="text-xs text-almanac-parchment/50">
            Tracking Tennessee native plant cycles — the same species settlers relied on for food,
            medicine, and trade since 1775.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
