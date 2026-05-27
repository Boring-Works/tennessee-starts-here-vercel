/**
 * Evidence Transparency Engine - Type Definitions
 *
 * These types power the document-to-claim chain that enables
 * visitors to trace any historical claim back to primary sources.
 *
 * Architecture:
 *   Document -> Passage -> Claim
 *   Person <-> Document (bidirectional linking)
 */

// =============================================================================
// Verification Types
// =============================================================================

/**
 * Verification status for documents
 * - verified: Multiple independent sources confirm
 * - single-source: Only one source, but credible
 * - nuance: Contains claims that need additional context
 * - under-review: Actively being researched
 */
export type VerificationStatus = 'verified' | 'single-source' | 'nuance' | 'under-review'

/**
 * How a claim relates to its source passage
 * - direct-quote: Exact words from the document
 * - paraphrase: Restated in modern language
 * - inference: Logical conclusion drawn from evidence
 */
export type ClaimVerification = 'direct-quote' | 'paraphrase' | 'inference'

/**
 * Document content types
 */
export type DocumentContentType =
  | 'letter'
  | 'treaty'
  | 'proclamation'
  | 'newspaper'
  | 'diary'
  | 'report'
  | 'inventory'
  | 'legal'

/**
 * Bio depth for people records
 * - full: Complete biography with research (5 key figures)
 * - basic: Essential info for hover cards (35+ others)
 */
export type BioType = 'full' | 'basic'

// =============================================================================
// Core Interfaces
// =============================================================================

/**
 * Verification metadata attached to documents
 */
export interface DocumentVerification {
  /** Current verification status */
  status: VerificationStatus
  /** Number of independent sources confirming this document */
  source_count: number
  /** Description of verification method used */
  method?: string
  /** Important nuance or caveats about the document */
  notes?: string
}

/**
 * A primary source document in the evidence system
 *
 * Documents are the foundation of all claims. Each document
 * can contain multiple passages, which in turn support claims.
 */
export interface Document {
  /** Unique identifier, typically slugified: "blount-arrival-1790" */
  id: string
  /** Human-readable title: "Blount to Secretary of War" */
  title: string
  /** ISO date string: "1790-10-20" */
  date: string
  /** Type of document */
  content_type: DocumentContentType
  /** Attribution: "Tennessee Encyclopedia, citing Blount Papers" */
  source: string
  /** Link to original document if available online */
  source_url?: string
  /** Collection this belongs to: "blount-papers" */
  collection: string

  // People connections
  /** Person ID of the author */
  author?: string
  /** Person ID of the recipient (for letters) */
  recipient?: string
  /** Person IDs of people mentioned in the document */
  people_mentioned: string[]

  // Conversation threading
  /** Document ID this responds to (for letter chains) */
  responds_to?: string
  /** Document IDs that respond to this */
  responses?: string[]

  // Verification
  /** Verification metadata */
  verification: DocumentVerification

  // Content
  /** Full document text in markdown */
  content: string
  /** Extracted passages that support claims */
  passages: Passage[]
}

/**
 * A specific excerpt from a document that supports a claim
 *
 * Passages allow precise citation - visitors can see exactly
 * which lines of a document support each claim.
 */
export interface Passage {
  /** Compound ID: "blount-arrival-1790#glass-windows" */
  id: string
  /** Parent document ID */
  document_id: string
  /** URL-safe anchor: "glass-windows" */
  anchor: string
  /** The actual passage text */
  text: string
  /** Line numbers in the source document [start, end] */
  line_range: [number, number]
}

/**
 * A historical claim supported by documentary evidence
 *
 * Claims are the interpretive layer - they connect passages
 * to the narrative presented to visitors.
 */
export interface Claim {
  /** Unique identifier: "rocky-mount-had-glass-windows" */
  id: string
  /** The claim statement: "Rocky Mount had glass windows, a status symbol" */
  claim: string
  /** Passage ID that supports this claim */
  passage_id: string
  /** How directly the passage supports the claim */
  verification: ClaimVerification
}

/**
 * A historical person in the evidence system
 *
 * People can be authors, recipients, or mentioned in documents.
 * The system supports both settler and Cherokee perspectives.
 */
export interface Person {
  /** Unique identifier: "william-blount" or "bloody-fellow" */
  id: string
  /** Display name */
  name: string
  /** Cherokee name if applicable */
  name_cherokee?: string
  /** Role or title: "Governor of Southwest Territory" */
  role?: string
  /** Town affiliation for Cherokee signatories */
  town?: string
  /** Clan affiliation if documented */
  clan?: string

  /** Depth of biographical information */
  bio_type: BioType
  /** Brief description for hover cards */
  bio_short?: string
  /** Full biography for dedicated pages */
  bio_full?: string

  /** Whether this person is Cherokee */
  is_cherokee: boolean
  /** Whether this person signed the Treaty of Holston */
  is_signatory: boolean
  /** Link to DigiTreaties signature image */
  signature_url?: string

  /** Document IDs this person is connected to (auto-populated) */
  documents: string[]
}

// =============================================================================
// MDX Frontmatter Types
// =============================================================================

/**
 * Frontmatter shape for Document MDX files
 *
 * Used when parsing MDX files in the content/documents directory.
 * The content field is populated from the MDX body, not frontmatter.
 */
export interface DocumentFrontmatter {
  id: string
  title: string
  date: string
  content_type: DocumentContentType
  source: string
  source_url?: string
  collection: string
  author?: string
  recipient?: string
  people_mentioned?: string[]
  responds_to?: string
  responses?: string[]
  verification: {
    status: VerificationStatus
    source_count: number
    method?: string
    notes?: string
  }
  passages?: Array<{
    anchor: string
    text: string
    line_range: [number, number]
  }>
}

/**
 * Frontmatter shape for Person MDX files
 */
export interface PersonFrontmatter {
  id: string
  name: string
  name_cherokee?: string
  role?: string
  town?: string
  clan?: string
  bio_type: BioType
  bio_short?: string
  is_cherokee: boolean
  is_signatory: boolean
  signature_url?: string
}

/**
 * Frontmatter shape for Claim MDX files
 */
export interface ClaimFrontmatter {
  id: string
  claim: string
  passage_id: string
  verification: ClaimVerification
}

// =============================================================================
// Utility Types
// =============================================================================

/**
 * Document with all relations resolved
 * Used when displaying a document with full context
 */
export interface DocumentWithRelations extends Document {
  author_person?: Person
  recipient_person?: Person
  mentioned_people: Person[]
  responds_to_document?: Document
  response_documents: Document[]
  claims: Claim[]
}

/**
 * Person with all relations resolved
 * Used when displaying a person's full profile
 */
export interface PersonWithRelations extends Person {
  authored_documents: Document[]
  received_documents: Document[]
  mentioned_in_documents: Document[]
}

/**
 * Claim with full context resolved
 * Used when displaying claim provenance
 */
export interface ClaimWithProvenance extends Claim {
  passage: Passage
  document: Document
}

// =============================================================================
// Collection Types
// =============================================================================

/**
 * A collection of related documents
 */
export interface Collection {
  /** Unique identifier: "blount-papers" */
  id: string
  /** Display name: "The Blount Papers" */
  name: string
  /** Brief description of the collection */
  description: string
  /** Why this collection matters for understanding history */
  why_it_matters: string
  /** Number of documents in the collection */
  document_count: number
  /** Date range covered: "1790-1791" */
  date_range: string
  /** Key figures associated with this collection */
  key_figures: string[]
  /** Full content from markdown body */
  content?: string
}

/**
 * Frontmatter shape for Collection MDX files
 */
export interface CollectionFrontmatter {
  id: string
  name: string
  description: string
  why_it_matters: string
  document_count: number
  date_range: string
  key_figures?: string[]
}
