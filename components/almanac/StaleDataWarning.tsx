'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface StaleDataWarningProps {
  lastUpdated: Date | null
  onRefresh: () => void
  isLoading: boolean
}

export default function StaleDataWarning({
  lastUpdated,
  onRefresh,
  isLoading,
}: StaleDataWarningProps) {
  const [minutesOld, setMinutesOld] = useState(0)

  useEffect(() => {
    if (!lastUpdated) return

    const updateAge = () => {
      const age = Math.floor((Date.now() - lastUpdated.getTime()) / 60000)
      setMinutesOld(age)
    }

    updateAge()
    const interval = setInterval(updateAge, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [lastUpdated])

  // Don't show if data is fresh (< 15 min)
  if (!lastUpdated || minutesOld < 15) return null

  const isUrgent = minutesOld >= 30

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg mb-4 ${
          isUrgent
            ? 'bg-almanac-danger/20 border border-almanac-danger/30'
            : 'bg-almanac-warning/20 border border-almanac-warning/30'
        }`}
      >
        <div className="flex items-center gap-2">
          <AlertCircle
            className={`w-4 h-4 ${isUrgent ? 'text-almanac-danger' : 'text-almanac-warning'}`}
          />
          <span className={`text-sm ${isUrgent ? 'text-almanac-danger' : 'text-almanac-warning'}`}>
            Data is {minutesOld} minutes old
          </span>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className={`flex items-center gap-1.5 text-xs font-medium min-h-[44px] px-4 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 ${
            isUrgent
              ? 'bg-almanac-danger/30 text-almanac-parchment hover:bg-almanac-danger/40 focus-visible:ring-almanac-danger'
              : 'bg-almanac-warning/30 text-almanac-parchment hover:bg-almanac-warning/40 focus-visible:ring-almanac-warning'
          } disabled:opacity-50 disabled:active:scale-100`}
          aria-label={isLoading ? 'Refreshing data' : 'Refresh weather data'}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
