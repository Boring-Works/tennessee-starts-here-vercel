'use client'

import { useState, useEffect, useMemo, memo } from 'react'

export const Compass = memo(function Compass() {
  const [rotation, setRotation] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight
      const scrollCurrent = window.scrollY

      // Map scroll progress to 360 degrees rotation
      // Multiply by 2 for more active needle movement
      // Guard against division by zero on very short pages
      const degrees = scrollTotal > 0 ? (scrollCurrent / scrollTotal) * 360 * 2 : 0
      setRotation(degrees)

      // Show after scrolling 300px
      setIsVisible(scrollCurrent > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      scrollToTop()
    }
  }

  const compassTicks = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="5"
          x2="50"
          y2={i % 5 === 0 ? '10' : '7'}
          stroke="var(--gold-primary)"
          strokeWidth={i % 5 === 0 ? '1.5' : '0.5'}
          transform={`rotate(${i * 6} 50 50)`}
        />
      )),
    []
  )

  return (
    <button
      type="button"
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      className={`fixed bottom-6 left-6 z-[45] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[var(--gold-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a1f1a] rounded-full ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      aria-label="Return to top"
    >
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)] bg-[#2a1f1a] border-2 border-[var(--gold-primary)] overflow-hidden transform group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_25px_rgba(201,162,39,0.5)]">
        {/* Compass Rose Background */}
        <div className="absolute inset-0 opacity-80">
          <svg viewBox="0 0 100 100" className="w-full h-full p-1">
            {compassTicks}
            {/* Cardinal Directions */}
            <text
              x="50"
              y="24"
              textAnchor="middle"
              fill="var(--gold-primary)"
              fontSize="10"
              fontFamily="serif"
              fontWeight="bold"
            >
              N
            </text>
            <text
              x="50"
              y="86"
              textAnchor="middle"
              fill="var(--gold-primary)"
              fontSize="8"
              fontFamily="serif"
              fontWeight="bold"
              className="opacity-50"
            >
              S
            </text>
            <text
              x="82"
              y="53"
              textAnchor="middle"
              fill="var(--gold-primary)"
              fontSize="8"
              fontFamily="serif"
              fontWeight="bold"
              className="opacity-50"
            >
              E
            </text>
            <text
              x="18"
              y="53"
              textAnchor="middle"
              fill="var(--gold-primary)"
              fontSize="8"
              fontFamily="serif"
              fontWeight="bold"
              className="opacity-50"
            >
              W
            </text>
          </svg>
        </div>

        {/* Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-full pointer-events-none" />

        {/* Rotating Needle */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <g transform="translate(50, 50)">
              {/* North Half (Crimson) */}
              <path d="M0,-35 L4,0 L-4,0 Z" fill="#8D0801" />
              {/* South Half (Cream) */}
              <path d="M0,35 L4,0 L-4,0 Z" fill="#F3E5C2" />
              {/* Center Pin */}
              <circle
                cx="0"
                cy="0"
                r="3"
                fill="var(--gold-primary)"
                stroke="#2a1f1a"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>

        {/* Tooltip */}
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-[#2a1f1a] text-[var(--gold-primary)] text-[10px] uppercase tracking-widest px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-[var(--gold-primary)]/30 shadow-xl translate-x-2 group-hover:translate-x-0 pointer-events-none font-serif">
          Return North
        </div>
      </div>
    </button>
  )
})
