# Tennessee Starts Here — Style Guide

> Design system for Rocky Mount State Historic Site's America 250 commemorative website.

---

## Brand Identity

**Site Name:** Tennessee Starts Here
**Tagline:** Where Tennessee's government began
**Tone:** Heritage authority, premium institution, emotional connection
**Era Reference:** 1790 (Southwest Territory establishment)

---

## Color Palette

### Primary Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Primary** | `#0a1628` | `--primary` | Dark backgrounds, text, headers |
| **Primary Dark** | `#050d18` | `--primary-dark` | Deeper contrast, overlays |
| **Accent** | `#c9a227` | `--accent` | CTAs, highlights, gold emphasis |
| **Secondary** | `#8b4513` | `--secondary` | Saddle brown, heritage warmth |
| **Burgundy** | `#722F37` | `--burgundy` | Special sections, premium feel |

### Neutral Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Background** | `#faf8f5` | `--background` | Page background |
| **Cream** | `#f8f5f0` | `--cream` | Section backgrounds |
| **Cream Dark** | `#f0ebe3` | `--cream-dark` | Alternate sections |
| **Foreground** | `#1a1a1a` | `--foreground` | Body text |
| **Text Light** | `#525252` | `--text-light` | Secondary text, captions |

### Text on Dark Backgrounds

| Name | Value | CSS Variable | Usage |
|------|-------|--------------|-------|
| **Primary** | `rgba(255, 255, 255, 0.87)` | `--text-on-dark` | Main text on dark |
| **Muted** | `rgba(255, 255, 255, 0.7)` | `--text-on-dark-muted` | Secondary text on dark |
| **Subtle** | `rgba(255, 255, 255, 0.6)` | `--text-on-dark-subtle` | Tertiary text on dark |

### Color Usage Examples

```css
/* Hero section - dark background */
background: var(--primary);
color: white;

/* CTA button - gold accent */
background: var(--accent);
color: var(--primary);

/* Card on light background */
background: white;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

/* Progress bar fill */
background: var(--accent);
```

---

## Typography

### Font Families

| Font | CSS Variable | Usage |
|------|--------------|-------|
| **Playfair Display** | `--font-serif` | Headlines, titles, emphasis |
| **Cormorant Garamond** | `--font-serif-elegant` | Italic accents, quotes, subheadlines |
| **System UI** | `--font-sans` | Body text, UI elements |

### Font Weights

**Playfair Display:** 400, 500, 600, 700, 800, 900
**Cormorant Garamond:** 300, 400, 500, 600, 700 (normal + italic)

### Type Scale (Responsive)

Headlines use `clamp()` for fluid scaling:

| Element | Size Range | Example |
|---------|------------|---------|
| **Hero Display** | `clamp(2.5rem, 10vw, 7rem)` | "Tennessee" |
| **Hero Accent** | `clamp(1.5rem, 5vw, 3.5rem)` | "starts here" |
| **Page Title** | `clamp(2rem, 6vw, 3rem)` | Section headers |
| **Section Heading** | `clamp(1.75rem, 5vw, 2.5rem)` | Card titles |
| **Subheading** | `clamp(1.25rem, 3vw, 1.5rem)` | Card subtitles |
| **Body Large** | `clamp(1rem, 2.5vw, 1.25rem)` | Intro paragraphs |
| **Body** | `0.9375rem` (15px) | Standard text |
| **Small** | `0.875rem` (14px) | Captions, notes |
| **Micro** | `0.75rem` (12px) | Labels, badges |

### Letter Spacing

| Type | Spacing | Usage |
|------|---------|-------|
| **Display** | `-0.02em` | Large headlines (tighten) |
| **Italic Accent** | `0.05em - 0.06em` | Cormorant headlines |
| **Buttons/Labels** | `0.1em - 0.12em` | Uppercase CTAs |
| **Eyebrows** | `0.15em - 0.2em` | Section labels |
| **Kickers** | `0.25em - 0.3em` | Hero eyebrow text |

### Line Heights

| Element | Line Height |
|---------|-------------|
| **Headlines** | `1.1` |
| **Body Text** | `1.6` |
| **Tight Text** | `1.4` |

---

## Spacing System

### Section Padding

| Breakpoint | Vertical | Horizontal |
|------------|----------|------------|
| **Mobile** | `4rem 1rem` | — |
| **Tablet (768px)** | `5rem 1.5rem` | — |
| **Desktop (1024px)** | `5rem 2rem` | — |

### Component Spacing

| Element | Padding |
|---------|---------|
| **Card** | `1.5rem` (mobile), `2rem` (desktop) |
| **Button** | `0.875rem 1.5rem` (standard), `1rem 2rem` (large) |
| **Badge** | `0.25rem 0.75rem` |
| **Progress bar container** | `0.75rem` |

### Max Widths

| Container | Width |
|-----------|-------|
| **Hero content** | `48rem` (768px) |
| **Standard section** | `56rem` (896px) |
| **Wide section** | `64rem` (1024px) |
| **Full bleed** | `100%` |

---

## Components

### Buttons

#### Primary CTA
```css
.btn-primary {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  background: var(--accent);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
```

#### Secondary CTA (Outline)
```css
.btn-secondary {
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: transparent;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.6);
}
```

### Cards

```css
.card {
  background: white;
  padding: 1.5rem; /* 2rem on desktop */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

/* Featured card */
.card--featured {
  background: var(--primary);
  color: white;
}
```

### Progress Bars

```css
.progress-bar {
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.5s ease;
}
```

### Badges/Eyebrows

```css
.eyebrow {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--secondary);
}

.badge {
  display: inline-block;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.25rem 0.625rem;
  background: var(--secondary);
  color: white;
}
```

---

## Shadows

| Name | Value | Usage |
|------|-------|-------|
| **Subtle** | `0 2px 8px rgba(0, 0, 0, 0.06)` | Cards, subtle elevation |
| **Medium** | `0 4px 20px rgba(0, 0, 0, 0.06)` | Standard cards |
| **Strong** | `0 8px 30px rgba(0, 0, 0, 0.15)` | Elevated elements |
| **Accent Glow** | `0 8px 30px rgba(201, 162, 39, 0.3)` | Gold button hover |

---

## Animations

### Keyframes

```css
/* Hero fade in */
@keyframes heroAnimate {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gold shimmer on text */
@keyframes shimmer {
  0%, 100% { background-position: 100% 0; }
  50% { background-position: 0% 0; }
}

/* Scroll indicator pulse */
@keyframes scrollPulse {
  0%, 100% { opacity: 0.5; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(4px); }
}
```

### Transition Standards

| Type | Duration | Easing |
|------|----------|--------|
| **Fast** | `0.2s` | `ease` |
| **Standard** | `0.3s` | `ease` |
| **Smooth** | `0.4s` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| **Progress** | `0.5s` | `ease` |

### Hover Effects

```css
/* Standard button hover */
transform: translateY(-2px);

/* Card hover (if interactive) */
transform: translateY(-4px);
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
```

### Reduced Motion

Always include:
```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
  }
}
```

---

## Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| **xs** | `374px` | Small phone edge cases |
| **sm** | `480px` | Large phones |
| **md** | `640px` | Small tablets |
| **lg** | `768px` | Tablets |
| **xl** | `1024px` | Desktops |
| **2xl** | `1280px` | Large desktops |

---

## Accessibility

### Focus States
```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* On dark backgrounds */
.dark-bg *:focus-visible {
  outline: 2px solid white;
  outline-offset: 3px;
}
```

### Screen Reader Only
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Skip Link
```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: var(--primary);
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

## Section Patterns

### Hero Section
- Full viewport height (`100vh` / `100dvh`)
- Dark background with noise texture overlay
- Centered content with staggered animations
- Primary + secondary CTA buttons

### Quote/Document Section
- Cream background
- Decorative rules with corner ornaments
- Blockquote with large opening quote mark
- Attribution footer

### Timeline Section
- Progress bar visualization
- Milestone cards with year markers
- Hero milestone card (highlighted)

### Card Grid Section
- 1 column mobile → 2-3 columns desktop
- Consistent card shadows
- Featured card treatment

### CTA Section
- Dark background
- Centered content
- Progress bar (if enrollment/scarcity)
- Dual CTA buttons

---

## Naming Conventions

### CSS Classes (BEM-inspired)

```
.[section]-[element]
.[section]-[element]--[modifier]
```

Examples:
- `.hero-headline`
- `.hero-cta`
- `.hero-cta--primary`
- `.card--featured`
- `.legacy-tier`
- `.legacy-tier--featured`

### Section Prefixes

| Page | Prefix |
|------|--------|
| Homepage | `hero-`, `blount-`, `story-`, `gathering-`, `decision-`, `homecoming-` |
| Events | `calendar-` |
| Lectures | `series-` |
| First 250 | `legacy-` |
| Visit | `visit-` |

---

## File Structure

```
app/
├── globals.css          # All styles (no CSS modules)
├── layout.tsx           # Font loading, metadata
├── page.tsx             # Homepage
├── events/page.tsx
├── first-250/page.tsx
├── lectures/page.tsx
└── visit/page.tsx

components/
├── Navigation.tsx
├── Footer.tsx
├── Countdown.tsx
├── EmailSignup.tsx
└── MobileStickyCTA.tsx

data/
├── enrollment.json      # Enrollment numbers (single source)
├── events.json
├── lectures.json
└── siteInfo.json
```

---

## Quick Reference

### Color Tokens
```css
--primary: #0a1628;
--accent: #c9a227;
--secondary: #8b4513;
--burgundy: #722F37;
--cream: #f8f5f0;
```

### Font Stack
```css
--font-serif: Playfair Display, Georgia, serif;
--font-serif-elegant: Cormorant Garamond, Georgia, serif;
--font-sans: system-ui, sans-serif;
```

### Standard Button
```css
padding: 1rem 2rem;
font-size: 0.8125rem;
font-weight: 700;
letter-spacing: 0.12em;
text-transform: uppercase;
transition: all 0.3s ease;
```

### Standard Card
```css
background: white;
padding: 1.5rem;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
```

---

*Last updated: January 2026*
