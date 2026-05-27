#!/usr/bin/env tsx
/**
 * Manual Fact Validation Script
 *
 * Usage: npm run validate:facts
 *
 * Validates ALL markdown files (not just staged) against:
 * 1. Reference library wrong variants
 * 2. Zod schema validation
 *
 * Unlike pre-commit hook, this runs on demand for full repo audits.
 */

import fs from 'node:fs'
import matter from 'gray-matter'
import { REFERENCE_LIBRARY } from '../lib/dredge/reference-library'
import { DocumentFrontmatterSchema } from '../lib/schemas/document'
import { glob } from 'glob'

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
 * Get all markdown files in content/
 */
async function getAllMarkdownFiles(): Promise<string[]> {
  const patterns = [
    'content/documents/**/*.md',
    'content/people/**/*.md',
    'content/collections/**/*.md',
  ]

  const files: string[] = []
  for (const pattern of patterns) {
    const matches = await glob(pattern)
    files.push(...matches)
  }

  return files
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

    // Only validate documents
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
  console.log(
    `${colors.bold}${colors.blue}🔍 Running fact validation on entire repository...${colors.reset}\n`
  )

  const allFiles = await getAllMarkdownFiles()

  console.log(`Found ${allFiles.length} document(s) to check\n`)

  let factErrors: FactError[] = []
  const schemaErrors: SchemaError[] = []
  let checkedFiles = 0

  // Check each file
  for (const file of allFiles) {
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

      checkedFiles++

      // Print per-file status (only show errors)
      if (fileFactErrors.length > 0 || schemaError) {
        console.log(`  ${colors.red}✗${colors.reset} ${file}`)
      }
    } catch (error) {
      console.error(`  ${colors.red}✗${colors.reset} ${file} - Read error: ${error}`)
    }
  }

  console.log() // Empty line

  // Summary
  console.log(`${colors.bold}VALIDATION SUMMARY${colors.reset}`)
  console.log(`  Files checked: ${checkedFiles}`)
  console.log(
    `  Fact errors: ${factErrors.length > 0 ? colors.red : colors.green}${factErrors.length}${colors.reset}`
  )
  console.log(
    `  Schema errors: ${schemaErrors.length > 0 ? colors.red : colors.green}${schemaErrors.length}${colors.reset}`
  )
  console.log()

  // Report fact errors
  if (factErrors.length > 0) {
    console.log(`${colors.bold}${colors.red}❌ FACT ERRORS (${factErrors.length})${colors.reset}\n`)

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
    console.log(`${colors.bold}${colors.red}VALIDATION FAILED${colors.reset}`)
    console.log('Fix the errors above.\n')
    process.exit(1)
  }

  // Success
  console.log(`${colors.bold}${colors.green}✓ All validations passed${colors.reset}\n`)
  process.exit(0)
}

main().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error)
  process.exit(2)
})
