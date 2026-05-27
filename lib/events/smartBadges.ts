/**
 * Smart Badges for Events
 *
 * Generates conversion-focused badges based on event properties.
 * All badges are designed to DRIVE conversions, never to indicate
 * low interest or unpopularity.
 *
 * Philosophy:
 * - Every badge should create urgency or highlight value
 * - Never show empty states or negative signals
 * - Focus on scarcity, timing, and value
 */

export interface EventData {
  id: string
  date: string
  endDate?: string | null
  category: string
  type: string
  featured?: boolean
  capacity?: number
  pricing?: {
    adult?: number | null
    child?: number | null
    members?: number | null
    underFive?: number | null
  } | null
}

export interface SmartBadge {
  /** Badge text to display */
  label: string
  /** Badge type for styling */
  type: 'urgency' | 'value' | 'popularity' | 'timing'
  /** Priority for display order (lower = higher priority) */
  priority: number
  /** Optional icon name */
  icon?: 'clock' | 'users' | 'star' | 'fire' | 'heart' | 'gift'
}

/**
 * Get days until event from today
 */
function getDaysUntilEvent(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(`${dateStr}T12:00:00`)
  const diffTime = eventDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Get event duration in days
 */
function getEventDuration(event: EventData): number {
  if (!event.endDate) return 1
  const start = new Date(`${event.date}T12:00:00`)
  const end = new Date(`${event.endDate}T12:00:00`)
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

/**
 * Generate smart badges for an event
 *
 * @param event - Event data
 * @param options - Configuration options
 * @returns Array of badges sorted by priority
 */
export function getSmartBadges(
  event: EventData,
  options: {
    /** Maximum number of badges to return */
    maxBadges?: number
    /** Include timing badges (days until event) */
    includeTiming?: boolean
  } = {}
): SmartBadge[] {
  const { maxBadges = 2, includeTiming = true } = options
  const badges: SmartBadge[] = []
  const daysUntil = getDaysUntilEvent(event.date)
  const duration = getEventDuration(event)

  // Skip past events
  if (daysUntil < 0) return []

  // ============================================
  // CAPACITY-BASED BADGES (highest priority)
  // ============================================

  if (event.capacity && event.capacity <= 15) {
    badges.push({
      label: event.capacity <= 10 ? 'Intimate Experience' : `Limited to ${event.capacity}`,
      type: 'urgency',
      priority: 1,
      icon: 'users',
    })
  }

  // ============================================
  // TIMING BADGES
  // ============================================

  if (includeTiming) {
    if (daysUntil === 0) {
      badges.push({
        label: 'Today!',
        type: 'timing',
        priority: 0, // Highest priority
        icon: 'fire',
      })
    } else if (daysUntil === 1) {
      badges.push({
        label: 'Tomorrow!',
        type: 'timing',
        priority: 0,
        icon: 'clock',
      })
    } else if (daysUntil <= 3) {
      badges.push({
        label: 'This Week',
        type: 'timing',
        priority: 2,
        icon: 'clock',
      })
    } else if (daysUntil <= 7) {
      badges.push({
        label: 'Coming Soon',
        type: 'timing',
        priority: 3,
        icon: 'clock',
      })
    } else if (daysUntil <= 14) {
      badges.push({
        label: 'Book Ahead',
        type: 'timing',
        priority: 5,
        icon: 'clock',
      })
    }
  }

  // ============================================
  // CATEGORY-BASED BADGES
  // ============================================

  if (event.category === 'signature') {
    badges.push({
      label: 'Signature Event',
      type: 'popularity',
      priority: 2,
      icon: 'star',
    })
  }

  if (event.category === 'workshop' || event.category === 'camp') {
    badges.push({
      label: 'Hands-On',
      type: 'value',
      priority: 4,
      icon: 'heart',
    })
  }

  // ============================================
  // VALUE-BASED BADGES
  // ============================================

  // Family-friendly pricing (children under 5 free)
  if (event.pricing?.underFive === 0 && event.pricing?.child) {
    badges.push({
      label: 'Family Friendly',
      type: 'value',
      priority: 6,
      icon: 'heart',
    })
  }

  // Members free
  if (event.pricing?.members === 0) {
    badges.push({
      label: 'Free for Members',
      type: 'value',
      priority: 5,
      icon: 'gift',
    })
  }

  // ============================================
  // MULTI-DAY BADGES
  // ============================================

  if (duration >= 3) {
    badges.push({
      label: `${duration}-Day Event`,
      type: 'value',
      priority: 7,
    })
  }

  // ============================================
  // POPULARITY SIGNALS (for featured events)
  // ============================================

  if (event.featured && !badges.some((b) => b.type === 'popularity')) {
    badges.push({
      label: "Don't Miss",
      type: 'popularity',
      priority: 4,
      icon: 'fire',
    })
  }

  // Sort by priority and limit
  return badges.sort((a, b) => a.priority - b.priority).slice(0, maxBadges)
}

/**
 * Get a single primary badge for an event (for compact displays)
 */
export function getPrimaryBadge(event: EventData): SmartBadge | null {
  const badges = getSmartBadges(event, { maxBadges: 1 })
  return badges[0] || null
}

/**
 * Get urgency level for an event (for styling purposes)
 * Returns: 'high' | 'medium' | 'low' | null
 */
export function getUrgencyLevel(event: EventData): 'high' | 'medium' | 'low' | null {
  const daysUntil = getDaysUntilEvent(event.date)

  // Past events
  if (daysUntil < 0) return null

  // High urgency: today, tomorrow, or capacity-limited
  if (daysUntil <= 1 || (event.capacity && event.capacity <= 10)) {
    return 'high'
  }

  // Medium urgency: this week or limited capacity
  if (daysUntil <= 7 || (event.capacity && event.capacity <= 20)) {
    return 'medium'
  }

  // Low urgency: within 2 weeks
  if (daysUntil <= 14) {
    return 'low'
  }

  return null
}
