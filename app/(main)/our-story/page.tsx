import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, FileText, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { PAGE_METADATA } from '@/lib/copy/metadata'

export const metadata: Metadata = {
  title: PAGE_METADATA.ourStory.title,
  description: PAGE_METADATA.ourStory.description,
  openGraph: {
    title: PAGE_METADATA.ourStory.ogTitle,
    description: PAGE_METADATA.ourStory.ogDescription,
    url: 'https://tennesseestartshere.com/our-story',
  },
}

// Timeline data from reference library (ref: gov-001, con-003, con-004, tim-001, tim-002)
const TIMELINE_EVENTS = [
  {
    year: '1770',
    title: 'Settlement Begins',
    description:
      'William Cobb settles this ground in the Holston Valley. Three generations of his family will call it home.',
    refId: 'con-003',
  },
  {
    year: '1775',
    title: 'Farm Established',
    description:
      "Rocky Mount farm is established, making it Tennessee's oldest documented farm (Tennessee Century Farms).",
    refId: 'con-004',
  },
  {
    year: '1780',
    title: 'Revolution Support',
    description:
      'William Cobb and his sons supply the Overmountain Men with gunpowder, horses, blankets, and food for the Kings Mountain campaign.',
    refId: 'ppl-008',
  },
  {
    year: '1790',
    title: 'Capital Arrives',
    description:
      'Governor William Blount arrives at Rocky Mount on October 11, 1790, establishing the first capital of the Southwest Territory.',
    refId: 'gov-001',
  },
  {
    year: '1791',
    title: 'Treaty Negotiations',
    description:
      "Cherokee chiefs visit Rocky Mount for preliminary diplomatic talks. The Treaty of Holston is later signed at White's Fort.",
    refId: 'trt-003',
  },
  {
    year: '1792',
    title: 'Capital Moves',
    description: 'The territorial government moves to Knoxville. Rocky Mount returns to farm life.',
    refId: 'tim-003',
  },
  {
    year: '1796',
    title: 'Statehood',
    description:
      'Tennessee achieves statehood on June 1, 1796. The patterns of governance established at Rocky Mount become the foundation for the new state.',
    refId: 'tim-002',
  },
  {
    year: '1826-28',
    title: 'Current House Built',
    description:
      "Michael Massengill (William Cobb's grandson) constructs the current main house that stands today (verified by dendrochronology).",
    refId: 'con-001',
  },
]

// Key figures from reference library
const KEY_FIGURES = [
  {
    name: 'William Cobb',
    role: 'Property Owner',
    description:
      "Born circa 1732 in Virginia, William Cobb settled Rocky Mount around 1770. During Blount's governorship, he provided accommodations for the territorial capital. His family would remain on this ground for generations.",
    refIds: ['ppl-001', 'ppl-006', 'con-003'],
  },
  {
    name: 'Barsheba Whitehead Cobb',
    role: 'Household Manager',
    description:
      "William Cobb's wife managed the household during the territorial period. She famously fed 42 Cherokee chiefs and their attendants during Treaty of Holston negotiations in July 1791.",
    refIds: ['ppl-002', 'ppl-012'],
  },
  {
    name: 'William Blount',
    role: 'Territorial Governor',
    description:
      'One of 39 signers of the U.S. Constitution, Blount was appointed by President George Washington as Governor of the Southwest Territory. He arrived at Rocky Mount on October 11, 1790, and governed from this ground until circa 1792.',
    refIds: ['gov-001', 'gov-004', 'gov-005'],
  },
  {
    name: 'Michael Massengill',
    role: 'Builder',
    description:
      'Grandson of William Cobb, Michael Massengill built the current structures between 1826-1830 (verified by dendrochronology study). The house that stands today is his work.',
    refIds: ['ppl-005', 'con-001'],
  },
]

export default function OurStoryPage() {
  return (
    <main className="min-h-screen">
      {/* ════════════════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-primary overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cobb-house.jpg"
            alt="The historic Cobb House at Rocky Mount State Historic Site"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90" />
        </div>

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none bg-noise"
          aria-hidden="true"
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent/80 mb-4 font-semibold">
            Est. 1770 · Site of Tennessee&apos;s Government
          </p>
          <h1 className="type-display text-white mb-6">
            Where Tennessee&apos;s Government Began
          </h1>
          <p className="type-h3 text-white/90 max-w-3xl mx-auto">
            From frontier settlement to territorial capital—the story of one family&apos;s homestead
            that became the birthplace of Tennessee government.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          THE GETTYSBURG PRINCIPLE
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-6 font-semibold">
              Understanding Rocky Mount
            </p>
            <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight mb-8 italic">
              &ldquo;The ground is the artifact. The house is the proof.&rdquo;
            </blockquote>
            <p className="text-lg text-text-light leading-relaxed max-w-2xl mx-auto">
              Like Gettysburg, Rocky Mount&apos;s significance lies in what happened on this ground.
              The current house dates to the 1820s, built by the grandson of William Cobb. But the
              ground beneath it—where Governor Blount governed, where Cherokee chiefs negotiated,
              where Tennessee&apos;s government began—that ground dates to 1770.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          SETTLEMENT TO CAPITAL: THE STORY
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-cream">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-4 font-semibold">
                The Full Story
              </p>
              <h2 className="type-h2 text-primary mb-6">
                From Settlement to Capital
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Column: The Cobb Family */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl text-primary font-bold mb-4">
                    The Cobb Family (1770-1796)
                  </h3>
                  <div className="space-y-4 text-base leading-relaxed text-text-light">
                    <p>
                      Around 1770, William Cobb—born circa 1732 in Isle of Wight County,
                      Virginia—settled this ground in the Holston Valley. His wife, Barsheba
                      Whitehead Cobb, managed the household. Their sons would grow up knowing this
                      land intimately.
                    </p>
                    <p>
                      In 1775, the farm was formally established. The property would later be
                      certified by the Tennessee Century Farms Program as part of Tennessee&apos;s
                      agricultural heritage.
                    </p>
                    <p>
                      When the Revolution came, the Cobbs answered the call. In October 1780,
                      William Cobb and his sons—William Jr., Pharaoh, Jerry, and Arthur—supplied the
                      Overmountain Men with gunpowder, horses, blankets, and food for their march to
                      Kings Mountain. The victory there would help turn the tide of the war.
                    </p>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-accent p-6 rounded-r-lg">
                  <p className="text-sm text-text-light/70 uppercase tracking-wider mb-2">
                    Did You Know?
                  </p>
                  <p className="text-base text-text-light leading-relaxed italic">
                    Mary Cobb was William&apos;s <strong>sister</strong>, not his wife. She married
                    Henry Massengill Sr., whose son would later marry William&apos;s daughter. The
                    Massengill family connection runs deep through Rocky Mount&apos;s history.
                  </p>
                </div>
              </div>

              {/* Right Column: The Territorial Capital */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl text-primary font-bold mb-4">
                    The Territorial Capital (1790-1792)
                  </h3>
                  <div className="space-y-4 text-base leading-relaxed text-text-light">
                    <p>
                      In May 1790, Congress created the Territory of the United States South of the
                      River Ohio (the Southwest Territory). President George Washington appointed
                      William Blount—one of 39 signers of the U.S. Constitution—as its first
                      governor.
                    </p>
                    <p>
                      On October 11, 1790, Blount arrived at Rocky Mount. In a letter to his
                      brother, he described his accommodations: &ldquo;Glass Windows, Fire Place &c
                      &c.&rdquo; This ground became the seat of federal power in the West.
                    </p>
                    <p>
                      From Rocky Mount, Blount organized the territorial government. By November
                      1790, he had established militia companies. By January 1791, courts of law
                      were operating throughout the territory. New settlements formed, farms were
                      cleared, and commerce increased along the Tennessee and Holston rivers.
                    </p>
                    <p>
                      In December 1790, Cherokee chief Hanging Maw visited Rocky Mount for
                      preliminary peace discussions. The following summer, Barsheba Cobb fed 42
                      Cherokee chiefs and their attendants during treaty preparations. The Treaty of
                      Holston would be signed at White&apos;s Fort (Knoxville) on July 2, 1791, and
                      ratified by President Washington on November 11, 1791.
                    </p>
                    <p>
                      By early 1792, the capital had moved to Knoxville. But the patterns of
                      governance established here—county courts, land distribution, militia
                      organization—became the template for Tennessee statehood in 1796.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          TIMELINE
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-primary">
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none bg-noise"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent/70 mb-4 font-semibold">
                1770 - 1828
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-6">
                The Rocky Mount Timeline
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Six decades of history—from frontier settlement to the house that stands today.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div
                className="absolute left-8 top-0 bottom-0 w-px bg-accent/30"
                aria-hidden="true"
              />

              {/* Timeline Events */}
              <div className="space-y-12">
                {TIMELINE_EVENTS.map((event, _index) => (
                  <div key={event.year} className="relative pl-20">
                    {/* Year Marker */}
                    <div className="absolute left-0 top-1 w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                      <span className="text-sm font-bold text-accent">{event.year}</span>
                    </div>

                    {/* Event Content */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                      <h3 className="font-serif text-xl md:text-2xl text-white font-bold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-base text-white/80 leading-relaxed mb-3">
                        {event.description}
                      </p>
                      <Link
                        href={`/evidence/documents?ref=${event.refId}`}
                        className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Primary Source</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          KEY FIGURES
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-4 font-semibold">
                The People Who Made History
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-6">
                Key Figures at Rocky Mount
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {KEY_FIGURES.map((figure) => (
                <div
                  key={figure.name}
                  className="bg-cream border border-primary/10 rounded-lg p-8 hover:border-accent/30 transition-colors"
                >
                  <div className="mb-4">
                    <h3 className="font-serif text-2xl text-primary font-bold mb-1">
                      {figure.name}
                    </h3>
                    <p className="text-sm uppercase tracking-wider text-accent">{figure.role}</p>
                  </div>
                  <p className="text-base text-text-light leading-relaxed mb-4">
                    {figure.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" />
                    <Link
                      href={`/evidence/people/${figure.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-accent hover:text-accent-light transition-colors"
                    >
                      Read Full Biography
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          THE HOUSE VS THE GROUND
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-cream">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-4 font-semibold">
                Understanding the Structures
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-6">
                The House You See Today
              </h2>
            </div>

            <div className="space-y-6 text-lg text-text-light leading-relaxed">
              <p>
                The current main house (the Cobb House) was built between 1826-1828 by Michael
                Massengill, grandson of William Cobb. This has been verified through
                dendrochronology (tree-ring dating) conducted by the Tennessee Historical Commission
                in 2006.
              </p>
              <p>
                When Governor Blount arrived in 1790, he stayed in an{' '}
                <strong>earlier structure</strong> on this property. That building no longer stands.
                The dining room was added in 1829-1830, also confirmed by dendrochronology.
              </p>
              <p>
                This is why we say:{' '}
                <em>&ldquo;The ground is the artifact. The house is the proof.&rdquo;</em>
              </p>
              <p>
                The house proves the continuity of this site. It demonstrates that the Cobb and
                Massengill families remained on this ground for generations. But the historical
                significance comes from what happened here between 1790 and 1792—when this ground
                served as the seat of federal power in the West.
              </p>
            </div>

            <div className="mt-12 bg-white border-l-4 border-accent p-8 rounded-r-lg">
              <h3 className="font-serif text-xl text-primary font-bold mb-4">
                Verified by Science
              </h3>
              <p className="text-base text-text-light leading-relaxed mb-4">
                The dating of Rocky Mount&apos;s structures is not based on tradition or oral
                history. It comes from dendrochronology—a scientific method that matches tree-ring
                patterns to establish when timber was cut.
              </p>
              <p className="text-sm text-text-light/70 italic">
                Source: Grissino-Mayer & van de Gevel, 2007 dendrochronology study for the Tennessee
                Historical Commission.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          THE GOVERNING SYSTEM
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-4 font-semibold">
                How It Worked
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-6">
                Governing the Territory
              </h2>
              <p className="text-lg text-text-light max-w-3xl mx-auto leading-relaxed">
                In 1790, Congress organized the Southwest Territory from seven counties carved from
                North Carolina&apos;s western lands. Governor William Blount administered all seven
                from this ground.
              </p>
            </div>

            {/* Map */}
            <div className="mb-12">
              <figure className="relative max-w-4xl mx-auto">
                <div className="relative rounded-lg overflow-hidden shadow-xl border border-primary/10">
                  <Image
                    src="/images/original-seven-map-1790.png"
                    alt="Map of Tennessee at the beginning of 1790, showing the seven original counties: Sullivan, Washington, Hawkins, Greene in the east, and Davidson, Sumner, Tennessee in the west."
                    width={900}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="mt-4 text-center text-sm text-primary/60 italic">
                  Tennessee at the beginning of 1790 — Map by L. Pork Danville
                </figcaption>
              </figure>
            </div>

            {/* The Seven Counties */}
            <div className="space-y-6 text-base text-text-light leading-relaxed max-w-4xl mx-auto">
              <p>
                Four counties surrounded Rocky Mount:{' '}
                <strong>Washington, Sullivan, Greene, and Hawkins</strong>. Three more lay to the
                west in what would become Middle Tennessee:{' '}
                <strong>Davidson, Sumner, and Tennessee</strong>.
              </p>
              <p>
                Court records, land grants, militia commissions, and territorial correspondence all
                flowed through Rocky Mount from 1790 to 1792. The patterns of governance established
                here—county courts, land distribution, militia organization—became the template for
                Tennessee statehood in 1796.
              </p>
              <p>
                Of the original seven, only Sullivan, Washington, Greene, Hawkins, Davidson, and
                Sumner survive as counties today. Tennessee County was absorbed into what became
                Montgomery and Robertson counties. But the records of all seven passed through the
                hands of the territorial government at Rocky Mount.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          PRESERVATION & MISSION
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-primary">
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none bg-noise"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent/70 mb-4 font-semibold">
              Today
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-8">
              A State Historic Site
            </h2>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed mb-12">
              <p>
                Rocky Mount is now owned and operated by the State of Tennessee through the Rocky
                Mount Historical Association. The site is open to the public for tours, living
                history demonstrations, and educational programs.
              </p>
              <p>
                In October 2021, the association purchased an additional 15 acres for $365,000,
                protecting more of the historic ground and ensuring future generations can stand
                where Tennessee&apos;s government began.
              </p>
              <p>
                Our mission is to preserve this ground and tell its story with accuracy and respect—
                honoring both the achievements and the complexities of the founding era.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/visit"
                className="btn-primary"
              >
                <Calendar className="w-5 h-5" />
                Plan Your Visit
              </Link>
              <Link
                href="/evidence"
                className="btn-secondary"
              >
                <FileText className="w-5 h-5" />
                Explore the Evidence
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          INDIGENOUS ACKNOWLEDGMENT
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-cream border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
            <span className="w-8 h-px bg-primary/20" />
            <span className="text-primary/30">◆</span>
            <span className="w-8 h-px bg-primary/20" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-4">
            A Note of Respect
          </p>

          <p className="font-serif text-base md:text-lg text-text-light leading-relaxed italic mb-4">
            We acknowledge with respect that this valley was—and remains—ancestral homeland to the
            Cherokee and other Indigenous peoples, whose stewardship and stories continue today.
          </p>

          <p className="text-sm text-text-light/60">
            The history we share here honors, but does not replace, their enduring presence.
          </p>
        </div>
      </section>
    </main>
  )
}
