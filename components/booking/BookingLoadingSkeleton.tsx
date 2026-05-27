import { memo } from 'react'

/**
 * BookingLoadingSkeleton Component
 *
 * Loading state for FareHarbor Lightframe modal.
 * This is automatically shown by FareHarbor while the booking calendar loads.
 *
 * Note: FareHarbor handles its own loading states, but this component
 * can be used for custom loading UIs if needed.
 */
function BookingLoadingSkeletonComponent() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-stone-200 rounded w-3/4" />
        <div className="h-4 bg-stone-200 rounded w-1/2" />
      </div>

      {/* Calendar skeleton */}
      <div className="space-y-3">
        <div className="h-12 bg-stone-200 rounded" />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="h-10 bg-stone-200 rounded" />
          ))}
        </div>
      </div>

      {/* Time slots skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 bg-stone-200 rounded" />
        ))}
      </div>

      {/* Button skeleton */}
      <div className="h-12 bg-stone-200 rounded" />
    </div>
  )
}

export const BookingLoadingSkeleton = memo(BookingLoadingSkeletonComponent)
