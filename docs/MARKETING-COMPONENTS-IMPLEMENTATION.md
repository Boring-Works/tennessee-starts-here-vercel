# Marketing Components - Implementation Guide

Ready-to-use code templates and patterns for building the 5 marketing components.

---

## Template 1: SiteStatusBadge

### Server Component (No Client State)

```typescript
// components/marketing/SiteStatusBadge.tsx

import { getSiteStatus } from '@/lib/siteHours'

interface SiteStatusBadgeProps {
  mode?: 'compact' | 'standard' | 'detailed'
  emphasis?: 'urgent' | 'normal'
  checkDate?: Date
}

export function SiteStatusBadge({
  mode = 'standard',
  emphasis = 'normal',
  checkDate,
}: SiteStatusBadgeProps) {
  const status = getSiteStatus(checkDate)

  // Determine styling based on open/closed state
  const isOpenStyles = status.isOpen
    ? 'text-green-600 border-green-200 bg-green-50'
    : 'text-burgundy border-burgundy/20 bg-burgundy/5'

  const urgentStyles = emphasis === 'urgent' && status.isOpen
    ? 'ring-2 ring-accent shadow-lg'
    : ''

  if (mode === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${isOpenStyles} ${urgentStyles}`}>
        <span className="text-lg">
          {status.isOpen ? '🟢' : '🔴'}
        </span>
        <span className="text-sm font-medium">
          {status.isOpen ? 'Open now' : 'Closed'}
        </span>
      </div>
    )
  }

  if (mode === 'standard') {
    return (
      <div className={`p-4 rounded-lg border ${isOpenStyles}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{status.isOpen ? '🟢' : '🔴'}</span>
          <h3 className="font-semibold text-lg">
            {status.isOpen ? 'Open Now' : 'Currently Closed'}
          </h3>
        </div>
        <p className="text-sm">{status.message}</p>
        {!status.isOpen && status.nextOpen && (
          <p className="text-xs mt-2 opacity-70">
            Next open: {status.nextOpen.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>
    )
  }

  // Detailed mode - marketing message
  if (mode === 'detailed') {
    const messageTitle = status.isOpen
      ? 'Open Right Now!'
      : status.reason === 'Preparing for event'
      ? `Preparing for Tonight`
      : 'Closed'

    return (
      <div className={`p-6 md:p-8 rounded-lg border-2 ${status.isOpen ? 'border-green-300 bg-green-50' : 'border-burgundy/30 bg-white'}`}>
        <div className="flex items-start gap-4">
          <span className="text-4xl">{status.isOpen ? '🟢' : '🔴'}</span>
          <div className="flex-1">
            <h2 className="text-2xl font-serif font-bold mb-2">
              {messageTitle}
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              {status.message}
            </p>

            {status.specialHours?.eventTitle && (
              <div className="bg-white/50 border border-accent/30 rounded p-3 mb-4">
                <p className="text-sm">
                  <strong>{status.specialHours.eventTitle}</strong>
                  {' '}tonight from{' '}
                  {status.specialHours.opens}:00 to {status.specialHours.closes}:00
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button className="px-6 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors">
                {status.isOpen ? 'Plan Your Visit' : 'Learn About Hours'}
              </button>
              {!status.isOpen && (
                <button className="px-6 py-2 border border-secondary/30 hover:bg-secondary/5 rounded-lg font-medium transition-colors">
                  Set a Reminder
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
```

### Usage Examples

```typescript
// In header/nav
<SiteStatusBadge mode="compact" />

// On homepage hero
<SiteStatusBadge mode="detailed" emphasis="urgent" />

// On visit planning page
<SiteStatusBadge mode="standard" />

// Test specific date (for previewing)
<SiteStatusBadge
  mode="detailed"
  checkDate={new Date('2026-03-04')} // Season opening
/>
```

---

## Template 2: TestimonialCard

### Server Component

```typescript
// components/marketing/TestimonialCard.tsx

interface Testimonial {
  id: string
  quote: string
  attribution: string
  source: 'TripAdvisor' | 'Google Reviews' | 'Facebook'
  sourceUrl?: string
  rating: number
  tags?: string[]
}

interface TestimonialCardProps {
  testimonial: Testimonial
  mode?: 'featured' | 'quote' | 'social_proof'
  variant?: 'light' | 'dark'
  showReviewCTA?: boolean
}

export function TestimonialCard({
  testimonial,
  mode = 'featured',
  variant = 'light',
  showReviewCTA = false,
}: TestimonialCardProps) {
  const bgClasses = variant === 'dark'
    ? 'bg-slate-900 text-white'
    : 'bg-white text-primary'

  const borderClasses = variant === 'dark'
    ? 'border-white/10'
    : 'border-secondary/20'

  const sourceIcon = {
    'Google Reviews': '🔵',
    'TripAdvisor': '🟦',
    'Facebook': '📘',
  }[testimonial.source] || '⭐'

  // Social proof mode - compact stat display
  if (mode === 'social_proof') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded border ${borderClasses}`}>
        <span className="text-xs font-semibold">
          {testimonial.source}:
        </span>
        <div className="flex items-center gap-1">
          {'⭐'.repeat(Math.floor(testimonial.rating))}
          {testimonial.rating % 1 !== 0 && '✨'}
        </div>
        {showReviewCTA && (
          <a
            href={testimonial.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-xs text-accent hover:underline"
          >
            Read more →
          </a>
        )}
      </div>
    )
  }

  // Quote mode - just the quote and attribution
  if (mode === 'quote') {
    return (
      <div className={`p-6 rounded-lg border ${bgClasses} ${borderClasses}`}>
        <div className="flex items-start gap-2 mb-4">
          {'⭐'.repeat(Math.floor(testimonial.rating))}
        </div>

        <blockquote className={`italic leading-relaxed mb-4 ${variant === 'dark' ? 'text-white/90' : 'text-primary/80'}`}>
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <footer>
          <cite className="not-italic font-medium text-sm">
            {testimonial.attribution}
          </cite>
          <span className={`block text-xs ${variant === 'dark' ? 'text-white/50' : 'text-text-light'} mt-1`}>
            {sourceIcon} {testimonial.source}
          </span>
        </footer>
      </div>
    )
  }

  // Featured mode - full card with CTA
  return (
    <div className={`p-6 md:p-8 rounded-lg border-2 border-accent/30 ${bgClasses} shadow-lg`}>
      {/* Star rating */}
      <div className="mb-6 text-lg">
        {'⭐'.repeat(Math.floor(testimonial.rating))}
        {testimonial.rating % 1 !== 0 && '✨'}
      </div>

      {/* Quote */}
      <blockquote className={`text-lg md:text-xl leading-relaxed mb-6 font-serif italic ${variant === 'dark' ? 'text-white/90' : 'text-primary/80'}`}>
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <footer className="mb-6 pb-6 border-b border-secondary/20">
        <cite className={`not-italic font-serif font-semibold block ${variant === 'dark' ? 'text-white' : 'text-primary'}`}>
          {testimonial.attribution}
        </cite>
        <span className={`text-sm ${variant === 'dark' ? 'text-white/50' : 'text-text-light'} flex items-center gap-2 mt-2`}>
          {sourceIcon} {testimonial.source}
        </span>
      </footer>

      {/* CTA */}
      {showReviewCTA && testimonial.sourceUrl && (
        <a
          href={testimonial.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
            variant === 'dark'
              ? 'text-accent hover:text-accent/80'
              : 'text-accent hover:text-accent/80'
          }`}
        >
          Read more reviews on {testimonial.source}
          <span>→</span>
        </a>
      )}
    </div>
  )
}
```

### Usage with Data

```typescript
// components/marketing/TestimonialCarousel.tsx

import testimonials from '@/data/testimonials.json'
import { TestimonialCard } from './TestimonialCard'

export function TestimonialCarousel() {
  return (
    <section className="py-16">
      <h2 className="font-serif text-3xl mb-12 text-center">
        Why visitors return again and again
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.featured.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            mode="featured"
            showReviewCTA={true}
          />
        ))}
      </div>
    </section>
  )
}
```

---

## Template 3: NextEventCard

### Server Component with Countdown Utility

```typescript
// lib/utils/eventUtils.ts

export function daysUntilEvent(eventDate: string): number {
  const event = new Date(eventDate + 'T12:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffTime = event.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getEventCountdownText(eventDate: string): string {
  const days = daysUntilEvent(eventDate)

  if (days < 0) return 'Event passed'
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  if (days < 7)
    return `This ${new Date(eventDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' })}`
  if (days < 14) return `Next week (${days} days away)`
  return `In ${days} days`
}
```

```typescript
// components/marketing/NextEventCard.tsx

import events from '@/data/events.json'
import { getTicketUrl } from '@/lib/data'
import { daysUntilEvent, getEventCountdownText } from '@/lib/utils/eventUtils'

interface NextEventCardProps {
  mode?: 'compact' | 'standard' | 'featured'
  showCountdown?: boolean
  showCapacity?: boolean
  showBooking?: boolean
}

export function NextEventCard({
  mode = 'standard',
  showCountdown = true,
  showCapacity = true,
  showBooking = true,
}: NextEventCardProps) {
  // Get next event (featured events first)
  const upcomingEvent = events.events
    .filter((e) => {
      const eventDate = new Date(e.date)
      const today = new Date()
      return eventDate > today
    })
    .sort((a, b) => (a.featured ? -1 : 0))
    .at(0)

  if (!upcomingEvent) {
    return (
      <div className="p-6 text-center rounded-lg bg-secondary/5 border border-secondary/20">
        <p className="text-secondary">Check back soon for spring events</p>
      </div>
    )
  }

  const days = daysUntilEvent(upcomingEvent.date)
  const countdownText = getEventCountdownText(upcomingEvent.date)
  const ticketUrl = showBooking ? getTicketUrl(upcomingEvent) : null

  if (mode === 'compact') {
    return (
      <div className="p-4 rounded-lg border border-accent/30 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-accent font-bold mb-1">
              {countdownText}
            </p>
            <h3 className="font-serif text-lg font-bold">
              {upcomingEvent.title}
            </h3>
            <p className="text-sm text-text-light mt-2">
              {new Date(upcomingEvent.date + 'T12:00:00').toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                weekday: 'short',
              })}
            </p>
          </div>
          {ticketUrl && (
            <a
              href={ticketUrl}
              className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors text-sm font-medium whitespace-nowrap"
            >
              Book Now
            </a>
          )}
        </div>
      </div>
    )
  }

  if (mode === 'standard') {
    return (
      <div className="p-6 rounded-lg border-2 border-accent/30 bg-white">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider text-accent font-bold">
            {countdownText}
          </p>
          <h3 className="font-serif text-2xl font-bold mt-2">
            {upcomingEvent.title}
          </h3>
        </div>

        <p className="text-text-light mb-4 leading-relaxed">
          {upcomingEvent.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {ticketUrl && (
            <a
              href={ticketUrl}
              className="px-6 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors font-medium"
            >
              Book Now
            </a>
          )}
          <a
            href={`/events#${upcomingEvent.id}`}
            className="px-6 py-2 border border-secondary/30 rounded hover:bg-secondary/5 transition-colors font-medium"
          >
            Learn More
          </a>
        </div>
      </div>
    )
  }

  // Featured mode with countdown timer
  return (
    <div className="relative p-8 md:p-12 rounded-lg border-2 border-accent/40 bg-gradient-to-br from-white to-accent/5 shadow-xl">
      {/* Countdown badge */}
      {showCountdown && (
        <div className="absolute top-4 right-4 px-4 py-2 bg-accent text-white rounded-lg text-center">
          <p className="text-2xl font-bold">{days}</p>
          <p className="text-xs uppercase tracking-wider">
            {days === 1 ? 'Day' : 'Days'}
          </p>
        </div>
      )}

      {/* Content */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
          ★ {upcomingEvent.category}
        </p>

        <h3 className="font-serif text-3xl md:text-4xl font-bold mb-2">
          {upcomingEvent.title}
        </h3>

        <p className="text-lg text-secondary font-medium mb-6">
          {new Date(upcomingEvent.date + 'T12:00:00').toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
          {upcomingEvent.time && ` at ${upcomingEvent.time}`}
        </p>

        <p className="text-lg leading-relaxed text-text-light mb-8">
          {upcomingEvent.description}
        </p>

        {/* Capacity indicator */}
        {showCapacity && upcomingEvent.capacity && (
          <div className="mb-8 p-4 bg-burgundy/5 border border-burgundy/20 rounded">
            <p className="text-sm font-medium text-burgundy">
              Only {upcomingEvent.capacity} spots available
            </p>
          </div>
        )}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {ticketUrl && (
          <a
            href={ticketUrl}
            className="px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-bold text-center"
          >
            Reserve Your Spot
          </a>
        )}
        <a
          href={`/events#${upcomingEvent.id}`}
          className="px-8 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors font-bold text-center"
        >
          Learn More
        </a>
      </div>
    </div>
  )
}
```

---

## Template 4: ReviewCTA

### Client Component (For Easy Link Clicks)

```typescript
// components/marketing/ReviewCTA.tsx

'use client'

import { useEffect, useState } from 'react'
import integrations from '@/data/integrations.json'

interface ReviewCTAProps {
  context?: 'postVisit' | 'postEvent' | 'footer' | 'email'
  eventName?: string
  platforms?: 'all' | 'featured' | 'footer'
  style?: 'card' | 'inline' | 'badge'
  showDelay?: boolean
  showDelayMs?: number
}

const REVIEW_URLS = {
  google: integrations.integrations.reviews.platforms.google.reviewUrl,
  tripadvisor: integrations.integrations.reviews.platforms.tripadvisor.url,
  facebook: integrations.integrations.reviews.platforms.facebook.reviewUrl,
}

const PLATFORM_ICONS = {
  google: '🔵',
  tripadvisor: '🟦',
  facebook: '📘',
}

const PLATFORM_NAMES = {
  google: 'Google Reviews',
  tripadvisor: 'TripAdvisor',
  facebook: 'Facebook',
}

export function ReviewCTA({
  context = 'postVisit',
  eventName,
  platforms = 'all',
  style = 'card',
  showDelay = false,
  showDelayMs = 3000,
}: ReviewCTAProps) {
  const [isVisible, setIsVisible] = useState(!showDelay)

  useEffect(() => {
    if (!showDelay) return

    const timer = setTimeout(() => setIsVisible(true), showDelayMs)
    return () => clearTimeout(timer)
  }, [showDelay, showDelayMs])

  if (!isVisible) return null

  const getPlatformList = (): ('google' | 'tripadvisor' | 'facebook')[] => {
    if (platforms === 'featured') return ['google', 'tripadvisor']
    if (platforms === 'footer') return ['google', 'tripadvisor', 'facebook']
    return ['google', 'tripadvisor', 'facebook']
  }

  const platformList = getPlatformList()

  const getHeading = (): string => {
    if (context === 'postEvent') {
      return `Thank you for attending ${eventName || 'the event'}!`
    }
    if (context === 'postVisit') {
      return 'How was your visit?'
    }
    if (context === 'footer') {
      return 'Help others discover Rocky Mount'
    }
    return 'Share your experience'
  }

  const getDescription = (): string => {
    if (context === 'postEvent') {
      return 'Your experience helps us improve and helps other history lovers discover Rocky Mount.'
    }
    if (context === 'postVisit') {
      return 'Your genuine review helps other visitors discover what you found here.'
    }
    if (context === 'footer') {
      return 'Real reviews from real visitors'
    }
    return 'Leave a review to help others'
  }

  // Badge style - compact inline
  if (style === 'badge') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 py-4">
        {platformList.map((platform) => (
          <a
            key={platform}
            href={REVIEW_URLS[platform]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-1 border border-secondary/20 rounded-full hover:bg-secondary/5 transition-colors"
          >
            {PLATFORM_ICONS[platform]} {PLATFORM_NAMES[platform]}
          </a>
        ))}
      </div>
    )
  }

  // Inline style - horizontal buttons
  if (style === 'inline') {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-center mb-4">
          {getHeading()}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {platformList.map((platform) => (
            <a
              key={platform}
              href={REVIEW_URLS[platform]}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-accent/30 rounded hover:bg-accent/10 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              {PLATFORM_ICONS[platform]}
              {PLATFORM_NAMES[platform]}
            </a>
          ))}
        </div>
      </div>
    )
  }

  // Card style - full featured card
  return (
    <div className="p-6 md:p-8 rounded-lg border-2 border-accent/30 bg-gradient-to-br from-white to-accent/5">
      <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">
        {getHeading()}
      </h3>
      <p className="text-text-light mb-6">
        {getDescription()}
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        {platformList.map((platform) => (
          <a
            key={platform}
            href={REVIEW_URLS[platform]}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white border border-secondary/20 rounded-lg hover:border-accent/30 hover:shadow-lg transition-all text-center"
          >
            <div className="text-3xl mb-2">{PLATFORM_ICONS[platform]}</div>
            <p className="font-semibold text-sm">{PLATFORM_NAMES[platform]}</p>
            <p className="text-xs text-text-light mt-2">Leave a review</p>
          </a>
        ))}
      </div>

      <p className="text-xs text-text-light text-center mt-6 pt-6 border-t border-secondary/10">
        Your authentic review helps us improve and helps others discover Rocky Mount.
      </p>
    </div>
  )
}
```

---

## Template 5: VisitorJourneyProgress

### Server Component

```typescript
// components/marketing/VisitorJourneyProgress.tsx

import experiences from '@/data/experiences.json'

interface VisitorJourneyProgressProps {
  highlightCategories?: ('immersion' | 'interpretation' | 'hands-on' | 'education')[]
  style?: 'timeline' | 'cards' | 'checklist' | 'carousel'
  tourType?: 'museum' | 'historic-site' | 'twilight' | null
  showIncludes?: boolean
  showHighlights?: boolean
}

export function VisitorJourneyProgress({
  highlightCategories,
  style = 'timeline',
  tourType = null,
  showIncludes = true,
  showHighlights = true,
}: VisitorJourneyProgressProps) {
  const moments = experiences.experienceMoments
  const includes = experiences.visitIncludes
  const highlights = experiences.highlights

  // Timeline style
  if (style === 'timeline') {
    return (
      <section className="py-12">
        <h2 className="font-serif text-3xl text-center mb-12">
          Your visit unfolds in four moments
        </h2>

        <div className="max-w-3xl mx-auto">
          {moments.map((moment, idx) => {
            const isHighlighted = !highlightCategories || highlightCategories.includes(moment.category as any)

            return (
              <div key={moment.numeral} className={`mb-8 opacity-${isHighlighted ? '100' : '50'}`}>
                <div className="flex gap-6">
                  {/* Roman numeral */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="font-serif text-lg font-bold text-accent">
                        {moment.numeral}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="font-serif text-xl font-bold mb-2">
                      {moment.title}
                    </h3>
                    <p className="text-text-light leading-relaxed">
                      {moment.description}
                    </p>
                  </div>
                </div>

                {/* Connector */}
                {idx < moments.length - 1 && (
                  <div className="ml-6 mt-8 h-8 border-l-2 border-secondary/20" />
                )}
              </div>
            )
          })}
        </div>

        {/* Included in Visit */}
        {showIncludes && (
          <div className="mt-16 pt-12 border-t-2 border-secondary/10">
            <h3 className="font-serif text-2xl font-bold mb-8 text-center">
              Included in every visit
            </h3>

            <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6">
              {includes.map((item) => (
                <div key={item.title} className="text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-text-light">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {showHighlights && (
          <div className="mt-12 pt-12 border-t border-secondary/10">
            <h3 className="font-serif text-xl font-bold mb-6">You'll experience</h3>
            <ul className="max-w-3xl mx-auto space-y-3">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-text-light">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    )
  }

  // Cards style
  if (style === 'cards') {
    return (
      <section className="py-12">
        <h2 className="font-serif text-3xl text-center mb-12">
          What you'll experience
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {moments.map((moment) => (
            <div
              key={moment.numeral}
              className="p-6 rounded-lg border-2 border-accent/20 hover:border-accent/40 transition-colors"
            >
              <div className="text-4xl mb-4">{moment.icon}</div>
              <h3 className="font-serif text-lg font-bold mb-2">
                {moment.title}
              </h3>
              <p className="text-sm text-text-light leading-relaxed">
                {moment.description}
              </p>
            </div>
          ))}
        </div>

        {showIncludes && (
          <div className="p-8 rounded-lg border-2 border-secondary/20 bg-secondary/5">
            <h3 className="font-bold text-lg mb-6">Every visit includes</h3>
            <ul className="space-y-3">
              {includes.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="text-accent mt-0.5">✓</span>
                  <span className="font-medium">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    )
  }

  // Checklist style (booking page)
  if (style === 'checklist') {
    return (
      <div className="p-6 rounded-lg border-2 border-green-200 bg-green-50">
        <h3 className="font-serif font-bold text-lg mb-4">
          Included in your visit
        </h3>

        <ul className="space-y-3">
          {experiences.visitIncludes.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="text-green-600 text-xl font-bold">✓</span>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-text-light">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <button className="mt-6 w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-bold">
          Complete Your Booking
        </button>
      </div>
    )
  }

  // Default (fallback)
  return null
}
```

---

## Installation Checklist

Before using these components:

- [ ] All data files exist and valid
- [ ] `lib/siteHours.ts` exports `getSiteStatus()`
- [ ] `lib/data/` has `getTicketUrl()` function
- [ ] Design tokens defined in `app/globals.css`
- [ ] Tailwind configured for custom colors
- [ ] All imports use absolute paths (`@/`)
- [ ] No hardcoded copy—all from `lib/copy/`

---

## Component Composition Examples

### Homepage Hero Section

```typescript
// app/(main)/home/page.tsx

import { SiteStatusBadge } from '@/components/marketing/SiteStatusBadge'
import { NextEventCard } from '@/components/marketing/NextEventCard'
import { TestimonialCard } from '@/components/marketing/TestimonialCard'
import testimonials from '@/data/testimonials.json'

export default function HomePage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero status */}
        <SiteStatusBadge mode="detailed" emphasis="urgent" />

        {/* Next event */}
        <div className="mt-12">
          <NextEventCard mode="featured" />
        </div>

        {/* Social proof */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold mb-8 text-center">
            Trusted by history lovers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.featured.slice(0, 3).map((t) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                mode="featured"
                showReviewCTA
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Visit Planning Page

```typescript
// app/(main)/visit/page.tsx

import { SiteStatusBadge } from '@/components/marketing/SiteStatusBadge'
import { VisitorJourneyProgress } from '@/components/marketing/VisitorJourneyProgress'
import { ReviewCTA } from '@/components/marketing/ReviewCTA'

export default function VisitPage() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Current status */}
        <SiteStatusBadge mode="standard" />

        {/* Journey */}
        <div className="mt-16">
          <VisitorJourneyProgress
            style="timeline"
            showIncludes
            showHighlights
          />
        </div>

        {/* Review CTA */}
        <div className="mt-16">
          <ReviewCTA context="postVisit" style="inline" />
        </div>
      </div>
    </section>
  )
}
```

---

## Testing Checklist

Before shipping:

```typescript
// Test all component modes
<SiteStatusBadge mode="compact" />
<SiteStatusBadge mode="standard" />
<SiteStatusBadge mode="detailed" />

<TestimonialCard mode="featured" />
<TestimonialCard mode="quote" />
<TestimonialCard mode="social_proof" />

<NextEventCard mode="compact" />
<NextEventCard mode="standard" />
<NextEventCard mode="featured" />

<ReviewCTA style="card" />
<ReviewCTA style="inline" />
<ReviewCTA style="badge" />

<VisitorJourneyProgress style="timeline" />
<VisitorJourneyProgress style="cards" />
<VisitorJourneyProgress style="checklist" />
<VisitorJourneyProgress style="carousel" />
```
