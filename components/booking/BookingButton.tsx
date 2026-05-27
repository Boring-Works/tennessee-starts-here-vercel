'use client'

import { useCallback, memo, useSyncExternalStore } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { trackBeginCheckout } from '@/lib/analytics'

// Hydration-safe client detection using useSyncExternalStore
const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

/** Event pricing structure */
interface EventPricing {
  adult?: number | null
  senior?: number | null
  child?: number | null
  underFive?: number | null
  members?: number | null
}

/** Analytics event data */
interface EventAnalyticsData {
  id: string
  title: string
  fareHarborId?: string
  pricing?: EventPricing | null
}

interface BookingButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onClick'> {
  /**
   * FareHarbor shortname for the company
   * @default 'rockymountmuseum'
   */
  shortname?: string

  /**
   * Optional FareHarbor item ID to open a specific experience
   * If not provided, opens the general calendar
   */
  itemId?: string | null

  /**
   * Fallback URL if JavaScript is disabled or FareHarbor fails to load
   */
  fallbackUrl?: string

  /**
   * Button variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary'

  /**
   * Analytics event name to fire on click (DEPRECATED - use eventData instead)
   */
  analyticsEvent?: string

  /**
   * Event data for comprehensive analytics tracking (GA4 + Facebook Pixel)
   */
  eventData?: EventAnalyticsData

  /**
   * Show phone booking alternative below the button
   * Helpful for older visitors who prefer phone reservations
   * @default false
   */
  showPhoneOption?: boolean
}

/**
 * BookingButton Component
 *
 * Opens FareHarbor Lightframe modal for event booking.
 * Falls back to direct link if JavaScript is disabled.
 *
 * @example
 * ```tsx
 * <BookingButton itemId="562803">
 *   Reserve Your Spot
 * </BookingButton>
 * ```
 */
function BookingButtonComponent({
  shortname = 'rockymountmuseum',
  itemId,
  fallbackUrl,
  variant = 'primary',
  analyticsEvent,
  eventData,
  showPhoneOption = false,
  children = 'Reserve Your Spot',
  className = '',
  ...props
}: BookingButtonProps) {
  // Hydration-safe client detection - avoids useEffect setState pattern
  const isMounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot)

  // Construct the FareHarbor URLs
  const lightboxUrl = itemId
    ? `https://fareharbor.com/embeds/book/${shortname}/items/${itemId}/`
    : `https://fareharbor.com/embeds/book/${shortname}/`

  const directUrl = fallbackUrl || lightboxUrl

  // Handle click for analytics - memoized to prevent recreating on each render
  const handleClick = useCallback(() => {
    // New comprehensive analytics tracking
    if (eventData) {
      trackBeginCheckout(eventData)
    }

    // Legacy analytics event (for backwards compatibility)
    if (analyticsEvent && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', analyticsEvent, {
        event_category: 'Booking',
        event_label: itemId || 'general_calendar',
      })
    }
  }, [eventData, analyticsEvent, itemId])

  // Base styles
  const baseStyles = `
    inline-flex items-center gap-2
    px-6 py-3
    rounded-md
    font-medium
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `

  // Variant styles
  const variantStyles = {
    primary: `
      bg-amber-700 text-white
      hover:bg-amber-800
      focus:ring-amber-500
    `,
    secondary: `
      bg-transparent text-amber-900
      border-2 border-amber-900
      hover:bg-amber-50
      focus:ring-amber-500
    `,
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim()

  // Phone option component (shared between client and SSR renders)
  const phoneOption = showPhoneOption ? (
    <p className="mt-3 text-sm text-stone-600">
      Prefer to book by phone?{' '}
      <a
        href="tel:+14235387396"
        className="font-medium text-amber-800 hover:text-amber-900 underline underline-offset-2"
      >
        Call (423) 538-7396
      </a>
    </p>
  ) : null

  // Client-side: render as button with FareHarbor Lightbox attributes
  if (isMounted) {
    return (
      <div className="inline-flex flex-col items-center">
        <button
          type="button"
          className={combinedClassName}
          data-fh-open={shortname}
          data-fh-item={itemId || undefined}
          onClick={handleClick}
          {...props}
        >
          {children} <span aria-hidden="true">→</span>
        </button>
        {phoneOption}
      </div>
    )
  }

  // SSR: render as link (fallback for no-JS and server-side)
  return (
    <div className="inline-flex flex-col items-center">
      <a href={directUrl} className={combinedClassName} rel="noopener noreferrer" target="_blank">
        {children} <span aria-hidden="true">→</span>
      </a>
      {phoneOption}
    </div>
  )
}

export const BookingButton = memo(BookingButtonComponent)
