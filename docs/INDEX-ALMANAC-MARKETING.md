# Almanac Marketing Integration - Complete Documentation Index

**Last Updated:** January 29, 2026
**Status:** Design Complete - Ready for Development
**Total Documentation:** 7 comprehensive guides + reference card

---

## Start Here (Choose Your Role)

### I'm a Director / Decision Maker

**Read in this order:**

1. **ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md** (10 min)
   - Business case, ROI projections, timeline, risks
2. **ALMANAC-QUICK-REFERENCE.md** (5 min)
   - Visual overview of 4 features and success metrics
3. **ALMANAC-CONVERSION-FLOWS.md** (skim, focus on intro)
   - User psychology and expected conversion rates

**Decision Points:**

- [ ] Is $2,600-3,200/month recurring revenue worth 180-240 dev hours?
- [ ] Do we want to test this with a Phase 1 pilot (Weeks 1-2)?
- [ ] Who owns the implementation timeline?

---

### I'm a Developer

**Read in this order:**

1. **ALMANAC-IMPLEMENTATION-CHECKLIST.md** (15 min)
   - Your implementation roadmap, task breakdown, files to create
2. **ALMANAC-MARKETING-INTEGRATION.md** (Design section only)
   - Complete feature specifications
3. **ALMANAC-COPY-LIBRARY.md** (reference as needed)
   - All copy templates for each feature

**Then Start Building:**

- Phase 1 (Weeks 1-2): EventWeatherCard + UpcomingEventCard
- Phase 2 (Weeks 3-4): Insider loyalty system
- Phase 3 (Week 5): Social hooks
- Phase 4 (Ongoing): Analytics & optimization

---

### I'm a Designer

**Read in this order:**

1. **ALMANAC-MARKETING-INTEGRATION.md** (Design 1-4 sections)
   - Complete feature specifications and copy
2. **ALMANAC-CONVERSION-FLOWS.md** (visual flows)
   - Understand user journeys and emotion
3. **ALMANAC-QUICK-REFERENCE.md** (Feature Positioning section)
   - Mobile vs. desktop layout

**Deliverables Needed:**

- EventWeatherCard mockups (3 variants: optimal/good/fair)
- UpcomingEventCard mockups (4 timing scenarios)
- InsiderBadge component design
- AchievementModal designs (3 tiers)
- Updated ShareButton design

---

### I'm a Content / Marketing Lead

**Read in this order:**

1. **ALMANAC-COPY-LIBRARY.md** (15 min)
   - All copy templates by feature and season
2. **ALMANAC-MARKETING-INTEGRATION.md** (Copy Guidelines section)
   - Copy rules and brand alignment
3. **COPY.md** (existing brand guide)
   - Rocky Mount approved copy standards

**Your Responsibilities:**

- Write/review all copy for accuracy and brand fit
- Verify no STOP phrases appear
- Create seasonal variants (Spring, Summer, Fall, Winter)
- Prepare hashtag strategy
- Draft event-specific hooks

---

### I'm an Analytics / Tracking Person

**Read in this order:**

1. **ALMANAC-IMPLEMENTATION-CHECKLIST.md** (Phase 4 section)
   - Analytics setup requirements
2. **ALMANAC-QUICK-REFERENCE.md** (Success Metrics section)
   - Target metrics and alarms
3. **ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md** (Metrics section)
   - Expected conversion rates and attribution

**Your Deliverables:**

- UTM parameter strategy (utm*source=almanac*\*, etc.)
- GTM event tracking setup
- Analytics dashboard with conversion funnel
- Monthly metric reports
- Attribution modeling

---

## Document Details

### ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md

**Length:** ~12 KB
**Purpose:** High-level business case for decision makers
**Contains:**

- The opportunity (problem + solution)
- 4 features explained simply
- Combined monthly impact ($2,600-3,200 projected)
- Success metrics & timeline
- ROI & investment required
- Risks & mitigations
- FAQ

**Best For:** Directors, stakeholders, approvals

---

### ALMANAC-MARKETING-INTEGRATION.md

**Length:** ~21 KB
**Purpose:** Complete strategic and technical design
**Contains:**

- Core philosophy and concept
- Design 1: Smart weather → tour conversion (EventWeatherCard)
- Design 2: Event countdown integration (UpcomingEventCard)
- Design 3: Insider loyalty benefits
- Design 4: Social media hooks
- Conversion flow map
- Technical implementation roadmap
- Copy guidelines & event-specific hooks
- Files to create/modify

**Best For:** Developers, designers, product leads

---

### ALMANAC-IMPLEMENTATION-CHECKLIST.md

**Length:** ~14 KB
**Purpose:** Step-by-step development roadmap
**Contains:**

- Phase 1-4 breakdown (6 weeks total)
- Component by component checklist
- File-by-file implementation guide
- QA & testing matrix
- Pre-launch checklist
- Rollout plan (soft launch → full launch)
- Development notes & known risks

**Best For:** Developers, QA leads, project managers

---

### ALMANAC-CONVERSION-FLOWS.md

**Length:** ~38 KB
**Purpose:** User journey maps showing psychology & conversion
**Contains:**

- Flow 1: Weather condition → tour booking
- Flow 2: Daily habit → loyalty unlock → booking
- Flow 3: Social share → discovery → booking
- Flow 4: Event countdown → FOMO → booking
- Expected conversion rates for each flow
- All flows combined: Revenue model

**Best For:** Understanding user psychology, copywriters, designers

---

### ALMANAC-COPY-LIBRARY.md

**Length:** ~14 KB
**Purpose:** Centralized copy templates for all features
**Contains:**

- EventWeatherCard templates (optimal/good/fair conditions)
- UpcomingEventCard templates (3+ weeks / 2 weeks / 7 days / 3 days / day-of)
- InsiderBadge copy (3 tiers)
- ShareButton copy by season (Spring/Summer/Fall/Winter)
- Hashtag strategy
- Copy rules (DO's and DON'Ts)
- Copy-to-code mapping
- Localization notes

**Best For:** Copywriters, designers, developers implementing copy

---

### ALMANAC-QUICK-REFERENCE.md

**Length:** ~7 KB
**Purpose:** One-page reference card for daily use
**Contains:**

- 4 features at a glance
- Copy golden rules
- Feature positioning (mobile + desktop layouts)
- Conversion funnel math
- Success metrics
- Implementation timeline
- Seasonal copy hooks
- Troubleshooting guide
- Launch checklist
- ROI math

**Best For:** Daily reference, printing, team meetings

---

### README-ALMANAC-INTEGRATION.md (Not Yet Created)

**Length:** ~10 KB (in progress)
**Purpose:** Navigation guide and orientation document
**Contains:**

- What is this project (one-sentence summary)
- Document map (which doc to read for what)
- 4 features quick reference
- Timeline
- Key files to create
- Critical success factors
- Next action items by role

**Best For:** First-time readers, navigation, orientation

---

## How to Use This Documentation

### For Decision Making

1. Read ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md
2. Skim ALMANAC-QUICK-REFERENCE.md
3. Make decision: Green light or iterate?

### For Planning

1. Read ALMANAC-IMPLEMENTATION-CHECKLIST.md
2. Create project timeline in your tool (Asana, Monday, etc.)
3. Assign owners (dev, design, content, analytics)
4. Schedule kickoff meeting

### For Development

1. Start with ALMANAC-IMPLEMENTATION-CHECKLIST.md
2. Reference ALMANAC-MARKETING-INTEGRATION.md for specs
3. Use ALMANAC-COPY-LIBRARY.md for copy templates
4. Consult ALMANAC-CONVERSION-FLOWS.md for user context

### For Design

1. Study ALMANAC-MARKETING-INTEGRATION.md (Design 1-4)
2. Review ALMANAC-CONVERSION-FLOWS.md for user journeys
3. Check ALMANAC-QUICK-REFERENCE.md for layout
4. Create mockups + design system updates

### For Content

1. Deep dive into ALMANAC-COPY-LIBRARY.md
2. Cross-reference COPY.md for brand guidelines
3. Create seasonal variants
4. Work with dev to implement

### For Analytics

1. Focus on ALMANAC-IMPLEMENTATION-CHECKLIST.md (Phase 4)
2. Review success metrics in all docs
3. Set up GTM + dashboard
4. Create monitoring plan

---

## Cross-References by Topic

### If You Need Information About...

**"Perfect Touring Weather" (EventWeatherCard)**

- Design: ALMANAC-MARKETING-INTEGRATION.md (Design 1)
- Implementation: ALMANAC-IMPLEMENTATION-CHECKLIST.md (Component: EventWeatherCard.tsx)
- Copy: ALMANAC-COPY-LIBRARY.md (EventWeatherCard section)
- User flow: ALMANAC-CONVERSION-FLOWS.md (Flow 1)
- Metrics: ALMANAC-QUICK-REFERENCE.md (Feature 1)

**"Upcoming Event Countdown" (UpcomingEventCard)**

- Design: ALMANAC-MARKETING-INTEGRATION.md (Design 2)
- Implementation: ALMANAC-IMPLEMENTATION-CHECKLIST.md (Component: UpcomingEventCard.tsx)
- Copy: ALMANAC-COPY-LIBRARY.md (UpcomingEventCard section)
- User flow: ALMANAC-CONVERSION-FLOWS.md (Flow 4)
- Metrics: ALMANAC-QUICK-REFERENCE.md (Feature 2)

**"Insider Loyalty Program"**

- Design: ALMANAC-MARKETING-INTEGRATION.md (Design 3)
- Implementation: ALMANAC-IMPLEMENTATION-CHECKLIST.md (Phase 2)
- Copy: ALMANAC-COPY-LIBRARY.md (InsiderBadge section)
- User flow: ALMANAC-CONVERSION-FLOWS.md (Flow 2)
- Metrics: ALMANAC-QUICK-REFERENCE.md (Feature 3)

**"Social Media Hooks"**

- Design: ALMANAC-MARKETING-INTEGRATION.md (Design 4)
- Implementation: ALMANAC-IMPLEMENTATION-CHECKLIST.md (Phase 3)
- Copy: ALMANAC-COPY-LIBRARY.md (ShareButton section)
- User flow: ALMANAC-CONVERSION-FLOWS.md (Flow 3)
- Metrics: ALMANAC-QUICK-REFERENCE.md (Feature 4)

**Success Metrics & ROI**

- Executive view: ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md (Success Metrics)
- Quick reference: ALMANAC-QUICK-REFERENCE.md (Success Metrics)
- Conversion math: ALMANAC-CONVERSION-FLOWS.md (Summary)
- Implementation tracking: ALMANAC-IMPLEMENTATION-CHECKLIST.md (Phase 4)

**Copy & Brand Alignment**

- Templates: ALMANAC-COPY-LIBRARY.md
- Rules: ALMANAC-COPY-LIBRARY.md (Copy Rules)
- Brand alignment: COPY.md (existing guide)
- Event hooks: ALMANAC-MARKETING-INTEGRATION.md (Event-Specific section)

**Timeline & Resources**

- Executive view: ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md (Investment Required)
- Detailed breakdown: ALMANAC-IMPLEMENTATION-CHECKLIST.md (Timeline)
- Quick reference: ALMANAC-QUICK-REFERENCE.md (Implementation Timeline)

---

## File Organization in Repo

```
tennessee-starts-here/
├── docs/
│   ├── COPY.md (existing brand guide - READ FIRST)
│   ├── ALMANAC.md (existing Almanac feature docs)
│   ├── ALMANAC-MARKETING-INTEGRATION.md (NEW - comprehensive design)
│   ├── ALMANAC-IMPLEMENTATION-CHECKLIST.md (NEW - dev roadmap)
│   ├── ALMANAC-CONVERSION-FLOWS.md (NEW - user journeys)
│   ├── ALMANAC-COPY-LIBRARY.md (NEW - copy templates)
│   ├── ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md (NEW - business case)
│   ├── ALMANAC-QUICK-REFERENCE.md (NEW - one-pager)
│   ├── README-ALMANAC-INTEGRATION.md (NEW - orientation)
│   └── INDEX-ALMANAC-MARKETING.md (THIS FILE)
├── components/
│   └── almanac/
│       ├── EventWeatherCard.tsx (NEW)
│       ├── UpcomingEventCard.tsx (NEW)
│       ├── InsiderBadge.tsx (NEW)
│       ├── AchievementModal.tsx (NEW)
│       └── ShareButton.tsx (MODIFY)
├── lib/
│   ├── almanac/
│   │   ├── eventMatching.ts (NEW)
│   │   ├── forecastMatching.ts (NEW)
│   │   ├── insiderProgress.ts (NEW)
│   │   └── ... (existing)
│   ├── copy/
│   │   ├── almanac-integration.ts (NEW)
│   │   └── brand.ts (MODIFY)
│   └── events.ts (NEW helper file)
└── hooks/
    └── useAlmanacInsider.ts (NEW)
```

---

## Version Control & Updates

| Version | Date       | Status       | Key Changes                  |
| ------- | ---------- | ------------ | ---------------------------- |
| 1.0     | 2026-01-29 | Draft        | Initial design complete      |
| 2.0     | TBD        | In Review    | After director feedback      |
| 3.0     | TBD        | Final        | Ready for development        |
| 4.0     | TBD        | Post-Phase-1 | Updates after implementation |

---

## How to Keep This Updated

After each phase:

1. Document any design changes (update ALMANAC-MARKETING-INTEGRATION.md)
2. Update implementation checklist (ALMANAC-IMPLEMENTATION-CHECKLIST.md)
3. Log actual metrics vs. projected (update success metrics)
4. Note any learnings or pivots
5. Update QUICK-REFERENCE.md for team reference

---

## Questions & Support

**If you're asking...** → **Read this document:**

- "What is this project?" → ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md
- "How do I build feature X?" → ALMANAC-IMPLEMENTATION-CHECKLIST.md
- "What should the copy say?" → ALMANAC-COPY-LIBRARY.md
- "What's the user psychology?" → ALMANAC-CONVERSION-FLOWS.md
- "What are the design specs?" → ALMANAC-MARKETING-INTEGRATION.md
- "What's the one-page summary?" → ALMANAC-QUICK-REFERENCE.md
- "What do I read first?" → This document (INDEX)

---

## Success Checklist (Kickoff Meeting)

Before development starts:

- [ ] Director approved budget & timeline
- [ ] Developer assigned to Phase 1
- [ ] Designer assigned to mockups
- [ ] Content lead assigned to copy review
- [ ] Analytics person assigned to tracking setup
- [ ] Team read ALMANAC-QUICK-REFERENCE.md
- [ ] Kickoff meeting scheduled
- [ ] Slack channel created (#almanac-marketing)
- [ ] Weekly standups scheduled

---

_Created: January 29, 2026_
_For: Rocky Mount State Historic Site_
_Project: Tennessee Starts Here - Almanac Marketing Integration_
_All Rights Reserved - Internal Use Only_
