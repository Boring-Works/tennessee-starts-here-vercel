# Evidence Archive Quick Wins

**Date:** January 29, 2026
**Status:** Ready for Implementation
**Target:** 5 high-impact, low-effort improvements implementable in 20 hours total

---

## Executive Summary

The Evidence archive has strong bones: clear navigation, featured content, source links, and timeline. These 5 quick wins add transparency, context, and Tennessee pride messaging—turning good architecture into exceptional credibility.

**Total Effort:** ~20 hours
**Combined Impact:** 45/50 points
**ROI:** Trust, teacher adoption, school bookings, grant competitiveness

---

## Quick Win #1: Add Bias Disclosure to Main Evidence Page

**Effort:** 4-6 hours
**Impact Score:** 9/10
**Priority:** 1️⃣ DO FIRST
**Status:** Text pre-drafted in EVIDENCE-ARCHIVE-REVIEW.md

### What It Does

Adds a transparent "About This Archive" section to `/evidence/page.tsx` hero or early in the page explaining whose voices are documented and whose aren't.

### Why It Matters

- **Builds immediate trust** — Visitors see we're honest about limitations
- **Differentiates from competitors** — Most sites hide this, we lead with it
- **Serves researchers** — Scholars need to know what's included/excluded
- **Addresses "missing perspectives"** proactively — No surprises, no accusations

### Implementation

**Location:** Add to `/app/(main)/evidence/page.tsx` as a collapsible section above the featured quote (around line 262, after `<EntryRoom />`).

**Content to Add:**

```typescript
// Add new component or inline section
<section className={styles.aboutSection}>
  <ContextPanel>
    <strong>About This Archive</strong>
    <p>
      The documents in this archive tell the story of Rocky Mount and the Tennessee
      frontier primarily through the eyes of European-American settlers, government
      officials, and property owners. These voices dominate the historical record because
      they had access to literacy, legal systems, and document preservation.
    </p>
    <p>
      <strong>Missing from this archive—not by accident, but by design of the systems that
      created these records—are the voices of:</strong>
    </p>
    <ul>
      <li>Cherokee peoples, whose ancestral lands these were</li>
      <li>Enslaved African Americans, who built much of what we now preserve</li>
      <li>Women, who were often excluded from legal and political records</li>
      <li>Working-class settlers, who rarely left written accounts</li>
    </ul>
    <p>
      We're actively working to address these gaps. We're partnering with Cherokee nations
      to identify Cherokee-authored sources. We're researching archaeological and oral
      history evidence. We're seeking out overlooked documents that capture marginalized voices.
    </p>
    <p>
      In the meantime, we ask you to read these sources with critical awareness. Ask:
      Who benefited from this version of events being preserved? Whose perspective is missing?
      How might this story be told differently by someone with a different stake in the outcome?
    </p>
  </ContextPanel>
</section>
```

**Design Consideration:** Use existing `ContextPanel` component (already in codebase) to keep consistent with Evidence Room aesthetic.

**Testing Checklist:**

- [ ] Text renders correctly on desktop/mobile
- [ ] ContextPanel toggle works (open/close)
- [ ] No layout shift when opening
- [ ] Links to "About Our Sources" page work (see Win #2)

---

## Quick Win #2: Add "About Our Sources" Navigation Link

**Effort:** 2-3 hours
**Impact Score:** 7/10
**Priority:** 2️⃣ DO SECOND
**Status:** Content ready, needs page + link

### What It Does

Creates a new page explaining what types of documents we have, how we selected them, and what research is ongoing.

### Why It Matters

- **Answers teacher questions** — "Can I use this with my class?" → direct link to methodology
- **Sets expectations** — Teachers/researchers know what to expect before diving in
- **Ongoing work signal** — Shows we're not static, we're actively expanding

### Implementation

**Location:** New page `/evidence/about-our-sources` with link from Evidence main nav

**Create File:** `/app/(main)/evidence/about-our-sources/page.tsx`

**Content:**

```typescript
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Our Sources | Evidence Room | Rocky Mount',
  description: 'How we select documents, what we include and exclude, and our methodology for historical verification.',
}

export default function AboutOurSources() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/evidence" className="mb-6 inline-block text-sm opacity-80 hover:opacity-100">
        ← Back to Evidence Room
      </Link>

      <h1 className="text-4xl font-serif mb-6">About Our Sources</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-serif mb-4">Selection Criteria</h2>
        <p className="mb-4">
          We include documents that directly illuminate the founding of Tennessee's government at Rocky Mount
          (1790-1792). This means:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Governor William Blount's correspondence during the territorial period</li>
          <li>Official government documents issued from Rocky Mount</li>
          <li>Treaties negotiated by Blount and his team</li>
          <li>Washington administration documents directly related to Rocky Mount</li>
          <li>Contemporary newspaper accounts from the Knoxville Gazette</li>
          <li>Records documenting Cherokee leadership and treaty signatories</li>
        </ul>
        <p className="italic text-sm opacity-80">
          We do NOT include: general Tennessee history unrelated to Rocky Mount,
          or documents about earlier/later periods unless they directly address the territorial government.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-serif mb-4">What We Have</h2>
        <p className="mb-4">
          Currently, our archive includes <strong>37 primary source documents</strong> in these categories:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Blount Correspondence</strong> (9 documents) — His letters to and from federal officials</li>
          <li><strong>Federal Correspondence</strong> (8 documents) — Washington, Jefferson, Knox on territorial governance</li>
          <li><strong>Treaties & Proclamations</strong> (4 documents) — Treaty of Holston, ratification, proclamations</li>
          <li><strong>Knoxville Gazette</strong> (14 documents) — First Tennessee newspaper, covering Rocky Mount period</li>
          <li><strong>Maps & Visual Records</strong> (2 documents) — Territory maps and site records</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-serif mb-4">What We Don't Have</h2>
        <p className="mb-4">
          We're transparent about gaps in our collection:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Cherokee-authored documents</strong> (0 currently) — We're actively seeking these through DigiTreaties and tribal partnerships</li>
          <li><strong>Enslaved peoples' voices</strong> — Historical records rarely captured these perspectives</li>
          <li><strong>Women's correspondence</strong> — Limited access to women's written records from this period</li>
          <li><strong>Settlement diaries</strong> — Working-class accounts are scarce but we're researching</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-serif mb-4">How We Verify Content</h2>
        <p className="mb-4">
          Each document carries a verification badge indicating confidence level:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Verified ✓</strong> — Cross-referenced with 2+ independent sources</li>
          <li><strong>Single Source</strong> — Based on one primary source document</li>
          <li><strong>Nuance ⚠️</strong> — Verified but requires important context</li>
          <li><strong>Under Review</strong> — Being verified, confidence pending</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-serif mb-4">For Educators</h2>
        <p className="mb-4">
          Our documents align with Tennessee K-12 standards on:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Southwest Territory (Grades 3-4 social studies)</li>
          <li>Tennessee statehood and founding era (Grades 4-5)</li>
          <li>Cherokee history and Treaty of Holston (Grades 5-8)</li>
          <li>Primary source analysis and historical literacy (All grades)</li>
        </ul>
        <p className="mt-4">
          View our <Link href="/educators" className="text-blue-600 hover:underline">educator resources</Link> for
          lesson plans and classroom activities using these documents.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-4">Help Us Expand</h2>
        <p className="mb-4">
          If you have information about Rocky Mount documents we should include, or if you're a
          Cherokee descendant with sources about the treaty signatories, we'd like to hear from you.
        </p>
        <p>
          Email: <a href="mailto:research@rockymounttnhs.org" className="text-blue-600 hover:underline">
            research@rockymounttnhs.org
          </a>
        </p>
      </section>
    </div>
  )
}
```

**Add Navigation Link:**
Update `/components/Navigation.tsx` NAV_LINKS array (around line 9) to add:

```typescript
{ href: '/evidence/about-our-sources', label: 'About Sources' }
```

Or add as footer link on Evidence page.

**Testing Checklist:**

- [ ] Page renders cleanly
- [ ] Links to /educators work
- [ ] Mobile layout is readable
- [ ] Back link returns to Evidence correctly

---

## Quick Win #3: Add Source Context Metadata to Document Pages

**Effort:** 2 hours per document, phased
**Impact Score:** 8/10
**Priority:** 3️⃣ DO THIRD
**Status:** Framework exists, needs population

### What It Does

Each document page gets a "Document Context" section showing who wrote it, when, to whom, and why—plus what perspectives are missing.

### Why It Matters

- **Teaches source criticism** — Students learn to ask "who benefits from this?"
- **Prevents misreading** — Understanding authorial intent prevents misinterpretation
- **Academic rigor** — Shows we understand archival methodology
- **Quick implementation** — Can be phased over time

### Implementation

**Location:** Existing document viewer at `/app/(main)/evidence/documents/[slug]/page.tsx`

**Add Component:**
Create `/components/evidence/DocumentContext.tsx`

```typescript
'use client'

import styles from './DocumentContext.module.css'

interface DocumentContextProps {
  author?: string
  recipient?: string
  date: string
  documentType: string
  sourcePath: string
  whoseVoice?: string
  whatsMissing?: string[]
}

export function DocumentContext({
  author,
  recipient,
  date,
  documentType,
  sourcePath,
  whoseVoice,
  whatsMissing,
}: DocumentContextProps) {
  return (
    <aside className={styles.context}>
      <div className={styles.contextItem}>
        <h4 className={styles.label}>Document Type</h4>
        <p className={styles.value}>{documentType}</p>
      </div>

      {author && (
        <div className={styles.contextItem}>
          <h4 className={styles.label}>Author</h4>
          <p className={styles.value}>{author}</p>
        </div>
      )}

      {recipient && (
        <div className={styles.contextItem}>
          <h4 className={styles.label}>Written To</h4>
          <p className={styles.value}>{recipient}</p>
        </div>
      )}

      <div className={styles.contextItem}>
        <h4 className={styles.label}>Date</h4>
        <p className={styles.value}>{date}</p>
      </div>

      <div className={styles.contextItem}>
        <h4 className={styles.label}>Source</h4>
        <p className={styles.value}>{sourcePath}</p>
      </div>

      {whoseVoice && (
        <div className={styles.contextItem}>
          <h4 className={styles.label}>Whose Voice?</h4>
          <p className={styles.value}>{whoseVoice}</p>
        </div>
      )}

      {whatsMissing && whatsMissing.length > 0 && (
        <div className={styles.contextItem}>
          <h4 className={styles.label}>What's Missing?</h4>
          <ul className={styles.missingList}>
            {whatsMissing.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
```

**Add to Document Viewer:**

```typescript
<DocumentContext
  author="William Blount"
  recipient="Secretary of War Henry Knox"
  date="October 20, 1790"
  documentType="Letter"
  sourcePath="Blount Papers, Tennessee Encyclopedia"
  whoseVoice="Territorial Governor's official perspective"
  whatsMissing={[
    "How Cherokee leaders viewed the same events",
    "Perspectives of enslaved individuals at Rocky Mount",
    "Frontier settler accounts (Blount was privileged)"
  ]}
/>
```

**Phased Approach:**

- Phase 1 (4 hours): Add to 3-5 most-visited documents
- Phase 2 (8 hours): Add to remaining 10-15 documents
- Phase 3 (ongoing): Complete archive as time allows

**Testing Checklist:**

- [ ] Metadata displays correctly
- [ ] Doesn't break document viewer layout
- [ ] Mobile-friendly
- [ ] Links to related documents work

---

## Quick Win #4: Create "Cherokee Treaty Signatories" Landing Page

**Effort:** 6-8 hours
**Impact Score:** 10/10
**Priority:** 4️⃣ DO FOURTH
**Status:** Data exists, needs presentation

### What It Does

Dedicated page at `/evidence/cherokee-signatories` showcasing all 40+ Cherokee leaders who signed the Treaty of Holston, with links to their individual pages (when available) and direct links to their signatures on DigiTreaties.

### Why It Matters

- **Tennessee Pride Achievement** — We're FIRST in Tennessee to document all signatories by name
- **Differentiator** — No other site has done this level of Cherokee representation
- **Student engagement** — Puts faces and names to history
- **Researcher value** — Scholars researching these individuals have one clear resource
- **Press hook** — "Rocky Mount becomes first Tennessee site to document all 40 Cherokee signatories"

### Implementation

**Create File:** `/app/(main)/evidence/cherokee-signatories/page.tsx`

```typescript
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPeople } from '@/lib/evidence/loader'

export const metadata: Metadata = {
  title: 'Cherokee Treaty Signatories | Evidence Room | Rocky Mount',
  description:
    'All 40+ Cherokee leaders who signed the Treaty of Holston on July 2, 1791. Rocky Mount is the first Tennessee historic site to document every signatory.',
}

export default async function CherokeSignatariesPage() {
  const allPeople = await getAllPeople()
  const signatories = allPeople
    .filter(p => p.is_cherokee && p.is_signatory)
    .sort((a, b) => {
      if (a.bio_type === 'full' && b.bio_type !== 'full') return -1
      if (a.bio_type !== 'full' && b.bio_type === 'full') return 1
      return a.name.localeCompare(b.name)
    })

  const fullBios = signatories.filter(p => p.bio_type === 'full')
  const basicRecords = signatories.filter(p => p.bio_type !== 'full')

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/evidence" className="mb-8 inline-block text-sm opacity-80 hover:opacity-100">
        ← Back to Evidence Room
      </Link>

      <header className="mb-12">
        <span className="inline-block mb-4 text-sm uppercase tracking-wider text-gold">
          TREATY.1791.001
        </span>
        <h1 className="text-5xl font-serif mb-4">Cherokee Treaty Signatories</h1>
        <p className="text-lg opacity-90 mb-6">
          All 40+ Cherokee leaders who signed the Treaty of Holston on July 2, 1791.
          <strong> Rocky Mount is the first Tennessee historic site to document every signatory.</strong>
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-8">
          <p className="text-sm">
            <strong>Tennessee Pride Achievement:</strong> These 40+ individuals—diplomats, warriors,
            strategists—shaped Tennessee's founding. Understanding their leadership makes our state's
            story richer and more honest.
          </p>
        </div>
      </header>

      {/* Featured Leaders */}
      <section className="mb-12">
        <h2 className="text-3xl font-serif mb-6">Featured Leaders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fullBios.map(person => (
            <article
              key={person.id}
              className="border border-gold-200 rounded p-6 bg-gradient-to-br from-gold-50 to-transparent"
            >
              <h3 className="text-xl font-serif mb-2">
                {person.name_cherokee && (
                  <div className="text-sm text-gold font-normal">{person.name_cherokee}</div>
                )}
                {person.name}
              </h3>
              {person.role && <p className="text-sm opacity-80 mb-3">{person.role}</p>}
              {person.bio_short && <p className="text-sm mb-4">{person.bio_short}</p>}
              <Link href={`/evidence/people/${person.id}`} className="text-blue-600 hover:underline text-sm">
                Read full biography →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Complete Signatory List */}
      <section className="mb-12">
        <h2 className="text-3xl font-serif mb-6">Complete Signatory List</h2>
        <p className="text-sm opacity-80 mb-6">
          All {signatories.length} documented signatories. Click names to view individual pages
          (coming soon for all). Click treaty link to see their signature on the original manuscript.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {basicRecords.map(person => (
            <div key={person.id} className="border border-gray-200 rounded p-4 hover:bg-gray-50">
              <div className="font-serif font-semibold mb-2">
                {person.name_cherokee && (
                  <div className="text-xs text-gold font-normal">{person.name_cherokee}</div>
                )}
                {person.bio_type === 'basic' &&
                  <Link href={`/evidence/people/${person.id}`} className="hover:text-blue-600">
                    {person.name}
                  </Link>
                }
                {person.bio_type !== 'basic' && person.name}
              </div>
              {person.role && person.role !== 'Signatory' && (
                <p className="text-sm text-gray-600 mb-2">{person.role}</p>
              )}
              {person.town && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="opacity-70">Town:</span> {person.town}
                </p>
              )}
              {person.signature_url && (
                <a
                  href={person.signature_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  View signature on treaty ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Full Treaty Manuscript */}
      <section className="bg-blue-50 border border-blue-200 rounded p-8 text-center">
        <h3 className="text-2xl font-serif mb-4">View the Complete Treaty</h3>
        <p className="mb-6">
          See the 23-page original treaty manuscript with all signatures on DigiTreaties:
        </p>
        <a
          href="https://digitreaties.org/treaties/treaty/88697242/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          View Treaty Manuscript on DigiTreaties →
        </a>
      </section>

      {/* Research Note */}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-serif mb-4">Research Note</h3>
        <p className="text-sm opacity-80">
          These 40+ signatories represent documented Cherokee leaders from the original treaty manuscript.
          We continue researching their full biographies and descendants. If you have information about any
          of these leaders or their families, please contact us at research@rockymounttnhs.org.
        </p>
      </section>
    </div>
  )
}
```

**Add to Evidence Navigation:**
Update Evidence page `<nav>` section to include:

```typescript
<Link href="/evidence/cherokee-signatories" className={styles.heroNavCard}>
  <span className={styles.heroNavIcon}>★</span>
  <span className={styles.heroNavName}>Cherokee Signatories</span>
</Link>
```

**Testing Checklist:**

- [ ] All names render correctly
- [ ] Links to individual person pages work
- [ ] DigiTreaties links open correctly
- [ ] Mobile layout is clean
- [ ] Page loads quickly with data

---

## Quick Win #5: Update Homepage Hero Text with Tennessee Pride Messaging

**Effort:** 2-3 hours
**Impact Score:** 6/10
**Priority:** 5️⃣ DO FIFTH
**Status:** Text ready, needs implementation

### What It Does

Updates the Evidence page hero section to explicitly frame Cherokee inclusion and documentary completeness as **Tennessee pride**.

### Why It Matters

- **Reframes narrative** — Not "adding voices we left out" but "telling the fuller, richer story"
- **Attracts different audiences** — Patriots can love this too
- **Press hook** — "Tennessee site leads on historical completeness"

### Implementation

**Current Text** (from `/evidence/page.tsx` line 217-219):

```typescript
<p className={styles.heroBadge}>The Rocky Mount Archives</p>
<h1 className={styles.heroTitle}>The Evidence Room</h1>
<p className={styles.heroSubtitle}>
  Primary documents from the founding of Tennessee&apos;s government
</p>
```

**Updated Text:**

```typescript
<p className={styles.heroBadge}>The Rocky Mount Archives</p>
<h1 className={styles.heroTitle}>The Evidence Room</h1>
<p className={styles.heroSubtitle}>
  Tennessee Starts Here—The Complete Story. Primary documents from the founding of our state,
  including the 40+ Cherokee leaders who shaped it.
</p>
```

**OR (More Concise):**

```typescript
<p className={styles.heroBadge}>The Rocky Mount Archives</p>
<h1 className={styles.heroTitle}>Tennessee Starts Here</h1>
<p className={styles.heroSubtitle}>
  The Evidence Room: Complete documents from Tennessee's founding, with the Cherokee signatories
  who negotiated it.
</p>
```

**Alternative (Even More Compelling):**

```typescript
<p className={styles.heroBadge}>The Rocky Mount Archives</p>
<h1 className={styles.heroTitle}>The Evidence Room</h1>
<p className={styles.heroSubtitle}>
  Explore primary documents from the founding of Tennessee—including the 40+ Cherokee leaders,
  like Hanging Maw and Bloody Fellow, who negotiated the future of our state.
</p>
```

**Additional Change:**
Update the `<EntryRoom />` section to emphasize Cherokee signatories as a distinct, proud feature (not buried).

**Testing Checklist:**

- [ ] Text fits in hero on all screen sizes
- [ ] No layout shift on hero updates
- [ ] Links work
- [ ] Messaging resonates across audiences

---

## Implementation Order & Timeline

### Phase 1: Week 1 (Quick Trust Wins)

1. **Add Bias Disclosure** (4-6 hours)
2. **Add Navigation Link + About Our Sources page** (2-3 hours)

**Target:** Evidence pages now have transparency signals
**Benefit:** Immediate credibility boost for educators and researchers

### Phase 2: Week 2 (Tennessee Pride)

3. **Update Hero Text** (2-3 hours)
4. **Create Cherokee Signatories Page** (6-8 hours)

**Target:** Front-and-center positioning of our unique differentiator
**Benefit:** Press release hook ready, visitors see Cherokee leadership immediately

### Phase 3: Ongoing (Incremental Value)

5. **Add Document Context** (2 hours per document, phased)

**Target:** All 37 documents eventually have source criticism metadata
**Benefit:** Continuous improvement to educational value

---

## Quick Wins Success Metrics

### Immediate (Week 1-2)

- [ ] Bias disclosure visible on Evidence page
- [ ] "About Our Sources" link in navigation working
- [ ] Cherokee Signatories page live and linked
- [ ] Homepage/hero text updated with Tennessee pride messaging

### Short-term (Month 1)

- [ ] 5+ documents with context metadata complete
- [ ] Zero user confusion about archive scope (feedback)
- [ ] Educator interest in using archive (track visits from schools)

### Medium-term (Month 3)

- [ ] All 37 documents have context metadata
- [ ] School bookings show interest in Evidence Room
- [ ] Media coverage of "First Tennessee site to document all signatories"

### Long-term (Month 6)

- [ ] Increased grant competitiveness noted in applications
- [ ] University researcher inquiries about Cherokee signatories
- [ ] Cherokee community engagement via contact form
- [ ] Cited in other Tennessee sites as model

---

## Files to Modify/Create

### Modify

- `/app/(main)/evidence/page.tsx` (add bias disclosure section + update hero)
- `/components/Navigation.tsx` (add About Our Sources link)

### Create

- `/app/(main)/evidence/about-our-sources/page.tsx` (new page)
- `/app/(main)/evidence/cherokee-signatories/page.tsx` (new page)
- `/components/evidence/DocumentContext.tsx` (new component, optional)

### Optional

- `/components/evidence/DocumentContext.module.css` (styling for metadata)

---

## Resource Links

**Pre-Drafted Content:**

- Bias disclosure text: `EVIDENCE-ARCHIVE-REVIEW.md` lines 176-192
- Implementation notes: `2026-01-28-evidence-transparency-engine.md`

**Existing Components to Reuse:**

- `ContextPanel.tsx` — for collapsible sections
- `TimelineEvent` — for consistent styling
- Navigation structure — already supports new links

**DigiTreaties Integration:**

- Treaty link: `https://digitreaties.org/treaties/treaty/88697242/`
- Used throughout existing Evidence pages

---

## Notes

1. **No Research Required** — All content is either drafted or derived from existing documentation
2. **Low Risk** — These are additive improvements, no existing content removed
3. **High Reusability** — Document context pattern can be used for all 37 documents over time
4. **Tennessee Pride Throughout** — Each win reframes existing work as achievement, not apology
5. **Phased Approach** — Can implement all 5 in order, or pick 2-3 to start and iterate

---

**Document prepared:** January 29, 2026
**Next steps:** Pick Quick Win #1 to implement first, verify with Navigation/ContextPanel components, then proceed to #2-5 in order.
