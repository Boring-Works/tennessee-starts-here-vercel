# Master Execution Plan: Tennessee Starts Here Almanac Refinement

**Chief Operating Officer:** Dr. Victoria Chen, PhD
**Date:** January 30, 2026
**Version:** 1.0
**Status:** ACTIVE

---

## Executive Summary

This document outlines the coordinated execution plan for 30 agents across 4 phases of the Rocky Mount Almanac refinement project. The goal is to ship Phase 1 this week, with subsequent phases delivering over the following 4-6 weeks.

**Current State Assessment:**

- Previous 11-agent team completed significant preparatory work
- Core components BUILT but NOT YET INTEGRATED
- 6 ESLint warnings in `governorContent.ts` (non-blocking)
- All code compiles and builds successfully

---

## What's Already Done (Previous Team)

### Completed and Committed

| Item                                     | Status    | Agent         |
| ---------------------------------------- | --------- | ------------- |
| Mobile reorder (tourist-first hierarchy) | COMMITTED | Carlos        |
| Touch targets (44x44px minimum)          | COMMITTED | Anika         |
| Design token system                      | COMMITTED | Phase 2 team  |
| Error/loading states                     | COMMITTED | Previous team |

### Built but NOT Integrated (Uncommitted)

| Item                            | Location                                   | Agent               | Lines            |
| ------------------------------- | ------------------------------------------ | ------------------- | ---------------- |
| VisitorStatusCard component     | `components/almanac/VisitorStatusCard.tsx` | Dr. Mei Zhang       | 140              |
| Visitor recommendation logic    | `lib/almanac/visitorRecommendation.ts`     | Dr. Mei Zhang       | 185              |
| Governor TL;DR summary          | `lib/almanac/governorContent.ts`           | Dr. Jonas Lindstrom | 358              |
| Governor Planning Intelligence  | `lib/almanac/governorContent.ts`           | Dr. Jonas Lindstrom | (included above) |
| Component barrel export updated | `components/almanac/index.ts`              | Various             | 115              |

### Documentation Prepared

| Document                       | Purpose                    | Lines |
| ------------------------------ | -------------------------- | ----- |
| VISITOR_STATUS_CARD_SUMMARY.md | Component delivery summary | 319   |
| VISITOR_STATUS_CARD_USAGE.md   | Integration guide          | 380   |
| GOVERNOR-DELIVERY-SUMMARY.md   | Governor content system    | 357   |
| GOVERNOR-START-HERE.md         | Navigation guide           | 291   |
| docs/GOVERNOR-CONTENT-\*.md    | 5 documentation files      | 2,097 |

---

## Phase 1: Ship This Week

**Timeline:** January 30 - February 2, 2026 (4 days)
**Squad:** Squad A (5 agents)
**Objective:** Integrate VisitorStatusCard and Governor content, deploy to production

### Task Breakdown

#### Task 1.1: VisitorStatusCard Integration

**Assigned to:** Dr. Yuki Tanaka (TypeScript/React)
**Estimated time:** 2-3 hours
**Dependencies:** None

**Scope:**

1. Add VisitorStatusCard import to `app/(almanac)/almanac/page.tsx`
2. Insert component after QuickActions in mobile layout (line 413)
3. Pass required props from weather state:
   - `temperature={weather.current.temperature}`
   - `weatherCode={weather.current.weatherCode}`
   - `hasAlerts={hasActiveAlert}`
   - `windSpeed={weather.current.windSpeed}`
   - `precipitation={weather.current.precipitation}`
4. Insert component in desktop layout (appropriate grid position)
5. Verify responsive behavior at 375px, 768px, 1920px

**Success Criteria:**

- Component renders correctly on mobile and desktop
- Colors match design tokens (emerald/amber/red states)
- No console errors
- `npm run lint` passes (after fixing warnings)

---

#### Task 1.2: Props/Data Flow Verification

**Assigned to:** Dr. Omar Hassan (Data Architecture)
**Estimated time:** 1-2 hours
**Dependencies:** Task 1.1 started

**Scope:**

1. Verify all props passed to VisitorStatusCard are correct types
2. Trace data flow from weather API to component
3. Verify `hasActiveAlert` state is properly updated
4. Ensure `windSpeed` and `precipitation` are optional with sensible fallbacks
5. Document any edge cases discovered

**Success Criteria:**

- TypeScript compiles with no errors
- All edge cases handled (missing data, extreme values)
- Data flow documented in code comments

---

#### Task 1.3: Governor Content Integration

**Assigned to:** Dr. Lily Chen (Content Systems)
**Estimated time:** 2-3 hours
**Dependencies:** None (can run parallel with 1.1)

**Scope:**

1. Import `generateTLDRSummary` and `generatePlanningIntelligence` from `@/lib/almanac/governorContent`
2. Update `GovernorsBriefing` component to accept and display TL;DR
3. Create `PlanningIntelligence` component (template in docs)
4. Add Planning Intelligence below brass instruments in Governor view (line 802)
5. Fix 6 ESLint warnings in `governorContent.ts`:
   - Remove unused `hasConcerningWind` (line 67)
   - Prefix unused `verdict` with underscore (line 106)
   - Remove/use `wind` variable (lines 110, 210)
   - Remove unused `hasLightRain` (line 177)
   - Remove unused `nextHour` (line 259)

**Success Criteria:**

- TL;DR appears above Governor's Briefing text
- Planning Intelligence displays with correct icons
- 0 ESLint warnings in governorContent.ts
- Heritage tone preserved

---

#### Task 1.4: Responsive Verification

**Assigned to:** Dr. Marcus Johnson (Responsive Design)
**Estimated time:** 2-3 hours
**Dependencies:** Tasks 1.1 and 1.3 complete

**Scope:**

1. Test all new components at breakpoints:
   - 375px (iPhone SE)
   - 414px (iPhone Plus)
   - 768px (iPad)
   - 1024px (iPad Pro)
   - 1440px (Desktop)
   - 1920px (Large Desktop)
2. Verify touch targets meet 44x44px minimum
3. Check text wrapping and truncation
4. Verify animation performance (Framer Motion)
5. Test dark mode compatibility (if applicable)

**Success Criteria:**

- All components readable at all breakpoints
- No horizontal scroll on any screen size
- Touch targets measurable via DevTools
- Performance budget met (FPS > 30 during animations)

---

#### Task 1.5: Full Phase 1 QA

**Assigned to:** Dr. Zara Patel (Quality Assurance)
**Estimated time:** 4-6 hours
**Dependencies:** Tasks 1.1-1.4 complete

**Scope:**

1. Run full test suite:
   - `npm run lint` - must pass with 0 warnings
   - `npm run build` - must complete successfully
2. Accessibility testing:
   - VoiceOver/NVDA screen reader pass
   - Keyboard navigation (Tab/Enter/Escape)
   - ARIA labels present and correct
   - Color contrast verification (WCAG AA)
3. Cross-browser testing:
   - Chrome (latest)
   - Safari (latest)
   - Firefox (latest)
   - Edge (latest)
4. Weather scenario testing (all 6 recommendation levels):
   - Excellent conditions
   - Good conditions
   - Fair conditions
   - Poor conditions
   - Hazardous conditions
   - Edge cases (extreme temps, alerts)

**Success Criteria:**

- All lint/build passes
- All accessibility checks pass
- All browsers render correctly
- All weather scenarios produce correct output

---

### Phase 1 Review Gates

| Gate          | Reviewer                  | Criteria                                   |
| ------------- | ------------------------- | ------------------------------------------ |
| Code Review   | Sonnet Lead (TBD)         | Clean code, proper types, no TODO comments |
| UX Review     | Sonnet Lead (TBD)         | Matches design spec, readable, scannable   |
| Accessibility | Sonnet Lead (TBD)         | WCAG 2.1 AA compliance                     |
| Final QA      | Malcolm (Quality Officer) | All success criteria met                   |

### Phase 1 Dependency Map

```
                    +------------------+
                    |   START PHASE 1  |
                    +------------------+
                            |
              +-------------+-------------+
              |                           |
              v                           v
    +------------------+      +------------------+
    | Task 1.1         |      | Task 1.3         |
    | VisitorStatusCard|      | Governor Content |
    | (Yuki)           |      | (Lily)           |
    +------------------+      +------------------+
              |                           |
              v                           |
    +------------------+                  |
    | Task 1.2         |                  |
    | Props Verify     |                  |
    | (Omar)           |                  |
    +------------------+                  |
              |                           |
              +-------------+-------------+
                            |
                            v
              +------------------+
              | Task 1.4         |
              | Responsive       |
              | (Marcus)         |
              +------------------+
                            |
                            v
              +------------------+
              | Task 1.5         |
              | Full QA          |
              | (Zara)           |
              +------------------+
                            |
                            v
              +------------------+
              | Sonnet Reviews   |
              +------------------+
                            |
                            v
              +------------------+
              | Malcolm Sign-off |
              +------------------+
                            |
                            v
              +------------------+
              |  DEPLOY TO PROD  |
              +------------------+
```

---

## Phase 2: Caching + Design System

**Timeline:** February 3-14, 2026 (2 weeks)
**Squad:** Squad B+C (8 agents)
**Objective:** Implement client-side caching and refine design system

### Pre-requisites

- Phase 1 deployed and stable
- No critical bugs from Phase 1

### Key Tasks

1. **Weather Data Caching** (4 agents)
   - Implement localStorage caching with 15-minute TTL
   - Add stale-while-revalidate pattern
   - Reduce API calls by 60%+

2. **Design System Refinement** (4 agents)
   - Audit all components for token compliance
   - Create component library documentation
   - Establish pattern library

### Documentation Available

- `docs/PHASE-2-CACHING-PLAN.md` (21 KB)
- `docs/PHASE-2-TECHNICAL-SPEC.md` (16 KB)
- `docs/PHASE-2-CODE-PREVIEW.md` (20 KB)
- `docs/PHASE-2-SUMMARY.md` (12 KB)

---

## Phase 3: Accessibility Fixes

**Timeline:** February 17-28, 2026 (2 weeks)
**Squad:** Squad D (4 agents)
**Objective:** Achieve full WCAG 2.1 AA compliance

### Pre-requisites

- Phase 2 complete
- Accessibility audit completed (already done)

### Key Tasks

1. Implement all WCAG 2.1 AA requirements
2. Add skip links and landmark navigation
3. Fix color contrast issues
4. Add proper focus management
5. Implement reduced motion preferences

### Documentation Available

- `docs/ACCESSIBILITY-AUDIT-PHASE-3.md` (32 KB)
- `docs/ACCESSIBILITY-IMPLEMENTATION-GUIDE.md`
- `docs/ACCESSIBILITY-TESTING-CHECKLIST.md`
- `docs/INDEX-PHASE-3-ACCESSIBILITY.md` (7 KB)
- `docs/PHASE-3-SUMMARY.md` (12 KB)

---

## Phase 4: Server-Side Rendering

**Timeline:** March 3-28, 2026 (4 weeks)
**Squad:** Squad E (5 agents)
**Objective:** Eliminate 2-second blank screen, improve Lighthouse by 27+ points

### Pre-requisites

- Phases 1-3 complete
- No regressions in functionality

### Key Tasks (By Week)

1. **Week 1:** Server data layer (`lib/almanac/server.ts`)
2. **Week 2:** Client wrapper component
3. **Week 3:** Page refactor (819 lines -> 50 lines)
4. **Week 4:** Testing and optimization

### Expected Improvements

| Metric     | Current | Target  | Improvement |
| ---------- | ------- | ------- | ----------- |
| FCP        | 2.1s    | 1.2s    | 43% faster  |
| LCP        | 3.8s    | 2.5s    | 34% faster  |
| CLS        | 0.18    | 0.08    | 56% better  |
| Lighthouse | 62/100  | 85+/100 | +27 points  |

### Documentation Available

- `docs/PHASE-4-README.md` (11 KB)
- `docs/PHASE-4-EXECUTIVE-SUMMARY.md` (13 KB)
- `docs/PHASE-4-SSR-RESEARCH.md` (41 KB) - Technical deep dive
- `docs/PHASE-4-IMPLEMENTATION-GUIDE.md` (17 KB)
- `docs/PHASE-4-RISKS.md` (17 KB)

---

## Risk Register

### Phase 1 Risks

| Risk                               | Probability | Impact | Mitigation                          |
| ---------------------------------- | ----------- | ------ | ----------------------------------- |
| Integration breaks existing layout | Low         | High   | Thorough responsive testing         |
| Props type mismatches              | Low         | Medium | TypeScript compilation verification |
| ESLint warnings not resolved       | Low         | Low    | Simple code cleanup                 |
| Accessibility regressions          | Medium      | High   | Screen reader testing before deploy |

### Cross-Phase Risks

| Risk                        | Probability | Impact | Mitigation                    |
| --------------------------- | ----------- | ------ | ----------------------------- |
| Phase dependencies delayed  | Medium      | High   | Parallel work where possible  |
| Scope creep in later phases | Medium      | Medium | Strict scope documents        |
| Team availability gaps      | Low         | Medium | Cross-training, documentation |
| Production incidents        | Low         | High   | Rollback plan, feature flags  |

---

## Success Criteria Summary

### Phase 1 (This Week)

- [ ] VisitorStatusCard renders in both layouts
- [ ] Governor TL;DR and Planning Intelligence display correctly
- [ ] `npm run lint` passes with 0 warnings
- [ ] `npm run build` completes successfully
- [ ] All accessibility tests pass
- [ ] All weather scenarios tested
- [ ] Deployed to production

### Phase 2 (Week 2-3)

- [ ] Weather API calls reduced by 60%+
- [ ] All components use design tokens
- [ ] Pattern library documented

### Phase 3 (Week 4-5)

- [ ] WCAG 2.1 AA compliance achieved
- [ ] All accessibility issues resolved
- [ ] Reduced motion preference respected

### Phase 4 (Week 6-9)

- [ ] FCP < 1.5s
- [ ] LCP < 2.5s
- [ ] Lighthouse > 85
- [ ] No hydration errors

---

## Communication Plan

### Daily

- 15-minute async standup (Slack/Discord)
- Blockers raised immediately

### Weekly

- Monday: Sprint planning
- Friday: Demo + retrospective

### Review Cadence

- Sonnet leads review within 4 hours of PR
- Malcolm final sign-off within 8 hours

---

## Immediate Next Steps

### Today (January 30)

1. **Dr. Yuki Tanaka:** Begin Task 1.1 (VisitorStatusCard integration)
2. **Dr. Lily Chen:** Begin Task 1.3 (Governor content integration)
3. **Dr. Omar Hassan:** Prepare for Task 1.2 (review data flow)
4. **Dr. Marcus Johnson:** Set up responsive testing environment
5. **Dr. Zara Patel:** Prepare QA test plan

### Tomorrow (January 31)

1. Tasks 1.1 and 1.3 complete
2. Task 1.2 complete
3. Task 1.4 begins
4. Sonnet reviews start

### Friday (February 1)

1. Task 1.4 complete
2. Task 1.5 (full QA) begins
3. Final fixes applied

### Weekend (February 2)

1. Malcolm sign-off
2. Deploy to production
3. Monitor for issues

---

## File Locations Reference

### Components to Modify

```
app/(almanac)/almanac/page.tsx          <- Main page (add imports, insert components)
components/almanac/GovernorsBriefing.tsx <- Add TL;DR display
```

### New Components (Already Created, Need Integration)

```
components/almanac/VisitorStatusCard.tsx <- Ready to use
lib/almanac/visitorRecommendation.ts     <- Ready to use
lib/almanac/governorContent.ts           <- Ready to use (fix warnings)
```

### Documentation

```
docs/MASTER-EXECUTION-PLAN.md            <- This file
VISITOR_STATUS_CARD_USAGE.md             <- Integration guide
GOVERNOR-START-HERE.md                   <- Governor content guide
```

---

## Appendix: Quick Commands

### Development

```bash
cd /Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here

# Check lint status
npm run lint

# Run build
npm run build

# Start dev server
npm run dev
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/phase-1-integration

# After completing work
git add -A
git commit -m "feat: integrate VisitorStatusCard and Governor content"
git push -u origin feature/phase-1-integration
```

---

**Plan Prepared By:** Dr. Victoria Chen, PhD (COO)
**Approved By:** Pending Cody Boring review
**Last Updated:** January 30, 2026
