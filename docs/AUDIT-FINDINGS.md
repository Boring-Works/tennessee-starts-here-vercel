# Tennessee Starts Here: Audit Findings

**Operation:** Rocky Mount Truth Document Audit
**Lead:** Dr. Margaret Chen, COO
**Date Started:** 2026-01-30
**Status:** IN PROGRESS

---

## Executive Summary

Initial reconnaissance complete. Key findings below.

### Critical Truth Documents Identified

These are the "source of truth" documents that support website claims:

| Priority | Document                       | Location              | Purpose                                |
| -------- | ------------------------------ | --------------------- | -------------------------------------- |
| P0       | JACKSON-FACT-CHECK-INDEX.md    | content/              | Master index for Jackson 1788 analysis |
| P0       | JACKSON-TIMELINE-FACT-CHECK.md | content/              | Complete timeline with evidence        |
| P0       | JACKSON-FINDINGS-SUMMARY.md    | content/              | Executive summary                      |
| P0       | JACKSON-DENDRO-FACT-CHECK.md   | content/              | Dendrochronology evidence              |
| P0       | FACT-CHECK-REPORT.md           | content/              | Overall fact-check audit               |
| P1       | MASTER_INDEX.md                | Historical/           | 75KB comprehensive source index        |
| P1       | processed/\*.md                | Historical/processed/ | 35 verified primary sources            |
| P1       | PROSOPOGRAPHY-ANALYSIS.md      | Historical/           | Person network analysis                |
| P2       | BRAND-STRATEGY.md              | docs/                 | Marketing positioning                  |
| P2       | WEBSITE_STRATEGY_REFERENCE.md  | Historical/           | Strategy document                      |

---

## Division Reports

### Division 1: Historical Archive (Sam Reeves)

**Zone:** `/Users/codyboring/CodyML/projects/TNRocky/Historical/`

**Findings:**

#### HIGH VALUE - Keep

| File                             | Size  | Value                        |
| -------------------------------- | ----- | ---------------------------- |
| MASTER_INDEX.md                  | 75KB  | Comprehensive source catalog |
| PROSOPOGRAPHY-ANALYSIS.md        | 43KB  | Person network analysis      |
| GEOGRAPHIC-ANALYSIS.md           | 35KB  | Location mapping             |
| rocky-mount-archive-vision-v2.md | 37KB  | Archive strategy             |
| processed/\*.md (35 files)       | ~80KB | Verified primary sources     |

#### MERGE CANDIDATES

| Files                      | Issue                | Recommendation                  |
| -------------------------- | -------------------- | ------------------------------- |
| GEOGRAPHIC-\*.md (4 files) | Overlapping coverage | Merge into GEOGRAPHIC-MASTER.md |
| README\*.md (2 files)      | Duplicative          | Keep only one                   |

#### DELETE CANDIDATES

| File     | Reason                            |
| -------- | --------------------------------- |
| exports/ | Generated outputs, can regenerate |

**Status:** CLEAN - Well organized, minimal cleanup needed

---

### Division 2: Website Content (Elena Vasquez)

**Zone:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/`

**Findings:**

#### CRITICAL TRUTH DOCUMENTS (Jackson Cluster)

| File                                  | Purpose                 | Status   |
| ------------------------------------- | ----------------------- | -------- |
| JACKSON-FACT-CHECK-INDEX.md           | Master navigation       | COMPLETE |
| JACKSON-TIMELINE-FACT-CHECK.md        | Full analysis           | VERIFIED |
| JACKSON-FINDINGS-SUMMARY.md           | Executive summary       | VERIFIED |
| JACKSON-DENDRO-FACT-CHECK.md          | Building dates evidence | VERIFIED |
| JACKSON-DENDRO-FACT-CHECK-UPDATED.md  | Latest version          | KEEP     |
| JACKSON-PRIMARY-SOURCES-FACT-CHECK.md | Source audit            | VERIFIED |
| JACKSON-CLAIM-PRESENTATION-OPTIONS.md | Display guidance        | VERIFIED |
| JACKSON-CORRECTION-GUIDE.md           | How to fix claims       | VERIFIED |

**KEY FINDING:** Jackson documentation is EXCELLENT. 8 comprehensive documents covering all aspects.

#### EVIDENCE REVIEWS (Advisory Panel Simulation)

| File                                       | Size   | Purpose              |
| ------------------------------------------ | ------ | -------------------- |
| EVIDENCE-REVIEW-HISTORICAL-ACCURACY.md     | 29KB   | Accuracy audit       |
| EVIDENCE-REVIEW-SCHOLARLY-STANDARDS.md     | 39KB   | Academic standards   |
| EVIDENCE-REVIEW-DIVERSITY-INCLUSION.md     | 43KB   | Representation audit |
| EVIDENCE-REVIEW-CHEROKEE-REPRESENTATION.md | 35KB   | Cherokee voice       |
| EVIDENCE-REVIEW-NARRATIVE-FLOW.md          | 35KB   | Story structure      |
| EVIDENCE-REVIEW-TECHNICAL-PERFORMANCE.md   | 28KB   | Performance audit    |
| EVIDENCE-REVIEW-\*.md (9 total)            | ~300KB | Complete review set  |

**KEY FINDING:** Evidence reviews are COMPREHENSIVE. 9 simulated advisory panel reports.

#### RESEARCH DOCUMENTS (Biographical)

| File                                          | Purpose                   | Keep/Merge |
| --------------------------------------------- | ------------------------- | ---------- |
| WILLIAM-COBB-REVOLUTIONARY-WAR-RESEARCH.md    | Cobb military             | KEEP       |
| WILLIAM-BLOUNT-1780-REVOLUTIONARY-RESEARCH.md | Blount background         | KEEP       |
| MARY-PATTON-\*.md (2 files)                   | Mary Patton bio           | MERGE      |
| JOHN-SEVIER-ROCKY-MOUNT-RESEARCH.md           | Sevier connection         | KEEP       |
| KINGS-MOUNTAIN-VETERANS-\*.md                 | Revolutionary connections | KEEP       |
| COBB-FAMILY-RESEARCH.md                       | Family history            | KEEP       |
| CHILDREN-RESEARCH.md                          | Children at Rocky Mount   | KEEP       |
| ENSLAVED-PEOPLE-RESEARCH.md                   | Enslaved persons          | KEEP       |
| FREE-BLACK-PEOPLE-RESEARCH.md                 | Free Black residents      | KEEP       |
| WOMENS-VOICES-RESEARCH.md                     | Women's history           | KEEP       |
| SCOTS-IRISH-RESEARCH.md                       | Ethnic heritage           | KEEP       |
| WORKING-CLASS-RESEARCH.md                     | Labor history             | KEEP       |
| SERVANTS-LABORERS-RESEARCH.md                 | Service workers           | KEEP       |
| RELIGIOUS-MINORITIES-RESEARCH.md              | Religious diversity       | KEEP       |
| MIXED-RACE-RESEARCH.md                        | Mixed heritage            | KEEP       |

**KEY FINDING:** Diversity research is EXTENSIVE. 15 biographical/demographic research documents.

#### MARKETING DOCUMENTS

| File                               | Size | Purpose               |
| ---------------------------------- | ---- | --------------------- |
| MARKETING-EDUCATOR-OUTREACH.md     | 85KB | School programs       |
| MARKETING-PARTNERSHIP-STRATEGY.md  | 58KB | Partner relationships |
| MARKETING-PRESS-MEDIA-STRATEGY.md  | 67KB | PR strategy           |
| MARKETING-SEO-IMPLEMENTATION.md    | 44KB | SEO tactics           |
| MARKETING-SOCIAL-MEDIA-STRATEGY.md | 41KB | Social content        |

**KEY FINDING:** Marketing documentation is PROFESSIONAL. 5 comprehensive strategy documents.

#### MERGE CANDIDATES

| Files                           | Issue            | Recommendation                      |
| ------------------------------- | ---------------- | ----------------------------------- |
| MARY-PATTON-\*.md (2 files)     | Overlapping      | Merge into MARY-PATTON-COMPLETE.md  |
| ADVISORY-REVIEW-\*.md (7 files) | Related reviews  | Consider single ADVISORY-REVIEWS.md |
| URL-\*.md (4 files)             | URL verification | Merge into URL-AUDIT.md             |

#### DELETE CANDIDATES

| File                 | Reason              |
| -------------------- | ------------------- |
| evidence-trails.json | Temporary data file |
| timeline-events.json | Build artifact      |

**Status:** HEALTHY - Well organized, minor consolidation possible

---

### Division 3: Technical Documentation (Marcus Thornton)

**Zone:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/docs/`

**Findings:**

#### CRITICAL KEEP

| File              | Purpose              |
| ----------------- | -------------------- |
| CLAUDE.md (root)  | Project instructions |
| DATA-STANDARDS.md | JSON schemas         |
| PROJECT.md        | Technical spec       |
| STYLE-GUIDE.md    | Visual standards     |
| COPY.md           | Brand guidelines     |
| ALMANAC.md        | Weather feature      |

#### \_archive/ FOLDER (30 files)

| Pattern         | Count | Recommendation           |
| --------------- | ----- | ------------------------ |
| RA-\*.md        | 15    | DELETE - Audit artifacts |
| DESIGN-\*.md    | 5     | REVIEW - May have value  |
| LEGACY-\*.md    | 3     | DELETE - Superseded      |
| MIGRATION-\*.md | 4     | DELETE - Completed       |
| Other           | 3     | REVIEW case by case      |

#### REDUNDANCY DETECTED

| Files                         | Issue                         |
| ----------------------------- | ----------------------------- |
| ACCESSIBILITY-\*.md (5 files) | Merge into single guide       |
| ALMANAC-\*.md (10+ files)     | Consolidate almanac docs      |
| TOKEN-\*.md (4 files)         | Keep all (different purposes) |
| CITATION-\*.md (3 files)      | Merge into CITATION-GUIDE.md  |

#### ROOT-LEVEL CLEANUP (TNRocky/)

| Files at TNRocky root               | Recommendation                |
| ----------------------------------- | ----------------------------- |
| ATTENTION*RETENTION*\*.md (4)       | ARCHIVE or DELETE             |
| TOUR-MARKETING-\*.md (3)            | ARCHIVE or MERGE              |
| COMPLETION_PLAN.md                  | ARCHIVE - Dated               |
| DELIVERABLES.md                     | ARCHIVE - Dated               |
| EMAIL_TEMPLATES_READY.md            | KEEP if used                  |
| FAREHARBOR_CHECKLIST.md             | KEEP if active                |
| GOVERNORS_GLASS_LEAN_PLAN.md        | ARCHIVE                       |
| GUIDE-SCRIPTS-\*.md                 | REVIEW                        |
| MARKETING-CAMPAIGN-\*.md            | MERGE with content/ marketing |
| QUICK_LAUNCH_CHECKLIST.md           | ARCHIVE - Dated               |
| QUICK-REFERENCE-CARD.md             | KEEP if used                  |
| rocky-mount-explore-page-spec.md    | ARCHIVE - Implemented         |
| SYSTEM_OVERVIEW.txt                 | DELETE - Dated                |
| TENNESSEE_STARTS_HERE_BUILD_PLAN.md | ARCHIVE - Complete            |

**Status:** NEEDS CLEANUP - Significant consolidation opportunity

---

## Duplicate Detection Report

### Exact/Near Duplicates

| Set                | Files                                                        | Resolution             |
| ------------------ | ------------------------------------------------------------ | ---------------------- |
| Weather prototypes | Weather/, Weather2/, weather3/                               | DELETE all, keep notes |
| Sample projects    | sample projects/ (2 folders)                                 | DELETE - Old versions  |
| Build files        | Build Files/ + \_delete/Build Files/                         | DELETE duplicates      |
| Correction specs   | \_delete/corrections/ + \_delete/tennessee-starts-here-spec/ | DELETE                 |

### Content Overlap (80%+ similar)

| File A                                   | File B                               | Resolution        |
| ---------------------------------------- | ------------------------------------ | ----------------- |
| JACKSON-DENDRO-FACT-CHECK.md             | JACKSON-DENDRO-FACT-CHECK-UPDATED.md | Keep UPDATED only |
| TOUR-MARKETING-INDEX.md                  | TOUR-MARKETING-README.md             | Merge             |
| ATTENTION_RETENTION_EXECUTIVE_SUMMARY.md | ATTENTION_RETENTION_README.md        | Merge             |

---

## Recommended Actions

### Immediate (Cody Approval Required)

1. **DELETE `/Users/codyboring/CodyML/projects/TNRocky/_delete/`**
   - 352KB of obsolete files
   - Already flagged for deletion
   - Contains: old build files, zip archives, outdated specs

2. **DELETE Weather prototype folders**
   - `Weather/` (120KB)
   - `Weather2/` (472MB - includes node_modules!)
   - `weather3/` (188KB)
   - Total recovery: ~472MB

3. **DELETE sample projects/**
   - Two old React copies
   - 764KB, no unique content

### Short-term (Week 1)

4. **Archive TNRocky root .md files**
   - Move 28 files to `_archive/strategy-2025/`
   - Keep only README, CLAUDE.md at root

5. **Consolidate docs/\_archive/**
   - Review 30 files
   - Delete audit artifacts (RA-\*.md)
   - Keep historical references

6. **Merge content/ duplicates**
   - MARY-PATTON files
   - URL verification files
   - Advisory review summaries

### Medium-term (Month 1)

7. **Create unified indexes**
   - TRUTH-DOCUMENTS-INDEX.md (master reference)
   - RESEARCH-LIBRARY.md (all biographical docs)
   - MARKETING-PLAYBOOK.md (consolidated strategy)

---

## Truth Document Index (For Website Support)

### Jackson Claims

| Claim                 | Truth Document                       | Status     |
| --------------------- | ------------------------------------ | ---------- |
| "Jackson stayed 1788" | JACKSON-FACT-CHECK-INDEX.md          | DISPUTED   |
| "Buildings from 1788" | JACKSON-DENDRO-FACT-CHECK-UPDATED.md | DISPROVEN  |
| "Six weeks stay"      | JACKSON-TIMELINE-FACT-CHECK.md       | UNVERIFIED |

### Territorial Capital Claims

| Claim                             | Truth Document                                               | Status   |
| --------------------------------- | ------------------------------------------------------------ | -------- |
| "First territorial capital"       | Historical/MASTER_INDEX.md                                   | VERIFIED |
| "Blount's headquarters 1790-1792" | Historical/processed/026-william-blount-tn-encyclopedia.md   | VERIFIED |
| "Southwest Territory"             | Historical/processed/013-southwest-territory-encyclopedia.md | VERIFIED |

### Cherokee Relations

| Claim                     | Truth Document                                           | Status   |
| ------------------------- | -------------------------------------------------------- | -------- |
| "Treaty of Holston 1791"  | Historical/processed/005-treaty-of-holston-1791-07-02.md | VERIFIED |
| "Cherokee at Rocky Mount" | content/CHEROKEE-DOCUMENTS-COMPLETE.md                   | VERIFIED |
| "Cherokee representation" | content/EVIDENCE-REVIEW-CHEROKEE-REPRESENTATION.md       | REVIEWED |

### Building History

| Claim                          | Truth Document                       | Status   |
| ------------------------------ | ------------------------------------ | -------- |
| "Current structures 1826-1830" | JACKSON-DENDRO-FACT-CHECK-UPDATED.md | VERIFIED |
| "Cobb family ownership"        | content/COBB-FAMILY-RESEARCH.md      | VERIFIED |
| "Massengill construction"      | JACKSON-FINDINGS-SUMMARY.md          | VERIFIED |

---

## File Statistics

| Zone             | Total Files | Keep | Merge | Delete | Archive |
| ---------------- | ----------- | ---- | ----- | ------ | ------- |
| Historical/      | 52          | 48   | 4     | 0      | 0       |
| content/         | 81          | 70   | 8     | 3      | 0       |
| docs/            | 138         | 80   | 20    | 15     | 23      |
| TNRocky root     | 28          | 5    | 5     | 0      | 18      |
| \_delete/        | 12          | 0    | 0     | 12     | 0       |
| Weather\*/       | 3 dirs      | 0    | 0     | 3      | 0       |
| sample projects/ | 2 dirs      | 0    | 0     | 2      | 0       |
| **TOTAL**        | 311+        | 203  | 37    | 35     | 41      |

### Space Recovery Estimate

| Action               | Space Saved  |
| -------------------- | ------------ |
| Delete Weather2/     | 472MB        |
| Delete \_delete/     | 352KB        |
| Delete samples/      | 764KB        |
| Archive TNRocky root | (reorganize) |
| **TOTAL**            | ~474MB       |

---

## Next Steps

1. **Cody Review:** Approve deletion/archive recommendations
2. **Execute Cleanup:** Run approved deletions
3. **Create Master Index:** TRUTH-DOCUMENTS-INDEX.md
4. **Update CLAUDE.md:** Point to new structure
5. **Final Audit:** Verify website claims match truth docs

---

## Appendix: Key Path Reference

### Truth Document Locations

```
Critical Jackson Analysis:
/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/JACKSON-FACT-CHECK-INDEX.md

Historical Sources:
/Users/codyboring/CodyML/projects/TNRocky/Historical/MASTER_INDEX.md

Primary Source Transcriptions:
/Users/codyboring/CodyML/projects/TNRocky/Historical/processed/

Evidence Reviews:
/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/EVIDENCE-REVIEW-*.md

Marketing Strategy:
/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/MARKETING-*.md
```

---

**Document Version:** 1.0
**Last Updated:** 2026-01-30
**Author:** Dr. Margaret Chen, COO

_Prepared for Cody Boring, Executive Director, Rocky Mount State Historic Site_
