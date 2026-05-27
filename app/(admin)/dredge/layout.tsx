import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Dredge | Rocky Mount Archive System',
  description: 'Document discovery and verification system',
  robots: 'noindex, nofollow',
}

export default function DredgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      <header className="border-b border-stone-700 bg-stone-800">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-amber-500">The Dredge</h1>
              <p className="text-sm text-stone-400">Rocky Mount Archive Discovery System</p>
            </div>
            <nav className="flex gap-4">
              <a href="/dredge" className="text-stone-300 hover:text-amber-500">
                Queue
              </a>
              <a href="/dredge/review" className="text-stone-300 hover:text-amber-500">
                Review
              </a>
              <a href="/dredge/sources" className="text-stone-300 hover:text-amber-500">
                Sources
              </a>
              <a href="/dredge/settings" className="text-stone-300 hover:text-amber-500">
                Settings
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  )
}
