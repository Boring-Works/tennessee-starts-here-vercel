'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getWeatherEmoji } from '@/lib/almanac/weatherEmoji'

interface WeatherData {
  weatherCode: number
  temperature: number
}

/**
 * WeatherBadge - Shows current weather for Sullivan County
 *
 * Displays "Sullivan County / [Weather Emoji]" with live weather data.
 * Links to the full almanac app.
 */
export function WeatherBadge() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Default Rocky Mount coordinates (Sullivan County, TN)
        const response = await fetch('/api/weather?lat=36.4081&lon=-82.3247')
        const data = await response.json()

        if (data.current) {
          setWeather({
            weatherCode: data.current.weatherCode,
            temperature: Math.round(data.current.temperature),
          })
        }
      } catch {
        // Silently fail - weather is nice-to-have
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="inline-flex items-center gap-1.5 text-[11px] text-white/50">
        <span>Sullivan County</span>
        <span>/</span>
        <span>⛅</span>
      </div>
    )
  }

  if (!weather) {
    return null
  }

  const emoji = getWeatherEmoji(weather.weatherCode)

  return (
    <Link
      href="/almanac"
      className="inline-flex items-center gap-1.5 text-[11px] text-white/70 hover:text-accent transition-colors"
      title={`Current weather: ${weather.temperature}°F - Click for full almanac`}
    >
      <span>Sullivan County</span>
      <span className="text-white/30">/</span>
      <span className="text-base">{emoji}</span>
      <span className="hidden sm:inline">{weather.temperature}°F</span>
    </Link>
  )
}
