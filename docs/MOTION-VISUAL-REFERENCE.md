# Motion System - Visual Reference

> Visual representation of duration scales and easing curve personalities

---

## Duration Scale (Relative Timing)

```
┌─────────────────────────────────────────────────────────────────┐
│                     DURATION TIMELINE                            │
└─────────────────────────────────────────────────────────────────┘

instant    fast      base        moderate      slow          dramatic        ambient
  ●          ●         ●             ●            ●               ●               ●
100ms     200ms     300ms        400ms        600ms          800ms           2000ms
  │         │         │             │            │               │               │
  └──┬──────┴───┬─────┴──────┬──────┴─────┬──────┴────────┬──────┴────────────────┴─────
     │          │             │            │               │
   Toggle    Hover       Standard      Modal/          Hero          Page             Loop
   Button    Focus         Card        Panel        Animation     Transition        Pulse
   Ripple    Ring        Transition    Open          Reveal      Full-screen      Ambient

     ▼          ▼             ▼            ▼               ▼               ▼               ▼

   Blink     Quick        Standard      Smooth        Flowing       Dramatic        Endless
   Fast     Response     Transition     Motion      Storytelling    Impact          Breath
```

---

## Duration Personality Chart

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        SPEED vs PURPOSE                                       │
└──────────────────────────────────────────────────────────────────────────────┘

    INSTANT (100ms)
    ████
    "Immediate feedback"
    → Toggles, checkboxes, ripples

    FAST (200ms)
    ████████
    "Quick response"
    → Hovers, focus states, tooltips

    BASE (300ms)
    ████████████
    "Standard transition"
    → Cards, buttons, tabs, dropdowns

    MODERATE (400ms)
    ████████████████
    "Smooth motion"
    → Modals, panels, accordions

    SLOW (600ms)
    ████████████████████████
    "Flowing animation"
    → Hero sections, scroll reveals, image zooms

    DRAMATIC (800ms)
    ████████████████████████████████
    "Cinematic impact"
    → Page transitions, elaborate entrances

    AMBIENT (2000ms)
    ████████████████████████████████████████████████████████████████████████████
    "Endless loop"
    → Glows, pulses, breathing animations

```

---

## Easing Curve Personalities

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     EASING CURVE VISUALIZATION                                │
└──────────────────────────────────────────────────────────────────────────────┘


EASE-STANDARD (ease)
Balanced, familiar
━━━━━━━━━━━━━━━━━━━━━━
    ╱╱╱╱╱╱
   ╱
  ╱
 ╱
Start: Gradual    End: Gradual
Use: General purpose, when unsure


EASE-OUT (ease-out)
Fast start, slow finish
━━━━━━━━━━━━━━━━━━━━━━
  ╱╱╱╱╱╱╱╱
 ╱         ╱╱╱╱
╱
Start: Fast       End: Decelerate
Use: Exits, fades, closing actions


EASE-IN-OUT (ease-in-out)
Symmetrical motion
━━━━━━━━━━━━━━━━━━━━━━
     ╱╱╱╱╱╱
   ╱        ╲
  ╱          ╲
 ╱            ╲
Start: Gradual    End: Gradual
Use: Loops, pulses, bidirectional


EASE-SMOOTH (Material)
Polished, refined
━━━━━━━━━━━━━━━━━━━━━━
   ╱╱╱╱╱╱╱
  ╱       ╱╱
 ╱
╱
Start: Quick      End: Smooth
Use: Cards, buttons, modals


EASE-DECELERATE (Slow finish)
Elegant, graceful
━━━━━━━━━━━━━━━━━━━━━━
  ╱╱╱╱╱
 ╱     ╱╱╱╱╱╱╱╱╱╱
╱
Start: Moderate   End: Very Slow
Use: Entrances, reveals, hero animations


EASE-SPRING (Bouncy)
Playful, lively
━━━━━━━━━━━━━━━━━━━━━━
   ╱╱╱╱╱╱╱
  ╱       ╱⎺╲
 ╱          ╲
╱
Start: Quick      End: Overshoot + settle
Use: Navigation, drawers, fun interactions


EASE-ELEGANT (Dramatic)
Cinematic, powerful
━━━━━━━━━━━━━━━━━━━━━━
  ╱╱╱
 ╱   ╱╱╱╱╱╱╱╱╱╱╱╱╱
╱
Start: Very Slow  End: Very Slow
Use: Hero sections, page loads, storytelling

```

---

## Comparative Speed Chart

```
┌──────────────────────────────────────────────────────────────────────────────┐
│            HOW FAST IS EACH DURATION? (Visual Scale)                          │
└──────────────────────────────────────────────────────────────────────────────┘

INSTANT (100ms)
▓
Blink and you miss it


FAST (200ms)
▓▓
Quick snap


BASE (300ms)
▓▓▓
Standard UI feel


MODERATE (400ms)
▓▓▓▓
Smooth and comfortable


SLOW (600ms)
▓▓▓▓▓▓
Noticeable motion


DRAMATIC (800ms)
▓▓▓▓▓▓▓▓
"This is intentional"


AMBIENT (2000ms)
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
Slow breathing loop

```

---

## Decision Matrix

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                 INTERACTION TYPE → DURATION + EASING                          │
└──────────────────────────────────────────────────────────────────────────────┘

╔═══════════════════════════╦════════════════════╦═══════════════════════════╗
║  INTERACTION TYPE         ║  DURATION TOKEN    ║  EASING TOKEN             ║
╠═══════════════════════════╬════════════════════╬═══════════════════════════╣
║  Toggle switch            ║  instant (100ms)   ║  standard                 ║
║  Checkbox check           ║  instant (100ms)   ║  standard                 ║
║  Ripple effect            ║  instant (100ms)   ║  out                      ║
╠═══════════════════════════╬════════════════════╬═══════════════════════════╣
║  Button hover             ║  fast (200ms)      ║  smooth                   ║
║  Focus ring               ║  fast (200ms)      ║  smooth                   ║
║  Tooltip reveal           ║  fast (200ms)      ║  out                      ║
╠═══════════════════════════╬════════════════════╬═══════════════════════════╣
║  Card hover               ║  base (300ms)      ║  spring                   ║
║  Button click             ║  base (300ms)      ║  smooth                   ║
║  Tab switch               ║  base (300ms)      ║  smooth                   ║
║  Dropdown open            ║  base (300ms)      ║  decelerate               ║
╠═══════════════════════════╬════════════════════╬═══════════════════════════╣
║  Modal entrance           ║  moderate (400ms)  ║  decelerate               ║
║  Panel slide              ║  moderate (400ms)  ║  spring                   ║
║  Accordion expand         ║  moderate (400ms)  ║  smooth                   ║
║  Drawer open              ║  moderate (400ms)  ║  spring                   ║
╠═══════════════════════════╬════════════════════╬═══════════════════════════╣
║  Hero fade-in             ║  slow (600ms)      ║  elegant                  ║
║  Scroll reveal            ║  slow (600ms)      ║  decelerate               ║
║  Image zoom               ║  slow (600ms)      ║  smooth                   ║
║  Section entrance         ║  slow (600ms)      ║  decelerate               ║
╠═══════════════════════════╬════════════════════╬═══════════════════════════╣
║  Page transition          ║  dramatic (800ms)  ║  elegant                  ║
║  Hero entrance            ║  dramatic (800ms)  ║  elegant                  ║
║  Full-screen modal        ║  dramatic (800ms)  ║  decelerate               ║
╠═══════════════════════════╬════════════════════╬═══════════════════════════╣
║  Decorative pulse         ║  ambient (2000ms)  ║  in-out                   ║
║  Glow effect              ║  ambient (2000ms)  ║  in-out                   ║
║  Breathing animation      ║  ambient (2000ms)  ║  in-out                   ║
║  Shimmer loop             ║  ambient (2000ms)  ║  in-out                   ║
╚═══════════════════════════╩════════════════════╩═══════════════════════════╝
```

---

## Timing Feel Spectrum

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    PSYCHOLOGICAL PERCEPTION OF SPEED                          │
└──────────────────────────────────────────────────────────────────────────────┘

100ms ───► Instant feedback ("This is immediate")
           User doesn't consciously perceive delay
           Feels like direct manipulation

200ms ───► Responsive UI ("This is fast")
           User notices motion but it feels quick
           Standard for hover states

300ms ───► Comfortable transition ("This feels smooth")
           User clearly sees animation but doesn't wait
           Sweet spot for most UI transitions

400ms ───► Deliberate motion ("I see this moving")
           Animation has presence without feeling slow
           Good for panels and modals

600ms ───► Storytelling speed ("Watch this happen")
           User actively watches the animation
           Creates anticipation and elegance

800ms ───► Cinematic impact ("This is dramatic")
           Draws significant attention
           Reserved for hero moments

2000ms ──► Ambient loop ("This is decoration")
           Slow enough not to demand attention
           Background breathing animation

```

---

## Easing Comparison (Same Duration)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│         ALL CURVES AT 400ms - SEE THE PERSONALITY DIFFERENCE                  │
└──────────────────────────────────────────────────────────────────────────────┘

STANDARD (ease)
0%                                                                          100%
●────────────────────────────────────────────────────────────────────────────●
      ╱╱╱╱╱╱╱╱╱╱╱╱╱
Feeling: Balanced, familiar, predictable


OUT (ease-out)
0%                                                                          100%
●────────────────────────────────────────────────────────────────────────────●
  ╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱
Feeling: Energetic start, gentle landing


IN-OUT (ease-in-out)
0%                                                                          100%
●────────────────────────────────────────────────────────────────────────────●
            ╱╱╱╱╱╱╱╱╱╱
Feeling: Symmetrical, rhythmic, looping


SMOOTH (Material)
0%                                                                          100%
●────────────────────────────────────────────────────────────────────────────●
    ╱╱╱╱╱╱╱╱╱╱╱╱╱╱
Feeling: Polished, refined, modern


DECELERATE (Slow finish)
0%                                                                          100%
●────────────────────────────────────────────────────────────────────────────●
  ╱╱╱╱╱╱╱╱          ╱╱╱╱╱╱╱╱╱
Feeling: Elegant, graceful, museum-quality


SPRING (Bouncy)
0%                                                                          100%
●────────────────────────────────────────────────────────────────────────────●
    ╱╱╱╱╱╱╱╱╱╱⎺⎺╲╱
Feeling: Playful, lively, fun


ELEGANT (Dramatic)
0%                                                                          100%
●────────────────────────────────────────────────────────────────────────────●
  ╱╱╱              ╱╱╱╱╱╱╱╱╱╱╱╱╱
Feeling: Cinematic, powerful, attention-grabbing

```

---

## Quick Selection Guide

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     "I NEED TO ANIMATE..."                                    │
└──────────────────────────────────────────────────────────────────────────────┘

▶ Something that gives instant feedback
  → instant + standard

▶ A hover state
  → fast + smooth

▶ A button or card
  → base + smooth

▶ A modal or panel
  → moderate + decelerate

▶ A hero section
  → dramatic + elegant

▶ A scroll reveal
  → slow + decelerate

▶ A decorative pulse
  → ambient + in-out

▶ Something playful
  → [appropriate duration] + spring

▶ Something serious/elegant
  → [appropriate duration] + decelerate

```

---

## Pro Tips

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        MOTION DESIGN WISDOM                                   │
└──────────────────────────────────────────────────────────────────────────────┘

✓ Faster is usually better than slower (users hate waiting)

✓ Use spring sparingly (playful but can feel unprofessional)

✓ Match easing to intent (entering? decelerate. exiting? out)

✓ Test on slowest device (animations compound on low-end hardware)

✓ Respect reduced motion (all tokens auto-adjust)

✓ One duration per interaction (don't stack different speeds)

✓ Start with base + smooth if unsure (safe default)

✓ Dramatic durations need dramatic easing (don't waste time with linear)

✓ Ambient loops should be slow enough to ignore (don't distract)

✓ Multiple simultaneous animations? Keep them synchronized (same duration)

```

---

**Motion Motto:** _"Motion with purpose, timing with intention."_

---

_Visual reference guide for Tennessee Starts Here motion system_
_Designer: Carlos "Smooth" Rivera, PhD - Motion Design Lead_
_Last updated: January 2026_
