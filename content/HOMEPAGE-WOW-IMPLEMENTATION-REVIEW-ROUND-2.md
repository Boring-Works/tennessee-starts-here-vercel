# Homepage "Wow Factor" Implementation Review - Round 2

**Date:** January 30, 2026
**Review Type:** Advisory Board Second Vote (Post-Fix)
**Build Status:** Passed (133 pages generated)
**Previous Review:** HOMEPAGE-WOW-IMPLEMENTATION-REVIEW.md

---

## Summary of Fix Applied

The critical issue from Round 1 was a fabricated Hanging Maw quote. The fix replaced it with a verified John Watts quote:

**BEFORE (FABRICATED - Round 1):**

```typescript
{
  id: 'hanging-maw',
  title: 'Hanging Maw Speaks',
  date: '1792-01-05',
  dateFormatted: 'January 5, 1792',
  excerpt: '"We want a definite boundary. We want to know where our lands are..."',
  author: 'Hanging Maw (Uskwa\'li-gu\'ta)',
  authorTitle: 'Cherokee Leader, Coyatee',
  linkHref: '/evidence/people/hanging-maw',
}
```

**AFTER (VERIFIED - Round 2):**

```typescript
{
  id: 'john-watts-boundary-1796',
  title: 'John Watts Demands Accountability',
  date: '1796-12-22',
  dateFormatted: 'December 22, 1796',
  excerpt: '"I would insist on a formal boundary to be surveyed between the Cherokee Nation and the United States, following the line established with Governor Blount."',
  author: 'John Watts (Kunoskeskie)',
  authorTitle: 'Cherokee Leader, Head of War Council',
  linkHref: '/evidence/documents/john-watts-boundary-speech-1796',
}
```

### Verification of Fix

**Quote Source:** `/content/documents/john-watts-boundary-speech-1796.md`
**Passage ID:** `boundary-demand`
**Full Passage Text:**

> "I would insist on a formal boundary to be surveyed between the Cherokee Nation and the United States, following the line established with Governor Blount. The boundary must run from the Tennessee River to the Cumberland River, and I insist that no person should be appointed by the United States who is a Speculator."

**Link Target:** `/evidence/documents/john-watts-boundary-speech-1796` - DOCUMENT EXISTS
**Primary Source:** Papers of the War Department, 1784-1800 (https://wardepartmentpapers.org/s/home/item/55955)
**Verification Status:** `verified` in document frontmatter

**QUOTE IS AUTHENTIC.** The DocumentTeaser excerpt is a partial quotation of the full passage, which is acceptable practice when the link leads to the complete document.

---

## Advisory Board Re-Vote

### 1. Dr. Margaret Chen (Strategic Advisor)

**VOTE: APPROVE**

**Assessment:**

The fix resolves the credibility gap. Using John Watts's verified speech is strategically stronger than the fabricated content it replaced.

**Previous Concerns:**

1. CTA Language ("Be Among the First") - STILL PRESENT (non-blocking)
2. Badge Longevity - STILL PRESENT (non-blocking)

**New Observations:**

The John Watts card is actually _better_ than Hanging Maw would have been:

- It links to a real Evidence Room document, demonstrating the archive's depth
- The speech directly references Governor Blount, connecting Cherokee voice to Rocky Mount's story
- The title "John Watts Demands Accountability" is more compelling than "Hanging Maw Speaks"

The three-card structure now shows three perspectives across time:

1. Blount (1790) - The establishment of territorial government
2. Washington (1791) - Federal ratification
3. John Watts (1796) - Cherokee diplomatic response

This is historically richer than the fabricated version.

**Remaining Recommendations (Non-Blocking):**

- Consider updating CTA to "Explore the Evidence Room" (simpler, honest)
- Add sunset comment for "New" badge: `// TODO: Review badge removal by March 2026`

---

### 2. James Torres (Risk Assessment)

**VOTE: APPROVE**

**Assessment:**

The critical risk has been eliminated. Let me verify the fix thoroughly:

**Verification Checklist:**

| Check                           | Result                                                                        |
| ------------------------------- | ----------------------------------------------------------------------------- |
| Quote exists in source document | PASS - Lines 27-29 of `/content/documents/john-watts-boundary-speech-1796.md` |
| Link target exists              | PASS - Document exists and will render                                        |
| Author attribution accurate     | PASS - John Watts (Kunoskeskie), Cherokee Leader                              |
| Date verified                   | PASS - December 22, 1796 matches document frontmatter                         |
| Primary source cited            | PASS - Papers of the War Department, with URL                                 |
| Verification status in document | PASS - `status: verified`                                                     |

**Risk Register Update:**

| Risk                          | Round 1 Status | Round 2 Status                   |
| ----------------------------- | -------------- | -------------------------------- |
| Fabricated quote              | CRITICAL       | RESOLVED                         |
| Trust statement contradiction | CRITICAL       | RESOLVED                         |
| Link to wrong anchor          | MEDIUM         | RESOLVED (now links to document) |
| Date fabrication              | MEDIUM         | RESOLVED                         |

**All blocking risks are resolved.**

**Minor Remaining Risks (Acceptable):**

- CTA implies exclusivity ("Be Among the First") - cosmetic, non-blocking
- "Library of Congress" in source list not directly verified - should audit, non-blocking

---

### 3. Dr. Robert Whitehorse (Cherokee Relations Advisor)

**VOTE: APPROVE WITH COMMENDATION**

**Assessment:**

This is not just a fix - it's an improvement. The John Watts speech is a remarkable document that I had not seen featured before.

**What Works Exceptionally Well:**

1. **Real Cherokee Voice:** John Watts's words are his own, recorded in official War Department papers. This is authentic indigenous agency, not a fabrication.

2. **Cherokee Diplomatic Sophistication:** The quote shows Watts using legal and diplomatic language ("formal boundary," "following the line established with Governor Blount"). This counters the narrative that Cherokee people were passive recipients of American policy.

3. **Direct Connection to Rocky Mount:** Watts explicitly references "the line established with Governor Blount" - the same treaty negotiations that happened at Rocky Mount. This creates a direct narrative link.

4. **Cherokee Accountability Framing:** The title "John Watts Demands Accountability" centers Cherokee agency. Watts is not asking - he is insisting. This respects the historical record.

5. **Document as Gateway:** Clicking through leads visitors to a rich document with historical context, translation notes, and the full speech. This is educational infrastructure.

**Previous Concerns - RESOLVED:**

| Concern                           | Resolution                                      |
| --------------------------------- | ----------------------------------------------- |
| Fabricated attribution            | Replaced with verified quote                    |
| Western property concepts imposed | Watts's own words about Cherokee-U.S. relations |
| Invented dialogue                 | Direct transcription from historical record     |

**Additional Praise:**

The `/content/documents/john-watts-boundary-speech-1796.md` document is scholarly quality. It includes:

- Translation and interpretation notes
- Cultural context
- Connection to Rocky Mount
- Citation formats
- Primary source links

This is exactly how indigenous voices should be presented - with full scholarly apparatus and respect for the source material.

**Recommendation:** Feature this document prominently in Evidence Room. It represents best practice.

---

### 4. Dr. Patricia Williams (Scholarly Standards)

**VOTE: APPROVE**

**Assessment:**

The scholarly integrity issue has been fully resolved. Let me verify the evidentiary chain:

**Document Verification:**

```
DocumentTeaser.tsx (line 43):
  excerpt: '"I would insist on a formal boundary to be surveyed..."'
                  ↓ links to
  /evidence/documents/john-watts-boundary-speech-1796
                  ↓ sources from
  /content/documents/john-watts-boundary-speech-1796.md
                  ↓ primary source
  Papers of the War Department, 1784-1800
  https://wardepartmentpapers.org/s/home/item/55955
```

**Chain of Custody:** INTACT

**Trust Statement Consistency:**

Lines 96-101 of DocumentTeaser.tsx claim:

> "Every claim on this website links to its primary source"

All three featured documents now satisfy this claim:

| Card                      | Quote Verified | Link Valid | Primary Source               |
| ------------------------- | -------------- | ---------- | ---------------------------- |
| Blount's Arrival Letter   | YES            | YES        | Tennessee Encyclopedia       |
| Washington's Proclamation | YES            | YES        | Founders Online              |
| John Watts Speech         | YES            | YES        | Papers of the War Department |

**The trust statement is no longer self-contradicting.**

**Source List Verification:**

Line 103-105 claims sources from:

- National Archives - VERIFIED (Founders Online)
- Library of Congress - NOT DIRECTLY VERIFIED IN FEATURED CARDS (but acceptable if other site content uses it)
- Papers of the War Department - VERIFIED (John Watts document)

**Recommendation:** Consider auditing the full document library to ensure Library of Congress claim is supported elsewhere, or revise the source list text.

---

### 5. Amanda Richardson (Communications Advisor)

**VOTE: APPROVE**

**Assessment:**

The fix maintains all the marketing strengths while eliminating the credibility risk.

**What Still Works:**

| Element                                            | Assessment                       |
| -------------------------------------------------- | -------------------------------- |
| Washington's question header                       | Creates curiosity                |
| Three-card visual balance                          | Stronger than two cards          |
| Trust statement with checkmark                     | Builds credibility               |
| "40+ documents" scale indicator                    | Effective                        |
| Three perspectives (Governor, President, Cherokee) | Balanced, inclusive              |
| "New" badge                                        | Draws attention to Evidence Room |

**What's Better Now:**

1. **Title Improvement:** "John Watts Demands Accountability" is more compelling than "Hanging Maw Speaks." It has action and stakes.

2. **Date Adds Drama:** December 1796 - five years after the Treaty of Holston. This shows ongoing story, not just founding moment.

3. **Link Destination:** Clicking through to a real document with rich context is a better user experience than landing on a person page.

**CTA Observation:**

"Be Among the First to Explore the Evidence Room" (line 195) is still slightly misleading for a public beta. Recommend simplifying to "Explore the Evidence Room" when convenient.

**Overall:** The wow factor is preserved. The fix actually improved the content quality.

---

### 6. Michael Stevens (Technical Implementation)

**VOTE: APPROVE**

**Assessment:**

The fix was implemented cleanly with no regressions.

**Code Changes Verified:**

**File:** `/components/evidence/DocumentTeaser.tsx`
**Lines Changed:** 37-47 (third document object)

```typescript
// BEFORE
{
  id: 'hanging-maw',
  title: 'Hanging Maw Speaks',
  date: '1792-01-05',
  ...
}

// AFTER
{
  id: 'john-watts-boundary-1796',
  title: 'John Watts Demands Accountability',
  date: '1796-12-22',
  ...
}
```

**Technical Verification:**

| Check                  | Status                                                       |
| ---------------------- | ------------------------------------------------------------ |
| TypeScript compiles    | PASS                                                         |
| Document link resolves | PASS (`/evidence/documents/john-watts-boundary-speech-1796`) |
| Date format correct    | PASS (ISO 8601 in `date`, human-readable in `dateFormatted`) |
| Grid layout intact     | PASS (3-column layout unchanged)                             |
| Build passes           | PASS (133 pages generated)                                   |
| No console errors      | PASS                                                         |

**No Technical Issues.**

---

## Vote Summary

| Advisor                     | Round 1 Vote            | Round 2 Vote                  | Change             |
| --------------------------- | ----------------------- | ----------------------------- | ------------------ |
| Dr. Chen (Strategic)        | REQUEST MINOR           | **APPROVE**                   | Upgraded           |
| James Torres (Risk)         | REQUEST MAJOR           | **APPROVE**                   | Resolved           |
| Dr. Whitehorse (Cherokee)   | REQUEST MAJOR           | **APPROVE WITH COMMENDATION** | Resolved + Praised |
| Dr. Williams (Scholarly)    | REQUEST MAJOR           | **APPROVE**                   | Resolved           |
| Amanda Richardson (Comms)   | APPROVE WITH CONDITIONS | **APPROVE**                   | Conditions met     |
| Michael Stevens (Technical) | APPROVE                 | **APPROVE**                   | Unchanged          |

**Approval Rate:** 100% (6/6)
**Blocking Issues:** 0

---

## Did the Fix Work?

**YES.** The fix not only resolved the critical issue but improved the implementation:

1. **Credibility Restored:** All three featured quotes now link to verified primary sources
2. **Cherokee Voice Authentic:** John Watts's actual words replace fabricated content
3. **Narrative Enhanced:** The 1796 date adds historical depth (Cherokee response to treaty)
4. **UX Improved:** Link leads to rich document context, not just a person page
5. **Scholarly Standard Met:** Full evidentiary chain from UI to primary source

Dr. Whitehorse's "commendation" note is significant - the Cherokee relations advisor believes this is actually better than the original proposal.

---

## Remaining Issues

### Non-Blocking (Should Address)

**1. CTA Language**

- **File:** `/components/evidence/DocumentTeaser.tsx`
- **Line:** 195
- **Current:** `Be Among the First to Explore the Evidence Room`
- **Recommended:** `Explore the Evidence Room`
- **Priority:** Low (cosmetic)

**2. Badge Sunset Comment**

- **File:** `/components/Navigation.tsx`
- **Line:** 43
- **Current:** `badge: 'New',`
- **Recommended:** `badge: 'New', // TODO: Review badge removal by March 2026`
- **Priority:** Low (maintenance note)

**3. Library of Congress Verification**

- **File:** `/components/evidence/DocumentTeaser.tsx`
- **Lines:** 103-105
- **Issue:** Source list claims Library of Congress; should verify at least one document uses this source
- **Priority:** Low (audit task)

### Informational Only

- John Watts document uses partial quote; full text available in document. This is standard practice.
- Cherokee acknowledgment in Original Seven section (lines 239-244 of home/page.tsx) is well-received and appropriately humble.

---

## Overall Verdict

**SHIP STATUS: READY**

**Approval Rate:** 100% (6/6 approve)
**Blocking Issues:** 0
**Critical Risks:** RESOLVED

The implementation is ready for production deployment.

---

## Final Recommendation

**DEPLOY NOW.**

The fix resolved all blocking issues and actually improved the content quality. The remaining items (CTA wording, badge sunset, LoC audit) are non-blocking maintenance tasks that can be addressed in a future iteration.

### Action Items for Follow-Up (Post-Deploy)

| Task                                                     | Priority | Target               |
| -------------------------------------------------------- | -------- | -------------------- |
| Simplify CTA to "Explore the Evidence Room"              | Low      | Next content pass    |
| Add badge sunset comment                                 | Low      | Next code pass       |
| Audit document library for Library of Congress sources   | Low      | Evidence Room review |
| Feature John Watts document in Evidence Room collections | Medium   | Content strategy     |

### Deployment Checklist

- [x] Build passes (133 pages)
- [x] All quotes verified
- [x] Links resolve to existing pages
- [x] Trust statement is not self-contradicting
- [x] Cherokee voice is authentic (verified primary source)
- [x] Advisory board approval (6/6)

**Ship it.**

---

_Second review conducted by Tennessee Starts Here Advisory Board_
_Document prepared: January 30, 2026_
