# Tennessee Starts Here: Cleanup Recommendations

**Prepared by:** Marcus Thornton, Division 3 Manager
**Reviewed by:** Dr. Margaret Chen, COO
**Date:** 2026-01-30
**Status:** AWAITING CODY APPROVAL

---

## Overview

This document provides specific cleanup actions for the TNRocky workspace. All actions are designed to preserve truth documents while removing clutter.

**Philosophy:** Single source of truth. Delete duplicates. Archive history. Clean workspace.

---

## Phase 1: Safe Deletions (Zero Risk)

These items are already marked for deletion or contain no unique content.

### 1.1 Delete `_delete/` folder

**Path:** `/Users/codyboring/CodyML/projects/TNRocky/_delete/`
**Size:** 352KB
**Contents:**

- Build Files/ (old copies)
- corrections/ (outdated)
- tennessee-starts-here-spec/ (superseded)
- Zip files (already extracted)
- JSON files (old data)

**Risk Level:** NONE - Already flagged for deletion
**Recovery:** Files are duplicates or obsolete

**Command:**

```bash
rm -rf /Users/codyboring/CodyML/projects/TNRocky/_delete/
```

---

### 1.2 Delete Sample Projects

**Path:** `/Users/codyboring/CodyML/projects/TNRocky/sample projects/`
**Size:** 764KB
**Contents:**

- rocky-mount---web--tennessee-starts-here---react (1)/
- copy-of-rocky-mount---tennessee-starts-here (1)/

**Risk Level:** LOW - Old React versions, superseded by current build
**Recovery:** Version control history exists

**Command:**

```bash
rm -rf "/Users/codyboring/CodyML/projects/TNRocky/sample projects/"
```

---

### 1.3 Delete Weather2 (node_modules bloat)

**Path:** `/Users/codyboring/CodyML/projects/TNRocky/Weather2/`
**Size:** 472MB
**Contents:**

- app/ (prototype code)
- node_modules/ (470MB of packages!)

**Risk Level:** LOW - Prototype, logic moved to main project
**Recovery:** Can reinstall node_modules; code is prototype only

**Command:**

```bash
rm -rf /Users/codyboring/CodyML/projects/TNRocky/Weather2/
```

---

### 1.4 Delete Weather Prototypes (Weather/, weather3/)

**Path:**

- `/Users/codyboring/CodyML/projects/TNRocky/Weather/`
- `/Users/codyboring/CodyML/projects/TNRocky/weather3/`

**Size:** 308KB combined
**Contents:** Early weather feature prototypes

**Risk Level:** LOW - Superseded by main project almanac
**Recovery:** Logic preserved in main tennessee-starts-here/lib/almanac/

**Command:**

```bash
rm -rf /Users/codyboring/CodyML/projects/TNRocky/Weather/
rm -rf /Users/codyboring/CodyML/projects/TNRocky/weather3/
```

---

## Phase 2: Archive Operations (Reorganization)

These preserve content but clean up the workspace.

### 2.1 Archive TNRocky Root Markdown Files

**Problem:** 28 markdown files at TNRocky root cause clutter
**Solution:** Move to archive folder, keep active docs only

**Files to KEEP at root:**

- (none currently, README would be good to create)

**Files to ARCHIVE:**

```
ATTENTION_RETENTION_EXECUTIVE_SUMMARY.md
ATTENTION_RETENTION_IMPLEMENTATION.md
ATTENTION_RETENTION_README.md
ATTENTION_RETENTION_STRATEGY.md
COMPLETION_PLAN.md
DELIVERABLES.md
EMAIL_TEMPLATES_READY.md
FAREHARBOR_CHECKLIST.md
GOVERNORS_GLASS_LEAN_PLAN.md
GUIDE-SCRIPTS-IMPLEMENTATION.md
MARKETING-CAMPAIGN-TEMPLATES.md
QUICK_LAUNCH_CHECKLIST.md
QUICK-REFERENCE-CARD.md
rocky-mount-explore-page-spec.md
SYSTEM_OVERVIEW.txt
TENNESSEE_STARTS_HERE_BUILD_PLAN.md
TOUR-MARKETING-INDEX.md
TOUR-MARKETING-README.md
TOUR-MARKETING-STRATEGY.md
```

**Command:**

```bash
# Create archive folder
mkdir -p "/Users/codyboring/CodyML/projects/TNRocky/_archive/strategy-docs-2025"

# Move files
mv /Users/codyboring/CodyML/projects/TNRocky/ATTENTION_RETENTION_*.md "/Users/codyboring/CodyML/projects/TNRocky/_archive/strategy-docs-2025/"
mv /Users/codyboring/CodyML/projects/TNRocky/TOUR-MARKETING-*.md "/Users/codyboring/CodyML/projects/TNRocky/_archive/strategy-docs-2025/"
mv /Users/codyboring/CodyML/projects/TNRocky/COMPLETION_PLAN.md "/Users/codyboring/CodyML/projects/TNRocky/_archive/strategy-docs-2025/"
mv /Users/codyboring/CodyML/projects/TNRocky/DELIVERABLES.md "/Users/codyboring/CodyML/projects/TNRocky/_archive/strategy-docs-2025/"
mv /Users/codyboring/CodyML/projects/TNRocky/GOVERNORS_GLASS_LEAN_PLAN.md "/Users/codyboring/CodyML/projects/TNRocky/_archive/strategy-docs-2025/"
mv /Users/codyboring/CodyML/projects/TNRocky/GUIDE-SCRIPTS-IMPLEMENTATION.md "/Users/codyboring/CodyML/projects/TNRocky/_archive/strategy-docs-2025/"
mv /Users/codyboring/CodyML/projects/TNRocky/QUICK_LAUNCH_CHECKLIST.md "/Users/codyboring/CodyML/projects/TNRocky/_archive/strategy-docs-2025/"
mv /Users/codyboring/CodyML/projects/TNRocky/rocky-mount-explore-page-spec.md "/Users/codyboring/CodyML/projects/TNRocky/_archive/strategy-docs-2025/"
mv /Users/codyboring/CodyML/projects/TNRocky/SYSTEM_OVERVIEW.txt "/Users/codyboring/CodyML/projects/TNRocky/_archive/strategy-docs-2025/"
mv /Users/codyboring/CodyML/projects/TNRocky/TENNESSEE_STARTS_HERE_BUILD_PLAN.md "/Users/codyboring/CodyML/projects/TNRocky/_archive/strategy-docs-2025/"
```

**Files to REVIEW (may be active):**

```
EMAIL_TEMPLATES_READY.md - Check if still used
FAREHARBOR_CHECKLIST.md - Check if still active
MARKETING-CAMPAIGN-TEMPLATES.md - May merge with content/
QUICK-REFERENCE-CARD.md - May be useful reference
```

---

### 2.2 Clean docs/\_archive/

**Path:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/docs/_archive/`
**Size:** 30 files
**Issue:** Mix of useful references and audit artifacts

**DELETE (audit artifacts):**

```bash
# These are redundancy audit outputs, not source documents
rm /Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/docs/_archive/RA-*.md
```

**KEEP (reference value):**

- Any DESIGN-\*.md files
- Any historical documentation
- Migration completion records (for reference)

---

## Phase 3: Merge Operations (Content Consolidation)

### 3.1 Jackson Dendro Files

**Files:**

- JACKSON-DENDRO-FACT-CHECK.md
- JACKSON-DENDRO-FACT-CHECK-UPDATED.md

**Action:** Delete older version, keep UPDATED

**Command:**

```bash
rm /Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/JACKSON-DENDRO-FACT-CHECK.md
# Rename UPDATED to standard name
mv /Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/JACKSON-DENDRO-FACT-CHECK-UPDATED.md /Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/JACKSON-DENDRO-FACT-CHECK.md
```

---

### 3.2 Mary Patton Files

**Files:**

- MARY-PATTON-BIOGRAPHY-RESEARCH.md
- MARY-PATTON-MASTER-RESEARCH-REPORT.md

**Action:** Review and merge if overlapping

**Recommendation:** Keep MASTER-RESEARCH-REPORT.md as primary

---

### 3.3 URL Verification Files

**Files:**

- README-URL-VERIFICATION.md
- URL-ISSUES-SUMMARY.md
- URL-REMEDIATION-GUIDE.md
- URL-VERIFICATION-CHECKLIST.md

**Action:** Consolidate into single URL-AUDIT.md

---

## Phase 4: Create Master Index

After cleanup, create unified truth document index.

**File:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/docs/TRUTH-DOCUMENTS-INDEX.md`

**Contents:**

- Links to all verified source documents
- Claim-to-document mapping
- Status indicators (verified, disputed, unverified)
- Update log

---

## Execution Checklist

### Ready to Execute (Cody Approval = GO)

- [ ] Phase 1.1: Delete \_delete/ folder
- [ ] Phase 1.2: Delete sample projects/
- [ ] Phase 1.3: Delete Weather2/
- [ ] Phase 1.4: Delete Weather/, weather3/

### Needs Review First

- [ ] Phase 2.1: Archive TNRocky root files
- [ ] Phase 2.2: Clean docs/\_archive/
- [ ] Phase 3.1: Merge Jackson dendro files
- [ ] Phase 3.2: Review Mary Patton files
- [ ] Phase 3.3: Consolidate URL files
- [ ] Phase 4: Create master index

---

## Space Recovery Summary

| Action                     | Space Freed |
| -------------------------- | ----------- |
| Delete Weather2/           | 472 MB      |
| Delete \_delete/           | 352 KB      |
| Delete sample projects/    | 764 KB      |
| Delete Weather/, weather3/ | 308 KB      |
| **TOTAL**                  | **~474 MB** |

---

## Post-Cleanup Structure

After executing all phases:

```
/Users/codyboring/CodyML/projects/TNRocky/
├── _archive/                    # Archived strategy docs
│   └── strategy-docs-2025/      # 2025 planning documents
├── Brand Guidelines/            # Keep (brand assets)
├── Build Files/                 # Keep (active build configs)
├── Historical/                  # Keep (source documents)
│   ├── processed/               # Verified sources
│   ├── raw/                     # Original archives
│   └── exports/                 # Generated outputs
├── tennessee-starts-here/       # Main project
│   ├── content/                 # Website content
│   ├── docs/                    # Technical docs
│   │   └── _archive/            # Archived docs
│   └── ...                      # Code files
└── TN250v2/                     # Review for archive/delete
```

---

## Notes for Cody

### What We're Preserving

1. **All Historical/ content** - Primary sources intact
2. **All content/ research** - Biographical and fact-check work preserved
3. **All active docs/** - Technical documentation stays
4. **All code** - tennessee-starts-here/ code unchanged

### What We're Removing

1. **Obsolete prototypes** - Weather versions superseded
2. **Already-flagged deletions** - \_delete/ folder
3. **Duplicate copies** - sample projects/
4. **Audit artifacts** - RA-\*.md files in \_archive/

### What We're Organizing

1. **Root clutter** - Moving to archive folder
2. **Duplicate content** - Merging overlapping docs
3. **Creating indexes** - Making truth docs findable

---

**Approval Required:** Cody Boring, Executive Director

**Prepared by:** Marcus Thornton, Division 3 Manager
**Reviewed by:** Dr. Margaret Chen, COO

---

_"Clean workspace, clear mind, accurate history."_
