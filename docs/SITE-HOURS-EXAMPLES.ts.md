/\*\*

- Site Hours Utility — Examples & Test Cases
-
- Demonstrates usage patterns and edge cases.
- These are NOT automated tests—refer to Jest for unit testing.
  \*/

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
getNthWeekdayOfMonth,
getLastSaturdayBefore,
getThanksgivingDate,
} from './siteHours'

// ============================================================================
// BASIC CHECKS
// ============================================================================

/\*\*

- Example 1: Check if site is open right now
  \*/
  function example_isOpenNow() {
  const open = isOpenNow()
  console.log(`Site open now: ${open}`)

// Output depends on current date/time
// If it's Wednesday 2pm in March, true
// If it's Sunday, false
// If it's January, false
}

/\*\*

- Example 2: Check if site is open on a specific date
  \*/
  function example_isOpenOnDate() {
  // March 4, 2026 (first Wednesday of season)
  const open = isOpenOnDate(new Date(2026, 2, 4))
  console.log(`March 4, 2026 open: ${open}`) // true

// January 15, 2026 (off-season)
const closed = isOpenOnDate(new Date(2026, 0, 15))
console.log(`January 15, 2026 open: ${closed}`) // false

// Monday, March 2, 2026 (wrong day of week)
const monday = isOpenOnDate(new Date(2026, 2, 2))
console.log(`Monday, March 2, 2026 open: ${monday}`) // false
}

// ============================================================================
// SEASON BOUNDARIES
// ============================================================================

/\*\*

- Example 3: Season start (first Wednesday of March)
  \*/
  function example_seasonStart() {
  // 2026: March 4
  const mar3 = isSeasonOpen(new Date(2026, 2, 3))
  const mar4 = isSeasonOpen(new Date(2026, 2, 4))

console.log(`March 3, 2026 (Tuesday) in season: ${mar3}`) // false
console.log(`March 4, 2026 (Wednesday) in season: ${mar4}`) // true

// 2027: March 3
const mar2_2027 = isSeasonOpen(new Date(2027, 2, 2))
const mar3_2027 = isSeasonOpen(new Date(2027, 2, 3))

console.log(`March 2, 2027 in season: ${mar2_2027}`) // false
console.log(`March 3, 2027 (Wednesday) in season: ${mar3_2027}`) // true
}

/\*\*

- Example 4: Season end (last Saturday before Dec 20)
  \*/
  function example_seasonEnd() {
  // 2026: Last Saturday before Dec 20 = Dec 19
  const dec18 = isSeasonOpen(new Date(2026, 11, 18)) // Friday
  const dec19 = isSeasonOpen(new Date(2026, 11, 19)) // Saturday
  const dec20 = isSeasonOpen(new Date(2026, 11, 20)) // Sunday

console.log(`Dec 18, 2026 (Friday) in season: ${dec18}`) // true
console.log(`Dec 19, 2026 (Saturday) in season: ${dec19}`) // true
console.log(`Dec 20, 2026 (Sunday) in season: ${dec20}`) // false

// Note: Dec 20 is also closed because it's Sunday (not a Wed-Sat anyway)
}

// ============================================================================
// CLOSURES
// ============================================================================

/\*\*

- Example 5: Thanksgiving closure
  \*/
  function example_thanksgiving() {
  // 2026: Thanksgiving is Nov 26 (4th Thursday)
  // Closure: Nov 26 - Dec 3 (7 days)

const nov25 = isClosure(new Date(2026, 10, 25)) // Wednesday (open)
const nov26 = isClosure(new Date(2026, 10, 26)) // Thursday (closed)
const nov28 = isClosure(new Date(2026, 10, 28)) // Saturday (still closed)
const dec3 = isClosure(new Date(2026, 11, 3)) // Thursday (still closed)
const dec4 = isClosure(new Date(2026, 11, 4)) // Friday (now open)

console.log(`Nov 25 closed: ${nov25.closed}`) // false
console.log(`Nov 26 closed: ${nov26.closed}`) // true
console.log(`Nov 28 closed: ${nov28.closed}`) // true (even though Saturday)
console.log(`Dec 3 closed: ${dec3.closed}`) // true
console.log(`Dec 4 closed: ${dec4.closed}`) // false

if (nov26.closed) {
console.log(`Reason: ${nov26.reason}`) // "Thanksgiving Holiday"
console.log(`Closure ends: ${nov26.closureEnd}`) // Date(2026-12-03)
}
}

/\*\*

- Example 6: Christmas closure
  \*/
  function example_christmas() {
  // Dec 24 - Jan 2 (spans year boundary)

const dec23 = isClosure(new Date(2026, 11, 23)) // Open
const dec24 = isClosure(new Date(2026, 11, 24)) // Closed
const dec31 = isClosure(new Date(2026, 11, 31)) // Closed (still in closure)
const jan1 = isClosure(new Date(2027, 0, 1)) // Closed (spans to next year!)
const jan2 = isClosure(new Date(2027, 0, 2)) // Closed
const jan3 = isClosure(new Date(2027, 0, 3)) // Open

console.log(`Dec 23 closed: ${dec23.closed}`) // false
console.log(`Dec 24 closed: ${dec24.closed}`) // true
console.log(`Jan 1 closed: ${jan1.closed}`) // true (key: spans year!)
console.log(`Jan 3 closed: ${jan3.closed}`) // false
}

// ============================================================================
// SPECIAL HOURS
// ============================================================================

/\*\*

- Example 7: Haunting on the Mount
  \*/
  function example_haunting() {
  // October ~15 (fuzzy match ±3 days)
  // Hours: 6pm-9pm

const oct12 = getSpecialHours(new Date(2026, 9, 12)) // Monday
const oct15 = getSpecialHours(new Date(2026, 9, 15)) // Thursday
const oct18 = getSpecialHours(new Date(2026, 9, 18)) // Sunday
const oct19 = getSpecialHours(new Date(2026, 9, 19)) // Monday

console.log(`Oct 12 special hours: ${oct12 ? oct12.eventTitle : 'none'}`) // none
console.log(`Oct 15 special hours: ${oct15 ? oct15.eventTitle : 'none'}`) // "Haunting on the Mount"
console.log(`Oct 18 special hours: ${oct18 ? oct18.eventTitle : 'none'}`) // "Haunting on the Mount"
console.log(`Oct 19 special hours: ${oct19 ? oct19.eventTitle : 'none'}`) // none

if (oct15) {
console.log(`Hours: ${oct15.opens}:00 - ${oct15.closes}:00`) // "18:00 - 21:00" (6pm-9pm)
}
}

/\*\*

- Example 8: Candlelight Christmas
  \*/
  function example_candlelight() {
  // December ~4 (fuzzy match ±3 days)
  // Hours: 4pm-8pm

const dec1 = getSpecialHours(new Date(2026, 11, 1)) // Tuesday
const dec4 = getSpecialHours(new Date(2026, 11, 4)) // Friday
const dec7 = getSpecialHours(new Date(2026, 11, 7)) // Monday
const dec8 = getSpecialHours(new Date(2026, 11, 8)) // Tuesday

console.log(`Dec 1 special hours: ${dec1 ? dec1.eventTitle : 'none'}`) // none
console.log(`Dec 4 special hours: ${dec4 ? dec4.eventTitle : 'none'}`) // "Candlelight Christmas"
console.log(`Dec 7 special hours: ${dec7 ? dec7.eventTitle : 'none'}`) // "Candlelight Christmas"
console.log(`Dec 8 special hours: ${dec8 ? dec8.eventTitle : 'none'}`) // none

if (dec4) {
console.log(`Hours: ${dec4.opens}:00 - ${dec4.closes}:00`) // "16:00 - 20:00" (4pm-8pm)
}
}

// ============================================================================
// COMPREHENSIVE STATUS
// ============================================================================

/\*\*

- Example 9: Full site status
  \*/
  function example_getSiteStatus() {
  // Open and operating normally
  const spring = getSiteStatus(new Date(2026, 2, 4, 14, 0)) // Wed 2pm
  console.log(spring)
  // {
  // isOpen: true,
  // reason: 'Open',
  // message: 'Open 10:00 AM-5:00 PM',
  // nextOpen: undefined,
  // specialHours: undefined
  // }

// Off-season
const winter = getSiteStatus(new Date(2026, 0, 15)) // Jan 15
console.log(winter)
// {
// isOpen: false,
// reason: 'Before operating season',
// message: 'Season opens Mar 04',
// nextOpen: Date(2026-03-04 10:00)
// }

// Thanksgiving
const thanksgiving = getSiteStatus(new Date(2026, 10, 26))
console.log(thanksgiving)
// {
// isOpen: false,
// reason: 'Thanksgiving Holiday',
// message: 'Thanksgiving Holiday (closed through Dec 3)',
// nextOpen: Date(2026-12-04 10:00)
// }

// Special event (Haunting)
const haunting = getSiteStatus(new Date(2026, 9, 15, 19, 0)) // Oct 15, 7pm
console.log(haunting)
// {
// isOpen: true,
// reason: 'Open (special hours for Haunting on the Mount)',
// message: 'Open 6:00 PM-9:00 PM for Haunting on the Mount',
// specialHours: { opens: 18, closes: 21, reason: '...', eventTitle: '...' }
// }
}

/\*\*

- Example 10: Status messages for UI
  \*/
  function example_statusUI() {
  const today = getSiteStatus(new Date())

// Simple status display
if (today.isOpen) {
console.log(`✓ OPEN: ${today.message}`)
} else {
console.log(`✗ CLOSED: ${today.message}`)
if (today.nextOpen) {
console.log(`Next open: ${today.nextOpen.toLocaleDateString()}`)
}
}
}

// ============================================================================
// TOUR SCHEDULE
// ============================================================================

/\*\*

- Example 11: Get hourly tour schedule
  \*/
  function example_tourSchedule() {
  // Regular day
  const regularDay = getTourSchedule(new Date(2026, 2, 4)) // Wed March 4
  console.log('Regular tours:')
  regularDay.forEach((tour) => {
  console.log(`  ${tour.time}`)
  })
  // Output:
  // 10:00 AM
  // 11:00 AM
  // 12:00 PM
  // 1:00 PM
  // 2:00 PM
  // 3:00 PM
  // 4:00 PM

// Special event day
const hauntingDay = getTourSchedule(new Date(2026, 9, 15)) // Haunting
console.log('Haunting tours:')
hauntingDay.forEach((tour) => {
console.log(`  ${tour.time}`)
})
// Output:
// 6:00 PM
// 7:00 PM
// 8:00 PM
}

// ============================================================================
// DAY-OF-WEEK CHECKS
// ============================================================================

/\*\*

- Example 12: Day of week validation
  \*/
  function example_dayOfWeek() {
  // Wed-Sat open
  const wed = isDayOpen(new Date(2026, 2, 4)) // Wednesday
  const thu = isDayOpen(new Date(2026, 2, 5)) // Thursday
  const sat = isDayOpen(new Date(2026, 2, 7)) // Saturday

console.log(`Wednesday open: ${wed}`) // true
console.log(`Thursday open: ${thu}`) // true
console.log(`Saturday open: ${sat}`) // true

// Sun-Tue closed
const sun = isDayOpen(new Date(2026, 2, 1)) // Sunday
const mon = isDayOpen(new Date(2026, 2, 2)) // Monday
const tue = isDayOpen(new Date(2026, 2, 3)) // Tuesday

console.log(`Sunday open: ${sun}`) // false
console.log(`Monday open: ${mon}`) // false
console.log(`Tuesday open: ${tue}`) // false
}

// ============================================================================
// HELPER CALCULATIONS
// ============================================================================

/\*\*

- Example 13: Calculate Nth weekday of month
  \*/
  function example_getNthWeekday() {
  // First Wednesday of March 2026
  const firstWedMar = getNthWeekdayOfMonth(2026, 2, 3, 1) // Returns Date(2026-03-04)
  console.log(`First Wed of March 2026: ${firstWedMar.toDateString()}`) // Wed Mar 04

// Fourth Thursday of November (Thanksgiving 2026)
const thanksgiving = getNthWeekdayOfMonth(2026, 10, 4, 4) // Returns Date(2026-11-26)
console.log(`Fourth Thu of Nov 2026: ${thanksgiving.toDateString()}`) // Thu Nov 26

// Second Saturday of June
const secondSatJune = getNthWeekdayOfMonth(2026, 5, 6, 2) // Returns Date(2026-06-13)
console.log(`Second Sat of June 2026: ${secondSatJune.toDateString()}`) // Sat Jun 13
}

/\*\*

- Example 14: Calculate last Saturday before a date
  \*/
  function example_lastSaturdayBefore() {
  // Last Saturday before Dec 20, 2026
  const lastSat = getLastSaturdayBefore(2026, 11, 20)
  console.log(`Last Sat before Dec 20, 2026: ${lastSat.toDateString()}`) // Sat Dec 19

// Year 2027
const lastSat2027 = getLastSaturdayBefore(2027, 11, 20)
console.log(`Last Sat before Dec 20, 2027: ${lastSat2027.toDateString()}`)
// This will vary depending on 2027 calendar
}

/\*\*

- Example 15: Get Thanksgiving date
  \*/
  function example_getThanksgiving() {
  const thanksgiv2026 = getThanksgivingDate(2026)
  const thanksgiv2027 = getThanksgivingDate(2027)

console.log(`Thanksgiving 2026: ${thanksgiv2026.toDateString()}`) // Thu Nov 26
console.log(`Thanksgiving 2027: ${thanksgiv2027.toDateString()}`) // Thu Nov 25
}

// ============================================================================
// EDGE CASES & GOTCHAS
// ============================================================================

/\*\*

- Example 16: Time boundary at 5pm
  \*/
  function example_timeBoundary() {
  const at430pm = new Date(2026, 2, 4, 16, 30) // 4:30 PM
  const at5pm = new Date(2026, 2, 4, 17, 0) // 5:00 PM
  const at501pm = new Date(2026, 2, 4, 17, 1) // 5:01 PM

// isTimeOpen checks if hour < close hour (17)
console.log(`4:30 PM open: ${isTimeOpen(at430pm)}`) // true
console.log(`5:00 PM open: ${isTimeOpen(at5pm)}`) // false (exactly at closing)
console.log(`5:01 PM open: ${isTimeOpen(at501pm)}`) // false

// This is correct behavior: site closes at 5pm
}

/\*\*

- Example 17: Multiple conditions
  \*/
  function example_multipleConditions() {
  const testDate = new Date(2026, 2, 2) // Monday, March 2

// In season but wrong day of week
const inSeason = isSeasonOpen(testDate) // true (March 2 is in season)
const openDay = isDayOpen(testDate) // false (Monday is closed)

console.log(`March 2 in season: ${inSeason}`) // true
console.log(`March 2 is open day: ${openDay}`) // false
console.log(`Overall open: ${inSeason && openDay}`) // false

// Better: use isOpenOnDate
console.log(`March 2 open: ${isOpenOnDate(testDate)}`) // false
}

/\*\*

- Example 18: Year boundaries
  \*/
  function example_yearBoundary() {
  // Christmas closure spans years
  const dec31 = isClosure(new Date(2026, 11, 31))
  const jan1 = isClosure(new Date(2027, 0, 1))

console.log(`Dec 31, 2026 closed: ${dec31.closed}`) // true
console.log(`Jan 1, 2027 closed: ${jan1.closed}`) // true

// End of season vs start of next season
const lastDayThisYear = isSeasonOpen(new Date(2026, 11, 19)) // Sat Dec 19
const firstDayNextYear = isSeasonOpen(new Date(2027, 0, 1)) // Fri Jan 1

console.log(`Dec 19, 2026 in season: ${lastDayThisYear}`) // true
console.log(`Jan 1, 2027 in season: ${firstDayNextYear}`) // false (too early)
}

// ============================================================================
// REACT INTEGRATION EXAMPLES
// ============================================================================

/\*\*

- Example 19: React component integration
  \*/
  function example_reactComponent() {
  // In a real component:
  // import { getSiteStatus, getTourSchedule } from '@/lib/siteHours'
  //
  // export function HoursSection() {
  // const status = getSiteStatus()
  // const tours = getTourSchedule(new Date())
  //
  // return (
  // <div>
  // <h3>{status.isOpen ? 'OPEN' : 'CLOSED'}</h3>
  // <p>{status.message}</p>
  // {status.isOpen && (
  // <ul>
  // {tours.map(tour => (
  // <li key={tour.hour}>{tour.time}</li>
  // ))}
  // </ul>
  // )}
  // </div>
  // )
  // }
  }

// ============================================================================
// TEST CASES FOR VALIDATION
// ============================================================================

/\*\*

- Run all examples (for manual testing)
  \*/
  export function runAllExamples() {
  console.group('Basic Checks')
  example_isOpenNow()
  example_isOpenOnDate()
  console.groupEnd()

console.group('Season Boundaries')
example_seasonStart()
example_seasonEnd()
console.groupEnd()

console.group('Closures')
example_thanksgiving()
example_christmas()
console.groupEnd()

console.group('Special Hours')
example_haunting()
example_candlelight()
console.groupEnd()

console.group('Comprehensive Status')
example_getSiteStatus()
example_statusUI()
console.groupEnd()

console.group('Tour Schedule')
example_tourSchedule()
console.groupEnd()

console.group('Day of Week')
example_dayOfWeek()
console.groupEnd()

console.group('Helper Calculations')
example_getNthWeekday()
example_lastSaturdayBefore()
example_getThanksgiving()
console.groupEnd()

console.group('Edge Cases')
example_timeBoundary()
example_multipleConditions()
example_yearBoundary()
console.groupEnd()
}

// Uncomment to run:
// runAllExamples()
