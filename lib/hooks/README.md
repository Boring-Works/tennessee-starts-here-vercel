# Rocky Mount Site Hooks

React hooks for accessing dynamic site data from `siteInfo.json`.

## Installation

```tsx
import { useContact, useHours, useAdmission, useTours, useSiteInfo } from '@/lib/hooks'
```

## Hooks

### `useSiteInfo()`

Master hook that returns the entire typed `siteInfo.json` object.

```tsx
function MyComponent() {
  const site = useSiteInfo()

  return (
    <div>
      <h1>{site.site.name}</h1>
      <p>{site.site.tagline}</p>
    </div>
  )
}
```

### `useContact()`

Contact information with formatted helpers.

```tsx
function ContactSection() {
  const contact = useContact()

  return (
    <div>
      <a href={contact.phoneHref}>{contact.phoneFormatted}</a>
      <a href={contact.emailHref}>{contact.email}</a>
      <p>{contact.address.full}</p>
      <a href={contact.social.facebook.url}>{contact.social.facebook.handle}</a>
      <a href={contact.coordinates.mapsUrl}>Get Directions</a>
    </div>
  )
}
```

**Returns:**

- `phone` - Raw phone number
- `phoneFormatted` - Display format: (423) 538-7396
- `phoneHref` - tel: link: tel:+14235387396
- `email` - Email address
- `emailHref` - mailto: link
- `address.full` - Complete formatted address string
- `social.{platform}.url` - Full social media URLs
- `coordinates.mapsUrl` - Google Maps link

### `useHours()`

Operating hours with "is open today" logic.

```tsx
function HoursDisplay() {
  const hours = useHours()

  return (
    <div>
      {hours.isOpenToday() ? (
        <p>Open today: {hours.getTodayHours()}</p>
      ) : (
        <p>Closed today. Next open: {hours.getNextOpenDay()}</p>
      )}
      <p>{hours.formatted.short}</p>
    </div>
  )
}
```

**Methods:**

- `isOpenToday()` - Returns true if site is open today
- `getTodayHours()` - Returns today's hours string
- `getNextOpenDay()` - Returns name of next open day
- `getHoursForDay(day)` - Get hours for specific day
- `isOpenOnDay(day)` - Check if open on specific day

### `useAdmission()`

Admission pricing with calculations.

```tsx
function PricingCalculator() {
  const admission = useAdmission()

  const total = admission.calculateGroupTotal({
    adults: 2,
    seniors: 1,
    children: 3,
    childrenFree: 1,
  })

  const isGroup = admission.isGroupRate(7)

  return (
    <div>
      <p>Total: {admission.formatPrice(total)}</p>
      {isGroup && <p>{admission.groups.note}</p>}
      <ul>
        {admission.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
```

**Methods:**

- `calculateGroupTotal(counts)` - Calculate total for group
- `getPrice(tier)` - Get price for single tier
- `formatPrice(amount)` - Format as currency ($12)
- `isGroupRate(total)` - Check if group rate applies (10+)

### `useTours()`

Tour schedule with "next tour" logic.

```tsx
function TourSchedule() {
  const tours = useTours()
  const nextTour = tours.getNextTourTime()
  const remaining = tours.getToursRemaining()
  const minutes = tours.getMinutesUntilNextTour()

  return (
    <div>
      {tours.areToursRunning() ? (
        <div>
          <p>Next tour: {nextTour?.formatted}</p>
          <p>{remaining} tours remaining today</p>
          <p>Next tour in {minutes} minutes</p>
        </div>
      ) : (
        <p>Tours finished for today</p>
      )}
    </div>
  )
}
```

**Methods:**

- `getNextTourTime()` - Get next tour time object or null
- `getTodayTours()` - Get all tour times for today
- `getToursRemaining()` - Count of tours left today
- `areToursRunning()` - True if between first and last tour
- `getMinutesUntilNextTour()` - Minutes until next tour or null

## TypeScript Support

All hooks return fully typed interfaces. Import types separately:

```tsx
import { useContact } from '@/lib/hooks'
import type { Contact } from '@/lib/hooks'

function MyComponent() {
  const contact: Contact = useContact()
  // Full autocomplete and type safety
}
```

## Server-Side Rendering

All hooks are SSR-safe. They read from static JSON at build time and include no client-side dependencies.

## Data Source

All hooks read from `/data/siteInfo.json` as the single source of truth.
