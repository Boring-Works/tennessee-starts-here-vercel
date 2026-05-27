'use client'

import { useEffect, useState, useCallback, memo } from 'react'
import { BookingButton } from './BookingButton'

interface MobileStickyCTAProps {
  /**
   * FareHarbor item ID for the event
   */
  itemId?: string | null

  /**
   * Event title for aria-label
   */
  eventTitle: string

  /**
   * Show/hide the CTA
   * @default true
   */
  show?: boolean

  /**
   * Only show on mobile viewports
   * @default true
   */
  mobileOnly?: boolean
}

/**
 * MobileStickyCTA Component
 *
 * Sticky bottom booking button for mobile event detail views.
 * Appears after user scrolls past the hero section.
 *
 * @example
 * ```tsx
 * <MobileStickyCTA
 *   itemId="562803"
 *   eventTitle="Spring Break Camp Week 1"
 * />
 * ```
 */
function MobileStickyCTAComponent({
  itemId,
  eventTitle,
  show = true,
  mobileOnly = true,
}: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Memoized scroll handler for performance
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 300
    setIsVisible(scrolled)
  }, [])

  useEffect(() => {
    if (!show) {
      return
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Defer initial check to avoid synchronous setState in effect
    // Use requestAnimationFrame for proper scheduling
    const rafId = requestAnimationFrame(() => {
      handleScroll()
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [show, handleScroll])

  if (!show) return null

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-40
        transform transition-transform duration-300
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        ${mobileOnly ? 'lg:hidden' : ''}
      `}
      aria-hidden={!isVisible}
    >
      <div className="bg-white border-t border-stone-200 shadow-lg">
        <div className="px-4 py-3">
          <BookingButton
            itemId={itemId}
            variant="primary"
            analyticsEvent="mobile_sticky_cta_click"
            className="w-full justify-center text-base"
            aria-label={`Reserve your spot for ${eventTitle}`}
          >
            Reserve Your Spot
          </BookingButton>
        </div>
      </div>
    </div>
  )
}

export const MobileStickyCTA = memo(MobileStickyCTAComponent)
