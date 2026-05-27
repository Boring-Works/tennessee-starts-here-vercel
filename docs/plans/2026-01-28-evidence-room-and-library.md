# Evidence Room & Document Library Design

## Overview

This design creates a two-tier archival experience for Rocky Mount:

1. **Evidence Room** (`/evidence`) - The curated exhibit. Narrative-driven, highlights key documents with context. For casual visitors who want the story.

2. **Document Library** (`/evidence/library`) - The scholarly archive. Full documents, proper citations, source links. For researchers, educators, and those who want to go deeper.

Both share the same visual language (warm cream, deep brown, brass accents) but serve different purposes.

---

## Part 1: Evidence Room Improvements

### 1.1 The Entry Room (New Section)

**Problem:** Visitors land on the page with no orientation. They see a hero and documents but don't know how to navigate.

**Solution:** After the hero, add an Entry Room that functions as a visual index:

```
┌─────────────────────────────────────────────────────────────┐
│                    WELCOME TO THE ARCHIVE                    │
│                                                              │
│   "Four collections await. Browse by topic or scroll         │
│    to read in sequence."                    ~6 min read      │
│                                                              │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│   │     📜      │  │     🤝      │  │     📚      │         │
│   │  Letters    │  │   Treaty    │  │  Sources    │         │
│   │  4 docs     │  │  Signers    │  │  6 repos    │         │
│   └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
│   ┌─────────────────────────────────────────────────┐       │
│   │  📖 Full Document Library →                      │       │
│   │  "Read complete transcriptions with citations"   │       │
│   └─────────────────────────────────────────────────┘       │
│                                                              │
│              ↓ Or scroll to begin reading ↓                  │
└─────────────────────────────────────────────────────────────┘
```

**Details:**

- 3-4 clickable collection cards that jump to sections
- Each shows icon, name, count
- Mobile: 2x2 grid
- Prominent link to Document Library for scholars
- Reading time estimate (~6 min)

**New Component:** `EntryRoom.tsx`

---

### 1.2 Mobile Navigation (The Guide)

**Problem:** Card catalog only shows at 1024px+. Mobile users have no section navigation.

**Solution:** Floating "Guide" button that expands into mini table of contents.

```
┌─────────────────────────┐
│                         │
│    [page content]       │
│                         │
│                         │
│               ┌───────┐ │
│               │ Guide │ │  ← Fixed, bottom-right
└───────────────┴───────┴─┘

Expanded:
┌─────────────────────────┐
│                         │
│    [page content]       │
│         ┌─────────────┐ │
│         │ × Guide     │ │
│         ├─────────────┤ │
│         │ ● Letters   │ │  ← Current section highlighted
│         │ ○ Timeline  │ │
│         │ ○ Signers   │ │
│         │ ○ Sources   │ │
│         │ ─────────── │ │
│         │ 📖 Library  │ │  ← Link to full library
│         └─────────────┘ │
└─────────────────────────┘
```

**Details:**

- Fixed position, bottom-right
- Brass-colored button matching brand
- Expands upward on tap
- Current section highlighted (Intersection Observer)
- Auto-closes after selection
- CSS-only expand animation (max-height)
- Hidden on desktop (1024px+) where card catalog shows

**New Component:** `MobileGuide.tsx` (client component)

---

### 1.3 The Compass (Back to Top)

Port the existing Compass component from sample projects.

**Source:** `/Users/codyboring/CodyML/projects/TNRocky/TN250v2/v2/components/ui/Compass.tsx`

**Adaptations:**

- Retheme to Reading Room palette:
  - Background: `var(--wood-dark)` instead of `federal-950`
  - Brass: `var(--brass)` instead of `gold-600`
  - Needle: Crimson north, cream south (keep)
- Position: Bottom-left (desktop), above Guide button (mobile)
- Tooltip: "Return North"
- Shows after scrolling 300px
- Needle rotates based on scroll progress

**New Component:** `components/ui/Compass.tsx`

**Site-wide Usage:** Add to main layout for all long pages (Evidence, Library, Visit, etc.)

---

### 1.4 Scroll Progress Bar

Thin brass line at top of viewport showing reading progress.

```css
.progressBar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--brass);
  z-index: 9999;
  transition: width 0.1s ease-out;
}
```

**Implementation:** Use existing `ScrollProgress.tsx`, style with brass color.

---

### 1.5 Microinteractions (CSS-Only)

All animations via CSS transitions. No Framer Motion.

**Paper Curl on Quote Cards:**

```css
.quoteCard::before {
  /* Corner curl effect */
  transition: transform 0.4s ease;
}
.quoteCard:hover::before {
  transform: scale(1.5) rotate(-5deg);
}
```

**Brass Shine on Drawer Pulls:**

```css
.sourceCard::after {
  background-size: 200% 100%;
  transition: background-position 0.6s ease;
}
.sourceCard:hover::after {
  background-position: 0% 0; /* Shine travels across */
}
```

**Signer Card Lift:**

```css
.signerCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
```

**Section Dividers:**

```css
.sectionDivider {
  /* ────────── ◆ ────────── */
  display: flex;
  align-items: center;
  gap: 1rem;
}
.sectionDivider::before,
.sectionDivider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--brass);
  opacity: 0.3;
}
```

---

### 1.6 Additional Polish

**External Link Indicators:**

```tsx
<a href="..." className={styles.externalLink}>
  Founders Online <span aria-hidden="true">↗</span>
</a>
```

**Print Quote Button:**
Small print icon on quote cards. Uses `@media print` to isolate card.

---

## Part 2: Document Library System

### 2.1 Architecture

```
/evidence                    → Evidence Room (curated exhibit)
/evidence/library            → Library Index (all documents)
/evidence/library/[slug]     → Individual Document Page
```

**Categories (for filtering, not routing):**

- `correspondence` - Letters between officials
- `treaties` - Treaty documents
- `proclamations` - Presidential proclamations
- `cherokee-sources` - Cherokee-related documents
- `reports` - Official reports

**Slugs derived from filename:**

- `005-treaty-of-holston-1791-07-02.md` → `treaty-of-holston-1791`
- `003-washington-to-knox-1790-08-13.md` → `washington-to-knox-1790`

---

### 2.2 Design System

**Color Palette:**

```css
:root {
  --library-cream: #fdfbf7;
  --library-brown: #3d3229;
  --library-brown-light: #5c4a3d;
  --library-gold: #c9a227;
  --library-gold-muted: #b8960b;
  --library-rule: rgba(61, 50, 41, 0.15);
}
```

**Typography:**

- Document text: Georgia or Libre Baskerville, 18px, line-height 1.7
- Headings: Existing serif font
- Metadata: Sans-serif, smaller, muted

**Layout:**

- Max content width: 700px
- Generous margins (80px+ on desktop)
- Centered, single-column reading

---

### 2.3 Library Index Page (`/evidence/library/page.tsx`)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    THE DOCUMENT LIBRARY                     │
│                    ─────────────────────                    │
│                                                             │
│   Primary source documents from Tennessee's founding,       │
│   transcribed and verified from original archives.          │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ Filter: [All] [Correspondence] [Treaties] [...]     │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ TREATY                                   Jul 2, 1791 │  │
│   │ Treaty of Holston with the Cherokee                  │  │
│   │ The defining diplomatic achievement of Blount's      │  │
│   │ territorial governance, establishing peace and...    │  │
│   │                                         → Read more  │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ CORRESPONDENCE                          Aug 13, 1790 │  │
│   │ George Washington to Henry Knox                      │  │
│   │ Contains the question "Where ought the Governor      │  │
│   │ to reside?" - the answer was Rocky Mount.            │  │
│   │                                         → Read more  │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   [... more documents ...]                                  │
│                                                             │
│   ← Back to Evidence Room                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Features:**

- Category filter tabs
- Document cards with: type badge, date, title, description
- Sorted by date (newest first) or relevance
- Link back to Evidence Room

---

### 2.4 Document Page Template (`/evidence/library/[slug]/page.tsx`)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  TREATY                                       July 2, 1791  │
│                                                             │
│              Treaty of Holston with the Cherokee            │
│              ───────────────────────────────────            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  "I do hereby enjoin and require all officers of    │   │
│  │   the United States, civil and military...to        │   │
│  │   govern themselves according to the said treaty."  │   │
│  │                                                     │   │
│  │   — George Washington, November 11, 1791            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─── WHY THIS MATTERS ───────────────────────────────────  │
│                                                             │
│  This treaty was the defining diplomatic achievement of     │
│  William Blount's territorial governance. Negotiated at     │
│  the Holston River, it established boundaries between       │
│  the United States and Cherokee Nation that would shape     │
│  Tennessee's formation.                                     │
│                                                             │
│  ─── DOCUMENT ───────────────────────────────────────────  │
│                                                             │
│  [Full transcribed text with proper paragraphs...]          │
│                                                             │
│  Article I - Perpetual peace between U.S. citizens and      │
│  the Cherokee Nation.                                       │
│                                                             │
│  Article II - Cherokee placed under exclusive U.S.          │
│  protection; prohibited from separate treaties...           │
│                                                             │
│  [...]                                                      │
│                                                             │
│  ─── ABOUT THIS SOURCE ──────────────────────────────────  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Author:      William Blount (for the United States)│   │
│  │  Date:        July 2, 1791                          │   │
│  │  Repository:  Avalon Project, Yale Law School       │   │
│  │  Also at:     DigiTreaties, War Department Papers   │   │
│  │                                                     │   │
│  │  [View Original at Avalon Project ↗]                │   │
│  │  [View Manuscript at DigiTreaties ↗]                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─── RELATED DOCUMENTS ──────────────────────────────────  │
│                                                             │
│  • Washington's Proclamation (November 11, 1791)            │
│  • Cherokee Treaty Signatories                              │
│  • Washington to Knox (August 13, 1790)                     │
│                                                             │
│  ═══════════════════════════════════════════════════════   │
│                                                             │
│  Rocky Mount State Historic Site                            │
│                                                             │
│  This document is in the public domain. You may freely      │
│  share, copy, and cite it.                                  │
│                                                             │
│  Suggested citation:                                        │
│  "Treaty of Holston with the Cherokee, July 2, 1791."       │
│  Transcribed by Rocky Mount State Historic Site from        │
│  Avalon Project, Yale Law School.                           │
│  https://tennesseestartshere.com/evidence/library/          │
│  treaty-of-holston-1791                                     │
│                                                             │
│  ← Back to Library    ← Back to Evidence Room               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 2.5 Data Layer

**Option A: Static Generation (Recommended)**

Parse markdown files at build time. Create a data file:

```typescript
// lib/documents/index.ts
export interface Document {
  slug: string
  title: string
  date: string
  dateFormatted: string
  category: 'correspondence' | 'treaties' | 'proclamations' | 'cherokee-sources' | 'reports'
  author?: string
  recipient?: string
  source: string
  sourceUrl: string
  alternateUrls?: string[]
  summary: string
  keyQuotes?: string[]
  fullText: string
  citation: string
  relatedSlugs?: string[]
  rockyMountRelevance: string
}

export const documents: Document[] = [
  // Parsed from markdown files
]

export function getDocument(slug: string): Document | undefined
export function getDocumentsByCategory(category: string): Document[]
export function getAllDocuments(): Document[]
```

**Build Script:** `scripts/parse-documents.ts`

- Reads `/Historical/processed/*.md`
- Parses frontmatter and content
- Outputs to `lib/documents/data.ts`
- Run before build: `npm run parse-docs && npm run build`

**Option B: Runtime Parsing**

Read markdown files directly in page components using `fs`. Works but slower.

**Recommendation:** Option A for performance. Static generation means instant page loads.

---

### 2.6 Document Page Sections

Each document page includes these sections in order:

1. **Header**
   - Document type badge (small, muted, top-left)
   - Date (top-right)
   - Title (large, centered)

2. **Key Quote** (if available)
   - Styled blockquote
   - Attribution below

3. **Why This Matters**
   - 2-3 sentences for general visitors
   - Explains significance without jargon

4. **Document Text**
   - Full transcription
   - Proper paragraphs, articles numbered if applicable
   - Serif font, comfortable reading width

5. **About This Source** (metadata box)
   - Author
   - Recipient (if correspondence)
   - Original date
   - Repository name
   - Links to original sources (open new tab)

6. **Related Documents**
   - Manual links to connected documents
   - Shows title and date

7. **Footer**
   - Rocky Mount attribution
   - License: "Public Domain - You may freely share and cite"
   - Formatted citation for scholars
   - Navigation: Back to Library, Back to Evidence Room

---

## Part 3: Component Architecture

### New Components

```
components/
├── ui/
│   ├── Compass.tsx              # Back-to-top compass (site-wide)
│   └── ScrollProgress.tsx       # Reading progress bar (exists, restyle)
├── evidence/
│   ├── EntryRoom.tsx            # Visual index for Evidence Room
│   ├── MobileGuide.tsx          # Floating mobile navigation
│   ├── SectionDivider.tsx       # Brass rule dividers
│   └── CollectionCard.tsx       # Entry room navigation cards
└── library/
    ├── DocumentCard.tsx         # Index page document preview
    ├── DocumentHeader.tsx       # Type badge + date + title
    ├── KeyQuote.tsx             # Styled blockquote
    ├── WhyThisMatters.tsx       # Significance section
    ├── DocumentText.tsx         # Full text with proper formatting
    ├── SourceMetadata.tsx       # About This Source box
    ├── RelatedDocuments.tsx     # Links to related docs
    ├── DocumentFooter.tsx       # Attribution, license, citation
    └── CategoryFilter.tsx       # Filter tabs for index
```

### Page Structure

```
app/
├── (main)/
│   └── evidence/
│       ├── page.tsx             # Evidence Room (curated exhibit)
│       ├── page.module.css      # Evidence Room styles
│       ├── ContextPanel.tsx     # Expandable context (exists)
│       └── library/
│           ├── page.tsx         # Library Index
│           ├── page.module.css  # Library Index styles
│           └── [slug]/
│               ├── page.tsx     # Document Page
│               └── page.module.css
```

### Shared Styles

```
app/
└── (main)/
    └── evidence/
        └── library/
            └── library.css      # Shared library design system
```

---

## Part 4: Implementation Plan

### Phase 1: Foundation (Do First)

1. **Port Compass component** to `components/ui/Compass.tsx`
   - Retheme colors
   - Add to layout for site-wide use

2. **Create library design system** in `library.css`
   - Color variables
   - Typography
   - Spacing

3. **Create document parser script** `scripts/parse-documents.ts`
   - Parse 5 initial documents
   - Output to `lib/documents/data.ts`

### Phase 2: Document Library

4. **Create Library Index** `/evidence/library/page.tsx`
   - List all documents
   - Category filter
   - Document cards

5. **Create Document Page** `/evidence/library/[slug]/page.tsx`
   - All 7 sections
   - Responsive layout
   - Print styles

6. **Populate 5 initial documents:**
   - Treaty of Holston
   - Washington to Knox
   - Washington's Proclamation
   - Jefferson to Blount
   - Cherokee Signatories

### Phase 3: Evidence Room Improvements

7. **Add Entry Room** to Evidence Room
   - Collection cards
   - Link to Library
   - Reading time

8. **Add Mobile Guide** component
   - Floating button
   - Expandable menu
   - Active section tracking

9. **Add microinteractions**
   - Paper curl
   - Brass shine
   - Card lifts

10. **Add section dividers** between major sections

### Phase 4: Polish

11. **Cross-link Evidence Room and Library**
    - "Read full document" links from quotes
    - "See highlights" links from library

12. **Add scroll progress bar** (site-wide)

13. **Test and refine**
    - Mobile testing
    - Print testing
    - Accessibility audit

---

## Part 5: File Changes Summary

### New Files

| File                                                 | Purpose              |
| ---------------------------------------------------- | -------------------- |
| `components/ui/Compass.tsx`                          | Back-to-top compass  |
| `components/evidence/EntryRoom.tsx`                  | Visual index         |
| `components/evidence/MobileGuide.tsx`                | Mobile navigation    |
| `components/evidence/SectionDivider.tsx`             | Brass dividers       |
| `components/evidence/CollectionCard.tsx`             | Entry room cards     |
| `components/library/DocumentCard.tsx`                | Index preview card   |
| `components/library/DocumentHeader.tsx`              | Page header          |
| `components/library/KeyQuote.tsx`                    | Blockquote styling   |
| `components/library/WhyThisMatters.tsx`              | Significance section |
| `components/library/DocumentText.tsx`                | Full text formatting |
| `components/library/SourceMetadata.tsx`              | Source info box      |
| `components/library/RelatedDocuments.tsx`            | Related links        |
| `components/library/DocumentFooter.tsx`              | Footer with citation |
| `components/library/CategoryFilter.tsx`              | Filter tabs          |
| `app/(main)/evidence/library/page.tsx`               | Library index        |
| `app/(main)/evidence/library/page.module.css`        | Index styles         |
| `app/(main)/evidence/library/[slug]/page.tsx`        | Document page        |
| `app/(main)/evidence/library/[slug]/page.module.css` | Document styles      |
| `app/(main)/evidence/library/library.css`            | Shared styles        |
| `lib/documents/index.ts`                             | Document data layer  |
| `lib/documents/data.ts`                              | Parsed document data |
| `scripts/parse-documents.ts`                         | Markdown parser      |

### Modified Files

| File                                  | Changes                      |
| ------------------------------------- | ---------------------------- |
| `app/(main)/evidence/page.tsx`        | Add Entry Room, Mobile Guide |
| `app/(main)/evidence/page.module.css` | Microinteractions, dividers  |
| `app/(main)/layout.tsx`               | Add Compass component        |
| `package.json`                        | Add `parse-docs` script      |

---

## Part 6: Success Criteria

### For Casual Visitors

- [ ] Can understand what the page offers within 5 seconds (Entry Room)
- [ ] Can navigate on mobile without frustration (Guide button)
- [ ] Can return to top easily (Compass)
- [ ] Feel the page is polished and trustworthy (microinteractions)

### For Researchers/Educators

- [ ] Can find and read full document transcriptions
- [ ] Can verify sources via original links
- [ ] Can cite documents properly (formatted citation)
- [ ] Can share/print documents (public domain notice)

### For the Site

- [ ] Library pages rank for "[document name] transcript" searches
- [ ] Evidence Room links drive deeper engagement to Library
- [ ] Consistent visual language across both sections
- [ ] Fast page loads (static generation)

---

_Design document created: January 28, 2026_
_Ready for implementation_
