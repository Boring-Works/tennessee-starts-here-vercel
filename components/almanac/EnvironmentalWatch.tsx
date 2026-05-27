'use client'

import { useState } from 'react'
import { TreeDeciduous, ChevronDown, ChevronUp } from 'lucide-react'
import CreekWatch from './CreekWatch'
import DroughtStatus from './DroughtStatus'
import SpringIndex from './SpringIndex'

interface EnvironmentalWatchProps {
  lat: number
  lon: number
}

export default function EnvironmentalWatch({ lat, lon }: EnvironmentalWatchProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <section className="space-y-4" aria-label="Environmental monitoring">
      {/* Section Header - Clickable to collapse on mobile */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left lg:cursor-default"
        aria-expanded={isExpanded}
      >
        <TreeDeciduous className="w-5 h-5 text-almanac-gold" />
        <h2 className="text-lg font-serif text-almanac-parchment tracking-wide flex-1">
          Environmental Watch
        </h2>
        <span className="lg:hidden text-almanac-parchment/50">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>

      {/* Content - Collapsible on mobile */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 transition-all duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden lg:opacity-100 lg:h-auto'
        }`}
      >
        {/* Creek Watch */}
        <CreekWatch lat={lat} lon={lon} />

        {/* Spring Index */}
        <SpringIndex />

        {/* Drought Status */}
        <DroughtStatus />
      </div>
    </section>
  )
}
