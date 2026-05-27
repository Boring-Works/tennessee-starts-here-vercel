'use client'

import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  duration?: number // ms
  delay?: number // ms before starting
}

/**
 * Hook for animating a number count-up effect
 * Uses CSS-like easing (ease-out cubic) for smooth deceleration
 */
export function useCountUp(
  target: number,
  options: UseCountUpOptions = {}
): number {
  const { duration = 600, delay = 0 } = options
  const [count, setCount] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    // Reset on target change - defer to avoid sync setState in effect
    queueMicrotask(() => setCount(0))
    startTimeRef.current = null

    // Ease-out cubic: decelerates smoothly
    const easeOutCubic = (t: number): number => {
      return 1 - (1 - t) ** 3
    }

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current - delay

      if (elapsed < 0) {
        // Still in delay period
        frameRef.current = requestAnimationFrame(animate)
        return
      }

      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      const currentValue = Math.round(easedProgress * target)

      setCount(currentValue)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [target, duration, delay])

  return count
}
