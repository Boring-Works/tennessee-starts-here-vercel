#!/usr/bin/env tsx
import { getReferenceStats } from '../lib/dredge/reference-library'

const stats = getReferenceStats()
console.log('Reference Library Statistics:')
console.log('============================')
console.log(`Total Facts: ${stats.totalFacts}`)
console.log(`\nBy Category:`)
Object.entries(stats.byCategory)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(`  ${cat.padEnd(15)}: ${count}`)
  })
console.log(`\nBy Confidence:`)
Object.entries(stats.byConfidence).forEach(([conf, count]) => {
  console.log(`  ${conf.padEnd(15)}: ${count}`)
})
console.log(`\nError Detection:`)
console.log(`  Facts with wrongVariants: ${stats.factsWithWrongVariants}`)
console.log(`  Total Error Patterns: ${stats.totalWrongVariantPatterns}`)
