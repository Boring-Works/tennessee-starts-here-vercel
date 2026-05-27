'use client'

import Link from 'next/link'
import { memo } from 'react'

/**
 * AudienceRouter - Quick navigation cards for different visitor types
 *
 * Part of StoryBrand Layer 1: Customer Journey
 * Routes visitors quickly to their relevant pages
 */

interface AudienceCardProps {
  href: string
  icon: React.ReactNode
  title: string
  description: string
  cta: string
}

const AudienceCard = memo(function AudienceCard({
  href,
  icon,
  title,
  description,
  cta,
}: AudienceCardProps) {
  return (
    <Link
      href={href}
      className="group relative bg-white/5 border border-white/10 p-6 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.07] hover:-translate-y-1"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, var(--gold-shimmer), transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl text-accent/80 group-hover:text-accent transition-colors">
            {icon}
          </span>
          <h3 className="font-serif text-lg text-white group-hover:text-accent transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-sm text-white/60 mb-4 leading-relaxed">{description}</p>
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-accent/80 group-hover:text-accent transition-colors">
          {cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
})

// SVG Icons - memoized to avoid unnecessary re-renders
const EducatorsIcon = memo(function EducatorsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
      <path
        d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 13.18V17.18L12 21L19 17.18V13.18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})

const GroupsIcon = memo(function GroupsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
      <path
        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})

const StoryIcon = memo(function StoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
      <path
        d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2V2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})

const SupportIcon = memo(function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
      <path
        d="M20.84 4.61C20.3292 4.09924 19.7228 3.69403 19.0554 3.41752C18.388 3.14101 17.6726 2.99869 16.95 2.99869C16.2274 2.99869 15.512 3.14101 14.8446 3.41752C14.1772 3.69403 13.5708 4.09924 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99916 7.05 2.99916C5.59096 2.99916 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54916 7.04097 1.54916 8.5C1.54916 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.3508 11.8792 21.756 11.2728 22.0325 10.6054C22.309 9.93801 22.4513 9.22261 22.4513 8.5C22.4513 7.77739 22.309 7.062 22.0325 6.39462C21.756 5.72724 21.3508 5.12081 20.84 4.61Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})

export function AudienceRouter() {
  return (
    <section className="relative bg-primary py-16 md:py-20">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent/70 mb-3">
            Explore Your Way
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-white">
            Find What You&apos;re Looking For
          </h2>
        </div>

        {/* Audience cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AudienceCard
            href="/educators"
            icon={<EducatorsIcon />}
            title="Educators"
            description="Curriculum-aligned field trips with Tennessee history standards. Bring your class to where it happened."
            cta="Plan a Field Trip"
          />

          <AudienceCard
            href="/groups"
            icon={<GroupsIcon />}
            title="Groups"
            description="Group rates for 10+, private tours, and special event bookings. Churches, scouts, reunions welcome."
            cta="Book Your Group"
          />

          <AudienceCard
            href="/our-story"
            icon={<StoryIcon />}
            title="Our Story"
            description="The complete narrative: from 1770 settlement to territorial capital to Tennessee's founding."
            cta="Read the Full Story"
          />

          <AudienceCard
            href="/support"
            icon={<SupportIcon />}
            title="Support"
            description="Help preserve where Tennessee began. Your support keeps living history alive."
            cta="Ways to Give"
          />
        </div>
      </div>
    </section>
  )
}
