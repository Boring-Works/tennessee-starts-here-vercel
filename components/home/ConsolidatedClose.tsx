'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { HOOKS, BUTTONS } from '@/lib/copy'
import siteInfo from '@/data/siteInfo.json'

/**
 * ConsolidatedClose Section
 * "The Benediction" - A dignified close
 *
 * Design features:
 * - Respectful indigenous acknowledgment with tobacco leaf motif
 * - Final CTA with dramatic typography
 * - Animated star constellation (16 states)
 * - Closing flourish with period styling
 * - Washington's question as anchor
 */

export function ConsolidatedClose() {
  const { ref: acknowledgeRef, isVisible: acknowledgeVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.5,
  })
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  return (
    <section className="relative overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          PART 1: INDIGENOUS ACKNOWLEDGMENT
          Respectful recognition with period-appropriate styling
          ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={acknowledgeRef}
        className="relative py-16 md:py-20 bg-cream border-t border-secondary/10"
      >
        {/* Subtle earth texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          {/* Decorative element - simplified natural motif */}
          <div
            className={`flex items-center justify-center gap-4 mb-6 fade-in-up ${acknowledgeVisible ? 'visible' : ''}`}
            aria-hidden="true"
          >
            <span className="w-8 h-px bg-secondary/20" />
            <svg className="w-5 h-5 text-secondary/30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.5 4 15 6 15 9C15 12 13 14 12 15C11 14 9 12 9 9C9 6 10.5 4 12 2Z" />
              <path d="M12 15V22" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <span className="w-8 h-px bg-secondary/20" />
          </div>

          <div
            className={`text-center fade-in-up stagger-1 ${acknowledgeVisible ? 'visible' : ''}`}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/40 mb-4">
              A Note of Respect
            </p>

            <p className="font-serif-elegant text-base md:text-lg text-text-light leading-relaxed italic">
              We acknowledge with respect that this valley was—and remains—ancestral homeland to the
              Cherokee and other Indigenous peoples, whose stewardship and stories continue today.
            </p>

            <p className="text-sm text-text-light/60 mt-4">
              The history we share here honors, but does not replace, their enduring presence.
            </p>
          </div>

          {/* Bottom flourish */}
          <div
            className={`flex items-center justify-center gap-3 mt-8 fade-in-up stagger-2 ${acknowledgeVisible ? 'visible' : ''}`}
            aria-hidden="true"
          >
            <span className="w-6 h-px bg-secondary/15" />
            <span className="text-secondary/20 text-xs">◆</span>
            <span className="w-6 h-px bg-secondary/15" />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          PART 2: FINAL CTA
          The dramatic close - "Tennessee Starts Here. Will You?"
          ═══════════════════════════════════════════════════════════════ */}
      <div ref={ctaRef} className="relative bg-primary overflow-hidden">
        {/* Layered background with star field */}
        <div className="absolute inset-0" aria-hidden="true">
          {/* Stars representing the 16 original states */}
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-white/10"
              style={{
                left: `${10 + (i % 8) * 12}%`,
                top: `${20 + Math.floor(i / 8) * 40}%`,
                fontSize: i === 15 ? '1.25rem' : '0.75rem',
                opacity: ctaVisible ? (i === 15 ? 0.6 : 0.15) : 0,
                transition: `opacity 0.5s ease ${i * 0.05}s`,
                textShadow: i === 15 ? '0 0 20px var(--gold-shimmer)' : 'none',
                color: i === 15 ? 'var(--gold-primary)' : undefined,
              }}
            >
              ★
            </span>
          ))}

          {/* Gradient overlays */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 100% 80% at 50% 100%, rgba(139, 69, 19, 0.15) 0%, transparent 60%),
                radial-gradient(ellipse 80% 50% at 50% 0%, var(--gold-shimmer) 0%, transparent 50%),
                linear-gradient(175deg, #0d1f35 0%, #0a1628 50%, #050d18 100%)
              `,
            }}
          />
        </div>

        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 py-24 md:py-32 px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* Decorative top flourish */}
            <div
              className={`flex items-center justify-center gap-4 mb-10 fade-in-up ${ctaVisible ? 'visible' : ''}`}
              aria-hidden="true"
            >
              <span className="w-16 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <span className="text-accent text-sm">✦</span>
              <span className="w-16 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </div>

            {/* Washington's Question - the anchor */}
            <div className={`mb-10 fade-in-up stagger-1 ${ctaVisible ? 'visible' : ''}`}>
              <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-3">
                George Washington asked
              </p>
              <blockquote className="font-serif-elegant text-lg md:text-xl italic text-white/60">
                &ldquo;Where ought the Governor to reside?&rdquo;
              </blockquote>
              <p className="text-sm text-accent/60 mt-2">— August 13, 1790</p>
            </div>

            {/* The Answer - Main headline */}
            <h2
              className={`font-serif leading-tight mb-6 fade-in-up stagger-2 ${ctaVisible ? 'visible' : ''}`}
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                background: 'linear-gradient(180deg, #ffffff 0%, var(--gold-primary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Story Continues With You
            </h2>

            {/* The hook */}
            <p
              className={`font-serif-elegant text-xl md:text-2xl italic text-white/70 mb-4 fade-in-up stagger-3 ${ctaVisible ? 'visible' : ''}`}
            >
              {HOOKS.primaryCTA}
            </p>

            {/* Final social proof */}
            <p
              className={`text-sm text-white/40 mb-10 fade-in-up stagger-3 ${ctaVisible ? 'visible' : ''}`}
            >
              Join <span className="text-accent">50,000+</span> annual visitors discovering
              Tennessee&apos;s founding story
            </p>

            {/* Primary CTA - The invitation */}
            <div className={`fade-in-up stagger-4 ${ctaVisible ? 'visible' : ''}`}>
              <Link
                href="/visit"
                className="group inline-flex items-center justify-center gap-3 bg-accent text-primary px-12 py-6 text-lg font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[var(--gold-hover)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(201,162,39,0.5)]"
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  ★
                </span>
                <span>{BUTTONS.primary}</span>
              </Link>
            </div>

            {/* Closing tagline - The benediction */}
            <p className={`mt-12 fade-in-up stagger-5 ${ctaVisible ? 'visible' : ''}`}>
              <span
                className="font-serif-elegant text-lg md:text-xl italic"
                style={{
                  background:
                    'linear-gradient(180deg, var(--gold-shimmer) 0%, var(--gold-shimmer) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {HOOKS.closingTagline}
              </span>
            </p>

            {/* Decorative bottom flourish */}
            <div
              className={`flex items-center justify-center gap-4 mt-10 fade-in-up stagger-6 ${ctaVisible ? 'visible' : ''}`}
              aria-hidden="true"
            >
              <span className="text-accent/30 text-sm">❧</span>
              <span className="w-12 h-px bg-accent/20" />
              <span className="text-accent/50 text-xs">AD MDCCXC</span>
              <span className="w-12 h-px bg-accent/20" />
              <span className="text-accent/30 text-sm">❧</span>
            </div>

            {/* Site attribution */}
            <p
              className={`mt-8 text-xs text-white/20 fade-in-up stagger-6 ${ctaVisible ? 'visible' : ''}`}
            >
              {siteInfo.site.name} · {siteInfo.location.address.city},{' '}
              {siteInfo.location.address.state}
              <br />
              <span className="text-white/15">Capital of the Southwest Territory · 1790–1792</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
