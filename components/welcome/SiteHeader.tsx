'use client'

import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { getSiteStatus } from '@/lib/siteHours'
import { getConditionText, getWeatherIcon } from '@/lib/weather-helpers/weatherUtils'

interface DisplayStatus {
  isOpen: boolean
  message: string
  cta: string
}

/**
 * Transform site status into positive, inviting display messages
 * Never says "Closed" - focuses on when you CAN visit
 */
function getDisplayStatus(): DisplayStatus {
  const status = getSiteStatus()

  // Currently open - celebrate it
  if (status.isOpen) {
    const closeTime = status.message.match(/(\d+:\d+ [AP]M)/)?.[1] || '5:00 PM'
    return {
      isOpen: true,
      message: `Open until ${closeTime}`,
      cta: 'Visit today',
    }
  }

  // Off-season - focus on season opening
  if (status.reason === 'Before operating season' || status.reason === 'After operating season') {
    if (status.nextOpen) {
      const openDate = status.nextOpen.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
      return {
        isOpen: false,
        message: `Opens ${openDate}`,
        cta: 'Start planning',
      }
    }
    return {
      isOpen: false,
      message: 'Seasonal site',
      cta: 'Plan ahead',
    }
  }

  // Not an open day (Sun-Tue) - show regular hours
  if (status.reason === 'Not an open day') {
    return {
      isOpen: false,
      message: 'Wed–Sat 10am–5pm',
      cta: 'Plan your visit',
    }
  }

  // Special event prep - show the event info
  if (status.reason.includes('Preparing')) {
    return {
      isOpen: false,
      message: status.specialHours?.eventTitle || 'Special event tonight',
      cta: 'See details',
    }
  }

  // Default: show hours info positively
  return {
    isOpen: false,
    message: 'Wed–Sat 10am–5pm',
    cta: 'Plan your visit',
  }
}

// Store for display status - allows use with useSyncExternalStore
let currentDisplay: DisplayStatus | null = null
const statusListeners = new Set<() => void>()

function subscribeToStatus(callback: () => void) {
  statusListeners.add(callback)
  return () => statusListeners.delete(callback)
}

function getStatusSnapshot(): DisplayStatus | null {
  return currentDisplay
}

function getServerStatusSnapshot(): DisplayStatus | null {
  return null // Return null on server to avoid hydration mismatch
}

// Use useSyncExternalStore for client detection
const emptySubscribe = () => () => {}

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

interface WeatherData {
  temp: number
  condition: string
  icon: string
}

function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)

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
      })
      .catch(() => {
        // Silently fail - weather is optional
      })
  }, [])

  return weather
}

export function SiteHeader() {
  const isClient = useIsClient()
  const weather = useWeather()
  const display = useSyncExternalStore(
    subscribeToStatus,
    getStatusSnapshot,
    getServerStatusSnapshot
  )

  // Initialize status on mount and set up interval for updates
  useEffect(() => {
    // Initialize the status store
    currentDisplay = getDisplayStatus()
    statusListeners.forEach((listener) => listener())

    // Update every minute to catch opening/closing transitions
    const interval = setInterval(() => {
      currentDisplay = getDisplayStatus()
      statusListeners.forEach((listener) => listener())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Show static version during SSR or before client hydration
  if (!isClient || !display) {
    return (
      <div className="site-header-wrapper">
        <Link
          href="/visit"
          className="site-header"
          aria-label="View visiting information for Rocky Mount"
        >
          <span className="site-header-content">
            <span className="site-header-location">Sullivan County</span>
          </span>
          <span className="site-header-cta">Plan your visit &rarr;</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="site-header-wrapper">
      <Link
        href="/visit"
        className="site-header"
        aria-label="View visiting information for Rocky Mount"
      >
        <span className="site-header-content">
          <span className="site-header-location">Sullivan County</span>
          <span className="site-header-separator" aria-hidden="true">
            ·
          </span>
          <span
            className={`site-header-status ${display.isOpen ? 'site-header-status--open' : ''}`}
          >
            {display.message}
          </span>
        </span>
        <span className="site-header-cta">{display.cta} &rarr;</span>
      </Link>

      {/* Weather Link to Almanac */}
      {weather && (
        <Link
          href="/almanac"
          className="weather-link"
          aria-label={`Current weather: ${weather.temp}°F ${weather.condition}. View Blount's Weather Station`}
        >
          <span className="weather-link-icon" aria-hidden="true">
            {weather.icon}
          </span>
          <span className="weather-link-temp">{weather.temp}°</span>
        </Link>
      )}
    </div>
  )
}
