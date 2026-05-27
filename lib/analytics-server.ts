/**
 * Server-Side Analytics Tracking
 *
 * Uses GA4 Measurement Protocol to track events from webhooks.
 * This enables tracking completed purchases (not just checkout clicks).
 *
 * @see https://developers.google.com/analytics/devguides/collection/protocol/ga4
 */

interface GA4PurchaseItem {
  item_id: string
  item_name: string
  price: number
  quantity: number
}

interface GA4PurchaseEvent {
  transaction_id: string
  value: number
  currency: string
  items: GA4PurchaseItem[]
}

interface GA4RefundEvent {
  transaction_id: string
  value: number
  currency: string
}

/**
 * Send event to GA4 via Measurement Protocol
 */
async function sendToGA4(eventName: string, params: Record<string, unknown>): Promise<boolean> {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID
  const apiSecret = process.env.GA4_API_SECRET

  if (!measurementId || !apiSecret) {
    // Silent fail in development, log in production
    if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line no-console
      console.error(
        '[Analytics] GA4 credentials not configured - skipping server-side tracking (CRITICAL: Revenue data loss)'
      )
    } else {
      // eslint-disable-next-line no-console
      console.warn('[Analytics] GA4 credentials not configured - skipping server-side tracking')
    }
    return false
  }

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`

  const payload = {
    client_id: 'fareharbor-webhook', // Server-side events use a fixed client ID
    events: [
      {
        name: eventName,
        params: {
          ...params,
          engagement_time_msec: 1, // Required for Measurement Protocol
        },
      },
    ],
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    // GA4 Measurement Protocol returns 204 on success
    return response.status === 204 || response.ok
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Analytics] Failed to send GA4 event:', error)
    return false
  }
}

/**
 * Track completed purchase from FareHarbor webhook
 *
 * Fires when a booking is confirmed (booking.created event)
 */
export async function trackPurchase(event: GA4PurchaseEvent): Promise<boolean> {
  return sendToGA4('purchase', {
    transaction_id: event.transaction_id,
    value: event.value,
    currency: event.currency,
    items: event.items,
  })
}

/**
 * Track refund from FareHarbor webhook
 *
 * Fires when a booking is cancelled (booking.cancelled event)
 */
export async function trackRefund(event: GA4RefundEvent): Promise<boolean> {
  return sendToGA4('refund', {
    transaction_id: event.transaction_id,
    value: event.value,
    currency: event.currency,
  })
}

/**
 * Track add_to_cart event (optional - for booking.updated)
 */
export async function trackAddToCart(
  transactionId: string,
  itemName: string,
  value: number
): Promise<boolean> {
  return sendToGA4('add_to_cart', {
    transaction_id: transactionId,
    currency: 'USD',
    value: value,
    items: [{ item_id: transactionId, item_name: itemName, price: value, quantity: 1 }],
  })
}
