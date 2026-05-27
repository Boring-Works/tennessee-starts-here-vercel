import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDocument, getAllSlugs } from '@/lib/documents'
import '../library.css'

// Generate static params for all documents
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

// Generate metadata for each document
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = getDocument(slug)

  if (!doc) {
    return {
      title: 'Document Not Found | Rocky Mount',
    }
  }

  return {
    title: `${doc.title} | Rocky Mount Document Library`,
    description: doc.whyThisMatters,
    openGraph: {
      title: doc.title,
      description: doc.whyThisMatters,
      url: `https://tennesseestartshere.com/evidence/library/${slug}`,
    },
  }
}

export default async function DocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDocument(slug)

  if (!doc) {
    notFound()
  }

  // Check if this is the Cherokee signatories document
  const isCherokeeSignatories = doc.slug === 'cherokee-treaty-signatories'

  return (
    <div className="library libraryPage">
      <div className="libraryContainer">
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol
            className="flex items-center gap-2 text-sm flex-wrap"
            style={{ color: 'var(--gold-shimmer)' }}
          >
            <li>
              <Link href="/evidence" className="hover:opacity-100 transition-opacity">
                Evidence Room
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/evidence/library" className="hover:opacity-100 transition-opacity">
                Document Library
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li style={{ color: 'var(--gold-leaf, var(--gold-primary))' }} aria-current="page">
              {doc.title}
            </li>
          </ol>
        </nav>

        <article className="documentPage">
          {/* Document Header */}
          <header className="documentHeader">
            <div className="documentHeaderMeta">
              <span className="documentBadge">{doc.badge}</span>
              <span className="documentDate">{doc.dateDisplay}</span>
            </div>
            <h1 className="documentPageTitle">{doc.title}</h1>
          </header>

          {/* Key Quote */}
          {doc.keyQuote && (
            <blockquote className="keyQuote">
              <p className="keyQuoteText">&ldquo;{doc.keyQuote}&rdquo;</p>
              {doc.keyQuoteAttribution && (
                <footer className="keyQuoteAttribution">— {doc.keyQuoteAttribution}</footer>
              )}
            </blockquote>
          )}

          {/* Multiple Excerpts (for multi-passage documents) */}
          {doc.excerpts && doc.excerpts.length > 0 && (
            <section className="documentSection">
              <h2 className="sectionLabel">Key Passages</h2>
              <div className="excerptsList">
                {doc.excerpts.map((excerpt, i) => (
                  <div key={i} className="excerptCard">
                    <blockquote className="excerptText">&ldquo;{excerpt.text}&rdquo;</blockquote>
                    <p className="excerptContext">{excerpt.context}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Why This Matters */}
          <section className="documentSection">
            <h2 className="sectionLabel">Why This Matters</h2>
            <p className="whyThisMatters">{doc.whyThisMatters}</p>
          </section>

          {/* Chief Biographies (for Cherokee document) */}
          {isCherokeeSignatories && doc.chiefBiographies && (
            <section className="documentSection">
              <h2 className="sectionLabel">Key Cherokee Leaders</h2>
              {doc.chiefBiographies.map((chief) => (
                <div key={chief.cherokeeName} className="chiefCard">
                  <h3 className="chiefName">{chief.cherokeeName}</h3>
                  <p className="chiefEnglishName">
                    {chief.englishName}
                    {chief.alternateNames && ` (${chief.alternateNames})`}
                  </p>
                  <p className="chiefRole">{chief.role}</p>
                  {chief.birthDeath && <p className="chiefRole">{chief.birthDeath}</p>}
                  <p className="chiefBio">{chief.biography}</p>
                </div>
              ))}
            </section>
          )}

          {/* Document Text */}
          <section className="documentSection">
            <h2 className="sectionLabel">The Document</h2>
            <div className="documentText" dangerouslySetInnerHTML={{ __html: doc.content }} />
          </section>

          {/* Signatories Table (for Cherokee document) */}
          {isCherokeeSignatories && doc.signatories && (
            <section className="documentSection">
              <h2 className="sectionLabel">All Forty Signatories</h2>
              <table className="signatoriesTable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cherokee Name</th>
                    <th>English Name</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.signatories.map((sig) => (
                    <tr key={sig.number}>
                      <td>{sig.number}</td>
                      <td className="cherokeeName">{sig.cherokeeName}</td>
                      <td className="englishName">{sig.englishName || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Source Metadata */}
          <section className="documentSection">
            <h2 className="sectionLabel">About This Source</h2>
            <div className="sourceMetadata">
              <div className="metadataGrid">
                {doc.author && (
                  <div className="metadataRow">
                    <span className="metadataLabel">Author</span>
                    <span className="metadataValue">
                      {doc.author}
                      {doc.authorTitle && (
                        <span className="metadataSubtext">{doc.authorTitle}</span>
                      )}
                    </span>
                  </div>
                )}
                {doc.recipient && (
                  <div className="metadataRow">
                    <span className="metadataLabel">Recipient</span>
                    <span className="metadataValue">
                      {doc.recipient}
                      {doc.recipientLocation && (
                        <span className="metadataSubtext">{doc.recipientLocation}</span>
                      )}
                    </span>
                  </div>
                )}
                {doc.location && (
                  <div className="metadataRow">
                    <span className="metadataLabel">Written From</span>
                    <span className="metadataValue">{doc.location}</span>
                  </div>
                )}
                <div className="metadataRow">
                  <span className="metadataLabel">Date</span>
                  <span className="metadataValue">{doc.dateDisplay}</span>
                </div>
                <div className="metadataRow">
                  <span className="metadataLabel">Repository</span>
                  <span className="metadataValue">
                    {doc.sources.map((source, i) => (
                      <span key={source.url}>
                        {i > 0 && '; '}
                        {source.name}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="metadataRow">
                  <span className="metadataLabel">View Original</span>
                  <span className="metadataValue">
                    {doc.sources.map((source, i) => (
                      <span key={source.url}>
                        {i > 0 && <br />}
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="metadataLink"
                        >
                          {source.name} <span aria-hidden="true">↗</span>
                        </a>
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* People Mentioned */}
          {doc.peopleMentioned && doc.peopleMentioned.length > 0 && (
            <section className="documentSection">
              <h2 className="sectionLabel">People Mentioned</h2>
              <ul className="peopleMentioned">
                {doc.peopleMentioned.map((person) => (
                  <li key={person}>{person}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interpretive Notes (for curators/researchers) */}
          {doc.interpretiveNotes && (
            <section className="documentSection interpretiveSection">
              <h2 className="sectionLabel">Interpretive Notes</h2>
              <p className="interpretiveNotes">{doc.interpretiveNotes}</p>
            </section>
          )}

          {/* Related Documents */}
          {doc.relatedDocuments && doc.relatedDocuments.length > 0 && (
            <section className="documentSection">
              <h2 className="sectionLabel">Related Documents</h2>
              <ul className="relatedDocuments">
                {doc.relatedDocuments.map((related) => (
                  <li key={related.slug}>
                    <Link href={`/evidence/library/${related.slug}`}>{related.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Document Footer */}
          <footer className="documentFooter">
            <p className="footerAttribution">Rocky Mount State Historic Site</p>
            <p className="footerLicense">
              This document is in the public domain. You may freely share, copy, and cite it. Rocky
              Mount State Historic Site provides this transcription as an educational service.
            </p>

            <div className="footerCitation">
              <p className="citationLabel">Suggested Citation</p>
              <p className="citationText">{doc.citation}</p>
            </div>

            <nav className="footerNav">
              <Link href="/evidence/library" className="footerNavLink">
                <span aria-hidden="true">←</span> Back to Document Library
              </Link>
            </nav>
          </footer>
        </article>
      </div>
    </div>
  )
}
