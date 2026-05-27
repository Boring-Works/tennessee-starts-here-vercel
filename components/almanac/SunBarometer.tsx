'use client'

import { motion } from 'framer-motion'
import {
  Sunrise,
  Sunset,
  Gauge,
  TrendingUp,
  TrendingDown,
  Minus,
  Wind,
  Compass,
} from 'lucide-react'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

interface SunBarometerProps {
  sunrise: string
  sunset: string
  pressure: number // hPa/mbar
  windSpeed: number
  windDirection: number
}

// Convert degrees to cardinal direction
function getWindDirection(degrees: number): string {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ]
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

// Interpret barometric pressure for weather prediction
function getPressureForecast(pressure: number): {
  trend: 'rising' | 'falling' | 'steady'
  forecast: string
  icon: typeof TrendingUp | typeof TrendingDown | typeof Minus
} {
  // Standard pressure at sea level is ~1013 hPa
  // High pressure (>1020) = fair weather
  // Low pressure (<1000) = stormy
  // Very low (<980) = severe storms

  if (pressure >= 1020) {
    return {
      trend: 'rising',
      forecast: 'Fair weather likely. High pressure system.',
      icon: TrendingUp,
    }
  }
  if (pressure >= 1010) {
    return {
      trend: 'steady',
      forecast: 'Stable conditions. Weather holding.',
      icon: Minus,
    }
  }
  if (pressure >= 1000) {
    return {
      trend: 'falling',
      forecast: 'Change coming. Watch for weather.',
      icon: TrendingDown,
    }
  }
  return {
    trend: 'falling',
    forecast: 'Storm approaching. Low pressure system.',
    icon: TrendingDown,
  }
}

// Format time from ISO string
function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

// Calculate daylight hours
function getDaylightHours(sunrise: string, sunset: string): string {
  const sunriseDate = new Date(sunrise)
  const sunsetDate = new Date(sunset)
  const diffMs = sunsetDate.getTime() - sunriseDate.getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
}

export default function SunBarometer({
  sunrise,
  sunset,
  pressure,
  windSpeed,
  windDirection,
}: SunBarometerProps) {
  const { trend, forecast, icon: TrendIcon } = getPressureForecast(pressure)
  const windDir = getWindDirection(windDirection)
  const daylight = getDaylightHours(sunrise, sunset)

  const trendColor =
    trend === 'rising'
      ? 'text-green-400'
      : trend === 'falling'
        ? 'text-orange-400'
        : 'text-almanac-parchment/60'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4 h-full card-hover"
    >
      {/* Info button in top-right corner */}
      <div className="flex justify-end mb-2">
        <InfoPopup content={INFO_CONTENT.sunBarometer} iconSize="sm" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Sun Times */}
        <div>
          <h4 className="text-xs text-almanac-gold font-medium uppercase tracking-wide mb-3">
            Daylight
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sunrise className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-almanac-parchment">{formatTime(sunrise)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sunset className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-almanac-parchment">{formatTime(sunset)}</span>
            </div>
            <div className="text-xs text-almanac-parchment/50 mt-1">{daylight} of daylight</div>
          </div>
        </div>

        {/* Barometer - displayed in inHg for US audience (standard: 29.92") */}
        <div>
          <h4 className="text-xs text-almanac-gold font-medium uppercase tracking-wide mb-3">
            Barometer
          </h4>
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="w-4 h-4 text-almanac-parchment/60" />
            <span className="text-lg font-bold text-almanac-parchment">
              {(pressure / 33.864).toFixed(2)}
            </span>
            <span className="text-xs text-almanac-parchment/50">inHg</span>
            <TrendIcon className={`w-4 h-4 ${trendColor}`} />
          </div>
          <p className="text-xs text-almanac-parchment/60 leading-relaxed">{forecast}</p>
        </div>
      </div>

      {/* Wind */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <h4 className="text-xs text-almanac-gold font-medium uppercase tracking-wide mb-2">Wind</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-almanac-parchment/60" />
            <span className="text-sm text-almanac-parchment">{Math.round(windSpeed)} mph</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-almanac-parchment/60">
            <Compass className="w-4 h-4" />
            <span>from {windDir}</span>
            <span className="text-xs">({Math.round(windDirection)}°)</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
