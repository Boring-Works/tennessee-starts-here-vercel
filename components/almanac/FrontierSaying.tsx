'use client'

import ShareButton from './ShareButton'

interface FrontierSayingProps {
  saying: string
  modernLine?: string
  temperature?: number
  location?: string
}

export function FrontierSaying({ saying, modernLine, temperature, location }: FrontierSayingProps) {
  // If no modern line provided, display as single saying (backward compatible)
  if (!modernLine) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-sm p-4 h-full">
        <p className="font-serif-elegant italic text-xl text-almanac-parchment/90 leading-relaxed text-center">
          &quot;{saying}&quot;
        </p>
      </div>
    )
  }

  // Dual-line format: 1775 wisdom + 2026 application
  return (
    <div className="bg-white/5 border border-white/10 rounded-sm p-4 relative">
      {/* Share button - top right corner */}
      {temperature !== undefined && location && (
        <div className="absolute top-3 right-3">
          <ShareButton
            frontierLine={saying}
            modernLine={modernLine}
            temperature={temperature}
            location={location}
            iconOnly
          />
        </div>
      )}
      <p className="text-xs text-almanac-gold/50 text-center mb-2 font-medium tracking-widest uppercase">
        The Daily Proverb
      </p>
      <div className="space-y-2">
        {/* 1775 Line */}
        <div className="flex items-start gap-3">
          <span className="text-xs text-almanac-gold/60 font-medium tracking-wide mt-1 shrink-0">
            1775
          </span>
          <p className="font-serif italic text-lg text-almanac-parchment/90 leading-relaxed">
            {saying}
          </p>
        </div>

        {/* 2026 Line */}
        <div className="flex items-start gap-3">
          <span className="text-xs text-almanac-gold/60 font-medium tracking-wide mt-1 shrink-0">
            2026
          </span>
          <p className="font-serif italic text-lg text-almanac-parchment/70 leading-relaxed">
            {modernLine}
          </p>
        </div>
      </div>
    </div>
  )
}
