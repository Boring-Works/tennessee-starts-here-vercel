'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getConditionText, getWeatherIcon } from '@/lib/weather-helpers/weatherUtils'

interface WeatherData {
  temp: number
  condition: string
  icon: string
}

export function WeatherHeader() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const lat = 36.4539
    const lon = -82.3109

    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      .then((res) => {
        if (!res.ok) throw new Error('Weather fetch failed')
        return res.json()
      })
      .then((data) => {
        const code = data.current.weather_code
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: getConditionText(code),
          icon: getWeatherIcon(code),
        })
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  // Show fallback while loading or on error
  if (loading || error || !weather) {
    return (
      <Link
        href="/almanac"
        className="weather-header weather-header--loading"
        aria-label="View Blount's Weather Station - Current weather for Sullivan County"
      >
        <span className="weather-content">
          <span className="weather-text">Sullivan County, Tennessee</span>
        </span>
        <span className="weather-cta">Blount&apos;s Weather Station &rarr;</span>
      </Link>
    )
  }

  return (
    <Link
      href="/almanac"
      className="weather-header"
      aria-label="View Blount's Weather Station - Current weather for Sullivan County"
    >
      <span className="weather-content">
        <span className="weather-icon" aria-hidden="true">
          {weather.icon}
        </span>
        <span className="weather-text">
          Sullivan County, Tennessee &middot; {weather.temp}&deg;F &middot; {weather.condition}
        </span>
      </span>
      <span className="weather-cta">Blount&apos;s Weather Station &rarr;</span>
    </Link>
  )
}
