'use client'

import { useStaggeredReveal } from '@/hooks/useScrollReveal'

const timelineData = [
  {
    year: '1770',
    text: 'The Cobbs settled this ground.',
    detail: 'Three generations would call it home.',
  },
  {
    year: '1780',
    text: 'They armed the Revolution.',
    detail: 'Supplied the Overmountain Men at Kings Mountain.',
  },
  {
    year: '1790',
    text: 'Governor Blount made it the seat of federal power.',
    detail: 'The first capital of the Southwest Territory.',
  },
]

export function ScrollTimeline() {
  const { refs, isVisible } = useStaggeredReveal<HTMLDivElement>(timelineData.length, {
    threshold: 0.4,
  })

  return (
    <section className="relative py-20 md:py-32 bg-primary overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #050d18 0%, #0a1628 50%, #0d1f35 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-accent/20 transform md:-translate-x-1/2"
            aria-hidden="true"
          />

          {/* Timeline items */}
          <div className="space-y-16 md:space-y-24">
            {timelineData.map((item, index) => (
              <div
                key={item.year}
                ref={refs[index]}
                className={`relative pl-20 md:pl-0 md:grid md:grid-cols-2 md:gap-12 fade-in-up ${isVisible[index] ? 'visible' : ''}`}
              >
                {/* Year marker */}
                <div
                  className="absolute left-0 md:left-1/2 w-16 h-16 rounded-full bg-primary border-2 border-accent/40 flex items-center justify-center transform md:-translate-x-1/2"
                  aria-hidden="true"
                >
                  <span className="text-accent/80 font-serif text-lg font-bold">
                    {item.year.slice(-2)}
                  </span>
                </div>

                {/* Content - alternating sides on desktop */}
                <div
                  className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}
                >
                  <span className="block text-[clamp(2.5rem,8vw,4rem)] font-serif font-bold text-white/10 leading-none mb-2">
                    {item.year}
                  </span>
                  <p className="font-serif text-[clamp(1.25rem,3vw,1.75rem)] text-white/90 leading-relaxed mb-2">
                    {item.text}
                  </p>
                  <p className="text-sm text-white/50">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
