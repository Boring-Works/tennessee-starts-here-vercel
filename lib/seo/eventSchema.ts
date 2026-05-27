import siteInfo from '@/data/siteInfo.json'

const SITE_URL = 'https://tennesseestartshere.com'
const DEFAULT_BOOKING_URL = 'https://fareharbor.com/embeds/book/rockymountmuseum/'

// ============================================================================
// Breadcrumb Schema
// ============================================================================

interface BreadcrumbItem {
  name: string
  url: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ============================================================================
// Event Schema Types
// ============================================================================

/**
 * Event pricing in cents (matching events.json schema)
 */
interface EventPricing {
  adult: number | null
  senior: number | null
  child: number | null
  underFive: number | null
  members: number | null
}

/**
 * Event status for Schema.org markup
 */
type EventStatus = 'scheduled' | 'postponed' | 'cancelled' | 'rescheduled'

interface EventInput {
  id: string
  title: string
  date: string
  endDate?: string | null
  time?: string | null
  description: string
  requiresTicket: boolean
  ticketUrl?: string | null
  pricing?: EventPricing | null
  speaker?: string | null
  speakerTitle?: string | null
  image?: string | null
  category?: string | null
  status?: EventStatus
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Maps event status to Schema.org EventStatusType
 */
function getEventStatusUrl(status?: EventStatus): string {
  const statusMap: Record<EventStatus, string> = {
    scheduled: 'https://schema.org/EventScheduled',
    postponed: 'https://schema.org/EventPostponed',
    cancelled: 'https://schema.org/EventCancelled',
    rescheduled: 'https://schema.org/EventRescheduled',
  }
  return statusMap[status || 'scheduled']
}

/**
 * Converts 12-hour time format to 24-hour ISO time
 * @example "2:00 PM" -> "14:00:00"
 * @example "9:00 AM - 3:00 PM" -> "09:00:00" (extracts start time)
 */
function convertTo24Hour(time: string): string {
  // Handle time ranges like "9:00 AM - 3:00 PM" - use start time
  const timeStr = time.includes('-') ? time.split('-')[0].trim() : time
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return '10:00:00'
  const [, hour, minute, period] = match
  let h = parseInt(hour, 10)
  if (period.toUpperCase() === 'PM' && h !== 12) h += 12
  if (period.toUpperCase() === 'AM' && h === 12) h = 0
  return `${h.toString().padStart(2, '0')}:${minute}:00`
}

/**
 * Extracts end time from a time range string
 * @example "9:00 AM - 3:00 PM" -> "15:00:00"
 */
function extractEndTime(time: string): string | null {
  if (!time.includes('-')) return null
  const endTimeStr = time.split('-')[1].trim()
  return convertTo24Hour(endTimeStr)
}

/**
 * Converts cents to dollars for Schema.org price
 * @example 1200 -> 12.00
 */
function centsToDollars(cents: number | null | undefined): number | undefined {
  if (cents === null || cents === undefined) return undefined
  return cents / 100
}

/**
 * Determines if an event is free based on pricing
 */
function isEventFree(requiresTicket: boolean, pricing?: EventPricing | null): boolean {
  if (!requiresTicket) return true
  if (!pricing) return false

  // Check if all prices are 0 or null
  const prices = [pricing.adult, pricing.senior, pricing.child]
  const hasAnyPrice = prices.some((p) => p !== null && p !== undefined && p > 0)
  return !hasAnyPrice
}

// ============================================================================
// Event Schema Generator
// ============================================================================

/**
 * Generates Schema.org Event structured data for a single event
 *
 * Enhanced features:
 * - eventStatus (EventScheduled, EventPostponed, EventCancelled, EventRescheduled)
 * - eventAttendanceMode (OfflineEventAttendanceMode for in-person events)
 * - organizer (Rocky Mount State Historic Site as Museum with full contact info)
 * - performer (for lectures/presentations with speakers)
 * - offers (detailed ticket pricing with multiple tiers, availability)
 * - image (event image if available)
 * - isAccessibleForFree (true for free events)
 * - geo coordinates for the location
 *
 * @see https://schema.org/Event
 * @see https://developers.google.com/search/docs/appearance/structured-data/event
 */
export function generateEventSchema(event: EventInput) {
  const startDateTime = event.time ? `${event.date}T${convertTo24Hour(event.time)}` : event.date

  // Calculate end date/time
  let endDateTime: string | undefined
  if (event.endDate) {
    // Multi-day event: use end date with end time if available
    const endTime = event.time ? extractEndTime(event.time) : null
    endDateTime = endTime ? `${event.endDate}T${endTime}` : event.endDate
  } else if (event.time) {
    // Same-day event with time range
    const endTime = extractEndTime(event.time)
    if (endTime) {
      endDateTime = `${event.date}T${endTime}`
    }
  }

  // Determine if event is free
  const isFreeEvent = isEventFree(event.requiresTicket, event.pricing)

  // Build the base schema
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: startDateTime,
    endDate: endDateTime,
    eventStatus: getEventStatusUrl(event.status),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: siteInfo.site.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteInfo.location.address.street,
        addressLocality: siteInfo.location.address.city,
        addressRegion: 'TN',
        postalCode: siteInfo.location.address.zip,
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteInfo.location.coordinates.lat,
        longitude: siteInfo.location.coordinates.lng,
      },
    },
    organizer: {
      '@type': 'Museum',
      name: siteInfo.site.name,
      url: SITE_URL,
      telephone: siteInfo.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteInfo.location.address.street,
        addressLocality: siteInfo.location.address.city,
        addressRegion: 'TN',
        postalCode: siteInfo.location.address.zip,
        addressCountry: 'US',
      },
    },
    url: `${SITE_URL}/events#${event.id}`,
    isAccessibleForFree: isFreeEvent,
  }

  // Add performer for lectures/presentations with speakers
  if (event.speaker) {
    schema.performer = {
      '@type': 'Person',
      name: event.speaker,
      ...(event.speakerTitle && { jobTitle: event.speakerTitle }),
    }
  }

  // Add image if available
  if (event.image) {
    schema.image = event.image.startsWith('http') ? event.image : `${SITE_URL}${event.image}`
  }

  // Build offers based on ticket requirements and pricing
  if (event.requiresTicket && event.pricing) {
    const ticketUrl = event.ticketUrl || DEFAULT_BOOKING_URL
    const offers: Array<Record<string, unknown>> = []

    // Adult pricing
    if (event.pricing.adult !== null && event.pricing.adult !== undefined) {
      offers.push({
        '@type': 'Offer',
        name: 'Adult',
        price: centsToDollars(event.pricing.adult),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: ticketUrl,
        validFrom: new Date().toISOString().split('T')[0],
      })
    }

    // Senior pricing
    if (event.pricing.senior !== null && event.pricing.senior !== undefined) {
      offers.push({
        '@type': 'Offer',
        name: 'Senior (65+)',
        price: centsToDollars(event.pricing.senior),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: ticketUrl,
        validFrom: new Date().toISOString().split('T')[0],
      })
    }

    // Child pricing
    if (event.pricing.child !== null && event.pricing.child !== undefined) {
      offers.push({
        '@type': 'Offer',
        name: 'Child (6-17)',
        price: centsToDollars(event.pricing.child),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: ticketUrl,
        validFrom: new Date().toISOString().split('T')[0],
      })
    }

    // Free for children under 5
    if (event.pricing.underFive === 0) {
      offers.push({
        '@type': 'Offer',
        name: 'Children under 6',
        price: 0,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: ticketUrl,
      })
    }

    // Member pricing
    if (event.pricing.members !== null && event.pricing.members !== undefined) {
      offers.push({
        '@type': 'Offer',
        name: 'Members',
        price: centsToDollars(event.pricing.members),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: ticketUrl,
        eligibleCustomerType: 'https://schema.org/Member',
      })
    }

    // Use single offer if only one, otherwise use array
    schema.offers = offers.length === 1 ? offers[0] : offers.length > 0 ? offers : undefined
  } else if (event.requiresTicket) {
    // Ticketed but no pricing info - link to booking page
    schema.offers = {
      '@type': 'Offer',
      url: event.ticketUrl || DEFAULT_BOOKING_URL,
      availability: 'https://schema.org/InStock',
    }
  } else {
    // Free event
    schema.offers = {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/events#${event.id}`,
    }
  }

  return schema
}

// ============================================================================
// Events List Schema
// ============================================================================

/**
 * Generates Schema.org ItemList structured data for a list of events
 *
 * Used on the events index page to provide a list of upcoming events
 * with basic information for each event in the list.
 *
 * @see https://schema.org/ItemList
 */
export function generateEventsListSchema(events: EventInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '2026 Events at Rocky Mount State Historic Site',
    description:
      "Explore Rocky Mount's America 250 commemorative events - living history, lectures, festivals, and more at Tennessee's first territorial capitol.",
    numberOfItems: events.length,
    itemListElement: events.slice(0, 20).map((event, index) => {
      const isFreeEvent = isEventFree(event.requiresTicket, event.pricing)

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Event',
          name: event.title,
          startDate: event.date,
          endDate: event.endDate || undefined,
          description: `${event.description.slice(0, 150)}...`,
          url: `${SITE_URL}/events#${event.id}`,
          eventStatus: getEventStatusUrl(event.status),
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          isAccessibleForFree: isFreeEvent,
          location: {
            '@type': 'Place',
            name: siteInfo.site.name,
            address: {
              '@type': 'PostalAddress',
              addressLocality: siteInfo.location.address.city,
              addressRegion: 'TN',
              addressCountry: 'US',
            },
          },
          ...(event.speaker && {
            performer: {
              '@type': 'Person',
              name: event.speaker,
            },
          }),
        },
      }
    }),
  }
}

// ============================================================================
// Type Exports
// ============================================================================

export type { EventInput, EventPricing, EventStatus }
