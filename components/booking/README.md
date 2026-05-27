# Booking Components

FareHarbor Lightframe integration for event booking with improved conversion.

## Overview

The booking system uses **FareHarbor Lightframe** (modal overlay) instead of external links to keep users on-site during the booking process. This improves conversion rates and provides a seamless experience.

## Key Components

### 1. BookingButton

Main booking button component that opens FareHarbor calendar in a modal.

**Location:** `components/booking/BookingButton.tsx`

**Features:**

- Opens FareHarbor Lightframe modal on click
- Falls back to direct link if JavaScript disabled (progressive enhancement)
- Supports both item-specific and general calendar booking
- Primary and secondary button variants
- Google Analytics tracking integration

**Usage:**

```tsx
import { BookingButton } from '@/components/booking'

// Open specific FareHarbor item
<BookingButton
  itemId="562803"
  fallbackUrl="https://fareharbor.com/rockymountmuseum/items/562803/"
>
  Reserve Your Spot
</BookingButton>

// Open general calendar
<BookingButton>
  Book Now
</BookingButton>

// Secondary variant
<BookingButton variant="secondary" itemId="562804">
  See Available Times
</BookingButton>
```

**Props:**

| Prop             | Type                         | Default               | Description                                |
| ---------------- | ---------------------------- | --------------------- | ------------------------------------------ |
| `shortname`      | string                       | `'rockymountmuseum'`  | FareHarbor company shortname               |
| `itemId`         | string \| null               | -                     | FareHarbor item ID for specific experience |
| `fallbackUrl`    | string                       | -                     | URL for no-JS fallback                     |
| `variant`        | `'primary'` \| `'secondary'` | `'primary'`           | Button style                               |
| `analyticsEvent` | string                       | -                     | GA event name                              |
| `children`       | ReactNode                    | `'Reserve Your Spot'` | Button text                                |
| `className`      | string                       | -                     | Additional CSS classes                     |

---

### 2. MobileStickyCTA

Sticky bottom booking button for mobile event detail pages.

**Location:** `components/booking/MobileStickyCTA.tsx`

**Features:**

- Appears after scrolling 300px down the page
- Smooth slide-up animation
- Mobile-only by default (hidden on desktop)
- Full-width responsive button
- Accessibility-friendly with proper aria-labels

**Usage:**

```tsx
import { MobileStickyCTA } from '@/components/booking'

<MobileStickyCTA
  itemId="562803"
  eventTitle="Spring Break Camp Week 1"
/>

// Show on all screen sizes
<MobileStickyCTA
  itemId="562804"
  eventTitle="Colonial Independence Day"
  mobileOnly={false}
/>

// Conditionally show
<MobileStickyCTA
  itemId="562805"
  eventTitle="Summer Workshop"
  show={event.requiresTicket}
/>
```

**Props:**

| Prop         | Type           | Default      | Description                   |
| ------------ | -------------- | ------------ | ----------------------------- |
| `itemId`     | string \| null | -            | FareHarbor item ID            |
| `eventTitle` | string         | **required** | Event title for aria-label    |
| `show`       | boolean        | `true`       | Show/hide the CTA             |
| `mobileOnly` | boolean        | `true`       | Only show on mobile viewports |

---

### 3. BookingLoadingSkeleton

Loading skeleton for booking modal (FareHarbor handles its own loading, but this is available if needed).

**Location:** `components/booking/BookingLoadingSkeleton.tsx`

---

## Events Page Integration

The events calendar page (`app/(main)/events/page.tsx`) uses a specialized BookingButton variant:

**Location:** `components/events/BookingButton.tsx`

This component:

- Accepts full event data for comprehensive analytics tracking
- Automatically detects FareHarbor URLs and uses Lightframe
- Falls back to standard links for non-FareHarbor URLs
- Tracks GA4 `begin_checkout` and Facebook Pixel `InitiateCheckout` events

**Usage in events page:**

```tsx
import { BookingButton } from '@/components/events/BookingButton'
import { getTicketUrl } from '@/lib/data'

;<BookingButton
  event={event}
  url={getTicketUrl(event) || `/events/${event.id}`}
  className={styles['calendar-event-cta-btn']}
>
  Reserve Your Spot <span aria-hidden="true">→</span>
</BookingButton>
```

---

## How It Works

### 1. FareHarbor Lightframe Script

The FareHarbor Lightframe script is loaded in the main layout:

**Location:** `app/(main)/layout.tsx`

```tsx
<Script
  src="https://fareharbor.com/embeds/script/calendar/rockymountmuseum/?fallback=simple"
  strategy="lazyOnload"
/>
```

**Key Details:**

- Uses Next.js `Script` component with `lazyOnload` strategy
- Loads only when the page becomes idle (optimal performance)
- Includes `fallback=simple` parameter for graceful degradation

---

### 2. FareHarbor Lightbox Attributes

The BookingButton components use FareHarbor's data attributes to trigger the modal:

```html
<button data-fh-open="rockymountmuseum" data-fh-item="562803">Reserve Your Spot</button>
```

**Attributes:**

| Attribute      | Purpose                                             |
| -------------- | --------------------------------------------------- |
| `data-fh-open` | FareHarbor shortname (company identifier)           |
| `data-fh-item` | Optional FareHarbor item ID for specific experience |

When clicked, FareHarbor's script intercepts the click and opens the booking calendar in a modal overlay.

---

### 3. Progressive Enhancement

The components are built with progressive enhancement:

**Without JavaScript (SSR):**

- Renders as standard `<a>` link to FareHarbor
- Opens in new tab (`target="_blank"`)
- Booking still works, just not in modal

**With JavaScript:**

- Hydrates to `<button>` with Lightbox attributes
- Opens modal overlay on click
- User stays on tennesseestartshere.com
- Better conversion, better UX

---

## Analytics Tracking

All booking clicks are tracked with:

**Google Analytics 4:**

```javascript
gtag('event', 'begin_checkout', {
  currency: 'USD',
  value: price,
  items: [
    {
      item_id: fareHarborId,
      item_name: eventTitle,
      price: price,
    },
  ],
})
```

**Facebook Pixel:**

```javascript
fbq('track', 'InitiateCheckout', {
  content_name: eventTitle,
  content_ids: [fareHarborId],
  content_type: 'product',
  value: price,
  currency: 'USD',
})
```

**Implementation:** `lib/analytics.ts` → `trackBeginCheckout()`

---

## Mobile Sticky CTA Behavior

The MobileStickyCTA component provides a persistent booking button on mobile:

**Trigger:**

- Hidden on page load
- Appears after scrolling 300px down
- Smooth slide-up animation (300ms)

**Design:**

- Fixed to bottom of viewport (`position: fixed`)
- Full-width button with padding for safe areas
- White background with subtle border and shadow
- Hidden on desktop (lg breakpoint) by default

**Accessibility:**

- `aria-hidden` when not visible
- Proper `aria-label` with event title
- Focus-visible outline styles

---

## Testing Checklist

Before deploying:

- [ ] FareHarbor Lightframe script loads correctly
- [ ] Booking buttons open modal overlay (not new tab)
- [ ] Modal shows correct event/calendar
- [ ] Analytics fires on button click
- [ ] Fallback works with JavaScript disabled
- [ ] Mobile sticky CTA appears on scroll
- [ ] Mobile sticky CTA hidden on desktop
- [ ] Button styles match design system
- [ ] Loading states are smooth
- [ ] No console errors

---

## Troubleshooting

### Modal doesn't open

**Check:**

1. FareHarbor script is loaded: Inspect Network tab for `calendar/rockymountmuseum`
2. Button has correct attributes: `data-fh-open` and optionally `data-fh-item`
3. Item ID is valid in FareHarbor dashboard
4. No JavaScript errors in console

### Button opens new tab instead of modal

**Check:**

1. Component is client-side rendered (`'use client'` directive)
2. JavaScript is enabled
3. FareHarbor script finished loading before button click
4. Component is using button element, not anchor tag (after hydration)

### Analytics not firing

**Check:**

1. GA4 and Facebook Pixel scripts are loaded
2. Event data is passed to `trackBeginCheckout()`
3. `window.gtag` and `window.fbq` are defined
4. Check GA4 DebugView / Facebook Events Manager

---

## Future Enhancements

Potential improvements:

1. **Event-Specific Landing Pages**
   - Create `/events/[id]` dynamic routes
   - Use MobileStickyCTA on individual event pages
   - Add booking button to event hero section

2. **Calendar Widget Integration**
   - Embed FareHarbor calendar directly on events page
   - Show availability inline without modal

3. **Multi-Event Booking**
   - Allow users to add multiple events to cart
   - Single checkout for multiple experiences

4. **Booking Confirmation Tracking**
   - Track completed purchases (requires FareHarbor webhook)
   - Send GA4 `purchase` event
   - Retargeting pixel for incomplete bookings

---

## Related Files

| File                                     | Purpose                            |
| ---------------------------------------- | ---------------------------------- |
| `components/booking/BookingButton.tsx`   | Generic booking button             |
| `components/booking/MobileStickyCTA.tsx` | Sticky mobile CTA                  |
| `components/events/BookingButton.tsx`    | Events page variant with analytics |
| `app/(main)/layout.tsx`                  | FareHarbor script injection        |
| `lib/analytics.ts`                       | Analytics tracking utilities       |
| `lib/data/ticketUrl.ts`                  | Smart ticket URL generation        |

---

**Last Updated:** January 30, 2026
