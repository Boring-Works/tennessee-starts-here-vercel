'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export function GroundStatement() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.4 })

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-primary overflow-hidden">
      {/* Background image overlay - low angle ground shot */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('/images/ground-texture.jpg')`,
          filter: 'grayscale(50%)',
        }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(10, 22, 40, 0.9) 0%, rgba(10, 22, 40, 0.7) 50%, rgba(10, 22, 40, 0.9) 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p
          className={`font-serif-elegant text-[clamp(1.5rem,4vw,2.5rem)] text-white/70 leading-relaxed mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}
        >
          The buildings evolved.
        </p>
        <p
          className={`font-serif-elegant text-[clamp(1.75rem,5vw,3rem)] text-accent leading-relaxed italic font-semibold fade-in-up stagger-1 ${isVisible ? 'visible' : ''}`}
        >
          The ground endures.
        </p>

        {/* Subtle flourish */}
        <div
          className={`mt-12 flex items-center justify-center gap-4 fade-in-up stagger-2 ${isVisible ? 'visible' : ''}`}
        >
          <div className="w-12 h-px bg-accent/30" />
          <span className="text-accent/40 text-xs">✦</span>
          <div className="w-12 h-px bg-accent/30" />
        </div>
      </div>
    </section>
  )
}
