'use client'

import { motion } from 'framer-motion'
import { Snowflake, Ruler, TrendingDown, AlertTriangle } from 'lucide-react'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

interface SnowConditionsProps {
  snowDepth: number | undefined // inches
  currentTemp: number
  weatherCode: number
}

function getSnowStatus(
  depth: number,
  temp: number
): {
  status: string
  severity: 'light' | 'moderate' | 'heavy' | 'extreme'
  color: string
  bgColor: string
  tip: string
} {
  // Melting conditions
  if (temp > 40 && depth > 0) {
    return {
      status: 'Melting',
      severity: 'light',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900/20 border-cyan-500/30',
      tip: 'Snow is melting. Watch for ice as temperatures drop tonight.',
    }
  }

  if (depth < 1) {
    return {
      status: 'Dusting',
      severity: 'light',
      color: 'text-blue-300',
      bgColor: 'bg-blue-900/15 border-blue-500/20',
      tip: 'Light snow cover. Roads may be slick in shaded areas.',
    }
  }
  if (depth < 3) {
    return {
      status: 'Light Cover',
      severity: 'light',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20 border-blue-500/30',
      tip: 'A few inches on the ground. Allow extra travel time.',
    }
  }
  if (depth < 6) {
    return {
      status: 'Moderate Snow',
      severity: 'moderate',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/25 border-blue-500/40',
      tip: 'Significant accumulation. Shovel walkways, check on livestock.',
    }
  }
  if (depth < 12) {
    return {
      status: 'Heavy Snow',
      severity: 'heavy',
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/30 border-purple-500/40',
      tip: 'Heavy accumulation. Avoid travel if possible. Check roof loads.',
    }
  }
  return {
    status: 'Extreme Snow',
    severity: 'extreme',
    color: 'text-red-400',
    bgColor: 'bg-red-900/30 border-red-500/40',
    tip: 'Dangerous conditions. Stay home. Monitor structures for snow load.',
  }
}

export default function SnowConditions({
  snowDepth,
  currentTemp,
  weatherCode,
}: SnowConditionsProps) {
  // Don't show if no snow
  if (snowDepth === undefined || snowDepth < 0.1) {
    return null
  }

  const { status, severity, color, bgColor, tip } = getSnowStatus(snowDepth, currentTemp)
  const isActivelySnowing = [71, 73, 75, 77, 85, 86].includes(weatherCode)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className={`rounded-lg border p-4 ${bgColor}`}
      role="region"
      aria-label="Snow conditions"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div
            className={`p-2 rounded-full bg-white/10 ${isActivelySnowing ? 'animate-pulse' : ''}`}
          >
            <Snowflake className={`w-6 h-6 ${color}`} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h3 className={`font-medium ${color}`}>
                {status}
                {isActivelySnowing && <span className="ml-2 text-sm">(Snowing Now)</span>}
              </h3>
              {severity === 'heavy' || severity === 'extreme' ? (
                <AlertTriangle className="w-4 h-4 text-orange-400" />
              ) : null}
            </div>
            <InfoPopup content={INFO_CONTENT.snow} iconSize="sm" />
          </div>

          {/* Snow depth measurement */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1 text-almanac-parchment">
              <Ruler className="w-4 h-4 text-almanac-parchment/50" />
              <span className="text-lg font-bold">{snowDepth.toFixed(1)}&quot;</span>
              <span className="text-sm text-almanac-parchment/50">on ground</span>
            </div>
            {currentTemp > 32 && snowDepth > 0 && (
              <div className="flex items-center gap-1 text-cyan-400 text-sm">
                <TrendingDown className="w-4 h-4" />
                <span>Melting</span>
              </div>
            )}
          </div>

          {/* Tip */}
          <p className="text-sm text-almanac-parchment/70">{tip}</p>
        </div>
      </div>

      {/* Visual depth indicator */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-almanac-parchment/40">
          <span>0&quot;</span>
          <div className="flex-1 h-2 bg-almanac-midnight rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (snowDepth / 12) * 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500/60 to-blue-400 rounded-full"
            />
          </div>
          <span>12&quot;+</span>
        </div>
      </div>
    </motion.div>
  )
}
