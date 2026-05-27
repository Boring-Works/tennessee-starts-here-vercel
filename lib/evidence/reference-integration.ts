/**
 * Reference Library Integration
 *
 * Links the reference library (102 verified facts) with people and document pages.
 * Enables displaying verified facts with proper source citations on relevant pages.
 */

import { REFERENCE_LIBRARY, type VerifiedFact } from '@/lib/dredge/reference-library'

/**
 * Get verified facts relevant to a specific person
 *
 * Matches facts by:
 * - Person name in the claim
 * - Person ID if available
 * - Related document IDs
 */
export function getVerifiedFactsForPerson(
  personName: string,
  personId?: string,
  _relatedDocumentIds?: string[]
): VerifiedFact[] {
  const nameLower = personName.toLowerCase()

  return REFERENCE_LIBRARY.filter((fact) => {
    // Check if person name appears in the claim
    const claimLower = fact.claim.toLowerCase()
    if (claimLower.includes(nameLower)) {
      return true
    }

    // Check if person ID appears in fact ID (e.g., ppl-001 facts)
    if (personId && fact.id.toLowerCase().includes(personId.toLowerCase())) {
      return true
    }

    // Could add more sophisticated matching here
    // For now, name matching is sufficient

    return false
  })
}

/**
 * Get verified facts relevant to a specific document
 */
export function getVerifiedFactsForDocument(documentId: string): VerifiedFact[] {
  const docIdLower = documentId.toLowerCase()

  return REFERENCE_LIBRARY.filter((fact) => {
    // Check if document ID appears in claim or source
    const claimLower = fact.claim.toLowerCase()
    const sourceLower = fact.source.toLowerCase()

    return claimLower.includes(docIdLower) || sourceLower.includes(docIdLower)
  })
}

/**
 * Group facts by category for organized display
 */
export function groupFactsByCategory(facts: VerifiedFact[]): Record<string, VerifiedFact[]> {
  const grouped: Record<string, VerifiedFact[]> = {}

  for (const fact of facts) {
    if (!grouped[fact.category]) {
      grouped[fact.category] = []
    }
    grouped[fact.category].push(fact)
  }

  return grouped
}

/**
 * Format category name for display
 */
export function formatCategoryName(category: string): string {
  const names: Record<string, string> = {
    governance: 'Governance',
    construction: 'Construction & Architecture',
    people: 'People & Families',
    treaty: 'Treaties & Diplomacy',
    timeline: 'Historical Timeline',
    cherokee: 'Cherokee Relations',
    administration: 'Territorial Administration',
    violence: 'Frontier Violence',
    geography: 'Geography',
  }

  return names[category] || category
}

/**
 * Get confidence badge color
 */
export function getConfidenceBadgeColor(confidence: string): string {
  switch (confidence) {
    case 'verified':
      return 'bg-green-900/30 text-green-400 border-green-700'
    case 'high':
      return 'bg-blue-900/30 text-blue-400 border-blue-700'
    case 'moderate':
      return 'bg-yellow-900/30 text-yellow-400 border-yellow-700'
    default:
      return 'bg-gray-900/30 text-gray-400 border-gray-700'
  }
}
