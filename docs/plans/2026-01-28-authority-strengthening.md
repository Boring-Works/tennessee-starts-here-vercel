# Rocky Mount Website Authority Strengthening

## Objective

Make the Rocky Mount website more solid and authoritative by:

1. Correcting factual conflicts with verified primary sources
2. Adding missing authority elements from MASTER_CATALOG.md
3. Planning new features from WEBSITE_STRATEGY_REFERENCE.md

**Source Documents:**

- `Historical/MASTER_CATALOG.md` — 37 processed primary source documents (1789-1796)
- `Historical/WEBSITE_STRATEGY_REFERENCE.md` — Implementation concepts and content strategy

---

## Section 1: Conflicts & Corrections (Completed)

### Identified Conflicts

| Current Site               | Verified Fact                          | Source                          | Status                     |
| -------------------------- | -------------------------------------- | ------------------------------- | -------------------------- |
| "October 10, 1790"         | October 11, 1790                       | TN Encyclopedia (Blount letter) | **Fixed**                  |
| "18 months" capital period | ~16 months (Oct 1790 - early 1792)     | TN Encyclopedia                 | Fixed in BRAND-STRATEGY.md |
| Blount "appointed" 1790    | Nominated Jun 7, Confirmed Jun 8, 1790 | Founders Online                 | Fixed in BRAND-STRATEGY.md |
| Unverified hero quote      | "Glass Windows" letter is verified     | TN Encyclopedia, Blount Papers  | Needs replacement          |

### Truth Documents Updated

1. **docs/BRAND-STRATEGY.md**
   - Fixed Blount arrival: Oct 10 → Oct 11, 1790
   - Split commission: Added "Jun 7 - Nominated", "Jun 8 - Confirmed"
   - Added "Oct 20, 1790 - Glass Windows letter" to timeline
   - Updated Capital Period with Treaty dates, Knoxville Gazette, family arrival
   - Added new section "Key Quotable Passages (Primary Sources)"

2. **lib/copy/brand.ts**
   - Added `PRIMARY_QUOTES` export with 5 verified quotes:
     - `glassWindows` — Hero quote for marketing
     - `glassWindowsFull` — Extended version with arrival context
     - `williamsonRecommendation` — Why Blount was chosen
     - `washingtonsQuestion` — "Where ought the Governor to reside?"
     - `treatyProclamation` — Washington's treaty authority

3. **app/(main)/home/page.tsx**
   - Fixed dateline: October 10, 1790 → October 20, 1790

### Outstanding Issue

The current hero quote ("Here we have planted the grain of a new civilization, in soil untilled by law") is **not in verified sources**. Consider replacing with the verified "Glass Windows" quote or flagging as interpretive/creative text.

---

## Section 2: Missing Authority Elements

High-value elements from primary sources that the website should add:

### 1. The "Glass Windows" Quote (Hero Priority)

**Current:** Paraphrased/unverified quote
**Recommended:** Use verified primary source

```
"I am very well accommodated with a Room with Glass Windows, Fireplace, etc., etc., at this place."
— William Blount, October 20, 1790
Source: Tennessee Encyclopedia, citing Blount Papers
```

**Why it matters:** Glass windows on the frontier were rare and expensive. This detail proves Rocky Mount was prestigious enough for the territorial governor—not a rough frontier cabin.

### 2. Washington's Question (Framing Device)

```
"Where ought the Governor to reside?"
— George Washington to Henry Knox, August 13, 1790
Source: Founders Online
```

**The answer was Rocky Mount.** Creates direct line from Washington to Rocky Mount. Use as section header or pullquote.

### 3. Williamson's Endorsement (Blount's Qualification)

```
"there is not any other Man who possesses the Esteem and Confidence of both Parties so fully as Mr Blount"
— Hugh Williamson to George Washington, May 28, 1790
Source: Founders Online
```

Establishes Blount wasn't randomly chosen—he was uniquely qualified to unite factional divisions.

### 4. Treaty Authority (Federal Power)

The Treaty of Holston (July 2, 1791) was negotiated by Blount during the Rocky Mount capital period. Washington's proclamation (November 11, 1791) made it binding federal law:

```
"I do hereby enjoin and require all officers of the United States, civil and military...to govern themselves according to the said treaty, as they will answer the contrary at their peril."
— George Washington, November 11, 1791
Source: Founders Online, War Department Papers
```

This federal treaty-making authority is missing from the site narrative entirely.

### 5. Cherokee Perspective (Differentiation)

The site mentions Indigenous acknowledgment but lacks the Cherokee Phoenix (1829) perspective that understood the Treaty of Holston as establishing Cherokee sovereignty "FOREVER":

```
"in full force, and binding upon the said parties"
— Cherokee Phoenix, October 21, 1829
```

Important historical context that would differentiate Rocky Mount from other sites.

---

## Section 3: New Feature Concepts

### Priority 1: Evidence Room (Digital Archive)

**Route:** `/evidence` or `/sources`

A dedicated page displaying verified primary sources:

- Quote cards with full citations
- "View Source →" links to external archives (Founders Online, DigiTreaties, TN Encyclopedia)
- Document images where available
- Organized by theme: Appointment, Capital Period, Treaty, Statehood

**Data source:** `PRIMARY_QUOTES` from `lib/copy/brand.ts` + expanded content

**Effort:** Medium (new page, quote card component)

### Priority 2: Interactive Timeline

Replace static timeline text with interactive component:

| Date         | Event                                 | Source Link         |
| ------------ | ------------------------------------- | ------------------- |
| 1787         | Blount signs Constitution             | Constitution Center |
| May 28, 1790 | Williamson recommends Blount          | Founders Online     |
| Jun 7, 1790  | Washington nominates Blount           | Founders Online     |
| Jun 8, 1790  | Senate confirms Blount                | Founders Online     |
| Aug 13, 1790 | "Where ought the Governor to reside?" | Founders Online     |
| Oct 11, 1790 | Blount arrives at Rocky Mount         | TN Encyclopedia     |
| Oct 20, 1790 | Glass Windows letter                  | TN Encyclopedia     |
| Jul 2, 1791  | Treaty of Holston signed              | DigiTreaties        |
| Nov 5, 1791  | Knoxville Gazette founded             | TN Encyclopedia     |
| Nov 11, 1791 | Washington proclaims treaty           | Founders Online     |
| Late 1791    | Blount family arrives                 | Blount Mansion      |
| Early 1792   | Capital moves to Knoxville            | TN Encyclopedia     |
| Jun 1, 1796  | Tennessee admitted to Union           | Multiple            |

Each node clickable to primary source documentation.

**Effort:** Medium (timeline component, data structure)

### Priority 3: Educator Portal

**Route:** `/educators`

Downloadable resources for teachers:

- Lesson plans aligned to Tennessee state standards
- Primary source document packets (PDF)
- "Constitution to Territory" curriculum module
- "What is a Territory?" explainer for younger students
- Virtual field trip materials
- Discussion questions tied to each primary source

**Effort:** High (content creation, PDF generation, standards alignment)

### Priority 4: QR Trail Bridge

On-site physical QR codes linking to mobile-optimized pages:

- Audio clips of primary source readings (voice actors reading Blount letters)
- "Dig Deeper" pages for each building/location
- Mobile-friendly evidence pages
- Connection between physical visit and digital resources

**Effort:** Medium-High (audio production, mobile optimization, physical installation)

### Future: Cherokee Perspective Page

**Route:** `/cherokee-perspective` or integrated into `/history`

Dedicated content presenting Treaty of Holston from Cherokee perspective:

- Cherokee Phoenix (1829) analysis
- Treaty provisions that guaranteed Cherokee lands "FOREVER"
- Historical context of how those guarantees were broken
- Connection to Trail of Tears (1838)

**Requirement:** Consultation with Cherokee Nation historians before implementation. Would significantly differentiate Rocky Mount from other sites that avoid this complexity.

**Effort:** High (research, consultation, sensitive content handling)

---

## Implementation Priorities

### Immediate (This Session)

- [x] Fix October 10 → October 20 date
- [x] Add PRIMARY_QUOTES to brand.ts
- [x] Update BRAND-STRATEGY.md with corrections

### Short-Term (Next Sprint)

- [ ] Replace unverified hero quote with Glass Windows quote
- [ ] Add "Washington's Question" as framing device somewhere on home page
- [ ] Create basic `/evidence` page with quote cards

### Medium-Term (Q1 2026)

- [ ] Interactive timeline component
- [ ] Educator resources page (even if minimal content initially)
- [ ] Mobile optimization for QR trail concept

### Long-Term (Pre-America250)

- [ ] Full Evidence Room with document images
- [ ] Audio recordings of primary sources
- [ ] Cherokee perspective content (with proper consultation)

---

## Reference Documents

| Document                      | Location                                   | Purpose                                |
| ----------------------------- | ------------------------------------------ | -------------------------------------- |
| MASTER_CATALOG.md             | `Historical/MASTER_CATALOG.md`             | Primary source content, verified facts |
| WEBSITE_STRATEGY_REFERENCE.md | `Historical/WEBSITE_STRATEGY_REFERENCE.md` | Implementation concepts                |
| BRAND-STRATEGY.md             | `docs/BRAND-STRATEGY.md`                   | Master truth document                  |
| brand.ts                      | `lib/copy/brand.ts`                        | Code-level brand constants             |
| narratives.ts                 | `lib/copy/narratives.ts`                   | Narrative frameworks                   |

---

_Design document created: January 28, 2026_
_Using brainstorming skill for Rocky Mount authority strengthening_
