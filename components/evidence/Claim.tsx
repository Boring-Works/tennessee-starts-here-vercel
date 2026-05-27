import Link from 'next/link'
import type { ReactNode } from 'react'

interface ClaimProps {
  /** Document ID to link to */
  doc: string
  /** Optional passage/anchor within the document */
  passage?: string
  /** The claim text content */
  children: ReactNode
}

/**
 * Claim component - creates inline citation links to source documents.
 * Renders as subtle dotted underline that turns gold on hover.
 * Used for verifiable historical claims that link to primary sources.
 */
export function Claim({ doc, passage, children }: ClaimProps) {
  const href = passage ? `/evidence/documents/${doc}#${passage}` : `/evidence/documents/${doc}`

  return (
    <Link
      href={href}
      className="border-b border-dotted border-current/50 hover:border-solid hover:border-gold-leaf hover:text-gold-leaf focus:outline-none focus:ring-2 focus:ring-gold-leaf focus:ring-offset-1 rounded-sm transition-colors duration-200"
      aria-label={`View source document for: ${typeof children === 'string' ? children : 'this claim'}`}
    >
      {children}
    </Link>
  )
}
