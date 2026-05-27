/**
 * Smart Ticket URL Helper
 *
 * Generates FareHarbor booking URLs for Rocky Mount State Historic Site events.
 * Supports multiple URL patterns:
 * - Default booking page (general admission)
 * - Item-specific URLs (for events with fareHarborId)
 * - Calendar URLs with optional date pre-selection
 *
 * @see https://fareharbor.com/embeds/book/rockymountmuseum/
 */

// =============================================================================
// Constants
// =============================================================================

/**
 * Base URL for Rocky Mount's FareHarbor booking widget.
 * This is the default landing page showing all available items.
 */
export const DEFAULT_FAREHARBOR_URL = 'https://fareharbor.com/embeds/book/rockymountmuseum/'

/**
 * Rocky Mount's FareHarbor shortname (used in URL construction)
 */
export const FAREHARBOR_SHORTNAME = 'rockymountmuseum'

// =============================================================================
// Types
// =============================================================================

/**
 * Minimal event shape required for ticket URL generation.
 * Compatible with both full Event type and partial objects.
 */
export interface TicketableEvent {
  /** Whether the event requires a ticket/booking */
  requiresTicket: boolean
  /** Optional custom booking URL (overrides all other logic) */
  ticketUrl?: string | null
  /** Optional FareHarbor item ID for direct booking */
  fareHarborId?: string | null
}

/**
 * Options for building flexible FareHarbor URLs.
 * Use with buildFareHarborUrl() for maximum control.
 */
export interface FareHarborUrlOptions {
  /** FareHarbor item ID (e.g., "123456" or "ghost-tour") */
  itemId?: string
  /** Date in YYYY-MM-DD format for calendar pre-selection */
  date?: string
  /** Include /calendar/ path segment (default: true when date provided) */
  useCalendarPath?: boolean
}

// =============================================================================
// Core Functions
// =============================================================================

/**
 * Get the ticket URL for an event.
 *
 * Priority order:
 * 1. Custom ticketUrl (if provided, used as-is)
 * 2. FareHarbor item URL (if fareHarborId provided)
 * 3. Default FareHarbor booking page
 * 4. null (if event doesn't require tickets)
 *
 * @param event - Event object with ticket-related fields
 * @returns Booking URL or null for free events
 *
 * @example
 * // Free event
 * getTicketUrl({ requiresTicket: false }) // => null
 *
 * @example
 * // Ticketed event with default booking
 * getTicketUrl({ requiresTicket: true }) // => DEFAULT_FAREHARBOR_URL
 *
 * @example
 * // Event with FareHarbor item ID
 * getTicketUrl({
 *   requiresTicket: true,
 *   fareHarborId: '123456'
 * }) // => 'https://fareharbor.com/embeds/book/rockymountmuseum/items/123456/'
 *
 * @example
 * // Event with custom URL (external ticketing)
 * getTicketUrl({
 *   requiresTicket: true,
 *   ticketUrl: 'https://eventbrite.com/my-event'
 * }) // => 'https://eventbrite.com/my-event'
 */
export function getTicketUrl(event: TicketableEvent): string | null {
  // Free events don't need a ticket URL
  if (!event.requiresTicket) {
    return null
  }

  // Use custom URL if provided (highest priority)
  if (event.ticketUrl) {
    return event.ticketUrl
  }

  // Generate item-specific URL if fareHarborId exists
  if (event.fareHarborId) {
    return getItemUrl(event.fareHarborId)
  }

  // Fall back to default FareHarbor booking
  return DEFAULT_FAREHARBOR_URL
}

/**
 * Generate a direct link to a specific FareHarbor item.
 *
 * Use this when you have the FareHarbor item ID and want to link
 * directly to that item's booking page.
 *
 * @param fareHarborId - The item ID from FareHarbor (numeric or slug)
 * @returns Direct booking URL for the item
 *
 * @example
 * getItemUrl('123456')
 * // => 'https://fareharbor.com/embeds/book/rockymountmuseum/items/123456/'
 *
 * @example
 * getItemUrl('ghost-tour')
 * // => 'https://fareharbor.com/embeds/book/rockymountmuseum/items/ghost-tour/'
 */
export function getItemUrl(fareHarborId: string): string {
  return `https://fareharbor.com/embeds/book/${FAREHARBOR_SHORTNAME}/items/${fareHarborId}/`
}

/**
 * Generate a calendar URL with optional date pre-selection.
 *
 * When a date is provided, the booking widget opens with that date
 * already selected, reducing clicks for the visitor.
 *
 * @param fareHarborId - The item ID from FareHarbor
 * @param date - Optional date in YYYY-MM-DD format to pre-select
 * @returns Calendar URL with or without date pre-selection
 *
 * @example
 * // Calendar without date (shows current month)
 * getCalendarUrl('123456')
 * // => 'https://fareharbor.com/embeds/book/rockymountmuseum/items/123456/calendar/'
 *
 * @example
 * // Calendar with date pre-selected
 * getCalendarUrl('123456', '2026-07-04')
 * // => 'https://fareharbor.com/embeds/book/rockymountmuseum/items/123456/calendar/2026/07/04/'
 */
export function getCalendarUrl(fareHarborId: string, date?: string): string {
  const baseUrl = `https://fareharbor.com/embeds/book/${FAREHARBOR_SHORTNAME}/items/${fareHarborId}/calendar/`

  if (!date) {
    return baseUrl
  }

  // Parse and validate date format (YYYY-MM-DD)
  const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!dateMatch) {
    // Invalid date format, return base calendar URL
    return baseUrl
  }

  const [, year, month, day] = dateMatch
  return `${baseUrl}${year}/${month}/${day}/`
}

/**
 * Flexible FareHarbor URL builder for advanced use cases.
 *
 * Use this when you need fine-grained control over URL generation,
 * such as building URLs dynamically based on user selections.
 *
 * @param options - Configuration options for URL generation
 * @returns Generated FareHarbor booking URL
 *
 * @example
 * // Default booking page
 * buildFareHarborUrl({})
 * // => 'https://fareharbor.com/embeds/book/rockymountmuseum/'
 *
 * @example
 * // Specific item
 * buildFareHarborUrl({ itemId: '123456' })
 * // => 'https://fareharbor.com/embeds/book/rockymountmuseum/items/123456/'
 *
 * @example
 * // Item calendar with date
 * buildFareHarborUrl({ itemId: '123456', date: '2026-07-04' })
 * // => 'https://fareharbor.com/embeds/book/rockymountmuseum/items/123456/calendar/2026/07/04/'
 *
 * @example
 * // Item calendar without specific date
 * buildFareHarborUrl({ itemId: '123456', useCalendarPath: true })
 * // => 'https://fareharbor.com/embeds/book/rockymountmuseum/items/123456/calendar/'
 */
export function buildFareHarborUrl(options: FareHarborUrlOptions = {}): string {
  const { itemId, date, useCalendarPath } = options

  // No item ID = default booking page
  if (!itemId) {
    return DEFAULT_FAREHARBOR_URL
  }

  // Item with calendar path (with or without date)
  if (date || useCalendarPath) {
    return getCalendarUrl(itemId, date)
  }

  // Item without calendar
  return getItemUrl(itemId)
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Check if an event has a custom ticket URL (not the default).
 *
 * Useful for displaying different UI treatments for events with
 * external ticketing vs. FareHarbor booking.
 *
 * @param event - Event object with optional ticketUrl
 * @returns true if event has a non-default ticket URL
 *
 * @example
 * hasCustomTicketUrl({ ticketUrl: 'https://eventbrite.com/event' }) // => true
 * hasCustomTicketUrl({ ticketUrl: null }) // => false
 * hasCustomTicketUrl({}) // => false
 */
export function hasCustomTicketUrl(event: { ticketUrl?: string | null }): boolean {
  return Boolean(event.ticketUrl && event.ticketUrl !== DEFAULT_FAREHARBOR_URL)
}

/**
 * Check if an event uses FareHarbor for booking.
 *
 * Returns true if:
 * - Event has a fareHarborId, OR
 * - Event requires tickets and has no custom ticketUrl
 *
 * @param event - Event object with ticket-related fields
 * @returns true if FareHarbor will be used for booking
 *
 * @example
 * usesFareHarbor({ requiresTicket: true, fareHarborId: '123' }) // => true
 * usesFareHarbor({ requiresTicket: true }) // => true (uses default)
 * usesFareHarbor({ requiresTicket: true, ticketUrl: 'https://other.com' }) // => false
 * usesFareHarbor({ requiresTicket: false }) // => false
 */
export function usesFareHarbor(event: TicketableEvent): boolean {
  if (!event.requiresTicket) {
    return false
  }

  // Has explicit FareHarbor ID
  if (event.fareHarborId) {
    return true
  }

  // No custom URL means default FareHarbor
  return !event.ticketUrl
}
