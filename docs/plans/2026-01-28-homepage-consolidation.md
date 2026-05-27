# Homepage Consolidation Plan

## Objective

Condense 17 homepage sections into 7 dense, high-impact sections without losing any content or context. Goal: reduce scroll fatigue, increase conversions.

## Current State: 17 Sections

1. HeroSection
2. MysteryHook
3. ExperimentSection
4. ScrollTimeline
5. ContrastStatement
6. ProofSection
7. DistinctionSection
8. GroundStatement
9. Blount Letter (inline)
10. ExperiencePreview
11. PlanYourVisit
12. CampaignSection
13. IndigenousAcknowledgment
14. EventsShowcase
15. LedgerSection
16. StorySection
17. HomecomingSection
18. FinalCTA

## Target State: 7 Sections

### Section 1: Hero (unchanged)

- Keep HeroSection as-is
- Above the fold, primary CTA

### Section 2: The Story (combines 4 sections)

**Merges:** MysteryHook + ExperimentSection + ScrollTimeline + ContrastStatement

Structure:

- Opening hook: "Before there was a Tennessee..."
- The question: "Could democracy survive beyond the Appalachians?"
- Timeline beats: 1770 (Cobbs settle) → 1780 (arm Revolution) → 1790 (Blount arrives)
- Closing punch: "This is not where they gathered... This is where they governed."

Visual: Dark background, scroll-triggered reveals, timeline on left

### Section 3: The Proof (combines 3 sections)

**Merges:** ProofSection + DistinctionSection + Blount Letter

Structure:

- Three figure cards: Blount, Jackson, Cobbs (from ProofSection)
- The Blount letter as centerpiece quote
- Distinction timeline as footer note (1790-1792 Rocky Mount, 1792-1817 Knoxville)

Visual: Cream/parchment background, document aesthetic

### Section 4: The Experience (combines 3 sections)

**Merges:** ExperiencePreview + GroundStatement + HomecomingSection

Structure:

- "What You'll Experience" preview items
- The homecoming narrative
- Closing: "The buildings evolved. The ground endures."

Visual: White background with accent touches

### Section 5: 2026 Campaign (combines 3 sections)

**Merges:** CampaignSection + EventsShowcase + LedgerSection

Structure:

- "Tennessee 230 / America 250" framing
- First 250 enrollment CTA
- Key 2026 events highlight (3-4 featured)
- Promise vs Proof ledger comparison (condensed)

Visual: Dark/navy background, commemorative feel

### Section 6: Plan Your Visit (elevated position)

**Keeps:** PlanYourVisit content

Structure:

- Location, hours, admission
- TripAdvisor social proof
- Dual CTAs: Plan Your Visit + Get Directions

Visual: Clean white, clear conversion moment

### Section 7: Close (combines 2 sections)

**Merges:** IndigenousAcknowledgment + FinalCTA

Structure:

- Indigenous acknowledgment (respectful, not buried)
- Final CTA: "Tennessee starts here. Will you?"
- Decorative close

Visual: Dark background, elegant finish

## Implementation Approach

1. Create new consolidated components:
   - `ConsolidatedStory.tsx`
   - `ConsolidatedProof.tsx`
   - `ConsolidatedExperience.tsx`
   - `Commemorative2026.tsx`

2. Update `app/(main)/home/page.tsx` to use new structure

3. Keep old components in place (don't delete) until verified

4. Move styles from page.module.css into component-specific modules where possible

## Content Preservation Checklist

All of this content MUST appear in the new structure:

- [ ] "Before there was a Tennessee, there was this ground"
- [ ] "Could democracy survive beyond the Appalachians?"
- [ ] 1770/1780/1790 timeline with details
- [ ] "This is not where they gathered... This is where they governed"
- [ ] Blount, Jackson, Cobbs cards with quotes
- [ ] Blount letter with "glass windows" quote
- [ ] Territorial vs State capital distinction
- [ ] "The buildings evolved. The ground endures"
- [ ] Experience preview items
- [ ] Homecoming narrative
- [ ] First 250 enrollment
- [ ] 2026 events
- [ ] Promise vs Proof ledger
- [ ] Plan Your Visit info
- [ ] Indigenous acknowledgment
- [ ] Final CTA

## Success Criteria

- Same content, half the scroll depth
- Clear visual rhythm (dark → light → dark → light pattern)
- Conversion CTAs visible without excessive scrolling
- Mobile-friendly (sections stack well)
- No content loss verified by checklist

---

## Implementation Complete - January 28, 2026

### New Components Created

1. **`ConsolidatedStory.tsx`** - Merges MysteryHook + ExperimentSection + ScrollTimeline + ContrastStatement
2. **`ConsolidatedProof.tsx`** - Merges ProofSection + DistinctionSection + Blount Letter
3. **`ConsolidatedExperience.tsx`** - Merges ExperiencePreview + GroundStatement + HomecomingSection
4. **`Commemorative2026.tsx`** - Merges CampaignSection + EventsShowcase + LedgerSection
5. **`ConsolidatedClose.tsx`** - Merges IndigenousAcknowledgment + FinalCTA

### Files Modified

- `components/home/index.ts` - Added new exports
- `app/(main)/home/page.tsx` - Updated to use 7-section structure

### Content Preservation Verified

All content from the original 17 sections has been preserved in the new 7-section structure:

- ✅ "Before there was a Tennessee, there was this ground"
- ✅ "Could democracy survive beyond the Appalachians?"
- ✅ 1770/1780/1790 timeline with details
- ✅ "This is where they governed"
- ✅ Blount, Jackson, Cobbs cards with quotes
- ✅ Blount letter with "glass windows" quote
- ✅ Territorial vs State capital distinction
- ✅ "The buildings evolved. The ground endures"
- ✅ Experience preview items
- ✅ Homecoming narrative and visit info
- ✅ First 250 enrollment
- ✅ 2026 events showcase
- ✅ Promise vs Proof ledger
- ✅ Plan Your Visit info
- ✅ Indigenous acknowledgment
- ✅ Final CTA with closing tagline

### Build Status

- ✅ Lint passes (0 errors)
- ✅ Build passes
- ✅ All pages render correctly
