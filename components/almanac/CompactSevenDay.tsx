'use client'

// getWeatherIcon returns a reference to an existing Lucide component, not a new component
// The linter incorrectly flags this as "component creation during render"
/* eslint-disable react-hooks/static-components */

import React, { useState, useMemo } from 'react'
import { Droplets, Wind, Sun, Sunrise, Sunset, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { getWeatherIcon } from '@/lib/almanac/weatherIcons'
import { getWeatherInfo } from '@/lib/almanac/types'

// ============================================
// TYPES
// ============================================

export interface DayForecast {
  day: string // "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
  dayFull?: string // "Monday", "Tuesday", etc.
  date?: string // "Jan 28"
  high: number
  low: number
  code: number // WMO weather code
  precipChance: number
  precipSum?: number // total precipitation in inches
  sunrise?: string
  sunset?: string
  windSpeedMax?: number
  windGustsMax?: number
  uvIndexMax?: number
  feelsLikeMax?: number
  feelsLikeMin?: number
}

interface CompactSevenDayProps {
  days: DayForecast[]
}

// ============================================
// DAY DETAIL MODAL
// ============================================

function DayDetailModal({
  day,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  day: DayForecast
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  const WeatherIcon = getWeatherIcon(day.code)
  const weather = getWeatherInfo(day.code)

  // Handle keyboard navigation in modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev()
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 z-50" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-sm bg-almanac-midnight border border-almanac-gold/30 rounded-lg shadow-2xl z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="day-detail-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-almanac-gold/20">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className="p-1 text-almanac-parchment/50 hover:text-almanac-parchment disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-almanac-midnight"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <div className="text-center">
            <h2 id="day-detail-title" className="font-serif text-lg text-almanac-gold">
              {day.dayFull || day.day}
            </h2>
            {day.date && <p className="text-xs text-almanac-parchment/50">{day.date}</p>}
          </div>
          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className="p-1 text-almanac-parchment/50 hover:text-almanac-parchment disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-almanac-midnight"
            aria-label="Next day"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Main weather */}
          <div className="flex items-center justify-center gap-4">
            <WeatherIcon className="w-16 h-16 text-almanac-gold" />
            <div className="text-center">
              <div className="text-3xl font-bold text-almanac-parchment">
                {Math.round(day.high)}° / {Math.round(day.low)}°
              </div>
              <p className="text-almanac-parchment/70">{weather.condition}</p>
            </div>
          </div>

          {/* Feels like */}
          {(day.feelsLikeMax !== undefined || day.feelsLikeMin !== undefined) && (
            <div className="text-center text-sm text-almanac-parchment/60">
              Feels like {Math.round(day.feelsLikeMax ?? day.high)}° /{' '}
              {Math.round(day.feelsLikeMin ?? day.low)}°
            </div>
          )}

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Precipitation */}
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <div className="text-lg font-semibold text-almanac-parchment">
                {day.precipChance}%
              </div>
              <div className="text-xs text-almanac-parchment/50">Chance of rain</div>
              {day.precipSum !== undefined && day.precipSum > 0 && (
                <div className="text-xs text-blue-400 mt-1">
                  {day.precipSum.toFixed(2)}&quot; expected
                </div>
              )}
            </div>

            {/* Wind */}
            {day.windSpeedMax !== undefined && (
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <Wind className="w-5 h-5 text-almanac-parchment/60 mx-auto mb-1" />
                <div className="text-lg font-semibold text-almanac-parchment">
                  {Math.round(day.windSpeedMax)} mph
                </div>
                <div className="text-xs text-almanac-parchment/50">Max wind</div>
                {day.windGustsMax !== undefined && (
                  <div className="text-xs text-almanac-parchment/40 mt-1">
                    Gusts to {Math.round(day.windGustsMax)} mph
                  </div>
                )}
              </div>
            )}

            {/* UV Index */}
            {day.uvIndexMax !== undefined && (
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <Sun className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <div className="text-lg font-semibold text-almanac-parchment">
                  {Math.round(day.uvIndexMax)}
                </div>
                <div className="text-xs text-almanac-parchment/50">UV Index</div>
                <div className="text-xs text-almanac-parchment/40 mt-1">
                  {day.uvIndexMax <= 2
                    ? 'Low'
                    : day.uvIndexMax <= 5
                      ? 'Moderate'
                      : day.uvIndexMax <= 7
                        ? 'High'
                        : 'Very High'}
                </div>
              </div>
            )}

            {/* Sunrise/Sunset */}
            {(day.sunrise || day.sunset) && (
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="flex justify-center gap-2 mb-1">
                  <Sunrise className="w-4 h-4 text-orange-400" />
                  <Sunset className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-sm font-semibold text-almanac-parchment">
                  {day.sunrise &&
                    new Date(day.sunrise).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                </div>
                <div className="text-sm text-almanac-parchment/70">
                  {day.sunset &&
                    new Date(day.sunset).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-almanac-parchment/40 hover:text-almanac-parchment focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-almanac-midnight"
          aria-label="Close day details"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </>
  )
}

// ============================================
// COMPACT FORECAST COMPONENT
// ============================================

export function CompactSevenDay({ days }: CompactSevenDayProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const previousFocusRef = React.useRef<HTMLElement | null>(null)

  // Show first 7 days in main grid, rest in scrollable overflow
  const mainDays = days.slice(0, 7)
  const extraDays = days.slice(7)
  const hasExtraDays = extraDays.length > 0

  // Split days into weekdays and weekend for visual grouping
  const { weekdays, weekend, weekendStartIndex } = useMemo(() => {
    const weekdayList: { day: DayForecast; originalIndex: number }[] = []
    const weekendList: { day: DayForecast; originalIndex: number }[] = []

    mainDays.forEach((day, index) => {
      const isWeekend = day.day === 'Sa' || day.day === 'Su'
      if (isWeekend) {
        weekendList.push({ day, originalIndex: index })
      } else {
        weekdayList.push({ day, originalIndex: index })
      }
    })

    // Find where weekend starts in the original array
    const startIdx = mainDays.findIndex((d) => d.day === 'Sa' || d.day === 'Su')

    return {
      weekdays: weekdayList,
      weekend: weekendList,
      weekendStartIndex: startIdx >= 0 ? startIdx : mainDays.length,
    }
  }, [mainDays])

  // Helper to render a day button
  const renderDayButton = (day: DayForecast, originalIndex: number, isWeekend: boolean) => {
    const WeatherIcon = getWeatherIcon(day.code)
    const showPrecip = day.precipChance > 20

    return (
      <button
        type="button"
        key={originalIndex}
        onClick={() => {
          previousFocusRef.current = document.activeElement as HTMLElement
          setSelectedIndex(originalIndex)
        }}
        className={`flex flex-col items-center gap-1 py-2 px-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-almanac-midnight ${
          isWeekend ? 'bg-almanac-gold/5' : ''
        }`}
        aria-label={`${day.dayFull || day.day}${day.date ? ` ${day.date}` : ''}, High ${Math.round(day.high)}, Low ${Math.round(day.low)}`}
      >
        {/* Day letter */}
        <span
          className={`text-xs font-medium ${isWeekend ? 'text-almanac-gold/80' : 'text-almanac-parchment/60'}`}
        >
          {day.day}
        </span>

        {/* Weather icon */}
        <WeatherIcon className="w-5 h-5 text-almanac-gold/80" aria-hidden="true" />

        {/* High temp */}
        <span className="text-sm font-semibold text-almanac-parchment">
          {Math.round(day.high)}°
        </span>

        {/* Low temp */}
        <span className="text-xs text-almanac-parchment/50">{Math.round(day.low)}°</span>

        {/* Precip chance (only if >20%) */}
        {showPrecip && (
          <span className="flex items-center gap-0.5 text-xs text-blue-400">
            <Droplets className="w-3 h-3" aria-hidden="true" />
            {day.precipChance}%
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
      {/* Main 7-day grid with weekend grouping */}
      <div className="flex gap-1">
        {/* Weekdays before weekend */}
        {weekdays
          .filter((w) => w.originalIndex < weekendStartIndex)
          .map((w) => renderDayButton(w.day, w.originalIndex, false))}

        {/* Weekend group */}
        {weekend.length > 0 && (
          <div className="flex flex-col">
            {/* Weekend label */}
            <div className="text-center mb-1">
              <span className="text-[10px] text-almanac-gold/60 uppercase tracking-wider">
                Weekend
              </span>
            </div>
            {/* Weekend days in a row with subtle border */}
            <div className="flex gap-1 border border-almanac-gold/20 rounded-md p-0.5 bg-almanac-gold/5">
              {weekend.map((w) => renderDayButton(w.day, w.originalIndex, true))}
            </div>
          </div>
        )}

        {/* Weekdays after weekend */}
        {weekdays
          .filter((w) => w.originalIndex > weekendStartIndex)
          .map((w) => renderDayButton(w.day, w.originalIndex, false))}
      </div>

      {/* Extended forecast (days 8-16) */}
      {hasExtraDays && (
        <>
          <div className="border-t border-white/10 my-2" />
          <div
            className="overflow-x-auto scrollbar-hide"
            role="region"
            aria-label="Extended 8-16 day forecast"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                e.currentTarget.scrollBy({ left: 100, behavior: 'smooth' })
              }
              if (e.key === 'ArrowLeft') {
                e.currentTarget.scrollBy({ left: -100, behavior: 'smooth' })
              }
            }}
          >
            <div className="flex gap-1 min-w-min">
              {extraDays.map((day, index) => {
                const actualIndex = index + 7
                const WeatherIcon = getWeatherIcon(day.code)
                const showPrecip = day.precipChance > 20

                return (
                  <button
                    type="button"
                    key={actualIndex}
                    onClick={() => {
                      previousFocusRef.current = document.activeElement as HTMLElement
                      setSelectedIndex(actualIndex)
                    }}
                    className="flex flex-col items-center gap-1 py-2 px-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-almanac-midnight"
                    aria-label={`${day.dayFull || day.day}${day.date ? ` ${day.date}` : ''}, High ${Math.round(day.high)}, Low ${Math.round(day.low)}`}
                  >
                    <span className="text-xs font-medium text-almanac-parchment/60">{day.day}</span>
                    <WeatherIcon className="w-5 h-5 text-almanac-gold/80" aria-hidden="true" />
                    <span className="text-sm font-semibold text-almanac-parchment">
                      {Math.round(day.high)}°
                    </span>
                    <span className="text-xs text-almanac-parchment/50">
                      {Math.round(day.low)}°
                    </span>
                    {showPrecip && (
                      <span className="flex items-center gap-0.5 text-xs text-blue-400">
                        <Droplets className="w-3 h-3" aria-hidden="true" />
                        {day.precipChance}%
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
          <p className="text-center text-sm text-almanac-gold/70 mt-2 flex items-center justify-center gap-2 font-medium">
            <span>Scroll for {extraDays.length} more days</span>
            <span className="animate-bounce-x inline-block">→</span>
          </p>
        </>
      )}

      {/* Day detail modal */}
      {selectedIndex !== null && days[selectedIndex] && (
        <DayDetailModal
          day={days[selectedIndex]}
          onClose={() => {
            setSelectedIndex(null)
            // Return focus to the button that opened the modal
            if (previousFocusRef.current) {
              previousFocusRef.current.focus()
            }
          }}
          onPrev={() => setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
          onNext={() =>
            setSelectedIndex((prev) => (prev !== null && prev < days.length - 1 ? prev + 1 : prev))
          }
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < days.length - 1}
        />
      )}
    </div>
  )
}
