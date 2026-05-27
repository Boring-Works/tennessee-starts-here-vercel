# Communications Advisory Review: Evidence Room Beta Launch

**Advisor:** Amanda Richardson, Communications & PR Consultant
**Date:** January 30, 2026
**Review Type:** Soft Launch Readiness Assessment
**Verdict:** **REQUEST CHANGES** (See Priority Fixes Below)

---

## EXECUTIVE SUMMARY

I've reviewed the Evidence Room beta implementation from the perspective of a skeptical journalist or academic discovering this site via Google search. The team has done solid work—the site is **professionally presented** with good content quality. However, there are **critical messaging concerns** that must be addressed before public discovery.

### The Good News

- SEO metadata is complete and compelling
- Document quality is professional with proper citations
- Cherokee content is appropriately contextualized
- "Missing Voices" acknowledgment shows intellectual honesty
- No embarrassing technical errors
- Citation boxes encourage academic sharing

### The Bad News

**The Jackson claim is a landmine.** The site's metadata and tour script references contradict the team's careful verification work in the Jackson document itself. This creates a "gotcha" moment waiting to happen.

### My Recommendation

**Fix the Jackson messaging inconsistencies (2-3 hours work), then soft launch immediately.** The Evidence Room is otherwise ready for organic discovery. Do not announce, but don't delay—the foundation is solid.

---

## FIRST IMPRESSION ASSESSMENT

### What Visitors See in Search Results

**Google Search for "Rocky Mount Tennessee history":**

```
Tennessee Starts Here | Rocky Mount State Historic Site
Where Tennessee's government began. Stand where Governor Blount
governed and Andrew Jackson lodged. Join us for America 250...
```

**Analysis:**

- Clean, professional result
- "Where Tennessee's government began" → **SAFE CLAIM** (well-documented)
- "Andrew Jackson lodged" → **RISKY PHRASING** (see concerns below)

**Evidence Room Search Result:**

```
The Evidence Room | Tennessee Starts Here
Primary source documents from Rocky Mount's history. Verified
quotes from Founders Online, Tennessee Encyclopedia, and the
National Archives.
```

**Analysis:**

- Excellent positioning as scholarly resource
- "Verified quotes" → Strong credibility signal
- "Primary source documents" → Sets accurate expectations

### Landing Experience

**Strengths:**

- Elegant, period-appropriate design
- Clear navigation to document collections
- Citation boxes on every document (excellent for academics)
- "Bias Disclosure" section shows intellectual maturity
- Sources clearly attributed with links to archives

**First Impression Grade: A-**
(Would be A+ if Jackson messaging were fixed)

---

## EMBARRASSMENT SCAN

I reviewed documents, metadata, and site content looking for errors that would embarrass Rocky Mount. Here's what I found:

### CRITICAL ISSUE: Jackson Claim Inconsistency

**The Problem:**

The site sends **contradictory signals** about the Jackson claim:

**Website Claims (Present Tense, Confident):**

- Homepage metadata: "Stand where Governor Blount governed **and Andrew Jackson lodged**"
- Visit page metadata: "Stand where Governor Blount governed **and Andrew Jackson lodged**"
- Multiple references treat Jackson's stay as verified fact

**Document Reality (Appropriately Cautious):**

- Jackson document verification: `status: verified` but...
- Verification notes: "**No primary documentation (letters or receipts) from Jackson actual stay has been identified**"
- Source notes: "though **primary documentation has not been identified**"

**Why This Is Dangerous:**

A journalist or academic will:

1. See confident claim on homepage
2. Click through to Jackson document
3. Read "no primary documentation identified"
4. Write story: "Rocky Mount Claims Jackson Stay Without Primary Sources"

**The Contradiction:**

- You're marketing a claim you can't prove with primary sources
- In your own Evidence Room, you admit you can't prove it
- This looks deceptive, even though the Jackson document itself is honest

### How This Plays Out

**Scenario 1: Academic Review**

Professor searching for primary sources on Jackson's early career finds Evidence Room. Sees confident claim. Reads Jackson document. Finds admission: "no primary documentation identified."

**Result:** Questions credibility of **all** claims. Doesn't cite Evidence Room in research.

**Scenario 2: Journalist Fact-Check**

Regional journalist preparing America 250 story. Googles Rocky Mount. Sees "Andrew Jackson lodged." Checks Evidence Room. Finds "no primary documentation."

**Result:** Story becomes "Small Museum Makes Unverified Claims" instead of "Local Site Preserves Founding History."

**Scenario 3: Cherokee Nation Scrutiny**

Cherokee Nation staff reviewing Evidence Room for potential concerns. Sees Jackson claim marketed confidently despite lack of primary sources. Notes contrast with how Cherokee history is hedged with disclaimers.

**Result:** Questions whether site privileges Anglo narratives over Cherokee accuracy.

### Other Issues Found

**Minor (Not Embarrassing, But Worth Noting):**

1. **Missing `description` field** on Jackson document (metadata audit flagged this)
   - Required for SEO but currently absent from frontmatter
   - Easy fix: Add 97-187 character description

2. **Missing `source_url` fields** on 14 documents
   - Metadata standard requires this field (can be empty if no URL available)
   - Won't embarrass you, but reduces scholarly utility

3. **Two descriptions slightly short** (84 and 92 chars vs 97 minimum)
   - Knoxville Gazette documents
   - Won't be noticed by visitors, flagged by validation script

**None of these are embarrassing.** They're housekeeping issues that reduce polish but won't damage reputation.

---

## SEO READINESS

### Metadata Quality: EXCELLENT

I reviewed all page metadata and found professional, compelling SEO work:

**Evidence Room Page:**

```yaml
title: "The Evidence Room"
description: "Primary source documents from Rocky Mount's history.
Verified quotes from Founders Online, Tennessee Encyclopedia,
and the National Archives."
```

**Assessment:**

- Keyword-rich without keyword stuffing
- "Verified quotes" → Credibility signal
- "Primary source documents" → Matches likely search intent
- Mentions major archives → Authority signal

**Homepage:**

```yaml
title: "Tennessee Starts Here | Rocky Mount State Historic Site"
description: "Where Tennessee's government began. Stand where Governor
Blount governed and Andrew Jackson lodged. Join us for America 250..."
```

**Assessment:**

- Strong hook: "Where Tennessee's government began"
- Good local SEO: "Rocky Mount State Historic Site"
- America 250 tie-in → Timely search interest
- **Concern:** Jackson claim (see above)

### Search Optimization Strengths

**What You Got Right:**

1. **Structured Data** → Breadcrumb schema helps Google understand site structure
2. **Citation Boxes** → Every document has proper citation format (MLA, APA, Chicago)
3. **Source Links** → Direct links to Founders Online, National Archives, etc.
4. **Descriptive URLs** → `/evidence/documents/treaty-holston-1791` (clean, semantic)
5. **Alt Text Likely Present** → Professional Next.js implementation suggests proper image handling

**SEO Grade: A**

This site will rank well for:

- "Rocky Mount Tennessee history"
- "Treaty of Holston primary sources"
- "Southwest Territory documents"
- "William Blount Tennessee"
- "Tennessee founding documents"

### Search Result Preview

**When someone Googles "Tennessee founding history":**

Your Evidence Room could appear as:

```
The Evidence Room | Tennessee Starts Here
Primary source documents from Rocky Mount's history. Verified quotes
from Founders Online, Tennessee Encyclopedia, and the National Archives.
```

**Click-through Likelihood: HIGH**

- "Verified quotes" → Trust signal
- "Primary source documents" → Matches academic search intent
- Clear, professional presentation

---

## SOFT LAUNCH RECOMMENDATION

### VERDICT: Go Live After Priority Fixes (2-3 Hours Work)

**Timeline:**

- **Fix Jackson messaging:** 2-3 hours
- **Fix metadata gaps:** 1 hour
- **Soft launch:** Immediately after

**Do NOT wait for:**

- Perfect document collection
- Cherokee Nation partnership formalized
- Academic peer review
- National media interest

**Rationale:**

The Evidence Room is **quality work** that will benefit from real-world feedback. Holding it back for perfection means delaying value to educators, researchers, and visitors. The beta philosophy is right—launch quietly, learn, improve.

---

## PRIORITY FIXES BEFORE LAUNCH

### Priority 1: Fix Jackson Messaging (CRITICAL)

**Problem:** Site markets Jackson claim confidently despite admitting "no primary documentation" in Evidence Room.

**Solution Options:**

**Option A (Recommended): Reframe as Historical Tradition**

Change homepage/visit metadata from:

```
"Stand where Governor Blount governed and Andrew Jackson lodged"
```

To:

```
"Stand where Governor Blount governed and Andrew Jackson is said to have lodged"
```

**Why:** One word change ("is said to have") signals this is historical tradition, not verified primary source claim. Honest without undermining the story.

**Option B (More Conservative): Remove Jackson from Marketing**

Change to:

```
"Stand where Tennessee's government began under Governor Blount"
```

**Why:** Removes unverified claim entirely. Markets what you can prove (Blount capital) rather than what you can't (Jackson visit).

**Option C (Most Honest): Add Caveat in Jackson Document**

If keeping confident marketing language, add prominent disclaimer to Jackson document:

```markdown
## Verification Note

While Jackson's 1788 stay at Rocky Mount is consistently cited across
scholarly sources, **no primary documentation (letters, receipts, or
diary entries) from Jackson's stay has been identified**. This account
is based on historical tradition preserved in Tennessee Encyclopedia and
Rocky Mount institutional memory, cross-referenced with Jackson's known
biographical timeline.

The current buildings visitors see were constructed in **1826-1830**,
nearly 40 years after Jackson's claimed visit. If Jackson stayed here in
1788, it would have been in earlier structures that no longer exist.
```

**My Recommendation:** Implement **Option A + Option C**

- Soften marketing language ("is said to have lodged")
- Add clear caveat to Jackson document
- Total work: 2-3 hours

### Priority 2: Fix Metadata Gaps

**Problem:** 15 documents missing required metadata fields flagged by validation script.

**Solution:**

1. **Add `description` field to jackson-at-rocky-mount-1788.md**

   ```yaml
   description: Andrew Jackson, age 21, lodged at William Cobb's Rocky Mount home for six weeks in spring 1788 while awaiting his license to practice law in Jonesborough.
   ```

2. **Add `source_url` field to 14 documents**
   - For documents without online sources, use: `source_url: ''`
   - This satisfies schema requirement

3. **Expand two short descriptions**
   - knoxville-gazette-1794-06-07: Add 13+ characters
   - knoxville-gazette-1796-06-06: Add 5+ characters

**Time Required:** 1 hour (batch edit, run validation, confirm)

---

## MESSAGING CONCERNS

### What Works Well

**"Evidence, Not Claims" Positioning**

The Evidence Room's core message is **excellent**:

- "Most historic sites make claims. We show evidence."
- Citation boxes on every document
- Sources linked to archives
- Transparent about gaps

**This is defensible and differentiating.** It positions Rocky Mount as intellectually honest.

**Cherokee Content Framing**

The Cherokee documents are appropriately titled:

- "Cherokee Delegation to Philadelphia - Treaty Objections"
- "Little Turkey's Peace Efforts - Cherokee Leadership During Crisis"

**Key Phrase:** "This document preserves the words of Little Turkey..."

**Why This Works:**

- Acknowledges these are **secondhand accounts** (filtered through Knox's letters)
- Frames Cherokee leaders as **agents**, not passive subjects
- Shows Cherokee leaders negotiating, resisting, making strategic choices

**"Missing Voices" Disclosure**

The bias disclosure section is **mature and honest**:

```
"Many perspectives are absent: enslaved people who worked this
ground, Cherokee communities whose lands were negotiated away,
women whose labor sustained households."
```

**This preempts criticism.** You're acknowledging gaps before critics point them out.

### What Needs Fixing

**The Jackson Problem (Detailed Above)**

The only serious messaging issue is the Jackson claim inconsistency. Everything else is solid.

**Minor Concern: "Verified" vs "Historical Tradition"**

The Jackson document has:

```yaml
verification:
  status: verified
  notes: 'No primary documentation (letters or receipts) from Jackson
  actual stay has been identified.'
```

**The Tension:**
Marking status as `verified` while noting lack of primary documentation creates semantic confusion.

**Consider:**

- `status: traditional` (if adding new verification status)
- `status: single-source` (if based on consistent secondary sources)
- Or keep `verified` but add prominent caveat in document text

---

## ORGANIC DISCOVERY OPTIMIZATION

### What Will Drive Traffic

**1. Educators Searching for Primary Sources**

**Search Terms:**

- "Treaty of Holston primary source"
- "William Blount letters Tennessee"
- "Southwest Territory documents"
- "Tennessee founding primary sources"

**Your Advantage:**

- Full document transcriptions
- Citation boxes ready to copy
- Links to archival sources
- Free, accessible format

**2. Academics Researching Founding Era**

**Search Terms:**

- "Cherokee Treaty of Holston"
- "William Blount correspondence 1790"
- "Washington papers Tennessee"
- "Founders Online Tennessee"

**Your Advantage:**

- You're aggregating documents scattered across archives
- Proper citations encourage academic use
- Professional presentation signals credibility

**3. America 250 Content Discovery**

**Search Terms:**

- "America 250 Tennessee events"
- "Tennessee founding history"
- "Where did Tennessee government start"

**Your Advantage:**

- Timely content for America 250 programming
- Unique angle ("where government began" vs battlefield tourism)
- Primary sources differentiate from generic historical summaries

### Optimization Recommendations

**Already Doing Well:**

- Clean URL structure
- Descriptive page titles
- Strong meta descriptions
- Internal linking (citations reference other documents)
- External authority links (Founders Online, National Archives)

**Quick Wins (Post-Launch):**

- Add **Open Graph images** for social sharing (screenshots of key documents)
- Create **FAQ schema markup** for common questions
- Add **Event schema** for Evidence Room workshops/webinars
- Build **backlinks** through educator outreach (teachers linking to free resources)

---

## SOFT LAUNCH STRATEGY

### Phase 1: Silent Launch (Week 1)

**Actions:**

- Fix Jackson messaging
- Fix metadata gaps
- Push to production
- Submit sitemap to Google Search Console
- **NO announcement**

**Goal:** Test with organic discovery. Let Google index. Watch for issues.

### Phase 2: Selective Sharing (Week 2-4)

**Share with:**

- 2-3 trusted academics for feedback
- Tennessee teacher associations (as free resource)
- Regional historians who might link/share

**Do NOT:**

- Press release
- Social media announcement
- Major marketing push

**Goal:** Gather feedback. Fix issues. Build credibility quietly.

### Phase 3: Local Media (Month 2)

**Once confident, approach:**

- Johnson City Press (hometown coverage)
- Kingsport Times-News (regional interest)
- Tennessee education publications

**Pitch:** "Free primary source collection for Tennessee educators"

**Goal:** Regional visibility. Teacher adoption. Local pride.

### Phase 4: Broader Discovery (Month 3+)

**Let organic growth happen:**

- Teachers sharing with colleagues
- Academics citing in research
- History buffs discovering via search
- America 250 programming mentions

**Monitor:**

- Google Analytics (where traffic comes from)
- Citation tracking (who's linking to you)
- Feedback emails (corrections, suggestions)

---

## BETA PHILOSOPHY ALIGNMENT

### What Beta Means for Evidence Room

**Your Implementation Team Got This Right:**

✓ **Quality foundation** → 38 professionally presented documents
✓ **Honest about gaps** → "Missing Voices" disclosure
✓ **Room to grow** → Beta signals work-in-progress
✓ **No overpromising** → Not claiming "complete" or "definitive"

**Beta IS:**

- High quality baseline with room to expand
- Transparent about limitations
- Open to feedback and improvement
- Valuable now, better tomorrow

**Beta IS NOT:**

- Low quality placeholder
- "Coming soon" vaporware
- Excuse for errors
- Marketing hype

**Your Evidence Room is beta done right.** It's professional enough to be useful, honest enough to be trusted, incomplete enough to grow.

### Beta Messaging

**On Site (Already Present):**

- No "beta" badge needed (looks unpolished)
- "Missing Voices" disclosure signals work-in-progress
- Source notes acknowledge gaps
- Contact email invites corrections

**If Asked:**

```
"The Evidence Room is a living archive. We launched with 38 verified
documents and will continue adding sources as we identify them. We
welcome corrections and suggestions from researchers."
```

---

## CRISIS PREPAREDNESS

Even with a soft launch, be ready for these scenarios:

### Scenario 1: Jackson Challenge

**Trigger:** Journalist or academic questions Jackson claim

**Response Template:**

```
"You're right to ask. While Jackson's 1788 stay is documented in
Tennessee Encyclopedia and institutional records, we acknowledge in
our Evidence Room that no primary documentation from Jackson himself
has been identified. The current buildings date to 1826-1830, not
1788. We've updated our marketing language to reflect this distinction
between historical tradition and primary source verification."
```

**Key:** Don't be defensive. Thank them. Show you've already addressed it.

### Scenario 2: Cherokee Representation Question

**Trigger:** Cherokee Nation or scholars ask about Cherokee-authored documents

**Response Template:**

```
"The Evidence Room currently contains U.S. government documents about
Cherokee relations. We're actively researching Cherokee-authored
documents from this period and seeking partnership with Cherokee
Nation for authentic representation. Our 'Missing Voices' section
acknowledges this gap explicitly."
```

**Key:** Honest about limitations. Show active work to address.

### Scenario 3: Factual Error Found

**Trigger:** Someone finds a transcription error or incorrect date

**Response Template:**

```
"Thank you for the correction. We've updated the document and added a
note in the revision history. This is exactly the kind of scholarly
scrutiny that makes the Evidence Room better. If you find other issues,
please keep them coming."
```

**Key:** Grateful, not defensive. Fix quickly. Show responsiveness.

---

## FINAL ASSESSMENT

### Strengths

**Professional Presentation:**

- Clean, elegant design
- Proper citations
- Source links to archives
- Scholarly format (MLA, APA, Chicago)

**Intellectual Honesty:**

- "Missing Voices" disclosure
- Bias acknowledgment
- Transparent about gaps
- Welcomes corrections

**SEO Excellence:**

- Strong metadata
- Structured data
- Semantic URLs
- Citation-ready format

**Content Quality:**

- Well-written documents
- Historical context provided
- Cherokee content appropriately framed
- Primary sources properly attributed

### Weaknesses

**Critical:**

- Jackson claim inconsistency (must fix)

**Minor:**

- Metadata gaps (easy fix)
- Two short descriptions (housekeeping)

### Overall Grade: B+

**Would be A- after fixing Jackson messaging.**

The Evidence Room is **professional work** that will serve educators, researchers, and visitors well. The foundation is solid. The presentation is polished. The scholarship is honest.

**The Jackson issue is the only thing preventing me from recommending immediate launch without changes.**

---

## RECOMMENDATIONS SUMMARY

### Before Launch (Required)

1. **Fix Jackson messaging** → 2-3 hours
   - Soften marketing claims ("is said to have lodged")
   - Add caveat to Jackson document about building dates
   - Make verification status match content

2. **Fix metadata gaps** → 1 hour
   - Add description to Jackson document
   - Add source_url fields (can be empty)
   - Expand two short descriptions

### Soft Launch Strategy

1. **Week 1:** Silent launch (no announcement)
2. **Week 2-4:** Share with trusted academics and educators
3. **Month 2:** Local media outreach (if going well)
4. **Month 3+:** Let organic discovery happen

### Do NOT

- Delay for perfection (ready now)
- Launch with announcement (soft launch)
- Promise Cherokee content you don't have yet
- Market Jackson claim without caveats

---

## MY VERDICT

**REQUEST CHANGES** (Jackson messaging only)

The Evidence Room is **ready** except for one critical issue: the Jackson claim inconsistency creates a "gotcha" moment waiting to happen. Fix that contradiction, and you have a soft launch-ready digital archive that will serve its purpose well.

**After Jackson Fix: GO LIVE IMMEDIATELY**

Don't overthink it. Don't delay for perfect conditions. Launch quietly, let educators discover it, gather feedback, improve over time. That's what beta means.

**Time to Launch:** 3-4 hours of work (Jackson messaging + metadata gaps)

**Risk Level After Fixes:** LOW

**Expected Outcome:** Quiet launch → teacher adoption → regional recognition → academic citations → organic growth

**This is good work.** Let it into the world.

---

**Amanda Richardson**
Communications & PR Consultant
January 30, 2026

---

## APPENDIX: SPECIFIC EDITS REQUIRED

### File: `lib/copy/metadata.ts`

**Line 12-13 (HOME description):**

```typescript
// Current:
"Where Tennessee's government began. Stand where Governor Blount
governed and Andrew Jackson lodged. Join us for America 250..."

// Recommended:
"Where Tennessee's government began. Stand where Governor Blount
governed and Andrew Jackson is said to have lodged. Join us for
America 250..."
```

**Line 33-34 (VISIT description):**

```typescript
// Current:
"Visit Rocky Mount State Historic Site—where Tennessee's government
began. Stand where Governor Blount governed and Andrew Jackson lodged.
Living history tours daily."

// Recommended:
"Visit Rocky Mount State Historic Site—where Tennessee's government
began. Stand where Governor Blount governed and Andrew Jackson is said
to have lodged. Living history tours daily."
```

### File: `content/documents/jackson-at-rocky-mount-1788.md`

**Add to frontmatter (after line 10):**

```yaml
description: Andrew Jackson, age 21, lodged at William Cobb's Rocky Mount home for six weeks in spring 1788 while awaiting his license to practice law in Jonesborough.
```

**Add section before "Historical Context" (after line 33):**

```markdown
---

## Verification Note

While Jackson's 1788 stay at Rocky Mount is consistently cited across scholarly sources, **no primary documentation (letters, receipts, or diary entries) from Jackson's stay has been identified**. This account is based on historical tradition preserved in Tennessee Encyclopedia and Rocky Mount institutional memory, cross-referenced with Jackson's known biographical timeline.

**Important Context:** The current buildings visitors see at Rocky Mount were constructed in **1826-1830**, nearly 40 years after Jackson's claimed visit. If Jackson stayed here in 1788, it would have been in earlier structures that no longer exist on the site.

This represents a common challenge in frontier history: many interactions were never documented in writing, or those documents have been lost. We present this account based on consistent scholarly consensus while acknowledging the absence of primary source verification.

---
```

### Files: 14 Gazette & Other Documents

**Add to frontmatter of each:**

```yaml
source_url: ''
```

(Empty string indicates no URL available, satisfies schema requirement)

**Files needing this:**

- blount-arrival-1790.md
- knoxville-gazette-1791-11-12.md
- knoxville-gazette-1791-12-03.md
- knoxville-gazette-1792-01-07.md
- knoxville-gazette-1792-02-25.md
- knoxville-gazette-1792-04-14.md
- knoxville-gazette-1792-07-07.md
- knoxville-gazette-1792-10-06.md
- knoxville-gazette-1793-03-16.md
- knoxville-gazette-1793-08-24.md
- knoxville-gazette-1794-06-07.md
- knoxville-gazette-1795-02-14.md
- knoxville-gazette-1796-01-17.md
- rocky-mount-inventory-1791.md

---

**END OF ADVISORY REVIEW**
