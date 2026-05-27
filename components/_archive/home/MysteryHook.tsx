'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export function MysteryHook() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.3 })

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-primary overflow-hidden">
      {/* Subtle gradient continuation from hero */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #0a1628 0%, #0d1f35 50%, #0a1628 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p
          className={`font-serif-elegant text-[clamp(1.75rem,5vw,3rem)] text-white/90 leading-relaxed italic fade-in-up ${isVisible ? 'visible' : ''}`}
        >
          Before there was a Tennessee,
          <br />
          <span className="text-accent">there was this ground.</span>
        </p>
      </div>
    </section>
  )
}
