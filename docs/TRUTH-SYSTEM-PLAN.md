# Rocky Mount Truth System Plan

**Last Updated:** 2026-02-02
**Status:** Phases 1-3 Complete + /Historical/ Integration Complete, Future Work Optional

> This plan tracks work across multiple Claude sessions. The operational deliverable is `scripts/check-facts.ts` — run it before every deploy.

---

## Phase Status Overview

| Phase | Name                  | Status      | Commits              |
| ----- | --------------------- | ----------- | -------------------- |
| 1     | Error Discovery & Fix | ✅ Complete | `cefcd2e`, `8ec1d45` |
| 2     | Dredge Utilities      | ✅ Complete | `653382f`            |
| 3     | Automated Detection   | ✅ Complete | `e8ced2b`            |
| 4     | Trigger Workers       | ⏸️ Held     | —                    |
| 5     | Citation Enforcement  | ⏸️ Future   | —                    |
| 6     | Admin UI              | ⏸️ Held     | —                    |
| 7     | Archive Cleanup       | ⏸️ Optional | —                    |

---

## Completed Work

### Phase 1: Error Discovery & Fix

**Problem:** Mary Cobb error propagated to 161 mentions across 37 files. Additional errors in building dates, farm establishment date, and "first federal capital" claims.

**Solution:**

- Fixed Mary Cobb → Barsheba Cobb (William's actual wife; Mary was his sister)
- Fixed "first federal capital" → "first Southwest Territory capital"
- Fixed 1770 → 1775 for farm establishment (Century Farms documentation)
- Fixed building date claims (dendrochronology confirms 1826-1830, not 1770s)
- Added Cobb-Massengill genealogy to truth documents

**Commits:** `cefcd2e`, `8ec1d45`

### Phase 2: Dredge Utilities

**Deliverables:**
| File | Purpose |
|------|---------|
| `lib/dredge/reference-library.ts` | 111 verified facts with sources (57 base + 45 from /Historical/ + 9 from Phase 0 Rescue) |
| `lib/dredge/confidence-gate.ts` | Gemini Flash → Claude Sonnet escalation |
| `lib/dredge/extraction-prompt.ts` | AI prompts for document parsing |
| `lib/dredge/parser.ts` | OCR cleanup, date extraction, relevance scoring |
| `lib/dredge/types.ts` | TypeScript interfaces |

**Commits:** `653382f` (initial), integration commit (2026-02-02)

### Phase 3: Automated Detection

**Deliverables:**

- 233 error patterns with `wrongVariants` field in reference library
- `scripts/check-facts.ts` — pre-deploy scanner
- Categories covered: governance (19), construction (7), people (29), treaty (21), timeline (9), cherokee (5), administration (11), violence (8), geography (2)

**Error Patterns Detect:**

- Mary Cobb misidentified as wife
- Construction dates before 1827
- Treaty of Holston "negotiated at Rocky Mount" (was at White's Fort)
- "First federal capital" claims
- Cherokee leader dates and titles
- Territorial ordinance dates
- Frontier violence incidents
- Federal establishment timeline
- Newspaper founding details

**Commits:** `e8ced2b` (initial 36 patterns), integration commits (2026-02-02, 233 total patterns after Phase 0 Rescue)

---

## Future Work (By Priority)

### Phase 4: Trigger Workers (8-12 hours)

**Location:** `trigger/` (currently stubs)

**Files:**

- `scrape-url.ts` — fetch and parse external URLs
- `parse-pdf.ts` — OCR processing for uploaded documents
- `daily-scan.ts` — scheduled archive scanning

**Requires:** Trigger.dev account setup, implementation of actual logic

**When to do:** When you want automated document discovery from external archives

### Phase 5: Citation Enforcement (2-3 hours)

**Goal:** Every public-facing historical claim has source attribution

**Pattern:**

```markdown
The current structures were built 1826-1830. [source:dendro-2007]
```

**Implementation:**

- Add linting rule to flag uncited historical claims
- Reference library can suggest citations

**When to do:** When you want audit trail on public content

### Phase 6: Admin UI (3-4 hours)

**Location:** `app/(admin)/dredge/`

**Current state:** Mock data, not connected to backend

**Needs:** Wire to actual Dredge utilities + database

**Depends on:** Phase 4 (Trigger Workers) for meaningful data

**When to do:** When you want visual dashboard for document processing

### Phase 7: Archive Cleanup (2-3 hours)

**Location:** Parent `rocky-mount/` directory

**Current state:** 164 files, 2.4MB (research archive, no git remote)

**Goal:** Reduce to canonical files, archive duplicates

**When to do:** When the mess bothers you enough (optional housekeeping)

---

## Operational Workflow

### Before Any Deploy

```bash
cd tennessee-starts-here
npx tsx scripts/check-facts.ts
```

### If Errors Found

1. Review flagged files (checker shows exact line numbers)
2. Fix errors
3. Re-run checker until clean
4. Commit and push

### Adding New Verified Facts

1. Edit `lib/dredge/reference-library.ts`
2. Add to `REFERENCE_LIBRARY` array with:
   - `id`, `category`, `claim`, `source`, `sourceType`, `confidence`
   - `wrongVariants` (regex patterns for common errors)
3. Run checker to catch any existing violations

---

## File Architecture

```
tennessee-starts-here/          ← DEPLOYED (GitHub → Vercel)
├── lib/dredge/                 ← Truth system utilities
│   ├── reference-library.ts    90 facts, 166 error patterns
│   ├── confidence-gate.ts      AI model escalation
│   ├── extraction-prompt.ts    Document parsing prompts
│   ├── parser.ts               OCR cleanup, relevance scoring
│   └── types.ts                TypeScript interfaces
├── scripts/
│   └── check-facts.ts          Pre-deploy error scanner
├── docs/
│   ├── TRUTH-SYSTEM-PLAN.md    This document
│   └── truth-documents/        Human-readable truth docs
└── [HELD - not committed]
    ├── trigger/                Stub workers
    ├── trigger.config.ts       Trigger.dev config
    └── app/(admin)/dredge/     Mock admin UI

rocky-mount/                    ← LOCAL RESEARCH (no git remote)
├── Historical/                 36 processed docs + 9 raw directories (33 facts integrated)
├── docs/                       Protocol documents
└── tennessee-starts-here/      ↑ Deployed app (subdir)
```

---

## Success Metrics

| Metric                         | Before                  | After                               |
| ------------------------------ | ----------------------- | ----------------------------------- |
| Mary Cobb errors               | 161 mentions / 37 files | 0                                   |
| "First federal capital" errors | 6 locations             | 0                                   |
| Building date errors           | 2 data files            | 0                                   |
| Farm establishment date        | Wrong (1770)            | Correct (1775)                      |
| Automated error detection      | None                    | 166 patterns                        |
| Pre-deploy checker             | None                    | `check-facts.ts`                    |
| Verified facts documented      | Scattered               | 90 in reference library             |
| Categories covered             | 5                       | 8 (added cherokee, admin, violence) |

---

## Decision Log

| Decision         | Choice                        | Rationale                                  |
| ---------------- | ----------------------------- | ------------------------------------------ |
| Execution order  | CODE → CONTENT → COMMIT       | Fix source of errors before fixing content |
| Dredge utilities | Commit after Mary Cobb fix    | Utilities were ready, just needed one fix  |
| Trigger workers  | Hold until needed             | Stubs aren't functional                    |
| Admin UI         | Hold until backend ready      | Mock data provides no value                |
| Archive cleanup  | Optional                      | Not blocking deployed site                 |
| Treaty location  | White's Fort, not Rocky Mount | Primary sources confirm                    |

---

## Key Historical Facts (Quick Reference)

| Fact                         | Correct                    | Wrong                 |
| ---------------------------- | -------------------------- | --------------------- |
| William Cobb's wife          | Barsheba Whitehead         | Mary Cobb             |
| Mary Cobb relationship       | William's SISTER           | William's wife        |
| Current buildings built      | 1826-1830                  | 1770s                 |
| Farm established             | 1775                       | 1770                  |
| Rocky Mount role             | First SW Territory capital | First federal capital |
| Treaty of Holston negotiated | White's Fort (Knoxville)   | Rocky Mount           |
| Treaty of Holston signed     | July 2, 1791               | —                     |
| Blount arrived               | October 11, 1790           | October 10, 1790      |
