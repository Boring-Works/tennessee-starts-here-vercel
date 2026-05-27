'use client'

import type { PlanningIntelligence } from '@/lib/almanac/governorContent'

interface PlanningIntelligenceCardProps {
  tldr: string
  planning: PlanningIntelligence
}

export function PlanningIntelligenceCard({ tldr, planning }: PlanningIntelligenceCardProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* TL;DR Summary */}
      <div className="bg-gradient-to-r from-amber-50 to-cream border-2 border-amber-700 rounded-lg p-6 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="text-3xl font-serif font-bold text-amber-900 flex-shrink-0">⚡</div>
          <div>
            <p className="font-serif text-lg font-bold text-amber-900 leading-relaxed">{tldr}</p>
            <p className="text-xs text-amber-600 mt-2">Executive Summary</p>
          </div>
        </div>
      </div>

      {/* Planning Intelligence */}
      <div className="bg-gradient-to-r from-amber-50 to-cream border-2 border-amber-600 rounded-lg p-6 shadow-md">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-3xl flex-shrink-0">{planning.icon}</span>
            <div className="flex-1">
              <p className="font-serif text-base font-semibold text-amber-900">{planning.line1}</p>
              <p className="font-serif text-sm text-amber-800 mt-1">{planning.line2}</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-amber-600 mt-3">Visitor Guidance</p>
      </div>
    </div>
  )
}
