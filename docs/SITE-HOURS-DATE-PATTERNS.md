# Site Hours — Date Calculation Patterns

Visual reference for how all dates are calculated. This is the "source of truth" for understanding why specific dates are used.

---

## Season Dates

### Season Start: First Wednesday of March

**Pattern:** `getNthWeekdayOfMonth(year, 2, 3, 1)`

**How it works:**

```
February 2026:              March 2026:                April 2026:
Su Mo Tu We Th Fr Sa       Su Mo Tu We Th Fr Sa       Su Mo Tu We Th Fr Sa
 1  2  3  4  5  6  7        1  2  3  4  5  6  7        1  2  3  4
 8  9 10 11 12 13 14        8  9 10 11 12 13 14        5  6  7  8  9 10 11
15 16 17 18 19 20 21       15 16 17 18 19 20 21       12 13 14 15 16 17 18
22 23 24 25 26 27 28       22 23 24 25 26 27 28       19 20 21 22 23 24 25
                           29 30 31                    26 27 28 29 30

                           ^ First Wednesday
                           Season starts March 4, 2026
```

**By Year:**

| Year | First Wed | Date |
| ---- | --------- | ---- |
| 2026 | March 4   | Wed  |
| 2027 | March 3   | Wed  |
| 2028 | March 1   | Wed  |
| 2029 | March 7   | Wed  |

**Calculation:**

```typescript
const mar1 = new Date(year, 2, 1) // March 1
const dayOfWeek = mar1.getDay() // 0=Sun, 1=Mon, ..., 3=Wed
const firstWed = 1 + ((3 - dayOfWeek + 7) % 7) // Days to add
return new Date(year, 2, firstWed)
```

**Benefit:** No matter what day of the week March 1 falls on, always returns first Wednesday.

---

### Season End: Last Saturday Before December 20

**Pattern:** `getLastSaturdayBefore(year, 11, 20)`

**How it works:**

```
December 2026:                December 2027:
Su Mo Tu We Th Fr Sa          Su Mo Tu We Th Fr Sa
       1  2  3  4  5                  1  2  3  4
 6  7  8  9 10 11 12           5  6  7  8  9 10 11
13 14 15 16 17 18 19          12 13 14 15 16 17 18
20 21 22 23 24 25 26          19 20 21 22 23 24 25
27 28 29 30 31                26 27 28 29 30 31

^ Dec 19 = Saturday           ^ Dec 18 = Saturday
  (last Sat before 20)           (last Sat before 20)
  Season ends Dec 19, 2026       Season ends Dec 18, 2027
```

**By Year:**

| Year | Last Sat Before Dec 20 | Date |
| ---- | ---------------------- | ---- |
| 2026 | December 19            | Sat  |
| 2027 | December 18            | Sat  |
| 2028 | December 16            | Sat  |
| 2029 | December 15            | Sat  |

**Calculation:**

```typescript
let date = new Date(year, 11, 20) // Start from Dec 20
while (date.getDay() !== 6) {
  // 6 = Saturday
  date.setDate(date.getDate() - 1) // Go back one day
}
return date
```

**Benefit:** Always ends on a Saturday (good for weekend tourism), before winter holidays.

---

## Closure Dates

### Thanksgiving: 4th Thursday of November + 7 Days

**Pattern:** `getThanksgivingDate(year)` then add 7 days

**How it works:**

```
November 2026:               November 2027:
Su Mo Tu We Th Fr Sa        Su Mo Tu We Th Fr Sa
 1  2  3  4  5  6  7         1  2  3  4  5  6
 8  9 10 11 12 13 14         7  8  9 10 11 12 13
15 16 17 18 19 20 21        14 15 16 17 18 19 20
22 23 24 25 26 27 28        21 22 23 24 25 26 27
29 30                        28 29 30

          ^ 4th Thursday       ^ 4th Thursday
            Nov 26, 2026       Nov 25, 2027
            Closed Nov 26 - Dec 3, 2026
```

**Closure Range (7 Days):**

| Date   | Day of Week | Open? | Notes                                    |
| ------ | ----------- | ----- | ---------------------------------------- |
| Nov 25 | Wednesday   | ✓     | Before closure                           |
| Nov 26 | Thursday    | ✗     | Thanksgiving Day (closure starts)        |
| Nov 27 | Friday      | ✗     |                                          |
| Nov 28 | Saturday    | ✗     | (Would normally be open, but in closure) |
| Nov 29 | Sunday      | ✗     |                                          |
| Nov 30 | Monday      | ✗     |                                          |
| Dec 1  | Tuesday     | ✗     |                                          |
| Dec 2  | Wednesday   | ✗     |                                          |
| Dec 3  | Thursday    | ✗     | (Last day of closure)                    |
| Dec 4  | Friday      | ✓     | After closure                            |

**By Year:**

| Year | Thanksgiving | Closure Dates   |
| ---- | ------------ | --------------- |
| 2026 | Nov 26       | Nov 26 - Dec 3  |
| 2027 | Nov 25       | Nov 25 - Dec 2  |
| 2028 | Nov 23       | Nov 23 - Nov 30 |
| 2029 | Nov 22       | Nov 22 - Nov 29 |

**Calculation:**

```typescript
// Find 4th Thursday of November
const nov1 = new Date(year, 10, 1)
const firstThursday = nov1.getDay() === 4 ? 1 : (11 - nov1.getDay()) % 7 || 7
const fourthThursday = firstThursday + 21 // 3 weeks
const thanksgiving = new Date(year, 10, fourthThursday)

// Closure runs 7 days from Thanksgiving
const closureEnd = new Date(thanksgiving)
closureEnd.setDate(closureEnd.getDate() + 7)
```

**Benefit:** Week-long closure covers the holiday and gives staff recovery time. Consistent across all years.

---

### Christmas: December 24 - January 2

**Pattern:** Hardcoded range (spans year boundary)

**Closure Duration:**

```
December 2026:              January 2027:
Su Mo Tu We Th Fr Sa       Su Mo Tu We Th Fr Sa
       1  2  3  4  5                     1  2
 6  7  8  9 10 11 12        3  4  5  6  7  8  9
13 14 15 16 17 18 19       10 11 12 13 14 15 16
20 21 22 23 24 25 26       17 18 19 20 21 22 23
27 28 29 30 31             24 25 26 27 28 29 30
                           31
     ^ Closure starts       ^ Closure ends
     Dec 24, 2026          Jan 2, 2027
```

**Closure Range (10 Days, Spans Year):**

| Date   | Day of Week | Open? | Notes                             |
| ------ | ----------- | ----- | --------------------------------- |
| Dec 23 | Wednesday   | ✓     | Before closure                    |
| Dec 24 | Thursday    | ✗     | (Closure starts)                  |
| Dec 25 | Friday      | ✗     | Christmas Day                     |
| Dec 26 | Saturday    | ✗     |                                   |
| Dec 27 | Sunday      | ✗     |                                   |
| Dec 28 | Monday      | ✗     |                                   |
| Dec 29 | Tuesday     | ✗     |                                   |
| Dec 30 | Wednesday   | ✗     |                                   |
| Dec 31 | Thursday    | ✗     | New Year's Eve                    |
| Jan 1  | Friday      | ✗     | New Year's Day ⚠️ **Spans year!** |
| Jan 2  | Saturday    | ✗     | (Last day of closure)             |
| Jan 3  | Sunday      | ✓     | After closure                     |

**Years:**

| Year      | Closure Dates              |
| --------- | -------------------------- |
| 2026-2027 | Dec 24, 2026 - Jan 2, 2027 |
| 2027-2028 | Dec 24, 2027 - Jan 2, 2028 |
| 2028-2029 | Dec 24, 2028 - Jan 2, 2029 |

**Calculation:**

```typescript
const christmasStart = new Date(year, 11, 24) // Dec 24 current year
const christmasEnd = new Date(year + 1, 0, 2) // Jan 2 next year

return date >= christmasStart && date <= christmasEnd
```

**Benefit:** 10-day closure covers Christmas and New Year holidays, with staff recovery time. Fixed range works across all years.

---

## Special Event Dates

### Haunting on the Mount: ~October 15 (±3 Days)

**Pattern:** Approximate date with fuzzy matching

**How it works:**

```
October 2026:
Su Mo Tu We Th Fr Sa
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17  ← Target: Oct 15 (Thursday)
18 19 20 21 22 23 24
25 26 27 28 29 30 31

Match window: Oct 12-18 (±3 days)
```

**Matching Days:**

| Date   | Day of Week | Matches? | Hours            |
| ------ | ----------- | -------- | ---------------- |
| Oct 11 | Sunday      | ✗        | N/A              |
| Oct 12 | Monday      | ✓        | 6pm-9pm          |
| Oct 13 | Tuesday     | ✓        | 6pm-9pm          |
| Oct 14 | Wednesday   | ✓        | 6pm-9pm          |
| Oct 15 | Thursday    | ✓        | 6pm-9pm (target) |
| Oct 16 | Friday      | ✓        | 6pm-9pm          |
| Oct 17 | Saturday    | ✓        | 6pm-9pm          |
| Oct 18 | Sunday      | ✓        | 6pm-9pm          |
| Oct 19 | Monday      | ✗        | N/A              |

**By Year:**

| Year | Target       | Fuzzy Window | Notes             |
| ---- | ------------ | ------------ | ----------------- |
| 2026 | Oct 15 (Thu) | Oct 12-18    |                   |
| 2027 | Oct 15 (Fri) | Oct 12-18    |                   |
| 2028 | Oct 15 (Sun) | Oct 12-18    | (Falls on Sunday) |

**Calculation:**

```typescript
const approximateDay = 15
const fuzzyDays = 3

// Check if date month is October
if (date.getMonth() === 9) {
  const dayDiff = Math.abs(date.getDate() - approximateDay)
  if (dayDiff <= fuzzyDays) {
    return { opens: 18, closes: 21, eventTitle: 'Haunting on the Mount' }
  }
}
```

**Benefit:** Allows the actual event to move 3 days without requiring code changes. Handles different days of week automatically.

**Hours:** 6:00 PM - 9:00 PM (extended evening)

---

### Candlelight Christmas: ~December 4 (±3 Days)

**Pattern:** Approximate date with fuzzy matching

**How it works:**

```
December 2026:
Su Mo Tu We Th Fr Sa
       1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 29 30 31

Match window: Dec 1-7 (±3 days from Dec 4)
```

**Matching Days:**

| Date   | Day of Week | Matches? | Hours            |
| ------ | ----------- | -------- | ---------------- |
| Nov 30 | Tuesday     | ✗        | N/A              |
| Dec 1  | Wednesday   | ✓        | 4pm-8pm          |
| Dec 2  | Thursday    | ✓        | 4pm-8pm          |
| Dec 3  | Friday      | ✓        | 4pm-8pm          |
| Dec 4  | Saturday    | ✓        | 4pm-8pm (target) |
| Dec 5  | Sunday      | ✓        | 4pm-8pm          |
| Dec 6  | Monday      | ✓        | 4pm-8pm          |
| Dec 7  | Tuesday     | ✓        | 4pm-8pm          |
| Dec 8  | Wednesday   | ✗        | N/A              |

**By Year:**

| Year | Target      | Fuzzy Window | Notes |
| ---- | ----------- | ------------ | ----- |
| 2026 | Dec 4 (Fri) | Dec 1-7      |       |
| 2027 | Dec 4 (Sat) | Dec 1-7      |       |
| 2028 | Dec 4 (Mon) | Dec 1-7      |       |

**Calculation:**

```typescript
const approximateDay = 4
const fuzzyDays = 3

if (date.getMonth() === 11) {
  // December
  const dayDiff = Math.abs(date.getDate() - approximateDay)
  if (dayDiff <= fuzzyDays) {
    return { opens: 16, closes: 20, eventTitle: 'Candlelight Christmas' }
  }
}
```

**Benefit:** Early December event can float without code changes. Matches season-end rush before Christmas closure.

**Hours:** 4:00 PM - 8:00 PM (evening candlelit tours)

---

## Complete 2026 Calendar

Quick reference showing all key dates for 2026:

```
2026 Rocky Mount Operating Calendar

MARCH
  3 (Tue): CLOSED - Before season
  4 (Wed): OPEN ★ Season Start

MAY - SEPTEMBER
  Standard: Wed-Sat 10am-5pm

OCTOBER
 12-18: Haunting on the Mount (6pm-9pm) ★

NOVEMBER
 25 (Wed): OPEN - Last day before Thanksgiving
 26 (Thu): CLOSED ★ Thanksgiving starts
 27-Dec 3: CLOSED - Thanksgiving closure continues

DECEMBER
  1-7: Candlelight Christmas (4pm-8pm) ★
  4 (Fri): Special hours (approximate center of event)
 19 (Sat): OPEN - Last day of season
 20 (Sun): CLOSED ★ Season End
 24 (Thu): CLOSED ★ Christmas closure starts
```

---

## Date Calculation Reference Table

**All calculation patterns at a glance:**

| Event                    | Pattern                | Formula                               | Result                     |
| ------------------------ | ---------------------- | ------------------------------------- | -------------------------- |
| **Season Start**         | 1st Wed of March       | `getNthWeekdayOfMonth(year, 2, 3, 1)` | March 4, 2026              |
| **Season End**           | Last Sat before Dec 20 | `getLastSaturdayBefore(year, 11, 20)` | Dec 19, 2026               |
| **Thanksgiving Day**     | 4th Thu of Nov         | `getThanksgivingDate(year)`           | Nov 26, 2026               |
| **Thanksgiving Closure** | Thanksgiving + 7 days  | Manual offset                         | Nov 26 - Dec 3             |
| **Christmas Closure**    | Dec 24 - Jan 2         | Hardcoded                             | Dec 24, 2026 - Jan 2, 2027 |
| **Haunting**             | ~Oct 15 ±3 days        | Fuzzy match                           | Oct 12-18, 2026            |
| **Candlelight**          | ~Dec 4 ±3 days         | Fuzzy match                           | Dec 1-7, 2026              |

---

## Why These Dates?

### Season Start (First Wednesday of March)

**Reasoning:**

- Spring equinox (March 20) region sees reasonable weather
- Earlier than many seasonal attractions
- Allows time for staff training after winter
- Establishes consistent pattern: always first Wednesday

**Why not "March 1"?**

- Falls on different days each year, confusing for planning
- Could be Mon-Tue (normally closed days)

---

### Season End (Last Saturday Before December 20)

**Reasoning:**

- Covers autumn visitation season
- Ends Saturday (peak visitor day) not mid-week
- Before winter holidays (most visitors travel Dec 20+)
- Mid-December allows Christmas event (Dec 4) while open

**Why not "December 15"?**

- Might not be Saturday
- Too close to Christmas closure
- This method guarantees Saturday, better for tourism

---

### Thanksgiving Closure (7 Days)

**Reasoning:**

- Thanksgiving Day itself (everyone travels)
- Extra days before/after for staff, repairs, inventory
- 7 days (full week) easy to remember
- Covers peak holiday travel period

---

### Christmas Closure (Dec 24 - Jan 2)

**Reasoning:**

- Christmas Day (Dec 25) major holiday
- Dec 24 (Eve) - most people traveling
- Jan 1 (New Year) - staff recovery
- Jan 2 gives buffer before reopening
- 10-day closure = full shutdown for major repairs if needed

---

### Haunting: ~October 15

**Reasoning:**

- Peak Halloween season (Oct 31 nearby)
- Mid-October = full autumn foliage in Tennessee
- About 6 weeks before Christmas closures
- Evening hours (6pm-9pm) for after-work visits

**Fuzzy ±3 Days:**

- Event planning flexibility
- Allows Saturday scheduling (better for haunted house)
- No code update if event moves slightly

---

### Candlelight Christmas: ~December 4

**Reasoning:**

- Early December (before Dec 20 season end)
- Still in season so regular tours happening
- Week before Christmas week closures
- Evening candlelit atmosphere fits season
- Leads into Christmas closure (Dec 24)

**Fuzzy ±3 Days:**

- Allows weekend scheduling
- Bridges regular hours and Christmas closure
- Flexible if moved for weather, staffing, etc.

---

## Testing Each Pattern

To verify dates are calculated correctly:

```typescript
// Test Season Start
const seasonStart = getNthWeekdayOfMonth(2026, 2, 3, 1)
console.assert(seasonStart.toDateString() === 'Wed Mar 04 2026')

// Test Season End
const seasonEnd = getLastSaturdayBefore(2026, 11, 20)
console.assert(seasonEnd.toDateString() === 'Sat Dec 19 2026')

// Test Thanksgiving
const thanksgiving = getThanksgivingDate(2026)
console.assert(thanksgiving.toDateString() === 'Thu Nov 26 2026')

// Test Year 2027 (different days)
const start2027 = getNthWeekdayOfMonth(2027, 2, 3, 1)
console.assert(start2027.toDateString() === 'Wed Mar 03 2027')
```

---

## Summary

| Type                 | Pattern                 | Fixed/Calculated | Notes                                  |
| -------------------- | ----------------------- | ---------------- | -------------------------------------- |
| Season Start         | 1st Wed of March        | Calculated       | Changes day of month each year         |
| Season End           | Last Sat before Dec 20  | Calculated       | Changes day of month each year         |
| Thanksgiving Closure | 4th Thu of Nov + 7 days | Calculated       | Changes day of month each year         |
| Christmas Closure    | Dec 24 - Jan 2          | Fixed            | Same dates every year, spans years     |
| Haunting             | ~Oct 15 ±3 days         | Fuzzy Match      | Flexible window, no code change needed |
| Candlelight          | ~Dec 4 ±3 days          | Fuzzy Match      | Flexible window, no code change needed |

**Key Insight:** Most dates are CALCULATED, not hardcoded. This ensures correct operation year after year automatically.

---

_For code examples, see `lib/siteHours.examples.ts`_
_For complete documentation, see `docs/SITE-HOURS-DESIGN.md`_
