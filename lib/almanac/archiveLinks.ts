/**
 * Archive Link Utilities — Phase 5.2
 *
 * Helper functions for generating links from almanac components to evidence archive.
 * Provides URL generation, formatting, and integration utilities.
 */

import type { ArchiveDocument } from './archiveMapping'

// =============================================================================
// URL Generation
// =============================================================================

/**
 * Generate a link to an evidence document
 */
export function getDocumentUrl(slug: string): string {
  return `/evidence/documents/${slug}`
}

/**
 * Generate a link to a specific passage in a document
 */
export function getPassageUrl(slug: string, anchor: string): string {
  return `/evidence/documents/${slug}#${anchor}`
}

/**
 * Generate a link to the full evidence archive
 */
export function getEvidenceRoomUrl(): string {
  return '/evidence'
}

/**
 * Generate a link to documents by collection
 */
export function getCollectionUrl(collectionId: string): string {
  return `/evidence/collections/${collectionId}`
}

// =============================================================================
// Document Formatting
// =============================================================================

/**
 * Format a document date for display
 */
export function formatDocumentDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Get a short date format (e.g., "Oct 1790")
 */
export function formatDocumentDateShort(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

/**
 * Format document title with date
 */
export function formatDocumentTitleWithDate(title: string, date: string): string {
  return `${title} (${formatDocumentDateShort(date)})`
}

// =============================================================================
// Link Text Generation
// =============================================================================

/**
 * Generate contextual link text based on document theme
 */
export function getLinkText(doc: ArchiveDocument, variant: 'short' | 'long' = 'short'): string {
  if (variant === 'short') {
    return doc.title
  }

  // Long variant includes context
  return `${doc.title}: ${doc.context}`
}

/**
 * Generate call-to-action text based on document theme
 */
export function getCtaText(theme: ArchiveDocument['theme']): string {
  const ctas: Record<typeof theme, string> = {
    weather: 'See what they wrote about the weather',
    rivers: 'Read about river conditions',
    agriculture: 'Learn about frontier farming',
    cherokee: 'Explore Cherokee relations',
    territorial: 'View territorial records',
    travel: 'See travel conditions',
  }
  return ctas[theme]
}

/**
 * Get a period-appropriate intro phrase for archive links
 */
export function getIntroPhrases(count: number = 1): string[] {
  const phrases = [
    'As recorded in the archives',
    'From the primary sources',
    'The documents show',
    'History records',
    'The evidence reveals',
    'Contemporary accounts describe',
    'Witnessed in the papers',
    'Found in the archives',
  ]

  // Return random selection without repeats
  const shuffled = [...phrases].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// =============================================================================
// Document Organization
// =============================================================================

/**
 * Sort documents by date (most recent first)
 */
export function sortDocumentsByDate(docs: ArchiveDocument[]): ArchiveDocument[] {
  return [...docs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Sort documents by date (oldest first)
 */
export function sortDocumentsByDateAsc(docs: ArchiveDocument[]): ArchiveDocument[] {
  return [...docs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

/**
 * Group documents by theme
 */
export function groupDocumentsByTheme(
  docs: ArchiveDocument[]
): Map<ArchiveDocument['theme'], ArchiveDocument[]> {
  const grouped = new Map<ArchiveDocument['theme'], ArchiveDocument[]>()

  for (const doc of docs) {
    const existing = grouped.get(doc.theme) || []
    grouped.set(doc.theme, [...existing, doc])
  }

  return grouped
}

/**
 * Get top N documents by relevance
 */
export function getTopDocuments(docs: ArchiveDocument[], count: number = 3): ArchiveDocument[] {
  // For now, just return most recent. In future, could add relevance scoring.
  return sortDocumentsByDate(docs).slice(0, count)
}

// =============================================================================
// Display Utilities
// =============================================================================

/**
 * Truncate context text for display
 */
export function truncateContext(text: string, maxLength: number = 120): string {
  if (text.length <= maxLength) return text

  // Find last space before maxLength
  const truncated = text.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > maxLength * 0.8) {
    return `${truncated.slice(0, lastSpace)}...`
  }

  return `${truncated}...`
}

/**
 * Get theme icon for display
 */
export function getThemeIcon(theme: ArchiveDocument['theme']): string {
  const icons: Record<typeof theme, string> = {
    weather: '☁',
    rivers: '〜',
    agriculture: '🌾',
    cherokee: '★',
    territorial: '⚖',
    travel: '→',
  }
  return icons[theme]
}

/**
 * Get theme color class for styling
 */
export function getThemeColor(theme: ArchiveDocument['theme']): string {
  const colors: Record<typeof theme, string> = {
    weather: 'blue',
    rivers: 'cyan',
    agriculture: 'green',
    cherokee: 'orange',
    territorial: 'purple',
    travel: 'yellow',
  }
  return colors[theme]
}

// =============================================================================
// Integration Helpers
// =============================================================================

/**
 * Create a structured link object for rendering
 */
export interface StructuredLink {
  url: string
  title: string
  context: string
  date: string
  dateFormatted: string
  theme: ArchiveDocument['theme']
  themeIcon: string
  themeColor: string
}

/**
 * Convert an ArchiveDocument to a StructuredLink for easy rendering
 */
export function toStructuredLink(doc: ArchiveDocument): StructuredLink {
  return {
    url: getDocumentUrl(doc.slug),
    title: doc.title,
    context: doc.context,
    date: doc.date,
    dateFormatted: formatDocumentDate(doc.date),
    theme: doc.theme,
    themeIcon: getThemeIcon(doc.theme),
    themeColor: getThemeColor(doc.theme),
  }
}

/**
 * Batch convert documents to structured links
 */
export function toStructuredLinks(docs: ArchiveDocument[]): StructuredLink[] {
  return docs.map(toStructuredLink)
}

// =============================================================================
// Analytics & Tracking
// =============================================================================

/**
 * Generate tracking attributes for analytics
 */
export function getTrackingAttributes(doc: ArchiveDocument): Record<string, string> {
  return {
    'data-archive-link': 'true',
    'data-document-slug': doc.slug,
    'data-document-theme': doc.theme,
    'data-document-date': doc.date,
  }
}

/**
 * Generate event name for analytics
 */
export function getAnalyticsEvent(action: 'click' | 'view', doc: ArchiveDocument): string {
  return `archive_link_${action}_${doc.theme}`
}
