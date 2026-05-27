#!/usr/bin/env tsx
/* eslint-disable no-console */
/**
 * Pre-Commit Fact-Checker
 *
 * Runs before EVERY commit to validate:
 * 1. New/modified markdown files don't contain known wrong variants
 * 2. Frontmatter passes Zod schema validation
 *
 * Exit codes:
 * - 0: All checks passed
 * - 1: Fact errors found (blocks commit)
 * - 2: Schema validation errors (blocks commit)
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import matter from 'gray-matter'
import { REFERENCE_LIBRARY } from '../lib/dredge/reference-library'
import { DocumentFrontmatterSchema } from '../lib/schemas/document'

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
}

interface FactError {
  file: string
  line: number
  pattern: string
  correctFact: string
  source: string
}

interface SchemaError {
  file: string
  errors: string[]
}

/**
 * Get list of staged markdown files
 */
function getStagedMarkdownFiles(): string[] {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf-8',
    })

    return output
      .split('\n')
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .filter((file) => file.length > 0)
  } catch {
    // If not in a git repo or no staged files, return empty array
    return []
  }
}

/**
 * Check file content against reference library wrong variants
 */
function checkFactErrors(filePath: string, content: string): FactError[] {
  const errors: FactError[] = []
  const lines = content.split('\n')

  REFERENCE_LIBRARY.forEach((fact) => {
    if (!fact.wrongVariants) return

    fact.wrongVariants.forEach((pattern) => {
      const regex = new RegExp(pattern, 'gi')

      lines.forEach((line, index) => {
        if (regex.test(line)) {
          errors.push({
            file: filePath,
            line: index + 1,
            pattern,
            correctFact: fact.claim,
            source: fact.source,
          })
        }
      })
    })
  })

  return errors
}

/**
 * Validate document frontmatter against Zod schema
 */
function validateFrontmatter(filePath: string): SchemaError | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)

    // Only validate documents in content/documents/ and content/people/
    const shouldValidate =
      filePath.includes('content/documents/') || filePath.includes('content/people/')

    if (!shouldValidate) return null

    // Validate documents
    if (filePath.includes('content/documents/')) {
      const result = DocumentFrontmatterSchema.safeParse(data)
      if (!result.success) {
        return {
          file: filePath,
          errors: result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`),
        }
      }
    }

    return null
  } catch (error) {
    return {
      file: filePath,
      errors: [`Failed to parse file: ${error}`],
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log(`${colors.bold}${colors.blue}🔍 Running pre-commit fact-check...${colors.reset}\n`)

  const stagedFiles = getStagedMarkdownFiles()

  if (stagedFiles.length === 0) {
    console.log(`${colors.green}✓ No markdown files to check${colors.reset}`)
    process.exit(0)
  }

  console.log(`Checking ${stagedFiles.length} file(s):\n`)

  let factErrors: FactError[] = []
  const schemaErrors: SchemaError[] = []

  // Check each staged file
  for (const file of stagedFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8')

      // Check for fact errors
      const fileFactErrors = checkFactErrors(file, content)
      factErrors = factErrors.concat(fileFactErrors)

      // Check schema validation
      const schemaError = validateFrontmatter(file)
      if (schemaError) {
        schemaErrors.push(schemaError)
      }

      // Print per-file status
      if (fileFactErrors.length === 0 && !schemaError) {
        console.log(`  ${colors.green}✓${colors.reset} ${file}`)
      } else {
        console.log(`  ${colors.red}✗${colors.reset} ${file}`)
      }
    } catch (error) {
      console.error(`  ${colors.red}✗${colors.reset} ${file} - Read error: ${error}`)
    }
  }

  console.log() // Empty line

  // Report fact errors
  if (factErrors.length > 0) {
    console.log(
      `${colors.bold}${colors.red}❌ FACT ERRORS DETECTED (${factErrors.length})${colors.reset}\n`
    )

    factErrors.forEach((error, index) => {
      console.log(`${colors.bold}Error ${index + 1}:${colors.reset}`)
      console.log(`  File: ${colors.yellow}${error.file}:${error.line}${colors.reset}`)
      console.log(`  Pattern matched: "${error.pattern}"`)
      console.log(`  ${colors.green}Correct:${colors.reset} ${error.correctFact}`)
      console.log(`  ${colors.blue}Source:${colors.reset} ${error.source}`)
      console.log()
    })
  }

  // Report schema errors
  if (schemaErrors.length > 0) {
    console.log(
      `${colors.bold}${colors.red}❌ SCHEMA VALIDATION ERRORS (${schemaErrors.length})${colors.reset}\n`
    )

    schemaErrors.forEach((error, index) => {
      console.log(`${colors.bold}Error ${index + 1}:${colors.reset}`)
      console.log(`  File: ${colors.yellow}${error.file}${colors.reset}`)
      error.errors.forEach((err) => {
        console.log(`    - ${err}`)
      })
      console.log()
    })
  }

  // Exit with error if any issues found
  if (factErrors.length > 0 || schemaErrors.length > 0) {
    console.log(`${colors.bold}${colors.red}COMMIT BLOCKED${colors.reset}`)
    console.log('Fix the errors above and try again.\n')
    process.exit(1)
  }

  // Success
  console.log(`${colors.bold}${colors.green}✓ All checks passed${colors.reset}`)
  console.log(`${factErrors.length} fact errors, ${schemaErrors.length} schema errors\n`)
  process.exit(0)
}

main().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error)
  process.exit(2)
})
