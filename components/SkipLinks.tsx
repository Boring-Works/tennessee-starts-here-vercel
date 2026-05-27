'use client'

import { memo, useCallback } from 'react'

/**
 * SkipLinks - Accessibility component for keyboard navigation
 *
 * Provides skip links that allow keyboard users to bypass navigation
 * and jump directly to main content. The links are visually hidden
 * until focused.
 *
 * Usage:
 * - Add <SkipLinks /> at the start of your layout/page body
 * - Ensure the main content area has id="main-content"
 * - Optional: Add id="navigation" to the nav element for "Skip to navigation" link
 *
 * CSS classes are defined in /app/globals.css
 */

interface SkipLinksProps {
  /** Include "Skip to navigation" link (default: false) */
  showNavigationLink?: boolean
  /** Custom main content ID (default: "main-content") */
  mainContentId?: string
  /** Custom navigation ID (default: "main-navigation") */
  navigationId?: string
}

function SkipLinksComponent({
  showNavigationLink = false,
  mainContentId = 'main-content',
  navigationId = 'main-navigation',
}: SkipLinksProps) {
  /**
   * Handle skip link click with focus management
   * Ensures the target element receives focus for screen readers
   */
  const handleSkipClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      const target = document.getElementById(targetId)
      if (target) {
        e.preventDefault()
        // Add tabindex if not focusable
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1')
        }
        target.focus({ preventScroll: false })
        // Scroll into view
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    []
  )

  return (
    <nav className="skip-links" aria-label="Skip navigation">
      <a
        href={`#${mainContentId}`}
        className="skip-link"
        onClick={(e) => handleSkipClick(e, mainContentId)}
      >
        Skip to main content
      </a>
      {showNavigationLink && (
        <a
          href={`#${navigationId}`}
          className="skip-link"
          onClick={(e) => handleSkipClick(e, navigationId)}
        >
          Skip to navigation
        </a>
      )}
    </nav>
  )
}

export const SkipLinks = memo(SkipLinksComponent)
export default SkipLinks
