# Rocky Mount Digital Archive Standards

**Version:** 1.0
**Effective Date:** January 30, 2026
**Maintained By:** Rocky Mount State Historic Site
**Author:** Dr. Eleanor Hartwell, PhD - Chief Digital Archivist

---

## Purpose

This document establishes metadata standards, naming conventions, and formatting guidelines for all content in the Rocky Mount Digital Archive. These standards ensure consistency, discoverability, and long-term preservation of historical materials.

---

## Metadata Standards

### Inspired By

Our standards draw from established digital humanities frameworks:

| Standard                               | Influence                                            |
| -------------------------------------- | ---------------------------------------------------- |
| **Dublin Core**                        | Basic metadata elements (creator, date, description) |
| **TEI (Text Encoding Initiative)**     | Document structure, passage marking                  |
| **METS (Metadata Encoding)**           | Structural metadata, file relationships              |
| **MODS (Metadata Object Description)** | Detailed bibliographic description                   |

We simplify these for a GitHub-native, Markdown-first workflow.

---

## Document Frontmatter Examples

### Letter (Correspondence)

```yaml
---
id: blount-to-knox-1790-11
title: Blount to Knox on Indian Affairs
date: '1790-11-15'
content_type: letter
source: Founders Online, National Archives
source_url: https://founders.archives.gov/documents/...
collection: blount-papers
author: william-blount
recipient: henry-knox
people_mentioned:
  - hanging-maw
  - bloody-fellow
  - william-cobb
responds_to: knox-to-blount-1790-10
responses:
  - knox-to-blount-1790-12
physical_location: Main House - Where Blount wrote to Knox
verification:
  status: verified
  source_count: 2
  method: Cross-referenced with Founders Online and American State Papers
provenance:
  original_archive: National Archives
  original_identifier: RG 59, M588
  transcription_source: Founders Online
  transcription_date: '2025-08-15'
  transcribed_by: National Archives staff
  verified_by: Cody Boring
  verified_date: '2026-01-15'
description: Governor Blount reports on Cherokee negotiations and requests additional supplies for the territorial government.
---
```

### Treaty

```yaml
---
id: treaty-holston-1791
title: Treaty of Holston with the Cherokee
date: '1791-07-02'
content_type: treaty
source: Avalon Project, Yale Law School; DigiTreaties
source_url: https://digitreaties.org/treaties/treaty/88697242/
collection: treaties
author: william-blount
people_mentioned:
  - hanging-maw
  - bloody-fellow
  - doublehead
  - john-watts
  - standing-turkey
  - the-boots
physical_location: Main House - Where negotiations were coordinated
responds_to: null
responses:
  - washington-proclamation-1791
verification:
  status: verified
  source_count: 3
  method: Cross-referenced with Avalon Project, DigiTreaties, and National Archives
provenance:
  original_archive: National Archives
  original_identifier: 'Record Group 11: General Records of the United States Government'
  transcription_source: Avalon Project (Yale Law School)
  transcription_date: '2004-01-01'
  transcribed_by: Lillian Goldman Law Library
  verified_by: Cody Boring
  verified_date: '2026-01-20'
description: The Treaty of Holston established peace between the United States and Cherokee Nation, signed July 2, 1791.
---
```

### Person (Colonial/Settler)

```yaml
---
id: william-blount
name: William Blount
role: Governor of the Southwest Territory
bio_type: full
bio_short: First and only Governor of the Southwest Territory (1790-1796), signer of the U.S. Constitution.
birth_year: 1749
death_year: 1800
is_cherokee: false
is_signatory: false
documents:
  - blount-arrival-1790
  - blount-commission-1790
  - treaty-holston-1791
  - blount-to-knox-1790-11
verification:
  status: verified
  source_count: 10
  method: Multiple biographies, Tennessee Encyclopedia, primary correspondence
---
```

### Person (Cherokee)

```yaml
---
id: standing-turkey
name: Standing Turkey
name_cherokee: Kanetetoka
name_cherokee_alt: Kunnatetiska, Kanagatatoga
name_meaning: Name refers to the upright stance of the wild turkey
slug: standing-turkey
role: Cherokee Leader and Diplomat
town: Tuskegee
birth_year: 1740
death_year: 1800
bio_type: full
is_cherokee: true
is_signatory: true
signature_url: https://digitreaties.org/treaties/treaty/88697242/
documents:
  - treaty-holston-1791
faction: peace
verification:
  status: reconstructed
  source_count: 3
  method: Reconstructed from U.S. government records, treaty documents, and historical correspondence
  notes: >
    No Cherokee-authored documents about Standing Turkey have been identified in archives.
    This biography reflects how he was perceived and documented by U.S. officials and settlers.
    Cherokee oral histories and tribal records may contain different perspectives.
---
```

### Collection

```yaml
---
id: blount-papers
name: The Blount Papers
description: Official correspondence from Governor William Blount during the territorial period, documenting the establishment of federal authority in the Southwest Territory.
why_it_matters: These letters provide the primary documentation for Rocky Mount's role as the first territorial capital and Blount's negotiations with the Cherokee Nation.
document_count: 12
date_range: '1790-1792'
key_figures:
  - william-blount
  - henry-knox
  - george-washington
  - hanging-maw
---
```

### Newspaper Issue

```yaml
---
id: knoxville-gazette-1791-11-05
title: Knoxville Gazette, November 5, 1791
date: '1791-11-05'
content_type: newspaper
source: Library of Congress, Chronicling America
source_url: https://chroniclingamerica.loc.gov/...
collection: knoxville-gazette
author: george-roulstone
people_mentioned:
  - william-blount
verification:
  status: single-source
  source_count: 1
  method: Digital scan from Library of Congress
provenance:
  original_archive: Library of Congress
  original_identifier: sn83026172
  transcription_source: OCR + manual correction
  transcription_date: '2026-01-10'
  transcribed_by: AI-assisted (Claude) with human review
  verified_by: Cody Boring
  verified_date: '2026-01-15'
description: First issue of the Knoxville Gazette, Tennessee's first newspaper, founded by George Roulstone.
---
```

### Disputed/Reconstructed Document

```yaml
---
id: jackson-at-rocky-mount-1788
title: "Andrew Jackson's Stay at Rocky Mount"
date: '1788-04-01'
content_type: testimony
source: Tennessee Encyclopedia, Rocky Mount State Historic Site, Andrew Jackson Papers
source_url: https://tennesseeencyclopedia.net/entries/rocky-mount/
collection: standalone
people_mentioned:
  - william-cobb
verification:
  status: disputed
  source_count: 0
  method: Searched Library of Congress Jackson Papers, Founders Online, The Hermitage archives
  notes: >
    The six-week stay is cited in secondary sources (Tennessee Encyclopedia, museum materials,
    multiple biographies) but NO primary documentation from Jackson's own hand has been identified.
    No letters, receipts, diary entries, or contemporary accounts confirm this stay.

    CRITICAL: Current buildings at Rocky Mount were constructed 1826-1830 per UT dendrochronology
    (Grissino-Mayer & van de Gevel, 2007), 38-42 years AFTER Jackson's claimed 1788 visit.
    Any visit would have been to earlier structures, not the buildings visitors see today.

    Claim persists in Tennessee historical tradition and may be accurate, but cannot be verified
    to scholarly standards without primary documentation.
description: Account of young attorney Andrew Jackson's six-week stay at Rocky Mount in 1788, documented in secondary sources but lacking primary verification.
---
```

---

## Passage Markup

### Standard Passage Tag

Use HTML-style tags within markdown body:

```markdown
<passage id="glass-windows">
On the 11th instant, I arrived in this country, and was received with every mark of
attention and gladness that I could have wished. I am very well accommodated with a
Room with Glass Windows, Fireplace, etc., etc., at this place.
</passage>
```

### Passage ID Rules

1. Must be unique within the document
2. Lowercase with hyphens
3. Descriptive of content
4. Used in compound IDs: `blount-arrival-1790#glass-windows`

### Passage Best Practices

| Do                       | Don't                        |
| ------------------------ | ---------------------------- |
| Mark specific quotations | Mark entire documents        |
| Use descriptive IDs      | Use numbered IDs (passage-1) |
| Keep passages focused    | Combine unrelated content    |
| Include context          | Excerpt without attribution  |

---

## Citation Formatting

### Within Documents

Always include a "How to Cite This Document" section:

```markdown
---

## How to Cite This Document

**MLA Format:**
"Blount to Secretary of War." _Rocky Mount State Historic Site Evidence Room_, 1790.
Web. Accessed [DATE]. <https://tennesseestartshere.com/evidence/documents/blount-arrival-1790>

**APA Format:**
Rocky Mount State Historic Site. (1790). Blount to Secretary of War. Retrieved from
https://tennesseestartshere.com/evidence/documents/blount-arrival-1790

**Chicago Format:**
Rocky Mount State Historic Site. "Blount to Secretary of War." Rocky Mount State Historic
Site Evidence Room. Accessed [DATE]. https://tennesseestartshere.com/evidence/documents/blount-arrival-1790.

**Permalink:** `https://tennesseestartshere.com/evidence/documents/blount-arrival-1790`

---

_For corrections or research inquiries, contact: rockymountmuseum@gmail.com_
```

### Source Citation Style

For the `source` field, use this format:

```
[Primary Source Location], [Secondary Reference if applicable]
```

Examples:

- `"National Archives, via Founders Online"`
- `"Tennessee Encyclopedia, citing Blount Papers"`
- `"Avalon Project, Yale Law School"`
- `"Library of Congress, Chronicling America"`

---

## Naming Conventions

### File Names

| Entity     | Pattern   | Example                  |
| ---------- | --------- | ------------------------ |
| Document   | `{id}.md` | `blount-arrival-1790.md` |
| Person     | `{id}.md` | `standing-turkey.md`     |
| Collection | `{id}.md` | `treaties.md`            |

### ID Patterns

| Entity            | Pattern                               | Examples                         |
| ----------------- | ------------------------------------- | -------------------------------- |
| Letter            | `{author}-to-{recipient}-{YYYY}-{MM}` | `blount-to-knox-1790-11`         |
| Letter (arrival)  | `{author}-arrival-{YYYY}`             | `blount-arrival-1790`            |
| Treaty            | `treaty-{name}-{YYYY}`                | `treaty-holston-1791`            |
| Proclamation      | `{author}-proclamation-{YYYY}`        | `washington-proclamation-1791`   |
| Newspaper         | `{paper-name}-{YYYY-MM-DD}`           | `knoxville-gazette-1791-11-05`   |
| Person            | `{firstname}-{lastname}`              | `william-blount`                 |
| Person (Cherokee) | `{english-name}`                      | `hanging-maw`, `standing-turkey` |
| Collection        | `{descriptive-name}`                  | `blount-papers`, `treaties`      |

### URL Structure

```
/evidence/documents/{document-id}
/evidence/people/{person-id}
/evidence/collections/{collection-id}
/evidence/timeline
/evidence/library/{collection-id}
```

---

## Date Standards

### ISO 8601 Compliance

All dates use ISO 8601 format:

| Precision  | Format     | Example    |
| ---------- | ---------- | ---------- |
| Full date  | YYYY-MM-DD | 1790-10-20 |
| Year-month | YYYY-MM    | 1790-10    |
| Year only  | YYYY       | 1790       |

### Handling Uncertainty

When exact date is uncertain:

1. Use the most precise known date
2. Add description clarifying uncertainty
3. Use `date_range` for spans

```yaml
date: '1788-04-01'
description: 'Estimated Spring 1788 based on biographical timelines'
```

### Calendar Considerations

Pre-1752 dates (not applicable to this archive but noted):

- Dates before September 14, 1752 may be Old Style (Julian)
- British colonies adopted Gregorian calendar in 1752

---

## Verification Notes Guidelines

### When to Write Notes

Notes are REQUIRED when:

- `status: disputed`
- `status: reconstructed`
- `source_count: 0`
- Any claim contradicts common understanding

### Notes Content Checklist

Good verification notes answer:

1. **What is disputed?** Specific claim that lacks support
2. **What evidence exists?** Even if indirect
3. **What was searched?** Archives, databases, collections
4. **What is the scholarly consensus?** If any
5. **Why does the claim persist?** Historical tradition, etc.

### Example: Cherokee Biography Notes

```yaml
notes: >
  No Cherokee-authored documents about [Person] have been identified in archives.
  This biography reflects how they were perceived and documented by U.S. officials
  and settlers. Cherokee oral histories and tribal records may contain different
  perspectives. Birth/death years are estimates based on treaty participation dates.
```

### Example: Dendrochronology Caveat

```yaml
notes: >
  IMPORTANT: UT dendrochronology study (2007) dates current buildings to 1826-1830.
  Events prior to 1826 occurred in earlier structures no longer standing. The ground
  is original; the buildings are not.
```

---

## Content Formatting

### Document Body Structure

```markdown
---
[YAML frontmatter]
---

# Document Title

Brief introduction or context.

## Main Content Section

<passage id="key-quote">
Primary source text here.
</passage>

---

## Historical Context

Explanation of significance, background.

---

## Source Notes

Information about where this document came from, physical location, etc.

---

## How to Cite This Document

[Standard citation block]

---

_For corrections or research inquiries, contact: rockymountmuseum@gmail.com_
```

### Person Body Structure

```markdown
---
[YAML frontmatter]
---

# Person Name (Cherokee Name)

Opening paragraph with basic biographical info.

## Early Life and Rise to Leadership

[For full bios]

## Role in Cherokee-American Relations

[For Cherokee figures]

## [Key Event/Document Connection]

Specific connection to Rocky Mount, Treaty of Holston, etc.

## Legacy

Impact and historical significance.
```

---

## Quality Checklist

Before committing any new content:

### Document Checklist

- [ ] ID is unique and follows naming convention
- [ ] Date is ISO 8601 format
- [ ] content_type matches content
- [ ] collection ID exists
- [ ] All person IDs in people_mentioned exist
- [ ] source_count matches actual sources
- [ ] Citation block included at end
- [ ] Contact email included

### Person Checklist

- [ ] ID is unique and URL-safe
- [ ] is_cherokee boolean is set
- [ ] is_signatory boolean is set
- [ ] documents array references valid document IDs
- [ ] Cherokee names include alt spellings where known
- [ ] verification.notes explains any reconstruction

### Collection Checklist

- [ ] document_count is accurate
- [ ] key_figures references valid person IDs
- [ ] date_range covers actual document dates
- [ ] why_it_matters explains historical significance

---

## Changelog

| Version | Date       | Changes                   |
| ------- | ---------- | ------------------------- |
| 1.0     | 2026-01-30 | Initial standards release |

---

_These standards ensure the Rocky Mount Digital Archive maintains scholarly integrity while remaining accessible to researchers, educators, and the public._
