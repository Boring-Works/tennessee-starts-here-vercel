'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Flame, ShieldCheck, ShieldAlert } from 'lucide-react'
import { logger } from '@/lib/logger'
import type { NWSAlertsResponse } from '@/lib/almanac/types'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

interface BurnDayIndicatorProps {
  lat: number
  lon: number
  onStatusChange?: (status: 'burn' | 'no-burn' | 'unknown') => void
}

export default function BurnDayIndicator({ lat, lon, onStatusChange }: BurnDayIndicatorProps) {
  const [isSafeToBurn, setIsSafeToBurn] = useState<boolean | null>(null)
  const [fireAlertEvent, setFireAlertEvent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const abortControllerRef = useRef<AbortController | null>(null)
  const onStatusChangeRef = useRef(onStatusChange)

  // Keep callback ref in sync without triggering re-fetches
  useEffect(() => {
    onStatusChangeRef.current = onStatusChange
  }, [onStatusChange])

  const checkBurnStatus = useCallback(async () => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    try {
      const response = await fetch(`/api/nws-alerts?lat=${lat}&lon=${lon}`, { signal })
      const data: NWSAlertsResponse = await response.json()

      // Check if there's a fire weather alert
      const safeToBurn = !data.hasFireWeatherAlert
      setIsSafeToBurn(safeToBurn)
      onStatusChangeRef.current?.(safeToBurn ? 'burn' : 'no-burn')

      // If there's a fire alert, find the specific event name
      if (data.hasFireWeatherAlert && data.alerts) {
        const fireAlert = data.alerts.find((alert) =>
          [
            'Red Flag Warning',
            'Fire Weather Watch',
            'Extreme Fire Danger',
            'Fire Warning',
          ].includes(alert.event)
        )
        setFireAlertEvent(fireAlert?.event || 'Fire Weather Alert')
      } else {
        setFireAlertEvent(null)
      }
    } catch (err) {
      // Handle aborted requests gracefully
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }

      logger.error('Burn day status fetch error:', err)
      // Default to safe if we can't fetch - fail open for this feature
      setIsSafeToBurn(true)
      setFireAlertEvent(null)
      onStatusChangeRef.current?.('unknown')
    } finally {
      setLoading(false)
    }
  }, [lat, lon])

  useEffect(() => {
    checkBurnStatus()
    // Refresh every 15 minutes
    const interval = setInterval(checkBurnStatus, 15 * 60 * 1000)
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      clearInterval(interval)
    }
  }, [checkBurnStatus])

  // Don't show while loading
  if (loading) {
    return null
  }

  // Don't show if we couldn't determine status
  if (isSafeToBurn === null) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`p-3 rounded-lg border ${
        isSafeToBurn ? 'bg-green-900/30 border-green-500/50' : 'bg-red-900/30 border-red-500/50'
      }`}
      role="status"
      aria-label={isSafeToBurn ? 'Safe to burn today' : 'No burning today'}
    >
      <div className="flex items-center gap-3">
        {/* Icon - Triple encoding part 1 (visual) */}
        <div className={`flex-shrink-0 ${isSafeToBurn ? 'text-green-400' : 'text-red-400'}`}>
          {isSafeToBurn ? (
            <ShieldCheck size={24} aria-hidden="true" />
          ) : (
            <ShieldAlert size={24} aria-hidden="true" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Icon - Triple encoding part 2 (emoji) */}
              <Flame
                size={16}
                className={isSafeToBurn ? 'text-green-400' : 'text-red-400'}
                aria-hidden="true"
              />
              <span className="font-medium text-sm text-almanac-parchment">BURN DAY STATUS</span>
            </div>
            <InfoPopup content={INFO_CONTENT.burnDay} iconSize="sm" />
          </div>

          {/* Status message - Triple encoding part 3 (text) */}
          <div className="mt-1">
            <span
              className={`text-sm font-semibold ${
                isSafeToBurn ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isSafeToBurn ? '✓ SAFE TO BURN TODAY' : '✗ NO BURNING'}
            </span>
          </div>

          {/* Reason */}
          <p className="text-xs text-almanac-parchment/70 mt-0.5">
            {isSafeToBurn
              ? 'No fire weather alerts active'
              : fireAlertEvent || 'Fire weather alert in effect'}
          </p>
        </div>
      </div>

      {/* Warning message for no-burn days */}
      {!isSafeToBurn && (
        <div className="mt-2 pt-2 border-t border-red-500/30">
          <p className="text-xs text-red-300/80">
            Check with local fire department before any outdoor burning. Conditions may change.
          </p>
        </div>
      )}
    </motion.div>
  )
}
