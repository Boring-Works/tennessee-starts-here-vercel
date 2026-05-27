'use client'

import { useState } from 'react'
import styles from './page.module.css'

export function ContextPanel({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.contextPanel}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.contextToggle}
        aria-expanded={isOpen}
      >
        {isOpen ? 'Hide context' : 'About this document →'}
      </button>
      <div
        className={`${styles.contextContent} ${isOpen ? styles.contextContentOpen : ''}`}
        aria-hidden={!isOpen}
      >
        <p className={styles.contextText}>{children}</p>
      </div>
    </div>
  )
}
