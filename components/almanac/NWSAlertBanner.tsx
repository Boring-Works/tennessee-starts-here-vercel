'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Info, ChevronDown, X } from 'lucide-react'
import { logger } from '@/lib/logger'
import type { NWSAlert, NWSAlertsResponse, AlertSeverity } from '@/lib/almanac/types'

interface NWSAlertBannerProps {
  lat: number
  lon: number
  onAlertChange?: (hasAlert: boolean, alertTitle?: string) => void
}

// Severity-based styling with triple encoding: color + icon + text label
const SEVERITY_STYLES: Record<
  AlertSeverity,
  {
    bg: string
    border: string
    icon: string
    textLabel: string
    iconColor: string
  }
> = {
  Extreme: {
    bg: 'bg-gradient-to-r from-fuchsia-900/60 to-purple-900/60',
    border: 'border-fuchsia-500',
    icon: '🚨',
    textLabel: 'EXTREME',
    iconColor: 'text-fuchsia-400',
  },
  Severe: {
    bg: 'bg-gradient-to-r from-red-900/60 to-red-800/60',
    border: 'border-red-500',
    icon: '⚠️',
    textLabel: 'SEVERE',
    iconColor: 'text-red-400',
  },
  Moderate: {
    bg: 'bg-gradient-to-r from-orange-900/60 to-orange-800/60',
    border: 'border-orange-500',
    icon: '⚡',
    textLabel: 'WARNING',
    iconColor: 'text-orange-400',
  },
  Minor: {
    bg: 'bg-gradient-to-r from-yellow-900/60 to-yellow-800/60',
    border: 'border-yellow-500',
    icon: '📢',
    textLabel: 'ADVISORY',
    iconColor: 'text-yellow-400',
  },
}

export default function NWSAlertBanner({ lat, lon, onAlertChange }: NWSAlertBannerProps) {
  const [alerts, setAlerts] = useState<NWSAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  const fetchAlerts = useCallback(async () => {
    try {
      const response = await fetch(`/api/nws-alerts?lat=${lat}&lon=${lon}`)
      const data: NWSAlertsResponse = await response.json()
      const alertList = data.alerts || []
      setAlerts(alertList)

      // Notify parent of alert status
      if (onAlertChange) {
        const hasAlert = alertList.length > 0
        const firstAlertTitle = alertList[0]?.event
        onAlertChange(hasAlert, firstAlertTitle)
      }
    } catch (err) {
      // Log error for debugging, but fail silently - alerts are supplementary
      logger.error('NWS alerts fetch error:', err)
      setAlerts([])
      onAlertChange?.(false, undefined)
    } finally {
      setLoading(false)
    }
  }, [lat, lon, onAlertChange])

  useEffect(() => {
    fetchAlerts()
    // Refresh alerts every 5 minutes
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchAlerts])

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => new Set([...prev, id]))
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Filter out dismissed alerts
  const visibleAlerts = alerts.filter((alert) => !dismissedIds.has(alert.id))

  // Don't render anything while loading or if no alerts
  if (loading || visibleAlerts.length === 0) {
    return null
  }

  return (
    <div className="space-y-2 mb-4" role="region" aria-label="Weather Alerts">
      <AnimatePresence>
        {visibleAlerts.map((alert) => {
          const style = SEVERITY_STYLES[alert.severity]
          const isExpanded = expandedId === alert.id
          const expiresDate = new Date(alert.expires)
          const IconComponent = alert.severity === 'Minor' ? Info : AlertTriangle

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`${style.bg} border ${style.border} rounded-lg overflow-hidden`}
              role="alert"
              aria-live={
                alert.severity === 'Extreme' || alert.severity === 'Severe' ? 'assertive' : 'polite'
              }
            >
              {/* Header - Always visible */}
              <div className="p-3 cursor-pointer" onClick={() => toggleExpand(alert.id)}>
                <div className="flex items-start gap-3">
                  {/* Icon - Triple encoding part 1 */}
                  <div className={`flex-shrink-0 mt-0.5 ${style.iconColor}`}>
                    <IconComponent size={20} aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Text Label - Triple encoding part 2 */}
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded font-bold ${style.bg} ${style.border} border`}
                        aria-label={`Severity: ${style.textLabel}`}
                      >
                        {style.textLabel}
                      </span>
                      {/* Event name */}
                      <span className="text-base font-semibold text-almanac-parchment">
                        {alert.event}
                      </span>
                    </div>

                    {/* Headline - truncated when collapsed */}
                    <p
                      className={`text-xs text-almanac-parchment/80 mt-1 ${isExpanded ? '' : 'line-clamp-2'}`}
                    >
                      {alert.headline}
                    </p>

                    {/* Area description */}
                    <p className="text-xs text-almanac-parchment/50 mt-1">NWS • {alert.areaDesc}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDismiss(alert.id)
                      }}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-white/10 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-almanac-gold -m-2"
                      aria-label={`Dismiss ${alert.event} alert`}
                    >
                      <X size={18} className="text-almanac-parchment/50" />
                    </button>
                    <div className="w-[44px] h-[44px] flex items-center justify-center -m-2">
                      <ChevronDown
                        size={18}
                        className={`text-almanac-parchment/70 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 pt-0 border-t border-white/10">
                      {/* Description */}
                      <div className="mt-3 text-xs text-almanac-parchment/90 whitespace-pre-line">
                        {alert.description}
                      </div>

                      {/* Instruction */}
                      {alert.instruction && (
                        <div className="mt-3 p-2 bg-white/5 rounded">
                          <p className="text-xs font-medium text-almanac-gold mb-1">
                            Recommended Action:
                          </p>
                          <p className="text-xs text-almanac-parchment/90">{alert.instruction}</p>
                        </div>
                      )}

                      {/* Expires */}
                      <p className="mt-3 text-xs text-almanac-parchment/50">
                        Expires:{' '}
                        {expiresDate.toLocaleString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Additional alerts indicator */}
      {visibleAlerts.length > 1 && expandedId === null && (
        <p className="text-xs text-center text-almanac-parchment/50">
          {visibleAlerts.length} active alerts • Tap to expand
        </p>
      )}
    </div>
  )
}
