/**
 * Document Loader for Evidence Transparency Engine
 *
 * Loads MDX documents from the content/documents directory,
 * parses frontmatter using gray-matter, and extracts passage tags.
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type {
  Document,
  DocumentFrontmatter,
  DocumentVerification,
  Passage,
  VerificationStatus,
  DocumentContentType,
  Person,
  PersonFrontmatter,
  Collection,
  CollectionFrontmatter,
} from './types'

// Path to documents directory
const DOCUMENTS_DIR = path.join(process.cwd(), 'content', 'documents')

// Path to people directory
const PEOPLE_DIR = path.join(process.cwd(), 'content', 'people')

// Path to collections directory
const COLLECTIONS_DIR = path.join(process.cwd(), 'content', 'collections')

// =============================================================================
// Passage Extraction
// =============================================================================

/**
 * Extract passages from document content
 *
 * Finds all <passage id="...">...</passage> tags and converts them to Passage objects.
 */
function extractPassages(content: string, documentId: string): Passage[] {
  const passages: Passage[] = []

  // Match <passage id="...">...</passage> tags
  // Handles both single-line and multi-line passages
  const passageRegex = /<passage\s+id="([^"]+)">\s*([\s\S]*?)\s*<\/passage>/g

  let match
  while ((match = passageRegex.exec(content)) !== null) {
    const anchor = match[1]
    const text = match[2].trim()

    // Calculate line numbers
    const startIndex = match.index
    const endIndex = startIndex + match[0].length

    // Count lines before start
    const textBeforeStart = content.slice(0, startIndex)
    const startLine = textBeforeStart.split('\n').length

    // Count lines to end
    const textBeforeEnd = content.slice(0, endIndex)
    const endLine = textBeforeEnd.split('\n').length

    passages.push({
      id: `${documentId}#${anchor}`,
      document_id: documentId,
      anchor,
      text,
      line_range: [startLine, endLine],
    })
  }

  return passages
}

// =============================================================================
// Document Loading Functions
// =============================================================================

/**
 * Get all document slugs for static generation
 *
 * Returns an array of document slugs (filenames without extension)
 */
export async function getDocumentSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(DOCUMENTS_DIR)
    return files
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx?$/, ''))
  } catch (error) {
    // Directory doesn't exist yet
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

/**
 * Get a single document by slug
 *
 * @param slug - The document slug (filename without extension)
 * @returns The parsed Document or null if not found
 */
export async function getDocument(slug: string): Promise<Document | null> {
  // Try both .md and .mdx extensions
  const extensions = ['.md', '.mdx']

  for (const ext of extensions) {
    const filePath = path.join(DOCUMENTS_DIR, `${slug}${ext}`)

    try {
      const rawContent = await fs.readFile(filePath, 'utf-8')

      // Parse frontmatter using gray-matter
      const parsed = matter(rawContent)
      const frontmatter = parsed.data as DocumentFrontmatter
      const content = parsed.content

      // Extract passages from content
      const passages = extractPassages(rawContent, frontmatter.id)

      // Build verification object with defaults
      const verification: DocumentVerification = {
        status: (frontmatter.verification?.status || 'under-review') as VerificationStatus,
        source_count: frontmatter.verification?.source_count || 1,
        method: frontmatter.verification?.method,
        notes: frontmatter.verification?.notes,
      }

      // Build the Document object
      const document: Document = {
        id: frontmatter.id,
        title: frontmatter.title,
        date: String(frontmatter.date),
        content_type: frontmatter.content_type as DocumentContentType,
        source: frontmatter.source,
        source_url: frontmatter.source_url,
        collection: frontmatter.collection,
        author: frontmatter.author,
        recipient: frontmatter.recipient,
        people_mentioned: frontmatter.people_mentioned || [],
        responds_to: frontmatter.responds_to,
        responses: frontmatter.responses,
        verification,
        content,
        passages,
      }

      return document
    } catch (error) {
      // File not found, try next extension
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        continue
      }
      throw error
    }
  }

  return null
}

/**
 * Get all documents
 *
 * Loads and parses all document files from the content directory
 */
export async function getAllDocuments(): Promise<Document[]> {
  const slugs = await getDocumentSlugs()

  const documents = await Promise.all(
    slugs.map(async (slug) => {
      const doc = await getDocument(slug)
      return doc
    })
  )

  // Filter out any null results
  return documents.filter((doc): doc is Document => doc !== null)
}

/**
 * Get documents by collection
 *
 * @param collection - The collection ID to filter by
 */
export async function getDocumentsByCollection(collection: string): Promise<Document[]> {
  const allDocs = await getAllDocuments()
  return allDocs.filter((doc) => doc.collection === collection)
}

/**
 * Get documents by author
 *
 * @param authorId - The author's person ID
 */
export async function getDocumentsByAuthor(authorId: string): Promise<Document[]> {
  const allDocs = await getAllDocuments()
  return allDocs.filter((doc) => doc.author === authorId)
}

/**
 * Get documents mentioning a person
 *
 * @param personId - The person's ID to search for
 */
export async function getDocumentsMentioning(personId: string): Promise<Document[]> {
  const allDocs = await getAllDocuments()
  return allDocs.filter(
    (doc) =>
      doc.author === personId ||
      doc.recipient === personId ||
      doc.people_mentioned.includes(personId)
  )
}

/**
 * Get documents that respond to a specific document
 *
 * @param documentId - The document ID to find responses for
 */
export async function getRespondingDocuments(documentId: string): Promise<Document[]> {
  const allDocs = await getAllDocuments()
  return allDocs.filter((doc) => doc.responds_to === documentId)
}

/**
 * Get a specific passage by its compound ID
 *
 * @param passageId - The passage ID in format "documentId#anchor"
 */
export async function getPassage(passageId: string): Promise<Passage | null> {
  const parts = passageId.split('#')
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return null
  }
  const [documentId, anchor] = parts

  const doc = await getDocument(documentId)

  if (!doc) {
    return null
  }

  return doc.passages.find((p) => p.anchor === anchor) || null
}

// =============================================================================
// Person Loading Functions
// =============================================================================

/**
 * Get all person slugs for static generation
 *
 * Returns an array of person slugs (filenames without extension)
 */
export async function getPersonSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(PEOPLE_DIR)
    return files
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx?$/, ''))
  } catch (error) {
    // Directory doesn't exist yet
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

/**
 * Get a single person by slug
 *
 * @param slug - The person slug (filename without extension)
 * @returns The parsed Person or null if not found
 */
export async function getPerson(slug: string): Promise<Person | null> {
  // Try both .md and .mdx extensions
  const extensions = ['.md', '.mdx']

  for (const ext of extensions) {
    const filePath = path.join(PEOPLE_DIR, `${slug}${ext}`)

    try {
      const rawContent = await fs.readFile(filePath, 'utf-8')

      // Parse frontmatter using gray-matter
      const parsed = matter(rawContent)
      const frontmatter = parsed.data as PersonFrontmatter
      const content = parsed.content

      // Build the Person object
      const person: Person = {
        id: frontmatter.id,
        name: frontmatter.name,
        name_cherokee: frontmatter.name_cherokee,
        role: frontmatter.role,
        town: frontmatter.town,
        clan: frontmatter.clan,
        bio_type: frontmatter.bio_type,
        bio_short: frontmatter.bio_short,
        bio_full: content.trim() || undefined,
        is_cherokee: frontmatter.is_cherokee,
        is_signatory: frontmatter.is_signatory,
        signature_url: frontmatter.signature_url,
        documents: [], // Will be populated when linking documents
      }

      return person
    } catch (error) {
      // File not found, try next extension
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        continue
      }
      throw error
    }
  }

  return null
}

/**
 * Get all people
 *
 * Loads and parses all person files from the content directory
 */
export async function getAllPeople(): Promise<Person[]> {
  const slugs = await getPersonSlugs()

  const people = await Promise.all(
    slugs.map(async (slug) => {
      const person = await getPerson(slug)
      return person
    })
  )

  // Filter out any null results
  return people.filter((person): person is Person => person !== null)
}

/**
 * Get all Cherokee people
 *
 * Returns people where is_cherokee is true
 */
export async function getCherokeePeople(): Promise<Person[]> {
  const allPeople = await getAllPeople()
  return allPeople.filter((person) => person.is_cherokee)
}

/**
 * Get all signatories
 *
 * Returns people who signed the Treaty of Holston (is_signatory = true)
 */
export async function getSignatories(): Promise<Person[]> {
  const allPeople = await getAllPeople()
  return allPeople.filter((person) => person.is_signatory)
}

// =============================================================================
// Collection Loading Functions
// =============================================================================

/**
 * Get all collection slugs for static generation
 *
 * Returns an array of collection slugs (filenames without extension)
 */
export async function getCollectionSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(COLLECTIONS_DIR)
    return files
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx?$/, ''))
  } catch (error) {
    // Directory doesn't exist yet
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

/**
 * Get a single collection by slug
 *
 * @param slug - The collection slug (filename without extension)
 * @returns The parsed Collection or null if not found
 */
export async function getCollection(slug: string): Promise<Collection | null> {
  // Try both .md and .mdx extensions
  const extensions = ['.md', '.mdx']

  for (const ext of extensions) {
    const filePath = path.join(COLLECTIONS_DIR, `${slug}${ext}`)

    try {
      const rawContent = await fs.readFile(filePath, 'utf-8')

      // Parse frontmatter using gray-matter
      const parsed = matter(rawContent)
      const frontmatter = parsed.data as CollectionFrontmatter
      const content = parsed.content

      // Build the Collection object
      const collection: Collection = {
        id: frontmatter.id,
        name: frontmatter.name,
        description: frontmatter.description,
        why_it_matters: frontmatter.why_it_matters,
        document_count: frontmatter.document_count,
        date_range: frontmatter.date_range,
        key_figures: frontmatter.key_figures || [],
        content: content.trim() || undefined,
      }

      return collection
    } catch (error) {
      // File not found, try next extension
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        continue
      }
      throw error
    }
  }

  return null
}

/**
 * Get all collections
 *
 * Loads and parses all collection files from the content directory
 */
export async function getAllCollections(): Promise<Collection[]> {
  const slugs = await getCollectionSlugs()

  const collections = await Promise.all(
    slugs.map(async (slug) => {
      const collection = await getCollection(slug)
      return collection
    })
  )

  // Filter out any null results
  return collections.filter((c): c is Collection => c !== null)
}

// =============================================================================
// Document Navigation Functions
// =============================================================================

/**
 * Navigation data for a document within its collection
 */
export interface DocumentNavigationData {
  previousDoc: { slug: string; title: string } | null
  nextDoc: { slug: string; title: string } | null
  currentIndex: number
  totalCount: number
  collectionName: string | null
}

/**
 * Get navigation data for a document within its collection
 *
 * Returns the previous/next documents in the same collection,
 * ordered by date.
 *
 * @param documentSlug - The current document's slug
 * @returns Navigation data or null if document not found or has no collection
 */
export async function getDocumentNavigation(
  documentSlug: string
): Promise<DocumentNavigationData | null> {
  const currentDoc = await getDocument(documentSlug)

  if (!currentDoc || !currentDoc.collection) {
    return null
  }

  // Get all documents in the same collection
  const collectionDocs = await getDocumentsByCollection(currentDoc.collection)

  // Sort by date (chronological order)
  const sortedDocs = collectionDocs.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateA.getTime() - dateB.getTime()
  })

  // Find current document's index
  const currentIndex = sortedDocs.findIndex((doc) => doc.id === currentDoc.id)

  if (currentIndex === -1) {
    return null
  }

  // Get collection name if available
  const collection = await getCollection(currentDoc.collection)

  // Get previous and next documents
  const previousDoc =
    currentIndex > 0
      ? {
          slug: sortedDocs[currentIndex - 1].id,
          title: sortedDocs[currentIndex - 1].title,
        }
      : null

  const nextDoc =
    currentIndex < sortedDocs.length - 1
      ? {
          slug: sortedDocs[currentIndex + 1].id,
          title: sortedDocs[currentIndex + 1].title,
        }
      : null

  return {
    previousDoc,
    nextDoc,
    currentIndex: currentIndex + 1, // Convert to 1-based index
    totalCount: sortedDocs.length,
    collectionName: collection?.name || null,
  }
}
