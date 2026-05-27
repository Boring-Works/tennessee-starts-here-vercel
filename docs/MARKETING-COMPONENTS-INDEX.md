# Marketing Components - Complete Documentation Index

**5 High-Conversion UX Components** built from Rocky Mount's JSON data.

All documentation created: January 30, 2026

---

## The Components

### 1. SiteStatusBadge

Real-time open/closed indicator with urgency/anticipation messaging.

### 2. TestimonialCard

Verified social proof with 3 display modes (featured, quote, stat).

### 3. NextEventCard

Upcoming events showcase with countdown, FOMO, and booking CTA.

### 4. ReviewCTA

Post-visit review encouragement across multiple platforms.

### 5. VisitorJourneyProgress

Value proposition visualization showing what visitors will experience.

---

## Documentation Files

### START HERE 👈

**File:** `MARKETING-COMPONENTS-README.md` (416 lines)

Overview of all components, quick start guide, placement map, conversion flow, and maintenance instructions.

**Read when:** You're new to this system or need a high-level overview
**Time:** 10-15 minutes

---

### DESIGN & STRATEGY

**File:** `MARKETING-COMPONENTS.md` (1,092 lines)

Complete specification for each component:

- Purpose and marketing angle
- Props interface with JSDoc
- Data sources (which JSON file)
- Placement recommendations with visual examples
- Marketing copy variants for each context
- Conversion triggers
- Accessibility requirements
- Analytics events

**Read when:** You're designing a new page or feature with these components
**Time:** 30-45 minutes (or reference specific sections)

---

### CODE TEMPLATES

**File:** `MARKETING-COMPONENTS-IMPLEMENTATION.md` (1,003 lines)

Ready-to-use TypeScript component code:

- Server component templates for all 5 components
- Copy-paste implementations
- Usage examples with real data
- Composition patterns (full page layouts)
- Installation checklist
- Testing checklist
- Component composition examples (homepage, visit page, etc.)

**Read when:** You're building a component
**Time:** 30 minutes to implement one component

---

### QUICK LOOKUP

**File:** `MARKETING-COMPONENTS-QUICK-REF.md` (537 lines)

Fast reference guide:

- Component anatomy (one-page per component)
- Copy patterns (urgency, FOMO, etc.)
- Placement strategy matrix
- Quick recipes (common configurations)
- Common customizations
- Troubleshooting guide
- Component lifecycle (creation → implementation → testing → shipping)

**Read when:** You need a fast answer or to troubleshoot
**Time:** 2-5 minutes per lookup

---

### VISUAL DIAGRAMS

**File:** `MARKETING-COMPONENTS-DIAGRAMS.md` (400+ lines)

Flowcharts, state machines, and architecture diagrams:

- Component data dependencies
- Decision trees
- Visitor conversion funnel
- SiteStatusBadge state machine
- TestimonialCard rendering logic
- NextEventCard flow
- ReviewCTA display logic
- VisitorJourneyProgress styles
- Data file relationships
- Placement strategy matrix (visual)
- Analytics event flow
- Mobile responsive breakpoints
- Accessibility audit checklist

**Read when:** You want to understand flow logic or need visual reference
**Time:** 10-20 minutes

---

## How to Use This Documentation

### Scenario 1: "I'm building the homepage"

1. **Read:** MARKETING-COMPONENTS-README.md (placement map section)
2. **Copy code:** MARKETING-COMPONENTS-IMPLEMENTATION.md (composition examples)
3. **Check design:** MARKETING-COMPONENTS.md (placement recommendations)
4. **Verify accessibility:** MARKETING-COMPONENTS-DIAGRAMS.md (accessibility checklist)

### Scenario 2: "I need to debug a component"

1. **Search:** MARKETING-COMPONENTS-QUICK-REF.md (troubleshooting section)
2. **Check data:** MARKETING-COMPONENTS.md (data source section for that component)
3. **Review logic:** MARKETING-COMPONENTS-DIAGRAMS.md (component-specific flowchart)

### Scenario 3: "I want to customize copy"

1. **Find variants:** MARKETING-COMPONENTS.md (marketing copy variants section)
2. **Check placement:** MARKETING-COMPONENTS-QUICK-REF.md (placement strategy)
3. **Update code:** MARKETING-COMPONENTS-IMPLEMENTATION.md (relevant component template)

### Scenario 4: "I need to understand the system"

1. **Overview:** MARKETING-COMPONENTS-README.md (complete overview)
2. **Details:** MARKETING-COMPONENTS.md (full specifications)
3. **Visuals:** MARKETING-COMPONENTS-DIAGRAMS.md (flowcharts and diagrams)
4. **Examples:** MARKETING-COMPONENTS-IMPLEMENTATION.md (real code)

---

## File Structure

```
docs/
├── MARKETING-COMPONENTS-INDEX.md (this file)
├── MARKETING-COMPONENTS-README.md (start here)
├── MARKETING-COMPONENTS.md (full specs)
├── MARKETING-COMPONENTS-IMPLEMENTATION.md (code templates)
├── MARKETING-COMPONENTS-QUICK-REF.md (fast lookup)
└── MARKETING-COMPONENTS-DIAGRAMS.md (visual reference)
```

---

## What's in Each File - One Liner

| File           | Purpose                                    | Page Count |
| -------------- | ------------------------------------------ | ---------- |
| README         | High-level overview + quick start          | 416        |
| SPECS          | Complete specifications for each component | 1,092      |
| IMPLEMENTATION | Code templates + examples                  | 1,003      |
| QUICK-REF      | Fast lookup + troubleshooting              | 537        |
| DIAGRAMS       | Flowcharts + visual architecture           | 400+       |

**Total documentation:** ~3,500 lines, 92 KB

---

## The 5 Components at a Glance

### SiteStatusBadge

```
Data: getSiteStatus() from lib/siteHours.ts
Example: "🟢 Open now! Last tour at 4pm."
Placement: Header, hero, visit page
Modes: compact, standard, detailed
Magic: Creates urgency or anticipation
```

### TestimonialCard

```
Data: data/testimonials.json
Example: "It was like teleported back in time" - 5⭐ Google
Placement: Homepage, events, footer
Modes: featured, quote, social_proof
Magic: Social proof + trust building
```

### NextEventCard

```
Data: data/events.json
Example: "Colonial Independence Day - In 42 days - Only 150 spots"
Placement: Homepage, sidebar, calendar, email
Modes: compact, standard, featured
Magic: FOMO + countdown timer
```

### ReviewCTA

```
Data: data/integrations.json (platform URLs)
Example: Three buttons → Google, TripAdvisor, Facebook
Placement: Email, thank-you page, footer
Styles: card, inline, badge
Magic: Post-visit gratitude mindset = high conversion
```

### VisitorJourneyProgress

```
Data: data/experiences.json
Example: "I. Stand on historic ground → II. Meet settlers → III. Touch past → IV. Discover evidence"
Placement: Visit page, booking, event details
Styles: timeline, cards, checklist, carousel
Magic: Answers "What will I do?" → Removes hesitation
```

---

## Key Design Principles

1. **Server Components First** - All components are server-side by default
2. **JSON Data Only** - Single source of truth in data files
3. **Centralized Copy** - All text in lib/copy/, not scattered
4. **Design Tokens** - All colors from CSS variables
5. **No Hardcoded URLs** - All from data/integrations.json
6. **Accessibility First** - WCAG 2.1 AA on all components
7. **Analytics Enabled** - Every interaction tracked

---

## Data Dependencies

**Files your components use:**

- `lib/siteHours.ts` → getSiteStatus()
- `data/events.json` → NextEventCard, calendar
- `data/testimonials.json` → TestimonialCard
- `data/experiences.json` → VisitorJourneyProgress
- `data/integrations.json` → ReviewCTA URLs
- `lib/copy/brand.ts` → All marketing copy
- `app/globals.css` → Design tokens

---

## Common Tasks

### Task: Add a new testimonial

See: QUICK-REF.md → "Maintenance & Updates" section

### Task: Change review platform URLs

See: QUICK-REF.md → "Common Customizations" section

### Task: Debug component not showing data

See: QUICK-REF.md → "Troubleshooting" section

### Task: Customize accent colors

See: QUICK-REF.md → "Common Customizations" section

### Task: Add component to new page

See: IMPLEMENTATION.md → "Composition patterns" section

### Task: Understand component flow

See: DIAGRAMS.md → Component-specific flowchart sections

---

## Component Checklist Before Shipping

From QUICK-REF.md and IMPLEMENTATION.md:

- [ ] Props interface documented with JSDoc
- [ ] Uses real data from JSON files
- [ ] All copy from lib/copy/
- [ ] Design tokens used (no hardcoded colors)
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Mobile responsive
- [ ] Tested with real data variations
- [ ] Analytics events tracked
- [ ] Updated CLAUDE.md if new component
- [ ] PR includes use cases and placements

---

## Placement Map at a Glance

```
HOMEPAGE:
  Hero → SiteStatusBadge (detailed) + NextEventCard (featured)
  Proof → TestimonialCard (featured × 3)
  CTA → ReviewCTA (hidden until engagement)

VISIT PAGE:
  Top → SiteStatusBadge (standard)
  Content → VisitorJourneyProgress (timeline)
  Bottom → ReviewCTA (inline)

EVENTS PAGE:
  Sidebar → NextEventCard (compact) + VisitorJourneyProgress (checklist)
  Content → TestimonialCard (quote mode, category filtered)

FOOTER:
  Links → ReviewCTA (badge) + TestimonialCard (social_proof)
  Sidebar → NextEventCard (compact)

EMAIL (POST-VISIT):
  Header → TestimonialCard (featured)
  CTA → ReviewCTA (card) [2-3 days after visit]

EMAIL (POST-EVENT):
  Header → NextEventCard (compact)
  CTA → ReviewCTA (inline) with eventName
```

---

## Success Metrics

Track these to measure component effectiveness:

**SiteStatusBadge:**

- View → Confidence to book
- Click → Scroll to more info

**TestimonialCard:**

- View → Credibility established
- Click → Review platform visit

**NextEventCard:**

- View → Event awareness
- Click → Booking started

**ReviewCTA:**

- View (post-visit) → Review likelihood
- Click → Review platform submission

**VisitorJourneyProgress:**

- View → Value understood
- Scroll depth → All moments seen

---

## Maintenance Schedule

**Weekly:** Monitor analytics dashboards
**Monthly:** Review conversion rates by component
**Quarterly:** Update testimonials with new verified reviews
**As-needed:** Add new events to events.json
**As-needed:** Update review platform URLs if changed
**As-needed:** Adjust copy based on A/B testing results

---

## Future Enhancements

From MARKETING-COMPONENTS.md:

- Real-time capacity tracking (FareHarbor integration)
- AI-powered testimonial selection
- Dynamic countdown timers
- Personalization based on visitor type
- A/B testing variants
- Multi-language support
- Integration with email marketing platform

---

## Questions or Issues?

### Quick questions?

→ Check **QUICK-REF.md** first (2-5 minute answers)

### Need code?

→ Check **IMPLEMENTATION.md** (copy-paste ready)

### Want full details?

→ Check **MARKETING-COMPONENTS.md** (complete specs)

### Confused about flow?

→ Check **DIAGRAMS.md** (visual explanations)

### Getting started?

→ Start with **README.md** (overview guide)

---

## Document Versions

All documents created: **January 30, 2026**
Last updated: **January 30, 2026**
Status: **Ready for implementation**

---

## Quick Links (within repo)

- Main component design doc: `docs/MARKETING-COMPONENTS.md`
- Code templates: `docs/MARKETING-COMPONENTS-IMPLEMENTATION.md`
- Data files: `data/` directory
  - Events: `data/events.json`
  - Testimonials: `data/testimonials.json`
  - Experiences: `data/experiences.json`
  - Integrations: `data/integrations.json`
- Utilities: `lib/siteHours.ts`, `lib/copy/brand.ts`
- Design tokens: `app/globals.css`

---

## Author & Attribution

**Created by:** Claude Opus 4.5
**Date:** January 30, 2026
**Context:** Tennessee Starts Here - Rocky Mount State Historic Site marketing component system

---

**Start reading:** `MARKETING-COMPONENTS-README.md` →
