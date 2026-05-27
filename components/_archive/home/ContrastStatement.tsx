'use client'

import { useStaggeredReveal } from '@/hooks/useScrollReveal'

const lines = [
  { text: 'This is not where they gathered.', highlight: false },
  { text: 'This is not where they farmed.', highlight: false },
  { text: 'This is where they governed.', highlight: true },
]

export function ContrastStatement() {
  const { refs, isVisible } = useStaggeredReveal<HTMLParagraphElement>(lines.length, {
    threshold: 0.5,
  })

  return (
    <section className="relative py-24 md:py-32 bg-primary overflow-hidden">
      {/* Dark gradient for emphasis */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 100% 80% at 50% 50%, #0d1f35 0%, #050d18 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-6 md:space-y-8">
          {lines.map((line, index) => (
            <p
              key={index}
              ref={refs[index]}
              className={`font-serif-elegant text-[clamp(1.5rem,4vw,2.5rem)] leading-relaxed reveal-line ${
                isVisible[index] ? 'visible' : ''
              } ${line.highlight ? 'text-accent italic font-semibold' : 'text-white/70'}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {line.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
