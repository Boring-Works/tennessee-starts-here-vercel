# Evidence Room Navigation Specification

## Standardized Internal Navigation

**Status:** APPROVED
**Locked:** February 3, 2026
**Implements:** Phase 2 of NAVIGATION-PLAN.md

---

## Problem Statement

The Evidence Room currently has inconsistent navigation:

- Landing page (`/evidence`) has CardCatalog sidebar + hero grid
- Sub-pages (`/evidence/documents`, etc.) only have "← Back to Evidence Room" links
- No way to navigate between sub-sections without returning to landing
- Timeline page is orphaned (no links point to it)

---

## Solution: EvidenceNav Component

A horizontal sub-navigation bar that appears on ALL Evidence Room pages.

### Visual Design

```
┌─────────────────────────────────────────────────────────────────────┐
│  📜 EVIDENCE ROOM                                                   │
│  ─────────────────────────────────────────────────────────────────  │
│  [Overview]  [Documents]  [Collections]  [People]  [Timeline]       │
│      ▲                                                              │
│   (active)                                                          │
└─────────────────────────────────────────────────────────────────────┘
```

### Mobile Design

Horizontal scroll with active indicator:

```
┌────────────────────────────┐
│ 📜 EVIDENCE ROOM           │
│ ←[Overview][Docs][Coll]→   │
└────────────────────────────┘
```

---

## Navigation Items

```typescript
const EVIDENCE_NAV_ITEMS = [
  {
    label: 'Overview',
    href: '/evidence',
    description: 'Collections & featured documents',
  },
  {
    label: 'Documents',
    href: '/evidence/documents',
    description: 'Searchable archive',
  },
  {
    label: 'Collections',
    href: '/evidence/collections',
    description: 'Curated groupings',
  },
  {
    label: 'People',
    href: '/evidence/people',
    description: 'Historical figures',
  },
  {
    label: 'Timeline',
    href: '/evidence/timeline',
    description: 'Chronological view',
  },
]
```

---

## Component Specification

### File Location

`components/evidence/EvidenceNav.tsx`

### Props

```typescript
interface EvidenceNavProps {
  currentPath: string // For active state highlighting
}
```

### Behavior

1. Renders on all `/evidence/*` pages
2. Highlights current section
3. Sticky on scroll (optional - test UX)
4. Accessible: proper ARIA labels, keyboard navigation

### Styling

- Background: `var(--cream)` or `var(--primary)` depending on page context
- Active item: `var(--gold-primary)` underline
- Font: Match site typography (Cinzel for labels)
- Height: ~60px desktop, ~50px mobile

---

## Pages to Update

| Page              | File                                              | Changes                           |
| ----------------- | ------------------------------------------------- | --------------------------------- |
| Evidence Landing  | `app/(main)/evidence/page.tsx`                    | Add EvidenceNav below hero        |
| Documents         | `app/(main)/evidence/documents/page.tsx`          | Add EvidenceNav, remove back link |
| Document Detail   | `app/(main)/evidence/documents/[slug]/page.tsx`   | Add EvidenceNav, add breadcrumb   |
| Collections       | `app/(main)/evidence/collections/page.tsx`        | Add EvidenceNav, remove back link |
| Collection Detail | `app/(main)/evidence/collections/[slug]/page.tsx` | Add EvidenceNav, add breadcrumb   |
| People            | `app/(main)/evidence/people/page.tsx`             | Add EvidenceNav, remove back link |
| Person Detail     | `app/(main)/evidence/people/[slug]/page.tsx`      | Add EvidenceNav, add breadcrumb   |
| Timeline          | `app/(main)/evidence/timeline/page.tsx`           | Add EvidenceNav                   |

---

## CardCatalog Disposition

**Keep CardCatalog on `/evidence` landing page.**

CardCatalog navigates sections WITHIN the landing page (Letters, Treaty Signers, Sources, etc.). EvidenceNav navigates BETWEEN pages. They serve different purposes.

On landing page, stack them:

1. EvidenceNav (top, full width)
2. Hero section
3. CardCatalog (sidebar, desktop only)

---

## Breadcrumbs for Deep Pages

For `/evidence/documents/[slug]` and similar:

```
Evidence Room > Documents > [Document Title]
```

Component: `EvidenceBreadcrumb.tsx`

```typescript
interface EvidenceBreadcrumbProps {
  currentPage: string
  parentSection?: {
    label: string
    href: string
  }
}
```

---

## Accessibility Requirements

1. `<nav>` element with `aria-label="Evidence Room navigation"`
2. Current page marked with `aria-current="page"`
3. Focus visible on keyboard navigation
4. Skip link: "Skip to Evidence Room content"
5. Mobile: touch targets minimum 44x44px

---

## Implementation Checklist

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
- [ ] Create `EvidenceBreadcrumb.tsx` for detail pages
- [ ] Test keyboard navigation
- [ ] Test mobile horizontal scroll
- [ ] Verify ARIA compliance

---

_Specification locked February 3, 2026_
