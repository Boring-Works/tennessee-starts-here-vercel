'use client'

import { useSyncExternalStore } from 'react'
import type { Document } from '@/lib/evidence/types'
import { DocumentViewer } from './DocumentViewer'
import { CitationExporter } from './CitationExporter'

interface DocumentViewerClientProps {
  document: Document
}

// Custom hook to subscribe to URL hash changes
function useUrlHash(): string | undefined {
  const subscribe = (callback: () => void) => {
    window.addEventListener('hashchange', callback)
    return () => window.removeEventListener('hashchange', callback)
  }

  const getSnapshot = () => {
    const hash = window.location.hash.slice(1)
    // Validate: only allow alphanumeric, hyphens, underscores (passage IDs)
    if (hash && /^[a-zA-Z0-9_-]+$/.test(hash)) {
      return hash
    }
    return undefined
  }

  const getServerSnapshot = () => undefined

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function DocumentViewerClient({ document }: DocumentViewerClientProps) {
  const highlightId = useUrlHash()

  return (
    <>
      <DocumentViewer document={document} highlightId={highlightId} />
      {/* Citation Export - inside client component to access URL hash */}
      <div className="max-w-3xl mx-auto mt-6 flex justify-end">
        <CitationExporter document={document} passageAnchor={highlightId} />
      </div>
    </>
  )
}
