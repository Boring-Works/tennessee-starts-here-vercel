import type { Metadata } from 'next'
import Link from 'next/link'
import { PAGE_METADATA, PRIMARY_QUOTES } from '@/lib/copy'
import { getAllDocuments, getAllCollections } from '@/lib/evidence/loader'
import { ContextPanel } from './ContextPanel'
import { CardCatalog } from './CardCatalog'
import { TreatySigners } from './TreatySigners'
import { LazySection, SectionSkeleton } from './LazySection'
import { MobileGuide } from '@/components/evidence/MobileGuide'
import { EntryRoom, Claim, BackToTop } from '@/components/evidence'
import { EvidenceNav } from '@/components/evidence/EvidenceNav'
import { Compass } from '@/components/ui/Compass'
import { JsonLd } from '@/components/JsonLd'
import { generateBreadcrumbSchema } from '@/lib/seo'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: PAGE_METADATA.evidence.title,
  description: PAGE_METADATA.evidence.description,
  openGraph: {
    title: PAGE_METADATA.evidence.ogTitle,
    description: PAGE_METADATA.evidence.ogDescription,
    url: 'https://tennesseestartshere.com/evidence',
  },
}

// Section divider component for period-authentic transitions
const SectionDivider = ({ variant = 'default' }: { variant?: 'default' | 'light' | 'dark' }) => (
  <div className={`section-divider section-divider--${variant}`} aria-hidden="true">
    <span className="section-divider-line" />
    <span className="section-divider-flourish">❧</span>
    <span className="section-divider-ornament">✦</span>
    <span className="section-divider-flourish section-divider-flourish--flip">❧</span>
    <span className="section-divider-line" />
  </div>
)

// External source links
const SOURCE_LINKS = {
  foundersOnline: 'https://founders.archives.gov/',
  tennesseeEncyclopedia: 'https://tennesseeencyclopedia.net/',
  digiTreaties: 'https://digitreaties.org/',
  digiTreatiesHolston: 'https://digitreaties.org/treaties/treaty/88697242/',
  nationalArchives: 'https://www.archives.gov/',
  blountMansion: 'https://blountmansion.org/',
} as const

// Sections for mobile guide navigation
const MOBILE_GUIDE_SECTIONS = [
  { id: 'blount-letter', label: 'Letters' },
  { id: 'washington-question', label: 'The Question' },
  { id: 'appointment', label: 'Appointment' },
  { id: 'federal-authority', label: 'Federal Authority' },
  { id: 'treaty-signers', label: 'Treaty Signers' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'sources', label: 'Sources' },
]

// Compute date range from documents
function computeDateRange(documents: { date: string }[]): { minYear: number; maxYear: number } {
  if (documents.length === 0) {
    return { minYear: 1790, maxYear: 1796 }
  }

  let minYear = 9999
  let maxYear = 0

  for (const doc of documents) {
    const year = parseInt(doc.date.split('-')[0], 10)
    if (!Number.isNaN(year)) {
      if (year < minYear) minYear = year
      if (year > maxYear) maxYear = year
    }
  }

  return {
    minYear: minYear === 9999 ? 1790 : minYear,
    maxYear: maxYear === 0 ? 1796 : maxYear,
  }
}

// Curator's Note component
function _CuratorNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className={styles.curatorNote}>
      <span className={styles.curatorLabel}>Curator&apos;s Note</span>
      <p>{children}</p>
    </aside>
  )
}

// Quote card component
function QuoteCard({
  quote,
  attribution,
  source,
  context,
  sourceUrl,
  featured,
}: {
  quote: string
  attribution: string
  source: string
  context?: string
  sourceUrl?: string
  featured?: boolean
}) {
  return (
    <article className={`${styles.quoteCard} ${featured ? styles.quoteCardFeatured : ''}`}>
      <blockquote className={styles.quoteText}>
        <span className={styles.quoteOpen}>&ldquo;</span>
        {quote}
        <span className={styles.quoteClose}>&rdquo;</span>
      </blockquote>

      <footer className={styles.quoteFooter}>
        <cite className={styles.quoteAttribution}>— {attribution}</cite>
        <p className={styles.quoteSource}>{source}</p>
        {context && <p className={styles.quoteContext}>{context}</p>}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceLink}
          >
            View Original Source
          </a>
        )}
      </footer>
    </article>
  )
}

// Timeline event component
function TimelineEvent({
  date,
  event,
  sourceUrl,
  featured,
  manuscriptUrl,
  manuscriptLabel,
}: {
  date: string
  event: string
  sourceUrl?: string
  featured?: boolean
  manuscriptUrl?: string
  manuscriptLabel?: string
}) {
  return (
    <div className={`${styles.timelineEvent} ${featured ? styles.timelineEventFeatured : ''}`}>
      <div className={styles.timelineDate}>{date}</div>
      <div
        className={`${styles.timelineDot} ${featured ? styles.timelineDotFeatured : ''}`}
        aria-hidden="true"
      />
      <div
        className={`${styles.timelineContent} ${featured ? styles.timelineContentFeatured : ''}`}
      >
        <p className={styles.timelineText}>{event}</p>
        {manuscriptUrl && (
          <a
            href={manuscriptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.timelineManuscriptLink}
          >
            {manuscriptLabel || 'View original manuscript'}
          </a>
        )}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.timelineLink}
          >
            Source
          </a>
        )}
      </div>
    </div>
  )
}

const evidenceBreadcrumbs = [
  { name: 'Home', url: 'https://tennesseestartshere.com' },
  { name: 'Evidence Room', url: 'https://tennesseestartshere.com/evidence' },
]

export default async function EvidencePage() {
  // Load data at build time
  const [documents, collections] = await Promise.all([getAllDocuments(), getAllCollections()])

  // Compute stats
  const totalDocuments = documents.length
  const totalCollections = collections.length
  const { minYear, maxYear } = computeDateRange(documents)

  return (
    <div className={styles.evidencePage}>
      {/* Skip to content link for keyboard navigation */}
      <a
        href="#blount-letter"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--gold-primary)] focus:text-[#2a1f1a] focus:rounded-sm focus:font-serif focus:text-sm"
      >
        Skip to Evidence Room collections
      </a>

      {/* Breadcrumb Structured Data for Search Navigation */}
      <JsonLd data={generateBreadcrumbSchema(evidenceBreadcrumbs)} />

      {/* Card Catalog Navigation - Fixed on desktop */}
      <CardCatalog />

      {/* Hero Section - Integrated landing with all navigation */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroBadge}>The Rocky Mount Archives</p>
          <h1 className={styles.heroTitle}>The Evidence Room</h1>
          <p className={styles.heroSubtitle}>
            {totalDocuments} documents · {minYear}-{maxYear}
          </p>
        </div>

        {/* Primary CTA - Full Document Library */}
        <nav className={styles.heroNav} aria-label="Evidence Room sections">
          {/* Document Library - Primary CTA - FIRST */}
          <Link href="/evidence/documents" className={styles.heroLibraryLinkPrimary}>
            <span className={styles.heroLibraryIcon}>📜</span>
            <span className={styles.heroLibraryText}>
              <strong>Browse the Full Document Library</strong>
              <span>Primary source transcriptions with archival citations</span>
            </span>
            <span className={styles.heroLibraryArrow}>→</span>
          </Link>

          {/* Secondary Navigation */}
          <div className={styles.heroNavGrid}>
            <Link href="/evidence/collections" className={styles.heroNavCard}>
              <span className={styles.heroNavIcon}>📁</span>
              <span className={styles.heroNavName}>Collections</span>
            </Link>
            <Link href="/evidence/people" className={styles.heroNavCard}>
              <span className={styles.heroNavIcon}>👤</span>
              <span className={styles.heroNavName}>People</span>
            </Link>
            <Link href="/evidence/timeline" className={styles.heroNavCard}>
              <span className={styles.heroNavIcon}>⏱</span>
              <span className={styles.heroNavName}>Timeline</span>
            </Link>
            <a href="#sources" className={styles.heroNavCard}>
              <span className={styles.heroNavIcon}>❧</span>
              <span className={styles.heroNavName}>Sources</span>
            </a>
          </div>
        </nav>

        {/* Scroll indicator */}
        <div className={styles.heroScroll}>
          <span className={styles.heroScrollArrow}>↓</span>
          <span className={styles.heroScrollText}>Scroll to explore each collection</span>
        </div>
      </section>

      {/* Navigation Bar */}
      <EvidenceNav />

      {/* Entry Room - Collection Overview */}
      <EntryRoom totalDocuments={totalDocuments} totalCollections={totalCollections} />

      <SectionDivider variant="default" />

      {/* Featured Quote - Blount Correspondence */}
      <section
        id="blount-letter"
        className={styles.featuredSection}
        aria-labelledby="blount-letter-heading"
      >
        <div className={styles.container}>
          <span className={styles.collectionLabel}>MSS.1790.001 — Blount Correspondence</span>
          <h2 id="blount-letter-heading" className={styles.sectionTitle}>
            The Hero Quote
          </h2>
          <p className={styles.sectionSubtitle}>
            Governor Blount&apos;s first letter from Rocky Mount
          </p>
          <QuoteCard
            quote={PRIMARY_QUOTES.glassWindowsFull.text}
            attribution={PRIMARY_QUOTES.glassWindowsFull.attribution}
            source={PRIMARY_QUOTES.glassWindowsFull.source}
            context="Glass windows were rare even in settler communities east of the mountains—most used oiled paper or wooden shutters. At Rocky Mount, they signaled federal authority and investment in the first capital of the Southwest Territory."
            sourceUrl="https://tennesseeencyclopedia.net/entries/rocky-mount/"
            featured
          />
          <Link
            href="/evidence/documents/blount-arrival-1790#glass-windows"
            className={styles.receiptLink}
          >
            <span className={styles.receiptIcon}>✦</span>
            <span className={styles.receiptText}>
              Read the full letter with this passage highlighted
            </span>
            <span className={styles.receiptArrow}>→</span>
          </Link>
          <ContextPanel>
            <Claim doc="blount-arrival-1790" passage="glass-windows">
              Blount wrote this letter on October 20, 1790
            </Claim>
            , nine days after arriving. The &ldquo;Glass Windows&rdquo; detail wasn&apos;t idle
            observation—most settler structures in the region used oiled paper or wooden shutters.
            Glass windows at Rocky Mount signaled federal commitment to permanence—this was not
            temporary settlement, but a capital built to last.
          </ContextPanel>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* The Question - Washington Papers */}
      <section
        id="washington-question"
        className={styles.section}
        aria-labelledby="washington-question-heading"
      >
        <div className={styles.container}>
          <span className={styles.collectionLabel}>MSS.1790.002 — Washington Papers</span>
          <h2 id="washington-question-heading" className={styles.sectionTitle}>
            The Question
          </h2>
          <p className={styles.sectionSubtitle}>Washington asked. Rocky Mount was the answer.</p>
          <QuoteCard
            quote={PRIMARY_QUOTES.washingtonsQuestion.text}
            attribution={PRIMARY_QUOTES.washingtonsQuestion.attribution}
            source={PRIMARY_QUOTES.washingtonsQuestion.source}
            context={PRIMARY_QUOTES.washingtonsQuestion.context}
            sourceUrl="https://founders.archives.gov/documents/Washington/05-06-02-0135"
          />
          <ContextPanel>
            Washington posed this question to{' '}
            <Claim doc="washington-to-knox-1790-08" passage="residence-question">
              Secretary of War Henry Knox on August 13, 1790
            </Claim>
            . The answer would determine where federal authority took root west of the Appalachians.
            Knox pointed to the Holston settlements—and William Cobb&apos;s home became that seat of
            power.
          </ContextPanel>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* The Appointment - Williamson Letters */}
      <section id="appointment" className={styles.section} aria-labelledby="appointment-heading">
        <div className={styles.container}>
          <span className={styles.collectionLabel}>MSS.1790.003 — Williamson Letters</span>
          <h2 id="appointment-heading" className={styles.sectionTitle}>
            The Appointment
          </h2>
          <p className={styles.sectionSubtitle}>
            Why Washington chose Blount to govern the Territory and negotiate with the Cherokee
            Nation
          </p>
          <QuoteCard
            quote={PRIMARY_QUOTES.williamsonRecommendation.text}
            attribution={PRIMARY_QUOTES.williamsonRecommendation.attribution}
            source={PRIMARY_QUOTES.williamsonRecommendation.source}
            context="Hugh Williamson's endorsement persuaded Washington that Blount was uniquely qualified to unite factional divisions."
            sourceUrl="https://founders.archives.gov/documents/Washington/05-05-02-0277"
          />
          <ContextPanel>
            <Claim doc="williamson-to-washington-1790-05" passage="faction-unifier">
              Hugh Williamson wrote this recommendation on May 28, 1790
            </Claim>
            . The western territory was torn by factional disputes between settlers and speculators.
            Williamson argued only Blount commanded enough respect from both sides. Washington
            agreed—Blount was nominated within two weeks.
          </ContextPanel>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* Federal Authority - Executive Proclamations */}
      <section
        id="federal-authority"
        className={styles.section}
        aria-labelledby="federal-authority-heading"
      >
        <div className={styles.container}>
          <span className={styles.collectionLabel}>MSS.1791.001 — Executive Proclamations</span>
          <h2 id="federal-authority-heading" className={styles.sectionTitle}>
            Federal Authority
          </h2>
          <p className={styles.sectionSubtitle}>The Treaty of Holston became binding law</p>
          <QuoteCard
            quote={PRIMARY_QUOTES.treatyProclamation.text}
            attribution={PRIMARY_QUOTES.treatyProclamation.attribution}
            source={PRIMARY_QUOTES.treatyProclamation.source}
            context="Washington's proclamation made the Treaty of Holston—negotiated by Blount during the Rocky Mount capital period—binding federal law."
            sourceUrl="https://founders.archives.gov/"
          />
          <ContextPanel>
            <Claim doc="washington-proclamation-1791" passage="binding-law">
              This proclamation, signed November 11, 1791
            </Claim>
            , made the Treaty of Holston binding federal law. Countersigned by Secretary of State
            Thomas Jefferson, it required all U.S. officers to enforce the terms Blount had
            negotiated with{' '}
            <Claim doc="treaty-holston-1791" passage="signatories">
              42 Cherokee chiefs
            </Claim>{' '}
            that July.
          </ContextPanel>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* Treaty Signers Section - Expandable */}
      <TreatySigners />

      <SectionDivider variant="default" />

      {/* Timeline Section - Lazy Loaded */}
      <LazySection minHeight="600px" fallback={<SectionSkeleton height="600px" />}>
        <section
          id="timeline"
          className={styles.timelineSection}
          aria-labelledby="timeline-heading"
        >
          <div className={styles.container}>
            <span className={styles.collectionLabel}>CHRON.1790-1796 — Territory Chronology</span>
            <h2 id="timeline-heading" className={styles.sectionTitle}>
              Verified Timeline
            </h2>
            <p className={styles.sectionSubtitle}>Key dates confirmed by primary sources</p>

            <div className={styles.timeline}>
              <TimelineEvent
                date="May 28, 1790"
                event="Hugh Williamson recommends Blount to Washington"
                sourceUrl="https://founders.archives.gov/documents/Washington/05-05-02-0268"
              />
              <TimelineEvent
                date="Jun 7, 1790"
                event="Washington nominates Blount as Governor"
                sourceUrl="https://founders.archives.gov/documents/Washington/05-05-02-0258"
              />
              <TimelineEvent
                date="Jun 8, 1790"
                event="Senate confirms Blount's appointment"
                sourceUrl="https://founders.archives.gov/documents/Washington/05-05-02-0259"
              />
              <TimelineEvent
                date="Aug 13, 1790"
                event="Washington asks Knox: 'Where ought the Governor to reside?'"
                sourceUrl="https://founders.archives.gov/documents/Washington/05-06-02-0076"
              />
              <TimelineEvent
                date="Oct 11, 1790"
                event="Blount arrives at Rocky Mount"
                sourceUrl="https://tennesseeencyclopedia.net/entries/rocky-mount/"
              />
              <TimelineEvent
                date="Oct 20, 1790"
                event="Blount writes 'Glass Windows' letter describing his accommodations"
                sourceUrl="https://tennesseeencyclopedia.net/entries/rocky-mount/"
              />
              <TimelineEvent
                date="Jul 2, 1791"
                event="Treaty of Holston signed with Cherokee Nation"
                sourceUrl="https://avalon.law.yale.edu/18th_century/chr1791.asp"
                featured
                manuscriptUrl="https://digitreaties.org/treaties/treaty/88697242/"
                manuscriptLabel="View the original 23-page manuscript"
              />
              <TimelineEvent
                date="Nov 5, 1791"
                event="Knoxville Gazette becomes first Tennessee newspaper"
                sourceUrl="https://tennesseeencyclopedia.net/entries/knoxville-gazette/"
              />
              <TimelineEvent
                date="Nov 11, 1791"
                event="Washington proclaims Treaty of Holston as law"
                sourceUrl="https://founders.archives.gov/documents/Washington/05-09-02-0100"
              />
              <TimelineEvent
                date="Late 1791"
                event="Blount family arrives in territory"
                sourceUrl="https://www.blountmansion.org/"
              />
              <TimelineEvent
                date="Early 1792"
                event="Capital moves to Knoxville"
                sourceUrl="https://tennesseeencyclopedia.net/entries/southwest-territory/"
              />
              <TimelineEvent
                date="Jun 1, 1796"
                event="Tennessee admitted to the Union as 16th state"
                sourceUrl="https://tennesseeencyclopedia.net/entries/statehood/"
              />
            </div>
          </div>
        </section>
      </LazySection>

      <SectionDivider variant="light" />

      {/* Source Repositories - Lazy Loaded */}
      <LazySection minHeight="500px" fallback={<SectionSkeleton height="500px" />}>
        <section id="sources" className={styles.sourcesSection} aria-labelledby="sources-heading">
          <div className={styles.container}>
            <span className={styles.collectionLabel}>REF — Repository Index</span>
            <h2 id="sources-heading" className={styles.sectionTitle}>
              Our Sources
            </h2>
            <p className={styles.sectionSubtitle}>Where we verify our history</p>

            {/* Document Library link - featured */}
            <Link href="/evidence/documents" className={styles.libraryPromo}>
              <span className={styles.libraryPromoIcon}>✦</span>
              <div className={styles.libraryPromoText}>
                <strong>Document Library</strong>
                <span>Read complete transcriptions with full citations</span>
              </div>
              <span className={styles.libraryPromoArrow}>→</span>
            </Link>

            <div className={styles.sourcesGrid}>
              <a
                href={SOURCE_LINKS.foundersOnline}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceCard}
              >
                <h3 className={styles.sourceCardTitle}>Founders Online</h3>
                <p className={styles.sourceCardDescription}>
                  National Archives collection of correspondence from Washington, Jefferson, and the
                  Founding Fathers.
                </p>
              </a>

              <a
                href={SOURCE_LINKS.tennesseeEncyclopedia}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceCard}
              >
                <h3 className={styles.sourceCardTitle}>Tennessee Encyclopedia</h3>
                <p className={styles.sourceCardDescription}>
                  Scholarly reference for Tennessee history, including Rocky Mount and Southwest
                  Territory articles.
                </p>
              </a>

              <a
                href="https://avalon.law.yale.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceCard}
              >
                <h3 className={styles.sourceCardTitle}>Avalon Project</h3>
                <p className={styles.sourceCardDescription}>
                  Yale Law School&apos;s digital archive of treaties, legal documents, and
                  diplomatic papers from the founding era.
                </p>
              </a>

              <a
                href="https://wardepartmentpapers.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceCard}
              >
                <h3 className={styles.sourceCardTitle}>Papers of the War Department</h3>
                <p className={styles.sourceCardDescription}>
                  Reconstructed federal records from 1784-1800, recovered after the 1800 Washington
                  fire destroyed the originals.
                </p>
              </a>

              <a
                href={SOURCE_LINKS.digiTreaties}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceCard}
              >
                <h3 className={styles.sourceCardTitle}>DigiTreaties</h3>
                <p className={styles.sourceCardDescription}>
                  Digitized treaty manuscripts including the full 23-page Treaty of Holston.
                </p>
              </a>

              <a
                href={SOURCE_LINKS.blountMansion}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceCard}
              >
                <h3 className={styles.sourceCardTitle}>Blount Mansion</h3>
                <p className={styles.sourceCardDescription}>
                  Governor Blount&apos;s later residence in Knoxville, with family history and
                  primary documents.
                </p>
              </a>
            </div>
          </div>
        </section>
      </LazySection>

      <SectionDivider variant="default" />

      {/* Bias Disclosure Section - Lazy Loaded */}
      <LazySection minHeight="400px" fallback={<SectionSkeleton height="400px" />}>
        <section className={styles.biasDisclosure}>
          <div className={styles.container}>
            <span className={styles.collectionLabel}>EDITORIAL — Historical Interpretation</span>
            <h2 className={styles.sectionTitle}>About This Archive</h2>

            <div className={styles.biasDisclosureContent}>
              <p className={styles.biasDisclosureLede}>
                Every historical archive reflects choices made by those who created it. We
                acknowledge the limitations and perspectives embedded in this collection.
              </p>

              <div className={styles.biasDisclosureGrid}>
                <div className={styles.biasDisclosureCard}>
                  <h3 className={styles.biasDisclosureCardTitle}>Primary Sources</h3>
                  <p className={styles.biasDisclosureCardText}>
                    The documents here were created by government officials—predominantly white men
                    of property. They reflect the viewpoints and biases of that group.
                  </p>
                </div>

                <div className={styles.biasDisclosureCard}>
                  <h3 className={styles.biasDisclosureCardTitle}>Missing Voices</h3>
                  <p className={styles.biasDisclosureCardText}>
                    Many perspectives are absent: enslaved people who worked this ground, Cherokee
                    communities whose lands were negotiated away, women whose labor sustained
                    households.
                  </p>
                </div>

                <div className={styles.biasDisclosureCard}>
                  <h3 className={styles.biasDisclosureCardTitle}>Our Commitment</h3>
                  <p className={styles.biasDisclosureCardText}>
                    We strive to present these documents accurately while acknowledging whose
                    stories they tell—and whose they exclude. History requires both preservation and
                    honesty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      <SectionDivider variant="default" />

      {/* CTA Section - Leaving the library */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>The Documents Live Here</h2>
          <p className={styles.ctaText}>
            These archives tell the story. The ground holds the proof. Visit Rocky Mount to walk
            where this history was made.
          </p>
          <Link href="/visit" className={styles.ctaButton}>
            Visit the Site
          </Link>
        </div>
      </section>

      {/* Navigation Aids */}
      <MobileGuide sections={MOBILE_GUIDE_SECTIONS} />
      <BackToTop />
      <Compass />
    </div>
  )
}
