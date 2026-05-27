# Navigation & Sitemap Plan

## Rocky Mount State Historic Site

**Status:** APPROVED
**Locked:** February 3, 2026
**Implementation:** Phased (see below)

---

## Executive Summary

This document defines the approved navigation structure for tennesseestartshere.com. It fixes 5 orphan pages, establishes consistent patterns, and positions Rocky Mount as the regional heritage hub through the "Original Seven" branding.

**Framework:** StoryBrand (visitor is hero, site is guide)
**Strategy:** Regional hub positioning without explicit "welcome center" language

---

## Approved Main Navigation

```
UTILITY BAR:
   📍 Hours & Directions  |  📞 Contact

MAIN NAV:
   PLAN YOUR VISIT  |  EVENTS  |  EXPLORE  |  SUPPORT
```

### PLAN YOUR VISIT Dropdown

| Label                     | URL          | Notes                      |
| ------------------------- | ------------ | -------------------------- |
| Hours & What to Expect    | `/visit`     | Primary landing            |
| Group Tours               | `/groups`    | Tour operators, bus groups |
| Field Trips & Education   | `/educators` | Teachers, curriculum       |
| Programs & Living History | `/programs`  | **FIX: Was orphan**        |

### EVENTS Dropdown

| Label                     | URL                                 | Notes               |
| ------------------------- | ----------------------------------- | ------------------- |
| Events Calendar           | `/events`                           | Full 2026 calendar  |
| Lecture Series            | `/lectures`                         | Speaker series      |
| Colonial Independence Day | `/events/colonial-independence-day` | Signature event     |
| First Families Reunion    | `/events/first-families-reunion`    | Signature event     |
| Stitching Independence    | `/events/stitching-independence`    | **FIX: Was orphan** |

### EXPLORE Dropdown (Styled with Featured Tiles)

```
┌─────────────────────────────────────────────────┐
│  EXPLORE                                        │
│                                                 │
│  ┌─────────────────────────────────────┐        │
│  │ 🗺️ THE ORIGINAL SEVEN              │        │
│  │ It All Started Here.                │        │
│  │ [View the Interactive Map →]        │        │
│  └─────────────────────────────────────┘        │
│                                                 │
│  • Where Tennessee Began     → /our-story       │
│  • The 1775 Almanac          → /almanac         │
│                                                 │
│  ┌─────────────────────────────────────┐        │
│  │ 📜 EVIDENCE ROOM                    │        │
│  │ Primary Sources. Untold Stories.    │        │
│  │ [Enter the Archives →]              │        │
│  └─────────────────────────────────────┘        │
│                                                 │
│  • Historical Timeline       → /evidence/timeline│
│                                                 │
└─────────────────────────────────────────────────┘
```

| Label                 | URL                  | Type          | Notes               |
| --------------------- | -------------------- | ------------- | ------------------- |
| THE ORIGINAL SEVEN    | `/explore`           | Featured Tile | **FIX: Was orphan** |
| Where Tennessee Began | `/our-story`         | Standard link |                     |
| The 1775 Almanac      | `/almanac`           | Standard link | **FIX: Was orphan** |
| EVIDENCE ROOM         | `/evidence`          | Featured Tile | Elevated visibility |
| Historical Timeline   | `/evidence/timeline` | Standard link | **FIX: Was orphan** |

### SUPPORT Dropdown

| Label         | URL           | Notes                    |
| ------------- | ------------- | ------------------------ |
| The First 250 | `/first-250`  | Campaign - Limited badge |
| Membership    | `/membership` |                          |
| Donate        | `/support`    |                          |

---

## Mobile Navigation

Featured items render as full-width tappable cards with background colors:

```
┌─────────────────────────────┐
│  PLAN YOUR VISIT          ▸ │
│  EVENTS                   ▸ │
│  EXPLORE                  ▼ │
│                             │
│  ┌─────────────────────────┐│
│  │ 🗺️ THE ORIGINAL SEVEN  ││
│  │ It All Started Here.    ││
│  │ [View Interactive Map →]││
│  └─────────────────────────┘│
│                             │
│  Where Tennessee Began      │
│  The 1775 Almanac           │
│                             │
│  ┌─────────────────────────┐│
│  │ 📜 EVIDENCE ROOM        ││
│  │ Primary Sources.         ││
│  │ Untold Stories.          ││
│  │ [Enter the Archives →]  ││
│  └─────────────────────────┘│
│                             │
│  Historical Timeline        │
│                             │
│  SUPPORT                  ▸ │
└─────────────────────────────┘
```

**Design tokens for tiles:**

- Original Seven: Territorial Blue background
- Evidence Room: Log Cabin Brown background

---

## Evidence Room Internal Navigation

A standardized sub-nav appears on ALL `/evidence/*` pages:

```
┌─────────────────────────────────────────────────────────────────────┐
│  EVIDENCE ROOM                                                      │
│  ─────────────────────────────────────────────────────────────────  │
│  [Overview]  [Documents]  [Collections]  [People]  [Timeline]       │
└─────────────────────────────────────────────────────────────────────┘
```

| Tab         | URL                     | Purpose                                  |
| ----------- | ----------------------- | ---------------------------------------- |
| Overview    | `/evidence`             | Landing page with CardCatalog            |
| Documents   | `/evidence/documents`   | Searchable document archive              |
| Collections | `/evidence/collections` | Curated collections                      |
| People      | `/evidence/people`      | Historical figures, Cherokee signatories |
| Timeline    | `/evidence/timeline`    | Chronological view                       |

**Replaces:** Inconsistent "← Back to Evidence Room" links, CardCatalog (landing only)

---

## Complete Sitemap

```
/                                    Welcome (splash screen)
└── /home                           Homepage

PLAN YOUR VISIT
├── /visit                          Hours & What to Expect
├── /groups                         Group Tours
├── /educators                      Field Trips & Education
└── /programs                       Programs & Living History

EVENTS
├── /events                         Events Calendar
├── /events/colonial-independence-day
├── /events/first-families-reunion
├── /events/stitching-independence
└── /lectures                       Lecture Series

EXPLORE
├── /explore                        The Original Seven (Interactive Map)
├── /our-story                      Where Tennessee Began
├── /almanac                        The 1775 Almanac
└── /evidence                       Evidence Room
    ├── /evidence/documents         Document Archive
    │   └── /evidence/documents/[slug]
    ├── /evidence/collections       Collections Index
    │   └── /evidence/collections/[slug]
    ├── /evidence/people           People Index
    │   └── /evidence/people/[slug]
    └── /evidence/timeline          Timeline View

SUPPORT
├── /first-250                      First 250 Campaign
├── /membership                     Membership
└── /support                        Donate

FUTURE
└── /america-250                    Commemorative landing (create placeholder)
```

---

## Orphan Page Resolution

| Page                             | Was    | Now                                 |
| -------------------------------- | ------ | ----------------------------------- |
| `/explore`                       | Orphan | Explore dropdown (featured tile)    |
| `/programs`                      | Orphan | Plan Your Visit dropdown            |
| `/almanac`                       | Orphan | Explore dropdown                    |
| `/evidence/timeline`             | Orphan | Explore dropdown + Evidence sub-nav |
| `/events/stitching-independence` | Orphan | Events dropdown                     |

**All 5 orphans resolved.**

---

## Implementation Phases

### Phase 1: Quick Fix (Ship Immediately)

**Effort:** 1-2 hours
**Files:** `data/navigation.json`

1. Rename "Discover" → "Explore"
2. Add `/programs` to Plan Your Visit dropdown
3. Add `/explore` to Explore dropdown
4. Add `/almanac` to Explore dropdown
5. Add `/evidence/timeline` to Explore dropdown
6. Add `/events/stitching-independence` to Events dropdown
7. Rename "School & Group Visits" → "Group Tours"
8. Rename "For Educators" → "Field Trips & Education"
9. Move Educators from Discover/Explore to Plan Your Visit

### Phase 2: Evidence Room Sub-Nav

**Effort:** 4-6 hours
**Files:** New component + all Evidence pages

1. Create `components/evidence/EvidenceNav.tsx`
2. Add to all `/evidence/*` pages
3. Remove inconsistent "← Back" links
4. Keep CardCatalog on landing page (for section navigation within page)

### Phase 3: Styled Mega-Menu

**Effort:** 1 sprint
**Files:** Header component, CSS

1. Build styled Explore dropdown with featured tiles
2. Add background colors for Original Seven and Evidence Room tiles
3. Implement mobile card treatment
4. Test across devices

### Phase 4: SEO & Future Pages

**Effort:** 2-4 hours

1. Update page titles/metadata to match new structure
2. Create `/america-250` placeholder page
3. Update footer to match new nav structure
4. Add breadcrumbs to deep pages

---

## Key Decisions Locked

| Decision                              | Rationale                                                         |
| ------------------------------------- | ----------------------------------------------------------------- |
| 4 main nav items, not 5               | Mobile-friendly; Evidence Room elevated via featured tile instead |
| "Explore" not "Discover"              | Action-oriented; less vague                                       |
| "It All Started Here" tagline         | Anchor play - keeps visitors at Rocky Mount as the hub            |
| Educators under Plan Your Visit       | They're planning a visit (field trip); StoryBrand alignment       |
| Group Tours vs Field Trips separation | Different heroes: tour operators vs teachers                      |
| Evidence Room sub-nav standardized    | Consistent UX across all archive pages                            |

---

## StoryBrand Hero Mapping

| Hero Type         | Entry Point                   | Journey                     |
| ----------------- | ----------------------------- | --------------------------- |
| Day-tripper       | Plan Your Visit               | → Hours → Buy tickets       |
| Educator          | Plan Your Visit → Field Trips | → Curriculum → Book group   |
| Tour Operator     | Plan Your Visit → Group Tours | → Rates → Book group        |
| Event-goer        | Events                        | → Calendar → Specific event |
| Regional Explorer | Explore → Original Seven      | → Map → Heritage trail      |
| History Buff      | Explore → Evidence Room       | → Documents → Timeline      |
| Supporter         | Support                       | → First 250 → Donate        |

---

## Files to Update

| File                                  | Changes                    |
| ------------------------------------- | -------------------------- |
| `data/navigation.json`                | Phase 1 changes            |
| `components/evidence/EvidenceNav.tsx` | New component (Phase 2)    |
| `app/(main)/evidence/*/page.tsx`      | Add EvidenceNav (Phase 2)  |
| `components/Header/*`                 | Styled mega-menu (Phase 3) |
| `lib/copy/metadata.ts`                | Page titles (Phase 4)      |
| `app/(main)/america-250/page.tsx`     | New placeholder (Phase 4)  |

---

## Related Documents

- `content/marketing/HOMEPAGE-BRAINSTORM.md` — Homepage restructure options
- `content/marketing/STORYBRAND-SITEMAP.md` — StoryBrand analysis
- `content/marketing/SITEMAP-BRAINSTORM.md` — Original nav options (6 proposals)

---

_Document locked February 3, 2026. Changes require Director approval._
