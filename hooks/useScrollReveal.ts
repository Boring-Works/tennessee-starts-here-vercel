'use client'

import { useEffect, useRef, useState, useCallback, type RefCallback } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

interface UseScrollRevealReturn<T extends HTMLElement> {
  ref: RefCallback<T>
  isVisible: boolean
}

/**
 * Hook for scroll-triggered reveal animations using Intersection Observer.
 *
 * @param options.threshold - Percentage of element visible before triggering (0-1)
 * @param options.rootMargin - Margin around root (e.g., "-100px")
 * @param options.triggerOnce - If true, only triggers once (default: true)
 *
 * @example
 * const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
 * return <div ref={ref} className={isVisible ? 'visible' : ''}>Content</div>
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): UseScrollRevealReturn<T> {
  const { threshold = 0.2, rootMargin = '0px', triggerOnce = true } = options

  const observerRef = useRef<IntersectionObserver | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Callback ref that sets up the observer
  const ref: RefCallback<T> = useCallback(
    (element) => {
      // Clean up previous observer
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      if (!element) return

      // Skip if already visible and triggerOnce is true
      if (isVisible && triggerOnce) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              observer.disconnect()
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        },
        { threshold, rootMargin }
      )

      observer.observe(element)
      observerRef.current = observer
    },
    [threshold, rootMargin, triggerOnce, isVisible]
  )

  // Cleanup observer on unmount
  useEffect(() => {
    const observer = observerRef.current
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return { ref, isVisible }
}

interface UseStaggeredRevealReturn<T extends HTMLElement> {
  refs: RefCallback<T>[]
  isVisible: boolean[]
}

/**
 * Hook for staggered reveal of multiple elements.
 * Returns an array of callback refs and visibility states.
 *
 * @param count - Number of elements to track
 * @param options - Same options as useScrollReveal
 */
export function useStaggeredReveal<T extends HTMLElement = HTMLDivElement>(
  count: number,
  options: UseScrollRevealOptions = {}
): UseStaggeredRevealReturn<T> {
  const { threshold = 0.2, rootMargin = '0px', triggerOnce = true } = options

  const observersRef = useRef<Map<number, IntersectionObserver>>(new Map())
  const [visibleStates, setVisibleStates] = useState<boolean[]>(() => Array(count).fill(false))

  // Create a ref callback for a specific index
  const createRefCallback = useCallback(
    (index: number): RefCallback<T> => {
      return (element) => {
        // Clean up previous observer for this index
        const prevObserver = observersRef.current.get(index)
        if (prevObserver) {
          prevObserver.disconnect()
          observersRef.current.delete(index)
        }

        if (!element) return

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleStates((prev) => {
                if (prev[index]) return prev // Already visible
                const next = [...prev]
                next[index] = true
                return next
              })
              if (triggerOnce) {
                observer.disconnect()
                observersRef.current.delete(index)
              }
            } else if (!triggerOnce) {
              setVisibleStates((prev) => {
                if (!prev[index]) return prev // Already hidden
                const next = [...prev]
                next[index] = false
                return next
              })
            }
          },
          { threshold, rootMargin }
        )

        observer.observe(element)
        observersRef.current.set(index, observer)
      }
    },
    [threshold, rootMargin, triggerOnce]
  )

  // Create array of refs - recreated when count or callback changes
  const refs = Array.from({ length: count }, (_, i) => createRefCallback(i))

  // Cleanup observers on unmount
  useEffect(() => {
    const observers = observersRef.current
    return () => {
      observers.forEach((observer) => observer.disconnect())
      observers.clear()
    }
  }, [])

  return { refs, isVisible: visibleStates }
}
