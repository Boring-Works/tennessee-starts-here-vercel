'use client'

import { Snowflake, ThermometerSnowflake, Check } from 'lucide-react'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

// Future: Allow custom frost dates per location
// interface FrostCountdownProps {
//   lastFrostDate?: { month: number; day: number }
// }

// Sullivan County, TN frost dates (Zone 7a)
// Average last frost: April 15
// Average first frost: October 15
const SULLIVAN_COUNTY_FROST = {
  lastFrost: { month: 4, day: 15 }, // April 15
  firstFrost: { month: 10, day: 15 }, // October 15
  variance: 14, // ±14 days typical variance
}

function getDaysUntilDate(targetMonth: number, targetDay: number): number {
  const now = new Date()
  const currentYear = now.getFullYear()

  // Create target date for this year
  let targetDate = new Date(currentYear, targetMonth - 1, targetDay)

  // If the date has passed this year, use next year
  if (targetDate < now) {
    targetDate = new Date(currentYear + 1, targetMonth - 1, targetDay)
  }

  const diffTime = targetDate.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function getDaysSinceDate(targetMonth: number, targetDay: number): number {
  const now = new Date()
  const currentYear = now.getFullYear()

  // Create target date for this year
  let targetDate = new Date(currentYear, targetMonth - 1, targetDay)

  // If the date is in the future, use last year
  if (targetDate > now) {
    targetDate = new Date(currentYear - 1, targetMonth - 1, targetDay)
  }

  const diffTime = now.getTime() - targetDate.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

type FrostPhase = 'before-last' | 'safe-season' | 'before-first' | 'frost-season'

function getFrostPhase(): {
  phase: FrostPhase
  daysUntilLastFrost: number
  daysSinceLastFrost: number
  daysUntilFirstFrost: number
} {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-indexed
  const day = now.getDate()

  const { lastFrost, firstFrost } = SULLIVAN_COUNTY_FROST

  const daysUntilLastFrost = getDaysUntilDate(lastFrost.month, lastFrost.day)
  const daysSinceLastFrost = getDaysSinceDate(lastFrost.month, lastFrost.day)
  const daysUntilFirstFrost = getDaysUntilDate(firstFrost.month, firstFrost.day)

  // Determine phase based on current date
  // Jan 1 - April 15: before-last (waiting for last frost)
  // April 16 - Sept 15: safe-season (frost-free growing)
  // Sept 16 - Oct 15: before-first (fall frost approaching)
  // Oct 16 - Dec 31: frost-season (winter frost risk)

  if (month < lastFrost.month || (month === lastFrost.month && day <= lastFrost.day)) {
    return { phase: 'before-last', daysUntilLastFrost, daysSinceLastFrost, daysUntilFirstFrost }
  }
  if (month < 9 || (month === 9 && day <= 15)) {
    return { phase: 'safe-season', daysUntilLastFrost, daysSinceLastFrost, daysUntilFirstFrost }
  }
  if (month < firstFrost.month || (month === firstFrost.month && day <= firstFrost.day)) {
    return { phase: 'before-first', daysUntilLastFrost, daysSinceLastFrost, daysUntilFirstFrost }
  }
  return { phase: 'frost-season', daysUntilLastFrost, daysSinceLastFrost, daysUntilFirstFrost }
}

export default function FrostCountdown() {
  const frostData = getFrostPhase()
  const { phase, daysUntilLastFrost, daysSinceLastFrost, daysUntilFirstFrost } = frostData
  const variance = SULLIVAN_COUNTY_FROST.variance

  const renderContent = () => {
    switch (phase) {
      case 'before-last':
        return (
          <>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Snowflake className="w-5 h-5 text-blue-400" />
              <span className="text-2xl font-bold text-almanac-parchment">
                {daysUntilLastFrost}
              </span>
              <span className="text-sm text-almanac-parchment/70">days</span>
            </div>
            <p className="text-xs text-almanac-parchment/60 text-center">
              to average last frost
              <br />
              <span className="text-almanac-parchment/40">(April 15 ± {variance} days)</span>
            </p>
            {daysUntilLastFrost <= 30 && (
              <div className="mt-3 px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300 text-center">
                Frost risk still present
              </div>
            )}
          </>
        )

      case 'safe-season':
        return (
          <>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-lg font-bold text-green-400">Frost-Free</span>
            </div>
            <p className="text-xs text-almanac-parchment/60 text-center">
              {daysSinceLastFrost} days since last frost
              <br />
              {daysUntilFirstFrost} days until first fall frost
            </p>
            <div className="mt-3 w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (daysSinceLastFrost / (daysSinceLastFrost + daysUntilFirstFrost)) * 100)}%`,
                }}
              />
            </div>
            <p className="text-[10px] text-almanac-parchment/40 mt-1 text-center">Growing season</p>
          </>
        )

      case 'before-first':
        return (
          <>
            <div className="flex items-center justify-center gap-2 mb-2">
              <ThermometerSnowflake className="w-5 h-5 text-orange-400" />
              <span className="text-2xl font-bold text-almanac-parchment">
                {daysUntilFirstFrost}
              </span>
              <span className="text-sm text-almanac-parchment/70">days</span>
            </div>
            <p className="text-xs text-almanac-parchment/60 text-center">
              to average first frost
              <br />
              <span className="text-almanac-parchment/40">(October 15 ± {variance} days)</span>
            </p>
            <div className="mt-3 px-2 py-1 bg-orange-500/20 rounded text-xs text-orange-300 text-center">
              Prepare tender plants
            </div>
          </>
        )

      case 'frost-season':
        return (
          <>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Snowflake className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="text-lg font-bold text-blue-400">Frost Season</span>
            </div>
            <p className="text-xs text-almanac-parchment/60 text-center">
              {daysUntilLastFrost} days until spring
              <br />
              <span className="text-almanac-parchment/40">(Next frost-free: April 15)</span>
            </p>
            <div className="mt-3 px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300 text-center">
              Protect sensitive plants
            </div>
          </>
        )
    }
  }

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ThermometerSnowflake className="w-4 h-4 text-almanac-gold" />
          <h3 className="text-sm font-medium text-almanac-parchment uppercase tracking-wide">
            Frost Dates
          </h3>
        </div>
        <InfoPopup content={INFO_CONTENT.frostCountdown} iconSize="sm" />
      </div>

      <div className="flex flex-col items-center">{renderContent()}</div>
    </div>
  )
}
