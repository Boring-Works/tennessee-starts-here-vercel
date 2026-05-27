/**
 * Archive Mapping System — Phase 5.2
 *
 * Connects almanac weather conditions to Rocky Mount's historical archive.
 * Maps weather/seasonal contexts to relevant primary source documents.
 *
 * Architecture:
 * - Weather conditions trigger contextual document links
 * - Documents are organized by theme (weather, rivers, agriculture, Cherokee relations)
 * - Each mapping includes trigger conditions for when to show the link
 */

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * Trigger conditions for showing archive links
 */
export interface ArchiveTrigger {
  /** Temperature range (Fahrenheit) */
  temperature?: { min?: number; max?: number }
  /** Precipitation conditions */
  precipitation?: 'any' | 'none' | 'rain' | 'snow'
  /** Wind conditions */
  wind?: { min?: number; max?: number }
  /** Specific months (1-12) */
  months?: number[]
  /** Season */
  season?: 'spring' | 'summer' | 'fall' | 'winter'
  /** River conditions */
  riverCondition?: 'high' | 'low' | 'normal' | 'frozen'
  /** Task scores */
  taskScore?: {
    type: 'sower' | 'shepherd' | 'keeper' | 'builder'
    threshold?: number // Show if score is above/below this
    operator?: 'above' | 'below'
  }
}

/**
 * Archive document reference
 */
export interface ArchiveDocument {
  /** Document slug (matches content/documents/*.md filename) */
  slug: string
  /** Display title */
  title: string
  /** Brief context for why this document is relevant */
  context: string
  /** When to show this link */
  triggers: ArchiveTrigger[]
  /** Theme category */
  theme: 'weather' | 'rivers' | 'agriculture' | 'cherokee' | 'territorial' | 'travel'
  /** Date of document (for sorting) */
  date: string
}

/**
 * Collection of documents grouped by theme
 */
export interface ArchiveCollection {
  id: string
  name: string
  description: string
  documents: ArchiveDocument[]
}

// =============================================================================
// Document Mappings — Curated connections to primary sources
// =============================================================================

/**
 * Agriculture & Seasonal Activities
 *
 * Documents showing farming, planting, and land use on the frontier
 */
export const AGRICULTURE_DOCUMENTS: ArchiveDocument[] = [
  {
    slug: 'knoxville-gazette-1792-04-14',
    title: 'Spring Planting Season',
    context:
      'Frontier farmers planted corn, wheat, tobacco, and cotton. This gazette describes spring cultivation in 1792.',
    date: '1792-04-14',
    theme: 'agriculture',
    triggers: [
      {
        months: [3, 4, 5],
        season: 'spring',
        temperature: { min: 45, max: 75 },
      },
      {
        taskScore: {
          type: 'sower',
          threshold: 60,
          operator: 'above',
        },
      },
    ],
  },
  {
    slug: 'blount-to-knox-1791-01',
    title: 'Territory Economic Development',
    context:
      'Governor Blount reports on new settlements, farms being cleared, and commerce on the Tennessee and Holston rivers.',
    date: '1791-01-08',
    theme: 'agriculture',
    triggers: [
      {
        months: [1, 2, 3],
        season: 'winter',
      },
    ],
  },
]

/**
 * Rivers & Navigation
 *
 * Documents mentioning the Holston, Tennessee, and other rivers critical to frontier life
 */
export const RIVER_DOCUMENTS: ArchiveDocument[] = [
  {
    slug: 'blount-to-knox-1791-01',
    title: 'River Commerce Report',
    context:
      'Blount describes how the Tennessee and Holston rivers provided transportation for frontier produce.',
    date: '1791-01-08',
    theme: 'rivers',
    triggers: [
      {
        precipitation: 'rain',
      },
      {
        riverCondition: 'high',
      },
    ],
  },
]

/**
 * Weather & Climate
 *
 * Documents referencing weather conditions, seasonal patterns, or climate impact on frontier life
 */
export const WEATHER_DOCUMENTS: ArchiveDocument[] = [
  {
    slug: 'blount-arrival-1790',
    title: "Blount's First Letter from Rocky Mount",
    context:
      'Written nine days after arriving, Blount describes Rocky Mount\'s "Glass Windows"—a status symbol proving it was no rough cabin.',
    date: '1790-10-20',
    theme: 'weather',
    triggers: [
      {
        months: [10],
        season: 'fall',
      },
      {
        temperature: { min: 40, max: 65 },
      },
    ],
  },
  {
    slug: 'rocky-mount-inventory-1791',
    title: 'Rocky Mount Property Inventory',
    context:
      'Detailed description of Rocky Mount buildings and grounds as Blount prepared to move to Knoxville. Mentions smokehouse, springhouse, and outbuildings.',
    date: '1791-10-15',
    theme: 'weather',
    triggers: [
      {
        months: [10, 11],
        season: 'fall',
      },
    ],
  },
]

/**
 * Cherokee Relations
 *
 * Documents about Cherokee leaders, treaty negotiations, and diplomatic relations
 */
export const CHEROKEE_DOCUMENTS: ArchiveDocument[] = [
  {
    slug: 'blount-to-knox-1790-12',
    title: 'Cherokee Chiefs Visit Rocky Mount',
    context:
      'Hanging Maw and other Cherokee chiefs visit Rocky Mount to discuss peace. Blount reports their desire for a formal treaty.',
    date: '1790-12-15',
    theme: 'cherokee',
    triggers: [
      {
        months: [12, 1, 2],
        season: 'winter',
      },
    ],
  },
  {
    slug: 'blount-to-knox-1791-03',
    title: "Treaty Preparations at White's Fort",
    context:
      'Blount sets the location for treaty negotiations and invites Cherokee chiefs including Hanging Maw and Bloody Fellow.',
    date: '1791-03-20',
    theme: 'cherokee',
    triggers: [
      {
        months: [3, 4, 5],
        season: 'spring',
      },
    ],
  },
  {
    slug: 'treaty-holston-1791',
    title: 'Treaty of Holston',
    context:
      'The landmark treaty signed by 42 Cherokee chiefs and Governor Blount, establishing peace and defining boundaries.',
    date: '1791-07-02',
    theme: 'cherokee',
    triggers: [
      {
        months: [7],
        season: 'summer',
      },
    ],
  },
  {
    slug: 'knoxville-gazette-1792-02-25',
    title: 'Cherokee Delegation in Philadelphia',
    context:
      'Bloody Fellow leads Cherokee delegation to meet President Washington. He receives the name "Clear Sky" as symbol of peace.',
    date: '1792-02-25',
    theme: 'cherokee',
    triggers: [
      {
        months: [2, 3],
        season: 'winter',
      },
      {
        precipitation: 'none',
      },
    ],
  },
]

/**
 * Territorial Operations
 *
 * Documents about government operations, militia, and territorial administration
 */
export const TERRITORIAL_DOCUMENTS: ArchiveDocument[] = [
  {
    slug: 'blount-to-knox-1790-11',
    title: 'Organizing Territorial Government',
    context:
      'Blount reports on establishing government authority and organizing militia in the Southwest Territory.',
    date: '1790-11-03',
    theme: 'territorial',
    triggers: [
      {
        months: [11],
        season: 'fall',
      },
    ],
  },
  {
    slug: 'washington-proclamation-1791',
    title: 'Washington Proclaims Treaty as Law',
    context:
      'President Washington makes the Treaty of Holston binding federal law, countersigned by Secretary of State Thomas Jefferson.',
    date: '1791-11-11',
    theme: 'territorial',
    triggers: [
      {
        months: [11],
        season: 'fall',
      },
    ],
  },
  {
    slug: 'knoxville-gazette-1792-07-07',
    title: 'Treaty Anniversary & Population Growth',
    context:
      'First anniversary of the Treaty of Holston. The gazette reports remarkable population increase and new settlements.',
    date: '1792-07-07',
    theme: 'territorial',
    triggers: [
      {
        months: [7],
        season: 'summer',
      },
    ],
  },
]

/**
 * Travel & Communication
 *
 * Documents about frontier travel conditions, postal service, and transportation
 */
export const TRAVEL_DOCUMENTS: ArchiveDocument[] = [
  {
    slug: 'blount-to-knox-1791-01',
    title: 'River Transportation Report',
    context:
      'Describes how rivers provided convenient transportation for produce and goods across the frontier.',
    date: '1791-01-08',
    theme: 'travel',
    triggers: [
      {
        riverCondition: 'normal',
      },
      {
        months: [3, 4, 5, 6, 7, 8, 9, 10],
      },
    ],
  },
]

// =============================================================================
// Master Collection
// =============================================================================

/**
 * All archive documents organized by theme
 */
export const ARCHIVE_COLLECTIONS: ArchiveCollection[] = [
  {
    id: 'agriculture',
    name: 'Agriculture & Farming',
    description: 'Frontier farming, planting seasons, and land cultivation',
    documents: AGRICULTURE_DOCUMENTS,
  },
  {
    id: 'rivers',
    name: 'Rivers & Navigation',
    description: 'The Holston and Tennessee rivers as lifelines of frontier commerce',
    documents: RIVER_DOCUMENTS,
  },
  {
    id: 'weather',
    name: 'Weather & Climate',
    description: 'Seasonal patterns and weather impact on frontier life',
    documents: WEATHER_DOCUMENTS,
  },
  {
    id: 'cherokee',
    name: 'Cherokee Relations',
    description: 'Diplomatic relations, treaty negotiations, and Cherokee leaders',
    documents: CHEROKEE_DOCUMENTS,
  },
  {
    id: 'territorial',
    name: 'Territorial Operations',
    description: 'Government administration and territorial organization',
    documents: TERRITORIAL_DOCUMENTS,
  },
  {
    id: 'travel',
    name: 'Travel & Transportation',
    description: 'Frontier travel, river navigation, and communication',
    documents: TRAVEL_DOCUMENTS,
  },
]

/**
 * All documents flattened for easy searching
 */
export const ALL_ARCHIVE_DOCUMENTS: ArchiveDocument[] = ARCHIVE_COLLECTIONS.flatMap(
  (collection) => collection.documents
)

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get current season from month
 */
export function getSeason(month: number): 'spring' | 'summer' | 'fall' | 'winter' {
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'fall'
  return 'winter'
}

/**
 * Check if a temperature matches a trigger range
 */
export function matchesTemperature(temp: number, range?: { min?: number; max?: number }): boolean {
  if (!range) return true
  if (range.min !== undefined && temp < range.min) return false
  if (range.max !== undefined && temp > range.max) return false
  return true
}

/**
 * Check if precipitation matches trigger condition
 */
export function matchesPrecipitation(
  hasRain: boolean,
  hasSnow: boolean,
  condition?: 'any' | 'none' | 'rain' | 'snow'
): boolean {
  if (!condition) return true
  if (condition === 'any') return hasRain || hasSnow
  if (condition === 'none') return !hasRain && !hasSnow
  if (condition === 'rain') return hasRain
  if (condition === 'snow') return hasSnow
  return true
}

/**
 * Check if a document's triggers match current conditions
 */
export function matchesTriggers(
  doc: ArchiveDocument,
  conditions: {
    temperature: number
    month: number
    hasRain: boolean
    hasSnow: boolean
    windSpeed?: number
    taskScores?: {
      sower: number
      shepherd: number
      keeper: number
      builder: number
    }
  }
): boolean {
  // A document matches if ANY of its triggers match
  return doc.triggers.some((trigger) => {
    // Check temperature
    if (trigger.temperature && !matchesTemperature(conditions.temperature, trigger.temperature)) {
      return false
    }

    // Check month
    if (trigger.months && !trigger.months.includes(conditions.month)) {
      return false
    }

    // Check season
    if (trigger.season && trigger.season !== getSeason(conditions.month)) {
      return false
    }

    // Check precipitation
    if (
      trigger.precipitation &&
      !matchesPrecipitation(conditions.hasRain, conditions.hasSnow, trigger.precipitation)
    ) {
      return false
    }

    // Check wind
    if (trigger.wind) {
      if (conditions.windSpeed === undefined) return false
      if (trigger.wind.min !== undefined && conditions.windSpeed < trigger.wind.min) return false
      if (trigger.wind.max !== undefined && conditions.windSpeed > trigger.wind.max) return false
    }

    // Check task scores
    if (trigger.taskScore && conditions.taskScores) {
      const score = conditions.taskScores[trigger.taskScore.type]
      const threshold = trigger.taskScore.threshold ?? 50
      const operator = trigger.taskScore.operator ?? 'above'

      if (operator === 'above' && score <= threshold) return false
      if (operator === 'below' && score >= threshold) return false
    }

    // All checks passed for this trigger
    return true
  })
}

/**
 * Get relevant archive documents for current weather conditions
 */
export function getRelevantDocuments(conditions: {
  temperature: number
  month: number
  hasRain: boolean
  hasSnow: boolean
  windSpeed?: number
  taskScores?: {
    sower: number
    shepherd: number
    keeper: number
    builder: number
  }
}): ArchiveDocument[] {
  return ALL_ARCHIVE_DOCUMENTS.filter((doc) => matchesTriggers(doc, conditions))
}

/**
 * Get documents by theme
 */
export function getDocumentsByTheme(
  theme: 'weather' | 'rivers' | 'agriculture' | 'cherokee' | 'territorial' | 'travel'
): ArchiveDocument[] {
  return ALL_ARCHIVE_DOCUMENTS.filter((doc) => doc.theme === theme)
}

/**
 * Get a collection by ID
 */
export function getCollection(id: string): ArchiveCollection | undefined {
  return ARCHIVE_COLLECTIONS.find((col) => col.id === id)
}
