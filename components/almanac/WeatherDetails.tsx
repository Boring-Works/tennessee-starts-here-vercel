'use client'

import { motion } from 'framer-motion'
import type { DailyForecast } from '@/lib/almanac/types'
import { getWeatherInfo, isSnowCode, isIceCode, getUVDescription } from '@/lib/almanac/types'
import { getWeatherIcon } from '@/lib/almanac/weatherIcons'
import {
  isDateToday,
  isDateTomorrow,
  getWeekdayName,
  findTodayDailyIndex,
} from '@/lib/almanac/dateUtils'
import { Snowflake, AlertTriangle, Wind, Sun } from 'lucide-react'

interface WeatherDetailsProps {
  daily: DailyForecast
}

function getDayAlertLevel(
  weatherCode: number,
  precipProb: number,
  minTemp: number
): 'danger' | 'warning' | 'normal' {
  const isSnow = isSnowCode(weatherCode)
  const isIce = isIceCode(weatherCode)

  if ((isSnow || isIce) && precipProb >= 60) return 'danger'
  if (minTemp <= 10) return 'danger'
  if ((isSnow || isIce) && precipProb >= 30) return 'warning'
  if (precipProb >= 70) return 'warning'
  if (minTemp <= 25) return 'warning'

  return 'normal'
}

function getAlertStyle(level: 'danger' | 'warning' | 'normal'): string {
  switch (level) {
    case 'danger':
      return 'bg-red-900/30 border-red-500/40'
    case 'warning':
      return 'bg-orange-900/20 border-orange-500/30'
    default:
      return 'bg-white/5 border-white/10'
  }
}

export function WeatherDetails({ daily }: WeatherDetailsProps) {
  // Find today's index in the daily array using centralized utility
  const todayIndex = findTodayDailyIndex(daily.time)
  const futureDays = daily.time.slice(todayIndex, todayIndex + 7)

  return (
    <section className="py-4 h-full">
      {/* 7-Day Outlook */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="font-serif text-xl text-gold-leaf mb-4">7-Day Outlook</h3>
        <div className="space-y-2">
          {futureDays.map((time, displayIndex) => {
            const actualIndex = todayIndex + displayIndex

            // Determine day name using the date string directly
            let dayName: string
            if (isDateToday(time)) {
              dayName = 'Today'
            } else if (isDateTomorrow(time)) {
              dayName = 'Tmrw'
            } else {
              dayName = getWeekdayName(time)
            }

            const weather = getWeatherInfo(daily.weatherCode[actualIndex])
            const DayIcon = getWeatherIcon(daily.weatherCode[actualIndex])
            const precipProb = daily.precipitationProbability[actualIndex]
            const minTemp = daily.temperatureMin[actualIndex]
            const maxTemp = daily.temperatureMax[actualIndex]
            const snowfall = daily.snowfallSum?.[actualIndex]
            const gustMax = daily.windGustsMax?.[actualIndex]
            const uvMax = daily.uvIndexMax?.[actualIndex]

            const isSnow = isSnowCode(daily.weatherCode[actualIndex])
            const isIce = isIceCode(daily.weatherCode[actualIndex])
            const alertLevel = getDayAlertLevel(daily.weatherCode[actualIndex], precipProb, minTemp)
            const cardStyle = getAlertStyle(alertLevel)
            const hasSnowfall = (snowfall ?? 0) > 0
            const hasHighWind = (gustMax ?? 0) > 40

            return (
              <div key={time} className={`rounded-sm p-3 border transition-all ${cardStyle}`}>
                <div className="flex items-center justify-between">
                  <span className="text-almanac-parchment w-14 flex items-center gap-1">
                    {dayName}
                    {alertLevel === 'danger' && <AlertTriangle className="w-3 h-3 text-red-400" />}
                  </span>

                  <div className="relative flex items-center gap-1">
                    <DayIcon className="w-5 h-5 text-almanac-gold/80" />
                    {(isSnow || isIce || hasSnowfall) && (
                      <Snowflake className="w-3 h-3 text-blue-400" />
                    )}
                    {hasHighWind && <Wind className="w-3 h-3 text-amber-400" />}
                  </div>

                  <span
                    className={`text-sm flex-1 text-center ${
                      alertLevel === 'danger'
                        ? 'text-red-300 font-medium'
                        : alertLevel === 'warning'
                          ? 'text-orange-300'
                          : 'text-almanac-parchment/70'
                    }`}
                  >
                    {weather.condition}
                    {hasSnowfall && (snowfall ?? 0) >= 1 && (
                      <span className="ml-1 text-blue-400">({snowfall?.toFixed(1)}&quot;)</span>
                    )}
                  </span>

                  <span
                    className={`text-sm w-12 text-right ${
                      precipProb >= 70
                        ? 'text-blue-400 font-medium'
                        : precipProb >= 50
                          ? 'text-blue-300'
                          : 'text-almanac-parchment/50'
                    }`}
                  >
                    {precipProb}%
                  </span>

                  <span className="font-sans font-bold w-24 text-right">
                    <span className="text-almanac-parchment">{Math.round(maxTemp)}°</span>
                    <span className="text-almanac-parchment/50"> / </span>
                    <span
                      className={`${minTemp <= 25 ? 'text-blue-400' : minTemp <= 32 ? 'text-cyan-400' : 'text-almanac-parchment/70'}`}
                    >
                      {Math.round(minTemp)}°
                    </span>
                  </span>
                </div>

                {(hasHighWind ||
                  (uvMax !== undefined && uvMax > 7) ||
                  (hasSnowfall && (snowfall ?? 0) >= 2)) && (
                  <div className="flex items-center gap-4 mt-2 pt-2 border-t border-white/5 text-xs text-almanac-parchment/50">
                    {hasHighWind && gustMax && (
                      <span className="flex items-center gap-1">
                        <Wind className="w-3 h-3 text-amber-400" />
                        Gusts to {Math.round(gustMax)} mph
                      </span>
                    )}
                    {uvMax !== undefined && uvMax > 7 && (
                      <span className="flex items-center gap-1">
                        <Sun className="w-3 h-3 text-orange-400" />
                        UV {getUVDescription(uvMax).level}
                      </span>
                    )}
                    {hasSnowfall && (snowfall ?? 0) >= 2 && (
                      <span className="flex items-center gap-1 text-blue-300">
                        <Snowflake className="w-3 h-3" />
                        {snowfall?.toFixed(1)}&quot; accumulation
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-almanac-parchment/40">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-900/50 border border-red-500/50" />
            Significant weather
          </span>
          <span className="flex items-center gap-1">
            <Snowflake className="w-3 h-3 text-blue-400" />
            Snow/ice
          </span>
          <span className="flex items-center gap-1">
            <Wind className="w-3 h-3 text-amber-400" />
            High wind
          </span>
        </div>
      </motion.div>
    </section>
  )
}
