'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export function IndigenousAcknowledgment() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.5 })

  return (
    <section ref={ref} className="relative py-12 md:py-16 bg-cream border-t border-secondary/10">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p
          className={`text-sm md:text-base text-text-light leading-relaxed fade-in-up ${isVisible ? 'visible' : ''}`}
        >
          We acknowledge with respect that this valley was—and remains—ancestral homeland to the
          Cherokee and other Indigenous peoples, whose stewardship and stories continue today.
        </p>
      </div>
    </section>
  )
}
