# Design Token Quick Reference

**TL;DR for developers**

## Shadows

```css
/* Neutral elevations (use 99% of the time) */
--shadow-xs   /* 0 1px 2px   — barely there */
--shadow-sm   /* 0 2px 4px   — small cards */
--shadow-md   /* 0 4px 12px  — standard cards */
--shadow-lg   /* 0 8px 24px  — modals, headers */
--shadow-xl   /* 0 12px 40px — hero elements */

/* Gold brand glow (special occasions only) */
--shadow-gold-sm   /* 0 4px 12px   — subtle CTA glow */
--shadow-gold-lg   /* 0 8px 30px   — hero CTA glow */
```

## Gold Colors

```css
/* 3 semantic tokens replace 8 variants */
--gold-primary   /* #c9a227 — logos, headers, CTAs */
--gold-hover     /* #d4af37 — interactive hover states */
--gold-shimmer   /* rgba(201, 162, 39, 0.4) — glows, borders */
```

## Usage Examples

### Tailwind (recommended)

```tsx
<div className="shadow-[var(--shadow-md)]" />
<button className="bg-[var(--gold-primary)] hover:bg-[var(--gold-hover)]" />
<div className="border-[var(--gold-shimmer)]" />
```

### Inline Styles

```tsx
<div style={{ boxShadow: 'var(--shadow-lg)' }} />
<span style={{ color: 'var(--gold-primary)' }} />
```

### CSS Modules

```css
.card {
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gold-shimmer);
}

.card:hover {
  box-shadow: var(--shadow-gold-sm);
  border-color: var(--gold-hover);
}
```

## When to Use What

### Shadows

- **xs:** Input fields, inline buttons
- **sm:** Event cards, dropdown menus
- **md:** Standard content cards (most common)
- **lg:** Modals, sticky headers
- **xl:** Full-page overlays, hero images
- **gold-sm:** CTA buttons, featured badges
- **gold-lg:** Hero CTAs, signature sections

### Gold Colors

- **primary:** Any brand gold element (default)
- **hover:** Interactive state changes
- **shimmer:** Decorative accents (40% opacity)

## Migration Cheat Sheet

| Old Code                          | New Token               | Why                  |
| --------------------------------- | ----------------------- | -------------------- |
| `0 4px 12px rgba(0,0,0,0.12)`     | `var(--shadow-md)`      | Standard card shadow |
| `0 8px 30px rgba(201,162,39,0.5)` | `var(--shadow-gold-lg)` | Gold glow effect     |
| `#c9a227`                         | `var(--gold-primary)`   | Main brand gold      |
| `#d4af37`                         | `var(--gold-hover)`     | Hover state          |
| `rgba(201,162,39,0.4)`            | `var(--gold-shimmer)`   | Glow/border          |

## Pro Tips

✅ **DO:**

- Use semantic tokens for new components
- Test in dark mode (tokens are prepared for future dark theme)
- Use `--shadow-md` for 90% of cards

❌ **DON'T:**

- Mix tokens with hardcoded values in same component
- Use gold shadows on non-brand elements
- Create new shadow values without consulting tokens first

## Full Documentation

See `/docs/DESIGN-TOKENS.md` for complete system architecture and design rationale.
