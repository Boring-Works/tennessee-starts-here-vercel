/**
 * Analytics Tracking Utilities
 *
 * Centralized tracking functions for GA4 and Facebook Pixel
 */

// Event data structure for begin_checkout tracking
export interface CheckoutEvent {
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

/**
 * Track begin_checkout event in GA4
 * Fires when user clicks "Reserve Your Spot" on an event
 */
export function trackBeginCheckout(event: CheckoutEvent): void {
  // Determine the price to send (use lowest available non-null price)
  let price = 0
  if (event.pricing) {
    const prices = [
      event.pricing.adult,
      event.pricing.senior,
      event.pricing.child,
      event.pricing.members,
    ].filter((p): p is number => p !== null && p !== undefined)

    if (prices.length > 0) {
      price = Math.min(...prices)
    }
  }

  // Send to GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: price,
      items: [
        {
          item_id: event.fareHarborId || event.id,
          item_name: event.title,
          price: price,
        },
      ],
    })
  }

  // Send to Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: event.title,
      content_ids: [event.fareHarborId || event.id],
      content_type: 'product',
      value: price,
      currency: 'USD',
    })
  }
}

/**
 * Track page view in GA4
 */
export function trackPageView(url: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    })
  }

  // Track page view in Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView')
  }
}

// TypeScript declarations for global window objects
declare global {
  interface Window {
    gtag?: (command: 'event' | 'config', targetId: string, params?: Record<string, unknown>) => void
    fbq?: (command: 'track' | 'init', eventName: string, params?: Record<string, unknown>) => void
  }
}
