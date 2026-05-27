# RA-03 Executive Summary

## Documentation Redundancy Audit — Tennessee Starts Here

**Scan Date:** January 30, 2026
**Analyst:** Research Assistant 03 (RA-03)
**Status:** 115 docs audited | 55 redundancies identified | 45-50 canonical docs recommended

---

## THE PROBLEM IN ONE SENTENCE

The documentation system has **30-40% redundancy**, mostly from "System Spec + Quick Reference + Visual Reference + Summary" appearing in duplicate across nearly every feature (Design System, Almanac, Evidence, Governor, etc.).

---

## BY THE NUMBERS

| Metric                    | Count       |
| ------------------------- | ----------- |
| Total docs scanned        | 115         |
| Genuinely redundant docs  | 55 (48%)    |
| Can be merged             | 36 docs     |
| Should be archived        | 28 docs     |
| Unique-value docs to keep | 45          |
| **Target after cleanup**  | **50 docs** |

---

## THE BIG DUPLICATIONS

### 1. Design System (19 → 9 docs)

**Pattern:** Full doc + Quick Reference + Visual Reference + Summary + Examples

```
MOTION-SYSTEM.md
├── MOTION-QUICK-REFERENCE.md (MERGE)
├── MOTION-VISUAL-REFERENCE.md (MERGE)
├── MOTION-SYSTEM-SUMMARY.md (DELETE)
└── MOTION-MIGRATION-WORKERS.md (DELETE)

SPACING-SYSTEM.md
├── SPACING-QUICK-REFERENCE.md (MERGE)
├── SPACING-VISUAL-REFERENCE.md (MERGE)
├── SPACING-SYSTEM-REPORT.md (DELETE)
└── SPACING-PATTERNS.md (DELETE)

DESIGN-TOKENS.md
├── TOKEN-QUICK-REFERENCE.md (MERGE)
├── TOKEN-VISUAL-REFERENCE.md (MERGE)
└── TOKEN-EXAMPLES.md (DELETE)

STYLE-GUIDE.md
├── STYLE-EXAMPLES.md (MERGE)
├── STYLE-PATTERNS-VISUAL.md (MERGE)
└── STYLE-DEVIATIONS.md (DELETE)
```

**Action:** Add "Quick Reference," "Visual Guide," and "Examples" sections to canonical docs.

---

### 2. Almanac Marketing (13 docs → 3-4 docs)

**Pattern:** Strategy documented 4+ ways with overlapping "start here" docs

```
ALMANAC-MARKETING-INTEGRATION.md (authoritative)
├── INDEX-ALMANAC-MARKETING.md (MERGE/DELETE)
├── README-ALMANAC-INTEGRATION.md (MERGE)
├── ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md (MERGE)
└── ALMANAC-QUICK-REFERENCE.md (MERGE)

Plus:
├── 1775-ALMANAC-BUILD-GUIDE.md (ARCHIVE)
└── 1790-ALMANAC-TOOL.md (ARCHIVE)
```

**Action:** Consolidate all into ALMANAC-MARKETING-INTEGRATION.md with sections for different audiences.

---

### 3. Evidence Audits (10 docs → 2-3 docs)

**Pattern:** Same accuracy review fragmented across 6 separate docs

```
EVIDENCE-ACCURACY-REVIEW.md (primary)
├── EVIDENCE-ARCHIVE-REVIEW.md (MERGE)
├── EVIDENCE-CHEROKEE-AUDIT.md (MERGE)
├── EVIDENCE-CITATIONS-EXECUTIVE-SUMMARY.md (MERGE)
├── EVIDENCE-LANGUAGE-REVIEW.md (MERGE)
└── EVIDENCE-QUICK-WINS.md (DELETE)

Separate:
└── EVIDENCE-ROOM-DESIGN-SYSTEM.md (KEEP - different concern)
```

**Action:** Merge all accuracy sections into primary; consolidate citations if audit is complete.

---

### 4. Phase Plans (12 → 0 docs in /docs/)

**Pattern:** Historical phase documentation cluttering active specs

```
PHASE-2-*.md (5 docs) → ARCHIVE
PHASE-3-*.md (1 doc) → ARCHIVE
PHASE-4-*.md (5 docs) → ARCHIVE
PHASE-5.2-COMPLETE.md → ARCHIVE/DELETE
```

**Action:** Move all to `/docs/plans/archive/PHASES-2026/`. Keep only active PROJECT.md.

---

### 5. Governor Content (9 docs → 4 docs)

**Pattern:** System doc has separate README, quick ref, examples, guide

```
GOVERNOR-CONTENT-SYSTEM.md (primary)
├── GOVERNOR-CONTENT-README.md (MERGE)
└── GOVERNOR-QUICK-REFERENCE.md (MERGE)

Keep separate:
├── GOVERNOR-CONTENT-EXAMPLES.md (24 scenarios - valuable)
└── GOVERNOR-IMPLEMENTATION-GUIDE.md (dev-focused)
```

**Action:** Merge README + quick ref into GOVERNOR-CONTENT-SYSTEM.md.

---

### 6. Homepage (3 docs → 1 doc)

**Pattern:** Problem described in 3 different ways

```
HOMEPAGE-RESTRUCTURE-SPEC.md (use as primary)
├── HOMEPAGE-RESTRUCTURE.md (MERGE impl details)
└── HOMEPAGE-RESTRUCTURE-ADDITIONS.md (MERGE site-wide changes)
```

**Action:** Single comprehensive spec with all sections.

---

## CLEANUP ROADMAP

### Phase 1: Design System (2 hours)

- MOTION-SYSTEM.md: Add "Quick Reference" section
- SPACING-SYSTEM.md: Add "Quick Reference" section
- DESIGN-TOKENS.md: Add "Quick Reference" section
- DELETE: 6 "Summary" and "System Report" docs
- **Result: 19 → 9 docs**

### Phase 2: Archive Phases (30 min)

- Move all PHASE-\*.md to `/docs/plans/archive/`
- **Result: 90 → 80 docs**

### Phase 3: Almanac & Evidence (2 hours)

- ALMANAC-MARKETING-INTEGRATION.md: Consolidate 6 docs
- EVIDENCE-ACCURACY-REVIEW.md: Consolidate 4 docs
- **Result: 80 → 65 docs**

### Phase 4: Governor, Homepage, Misc (1-2 hours)

- Consolidate Governor docs (4 → 3)
- Consolidate Homepage docs (3 → 1)
- Clean up miscellaneous (accessibility, accessibility, add-to-calendar, etc.)
- **Result: 65 → 45-50 docs**

**Total effort: 5-7 hours | Total reduction: 115 → 45 docs (61% reduction)**

---

## CRITICAL FINDINGS

### What's Working Well

✅ Core project docs (PROJECT.md, QUICKSTART.md, DO-NOT-DO.md, COPY.md) are clean and focused
✅ Navigation docs are appropriately segmented
✅ Feature-specific design systems (Evidence Room, Almanac) are well-separated

### What Needs Fixing

⚠️ Every design system component has 3-5 variants (full + quick + visual + summary + examples)
⚠️ Almanac marketing strategy documented in 7 quasi-redundant docs
⚠️ Evidence audits fragmented across 6 separate files addressing same concern
⚠️ Phase plans (12 historical docs) clutter active specification directory
⚠️ "Quick Reference" pattern used 20+ times without adding proportional value

### The Root Pattern

The docs follow a repeating anti-pattern:

```
1 authoritative spec + 2-4 reformatted versions for different audiences
(instead of: 1 spec with audience-specific sections)
```

This creates maintenance burden (update 5 places to change one fact) and reader confusion (which version is current?).

---

## RECOMMENDATIONS

### For Today

1. Create `/docs/plans/` folder to segregate active planning from historical phases
2. Note that all 12 PHASE-\*.md docs can safely move to `/plans/archive/`
3. Identify which "quick reference" docs are most used; consolidate others

### For This Week

1. Merge Design System quick refs into primary docs (highest ROI)
2. Consolidate Almanac marketing into single ALMANAC-MARKETING-INTEGRATION.md
3. Consolidate Evidence audits into single EVIDENCE-ACCURACY-REVIEW.md

### For Ongoing

1. **New docs policy:** Never create separate "Quick Reference" docs; add as section to primary
2. **Archive policy:** Move completed phase/project docs to `/plans/archive/` within 2 weeks of completion
3. **Canonical doc pattern:** For each system, designate ONE primary spec and integrate all variants as sections

---

## THE IDEAL STRUCTURE (Post-Cleanup)

```
docs/
├── PROJECT.md (site spec)
├── QUICKSTART.md (setup)
├── DO-NOT-DO.md (constraints)
├── COPY.md (brand voice)
│
├── DESIGN-TOKENS.md (+ quick ref + examples as sections)
├── MOTION-SYSTEM.md (+ quick ref + visual as sections)
├── SPACING-SYSTEM.md (+ quick ref + visual as sections)
├── STYLE-GUIDE.md (brand)
├── MASTER-STYLING-GUIDE.md (implementation)
│
├── ALMANAC.md (feature)
├── ALMANAC-MARKETING-INTEGRATION.md (strategy, consolidated)
├── EVIDENCE-ACCURACY-REVIEW.md (audits, consolidated)
├── EVIDENCE-ROOM-DESIGN-SYSTEM.md
├── GOVERNOR-CONTENT-SYSTEM.md (+ examples + impl guide)
├── NAVIGATION-BUILD-GUIDE.md
├── HOMEPAGE-RESTRUCTURE-SPEC.md
├── WELCOME-SCREEN-BUILD-GUIDE.md
│
├── ACCESSIBILITY-IMPLEMENTATION-GUIDE.md (+ quick ref + checklist)
├── DATA-STANDARDS.md
├── FAREHARBOR-API.md
├── BRAND-STRATEGY.md
│
└── plans/
    ├── 2026-01-28-*.md (active planning)
    └── archive/
        ├── PHASES-2026/
        └── ...
```

**Result: 45-50 clean, canonical docs instead of 115**

---

## DECISION CHECKLIST

- [ ] Approve consolidation of Design System (19 → 9 docs)
- [ ] Approve archiving of Phase Plans (12 docs to /plans/archive/)
- [ ] Approve consolidation of Almanac docs (13 → 3 docs)
- [ ] Approve consolidation of Evidence docs (10 → 2-3 docs)
- [ ] Schedule cleanup work (5-7 hours total)
- [ ] Update documentation guidelines to prevent "quick ref duplication"

---

**Report Location:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/RA-03-REDUNDANCY-REPORT.md`
**Full Report:** 400+ lines of detailed analysis, consolidation plans, and decision tracking
**Key Contacts:** Cody Boring (Project Owner)
