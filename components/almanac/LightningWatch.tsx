'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Zap, AlertTriangle } from 'lucide-react'
import { logger } from '@/lib/logger'
import { fetchLightningData, getNearestStrikeDirection } from '@/lib/almanac/lightning'
import { getLightningAlertLevel } from '@/lib/almanac/types'
import type { LightningData } from '@/lib/almanac/types'

interface LightningWatchProps {
  lat: number
  lon: number
}

export default function LightningWatch({ lat, lon }: LightningWatchProps) {
  const [data, setData] = useState<LightningData | null>(null)
  const [loading, setLoading] = useState(true)
  const [direction, setDirection] = useState<string | null>(null)
  const isMountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      const lightningData = await fetchLightningData(lat, lon, 50)

      // Only update state if still mounted
      if (!isMountedRef.current) return

      setData(lightningData)

      if (lightningData.strikes.length > 0) {
        const dir = getNearestStrikeDirection(lat, lon, lightningData.strikes)
        setDirection(dir)
      } else {
        setDirection(null)
      }
    } catch (err) {
      logger.error('Lightning data fetch error:', err)
      if (isMountedRef.current) {
        setData(null)
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [lat, lon])

  useEffect(() => {
    isMountedRef.current = true
    fetchData()
    // Poll every 60 seconds for fresh lightning data
    const interval = setInterval(fetchData, 60 * 1000)
    return () => {
      isMountedRef.current = false
      clearInterval(interval)
    }
  }, [fetchData])

  // Don't show while loading
  if (loading) {
    return null
  }

  // Don't show if no strikes within 50 miles
  if (!data || data.strikeCount === 0 || data.nearestMiles === null) {
    return null
  }

  const alertInfo = getLightningAlertLevel(data.nearestMiles)

  // If no alert level (strikes > 50 miles), don't show
  if (!alertInfo.level) {
    return null
  }

  // Alert level styling
  const bgColors: Record<string, string> = {
    danger: 'bg-gradient-to-r from-red-900/60 to-red-800/60',
    warning: 'bg-gradient-to-r from-orange-900/60 to-orange-800/60',
    watch: 'bg-gradient-to-r from-yellow-900/60 to-yellow-800/60',
  }

  const borderColors: Record<string, string> = {
    danger: 'border-red-500',
    warning: 'border-orange-500',
    watch: 'border-yellow-500',
  }

  const textColors: Record<string, string> = {
    danger: 'text-red-400',
    warning: 'text-orange-400',
    watch: 'text-yellow-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${bgColors[alertInfo.level]} border ${borderColors[alertInfo.level]} rounded-lg p-3 mb-4`}
      role="alert"
      aria-live={alertInfo.level === 'danger' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        {/* Icon - Triple encoding part 1 */}
        <div className={`flex-shrink-0 ${textColors[alertInfo.level]}`}>
          {alertInfo.level === 'danger' ? (
            <AlertTriangle size={24} className="animate-pulse" aria-hidden="true" />
          ) : (
            <Zap size={24} aria-hidden="true" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header with label */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Text Label - Triple encoding part 2 */}
            <span
              className={`text-xs px-1.5 py-0.5 rounded font-bold ${bgColors[alertInfo.level]} ${borderColors[alertInfo.level]} border`}
              aria-label={`Lightning alert: ${alertInfo.label}`}
            >
              {alertInfo.label}
            </span>
            <span className="text-base font-semibold text-almanac-parchment">
              LIGHTNING DETECTED
            </span>
          </div>

          {/* Strike info */}
          <p className="text-sm text-almanac-parchment/90 mt-1">
            {data.strikeCount} strike{data.strikeCount !== 1 ? 's' : ''} within 50 miles
            {direction && (
              <span className="text-almanac-parchment/70">
                {' '}
                • Nearest: {Math.round(data.nearestMiles)} mi {direction}
              </span>
            )}
          </p>

          {/* Action message - Triple encoding part 3 */}
          <p className={`text-sm font-semibold mt-1 ${textColors[alertInfo.level]}`}>
            {alertInfo.level === 'danger' && '⚠️ '}
            {alertInfo.message}
          </p>
        </div>
      </div>

      {/* Danger level additional warning */}
      {alertInfo.level === 'danger' && (
        <div className="mt-2 pt-2 border-t border-red-500/30">
          <p className="text-xs text-red-300/80">
            Lightning can strike up to 10 miles from a storm. Move indoors immediately. When thunder
            roars, go indoors!
          </p>
        </div>
      )}
    </motion.div>
  )
}
