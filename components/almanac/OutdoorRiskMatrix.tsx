'use client'

import { Wind } from 'lucide-react'
import { motion } from 'framer-motion'

interface OutdoorRiskMatrixProps {
  uvIndex: number
  aqi: number | null
  visibility: number
}

// Convert each metric to 0-5 risk scale
function getUVRisk(uv: number): number {
  if (uv <= 2) return 0 // Low
  if (uv <= 5) return 1 // Moderate
  if (uv <= 7) return 2 // High
  if (uv <= 10) return 3 // Very High
  return 4 // Extreme
}

function getAQIRisk(aqi: number | null): number {
  if (!aqi) return 0
  if (aqi <= 50) return 0 // Good
  if (aqi <= 100) return 1 // Moderate
  if (aqi <= 150) return 2 // Unhealthy for sensitive
  if (aqi <= 200) return 3 // Unhealthy
  return 4 // Very unhealthy+
}

function getVisibilityRisk(vis: number): number {
  // Inverse: low visibility = high risk
  if (vis >= 10) return 0 // Excellent
  if (vis >= 6) return 1 // Good
  if (vis >= 3) return 2 // Fair
  if (vis >= 1) return 3 // Poor
  return 4 // Very poor
}

export default function OutdoorRiskMatrix({ uvIndex, aqi, visibility }: OutdoorRiskMatrixProps) {
  const uvRisk = getUVRisk(uvIndex)
  const aqiRisk = getAQIRisk(aqi)
  const visRisk = getVisibilityRisk(visibility)

  // Overall risk is the WORST of the three (most conservative)
  const overallRisk = Math.max(uvRisk, aqiRisk, visRisk)

  const riskConfig = [
    {
      level: 'SAFE',
      color: 'bg-green-900/30 text-green-400 border-green-500/30',
      message: 'Ideal outdoor conditions',
    },
    {
      level: 'GOOD',
      color: 'bg-blue-900/30 text-blue-400 border-blue-500/30',
      message: 'Good conditions for outdoor work',
    },
    {
      level: 'CAUTION',
      color: 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30',
      message: 'Take precautions outdoors',
    },
    {
      level: 'RISKY',
      color: 'bg-orange-900/30 text-orange-400 border-orange-500/30',
      message: 'Limit outdoor exposure',
    },
    {
      level: 'HAZARDOUS',
      color: 'bg-red-900/30 text-red-400 border-red-500/30',
      message: 'Avoid prolonged outdoor work',
    },
  ]

  const config = riskConfig[overallRisk]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border ${config.color}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Wind className="w-5 h-5" />
        <h3 className="text-sm font-medium text-almanac-parchment uppercase tracking-wide">
          Outdoor Conditions
        </h3>
      </div>

      {/* Dominant Risk Level */}
      <div className="text-center mb-3">
        <div className="text-2xl font-bold mb-1">{config.level}</div>
        <p className="text-xs opacity-80">{config.message}</p>
      </div>

      {/* Breakdown */}
      <div className="text-xs text-almanac-parchment/70 space-y-1">
        <div className="flex justify-between">
          <span>UV Index:</span>
          <span className="font-medium">
            {uvIndex} {['Low', 'Moderate', 'High', 'Very High', 'Extreme'][uvRisk]}
          </span>
        </div>
        {aqi && (
          <div className="flex justify-between">
            <span>Air Quality:</span>
            <span className="font-medium">{aqi} AQI</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Visibility:</span>
          <span className="font-medium">{visibility} mi</span>
        </div>
      </div>
    </motion.div>
  )
}
