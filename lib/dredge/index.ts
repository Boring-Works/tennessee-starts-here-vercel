/**
 * The Dredge - Rocky Mount Document Discovery System
 * Entry point for all dredge-related utilities
 */

export * from './parser'
export * from './extraction-prompt'
export * from './confidence-gate'
export * from './reference-library'

// Re-export types
export type { ExtractedMetadata, ParseResult, PersonSearchPattern, SearchMatch } from './parser'

export type { ConfidenceResult, EscalationFlag, EscalationLog } from './confidence-gate'

export type { VerifiedFact } from './reference-library'
