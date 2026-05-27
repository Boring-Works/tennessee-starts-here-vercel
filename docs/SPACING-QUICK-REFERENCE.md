# Spacing System Quick Reference

> TL;DR for developers. Full documentation: `SPACING-SYSTEM.md`

---

## The Tokens (Cheat Sheet)

### Base Spacing Scale

```css
--space-3xs: 0.125rem; /* 2px  - Fine details */
--space-2xs: 0.25rem; /* 4px  - Badges */
--space-xs: 0.5rem; /* 8px  - Icon gaps */
--space-sm: 0.75rem; /* 12px - Compact UI */
--space-md: 1rem; /* 16px - BASE UNIT ⭐ */
--space-lg: 1.5rem; /* 24px - Card padding ⭐ */
--space-xl: 2rem; /* 32px - Section spacing ⭐ */
--space-2xl: 2.5rem; /* 40px - Section breaks */
--space-3xl: 3rem; /* 48px - Major sections */
--space-4xl: 4rem; /* 64px - Page sections */
--space-5xl: 5rem; /* 80px - Large sections */
--space-6xl: 6rem; /* 96px - Hero spacing */
--space-7xl: 7rem; /* 112px - Maximum */
--space-8xl: 8rem; /* 128px - Rare */
```

### Gap Scale (Flex/Grid)

```css
--gap-xs: 0.5rem; /* 8px  - Tight */
--gap-sm: 0.75rem; /* 12px - Compact */
--gap-md: 1rem; /* 16px - Standard ⭐ */
--gap-lg: 1.5rem; /* 24px - Comfortable ⭐ */
--gap-xl: 2rem; /* 32px - Spacious */
--gap-2xl: 2.5rem; /* 40px - Wide */
--gap-3xl: 3rem; /* 48px - Hero */
--gap-4xl: 4rem; /* 64px - Maximum */
```

### Layout Tokens

```css
--layout-page-padding-mobile: 1.5rem; /* 24px */
--layout-page-padding-tablet: 2rem; /* 32px */
--layout-page-padding-desktop: clamp(2rem, 5vw, 7.5rem); /* 32-120px fluid */

--layout-section-y-mobile: 4rem; /* 64px */
--layout-section-y-tablet: 5rem; /* 80px */
--layout-section-y-desktop: 5rem; /* 80px */
```

### Card Spacing (Existing)

```css
--spacing-card-sm: 1rem; /* Small cards */
--spacing-card-md: 1.5rem; /* Standard ⭐ */
--spacing-card-lg: 2rem; /* Large cards */
```

---

## Usage Examples

### Component Spacing

```tsx
// Icon + text (most common)
<div className="flex items-center gap-[var(--gap-md)]">
  <MapPin /> <span>Location</span>
</div>

// Button padding
<button className="px-[var(--space-xl)] py-[var(--space-lg)]">
  Book Now
</button>

// Card padding
<div className="p-[var(--spacing-card-md)]">
  Card content
</div>

// Stacked content
<div className="space-y-[var(--space-lg)]">
  <h3>Title</h3>
  <p>Body</p>
</div>
```

### Layout Spacing

```tsx
// Page container (responsive)
<main className="px-[var(--layout-page-padding-mobile)] md:px-[var(--layout-page-padding-tablet)] lg:px-[var(--layout-page-padding-desktop)]">
  Content
</main>

// Section spacing
<section className="py-[var(--layout-section-y-mobile)] md:py-[var(--layout-section-y-tablet)]">
  Section content
</section>

// Card grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--gap-lg)]">
  {cards}
</div>
```

### Inline Styles

```tsx
// Hero padding
<div style={{ padding: `var(--space-7xl) var(--layout-page-padding-desktop) var(--space-4xl)` }}>
  Hero content
</div>

// Grid with specific column gap
<div style={{ gap: 'var(--gap-3xl)', columnGap: '64px' }}>
  Grid content
</div>
```

---

## Common Patterns

### Icon Sizes + Gaps

| Icon Size      | Gap Token  | Use Case                  |
| -------------- | ---------- | ------------------------- |
| 12px (w-3 h-3) | `--gap-xs` | Badges, tiny labels       |
| 16px (w-4 h-4) | `--gap-md` | Standard UI (most common) |
| 20px (w-5 h-5) | `--gap-lg` | Hero elements, headings   |
| 24px (w-6 h-6) | `--gap-xl` | Large feature icons       |

### Card Padding by Size

| Card Type | Token               | rem    | px      |
| --------- | ------------------- | ------ | ------- |
| Compact   | `--spacing-card-sm` | 1rem   | 16px    |
| Standard  | `--spacing-card-md` | 1.5rem | 24px ⭐ |
| Spacious  | `--spacing-card-lg` | 2rem   | 32px    |

### Section Vertical Spacing

| Section Type | Token                       | rem  | px    |
| ------------ | --------------------------- | ---- | ----- |
| Compact      | `--space-3xl`               | 3rem | 48px  |
| Standard     | `--layout-section-y-mobile` | 4rem | 64px  |
| Large        | `--layout-section-y-tablet` | 5rem | 80px  |
| Hero         | `--space-7xl`               | 7rem | 112px |

---

## Decision Tree

**Need component spacing?**

- Icon + text → `--gap-md`
- Button padding → `px-[var(--space-xl)] py-[var(--space-lg)]`
- Card padding → `p-[var(--spacing-card-md)]`
- Stacked elements → `space-y-[var(--space-lg)]`

**Need layout spacing?**

- Page padding → `--layout-page-padding-{breakpoint}`
- Section spacing → `--layout-section-y-{breakpoint}`
- Grid gaps → `--gap-lg` (cards) or `--gap-md` (compact)

**Need custom spacing?**

- Small amount → `--space-sm` to `--space-lg`
- Medium amount → `--space-xl` to `--space-3xl`
- Large amount → `--space-4xl` to `--space-7xl`

---

## Pro Tips

### ✅ Do This

```tsx
// Use semantic tokens for clarity
<section className="py-[var(--layout-section-y-mobile)]">

// Use gap tokens for flex/grid
<div className="flex gap-[var(--gap-md)]">

// Use card tokens for cards
<div className="p-[var(--spacing-card-md)]">
```

### ❌ Avoid This

```tsx
// Don't use arbitrary values
<div className="px-[13px] py-[7px]">

// Don't mix units
<div style={{ padding: '16px 1.5rem 8px 10%' }}>

// Don't over-use large tokens
<div className="py-[var(--space-8xl)]"> {/* Too much space */}
```

---

## Migration Cheat Sheet

| Old Code          | New Code                              |
| ----------------- | ------------------------------------- |
| `padding: 1rem`   | `padding: var(--space-md)`            |
| `padding: 1.5rem` | `padding: var(--space-lg)`            |
| `padding: 2rem`   | `padding: var(--space-xl)`            |
| `gap-4`           | `gap-[var(--gap-md)]`                 |
| `p-6`             | `p-[var(--spacing-card-md)]`          |
| `py-16`           | `py-[var(--layout-section-y-mobile)]` |

---

## When to Use Which Scale

**Use `--space-*` when:**

- Setting padding/margin
- Defining component dimensions
- Creating stacked layouts (space-y)

**Use `--gap-*` when:**

- Setting flexbox gaps
- Setting grid gaps
- Spacing icon + text combinations

**Use `--layout-*` when:**

- Setting page-level padding
- Setting section vertical spacing
- Creating responsive layouts

**Use `--spacing-card-*` when:**

- Styling card components
- Creating box-like containers
- Following existing card patterns

---

## Spacing Scale Visualization

```
Compact:  0.5rem → 0.75rem → 1rem → 1.5rem → 2rem
          xs       sm        md     lg       xl

Section:  2rem → 3rem → 4rem → 5rem
          xl     3xl    4xl    5xl

Page:     4rem → 5rem → 7rem
          4xl    5xl    7xl
```

---

## Most Used Tokens

| Token                        | Usage                                 |
| ---------------------------- | ------------------------------------- |
| `--space-md` (1rem)          | ⭐⭐⭐⭐⭐ Everywhere                 |
| `--space-lg` (1.5rem)        | ⭐⭐⭐⭐⭐ Cards, comfortable spacing |
| `--space-xl` (2rem)          | ⭐⭐⭐⭐ Sections, large components   |
| `--gap-md` (1rem)            | ⭐⭐⭐⭐⭐ Standard flex/grid gap     |
| `--gap-lg` (1.5rem)          | ⭐⭐⭐⭐ Card grids                   |
| `--spacing-card-md` (1.5rem) | ⭐⭐⭐⭐⭐ Standard card padding      |

---

## Need Help?

- **Full docs:** `docs/SPACING-SYSTEM.md`
- **Examples:** `docs/SPACING-PATTERNS.md` (coming soon)
- **Design System:** `docs/DESIGN-TOKENS.md`

---

**Built on 8pt grid. Derived from actual codebase patterns.**
