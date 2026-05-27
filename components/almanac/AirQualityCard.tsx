'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Wind } from 'lucide-react'
import { logger } from '@/lib/logger'
import type { AirQualityData } from '@/lib/almanac/types'
import { getAQILevel } from '@/lib/almanac/types'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

interface AirQualityCardProps {
  lat: number
  lon: number
  /** Callback when AQI value is loaded */
  onAqiChange?: (aqi: number | null) => void
}

export default function AirQualityCard({ lat, lon, onAqiChange }: AirQualityCardProps) {
  const [data, setData] = useState<AirQualityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const onAqiChangeRef = useRef(onAqiChange)

  // Keep callback ref in sync without triggering re-fetches
  useEffect(() => {
    onAqiChangeRef.current = onAqiChange
  }, [onAqiChange])

  const fetchAirQuality = useCallback(async () => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    try {
      const response = await fetch(`/api/air-quality?lat=${lat}&lon=${lon}`, { signal })
      const result = await response.json()

      if (result.error && !result.aqi) {
        setError(result.error)
        setData(null)
        onAqiChangeRef.current?.(null)
      } else if (result.aqi !== null) {
        setData(result)
        setError(null)
        onAqiChangeRef.current?.(result.aqi)
      } else {
        setData(null)
        setError('No air quality data available')
        onAqiChangeRef.current?.(null)
      }
    } catch (err) {
      // Handle aborted requests gracefully
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }

      logger.error('Air quality fetch error:', err)
      setError('Failed to load air quality data')
      setData(null)
      onAqiChangeRef.current?.(null)
    } finally {
      setLoading(false)
    }
  }, [lat, lon])

  useEffect(() => {
    fetchAirQuality()
    // Refresh every 15 minutes
    const interval = setInterval(fetchAirQuality, 15 * 60 * 1000)
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      clearInterval(interval)
    }
  }, [fetchAirQuality])

  // Don't show while loading
  if (loading) {
    return (
      <div className="p-4 rounded-lg bg-white/5 border border-white/10 animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <Wind size={18} className="text-almanac-parchment/50" />
          <span className="text-sm font-medium text-almanac-parchment/50">AIR QUALITY</span>
        </div>
        <div className="h-16 bg-white/5 rounded" />
      </div>
    )
  }

  // Don't show if error or no data
  if (error || !data) {
    return null
  }

  const aqiInfo = getAQILevel(data.aqi)

  // AQI color backgrounds
  const bgColors: Record<string, string> = {
    good: 'bg-green-900/30 border-green-500/50',
    moderate: 'bg-yellow-900/30 border-yellow-500/50',
    sensitive: 'bg-orange-900/30 border-orange-500/50',
    unhealthy: 'bg-red-900/30 border-red-500/50',
    'very-unhealthy': 'bg-purple-900/30 border-purple-500/50',
    hazardous: 'bg-rose-900/30 border-rose-500/50',
  }

  const textColors: Record<string, string> = {
    good: 'text-green-400',
    moderate: 'text-yellow-400',
    sensitive: 'text-orange-400',
    unhealthy: 'text-red-400',
    'very-unhealthy': 'text-purple-400',
    hazardous: 'text-rose-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg border ${bgColors[data.level]}`}
      role="region"
      aria-label={`Air Quality: ${aqiInfo.label}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Wind size={18} className={textColors[data.level]} aria-hidden="true" />
          <span className="text-sm font-medium text-almanac-parchment uppercase tracking-wide">
            Air Quality
          </span>
        </div>
        <InfoPopup content={INFO_CONTENT.airQuality} iconSize="sm" />
      </div>

      {/* AQI Display - Triple encoding: number + color + emoji */}
      <div className="flex items-center gap-4">
        {/* Large AQI number */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${textColors[data.level]}`}>{data.aqi}</div>
          <div className={`text-xs font-semibold uppercase ${textColors[data.level]}`}>
            {aqiInfo.label}
          </div>
        </div>

        {/* Emoji - Triple encoding part 2 */}
        <div className="text-3xl" aria-hidden="true">
          {aqiInfo.emoji}
        </div>

        {/* Details */}
        <div className="flex-1">
          <p className="text-xs text-almanac-parchment/70">Primary: {data.dominantPollutant}</p>
          <p className={`text-sm font-medium mt-1 ${textColors[data.level]}`}>{aqiInfo.guidance}</p>
        </div>
      </div>

      {/* Station info */}
      <p className="text-xs text-almanac-parchment/50 mt-3 truncate">Station: {data.stationName}</p>
    </motion.div>
  )
}
