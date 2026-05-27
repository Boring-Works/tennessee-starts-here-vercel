# Claude Code Implementation Prompt

## The 1775 Almanac — Full Rebrand + Customer Enhancements

**Read this entire prompt before writing any code.**

---

## Project Context

You're rebranding the existing "Rocky Mount Almanac" as **"The 1775 Almanac"** — a weather and agricultural intelligence tool for Sullivan County, Tennessee.

**The critical rule: REBRAND, NOT REDUCE.**

Every existing feature must be preserved. This is a visual/branding update plus four new customer experience components.

---

## Pre-Implementation: Read These Files First

Before writing ANY code, read:

1. `/docs/1775-ALMANAC-BUILD-GUIDE.md` — Complete specification
2. `/docs/ALMANAC_LOGIC.md` — Technical documentation for existing code
3. `/app/almanac/page.tsx` — Current main page implementation
4. `/app/globals.css` — Global styles including almanac color variables
5. `/components/Navigation.tsx` — Navigation structure (almanac lives in main site nav)

---

## CSS Architecture Notes

**The almanac page lives within the main Rocky Mount website.** It shares:

- **Root layout:** `/app/layout.tsx` (includes Navigation, Footer, fonts)
- **Global styles:** `/app/globals.css` (color variables, fonts, utilities)
- **Almanac-specific:** `/app/almanac/almanac.css` (almanac color theme via @theme inline)

**Key CSS variables already defined:**
```css
--color-almanac-midnight: #0A1128;
--color-almanac-gold: #C5A059;
--color-almanac-parchment: #F4ECD8;
--color-almanac-success: #4A7C59;
--color-almanac-warning: #D4A84B;
--color-almanac-danger: #8B3A3A;
```

**Font variables from layout:**
```css
--font-serif: Playfair Display
--font-serif-elegant: Cormorant Garamond  
--font-script: Great Vibes
```

**Use Tailwind classes that reference these variables:**
- `bg-almanac-midnight`
- `text-almanac-gold`
- `text-almanac-parchment`
- `border-almanac-gold/20`

---

## Implementation Order

Follow this exact sequence to avoid breaking changes:

### Phase 1: Core Rebrand (Do First)

1. **Update `/app/almanac/layout.tsx`**
   - Change title to "The 1775 Almanac | Sullivan County Weather & Wisdom"
   - Update meta description
   - Update OpenGraph tags
   - Reference: Build Guide section "File-by-File Changes"

2. **Create `/components/almanac/AboutModal.tsx`**
   - "Our Story" modal with origin narrative
   - Reference: Build Guide section "New Components"

3. **Update `/app/almanac/page.tsx`**
   - Add masthead header with "The 1775 Almanac" title
   - Add "Est. 1775" badge
   - Import and place AboutModal
   - Update footer copy (including beta disclaimer)
   - **DO NOT remove any existing components**

### Phase 2: Saying System Upgrade

4. **Update `/lib/almanac/sayings.ts`**
   - Add `DualSaying` interface
   - Add `DUAL_SAYINGS` data structure
   - Add `getDualSaying()` function
   - **KEEP existing `FRONTIER_SAYINGS` and `getSaying()` for backward compatibility**

5. **Update `/components/almanac/FrontierSaying.tsx`**
   - Support dual-line format (1775 + 2026)
   - Add "The Daily Proverb" label
   - Add ShareButton integration
   - Maintain backward compatibility with single-line format

### Phase 3: Component Rebrands

6. **Update `/components/almanac/NativePulse.tsx`**
   - Change title to "The Seedkeeper's Watch"
   - Add heritage context text in footer
   - Keep all existing functionality

### Phase 4: Customer Experience Enhancements (New Components)

7. **Create `/components/almanac/StaleDataWarning.tsx`**
   - Shows after 15 minutes
   - Amber warning with "Refresh" button
   - Reference: Build Guide "Customer Experience Enhancements"

8. **Create `/components/almanac/OnboardingModal.tsx`**
   - First-visit only (localStorage check)
   - Explains workability scores
   - Reference: Build Guide "Customer Experience Enhancements"

9. **Create `/components/almanac/ShareButton.tsx`**
    - Copies formatted text to clipboard
    - Shows "Copied!" confirmation
    - Reference: Build Guide "Customer Experience Enhancements"

10. **Create `/components/almanac/TomorrowPreview.tsx`**
    - Tomorrow's high/low/precip
    - Simple outlook text
    - Reference: Build Guide "Customer Experience Enhancements"

### Phase 5: Integration

11. **Update `/app/almanac/page.tsx` again**
    - Import all new components
    - Add StaleDataWarning after LocationPicker
    - Add TomorrowPreview after FrontierSaying
    - Add OnboardingModal before closing `</main>`
    - Update FrontierSaying to use dual sayings
    - Pass temperature/location to ShareButton via FrontierSaying

---

## Critical Rules

### DO:
- ✅ Use existing Tailwind classes and CSS variables
- ✅ Match existing code patterns (motion animations, naming conventions)
- ✅ Keep all existing functionality working
- ✅ Test that LocationPicker still works
- ✅ Test that all workability scores display
- ✅ Use TypeScript types for all new interfaces
- ✅ Add `'use client'` directive to interactive components

### DO NOT:
- ❌ Remove any existing components
- ❌ Change the weather API integration
- ❌ Modify the task score calculation logic
- ❌ Add new npm dependencies (use existing: framer-motion, lucide-react)
- ❌ Create separate CSS files (use Tailwind + existing almanac.css)
- ❌ Change the LocationPicker behavior or default location

---

## Testing Checklist (Verify After Each Phase)

After each phase, confirm:

- [ ] Page loads without errors
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] LocationPicker opens and works
- [ ] All four workability scores display
- [ ] Weather data loads correctly
- [ ] Mobile layout not broken

---

## File Summary

### Files to MODIFY:
- `/app/almanac/layout.tsx` — Metadata
- `/app/almanac/page.tsx` — Masthead, footer, new component integration
- `/lib/almanac/sayings.ts` — Add dual sayings
- `/components/almanac/FrontierSaying.tsx` — Dual-line format
- `/components/almanac/NativePulse.tsx` — Rebrand to Seedkeeper's Watch

### Files to CREATE:
- `/components/almanac/AboutModal.tsx`
- `/components/almanac/StaleDataWarning.tsx`
- `/components/almanac/OnboardingModal.tsx`
- `/components/almanac/ShareButton.tsx`
- `/components/almanac/TomorrowPreview.tsx`

### Files to NOT TOUCH:
- `/app/almanac/almanac.css`
- `/app/globals.css`
- `/lib/almanac/taskScores.ts`
- `/lib/almanac/weather.ts`
- `/lib/almanac/geocoding.ts`
- `/lib/almanac/storage.ts`
- `/components/almanac/LocationPicker.tsx`
- `/components/almanac/TaskScores.tsx`
- `/components/almanac/AlmanacHero.tsx`
- `/components/almanac/WeatherDetails.tsx`
- `/components/almanac/MoonPhase.tsx`
- `/components/almanac/SoilTemperature.tsx`
- `/components/almanac/PrecipitationRadar.tsx`
- `/components/almanac/CurrentConditionsCard.tsx`
- `/components/almanac/SnowConditions.tsx`
- `/components/almanac/SunBarometer.tsx`
- `/components/almanac/WeatherAlertBanner.tsx`
- `/components/almanac/ScoreExplainer.tsx`

---

## Verification Commands

After implementation, run:

```bash
npm run build
npm run dev
```

Then manually verify:
1. Visit http://localhost:3000/almanac
2. Check that "The 1775 Almanac" header appears
3. Click "Our Story" — modal should open
4. Wait 15+ minutes — stale data warning should appear
5. Clear localStorage and reload — onboarding modal should appear
6. Check mobile layout (responsive)
7. Verify LocationPicker still works
8. Verify all scores display with correct colors

---

## Commit Strategy

Commit after each phase:

```bash
git add -A && git commit -m "Phase 1: Core rebrand - masthead, metadata, AboutModal"
git add -A && git commit -m "Phase 2: Dual saying system"
git add -A && git commit -m "Phase 3: NativePulse → Seedkeeper's Watch"
git add -A && git commit -m "Phase 4: Customer experience components"
git add -A && git commit -m "Phase 5: Final integration and testing"
```

---

## Success Criteria

The implementation is complete when:

1. ✅ "The 1775 Almanac" branding visible in header and browser tab
2. ✅ "Est. 1775" badge displays
3. ✅ "Our Story" modal works
4. ✅ Dual-line proverb format displays (1775 / 2026)
5. ✅ "The Seedkeeper's Watch" title on NativePulse
6. ✅ Share button copies text to clipboard
7. ✅ Tomorrow preview card shows
8. ✅ Stale data warning shows after 15 minutes
9. ✅ Onboarding modal shows on first visit
10. ✅ Beta disclaimer visible in footer
11. ✅ ALL existing features still work
12. ✅ Build passes with no errors
13. ✅ Mobile responsive layout intact

---

**Now read `/docs/1775-ALMANAC-BUILD-GUIDE.md` for the complete component specifications and copy.**
