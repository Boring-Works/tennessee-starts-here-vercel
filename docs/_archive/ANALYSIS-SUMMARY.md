# Evidence Room Data Architecture: Analysis Summary

**Prepared:** January 30, 2026
**Status:** Complete
**Deliverables:** 3 Documents + This Summary

---

## What Was Analyzed

Your Evidence Room (`/app/(main)/evidence/page.tsx`) and related data systems:

- Treaty signer data management
- Quote/primary source organization
- Timeline events structure
- Source repository linking
- Metadata and authority positioning

---

## Key Findings

### Strengths ✓

- **Timeline events properly structured** — Migrated to JSON (`/content/timeline-events.json`), correctly imported
- **Copy system centralized** — `/lib/copy/` provides single source for brand messaging
- **Quote sourcing** — All quotes have proper attribution and source URLs
- **Component architecture** — Clean React patterns, reusable cards

### Gaps ⚠️

- **TREATY_SIGNERS hardcoded** — Embedded in React component, not reusable
- **Data/copy confusion** — PRIMARY_QUOTES in copy system, not data system
- **No metadata** — Evidence items lack verification status, authority levels
- **Authority positioning weak** — No indication of scholarly review or verification
- **Limited cross-linking** — Documents exist in silos, no relationship graph
- **Non-technical access** — All changes require developer involvement

---

## The Three Documents

### 1. **EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md** (Primary)

**40+ pages of detailed analysis**

Contains:

- Current state assessment of all 6 data systems
- 7 specific recommendations with business justification
- 4-week implementation roadmap (Phases 1-4)
- Authority positioning strategy
- CMS decision framework

**Read this if:** You want to understand the full architecture and long-term strategy.

---

### 2. **EVIDENCE-QUICK-FIXES.md** (Implementation Guide)

**4 concrete fixes, 2-4 hours total work**

Step-by-step instructions for:

1. Migrate TREATY_SIGNERS to JSON (20 min)
2. Migrate PRIMARY_QUOTES to JSON (15 min)
3. Migrate SOURCE_LINKS to JSON (10 min)
4. Create unified type schema (15 min)

**Read this if:** You want to start implementing Phase 1 immediately.

**Testing checklist included.**

---

### 3. **EVIDENCE-CMS-SCHEMA.md** (Technical Reference)

**For future CMS integration**

Provides complete schemas for:

- **Sanity Studio** (recommended, headless CMS)
- **PostgreSQL** (traditional backend)
- **Supabase** (combines both, matches your stack)

Plus editorial workflows and validation rules.

**Read this if:** You're planning Phase 3 (CMS implementation).

---

## Quick Win: Phase 1 (This Week)

**Time:** 2-4 hours
**Impact:** Immediate maintainability improvement + foundation for future scaling

```bash
# 1. Create three new JSON files
touch content/treaty-signers.json
touch content/primary-quotes.json
touch content/source-repositories.json

# 2. Follow EVIDENCE-QUICK-FIXES.md steps
# 3. Update imports in page.tsx
# 4. Run tests
npm run build

# 5. Commit
git commit -m "chore: migrate evidence data to JSON layer"
```

**Result:**

- Data separated from presentation
- Reusable across pages
- Ready for CMS integration
- 50 lines removed from React component

---

## Strategic Impact

### Without CMS (Current)

- Developer maintains evidence data
- Changes slow, require code review
- Limited scalability (hard to add 42+ signers)
- No authority metadata
- Difficult for academics to integrate

### With Recommended Changes

- Museum staff can edit content
- Instant publication (Git-backed)
- Scales to 500+ items easily
- Full audit trail
- API for scholarly access

---

## File Locations

All analysis documents are in the project root:

```
tennessee-starts-here/
├── EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md  ← Full analysis (read first)
├── EVIDENCE-QUICK-FIXES.md                 ← Implementation guide
├── EVIDENCE-CMS-SCHEMA.md                  ← CMS schemas
└── ANALYSIS-SUMMARY.md                     ← This file
```

---

## Recommended Reading Order

1. **This summary** (5 min) — You are here
2. **EVIDENCE-QUICK-FIXES.md** (15 min) — See what Phase 1 entails
3. **EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md** (30 min) — Understand full strategy
4. **EVIDENCE-CMS-SCHEMA.md** (reference) — When planning Phase 3

---

## Questions This Analysis Answers

| Question                                     | Answer Location                                      |
| -------------------------------------------- | ---------------------------------------------------- |
| Should TREATY_SIGNERS be in a separate file? | Yes - Recommendation 1, page 2                       |
| Are constants properly organized?            | Mixed - Recommendation 2, page 3                     |
| Should timeline events be in JSON?           | Yes, already done ✓                                  |
| Is there opportunity for normalization?      | Significant - Recommendation 4, page 4               |
| Could metadata be more structured?           | Yes - Recommendation 5, page 5                       |
| Should there be a CMS?                       | Yes, headless recommended - Recommendation 6, page 6 |

---

## Implementation Prioritization

| Priority      | Action                         | Timeline  | Owner           |
| ------------- | ------------------------------ | --------- | --------------- |
| **IMMEDIATE** | Migrate 3 data files (Phase 1) | This week | Dev             |
| **HIGH**      | Add metadata to signers        | Week 2    | Dev + Historian |
| **MEDIUM**    | Setup Sanity Studio            | Week 5    | Dev             |
| **MEDIUM**    | Build cross-linking system     | Week 4    | Dev             |
| **LOW**       | Create scholar API             | Week 8    | Dev             |

---

## Contact Points for Questions

The analysis documents reference:

- Current code files with specific line numbers
- Component relationships (which page imports what)
- Type definitions (where to add new interfaces)
- Git commits and validation commands

See the detailed analysis for all specifics.

---

## Next Steps

1. **Decide:** Do you want to implement Phase 1 this week?
   - Yes → Assign EVIDENCE-QUICK-FIXES.md to developer
   - No → Schedule for later

2. **Plan:** When would you want CMS (Phase 3)?
   - Q1 2026 → Start Phase 2 now
   - Q2 2026 → Start Phase 2 in April
   - Later → Keep on radar

3. **Share:** Which stakeholders should review?
   - Museum director (for CMS impact)
   - Historians (for metadata structure)
   - Developers (for implementation)

---

## Document Statistics

| Document              | Pages   | Words      | Sections          |
| --------------------- | ------- | ---------- | ----------------- |
| Architecture Analysis | 40+     | 8,500      | 12 major          |
| Quick Fixes           | 12      | 2,200      | 4 fixes + testing |
| CMS Schema            | 18      | 3,100      | 3 options         |
| **Total**             | **70+** | **13,800** | **19**            |

---

_Analysis prepared for Tennessee Starts Here / Rocky Mount State Historic Site_
_Part of America 250 digital initiative_
