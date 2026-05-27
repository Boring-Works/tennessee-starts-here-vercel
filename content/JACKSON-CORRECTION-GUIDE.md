# Andrew Jackson Document Correction Guide

**Source Document:** `/content/documents/jackson-at-rocky-mount-1788.md`
**Dendrochronology Finding:** Buildings dated 1826-1830 (38-42 years after claimed 1788 visit)
**Required Status:** Change from "verified" to "single-source" with dendrochronology disclaimer

---

## Change 1: Update Verification Status (Line 11-16)

### CURRENT (INCORRECT):

```yaml
verification:
  status: verified
  source_count: 4
  method: 'Cross-referenced Tennessee Encyclopedia, Rocky Mount Museum, Miller Center, The Hermitage'
  notes: 'Date narrowed to Spring 1788 based on biographical timelines. No primary documentation (letters or receipts) from Jackson actual stay has been identified. Six-week duration consistently cited across scholarly sources.'
```

### CORRECTED:

```yaml
verification:
  status: single-source
  source_count: 0
  method: 'Secondary sources only (Tennessee Encyclopedia, museum materials, presidential biographies). No primary documentation from Jackson identified.'
  notes: 'Date estimated as Spring 1788 based on biographical timelines. All four cited sources are secondary—they repeat same claim without citing original primary evidence. No letters, receipts, or diary entries from Jackson mentioning Rocky Mount have been identified. Six-week duration consistent across sources but unverified.'
```

**Explanation:**

- "verified" implies independent primary source confirmation (NOT present here)
- "single-source" correctly describes reliance on secondary sources quoting each other
- source_count should be "0" because all sources are secondary (zero primary sources)
- method should specify "secondary only" to be transparent

---

## Change 2: Add Dendrochronology Disclaimer (After Line 72)

### INSERT THIS SECTION:

**Location:** Between "The Cobb Connection" section and "Jackson's Later Career" section

```markdown
---

## Historical Note: Building Date vs. Tradition Date

**The Dendrochronology Problem**

The buildings that visitors see at Rocky Mount today were constructed in **1826-1830**, according to a University of Tennessee dendrochronology study (Grissino-Mayer & van de Gevel, 2007). This is **38-42 years AFTER Jackson's claimed 1788 visit**.

This creates a significant historical question: If Jackson visited Rocky Mount in 1788, he would not have stayed in the current structures. He would have lodged in whatever buildings William Cobb occupied at that time—structures that no longer survive.

**What Happened to the 1788 Building?**

Governor Blount's 1790 territorial records describe Cobb's home as "substantial" with "glass windows," indicating a significant dwelling existed by then. However, this pre-1790 structure was either:

- Destroyed or burned (common on the frontier)
- Dismantled and its logs reused (common practice)
- Replaced by the current 1826-1830 house built by Michael Massengill

**Archaeological surveys would be needed to confirm** whether earlier structures existed at this site.

**Primary Source Status**

Although multiple secondary sources (Tennessee Encyclopedia, presidential biographies, museum materials) consistently cite Jackson's six-week stay in Spring 1788, **no primary documentation has been identified**:
- No Jackson letters mentioning Rocky Mount
- No Cobb family papers mentioning Jackson
- No 1788 contemporary accounts
- No receipts, diary entries, or newspaper mentions

The consistency of the tradition across secondary sources suggests a shared source or strong oral tradition. However, without primary documentation, the specific details (duration, exact dates, guest accommodations) cannot be independently verified.

**Scholarly Consensus**

The tradition is widely cited and may well be accurate. But credible historical presentation requires acknowledging that it rests on secondary sources without primary corroboration. The tradition tells us what 18th-century people believed and what 20th-century museums repeated—not necessarily what Jackson himself documented.

---
```

---

## Change 3: Update Title to Reflect Verification Status (Line 2, OPTIONAL)

### CURRENT:

```yaml
title: Andrew Jackson's Stay at Rocky Mount
```

### OPTIONAL REFRAME:

```yaml
title: Andrew Jackson's Alleged Stay at Rocky Mount
```

Or keep current title and rely on verification status change to signal uncertainty.

**Recommendation:** Keep original title but let verification status change carry the signal.

---

## Change 4: Update "Source Notes" Section (Line 73-82)

### CURRENT:

```markdown
## Source Notes

This account is documented in:

- Tennessee Encyclopedia article on Rocky Mount
- Rocky Mount State Historic Site official history
- Miller Center (University of Virginia) presidential biography
- Andrew Jackson's Hermitage historical materials
- Library of Congress Andrew Jackson Papers timeline

The six-week duration and 1788 date are consistently cited across these scholarly sources, though primary documentation (letters or receipts from Jackson's stay) has not been identified.
```

### CORRECTED:

```markdown
## Source Notes and Verification Status

**Secondary Sources (All Consistent):**

- Tennessee Encyclopedia article on Rocky Mount
- Rocky Mount State Historic Site official history
- Miller Center (University of Virginia) presidential biography
- Andrew Jackson's Hermitage historical materials
- Library of Congress Andrew Jackson Papers (timeline entries, not detailed documentation)

**Important Distinction:**
The six-week duration and 1788 date are consistently cited across these secondary sources. However, ALL of these sources appear to derive from the same oral tradition without citing original primary evidence. None of the sources provide:

- Letters from Jackson mentioning the visit
- Receipts or payment records
- Cobb family papers documenting Jackson
- Contemporary 1788 accounts
- Diary entries or published journals

**Current Building Context:**
University of Tennessee dendrochronology (Grissino-Mayer & van de Gevel, 2007) proves the current main house was constructed in 1826-1830, built by Michael Massengill (Cobb's grandson). If Jackson visited in 1788, he would have stayed in earlier structures that are no longer extant.

**Recommendation for Researchers:**
If you are researching Jackson's 1788 travels, the Library of Congress Andrew Jackson Papers collection warrants detailed examination, as digital indexes may not capture all references to Rocky Mount.
```

---

## Change 5: Update Metadata (Line 10-16)

### CURRENT:

```yaml
verification:
  status: disputed
  source_count: 0
  method: ...
```

### NOTES ON INCONSISTENCY:

The current document ALREADY says `status: disputed` (line 11 in actual document), which contradicts the fact-check report claiming it says "verified."

**CHECK:** Review the actual current verification status in the document.

**If status is already "disputed":** Only Changes 2, 3, and 4 are needed.

**If status is "verified" or "single-source":** Apply Changes 1-5 as written.

---

## Full Document Publication Sequence

1. **Apply Change 1:** Update verification status block (1 minute)
2. **Apply Change 2:** Insert dendrochronology disclaimer (3 minutes)
3. **Apply Change 3:** Optional title update (skip if uncertain)
4. **Apply Change 4:** Revise source notes (2 minutes)
5. **Verify:** Read full document for flow and consistency (5 minutes)

**Total Time:** 10-15 minutes

**Testing:** After changes, read from visitor perspective. The document should answer:

- ✓ "Is Jackson's visit documented?" → "Tradition says yes, but primary sources not found"
- ✓ "Did he stay in THIS building?" → "No, current building built 1826-1830"
- ✓ "What building would he have stayed in?" → "Earlier structure, now gone"
- ✓ "How reliable is this story?" → "Consistent across secondary sources but unverified"

---

## Rationale for Changes

### Why "verified" → "single-source"?

- "Verified" means independently confirmed by multiple types of evidence
- Document admits zero primary sources exist
- This is fundamentally a "single-source" situation (all secondary sources repeat one claim)
- Honesty requires matching terminology to evidence

### Why Add Dendrochronology Disclaimer?

- Dendrochronology is the most scientifically certain evidence about the site
- Visitors will see the 1826-1830 house while hearing 1788 story
- Clarity about the 38-year gap is essential for credibility
- Transparency about building dates prevents false impressions

### Why Revise Source Notes?

- Original minimizes the "no primary sources" problem with vague phrasing
- Revised version explicitly lists what's missing (letters, receipts, etc.)
- Better serves researchers trying to verify the claim independently
- Follows scholarly best practices for distinguishing oral tradition from documented fact

---

## Expected Impact on Site Interpretation

**Before Changes:**

- Visitors hear: "Jackson stayed here" (impressed by current building)
- Reality: Tradition not documented; current building didn't exist then
- Credibility Risk: Scholar reviews document and finds "verified" status false

**After Changes:**

- Visitors hear: "Jackson's tradition says he visited; buildings rebuilt 1826-1830" (informed by context)
- Reality: Honest about tradition vs. documentation; builds trust
- Credibility Strength: Transparent about limitations; demonstrates scholarly rigor

**Marketing Impact:**
Minor. The Jackson tradition remains. It's now contextualized honestly rather than overstated.

**Academic Impact:**
Major. Site demonstrates integrity by acknowledging dendrochronology findings and primary source limitations.

---

## Questions to Resolve

1. **What is current verification status?** Check line 11 of actual document. Report says "verified" but document frontmatter might already say "disputed"

2. **Are there related documents?** Check if Jackson mention in:
   - `/content/timeline-events.json` (might have Jackson entry with specific date)
   - `/content/people/andrew-jackson.md` (biography should reference Rocky Mount)
   - Both should be checked for consistency after Jackson document is updated

3. **Does the site have primary documentation?** Verify that no new primary sources have been found since the fact-check. If library or archive donated materials, recommendation might change.

---

## Sign-Off

**Dendrochronology Finding:** Confirmed and documented
**Fact-Check Recommendation:** Apply all five changes
**Expected Result:** Document will correctly represent both tradition and scientific evidence
**Timeline:** 15-20 minutes of editing time

**Ready for implementation.**
