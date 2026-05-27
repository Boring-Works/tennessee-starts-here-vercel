import type { Metadata } from 'next'
import Link from 'next/link'
import './library.css'

export const metadata: Metadata = {
  title: 'Document Library | Rocky Mount State Historic Site',
  description:
    "Primary source documents from Tennessee's founding era, transcribed and verified from original archives.",
  openGraph: {
    title: 'Document Library | Rocky Mount',
    description:
      "Primary source documents from Tennessee's founding era, transcribed and verified.",
    url: 'https://tennesseestartshere.com/evidence/library',
  },
}

// Document type for the library
interface LibraryDocument {
  slug: string
  title: string
  date: string
  dateDisplay: string
  category: 'correspondence' | 'treaties' | 'proclamations' | 'cherokee-sources'
  badge: string
  description: string
}

// Initial 5 documents
const DOCUMENTS: LibraryDocument[] = [
  {
    slug: 'treaty-of-holston-1791',
    title: 'Treaty of Holston with the Cherokee',
    date: '1791-07-02',
    dateDisplay: 'July 2, 1791',
    category: 'treaties',
    badge: 'Treaty',
    description:
      "The defining diplomatic achievement of Governor Blount's territorial governance, establishing peace and boundaries between the United States and Cherokee Nation.",
  },
  {
    slug: 'washington-to-knox-1790',
    title: 'George Washington to Henry Knox',
    date: '1790-08-13',
    dateDisplay: 'August 13, 1790',
    category: 'correspondence',
    badge: 'Presidential',
    description:
      'Contains the question "Where ought the Governor to reside?" The answer—Rocky Mount—made William Cobb\'s home the first seat of territorial government.',
  },
  {
    slug: 'washington-proclamation-1791',
    title: "Washington's Proclamation on the Treaty of Holston",
    date: '1791-11-11',
    dateDisplay: 'November 11, 1791',
    category: 'proclamations',
    badge: 'Proclamation',
    description:
      "President Washington's formal proclamation ratifying the Treaty of Holston, making it binding federal law. Countersigned by Thomas Jefferson.",
  },
  {
    slug: 'jefferson-to-blount-1790',
    title: 'Thomas Jefferson to William Blount',
    date: '1790-08-01',
    dateDisplay: 'August 1, 1790',
    category: 'correspondence',
    badge: 'Cabinet',
    description:
      "Secretary of State Jefferson transmits Blount's official commission as Governor of the Southwest Territory, marking the beginning of federal governance.",
  },
  {
    slug: 'cherokee-treaty-signatories',
    title: 'Cherokee Signatories to the Treaty of Holston',
    date: '1791-07-02',
    dateDisplay: 'July 2, 1791',
    category: 'cherokee-sources',
    badge: 'Cherokee Source',
    description:
      'The forty Cherokee chiefs and warriors who signed the Treaty of Holston, with biographical information on key leaders.',
  },
]

// Category labels
const CATEGORIES = [
  { key: 'all', label: 'All Documents' },
  { key: 'correspondence', label: 'Correspondence' },
  { key: 'treaties', label: 'Treaties' },
  { key: 'proclamations', label: 'Proclamations' },
  { key: 'cherokee-sources', label: 'Cherokee Sources' },
] as const

export default function LibraryIndexPage() {
  // Sort documents by date (newest first for this era means later dates)
  const sortedDocuments = [...DOCUMENTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="library libraryPage">
      <div className="libraryContainer">
        <main className="libraryIndex">
          {/* Header */}
          <header className="libraryHeader">
            <h1 className="libraryTitle">Document Library</h1>
            <p className="librarySubtitle">
              Primary sources from Tennessee&apos;s founding, transcribed and verified
            </p>
          </header>

          {/* Intro */}
          <p className="libraryIntro">
            These documents trace the establishment of federal authority in the Southwest
            Territory—from President Washington&apos;s first questions to the treaties that shaped
            the frontier. Each transcription is verified against original archives.
          </p>

          {/* Category Filter - visual only for now, filtering would require client component */}
          <div className="categoryFilter" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((cat, index) => (
              <button
                type="button"
                key={cat.key}
                className={`categoryButton ${index === 0 ? 'categoryButtonActive' : ''}`}
                role="tab"
                aria-selected={index === 0}
                tabIndex={index === 0 ? 0 : -1}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Document List */}
          <div className="documentList">
            {sortedDocuments.map((doc) => (
              <Link key={doc.slug} href={`/evidence/library/${doc.slug}`} className="documentCard">
                <div className="documentCardHeader">
                  <span className="documentBadge">{doc.badge}</span>
                  <span className="documentDate">{doc.dateDisplay}</span>
                </div>
                <h2 className="documentCardTitle">{doc.title}</h2>
                <p className="documentCardDescription">{doc.description}</p>
                <span className="documentCardLink">
                  Read document <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
