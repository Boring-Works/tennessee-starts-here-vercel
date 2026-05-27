'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { logger } from '@/lib/logger'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function EventsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error('Events page error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4">Something went wrong</h1>
      <p className="text-text-light mb-8 max-w-md">
        We couldn&apos;t load the events calendar. Please try again.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={reset}
          className="px-6 py-3 bg-accent text-primary font-semibold rounded hover:bg-accent/90 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/visit"
          className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded hover:bg-primary hover:text-white transition-colors"
        >
          Plan Your Visit
        </Link>
      </div>
    </div>
  )
}
