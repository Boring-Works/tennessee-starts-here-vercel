/**
 * Booking Components
 *
 * FareHarbor integration for event booking with Lightframe modal.
 *
 * Key Features:
 * - Opens booking in modal overlay (keeps users on site)
 * - Falls back to direct link if JavaScript disabled
 * - Mobile sticky CTA for event detail pages
 * - Analytics tracking on booking clicks
 *
 * Usage:
 * ```tsx
 * import { BookingButton, MobileStickyCTA } from '@/components/booking'
 *
 * // Simple button
 * <BookingButton itemId="562803">
 *   Reserve Your Spot
 * </BookingButton>
 *
 * // With mobile sticky CTA
 * <MobileStickyCTA
 *   itemId="562803"
 *   eventTitle="Spring Break Camp"
 * />
 * ```
 */

export { BookingButton } from './BookingButton'
export { BookingOptions } from './BookingOptions'
export { MobileStickyCTA } from './MobileStickyCTA'
export { BookingLoadingSkeleton } from './BookingLoadingSkeleton'
