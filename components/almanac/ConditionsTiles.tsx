'use client'

import { Cloud, Wind, Moon, AlertTriangle } from 'lucide-react'
import type { MoonData } from '@/lib/almanac/types'
import OutdoorRiskMatrix from './OutdoorRiskMatrix'

interface ConditionsTilesProps {
  uvIndex?: number
  visibility?: number // in meters
  cloudCover?: number // percentage
  windGusts?: number
  pressure?: number
  moon?: MoonData | null
  aqi?: number | null
}

function formatVisibility(meters?: number): number {
  if (!meters) return 0
  const miles = meters / 1609.34
  return Math.round(miles * 10) / 10 // Round to 1 decimal
}

export function ConditionsTiles({
  uvIndex,
  visibility,
  cloudCover,
  windGusts,
  moon,
  aqi,
}: ConditionsTilesProps) {
  const visibilityMiles = formatVisibility(visibility)
  const hasOutdoorData = uvIndex !== undefined && visibility !== undefined

  const tiles = [
    {
      icon: <Cloud className="w-4 h-4" />,
      label: 'Clouds',
      value: cloudCover !== undefined ? `${Math.round(cloudCover)}%` : '--',
      sublabel: '',
      color: 'text-almanac-parchment',
      show: cloudCover !== undefined,
      showWarning: false,
    },
    {
      icon: <Wind className="w-4 h-4" />,
      label: 'Gusts',
      value: windGusts ? `${Math.round(windGusts)}` : '--',
      sublabel: windGusts ? 'mph' : '',
      color: windGusts && windGusts > 25 ? 'text-red-300' : 'text-almanac-parchment',
      show: windGusts !== undefined && windGusts > 0,
      showWarning: windGusts !== undefined && windGusts > 25,
    },
    {
      icon: <Moon className="w-4 h-4" />,
      label: 'Moon',
      value: moon?.emoji || '--',
      sublabel: moon?.phaseName || '',
      color: 'text-almanac-parchment',
      show: moon !== null,
      showWarning: false,
    },
  ].filter((t) => t.show)

  return (
    <div className="space-y-3">
      {/* Outdoor Risk Matrix - Full Width */}
      {hasOutdoorData && (
        <OutdoorRiskMatrix uvIndex={uvIndex!} aqi={aqi || null} visibility={visibilityMiles} />
      )}

      {/* Remaining condition tiles - 2 columns */}
      <div className="grid grid-cols-2 gap-2">
        {tiles.map((tile, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-almanac-parchment/60 mb-1">
              {tile.icon}
              <span className="text-xs">{tile.label}</span>
              {tile.showWarning && <AlertTriangle className="w-3 h-3 text-red-300" />}
            </div>
            <div className={`text-lg font-semibold ${tile.color}`}>{tile.value}</div>
            {tile.sublabel && <div className={`text-xs ${tile.color}/80`}>{tile.sublabel}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
