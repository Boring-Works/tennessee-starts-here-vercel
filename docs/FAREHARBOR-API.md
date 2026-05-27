# FareHarbor API Documentation

> Comprehensive documentation for FareHarbor integration with Tennessee Starts Here

**Last Updated:** January 2026
**FareHarbor Shortname:** `rockymountmuseum`

---

## Quick Links

- [FareHarbor Integration Center](https://developer.fareharbor.com/api/external/v1/)
- [FareHarbor Help Center](https://help.fareharbor.com/)
- [Lightframe API Docs](https://help.fareharbor.com/website/integrations/lightframe/lightframe-api/)

---

## Table of Contents

1. [What We Can Do (No API Access)](#what-we-can-do-no-api-access)
2. [Best Practices & Standards](#best-practices--standards)
3. [Pushing Lightframe to the Limits](#pushing-lightframe-to-the-limits)
4. [API Overview](#api-overview)
5. [Authentication](#authentication)
6. [Endpoints Reference](#endpoints-reference)
7. [Data Models](#data-models)
8. [Photos & Images](#photos--images)
9. [Webhooks](#webhooks)
10. [Lightframe (Modal Booking)](#lightframe-modal-booking)
11. [Integration Patterns](#integration-patterns)
12. [Our Implementation](#our-implementation)

---

## What We Can Do (No API Access)

**We do NOT have External API access.** Here's everything we CAN do with just Lightframe (the public JavaScript API):

### Full Capabilities Without API

| Feature                       | Available | How                                    |
| ----------------------------- | --------- | -------------------------------------- |
| Embed booking modal           | ✅ Yes    | Lightframe script + `data-fh-open`     |
| Deep-link to specific event   | ✅ Yes    | `data-fh-item="562803"`                |
| Deep-link to specific date    | ✅ Yes    | `FH.open({ date: '2026-07-04' })`      |
| Show only certain items       | ✅ Yes    | `FH.open({ items: [562803, 562804] })` |
| Track booking clicks          | ✅ Yes    | Analytics on button click              |
| Track completed bookings      | ✅ Yes    | `onComplete` callback                  |
| Show item photos in modal     | ✅ Yes    | `fullItems: true`                      |
| Custom button styling         | ✅ Yes    | Style our own buttons                  |
| Programmatic open/close       | ✅ Yes    | `FH.open()` / `FH.close()`             |
| Mobile-optimized booking      | ✅ Yes    | Lightframe is responsive               |
| UTM parameter passthrough     | ✅ Yes    | Add to Lightframe URL                  |
| Display live pricing          | ❌ No     | Requires API access                    |
| Show "X spots left"           | ❌ No     | Requires API access                    |
| Pull event photos to our site | ❌ No     | Requires API access                    |
| Custom checkout flow          | ❌ No     | Requires API access                    |

### What This Means

We can create a **seamless booking experience** without API access:

1. User sees event on our site (with our photos, our copy)
2. User clicks "Reserve Your Spot"
3. We fire analytics (GA4 `begin_checkout`, FB `InitiateCheckout`)
4. Lightframe modal opens with FareHarbor's booking flow
5. User completes booking inside modal
6. We fire analytics (`onComplete` callback → `purchase` event)
7. Modal closes, user stays on our site

The only things we can't do:

- Show live availability/pricing before they click
- Pull photos from FareHarbor to display on our site
- Create custom checkout UI

---

## Best Practices & Standards

### Data Standards for `events.json`

Every ticketed event MUST have:

```typescript
{
  "id": "spring-break-camp-1",           // Unique slug
  "fareHarborId": "562803",              // FareHarbor item pk (string)
  "ticketUrl": "https://fareharbor.com/rockymountmuseum/items/562803/",
  "requiresTicket": true,
  "pricing": {
    "adult": 1200,                       // In CENTS ($12.00)
    "senior": 1000,                      // In CENTS ($10.00)
    "child": 800,                        // In CENTS ($8.00)
    "underFive": 0,                      // 0 = FREE
    "members": 0                         // 0 = FREE
  }
}
```

### Pricing Rules

| Rule                     | Example          | Notes                          |
| ------------------------ | ---------------- | ------------------------------ |
| Always in cents          | `1200` not `12`  | Prevents floating point issues |
| `null` = not applicable  | `"senior": null` | This tier doesn't exist        |
| `0` = free               | `"members": 0`   | Explicitly free                |
| Match FareHarbor exactly | —                | Verify against dashboard       |

### Finding FareHarbor Item IDs

1. Go to FareHarbor Dashboard → Items
2. Click on the item
3. Look at URL: `https://fareharbor.com/rockymountmuseum/dashboard/items/562803/`
4. The number (`562803`) is the `pk` / `fareHarborId`

Or from the public booking URL:

```
https://fareharbor.com/rockymountmuseum/items/562803/
                                              ^^^^^^
                                              This is the fareHarborId
```

### Keeping Data in Sync

Since we can't pull from API, we must manually sync:

| When                            | Action                                          |
| ------------------------------- | ----------------------------------------------- |
| New event created in FareHarbor | Add to `events.json` with `fareHarborId`        |
| Pricing changes in FareHarbor   | Update `pricing` in `events.json`               |
| Event cancelled/removed         | Set `requiresTicket: false` or remove from JSON |
| New season starts               | Audit all `fareHarborId` values                 |

**Quarterly Audit Checklist:**

- [ ] All `fareHarborId` values match FareHarbor dashboard
- [ ] All `pricing` values match FareHarbor dashboard
- [ ] No orphaned events (in JSON but not in FareHarbor)
- [ ] No missing events (in FareHarbor but not in JSON)

---

## Pushing Lightframe to the Limits

### 1. Smart Deep-Linking

Don't just open the general calendar—deep-link to exactly what the user wants:

```tsx
// GOOD: Opens directly to the specific event
<BookingButton itemId="562803">
  Reserve Spring Break Camp
</BookingButton>

// BAD: Opens general calendar, user has to find event
<BookingButton>
  Book Now
</BookingButton>
```

### 2. Date-Aware Deep-Linking

For date-specific events, pre-select the date:

```tsx
// For Colonial Independence Day on July 4
<BookingButton itemId="562810" date="2026-07-04">
  Reserve July 4th Tickets
</BookingButton>
```

Implementation in BookingButton:

```tsx
// components/booking/BookingButton.tsx
interface BookingButtonProps {
  itemId?: string
  date?: string // YYYY-MM-DD format
}

// In the component:
const handleClick = () => {
  if (typeof window !== 'undefined' && window.FH) {
    window.FH.open({
      shortname: 'rockymountmuseum',
      item: itemId ? parseInt(itemId) : undefined,
      date: date || undefined,
    })
  }
}
```

### 3. Filtered Item Views

For category pages, show only relevant items:

```tsx
// On /programs page - show only recurring programs
<button
  onClick={() => {
    window.FH.open({
      shortname: 'rockymountmuseum',
      items: [562803, 562804, 562805], // Only camp items
      view: 'items',
      fullItems: true,
    })
  }}
>
  View All Camp Programs
</button>
```

### 4. Complete Conversion Tracking

Track the FULL funnel, not just clicks:

```tsx
// components/booking/BookingButton.tsx
const handleClick = () => {
  // Track begin_checkout BEFORE opening modal
  trackBeginCheckout({
    id: eventData.id,
    title: eventData.title,
    fareHarborId: eventData.fareHarborId,
    pricing: eventData.pricing,
  })

  // Open with completion callback
  window.FH.open({
    shortname: 'rockymountmuseum',
    item: itemId ? parseInt(itemId) : undefined,
    onComplete: (booking) => {
      // Track actual purchase
      trackPurchase({
        transactionId: booking.uuid,
        value: booking.total / 100, // Convert cents to dollars
        currency: 'USD',
        items: [
          {
            item_id: eventData.fareHarborId,
            item_name: eventData.title,
            price: booking.total / 100,
          },
        ],
      })
    },
    onClose: () => {
      // Optional: track abandonment
      trackModalClose({
        item_id: eventData.fareHarborId,
        item_name: eventData.title,
      })
    },
  })
}
```

### 5. UTM Parameter Passthrough

Track which marketing campaigns drive bookings:

```tsx
// Capture UTM params from URL
const getUTMParams = () => {
  if (typeof window === 'undefined') return ''
  const params = new URLSearchParams(window.location.search)
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const captured = utmParams
    .filter((p) => params.has(p))
    .map((p) => `${p}=${params.get(p)}`)
    .join('&')
  return captured ? `?${captured}` : ''
}

// Pass to FareHarbor
window.FH.open({
  shortname: 'rockymountmuseum',
  item: 562803,
  // UTMs get passed through to FareHarbor's tracking
})
```

### 6. Mobile-First Sticky CTA

Already implemented in `MobileStickyCTA.tsx`:

```tsx
// Shows sticky booking button on mobile after scroll
<MobileStickyCTA
  show={showStickyCTA}
  eventTitle={event.title}
  itemId={event.fareHarborId}
  eventData={event}
/>
```

### 7. Urgency Indicators (Manual)

Since we can't pull live availability, add manual urgency:

```typescript
// In events.json
{
  "id": "candlelight-christmas",
  "urgency": "selling-fast",  // or "few-spots", "last-chance"
  // ...
}

// In UI
{event.urgency === 'selling-fast' && (
  <span className="text-red-600 text-sm font-medium">
    🔥 Selling Fast
  </span>
)}
```

### 8. Pre-Event Reminders

Capture intent even when not booking immediately:

```tsx
// "Remind Me" button for future events
<button
  onClick={() => {
    // Open email capture modal
    // Store: event ID, user email, event date
    // Send reminder email 1 week before
  }}
>
  Remind Me When Tickets Open
</button>
```

---

## Lightframe Advanced Configuration

### All Available Options

```typescript
interface FHOpenOptions {
  // Required
  shortname: string // 'rockymountmuseum'

  // Item selection
  item?: number // Single item pk
  items?: number[] // Multiple items (shows grid)

  // Date/time
  date?: string // 'YYYY-MM-DD' format
  time?: string // 'HH:MM' format (24hr)

  // Display
  view?: 'items' | 'calendar' | 'checkout'
  fullItems?: boolean // Show descriptions/photos in grid

  // Callbacks
  onOpen?: () => void
  onClose?: () => void
  onComplete?: (booking: FHBooking) => void

  // Styling (limited)
  flow?: number // Custom flow ID (if configured)
}
```

### Callback Data

The `onComplete` callback receives:

```typescript
interface FHBooking {
  uuid: string // Unique booking ID
  display_id: string // Human-readable ID (e.g., "RM-12345")
  total: number // Total in cents
  // Note: Full booking details require API access
}
```

---

## Conversion Tracking Standards

### Required Events

| Event            | When                  | Platform       |
| ---------------- | --------------------- | -------------- |
| `begin_checkout` | Button click          | GA4, FB Pixel  |
| `purchase`       | `onComplete` callback | GA4, FB Pixel  |
| `view_item`      | Event card impression | GA4 (optional) |

### GA4 Event Schema

```typescript
// begin_checkout
gtag('event', 'begin_checkout', {
  currency: 'USD',
  value: 18.0,
  items: [
    {
      item_id: '562803',
      item_name: 'Spring Break Camp Week 1',
      price: 180.0,
      quantity: 1,
    },
  ],
})

// purchase
gtag('event', 'purchase', {
  transaction_id: 'RM-12345',
  currency: 'USD',
  value: 180.0,
  items: [
    {
      item_id: '562803',
      item_name: 'Spring Break Camp Week 1',
      price: 180.0,
      quantity: 1,
    },
  ],
})
```

### Facebook Pixel Schema

```typescript
// InitiateCheckout
fbq('track', 'InitiateCheckout', {
  content_name: 'Spring Break Camp Week 1',
  content_ids: ['562803'],
  content_type: 'product',
  value: 180.0,
  currency: 'USD',
})

// Purchase
fbq('track', 'Purchase', {
  content_name: 'Spring Break Camp Week 1',
  content_ids: ['562803'],
  content_type: 'product',
  value: 180.0,
  currency: 'USD',
})
```

---

## API Overview

FareHarbor provides two API types:

| API Type           | Access                 | Purpose                                         |
| ------------------ | ---------------------- | ----------------------------------------------- |
| **External API**   | Partner/Affiliate only | Read items, check availability, create bookings |
| **Lightframe API** | Public (JavaScript)    | Embed booking modal on any website              |

### Base URL

```
https://fareharbor.com/api/external/v1/
```

### API Access

The External API requires partnership approval. To request access:

1. Email `support@fareharbor.com`
2. Explain your use case
3. FareHarbor will provide credentials if approved

**Current Status:** Rocky Mount uses FareHarbor for booking but does NOT have External API access. We use Lightframe for on-site bookings.

---

## Authentication

For External API (if approved):

```http
GET /companies/rockymountmuseum/items/
Host: fareharbor.com
X-FareHarbor-API-App: YOUR-APP-KEY
X-FareHarbor-API-User: YOUR-USER-KEY
```

**Headers Required:**

| Header                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `X-FareHarbor-API-App`  | Application identifier (from FareHarbor) |
| `X-FareHarbor-API-User` | User/API key (from FareHarbor)           |

---

## Endpoints Reference

### Companies

```http
GET /companies/
```

Returns list of companies you have affiliate access to.

### Items (Experiences/Events)

```http
GET /companies/{shortname}/items/
```

Returns all bookable items for a company.

**Example:**

```http
GET /companies/rockymountmuseum/items/
```

**Response:** Array of Item objects (see [Data Models](#data-models))

### Availabilities

```http
GET /companies/{shortname}/items/{item_pk}/availabilities/date/{YYYY-MM-DD}/
```

Returns available time slots for a specific item on a specific date.

**Example:**

```http
GET /companies/rockymountmuseum/items/562803/availabilities/date/2026-03-16/
```

### Bookings

```http
POST /companies/{shortname}/items/{item_pk}/availabilities/{availability_pk}/bookings/
```

Create a new booking. Requires customer information and payment details.

---

## Data Models

### Item Object

```typescript
interface FareHarborItem {
  pk: number // Unique item ID (e.g., 562803)
  name: string // Display name
  headline: string // Short description
  description: string // Full description (plain text)
  description_safe_html: string // Description with HTML formatting

  // Images
  image_cdn_url: string // Primary image URL
  images: FareHarborImage[] // Array of additional images

  // Location
  location: FareHarborLocation // Where the activity takes place

  // Pricing
  customer_prototypes: CustomerPrototype[] // Pricing tiers (adult, child, etc.)
  tax_percentage: string // Tax rate as string

  // Policies
  cancellation_policy: string // Plain text policy
  cancellation_policy_safe_html: string // Policy with HTML

  // Options
  is_pickup_ever_available: boolean
}
```

### Image Object

```typescript
interface FareHarborImage {
  pk: number // Image ID
  gallery: string // Gallery name
  image_cdn_url: string // Full-size image URL
  // Additional sizes may be available via URL manipulation
}
```

### Customer Prototype (Pricing Tier)

```typescript
interface CustomerPrototype {
  pk: number
  display_name: string // "Adult", "Child", "Senior", etc.
  total: number // Price in CENTS
  total_including_tax: number // Price with tax in CENTS
}
```

### Availability Object

```typescript
interface FareHarborAvailability {
  pk: number
  start_at: string // ISO 8601 datetime
  end_at: string // ISO 8601 datetime
  capacity: number // Total capacity
  minimum_party_size: number
  maximum_party_size: number
  customer_type_rates: CustomerTypeRate[]
}
```

---

## Photos & Images

### Can Photos Be Managed via API?

**NO.** The FareHarbor API is **read-only for images**.

| Operation         | Supported | Notes                              |
| ----------------- | --------- | ---------------------------------- |
| **Read** images   | Yes       | Via `image_cdn_url` and `images[]` |
| **Upload** images | No        | Must use FareHarbor Dashboard      |
| **Delete** images | No        | Must use FareHarbor Dashboard      |
| **Update** images | No        | Must use FareHarbor Dashboard      |

### How to Get Item Images

If you have API access:

```typescript
const response = await fetch(
  'https://fareharbor.com/api/external/v1/companies/rockymountmuseum/items/',
  {
    headers: {
      'X-FareHarbor-API-App': process.env.FAREHARBOR_APP_KEY,
      'X-FareHarbor-API-User': process.env.FAREHARBOR_USER_KEY,
    },
  }
)

const data = await response.json()

// Access images
data.items.forEach((item) => {
  console.log('Primary image:', item.image_cdn_url)
  console.log('All images:', item.images)
})
```

### Image URLs

FareHarbor serves images from their CDN:

```
https://cdn.fareharbor.com/xxx/...
```

Images are already optimized. No need to process them.

### Managing Photos

To add/update/remove photos:

1. Log into [FareHarbor Dashboard](https://fareharbor.com/rockymountmuseum/dashboard/)
2. Navigate to **Items** → Select item → **Photos**
3. Upload, reorder, or delete photos
4. Changes reflect immediately on Lightframe and API

---

## Webhooks

FareHarbor sends webhook notifications for booking events.

### Webhook Types

| Webhook             | Trigger                              |
| ------------------- | ------------------------------------ |
| **Booking Webhook** | New booking, update, or cancellation |
| **Item Webhook**    | Item created, updated, or deleted    |

### Booking Webhook Payload

```typescript
interface BookingWebhook {
  // Event metadata
  webhook_type: 'booking'
  event: 'created' | 'updated' | 'cancelled'

  // Booking details
  booking: {
    pk: number
    uuid: string
    display_id: string // Human-readable ID
    status: 'booked' | 'cancelled'

    // Contact info
    contact: {
      name: string
      email: string
      phone: string
    }

    // Item info
    item: {
      pk: number
      name: string
    }

    // Availability
    availability: {
      pk: number
      start_at: string
      end_at: string
    }

    // Customers
    customers: Array<{
      customer_type_rate: {
        customer_prototype: {
          display_name: string // "Adult", "Child", etc.
        }
        total: number // In cents
      }
    }>

    // Custom fields (if configured)
    custom_field_values: Array<{
      custom_field: {
        name: string
      }
      value: string
    }>
  }
}
```

### Webhook Security

Webhooks are signed using HMAC SHA-256. Verify like this:

```typescript
import crypto from 'crypto'

function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}
```

### Setting Up Webhooks

Webhooks are configured through FareHarbor Dashboard or by contacting FareHarbor support.

---

## Lightframe (Modal Booking)

Lightframe is FareHarbor's JavaScript booking modal. **This is what we use.**

### Basic Setup

Add the script to your page:

```html
<script src="https://fareharbor.com/embeds/script/calendar/rockymountmuseum/?fallback=simple"></script>
```

Add booking buttons:

```html
<button data-fh-open="rockymountmuseum">Book Now</button>

<!-- Or link to specific item -->
<button data-fh-open="rockymountmuseum" data-fh-item="562803">Book Spring Break Camp</button>
```

### Lightframe API Options

```javascript
FH.open({
  // Required
  shortname: 'rockymountmuseum',

  // Optional - specify item
  item: 562803,

  // Optional - specify date
  date: '2026-03-16',

  // Optional - limit to specific items
  items: [562803, 562804, 562805],

  // Optional - starting view
  view: 'items', // 'items' (grid), 'calendar', or 'checkout'

  // Optional - include description/images
  fullItems: true, // Show item details in grid view

  // Optional - callbacks
  onClose: () => {
    console.log('Modal closed')
  },
  onComplete: (booking) => {
    console.log('Booking completed:', booking)
    // Fire conversion tracking here
  },
})
```

### Programmatic Control

```javascript
// Open modal
FH.open({ shortname: 'rockymountmuseum' })

// Open to specific item
FH.open({ shortname: 'rockymountmuseum', item: 562803 })

// Open to date
FH.open({ shortname: 'rockymountmuseum', date: '2026-07-04' })

// Close modal (if open)
FH.close()
```

### URL Parameters

You can also control Lightframe via URL parameters:

```
https://fareharbor.com/embeds/book/rockymountmuseum/?full-items=yes
https://fareharbor.com/embeds/book/rockymountmuseum/items/562803/
https://fareharbor.com/embeds/book/rockymountmuseum/items/562803/?date=2026-03-16
```

---

## Integration Patterns

### Pattern 1: Lightframe Only (Current)

**Best for:** Most websites, no API approval needed

```tsx
// components/booking/BookingButton.tsx
'use client'

export function BookingButton({ itemId }: { itemId?: string }) {
  return (
    <button data-fh-open="rockymountmuseum" data-fh-item={itemId}>
      Reserve Your Spot
    </button>
  )
}
```

### Pattern 2: API + Lightframe (Future)

**Best for:** Custom UX with live pricing, requires API approval

```tsx
// Fetch live pricing from API
const items = await fetchFareHarborItems()

// Display with custom UI
{
  items.map((item) => (
    <EventCard
      key={item.pk}
      title={item.name}
      price={item.customer_prototypes[0].total}
      image={item.image_cdn_url}
      onBook={() => FH.open({ item: item.pk })}
    />
  ))
}
```

### Pattern 3: Full API Integration

**Best for:** Custom booking flow, requires extensive API approval

- Requires PCI compliance for payment handling
- Must implement full error handling
- Rarely approved for small organizations

---

## Our Implementation

### Current State

| Feature                   | Status         | Implementation                    |
| ------------------------- | -------------- | --------------------------------- |
| Booking buttons           | ✅ Implemented | `BookingButton` component         |
| Lightframe modal          | ✅ Implemented | FareHarbor script in layout       |
| Deep-link to items        | ✅ Implemented | `itemId` prop on BookingButton    |
| Event pricing display     | ✅ Implemented | Manual in `events.json` (cents)   |
| `begin_checkout` tracking | ✅ Implemented | GA4 + Facebook Pixel              |
| `purchase` tracking       | ⚠️ Partial     | Needs `onComplete` callback       |
| Mobile sticky CTA         | ✅ Implemented | `MobileStickyCTA` component       |
| Date deep-linking         | ❌ Not yet     | Add `date` prop to BookingButton  |
| Webhook listener          | ❌ Not yet     | Would enable server-side tracking |
| Live API pricing          | ❌ N/A         | Would require API approval        |

### Files

| File                                     | Purpose                                      |
| ---------------------------------------- | -------------------------------------------- |
| `components/booking/BookingButton.tsx`   | Lightframe-enabled button with analytics     |
| `components/booking/MobileStickyCTA.tsx` | Mobile sticky booking button                 |
| `components/booking/index.ts`            | Public exports                               |
| `lib/analytics.ts`                       | GA4 + FB Pixel tracking functions            |
| `data/events.json`                       | Event data with `fareHarborId` and `pricing` |
| `docs/FAREHARBOR-API.md`                 | This documentation                           |

### Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        OUR SITE                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  events.json ──→ Events Page ──→ User sees event card           │
│  (manual data)     renders        with pricing                  │
│                                                                 │
│                         │                                       │
│                         ▼                                       │
│                                                                 │
│              User clicks "Reserve Your Spot"                    │
│                         │                                       │
│                         ▼                                       │
│                                                                 │
│              BookingButton fires:                               │
│              • GA4 begin_checkout ✅                            │
│              • FB InitiateCheckout ✅                           │
│                         │                                       │
│                         ▼                                       │
│                                                                 │
│              FH.open() called                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FAREHARBOR LIGHTFRAME                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  • Modal overlays our site                                      │
│  • User selects date/time                                       │
│  • User enters payment                                          │
│  • User completes booking                                       │
│                         │                                       │
│                         ▼                                       │
│                                                                 │
│              onComplete callback fires ──→ Back to our code     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      OUR TRACKING                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  onComplete handler:                                            │
│  • GA4 purchase event ⚠️ (needs implementation)                 │
│  • FB Purchase event ⚠️ (needs implementation)                  │
│  • Modal closes                                                 │
│  • User stays on our site ✅                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### TODO: Complete Purchase Tracking

Currently we track `begin_checkout` but not `purchase`. To complete:

```tsx
// In BookingButton.tsx - add onComplete handler
window.FH.open({
  shortname: 'rockymountmuseum',
  item: itemId ? parseInt(itemId) : undefined,
  onComplete: (booking) => {
    // Add this function to lib/analytics.ts
    trackPurchase({
      transactionId: booking.uuid || booking.display_id,
      value: (booking.total || 0) / 100,
      currency: 'USD',
      items: [
        {
          item_id: eventData?.fareHarborId || '',
          item_name: eventData?.title || '',
          price: (booking.total || 0) / 100,
        },
      ],
    })
  },
})
```

### Maintenance Checklist

**Weekly:**

- [ ] Check FareHarbor dashboard for new events
- [ ] Verify upcoming events have correct `fareHarborId`

**Monthly:**

- [ ] Audit all pricing in `events.json` vs FareHarbor
- [ ] Check GA4 for tracking gaps
- [ ] Review FB Pixel conversion data

**Quarterly:**

- [ ] Full `events.json` audit against FareHarbor
- [ ] Remove past events from JSON
- [ ] Add upcoming season events
- [ ] Test booking flow end-to-end

**Annually:**

- [ ] Review FareHarbor contract
- [ ] Consider API access request if needed
- [ ] Update this documentation

### Future Improvements (No API Needed)

1. **Complete `onComplete` tracking** — Fire GA4/FB `purchase` events
2. **Date deep-linking** — Add `date` prop to BookingButton
3. **Filtered views** — Category pages show only relevant items
4. **Urgency indicators** — Manual "Selling Fast" badges
5. **Abandonment tracking** — Track when modal closes without purchase

### Future Improvements (Requires API)

1. **Live pricing** — Pull from API instead of manual JSON
2. **Availability count** — Show "X spots left"
3. **Event photos** — Pull images from FareHarbor
4. **Webhook listener** — Server-side purchase tracking

### Requesting API Access

If/when we want full API integration:

1. Email `support@fareharbor.com`
2. Subject: "External API Access Request - Rocky Mount State Historic Site"
3. Include:
   - FareHarbor shortname: `rockymountmuseum`
   - Use case: Display live pricing, show availability
   - Website: tennesseestartshere.com
   - Expected traffic: ~X monthly visitors

**Note:** API access is typically granted to:

- Resellers/affiliates (OTAs)
- Large tour operators
- Software partners

Historic sites may not qualify. Lightframe handles 95% of use cases.

---

## Troubleshooting

### Lightframe Not Opening

1. Check script is loaded (no CSP blocking)
2. Verify `data-fh-open` attribute is set
3. Check browser console for errors

### Wrong Item Opening

1. Verify `data-fh-item` matches FareHarbor item `pk`
2. Check item is published and has availability

### Conversion Tracking Not Firing

1. Verify GA4/FB Pixel IDs are set in env vars
2. Check browser console for tracking calls
3. Use GA4 DebugView to verify events

---

## References

- [FareHarbor Integration Center](https://developer.fareharbor.com/api/external/v1/)
- [GitHub: FareHarbor Docs](https://github.com/FareHarbor/fareharbor-docs)
- [Lightframe API](https://help.fareharbor.com/website/integrations/lightframe/lightframe-api/)
- [Rollout: FareHarbor API Guide](https://rollout.com/integration-guides/fare-harbor/api-essentials)
- [Postman: FareHarbor Collection](https://www.postman.com/gold-astronaut-949626/fareharbor-external-api/overview)
