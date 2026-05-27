# Rocky Mount Digital Archive Directory Structure

**Version:** 1.0
**Effective Date:** January 30, 2026
**Maintained By:** Rocky Mount State Historic Site
**Author:** Dr. Eleanor Hartwell, PhD - Chief Digital Archivist

---

## Purpose

This document defines where all archive files live, the difference between raw sources and processed content, and how information flows from original documents to website display.

---

## Overview

```
tennessee-starts-here/
├── Historical/                    # SOURCE OF TRUTH (Level 1-2)
│   ├── raw/                       # LEVEL 1: Immutable originals
│   │   ├── scans/                 # PDF/image scans
│   │   ├── transcripts/           # External transcription files
│   │   └── sources.json           # Source registry
│   │
│   └── processed/                 # LEVEL 2: Verified transcriptions
│       ├── documents/             # Final verified document text
│       ├── people/                # Final verified person data
│       └── verification-log.md    # Changes to verified content
│
├── content/                       # LEVEL 3: Website source files
│   ├── documents/                 # Markdown for web display
│   ├── people/                    # Person bios for web display
│   ├── collections/               # Collection descriptions
│   └── [research files]           # Working documents
│
├── data/                          # LEVEL 4: Display configuration
│   ├── timeline-events.json       # Timeline display data
│   └── evidence-trails.json       # Navigation/linking data
│
├── lib/evidence/                  # Code for evidence system
│   └── types.ts                   # TypeScript interfaces
│
├── app/(main)/evidence/           # Web pages
│   ├── documents/
│   ├── people/
│   ├── collections/
│   └── timeline/
│
└── docs/                          # Documentation
    ├── ARCHIVE-SCHEMA.md
    ├── ARCHIVE-STANDARDS.md
    ├── ARCHIVE-GOVERNANCE.md
    └── ARCHIVE-DIRECTORY-STRUCTURE.md (this file)
```

---

## Source of Truth Hierarchy

### Level 1: IMMUTABLE RAW SOURCES

**Location:** `/Historical/raw/`

**Contents:**

- Original document scans (PDF, TIFF, JPG)
- External transcription files (from Founders Online, Avalon, etc.)
- Source registry with provenance metadata

**Rules:**

- NEVER modify after initial commit
- No AI access for editing
- Deletions require Director approval
- Git LFS for large files

**Purpose:**

- Permanent archive of what we received
- Audit trail for provenance
- Fallback if questions arise about transcription accuracy

### Level 2: VERIFIED TRANSCRIPTIONS

**Location:** `/Historical/processed/`

**Contents:**

- Clean, verified transcriptions in plain text
- Verified person biographical data
- Change log for all modifications

**Rules:**

- Human verification required before any change
- All modifications logged in verification-log.md
- AI can suggest; humans approve
- This is the SOURCE OF TRUTH for historical facts

**Purpose:**

- Single authoritative version of each document
- Basis for all website content
- What researchers should cite

### Level 3: WEBSITE SOURCE FILES

**Location:** `/content/`

**Contents:**

- Markdown files with YAML frontmatter
- Formatted for web display
- Includes UI elements (passage tags, citation blocks)

**Rules:**

- Must sync with Level 2 for factual content
- Can add display-only content (citations, context)
- Cannot contradict Level 2
- AI can format; humans verify facts

**Purpose:**

- Content management for website
- Git-based editing workflow
- Human-readable source files

### Level 4: DISPLAY CONFIGURATION

**Location:** `/data/`, `/app/`

**Contents:**

- JSON files for timelines, navigation
- React components for display
- CSS styling

**Rules:**

- AI can modify freely
- Standard code review applies
- No historical claims here (data-only)

**Purpose:**

- Website rendering
- User interface
- Navigation and discovery

---

## Detailed Directory Structure

### `/Historical/raw/` - Immutable Sources

```
Historical/raw/
├── scans/
│   ├── blount-papers/
│   │   ├── blount-arrival-1790-scan.pdf
│   │   └── blount-to-knox-1790-11-scan.pdf
│   ├── treaties/
│   │   └── treaty-holston-1791-scan.pdf
│   └── newspapers/
│       └── knoxville-gazette-1791-11-05-scan.pdf
│
├── transcripts/
│   ├── founders-online/
│   │   ├── washington-to-blount-1790-06.txt
│   │   └── blount-commission-1790.txt
│   ├── avalon-project/
│   │   └── treaty-holston-1791.txt
│   └── chronicling-america/
│       └── knoxville-gazette-1791-11-05.txt
│
└── sources.json
```

**sources.json schema:**

```json
{
  "sources": [
    {
      "id": "blount-arrival-1790",
      "files": {
        "scan": "scans/blount-papers/blount-arrival-1790-scan.pdf",
        "transcript": "transcripts/founders-online/blount-arrival-1790.txt"
      },
      "provenance": {
        "original_archive": "National Archives",
        "original_identifier": "RG 59, M588",
        "obtained_date": "2026-01-15",
        "obtained_by": "Cody Boring"
      }
    }
  ]
}
```

### `/Historical/processed/` - Verified Content

```
Historical/processed/
├── documents/
│   ├── blount-arrival-1790.txt
│   ├── blount-commission-1790.txt
│   ├── treaty-holston-1791.txt
│   └── ...
│
├── people/
│   ├── william-blount.json
│   ├── standing-turkey.json
│   └── ...
│
└── verification-log.md
```

**Document file format (plain text with minimal markup):**

```
=== DOCUMENT: blount-arrival-1790 ===
TITLE: Blount to Secretary of War
DATE: 1790-10-20
VERIFIED: 2026-01-15 by Cody Boring
SOURCES: 2 (Founders Online, Tennessee Encyclopedia)

--- BEGIN TRANSCRIPTION ---
At William Cobb's Washington County...

On the 11th instant, I arrived in this country, and was received with
every mark of attention and gladness that I could have wished. I am
very well accommodated with a Room with Glass Windows, Fireplace, etc.,
etc., at this place.

--- END TRANSCRIPTION ---

NOTES:
- Transcription verified against Founders Online
- "11th instant" refers to October 11, 1790
- Glass windows noted as status symbol on frontier
```

**Person file format (JSON):**

```json
{
  "id": "standing-turkey",
  "name": "Standing Turkey",
  "name_cherokee": "Kanetetoka",
  "verified": {
    "date": "2026-01-20",
    "by": "Cody Boring",
    "method": "Reconstructed from U.S. records"
  },
  "biographical_facts": {
    "birth_year": { "value": 1740, "precision": "approximate" },
    "death_year": { "value": 1800, "precision": "approximate" },
    "town": "Tuskegee",
    "faction": "peace",
    "treaty_signatory": true
  },
  "limitations": "No Cherokee-authored documents identified. Biography reflects U.S. perspective only."
}
```

**verification-log.md format:**

```markdown
# Verification Log

## 2026-01-30

### standing-turkey.json

- Changed: death_year from 1795 to 1800
- Reason: Cross-reference with Tennessee Encyclopedia
- Verified by: Cody Boring
- Commit: abc123

### blount-arrival-1790.txt

- Changed: Nothing (initial verification)
- Verified by: Cody Boring
- Sources checked: Founders Online, TN Encyclopedia
- Commit: def456
```

### `/content/` - Website Source Files

```
content/
├── documents/
│   ├── blount-arrival-1790.md
│   ├── treaty-holston-1791.md
│   └── ... (41 documents)
│
├── people/
│   ├── william-blount.md
│   ├── standing-turkey.md
│   └── ... (50 people)
│
├── collections/
│   ├── blount-papers.md
│   ├── treaties.md
│   ├── knoxville-gazette.md
│   └── ... (6 collections)
│
├── timeline-events.json        # Timeline data
├── evidence-trails.json        # Cross-reference data
│
└── [research files]
    ├── FACT-CHECK-REPORT.md
    ├── JACKSON-DENDRO-FACT-CHECK.md
    └── ... (working documents)
```

**Difference from Level 2:**

| Level 2 (processed/) | Level 3 (content/)      |
| -------------------- | ----------------------- |
| Plain text           | Markdown with YAML      |
| Minimal markup       | Passage tags, citations |
| Facts only           | Context sections        |
| Machine-readable     | Human/web-readable      |
| Source of truth      | Display layer           |

### `/data/` - Display Configuration

```
data/
├── timeline-events.json       # What shows on timeline
├── evidence-trails.json       # Navigation relationships
└── ... (other site data)
```

These files contain display logic, not historical claims. They reference content/ files.

### `/lib/evidence/` - Type Definitions

```
lib/evidence/
├── types.ts                   # TypeScript interfaces
└── utils.ts                   # Helper functions
```

The types.ts file must stay synchronized with:

- ARCHIVE-SCHEMA.md (documentation)
- content/ file formats (implementation)

### `/app/(main)/evidence/` - Web Pages

```
app/(main)/evidence/
├── page.tsx                   # /evidence (landing)
├── documents/
│   ├── page.tsx               # /evidence/documents (list)
│   └── [slug]/
│       └── page.tsx           # /evidence/documents/[id]
├── people/
│   ├── page.tsx               # /evidence/people (list)
│   └── [slug]/
│       └── page.tsx           # /evidence/people/[id]
├── collections/
│   └── [slug]/
│       └── page.tsx           # /evidence/collections/[id]
├── timeline/
│   └── page.tsx               # /evidence/timeline
└── library/
    └── page.tsx               # /evidence/library
```

---

## Data Flow

### Document Publication Flow

```
1. OBTAIN SOURCE
   External Archive → Historical/raw/transcripts/

2. SCAN (if available)
   Physical Document → Historical/raw/scans/

3. VERIFY TRANSCRIPTION
   raw/transcripts/ → Human Review → processed/documents/

4. FORMAT FOR WEB
   processed/documents/ → Add frontmatter → content/documents/

5. BUILD WEBSITE
   content/documents/ → Next.js → Public website
```

### Editing Flow (Corrections)

```
1. ERROR DISCOVERED
   User reports issue OR curator finds problem

2. CHECK LEVEL 2
   Is processed/ version correct?

   IF YES → Fix content/ formatting only
   IF NO  → Continue to step 3

3. CHECK LEVEL 1
   Is raw/ source correct?

   IF YES → Fix processed/ transcription → Update content/
   IF NO  → We have wrong source → Major investigation

4. LOG CHANGE
   Update verification-log.md

5. COMMIT
   Git commit with detailed message
```

### New Document Flow

```
1. IDENTIFY SOURCE
   Find document in external archive

2. OBTAIN RAW
   Download transcription → raw/transcripts/
   Download scan if available → raw/scans/
   Update sources.json

3. CREATE PROCESSED
   Verify transcription accuracy
   Create processed/documents/[id].txt
   Log in verification-log.md

4. CREATE CONTENT
   Create content/documents/[id].md with frontmatter
   Add passage markup
   Add citation block

5. UPDATE REFERENCES
   Add to collections if applicable
   Update timeline if relevant
   Link people_mentioned

6. REVIEW & MERGE
   Pull request
   Human review
   Merge to main
```

---

## Naming Conventions

### File Names

| Level            | Pattern           | Example                        |
| ---------------- | ----------------- | ------------------------------ |
| Raw scans        | `{id}-scan.{ext}` | `blount-arrival-1790-scan.pdf` |
| Raw transcripts  | `{id}.txt`        | `blount-arrival-1790.txt`      |
| Processed docs   | `{id}.txt`        | `blount-arrival-1790.txt`      |
| Processed people | `{id}.json`       | `standing-turkey.json`         |
| Content docs     | `{id}.md`         | `blount-arrival-1790.md`       |
| Content people   | `{id}.md`         | `standing-turkey.md`           |
| Collections      | `{id}.md`         | `treaties.md`                  |

### Folder Organization

Raw sources are organized by origin:

```
raw/scans/{collection}/
raw/transcripts/{source-name}/
```

Processed files are flat (one directory per type):

```
processed/documents/
processed/people/
```

Content files are flat (one directory per type):

```
content/documents/
content/people/
content/collections/
```

---

## Migration Plan

### Current State (January 2026)

- Level 3 (content/) exists with 41 documents, 50 people
- Level 4 (data/, app/) exists and functional
- Level 1-2 (Historical/) NOT YET CREATED

### Phase 1: Create Structure

```bash
mkdir -p Historical/raw/scans
mkdir -p Historical/raw/transcripts
mkdir -p Historical/processed/documents
mkdir -p Historical/processed/people
touch Historical/raw/sources.json
touch Historical/processed/verification-log.md
```

### Phase 2: Backfill Critical Documents

Priority documents for Level 1-2 creation:

1. Treaty of Holston (1791)
2. Blount Arrival Letter (1790)
3. Washington's Nomination of Blount
4. Southwest Territory Act
5. Jackson at Rocky Mount (disputed)

### Phase 3: Full Migration

For each content/documents/\*.md:

1. Locate original source
2. Save to raw/transcripts/
3. Create processed/documents/ version
4. Verify content/documents/ matches
5. Log in verification-log.md

### Phase 4: Automation

1. Add validation script: `npm run validate:evidence`
2. Add pre-commit hook for schema validation
3. Add sync check between levels

---

## Access Patterns

### Reading Documents (Website)

```
User Request
    ↓
app/(main)/evidence/documents/[slug]/page.tsx
    ↓
Reads content/documents/[id].md
    ↓
Parses YAML frontmatter + Markdown body
    ↓
Renders page
```

### Verifying Claims (Researcher)

```
Researcher Question: "Is this quote accurate?"
    ↓
Check content/documents/[id].md for claim
    ↓
Check verification status in frontmatter
    ↓
If needed, check Historical/processed/[id].txt
    ↓
If needed, check Historical/raw/ for original
    ↓
Report findings
```

### Adding New Document (Curator)

```
Curator finds document
    ↓
Downloads to Historical/raw/transcripts/
    ↓
Verifies and creates Historical/processed/
    ↓
Creates content/documents/[id].md
    ↓
Submits pull request
    ↓
Human review
    ↓
Merge to main
```

---

## Git Considerations

### LFS for Large Files

Configure Git LFS for:

- `Historical/raw/scans/**/*.pdf`
- `Historical/raw/scans/**/*.tiff`
- `Historical/raw/scans/**/*.jpg`

### .gitignore

```gitignore
# Don't ignore Historical/ - it's part of the archive
# But do ignore temporary processing files
Historical/raw/temp/
Historical/processed/drafts/
```

### Branch Strategy

```
main                    # Production, protected
├── content/[name]      # New document work
├── fix/[issue]         # Corrections
└── migrate/[batch]     # Bulk migration work
```

---

## Validation Checklist

### Level 1 (raw/)

- [ ] sources.json entries for all files
- [ ] Original provenance documented
- [ ] Files named correctly
- [ ] No modifications after commit

### Level 2 (processed/)

- [ ] All documents have verified header
- [ ] verification-log.md up to date
- [ ] Plain text format (no formatting)
- [ ] Matches raw/ source accurately

### Level 3 (content/)

- [ ] YAML frontmatter complete
- [ ] Matches processed/ facts
- [ ] Passage tags properly closed
- [ ] Citation block present
- [ ] All ID references valid

### Level 4 (data/, app/)

- [ ] No historical claims in JSON
- [ ] References resolve to content/
- [ ] Components render correctly

---

## Changelog

| Version | Date       | Changes                     |
| ------- | ---------- | --------------------------- |
| 1.0     | 2026-01-30 | Initial directory structure |

---

_This directory structure ensures clear separation between immutable sources, verified content, and display formatting, enabling scholarly citation while supporting efficient website operations._
