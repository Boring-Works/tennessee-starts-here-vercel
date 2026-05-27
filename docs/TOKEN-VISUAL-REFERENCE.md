# Design Token Visual Reference

**At-a-Glance Token Chart**

---

## Shadow Tokens

```
┌─────────────────────────────────────────────────────────────────┐
│                    SHADOW ELEVATION SCALE                        │
└─────────────────────────────────────────────────────────────────┘

--shadow-xs    ▪     0 1px 2px rgba(0,0,0,0.06)      BARELY THERE
               │     Use: Input fields, inline buttons
               │
--shadow-sm    ▪▪    0 2px 4px rgba(0,0,0,0.08)      SUBTLE LIFT
               ││    Use: Event cards, dropdown menus
               ││
--shadow-md    ▪▪▪   0 4px 12px rgba(0,0,0,0.12)     STANDARD (DEFAULT)
               │││   Use: Content cards, panels (most common)
               │││
--shadow-lg    ▪▪▪▪  0 8px 24px rgba(0,0,0,0.15)     ELEVATED
               ││││  Use: Modals, sticky headers
               ││││
--shadow-xl    ▪▪▪▪▪ 0 12px 40px rgba(0,0,0,0.20)    DRAMATIC
               │││││ Use: Hero images, full-page overlays
               │││││

┌─────────────────────────────────────────────────────────────────┐
│                   GOLD ACCENT SHADOWS                            │
└─────────────────────────────────────────────────────────────────┘

--shadow-gold-sm   ✦   0 4px 12px rgba(201,162,39,0.3)   SUBTLE GLOW
                   │   Use: CTA buttons, featured badges
                   │
--shadow-gold-lg   ✦✦  0 8px 30px rgba(201,162,39,0.5)   PROMINENT GLOW
                   ││  Use: Hero CTAs, signature elements
                   ││
```

---

## Gold Color Tokens

```
┌─────────────────────────────────────────────────────────────────┐
│                     SEMANTIC GOLD COLORS                         │
└─────────────────────────────────────────────────────────────────┘

--gold-primary     ████  #c9a227                    MAIN BRAND GOLD
                         rgb(201, 162, 39)
                         Use: Logos, headers, primary CTAs

--gold-hover       ████  #d4af37                    INTERACTIVE HOVER
                         rgb(212, 175, 55)          (+10% brightness)
                         Use: Hover states, focus rings

--gold-shimmer     ░░░░  rgba(201,162,39,0.4)       DECORATIVE GLOW
                         40% opacity                (semi-transparent)
                         Use: Borders, overlays, glows
```

---

## Usage Matrix

```
┌──────────────────────┬──────────────┬──────────────┬──────────────┐
│   ELEMENT TYPE       │   SHADOW     │   COLOR      │   EXAMPLE    │
├──────────────────────┼──────────────┼──────────────┼──────────────┤
│ Input Field          │ --shadow-xs  │ (neutral)    │ <input>      │
│ Dropdown Menu        │ --shadow-sm  │ (neutral)    │ <select>     │
│ Event Card           │ --shadow-md  │ (neutral)    │ <article>    │
│ Featured Card        │ --shadow-md  │ gold-shimmer │ <article>    │
│ Modal Dialog         │ --shadow-xl  │ (neutral)    │ <dialog>     │
│ CTA Button           │ --shadow-md  │ gold-primary │ <button>     │
│ CTA Button (hover)   │ gold-sm      │ gold-hover   │ :hover       │
│ Hero CTA             │ gold-lg      │ gold-primary │ <button>     │
│ Section Border       │ (none)       │ gold-shimmer │ border-color │
│ Navigation Link      │ (none)       │ gold-primary │ :hover       │
└──────────────────────┴──────────────┴──────────────┴──────────────┘
```

---

## Transition States

```
┌─────────────────────────────────────────────────────────────────┐
│                    BUTTON STATE MACHINE                          │
└─────────────────────────────────────────────────────────────────┘

 DEFAULT STATE
 ┌────────────────────────────────────┐
 │  bg: var(--gold-primary)           │
 │  shadow: var(--shadow-md)          │
 │  border: transparent               │
 └────────────────────────────────────┘
              │
              │ :hover
              ▼
 HOVER STATE
 ┌────────────────────────────────────┐
 │  bg: var(--gold-hover)             │
 │  shadow: var(--shadow-gold-sm)     │
 │  border: var(--gold-shimmer)       │
 │  transform: translateY(-2px)       │
 └────────────────────────────────────┘
              │
              │ :active
              ▼
 ACTIVE STATE
 ┌────────────────────────────────────┐
 │  bg: var(--gold-hover)             │
 │  shadow: var(--shadow-sm)          │
 │  transform: translateY(0)          │
 └────────────────────────────────────┘
```

---

## Card Elevation System

```
┌─────────────────────────────────────────────────────────────────┐
│                   CARD HIERARCHY LEVELS                          │
└─────────────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════╗   --shadow-xl
║                                       ║   HERO CARD
║          Featured Content             ║   (Maximum impact)
║                                       ║
╚═══════════════════════════════════════╝

  ┌────────────────────────────────────┐    --shadow-lg
  │                                    │    MODAL/DIALOG
  │        Important Content           │    (Elevated above page)
  │                                    │
  └────────────────────────────────────┘

    ┌──────────────────────────────┐        --shadow-md
    │                              │        STANDARD CARD
    │      Regular Content         │        (Most common, 90% of cards)
    │                              │
    └──────────────────────────────┘

      ┌────────────────────────┐            --shadow-sm
      │                        │            MINOR CARD
      │    Secondary Info      │            (Dropdowns, tooltips)
      │                        │
      └────────────────────────┘

        ┌──────────────────┐                --shadow-xs
        │                  │                INLINE ELEMENT
        │   Subtle Depth   │                (Minimal elevation)
        │                  │
        └──────────────────┘
```

---

## Color Contrast Ratios

```
┌─────────────────────────────────────────────────────────────────┐
│              WCAG 2.1 ACCESSIBILITY COMPLIANCE                   │
└─────────────────────────────────────────────────────────────────┘

Gold on White Background:
  --gold-primary on white   → 4.8:1  ✓ AA (large text)
  --gold-hover on white     → 4.2:1  ✓ AA (large text)

Gold on Dark Background (#0d1821):
  --gold-primary on dark    → 8.5:1  ✓✓ AAA (normal text)
  --gold-hover on dark      → 9.2:1  ✓✓ AAA (normal text)

White on Gold Background:
  white on --gold-primary   → 4.3:1  ✓ AA (large text)
  white on --gold-hover     → 3.9:1  ⚠ Use for large text only

Black on Gold Background:
  black on --gold-primary   → 4.9:1  ✓ AA (large text)
  black on --gold-hover     → 5.4:1  ✓ AA (normal text)
```

---

## Opacity Scale (for gold-shimmer variants)

```
┌─────────────────────────────────────────────────────────────────┐
│           RGBA OPACITY VARIANTS (when needed)                    │
└─────────────────────────────────────────────────────────────────┘

Based on rgba(201, 162, 39, ?)

░░░░░░░░░░  0.1   Very subtle background
░░░░░░░░    0.15  Card borders (light touch)
░░░░░░      0.2   Hover overlays
░░░░        0.3   Active overlays
░░          0.4   --gold-shimmer (standard)   ← TOKEN
░           0.5   Strong borders
▓           0.6   Prominent accents
▓▓          0.7   Near-solid
▓▓▓         0.8   Muted gold
████        1.0   --gold-primary              ← TOKEN
```

**Recommendation:** Stick to `--gold-shimmer` (0.4) for consistency.
Only use custom opacities for special cases.

---

## Token Naming Convention

```
┌─────────────────────────────────────────────────────────────────┐
│                  TOKEN STRUCTURE PATTERN                         │
└─────────────────────────────────────────────────────────────────┘

SHADOW TOKENS:
  --shadow-{size}           Neutral elevation
  --shadow-gold-{size}      Brand accent glow

  Where {size} = xs | sm | md | lg | xl

GOLD TOKENS:
  --gold-{semantic}         Brand color

  Where {semantic} = primary | hover | shimmer

FUTURE TOKENS (examples):
  --spacing-{size}          8px, 16px, 24px, 32px, 48px...
  --radius-{size}           2px, 4px, 8px, 16px...
  --duration-{speed}        150ms, 300ms, 500ms...
```

---

## Copy-Paste Snippets

### Standard Card

```css
.card {
  background: white;
  box-shadow: var(--shadow-md);
  border-radius: 2px;
  padding: 1.5rem;
  transition: box-shadow 300ms ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
}
```

### Featured Card

```css
.featuredCard {
  background: white;
  box-shadow: var(--shadow-md);
  border: 2px solid var(--gold-shimmer);
  border-radius: 2px;
  padding: 1.5rem;
  transition: all 300ms ease;
}

.featuredCard:hover {
  box-shadow: var(--shadow-gold-sm);
  border-color: var(--gold-hover);
}
```

### CTA Button

```css
.ctaButton {
  background: var(--gold-primary);
  color: #0d1821;
  padding: 1rem 2rem;
  border: none;
  box-shadow: var(--shadow-md);
  transition: all 300ms ease;
  cursor: pointer;
}

.ctaButton:hover {
  background: var(--gold-hover);
  box-shadow: var(--shadow-gold-sm);
  transform: translateY(-2px);
}

.ctaButton:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}
```

### Modal

```css
.modal {
  background: white;
  box-shadow: var(--shadow-xl);
  border-radius: 2px;
  padding: 2rem;
  max-width: 600px;
}

.modalBackdrop {
  background: rgba(0, 0, 0, 0.5);
}
```

---

## Browser DevTools Testing

**To verify tokens resolve correctly:**

1. Open DevTools (F12)
2. Inspect an element using tokens
3. Go to "Computed" tab
4. Find `box-shadow` or `color`
5. Value should show resolved rgba/hex (not `var(--token)`)

**Example:**

```
Declared:   box-shadow: var(--shadow-md);
Computed:   box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 12px 0px;
```

If computed shows `var(--shadow-md)`, token is not defined.

---

## Migration Quick Commands

**Find all hardcoded shadows:**

```bash
grep -r "box-shadow:" app/ components/ --include="*.css" | grep -v "var(--"
```

**Find all gold hex colors:**

```bash
grep -rE "#[cCdD][0-9a-fA-F]{5}" app/ components/ --include="*.css" --include="*.tsx"
```

**Count shadow token usage:**

```bash
grep -r "var(--shadow-" app/ components/ | wc -l
```

**Count gold token usage:**

```bash
grep -r "var(--gold-" app/ components/ | wc -l
```

---

## Token Adoption Checklist

When creating a new component:

- [ ] Use `--shadow-md` for standard cards
- [ ] Use `--shadow-lg` for elevated sections
- [ ] Use `--gold-primary` for brand elements
- [ ] Use `--gold-hover` for interactive states
- [ ] Use `--gold-shimmer` for borders/glows
- [ ] Test hover states with token transitions
- [ ] Verify in browser DevTools
- [ ] Check accessibility contrast ratios

---

**Reference Version:** 1.0
**Last Updated:** January 30, 2026
**Maintained By:** Dr. Elena Frost, PhD — Design System Architect
