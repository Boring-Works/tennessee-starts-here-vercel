'use client'

import { useEffect, useState } from 'react'
import { trackBeginCheckout } from '@/lib/analytics'

interface BookingButtonProps {
  event: {
    id: string
    title: string
    fareHarborId?: string
    pricing?: {
      adult?: number | null
      senior?: number | null
      child?: number | null
      underFive?: number | null
      members?: number | null
    } | null
  }
  url: string
  className?: string
  children: React.ReactNode
}

/**
 * BookingButton Component (Events Page Variant)
 *
 * Opens FareHarbor booking in a Lightframe modal overlay (keeps users on site).
 * Falls back to direct link if JavaScript is disabled or for non-FareHarbor URLs.
 *
 * Analytics tracking:
 * - GA4 begin_checkout event
 * - Facebook Pixel InitiateCheckout event
 */
export function BookingButton({ event, url, className, children }: BookingButtonProps) {
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state after initial render
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const handleClick = () => {
    // Track the begin_checkout event
    trackBeginCheckout({
      id: event.id,
      title: event.title,
      fareHarborId: event.fareHarborId,
      pricing: event.pricing,
    })
  }

  const isFareHarbor = url.includes('fareharbor')

  // Client-side: Use FareHarbor Lightbox for FareHarbor URLs
  if (isMounted && isFareHarbor) {
    return (
      <button
        type="button"
        className={className}
        data-fh-open="rockymountmuseum"
        data-fh-item={event.fareHarborId || undefined}
        onClick={handleClick}
      >
        {children}
      </button>
    )
  }

  // SSR or non-FareHarbor: render as standard link
  return (
    <a
      href={url}
      className={className}
      onClick={handleClick}
      target={isFareHarbor ? '_blank' : undefined}
      rel={isFareHarbor ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}
