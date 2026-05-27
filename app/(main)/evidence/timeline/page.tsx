import type { Metadata } from 'next'
import { Timeline } from '@/components/evidence/Timeline'
import { EvidenceNav } from '@/components/evidence/EvidenceNav'

export const metadata: Metadata = {
  title: 'Timeline | Evidence Room | Tennessee Starts Here',
  description:
    'Interactive chronological timeline of key events from 1790-1796, covering the Southwest Territory period and Tennessee statehood.',
  openGraph: {
    title: 'Timeline | Evidence Room',
    description:
      'Explore the chronological journey from territory to statehood through documented events.',
    url: 'https://tennesseestartshere.com/evidence/timeline',
  },
}

export default function TimelinePage() {
  return (
    <div className="min-h-screen">
      <EvidenceNav isPageTop />
      {/* Header Section */}
      <header
        className="relative overflow-hidden text-center"
        style={{
          background:
            'repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px), linear-gradient(180deg, #2a1f1a 0%, #3d2e24 60%, #4a3728 100%)',
          paddingTop: '140px',
          paddingBottom: '4rem',
        }}
      >
        {/* Bottom brass edge */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '6px',
            background: 'linear-gradient(180deg, #4a3728 0%, #654321 50%, var(--gold-hover) 100%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        />

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          {/* Badge */}
          <p
            className="inline-flex items-center gap-4 px-6 py-2 mb-6 text-xs uppercase tracking-[0.15em] rounded-sm"
            style={{
              color: 'var(--gold-primary)',
              background:
                'linear-gradient(180deg, rgba(201,162,39,0.12) 0%, rgba(184,134,11,0.08) 100%)',
              border: '1px solid rgba(201,162,39,0.3)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.2)',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              fontFamily: 'var(--font-serif)',
            }}
          >
            CHRON.1790-1796
          </p>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-normal mb-4"
            style={{
              color: '#fffef8',
              fontFamily: 'var(--font-serif)',
              letterSpacing: '0.02em',
              textShadow: '0 2px 4px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            Territory Chronology
          </h1>

          {/* Subtitle */}
          <p
            className="text-base md:text-lg max-w-lg mx-auto mb-6 italic"
            style={{
              color: '#f5f0e6',
              fontFamily: 'var(--font-serif-elegant)',
              opacity: 0.9,
              lineHeight: 1.85,
            }}
          >
            From the creation of the Southwest Territory to Tennessee statehood
          </p>

          {/* Date Range */}
          <p
            className="pt-4 text-xs uppercase tracking-[0.15em]"
            style={{
              color: 'var(--gold-primary)',
              borderTop: '1px solid rgba(201,162,39,0.25)',
              fontFamily: 'var(--font-serif)',
              opacity: 0.8,
              display: 'inline-block',
            }}
          >
            May 1790 — June 1796
          </p>
        </div>
      </header>

      {/* Timeline Component */}
      <Timeline />
    </div>
  )
}
