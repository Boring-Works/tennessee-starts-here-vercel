'use client'

import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal'

const figures = [
  {
    name: 'William Blount',
    title: 'Constitution Signer',
    role: 'Governor 1790-1792',
    quote: 'Commissioned by Washington to govern the frontier.',
  },
  {
    name: 'Andrew Jackson',
    title: 'Future President',
    role: 'Lodged here 1788',
    quote: 'Six weeks at age 21, studying law.',
  },
  {
    name: 'The Cobb Family',
    title: 'Three Generations',
    role: 'Settled ~1770',
    quote: 'Supplied the Revolution.',
  },
]

export function ProofSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })
  const { refs: cardRefs, isVisible: cardsVisible } = useStaggeredReveal<HTMLDivElement>(
    figures.length,
    { threshold: 0.2 }
  )
  const { ref: footerRef, isVisible: footerVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.5,
  })

  return (
    <section className="relative py-20 md:py-32 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 fade-in-up ${headerVisible ? 'visible' : ''}`}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/60 mb-4">
            Who Walked This Ground
          </p>
          <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] text-primary leading-tight">
            The Record Is Clear
          </h2>
        </div>

        {/* Figure cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {figures.map((figure, index) => (
            <div
              key={figure.name}
              ref={cardRefs[index]}
              className={`bg-white p-8 border border-secondary/10 fade-in-up ${cardsVisible[index] ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Wax seal decoration */}
              <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mb-6">
                <span className="text-burgundy text-xl">✦</span>
              </div>

              <h3 className="font-serif text-xl text-primary font-semibold mb-1">{figure.name}</h3>
              <p className="text-sm text-secondary font-medium mb-1">{figure.title}</p>
              <p className="text-xs text-text-light mb-4">{figure.role}</p>

              <p className="text-sm text-text-light italic border-l-2 border-accent/40 pl-4">
                &ldquo;{figure.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Blount framing */}
        <div
          ref={footerRef}
          className={`text-center max-w-3xl mx-auto fade-in-up ${footerVisible ? 'visible' : ''}`}
        >
          <p className="font-serif-elegant text-lg md:text-xl text-primary/80 italic mb-6">
            &ldquo;A man who helped create the Constitution would now implement it on the
            frontier.&rdquo;
          </p>
          <p className="font-serif text-base md:text-lg text-secondary">
            Governor Blount governed here. Andrew Jackson lodged here.
            <br />
            <span className="text-accent font-semibold">The State started here.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
