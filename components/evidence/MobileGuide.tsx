'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

interface Section {
  id: string
  label: string
}

interface MobileGuideProps {
  sections: Section[]
}

export function MobileGuide({ sections }: MobileGuideProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [announcement, setAnnouncement] = useState<string>('')
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMountedRef = useRef(true)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    // Show guide after scrolling past hero (300px)
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    // Track active section with Intersection Observer
    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
          // Update announcement for screen readers
          const section = sections.find((s) => s.id === entry.target.id)
          if (section) {
            setAnnouncement(`Currently viewing: ${section.label}`)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      isMountedRef.current = false
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [sections])

  useEffect(() => {
    if (isOpen) {
      const menu = menuRef.current
      if (menu) {
        const focusableElements = menu.querySelectorAll(
          'button, a, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        if (firstElement) {
          firstElement.focus()
        }
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        toggleButtonRef.current?.focus()
      }

      if (e.key === 'Tab') {
        const menu = menuRef.current
        if (!menu) return

        const focusableElements = menu.querySelectorAll(
          'button, a, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSectionClick = useCallback((sectionId: string) => {
    setIsOpen(false)
    toggleButtonRef.current?.focus()
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    scrollTimeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }, [])

  return (
    <>
      {/* Screen reader announcement for section changes */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {/* Guide Button - only visible on mobile/tablet */}
      <div
        className={`fixed bottom-6 right-6 z-[60] lg:hidden transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        {/* Expanded Menu */}
        <div
          ref={menuRef}
          className={`absolute bottom-full right-0 mb-3 w-48 transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <nav
            id="mobile-guide-menu"
            aria-label="Evidence Room navigation menu"
            className="bg-[#faf7f0] border border-[var(--gold-primary)]/30 rounded-sm shadow-lg overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-[var(--gold-primary)]/20 flex items-center justify-between">
              <span className="text-xs font-serif text-[var(--gold-primary)] uppercase tracking-wider">
                Guide
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  toggleButtonRef.current?.focus()
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#3d3229]/50 hover:text-[#3d3229] -m-2 rounded transition-colors focus-visible:outline-2 focus-visible:outline-[var(--gold-primary)] focus-visible:outline-offset-2"
                aria-label="Close guide"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>
            <ul className="py-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full text-left px-3 py-2 text-sm font-serif transition-colors flex items-center gap-2 ${
                      activeSection === section.id
                        ? 'text-[var(--gold-primary)] bg-[var(--gold-primary)]/10'
                        : 'text-[#3d3229] hover:bg-[#3d3229]/5'
                    }`}
                    aria-current={activeSection === section.id ? 'true' : undefined}
                    aria-label={`Jump to ${section.label} section`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        activeSection === section.id
                          ? 'bg-[var(--gold-primary)]'
                          : 'bg-[#3d3229]/20'
                      }`}
                    />
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="px-3 py-2 border-t border-[var(--gold-primary)]/20">
              <Link
                href="/evidence/documents"
                className="flex items-center gap-2 text-xs text-[#8b4513] hover:text-[var(--gold-primary)] transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Full Document Library
              </Link>
            </div>
          </nav>
        </div>

        {/* Toggle Button */}
        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-sm shadow-lg transition-all duration-300 flex items-center justify-center ${
            isOpen
              ? 'bg-[var(--gold-primary)] text-[#2a1f1a]'
              : 'bg-[#2a1f1a] text-[var(--gold-primary)] border border-[var(--gold-primary)]/50'
          }`}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation guide' : 'Open navigation guide'}
          aria-controls="mobile-guide-menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </>
  )
}
