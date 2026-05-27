# Site Hours Utility — Quick Reference

## Import

```typescript
import {
  isSeasonOpen,
  isDayOpen,
  isTimeOpen,
  isClosure,
  getSpecialHours,
  getSiteStatus,
  getTourSchedule,
  isOpenNow,
  isOpenOnDate,
  ROCKY_MOUNT_HOURS_CONFIG,
} from '@/lib/siteHours'
```

---

## Quick Checks

### "Is the site open right now?"

```typescript
if (isOpenNow()) {
  // Site is currently open
}
```

### "Is the site open on this date?"

```typescript
const date = new Date(2026, 2, 4) // March 4, 2026
if (isOpenOnDate(date)) {
  // Site is open (ignores time of day)
}
```

### "Comprehensive status for a date"

```typescript
const status = getSiteStatus(new Date(2026, 2, 4))
// status = {
//   isOpen: true,
//   reason: 'Open',
//   message: 'Open 10:00 AM-5:00 PM',
//   specialHours: null,
//   nextOpen: undefined
// }
```

---

## Common Patterns

### Show "Open / Closed" Banner

```typescript
const status = getSiteStatus()

return (
  <div className={status.isOpen ? 'bg-green' : 'bg-red'}>
    <strong>{status.isOpen ? 'OPEN' : 'CLOSED'}</strong>
    <p>{status.message}</p>
    {status.nextOpen && (
      <p>Next open: {status.nextOpen.toLocaleDateString()}</p>
    )}
  </div>
)
```

### Show Available Tours

```typescript
const tours = getTourSchedule(new Date())

return (
  <ul>
    {tours.map((tour) => (
      <li key={tour.hour}>{tour.time} departure</li>
    ))}
  </ul>
)
```

### Check for Special Hours

```typescript
const special = getSpecialHours(new Date())

if (special) {
  return <p>Special event: {special.eventTitle}</p>
}
```

---

## Condition Logic

### Check Multiple Conditions

```typescript
const date = new Date(2026, 2, 4)

// Check ALL conditions
const isFullyOpen =
  isSeasonOpen(date) && // Within season
  !isClosure(date).closed && // Not a holiday
  isDayOpen(date) // Wed-Sat

// Now check time
if (isFullyOpen && isTimeOpen(new Date())) {
  // Site is open right now
}
```

### Priority Order (What getSiteStatus does)

```
1. Is it a closure? (Thanksgiving, Christmas, etc.)
   → Closed ✗
2. Is it in season?
   → Closed ✗
3. Is it an open day? (Wed-Sat)
   → Closed ✗
4. Is it within hours?
   → Open ✓ or Closed ✗
```

---

## What Each Function Returns

| Function            | Returns                                     | Use For                      |
| ------------------- | ------------------------------------------- | ---------------------------- |
| `isSeasonOpen()`    | `boolean`                                   | Is this date in season?      |
| `isDayOpen()`       | `boolean`                                   | Is this day a Wed-Sat?       |
| `isTimeOpen()`      | `boolean`                                   | Is this hour 10am-5pm?       |
| `isClosure()`       | `{ closed: boolean, reason?, closureEnd? }` | Is this date a closure?      |
| `getSpecialHours()` | `SpecialHours \| null`                      | Special event hours?         |
| `getSiteStatus()`   | `SiteStatus`                                | Comprehensive status message |
| `getTourSchedule()` | `{ time, hour }[]`                          | List of tour times           |
| `isOpenNow()`       | `boolean`                                   | Open right now?              |
| `isOpenOnDate()`    | `boolean`                                   | Open on date (any time)?     |

---

## Date Patterns (Reference)

### Season Dates

| Date          | Meaning      | Calculation                 |
| ------------- | ------------ | --------------------------- |
| March 4, 2026 | Season start | First Wednesday of March    |
| Dec 19, 2026  | Season end   | Last Saturday before Dec 20 |

### Closures

| Closure      | Date           | Range                   |
| ------------ | -------------- | ----------------------- |
| Thanksgiving | Nov 26, 2026   | Nov 26 - Dec 3 (7 days) |
| Christmas    | Dec 24 - Jan 2 | Spans year boundary     |

### Special Hours

| Event       | Date                | Time    |
| ----------- | ------------------- | ------- |
| Haunting    | Oct 12-18 (~Oct 15) | 6pm-9pm |
| Candlelight | Dec 1-7 (~Dec 4)    | 4pm-8pm |

---

## React Component Examples

### Status Banner

```typescript
'use client'

import { getSiteStatus } from '@/lib/siteHours'

export function SiteStatusBanner() {
  const status = getSiteStatus()

  if (!status.isOpen) {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
        <p className="font-semibold">{status.reason}</p>
        <p className="text-sm">{status.message}</p>
      </div>
    )
  }

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4">
      <p className="font-semibold">{status.message}</p>
    </div>
  )
}
```

### Hours Display

```typescript
import { getTourSchedule, getSiteStatus } from '@/lib/siteHours'

export function HoursSection() {
  const status = getSiteStatus()
  const today = new Date()
  const tours = getTourSchedule(today)

  return (
    <div>
      <h3>Today's Hours</h3>
      <p>{status.isOpen ? 'Open' : 'Closed'}</p>
      <p className="text-sm text-gray-600">{status.message}</p>

      {status.isOpen && tours.length > 0 && (
        <div>
          <h4>Tour Schedule</h4>
          <ul className="list-disc pl-5">
            {tours.map((tour) => (
              <li key={tour.hour}>{tour.time}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
```

### Calendar Day Status

```typescript
import { isOpenOnDate } from '@/lib/siteHours'

function CalendarDay({ date }) {
  const open = isOpenOnDate(date)

  return (
    <div className={open ? 'bg-white' : 'bg-gray-100'}>
      <span className={open ? 'text-black' : 'text-gray-400'}>
        {date.getDate()}
      </span>
    </div>
  )
}
```

---

## Debugging

### Log the config

```typescript
import { ROCKY_MOUNT_HOURS_CONFIG } from '@/lib/siteHours'
console.log(ROCKY_MOUNT_HOURS_CONFIG)
```

### Check a specific date

```typescript
const test = new Date(2026, 9, 15) // Oct 15, 2026

console.log('Season:', isSeasonOpen(test))
console.log('Day:', isDayOpen(test))
console.log('Closure:', isClosure(test))
console.log('Special Hours:', getSpecialHours(test))
console.log('Full Status:', getSiteStatus(test))
```

### Verify tour schedule

```typescript
const tours = getTourSchedule(new Date(2026, 2, 4))
console.table(tours)
// Output:
// time        hour
// 10:00 AM    10
// 11:00 AM    11
// ... etc
// 4:00 PM     16
```

---

## Tips

1. **Use `getSiteStatus()` for display** — It handles priority and creates readable messages
2. **Use `isOpenNow()` for simple checks** — No date needed
3. **Use `getTourSchedule()` for bookings** — Returns all available times
4. **Test in January and December** — Edge cases for year boundaries
5. **Holidays update automatically** — No code changes needed next year

---

## FAQ

**Q: Does "Haunting on the Mount" always happen on Oct 15?**
A: It checks Oct 12-18 (±3 days), so it's flexible if the actual event date drifts slightly.

**Q: What if we want to add a random closure day?**
A: Pass a custom config with an additional closure of type `'custom'` with a `customDate`.

**Q: Do I need to update dates for 2027?**
A: No! All dates are calculated from patterns. Just call the functions with 2027 dates.

**Q: What happens if someone visits at 4:01pm?**
A: `isClosure()` will show they're closed (tours end at 4pm, site closes at 5pm).

---

## Related Docs

- **Full Design:** `docs/SITE-HOURS-DESIGN.md`
- **Data Standards:** `docs/DATA-STANDARDS.md`
- **Contributing:** `CONTRIBUTING.md`
