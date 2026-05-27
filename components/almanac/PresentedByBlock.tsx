'use client'

import Link from 'next/link'

interface PresentedByBlockProps {
  lastUpdated: Date | null
}

export default function PresentedByBlock({ lastUpdated }: PresentedByBlockProps) {
  return (
    <footer className="mt-8 animate-fade-in">
      {/* Presented By Attribution */}
      <div className="border-t border-almanac-gold/20 pt-4 pb-3">
        <div className="text-center">
          <p className="text-xs text-almanac-parchment/40 uppercase tracking-[0.2em] mb-1">
            Presented By
          </p>
          <p className="text-base text-almanac-gold font-serif tracking-wide">
            Rocky Mount State Historic Site
          </p>
          <p className="text-xs text-almanac-parchment/70 mt-0.5">
            Sullivan County, Tennessee — Where Tennessee Began
          </p>
          <Link
            href="/visit"
            className="inline-block mt-2 text-sm text-almanac-gold/80 hover:text-almanac-gold transition-colors border-b border-almanac-gold/30 hover:border-almanac-gold/60 pb-0.5"
          >
            Plan Your Visit →
          </Link>
        </div>
      </div>

      {/* Technical Footer */}
      <div className="border-t border-white/5 pt-3 pb-4">
        <div className="text-center">
          <p className="text-xs text-almanac-parchment/30">Weather data via Open-Meteo</p>
          {lastUpdated && (
            <p className="text-xs text-almanac-parchment/20 mt-1">
              Last updated:{' '}
              {lastUpdated.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          )}
          <p className="text-xs text-almanac-parchment/20 mt-2 max-w-md mx-auto leading-relaxed">
            This almanac is built for information and entertainment, not life-or-death decisions.
            Always consult official sources for severe weather.
          </p>
        </div>
      </div>
    </footer>
  )
}
