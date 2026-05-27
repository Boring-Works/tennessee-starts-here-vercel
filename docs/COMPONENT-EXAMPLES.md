# Component Implementation Guide

Three new production-ready components have been created for Tennessee Starts Here. Each component is fully typed, accessible, and follows project patterns.

## Components

### 1. SiteStatusBanner

**File:** `/components/SiteStatusBanner.tsx`

Displays whether Rocky Mount is currently open or closed with contextual messaging.

#### Features

- Green badge + "Open until 5pm" when open
- Warm message about next opening when closed
- Tour departure info (hourly, last tour at 4pm)
- Mobile-responsive design
- Fully accessible with ARIA labels and semantic HTML
- Prevents hydration mismatch with client-side mount

#### Usage

```tsx
import { SiteStatusBanner } from '@/components/SiteStatusBanner'

export function HomePage() {
  return (
    <>
      <SiteStatusBanner />
      {/* Rest of page content */}
    </>
  )
}
```

#### Props

No props required. The component automatically:

- Uses `useHours()` hook to get current status
- Determines if site is open today
- Calculates next open day
- Shows formatted hours

#### Output Examples

**When Open:**

```
🟢 Open Now · Open today until 5:00 PM · Last tour at 4:00 PM
```

**When Closed:**

```
🔲 Closed Today · Opens next on Wednesday at 10:00 AM · Wed-Sat 10am-5pm
```

---

### 2. TestimonialCarousel

**File:** `/components/TestimonialCarousel.tsx`

Displays featured visitor testimonials with auto-rotation and manual navigation.

#### Features

- Auto-rotates testimonials (configurable interval, default 6 seconds)
- Manual navigation with arrow buttons
- Dot indicators for jumping to specific testimonial
- Star rating display (5-star system)
- Source badge (TripAdvisor, Google Reviews, Facebook)
- Keyboard navigation support (arrow keys, dots)
- Fully accessible with ARIA labels
- Pause auto-rotation on user interaction, resume after 6 seconds

#### Usage

```tsx
import { TestimonialCarousel } from '@/components/TestimonialCarousel'

export function TestimonialSection() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-serif mb-8">What Visitors Say</h2>
      <TestimonialCarousel autoRotateInterval={6000} showSource={true} showRating={true} />
    </div>
  )
}
```

#### Props

```typescript
interface TestimonialCarouselProps {
  /**
   * Number of milliseconds before auto-rotating to next testimonial
   * Set to null to disable auto-rotation
   * @default 6000 (6 seconds)
   */
  autoRotateInterval?: number | null

  /**
   * Show source badge (TripAdvisor, Google, Facebook)
   * @default true
   */
  showSource?: boolean

  /**
   * Show star rating
   * @default true
   */
  showRating?: boolean

  /**
   * Maximum number of testimonials to show
   * @default all featured testimonials
   */
  maxTestimonials?: number
}
```

#### Examples

```tsx
// Default: auto-rotate every 6 seconds with source and rating
<TestimonialCarousel />

// Manual navigation only (no auto-rotation)
<TestimonialCarousel autoRotateInterval={null} />

// Faster rotation
<TestimonialCarousel autoRotateInterval={4000} />

// Hide source badges
<TestimonialCarousel showSource={false} />

// Show only first 3 testimonials
<TestimonialCarousel maxTestimonials={3} />
```

#### Data Source

Uses verified testimonials from `/data/testimonials.json`:

- TripAdvisor reviews
- Google Reviews
- Facebook
- All quotes are real visitor feedback, never fabricated

---

### 3. QuickBookingCard

**File:** `/components/QuickBookingCard.tsx`

Displays the next available ticketed event with booking information and urgency messaging.

#### Features

- Shows next upcoming ticketed event from `/data/events.json`
- Displays event pricing (lowest price)
- "Book Now" CTA linked to FareHarbor
- Urgency messaging:
  - "This Weekend!" badge if event is Fri-Sun within 7 days
  - Can display availability status (future enhancement)
- Event category badge (Camp, Lecture, Signature Event, Experience)
- Responsive mobile-first design
- Fallback messaging when no events available
- Fully accessible with proper ARIA labels

#### Usage

```tsx
import { QuickBookingCard } from '@/components/QuickBookingCard'

export function HomePage() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">{/* Other content */}</div>
      <aside>
        <QuickBookingCard />
      </aside>
    </div>
  )
}
```

#### Props

```typescript
interface QuickBookingCardProps {
  /**
   * Show urgency messaging ("This Weekend!", "Only X spots left")
   * @default true
   */
  showUrgency?: boolean

  /**
   * Number of spots to consider as "low availability"
   * Used for future availability messaging
   * @default 10
   */
  lowAvailabilityThreshold?: number
}
```

#### Examples

```tsx
// Default: shows urgency badges, calculates next event
<QuickBookingCard />

// Without urgency messaging
<QuickBookingCard showUrgency={false} />

// With custom low availability threshold (for future use)
<QuickBookingCard lowAvailabilityThreshold={5} />
```

#### What It Does

1. **On Mount:** Finds first upcoming event with `requiresTicket: true`
2. **Displays:**
   - Event title and category
   - Event date (full day name: "Thursday, March 20, 2026")
   - Event time (if available)
   - Event description (truncated to 3 lines)
   - Lowest ticket price from event pricing data
   - "This Weekend!" badge if applicable
3. **Booking:**
   - "Book Now" button links to `event.ticketUrl` (FareHarbor)
   - Opens in new tab with `target="_blank"`
4. **Fallback:**
   - Shows "Check back soon" message if no upcoming events
   - Provides "View all events" link

#### Price Display

Automatically extracts lowest price from event pricing:

```json
{
  "pricing": {
    "adult": 1200,
    "senior": 1000,
    "child": 800,
    "underFive": 0,
    "members": 0
  }
}
```

Shows: `Starting at $8.00` (lowest non-zero price)
Shows: `Free` if all prices are 0

---

## Design System Integration

All components use:

### CSS Variables (from `app/globals.css`)

- `--primary` — Primary navy color
- `--accent` / `--gold-primary` — Brand gold
- `--gold-hover` — Hover state gold
- `--cream` — Cream background
- `--text-light` — Muted text
- `--shadow-md` through `--shadow-xl` — Elevation shadows

### Typography

- `font-serif` — Serif font family (Playfair Display, Cormorant, EB Garamond)
- `font-serif-elegant` — Italicized serif for quotes
- Font weights follow project standards

### Tailwind Classes

- Mobile-first responsive (sm:, md:, lg: breakpoints)
- No inline styles (pure Tailwind)
- Color tokens for consistency

---

## Accessibility Features

### SiteStatusBanner

- `aria-live="polite"` updates status
- Semantic `<div>` with role guidance
- Screen reader alerts for status changes
- Sufficient color contrast (WCAG AA)

### TestimonialCarousel

- `role="region"` with `aria-label`
- `aria-live="polite"` for testimonial changes
- `role="tablist"` for dot indicators
- `aria-selected` for current slide
- Keyboard navigation (all buttons keyboard accessible)
- Star ratings with `aria-label` for screen readers
- Screen reader counter ("Showing testimonial X of Y")

### QuickBookingCard

- `role="region"` with descriptive label
- Proper `<article>` semantic tag
- Link with `target="_blank"` includes `rel="noopener noreferrer"`
- Sufficient color contrast for all text
- Proper button semantics
- `aria-hidden="true"` for decorative elements

---

## TypeScript Interfaces

All components are fully typed:

### SiteStatusBanner

No props interface (no configurable props)

### TestimonialCarousel

```typescript
interface TestimonialCarouselProps {
  autoRotateInterval?: number | null
  showSource?: boolean
  showRating?: boolean
  maxTestimonials?: number
}
```

### QuickBookingCard

```typescript
interface QuickBookingCardProps {
  showUrgency?: boolean
  lowAvailabilityThreshold?: number
}
```

---

## Data Dependencies

### SiteStatusBanner

- Reads from: `useHours()` hook → `data/siteInfo.json`
- Updates automatically based on current time

### TestimonialCarousel

- Reads from: `/data/testimonials.json`
- Uses: `testimonials.featured` array
- All testimonials verified from real sources

### QuickBookingCard

- Reads from: `/data/events.json`
- Filters: Events with `requiresTicket: true` and date >= today
- Calculates: Lowest price, urgency (this weekend), next available

---

## Integration Examples

### Full Page Example

```tsx
import { SiteStatusBanner } from '@/components/SiteStatusBanner'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { QuickBookingCard } from '@/components/QuickBookingCard'

export function HomePage() {
  return (
    <>
      {/* Status at top of page */}
      <SiteStatusBanner />

      {/* Main content */}
      <main className="py-12">
        <section className="py-20 px-6">
          <h1 className="text-4xl font-serif font-bold">Visit Rocky Mount</h1>
          <p className="mt-4 text-lg text-slate-700">Stand where Tennessee's government began.</p>
        </section>

        {/* Two-column layout */}
        <section className="grid md:grid-cols-3 gap-8 px-6">
          <div className="md:col-span-2">{/* Page content */}</div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <QuickBookingCard />
          </aside>
        </section>

        {/* Testimonials section */}
        <section className="py-20 px-6 bg-cream">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif mb-12 text-center">What Visitors Say</h2>
            <TestimonialCarousel />
          </div>
        </section>
      </main>
    </>
  )
}
```

---

## Testing Checklist

- [ ] **SiteStatusBanner**
  - [ ] Displays "Open Now" when open (Wed-Sat)
  - [ ] Displays "Closed Today" when closed (Sun-Tue)
  - [ ] Shows correct next open day
  - [ ] Mobile responsive (stacks vertically on small screens)
  - [ ] Works in screen readers

- [ ] **TestimonialCarousel**
  - [ ] Auto-rotates every 6 seconds
  - [ ] Arrow buttons navigate
  - [ ] Dot indicators work
  - [ ] Pauses auto-rotation on user interaction
  - [ ] Resumes after 6 seconds of inactivity
  - [ ] Star ratings display correctly
  - [ ] Source badges link properly (target="\_blank")
  - [ ] Keyboard navigation works
  - [ ] Screen reader reads testimonial + star count

- [ ] **QuickBookingCard**
  - [ ] Shows next ticketed event
  - [ ] Displays correct price (lowest non-zero)
  - [ ] Shows "This Weekend!" badge on Fri-Sun within 7 days
  - [ ] "Book Now" links to correct FareHarbor URL
  - [ ] Shows fallback when no events available
  - [ ] Mobile responsive
  - [ ] Hover states work

---

## Production Notes

✓ All components build successfully (`npm run build`)
✓ No TypeScript errors
✓ No ESLint warnings
✓ Follows project patterns and standards
✓ Uses existing design tokens
✓ Integrates with existing data files
✓ Client-side components use `'use client'` directive
✓ Prevent hydration mismatches with useEffect mount checks

---

## Files Created

1. `/components/SiteStatusBanner.tsx` — 95 lines
2. `/components/TestimonialCarousel.tsx` — 280 lines
3. `/components/QuickBookingCard.tsx` — 260 lines

**Total:** ~635 lines of production-ready code

---

_Created: January 30, 2026_
