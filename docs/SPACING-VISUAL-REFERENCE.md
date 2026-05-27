# Spacing System Visual Reference

> Visual representation of the spacing scale for designers and developers.

---

## Spacing Scale (Actual Size)

### Base Spacing Scale

```
--space-3xs: 0.125rem (2px)
█

--space-2xs: 0.25rem (4px)
██

--space-xs: 0.5rem (8px)
████

--space-sm: 0.75rem (12px)
██████

--space-md: 1rem (16px) ⭐ BASE UNIT
████████

--space-lg: 1.5rem (24px) ⭐ MOST COMMON
████████████

--space-xl: 2rem (32px) ⭐ SECTION SPACING
████████████████

--space-2xl: 2.5rem (40px)
████████████████████

--space-3xl: 3rem (48px)
████████████████████████

--space-4xl: 4rem (64px) [PAGE SECTION]
████████████████████████████████

--space-5xl: 5rem (80px) [LARGE SECTION]
████████████████████████████████████████

--space-6xl: 6rem (96px) [HERO]
████████████████████████████████████████████████

--space-7xl: 7rem (112px) [MAXIMUM]
████████████████████████████████████████████████████████

--space-8xl: 8rem (128px) [RARE]
████████████████████████████████████████████████████████████████
```

---

## Gap Scale (Flexbox/Grid)

```
--gap-xs: 0.5rem (8px)
████

--gap-sm: 0.75rem (12px)
██████

--gap-md: 1rem (16px) ⭐
████████

--gap-lg: 1.5rem (24px) ⭐
████████████

--gap-xl: 2rem (32px)
████████████████

--gap-2xl: 2.5rem (40px)
████████████████████

--gap-3xl: 3rem (48px)
████████████████████████

--gap-4xl: 4rem (64px)
████████████████████████████████
```

---

## Progression Visualization

### Compact Rhythm (UI Elements)

```
xs → sm → md → lg → xl
0.5  0.75 1.0  1.5  2.0 rem
█    █▓   ██   ███  ████
```

### Section Rhythm (Page Layout)

```
xl → 2xl → 3xl → 4xl → 5xl
2.0  2.5   3.0   4.0   5.0 rem
██   ██▓   ███   ████  █████
```

### Page Rhythm (Major Sections)

```
4xl → 5xl → 6xl → 7xl
4.0   5.0   6.0   7.0 rem
████  █████ ██████ ███████
```

---

## Card Padding Comparison

### Small Card (--spacing-card-sm: 1rem)

```
┌──────────────────────────┐
│████████                  │ padding: 1rem (16px)
│                          │
│   Card Content Here      │
│                          │
│████████                  │
└──────────────────────────┘
```

### Standard Card (--spacing-card-md: 1.5rem)

```
┌──────────────────────────┐
│████████████              │ padding: 1.5rem (24px)
│                          │
│   Card Content Here      │
│                          │
│████████████              │
└──────────────────────────┘
```

### Large Card (--spacing-card-lg: 2rem)

```
┌──────────────────────────┐
│████████████████          │ padding: 2rem (32px)
│                          │
│   Card Content Here      │
│                          │
│████████████████          │
└──────────────────────────┘
```

---

## Icon + Text Gap Comparison

### Tight (--gap-xs: 0.5rem)

```
[icon]█[text]
```

### Standard (--gap-md: 1rem) ⭐

```
[icon]████[text]
```

### Comfortable (--gap-lg: 1.5rem)

```
[icon]██████[text]
```

### Spacious (--gap-xl: 2rem)

```
[icon]████████[text]
```

---

## Grid Gap Visualization

### Compact Grid (--gap-md: 1rem)

```
┌────────┐████┌────────┐████┌────────┐
│ Card 1 │    │ Card 2 │    │ Card 3 │
└────────┘    └────────┘    └────────┘
```

### Standard Grid (--gap-lg: 1.5rem)

```
┌────────┐██████┌────────┐██████┌────────┐
│ Card 1 │      │ Card 2 │      │ Card 3 │
└────────┘      └────────┘      └────────┘
```

### Wide Grid (--gap-xl: 2rem)

```
┌────────┐████████┌────────┐████████┌────────┐
│ Card 1 │        │ Card 2 │        │ Card 3 │
└────────┘        └────────┘        └────────┘
```

### Hero Grid (--gap-3xl: 3rem)

```
┌────────┐████████████┌────────┐
│ Card 1 │            │ Card 2 │
└────────┘            └────────┘
```

---

## Vertical Spacing (Stacked Elements)

### Tight Stack (space-y-[var(--space-sm)])

```
┌─────────────────┐
│ Element 1       │
└─────────────────┘
   ██████  (0.75rem)
┌─────────────────┐
│ Element 2       │
└─────────────────┘
   ██████
┌─────────────────┐
│ Element 3       │
└─────────────────┘
```

### Standard Stack (space-y-[var(--space-md)])

```
┌─────────────────┐
│ Element 1       │
└─────────────────┘
   ████████  (1rem)
┌─────────────────┐
│ Element 2       │
└─────────────────┘
   ████████
┌─────────────────┐
│ Element 3       │
└─────────────────┘
```

### Comfortable Stack (space-y-[var(--space-lg)])

```
┌─────────────────┐
│ Element 1       │
└─────────────────┘
   ████████████  (1.5rem)
┌─────────────────┐
│ Element 2       │
└─────────────────┘
   ████████████
┌─────────────────┐
│ Element 3       │
└─────────────────┘
```

### Spacious Stack (space-y-[var(--space-xl)])

```
┌─────────────────┐
│ Element 1       │
└─────────────────┘
   ████████████████  (2rem)
┌─────────────────┐
│ Element 2       │
└─────────────────┘
   ████████████████
┌─────────────────┐
│ Element 3       │
└─────────────────┘
```

---

## Section Padding Visualization

### Mobile Section (--layout-section-y-mobile: 4rem)

```
████████████████████████████████  (4rem top)

┌──────────────────────────────┐
│                              │
│      Section Content         │
│                              │
└──────────────────────────────┘

████████████████████████████████  (4rem bottom)
```

### Desktop Section (--layout-section-y-desktop: 5rem)

```
████████████████████████████████████████  (5rem top)

┌──────────────────────────────┐
│                              │
│      Section Content         │
│                              │
└──────────────────────────────┘

████████████████████████████████████████  (5rem bottom)
```

### Hero Section (--space-7xl: 7rem)

```
████████████████████████████████████████████████████████  (7rem top)

┌──────────────────────────────┐
│                              │
│      Hero Content            │
│                              │
└──────────────────────────────┘

████████████████████████████████  (4rem bottom - usually less)
```

---

## Responsive Page Padding

### Mobile (--layout-page-padding-mobile: 1.5rem)

```
│████████████│
│            │
│  Content   │
│            │
│████████████│
```

### Tablet (--layout-page-padding-tablet: 2rem)

```
│████████████████│
│                │
│    Content     │
│                │
│████████████████│
```

### Desktop (--layout-page-padding-desktop: clamp(2rem, 5vw, 7.5rem))

```
│█████████ ... ████████│  (Fluid: 2rem - 7.5rem)
│                      │
│       Content        │
│                      │
│█████████ ... ████████│
```

---

## 8pt Grid Reference

```
0.125rem = 2px   (1/4 unit)  █
0.25rem  = 4px   (1/2 unit)  ██
0.5rem   = 8px   (1 unit)    ████
0.75rem  = 12px  (1.5 units) ██████
1rem     = 16px  (2 units)   ████████
1.5rem   = 24px  (3 units)   ████████████
2rem     = 32px  (4 units)   ████████████████
2.5rem   = 40px  (5 units)   ████████████████████
3rem     = 48px  (6 units)   ████████████████████████
4rem     = 64px  (8 units)   ████████████████████████████████
5rem     = 80px  (10 units)  ████████████████████████████████████████
6rem     = 96px  (12 units)  ████████████████████████████████████████████████
7rem     = 112px (14 units)  ████████████████████████████████████████████████████████
8rem     = 128px (16 units)  ████████████████████████████████████████████████████████████████
```

---

## Token Selection Guide

### Component-Level Spacing

| Element             | Gap/Padding | Token      |
| ------------------- | ----------- | ---------- |
| Badge icon + text   | gap         | `--gap-xs` |
| Button icon + text  | gap         | `--gap-md` |
| Card title + icon   | gap         | `--gap-md` |
| Feature icon + text | gap         | `--gap-lg` |
| Hero icon + text    | gap         | `--gap-xl` |

### Card Padding

| Card Type     | Padding | Token                  |
| ------------- | ------- | ---------------------- |
| Small card    | 1rem    | `--spacing-card-sm`    |
| Standard card | 1.5rem  | `--spacing-card-md` ⭐ |
| Large card    | 2rem    | `--spacing-card-lg`    |

### Grid Gaps

| Grid Type           | Gap    | Token         |
| ------------------- | ------ | ------------- |
| Compact (3+ cols)   | 1rem   | `--gap-md`    |
| Standard (2-3 cols) | 1.5rem | `--gap-lg` ⭐ |
| Wide (2 cols)       | 2rem   | `--gap-xl`    |
| Hero (1-2 cols)     | 3rem   | `--gap-3xl`   |

### Section Spacing

| Section Type            | Vertical Padding | Token                          |
| ----------------------- | ---------------- | ------------------------------ |
| Compact                 | 3rem             | `--space-3xl`                  |
| Standard Mobile         | 4rem             | `--layout-section-y-mobile` ⭐ |
| Standard Tablet/Desktop | 5rem             | `--layout-section-y-tablet` ⭐ |
| Hero                    | 7rem             | `--space-7xl`                  |

---

## Mathematical Relationships

### Doubling Progression

```
0.5rem → 1rem → 2rem → 4rem → 8rem
(xs)     (md)   (xl)   (4xl)  (8xl)
```

### Natural Progression (Fibonacci-like)

```
1rem → 1.5rem → 2.5rem → 4rem → 6.5rem (approx)
(md)   (lg)     (2xl)    (4xl)
```

### Golden Ratio Approximation

```
1rem × 1.5 = 1.5rem
1.5rem × 1.5 = 2.25rem ≈ 2rem
2rem × 1.5 = 3rem
3rem × 1.5 = 4.5rem ≈ 5rem
```

---

## Print/Export Reference

**To use this guide:**

1. **For Design Tools**: Use px values when setting up Figma/Sketch
2. **For Development**: Use CSS variable names (`--space-md`, etc.)
3. **For Visual Comparison**: Use this document to compare spacing scales

**Quick conversions:**

```
1rem = 16px (at default browser size)
0.5rem = 8px
0.125rem = 2px
```

**Scale formula:**

```
Base unit = 8px (0.5rem)
All tokens are multiples or divisions of this base
```

---

**Created by:** Dr. Maya Patel, PhD — Spacing Systems Architect
**Date:** January 30, 2026
**Project:** Tennessee Starts Here

**Built on 8pt grid. Rhythm creates harmony. Harmony creates beauty.**
