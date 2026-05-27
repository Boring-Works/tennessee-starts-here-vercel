'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X } from 'lucide-react'

// ============================================
// SCORE EXPLANATIONS
// ============================================

export interface ScoreExplanation {
  title: string
  subtitle: string
  description: string
  whoItsFor: string[]
  howItsCalculated: string[]
  scoreGuide: {
    range: string
    meaning: string
  }[]
}

export const SCORE_EXPLANATIONS: Record<string, ScoreExplanation> = {
  sower: {
    title: "Sower's Index",
    subtitle: 'Gardening & Planting',
    description:
      "Rates today's conditions for outdoor gardening work—planting, transplanting, weeding, and soil work.",
    whoItsFor: [
      'Home gardeners planning planting days',
      'Landscapers scheduling outdoor work',
      'Farmers deciding on field work',
      'Anyone starting seeds or transplants',
    ],
    howItsCalculated: [
      'Soil temperature (most important for seed germination)',
      'Air temperature (transplant stress)',
      'Rain probability and current precipitation',
      'Wind speed (damages young plants)',
      'Ground saturation (compaction risk)',
    ],
    scoreGuide: [
      { range: '9-10', meaning: 'Perfect conditions—plant anything' },
      { range: '7-8', meaning: 'Good day, minor considerations' },
      { range: '5-6', meaning: 'Workable with caution' },
      { range: '3-4', meaning: 'Poor—delay if possible' },
      { range: '1-2', meaning: 'Avoid—conditions will harm plants' },
    ],
  },

  shepherd: {
    title: 'Outdoor Alert',
    subtitle: 'Pets, Kids & Livestock',
    description: 'Rates safety for extended outdoor time—walks, play, yard work, and animal care.',
    whoItsFor: [
      'Pet owners planning walks or outdoor time',
      'Parents with children who play outside',
      'Livestock and farm animal owners',
      'Anyone working outdoors for extended periods',
    ],
    howItsCalculated: [
      'Heat Index (combines temp + humidity for heat stress)',
      'Wind Chill (cold + wind = frostbite risk)',
      'Precipitation (wet conditions)',
      'Freezing rain detection (extremely dangerous)',
      'High wind warnings',
    ],
    scoreGuide: [
      { range: '9-10', meaning: 'Safe for extended outdoor time' },
      { range: '7-8', meaning: 'Good with basic precautions' },
      { range: '5-6', meaning: 'Limit time, watch for stress signs' },
      { range: '3-4', meaning: 'Brief trips only—risk of harm' },
      { range: '1-2', meaning: 'Stay inside—dangerous conditions' },
    ],
  },

  keeper: {
    title: "Keeper's Gauge",
    subtitle: 'Property Maintenance',
    description:
      'Rates conditions for exterior home maintenance—painting, staining, repairs, and outdoor projects.',
    whoItsFor: [
      'Homeowners doing DIY exterior work',
      'Painters and contractors',
      'Anyone applying finishes (paint, stain, sealant)',
      'Gutter cleaning, roof work, ladder tasks',
    ],
    howItsCalculated: [
      "Dew point spread (paint won't cure if too humid)",
      'Rain probability (obvious)',
      'Wind gusts (ladder safety, overspray)',
      'Temperature (most paints need 50°F+)',
      'Humidity levels (affects dry time)',
    ],
    scoreGuide: [
      { range: '9-10', meaning: 'Ideal—finishes will cure perfectly' },
      { range: '7-8', meaning: 'Good, watch timing' },
      { range: '5-6', meaning: 'Prep work only, no finishes' },
      { range: '3-4', meaning: 'Interior work or planning' },
      { range: '1-2', meaning: 'Unsafe—stay off ladders' },
    ],
  },

  builder: {
    title: "Builder's Grade",
    subtitle: 'Construction & Heavy Work',
    description:
      'Rates conditions for construction, heavy labor, and professional outdoor work using OSHA guidelines.',
    whoItsFor: [
      'Construction workers and contractors',
      'Roofers, framers, concrete crews',
      'Landscaping heavy equipment operators',
      'Anyone doing strenuous outdoor labor',
    ],
    howItsCalculated: [
      'Heat Index (OSHA heat illness thresholds)',
      'Wind Chill (OSHA cold stress guidelines)',
      'Wind gusts (crane and scaffold safety)',
      'Precipitation (site safety)',
      'Ground conditions (equipment operation)',
    ],
    scoreGuide: [
      { range: '9-10', meaning: 'Full productivity, no restrictions' },
      { range: '7-8', meaning: 'Good, standard safety protocols' },
      { range: '5-6', meaning: 'Work with mandatory breaks' },
      { range: '3-4', meaning: 'Reduced crews, limited tasks' },
      { range: '1-2', meaning: 'Site closed—unsafe conditions' },
    ],
  },
}

// ============================================
// INFO BUTTON COMPONENT
// ============================================

interface InfoButtonProps {
  scoreKey: string
  size?: 'sm' | 'md'
}

export function InfoButton({ scoreKey, size = 'sm' }: InfoButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const explanation = SCORE_EXPLANATIONS[scoreKey]

  if (!explanation) return null

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center text-almanac-parchment/40 hover:text-almanac-gold transition-colors -m-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-almanac-gold active:scale-95"
        aria-label={`Learn more about ${explanation.title}`}
      >
        <Info className={iconSize} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && <ScoreModal explanation={explanation} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

// ============================================
// MODAL COMPONENT
// ============================================

interface ScoreModalProps {
  explanation: ScoreExplanation
  onClose: () => void
}

function ScoreModal({ explanation, onClose }: ScoreModalProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full bg-midnight border border-almanac-gold/30 rounded-lg shadow-2xl z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-almanac-gold/20">
          <div>
            <h2 className="font-serif text-xl text-gold-leaf">{explanation.title}</h2>
            <p className="text-sm text-almanac-parchment/60">{explanation.subtitle}</p>
          </div>
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
          {/* Description */}
          <p className="text-almanac-parchment/80 leading-relaxed">{explanation.description}</p>

          {/* Who It's For */}
          <div>
            <h3 className="text-sm font-semibold text-almanac-gold mb-2">Who It&apos;s For</h3>
            <ul className="space-y-1">
              {explanation.whoItsFor.map((item, i) => (
                <li key={i} className="text-sm text-almanac-parchment/70 flex items-start gap-2">
                  <span className="text-almanac-gold/60 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* How It's Calculated */}
          <div>
            <h3 className="text-sm font-semibold text-almanac-gold mb-2">What We Measure</h3>
            <ul className="space-y-1">
              {explanation.howItsCalculated.map((item, i) => (
                <li key={i} className="text-sm text-almanac-parchment/70 flex items-start gap-2">
                  <span className="text-almanac-gold/60 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Score Guide */}
          <div>
            <h3 className="text-sm font-semibold text-almanac-gold mb-2">Score Guide</h3>
            <div className="space-y-2">
              {explanation.scoreGuide.map((guide, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className={`text-sm font-mono font-bold w-12 ${
                      i === 0
                        ? 'text-green-400'
                        : i === 1
                          ? 'text-green-400/80'
                          : i === 2
                            ? 'text-yellow-400'
                            : i === 3
                              ? 'text-orange-400'
                              : 'text-red-400'
                    }`}
                  >
                    {guide.range}
                  </span>
                  <span className="text-sm text-almanac-parchment/70">{guide.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Source */}
          <div className="pt-3 border-t border-almanac-gold/10">
            <p className="text-xs text-almanac-parchment/40">
              Calculations use NOAA heat index, NWS wind chill, and OSHA workplace safety
              guidelines. Weather data from Open-Meteo.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

// ============================================
// MAIN SECTION EXPLAINER (optional header button)
// ============================================

export function WorkabilityExplainer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-sm text-almanac-parchment/50 hover:text-almanac-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-almanac-gold active:scale-95"
      >
        <Info className="w-4 h-4" aria-hidden="true" />
        <span>What are these?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full bg-midnight border border-almanac-gold/30 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-start justify-between p-4 border-b border-almanac-gold/20">
                <h2 className="font-serif text-xl text-gold-leaf">Today&apos;s Workability</h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-almanac-parchment/40 hover:text-almanac-parchment transition-colors -m-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-almanac-gold active:scale-95"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <p className="text-almanac-parchment/80 leading-relaxed">
                  Workability scores rate today&apos;s weather conditions for different outdoor
                  activities on a scale of 1-10.
                </p>

                <p className="text-almanac-parchment/70 text-sm leading-relaxed">
                  Unlike a simple forecast, these scores combine multiple weather
                  factors—temperature, humidity, wind, precipitation probability—into actionable
                  guidance.
                </p>

                <p className="text-almanac-parchment/70 text-sm leading-relaxed">
                  Tap the <Info className="w-3.5 h-3.5 inline text-almanac-gold/60" /> icon on any
                  score card to learn exactly what it measures and who it&apos;s designed for.
                </p>

                <div className="pt-3 border-t border-almanac-gold/10">
                  <p className="text-xs text-almanac-parchment/40">
                    Calculations based on NOAA, NWS, and OSHA guidelines.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
