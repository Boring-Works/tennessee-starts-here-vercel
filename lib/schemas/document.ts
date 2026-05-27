import { z } from 'zod'

/**
 * Document Verification Schema
 *
 * Enforces verification structure at build time.
 * Documents with missing verification or single-sourced "verified" claims cannot build.
 */

export const VerificationSchema = z.object({
  status: z.enum(['verified', 'nuance', 'unverified', 'single-source'], {
    message: 'Verification status must be "verified", "nuance", "unverified", or "single-source"',
  }),
  source_count: z.number().min(1, {
    message: 'Verification must include at least 1 source',
  }),
  method: z.string().min(1, {
    message: 'Verification method must be specified',
  }),
  notes: z.string().optional(),
})

export const DocumentFrontmatterSchema = z
  .object({
    id: z.string().min(1, { message: 'Document ID is required' }),
    title: z.string().min(1, { message: 'Document title is required' }),
    date: z
      .union([
        z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: 'Date must be in YYYY-MM-DD format',
        }),
        z.date(),
      ])
      .transform((val) => {
        // Convert Date objects to YYYY-MM-DD strings
        if (val instanceof Date) {
          return val.toISOString().split('T')[0]
        }
        return val
      }),
    content_type: z.enum(
      [
        'letter',
        'speech',
        'testimony',
        'treaty',
        'proclamation',
        'map',
        'newspaper',
        'inventory',
        'report',
        'legal',
        'act',
        'document',
      ],
      {
        message:
          'Content type must be one of: letter, speech, testimony, treaty, proclamation, map, newspaper, inventory, report, legal, act, or document',
      }
    ),
    source: z.string().min(1, { message: 'Primary source is required' }),
    source_url: z.string().url().optional(),
    collection: z.string(),
    author: z.string().optional(),
    recipient: z.string().optional(),
    people_mentioned: z.array(z.string()).optional(),
    verification: VerificationSchema,
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters' })
      .optional(),
  })
  .refine(
    (data) => {
      // If status is "verified", require 2+ sources
      if (data.verification.status === 'verified') {
        return data.verification.source_count >= 2
      }
      // If status is "single-source", require exactly 1 source
      if (data.verification.status === 'single-source') {
        return data.verification.source_count === 1
      }
      return true
    },
    {
      message:
        'VERIFICATION ERROR: "verified" requires source_count >= 2. "single-source" requires source_count === 1.',
      path: ['verification', 'source_count'],
    }
  )
  .refine(
    (data) => {
      // If status is "nuance", require notes explaining the complication
      if (data.verification.status === 'nuance') {
        return data.verification.notes && data.verification.notes.length > 10
      }
      return true
    },
    {
      message:
        'NUANCE ERROR: "nuance" status requires verification.notes explaining the complication',
      path: ['verification', 'notes'],
    }
  )

export type DocumentFrontmatter = z.infer<typeof DocumentFrontmatterSchema>

/**
 * Person Biography Schema
 */
export const PersonFrontmatterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  bio_type: z.enum(['full', 'short']),
  bio_short: z.string().min(10),
  is_cherokee: z.boolean(),
  is_signatory: z.boolean().optional(),
  documents: z.array(z.string()).optional(),
})

export type PersonFrontmatter = z.infer<typeof PersonFrontmatterSchema>

/**
 * Collection Schema
 */
export const CollectionFrontmatterSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(10),
  document_count: z.number().min(0),
  documents: z.array(z.string()),
})

export type CollectionFrontmatter = z.infer<typeof CollectionFrontmatterSchema>
