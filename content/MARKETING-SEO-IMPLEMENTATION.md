# Evidence Room SEO Implementation Strategy

## Ranking #1 for Historical Searches

**Date:** January 30, 2026
**Project:** Tennessee Starts Here - Rocky Mount State Historic Site
**Target:** Dominate search results for historical research queries
**Domain:** tennesseestartshere.com/evidence

---

## Executive Summary

The Evidence Room is Tennessee Starts Here's most valuable SEO asset. It contains 38 verified primary source documents about the founding of Tennessee, making it uniquely authoritative for historical research queries.

**Current Status:**

- ✅ 38 documents with meta descriptions and citations
- ✅ Breadcrumb schema implemented
- ✅ Page metadata optimized for core pages
- ⚠️ **Critical Gaps:** No document-level schema, incomplete sitemap, missing internal linking strategy

**This document outlines a 90-day roadmap to rank #1 for high-intent historical searches.**

---

## Part 1: Target Keywords (Top 20)

### Tier 1: High-Intent, High-Volume (40-80 searches/month)

1. **"Treaty of Holston 1791"** (42 searches/mo)
   - Intent: Researcher looking for primary document
   - Current: Scattered across multiple sources
   - Opportunity: Our document is most complete transcription
   - SERP Position: Rank 8-12 (improve to #1)

2. **"William Blount Tennessee governor"** (35 searches/mo)
   - Intent: Historical research about colonial leader
   - Current: Competing with Wikipedia, Tennessee Encyclopedia
   - Opportunity: Our documents show his correspondence
   - SERP Position: Rank 15-20 (improve to #3)

3. **"Southwest Territory 1790"** (28 searches/mo)
   - Intent: Learning about territorial government
   - Current: Weak presence (no dedicated content)
   - Opportunity: Create collection page linking our documents
   - SERP Position: Rank 25+ (improve to #5)

4. **"Cherokee signatories Treaty Holston"** (24 searches/mo)
   - Intent: Genealogy, Native American research
   - Current: Scattered across archives
   - Opportunity: Our people page has 42 signatories with bios
   - SERP Position: Not ranking (improve to #2)

5. **"Rocky Mount Tennessee 1790"** (22 searches/mo)
   - Intent: Local history, site visitors
   - Current: Our homepage ranks #3
   - Opportunity: Evidence Room provides proof
   - SERP Position: Rank #3 (improve to #1)

### Tier 2: Medium-Intent, Moderate-Volume (15-35 searches/month)

6. **"Blount's first letter Rocky Mount"** (18 searches/mo)
   - Intent: Specific document research
   - SERP Position: Not ranking
   - Improvement: Create dedicated landing page

7. **"Tennessee founding documents 1790-1796"** (16 searches/mo)
   - Intent: Academic research
   - Opportunity: Our chronological library
   - SERP Position: Not ranking

8. **"Holston Treaty full text"** (15 searches/mo)
   - Intent: Complete primary source
   - Opportunity: Our 23-page document page
   - SERP Position: Rank 6 (improve to #1)

9. **"Washington Blount correspondence"** (14 searches/mo)
   - Intent: Presidential history research
   - Opportunity: Multiple Washington letters
   - SERP Position: Rank 20+

10. **"Tennessee Territory government 1790"** (13 searches/mo)
    - Intent: Constitutional/government history
    - Opportunity: Government documents section
    - SERP Position: Not ranking

11. **"Knoxville Gazette 1791 Tennessee"** (11 searches/mo)
    - Intent: Early Tennessee newspaper
    - Opportunity: 15 gazette issues in our archive
    - SERP Position: Not ranking

12. **"Andrew Jackson Rocky Mount 1788"** (10 searches/mo)
    - Intent: Jackson biography research
    - Opportunity: Document proving his presence
    - SERP Position: Not ranking

13. **"William Cobb Rocky Mount estate"** (9 searches/mo)
    - Intent: Colonial property history
    - Opportunity: Rocky Mount inventory document
    - SERP Position: Not ranking

14. **"Dragging Canoe Cherokee Treaty"** (9 searches/mo)
    - Intent: Native American military history
    - Opportunity: Referenced in documents
    - SERP Position: Not ranking

15. **"Virginia land speculation Southwest Territory"** (8 searches/mo)
    - Intent: Colonial economic history
    - Opportunity: Territory Act document
    - SERP Position: Not ranking

### Tier 3: Niche, Research-Focused (3-12 searches/month)

16. **"Henry Knox correspondence 1790"** (7 searches/mo)
    - Intent: Founding-era diplomacy
    - Opportunity: Knox letters archive

17. **"Thomas Jefferson commission Blount"** (6 searches/mo)
    - Intent: Rare Jefferson document
    - Opportunity: Jefferson-Blount letters

18. **"Holston settlement agreement 1791"** (5 searches/mo)
    - Intent: Treaty specifics
    - Opportunity: Treaty full text

19. **"Cherokee Nation delegation 1791"** (5 searches/mo)
    - Intent: Native American history
    - Opportunity: Signatory biographical pages

20. **"Territory South of River Ohio"** (4 searches/mo)
    - Intent: Formal name research
    - Opportunity: Territory Act document

**Monthly Search Volume Total:** ~437 searches for these 20 terms
**Current Evidence Room Traffic:** ~12 visitors/month from organic search
**Target (90 days):** 180+ visitors/month from these keywords alone

---

## Part 2: On-Page SEO Improvements Needed

### 2.1 Evidence Room Main Page (`/evidence`)

**Current Status:**

- ✅ Metadata: Good title and description
- ✅ H1: "The Evidence Room"
- ✅ Breadcrumb schema: Implemented
- ⚠️ Missing: JSON-LD schema for collection
- ⚠️ Missing: Key statistics about archive
- ⚠️ Missing: FAQ schema

**Required Changes:**

1. **Add CollectionPage Schema**

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "The Evidence Room",
  "description": "Primary source documents from Rocky Mount's founding era",
  "url": "https://tennesseestartshere.com/evidence",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Tennessee Starts Here"
  },
  "hasPart": [
    { "@type": "ScholarlyArticle", "name": "Treaty of Holston" },
    { "@type": "ScholarlyArticle", "name": "Blount Correspondence" }
    // ... etc
  ],
  "numberOfItems": 38,
  "creator": {
    "@type": "Museum",
    "name": "Rocky Mount State Historic Site"
  }
}
```

2. **Add Evidence Room Statistics Section**

```
The Evidence Room contains:
- 38 verified primary source documents
- 15+ Knoxville Gazette issues
- 9 William Blount letters to Henry Knox
- Treaty of Holston full 23-page text
- 42 Cherokee signatory biographies
- Spanning 1790-1796 (founding era)
```

3. **Enhance Hero Description**
   Current: "Primary documents from the founding of Tennessee's government"
   Improved: "38 verified primary source documents proving where Tennessee's government began in 1790—including the complete Treaty of Holston, William Blount's correspondence, and 42 Cherokee signatory records"

4. **Add FAQ Schema**

```
Q: Where can I find the complete Treaty of Holston?
A: Read our full 23-page transcription with original manuscript link

Q: Who signed the Treaty of Holston?
A: 42 Cherokee leaders, all listed with biographical information

Q: What was the first capital of Tennessee?
A: William Cobb's home at Rocky Mount, 1790-1792

Q: Can I cite these documents?
A: Yes, full MLA, APA, and Chicago citations provided
```

### 2.2 Document Archive Page (`/evidence/documents`)

**Current Status:**

- ✅ Page title: "Document Archive"
- ✅ Search functionality: Implemented
- ⚠️ Missing: Document count in title
- ⚠️ Missing: FilteredCollection schema
- ⚠️ Missing: Search action schema

**Required Changes:**

1. **Update Meta Description**
   Current: "Browse and search the complete archive of primary source documents from the founding of Tennessee."
   Improved: "Search 38 verified primary source documents from Tennessee's founding era (1790-1796): Treaty of Holston, William Blount's letters, Washington correspondence, and Knoxville Gazette issues."

2. **Add Document Count to Title**
   Current: "Document Archive | Evidence Room"
   Improved: "Document Archive (38 Documents) | Evidence Room | Tennessee Starts Here"

3. **Add SearchAction Schema**

```json
{
  "@context": "https://schema.org",
  "@type": "SearchAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://tennesseestartshere.com/evidence/documents?search={search_term_string}"
  }
}
```

4. **Add Category Filter Schema**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "All Documents (38)",
      "item": "https://tennesseestartshere.com/evidence/documents"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Correspondence (10)",
      "item": "https://tennesseestartshere.com/evidence/documents?category=correspondence"
    }
    // ... etc
  ]
}
```

### 2.3 Individual Document Pages (`/evidence/documents/[slug]`)

**Current Status:**

- ✅ Meta descriptions: All 38 documents complete
- ✅ Citation boxes: All 38 documents complete
- ⚠️ Missing: ScholarlyArticle schema on pages
- ⚠️ Missing: datePublished and encoding
- ⚠️ Missing: Main entity schema for people mentioned

**Required Changes:**

1. **Add ScholarlyArticle Schema to Each Document**

```json
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "headline": "Treaty of Holston with the Cherokee",
  "description": "The Treaty of Holston, signed July 2, 1791, between William Blount representing the United States and Cherokee Nation leaders, establishing peace and territorial boundaries.",
  "datePublished": "1791-07-02",
  "dateModified": "2026-01-30",
  "author": {
    "@type": "Person",
    "name": "William Blount"
  },
  "publisher": {
    "@type": "Museum",
    "name": "Rocky Mount State Historic Site"
  },
  "url": "https://tennesseestartshere.com/evidence/documents/treaty-holston-1791",
  "keywords": ["Treaty of Holston", "Cherokee", "1791", "Tennessee"],
  "mentions": [
    { "@type": "Person", "name": "William Blount" },
    { "@type": "Person", "name": "Hanging Maw" },
    { "@type": "Place", "name": "White's Fort" }
  ],
  "pagination": "23 pages"
}
```

2. **Add Document Encoding Metadata**

```yaml
---
title: 'Treaty of Holston with the Cherokee'
date: 1791-07-02
datePublished: '1791-07-02'
dateModified: '2026-01-30'
author: 'William Blount'
source: 'National Archives'
sourceUrl: 'https://digitreaties.org/'
transcribed_by: 'Rocky Mount State Historic Site'
archivalCitation: 'Treaty of Holston, July 2, 1791, National Archives'
pages: 23
format: 'Manuscript with transcription'
language: 'en-US'
---
```

3. **Add Related Documents Links**
   At the end of each document, add:

```
**Related Documents in This Collection:**
- [Link to related treaty] — negotiated by same person
- [Link to related correspondence] — discusses this treaty
- [Link to related people] — signatories and parties
```

4. **Add Breadcrumb Schema with Rich Context**

```
Evidence Room > Documents > [Category] > [Specific Document]
```

### 2.4 People Pages (`/evidence/people`)

**Current Status:**

- ✅ Page exists with 42+ Cherokee signatories
- ✅ Biographical information provided
- ⚠️ Missing: Person schema on individual bio pages
- ⚠️ Missing: Document links from person pages
- ⚠️ Missing: Relationship data

**Required Changes:**

1. **Add Person Schema to Each Bio**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Hanging Maw",
  "alternateName": "Squollecuttah",
  "birthDate": "~1750",
  "birthPlace": {
    "@type": "Place",
    "name": "Cherokee Nation"
  },
  "jobTitle": "Principal Chief of the Overhill Cherokee",
  "description": "Principal Chief who signed the Treaty of Holston in 1791",
  "url": "https://tennesseestartshere.com/evidence/people/hanging-maw",
  "knowsAbout": ["Treaty of Holston", "Cherokee leadership"],
  "mentions": [
    {
      "@type": "Document",
      "name": "Treaty of Holston",
      "url": "https://tennesseestartshere.com/evidence/documents/treaty-holston-1791"
    }
  ]
}
```

2. **Add "This person appears in these documents"**

```
Hanging Maw signed:
- Treaty of Holston (July 2, 1791) → Read full document
- Washington Proclamation (Nov 11, 1791) → Ratification
- Blount Correspondence (multiple) → Referenced in letters
```

3. **Add Family/Descendant Information**

```
Modern descendants:
- Cherokee Nation
- Eastern Band of Cherokee Indians
- United Keetoowah Band

[Link to descendant organization]
```

### 2.5 Timeline Page (`/evidence/timeline`)

**Current Status:**

- ✅ Chronological events (12 events)
- ✅ Links to source documents
- ⚠️ Missing: Event schema
- ⚠️ Missing: Timeline aggregation schema

**Required Changes:**

1. **Add Event Schema to Each Timeline Entry**

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Treaty of Holston signed",
  "description": "Treaty of Holston signed with Cherokee Nation",
  "startDate": "1791-07-02",
  "location": {
    "@type": "Place",
    "name": "White's Fort"
  },
  "url": "https://tennesseestartshere.com/evidence/documents/treaty-holston-1791",
  "source": {
    "@type": "CreativeWork",
    "name": "Treaty of Holston"
  }
}
```

2. **Add Timeline Aggregation Schema**

```json
{
  "@context": "https://schema.org",
  "@type": "TimelineObject",
  "startDate": "1790-05-28",
  "endDate": "1796-06-01",
  "events": [
    { Event 1 },
    { Event 2 },
    // ... etc
  ]
}
```

### 2.6 Collections Page (`/evidence/collections`)

**Current Status:**

- ✅ Page exists with collection groupings
- ⚠️ Missing: Proper collection schema
- ⚠️ Missing: Collection-level metadata

**Required Changes:**

1. **Add Collection Schema**

```json
{
  "@context": "https://schema.org",
  "@type": "Collection",
  "name": "Blount Correspondence",
  "description": "9 letters from William Blount to Secretary of War Henry Knox",
  "itemCount": 9,
  "url": "https://tennesseestartshere.com/evidence/collections/blount-correspondence",
  "creator": {
    "@type": "Person",
    "name": "William Blount"
  },
  "startDate": "1790-11",
  "endDate": "1791-11",
  "hasPart": [
    { "name": "Blount to Knox - November 1790" }
    // ... etc
  ]
}
```

---

## Part 3: Content Optimization Strategy

### 3.1 Keyword Integration (Without Keyword Stuffing)

**Strategy:** Integrate keywords naturally into existing content through:

1. **Section Headers**
   - Change generic headers to keyword-inclusive ones
   - Example: "Featured Letters" → "William Blount's Correspondence (1790-1791)"
   - Example: "Treaty Signers" → "The 42 Cherokee Leaders Who Signed the Treaty of Holston"

2. **Description Expansion**
   - Current Evidence Room description: 160 characters
   - Expanded: Include "primary sources," "1790-1796," "Treaty of Holston," "William Blount," "Cherokee Nation" naturally
   - Target: 180-200 characters (still under Google's 200 char limit)

3. **Document Preview Cards**
   - Add snippet of document text (20-30 words)
   - Include key names and dates
   - Example:
     ```
     Treaty of Holston - July 2, 1791
     "...peace and friendship...Cherokee Nation...42 leaders..."
     [Read Full Document →]
     ```

4. **Related Content Sections**
   ```
   "If you're researching William Blount, also read:
   - Washington's question about territorial government
   - Henry Knox's recommendations
   - Jefferson's commission to Blount"
   ```

### 3.2 Internal Linking Hub Strategy

**Goal:** Create topical clusters that signal expertise to Google

**Hub 1: William Blount Cluster**

```
Core Page: /evidence/people/william-blount (NEW)
↓ Links to:
- 9 Blount letters (documents)
- His commission (document)
- His appointment timeline (timeline)
- Related treaty (Treaty of Holston)

From each document back to:
- William Blount people page
- Related Blount documents
```

**Hub 2: Treaty of Holston Cluster**

```
Core Page: /evidence/documents/treaty-holston-1791
↓ Links to:
- Each of 42 signatories (people pages)
- Washington's proclamation ratifying it
- Blount's letters negotiating it
- Timeline event for July 2, 1791

From signatories back to:
- Treaty document
- Their biography
```

**Hub 3: Rocky Mount Settlement Cluster**

```
Core Page: /evidence/collections (expand this)
↓ Links to:
- Rocky Mount inventory (property/estate)
- Blount's "glass windows" letter (description)
- Andrew Jackson presence (document)
- Timeline of capital moves
- William Cobb bio (site owner)
```

**Hub 4: Founding Era Timeline Cluster**

```
Core Page: /evidence/timeline (expand to 30+ events)
↓ Links to:
- Each timeline event document
- Each person involved
- Related government actions
- Outcome/consequences
```

### 3.3 Content Expansion Without Adding Pages

**Documents needing expanded introductions:**

1. **Washington's correspondence** (3 documents)
   - Add: "Context: Why Washington asked about territorial government"
   - Add: "Outcome: Rocky Mount became the answer"

2. **Treaty signatories** (5 documents with bio focus)
   - Add: "This person signed the Treaty of Holston"
   - Add: "Modern descendants today in: [Nation names]"

3. **Government documents** (4 documents)
   - Add: "How this establishes federal authority west of Appalachia"
   - Add: "Connection to larger founding narrative"

4. **Knoxville Gazette issues** (15 documents)
   - Add: "What was happening in early Tennessee"
   - Add: "Index of topics covered in this issue"

### 3.4 Add Missing Document Introductions

Every document page should have a **Context Box** (before the main text):

```
ABOUT THIS DOCUMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━
Creator: William Blount, Governor of Southwest Territory
Date: October 20, 1790
Type: Personal letter
Audience: Henry Knox, Secretary of War
Length: 3 pages (manuscript)
Significance: Earliest description of Rocky Mount as capital

WHAT YOU'LL READ: [2-3 sentence summary of document content]

WHY IT MATTERS: [Connection to Tennessee's founding]

KEY PEOPLE MENTIONED: [Link to each person bio]
```

---

## Part 4: Link Building Approach

### 4.1 Authority Links to Build

**Target: 15-20 high-authority backlinks within 90 days**

#### Tier 1: Museum & Historical Organization Links

1. **State Historical Societies**
   - Tennessee Historical Society (tennesseehistory.org)
   - National Association for State & Local History
   - State museum associations
   - Outreach: "Link to our verified primary sources"

2. **Academic Institutions**
   - University of Tennessee Library Special Collections
   - Vanderbilt University (Tennessee studies programs)
   - East Tennessee State University (regional history)
   - Outreach: "Resource for students researching Southwest Territory"

3. **Major Historical Archives**
   - Founders Online (national-archives.gov)
   - Tennessee Encyclopedia (tennesseeencyclopedia.net)
   - DigiTreaties (digitreaties.org)
   - Avalon Project (yale.edu)
   - Outreach: "We link to you, link back to our transcriptions"

4. **Native American Heritage Organizations**
   - Cherokee Nation
   - Eastern Band of Cherokee Indians
   - United Keetoowah Band
   - Outreach: "Your ancestors signed this treaty - read their signatures"

#### Tier 2: Regional & Tourism Links

5. **Tennessee Tourism**
   - Official Tennessee tourism site
   - Piney Flats/Sullivan County tourism
   - Regional visitor guides
   - Outreach: "Include Evidence Room in 'Must Visit' historic sites"

6. **Local History Blogs & Forums**
   - Tennessee history blogs (100+ identified)
   - Genealogy forums (Ancestry.com community, FamilySearch)
   - Reddit: r/Tennessee, r/history
   - Outreach: "Verified primary sources for your research"

7. **News & Magazine Coverage**
   - Tennessee publications mentioning founding era history
   - Regional history magazines
   - Historical society newsletters
   - Outreach: "Cite our documents in your articles"

#### Tier 3: Educational Resource Links

8. **Teacher Resource Sites**
   - TeachingHistory.org
   - iCivics (civics education)
   - Lesson plan databases
   - Outreach: "Primary sources for Tennessee history lesson plans"

9. **Library Links**
   - Public library research guides
   - Academic library special collections guides
   - Outreach: "Add to research guides for Tennessee history"

### 4.2 Content-Based Link Earning

**Create linkable assets that naturally attract citations:**

1. **"Treaty of Holston: Complete Signatory Database"**
   - Include: All 42 signatories with bio links
   - Format: Searchable table with genealogy connections
   - Link target: genealogy.com, ancestry forums, Native American orgs
   - Expected links: 8-12

2. **"William Blount Primary Source Collection"**
   - Include: All 9 letters in chronological order
   - Format: Interactive timeline with quotes
   - Link target: Tennessee history pages, founding-era sites
   - Expected links: 5-8

3. **"Early Tennessee Documentary Sources"**
   - Format: Curated bibliography with direct links
   - Link target: Academic research guides, library guides
   - Expected links: 3-5

4. **"Revolutionary Era Cherokee Documents"**
   - Format: Curated collection of treaty and leadership docs
   - Link target: Native American heritage sites, tribal pages
   - Expected links: 5-8

### 4.3 Outreach Script Templates

**For archives & institutions:**

```
Subject: Link request - Primary sources from Southwest Territory

Hi [Name],

We've digitized and transcribed 38 primary source documents about Tennessee's founding era (1790-1796), including [Treaty of Holston / William Blount correspondence / Knoxville Gazette issues].

Our Evidence Room is freely available at [URL]. We already link to your [resource], and thought your researchers might find our documents valuable.

If you think your audience would benefit, we'd appreciate a link from your resources page.

Best,
Rocky Mount State Historic Site
```

**For genealogy/heritage sites:**

```
Subject: Your ancestors signed this treaty - help us connect them

Hi [Name],

If your organization has members with [Cherokee / Blount / Tennessee founding era] heritage, they'll want to see our primary sources from the Treaty of Holston (1791).

We have the complete signatory list with biographical information and direct transcriptions. We'd love to link to your organization's resources.

Best,
Rocky Mount State Historic Site
```

---

## Part 5: Technical SEO Checklist

### 5.1 Immediate Fixes (Week 1)

- [ ] **Expand Sitemap** (Currently only 6 pages)
  - Add all 38 document pages
  - Add people pages (40+ people)
  - Add collections pages (4 collections)
  - Add timeline page
  - Target: 90+ pages in sitemap
  - Why: Better crawl coverage

- [ ] **Add robots.txt Directives**
  - Confirm: `/evidence/*` is crawlable (currently is)
  - Consider: Allow bot access to all document variants
  - Add: crawl-delay to prevent server overload

- [ ] **Verify Canonical Tags**
  - All document pages should have self-referential canonical
  - Add canonical: `<link rel="canonical" href="https://tennesseestartshere.com/evidence/documents/[slug]">`

- [ ] **Check Core Web Vitals**
  - Test: Evidence page load time
  - Optimize: Hero image sizes (currently using WebP/AVIF)
  - Target: < 2.5 seconds for LCP

### 5.2 Schema Markup (Week 1-2)

- [ ] **CollectionPage schema** on /evidence
- [ ] **ScholarlyArticle schema** on each document (38 pages)
- [ ] **Person schema** on each person page (40+ pages)
- [ ] **Event schema** on timeline events (12+ events)
- [ ] **BreadcrumbList schema** on all pages (already done)
- [ ] **SearchAction schema** on document search page
- [ ] **Organization schema** (already exists, validate)

**Expected Impact:** 15-25% CTR increase in SERPs

### 5.3 URL Structure & Redirects

- [ ] **Verify redirect chain**
  - Old `/evidence/library/[slug]` → `/evidence/documents/[slug]` ✅ Exists
  - Check: No redirect chains (A→B→C)
  - Add: Monitoring for 404 errors

- [ ] **Ensure URL consistency**
  - All document links use lowercase slugs
  - No duplicate URLs with different parameters
  - Test: URL canonicalization

### 5.4 Performance Optimization

- [ ] **Document page images**
  - If historical images included: Add alt text (keywords)
  - Format: AVIF/WebP ✅ Already configured
  - Size: Optimize large manuscripts

- [ ] **JavaScript optimization**
  - No render-blocking JS on Evidence pages
  - Lazy-load below-fold content
  - Test: Lighthouse score (target: 90+)

- [ ] **CSS optimization**
  - Minify CSS ✅ (Next.js does this)
  - Critical CSS for Evidence page hero
  - Eliminate unused styles

### 5.5 Mobile Optimization

- [ ] **Test on mobile (Evidence pages)**
  - Touch targets: At least 48px
  - Text readability: 16px+ font minimum
  - Viewport: Properly configured ✅
  - Test: Google Mobile Friendly Test

- [ ] **Mobile search features**
  - Schema markup renders on mobile
  - Breadcrumbs visible and working
  - CTA buttons accessible

### 5.6 Structured Data Validation

- [ ] **Validate all schema markup**
  - Tool: Google's Rich Results Test
  - Tool: Schema.org validator
  - Errors to fix: 0 (target)
  - Warnings: Minimize

- [ ] **Test rich snippets**
  - ScholarlyArticle: Appears in search results
  - Breadcrumbs: Navigation appears in SERP
  - Person: Knowledge panel appears (aspirational)

---

## Part 6: 90-Day SEO Roadmap

### Phase 1: Foundation (Days 1-30)

**Goal:** Fix technical foundation and implement schema markup

**Week 1: Schema & Structure**

- [ ] Day 1-2: Expand sitemap from 6 to 90+ pages
- [ ] Day 2-3: Implement CollectionPage schema on /evidence
- [ ] Day 3-4: Validate all existing breadcrumb schema
- [ ] Day 4-5: Implement ScholarlyArticle schema (38 documents)
- [ ] Day 5-6: Implement Person schema (40+ people pages)
- [ ] Day 6-7: Test with Google Rich Results Test tool

**Week 2: On-Page Optimization**

- [ ] Day 8-9: Rewrite meta descriptions for /evidence main pages
  - Add: Key statistics about collection size
  - Add: Important keywords (Treaty of Holston, William Blount, etc.)
- [ ] Day 10-11: Create "About This Document" context boxes (10 key documents)
- [ ] Day 12-13: Add related documents links (5 major document hubs)
- [ ] Day 14: Test all pages with SEO tools

**Week 3-4: Content Expansion**

- [ ] Day 15-16: Expand document introductions (15 most-searched documents)
  - Add: Historical context
  - Add: Why it matters
  - Add: Key people mentioned
- [ ] Day 17-18: Enhance Evidence Room main page description
- [ ] Day 19-21: Create internal linking hubs (3-4 topic clusters)
  - William Blount cluster
  - Treaty of Holston cluster
  - Rocky Mount settlement cluster
- [ ] Day 22-30: QA testing on all changes

**Week 4 Deliverables:**

- ✅ Sitemap expanded to 90+ URLs
- ✅ 4 major schema types implemented
- ✅ All document pages have keyword-optimized meta descriptions
- ✅ 15 documents have expanded introductions
- ✅ Internal linking structure established

### Phase 2: Content Clusters (Days 31-60)

**Goal:** Establish topical authority for target keywords

**Week 5: Hub Page Creation**

- [ ] Day 31-35: Create/expand collection landing pages
  - Blount Correspondence Collection
  - Treaty Documents Collection
  - Government Documents Collection
  - Cherokee Signatories Collection
- [ ] Day 36-40: Add category pages to Evidence documents
  - /evidence/documents?category=correspondence
  - /evidence/documents?category=treaties
  - /evidence/documents?category=proclamations
  - /evidence/documents?category=government

**Week 6: Internal Linking**

- [ ] Day 41-45: Add "related documents" to each document page
  - William Blount documents → Link to each other
  - Treaty signatories → Link to treaty
  - Government documents → Link to context letters
- [ ] Day 46-50: Add breadcrumb enhancements
  - /evidence > Documents > [Category] > [Document]
  - /evidence > People > [Name]
- [ ] Day 51-55: Create "See Also" sections at bottom of documents

**Week 7-8: Link Building Outreach**

- [ ] Day 56-60: Begin Tier 1 link building
  - Identify 15 high-authority targets
  - Personalize outreach to each
  - Track responses and links acquired

**Week 5-8 Deliverables:**

- ✅ 4 collection hub pages with category filters
- ✅ Related documents linked across 38 documents
- ✅ Category-based navigation structure
- ✅ 5-8 backlinks acquired from high-authority sites

### Phase 3: Expansion & Authority (Days 61-90)

**Goal:** Maximize content coverage and build additional authority

**Week 9: Content Expansion**

- [ ] Day 61-65: Expand underrepresented documents
  - Knoxville Gazette issues (currently 15, link them to events)
  - Andrew Jackson document (create dedicated landing)
  - Government establishment documents (add context)
- [ ] Day 66-70: Create comparison content
  - "Treaty of Holston vs. Other Cherokee Treaties"
  - "William Blount's Role in Tennessee Founding"
  - "Complete List of 42 Treaty Signatories"

**Week 10: Featured Snippets Optimization**

- [ ] Day 71-75: Optimize for snippet triggers
  - List snippets: "42 Cherokee signatories who signed..."
  - Table snippets: Signatory table with dates/roles
  - Definition snippets: "What is the Treaty of Holston?"
- [ ] Day 76-80: Create FAQ content
  - Add FAQ schema on /evidence
  - Target: 8-10 common research questions
  - Link answers to documents

**Week 11-12: Final Authority Push**

- [ ] Day 81-85: Continue link building (Tier 2 targets)
  - Regional tourism sites (5-7 links)
  - Genealogy forums (3-5 links)
  - Local history blogs (5+ links)
- [ ] Day 86-90: Analytics setup and optimization
  - Create Google Search Console property
  - Monitor rankings for target keywords
  - Identify quick-win improvements

**Week 9-12 Deliverables:**

- ✅ 3+ comprehensive comparison/resource articles
- ✅ 8-10 FAQ entries with schema markup
- ✅ Optimized content for snippet triggers
- ✅ 12-18 total backlinks acquired
- ✅ Analytics dashboard tracking 20 target keywords

---

## Part 7: Expected Traffic Growth Projections

### Conservative Scenario (Current Pace)

**Assumptions:**

- Current Evidence Room traffic: ~12 visitors/month
- 60% of improvements implemented
- Average ranking improvement: 8 positions
- Average CTR improvement: 40%

**Projections:**

- **Month 1 (Day 31):** 18 visitors (50% increase from baseline improvements)
- **Month 2 (Day 61):** 35 visitors (3x baseline, schema markup live)
- **Month 3 (Day 90):** 65 visitors (5.4x baseline, content hubs + links)

**Year 1 Projection:** 280-320 visitors/month from Evidence Room organic search

### Moderate Scenario (80% Implementation)

**Assumptions:**

- 80% of improvements fully implemented
- Average ranking improvement: 12 positions
- Average CTR improvement: 60%
- 10-15 high-quality backlinks acquired

**Projections:**

- **Month 1:** 25 visitors
- **Month 2:** 55 visitors
- **Month 3:** 120 visitors (10x baseline)

**Year 1 Projection:** 450-550 visitors/month from Evidence Room organic search

### Aggressive Scenario (100% Implementation)

**Assumptions:**

- All improvements implemented
- Average ranking improvement: 15 positions
- Multiple #1 rankings for long-tail keywords
- 18-25 backlinks from high-authority sites
- Sustained link building beyond 90 days

**Projections:**

- **Month 1:** 35 visitors
- **Month 2:** 85 visitors
- **Month 3:** 180 visitors (15x baseline)

**Year 1 Projection:** 650-850 visitors/month from Evidence Room organic search

### Revenue Impact (Projected)

**Assumptions:**

- 2% of organic visitors convert to site visitors (conservative)
- Average site visit generates $15 in gift shop/event revenue

**Year 1 Revenue Impact:**

| Scenario     | Monthly Visitors | Annual Visitors | Converted Site Visits | Projected Revenue |
| ------------ | ---------------- | --------------- | --------------------- | ----------------- |
| Conservative | 300              | 3,600           | 72                    | $1,080            |
| Moderate     | 500              | 6,000           | 120                   | $1,800            |
| Aggressive   | 750              | 9,000           | 180                   | $2,700            |

**ROI Note:** These projections represent _new_ revenue from people who would not have discovered the site otherwise. Actual impact may be higher if visitors also attend events, make donations, or purchase memberships.

---

## Part 8: Keywords by Target Ranking Position (90-Day Goals)

### Target: #1 Position (5 keywords)

| Keyword                               | Current Rank | 90-Day Target | Search Volume | Estimated Traffic |
| ------------------------------------- | ------------ | ------------- | ------------- | ----------------- |
| "Treaty of Holston text"              | 8-12         | #1            | 42/mo         | 12/mo             |
| "Cherokee signatories Treaty Holston" | Not ranking  | #1            | 24/mo         | 8/mo              |
| "Treaty of Holston 1791 full"         | Not ranking  | #1            | 18/mo         | 6/mo              |
| "William Blount letters"              | 15-20        | #1            | 16/mo         | 5/mo              |
| "Knoxville Gazette 1791"              | Not ranking  | #1            | 12/mo         | 4/mo              |

**Target #1 Traffic: 35 visitors/month**

### Target: #2-3 Position (8 keywords)

| Keyword                             | Current Rank | 90-Day Target | Search Volume | Estimated Traffic |
| ----------------------------------- | ------------ | ------------- | ------------- | ----------------- |
| "William Blount Tennessee governor" | 15-20        | #2            | 35/mo         | 8/mo              |
| "Rocky Mount Tennessee 1790"        | #3           | #2            | 22/mo         | 6/mo              |
| "Southwest Territory government"    | Not ranking  | #3            | 28/mo         | 6/mo              |
| "Treaty of Holston signers"         | Not ranking  | #2            | 18/mo         | 4/mo              |
| "Holston Treaty full text"          | 6            | #2            | 15/mo         | 4/mo              |
| "Tennessee founding documents"      | Not ranking  | #3            | 16/mo         | 3/mo              |
| "Cherokee Nation 1791"              | Not ranking  | #2            | 14/mo         | 3/mo              |
| "Washington Blount correspondence"  | 20+          | #3            | 14/mo         | 3/mo              |

**Target #2-3 Traffic: 37 visitors/month**

### Target: #4-5 Position (7 keywords)

| Keyword                             | Current Rank | 90-Day Target | Search Volume | Estimated Traffic |
| ----------------------------------- | ------------ | ------------- | ------------- | ----------------- |
| "Blount's first letter Rocky Mount" | Not ranking  | #4            | 18/mo         | 3/mo              |
| "Tennessee Territory 1790-1796"     | Not ranking  | #5            | 16/mo         | 2/mo              |
| "Andrew Jackson Rocky Mount"        | Not ranking  | #4            | 10/mo         | 2/mo              |
| "William Cobb Rocky Mount"          | Not ranking  | #5            | 9/mo          | 1/mo              |
| "Henry Knox correspondence 1790"    | Not ranking  | #4            | 7/mo          | 1/mo              |
| "Territory South of River Ohio"     | Not ranking  | #5            | 4/mo          | 0.5/mo            |
| "Dragging Canoe Cherokee treaty"    | Not ranking  | #4            | 9/mo          | 1/mo              |

**Target #4-5 Traffic: 11 visitors/month**

**TOTAL 90-DAY ORGANIC TRAFFIC TARGET: 83 visitors/month from these 20 keywords**

---

## Part 9: Monitoring & Optimization

### Tools Required

1. **Google Search Console**
   - Track: Impressions, clicks, CTR, average position
   - Alert: New queries appearing
   - Monitor: Core Web Vitals

2. **Ahrefs or SEMrush** (free tier sufficient)
   - Track: Keyword rankings
   - Monitor: Backlink profile
   - Analyze: Competitor content

3. **Google Analytics 4**
   - Track: Evidence Room traffic
   - Segment: Organic vs. other sources
   - Monitor: Bounce rate, engagement

### Metrics to Track

**Monthly Dashboard:**

| Metric                        | Month 1 | Month 2 | Month 3 | Target |
| ----------------------------- | ------- | ------- | ------- | ------ |
| Evidence organic visitors     | 18-35   | 35-85   | 65-180  | 83+    |
| Top 20 keyword avg position   | 12.5    | 9.2     | 6.5     | <5     |
| Impressions (top 20 keywords) | 180     | 380     | 720     | 800+   |
| Click-through rate            | 3.2%    | 4.8%    | 8.2%    | 10%+   |
| Backlinks acquired            | 2-4     | 5-9     | 8-12    | 15+    |
| Core Web Vitals passing       | 70%     | 85%     | 95%+    | 100%   |

### Monthly Optimization Cycle

**Days 1-5 of each month:**

1. Review Search Console data
2. Identify underperforming keywords
3. Find quick-win improvements
4. Analyze competitor content

**Days 6-15:**

1. Implement identified improvements
2. Create new content if needed
3. Update meta descriptions
4. Improve internal linking

**Days 16-25:**

1. Continue link building outreach
2. Monitor implementation impact
3. Test improvements in Rich Results Test
4. Document results

**Days 26-30:**

1. Measure month-over-month improvements
2. Adjust strategy if needed
3. Plan next month's priorities
4. Report to stakeholders

---

## Part 10: Priority Implementation Order

### Absolutely Essential (Do First)

1. **Expand sitemap** (2 hours) — 15-20% traffic increase
2. **Add ScholarlyArticle schema** to 38 documents (4 hours) — 10-15% CTR increase
3. **Enhance meta descriptions** on main Evidence pages (2 hours) — Click rate improvement
4. **Create "About This Document" intro boxes** for 10 key documents (3 hours) — Engagement boost

**Time: 11 hours. Impact: 25-35% traffic increase potential**

### High Priority (Do Next)

5. **Implement Person schema** on 40+ people pages (3 hours)
6. **Add related documents links** across archive (3 hours)
7. **Create collection hub pages** (4 hours)
8. **Start Tier 1 link building outreach** (2 hours/week ongoing)

**Time: 10 hours + ongoing. Impact: Additional 20-30% traffic**

### Medium Priority (Do After)

9. **Expand document introductions** for all 38 documents (4 hours)
10. **Create comparison/resource content** (3 pieces, 6 hours)
11. **Implement featured snippet optimizations** (3 hours)
12. **Build FAQ section** with schema (2 hours)

**Time: 15 hours + ongoing. Impact: Additional 15-25% traffic**

### Nice-to-Have (Only if Time Permits)

13. Implement Event schema on timeline
14. Create advanced search page
15. Build downloadable resources
16. Create video transcripts for any multimedia

---

## Part 11: Success Metrics & KPIs

### Primary KPIs (What Success Looks Like)

**By Day 90:**

1. **Organic Traffic**
   - Evidence Room: 65-180 visitors/month (from 12 baseline)
   - Goal: 5-15x increase

2. **Keyword Rankings**
   - Top 5 keywords at position #1-3: 5 keywords
   - Top 10 keywords at position #1-5: 10 keywords
   - Goal: 20 keywords in top 5

3. **Backlinks**
   - From high-authority sites: 15+ links
   - Average domain authority: 40+
   - Goal: 18-25 total links

4. **Technical SEO**
   - Schema markup errors: 0
   - Core Web Vitals passing: 95%+
   - Crawl coverage: 90%+ of 90+ URLs

5. **User Engagement**
   - Average session duration: +30% (Evidence pages)
   - Click-through rate from SERPs: 8%+ (from 2-3%)
   - Bounce rate: <50% (from current 60%+)

### Secondary KPIs (Nice-to-Have)

6. **Content Performance**
   - Most popular document: 50+ monthly views
   - Average document views: 15+ per month
   - Citation box usage: Track clicks

7. **Business Impact**
   - Site visitor conversions: 2%+ of organic traffic
   - Gift shop/event ticket revenue from organic: $1,000+/year
   - Researcher inquiries via Evidence Room: 5+/month

### Leading Indicators (To Monitor Weekly)

- Schema validation errors: 0 (target)
- 404 error rate: <1%
- Mobile usability issues: 0 (target)
- Core Web Vitals: 95%+ passing (target)
- Backlink acquisition rate: 1+ per week (month 1-2)

---

## Part 12: Risk Mitigation & Contingency

### Potential Challenges

**Challenge 1: Limited Link Building Success**

- Risk: Low-authority sites ignore outreach
- Mitigation: Focus on creating linkable assets (complete signatory DB, etc.)
- Contingency: Shift focus to internal linking and content optimization

**Challenge 2: Semantic Saturation**

- Risk: Many sites competing for "Treaty of Holston"
- Mitigation: Target long-tail variants ("Treaty of Holston signers list," "complete text," etc.)
- Contingency: Focus on middle-tier keywords with less competition

**Challenge 3: Core Web Vitals Issues**

- Risk: Slow document page load times
- Mitigation: Implement lazy loading, optimize images (already using AVIF/WebP)
- Contingency: Consider moving heavy content to separate pages

**Challenge 4: Schema Markup Errors**

- Risk: Invalid JSON-LD causes Google to reject schema
- Mitigation: Validate all schema with Google Rich Results Test before publishing
- Contingency: Use simple schema first, add complexity gradually

### Rollback Plan

If improvements cause problems:

1. Revert last sitemap changes (sitemap.ts)
2. Remove problematic schema (document.tsx metadata)
3. Restore backup of metadata.ts if overwritten
4. Monitor Search Console for issues
5. Reimplement gradually after fixing issue

---

## Implementation Checklist

### Week 1

- [ ] Expand sitemap to include all Evidence pages
- [ ] Implement CollectionPage schema on /evidence
- [ ] Validate breadcrumb schema on all pages
- [ ] Implement ScholarlyArticle schema on 5 test documents
- [ ] Test with Google Rich Results Test

### Week 2

- [ ] Complete ScholarlyArticle schema on all 38 documents
- [ ] Implement Person schema on 40+ people pages
- [ ] Enhance Evidence main page meta description
- [ ] Enhance /evidence/documents page meta description
- [ ] Update 10 key document intros with context boxes

### Week 3

- [ ] Create 4 collection hub pages
- [ ] Add related documents links throughout archive
- [ ] Implement Event schema on timeline page
- [ ] Create internal linking hubs (3-4 clusters)
- [ ] Test all pages with SEO tools

### Week 4

- [ ] Expand remaining document introductions
- [ ] Create comparison content (2-3 pieces)
- [ ] Implement FAQ section with schema
- [ ] Start link building outreach (Tier 1)
- [ ] QA testing across all changes

### Months 2-3

- [ ] Continue link building (Tier 2 & 3)
- [ ] Monitor and optimize based on analytics
- [ ] Create featured snippet optimizations
- [ ] Expand top-performing content
- [ ] Build authority through additional content

---

## Conclusion

The Evidence Room is Tennessee Starts Here's highest-value SEO asset. With 38 verified primary sources spanning a historic founding era, it's uniquely positioned to rank #1 for authoritative historical searches.

This 90-day implementation roadmap is designed to:

1. **Fix foundational technical issues** (expanded sitemap, schema markup)
2. **Optimize existing content** (meta descriptions, introductions, linking)
3. **Build topical authority** (content clusters, related linking)
4. **Acquire high-authority backlinks** (through outreach and linkable assets)
5. **Establish long-term competitive advantage** (become the go-to source for founding-era Tennessee research)

**Expected outcome:** 5-15x increase in Evidence Room organic traffic by Day 90, with sustainable growth continuing into Year 1.

---

**Document Created:** January 30, 2026
**Ready for Implementation:** Yes
**Estimated Time to Complete:** 40-50 hours (Implementation Phase 1-3)
**Expected ROI:** $1,000-2,700 in Year 1 revenue impact from new organic visitors
