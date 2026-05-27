'use client'

import { useEffect, useRef, useState, useCallback, memo } from 'react'

interface AnimatedCounterProps {
  end: number
  duration?: number
  start?: number
  className?: string
  /** Accessible label for screen readers */
  ariaLabel?: string
}

export const AnimatedCounter = memo(function AnimatedCounter({
  end,
  duration = 2000,
  start = 0,
  className = '',
  ariaLabel,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  // Memoized intersection callback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting && !hasAnimated.current) {
      setIsVisible(true)
      hasAnimated.current = true
    }
  }, [])

  // Intersection Observer to trigger on viewport entry
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [handleIntersection])

  // Animate count when visible
  useEffect(() => {
    if (!isVisible) return

    const startTime = performance.now()
    const diff = end - start

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic
      const eased = 1 - (1 - progress) ** 3
      const current = Math.round(start + diff * eased)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, start, end, duration])

  return (
    <span
      ref={ref}
      className={className}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel || `Count: ${count}`}
    >
      {count}
    </span>
  )
})
