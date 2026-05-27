import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, Ticket, Calendar, FileText, Users2 } from 'lucide-react'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { NextEventBadge } from '@/components/home/NextEventBadge'
import { WeatherBadge } from '@/components/home/WeatherBadge'
import { MYSTERY_NARRATIVE, HOOKS, BUTTONS, FIRST_250_CAMPAIGN } from '@/lib/copy'
import siteInfo from '@/data/siteInfo.json'
import testimonials from '@/data/testimonials.json'
import eventsData from '@/data/events.json'
import type { Event } from '@/lib/schemas/events'

export const metadata: Metadata = {
  title: "Where Tennessee's Government Began | Rocky Mount State Historic Site",
  description:
    'In 1790, Governor Blount made this ground the first capital of the Southwest Territory. Stand where they stood. America 250 and Tennessee 230 commemorative events in 2026.',
}

// Three featured testimonials (static display)
const FEATURED_TESTIMONIALS = testimonials.featured.slice(0, 3)

export default function HomePage() {
  const { hero } = MYSTERY_NARRATIVE

  // Calculate next event for the badge
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Use type assertion or simple logic since we're in server component
  const nextEvent =
    (eventsData.events
      .filter((event) => {
        // Ensure date is treated as local date or consistent
        // The JSON dates are YYYY-MM-DD.
        // We want to find the first event where date >= today.
        const eventDate = new Date(`${event.date}T12:00:00`) // Force noon to avoid timezone shift issues
        return eventDate >= today
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] as Event) || null

  return (
    <main className="min-h-screen">
      {/* ════════════════════════════════════════════════════════════════════
          ACT 1: THE PROBLEM — HERO SECTION
          Simplified hero focusing on the core value proposition
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col bg-primary overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/50" />
        </div>

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none bg-noise"
          aria-hidden="true"
        />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center pt-28 pb-16 px-6 lg:px-20">
          <div className="w-full max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {/* First 250 Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-accent/30 rounded-sm animate-fade-in">
                <span className="text-base">🇺🇸</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                  {hero.badge}
                </span>
              </div>

              {/* Eyebrow */}
              <p className="text-[11px] uppercase tracking-[0.3em] text-accent/80 font-medium animate-fade-in animation-delay-100">
                First Capital of the Southwest Territory · 1790
              </p>

              {/* Main Headline - Updated per spec */}
              <h1 className="type-display text-white animate-fade-in animation-delay-200">
                Where Tennessee&apos;s Government Began
              </h1>

              {/* Subhead */}
              <p className="type-h3 text-white/90 max-w-2xl mx-auto animate-fade-in animation-delay-300">
                In 1790, Governor Blount made this ground the first capital of the Southwest
                Territory. Stand where they stood.
              </p>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-4 animate-fade-in animation-delay-350">
                <div className="flex items-center gap-1.5">
                  <span className="text-accent text-sm">★★★★★</span>
                  <span className="text-white/50 text-xs">TripAdvisor</span>
                </div>
                <span className="text-white/20">·</span>
                <span className="text-white/60 text-xs">50,000+ visitors annually</span>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in animation-delay-400">
                <Link
                  href="/visit"
                  className="btn-primary"
                >
                  {BUTTONS.primary}
                </Link>
                <span className="text-[11px] uppercase tracking-[0.15em] text-white/50 font-medium">
                  Opens March 4
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 pb-8 flex flex-col items-center animate-fade-in animation-delay-800">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Footer Note */}
        <div className="relative z-10 py-4 px-6 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 text-center sm:text-left">
            Part of the America 250 National Commemoration
          </p>
          <WeatherBadge />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CONSTITUTION CONNECTION
          StoryBrand: Establishing Authority + Historical Timeline
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="relative bg-primary py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="type-h3 text-white/90 mb-6">
              In 1787, William Blount signed the U.S. Constitution in Philadelphia.
            </p>
            <p className="type-h3 text-white/90 mb-6">
              In 1790, President Washington appointed him Governor of the Southwest Territory.
            </p>
            <p className="type-h2 text-white">
              From this ground, he governed the territory that would become Tennessee.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          ACT 2: THE PLAN — THREE HERO PATHS
          Replaces the 4-card Audience Router with 3 clear paths forward
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="relative bg-white py-20 md:py-28" aria-labelledby="paths-heading">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2
                id="paths-heading"
                className="type-h2 text-primary mb-6"
              >
                Choose Your Experience
              </h2>
            </div>

            {/* Three Prominent Path Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* PATH 1: Visit This Week */}
              <Link
                href="/visit"
                className="group relative bg-cream border-2 border-primary/10 p-8 transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
                <h3 className="type-h3 text-primary text-center mb-4 group-hover:text-accent transition-colors">
                  Visit in Person
                </h3>
                <p className="type-body text-text-light text-center mb-6">
                  Tours start at 10am Wed–Sat. Book online or walk in. See the room where Governor
                  Blount governed.
                </p>
                <div className="space-y-2 text-sm text-text-light/80 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{siteInfo.hours.formatted.short}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Ticket className="w-4 h-4 text-accent" />
                    <span>Adults ${siteInfo.admission.adults.price}</span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-accent font-semibold">
                    Book Your Tour
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>

              {/* PATH 2: Explore the Evidence */}
              <Link
                href="/evidence"
                className="group relative bg-primary border-2 border-white/10 p-8 transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-accent" />
                </div>
                <h3 className="type-h3 text-white text-center mb-4 group-hover:text-accent transition-colors">
                  Enter the Evidence Room
                </h3>
                <p className="type-body text-white/70 text-center mb-6">
                  Original letters, treaties, and documents. See Blount&apos;s words. Read Cherokee
                  diplomatic correspondence.
                </p>
                <div className="text-center mb-6">
                  <NextEventBadge nextEvent={nextEvent} />
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-accent font-semibold">
                    Enter the Evidence Room
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>

              {/* PATH 3: Join the First 250 */}
              <Link
                href="/first-250"
                className="group relative bg-accent/5 border-2 border-accent/30 p-8 transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/20"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <Users2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="type-h3 text-primary text-center mb-4 group-hover:text-accent transition-colors">
                  Join the First 250
                </h3>
                <p className="type-body text-text-light text-center mb-4">
                  {FIRST_250_CAMPAIGN.promise}
                </p>
                <p className="text-sm text-text-light/60 text-center mb-6 italic">
                  {FIRST_250_CAMPAIGN.deadline}
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-accent font-semibold">
                    Claim Your Spot
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          AUTHORITY — Why Rocky Mount Is the Real Deal
          StoryBrand: Guide Credentials (Empathy + Authority)
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="relative bg-primary py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="type-h2 text-white mb-6">
                Federal Authority on the Frontier
              </h2>
              <p className="type-body text-white/80 max-w-3xl mx-auto">
                From 1790–1792, this site served as the seat of government for the Southwest
                Territory.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
                <div className="text-4xl mb-4 text-accent">📜</div>
                <h3 className="type-h3 text-white mb-3">
                  Constitution Signer
                </h3>
                <p className="type-body text-white/70">
                  William Blount signed the U.S. Constitution, was appointed by George Washington,
                  and made this his headquarters.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
                <div className="text-4xl mb-4 text-accent">🏛️</div>
                <h3 className="type-h3 text-white mb-3">First Capital</h3>
                <p className="type-body text-white/70">
                  The first seat of government for the Southwest Territory. Not a replica. The
                  actual buildings where it happened.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
                <div className="text-4xl mb-4 text-accent">📚</div>
                <h3 className="type-h3 text-white mb-3">
                  Original Documents
                </h3>
                <p className="type-body text-white/70">
                  Read Blount&apos;s actual letters. See Cherokee treaties. Touch history through
                  primary sources.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          UPCOMING EVENTS — Don't Just Read History. Be There.
          StoryBrand: Calls to Action (Specific Opportunities)
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="relative bg-cream py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="type-h2 text-primary mb-4">
                Experience America 250 at Rocky Mount
              </h2>
              <p className="type-body text-text-light max-w-3xl mx-auto">
                Three signature programs in 2026—the year Tennessee turns 230 and America turns 250.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Link
                href="/events/colonial-independence-day"
                className="group bg-white border-2 border-primary/10 p-8 transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-sm uppercase tracking-wider text-accent mb-2 font-semibold">
                  July 4, 2026
                </div>
                <h3 className="type-h3 text-primary mb-4 group-hover:text-accent transition-colors">
                  Colonial Independence Day
                </h3>
                <p className="type-body text-text-light mb-4">
                  First 250 founding ceremony. Living history. Period music. The way 1776 was
                  celebrated on the frontier.
                </p>
                <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-accent font-semibold">
                  Learn More →
                </span>
              </Link>

              <Link
                href="/events/first-families-reunion"
                className="group bg-white border-2 border-primary/10 p-8 transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-sm uppercase tracking-wider text-accent mb-2 font-semibold">
                  August 22-24, 2026
                </div>
                <h3 className="type-h3 text-primary mb-4 group-hover:text-accent transition-colors">
                  First Families Reunion
                </h3>
                <p className="type-body text-text-light mb-4">
                  If your ancestors were here before 1796, this is your homecoming. Genealogy
                  research. Heritage celebration.
                </p>
                <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-accent font-semibold">
                  Learn More →
                </span>
              </Link>

              <Link
                href="/events/harvest-fest"
                className="group bg-white border-2 border-primary/10 p-8 transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-sm uppercase tracking-wider text-accent mb-2 font-semibold">
                  October 11-12, 2026
                </div>
                <h3 className="type-h3 text-primary mb-4 group-hover:text-accent transition-colors">
                  Harvest Fest
                </h3>
                <p className="type-body text-text-light mb-4">
                  1790s harvest traditions. Demonstrations. Craft sales. Apple butter stirring. The
                  whole frontier experience.
                </p>
                <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-accent font-semibold">
                  Learn More →
                </span>
              </Link>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors font-semibold"
              >
                View Full Event Calendar →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          HISTORICAL SIGNIFICANCE
          Focus on substantive claims rather than visitor pressure
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="relative bg-white py-16 md:py-24 border-t border-b border-secondary/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="type-h2 text-primary mb-6">
              Where Tennessee&apos;s Government Began
            </h2>
            <p className="type-body text-text-light mb-6">
              This is where Blount established territorial authority. Where courts were organized.
              Where Cherokee leaders came for preliminary peace talks in December 1790.
            </p>
            <p className="type-h3 text-primary">
              The seat of government for the territory that became Tennessee.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          ACT 3: SUCCESS — SOCIAL PROOF + FINAL CTA
          Simplified testimonials (static, no carousel) + compact visit info
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section
          className="relative bg-primary py-20 md:py-28"
          aria-labelledby="testimonials-heading"
        >
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none bg-noise"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent/70 mb-4 font-semibold">
                Visitor Experiences
              </p>
              <h2
                id="testimonials-heading"
                className="type-h2 text-white mb-6"
              >
                What Visitors Say
              </h2>
            </div>

            {/* Three Static Testimonials (No Carousel) */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {FEATURED_TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white/5 border border-white/10 p-8 rounded-sm"
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-serif text-lg text-white/90 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Attribution */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-white/60">{testimonial.attribution}</p>
                    </div>
                    <div className="text-xs text-accent/70 font-medium px-2 py-1 bg-accent/10 rounded">
                      {testimonial.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Compact Visit Info Bar */}
            <div className="bg-white/10 border border-white/20 rounded-sm p-8 mb-12">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-sm">{siteInfo.hours.formatted.short}</span>
                </div>
                <span className="text-white/30">·</span>
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-accent" />
                  <span className="text-sm">Adults ${siteInfo.admission.adults.price}</span>
                </div>
                <span className="text-white/30">·</span>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-sm">
                    {siteInfo.location.drivingDistances[0].time} from{' '}
                    {siteInfo.location.drivingDistances[0].city.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                SUCCESS VISION — The Transformation
                StoryBrand: Ending in Success
                ════════════════════════════════════════════════════════════════ */}
            <div className="bg-white/5 border border-white/10 rounded-sm p-12 mb-16">
              <div className="max-w-3xl mx-auto">
                <h3 className="type-h2 text-white mb-8 text-center">
                  Before and After
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-accent mb-3 text-sm uppercase tracking-wider font-semibold">
                      Before Your Visit
                    </div>
                    <p className="type-body text-white/70">
                      You know Tennessee has a founding story. But it feels distant. Abstract.
                      Something that happened &ldquo;somewhere out there&rdquo; in the past.
                    </p>
                  </div>

                  <div>
                    <div className="text-accent mb-3 text-sm uppercase tracking-wider font-semibold">
                      After Your Visit
                    </div>
                    <p className="type-body text-white/90">
                      You&apos;ll know where you&apos;re from. You&apos;ll have walked the same
                      ground where Blount governed. You&apos;ll have stood in the room where it
                      happened.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                  <p className="font-serif text-xl text-white italic">
                    History stops being something you read about.
                    <br />
                    It becomes something you&apos;ve witnessed.
                  </p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <p className="type-h3 text-white/90 mb-6 italic">
                {HOOKS.primaryCTA}
              </p>
              <Link
                href="/visit"
                className="btn-primary"
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                  ★
                </span>
                {BUTTONS.primary}
              </Link>
              <p className="mt-6 text-sm text-white/40">
                Open Wed–Sat, March 4–December 20 · 50,000+ annual visitors
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          INDIGENOUS ACKNOWLEDGMENT
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 bg-cream border-t border-secondary/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
            <span className="w-8 h-px bg-secondary/20" />
            <span className="text-secondary/30">◆</span>
            <span className="w-8 h-px bg-secondary/20" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/40 mb-4">
            A Note of Respect
          </p>

          <p className="font-serif text-base md:text-lg text-text-light leading-relaxed italic">
            We acknowledge with respect that this valley was—and remains—ancestral homeland to the
            Cherokee and other Indigenous peoples, whose stewardship and stories continue today.
          </p>

          <p className="text-sm text-text-light/60 mt-4">
            The history we share here honors, but does not replace, their enduring presence.
          </p>
        </div>
      </section>
    </main>
  )
}
