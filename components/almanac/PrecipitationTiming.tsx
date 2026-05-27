'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { CloudRain, CloudSun, Sun, CloudLightning, Cloud, AlertCircle } from 'lucide-react'
import { logger } from '@/lib/logger'
import {
  analyzePrecipitationClient,
  type RainViewerData,
  type PrecipitationStatus,
} from '@/lib/almanac/precipitationTiming'

// ============================================================================
// Types
// ============================================================================

interface PrecipitationTimingProps {
  lat: number
  lon: number
  hourlyPrecipFallback?: number
}

// ============================================================================
// Constants
// ============================================================================

const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes
const RETRY_DELAYS = [1000, 2000, 4000]
const MAX_RETRIES = 3

// ============================================================================
// Icon Mapping
// ============================================================================

function getStatusIcon(icon: string, className: string) {
  switch (icon) {
    case 'cloud-rain':
      return <CloudRain className={className} />
    case 'cloud-rain-wind':
      return <CloudRain className={className} />
    case 'cloud-lightning-rain':
      return <CloudLightning className={className} />
    case 'cloud-sun':
      return <CloudSun className={className} />
    case 'sun':
      return <Sun className={className} />
    case 'cloud-question':
      return <Cloud className={className} />
    default:
      return <Cloud className={className} />
  }
}

// ============================================================================
// Styling
// ============================================================================

function getStatusStyles(type: PrecipitationStatus['type']) {
  switch (type) {
    case 'approaching':
      return {
        bg: 'bg-blue-500/20',
        border: 'border-blue-400/40',
        text: 'text-blue-200',
        accent: 'text-blue-300',
      }
    case 'clearing':
      return {
        bg: 'bg-sky-500/15',
        border: 'border-sky-400/30',
        text: 'text-sky-200',
        accent: 'text-sky-300',
      }
    case 'continues':
      return {
        bg: 'bg-indigo-500/25',
        border: 'border-indigo-400/40',
        text: 'text-indigo-200',
        accent: 'text-indigo-300',
      }
    case 'dry':
      return {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-400/20',
        text: 'text-emerald-200',
        accent: 'text-emerald-300',
      }
    default:
      return {
        bg: 'bg-almanac-midnight/50',
        border: 'border-almanac-gold/10',
        text: 'text-almanac-parchment/60',
        accent: 'text-almanac-parchment/40',
      }
  }
}

// ============================================================================
// Component
// ============================================================================

export default function PrecipitationTiming({
  lat,
  lon,
  hourlyPrecipFallback,
}: PrecipitationTimingProps) {
  const [status, setStatus] = useState<PrecipitationStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const abortControllerRef = useRef<AbortController | null>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch and analyze precipitation data
  const fetchPrecipitation = useCallback(
    async (attempt = 0) => {
      // Cancel any in-flight request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

      try {
        setLoading(true)
        if (attempt > 0) setRetryCount(attempt)

        // Fetch radar data from our API
        const response = await fetch('/api/precipitation-radar', { signal })
        if (!response.ok) throw new Error('Failed to fetch radar data')

        const data: RainViewerData = await response.json()

        // Check for API error response
        if ('error' in data) {
          throw new Error('Radar API error')
        }

        const pastFrames = data.radar?.past || []
        const nowcastFrames = data.radar?.nowcast || []

        // Analyze precipitation using client-side canvas sampling
        const precipStatus = await analyzePrecipitationClient(
          lat,
          lon,
          pastFrames,
          nowcastFrames,
          'https://tilecache.rainviewer.com'
        )

        setStatus(precipStatus)
        setLastUpdated(new Date())
        setError(null)
        setRetryCount(0)
      } catch (err) {
        // Handle aborted requests gracefully
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }

        logger.error('Precipitation timing error:', err)

        // Retry with exponential backoff
        if (attempt < MAX_RETRIES) {
          const delay = RETRY_DELAYS[attempt] || RETRY_DELAYS[RETRY_DELAYS.length - 1]
          retryTimeoutRef.current = setTimeout(() => fetchPrecipitation(attempt + 1), delay)
        } else {
          setError('Unable to analyze precipitation')
          setRetryCount(0)
        }
      } finally {
        setLoading(false)
      }
    },
    [lat, lon]
  )

  // Initial fetch and refresh interval
  useEffect(() => {
    fetchPrecipitation()

    const interval = setInterval(() => fetchPrecipitation(), REFRESH_INTERVAL)

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
      clearInterval(interval)
    }
  }, [fetchPrecipitation])

  // Loading state
  if (loading && !status) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-almanac-midnight/60 border border-almanac-gold/10 rounded-lg p-3"
      >
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-almanac-parchment/40 animate-pulse" />
          <span className="text-almanac-parchment/50 text-sm">
            {retryCount > 0
              ? `Analyzing radar (${retryCount}/${MAX_RETRIES})...`
              : 'Checking precipitation...'}
          </span>
        </div>
      </motion.div>
    )
  }

  // Error state with fallback
  if (error || !status) {
    // Show hourly precipitation fallback if available
    if (hourlyPrecipFallback !== undefined) {
      const chance = Math.round(hourlyPrecipFallback)
      const isMostlyDry = chance < 30

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-lg p-3 ${
            isMostlyDry
              ? 'bg-emerald-500/10 border border-emerald-400/20'
              : 'bg-blue-500/15 border border-blue-400/30'
          }`}
        >
          <div className="flex items-center gap-2">
            {isMostlyDry ? (
              <Sun className="w-4 h-4 text-emerald-300" />
            ) : (
              <CloudRain className="w-4 h-4 text-blue-300" />
            )}
            <span className={isMostlyDry ? 'text-emerald-200' : 'text-blue-200'}>
              {chance}% chance of rain
            </span>
          </div>
          <div className="text-xs text-almanac-parchment/40 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>Hourly forecast (radar unavailable)</span>
          </div>
        </motion.div>
      )
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-almanac-midnight/60 border border-almanac-gold/10 rounded-lg p-3"
      >
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-almanac-parchment/40" />
          <span className="text-almanac-parchment/50 text-sm">
            {error || 'Precipitation data unavailable'}
          </span>
        </div>
      </motion.div>
    )
  }

  // Success state with status
  const styles = getStatusStyles(status.type)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg p-3 border ${styles.bg} ${styles.border}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon(status.icon, `w-5 h-5 ${styles.accent}`)}
          <span className={`font-medium ${styles.text}`}>{status.message}</span>
        </div>

        {status.minutesUntil && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={`text-lg font-display tabular-nums ${styles.accent}`}
          >
            {status.minutesUntil}
            <span className="text-xs ml-0.5 opacity-70">min</span>
          </motion.div>
        )}
      </div>

      {/* Status-specific details */}
      {status.type === 'clearing' && status.clearingTime && (
        <div className={`text-xs mt-1 ${styles.text} opacity-70`}>
          Expected to clear around{' '}
          {status.clearingTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </div>
      )}

      {/* Last updated timestamp */}
      {lastUpdated && (
        <div className="text-xs text-almanac-parchment/30 mt-2">
          Updated{' '}
          {lastUpdated.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </div>
      )}
    </motion.div>
  )
}
