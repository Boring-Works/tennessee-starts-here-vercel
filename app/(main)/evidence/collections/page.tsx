import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllCollections, getDocumentsByCollection } from '@/lib/evidence/loader'
import { EvidenceNav } from '@/components/evidence/EvidenceNav'
import './collections.css'

export const metadata: Metadata = {
  title: 'Collections | Evidence Room | Rocky Mount',
  description:
    "Curated collections of primary source documents from Tennessee's founding era, organized by theme and historical significance.",
  openGraph: {
    title: 'Collections | Evidence Room',
    description: 'Curated document collections from the Southwest Territory period.',
    url: 'https://tennesseestartshere.com/evidence/collections',
  },
}

export default async function CollectionsPage() {
  const collections = await getAllCollections()

  // Get actual document counts for each collection
  const collectionsWithCounts = await Promise.all(
    collections.map(async (collection) => {
      const docs = await getDocumentsByCollection(collection.id)
      return {
        ...collection,
        actualDocCount: docs.length,
      }
    })
  )

  // Sort by document count (most documents first)
  const sortedCollections = collectionsWithCounts.sort(
    (a, b) => b.actualDocCount - a.actualDocCount
  )

  return (
    <div className="collectionsPage">
      <EvidenceNav isPageTop />
      <div className="collectionsContainer">
        <main className="collectionsContent">
          {/* Header */}
          <header className="collectionsHeader">
            <h1 className="collectionsTitle">Document Collections</h1>
            <p className="collectionsSubtitle">
              Primary sources organized by theme and historical significance
            </p>
          </header>

          {/* Introduction */}
          <p className="collectionsIntro">
            These collections bring together related documents from Tennessee&apos;s founding era.
            Each collection tells a different part of the story—from Governor Blount&apos;s
            correspondence to the first newspaper of the frontier.
          </p>

          {/* Collections Grid */}
          <div className="collectionsGrid">
            {sortedCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/evidence/collections/${collection.id}`}
                className="collectionCard"
              >
                <div className="collectionCardHeader">
                  <span className="collectionCardBadge">{collection.date_range}</span>
                  <span className="collectionCardCount">
                    {collection.actualDocCount} document{collection.actualDocCount !== 1 ? 's' : ''}
                  </span>
                </div>
                <h2 className="collectionCardTitle">{collection.name}</h2>
                <p className="collectionCardDescription">{collection.description}</p>
                <span className="collectionCardLink">
                  Explore collection <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
