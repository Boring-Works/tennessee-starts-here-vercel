'use client'

import { useState } from 'react'

interface DraftDocument {
  id: string
  title: string
  url: string
  sourceType: 'primary' | 'secondary' | 'tertiary'
  extractedDate: string | null
  extractedAuthor: string | null
  summary: string | null
  confidence: number
  cherokeeContent: boolean
  conflicts: string[]
  createdAt: string
}

export default function ReviewPage() {
  // TODO: Fetch from Supabase
  const [drafts] = useState<DraftDocument[]>([
    {
      id: '1',
      title: 'Letter from William Blount to John Gray Blount',
      url: 'https://founders.archives.gov/documents/...',
      sourceType: 'primary',
      extractedDate: '1790-10-20',
      extractedAuthor: 'William Blount',
      summary:
        'Governor Blount describes his arrival in the Southwest Territory and his accommodations at Rocky Mount, noting the glass windows and fireplace.',
      confidence: 94,
      cherokeeContent: false,
      conflicts: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Alleged Jackson Lodging Record',
      url: 'https://ancestry.com/...',
      sourceType: 'tertiary',
      extractedDate: '1788-04-01',
      extractedAuthor: null,
      summary: 'Claimed record of Andrew Jackson staying at Rocky Mount in 1788.',
      confidence: 47,
      cherokeeContent: false,
      conflicts: [
        '2006 dendrochronology study shows main house built 1827-1830',
        'No primary source documentation found',
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Treaty of Holston Celebration Account',
      url: 'https://catalog.archives.gov/...',
      sourceType: 'primary',
      extractedDate: '1791-07-02',
      extractedAuthor: null,
      summary: 'Account of the celebrations following the signing of the Treaty of Holston.',
      confidence: 82,
      cherokeeContent: true,
      conflicts: [],
      createdAt: new Date().toISOString(),
    },
  ])

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-500'
    if (confidence >= 60) return 'text-amber-500'
    return 'text-red-500'
  }

  const getSourceBadge = (type: DraftDocument['sourceType']) => {
    const styles = {
      primary: 'bg-emerald-900 text-emerald-200 border-emerald-700',
      secondary: 'bg-amber-900 text-amber-200 border-amber-700',
      tertiary: 'bg-stone-700 text-stone-300 border-stone-600',
    }
    return styles[type]
  }

  const handleApprove = (id: string) => {
    // TODO: Update Supabase, publish to Evidence Room
    alert(`Approved document ${id}`)
  }

  const handleReject = (id: string) => {
    // TODO: Update Supabase, mark as rejected
    alert(`Rejected document ${id}`)
  }

  const handleFlag = (id: string) => {
    // TODO: Update Supabase, flag for research
    alert(`Flagged document ${id} for research`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-stone-100">Review Queue</h2>
        <span className="text-sm text-stone-400">{drafts.length} documents pending review</span>
      </div>

      <div className="space-y-4">
        {drafts.map((doc) => (
          <article
            key={doc.id}
            className="rounded-lg border border-stone-700 bg-stone-800 p-6 transition-colors hover:border-stone-600"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-stone-100">{doc.title}</h3>
                <div className="mt-1 flex items-center gap-3">
                  <span className={`rounded border px-2 py-0.5 text-xs ${getSourceBadge(doc.sourceType)}`}>
                    {doc.sourceType === 'primary' && 'Tier 1 (Verified)'}
                    {doc.sourceType === 'secondary' && 'Tier 2 (Review)'}
                    {doc.sourceType === 'tertiary' && 'Tier 3 (Corroborate)'}
                  </span>
                  {doc.cherokeeContent && (
                    <span className="rounded border border-purple-700 bg-purple-900 px-2 py-0.5 text-xs text-purple-200">
                      Cherokee Content
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold ${getConfidenceColor(doc.confidence)}`}>
                  {doc.confidence}%
                </span>
                <p className="text-xs text-stone-500">AI Confidence</p>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-stone-500">Date:</span>{' '}
                <span className="text-stone-300">{doc.extractedDate || 'Unknown'}</span>
              </div>
              <div>
                <span className="text-stone-500">Author:</span>{' '}
                <span className="text-stone-300">{doc.extractedAuthor || 'Unknown'}</span>
              </div>
            </div>

            {doc.summary && (
              <div className="mb-4 rounded bg-stone-900 p-3">
                <p className="text-sm italic text-stone-300">{doc.summary}</p>
              </div>
            )}

            {doc.conflicts.length > 0 && (
              <div className="mb-4 rounded border border-red-900 bg-red-950 p-3">
                <p className="mb-2 text-sm font-medium text-red-400">Conflicts Detected:</p>
                <ul className="list-inside list-disc space-y-1 text-sm text-red-300">
                  {doc.conflicts.map((conflict, i) => (
                    <li key={i}>{conflict}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-stone-700 pt-4">
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-amber-500 hover:text-amber-400"
              >
                View Original →
              </a>
              <div className="flex gap-2">
                <button
                  onClick={() => handleReject(doc.id)}
                  className="rounded border border-red-700 bg-red-900 px-3 py-1.5 text-sm text-red-200 hover:bg-red-800"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleFlag(doc.id)}
                  className="rounded border border-amber-700 bg-amber-900 px-3 py-1.5 text-sm text-amber-200 hover:bg-amber-800"
                >
                  Flag for Research
                </button>
                <button
                  onClick={() => handleApprove(doc.id)}
                  className="rounded bg-green-700 px-3 py-1.5 text-sm text-white hover:bg-green-600"
                  disabled={doc.conflicts.length > 0}
                  title={doc.conflicts.length > 0 ? 'Resolve conflicts before approving' : 'Publish to Evidence Room'}
                >
                  Approve & Publish
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
