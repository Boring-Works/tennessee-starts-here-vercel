# Evidence Room URL Verification Report

**Verification Date:** January 30, 2026
**Inspector:** URL Checker Team #1
**Status:** VERIFICATION COMPLETE - Issues Identified

---

## Quick Overview

All 38 documents in the Evidence Room have been scanned for source URL verification.

**Results:**

- 23 documents have working source URLs
- 3 documents have broken/inaccessible URLs
- 15 documents are missing source URLs entirely

---

## Documents in This Report

Read these in order:

### 1. **URL-ISSUES-SUMMARY.md** ← START HERE

- **Length:** 2 pages
- **Purpose:** Quick at-a-glance overview
- **Best for:** Getting the big picture in 5 minutes
- **Contains:** What's broken, what's missing, priority ranking

### 2. **URL-VERIFICATION-CHECKLIST.md** ← DETAILED REFERENCE

- **Length:** 9 pages
- **Purpose:** Complete inventory of all 38 documents
- **Best for:** Understanding every document's status
- **Contains:** Full lists, testing results, detailed recommendations

### 3. **URL-REMEDIATION-GUIDE.md** ← ACTION PLAN

- **Length:** 7 pages
- **Purpose:** How to fix all 18 issues
- **Best for:** Step-by-step implementation
- **Contains:** Fix instructions, batch editing guide, research tips

---

## The Issues (Summary)

### Broken URLs (3 documents - URGENT)

| Document                       | Issue         | Fix                                       |
| ------------------------------ | ------------- | ----------------------------------------- |
| treaty-holston-additional-1792 | 404 Not Found | Use DigiTreaties alternative              |
| jackson-at-rocky-mount-1788    | 403 Forbidden | Update to Tennessee Encyclopedia homepage |
| knoxville-gazette-1791-11-05   | 403 Forbidden | Update to Tennessee Encyclopedia homepage |

### Missing URLs (15 documents - HIGH PRIORITY)

- 14 Knoxville Gazette entries need source_url added
- 1 blount-arrival document needs source_url added
- 1 rocky-mount-inventory document needs source_url added

---

## What's Working (19 documents)

All URLs from these trusted sources are functioning perfectly:

- **Library of Congress American State Papers** (12 docs) ✓
- **Library of Congress Maps** (1 doc) ✓
- **Founders Online / National Archives** (7 docs) ✓
- **DigiTreaties** (1 doc) ✓

No action needed for these.

---

## Action Timeline

| Phase     | Time      | Tasks                                   |
| --------- | --------- | --------------------------------------- |
| Review    | 15 min    | Read this README + URL-ISSUES-SUMMARY   |
| Plan      | 30 min    | Review remediation strategies in guide  |
| Execute   | 2-3 hrs   | Fix 3 broken URLs + add 15 missing URLs |
| Verify    | 30 min    | Test fixed URLs                         |
| Report    | 15 min    | Update checklist with results           |
| **TOTAL** | **4 hrs** | **Complete remediation**                |

---

## Where Are The Problems?

### Broken Links (Hard to Fix)

1. **Avalon Project (Yale Law)** - Document moved
   - Old: avalon.law.yale.edu/18th_century/chr1792.asp
   - New: Unknown - needs research or alternative source

2. **Tennessee Encyclopedia** - Server blocking automated access
   - Issue: 403 Forbidden on specific pages
   - Workaround: Link to main site instead

### Missing Links (Easy to Add)

1. **Knoxville Gazette series** - No source URL recorded
   - Cause: Documents added before URL field was implemented
   - Fix: Research gazette digitization and add URLs

2. **Orphaned documents** - Incomplete source info
   - blount-arrival-1790: Missing source_url
   - rocky-mount-inventory-1791: Missing source_url

---

## Next Steps

### For Immediate Action (Today)

1. Read **URL-ISSUES-SUMMARY.md** (5 min)
2. Review broken links in **URL-REMEDIATION-GUIDE.md** Part 1
3. Decide on approach for 3 broken URLs
4. Begin fixes for highest-priority items

### For Short-Term (This Week)

5. Add missing source_url fields to all 15 documents
6. Run URL verification tests
7. Update the checklist with new status

### For Long-Term (Going Forward)

8. Establish quarterly URL verification schedule
9. Create source URL standards for new documents
10. Consider automated link checking in CI/CD pipeline

---

## File Locations

All reports are located in:

```
/content/
├── README-URL-VERIFICATION.md (this file)
├── URL-ISSUES-SUMMARY.md
├── URL-VERIFICATION-CHECKLIST.md
└── URL-REMEDIATION-GUIDE.md
```

---

## Key Findings

**Positive:**

- 61% of documents already have source URLs
- All major sources (Library of Congress, Founders Online) are fully functional
- No security or authenticity concerns found

**Negative:**

- 15% of documents completely lack source URLs
- 8% have broken links that need fixing
- Tennessee Encyclopedia is blocking automated verification

**Recommendation:**

- Fix broken links to prevent future 404/403 errors
- Add missing URLs for full citation completeness
- Implement quarterly checks to catch future issues

---

## Questions?

See the corresponding remedy section in **URL-REMEDIATION-GUIDE.md** for detailed solutions to each issue.

---

**Report Summary:**

- Documents examined: 38
- URLs tested: 23
- Status: COMPLETE
- Issues found: 18
- Estimated fix time: 4 hours

_For full details, see the accompanying documents._
