'use client'

import { useState } from 'react'

interface QueuedJob {
  id: string
  url: string
  status: 'queued' | 'processing' | 'complete' | 'failed'
  sourceType: 'primary' | 'secondary' | 'tertiary'
  createdAt: string
}

export default function DredgePage() {
  const [url, setUrl] = useState('')
  const [sourceType, setSourceType] = useState<'primary' | 'secondary' | 'tertiary'>('secondary')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // TODO: Fetch from Trigger.dev API
  const [jobs] = useState<QueuedJob[]>([
    {
      id: '1',
      url: 'https://founders.archives.gov/documents/Washington/05-06-02-0234',
      status: 'complete',
      sourceType: 'primary',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      url: 'https://tennesseeencyclopedia.net/entries/rocky-mount/',
      status: 'processing',
      sourceType: 'secondary',
      createdAt: new Date().toISOString(),
    },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsSubmitting(true)

    try {
      // TODO: Call Trigger.dev to queue the job
      // await tasks.trigger('scrape-url', { url, sourceType })
      alert(`Queued: ${url}`)
      setUrl('')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to queue job:', error)
      alert('Failed to queue job')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: QueuedJob['status']) => {
    const styles = {
      queued: 'bg-stone-600 text-stone-200',
      processing: 'bg-amber-600 text-amber-100',
      complete: 'bg-green-600 text-green-100',
      failed: 'bg-red-600 text-red-100',
    }
    return (
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    )
  }

  const getSourceBadge = (type: QueuedJob['sourceType']) => {
    const styles = {
      primary: 'bg-emerald-900 text-emerald-200 border-emerald-700',
      secondary: 'bg-amber-900 text-amber-200 border-amber-700',
      tertiary: 'bg-stone-700 text-stone-300 border-stone-600',
    }
    const labels = {
      primary: 'Tier 1 (Verified)',
      secondary: 'Tier 2 (Review)',
      tertiary: 'Tier 3 (Corroborate)',
    }
    return (
      <span className={`rounded border px-2 py-0.5 text-xs ${styles[type]}`}>{labels[type]}</span>
    )
  }

  return (
    <div className="space-y-8">
      {/* Add URL Form */}
      <section className="rounded-lg border border-stone-700 bg-stone-800 p-6">
        <h2 className="mb-4 text-lg font-semibold text-stone-100">Add Document URL</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="mb-1 block text-sm text-stone-400">
              Document URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://founders.archives.gov/documents/..."
              className="w-full rounded border border-stone-600 bg-stone-700 px-3 py-2 text-stone-100 placeholder:text-stone-500 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="sourceType" className="mb-1 block text-sm text-stone-400">
              Source Trust Level
            </label>
            <select
              id="sourceType"
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value as typeof sourceType)}
              className="w-full rounded border border-stone-600 bg-stone-700 px-3 py-2 text-stone-100 focus:border-amber-500 focus:outline-none"
            >
              <option value="primary">
                Tier 1: Primary (Government Archives, Founders Online)
              </option>
              <option value="secondary">Tier 2: Secondary (Academic, Encyclopedia)</option>
              <option value="tertiary">Tier 3: Tertiary (Find A Grave, Ancestry)</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Queueing...' : 'Add to Queue'}
          </button>
        </form>
      </section>

      {/* Queue Status */}
      <section className="rounded-lg border border-stone-700 bg-stone-800 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-stone-100">Queue Status</h2>
          <a
            href="https://cloud.trigger.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-amber-500 hover:text-amber-400"
          >
            Open Trigger.dev Dashboard →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-700 text-left text-sm text-stone-400">
                <th className="pb-2">URL</th>
                <th className="pb-2">Source</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Added</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-700">
              {jobs.map((job) => (
                <tr key={job.id} className="text-sm">
                  <td className="max-w-xs truncate py-3 pr-4">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-300 hover:text-amber-500"
                    >
                      {job.url}
                    </a>
                  </td>
                  <td className="py-3 pr-4">{getSourceBadge(job.sourceType)}</td>
                  <td className="py-3 pr-4">{getStatusBadge(job.status)}</td>
                  <td className="py-3 pr-4 text-stone-400">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    {job.status === 'failed' && (
                      <button className="text-amber-500 hover:text-amber-400">Retry</button>
                    )}
                    {job.status === 'complete' && (
                      <a
                        href={`/dredge/review/${job.id}`}
                        className="text-amber-500 hover:text-amber-400"
                      >
                        Review
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-stone-700 bg-stone-800 p-4">
          <p className="text-sm text-stone-400">Queued</p>
          <p className="text-2xl font-bold text-stone-100">12</p>
        </div>
        <div className="rounded-lg border border-stone-700 bg-stone-800 p-4">
          <p className="text-sm text-stone-400">Processing</p>
          <p className="text-2xl font-bold text-amber-500">3</p>
        </div>
        <div className="rounded-lg border border-stone-700 bg-stone-800 p-4">
          <p className="text-sm text-stone-400">Pending Review</p>
          <p className="text-2xl font-bold text-amber-500">28</p>
        </div>
        <div className="rounded-lg border border-stone-700 bg-stone-800 p-4">
          <p className="text-sm text-stone-400">Published</p>
          <p className="text-2xl font-bold text-green-500">147</p>
        </div>
      </section>
    </div>
  )
}
