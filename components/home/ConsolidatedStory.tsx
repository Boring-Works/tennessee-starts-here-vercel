'use client'

import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal'
import { Claim } from '@/components/evidence/Claim'

/**
 * ConsolidatedStory Section - ENHANCED VISUAL DESIGN
 * Pushes CSS/Tailwind limits for maximum visual impact
 *
 * Visual techniques:
 * - Animated grain texture overlay
 * - Period-authentic decorative flourishes
 * - Dramatic typography with drop caps
 * - Glowing timeline markers with pulse animation
 * - Strikethrough reveal on contrast lines
 * - Radial spotlight effects
 */

const timelineData = [
  {
    year: '1770',
    text: 'The Cobbs settled this ground.',
    detail: 'Three generations would call it home.',
    icon: '🏠',
  },
  {
    year: '1780',
    text: 'They armed the Revolution.',
    detail: 'Supplied the Overmountain Men at Kings Mountain.',
    icon: '⚔️',
  },
  {
    year: '1790',
    text: 'Governor Blount made it the seat of federal power.',
    detail: 'The first capital of the Southwest Territory.',
    icon: '🏛️',
  },
]

const contrastLines = [
  { text: 'This is not where they gathered.', strike: true },
  { text: 'This is not where they farmed.', strike: true },
  { text: 'This is where they governed.', strike: false, finale: true },
]

export function ConsolidatedStory() {
  const { ref: hookRef, isVisible: hookVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })
  const { ref: questionRef, isVisible: questionVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })
  const { refs: timelineRefs, isVisible: timelineVisible } = useStaggeredReveal<HTMLDivElement>(
    timelineData.length,
    { threshold: 0.4 }
  )
  const { refs: contrastRefs, isVisible: contrastVisible } =
    useStaggeredReveal<HTMLParagraphElement>(contrastLines.length, { threshold: 0.5 })

  return (
    <section className="relative bg-primary overflow-hidden">
      {/* === LAYERED BACKGROUND SYSTEM === */}

      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg,
              #0a1628 0%,
              #0d1f35 20%,
              #071220 40%,
              #0a1628 60%,
              #0d1f35 80%,
              #050d18 100%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* Animated grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: 'grain 8s steps(10) infinite',
        }}
        aria-hidden="true"
      />

      {/* Radial spotlight for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, var(--gold-shimmer) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 30% 80%, rgba(139, 69, 19, 0.05) 0%, transparent 40%),
            radial-gradient(ellipse 60% 40% at 70% 60%, var(--gold-shimmer) 0%, transparent 40%)
          `,
        }}
        aria-hidden="true"
      />

      {/* === PART 1: MYSTERY HOOK === */}
      <div ref={hookRef} className="relative z-10 py-24 md:py-36">
        {/* Decorative top flourish */}
        <div
          className={`flex items-center justify-center gap-4 mb-12 transition-all duration-1000 ${hookVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          aria-hidden="true"
        >
          <span className="text-accent/30 text-2xl transform -scale-x-100">❧</span>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <span className="text-accent/50 text-sm">✦</span>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <span className="text-accent/30 text-2xl">❧</span>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Drop cap treatment */}
          <p
            className={`font-serif-elegant text-[clamp(2rem,6vw,3.5rem)] text-white/90 leading-[1.3] transition-all duration-1000 delay-200 ${hookVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span
              className="float-left text-[3em] leading-[0.8] mr-3 mt-1 font-serif font-bold text-accent/80"
              style={{
                textShadow: '0 0 40px var(--gold-shimmer)',
              }}
            >
              B
            </span>
            <span className="italic">efore there was a Tennessee,</span>
            <br />
            <span
              className="text-accent font-semibold"
              style={{
                textShadow: '0 0 60px var(--gold-shimmer)',
              }}
            >
              there was this ground.
            </span>
          </p>
        </div>

        {/* Bottom flourish */}
        <div
          className={`flex items-center justify-center gap-3 mt-12 transition-all duration-1000 delay-500 ${hookVisible ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-accent/30" />
          <span className="text-accent/40 text-xs">◆</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-accent/30" />
        </div>
      </div>

      {/* === PART 2: THE BOLD EXPERIMENT === */}
      <div ref={questionRef} className="relative z-10 py-20 md:py-32">
        {/* Subtle vignette for this section */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 100% 100% at 50% 50%, transparent 0%, rgba(5, 13, 24, 0.4) 100%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          {/* Section label with animated underline */}
          <div
            className={`inline-block mb-10 transition-all duration-700 ${questionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-accent/70 mb-2">
              The Bold Experiment
            </p>
            <div
              className={`h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent transition-all duration-1000 delay-300 ${questionVisible ? 'w-full' : 'w-0'}`}
              style={{ margin: '0 auto' }}
            />
          </div>

          {/* Context line */}
          <p
            className={`font-serif text-[clamp(1.25rem,3vw,1.75rem)] text-white/70 leading-relaxed mb-8 transition-all duration-700 delay-200 ${questionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            In{' '}
            <Claim doc="washington-to-knox-1790-08" passage="residence-question">
              1790
            </Claim>
            , a question hung over the young republic:
          </p>

          {/* The Big Question - with quote marks */}
          <div
            className={`relative inline-block transition-all duration-1000 delay-400 ${questionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span
              className="absolute -left-8 -top-4 text-6xl text-accent/20 font-serif select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p
              className="font-serif-elegant text-[clamp(1.6rem,4.5vw,2.5rem)] text-white leading-[1.4] italic px-4"
              style={{
                textShadow: '0 2px 40px rgba(255, 255, 255, 0.1)',
              }}
            >
              Could American democracy survive
              <br />
              <span className="text-accent/90">beyond the Appalachians?</span>
            </p>
            <span
              className="absolute -right-4 -bottom-6 text-6xl text-accent/20 font-serif select-none"
              aria-hidden="true"
            >
              &rdquo;
            </span>
          </div>

          {/* Distance visualization */}
          <div
            className={`mt-12 mb-10 transition-all duration-700 delay-600 ${questionVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex items-center justify-center gap-3 text-white/40 text-sm">
              <span className="font-serif">Philadelphia</span>
              <div className="relative w-32 md:w-48 h-px bg-white/20">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r from-accent/60 to-accent/20 transition-all duration-1500 delay-800 ${questionVisible ? 'w-full' : 'w-0'}`}
                />
                {/* Mile markers */}
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-accent/60">
                  600 miles
                </span>
              </div>
              <span className="font-serif text-accent/80">Rocky Mount</span>
            </div>
            <p className="text-xs text-white/30 mt-3 tracking-wide">
              Three weeks by horse through wilderness
            </p>
          </div>

          {/* The Answer */}
          <div
            className={`relative transition-all duration-700 delay-800 ${questionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-px h-6 bg-gradient-to-b from-transparent to-accent/40" />
            <p
              className="font-serif text-[clamp(1.4rem,3.5vw,1.75rem)] text-accent font-semibold"
              style={{
                textShadow: '0 0 30px var(--gold-shimmer)',
              }}
            >
              Rocky Mount provided the answer.
            </p>
          </div>
        </div>
      </div>

      {/* === PART 3: TIMELINE === */}
      <div className="relative z-10 py-20 md:py-32">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent/50">
            Three Decades That Shaped a State
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <div className="relative">
            {/* Glowing vertical line */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
              style={{
                background: `linear-gradient(180deg,
                  transparent 0%,
                  var(--gold-shimmer) 10%,
                  var(--gold-shimmer) 90%,
                  transparent 100%
                )`,
                boxShadow: '0 0 20px var(--gold-shimmer)',
              }}
              aria-hidden="true"
            />

            {/* Timeline items */}
            <div className="space-y-16 md:space-y-24">
              {timelineData.map((item, index) => (
                <div
                  key={item.year}
                  ref={timelineRefs[index]}
                  className={`relative pl-24 md:pl-0 md:grid md:grid-cols-2 md:gap-16 transition-all duration-700 ${timelineVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Year marker with glow */}
                  <div
                    className="absolute left-0 md:left-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-10"
                    style={{
                      background: `radial-gradient(circle, #0d1f35 0%, #0a1628 100%)`,
                      border: '2px solid var(--gold-shimmer)',
                      boxShadow: timelineVisible[index]
                        ? `
                          0 0 20px var(--gold-shimmer),
                          0 0 40px var(--gold-shimmer),
                          inset 0 0 20px var(--gold-shimmer)
                        `
                        : 'none',
                      transition: 'box-shadow 0.5s ease',
                    }}
                  >
                    <div className="text-center">
                      <span className="block text-lg md:text-xl">{item.icon}</span>
                      <span className="block text-accent/90 font-serif text-xs font-bold mt-0.5">
                        {item.year.slice(-2)}
                      </span>
                    </div>
                  </div>

                  {/* Content card - alternating sides */}
                  <div
                    className={`${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:col-start-2 md:pl-16'}`}
                  >
                    {/* Large year watermark */}
                    <span
                      className="block text-[clamp(3rem,10vw,5rem)] font-serif font-bold leading-none mb-3"
                      style={{
                        background: `linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {item.year}
                    </span>

                    {/* Main text */}
                    <p
                      className="font-serif text-[clamp(1.3rem,3.5vw,1.85rem)] text-white/95 leading-relaxed mb-3"
                      style={{
                        textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {item.year === '1790' ? (
                        <Claim doc="blount-arrival-1790" passage="glass-windows">
                          {item.text}
                        </Claim>
                      ) : (
                        item.text
                      )}
                    </p>

                    {/* Detail with subtle styling */}
                    <p className="text-sm text-white/50 font-light tracking-wide">{item.detail}</p>

                    {/* Decorative line */}
                    <div
                      className={`mt-4 h-px bg-gradient-to-${index % 2 === 0 ? 'l' : 'r'} from-accent/30 to-transparent ${index % 2 === 0 ? 'ml-auto' : ''}`}
                      style={{ width: '60%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === PART 4: CONTRAST STATEMENT === */}
      <div className="relative z-10 py-24 md:py-36">
        {/* Dramatic radial spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 50%, rgba(13, 31, 53, 0.8) 0%, rgba(5, 13, 24, 1) 70%),
              radial-gradient(ellipse 50% 30% at 50% 50%, var(--gold-shimmer) 0%, transparent 50%)
            `,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Decorative opener */}
          <div className="flex items-center justify-center gap-4 mb-12" aria-hidden="true">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-white/20 text-lg">✧</span>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-white/20" />
          </div>

          <div className="space-y-8 md:space-y-10">
            {contrastLines.map((line, index) => (
              <p
                key={index}
                ref={contrastRefs[index]}
                className={`font-serif-elegant leading-relaxed transition-all duration-700 ${
                  contrastVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                } ${
                  line.finale
                    ? 'text-[clamp(2rem,6vw,3.5rem)] font-semibold mt-4'
                    : 'text-[clamp(1.5rem,4vw,2.5rem)]'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                  color: line.finale ? undefined : 'rgba(255, 255, 255, 0.5)',
                  textDecoration: line.strike && contrastVisible[index] ? 'line-through' : 'none',
                  textDecorationColor: 'rgba(255, 255, 255, 0.3)',
                  textDecorationThickness: '2px',
                }}
              >
                {line.finale ? (
                  <span
                    className="text-accent italic"
                    style={{
                      textShadow: `
                        0 0 40px var(--gold-shimmer),
                        0 0 80px var(--gold-shimmer)
                      `,
                    }}
                  >
                    {line.text}
                  </span>
                ) : (
                  line.text
                )}
              </p>
            ))}
          </div>

          {/* Final flourish */}
          <div
            className={`flex items-center justify-center gap-3 mt-16 transition-all duration-700 delay-700 ${contrastVisible[2] ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
          >
            <span className="text-accent/30 transform -scale-x-100">❧</span>
            <div className="w-12 h-px bg-accent/30" />
            <span className="text-accent/40">✦</span>
            <div className="w-12 h-px bg-accent/30" />
            <span className="text-accent/30">❧</span>
          </div>
        </div>
      </div>

      {/* === KEYFRAME ANIMATIONS === */}
      <style jsx>{`
        @keyframes grain {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-2%, -2%);
          }
          20% {
            transform: translate(2%, 2%);
          }
          30% {
            transform: translate(-1%, 1%);
          }
          40% {
            transform: translate(1%, -1%);
          }
          50% {
            transform: translate(-2%, 2%);
          }
          60% {
            transform: translate(2%, -2%);
          }
          70% {
            transform: translate(-1%, -1%);
          }
          80% {
            transform: translate(1%, 1%);
          }
          90% {
            transform: translate(-2%, -1%);
          }
        }
      `}</style>
    </section>
  )
}
