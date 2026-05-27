'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // Don't show on Visit page or Evidence Room (reading experience, not promotional)
  const hideOnPages = ['/visit', '/evidence']
  const shouldHide = hideOnPages.some((page) => pathname.startsWith(page))

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (about 400px)
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (shouldHide) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 md:hidden z-40 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Gradient fade */}
      <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-primary to-transparent pointer-events-none" />

      {/* CTA Bar */}
      <nav
        aria-label="Quick actions"
        className="bg-primary border-t border-accent/30 px-4 py-3 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex gap-3">
          <Link
            href="/events"
            className="flex-1 bg-white/10 text-white text-center py-3 rounded-sm font-semibold text-sm hover:bg-white/20 transition-colors border border-white/30 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Anniversary Events
          </Link>
          <Link
            href="/visit"
            className="flex-1 bg-accent text-primary text-center py-3 rounded-sm font-semibold text-sm hover:bg-accent/90 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Plan Your Visit
          </Link>
        </div>
      </nav>
    </div>
  )
}
