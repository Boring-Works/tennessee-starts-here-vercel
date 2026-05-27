'use client'

import { useEffect, useRef, useState, useCallback, memo, type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  threshold?: number
  delay?: number
}

export const ScrollReveal = memo(function ScrollReveal({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasRevealed = useRef(false)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && !hasRevealed.current) {
        if (delay > 0) {
          setTimeout(() => setIsVisible(true), delay)
        } else {
          setIsVisible(true)
        }
        hasRevealed.current = true
      }
    },
    [delay]
  )

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin: '0px 0px -50px 0px',
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, handleIntersection])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
})
