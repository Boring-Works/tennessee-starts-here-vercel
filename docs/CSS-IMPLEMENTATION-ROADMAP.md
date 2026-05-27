# CSS Standardization Implementation Roadmap

**Phased approach to CSS standardization (4 weeks, 8-10 hours total)**

---

## Overview Timeline

```
Week 1 (2-3 hrs)   → Phase 1: Buttons (HIGH IMPACT)
Week 2 (3-4 hrs)   → Phase 2: Sections & Containers
Week 3 (2-3 hrs)   → Phase 3: Cards & Overlays
Week 4 (1-2 hrs)   → Phase 4: Dividers & Badges
```

**Can be done in parallel with feature work** — Each phase is self-contained.

---

## Phase 1: Button Standardization (Week 1)

**Objective:** Replace 4+ button implementations with single `.btn` family
**Impact:** 30+ components fixed
**Effort:** 2-3 hours
**Status:** Ready to implement

### Step 1.1: Create buttons.css

**File:** `/app/buttons.css`

```css
/* ============================================
   BUTTON SYSTEM
   Unified button family for all CTAs
   ============================================ */

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
  font-family: var(--font-cinzel), 'Cinzel', serif;
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

/* Style: Primary (solid gold) */
.btn--primary {
  background: var(--accent);
  color: var(--primary);
  border: 1px solid var(--accent);
  box-shadow:
    0 2px 8px var(--gold-shimmer),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.btn--primary::before {
  content: '';
  position: absolute;
  inset: 2px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  pointer-events: none;
}

.btn--primary:hover {
  background: var(--gold-hover);
  transform: translateY(-2px);
  box-shadow:
    0 4px 16px var(--gold-shimmer),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.btn--primary:hover::before {
  border-color: rgba(255, 255, 255, 0.2);
}

/* Style: Secondary (outline) */
.btn--secondary {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid var(--gold-shimmer);
}

.btn--secondary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--gold-shimmer), transparent);
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-smooth);
}

.btn--secondary:hover {
  border-color: var(--gold-shimmer);
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.btn--secondary:hover::before {
  opacity: 1;
}

/* Style: Ghost (transparent) */
.btn--ghost {
  background: transparent;
  color: var(--foreground);
  border: 2px solid var(--foreground);
}

.btn--ghost:hover {
  background: var(--foreground);
  color: white;
  gap: 0.75rem;
  transform: translateY(-2px);
}

/* Disabled state */
.btn:disabled,
.btn[aria-disabled='true'] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
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

  .btn--secondary::before {
    display: none;
  }
}
```

**Checklist:**

- [ ] Create file at `/app/buttons.css`
- [ ] Copy code above into file
- [ ] Run `npm run build` to verify no errors

### Step 1.2: Import in globals.css

**File:** `/app/globals.css`

At the top (after `@import` statements, before `:root`):

```css
@import 'buttons.css';
```

**Checklist:**

- [ ] Add import statement
- [ ] Run `npm run build` to verify
- [ ] Check that button styles are applied (visual inspection)

### Step 1.3: Update Hero.module.css

**File:** `/components/Hero/Hero.module.css`

**Remove these classes entirely:**

- `.hero-cta-primary`
- `.hero-cta-primary::before`
- `.hero-cta-primary:hover`
- `.hero-cta-secondary`
- `.hero-cta-secondary::before`
- `.hero-cta-secondary:hover`

(Lines 276-358, roughly 80 lines)

**Checklist:**

- [ ] Delete `.hero-cta-*` class definitions
- [ ] Keep `.hero-cta-seal` (wax seal icon style)
- [ ] Keep `.hero-cta-group` (flex wrapper)
- [ ] Keep `.hero-cta` (base size/layout)
- [ ] Run `npm run build`

### Step 1.4: Update Hero.tsx JSX

**File:** `/components/Hero/Hero.tsx`

Find all button elements and update classes:

**Before:**

```tsx
<a className={styles['hero-cta-primary']} href="/visit">
  Plan Your Visit
</a>

<a className={styles['hero-cta-secondary']} href="/events">
  Explore Events
</a>
```

**After:**

```tsx
<a className="btn btn--primary btn--large" href="/visit">
  Plan Your Visit
</a>

<a className="btn btn--secondary btn--large" href="/events">
  Explore Events
</a>
```

**Checklist:**

- [ ] Find and replace all `styles['hero-cta-primary']` → `"btn btn--primary btn--large"`
- [ ] Find and replace all `styles['hero-cta-secondary']` → `"btn btn--secondary btn--large"`
- [ ] Keep `.hero-cta-group` wrapper
- [ ] Keep `.hero-cta-seal` for the wax seal icon
- [ ] Run `npm run build`
- [ ] Visual test: Check hover states work

### Step 1.5: Update MobileStickyCTA.module.css

**File:** `/components/MobileStickyCTA/MobileStickyCTA.module.css`

**Remove these classes:**

- `.buttonPrimary` (lines 80-104)
- `.buttonSecondary` (lines 54-78)

**Keep:**

- `.container`
- `.nav`
- `.buttonGroup`
- `.gradient`

**Add at end:**

```css
/* Mobile sticky CTA uses global .btn classes */
.buttonPrimary {
  composes: btn btn--primary from global;
  flex: 1;
  padding: 0.75rem;
}

.buttonSecondary {
  composes: btn btn--secondary from global;
  flex: 1;
  padding: 0.75rem;
}
```

Or remove the classes and update JSX to use global classes directly.

**Checklist:**

- [ ] Remove old button class definitions
- [ ] Update or compose with global classes
- [ ] Run `npm run build`

### Step 1.6: Update events/page.module.css

**File:** `/app/(main)/events/page.module.css`

**Find:** `.calendar-cta-btn` and related button classes

**Replace with:** `.btn .btn--primary .btn--medium`

Search for:

- `.calendar-cta-btn`
- `.calendar-event-cta-btn`
- `.calendar-event-cta-btn:hover`
- `.calendar-event-cta-btn-secondary`

Remove or deprecate these. Instead, use global `.btn` classes in JSX.

**Checklist:**

- [ ] Identify button classes in this file
- [ ] Update corresponding JSX
- [ ] Remove old CSS class definitions
- [ ] Run `npm run build`

### Step 1.7: Update StorySection.module.css

**File:** `/components/StorySection/StorySection.module.css`

**Remove:**

- `.story-footer-cta` (lines 513-537)

**Checklist:**

- [ ] Remove `.story-footer-cta` definition
- [ ] Update JSX to use `className="btn btn--ghost btn--small"`
- [ ] Run `npm run build`

### Step 1.8: Test Across All Pages

**Test checklist:**

- [ ] `/home` → Check all CTAs (Plan Visit, Explore Events)
- [ ] `/events` → Check calendar CTAs (Book, More Info)
- [ ] `/visit` → Check visit CTA buttons
- [ ] `/lectures` → Check lecture CTAs
- [ ] Mobile view (375px) → Check mobile sticky CTA
- [ ] Tablet view (768px) → Check responsive sizing
- [ ] Hover states → All buttons should lift (-2px transform)
- [ ] Focus states → All buttons should show focus outline
- [ ] Disabled state → Test with disabled button if exists

**Visual Tests:**

```bash
npm run build
npm run dev
# Open http://localhost:3000/home
# Test each CTA:
#   - Hover effect (lift)
#   - Focus outline (Tab key)
#   - Disabled state (if applicable)
#   - Responsive sizes (mobile, tablet, desktop)
```

**Checklist:**

- [ ] All pages load without errors
- [ ] All buttons styled correctly
- [ ] Hover/focus states work
- [ ] Mobile layout correct
- [ ] Screenshot comparison (before/after)

### Step 1.9: Commit & Document

**Git:**

```bash
git add app/buttons.css app/globals.css
git add components/Hero/Hero.module.css components/Hero/Hero.tsx
git add components/MobileStickyCTA/MobileStickyCTA.module.css
git add components/MobileStickyCTA/MobileStickyCTA.tsx
git add app/\(main\)/events/page.module.css
git add components/StorySection/StorySection.module.css
git add components/StorySection/StorySection.tsx

git commit -m "refactor: Standardize button patterns with .btn family

- Create app/buttons.css with unified button system
- Add .btn--primary, .btn--secondary, .btn--ghost variants
- Replace .hero-cta-*, .calendar-cta-btn, .buttonPrimary with .btn classes
- Remove 80+ lines of duplicated button CSS
- Add WCAG-compliant 44px touch targets and focus states
- All components now use consistent button styling

This is Phase 1 of CSS standardization (see docs/CSS-STANDARDIZATION-GUIDE.md)"
```

**Documentation:**

- [ ] Update `CLAUDE.md` Button section:
  ```markdown
  ### Buttons (Standardized)

  All buttons use `.btn` family defined in `app/buttons.css`
  Variants: --primary, --secondary, --ghost
  Sizes: --small, --medium, --large
  See docs/CSS-QUICK-REFERENCE.md for usage
  ```

---

## Phase 2: Sections & Containers (Week 2)

**Objective:** Standardize section wrapper patterns
**Impact:** Eliminates 50+ lines of duplicate CSS
**Effort:** 3-4 hours
**Prerequisite:** Phase 1 complete

### Step 2.1: Add Section Utilities to globals.css

**File:** `/app/globals.css`

In the `@theme inline` block, add:

```css
/* Section System */
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
    padding: var(--layout-section-y-tablet) var(--layout-page-padding-tablet);
  }
}

@media (min-width: 1024px) {
  .section-padding {
    padding: var(--layout-section-y-desktop) var(--layout-page-padding-desktop);
  }
}

/* Section color variants */
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

/* Container sizing */
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

.section-content {
  position: relative;
  z-index: 1;
}
```

**Checklist:**

- [ ] Add to globals.css
- [ ] Run `npm run build` to verify
- [ ] No visual changes yet (not applied anywhere)

### Step 2.2: Update Hero.module.css

Remove repetitive padding definitions and reference new tokens.

**Before:**

```css
.hero-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 10;
  padding: 140px 24px 60px 24px;
  box-sizing: border-box;
}
```

**After:**

```css
/* Hero padding handled by .section-padding in JSX */
/* This file now focuses on hero-specific layout, not generic spacing */
```

**Full process:**

1. Identify generic padding/margin in `.hero-content`
2. Move to `.section.section--dark.section-padding` in JSX
3. Keep hero-specific layout classes

**Checklist:**

- [ ] Remove generic padding definitions
- [ ] Keep hero-specific layout (grid, flexbox arrangements)
- [ ] Update JSX to wrap with `.section` classes

### Step 2.3: Update StorySection.tsx & CSS

**File:** `/components/StorySection/StorySection.tsx`

**Before:**

```tsx
<section className={styles['story-section']}>
  <div className={styles['story-container']}>
```

**After:**

```tsx
<section className="section section--light">
  <div className="section-container section-padding">
```

**File:** `/components/StorySection/StorySection.module.css`

Remove:

- `.story-section` (padding definition)
- `.story-container` (max-width, margin, padding)

These are now handled by global classes.

**Checklist:**

- [ ] Update component JSX
- [ ] Remove old CSS classes
- [ ] Visual test: spacing should match before

### Step 2.4: Update All Page Headers

Update pages that have header sections:

Files to modify:

- `/app/(main)/events/page.module.css` (`.calendar-header`)
- `/app/(main)/visit/page.module.css` (if header exists)
- `/app/(main)/first-250/page.module.css` (if header exists)
- `/app/(main)/lectures/page.module.css` (if header exists)

**Pattern:**

1. Find header/section with `padding` and `max-width`
2. Replace with `.section .section--{variant}`
3. Replace container with `.section-container .section-padding`
4. Remove old CSS

**Checklist:**

- [ ] All pages header updated
- [ ] Visual consistency verified
- [ ] Responsive behavior tested

### Step 2.5: Test Responsive Behavior

**Test across breakpoints:**

- [ ] Mobile (375px): Check padding, margin, spacing
- [ ] Tablet (768px): Check spacing changes
- [ ] Desktop (1024px): Check max-width containers
- [ ] Extra-wide (1440px): Check padding

**Checklist:**

- [ ] No horizontal scrolling
- [ ] Consistent spacing
- [ ] Text comfortable reading width
- [ ] All sections aligned

### Step 2.6: Commit

```bash
git add app/globals.css
git add components/StorySection/StorySection.tsx
git add components/StorySection/StorySection.module.css
git add app/\(main\)/*/page.module.css
git add components/Hero/Hero.module.css

git commit -m "refactor: Standardize section wrapper patterns

- Add .section and .section-container utilities to globals.css
- Add .section--light, .section--dark color variants
- Replace .story-section, .calendar-header with .section classes
- Consolidate padding logic into .section-padding
- Remove 50+ lines of duplicate CSS across page modules

Phase 2 of CSS standardization."
```

---

## Phase 3: Cards & Overlays (Week 3)

**Objective:** Consolidate card patterns, remove hardcoded rgba() values
**Impact:** Cleaner overlay system, easier theme changes
**Effort:** 2-3 hours
**Prerequisite:** Phase 1 complete

### Step 3.1: Move card-document to globals.css

**File:** `/app/globals.css`

Move these from individual component files to globals:

```css
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

.card-document--featured {
  position: relative;
  background: linear-gradient(135deg, #fdfbf7 0%, #f8f4ec 50%, #f0e8d8 100%);
  box-shadow:
    inset 0 0 30px var(--overlay-brown-subtle),
    0 4px 20px var(--overlay-brown-light);
  border: 2px solid var(--accent);
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

**Checklist:**

- [ ] Add to globals.css
- [ ] Verify no duplicate definitions exist
- [ ] Run `npm run build`

### Step 3.2: Create CSS module files for components with inline styles

Components with many inline `rgba()` values:

- `/components/home/ConsolidatedProof.tsx`
- `/components/home/ConsolidatedStory.tsx`
- `/components/home/ConsolidatedClose.tsx`

For each:

**Create:** `/components/home/ConsolidatedProof.module.css`

```css
/* Consolidated Proof Styles */

.card {
  border: 1px solid var(--overlay-brown-light);
  box-shadow:
    var(--shadow-sm),
    inset 0 0 0 1px var(--overlay-white-light);
  text-shadow: 0 2px 4px var(--overlay-dark-subtle);
}

.seal {
  background: radial-gradient(
    ellipse at 30% 30%,
    rgba(139, 69, 19, 0.8) 0%,
    rgba(100, 30, 22, 0.9) 50%,
    rgba(80, 20, 15, 1) 100%
  );
  box-shadow:
    0 4px 12px var(--overlay-brown-medium),
    inset -2px -2px 4px rgba(0, 0, 0, 0.3),
    inset 2px 2px 4px rgba(255, 200, 150, 0.2);
  border: 1px solid rgba(255, 200, 150, 0.2);
  color: rgba(255, 220, 180, 0.8);
}

.seal:hover {
  background: radial-gradient(
    ellipse at 30% 30%,
    rgba(139, 69, 19, 0.9) 0%,
    rgba(100, 30, 22, 1) 50%,
    rgba(80, 20, 15, 1) 100%
  );
  box-shadow:
    0 2px 8px var(--overlay-brown-medium),
    inset -1px -1px 3px rgba(0, 0, 0, 0.3),
    inset 1px 1px 3px rgba(255, 200, 150, 0.15);
}
```

**Replace in JSX:**

```tsx
// Before
<div style={{ border: '1px solid rgba(139, 69, 19, 0.1)', ... }}>

// After
<div className={styles.card}>
```

**Checklist:**

- [ ] Create module CSS files
- [ ] Replace inline styles with class references
- [ ] Run `npm run build`
- [ ] Visual test: elements look identical

### Step 3.3: Commit

```bash
git add app/globals.css
git add components/home/*.module.css
git add components/home/Consolidated*.tsx

git commit -m "refactor: Consolidate card patterns and remove hardcoded rgba()

- Move .card-document variants to globals.css
- Create CSS modules for components with inline styles
- Replace hardcoded rgba() values with --overlay-* tokens
- Use --shadow-* tokens instead of inline box-shadow
- Easier theme updates and consistency

Phase 3 of CSS standardization."
```

---

## Phase 4: Dividers & Badges (Week 4)

**Objective:** Create final utility families
**Impact:** Polish, semantic consistency
**Effort:** 1-2 hours
**Prerequisite:** Phases 1-3 complete

### Step 4.1: Add Divider & Badge Classes to globals.css

**File:** `/app/globals.css`

```css
/* Divider System */
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

/* Badge System */
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

**Checklist:**

- [ ] Add to globals.css
- [ ] Run `npm run build`

### Step 4.2: Update .section-divider → .divider

Find all uses of `.section-divider` in templates and update to `.divider`.

**Checklist:**

- [ ] Search for `.section-divider` across codebase
- [ ] Replace with `.divider .divider--light`
- [ ] Update ornament content if needed

### Step 4.3: Update .chapter-divider → .divider

Find all uses of `.chapter-divider` and update.

**Checklist:**

- [ ] Search for `.chapter-divider`
- [ ] Replace with `.divider .divider--dark`

### Step 4.4: Create badge usage

Find badge patterns (like `.hero-location`) and update to use `.badge` classes.

**Checklist:**

- [ ] Search for badge-like elements
- [ ] Apply `.badge .badge--outline` or appropriate variant
- [ ] Remove old CSS definitions

### Step 4.5: Final Testing & Documentation

**Test checklist:**

- [ ] All pages load
- [ ] Dividers render correctly
- [ ] Badges display properly
- [ ] No console errors
- [ ] Visual consistency

**Documentation:**

- [ ] Update `/docs/CSS-QUICK-REFERENCE.md`
- [ ] Update project `CLAUDE.md`
- [ ] Add examples to `/docs/CSS-STANDARDIZATION-GUIDE.md`

**Checklist:**

- [ ] All documentation updated
- [ ] Links verified
- [ ] Examples work

### Step 4.6: Final Commit

```bash
git add app/globals.css
git add **/*.tsx # Any components using new classes
git add docs/*.md

git commit -m "feat: Complete CSS standardization with dividers & badges

- Add .divider and .badge utility families to globals.css
- Replace .section-divider and .chapter-divider with .divider
- Replace badge patterns with .badge classes
- Update documentation with quick reference guide
- 40-50% reduction in total CSS lines
- Single source of truth for all component patterns

Phase 4 complete. CSS standardization finished.
See docs/CSS-STANDARDIZATION-GUIDE.md for full overview."
```

---

## Post-Implementation Cleanup

After all phases complete:

### Files to Consider Removing

```
components/*/[old].module.css files that are now empty
Old button-specific CSS files
Unused CSS variable definitions
```

### Files to Archive

Keep old CSS modules in case of rollback, but mark as deprecated:

```css
/* DEPRECATED - Use global .btn classes instead */
/* See docs/CSS-STANDARDIZATION-GUIDE.md */
.old-button-class {
  /* ... */
}
```

### Update Documentation

- [ ] Update `CONTRIBUTING.md` with new standards
- [ ] Add CSS naming conventions section
- [ ] Update component creation guide
- [ ] Link to CSS-QUICK-REFERENCE.md in README

---

## Verification Checklist (Post-All-Phases)

### Build & Performance

- [ ] `npm run build` completes without warnings
- [ ] Bundle size unchanged or smaller
- [ ] No console errors in production build

### Visual Quality

- [ ] All pages match pre-standardization screenshots
- [ ] Hover/focus states work consistently
- [ ] Responsive breakpoints work correctly
- [ ] Animations remain smooth

### Code Quality

- [ ] ESLint passes
- [ ] No hardcoded rgba() values in TSX files
- [ ] No duplicate CSS class definitions
- [ ] All `.module.css` files use token variables

### Accessibility

- [ ] 44px+ touch targets
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible

### Documentation

- [ ] CSS-QUICK-REFERENCE.md is accurate
- [ ] CSS-STANDARDIZATION-GUIDE.md is complete
- [ ] CLAUDE.md updated with new patterns
- [ ] Examples in docs work as written

---

## Rollback Plan

If major issues occur:

```bash
# Revert last commit
git revert HEAD

# Or rollback to before standardization
git checkout <pre-standardization-commit>
```

Each phase is independent, so issues can be isolated and fixed.

---

## Timeline Estimate

| Phase     | Task                                    | Hours          | Week        |
| --------- | --------------------------------------- | -------------- | ----------- |
| 1         | Create buttons.css, update components   | 2-3            | Week 1      |
| 2         | Add section utilities, update pages     | 3-4            | Week 2      |
| 3         | Consolidate cards, remove inline styles | 2-3            | Week 3      |
| 4         | Add dividers, badges, final testing     | 1-2            | Week 4      |
| **Total** |                                         | **8-12 hours** | **4 weeks** |

Can be compressed to **2-3 weeks** with focused effort.

---

## Support & Questions

- **CSS tokens not working?** Check that `globals.css` is imported
- **Buttons look wrong?** Verify `buttons.css` is in `/app/` directory
- **Colors off?** Check token name matches (e.g., `--accent` vs `--gold-primary`)
- **Spacing issues?** Verify `--space-*` and `--layout-*` tokens are used

See `/docs/CSS-STANDARDIZATION-GUIDE.md` for detailed explanations.
