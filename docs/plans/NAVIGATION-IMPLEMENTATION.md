# Navigation Implementation Specification

## Rocky Mount State Historic Site

**Status:** READY FOR IMPLEMENTATION
**Date:** February 3, 2026
**Implements:** NAVIGATION-PLAN.md + EVIDENCE-ROOM-NAV.md
**Estimated Phases:** 4

---

## Executive Summary

This document provides exact implementation details for the navigation restructure. All design decisions are final.

**Key Changes:**

1. Rename "Discover" → "Explore" in main nav
2. Add 5 orphan pages to dropdowns
3. Add featured tiles for Original Seven and Evidence Room
4. Create EvidenceNav component for all `/evidence/*` pages
5. Update mobile drawer with card-style featured items

---

## Phase 1: Data Structure Updates

### File: `data/navigation.json`

**Update `_meta.updated`:** `"2026-02-03"`

**Rename `_meta._aiRules.prohibited` item:**
Change "Discover" references to "Explore"

### Changes to `mainNav` Array:

#### 1. Visit Section → "Plan Your Visit"

```json
{
  "label": "Plan Your Visit",
  "href": "/visit",
  "dropdown": [
    {
      "label": "Hours & What to Expect",
      "href": "/visit",
      "description": "Hours, admission & directions"
    },
    {
      "label": "Group Tours",
      "href": "/groups",
      "description": "Tour operators & bus groups"
    },
    {
      "label": "Field Trips & Education",
      "href": "/educators",
      "description": "Curriculum & standards"
    },
    {
      "label": "Programs & Living History",
      "href": "/programs",
      "description": "Demonstrations & activities"
    }
  ]
}
```

**Changes:**

- Section label: "Visit" → "Plan Your Visit"
- Removed "Accessibility" (moved to /visit page content)
- Added `/programs` (was orphan)
- Renamed "Group Visits" → "Group Tours"
- Renamed "For Educators" → "Field Trips & Education"
- Moved educators FROM Discover TO Plan Your Visit

#### 2. Events Section

```json
{
  "label": "Events",
  "href": "/events",
  "dropdown": [
    {
      "label": "Events Calendar",
      "href": "/events",
      "description": "All 2026 events"
    },
    {
      "label": "Lecture Series",
      "href": "/lectures",
      "description": "Speaker series"
    },
    {
      "label": "Colonial Independence Day",
      "href": "/events/colonial-independence-day",
      "description": "July 4th celebration",
      "featured": true
    },
    {
      "label": "First Families Reunion",
      "href": "/events/first-families-reunion",
      "description": "Annual homecoming"
    },
    {
      "label": "Stitching Independence",
      "href": "/events/stitching-independence",
      "description": "Textile arts event"
    }
  ]
}
```

**Changes:**

- Renamed "Full Calendar" → "Events Calendar"
- Added `/events/stitching-independence` (was orphan)

#### 3. Explore Section (Formerly "Discover")

```json
{
  "label": "Explore",
  "href": "/explore",
  "dropdown": [
    {
      "label": "The Original Seven",
      "href": "/explore",
      "description": "Interactive heritage map",
      "variant": "primary",
      "tagline": "It All Started Here.",
      "icon": "map"
    },
    {
      "label": "Where Tennessee Began",
      "href": "/our-story",
      "description": "The history of Rocky Mount"
    },
    {
      "label": "The 1775 Almanac",
      "href": "/almanac",
      "description": "Weather & farming wisdom"
    },
    {
      "label": "Evidence Room",
      "href": "/evidence",
      "description": "Primary sources & documents",
      "variant": "primary",
      "tagline": "The proof is in the documents.",
      "icon": "scroll"
    },
    {
      "label": "Historical Timeline",
      "href": "/evidence/timeline",
      "description": "Chronological view"
    }
  ]
}
```

**Changes:**

- Section label: "Discover" → "Explore"
- Section href: "/our-story" → "/explore"
- Added `/explore` with `variant: "primary"` (was orphan)
- Added `/almanac` (was orphan)
- Added `/evidence/timeline` (was orphan)
- Added `variant`, `tagline`, `icon` fields for featured tiles
- Renamed "Our Story" → "Where Tennessee Began"

#### 4. Support Section (No Changes)

```json
{
  "label": "Support",
  "href": "/support",
  "dropdown": [
    {
      "label": "First 250",
      "href": "/first-250",
      "description": "Founding member program",
      "featured": true,
      "badge": "Limited"
    },
    {
      "label": "Membership",
      "href": "/membership",
      "description": "Join the association"
    },
    {
      "label": "Donate",
      "href": "/support",
      "description": "Support our mission"
    }
  ]
}
```

### New TypeScript Interface

Update `components/Navigation.tsx` types:

```typescript
interface DropdownItem {
  href: string
  label: string
  description?: string
  featured?: boolean
  badge?: string
  // New fields for featured tiles
  variant?: 'primary' | 'secondary'
  tagline?: string
  icon?: 'map' | 'scroll' | 'calendar' | 'heart'
}
```

### Footer Navigation Updates

Update `footerNav` to match new structure:

```json
{
  "visit": [
    { "label": "Plan Your Visit", "href": "/visit" },
    { "label": "Group Tours", "href": "/groups" },
    { "label": "Field Trips", "href": "/educators" },
    { "label": "Programs", "href": "/programs" }
  ],
  "events": [
    { "label": "Events Calendar", "href": "/events" },
    { "label": "Lecture Series", "href": "/lectures" }
  ],
  "explore": [
    { "label": "The Original Seven", "href": "/explore" },
    { "label": "Where Tennessee Began", "href": "/our-story" },
    { "label": "Evidence Room", "href": "/evidence" },
    { "label": "The 1775 Almanac", "href": "/almanac" }
  ],
  "support": [
    { "label": "First 250", "href": "/first-250" },
    { "label": "Membership", "href": "/membership" },
    { "label": "Donate", "href": "/support" }
  ]
}
```

---

## Phase 2: Featured Tile Implementation

### Desktop Dropdown Rendering

When an item has `variant: "primary"`, render as a featured tile instead of a standard link.

**File:** `components/Navigation.tsx`

Add rendering logic in `DesktopNav`:

```tsx
{item.dropdown.map((subitem) => (
  <li key={subitem.href}>
    {subitem.variant === 'primary' ? (
      <NavigationMenu.Link asChild>
        <Link
          href={subitem.href}
          className={styles['dropdown-tile']}
          aria-current={isActive(subitem.href) ? 'page' : undefined}
        >
          <span className={styles['dropdown-tile-icon']}>
            {subitem.icon === 'map' && '🗺️'}
            {subitem.icon === 'scroll' && '📜'}
          </span>
          <span className={styles['dropdown-tile-content']}>
            <span className={styles['dropdown-tile-label']}>{subitem.label}</span>
            {subitem.tagline && (
              <span className={styles['dropdown-tile-tagline']}>{subitem.tagline}</span>
            )}
          </span>
          <span className={styles['dropdown-tile-arrow']}>→</span>
        </Link>
      </NavigationMenu.Link>
    ) : (
      // existing standard link rendering
    )}
  </li>
))}
```

### CSS for Featured Tiles

**File:** `components/Header/Header.module.css`

```css
/* ============================================
   FEATURED TILES - Desktop Dropdown
   ============================================ */

.dropdown-tile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  margin: 0.5rem 0.75rem;
  background: var(--territorial-blue, #1a365d);
  border-radius: 4px;
  text-decoration: none;
  transition: all var(--nav-duration-hover) ease;
  min-height: 60px;
}

.dropdown-tile:hover {
  background: var(--territorial-blue-hover, #234876);
  transform: translateX(2px);
}

.dropdown-tile--evidence {
  background: var(--log-cabin-brown, #4a3728);
}

.dropdown-tile--evidence:hover {
  background: var(--log-cabin-brown-hover, #5d4632);
}

.dropdown-tile-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.dropdown-tile-content {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  flex: 1;
}

.dropdown-tile-label {
  font-family: var(--nav-font-desktop);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
}

.dropdown-tile-tagline {
  font-family: var(--nav-font-mobile);
  font-size: 0.6875rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.02em;
}

.dropdown-tile-arrow {
  color: var(--gold, var(--nav-gold));
  font-size: 1rem;
  opacity: 0;
  transform: translateX(-0.5rem);
  transition: all var(--nav-duration-hover) ease;
}

.dropdown-tile:hover .dropdown-tile-arrow {
  opacity: 1;
  transform: translateX(0);
}

.dropdown-tile:focus-visible {
  outline: 2px solid var(--gold, var(--nav-gold));
  outline-offset: 2px;
}
```

### Mobile Card Treatment

In mobile drawer, featured items render as full-width tappable cards:

```css
/* ============================================
   MOBILE FEATURED CARDS
   ============================================ */

.mobile-featured-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  margin: 0.5rem 0;
  background: var(--territorial-blue, #1a365d);
  border-radius: 6px;
  text-decoration: none;
  min-height: var(--nav-touch-min);
}

.mobile-featured-card--evidence {
  background: var(--log-cabin-brown, #4a3728);
}

.mobile-featured-card:active {
  transform: scale(0.98);
}

.mobile-featured-card-icon {
  font-size: 1.75rem;
}

.mobile-featured-card-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mobile-featured-card-label {
  font-family: var(--nav-font-desktop);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: white;
}

.mobile-featured-card-tagline {
  font-family: var(--nav-font-mobile);
  font-size: 0.75rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
}

.mobile-featured-card-arrow {
  margin-left: auto;
  color: var(--gold, var(--nav-gold));
  font-size: 1.25rem;
}
```

---

## Phase 3: Evidence Room Sub-Navigation

### New Component: `components/evidence/EvidenceNav.tsx`

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './EvidenceNav.module.css'

const EVIDENCE_NAV_ITEMS = [
  { label: 'Overview', href: '/evidence' },
  { label: 'Documents', href: '/evidence/documents' },
  { label: 'Collections', href: '/evidence/collections' },
  { label: 'People', href: '/evidence/people' },
  { label: 'Timeline', href: '/evidence/timeline' },
]

export function EvidenceNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/evidence') {
      return pathname === '/evidence'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={styles.evidenceNav} aria-label="Evidence Room navigation">
      <div className={styles.evidenceNavHeader}>
        <span className={styles.evidenceNavIcon}>📜</span>
        <span className={styles.evidenceNavTitle}>EVIDENCE ROOM</span>
      </div>
      <div className={styles.evidenceNavDivider} aria-hidden="true" />
      <ul className={styles.evidenceNavList}>
        {EVIDENCE_NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${styles.evidenceNavLink} ${
                isActive(item.href) ? styles['evidenceNavLink--active'] : ''
              }`}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

### New CSS: `components/evidence/EvidenceNav.module.css`

```css
.evidenceNav {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--cream, #f5f1e8);
  border-bottom: 1px solid var(--gold-shimmer, rgba(212, 175, 55, 0.2));
}

.evidenceNavHeader {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.evidenceNavIcon {
  font-size: 1.25rem;
}

.evidenceNavTitle {
  font-family: var(--font-cinzel, 'Cinzel', serif);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--log-cabin-brown, #4a3728);
}

.evidenceNavDivider {
  width: 1px;
  height: 1.5rem;
  background: var(--gold-shimmer, rgba(212, 175, 55, 0.3));
}

.evidenceNavList {
  display: flex;
  align-items: center;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.evidenceNavList::-webkit-scrollbar {
  display: none;
}

.evidenceNavLink {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-family: var(--font-cinzel, 'Cinzel', serif);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted, #6b5b4f);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
  position: relative;
}

.evidenceNavLink:hover {
  color: var(--log-cabin-brown, #4a3728);
}

.evidenceNavLink--active {
  color: var(--log-cabin-brown, #4a3728);
}

.evidenceNavLink--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  height: 2px;
  background: var(--gold-primary, #d4af37);
}

.evidenceNavLink:focus-visible {
  outline: 2px solid var(--gold-primary, #d4af37);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Mobile: horizontal scroll */
@media (max-width: 640px) {
  .evidenceNav {
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
  }

  .evidenceNavHeader {
    width: 100%;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--gold-shimmer, rgba(212, 175, 55, 0.2));
  }

  .evidenceNavDivider {
    display: none;
  }

  .evidenceNavList {
    width: 100%;
    padding-bottom: 0.25rem;
  }

  .evidenceNavLink {
    padding: 0.5rem 0.75rem;
    font-size: 0.625rem;
  }
}
```

### Pages to Update

Add `<EvidenceNav />` below the hero/header on these pages:

| Page              | File                                              | Position                      |
| ----------------- | ------------------------------------------------- | ----------------------------- |
| Evidence Landing  | `app/(main)/evidence/page.tsx`                    | Below hero, above CardCatalog |
| Documents Index   | `app/(main)/evidence/documents/page.tsx`          | Top of main content           |
| Document Detail   | `app/(main)/evidence/documents/[slug]/page.tsx`   | Top of main content           |
| Collections Index | `app/(main)/evidence/collections/page.tsx`        | Top of main content           |
| Collection Detail | `app/(main)/evidence/collections/[slug]/page.tsx` | Top of main content           |
| People Index      | `app/(main)/evidence/people/page.tsx`             | Top of main content           |
| Person Detail     | `app/(main)/evidence/people/[slug]/page.tsx`      | Top of main content           |
| Timeline          | `app/(main)/evidence/timeline/page.tsx`           | Top of main content           |

**Remove from all pages:** "← Back to Evidence Room" links (replaced by EvidenceNav)

---

## Phase 4: Footer & Metadata Updates

### Footer Updates

1. Rename footer section key "discover" → "explore"
2. Update section labels to match new nav structure
3. Verify all links in footerNav match mainNav

### Metadata Updates (`lib/copy/metadata.ts`)

Update page titles to match new navigation labels:

| Page         | Current Title     | New Title                   |
| ------------ | ----------------- | --------------------------- |
| `/visit`     | "Plan Your Visit" | "Hours & What to Expect"    |
| `/groups`    | "Group Visits"    | "Group Tours"               |
| `/educators` | "For Educators"   | "Field Trips & Education"   |
| `/programs`  | "Programs"        | "Programs & Living History" |
| `/our-story` | "Our Story"       | "Where Tennessee Began"     |
| `/explore`   | "Explore"         | "The Original Seven"        |

---

## CSS Variables to Add

**File:** `app/globals.css` or CSS variables file

```css
:root {
  /* Featured tile backgrounds */
  --territorial-blue: #1a365d;
  --territorial-blue-hover: #234876;
  --log-cabin-brown: #4a3728;
  --log-cabin-brown-hover: #5d4632;
}
```

---

## Implementation Checklist

### Phase 1: Data Updates (1-2 hours)

- [ ] Update `_meta.updated` in navigation.json
- [ ] Rename Visit → Plan Your Visit
- [ ] Rename Discover → Explore
- [ ] Add `/programs` to Plan Your Visit dropdown
- [ ] Add `/events/stitching-independence` to Events dropdown
- [ ] Add `/explore` to Explore dropdown (as featured)
- [ ] Add `/almanac` to Explore dropdown
- [ ] Add `/evidence/timeline` to Explore dropdown
- [ ] Move `/educators` from Discover to Plan Your Visit
- [ ] Update footerNav to match

### Phase 2: Featured Tiles (4-6 hours)

- [ ] Add `variant`, `tagline`, `icon` to DropdownItem interface
- [ ] Add featured tile rendering in DesktopNav
- [ ] Add `.dropdown-tile` CSS styles
- [ ] Add mobile featured card rendering in MobileNav
- [ ] Add `.mobile-featured-card` CSS styles
- [ ] Add CSS variables for tile backgrounds
- [ ] Test desktop dropdown behavior
- [ ] Test mobile drawer behavior

### Phase 3: Evidence Room Sub-Nav (4-6 hours)

- [ ] Create `components/evidence/EvidenceNav.tsx`
- [ ] Create `components/evidence/EvidenceNav.module.css`
- [ ] Add to `/evidence/page.tsx`
- [ ] Add to `/evidence/documents/page.tsx`
- [ ] Add to `/evidence/documents/[slug]/page.tsx`
- [ ] Add to `/evidence/collections/page.tsx`
- [ ] Add to `/evidence/collections/[slug]/page.tsx`
- [ ] Add to `/evidence/people/page.tsx`
- [ ] Add to `/evidence/people/[slug]/page.tsx`
- [ ] Add to `/evidence/timeline/page.tsx`
- [ ] Remove "← Back to Evidence Room" links
- [ ] Test keyboard navigation
- [ ] Test mobile horizontal scroll

### Phase 4: Polish (2-4 hours)

- [ ] Update footerNav section key "discover" → "explore"
- [ ] Update page metadata/titles
- [ ] Test all navigation paths
- [ ] Verify no broken links
- [ ] Cross-browser testing
- [ ] Accessibility audit (ARIA, focus states)

---

## Accessibility Requirements

1. All navigation elements use semantic HTML (`<nav>`, `<ul>`, `<li>`)
2. Current page indicated with `aria-current="page"`
3. Dropdowns use `aria-expanded` for toggle state
4. Focus visible on all interactive elements
5. Touch targets minimum 44x44px on mobile
6. Evidence sub-nav has `aria-label="Evidence Room navigation"`
7. Mobile drawer has accessible title via VisuallyHidden

---

## Testing Plan

### Desktop

- [ ] Hover states on all dropdown items
- [ ] Featured tiles render with correct backgrounds
- [ ] Dropdown positioning correct on all screen sizes
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Current page highlighting works

### Mobile

- [ ] Drawer opens/closes smoothly
- [ ] Featured cards render with correct backgrounds
- [ ] Touch targets are accessible (44x44px minimum)
- [ ] Horizontal scroll on Evidence sub-nav
- [ ] Menu closes on link click
- [ ] FAB button visible and functional

### Cross-browser

- [ ] Chrome, Firefox, Safari (latest)
- [ ] iOS Safari, Android Chrome
- [ ] Reduced motion preferences respected

---

_Implementation specification locked February 3, 2026_
