# Master Styling Guide

**Tennessee Starts Here — Design System Reference**

This is the definitive guide for all styling decisions. Follow these patterns to ensure consistency across the site.

---

## Quick Reference Card

### Spacing (Use These, Not Hardcoded Values)

| Token         | Value          | Use For                           |
| ------------- | -------------- | --------------------------------- |
| `--space-xs`  | 0.5rem (8px)   | Icon gaps, compact elements       |
| `--space-sm`  | 0.75rem (12px) | Small padding, tight layouts      |
| `--space-md`  | 1rem (16px)    | Base spacing (default choice)     |
| `--space-lg`  | 1.5rem (24px)  | Card padding, comfortable spacing |
| `--space-xl`  | 2rem (32px)    | Section spacing, large cards      |
| `--space-2xl` | 2.5rem (40px)  | Section breaks                    |
| `--space-3xl` | 3rem (48px)    | Major section spacing             |
| `--space-4xl` | 4rem (64px)    | Page section padding              |
| `--space-5xl` | 5rem (80px)    | Large page sections               |
| `--space-6xl` | 6rem (96px)    | Hero spacing                      |

### Shadows (Use These, Not rgba() Values)

| Token              | Use For                       |
| ------------------ | ----------------------------- |
| `--shadow-xs`      | Input fields, subtle depth    |
| `--shadow-sm`      | Small cards, dropdowns        |
| `--shadow-md`      | Standard cards, panels        |
| `--shadow-lg`      | Elevated sections, dialogs    |
| `--shadow-xl`      | Maximum elevation, overlays   |
| `--shadow-gold-sm` | CTA buttons, featured badges  |
| `--shadow-gold-lg` | Hero CTAs, signature elements |

### Motion (Use These, Not Hardcoded Durations)

| Token                 | Value | Use For                        |
| --------------------- | ----- | ------------------------------ |
| `--duration-instant`  | 100ms | Toggles, ripples               |
| `--duration-fast`     | 200ms | Hovers, focus states           |
| `--duration-base`     | 300ms | Standard transitions (default) |
| `--duration-moderate` | 400ms | Modal opens, dropdowns         |
| `--duration-slow`     | 600ms | Hero animations, reveals       |

| Easing            | Use For                |
| ----------------- | ---------------------- |
| `--ease-standard` | All-purpose (default)  |
| `--ease-smooth`   | Smooth UI transitions  |
| `--ease-spring`   | Playful, bouncy motion |
| `--ease-elegant`  | Hero animations        |

### Colors

| Token            | Value                | Use For                  |
| ---------------- | -------------------- | ------------------------ |
| `--gold-primary` | #c9a227              | Main brand gold          |
| `--gold-hover`   | #d4af37              | Interactive hover states |
| `--gold-shimmer` | rgba(201,162,39,0.4) | Glows, borders, overlays |
| `--primary`      | #0d1821              | Dark backgrounds         |
| `--cream`        | #f8f5f0              | Light backgrounds        |
| `--cream-dark`   | #f0ebe3              | Card backgrounds         |

---

## The Rules

### Rule 1: Never Hardcode Spacing

```css
/* ❌ BAD - Hardcoded values */
.card {
  padding: 1.5rem;
  margin-bottom: 2rem;
  gap: 1rem;
}

/* ✅ GOOD - Token values */
.card {
  padding: var(--space-lg);
  margin-bottom: var(--space-xl);
  gap: var(--gap-md);
}
```

### Rule 2: Never Hardcode Shadows

```css
/* ❌ BAD - Inline shadow values */
.card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* ✅ GOOD - Token values */
.card {
  box-shadow: var(--shadow-md);
}
```

### Rule 3: Never Hardcode Transitions

```css
/* ❌ BAD - Inline duration/easing */
.button {
  transition: all 0.3s ease;
}

/* ✅ GOOD - Token values */
.button {
  transition: all var(--duration-base) var(--ease-standard);
}
```

### Rule 4: Always Include Reduced Motion

Every CSS module that uses animations MUST include this block at the end:

```css
/* Reduced motion support for accessibility */
@media (prefers-reduced-motion: reduce) {
  .elementWithTransition {
    transition: none;
  }

  .elementWithAnimation {
    animation: none;
  }
}
```

### Rule 5: Use Semantic Layout Tokens for Page Padding

```css
/* ❌ BAD - Different values scattered everywhere */
.section {
  padding: 4rem 1rem;
}
@media (min-width: 768px) {
  .section {
    padding: 5rem 1.5rem;
  }
}

/* ✅ GOOD - Semantic tokens */
.section {
  padding: var(--layout-section-y-mobile) var(--layout-page-padding-mobile);
}
@media (min-width: 768px) {
  .section {
    padding: var(--layout-section-y-tablet) var(--layout-page-padding-tablet);
  }
}
@media (min-width: 1024px) {
  .section {
    padding: var(--layout-section-y-desktop) var(--layout-page-padding-desktop);
  }
}
```

---

## File Organization

### CSS Modules Structure

Every page should have its CSS module organized in this order:

```css
/* 1. LAYOUT - Page structure */
.pageWrapper {
}
.hero {
}
.section {
}

/* 2. TYPOGRAPHY - Text styles */
.title {
}
.subtitle {
}
.body {
}

/* 3. COMPONENTS - Reusable patterns */
.card {
}
.button {
}
.badge {
}

/* 4. STATES - Interactive states */
.button:hover {
}
.card:focus-visible {
}

/* 5. RESPONSIVE - Media queries */
@media (min-width: 768px) {
}
@media (min-width: 1024px) {
}

/* 6. ACCESSIBILITY - Always last */
@media (prefers-reduced-motion: reduce) {
}
```

### Component File Patterns

For special pages (error, loading, not-found), follow these patterns:

**error.tsx** - Use CSS modules, not Tailwind:

```tsx
import styles from './error.module.css'

export default function Error({ error, reset }) {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Something went wrong</h1>
      <button onClick={reset} className={styles.errorButton}>
        Try again
      </button>
    </div>
  )
}
```

**loading.tsx** - Use CSS modules with skeleton patterns:

```tsx
import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div role="status" aria-live="polite" className="sr-only">
        Loading...
      </div>
      <div className={styles.skeleton} />
    </div>
  )
}
```

---

## Accessibility Checklist

Every component MUST have:

- [ ] **Touch targets:** min-height: 44px; min-width: 44px; on all interactive elements
- [ ] **Focus states:** :focus-visible with visible outline (use global styles or override)
- [ ] **Reduced motion:** @media (prefers-reduced-motion: reduce) block
- [ ] **Screen readers:** aria-hidden="true" on decorative elements
- [ ] **Semantic HTML:** Use <button>, <a>, <nav>, <main>, <article> appropriately
- [ ] **Color contrast:** Gold on cream must meet 4.5:1 (verify with devtools)

---

## Common Patterns

### Section with Standard Padding

```css
.section {
  padding: var(--layout-section-y-mobile) var(--layout-page-padding-mobile);
  background: var(--cream);
}

@media (min-width: 768px) {
  .section {
    padding: var(--layout-section-y-tablet) var(--layout-page-padding-tablet);
  }
}

@media (min-width: 1024px) {
  .section {
    padding: var(--layout-section-y-desktop) var(--layout-page-padding-desktop);
  }
}
```

### Card with Hover Effect

```css
.card {
  padding: var(--spacing-card-md);
  background: white;
  border: var(--border-card);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-sm);
  transition:
    box-shadow var(--duration-base) var(--ease-smooth),
    border-color var(--duration-base) var(--ease-smooth),
    transform var(--duration-base) var(--ease-smooth);
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--gold-shimmer);
  transform: translateY(-2px);
}

.card:focus-visible {
  outline: 2px solid var(--gold-primary);
  outline-offset: 2px;
}
```

### Button with Gold Accent

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;
  padding: var(--space-sm) var(--space-lg);
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--primary);
  background: var(--gold-primary);
  border: none;
  border-radius: var(--radius-card);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-smooth),
    transform var(--duration-fast) var(--ease-smooth);
}

.button:hover {
  background: var(--gold-hover);
  transform: translateY(-1px);
}

.button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.button:active {
  transform: translateY(0);
}
```

### Responsive Grid

```css
.grid {
  display: grid;
  gap: var(--gap-lg);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gap-xl);
  }
}
```

---

## Token Definition Location

All tokens are defined in: `app/globals.css`

- Lines 36-65: Shadow & Gold tokens
- Lines 111-141: Motion tokens
- Lines 200-257: Spacing & Layout tokens

---

## Migration Checklist for Existing Pages

When fixing a page to use tokens:

1. **Find & Replace Spacing:**
   - `padding: 1rem` → `padding: var(--space-md)`
   - `padding: 1.5rem` → `padding: var(--space-lg)`
   - `padding: 2rem` → `padding: var(--space-xl)`
   - `gap: 1rem` → `gap: var(--gap-md)`

2. **Find & Replace Shadows:**
   - `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08)` → `box-shadow: var(--shadow-sm)`
   - `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12)` → `box-shadow: var(--shadow-md)`

3. **Find & Replace Transitions:**
   - `transition: all 0.3s ease` → `transition: all var(--duration-base) var(--ease-standard)`
   - `transition: all 0.2s ease` → `transition: all var(--duration-fast) var(--ease-standard)`

4. **Add Reduced Motion Block:**
   - Add `@media (prefers-reduced-motion: reduce)` at the end

5. **Verify Accessibility:**
   - Check all buttons/links have min-height: 44px
   - Check focus states are visible

---

**Last Updated:** January 30, 2026
**Version:** 1.0
