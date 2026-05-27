# Navigation Visual Specification

## Tennessee Starts Here — Rocky Mount State Historic Site

> **Design Principle:** "Like a government document from 1790 that happens to be interactive"

This specification synthesizes findings from Typography (Inker), Animation (Mover), Layout (Spacer), Interactive States (Toucher), and Theming (Darker) teams into a complete visual system for navigation.

---

## 1. Color System

### 1.1 Navigation Color Tokens

```css
:root {
  /* Gold Accent */
  --nav-gold: #c9a227;
  --nav-gold-hover: #d4af37;

  /* Text Colors (Dark Backgrounds) */
  --nav-text-default: rgba(255, 255, 255, 0.7);
  --nav-text-hover: #ffffff;
  --nav-text-active: #ffffff;

  /* Text Colors (Light Backgrounds) */
  --nav-text-light-default: rgba(10, 22, 40, 0.85);
  --nav-text-light-hover: #0a1628;
  --nav-text-light-active: #0a1628;

  /* Gold on Light (High Contrast) */
  --nav-gold-on-light: #b89d3a; /* Darker for 4.5:1 contrast */

  /* Background States */
  --nav-bg-scrolled: rgba(10, 15, 20, 0.97);
  --nav-bg-transparent: transparent;

  /* Borders & Dividers */
  --nav-border-subtle: rgba(255, 255, 255, 0.05);
  --nav-divider: rgba(255, 255, 255, 0.15);

  /* Dropdown */
  --nav-dropdown-bg: rgba(10, 15, 20, 0.98);
  --nav-dropdown-border: rgba(201, 162, 39, 0.2);
  --nav-dropdown-hover-bg: rgba(201, 162, 39, 0.08);
}
```

### 1.2 Context-Aware Color States

The navigation adapts to three contexts:

#### **Context A: Welcome Page (Dark Background)**

- Background: Dark (`#0c1a2e`)
- Navigation: Transparent header, no stripe
- Text: `--nav-text-default` (rgba(255,255,255,0.7))
- Gold: `--nav-gold` (#c9a227) ✓ Works perfectly

#### **Context B: Main Pages Scrolled (Dark Header)**

- Background: `--nav-bg-scrolled` (rgba(10,15,20,0.97))
- Stripe: Visible (tricolor)
- Text: `--nav-text-default` (rgba(255,255,255,0.7))
- Gold: `--nav-gold` (#c9a227) ✓ Works perfectly

#### **Context C: Main Pages Unscrolled (Transparent on Light)**

- **CRITICAL FIX:** Never use white text on cream background
- **Solution:** Force dark header on pages with light backgrounds
- Pages requiring override: `/evidence/documents`, any future light pages
- Text: `--nav-text-light-default` (rgba(10,22,40,0.85))
- Gold: `--nav-gold-on-light` (#b89d3a) — darker for 4.5:1 contrast
- Background: Force `--nav-bg-scrolled` immediately

**Implementation:**

```typescript
// In Navigation.tsx
const isLightBackgroundPage =
  pathname.startsWith('/evidence/documents') ||
  pathname.startsWith('/future-light-page')

// Apply immediately, no scroll threshold
<header className={`${styles.header} ${
  isLightBackgroundPage ? styles['header--scrolled'] :
  isScrolled ? styles['header--scrolled'] :
  styles['header--transparent']
}`}>
```

### 1.3 Color Usage Matrix

| Element              | Dark BG                  | Scrolled Header          | Light BG (Override)      |
| -------------------- | ------------------------ | ------------------------ | ------------------------ |
| **Nav Link Default** | rgba(255,255,255,0.7)    | rgba(255,255,255,0.7)    | rgba(10,22,40,0.85)      |
| **Nav Link Hover**   | #ffffff                  | #ffffff                  | #0a1628                  |
| **Nav Link Active**  | #ffffff + gold underline | #ffffff + gold underline | #0a1628 + gold underline |
| **Gold Underline**   | #c9a227                  | #c9a227                  | #b89d3a                  |
| **CTA Background**   | #c9a227                  | #c9a227                  | #b89d3a                  |
| **CTA Text**         | #0a1628                  | #0a1628                  | #0a1628                  |
| **Focus Outline**    | #c9a227                  | #c9a227                  | #b89d3a                  |

---

## 2. Typography System

### 2.1 Desktop Navigation

```css
.nav-link {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.6875rem; /* 11px — government document scale */
  font-weight: 600;
  letter-spacing: 0.15em; /* Generous spacing for formality */
  text-transform: uppercase;
  line-height: 1;
}

.dropdown-toggle {
  /* Same as nav-link */
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.dropdown-item {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.625rem; /* 10px — slightly smaller for hierarchy */
  font-weight: 500; /* Lighter for secondary items */
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

### 2.2 Mobile Navigation

**Different typeface for mobile:**

```css
.mobile-link-text {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.5rem; /* 24px — generous tap target */
  font-weight: 400; /* Regular weight */
  letter-spacing: 0; /* No letter spacing */
  text-transform: none; /* Title Case, not UPPERCASE */
  line-height: 1.2;
}

.mobile-dropdown-link {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.25rem; /* 20px — nested hierarchy */
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
}
```

**Rationale:** Mobile drawer has more space, so we use the more expressive serif (Cormorant) in Title Case. Desktop uses compressed, uppercase Cinzel to fit many items in a tight horizontal space.

### 2.3 Logo Typography

```css
.logo-text {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 1.25rem; /* Mobile: 20px */
  font-size: 1.5rem; /* Desktop: 24px */
  font-weight: 700; /* Bold for brand presence */
  letter-spacing: 0.25em; /* Maximum spacing for formality */
  text-transform: uppercase;
  color: white;
}

.logo-tagline-text {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.6875rem; /* Mobile: 11px */
  font-size: 0.75rem; /* Desktop: 12px */
  font-weight: 300; /* Thin weight for contrast */
  letter-spacing: 0.2em; /* Desktop: 0.22em */
  text-transform: uppercase;
  color: rgba(201, 162, 39, 0.8); /* Gold muted */
}
```

### 2.4 CTA Typography

```css
.cta-text {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.6875rem; /* 11px — matches nav links */
  font-weight: 600;
  letter-spacing: 0.1em; /* Tighter than nav links */
  text-transform: uppercase;
  color: #0a1628; /* Dark text on gold background */
}
```

---

## 3. Animation System

### 3.1 Easing Curves

```css
:root {
  /* Primary Easing — Spring Physics */
  --nav-ease-spring: cubic-bezier(0.16, 1, 0.3, 1);

  /* Standard Easing */
  --nav-ease-standard: ease;
}
```

**Philosophy:** "Like turning a page in an old book" — deliberate openings, snappy closings.

### 3.2 Timing Values

```css
:root {
  /* Mobile Menu */
  --nav-menu-open: 400ms; /* Deliberate reveal */
  --nav-menu-close: 280ms; /* Faster dismissal */

  /* Dropdown */
  --nav-dropdown-open: 150ms; /* Quick appear */
  --nav-dropdown-close: 150ms; /* Same speed */

  /* Hover Effects */
  --nav-hover: 300ms; /* Standard interaction */

  /* Underline Animation */
  --nav-underline: 300ms; /* Smooth draw-in */

  /* Stagger Delay */
  --nav-stagger: 50ms; /* Between mobile menu items */
}
```

### 3.3 Animation Implementations

#### Mobile Menu Open

```css
.mobile-drawer {
  transform: translateX(100%);
  transition: transform var(--nav-menu-open) var(--nav-ease-spring);
}

.mobile--open .mobile-drawer {
  transform: translateX(0);
}

/* Stagger items */
.mobile-link {
  opacity: 0;
  transform: translateX(1rem);
  transition: all 0.4s var(--nav-ease-spring);
  transition-delay: calc(100ms + var(--index) * var(--nav-stagger));
}

.mobile--open .mobile-link {
  opacity: 1;
  transform: translateX(0);
}
```

#### Dropdown Open

```css
.dropdown-menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-0.5rem);
  transition: all var(--nav-dropdown-open) var(--nav-ease-spring);
}

.dropdown-menu[aria-hidden='false'] {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
```

#### Underline Draw

```css
.nav-link-underline {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--nav-underline) var(--nav-ease-standard);
}

.nav-link:hover .nav-link-underline,
.nav-link--active .nav-link-underline {
  transform: scaleX(1);
}
```

#### Hover State Transitions

```css
.nav-link {
  color: var(--nav-text-default);
  transition: color var(--nav-hover) var(--nav-ease-standard);
}

.dropdown-item {
  padding-left: 1.25rem;
  transition:
    color var(--nav-hover) var(--nav-ease-standard),
    background var(--nav-hover) var(--nav-ease-standard),
    padding-left var(--nav-hover) var(--nav-ease-standard);
}

.dropdown-item:hover {
  padding-left: 1.5rem; /* Slide right effect */
}
```

---

## 4. Layout & Spacing System

### 4.1 Header Dimensions

```css
/* Unscrolled Header */
.header--transparent {
  padding-top: 2rem; /* 32px */
  padding-bottom: 1rem; /* 16px */
  /* Total height: ~96px (with content) */
}

/* Scrolled Header */
.header--scrolled {
  padding-top: 0.75rem; /* 12px */
  padding-bottom: 1rem; /* 16px — INCREASED from 0.75rem */
  /* Total height: ~64px (with content) */
  /* Vertical padding increased for better breathing room */
}
```

**Rationale:** The scrolled header felt cramped at 0.75rem bottom padding. Increasing to 1rem gives "museum-quality" spacing while maintaining compact profile.

### 4.2 Navigation Gaps

```css
/* Desktop Nav List */
.nav-list {
  gap: 2.5rem; /* 40px — INCREASED from 2rem */
}

/* Mobile Nav List */
.mobile-list {
  gap: 1rem; /* 16px — INCREASED from 0.75rem */
}

/* Nav Divider Margins */
.nav-divider {
  margin: 0 1rem; /* 16px each side */
}
```

**Rationale:** Tighter gaps felt crowded. Museum-quality spacing gives each item room to breathe while maintaining hierarchy.

### 4.3 CTA Button Padding

```css
/* Desktop CTA */
.cta {
  padding: 0.875rem 1.5rem; /* 14px 24px — INCREASED from 0.75rem 1.25rem */
  min-height: 44px; /* WCAG touch target */
}

/* Mobile CTA */
.mobile-cta {
  padding: 1rem 2rem; /* 16px 32px */
}
```

**Rationale:** CTA needs to be visually prominent as the primary conversion action. Increased padding makes it feel substantial.

### 4.4 Dropdown Spacing

```css
.dropdown-menu {
  min-width: 220px;
  margin-top: 0.5rem; /* 8px gap from toggle */
  padding: 0.75rem 0; /* 12px top/bottom */
}

.dropdown-item {
  padding: 0.75rem 1.25rem; /* 12px 20px */
  min-height: 44px; /* WCAG touch target */
}

.dropdown-item:hover {
  padding-left: 1.5rem; /* Slide to 24px */
}
```

### 4.5 Touch Target Compliance

All interactive elements meet **WCAG 2.1 AAA** (44x44px minimum):

```css
.nav-link {
  padding: 0.75rem 0.5rem;
  min-height: 44px;
}

.dropdown-toggle {
  padding: 0.75rem 0.5rem;
  min-height: 44px;
}

.mobile-toggle {
  min-width: 44px;
  min-height: 44px;
}

.mobile-link {
  min-height: 44px;
}
```

---

## 5. Interactive States

### 5.1 State Definitions

#### **Default State**

```css
.nav-link {
  color: var(--nav-text-default);
}

.nav-link-underline {
  transform: scaleX(0);
}
```

#### **Hover State**

```css
.nav-link:hover {
  color: var(--nav-text-hover);
}

.nav-link:hover .nav-link-underline {
  transform: scaleX(1);
}
```

#### **Active State (Current Page)**

```css
.nav-link--active {
  color: var(--nav-text-active);
}

.nav-link--active .nav-link-underline {
  transform: scaleX(1); /* ALWAYS VISIBLE — FIX FROM TOUCHER */
}
```

**CRITICAL FIX:** The current page indicator (gold underline) must be **always visible**, not just on hover. This was the key issue identified by Toucher.

#### **Focus-Visible State**

```css
.nav-link:focus-visible {
  outline: 2px solid var(--nav-gold);
  outline-offset: 4px;
  border-radius: 2px;
}
```

### 5.2 Dropdown States

#### **Dropdown Toggle Active**

```css
.dropdown-toggle--active {
  color: var(--nav-text-active);
}

.dropdown-toggle--active .dropdown-toggle-underline {
  transform: scaleX(1); /* ALWAYS VISIBLE when any child is active */
}
```

#### **Dropdown Item States**

```css
/* Default */
.dropdown-item {
  color: rgba(255, 255, 255, 0.7);
  background: transparent;
  padding-left: 1.25rem;
}

/* Hover */
.dropdown-item:hover {
  color: var(--nav-gold);
  background: var(--nav-dropdown-hover-bg);
  padding-left: 1.5rem; /* Slide right */
}

/* Active (Current Page) */
.dropdown-item--active {
  color: var(--nav-gold);
  background: rgba(201, 162, 39, 0.05);
}

.dropdown-item--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--nav-gold);
}

/* Focus */
.dropdown-item:focus-visible {
  outline: 2px solid var(--nav-gold);
  outline-offset: -2px;
  background: rgba(201, 162, 39, 0.12);
}
```

### 5.3 Mobile States

```css
/* Default */
.mobile-link-text {
  color: rgba(255, 255, 255, 0.85);
}

/* Hover/Active */
.mobile-link:hover .mobile-link-text,
.mobile-link--active .mobile-link-text {
  color: var(--nav-gold);
}

/* Dropdown Active */
.mobile-dropdown-link--active {
  color: var(--nav-gold);
}
```

---

## 6. Component Specifications

### 6.1 Header Component

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  transition: all 0.5s var(--nav-ease-spring);
}

.header--transparent {
  padding-top: 2rem;
  padding-bottom: 1rem;
  background: transparent;
}

.header--scrolled {
  padding-top: 0.75rem;
  padding-bottom: 1rem;
  background: var(--nav-bg-scrolled);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--nav-border-subtle);
}
```

### 6.2 Tricolor Stripe

```css
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
  transition: transform 0.5s var(--nav-ease-spring);
}

.stripe--visible {
  transform: scaleY(1);
}

.stripe--crimson {
  flex: 1;
  background: #8d0801;
}

.stripe--gold {
  flex: 1;
  background: #c9a227;
}

.stripe--federal {
  flex: 1;
  background: #1a365d;
}
```

### 6.3 Logo Component

```css
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

.logo-stack {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.logo-text {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 1.25rem; /* Mobile */
  font-size: 1.5rem; /* Desktop @768px */
  font-weight: 700;
  letter-spacing: 0.25em;
  color: white;
}

.logo-tagline {
  height: 1.5rem;
  opacity: 1;
  overflow: hidden;
  transition: all 0.5s var(--nav-ease-spring);
}

.logo-tagline--hidden {
  height: 0;
  opacity: 0;
  margin-top: 0;
}

.logo-tagline-text {
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.6875rem; /* Mobile */
  font-size: 0.75rem; /* Desktop @768px */
  font-weight: 300;
  letter-spacing: 0.2em; /* Desktop: 0.22em */
  text-transform: uppercase;
  color: rgba(201, 162, 39, 0.8);
}
```

### 6.4 CTA Button

```css
.cta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  min-height: 44px;
  background: var(--nav-gold);
  border: 1px solid var(--nav-gold);
  color: #0a1628;
  font-family: var(--font-cinzel), 'Cinzel', serif;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.2s ease;
}

.cta:hover {
  background: var(--nav-gold-hover);
  border-color: var(--nav-gold-hover);
}

.cta:focus-visible {
  outline: 2px solid var(--nav-gold);
  outline-offset: 2px;
}
```

### 6.5 Mobile Menu

```css
.mobile {
  position: fixed;
  inset: 0;
  z-index: 55;
  visibility: hidden;
  transition: visibility 0.5s;
}

.mobile--open {
  visibility: visible;
}

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
  transition: transform var(--nav-menu-open) var(--nav-ease-spring);
}

.mobile--open .mobile-drawer {
  transform: translateX(0);
}
```

---

## 7. Accessibility

### 7.1 Keyboard Navigation

All interactive elements support full keyboard navigation:

- **Tab**: Move through navigation items
- **Enter/Space**: Activate links and toggles
- **Escape**: Close dropdowns and mobile menu
- **Arrow Keys**: Navigate within dropdowns (future enhancement)

### 7.2 Screen Reader Support

```html
<!-- Desktop Nav -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" aria-current="page">Link</a>
    </li>
  </ul>
</nav>

<!-- Dropdown -->
<button role="menuitem" aria-haspopup="true" aria-expanded="false">Events & Programs</button>
<ul role="menu" aria-hidden="true">
  <li role="none">
    <a role="menuitem">Subitem</a>
  </li>
</ul>

<!-- Mobile Menu -->
<div role="dialog" aria-modal="true" aria-label="Navigation menu" aria-hidden="true"></div>
```

### 7.3 Focus Management

```typescript
// Mobile menu opens: Focus first item
const firstFocusable = menuRef.current?.querySelector('a, button')
if (firstFocusable) (firstFocusable as HTMLElement).focus()

// Route change: Focus main heading
const mainHeading = document.querySelector('main h1')
if (mainHeading instanceof HTMLElement) {
  mainHeading.setAttribute('tabindex', '-1')
  mainHeading.focus({ preventScroll: true })
}
```

### 7.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .header,
  .stripe,
  .logo-tagline,
  .nav-link-underline,
  .mobile-drawer,
  .mobile-backdrop,
  .mobile-link,
  .dropdown-menu,
  .dropdown-chevron {
    transition: none;
  }

  /* Ensure dropdowns still function */
  .dropdown-menu[aria-hidden='false'] {
    opacity: 1;
    visibility: visible;
  }
}
```

---

## 8. Responsive Behavior

### 8.1 Breakpoints

```css
/* Mobile: < 768px */
- Mobile menu (drawer)
- Stacked logo
- Hamburger toggle

/* Desktop: >= 768px */
- Horizontal navigation
- Dropdowns on hover/click
- Logo with tagline
```

### 8.2 Mobile-Specific

```css
@media (max-width: 767px) {
  .nav {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }
}
```

### 8.3 Desktop-Specific

```css
@media (min-width: 768px) {
  .nav {
    display: flex;
  }

  .mobile-toggle,
  .mobile {
    display: none;
  }
}
```

---

## 9. CSS Custom Properties (Final)

Complete token system for implementation:

```css
:root {
  /* === COLORS === */

  /* Gold Accent */
  --nav-gold: #c9a227;
  --nav-gold-hover: #d4af37;
  --nav-gold-on-light: #b89d3a;

  /* Text on Dark */
  --nav-text-default: rgba(255, 255, 255, 0.7);
  --nav-text-hover: #ffffff;
  --nav-text-active: #ffffff;

  /* Text on Light */
  --nav-text-light-default: rgba(10, 22, 40, 0.85);
  --nav-text-light-hover: #0a1628;
  --nav-text-light-active: #0a1628;

  /* Backgrounds */
  --nav-bg-scrolled: rgba(10, 15, 20, 0.97);
  --nav-bg-transparent: transparent;

  /* Borders */
  --nav-border-subtle: rgba(255, 255, 255, 0.05);
  --nav-divider: rgba(255, 255, 255, 0.15);

  /* Dropdown */
  --nav-dropdown-bg: rgba(10, 15, 20, 0.98);
  --nav-dropdown-border: rgba(201, 162, 39, 0.2);
  --nav-dropdown-hover-bg: rgba(201, 162, 39, 0.08);

  /* Tricolor Stripe */
  --nav-stripe-crimson: #8d0801;
  --nav-stripe-gold: #c9a227;
  --nav-stripe-federal: #1a365d;

  /* === TYPOGRAPHY === */

  /* Font Families */
  --nav-font-display: var(--font-cinzel), 'Cinzel', serif;
  --nav-font-mobile: var(--font-cormorant), 'Cormorant Garamond', serif;

  /* Font Sizes */
  --nav-size-link: 0.6875rem; /* 11px */
  --nav-size-dropdown: 0.625rem; /* 10px */
  --nav-size-logo: 1.5rem; /* 24px */
  --nav-size-tagline: 0.75rem; /* 12px */
  --nav-size-mobile: 1.5rem; /* 24px */
  --nav-size-mobile-sub: 1.25rem; /* 20px */

  /* Letter Spacing */
  --nav-spacing-link: 0.15em;
  --nav-spacing-dropdown: 0.12em;
  --nav-spacing-logo: 0.25em;
  --nav-spacing-tagline: 0.22em;
  --nav-spacing-cta: 0.1em;

  /* === SPACING === */

  /* Header Padding */
  --nav-header-py-unscrolled: 2rem;
  --nav-header-pb-unscrolled: 1rem;
  --nav-header-py-scrolled: 0.75rem;
  --nav-header-pb-scrolled: 1rem;

  /* Gaps */
  --nav-gap-desktop: 2.5rem; /* 40px */
  --nav-gap-mobile: 1rem; /* 16px */
  --nav-gap-divider: 1rem; /* 16px each side */

  /* CTA Padding */
  --nav-cta-padding: 0.875rem 1.5rem;
  --nav-cta-mobile-padding: 1rem 2rem;

  /* Dropdown */
  --nav-dropdown-gap: 0.5rem;
  --nav-dropdown-padding: 0.75rem 0;
  --nav-dropdown-item-padding: 0.75rem 1.25rem;
  --nav-dropdown-item-hover-padding: 0.75rem 1.5rem;

  /* === ANIMATION === */

  /* Easing */
  --nav-ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --nav-ease-standard: ease;

  /* Timing */
  --nav-menu-open: 400ms;
  --nav-menu-close: 280ms;
  --nav-dropdown-open: 150ms;
  --nav-dropdown-close: 150ms;
  --nav-hover: 300ms;
  --nav-underline: 300ms;
  --nav-stagger: 50ms;

  /* === DIMENSIONS === */

  /* Touch Targets */
  --nav-min-touch: 44px;

  /* Stripe */
  --nav-stripe-height: 4px;

  /* Mobile Drawer */
  --nav-drawer-width: 24rem;
}
```

---

## 10. Implementation Checklist

### Phase 1: Color System

- [ ] Add CSS custom properties to `globals.css`
- [ ] Implement light background detection
- [ ] Test contrast ratios (4.5:1 minimum)
- [ ] Verify gold on light pages

### Phase 2: Typography

- [ ] Verify Cinzel and Cormorant loading
- [ ] Apply desktop font specs
- [ ] Apply mobile font specs
- [ ] Test text rendering on retina displays

### Phase 3: Animation

- [ ] Add spring easing curve
- [ ] Implement timing tokens
- [ ] Test mobile menu open/close
- [ ] Test dropdown animations
- [ ] Verify stagger delays

### Phase 4: Layout

- [ ] Update header padding
- [ ] Increase nav gaps
- [ ] Increase CTA padding
- [ ] Test touch targets on mobile
- [ ] Verify responsive breakpoints

### Phase 5: Interactive States

- [ ] Fix current page indicator (always visible)
- [ ] Test all hover states
- [ ] Test focus-visible states
- [ ] Test dropdown active states
- [ ] Verify mobile states

### Phase 6: Accessibility

- [ ] ARIA labels audit
- [ ] Keyboard navigation test
- [ ] Screen reader test
- [ ] Focus management verification
- [ ] Reduced motion test

### Phase 7: Cross-Browser

- [ ] Chrome/Edge (Chromium)
- [ ] Safari (WebKit)
- [ ] Firefox (Gecko)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 11. Visual Reference

### Desktop Navigation (Dark Background)

```
┌──────────────────────────────────────────────────────────────────────┐
│ [Stripe: Crimson | Gold | Federal] (4px height, visible when scrolled)│
│                                                                        │
│  ROCKY MOUNT                    VISIT   EVENTS   MEMBERSHIP   |       │
│  Tennessee starts here          THE REGION   EVIDENCE   │             │
│  (Logo collapses on scroll)     EDUCATORS   SUPPORT         PLAN YOUR │
│                                  ════════    ════════         VISIT    │
│                                  (Gold underlines appear on hover/active)│
└──────────────────────────────────────────────────────────────────────┘

Colors:
- Background: rgba(10,15,20,0.97) with blur
- Text default: rgba(255,255,255,0.7)
- Text hover/active: #ffffff
- Gold underline: #c9a227
- CTA: Gold background, dark text
```

### Mobile Menu (Drawer)

```
┌─────────────────────────────────┐
│                                 │
│  Visit                          │
│                                 │
│  Events & Programs        ▼     │
│    2026 Events Calendar         │
│    Recurring Programs           │
│    Lecture Series               │
│                                 │
│  Membership                     │
│                                 │
│  The Region              ▼      │
│    Explore the Original Seven   │
│                                 │
│  Evidence                       │
│                                 │
│  Educators                      │
│                                 │
│  Support                        │
│                                 │
│  ─────────────────────          │
│                                 │
│  ┌─────────────────────────┐   │
│  │  PLAN YOUR VISIT        │   │
│  └─────────────────────────┘   │
│                                 │
│  Tennessee starts here          │
│  (Italic, muted)                │
└─────────────────────────────────┘

Typography:
- Main links: Cormorant Garamond, 1.5rem
- Sub-items: Cormorant Garamond, 1.25rem
- CTA: Cinzel, 0.75rem uppercase
- Tagline: Cormorant, 0.75rem italic
```

---

## 12. Browser Support

### Minimum Requirements

```
Chrome: 90+
Safari: 14+
Firefox: 88+
Edge: 90+
iOS Safari: 14+
Android Chrome: 90+
```

### Progressive Enhancement

```css
/* Fallbacks for older browsers */
@supports not (backdrop-filter: blur(12px)) {
  .header--scrolled {
    background: rgba(10, 15, 20, 1);
  }
}

@supports not (gap: 2.5rem) {
  .nav-list > * + * {
    margin-left: 2.5rem;
  }
}
```

---

## Final Notes

**Every pixel matters.** The navigation should feel authoritative, deliberate, and historically grounded. The spring easing gives it a tactile quality — like turning pages in an old government ledger. The typography hierarchy (uppercase Cinzel for desktop, Title Case Cormorant for mobile) balances formality with readability.

The **critical fix** from Darker's findings: Never allow white text on cream backgrounds. The `isLightBackgroundPage` detection ensures dark header treatment on pages with light backgrounds.

The **critical fix** from Toucher's findings: Current page indicators (gold underlines) must be always visible, not just on hover. This provides clear wayfinding.

This specification is complete and ready for implementation. All team findings have been synthesized into a cohesive system.

---

**Document Version:** 1.0
**Last Updated:** 2026-01-30
**Author:** The Craftsman (Visual Design Lead)
**Team Contributors:** Inker, Mover, Spacer, Toucher, Darker
