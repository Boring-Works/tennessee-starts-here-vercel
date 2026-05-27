'use client'

import { Leaf } from 'lucide-react'
import VPDGauge from './VPDGauge'
import FrostCountdown from './FrostCountdown'
import GDDTracker from './GDDTracker'
import SoilTemperature from './SoilTemperature'

interface PlantingIntelligenceProps {
  /** Current temperature in °F */
  temperature: number
  /** Current humidity (0-100) */
  humidity: number
  /** Soil temperature in °F (if available) */
  soilTemperature?: number
  /** Today's high temperature in °F */
  tempHigh: number
  /** Today's low temperature in °F */
  tempLow: number
}

export default function PlantingIntelligence({
  temperature,
  humidity,
  soilTemperature,
  tempHigh,
  tempLow,
}: PlantingIntelligenceProps) {
  return (
    <section
      className="space-y-4 h-full"
      aria-label="Planting intelligence dashboard"
    >
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <Leaf className="w-5 h-5 text-almanac-gold" />
        <h2 className="text-lg font-serif text-almanac-parchment tracking-wide">
          Planting Intelligence
        </h2>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Soil Temperature */}
        <div className="col-span-2 sm:col-span-1">
          <SoilTemperature temperature={soilTemperature} />
        </div>

        {/* VPD Gauge */}
        <div className="col-span-2 sm:col-span-1">
          <VPDGauge temperature={temperature} humidity={humidity} />
        </div>

        {/* Frost Countdown */}
        <div className="col-span-2 sm:col-span-1">
          <FrostCountdown />
        </div>

        {/* GDD Tracker */}
        <div className="col-span-2 sm:col-span-1">
          <GDDTracker tempHigh={tempHigh} tempLow={tempLow} />
        </div>
      </div>
    </section>
  )
}
