# Document Viewer & Library Export Feature Brainstorm

**Date:** 2026-01-30
**Context:** Tennessee Starts Here Evidence Room
**Current System:** 38 markdown documents, Evidence Transparency Engine

---

## Executive Summary

This document explores enhancement opportunities for the Tennessee Starts Here Evidence Room's document viewer and library export capabilities. The current system excels at document presentation and citation but lacks comprehensive export and advanced reading tools. Below are prioritized recommendations based on user needs, technical feasibility, and site mission.

---

## 1. Current State Assessment

### What Exists Now

**Document System (✅ Excellent)**

- 38+ primary source documents in markdown format (`/content/documents/`)
- Gray-matter frontmatter with rich metadata (date, type, author, recipient, collection)
- Passage extraction system (`<passage id="...">...</passage>` tags)
- Document-to-document threading (responds_to, responses)
- People-to-document linking (author, recipient, people_mentioned)
- Collection organization (Blount Papers, Washington Papers, etc.)
- Verification badges (verified, single-source, nuance, under-review)

**Viewer Features (✅ Good)**

- Clean markdown rendering with ReactMarkdown
- Syntax highlighting for passages
- Scroll-to-passage on deep link (`/documents/slug#passage`)
- Source attribution with external links
- Verification method display
- Mobile-responsive layout
- Accessibility features (skip links, ARIA labels)

**Citation Export (✅ Solid Foundation)**

- MLA, APA, Chicago citation formats
- Copy-to-clipboard functionality
- Deep link support (includes passage anchors)
- Visual feedback on copy

**Search & Discovery (✅ Good)**

- Full-text search with Fuse.js
- Filter by collection, type, author, date range
- Sort by date or relevance
- Document teasers with preview text

### What's Missing

**Export Capabilities**

- No PDF export (print-optimized layouts)
- No DOCX export (editable documents)
- No bulk download (ZIP of collection)
- No structured data export (JSON, CSV)
- No scholarly XML (TEI format)
- No citation manager export (BibTeX, EndNote)
- No Markdown export (original format)

**Reading Experience**

- No side-by-side document comparison
- No annotation or highlighting system
- No bookmarking capability
- No reading progress tracking
- No reader mode (distraction-free)
- No document-to-document navigation within viewer
- No inline document relationships display

**Archival Features**

- No IIIF manifest support
- No version history
- No transcription confidence indicators
- No manuscript image integration
- No OCR text alignment

---

## 2. Planned Features from Documentation

### From PROJECT.md

- **No export features mentioned** - Original spec focused on event calendar and visit info
- Evidence Room was a post-launch addition

### From V2-ROADMAP.md

- **Focus:** User accounts, native apps, paid infrastructure
- **Not relevant to document export** - Roadmap is for Almanac feature

### From TODO-FUTURE.md

- **Focus:** Almanac enhancements (voice briefing, best window)
- **No evidence room plans**

### From EVIDENCE-LIBRARY-REDIRECT.md

- Documents the migration from `/evidence/library` (6 hardcoded docs) to `/evidence/documents` (37+ markdown files)
- Current system is **content-driven and scalable**
- Suggests future work: "Update sitemap, monitor analytics"

**Conclusion:** No document export/viewer features are currently planned. This is greenfield territory.

---

## 3. User Needs Analysis

### Target Audiences

#### 1. Teachers & Educators (K-12, College)

**Primary Needs:**

- Classroom-ready materials (PDF export)
- Student worksheets (DOCX with fillable sections)
- Citation templates (simplified formats)
- Lesson plan integration (editable documents)
- Offline access (download for rural classrooms)

**Pain Points:**

- Can't easily print documents for class
- Need to cite sources for student research
- Want to create custom packets from multiple documents
- Limited time to format materials

**Use Cases:**

- "I need to print 5 primary sources for tomorrow's class"
- "Can I export this with the citation already included?"
- "I want to create a compare/contrast worksheet for these two letters"

#### 2. Academic Researchers (Historians, Grad Students)

**Primary Needs:**

- Structured data export (JSON, CSV for analysis)
- TEI XML for digital humanities projects
- BibTeX/EndNote for reference managers (Zotero, Mendeley)
- Bulk downloads (entire collections)
- Manuscript images linked to transcriptions

**Pain Points:**

- Manual citation formatting is tedious
- Need structured data for computational analysis
- Want to integrate with existing research workflows
- Require scholarly standards (TEI encoding)

**Use Cases:**

- "I'm analyzing Blount's correspondence network - need all his letters as structured data"
- "Can I export these citations directly to Zotero?"
- "I want to compare word frequency across all treaty documents"

#### 3. Genealogists & Family Historians

**Primary Needs:**

- Person-centric document bundles (all docs mentioning ancestor)
- GEDCOM integration (future: link to family trees)
- PDF reports with sourcing for publishing
- Document timeline views

**Pain Points:**

- Hard to find all references to specific people
- Need proper citations for family history publications
- Want offline archives for personal records

**Use Cases:**

- "Show me every document mentioning John Sevier"
- "I need a PDF packet of all Cherokee signatories"
- "Export a timeline of William Blount's correspondence"

#### 4. Journalists & Media

**Primary Needs:**

- Quick citation copy (AP style)
- High-res images for print
- Fact-checking sources
- Shareable snippets for social media

**Pain Points:**

- Need attribution quickly
- Want visually appealing excerpts
- Require verification status at a glance

**Use Cases:**

- "Copy this quote with source attribution for my article"
- "Download a shareable image of this passage"
- "Verify this claim against primary sources"

#### 5. Museum Visitors & Casual Learners

**Primary Needs:**

- Easy reading experience (no distractions)
- Bookmarks for later (return to interesting docs)
- Sharing with friends/family
- Print for home reading

**Pain Points:**

- Information overload
- Hard to keep track of what they've read
- Want to share discoveries easily

**Use Cases:**

- "Bookmark this document to read later"
- "Email this to my dad who loves Tennessee history"
- "Print this for my flight home"

---

## 4. Comprehensive Feature Wishlist

### A. Export Formats

#### PDF Export (HIGH PRIORITY)

**What:** Generate print-optimized PDFs with headers, page numbers, citations

**Variations:**

- **Academic:** Footnotes, page numbers, bibliography format
- **Classroom:** Large text, discussion questions included
- **Archive:** Includes metadata, verification badges, QR code to online version

**Technical Approach:**

- **Client-side:** `react-pdf` or `jsPDF` (works in browser, no server needed)
- **Server-side:** Puppeteer or Playwright (better quality, requires Edge Function)
- **Hybrid:** Pre-generate PDFs at build time, serve statically (fastest, scales best)

**Implementation Complexity:** Medium
**Cost:** Low (Edge Function: ~$0.001/render)
**User Value:** High (top request from educators)

---

#### DOCX Export (MEDIUM PRIORITY)

**What:** Editable Word documents for classroom worksheets

**Use Cases:**

- Teachers add comprehension questions
- Students annotate during research
- Researchers mark up transcriptions

**Technical Approach:**

- `docx` npm package (client-side generation)
- Convert markdown to Word format
- Preserve formatting, add styles

**Implementation Complexity:** Medium-High
**Cost:** None (client-side)
**User Value:** High for educators, medium for others

---

#### Plain Text Export (LOW PRIORITY)

**What:** Copy document as plain text (no markdown)

**Why Useful:**

- Paste into emails
- Screen reader friendly
- Low-bandwidth scenarios

**Implementation Complexity:** Low (simple markdown stripping)
**Cost:** None
**User Value:** Low (niche use case)

---

#### JSON Export (MEDIUM PRIORITY)

**What:** Structured data export for computational analysis

**Contents:**

```json
{
  "id": "blount-arrival-1790",
  "title": "Blount to Secretary of War",
  "date": "1790-10-20",
  "author": { "id": "william-blount", "name": "William Blount" },
  "content": "...",
  "passages": [...],
  "verification": {...}
}
```

**Use Cases:**

- Digital humanities research
- Network analysis (who wrote to whom?)
- Text mining / sentiment analysis
- API integration

**Implementation Complexity:** Low (data already in this format)
**Cost:** None
**User Value:** High for researchers, low for general public

---

#### CSV Export (MEDIUM PRIORITY)

**What:** Tabular export for spreadsheet analysis

**Best For:**

- Collection metadata (all documents in a collection)
- People directory (all signatories with roles)
- Citation lists

**Example: Blount Papers Collection CSV**

```csv
id,title,date,author,recipient,type,url
blount-arrival-1790,"Blount to Secretary of War",1790-10-20,william-blount,henry-knox,letter,https://...
```

**Implementation Complexity:** Low
**Cost:** None
**User Value:** Medium (useful for educators creating timelines)

---

#### TEI XML Export (LOW PRIORITY)

**What:** Text Encoding Initiative standard for scholarly digital archives

**Why Important:**

- Academic standard for digital humanities
- Preserves semantic structure
- Interoperable with other archives

**Reality Check:**

- Very few users need this
- Complex to implement correctly
- Consider if Rocky Mount partners with digital humanities projects

**Implementation Complexity:** High
**Cost:** None
**User Value:** Low (niche academic use)

---

#### Markdown Export (LOW PRIORITY)

**What:** Download original markdown file

**Use Cases:**

- Developers forking the project
- Researchers building their own archives
- Backup / archival purposes

**Implementation Complexity:** Very Low (files already exist)
**Cost:** None
**User Value:** Very Low (technically savvy users only)

---

#### Citation Manager Export (HIGH PRIORITY)

**What:** BibTeX, EndNote XML, RIS formats for reference managers

**Why Critical:**

- Researchers use Zotero, Mendeley, EndNote
- Manual entry is error-prone and tedious
- Standard feature on academic archives

**Formats to Support:**

1. **BibTeX** (LaTeX users, most common)
2. **RIS** (EndNote, RefWorks, Mendeley)
3. **Zotero API** (direct import to Zotero)

**Example BibTeX Output:**

```bibtex
@misc{blount1790arrival,
  title={Blount to Secretary of War},
  author={Blount, William},
  year={1790},
  month={10},
  howpublished={Rocky Mount State Historic Site, \url{https://tennesseestartshere.com/evidence/documents/blount-arrival-1790}},
  note={Original source: Tennessee Encyclopedia}
}
```

**Implementation Complexity:** Medium
**Cost:** None
**User Value:** Very High for academics

---

### B. Viewer Enhancements

#### Side-by-Side Document Comparison (HIGH PRIORITY)

**What:** Display two documents in split view for analysis

**Use Cases:**

- Compare Washington's question with Knox's response
- Track conversation threads (letter chains)
- Analyze treaty original vs. amended version

**UI Design:**

```
┌─────────────────┬─────────────────┐
│ Document A      │ Document B      │
│                 │                 │
│ [Content...]    │ [Content...]    │
│                 │                 │
│ Synchronized    │ Synchronized    │
│ scrolling       │ scrolling       │
└─────────────────┴─────────────────┘
```

**Features:**

- Linked scrolling (optional)
- Highlight matching passages
- Side-by-side citations
- Mobile: swipe between docs

**Implementation Complexity:** Medium
**Cost:** None
**User Value:** Very High for researchers and educators

---

#### Annotation System (V2 - Requires Accounts)

**What:** Users highlight passages, add personal notes

**Why V2:**

- Requires user accounts for data persistence
- Privacy concerns (public vs. private notes)
- Moderation if annotations are public

**Capabilities:**

- Highlight text with colors
- Add margin notes
- Tag passages for later retrieval
- Export annotated version as PDF

**Implementation Notes:**

- Consider Hypothesis.io integration (open-source web annotation)
- Or build custom with Supabase Auth

---

#### Bookmarking / Reading List (V2 - Requires Accounts)

**What:** "Save for later" button, personal reading list

**Why V2:**

- Needs persistent storage across sessions
- User account required

**Alternative for V1:**

- Browser localStorage (ephemeral, device-specific)
- URL sharing: "Copy link to resume reading"

---

#### Reading Progress Tracking (LOW PRIORITY)

**What:** "You're 40% through this document"

**Why Low:**

- Documents are short (most <2000 words)
- Academic reading is non-linear (jump to passages)
- Better for long-form books/articles

**Skip This:** Not valuable for primary source documents

---

#### Reader Mode (MEDIUM PRIORITY)

**What:** Distraction-free reading view (hide nav, sidebars)

**Features:**

- Full-screen reading
- Adjustable font size
- Sepia/dark mode
- "Exit reader mode" button

**Implementation Complexity:** Low (CSS + state management)
**Cost:** None
**User Value:** Medium (nice-to-have for immersive reading)

---

#### Document-to-Document Navigation in Viewer (HIGH PRIORITY)

**What:** "Previous/Next in Collection" buttons within document view

**Current Gap:**

- User must return to `/evidence/documents` to browse
- No context about where doc fits in collection

**Solution:**

```
┌─────────────────────────────────────────┐
│ ← Previous: Washington to Knox (Aug 13) │
│                                         │
│ [Document Content]                      │
│                                         │
│ Next: Blount to Knox (Nov 15) →        │
│                                         │
│ Part 3 of 12 in Blount Papers          │
└─────────────────────────────────────────┘
```

**Implementation Complexity:** Medium (already have collection data)
**Cost:** None
**User Value:** High (improves discovery, flow)

---

#### Inline Document Relationships (HIGH PRIORITY)

**What:** Show "Responds to" and "Responses" within document view

**Current State:**

- Metadata exists in frontmatter (`responds_to`, `responses`)
- Not displayed in viewer

**Proposed UI:**

```
┌──────────────────────────────────────┐
│ This letter responds to:             │
│ → Washington to Knox (Aug 13, 1790)  │
│                                      │
│ Responses to this letter:            │
│ → Knox to Blount (Sep 2, 1790)       │
│ → Blount to Knox (Nov 15, 1790)      │
└──────────────────────────────────────┘
```

**Implementation Complexity:** Low (data already in types.ts)
**Cost:** None
**User Value:** Very High (reveals conversation threads)

---

#### Interactive Timeline Integration (MEDIUM PRIORITY)

**What:** Click document in timeline, opens in viewer

**Current State:**

- Timeline exists on `/evidence` page
- No link to individual documents

**Enhancement:**

- Timeline events clickable
- Opens document in modal or navigates to detail page
- Highlight document's position in timeline

**Implementation Complexity:** Medium
**Cost:** None
**User Value:** Medium (nice discovery mechanism)

---

#### Search Within Document (LOW PRIORITY)

**What:** Ctrl+F replacement with highlighting

**Reality Check:**

- Browser Ctrl+F already works
- Documents are short (< 2000 words typically)
- Not needed unless documents get much longer

**Skip This:** Browser native search is sufficient

---

### C. Database Export Options

#### Full Archive Download (ZIP) (MEDIUM PRIORITY)

**What:** Download all documents as ZIP file

**Contents Options:**

**Option A: Markdown Source**

- `/documents/*.md` (original files)
- `/people/*.md`
- `/collections/*.md`
- README with file structure

**Option B: Rendered HTML**

- Each document as standalone HTML
- Includes CSS for offline viewing
- index.html with links

**Option C: Multi-Format Bundle**

- Markdown, PDF, and DOCX for each document
- Citation list (all formats)
- Metadata as JSON

**Best Approach:** Option A (markdown source)
**Why:** Simplest, most future-proof, smallest file size

**Implementation Complexity:** Medium
**Cost:** None (client-side ZIP generation with JSZip)
**User Value:** High for researchers, archivists

---

#### Filtered Exports (HIGH PRIORITY)

**What:** "Export all documents by date range / type / collection"

**Use Cases:**

- "Export all Blount letters from 1790"
- "Download all treaty documents"
- "Get everything mentioning Cherokee Nation"

**UI Integration:**

- Add "Export filtered results" button to search page
- Select format (PDF, ZIP, CSV metadata)

**Implementation Complexity:** Medium
**Cost:** None
**User Value:** Very High (targeted research)

---

#### API Endpoints (V2 - Requires Infrastructure)

**What:** RESTful API for programmatic access

**Why V2:**

- Requires rate limiting (prevent abuse)
- Documentation overhead
- Potential CORS complexity

**Example Endpoints:**

```
GET /api/documents?collection=blount-papers
GET /api/documents/:id
GET /api/people/:id/documents
GET /api/collections/:id
```

**Response Format:** JSON with full metadata

**Implementation Complexity:** Medium
**Cost:** None (Vercel Edge Functions)
**User Value:** High for developers, low for general public

**Decision:** V2 only if demand exists

---

#### RSS Feeds (LOW PRIORITY)

**What:** Subscribe to new document additions

**Reality Check:**

- Archive is historical (not adding docs frequently)
- 38 documents already, growth likely slow
- Low user demand for this use case

**Skip This:** Not needed for historical archive

---

#### IIIF Manifest Export (LOW PRIORITY)

**What:** International Image Interoperability Framework support

**Why Relevant:**

- Enables integration with IIIF-compliant viewers (Mirador, Universal Viewer)
- Standard for digital libraries
- Allows high-res manuscript image zooming

**Reality Check:**

- Requires manuscript images (don't have for most docs)
- Complex to implement correctly
- Most valuable if Rocky Mount digitizes original manuscripts

**Recommendation:** Wait until manuscript imaging project happens

---

## 5. Implementation Priorities

### Phase 1: Quick Wins (1-2 weeks)

**A. Enhanced Citation Export**

- Add BibTeX format
- Add RIS format
- Add "Download citation" button next to "Cite"

**B. Document Navigation**

- Previous/Next buttons in viewer
- Collection context ("Part 3 of 12")
- Inline relationship display (responds_to, responses)

**C. Basic PDF Export**

- Single-document PDF generation
- Includes citation footer
- Print-optimized layout

**D. Reader Mode**

- Toggle for distraction-free reading
- Font size adjustment
- Sepia/dark themes

**Impact:** High user value, low complexity
**Effort:** ~40 hours
**Cost:** $0

---

### Phase 2: Core Enhancements (3-4 weeks)

**A. Filtered Exports**

- "Export search results" button
- Format selection (PDF, CSV, ZIP)
- Collection bundles

**B. Side-by-Side Comparison**

- Split view for two documents
- Synchronized scrolling
- Mobile: swipe between docs

**C. Bulk Download (ZIP)**

- Full archive export
- Markdown + metadata
- Offline viewing instructions

**D. DOCX Export**

- Editable Word documents
- Preserve formatting
- Citation included

**Impact:** Very high for educators and researchers
**Effort:** ~80 hours
**Cost:** $0

---

### Phase 3: Advanced Features (Future)

**A. TEI XML Export**

- Scholarly standard encoding
- For digital humanities projects
- Consider if partnering with universities

**B. API Endpoints**

- RESTful access
- Rate limiting
- Documentation

**C. Annotation System (Requires V2/Auth)**

- User highlights and notes
- Public vs. private annotations
- Export annotated versions

**Impact:** Medium (niche audiences)
**Effort:** ~120 hours
**Cost:** $0-50/month (if API abuse requires rate limiting infrastructure)

**Decision:** Wait for user demand signals

---

## 6. Competitive Analysis

### What Similar Sites Offer

#### Founders Online (National Archives)

**URL:** founders.archives.gov

**Features:**

- ✅ Search across all documents
- ✅ Citation export (multiple formats)
- ✅ Print-friendly view
- ✅ Permalink to specific paragraphs
- ✅ Advanced search (by person, date, location)
- ❌ No PDF export
- ❌ No side-by-side comparison
- ❌ No bulk download

**Lessons:**

- Citation export is table stakes for scholarly archives
- Paragraph-level permalinks enable precise citation
- Print view is sufficient (PDF not required)

---

#### Yale Avalon Project

**URL:** avalon.law.yale.edu

**Features:**

- ✅ Clean document display
- ✅ Document navigation (chronological)
- ✅ Print view
- ❌ No search within site (relies on Google)
- ❌ No citation export
- ❌ Very basic styling

**Lessons:**

- Usability matters (Avalon is hard to navigate)
- Document context is important (what came before/after)
- Modern design reduces friction

---

#### Papers of the War Department

**URL:** wardepartmentpapers.org

**Features:**

- ✅ Advanced search
- ✅ TEI XML download (scholarly standard)
- ✅ Person/place/event indexes
- ✅ Transcription guidelines transparency
- ❌ Cluttered interface
- ❌ No mobile optimization

**Lessons:**

- Structured data export valuable for researchers
- Transcription methodology should be documented
- Mobile experience matters (60%+ users)

---

#### DigiTreaties

**URL:** digitreaties.org

**Features:**

- ✅ High-res manuscript images
- ✅ Zoom viewer (IIIF)
- ✅ Transcriptions linked to images
- ✅ Download manuscript as PDF
- ❌ No full-text search
- ❌ Basic navigation

**Lessons:**

- Image quality matters when available
- Linking transcription to manuscript is powerful
- User experience still needs work (clunky interface)

---

### Tennessee Starts Here's Advantages

**What We Do Better:**

1. Modern, mobile-first design
2. Evidence Transparency Engine (claim → passage → document chain)
3. Verification badges (trust signals)
4. Collection organization (contextualized documents)
5. Cherokee representation (bilingual names, cultural context)
6. Accessibility focus (ARIA labels, skip links, screen reader tested)

**Where We Can Improve:**

1. Export capabilities (match Founders Online)
2. Citation manager integration (BibTeX, RIS)
3. Document comparison tools
4. Bulk download options

---

## 7. Technical Requirements

### Technologies Already in Stack

- ✅ ReactMarkdown (document rendering)
- ✅ gray-matter (frontmatter parsing)
- ✅ Fuse.js (full-text search)
- ✅ Tailwind CSS (styling)
- ✅ Next.js 16 (framework)

### New Dependencies Needed

**For PDF Export:**

- `react-pdf` (23KB) or `jsPDF` (157KB)
- Alternative: Puppeteer in Edge Function (no client bundle)

**For DOCX Export:**

- `docx` (115KB) - generates Word documents

**For ZIP Creation:**

- `jszip` (110KB) - client-side ZIP generation

**For BibTeX/RIS:**

- No dependencies (string formatting)

**Bundle Impact:** +250KB max (still <1MB total)

---

### Performance Considerations

**PDF Generation:**

- Client-side: Slower (1-3 seconds), but free
- Server-side: Faster (<1 second), costs ~$0.001/render
- Recommendation: Pre-generate at build time, cache in `/public/pdfs/`

**ZIP Downloads:**

- Client-side: Works for <50 docs (~5MB)
- Server-side: Required for full archive (38+ docs)
- Recommendation: Client-side for filtered exports, server-side for full archive

**Large Collections:**

- Blount Papers (12 docs): 60KB markdown → ~500KB PDF
- All documents (38 docs): 190KB markdown → ~2MB PDF
- Acceptable for modern connections

---

### Accessibility Requirements

**All Export Features Must:**

- Be keyboard accessible (tab navigation)
- Include ARIA labels ("Download PDF", "Export citations")
- Provide visual feedback (loading spinner, success message)
- Work with screen readers (announce completion)

**PDF Exports Must:**

- Include alt text for any images
- Use semantic heading structure
- Pass WCAG 2.1 AA contrast standards
- Be readable by screen reader software

---

## 8. Cost & Time Estimates

### Phase 1: Quick Wins

| Feature             | Hours  | Complexity | Cost/Month |
| ------------------- | ------ | ---------- | ---------- |
| BibTeX/RIS citation | 8      | Low        | $0         |
| Document navigation | 12     | Medium     | $0         |
| Basic PDF export    | 16     | Medium     | $0\*       |
| Reader mode         | 6      | Low        | $0         |
| **Total**           | **42** | -          | **$0**     |

\*Free if pre-generated at build time; $5-20/month if dynamic with Puppeteer Edge Functions

---

### Phase 2: Core Enhancements

| Feature                 | Hours  | Complexity  | Cost/Month |
| ----------------------- | ------ | ----------- | ---------- |
| Filtered exports        | 20     | Medium      | $0         |
| Side-by-side comparison | 24     | Medium-High | $0         |
| Bulk ZIP download       | 16     | Medium      | $0         |
| DOCX export             | 24     | Medium-High | $0         |
| **Total**               | **84** | -           | **$0**     |

---

### Phase 3: Advanced Features

| Feature                | Hours   | Complexity  | Cost/Month  |
| ---------------------- | ------- | ----------- | ----------- |
| TEI XML export         | 40      | High        | $0          |
| API endpoints          | 32      | Medium-High | $0-50\*     |
| Annotation system (V2) | 80      | High        | $20-100\*\* |
| **Total**              | **152** | -           | **$20-150** |

\*API rate limiting requires Vercel KV or Upstash (~$10-50/month if high traffic)
\*\*Annotation requires Supabase Auth + Database (~$25/month) + moderation labor

---

### ROI Considerations

**High ROI Features (Do First):**

1. Citation export (BibTeX/RIS) - universally requested by academics
2. Document navigation - improves discovery, keeps users on site
3. PDF export - enables offline use, classroom distribution
4. Side-by-side comparison - unique differentiator

**Medium ROI Features (Do Second):** 5. Filtered exports - power user feature, high satisfaction 6. Bulk download - archival value, low usage frequency 7. Reader mode - nice-to-have, low usage

**Low ROI Features (Wait for Demand):** 8. TEI XML - niche audience (digital humanists) 9. API endpoints - unless external developers request 10. Annotation system - requires V2 infrastructure

---

## 9. User Stories

### Teacher Stories

**"As a high school history teacher..."**

1. "I want to export 3 primary sources as a single PDF so I can print packets for my class."
2. "I want to copy a citation in MLA format so my students can properly cite sources."
3. "I want to download a DOCX version so I can add comprehension questions."
4. "I want to compare two letters side-by-side so students can analyze perspectives."

---

### Researcher Stories

**"As a graduate student studying frontier governance..."**

1. "I want to export all Blount letters as BibTeX so I can import them into Zotero."
2. "I want to download metadata as CSV so I can analyze correspondence networks."
3. "I want to export a collection as ZIP so I can work offline during travel."
4. "I want to see document relationships visualized so I can trace conversation threads."

---

### Genealogist Stories

**"As someone researching my Cherokee ancestors..."**

1. "I want to see every document mentioning a specific person so I can build a timeline."
2. "I want to export treaty signatories as PDF so I can include them in my family history book."
3. "I want to download documents in a format I can annotate and preserve."
4. "I want to share specific passages with family members easily."

---

### Journalist Stories

**"As a reporter writing about Tennessee history..."**

1. "I want to copy a quote with attribution in AP style so I can cite it correctly."
2. "I want to download a PDF with verification badges so I can fact-check claims."
3. "I want to see source URLs so I can verify against primary archives."
4. "I want to export a passage as a shareable image for social media."

---

### Casual Visitor Stories

**"As someone visiting Rocky Mount for the first time..."**

1. "I want to bookmark documents to read later at home."
2. "I want to email a document to my friend who loves history."
3. "I want to read without distractions so I can focus on the content."
4. "I want to print a document to read on the plane ride home."

---

## 10. Recommendations

### Immediate Actions (Next 2 Weeks)

**1. Enhanced Citation Export**

- Add BibTeX format (academics' #1 request)
- Add RIS format (EndNote users)
- Keep existing MLA/APA/Chicago

**2. Document Navigation**

- Previous/Next buttons in viewer
- "Part X of Y in Collection" breadcrumb
- Display document relationships (responds_to, responses)

**3. Basic PDF Export**

- Single-document PDF download
- Include citation footer
- Pre-generate at build time (cache in `/public/pdfs/`)

**Impact:** High satisfaction, low complexity, $0 cost
**Effort:** ~40 hours total
**User Benefit:** Enables academic research workflows, classroom use

---

### Short-Term Goals (Next 1-2 Months)

**4. Filtered Export System**

- "Export search results as PDF/ZIP/CSV"
- Collection bundles ("Download Blount Papers")
- Date range exports

**5. Side-by-Side Document Comparison**

- Split view for two documents
- Synchronized scrolling (optional)
- Mobile-friendly (swipe between)

**6. Reader Mode**

- Distraction-free view toggle
- Font size controls
- Sepia/dark theme options

**Impact:** Power-user features, high engagement
**Effort:** ~80 hours total
**User Benefit:** Supports deep research, classroom presentations

---

### Future Considerations (6+ Months)

**Wait for Demand Signals Before Building:**

- TEI XML export (unless digital humanities partnership emerges)
- API endpoints (unless external developers request)
- Annotation system (requires V2 auth infrastructure)

**Monitor Analytics For:**

- Most-downloaded documents (prioritize pre-generating PDFs)
- Most-compared documents (optimize side-by-side view)
- Mobile vs. desktop usage (optimize experience)

---

### Don't Build (Low ROI)

**Features to Skip:**

- RSS feeds (historical archive, not news feed)
- Search within document (browser Ctrl+F works fine)
- Reading progress tracking (documents too short)
- IIIF manifest (requires manuscript images we don't have)

---

## 11. Success Metrics

### Quantitative Metrics

**Engagement:**

- Time on document pages (target: +30% with reader mode)
- Documents per session (target: +50% with navigation improvements)
- Return visitor rate (target: +25% with bookmarking)

**Feature Adoption:**

- % of users clicking "Export" (target: 15-20%)
- Most popular export format (track BibTeX, PDF, DOCX)
- Side-by-side comparison usage (target: 5-10% of sessions)

**Educational Impact:**

- Downloads from .edu domains (track citation exports)
- Classroom materials created (DOCX edits)
- Research papers citing site (Google Scholar alerts)

---

### Qualitative Metrics

**User Feedback:**

- Educator testimonials ("This saved me hours")
- Researcher acknowledgments (citations in publications)
- Accessibility reports (screen reader compatibility)

**Site Reputation:**

- Academic citations (Google Scholar)
- Teacher resource lists (TN State standards alignment)
- Digital humanities community recognition

---

## 12. Next Steps

### Development Roadmap

**Week 1-2: Foundation**

1. Add BibTeX/RIS citation export
2. Implement document navigation UI
3. Create PDF export infrastructure (evaluate client vs. server)

**Week 3-4: Core Features** 4. Build basic PDF export (single document) 5. Implement reader mode toggle 6. Add document relationship display

**Week 5-8: Advanced Features** 7. Build side-by-side comparison view 8. Implement filtered export system 9. Create bulk ZIP download

**Week 9-12: Polish & Optimization** 10. Pre-generate PDFs for most-viewed documents 11. Add export analytics tracking 12. Write user documentation

---

### Documentation Needs

**For Developers:**

- Export system architecture diagram
- PDF generation decision log (client vs. server)
- Citation format specifications (BibTeX, RIS, TEI)

**For Users:**

- "How to Cite" page (with examples for each format)
- "Classroom Use Guide" (for teachers)
- "Research Workflows" (for academics)

---

### Testing Plan

**Before Launch:**

- ✅ Citation formats validate in Zotero, Mendeley, EndNote
- ✅ PDFs pass WCAG 2.1 AA accessibility standards
- ✅ Side-by-side view works on mobile (320px width)
- ✅ Bulk downloads complete successfully (38 docs)
- ✅ Screen readers announce export completion

**Post-Launch:**

- Monitor export feature usage (GA events)
- Collect user feedback (form on export confirmation)
- Track citation errors reported
- A/B test export button placement

---

## Appendix A: Export Format Specifications

### BibTeX Standard Format

```bibtex
@misc{document_id,
  title={Document Title},
  author={Author Name},
  year={1790},
  month={10},
  day={20},
  howpublished={Rocky Mount State Historic Site, \url{https://tennesseestartshere.com/evidence/documents/slug}},
  note={Original source: Source Attribution},
  type={Document Type}
}
```

---

### RIS Standard Format

```ris
TY  - UNPB
TI  - Document Title
AU  - Author Name
PY  - 1790/10/20
UR  - https://tennesseestartshere.com/evidence/documents/slug
PB  - Rocky Mount State Historic Site
N1  - Original source: Source Attribution
ER  -
```

---

### TEI XML Skeleton (for future reference)

```xml
<TEI xmlns="http://www.tei-c.org/ns/1.0">
  <teiHeader>
    <fileDesc>
      <titleStmt>
        <title>Document Title</title>
        <author>Author Name</author>
      </titleStmt>
      <sourceDesc>
        <bibl>Source Attribution</bibl>
      </sourceDesc>
    </fileDesc>
  </teiHeader>
  <text>
    <body>
      <p>Document content...</p>
    </body>
  </text>
</TEI>
```

---

## Appendix B: Competitive Feature Matrix

| Feature                 | TN Starts Here       | Founders Online | Avalon | Papers of War | DigiTreaties |
| ----------------------- | -------------------- | --------------- | ------ | ------------- | ------------ |
| Full-text search        | ✅                   | ✅              | ❌     | ✅            | ❌           |
| Mobile-optimized        | ✅                   | ⚠️ Partial      | ❌     | ❌            | ❌           |
| Citation export         | ✅ (MLA/APA/Chicago) | ✅              | ❌     | ❌            | ❌           |
| BibTeX/RIS export       | ❌ **PRIORITY**      | ❌              | ❌     | ❌            | ❌           |
| PDF download            | ❌ **PRIORITY**      | ❌              | ❌     | ❌            | ✅           |
| Print view              | ✅                   | ✅              | ✅     | ✅            | ✅           |
| Document navigation     | ⚠️ Partial           | ✅              | ✅     | ✅            | ❌           |
| Paragraph permalinks    | ✅ (passage anchors) | ✅              | ❌     | ✅            | ❌           |
| Side-by-side comparison | ❌ **UNIQUE**        | ❌              | ❌     | ❌            | ❌           |
| Verification badges     | ✅ **UNIQUE**        | ❌              | ❌     | ⚠️ Partial    | ❌           |
| Bulk download           | ❌                   | ❌              | ❌     | ✅ (TEI XML)  | ❌           |
| Accessibility (WCAG AA) | ✅                   | ⚠️ Partial      | ❌     | ❌            | ❌           |
| Cherokee representation | ✅ **UNIQUE**        | N/A             | N/A    | N/A           | ⚠️ Partial   |

**Legend:**

- ✅ = Feature exists, works well
- ⚠️ = Feature exists, needs improvement
- ❌ = Feature missing
- **PRIORITY** = Should add soon
- **UNIQUE** = Competitive advantage

---

## Conclusion

The Tennessee Starts Here Evidence Room has a strong foundation but lacks export capabilities that are table stakes for scholarly archives. By prioritizing citation manager integration (BibTeX/RIS), basic PDF export, and document navigation improvements, the site can serve educators and researchers significantly better while maintaining its unique strengths (verification transparency, Cherokee representation, modern UX).

The recommended Phase 1 features (citation export, navigation, PDF, reader mode) deliver high user value with low complexity and zero operational cost. This positions the Evidence Room as a best-in-class digital archive while preserving resources for future enhancements based on actual user demand.

**Key Insight:** Don't build everything at once. Start with exports that integrate into existing research workflows (BibTeX, PDF), then iterate based on analytics and feedback.
