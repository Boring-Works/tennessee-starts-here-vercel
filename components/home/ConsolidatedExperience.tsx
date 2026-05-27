'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, memo } from 'react'
import { useHours } from '@/lib/hooks/useHours'
import { BUTTONS, HOOKS } from '@/lib/copy'
import siteInfo from '@/data/siteInfo.json'

/**
 * ConsolidatedExperience Section - ENHANCED VISUAL DESIGN
 * Pushes CSS/Tailwind limits for maximum visual impact
 *
 * Visual techniques:
 * - Vintage postcard aesthetic for experience cards
 * - 3D hover transforms with perspective
 * - Animated icon reveals
 * - Parallax ground statement
 * - Period-authentic ticket styling for visit info
 * - Dramatic decorative flourishes
 */

interface ExperienceMoment {
  numeral: string
  title: string
  description: string
  detail: string
  icon: React.ReactNode
}

/**
 * Custom hook for intersection observer
 * Consolidates repeated observer logic
 */
function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(threshold: number = 0.2) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// Period-authentic engraving-style SVG icons
const GroundsIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-all duration-700"
  >
    <path d="M8 52h48M12 52V32M52 32v20" className="icon-line" />
    <path d="M12 32h40" className="icon-line" />
    <path d="M16 32V22M24 32V22M32 32V22M40 32V22M48 32V22" className="icon-line" />
    <path d="M10 22h44l-22-12-22 12z" className="icon-line" />
    <circle cx="32" cy="16" r="2" className="icon-line" />
  </svg>
)

const SettlersIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-all duration-700"
  >
    <ellipse cx="32" cy="18" rx="8" ry="9" className="icon-line" />
    <path d="M24 14c-4-2-6 0-8 2h0c2 4 6 4 8 2" className="icon-line" />
    <path d="M40 14c4-2 6 0 8 2h0c-2 4-6 4-8 2" className="icon-line" />
    <path d="M26 22s2 4 6 4 6-4 6-4" className="icon-line" />
    <path d="M24 27l-8 28h8l8-18 8 18h8l-8-28" className="icon-line" />
  </svg>
)

const BuildingsIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-all duration-700"
  >
    <path d="M8 32l24-16 24 16" className="icon-line" />
    <path d="M12 32v22h40V32" className="icon-line" />
    <path d="M26 54V40h12v14" className="icon-line" />
    <rect x="16" y="38" width="8" height="8" className="icon-line" />
    <rect x="40" y="38" width="8" height="8" className="icon-line" />
  </svg>
)

const ScrollIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-all duration-700"
  >
    <path d="M16 8c-4 0-6 2-6 6v36c0 4 2 6 6 6" className="icon-line" />
    <path d="M16 8h32c4 0 6 2 6 6v28c0 4-2 6-6 6H20" className="icon-line" />
    <path d="M16 56c4 0 6-2 6-6V14c0-4-2-6-6-6" className="icon-line" />
    <ellipse cx="18" cy="52" rx="4" ry="6" className="icon-line" />
    <path d="M26 20h20M26 26h18M26 32h16M26 38h14" strokeWidth="1" className="icon-line" />
  </svg>
)

const experiences: ExperienceMoment[] = [
  {
    numeral: 'I',
    icon: <GroundsIcon />,
    title: 'Stand on Historic Ground',
    description: "The same ground where Governor Blount established Tennessee's government.",
    detail: 'Walk where founders walked',
  },
  {
    numeral: 'II',
    icon: <SettlersIcon />,
    title: 'Meet the Settlers',
    description: 'Costumed interpreters bring 1790s frontier life to vivid reality.',
    detail: 'Living history demonstrations',
  },
  {
    numeral: 'III',
    icon: <BuildingsIcon />,
    title: 'Enter the Past',
    description: "Historic structures on the ground where Tennessee's government began.",
    detail: 'Original & reconstructed buildings',
  },
  {
    numeral: 'IV',
    icon: <ScrollIcon />,
    title: 'Hear the Story',
    description: "Guided tours reveal how Tennessee's government began at this frontier outpost.",
    detail: 'Expert-led interpretations',
  },
]

function ConsolidatedExperienceComponent() {
  // Use consolidated intersection observer hooks
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>(0.2)
  const { ref: groundRef, isVisible: groundVisible } = useIntersectionObserver<HTMLDivElement>(0.4)
  const { ref: visitRef, isVisible: visitVisible } = useIntersectionObserver<HTMLDivElement>(0.3)
  const hours = useHours()

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* === PART 1: EXPERIENCE PREVIEW === */}
      <div className="relative py-24 md:py-32 bg-white">
        {/* Subtle aged paper texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Header with dramatic styling */}
          <header className="text-center mb-20">
            {/* Decorative top flourish */}
            <div
              className={`flex items-center justify-center gap-4 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden="true"
            >
              <span className="text-burgundy/30 text-xl transform -scale-x-100">❧</span>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-burgundy/30 to-transparent" />
              <span className="text-burgundy/40 text-sm">✦</span>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-burgundy/30 to-transparent" />
              <span className="text-burgundy/30 text-xl">❧</span>
            </div>

            {/* Eyebrow */}
            <p
              className={`text-[11px] uppercase tracking-[0.4em] text-secondary/50 mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              The Living History Experience
            </p>

            {/* Main headline with bracket flourishes */}
            <div
              className={`flex items-center justify-center gap-4 mb-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span
                className="text-4xl md:text-5xl text-accent/40 font-light"
                style={{ fontFamily: 'serif' }}
              >
                [
              </span>
              <h2
                className="font-serif text-[clamp(2.5rem,6vw,4rem)] text-primary font-bold"
                style={{
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              >
                Step Into 1790
              </h2>
              <span
                className="text-4xl md:text-5xl text-accent/40 font-light"
                style={{ fontFamily: 'serif' }}
              >
                ]
              </span>
            </div>

            {/* Subhead */}
            <p
              className={`font-serif-elegant text-lg md:text-xl text-primary/70 italic max-w-2xl mx-auto mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              More than a museum. Rocky Mount is a living window into the birth of Tennessee.
            </p>

            {/* Audience tags with decorative treatment */}
            <div
              className={`flex flex-wrap items-center justify-center gap-3 mb-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              {['Families', 'History Enthusiasts', 'School Groups'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 border border-secondary/20 text-xs uppercase tracking-wider text-secondary/70 rounded-sm"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(245, 240, 230, 0.5) 0%, transparent 100%)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Decorative rule */}
            <div
              className={`flex items-center justify-center gap-3 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden="true"
            >
              <div className="w-16 h-px bg-accent/30" />
              <span className="text-accent text-sm">✦</span>
              <div className="w-16 h-px bg-accent/30" />
            </div>
          </header>

          {/* Experience cards grid with vintage postcard styling */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {experiences.map((exp, i) => (
              <article
                key={i}
                className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                style={{
                  transitionDelay: `${600 + i * 150}ms`,
                  perspective: '1000px',
                }}
              >
                {/* Card with 3D transform */}
                <div
                  className="relative bg-cream p-6 md:p-8 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl"
                  style={{
                    border: '1px solid rgba(139, 69, 19, 0.15)',
                    boxShadow: `
                      0 4px 20px rgba(0, 0, 0, 0.06),
                      0 1px 3px rgba(0, 0, 0, 0.08)
                    `,
                    transform: 'rotateX(0deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Page curl effect */}
                  <div
                    className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-secondary/10 to-transparent group-hover:from-secondary/20 transition-all duration-300"
                    style={{
                      clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Decorative corner brackets */}
                  <div
                    className="absolute top-3 left-3 w-3 h-3 border-t border-l border-burgundy/20"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute top-3 right-3 w-3 h-3 border-t border-r border-burgundy/20"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-burgundy/20"
                    aria-hidden="true"
                  />

                  {/* Roman numeral watermark */}
                  <span
                    className="absolute top-4 right-4 text-5xl font-serif font-bold pointer-events-none select-none"
                    style={{
                      color: 'rgba(139, 69, 19, 0.06)',
                    }}
                    aria-hidden="true"
                  >
                    {exp.numeral}
                  </span>

                  {/* Icon with engraving style */}
                  <div
                    className="w-14 h-14 mb-5 text-burgundy/60 group-hover:text-burgundy transition-colors duration-300"
                    aria-hidden="true"
                  >
                    {exp.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-lg md:text-xl text-primary font-semibold mb-2 leading-tight">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed mb-4">{exp.description}</p>

                  {/* Hover reveal detail */}
                  <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-300">
                    <p className="text-xs text-accent font-medium uppercase tracking-wider pt-2 border-t border-accent/20">
                      {exp.detail}
                    </p>
                  </div>
                </div>

                {/* Connection line (between cards on desktop) */}
                {i < experiences.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-accent/30 to-accent/10"
                    aria-hidden="true"
                  />
                )}
              </article>
            ))}
          </div>

          {/* Journey indicator */}
          <div
            className={`hidden lg:flex items-center justify-center gap-2 mt-12 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="text-xs text-secondary/40">Your journey:</span>
            <div className="flex items-center gap-1">
              {experiences.map((exp, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-xs font-serif text-accent/60">{exp.numeral}</span>
                  {i < experiences.length - 1 && <span className="mx-1 text-secondary/30">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === PART 2: GROUND STATEMENT === */}
      <div ref={groundRef} className="relative py-28 md:py-40 bg-primary overflow-hidden">
        {/* Layered background for depth */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/images/ground-texture.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(60%) contrast(1.1)',
          }}
          aria-hidden="true"
        />

        {/* Dark overlay with radial spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 50%, rgba(10, 22, 40, 0.75) 0%, rgba(5, 13, 24, 0.95) 100%)
            `,
          }}
          aria-hidden="true"
        />

        {/* Animated particles (subtle) */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='dust'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23dust)'/%3E%3C/svg%3E")`,
            animation: 'drift 20s ease-in-out infinite',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Decorative opener */}
          <div
            className={`flex items-center justify-center gap-4 mb-12 transition-all duration-1000 ${groundVisible ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-accent/30" />
            <span className="text-accent/40 text-lg">✧</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-accent/30" />
          </div>

          {/* First line */}
          <p
            className={`font-serif-elegant text-[clamp(1.75rem,5vw,3rem)] text-white/60 leading-relaxed mb-4 transition-all duration-1000 delay-200 ${groundVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            The buildings evolved.
          </p>

          {/* Second line with dramatic emphasis */}
          <p
            className={`font-serif-elegant text-[clamp(2.25rem,6vw,4rem)] leading-tight italic font-semibold transition-all duration-1000 delay-500 ${groundVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
              color: 'var(--gold-primary)',
              textShadow: `
                0 0 40px var(--gold-shimmer),
                0 0 80px var(--gold-shimmer),
                0 4px 20px rgba(0, 0, 0, 0.4)
              `,
            }}
          >
            The ground endures.
          </p>

          {/* Animated underline */}
          <div
            className={`flex items-center justify-center mt-8 transition-all duration-1000 delay-800 ${groundVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div
              className={`h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-1500 delay-1000 ${groundVisible ? 'w-48' : 'w-0'}`}
            />
          </div>

          {/* Bottom flourish */}
          <div
            className={`flex items-center justify-center gap-3 mt-12 transition-all duration-700 delay-1200 ${groundVisible ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
          >
            <span className="text-accent/30 transform -scale-x-100">❧</span>
            <div className="w-8 h-px bg-accent/30" />
            <span className="text-accent/40 text-xs">✦</span>
            <div className="w-8 h-px bg-accent/30" />
            <span className="text-accent/30">❧</span>
          </div>
        </div>
      </div>

      {/* === PART 3: VISIT INFO === */}
      <div ref={visitRef} className="relative py-20 md:py-28 bg-cream overflow-hidden">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238b4513' stroke-width='0.5'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Location header */}
          <div
            className={`text-center mb-12 transition-all duration-700 ${visitVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
              <div className="w-12 h-px bg-secondary/20" />
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="w-12 h-px bg-secondary/20" />
            </div>
            <p className="text-sm text-secondary/60 uppercase tracking-wider">
              {siteInfo.location.address.street} · {siteInfo.location.address.city},{' '}
              {siteInfo.location.address.state}
            </p>
            <p className="text-xs text-text-light mt-2">
              30 min from Johnson City · 45 min from Knoxville
            </p>
          </div>

          {/* Testimonial card */}
          <div
            className={`max-w-2xl mx-auto mb-12 transition-all duration-700 delay-200 ${visitVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div
              className="relative p-8 bg-white rounded"
              style={{
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(139, 69, 19, 0.1)',
              }}
            >
              {/* Quote marks */}
              <span
                className="absolute top-4 left-4 text-5xl text-accent/10 font-serif"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <div className="text-center">
                <div className="text-accent text-lg mb-3">★★★★★</div>
                <p className="font-serif-elegant text-lg md:text-xl text-primary/80 italic mb-4">
                  {HOOKS.fameBridge}
                </p>
                <p className="text-sm text-text-light mb-2">
                  &ldquo;The kids were mesmerized — it felt like stepping back in time.&rdquo;
                </p>
                <p className="text-xs text-secondary/60">— Sarah M., Nashville</p>
              </div>
            </div>
          </div>

          {/* Info cards - Vintage ticket styling */}
          <div
            className={`grid md:grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-300 ${visitVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Hours */}
            <div
              className="relative p-6 bg-white text-center"
              style={{
                border: '2px dashed rgba(139, 69, 19, 0.2)',
                borderRadius: '4px',
              }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cream text-[10px] uppercase tracking-wider text-secondary/60 border border-secondary/20"
                style={{ borderRadius: '2px' }}
              >
                Hours
              </div>
              <div className="pt-2">
                <p className="font-serif text-xl text-primary mb-1">{hours.formatted.days}</p>
                <p className="font-serif text-lg text-primary/80">{hours.formatted.time}</p>
                <p className="text-xs text-accent mt-2 font-medium">Last tour {hours.lastTour}</p>
              </div>
            </div>

            {/* Admission */}
            <div
              className="relative p-6 bg-white text-center"
              style={{
                border: '2px dashed rgba(139, 69, 19, 0.2)',
                borderRadius: '4px',
              }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cream text-[10px] uppercase tracking-wider text-secondary/60 border border-secondary/20"
                style={{ borderRadius: '2px' }}
              >
                Admission
              </div>
              <div className="pt-2">
                <p className="font-serif text-primary">
                  <span className="text-xl">${siteInfo.admission.adults.price}</span>
                  <span className="text-sm text-secondary/60"> Adults</span>
                </p>
                <p className="text-sm text-primary/70 mt-1">
                  Seniors ${siteInfo.admission.seniors.price} · Children $
                  {siteInfo.admission.children.price}
                </p>
                <p className="text-xs text-text-light mt-2">Under 6 free</p>
              </div>
            </div>

            {/* Duration */}
            <div
              className="relative p-6 bg-white text-center"
              style={{
                border: '2px dashed rgba(139, 69, 19, 0.2)',
                borderRadius: '4px',
              }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cream text-[10px] uppercase tracking-wider text-secondary/60 border border-secondary/20"
                style={{ borderRadius: '2px' }}
              >
                Duration
              </div>
              <div className="pt-2">
                <p className="font-serif text-xl text-primary">2 – 3 Hours</p>
                <p className="text-sm text-primary/70 mt-1">Recommended</p>
                <p className="text-xs text-text-light mt-2">Comfortable shoes advised</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className={`text-center transition-all duration-700 delay-500 ${visitVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Link
              href="/visit"
              className="group inline-flex items-center justify-center gap-3 bg-accent text-primary px-12 py-5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[var(--gold-hover)] hover:-translate-y-1 hover:shadow-xl"
              style={{
                boxShadow: '0 4px 20px var(--gold-shimmer)',
              }}
            >
              <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                ★
              </span>
              {BUTTONS.primary}
            </Link>
          </div>
        </div>
      </div>

      {/* === KEYFRAME ANIMATIONS === */}
      <style jsx>{`
        @keyframes drift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-2%, 2%);
          }
        }
      `}</style>
    </section>
  )
}

// Memoize component to prevent unnecessary re-renders
export const ConsolidatedExperience = memo(ConsolidatedExperienceComponent)
