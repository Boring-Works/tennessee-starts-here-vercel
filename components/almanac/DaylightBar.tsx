'use client'

import { Sunrise, Sunset } from 'lucide-react'
import { useDaylightProgress } from '@/lib/almanac/useClientTime'

interface DaylightBarProps {
  sunrise: string // ISO string
  sunset: string // ISO string
}

export function DaylightBar({ sunrise, sunset }: DaylightBarProps) {
  // Use hydration-safe hook for time-based calculations
  const daylight = useDaylightProgress(sunrise, sunset)

  const sunriseDate = new Date(sunrise)
  const sunsetDate = new Date(sunset)

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div
      className="bg-white/5 border border-white/10 rounded-lg p-3"
      role="region"
      aria-label="Daylight progress"
    >
      {/* Times */}
      <div className="flex items-center justify-between text-xs text-almanac-parchment/70 mb-2">
        <div className="flex items-center gap-1">
          <Sunrise className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
          <span aria-label={`Sunrise at ${formatTime(sunriseDate)}`}>
            {formatTime(sunriseDate)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Sunset className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
          <span aria-label={`Sunset at ${formatTime(sunsetDate)}`}>{formatTime(sunsetDate)}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="h-2 bg-slate-800 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={daylight.isHydrated ? Math.round(daylight.progress) : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Daylight progress through the day"
      >
        <div
          className="h-full bg-gradient-to-r from-orange-400 via-yellow-300 to-purple-400 transition-all duration-1000"
          style={{ width: `${daylight.progress}%` }}
        />
      </div>

      {/* Remaining - only show after hydration and during daytime */}
      {daylight.isHydrated &&
        daylight.isDay &&
        (daylight.remainingHours > 0 || daylight.remainingMinutes > 0) && (
          <p className="text-xs text-center text-almanac-parchment/50 mt-2" aria-live="polite">
            {daylight.remainingHours}h {daylight.remainingMinutes}m of daylight left
          </p>
        )}
    </div>
  )
}
