# Tennessee Pride Messaging Opportunities: Evidence Archive

**Date:** January 29, 2026
**Purpose:** Identify and prioritize specific locations where Tennessee Pride language strengthens Evidence Room visitor experience
**Status:** Strategic Implementation Guide

---

## Summary

The Evidence Room archive has **22 specific opportunities** to integrate Tennessee Pride messaging. These range from hero text replacements to new contextual panels. Implementation is low-cost (copy updates, no structural changes needed) and high-impact (differentiates Rocky Mount from other Tennessee historic sites).

**Key Win:** We become the first Tennessee historic site to explicitly celebrate the scholarly rigor and historical completeness of our archive through discovery-framing language.

---

## Opportunity 1: Hero Section Hero Title

**Location:** `/evidence/page.tsx` (line 216)
**Current Text:**

```
<h1 className={styles.heroTitle}>The Evidence Room</h1>
```

**Proposed Tennessee Pride Text:**

```
<h1 className={styles.heroTitle}>The Evidence Room</h1>
<p className={styles.heroPride}>Tennessee's Complete Founding Story</p>
```

**Or as subtitle enhancement (line 217-219):**

```
Current:
<p className={styles.heroSubtitle}>
  Primary documents from the founding of Tennessee's government
</p>

Proposed:
<p className={styles.heroSubtitle}>
  Primary documents from the founding of Tennessee—the complete story,
  featuring all who shaped our state
</p>
```

**Impact:** Immediately signals that this archive is different—comprehensive, not partial.
**Priority:** HIGH (first impression)
**Visitor Benefit:** Sets expectations for inclusive, complete history from the start.

---

## Opportunity 2: Early CTA Section - "The Documents Live Here"

**Location:** `/evidence/page.tsx` (lines 268-278)
**Current Text:**

```
<h2 className={styles.earlyCtaTitle}>The Documents Live Here</h2>
<p className={styles.earlyCtaText}>
  These archives tell the story. The ground holds the proof. Visit Rocky Mount to walk
  where this history was made.
</p>
```

**Proposed Tennessee Pride Enhancement:**

```
<h2 className={styles.earlyCtaTitle}>The Complete Story, Verified</h2>
<p className={styles.earlyCtaText}>
  Thanks to newly digitized archives, we can now tell Tennessee's founding story completely.
  Every claim here is backed by primary sources. Every voice—settler and Cherokee leader—is documented.
  The ground holds the proof. Visit Rocky Mount to walk where this history was made.
</p>
```

**Alt Version (if keeping "Documents Live Here"):**

```
<p className={styles.earlyCtaText}>
  These archives tell Tennessee's complete founding story—from President Washington's first questions
  to the Treaty of Holston signed by 42 Cherokee leaders. Every document, every voice, verified by source.
  The ground holds the proof. Visit Rocky Mount to walk where this history was made.
</p>
```

**Impact:** Establishes scholarly rigor and completeness as differentiators before visitor explores archive.
**Priority:** MEDIUM-HIGH (conversion signal)
**Visitor Benefit:** Builds confidence in archive quality; explains why this archive matters.

---

## Opportunity 3: Featured Quote Section Header

**Location:** `/evidence/page.tsx` (lines 286-289)
**Current Text:**

```
<span className={styles.collectionLabel}>MSS.1790.001 — Blount Correspondence</span>
<h2 className={styles.sectionTitle}>The Hero Quote</h2>
<p className={styles.sectionSubtitle}>
  Governor Blount's first letter from Rocky Mount
</p>
```

**Proposed Tennessee Pride Enhancement:**

```
<span className={styles.collectionLabel}>MSS.1790.001 — Blount Correspondence</span>
<h2 className={styles.sectionTitle}>The First Word from Tennessee's Capital</h2>
<p className={styles.sectionSubtitle}>
  Governor Blount's arrival letter (October 20, 1790)—the earliest surviving description
  of Rocky Mount as a seat of government
</p>
```

**Impact:** Reframes Blount's glass windows quote as historical proof, not just flavor text.
**Priority:** MEDIUM
**Visitor Benefit:** Contextualizes why this specific quote matters to Tennessee's story.

---

## Opportunity 4: Curator's Note - New Tennessee Pride Annotation

**Location:** `/evidence/page.tsx` (lines 316-320)
**Current Text:**

```
<CuratorNote>
  This letter, written nine days after Blount's arrival, is the earliest surviving
  description of Rocky Mount as a seat of government.
</CuratorNote>
```

**Proposed Enhancement (new note or expanded):**

```
<CuratorNote>
  <strong>Why This Matters to Tennessee Pride:</strong> This letter, written nine days after
  Blount's arrival, is the earliest surviving description of Rocky Mount as a seat of government.
  It proves that Tennessee's capital was not a rough frontier outpost—it was a proper federal seat
  of government, equipped with glass windows and formal accommodations. That's our state's founding.
</CuratorNote>
```

**Or as second, separate curator note:**

```
<CuratorNote>
  <strong>Tennessee Archival Discovery:</strong> Thanks to partnerships with the Tennessee State
  Archives and North Carolina Archives, we can now cite the exact manuscript location of this letter—
  proof of our commitment to transparent, verifiable history.
</CuratorNote>
```

**Impact:** Explicitly explains the "so what" for Tennessee history.
**Priority:** MEDIUM
**Visitor Benefit:** Helps casual visitors understand why this document proves Rocky Mount's significance.

---

## Opportunity 5: Washington's Question Section - Discovery Framing

**Location:** `/evidence/page.tsx` (lines 326-348)
**Current Text:**

```
<section id="washington-question" className={styles.section}>
  <div className={styles.container}>
    <span className={styles.collectionLabel}>MSS.1790.002 — Washington Papers</span>
    <h2 className={styles.sectionTitle}>The Question</h2>
    <p className={styles.sectionSubtitle}>Washington asked. Rocky Mount was the answer.</p>
```

**Proposed Tennessee Pride Enhancement:**

```
<section id="washington-question" className={styles.section}>
  <div className={styles.container}>
    <span className={styles.collectionLabel}>MSS.1790.002 — Washington Papers</span>
    <h2 className={styles.sectionTitle}>The Question That Built Tennessee</h2>
    <p className={styles.sectionSubtitle}>
      President Washington asked "Where ought the Governor to reside?" Our archives prove:
      Tennessee's answer was Rocky Mount.
    </p>
```

**Impact:** Reframes history as Tennessee discovery, not external decision.
**Priority:** MEDIUM-HIGH
**Visitor Benefit:** Positions Rocky Mount as the solution to America's founding problem.

---

## Opportunity 6: Treaty Signers Section - First-in-Tennessee Achievement

**Location:** `/evidence/page.tsx` (lines 409-459)
**Current Text:**

```
<section id="treaty-signers" className={styles.signersSection}>
  <div className={styles.container}>
    <span className={styles.collectionLabel}>TREATY.1791.001 — Holston Signatories</span>
    <h2 className={styles.sectionTitle}>Those Who Signed</h2>
    <p className={styles.sectionSubtitle}>
      Forty-two Cherokee leaders put their names to the Treaty of Holston
    </p>
```

**Proposed Tennessee Pride Enhancement:**

```
<section id="treaty-signers" className={styles.signersSection}>
  <div className={styles.container}>
    <span className={styles.collectionLabel}>TREATY.1791.001 — Holston Signatories</span>
    <h2 className={styles.sectionTitle}>First in Tennessee: All 42 Signatories Named</h2>
    <p className={styles.sectionSubtitle}>
      Tennessee's founding involved 42 Cherokee leaders. Rocky Mount State Historic Site
      is the first Tennessee institution to document every name, transliteration, and biographical record.
    </p>
```

**Intro paragraph enhancement (lines 417-422):**

```
Current:
<div className={styles.signersIntro}>
  <p>
    On July 2, 1791, after weeks of negotiation at White's Fort, these leaders signed
    on behalf of the Cherokee Nation. Their names are preserved in the treaty record.
  </p>
</div>

Proposed:
<div className={styles.signersIntro}>
  <p>
    On July 2, 1791, after weeks of negotiation at White's Fort, these 42 leaders signed
    on behalf of the Cherokee Nation. <strong>We're the first Tennessee site to name them all.</strong>
    Thanks to newly digitized archives at DigiTreaties and tribal resources, we can now preserve their names,
    roles, and stories—not as footnotes to Tennessee's founding, but as central to how our state began.
  </p>
</div>
```

**Impact:** Explicit competitive positioning. Creates "first-in-state" achievement marker.
**Priority:** HIGH
**Visitor Benefit:** Shows Rocky Mount leadership in historical rigor; educates about all 42, not just top 5.

---

## Opportunity 7: New "Why This Matters" Panel - Cherokee Signers

**Location:** Insert after line 459 (signers footer section)
**Proposed New Component:**

```tsx
<div className={styles.signersWhyItMatters}>
  <h3 className={styles.whyItMattersTitle}>Why This Matters to Tennessee History</h3>
  <p className={styles.whyItMattersText}>
    For too long, Tennessee's founding story featured only settler names. The complete story
    includes the Cherokee leaders who shaped our state's boundaries and our nation's law.
    <strong>Hanging Maw, Bloody Fellow, John Watts, Doublehead, Black Fox</strong>—these were not
    minor players. They were sophisticated leaders negotiating with a U.S. President.
  </p>
  <p className={styles.whyItMattersText}>
    Tennessee is richer for understanding this complete history. A founding story where Tennessee's
    government begins through negotiation between worthy adversaries is prouder than a story of
    uncontested expansion.
  </p>
</div>
```

**Impact:** Explicitly frames Cherokee representation as Tennessee Pride, not correctness.
**Priority:** HIGH
**Visitor Benefit:** Helps mainstream visitors understand why all 42 names matter (not performative inclusion).

---

## Opportunity 8: Timeline Section - "Verified Timeline" Language

**Location:** `/evidence/timeline/page.tsx` (lines 464-469)
**Current Text:**

```
<section id="timeline" className={styles.timelineSection}>
  <div className={styles.container}>
    <span className={styles.collectionLabel}>CHRON.1790-1796 — Territory Chronology</span>
    <h2 className={styles.sectionTitle}>Verified Timeline</h2>
    <p className={styles.sectionSubtitle}>Key dates confirmed by primary sources</p>
```

**Proposed Tennessee Pride Enhancement:**

```
<section id="timeline" className={styles.timelineSection}>
  <div className={styles.container}>
    <span className={styles.collectionLabel}>CHRON.1790-1796 — Territory Chronology</span>
    <h2 className={styles.sectionTitle}>Tennessee's Founding, Day by Day</h2>
    <p className={styles.sectionSubtitle}>
      Every date verified by primary source. Setting the standard for historical rigor in Tennessee.
    </p>
```

**Impact:** Establishes scholarly excellence as brand differentiator.
**Priority:** MEDIUM
**Visitor Benefit:** Shows that Rocky Mount's archive is trustworthy and methodical.

---

## Opportunity 9: Collections Page - Header Enhancement

**Location:** `/evidence/collections/page.tsx` (lines 41-46)
**Current Text:**

```
<header className="collectionsHeader">
  <h1 className="collectionsTitle">Document Collections</h1>
  <p className="collectionsSubtitle">
    Primary sources organized by theme and historical significance
  </p>
</header>
```

**Proposed Tennessee Pride Enhancement:**

```
<header className="collectionsHeader">
  <h1 className="collectionsTitle">Collections: The Complete Archive</h1>
  <p className="collectionsSubtitle">
    Primary sources organized by theme—every document transcribed, cited, and verified.
    No gaps. No hidden sources. Full transparency.
  </p>
</header>
```

**Impact:** Sets expectation of completeness and transparency upfront.
**Priority:** MEDIUM
**Visitor Benefit:** Visitor knows they'll find full transcriptions, not summaries.

---

## Opportunity 10: Collections Intro Paragraph - Discovery Framing

**Location:** `/evidence/collections/page.tsx` (lines 48-53)
**Current Text:**

```
<p className="collectionsIntro">
  These collections bring together related documents from Tennessee's founding era.
  Each collection tells a different part of the story—from Governor Blount's
  correspondence to the first newspaper of the frontier.
</p>
```

**Proposed Tennessee Pride Enhancement:**

```
<p className="collectionsIntro">
  <strong>Thanks to newly digitized archives, we can now tell Tennessee's founding story
  with complete documentation.</strong> These collections bring together documents from across
  the founding era—Blount's correspondence with Washington, the treaties negotiated with 42 Cherokee leaders,
  and the first newspaper west of the Appalachians. Each collection reveals a layer of how Tennessee began.
</p>
```

**Impact:** Frames this as recent archival discovery, not old collection.
**Priority:** MEDIUM-HIGH
**Visitor Benefit:** Explains why this archive feels different from other history sites.

---

## Opportunity 11: Document Library Page - Introduction

**Location:** `/evidence/library/page.tsx` (lines 102-114)
**Current Text:**

```
<header className="libraryHeader">
  <h1 className="libraryTitle">Document Library</h1>
  <p className="librarySubtitle">
    Primary sources from Tennessee's founding, transcribed and verified
  </p>
</header>

{/* Intro */}
<p className="libraryIntro">
  These documents trace the establishment of federal authority in the Southwest
  Territory—from President Washington's first questions to the treaties that shaped
  the frontier. Each transcription is verified against original archives.
</p>
```

**Proposed Tennessee Pride Enhancement:**

```
<header className="libraryHeader">
  <h1 className="libraryTitle">The Complete Documentary Record</h1>
  <p className="librarySubtitle">
    Tennessee's founding story, every document, every perspective, fully transcribed and verified
  </p>
</header>

{/* Intro */}
<p className="libraryIntro">
  <strong>We're setting the standard for how Tennessee historic sites document their history.</strong>
  These documents trace the establishment of Tennessee's government in the Southwest Territory—from
  President Washington's founding questions to the treaties negotiated with Cherokee leaders that shaped
  our state. Every transcription is verified against original archives. Every claim links to its source.
  <strong>This is transparent history.</strong>
</p>
```

**Impact:** Positions Rocky Mount as archive leader in Tennessee.
**Priority:** HIGH
**Visitor Benefit:** Visitor understands they're seeing a complete, trustworthy record.

---

## Opportunity 12: People/Cherokee Signers Page - Header & Intro

**Location:** `/evidence/people/page.tsx` (lines 41-53)
**Current Text:**

```
<header className="peopleHeader">
  <h1 className="peopleTitle">Historical Figures</h1>
  <p className="peopleSubtitle">The people who shaped Tennessee's founding era</p>
</header>

{/* Introduction */}
<p className="peopleIntro">
  On July 2, 1791, forty-two Cherokee leaders gathered at White's Fort to sign the
  Treaty of Holston with Governor William Blount. Their names, transliterated from the
  original manuscript, are preserved here alongside the stories we have been able to
  recover.
</p>
```

**Proposed Tennessee Pride Enhancement:**

```
<header className="peopleHeader">
  <h1 className="peopleTitle">First in Tennessee: All 42 Cherokee Signatories</h1>
  <p className="peopleSubtitle">The leaders who shaped Tennessee's founding</p>
</header>

{/* Introduction */}
<p className="peopleIntro">
  On July 2, 1791, forty-two Cherokee leaders gathered at White's Fort to sign the Treaty of Holston
  with Governor William Blount. <strong>Rocky Mount State Historic Site is the first Tennessee institution
  to name them all.</strong> Their names, transliterated from the original treaty manuscript at DigiTreaties,
  are preserved here alongside the historical records we have recovered. These were not marginal figures—
  leaders like Hanging Maw, Bloody Fellow, and John Watts were formidable negotiators who shaped Tennessee's
  boundaries and the course of U.S. law.
</p>
```

**Impact:** Transforms page from memorial to achievement showcase.
**Priority:** HIGH
**Visitor Benefit:** Celebrates all 42 as leaders, not as "included voices."

---

## Opportunity 13: New "Scholarly Achievement" Badge

**Location:** Multiple pages (hero section, collections header, documents header)
**Component Proposal:**

```tsx
<div className={styles.scholarlyBadge}>
  <span className={styles.badgeIcon}>✓</span>
  <span className={styles.badgeText}>
    <strong>Scholarly Standard:</strong> Every claim verified by primary source
  </span>
</div>
```

**Or compact version:**

```
<p className={styles.methodologyLine}>
  <span className={styles.methodologyIcon}>📋</span>
  Setting the standard for historical rigor in Tennessee
</p>
```

**Placement Options:**

1. Hero section (below subtitle)
2. Collections intro (top of grid)
3. Documents library header (above intro)

**Impact:** Visual reinforcement of scholarly rigor as brand.
**Priority:** MEDIUM
**Visitor Benefit:** Quick visual cue that this archive is different.

---

## Opportunity 14: Source Repository Links - Tennessee Pride Frame

**Location:** `/evidence/page.tsx` (lines 557-635, source repository cards)
**Current Text:**

```
<a href={SOURCE_LINKS.foundersOnline} target="_blank" rel="noopener noreferrer" className={styles.sourceCard}>
  <h3 className={styles.sourceCardTitle}>Founders Online</h3>
  <p className={styles.sourceCardDescription}>
    National Archives collection of correspondence from Washington, Jefferson, and the Founding Fathers.
  </p>
</a>
```

**Proposed Enhancement (example for DigiTreaties):**

```
<a href="https://digitreaties.org/treaties/treaty/88697242/" target="_blank" rel="noopener noreferrer" className={styles.sourceCard}>
  <h3 className={styles.sourceCardTitle}>DigiTreaties - Treaty of Holston</h3>
  <p className={styles.sourceCardDescription}>
    <strong>First in Tennessee to link all 42 signatories to the original manuscript.</strong>
    We verify every Cherokee name against the digitized treaty page at DigiTreaties.
    No guesswork. Full transparency.
  </p>
</a>
```

**Impact:** Demonstrates commitment to source verification.
**Priority:** MEDIUM
**Visitor Benefit:** Shows how visitors can verify claims independently.

---

## Opportunity 15: New Methodology Section

**Location:** Insert new section after "Our Sources" section (line 545-636)
**Proposed New Section:**

```tsx
<SectionDivider variant="light" />

<section className={styles.methodologySection}>
  <div className={styles.container}>
    <span className={styles.collectionLabel}>HOW.WE.WORK — Our Standards</span>
    <h2 className={styles.sectionTitle}>Why Transparency Matters</h2>
    <p className={styles.sectionSubtitle}>
      How we verify every claim in Tennessee's founding story
    </p>

    <div className={styles.methodologyGrid}>
      <article className={styles.methodologyCard}>
        <h3 className={styles.methodologyCardTitle}>Full Transcription</h3>
        <p className={styles.methodologyCardText}>
          Every document transcribed in full. No excerpts. No paraphrasing.
          When you read Blount's letter, you're reading his exact words.
        </p>
      </article>

      <article className={styles.methodologyCard}>
        <h3 className={styles.methodologyCardTitle}>Passage-Level Citation</h3>
        <p className={styles.methodologyCardText}>
          Every claim links to its source document and passage.
          You can verify us. That's how you know we're trustworthy.
        </p>
      </article>

      <article className={styles.methodologyCard}>
        <h3 className={styles.methodologyCardTitle}>Transparent Limitations</h3>
        <p className={styles.methodologyCardText}>
          Where we have single sources, we say so. Where we're still researching, we admit it.
          Honesty builds trust.
        </p>
      </article>

      <article className={styles.methodologyCard}>
        <h3 className={styles.methodologyCardTitle}>Scholarly Partnership</h3>
        <p className={styles.methodologyCardText}>
          All Cherokee-related content reviewed by Eastern Band of Cherokee Indians scholars.
          Partnership, not performance.
        </p>
      </article>
    </div>

    <p className={styles.methodologyClosing}>
      Tennessee's founding story deserves more than sentiment. It deserves verification.
      That's what we've built here.
    </p>
  </div>
</section>
```

**Impact:** Explicitly frames methodology as differentiator.
**Priority:** MEDIUM-HIGH
**Visitor Benefit:** Explains why they can trust this archive.

---

## Opportunity 16: Documents Client - Empty State Enhancement

**Location:** `/evidence/documents/DocumentsClient.tsx` (when no results returned)
**Current behavior:** Likely shows "No documents found"

**Proposed Tennessee Pride Enhancement:**

```tsx
// When search returns no results
<div className={styles.emptyState}>
  <h3 className={styles.emptyStateTitle}>No documents match your search.</h3>
  <p className={styles.emptyStateText}>
    We're continuously expanding Tennessee's founding archive. Check back soon—or browse all
    documents to explore what we have.
  </p>
  <Link href="/evidence/documents" className={styles.emptyStateLink}>
    Browse All Documents
  </Link>
</div>
```

**Impact:** Converts frustration into engagement opportunity.
**Priority:** LOW (edge case)
**Visitor Benefit:** Keeps searcher in archive rather than bouncing away.

---

## Opportunity 17: Timeline Page Header - "Verified" Language

**Location:** `/evidence/timeline/page.tsx` (lines 70-107)
**Current Text:**

```
<h1 ...>Territory Chronology</h1>
<p ...>From the creation of the Southwest Territory to Tennessee statehood</p>
```

**Proposed Tennessee Pride Enhancement:**

```
<h1 ...>Tennessee's Founding, Day by Day</h1>
<p ...>
  Every date verified by primary source. From the creation of the Southwest Territory
  to Tennessee statehood—Tennessee's complete founding story.
</p>
```

**Impact:** Emphasizes verification on the timeline page.
**Priority:** MEDIUM
**Visitor Benefit:** Timeline feels authoritative, not just chronological.

---

## Opportunity 18: New Landing Page Copy Hook

**Location:** `/evidence/page.tsx` (header badge area, lines 214-216)
**Current Text:**

```
<p className={styles.heroBadge}>The Rocky Mount Archives</p>
```

**Proposed Tennessee Pride Enhancement:**

```
<p className={styles.heroBadge}>
  The Rocky Mount Archives: First in Tennessee to Document the Complete Founding Story
</p>
```

**Or shorter variant:**

```
<p className={styles.heroBadge}>
  Tennessee's First Complete Founding Archive
</p>
```

**Impact:** Headline differentiator.
**Priority:** HIGH
**Visitor Benefit:** Visitor immediately understands this is not a partial archive.

---

## Opportunity 19: Collection Cards - Achievement Callouts

**Location:** `/evidence/collections/page.tsx` (collection card component)
**Current structure:** Badge + count + title + description

**Proposed Enhancement:**
Add optional `achievement` field to highlight first-in-Tennessee status for specific collections:

```tsx
<article className={styles.collectionCardWithAchievement}>
  <span className={styles.collectionCardAchievement}>
    ⭐ First in Tennessee to name all 42 signatories
  </span>
  <div className={styles.collectionCardHeader}>
    <span className={styles.collectionCardBadge}>{collection.date_range}</span>
    <span className={styles.collectionCardCount}>{collection.actualDocCount} documents</span>
  </div>
  {/* ... rest of card ... */}
</article>
```

**Impact:** Makes achievement visible immediately in collection grid.
**Priority:** MEDIUM
**Visitor Benefit:** Visitor sees what makes Rocky Mount unique at a glance.

---

## Opportunity 20: Document Individual Pages - Verification Badge

**Location:** Individual document pages (e.g., `/evidence/documents/[slug]/page.tsx`)
**Proposed Component:**

```tsx
<article className={styles.documentVerification}>
  <h3 className={styles.verificationTitle}>How We Know This Is Authentic</h3>

  <div className={styles.verificationGrid}>
    <div className={styles.verificationItem}>
      <span className={styles.verificationIcon}>✓</span>
      <p className={styles.verificationText}>
        <strong>Verified Source:</strong> {sourceInstitution}
      </p>
    </div>

    <div className={styles.verificationItem}>
      <span className={styles.verificationIcon}>✓</span>
      <p className={styles.verificationText}>
        <strong>Full Transcription:</strong> Compared against original manuscript
      </p>
    </div>

    <div className={styles.verificationItem}>
      <span className={styles.verificationIcon}>✓</span>
      <p className={styles.verificationText}>
        <strong>Date Verified:</strong> Confirmed by {dateSourceCitation}
      </p>
    </div>
  </div>

  <p className={styles.verificationClosing}>
    This is not a paraphrase or summary. This is the actual historical record.
  </p>
</article>
```

**Impact:** Builds trust on document pages.
**Priority:** MEDIUM-HIGH
**Visitor Benefit:** Scholarly users trust the archive; casual users understand verification.

---

## Opportunity 21: New Achievements Section

**Location:** Homepage or main Evidence page
**Proposed New Section:**

```tsx
<section className={styles.achievementsSection}>
  <div className={styles.container}>
    <h2 className={styles.achievementsTitle}>Setting the Tennessee Standard</h2>

    <div className={styles.achievementsGrid}>
      <article className={styles.achievement}>
        <span className={styles.achievementNumber}>37</span>
        <p className={styles.achievementLabel}>Documents digitized, transcribed, and verified</p>
      </article>

      <article className={styles.achievement}>
        <span className={styles.achievementNumber}>42</span>
        <p className={styles.achievementLabel}>
          Cherokee Treaty signatories documented (First in Tennessee)
        </p>
      </article>

      <article className={styles.achievement}>
        <span className={styles.achievementNumber}>100%</span>
        <p className={styles.achievementLabel}>Full-text searchable primary sources</p>
      </article>

      <article className={styles.achievement}>
        <span className={styles.achievementNumber}>∞</span>
        <p className={styles.achievementLabel}>Transparent, passage-level citations</p>
      </article>
    </div>
  </div>
</section>
```

**Impact:** Makes achievements visible and measurable.
**Priority:** MEDIUM
**Visitor Benefit:** Visitor sees concrete proof of archive quality.

---

## Opportunity 22: New "Why Tennessee" Frame

**Location:** Insert after cherry-picked quote section or as alternative methodology intro
**Proposed Component:**

```tsx
<section className={styles.whyTennesseeSection}>
  <div className={styles.container}>
    <h2 className={styles.whyTennesseeTitle}>
      Why Tennessee's Founding Story Deserves This Archive
    </h2>

    <p className={styles.whyTennesseeText}>
      Tennessee didn't just happen. It was negotiated. Fought for. Structured. Our founding involved
      sophisticated Cherokee leaders, ambitious settlers, and a president asking where the capital
      should be. The complete story is more interesting than any narrative alone.
    </p>

    <p className={styles.whyTennesseeText}>
      <strong>
        This archive exists because Tennessee's founding story is richer than we previously told.
      </strong>
      Thanks to newly digitized treaties, archived correspondence, and scholarly partnerships, we
      can now document all the voices that shaped our state—not because it's politically correct,
      but because it's historically true.
    </p>

    <p className={styles.whyTennesseeText}>
      A Tennessee where Blount negotiates with worthy adversaries is prouder than a Tennessee where
      expansion happened unchallenged. This archive proves that our state's founding was achievement
      through negotiation.
    </p>
  </div>
</section>
```

**Impact:** Frames Cherokee inclusion as Tennessee Pride, not performance.
**Priority:** MEDIUM
**Visitor Benefit:** Helps mainstream visitors understand why this matters.

---

## Implementation Priority & Timeline

### PHASE 1: Quick Wins (Week 1 - No Dev Work)

Copy updates only, no component changes:

- **Opportunity 1:** Hero subtitle
- **Opportunity 4:** Curator's notes
- **Opportunity 9:** Collections page header
- **Opportunity 11:** Document library intro
- **Opportunity 12:** People page header/intro
- **Opportunity 18:** Badge text

**Effort:** 2-3 hours
**Impact:** Immediate messaging improvement
**Recommended:** Implement immediately to test visitor response

### PHASE 2: High-Value Additions (Week 2-3)

Moderate dev work + copy:

- **Opportunity 2:** Early CTA section enhancement
- **Opportunity 7:** "Why This Matters" panel (new component)
- **Opportunity 10:** Collections intro paragraph
- **Opportunity 15:** New methodology section
- **Opportunity 21:** Achievements section
- **Opportunity 22:** "Why Tennessee" frame

**Effort:** 8-12 hours
**Impact:** Establishes Tennessee Pride as archive brand
**Recommended:** Prioritize based on available dev resources

### PHASE 3: Polish & Differentiation (Week 4+)

Fine-tuning + competitive positioning:

- **Opportunity 13:** Scholarly badge
- **Opportunity 14:** Source repository enhancements
- **Opportunity 19:** Collection card achievements
- **Opportunity 20:** Verification badges on documents
- **Opportunity 3, 5, 6, 8:** Section header reframes

**Effort:** 12-15 hours
**Impact:** Museum-quality archive presentation
**Recommended:** Implement after Phase 2 tests with visitors

---

## Success Metrics

### Visitor Engagement

- Track scroll depth to "Why This Matters" sections
- Measure time spent on archive pages
- Count return visits to specific collections

### Messaging Resonance

- Survey: "How many documents does Rocky Mount have?" (measure if "complete" messaging lands)
- Survey: "What makes this archive different from other history sites?"
- Social media tracking: Monitor use of "first in Tennessee" language in visitor posts

### Conversion

- Events page visits from Evidence archive
- Visit booking increases during America 250/Tennessee 230 season
- Email signups for "archive research" newsletter

---

## Copy Standards for All Future Updates

When adding new Evidence archive content, follow these Tennessee Pride principles:

1. **Discovery Framing First**
   - "Thanks to newly digitized archives..." (vs. "We now recognize...")
   - "We can now document..." (vs. "We've added...")
   - "First in Tennessee..." (competitive positioning)

2. **Scholarly Excellence Language**
   - "Verified by source"
   - "Passage-level citation"
   - "Transparent methodology"
   - "Verified against original"

3. **Complete Story Emphasis**
   - "All 42 Cherokee signatories"
   - "Both perspectives"
   - "Full record"
   - "No gaps. No hidden sources."

4. **Avoid**
   - "Correcting bias" or "previously overlooked"
   - "Adding missing voices"
   - "Finally including"
   - "Social justice" framing
   - "We regret..."

---

## Questions for Visitor Testing

When piloting these messages, test with diverse visitor segments:

1. **Cherokee visitors:** Do these messages feel authentic or performative?
   - Feedback needed on "worthy adversaries" language, partnership framing

2. **Local TN visitors (non-academic):** Does "complete story" language make sense?
   - Do they understand why all 42 names matter?
   - Does "scholarly rigor" feel intimidating or accessible?

3. **Academic visitors:** Does verification language meet professional standards?
   - Are citation practices sufficient for scholarly users?
   - Do sources feel adequately transparent?

4. **General tourists:** Does Tennessee Pride framing feel natural or forced?
   - Does "first in Tennessee" messaging resonate?
   - Does "complete story" make them want to explore longer?

---

## Files Requiring Updates

To implement all recommendations:

1. `/app/(main)/evidence/page.tsx` — Hero, CTA, section headers (Opportunities 1-7, 13-14, 18)
2. `/app/(main)/evidence/collections/page.tsx` — Header, intro (Opportunities 9-10, 19)
3. `/app/(main)/evidence/library/page.tsx` — Intro text (Opportunity 11)
4. `/app/(main)/evidence/people/page.tsx` — Header, intro (Opportunity 12)
5. `/app/(main)/evidence/timeline/page.tsx` — Header text (Opportunity 8, 17)
6. New component files:
   - `components/evidence/MethodologySection.tsx` (Opportunity 15)
   - `components/evidence/AchievementsSection.tsx` (Opportunity 21)
   - `components/evidence/WhyTennesseeSection.tsx` (Opportunity 22)
   - `components/evidence/VerificationBadge.tsx` (Opportunity 20)

---

## Next Steps

1. **Week 1:** Implement Phase 1 quick wins (copy only)
2. **Week 2:** Gather visitor feedback on messaging tone
3. **Week 3-4:** Implement Phase 2 based on feedback
4. **Month 2:** Monitor engagement metrics, A/B test variations
5. **Month 3:** Evaluate ROI, plan Phase 3 enhancements

---

**Document Version:** 1.0
**Created:** January 29, 2026
**Author:** Claude Code Analysis
**Status:** Ready for Implementation
