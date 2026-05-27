# Home Page Redesign: Progressive Revelation

**Date:** 2026-01-28
**Status:** Approved for Implementation
**Brand Strategy Version:** 5.1

---

## Objective

Transform the text-heavy home page hero into a scroll-based progressive revelation experience that:

1. Reduces cognitive overload (one idea per scroll)
2. Preserves all existing copy (nothing deleted)
3. Improves mobile experience (smaller chunks)
4. Aligns with Brand Strategy v5.1

---

## Design Principles

| Principle                  | Implementation                                                                  |
| -------------------------- | ------------------------------------------------------------------------------- |
| **Subtle pacing**          | Content fades/slides in on scroll, still feels like a website (not a tech demo) |
| **One idea per scroll**    | Each section delivers a single message                                          |
| **Practical users first**  | Teachers, families, festival-goers need info fast                               |
| **History buffs rewarded** | Deeper content available through scroll                                         |

---

## Section Flow

### SECTION 1: Hero (Above the Fold)

**Minimal content:**

```
🇺🇸 America 250 Official Commemorative Partner

Tennessee 230 · America 250

ROCKY MOUNT
Where Tennessee's government began.

[ Plan Your Visit ]

↓ Scroll to explore
```

**Removed from hero (moved to sections below):**

- 3-line timeline (1770, 1780, 1790)
- Contrast line
- Bridge text
- Location + driving time
- Social proof (TripAdvisor, 50k visitors)
- Secondary CTA

**Technical:** Full viewport height, dark background, SmartCommemorativeCard on right, scroll indicator animation.

---

### SECTION 2: Mystery Hook

**Content:**

```
Before there was a Tennessee,
there was this ground.
```

**Treatment:**

- Full-width section
- Large serif text, centered
- Fade-in on scroll (Intersection Observer)
- Dark background continues

---

### SECTION 3: The Experiment (NEW)

**Content:**

```
THE BOLD EXPERIMENT

In 1790, a question hung over the young republic:
Could American democracy survive beyond the Appalachians?

Rocky Mount provided the answer.
```

**Treatment:**

- Intellectual hook for history buffs
- Smaller text, centered
- Subtle fade-in

---

### SECTION 4: Timeline (Scroll-Triggered)

**Content (three beats):**

```
1770
The Cobbs settled this ground.

1780
They armed the Revolution.

1790
Governor Blount made it the seat of federal power.
```

**Treatment:**

- Each year sticky-positioned, reveals on scroll
- Large year numbers (semi-transparent background)
- Vertical timeline line connecting them
- CSS `position: sticky` with scroll transforms

---

### SECTION 5: Contrast Statement

**Content:**

```
This is not where they gathered.
This is not where they farmed.
This is where they governed.
```

**Treatment:**

- Full-width dark section
- Text appears line by line on scroll
- Gold accent on "governed"
- This is the differentiator — give it room

---

### SECTION 6: The Proof (Authority Section)

**Header:** "Who Walked This Ground"

**Three columns:**

| William Blount               | Andrew Jackson      | The Cobb Family           |
| ---------------------------- | ------------------- | ------------------------- |
| Constitution Signer          | Future President    | Three Generations         |
| Governor 1790-92             | Lodged here 1788    | Settled ~1770             |
| "Commissioned by Washington" | "Six weeks, age 21" | "Supplied the Revolution" |

**Enhanced Blount framing:**

> "A man who helped create the Constitution would now implement it on the frontier."

**Closing line:**

> "Governor Blount governed here. Andrew Jackson lodged here. The State started here."

**Treatment:**

- Light parchment background (visual break)
- Portrait frames or wax-seal icons
- Subtle entrance animation

---

### SECTION 7: The Distinction (NEW)

**Content:**

```
THE RECORD IS CLEAR

Rocky Mount: First territorial capital (1790-1792)
Knoxville: Second territorial, then first state capital (1792-1817)

Tennessee became the 16th state in 1796.
The foundation was laid here.
```

**Treatment:**

- Clarifies the "first capital" confusion
- Clean, factual presentation
- Small text, centered

---

### SECTION 8: Ground Statement

**Content:**

```
The buildings evolved.
The ground endures.
```

**Treatment:**

- Full-width
- Ground-level photography background (boots on soil, low angle)
- Text overlaid
- The "Gettysburg Principle" made visual

---

### SECTION 9: Blount Letter (Existing)

**Keep existing BlountLetter component** with full attribution:

> "I am very well accommodated with a room with glass windows, fireplace, &c., at this place."
> — William Blount, letter from Rocky Mount, 20 October 1790

---

### SECTION 10: Experience Preview (Existing)

**Keep existing ExperiencePreview component** — now has context from the narrative.

---

### SECTION 11: Plan Your Visit (NEW)

**Consolidated practical info:**

```
PLAN YOUR VISIT

📍 Piney Flats, TN — 15 min from Johnson City
🕐 Tue-Sat 10am-5pm | Sun 1pm-5pm
🎟️ Adults $12 | Seniors $10 | Children $8

★★★★★ TripAdvisor — "Tennessee's Hidden Gem"
50,000+ visitors annually

[ Book Your Tour ]  [ Get Directions ]
```

**Treatment:**

- Clean, scannable
- Icons for quick parsing
- Two CTAs

---

### SECTION 12: 2026 Campaign (Scarcity)

**Content:**

```
2026: THE COMMEMORATIVE YEAR

Tennessee turns 230. America turns 250.

First federal capital beyond the original thirteen states.
The proving ground for territorial governance.
The bridge between democratic ideals and westward expansion.

Be one of the First 250.

[ Join the First 250 — Enrollment closes June 1 ]
```

**Treatment:**

- Dark section (urgency)
- Countdown badges
- Links to /first-250

---

### SECTION 13: Indigenous Acknowledgment (NEW)

**Content:**

```
We acknowledge with respect that this valley was—and remains—
ancestral homeland to the Cherokee and other Indigenous peoples,
whose stewardship and stories continue today.
```

**Treatment:**

- Subtle placement (before or after existing sections, or in footer)
- Smaller text, respectful tone

---

### REMAINING SECTIONS (Existing)

Keep in order:

- Events Showcase
- Ledger Section
- Story Section
- Homecoming Section
- Final CTA

---

## Component Architecture

### New Components

| Component                      | Purpose                             | Location           |
| ------------------------------ | ----------------------------------- | ------------------ |
| `MysteryHook.tsx`              | Hook line with scroll animation     | `components/home/` |
| `ExperimentSection.tsx`        | "Bold experiment" intellectual hook | `components/home/` |
| `ScrollTimeline.tsx`           | 1770/1780/1790 sticky reveals       | `components/home/` |
| `ContrastStatement.tsx`        | Differentiator section              | `components/home/` |
| `ProofSection.tsx`             | Blount/Jackson/Cobbs cards          | `components/home/` |
| `DistinctionSection.tsx`       | Territorial vs State clarification  | `components/home/` |
| `GroundStatement.tsx`          | "Buildings evolved" with visual     | `components/home/` |
| `PlanYourVisit.tsx`            | Practical info consolidated         | `components/home/` |
| `CampaignSection.tsx`          | First 250 scarcity block            | `components/home/` |
| `IndigenousAcknowledgment.tsx` | Cherokee homeland statement         | `components/home/` |

### Modified Components

| Component                  | Changes                                                      |
| -------------------------- | ------------------------------------------------------------ |
| `HeroSection.tsx`          | Simplified — remove timeline, contrast, bridge, social proof |
| `app/(main)/home/page.tsx` | Reorder sections, add new components                         |

### Unchanged Components

- `SmartCommemorativeCard.tsx`
- `BlountLetter.tsx`
- `ExperiencePreview.tsx`
- `EventsShowcase.tsx`
- `LedgerSection.tsx`
- `StorySection.tsx`
- `HomecomingSection.tsx`
- `FinalCTA.tsx`

---

## Technical Implementation

### Scroll Animations

| Element               | Implementation                                         |
| --------------------- | ------------------------------------------------------ |
| Fade-in sections      | CSS `@keyframes` + Intersection Observer               |
| Sticky timeline years | `position: sticky` with CSS scroll-linked transforms   |
| Line-by-line text     | Intersection Observer with staggered delays            |
| Parallax effects      | CSS `transform: translateY()` based on scroll position |

**No external libraries required.** All achievable with:

- Native Intersection Observer API
- CSS `position: sticky`
- CSS `@keyframes` animations
- Optional: CSS Scroll-Linked Animations (progressive enhancement)

### Intersection Observer Pattern

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
```

### CSS Animation Classes

```css
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

.stagger-1 {
  transition-delay: 0.1s;
}
.stagger-2 {
  transition-delay: 0.2s;
}
.stagger-3 {
  transition-delay: 0.3s;
}
```

---

## Implementation Order

### Phase 1: Foundation (No Visual Changes)

1. Create `useScrollReveal` hook
2. Add CSS animation classes to globals.css
3. Create empty component shells

### Phase 2: Hero Simplification

1. Extract timeline content from HeroSection
2. Extract social proof from HeroSection
3. Add scroll indicator to HeroSection
4. Test simplified hero

### Phase 3: New Sections (Top to Bottom)

1. `MysteryHook.tsx`
2. `ExperimentSection.tsx`
3. `ScrollTimeline.tsx`
4. `ContrastStatement.tsx`
5. `ProofSection.tsx`
6. `DistinctionSection.tsx`
7. `GroundStatement.tsx`

### Phase 4: Practical Sections

1. `PlanYourVisit.tsx`
2. `CampaignSection.tsx`
3. `IndigenousAcknowledgment.tsx`

### Phase 5: Page Assembly

1. Update `app/(main)/home/page.tsx` with new section order
2. Test full scroll flow
3. Mobile responsive testing

### Phase 6: Polish

1. Fine-tune animation timing
2. Add scroll indicator behavior
3. Performance optimization (lazy loading images)

---

## Verification Checklist

- [ ] All copy preserved (nothing deleted)
- [ ] Mobile responsive (each section fits viewport)
- [ ] Scroll animations perform smoothly (60fps)
- [ ] Practical info accessible without excessive scrolling
- [ ] Brand Strategy v5.1 aligned (no claims to avoid)
- [ ] Indigenous acknowledgment included
- [ ] America 250 positioning phrases used
- [ ] Build passes (`npm run build`)
- [ ] Lighthouse performance score > 90

---

## Rollback Strategy

Each section is independently revertable:

1. New sections — delete component files
2. Hero simplification — git revert HeroSection.tsx
3. Page assembly — git revert page.tsx

No database changes. No breaking API changes.

---

## References

- Brand Strategy v5.1: `docs/BRAND-STRATEGY.md`
- Old site content: `Build Files/OLD-SITE-AUDIT.md`
- Current hero: `components/HeroSection.tsx`
- Current page: `app/(main)/home/page.tsx`
