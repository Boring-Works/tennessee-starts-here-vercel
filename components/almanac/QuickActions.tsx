'use client'

import { useMemo } from 'react'
import { AlertTriangle, Flame, Snowflake, ThermometerSnowflake } from 'lucide-react'

interface ActionCard {
  id: string
  priority: number
  message: string
  icon: React.ReactNode
  color: 'red' | 'orange' | 'blue'
}

interface QuickActionsProps {
  hasActiveAlert?: boolean
  alertTitle?: string
  burnDayStatus?: 'burn' | 'no-burn' | 'unknown'
  freezeInfo?: {
    isBelow32: boolean
    nextFreezeHours?: number
    frostRisk: boolean
  }
}

export function QuickActions({
  hasActiveAlert,
  alertTitle,
  burnDayStatus,
  freezeInfo,
}: QuickActionsProps) {
  const actions = useMemo(() => {
    const allActions: ActionCard[] = []

    // 1. NWS Alert (highest priority)
    if (hasActiveAlert && alertTitle) {
      allActions.push({
        id: 'alert',
        priority: 1,
        message: `Alert: ${alertTitle}`,
        icon: <AlertTriangle className="w-4 h-4 flex-shrink-0" />,
        color: 'red',
      })
    }

    // 2. No Burn Day
    if (burnDayStatus === 'no-burn') {
      allActions.push({
        id: 'no-burn',
        priority: 2,
        message: 'No Burning: Fire weather alert in effect',
        icon: <Flame className="w-4 h-4 flex-shrink-0" />,
        color: 'orange',
      })
    }

    // 3. Freeze Warnings
    if (freezeInfo?.isBelow32) {
      allActions.push({
        id: 'freeze',
        priority: 3,
        message: 'Freeze Risk: Currently below 32°F',
        icon: <Snowflake className="w-4 h-4 flex-shrink-0" />,
        color: 'blue',
      })
    } else if (freezeInfo?.frostRisk) {
      allActions.push({
        id: 'frost',
        priority: 3,
        message: 'Freeze Risk: Frost conditions possible',
        icon: <ThermometerSnowflake className="w-4 h-4 flex-shrink-0" />,
        color: 'blue',
      })
    } else if (freezeInfo?.nextFreezeHours && freezeInfo.nextFreezeHours <= 12) {
      allActions.push({
        id: 'freeze-coming',
        priority: 3,
        message: `Freeze Risk: Expected in ${freezeInfo.nextFreezeHours} hours`,
        icon: <Snowflake className="w-4 h-4 flex-shrink-0" />,
        color: 'blue',
      })
    }

    return allActions.sort((a, b) => a.priority - b.priority)
  }, [hasActiveAlert, alertTitle, burnDayStatus, freezeInfo])

  // Don't render if no actions
  if (actions.length === 0) {
    return null
  }

  const colorClasses = {
    red: 'bg-red-900/20 border-red-500/40 text-red-300',
    orange: 'bg-orange-900/20 border-orange-500/40 text-orange-300',
    blue: 'bg-blue-900/20 border-blue-500/40 text-blue-300',
  }

  return (
    <section aria-label="Quick Actions" className="mb-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-almanac-gold mb-2">
        ⚠️ Immediate Actions
      </h2>
      <div className="space-y-2">
        {actions.map((action) => (
          <div
            key={action.id}
            className={`rounded-lg border p-3 flex items-start gap-2 ${colorClasses[action.color]}`}
          >
            {action.icon}
            <p className="text-base font-semibold tracking-wide leading-tight">
              <strong>{action.message.split(':')[0]}:</strong>
              {action.message.includes(':') && ` ${action.message.split(':').slice(1).join(':')}`}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
