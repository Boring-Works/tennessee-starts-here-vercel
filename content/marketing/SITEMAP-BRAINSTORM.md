# Site Map & Navigation Brainstorm

## Rocky Mount State Historic Site

**Date:** February 3, 2026
**Status:** SUPERSEDED by `docs/plans/NAVIGATION-PLAN.md`
**Purpose:** Evaluate current navigation, propose alternatives, rank options

> **NOTE:** This document contains the original analysis and 6 navigation options.
> The final approved plan is in `docs/plans/NAVIGATION-PLAN.md`.

---

## Current State: Complete Page Inventory

### All Public Pages (29 routes)

```
ENTRY
├── /                          Welcome (splash)
└── /home                      Homepage

VISIT (2 pages)
├── /visit                     Plan Your Visit
└── /groups                    Group Visits

EVENTS (5 pages)
├── /events                    Full Calendar
├── /events/colonial-independence-day
├── /events/first-families-reunion
├── /events/stitching-independence
└── /lectures                  Lecture Series

CONTENT (4 pages)
├── /our-story                 Site History
├── /educators                 Teacher Resources
├── /explore                   Interactive Map ⚠️ NOT IN NAV
└── /programs                  Programs List ⚠️ NOT IN NAV

EVIDENCE ROOM (10 pages)
├── /evidence                  Landing Page
├── /evidence/documents        Document Index
├── /evidence/documents/[slug] Individual Documents
├── /evidence/collections      Collection Index
├── /evidence/collections/[slug] Individual Collections
├── /evidence/people           People Index
├── /evidence/people/[slug]    Individual People
├── /evidence/timeline         Timeline View ⚠️ NOT IN NAV
├── /evidence/library          Legacy Redirect
└── /evidence/library/[slug]   Legacy Redirect

SUPPORT (3 pages)
├── /support                   Donate
├── /membership                Membership
└── /first-250                 First 250 Campaign

SPECIAL (1 page)
└── /almanac                   1775 Almanac ⚠️ NOT IN NAV

ADMIN (2 pages, not public)
├── /dredge
└── /dredge/review
```

### Current Navigation Structure

```
┌─────────────────────────────────────────────────────────────┐
│ ROCKY MOUNT          Visit  Events  Discover  Support       │
│                        ↓       ↓        ↓         ↓         │
│                     ┌────┐  ┌────┐   ┌────┐    ┌────┐      │
│                     │Plan│  │Full│   │Our │    │First│      │
│                     │Your│  │Cal │   │Story│   │250 │      │
│                     │Visit│ │    │   │    │    │    │      │
│                     │----│  │Lec-│   │Evi-│    │Mem-│      │
│                     │Grps│  │tures│  │dence│   │ber │      │
│                     │    │  │    │   │Room│    │ship│      │
│                     │Acc-│  │CID │   │    │    │    │      │
│                     │ess │  │    │   │Edu-│    │Don-│      │
│                     │    │  │FFR │   │cators│  │ate │      │
│                     └────┘  └────┘   └────┘    └────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## Current Problems Identified

| Problem                                                                  | Impact                   | Severity |
| ------------------------------------------------------------------------ | ------------------------ | -------- |
| **4 orphan pages** - /explore, /programs, /almanac, /timeline not in nav | Visitors can't find them | High     |
| **"Discover" is vague** - Lumps unrelated content                        | Confusing IA             | Medium   |
| **Evidence Room buried** - Major feature, one dropdown item              | Underutilized feature    | High     |
| **No "Home" link** - Must click logo                                     | UX friction              | Low      |
| **Lectures separate from Events** - Where do I find events?              | Confusion                | Medium   |
| **Almanac orphaned** - Unique feature, invisible                         | Lost differentiation     | High     |
| **Deep nesting** - /evidence/collections/[slug] is 4 levels              | Hard to navigate back    | Medium   |
| **Footer/Header mismatch** - Footer has Volunteer, Header doesn't        | Inconsistency            | Low      |

---

## Menu System Options

### OPTION A: "THE CLASSIC" (4 Sections, Refined)

**Approach:** Keep 4 main sections but fix groupings and add missing pages.

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   VISIT          EVENTS          EXPLORE         SUPPORT         │
│     ↓              ↓               ↓               ↓             │
│  ┌──────┐      ┌──────┐       ┌──────┐        ┌──────┐          │
│  │Plan  │      │Calendar│     │Our    │       │First  │          │
│  │Your  │      │2026   │      │Story  │       │250    │          │
│  │Visit │      │       │      │       │       │       │          │
│  │      │      │Lectures│     │Evidence│      │Member-│          │
│  │Groups│      │Series │      │Room   │       │ship   │          │
│  │      │      │       │      │       │       │       │          │
│  │Educa-│      │Colonial│     │Timeline│      │Donate │          │
│  │tors  │      │Ind Day│      │       │       │       │          │
│  │      │      │       │      │1775   │       │Volun- │          │
│  │Acces-│      │Stitching│    │Almanac│       │teer   │          │
│  │sibility│    │Indep. │      │       │       │       │          │
│  └──────┘      └──────┘       └──────┘        └──────┘          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Changes from current:**

- Rename "Discover" → "Explore"
- Move Educators from Discover → Visit (makes sense: planning a visit)
- Add /explore, /timeline, /almanac to Explore dropdown
- Add Volunteer to Support

**Pros:**

- Minimal disruption
- Familiar pattern
- Fixes orphan pages

**Cons:**

- Explore dropdown gets crowded (6 items)
- Almanac still buried
- Doesn't solve "Discover" vagueness (just renames it)

---

### OPTION B: "THE RESEARCHER" (5 Sections, Research-Forward)

**Approach:** Elevate Evidence Room to top-level. Historic sites attract researchers.

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   VISIT      EVENTS      EVIDENCE      ABOUT      SUPPORT              │
│     ↓          ↓           ↓            ↓           ↓                  │
│  ┌─────┐    ┌─────┐     ┌──────┐     ┌─────┐    ┌──────┐              │
│  │Plan │    │Calen│     │Docu- │     │Our  │    │First │              │
│  │Visit│    │dar  │     │ments │     │Story│    │250   │              │
│  │     │    │     │     │      │     │     │    │      │              │
│  │Group│    │Lec- │     │Collec│     │Time-│    │Member│              │
│  │s    │    │tures│     │tions │     │line │    │ship  │              │
│  │     │    │     │     │      │     │     │    │      │              │
│  │Edu- │    │CID  │     │People│     │Alma-│    │Donate│              │
│  │cator│    │     │     │      │     │nac  │    │      │              │
│  │s    │    │     │     │      │     │     │    │      │              │
│  └─────┘    └─────┘     └──────┘     └─────┘    └──────┘              │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Changes from current:**

- Add "Evidence" as 5th top-level section
- Rename "Discover" → "About"
- Evidence dropdown: Documents, Collections, People
- About dropdown: Our Story, Timeline, Almanac

**Pros:**

- Elevates unique differentiator (Evidence Room)
- Clear for researchers and historians
- Almanac gets visibility in "About"
- 5 sections still manageable

**Cons:**

- 5 nav items may crowd mobile
- "Evidence" may be unclear to casual tourists
- About + Evidence = 2 content sections (confusing?)

---

### OPTION C: "THE TOURIST" (3 Sections, Action-First)

**Approach:** Tourists care about: What's here? What's happening? How do I help? Simplify radically.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│       PLAN YOUR VISIT        WHAT'S ON        GET INVOLVED      │
│             ↓                   ↓                  ↓            │
│         ┌──────┐            ┌──────┐          ┌──────┐         │
│         │Hours │            │Events│          │First │         │
│         │& Info│            │2026  │          │250   │         │
│         │      │            │      │          │      │         │
│         │Groups│            │Lec-  │          │Member│         │
│         │& Edu │            │tures │          │ship  │         │
│         │      │            │      │          │      │         │
│         │Our   │            │CID   │          │Donate│         │
│         │Story │            │      │          │      │         │
│         │      │            │Stitch│          │Volun-│         │
│         │Evi-  │            │Indep │          │teer  │         │
│         │dence │            │      │          │      │         │
│         │Room  │            │      │          │      │         │
│         └──────┘            └──────┘          └──────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Changes from current:**

- Reduce from 4 to 3 main sections
- "Plan Your Visit" absorbs Visit + Discover
- "What's On" = Events
- "Get Involved" = Support

**Pros:**

- Ultra-simple for tourists
- Clear action-oriented labels
- Works great on mobile (3 taps max)
- "What's On" is friendlier than "Events"

**Cons:**

- Evidence Room gets demoted (buried in "Plan Your Visit")
- Researchers may struggle
- "Plan Your Visit" dropdown gets long (6+ items)
- Loses academic credibility

---

### OPTION D: "THE HYBRID" (4 Sections + Utility Rail)

**Approach:** Keep 4 main sections for content, add utility rail for special features.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  [1775 Almanac]  [Evidence Room]  [First 250]           Contact | Map   │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│       VISIT           EVENTS          ABOUT           SUPPORT           │
│         ↓               ↓               ↓               ↓               │
│     ┌──────┐        ┌──────┐        ┌──────┐        ┌──────┐           │
│     │Plan  │        │Calendar│      │Our   │        │Member-│           │
│     │Visit │        │       │       │Story │        │ship   │           │
│     │      │        │Lectures│      │      │        │       │           │
│     │Groups│        │       │       │Time- │        │Donate │           │
│     │      │        │CID    │       │line  │        │       │           │
│     │Educa-│        │       │       │      │        │Volun- │           │
│     │tors  │        │Stitching│     │Explore│       │teer   │           │
│     └──────┘        └──────┘        └──────┘        └──────┘           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Features:**

- **Utility Rail (top):** Special/promoted items with distinctive styling
  - 1775 Almanac (unique feature)
  - Evidence Room (differentiator)
  - First 250 (campaign)
- **Main Nav (below):** Standard 4-section navigation
- Utility items are visually distinct (badges, icons, colors)

**Pros:**

- Special features get visibility without crowding main nav
- Evidence Room promoted without adding 5th section
- Almanac finally discoverable
- Flexible for future promotions

**Cons:**

- Two navigation levels = more complex
- May confuse on mobile
- First 250 appears twice (utility + Support dropdown)
- More design/dev work

---

### OPTION E: "THE MEGA MENU" (2 Sections, Full-Width Dropdowns)

**Approach:** Modern mega-menu with two clear divisions: Learn and Act.

```
┌────────────────────────────────────────────────────────────────────────┐
│   ROCKY MOUNT                                                          │
│                            LEARN              ACT                      │
│                              ↓                 ↓                       │
└────────────────────────────────────────────────────────────────────────┘

When "LEARN" clicked:
┌────────────────────────────────────────────────────────────────────────┐
│ LEARN                                                                  │
│                                                                        │
│  THE STORY           EVIDENCE ROOM         EXPERIENCES                 │
│  ─────────           ────────────          ───────────                 │
│  Our Story           Documents             Events Calendar             │
│  Timeline            Collections           Lecture Series              │
│  The Cobb Family     Historical People     Colonial Ind. Day           │
│                      Browse All →          Stitching Independence      │
│                                                                        │
│  SPECIAL FEATURES                                                      │
│  ────────────────                                                      │
│  🌾 1775 Almanac     📜 Evidence Room      🗺️ Explore the Seven       │
│  Weather & farming   Primary sources       Interactive map             │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘

When "ACT" clicked:
┌────────────────────────────────────────────────────────────────────────┐
│ ACT                                                                    │
│                                                                        │
│  PLAN A VISIT        BRING A GROUP         SUPPORT US                  │
│  ────────────        ────────────          ──────────                  │
│  Hours & Admission   School Groups         First 250 [Limited]         │
│  Directions          Educators             Membership                  │
│  Accessibility       Private Tours         Donate                      │
│  Book Tickets →                            Volunteer                   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Pros:**

- Modern UX pattern (used by major sites)
- Everything visible at once (no hunting)
- Special features get prime real estate
- Clear mental model: Learn vs. Act
- Room for descriptions and featured items

**Cons:**

- Complex implementation
- May overwhelm casual visitors
- Mobile experience requires careful design
- "Learn" and "Act" are abstract labels

---

### OPTION F: "THE PROGRESSIVE" (Audience-Based)

**Approach:** Different navigation for different audiences. Detect or ask.

```
DEFAULT (Tourist):
┌─────────────────────────────────────────────────────────────────┐
│   Plan Visit    Events    About    Support    [🔬 Research Mode]│
└─────────────────────────────────────────────────────────────────┘

RESEARCH MODE (Toggle):
┌─────────────────────────────────────────────────────────────────┐
│   Evidence    Documents    Collections    Timeline   [🏠 Visitor]│
└─────────────────────────────────────────────────────────────────┘
```

**Features:**

- Default nav optimized for tourists
- "Research Mode" toggle reveals researcher-focused nav
- Persistent toggle in header corner
- Evidence Room gets own navigation universe when activated

**Pros:**

- Perfect for each audience type
- Researchers get dedicated experience
- Tourists not overwhelmed
- Progressive disclosure

**Cons:**

- Complex to implement
- May confuse users who toggle accidentally
- Two navs to maintain
- SEO implications (same content, different paths?)

---

## Ranking Matrix

| Criteria                | A: Classic | B: Researcher | C: Tourist | D: Hybrid | E: Mega | F: Progressive |
| ----------------------- | ---------- | ------------- | ---------- | --------- | ------- | -------------- |
| **Tourist-friendly**    | 7          | 6             | 9          | 7         | 6       | 8              |
| **Researcher-friendly** | 5          | 9             | 4          | 7         | 8       | 9              |
| **Fixes orphan pages**  | 8          | 7             | 6          | 9         | 9       | 8              |
| **Mobile experience**   | 8          | 7             | 9          | 6         | 5       | 6              |
| **Implementation ease** | 9          | 7             | 8          | 6         | 4       | 3              |
| **Brand alignment**     | 6          | 8             | 5          | 8         | 7       | 7              |
| **Scalability**         | 6          | 7             | 5          | 8         | 9       | 8              |
| **Distinctiveness**     | 4          | 7             | 3          | 7         | 8       | 9              |
| **TOTAL**               | **53**     | **58**        | **49**     | **58**    | **56**  | **58**         |

---

## Final Ranking

### 🥇 TIE: Option B (Researcher), D (Hybrid), F (Progressive) — Score: 58

**Recommendation: OPTION D (The Hybrid)**

**Why D over B or F:**

- B (Researcher) adds 5th nav item which crowds mobile
- F (Progressive) is complex to implement and maintain
- D (Hybrid) gives best of both: promotes special features without restructuring

### 🥈 Option E (Mega Menu) — Score: 56

Good if you want modern UX, but implementation complexity is high.

### 🥉 Option A (Classic Refined) — Score: 53

Safe choice, minimal disruption, but doesn't differentiate Rocky Mount.

### ❌ Option C (Tourist) — Score: 49

Too simple. Buries Evidence Room which is your differentiator.

---

## Recommended Implementation: Option D (Hybrid)

### Phase 1: Add Utility Rail

```
[1775 Almanac] [Evidence Room] [Join First 250]    Contact | Directions
────────────────────────────────────────────────────────────────────────
  VISIT          EVENTS          ABOUT          SUPPORT
```

- Add 3 promoted items above main nav
- Distinct visual treatment (smaller, badges/icons)
- Links to /almanac, /evidence, /first-250

### Phase 2: Fix Main Nav

**VISIT dropdown:**

- Plan Your Visit
- Groups & Educators
- Accessibility

**EVENTS dropdown:**

- Full Calendar
- Lecture Series
- Colonial Independence Day
- Stitching Independence

**ABOUT dropdown:**

- Our Story
- Timeline
- Explore the Seven

**SUPPORT dropdown:**

- Membership
- Donate
- Volunteer

### Phase 3: Update Footer

Match footer to new structure. Add all pages.

### Phase 4: Add Breadcrumbs

For deep pages (evidence/documents/[slug]), add breadcrumb trail.

---

## Mobile Considerations

### Current Mobile Nav

```
┌─────────────────────────┐
│ ☰  ROCKY MOUNT          │
│                         │
│  [Plan Your Visit]      │
│  [Book Tickets]         │
└─────────────────────────┘
```

### Recommended Mobile Nav (Option D)

```
┌─────────────────────────┐
│ ☰  ROCKY MOUNT          │
│                         │
│  ★ First 250 [Limited]  │  ← Promoted
│  📜 Evidence Room       │  ← Promoted
│                         │
│  Visit                  │
│  Events                 │
│  About                  │
│  Support                │
│                         │
│  [Plan Your Visit]      │  ← Primary CTA
│  [Book Tickets]         │  ← Secondary CTA
└─────────────────────────┘
```

---

## Alternative: Quick Wins Only

If full restructure isn't feasible, these changes alone would help:

1. **Add /almanac to a dropdown** (About or Visit)
2. **Add /explore to About dropdown**
3. **Add /evidence/timeline to Evidence Room** (via internal nav on /evidence)
4. **Add /programs or merge into /events**
5. **Add "Home" to utility nav** (some users expect it)

Estimated effort: 1-2 hours
Impact: Fixes orphan page problem without restructure

---

_Document created February 3, 2026 for Rocky Mount navigation review_
