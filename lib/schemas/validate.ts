import { EventsDataSchema } from './events'
import type { EventsData } from './events'

/**
 * Validates events data against the Zod schema
 * @param data - Raw events data to validate
 * @returns Validated and typed events data
 * @throws ZodError if validation fails
 */
export function validateEventsData(data: unknown): EventsData {
  return EventsDataSchema.parse(data)
}

/**
 * Safely validates events data and returns result with error details
 * @param data - Raw events data to validate
 * @returns Success or error result
 */
export function safeValidateEventsData(data: unknown) {
  return EventsDataSchema.safeParse(data)
}
