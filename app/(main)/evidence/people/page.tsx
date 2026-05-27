import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPeople } from '@/lib/evidence/loader'
import { CherokeeSignatories } from '@/components/evidence'
import { EvidenceNav } from '@/components/evidence/EvidenceNav'
import './people.css'

export const metadata: Metadata = {
  title: 'People | Evidence Room | Rocky Mount',
  description:
    'Cherokee leaders and historical figures connected to the Treaty of Holston and the founding of Tennessee.',
  openGraph: {
    title: 'People | Evidence Room',
    description: "Cherokee leaders and historical figures from Tennessee's founding era.",
    url: 'https://tennesseestartshere.com/evidence/people',
  },
}

export default async function PeoplePage() {
  const allPeople = await getAllPeople()

  // Group people by category
  const cherokeeSignatories = allPeople.filter((p) => p.is_cherokee && p.is_signatory)

  // American founders (prioritize key figures)
  const americanFounders = allPeople
    .filter((p) => !p.is_signatory && !p.is_cherokee)
    .sort((a, b) => {
      // Prioritize: Blount, Jackson, Cobb
      const priority = ['william-blount', 'andrew-jackson', 'william-cobb']
      const aIndex = priority.indexOf(a.id)
      const bIndex = priority.indexOf(b.id)
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      return a.name.localeCompare(b.name)
    })

  return (
    <div className="peoplePage">
      <EvidenceNav isPageTop />
      <div className="peopleContainer">
        <main className="peopleContent">
          {/* Header */}
          <header className="peopleHeader">
            <h1 className="peopleTitle">Historical Figures</h1>
            <p className="peopleSubtitle">The people who shaped Tennessee&apos;s founding era</p>
          </header>

          {/* American Founders Section */}
          {americanFounders.length > 0 && (
            <section className="peopleSection">
              <h2 className="peopleSectionTitle">
                <span>American Founders</span>
                <span className="peopleSectionCount">{americanFounders.length}</span>
              </h2>

              <div className="peopleGrid">
                {americanFounders.map((person) => (
                  <Link
                    key={person.id}
                    href={`/evidence/people/${person.id}`}
                    className="personCard"
                  >
                    <div className="personCardNames">
                      <span className="personCardPrimaryName">{person.name}</span>
                    </div>
                    {person.role && <span className="personCardRole">{person.role}</span>}
                    <span className="personCardArrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Cherokee Signatories Memorial */}
          <CherokeeSignatories signatories={cherokeeSignatories} />

          {/* Note: Other non-Cherokee figures now shown in American Founders section */}
          {americanFounders.length === 0 && cherokeeSignatories.length === 0 ? (
            <section className="peopleSection">
              <h2 className="peopleSectionTitle">
                <span>Historical Figures</span>
              </h2>

              <div className="text-center py-8" style={{ color: 'var(--cream-faded, #a89f8c)' }}>
                <p>Historical figures from Tennessee&apos;s founding era.</p>
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  )
}
