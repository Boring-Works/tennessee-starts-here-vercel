import { type NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import crypto from 'node:crypto'
import { trackPurchase, trackRefund } from '@/lib/analytics-server'

/**
 * FareHarbor Webhook Endpoint
 *
 * Receives booking notifications from FareHarbor:
 * - New bookings
 * - Booking updates
 * - Cancellations
 *
 * Webhook secrets (from FareHarbor):
 * - FAREHARBOR_WEBHOOK_SECRET: Primary secret
 * - FAREHARBOR_WEBHOOK_SECRET_ZAPIER: Zapier integration secret
 *
 * Environment Variables:
 * - SLACK_WEBHOOK_URL (optional): Slack channel for booking notifications
 * - BOOKING_LOG_ENABLED (optional): Set to 'true' to enable JSON logging
 */

// ============================================================================
// SIGNATURE VERIFICATION
// ============================================================================

// Verify webhook signature using HMAC SHA-256
function verifySignature(payload: string, signature: string, secret: string): boolean {
  try {
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * FareHarbor Customer Type Rate
 * Represents pricing for a specific customer type (Adult, Child, Senior, etc.)
 */
interface FareHarborCustomerTypeRate {
  pk: number
  customer_prototype: {
    pk: number
    display_name: string // e.g., "Adult", "Child (6-12)", "Senior"
    note?: string
  }
  total: number // Price in cents
  capacity: number // How many of this type can be booked
  custom_field_values?: Array<{
    custom_field: {
      pk: number
      name: string
      type: string
    }
    value: string
  }>
}

/**
 * FareHarbor Customer
 * Individual customer on a booking
 */
interface FareHarborCustomer {
  pk: number
  customer_type_rate: FareHarborCustomerTypeRate
  checkin_status?: {
    name: string
    type: 'checked-in' | 'no-show' | 'pending'
  }
}

/**
 * FareHarbor Availability
 * A specific date/time slot for an experience
 */
interface FareHarborAvailability {
  pk: number
  start_at: string // ISO 8601 datetime
  end_at: string // ISO 8601 datetime
  capacity: number // Total capacity for this slot
  minimum_party_size: number
  maximum_party_size: number
  // Capacity tracking fields (if enabled in FareHarbor)
  // These are useful for tracking remaining spots
  headline?: string // Custom headline for this slot
  custom_field_values?: Array<{
    custom_field: {
      pk: number
      name: string
    }
    value: string
  }>
}

/**
 * FareHarbor Item (Experience)
 * The product/tour being booked
 */
interface FareHarborItem {
  pk: number
  name: string
  headline?: string
  description?: string
  description_text?: string
  cancellation_policy?: string
  cancellation_policy_text?: string
  location?: string
  image_cdn_url?: string
}

/**
 * FareHarbor Contact
 * Primary contact for the booking
 */
interface FareHarborContact {
  name: string
  email: string
  phone: string
  phone_country?: string
  normalized_phone?: string
  is_subscribed?: boolean
}

/**
 * FareHarbor Booking
 * Complete booking record
 */
interface FareHarborBooking {
  pk: number
  uuid: string
  display_id: string // Human-readable booking ID (e.g., "RM-12345")
  status: 'booked' | 'cancelled' | 'rebooked'
  created_at?: string // ISO 8601
  updated_at?: string // ISO 8601

  // Financial
  total: number // Total in cents
  total_gross?: number
  amount_paid?: number
  receipt_total?: number
  receipt_taxes?: number
  receipt_subtotal?: number

  // Contact & Customers
  contact: FareHarborContact
  customers: FareHarborCustomer[]

  // What was booked
  item: FareHarborItem
  availability: FareHarborAvailability

  // Vouchers & Coupons
  voucher_number?: string
  promo_code?: string

  // Internal notes
  note?: string
  confirmation_url?: string
  dashboard_url?: string

  // Affiliate tracking
  affiliate?: {
    pk: number
    name: string
  }

  // Custom fields
  custom_field_values?: Array<{
    custom_field: {
      pk: number
      name: string
      type: string
    }
    value: string
    display_value?: string
  }>
}

/**
 * FareHarbor Webhook Payload
 * The complete webhook payload structure
 */
interface FareHarborWebhookPayload {
  webhook_type: 'booking' | 'item'
  event: 'created' | 'updated' | 'cancelled'
  booking?: FareHarborBooking
}

/**
 * Booking Log Entry
 * Structure for JSON booking logs
 */
interface BookingLogEntry {
  timestamp: string
  event: 'created' | 'updated' | 'cancelled'
  bookingId: string
  eventName: string
  eventDate: string
  ticketsSold: number
  revenue: number // In dollars
  customerName: string
  customerEmail: string
  customerTypes: Array<{
    type: string
    count: number
    subtotal: number
  }>
}

// ============================================================================
// NOTIFICATION HELPERS
// ============================================================================

/**
 * Send Slack notification for booking events
 * Only sends if SLACK_WEBHOOK_URL is configured
 *
 * To set up:
 * 1. Create a Slack app at https://api.slack.com/apps
 * 2. Add "Incoming Webhooks" feature
 * 3. Create a webhook for your channel
 * 4. Set SLACK_WEBHOOK_URL env var
 */
async function sendSlackNotification(
  event: 'created' | 'updated' | 'cancelled',
  booking: FareHarborBooking
): Promise<void> {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!slackWebhookUrl) return

  const totalDollars = (booking.total / 100).toFixed(2)
  const eventDate = new Date(booking.availability.start_at).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  const emoji = event === 'created' ? ':ticket:' : event === 'cancelled' ? ':x:' : ':pencil:'
  const color = event === 'created' ? '#22c55e' : event === 'cancelled' ? '#ef4444' : '#f59e0b'
  const title =
    event === 'created'
      ? 'New Booking'
      : event === 'cancelled'
        ? 'Booking Cancelled'
        : 'Booking Updated'

  try {
    await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attachments: [
          {
            color,
            blocks: [
              {
                type: 'header',
                text: {
                  type: 'plain_text',
                  text: `${emoji} ${title}: ${booking.item.name}`,
                  emoji: true,
                },
              },
              {
                type: 'section',
                fields: [
                  { type: 'mrkdwn', text: `*Booking ID:*\n${booking.display_id}` },
                  { type: 'mrkdwn', text: `*Total:*\n$${totalDollars}` },
                  { type: 'mrkdwn', text: `*Customer:*\n${booking.contact.name}` },
                  { type: 'mrkdwn', text: `*Date:*\n${eventDate}` },
                  {
                    type: 'mrkdwn',
                    text: `*Tickets:*\n${booking.customers?.length || 0} person(s)`,
                  },
                ],
              },
            ],
          },
        ],
      }),
    })
  } catch (error) {
    // Slack notification failure shouldn't break the webhook
    // eslint-disable-next-line no-console
    console.error('[FareHarbor] Slack notification failed:', error)
  }
}

/**
 * Create booking log entry for JSON logging
 * Logs are useful for:
 * - Daily revenue reports
 * - Capacity analysis
 * - Customer analytics
 *
 * In production, you might:
 * - Write to a database instead
 * - Send to a logging service (e.g., Axiom, Datadog)
 * - Append to a file in an S3 bucket
 */
function createBookingLogEntry(
  event: 'created' | 'updated' | 'cancelled',
  booking: FareHarborBooking
): BookingLogEntry {
  const customerTypes = booking.customers?.reduce(
    (acc, customer) => {
      const typeName = customer.customer_type_rate.customer_prototype.display_name
      const existing = acc.find((t) => t.type === typeName)
      if (existing) {
        existing.count++
        existing.subtotal += customer.customer_type_rate.total / 100
      } else {
        acc.push({
          type: typeName,
          count: 1,
          subtotal: customer.customer_type_rate.total / 100,
        })
      }
      return acc
    },
    [] as Array<{ type: string; count: number; subtotal: number }>
  )

  return {
    timestamp: new Date().toISOString(),
    event,
    bookingId: booking.display_id,
    eventName: booking.item.name,
    eventDate: booking.availability.start_at,
    ticketsSold: booking.customers?.length || 0,
    revenue: booking.total / 100,
    customerName: booking.contact.name,
    customerEmail: booking.contact.email,
    customerTypes: customerTypes || [],
  }
}

// ============================================================================
// CAPACITY TRACKING
// ============================================================================

/**
 * CAPACITY TRACKING GUIDE
 *
 * FareHarbor tracks capacity at the availability level. To implement capacity
 * tracking on your site:
 *
 * 1. Store capacity per availability slot:
 *    - When a booking is created, decrement available spots
 *    - When cancelled, increment available spots
 *
 * 2. Database schema suggestion:
 *    CREATE TABLE availability_capacity (
 *      availability_pk INTEGER PRIMARY KEY,
 *      item_pk INTEGER NOT NULL,
 *      start_at TIMESTAMP NOT NULL,
 *      total_capacity INTEGER NOT NULL,
 *      booked_count INTEGER DEFAULT 0,
 *      last_updated TIMESTAMP DEFAULT NOW()
 *    );
 *
 * 3. Update on webhook:
 *    - 'created': INCREMENT booked_count
 *    - 'cancelled': DECREMENT booked_count
 *
 * 4. Display remaining capacity:
 *    remaining = total_capacity - booked_count
 *
 * 5. Consider caching for performance:
 *    - Cache remaining capacity per availability
 *    - Invalidate on webhook events
 *
 * Example implementation:
 *
 * async function updateCapacity(
 *   availabilityPk: number,
 *   event: 'created' | 'cancelled',
 *   customerCount: number
 * ) {
 *   const delta = event === 'created' ? customerCount : -customerCount
 *   await db.execute(
 *     'UPDATE availability_capacity SET booked_count = booked_count + ? WHERE availability_pk = ?',
 *     [delta, availabilityPk]
 *   )
 * }
 */

// ============================================================================
// WEBHOOK HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text()
    const signature = request.headers.get('x-fareharbor-signature') || ''

    // Try both webhook secrets
    const primarySecret = process.env.FAREHARBOR_WEBHOOK_SECRET
    const zapierSecret = process.env.FAREHARBOR_WEBHOOK_SECRET_ZAPIER

    let isValid = false

    if (primarySecret && verifySignature(rawBody, signature, primarySecret)) {
      isValid = true
    } else if (zapierSecret && verifySignature(rawBody, signature, zapierSecret)) {
      isValid = true
    }

    // In development, allow unverified webhooks for testing but warn
    const isDev = process.env.NODE_ENV === 'development'
    if (!isValid) {
      if (isDev) {
        // eslint-disable-next-line no-console
        console.warn('[FareHarbor] Webhook signature invalid - bypassing in development mode')
      } else {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    // Parse payload
    const payload: FareHarborWebhookPayload = JSON.parse(rawBody)

    // Log the webhook (in production, you'd store this or trigger actions)
    // Using console here intentionally for webhook debugging
    // eslint-disable-next-line no-console
    console.log('[FareHarbor Webhook]', {
      type: payload.webhook_type,
      event: payload.event,
      booking_id: payload.booking?.display_id,
      item: payload.booking?.item?.name,
      total: payload.booking?.total ? `$${(payload.booking.total / 100).toFixed(2)}` : null,
      customer: payload.booking?.contact?.name,
      tickets: payload.booking?.customers?.length || 0,
    })

    // Handle different webhook events
    if (payload.webhook_type === 'booking' && payload.booking) {
      const booking = payload.booking
      const totalDollars = booking.total / 100 // FareHarbor sends cents

      // Create log entry for all booking events
      const logEntry = createBookingLogEntry(payload.event, booking)

      // Log booking data (in production, write to database or logging service)
      if (process.env.BOOKING_LOG_ENABLED === 'true') {
        // eslint-disable-next-line no-console
        console.log('[FareHarbor Booking Log]', JSON.stringify(logEntry, null, 2))
      }

      switch (payload.event) {
        case 'created':
          // New booking created - fire GA4 purchase event
          await trackPurchase({
            transaction_id: booking.display_id,
            value: totalDollars,
            currency: 'USD',
            items: [
              {
                item_id: String(booking.item.pk),
                item_name: booking.item.name,
                price: totalDollars,
                quantity: booking.customers?.length || 1,
              },
            ],
          })
          // eslint-disable-next-line no-console
          console.log('[FareHarbor] GA4 purchase event sent:', booking.display_id)

          // Revalidate events page to update availability/capacity display
          // This ensures visitors see updated ticket availability immediately
          revalidatePath('/events')
          revalidatePath('/home') // Homepage may show upcoming events
          // eslint-disable-next-line no-console
          console.log('[FareHarbor] Revalidated /events and /home pages')

          // Send Slack notification (if configured)
          await sendSlackNotification('created', booking)

          /**
           * CAPACITY TRACKING HOOK
           * Uncomment and implement when ready to track capacity:
           *
           * await updateCapacity(
           *   booking.availability.pk,
           *   'created',
           *   booking.customers?.length || 1
           * )
           */
          break

        case 'updated':
          // Booking modified - could be date change, party size change, etc.
          // eslint-disable-next-line no-console
          console.log('[FareHarbor] Booking updated:', booking.display_id)

          // Revalidate pages in case capacity changed
          revalidatePath('/events')

          // Send Slack notification (if configured)
          await sendSlackNotification('updated', booking)
          break

        case 'cancelled':
          // Booking cancelled - fire GA4 refund event
          await trackRefund({
            transaction_id: booking.display_id,
            value: totalDollars,
            currency: 'USD',
          })
          // eslint-disable-next-line no-console
          console.log('[FareHarbor] GA4 refund event sent:', booking.display_id)

          // Revalidate events page - spots are now available again
          revalidatePath('/events')
          // eslint-disable-next-line no-console
          console.log('[FareHarbor] Revalidated /events page (cancellation)')

          // Send Slack notification (if configured)
          await sendSlackNotification('cancelled', booking)

          /**
           * CAPACITY TRACKING HOOK
           * Uncomment and implement when ready to track capacity:
           *
           * await updateCapacity(
           *   booking.availability.pk,
           *   'cancelled',
           *   booking.customers?.length || 1
           * )
           */
          break
      }
    }

    // Acknowledge receipt
    return NextResponse.json({
      received: true,
      event: payload.event,
      booking_id: payload.booking?.display_id,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[FareHarbor Webhook Error]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/fareharbor-webhook',
    accepts: 'POST',
    description: 'FareHarbor booking webhook receiver',
  })
}
