# CSS Quick Reference

**Fast lookup guide for standardized component patterns.**

---

## Button Family

### Class Structure

```
.btn [base]
  + .btn--{style}       [primary|secondary|ghost]
  + .btn--{size}        [small|medium|large]
  + optional states      [:hover|:focus-visible|:disabled]
```

### Examples

| Use Case               | Classes                             | Notes                                     |
| ---------------------- | ----------------------------------- | ----------------------------------------- |
| Primary CTA (large)    | `.btn .btn--primary .btn--large`    | Gold bg, dark text, lift on hover         |
| Secondary CTA (medium) | `.btn .btn--secondary .btn--medium` | Outline, white text, subtle fill on hover |
| Link-style (small)     | `.btn .btn--ghost .btn--small`      | Transparent, dark text, inverse on hover  |
| Disabled button        | `.btn .btn--primary:disabled`       | Opacity 0.5, no pointer events            |

### All Button Variants

```css
/* Sizes */
.btn--large    /* padding: 1rem 2.5rem; font-size: 0.8125rem; */
.btn--medium   /* padding: 0.875rem 2rem; font-size: 0.8125rem; */
.btn--small    /* padding: 0.75rem 1.5rem; font-size: 0.75rem; */

/* Styles */
.btn--primary  /* Gold bg, dark text */
.btn--secondary /* Transparent, white border */
.btn--ghost    /* Transparent, dark text, inverts on hover */
```

---

## Section Wrapper

### Class Structure

```
.section [base]
  + .section--{variant}    [light|dark|white]
  + .section-container     [base container]
  + .section--{width}      [wide|full]
  + .section-padding       [handles responsive padding]
```

### Examples

| Use Case      | Classes                    | Background             |
| ------------- | -------------------------- | ---------------------- |
| Light section | `.section .section--light` | Cream (#f8f5f0)        |
| Dark section  | `.section .section--dark`  | Primary navy (#0d1821) |
| White section | `.section .section--white` | White                  |

### Container Widths

```css
.section-container        /* max-width: 52rem (narrow) */
.section-container--wide  /* max-width: 1200px (full-width) */
.section-container--full  /* max-width: 100% (edge-to-edge) */
```

### Full Example

```html
<section class="section section--light">
  <div class="section-container section-padding">
    <h2>Section Title</h2>
    <p>Content goes here</p>
  </div>
</section>
```

---

## Card System

### Card Base (Tailwind CVA)

```tsx
import { Card } from '@/components/Card/Card'

<Card variant="default">   {/* White, shadow */}
<Card variant="featured">  {/* Primary bg, enhanced */}
<Card variant="subtle">    {/* Cream, left border */}
<Card hover>               {/* Add lift effect */}
```

### Card Document (Parchment-style)

```html
<!-- Basic document -->
<div class="card-document">Content</div>

<!-- Aged parchment variant -->
<div class="card-document card-document--aged">Content</div>

<!-- Featured with gold accent -->
<div class="card-document card-document--featured">Content</div>
```

---

## Dividers

### Class Structure

```
.divider [base]
  + .divider--{variant}    [light|dark|minimal|wide|compact]
  + children:
    - .divider-line
    - .divider-ornament
```

### Examples

```html
<!-- Standard light divider -->
<div class="divider divider--light">
  <div class="divider-line"></div>
  <div class="divider-ornament">✦</div>
  <div class="divider-line"></div>
</div>

<!-- Minimal dark divider -->
<div class="divider divider--dark divider--minimal">
  <div class="divider-line"></div>
  <div class="divider-ornament">⟡</div>
  <div class="divider-line"></div>
</div>
```

---

## Badges

### Class Structure

```
.badge [base]
  + .badge--{style}    [primary|secondary|success|warning|danger|outline]
  + .badge--{size}     [small|large]
```

### Styles

| Class               | Background           | Use              |
| ------------------- | -------------------- | ---------------- |
| `.badge--primary`   | Gold                 | Primary callouts |
| `.badge--secondary` | Brown                | Secondary info   |
| `.badge--success`   | Green                | Positive states  |
| `.badge--warning`   | Orange               | Cautions         |
| `.badge--danger`    | Red                  | Errors           |
| `.badge--outline`   | Transparent + border | Featured items   |

### Examples

```html
<span class="badge badge--primary">Featured</span>
<span class="badge badge--outline badge--small">New</span>
<span class="badge badge--success badge--large">Verified</span>
```

---

## Design Tokens (CSS Variables)

### Colors

```css
--primary: #0d1821 /* Dark navy */ --secondary: #8b4513 /* Brown */ --accent: var(--gold-hover)
  /* Gold interactive */ --background: #faf8f5 /* Off-white */ --foreground: #1a1a1a /* Dark text */
  --cream: #f8f5f0 /* Cream bg */;
```

### Gold Family

```css
--gold-primary: #c9a227 /* Main brand */ --gold-hover: #d4af37 /* Interactive state */
  --gold-shimmer: rgba(201, 162, 39, 0.4) /* Glows, borders */;
```

### Shadows (7-level scale)

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.06) --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08) --shadow-md: 0
  4px 12px rgba(0, 0, 0, 0.12) --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15) --shadow-xl: 0 12px 40px
  rgba(0, 0, 0, 0.2) --shadow-gold-sm: 0 4px 12px var(--gold-shimmer) --shadow-gold-lg: 0 8px 30px
  var(--gold-shimmer);
```

### Overlays (Opacity system)

```css
/* Dark overlays */
--overlay-dark-subtle: rgba(10, 22, 40, 0.05) --overlay-dark-light: rgba(10, 22, 40, 0.1)
  --overlay-dark-medium: rgba(10, 22, 40, 0.2) --overlay-dark-strong: rgba(10, 22, 40, 0.3)
  /* Gold overlays */ --overlay-gold-subtle: rgba(201, 162, 39, 0.04)
  --overlay-gold-light: rgba(201, 162, 39, 0.08) --overlay-gold-medium: rgba(201, 162, 39, 0.15)
  --overlay-gold-strong: rgba(201, 162, 39, 0.25) /* Brown overlays */
  --overlay-brown-subtle: rgba(139, 69, 19, 0.03) --overlay-brown-light: rgba(139, 69, 19, 0.05)
  --overlay-brown-medium: rgba(139, 69, 19, 0.08);
```

### Spacing (8pt grid)

```css
--space-xs: 0.5rem /* 8px */ --space-sm: 0.75rem /* 12px */ --space-md: 1rem
  /* 16px (most common) */ --space-lg: 1.5rem /* 24px */ --space-xl: 2rem /* 32px */
  --space-2xl: 2.5rem /* 40px */ --space-3xl: 3rem /* 48px */ --space-4xl: 4rem /* 64px */
  --space-5xl: 5rem /* 80px */ --space-6xl: 6rem /* 96px */ --space-7xl: 7rem /* 112px */
  --space-8xl: 8rem /* 128px */;
```

### Typography

```css
--font-serif:
  [EB Garamond, Georgia, serif] --font-serif-elegant: [Cormorant Garamond,
  serif] --font-display: [EB Garamond, serif];
```

### Motion

```css
--duration-instant: 100ms --duration-fast: 200ms --duration-base: 300ms --duration-moderate: 400ms
  --duration-slow: 600ms --duration-dramatic: 800ms --duration-ambient: 2000ms --ease-standard: ease
  --ease-out: ease-out --ease-in-out: ease-in-out --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
```

---

## Migration Examples

### OLD → NEW

#### Buttons

```
.hero-cta-primary           → .btn .btn--primary .btn--large
.hero-cta-secondary         → .btn .btn--secondary .btn--large
.calendar-cta-btn           → .btn .btn--primary .btn--medium
.story-footer-cta           → .btn .btn--ghost .btn--small
.buttonPrimary              → .btn .btn--primary .btn--medium
```

#### Sections

```
.story-section              → .section .section--light
.calendar-header            → .section .section--dark
.hero                       → .section .section--dark
```

#### Dividers

```
.section-divider            → .divider .divider--light
.chapter-divider            → .divider .divider--dark
.chapter-divider--minimal   → .divider .divider--minimal
```

#### Overlays (inline styles)

```
style={{ textShadow: '...' }}           → className with shadow token
style={{ border: '1px solid rgba(...)' }} → className using --overlay-* token
style={{ boxShadow: '...' }}            → className using --shadow-* token
```

---

## Do's & Don'ts

### DO ✅

```tsx
// Use class names for styling
<button className="btn btn--primary btn--large">
  Click me
</button>

// Use CSS variables for dynamic values
<div style={{ color: 'var(--accent)' }}>
  Gold text
</div>

// Use shadow tokens
<div className="shadow-lg">
```

### DON'T ❌

```tsx
// Don't hardcode rgba values
<button style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
  ← Use --shadow-md instead

// Don't create new button patterns
<button className="my-custom-btn">
  ← Use .btn .btn--* instead

// Don't duplicate section styles
<section style={{ padding: '5rem 0', background: '#f8f5f0' }}>
  ← Use .section .section--light instead
```

---

## Responsive Classes

All classes work with Tailwind responsive prefixes:

```html
<section class="section section--light md:section--dark">
  <!-- Light on mobile, dark on tablet+ -->
</section>

<div class="section-container md:section-container--wide">
  <!-- Narrow on mobile, wide on tablet+ -->
</div>

<button class="btn btn--small md:btn--medium lg:btn--large">
  <!-- Scales with screen size -->
</button>
```

---

## Files

| File                                 | Purpose                       |
| ------------------------------------ | ----------------------------- |
| `/docs/CSS-STANDARDIZATION-GUIDE.md` | Full guide with code examples |
| `/docs/CSS-QUICK-REFERENCE.md`       | This file (quick lookup)      |
| `/app/globals.css`                   | All tokens + utilities        |
| `/app/buttons.css`                   | Button family (after Phase 1) |
| Component `.module.css`              | Page-specific overrides       |

---

## Need Help?

**Buttons not working?** → Check `buttons.css` import in `globals.css`
**Sections not aligned?** → Check `--layout-page-padding-*` tokens
**Colors wrong?** → Check variable name (e.g., `--gold-primary` vs `--accent`)
**Spacing off?** → Use `--space-*` tokens, not custom values

See `/docs/CSS-STANDARDIZATION-GUIDE.md` for full explanations.
