import Link from 'next/link'

interface ConnectionsPanelProps {
  document: {
    id: string
    title: string
    responds_to?: string | null
  }
  respondingDocuments?: Array<{
    id: string
    title: string
    date: string
  }>
  respondedToDocument?: {
    id: string
    title: string
    date: string
  } | null
}

export function ConnectionsPanel({
  document: _doc,
  respondingDocuments = [],
  respondedToDocument,
}: ConnectionsPanelProps) {
  const hasConnections = respondedToDocument || respondingDocuments.length > 0

  if (!hasConnections) {
    return null
  }

  return (
    <aside className="border border-white/10 rounded-lg overflow-hidden">
      {/* Header */}
      <header className="px-4 py-3 bg-white/5 border-b border-white/10">
        <h3 className="font-serif text-sm text-gold-leaf">Conversation Thread</h3>
      </header>

      <div className="p-4 space-y-4">
        {/* Responds to (parent document) */}
        {respondedToDocument && (
          <div className="space-y-1">
            <p className="text-xs text-almanac-parchment/50 uppercase tracking-wide">
              <span className="mr-1">&larr;</span>
              Responds to
            </p>
            <Link
              href={`/evidence/documents/${respondedToDocument.id}`}
              className="group flex items-center gap-2 text-sm text-almanac-parchment/80 hover:text-gold-leaf transition-colors"
            >
              <span className="flex-1 line-clamp-2">{respondedToDocument.title}</span>
              <span className="text-xs text-almanac-parchment/40 group-hover:text-gold-leaf/60">
                {formatDate(respondedToDocument.date)}
              </span>
              <span className="text-gold-leaf/60 group-hover:text-gold-leaf transition-colors">
                &rarr;
              </span>
            </Link>
          </div>
        )}

        {/* Separator when both sections present */}
        {respondedToDocument && respondingDocuments.length > 0 && (
          <hr className="border-white/10" />
        )}

        {/* Followed by (child documents) */}
        {respondingDocuments.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-almanac-parchment/50 uppercase tracking-wide">
              <span className="mr-1">&rarr;</span>
              Followed by
            </p>
            <ul className="space-y-2">
              {respondingDocuments.map((response) => (
                <li key={response.id}>
                  <Link
                    href={`/evidence/documents/${response.id}`}
                    className="group flex items-center gap-2 text-sm text-almanac-parchment/80 hover:text-gold-leaf transition-colors"
                  >
                    <span className="flex-1 line-clamp-2">{response.title}</span>
                    <span className="text-xs text-almanac-parchment/40 group-hover:text-gold-leaf/60">
                      {formatDate(response.date)}
                    </span>
                    <span className="text-gold-leaf/60 group-hover:text-gold-leaf transition-colors">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  )
}

/**
 * Format date for display in compact form
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable'
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
