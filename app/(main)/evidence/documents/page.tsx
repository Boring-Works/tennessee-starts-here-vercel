import type { Metadata } from 'next'
import { getAllDocuments } from '@/lib/evidence/loader'
import { buildSearchIndex } from '@/lib/evidence/search'
import { DocumentsClient } from './DocumentsClient'
import { EvidenceNav } from '@/components/evidence/EvidenceNav'

export const metadata: Metadata = {
  title: 'Document Archive | Evidence Room | Rocky Mount',
  description:
    'Browse and search the complete archive of primary source documents from the founding of Tennessee.',
  openGraph: {
    title: 'Document Archive | Evidence Room',
    description: 'Primary source documents from 1790-1796.',
    url: 'https://tennesseestartshere.com/evidence/documents',
  },
}

export default async function DocumentsPage() {
  // Load all documents and build search index at build time
  const documents = await getAllDocuments()
  const searchIndex = buildSearchIndex(documents)

  // Sort documents by date descending
  const sortedDocuments = [...documents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <>
      <EvidenceNav isPageTop />
      <DocumentsClient documents={sortedDocuments} searchIndex={searchIndex} />
    </>
  )
}
