'use client'

import { memo } from 'react'
import styles from './welcome.module.css'

interface BrandStatementProps {
  headline: string
  descriptor: string
  tagline: string
}

export const BrandStatement = memo(function BrandStatement({
  headline,
  descriptor,
  tagline,
}: BrandStatementProps) {
  return (
    <header className={styles.brandContainer}>
      <h1 className={styles.brandHeadline}>{headline}</h1>
      <p className={styles.brandDescriptor}>{descriptor}</p>
      <div className={styles.taglineContainer} aria-label="Site tagline">
        <span className={styles.taglineText}>{tagline}</span>
      </div>
    </header>
  )
})
