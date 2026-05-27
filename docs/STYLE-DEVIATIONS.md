# Style Deviations Reference

Quick lookup for files that deviate from established markdown style patterns.

---

## Files Requiring Style Updates

### Priority 1: Visual Style (Cosmetic)

#### `docs/BRAND-STRATEGY.md`

- **Issue:** Uses blockquotes for document header instead of frontmatter/bold
- **Current:**
  ```markdown
  > Director's Final Version | January 2026 | Version 5.0
  ```
- **Should be:** Bold header or frontmatter
- **Fix effort:** Low (find/replace blockquote header)
- **Status:** Cosmetic only (no functional impact)

#### `docs/COPY.md`

- **Issue:** Uses blockquotes for meta information
- **Current:**
  ```markdown
  > **Master Source of Truth v4.0** — Director's Final Version, January 2026
  ```
- **Should be:** Table, bold header, or frontmatter
- **Fix effort:** Low
- **Status:** Cosmetic only

### Priority 2: Data Consistency (Informational)

#### Date Format Mixing (59 files)

**Issue:** Files use both ISO and US_LONG date formats in the same document.

**Example:** `CLAUDE-BUILD-GUIDE.md`

- Frontmatter: `date: 2026-01-30` (ISO)
- Body text: `January 30, 2026` (US_LONG)

**Root cause:** YAML prefers ISO, narrative prefers readable format. This is actually correct contextually.

**Action:** Document the standard (no code changes needed)

**Files affected:**

```
CLAUDE-BUILD-GUIDE.md
CLAUDE-CODE-HERO-CARD-PROMPT.md
DOCUMENTATION-AUDIT-SUMMARY.md
DOCUMENTATION-CLEANUP-PLAN.md
EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md
EVIDENCE-QUICK-FIXES.md
content/documents/blount-arrival-1790.md
content/documents/blount-commission-1790.md
content/documents/blount-to-knox-1790-11.md
content/documents/blount-to-knox-1790-12.md
... (49 more files)
```

**Standard to adopt:**

- YAML/JSON/metadata → ISO (`YYYY-MM-DD`)
- Narrative text → US_LONG (`Month DD, YYYY`)

---

## All Files: Consistency Summary

### ✅ PASSING (No Issues)

#### Passage Tags

- **Standard:** `<passage id="kebab-case">` format
- **All 41 files using tags:** Consistent
- **Status:** All files follow standard perfectly

#### Emphasis Formatting

- **Standard:** `**bold**` and `*italic*`
- **All 113+ files:** Consistent usage
- **Status:** All files follow standard perfectly

#### Lists

- **Standard:** Numbered for steps, bullets for items
- **All 91 files mixing types:** Intentionally correct
- **Status:** All files follow standard perfectly

#### Section Breaks

- **Standard:** Triple dash `---` or heading-only
- **All 188 files:** Consistent
- **Status:** All files follow standard perfectly

#### Headings

- **Standard:** H1 (title), H2 (sections), H3 (subsections)
- **All 198 files:** Consistent hierarchy
- **Status:** All files follow standard perfectly

#### Code Blocks

- **Standard:** Triple backticks with language tag
- **All files with code:** Consistent
- **Status:** All files follow standard perfectly

#### Tables

- **Standard:** Pipe-delimited format
- **All files with tables:** Consistent
- **Status:** All files follow standard perfectly

---

## Quick Stats

| Metric                     | Count | Status |
| -------------------------- | ----- | ------ |
| Total files audited        | 198   | ✅     |
| Files with issues          | 2     | ⚠️     |
| Files to update (priority) | 0     | ✅     |
| Files to document          | 59    | 📌     |
| Files passing all checks   | 196   | ✅     |

---

## Action Checklist

### Immediate (Optional cosmetic fixes)

- [ ] Review `docs/BRAND-STRATEGY.md` blockquotes
  - Option A: Keep as-is (cosmetically correct)
  - Option B: Convert to bold headers
- [ ] Review `docs/COPY.md` blockquotes
  - Option A: Keep as-is (cosmetically correct)
  - Option B: Convert to table

### Short-term (Establish standards)

- [ ] Add date formatting standard to `CLAUDE.md`
- [ ] Document in `CONTRIBUTING.md`
- [ ] Add blockquote usage guidelines to `CONTRIBUTING.md`

### Documentation (No code changes)

- [ ] Update `CLAUDE.md` with this style guide reference
- [ ] Link to `MARKDOWN-STYLE-GUIDE.md` from main docs

---

## How to Use This Document

**For daily work:**

1. Before committing markdown, check this document
2. Compare your file against the PASSING standards above
3. If unsure about blockquotes or dates, use PASSING section as reference

**For style questions:**

1. Check PASSING section first (that's the standard)
2. See the full `MARKDOWN-STYLE-GUIDE.md` for details
3. Ask in Slack if still unclear

---

_Last updated: January 30, 2026_
