'use client'

interface ViewToggleProps {
  view: 'almanac' | 'governor'
  onViewChange: (view: 'almanac' | 'governor') => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div
      className="flex items-center justify-center gap-2 p-1 bg-midnight/30 rounded-lg border border-gold-leaf/20"
      role="tablist"
      aria-label="View selection"
    >
      <button
        type="button"
        role="tab"
        aria-selected={view === 'almanac'}
        aria-controls="almanac-view"
        onClick={() => onViewChange('almanac')}
        className={`
          min-h-[44px] px-6 py-3 rounded-md font-medium transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-midnight
          active:scale-[0.98]
          ${
            view === 'almanac'
              ? 'bg-gold-leaf text-midnight shadow-lg'
              : 'text-cream/60 hover:text-cream hover:bg-midnight/50'
          }
        `}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            👨‍🌾
          </span>
          <span>Almanac View</span>
        </div>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={view === 'governor'}
        aria-controls="governor-view"
        onClick={() => onViewChange('governor')}
        className={`
          min-h-[44px] px-6 py-3 rounded-md font-medium transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-midnight
          active:scale-[0.98]
          ${
            view === 'governor'
              ? 'bg-gold-leaf text-midnight shadow-lg'
              : 'text-cream/60 hover:text-cream hover:bg-midnight/50'
          }
        `}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            🏛️
          </span>
          <span>Governor&apos;s View</span>
        </div>
      </button>
    </div>
  )
}
