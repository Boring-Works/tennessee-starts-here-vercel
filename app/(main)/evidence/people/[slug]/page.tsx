import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPerson, getPersonSlugs, getDocumentsMentioning } from '@/lib/evidence/loader'
import {
  getVerifiedFactsForPerson,
  groupFactsByCategory,
  formatCategoryName,
  getConfidenceBadgeColor,
} from '@/lib/evidence/reference-integration'
import { EvidenceNav } from '@/components/evidence/EvidenceNav'
import './person.css'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPersonSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const person = await getPerson(slug)

  if (!person) {
    return { title: 'Person Not Found' }
  }

  const displayName = person.name_cherokee
    ? `${person.name_cherokee} (${person.name})`
    : person.name

  return {
    title: `${displayName} | Evidence Room`,
    description:
      person.bio_short || `Profile of ${displayName}, a figure in Tennessee's founding era.`,
  }
}

// Simple markdown renderer for bio content
function renderBioContent(content: string): React.ReactNode {
  // Split into paragraphs and headings
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentParagraph: string[] = []
  let key = 0

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim()
      if (text) {
        elements.push(
          <p key={key++} className="personBioText">
            {text}
          </p>
        )
      }
      currentParagraph = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    // Handle headings
    if (trimmed.startsWith('## ')) {
      flushParagraph()
      elements.push(
        <h2 key={key++} className="personBioHeading">
          {trimmed.slice(3)}
        </h2>
      )
    } else if (trimmed.startsWith('### ')) {
      flushParagraph()
      elements.push(
        <h3 key={key++} className="personBioSubheading">
          {trimmed.slice(4)}
        </h3>
      )
    } else if (trimmed === '') {
      flushParagraph()
    } else {
      currentParagraph.push(trimmed)
    }
  }

  flushParagraph()
  return elements
}

export default async function PersonPage({ params }: PageProps) {
  const { slug } = await params
  const person = await getPerson(slug)

  if (!person) {
    notFound()
  }

  // Get documents mentioning this person
  const relatedDocuments = await getDocumentsMentioning(person.id)

  // Get verified facts from reference library
  const verifiedFacts = getVerifiedFactsForPerson(
    person.name,
    person.id,
    person.documents || relatedDocuments.map((d) => d.id)
  )
  const factsByCategory = groupFactsByCategory(verifiedFacts)

  return (
    <div className="personPage">
      <div className="personContainer">
        <main className="personContent">
          <EvidenceNav isPageTop />

          {/* Header */}
          <header className="personHeader">
            {/* Badge */}
            <div className="personBadges">
              {person.is_cherokee && (
                <span className="personBadge personBadgeCherokee">Cherokee</span>
              )}
              {person.is_signatory && (
                <span className="personBadge personBadgeSignatory">Treaty Signatory</span>
              )}
            </div>

            {/* Names */}
            <div className="personNames">
              {person.name_cherokee && (
                <h1 className="personCherokeeName">{person.name_cherokee}</h1>
              )}
              <p className={person.name_cherokee ? 'personEnglishName' : 'personPrimaryName'}>
                {person.name}
              </p>
            </div>

            {/* Role & Town */}
            {person.role && <p className="personRole">{person.role}</p>}
            {person.town && <p className="personTown">Town: {person.town}</p>}
          </header>

          {/* Biography */}
          {person.bio_full && (
            <section className="personBioSection">
              <div className="personBioContent">{renderBioContent(person.bio_full)}</div>
            </section>
          )}

          {/* If no full bio, show short bio */}
          {!person.bio_full && person.bio_short && (
            <section className="personBioSection">
              <p className="personBioShort">{person.bio_short}</p>
            </section>
          )}

          {/* Verified Facts from Reference Library */}
          {verifiedFacts.length > 0 && (
            <section className="personSourcesSection">
              <h2 className="personSectionTitle">
                <span>Verified Historical Facts</span>
              </h2>
              <div className="personVerifiedFacts">
                {Object.entries(factsByCategory).map(([category, facts]) => (
                  <div key={category} className="factCategory">
                    <h3 className="factCategoryTitle">{formatCategoryName(category)}</h3>
                    <ul className="factsList">
                      {facts.map((fact) => (
                        <li key={fact.id} className="factItem">
                          <div className="factClaim">{fact.claim}</div>
                          <div className="factMeta">
                            <cite className="factSource">{fact.source}</cite>
                            <span
                              className={`factConfidenceBadge ${getConfidenceBadgeColor(fact.confidence)}`}
                            >
                              {fact.confidence}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Documents Section */}
          {relatedDocuments.length > 0 && (
            <section className="personDocumentsSection">
              <h2 className="personSectionTitle">
                <span>Primary Source Documents</span>
              </h2>
              <ul className="personDocumentsList">
                {relatedDocuments.map((doc) => (
                  <li key={doc.id} className="personDocumentItem">
                    <Link href={`/evidence/documents/${doc.id}`} className="personDocumentLink">
                      <div className="personDocumentHeader">
                        <span className="personDocumentTitle">{doc.title}</span>
                        <span className="personDocumentDate">{doc.date}</span>
                      </div>
                      {doc.source && <cite className="personDocumentSource">{doc.source}</cite>}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Signature Link */}
          {person.signature_url && (
            <section className="personSignatureSection">
              <h2 className="personSectionTitle">
                <span>Treaty Signature</span>
              </h2>
              <a
                href={person.signature_url}
                target="_blank"
                rel="noopener noreferrer"
                className="personSignatureLink"
              >
                <span className="personSignatureIcon">&#x270D;</span>
                <span className="personSignatureLinkText">
                  <strong>View signature on DigiTreaties</strong>
                  <span>See the original treaty manuscript with this signatory&apos;s mark</span>
                </span>
                <span className="personSignatureArrow" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
