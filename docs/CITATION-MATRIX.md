# Evidence Page Citations - Complete Matrix

**Purpose:** Visual reference for all citations used in `/app/(main)/evidence/page.tsx`
**Last Updated:** January 30, 2026
**Format:** Sortable by source type, accuracy, and action required

---

## ALL CITATIONS BY SOURCE

### SECTION 1: FEATURED QUOTE - "Glass Windows"

| Element         | Citation               | Source Type | Status    | Link                                                   |
| --------------- | ---------------------- | ----------- | --------- | ------------------------------------------------------ |
| Quote Text      | William Blount letter  | Primary     | ✅ STRONG | NC Archives PC.193                                     |
| Context         | Glass windows in 1790  | Primary     | ✅ STRONG | Same as above                                          |
| Citation Method | Published edition      | Secondary   | ✅ STRONG | Keith ed., 1959                                        |
| Display Link    | Tennessee Encyclopedia | Secondary   | ✅ GOOD   | https://tennesseeencyclopedia.net/entries/rocky-mount/ |

**Assessment:** Excellent - Combines primary manuscript with published scholarly edition

**Citation in Code:**

```typescript
sourceUrl = 'https://tennesseeencyclopedia.net/entries/rocky-mount/'
```

**Recommended Enhancement:** Add direct link to NC Archives PC.193 if digitized

---

### SECTION 2: "THE QUESTION" - Washington & Knox

| Element                  | Citation        | Source Type | Claim                            | Status      | Link          |
| ------------------------ | --------------- | ----------- | -------------------------------- | ----------- | ------------- |
| Quote (brand.ts)         | Founders Online | Primary     | Washington to Knox, Aug 13, 1790 | ⚠️ VAGUE    | No doc ID     |
| Quote (page.tsx L337)    | Founders Online | Primary     | Same event                       | ⚠️ CONFLICT | 05-06-02-0135 |
| Timeline (page.tsx L493) | Founders Online | Primary     | Same event                       | ⚠️ CONFLICT | 05-06-02-0076 |

**Issue:** Two different document IDs for same claimed event

| Comparison   | Line 337             | Line 493             |
| ------------ | -------------------- | -------------------- |
| Date Claim   | Aug 13, 1790         | Aug 13, 1790         |
| Event        | Washington asks Knox | Washington asks Knox |
| Founders URL | 05-06-02-0135        | 05-06-02-0076        |
| Status       | ❓ NEED TO VERIFY    | ❓ NEED TO VERIFY    |

**Action Required:** TIER 1 - Test both URLs, use verified ID everywhere

**Fix Implementation:**

```typescript
// BEFORE (brand.ts line 94)
source: 'Founders Online'

// AFTER
source: 'Founders Online, document/Washington/05-06-02-0135'

// AND verify page.tsx lines 337 & 493 use same ID
```

---

### SECTION 3: "THE APPOINTMENT" - Williamson Recommendation

| Element                  | Citation        | Source Type | Claim                                  | Status      | Link          |
| ------------------------ | --------------- | ----------- | -------------------------------------- | ----------- | ------------- |
| Quote (brand.ts)         | Founders Online | Primary     | Williamson to Washington, May 28, 1790 | ⚠️ VAGUE    | No doc ID     |
| Quote (page.tsx L367)    | Founders Online | Primary     | Same event                             | ⚠️ CONFLICT | 05-05-02-0277 |
| Timeline (page.tsx L478) | Founders Online | Primary     | Same event                             | ⚠️ CONFLICT | 05-05-02-0268 |

**Issue:** Two different document IDs for same claimed event

| Comparison   | Line 367              | Line 478              |
| ------------ | --------------------- | --------------------- |
| Date Claim   | May 28, 1790          | May 28, 1790          |
| Event        | Williamson recommends | Williamson recommends |
| Founders URL | 05-05-02-0277         | 05-05-02-0268         |
| Status       | ❓ NEED TO VERIFY     | ❓ NEED TO VERIFY     |

**Action Required:** TIER 1 - Test both URLs, use verified ID everywhere

**Fix Implementation:**

```typescript
// BEFORE (brand.ts line 88)
source: 'Founders Online'

// AFTER
source: 'Founders Online, document/Washington/05-05-02-0277'

// AND verify page.tsx lines 367 & 478 use same ID
```

---

### SECTION 4: "FEDERAL AUTHORITY" - Treaty Proclamation

| Element                  | Citation        | Source Type | Claim                                 | Status      | Link             | Issue               |
| ------------------------ | --------------- | ----------- | ------------------------------------- | ----------- | ---------------- | ------------------- |
| Quote (brand.ts)         | Founders Online | Primary     | Washington proclamation, Nov 11, 1791 | ⚠️ VAGUE    | No doc ID        | Missing specificity |
| Quote (page.tsx L393)    | Founders Online | Primary     | Same event                            | ❌ GENERIC  | Generic homepage | Needs doc ID        |
| Timeline (page.tsx L521) | Founders Online | Primary     | Same event                            | ✅ SPECIFIC | 05-09-02-0100    | Correct format      |

**Issue:** Generic homepage link instead of specific document

| Comparison | Line 393                         | Line 521                    |
| ---------- | -------------------------------- | --------------------------- |
| Event      | Treaty Proclamation              | Washington proclaims Treaty |
| URL        | `https://founders.archives.gov/` | 05-09-02-0100               |
| Status     | ❌ GENERIC                       | ✅ SPECIFIC                 |

**Action Required:** TIER 1 - Update line 393 to match line 521

**Fix Implementation:**

```typescript
// BEFORE (page.tsx line 393)
sourceUrl = 'https://founders.archives.gov/'

// AFTER
sourceUrl = 'https://founders.archives.gov/documents/Washington/05-09-02-0100'

// AND update brand.ts line 101
source: 'Founders Online, document/Washington/05-09-02-0100'
```

---

### SECTION 5: TREATY SIGNERS - Treaty of Holston

| Element            | Citation       | Source Type        | Claim                                  | Status       | Link                                                 |
| ------------------ | -------------- | ------------------ | -------------------------------------- | ------------ | ---------------------------------------------------- |
| Signatory names    | DigiTreaties   | Primary Manuscript | 42 Cherokee signatories, July 2, 1791  | ✅ EXCELLENT | https://digitreaties.org/treaties/treaty/88697242/   |
| Full treaty text   | DigiTreaties   | Primary Manuscript | 23-page original document              | ✅ EXCELLENT | Same link                                            |
| Academic reference | Avalon Project | Secondary Academic | Same treaty, formatted for legal study | ⭐ AVAILABLE | https://avalon.law.yale.edu/18th_century/chr1791.asp |

**Assessment:** Excellent - Primary manuscript directly accessible

**Enhancement Opportunity:** Add Avalon Project link as academic supplement

**Current Code:**

```typescript
manuscriptUrl = 'https://digitreaties.org/treaties/treaty/88697242/'
manuscriptLabel = 'View the original 23-page manuscript'
```

**Recommended Enhancement:**

```typescript
// Keep existing
manuscriptUrl = 'https://digitreaties.org/treaties/treaty/88697242/'

// ADD
sourceUrl = 'https://avalon.law.yale.edu/18th_century/chr1791.asp'
sourceLabel = 'Academic version (Yale Law School)'
```

---

### SECTION 6: TIMELINE - All Events

#### Row 1: Williamson Recommendation (May 28, 1790)

```
Status: ⚠️ CONFLICT (See Section 3)
Document ID: 05-05-02-0277 OR 05-05-02-0268
Action: TIER 1 - Verify and standardize
```

#### Row 2: Washington Nominates Blount (June 7, 1790)

```
URL: https://founders.archives.gov/documents/Washington/05-05-02-0258
Status: ✅ SPECIFIC
Action: None (already correct)
Verification: Should confirm document matches claim
```

#### Row 3: Senate Confirms Blount (June 8, 1790)

```
URL: https://founders.archives.gov/documents/Washington/05-05-02-0259
Status: ✅ SPECIFIC
Action: None (already correct)
Verification: Should confirm document matches claim
```

#### Row 4: Washington Asks Knox Location (August 13, 1790)

```
Status: ⚠️ CONFLICT (See Section 2)
Document ID: 05-06-02-0135 OR 05-06-02-0076
Action: TIER 1 - Verify and standardize
```

#### Row 5: Blount Arrives (October 11, 1790)

```
URL: https://tennesseeencyclopedia.net/entries/rocky-mount/
Status: ⚠️ SECONDARY SOURCE
Primary Source: NC Archives, John Gray Blount Papers, PC.193
Action: TIER 2 - Add primary source reference
Note: Date appears to be accurate per Blount correspondence
```

#### Row 6: Blount Writes Letter (October 20, 1790)

```
URL: https://tennesseeencyclopedia.net/entries/rocky-mount/
Status: ⚠️ SECONDARY SOURCE
Primary Source: NC Archives, John Gray Blount Papers, PC.193 (published in Keith ed., 1959)
Action: TIER 2 - Add primary source reference
Note: Excellent primary source exists but not directly linked
```

#### Row 7: Treaty of Holston (July 2, 1791)

```
URL: https://digitreaties.org/treaties/treaty/88697242/
Status: ✅ PRIMARY MANUSCRIPT
Action: TIER 3 - Optionally add Avalon Project academic version
Note: This is gold standard - direct to manuscript
```

#### Row 8: Knoxville Gazette First Issue (November 5, 1791)

```
URL: https://tennesseeencyclopedia.net/entries/knoxville-gazette/
Status: ⚠️ SECONDARY SOURCE - NEEDS VERIFICATION
Primary Source: Knoxville Gazette archives (if digitized at LOC or ETSU)
Action: TIER 2 - Verify date, find manuscript if available
Note: Date needs confirmation in actual newspaper records
```

#### Row 9: Treaty Proclaimed (November 11, 1791)

```
URL: https://founders.archives.gov/documents/Washington/05-09-02-0100
Status: ✅ SPECIFIC
Action: None (already correct)
Note: Properly links to specific document
```

#### Row 10: Blount Family Arrives (Late 1791)

```
URL: https://www.blountmansion.org/
Status: ⚠️ GENERIC - Points to organization homepage
Primary Source: Blount Mansion archives or published Blount Papers
Action: TIER 3 - Optional: find specific document/page if available
Note: Date is vague but "late 1791" is well-documented
```

#### Row 11: Capital Moves to Knoxville (Early 1792)

```
URL: https://tennesseeencyclopedia.net/entries/southwest-territory/
Status: ⚠️ VAGUE DATE & SECONDARY SOURCE
Primary Source: Blount correspondence or territorial records (specific date needed)
Action: TIER 2 - Find specific date and primary document
Note: "Early 1792" could be Jan-June; needs clarification
Recommendation: Search Blount letter or Knoxville Gazette for move announcement
```

#### Row 12: Tennessee Statehood (June 1, 1796)

```
URL: https://tennesseeencyclopedia.net/entries/statehood/
Status: ✅ SECONDARY SOURCE - Well-documented fact
Primary Source: Congressional records, Federal Register
Action: None (this is standard reference material)
Enhancement: Could add Congressional archive link
```

---

## SOURCES SUMMARY TABLE

### By Source Quality

| Source                 | # Citations   | Avg Specificity | Status                                     |
| ---------------------- | ------------- | --------------- | ------------------------------------------ |
| Founders Online        | 5             | Mixed           | ⚠️ Conflicts need resolution               |
| Tennessee Encyclopedia | 6             | Secondary       | ⚠️ Good context, needs primary supplements |
| DigiTreaties           | 1             | Excellent       | ✅ Gold standard                           |
| NC Archives            | 1 (indirect)  | Excellent       | ⭐ Not directly linked                     |
| Blount Mansion         | 1             | Generic         | ⚠️ Homepage link                           |
| Avalon Project         | 0 (available) | Academic        | ⭐ Should be used                          |

### By Accuracy/Verification Status

| Status                            | Count | Examples                           | Action                     |
| --------------------------------- | ----- | ---------------------------------- | -------------------------- |
| ✅ VERIFIED - Primary manuscript  | 2     | DigiTreaties Treaty, Blount Papers | Keep as-is                 |
| ✅ SPECIFIC - Direct document     | 3     | FO doc IDs when correct            | Verify conflicts           |
| ⚠️ SECONDARY - Needs verification | 6     | Tennessee Encyclopedia articles    | Verify dates               |
| ⚠️ VAGUE - Homepage link          | 2     | Founders generic, Blount Mansion   | Upgrade with specific URLs |
| ❌ CONFLICTING - Multiple IDs     | 2     | Williamson, Washington's question  | Resolve TIER 1             |

---

## CITATION GAPS - Available But Unused

### Manuscript Sources Not Cited

| Source                                      | Availability                        | Recommendation                     | Current Use           |
| ------------------------------------------- | ----------------------------------- | ---------------------------------- | --------------------- |
| War Department Papers                       | https://wardepartmentpapers.org/    | Could document Knox correspondence | Not used              |
| Library of Congress - American State Papers | https://memory.loc.gov/ammem/amlaw/ | Could verify Gazette date          | Not used              |
| Avalon Project - Legal documents            | https://avalon.law.yale.edu/        | Used for Treaty context            | Partial (Treaty only) |
| NC Archives Digital                         | Archives.ncdcr.gov                  | Could link Blount Papers directly  | Not directly used     |
| Knoxville Gazette Archives                  | ETSU or LOC                         | Could verify newspaper dates       | Not found             |

### Academic References Not Cited

| Type                          | Recommendation                          | Where to Find      |
| ----------------------------- | --------------------------------------- | ------------------ |
| Cherokee history scholarship  | Cite academic sources on Treaty signers | University presses |
| Tennessee territorial history | Cite scholarly works on capital move    | THC databases      |
| Federal Indian affairs        | Cite War Department history             | National Archives  |

---

## ACTION MATRIX: What to Do for Each Citation

### REQUIRED ACTIONS (Tier 1 - Must Do)

```
┌─────────────────────────────────────────────────────────┐
│ ACTION 1: Resolve Williamson Document ID Conflict       │
├─────────────────────────────────────────────────────────┤
│ Files:  brand.ts line 88, page.tsx lines 367 & 478      │
│ URL 1:  05-05-02-0277                                   │
│ URL 2:  05-05-02-0268                                   │
│ Task:   Test both URLs                                  │
│ Result: Use verified ID everywhere                      │
│ Time:   10 minutes                                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ACTION 2: Resolve Washington's Question Document ID     │
├─────────────────────────────────────────────────────────┤
│ Files:  brand.ts line 94, page.tsx lines 337 & 493      │
│ URL 1:  05-06-02-0135                                   │
│ URL 2:  05-06-02-0076                                   │
│ Task:   Test both URLs                                  │
│ Result: Use verified ID everywhere                      │
│ Time:   10 minutes                                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ACTION 3: Fix Generic Treaty Proclamation Link          │
├─────────────────────────────────────────────────────────┤
│ File:   page.tsx line 393                               │
│ From:   https://founders.archives.gov/                  │
│ To:     https://founders.archives.gov/documents/        │
│         Washington/05-09-02-0100                        │
│ Time:   5 minutes                                        │
└─────────────────────────────────────────────────────────┘
```

### RECOMMENDED ACTIONS (Tier 2 - Should Do)

```
┌─────────────────────────────────────────────────────────┐
│ ACTION 4: Add Archival References to Blount Letters     │
├─────────────────────────────────────────────────────────┤
│ Files:  page.tsx lines 295, 498, 503                    │
│ Add:    NC Archives reference + PC.193                  │
│ Where:  ContextPanel or footer note                     │
│ Time:   15 minutes                                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ACTION 5: Clarify Capital Move Date                     │
├─────────────────────────────────────────────────────────┤
│ File:   page.tsx line 528-531                           │
│ From:   "Early 1792"                                    │
│ To:     Specific date or documented range              │
│ Task:   Find document dating move                       │
│ Time:   15 minutes                                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ACTION 6: Verify Knoxville Gazette Date                 │
├─────────────────────────────────────────────────────────┤
│ File:   page.tsx line 514-516                           │
│ Task:   Confirm "Nov 5, 1791" in encyclopedia           │
│ Time:   10 minutes                                       │
└─────────────────────────────────────────────────────────┘
```

### OPTIONAL ACTIONS (Tier 3 - Nice to Have)

```
┌─────────────────────────────────────────────────────────┐
│ ACTION 7: Add Academic Treaty Reference                 │
├─────────────────────────────────────────────────────────┤
│ File:   page.tsx line 508 (Treaty of Holston)           │
│ Add:    https://avalon.law.yale.edu/18th_century/       │
│         chr1791.asp                                      │
│ Time:   5 minutes                                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ACTION 8: Leverage War Department Papers                │
├─────────────────────────────────────────────────────────┤
│ File:   page.tsx SOURCE_LINKS section                   │
│ Add:    https://wardepartmentpapers.org/                │
│ Time:   5 minutes                                        │
└─────────────────────────────────────────────────────────┘
```

---

## VERIFICATION CHECKLIST

### Before Implementation

- [ ] Test `https://founders.archives.gov/documents/Washington/05-05-02-0277`
- [ ] Test `https://founders.archives.gov/documents/Washington/05-05-02-0268`
- [ ] Test `https://founders.archives.gov/documents/Washington/05-06-02-0135`
- [ ] Test `https://founders.archives.gov/documents/Washington/05-06-02-0076`
- [ ] Verify Tennessee Encyclopedia articles contain claimed dates
- [ ] Confirm Knoxville Gazette date in encyclopedia
- [ ] Locate primary document for capital move

### After Implementation

- [ ] All Founders URLs return HTTP 200
- [ ] All Tennessee Encyclopedia links work
- [ ] DigiTreaties link still functions
- [ ] No internal link conflicts
- [ ] Timeline dates match quote dates

---

## QUICK REFERENCE - BY LINE NUMBER

| Line | Element                            | Source      | Status | Action        |
| ---- | ---------------------------------- | ----------- | ------ | ------------- |
| 34   | SOURCE_LINKS.foundersOnline        | Code        | ✅     | Keep          |
| 35   | SOURCE_LINKS.tennesseeEncyclopedia | Code        | ✅     | Keep          |
| 88   | brand.ts Williamson                | Founders    | ⚠️     | Add doc ID    |
| 94   | brand.ts Washington question       | Founders    | ⚠️     | Add doc ID    |
| 101  | brand.ts Treaty proclamation       | Founders    | ⚠️     | Add doc ID    |
| 295  | Glass Windows sourceUrl            | TE          | ⭐     | Supplement    |
| 337  | Washington question sourceUrl      | Founders    | ⚠️     | Verify ID     |
| 367  | Williamson sourceUrl               | Founders    | ⚠️     | Verify ID     |
| 393  | Treaty sourceUrl                   | Founders    | ❌     | GENERIC - Fix |
| 478  | Williamson timeline                | Founders    | ⚠️     | Verify ID     |
| 498  | Blount arrives timeline            | TE          | ⭐     | Supplement    |
| 503  | Blount writes timeline             | TE          | ⭐     | Supplement    |
| 508  | Treaty timeline                    | Digireaties | ✅     | Optional add  |
| 516  | Gazette timeline                   | TE          | ⚠️     | Verify        |
| 521  | Treaty proclaimed timeline         | Founders    | ✅     | Keep          |
| 531  | Capital moves timeline             | TE          | ⚠️     | Clarify date  |
| 536  | Statehood timeline                 | TE          | ✅     | Keep          |

---

**Matrix Generated:** January 30, 2026
**Status:** Ready for implementation
**Owner:** Cody Boring (Editorial Authority), Claude Code (Implementation)
