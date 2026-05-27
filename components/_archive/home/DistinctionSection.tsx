'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export function DistinctionSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.3 })

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-cream-dark">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Section label */}
        <p
          className={`text-[10px] uppercase tracking-[0.3em] text-secondary/50 mb-8 fade-in-up ${isVisible ? 'visible' : ''}`}
        >
          The Record Is Clear
        </p>

        {/* Timeline comparison */}
        <div className={`space-y-4 mb-10 fade-in-up stagger-1 ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-4 text-left">
            <span className="text-accent font-serif font-bold text-lg w-28 text-right shrink-0">
              1790–1792
            </span>
            <span className="text-primary font-serif text-lg">
              Rocky Mount: First Southwest Territorial Capital
            </span>
          </div>
          <div className="inline-flex items-center gap-4 text-left">
            <span className="text-secondary/60 font-serif text-lg w-28 text-right shrink-0">
              1792–1817
            </span>
            <span className="text-primary/70 font-serif text-lg">
              Knoxville: Second territorial, then first state capital
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`w-16 h-px bg-accent/30 mx-auto mb-10 fade-in-up stagger-2 ${isVisible ? 'visible' : ''}`}
        />

        {/* Closing statement */}
        <p
          className={`font-serif text-base md:text-lg text-text-light mb-3 fade-in-up stagger-3 ${isVisible ? 'visible' : ''}`}
        >
          Tennessee became the 16th state in 1796.
        </p>
        <p
          className={`font-serif-elegant text-xl md:text-2xl text-primary italic fade-in-up stagger-4 ${isVisible ? 'visible' : ''}`}
        >
          The foundation was laid here.
        </p>
      </div>
    </section>
  )
}
