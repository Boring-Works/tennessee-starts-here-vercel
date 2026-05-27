'use client'

import { Droplet, CheckCircle } from 'lucide-react'
import { getSimulatedDroughtData, getDroughtLevelInfo } from '@/lib/almanac/drought'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

export default function DroughtStatus() {
  const droughtData = getSimulatedDroughtData()
  const levelInfo = getDroughtLevelInfo(droughtData.level)

  // Don't render if no drought
  if (droughtData.level === 'None') {
    return (
      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-almanac-gold" />
            <h3 className="text-sm font-medium text-almanac-parchment uppercase tracking-wide">
              Drought Status
            </h3>
          </div>
          <InfoPopup content={INFO_CONTENT.drought} iconSize="sm" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-medium">No Drought</span>
        </div>
        <p className="text-xs text-almanac-parchment/50 text-center mt-2">
          Normal moisture conditions
        </p>
      </div>
    )
  }

  return (
    <div className={`p-3 rounded-lg border ${levelInfo.bgColor} border-white/10`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Droplet className="w-4 h-4 text-almanac-gold" />
          <h3 className="text-sm font-medium text-almanac-parchment uppercase tracking-wide">
            Drought Status
          </h3>
        </div>
        <InfoPopup content={INFO_CONTENT.drought} iconSize="sm" />
      </div>

      {/* Drought Level Badge */}
      <div className="text-center mb-3">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${levelInfo.bgColor}`}
        >
          <span className={`text-sm font-bold ${levelInfo.color}`}>{droughtData.level}</span>
          <span className="text-sm text-almanac-parchment/80">{levelInfo.label}</span>
        </div>
      </div>

      {/* Area Affected */}
      {droughtData.percentArea > 0 && (
        <div className="text-center mb-3">
          <span className="text-2xl font-bold text-almanac-parchment">
            {Math.round(droughtData.percentArea)}%
          </span>
          <span className="text-sm text-almanac-parchment/50 ml-1">of county</span>
        </div>
      )}

      {/* Description */}
      <p className="text-xs text-almanac-parchment/60 text-center">{levelInfo.description}</p>

      {/* Last Updated */}
      <p className="text-[10px] text-almanac-parchment/40 text-center mt-3">
        Updated:{' '}
        {new Date(droughtData.lastUpdated).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
      </p>
    </div>
  )
}
