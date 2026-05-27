/**
 * Evidence Search System
 *
 * Client-side search for documents and passages.
 * Built at build time, searched at runtime.
 */

import type { Document } from './types'

// =============================================================================
// Search Types
// =============================================================================

export interface SearchEntry {
  /** Document ID */
  doc_id: string
  /** Passage ID (if passage-level result) */
  passage_id?: string
  /** Document title */
  title: string
  /** Document date */
  date: string
  /** Collection */
  collection: string
  /** Content type */
  content_type: string
  /** Author ID (for filtering) */
  author?: string
  /** Searchable text content */
  text: string
  /** Preview text for results */
  preview: string
  /** Deep link URL with anchor if applicable */
  url: string
}

export interface SearchResult extends SearchEntry {
  /** Relevance score (higher is better) */
  score: number
  /** Matched terms */
  matches: string[]
}

export interface SearchIndex {
  entries: SearchEntry[]
  version: string
  built_at: string
}

// =============================================================================
// Index Building
// =============================================================================

/**
 * Build search index from documents
 *
 * Call this at build time to generate the search index.
 */
export function buildSearchIndex(documents: Document[]): SearchIndex {
  const entries: SearchEntry[] = []

  for (const doc of documents) {
    // Add document-level entry
    entries.push({
      doc_id: doc.id,
      title: doc.title,
      date: doc.date,
      collection: doc.collection,
      content_type: doc.content_type,
      author: doc.author,
      text: `${doc.title} ${stripMarkdown(doc.content)}`.toLowerCase(),
      preview: truncateText(stripMarkdown(doc.content), 150),
      url: `/evidence/documents/${doc.id}`,
    })

    // Add passage-level entries
    for (const passage of doc.passages) {
      entries.push({
        doc_id: doc.id,
        passage_id: passage.id,
        title: doc.title,
        date: doc.date,
        collection: doc.collection,
        content_type: doc.content_type,
        author: doc.author,
        text: passage.text.toLowerCase(),
        preview: truncateText(passage.text, 150),
        url: `/evidence/documents/${doc.id}#${passage.anchor}`,
      })
    }
  }

  return {
    entries,
    version: '1.0.0',
    built_at: new Date().toISOString(),
  }
}

// =============================================================================
// Search Functions
// =============================================================================

/**
 * Search the index for matching entries
 *
 * @param index - The search index
 * @param query - Search query string
 * @param options - Search options
 */
export function search(
  index: SearchIndex,
  query: string,
  options: {
    collection?: string
    content_type?: string
    author?: string
    year?: number
    limit?: number
  } = {}
): SearchResult[] {
  const { collection, content_type, author, year, limit = 20 } = options

  // Normalize query
  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return []

  // Split into terms
  const terms = normalizedQuery.split(/\s+/).filter((t) => t.length > 1)
  if (terms.length === 0) return []

  const results: SearchResult[] = []

  for (const entry of index.entries) {
    // Apply filters
    if (collection && entry.collection !== collection) continue
    if (content_type && entry.content_type !== content_type) continue
    if (author && entry.author !== author) continue
    if (year && entry.date) {
      const entryYear = parseInt(entry.date.split('-')[0], 10)
      if (entryYear !== year) continue
    }

    // Calculate score
    const { score, matches } = calculateScore(entry.text, terms)

    if (score > 0) {
      results.push({
        ...entry,
        score,
        matches,
      })
    }
  }

  // Sort by score descending, then by date descending
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  // Apply limit
  return results.slice(0, limit)
}

/**
 * Calculate relevance score for a text against search terms
 */
function calculateScore(text: string, terms: string[]): { score: number; matches: string[] } {
  let score = 0
  const matches: string[] = []

  for (const term of terms) {
    // Exact word match (higher score)
    const wordBoundary = new RegExp(`\\b${escapeRegex(term)}\\b`, 'gi')
    const exactMatches = text.match(wordBoundary)
    if (exactMatches) {
      score += exactMatches.length * 10
      matches.push(term)
    }

    // Partial match (lower score)
    if (text.includes(term)) {
      score += 2
      if (!matches.includes(term)) matches.push(term)
    }
  }

  // Boost for matching all terms
  if (matches.length === terms.length && terms.length > 1) {
    score *= 1.5
  }

  return { score, matches }
}

// =============================================================================
// Highlight Functions
// =============================================================================

/**
 * Escape HTML entities to prevent XSS
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * Highlight search terms in text
 */
export function highlightTerms(text: string, terms: string[]): string {
  let result = escapeHtml(text)

  for (const term of terms) {
    const regex = new RegExp(`(${escapeRegex(term)})`, 'gi')
    result = result.replace(regex, '<mark>$1</mark>')
  }

  return result
}

/**
 * Get a snippet of text around the first match
 */
export function getSnippet(text: string, terms: string[], maxLength: number = 200): string {
  const lowerText = text.toLowerCase()

  // Find first matching term position
  let firstMatch = text.length
  for (const term of terms) {
    const pos = lowerText.indexOf(term.toLowerCase())
    if (pos !== -1 && pos < firstMatch) {
      firstMatch = pos
    }
  }

  // If no match found, return start of text
  if (firstMatch === text.length) {
    return truncateText(text, maxLength)
  }

  // Calculate snippet window
  const start = Math.max(0, firstMatch - 50)
  const end = Math.min(text.length, start + maxLength)

  let snippet = text.slice(start, end)

  // Add ellipsis if truncated
  if (start > 0) snippet = `...${snippet}`
  if (end < text.length) snippet = `${snippet}...`

  return snippet
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Strip markdown formatting from text
 */
function stripMarkdown(text: string): string {
  return (
    text
      // Remove headers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove passage tags
      .replace(/<passage[^>]*>/g, '')
      .replace(/<\/passage>/g, '')
      // Remove emphasis
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      // Remove links
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove HTML tags
      .replace(/<[^>]+>/g, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim()
  )
}

/**
 * Truncate text to max length at word boundary
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text

  const truncated = text.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > maxLength * 0.7) {
    return `${truncated.slice(0, lastSpace)}...`
  }

  return `${truncated}...`
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// =============================================================================
// Filter Helpers
// =============================================================================

/**
 * Get unique collections from index
 */
export function getCollections(index: SearchIndex): string[] {
  const collections = new Set<string>()
  for (const entry of index.entries) {
    collections.add(entry.collection)
  }
  return Array.from(collections).sort()
}

/**
 * Get unique content types from index
 */
export function getContentTypes(index: SearchIndex): string[] {
  const types = new Set<string>()
  for (const entry of index.entries) {
    types.add(entry.content_type)
  }
  return Array.from(types).sort()
}

/**
 * Get date range from index
 */
export function getDateRange(index: SearchIndex): { min: string; max: string } {
  let min = '9999-99-99'
  let max = '0000-00-00'

  for (const entry of index.entries) {
    if (entry.date < min) min = entry.date
    if (entry.date > max) max = entry.date
  }

  return { min, max }
}

// =============================================================================
// Filter Helpers with Counts (Standard Archive Interface)
// =============================================================================

export interface FilterOption {
  value: string
  label: string
  count: number
}

/**
 * Get collections with document counts
 * Only counts document-level entries (not passages)
 */
export function getCollectionsWithCounts(index: SearchIndex): FilterOption[] {
  const counts = new Map<string, number>()

  for (const entry of index.entries) {
    // Only count document-level entries (no passage_id)
    if (!entry.passage_id) {
      counts.set(entry.collection, (counts.get(entry.collection) || 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => b.count - a.count) // Sort by count descending
}

/**
 * Get content types with document counts
 */
export function getContentTypesWithCounts(index: SearchIndex): FilterOption[] {
  const counts = new Map<string, number>()

  for (const entry of index.entries) {
    if (!entry.passage_id) {
      counts.set(entry.content_type, (counts.get(entry.content_type) || 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get unique years from documents
 */
export function getYears(index: SearchIndex): number[] {
  const years = new Set<number>()

  for (const entry of index.entries) {
    if (!entry.passage_id && entry.date) {
      const year = parseInt(entry.date.split('-')[0], 10)
      if (!Number.isNaN(year)) {
        years.add(year)
      }
    }
  }

  return Array.from(years).sort((a, b) => a - b)
}

/**
 * Get years with document counts
 */
export function getYearsWithCounts(index: SearchIndex): FilterOption[] {
  const counts = new Map<number, number>()

  for (const entry of index.entries) {
    if (!entry.passage_id && entry.date) {
      const year = parseInt(entry.date.split('-')[0], 10)
      if (!Number.isNaN(year)) {
        counts.set(year, (counts.get(year) || 0) + 1)
      }
    }
  }

  return Array.from(counts.entries())
    .map(([year, count]) => ({ value: String(year), label: String(year), count }))
    .sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10))
}

/**
 * Get authors with document counts
 */
export function getAuthorsWithCounts(index: SearchIndex): FilterOption[] {
  const counts = new Map<string, number>()

  for (const entry of index.entries) {
    if (!entry.passage_id && entry.author) {
      counts.set(entry.author, (counts.get(entry.author) || 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get total document count (excluding passages)
 */
export function getTotalDocumentCount(index: SearchIndex): number {
  let count = 0
  for (const entry of index.entries) {
    if (!entry.passage_id) count++
  }
  return count
}
