'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useHours } from '@/lib/hooks/useHours'
import { BUTTONS } from '@/lib/copy'
import siteInfo from '@/data/siteInfo.json'

/**
 * PlanYourVisit Section
 * "The Invitation" - Colonial broadside aesthetic
 *
 * Design features:
 * - Vintage admission ticket styling
 * - Wax seal decorations
 * - Period typography with drop caps
 * - Animated map pin
 * - Colonial broadside layout
 * - Ribbon banners for key info
 */

export function PlanYourVisit() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 })
  const hours = useHours()

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-white">
      {/* Subtle parchment texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Decorative corner flourishes */}
      <div className="absolute top-8 left-8 w-20 h-20 opacity-10" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-secondary">
          <path d="M0 50 Q25 25 50 0" strokeWidth="1" />
          <path d="M0 70 Q35 35 70 0" strokeWidth="1" />
          <path d="M0 90 Q45 45 90 0" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 w-20 h-20 opacity-10 scale-x-[-1]" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-secondary">
          <path d="M0 50 Q25 25 50 0" strokeWidth="1" />
          <path d="M0 70 Q35 35 70 0" strokeWidth="1" />
          <path d="M0 90 Q45 45 90 0" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section header with colonial styling */}
        <div className={`text-center mb-16 fade-in-up ${isVisible ? 'visible' : ''}`}>
          {/* Decorative top element */}
          <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
            <span className="w-12 h-px bg-secondary/20" />
            <span className="text-accent text-sm">✦</span>
            <span className="w-12 h-px bg-secondary/20" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.4em] text-secondary/50 mb-4">
            Your Invitation Awaits
          </p>

          <h2
            className="font-serif leading-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              background: 'linear-gradient(180deg, #0d1f35 0%, #1a3a5c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Plan Your Visit
          </h2>

          <p className="font-serif-elegant text-lg text-text-light italic max-w-md mx-auto">
            Stand where they stood. Walk the ground where Tennessee began.
          </p>
        </div>

        {/* Info cards - Vintage ticket styling */}
        <div
          className={`grid md:grid-cols-3 gap-6 mb-14 fade-in-up stagger-1 ${isVisible ? 'visible' : ''}`}
        >
          {/* Location */}
          <div className="group relative">
            <div
              className="relative bg-cream border-2 border-dashed border-secondary/20 p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
              style={{
                clipPath:
                  'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            >
              {/* Corner notch styling */}
              <div
                className="absolute top-0 left-0 w-4 h-4 bg-white"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              />
              <div
                className="absolute bottom-0 right-0 w-4 h-4 bg-white"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              />

              {/* Animated map pin */}
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 relative">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {/* Pulse ring */}
                <span
                  className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping"
                  style={{ animationDuration: '2s' }}
                />
              </div>

              <h3 className="font-serif text-xl text-primary text-center mb-2">
                Piney Flats, Tennessee
              </h3>
              <p className="text-sm text-text-light text-center mb-1">
                15 minutes from Johnson City
              </p>
              <p className="text-xs text-text-light/60 text-center font-mono">
                36°26&apos;N · 82°18&apos;W
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="group relative">
            <div
              className="relative bg-cream border-2 border-dashed border-secondary/20 p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
              style={{
                clipPath:
                  'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            >
              <div
                className="absolute top-0 left-0 w-4 h-4 bg-white"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              />
              <div
                className="absolute bottom-0 right-0 w-4 h-4 bg-white"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              />

              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h3 className="font-serif text-xl text-primary text-center mb-2">Visiting Hours</h3>
              <div className="space-y-1 text-center">
                <p className="text-sm text-text-light">
                  <span className="font-medium">{hours.formatted.days}</span> {hours.formatted.time}
                </p>
                <p className="text-sm text-text-light">
                  <span className="font-medium">Last tour</span> at {hours.lastTour}
                </p>
                <p className="text-xs text-text-light/60 mt-2">Closed Sun–Tue</p>
              </div>
            </div>
          </div>

          {/* Admission */}
          <div className="group relative">
            <div
              className="relative bg-cream border-2 border-dashed border-secondary/20 p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
              style={{
                clipPath:
                  'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            >
              <div
                className="absolute top-0 left-0 w-4 h-4 bg-white"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              />
              <div
                className="absolute bottom-0 right-0 w-4 h-4 bg-white"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              />

              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>

              <h3 className="font-serif text-xl text-primary text-center mb-2">Admission</h3>
              <div className="space-y-1 text-center">
                <p className="text-sm text-text-light">
                  Adults{' '}
                  <span className="font-semibold text-accent">
                    ${siteInfo.admission.adults.price}
                  </span>{' '}
                  · Seniors{' '}
                  <span className="font-semibold text-accent">
                    ${siteInfo.admission.seniors.price}
                  </span>
                </p>
                <p className="text-sm text-text-light">
                  Children{' '}
                  <span className="font-semibold text-accent">
                    ${siteInfo.admission.children.price}
                  </span>
                </p>
                <p className="text-xs text-accent/80 mt-2 font-medium">✓ Free Parking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social proof ribbon */}
        <div className={`relative mb-12 fade-in-up stagger-2 ${isVisible ? 'visible' : ''}`}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4 px-6 bg-primary/5 border border-primary/10 rounded-sm">
            {/* Stars */}
            <div className="flex items-center gap-2">
              <span className="text-accent text-lg tracking-wider">★★★★★</span>
              <span className="text-sm text-text-light">TripAdvisor</span>
            </div>

            <span className="hidden sm:block w-px h-6 bg-primary/10" />

            {/* Visitor count */}
            <span className="text-sm text-text-light">
              <span className="font-semibold text-primary">50,000+</span> visitors annually
            </span>

            <span className="hidden sm:block w-px h-6 bg-primary/10" />

            {/* Quote */}
            <span className="text-sm text-text-light italic">
              &ldquo;Tennessee&apos;s Hidden Gem&rdquo;
            </span>
          </div>
        </div>

        {/* What's included - Colonial broadside style */}
        <div className={`relative mb-12 fade-in-up stagger-3 ${isVisible ? 'visible' : ''}`}>
          <div className="relative bg-cream/70 border border-secondary/15 p-8">
            {/* Corner embellishments */}
            <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent/40" />
            <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent/40" />
            <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent/40" />
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent/40" />

            <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 mb-5 text-center">
              Your Visit Includes
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: '🎭',
                  title: 'Guided Tour',
                  desc: 'Costumed interpreters bring history to life',
                },
                {
                  icon: '🏛️',
                  title: 'Historic Buildings',
                  desc: 'Access to all original structures',
                },
                {
                  icon: '📜',
                  title: 'Museum & Gift Shop',
                  desc: 'Exhibits and period reproductions',
                },
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <span className="text-3xl mb-3 block transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <h4 className="font-serif text-primary mb-1">{item.title}</h4>
                  <p className="text-sm text-text-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-4 ${isVisible ? 'visible' : ''}`}
        >
          <Link
            href="/visit"
            className="group inline-flex items-center justify-center gap-3 bg-accent text-primary px-10 py-5 text-base font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[var(--gold-hover)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(201,162,39,0.4)]"
          >
            <span className="text-lg transition-transform duration-300 group-hover:scale-110">
              ★
            </span>
            <span>{BUTTONS.primary}</span>
          </Link>

          <a
            href="https://maps.google.com/?q=Rocky+Mount+State+Historic+Site+Piney+Flats+TN"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col items-center justify-center border-2 border-primary/20 text-primary px-10 py-4 transition-all duration-300 hover:border-accent hover:bg-accent/5"
          >
            <span className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Get Directions
            </span>
            <span className="text-xs text-text-light mt-1">Open in Google Maps</span>
          </a>
        </div>

        {/* Bottom flourish */}
        <div className="flex items-center justify-center gap-3 mt-12" aria-hidden="true">
          <span className="text-accent/30 text-sm">❧</span>
          <span className="w-16 h-px bg-accent/20" />
          <span className="text-accent/30 text-sm">❧</span>
        </div>
      </div>
    </section>
  )
}
