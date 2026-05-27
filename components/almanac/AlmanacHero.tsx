'use client'

// getWeatherIcon returns a reference to an existing Lucide component, not a new component
// The linter incorrectly flags this as "component creation during render"
/* eslint-disable react-hooks/static-components */

import { useState, useEffect } from 'react'
import { getWeatherInfo, isSnowCode, isIceCode } from '@/lib/almanac/types'
import { getWeatherIcon } from '@/lib/almanac/weatherIcons'
import { Wind, Droplets, Snowflake } from 'lucide-react'

// Format time as "8:32 PM"
function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

interface AlmanacHeroProps {
  temperature: number
  feelsLike: number
  weatherCode: number
  location: string
  windSpeed?: number
  windDirection?: number
  humidity?: number
  todayHigh?: number
  todayLow?: number
}

// Convert wind direction degrees to compass direction
function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

export function AlmanacHero({
  temperature,
  feelsLike,
  weatherCode,
  windSpeed,
  windDirection,
  humidity,
  todayHigh,
  todayLow,
}: AlmanacHeroProps) {
  const weather = getWeatherInfo(weatherCode)
  // Get icon component - this is a stable reference lookup, not component creation
  const Icon = getWeatherIcon(weatherCode)
  const isSnowing = isSnowCode(weatherCode)
  const isIcy = isIceCode(weatherCode)

  // Live clock state - initialize with current time to avoid hydration mismatch
  const [currentTime, setCurrentTime] = useState<string>(() => formatTime(new Date()))

  useEffect(() => {
    // Update every minute
    const interval = setInterval(() => {
      setCurrentTime(formatTime(new Date()))
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="animate-fade-in-up py-3 lg:py-4 h-full flex bg-white/5 border border-white/10 rounded-lg px-4">
      {/* Left: Time */}
      <div className="flex-1 flex flex-col justify-center items-start">
        <span className="text-4xl lg:text-5xl font-sans font-bold text-almanac-parchment/90 tabular-nums">
          {currentTime}
        </span>
        <span className="text-xs text-almanac-parchment/50 mt-1">Local Time</span>
      </div>

      {/* Center: Temperature with Icon */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="relative animate-bob">
            <Icon className="w-14 h-14 lg:w-16 lg:h-16 text-almanac-gold" />
            {(isSnowing || isIcy) && (
              <Snowflake className="w-5 h-5 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
            )}
          </div>
          <div className="text-[72px] font-sans font-bold leading-none text-almanac-parchment">
            {Math.round(temperature)}°
          </div>
        </div>

        {/* Condition */}
        <p
          className={`text-xl font-medium ${
            isSnowing ? 'text-blue-300' : isIcy ? 'text-cyan-300' : 'text-almanac-parchment'
          }`}
        >
          {weather.condition}
        </p>

        {/* Feels Like */}
        <p className="text-sm text-almanac-parchment/60 mt-1">
          Feels like {Math.round(feelsLike)}°
        </p>

        {/* High / Low */}
        {(todayHigh !== undefined || todayLow !== undefined) && (
          <div className="flex items-center justify-center gap-3 mt-1 text-sm">
            <span className="text-almanac-parchment/70">
              H:{' '}
              <span className="text-almanac-parchment font-medium">
                {Math.round(todayHigh ?? 0)}°
              </span>
            </span>
            <span className="text-almanac-parchment/30">|</span>
            <span className="text-almanac-parchment/70">
              L:{' '}
              <span className="text-almanac-parchment font-medium">
                {Math.round(todayLow ?? 0)}°
              </span>
            </span>
          </div>
        )}

        {/* Wind & Humidity */}
        {(windSpeed !== undefined || humidity !== undefined) && (
          <div className="flex items-center justify-center gap-4 mt-2 text-sm text-almanac-parchment/60">
            {windSpeed !== undefined && (
              <div className="flex items-center gap-1.5">
                <Wind className="w-4 h-4" />
                <span>
                  {Math.round(windSpeed)} mph
                  {windDirection !== undefined && ` ${getWindDirection(windDirection)}`}
                </span>
              </div>
            )}
            {humidity !== undefined && (
              <div className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4" />
                <span>{Math.round(humidity)}%</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Spacer for visual balance */}
      <div className="flex-1" />
    </section>
  )
}
