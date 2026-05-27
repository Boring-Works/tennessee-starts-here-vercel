'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'

interface LazySectionProps {
  children: ReactNode
  /** Root margin for IntersectionObserver - how far before visible to start loading */
  rootMargin?: string
  /** Minimum height while loading to prevent layout shift */
  minHeight?: string
  /** Fallback content while loading */
  fallback?: ReactNode
  /** Optional className for the wrapper */
  className?: string
}

/**
 * LazySection - Delays rendering of children until section is near viewport
 *
 * Uses IntersectionObserver to detect when the section is about to become visible,
 * then renders the children. This improves initial page load performance.
 */
export function LazySection({
  children,
  rootMargin = '200px 0px',
  minHeight = '400px',
  fallback,
  className,
}: LazySectionProps) {
  const noObserver = typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined'
  const [isVisible, setIsVisible] = useState(noObserver)
  const [hasLoaded, setHasLoaded] = useState(noObserver)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // If no IntersectionObserver support, already initialized as visible
    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasLoaded(true)
          // Once loaded, stop observing
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin])

  // Once loaded, always render children (even if scrolled away)
  if (hasLoaded) {
    return <>{children}</>
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        minHeight: isVisible ? undefined : minHeight,
      }}
    >
      {isVisible ? children : fallback}
    </div>
  )
}

/**
 * Simple skeleton placeholder for lazy sections
 */
export function SectionSkeleton({ height = '400px' }: { height?: string }) {
  return (
    <div
      style={{
        height,
        background:
          'linear-gradient(180deg, rgba(250, 247, 240, 0.5) 0%, rgba(245, 240, 230, 0.5) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '2px solid rgba(184, 134, 11, 0.2)',
          borderTopColor: 'rgba(184, 134, 11, 0.6)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
