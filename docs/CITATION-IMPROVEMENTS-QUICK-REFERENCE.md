# Citation Improvements - Quick Reference

**Generated:** January 30, 2026
**Scope:** Evidence page citations requiring upgrade
**Effort:** 2-2.5 hours total

---

## TIER 1: MUST FIX (1-2 hours) - Accuracy Issues

### Issue #1: Generic Founders Link (Line 393)

**File:** `app/(main)/evidence/page.tsx`
**Current:**

```typescript
sourceUrl = 'https://founders.archives.gov/'
```

**Fix:**

```typescript
sourceUrl = 'https://founders.archives.gov/documents/Washington/05-09-02-0100'
```

**Why:** Pointing to homepage instead of specific document reduces credibility

---

### Issue #2: Williamson Recommendation - Document ID Conflict

**Files:**

- `app/(main)/evidence/page.tsx` lines 367, 478
- `lib/copy/brand.ts` line 88

**Current Conflict:**

```
Line 367: https://founders.archives.gov/documents/Washington/05-05-02-0277
Line 478: https://founders.archives.gov/documents/Washington/05-05-02-0268
Brand.ts: 'Founders Online' (no ID)
```

**Problem:** Both use May 28, 1790 + Williamson but different document IDs

**Action:**

1. Test both URLs to see which is correct
2. Update all three locations to use same verified ID
3. Recommendation: Likely 05-05-02-0277 based on Washington Papers series

**Updated Code:**

```typescript
// page.tsx line 367
sourceUrl = 'https://founders.archives.gov/documents/Washington/05-05-02-0277'

// page.tsx line 478
sourceUrl = 'https://founders.archives.gov/documents/Washington/05-05-02-0277'

// brand.ts line 88
source: 'Founders Online, document/Washington/05-05-02-0277'
```

---

### Issue #3: Washington's Question - Document ID Conflict

**Files:**

- `app/(main)/evidence/page.tsx` lines 337, 493
- `lib/copy/brand.ts` line 94

**Current Conflict:**

```
Line 337: https://founders.archives.gov/documents/Washington/05-06-02-0135
Line 493: https://founders.archives.gov/documents/Washington/05-06-02-0076
Brand.ts: 'Founders Online' (no ID)
```

**Problem:** Both use Aug 13, 1790 + Washington to Knox but different document IDs

**Action:**

1. Test both URLs to determine which is correct
2. Update all three locations with verified ID
3. Recommendation: Likely 05-06-02-0135 based on series numbering

**Updated Code:**

```typescript
// page.tsx line 337
sourceUrl = 'https://founders.archives.gov/documents/Washington/05-06-02-0135'

// page.tsx line 493
sourceUrl = 'https://founders.archives.gov/documents/Washington/05-06-02-0135'

// brand.ts line 94
source: 'Founders Online, document/Washington/05-06-02-0135'
```

---

## TIER 2: SHOULD FIX (1 hour) - Transparency Improvements

### Issue #4: Add Document IDs to All Brand.ts Quotes

**File:** `lib/copy/brand.ts` lines 85-102

**Current:**

```typescript
williamsonRecommendation: {
  source: 'Founders Online',
},
washingtonsQuestion: {
  source: 'Founders Online',
},
treatyProclamation: {
  source: 'Founders Online, National Archives',
},
```

**Updated:**

```typescript
williamsonRecommendation: {
  source: 'Founders Online, document/Washington/05-05-02-0277',
},
washingtonsQuestion: {
  source: 'Founders Online, document/Washington/05-06-02-0135',
},
treatyProclamation: {
  source: 'Founders Online, document/Washington/05-09-02-0100',
},
```

---

### Issue #5: Add Primary Manuscript Link for Blount Letter

**File:** `app/(main)/evidence/page.tsx` lines 295, 498, 503

**Current:**

```typescript
sourceUrl = 'https://tennesseeencyclopedia.net/entries/rocky-mount/'
```

**Add Supplement:**

```typescript
// Option A: Add as comment in code
// Primary source: NC Archives John Gray Blount Papers, PC.193 (published in Keith, ed., The John Gray Blount Papers, Vol. II, 1959)

// Option B: Create new field
primarySourceUrl = 'https://archives.ncdcr.gov/' // if digital version exists

// Option C: Update in ContextPanel component to show full citation
```

**Why:** Current citation points to encyclopedia article; should cite original archive

**Verification Needed:** Check if NC Archives has digital Blount Papers online

---

### Issue #6: Verify and Fix Capital Move Date

**File:** `app/(main)/evidence/page.tsx` line 528-531

**Current:**

```typescript
date = 'Early 1792'
event = 'Capital moves to Knoxville'
```

**Problem:** "Early 1792" is vague (could be Jan-June). Needs specific date.

**Action:**

1. Search Blount correspondence for capital move announcement
2. Check Knoxville Gazette founding issue (Nov 1791) for references
3. Check territorial records

**Updated:**

```typescript
// If specific date found:
date = '[SPECIFIC DATE]'
event = 'Capital relocates from Rocky Mount to Knoxville'
sourceUrl = '[PRIMARY DOCUMENT]'

// If date remains approximate, add caveat:
event = 'Capital relocates from Rocky Mount to Knoxville (early 1792)'
// Add note in ContextPanel explaining why date is estimated
```

---

### Issue #7: Verify Knoxville Gazette Date

**File:** `app/(main)/evidence/page.tsx` line 514-516

**Current:**

```typescript
date = 'Nov 5, 1791'
event = 'Knoxville Gazette becomes first Tennessee newspaper'
sourceUrl = 'https://tennesseeencyclopedia.net/entries/knoxville-gazette/'
```

**Verification Needed:**

1. Check Tennessee Encyclopedia article - does it confirm Nov 5, 1791?
2. Search for actual Gazette issues in Library of Congress or ETSU archives
3. Verify George Roulstone as first printer/publisher

**Enhancement:**

```typescript
// If date verified:
sourceUrl = 'https://tennesseeencyclopedia.net/entries/knoxville-gazette/'
// Add manuscript reference if found

// If date needs caveat:
event = 'First issue of Knoxville Gazette published (November 1791)'
// Add note explaining why specific date is confirmed or estimated
```

---

## TIER 3: NICE TO HAVE (30 minutes) - Optional Enhancements

### Issue #8: Add Academic Link to Treaty

**File:** `app/(main)/evidence/page.tsx` line 506-511

**Current:**

```typescript
manuscriptUrl = 'https://digitreaties.org/treaties/treaty/88697242/'
```

**Add:**

```typescript
// Reference version
sourceUrl = 'https://avalon.law.yale.edu/18th_century/chr1791.asp'
```

**Why:** Provides academic publication of same document

---

### Issue #9: Add War Department Papers Reference

**File:** `app/(main)/evidence/page.tsx` SOURCE_LINKS

**Current:**

```typescript
const SOURCE_LINKS = {
  // ... existing links
}
```

**Add:**

```typescript
const SOURCE_LINKS = {
  // ... existing links
  warDepartmentPapers: 'https://wardepartmentpapers.org/',
}
```

**Use In:** Footer sources section (already referenced line 607-612)

---

## VERIFICATION CHECKLIST

### Before Implementation

- [ ] Test each Founders Online URL in browser
- [ ] Confirm Williamson recommendation is correct document (0277 vs 0268)
- [ ] Confirm Washington's question is correct document (0135 vs 0076)
- [ ] Verify Tennessee Encyclopedia articles contain claimed dates
- [ ] Check NC Archives for Blount Papers digital version

### After Implementation

- [ ] All Founders links must return HTTP 200 (not 404 or redirect)
- [ ] brand.ts and page.tsx must use matching document IDs
- [ ] Tennessee Encyclopedia links must verify dates
- [ ] Timeline dates must be in YYYY-MM-DD format
- [ ] All URLs must open successfully in browser

### Testing Script

```bash
# Test all Founders links
curl -s -o /dev/null -w "%{http_code}" https://founders.archives.gov/documents/Washington/05-05-02-0277
curl -s -o /dev/null -w "%{http_code}" https://founders.archives.gov/documents/Washington/05-05-02-0268
curl -s -o /dev/null -w "%{http_code}" https://founders.archives.gov/documents/Washington/05-06-02-0135
curl -s -o /dev/null -w "%{http_code}" https://founders.archives.gov/documents/Washington/05-06-02-0076

# Should return 200 for correct URLs, 404 for incorrect
```

---

## FILE LOCATIONS TO UPDATE

```
Priority 1 (Required):
✅ /app/(main)/evidence/page.tsx
   - Line 393: Generic link
   - Line 367: Williamson source (verify ID)
   - Line 478: Williamson timeline (verify ID)
   - Line 337: Washington's question (verify ID)
   - Line 493: Washington's question timeline (verify ID)

✅ /lib/copy/brand.ts
   - Line 88: Williamson source field
   - Line 94: Washington's question source field
   - Line 101: Treaty source field

Priority 2 (Recommended):
⭐ /app/(main)/evidence/page.tsx
   - Line 295: Add NC Archives reference
   - Line 498, 503: Add primary source
   - Line 528-531: Fix capital move date
   - Line 514-516: Verify Gazette date
```

---

## SUMMARY TABLE

| Issue                             | File(s)            | Lines         | Severity  | Time   |
| --------------------------------- | ------------------ | ------------- | --------- | ------ |
| Generic Founders link             | page.tsx           | 393           | 🔴 HIGH   | 5 min  |
| Williamson doc ID conflict        | page.tsx, brand.ts | 367, 478, 88  | 🔴 HIGH   | 10 min |
| Washington's question ID conflict | page.tsx, brand.ts | 337, 493, 94  | 🔴 HIGH   | 10 min |
| Missing doc IDs in brand.ts       | brand.ts           | 88, 94, 101   | 🟡 MEDIUM | 10 min |
| Blount letter primary source      | page.tsx           | 295, 498, 503 | 🟡 MEDIUM | 15 min |
| Capital move date vague           | page.tsx           | 528-531       | 🟡 MEDIUM | 15 min |
| Gazette date verification         | page.tsx           | 514-516       | 🟡 MEDIUM | 10 min |
| Academic Treaty link              | page.tsx           | 506-511       | 🟢 LOW    | 5 min  |
| War Department reference          | page.tsx           | SOURCE_LINKS  | 🟢 LOW    | 5 min  |

**Total Time Estimate:** 2-2.5 hours

---

**Status:** Ready for implementation
**Next Step:** Verify document IDs by testing URLs, then implement fixes in order
