'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function CampaignSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 })

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-primary overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% 100%, rgba(139, 69, 19, 0.15) 0%, transparent 50%),
                       linear-gradient(180deg, #0a1628 0%, #050d18 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Section label */}
        <p
          className={`text-[10px] uppercase tracking-[0.3em] text-accent/60 mb-6 fade-in-up ${isVisible ? 'visible' : ''}`}
        >
          2026: The Commemorative Year
        </p>

        {/* Main headline */}
        <h2
          className={`font-serif text-[clamp(2rem,6vw,3.5rem)] text-white leading-tight mb-6 fade-in-up stagger-1 ${isVisible ? 'visible' : ''}`}
        >
          Tennessee turns 230.
          <br />
          <span className="text-accent">America turns 250.</span>
        </h2>

        {/* Positioning lines */}
        <div className={`space-y-3 mb-10 fade-in-up stagger-2 ${isVisible ? 'visible' : ''}`}>
          <p className="font-serif-elegant text-lg text-white/70 italic">
            First capital of the Southwest Territory.
          </p>
          <p className="font-serif-elegant text-lg text-white/70 italic">
            Where a Constitution signer governed the frontier.
          </p>
          <p className="font-serif-elegant text-lg text-white/70 italic">
            The ground where Tennessee began.
          </p>
        </div>

        {/* Divider */}
        <div
          className={`w-16 h-px bg-accent/30 mx-auto mb-10 fade-in-up stagger-3 ${isVisible ? 'visible' : ''}`}
        />

        {/* Call to action */}
        <p
          className={`font-serif text-xl md:text-2xl text-white/90 mb-8 fade-in-up stagger-4 ${isVisible ? 'visible' : ''}`}
        >
          Be one of the <span className="text-accent font-semibold">First 250</span>.
        </p>

        <Link
          href="/first-250"
          className={`inline-flex flex-col sm:flex-row items-center justify-center bg-accent text-primary px-8 sm:px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[var(--gold-hover)] hover:-translate-y-0.5 hover:shadow-lg fade-in-up stagger-5 ${isVisible ? 'visible' : ''}`}
        >
          <span>Join the First 250</span>
          <span className="mt-1 sm:mt-0 sm:ml-2 text-primary/60 normal-case font-normal text-xs sm:text-sm">
            — Enrollment closes June 1
          </span>
        </Link>
      </div>
    </section>
  )
}
