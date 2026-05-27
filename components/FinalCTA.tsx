import { memo } from 'react'
import Link from 'next/link'
import { HOOKS, BUTTONS } from '@/lib/copy'

/**
 * FinalCTA Component
 *
 * Page-closing call-to-action section. Memoized since it renders
 * static content that doesn't change based on props or state.
 */
function FinalCTAComponent() {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background gradient matching hero */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 100%, rgba(139, 69, 19, 0.1) 0%, transparent 60%),
            linear-gradient(175deg, #0d1f35 0%, #0a1628 50%, #050d18 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 py-20 md:py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Decorative top flourish */}
          <div className="flex items-center justify-center gap-3 mb-8" aria-hidden="true">
            <span className="w-12 h-px bg-accent/30" />
            <span className="text-accent text-sm">✦</span>
            <span className="w-12 h-px bg-accent/30" />
          </div>

          {/* Headline */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Stand Where Tennessee Began
          </h2>

          {/* Subheading */}
          <p className="font-serif-elegant text-lg md:text-xl italic text-white/60 mb-8">
            {HOOKS.primaryCTA}
          </p>

          {/* Primary CTA - matching hero button */}
          <Link
            href="/visit"
            className="group inline-flex items-center justify-center gap-3 bg-accent text-primary px-10 py-5 text-base font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[var(--gold-hover)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(201,162,39,0.4)]"
          >
            <span className="text-xl transition-transform duration-300 group-hover:scale-110">
              ★
            </span>
            {BUTTONS.primary}
          </Link>

          {/* Closing tagline */}
          <p className="mt-10 font-serif-elegant text-base md:text-lg italic text-accent/80">
            {HOOKS.closingTagline}
          </p>

          {/* Decorative bottom flourish */}
          <div className="flex items-center justify-center gap-3 mt-8" aria-hidden="true">
            <span className="text-accent/40 text-xs">❧</span>
            <span className="w-8 h-px bg-accent/20" />
            <span className="text-accent/40 text-xs">❧</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(FinalCTAComponent)
