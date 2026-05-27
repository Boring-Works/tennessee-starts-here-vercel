/**
 * Event data schemas and validation utilities
 *
 * All prices are in CENTS (not dollars)
 *
 * @example
 * ```typescript
 * import { EventsDataSchema, validateEventsData } from '@/lib/schemas'
 *
 * // Validate raw data
 * const data = validateEventsData(rawData)
 *
 * // Access typed data
 * const event = data.events[0]
 * const adultPrice = event.pricing?.adult // number in cents or null
 * ```
 */

export * from './events'
export * from './validate'
