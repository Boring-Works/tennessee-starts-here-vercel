'use client'

import { useMemo } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface DecisionCard {
  id: string
  priority: number // lower = more urgent
  title: string
  value: string
  icon: React.ReactNode
  color: 'red' | 'amber' | 'blue' | 'green' | 'gray'
  show: boolean
}

interface DecisionRailProps {
  // Temperature anomaly
  tempAnomaly?: {
    diff: number
    description: string
  }
}

export function DecisionRail({ tempAnomaly }: DecisionRailProps) {
  const cards = useMemo(() => {
    const allCards: DecisionCard[] = []

    // Temperature anomaly (if significant)
    if (tempAnomaly && Math.abs(tempAnomaly.diff) >= 5) {
      const isWarmer = tempAnomaly.diff > 0
      allCards.push({
        id: 'anomaly',
        priority: 1,
        title: 'Today vs Normal',
        value: tempAnomaly.description,
        icon: isWarmer ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />,
        color: isWarmer ? 'amber' : 'blue',
        show: true,
      })
    }

    return allCards.filter((c) => c.show)
  }, [tempAnomaly])

  const colorClasses = {
    red: 'bg-red-900/30 border-red-500/40 text-red-300',
    amber: 'bg-amber-900/20 border-amber-500/30 text-amber-300',
    blue: 'bg-blue-900/20 border-blue-500/30 text-blue-300',
    green: 'bg-green-900/20 border-green-500/30 text-green-300',
    gray: 'bg-white/5 border-white/10 text-almanac-parchment/70',
  }

  if (cards.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 h-full">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`rounded-lg border p-3 flex items-start gap-2 ${colorClasses[card.color]}`}
        >
          <div className="flex-shrink-0 mt-0.5">{card.icon}</div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{card.title}</p>
            <p className="text-sm mt-0.5 leading-tight">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
