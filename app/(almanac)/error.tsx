'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { logger } from '@/lib/logger'

export default function AlmanacError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    logger.error('Almanac error boundary caught:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-almanac-midnight text-almanac-parchment flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/5 border border-almanac-gold/30 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <h1 className="font-serif text-2xl text-almanac-gold mb-2">
          Weather Temporarily Unavailable
        </h1>

        <p className="text-almanac-parchment/70 mb-6">
          The Almanac encountered an unexpected issue loading weather data. This is usually
          temporary.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-almanac-gold text-almanac-midnight font-medium rounded-lg hover:bg-almanac-gold/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="block w-full px-6 py-3 border border-almanac-gold/30 text-almanac-parchment rounded-lg hover:border-almanac-gold/50 hover:bg-white/5 transition-colors text-center"
          >
            Return Home
          </Link>
        </div>

        {error.digest && (
          <p className="text-xs text-almanac-parchment/40 mt-6">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
