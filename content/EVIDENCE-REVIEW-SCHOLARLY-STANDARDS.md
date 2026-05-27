# Evidence Page Review: Scholarly Standards Assessment

**Reviewed:** January 30, 2026
**Project:** Tennessee Starts Here - Evidence Room
**Reviewer Perspective:** Academic Researcher / Digital Humanities Specialist
**Focus:** Citation completeness, metadata quality, primary source access, peer review standards, academic citability

---

## Executive Summary

The Evidence Room represents a **strong foundation** for a public history archive with significant scholarly potential. The implementation demonstrates sophisticated metadata structures, clear verification hierarchies, and thoughtful source attribution. However, the current implementation has **gaps in research rigor** that prevent it from meeting full academic standards for citation and transparency.

### Current State: 7/10 for Scholarly Rigor

**Strengths:**

- Structured metadata for documents (verification status, source counts, methods)
- Direct links to primary manuscript sources (DigiTreaties, Avalon Project)
- Citation export functionality (MLA, APA, Chicago formats)
- Transparent bias disclosure and editorial notes
- Verification badges showing confidence levels

**Critical Gaps:**

- Document ID conflicts in Founders Online citations
- Missing direct archival collection references (repository, call numbers, box/folder)
- No persistent identifiers (DOI, ARK) for archive stability
- Inconsistent citation specificity across timeline and quotes
- Limited metadata for digital preservation and long-term access

---

## 1. Citation Completeness Analysis

### Current Citation Infrastructure

The Evidence Room implements citations at multiple levels:

#### Page-Level Citations

**Location:** `app/(main)/evidence/page.tsx` (lines 285-550)

Each major section includes:

- Source repository link (Founders Online, Tennessee Encyclopedia, etc.)
- Collection identifier (MSS.1790.001, TREATY.1791.001)
- Date ranges (1790-1791, 1791-1796)

**Assessment:** Page-level citations are **adequate for navigation** but **insufficient for academic use**.

#### Document-Level Citations

**Location:** `content/documents/*.md` (frontmatter)

Each document includes:

```yaml
id: blount-arrival-1790
title: Blount to Secretary of War
date: 1790-10-20
source: Tennessee Encyclopedia, citing Blount Papers
source_url: https://tennesseeencyclopedia.net/
verification:
  status: verified
  source_count: 2
  method: Cross-referenced with Founders Online and TN Encyclopedia
```

**Assessment:** Document-level citations are **strong** but need archival specificity.

#### Citation Export Component

**Location:** `components/evidence/CitationExporter.tsx`

Generates citations in MLA, APA, Chicago formats:

```typescript
// MLA: "Title." Rocky Mount State Historic Site, Date. URL.
// APA: Title. (Year, Month Day). Rocky Mount State Historic Site. URL
// Chicago: "Title," Month Day, Year, Rocky Mount State Historic Site, URL.
```

**Assessment:** Excellent for **usability** but **missing critical metadata** for academic papers.

### What's Missing from Citations

#### 1. Repository Information

**Academic Standard:** Researchers need to know WHERE to find originals

Current: `source: "Tennessee Encyclopedia, citing Blount Papers"`

Missing:

- Archive name (e.g., "State Archives of North Carolina")
- Collection ID (e.g., "PC.193 John Gray Blount Papers")
- Box/Folder information
- Call numbers
- Access restrictions

**Example of what's needed:**

```yaml
archival_source:
  repository: 'State Archives of North Carolina'
  collection: 'John Gray Blount Papers'
  collection_id: 'PC.193'
  box: '12'
  folder: '15'
  record_type: 'Letter'
  access: 'Public'
  finding_aid_url: 'https://archives.ncdcr.gov/...'
```

#### 2. Persistent Identifiers

**Academic Standard:** Long-term citation stability requires persistent identifiers

Current: All citations depend on URLs that could change

Missing:

- DOI (Digital Object Identifier) for documents
- ARK (Archival Resource Key) from California Digital Library
- OCLC Control Numbers for published materials
- Handle identifiers for institutional repositories

**Scholarly Impact:**

- Wikipedia and academic databases require DOI for citations
- Institutional repositories need persistent URLs
- If tennesseestartshere.com domain lapses, all citations break

**Recommendation:**

```typescript
// Add to Document interface (lib/evidence/types.ts)
export interface Document {
  // ... existing fields
  doi?: string // e.g., "10.5555/12345678"
  ark?: string // e.g., "ark:/85633/h2d7np78"
  oclc_number?: string // e.g., "ocm01234567"
  handle?: string // e.g., "handle:10.5555/12345678"
}
```

#### 3. Publication Citations

**Academic Standard:** When citing scholarly editions, cite the published version

Current: Blount Papers only cited as "Tennessee Encyclopedia, citing Blount Papers"

Better:

```yaml
source: 'State Archives of North Carolina, John Gray Blount Papers, PC.193'
published_edition: 'Keith, ed., The John Gray Blount Papers, Vol. II (1959), pp. 127-128'
published_edition_url: 'https://oclc.org/...' # OCLC link
```

---

## 2. Metadata Quality Assessment

### Current Metadata Structure

**Location:** `types/evidence.ts` and `lib/evidence/types.ts`

The type system is comprehensive:

```typescript
export interface Document {
  id: string // ✓ Good
  title: string // ✓ Good
  date: string // ✓ Good (ISO format)
  content_type: DocumentContentType // ✓ Good
  source: string // ⚠️ Vague
  source_url?: string // ⚠️ Generic
  collection: string // ✓ Good
  author?: string // ✓ Good (links to people)
  recipient?: string // ✓ Good
  people_mentioned: string[] // ✓ Good
  verification: DocumentVerification // ✓ Good
  passages: Passage[] // ✓ Excellent
}

export interface DocumentVerification {
  status: VerificationStatus // ✓ Good
  source_count: number // ✓ Good
  method?: string // ✓ Good
  notes?: string // ✓ Good
}
```

### Metadata Gaps

#### 1. Missing Dublin Core Elements

**Digital Humanities Standard:** Dublin Core Metadata Initiative (DCMI) defines 15 core elements for digital resources

Current implementation covers:

- ✓ Title, Creator (author), Date, Subject (people_mentioned), Type (content_type), Identifier (id), Source (source_url)

Missing:

- ❌ Description (abstract/summary)
- ❌ Language (assumes English)
- ❌ Rights (copyright/license information)
- ❌ Coverage (geographic or temporal scope)
- ❌ Relation (how documents connect)
- ❌ Format (MIME type for viewing)
- ❌ Publisher (Rocky Mount State Historic Site)
- ❌ Contributor (who transcribed/verified?)

**Recommendation:** Add Dublin Core metadata block:

```typescript
export interface DocumentMetadata {
  // Dublin Core
  dc_title: string
  dc_creator: string // author
  dc_date: string // ISO 8601
  dc_description: string // Summary
  dc_language: string // ISO 639-1 code
  dc_rights: string // License/rights statement
  dc_coverage_temporal?: string // Date range covered
  dc_coverage_spatial?: string // Geographic location
  dc_relation?: string[] // Related documents
  dc_format: string // "text/html", "text/plain", etc.
  dc_publisher: string // Organization
  dc_contributor?: string[] // Transcribers, verifiers

  // Extensions
  mods_genre?: string // MODS genre (letter, treaty, etc.)
  ead_series?: string // EAD series information
  created_date: string // When metadata was created
  modified_date: string // Last update
}
```

#### 2. Missing Provenance Information

**Digital Humanities Standard:** Critical for understanding document authenticity

Current: Only basic source information

Missing:

- Chain of custody (how document came to be digitized)
- Transcription notes (who transcribed, when, accuracy level)
- Digitization method (OCR, manual, hybrid)
- Quality assessment (full text, partial, transcription errors noted)
- Access history (when made public, previous restrictions)

**Example structure:**

```yaml
provenance:
  original_location: 'State Archives of North Carolina, PC.193'
  digitization_date: '2023-06-15'
  digitization_method: 'Manual transcription + OCR verification'
  transcriber: 'Cody Boring'
  ocr_confidence: 0.98 # 98% confidence in OCR
  transcription_notes: 'Original letter heavily faded; readable passages extracted'
  quality_level: 'high' # high, medium, low
  corrections_made: true
  corrections_documented: 'See editorial notes below'
```

#### 3. Missing Technical Preservation Metadata

**Digital Preservation Standard:** Required by NARA and Library of Congress

Current: No preservation metadata

Missing:

- File format and version
- Character encoding
- Compression method
- Virus scan results
- Bit integrity checks (checksums)
- Migration history
- Preservation risk assessment

---

## 3. Primary Source Access Evaluation

### Current Primary Source Links

The Evidence Room provides excellent access to:

| Source                           | Status                 | Quality   | Access                     |
| -------------------------------- | ---------------------- | --------- | -------------------------- |
| DigiTreaties (Treaty of Holston) | ✓ Linked               | Excellent | Direct to manuscript image |
| Avalon Project (Yale Law)        | ⚠️ Mentioned           | Good      | Academic transcription     |
| Founders Online                  | ✓ Linked               | Good      | Government documents       |
| Tennessee Encyclopedia           | ✓ Linked               | Fair      | Secondary source only      |
| NC Archives (Blount Papers)      | ❌ Not directly linked | Unknown   | Requires separate search   |

### Access Quality Issues

#### Issue 1: Inconsistent Manuscript Access

**Problem:** Some primary sources are directly accessible; others are only cited through secondary sources.

**Example:**

- ✓ Treaty of Holston: Can view full 23-page manuscript at DigiTreaties
- ❌ Blount letters: Only cited through Tennessee Encyclopedia (secondary source)

**Solution:** Verify which documents have digital versions available:

```bash
# Documents that need direct primary source links:
1. Blount arrival letter (Oct 20, 1790)
   - Current: Tennessee Encyclopedia
   - Need: Direct link to NC Archives PC.193 or Founders Online

2. Washington to Knox (Aug 13, 1790)
   - Current: Founders Online (but which document ID?)
   - Need: Verify document ID (05-06-02-0135 vs 0076 - CONFLICT)

3. Williamson recommendation (May 28, 1790)
   - Current: Founders Online (but which document ID?)
   - Need: Verify document ID (05-05-02-0277 vs 0268 - CONFLICT)

4. Washington proclamation (Nov 11, 1791)
   - Current: Generic Founders link
   - Need: Direct to document ID (05-09-02-0100)
```

#### Issue 2: No Links to Full Text Transcriptions

**Problem:** Documents are described but not all have readable transcriptions

**What's provided:**

- Document metadata and brief excerpts
- Links to external repositories
- Citation formatting

**What's missing:**

- Full text transcriptions viewable on Tennessee Starts Here
- OCR quality metrics
- Transcription notes and corrections
- Comparison with original images

**Recommendation:** For each document, provide a "Full Text" view with:

```markdown
## Full Transcription

[Complete document text here]

---

## Transcription Notes

- Source: [Archive location]
- Transcribed by: [Name]
- Date transcribed: [Date]
- OCR confidence: [X%]
- Corrections made: [List]
- Difficulty level: [Easy/Moderate/Difficult]
- Original language: [If applicable]
```

#### Issue 3: Missing API Access for Reuse

**Problem:** Data is displayed but not available for machine reuse

**Current:** Web pages only; no structured data export

**Missing:**

- JSON endpoints for documents/metadata
- CSV export of document inventory
- RDF/Linked Data representation
- TEI XML (Text Encoding Initiative) for scholarly interchange
- OAI-PMH metadata harvesting

**Academic Impact:** Researchers cannot programmatically access archive data for:

- Network analysis of document relationships
- Full-text search across all documents
- Citation network mapping
- Computational text analysis

---

## 4. Peer Review & Verification Standards

### Current Verification System

**Location:** `lib/evidence/types.ts` - `VerificationStatus` type

```typescript
type VerificationStatus = 'verified' | 'single-source' | 'nuance' | 'under-review'

interface DocumentVerification {
  status: VerificationStatus
  source_count: number
  method?: string
  notes?: string
}
```

**Assessment:** Good foundation, but lacks formal peer review structure.

### Peer Review Implementation Gaps

#### Gap 1: No Formal Review Process

**Standard:** Academic archives require documented peer review

Current: Documents marked "verified" but no record of:

- Who verified?
- When was it verified?
- What was checked?
- Were there disputes/corrections?

**Recommendation:** Add review metadata:

```yaml
verification:
  status: verified
  source_count: 2
  method: 'Cross-referenced with Founders Online and TN Encyclopedia'

  # NEW: Formal review tracking
  formal_review:
    - reviewer: 'Dr. Jane Smith'
      role: 'Historian, TN Historical Society'
      date: '2026-01-15'
      verdict: 'approved'
      notes: 'Verified against original manuscript at NC Archives'
    - reviewer: 'Cody Boring'
      role: 'Site Director'
      date: '2026-01-10'
      verdict: 'approved_with_notes'
      notes: 'Document date confirmed; small transcription correction made'
```

#### Gap 2: No Public Comments or Corrections

**Standard:** Scholarly resources provide errata and allow community correction

Current: No mechanism for users to report errors or suggest corrections

Missing:

- Comments section for each document
- Errata page tracking known corrections
- Corrections process (how are they reviewed?)
- Citation of corrections (how do researchers know about them?)

**Recommendation:** Add discussion system:

```typescript
export interface DocumentCorrection {
  id: string
  document_id: string
  submitted_by: string
  submitted_date: string
  correction_type: 'transcription' | 'metadata' | 'interpretation' | 'source'
  description: string
  proposed_change: string
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected'
  reviewer?: string
  review_date?: string
  review_notes?: string
}
```

#### Gap 3: No Expert Credentials Documentation

**Standard:** Peer review requires documented expertise

Current: No credentials shown for verifiers

Missing:

- Who made verification decisions?
- What are their qualifications?
- How can users assess credibility?

**Better practice:**

```yaml
verification:
  reviewers:
    - name: 'Cody Boring'
      role: 'Executive Director'
      affiliation: 'Rocky Mount State Historic Site'
      expertise: ['Tennessee history', '19th-century documents']
      orcid: 'https://orcid.org/0000-0000-0000-0000' # If applicable
      verified_passages: ['glass-windows', 'treaty-signers']
```

### Current Verification Badges

**Location:** `components/evidence/VerificationBadge.tsx`

Excellent visual display:

```
✓ Verified     (green) - Multiple independent sources
○ Single Source (yellow) - Only one source but credible
⚠ Nuance       (orange) - Contains claims needing context
… Under Review (gray) - Actively being researched
```

**Recommendation:** Keep these but add tooltips that show:

- Which sources were checked?
- Who verified it?
- When was it verified?
- What exactly was verified?

---

## 5. Academic Citability: Making Evidence Room Citable in Papers

### Current Citation Export

**Component:** `CitationExporter.tsx`

Provides MLA, APA, Chicago formats. Example output:

**MLA:**

```
"Treaty of Holston with the Cherokee." Rocky Mount State Historic Site, 2 July 1791.
https://tennesseestartshere.com/evidence/documents/treaty-holston-1791.
```

**APA:**

```
Rocky Mount State Historic Site. (1791). Treaty of Holston with the Cherokee.
Retrieved from https://tennesseestartshere.com/evidence/documents/treaty-holston-1791
```

**Chicago:**

```
"Treaty of Holston with the Cherokee," July 2, 1791, Rocky Mount State Historic Site,
https://tennesseestartshere.com/evidence/documents/treaty-holston-1791.
```

### What Academic Citations Need

#### 1. Persistent Identifier in Citation

**Current problem:** URL-based citations break if site changes

**Solution:** Add DOI or stable institution ID

**MLA with persistent ID:**

```
"Treaty of Holston with the Cherokee." Rocky Mount State Historic Site, 2 July 1791.
https://doi.org/10.5555/tennessee-evidence/treaty-holston-1791
```

#### 2. Document Identification

**Current problem:** Ambiguous which version is being cited

**Missing:**

- Version number/date of document
- Archive identifier (e.g., "National Archives RG 75")
- Access date for web citations

**Better APA format:**

```
Rocky Mount State Historic Site. (1791). Treaty of Holston with the Cherokee
[Archival collection: National Archives RG 75]. Retrieved January 30, 2026, from
https://tennesseestartshere.com/evidence/documents/treaty-holston-1791
```

#### 3. Page Numbers/Location

**Academic Standard:** Scholars need exact location within source

**Current:** No way to cite specific passage or page

**Missing:**

- Line numbers in document
- Page breaks indicated
- Page numbers from original (if published edition)

**Improved component suggestion:**

```typescript
// Add to CitationExporter props
interface CitationExporterProps {
  document: Document
  passageAnchor?: string // Current: supports this
  lineStart?: number // NEW: specific line in document
  lineEnd?: number // NEW: specific line range
  pageNumber?: number // NEW: page in published edition
}

// Generated MLA with page numbers:
// "Treaty of Holston with the Cherokee," lines 45-62,
// Rocky Mount State Historic Site, 1791
```

#### 4. Metadata for Scholarly Databases

**Need for:** Wikipedia, Zotero, Mendeley, Google Scholar integration

**Missing:** Structured metadata that databases can parse

**Solution:** Add JSON-LD markup:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Treaty of Holston with the Cherokee",
    "datePublished": "1791-07-02",
    "isPartOf": {
      "@type": "Collection",
      "name": "Rocky Mount State Historic Site Evidence Room"
    },
    "url": "https://tennesseestartshere.com/evidence/documents/treaty-holston-1791",
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "DOI",
      "value": "10.5555/tennessee-evidence/treaty-holston-1791"
    },
    "author": {
      "@type": "Person",
      "name": "William Blount"
    },
    "creator": {
      "@type": "Organization",
      "name": "Rocky Mount State Historic Site"
    }
  }
</script>
```

#### 5. BibTeX/RIS Export

**Current:** No export formats for reference managers

**Missing:** BibTeX, RIS, CSL-JSON formats

**Better component:**

```typescript
// Add to CitationExporter exports
type CitationFormat = 'mla' | 'apa' | 'chicago' | 'bibtex' | 'ris' | 'json-ld' | 'link'

// BibTeX example:
@archivaldocument{treaty-holston-1791,
  title = {Treaty of Holston with the Cherokee},
  author = {Blount, William},
  date = {1791-07-02},
  archiveLocation = {National Archives RG 75},
  archiveName = {Rocky Mount State Historic Site Evidence Room},
  url = {https://tennesseestartshere.com/evidence/documents/treaty-holston-1791},
  urldate = {2026-01-30}
}

// RIS example:
TY  - ARCHV
TI  - Treaty of Holston with the Cherokee
AU  - Blount, William
PY  - 1791/07/02
UR  - https://tennesseestartshere.com/evidence/documents/treaty-holston-1791
DA  - 2026-01-30
```

### Citation Quality Recommendations

| Format  | Current | Needed                         | Effort |
| ------- | ------- | ------------------------------ | ------ |
| MLA     | ✓ Basic | + Persistent ID, access date   | Low    |
| APA     | ✓ Basic | + Archive ID, access date      | Low    |
| Chicago | ✓ Basic | + Archive ID, document ID      | Low    |
| BibTeX  | ❌ No   | + Full implementation          | Medium |
| RIS     | ❌ No   | + Full implementation          | Medium |
| JSON-LD | ❌ No   | + Schema.org metadata          | Medium |
| OAI-PMH | ❌ No   | + Metadata harvesting endpoint | High   |

---

## 6. Digital Humanities Best Practices

### Current Implementation Alignment with Standards

#### FAIR Principles (Findability, Accessibility, Interoperability, Reusability)

| Principle         | Current                   | Status | Improvement Needed                           |
| ----------------- | ------------------------- | ------ | -------------------------------------------- |
| **Findable**      | ✓ Good metadata, search   | ✓      | Add machine-readable metadata (JSON-LD, RDF) |
| **Accessible**    | ✓ Web access, public URLs | ✓      | Add structured API for programmatic access   |
| **Interoperable** | ⚠️ Proprietary format     | ⚠️     | Export to TEI XML, use standard vocabularies |
| **Reusable**      | ⚠️ Limited license info   | ⚠️     | Add explicit CC license, copyright statement |

#### TEI XML (Text Encoding Initiative)

**Digital Humanities Standard:** For encoding scholarly texts

Current: No TEI markup or export

Missing:

- Document structure encoding (chapters, sections, paragraphs)
- Editorial choices explicitly marked
- Named entity recognition (people, places)
- Critical apparatus for variants

**Example TEI structure:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<TEI xmlns="http://www.tei-c.org/ns/1.0">
  <teiHeader>
    <fileDesc>
      <titleStmt>
        <title>Treaty of Holston with the Cherokee</title>
        <author>William Blount</author>
      </titleStmt>
      <publicationStmt>
        <publisher>Rocky Mount State Historic Site</publisher>
        <date>1791-07-02</date>
      </publicationStmt>
    </fileDesc>
  </teiHeader>
  <text>
    <body>
      <div type="treaty">
        <head>Treaty of Holston</head>
        <p>The treaty aimed to establish permanent peace...</p>
        <div type="article">
          <head>Article I</head>
          <p>Perpetual peace and friendship shall exist between
             <persName type="national">all the citizens of the United States</persName>
             and <persName type="national">all the individuals composing the Cherokee Nation</persName>.</p>
        </div>
      </div>
    </body>
  </text>
</TEI>
```

**Benefit:** Scholars can process documents programmatically, extract named entities, build network graphs.

#### Linked Data & Ontologies

Current: No use of linked data standards

Missing:

- RDF representation of documents
- SKOS vocabulary for controlled terms
- Person URIs (VIAF, Wikidata links)
- Place URIs (Getty TGN, Geonames)

**Example linked data enhancement:**

```typescript
// For people, add URIs:
{
  id: "william-blount",
  name: "William Blount",
  viaf: "https://viaf.org/viaf/4265064",        // VIAF ID
  wikidata: "https://www.wikidata.org/wiki/Q1348919",  // Wikidata
  naf_id: "n85052556",                          // Library of Congress
  biographical_link: "https://en.wikipedia.org/wiki/William_Blount"
}

// For places, add URIs:
{
  name: "Rocky Mount",
  geonames: "https://www.geonames.org/4635045",
  getty_tgn: "https://getty.edu/voc/tgn/7017609",
  wikidata: "https://www.wikidata.org/wiki/Q7364701"
}
```

**Benefit:** Enables machine linking with Wikipedia, library catalogs, and other linked data sources.

#### Open Standards Compliance

| Standard  | Current | Status                                     |
| --------- | ------- | ------------------------------------------ |
| JSON-LD   | ❌ No   | Should implement for schema.org compliance |
| RDF       | ❌ No   | Should implement for linked data           |
| OAI-PMH   | ❌ No   | Important for library harvesting           |
| METS      | ❌ No   | For complex document structures            |
| PREMIS    | ❌ No   | For preservation metadata                  |
| CIDOC-CRM | ❌ No   | For cultural heritage connections          |

#### Search Engine Discoverability

**Current:** SEO basic implementation

**Missing:**

- Schema.org structured data (partially addressed but incomplete)
- Rich snippets for knowledge graphs
- OpenSearch metadata
- Sitemaps with priority weights for documents

**Recommendation:** Add to document pages:

```html
<!-- Enhance current JSON-LD with more complete schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["CreativeWork", "ArchiveComponent"],
    "name": "Treaty of Holston with the Cherokee",
    "dateCreated": "1791-07-02",
    "datePublished": "1791-07-02",
    "dateModified": "2026-01-30",
    "author": {
      "@type": "Person",
      "@id": "https://viaf.org/viaf/4265064",
      "name": "William Blount"
    },
    "isPartOf": {
      "@type": "Collection",
      "@id": "https://tennesseestartshere.com/evidence",
      "name": "Rocky Mount State Historic Site Evidence Room"
    },
    "mentions": [
      {
        "@type": "Person",
        "@id": "https://viaf.org/viaf/68774891",
        "name": "Hanging Maw"
      }
    ],
    "spatialCoverage": {
      "@type": "Place",
      "@id": "https://www.geonames.org/4635045",
      "name": "Rocky Mount, Tennessee"
    },
    "description": "The Treaty of Holston, signed July 2, 1791...",
    "url": "https://tennesseestartshere.com/evidence/documents/treaty-holston-1791"
  }
</script>
```

---

## 7. Data Quality Issues Identified

### Issue 1: Document ID Conflicts

**Severity:** HIGH - Affects citation accuracy

Three conflicts between citation sources:

#### Conflict A: Williamson Recommendation

```
brand.ts line 88:      source: 'Founders Online' [NO DOCUMENT ID]
page.tsx line 367:     sourceUrl="05-05-02-0277"
page.tsx line 478:     sourceUrl="05-05-02-0268"
                       ⚠️ TWO DIFFERENT DOCUMENT IDS FOR SAME EVENT
```

**Required Action:** Verify which document ID is correct by accessing both URLs.

#### Conflict B: Washington's Question

```
brand.ts line 93:      source: 'Founders Online' [NO DOCUMENT ID]
page.tsx line 337:     sourceUrl="05-06-02-0135"
page.tsx line 493:     sourceUrl="05-06-02-0076"
                       ⚠️ TWO DIFFERENT DOCUMENT IDS FOR SAME EVENT
```

**Required Action:** Verify which document ID is correct.

#### Conflict C: Treaty Proclamation

```
page.tsx line 393:     sourceUrl="https://founders.archives.gov/" [HOMEPAGE]
page.tsx line 521:     sourceUrl="05-09-02-0100"
                       ⚠️ GENERIC LINK INSTEAD OF SPECIFIC DOCUMENT
```

**Required Action:** Fix line 393 to use specific document ID.

### Issue 2: Missing Archival References

**Severity:** MEDIUM - Affects academic credibility

All documents should include:

- Repository name and location
- Collection name and ID
- Box and folder numbers
- Call number or accession number

**Example of what's needed in document frontmatter:**

```yaml
archival_source:
  repository: 'State Archives of North Carolina'
  location: 'Raleigh, NC'
  collection: 'John Gray Blount Papers'
  collection_id: 'PC.193'
  box: 12
  folder: 15
  call_number: 'PC.193.12.15'
```

### Issue 3: Incomplete Verification Documentation

**Severity:** MEDIUM - Affects trust and transparency

Current verification only shows status and source count.

Missing:

- Who performed verification?
- When was it verified?
- What specific checks were done?
- Against which sources was it checked?

**Example improved structure:**

```yaml
verification:
  status: verified
  source_count: 2
  method: 'Cross-referenced with Founders Online and TN Encyclopedia'

  verified_against:
    - source: 'Founders Online'
      url: 'https://founders.archives.gov/documents/Washington/05-06-02-0135'
      checked_date: '2026-01-15'
      result: 'confirmed_accurate'
    - source: 'Tennessee Encyclopedia'
      url: 'https://tennesseeencyclopedia.net/entries/rocky-mount/'
      checked_date: '2026-01-15'
      result: 'confirmed_accurate'

  verified_by: 'Cody Boring'
  verified_date: '2026-01-15'
```

### Issue 4: No Rights/License Information

**Severity:** MEDIUM - Legal and reuse clarity

Current: Documents displayed but no explicit license stated

Missing:

- Copyright statement
- License type (CC0, CC-BY, CC-BY-SA, etc.)
- Rights holder
- Usage restrictions
- Commercial use permitted?
- Derivative works permitted?

**Recommended addition to each document:**

```yaml
rights:
  copyright_holder: 'Rocky Mount State Historic Site'
  copyright_statement: 'Copyright 2026 Rocky Mount State Historic Site. All rights reserved.'
  license: 'CC-BY-4.0'
  license_url: 'https://creativecommons.org/licenses/by/4.0/'
  usage: 'Attribution required. Derivative works permitted.'
  commercial_use: true
  modifications_permitted: true
```

---

## 8. Implementation Roadmap for Scholarly Standards

### Phase 1: Critical (Week 1)

- **Resolve document ID conflicts** (Williamson, Washington's question, treaty proclamation)
- **Add archival references** to all documents in frontmatter
- **Fix line 393** generic Founders link
- **Add persistent identifiers** (DOI/ARK) infrastructure

**Effort:** 6-8 hours

### Phase 2: Important (Week 2-3)

- **Enhance citation exporter** with BibTeX, RIS, JSON-LD formats
- **Add formal review tracking** metadata
- **Implement corrections system** for community errata
- **Add Dublin Core metadata** to document type
- **Create preservation metadata** standards

**Effort:** 12-16 hours

### Phase 3: Enhancement (Month 2)

- **Implement TEI XML export** for scholarly interchange
- **Add linked data URIs** (VIAF, Wikidata, Geonames)
- **Create OAI-PMH endpoint** for library harvesting
- **Build REST API** for programmatic document access
- **Add full text search** with OCR support

**Effort:** 20-30 hours

### Phase 4: Integration (Month 3)

- **Submit to library catalogs** (Library of Congress, OCLC)
- **Register DOIs** for all documents
- **Achieve FAIR principles** certification
- **Document in scholarly databases** (Google Scholar, Wikipedia)
- **Enable machine harvesting** for computational analysis

**Effort:** Ongoing

---

## 9. Recommendations by Priority

### Priority 1: Must Fix (Accuracy)

1. Resolve Williamson document ID conflict (0277 vs 0268)
2. Resolve Washington question document ID conflict (0135 vs 0076)
3. Fix line 393 generic Founders link
4. Add repository/collection information to all documents

### Priority 2: Should Fix (Transparency)

1. Add formal peer review metadata tracking
2. Create public corrections/errata system
3. Add Dublin Core metadata to document schema
4. Implement preservation metadata standards
5. Add explicit license information to all documents

### Priority 3: Good to Have (Discoverability)

1. Implement BibTeX/RIS citation export
2. Add JSON-LD schema.org markup
3. Create REST API for document access
4. Add full-text search capability
5. Link to external authority files (VIAF, Wikidata)

### Priority 4: Enhancement (Reusability)

1. Support TEI XML export
2. Implement OAI-PMH metadata harvesting
3. Add Linked Data (RDF) representation
4. Create detailed API documentation
5. Enable computational text analysis

---

## 10. Specific Code Improvements

### Improvement 1: Enhance Document Type with Scholarly Metadata

**File:** `/lib/evidence/types.ts`

```typescript
export interface DocumentVerification {
  status: VerificationStatus
  source_count: number
  method?: string
  notes?: string

  // NEW: Formal peer review tracking
  formal_review?: {
    reviewer_name: string
    reviewer_role: string
    reviewed_date: string
    verdict: 'approved' | 'approved_with_notes' | 'needs_revision' | 'rejected'
    review_notes?: string
  }[]
}

export interface ArchivalSource {
  repository: string // "State Archives of North Carolina"
  location?: string // "Raleigh, NC"
  collection_name: string // "John Gray Blount Papers"
  collection_id: string // "PC.193"
  box?: number
  folder?: number
  call_number?: string // "PC.193.12.15"
  access_restriction?: string // "Public", "Restricted", etc.
  finding_aid_url?: string
}

export interface Document {
  // ... existing fields ...

  // NEW: Archival information
  archival_source?: ArchivalSource

  // NEW: Persistent identifiers
  doi?: string // Digital Object Identifier
  ark?: string // Archival Resource Key
  oclc_number?: string
  handle?: string

  // NEW: Rights and licensing
  rights?: {
    copyright_holder: string
    license: string // CC-BY-4.0, CC0, etc.
    license_url: string
    usage_notes?: string
  }

  // NEW: Metadata quality
  metadata_quality?: {
    completeness: number // 0-100%
    last_verified: string // ISO date
    verified_by: string
    verification_method: string
  }
}
```

### Improvement 2: Enhance CitationExporter Component

**File:** `/components/evidence/CitationExporter.tsx`

```typescript
type CitationFormat = 'mla' | 'apa' | 'chicago' | 'bibtex' | 'ris' | 'link' | 'json-ld'

function generateBibTeX(doc: Document, lineStart?: number, lineEnd?: number): string {
  const entryType = doc.content_type === 'letter' ? '@letter' : '@archivaldocument'
  const id = `${doc.id}-${new Date().getFullYear()}`

  let entry = `${entryType}{${id},\n`
  entry += `  title = {${doc.title}},\n`
  entry += `  author = {${doc.author || 'Unknown'}},\n`
  entry += `  date = {${doc.date}},\n`

  if (doc.archival_source) {
    entry += `  archiveLocation = {${doc.archival_source.repository}},\n`
    entry += `  archiveName = {${doc.archival_source.collection_name}},\n`
  }

  entry += `  url = {https://tennesseestartshere.com/evidence/documents/${doc.id}},\n`

  if (lineStart && lineEnd) {
    entry += `  pages = {${lineStart}-${lineEnd}},\n`
  }

  entry += `  accessed = {${new Date().toISOString().split('T')[0]}}\n}`

  return entry
}

function generateRIS(doc: Document): string {
  let ris = 'TY  - ARCHV\n'
  ris += `TI  - ${doc.title}\n`
  ris += `AU  - ${doc.author || 'Unknown'}\n`
  ris += `PY  - ${doc.date}\n`
  ris += `UR  - https://tennesseestartshere.com/evidence/documents/${doc.id}\n`
  ris += `DA  - ${new Date().toISOString().split('T')[0]}\n`

  if (doc.archival_source) {
    ris += `LO  - ${doc.archival_source.repository}\n`
  }

  ris += 'ER  - \n'

  return ris
}
```

### Improvement 3: Add Verification Review Component

**New File:** `/components/evidence/VerificationHistory.tsx`

```typescript
'use client'

import { DocumentVerification } from '@/lib/evidence/types'

interface VerificationHistoryProps {
  verification: DocumentVerification
  documentId: string
}

export function VerificationHistory({ verification, documentId }: VerificationHistoryProps) {
  if (!verification.formal_review || verification.formal_review.length === 0) {
    return (
      <div className="text-sm text-gray-400">
        No formal review records found for this document.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Verification History</h3>
      {verification.formal_review.map((review, idx) => (
        <div key={idx} className="border-l-2 border-green-500 pl-4 py-2 text-sm">
          <div className="flex items-center justify-between">
            <strong>{review.reviewer_name}</strong>
            <span className="text-xs text-gray-400">{review.reviewed_date}</span>
          </div>
          <div className="text-xs text-gray-500">{review.reviewer_role}</div>
          {review.review_notes && (
            <p className="text-xs mt-2 text-gray-300">{review.review_notes}</p>
          )}
          <div className={`inline-block text-xs font-medium mt-1 px-2 py-1 rounded ${
            review.verdict === 'approved'
              ? 'bg-green-900/30 text-green-400'
              : 'bg-yellow-900/30 text-yellow-400'
          }`}>
            {review.verdict.replace(/_/g, ' ').toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

## 11. Gaps in Current Implementation

### Data Integrity

- ❌ No checksums or file integrity verification
- ❌ No versioning system for document updates
- ❌ No deletion/removal tracking (if documents are removed, how is this recorded?)
- ❌ No backup/replication verification

### Accessibility

- ⚠️ No machine-readable text alternatives for images
- ⚠️ Limited support for screen readers on documents
- ❌ No multiple language support
- ❌ No easy access for researchers with disabilities

### Scalability

- ❌ No documented data model for expansion
- ❌ Limited capacity for adding thousands of documents
- ⚠️ No performance benchmarks provided
- ❌ No load testing results

---

## 12. Summary: Scholarly Assessment

### What Works Well

1. **Structured metadata** - Documents have consistent, well-organized metadata
2. **Primary source access** - Some documents link directly to manuscripts
3. **Citation export** - Multiple formats available
4. **Transparency** - Bias disclosure and editorial notes present
5. **Verification badges** - Visual confidence indicators work well

### What Needs Improvement

1. **Archival completeness** - Missing repository information, call numbers
2. **Persistent identifiers** - No DOI or stable URLs
3. **Peer review documentation** - No visible verification process
4. **Citation standards** - Missing key metadata for academic use
5. **Open standards** - No TEI XML, RDF, or linked data support
6. **API access** - No programmatic access for researchers

### Scholarly Potential

The Evidence Room has **excellent potential** to become a **trusted scholarly resource**. With targeted improvements in citation completeness, persistent identifiers, and verification transparency, it could be:

- Cited in academic papers
- Indexed in library catalogs
- Harvested by digital humanities projects
- Used for computational text analysis
- Linked to other scholarly resources

**Current Academic Citability:** 6/10

**With Priority 1+2 fixes:** 8/10

**With all recommendations:** 9.5/10

---

## Next Steps

1. **Immediate:** Resolve document ID conflicts to ensure accuracy
2. **Short-term:** Add archival metadata and persistent identifiers
3. **Medium-term:** Implement formal peer review tracking and citations in BibTeX/RIS
4. **Long-term:** Achieve FAIR principles compliance and linked data integration

**Estimated Total Effort:** 60-80 hours of development over 3 months

**Expected Outcome:** Evidence Room becomes a model for public history digital archives with scholarly rigor and transparency.

---

**Review Prepared:** January 30, 2026
**Reviewer:** Claude Code (Academic Researcher Perspective)
**For:** Cody Boring, Executive Director, Rocky Mount State Historic Site
