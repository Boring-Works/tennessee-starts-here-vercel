import { memo } from 'react'

/**
 * Generic JSON-LD structured data type
 * Supports standard Schema.org types like Organization, Event, etc.
 */
type JsonLdData = {
  '@context'?: string
  '@type'?: string
  [key: string]: unknown
}

interface JsonLdProps {
  /** Structured data object or array of objects */
  data: JsonLdData | JsonLdData[]
}

/**
 * JsonLd Component
 *
 * Renders JSON-LD structured data for SEO.
 * Memoized to prevent unnecessary script re-rendering.
 *
 * @example
 * ```tsx
 * <JsonLd data={{
 *   "@context": "https://schema.org",
 *   "@type": "Organization",
 *   "name": "Rocky Mount"
 * }} />
 * ```
 */
function JsonLdComponent({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export const JsonLd = memo(JsonLdComponent)
