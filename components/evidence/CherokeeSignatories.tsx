/**
 * CherokeeSignatories - A Memorial Treatment for the 42 Cherokee Treaty Signers
 *
 * This component transforms a simple list into an emotionally resonant memorial
 * that treats these historical figures with dignity. Each name represents a person
 * who shaped the destiny of the Cherokee Nation at a pivotal moment.
 */

import Link from 'next/link'
import type { Person } from '@/lib/evidence/types'
import './CherokeeSignatories.css'

interface CherokeeSignatoriesProps {
  /** All Cherokee people who signed the Treaty of Holston */
  signatories: Person[]
}

/** Key figures who receive featured treatment */
const FEATURED_IDS = ['hanging-maw', 'bloody-fellow', 'john-watts', 'doublehead', 'black-fox']

/** Contextual lines for featured figures - the stories that matter */
const FEATURED_CONTEXT: Record<string, string> = {
  'hanging-maw':
    'Nearly killed by settlers after making peace. Continued advocating for peace anyway.',
  'bloody-fellow':
    'Renamed "Clear Sky" by Washington. Transformed from war chief to principal chief.',
  'john-watts': 'Succeeded Dragging Canoe. Led the largest Native force assembled in the region.',
  doublehead: 'Feared warrior. Later assassinated by his own people over land cessions.',
  'black-fox': 'Brother-in-law of Dragging Canoe. Chose diplomacy over resistance.',
}

/** Extract a brief context line from bio content */
function extractContextLine(person: Person): string | undefined {
  // If we have a specific featured context, use it
  if (FEATURED_CONTEXT[person.id]) {
    return FEATURED_CONTEXT[person.id]
  }

  // For basic bios with interesting content, extract from bio_full
  if (person.bio_full && person.bio_full.length > 100) {
    // Try to find interesting biographical details
    const content = person.bio_full.replace(/^#+\s*\w+\s*/gm, '').trim()
    // Get first sentence if it's interesting
    const firstSentence = content.split(/[.!?]/)[0]
    if (firstSentence && firstSentence.length > 20 && firstSentence.length < 120) {
      return `${firstSentence.trim()}.`
    }
  }

  return undefined
}

export function CherokeeSignatories({ signatories }: CherokeeSignatoriesProps) {
  // Separate featured and other signatories
  const featured = signatories.filter((p) => FEATURED_IDS.includes(p.id))
  const others = signatories.filter((p) => !FEATURED_IDS.includes(p.id))

  // Sort featured by their order in FEATURED_IDS
  const sortedFeatured = featured.sort(
    (a, b) => FEATURED_IDS.indexOf(a.id) - FEATURED_IDS.indexOf(b.id)
  )

  // Sort others alphabetically by English name
  const sortedOthers = others.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <section className="cherokeeMemorial" aria-labelledby="memorial-heading">
      {/* Memorial Introduction */}
      <header className="memorialHeader">
        <h2 id="memorial-heading" className="memorialTitle">
          The Forty-Two
        </h2>
        <p className="memorialIntro">
          Forty-two Cherokee leaders put their marks to this treaty. Some came seeking peace. Some
          came under protest. Some would be dead within five years. Their names are preserved.
        </p>
      </header>

      {/* Featured Signatories - Larger, more detailed cards */}
      <div className="memorialFeatured" role="list" aria-label="Featured Cherokee leaders">
        {sortedFeatured.map((person) => (
          <Link
            key={person.id}
            href={`/evidence/people/${person.id}`}
            className="featuredCard"
            role="listitem"
          >
            <div className="featuredCardInner">
              {/* Cherokee name prominently displayed */}
              {person.name_cherokee && (
                <span className="featuredCherokeeName">{person.name_cherokee}</span>
              )}

              {/* English name */}
              <span className="featuredEnglishName">{person.name}</span>

              {/* Role if not just "Signatory" */}
              {person.role && person.role !== 'Signatory' && (
                <span className="featuredRole">{person.role}</span>
              )}

              {/* Town affiliation */}
              {person.town && <span className="featuredTown">of {person.town}</span>}

              {/* Contextual line - the human story */}
              <p className="featuredContext">{extractContextLine(person)}</p>

              {/* View profile indicator */}
              <span className="featuredArrow" aria-hidden="true">
                Read their story &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="memorialDivider" aria-hidden="true">
        <span className="memorialDividerLine" />
        <span className="memorialDividerText">and thirty-seven more</span>
        <span className="memorialDividerLine" />
      </div>

      {/* Other Signatories - Compact but respectful grid */}
      <div className="memorialGrid" role="list" aria-label="All Cherokee signatories">
        {sortedOthers.map((person) => (
          <Link
            key={person.id}
            href={`/evidence/people/${person.id}`}
            className="signatoryCard"
            role="listitem"
          >
            {/* Cherokee name first, prominently */}
            {person.name_cherokee && (
              <span className="signatoryCherokeeName">{person.name_cherokee}</span>
            )}

            {/* English translation */}
            <span
              className={person.name_cherokee ? 'signatoryEnglishName' : 'signatoryPrimaryName'}
            >
              {person.name}
            </span>

            {/* Town if available */}
            {person.town && <span className="signatoryTown">{person.town}</span>}
          </Link>
        ))}
      </div>

      {/* Memorial footer - link to treaty */}
      <footer className="memorialFooter">
        <a
          href="https://digitreaties.org/treaties/treaty/88697242/"
          target="_blank"
          rel="noopener noreferrer"
          className="memorialTreatyLink"
        >
          <span className="memorialTreatyIcon" aria-hidden="true">
            &#x1F4DC;
          </span>
          <span className="memorialTreatyText">
            <strong>See Their Marks</strong>
            <span>View the original treaty signatures at DigiTreaties</span>
          </span>
          <span className="memorialTreatyArrow" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </footer>
    </section>
  )
}
