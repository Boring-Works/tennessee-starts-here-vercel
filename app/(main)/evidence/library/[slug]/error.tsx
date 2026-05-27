'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { logger } from '@/lib/logger'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logger.error('Evidence error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight">
      <div className="text-center px-4">
        <h1 className="text-4xl font-serif mb-4 text-gold-leaf">Something went wrong</h1>
        <p className="mb-8 opacity-60 text-cream">We couldn&apos;t load this page.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 rounded-lg bg-gold-leaf text-midnight min-h-[44px]"
          >
            Try again
          </button>
          <Link
            href="/evidence"
            className="px-6 py-3 rounded-lg border border-gold-leaf/30 text-gold-leaf min-h-[44px] inline-flex items-center"
          >
            Back to Evidence Room
          </Link>
        </div>
      </div>
    </div>
  )
}
