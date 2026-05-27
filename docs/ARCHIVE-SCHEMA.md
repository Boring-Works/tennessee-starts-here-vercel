# Rocky Mount Digital Archive Schema

**Version:** 1.0
**Effective Date:** January 30, 2026
**Maintained By:** Rocky Mount State Historic Site
**Architect:** Dr. Eleanor Hartwell, PhD - Chief Digital Archivist

---

## Purpose

This schema defines the complete data model for the Rocky Mount Digital Archive, an open-source historical archive designed to provide transparent, traceable provenance for every historical claim.

Like similar digital humanities projects (Founders Online, Avalon Project, Perseus Digital Library), this archive treats primary sources as sacred and maintains strict separation between:

1. **Original Sources** - What the documents actually say
2. **Transcriptions** - How we render them machine-readable
3. **Interpretations** - What claims we derive from them

---

## Core Principles

### Provenance Chain

Every claim on the website must trace back to a primary source through this chain:

```
Claim -> Passage -> Document -> Source -> Physical Original
```

### Version Integrity

- Original scans and transcriptions are IMMUTABLE after verification
- Corrections create new versions, never overwrite
- Git history provides permanent audit trail

### Attribution Transparency

- Every document states WHO created/modified it and WHEN
- AI-assisted work is clearly labeled
- Human verification status is always visible

---

## Entity Types

### 1. Document

Primary source documents (letters, treaties, newspaper articles, etc.)

**YAML Frontmatter Schema:**

```yaml
---
# === REQUIRED FIELDS ===
id: string # URL-safe identifier: "blount-arrival-1790"
title: string # Human-readable: "Blount to Secretary of War"
date: string # ISO 8601: "1790-10-20" or "1790-10" for uncertain day
content_type: ContentType # See ContentType enum below
source: string # Attribution: "Tennessee Encyclopedia, citing Blount Papers"
collection: string # Parent collection ID: "blount-papers"

# === VERIFICATION (REQUIRED) ===
verification:
  status: VerificationStatus # See VerificationStatus enum
  source_count: integer # Number of independent sources (0-N)
  method: string # How verification was performed
  notes: string # Important caveats or context (optional)

# === PROVENANCE (REQUIRED for v1.1+) ===
provenance:
  original_archive: string # Where physical original lives: "National Archives"
  original_identifier: string # Catalog number: "RG 59, M588, Roll 1"
  transcription_source: string # Where we got text: "Founders Online"
  transcription_date: string # When transcribed: "2026-01-15"
  transcribed_by: string # Who: "AI-assisted (Claude)" or "Dr. Smith"
  verified_by: string # Human verifier: "Cody Boring"
  verified_date: string # When verified: "2026-01-20"

# === PEOPLE CONNECTIONS ===
author: string # Person ID: "william-blount"
recipient: string # Person ID (for letters): "henry-knox"
people_mentioned: string[] # Array of person IDs

# === DOCUMENT THREADING ===
responds_to: string # Document ID this replies to
responses: string[] # Document IDs that reply to this

# === OPTIONAL ENRICHMENT ===
source_url: string # Link to online original
physical_location: string # Connection to Rocky Mount site
description: string # Brief summary for search/SEO
---
```

**ContentType Enum:**

| Value          | Description                         | Example                    |
| -------------- | ----------------------------------- | -------------------------- |
| `letter`       | Personal or official correspondence | Blount to Knox             |
| `treaty`       | Formal agreement between nations    | Treaty of Holston          |
| `proclamation` | Official government announcement    | Washington's Proclamation  |
| `newspaper`    | Periodical publication              | Knoxville Gazette issues   |
| `diary`        | Personal journal entry              | N/A currently              |
| `report`       | Official report or summary          | Inventory documents        |
| `inventory`    | List of items/property              | Rocky Mount Inventory 1791 |
| `legal`        | Laws, acts, legal documents         | Southwest Territory Act    |
| `testimony`    | Witness account, oral history       | Jackson at Rocky Mount     |
| `map`          | Cartographic document               | Bradley Map 1796           |
| `speech`       | Recorded speech or address          | John Watts Boundary Speech |

**VerificationStatus Enum:**

| Value           | Meaning                                    | Source Requirements        |
| --------------- | ------------------------------------------ | -------------------------- |
| `verified`      | Multiple independent sources confirm       | source_count >= 2          |
| `single-source` | One credible source                        | source_count = 1           |
| `disputed`      | Conflicting evidence or scholarly debate   | Must have notes explaining |
| `reconstructed` | Assembled from fragments/secondary sources | Must have notes explaining |
| `unverified`    | Not yet researched                         | source_count = 0           |

### 2. Person

Historical figures mentioned in documents.

**YAML Frontmatter Schema:**

```yaml
---
# === REQUIRED FIELDS ===
id: string # URL-safe: "william-blount" or "standing-turkey"
name: string # Display name: "William Blount"
bio_type: BioType # "full" or "basic"
is_cherokee: boolean # Cultural affiliation
is_signatory: boolean # Treaty of Holston signer

# === CHEROKEE-SPECIFIC (when is_cherokee: true) ===
name_cherokee: string # Cherokee spelling: "Kanetetoka"
name_cherokee_alt: string # Alternative spellings
name_meaning: string # English translation of name meaning
town: string # Town affiliation: "Tuskegee"
clan: string # Clan if documented
faction: string # "peace" or "resistance" (optional)

# === BIOGRAPHICAL ===
role: string # Primary role: "Governor of Southwest Territory"
birth_year: integer # Approximate birth year
death_year: integer # Approximate death year
bio_short: string # One-sentence bio for hover cards

# === DOCUMENT CONNECTIONS ===
documents: string[] # Document IDs connected to this person
signature_url: string # DigiTreaties URL for treaty signatures

# === VERIFICATION ===
verification:
  status: VerificationStatus
  source_count: integer
  method: string
  notes: string # Critical for reconstructed Cherokee biographies
---
```

**BioType Enum:**

| Value   | Description                   | Content Length |
| ------- | ----------------------------- | -------------- |
| `full`  | Complete researched biography | 500-3000 words |
| `basic` | Essential identification info | 50-200 words   |

### 3. Collection

Thematic groupings of related documents.

**YAML Frontmatter Schema:**

```yaml
---
id: string # "blount-papers", "treaties", "knoxville-gazette"
name: string # Display name: "The Blount Papers"
description: string # What this collection contains
why_it_matters: string # Historical significance
document_count: integer # Number of documents (auto-update preferred)
date_range: string # "1790-1792"
key_figures: string[] # Person IDs of major figures
---
```

### 4. Passage

Specific excerpts within documents that support claims.

**Inline Markup (within document body):**

```html
<passage id="glass-windows"> On the 11th instant, I arrived in this country... </passage>
```

**Passage ID Convention:**

- Compound ID: `{document_id}#{passage_anchor}`
- Example: `blount-arrival-1790#glass-windows`

### 5. Claim

Interpretive statements supported by passages.

**Structure (for future implementation):**

```yaml
---
id: string # "rocky-mount-had-glass-windows"
claim: string # The statement
passage_id: string # Supporting passage compound ID
verification: ClaimVerification # "direct-quote" | "paraphrase" | "inference"
---
```

---

## Verification Framework

### Source Count Guidelines

| Count | Interpretation      | Actions Required                       |
| ----- | ------------------- | -------------------------------------- |
| 0     | Unverified/disputed | Mark as disputed, explain in notes     |
| 1     | Single source       | Mark as single-source, identify source |
| 2     | Corroborated        | Can mark as verified                   |
| 3+    | Well-documented     | Strong verification                    |

### Verification Method Examples

Good verification method descriptions:

- "Cross-referenced with Founders Online and Tennessee Encyclopedia"
- "Original at National Archives, digital copy at Avalon Project"
- "Reconstructed from treaty documents and settler correspondence"
- "Secondary sources only; no primary documentation identified"

### Critical Notes for Disputed Claims

When `status: disputed` or `status: reconstructed`, notes MUST explain:

1. What specifically is disputed/uncertain
2. What evidence exists (even if incomplete)
3. What sources were checked
4. Why the claim persists despite limitations

Example (Jackson 1788):

```yaml
verification:
  status: disputed
  source_count: 0
  method: 'Searched Library of Congress Jackson Papers, no primary documentation found'
  notes: 'The six-week stay is cited in secondary sources but no letters, receipts, or contemporary accounts from Jackson himself have been identified. Current buildings date to 1826-1830 per UT dendrochronology.'
```

---

## Relationships

### Document-to-Document

```
Document A (responds_to) --> Document B
Document B (responses) --> [Document A, Document C]
```

### Document-to-Person

```
Document (author) --> Person
Document (recipient) --> Person
Document (people_mentioned) --> [Person, Person, ...]
```

### Person-to-Document

```
Person (documents) --> [Document, Document, ...]
```

### Document-to-Collection

```
Document (collection) --> Collection
Collection --> [Document, Document, ...]
```

---

## ID Conventions

### Document IDs

Format: `{subject}-{action/type}-{date}`

Examples:

- `blount-arrival-1790` (Blount's arrival letter)
- `blount-to-knox-1790-11` (Blount letter to Knox, November 1790)
- `treaty-holston-1791` (Treaty of Holston)
- `knoxville-gazette-1791-11-05` (Newspaper issue date)
- `washington-proclamation-1791` (Presidential proclamation)

### Person IDs

Format: `{firstname}-{lastname}` or `{cherokee-name-english}`

Examples:

- `william-blount`
- `hanging-maw`
- `standing-turkey`
- `bloody-fellow`

### Collection IDs

Format: `{descriptive-name}`

Examples:

- `blount-papers`
- `treaties`
- `federal-correspondence`
- `knoxville-gazette`

---

## Date Handling

### Precision Levels

| Format       | Meaning          | Use When                          |
| ------------ | ---------------- | --------------------------------- |
| `1790-10-20` | Exact date known | Date clearly stated in document   |
| `1790-10`    | Month only       | Day uncertain                     |
| `1790`       | Year only        | Season/month uncertain            |
| `1788-04-01` | Estimated        | Add note: "Estimated Spring 1788" |

### Date Ranges

For collections or events spanning time:

- Single field: `date_range: "1790-1792"`
- Start/end if needed: `date_start: "1790-10-11"`, `date_end: "1792-03-15"`

---

## TypeScript Interface Mapping

This schema maps directly to `/lib/evidence/types.ts`:

| Schema Entity | TypeScript Interface                  |
| ------------- | ------------------------------------- |
| Document      | `Document`, `DocumentFrontmatter`     |
| Person        | `Person`, `PersonFrontmatter`         |
| Collection    | `Collection`, `CollectionFrontmatter` |
| Passage       | `Passage`                             |
| Claim         | `Claim`, `ClaimFrontmatter`           |

---

## Migration Notes

### Current State (v1.0)

As of January 2026, existing documents have:

- Good: `id`, `title`, `date`, `content_type`, `source`, `verification`
- Missing from many: `provenance` block (will add in v1.1)

### Upgrade Path

1. **Phase 1 (Current):** Validate all documents against schema
2. **Phase 2:** Add `provenance` block to all documents
3. **Phase 3:** Implement `Claim` entity for claim tracing
4. **Phase 4:** Add automated schema validation on commit

---

## Schema Validation

### Required Validation Rules

1. All IDs must be unique within their entity type
2. All IDs must be URL-safe (lowercase, hyphens only)
3. All referenced IDs (author, collection, etc.) must exist
4. Dates must be valid ISO 8601
5. `verification.source_count` must match actual sources
6. `disputed` status requires non-empty `notes`

### Recommended Pre-Commit Hook

```bash
npm run validate:evidence
```

(To be implemented: validates all content/\*.md files against schema)

---

## Changelog

| Version | Date       | Changes                |
| ------- | ---------- | ---------------------- |
| 1.0     | 2026-01-30 | Initial schema release |

---

_This schema is designed for GitHub-native workflows. All files are Markdown with YAML frontmatter, version-controlled in Git, and human-readable without special tools._
