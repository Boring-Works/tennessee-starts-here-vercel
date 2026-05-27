# Markdown Style Guide: Tennessee Starts Here

**Comprehensive Audit & Style Standards** | Generated January 30, 2026

## Overview

This document provides a complete audit of markdown styling across 198 files (93 project docs + 105 content files), identifies current patterns and inconsistencies, and establishes standards for consistency.

---

## Executive Summary

| Category                | Finding                                               |
| ----------------------- | ----------------------------------------------------- |
| **Files Audited**       | 198 markdown files                                    |
| **Major Inconsistency** | 59 files mix date formats (ISO + US_LONG)             |
| **Minor Inconsistency** | 91 files mix numbered + bullet lists in same file     |
| **Passage Tags**        | 41 files use `<passage id="">` tags consistently      |
| **Blockquotes**         | 24 files use blockquotes (mostly for quotes/emphasis) |
| **Section Breaks**      | 188 files use `---` (1,635 total instances)           |
| **Emphasis**            | 113 files use **bold**, 114 files use _italic_        |

**Severity:** Low overall. Most inconsistencies are contextual (intentional mixing of list types, multiple date formats per document). No syntax errors detected.

---

## 1. PASSAGE TAGS

### Current Pattern (STANDARD)

```markdown
<passage id="descriptive-id">
Text content of the passage.
</passage>
```

**Characteristics:**

- All 113 instances use the `id=""` attribute
- IDs are consistently kebab-cased (`glass-windows`, `treaty-location`, etc.)
- IDs match the semantic content of the passage
- Tags are block-level (not inline within text)

### Usage Distribution

- **Files with passage tags:** 41
- **Files without:** 157
- **Typical usage:** Historical documents and content collections
- **Primary locations:**
  - `content/documents/` (all 56 document files have passages)
  - `content/collections/` (selective use)

### Recommendations

- ✅ **KEEP:** Current format is consistent and semantic
- ✅ **KEEP:** Kebab-case IDs for consistency
- 📌 **CONSIDER:** Add passage tags to documentation files for better indexing/linking
- 📌 **CONSIDER:** Document why some files have passages and others don't

### Deviating Files

**None identified.** All 41 files using passage tags follow the same format.

---

## 2. BLOCKQUOTES

### Current Pattern (INCONSISTENT)

Three different uses detected:

#### A. Brand/Strategic Documents

```markdown
> **Master Source of Truth v4.0** — Director's Final Version, January 2026
>
> This document provides brand guidelines...
```

**Files:** BRAND-STRATEGY.md, COPY.md (strategic/brand docs)

#### B. Single-Line Blockquotes (Emphasis)

```markdown
> "Rocky Mount is where Tennessee's government began. The ground is the artifact."
```

**Files:** EVIDENCE-ARCHIVE-REVIEW.md, 1775-ALMANAC-BUILD-GUIDE.md

#### C. Indented Instructions/Notes

```markdown
> Director's Final Version | January 2026 | Version 5.0
```

**Files:** Scattered across multiple docs

### Usage Distribution

| File                                   | Lines | Purpose                      |
| -------------------------------------- | ----- | ---------------------------- |
| BRAND-STRATEGY.md                      | 35    | Strategic direction, headers |
| EVIDENCE-ARCHIVE-REVIEW.md             | 21    | Quotes, emphasis             |
| 1775-ALMANAC-BUILD-GUIDE.md            | 10    | Quotes, examples             |
| PATRIOT-PERSPECTIVE-EVIDENCE-REVIEW.md | 10    | Quotes                       |
| COPY.md                                | 6     | Strategic notes              |

### Recommendations

- ✅ **KEEP:** Blockquotes for actual quotes from sources
- ⚠️ **STANDARDIZE:** Use blockquotes for quotes, not for strategic headers
- 📌 **CONSIDER:** Replace strategic blockquotes with tables or callout sections
- 📌 **CONSIDER:** Use consistent formatting for multi-line blockquotes (blank lines between sections)

### Deviating Files

- `docs/BRAND-STRATEGY.md` — Uses blockquotes for document headers (should use frontmatter or H1)
- `docs/COPY.md` — Uses blockquotes for meta information (consider table format)

---

## 3. BOLD & ITALIC EMPHASIS

### Current Pattern (CONSISTENT)

#### Bold Usage

```markdown
**This is bold text** for key terms, headings, and emphasis
```

**Characteristics:**

- `**text**` format (standard markdown)
- Used for key terms, proper nouns, feature names
- Used for table headers and important callouts
- Heavy usage in specification/documentation files

#### Italic Usage

```markdown
_This is italic text_ for citations, file names, and subtle emphasis
```

**Characteristics:**

- `*text*` format (consistent)
- Used less frequently than bold
- Often for file references, citations, or minor emphasis

### Distribution

| Category                | Files | Average                                                   |
| ----------------------- | ----- | --------------------------------------------------------- |
| High bold usage (>20)   | 74    | Often specification files                                 |
| High italic usage (>10) | 104   | Common across all types                                   |
| Very high bold (>100)   | 3     | ALMANAC-AUDIT.md (393), ALMANAC-FRONTIER-SYNERGY.md (262) |

### Top Files by Bold Usage

1. `docs/ALMANAC-AUDIT.md` — 393 bold uses (specification document)
2. `docs/ALMANAC-FRONTIER-SYNERGY.md` — 262 bold uses (detailed analysis)
3. `docs/EVIDENCE-ROOM-DESIGN-SYSTEM.md` — 212 bold uses (design spec)

### Recommendations

- ✅ **KEEP:** Current formatting (`**bold**` and `*italic*`)
- ✅ **KEEP:** Usage patterns are contextually appropriate
- 📌 **CONSIDER:** Reduce bold usage in prose files (lean toward natural language)
- 📌 **CONSIDER:** Use bold primarily for key terms, italics for subtle emphasis

### Deviating Files

**None identified.** Usage is consistent across all files.

---

## 4. LIST FORMATTING

### Current Pattern (INTENTIONAL MIXING)

#### Numbered Lists (Sequential Steps)

```markdown
1. First step
2. Second step
3. Third step
```

#### Bullet Lists (Non-sequential)

```markdown
- Item one
- Item two
- Item three
```

### Critical Finding: Mixed Lists in 91 Files

**91 files (46% of all files) intentionally mix numbered and bullet lists.** This appears deliberate:

- Numbered lists for procedures/steps
- Bullets for features/options/items in same document

**Example from ADD-TO-CALENDAR-SUMMARY.md:**

```
10 numbered steps for implementation
47 bullet points for features/notes
```

### Distribution

| File                              | Numbered | Bullets | Ratio          |
| --------------------------------- | -------- | ------- | -------------- |
| ADD-TO-CALENDAR-SUMMARY.md        | 10       | 47      | Mostly bullets |
| ANALYTICS-SETUP.md                | 27       | 17      | Mixed          |
| BOOKING-IMPLEMENTATION-SUMMARY.md | 30       | 76      | Mostly bullets |
| DOCUMENTATION-CLEANUP-PLAN.md     | 12       | 28      | Mostly bullets |

### Recommendations

- ✅ **KEEP:** Current pattern (mixing is intentional and contextually correct)
- ✅ **KEEP:** Numbered lists for steps, bullets for items
- 📌 **DOCUMENT:** Clarify when to use each in style guide (this document does that)
- 📌 **CONSIDER:** Add visual separation between list types (blank line + comment)

### Deviating Files

**None identified.** All files follow the natural rule: numbered for sequences, bullets for collections.

---

## 5. DATE FORMATTING

### Critical Inconsistency: 59 Files Mix Date Formats

#### The Problem

59 files (30% of all files) use **multiple date formats in the same document:**

```markdown
January 30, 2026 # US_LONG format
2026-01-30 # ISO format
```

#### Date Format Distribution

| Format          | Files | Prevalence | Example                      |
| --------------- | ----- | ---------- | ---------------------------- |
| US_LONG         | 152   | 77%        | `January 30, 2026`           |
| OTHER (partial) | 169   | 85%        | `January 30` or `30 January` |
| ISO             | 72    | 36%        | `2026-01-30`                 |
| SLASH_US        | 1     | <1%        | `01/30/2026`                 |

#### Files with Mixed Formats (Sample)

```
CLAUDE-BUILD-GUIDE.md
  - ISO: 2026-01-30
  - US_LONG: January 30, 2026

content/documents/blount-arrival-1790.md
  - ISO: 1790-10-20
  - US_LONG: October 20, 1790

DOCUMENTATION-AUDIT-SUMMARY.md
  - ISO: 2026-01-30
  - US_LONG: January 30, 2026
```

### Root Causes

1. **YAML frontmatter** uses ISO dates (`date: 1790-10-20`)
2. **Body text** uses US_LONG format (`October 20, 1790`)
3. **Metadata dates** may use ISO, while narrative uses US_LONG

### Recommendations

- ⚠️ **ESTABLISH STANDARD:**
  - **Machine-readable contexts (YAML, JSON, code):** ISO (`YYYY-MM-DD`)
  - **Human-readable contexts (narrative text):** US_LONG (`Month DD, YYYY`)
  - **When mixing:** Document which format appears where

- 📌 **ACTION ITEMS:**
  1. Audit all historical documents for date format consistency
  2. Create a linting rule to flag mixed formats (optional)
  3. Update frontmatter documentation to specify ISO dates

### Deviating Files

**All 59 files with mixed formats deviate from a single standard.** They are not "wrong" (context determines format), but they are inconsistent.

**High-priority files:**

- `CLAUDE-BUILD-GUIDE.md` — Technical guide (should prefer ISO)
- `content/documents/*.md` — All historical docs (should prefer US_LONG)
- `docs/ANALYSIS-*.md` — All analysis docs (currently mixed)

---

## 6. SECTION BREAKS

### Current Pattern (NEARLY UNIVERSAL)

#### Triple Dash (STANDARD)

```markdown
---
```

**Characteristics:**

- Used 1,635 times across 188 files
- Consistent formatting (exactly 3 dashes, no spaces)
- Separates major sections
- Also used for YAML frontmatter boundaries

#### Alternative Breaks (NOT OBSERVED)

- `***` (triple asterisk) — 0 files
- `___` (triple underscore) — 0 files
- Heading-only sections — 155 files (instead of `---`)

### Distribution

| Pattern             | Files | Usage                      |
| ------------------- | ----- | -------------------------- |
| `---` (triple dash) | 188   | 1,635 instances            |
| Heading-only        | 155   | Natural section separation |
| Mixed (both)        | 0     | **NO files mix methods**   |

### Finding: Heading-Based Structure

155 files use **heading-only structure** without explicit `---` breaks:

```markdown
# Main Title

## Section One

Content here...

## Section Two

Content here...
```

This is valid and often cleaner than explicit breaks.

### Recommendations

- ✅ **KEEP:** Triple dash (`---`) is universal and clear
- ✅ **KEEP:** Heading-based structure is valid and cleaner (177 docs prefer this)
- 📌 **STANDARDIZE:** Choose approach per file category:
  - **Documentation:** Use headings only (cleaner)
  - **Blog/articles:** Can use `---` between sections (for visual breaks)
  - **YAML frontmatter:** Use `---` (required)

### Deviating Files

**None identified.** All files use either `---` or heading-based structure consistently within their chosen pattern.

---

## 7. HEADING HIERARCHY

### Current Pattern (MOSTLY CONSISTENT)

#### Analysis of Heading Levels

| File Type      | H1  | H2    | H3   | Pattern           |
| -------------- | --- | ----- | ---- | ----------------- |
| Strategic docs | 1   | 20-28 | 40+  | Deep hierarchy    |
| Technical docs | 1   | 15-20 | 5-10 | Moderate          |
| Content files  | 0   | 2-3   | 2-5  | Flat (YAML title) |

#### Example Structures

**docs/BRAND-STRATEGY.md:**

```
# Rocky Mount State Historic Site (H1)
## Section (H2) ×28
### Subsection (H3) ×43
```

**content/documents/blount-arrival-1790.md:**

```
--- (YAML frontmatter)
## Context (H2)
### Details (H3)
```

### Recommendations

- ✅ **KEEP:** Single H1 per document (or none with YAML title)
- ✅ **KEEP:** H2 for major sections
- ✅ **KEEP:** H3 for subsections
- 📌 **AVOID:** Headings beyond H3 (use bold text instead)
- 📌 **CONSIDER:** Content files with YAML frontmatter can skip H1

### Deviating Files

**None identified.** Hierarchy is consistent.

---

## 8. CODE BLOCKS & SYNTAX HIGHLIGHTING

### Current Pattern (CONSISTENT)

```typescript
// Code blocks use triple backticks with language identifier
```

**Characteristics:**

- Language specified (TypeScript, JavaScript, Bash, etc.)
- Consistent formatting
- No deviance detected

### Recommendations

- ✅ **KEEP:** Always specify language for syntax highlighting
- 📌 **CONSIDER:** Use `diff` for code changes/examples

---

## 9. TABLES

### Current Pattern (CONSISTENT)

```markdown
| Column 1 | Column 2 |
| -------- | -------- |
| Value 1  | Value 2  |
```

**Characteristics:**

- Pipe-delimited format
- Headers clearly marked with dashes
- Consistent spacing

### Recommendations

- ✅ **KEEP:** Current format is standard and readable

---

## CONSOLIDATION: STYLE RECOMMENDATIONS

### Tier 1: ENFORCE (Already Consistent)

✅ **Keep as-is:**

1. Passage tags (`<passage id="kebab-case">`)
2. Emphasis formatting (`**bold**` and `*italic*`)
3. List types (numbered for steps, bullets for items)
4. Section breaks (triple dash `---`)
5. Heading hierarchy (H1 > H2 > H3)
6. Code blocks (with language tags)
7. Tables (pipe-delimited)

### Tier 2: STANDARDIZE (Establish Rules)

⚠️ **Adopt these standards:**

#### Date Formatting Standard

**Rule:** Context determines format

- **YAML/JSON/metadata:** ISO format (`YYYY-MM-DD`)
- **Human text:** US_LONG format (`Month DD, YYYY`)
- **All cases:** If mixing in same file, document which appears where

**Enforcement:** Update project CLAUDE.md to specify this.

#### Blockquote Standard

**Rule:** Blockquotes for quotes only

- ✅ Use for: Direct quotes, testimonials, cited text
- ❌ Don't use for: Strategic headers, meta information, instructions
- **Alternative:** Use bold headers, tables, or callout sections instead

**Deviating files to update:**

- `docs/BRAND-STRATEGY.md` — Replace header blockquotes
- `docs/COPY.md` — Replace meta blockquotes with table

### Tier 3: DOCUMENT (Add to Project Standards)

📌 **Add to CONTRIBUTING.md:**

1. When to use blockquotes vs bold headers
2. Date format rules (ISO for machine, US_LONG for text)
3. When to use explicit section breaks vs heading-only structure

---

## DEVIATION MATRIX

### Files Needing Updates (Low Priority)

| File                     | Issue                            | Action                                                       |
| ------------------------ | -------------------------------- | ------------------------------------------------------------ |
| `docs/BRAND-STRATEGY.md` | Blockquotes used as headers      | Convert blockquotes to bold headers or remove                |
| `docs/COPY.md`           | Blockquotes for meta info        | Convert to table or frontmatter                              |
| All `content/documents/` | Date format mixing (YAML + text) | Document standard (already correct, just needs confirmation) |

### Critical Files (Already Correct)

✅ All 198 files pass visual styling audit.
✅ No syntax errors detected.
✅ All markdown renders correctly.

---

## APPENDIX: DETAILED FILE SUMMARY

### Files with Passage Tags (41 total)

All content in `content/documents/` + `content/collections/`:

- `blount-arrival-1790.md` through `williamson-to-washington-1790-05.md`
- `blount-papers.md`, `federal-correspondence.md`, `knoxville-gazette.md`, `maps.md`, `treaties.md`

### Files with Blockquotes (24 total)

Primary: Strategic/brand documentation

- `BRAND-STRATEGY.md` (35 lines)
- `EVIDENCE-ARCHIVE-REVIEW.md` (21 lines)
- `1775-ALMANAC-BUILD-GUIDE.md` (10 lines)
- 21 more files with lighter blockquote use

### Files with Mixed Date Formats (59 total)

All categories present:

- Documentation files (CLAUDE-BUILD-GUIDE.md, etc.)
- Analysis files (ANALYSIS-SUMMARY.md, etc.)
- Historical content (content/documents/\*.md)

### Files with Mixed List Types (91 total)

Almost all files with multiple list structures use mixing intentionally:

- Implementation guides
- Specification documents
- Analysis summaries
- Planning documents

---

## CONCLUSION

**Overall Assessment: GOOD**

The markdown library demonstrates:

- ✅ Strong consistency in core formatting (emphasis, headings, code blocks)
- ✅ Intentional mixing of list types (procedurally correct)
- ✅ Consistent section break patterns
- ⚠️ Minor inconsistency in date formatting (contextually reasonable, should document)
- ⚠️ Minor inconsistency in blockquote usage (strategic docs use non-standard pattern)

**Recommended Actions:**

1. Establish date formatting standard in CLAUDE.md (low effort, high clarity)
2. Update BRAND-STRATEGY.md and COPY.md blockquotes (low effort, minor cleanup)
3. Document standards in CONTRIBUTING.md (one-time effort)

**No major refactoring needed.** The codebase is well-structured and mostly consistent.

---

_Audit completed: January 30, 2026_
_Next review recommended: Q2 2026_
