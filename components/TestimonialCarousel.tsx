'use client'

import { useState, useEffect } from 'react'
import testimonials from '@/data/testimonials.json'

/**
 * Testimonial Interface
 * Represents a visitor testimonial with quote, attribution, and metadata
 */
interface Testimonial {
  id: string
  quote: string
  attribution: string
  source: string
  sourceUrl?: string
  rating: number
  tags?: string[]
}

/**
 * TestimonialCarouselProps
 * Configuration options for the carousel component
 */
interface TestimonialCarouselProps {
  /** Override default testimonials - if not provided, uses featured testimonials from data */
  testimonials?: Testimonial[]
  /** Filter by category key from testimonials.json (e.g., 'events', 'family', 'education') */
  filter?: 'events' | 'family' | 'education' | 'authenticity'
  /** Auto-rotate interval in milliseconds (default 5000ms = 5 seconds) */
  interval?: number
  /** Show source badges (TripAdvisor, Google, etc.) */
  showSource?: boolean
}

/**
 * TestimonialCarousel
 *
 * An accessible, auto-rotating carousel component for visitor testimonials.
 * Features:
 * - Auto-rotates every 5 seconds
 * - Pauses on hover for better accessibility
 * - Navigation dots and prev/next buttons
 * - 5-star rating display
 * - Source badges (TripAdvisor, Google, Facebook)
 * - Smooth fade transitions
 * - Gold accent for active dot
 * - ARIA labels for screen readers
 *
 * Design:
 * - Large decorative quote marks
 * - Prominent 5-star rating
 * - Source badge styling
 * - Fade-in/out transitions
 * - Responsive grid layout
 */
export function TestimonialCarousel({
  testimonials: customTestimonials,
  filter,
  interval = 5000,
  showSource = true,
}: TestimonialCarouselProps) {
  // Use custom testimonials if provided, filter by category if specified, otherwise use featured
  const items: Testimonial[] = (() => {
    if (customTestimonials) return customTestimonials
    if (filter && testimonials.byCategory[filter]) {
      return testimonials.byCategory[filter] as Testimonial[]
    }
    return testimonials.featured as Testimonial[]
  })()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  // Auto-rotate carousel every `interval` ms, but pause on hover
  useEffect(() => {
    // Don't rotate if hovered or auto-rotation is disabled
    if (isHovered || !isAutoRotating) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isHovered, isAutoRotating, interval, items.length])

  // Navigate to previous testimonial
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
    setIsAutoRotating(false)
    // Resume auto-rotation after 8 seconds of manual navigation
    setTimeout(() => setIsAutoRotating(true), 8000)
  }

  // Navigate to next testimonial
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    setIsAutoRotating(false)
    // Resume auto-rotation after 8 seconds of manual navigation
    setTimeout(() => setIsAutoRotating(true), 8000)
  }

  // Jump to specific testimonial by dot click
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoRotating(false)
    // Resume auto-rotation after 8 seconds of manual navigation
    setTimeout(() => setIsAutoRotating(true), 8000)
  }

  if (!items || items.length === 0) {
    return null
  }

  const current = items[currentIndex]

  // Render star rating (1-5 stars)
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < rating ? 'text-[var(--gold-primary)]' : 'text-gray-300'}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  // Determine source badge styling
  const getSourceBadgeStyle = (source: string) => {
    const sourceMap: Record<string, { bg: string; text: string; textColor: string }> = {
      TripAdvisor: {
        bg: 'bg-[#00AA4F]/10',
        text: 'text-[#00AA4F]',
        textColor: '#00AA4F',
      },
      'Google Reviews': {
        bg: 'bg-[#4285F4]/10',
        text: 'text-[#4285F4]',
        textColor: '#4285F4',
      },
      Facebook: {
        bg: 'bg-[#1877F2]/10',
        text: 'text-[#1877F2]',
        textColor: '#1877F2',
      },
      Google: {
        bg: 'bg-[#4285F4]/10',
        text: 'text-[#4285F4]',
        textColor: '#4285F4',
      },
    }

    return (
      sourceMap[source] || {
        bg: 'bg-[--gold-primary]/10',
        text: 'text-[--gold-primary]',
        textColor: 'var(--gold-primary)',
      }
    )
  }

  const sourceStyle = getSourceBadgeStyle(current.source)

  return (
    <section className="relative py-16 md:py-24 bg-white" aria-label="Testimonials carousel">
      {/* Container with subtle parchment texture */}
      <div className="max-w-2xl mx-auto px-6 relative">
        {/* Decorative top element */}
        <div className="flex items-center justify-center gap-4 mb-12" aria-hidden="true">
          <span className="w-12 h-px bg-secondary/20" />
          <span className="text-accent text-sm">✦</span>
          <span className="w-12 h-px bg-secondary/20" />
        </div>

        {/* Main carousel content */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Testimonial card with fade transition */}
          <div key={current.id} className="transition-opacity duration-500 ease-in-out opacity-100">
            {/* Large decorative opening quote mark */}
            <div
              className="text-6xl md:text-7xl text-accent/20 font-serif leading-none mb-4"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Quote text */}
            <blockquote className="mb-8">
              <p className="font-serif text-xl md:text-2xl leading-relaxed text-primary mb-6">
                {current.quote}
              </p>
            </blockquote>

            {/* Star rating */}
            <div className="mb-6">{renderStars(current.rating)}</div>

            {/* Attribution and source */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div>
                <p className="font-semibold text-primary">{current.attribution}</p>
                {current.source && !showSource && (
                  <p className="text-sm text-text-light">{current.source}</p>
                )}
              </div>

              {/* Source badge */}
              {showSource && current.source && (
                <div
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded text-sm font-medium ${sourceStyle.bg} ${sourceStyle.text} whitespace-nowrap`}
                >
                  <span>{current.source}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation buttons */}
          {items.length > 1 && (
            <>
              {/* Previous button */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 p-2 text-primary hover:text-accent transition-colors duration-300 opacity-60 hover:opacity-100"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-6 h-6 md:w-8 md:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Next button */}
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 p-2 text-primary hover:text-accent transition-colors duration-300 opacity-60 hover:opacity-100"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-6 h-6 md:w-8 md:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Navigation dots */}
        {items.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12" role="tablist">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-3 h-3 bg-[var(--gold-primary)] shadow-[0_0_8px_rgba(201,162,39,0.4)]'
                    : 'w-2 h-2 bg-primary/20 hover:bg-primary/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-selected={index === currentIndex}
                role="tab"
              />
            ))}
          </div>
        )}

        {/* Progress indicator text */}
        <p className="text-center text-sm text-text-light mt-6">
          <span className="font-medium">{currentIndex + 1}</span> of{' '}
          <span className="font-medium">{items.length}</span>
        </p>

        {/* Decorative bottom element */}
        <div className="flex items-center justify-center gap-3 mt-12" aria-hidden="true">
          <span className="text-accent/30 text-sm">❧</span>
          <span className="w-16 h-px bg-accent/20" />
          <span className="text-accent/30 text-sm">❧</span>
        </div>
      </div>
    </section>
  )
}
