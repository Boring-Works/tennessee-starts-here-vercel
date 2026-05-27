'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export function ExperimentSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.3 })

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-primary overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #0a1628 0%, #050d18 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Section label */}
        <p
          className={`text-[10px] uppercase tracking-[0.3em] text-accent/60 mb-8 fade-in-up ${isVisible ? 'visible' : ''}`}
        >
          The Bold Experiment
        </p>

        {/* Main text */}
        <p
          className={`font-serif text-[clamp(1.25rem,3vw,1.75rem)] text-white/80 leading-relaxed mb-6 fade-in-up stagger-1 ${isVisible ? 'visible' : ''}`}
        >
          In 1790, a question hung over the young republic:
        </p>

        <p
          className={`font-serif-elegant text-[clamp(1.5rem,4vw,2.25rem)] text-white/90 leading-relaxed italic fade-in-up stagger-2 ${isVisible ? 'visible' : ''}`}
        >
          Could American democracy survive beyond the Appalachians?
        </p>

        {/* Divider */}
        <div
          className={`w-16 h-px bg-accent/40 mx-auto my-10 fade-in-up stagger-3 ${isVisible ? 'visible' : ''}`}
        />

        <p
          className={`font-serif text-[clamp(1.25rem,3vw,1.5rem)] text-accent leading-relaxed fade-in-up stagger-4 ${isVisible ? 'visible' : ''}`}
        >
          Rocky Mount provided the answer.
        </p>
      </div>
    </section>
  )
}
