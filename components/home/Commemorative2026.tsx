'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useMemo, useSyncExternalStore } from 'react'
import type { Event } from '@/lib/schemas/events'

interface Commemorative2026Props {
  stats: {
    lectures: number
    festivals: number
    seasonal: number
    total: number
  }
  nextEvent: Event
}

/**
 * Commemorative2026 Section
 * "The Capital Year" - Museum-quality commemorative section
 *
 * Design features:
 * - Parchment proclamation styling with authentic seals
 * - Animated star field representing 16 states
 * - Constitution quill motif
 * - Primary source quote integration
 * - Dramatic timeline visualization
 * - Colonial ledger aesthetic
 */

// Client-only rendering hook (prevents hydration mismatch)
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true, // client
    () => false // server
  )
}

// Animated counter hook
function useCountUp(end: number, duration: number = 1500, isVisible: boolean) {
  const [count, setCount] = useState(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isVisible) return

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isVisible])

  return count
}

// Quill pen icon for signatures
const QuillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path
      d="M20 2C18 4 15 5 12 5C9 5 6 7 4 10C3 12 3 14 4 16L8 12L12 8C14 6 17 4 20 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4 16L2 22L8 20L4 16Z" fill="currentColor" opacity="0.3" />
    <path
      d="M4 16L2 22L8 20L4 16Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Proclamation scroll icon
const ScrollIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path
      d="M19 3H9C7.89 3 7 3.89 7 5V6H5C3.89 6 3 6.89 3 8V19C3 20.1 3.89 21 5 21H15C16.1 21 17 20.1 17 19V18H19C20.1 18 21 17.1 21 16V5C21 3.89 20.1 3 19 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 7H17" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M9 10H15" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M9 13H13" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
)

// Calendar icon
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export function Commemorative2026({ stats, nextEvent }: Commemorative2026Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const ledgerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [ledgerVisible, setLedgerVisible] = useState(false)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const isClient = useIsClient()

  // Generate 16 stars for the 16 states - use deterministic positions to avoid hydration mismatch
  // Seeded pseudo-random values for star positions (pre-calculated)
  const starOffsets = useMemo(
    () => [
      [2.1, 4.3],
      [3.7, 8.1],
      [1.2, 2.9],
      [4.5, 6.7],
      [0.8, 3.2],
      [3.3, 9.1],
      [2.8, 5.4],
      [4.1, 7.8],
      [1.9, 2.1],
      [3.5, 6.3],
      [2.4, 8.7],
      [4.8, 4.9],
      [0.6, 7.2],
      [3.1, 3.6],
      [2.7, 9.4],
      [4.3, 5.8],
    ],
    []
  )

  const stars = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: 10 + (i % 8) * 11 + starOffsets[i][0],
        y: 20 + Math.floor(i / 8) * 30 + starOffsets[i][1],
        delay: i * 0.1,
        label: i === 15 ? 'Tennessee (16th)' : `State ${i + 1}`,
      })),
    [starOffsets]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLedgerVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ledgerRef.current) {
      observer.observe(ledgerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Animated counters — must be called unconditionally (React hooks rule)
  const animatedEventCount = useCountUp(stats.total, 1500, isVisible)
  const animatedMiles = useCountUp(600, 1500, ledgerVisible)
  const animatedYears = useCountUp(14, 1200, ledgerVisible)

  // Parse event date using UTC to avoid hydration mismatch between server/client
  // Use optional chaining just in case nextEvent is null (though logic should prevent it)
  if (!nextEvent) return null

  const eventDate = new Date(`${nextEvent.date}T12:00:00Z`)
  const monthShort = eventDate.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
  const dayNum = eventDate.getUTCDate()
  const year = eventDate.getUTCFullYear()

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          PART 1: THE PROCLAMATION
          Campaign Header with First 250 Enrollment
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative bg-primary">
        {/* Animated star field background */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {isClient &&
            stars.map((star) => (
              <div
                key={star.id}
                className="absolute transition-all duration-500"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  transform: `scale(${hoveredStar === star.id ? 1.5 : 1})`,
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${star.delay.toFixed(1)}s`,
                }}
                onMouseEnter={() => setHoveredStar(star.id)}
                onMouseLeave={() => setHoveredStar(null)}
              >
                <span
                  className={`text-lg ${star.id === 15 ? 'text-accent' : 'text-white/20'}`}
                  style={{
                    textShadow:
                      star.id === 15
                        ? '0 0 20px var(--gold-shimmer), 0 0 40px var(--gold-shimmer)'
                        : 'none',
                    animation: star.id === 15 ? 'pulse 2s ease-in-out infinite' : 'none',
                  }}
                >
                  ★
                </span>
              </div>
            ))}

          {/* Deep gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 100% 60% at 50% 0%, transparent 0%, #0a1628 70%),
                radial-gradient(ellipse 120% 80% at 50% 100%, rgba(139, 69, 19, 0.2) 0%, transparent 50%),
                linear-gradient(180deg, #0d1f35 0%, #0a1628 50%, #050d18 100%)
              `,
            }}
          />
        </div>

        {/* Proclamation content */}
        <div className="relative z-10 py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6">
            {/* Decorative header */}
            <div
              className={`flex items-center justify-center gap-4 mb-8 fade-in-up ${isVisible ? 'visible' : ''}`}
              aria-hidden="true"
            >
              <span className="w-16 h-px bg-accent/40" />
              <span className="text-accent/60 text-sm tracking-[0.5em]">
                A · D · M · D · C · C · X · X · V · I
              </span>
              <span className="w-16 h-px bg-accent/40" />
            </div>

            {/* Main headline with dramatic typography */}
            <div className="text-center mb-10">
              <h2
                className={`font-serif leading-tight mb-6 fade-in-up stagger-1 ${isVisible ? 'visible' : ''}`}
                style={{
                  fontSize: 'clamp(2rem, 7vw, 4rem)',
                  background: 'linear-gradient(180deg, #ffffff 0%, var(--gold-primary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Tennessee turns 230.
                <br />
                America turns 250.
              </h2>

              {/* Three declarations with quill marks */}
              <div className={`space-y-4 mb-10 fade-in-up stagger-2 ${isVisible ? 'visible' : ''}`}>
                {[
                  'First capital of the Southwest Territory.',
                  'Where one of 39 Constitution signers governed the frontier.',
                  'The ground where Tennessee began.',
                ].map((text, i) => (
                  <div key={i} className="flex items-center justify-center gap-3">
                    <span className="text-accent/40">
                      <QuillIcon />
                    </span>
                    <p className="font-serif-elegant text-lg text-white/80 italic">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary source quote - the cornerstone */}
            <div
              className={`relative max-w-2xl mx-auto mb-12 fade-in-up stagger-3 ${isVisible ? 'visible' : ''}`}
            >
              <div
                className="relative p-8 border border-accent/30 rounded-sm"
                style={{
                  background: `
                    linear-gradient(135deg, var(--gold-shimmer) 0%, transparent 50%),
                    rgba(255, 255, 255, 0.02)
                  `,
                }}
              >
                {/* Corner embellishments */}
                <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/50" />
                <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/50" />
                <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent/50" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/50" />

                <blockquote className="text-center">
                  <p className="font-serif-elegant text-lg md:text-xl italic text-white/90 leading-relaxed mb-4">
                    &ldquo;I am very well accommodated with a Room with Glass Windows, Fireplace,
                    etc., etc., at this place.&rdquo;
                  </p>
                  <footer className="text-sm text-accent/80">
                    <cite className="not-italic">— William Blount, October 20, 1790</cite>
                    <span className="block text-xs text-white/40 mt-1">
                      Constitution Signer · First Governor of the Southwest Territory
                    </span>
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* Decorative divider */}
            <div
              className={`flex items-center justify-center gap-4 mb-10 fade-in-up stagger-4 ${isVisible ? 'visible' : ''}`}
            >
              <span className="w-20 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              <span className="text-accent">✦</span>
              <span className="w-20 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            </div>

            {/* First 250 CTA - Proclamation style */}
            <div className={`text-center fade-in-up stagger-5 ${isVisible ? 'visible' : ''}`}>
              <p className="font-serif text-xl md:text-2xl text-white/90 mb-2">
                Be one of the <span className="text-accent font-semibold">First 250</span>.
              </p>
              <p className="text-sm text-white/60 mb-6 italic">
                Your name will be read aloud on the capital grounds, July 4, 2026.
              </p>

              <Link
                href="/first-250"
                className="group inline-flex items-center gap-3 bg-accent text-primary px-10 py-5 text-base font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[var(--gold-hover)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,162,39,0.4)]"
              >
                <span className="text-lg transition-transform duration-300 group-hover:rotate-12">
                  <ScrollIcon />
                </span>
                <span>Join the First 250</span>
              </Link>

              <p className="text-xs text-white/50 mt-4">
                Enrollment closes June 1, 2026 · Charter member benefits included
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          PART 2: THE CALENDAR
          2026 Events Showcase
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative bg-primary border-t border-white/10">
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-6">
            {/* Section header */}
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-accent">
                  <CalendarIcon />
                </span>
                <p className="text-[10px] uppercase tracking-[0.4em] text-accent/70">
                  The Commemorative Year
                </p>
              </div>
              <p className="text-white/60 text-sm">
                <span className="text-accent font-semibold">{stats.total}</span> events celebrating
                America&apos;s 250th and Tennessee&apos;s 230th
              </p>
            </div>

            {/* Events grid - Colonial broadsheet style */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
              {/* Featured upcoming event */}
              <div className="md:col-span-2 lg:col-span-1 group relative">
                <div
                  className="h-full bg-white/5 border border-white/10 p-6 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.07]"
                  style={{
                    clipPath:
                      'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)',
                  }}
                >
                  {/* Corner fold effect */}
                  <div
                    className="absolute bottom-0 right-0 w-6 h-6 bg-accent/20 transition-colors duration-300 group-hover:bg-accent/40"
                    style={{
                      clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                    }}
                  />

                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent/80 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Coming Up
                  </p>

                  <div className="flex items-start gap-4">
                    <div className="text-center bg-white/10 p-3 min-w-[70px] border border-white/5">
                      <span className="block text-xs text-accent/90 uppercase tracking-wider">
                        {monthShort}
                      </span>
                      <span className="block text-3xl font-bold text-white">{dayNum}</span>
                      <span className="block text-xs text-white/40">{year}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-white text-lg mb-2 group-hover:text-accent transition-colors">
                        {nextEvent.title}
                      </h3>
                      <p className="text-sm text-white/50 line-clamp-2">
                        {nextEvent.description.split('. ')[0]}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category cards */}
              {[
                {
                  count: stats.lectures,
                  label: 'Lecture Series',
                  desc: 'Historians explore the founding era',
                  icon: '📜',
                },
                {
                  count: stats.festivals,
                  label: 'Festivals & Events',
                  desc: 'Living history, colonial trade fairs',
                  icon: '🎭',
                },
                {
                  count: stats.seasonal,
                  label: 'Seasonal Programs',
                  desc: 'Haunting tales, candlelit holidays',
                  icon: '🕯️',
                },
              ].map((category, i) => (
                <div
                  key={i}
                  className="group bg-white/5 border border-white/10 p-6 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl opacity-80 transition-transform duration-300 group-hover:scale-110">
                      {category.icon}
                    </span>
                    <div>
                      <span
                        className="text-3xl font-bold transition-colors duration-300"
                        style={{
                          background:
                            'linear-gradient(180deg, var(--gold-primary) 0%, var(--gold-hover) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {category.count}
                      </span>
                      <p className="text-xs text-white/40">{category.label}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/60">{category.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats ribbon */}
            <div className="text-center mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent/60">
                The 2026 Program
              </p>
            </div>
            <div className="flex items-center justify-center gap-8 text-center mb-10">
              <div className="group">
                <span
                  className="text-4xl font-bold block transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background:
                      'linear-gradient(180deg, var(--gold-primary) 0%, var(--gold-hover) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {animatedEventCount}
                </span>
                <span className="text-xs text-white/50 uppercase tracking-wider">Events</span>
              </div>
              <span className="text-accent/30 text-lg">◆</span>
              <div className="group">
                <span
                  className="text-4xl font-bold block transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background:
                      'linear-gradient(180deg, var(--gold-primary) 0%, var(--gold-hover) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  10
                </span>
                <span className="text-xs text-white/50 uppercase tracking-wider">Months</span>
              </div>
              <span className="text-accent/30 text-lg">◆</span>
              <div className="group">
                <span
                  className="text-4xl font-bold block transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background:
                      'linear-gradient(180deg, var(--gold-primary) 0%, var(--gold-hover) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  1
                </span>
                <span className="text-xs text-white/50 uppercase tracking-wider">Capital</span>
              </div>
            </div>

            {/* Calendar link */}
            <div className="text-center">
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 text-sm text-accent hover:text-white transition-colors uppercase tracking-[0.15em]"
              >
                <span>View Full 2026 Calendar</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          PART 3: THE LEDGER
          Promise vs Proof - Colonial accounting aesthetic
          ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={ledgerRef}
        className="relative py-20 md:py-28"
        style={{
          background: `
            linear-gradient(180deg, #f5f0e6 0%, #ebe5d9 100%)
          `,
        }}
      >
        {/* Parchment texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* Ledger lines */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 39px,
                #8B4513 39px,
                #8B4513 40px
              )
            `,
            backgroundPosition: '0 20px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Ledger header */}
          <div className="text-center mb-14">
            <div className="inline-block mb-4 px-6 py-2 border-t-2 border-b-2 border-secondary/20">
              <p className="text-[10px] uppercase tracking-[0.4em] text-secondary/50">
                The Official Record of Expansion
              </p>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-primary mb-3">
              Two Dates. One Story.
            </h3>
            <p className="text-text-light max-w-xl mx-auto">
              Independence was declared in Philadelphia.
              <br />
              <span className="text-secondary font-medium">It was proven on the frontier.</span>
            </p>
          </div>

          {/* The comparison - Ledger book style */}
          <div
            className={`grid md:grid-cols-2 gap-8 mb-14 relative ${ledgerVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
          >
            {/* Connecting line */}
            <div
              className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              aria-hidden="true"
            >
              <div className="relative">
                {/* Journey line */}
                <div
                  className="w-24 h-0.5 bg-gradient-to-r from-secondary/40 via-accent to-secondary/40"
                  style={{
                    animation: ledgerVisible ? 'shimmer 3s ease-in-out infinite' : 'none',
                  }}
                />
                {/* Center marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream border-2 border-accent flex items-center justify-center shadow-lg">
                  <span className="text-accent font-bold text-lg">→</span>
                </div>
              </div>
            </div>

            {/* 1776 - The Promise */}
            <div
              className="relative bg-white p-8 border border-secondary/15 shadow-sm transition-all duration-500 hover:shadow-lg"
              style={{
                transform: ledgerVisible ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: '0.2s',
              }}
            >
              {/* Page edge effect */}
              <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-secondary/5 to-transparent" />

              {/* Seal watermark */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-secondary/10 flex items-center justify-center">
                <span className="text-2xl text-secondary/20">⚑</span>
              </div>

              <span
                className="text-4xl md:text-5xl font-bold block mb-1"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(139, 69, 19, 0.4)',
                }}
              >
                1776
              </span>
              <span className="text-xs text-secondary/60 uppercase tracking-[0.2em] block mb-4">
                The Promise
              </span>

              <h4 className="font-serif text-2xl text-primary mb-2">Philadelphia</h4>
              <p className="text-xs text-text-light/70 mb-4 font-mono">
                39°57&apos;N · 75°10&apos;W
              </p>

              <p className="text-text-light leading-relaxed">
                Words on parchment. A promise made.
                <span className="block mt-2 text-sm italic text-text-light/70">
                  &ldquo;We hold these truths to be self-evident...&rdquo;
                </span>
              </p>
            </div>

            {/* 1790 - The Proof */}
            <div
              className="relative bg-white p-8 border-2 border-accent/50 shadow-md transition-all duration-500 hover:shadow-xl hover:border-accent"
              style={{
                transform: ledgerVisible ? 'translateX(0)' : 'translateX(20px)',
                transitionDelay: '0.4s',
              }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at top right, var(--gold-shimmer), transparent 70%)',
                }}
              />

              {/* Territorial seal */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-burgundy/10 border-2 border-burgundy/30 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-burgundy/70">SW</span>
                <span className="text-[8px] text-burgundy/50">TERR.</span>
              </div>

              <span
                className="text-4xl md:text-5xl font-bold block mb-1"
                style={{
                  background: 'linear-gradient(180deg, var(--gold-primary) 0%, #8B4513 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                1790
              </span>
              <span className="text-xs text-accent uppercase tracking-[0.2em] block mb-4">
                The Proof
              </span>

              <h4 className="font-serif text-2xl text-primary mb-2">Rocky Mount</h4>
              <p className="text-xs text-text-light/70 mb-4 font-mono">
                36°26&apos;N · 82°18&apos;W
              </p>

              <p className="text-text-light leading-relaxed">
                Action on the frontier. A promise kept.
                <span className="block mt-2 text-sm italic text-accent/80">
                  Where Tennessee&apos;s government began.
                </span>
              </p>
            </div>
          </div>

          {/* Stats in ledger footer style */}
          <div
            className={`flex flex-wrap items-center justify-center gap-8 md:gap-12 text-center pt-8 border-t border-secondary/10 ${ledgerVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
            style={{ transitionDelay: '0.6s' }}
          >
            <div>
              <span className="text-3xl md:text-4xl font-bold text-accent">{animatedMiles}</span>
              <span className="block text-xs text-text-light mt-1">miles from Philadelphia</span>
            </div>
            <div className="text-accent/30 hidden sm:block">❧</div>
            <div>
              <span className="text-3xl md:text-4xl font-bold text-accent">{animatedYears}</span>
              <span className="block text-xs text-text-light mt-1">years to prove the promise</span>
            </div>
            <div className="text-accent/30 hidden sm:block">❧</div>
            <div>
              <span className="text-3xl md:text-4xl font-bold text-accent">16th</span>
              <span className="block text-xs text-text-light mt-1">state to join the Union</span>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
