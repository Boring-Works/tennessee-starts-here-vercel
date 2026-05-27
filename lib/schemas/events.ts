import { z } from 'zod'

/**
 * Event pricing schema (all prices in cents)
 */
export const EventPricingSchema = z.object({
  adult: z.number().int().nonnegative().nullable(),
  senior: z.number().int().nonnegative().nullable(),
  child: z.number().int().nonnegative().nullable(),
  underFive: z.number().int().nonnegative().nullable(),
  members: z.number().int().nonnegative().nullable(),
})

/**
 * Event type enum
 */
export const EventTypeSchema = z.enum(['new', 'enhanced', 'recurring', 'milestone'])

/**
 * Event category enum
 */
export const EventCategorySchema = z.enum([
  'signature',
  'festival',
  'lecture',
  'workshop',
  'camp',
  'education',
  'tour',
  'family',
  'seasonal',
  'digital',
])

/**
 * Main event schema
 */
export const EventSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'ID must be URL-safe (lowercase, hyphens only)'),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD format'),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional(),
  time: z.string().nullable().optional(),
  type: EventTypeSchema,
  category: EventCategorySchema,
  description: z.string().min(50).max(300),
  fareHarborId: z.string().optional(),
  ticketUrl: z.string().url().nullable().optional(),
  requiresTicket: z.boolean(),
  pricing: EventPricingSchema.optional(),
  featured: z.boolean().optional(),
  capacity: z.number().int().positive().optional(),
  ageRecommendation: z.string().optional(),
  speaker: z.string().optional(),
  speakerTitle: z.string().optional(),
})

/**
 * Recurring program schema
 */
export const RecurringProgramSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().optional(),
  description: z.string().min(1),
  schedule: z.string().min(1),
  scheduleNote: z.string().optional(),
  time: z.string().min(1),
  duration: z.string().min(1),
  fareHarborId: z.string().optional(),
  ticketUrl: z.string().url().nullable().optional(),
  requiresTicket: z.boolean(),
  category: EventCategorySchema,
  icon: z.string().optional(),
  pricing: EventPricingSchema.optional(),
  highlights: z.array(z.string()).optional(),
  dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  capacity: z.number().int().positive().optional(),
})

/**
 * First 250 enrollment info schema
 */
export const First250Schema = z.object({
  enrollmentStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  enrollmentEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  ceremonyDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  url: z.string().url(),
})

/**
 * Complete events.json schema
 */
export const EventsDataSchema = z.object({
  events: z.array(EventSchema),
  recurringPrograms: z.record(z.string(), RecurringProgramSchema),
  first250: First250Schema,
})

/**
 * TypeScript types derived from Zod schemas
 */
export type EventPricing = z.infer<typeof EventPricingSchema>
export type EventType = z.infer<typeof EventTypeSchema>
export type EventCategory = z.infer<typeof EventCategorySchema>
export type Event = z.infer<typeof EventSchema>
export type RecurringProgram = z.infer<typeof RecurringProgramSchema>
export type First250 = z.infer<typeof First250Schema>
export type EventsData = z.infer<typeof EventsDataSchema>
