# Motion System - Quick Reference

> **TL;DR:** Use duration + easing tokens for all animations. Faster for UI, slower for storytelling.

---

## Duration Tokens (7 speeds)

| Token                 | Value  | Use For                         |
| --------------------- | ------ | ------------------------------- |
| `--duration-instant`  | 100ms  | Toggles, checkboxes, ripples    |
| `--duration-fast`     | 200ms  | Hovers, focus states            |
| `--duration-base`     | 300ms  | Cards, buttons, tabs            |
| `--duration-moderate` | 400ms  | Modals, dropdowns, panels       |
| `--duration-slow`     | 600ms  | Hero animations, scroll reveals |
| `--duration-dramatic` | 800ms  | Page transitions                |
| `--duration-ambient`  | 2000ms | Decorative loops, pulses        |

**Rule of thumb:** Micro → Fast → Base → Moderate → Slow → Dramatic → Ambient

---

## Easing Tokens (7 curves)

| Token               | Curve           | Feel           | Best For            |
| ------------------- | --------------- | -------------- | ------------------- |
| `--ease-standard`   | `ease`          | Balanced       | General purpose     |
| `--ease-out`        | `ease-out`      | Decelerating   | Exits, fades        |
| `--ease-in-out`     | `ease-in-out`   | Symmetrical    | Loops, pulses       |
| `--ease-smooth`     | Material bezier | Polished       | Cards, modals       |
| `--ease-decelerate` | Custom bezier   | Elegant finish | Entrances, reveals  |
| `--ease-spring`     | Bouncy bezier   | Playful        | Navigation, drawers |
| `--ease-elegant`    | Dramatic bezier | Cinematic      | Hero sections       |

**Rule of thumb:** Entering? Use `decelerate` or `spring`. Exiting? Use `out` or `smooth`.

---

## Common Patterns

### Button Hover

```css
transition: background var(--duration-fast) var(--ease-smooth);
```

### Card Hover

```css
transition: transform var(--duration-base) var(--ease-spring);
```

### Modal Open

```css
animation: fadeIn var(--duration-moderate) var(--ease-decelerate);
```

### Hero Entrance

```css
animation: reveal var(--duration-dramatic) var(--ease-elegant);
```

### Decorative Pulse

```css
animation: pulse var(--duration-ambient) var(--ease-in-out) infinite;
```

---

## Decision Tree

```
What are you animating?

├─ Micro-interaction (toggle, checkbox)
│  → --duration-instant + --ease-standard
│
├─ Hover/focus state
│  → --duration-fast + --ease-smooth
│
├─ UI element (card, button, tab)
│  → --duration-base + --ease-smooth
│
├─ Panel/modal/dropdown
│  → --duration-moderate + --ease-decelerate
│
├─ Hero/reveal animation
│  → --duration-slow + --ease-elegant
│
├─ Page transition
│  → --duration-dramatic + --ease-elegant
│
└─ Decorative loop/pulse
   → --duration-ambient + --ease-in-out
```

---

## Don't Do This

```css
/* ❌ Hardcoded values */
transition: all 0.3s ease;

/* ❌ Duration without easing */
transition: transform var(--duration-base);

/* ❌ Wrong duration for interaction */
.button {
  transition: background var(--duration-dramatic);
}
```

## Do This Instead

```css
/* ✅ Semantic tokens */
transition: all var(--duration-base) var(--ease-smooth);

/* ✅ Always include easing */
transition: transform var(--duration-base) var(--ease-spring);

/* ✅ Match speed to interaction */
.button {
  transition: background var(--duration-fast) var(--ease-smooth);
}
```

---

## Accessibility

All tokens respect `prefers-reduced-motion` automatically. No extra code needed.

```css
/* This already works ✅ */
.element {
  transition: transform var(--duration-base) var(--ease-smooth);
}
```

Users with motion sensitivity will see animations complete in 1ms.

---

**Full docs:** `docs/MOTION-SYSTEM.md`
**Migration guide:** `docs/MOTION-MIGRATION-WORKERS.md`

**Motion Motto:** _"Motion with purpose, timing with intention."_
