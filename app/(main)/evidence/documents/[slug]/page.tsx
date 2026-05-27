import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getDocument,
  getDocumentSlugs,
  getRespondingDocuments,
  getDocumentNavigation,
} from '@/lib/evidence/loader'
import { DocumentViewerClient } from '@/components/evidence/DocumentViewerClient'
import { ConnectionsPanel, DocumentNavigation } from '@/components/evidence'
import { EvidenceNav } from '@/components/evidence/EvidenceNav'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getDocumentSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const document = await getDocument(slug)

  if (!document) {
    return { title: 'Document Not Found' }
  }

  return {
    title: `${document.title} | Evidence Room`,
    description: `Primary source document: ${document.title} (${document.date})`,
  }
}

export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params
  const document = await getDocument(slug)

  if (!document) {
    notFound()
  }

  // Fetch related documents for conversation threading and navigation
  const [respondingDocs, respondedToDoc, navigationData] = await Promise.all([
    getRespondingDocuments(document.id),
    document.responds_to ? getDocument(document.responds_to) : Promise.resolve(null),
    getDocumentNavigation(slug),
  ])

  return (
    <div className="min-h-screen bg-midnight">
      <div className="container mx-auto px-4 pt-28 pb-12">
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm flex-wrap text-gold-leaf/60">
            <li>
              <Link href="/evidence" className="hover:opacity-100 transition-opacity">
                Evidence Room
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/evidence/documents" className="hover:opacity-100 transition-opacity">
                Archive
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gold-leaf" aria-current="page">
              {document.title}
            </li>
          </ol>
        </nav>

        <EvidenceNav isPageTop />

        <DocumentViewerClient document={document} />

        {/* Conversation Threading */}
        <div className="max-w-3xl mx-auto mt-8">
          <ConnectionsPanel
            document={document}
            respondedToDocument={
              respondedToDoc
                ? { id: respondedToDoc.id, title: respondedToDoc.title, date: respondedToDoc.date }
                : null
            }
            respondingDocuments={respondingDocs.map((d) => ({
              id: d.id,
              title: d.title,
              date: d.date,
            }))}
          />
        </div>

        {/* Document Navigation */}
        {navigationData && (
          <div className="max-w-3xl mx-auto">
            <DocumentNavigation
              previousDoc={navigationData.previousDoc}
              nextDoc={navigationData.nextDoc}
              currentIndex={navigationData.currentIndex}
              totalCount={navigationData.totalCount}
              collectionName={navigationData.collectionName || undefined}
            />
          </div>
        )}
      </div>
    </div>
  )
}
