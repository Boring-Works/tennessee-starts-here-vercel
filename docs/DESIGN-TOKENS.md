# Design Token System

**Dr. Elena Frost's Token Library**

This document defines the comprehensive design token system for Tennessee Starts Here. These tokens serve as the single source of truth for shadows and colors across the application.

---

## Shadow & Elevation System

**Philosophy:** Consistent depth hierarchy using a 7-level shadow scale.

### Standard Elevation Shadows

Use these for neutral elevations (cards, modals, overlays).

| Token         | CSS Value                        | Use Case                         | Example                         |
| ------------- | -------------------------------- | -------------------------------- | ------------------------------- |
| `--shadow-xs` | `0 1px 2px rgba(0, 0, 0, 0.06)`  | Subtle borders, minimal depth    | Input fields, inline buttons    |
| `--shadow-sm` | `0 2px 4px rgba(0, 0, 0, 0.08)`  | Small cards, dropdowns           | Event cards, menu items         |
| `--shadow-md` | `0 4px 12px rgba(0, 0, 0, 0.12)` | Standard cards, panels           | Feature cards, content blocks   |
| `--shadow-lg` | `0 8px 24px rgba(0, 0, 0, 0.15)` | Elevated sections, dialogs       | Modals, sticky headers          |
| `--shadow-xl` | `0 12px 40px rgba(0, 0, 0, 0.2)` | Maximum elevation, hero elements | Full-page overlays, hero images |

### Brand Gold Accent Shadows

Use these for brand-emphasized elements that need gold glow effects.

| Token              | CSS Value                            | Use Case             | Example                       |
| ------------------ | ------------------------------------ | -------------------- | ----------------------------- |
| `--shadow-gold-sm` | `0 4px 12px rgba(201, 162, 39, 0.3)` | Subtle brand glow    | CTA buttons, featured badges  |
| `--shadow-gold-lg` | `0 8px 30px rgba(201, 162, 39, 0.5)` | Prominent brand glow | Hero CTAs, signature elements |

### Design Rationale

**Data-driven decisions:**

- Analyzed 150+ shadow usages across codebase
- Most common values: `rgba(0, 0, 0, 0.06)` (10x), `rgba(0, 0, 0, 0.3)` (9x), `rgba(0, 0, 0, 0.05)` (8x)
- Gold shadows: `rgba(201, 162, 39, 0.4)` (7x), `rgba(201, 162, 39, 0.5)` (5x)
- Standardized to 7 levels covering all use cases

**Opacity progression:** 6% → 8% → 12% → 15% → 20%

- Smooth visual hierarchy from barely perceptible to dramatic
- Aligns with existing patterns in codebase

---

## Gold Color Standardization

**Philosophy:** Consolidate 8 gold variants to 3 semantic tokens.

### Audit Results

**Before consolidation:**

- `#c9a227` (98 occurrences) — PRIMARY
- `#d4a853` (28 occurrences)
- `#d4af37` (18 occurrences) — HOVER
- `#c5a059` (3 occurrences)
- `#d4a84b` (2 occurrences)
- `#d4ab2a` (1 occurrence)
- `#d4b445` (1 occurrence)
- `#d4b655` (1 occurrence)

**Total:** 152 gold color usages across 8 variants

### Semantic Gold Tokens

| Token            | Hex Value                 | RGB Value                 | Use Case                                         |
| ---------------- | ------------------------- | ------------------------- | ------------------------------------------------ |
| `--gold-primary` | `#c9a227`                 | `rgb(201, 162, 39)`       | Main brand gold for logos, headers, primary CTAs |
| `--gold-hover`   | `#d4af37`                 | `rgb(212, 175, 55)`       | Hover states, brighter interactive feedback      |
| `--gold-shimmer` | `rgba(201, 162, 39, 0.4)` | `rgba(201, 162, 39, 0.4)` | Glows, borders, overlays, decorative accents     |

### Usage Guidelines

**`--gold-primary` (#c9a227)**

```css
/* Main brand elements */
.logo {
  color: var(--gold-primary);
}
.btn-primary {
  background: var(--gold-primary);
}
.section-heading {
  border-bottom: 2px solid var(--gold-primary);
}
```

**`--gold-hover` (#d4af37)**

```css
/* Interactive states - 10% brighter than primary */
.btn-primary:hover {
  background: var(--gold-hover);
}
.nav-link:hover {
  color: var(--gold-hover);
}
.card-link:focus {
  outline-color: var(--gold-hover);
}
```

**`--gold-shimmer` (rgba(201, 162, 39, 0.4))**

```css
/* Decorative effects */
.card-border {
  border: 1px solid var(--gold-shimmer);
}
.accent-glow {
  box-shadow: 0 0 20px var(--gold-shimmer);
}
.overlay {
  background: var(--gold-shimmer);
}
```

### Relationship to Existing Tokens

These new tokens complement (not replace) the existing gold tokens:

| Existing Token     | New Semantic Equivalent                | Notes                         |
| ------------------ | -------------------------------------- | ----------------------------- |
| `--accent`         | Same as `--gold-primary`               | Keep for legacy compatibility |
| `--gold-leaf`      | Consider migrating to `--gold-primary` | Used in almanac system        |
| `--nav-gold`       | Already `#c9a227`                      | Aligns with `--gold-primary`  |
| `--nav-gold-hover` | Already `#d4af37`                      | Aligns with `--gold-hover`    |

---

## Migration Strategy

**Phase 1: Token Definition** ✅ Complete

- Added shadow and gold tokens to `app/globals.css`
- Documented usage patterns

**Phase 2: Gradual Adoption** (Recommended)

- Use new tokens for all new components
- Refactor existing components during regular maintenance
- No breaking changes — old values still work

**Phase 3: Full Migration** (Future)

- Find/replace old shadow values with tokens
- Consolidate gold colors to semantic tokens
- Update component library documentation

---

## Testing Tokens

To verify tokens work correctly:

```css
/* Test component */
.test-shadows {
  box-shadow: var(--shadow-md); /* Should show medium elevation */
}

.test-gold {
  color: var(--gold-primary); /* Should show #c9a227 */
  background: var(--gold-shimmer); /* Should show 40% opacity gold */
}

.test-hover:hover {
  color: var(--gold-hover); /* Should brighten to #d4af37 */
}
```

**Browser DevTools:**

1. Inspect element
2. Check Computed styles
3. Verify CSS variables resolve correctly

---

## Design System Principles

**Single Source of Truth**

- Define once in `globals.css`
- Use everywhere via CSS variables
- Change once, update everywhere

**Semantic Naming**

- Token names describe purpose, not value
- `--shadow-md` not `--shadow-12px-black-15`
- `--gold-primary` not `--gold-c9a227`

**Future-Proof**

- Easy to adjust values system-wide
- Dark mode support via variable overrides
- Brand refresh only requires token updates

---

## Location

**Definition:** `/app/globals.css` (lines 36-64)

**Usage:** Any component can reference these tokens:

```tsx
<div className="shadow-[var(--shadow-lg)]" />
<button style={{ boxShadow: 'var(--shadow-gold-lg)' }} />
<span className="text-[var(--gold-primary)]" />
```

---

**Compiled by:** Dr. Elena Frost, PhD — Design System Architect
**Date:** January 30, 2026
**Version:** 1.0
