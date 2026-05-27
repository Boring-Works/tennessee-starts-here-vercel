'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { TaskScore } from '@/lib/almanac/types'
import { InfoButton, WorkabilityExplainer } from './ScoreExplainer'
import { useCountUp } from '@/lib/almanac/useCountUp'
import { adjustScoreForAQI } from '@/lib/almanac/taskScores'

interface TaskScoresProps {
  sower: TaskScore
  shepherd: TaskScore
  keeper: TaskScore
  builder: TaskScore
  /** AQI value to adjust Outdoor Alert score (optional) */
  aqi?: number | null
}

const SCORE_COLORS: Record<TaskScore['label'], string> = {
  Perfect: 'text-almanac-success',
  Good: 'text-almanac-success',
  Fair: 'text-almanac-warning',
  Poor: 'text-almanac-warning',
  Avoid: 'text-almanac-danger',
}

function isCriticalScore(score: number): boolean {
  return score <= 3
}

function getCardStyle(score: number, isWorst: boolean): string {
  // Only apply danger/warning backgrounds to the single worst score
  // This creates visual hierarchy - the eye is drawn to the one card that needs attention
  if (isWorst && score <= 3) {
    if (score <= 2) {
      return 'bg-red-900/20 border-red-500/40 shadow-lg shadow-red-900/20'
    }
    return 'bg-orange-900/15 border-orange-500/30'
  }
  // All other cards use neutral styling (score numbers, badges, and backgrounds are neutral)
  return 'bg-white/5 border-white/10'
}

// Score card configuration - note "shepherd" key maps to "Outdoor Alert" display
const SCORE_CARDS: {
  key: 'sower' | 'shepherd' | 'keeper' | 'builder'
  title: string
  subtitle: string
}[] = [
  { key: 'sower', title: "Sower's Index", subtitle: 'Gardening & Planting' },
  { key: 'shepherd', title: 'Outdoor Alert', subtitle: 'Pets, Kids & Livestock' },
  { key: 'keeper', title: "Keeper's Gauge", subtitle: 'Property Maintenance' },
  { key: 'builder', title: "Builder's Grade", subtitle: 'Construction & Heavy Work' },
]

function ScoreCard({
  scoreKey,
  title,
  subtitle,
  score,
  index,
  compact = false,
  isWorst = false,
}: {
  scoreKey: string
  title: string
  subtitle: string
  score: TaskScore
  index: number
  compact?: boolean
  isWorst?: boolean
}) {
  const isCritical = isCriticalScore(score.score)
  const cardStyle = getCardStyle(score.score, isWorst)
  // Staggered count-up animation: each card starts 100ms after the previous
  const animatedScore = useCountUp(score.score, { duration: 600, delay: index * 100 })

  return (
    <motion.div
      animate={isWorst ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={isWorst ? 'my-2' : ''}
    >
      <div
        className={`rounded-sm border transition-all card-hover ${cardStyle} ${compact ? 'p-2' : 'p-2.5 lg:p-3'}`}
        role="article"
        aria-label={`${title}: ${score.score} out of 10, ${score.label}`}
      >
        <div className={`flex justify-between items-start ${compact ? 'mb-1' : 'mb-1.5'}`}>
          <div className="flex items-start gap-1">
            <div>
              <h3
                className={`font-serif text-gold-leaf ${compact ? 'text-sm' : 'text-sm lg:text-base'}`}
              >
                {title}
              </h3>
              <p className="text-[10px] lg:text-xs text-almanac-parchment/60">{subtitle}</p>
            </div>
            <InfoButton scoreKey={scoreKey} size="sm" />
          </div>
          <div className="text-right">
            <span
              className={`font-sans font-bold ${isWorst ? `${SCORE_COLORS[score.label]} animate-pulse` : 'text-almanac-parchment'} ${compact ? 'text-xl lg:text-2xl' : 'text-xl lg:text-2xl'}`}
            >
              {animatedScore}
            </span>
            <span className="text-almanac-parchment/40 text-xs">/10</span>
          </div>
        </div>

        {/* Label badge */}
        <div className={`flex items-center gap-1 flex-wrap ${compact ? 'mb-1' : 'mb-1.5'}`}>
          <span
            className={`text-[10px] lg:text-xs font-medium px-1.5 py-0.5 rounded ${
              isWorst
                ? score.label === 'Perfect' || score.label === 'Good'
                  ? 'bg-green-900/30 text-green-400'
                  : score.label === 'Fair'
                    ? 'bg-yellow-900/30 text-yellow-400'
                    : score.label === 'Poor'
                      ? 'bg-orange-900/30 text-orange-400'
                      : 'bg-red-900/30 text-red-400'
                : 'bg-white/10 text-almanac-parchment/70'
            }`}
          >
            {score.label}
          </span>
          {isWorst && isCritical && (
            <span className="text-[10px] lg:text-xs text-red-400 font-medium">Unfavorable</span>
          )}
        </div>

        <p
          className={`leading-snug ${compact ? 'text-xs' : 'text-xs lg:text-sm'} ${
            isWorst && isCritical
              ? 'text-red-300'
              : isWorst
                ? 'text-yellow-300'
                : 'text-almanac-parchment/70'
          }`}
        >
          {score.instruction}
        </p>
      </div>
    </motion.div>
  )
}

export function TaskScores({
  sower,
  shepherd,
  keeper,
  builder,
  aqi,
  compact = false,
}: TaskScoresProps & { compact?: boolean }) {
  // Mobile expansion state
  const [isExpanded, setIsExpanded] = useState(false)

  // Apply AQI adjustment to Outdoor Alert (shepherd) score
  const adjustedShepherd = adjustScoreForAQI(shepherd, aqi ?? null)
  const scores = { sower, shepherd: adjustedShepherd, keeper, builder }

  // Find the worst (lowest) score key to highlight only that card
  const scoreValues = SCORE_CARDS.map(({ key }) => ({ key, value: scores[key].score }))
  const minScore = Math.min(...scoreValues.map((s) => s.value))
  const worstKey = scoreValues.find((s) => s.value === minScore)?.key

  // Calculate weighted overall score
  const overallScore = Math.round(
    adjustedShepherd.score * 0.4 + // Outdoor Alert most important (weather safety)
      sower.score * 0.3 + // Sower second (planting/growing)
      keeper.score * 0.2 + // Keeper third (property)
      builder.score * 0.1 // Builder fourth (heavy construction)
  )

  // On mobile, only show worst card by default
  const cardsToShow = compact
    ? SCORE_CARDS
    : isExpanded
      ? SCORE_CARDS
      : SCORE_CARDS.filter(({ key }) => key === worstKey)

  // Generate overall assessment text for accessibility
  const overallAssessment =
    overallScore >= 7
      ? 'Good day for work'
      : overallScore >= 5
        ? 'Fair conditions'
        : overallScore >= 3
          ? 'Difficult conditions'
          : 'Avoid outdoor work'

  return (
    <section
      className={compact ? 'py-2' : 'py-3 lg:py-4'}
      aria-label={`Today's workability score: ${overallScore} out of 10. ${overallAssessment}`}
    >
      <div className={`flex items-center justify-center gap-3 ${compact ? 'mb-2' : 'mb-3'}`}>
        <h2
          className={`font-serif text-gold-leaf text-center ${compact ? 'text-lg' : 'text-xl lg:text-2xl'}`}
        >
          Today&apos;s Workability
        </h2>
        <WorkabilityExplainer />
      </div>

      {/* Overall Workability Index - Primary Decision Signal */}
      <div
        className="flex flex-col items-center justify-center mb-6 p-4 bg-white/5 rounded-lg border border-white/10"
        role="status"
        aria-live="polite"
        aria-label={`Overall workability score: ${overallScore} out of 10, ${overallAssessment}`}
      >
        <span className="text-xs uppercase tracking-wider text-almanac-parchment/60 mb-2">
          Today&apos;s Overall Workability
        </span>
        <div className="flex items-baseline gap-2">
          <div className="text-5xl font-bold text-almanac-parchment" aria-hidden="true">
            {overallScore}
          </div>
          <div className="text-2xl text-almanac-parchment/40" aria-hidden="true">
            /10
          </div>
        </div>
        <span
          className={`text-sm font-semibold mt-2 px-3 py-1 rounded ${
            overallScore >= 7
              ? 'bg-green-900/30 text-green-400'
              : overallScore >= 5
                ? 'bg-yellow-900/30 text-yellow-400'
                : overallScore >= 3
                  ? 'bg-orange-900/30 text-orange-400'
                  : 'bg-red-900/30 text-red-400'
          }`}
          aria-hidden="true"
        >
          {overallScore >= 7
            ? 'GOOD DAY FOR WORK'
            : overallScore >= 5
              ? 'FAIR CONDITIONS'
              : overallScore >= 3
                ? 'DIFFICULT CONDITIONS'
                : 'AVOID OUTDOOR WORK'}
        </span>
      </div>

      {/* Workability by Task - Detailed Breakdown */}
      <h3 className="text-sm uppercase tracking-wider text-almanac-parchment/60 text-center mb-3">
        Workability by Task
      </h3>

      <div
        className={`grid gap-2 lg:gap-3 ${
          compact
            ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-4'
            : isExpanded
              ? 'grid-cols-2'
              : 'grid-cols-1'
        } lg:grid-cols-4`}
      >
        {cardsToShow.map(({ key, title, subtitle }, index) => (
          <ScoreCard
            key={key}
            scoreKey={key}
            title={title}
            subtitle={subtitle}
            score={scores[key]}
            index={index}
            compact={compact}
            isWorst={key === worstKey}
          />
        ))}
      </div>

      {/* Show "View all scores" on mobile when collapsed */}
      {!compact && !isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="mt-3 w-full py-3 px-4 bg-white/5 border border-almanac-gold/30 rounded-lg text-sm text-almanac-parchment hover:bg-white/10 hover:border-almanac-gold/50 transition-colors lg:hidden"
        >
          View All 4 Workability Scores →
        </button>
      )}

      {/* Show collapse button when expanded on mobile */}
      {!compact && isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          className="mt-3 w-full py-3 px-4 bg-white/5 border border-almanac-gold/30 rounded-lg text-sm text-almanac-parchment hover:bg-white/10 hover:border-almanac-gold/50 transition-colors lg:hidden"
        >
          ← Show Only Critical Score
        </button>
      )}
    </section>
  )
}
