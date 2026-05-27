'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, memo } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import navigation from '@/data/navigation.json'
import styles from './Header/Header.module.css'

// ============================================
// Types
// ============================================

interface DropdownItem {
  href: string
  label: string
  description?: string
  featured?: boolean
  badge?: string
  variant?: 'primary' | 'secondary'
  tagline?: string
  icon?: 'map' | 'scroll' | 'calendar' | 'heart'
}

interface NavItem {
  href: string
  label: string
  dropdown?: DropdownItem[]
  badge?: string
}

const NAV_STRUCTURE: NavItem[] = navigation.mainNav as NavItem[]

// ============================================
// Utility Hooks
// ============================================

function useScrollState(threshold = 20) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}

function useRouteChange() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Focus main heading for keyboard navigation
    const focusHeading = () => {
      const mainHeading = document.querySelector('main h1, main [role="heading"][aria-level="1"]')
      if (mainHeading instanceof HTMLElement) {
        mainHeading.setAttribute('tabindex', '-1')
        mainHeading.focus({ preventScroll: true })
        mainHeading.addEventListener('blur', () => mainHeading.removeAttribute('tabindex'), {
          once: true,
        })
      }
    }

    const timeoutId = setTimeout(focusHeading, 100)
    return () => clearTimeout(timeoutId)
  }, [])

  return pathname
}

// ============================================
// Desktop Navigation (Radix NavigationMenu)
// ============================================

interface DesktopNavProps {
  pathname: string
}

function DesktopNav({ pathname }: DesktopNavProps) {
  const isActive = useCallback(
    (href?: string) => {
      if (!href) return false
      if (href === '/') return pathname === '/' || pathname === '/home'
      return pathname === href || pathname.startsWith(`${href}/`)
    },
    [pathname]
  )

  const isDropdownActive = useCallback(
    (items?: DropdownItem[]) => items?.some((item) => isActive(item.href)) ?? false,
    [isActive]
  )

  return (
    <NavigationMenu.Root
      className={styles.nav}
      aria-label="Main navigation"
      delayDuration={150}
      skipDelayDuration={50}
    >
      <NavigationMenu.List className={styles['nav-list']}>
        {NAV_STRUCTURE.map((item) => (
          <NavigationMenu.Item key={item.label} className={styles['nav-item']}>
            {item.dropdown ? (
              <>
                <NavigationMenu.Trigger
                  className={`${styles['dropdown-toggle']} ${
                    isDropdownActive(item.dropdown) ? styles['dropdown-toggle--active'] : ''
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-accent/20 text-accent border border-accent/30 rounded-sm">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    size={14}
                    className={styles['dropdown-chevron']}
                    aria-hidden="true"
                  />
                  <span className={styles['dropdown-toggle-underline']} aria-hidden="true" />
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className={styles['dropdown-menu']}>
                  <ul>
                    {item.dropdown.map((subitem) => (
                      <li key={subitem.href}>
                        <NavigationMenu.Link asChild>
                          {subitem.variant === 'primary' ? (
                            <Link
                              href={subitem.href}
                              aria-current={isActive(subitem.href) ? 'page' : undefined}
                              className={`${styles['dropdown-tile']} ${
                                subitem.icon === 'scroll' ? styles['dropdown-tile--evidence'] : ''
                              }`}
                            >
                              <span className={styles['dropdown-tile-content']}>
                                <span className={styles['dropdown-tile-label']}>
                                  {subitem.label}
                                </span>
                                {subitem.tagline && (
                                  <span className={styles['dropdown-tile-tagline']}>
                                    {subitem.tagline}
                                  </span>
                                )}
                              </span>
                              <span className={styles['dropdown-tile-arrow']}>→</span>
                            </Link>
                          ) : (
                            <Link
                              href={subitem.href}
                              aria-current={isActive(subitem.href) ? 'page' : undefined}
                              className={`${styles['dropdown-item']} ${
                                isActive(subitem.href) ? styles['dropdown-item--active'] : ''
                              }`}
                            >
                              {subitem.label}
                            </Link>
                          )}
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </>
            ) : (
              <NavigationMenu.Link asChild>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`${styles['nav-link']} ${
                    isActive(item.href) ? styles['nav-link--active'] : ''
                  }`}
                >
                  {item.label}
                  <span className={styles['nav-link-underline']} aria-hidden="true" />
                  <span className={styles['nav-link-glow']} aria-hidden="true" />
                </Link>
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      {/* Divider */}
      <span className={styles['nav-divider']} aria-hidden="true" />

      {/* CTA */}
      <Link href="/visit" className={styles.cta}>
        <span className={styles['cta-text']}>Plan Your Visit</span>
      </Link>

      {/* Radix NavigationMenu handles content mounting automatically */}
    </NavigationMenu.Root>
  )
}

// ============================================
// Mobile Navigation (Radix Dialog as Sheet)
// ============================================

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pathname: string
}

function MobileNav({ open, onOpenChange, pathname }: MobileNavProps) {
  const [expandedDropdowns, setExpandedDropdowns] = useState<Set<string>>(new Set())

  const isActive = useCallback(
    (href?: string) => {
      if (!href) return false
      if (href === '/') return pathname === '/' || pathname === '/home'
      return pathname === href || pathname.startsWith(`${href}/`)
    },
    [pathname]
  )

  const isDropdownActive = useCallback(
    (items?: DropdownItem[]) => items?.some((item) => isActive(item.href)) ?? false,
    [isActive]
  )

  const toggleDropdown = useCallback((label: string) => {
    setExpandedDropdowns((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(label)) {
        newSet.delete(label)
      } else {
        newSet.add(label)
      }
      return newSet
    })
  }, [])

  const closeMenu = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  // Close on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        onOpenChange(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [open, onOpenChange])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay className={styles['mobile-backdrop']} />

        {/* Drawer Content */}
        <Dialog.Content className={styles['mobile-drawer']} aria-describedby={undefined}>
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Main navigation menu</Dialog.Title>
          </VisuallyHidden.Root>

          {/* Close Button */}
          <Dialog.Close asChild>
            <button type="button" className={styles['mobile-close']} aria-label="Close menu">
              <X size={24} />
            </button>
          </Dialog.Close>

          {/* Nav Content */}
          <nav className={styles['mobile-nav']}>
            <ul className={styles['mobile-list']}>
              {NAV_STRUCTURE.map((item, index) => (
                <li key={item.label}>
                  {item.dropdown ? (
                    <div className={styles['mobile-dropdown-wrapper']}>
                      <button
                        type="button"
                        className={`${styles['mobile-link']} ${
                          isDropdownActive(item.dropdown) ? styles['mobile-link--active'] : ''
                        }`}
                        onClick={() => toggleDropdown(item.label)}
                        aria-expanded={expandedDropdowns.has(item.label)}
                        aria-label={`Toggle ${item.label} submenu`}
                        style={{ transitionDelay: `${100 + index * 50}ms` }}
                      >
                        <span className={styles['mobile-link-text']}>
                          {item.label}
                          {item.badge && (
                            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-accent/20 text-accent border border-accent/30 rounded-sm">
                              {item.badge}
                            </span>
                          )}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`${styles['mobile-dropdown-icon']} ${
                            expandedDropdowns.has(item.label)
                              ? styles['mobile-dropdown-icon--open']
                              : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      <ul
                        className={`${styles['mobile-dropdown-list']} ${
                          expandedDropdowns.has(item.label)
                            ? styles['mobile-dropdown-list--open']
                            : ''
                        }`}
                      >
                        {item.dropdown.map((subitem) => (
                          <li key={subitem.href}>
                            {subitem.variant === 'primary' ? (
                              <Link
                                href={subitem.href}
                                className={`${styles['mobile-featured-card']} ${
                                  subitem.icon === 'scroll'
                                    ? styles['mobile-featured-card--evidence']
                                    : ''
                                }`}
                                onClick={closeMenu}
                                aria-current={isActive(subitem.href) ? 'page' : undefined}
                              >
                                <span className={styles['mobile-featured-card-content']}>
                                  <span className={styles['mobile-featured-card-label']}>
                                    {subitem.label}
                                  </span>
                                  {subitem.tagline && (
                                    <span className={styles['mobile-featured-card-tagline']}>
                                      {subitem.tagline}
                                    </span>
                                  )}
                                </span>
                                <span className={styles['mobile-featured-card-arrow']}>→</span>
                              </Link>
                            ) : (
                              <Link
                                href={subitem.href}
                                className={`${styles['mobile-dropdown-link']} ${
                                  isActive(subitem.href)
                                    ? styles['mobile-dropdown-link--active']
                                    : ''
                                }`}
                                onClick={closeMenu}
                                aria-current={isActive(subitem.href) ? 'page' : undefined}
                              >
                                {subitem.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`${styles['mobile-link']} ${
                        isActive(item.href) ? styles['mobile-link--active'] : ''
                      }`}
                      onClick={closeMenu}
                      style={{ transitionDelay: `${100 + index * 50}ms` }}
                    >
                      <span className={styles['mobile-link-text']}>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Separator */}
            <div className={styles['mobile-separator']} aria-hidden="true" />

            {/* Mobile CTA */}
            <Link href="/visit" className={styles['mobile-cta']} onClick={closeMenu}>
              <span>Plan Your Visit</span>
            </Link>

            {/* Tagline */}
            <p className={styles['mobile-tagline']}>Tennessee starts here</p>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// ============================================
// Main Navigation Component
// ============================================

function NavigationComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isScrolled = useScrollState(20)
  const pathname = useRouteChange()

  // Pages with light backgrounds need dark header
  const isLightBackgroundPage = pathname.startsWith('/evidence/documents')

  return (
    <>
      <header
        className={`${styles.header} ${
          isScrolled || mobileMenuOpen || isLightBackgroundPage
            ? styles['header--scrolled']
            : styles['header--transparent']
        }`}
      >
        {/* Tricolor stripe */}
        <div
          className={`${styles.stripe} ${isScrolled || isLightBackgroundPage ? styles['stripe--visible'] : ''}`}
          aria-hidden="true"
        >
          <span className={styles['stripe--crimson']} />
          <span className={styles['stripe--gold']} />
          <span className={styles['stripe--federal']} />
        </div>

        <div className={styles.container}>
          <div className={styles.inner}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <div className={styles['logo-stack']}>
                <span className={styles['logo-text']}>ROCKY MOUNT</span>
                <div
                  className={`${styles['logo-tagline']} ${isScrolled ? styles['logo-tagline--hidden'] : ''}`}
                >
                  <span className={styles['logo-tagline-text']}>Tennessee starts here</span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <DesktopNav pathname={pathname} />

            {/* Mobile Toggle */}
            <button
              type="button"
              className={styles['mobile-toggle']}
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open main menu"
            >
              <Menu size={20} />
              <span>Menu</span>
            </button>
          </div>

          {/* Bottom rule (hidden by CSS) */}
          <div
            className={`${styles['bottom-rule']} ${isScrolled ? styles['bottom-rule--visible'] : ''}`}
            aria-hidden="true"
          >
            <span className={styles['bottom-rule-line']} />
            <span className={styles['bottom-rule-ornament']}>✦</span>
            <span className={styles['bottom-rule-line']} />
          </div>
        </div>
      </header>

      {/* Mobile Sheet Menu (Radix Dialog) */}
      <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} pathname={pathname} />

      {/* Live region for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {mobileMenuOpen ? 'Navigation menu opened' : ''}
      </div>
    </>
  )
}

export default memo(NavigationComponent)
