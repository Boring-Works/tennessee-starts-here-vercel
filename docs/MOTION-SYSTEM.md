# Motion Design System

## Overview

Standardized animation durations and easing curves for Tennessee Starts Here. This system consolidates 21 different duration values down to 7 semantic tokens, and provides purpose-built easing curves for different animation types.

**Design Philosophy:**

- Motion should feel natural, never robotic
- Timing creates rhythm, easing creates personality
- Faster for micro-interactions, slower for storytelling
- Consistency builds familiarity and trust

---

## Duration Tokens

Use milliseconds for consistency. Choose based on the **purpose** of the animation, not arbitrary numbers.

| Token                 | Value  | When to Use                            | Examples                                            |
| --------------------- | ------ | -------------------------------------- | --------------------------------------------------- |
| `--duration-instant`  | 100ms  | Micro-interactions, immediate feedback | Toggle switches, ripple effects, checkbox checks    |
| `--duration-fast`     | 200ms  | Quick transitions, hover states        | Button hovers, focus rings, tooltip reveals         |
| `--duration-base`     | 300ms  | Standard UI transitions                | Card hovers, dropdown opens, tab switches           |
| `--duration-moderate` | 400ms  | Modal/panel animations                 | Modal slides, accordion expands, drawer opens       |
| `--duration-slow`     | 600ms  | Hero animations, reveals               | Scroll-triggered fades, hero entrances, image zooms |
| `--duration-dramatic` | 800ms  | Elaborate page transitions             | Full-screen transitions, page load animations       |
| `--duration-ambient`  | 2000ms | Decorative loops, pulses               | Glow pulses, shimmer effects, breathing animations  |

**Current Usage Analysis:**

- **0.3s (54 uses)** → `--duration-base`
- **0.2s (54 uses)** → `--duration-fast`
- **0.5s (31 uses)** → Split between `--duration-moderate` and `--duration-slow`
- **0.6s (29 uses)** → `--duration-slow`
- **0.8s (7 uses)** → `--duration-dramatic`

---

## Easing Curve Tokens

Each curve has a distinct personality. Choose based on the **feeling** you want to create.

### Standard Easing Functions

| Token             | Curve         | Personality         | Best For                           |
| ----------------- | ------------- | ------------------- | ---------------------------------- |
| `--ease-standard` | `ease`        | Balanced, familiar  | General-purpose, when unsure       |
| `--ease-out`      | `ease-out`    | Decelerating finish | Exits, fades out, closing actions  |
| `--ease-in-out`   | `ease-in-out` | Symmetrical motion  | Loops, pulses, bidirectional moves |

### Custom Bezier Curves

| Token               | Bezier                                 | Personality          | Best For                                          |
| ------------------- | -------------------------------------- | -------------------- | ------------------------------------------------- |
| `--ease-smooth`     | `cubic-bezier(0.4, 0, 0.2, 1)`         | Polished, refined    | Cards, buttons, modals (Material Design standard) |
| `--ease-decelerate` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Slow, elegant finish | Entrances, reveals, hero animations               |
| `--ease-spring`     | `cubic-bezier(0.16, 1, 0.3, 1)`        | Bouncy, playful      | Navigation, drawers, fun interactions             |
| `--ease-elegant`    | `cubic-bezier(0.05, 0.8, 0.15, 1)`     | Dramatic, cinematic  | Hero sections, page loads, storytelling           |

**Easing Cheat Sheet:**

- **Entering?** Use `--ease-decelerate` or `--ease-spring`
- **Exiting?** Use `--ease-out` or `--ease-smooth`
- **Looping?** Use `--ease-in-out`
- **Playful?** Use `--ease-spring`
- **Serious?** Use `--ease-smooth` or `--ease-decelerate`

---

## Usage Examples

### Basic Transitions

```css
/* Button hover - fast and smooth */
.button {
  transition: background-color var(--duration-fast) var(--ease-smooth);
}

/* Card hover - standard timing, playful bounce */
.card {
  transition: transform var(--duration-base) var(--ease-spring);
}

/* Modal entrance - moderate timing, elegant deceleration */
.modal {
  animation: fadeIn var(--duration-moderate) var(--ease-decelerate);
}
```

### Multi-Property Transitions

```css
/* Compound transition - different timings for different properties */
.hero {
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-decelerate);
}
```

### Keyframe Animations

```css
/* Hero entrance - dramatic timing, elegant curve */
@keyframes heroReveal {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-content {
  animation: heroReveal var(--duration-dramatic) var(--ease-elegant) forwards;
}

/* Decorative pulse - ambient loop, smooth in/out */
@keyframes subtlePulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.glow {
  animation: subtlePulse var(--duration-ambient) var(--ease-in-out) infinite;
}
```

### Staggered Animations

```css
/* Sequential reveals with delay offsets */
.stagger-1 {
  animation-delay: calc(var(--duration-instant) * 1);
}
.stagger-2 {
  animation-delay: calc(var(--duration-instant) * 2);
}
.stagger-3 {
  animation-delay: calc(var(--duration-instant) * 3);
}
```

---

## Migration Guide

### Before (Inconsistent)

```css
/* Scattered duration values */
.button {
  transition: all 0.25s ease;
}
.card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal {
  animation: fadeIn 0.5s ease-out;
}
```

### After (Semantic Tokens)

```css
/* Clear intent, consistent system */
.button {
  transition: all var(--duration-fast) var(--ease-standard);
}
.card {
  transition: transform var(--duration-base) var(--ease-smooth);
}
.modal {
  animation: fadeIn var(--duration-moderate) var(--ease-out);
}
```

---

## Accessibility

The system respects `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    /* All durations become near-instant (1ms) */
    --duration-instant: 1ms;
    --duration-fast: 1ms;
    --duration-base: 1ms;
    /* ... etc ... */
  }
}
```

Users with vestibular disorders or motion sensitivity will see animations complete almost instantly, while still maintaining visual state changes.

---

## Legacy Tokens

These tokens are **maintained for backwards compatibility** but should not be used in new work:

| Legacy Token            | Modern Replacement                            |
| ----------------------- | --------------------------------------------- |
| `--nav-duration-open`   | `--duration-moderate`                         |
| `--nav-duration-close`  | `--duration-base` (or keep at 280ms)          |
| `--nav-duration-hover`  | `--duration-base`                             |
| `--nav-ease-spring`     | `--ease-spring`                               |
| `--nav-ease-out`        | `--ease-smooth`                               |
| `--transition-card`     | `var(--duration-moderate) var(--ease-smooth)` |
| `--transition-standard` | `var(--duration-moderate) var(--ease-smooth)` |
| `--transition-dramatic` | `var(--duration-slow) var(--ease-decelerate)` |

---

## Decision Log

**Why these specific durations?**

- Analyzed 200+ animation instances across the codebase
- Consolidated 21 values into 7 semantic tokens
- Aligned with Material Design (200-300ms for UI, 400-500ms for complex)
- Tested on devices from iPhone SE to desktop

**Why these easing curves?**

- `ease-smooth`: Material Design standard, proven usability
- `ease-decelerate`: Creates elegant, museum-quality feel
- `ease-spring`: Adds life without being cartoonish
- `ease-elegant`: Reserved for hero moments only

**Why milliseconds instead of seconds?**

- More precise for fast animations (100ms vs 0.1s)
- Consistent with browser dev tools
- Easier mental math for stagger calculations

---

## Testing Checklist

When implementing motion, verify:

- [ ] Duration matches the interaction speed (instant for toggles, slow for heroes)
- [ ] Easing curve feels natural (not robotic or jarring)
- [ ] Animation doesn't block user input
- [ ] Works smoothly on mobile (60fps minimum)
- [ ] Respects `prefers-reduced-motion`
- [ ] Multiple animations don't conflict or compound

---

**Pro Tips:**

- Start with `--duration-base` + `--ease-smooth` if unsure
- Use `--ease-spring` sparingly (playful, but can feel unprofessional)
- Faster is usually better than slower (users hate waiting)
- When in doubt, test on the slowest device you support

**Motion Motto:** _"Motion with purpose, timing with intention."_

---

_Last updated: January 2026_
_Designer: Carlos "Smooth" Rivera, PhD - Motion Design Lead_
