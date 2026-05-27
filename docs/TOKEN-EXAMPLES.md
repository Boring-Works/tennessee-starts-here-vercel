# Design Token Examples

**Real-world usage patterns for the Tennessee Starts Here design system**

---

## Shadow Examples

### Standard Card Component

```tsx
// components/EventCard.tsx
export function EventCard({ event }: { event: Event }) {
  return (
    <article className="rounded-sm bg-white shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </article>
  )
}
```

**Why this works:**

- Base state uses `--shadow-md` (standard card elevation)
- Hover state elevates to `--shadow-lg` (lifted effect)
- Smooth transition creates polish

---

### Modal Dialog

```tsx
// components/Modal.tsx
export function Modal({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="bg-white rounded-sm p-8 max-w-2xl shadow-[var(--shadow-xl)]"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  )
}
```

**Why this works:**

- Maximum elevation (`--shadow-xl`) creates clear visual hierarchy
- Modal floats above page content
- Dramatic shadow matches importance

---

### Dropdown Menu

```tsx
// components/Dropdown.tsx
export function Dropdown({ items }: { items: MenuItem[] }) {
  return (
    <ul className="absolute top-full mt-2 bg-white rounded-sm shadow-[var(--shadow-sm)] min-w-[200px]">
      {items.map((item) => (
        <li key={item.id} className="px-4 py-2 hover:bg-cream">
          {item.label}
        </li>
      ))}
    </ul>
  )
}
```

**Why this works:**

- Subtle shadow (`--shadow-sm`) for secondary UI
- Doesn't compete with main content
- Clear but not dominant

---

## Gold Color Examples

### Primary CTA Button

```tsx
// components/CTAButton.tsx
export function CTAButton({ children, href }: ButtonProps) {
  return (
    <a
      href={href}
      className="
        inline-flex items-center gap-2
        bg-[var(--gold-primary)]
        hover:bg-[var(--gold-hover)]
        text-primary px-8 py-4
        font-bold uppercase tracking-wider
        transition-all duration-300
        shadow-[var(--shadow-md)]
        hover:shadow-[var(--shadow-gold-sm)]
      "
    >
      {children}
    </a>
  )
}
```

**Why this works:**

- Primary state: `--gold-primary` (brand gold)
- Hover state: `--gold-hover` (10% brighter)
- Shadow shifts from neutral to gold glow on hover
- Complete interactive feedback system

---

### Featured Card Border

```tsx
// components/FeaturedEventCard.tsx
export function FeaturedEventCard({ event }: { event: Event }) {
  return (
    <article
      className="
        bg-white rounded-sm p-6
        border-2 border-[var(--gold-shimmer)]
        shadow-[var(--shadow-gold-sm)]
        hover:border-[var(--gold-hover)]
        hover:shadow-[var(--shadow-gold-lg)]
        transition-all duration-300
      "
    >
      <span className="text-[var(--gold-primary)] text-xs uppercase tracking-widest font-bold">
        Featured Event
      </span>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </article>
  )
}
```

**Why this works:**

- Border uses `--gold-shimmer` (40% opacity, subtle)
- Text uses `--gold-primary` (full opacity, readable)
- Hover elevates both border and shadow
- Clear visual hierarchy for featured content

---

### Section Heading with Accent

```tsx
// components/SectionHeading.tsx
export function SectionHeading({ children }: PropsWithChildren) {
  return (
    <h2
      className="
      text-4xl font-serif
      text-primary
      border-b-2 border-[var(--gold-primary)]
      pb-4 mb-8
      relative
    "
    >
      {children}
      <span
        className="absolute bottom-0 left-0 w-24 h-0.5 bg-[var(--gold-shimmer)]"
        aria-hidden="true"
      />
    </h2>
  )
}
```

**Why this works:**

- Main border: `--gold-primary` (solid, structural)
- Accent line: `--gold-shimmer` (decorative glow)
- Layered effect creates depth
- Semantic color usage

---

## Combined Patterns

### Hero CTA (Maximum Impact)

```tsx
// components/HeroCTA.tsx
export function HeroCTA() {
  return (
    <button
      className="
      bg-[var(--gold-primary)]
      hover:bg-[var(--gold-hover)]
      text-primary
      px-12 py-6
      text-lg font-bold uppercase tracking-[0.2em]
      shadow-[var(--shadow-gold-lg)]
      hover:shadow-[var(--shadow-gold-lg)]
      hover:-translate-y-1
      transition-all duration-300
      border-2 border-transparent
      hover:border-[var(--gold-shimmer)]
    "
    >
      Book Your Visit
    </button>
  )
}
```

**Why this works:**

- Large gold shadow creates immediate attention
- Hover adds lift animation + shimmer border
- Combines all three gold tokens for maximum effect
- Reserved for primary conversion points

---

### Navigation Link

```tsx
// components/NavLink.tsx
export function NavLink({ href, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className="
        text-white/70
        hover:text-[var(--gold-primary)]
        transition-colors duration-300
        relative
        after:absolute after:bottom-0 after:left-0 after:right-0
        after:h-0.5 after:bg-[var(--gold-shimmer)]
        after:scale-x-0 hover:after:scale-x-100
        after:transition-transform after:duration-300
      "
    >
      {children}
    </a>
  )
}
```

**Why this works:**

- Text color shifts to `--gold-primary` on hover
- Underline uses `--gold-shimmer` (subtle glow)
- Scale animation creates smooth reveal
- Accessible color contrast maintained

---

## CSS Module Patterns

### Complete Card System

```css
/* components/Card/Card.module.css */

.card {
  background: white;
  border-radius: 2px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: all 300ms ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.cardFeatured {
  composes: card;
  border: 2px solid var(--gold-shimmer);
  box-shadow: var(--shadow-gold-sm);
}

.cardFeatured:hover {
  border-color: var(--gold-hover);
  box-shadow: var(--shadow-gold-lg);
}

.cardBadge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--gold-shimmer);
  color: var(--gold-primary);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 2px;
}
```

---

## Inline Style Patterns

### Dynamic Shadow Based on Props

```tsx
// components/ElevatedSection.tsx
type Elevation = 'low' | 'medium' | 'high'

const SHADOW_MAP: Record<Elevation, string> = {
  low: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
  high: 'var(--shadow-lg)',
}

export function ElevatedSection({ elevation = 'medium', children }: Props) {
  return <section style={{ boxShadow: SHADOW_MAP[elevation] }}>{children}</section>
}
```

---

### Gold Accent Overlay

```tsx
// components/ImageCard.tsx
export function ImageCard({ src, alt, title }: ImageCardProps) {
  return (
    <div className="relative overflow-hidden rounded-sm shadow-[var(--shadow-md)]">
      <img src={src} alt={alt} className="w-full h-64 object-cover" />
      <div
        className="absolute inset-0 bg-[var(--gold-shimmer)] opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ mixBlendMode: 'multiply' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-2xl font-bold">{title}</h3>
        </div>
      </div>
    </div>
  )
}
```

**Why this works:**

- Gold overlay uses `--gold-shimmer` (consistent 40% opacity)
- Blend mode creates sophisticated color effect
- Zero opacity to full opacity transition
- Brand colors integrated into imagery

---

## Dark Theme Preparation

Tokens are structured for easy dark mode support:

```css
/* Future dark theme override */
@media (prefers-color-scheme: dark) {
  :root {
    /* Shadows need lighter colors in dark mode */
    --shadow-xs: 0 1px 2px rgba(255, 255, 255, 0.06);
    --shadow-sm: 0 2px 4px rgba(255, 255, 255, 0.08);
    --shadow-md: 0 4px 12px rgba(255, 255, 255, 0.12);

    /* Gold colors might need adjustment too */
    --gold-primary: #d4af37; /* Brighter in dark mode */
    --gold-hover: #e5c158;
    --gold-shimmer: rgba(212, 175, 55, 0.5); /* Higher opacity */
  }
}
```

Components using tokens automatically adapt—no code changes required.

---

## Anti-Patterns (Don't Do This)

❌ **Mixing tokens with hardcoded values**

```tsx
// BAD: Inconsistent shadow system
<div className="shadow-[var(--shadow-md)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]" />

// GOOD: Use tokens consistently
<div className="shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]" />
```

❌ **Creating new shadow values**

```css
/* BAD: Custom shadow breaks system */
.myCard {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.14);
}

/* GOOD: Use existing token */
.myCard {
  box-shadow: var(--shadow-md);
}
```

❌ **Using gold shadows on non-brand elements**

```tsx
// BAD: Gold shadow on generic card
<div className="shadow-[var(--shadow-gold-lg)]">
  <p>Generic content</p>
</div>

// GOOD: Gold shadow for brand CTAs only
<button className="shadow-[var(--shadow-gold-sm)]">
  Book Now
</button>
```

---

## Performance Notes

**CSS Variables are fast:**

- Compiled at runtime, no build overhead
- Browser-native, no JavaScript required
- Can be updated via inline styles without re-rendering

**Tailwind Arbitrary Values:**

```tsx
// This is fine - Tailwind compiles var() references
<div className="shadow-[var(--shadow-md)]" />
```

**For maximum performance in loops:**

```tsx
// Extract token to constant outside loop
const CARD_SHADOW = 'var(--shadow-md)'

events.map((event) => (
  <div key={event.id} style={{ boxShadow: CARD_SHADOW }}>
    {event.title}
  </div>
))
```

---

**Compiled by:** Dr. Elena Frost, PhD — Design System Architect
**Date:** January 30, 2026
**Last Updated:** January 30, 2026
