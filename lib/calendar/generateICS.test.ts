/**
 * Test cases for ICS generation
 *
 * Run manually to verify edge cases:
 * - Single-day events with time
 * - Single-day all-day events
 * - Multi-day events
 * - Special characters in description
 */

/* eslint-disable no-console */

import { generateICS, generateICSFilename } from './generateICS'

// Test 1: Single-day event with time
const singleDayEvent = {
  id: 'test-event-1',
  title: 'Colonial Independence Day',
  date: '2026-07-04',
  endDate: null,
  time: '10:00 AM',
  description: "Join us for a special celebration of America's 250th birthday.",
}

console.log('=== Test 1: Single-day event with time ===')
console.log(generateICS(singleDayEvent))
console.log('Filename:', generateICSFilename(singleDayEvent))
console.log('\n')

// Test 2: All-day event
const allDayEvent = {
  id: 'test-event-2',
  title: 'Road to 250 Season Opening',
  date: '2026-03-04',
  endDate: null,
  time: null,
  description: "The gates open on Tennessee's most historic year.",
}

console.log('=== Test 2: All-day event ===')
console.log(generateICS(allDayEvent))
console.log('Filename:', generateICSFilename(allDayEvent))
console.log('\n')

// Test 3: Multi-day event
const multiDayEvent = {
  id: 'test-event-3',
  title: 'Spring Break Camp Week 1',
  date: '2026-03-16',
  endDate: '2026-03-20',
  time: '9:00 AM - 3:00 PM',
  description: 'Trade screens for sawdust and adventure.',
}

console.log('=== Test 3: Multi-day event ===')
console.log(generateICS(multiDayEvent))
console.log('Filename:', generateICSFilename(multiDayEvent))
console.log('\n')

// Test 4: Special characters
const specialCharsEvent = {
  id: 'test-event-4',
  title: 'Lecture: "Faith & Frontier"',
  date: '2026-04-15',
  endDate: null,
  time: '2:00 PM',
  description:
    "Dr. Smith explores religion, politics; the role of faith in Tennessee's founding.\nLine breaks included.",
}

console.log('=== Test 4: Special characters ===')
console.log(generateICS(specialCharsEvent))
console.log('Filename:', generateICSFilename(specialCharsEvent))
console.log('\n')

// Test 5: Multi-day all-day event
const multiDayAllDay = {
  id: 'test-event-5',
  title: 'Heritage Festival Week',
  date: '2026-06-01',
  endDate: '2026-06-07',
  time: null,
  description: 'A week-long celebration of Tennessee heritage.',
}

console.log('=== Test 5: Multi-day all-day event ===')
console.log(generateICS(multiDayAllDay))
console.log('Filename:', generateICSFilename(multiDayAllDay))
