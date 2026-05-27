import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import type { Document } from '@/lib/evidence/types'
import { VerificationBadge } from './VerificationBadge'
import { DocumentScrollHandler } from './DocumentScrollHandler'

interface DocumentViewerProps {
  document: Document
  highlightId?: string
}

// Custom sanitization schema that allows id and class on spans for passage highlighting
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    span: [...(defaultSchema.attributes?.span ?? []), 'id', 'className'],
  },
}

export function DocumentViewer({ document: doc, highlightId }: DocumentViewerProps) {
  // Transform content: convert <passage> tags to spans with IDs
  const transformedContent = doc.content.replace(
    /<passage id="([^"]+)">([\s\S]*?)<\/passage>/g,
    (_, id, content) => `<span id="${id}" class="passage">${content.trim()}</span>`
  )

  return (
    <article className="max-w-3xl mx-auto">
      <nav
        className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:z-50 focus-within:bg-midnight focus-within:p-2"
        aria-label="Skip navigation"
      >
        <a href="#document-content" className="text-gold-leaf underline">
          Skip to document content
        </a>
        {' | '}
        <a href="#document-source" className="text-gold-leaf underline">
          Skip to source
        </a>
      </nav>

      {/* Handle scrolling behavior on client */}
      <DocumentScrollHandler highlightId={highlightId} />

      <header className="mb-8 pb-6 border-b border-white/10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="font-serif text-3xl text-gold-leaf">{doc.title}</h1>
          <VerificationBadge verification={doc.verification} />
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-almanac-parchment/60">
          <span>
            {new Date(doc.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </span>
          <span className="capitalize">{doc.content_type}</span>
          {doc.collection && <span className="text-gold-leaf/60">{doc.collection}</span>}
        </div>
      </header>

      <div
        id="document-content"
        className="prose prose-invert prose-gold max-w-none
          prose-headings:font-serif prose-headings:text-gold-leaf
          prose-p:text-almanac-parchment/80 prose-p:leading-relaxed
          prose-strong:text-almanac-parchment prose-strong:font-semibold
          prose-a:text-gold-leaf prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-gold-leaf/30 prose-blockquote:text-almanac-parchment/70
          prose-hr:border-white/10"
      >
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
          components={{
            // Handle passage spans with highlighting
            span: (componentProps) => {
              // Defensive: handle cases where props might be undefined or malformed
              // react-markdown v10 may pass undefined props in certain edge cases
              const props = componentProps ?? {}
              const id = typeof props.id === 'string' ? props.id : undefined
              const className = typeof props.className === 'string' ? props.className : undefined
              const children = props.children
              const isHighlighted = Boolean(id && id === highlightId)
              const isPassage = className === 'passage'

              return (
                <span
                  id={id}
                  className={`
                    ${isPassage ? 'block my-4 py-3 px-4 rounded border-l-4 border-gold-leaf/30 bg-white/5' : ''}
                    ${isHighlighted ? 'bg-gold-leaf/20 border-gold-leaf scroll-mt-24 animate-pulse-once' : ''}
                  `.trim()}
                >
                  {children}
                </span>
              )
            },
          }}
        >
          {transformedContent}
        </ReactMarkdown>
      </div>

      <footer id="document-source" className="mt-12 pt-6 border-t border-white/10">
        <h2 className="font-serif text-lg text-gold-leaf mb-3">Source</h2>
        <p className="text-sm text-almanac-parchment/60">
          {doc.source}
          {doc.source_url && (
            <>
              {' — '}
              <a
                href={doc.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-leaf hover:underline"
              >
                View Original
              </a>
            </>
          )}
        </p>
        {doc.verification.method && (
          <p className="text-xs text-almanac-parchment/40 mt-2">
            Verification: {doc.verification.method}
          </p>
        )}
      </footer>
    </article>
  )
}
