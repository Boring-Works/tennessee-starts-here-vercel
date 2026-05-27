#!/usr/bin/env tsx
/**
 * Timeline Event Validator
 *
 * Validates all timeline events against reference library.
 * Checks for:
 * 1. Events already verified in reference library
 * 2. Events that need verification
 * 3. Potential date conflicts
 * 4. Historical accuracy issues
 */

import { REFERENCE_LIBRARY } from '../lib/dredge/reference-library'

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
}

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  documentId: string | null
  type: string
  featured: boolean
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const timelineEvents: TimelineEvent[] = require('../content/timeline-events.json')

interface ValidationResult {
  event: TimelineEvent
  status: 'verified' | 'needs-verification' | 'conflict'
  matchedFacts: string[]
  notes: string[]
}

function validateEvent(event: TimelineEvent): ValidationResult {
  const result: ValidationResult = {
    event,
    status: 'needs-verification',
    matchedFacts: [],
    notes: [],
  }

  // Check if event date is mentioned in reference library
  REFERENCE_LIBRARY.forEach((fact) => {
    const factClaim = fact.claim.toLowerCase()
    const eventTitle = event.title.toLowerCase()
    const _eventDesc = event.description.toLowerCase()
    const eventDate = event.date

    // Date match
    if (factClaim.includes(eventDate)) {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push(`Date verified by ${fact.id}: ${fact.claim}`)
    }

    // Title/description match
    if (
      factClaim.includes(eventTitle) ||
      eventTitle.includes(factClaim.split(' ').slice(0, 5).join(' '))
    ) {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push(`Event verified by ${fact.id}`)
    }

    // Specific event checks
    if (event.id === 'blount-arrives' && fact.id === 'gov-001') {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push('Blount arrival date verified')
    }

    if (event.id === 'treaty-holston' && fact.id === 'trt-001') {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push('Treaty of Holston signing verified')
    }

    if (event.id === 'statehood' && fact.id === 'tim-002') {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push('Tennessee statehood verified')
    }

    if (event.id === 'capital-moves' && fact.id === 'tim-003') {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push('Capital relocation verified')
    }

    if (event.id === 'gazette-first' && fact.id === 'tim-006') {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push('Knoxville Gazette founding verified')
    }

    if (event.id === 'washington-proclamation' && fact.id === 'trt-004') {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push('Washington ratification verified')
    }

    if (event.id === 'cherokee-delegation-arrives' && fact.id === 'trt-017') {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push('Cherokee delegation travel verified')
    }

    if (event.id === 'treaty-additional' && fact.id === 'trt-014') {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push('Additional treaty article verified')
    }

    if (event.id === 'sw-territory-created' && fact.id === 'gov-015') {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push('Southwest Territory creation verified')
    }

    if (event.id === 'blount-nominated' && fact.id === 'gov-016') {
      result.matchedFacts.push(fact.id)
      result.status = 'verified'
      result.notes.push('Blount nomination verified')
    }
  })

  // Check for potential conflicts
  if (
    event.description.toLowerCase().includes('rocky mount') &&
    event.description.toLowerCase().includes('negotiat')
  ) {
    const treatyLocationFact = REFERENCE_LIBRARY.find((f) => f.id === 'trt-002')
    if (treatyLocationFact) {
      result.status = 'conflict'
      result.notes.push(
        `⚠️ CONFLICT: Treaty was negotiated at White's Fort, not Rocky Mount (${treatyLocationFact.id})`
      )
    }
  }

  return result
}

function main() {
  console.log(
    `${colors.bold}${colors.cyan}═══════════════════════════════════════════${colors.reset}`
  )
  console.log(`${colors.bold}TIMELINE EVENT VALIDATION${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════${colors.reset}\n`)

  const results = timelineEvents.map(validateEvent)

  const verified = results.filter((r) => r.status === 'verified')
  const needsVerification = results.filter((r) => r.status === 'needs-verification')
  const conflicts = results.filter((r) => r.status === 'conflict')

  console.log(`${colors.bold}SUMMARY:${colors.reset}`)
  console.log(`  Total Events: ${timelineEvents.length}`)
  console.log(`  ${colors.green}Verified: ${verified.length}${colors.reset}`)
  console.log(`  ${colors.yellow}Needs Verification: ${needsVerification.length}${colors.reset}`)
  console.log(`  ${colors.red}Conflicts: ${conflicts.length}${colors.reset}\n`)

  if (conflicts.length > 0) {
    console.log(`${colors.bold}${colors.red}⚠️  CONFLICTS FOUND:${colors.reset}\n`)
    conflicts.forEach((r) => {
      console.log(`  ${colors.red}[${r.event.id}]${colors.reset} ${r.event.title}`)
      console.log(`  Date: ${r.event.date}`)
      r.notes.forEach((note) => {
        console.log(`    - ${note}`)
      })
      console.log()
    })
  }

  if (verified.length > 0) {
    console.log(
      `${colors.bold}${colors.green}✓ VERIFIED EVENTS (${verified.length}):${colors.reset}\n`
    )
    verified.slice(0, 10).forEach((r) => {
      console.log(
        `  ${colors.green}[${r.event.id}]${colors.reset} ${r.event.title} (${r.event.date})`
      )
      if (r.matchedFacts.length > 0) {
        console.log(`    Verified by: ${r.matchedFacts.join(', ')}`)
      }
    })
    if (verified.length > 10) {
      console.log(`  ... and ${verified.length - 10} more verified events`)
    }
    console.log()
  }

  if (needsVerification.length > 0) {
    console.log(
      `${colors.bold}${colors.yellow}⚠ NEEDS VERIFICATION (${needsVerification.length}):${colors.reset}\n`
    )
    needsVerification.forEach((r) => {
      console.log(`  ${colors.yellow}[${r.event.id}]${colors.reset} ${r.event.title}`)
      console.log(`    Date: ${r.event.date}`)
      console.log(`    Type: ${r.event.type}`)
      console.log(`    Description: ${r.event.description}`)
      if (r.event.documentId) {
        console.log(`    Document: ${r.event.documentId}`)
      } else {
        console.log(`    ${colors.red}No linked document${colors.reset}`)
      }
      console.log()
    })
  }

  // Recommendations
  console.log(`${colors.bold}${colors.cyan}RECOMMENDATIONS:${colors.reset}\n`)

  if (conflicts.length > 0) {
    console.log(
      `1. ${colors.red}Fix conflicts immediately${colors.reset} - these contradict verified facts`
    )
  }

  if (needsVerification.length > 0) {
    console.log(`2. Verify ${needsVerification.length} events against primary sources`)
    console.log(`   Focus on events with documentId first (have linked primary sources)`)

    const withDocs = needsVerification.filter((r) => r.event.documentId)
    const withoutDocs = needsVerification.filter((r) => !r.event.documentId)

    console.log(`   - ${withDocs.length} events have linked documents (easier to verify)`)
    console.log(`   - ${withoutDocs.length} events need external source research`)
  }

  if (verified.length === timelineEvents.length) {
    console.log(`${colors.green}✓ All timeline events are verified!${colors.reset}`)
  }

  console.log()
  console.log(`${colors.bold}Next Steps:${colors.reset}`)
  console.log(`1. Review events that need verification`)
  console.log(`2. Add verified facts to reference library`)
  console.log(`3. Update timeline-events.json with verification status`)
  console.log()
}

main()
