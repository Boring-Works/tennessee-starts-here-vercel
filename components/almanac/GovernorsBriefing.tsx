'use client'

interface GovernorsBriefingProps {
  briefing: string
}

export function GovernorsBriefing({ briefing }: GovernorsBriefingProps) {
  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 border-4 border-double border-amber-900/80 rounded-lg p-8 shadow-[0_4px_16px_rgba(0,0,0,0.15),0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDIiLz48L3N2Zz4=')] opacity-40 rounded-lg pointer-events-none" />

      {/* Decorative corner flourishes */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-900/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-900/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-900/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-900/30" />

      {/* Wax seal decoration */}
      <div className="relative flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-red-800 via-red-900 to-red-950 shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center border-2 border-red-900/50">
            <div className="text-2xl text-amber-100 font-serif font-bold drop-shadow-sm">G</div>
            {/* Wax texture */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-black/10" />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-serif font-bold text-amber-950 mb-1 drop-shadow-sm">
            Governor&apos;s Intelligence Briefing
          </h2>
          <p className="text-sm text-amber-800/90 font-medium tracking-wide">
            Southwest Territory · Weather Observations
          </p>
        </div>
      </div>

      {/* Briefing content */}
      <div className="relative prose prose-lg prose-amber max-w-none">
        <div className="font-serif text-base leading-relaxed text-amber-950/90 whitespace-pre-wrap border-l-4 border-amber-400/60 bg-amber-50/40 rounded-r px-6 py-4 shadow-sm">
          {briefing}
        </div>
      </div>

      {/* Signature line with ornate border */}
      <div className="relative mt-8 pt-6 border-t-2 border-amber-300/60 flex justify-between items-end">
        {/* Decorative center ornament */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-amber-100 border-2 border-amber-300/60" />

        <div className="text-xs text-amber-700/90 space-y-1 font-medium">
          <p className="flex items-center gap-2">
            <span className="inline-block w-1 h-1 bg-amber-700/60 rounded-full" />
            Generated from atmospheric observations
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block w-1 h-1 bg-amber-700/60 rounded-full" />
            Rocky Mount, Capital of the Southwest Territory
          </p>
        </div>
        <div className="font-serif italic text-amber-800 text-base font-medium">
          — Intelligence Officer
        </div>
      </div>

      {/* Disclaimer with enhanced styling */}
      <div className="relative mt-4 pt-4 border-t border-amber-300/40 text-xs text-amber-700/80 bg-amber-100/30 -mx-8 -mb-8 px-8 py-4 rounded-b-lg">
        <p className="flex items-start gap-2">
          <span className="text-amber-800 font-bold mt-0.5">⚠</span>
          <span>
            <strong className="text-amber-900">Historical Context:</strong> This briefing applies
            period-appropriate language to modern meteorological data. Not an authentic 18th-century
            document.
          </span>
        </p>
      </div>
    </div>
  )
}
