'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { logger } from '@/lib/logger'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logger.error('Application error:', error)
  }, [error])

  return (
    <div className="flex-1 flex items-center justify-center py-20 bg-cream">
      <div className="text-center px-4">
        <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">Error</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
          Something Went Wrong
        </h1>
        <p className="text-text-light mb-8 max-w-md mx-auto leading-relaxed">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="btn-primary inline-block bg-primary text-white font-semibold px-8 py-3 rounded-sm hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="btn-primary inline-block bg-accent text-primary font-semibold px-8 py-3 rounded-sm hover:bg-accent/90 transition-colors uppercase tracking-wider text-sm"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
