'use client'

import { motion } from 'framer-motion'
import { Sun, Eye, Cloud, Droplets, Wind, Snowflake, Gauge } from 'lucide-react'
import { getVisibilityDescription, getUVDescription } from '@/lib/almanac/types'

interface CurrentConditionsCardProps {
  cloudCover?: number
  visibility?: number
  dewPoint?: number
  uvIndex?: number
  pressure?: number
  snowDepth?: number
  windGusts?: number
}

interface ConditionItemProps {
  icon: React.ReactNode
  label: string
  value: string
  sublabel?: string
  highlight?: boolean
  colorClass?: string
}

function ConditionItem({
  icon,
  label,
  value,
  sublabel,
  highlight,
  colorClass,
}: ConditionItemProps) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg ${highlight ? 'bg-blue-900/30 border border-blue-500/20' : 'bg-white/5'}`}
    >
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-almanac-parchment/50 uppercase tracking-wide mb-0.5">{label}</p>
        <p className={`text-lg font-semibold ${colorClass || 'text-almanac-parchment'}`}>{value}</p>
        {sublabel && <p className="text-xs text-almanac-parchment/40 mt-0.5">{sublabel}</p>}
      </div>
    </div>
  )
}

export default function CurrentConditionsCard({
  cloudCover,
  visibility,
  dewPoint,
  uvIndex,
  pressure,
  snowDepth,
  windGusts,
}: CurrentConditionsCardProps) {
  const uv = uvIndex !== undefined ? getUVDescription(uvIndex) : null
  const visDesc = visibility !== undefined ? getVisibilityDescription(visibility) : null
  const visibilityMiles = visibility !== undefined ? (visibility / 1609.34).toFixed(1) : null

  // Only show if we have data
  const hasData =
    cloudCover !== undefined ||
    visibility !== undefined ||
    dewPoint !== undefined ||
    uvIndex !== undefined ||
    snowDepth !== undefined

  if (!hasData) return null

  // Build conditions array in display order
  const conditions: React.ReactNode[] = []

  // Snow Depth - Priority alert if present
  if (snowDepth !== undefined && snowDepth > 0) {
    conditions.push(
      <div key="snow" className="col-span-2">
        <ConditionItem
          icon={<Snowflake className="w-5 h-5 text-blue-400" />}
          label="Snow on Ground"
          value={`${snowDepth.toFixed(1)}"`}
          highlight
          colorClass="text-blue-300"
        />
      </div>
    )
  }

  // UV Index
  if (uv && uvIndex !== undefined) {
    conditions.push(
      <ConditionItem
        key="uv"
        icon={<Sun className={`w-4 h-4 ${uv.color}`} />}
        label="UV Index"
        value={uv.level}
        sublabel={`Index: ${uvIndex.toFixed(0)}`}
        colorClass={uv.color}
      />
    )
  }

  // Cloud Cover
  if (cloudCover !== undefined) {
    conditions.push(
      <ConditionItem
        key="clouds"
        icon={<Cloud className="w-4 h-4 text-almanac-parchment/60" />}
        label="Cloud Cover"
        value={`${Math.round(cloudCover)}%`}
        sublabel={cloudCover < 25 ? 'Clear' : cloudCover < 50 ? 'Partly cloudy' : 'Overcast'}
      />
    )
  }

  // Visibility
  if (visibilityMiles && visDesc) {
    conditions.push(
      <ConditionItem
        key="visibility"
        icon={<Eye className="w-4 h-4 text-almanac-parchment/60" />}
        label="Visibility"
        value={`${visibilityMiles} mi`}
        sublabel={visDesc}
      />
    )
  }

  // Dew Point
  if (dewPoint !== undefined) {
    conditions.push(
      <ConditionItem
        key="dewpoint"
        icon={<Droplets className="w-4 h-4 text-almanac-parchment/60" />}
        label="Dew Point"
        value={`${Math.round(dewPoint)}°F`}
        sublabel={dewPoint > 65 ? 'Humid' : dewPoint > 55 ? 'Comfortable' : 'Dry'}
      />
    )
  }

  // Pressure
  if (pressure !== undefined) {
    const pressureInHg = pressure / 33.864
    conditions.push(
      <ConditionItem
        key="pressure"
        icon={<Gauge className="w-4 h-4 text-almanac-parchment/60" />}
        label="Barometer"
        value={`${pressureInHg.toFixed(2)}"`}
        sublabel={pressureInHg > 30.2 ? 'High' : pressureInHg < 29.8 ? 'Low' : 'Normal'}
      />
    )
  }

  // Wind Gusts - only show if significant
  if (windGusts !== undefined && windGusts > 15) {
    conditions.push(
      <ConditionItem
        key="gusts"
        icon={<Wind className="w-4 h-4 text-yellow-500" />}
        label="Wind Gusts"
        value={`${Math.round(windGusts)} mph`}
        sublabel={windGusts > 30 ? 'Strong' : 'Moderate'}
        colorClass={windGusts > 30 ? 'text-yellow-400' : undefined}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4 h-full card-hover"
    >
      <h3 className="text-sm font-medium text-almanac-gold mb-4">Current Conditions</h3>

      <div className="grid grid-cols-2 gap-3">{conditions}</div>
    </motion.div>
  )
}
