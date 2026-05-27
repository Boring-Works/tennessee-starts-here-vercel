# Tennessee Starts Here: Document Audit Team Structure

**Mission Control:** Dr. Margaret Chen, PhD - Chief Operations Officer (Opus)
**Operation:** Rocky Mount Truth Document Audit
**Target:** 100% website completion via clean workspace foundation

---

## Executive Summary

After reconnaissance of the TNRocky workspace, I've identified:

- **458 markdown files** (excluding node_modules/.next)
- **24MB** of documentation spread across multiple directories
- **3 primary zones** requiring systematic audit
- **Significant duplication** between Historical/, content/, and docs/

This document establishes the team structure to audit, index, and consolidate all Rocky Mount truth documents.

---

## Team Roster

### Division 1: Historical Archive Squad

**Manager:** Samuel "Sam" Reeves
**Specialty:** Primary source verification, academic standards
**Personality:** Former archivist. Methodical. Speaks in citations. Calls everyone "colleague." Gets genuinely excited about finding original documents. Will argue about proper provenance tracking for hours.

**Zone Assignment:** `/Users/codyboring/CodyML/projects/TNRocky/Historical/`

| Worker           | ID   | Role                   | Specialty                     |
| ---------------- | ---- | ---------------------- | ----------------------------- |
| Archivist Alpha  | H-01 | Lead Scanner           | Primary source identification |
| Document Delta   | H-02 | Metadata Extractor     | Date/author/source parsing    |
| Citation Charlie | H-03 | Reference Tracker      | Cross-reference validation    |
| Provenance Pete  | H-04 | Chain of Custody       | Source authentication         |
| Timeline Tina    | H-05 | Chronology Mapper      | Date verification             |
| Treaty Tom       | H-06 | Treaty Specialist      | Cherokee/federal docs         |
| Letter Lou       | H-07 | Correspondence Analyst | Historical letters            |
| Map Martha       | H-08 | Geographic Specialist  | Location references           |
| Bio Beth         | H-09 | Biographical Compiler  | Person profiles               |
| Index Ivan       | H-10 | Master Cataloger       | Index maintenance             |

**Priority Keywords:**

- Treaty of Holston, Cobb family, William Blount
- Territorial capital, Southwest Territory
- Cherokee relations, 1790-1796
- Primary source, original document

---

### Division 2: Website Content Squad

**Manager:** Elena "Lena" Vasquez
**Specialty:** Marketing accuracy, visitor-facing content
**Personality:** Former museum educator. Translates scholarly work into accessible content. Protective of visitor experience. Ruthless about cutting jargon. Famous phrase: "If Grandma can't understand it, rewrite it."

**Zone Assignment:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/`

| Worker           | ID   | Role                | Specialty                     |
| ---------------- | ---- | ------------------- | ----------------------------- |
| Fact-Check Fiona | C-01 | Lead Verifier       | Claim validation              |
| Jackson Jen      | C-02 | Jackson Specialist  | 1788 claims, dendrochronology |
| Marketing Mike   | C-03 | Copy Auditor        | Marketing materials           |
| Evidence Eve     | C-04 | Proof Compiler      | Evidence chains               |
| Advisory Amy     | C-05 | Review Analyst      | Scholarly reviews             |
| Research Rick    | C-06 | Deep Dive           | Research documents            |
| SEO Sam          | C-07 | Web Optimizer       | SEO/metadata                  |
| Timeline Ted     | C-08 | Event Verifier      | 2026 calendar accuracy        |
| People Pat       | C-09 | Biographical Editor | People profiles               |
| Document Dan     | C-10 | Source Linker       | Document connections          |

**Priority Keywords:**

- Jackson 1788, dendrochronology, fact-check
- Evidence, verification, primary source
- Marketing, SEO, visitor
- Cherokee representation, diversity, inclusion

---

### Division 3: Technical Documentation Squad

**Manager:** Marcus "Marc" Thornton
**Specialty:** Build documentation, feature specs, cleanup
**Personality:** Former DevOps engineer. Efficiency-obsessed. Hates redundancy. Will delete 50 files to create 1 clean one. Speaks in bullet points. Believes documentation should be "single source of truth or nothing."

**Zone Assignment:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/docs/`

| Worker             | ID   | Role                   | Specialty               |
| ------------------ | ---- | ---------------------- | ----------------------- |
| Cleanup Carl       | T-01 | Lead Auditor           | Redundancy detection    |
| Archive Alice      | T-02 | Archive Manager        | \_archive/ organization |
| Spec Spencer       | T-03 | Specification Reviewer | Feature specs           |
| Almanac Andy       | T-04 | Almanac Specialist     | Weather docs            |
| Token Tara         | T-05 | Design System          | Token documentation     |
| API Aaron          | T-06 | Integration Docs       | API/data standards      |
| Brand Bob          | T-07 | Brand Guidelines       | Copy/style docs         |
| Accessibility Alex | T-08 | A11y Specialist        | Accessibility docs      |
| Calendar Cathy     | T-09 | Event Docs             | Event calendar specs    |
| Build Benny        | T-10 | Build Process          | Build/deploy docs       |

**Priority Keywords:**

- Build, deploy, specification
- Data standards, JSON schema
- Design tokens, brand guidelines
- Accessibility, WCAG, a11y

---

## Search Strategy

### Phase 1: Discovery Scan (All Divisions)

**Target Directories:**

```
/Users/codyboring/CodyML/projects/TNRocky/
├── Historical/           # Division 1 PRIMARY
│   ├── processed/        # 35 verified source documents
│   ├── raw/              # Original archives
│   └── exports/          # Generated outputs
├── tennessee-starts-here/
│   ├── content/          # Division 2 PRIMARY (81 files)
│   │   ├── documents/    # Structured document content
│   │   ├── people/       # Biographical profiles
│   │   └── collections/  # Curated collections
│   ├── docs/             # Division 3 PRIMARY (136 files)
│   │   └── _archive/     # Already flagged for review
│   ├── data/             # JSON data files
│   └── lib/copy/         # Brand copy source of truth
├── _delete/              # CLEANUP ZONE - Flagged for removal
├── Brand Guidelines/     # Review for consolidation
├── sample projects/      # Likely obsolete
├── Weather/Weather2/weather3/ # Prototype archives
└── TN250v2/              # Version artifact
```

### Phase 2: Keyword Priority Matrix

| Priority | Keywords                                                | Significance           |
| -------- | ------------------------------------------------------- | ---------------------- |
| P0       | Jackson 1788, dendrochronology, cabin date              | Core claim validation  |
| P0       | territorial capital, Southwest Territory, first capital | Identity claim         |
| P1       | Treaty of Holston, Cherokee, Blount                     | Key historical events  |
| P1       | Cobb family, William Cobb, original settlers            | Property history       |
| P2       | fact-check, verification, evidence                      | Quality assurance docs |
| P2       | primary source, original document                       | Source materials       |
| P3       | marketing, SEO, visitor experience                      | Launch readiness       |
| P3       | brand, copy, narrative                                  | Content consistency    |

### Phase 3: Duplicate Detection

**Strategy:**

1. Hash file contents (first 500 chars + file size)
2. Cluster by similar titles (fuzzy match)
3. Flag files with >80% content overlap
4. Manual review for merge decisions

**Known Duplicate Zones:**

- `ATTENTION_RETENTION_*.md` (4 files at root)
- `TOUR-MARKETING-*.md` (3 files at root)
- Jackson fact-check files (6+ variations in content/)
- Weather prototype folders (3 versions)

---

## Quality Criteria

### Keep (Green)

- [ ] Contains unique verified historical facts
- [ ] Cited by website components (imported)
- [ ] Single source of truth for a topic
- [ ] Required for launch (feature spec)
- [ ] Contains primary source transcriptions

### Merge (Yellow)

- [ ] Multiple versions of same content
- [ ] Overlapping coverage of same topic
- [ ] Partial implementations combined = complete
- [ ] Strategy + Implementation = One guide

### Delete (Red)

- [ ] Exact duplicate (no unique content)
- [ ] Superseded by newer version
- [ ] Prototype/experiment (never used)
- [ ] Build artifact (auto-generated)
- [ ] Empty/placeholder files

### Archive (Blue)

- [ ] Historical record (may need later)
- [ ] Reference material (not active)
- [ ] Completed project (documented)

---

## Coordination Protocol

### Daily Standup (Simulated)

```
08:00 - Division 1 reports Historical findings
08:10 - Division 2 reports Content audit status
08:20 - Division 3 reports Docs cleanup progress
08:30 - Cross-division sync (duplicates found)
```

### Escalation Path

```
Worker finds issue → Manager reviews → Dr. Chen decides → Cody approves
```

### Communication Channels

- **Findings:** Add to `/docs/AUDIT-FINDINGS.md`
- **Duplicates:** Add to `/docs/DUPLICATE-REPORT.md`
- **Decisions:** Add to `/docs/AUDIT-DECISIONS.md`

---

## Immediate Actions

### For Cody's Approval

1. **Delete `_delete/` folder** - Already flagged, contains:
   - Old build files
   - Obsolete specs
   - Zip archives (extracted)

2. **Archive Weather folders** - Three prototype versions:
   - `Weather/`, `Weather2/`, `weather3/`
   - Keep only reference notes if any unique logic

3. **Consolidate root-level .md files** - TNRocky root has:
   - 4 ATTENTION_RETENTION files
   - 3 TOUR-MARKETING files
   - 8+ strategy/plan documents
   - Merge into single STRATEGY-ARCHIVE.md

4. **Verify `sample projects/`** - Appears to be:
   - Copy of old React versions
   - May contain unique components
   - Division 3 to audit

---

## Success Metrics

| Metric                  | Current | Target                      |
| ----------------------- | ------- | --------------------------- |
| Root .md files          | 28      | 5 (README, CLAUDE.md, etc.) |
| Duplicate sets          | ~15     | 0                           |
| Truth documents indexed | 0       | 100%                        |
| Website claims verified | ~60%    | 100%                        |
| Launch blockers         | Unknown | 0                           |

---

## Manager Deployment Orders

### Sam Reeves (Division 1 - Historical)

```
PRIMARY: Index all processed/ documents
SECONDARY: Cross-reference with content/documents/
OUTPUT: HISTORICAL-TRUTH-INDEX.md with citations
```

### Elena Vasquez (Division 2 - Content)

```
PRIMARY: Verify all Jackson/dendrochronology claims
SECONDARY: Audit content/ for fact-check status
OUTPUT: CONTENT-VERIFICATION-MATRIX.md
```

### Marcus Thornton (Division 3 - Technical)

```
PRIMARY: Catalog docs/_archive/ for deletion candidates
SECONDARY: Identify redundant spec documents
OUTPUT: CLEANUP-RECOMMENDATIONS.md
```

---

## Timeline

| Day | Division 1           | Division 2          | Division 3        |
| --- | -------------------- | ------------------- | ----------------- |
| 1   | Full Historical scan | Jackson fact-checks | docs/ inventory   |
| 2   | Cross-reference      | Evidence reviews    | Redundancy report |
| 3   | Index complete       | Verification matrix | Cleanup list      |
| 4   | Quality check        | Website audit       | Archive decisions |
| 5   | Final report         | Final report        | Final report      |

---

## Appendix: File Counts by Zone

```
Historical/
├── processed/     35 files (verified sources)
├── raw/           ~50 files (original archives)
├── exports/       Variable
└── root           17 files (indexes, summaries)

tennessee-starts-here/content/
├── documents/     41 files (structured content)
├── people/        50 files (biographies)
├── collections/   6 subdirs (curated)
├── campaigns/     TBD
├── emails/        TBD
├── guides/        TBD
└── root           ~50 files (research, reviews)

tennessee-starts-here/docs/
├── _archive/      30 files (flagged)
└── root           108 files (active + needs review)
```

---

**Document Version:** 1.0
**Created:** 2026-01-30
**Author:** Dr. Margaret Chen, COO
**Status:** READY FOR DEPLOYMENT

---

_"The truth is in the documents. Our job is to find it, verify it, and make it accessible."_

— Dr. Margaret Chen
