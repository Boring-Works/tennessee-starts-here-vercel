# RA-03 Redundancy Audit Report

## Tennessee Starts Here Documentation System

**Scan Date:** January 30, 2026
**Total Docs Scanned:** 115
**Report Type:** Technical Documentation Redundancy Analysis
**Analyst:** Research Assistant 03 (RA-03)

---

## EXECUTIVE SUMMARY

The documentation system has **significant duplication** across 4 major categories. Multiple docs cover identical content with different framing/audience, creating maintenance burden and reader confusion. The audit identified **24 redundant documents** that can be consolidated into 8-10 canonical sources.

**Key Finding:** "Quick Reference" and "Summary" docs exist for nearly every major system, each repeating core information in slightly different formats. This creates documentation sprawl without adding commensurate value.

---

## CATEGORY 1: CORE PROJECT DOCS

**Files:** PROJECT.md | QUICKSTART.md | DO-NOT-DO.md | COPY.md | (CONTRIBUTING.md in parent)

### Status

✅ **MINIMAL REDUNDANCY** — This category is well-organized with clear hierarchy.

**Primary Doc:** `PROJECT.md`

- 529 lines of authoritative specification
- Contains: Architecture, constraints, historical accuracy, all technical requirements
- Serves as source of truth

**Supporting Docs:**

- `QUICKSTART.md` (180 lines) — Condensed setup steps, references PROJECT.md properly
- `DO-NOT-DO.md` — Specific anti-patterns (complements PROJECT.md)
- `COPY.md` — Brand voice guide (separate concern, appropriate place)

**Assessment:** No merging needed. Clear separation of concerns.

**Key Decisions:**

- "Tennessee Starts Here" is positioning statement, not a SaaS funnel
- Historical accuracy constraints are non-negotiable
- Site serves 5 purposes: position Rocky Mount, showcase 2026 events, drive ticket sales, capture emails, provide visit info

---

## CATEGORY 2: DESIGN SYSTEM

**Files:** 19 docs covering Tokens, Spacing, Motion, and Styles

### Critical Redundancy: The "Full + Quick Reference + Visual Reference" Pattern

**Problem:** Nearly every design system component has 3+ variants:

```
System → Full Doc → Quick Reference → Visual Reference (+ Summary)

MOTION:        MOTION-SYSTEM.md → MOTION-QUICK-REFERENCE.md → MOTION-VISUAL-REFERENCE.md
               + MOTION-SYSTEM-SUMMARY.md + MOTION-MIGRATION-WORKERS.md

SPACING:       SPACING-SYSTEM.md → SPACING-QUICK-REFERENCE.md → SPACING-VISUAL-REFERENCE.md
               + SPACING-SYSTEM-REPORT.md + SPACING-PATTERNS.md

TOKENS:        DESIGN-TOKENS.md → TOKEN-QUICK-REFERENCE.md → TOKEN-VISUAL-REFERENCE.md
               + TOKEN-EXAMPLES.md

STYLE:         STYLE-GUIDE.md → (no quick ref) → STYLE-EXAMPLES.md
               + MASTER-STYLING-GUIDE.md + STYLE-PATTERNS-VISUAL.md + STYLE-DEVIATIONS.md
```

**Result:** Readers face 19 documents for what should be 4-5 canonical systems.

### Primary Docs (Keep These)

| System      | Primary Doc                                  | Rationale                                                     |
| ----------- | -------------------------------------------- | ------------------------------------------------------------- |
| **Motion**  | `MOTION-SYSTEM.md`                           | 50 lines, data-driven, establishes all duration/easing tokens |
| **Spacing** | `SPACING-SYSTEM.md`                          | 50 lines, 8pt grid foundation with 14 scale levels            |
| **Tokens**  | `DESIGN-TOKENS.md`                           | 50 lines, shadow + color standardization                      |
| **Styles**  | `STYLE-GUIDE.md` + `MASTER-STYLING-GUIDE.md` | Two-tier: brand + implementation                              |

### Redundant Docs (Merge Candidates)

**MOTION (5 docs → 2 docs)**

- `MOTION-QUICK-REFERENCE.md` — Merge into MOTION-SYSTEM.md (add "Developer Quick Reference" section)
- `MOTION-VISUAL-REFERENCE.md` — Merge into MOTION-SYSTEM.md (add visual diagrams)
- `MOTION-SYSTEM-SUMMARY.md` — DELETE (duplicate of MOTION-SYSTEM.md executive summary)
- `MOTION-MIGRATION-WORKERS.md` — Likely outdated phase docs; DELETE unless active project

**SPACING (5 docs → 2 docs)**

- `SPACING-QUICK-REFERENCE.md` — Merge into SPACING-SYSTEM.md (add "Cheat Sheet" section)
- `SPACING-VISUAL-REFERENCE.md` — Merge into SPACING-SYSTEM.md (add diagrams)
- `SPACING-SYSTEM-REPORT.md` — DELETE (executive summary, info is in SPACING-SYSTEM.md)
- `SPACING-PATTERNS.md` — DELETE (use-case examples; integrate into SPACING-SYSTEM.md if valuable)

**TOKENS (4 docs → 2 docs)**

- `TOKEN-QUICK-REFERENCE.md` — Merge into DESIGN-TOKENS.md (add quick ref section)
- `TOKEN-VISUAL-REFERENCE.md` — Merge into DESIGN-TOKENS.md (add visual examples)
- `TOKEN-EXAMPLES.md` — DELETE or merge (code snippets belong in DESIGN-TOKENS.md under "Implementation")

**STYLES (5 docs → 2 docs)**

- `STYLE-EXAMPLES.md` — Merge into STYLE-GUIDE.md (add "Real-World Examples" section)
- `STYLE-PATTERNS-VISUAL.md` — Merge into STYLE-GUIDE.md or MASTER-STYLING-GUIDE.md
- `STYLE-DEVIATIONS.md` — DELETE (document why you deviate in STYLE-GUIDE.md itself)
- `MASTER-STYLING-GUIDE.md` — Keep as implementation quick reference (different from STYLE-GUIDE.md)

### Key Decisions

- All design tokens derive from actual codebase usage patterns (data-driven)
- Spacing grid: 8pt base (0.5rem units)
- Motion durations: 7 speeds (100ms to 2000ms)
- Color system: 5 primary + 4 neutral + 3 text-on-dark

### Consolidation Outcome

**From 19 → 9 docs**

- Motion: 1 canonical doc (include quick ref + visuals as sections)
- Spacing: 1 canonical doc
- Tokens: 1 canonical doc
- Styles: 2 docs (STYLE-GUIDE.md for brand, MASTER-STYLING-GUIDE.md for implementation)
- Accessibility: 4 docs (separate system, covered below)

---

## CATEGORY 3A: ALMANAC FEATURES

**Files:** 13 docs (1775-ALMANAC-BUILD-GUIDE, 1790-ALMANAC-TOOL, ALMANAC.md, + 10 marketing/implementation docs)

### Critical Issue: Marketing Strategy Fragmentation

The **Almanac Marketing Integration** project is documented in **7 quasi-redundant docs**:

```
1. INDEX-ALMANAC-MARKETING.md (index/map)
2. README-ALMANAC-INTEGRATION.md (complete guide)
3. ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md (high-level)
4. ALMANAC-MARKETING-INTEGRATION.md (strategy deep dive)
5. ALMANAC-QUICK-REFERENCE.md (marketing metrics)
6. ALMANAC-IMPLEMENTATION-CHECKLIST.md (task list)
7. ALMANAC-CONVERSION-FLOWS.md (user flows)
+ ALMANAC.md (feature overview)
+ 1775-ALMANAC-BUILD-GUIDE, 1790-ALMANAC-TOOL (legacy/phase docs)
```

**Problem:** Three different "start here" documents (INDEX, README, EXECUTIVE-SUMMARY) all claim to be primary entry points, creating reader confusion about which to read.

### Primary Docs (Keep These)

| Doc                                   | Purpose                            | Keep?                                      |
| ------------------------------------- | ---------------------------------- | ------------------------------------------ |
| `ALMANAC.md`                          | Feature overview (weather utility) | **KEEP** — canonical feature spec          |
| `ALMANAC-MARKETING-INTEGRATION.md`    | Marketing strategy                 | **KEEP** — authoritative strategy document |
| `ALMANAC-IMPLEMENTATION-CHECKLIST.md` | Task tracking                      | **CONDITIONAL** — only if actively managed |
| `ALMANAC-CONVERSION-FLOWS.md`         | User psychology + flows            | **KEEP IF DEVELOPMENT ACTIVE**             |

### Redundant Docs (Consolidate)

**DELETE or MERGE (High Priority):**

- `INDEX-ALMANAC-MARKETING.md` — DELETE (role-based reading paths belong in README, not separate index)
- `README-ALMANAC-INTEGRATION.md` — MERGE into ALMANAC-MARKETING-INTEGRATION.md (duplicate with different framing)
- `ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md` — DELETE (executive summary should be intro section of ALMANAC-MARKETING-INTEGRATION.md)
- `ALMANAC-QUICK-REFERENCE.md` — MERGE into ALMANAC-MARKETING-INTEGRATION.md as "Quick Reference Card" section
- `1775-ALMANAC-BUILD-GUIDE.md` — DELETE (appears to be legacy/phase 1; if active, move to /plans/)
- `1790-ALMANAC-TOOL.md` — DELETE (legacy; info is in ALMANAC.md)

**KEEP IF ACTIVE:**

- `ALMANAC-AUDIT.md` — Phase work document; archive if complete
- `ALMANAC-FRONTIER-SYNERGY.md` — Unclear purpose; check if still relevant
- `ALMANAC-COPY-LIBRARY.md` — Branding; needed if marketing variations are in development

### Key Decisions

- Almanac serves farmers/gardeners (primary), outdoor enthusiasts (secondary)
- 4 marketing features: EventWeatherCard, UpcomingEventCard, Insider Program, Social Hooks
- Target: $2,600-3,200/month in attributed bookings
- 180-240 dev hours estimated for full implementation

### Consolidation Outcome

**From 13 → 3-4 docs**

- `ALMANAC.md` — Feature spec only
- `ALMANAC-MARKETING-INTEGRATION.md` — Complete strategy (includes exec summary + quick ref + flows)
- `ALMANAC-IMPLEMENTATION-CHECKLIST.md` — IF actively managed (else archive)
- Archive `/plans/` — Move legacy build guides to plans folder

---

## CATEGORY 3B: EVIDENCE FEATURE

**Files:** 10 docs (EVIDENCE-ACCURACY-REVIEW, EVIDENCE-CHEROKEE-AUDIT, EVIDENCE-CITATIONS-EXECUTIVE-SUMMARY, etc.)

### Primary Docs (Keep These)

| Doc                              | Purpose                   | Rationale                                      |
| -------------------------------- | ------------------------- | ---------------------------------------------- |
| `EVIDENCE-ACCURACY-REVIEW.md`    | Historical accuracy audit | **KEEP** — source of truth for content quality |
| `EVIDENCE-ROOM-DESIGN-SYSTEM.md` | UI/UX specifications      | **KEEP** — separate concern (design)           |

### Redundant Docs (Merge Candidates)

**MERGE INTO PRIMARY:**

- `EVIDENCE-ARCHIVE-REVIEW.md` → Merge into EVIDENCE-ACCURACY-REVIEW.md
- `EVIDENCE-CHEROKEE-AUDIT.md` → SECTION in EVIDENCE-ACCURACY-REVIEW.md (Cherokee content is part of overall accuracy)
- `EVIDENCE-CITATIONS-EXECUTIVE-SUMMARY.md` → Executive summary SECTION in EVIDENCE-ACCURACY-REVIEW.md
- `EVIDENCE-LANGUAGE-REVIEW.md` → SUBSECTION in EVIDENCE-ACCURACY-REVIEW.md (language is part of accuracy)
- `EVIDENCE-TENNESSEE-PRIDE.md` → DELETE or integrate into copy system (branding, not evidence spec)

**DELETE:**

- `EVIDENCE-QUICK-WINS.md` — Task list/project artifact; should be in project management tool, not docs
- `EVIDENCE-LIBRARY-REDIRECT.md` — Single-purpose redirection doc; integrate into EVIDENCE-ROOM-DESIGN-SYSTEM.md
- `PATRIOT-PERSPECTIVE-EVIDENCE-REVIEW.md` — Appears to be editorial comment, not spec; DELETE

### Key Decisions

- Evidence accuracy is critical before public launch of transparency engine
- 20-30 hours of editorial work needed to fix critical issues
- Editor should standardize across collection

### Consolidation Outcome

**From 10 → 2-3 docs**

- `EVIDENCE-ACCURACY-REVIEW.md` — Comprehensive audit (includes all accuracy concerns)
- `EVIDENCE-ROOM-DESIGN-SYSTEM.md` — Keep separate (design system concern)
- Optional: `EVIDENCE-IMPLEMENTATION-CHECKLIST.md` — If actively managed

---

## CATEGORY 3C: NAVIGATION

**Files:** 3 docs (NAVIGATION-BUILD-GUIDE, NAVIGATION-COMPARISON-ANALYSIS, NAVIGATION-VISUAL-SPEC)

### Assessment

✅ **MINIMAL REDUNDANCY** — Three focused docs, each covering a distinct phase.

**Primary Doc:** `NAVIGATION-BUILD-GUIDE.md`

- Implementation-focused
- Source: Sample A Hybrid design
- Covers visual layout, design principles, accessibility

**Supporting Docs:**

- `NAVIGATION-COMPARISON-ANALYSIS.md` — Comparative design analysis (pre-decision artifact)
- `NAVIGATION-VISUAL-SPEC.md` — Visual specifications (reference material)

**Verdict:** No merging required. These represent different concerns (decision history, visual spec, implementation guide). Archive NAVIGATION-COMPARISON-ANALYSIS.md if decision is final.

---

## CATEGORY 3D: HOMEPAGE

**Files:** 3 docs (HOMEPAGE-RESTRUCTURE, HOMEPAGE-RESTRUCTURE-SPEC, HOMEPAGE-RESTRUCTURE-ADDITIONS)

### Critical Redundancy

All three docs address the **same problem**: Homepage should serve a historic site experience, not a First 250 funnel.

```
HOMEPAGE-RESTRUCTURE.md (implementation guide)
↓ duplicates ↓
HOMEPAGE-RESTRUCTURE-SPEC.md (specification)
↓ plus ↓
HOMEPAGE-RESTRUCTURE-ADDITIONS.md (site-wide changes)
```

**Problem:** Reader must read all 3 to understand full scope. Information is scattered.

### Primary Doc (Keep This)

**`HOMEPAGE-RESTRUCTURE-SPEC.md`**

- Clearly titled as "Specification"
- Explains the problem first (current homepage is a funnel)
- Includes historical context and design principles
- Comprehensive (30+ lines)

### Redundant Docs (Consolidate)

- `HOMEPAGE-RESTRUCTURE.md` → **MERGE into HOMEPAGE-RESTRUCTURE-SPEC.md** (implementation details as final section)
- `HOMEPAGE-RESTRUCTURE-ADDITIONS.md` → **MERGE into HOMEPAGE-RESTRUCTURE-SPEC.md** (site-wide changes as separate section)

### Key Decisions

- Homepage problem: Current design prioritizes First 250 enrollment over site experience
- Solution: Lead with experience variety; First 250 gets /first-250 page only
- Site is a historic site, not a SaaS funnel
- Mobile sticky CTA should link to /visit, not /first-250

### Consolidation Outcome

**From 3 → 1 doc**

- Single comprehensive spec: `HOMEPAGE-RESTRUCTURE-SPEC.md` (with implementation + site-wide changes as sections)

---

## CATEGORY 3E: WELCOME SCREEN

**Files:** 3 docs (WELCOME-SCREEN-BUILD-GUIDE, WELCOME-SCREEN-CLAUDE-CODE-PROMPT, WELCOME-SCREEN-PLAN-A-BUILD-GUIDE)

### Assessment

⚠️ **POTENTIAL REDUNDANCY**

**Build Guides:**

- `WELCOME-SCREEN-BUILD-GUIDE.md` — Standard build guide
- `WELCOME-SCREEN-PLAN-A-BUILD-GUIDE.md` — Plan A variant
- `WELCOME-SCREEN-CLAUDE-CODE-PROMPT.md` — Prompt for AI assistance

**Questions:**

1. Are "Build Guide" and "Plan A Build Guide" different variants of the same component?
2. Is the Claude Code prompt archived/outdated?

**Recommendation:**

- If Plan A is active variant: Consolidate into single BUILD-GUIDE.md with variant notes
- If Plan A is archived: Move to `/plans/` folder
- Delete CLAUDE-CODE-PROMPT.md (belongs in project notes, not docs/)

### Tentative Verdict

**From 3 → 1-2 docs** (depends on whether Plan A is active variant)

---

## CATEGORY 3F: GOVERNOR & CITATIONS

**Files:** 9 docs (GOVERNOR-CONTENT-\*, CITATION-AUDIT, CITATION-IMPROVEMENTS, CITATION-MATRIX)

### Governor Content System (4 docs)

**Problem:** The system is documented in parallel:

```
GOVERNOR-CONTENT-README.md (index/overview)
GOVERNOR-CONTENT-SYSTEM.md (complete spec)
GOVERNOR-CONTENT-EXAMPLES.md (24 scenarios)
GOVERNOR-IMPLEMENTATION-GUIDE.md (dev instructions)
+ GOVERNOR-QUICK-REFERENCE.md (one-pager)
```

**Primary Doc:** `GOVERNOR-CONTENT-SYSTEM.md`

- Full spec with tone guidelines and decision trees
- 50+ lines of authoritative specification

**Redundant:**

- `GOVERNOR-CONTENT-README.md` → **MERGE into GOVERNOR-CONTENT-SYSTEM.md** (intro + file index)
- `GOVERNOR-QUICK-REFERENCE.md` → **MERGE into GOVERNOR-CONTENT-SYSTEM.md** (add quick reference section)

**Keep Separate:**

- `GOVERNOR-CONTENT-EXAMPLES.md` — 24 weather scenarios; valuable reference for testing
- `GOVERNOR-IMPLEMENTATION-GUIDE.md` — Developer-focused; separate from spec

### Citation System (5 docs)

**Problem:** Three different audit/review documents with overlapping scope:

```
CITATION-AUDIT-2026-01-30.md (date-based audit)
CITATION-IMPROVEMENTS-QUICK-REFERENCE.md (quick wins)
CITATION-MATRIX.md (matrix format)
EVIDENCE-CITATIONS-EXECUTIVE-SUMMARY.md (evidence section)
```

**Questions:**

1. Are these active audits or archived project artifacts?
2. Is CITATION-MATRIX.md a data structure or a doc?

**Provisional Verdict:**

- If audit is complete: Archive all citation docs to `/plans/` or `/archive/`
- If audit is ongoing: Consolidate into single CITATION-AUDIT.md with matrix as appendix

### Key Decisions

- Governor's View needs two enhancements: TL;DR summaries + Planning Intelligence
- Heritage tone + modern clarity (8th grade reading level minimum)
- 24 weather scenarios mapped to content outputs

### Consolidation Outcome

**From 9 → 4-5 docs** (depends on citation system status)

- Governor: `GOVERNOR-CONTENT-SYSTEM.md` + `GOVERNOR-CONTENT-EXAMPLES.md` + `GOVERNOR-IMPLEMENTATION-GUIDE.md`
- Citations: Archive or consolidate based on project status

---

## CATEGORY 4: PHASE PLANS

**Files:** 12 docs (PHASE-2-_, PHASE-3-_, PHASE-4-\*, PHASE-5.2-COMPLETE)

### Assessment

These appear to be **historical project artifacts**, not active spec documents.

**By Phase:**

| Phase         | Docs                                                                          | Status                                   |
| ------------- | ----------------------------------------------------------------------------- | ---------------------------------------- |
| **Phase 2**   | 5 docs (INDEX, SUMMARY, TECHNICAL-SPEC, CACHING-PLAN, CODE-PREVIEW)           | Likely complete (5.2 is marked COMPLETE) |
| **Phase 3**   | 1 doc (SUMMARY)                                                               | Partial artifact                         |
| **Phase 4**   | 5 docs (EXECUTIVE-SUMMARY, IMPLEMENTATION-GUIDE, README, RISKS, SSR-RESEARCH) | Likely complete/archived                 |
| **Phase 5.2** | 1 doc (PHASE-5.2-COMPLETE)                                                    | Archived                                 |

### Recommendation

**ARCHIVE ALL PHASE DOCS TO `/plans/archive/` or `/archive/`**

- Phase plans are temporal/historical documents, not active specifications
- They clutter the main `/docs/` directory
- If needed for reference, move to archive folder
- Keep ONLY the active project spec (PROJECT.md)

### Consolidation Outcome

**From 12 → 0 docs in /docs/**

- Move all to `/plans/archive/PHASES-2026/`

---

## MISCELLANEOUS / UNCATEGORIZED DOCS

**Files:** 16 docs including accessibility, data standards, markdown audits, etc.

### Assessment by Type

**ACCESSIBILITY (4 docs)**

- `ACCESSIBILITY-AUDIT-PHASE-3.md`
- `ACCESSIBILITY-IMPLEMENTATION-GUIDE.md`
- `ACCESSIBILITY-QUICK-REFERENCE.md`
- `ACCESSIBILITY-TESTING-CHECKLIST.md`

**Verdict:** Follows same "Full + Quick Ref + Checklist" pattern as Design System.

**Consolidation:**

- `ACCESSIBILITY-IMPLEMENTATION-GUIDE.md` → Primary doc
- `ACCESSIBILITY-QUICK-REFERENCE.md` → Merge into guide as section
- `ACCESSIBILITY-AUDIT-PHASE-3.md` → Archive to `/plans/` if complete
- `ACCESSIBILITY-TESTING-CHECKLIST.md` → Merge into guide or move to project management tool

**DATA & INTEGRATION DOCS (10+ docs)**

- `DATA-STANDARDS.md` — **KEEP** (authoritative)
- `FAREHARBOR-API.md` — **KEEP** (API integration spec)
- `EVENT-CALENDAR-INTEGRATED.md`, `EVENT-PASSPORT-SPEC.md`, `EVENT-SYNERGY-*` → **UNCLEAR** (need assessment of current status)
- `ADD-TO-CALENDAR.md`, `ADD-TO-CALENDAR-INTEGRATION.md` — **REDUNDANT** (consolidate)
- `ARCHIVE-INTEGRATION.md`, `ARCHIVE-UI-EXAMPLES.md` → **ASSESS** (feature status)

**STYLE & MARKDOWN DOCS (5 docs)**

- `MARKDOWN-STYLE-GUIDE.md` → **KEEP** (editorial standards)
- `MARKDOWN-AUDIT-*.md` — **ARCHIVE** (project artifacts)
- `STYLE-DEVIATIONS.md` — **MERGE** (belongs in STYLE-GUIDE.md)

**SUMMARY/SYNERGY/BRAND DOCS (6+ docs)**

- `BRAND-STRATEGY.md` → **KEEP** (authoritative brand doc)
- `SYNERGY-PROGRAM-INDEX.md`, `EVENT-SYNERGY-*` → **ASSESS** (unclear if active)
- `TENNESSEE-PRIDE-QUICK-REFERENCE.md` → **MERGE** (into COPY.md or BRAND-STRATEGY.md)
- `HERO-V2-VISUAL-DNA-AUDIT.md` → **ARCHIVE** (phase document)

**VISUAL QA & PROJECT CLEANUP (3 docs)**

- `VISUAL-QA-CHECKLIST.md` → Move to project management tool or keep as reference
- `PROJECT-CLEANUP-GUIDE.md` → Archive or DELETE (one-time artifact)
- `V2-ROADMAP.md` → **ASSESS** (if next version is planned, keep; else archive)

**TODO DOCS (2 docs)**

- `TODO-FUTURE.md` → Move to project management tool
- `INDEX-PHASE-3-ACCESSIBILITY.md` → Archive if Phase 3 is complete

**INTEGRATION & SPECIAL (5+ docs)**

- `INTEGRATION-DIFF.md` → **UNCLEAR** (purpose?)
- Additional event/content docs → **NEED ASSESSMENT**

---

## OVERALL REDUNDANCY REPORT

### By the Numbers

| Category                    | Total Docs | Redundant | Merge Candidates | Keep   | Archive |
| --------------------------- | ---------- | --------- | ---------------- | ------ | ------- |
| Core Project (Cat 1)        | 4          | 0         | 0                | 4      | 0       |
| Design System (Cat 2)       | 19         | 10        | 10               | 9      | 0       |
| Almanac (Cat 3A)            | 13         | 7         | 6                | 3-4    | 3-4     |
| Evidence (Cat 3B)           | 10         | 6         | 5                | 2-3    | 3       |
| Navigation (Cat 3C)         | 3          | 1         | 0                | 3      | 1       |
| Homepage (Cat 3D)           | 3          | 2         | 2                | 1      | 0       |
| Welcome Screen (Cat 3E)     | 3          | 2         | 1-2              | 1-2    | 1       |
| Governor/Citations (Cat 3F) | 9          | 5         | 4                | 4-5    | 0-1     |
| Phase Plans (Cat 4)         | 12         | 12        | 0                | 0      | 12      |
| Misc/Uncategorized          | 20         | 10        | 8                | 8      | 4       |
| **TOTAL**                   | **115**    | **55**    | **36**           | **45** | **28**  |

### Consolidation Potential

- **Definite Redundancy:** 55 docs (48% of total)
- **Merge Candidates:** 36 docs can be consolidated into larger canonical docs
- **Can Delete:** 28 docs are archives/artifacts/one-time project work
- **Should Keep:** 45 unique-value docs

### Recommended Directory Structure (Post-Cleanup)

```
docs/
├── 📋 CORE SPECIFICATIONS
│   ├── PROJECT.md (authoritative site spec)
│   ├── QUICKSTART.md (setup guide)
│   ├── DO-NOT-DO.md (constraints)
│   └── COPY.md (brand voice)
│
├── 🎨 DESIGN SYSTEM
│   ├── STYLE-GUIDE.md (brand visual system)
│   ├── MASTER-STYLING-GUIDE.md (implementation reference)
│   ├── DESIGN-TOKENS.md (shadows, colors, complete spec)
│   ├── MOTION-SYSTEM.md (durations, easing, complete spec)
│   └── SPACING-SYSTEM.md (grid, scales, complete spec)
│
├── 🛠️ FEATURE SPECS
│   ├── ALMANAC.md (weather utility)
│   ├── EVIDENCE-ACCURACY-REVIEW.md (historical audits)
│   ├── EVIDENCE-ROOM-DESIGN-SYSTEM.md (UI system)
│   ├── GOVERNOR-CONTENT-SYSTEM.md (weather copy)
│   ├── GOVERNOR-CONTENT-EXAMPLES.md (24 scenarios)
│   ├── GOVERNOR-IMPLEMENTATION-GUIDE.md (developer guide)
│   ├── NAVIGATION-BUILD-GUIDE.md
│   ├── HOMEPAGE-RESTRUCTURE-SPEC.md (+ implementation details)
│   ├── WELCOME-SCREEN-BUILD-GUIDE.md
│   ├── DATA-STANDARDS.md (JSON schemas)
│   ├── FAREHARBOR-API.md (ticketing integration)
│   └── MARKDOWN-STYLE-GUIDE.md (editorial standards)
│
├── ♿ ACCESSIBILITY
│   ├── ACCESSIBILITY-IMPLEMENTATION-GUIDE.md (complete)
│   └── ACCESSIBILITY-TESTING-CHECKLIST.md (reference)
│
├── 📚 REFERENCE
│   ├── BRAND-STRATEGY.md
│   ├── CONTRIBUTING.md (from parent)
│   └── MARKDOWN-AUDIT-SUMMARY.md (if valuable audit)
│
└── 📁 plans/
    ├── 2026-01-28-*.md (active planning docs)
    ├── archive/
    │   ├── PHASES-2026/ (Phase 2-5 historical docs)
    │   ├── almanac-marketing-v1/ (old marketing iterations)
    │   └── evidence-audits/ (completed audits)
    └── ...
```

---

## ACTIONABLE CLEANUP PLAN

### Phase 1: High-Impact Merges (Start Here)

**Time: 2-3 hours | Impact: Reduce from 115 → 90 docs**

1. **Design System Quick References** (10 docs → 5 docs)
   - Add "Quick Reference" section to MOTION-SYSTEM.md (includes MOTION-QUICK-REFERENCE.md)
   - Add "Quick Reference" section to SPACING-SYSTEM.md
   - Add "Quick Reference" section to DESIGN-TOKENS.md
   - DELETE: MOTION-SYSTEM-SUMMARY.md, SPACING-SYSTEM-REPORT.md, TOKEN-EXAMPLES.md
   - Result: 5 canonical design docs instead of 19

2. **Almanac Marketing Consolidation** (7 docs → 1 doc)
   - MERGE README-ALMANAC-INTEGRATION.md + ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md + ALMANAC-QUICK-REFERENCE.md INTO ALMANAC-MARKETING-INTEGRATION.md
   - DELETE: INDEX-ALMANAC-MARKETING.md, README-ALMANAC-INTEGRATION.md, ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md, ALMANAC-QUICK-REFERENCE.md
   - Result: Single authoritative strategy doc

3. **Homepage Consolidation** (3 docs → 1 doc)
   - MERGE HOMEPAGE-RESTRUCTURE.md + HOMEPAGE-RESTRUCTURE-ADDITIONS.md INTO HOMEPAGE-RESTRUCTURE-SPEC.md
   - DELETE: HOMEPAGE-RESTRUCTURE.md, HOMEPAGE-RESTRUCTURE-ADDITIONS.md
   - Result: Single comprehensive spec

4. **Governor Content** (4 docs → 3 docs)
   - MERGE GOVERNOR-CONTENT-README.md + GOVERNOR-QUICK-REFERENCE.md INTO GOVERNOR-CONTENT-SYSTEM.md
   - KEEP: GOVERNOR-CONTENT-EXAMPLES.md, GOVERNOR-IMPLEMENTATION-GUIDE.md
   - DELETE: GOVERNOR-CONTENT-README.md, GOVERNOR-QUICK-REFERENCE.md
   - Result: 3 focused docs

**Phase 1 Outcome: 115 → 85 docs**

### Phase 2: Archive Phase Plans (Quick Win)

**Time: 30 minutes | Impact: Reduce from 85 → 73 docs**

1. Create `/docs/plans/archive/PHASES-2026/` directory
2. Move all PHASE-\*.md files (12 docs) to archive
3. DELETE: PHASE-5.2-COMPLETE.md (meta-artifact)
4. Result: Cleaner /docs/ directory

**Phase 2 Outcome: 85 → 73 docs**

### Phase 3: Evidence & Evidence-Adjacent

**Time: 1-2 hours | Impact: Reduce from 73 → 58 docs**

1. **Evidence Consolidation**
   - MERGE EVIDENCE-ARCHIVE-REVIEW.md + EVIDENCE-CHEROKEE-AUDIT.md + EVIDENCE-CITATIONS-EXECUTIVE-SUMMARY.md + EVIDENCE-LANGUAGE-REVIEW.md INTO EVIDENCE-ACCURACY-REVIEW.md (add sections)
   - DELETE: 4 separate audit files
   - ARCHIVE: EVIDENCE-QUICK-WINS.md, PATRIOT-PERSPECTIVE-EVIDENCE-REVIEW.md, EVIDENCE-LIBRARY-REDIRECT.md

2. **Evidence-Citations**
   - ASSESS: Citation audit status (active or complete?)
   - If complete: ARCHIVE to /plans/archive/
   - If active: Consolidate CITATION-AUDIT-2026-01-30.md + CITATION-IMPROVEMENTS-QUICK-REFERENCE.md + CITATION-MATRIX.md into single CITATION-AUDIT.md

**Phase 3 Outcome: 73 → 55-58 docs**

### Phase 4: Miscellaneous Cleanup

**Time: 1-2 hours | Impact: Reduce from 55 → 45 docs**

1. Accessibility consolidation (4 → 2 docs)
2. Add-to-Calendar consolidation (2 → 1 doc)
3. Archive one-time project artifacts (PROJECT-CLEANUP-GUIDE.md, MARKDOWN-AUDIT-\*.md)
4. Move TODO-FUTURE.md to project management tool (not docs/)
5. Assess and archive/consolidate event/synergy docs

**Phase 4 Outcome: 55 → 45 docs**

---

## KEY DECISIONS DOCUMENTED IN CURRENT SYSTEM

### Historical & Brand Positioning

- "Tennessee Starts Here" = positioning statement, not site name (site is tennesseestartshere.com)
- Cannot claim: Tennessee's first capital, first US territorial capital
- CAN claim: First seat of government for Southwest Territory (1790-1792)
- Historical accuracy is non-negotiable

### Product Direction

- Site serves historic site experience, not a First 250 enrollment funnel
- First 250 program is secondary feature (has dedicated /first-250 page)
- Homepage should lead with "experience variety" and "what to expect"
- Mobile sticky CTA should link to /visit, not /first-250

### Technical Decisions

- Spacing system: 8pt grid foundation, 14-level semantic scale
- Motion system: 7 duration tokens (100ms to 2000ms) + 7 easing curves
- Design tokens: Data-driven from codebase usage analysis (309 instances of 1rem, 303 of 1.5rem, etc.)
- No raw console statements (ESLint enforces logger utility usage)

### Accessibility & Standards

- WCAG compliance critical
- Testing checklist exists (though could be better integrated)
- Editorial standards for markdown exist

---

## RECOMMENDATIONS BY AUDIENCE

### For Product Owners / Decision Makers

1. Keep core specs (PROJECT.md, QUICKSTART.md, DO-NOT-DO.md, COPY.md)
2. Archive all Phase docs to reduce noise
3. Consolidate "System + Quick Ref + Visual" into single canonical docs
4. Verify evidence audit status and archive/consolidate accordingly

### For Developers

1. Reference PRIMARY DOCS ONLY (45 canonical specs)
2. When finding 3 versions of same info (full + quick ref + visual), use PRIMARY only
3. All quick references will be SECTIONS in primary docs after consolidation
4. Check `/docs/plans/` for historical context if needed

### For Content/Copy Teams

1. COPY.md is authoritative brand voice
2. GOVERNOR-CONTENT-SYSTEM.md defines weather comment tone
3. EVIDENCE-ACCURACY-REVIEW.md defines historical accuracy constraints
4. MARKDOWN-STYLE-GUIDE.md defines editorial standards

### For Next Phase Planning

1. Active phase planning should go to `/docs/plans/` (not root /docs/)
2. Completed phases should archive to `/docs/plans/archive/`
3. Use CLAUDE.md for project context, not separate spec files

---

## SUMMARY TABLE

```
Category                 Current | After Phase 1 | After Phase 2 | After Phase 3 | After Phase 4 | Final
─────────────────────────────────────────────────────────────────────────────────────────────────────
Core Project                  4 |             4 |             4 |             4 |             4 |    4
Design System                19 |             9 |             9 |             9 |             9 |    9
Almanac (Feature)            13 |             6 |             6 |             6 |             6 |    6
Evidence                     10 |             8 |             8 |             3 |             3 |    3
Navigation                    3 |             3 |             3 |             3 |             3 |    3
Homepage                      3 |             1 |             1 |             1 |             1 |    1
Welcome Screen                3 |             2 |             2 |             2 |             2 |    2
Governor/Citations            9 |             5 |             5 |             5 |             5 |    5
Phase Plans                  12 |            12 |             0 |             0 |             0 |    0
Miscellaneous                20 |            20 |            20 |            20 |             8 |    8
─────────────────────────────────────────────────────────────────────────────────────────────────────
TOTAL                       115 |            90 |            80 |            73 |            50 |   45
```

---

## CONCLUSION

The documentation system is **30-40% redundant** across the board, with the heaviest overlap in:

1. **Design System:** 19 docs that could be 5 (60% reduction)
2. **Almanac Marketing:** 7 docs that could be 1 (85% reduction)
3. **Evidence Audits:** 10 docs that could be 2-3 (70% reduction)
4. **Phase Plans:** 12 docs that should be archived (100% reduction)

**Cleanup is achievable in 4-6 hours** with **immediate benefit:** Readers will know which single doc to consult per feature, not choose between 3-5 variants.

**The consolidation should follow the "Primary Doc + Sections" pattern:** One authoritative specification with Quick Reference, Visual Reference, Examples, and Implementation guidance as integrated sections—not separate files.

---

**Report completed by RA-03 | January 30, 2026**
