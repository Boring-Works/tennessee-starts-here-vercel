# Rocky Mount Brand Guide

> **Master Source of Truth v4.0** — Director's Final Version, January 2026

This document provides brand guidelines for all Rocky Mount marketing copy. For the actual copy constants used in code, see `lib/copy/`.

---

## Source of Truth

**Code Constants:** `lib/copy/` (TypeScript)

- `brand.ts` — Brand identifiers, hooks, CTAs, STOP/START dictionary
- `narratives.ts` — Three-tier messaging framework, staff scripts
- `metadata.ts` — SEO content for all pages
- `index.ts` — Public API

**Usage in Components:**

```typescript
import { HOOKS, BUTTONS, MYSTERY_NARRATIVE } from '@/lib/copy'

// Use constants directly
<p>{HOOKS.primaryCTA}</p>  // "Stand where they stood."
<button>{BUTTONS.primary}</button>  // "Plan Your Visit"
```

---

## Core Brand Identity

| Element             | Value                              |
| ------------------- | ---------------------------------- |
| **Name**            | Rocky Mount State Historic Site    |
| **Tagline**         | Tennessee Starts Here              |
| **Governance Line** | Where Tennessee's government began |
| **Established**     | 1770                               |
| **Location**        | Piney Flats, Tennessee             |

### Elevator Pitch

> Rocky Mount is where Tennessee's government began. The ground is the artifact. The house is the proof. Stand where they stood.

---

## Three-Tier Messaging Framework

### Tier 1: MYSTERY (Curiosity)

**Use for:** Permanent brand, all audiences, website default

**Hook:** "Before there was a Tennessee, there was this ground."

**Narrative Timeline:**

1. In 1770, the Cobbs settled this ground.
2. In 1780, they armed the Revolution.
3. In 1790, Governor Blount made it the seat of federal power.

### Tier 2: SCARCITY (Urgency)

**Use for:** 2026 campaign, ads, email, ticket conversion
**Expires:** December 31, 2026

**Hook:** "For approximately 16 months, this ground was the capital of everything west of the mountains."

### Tier 3: AUTHORITY (Prestige)

**Use for:** Grants, press, THC presentations, academic contexts

**Hook:** "The first federal seat of government under the Constitution, west of the Appalachians."

---

## Approved Hooks & CTAs

| Name                    | Copy                                                                                         | Usage                   |
| ----------------------- | -------------------------------------------------------------------------------------------- | ----------------------- |
| **Welcome Hook**        | Before there was a Tennessee, there was this ground.                                         | Welcome screen, splash  |
| **Primary CTA**         | Stand where they stood.                                                                      | All CTAs, closing       |
| **Governance**          | Where Tennessee's government began.                                                          | Subheads, meta          |
| **Fame Bridge**         | Governor Blount governed here. Andrew Jackson lodged here. The State started here.           | Tours, visit page       |
| **Contrast Line**       | This is not where they gathered. This is not where they farmed. This is where they governed. | Hero differentiation    |
| **Defense Line**        | The buildings evolved. The ground endures.                                                   | FAQ, building questions |
| **Sycamore Separation** | The Army gathered at the Shoals. The State started here.                                     | Competitor positioning  |
| **Closing Tagline**     | Tennessee starts here. Will you?                                                             | All page closings       |

---

## STOP / START Dictionary

When editing copy, replace STOP phrases with START phrases:

| STOP (Never Use)                   | START (Use Instead)                                       |
| ---------------------------------- | --------------------------------------------------------- |
| The Cobb Mansion                   | The Cobb House                                            |
| 256 years you can walk through     | The buildings evolved. The ground endures.                |
| 235 years                          | The buildings evolved. The ground endures.                |
| America's first western capital    | First Constitutional federal ground west of the mountains |
| Where the frontier became a nation | Where Tennessee's government began                        |
| They gathered there...             | The Army gathered at the Shoals.                          |
| Frontier Cabin                     | The Cobb Family Residence                                 |
| Pop-up capital                     | The 18-month capital                                      |
| Dynasty                            | Legacy / Lineage                                          |
| Walk the halls                     | Stand where they stood                                    |
| Hallowed Ground                    | Capital Grounds                                           |
| These walls remember               | The ground endures                                        |

---

## Button Labels

| Context        | Label                  |
| -------------- | ---------------------- |
| Primary CTA    | Plan Your Visit        |
| Secondary CTA  | Join the First 250     |
| Booking        | Book Your Tour         |
| Events         | Explore 2026 Events    |
| Welcome Screen | Stand Where They Stood |

---

## Visual Directive

**Principle:** Ground First. House Second.

Hero images should use low-angle shots emphasizing ground, feet, and landscape. The Cobb House appears in background, not foreground.

---

## Staff Scripts

### Sycamore Shoals Differentiation

> "No, the soldiers gathered at Sycamore Shoals—that was the muster point. Rocky Mount was the operational headquarters. The Army gathered at the Shoals. The State started here."

### Friendly Rivalry Tone

> "They provided the muscle; we provided the mind. We are the other half of the origin story—complementary, not competing."

### Fame Bridge (Tours)

> "Governor Blount governed here. Andrew Jackson lodged here. The State started here."

### Building Age FAQ

> "The Cobb House was built in the 1820s by the grandson. It stands as proof the family didn't just survive—they thrived. Three generations. One ground."

---

## Historical Accuracy

### Verified Claims (Safe to Use)

| Claim                                                            | Source                                  |
| ---------------------------------------------------------------- | --------------------------------------- |
| First seat of government for the Southwest Territory (1790-1792) | Tennessee Encyclopedia, primary sources |
| Site settled by William Cobb around 1769-1770                    | Historical documentation                |
| Governor William Blount administered territorial government here | Primary sources, Blount correspondence  |
| Cobb family supplied the Overmountain Men                        | Historical accounts                     |
| Andrew Jackson lodged here six weeks                             | Historical accounts                     |
| William Blount signed the U.S. Constitution                      | Historical fact                         |

### Inaccurate Claims (Never Use)

| Incorrect                            | Why                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------- |
| Tennessee's first capital            | Knoxville was first STATE capital (1796). Rocky Mount was TERRITORIAL. |
| First territorial capital in America | Marietta, Ohio was first (1788)                                        |
| Buildings date to 1770               | UT dendrochronology dates current structures to 1826-1830              |
| George Washington visited            | No documentation                                                       |

---

## Adding/Editing Copy

1. **For code changes:** Edit `lib/copy/*.ts` files
2. **For content review:** Reference this guide
3. **Run STOP phrase audit:**
   ```bash
   grep -rn "Walk the halls\|Cobb Mansion\|Hallowed Ground" --include="*.tsx" --include="*.ts"
   ```
4. **Verify build:** `npm run build`

---

## Related Documentation

- `docs/STYLE-GUIDE.md` — Visual design system
- `docs/PROJECT.md` — Technical specification
- `lib/copy/brand.ts` — Full STOP/START dictionary in code

---

_Last updated: January 2026_
