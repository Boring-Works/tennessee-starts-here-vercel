# Rocky Mount Site Hours Utility — Design Documentation

## Executive Summary

The `siteHours.ts` utility provides a pattern-based, year-agnostic scheduling system for Rocky Mount State Historic Site. Rather than hardcoding dates, the system uses calculated date patterns (e.g., "first Wednesday of March," "fourth Thursday of November") to determine seasons, closures, and special hours.

**Key Design Principle:** The site's schedule should work correctly in any future year without code updates.

---

## Requirements Breakdown

### Seasonal Operations

| Requirement   | Pattern                        | Implementation                          |
| ------------- | ------------------------------ | --------------------------------------- |
| Season Start  | First Wednesday of March       | `getNthWeekdayOfMonth(year, 2, 3, 1)`   |
| Season End    | Last Saturday before Dec 20    | `getLastSaturdayBefore(year, 11, 20)`   |
| Open Days     | Wednesday through Saturday     | `openDays: [3, 4, 5, 6]`                |
| Regular Hours | 10am - 5pm                     | `regularHours: { open: 10, close: 17 }` |
| Tour Times    | Hourly departures, last at 4pm | `getTourSchedule()` returns all hours   |

### Closures

| Holiday      | Pattern                  | Duration  | Handling                               |
| ------------ | ------------------------ | --------- | -------------------------------------- |
| Thanksgiving | 4th Thursday of November | Full week | `getThanksgivingDate()` + 7 day offset |
| Christmas    | Dec 24 - Jan 2           | 10 days   | Hardcoded range (spans years)          |

### Special Events with Extended Hours

| Event                 | Month             | Hours   | Pattern Match           |
| --------------------- | ----------------- | ------- | ----------------------- |
| Haunting on the Mount | October (~Oct 15) | 6pm-9pm | Approximate day ±3 days |
| Candlelight Christmas | December (~Dec 4) | 4pm-8pm | Approximate day ±3 days |

---

## JSON Configuration Schema

The `ROCKY_MOUNT_HOURS_CONFIG` in `lib/siteHours.ts` serves as both documentation and runtime configuration:

```typescript
interface HoursConfig {
  regularHours: {
    open: number // 10
    close: number // 17
  }
  openDays: number[] // [3, 4, 5, 6] = Wed-Sat
  seasonStart: {
    month: number // 3 = March
    weekOfMonth: number // 1 = first
    dayOfWeek: number // 3 = Wednesday
  }
  seasonEnd: {
    month: number // 12 = December
    day: number // 15 (used with last Saturday logic)
  }
  closures: Closure[]
  specialEvents: SpecialEvent[]
}

interface Closure {
  type: 'thanksgiving' | 'christmas' | 'custom'
  calculateDate?: (year: number) => Date
  customDate?: string // YYYY-MM-DD (rare)
  reason: string
  endOffsetDays?: number // 7 for Thanksgiving
}

interface SpecialEvent {
  eventTitle: string
  type: 'haunting' | 'candlelight' | 'other'
  datePattern: {
    month: number
    approximateDay?: number // ±3 day fuzzy match
    weekOfMonth?: number
    dayOfWeek?: number
  }
  hours: {
    open: number
    close: number
  }
}
```

### Example: 2026 Configuration

```json
{
  "regularHours": { "open": 10, "close": 17 },
  "openDays": [3, 4, 5, 6],
  "seasonStart": {
    "month": 3,
    "weekOfMonth": 1,
    "dayOfWeek": 3
  },
  "seasonEnd": {
    "month": 12,
    "day": 15
  },
  "closures": [
    {
      "type": "thanksgiving",
      "reason": "Thanksgiving Holiday",
      "endOffsetDays": 7
    },
    {
      "type": "christmas",
      "reason": "Christmas Holiday"
    }
  ],
  "specialEvents": [
    {
      "eventTitle": "Haunting on the Mount",
      "type": "haunting",
      "datePattern": {
        "month": 10,
        "approximateDay": 15
      },
      "hours": { "open": 18, "close": 21 }
    },
    {
      "eventTitle": "Candlelight Christmas",
      "type": "candlelight",
      "datePattern": {
        "month": 12,
        "approximateDay": 4
      },
      "hours": { "open": 16, "close": 20 }
    }
  ]
}
```

---

## Function Reference

### Core Query Functions

#### `isSeasonOpen(date, config?): boolean`

Checks if the date falls within the operating season.

**Logic:**

1. Calculate season start: First Wednesday of March
2. Calculate season end: Last Saturday before December 20
3. Return: `date >= seasonStart && date <= seasonEnd`

**Edge Case:** Correctly handles year boundaries (e.g., last day of December 2025 vs first day of January 2026).

```typescript
isSeasonOpen(new Date(2026, 9, 15)) // true (Oct 15, in season)
isSeasonOpen(new Date(2026, 0, 15)) // false (Jan 15, off-season)
```

---

#### `isDayOpen(date, config?): boolean`

Checks if the date is one of the site's open days (Wed-Sat).

```typescript
isDayOpen(new Date(2026, 2, 4)) // true (March 4, 2026 is a Wednesday)
isDayOpen(new Date(2026, 2, 2)) // false (March 2, 2026 is a Monday)
```

---

#### `isTimeOpen(date, config?): boolean`

Checks if the hour is within regular operating hours (10am-5pm).

**Note:** This function does NOT check if the day/season is open. Use in combination with other checks.

```typescript
const testTime = new Date(2026, 2, 4, 14, 0) // March 4, 2:00 PM
isTimeOpen(testTime) // true (2pm is within 10am-5pm)
```

---

#### `isClosure(date, config?): { closed: boolean; reason?: string; closureEnd?: Date }`

Checks if the date is a closure (Thanksgiving week, Christmas, etc.).

**Returns:**

- `{ closed: false }` if open
- `{ closed: true, reason: string, closureEnd: Date }` if closed

**Special Handling:**

- **Thanksgiving:** Calculated as 4th Thursday of November + 7 days
- **Christmas:** Hardcoded as Dec 24 - Jan 2 (spans year boundary)

```typescript
const thanksgiving = isClosure(new Date(2026, 10, 26)) // Nov 26, 2026
// { closed: true, reason: 'Thanksgiving Holiday', closureEnd: Date(2026-12-03) }

const christmas = isClosure(new Date(2026, 11, 25)) // Dec 25, 2026
// { closed: true, reason: 'Christmas Holiday', closureEnd: Date(2027-01-02) }
```

---

#### `getSpecialHours(date, config?): SpecialHours | null`

Returns special event hours if applicable, otherwise `null`.

**Matching Strategy:**

1. Check if event's month matches
2. For approximate days: fuzzy match within ±3 days
3. For specific week/day: exact match (e.g., "2nd Saturday")

```typescript
interface SpecialHours {
  opens: number // 18 (6pm)
  closes: number // 21 (9pm)
  reason: string
  eventTitle?: string // "Haunting on the Mount"
}

const haunting = getSpecialHours(new Date(2026, 9, 16)) // Oct 16, 2026
// { opens: 18, closes: 21, reason: '...', eventTitle: 'Haunting on the Mount' }
```

---

#### `getSiteStatus(date?, config?): SiteStatus`

Comprehensive status check. Returns what the user should see.

**Priority Order:**

1. Check closures (highest priority)
2. Check season
3. Check day of week
4. Check current time

**Returns:**

```typescript
interface SiteStatus {
  isOpen: boolean
  reason: string // "Closed", "Open", "After operating season"
  message: string // Human-readable message
  nextOpen?: Date // When the site opens next
  specialHours?: SpecialHours
}
```

**Example Output:**

```typescript
// Thanksgiving
getSiteStatus(new Date(2026, 10, 26))
// {
//   isOpen: false,
//   reason: 'Thanksgiving Holiday',
//   message: 'Thanksgiving Holiday (closed through Dec 3)',
//   nextOpen: Date(2026-12-04)
// }

// After season
getSiteStatus(new Date(2027, 0, 15))
// {
//   isOpen: false,
//   reason: 'After operating season',
//   message: 'Season ends mid-December. Next season opens Mar 03, 2027',
//   nextOpen: Date(2027-03-03)
// }

// Currently open
getSiteStatus(new Date(2026, 2, 4, 14, 0))
// {
//   isOpen: true,
//   reason: 'Open',
//   message: 'Open 10:00 AM-5:00 PM',
//   nextOpen: undefined,
//   specialHours: undefined
// }
```

---

#### `getTourSchedule(date, config?): { time: string; hour: number }[]`

Returns all hourly tour times for a given date.

```typescript
getTourSchedule(new Date(2026, 2, 4))
// [
//   { time: '10:00 AM', hour: 10 },
//   { time: '11:00 AM', hour: 11 },
//   { time: '12:00 PM', hour: 12 },
//   { time: '1:00 PM', hour: 13 },
//   { time: '2:00 PM', hour: 14 },
//   { time: '3:00 PM', hour: 15 },
//   { time: '4:00 PM', hour: 16 }  // Last tour
// ]
```

---

### Convenience Functions

#### `isOpenNow(config?): boolean`

Quick check for "is the site currently open?"

```typescript
if (isOpenNow()) {
  console.log('Welcome!')
}
```

---

#### `isOpenOnDate(date, config?): boolean`

Quick check for "is the site open on this date?" (ignores time of day).

```typescript
const isOpenMarch4 = isOpenOnDate(new Date(2026, 2, 4)) // true
const isOpenJan15 = isOpenOnDate(new Date(2026, 0, 15)) // false
```

---

### Date Calculation Patterns

#### `getNthWeekdayOfMonth(year, month, weekday, nth): Date`

Core utility for calculating recurring dates.

```typescript
// First Wednesday of March 2026
getNthWeekdayOfMonth(2026, 2, 3, 1) // Date(2026-03-04)

// Fourth Thursday of November 2026 (Thanksgiving)
getNthWeekdayOfMonth(2026, 10, 4, 4) // Date(2026-11-26)

// Second Saturday of June (example)
getNthWeekdayOfMonth(2026, 5, 6, 2) // Date(2026-06-13)
```

**Parameters:**

- `year`: Full year (e.g., 2026)
- `month`: 0-indexed (0=Jan, 11=Dec)
- `weekday`: 0=Sun, 1=Mon, ..., 6=Sat
- `nth`: 1=first, 2=second, etc.

---

#### `getLastSaturdayBefore(year, month, beforeDay): Date`

Finds the last Saturday before a given date in a month.

Used for season end: "last Saturday before December 20."

```typescript
getLastSaturdayBefore(2026, 11, 20) // Last Saturday before Dec 20
// Returns: Date(2026-12-19) if Dec 20 is a Sunday, etc.
```

---

#### `getThanksgivingDate(year): Date`

Convenience function: 4th Thursday of November.

```typescript
getThanksgivingDate(2026) // Date(2026-11-26)
getThanksgivingDate(2027) // Date(2027-11-25)
```

---

## Edge Cases Handled

### 1. Year Boundary Crossings

**Christmas Closure:**

```typescript
// Dec 24, 2026 → Jan 2, 2027
isClosure(new Date(2026, 11, 30)) // Closed
isClosure(new Date(2027, 0, 1)) // Also closed
isClosure(new Date(2027, 0, 3)) // Now open
```

**Season Boundary:**

```typescript
// March 4, 2026 (first Wed) is the first open date
isSeasonOpen(new Date(2026, 2, 3)) // false (March 3)
isSeasonOpen(new Date(2026, 2, 4)) // true (March 4)
```

---

### 2. Day-of-Week Edge Cases

**Thanksgiving Week:**

- If Thanksgiving falls on Nov 26, closure runs through Dec 3 (spanning Saturday)
- The week might include open days (Wed-Sat) that are still closed

```typescript
// Thanksgiving 2026 = Nov 26 (Thursday)
// Closure: Nov 26 - Dec 3
isClosure(new Date(2026, 10, 28)) // true (Saturday, Nov 28)
isClosure(new Date(2026, 11, 4)) // false (Friday, Dec 4 - first open day)
```

---

### 3. Special Event Fuzzy Matching

**Haunting on the Mount (~October 15):**

- Checks Oct 12, 13, 14, 15, 16, 17, 18 (±3 days)
- Allows events to "drift" from planned dates without code changes

```typescript
getSpecialHours(new Date(2026, 9, 12)) // null
getSpecialHours(new Date(2026, 9, 13)) // { opens: 18, ... }
getSpecialHours(new Date(2026, 9, 18)) // { opens: 18, ... }
getSpecialHours(new Date(2026, 9, 19)) // null
```

---

### 4. Before/After Season

**Before Season (Jan-Feb):**

```typescript
const jan = getSiteStatus(new Date(2026, 0, 15))
// {
//   isOpen: false,
//   reason: 'Before operating season',
//   message: 'Season opens Mar 04',
//   nextOpen: Date(2026-03-04 10:00)
// }
```

**After Season (Mid-Dec to end of year):**

```typescript
const dec = getSiteStatus(new Date(2026, 11, 25))
// {
//   isOpen: false,
//   reason: 'After operating season',
//   message: 'Season ends mid-December. Next season opens Mar 03, 2027',
//   nextOpen: Date(2027-03-03 10:00)
// }
```

---

### 5. Monday/Tuesday Closures

Even during season, the site is closed Mon-Tue.

```typescript
isOpenOnDate(new Date(2026, 2, 2)) // false (Monday)
isOpenOnDate(new Date(2026, 2, 3)) // false (Tuesday)
isOpenOnDate(new Date(2026, 2, 4)) // true (Wednesday)
```

---

## Integration Guide

### In React Components

```typescript
import { getSiteStatus, getTourSchedule } from '@/lib/siteHours'

export function SiteHoursComponent() {
  const status = getSiteStatus()
  const today = new Date()
  const tours = getTourSchedule(today)

  return (
    <div>
      <h2>Hours</h2>
      <p>{status.message}</p>
      {status.isOpen && (
        <div>
          <h3>Available Tours</h3>
          <ul>
            {tours.map((tour) => (
              <li key={tour.hour}>{tour.time}</li>
            ))}
          </ul>
        </div>
      )}
      {status.nextOpen && (
        <p>Next open: {status.nextOpen.toLocaleDateString()}</p>
      )}
    </div>
  )
}
```

---

### In Data Validation

```typescript
import { isOpenOnDate } from '@/lib/siteHours'

// Validate that an event is scheduled on an open day
function validateEventDate(eventDate: Date) {
  if (!isOpenOnDate(eventDate)) {
    console.warn(`Event scheduled on ${eventDate} but site is closed`)
  }
}
```

---

### Custom Configuration

```typescript
import { getSiteStatus, HoursConfig } from '@/lib/siteHours'

// Use custom config (e.g., different year, different hours)
const customConfig: HoursConfig = {
  ...ROCKY_MOUNT_HOURS_CONFIG,
  regularHours: { open: 9, close: 18 }, // Extend hours
}

const status = getSiteStatus(new Date(), customConfig)
```

---

## Future-Proofing

### Adding New Closures

To add a custom closure (e.g., staff day):

```typescript
const config: HoursConfig = {
  ...ROCKY_MOUNT_HOURS_CONFIG,
  closures: [
    ...ROCKY_MOUNT_HOURS_CONFIG.closures,
    {
      type: 'custom',
      customDate: '2026-08-15', // Staff appreciation day
      reason: 'Staff Appreciation Day',
    },
  ],
}
```

### Adding New Special Events

```typescript
const config: HoursConfig = {
  ...ROCKY_MOUNT_HOURS_CONFIG,
  specialEvents: [
    ...ROCKY_MOUNT_HOURS_CONFIG.specialEvents,
    {
      eventTitle: 'Summer Solstice Celebration',
      type: 'other',
      datePattern: {
        month: 6, // June
        approximateDay: 21, // ~June 21
      },
      hours: {
        open: 10,
        close: 20, // Extended to 8pm
      },
    },
  ],
}
```

---

## Testing Checklist

When adding new features, verify:

- [ ] Season start (first Wed of March) is correct
- [ ] Season end (last Sat before Dec 20) is correct
- [ ] Thanksgiving closure spans exactly 7 days
- [ ] Christmas closure Dec 24 - Jan 2 works across year boundary
- [ ] Special event hours apply on correct dates (±3 days)
- [ ] Mon-Tue closures work during season
- [ ] `nextOpen` calculation returns valid open days
- [ ] Tour schedule respects special hours
- [ ] Works correctly in 2027, 2028 (not just 2026)

---

## Performance Notes

- All calculations are deterministic and fast (O(1) for most operations)
- Date comparisons use standard `Date` object methods
- No regex, no external libraries required
- Safe for server-side rendering and client-side use
- Suitable for caching (e.g., cache status for 1 hour)

---

## Related Files

- `lib/siteHours.ts` — Main utility
- `data/siteInfo.json` — Current hours display text
- `data/events.json` — Event calendar (cross-check with closures)
- `docs/DATA-STANDARDS.md` — Validation rules for event dates
- `CONTRIBUTING.md` — Code standards

---

_Last updated: January 2026_
