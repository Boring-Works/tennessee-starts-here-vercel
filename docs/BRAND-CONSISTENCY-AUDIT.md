# Brand Consistency Audit

> **Chief Brand Officer Report** | Marcus Wellington, PhD | January 2026
>
> Audit of all Rocky Mount brand documents against implementation.

---

## Core Brand Identity

| Element             | Value                                                                                                                          | Status            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| **Name**            | Rocky Mount State Historic Site                                                                                                | APPROVED          |
| **Tagline**         | Tennessee Starts Here                                                                                                          | SACRED - APPROVED |
| **Governance Line** | Where Tennessee's government began                                                                                             | APPROVED          |
| **Elevator Pitch**  | Rocky Mount is where Tennessee's government began. The ground is the artifact. The house is the proof. Stand where they stood. | APPROVED          |
| **Established**     | 1770                                                                                                                           | APPROVED          |
| **Location**        | Piney Flats, Tennessee                                                                                                         | APPROVED          |

---

## STOP/START Dictionary (Complete Compilation)

**Mandatory for all staff, board members, marketing partners, and website copy.**

### Terminology Corrections

| STOP (Never Use) | START (Use Instead)                                          | Why                                   |
| ---------------- | ------------------------------------------------------------ | ------------------------------------- |
| The Cobb Mansion | The Cobb House                                               | Accuracy - it's not a mansion         |
| Frontier Cabin   | The Cobb Family Residence / The Cobb House                   | Status - implies success not survival |
| Pop-up capital   | The capital / The territorial capital / The 18-month capital | Gravitas                              |
| Dynasty          | Legacy / Lineage                                             | Overclaim                             |

### Building Age Shield (Critical)

| STOP (Never Use)               | START (Use Instead)                        | Why                        |
| ------------------------------ | ------------------------------------------ | -------------------------- |
| 256 years you can walk through | The buildings evolved. The ground endures. | Truth Shield               |
| 235 years                      | The buildings evolved. The ground endures. | Truth Shield               |
| Historic house from 1770       | Historic ground since 1770                 | Ground focus               |
| These walls remember           | The ground endures                         | Walls from 1820s, not 1790 |

### Geographic Claims

| STOP (Never Use)                        | START (Use Instead)                                                          | Why                                      |
| --------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------- |
| America's first western capital         | First Constitutional federal ground west of the mountains                    | Marietta, OH predates (1788)             |
| First territorial capital (unqualified) | First capital of the Southwest Territory                                     | Only accurate with "Southwest" qualifier |
| Tennessee's first capital               | Rocky Mount was first TERRITORIAL capital; Knoxville was first STATE capital | Critical distinction                     |

### Participatory Language

| STOP (Never Use)                 | START (Use Instead)                      | Why                           |
| -------------------------------- | ---------------------------------------- | ----------------------------- |
| Walk the halls                   | Stand where they stood                   | Halls didn't exist in 1790    |
| Walk the halls where TN was born | Stand where Tennessee's government began | Halls didn't exist in 1790    |
| See where Blount governed        | Stand where Blount stood                 | Participatory > observational |

### Competitor Differentiation

| STOP (Never Use)                   | START (Use Instead)                | Why                                       |
| ---------------------------------- | ---------------------------------- | ----------------------------------------- |
| Where the frontier became a nation | Where Tennessee's government began | Too generic - Sycamore could claim it     |
| They gathered there...             | The Army gathered at the Shoals.   | Specificity - we are NOT the muster point |

### Tone & Register

| STOP (Never Use) | START (Use Instead)     | Why                 |
| ---------------- | ----------------------- | ------------------- |
| Birthed a state  | Made a state            | Cleaner language    |
| Hallowed Ground  | Capital Grounds         | Specificity         |
| 18 months        | Approximately 16 months | Historical accuracy |

---

## Historical Claims Reference

### VERIFIED - Safe to Use

- Cobb family settled this land ~1770
- Cobbs supplied Overmountain Men (gunpowder, horses, blankets, food)
- Five Cobb men answered Sevier's call
- Blount governed from this site Oct 1790 - early 1792
- Blount signed U.S. Constitution (one of 39 signers, 1787)
- Blount corresponded with President Washington
- First capital of the Southwest Territory
- Capital operated for approximately 16 months
- Andrew Jackson lodged here (six weeks in 1788)
- Current building dates to 1827-1830 (UT Dendrochronology)

### NEVER USE - Inaccurate

| Incorrect Claim                             | Why It's Wrong                                                         |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| Tennessee's first capital                   | Knoxville was first STATE capital (1796). Rocky Mount was TERRITORIAL. |
| First territorial capital in America        | Marietta, Ohio was first (1788)                                        |
| Buildings date to 1770                      | UT dendrochronology dates current structures to 1826-1830              |
| George Washington visited                   | No documentation                                                       |
| Treaty of Holston negotiated at Rocky Mount | Treaty was negotiated at White's Fort (Knoxville)                      |

---

## Homepage Analysis

**File:** `/app/(main)/home/page.tsx`

### Current Hero Statement

```
headline: "THE CONSTITUTION'S FIRST TEST"
subhead: "In 1790, this ground became the first seat of Constitutional governance west of the Appalachians."
supporting: "The Constitution had to work here—or American expansion would fail. It worked."
```

### Assessment: WHY CODY MIGHT NOT LIKE IT

**Potential Issues:**

1. **"THE CONSTITUTION'S FIRST TEST"** - This is a NEW framing not explicitly approved in BRAND-STRATEGY.md or COPY.md. The brand documents focus on:
   - Mystery: "Before there was a Tennessee, there was this ground"
   - Authority: "First federal seat of government under the Constitution"
   - Scarcity: "The capital that made a state"

   The "First Test" headline is an editorial interpretation, not an approved hook.

2. **Risk Assessment:** The headline implies the Constitution could have FAILED here. While intellectually interesting, this introduces uncertainty rather than authority. It shifts from "this is where power was established" to "this is where the experiment happened."

3. **Tone Mismatch:** The supporting line "The Constitution had to work here—or American expansion would fail" has a journalistic/argumentative tone that differs from the approved brand voice, which is more:
   - Declarative ("This is where they governed")
   - Invitational ("Stand where they stood")
   - Evocative ("Before there was a Tennessee...")

### What the Hero SHOULD Use (Per Brand Docs)

**Plan A (Mystery) - Website Default:**

```
Hook: "Before there was a Tennessee, there was this ground."
Headline: "ROCKY MOUNT"
Subhead: "Where Tennessee's government began."
Timeline:
  - In 1770, the Cobbs settled this ground.
  - In 1780, they armed the Revolution.
  - In 1790, Governor Blount made it the seat of federal power.
```

### Homepage Violations Found

| Issue               | Location              | Violation                                                               | Severity |
| ------------------- | --------------------- | ----------------------------------------------------------------------- | -------- |
| Unapproved headline | Hero                  | "THE CONSTITUTION'S FIRST TEST" not in approved tagline ladder          | MEDIUM   |
| Unapproved copy     | Hero supporting       | "The Constitution had to work here..." not in brand docs                | MEDIUM   |
| Treaty claim        | narratives.ts line 26 | "negotiated the Treaty of Holston" - TREATY WAS NEGOTIATED AT KNOXVILLE | HIGH     |

### Where "Constitution's First Test" WOULD Work

This framing could work in **Tier 3: Authority (Prestige)** contexts:

- Grant applications (intellectual framing for funders)
- Academic presentations
- Press kits for constitutional scholars
- Op-eds and thought leadership pieces

It should NOT be the default website hero because:

1. It's not approved in the tagline ladder
2. It introduces complexity rather than mystery
3. It's intellectual rather than invitational

---

## Conflicts Found (Requires Cody's Decision)

### Conflict #1: Headline Strategy

**BRAND-STRATEGY.md says (Plan A - Website Default):**

> Headline: "ROCKY MOUNT" with subhead "Where Tennessee's government began."

**Current homepage uses:**

> Headline: "THE CONSTITUTION'S FIRST TEST"

**Decision Needed:** Should the homepage use the approved Plan A headline or is "Constitution's First Test" an approved new direction?

---

### Conflict #2: Treaty of Holston Reference

**narratives.ts (line 26) says:**

> "In 1790, Governor Blount made it the seat of federal power—and negotiated the Treaty of Holston with 42 Cherokee leaders."

**BRAND-STRATEGY.md (Claims to Avoid) says:**

> "Treaty of Holston negotiated at Rocky Mount" - Problem: Treaty was negotiated at White's Fort (Knoxville)

**Decision Needed:** This is a factual error in the codebase. Should be removed or reworded to: "From this ground, Blount conducted diplomatic correspondence that led to the Treaty of Holston."

---

### Conflict #3: Mystery vs. Authority Default

**COPY.md says Tier 1 (Mystery) is:**

> "Best For: Permanent brand, all audiences, website default"

**Current homepage uses:**

> A hybrid approach mixing Mystery hook with Authority framing ("Constitutional governance")

**Decision Needed:** Is the homepage intentionally blending tiers, or should it commit to pure Mystery tier messaging?

---

### Conflict #4: "18-month capital" vs "16 months"

**brand.ts (STOP_START dictionary) says:**

> 'Pop-up capital': 'The capital that made a state'

But does NOT include the 18 vs 16 month correction.

**BRAND-STRATEGY.md says:**

> | "18 months" | "Approximately 16 months" | Historical accuracy |

**Decision Needed:** Update brand.ts STOP_START dictionary to include the 18→16 month correction for complete alignment.

---

## Compliance Summary

### Green (Fully Compliant)

- "Tennessee Starts Here" tagline - SACRED, used correctly
- "Stand where they stood" CTA - used correctly
- "Plan Your Visit" primary button - used correctly
- Indigenous acknowledgment - present and accurate
- Blount quote with "Glass Windows" - correctly cited
- Ground-first visual principle - acknowledged in image alt text

### Yellow (Minor Issues)

- Hero headline not from approved tagline ladder
- Supporting copy uses unapproved language

### Red (Must Fix)

- **Treaty of Holston claim in narratives.ts** - factually incorrect per brand docs. The treaty was negotiated at Knoxville (White's Fort), not Rocky Mount.

---

## Recommended Actions

1. **Immediate:** Fix Treaty of Holston error in `/lib/copy/narratives.ts`

2. **Decision Required:** Confirm homepage headline strategy:
   - Option A: Revert to approved Plan A ("ROCKY MOUNT" / "Where Tennessee's government began")
   - Option B: Officially approve "THE CONSTITUTION'S FIRST TEST" and add to tagline ladder

3. **Enhancement:** Add 18→16 month correction to `brand.ts` STOP_START dictionary

4. **Ongoing:** All future copy should be checked against this STOP/START dictionary before implementation

---

## Three-Tier Framework Quick Reference

| Tier | Name      | Goal              | Use For                     | Expires      |
| ---- | --------- | ----------------- | --------------------------- | ------------ |
| 1    | MYSTERY   | Get the click     | Website, Social, Billboards | Never        |
| 2    | AUTHORITY | Secure the legacy | Grants, Press, Academic     | Never        |
| 3    | SCARCITY  | Sell 2026 tickets | Email, 2026 Campaign Ads    | Dec 31, 2026 |

**Default Website = MYSTERY (Tier 1)**

---

## Approved Hooks (Complete List)

| Name                 | Copy                                                                                                   | Use                      |
| -------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------ |
| Welcome Hook         | Before there was a Tennessee, there was this ground.                                                   | Welcome screen, ads      |
| Primary CTA          | Stand where they stood.                                                                                | All CTAs, closing        |
| Governance           | Where Tennessee's government began.                                                                    | Subheads, meta           |
| Fame Bridge          | Governor Blount governed here. Andrew Jackson lodged here. The State started here.                     | Tours, visit page        |
| Contrast Line        | This is not where they gathered. This is not where they farmed. This is where they governed.           | Hero differentiation     |
| Defense Line         | The buildings evolved. The ground endures.                                                             | FAQ, building questions  |
| Sycamore Separation  | The Army gathered at the Shoals. The State started here.                                               | Competitor positioning   |
| Closing Tagline      | Tennessee starts here. Will you?                                                                       | All page closings        |
| Scarcity (2026 only) | The capital that made a state.                                                                         | 2026 campaign            |
| Grants/Academic      | The first federal seat of government established under the U.S. Constitution west of the Appalachians. | Grants, Marietta defense |

---

_Audit completed: January 2026_
_Chief Brand Officer: Marcus Wellington, PhD_
_Next review: Before any homepage changes_
