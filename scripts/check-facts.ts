#!/usr/bin/env npx tsx
/* eslint-disable no-console */
/**
 * Historical Fact Checker
 * Scans .md and .ts files for known historical errors using the reference library
 *
 * Usage:
 *   npx tsx scripts/check-facts.ts                    # Scan all files
 *   npx tsx scripts/check-facts.ts content/           # Scan specific directory
 *   npx tsx scripts/check-facts.ts --verbose          # Show all matches with context
 *   npx tsx scripts/check-facts.ts --json             # Output as JSON
 *
 * Add to package.json:
 *   "check:facts": "tsx scripts/check-facts.ts"
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { checkForErrors, getReferenceStats, type ErrorMatch } from '../lib/dredge/reference-library'

// Default directories to scan
const DEFAULT_SCAN_DIRS = ['content', 'lib', 'app', 'components', 'data']

// File extensions to scan
const SCAN_EXTENSIONS = ['.md', '.ts', '.tsx', '.json']

// Directories to skip
const SKIP_DIRS = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  '_archive',
  'Historical', // Primary source transcriptions (external directory)
  'verified-sources', // Primary source documents (external directory)
]

// Files to skip (contain the patterns themselves or document error corrections)
const SKIP_FILES = [
  'reference-library.ts', // Contains the wrongVariants patterns
  'check-facts.ts', // This script
  'PROTECTED-FILES.md', // Documentation of primary sources
]

// File name patterns that indicate research/fact-check documents (skip these)
const SKIP_FILE_PATTERNS = [
  /fact-check/i, // Fact-checking documents
  /ADVISORY/i, // Advisory documents (research notes)
  /WOW-IMPLEMENTATION/i, // Implementation review documents
  /transcription/i, // Primary source transcriptions
  /\bletter-/i, // Historical letters
  /correspondence/i, // Historical correspondence
  /treaty-.*-\d{4}/i, // Treaty documents (e.g., treaty-holston-1791)
  /gazette-\d{4}/i, // Newspaper excerpts (e.g., knoxville-gazette-1791)
  /knoxville-gazette/i, // Knoxville Gazette articles (primary sources)
]

// Content patterns that indicate we're DOCUMENTING an error, not making it
// If these appear near a match, it's likely explaining the correction
const CORRECTION_INDICATORS = [
  'not mary',
  'was not',
  'not his wife',
  'incorrect',
  'wrong',
  'error',
  'correction',
  'should be',
  'actually',
  'mistakenly',
  'sister, not',
  'not wife',
  "william's sister", // Family tree showing Mary as sister
  'sister)',
  'fact-check', // Fact-checking documents
  'fact check',
  'verify',
  'false positive',
  // Other historic sites (not Rocky Mount)
  'carter mansion', // Carter Mansion in Elizabethton
  'sycamore shoals',
  'tipton-haynes',
]

interface FileError {
  file: string
  errors: ErrorMatch[]
}

function getAllFiles(dir: string, files: string[] = []): string[] {
  if (!fs.existsSync(dir)) return files

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // Skip primary source directories
      const shouldSkipDir = SKIP_DIRS.includes(entry.name) || fullPath.includes('content/documents')

      if (!shouldSkipDir) {
        getAllFiles(fullPath, files)
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name)
      const shouldSkipFile =
        SKIP_FILES.includes(entry.name) ||
        SKIP_FILE_PATTERNS.some((pattern) => pattern.test(entry.name))
      if (SCAN_EXTENSIONS.includes(ext) && !shouldSkipFile) {
        files.push(fullPath)
      }
    }
  }

  return files
}

/**
 * Check if a match is likely documenting a correction rather than making the error
 */
function isLikelyCorrection(content: string, matchIndex: number): boolean {
  // Get surrounding context (200 chars before and after)
  const start = Math.max(0, matchIndex - 200)
  const end = Math.min(content.length, matchIndex + 200)
  const context = content.slice(start, end).toLowerCase()

  // Check if any correction indicators appear nearby
  return CORRECTION_INDICATORS.some((indicator) => context.includes(indicator))
}

function scanFile(filePath: string): FileError | null {
  const content = fs.readFileSync(filePath, 'utf-8')

  // Check for skip directive in file
  if (content.includes('fact-check: skip') || content.includes('fact-check:skip')) {
    return null
  }

  let errors = checkForErrors(content)

  if (errors.length === 0) return null

  // Filter out likely corrections (where we're documenting the error, not making it)
  errors = errors.filter((e) => !isLikelyCorrection(content, e.matchIndex))

  if (errors.length === 0) return null

  // Add line numbers to errors
  const lines = content.split('\n')
  for (const error of errors) {
    let charCount = 0
    for (let i = 0; i < lines.length; i++) {
      charCount += lines[i].length + 1 // +1 for newline
      if (charCount > error.matchIndex) {
        ;(error as ErrorMatch & { lineNumber: number }).lineNumber = i + 1
        break
      }
    }
  }

  return { file: filePath, errors }
}

function main() {
  const args = process.argv.slice(2)
  const verbose = args.includes('--verbose')
  const jsonOutput = args.includes('--json')
  const statsOnly = args.includes('--stats')

  // Filter out flags to get scan paths
  const scanPaths = args.filter((a) => !a.startsWith('--'))
  const dirsToScan = scanPaths.length > 0 ? scanPaths : DEFAULT_SCAN_DIRS

  // Show reference library stats
  const stats = getReferenceStats()

  if (statsOnly) {
    console.log('\nReference Library Statistics:')
    console.log(`  Total facts: ${stats.totalFacts}`)
    console.log(`  Facts with error patterns: ${stats.factsWithWrongVariants}`)
    console.log(`  Total error patterns: ${stats.totalWrongVariantPatterns}`)
    console.log('\n  By category:')
    for (const [cat, count] of Object.entries(stats.byCategory)) {
      console.log(`    ${cat}: ${count}`)
    }
    console.log('\n  By confidence:')
    for (const [conf, count] of Object.entries(stats.byConfidence)) {
      console.log(`    ${conf}: ${count}`)
    }
    process.exit(0)
  }

  // Collect all files to scan
  let allFiles: string[] = []
  for (const dir of dirsToScan) {
    if (fs.existsSync(dir)) {
      if (fs.statSync(dir).isFile()) {
        allFiles.push(dir)
      } else {
        allFiles = allFiles.concat(getAllFiles(dir))
      }
    }
  }

  if (!jsonOutput) {
    console.log(`\nScanning ${allFiles.length} files for historical errors...`)
    console.log(
      `Reference library: ${stats.totalFacts} facts, ${stats.totalWrongVariantPatterns} error patterns\n`
    )
  }

  // Scan all files
  const allErrors: FileError[] = []
  let filesWithErrors = 0

  for (const file of allFiles) {
    const result = scanFile(file)
    if (result) {
      allErrors.push(result)
      filesWithErrors++
    }
  }

  // Output results
  if (jsonOutput) {
    console.log(
      JSON.stringify(
        {
          scanned: allFiles.length,
          filesWithErrors,
          totalErrors: allErrors.reduce((sum, f) => sum + f.errors.length, 0),
          files: allErrors,
        },
        null,
        2
      )
    )
    process.exit(filesWithErrors > 0 ? 1 : 0)
  }

  if (allErrors.length === 0) {
    console.log('No historical errors detected.')
    process.exit(0)
  }

  // Group by severity
  const critical: FileError[] = []
  const high: FileError[] = []
  const medium: FileError[] = []

  for (const fileError of allErrors) {
    const hasCritical = fileError.errors.some((e) => e.severity === 'critical')
    const hasHigh = fileError.errors.some((e) => e.severity === 'high')
    if (hasCritical) critical.push(fileError)
    else if (hasHigh) high.push(fileError)
    else medium.push(fileError)
  }

  console.log(`Found errors in ${filesWithErrors} files:\n`)

  if (critical.length > 0) {
    console.log('=== CRITICAL ===\n')
    for (const fe of critical) {
      console.log(`  ${fe.file}`)
      for (const e of fe.errors.filter((e) => e.severity === 'critical')) {
        const lineNum = (e as ErrorMatch & { lineNumber?: number }).lineNumber || '?'
        console.log(`    Line ${lineNum}: "${e.matchedText}"`)
        if (verbose) {
          console.log(`      Context: ...${e.context}...`)
          console.log(`      Correct: ${e.factClaim}`)
        }
      }
      console.log()
    }
  }

  if (high.length > 0) {
    console.log('=== HIGH PRIORITY ===\n')
    for (const fe of high) {
      console.log(`  ${fe.file}`)
      for (const e of fe.errors.filter((e) => e.severity === 'high')) {
        const lineNum = (e as ErrorMatch & { lineNumber?: number }).lineNumber || '?'
        console.log(`    Line ${lineNum}: "${e.matchedText}"`)
        if (verbose) {
          console.log(`      Context: ...${e.context}...`)
          console.log(`      Correct: ${e.factClaim}`)
        }
      }
      console.log()
    }
  }

  if (medium.length > 0 && verbose) {
    console.log('=== MEDIUM PRIORITY ===\n')
    for (const fe of medium) {
      console.log(`  ${fe.file}`)
      for (const e of fe.errors) {
        const lineNum = (e as ErrorMatch & { lineNumber?: number }).lineNumber || '?'
        console.log(`    Line ${lineNum}: "${e.matchedText}"`)
        if (verbose) {
          console.log(`      Context: ...${e.context}...`)
        }
      }
      console.log()
    }
  } else if (medium.length > 0) {
    console.log(`(${medium.length} medium-priority errors omitted, use --verbose to show)\n`)
  }

  const totalErrors = allErrors.reduce((sum, f) => sum + f.errors.length, 0)
  console.log(`\nSummary: ${totalErrors} error(s) in ${filesWithErrors} file(s)`)
  console.log('Run with --verbose to see full context')

  // Exit with error code if critical/high errors found
  if (critical.length > 0 || high.length > 0) {
    process.exit(1)
  }
}

main()
