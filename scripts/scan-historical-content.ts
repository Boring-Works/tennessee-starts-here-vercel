#!/usr/bin/env tsx
/**
 * Historical Content Scanner
 *
 * Scans entire project for historical claims and validates against reference library.
 *
 * Output:
 * 1. Claims found in research docs
 * 2. Timeline events to validate
 * 3. Suggested additions to reference library
 * 4. Potential fact conflicts
 */

import fs from 'node:fs'
import { glob } from 'glob'
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

interface HistoricalClaim {
  file: string
  line: number
  claim: string
  context: string
  category: 'date' | 'person' | 'location' | 'event' | 'number'
}

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  documentId: string | null
}

interface ValidationResult {
  researchDocs: string[]
  timelineEvents: TimelineEvent[]
  claims: HistoricalClaim[]
  suggestions: string[]
  conflicts: string[]
}

/**
 * Extract potential date claims from text
 */
function extractDateClaims(text: string, filePath: string): HistoricalClaim[] {
  const claims: HistoricalClaim[] = []
  const lines = text.split('\n')

  // Match dates in various formats
  const datePatterns = [
    /(\d{4})-(\d{2})-(\d{2})/g, // YYYY-MM-DD
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/gi,
    /\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}/gi,
  ]

  lines.forEach((line, index) => {
    datePatterns.forEach((pattern) => {
      const matches = line.match(pattern)
      if (matches) {
        matches.forEach((match) => {
          claims.push({
            file: filePath,
            line: index + 1,
            claim: match,
            context: line.trim(),
            category: 'date',
          })
        })
      }
    })
  })

  return claims
}

/**
 * Extract person names mentioned
 */
function extractPersonClaims(text: string, filePath: string): HistoricalClaim[] {
  const claims: HistoricalClaim[] = []
  const lines = text.split('\n')

  // Common historical figures in Rocky Mount history
  const historicalFigures = [
    'William Blount',
    'William Cobb',
    'Andrew Jackson',
    'George Washington',
    'Henry Knox',
    'John Sevier',
    'John Watts',
    'Hanging Maw',
    'Doublehead',
    'Bloody Fellow',
  ]

  lines.forEach((line, index) => {
    historicalFigures.forEach((name) => {
      if (line.includes(name)) {
        claims.push({
          file: filePath,
          line: index + 1,
          claim: name,
          context: line.trim(),
          category: 'person',
        })
      }
    })
  })

  return claims
}

/**
 * Load timeline events from JSON
 */
function loadTimelineEvents(): TimelineEvent[] {
  try {
    const timelinePath = 'content/timeline-events.json'
    const content = fs.readFileSync(timelinePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error('Could not load timeline events:', error)
    return []
  }
}

/**
 * Scan research documents
 */
async function scanResearchDocuments(): Promise<string[]> {
  const patterns = [
    'content/*RESEARCH*.md',
    'content/*FACT*.md',
    'content/*JACKSON*.md',
    'content/*BLOUNT*.md',
    'content/*COBB*.md',
    'content/*CHEROKEE*.md',
  ]

  const files: string[] = []
  for (const pattern of patterns) {
    const matches = await glob(pattern)
    files.push(...matches)
  }

  return [...new Set(files)] // Remove duplicates
}

/**
 * Check if claim matches reference library
 */
function checkAgainstReferenceLibrary(claim: HistoricalClaim): {
  verified: boolean
  fact?: (typeof REFERENCE_LIBRARY)[number]
  conflict?: boolean
} {
  // Check for direct matches
  for (const fact of REFERENCE_LIBRARY) {
    if (fact.claim.toLowerCase().includes(claim.claim.toLowerCase())) {
      return { verified: true, fact }
    }

    // Check wrong variants
    if (fact.wrongVariants) {
      for (const variant of fact.wrongVariants) {
        const regex = new RegExp(variant, 'i')
        if (regex.test(claim.context)) {
          return { verified: false, fact, conflict: true }
        }
      }
    }
  }

  return { verified: false }
}

/**
 * Suggest new facts for reference library
 */
function suggestNewFacts(claims: HistoricalClaim[]): string[] {
  const suggestions: string[] = []

  // Group claims by frequency
  const claimFrequency = new Map<string, number>()
  claims.forEach((claim) => {
    const key = claim.claim.toLowerCase()
    claimFrequency.set(key, (claimFrequency.get(key) || 0) + 1)
  })

  // Suggest claims that appear multiple times but aren't in reference library
  claimFrequency.forEach((count, claim) => {
    if (count >= 2) {
      const checked = checkAgainstReferenceLibrary({
        file: '',
        line: 0,
        claim,
        context: '',
        category: 'date',
      })

      if (!checked.verified) {
        suggestions.push(
          `"${claim}" appears ${count} times across documents - consider adding to reference library`
        )
      }
    }
  })

  return suggestions
}

/**
 * Main execution
 */
async function main() {
  console.log(
    `${colors.bold}${colors.cyan}🔍 SCANNING PROJECT FOR HISTORICAL CONTENT${colors.reset}\n`
  )

  const result: ValidationResult = {
    researchDocs: [],
    timelineEvents: [],
    claims: [],
    suggestions: [],
    conflicts: [],
  }

  // 1. Scan research documents
  console.log(`${colors.blue}Scanning research documents...${colors.reset}`)
  result.researchDocs = await scanResearchDocuments()
  console.log(`  Found ${result.researchDocs.length} research documents\n`)

  // 2. Load timeline events
  console.log(`${colors.blue}Loading timeline events...${colors.reset}`)
  result.timelineEvents = loadTimelineEvents()
  console.log(`  Found ${result.timelineEvents.length} timeline events\n`)

  // 3. Extract claims from research docs (sample first 5)
  console.log(`${colors.blue}Extracting historical claims...${colors.reset}`)
  const samplDocs = result.researchDocs.slice(0, 5)

  for (const docPath of samplDocs) {
    try {
      const content = fs.readFileSync(docPath, 'utf-8')
      const dateClaims = extractDateClaims(content, docPath)
      const personClaims = extractPersonClaims(content, docPath)

      result.claims.push(...dateClaims.slice(0, 3)) // Sample 3 per doc
      result.claims.push(...personClaims.slice(0, 3))
    } catch (_error) {
      // Skip files that can't be read
    }
  }
  console.log(`  Extracted ${result.claims.length} sample claims\n`)

  // 4. Check for conflicts
  console.log(`${colors.blue}Checking for conflicts...${colors.reset}`)
  result.claims.forEach((claim) => {
    const check = checkAgainstReferenceLibrary(claim)
    if (check.conflict) {
      result.conflicts.push(
        `${claim.file}:${claim.line} - "${claim.claim}" conflicts with reference library`
      )
    }
  })
  console.log(
    `  Found ${result.conflicts.length > 0 ? colors.red : colors.green}${result.conflicts.length}${colors.reset} conflicts\n`
  )

  // 5. Generate suggestions
  console.log(`${colors.blue}Generating suggestions...${colors.reset}`)
  result.suggestions = suggestNewFacts(result.claims)
  console.log(`  Generated ${result.suggestions.length} suggestions\n`)

  // OUTPUT REPORT
  console.log(
    `${colors.bold}${colors.cyan}═══════════════════════════════════════════${colors.reset}`
  )
  console.log(`${colors.bold}SCAN RESULTS${colors.reset}\n`)

  console.log(`${colors.bold}📚 Content Inventory:${colors.reset}`)
  console.log(`  Research documents: ${result.researchDocs.length}`)
  console.log(`  Timeline events: ${result.timelineEvents.length}`)
  console.log(`  Sample claims extracted: ${result.claims.length}`)
  console.log()

  if (result.conflicts.length > 0) {
    console.log(`${colors.bold}${colors.red}⚠ CONFLICTS FOUND:${colors.reset}`)
    result.conflicts.forEach((conflict) => {
      console.log(`  - ${conflict}`)
    })
    console.log()
  }

  if (result.suggestions.length > 0) {
    console.log(`${colors.bold}${colors.yellow}💡 SUGGESTIONS:${colors.reset}`)
    result.suggestions.slice(0, 10).forEach((suggestion) => {
      console.log(`  - ${suggestion}`)
    })
    if (result.suggestions.length > 10) {
      console.log(`  ... and ${result.suggestions.length - 10} more`)
    }
    console.log()
  }

  // List research docs
  console.log(`${colors.bold}📄 RESEARCH DOCUMENTS TO VALIDATE:${colors.reset}`)
  result.researchDocs.slice(0, 15).forEach((doc) => {
    console.log(`  - ${doc}`)
  })
  if (result.researchDocs.length > 15) {
    console.log(`  ... and ${result.researchDocs.length - 15} more`)
  }
  console.log()

  // Timeline events sample
  console.log(`${colors.bold}📅 TIMELINE EVENTS (Sample):${colors.reset}`)
  result.timelineEvents.slice(0, 5).forEach((event) => {
    console.log(`  ${colors.cyan}${event.date}${colors.reset} - ${event.title}`)
  })
  if (result.timelineEvents.length > 5) {
    console.log(`  ... and ${result.timelineEvents.length - 5} more events`)
  }
  console.log()

  console.log(`${colors.bold}${colors.green}✓ Scan complete${colors.reset}`)
  console.log(
    `\nNext steps:\n  1. Review conflicts above\n  2. Validate research documents\n  3. Add verified claims to reference library\n`
  )
}

main().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error)
  process.exit(1)
})
