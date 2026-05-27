# Triple-Check Verification Protocol

**Purpose:** Three-layer fact-checking before any content gets "verified" status

**Created:** January 30, 2026
**Status:** Active verification standard
**Authority:** Required for all historical content at Rocky Mount State Historic Site

---

## Overview

Every historical claim published by Rocky Mount must pass **three independent verification layers** before receiving "verified" status:

1. **Layer 1: Source Authenticity** - Is this document what it claims to be?
2. **Layer 2: Content Accuracy** - Does this document say what we think it says?
3. **Layer 3: Corroboration** - Can we confirm this with independent sources?

**Critical Rule:** Each layer must be performed by a **different person** to prevent confirmation bias.

---

## VERIFICATION LAYER 1: Source Authenticity

**Question:** Is this document what it claims to be?

### Checklist

- [ ] Archive identifier confirmed (catalog number exists in archive system)
- [ ] Document date plausible (handwriting, paper, ink consistent with claimed era)
- [ ] Author identification verified (signature matches known examples OR provenance is clear)
- [ ] Provenance documented (clear chain of custody from creation to archive)
- [ ] Cross-referenced with known document catalogs (Founders Online, LOC catalog, etc.)
- [ ] No red flags for forgery or misattribution

### Who Performs This Layer

**Archivist or Document Specialist**

- Must have experience with 18th/19th century documents
- Familiarity with paleography (historical handwriting)
- Access to comparative materials

### Evidence Required

1. **Archive catalog entry**

   ```
   Example: Library of Congress, George Washington Papers, Series 4,
   General Correspondence, 1790, Image 123
   ```

2. **Comparison with authenticated documents**
   - Handwriting samples from same author
   - Paper/ink analysis (if available)
   - Consistent with known document production methods of the era

3. **Provenance documentation**
   ```
   Example: Original held by Washington family → donated to LOC in 1834
   → cataloged as Series 4 → digitized 2010
   ```

### Red Flags (DO NOT PROCEED)

- **Suspicious convenience:** Document appears exactly when needed to prove a claim
- **Anachronistic language:** Phrases that didn't exist in the claimed time period
- **Unable to locate:** Archive has no record of catalog number provided
- **Provenance gaps:** Document history has unexplained jumps (e.g., "found in attic")
- **Too good to be true:** Resolves major historical debate too neatly

### Outcome

**PASS:** Document appears authentic → Proceed to Layer 2
**FAIL:** Questionable authenticity → Mark as "authenticity disputed" and DO NOT add to collection

### Documentation

Record in `/Historical/processed/verification-log.md`:

```markdown
### Layer 1: Source Authenticity - [Document ID]

**Reviewer:** [Name]
**Date:** 2026-01-30
**Archive:** Library of Congress
**Catalog ID:** Series 4, General Correspondence, 1790, Image 123
**Provenance:** Verified through LOC finding aid
**Handwriting:** Consistent with known Washington exemplars
**Result:** PASS - Proceed to Layer 2
```

---

## VERIFICATION LAYER 2: Content Accuracy

**Question:** Does this document say what we think it says?

### Checklist

- [ ] Transcription matches original scan/physical document (100% accuracy for quoted passages)
- [ ] OCR errors corrected (if using digitized text)
- [ ] Abbreviations expanded correctly (e.g., "ye" = "the", not "ye")
- [ ] Date interpretation correct (Julian vs. Gregorian calendar? Old Style vs. New Style?)
- [ ] Names spelled/identified correctly (cross-check with biographical references)
- [ ] Context understood (what event is this document referencing?)
- [ ] No modern interpretation inserted into historical text

### Who Performs This Layer

**Content Specialist or Historian** (DIFFERENT person than Layer 1)

- Expertise in 18th/19th century American history
- Familiarity with period language conventions
- Attention to detail

### Process

1. **Obtain original document**
   - High-resolution scan (TIFF preferred, PDF acceptable)
   - OR physical access to archive

2. **Line-by-line comparison**
   - Compare transcription to original
   - Mark every discrepancy, no matter how small
   - Verify every abbreviation expansion

3. **Research unfamiliar terms**
   - Period dictionaries for obsolete words
   - Historical glossaries
   - Contextual usage in other documents

4. **Verify date interpretation**
   - Check if Old Style (pre-1752) vs. New Style calendar
   - Confirm month/day/year order (varied by region)
   - Cross-check with known chronologies

5. **Verify name spellings**
   - Compare to other documents from same period
   - Check biographical dictionaries
   - Note if spelling varies (common in 18th century)

### Common Transcription Errors to Catch

| Original   | Often Misread As  | Correct Interpretation            |
| ---------- | ----------------- | --------------------------------- |
| þ (thorn)  | y or p            | "th" sound                        |
| ſ (long s) | f                 | "s" sound (except at end of word) |
| ye         | ye (as in "yell") | "the" (thorn + e)                 |
| wch        | wch               | "which" (abbreviation)            |
| Govr       | Govr              | "Governor" (abbreviation)         |
| VIII       | 8                 | 8 (Roman numeral)                 |
| xii        | 12                | 12 (Roman numeral)                |

### Date Interpretation Challenges

**Old Style vs. New Style Calendar:**

- England/colonies used Old Style (Julian) until September 1752
- New Style (Gregorian) adopted: September 2, 1752 → September 14, 1752 (11 days skipped)
- Year began March 25 (Old Style) vs. January 1 (New Style)

**Example of confusion:**

```
Document dated: "February 20, 1790"
Old Style interpretation: Would be in year 1791 (year starts March 25)
New Style interpretation: Would be in year 1790 (year starts January 1)

Resolution: By 1790, New Style was standard → February 20, 1790 is correct
```

### Outcome

**PASS:** Transcription accurate, context understood → Proceed to Layer 3
**FAIL:** Errors found → Correct all errors, re-verify, THEN proceed to Layer 3

### Documentation

Record in `/Historical/processed/verification-log.md`:

```markdown
### Layer 2: Content Accuracy - [Document ID]

**Reviewer:** [Name]
**Date:** 2026-01-30
**Transcription source:** OCR from LOC digitized image
**Corrections made:**

- Line 12: "ſaid" corrected to "said" (long s)
- Line 23: "wch" expanded to "which"
- Line 45: "Govr" expanded to "Governor"
  **Date verified:** February 20, 1790 (New Style - correct as written)
  **Names verified:** William Blount (spelling consistent across documents)
  **Context:** Letter regarding territorial appointments
  **Result:** PASS - Proceed to Layer 3
```

---

## VERIFICATION LAYER 3: Corroboration

**Question:** Can we confirm this document's claims with independent sources?

### Checklist

- [ ] Cross-referenced events with other contemporary documents
- [ ] Verified dates against known chronologies
- [ ] Checked people mentioned against biographical records
- [ ] Confirmed place names against period maps
- [ ] Searched for contradictions with established facts
- [ ] Counted independent sources that corroborate key claims
- [ ] Evaluated source quality (primary vs. secondary, contemporary vs. later)

### Who Performs This Layer

**Senior Historian or Director** (DIFFERENT person than Layers 1 & 2)

- Final authority on verification status
- Deep knowledge of frontier/early national history
- Access to multiple reference sources

### Source Counting Rules

#### COUNTS as Independent Source:

✅ **Different archive** holding related document

```
Example: LOC has Washington letter + Tennessee State Archives has Blount response
```

✅ **Different author** describing same event

```
Example: Blount's letter about treaty + Cherokee leader's speech about treaty
```

✅ **Different document type** for same event

```
Example: Personal letter + newspaper article + government record
```

✅ **Scholarly monograph** citing PRIMARY sources

```
Example: Academic book that cites original documents (if we can verify those sources exist)
```

#### DOES NOT COUNT as Independent:

❌ **Same document in two archives**

```
Example: LOC digitized copy + Founders Online digitized copy of SAME letter
```

❌ **Later reprinting** of same source

```
Example: 1791 treaty text + 1823 reprinting of same treaty
```

❌ **Secondary source citing THE DOCUMENT BEING VERIFIED**

```
Example: Modern book citing Blount's letter CANNOT verify Blount's letter
```

❌ **Museum website citing this document**

```
Example: Another historic site's page referencing Rocky Mount's claims
```

❌ **Circular citations**

```
Example: Source A cites Source B, Source B cites Source A (both citing each other)
```

### Corroboration Levels & Verification Status

| Independent Sources     | Verification Status | Confidence Level | Publication Guidelines                          |
| ----------------------- | ------------------- | ---------------- | ----------------------------------------------- |
| **0 sources**           | `unverified`        | No confidence    | Do NOT publish claims as fact                   |
| **1 source**            | `single-source`     | Moderate         | Publish with caveat: "According to [source]..." |
| **2 sources**           | `verified`          | High             | Can publish as established fact                 |
| **3+ sources**          | `verified`          | Very high        | Highest confidence claims                       |
| **Conflicting sources** | `disputed`          | N/A              | Publish ALL perspectives with evidence          |

### Special Case: Unique Documents

**If document is THE original source** (e.g., actual signed treaty, only known letter):

- Document counts as its own source
- Still search for contemporary references (newspaper reports, responses, etc.)
- If NO corroboration found → Mark as `single-source`
- Explain in metadata: "This is the only known contemporary account"

**Example:**

```
Treaty of Holston (original signed document) = 1 source
+ Newspaper report of signing = +1 source
+ Blount's letter to Washington mentioning treaty = +1 source
= 3 sources → "verified"
```

### Corroboration Research Process

1. **Search contemporary documents**
   - Letters, diaries, government records from same time period
   - Newspapers within 1 year of event
   - Other participants' accounts

2. **Check standard reference works**
   - Founders Online (for Washington/Jefferson/Adams correspondence)
   - American State Papers
   - Territorial Papers of the United States
   - Dictionary of American Biography

3. **Verify against established chronologies**
   - Known dates of major events
   - Travel times between locations (could person X be in place Y on date Z?)
   - Weather records (if relevant)

4. **Look for contradictions**
   - Do any sources disagree with this claim?
   - Are there anachronisms? (Event described before it happened?)
   - Geographic impossibilities? (Two places at once?)

5. **Evaluate source quality**
   ```
   PRIMARY > SECONDARY
   CONTEMPORARY > LATER
   EYEWITNESS > HEARSAY
   MULTIPLE EYEWITNESSES > SINGLE EYEWITNESS
   ```

### Red Flags Requiring Extra Scrutiny

- **Only one person ever mentions this event** (especially if major event)
- **Source is written decades after the event** (memory issues)
- **Source has obvious bias** (financial interest, political motive)
- **Story gets more elaborate over time** (legendary accretion)
- **No contemporary mention** (if event was significant, why no contemporary record?)

### Disputed Documents: How to Handle

When sources **contradict each other**:

1. **Mark as `disputed`**
2. **Document ALL perspectives**
3. **Evaluate evidence quality**
4. **Present strongest evidence first, but include contradictions**

**Example Template:**

```yaml
verification:
  status: disputed
  source_count: 3
  primary_sources:
    - 'Source A claims X (dated 1790, eyewitness)'
    - 'Source B claims Y (dated 1792, secondhand)'
    - 'Source C claims X (dated 1791, newspaper report)'
  analysis: 'Two sources support X, one supports Y. Source A (eyewitness)
    and Source C (contemporary news) likely more reliable than
    Source B (later, secondhand). Recommend presenting X as
    probable, acknowledging Y as alternative claim.'
```

### Outcome

**Assign final verification status:**

- `verified` (2+ independent sources, no contradictions)
- `single-source` (1 credible source, no contradictions)
- `disputed` (conflicting evidence exists)
- `reconstructed` (assembled from fragments, gaps acknowledged)
- `unverified` (0 sources found, or sources unreliable)
- `oral-tradition` (consistent tradition, but no primary source documentation)

### Documentation

Record in `/Historical/processed/verification-log.md`:

```markdown
### Layer 3: Corroboration - [Document ID]

**Reviewer:** [Name]
**Date:** 2026-01-30

**Sources Found:**

1. William Blount to Henry Knox, October 20, 1790 (LOC)
2. Knoxville Gazette, October 30, 1790 (UT Special Collections)
3. Territorial Papers of the United States, Vol. 4, p. 123

**Source Count:** 3 independent sources
**Contradictions:** None found
**Quality Assessment:** All primary/contemporary sources

**Verification Status Assigned:** VERIFIED
**Confidence Level:** Very High

**Result:** APPROVED FOR PUBLICATION
```

---

## FINAL APPROVAL GATE

### Director Review Required For:

The following changes require **Director's personal approval** before publication:

1. ✋ Changing any document from `unverified` to `verified`
2. ✋ Marking any document as `disputed`
3. ✋ Publishing any document with `source_count: 0`
4. ✋ Any Cherokee-related content (cultural sensitivity)
5. ✋ Any content contradicting established site narratives
6. ✋ Any content with potential public controversy (e.g., Jackson claim)

### Director Review Checklist

- [ ] Read all three verification reports (Layers 1, 2, 3)
- [ ] Personally examine original scan or high-quality reproduction
- [ ] Evaluate historical significance (is this important enough to add?)
- [ ] Consider visitor/educational impact (how will this be used?)
- [ ] Check for sensitive content (cultural, political, reputational issues)
- [ ] Verify citations are accessible (can others check our sources?)
- [ ] Confirm metadata is complete (provenance, dates, context)

**Decision:**

- [ ] ✅ APPROVED FOR PUBLICATION - Assign verification status
- [ ] ⏸️ NEEDS REVISION - Return to appropriate layer with notes
- [ ] ❌ REJECTED - Do not add to collection (document reasons)

### Final Sign-Off

```markdown
### Director Approval - [Document ID]

**Director:** [Name]
**Date:** 2026-01-30
**Decision:** APPROVED FOR PUBLICATION
**Verification Status:** verified
**Notes:** Excellent corroboration from 3 independent contemporary sources.
Recommend featuring in educational materials.
**Signature:** [Digital signature or initials]
```

---

## Workflow Summary

```
NEW DOCUMENT ACQUIRED
         ↓
[Layer 1: Source Authenticity]
    Archivist/Document Specialist
    → PASS: Continue
    → FAIL: Reject
         ↓
[Layer 2: Content Accuracy]
    Content Specialist/Historian
    (Different person than Layer 1)
    → PASS: Continue
    → FAIL: Correct errors, re-verify, continue
         ↓
[Layer 3: Corroboration]
    Senior Historian/Director
    (Different person than Layers 1 & 2)
    → Assign verification status
         ↓
[Director Final Approval]
    (Required for certain categories)
    → APPROVED: Publish
    → NEEDS REVISION: Return to appropriate layer
    → REJECTED: Do not add
         ↓
PUBLISHED IN EVIDENCE ROOM
```

---

## Time Estimates

| Layer                        | Estimated Time | Can Expedite?                                   |
| ---------------------------- | -------------- | ----------------------------------------------- |
| Layer 1: Source Authenticity | 1-3 hours      | Yes, for urgent documents with clear provenance |
| Layer 2: Content Accuracy    | 2-4 hours      | No - accuracy cannot be rushed                  |
| Layer 3: Corroboration       | 4-8 hours      | Partially - depends on source availability      |
| Director Review              | 30-60 min      | Yes, for simple approvals                       |
| **TOTAL**                    | **8-16 hours** | **For complex documents: 20+ hours**            |

**Batch processing:** More efficient to verify multiple related documents together (e.g., all Blount letters from 1790).

---

## Quality Assurance

### Quarterly Audit

Every 3 months, **randomly select 10% of verified documents** for re-verification:

- Did we follow the triple-check protocol?
- Are verification logs complete?
- Has new evidence emerged that changes status?
- Are citations still accessible?

### Annual Review

Once per year, **full review of all "disputed" documents**:

- Has new evidence emerged?
- Should status change?
- Are both perspectives still fairly represented?

### Continuous Improvement

Track common errors in verification logs:

- Which types of errors occur most frequently?
- Which layer catches most problems?
- How can we improve training?

---

## Training Requirements

### To Perform Layer 1 (Source Authenticity):

- Archival training OR 2+ years experience with historical documents
- Familiarity with major archives (LOC, National Archives, state archives)
- Basic paleography skills

### To Perform Layer 2 (Content Accuracy):

- Graduate degree in history OR equivalent experience
- Expertise in 18th/19th century American history
- Proficiency with period language conventions

### To Perform Layer 3 (Corroboration):

- Senior historian qualification
- 5+ years experience in early American/frontier history
- Access to research libraries and databases

### Director Authority:

- Final approval on all verification status assignments
- Can override verification decisions with documented reasoning
- Responsible for public-facing accuracy

---

## Appendix: Verification Status Definitions

### verified

**Definition:** Confirmed by 2+ independent sources with no contradictions
**Source count:** 2 or more
**Use case:** Can be cited as established fact

### single-source

**Definition:** One credible source confirms, no contradictions found
**Source count:** 1
**Use case:** Cite with caveat acknowledging single-source nature

### disputed

**Definition:** Conflicting evidence exists from multiple sources
**Source count:** Varies (usually 2+)
**Use case:** Present all perspectives, explain evidence quality

### reconstructed

**Definition:** Assembled from fragments, gaps explicitly acknowledged
**Source count:** Varies
**Use case:** Useful for context, but note limitations

### unverified

**Definition:** No sources found, or sources are unreliable
**Source count:** 0 (or sources deemed not credible)
**Use case:** Do NOT publish as fact; may note as "claimed but unverified"

### oral-tradition

**Definition:** Consistent local/family tradition, but no primary source documentation
**Source count:** 0 primary sources (multiple secondary sources repeating tradition)
**Use case:** Present as tradition, not established fact; explain lack of primary sources

---

**Protocol Status:** Active standard
**Last Updated:** January 30, 2026
**Next Review:** July 2026
**Authority:** Director, Rocky Mount State Historic Site
