# SiteStatusBanner Component - Code Examples

This file contains practical code examples for using the SiteStatusBanner component in different scenarios.

## 1. Basic Header Integration

**Use Case:** Display site status at the top of every page

```tsx
// app/components/Header.tsx
'use client'

import { SiteStatusBanner } from '@/components/SiteStatusBanner'
import Link from 'next/link'

export function Header() {
  return (
    <header className="w-full">
      {/* Status Banner */}
      <SiteStatusBanner />

      {/* Navigation */}
      <nav className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            Rocky Mount
          </Link>
          <ul className="flex gap-6">
            <li>
              <Link href="/visit">Visit</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/evidence">Evidence</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
```

## 2. Conditional Display (Hide When Open)

**Use Case:** Show banner only when the site is closed to reduce visual clutter

```tsx
// app/home/page.tsx
import { SiteStatusBanner } from '@/components/SiteStatusBanner'
import HeroSection from '@/components/HeroSection'

export default function HomePage() {
  return (
    <main>
      {/* Only show when closed */}
      <SiteStatusBanner hideWhenOpen={true} />

      <HeroSection />
      {/* Rest of content */}
    </main>
  )
}
```

## 3. Custom Styling Integration

**Use Case:** Add custom styling and spacing around the banner

```tsx
// app/components/VisitHeader.tsx
import { SiteStatusBanner } from '@/components/SiteStatusBanner'

export function VisitHeader() {
  return (
    <div className="border-b border-accent">
      {/* Add custom wrapper with padding */}
      <SiteStatusBanner className="border-b border-accent/30" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold">Plan Your Visit</h1>
        <p className="text-gray-600 mt-2">Learn about hours, admission, tours, and more.</p>
      </div>
    </div>
  )
}
```

## 4. Testing Different Dates

**Use Case:** Create a QA/testing page to verify component handles all scenarios

```tsx
// app/test/status-scenarios/page.tsx
'use client'

import { SiteStatusBanner } from '@/components/SiteStatusBanner'

interface TestScenario {
  label: string
  date: Date
  description: string
}

const TEST_SCENARIOS: TestScenario[] = [
  {
    label: 'Open Now (Wed 2pm)',
    date: new Date('2026-03-04T14:00:00'),
    description: 'Should show "Open Now" with full tour schedule',
  },
  {
    label: 'Closed (Monday)',
    date: new Date('2026-03-02T10:00:00'),
    description: 'Should show "Open Wed-Sat only" message',
  },
  {
    label: 'Before Season',
    date: new Date('2026-01-15T10:00:00'),
    description: 'Should show season opening date',
  },
  {
    label: 'After Season',
    date: new Date('2026-12-31T10:00:00'),
    description: 'Should show next year season opening',
  },
  {
    label: 'Haunting Prep (Oct 15 at 2pm)',
    date: new Date('2026-10-15T14:00:00'),
    description: 'Should show Haunting prep message',
  },
  {
    label: 'Haunting Event (Oct 15 at 7pm)',
    date: new Date('2026-10-15T19:00:00'),
    description: 'Should show "Open 6pm-9pm for Haunting"',
  },
  {
    label: 'Candlelight Prep (Dec 4 at 2pm)',
    date: new Date('2026-12-04T14:00:00'),
    description: 'Should show Candlelight prep message',
  },
  {
    label: 'Thanksgiving (Nov 26)',
    date: new Date('2026-11-26T10:00:00'),
    description: 'Should show "Thanksgiving Holiday" closure',
  },
  {
    label: 'Closed (5:15pm)',
    date: new Date('2026-03-04T17:15:00'),
    description: 'Should show "Currently closed" with next open time',
  },
]

export default function StatusScenariosPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">SiteStatusBanner Test Scenarios</h1>
        <p className="text-gray-600 mb-8">
          This page displays the banner with different test dates to verify all scenarios work
          correctly.
        </p>

        <div className="space-y-8">
          {TEST_SCENARIOS.map((scenario) => (
            <div
              key={scenario.label}
              className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm"
            >
              {/* Test Info Header */}
              <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
                <h2 className="font-bold text-lg text-gray-900">{scenario.label}</h2>
                <p className="text-sm text-gray-600 mt-1">{scenario.date.toLocaleString()}</p>
                <p className="text-sm text-gray-700 italic mt-2">{scenario.description}</p>
              </div>

              {/* Component Test */}
              <div>
                <SiteStatusBanner testDate={scenario.date} />
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-lg text-blue-900 mb-3">Testing Notes</h3>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>All scenarios should display appropriate status messages</li>
            <li>Green badge indicates "Open Now", gray indicates "Closed"</li>
            <li>Tour schedules should show only when site is open</li>
            <li>Next open dates should appear when site is closed</li>
            <li>Special event messages should appear during prep and event windows</li>
            <li>Resize browser window to test responsive design</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
```

## 5. Analytics/Event Tracking

**Use Case:** Track when users see different status messages

```tsx
'use client'

import { useEffect } from 'react'
import { getSiteStatus } from '@/lib/siteHours'
import { SiteStatusBanner } from '@/components/SiteStatusBanner'

export function BannerWithAnalytics() {
  useEffect(() => {
    // Track status view for analytics
    const status = getSiteStatus()

    // Send to your analytics provider
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'site_status_viewed', {
        is_open: status.isOpen,
        reason: status.reason,
      })
    }
  }, [])

  return <SiteStatusBanner />
}
```

## 6. Email Template Usage

**Use Case:** Include site status in email communications

```typescript
// lib/email-templates/visit-confirmation.ts
import { getSiteStatus } from '@/lib/siteHours'

export function getVisitConfirmationTemplate(visitorDate: Date) {
  const status = getSiteStatus(visitorDate)

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>Visit Confirmation</h2>

      <div style="background: ${status.isOpen ? '#f0fdf4' : '#f3f4f6'}; padding: 16px; margin: 20px 0; border-radius: 8px;">
        <strong>Site Status:</strong> ${status.message}
        ${status.nextOpen ? `<br/>Next open: ${status.nextOpen.toLocaleDateString()}` : ''}
      </div>

      <p>Thank you for planning to visit Rocky Mount!</p>
    </div>
  `
}
```

## 7. Scheduled Status Updates

**Use Case:** Update banner status periodically (every 30 minutes)

```tsx
'use client'

import { useState, useEffect } from 'react'
import { SiteStatusBanner } from '@/components/SiteStatusBanner'

export function AutoRefreshingBanner() {
  const [, setRefreshKey] = useState(0)

  useEffect(() => {
    // Refresh banner every 30 minutes
    const interval = setInterval(
      () => {
        setRefreshKey((k) => k + 1)
      },
      30 * 60 * 1000
    ) // 30 minutes

    return () => clearInterval(interval)
  }, [])

  return <SiteStatusBanner key={`refresh-${Math.random()}`} />
}
```

## 8. Landing Page with Hero

**Use Case:** Status banner integrated with hero section

```tsx
// app/page.tsx
import { SiteStatusBanner } from '@/components/SiteStatusBanner'

export default function HomePage() {
  return (
    <main>
      {/* Status Banner */}
      <SiteStatusBanner />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[32rem] lg:h-[36rem] bg-gradient-to-b from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/rocky-mount.jpg')] bg-cover bg-center opacity-20" />

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Rocky Mount State Historic Site
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Experience Tennessee's Revolutionary heritage
            </p>
            <a
              href="/visit"
              className="inline-block bg-accent text-primary px-8 py-3 font-bold hover:bg-accent/90 transition-colors"
            >
              Plan Your Visit
            </a>
          </div>
        </div>
      </section>

      {/* Rest of homepage */}
    </main>
  )
}
```

## 9. Sidebar Status Widget

**Use Case:** Compact status display in sidebar

```tsx
// app/components/SidebarStatus.tsx
'use client'

import { getSiteStatus, getTourSchedule } from '@/lib/siteHours'
import { useMemo } from 'react'

export function SidebarStatus() {
  const { status, tours } = useMemo(() => {
    const s = getSiteStatus()
    const t = s.isOpen ? getTourSchedule() : []
    return { status: s, tours: t }
  }, [])

  return (
    <aside className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <h3 className="font-bold text-sm mb-3">Site Status</h3>

      <div
        className={`
        px-3 py-2 rounded-full text-xs font-semibold mb-3 inline-block
        ${status.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}
      `}
      >
        {status.isOpen ? '🟢 Open Now' : '⚫ Closed'}
      </div>

      <p className="text-sm text-slate-900 mb-3">{status.message}</p>

      {tours.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-700 mb-2">Tours:</p>
          <ul className="space-y-1">
            {tours.slice(0, 3).map((tour) => (
              <li key={tour.hour} className="text-xs text-slate-600">
                • {tour.time}
              </li>
            ))}
            {tours.length > 3 && (
              <li className="text-xs text-slate-600">+ {tours.length - 3} more</li>
            )}
          </ul>
        </div>
      )}

      {status.nextOpen && !status.isOpen && (
        <p className="text-xs text-slate-600 mt-3 border-t border-slate-200 pt-3">
          <strong>Next open:</strong>
          <br />
          {status.nextOpen.toLocaleDateString()}
        </p>
      )}
    </aside>
  )
}
```

## 10. Events Page Integration

**Use Case:** Show status on events listing page

```tsx
// app/events/page.tsx
import { SiteStatusBanner } from '@/components/SiteStatusBanner'
import { getEvents } from '@/lib/data'

export default function EventsPage() {
  const events = getEvents()

  return (
    <main>
      {/* Status Banner */}
      <SiteStatusBanner hideWhenOpen={false} />

      {/* Page Header */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Events</h1>
          <p className="text-white/70">Explore our calendar of special events and programs</p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Event card content */}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
```

---

## Component Props Reference

```typescript
interface SiteStatusBannerProps {
  /** Optional custom date for testing (defaults to current date) */
  testDate?: Date

  /** Whether to hide the banner when site is open (default: false) */
  hideWhenOpen?: boolean

  /** Optional CSS class name for wrapper */
  className?: string
}
```

## Usage Summary

| Scenario           | Code                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| **Basic**          | `<SiteStatusBanner />`                                                       |
| **Test date**      | `<SiteStatusBanner testDate={new Date('2026-10-15')} />`                     |
| **Hide when open** | `<SiteStatusBanner hideWhenOpen={true} />`                                   |
| **Custom class**   | `<SiteStatusBanner className="my-custom-class" />`                           |
| **All props**      | `<SiteStatusBanner testDate={date} hideWhenOpen={true} className="class" />` |

---

## Key Takeaways

- **Drop-in component** — Works anywhere with no configuration
- **Props-based testing** — Use `testDate` to test any scenario
- **Responsive** — Handles all device sizes automatically
- **Accessible** — WCAG AA compliant with proper ARIA
- **Zero dependencies** — Only needs React (already in project)
- **Performance** — Memoized and optimized for rendering

See `/SITESTATUS-BANNER-USAGE.md` for comprehensive documentation.
