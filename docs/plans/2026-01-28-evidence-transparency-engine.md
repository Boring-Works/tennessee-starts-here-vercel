# Evidence Transparency Engine Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Evidence Room from a content page into a transparency engine where every claim links to its source document at the exact passage.

**Architecture:** Three-layer UX (Story → Documents → Research Tools) with a receipts-first philosophy. Claims become clickable links to primary sources. Cherokee signatories as key differentiator.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, MDX for documents, client-side search (Pagefind or JSON index)

---

## Core Promise

"Every claim is a clickable receipt that opens the original document at the exact spot."

---

## URL Structure

```
/evidence/                           ← Evidence Room (narrative entry)
/evidence/documents/                 ← Document listing with filters
/evidence/documents/[slug]           ← Document viewer with passage anchors
/evidence/people/                    ← People listing
/evidence/people/[slug]              ← Person page
/evidence/collections/               ← Collection listing
/evidence/collections/[slug]         ← Collection landing page
/evidence/timeline                   ← Interactive timeline
```

---

## Data Model

### Document

```typescript
interface Document {
  id: string // "blount-arrival-1790"
  title: string // "Blount to Secretary of War"
  date: string // "1790-10-20"
  content_type: string // "letter" | "treaty" | "proclamation" | "newspaper"
  source: string // "Tennessee Encyclopedia, citing Blount Papers"
  source_url?: string // Link to original if available
  collection: string // "blount-papers"

  // People connections
  author?: string // Person ID
  recipient?: string // Person ID
  people_mentioned: string[] // Person IDs

  // Conversation threading
  responds_to?: string // Document ID
  responses?: string[] // Document IDs

  // Verification
  verification: {
    status: 'verified' | 'single-source' | 'nuance' | 'under-review'
    source_count: number
    method?: string // "Cross-referenced with Founders Online and TN Encyclopedia"
    notes?: string // Nuance warnings
  }

  // Content
  content: string // Full markdown text
  passages: Passage[]
}
```

### Passage

```typescript
interface Passage {
  id: string // "blount-arrival-1790#glass-windows"
  document_id: string
  anchor: string // "glass-windows"
  text: string // The passage content
  line_range: [number, number] // [12, 15]
}
```

### Claim

```typescript
interface Claim {
  id: string // "rocky-mount-had-glass-windows"
  claim: string // "Rocky Mount had glass windows, a status symbol"
  passage_id: string // Links to passage
  verification: 'direct-quote' | 'paraphrase' | 'inference'
}
```

### Person

```typescript
interface Person {
  id: string // "william-blount" or "bloody-fellow"
  name: string // Display name
  name_cherokee?: string // Cherokee name if applicable
  role?: string // "Governor of Southwest Territory"
  town?: string // For Cherokee signatories
  clan?: string // If documented

  bio_type: 'full' | 'basic' // 5 full, 35 basic
  bio_short?: string // For hover cards
  bio_full?: string // For full bio pages

  is_cherokee: boolean // For filtering
  is_signatory: boolean // Treaty signatory
  signature_url?: string // DigiTreaties link to signature

  documents: string[] // Document IDs (auto-linked)
}
```

---

## File Structure

```
/content/
├── documents/
│   ├── blount-arrival-1790.md
│   ├── treaty-holston-1791.md
│   └── ... (37 total)
├── people/
│   ├── william-blount.md
│   ├── bloody-fellow.md
│   └── ... (40 Cherokee + key figures)
├── collections/
│   ├── blount-papers.md
│   ├── treaties.md
│   └── ...
├── passages.json                    ← Extracted passages with anchors
└── claims.json                      ← Claims linked to passages

/lib/evidence/
├── types.ts                         ← TypeScript interfaces
├── loader.ts                        ← Load and parse content
├── search.ts                        ← Search index builder
└── citations.ts                     ← Citation formatting

/components/evidence/
├── DocumentViewer.tsx
├── PassageHighlight.tsx
├── PersonCard.tsx
├── EntryRoom.tsx
├── SearchBar.tsx
├── FilterPanel.tsx
├── Timeline.tsx
├── ConnectionsPanel.tsx
├── CitationExporter.tsx
└── VerificationBadge.tsx

/app/(main)/evidence/
├── page.tsx                         ← Evidence Room (narrative)
├── documents/
│   ├── page.tsx                     ← Document listing
│   └── [slug]/page.tsx              ← Document viewer
├── people/
│   ├── page.tsx                     ← People listing
│   └── [slug]/page.tsx              ← Person page
├── collections/
│   ├── page.tsx                     ← Collection listing
│   └── [slug]/page.tsx              ← Collection landing
└── timeline/
    └── page.tsx                     ← Interactive timeline
```

---

## Phase 1: Foundation (2-3 Documents)

**Goal:** Prove the receipt concept works end-to-end.

### Files Created

```
/content/documents/blount-arrival-1790.md
/content/documents/treaty-holston-1791.md
/content/passages.json               ← Initial passages
/content/claims.json                 ← Initial claims
/lib/evidence/types.ts
/lib/evidence/loader.ts
/app/(main)/evidence/documents/[slug]/page.tsx
/components/evidence/DocumentViewer.tsx
/components/evidence/PassageHighlight.tsx
/components/evidence/VerificationBadge.tsx
```

### Document Format (MDX)

```markdown
---
id: blount-arrival-1790
title: 'Blount to Secretary of War'
date: 1790-10-20
content_type: letter
source: 'Tennessee Encyclopedia, citing Blount Papers'
collection: blount-papers
author: william-blount
recipient: henry-knox
people_mentioned: [william-cobb]
verification:
  status: verified
  source_count: 2
  method: 'Cross-referenced with Founders Online and TN Encyclopedia'
---

At William Cobb's Washington County...

<passage id="glass-windows">
On the 11th instant, I arrived in this country, and was received with every mark of attention and gladness that I could have wished. I am very well accommodated with a Room with Glass Windows, Fireplace, etc., etc., at this place.
</passage>

The accommodations here are...
```

### Acceptance Test

1. User reads "Rocky Mount had glass windows" on Evidence Room
2. User clicks the claim
3. Browser navigates to `/evidence/documents/blount-arrival-1790#glass-windows`
4. Page loads with full document
5. "Glass windows" passage highlighted and scrolled into view
6. Verification badge shows "Verified - 2 sources"
7. User reads surrounding context

---

## Phase 2: Cherokee + Entry Room

**Goal:** Add the differentiator (40 Cherokee signatories) and visual navigation.

### Files Created

```
/content/documents/cherokee-phoenix-1829.md
/content/people/                     ← 40+ person files
/app/(main)/evidence/people/[slug]/page.tsx
/app/(main)/evidence/people/page.tsx
/components/evidence/EntryRoom.tsx
/components/evidence/PersonCard.tsx
```

### People: 5/35 Split

**Full Bio (5 leaders):**

- Hanging Maw
- Bloody Fellow
- John Watts
- Doublehead
- Black Fox

Each gets 2-3 paragraph biography, role in negotiations, what happened after.

**Basic Record (35 signatories):**

- Name (Cherokee + English if available)
- Role/title if documented
- Town if documented
- "Documents mentioning this person" (auto-linked)
- "View signature on treaty →" (DigiTreaties link)

### Entry Room Collections

```
THE ARCHIVE
├── The Blount Papers (9 documents)
├── Treaties & Proclamations (4 documents)
├── The Knoxville Gazette (14 issues)
├── Federal Correspondence (8 documents)
├── Cherokee Signatories (40 people) ← Visually distinct
└── Timeline (visual entry)
```

Cherokee Signatories card should stand out — not buried as one of six equal tiles.

### Acceptance Test

1. User lands on Entry Room
2. Clicks "Cherokee Signatories"
3. Sees 40 named individuals
4. Clicks "Bloody Fellow"
5. Reads full bio + sees linked documents
6. Clicks "View signature on treaty →"
7. Opens DigiTreaties scan at signature position

---

## Phase 3: Scale the Archive

**Goal:** All 37 documents accessible with search.

### Files Created

```
/content/documents/                  ← Remaining 34 documents
/lib/evidence/search.ts
/components/evidence/SearchBar.tsx
/components/evidence/FilterPanel.tsx
/app/(main)/evidence/documents/page.tsx
/app/(main)/evidence/collections/[slug]/page.tsx
```

### Search Implementation

Client-side search. For 37 documents × ~5 passages = ~200 entries. No need for Elasticsearch.

```typescript
// /lib/evidence/search.ts

interface SearchEntry {
  doc_id: string
  passage_id: string
  text: string // Searchable content
  preview: string // What to show in results
  url: string // Deep link with anchor
}

// Build at build time, search client-side
function buildSearchIndex(): SearchEntry[]
function search(query: string): SearchEntry[]
```

Results show matching passage with search term highlighted. Click → land on exact spot.

### Collection Landing Pages

```
/evidence/collections/blount-papers/
/evidence/collections/treaties/
/evidence/collections/knoxville-gazette/
/evidence/collections/federal-correspondence/
/evidence/collections/maps/
```

Each shows:

- Collection description (2-3 sentences)
- Document list with dates
- Key passages from collection
- "Why this collection matters"

Teachers link to these for specific units.

### Document Counts

| Collection               | Documents |
| ------------------------ | --------- |
| Blount Papers            | 9         |
| Treaties & Proclamations | 4         |
| Federal Correspondence   | 8         |
| Knoxville Gazette        | 14        |
| Maps & Visual            | 2         |
| **Total**                | **37**    |

### Acceptance Test

1. User searches "glass windows"
2. Results show Blount's letter with passage preview
3. User clicks result
4. Lands on document at exact passage, highlighted

---

## Phase 4: Research Tools

**Goal:** Timeline, conversation threads, citations.

### Files Created

```
/components/evidence/Timeline.tsx
/components/evidence/ConnectionsPanel.tsx
/components/evidence/CitationExporter.tsx
/app/(main)/evidence/timeline/page.tsx
```

### Interactive Timeline

- 1790-1796 (verify start date against archive)
- Events plotted with document links
- Zoom: year → month → day for dense periods
- Click event → jump to document/passage

### Conversation Threads

Explicit reply chains, not generic "see also":

```
Washington to Knox (Aug 13, 1790)
  "Where ought the Governor to reside?"
    ↓ responds to this
Knox to Washington (Aug 17, 1790)
  [Knox's recommendation]
    ↓ results in
Blount to Secretary of War (Oct 20, 1790)
  "I am very well accommodated..."
```

Display on document pages:

```
← This responds to: Washington to Knox, Aug 13, 1790
→ This was followed by: Blount's second letter, Nov 3, 1790
```

### Citation Export

Formats:

- MLA (high school default, college humanities)
- APA (college social sciences)
- Chicago (college history)
- Copy link (just the permanent URL)

Select passage → copy formatted citation with permanent URL.

### Acceptance Test

1. User on timeline clicks "Treaty of Holston signed"
2. Lands on treaty document
3. Sees "Related: Washington's Proclamation (Nov 1791)"
4. Clicks → lands on proclamation
5. Clicks citation icon → copies Chicago format citation

---

## Phase 5: Narrative Integration

**Goal:** Wire the narrative layer (Layer 1) to the receipt system.

### Prerequisites

- Phases 1-4 complete
- Narrative content written (parallel workstream)

### What Gets Built

- Narrative claims become clickable receipts
- Layer 1 reading experience as "front door"
- Smooth transitions: narrative → document → back

### Parallel Workstream: Narrative Content

Can start immediately. Doesn't require infrastructure.

**Deliverable:** `docs/content/narrative-draft.md`

Writing the narrative first:

- Defines which claims need receipts
- Informs passage extraction in Phases 1-3
- Reduces Phase 5 to "connect the dots"

---

## Future Expansion (Architecture Notes)

The transparency engine infrastructure is designed to generalize beyond historical documents. Future content types may include:

- **Museum artifacts** — Photos, provenance, "view in person" links
- **Photograph archive** — Historical photos with metadata
- **Oral histories** — Audio/video with timestamped transcripts (same anchor system)
- **Educational resources** — Lesson plans, worksheets, finding aids

### Architecture Considerations for Phases 1-3

To avoid painting into a corner:

1. **Generic content_type field** — Already in data model, not hardcoded to "document"
2. **Extensible URL structure** — Can add `/archive/artifacts/`, `/archive/photographs/` later
3. **Search index content_type filter** — Support filtering by type from the start
4. **Person records flexible** — Can link to artifacts, photos, not just documents

### Future URL Structure

```
/archive/                           ← Umbrella for all collections
├── /archive/documents/             ← Historical documents (this plan)
├── /archive/people/                ← Historical figures (this plan)
├── /archive/artifacts/             ← Museum collection items
├── /archive/photographs/           ← Photo archive
├── /archive/oral-histories/        ← Future
└── /archive/collections/           ← Groups across all types

/resources/                         ← Separate from archive
├── /resources/educators/           ← Lesson plans, worksheets
├── /resources/researchers/         ← Finding aids, bibliographies
└── /resources/media/               ← Press kit, logos, b-roll
```

**Note:** "Evidence Room" becomes a curated view into the Archive — the narrative layer with receipts. The Archive is the infrastructure; the Evidence Room is the experience.

Phase 6 (Digital Collections Expansion) will be scoped separately once Phases 1-4 are stable.

---

## Verification Badges

Display on every document:

| Badge             | Meaning                          |
| ----------------- | -------------------------------- |
| **Verified** ✓    | Cross-referenced with 2+ sources |
| **Single Source** | Based on one primary source      |
| **Nuance** ⚠️     | Verified but requires context    |
| **Under Review**  | Being verified                   |

Show methodology on hover/click: "Cross-referenced with Founders Online and TN Encyclopedia"

---

## Timeline Estimates

| Phase     | Scope                        | Estimate        |
| --------- | ---------------------------- | --------------- |
| Phase 1   | 2-3 docs, first receipt      | 2-3 weeks       |
| Phase 2   | 40 people, Entry Room        | 3-4 weeks       |
| Phase 3   | 37 docs, search, collections | 3-4 weeks       |
| Phase 4   | Timeline, threads, citations | 2-3 weeks       |
| Phase 5   | Narrative integration        | 2-3 weeks       |
| **Total** |                              | **12-17 weeks** |

Narrative content (parallel workstream) can begin immediately.

---

## Success Metrics

**Phase 1 complete when:**

- Receipt flow works end-to-end
- 2 documents viewable with passage anchors
- Verification badges display

**Phase 2 complete when:**

- All 40 Cherokee signatories have pages
- 5 full bios written
- Signature links work
- Entry Room navigable

**Phase 3 complete when:**

- All 37 documents standardized
- Search returns passages, not just documents
- Collection landing pages live

**Phase 4 complete when:**

- Timeline navigable
- Conversation threads displayed
- Citations exportable in 3 formats

**Phase 5 complete when:**

- Narrative claims are clickable receipts
- Layer 1 experience is the front door
- End-to-end transparency achieved

---

_Plan created: 2026-01-28_
_Based on: rocky-mount-archive-vision-v2.md, 2026-01-28-evidence-room-and-library.md_
