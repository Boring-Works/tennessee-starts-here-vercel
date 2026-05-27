# Squad A Task Assignments - Phase 1

**Mission:** Ship VisitorStatusCard + Governor Content by February 2, 2026
**Squad Lead:** Dr. Victoria Chen (COO)
**Quality Gate:** Malcolm (Quality Officer)

---

## Your Assignments

### Dr. Yuki Tanaka (React/TypeScript Specialist)

**Task:** VisitorStatusCard Integration
**Priority:** P0 - Start Immediately
**Estimated Time:** 2-3 hours

#### What to Do

1. Open `/app/(almanac)/almanac/page.tsx`
2. Add import at top:
   ```typescript
   import { VisitorStatusCard } from '@/components/almanac'
   ```
3. Find the mobile layout section (around line 413) after `</QuickActions>` comment
4. Insert the component:
   ```typescript
   {/* Visitor Status Card */}
   <VisitorStatusCard
     temperature={weather.current.temperature}
     weatherCode={weather.current.weatherCode}
     hasAlerts={hasActiveAlert}
     windSpeed={weather.current.windSpeed}
     precipitation={weather.current.precipitation}
   />
   ```
5. Find appropriate position in desktop grid layout (after row 1)
6. Run `npm run lint` and `npm run build`

#### Success Looks Like

- Component appears on both mobile and desktop
- Colors change based on conditions (green/yellow/red)
- No TypeScript errors
- No console errors in browser

---

### Dr. Omar Hassan (Data Architecture Specialist)

**Task:** Props/Data Flow Verification
**Priority:** P1 - Start after Yuki begins
**Estimated Time:** 1-2 hours

#### What to Do

1. Open `/lib/almanac/visitorRecommendation.ts`
2. Trace how `getVisitorRecommendation()` works
3. Verify these props flow correctly from page.tsx:
   - `temperature` - from `weather.current.temperature`
   - `weatherCode` - from `weather.current.weatherCode`
   - `hasAlerts` - from `hasActiveAlert` state
   - `windSpeed` - optional, from `weather.current.windSpeed`
   - `precipitation` - optional, from `weather.current.precipitation`
4. Test edge cases:
   - What happens if `windSpeed` is undefined?
   - What happens if temperature is -40 or 120?
   - What if weatherCode is unknown?
5. Document findings in code comments

#### Success Looks Like

- All props correctly typed
- Edge cases handled gracefully
- No TypeScript errors
- Brief documentation added

---

### Dr. Lily Chen (Content Systems Specialist)

**Task:** Governor Content Integration
**Priority:** P0 - Start Immediately (parallel with Yuki)
**Estimated Time:** 2-3 hours

#### What to Do

**Part A: Fix ESLint Warnings**

1. Open `/lib/almanac/governorContent.ts`
2. Fix these warnings:
   - Line 67: Delete `const hasConcerningWind = wind > 20` (unused)
   - Line 106: Change `verdict` to `_verdict` (or use it)
   - Line 110: Delete or use `const wind`
   - Line 177: Delete `const hasLightRain` (unused)
   - Line 210: Delete or use `const wind`
   - Line 259: Delete `const nextHour` (unused)
3. Run `npm run lint` - should show 0 warnings

**Part B: Integrate TL;DR**

1. Open `/components/almanac/GovernorsBriefing.tsx`
2. Add prop for TL;DR:
   ```typescript
   interface GovernorsBriefingProps {
     briefing: string
     tldr?: string // Add this
   }
   ```
3. Display TL;DR above briefing text

**Part C: Create Planning Intelligence Display**

1. Create simple component or add to Governor view
2. Use `generatePlanningIntelligence()` function
3. Display icon + line1 + line2 format

**Part D: Add to Governor View**

1. Open `/app/(almanac)/almanac/page.tsx`
2. Find Governor view section (around line 772)
3. Add TL;DR to GovernorsBriefing props
4. Add Planning Intelligence below brass instruments

#### Success Looks Like

- 0 ESLint warnings in governorContent.ts
- TL;DR appears above Governor's Briefing
- Planning Intelligence shows icon + 2 lines
- Heritage tone preserved
- All builds pass

---

### Dr. Marcus Johnson (Responsive Design Specialist)

**Task:** Responsive Verification
**Priority:** P1 - Start after Yuki and Lily complete
**Estimated Time:** 2-3 hours

#### What to Do

1. Open browser DevTools (Chrome preferred)
2. Test at each breakpoint:
   - **375px** (iPhone SE): Check text fits, no overflow
   - **414px** (iPhone Plus): Similar checks
   - **768px** (iPad): Verify grid layout switches
   - **1024px** (iPad Pro): Check spacing
   - **1440px** (Desktop): Full layout verification
   - **1920px** (Large): Ensure max-width contained
3. For each component (VisitorStatusCard, Planning Intelligence):
   - Check text doesn't truncate badly
   - Verify padding/margins look balanced
   - Confirm touch targets are 44x44px minimum
   - Test emoji display on all sizes
4. Check Framer Motion animations are smooth (60fps)

#### Success Looks Like

- Readable at all sizes
- No horizontal scrollbar
- Touch targets measurable at 44px+
- Animations smooth
- Screenshots captured for QA

---

### Dr. Zara Patel (Quality Assurance Lead)

**Task:** Full Phase 1 QA
**Priority:** P1 - Start after Marcus completes
**Estimated Time:** 4-6 hours

#### What to Do

**Automated Tests**

1. Run `npm run lint` - must pass with 0 warnings
2. Run `npm run build` - must complete successfully
3. Run any existing test suites

**Accessibility Testing**

1. Test with VoiceOver (Mac) or NVDA (Windows)
   - Can all content be read?
   - Are ARIA labels correct?
   - Is navigation logical?
2. Keyboard navigation
   - Tab through entire page
   - Can you reach all interactive elements?
   - Is focus visible?
3. Color contrast
   - Use WAVE or axe DevTools
   - All text must meet WCAG AA (4.5:1)

**Cross-Browser Testing**

- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)

**Weather Scenario Testing**
Test each recommendation level:

1. **Excellent** (70F, clear, no wind)
2. **Good** (65F, partly cloudy, light wind)
3. **Fair** (50F, overcast, moderate wind)
4. **Poor** (35F, rain, windy)
5. **Hazardous** (Thunderstorms or extreme temp)
6. **Edge cases** (alerts active, missing data)

**Governor View Testing**

- TL;DR displays correctly
- Planning Intelligence shows all 4 icon states
- Heritage tone maintained

#### Success Looks Like

- All automated tests pass
- All accessibility tests pass
- All browsers work correctly
- All weather scenarios produce correct output
- QA checklist signed off
- Ready for Malcolm's final review

---

## Communication

**Slack Channel:** #tennessee-almanac-phase1
**Daily Standup:** 9am ET (async updates OK)
**Blockers:** Post immediately, don't wait

## Escalation

**Technical Issues:** Dr. Victoria Chen
**Quality Concerns:** Malcolm
**Scope Questions:** Refer to MASTER-EXECUTION-PLAN.md

---

## Quick Reference: File Locations

```
Main Files to Edit:
  app/(almanac)/almanac/page.tsx
  components/almanac/GovernorsBriefing.tsx
  lib/almanac/governorContent.ts

Already Built (Just Need Integration):
  components/almanac/VisitorStatusCard.tsx
  lib/almanac/visitorRecommendation.ts
  components/almanac/index.ts (already exported)

Documentation:
  VISITOR_STATUS_CARD_USAGE.md
  GOVERNOR-START-HERE.md
  docs/MASTER-EXECUTION-PLAN.md
```

---

## Timeline

| Day            | Tasks     | Goal                    |
| -------------- | --------- | ----------------------- |
| **Thu Jan 30** | 1.1 + 1.3 | Components integrated   |
| **Fri Jan 31** | 1.2 + 1.4 | Verified and responsive |
| **Sat Feb 1**  | 1.5       | Full QA complete        |
| **Sun Feb 2**  | Deploy    | Live in production      |

---

**Let's ship this!**

_Squad A Assignments prepared by Dr. Victoria Chen_
_Last Updated: January 30, 2026_
