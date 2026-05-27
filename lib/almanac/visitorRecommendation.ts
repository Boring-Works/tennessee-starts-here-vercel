/**
 * Visitor Recommendation Logic
 *
 * Determines if conditions are ideal for visiting Rocky Mount State Historic Site.
 * Considers temperature comfort, weather alerts, precipitation, wind, and extreme conditions.
 *
 * Recommendation Levels:
 * - 'excellent': Perfect conditions for touring (65-75°F, clear, no alerts)
 * - 'good': Good conditions with minor considerations (60-80°F, mostly clear)
 * - 'fair': Acceptable with precautions (50-85°F, some clouds/light rain)
 * - 'poor': Challenging conditions that discourage visits (temp extremes, storms, alerts)
 */

import { WEATHER_CODES } from './types'

export type VisitRecommendation = 'excellent' | 'good' | 'fair' | 'poor'

interface RecommendationInput {
  temperature: number // Current temperature in Fahrenheit
  weatherCode: number // WMO weather code
  hasAlerts: boolean // Active NWS alerts (any severity)
  windSpeed?: number // Wind speed in mph
  precipitation?: number // Current precipitation in inches
}

interface RecommendationResult {
  level: VisitRecommendation
  headline: string
  description: string
  conditions: string[]
  warnings: string[]
}

/**
 * Analyzes weather conditions and generates visitor recommendation.
 * Returns structured recommendation with headline, details, and reasoning.
 */
export function getVisitorRecommendation(input: RecommendationInput): RecommendationResult {
  const { temperature, weatherCode, hasAlerts, windSpeed = 0, precipitation = 0 } = input

  const weatherInfo = WEATHER_CODES[weatherCode]
  const conditions: string[] = []
  const warnings: string[] = []
  const factors: Array<{ severity: number; reason: string }> = []

  // Temperature scoring (ideal: 65-75°F)
  if (temperature >= 65 && temperature <= 75) {
    conditions.push(`${Math.round(temperature)}°F - Ideal`)
    factors.push({ severity: 0, reason: 'Temperature in ideal range' })
  } else if (temperature >= 60 && temperature <= 80) {
    conditions.push(`${Math.round(temperature)}°F - Comfortable`)
    factors.push({ severity: 1, reason: 'Temperature slightly outside ideal' })
  } else if (temperature >= 50 && temperature <= 85) {
    conditions.push(`${Math.round(temperature)}°F - Acceptable`)
    factors.push({ severity: 2, reason: 'Temperature acceptable with layers' })
  } else {
    conditions.push(`${Math.round(temperature)}°F - Extreme`)
    factors.push({ severity: 4, reason: 'Temperature extreme' })
    if (temperature < 32) {
      warnings.push('Freezing conditions - icy surfaces possible')
    } else if (temperature > 90) {
      warnings.push('Heat advisory - stay hydrated')
    }
  }

  // Weather condition scoring
  const weatherCategory = weatherInfo?.category || 'cloudy'

  if (weatherCategory === 'clear') {
    conditions.push('Clear skies')
    factors.push({ severity: 0, reason: 'Clear conditions' })
  } else if (weatherCategory === 'cloudy') {
    conditions.push('Partly cloudy')
    factors.push({ severity: 1, reason: 'Partly cloudy conditions' })
  } else if (weatherCategory === 'fog') {
    conditions.push('Fog - visibility reduced')
    factors.push({ severity: 2, reason: 'Fog reducing visibility' })
  } else if (weatherCategory === 'drizzle') {
    conditions.push('Light precipitation')
    factors.push({ severity: 2, reason: 'Drizzle - bring umbrella' })
    warnings.push('Light precipitation - bring umbrella')
  } else if (weatherCategory === 'rain') {
    conditions.push('Rain')
    factors.push({ severity: 3, reason: 'Rain conditions' })
    warnings.push('Active precipitation - trails may be wet')
  } else if (weatherCategory === 'snow') {
    conditions.push('Snow')
    factors.push({ severity: 4, reason: 'Snow - hazardous conditions' })
    warnings.push('Snow conditions - trails may be impassable')
  } else if (weatherCategory === 'thunderstorm') {
    conditions.push('Thunderstorms')
    factors.push({ severity: 4, reason: 'Thunderstorms - unsafe' })
    warnings.push('Active thunderstorms - seek shelter')
  }

  // Wind scoring
  if (windSpeed > 0 && windSpeed <= 10) {
    conditions.push(`${Math.round(windSpeed)} mph wind`)
  } else if (windSpeed > 10 && windSpeed <= 25) {
    conditions.push(`${Math.round(windSpeed)} mph wind - gusty`)
    factors.push({ severity: 1, reason: 'Moderate wind' })
  } else if (windSpeed > 25) {
    conditions.push(`${Math.round(windSpeed)} mph wind - strong`)
    factors.push({ severity: 2, reason: 'Strong winds' })
    warnings.push('Strong winds - secure loose items')
  }

  // Alert scoring - highest severity penalty
  if (hasAlerts) {
    conditions.push('Active weather alerts')
    factors.push({ severity: 3, reason: 'NWS alerts in effect' })
    warnings.push('Weather alerts - check details before visiting')
  }

  // Precipitation amount
  if (precipitation > 0.25) {
    factors.push({ severity: 2, reason: `Active precipitation: ${precipitation.toFixed(2)}"` })
  }

  // Calculate overall severity (0-4 scale)
  const maxSeverity = Math.max(...factors.map((f) => f.severity), 0)
  const avgSeverity =
    factors.length > 0 ? factors.reduce((sum, f) => sum + f.severity, 0) / factors.length : 0

  // Determine recommendation level
  let level: VisitRecommendation = 'excellent'
  let headline = 'Excellent conditions'
  let description = 'Perfect day for touring historic grounds'

  if (maxSeverity >= 4) {
    level = 'poor'
    headline = 'Poor conditions - consider rescheduling'
    description = 'Hazardous weather makes visiting unsafe or uncomfortable'
  } else if (maxSeverity >= 3 || avgSeverity >= 2.5) {
    level = 'fair'
    headline = 'Fair conditions - visit with caution'
    description = 'Weather is acceptable, but take precautions'
  } else if (maxSeverity >= 2 || avgSeverity >= 1.5) {
    level = 'good'
    headline = 'Good conditions'
    description = 'Great day for outdoor touring'
  } else {
    level = 'excellent'
    headline = 'Excellent conditions'
    description = 'Ideal weather for exploring Rocky Mount'
  }

  return {
    level,
    headline,
    description,
    conditions,
    warnings,
  }
}

/**
 * Gets color scheme for recommendation level
 */
export function getRecommendationColors(level: VisitRecommendation): {
  bg: string
  border: string
  text: string
  emoji: string
} {
  switch (level) {
    case 'excellent':
      return {
        bg: 'bg-emerald-900/20',
        border: 'border-emerald-500/40',
        text: 'text-emerald-300',
        emoji: '🟢',
      }
    case 'good':
      return {
        bg: 'bg-green-900/20',
        border: 'border-green-500/40',
        text: 'text-green-300',
        emoji: '🟢',
      }
    case 'fair':
      return {
        bg: 'bg-amber-900/20',
        border: 'border-amber-500/40',
        text: 'text-amber-300',
        emoji: '🟡',
      }
    case 'poor':
      return {
        bg: 'bg-red-900/20',
        border: 'border-red-500/40',
        text: 'text-red-300',
        emoji: '🔴',
      }
  }
}
