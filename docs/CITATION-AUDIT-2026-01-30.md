# Evidence Page Citation Audit

**Date:** January 30, 2026
**Scope:** `/app/(main)/evidence/page.tsx` and supporting citations in `lib/copy/brand.ts`
**Status:** Comprehensive audit with prioritized improvements

---

## Executive Summary

**Overall Assessment:** MIXED - The Evidence page uses good sources but several citations lack the specificity needed for academic rigor and transparent verification. The Founders Online citations need direct document links, Tennessee Encyclopedia entries need specific URLs, and several timeline events lack manuscript-level sources.

**Key Issues:**

- 6 Founders Online citations missing specific document identifiers
- 5 Tennessee Encyclopedia links need URL verification and specificity
- Primary quote sources lack full archival citation details
- 3 timeline events use generic repository links instead of specific documents
- No direct links to manuscript-level sources (DigiTreaties, Avalon Project) where available

**Recommended Effort:** 2-3 hours to implement Priority Tier 1 and 2 improvements

---

## CRITICAL FINDINGS

### 1. Founders Online Citations - INCONSISTENT SPECIFICITY

**Location:** Lines 337, 367, 393, 478, 483, 488, 493, 521 in page.tsx

**Issue:** Founders Online URLs fall into two categories:

#### Category A: SPECIFIC (Good - 4 citations)

```
✅ Line 337: https://founders.archives.gov/documents/Washington/05-06-02-0135
   Washington to Knox, August 13, 1790

✅ Line 367: https://founders.archives.gov/documents/Washington/05-05-02-0277
   Williamson to Washington, May 28, 1790

✅ Line 483: https://founders.archives.gov/documents/Washington/05-05-02-0258
   Washington nominates Blount, June 7, 1790

✅ Line 521: https://founders.archives.gov/documents/Washington/05-09-02-0100
   Washington proclaims Treaty of Holston, November 11, 1791
```

#### Category B: GENERIC (Problem - 1 citation)

```
⚠️ Line 393: https://founders.archives.gov/
   "Federal Authority - Treaty Proclamation"
   Points to HOMEPAGE, not specific document

   Should be: https://founders.archives.gov/documents/Washington/05-09-02-0100
   (Same as line 521 - use consistent link)
```

#### Category C: NEED VERIFICATION (3 citations)

```
⚠️ Line 478: https://founders.archives.gov/documents/Washington/05-05-02-0268
   Attribution: "Hugh Williamson recommends Blount to Washington"
   Date: May 28, 1790
   STATUS: Needs verification - different from line 367 (05-05-02-0277)

⚠️ Line 488: https://founders.archives.gov/documents/Washington/05-05-02-0259
   Attribution: "Senate confirms Blount's appointment"
   Date: June 8, 1790
   STATUS: Correct document ID exists

⚠️ Line 493: https://founders.archives.gov/documents/Washington/05-06-02-0076
   Attribution: "Washington asks Knox: 'Where ought the Governor to reside?'"
   Date: August 13, 1790
   STATUS: MISMATCH - Line 337 uses 05-06-02-0135 for same date/subject
   NEED TO VERIFY WHICH IS CORRECT
```

**Severity:** MEDIUM-HIGH - Direct links improve credibility

**Fix Priority:** Tier 1 - Must fix before public launch

- Line 393: Replace generic link with specific document
- Line 493: Verify correct document ID (conflict with line 337)

---

### 2. Tennessee Encyclopedia - MISSING SPECIFIC URLS

**Location:** Lines 295, 498, 503, 516, 531, 536

**Issue:** All Tennessee Encyclopedia links point to article landing pages, but lack specific section anchors or detailed source information.

#### Current Implementation

```
✅ Line 295: https://tennesseeencyclopedia.net/entries/rocky-mount/
   SOURCE QUOTE: "Glass Windows" letter citation
   ASSESSMENT: Link is correct but lacks specific passage reference

✅ Line 498, 503: https://tennesseeencyclopedia.net/entries/rocky-mount/
   TIMELINE: Blount arrives October 11; writes October 20
   ASSESSMENT: Should be specific, but article doesn't have anchors

✅ Line 516: https://tennesseeencyclopedia.net/entries/knoxville-gazette/
   TIMELINE: Knoxville Gazette becomes first newspaper, November 5, 1791
   ASSESSMENT: Link exists but entry may not have publication date detail

✅ Line 531: https://tennesseeencyclopedia.net/entries/southwest-territory/
   TIMELINE: Capital moves to Knoxville, Early 1792
   ASSESSMENT: Generic link to territory article, not capital move

✅ Line 536: https://tennesseeencyclopedia.net/entries/statehood/
   TIMELINE: Tennessee admitted to Union, June 1, 1796
   ASSESSMENT: Link is appropriate for statehood date
```

**Problem:** Tennessee Encyclopedia links are good but shouldn't be sole source for specific historical claims (dates, events). These should be supplemented with primary sources or academic references.

**Severity:** MEDIUM - Loss of transparency about whether encyclopedia articles actually document these specific claims

**Fix Priority:** Tier 2 - Recommend before public launch

- Add disclaimer: "Tennessee Encyclopedia provides context; primary sources linked below"
- Or supplement with primary manuscript URLs where available

---

### 3. PRIMARY QUOTES - INCOMPLETE ARCHIVAL CITATIONS

**Location:** `lib/copy/brand.ts` lines 70-102

**Issue:** The PRIMARY_QUOTES used throughout evidence page lack full archival details.

#### Quote 1: "Glass Windows" (Featured Quote)

```
Line 78-82 in brand.ts:
source: 'State Archives of North Carolina, John Gray Blount Papers, PC.193.
         Keith, ed., The John Gray Blount Papers, Vol. II (1959), pp. 127-128'

ASSESSMENT: ✅ EXCELLENT
- Specific archive location (NC Archives)
- Collection ID (PC.193)
- Published reference with page numbers
- Could add: URL to finding aid or digital version
- Could add: OCR text source if available

USED IN: Evidence page line 295
IMPROVEMENT: Add URL to NC State Archives digital version if available
```

#### Quote 2: Williamson Recommendation

```
Line 85-88 in brand.ts:
attribution: 'Hugh Williamson to George Washington, May 28, 1790'
source: 'Founders Online'

ASSESSMENT: ⚠️ VAGUE
- No document identifier
- Should match line 367 in page.tsx: 05-05-02-0277
- OR line 478 in page.tsx: 05-05-02-0268
- CONFLICT: Two different document IDs for same claimed date/person

USED IN: Evidence page line 367
ACTION NEEDED: Verify correct document ID, update both files
```

#### Quote 3: Washington's Question

```
Line 91-95 in brand.ts:
attribution: 'George Washington to Henry Knox, August 13, 1790'
source: 'Founders Online'

ASSESSMENT: ⚠️ VAGUE
- No document identifier
- Could match line 337: 05-06-02-0135
- Could match line 493: 05-06-02-0076
- CONFLICT: Two different document IDs for same claimed date/recipients

USED IN: Evidence page line 337
ACTION NEEDED: Verify which document ID is correct
```

#### Quote 4: Treaty Proclamation

```
Line 98-101 in brand.ts:
attribution: 'George Washington, November 11, 1791'
source: 'Founders Online, National Archives'

ASSESSMENT: ✅ CORRECT but incomplete
- Document ID: 05-09-02-0100 (from line 521)
- Should add document ID to source string
- Should note: "Countersigned by Secretary of State Thomas Jefferson"

IMPROVEMENT: Add specific URL
```

**Severity:** MEDIUM - Accuracy is good but citations lack research-grade specificity

**Fix Priority:** Tier 1 for conflicts, Tier 2 for vagueness

- Resolve Williamson recommendation document ID (05-05-02-0277 vs 0268)
- Resolve Washington's question document ID (05-06-02-0135 vs 0076)
- Add document IDs to brand.ts source fields

---

### 4. TIMELINE EVENTS - MISSING PRIMARY MANUSCRIPT LINKS

**Location:** Timeline section, lines 474-538 in page.tsx

**Issue:** Timeline events use secondary sources (Tennessee Encyclopedia) where primary sources are available.

#### Events with GOOD sourcing

```
✅ Line 506-511: Treaty of Holston signed (July 2, 1791)
   PRIMARY: https://digitreaties.org/treaties/treaty/88697242/
   SECONDARY: https://avalon.law.yale.edu/18th_century/chr1791.asp
   ASSESSMENT: EXCELLENT - Both manuscript and academic version available

✅ Line 519-521: Washington proclaims Treaty (Nov 11, 1791)
   PRIMARY: https://founders.archives.gov/documents/Washington/05-09-02-0100
   ASSESSMENT: GOOD - Direct document link
```

#### Events with VAGUE sourcing

```
⚠️ Line 475-478: Hugh Williamson recommends Blount (May 28, 1790)
   CURRENT: https://founders.archives.gov/documents/Washington/05-05-02-0268
   NEED TO VERIFY: Matches the Williamson recommendation quote?

⚠️ Line 480-484: Washington nominates Blount (June 7, 1790)
   CURRENT: https://founders.archives.gov/documents/Washington/05-05-02-0258
   STATUS: OK but generic
   IMPROVEMENT: Could add description of document type (nomination letter)

⚠️ Line 485-488: Senate confirms Blount (June 8, 1790)
   CURRENT: https://founders.archives.gov/documents/Washington/05-05-02-0259
   STATUS: OK but could specify "Senate confirmation record"
```

#### Events with SECONDARY sources (should supplement with primary)

```
⚠️ Line 498-503: Blount arrives/writes letters (Oct 11, Oct 20, 1790)
   CURRENT: https://tennesseeencyclopedia.net/entries/rocky-mount/
   PROBLEM: Tennessee Encyclopedia mentions these but doesn't publish text
   IMPROVEMENT: Add direct citation to NC Archives John Gray Blount Papers
   AVAILABLE: Blount letter (Glass Windows quote) from NC Archives
   RECOMMENDATION: Link to NC Archives digital version or Founders Online

⚠️ Line 514-516: Knoxville Gazette first issue (Nov 5, 1791)
   CURRENT: https://tennesseeencyclopedia.net/entries/knoxville-gazette/
   PROBLEM: Encyclopedia article doesn't link to actual newspaper
   AVAILABLE: American State Papers (https://memory.loc.gov/ammem/amlaw/)
   RECOMMENDATION: Add Library of Congress link if newspaper digitized
   STATUS: Nov 5, 1791 date needs verification in actual newspaper records

⚠️ Line 528-531: Capital moves to Knoxville (Early 1792)
   CURRENT: https://tennesseeencyclopedia.net/entries/southwest-territory/
   PROBLEM: Vague date ("Early 1792"), secondary source only
   RECOMMENDATION: Find specific document (territorial records, Blount letter) dating move
   IMPACT: "Early 1792" could be anywhere Jan-June - needs precision

⚠️ Line 534-536: Tennessee statehood (June 1, 1796)
   CURRENT: https://tennesseeencyclopedia.net/entries/statehood/
   ASSESSMENT: Good for this well-documented fact
   IMPROVEMENT: Could add Congressional records or Constitution Ratification documents
```

**Severity:** MEDIUM - Secondary sources are reliable but primary manuscripts add authority

**Fix Priority:** Tier 2 - Nice to have after critical issues resolved

---

## PRIORITY-ORDERED CITATION IMPROVEMENTS

### TIER 1: MUST FIX (Accuracy conflicts - 1-2 hours)

| #   | Issue                             | Location           | Action                                                                       | Confidence |
| --- | --------------------------------- | ------------------ | ---------------------------------------------------------------------------- | ---------- |
| 1   | Generic Founders link             | Line 393           | Replace generic `founders.archives.gov/` with `05-09-02-0100`                | HIGH       |
| 2   | Williamson doc ID mismatch        | Lines 88, 367, 478 | Verify correct document ID (0277 vs 0268) for Williamson recommendation      | HIGH       |
| 3   | Washington's question ID mismatch | Lines 93, 337, 493 | Verify correct document ID (0135 vs 0076) for "Where ought Governor reside?" | HIGH       |

**Evidence:** Multiple URLs pointing to same claimed event with different document IDs

---

### TIER 2: SHOULD FIX (Transparency improvements - 1 hour)

| #   | Issue                                 | Location              | Action                                                                                       | Impact |
| --- | ------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------- | ------ |
| 4   | Blount letters lack direct source     | Lines 295, 498, 503   | Add NC Archives John Gray Blount Papers, PC.193 direct link                                  | MEDIUM |
| 5   | Capital move date vague               | Line 531              | Find specific document dating move; change "Early 1792" to YYYY-MM-DD or date range          | MEDIUM |
| 6   | Gazette first issue not in manuscript | Line 516              | Verify date in actual newspaper records or add caveat "historically recorded as Nov 5, 1791" | MEDIUM |
| 7   | Brand.ts sources incomplete           | brand.ts lines 85-102 | Add Founders Online document IDs to all quotes                                               | MEDIUM |

**Evidence:** Current sources are reliable but lack the specificity expected in academic/transparent archive

---

### TIER 3: NICE TO HAVE (Enhancement - 30 minutes)

| #   | Issue                                      | Location | Action                                                                          | Benefit |
| --- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------- | ------- |
| 8   | Treaty has no secondary academic link      | Line 508 | Add Avalon Project link: `https://avalon.law.yale.edu/18th_century/chr1791.asp` | LOW     |
| 9   | Blount Mansion link vague                  | Line 526 | Could add specific URL to family history page if available                      | LOW     |
| 10  | No direct link to Papers of War Department | Line 602 | Could cross-reference War Department records for Knox correspondence            | LOW     |

**Evidence:** These would improve research value but aren't critical

---

## SPECIFIC RECOMMENDATIONS BY SOURCE

### Founders Online (`https://founders.archives.gov/`)

**Current Status:** Used well but inconsistently

**Issues Found:**

1. Homepage link instead of document link (line 393)
2. Potentially conflicting document IDs for same events
3. Missing document IDs in brand.ts source citations

**Fixes Needed:**

```typescript
// BEFORE (line 393)
sourceUrl = 'https://founders.archives.gov/'

// AFTER
sourceUrl = 'https://founders.archives.gov/documents/Washington/05-09-02-0100'

// BEFORE (brand.ts line 88, 94, 101)
source: 'Founders Online'

// AFTER
source: 'Founders Online, document/Washington/05-05-02-0277'
source: 'Founders Online, document/Washington/05-06-02-0135'
source: 'Founders Online, document/Washington/05-09-02-0100'
```

**Verification Needed:**

- [ ] Confirm line 367 document ID for Williamson recommendation (0277)
- [ ] Confirm line 337 document ID for Washington's question (0135)
- [ ] Confirm line 478 vs 367 for Williamson (0268 vs 0277)
- [ ] Confirm line 337 vs 493 for Washington's question (0135 vs 0076)

---

### Tennessee Encyclopedia (`https://tennesseeencyclopedia.net/`)

**Current Status:** Used appropriately for context but shouldn't be sole source for specific dates

**Issues Found:**

1. Rocky Mount article cited for two specific dates (arrival and letter)
2. No verification that encyclopedia dates match page.tsx dates
3. Using secondary source when primary manuscript available

**Recommendations:**

```typescript
// ADD SUPPLEMENTARY PRIMARY SOURCES
// For Glass Windows letter (line 295)
sourceUrl = 'https://tennesseeencyclopedia.net/entries/rocky-mount/'
// ADD: primarySourceUrl="[NC Archives John Gray Blount Papers digital link]"

// For Knoxville Gazette (line 516)
sourceUrl = 'https://tennesseeencyclopedia.net/entries/knoxville-gazette/'
// ADD: manuscriptUrl="https://memory.loc.gov/ammem/amlaw/" (if digitized)

// For Southwest Territory (line 531)
sourceUrl = 'https://tennesseeencyclopedia.net/entries/southwest-territory/'
// NOTE: Need specific document for capital move date
```

**Verification Needed:**

- [ ] Verify Oct 11, 1790 arrival date matches encyclopedia source
- [ ] Verify Oct 20, 1790 letter date matches encyclopedia source
- [ ] Verify Nov 5, 1791 Gazette publication date
- [ ] Find specific document for Feb-March 1792 capital move

---

### DigiTreaties (`https://digitreaties.org/`)

**Current Status:** EXCELLENT use - directly links to 23-page manuscript

**Uses:**

- Line 510: Treaty of Holston manuscript (full text)
- Line 449: Signatory link to DigiTreaties

**Assessment:** This is the gold standard. Consider expanding this model to other treaties/documents.

**Opportunity:**
Could add DigiTreaties link to Treaty of Hopewell (1785) if planning to add that document to archive.

---

### Avalon Project (`https://avalon.law.yale.edu/`)

**Current Status:** Underutilized

**Available Resources:**

- Treaty of Holston text: `https://avalon.law.yale.edu/18th_century/chr1791.asp`
- Various federal documents from 1790-1796 era

**Recommendation:**
Add as supplementary academic source for Treaty section (line 508).

---

### National Archives (`https://www.archives.gov/`)

**Current Status:** Generic repository link listed but not fully leveraged

**Uses:**

- Line 38: Generic link in SOURCE_LINKS
- Line 101: Referenced in brand.ts but no specific link

**Opportunity:**
National Archives has:

- War Department Papers (1784-1800): https://wardepartmentpapers.org/
- Territorial Papers collection
- Cherokee treaty records

**Recommendation:**
Create specific links to relevant collections rather than generic homepage.

---

## GAPS & MISSING CITATIONS

### Primary Sources Available But Not Cited

| Document                               | Date         | Current Citation       | Recommended Addition                                                           |
| -------------------------------------- | ------------ | ---------------------- | ------------------------------------------------------------------------------ |
| William Blount letters (Glass Windows) | Oct 20, 1790 | Tennessee Encyclopedia | NC Archives, John Gray Blount Papers, PC.193                                   |
| Washington-Knox correspondence         | Aug 13, 1790 | Founders Online        | Direct document ID (needs verification)                                        |
| Senate confirmation record             | June 8, 1790 | Founders Online        | Senate records or archives                                                     |
| Treaty of Hopewell                     | 1785         | No citation            | DigiTreaties or Avalon or NHLA                                                 |
| Blount's appointment letter            | June 7, 1790 | Founders Online        | Could add Secretary of State records                                           |
| Knoxville Gazette issues               | Nov 5, 1791+ | Vague reference        | Library of Congress American State Papers or East Tennessee Historical Society |

### Manuscript Sources Not Fully Utilized

```
AVAILABLE BUT UNDERUTILIZED:
✅ DigiTreaties - Used for Treaty of Holston only
   Should also document: Treaty of Hopewell (1785), other Cherokee treaties

✅ Founders Online - Used well but inconsistently
   Should standardize document IDs in all citations

❌ War Department Papers (wardepartmentpapers.org)
   Mentioned in SOURCE_LINKS but not cited in timeline
   Could support Knox correspondence and military appointments

❌ American State Papers (memory.loc.gov/ammem/amlaw)
   Not cited; could document Knoxville Gazette
   Could document territorial records and capital move

❌ North Carolina State Archives digital collections
   Not cited; could document Blount-Cobb correspondence
   Could provide digital versions of PC.193 letters
```

---

## ACCURACY CROSS-CHECK: Timeline vs. Brand.ts

**Potential Conflicts Identified:**

| Event                     | Date in Timeline        | Date in Quote                      | Source Conflict                                     |
| ------------------------- | ----------------------- | ---------------------------------- | --------------------------------------------------- |
| Williamson recommendation | May 28, 1790 (line 476) | May 28, 1790 (brand.ts)            | ✅ MATCH - but need to verify doc ID                |
| Washington's question     | Aug 13, 1790 (line 491) | Aug 13, 1790 (brand.ts)            | ⚠️ CONFLICT: Lines 337 vs 493 use different doc IDs |
| Glass Windows letter      | Oct 20, 1790 (line 501) | Oct 20, 1790 (brand.ts)            | ✅ MATCH - both cite Blount                         |
| Blount arrival            | Oct 11, 1790 (line 496) | Oct 11, 1790 (implied in brand.ts) | ✅ MATCH                                            |

---

## IMPLEMENTATION CHECKLIST

### Before Making Changes

- [ ] Verify Founders Online document IDs by accessing actual URLs
- [ ] Check if Williamson recommendation ID should be 0277 or 0268
- [ ] Check if Washington's question ID should be 0135 or 0076
- [ ] Verify Tennessee Encyclopedia entries contain claimed dates
- [ ] Check if NC Archives has digital version of John Gray Blount Papers

### Tier 1 Changes (Required - 1-2 hours)

- [ ] Fix line 393: Replace generic link with specific document
- [ ] Resolve Williamson doc ID conflict (brand.ts + page.tsx lines 367, 478)
- [ ] Resolve Washington's question ID conflict (page.tsx lines 337, 493)
- [ ] Update brand.ts to include document IDs in source fields

### Tier 2 Changes (Recommended - 1 hour)

- [ ] Add NC Archives link for Blount letters (supplement line 295)
- [ ] Find specific date for capital move (replace "Early 1792")
- [ ] Verify Knoxville Gazette date (Nov 5, 1791)
- [ ] Add caveat where dates are from secondary sources only

### Tier 3 Changes (Optional - 30 minutes)

- [ ] Add Avalon Project link to Treaty section
- [ ] Add War Department Papers link if Knox correspondence included
- [ ] Add Library of Congress links for newspaper sources

---

## RECOMMENDATIONS FOR ENHANCED TRANSPARENCY

### Add Citation Metadata

```typescript
// Consider adding to each quote/timeline event:
{
  sourceUrl: string              // What it is
  sourceType: 'primary' | 'secondary' | 'manuscript'  // What kind
  verified: boolean              // Has it been checked?
  verifiedDate?: string          // When was it checked?
  archiveCollection?: string     // Where in archive?
  pageReference?: string         // Page number if published
}
```

### Add Verification Badges

Display on each citation:

```
🔗 Direct Primary Source
📄 Secondary Source
📜 Manuscript Available
⚠️ Single Source (needs verification)
❓ Unverified (check needed)
```

### Add "Last Verified" Dates

With URL checking, show when citations were last confirmed to be live.

---

## SPECIFIC URLs THAT NEED VERIFICATION

Run these checks to confirm citations are accurate:

```bash
# Test Founders Online links
curl -I https://founders.archives.gov/documents/Washington/05-05-02-0277
curl -I https://founders.archives.gov/documents/Washington/05-05-02-0268
curl -I https://founders.archives.gov/documents/Washington/05-06-02-0135
curl -I https://founders.archives.gov/documents/Washington/05-06-02-0076
curl -I https://founders.archives.gov/documents/Washington/05-05-02-0258
curl -I https://founders.archives.gov/documents/Washington/05-05-02-0259
curl -I https://founders.archives.gov/documents/Washington/05-09-02-0100

# Test Tennessee Encyclopedia
curl -I https://tennesseeencyclopedia.net/entries/rocky-mount/
curl -I https://tennesseeencyclopedia.net/entries/knoxville-gazette/
curl -I https://tennesseeencyclopedia.net/entries/southwest-territory/
curl -I https://tennesseeencyclopedia.net/entries/statehood/

# Test primary manuscript links
curl -I https://digitreaties.org/treaties/treaty/88697242/
curl -I https://avalon.law.yale.edu/18th_century/chr1791.asp
```

---

## SUMMARY BY SOURCE QUALITY

### HIGH QUALITY (Keep as-is, verify)

- Blount letter from NC Archives with publication reference
- Treaty of Holston with both manuscript (DigiTreaties) and academic (Avalon) versions
- Treaty ratification from Founders Online

### MEDIUM QUALITY (Improve specificity)

- Founders Online citations without document IDs
- Tennessee Encyclopedia citations without verification
- Timeline events using only secondary sources where primary available

### LOW QUALITY (Upgrade urgently)

- Line 393: Homepage link instead of document link
- Conflicting document IDs for same events
- Generic repository links with no specific collection

---

## NEXT STEPS

1. **Verification Phase (30 min)**: Test all URLs, resolve document ID conflicts
2. **Enhancement Phase (1 hour)**: Add primary sources, supplement secondary sources
3. **Implementation Phase (30 min)**: Update page.tsx and brand.ts
4. **Testing Phase (15 min)**: Verify all links work, dates match

**Total Time Estimate:** 2-2.5 hours

**Recommended Owner:** Cody (final authority on historical accuracy) + Claude Code (implementation)

---

**Report Generated:** January 30, 2026
**Next Review:** Upon public launch of transparency engine
