/**
 * Document Parser
 * Adapted from Joyce Research OCR patterns (99.4% accuracy on 168 PDFs)
 */

export interface ExtractedMetadata {
  title: string | null
  date: string | null
  datePrecision: 'exact' | 'month' | 'year' | 'estimated' | 'unknown'
  author: string | null
  recipient: string | null
  documentType:
    | 'letter'
    | 'treaty'
    | 'proclamation'
    | 'receipt'
    | 'deed'
    | 'commission'
    | 'minutes'
    | 'other'
  summary: string | null
  keyPeople: string[]
  keyPlaces: string[]
  rockyMountRelevance: 'direct' | 'contextual' | 'none'
  cherokeeContent: boolean
  directQuotes: string[]
  confidence: {
    overall: number
    date: number
    author: number
    transcription: number
  }
  notes: string | null
}

export interface ParseResult {
  text: string
  metadata: ExtractedMetadata
  pages: number
  rawOcrOutput?: string
}

/**
 * Multi-pattern search for historical names
 * Handles variations like "Wm. Blount", "William Blount", "Gov. Blount", "W. Blount"
 */
export function searchForPerson(text: string, person: PersonSearchPattern): SearchMatch[] {
  const matches: SearchMatch[] = []

  for (const pattern of person.patterns) {
    const regex = new RegExp(pattern, 'gi')
    let match
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        pattern: pattern,
        match: match[0],
        index: match.index,
        context: text.slice(Math.max(0, match.index - 50), match.index + match[0].length + 50),
      })
    }
  }

  return matches
}

export interface PersonSearchPattern {
  id: string
  name: string
  patterns: string[]
}

export interface SearchMatch {
  pattern: string
  match: string
  index: number
  context: string
}

/**
 * Known historical figures with search patterns
 */
export const KNOWN_PERSONS: PersonSearchPattern[] = [
  {
    id: 'william-blount',
    name: 'William Blount',
    patterns: [
      'William Blount',
      'Wm\\.? Blount',
      'W\\.? Blount',
      'Gov\\.? Blount',
      'Governor Blount',
      'Blount, William',
    ],
  },
  {
    id: 'william-cobb',
    name: 'William Cobb',
    patterns: ['William Cobb', 'Wm\\.? Cobb', 'W\\.? Cobb', 'Cobb, William'],
  },
  {
    id: 'barsheba-cobb',
    name: 'Barsheba Cobb',
    patterns: ['Barsheba Cobb', 'Mrs\\.? Cobb', 'Cobb, Barsheba'],
  },
  {
    id: 'george-washington',
    name: 'George Washington',
    patterns: [
      'George Washington',
      'G\\.? Washington',
      'President Washington',
      'Gen\\.? Washington',
      'General Washington',
      'Washington, George',
    ],
  },
  {
    id: 'andrew-jackson',
    name: 'Andrew Jackson',
    patterns: ['Andrew Jackson', 'A\\.? Jackson', 'Jackson, Andrew'],
  },
]

/**
 * Known places with search patterns
 */
export const KNOWN_PLACES: PersonSearchPattern[] = [
  {
    id: 'rocky-mount',
    name: 'Rocky Mount',
    patterns: ['Rocky Mount', 'Rocky-Mount', 'Rockie Mount', 'Rocky mount'],
  },
  {
    id: 'southwest-territory',
    name: 'Southwest Territory',
    patterns: [
      'Southwest Territory',
      'South West Territory',
      'Territory South of the River Ohio',
      'territory south.{0,10}ohio',
    ],
  },
  {
    id: 'holston',
    name: 'Holston',
    patterns: ['Holston', 'Treaty of Holston', 'Holston River'],
  },
  {
    id: 'jonesborough',
    name: 'Jonesborough',
    patterns: ['Jonesborough', 'Jonesboro', 'Jones.?borough'],
  },
]

/**
 * Clean OCR artifacts from text
 */
export function cleanOcrText(text: string): string {
  return (
    text
      // Fix common OCR errors
      .replace(/\bf\s+/g, 's ') // Long s often read as f
      .replace(/ſ/g, 's') // Long s character
      .replace(/\bCongrefs\b/gi, 'Congress')
      .replace(/\bUnited States\b/gi, 'United States')
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Fix line break artifacts
      .replace(/(\w)-\s+(\w)/g, '$1$2')
      .trim()
  )
}

/**
 * Extract date from historical document text
 * Handles various 18th century date formats
 */
export function extractDate(text: string): {
  date: string | null
  precision: ExtractedMetadata['datePrecision']
} {
  // Full date patterns: "October 20, 1790", "20th October 1790", "Oct. 20, 1790"
  const fullDatePatterns = [
    /(\d{1,2})(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/i,
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/i,
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/i,
  ]

  for (const pattern of fullDatePatterns) {
    const match = text.match(pattern)
    if (match) {
      const dateStr = match[0]
      const parsed = new Date(dateStr)
      if (!Number.isNaN(parsed.getTime())) {
        return {
          date: parsed.toISOString().split('T')[0],
          precision: 'exact',
        }
      }
    }
  }

  // Year only: "in 1790", "the year 1790"
  const yearPattern = /\b(17\d{2}|18\d{2})\b/
  const yearMatch = text.match(yearPattern)
  if (yearMatch) {
    return {
      date: `${yearMatch[1]}-01-01`,
      precision: 'year',
    }
  }

  return { date: null, precision: 'unknown' }
}

/**
 * Detect Cherokee content in document
 */
export function detectCherokeeContent(text: string): boolean {
  const cherokeePatterns = [
    /cherokee/i,
    /treaty of holston/i,
    /indian nation/i,
    /native american/i,
    /tribal/i,
    /chiefs?\s+(of|from)/i,
    /overhill/i,
    /chickamauga/i,
  ]

  return cherokeePatterns.some((pattern) => pattern.test(text))
}

/**
 * Score document relevance to Rocky Mount
 */
export function scoreRelevance(
  text: string,
  _metadata: Partial<ExtractedMetadata>
): 'direct' | 'contextual' | 'none' {
  const lowerText = text.toLowerCase()

  // Direct relevance indicators
  const directIndicators = [
    'rocky mount',
    'william cobb',
    'barsheba cobb',
    'cobb house',
    'cobb family',
    'piney flats',
    'sullivan county',
  ]

  if (directIndicators.some((indicator) => lowerText.includes(indicator))) {
    return 'direct'
  }

  // Contextual relevance (Southwest Territory era, William Blount)
  const contextualIndicators = [
    'southwest territory',
    'william blount',
    'governor blount',
    'treaty of holston',
    'territory south of the ohio',
    '1790',
    '1791',
    '1792',
  ]

  if (contextualIndicators.some((indicator) => lowerText.includes(indicator))) {
    return 'contextual'
  }

  return 'none'
}
