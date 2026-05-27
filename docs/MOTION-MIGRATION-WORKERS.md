# Motion System Migration - Worker Instructions

## Mission

Migrate all hardcoded animation durations and easing functions to use the new motion design tokens from `app/globals.css`.

**Goal:** Consolidate 21+ different duration values into 7 semantic tokens for consistency and maintainability.

---

## Phase 1: Duration Token Migration

### Step 1: Replace Common Durations

Search and replace these patterns across all `.css` and `.module.css` files:

| Find               | Replace With               | Token  | Notes                    |
| ------------------ | -------------------------- | ------ | ------------------------ |
| `0.1s` or `100ms`  | `var(--duration-instant)`  | 100ms  | Toggles, ripples         |
| `0.15s` or `150ms` | `var(--duration-fast)`     | 200ms  | Round up for consistency |
| `0.2s` or `200ms`  | `var(--duration-fast)`     | 200ms  | Hovers, focus            |
| `0.25s` or `250ms` | `var(--duration-base)`     | 300ms  | Round up for consistency |
| `0.3s` or `300ms`  | `var(--duration-base)`     | 300ms  | Cards, buttons           |
| `0.4s` or `400ms`  | `var(--duration-moderate)` | 400ms  | Modals, dropdowns        |
| `0.5s` or `500ms`  | `var(--duration-moderate)` | 400ms  | Most should be moderate  |
| `0.6s` or `600ms`  | `var(--duration-slow)`     | 600ms  | Hero animations          |
| `0.7s` or `700ms`  | `var(--duration-dramatic)` | 800ms  | Round up for consistency |
| `0.8s` or `800ms`  | `var(--duration-dramatic)` | 800ms  | Page transitions         |
| `1s` or `1000ms`   | `var(--duration-ambient)`  | 2000ms | Only if loop/pulse       |
| `1.5s`             | `var(--duration-ambient)`  | 2000ms | Only if loop/pulse       |
| `2s`               | `var(--duration-ambient)`  | 2000ms | Decorative loops         |
| `3s` or longer     | `var(--duration-ambient)`  | 2000ms | Decorative loops         |

**Special Cases:**

- **0.5s-0.7s for hero animations?** → `var(--duration-slow)` (600ms)
- **0.5s for UI elements?** → `var(--duration-moderate)` (400ms)
- **1s+ for pulses/glows?** → `var(--duration-ambient)` (2000ms)

### Step 2: Judgment Calls

For animations between standard values, use this decision tree:

```
Is it a micro-interaction (toggle, checkbox)?
  → --duration-instant (100ms)

Is it a hover or focus state?
  → --duration-fast (200ms)

Is it a standard UI transition (card, button)?
  → --duration-base (300ms)

Is it a panel or modal?
  → --duration-moderate (400ms)

Is it a hero animation or scroll reveal?
  → --duration-slow (600ms)

Is it a page transition?
  → --duration-dramatic (800ms)

Is it a decorative loop?
  → --duration-ambient (2000ms)
```

---

## Phase 2: Easing Curve Migration

### Standard Easing Functions

Replace these **only when context is clear**:

| Find          | Replace With           | When            |
| ------------- | ---------------------- | --------------- |
| `ease`        | `var(--ease-standard)` | General purpose |
| `ease-out`    | `var(--ease-out)`      | Exits, fades    |
| `ease-in-out` | `var(--ease-in-out)`   | Loops, pulses   |

### Custom Bezier Curves

| Find                                   | Replace With             | Personality              |
| -------------------------------------- | ------------------------ | ------------------------ |
| `cubic-bezier(0.4, 0, 0.2, 1)`         | `var(--ease-smooth)`     | Material Design standard |
| `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | `var(--ease-decelerate)` | Slow finish, elegant     |
| `cubic-bezier(0.16, 1, 0.3, 1)`        | `var(--ease-spring)`     | Bouncy, playful          |
| `cubic-bezier(0.05, 0.8, 0.15, 1)`     | `var(--ease-elegant)`    | Dramatic, cinematic      |

### Easing Selection Guide

**If animation is:**

- **Entering the viewport** → `var(--ease-decelerate)` or `var(--ease-spring)`
- **Exiting the viewport** → `var(--ease-out)` or `var(--ease-smooth)`
- **Looping infinitely** → `var(--ease-in-out)`
- **Playful/fun** → `var(--ease-spring)`
- **Serious/elegant** → `var(--ease-smooth)` or `var(--ease-decelerate)`

---

## Phase 3: File-by-File Migration

### Priority Order

1. **`components/welcome/welcome.module.css`** (hero animations, dramatic entrances)
2. **`app/(main)/home/page.module.css`** (most animation usage)
3. **`components/Hero/Hero.module.css`** (hero sections)
4. **`components/VintageGauge/VintageGauge.module.css`** (almanac animations)
5. All other component CSS files

### Migration Checklist Per File

For each file:

1. [ ] Search for all `transition:` declarations
2. [ ] Search for all `animation:` declarations
3. [ ] Replace duration values with tokens (use table above)
4. [ ] Replace easing functions with tokens (use guide above)
5. [ ] Test animations in browser dev tools
6. [ ] Verify no visual regression (should feel the same or better)
7. [ ] Check reduced motion still works

---

## Phase 4: Legacy Token Replacement

These tokens should be **replaced only in non-navigation code**:

| Legacy                       | Modern                                        | Notes                      |
| ---------------------------- | --------------------------------------------- | -------------------------- |
| `var(--nav-duration-open)`   | `var(--duration-moderate)`                    | Only outside navigation    |
| `var(--nav-duration-hover)`  | `var(--duration-base)`                        | Only outside navigation    |
| `var(--nav-ease-spring)`     | `var(--ease-spring)`                          | Safe to replace everywhere |
| `var(--nav-ease-out)`        | `var(--ease-smooth)`                          | Safe to replace everywhere |
| `var(--transition-card)`     | `var(--duration-moderate) var(--ease-smooth)` | Safe everywhere            |
| `var(--transition-standard)` | `var(--duration-moderate) var(--ease-smooth)` | Safe everywhere            |
| `var(--transition-dramatic)` | `var(--duration-slow) var(--ease-decelerate)` | Safe everywhere            |

**DO NOT** replace these in:

- `components/Header/` (navigation uses nav-specific tokens)
- Any file with "nav" or "menu" in the name

---

## Examples

### Before & After: Button Hover

**Before:**

```css
.button {
  transition: all 0.25s ease;
}
```

**After:**

```css
.button {
  transition: all var(--duration-fast) var(--ease-standard);
}
```

---

### Before & After: Hero Animation

**Before:**

```css
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

.hero {
  animation: heroReveal 0.8s cubic-bezier(0.05, 0.8, 0.15, 1) forwards;
}
```

**After:**

```css
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

.hero {
  animation: heroReveal var(--duration-dramatic) var(--ease-elegant) forwards;
}
```

---

### Before & After: Card Transition

**Before:**

```css
.card {
  transition:
    transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    box-shadow 0.3s ease;
}
```

**After:**

```css
.card {
  transition:
    transform var(--duration-moderate) var(--ease-decelerate),
    box-shadow var(--duration-base) var(--ease-standard);
}
```

---

### Before & After: Decorative Pulse

**Before:**

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.glow {
  animation: pulse 3s ease-in-out infinite;
}
```

**After:**

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.glow {
  animation: pulse var(--duration-ambient) var(--ease-in-out) infinite;
}
```

---

## Testing Protocol

After migration:

### Visual Testing

1. Open the site in Chrome Dev Tools
2. Test these pages:
   - `/` (welcome screen)
   - `/home` (hero animations, scroll reveals)
   - `/events` (card hovers)
   - `/almanac` (gauge animations)
3. Verify animations feel smooth and intentional (not robotic)
4. Check mobile performance (no jank)

### Accessibility Testing

1. Open Chrome Dev Tools → Rendering → Emulate CSS media feature
2. Enable `prefers-reduced-motion: reduce`
3. Verify all animations complete near-instantly (1ms)
4. Check that page is still functional without motion

### Performance Testing

1. Open Chrome Dev Tools → Performance tab
2. Record page load and scroll
3. Verify 60fps during animations (green bars, no red)
4. Check for layout thrashing (avoid simultaneous width + opacity animations)

---

## Common Pitfalls

### Don't Do This

```css
/* ❌ Mixing tokens with hardcoded values */
transition:
  opacity var(--duration-base),
  transform 0.5s;

/* ❌ Using duration token without easing */
transition: transform var(--duration-moderate);

/* ❌ Using slow durations for UI elements */
.button {
  transition: background var(--duration-dramatic);
}
```

### Do This Instead

```css
/* ✅ Consistent token usage */
transition:
  opacity var(--duration-base) var(--ease-out),
  transform var(--duration-moderate) var(--ease-decelerate);

/* ✅ Always specify easing */
transition: transform var(--duration-moderate) var(--ease-smooth);

/* ✅ Match duration to interaction speed */
.button {
  transition: background var(--duration-fast) var(--ease-standard);
}
```

---

## Edge Cases

### Stagger Delays

Keep stagger delays as-is for now (don't tokenize):

```css
/* ✅ OK to keep hardcoded delays */
.stagger-1 {
  animation-delay: 0.1s;
}
.stagger-2 {
  animation-delay: 0.2s;
}
.stagger-3 {
  animation-delay: 0.3s;
}
```

**Rationale:** Stagger delays are often computed or sequential. Tokenizing would make them harder to maintain.

### One-Off Timings

If an animation truly needs a unique duration (e.g., 280ms for nav close), keep it:

```css
/* ✅ OK for special cases */
.nav-drawer-close {
  animation: slideOut 280ms var(--ease-smooth);
}
```

**Rationale:** Not every animation needs to be tokenized. Use tokens for **recurring patterns**, not one-offs.

---

## Completion Checklist

- [ ] All CSS files audited for hardcoded durations
- [ ] All CSS files audited for hardcoded easing functions
- [ ] Legacy composite tokens (`--transition-*`) replaced
- [ ] Visual regression testing complete
- [ ] Accessibility testing complete (reduced motion)
- [ ] Performance testing complete (60fps verified)
- [ ] Documentation updated (if patterns change)

---

**Questions?** Refer to `docs/MOTION-SYSTEM.md` for full system documentation.

**Motion Motto:** _"Motion with purpose, timing with intention."_

---

_Last updated: January 2026_
_Designer: Carlos "Smooth" Rivera, PhD - Motion Design Lead_
