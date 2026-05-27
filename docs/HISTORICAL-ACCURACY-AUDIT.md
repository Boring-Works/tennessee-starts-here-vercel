# Historical Accuracy Audit

**Prepared by:** Dr. Patricia "Trish" Morrison, PhD (simulated historical review)
**Date:** January 30, 2026
**Purpose:** Verify all historical claims in Tennessee Starts Here marketing materials against primary source evidence and dendrochronological findings

---

## EXECUTIVE SUMMARY

The audit identifies **three foundational pillars** for Rocky Mount's historical significance, with varying levels of documentary support:

| Pillar | Claim                         | Status     | Evidence Level                            |
| ------ | ----------------------------- | ---------- | ----------------------------------------- |
| 1      | Territorial Capital 1790-1792 | VERIFIED   | Primary sources                           |
| 2      | Current house built 1826-1830 | VERIFIED   | Scientific proof (dendrochronology)       |
| 3      | Jackson stayed here 1788      | UNVERIFIED | Oral tradition only; zero primary sources |

**Critical Finding:** The Jackson 1788 claim is currently marked as "verified" in `/content/documents/jackson-at-rocky-mount-1788.md` with `status: verified` and `source_count: 4`. This is **INCORRECT**. All cited sources are secondary sources (Tennessee Encyclopedia, museum materials) that repeat the tradition without primary documentation.

---

## VERIFIED FACTS (Use These Freely)

These claims are supported by primary source documentation and can be stated as historical fact:

### Territorial Capital Period (1790-1792)

- **Governor William Blount arrived October 10-11, 1790**
  - Source: Blount's own letter, October 20, 1790 (Keith, ed., John Gray Blount Papers, Vol. II, pp. 127-128)
  - Citation: "On the 11th instant, I arrived in this country"

- **Rocky Mount was the first seat of Constitutional governance west of the Appalachians**
  - Source: Washington's nomination, Knox's recommendation, Blount's official correspondence
  - Founders Online verified documents

- **"Glass Windows" description is authentic**
  - Source: Primary letter from Blount, October 20, 1790
  - Quote: "I am very well accommodated with a Room with Glass Windows, Fire Place &c &c at this place"

- **Treaty of Holston signed July 2, 1791**
  - Source: Original treaty document, National Archives
  - 42 Cherokee chiefs signed

- **Washington's question "Where ought the Governor to reside?"**
  - Source: Washington to Knox, August 13, 1790
  - Founders Online verified

- **Blount was one of 39 Constitution signers**
  - Source: Constitutional Convention records
  - Verifiable fact

- **Capital moved to Knoxville February 1, 1792**
  - Source: Multiple correspondence references

### Cherokee Involvement

- **42 Cherokee chiefs signed Treaty of Holston**
  - Source: Treaty document at National Archives and digitreaties.org
  - Named signatories verified

---

## DISPUTED FACTS (Use With Explicit Caveats)

These claims have documentation issues and require qualification:

### Andrew Jackson at Rocky Mount, 1788

**Claim:** "Andrew Jackson lodged at Rocky Mount for six weeks in Spring 1788"

**Current Status:** UNVERIFIED TRADITION

**Evidence Assessment:**

| Evidence Type     | Status       | Details                                                                                          |
| ----------------- | ------------ | ------------------------------------------------------------------------------------------------ |
| Primary Sources   | ZERO         | No Jackson letters, Cobb family receipts, diary entries, or contemporary accounts                |
| Secondary Sources | 4            | Tennessee Encyclopedia, Rocky Mount Museum, Miller Center, The Hermitage - all repeat same claim |
| Physical Evidence | CONTRADICTED | Buildings built 1826-1830, 38 years AFTER claimed visit                                          |
| Geographic Logic  | QUESTIONABLE | Rocky Mount is 30 miles past Jonesborough where Jackson's business was                           |
| Competing Claims  | STRONGER     | Christopher Taylor house in Jonesborough has better documented evidence                          |

**Documented Timeline for Jackson in 1788:**

- September 1787: Admitted to NC bar in Salisbury
- August 1788: DOCUMENTED in Jonesborough for duel challenge to Col. Avery
- October 1788: DOCUMENTED arriving in Nashville as district attorney
- Spring 1788: Gap in documentation - Rocky Mount claim falls here with NO verification

**Recommended Qualification:**

> "According to local tradition, Andrew Jackson may have lodged at William Cobb's property in Spring 1788. This claim is documented in secondary sources including the Tennessee Encyclopedia, but no primary documentation (letters, receipts, or contemporary accounts) has been identified to verify it."

---

## DISPROVEN CLAIMS (NEVER Use)

These claims have been disproven by scientific evidence:

### "Jackson stayed in these buildings"

**Status:** PHYSICALLY IMPOSSIBLE

**Evidence:**

- University of Tennessee dendrochronology study (Grissino-Mayer & van de Gevel, 2007)
- Tree-ring dating proves current structures built 1826-1830
- Michael Massengill (Cobb's grandson) built current house
- 38-42 year gap between Jackson's claimed 1788 visit and building construction

**Impact:** If Jackson visited Rocky Mount in 1788, he stayed in an earlier structure that NO LONGER EXISTS. Visitors currently seeing the Cobb House cannot be seeing "where Jackson stayed."

### "Buildings from the 1770s" or "1780s"

**Status:** DISPROVEN

**Evidence:** Same dendrochronology study proves construction 1826-1830

### "The buildings are 235-256 years old"

**Status:** INCORRECT

**Reality:** Buildings are approximately 196-200 years old (2026 - 1826/1830)

---

## CURRENT HOMEPAGE REVIEW

**File:** `/app/(main)/home/page.tsx`

### Claims Made on Homepage

| Claim                                                                                              | Location                           | Status   | Notes                     |
| -------------------------------------------------------------------------------------------------- | ---------------------------------- | -------- | ------------------------- |
| "First Seat of Constitutional Governance West of the Appalachians"                                 | Hero section, eyebrow              | VERIFIED | Accurate claim            |
| "In 1790, this ground became the first seat of Constitutional governance west of the Appalachians" | Hero subhead via MYSTERY_NARRATIVE | VERIFIED | Accurate claim            |
| "Tennessee turns 230. America turns 250."                                                          | Commemorative section              | VERIFIED | Accurate (statehood 1796) |
| "From 1790 to 1792, Governor William Blount administered seven counties from this ground"          | Original Seven section             | VERIFIED | Accurate claim            |
| "Capital of the Southwest Territory 1790-1792"                                                     | Footer note                        | VERIFIED | Accurate claim            |
| William Blount quote "glass windows"                                                               | Commemorative section              | VERIFIED | Primary source quote      |
| "Constitution Signer / First Governor of the Southwest Territory"                                  | Quote attribution                  | VERIFIED | Both accurate             |

### Good News: Homepage is Currently Accurate

The homepage makes NO unverified Jackson claims. It focuses on the VERIFIED territorial capital period (1790-1792) and does not claim Jackson stayed in the buildings.

---

## MARKETING COPY REVIEW

**File:** `/lib/copy/brand.ts` and `/lib/copy/narratives.ts`

### Problematic Claims in Brand Copy

#### 1. HOOKS.fameBridge (line 116)

```typescript
fameBridge: 'Governor Blount governed here. Andrew Jackson lodged here. The State started here.',
```

**PROBLEM:** "Andrew Jackson lodged here" stated as fact. This is UNVERIFIED.

**RECOMMENDED FIX:**

```typescript
fameBridge: 'Governor Blount governed here. The State started here.',
```

OR with caveat:

```typescript
fameBridge: 'Governor Blount governed here. Tradition says Andrew Jackson lodged here in 1788. The State started here.',
```

#### 2. HISTORICAL_FIGURES.andrewJackson (narratives.ts lines 94-100)

```typescript
andrewJackson: {
  name: 'Andrew Jackson',
  title: 'Future 7th President',
  years: '1788',
  hook: 'Lodged at Rocky Mount for six weeks while awaiting his law license. He was 21 years old.',
  highlight: 'Future President',
},
```

**PROBLEM:** Stated as fact with no qualification about evidence status.

**RECOMMENDED FIX:**

```typescript
andrewJackson: {
  name: 'Andrew Jackson',
  title: 'Future 7th President',
  years: '1788 (tradition)',
  hook: 'According to tradition, lodged at Rocky Mount for six weeks while awaiting his law license. This claim lacks primary documentation.',
  highlight: 'Future President',
},
```

#### 3. STAFF_SCRIPTS.fameBridge (narratives.ts line 127)

```typescript
fameBridge: {
  context: 'Fame Bridge (Tours)',
  script: 'Governor Blount governed here. Andrew Jackson lodged here. The State started here.',
},
```

**PROBLEM:** Same issue - Jackson claim stated as fact.

**RECOMMENDED FIX:**

```typescript
fameBridge: {
  context: 'Fame Bridge (Tours)',
  script: 'Governor Blount governed here. Tradition says Andrew Jackson passed through in 1788. The State started here.',
},
```

---

## EVIDENCE ROOM DOCUMENT REVIEW

**File:** `/content/documents/jackson-at-rocky-mount-1788.md`

### Critical Error in Document Metadata

```yaml
verification:
  status: verified # <-- INCORRECT
  source_count: 4 # <-- MISLEADING (all 4 are secondary sources)
```

**PROBLEM:** Document claims "verified" status with 4 sources, but ALL sources are secondary:

1. Tennessee Encyclopedia
2. Rocky Mount Museum materials
3. Miller Center (University of Virginia)
4. The Hermitage

**None of these are primary sources from 1788.** They all repeat the same tradition.

**RECOMMENDED FIX:**

```yaml
verification:
  status: disputed
  source_count: 0
  secondary_sources: 4
  method: 'Cross-referenced Tennessee Encyclopedia, Rocky Mount Museum, Miller Center, The Hermitage - all secondary sources that repeat tradition. No primary documentation (letters, receipts, diary entries) identified. Dendrochronology analysis proves current structures built 1826-1830, forty years after Jackson's claimed 1788 visit.'
  notes: 'Claim is based entirely on oral tradition repeated in secondary sources. Physical impossibility of Jackson staying in current structures due to 38-year gap between claimed visit (1788) and building construction (1826-1830). Christopher Taylor house in Jonesborough has stronger documented evidence for Jackson's 1788 lodging.'
```

---

## CONFLICTS REQUIRING CODY'S DECISION

### Decision 1: How to Present Jackson 1788 Claim

**Options:**

| Option | Approach                      | Pros                           | Cons                                        |
| ------ | ----------------------------- | ------------------------------ | ------------------------------------------- |
| A      | Remove entirely               | Maximum accuracy               | Loses marketing hook; disappointing to some |
| B      | Qualify as tradition          | Honest while preserving story  | Requires more words/explanation             |
| C      | Present competing claims      | Educational; shows methodology | More complex for casual visitors            |
| D      | Focus on place, not buildings | Sidesteps issue elegantly      | May seem evasive                            |

**Recommendation:** Use Option B for marketing, Option A for Evidence Room. Staff should be trained on honest talking points.

### Decision 2: Fame Bridge Hook in Marketing

**Current:** "Governor Blount governed here. Andrew Jackson lodged here. The State started here."

**Issue:** Jackson claim presented as verified fact alongside verified Blount claims.

**Options:**

1. Remove Jackson mention entirely
2. Add caveat: "Tradition says Jackson lodged here"
3. Modify to: "Governor Blount governed here. Jackson's generation transformed this frontier. The State started here."

### Decision 3: Evidence Room Document Status

**Current:** `status: verified` with `source_count: 4`

**Issue:** This is factually incorrect. Zero primary sources exist.

**Required Fix:** Change to `status: disputed` and add dendrochronology notes.

### Decision 4: Building Date Transparency

**Issue:** Marketing copy says "The buildings evolved. The ground endures." but doesn't specify 1826-1830 construction.

**Options:**

1. Add explicit building dates to visitor materials
2. Staff scripts already include building age FAQ - ensure it's used
3. Add date range to signage on-site

---

## TIMELINE DATE DISCREPANCIES

Per TIMELINE-AUDIT-REPORT.md, there are 4 date errors in timeline-events.json:

| Event                   | Timeline Date | Document Date | Fix Needed      |
| ----------------------- | ------------- | ------------- | --------------- |
| knox-recommends-holston | 1790-08-18    | 1790-08-17    | Change to 08-17 |
| blount-to-knox-dec      | 1790-12-14    | 1790-12-15    | Change to 12-15 |
| blount-to-knox-jan      | 1791-01-12    | 1791-01-08    | Change to 01-08 |
| blount-to-knox-sep      | 1791-09-10    | 1791-09-12    | Change to 09-12 |

**Status:** These are minor discrepancies (1-4 days) that should be corrected for accuracy.

---

## PRIORITY ACTION ITEMS

### IMMEDIATE (Before Any Public Use)

1. **CRITICAL:** Fix jackson-at-rocky-mount-1788.md metadata
   - Change `status: verified` to `status: disputed`
   - Change `source_count: 4` to `source_count: 0` (primary sources)
   - Add `secondary_sources: 4` field
   - Add dendrochronology findings to method/notes

2. **HIGH:** Review and update HOOKS.fameBridge
   - Remove or qualify Jackson claim

3. **HIGH:** Update HISTORICAL_FIGURES.andrewJackson
   - Add "(tradition)" to years field
   - Rewrite hook to acknowledge lack of documentation

### SHORT-TERM (This Week)

4. **MEDIUM:** Create Christopher Taylor house document
   - Competing claim for Jackson's 1788 lodging
   - Evidence Room needs this for balanced presentation

5. **MEDIUM:** Correct 4 timeline date errors

6. **MEDIUM:** Train staff on honest Jackson talking points
   - Use materials from JACKSON-CLAIM-PRESENTATION-OPTIONS.md

### ONGOING

7. **LOW:** Research primary sources
   - Search Jackson Papers at Library of Congress
   - Examine Jonesborough court records
   - Document origins of Rocky Mount tradition

---

## CITATION STANDARDS

For all historical claims, apply this framework:

| Evidence Level   | Label to Use      | Example                                                         |
| ---------------- | ----------------- | --------------------------------------------------------------- |
| Primary Source   | "documented"      | "Blount documented his arrival on October 20, 1790"             |
| Multiple Primary | "verified"        | "The Treaty of Holston is verified by multiple primary sources" |
| Secondary Only   | "tradition holds" | "Tradition holds that Jackson lodged here in 1788"              |
| Disputed         | "claimed"         | "It is claimed that Jackson stayed for six weeks"               |
| Disproven        | DO NOT USE        | Never claim Jackson stayed in current buildings                 |

---

## CONCLUSION

Rocky Mount's core historical significance - as the first seat of Constitutional governance west of the Appalachians - is **fully verified** by primary sources. This is the site's strongest claim and should remain the marketing focus.

The Jackson 1788 tradition is an interesting historical footnote but is currently **overstated** in the Evidence Room document and marketing copy. The claim lacks any primary documentation and is physically contradicted by dendrochronology evidence proving the current buildings were constructed 38-42 years after Jackson's supposed visit.

**Recommended positioning:** Lead with verified territorial capital significance. Acknowledge Jackson tradition with appropriate caveats. Be transparent about building dates.

**Bottom line:** A site honest about what it doesn't know earns more credibility for what it does know.

---

## APPENDIX: Files Reviewed

| File                                                             | Type           | Issues Found                                     |
| ---------------------------------------------------------------- | -------------- | ------------------------------------------------ |
| /app/(main)/home/page.tsx                                        | Homepage       | None - currently accurate                        |
| /lib/copy/brand.ts                                               | Marketing copy | HOOKS.fameBridge needs fix                       |
| /lib/copy/narratives.ts                                          | Narratives     | HISTORICAL_FIGURES.andrewJackson needs fix       |
| /content/documents/jackson-at-rocky-mount-1788.md                | Evidence Room  | status: verified is INCORRECT                    |
| /content/timeline-events.json                                    | Timeline       | 4 minor date discrepancies                       |
| /docs/\_archive/JACKSON-1788-EXECUTIVE-SUMMARY.md                | Analysis       | Reference document - correctly identifies issues |
| /docs/\_archive/DENDROCHRONOLOGY-FACT-CHECK-EXECUTIVE-SUMMARY.md | Analysis       | Reference document - proves building dates       |
| /docs/\_archive/TIMELINE-AUDIT-REPORT.md                         | Analysis       | Reference document - identifies date errors      |

---

**Audit Status:** COMPLETE
**Next Step:** Present to Cody for decision on Jackson claim presentation
**Prepared for:** Rocky Mount State Historic Site / America 250 Initiative

---

_Historical integrity is not about what we want to be true. It is about what the evidence supports._
