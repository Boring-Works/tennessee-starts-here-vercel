'use client'

import type { MoonData } from '@/lib/almanac/types'
import { motion } from 'framer-motion'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

interface MoonPhaseProps {
  moon: MoonData
}

// Traditional planting by the moon guidance
function getMoonGuidance(phaseName: string): { activity: string; tip: string } {
  const phase = phaseName.toLowerCase()

  if (phase.includes('new')) {
    return {
      activity: 'Plant leafy crops',
      tip: 'Best for lettuce, spinach, cabbage, and above-ground leafy vegetables.',
    }
  }
  if (phase.includes('first quarter') || phase.includes('waxing crescent')) {
    return {
      activity: 'Plant fruiting crops',
      tip: 'Good for tomatoes, peppers, beans, squash—plants that fruit above ground.',
    }
  }
  if (phase.includes('full')) {
    return {
      activity: 'Harvest & preserve',
      tip: 'Best for harvesting, canning, and preserving. Sap is high in plants.',
    }
  }
  if (
    phase.includes('last quarter') ||
    phase.includes('waning') ||
    phase.includes('third quarter')
  ) {
    return {
      activity: 'Plant root crops',
      tip: 'Best for potatoes, carrots, beets, onions—crops that grow underground.',
    }
  }
  return {
    activity: 'General gardening',
    tip: 'Good time for weeding, pruning, and general maintenance.',
  }
}

export function MoonPhase({ moon }: MoonPhaseProps) {
  const illuminationPercent = Math.round(moon.illumination * 100)
  const guidance = getMoonGuidance(moon.phaseName)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4 h-full card-hover"
    >
      {/* Moon visual */}
      <div className="text-center mb-3">
        <motion.span
          className="inline-block text-5xl"
          animate={{ rotate: 360 }}
          transition={{
            duration: 120,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {moon.emoji}
        </motion.span>
      </div>

      {/* Phase name and illumination */}
      <div className="text-center mb-4 relative">
        <div className="absolute top-0 right-0">
          <InfoPopup content={INFO_CONTENT.moonPhase} iconSize="sm" />
        </div>
        <p className="font-serif text-lg text-gold-leaf">{moon.phaseName}</p>
        <p className="text-sm text-almanac-parchment/50">{illuminationPercent}% illuminated</p>
      </div>

      {/* Planting guidance - connected to moon phase */}
      <div className="border-t border-white/10 pt-3">
        <p className="text-xs text-almanac-gold font-medium uppercase tracking-wide mb-1">
          {moon.phaseName}: {guidance.activity}
        </p>
        <p className="text-xs text-almanac-parchment/60 leading-relaxed">{guidance.tip}</p>
      </div>
    </motion.div>
  )
}
