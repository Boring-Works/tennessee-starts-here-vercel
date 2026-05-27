'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  getVisitorRecommendation,
  getRecommendationColors,
} from '@/lib/almanac/visitorRecommendation'
import { getWeatherInfo } from '@/lib/almanac/types'

/**
 * VisitorStatusCard Component
 *
 * Prominent status card displayed at the top of the Almanac view.
 * Answers: "Should I visit Rocky Mount today?"
 *
 * Features:
 * - Large, scannable text with clear answer
 * - Color-coded status (green/yellow/red)
 * - Weather description and conditions summary
 * - Secondary line about site access
 * - Mobile-first responsive design
 * - Accessible with proper ARIA labels
 */

interface VisitorStatusCardProps {
  temperature: number
  weatherCode: number
  hasAlerts: boolean
  windSpeed?: number
  precipitation?: number
}

export function VisitorStatusCard({
  temperature,
  weatherCode,
  hasAlerts,
  windSpeed,
  precipitation,
}: VisitorStatusCardProps) {
  // Generate recommendation based on weather data
  const recommendation = useMemo(
    () =>
      getVisitorRecommendation({
        temperature,
        weatherCode,
        hasAlerts,
        windSpeed,
        precipitation,
      }),
    [temperature, weatherCode, hasAlerts, windSpeed, precipitation]
  )

  const colors = getRecommendationColors(recommendation.level)
  const weatherInfo = getWeatherInfo(weatherCode)

  // Determine if site is accessible (typically always open during operating hours)
  // This can be expanded to check against site hours and closure dates
  const isSiteAccessible = recommendation.level !== 'poor'
  const accessMessage = isSiteAccessible
    ? 'All buildings and trails open'
    : 'Check site status before visiting'

  // Create accessibility label combining headline and description
  const accessibilityLabel = `${recommendation.headline}. ${recommendation.description}. Conditions: ${recommendation.conditions.join(', ')}.`

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label="Visitor recommendation"
      className={`rounded-lg border p-5 sm:p-6 ${colors.bg} ${colors.border} border`}
    >
      {/* Main Hero Section */}
      <div className="mb-4 sm:mb-5">
        {/* Status Indicator with Icon */}
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <span className="text-2xl sm:text-3xl" aria-hidden="true">
            {colors.emoji}
          </span>
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${colors.text}`}
            id="visitor-status-headline"
          >
            {recommendation.headline}
          </h2>
        </div>

        {/* Primary Description */}
        <p className="text-base sm:text-lg font-medium text-almanac-parchment mb-3">
          {recommendation.description}
        </p>

        {/* Conditions Summary */}
        <div
          className="text-sm sm:text-base text-almanac-parchment/75 leading-relaxed mb-1"
          aria-label="Current weather conditions"
        >
          {temperature}°F, {weatherInfo.condition} —{' '}
          {recommendation.conditions.slice(0, 3).join(', ')}
        </div>

        {/* Site Access Status */}
        <p
          className={`text-xs sm:text-sm font-semibold uppercase tracking-wide ${isSiteAccessible ? 'text-emerald-300' : 'text-amber-300'}`}
          role="status"
          aria-live="polite"
        >
          {accessMessage}
        </p>
      </div>

      {/* Warnings Section - only show if present */}
      {recommendation.warnings.length > 0 && (
        <div className="pt-4 sm:pt-5 border-t border-almanac-gold/10">
          <ul
            className="space-y-1.5 text-xs sm:text-sm text-almanac-parchment/80"
            role="region"
            aria-label="Weather considerations"
          >
            {recommendation.warnings.map((warning, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5" aria-hidden="true">
                  ⚠️
                </span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Accessibility support - screen reader only */}
      <div className="sr-only" role="status">
        {accessibilityLabel}
      </div>
    </motion.section>
  )
}
