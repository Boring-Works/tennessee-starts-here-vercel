# Site Hours Utility — Implementation Guide

## Overview

The `siteHours.ts` utility provides production-ready site scheduling for Rocky Mount without hardcoded dates. This guide covers integration, testing, and maintenance.

---

## Files Created

| File                                | Purpose                        |
| ----------------------------------- | ------------------------------ |
| `lib/siteHours.ts`                  | Core utility (public API)      |
| `lib/siteHours.examples.ts`         | Usage examples & test cases    |
| `docs/SITE-HOURS-DESIGN.md`         | Complete design documentation  |
| `docs/SITE-HOURS-QUICK-REF.md`      | Quick reference for developers |
| `docs/SITE-HOURS-JSON-SCHEMA.md`    | JSON configuration reference   |
| `docs/SITE-HOURS-IMPLEMENTATION.md` | This file                      |

---

## Getting Started

### 1. Import in Components

```typescript
import { getSiteStatus, getTourSchedule } from '@/lib/siteHours'
```

### 2. Display Site Status

```typescript
'use client'

import { getSiteStatus } from '@/lib/siteHours'

export function SiteStatusBanner() {
  const status = getSiteStatus()

  return (
    <div className={status.isOpen ? 'bg-green-50' : 'bg-red-50'}>
      <p className="font-bold">{status.isOpen ? '✓ OPEN' : '✗ CLOSED'}</p>
      <p className="text-sm">{status.message}</p>
      {status.nextOpen && (
        <p className="text-xs text-gray-600">
          Next open: {status.nextOpen.toLocaleDateString()}
        </p>
      )}
    </div>
  )
}
```

### 3. Show Tour Schedule

```typescript
import { getTourSchedule } from '@/lib/siteHours'

export function TourTimes() {
  const tours = getTourSchedule(new Date())

  return (
    <div>
      <h3>Today's Tours</h3>
      <ul className="space-y-2">
        {tours.map((tour) => (
          <li key={tour.hour} className="flex items-center gap-2">
            <span className="font-mono">{tour.time}</span>
            <button className="text-blue-600 hover:underline">
              Book Tour
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## Common Implementations

### Hours Display on /visit Page

```typescript
import { getSiteStatus, ROCKY_MOUNT_HOURS_CONFIG } from '@/lib/siteHours'

export function VisitHours() {
  const status = getSiteStatus()
  const config = ROCKY_MOUNT_HOURS_CONFIG

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Hours & Admission</h2>

      {/* Status banner */}
      <div className={`p-4 rounded mb-6 ${status.isOpen ? 'bg-green-50' : 'bg-amber-50'}`}>
        <p className="font-semibold mb-1">{status.isOpen ? '✓ We\'re Open' : '✗ We\'re Closed'}</p>
        <p>{status.message}</p>
      </div>

      {/* Regular hours */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Regular Hours</h3>
          <p className="text-gray-700">Wednesday - Saturday</p>
          <p className="text-gray-700">10:00 AM - 5:00 PM</p>
          <p className="text-sm text-gray-600 mt-2">Tours hourly, last tour 4:00 PM</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Season</h3>
          <p className="text-gray-700">March through mid-December</p>
          <p className="text-sm text-gray-600 mt-2">Closed Sunday, Monday, Tuesday</p>
        </div>
      </div>

      {/* Closed days */}
      <div className="bg-gray-50 p-4 rounded mb-6">
        <h3 className="font-semibold mb-2">Holiday Closures</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>Thanksgiving week</li>
          <li>Christmas week (Dec 24 - Jan 2)</li>
        </ul>
      </div>
    </section>
  )
}
```

### Hours in Header/Footer

```typescript
import { isOpenNow } from '@/lib/siteHours'

export function HeaderHours() {
  const open = isOpenNow()

  return (
    <div className="text-sm text-gray-600">
      <span className={open ? 'text-green-600' : 'text-red-600'}>
        {open ? '● Open Now' : '● Closed'}
      </span>
      <span className="mx-2">•</span>
      <span>Wed-Sat 10am-5pm</span>
    </div>
  )
}
```

### Status Check in API Routes

```typescript
// app/api/site-status/route.ts

import { getSiteStatus, getTourSchedule } from '@/lib/siteHours'

export async function GET() {
  const status = getSiteStatus()
  const tours = getTourSchedule(new Date())

  return Response.json({
    isOpen: status.isOpen,
    message: status.message,
    tours: tours.map((t) => t.time),
  })
}
```

### Event Validation (Data Checker)

```typescript
// scripts/validate-data.ts

import { isOpenOnDate } from '@/lib/siteHours'
import events from '@/data/events.json'

export function validateEventDates() {
  const warnings: string[] = []

  for (const event of events.events) {
    const date = new Date(event.date)

    if (!isOpenOnDate(date)) {
      warnings.push(`Event "${event.title}" scheduled on ${event.date} but site is closed that day`)
    }
  }

  return warnings
}
```

---

## Testing Checklist

### Manual Tests (Before Deployment)

#### Season Boundaries

```typescript
// Should work in any year

// Test: Season start (first Wed of March)
getSiteStatus(new Date(2026, 2, 3)) // Before season - closed
getSiteStatus(new Date(2026, 2, 4)) // Start of season - open

// Test: Season end (last Sat before Dec 20)
getSiteStatus(new Date(2026, 11, 19)) // Last day of season - open
getSiteStatus(new Date(2026, 11, 20)) // After season - closed

// Test: 2027 (verify it works next year)
getSiteStatus(new Date(2027, 2, 3)) // Before season 2027 - closed
getSiteStatus(new Date(2027, 2, 3)) // First Wed of March 2027 - open
```

#### Closures

```typescript
// Test: Thanksgiving (4th Thursday of November + 7 days)
getSiteStatus(new Date(2026, 10, 25)) // Day before - open
getSiteStatus(new Date(2026, 10, 26)) // Thanksgiving - closed
getSiteStatus(new Date(2026, 11, 3)) // Last day of closure - closed
getSiteStatus(new Date(2026, 11, 4)) // First day after - open

// Test: Christmas (Dec 24 - Jan 2, spans year boundary!)
getSiteStatus(new Date(2026, 11, 23)) // Day before - open
getSiteStatus(new Date(2026, 11, 24)) // Start of closure - closed
getSiteStatus(new Date(2027, 0, 1)) // New Year - still closed!
getSiteStatus(new Date(2027, 0, 2)) // Last day - closed
getSiteStatus(new Date(2027, 0, 3)) // First day after - open
```

#### Special Hours

```typescript
// Test: Haunting (~Oct 15, ±3 days, 6pm-9pm)
getSiteStatus(new Date(2026, 9, 12)) // Oct 12 - no special hours
getSiteStatus(new Date(2026, 9, 15)) // Oct 15 - special hours apply
getSiteStatus(new Date(2026, 9, 18)) // Oct 18 - special hours still apply
getSiteStatus(new Date(2026, 9, 19)) // Oct 19 - back to normal

// Test: Candlelight (~Dec 4, ±3 days, 4pm-8pm)
getSiteStatus(new Date(2026, 11, 1)) // Dec 1 - no special hours
getSiteStatus(new Date(2026, 11, 4)) // Dec 4 - special hours apply
getSiteStatus(new Date(2026, 11, 7)) // Dec 7 - special hours still apply
getSiteStatus(new Date(2026, 11, 8)) // Dec 8 - back to normal
```

#### Days of Week

```typescript
// Test: Wed-Sat open, Sun-Tue closed (regardless of season)
// Use March 2026 as example

const startOfWeek = new Date(2026, 2, 1) // Sunday
for (let i = 0; i < 7; i++) {
  const date = new Date(startOfWeek)
  date.setDate(startOfWeek.getDate() + i)
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
  const open = isOpenOnDate(date)
  console.log(`${day}: ${open ? '✓ open' : '✗ closed'}`)
}
// Expected:
// Sun: ✗ closed
// Mon: ✗ closed
// Tue: ✗ closed
// Wed: ✓ open
// Thu: ✓ open
// Fri: ✓ open
// Sat: ✓ open
```

#### Time Boundaries

```typescript
// Test: 10am-5pm window
const testDay = new Date(2026, 2, 4) // Wed March 4

const at9am = new Date(testDay)
at9am.setHours(9, 0, 0)

const at10am = new Date(testDay)
at10am.setHours(10, 0, 0)

const at430pm = new Date(testDay)
at430pm.setHours(16, 30, 0)

const at5pm = new Date(testDay)
at5pm.setHours(17, 0, 0)

console.log(`9:00 AM: ${isTimeOpen(at9am)}`) // false
console.log(`10:00 AM: ${isTimeOpen(at10am)}`) // true
console.log(`4:30 PM: ${isTimeOpen(at430pm)}`) // true
console.log(`5:00 PM: ${isTimeOpen(at5pm)}`) // false
```

---

## Maintenance

### Adding a Closure

1. Edit `lib/siteHours.ts`
2. Add to `ROCKY_MOUNT_HOURS_CONFIG.closures`:

```typescript
{
  type: 'custom',
  customDate: '2026-08-15',
  reason: 'Staff Appreciation Day',
}
```

3. Test:

```typescript
isClosure(new Date(2026, 7, 15)) // Should be { closed: true, reason: '...' }
```

### Adding a Special Event with Extended Hours

1. Edit `lib/siteHours.ts`
2. Add to `ROCKY_MOUNT_HOURS_CONFIG.specialEvents`:

```typescript
{
  eventTitle: 'Summer Solstice Celebration',
  type: 'other',
  datePattern: {
    month: 6,         // June
    approximateDay: 21,
  },
  hours: {
    open: 10,
    close: 21,        // 10am-9pm
  },
}
```

3. Test:

```typescript
getSpecialHours(new Date(2026, 5, 21)) // Should return special hours
getTourSchedule(new Date(2026, 5, 21)) // Should show tours until 9pm
```

### Changing Regular Hours

1. Edit `ROCKY_MOUNT_HOURS_CONFIG.regularHours`
2. No other changes needed—all functions respect the config
3. Test with `getTourSchedule()`

### Changing Season Dates

⚠️ **Rare.** Only if the site changes when it operates.

```typescript
seasonStart: {
  month: 3,
  weekOfMonth: 2,    // Change from 1st to 2nd Wed
  dayOfWeek: 3,
}
```

All dependent calculations will update automatically.

---

## Deployment Notes

### No Environment Variables Needed

The utility is deterministic and works without external config.

### No Database Queries

All calculations happen client-side or server-side synchronously.

### Caching Strategy

Hours don't change within a day. Cache `getSiteStatus()` for 1 hour:

```typescript
// app/api/site-status/route.ts

const CACHE_DURATION = 3600 // 1 hour

export async function GET() {
  // Cache in HTTP headers
  const status = getSiteStatus()

  return Response.json(status, {
    headers: {
      'Cache-Control': `public, max-age=${CACHE_DURATION}`,
    },
  })
}
```

### Works Offline

No API calls required. All logic is local calculation.

---

## Troubleshooting

### Hours Show Incorrectly

**Problem:** Component shows "Closed" when it should show "Open"

**Debug:**

```typescript
const test = new Date(2026, 2, 4, 14, 0) // Your test date
console.log('isSeasonOpen:', isSeasonOpen(test))
console.log('isDayOpen:', isDayOpen(test))
console.log('isClosure:', isClosure(test))
console.log('isTimeOpen:', isTimeOpen(test))
console.log('getSiteStatus:', getSiteStatus(test))
```

**Common issues:**

- Date is out of season (Jan-Feb or after mid-Dec)
- Date is Sun-Tue
- Date is a holiday (Thanksgiving, Christmas)
- Current time is before 10am or after 5pm

### Special Hours Don't Apply

**Problem:** Event hours don't show on expected date

**Debug:**

```typescript
const eventDate = new Date(2026, 9, 15)
const special = getSpecialHours(eventDate)
console.log('Special hours:', special)
console.log('Tours:', getTourSchedule(eventDate))
```

**Check:**

- Event month matches config
- Date is within ±3 days of approximate date
- Event is listed in `specialEvents` array

### Tours Show Wrong Times

**Problem:** Tour schedule incorrect for a date

**Debug:**

```typescript
const day = new Date(2026, 2, 4)
const status = getSiteStatus(day)
const tours = getTourSchedule(day)
console.log('Has special hours:', status.specialHours)
console.log('Tours:', tours)
```

**Expected:**

- Regular day: 10am-4pm (7 hourly tours)
- Special event day: Respects event hours

---

## Type Safety

The utility is fully typed. TypeScript will catch errors:

```typescript
// ✓ Good
const status: SiteStatus = getSiteStatus()

// ✗ Error: wrong type
const tours: SiteStatus[] = getTourSchedule() // Type error!

// ✓ Correct
const tours: Array<{ time: string; hour: number }> = getTourSchedule()
```

---

## Performance

All functions are O(1) except `getNextOpenDate()` which is O(n) where n ≤ 730 (2 years). Safe for:

- Client-side rendering
- Server-side rendering
- API routes
- Edge functions

No caching required for correctness, but recommended for efficiency.

---

## Future Enhancements

### Possible Extensions (Not Required for 2026)

1. **Multiple seasons** - If Rocky Mount ever closes mid-year
2. **Special closure ranges** - Handle arbitrary multi-day closures
3. **Staff schedules** - Track different hours by role
4. **Event-specific hours** - Each event defines its own hours
5. **Timezone support** - Handle visitors from different zones

These can be added without breaking the current API.

---

## Documentation Updates

Whenever you:

- Add a closure
- Add a special event
- Change regular hours

Update:

1. `docs/SITE-HOURS-DESIGN.md` (edge cases section)
2. `docs/SITE-HOURS-QUICK-REF.md` (if it affects common patterns)
3. Test in `lib/siteHours.examples.ts`

---

## Support

### Need to Check Hours?

→ Use `getSiteStatus()`

### Need Tour Times?

→ Use `getTourSchedule()`

### Need Custom Config?

→ Pass a modified `HoursConfig` to any function

### Need Year-Round Predictions?

→ All functions work with any date/year

---

_Last updated: January 2026_
