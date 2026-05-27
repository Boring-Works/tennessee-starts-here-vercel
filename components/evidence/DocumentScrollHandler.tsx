'use client'

import { useEffect } from 'react'

export function DocumentScrollHandler({ highlightId }: { highlightId?: string }) {
  useEffect(() => {
    if (highlightId) {
      const element = document.getElementById(highlightId)
      if (element) {
        // Small timeout to ensure DOM is ready and layout is settled
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
      }
    }
  }, [highlightId])

  return null
}
