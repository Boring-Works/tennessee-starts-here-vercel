export default function Loading() {
  return (
    <div className="min-h-screen bg-midnight">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Screen reader announcement */}
          <div role="status" aria-live="polite" className="sr-only">
            Loading document...
          </div>

          {/* Visual skeleton */}
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-white/10 rounded w-24" />
            <div className="h-10 bg-white/10 rounded w-2/3" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
            <div className="space-y-3 pt-8">
              <div className="h-4 bg-white/10 rounded" />
              <div className="h-4 bg-white/10 rounded" />
              <div className="h-4 bg-white/10 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
