# Spacing System Documentation

**Created by:** Dr. Maya Patel, PhD — Spacing Systems Architect
**Date:** January 30, 2026
**Project:** Tennessee Starts Here (tennesseestartshere.com)

---

## Executive Summary

Implemented a comprehensive spacing token system based on **8pt grid** (0.5rem = 8px) with semantic naming. The system is derived from actual usage patterns across the codebase:

- **1rem**: 309 occurrences (most common)
- **1.5rem**: 303 occurrences (nearly equal)
- **2rem**: 208 occurrences (third most common)

This creates a natural rhythm progression: **0.5rem → 1rem → 1.5rem → 2rem** that the codebase already follows organically.

---

## Token System Overview

### Base Spacing Scale (14 levels)

Built on 8pt grid (0.5rem = 8px) with progressive scaling:

```css
--space-3xs: 0.125rem; /* 2px  - Minimal separator, fine details */
--space-2xs: 0.25rem; /* 4px  - Badges, tight inline spacing */
--space-xs: 0.5rem; /* 8px  - Icon gaps, compact elements */
--space-sm: 0.75rem; /* 12px - Small padding, tight layouts */
--space-md: 1rem; /* 16px - Base spacing unit (MOST COMMON) */
--space-lg: 1.5rem; /* 24px - Card padding, comfortable spacing */
--space-xl: 2rem; /* 32px - Section spacing, large cards */
--space-2xl: 2.5rem; /* 40px - Section breaks */
--space-3xl: 3rem; /* 48px - Major section spacing */
--space-4xl: 4rem; /* 64px - Page section padding */
--space-5xl: 5rem; /* 80px - Large page sections */
--space-6xl: 6rem; /* 96px - Hero spacing */
--space-7xl: 7rem; /* 112px - Maximum vertical rhythm */
--space-8xl: 8rem; /* 128px - Rare, dramatic spacing */
```

### Gap Scale (for Flexbox/Grid)

```css
--gap-xs: 0.5rem; /* 8px  - Tight icon + text */
--gap-sm: 0.75rem; /* 12px - Compact layouts */
--gap-md: 1rem; /* 16px - Standard gap (most common) */
--gap-lg: 1.5rem; /* 24px - Comfortable card grids */
--gap-xl: 2rem; /* 32px - Spacious layouts */
--gap-2xl: 2.5rem; /* 40px - Wide grids */
--gap-3xl: 3rem; /* 48px - Hero grid spacing */
--gap-4xl: 4rem; /* 64px - Maximum grid gaps */
```

### Layout Tokens (Semantic)

```css
/* Page-level horizontal padding */
--layout-page-padding-mobile: 1.5rem; /* 24px */
--layout-page-padding-tablet: 2rem; /* 32px */
--layout-page-padding-desktop: clamp(2rem, 5vw, 7.5rem); /* Fluid 32-120px */

/* Section vertical spacing */
--layout-section-y-mobile: 4rem; /* 64px */
--layout-section-y-tablet: 5rem; /* 80px */
--layout-section-y-desktop: 5rem; /* 80px */
```

---

## Usage Patterns

### Component Spacing

```tsx
// Icon + Text (gap-md is most common)
<div className="flex items-center gap-[var(--gap-md)]">
  <MapPin className="w-4 h-4" />
  <span>Rocky Mount, TN</span>
</div>

// Card padding (use existing card tokens)
<div className="p-[var(--spacing-card-md)]">
  Card content
</div>

// Button padding
<button className="px-[var(--space-xl)] py-[var(--space-lg)]">
  Book Now
</button>

// Stacked elements
<div className="space-y-[var(--space-lg)]">
  <h3>Title</h3>
  <p>Description</p>
</div>
```

### Layout Spacing

```tsx
// Page container
<main className="px-[var(--layout-page-padding-mobile)] md:px-[var(--layout-page-padding-tablet)] lg:px-[var(--layout-page-padding-desktop)]">
  Page content
</main>

// Section spacing
<section className="py-[var(--layout-section-y-mobile)] md:py-[var(--layout-section-y-tablet)]">
  Section content
</section>

// Card grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--gap-lg)]">
  {cards.map(card => <Card key={card.id} {...card} />)}
</div>
```

### Inline Styles (when needed)

```tsx
// Hero with fluid padding
<div style={{ padding: `var(--space-7xl) var(--layout-page-padding-desktop) var(--space-4xl)` }}>
  Hero content
</div>

// Grid with fixed column gap
<div style={{ gap: 'var(--gap-3xl)', columnGap: '64px' }}>
  Grid content
</div>
```

---

## Design Rationale

### The 8pt Grid System

The **8pt grid** is a proven spacing system used by Apple, Google, and Material Design:

- **Scalability**: Easily doubles/halves (8 → 16 → 32 → 64)
- **Consistency**: All spacing is predictable and rhythmic
- **Accessibility**: 8px minimum ensures touch targets meet WCAG guidelines
- **Mathematics**: Clean multiples simplify mental math (8, 16, 24, 32)

### Token Naming Philosophy

**Base Scale (`--space-*`):**

- Uses t-shirt sizing: xs, sm, md, lg, xl, 2xl, etc.
- `md` (1rem) is the base unit (most common in codebase)
- Below `md`: Compact spacing for UI elements
- Above `md`: Layout and section spacing

**Gap Scale (`--gap-*`):**

- Specific to flex/grid gaps
- Same sizing scale as base, but different semantic meaning
- Reduces ambiguity when reading code

**Layout Tokens (`--layout-*`):**

- Semantic names describe usage, not size
- Breakpoint-specific for responsive designs
- Fluid values (`clamp()`) for desktop scaling

---

## Migration Strategy

### Phase 1: Use in New Work (Current)

Start using tokens in new components immediately:

```tsx
// Old way
<div className="px-6 py-4 gap-4">

// New way
<div className="px-[var(--space-lg)] py-[var(--space-md)] gap-[var(--gap-md)]">
```

### Phase 2: Gradual Refactoring (Optional)

Update existing components during maintenance:

```tsx
// Before
<div style={{ padding: '1.5rem' }}>

// After
<div style={{ padding: 'var(--space-lg)' }}>
```

### Phase 3: Tailwind Config Extension (Future)

For shorthand syntax, extend Tailwind config:

```js
// tailwind.config.js
theme: {
  extend: {
    spacing: {
      'xs': 'var(--space-xs)',
      'sm': 'var(--space-sm)',
      'md': 'var(--space-md)',
      'lg': 'var(--space-lg)',
      // ... etc
    },
    gap: {
      'xs': 'var(--gap-xs)',
      'md': 'var(--gap-md)',
      'lg': 'var(--gap-lg)',
      // ... etc
    }
  }
}

// Then use as:
<div className="px-lg py-md gap-md">
```

---

## Common Patterns & Examples

### Card Spacing

```tsx
// Small card (compact)
<div className="p-[var(--spacing-card-sm)]">
  {/* 1rem padding */}
</div>

// Standard card (most common)
<div className="p-[var(--spacing-card-md)] md:p-[var(--spacing-card-lg)]">
  {/* 1.5rem mobile, 2rem desktop */}
</div>

// Large card (spacious)
<div className="p-[var(--spacing-card-lg)]">
  {/* 2rem padding */}
</div>
```

### Icon + Text Combinations

```tsx
// Tight (icons in badges)
<span className="flex items-center gap-[var(--gap-xs)]">
  <Star className="w-3 h-3" />
  <span>Featured</span>
</span>

// Standard (most common)
<div className="flex items-center gap-[var(--gap-md)]">
  <MapPin className="w-4 h-4" />
  <span>Location</span>
</div>

// Comfortable (hero elements)
<div className="flex items-center gap-[var(--gap-lg)]">
  <Calendar className="w-5 h-5" />
  <span>Schedule</span>
</div>
```

### Section Spacing

```tsx
// Mobile-first section
<section className="py-[var(--layout-section-y-mobile)] px-[var(--layout-page-padding-mobile)] md:py-[var(--layout-section-y-tablet)] md:px-[var(--layout-page-padding-tablet)]">
  Section content
</section>

// Hero section (custom rhythm)
<section className="pt-[var(--space-7xl)] pb-[var(--space-4xl)] px-[var(--layout-page-padding-desktop)]">
  Hero content
</section>

// Compact section
<section className="py-[var(--space-3xl)] px-[var(--layout-page-padding-mobile)]">
  Compact section
</section>
```

### Grid Layouts

```tsx
// Card grid (comfortable spacing)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--gap-lg)]">
  {cards}
</div>

// Compact grid
<div className="grid grid-cols-2 md:grid-cols-3 gap-[var(--gap-md)]">
  {items}
</div>

// Hero grid (wide spacing)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--gap-3xl)]">
  {heroContent}
</div>
```

---

## Quick Reference

### Most Common Tokens

| Token               | Value         | Usage           | Frequency  |
| ------------------- | ------------- | --------------- | ---------- |
| `--space-md`        | 1rem (16px)   | Base spacing    | ⭐⭐⭐⭐⭐ |
| `--space-lg`        | 1.5rem (24px) | Card padding    | ⭐⭐⭐⭐⭐ |
| `--space-xl`        | 2rem (32px)   | Section spacing | ⭐⭐⭐⭐   |
| `--gap-md`          | 1rem (16px)   | Standard gap    | ⭐⭐⭐⭐⭐ |
| `--gap-lg`          | 1.5rem (24px) | Card grids      | ⭐⭐⭐⭐   |
| `--spacing-card-md` | 1.5rem (24px) | Standard cards  | ⭐⭐⭐⭐⭐ |

### Spacing Scale at a Glance

```
0.125rem → 0.25rem → 0.5rem → 0.75rem → 1rem → 1.5rem → 2rem → 2.5rem → 3rem → 4rem → 5rem → 6rem → 7rem → 8rem
  2px       4px       8px      12px     16px    24px     32px    40px     48px    64px    80px    96px   112px   128px
  3xs       2xs       xs       sm       md      lg       xl      2xl      3xl     4xl     5xl     6xl    7xl     8xl
```

### Rhythm Progression

**Compact Rhythm:** 0.5rem → 1rem → 1.5rem → 2rem
**Section Rhythm:** 2rem → 3rem → 4rem → 5rem
**Page Rhythm:** 4rem → 5rem → 7rem

---

## Accessibility Considerations

### Touch Targets

Ensure interactive elements meet WCAG 2.1 AAA minimum (44x44px):

```tsx
// Button with adequate padding
<button className="px-[var(--space-xl)] py-[var(--space-lg)]">
  {/* Minimum 44px height with 1rem (16px) text */}
  Book Now
</button>

// Icon button
<button className="p-[var(--space-md)]">
  {/* 32px + 16px padding = 48px (meets 44px minimum) */}
  <Menu className="w-4 h-4" />
</button>
```

### Focus Outlines

Spacing for focus indicators:

```css
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: var(--space-2xs); /* 4px offset */
}
```

---

## Anti-Patterns

### ❌ Don't Use Arbitrary Values

```tsx
// Bad - arbitrary spacing
<div className="px-[13px] py-[7px]">

// Good - use tokens
<div className="px-[var(--space-md)] py-[var(--space-xs)]">
```

### ❌ Don't Mix Units

```tsx
// Bad - mixing rem, px, and percentages
<div style={{ padding: '16px 1.5rem 8px 10%' }}>

// Good - consistent rem units via tokens
<div style={{ padding: 'var(--space-md) var(--space-lg) var(--space-xs) var(--space-md)' }}>
```

### ❌ Don't Over-Use Large Tokens

```tsx
// Bad - too much spacing crushes content
<div className="py-[var(--space-8xl)] px-[var(--space-7xl)]">

// Good - use appropriate scale
<div className="py-[var(--layout-section-y-mobile)] px-[var(--layout-page-padding-mobile)]">
```

---

## Future Enhancements

### Dark Mode Support

Spacing tokens are unit-agnostic, so they work in dark mode without changes. Future dark mode work would only adjust colors, not spacing.

### Component-Specific Tokens

Could add semantic tokens for specific components:

```css
--button-padding-sm: var(--space-sm) var(--space-md);
--button-padding-md: var(--space-md) var(--space-xl);
--button-padding-lg: var(--space-lg) var(--space-2xl);

--input-padding: var(--space-sm) var(--space-md);
--dropdown-padding: var(--space-md);
```

### Animation Timing Scale

Apply same token philosophy to animation durations:

```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-moderate: 300ms;
--duration-slow: 500ms;
--duration-dramatic: 800ms;
```

---

## Maintenance

### When to Add a Token

Only add tokens if:

1. The spacing is used in 3+ places
2. It represents a semantic concept (e.g., `--nav-item-padding`)
3. It fills a gap in the existing scale

**Most spacing needs are already covered by the 14-level base scale.**

### When to Adjust Token Values

Safe to adjust values as design evolves:

```diff
- --space-lg: 1.5rem;
+ --space-lg: 1.75rem;
```

Changes propagate to all components using the token. Test thoroughly after adjustments.

---

## Conclusion

The spacing system provides:

- **Consistency**: 14-level scale covers all spacing needs
- **Data-Driven**: Built on actual usage patterns (1rem, 1.5rem, 2rem most common)
- **Scalability**: 8pt grid ensures clean multiples and accessibility
- **Maintainability**: Single source of truth for all spacing

**Rhythm creates harmony. Harmony creates beauty.**

---

**Deliverables:**

| File                              | Purpose               | Status      |
| --------------------------------- | --------------------- | ----------- |
| `app/globals.css`                 | Token definitions     | ✅ Complete |
| `docs/SPACING-SYSTEM.md`          | System documentation  | ✅ Complete |
| `docs/SPACING-QUICK-REFERENCE.md` | Developer quick guide | 🔄 Next     |
| `docs/SPACING-PATTERNS.md`        | Real-world examples   | 🔄 Next     |

---

**Signed:** Dr. Maya Patel, PhD
**Role:** Spacing Systems Architect
**Date:** January 30, 2026
**Project:** Tennessee Starts Here
**Status:** Production Ready
