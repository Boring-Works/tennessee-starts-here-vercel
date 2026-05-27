'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Pencil, Loader2, AlertCircle, X, RotateCcw } from 'lucide-react'
import {
  searchLocation,
  formatLocationName,
  DEFAULT_LOCATION,
  type GeoLocation,
} from '@/lib/almanac/geocoding'
import { saveLocation, clearLocation } from '@/lib/almanac/storage'

interface LocationPickerProps {
  location: GeoLocation
  onLocationChange: (location: GeoLocation) => void
  compact?: boolean
}

export default function LocationPicker({
  location,
  onLocationChange,
  compact = false,
}: LocationPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [storageWarning, setStorageWarning] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)
    setStorageWarning(false)

    try {
      const result = await searchLocation(query)
      if (result) {
        const saved = saveLocation(result)
        if (!saved) {
          // Storage failed but we can still use the location for this session
          setStorageWarning(true)
        }
        onLocationChange(result)
        setIsOpen(false)
        setQuery('')
      } else {
        setError('Location not found. Try a city name or zip code.')
      }
    } catch {
      setError('Search failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [query, onLocationChange])

  const handleReset = useCallback(() => {
    clearLocation()
    onLocationChange(DEFAULT_LOCATION)
    setStorageWarning(false)
    setIsOpen(false)
    setQuery('')
  }, [onLocationChange])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  // Focus management and focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Store the element that opened the modal
      const previousActiveElement = document.activeElement as HTMLElement

      // Focus trap
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab' || !modalRef.current) return

        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }

      document.addEventListener('keydown', handleTab)

      // Return focus on close
      return () => {
        document.removeEventListener('keydown', handleTab)
        previousActiveElement?.focus()
      }
    }
  }, [isOpen])

  return (
    <>
      {/* Storage Warning - shown when localStorage fails */}
      <AnimatePresence>
        {storageWarning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[80] bg-amber-900/90 border border-amber-500/50 text-amber-200 px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Location won&apos;t persist after refresh (storage full)</span>
            <button
              type="button"
              onClick={() => setStorageWarning(false)}
              className="ml-2 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-amber-900"
              aria-label="Dismiss warning"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Display Button - Made prominent so users can find it */}
      {compact ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded bg-almanac-gold/10 hover:bg-almanac-gold/20 text-almanac-parchment/50 hover:text-almanac-gold transition-colors focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-almanac-midnight active:scale-95"
          aria-label={`Current location: ${formatLocationName(location)}. Click to change.`}
          aria-expanded={isOpen}
          title="Change location"
        >
          <MapPin className="w-5 h-5" aria-hidden="true" />
        </button>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-almanac-gold/30 rounded-lg text-almanac-parchment hover:bg-white/10 hover:border-almanac-gold/50 hover:text-almanac-gold transition-all group focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-almanac-midnight"
          aria-label={`Current location: ${formatLocationName(location)}. Click to change.`}
          aria-expanded={isOpen}
        >
          <MapPin className="w-4 h-4 text-almanac-gold" aria-hidden="true" />
          <span className="text-sm font-medium">{formatLocationName(location)}</span>
          <Pencil
            className="w-3 h-3 text-almanac-gold/70 group-hover:text-almanac-gold transition-colors"
            aria-hidden="true"
          />
        </button>
      )}

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-45"
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-almanac-midnight border border-almanac-gold/30 rounded-lg shadow-2xl z-[80] p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="location-picker-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 id="location-picker-title" className="font-display text-xl text-almanac-gold">
                  Change Location
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-almanac-parchment/60 hover:text-almanac-parchment transition-colors -m-2 rounded focus:outline-none focus:ring-2 focus:ring-almanac-gold active:scale-95"
                  aria-label="Close location picker"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative mb-4">
                <label htmlFor="location-search" className="sr-only">
                  Search for a city or zip code
                </label>
                <input
                  id="location-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter city or zip code..."
                  className="w-full bg-almanac-midnight/50 border border-almanac-gold/20 rounded-lg px-4 py-3 text-almanac-parchment placeholder:text-almanac-parchment/40 focus:outline-none focus:border-almanac-gold/50 transition-colors"
                  aria-describedby={error ? 'location-error' : undefined}
                />
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm mb-4"
                    id="location-error"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4" aria-hidden="true" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={isLoading || !query.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-almanac-gold text-almanac-midnight font-medium py-4 md:py-3 rounded-lg hover:bg-almanac-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-almanac-midnight"
                  aria-busy={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <span>Search</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset to Sullivan County"
                  aria-label="Reset to Sullivan County, Tennessee"
                  className="flex items-center justify-center gap-2 px-4 py-4 md:py-3 border border-almanac-gold/30 text-almanac-parchment/80 rounded-lg hover:border-almanac-gold/50 hover:text-almanac-parchment transition-colors focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-almanac-midnight"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Current Location */}
              <div className="mt-6 pt-4 border-t border-almanac-gold/10">
                <p className="text-xs text-almanac-parchment/50">
                  Current: {formatLocationName(location)}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
