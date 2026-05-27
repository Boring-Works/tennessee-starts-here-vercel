# CSS/Tailwind Standardization Guide

**Tennessee Starts Here** - Component & Utility Standardization Strategy

**Status:** Audit Complete | Ready for Phased Implementation
**Last Updated:** January 2026

---

## Executive Summary

The codebase has strong design tokens in place (`globals.css`) but lacks standardized component patterns. This leads to:

- **30+ hardcoded rgba() values** across components (e.g., `rgba(139, 69, 19, 0.1)` used 6+ times independently)
- **Fragmented CTA buttons** with different class names (`.hero-cta`, `.cta-primary`, `.calendar-cta-btn`, `.buttonPrimary`)
- **Similar sections with different implementations** (hero patterns, story sections, card variants)
- **Mixed approach:** Some patterns use Tailwind utilities, others use CSS modules, some use inline styles

**Goal:** 20% standardization effort to cover 80% of components.

---

## Current State Assessment

### What's Working Well

| System               | Status    | Examples                                                 |
| -------------------- | --------- | -------------------------------------------------------- |
| **Design Tokens**    | Strong    | `--gold-primary`, `--overlay-*`, `--shadow-*`            |
| **Color System**     | Excellent | All colors centralized, accessible ratios proven         |
| **Typography Scale** | Strong    | `--font-serif`, `--font-serif-elegant`, families defined |
| **Spacing Scale**    | Good      | `--space-xs` through `--space-8xl` (8pt grid)            |
| **Animation System** | Good      | Duration and easing tokens defined                       |
| **Shadow System**    | Good      | 7-level elevation scale established                      |

### What Needs Work

| Area                     | Problem                                                                             | Impact                                                |
| ------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Button Family**        | 4+ different button implementations                                                 | Inconsistent interaction feedback, harder to maintain |
| **Hero Sections**        | Multiple class names: `.hero-cta`, `.hero-cta-primary` vs other sections            | Duplicated patterns, harder to refactor               |
| **Cards**                | `.card` (Tailwind CVA), `.card-document` (CSS), `.card-featured` (different states) | Unclear which to use when                             |
| **Overlays in Tailwind** | CVA shadows use `shadow-[0_4px_20px_rgba(0,0,0,0.06)]` (hardcoded)                  | Prevents token reuse                                  |
| **Section Wrappers**     | `.story-section`, `.calendar-header` patterns differ                                | No unified section pattern                            |
| **Inline Styles**        | `ConsolidatedProof.tsx`, `ConsolidatedStory.tsx` have 40+ inline rgba values        | Tokens ignored, hard to update globally               |

---

## Core Utility Classes to Create

### 1. Button Family (HIGHEST PRIORITY)

**Current state:** 4 different button implementations
**Proposed standard:** Single family with modifiers

#### Create: `buttons.css` (in `app/` or as Tailwind utilities)

```css
/* Button Base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: var(--radius-card, 2px);
  transition: all var(--duration-base) var(--ease-smooth);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  border: none;
  cursor: pointer;
  min-height: 44px; /* WCAG 2.1 AAA touch target */
}

/* Size variants */
.btn--large {
  padding: 1rem 2.5rem;
  font-size: 0.8125rem;
  letter-spacing: 0.12em;
}

.btn--medium {
  padding: 0.875rem 2rem;
  font-size: 0.8125rem;
  letter-spacing: 0.05em;
}

.btn--small {
  padding: 0.75rem 1.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

/* Style variants */
.btn--primary {
  background: var(--accent);
  color: var(--primary);
  border: 1px solid var(--accent);
  box-shadow:
    0 2px 8px var(--gold-shimmer),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.btn--primary:hover {
  background: var(--gold-hover);
  transform: translateY(-2px);
  box-shadow:
    0 4px 16px var(--gold-shimmer),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.btn--primary::before {
  content: '';
  position: absolute;
  inset: 2px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  pointer-events: none;
}

.btn--secondary {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid var(--gold-shimmer);
}

.btn--secondary:hover {
  border-color: var(--gold-shimmer);
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.btn--secondary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--gold-shimmer), transparent);
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-smooth);
}

.btn--secondary:hover::before {
  opacity: 1;
}

.btn--ghost {
  background: transparent;
  color: var(--foreground);
  border: 2px solid var(--foreground);
}

.btn--ghost:hover {
  background: var(--foreground);
  color: white;
  gap: 0.75rem;
}

/* Focus states */
.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }

  .btn:hover {
    transform: none;
  }
}
```

**Usage:**

```tsx
// Replace all these:
.hero-cta-primary → .btn .btn--primary .btn--large
.calendar-cta-btn → .btn .btn--primary .btn--medium
.story-footer-cta → .btn .btn--ghost .btn--small
.buttonPrimary → .btn .btn--primary .btn--medium
```

---

### 2. Section Wrapper (HIGH PRIORITY)

**Current state:** `.story-section`, `.calendar-header` patterns differ
**Proposed standard:** Base wrapper with variants

```css
/* Section Base */
.section {
  position: relative;
  z-index: 1;
  width: 100%;
}

.section-padding {
  padding: var(--layout-section-y-mobile) var(--layout-page-padding-mobile);
}

@media (min-width: 768px) {
  .section-padding {
    padding: var(--layout-section-y-desktop) var(--layout-page-padding-tablet);
  }
}

@media (min-width: 1024px) {
  .section-padding {
    padding: var(--layout-section-y-desktop) var(--layout-page-padding-desktop);
  }
}

/* Color variants */
.section--light {
  background: var(--cream);
  color: var(--foreground);
}

.section--dark {
  background: var(--primary);
  color: white;
}

.section--white {
  background: white;
  color: var(--foreground);
}

/* Container inside section */
.section-container {
  max-width: 52rem;
  margin: 0 auto;
  width: 100%;
}

.section-container--wide {
  max-width: 1200px;
}

.section-container--full {
  max-width: 100%;
}

/* Texture overlay (optional) */
.section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}

.section-content {
  position: relative;
  z-index: 1;
}
```

**Usage:**

```tsx
// Before:
<section className={styles['story-section']}>
  <div className={styles['story-container']}>

// After:
<section className="section section--light">
  <div className="section-container section-padding">
```

---

### 3. Card System (MEDIUM PRIORITY)

**Current state:** `.card` (CVA), `.card-document` (CSS), separate implementations
**Proposed standard:** Consolidate patterns

```css
/* Card Base - Use existing Card.tsx CVA, but extend with new variants */

.card-document {
  position: relative;
  background: linear-gradient(135deg, #fdfbf7 0%, #f8f4ec 50%, #f0e8d8 100%);
  box-shadow:
    inset 0 0 30px var(--overlay-brown-subtle),
    var(--shadow-sm);
  border: 1px solid var(--overlay-brown-light);
  border-radius: var(--radius-card, 2px);
  padding: var(--spacing-card-md);
}

@media (min-width: 768px) {
  .card-document {
    padding: var(--spacing-card-lg);
  }
}

/* Aged variant */
.card-document--aged {
  position: relative;
  background: linear-gradient(135deg, #faf6ee 0%, #f5efe2 30%, #ebe3d0 70%, #e5dbc5 100%);
  box-shadow:
    inset 0 0 40px var(--overlay-brown-light),
    var(--shadow-sm);
  border: 1px solid var(--overlay-brown-medium);
}

.card-document--aged::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 60px var(--overlay-brown-medium);
  pointer-events: none;
  border-radius: inherit;
}

/* Featured variant */
.card-document--featured {
  position: relative;
  background: linear-gradient(135deg, #fdfbf7 0%, #f8f4ec 50%, #f0e8d8 100%);
  box-shadow:
    inset 0 0 30px var(--overlay-brown-subtle),
    0 4px 20px var(--overlay-brown-light);
  border: 2px solid var(--accent);
  border-radius: var(--radius-card, 2px);
}

.card-document--featured::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    var(--overlay-gold-medium) 0%,
    transparent 50%,
    var(--overlay-gold-light) 100%
  );
  pointer-events: none;
  z-index: -1;
}

/* Card Grid */
.card-grid {
  display: grid;
  gap: var(--gap-lg);
  width: 100%;
}

@media (min-width: 640px) {
  .card-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (min-width: 1024px) {
  .card-grid {
    gap: var(--gap-xl);
  }
}
```

**Usage:**

```tsx
// Replace scattered implementations:
Existing Card.tsx (Tailwind CVA) - KEEP, it's good
.card-document classes - KEEP, add to main CSS
New variants use CSS module variables consistently
```

---

### 4. Badge System (MEDIUM PRIORITY)

**Current state:** Scattered badge patterns in components
**Proposed standard:** Unified badge family

```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
}

.badge--primary {
  background: var(--accent);
  color: var(--primary);
}

.badge--secondary {
  background: var(--secondary);
  color: white;
}

.badge--success {
  background: var(--almanac-success);
  color: white;
}

.badge--warning {
  background: var(--almanac-warning);
  color: #000;
}

.badge--danger {
  background: var(--almanac-danger);
  color: white;
}

.badge--outline {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
}

.badge--small {
  padding: 0.25rem 0.75rem;
  font-size: 0.65rem;
}

.badge--large {
  padding: 0.75rem 1.5rem;
  font-size: 0.85rem;
}
```

---

### 5. Divider Family (MEDIUM PRIORITY)

**Current state:** `.section-divider`, `.chapter-divider` patterns
**Proposed standard:** Single family with variants

```css
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 1rem;
  width: 100%;
}

.divider-line {
  flex: 1;
  max-width: 150px;
  height: 1px;
  background: var(--gradient-divider);
}

.divider-ornament {
  color: var(--accent);
  font-size: 1.25rem;
  opacity: 0.7;
  line-height: 1;
}

/* Variants */
.divider--light {
  background: var(--cream);
}

.divider--dark {
  background: var(--primary);
}

.divider--dark .divider-ornament {
  opacity: 0.85;
}

.divider--minimal {
  gap: 1rem;
  padding: 1.5rem 1rem;
}

.divider--minimal .divider-line {
  max-width: 100px;
  opacity: 0.5;
}

.divider--minimal .divider-ornament {
  font-size: 0.875rem;
  opacity: 0.5;
}

.divider--wide .divider-line {
  max-width: 200px;
}

.divider--compact {
  padding: 1rem;
}
```

---

## Migration Map

| Component/Pattern    | Current Classes           | New Standard                       | Files Affected             | Priority |
| -------------------- | ------------------------- | ---------------------------------- | -------------------------- | -------- |
| **Primary CTA**      | `.hero-cta-primary`       | `.btn .btn--primary .btn--large`   | Hero.module.css            | P1       |
| **Secondary CTA**    | `.hero-cta-secondary`     | `.btn .btn--secondary .btn--large` | Hero.module.css            | P1       |
| **Calendar CTA**     | `.calendar-cta-btn`       | `.btn .btn--primary .btn--medium`  | events/page.module.css     | P1       |
| **Mobile CTA**       | `.buttonPrimary`          | `.btn .btn--primary .btn--medium`  | MobileStickyCTA.module.css | P1       |
| **Story Footer CTA** | `.story-footer-cta`       | `.btn .btn--ghost .btn--small`     | StorySection.module.css    | P1       |
| **Hero Section**     | `.hero` + `.hero-content` | `.section .section--dark`          | Hero.module.css            | P2       |
| **Story Section**    | `.story-section`          | `.section .section--light`         | StorySection.module.css    | P2       |
| **Calendar Header**  | `.calendar-header`        | `.section .section--dark`          | events/page.module.css     | P2       |
| **Card Default**     | `.card--default`          | KEEP (CVA)                         | Card/Card.tsx              | KEEP     |
| **Card Document**    | `.card-document`          | KEEP + add to global               | globals.css                | P2       |
| **Section Divider**  | `.section-divider`        | `.divider .divider--light`         | globals.css                | P3       |
| **Chapter Divider**  | `.chapter-divider`        | `.divider .divider--dark`          | globals.css                | P3       |
| **Badge**            | `.hero-location` (custom) | `.badge .badge--outline`           | Hero.module.css            | P3       |

---

## Tailwind vs Custom CSS

### Use Tailwind Utilities When:

- **Applying standard padding/margin** → `p-4`, `m-8`, `gap-6`
- **Colors from design tokens** → `bg-primary`, `text-accent`
- **Border radius** → `rounded-md`
- **Display/layout** → `flex`, `grid`, `absolute`
- **Typography scale** → `text-lg`, `font-bold`
- **Responsive prefixes** → `md:grid-cols-2`

### Use Custom CSS (globals.css or module) When:

- **Complex shadows** → Defined as CSS variables
- **Gradients with animation** → Requires `@keyframes`
- **Multi-property interactions** → Button hover with multiple transforms
- **Hover/focus compound states** → Variation based on parent class
- **CSS variables with computed values** → Reduces duplication
- **Text shadows, filters** → More complex than Tailwind defaults

### Current Anti-Patterns to Eliminate:

**❌ Hardcoded rgba in Tailwind:**

```tsx
className = 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
```

**✅ Use CSS variable token instead:**

```tsx
className = 'shadow-sm' // references --shadow-sm
```

**❌ Inline styles in React:**

```tsx
style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}
```

**✅ Move to CSS class:**

```tsx
className = 'text-shadow-subtle' // or use built-in shadow
```

---

## Standardization Priority

### Phase 1: Buttons (Week 1)

**Impact:** Fixes 30+ component inconsistencies
**Effort:** 2-3 hours

1. Create `app/buttons.css` with `.btn` family
2. Update `Hero.module.css` to use `.btn` classes
3. Update `MobileStickyCTA.module.css`
4. Update `events/page.module.css`
5. Update `StorySection.module.css`
6. Test across all pages

**Why first:** Buttons are the most visible inconsistency. Fixing them unblocks UI confidence.

### Phase 2: Sections & Containers (Week 2)

**Impact:** Clarifies page structure, enables responsive refactoring
**Effort:** 3-4 hours

1. Create `.section` and `.section-container` utilities
2. Update all page-level CSS modules
3. Consolidate `max-width`, `padding`, `margin` patterns
4. Test responsive behavior

### Phase 3: Cards & Overlays (Week 3)

**Impact:** Standardizes content presentation
**Effort:** 2-3 hours

1. Move `.card-document` to `globals.css` overlay system
2. Consolidate overlay opacity tokens
3. Add `.card-grid` for consistent spacing
4. Replace hardcoded `rgba` in components

### Phase 4: Dividers & Badges (Week 4)

**Impact:** Polish, semantic consistency
**Effort:** 1-2 hours

1. Create `.divider` family
2. Create `.badge` family
3. Replace scattered `.section-divider` with new standard
4. Update component usage

---

## Code Examples: Before & After

### Example 1: Hero CTA Button

**Before:**

```tsx
// Hero.module.css
.hero-cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: linear-gradient(
    135deg,
    var(--gold-hover) 0%,
    var(--accent, var(--gold-primary)) 50%,
    #b8942a 100%
  );
  color: var(--primary, #0a1628);
  padding: 1rem 2rem;
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-decoration: none;
  border: none;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 2px 8px var(--gold-shimmer),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.25s ease;
}

.hero-cta-primary::before {
  content: '';
  position: absolute;
  inset: 2px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  pointer-events: none;
}

.hero-cta-primary:hover {
  background: linear-gradient(135deg, #e0c04a 0%, var(--gold-hover) 50%, var(--gold-primary) 100%);
  transform: translateY(-1px);
  box-shadow:
    0 4px 16px var(--gold-shimmer),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

// Hero.tsx
<a className={styles['hero-cta-primary']} href="/events">
  Explore Events
</a>
```

**After:**

```css
/* buttons.css */
.btn--primary {
  background: var(--accent);
  color: var(--primary);
  border: 1px solid var(--accent);
  box-shadow:
    0 2px 8px var(--gold-shimmer),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  font-family: var(--font-cinzel), 'Cinzel', serif;
}

.btn--primary:hover {
  background: var(--gold-hover);
  transform: translateY(-2px);
  box-shadow:
    0 4px 16px var(--gold-shimmer),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

/* Import buttons.css in globals.css */
@import 'buttons.css';
```

```tsx
// Hero.tsx
<a className="btn btn--primary btn--large" href="/events">
  Explore Events
</a>
```

**Benefits:**

- 25 lines of CSS → 8 lines (68% reduction)
- Reusable across 5+ components
- Easy to update button styling globally
- Consistent hover/focus behavior

---

### Example 2: Section Wrapper

**Before:**

```css
/* StorySection.module.css */
.story-section {
  padding: 5rem 0;
  background: var(--cream);
  position: relative;
  z-index: 1;
}

@media (min-width: 768px) {
  .story-section {
    padding: 6rem 0;
  }
}

.story-container {
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* EventsPage.module.css */
.calendar-header {
  position: relative;
  background: var(--primary);
  color: white;
  padding: var(--space-7xl) var(--layout-page-padding-mobile) var(--space-4xl);
  text-align: center;
  overflow: hidden;
}

/* ... 10 more lines of duplicate/similar patterns ... */
```

**After:**

```css
/* globals.css - add to @theme inline */
.section {
  position: relative;
  z-index: 1;
  width: 100%;
}

.section-padding {
  padding: var(--layout-section-y-mobile) var(--layout-page-padding-mobile);
}

@media (min-width: 768px) {
  .section-padding {
    padding: var(--layout-section-y-desktop) var(--layout-page-padding-tablet);
  }
}

.section--light {
  background: var(--cream);
}

.section--dark {
  background: var(--primary);
  color: white;
}

.section-container {
  max-width: 52rem;
  margin: 0 auto;
  width: 100%;
}

.section-container--wide {
  max-width: 1200px;
}
```

```tsx
// StorySection.tsx
<section className="section section--light">
  <div className="section-container section-padding">
    {children}
  </div>
</section>

// EventsPage.tsx
<section className="section section--dark">
  <div className="section-container--wide section-padding">
    {children}
  </div>
</section>
```

**Benefits:**

- Eliminates 50+ lines of duplicate CSS
- Single source of truth for spacing
- Easy responsive updates
- Clearer semantic meaning in JSX

---

### Example 3: Removing Hardcoded rgba() from Components

**Before (ConsolidatedProof.tsx):**

```tsx
<div
  style={{
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(139, 69, 19, 0.1)',
    boxShadow: `
      0 4px 20px rgba(0, 0, 0, 0.05),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5)
    `,
  }}
>
```

**After:**

```css
/* card-document.css or globals.css */
.proof-card {
  border: 1px solid var(--overlay-brown-light);
  box-shadow:
    var(--shadow-sm),
    inset 0 0 0 1px var(--overlay-white-light);
  text-shadow: 0 2px 4px var(--overlay-dark-subtle);
}
```

```tsx
<div className="proof-card">
```

**Benefits:**

- Removes hardcoding: 3 inline styles → 0
- Uses established tokens for consistency
- Single update point for all proof cards
- Better theme management

---

## Implementation Checklist

### Before Starting

- [ ] Back up `globals.css`
- [ ] Create git feature branch: `feat/css-standardization-phase-1`
- [ ] Run `npm run build` to establish baseline

### Phase 1: Buttons

- [ ] Create `app/buttons.css` with `.btn` family
- [ ] Import in `app/globals.css`
- [ ] Update `Hero.module.css` to remove `.hero-cta-*` definitions
- [ ] Update `Hero.tsx` JSX to use new classes
- [ ] Update `MobileStickyCTA.module.css`
- [ ] Update `events/page.module.css`
- [ ] Update `StorySection.module.css`
- [ ] Test all button states (hover, focus, disabled)
- [ ] Run `npm run build` to verify
- [ ] Create PR with clear description
- [ ] Update `CLAUDE.md` with new button classes

### Phase 2: Sections

- [ ] Create `.section` utilities in `globals.css`
- [ ] Update all page `.module.css` files to reference new classes
- [ ] Update JSX in page components
- [ ] Verify responsive behavior (mobile, tablet, desktop)
- [ ] Test on all pages: home, events, visit, etc.
- [ ] Remove old CSS classes from modules

### Phase 3: Cards & Overlays

- [ ] Move `.card-document` to `globals.css`
- [ ] Consolidate overlay opacity tokens
- [ ] Search for hardcoded `rgba()` in component files
- [ ] Create `.css` module for each component with shared overlays
- [ ] Replace inline styles with classes
- [ ] Verify visual consistency

### Phase 4: Final Polish

- [ ] Create `.divider` family
- [ ] Create `.badge` family
- [ ] Search for remaining inconsistencies
- [ ] Document final system in this guide
- [ ] Update project `CLAUDE.md`

---

## Key Files to Update

### CSS Files to Create/Modify

| File                                                    | Action                                  | Lines |
| ------------------------------------------------------- | --------------------------------------- | ----- |
| `app/buttons.css`                                       | CREATE                                  | ~150  |
| `app/globals.css`                                       | MODIFY (add sections, dividers, badges) | +~180 |
| `components/Hero/Hero.module.css`                       | MODIFY (remove btn duplication)         | -~80  |
| `components/StorySection/StorySection.module.css`       | MODIFY (remove .story-footer-cta)       | -~20  |
| `components/MobileStickyCTA/MobileStickyCTA.module.css` | MODIFY (remove .buttonPrimary)          | -~25  |
| `app/(main)/events/page.module.css`                     | MODIFY (remove .calendar-cta-btn)       | -~40  |

### Component Files to Update

| File                                             | Changes                      |
| ------------------------------------------------ | ---------------------------- |
| `components/Hero/Hero.tsx`                       | Update JSX className usage   |
| `components/StorySection/StorySection.tsx`       | Update JSX className usage   |
| `components/home/ConsolidatedProof.tsx`          | Replace inline rgba() styles |
| `components/home/ConsolidatedStory.tsx`          | Replace inline rgba() styles |
| `components/home/ConsolidatedClose.tsx`          | Replace inline rgba() styles |
| `components/MobileStickyCTA/MobileStickyCTA.tsx` | Update className usage       |

---

## Testing Strategy

### Visual Regression

```bash
# Before Phase 1
npm run build
# Take screenshots of: /home, /events, /visit, /lectures

# After Phase 1
npm run build
# Compare button states (hover, focus, disabled)
# Verify all CTAs look identical across pages
```

### Accessibility

- [ ] Verify 44px minimum touch target (WCAG AAA)
- [ ] Test focus indicators on keyboard navigation
- [ ] Run WAVE tool on all pages
- [ ] Test with screen reader (VoiceOver/NVDA)

### Responsive

- [ ] Mobile (320px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px)
- [ ] Extra-wide (1440px)

### Browser Support

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] iOS Safari (latest)

---

## Quick Reference: Utility Classes

### Buttons

```html
<!-- Primary CTA -->
<button class="btn btn--primary btn--large">Explore Events</button>

<!-- Secondary CTA -->
<a href="#" class="btn btn--secondary btn--medium"> Learn More </a>

<!-- Ghost/Outline -->
<button class="btn btn--ghost btn--small">Back</button>
```

### Sections

```html
<!-- Light section with padding -->
<section class="section section--light">
  <div class="section-container section-padding">Content</div>
</section>

<!-- Dark section, wider container -->
<section class="section section--dark">
  <div class="section-container--wide section-padding">Content</div>
</section>
```

### Cards

```html
<!-- Document card (parchment style) -->
<div class="card-document">Content</div>

<!-- Document card aged variant -->
<div class="card-document card-document--aged">Content</div>

<!-- Featured document card -->
<div class="card-document card-document--featured">Content</div>
```

### Dividers

```html
<!-- Light divider -->
<div class="divider divider--light">
  <div class="divider-line"></div>
  <div class="divider-ornament">✦</div>
  <div class="divider-line"></div>
</div>

<!-- Dark divider, minimal style -->
<div class="divider divider--dark divider--minimal">
  <!-- ... -->
</div>
```

### Badges

```html
<!-- Primary badge -->
<span class="badge badge--primary">Featured</span>

<!-- Outline badge -->
<span class="badge badge--outline">New</span>

<!-- Small badge -->
<span class="badge badge--primary badge--small">Save</span>
```

---

## Maintenance & Future Additions

### Adding New Button Style

1. Add variant class to `.btn` in `buttons.css`
2. Reference in component with: `class="btn btn--newstyle"`
3. Test hover, focus, disabled states
4. Document in this guide

### Adding New Section Variant

1. Add variant to `.section` family in `globals.css`
2. Use with: `class="section section--newvariant"`
3. Update `section-padding` if needed
4. Document usage

### Updating Token Values

Since all classes reference CSS variables (not hardcoded values):

1. Update token in `globals.css` `:root`
2. Changes automatically cascade to all components
3. No file-by-file updates needed

Example:

```css
/* Before */
:root {
  --space-lg: 1.5rem;
}

/* Update to */
:root {
  --space-lg: 1.75rem; /* All components update instantly */
}
```

---

## Conclusion

This standardization strategy balances:

- **Maintainability:** Single source of truth for patterns
- **Scalability:** Easy to add new components using existing classes
- **Performance:** CSS variables reduce compiled size vs hardcoded values
- **Accessibility:** Built-in WCAG compliance (touch targets, focus states)
- **Flexibility:** Variants allow customization without new classes

**Expected Outcome:**

- 40-50% reduction in CSS lines
- 30+ component consistency fixes
- 2-3 hours implementation (Phase 1 buttons alone)
- Easier future maintenance and feature additions

Start with **Phase 1: Buttons** for immediate high-impact results.
