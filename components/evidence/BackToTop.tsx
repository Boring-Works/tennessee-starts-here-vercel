'use client'

import { useState, useEffect } from 'react'

interface BackToTopProps {
  threshold?: number
  label?: string
}

export function BackToTop({ threshold = 400, label = 'Back to top' }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        bg-midnight/90 border border-gold-leaf/30
        text-gold-leaf hover:bg-midnight hover:border-gold-leaf
        shadow-lg hover:shadow-xl
        transition-all duration-200
        flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-gold-leaf focus:ring-offset-2 focus:ring-offset-midnight
      "
      aria-label={label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
