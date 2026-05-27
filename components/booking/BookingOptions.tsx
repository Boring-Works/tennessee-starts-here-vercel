'use client'

import { memo } from 'react'
import { BookingButton } from './BookingButton'

/** Event pricing structure */
interface EventPricing {
  adult?: number | null
  senior?: number | null
  child?: number | null
  underFive?: number | null
  members?: number | null
}

/** Analytics event data */
interface EventAnalyticsData {
  id: string
  title: string
  fareHarborId?: string
  pricing?: EventPricing | null
}

interface BookingOptionsProps {
  /**
   * FareHarbor item ID to open a specific experience
   */
  itemId?: string | null

  /**
   * Fallback URL if JavaScript is disabled
   */
  fallbackUrl?: string

  /**
   * Event data for analytics tracking
   */
  eventData?: EventAnalyticsData

  /**
   * Button text
   * @default 'Reserve Your Spot'
   */
  buttonText?: string

  /**
   * Additional class name for the container
   */
  className?: string

  /**
   * Button class name
   */
  buttonClassName?: string

  /**
   * Show phone option
   * @default true
   */
  showPhone?: boolean

  /**
   * Compact mode - phone link inline with button
   * @default false
   */
  compact?: boolean
}

/**
 * BookingOptions Component
 *
 * Combines FareHarbor booking button with phone booking option.
 * Makes booking accessible to visitors who prefer calling.
 *
 * @example
 * ```tsx
 * <BookingOptions
 *   itemId="562803"
 *   eventData={{ id: 'spring-camp', title: 'Spring Camp' }}
 * />
 * ```
 */
function BookingOptionsComponent({
  itemId,
  fallbackUrl,
  eventData,
  buttonText = 'Reserve Your Spot',
  className = '',
  buttonClassName = '',
  showPhone = true,
  compact = false,
}: BookingOptionsProps) {
  const phoneNumber = '(423) 538-7396'
  const phoneHref = 'tel:+14235387396'

  if (compact) {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        <BookingButton
          itemId={itemId}
          fallbackUrl={fallbackUrl}
          eventData={eventData}
          className={buttonClassName}
        >
          {buttonText}
        </BookingButton>
        {showPhone && (
          <span className="text-sm text-stone-600">
            or{' '}
            <a
              href={phoneHref}
              className="text-amber-800 hover:text-amber-900 underline underline-offset-2"
            >
              call us
            </a>
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <BookingButton
        itemId={itemId}
        fallbackUrl={fallbackUrl}
        eventData={eventData}
        className={buttonClassName}
      >
        {buttonText}
      </BookingButton>

      {showPhone && (
        <p className="text-sm text-stone-600 leading-relaxed">
          <span className="block sm:inline">Questions? We&apos;d love to help.</span>{' '}
          <a
            href={phoneHref}
            className="text-amber-800 hover:text-amber-900 font-medium underline underline-offset-2 transition-colors"
          >
            Leave a message at {phoneNumber}
          </a>{' '}
          <span className="text-stone-500">and we&apos;ll call you back.</span>
        </p>
      )}
    </div>
  )
}

export const BookingOptions = memo(BookingOptionsComponent)
