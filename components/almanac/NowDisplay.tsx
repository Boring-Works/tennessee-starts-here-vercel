'use client'

// getWeatherIcon returns a reference to an existing Lucide component, not a new component
// The linter incorrectly flags this as "component creation during render"
/* eslint-disable react-hooks/static-components */

import { getWeatherIcon } from '@/lib/almanac/weatherIcons'
import { getWeatherInfo } from '@/lib/almanac/types'
import { Wind, Droplets, Clock } from 'lucide-react'

interface NowDisplayProps {
  temperature: number
  feelsLike: number
  weatherCode: number
  windSpeed: number
  windDirection?: number
  windGusts?: number
  humidity: number
  dewPoint?: number
  todayHigh: number
  todayLow: number
  lastUpdated?: Date | null
}

function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

export function NowDisplay({
  temperature,
  feelsLike,
  weatherCode,
  windSpeed,
  windDirection,
  windGusts,
  humidity,
  dewPoint,
  todayHigh,
  todayLow,
  lastUpdated,
}: NowDisplayProps) {
  const Icon = getWeatherIcon(weatherCode)
  const weather = getWeatherInfo(weatherCode)

  // Format update time
  const updateTime = lastUpdated
    ? lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : null

  return (
    <section
      className="bg-white/5 border border-white/10 rounded-lg p-4 h-full flex flex-col"
      aria-label="Current weather conditions"
    >
      {/* Header: NOW */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-almanac-gold">Now</h2>
        {updateTime && (
          <span
            className="flex items-center gap-1 text-xs text-almanac-parchment/40"
            aria-label={`Last updated at ${updateTime}`}
          >
            <Clock className="w-3 h-3" aria-hidden="true" />
            <span>{updateTime}</span>
          </span>
        )}
      </div>

      {/* Main temp + condition */}
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-12 h-12 text-almanac-gold flex-shrink-0" aria-hidden="true" />
        <div>
          <div
            className="text-5xl font-bold text-almanac-parchment leading-none"
            aria-label={`Current temperature: ${Math.round(temperature)} degrees Fahrenheit`}
          >
            {Math.round(temperature)}°
          </div>
          <p
            className="text-sm text-almanac-parchment/60 mt-1"
            aria-label={`Weather condition: ${weather.condition}`}
          >
            {weather.condition}
          </p>
        </div>
      </div>

      {/* Feels like + H/L */}
      <div className="flex items-center justify-between text-sm mb-3 pb-3 border-b border-white/10">
        <span
          className="text-almanac-parchment/60"
          aria-label={`Feels like ${Math.round(feelsLike)} degrees`}
        >
          Feels like <span className="text-almanac-parchment">{Math.round(feelsLike)}°</span>
        </span>
        <span
          className="text-almanac-parchment/60"
          aria-label={`Today's high: ${Math.round(todayHigh)} degrees, low: ${Math.round(todayLow)} degrees`}
        >
          H: <span className="text-almanac-parchment">{Math.round(todayHigh)}°</span>
          {' / '}
          L: <span className="text-blue-400">{Math.round(todayLow)}°</span>
        </span>
      </div>

      {/* Wind */}
      <div
        className="flex items-center gap-2 text-sm text-almanac-parchment/60 mb-2"
        aria-label={`Wind speed: ${Math.round(windSpeed)} miles per hour${windDirection !== undefined ? `, direction: ${getWindDirection(windDirection)}` : ''}${windGusts && windGusts > windSpeed + 5 ? `, gusts up to ${Math.round(windGusts)} miles per hour` : ''}`}
      >
        <Wind className="w-4 h-4" aria-hidden="true" />
        <span className="text-almanac-parchment">
          {Math.round(windSpeed)} <span className="text-almanac-parchment/40">mph</span>
          {windDirection !== undefined && ` ${getWindDirection(windDirection)}`}
        </span>
        {windGusts && windGusts > windSpeed + 5 && (
          <span className="text-amber-400 text-xs">(gusts {Math.round(windGusts)})</span>
        )}
      </div>

      {/* Humidity or Dew Point */}
      <div
        className="flex items-center gap-2 text-sm text-almanac-parchment/60"
        aria-label={
          dewPoint !== undefined
            ? `Dew point: ${Math.round(dewPoint)} degrees`
            : `Humidity: ${Math.round(humidity)} percent`
        }
      >
        <Droplets className="w-4 h-4" aria-hidden="true" />
        {dewPoint !== undefined ? (
          <span className="text-almanac-parchment">
            Dew point {Math.round(dewPoint)}
            <span className="text-almanac-parchment/40">°</span>
          </span>
        ) : (
          <span className="text-almanac-parchment">
            Humidity {Math.round(humidity)}
            <span className="text-almanac-parchment/40">%</span>
          </span>
        )}
      </div>
    </section>
  )
}
