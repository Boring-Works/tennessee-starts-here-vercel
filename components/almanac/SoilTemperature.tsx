'use client'

import { motion } from 'framer-motion'
import { Sprout, Snowflake, Sun, Thermometer } from 'lucide-react'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

interface SoilTemperatureProps {
  temperature: number | undefined
}

// Matches taskScores.ts logic exactly
function getSoilStatus(temp: number): {
  status: string
  color: string
  bgColor: string
  tip: string
  icon: 'snowflake' | 'sprout' | 'sun' | 'thermometer'
  plantable: string[]
} {
  if (temp < 35) {
    return {
      status: 'Frozen',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20 border-blue-500/30',
      tip: 'Ground is frozen. No planting possible.',
      icon: 'snowflake',
      plantable: [],
    }
  }
  if (temp < 40) {
    return {
      status: 'Very Cold',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900/20 border-cyan-500/30',
      tip: 'Only very hardy seeds like garlic or cover crops.',
      icon: 'snowflake',
      plantable: ['Garlic', 'Cover crops'],
    }
  }
  if (temp < 50) {
    // 40-50°F: Cool season crops OK - matches taskScores.ts
    return {
      status: 'Cool Season',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-900/20 border-emerald-500/30',
      tip: 'Good for cool-season crops. Prime time for early planting.',
      icon: 'sprout',
      plantable: ['Peas', 'Lettuce', 'Spinach', 'Kale', 'Onion sets', 'Radishes'],
    }
  }
  if (temp < 60) {
    return {
      status: 'Warming',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20 border-green-500/30',
      tip: 'Expanding planting options. Most cool-season plus early beans.',
      icon: 'sprout',
      plantable: ['Beans', 'Beets', 'Carrots', 'Corn', 'Potatoes'],
    }
  }
  if (temp < 70) {
    return {
      status: 'Ideal',
      color: 'text-green-400',
      bgColor: 'bg-green-900/15 border-green-500/20',
      tip: 'Prime planting conditions for warm-season crops.',
      icon: 'sun',
      plantable: ['Tomatoes', 'Peppers', 'Squash', 'Cucumbers', 'Melons'],
    }
  }
  if (temp < 85) {
    return {
      status: 'Warm',
      color: 'text-amber-400',
      bgColor: 'bg-amber-900/20 border-amber-500/30',
      tip: 'Excellent for heat-loving crops.',
      icon: 'sun',
      plantable: ['Sweet potatoes', 'Okra', 'Southern peas', 'Watermelon'],
    }
  }
  return {
    status: 'Hot',
    color: 'text-red-400',
    bgColor: 'bg-red-900/20 border-red-500/30',
    tip: 'Soil is very hot. Mulch heavily to retain moisture.',
    icon: 'thermometer',
    plantable: [],
  }
}

const iconMap = {
  snowflake: Snowflake,
  sprout: Sprout,
  sun: Sun,
  thermometer: Thermometer,
}

export default function SoilTemperature({ temperature }: SoilTemperatureProps) {
  if (temperature === undefined) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4"
        role="region"
        aria-label="Soil temperature"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-almanac-gold/10">
            <Sprout className="w-6 h-6 text-almanac-gold/50" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-almanac-parchment/50">Soil Temperature</p>
            <p className="text-xs text-almanac-parchment/40">Data unavailable for this location</p>
          </div>
        </div>
      </motion.div>
    )
  }

  const { status, color, bgColor, tip, icon, plantable } = getSoilStatus(temperature)
  const Icon = iconMap[icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className={`rounded-lg p-4 border card-hover ${bgColor}`}
      role="region"
      aria-label={`Soil temperature: ${Math.round(temperature)} degrees Fahrenheit, ${status}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-almanac-gold/10">
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-almanac-parchment">
                {Math.round(temperature)}°F
              </span>
              <span className={`text-sm font-medium ${color}`}>{status}</span>
            </div>
            <InfoPopup content={INFO_CONTENT.soilTemp} iconSize="sm" />
          </div>
          <p className="text-xs text-almanac-parchment/60">Soil Temperature (6&quot; depth)</p>
        </div>
      </div>

      <p className="text-sm text-almanac-parchment/70 mt-3">{tip}</p>

      {/* Plantable crops list */}
      {plantable.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-almanac-parchment/50 mb-2">Can plant now:</p>
          <div className="flex flex-wrap gap-1">
            {plantable.map((crop) => (
              <span
                key={crop}
                className="text-xs px-2 py-0.5 rounded bg-white/5 text-almanac-parchment/70"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
