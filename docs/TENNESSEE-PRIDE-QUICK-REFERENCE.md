# Tennessee Pride Messaging: Quick Reference

**Status:** 22 Opportunities Identified | 3 Implementation Phases

---

## At-A-Glance Summary

| Category               | Current Gap                | Tennessee Pride Fix                                                 | Priority | File                                    |
| ---------------------- | -------------------------- | ------------------------------------------------------------------- | -------- | --------------------------------------- |
| **Hero Text**          | Generic "Evidence Room"    | "Tennessee's Complete Founding Story"                               | HIGH     | `evidence/page.tsx`                     |
| **Early CTA**          | Vague mission              | "Complete story, verified. All voices documented."                  | HIGH     | `evidence/page.tsx`                     |
| **Cherokee Signers**   | List of 5 featured leaders | "First in TN: All 42 documented"                                    | HIGH     | `evidence/page.tsx` + `people/page.tsx` |
| **Collections Header** | Standard description       | "No gaps. No hidden sources. Full transparency."                    | MEDIUM   | `collections/page.tsx`                  |
| **Document Library**   | Neutral tone               | "Setting Tennessee standard for historical rigor"                   | HIGH     | `library/page.tsx`                      |
| **Timeline**           | Chronological only         | "Every date verified by primary source"                             | MEDIUM   | `timeline/page.tsx`                     |
| **Source Links**       | Generic repo list          | "First in Tennessee to link all signatories to original manuscript" | MEDIUM   | `evidence/page.tsx`                     |
| **Methodology**        | Absent                     | NEW: Transparency-focused section                                   | HIGH     | New component                           |
| **Achievements**       | Not visible                | NEW: 37 docs, 42 signers, 100% searchable                           | MEDIUM   | New component                           |
| **Why It Matters**     | Missing context            | NEW: Cherokee negotiation frame                                     | HIGH     | New component                           |

---

## The Core Message

**OLD:** "We have primary documents from Tennessee's founding."

**NEW:** "We're the first Tennessee historic site to document our founding story completely—all 42 Cherokee signatories, verified by source, no gaps. This is Tennessee Pride: a founding story richer than we previously told."

---

## Key Phrases (Use Everywhere)

✅ **"Thanks to newly digitized archives, we can now..."**
✅ **"First in Tennessee to..."**
✅ **"Every claim verified by primary source"**
✅ **"All 42 Cherokee signatories documented"**
✅ **"The complete story"**
✅ **"Setting the Tennessee standard"**
✅ **"Transparent, passage-level citations"**
✅ **"Both perspectives shaped Tennessee"**

---

## What NOT to Say

❌ "Correcting previous bias"
❌ "Finally including Cherokee voices"
❌ "Social justice" framing
❌ "We regret..." language
❌ "Previously overlooked"
❌ "Missing from history" (implies gap, not discovery)

---

## Quick Implementation Checklist

### Phase 1: Copy Only (2-3 hours)

- [ ] Hero subtitle: Change to "Tennessee's Complete Founding Story"
- [ ] Early CTA: Add "Thanks to newly digitized archives..." framing
- [ ] Collections header: Add "No gaps. No hidden sources."
- [ ] Document library: Add "Setting Tennessee standard..."
- [ ] People page: Change to "First in Tennessee: All 42 Cherokee Signatories"

### Phase 2: New Components (8-12 hours)

- [ ] Methodology section: "Why Transparency Matters"
- [ ] "Why This Matters" panel on Cherokee signers
- [ ] Collections intro: Discovery framing
- [ ] Achievements grid: 37 docs, 42 signers, 100% searchable
- [ ] "Why Tennessee" section: negotiation frame

### Phase 3: Polish (12-15 hours)

- [ ] Scholarly badges on key sections
- [ ] Verification badges on individual documents
- [ ] Achievement callouts on collection cards
- [ ] Enhanced source repository descriptions

---

## Visitor Message Flow

```
LANDING
  ↓
"The Evidence Room: Tennessee's Complete Founding Story"
  ↓
"Thanks to newly digitized archives, we can now..."
  ↓
"First in Tennessee to document all 42 Cherokee signatories"
  ↓
"Why This Matters: Worthy adversaries + negotiation = pride"
  ↓
"Every document verified. Full transparency. See sources."
  ↓
"Explore: Documents | Collections | Timeline | People"
```

---

## Competitive Positioning

**What makes Rocky Mount different from other TN historic sites:**

1. **First-in-State Achievement** — All 42 Cherokee signatories named (not just principal chiefs)
2. **Transparent Methodology** — Passage-level citations, full transcriptions, no hidden sources
3. **Discovery Framing** — "Thanks to newly digitized archives" (not "we now recognize")
4. **Both Perspectives** — Treaty signers documented alongside settler correspondence
5. **Scholarly Standard** — Verified against originals, cited properly, searchable

---

## Message Testing Questions

Test these messages with visitor groups:

**For Cherokee visitors:**

- Does "worthy adversaries" language feel authentic?
- Does partnership framing feel performative or genuine?

**For local TN visitors:**

- Do you understand why all 42 names matter?
- Does "complete story" make you want to explore longer?

**For academics:**

- Are citations sufficient for your research?
- Would you use this as a scholarly source?

**For tourists:**

- Does "first in Tennessee" resonate?
- Do you trust this archive's quality?

---

## File-by-File Changes

| File                   | Opportunities                | Effort  | Impact             |
| ---------------------- | ---------------------------- | ------- | ------------------ |
| `evidence/page.tsx`    | 1, 2, 4, 5, 6, 7, 13, 14, 18 | 4 hours | HIGH (hero page)   |
| `collections/page.tsx` | 9, 10, 19                    | 2 hours | MEDIUM             |
| `library/page.tsx`     | 11                           | 1 hour  | HIGH (conversion)  |
| `people/page.tsx`      | 12                           | 1 hour  | HIGH (achievement) |
| `timeline/page.tsx`    | 8, 17                        | 1 hour  | MEDIUM             |
| New components         | 15, 20, 21, 22               | 6 hours | HIGH (brand)       |

---

## Success Metrics

- **Scroll depth** to "Why This Matters" sections
- **Time spent** on archive pages (target: +30%)
- **Return visits** to collections
- **Survey:** "What makes this archive different?" (measure "first in Tennessee" message)
- **Booking rate** from Evidence page to Visit page (+15% target)

---

## Timeline

| Week | Phase        | Tasks                         | Deliverable            |
| ---- | ------------ | ----------------------------- | ---------------------- |
| 1    | Quick Wins   | Copy updates (5 files)        | Messaging live         |
| 2    | Feedback     | Visitor testing               | Message adjustments    |
| 3-4  | Phase 2      | New components + enhancements | Brand refresh complete |
| 5+   | Optimization | A/B testing, polish           | Final tuning           |

---

## Document References

- **Full details:** `/docs/EVIDENCE-TENNESSEE-PRIDE.md` (22 opportunities with examples)
- **Brand standards:** `/lib/copy/brand.ts` (use HOOKS and STOP_START)
- **Methodology guidance:** `/docs/EVIDENCE-ARCHIVE-REVIEW.md` (implementation guardrails)

---

**Created:** January 29, 2026
**Version:** 1.0
**Status:** Ready for Immediate Implementation
