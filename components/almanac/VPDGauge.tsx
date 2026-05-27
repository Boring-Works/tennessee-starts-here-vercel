'use client'

import { Droplets } from 'lucide-react'
import { calculateVPD, getVPDLevel } from '@/lib/almanac/vpd'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

interface VPDGaugeProps {
  temperature: number // °F
  humidity: number // 0-100
}

export default function VPDGauge({ temperature, humidity }: VPDGaugeProps) {
  const vpd = calculateVPD(temperature, humidity)
  const vpdInfo = getVPDLevel(vpd)

  // Get background color class based on VPD level
  const getBgClass = () => {
    if (vpd < 0.4) return 'bg-blue-500/20 border-blue-500/30'
    if (vpd < 1.2) return 'bg-green-500/20 border-green-500/30'
    if (vpd < 1.6) return 'bg-yellow-500/20 border-yellow-500/30'
    return 'bg-red-500/20 border-red-500/30'
  }

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-almanac-gold" />
          <h3 className="text-sm font-medium text-almanac-parchment uppercase tracking-wide">
            VPD
          </h3>
        </div>
        <InfoPopup content={INFO_CONTENT.vpd} iconSize="sm" />
      </div>

      <div className="flex flex-col items-center">
        {/* Primary Value Display */}
        <div className="w-full mb-3">
          <div className="text-center">
            <div className={`text-4xl font-bold ${vpdInfo.color}`}>{vpd.toFixed(2)}</div>
            <div className="text-sm text-almanac-parchment/60 mt-1">kPa</div>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getBgClass()}`}
        >
          <span className={`w-2 h-2 rounded-full ${vpdInfo.bgColor}`}></span>
          <span className={vpdInfo.color}>{vpdInfo.label}</span>
        </div>

        {/* Recommendation */}
        <p className="text-xs text-almanac-parchment/60 text-center mt-3 leading-relaxed">
          {vpdInfo.recommendation}
        </p>

        {/* Range Reference */}
        <div className="w-full mt-4 pt-3 border-t border-white/10">
          <div className="flex justify-between text-xs text-almanac-parchment/40">
            <span>Low &lt;0.4</span>
            <span className="text-green-400">Optimal 0.4-1.2</span>
            <span>High &gt;1.6</span>
          </div>
        </div>
      </div>
    </div>
  )
}
