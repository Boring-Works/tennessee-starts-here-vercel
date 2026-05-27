# Navigation Build Guide: Sample A Hybrid
## Rocky Mount State Historic Site
### January 2026

---

## Overview

Port the navigation from "Copy of Rocky Mount - Tennessee Starts Here" (Sample A) to the production site, with enhancements for brand clarity, period authenticity, and accessibility.

**Project Path:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here`

**Source Reference:** `/Users/codyboring/CodyML/projects/TNRocky/sample projects/copy-of-rocky-mount---tennessee-starts-here (1)/components/Navigation.tsx`

---

## Design Principles

1. **Brand Forward** — "Tennessee Starts Here" visible in header
2. **Commemorative** — Tricolor stripe honors America 250 / Tennessee 230
3. **Period Authentic** — Wax seal, flourishes, ornaments
4. **Conversion Focused** — First 250 prominent, CTA action-oriented
5. **Accessible** — Focus trap, escape key, scroll lock, ARIA

---

## Visual Layout

### Unscrolled (Transparent over Hero)
```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│ [40px SEAL] ROCKY MOUNT       Our Story First250 Events Lectures Almanac │
│             Tennessee Starts Here                     [🪶 Claim Your Place] │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Scrolled (Solid with Accents)
```
┌──────────────────────────────────────────────────────────────────────────┐
│ ████████████ CRIMSON ████████████ GOLD ████████████ FEDERAL BLUE ███████ │
├──────────────────────────────────────────────────────────────────────────┤
│ [32px SEAL] ROCKY MOUNT       Our Story First250 Events Lectures Almanac │
│                                                       [🪶 Claim Your Place] │
├──────────────────────────────────────────────────────────────────────────┤
│                            ────── ✦ ──────                               │
└──────────────────────────────────────────────────────────────────────────┘
```

### Mobile Drawer
```
┌─────────────────────────────────┐
│                           [X]   │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │         1790              │  │  ← Watermark (2% opacity)
│  │                           │  │
│  │   Navigation              │  │
│  │   ─────────────           │  │
│  │                           │  │
│  │   01  Our Story           │  │
│  │   02  First 250           │  │
│  │   03  Events              │  │
│  │   04  Lectures            │  │
│  │   05  Almanac             │  │
│  │                           │  │
│  │   ┌─────────────────────┐ │  │
│  │   │  Claim Your Place   │ │  │
│  │   └─────────────────────┘ │  │
│  │                           │  │
│  │   ❧ Tennessee Starts Here ❧ │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

## Files to Modify

| File | Action |
|------|--------|
| `/components/Navigation.tsx` | **Replace** — New implementation |
| `/components/Header/Header.module.css` | **Replace** — New styles |

## Files to Create

| File | Purpose |
|------|---------|
| `/components/WaxSealSVG.tsx` | SVG wax seal component |

## Dependencies to Add

```bash
npm install lucide-react
```

---

## Component Specifications

### 1. WaxSealSVG.tsx (NEW)

**Location:** `/components/WaxSealSVG.tsx`

```tsx
interface WaxSealSVGProps {
  className?: string;
  size?: number;
}

export function WaxSealSVG({ className = '', size = 40 }: WaxSealSVGProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
    >
      {/* Outer glow */}
      <defs>
        <filter id="seal-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4"/>
        </filter>
        <radialGradient id="seal-gradient" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#a82828"/>
          <stop offset="50%" stopColor="#722F37"/>
          <stop offset="80%" stopColor="#5a2329"/>
          <stop offset="100%" stopColor="#4a1f24"/>
        </radialGradient>
        <radialGradient id="seal-highlight" cx="30%" cy="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      
      {/* Main seal body */}
      <circle 
        cx="50" cy="50" r="46" 
        fill="url(#seal-gradient)" 
        filter="url(#seal-shadow)"
      />
      
      {/* Inner highlight */}
      <circle 
        cx="50" cy="50" r="44" 
        fill="url(#seal-highlight)"
      />
      
      {/* Gold ring */}
      <circle 
        cx="50" cy="50" r="38" 
        fill="none" 
        stroke="#C9A227" 
        strokeWidth="1" 
        opacity="0.5"
      />
      
      {/* RM Text */}
      <text 
        x="50" y="58" 
        textAnchor="middle" 
        fill="#C9A227" 
        fontFamily="var(--font-cinzel), Cinzel, serif" 
        fontSize="28" 
        fontWeight="bold"
      >
        RM
      </text>
      
      {/* Year text */}
      <text 
        x="50" y="72" 
        textAnchor="middle" 
        fill="#C9A227" 
        fontFamily="var(--font-cinzel), Cinzel, serif" 
        fontSize="8" 
        fontWeight="600"
        letterSpacing="0.1em"
        opacity="0.7"
      >
        EST. 1770
      </text>
    </svg>
  );
}
```

---

### 2. Navigation.tsx (REPLACE)

**Location:** `/components/Navigation.tsx`

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, Feather } from "lucide-react";
import { WaxSealSVG } from "./WaxSealSVG";
import styles from "./Header/Header.module.css";

const NAV_LINKS = [
  { href: "/", label: "Our Story" },
  { href: "/first-250", label: "First 250" },
  { href: "/events", label: "Events" },
  { href: "/lectures", label: "Lectures" },
  { href: "/almanac", label: "Almanac" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll lock + escape key + focus trap
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Focus first interactive element
      const firstFocusable = menuRef.current?.querySelector("a, button");
      if (firstFocusable) (firstFocusable as HTMLElement).focus();
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      
      // Focus trap
      if (e.key === "Tab" && mobileMenuOpen && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll("a, button");
        const first = focusables[0] as HTMLElement;
        const last = focusables[focusables.length - 1] as HTMLElement;
        
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [mobileMenuOpen]);

  const isActive = useCallback((href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/home";
    return pathname.startsWith(href);
  }, [pathname]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`${styles.header} ${
          isScrolled || mobileMenuOpen
            ? styles["header--scrolled"]
            : styles["header--transparent"]
        }`}
        role="banner"
      >
        {/* Tricolor stripe - appears on scroll */}
        <div
          className={`${styles.stripe} ${isScrolled ? styles["stripe--visible"] : ""}`}
          aria-hidden="true"
        >
          <span className={styles["stripe--crimson"]} />
          <span className={styles["stripe--gold"]} />
          <span className={styles["stripe--federal"]} />
        </div>

        <div className={styles.container}>
          <div className={styles.inner}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <WaxSealSVG 
                className={`${styles.seal} ${isScrolled ? styles["seal--small"] : ""}`}
                size={isScrolled ? 32 : 40}
              />
              <div className={styles["logo-stack"]}>
                <span className={styles["logo-text"]}>ROCKY MOUNT</span>
                <div className={`${styles["logo-tagline"]} ${isScrolled ? styles["logo-tagline--hidden"] : ""}`}>
                  <span className={styles["logo-tagline-dash"]} aria-hidden="true" />
                  <span className={styles["logo-tagline-text"]}>Tennessee Starts Here</span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className={styles.nav} aria-label="Main navigation">
              <ul className={styles["nav-list"]} role="menubar">
                {NAV_LINKS.map((link) => (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`${styles["nav-link"]} ${
                        isActive(link.href) ? styles["nav-link--active"] : ""
                      }`}
                    >
                      {link.label}
                      <span className={styles["nav-link-underline"]} aria-hidden="true" />
                      <span className={styles["nav-link-glow"]} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <span className={styles["nav-divider"]} aria-hidden="true" />

              {/* CTA */}
              <Link href="/first-250" className={styles.cta}>
                <span className={styles["cta-text"]}>Claim Your Place</span>
                <Feather className={styles["cta-icon"]} size={14} />
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              type="button"
              className={styles["mobile-toggle"]}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Decorative bottom rule - appears on scroll */}
          <div
            className={`${styles["bottom-rule"]} ${isScrolled ? styles["bottom-rule--visible"] : ""}`}
            aria-hidden="true"
          >
            <span className={styles["bottom-rule-line"]} />
            <span className={styles["bottom-rule-ornament"]}>✦</span>
            <span className={styles["bottom-rule-line"]} />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.mobile} ${mobileMenuOpen ? styles["mobile--open"] : ""}`}
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Backdrop */}
        <div
          className={styles["mobile-backdrop"]}
          onClick={closeMobileMenu}
        />

        {/* Drawer */}
        <div className={styles["mobile-drawer"]}>
          {/* Watermark */}
          <div className={styles["mobile-watermark"]} aria-hidden="true">
            1790
          </div>

          {/* Border inset */}
          <div className={styles["mobile-border"]} aria-hidden="true" />

          {/* Content */}
          <nav className={styles["mobile-nav"]}>
            <span className={styles["mobile-label"]}>Navigation</span>

            <ul className={styles["mobile-list"]}>
              {NAV_LINKS.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles["mobile-link"]} ${
                      isActive(link.href) ? styles["mobile-link--active"] : ""
                    }`}
                    onClick={closeMobileMenu}
                    style={{ transitionDelay: `${100 + index * 50}ms` }}
                  >
                    <span className={styles["mobile-link-number"]}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles["mobile-link-text"]}>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <Link
              href="/first-250"
              className={styles["mobile-cta"]}
              onClick={closeMobileMenu}
            >
              <span>Claim Your Place</span>
              <Feather size={16} />
            </Link>

            {/* Footer flourish */}
            <div className={styles["mobile-footer"]}>
              <span className={styles["mobile-footer-flourish"]}>❧</span>
              <span className={styles["mobile-footer-text"]}>Tennessee Starts Here</span>
              <span className={`${styles["mobile-footer-flourish"]} ${styles["mobile-footer-flourish--flip"]}`}>❧</span>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
```

---

### 3. Header.module.css (REPLACE)

**Location:** `/components/Header/Header.module.css`

```css
/* ============================================
   NAVIGATION - Sample A Hybrid
   Rocky Mount State Historic Site
   ============================================ */

/* ============================================
   HEADER
   ============================================ */

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.header--transparent {
  padding-top: 2rem;
  padding-bottom: 1rem;
  background: transparent;
}

.header--scrolled {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background: rgba(10, 15, 20, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

/* ============================================
   TRICOLOR STRIPE
   ============================================ */

.stripe {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  display: flex;
  z-index: 50;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.stripe--visible {
  transform: scaleY(1);
}

.stripe--crimson {
  flex: 1;
  background: #8D0801;
}

.stripe--gold {
  flex: 1;
  background: #C9A227;
}

.stripe--federal {
  flex: 1;
  background: #1a365d;
}

/* ============================================
   CONTAINER
   ============================================ */

.container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
}

/* ============================================
   LOGO
   ============================================ */

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  border-radius: 2px;
  transition: opacity 0.2s ease;
}

.logo:hover {
  opacity: 0.9;
}

.logo:focus-visible {
  outline: 2px solid var(--gold, #C9A227);
  outline-offset: 4px;
}

.seal {
  flex-shrink: 0;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.seal--small {
  transform: scale(0.8);
}

.logo-stack {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.logo-text {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: white;
  transition: color 0.3s ease;
}

@media (min-width: 768px) {
  .logo-text {
    font-size: 1.5rem;
  }
}

.logo:hover .logo-text {
  color: var(--gold, #C9A227);
}

.logo-tagline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: left;
  height: 1rem;
  opacity: 1;
}

.logo-tagline--hidden {
  height: 0;
  opacity: 0;
}

.logo-tagline-dash {
  width: 1rem;
  height: 1px;
  background: var(--gold, #C9A227);
}

.logo-tagline-text {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 0.5625rem;
  font-style: italic;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(201, 162, 39, 0.8);
  white-space: nowrap;
}

/* ============================================
   DESKTOP NAV
   ============================================ */

.nav {
  display: none;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .nav {
    display: flex;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  position: relative;
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  padding: 0.5rem 0.25rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: white;
}

.nav-link--active {
  color: white;
}

.nav-link:focus-visible {
  outline: 2px solid var(--gold, #C9A227);
  outline-offset: 4px;
  border-radius: 2px;
}

/* Underline animation */
.nav-link-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--gold, #C9A227);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.nav-link:hover .nav-link-underline,
.nav-link--active .nav-link-underline {
  transform: scaleX(1);
}

/* Glow effect */
.nav-link-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(201, 162, 39, 0.15) 0%, transparent 70%);
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;
}

.nav-link:hover .nav-link-glow,
.nav-link--active .nav-link-glow {
  opacity: 1;
}

/* Divider */
.nav-divider {
  width: 1px;
  height: 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 1rem;
  transform: rotate(12deg);
}

/* ============================================
   CTA BUTTON
   ============================================ */

.cta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: transparent;
  border: 1px solid rgba(201, 162, 39, 0.5);
  color: rgba(201, 162, 39, 0.9);
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  box-shadow: 0 0 15px rgba(201, 162, 39, 0.1);
  transition: all 0.3s ease;
}

.cta:hover {
  background: rgba(10, 15, 20, 0.5);
  border-color: var(--gold, #C9A227);
  color: white;
  box-shadow: 0 0 25px rgba(201, 162, 39, 0.3);
}

.cta:focus-visible {
  outline: 2px solid var(--gold, #C9A227);
  outline-offset: 2px;
}

.cta-icon {
  transition: transform 0.3s ease;
}

.cta:hover .cta-icon {
  transform: rotate(45deg);
}

/* ============================================
   BOTTOM RULE
   ============================================ */

.bottom-rule {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding-top: 0.75rem;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.4s ease;
}

.bottom-rule--visible {
  opacity: 1;
  transform: translateY(0);
}

.bottom-rule-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold, #C9A227), transparent);
}

.bottom-rule-ornament {
  color: var(--gold, #C9A227);
  font-size: 0.5rem;
  opacity: 0.7;
}

/* ============================================
   MOBILE TOGGLE
   ============================================ */

.mobile-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  border-radius: 2px;
  z-index: 70;
}

@media (min-width: 768px) {
  .mobile-toggle {
    display: none;
  }
}

.mobile-toggle:hover {
  color: var(--gold, #C9A227);
}

.mobile-toggle:focus-visible {
  outline: 2px solid var(--gold, #C9A227);
  outline-offset: 2px;
}

/* ============================================
   MOBILE MENU
   ============================================ */

.mobile {
  position: fixed;
  inset: 0;
  z-index: 55;
  visibility: hidden;
  transition: visibility 0.5s;
}

@media (min-width: 768px) {
  .mobile {
    display: none;
  }
}

.mobile--open {
  visibility: visible;
}

/* Backdrop */
.mobile-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(10, 15, 20, 0.9);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.mobile--open .mobile-backdrop {
  opacity: 1;
}

/* Drawer */
.mobile-drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 24rem;
  height: 100%;
  background: #0a0f14;
  border-left: 1px solid rgba(201, 162, 39, 0.2);
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.mobile--open .mobile-drawer {
  transform: translateX(0);
}

/* Watermark */
.mobile-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 30vw;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.02);
  pointer-events: none;
  user-select: none;
}

/* Border inset */
.mobile-border {
  position: absolute;
  inset: 1rem;
  border: 1px solid rgba(201, 162, 39, 0.15);
  border-radius: 2px;
  pointer-events: none;
}

/* Nav content */
.mobile-nav {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 6rem 2rem 2rem;
}

.mobile-label {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

/* Mobile links */
.mobile-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  opacity: 0;
  transform: translateX(2rem);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile--open .mobile-link {
  opacity: 1;
  transform: translateX(0);
}

.mobile-link-number {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 0.875rem;
  color: rgba(201, 162, 39, 0.5);
  transition: color 0.3s ease;
}

.mobile-link:hover .mobile-link-number,
.mobile-link--active .mobile-link-number {
  color: var(--gold, #C9A227);
}

.mobile-link-text {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.75rem;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
}

.mobile-link:hover .mobile-link-text,
.mobile-link--active .mobile-link-text {
  color: var(--gold, #C9A227);
}

.mobile-link:focus-visible {
  outline: 2px solid var(--gold, #C9A227);
  outline-offset: 4px;
  border-radius: 2px;
}

/* Mobile CTA */
.mobile-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: auto;
  padding: 1rem 2rem;
  background: var(--gold, #C9A227);
  color: #0a0f14;
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  box-shadow: 0 4px 20px rgba(201, 162, 39, 0.3);
  opacity: 0;
  transform: translateY(2rem);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.3s;
}

.mobile--open .mobile-cta {
  opacity: 1;
  transform: translateY(0);
}

.mobile-cta:hover {
  background: #d4af37;
}

.mobile-cta:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

/* Mobile footer */
.mobile-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(201, 162, 39, 0.15);
}

.mobile-footer-flourish {
  color: rgba(201, 162, 39, 0.5);
  font-size: 0.875rem;
}

.mobile-footer-flourish--flip {
  transform: scaleX(-1);
}

.mobile-footer-text {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 0.625rem;
  font-style: italic;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}

/* ============================================
   REDUCED MOTION
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  .header,
  .stripe,
  .seal,
  .logo-tagline,
  .nav-link-underline,
  .nav-link-glow,
  .bottom-rule,
  .mobile-drawer,
  .mobile-backdrop,
  .mobile-link,
  .mobile-cta,
  .cta-icon {
    transition: none;
  }
}
```

---

## Implementation Checklist

### Phase 1: Install Dependencies
- [ ] Run `npm install lucide-react`

### Phase 2: Create Components
- [ ] Create `/components/WaxSealSVG.tsx`

### Phase 3: Replace Files
- [ ] Replace `/components/Navigation.tsx`
- [ ] Replace `/components/Header/Header.module.css`

### Phase 4: Verify
- [ ] `npm run build` — no errors
- [ ] Desktop: Logo + tagline visible, collapses on scroll
- [ ] Desktop: Tricolor stripe appears on scroll
- [ ] Desktop: Menu links work, active state shows
- [ ] Desktop: CTA links to /first-250, Feather rotates on hover
- [ ] Desktop: Bottom rule appears on scroll
- [ ] Mobile: Toggle opens drawer
- [ ] Mobile: "1790" watermark visible
- [ ] Mobile: Numbered links work
- [ ] Mobile: Staggered animation on open
- [ ] Mobile: CTA works
- [ ] Mobile: Escape key closes
- [ ] Mobile: Focus trapped in drawer
- [ ] A11y: Skip link works
- [ ] A11y: Tab navigation works

---

## Key Differences from Current Production

| Element | Production | New |
|---------|------------|-----|
| Seal size | 28px static | 40px → 32px on scroll |
| Tagline | None in header | "Tennessee Starts Here" collapses |
| Menu items | Home, Events, Lectures, First 250, Almanac | Our Story, First 250, Events, Lectures, Almanac |
| Top accent | 2px gold gradient | 4px tricolor stripe |
| CTA | "Plan Your Visit" with ★ | "Claim Your Place" with Feather |
| Mobile style | Accordion | Slide-in drawer |
| Mobile links | Centered with ◆ bullets | Numbered (01, 02) |
| Mobile atmosphere | "Where Tennessee Began" | "1790" watermark + flourish footer |
| Scroll lock | ❌ | ✅ |
| Focus trap | ❌ | ✅ |
| Escape key | ❌ | ✅ |

---

## Color Reference

| Name | Value | Usage |
|------|-------|-------|
| Crimson | `#8D0801` | Stripe left |
| Gold | `#C9A227` | Stripe center, accents |
| Federal Blue | `#1a365d` | Stripe right |
| Background | `#0a0f14` | Header scrolled, mobile drawer |

---

## Typography Reference

| Element | Font | Size | Weight | Tracking |
|---------|------|------|--------|----------|
| Logo text | Cinzel | 1.25-1.5rem | 700 | 0.2em |
| Logo tagline | Cormorant | 0.5625rem | 400 italic | 0.2em |
| Nav links | Cinzel | 0.6875rem | 600 | 0.15em |
| CTA | Cinzel | 0.625rem | 600 | 0.12em |
| Mobile links | Cormorant | 1.75rem | 400 | — |
| Mobile numbers | Cormorant | 0.875rem | 400 | — |

---

## Success Criteria

1. ✅ Tricolor stripe appears on scroll
2. ✅ Wax seal always visible, scales on scroll
3. ✅ "Tennessee Starts Here" tagline collapses on scroll
4. ✅ Menu: Our Story | First 250 | Events | Lectures | Almanac
5. ✅ CTA: "Claim Your Place" with Feather icon rotation
6. ✅ Bottom ✦ rule appears on scroll
7. ✅ Mobile drawer slides in from right
8. ✅ Mobile has "1790" watermark
9. ✅ Mobile links numbered and staggered
10. ✅ Scroll lock + focus trap + escape key
11. ✅ Build passes
12. ✅ All links navigate correctly

---

**End of Build Guide**
