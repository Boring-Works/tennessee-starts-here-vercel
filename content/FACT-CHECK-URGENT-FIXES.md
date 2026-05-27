# URGENT FACT-CHECK FIXES

**Status:** 3 CRITICAL errors requiring immediate correction
**Time Required:** 2-3 hours
**Impact:** Must fix before public launch

---

## Fix #1: Blount Arrival Date (5 minutes)

**File:** `/content/timeline-events.json` line 58

**Change:**

```json
"date": "1790-10-10",  ← WRONG
```

**To:**

```json
"date": "1790-10-11",  ← CORRECT (matches Blount's letter: "11th instant")
```

**Evidence:** Blount's October 20 letter explicitly states "On the 11th instant, I arrived in this country"

---

## Fix #2: Jackson Document Verification Status (30 minutes)

**File:** `/content/documents/jackson-at-rocky-mount-1788.md`

### Change A: Verification Status (line 11-14)

```yaml
verification:
  status: verified           ← WRONG
  source_count: 4           ← MISLEADING (all secondary sources)
  method: 'Cross-referenced Tennessee Encyclopedia, Rocky Mount Museum, Miller Center, The Hermitage'
  notes: 'Date narrowed to Spring 1788 based on biographical timelines. No primary documentation (letters or receipts) from Jackson actual stay has been identified. Six-week duration consistently cited across scholarly sources.'
```

**To:**

```yaml
verification:
  status: single-source     ← CORRECT
  source_count: 0           ← CORRECT (zero primary sources)
  method: 'Cross-referenced secondary sources (Tennessee Encyclopedia, museum materials, presidential biographies); no primary documentation from Jackson identified'
  notes: 'Date estimated as Spring 1788 based on biographical timelines. No primary documentation (letters or receipts) from Jackson stay has been identified. Six-week duration consistently cited but unverified. Dendrochronology proves current structures date to 1826-1830, meaning Jackson could not have stayed in buildings visitors see today.'
```

### Change B: Add Historical Note (after line 73)

**Add this section before "Source Notes":**

```markdown
---

## Historical Note

**Source Quality:** This account is documented only in secondary sources. No primary documentation (letters, receipts, or diary entries) from Andrew Jackson's actual stay has been identified by researchers.

**Physical Evidence:** University of Tennessee dendrochronology study (Grissino-Mayer & van de Gevel, 2007) proves the current Rocky Mount structures date to 1826-1830, built by Michael Massengill (William Cobb's grandson). If Jackson visited in 1788, it would have been an earlier structure at this location—not the buildings visitors see today.

**Scholarly Consensus:** Multiple secondary sources (Tennessee Encyclopedia, presidential biographies, museum materials) consistently cite a six-week stay in Spring 1788, suggesting a strong oral tradition or shared source. However, the absence of primary documentation means the specific details (duration, exact dates) cannot be independently verified.

---
```

### Change C: Timeline Date (timeline-events.json, not created yet)

If Jackson event exists in timeline, change from specific date to:

```json
"date": "1788-04-01",
"title": "Jackson at Rocky Mount (estimated Spring 1788)",
```

---

## Fix #3: Washington-Blount Source URL (15 minutes)

**File:** `/content/documents/washington-to-blount-1790-06.md` line 7

**Current:**

```yaml
source_url: 'https://founders.archives.gov/documents/Washington/05-05-02-0290'
```

**Problem:** This URL links to WRONG DOCUMENT (Tobias Lear to Clement Biddle about a cook, June 3, 1790)

**Fix Options:**

**Option A:** Search Founders Online for correct link

1. Go to https://founders.archives.gov
2. Search: "Washington to Blount June 12 1790"
3. Update URL to correct link

**Option B:** If correct link not found, update to:

```yaml
source_url: 'https://founders.archives.gov' # Search: Washington to Blount, June 12, 1790
```

And update verification method:

```yaml
verification:
  status: verified
  source_count: 1  ← (down from 2 if Founders URL unavailable)
  method: 'Cross-referenced with American State Papers; Founders Online direct link unavailable'
```

---

## BONUS FIX: Knoxville Gazette Date (30 minutes research)

**File:** `/content/documents/knoxville-gazette-1791-11-12.md` line 4

**Problem:**

- First issue: November 5, 1791 ✓
- Second issue: November 12, 1791? ← Impossible if bi-weekly (should be Nov 19)

**Research Required:**

1. Check Tennessee State Library Archives
2. Verify actual publication date of second issue
3. Update both:
   - `/content/documents/knoxville-gazette-1791-11-12.md` line 4
   - `/content/timeline-events.json` line 184

**If November 12 is wrong:**

- Rename file to `knoxville-gazette-1791-11-19.md`
- Update date in frontmatter: `date: '1791-11-19'`
- Update timeline date: `"date": "1791-11-19"`
- Update title: "Volume 1, Number 2 - November 19, 1791"

**If November 12 is correct:**

- Add note explaining special publication schedule

---

## SECONDARY FIX: American State Papers URLs (10 minutes)

**Files Affected:** 11 Blount-Knox correspondence documents

**Current URL (redirects):**

```yaml
source_url: 'https://memory.loc.gov/ammem/amlaw/lwsp.html'
```

**Update to canonical URL:**

```yaml
source_url: 'https://www.loc.gov/collections/century-of-lawmaking/articles-and-essays/statutes-and-documents/american-state-papers/'
```

**Files to update:**

- blount-to-knox-1790-11.md
- blount-to-knox-1790-12.md
- blount-to-knox-1791-01.md
- blount-to-knox-1791-03.md
- blount-to-knox-1791-06.md
- blount-to-knox-1791-07.md
- blount-to-knox-1791-09.md
- blount-to-knox-1791-11.md
- knox-to-blount-1791-04.md
- jefferson-to-blount-1791-08.md
- washington-to-blount-1790-06.md (if keeping ASP as backup source)

**Quick command to update all:**

```bash
find /Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/documents -name "*.md" -exec sed -i '' 's|https://memory.loc.gov/ammem/amlaw/lwsp.html|https://www.loc.gov/collections/century-of-lawmaking/articles-and-essays/statutes-and-documents/american-state-papers/|g' {} \;
```

---

## CHECKLIST

Before launching Evidence Room to public:

- [ ] Fix #1: Blount arrival date (Oct 10 → Oct 11)
- [ ] Fix #2A: Jackson verification status (verified → single-source)
- [ ] Fix #2B: Jackson source_count (4 → 0)
- [ ] Fix #2C: Add Jackson historical note about dendrochronology
- [ ] Fix #3: Washington-Blount source URL (find correct link or note unavailable)
- [ ] Bonus: Verify Gazette November 12 date (or change to Nov 19)
- [ ] Secondary: Update 11 American State Papers URLs

**Total Time:** 2-3 hours

**Priority Level:** BLOCKING PUBLIC LAUNCH

---

**Prepared:** January 30, 2026
**Report:** See `/content/FACT-CHECK-REPORT.md` for full analysis
