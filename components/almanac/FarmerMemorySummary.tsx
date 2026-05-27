'use client'

import { History } from 'lucide-react'
import { getFarmerMemoryData, getTemperatureAnomaly } from '@/lib/almanac/farmerMemory'

interface FarmerMemorySummaryProps {
  temperature: number
  humidity: number
  pressure: number
  windSpeed: number
  todayHigh: number
  todayLow: number
}

export function FarmerMemorySummary({
  temperature,
  humidity,
  pressure,
  windSpeed,
  todayHigh,
  todayLow,
}: FarmerMemorySummaryProps) {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()

  const data = getFarmerMemoryData(temperature, humidity, pressure, windSpeed)
  const anomaly = getTemperatureAnomaly(todayHigh, todayLow, month, day)

  // Create a one-line summary
  const summary = anomaly.description || `Normal: ${data.thisDay.avgHigh}°/${data.thisDay.avgLow}°`
  const hasPattern = data.patternMatch !== null
  const hasProverb = data.validatedProverb !== null

  return (
    <div className="flex items-center gap-3 text-sm">
      <History className="w-4 h-4 text-gold-leaf flex-shrink-0" />
      <span className="text-almanac-parchment/70">{summary}</span>
      {(hasPattern || hasProverb) && (
        <span className="text-xs text-gold-leaf">(more insights available)</span>
      )}
    </div>
  )
}
