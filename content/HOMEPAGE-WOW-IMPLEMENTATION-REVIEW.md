# Homepage "Wow Factor" Implementation Review

**Date:** January 30, 2026
**Review Type:** Advisory Board Implementation Review
**Build Status:** Passed (133 pages generated)

---

## Implementation Summary

The implementation team added three changes to increase homepage "wow factor":

1. **Enhanced Document Teaser Section** (`/components/evidence/DocumentTeaser.tsx`)
   - Added Washington's question as header quote
   - Expanded from 2 to 3 document cards (added "Hanging Maw Speaks")
   - Added trust statement with source count
   - Updated CTA language

2. **Cherokee Acknowledgment** (`/app/(main)/home/page.tsx`)
   - Added Cherokee context to Original Seven Counties section

3. **Navigation Badge** (`/components/Navigation.tsx`)
   - Added "New" badge to Evidence Room nav item

---

## Advisory Board Votes

### 1. Dr. Margaret Chen (Strategic Advisor)

**VOTE: REQUEST MINOR CHANGES**

**Assessment:**

The implementation aligns well with the museum's mission of evidence-based storytelling and the beta philosophy of "show, don't overpromise." The three-document structure is balanced, and adding Cherokee perspective demonstrates commitment to inclusive history.

**Concerns:**

1. **CTA Language Mismatch:** "Be Among the First to Explore the Evidence Room" implies exclusivity/early access, but this is a public beta website. The Evidence Room is already live - visitors aren't "first" to anything.

2. **Badge Longevity:** The "New" badge on Evidence Room will need a sunset plan. When does it stop being new?

**Requested Changes:**

- Change CTA from "Be Among the First to Explore the Evidence Room" to "Explore the Evidence Room" - simpler, honest, effective
- Add comment in Navigation.tsx noting when to review/remove the "New" badge

---

### 2. James Torres (Risk Assessment)

**VOTE: REQUEST MAJOR CHANGES**

**Assessment:**

The implementation introduces a significant risk that must be addressed before shipping.

**Critical Issue - Fabricated Quote:**

The Hanging Maw quote in DocumentTeaser.tsx (lines 42-43):

```
"We want a definite boundary. We want to know where our lands are... so that we may know our own and hold it fast."
```

This quote **does not exist** in:

- `/content/people/hanging-maw.md`
- Any document in `/content/documents/`
- The Evidence Room sources
- Any verifiable primary source in the codebase

The entire premise of the Evidence Room is "Every claim on this website links to its primary source" (line 99). Placing an unverified quote in the same section that makes this claim is a fundamental credibility failure.

**Secondary Issues:**

1. **Link to Non-Existent Anchor:** The card links to `/evidence/people/hanging-maw` - the page exists, but the quote displayed won't appear there, confusing users.

2. **Date Fabrication:** The date "January 5, 1792" for the quote has no basis in the hanging-maw.md file or any source document.

**Required Changes:**

- **MUST** remove or replace the Hanging Maw quote with a verified quote from actual sources
- If keeping the card, use an actual documented statement or clearly label it as a summary/paraphrase, NOT a quote

---

### 3. Dr. Robert Whitehorse (Cherokee Relations Advisor)

**VOTE: REQUEST MAJOR CHANGES**

**Assessment:**

I appreciate the intent to include Cherokee voices prominently on the homepage. However, the execution is problematic.

**Critical Issues:**

1. **Fabricated Attribution:** Putting invented words in the mouth of a Cherokee leader is deeply problematic. Hanging Maw was a real person whose actual words are documented. Inventing dialogue for him, however well-intentioned, is a form of appropriation.

2. **The Quote Itself:** The fabricated quote captures modern Western concepts about land ownership ("know our own and hold it fast") that may not reflect Cherokee perspectives on land relationships. This risks imposing American property concepts onto Cherokee voices.

3. **Cherokee Context Statement:** The statement in the Original Seven section ("These lands were Cherokee territory...") is acceptable as written - it's factual and appropriately humble.

**What Works:**

- The verification status in `hanging-maw.md` is honest: "reconstructed from U.S. government records" with clear notes about whose perspective is represented
- The Cherokee acknowledgment statement is appropriately worded

**Required Changes:**

- Remove the fabricated quote entirely
- If a Cherokee voice must be featured, use John Watts' actual 1796 speech which IS in the Evidence Room and IS verified:
  > "I would insist on a formal boundary to be surveyed between the Cherokee Nation and the United States, following the line established with Governor Blount."
- OR use Hanging Maw's documented role description: "Principal Chief of the Overhill Cherokee, signatory to the Treaty of Holston"

---

### 4. Dr. Patricia Williams (Scholarly Standards)

**VOTE: REQUEST MAJOR CHANGES**

**Assessment:**

The trust statement claims are defensible - I count 41 documents in `/content/documents/`, supporting "40+ documents." However, the scholarly integrity is severely compromised by the unverified quote.

**Critical Issue:**

Lines 96-101 of DocumentTeaser.tsx:

```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10...">
  <span className="text-accent text-sm">✓</span>
  <p className="text-sm font-medium text-primary dark:text-white">
    Every claim on this website links to its primary source
  </p>
</div>
```

This statement is presented with a checkmark, implying verification. Immediately below it, we present a fabricated quote. This is self-refuting and damages institutional credibility.

**Technical Accuracy Check:**

| Claim                          | Status                                   |
| ------------------------------ | ---------------------------------------- |
| "40+ documents"                | VERIFIED (41 in /content/documents/)     |
| "National Archives"            | VERIFIED (Founders Online links present) |
| "Library of Congress"          | NOT DIRECTLY VERIFIED - review sources   |
| "Papers of the War Department" | VERIFIED (multiple references)           |
| Hanging Maw quote              | NOT VERIFIED - fabricated                |
| Washington question            | VERIFIED (Founders Online link exists)   |
| Blount letter                  | VERIFIED (documented)                    |

**Required Changes:**

1. Remove or replace fabricated Hanging Maw quote
2. Verify "Library of Congress" claim or remove from source list
3. If keeping Cherokee card, link to a verified document

---

### 5. Amanda Richardson (Communications Advisor)

**VOTE: APPROVE WITH CONDITIONS**

**Assessment:**

From a pure marketing standpoint, the three-card layout is visually stronger than two cards. The Cherokee voice adds depth and shows the site isn't one-dimensional. The trust statement is excellent conversion copy.

**What Works Brilliantly:**

- Washington's question as header is perfect - creates curiosity
- Trust statement with checkmark builds credibility
- "40+ documents" gives scale without being overwhelming
- Three voices (Governor, President, Cherokee leader) shows balanced perspective
- The "New" badge is subtle but effective

**Concerns:**

- The CTA "Be Among the First" is slightly off-brand - we're not selling early access
- If the quote issue is resolved, the third card adds significant value

**Conditions for Approval:**

- Resolve the quote attribution issue raised by other advisors
- Adjust CTA to match beta positioning

---

### 6. Michael Stevens (Technical Implementation)

**VOTE: APPROVE**

**Assessment:**

The implementation is clean, sustainable, and follows project conventions.

**Technical Review:**

**DocumentTeaser.tsx:**

- Clean data structure with `FeaturedDocument` interface
- Grid properly switches from `md:grid-cols-2` to `md:grid-cols-3`
- Responsive design maintains card consistency
- Links follow established patterns

**Navigation.tsx:**

- Badge pattern is reusable (interface properly extended)
- Badge styling is subtle and accessible
- Both desktop and mobile navigation updated consistently

**home/page.tsx:**

- Cherokee context added within proper semantic structure
- No accessibility issues introduced
- Proper border styling for visual hierarchy

**Code Quality:**

- No console.log statements
- Proper TypeScript interfaces
- Component structure follows existing patterns
- CSS classes follow Tailwind conventions

**No Technical Blockers.** Content issues are outside technical scope but I note the `linkHref: '/evidence/people/hanging-maw'` will work - the page exists and will render.

---

## Summary

### Votes Tally

| Advisor                            | Vote                    | Blocking? |
| ---------------------------------- | ----------------------- | --------- |
| Dr. Chen (Strategic)               | REQUEST MINOR CHANGES   | No        |
| James Torres (Risk)                | REQUEST MAJOR CHANGES   | **YES**   |
| Dr. Whitehorse (Cherokee)          | REQUEST MAJOR CHANGES   | **YES**   |
| Dr. Williams (Scholarly)           | REQUEST MAJOR CHANGES   | **YES**   |
| Amanda Richardson (Communications) | APPROVE WITH CONDITIONS | No        |
| Michael Stevens (Technical)        | APPROVE                 | No        |

**Approval Rate:** 33% (2/6 approve or approve-with-conditions)
**Blocking Issues:** 3 advisors request major changes

---

## What Works Well (Consensus Praise)

All advisors agree on these strengths:

1. **Washington's Question Header** - Creates curiosity and establishes documentary authority
2. **Three-Card Visual Balance** - Stronger than two-card layout
3. **Trust Statement Concept** - Builds credibility with visitors
4. **Cherokee Context Statement** - Appropriately worded, factual, humble
5. **"New" Badge Implementation** - Subtle, accessible, technically clean
6. **Technical Quality** - Code is well-structured and maintainable

---

## Requested Changes (Specific)

### BLOCKING - Must Fix Before Ship

**1. Fabricated Hanging Maw Quote**

**File:** `/components/evidence/DocumentTeaser.tsx`
**Lines:** 37-47 (entire third document object)

**Problem:** Quote is not verified in any source document.

**Solution Options:**

**Option A - Use Verified John Watts Quote:**

```typescript
{
  id: 'john-watts-boundary-1796',
  title: 'John Watts Demands Accountability',
  date: '1796-12-22',
  dateFormatted: 'December 22, 1796',
  excerpt:
    '"I would insist on a formal boundary to be surveyed between the Cherokee Nation and the United States, following the line established with Governor Blount."',
  author: 'John Watts (Kunoskeskie)',
  authorTitle: 'Cherokee Leader, Head of War Council',
  linkHref: '/evidence/documents/john-watts-boundary-speech-1796',
}
```

**Option B - Use Non-Quote Description:**

```typescript
{
  id: 'hanging-maw',
  title: 'The Cherokee Leaders',
  date: '1791-07-02',
  dateFormatted: 'July 2, 1791',
  excerpt:
    'Forty-two Cherokee leaders traveled to negotiate with Governor Blount. Their names are preserved in the Treaty of Holston.',
  author: 'Hanging Maw (Uskwa\'li-gu\'ta)',
  authorTitle: 'Principal Chief, Overhill Cherokee',
  linkHref: '/evidence/people/hanging-maw',
}
```

**Option C - Revert to Two Cards:**
Remove the third card entirely and keep the proven two-card layout.

**Recommendation:** Option A is strongest - uses verified Cherokee voice with direct link to existing Evidence Room document.

### NON-BLOCKING - Should Fix

**2. CTA Language**

**File:** `/components/evidence/DocumentTeaser.tsx`
**Line:** 195

**Current:**

```tsx
Be Among the First to Explore the Evidence Room
```

**Change to:**

```tsx
Explore the Evidence Room
```

**3. Badge Sunset Comment**

**File:** `/components/Navigation.tsx`
**Line:** 43

**Add comment:**

```tsx
badge: 'New', // TODO: Review badge removal by March 2026
```

### VERIFY - Should Confirm

**4. Library of Congress Claim**

**File:** `/components/evidence/DocumentTeaser.tsx`
**Lines:** 103-105

The source list claims "Library of Congress" as a source. This should be verified or the text should be:

```
40+ documents from the National Archives and Papers of the War Department
```

---

## Overall Verdict

**SHIP STATUS: NOT READY**

The fabricated quote is a blocking issue that contradicts the core value proposition of the Evidence Room. The irony of claiming "Every claim links to its primary source" while displaying a fabricated quote is too damaging to institutional credibility.

**Path to Ship:**

1. Fix the Hanging Maw quote (use Option A - John Watts verified quote)
2. Update CTA language
3. Re-run build verification
4. Ship

**Estimated Fix Time:** 30 minutes

---

## Next Steps

1. **Immediate:** Choose and implement quote fix option
2. **Before ship:** Update CTA language
3. **Post-ship:** Schedule badge removal review for March 2026
4. **Future:** Consider adding more verified Cherokee documents to Evidence Room to strengthen authentic indigenous voice

---

_Review conducted by Tennessee Starts Here Advisory Board_
_Document prepared: January 30, 2026_
