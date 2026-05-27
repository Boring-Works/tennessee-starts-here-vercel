import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getCollection,
  getCollectionSlugs,
  getDocumentsByCollection,
  getPerson,
} from '@/lib/evidence/loader'
import { EvidenceNav } from '@/components/evidence/EvidenceNav'
import './collection.css'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const collection = await getCollection(slug)

  if (!collection) {
    return { title: 'Collection Not Found' }
  }

  return {
    title: `${collection.name} | Evidence Room`,
    description: collection.description,
  }
}

// Simple markdown renderer for collection content
function renderContent(content: string): React.ReactNode {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentParagraph: string[] = []
  let currentList: React.ReactNode[] = []
  let key = 0

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim()
      if (text) {
        elements.push(
          <p key={key++} className="collectionText">
            {text}
          </p>
        )
      }
      currentParagraph = []
    }
  }

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="collectionList">
          {currentList}
        </ul>
      )
      currentList = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('## ')) {
      flushParagraph()
      flushList()
      elements.push(
        <h2 key={key++} className="collectionHeading">
          {trimmed.slice(3)}
        </h2>
      )
    } else if (trimmed.startsWith('### ')) {
      flushParagraph()
      flushList()
      elements.push(
        <h3 key={key++} className="collectionSubheading">
          {trimmed.slice(4)}
        </h3>
      )
    } else if (trimmed.startsWith('- ')) {
      flushParagraph()
      currentList.push(
        <li key={key++} className="collectionListItem">
          {trimmed.slice(2)}
        </li>
      )
    } else if (trimmed === '') {
      flushParagraph()
      flushList()
    } else {
      flushList()
      currentParagraph.push(trimmed)
    }
  }

  flushParagraph()
  flushList()
  return elements
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params
  const collection = await getCollection(slug)

  if (!collection) {
    notFound()
  }

  // Get documents in this collection
  const documents = await getDocumentsByCollection(collection.id)
  const sortedDocuments = [...documents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Get key figures
  const keyFigures = await Promise.all(collection.key_figures.map((id) => getPerson(id)))
  const validKeyFigures = keyFigures.filter((p) => p !== null)

  // Get key passages from documents
  const keyPassages = documents
    .flatMap((doc) =>
      doc.passages.map((passage) => ({
        ...passage,
        document_title: doc.title,
        document_date: doc.date,
      }))
    )
    .slice(0, 5)

  return (
    <div className="collectionPage">
      <div className="collectionContainer">
        <main className="collectionContent">
          <EvidenceNav isPageTop />

          {/* Header */}
          <header className="collectionHeader">
            <span className="collectionBadge">{collection.date_range}</span>
            <h1 className="collectionTitle">{collection.name}</h1>
            <p className="collectionDescription">{collection.description}</p>
          </header>

          {/* Why It Matters */}
          <section className="collectionWhy">
            <h2 className="collectionSectionTitle">Why This Collection Matters</h2>
            <p className="collectionWhyText">{collection.why_it_matters}</p>
          </section>

          {/* Document List */}
          <section className="collectionDocuments">
            <h2 className="collectionSectionTitle">
              Documents
              <span className="collectionCount">{documents.length}</span>
            </h2>
            <ul className="collectionDocList">
              {sortedDocuments.map((doc) => (
                <li key={doc.id} className="collectionDocItem">
                  <Link href={`/evidence/documents/${doc.id}`} className="collectionDocLink">
                    <span className="collectionDocTitle">{doc.title}</span>
                    <span className="collectionDocMeta">
                      <span className="collectionDocDate">{doc.date}</span>
                      <span className="collectionDocType">{doc.content_type}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Key Passages */}
          {keyPassages.length > 0 && (
            <section className="collectionPassages">
              <h2 className="collectionSectionTitle">Key Passages</h2>
              <div className="collectionPassageList">
                {keyPassages.map((passage) => (
                  <Link
                    key={passage.id}
                    href={`/evidence/documents/${passage.document_id}#${passage.anchor}`}
                    className="collectionPassageCard"
                  >
                    <blockquote className="collectionPassageText">
                      &ldquo;{passage.text.slice(0, 200)}
                      {passage.text.length > 200 ? '...' : ''}&rdquo;
                    </blockquote>
                    <cite className="collectionPassageCite">
                      {passage.document_title}, {passage.document_date}
                    </cite>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Key Figures */}
          {validKeyFigures.length > 0 && (
            <section className="collectionFigures">
              <h2 className="collectionSectionTitle">Key Figures</h2>
              <div className="collectionFigureList">
                {validKeyFigures.map((person) => (
                  <Link
                    key={person.id}
                    href={`/evidence/people/${person.id}`}
                    className="collectionFigureCard"
                  >
                    <span className="collectionFigureName">{person.name}</span>
                    {person.role && <span className="collectionFigureRole">{person.role}</span>}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Additional Content */}
          {collection.content && (
            <section className="collectionAbout">{renderContent(collection.content)}</section>
          )}
        </main>
      </div>
    </div>
  )
}
