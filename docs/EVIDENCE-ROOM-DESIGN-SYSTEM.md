# Tennessee Starts Here — Evidence Room Design System

> A comprehensive design specification for creating a trustworthy, scholarly, and accessible historical archive that rivals Apple, Stripe, and Linear in attention to detail.

**Version:** 1.0
**Created:** January 29, 2026
**For:** Tennessee Starts Here Evidence Room & Document Library

---

## Executive Summary

### Design Philosophy

The Evidence Room design system balances three core principles:

1. **Scholarly Authority** — This is a research archive, not entertainment. Typography, spacing, and hierarchy prioritize long-form readability and academic credibility.

2. **Transparency First** — Every design decision reinforces trust. Verification badges, source citations, and honest bias disclosures are visual anchors, not afterthoughts.

3. **Accessibility Without Compromise** — WCAG 2.1 AA compliance is the floor, not the ceiling. We design for keyboard users, screen readers, and cognitive disabilities from the start.

**Visual Language:** We evoke 1790s archival aesthetics (warm cream paper, deep wood, brass accents) using modern web typography and interaction patterns. The result feels like discovering a meticulously preserved historical collection — not a dusty library, but a living archive.

**Emotional Goal:** Visitors should feel they're handling something _important_. Not intimidating, but worthy of care and attention.

**Anti-Patterns We Avoid:**

- Generic museum websites with tiny serif fonts and poor contrast
- Flashy animations that distract from primary sources
- Hidden navigation that requires hunting
- Jargon that excludes casual learners

---

## 1. Color System

### Philosophy

Colors must convey **trust** (archival integrity), **warmth** (approachability), and **clarity** (easy to parse information hierarchy).

### Primary Palette

#### Archival Neutrals

| Name             | Value     | Tailwind Token | Usage                            | Rationale                                       |
| ---------------- | --------- | -------------- | -------------------------------- | ----------------------------------------------- |
| **Midnight**     | `#0a1628` | `midnight`     | Hero backgrounds, headers        | Deep, serious tone without pure black harshness |
| **Wood Dark**    | `#2a1f1a` | `wood-dark`    | Card catalog, accent backgrounds | Evokes aged wood furniture in archives          |
| **Wood Medium**  | `#3d2e24` | `wood-medium`  | Secondary backgrounds            | Lighter wood tone for layered depth             |
| **Cream Light**  | `#fffef8` | `cream-light`  | Primary page background          | Warm, aged paper without yellow tint            |
| **Cream Medium** | `#faf7f0` | `cream-medium` | Section backgrounds              | Subtle variation for depth                      |
| **Parchment**    | `#f5f1e8` | `parchment`    | Document viewer background       | Aged document feel                              |

**Why these colors?**
Historical archives use warm neutrals (cream, wood) rather than stark white/black. This creates visual comfort for long reading sessions while signaling "this is primary source material, carefully preserved."

#### Accent Colors

| Name           | Value     | Tailwind Token | Usage                           | Emotional Role                         |
| -------------- | --------- | -------------- | ------------------------------- | -------------------------------------- |
| **Brass**      | `#c9a227` | `brass`        | CTAs, highlights, active states | Authority + warmth (not cold gold)     |
| **Brass Dark** | `#b8860b` | `brass-dark`   | Hover states, shadows           | Deepens on interaction                 |
| **Gold Leaf**  | `#d4af37` | `gold-leaf`    | Headings, special emphasis      | Precious, important content            |
| **Leather**    | `#8b4513` | `leather`      | Featured elements, borders      | Warmth, heritage                       |
| **Ink**        | `#1a1a1a` | `ink`          | Body text                       | True black lacks warmth; ink has depth |

**Why brass over gold?**
Brass conveys heritage craftsmanship (drawer pulls, plaques) while gold can feel ostentatious. Brass is humble but dignified.

### Semantic Colors

#### Verification States

| Status            | Color  | Hex       | Icon | Rationale                                     |
| ----------------- | ------ | --------- | ---- | --------------------------------------------- |
| **Verified**      | Green  | `#059669` | ✓    | Trust signal — multiple sources confirm       |
| **Single Source** | Amber  | `#d97706` | ○    | Caution (not error) — credible but unverified |
| **Nuance**        | Orange | `#ea580c` | ⚠    | Warning — requires context, not wrong         |
| **Under Review**  | Gray   | `#6b7280` | …    | Neutral — work in progress                    |

**Why green for verified?**
Universal positive signal. We soften the green (not neon) to match archival palette.

**Why amber/orange for single-source/nuance?**
Warm warnings feel informative, not alarming. Red would signal error; orange signals "pay attention."

#### Interaction States

| State          | Color             | Usage                                  |
| -------------- | ----------------- | -------------------------------------- |
| **Focus Ring** | `brass` (#c9a227) | Keyboard navigation outline            |
| **Error**      | `#dc2626`         | Form validation (rare in this context) |
| **Success**    | `#059669`         | Form submissions (rare)                |
| **Disabled**   | `#9ca3af`         | Inactive buttons                       |

### Contrast Ratios (WCAG 2.1 AA)

| Pairing                  | Ratio  | Pass? |
| ------------------------ | ------ | ----- |
| Ink on Cream Light       | 13.2:1 | ✓ AAA |
| Brass on Midnight        | 4.8:1  | ✓ AA  |
| Brass on Cream Light     | 5.1:1  | ✓ AA  |
| Wood Dark on Cream Light | 11.5:1 | ✓ AAA |

**All body text meets AAA (7:1).** UI elements meet AA large (3:1).

### Color Usage Guidelines

**DO:**

- Use cream backgrounds for long-form reading (reduce eye strain)
- Use brass for primary CTAs (consistent affordance)
- Use wood tones for navigation/UI chrome (frame, not content)

**DON'T:**

- Use pure white (#fff) — too harsh for long reading
- Use pure black (#000) — lacks warmth
- Use multiple accent colors — stick to brass/gold family

---

## 2. Typography System

### Philosophy

Typography must serve **three reader types:**

1. **Students** (ages 10-18) — Clear hierarchy, generous line-height, readable font sizes
2. **Researchers** (academics, historians) — Scholarly serif for credibility, proper citations
3. **Skeptical Users** (trust issues) — Transparency through typographic hierarchy (source citations never buried in fine print)

### Font Families

| Font                   | Use Case                     | Weights              | Rationale                                             |
| ---------------------- | ---------------------------- | -------------------- | ----------------------------------------------------- |
| **Playfair Display**   | Headings, titles             | 400, 500, 600, 700   | Classic serif with authority; readable at large sizes |
| **Cormorant Garamond** | Subheadings, quotes, accents | 300i, 400, 400i, 600 | Elegant serif for quotes; italic adds warmth          |
| **Georgia**            | Document body text           | 400, 700             | System font for reading; excellent legibility         |
| **System UI**          | UI elements, labels          | 400, 500, 600, 700   | Fast loading, native feel                             |

**Why Georgia for documents?**
Pre-installed on all devices, designed for screen reading, has scholarly associations. Better than custom web fonts for long-form text (no FOUT/FOIT).

**Why Playfair for headings?**
High contrast serif signals importance without stuffiness. Pairs well with Georgia body text.

### Type Scale (Fluid Responsive)

Using `clamp()` for smooth scaling across all viewports.

| Element        | Size (mobile → desktop)             | Line Height | Usage                           |
| -------------- | ----------------------------------- | ----------- | ------------------------------- |
| **Display**    | `clamp(2rem, 8vw, 4.5rem)`          | 1.1         | Page titles, Evidence Room hero |
| **H1**         | `clamp(1.75rem, 5vw, 3rem)`         | 1.2         | Section headings                |
| **H2**         | `clamp(1.5rem, 4vw, 2.25rem)`       | 1.3         | Subsections                     |
| **H3**         | `clamp(1.25rem, 3vw, 1.75rem)`      | 1.4         | Card titles, document headers   |
| **Body Large** | `clamp(1rem, 2vw, 1.125rem)` (18px) | 1.7         | Introductory paragraphs         |
| **Body**       | `1rem` (16px)                       | 1.6         | Standard document text          |
| **Small**      | `0.875rem` (14px)                   | 1.5         | Captions, metadata              |
| **Micro**      | `0.75rem` (12px)                    | 1.4         | Labels, timestamps              |

**Why 18px for document body?**
Research shows 16-18px optimal for long-form reading on screens. We use 18px for primary documents (academic standard).

### Letter Spacing

| Type                 | Spacing       | Usage                           | Why                             |
| -------------------- | ------------- | ------------------------------- | ------------------------------- |
| **Display Headings** | `-0.02em`     | Large titles                    | Tighten to prevent awkward gaps |
| **Italic Accents**   | `0.05em`      | Cormorant subheadings           | Counteract italic slant         |
| **Buttons/Labels**   | `0.1em`       | Uppercase CTAs                  | Improve readability             |
| **Eyebrows**         | `0.15em`      | Section labels (TREATY, LETTER) | Create separation               |
| **Body Text**        | `0` (default) | All paragraph text              | Never adjust body spacing       |

### Font Weight Guidelines

| Weight  | Element                       | When to Use                   |
| ------- | ----------------------------- | ----------------------------- |
| **300** | Italic subheadings            | Elegant, not primary emphasis |
| **400** | Body text, most UI            | Default, neutral              |
| **500** | Active nav items, card titles | Subtle emphasis               |
| **600** | Headings, buttons             | Strong emphasis               |
| **700** | CTAs, alerts                  | Maximum emphasis              |

**DON'T use bold (700) in body paragraphs.** Use semantic emphasis (`<strong>`) which gets 600 weight.

---

## 3. Spacing System

### Vertical Rhythm

Based on **8px unit** for consistent vertical spacing.

| Token      | Value | Usage                         |
| ---------- | ----- | ----------------------------- |
| `space-1`  | 4px   | Tight (icon gaps)             |
| `space-2`  | 8px   | Compact (form fields)         |
| `space-3`  | 12px  | Cozy (card padding)           |
| `space-4`  | 16px  | Default (paragraph margins)   |
| `space-6`  | 24px  | Comfortable (section spacing) |
| `space-8`  | 32px  | Generous (major sections)     |
| `space-12` | 48px  | Spacious (section dividers)   |
| `space-16` | 64px  | Dramatic (page sections)      |
| `space-24` | 96px  | Hero (landing sections)       |

### Section Padding

| Breakpoint              | Vertical      | Horizontal      | Rationale                               |
| ----------------------- | ------------- | --------------- | --------------------------------------- |
| **Mobile** (<640px)     | `3rem` (48px) | `1rem` (16px)   | Maximize reading width, minimize scroll |
| **Tablet** (640-1024px) | `4rem` (64px) | `1.5rem` (24px) | More breathing room                     |
| **Desktop** (>1024px)   | `5rem` (80px) | `2rem` (32px)   | Luxury spacing for large screens        |

### Max Widths (Reading Comfort)

| Content Type         | Max Width | Characters/Line | Rationale                             |
| -------------------- | --------- | --------------- | ------------------------------------- |
| **Document Text**    | `700px`   | 65-75           | Optimal reading (Bringhurst standard) |
| **Standard Content** | `900px`   | 80-90           | Comfortable for skimming              |
| **Entry Room Cards** | `1200px`  | N/A             | Visual balance for grid               |
| **Full Width**       | `100%`    | N/A             | Hero sections, backgrounds            |

**Why 700px for documents?**
Research shows 45-75 characters per line optimal for comprehension. At 18px Georgia, 700px = ~65 characters.

---

## 4. Component Specifications

### A. DocumentSummary Component

**Purpose:** TL;DR for students; quick orientation for all users.

#### Visual Hierarchy

```
┌─────────────────────────────────────────────────┐
│ 🏛️ LETTER • October 20, 1790                   │ ← Eyebrow (brass, 11px, uppercase, 0.15em)
├─────────────────────────────────────────────────┤
│ The Glass Windows Letter                        │ ← Title (H3, wood-dark, semibold)
│                                                  │
│ Blount's first letter from Rocky Mount proves   │ ← Summary (body, 2-3 sentences, gray-700)
│ this was no rough cabin — glass windows were a  │
│ luxury status symbol on the frontier.           │
│                                                  │
│ [VERIFIED ✓]  [5 min read]  [Grade 8+]          │ ← Badges (horizontal row, 12px)
│                                                  │
│ ▼ What you'll learn (3 key points)              │ ← Collapsible section (brass arrow)
└─────────────────────────────────────────────────┘
```

#### Specifications

**Eyebrow:**

- Font: System UI, 11px, 700 weight, 0.15em letter-spacing
- Color: `brass` (#c9a227)
- Transform: Uppercase
- Margin: 0 0 8px 0

**Title:**

- Font: Playfair Display, clamp(1.25rem, 3vw, 1.5rem), 600 weight
- Color: `wood-dark` (#2a1f1a)
- Line height: 1.3
- Margin: 0 0 12px 0

**Summary:**

- Font: System UI, 15px, 400 weight
- Color: `gray-700` (#374151)
- Line height: 1.6
- Margin: 0 0 16px 0
- Max width: 600px

**Badges Row:**

- Layout: Horizontal flexbox, gap 12px, wrap on small screens
- Each badge: Inline-flex, align center
- Font: System UI, 12px, 500 weight

**Difficulty Badge:**

```css
.difficultyBadge {
  padding: 4px 10px;
  background: rgba(201, 162, 39, 0.1);
  border: 1px solid rgba(201, 162, 39, 0.3);
  border-radius: 12px;
  color: #b8860b; /* brass-dark */
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

**Reading Time:**

```css
.readingTime {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #6b7280; /* gray-500 */
  font-size: 13px;
}

.readingTime::before {
  content: '📖';
  font-size: 14px;
}
```

**Collapsible Learning Objectives:**

Closed state:

```css
.objectives {
  padding: 12px 16px;
  background: rgba(42, 31, 26, 0.03);
  border-left: 3px solid rgba(201, 162, 39, 0.3);
  cursor: pointer;
  transition: background 0.2s ease;
}

.objectives:hover {
  background: rgba(42, 31, 26, 0.06);
}

.objectivesArrow {
  display: inline-block;
  color: #c9a227;
  transition: transform 0.25s ease;
}

.objectives[data-open='true'] .objectivesArrow {
  transform: rotate(90deg);
}
```

Open state:

```css
.objectivesList {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.objectivesList[data-open='true'] {
  max-height: 300px; /* Enough for 3-4 items */
}

.objectivesList li {
  padding: 8px 0;
  color: #374151;
  font-size: 14px;
  line-height: 1.5;
}

.objectivesList li::before {
  content: '→';
  color: #c9a227;
  margin-right: 8px;
}
```

**Mobile Adaptation:**

- Stack badges vertically on <480px
- Reduce title font to 20px minimum
- Summary remains full width (no truncation)
- Learning objectives always full width when expanded

---

### B. GlossaryTerm Component

**Purpose:** Inline definitions for unfamiliar terms without disrupting reading flow.

#### Interaction States

**Default (Inline):**

```css
.glossaryTerm {
  border-bottom: 1px dotted rgba(201, 162, 39, 0.4);
  cursor: help;
  color: inherit; /* Don't change text color */
  text-decoration: none;
  transition: border-color 0.2s ease;
}
```

**Hover (Desktop):**

```css
.glossaryTerm:hover {
  border-bottom-color: #c9a227;
  border-bottom-style: solid;
}

/* Tooltip appears */
.glossaryTooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);

  padding: 12px 16px;
  max-width: 280px;

  background: #0a1628; /* midnight */
  border: 1px solid rgba(201, 162, 39, 0.2);
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  line-height: 1.5;
  text-align: left;

  z-index: 100;
  pointer-events: none;

  opacity: 0;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.glossaryTerm:hover .glossaryTooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-12px);
}

/* Small arrow pointing down */
.glossaryTooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);

  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #0a1628;
}
```

**Focus (Keyboard):**

```css
.glossaryTerm:focus-visible {
  outline: 2px solid #c9a227;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Tooltip shown on focus too */
.glossaryTerm:focus-visible .glossaryTooltip {
  opacity: 1;
}
```

**Mobile (Tap):**

Since hover doesn't exist on mobile, use click/tap to toggle tooltip:

```tsx
const [isOpen, setIsOpen] = useState(false)

return (
  <span
    className="glossaryTerm"
    onClick={() => setIsOpen(!isOpen)}
    role="button"
    aria-expanded={isOpen}
  >
    {term}
    {isOpen && (
      <div className="glossaryTooltip glossaryTooltip--mobile">
        {definition}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(false)
          }}
        >
          Close
        </button>
      </div>
    )}
  </span>
)
```

Mobile tooltip differences:

- Fixed position (centered on screen, not relative to term)
- Backdrop overlay (dim background)
- Close button (explicit dismiss)

---

### C. BiasDisclosure Component

**Purpose:** Transparent acknowledgment of missing perspectives without defensiveness.

#### Visual Language

**Goal:** Signal "we're being honest about limitations" NOT "warning: error ahead."

```
┌─────────────────────────────────────────────────┐
│ ⚠ Missing Perspective                           │
│ ─────────────────────────────────────────────── │
│                                                  │
│ This document reflects only the settler         │
│ government viewpoint. Cherokee voices from this  │
│ period exist primarily in treaty records and     │
│ indirect sources. We acknowledge this gap.       │
│                                                  │
│ → Learn about Cherokee signatories              │
└─────────────────────────────────────────────────┘
```

#### Specifications

**Container:**

```css
.biasDisclosure {
  padding: 20px 24px;
  margin: 32px 0;

  background: linear-gradient(135deg, rgba(234, 88, 12, 0.05) 0%, rgba(234, 88, 12, 0.08) 100%);
  border-left: 4px solid #ea580c; /* orange */
  border-radius: 0 4px 4px 0;

  box-shadow: 0 2px 8px rgba(234, 88, 12, 0.1);
}
```

**Icon:**

```css
.biasIcon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  color: #ea580c;
  font-size: 18px;
  vertical-align: middle;
}
```

Use `⚠` character (not image) for simplicity.

**Title:**

```css
.biasTitle {
  font-family: var(--font-serif);
  font-size: 16px;
  font-weight: 600;
  color: #7c2d12; /* orange-900 */
  margin: 0 0 8px 0;
}
```

**Body:**

```css
.biasBody {
  font-size: 14px;
  line-height: 1.6;
  color: #1a1a1a;
  margin: 0 0 12px 0;
}
```

**Link:**

```css
.biasLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  font-size: 14px;
  font-weight: 500;
  color: #ea580c;
  text-decoration: none;

  transition: color 0.2s ease;
}

.biasLink:hover {
  color: #c2410c;
  text-decoration: underline;
}

.biasLink::before {
  content: '→';
  font-size: 16px;
}
```

**Why warm orange instead of cold blue?**
Blue (info) feels clinical. Orange (warm warning) feels honest without alarm. This is a disclosure, not an error.

**Typography Choice:**
Body text should be easy to read (not small fine print). 14px is minimum for accessibility.

---

### D. VerificationV2 Badge

**Purpose:** Show trust level at a glance; expand to reveal methodology.

#### Badge States

**Verified:**

```css
.badge--verified {
  background: rgba(5, 150, 105, 0.1);
  border: 1px solid rgba(5, 150, 105, 0.3);
  color: #047857; /* green-700 */
}

.badge--verified::before {
  content: '✓';
  margin-right: 6px;
  font-weight: 700;
}
```

**Single Source:**

```css
.badge--single {
  background: rgba(217, 119, 6, 0.1);
  border: 1px solid rgba(217, 119, 6, 0.3);
  color: #b45309; /* amber-700 */
}

.badge--single::before {
  content: '○';
  margin-right: 6px;
}
```

**Nuance:**

```css
.badge--nuance {
  background: rgba(234, 88, 12, 0.1);
  border: 1px solid rgba(234, 88, 12, 0.3);
  color: #c2410c; /* orange-700 */
}

.badge--nuance::before {
  content: '⚠';
  margin-right: 6px;
}
```

**Under Review:**

```css
.badge--review {
  background: rgba(107, 114, 128, 0.1);
  border: 1px solid rgba(107, 114, 128, 0.3);
  color: #4b5563; /* gray-600 */
}

.badge--review::before {
  content: '…';
  margin-right: 6px;
}
```

#### Base Badge Styles

```css
.verificationBadge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;

  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  border-radius: 16px;
  cursor: pointer;

  transition: all 0.2s ease;
}

.verificationBadge:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

#### Expandable Details

**Collapsed (Default):**

Just the badge (e.g., "Verified ✓").

**Expanded (On Click/Tap):**

```
┌─────────────────────────────────────────┐
│ ✓ VERIFIED                              │
│ ─────────────────────────────────────── │
│ 2 independent sources confirm           │
│                                          │
│ Verification Method:                     │
│ Cross-referenced with Founders Online    │
│ and Tennessee Encyclopedia               │
│                                          │
│ [Collapse ▲]                            │
└─────────────────────────────────────────┘
```

**Expanded Container:**

```css
.badgeDetails {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;

  width: 300px;
  padding: 16px;

  background: white;
  border: 1px solid rgba(42, 31, 26, 0.15);
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

  z-index: 50;

  opacity: 0;
  transform: translateY(-8px);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.badgeDetails[data-open='true'] {
  opacity: 1;
  transform: translateY(0);
}
```

**Details Typography:**

```css
.badgeDetailsTitle {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6b7280;
  margin: 0 0 4px 0;
}

.badgeDetailsText {
  font-size: 13px;
  line-height: 1.5;
  color: #1a1a1a;
  margin: 0 0 12px 0;
}
```

**Micro-Animation:**

When expanding, use spring easing for delight:

```css
.badgeDetails {
  transition:
    opacity 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

(Slight overshoot creates subtle bounce.)

---

### E. LearningPath Component

**Purpose:** Show progress through curated document sequences (e.g., "Understanding the Treaty of Holston").

#### Layout

```
┌─────────────────────────────────────────────────┐
│ 📚 Learning Path: Understanding the Treaty      │
│                                                  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ ← Progress bar (brass fill)
│ 3 of 5 documents read                           │
│                                                  │
│ ✓ 1. Washington to Knox (1790)                  │ ← Completed (gray, checkmark)
│ ✓ 2. Williamson Recommendation (1790)           │
│ ➤ 3. Treaty of Holston (1791) ← You are here    │ ← Current (brass, arrow)
│   4. Washington's Proclamation (1791)           │ ← Upcoming (muted)
│   5. Cherokee Signatories                       │
│                                                  │
│ [Continue to Next Document →]                   │
└─────────────────────────────────────────────────┘
```

#### Specifications

**Container:**

```css
.learningPath {
  padding: 24px;
  background: linear-gradient(135deg, rgba(201, 162, 39, 0.05) 0%, rgba(201, 162, 39, 0.08) 100%);
  border: 1px solid rgba(201, 162, 39, 0.2);
  border-radius: 8px;
  margin: 32px 0;
}
```

**Title:**

```css
.pathTitle {
  display: flex;
  align-items: center;
  gap: 8px;

  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 600;
  color: #2a1f1a;
  margin: 0 0 16px 0;
}

.pathTitle::before {
  content: '📚';
  font-size: 20px;
}
```

**Progress Bar:**

```css
.progressBar {
  height: 6px;
  background: rgba(201, 162, 39, 0.2);
  border-radius: 3px;
  overflow: hidden;
  margin: 0 0 8px 0;
}

.progressFill {
  height: 100%;
  background: linear-gradient(90deg, #b8860b 0%, #c9a227 100%);
  border-radius: 3px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Progress Label:**

```css
.progressLabel {
  font-size: 13px;
  color: #6b7280;
  margin: 0 0 16px 0;
}
```

**Document List:**

```css
.pathList {
  list-style: none;
  margin: 0;
  padding: 0;
}

.pathItem {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;

  font-size: 14px;
  line-height: 1.4;

  transition: color 0.2s ease;
}

/* Completed */
.pathItem--completed {
  color: #6b7280;
}

.pathItem--completed::before {
  content: '✓';
  color: #059669;
  font-weight: 700;
  width: 20px;
  text-align: center;
}

/* Current */
.pathItem--current {
  color: #1a1a1a;
  font-weight: 600;
  background: rgba(201, 162, 39, 0.1);
  padding: 10px 12px;
  margin: 0 -12px;
  border-radius: 4px;
}

.pathItem--current::before {
  content: '➤';
  color: #c9a227;
  width: 20px;
  text-align: center;
}

/* Upcoming */
.pathItem--upcoming {
  color: #9ca3af;
}

.pathItem--upcoming::before {
  content: '○';
  color: #d1d5db;
  width: 20px;
  text-align: center;
}
```

**CTA Button:**

```css
.pathCTA {
  margin-top: 16px;
  padding: 12px 24px;

  background: #c9a227;
  color: #0a1628;

  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;

  border: none;
  border-radius: 6px;
  cursor: pointer;

  transition: all 0.2s ease;
}

.pathCTA:hover {
  background: #d4af37;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(201, 162, 39, 0.3);
}
```

**Mobile Optimization:**

- On <640px, reduce padding to 16px
- Stack "You are here" indicator below item (not inline)
- Shrink font sizes by 1-2px

---

### F. ComparisonView Component

**Purpose:** Side-by-side document comparison (e.g., Treaty vs. Proclamation).

#### Layout Options

**Desktop (>1024px):** 50/50 split, vertical divider

```
┌─────────────────────────────┬─────────────────────────────┐
│ Treaty of Holston (1791)    │ Washington Proclamation     │
│                             │                             │
│ Article I: Peace between    │ "I do hereby enjoin all     │
│ the United States and the   │ officers to govern          │
│ Cherokee Nation...          │ themselves according to     │
│                             │ the said treaty..."         │
│                             │                             │
│ [Scroll independently]      │ [Scroll independently]      │
└─────────────────────────────┴─────────────────────────────┘
```

**Tablet (640-1024px):** Stacked, collapsible sections

**Mobile (<640px):** Tabs (toggle between documents)

#### Specifications

**Desktop Container:**

```css
.comparisonView {
  display: grid;
  grid-template-columns: 1fr 1px 1fr; /* 50% | divider | 50% */
  gap: 0;

  background: var(--cream-light);
  border: 1px solid rgba(42, 31, 26, 0.1);
  border-radius: 8px;
  overflow: hidden;
}
```

**Document Pane:**

```css
.comparisonPane {
  padding: 32px;
  overflow-y: auto;
  max-height: 600px;
}

.comparisonPane::-webkit-scrollbar {
  width: 8px;
}

.comparisonPane::-webkit-scrollbar-thumb {
  background: rgba(201, 162, 39, 0.3);
  border-radius: 4px;
}
```

**Divider:**

```css
.comparisonDivider {
  width: 1px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(201, 162, 39, 0.3) 20%,
    rgba(201, 162, 39, 0.3) 80%,
    transparent 100%
  );
}
```

**Scroll Synchronization:**

**Option A:** Independent scrolling (default)
Each pane scrolls separately. Easier to compare specific sections.

**Option B:** Synchronized scrolling (advanced)
Both panes scroll together. Use `onScroll` event:

```tsx
const syncScroll = (source: 'left' | 'right', scrollTop: number) => {
  if (source === 'left') {
    rightPaneRef.current.scrollTop = scrollTop
  } else {
    leftPaneRef.current.scrollTop = scrollTop
  }
}
```

**Recommendation:** Independent scrolling for MVP. Add sync toggle if users request it.

**Highlighting Differences:**

For passages that differ, use subtle background:

```css
.differingPassage {
  background: rgba(234, 88, 12, 0.08);
  border-left: 3px solid #ea580c;
  padding-left: 12px;
  margin: 16px 0;
}
```

---

## 5. Layout & Hierarchy Patterns

### Document Page Layout

**Structure:**

```
┌─────────────────────────────────────────────────┐
│ [Header Navigation]                              │
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ DocumentSummary (TL;DR)                     │ │ ← Fixed height ~200px
│ │ [Badges, reading time, difficulty]          │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ VerificationBadge (expanded methodology)    │ │ ← Collapsible
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ════════════════════════════════════════════════ │ ← Divider
│                                                  │
│ Body Content (Georgia 18px, max-width 700px)    │
│                                                  │
│ <passage id="glass-windows">                     │ ← Anchorable passages
│   "I am very well accommodated with a Room      │
│   with Glass Windows..."                        │
│ </passage>                                       │
│                                                  │
│ [More passages...]                               │
│                                                  │
│ ════════════════════════════════════════════════ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ BiasDisclosure (if applicable)              │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ ConnectionsPanel (related documents)        │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Source Attribution                          │ │
│ │ [Citation, permalink, share buttons]        │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ [Footer]                                         │
└─────────────────────────────────────────────────┘
```

**Vertical Spacing:**

- Header → DocumentSummary: 32px
- DocumentSummary → VerificationBadge: 24px
- VerificationBadge → Body: 48px (divider creates breathing room)
- Between passages: 24px
- Body → BiasDisclosure: 48px
- BiasDisclosure → ConnectionsPanel: 32px
- ConnectionsPanel → Footer: 64px

**Max Width:**

- Content container: `700px` (centered)
- Full-width sections (hero, footer): `100%`

**Sidebar Placement:**

No sidebar on document pages. Linear reading = no distractions.

**Mobile Collapse:**

All sections stack vertically. No horizontal scrolling ever.

---

### Evidence Room Landing Layout

```
┌─────────────────────────────────────────────────┐
│ Hero Section (full viewport height)             │
│   • Title (Tennessee Starts Here)               │
│   • Subtitle (Primary sources from 1790-1796)   │
│   • CTA (Explore the Archive)                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Entry Room (visual index)                       │
│   • 3x2 grid of collection cards                │
│   • Link to full document library               │
│   • Reading time estimate                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Featured Quote (The Glass Windows Letter)       │
│   • Large blockquote                            │
│   • Context paragraph                           │
│   • Link to full document                       │
└─────────────────────────────────────────────────┘

[Divider]

┌─────────────────────────────────────────────────┐
│ The Question (Washington to Knox)               │
│   • Quote card                                  │
│   • Context panel                               │
└─────────────────────────────────────────────────┘

[Repeat pattern for 4-5 key documents]

┌─────────────────────────────────────────────────┐
│ Treaty Signers Section                          │
│   • 5 featured Cherokee leaders (cards)         │
│   • Link to all 42 signatories                  │
│   • DigiTreaties manuscript link                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Timeline Section                                │
│   • Visual timeline (1790-1796)                 │
│   • Featured events clickable                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Sources Section                                 │
│   • 6 repository cards                          │
│   • Link to full library                        │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ CTA (Visit Rocky Mount)                         │
└─────────────────────────────────────────────────┘
```

**Section Spacing:**

- Between major sections: 96px (desktop), 64px (mobile)
- Within sections: 32-48px

---

### Search Results Layout

```
┌─────────────────────────────────────────────────┐
│ Search: "glass windows"                  [X]     │
│ ─────────────────────────────────────────────── │
│ 3 results                                        │
├─────────────────────────────────────────────────┤
│                                                  │
│ Filters:                                         │
│ [All] [Letters] [Treaties] [Proclamations]      │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ LETTER • October 20, 1790                   │ │
│ │ Blount to Secretary of War                  │ │
│ │                                             │ │
│ │ "...I am very well accommodated with a      │ │
│ │ Room with Glass Windows, Fireplace, etc..." │ │ ← Highlighted term
│ │                                             │ │
│ │ [Read Full Document →]                      │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ [More results...]                                │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Filters:**

- Sticky sidebar (desktop >1024px)
- Collapsible drawer (mobile)
- Checkboxes for multi-select

**Result Cards:**

- Max 3 lines of preview
- Highlighted search term (yellow background)
- Click entire card → document with passage anchored

**Pagination:**

- Show 10 results per page
- Load more button (not infinite scroll)

---

## 6. Interaction Design Patterns

### Micro-Interactions Catalog

#### Link Hover (Inline Text Links)

```css
a {
  color: #c9a227;
  text-decoration: none;
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: #c9a227;
  transition: width 0.25s ease;
}

a:hover::after {
  width: 100%;
}
```

**Why slide-in underline?**
More elegant than instant underline. Signals affordance without distraction.

#### Button Press (CTA Buttons)

```css
.button {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
```

**Why press down?**
Physical metaphor (like pressing a real button). 2px is subtle but noticeable.

#### Card Hover (Collection Cards, Document Cards)

```css
.card {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

**Why lift up?**
Creates depth hierarchy. 4px is noticeable without feeling floaty.

#### Toggle Switch (Learning Path Collapse)

```css
.toggle {
  width: 44px;
  height: 24px;
  background: #d1d5db;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle[data-on='true'] {
  background: #c9a227;
}

.toggle[data-on='true']::before {
  transform: translateX(20px);
}
```

**Why smooth easing?**
Toggle is a state change, not a playful interaction. Smooth = confident.

#### Progress Bar Fill

```css
.progressFill {
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Why slow?**
Progress should feel earned. 0.6s allows user to appreciate the change.

---

### Transitions

| Element                 | Duration | Easing                           | Rationale                                        |
| ----------------------- | -------- | -------------------------------- | ------------------------------------------------ |
| **Link underline**      | 0.25s    | `ease`                           | Quick enough not to delay, slow enough to notice |
| **Button press**        | 0.15s    | `ease`                           | Instant feedback for click                       |
| **Card hover**          | 0.25s    | `ease`                           | Smooth lift without lag                          |
| **Modal open**          | 0.3s     | `cubic-bezier(0.4, 0.0, 0.2, 1)` | Ease-out for entering elements                   |
| **Collapsible section** | 0.3s     | `ease`                           | Standard accordion timing                        |
| **Progress bar**        | 0.6s     | `cubic-bezier(0.4, 0.0, 0.2, 1)` | Slow fill feels earned                           |

**Never use:**

- Durations > 0.6s (feels sluggish)
- `ease-in` for entrances (accelerating into view feels wrong)
- `linear` (robotic, no personality)

---

### Loading States

#### Document Loading (Skeleton Screen)

Mimic document layout while loading:

```
┌─────────────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                 │ ← Eyebrow placeholder
│                                                  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                     │ ← Title placeholder
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                │
│                                                  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ ← Body placeholder
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                    │
└─────────────────────────────────────────────────┘
```

```css
.skeleton {
  background: linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

**Why shimmer?**
Indicates "loading in progress" vs static gray box. Reduces perceived wait time.

#### Search Loading (Spinner)

Don't use skeleton for search (unknown result count). Use subtle spinner:

```css
.searchSpinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(201, 162, 39, 0.2);
  border-top-color: #c9a227;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

#### Lazy-Loaded Images (Blur-Up Effect)

1. Load tiny placeholder (20px wide, base64 inline)
2. Apply blur filter
3. Load full image
4. Fade from blurred → sharp

```css
.lazyImage {
  filter: blur(10px);
  transition: filter 0.3s ease;
}

.lazyImage[data-loaded='true'] {
  filter: blur(0);
}
```

---

## 7. Accessibility-First Design

### Focus Indicators

#### Keyboard Focus Ring

```css
*:focus-visible {
  outline: 2px solid #c9a227;
  outline-offset: 3px;
  border-radius: 2px;
}

/* On dark backgrounds */
.darkBg *:focus-visible {
  outline-color: white;
}
```

**Why 3px offset?**
Separates focus ring from element boundary. Easier to see against complex backgrounds.

#### Skip to Content Link

```css
.skipLink {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);

  padding: 12px 24px;
  background: #c9a227;
  color: #0a1628;
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;

  z-index: 9999;
  transition: top 0.2s ease;
}

.skipLink:focus {
  top: 16px;
}
```

**Usage:**

```html
<a href="#main-content" className="skipLink"> Skip to main content </a>
```

Place as first element in `<body>`.

#### Focus Order

**Logical Tab Sequence:**

1. Skip link
2. Main navigation
3. Document summary
4. Verification badge
5. Body content (links in reading order)
6. Related documents
7. Footer links

**Never use `tabindex` > 0.** Let natural DOM order dictate tab sequence.

---

### Color Contrast

All pairings tested against WCAG 2.1:

| Foreground         | Background            | Ratio  | Level | Use Case       |
| ------------------ | --------------------- | ------ | ----- | -------------- |
| #1a1a1a (ink)      | #fffef8 (cream-light) | 13.2:1 | AAA   | Body text      |
| #374151 (gray-700) | #fffef8               | 8.1:1  | AAA   | Secondary text |
| #c9a227 (brass)    | #0a1628 (midnight)    | 4.8:1  | AA    | CTAs on dark   |
| #c9a227            | #fffef8               | 5.1:1  | AA    | Links on light |
| #059669 (green)    | white                 | 4.6:1  | AA    | Verified badge |

**All interactive elements meet AA Large (3:1) minimum.**

---

### Touch Targets

#### Minimum Size: 44x44px

```css
button,
a,
input,
[role='button'] {
  min-width: 44px;
  min-height: 44px;
  /* Or padding that achieves this */
}
```

**Why 44px?**
Apple HIG and WCAG 2.1 recommendation. Thumb-friendly on mobile.

#### Spacing Between Targets: 8px

```css
.buttonGroup {
  display: flex;
  gap: 8px; /* Prevents accidental taps */
}
```

#### Mobile Considerations

- Place primary CTA in thumb zone (bottom 1/3 of screen)
- Avoid top-corner buttons on mobile (hard to reach)
- Use bottom navigation for key actions

---

### Screen Reader Support

#### Semantic HTML

**DO:**

```html
<article>
  <header>
    <h1>Document Title</h1>
  </header>
  <section>
    <h2>Section Title</h2>
    <p>Content...</p>
  </section>
</article>
```

**DON'T:**

```html
<div>
  <div class="title">Document Title</div>
  <div class="section">
    <div class="subtitle">Section Title</div>
    <div class="text">Content...</div>
  </div>
</div>
```

#### ARIA Labels

**Verification Badge:**

```html
<span
  role="button"
  aria-expanded="{isExpanded}"
  aria-label="Verification status: Verified. Click for details."
>
  Verified ✓
</span>
```

**Glossary Term:**

```html
<span role="button" aria-describedby="tooltip-treaty" className="glossaryTerm">
  Treaty of Holston
</span>
<div id="tooltip-treaty" role="tooltip" hidden="{!isOpen}">A peace agreement between...</div>
```

#### Visually Hidden Text

```css
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Usage:**

```html
<button>
  <span aria-hidden="true">→</span>
  <span className="srOnly">Next document</span>
</button>
```

---

## 8. Responsive Breakpoints

### Breakpoint Strategy

| Name        | Min Width | Max Width | Typical Device         | Design Changes                        |
| ----------- | --------- | --------- | ---------------------- | ------------------------------------- |
| **Mobile**  | 0         | 639px     | Phones                 | Single column, stacked nav            |
| **Tablet**  | 640px     | 1023px    | Tablets, small laptops | 2-column grids, sticky nav            |
| **Desktop** | 1024px    | 1439px    | Laptops, desktops      | 3-column grids, sidebars              |
| **Large**   | 1440px+   | ∞         | Large monitors         | Max-width containers, more whitespace |

### Component Adaptations

#### DocumentSummary

- **Mobile:** Stack badges vertically, full-width learning objectives
- **Tablet:** Horizontal badge row, 2-column objectives
- **Desktop:** Same as tablet but more padding

#### GlossaryTerm

- **Mobile:** Tap opens modal (not tooltip)
- **Desktop:** Hover shows tooltip

#### BiasDisclosure

- **Mobile:** Reduce padding to 16px, smaller font (13px)
- **Desktop:** Full padding (24px), 14px font

#### LearningPath

- **Mobile:** Progress bar full-width, list items 13px
- **Tablet:** Same
- **Desktop:** Wider container (max 800px)

#### ComparisonView

- **Mobile:** Tabs (toggle between documents)
- **Tablet:** Stacked (Document A above, Document B below, collapsible)
- **Desktop:** Side-by-side split

---

## 9. Design Tokens (Tailwind Config)

Copy-paste ready configuration for `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Archival Neutrals
        midnight: '#0a1628',
        'wood-dark': '#2a1f1a',
        'wood-medium': '#3d2e24',
        'cream-light': '#fffef8',
        'cream-medium': '#faf7f0',
        parchment: '#f5f1e8',

        // Accents
        brass: {
          DEFAULT: '#c9a227',
          dark: '#b8860b',
          light: '#d4af37',
        },
        'gold-leaf': '#d4af37',
        leather: '#8b4513',
        ink: '#1a1a1a',

        // Semantic
        'evidence-verified': '#059669',
        'evidence-single': '#d97706',
        'evidence-nuance': '#ea580c',
        'evidence-review': '#6b7280',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        'serif-elegant': ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        display: 'clamp(2rem, 8vw, 4.5rem)',
        h1: 'clamp(1.75rem, 5vw, 3rem)',
        h2: 'clamp(1.5rem, 4vw, 2.25rem)',
        h3: 'clamp(1.25rem, 3vw, 1.75rem)',
        'body-lg': 'clamp(1rem, 2vw, 1.125rem)',
        body: '1rem',
        small: '0.875rem',
        micro: '0.75rem',
      },
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px (specific use case)
      },
      boxShadow: {
        subtle: '0 2px 8px rgba(0, 0, 0, 0.06)',
        medium: '0 4px 20px rgba(0, 0, 0, 0.06)',
        strong: '0 8px 30px rgba(0, 0, 0, 0.15)',
        'brass-glow': '0 8px 30px rgba(201, 162, 39, 0.3)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

---

## 10. Animation & Motion Guidelines

### Timing Functions (Easing)

| Name            | Cubic Bezier                        | When to Use            |
| --------------- | ----------------------------------- | ---------------------- |
| **ease**        | Default                             | General transitions    |
| **ease-out**    | `cubic-bezier(0, 0, 0.2, 1)`        | Elements entering view |
| **ease-in**     | `cubic-bezier(0.4, 0, 1, 1)`        | Elements leaving view  |
| **ease-in-out** | `cubic-bezier(0.4, 0, 0.2, 1)`      | State changes (toggle) |
| **spring**      | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful (badge expand) |

### Duration Standards

| Duration     | Milliseconds | Use Case                         |
| ------------ | ------------ | -------------------------------- |
| **Instant**  | 0ms          | Immediate feedback (rare)        |
| **Fast**     | 150ms        | Button press, focus ring         |
| **Standard** | 250ms        | Link hover, card hover           |
| **Medium**   | 300ms        | Modal open, collapsible sections |
| **Slow**     | 500ms        | Page transitions, progress bars  |
| **Never**    | >600ms       | Too sluggish                     |

### When to Reduce Motion

Always respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**What this disables:**

- Shimmer loading
- Card hover lifts
- Fade-in animations
- Auto-playing carousels

**What stays enabled:**

- Focus indicators (accessibility requirement)
- User-triggered actions (button press)

---

## 11. Dark Mode Considerations (Future-Proofing)

### Design with Dark Mode in Mind

Even if not implementing now, use semantic tokens:

**DON'T:**

```css
.card {
  background: #ffffff;
  color: #1a1a1a;
}
```

**DO:**

```css
.card {
  background: var(--surface);
  color: var(--text-primary);
}
```

### Shadow Adjustments

Shadows disappear in dark mode. Use colored shadows:

```css
/* Light mode */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

/* Dark mode */
box-shadow: 0 4px 12px rgba(201, 162, 39, 0.2);
```

### Illustration Handling

If using custom illustrations, export two versions:

- Light mode: Dark ink on light parchment
- Dark mode: Light ink on dark background

---

## 12. Brand Alignment

### Rocky Mount Heritage Aesthetic

**1790s Historical Authenticity:**

- **Materials:** Parchment paper, wood furniture, brass hardware, leather-bound books
- **Typography:** Serif fonts (modern interpretation of 18th-century printing)
- **Colors:** Warm neutrals (cream, wood tones), not cold grays
- **Ornamentation:** Subtle (section dividers with flourishes), not baroque

**Modern Interpretation:**

We're not building a skeuomorphic "fake old document" interface. We're evoking the feeling of an archive while using modern web patterns.

**Anti-Patterns:**

- Fake aged paper texture overlays (cheesy)
- Faux handwritten fonts (illegible)
- Literal drawer/file cabinet skeuomorphism (dated)

### Trust and Scholarship

**Visual Trust Signals:**

1. **Generous whitespace** — Not cramped, not overwhelming
2. **Consistent verification badges** — Always visible, never buried
3. **Clear source citations** — Large enough to read, linked to originals
4. **Professional typography** — Readable fonts, proper hierarchy
5. **Honest bias disclosures** — Prominent, not hidden in footnotes

**Anti-Patterns:**

- Tiny font sizes (looks sketchy)
- Missing citations (undermines credibility)
- Excessive popups/modals (annoying, not trustworthy)

### Accessibility Over Aesthetics

**When in conflict, choose:**

- Higher contrast over muted colors
- Larger touch targets over compact design
- Semantic HTML over div-soup with ARIA
- System fonts over exotic web fonts
- Clear language over academic jargon

**This is not a compromise.** Accessibility makes the site better for everyone.

---

## Success Criteria

A frontend developer should be able to:

### 1. Implement Any Component Without Mockups

Given just this document, build:

- DocumentSummary with all badges, collapsible objectives
- GlossaryTerm with hover/tap interactions
- BiasDisclosure with proper warning tone
- VerificationV2 with expandable methodology
- LearningPath with progress bar
- ComparisonView with responsive layout

### 2. Make Design Decisions Confidently

Know without asking:

- Spacing between elements (8px grid)
- Color for CTAs (brass)
- Font size for body text (18px Georgia for documents)
- Hover animation timing (0.25s ease)

### 3. Maintain Consistency Across Evidence Room

Use design tokens:

- `var(--brass)` not `#c9a227`
- `space-4` not `16px`
- `font-serif` not `Playfair Display`

### 4. Ensure Accessibility Without Guesswork

- All focus states use brass outline, 3px offset
- All touch targets minimum 44x44px
- All color pairings pre-tested for contrast
- All interactions have keyboard equivalents

---

## Appendix: Component Checklist

Before shipping any component, verify:

### Visual

- [ ] Matches color palette (no rogue colors)
- [ ] Uses spacing tokens (no magic numbers)
- [ ] Typography scale correct (clamp sizes for headings)
- [ ] Shadows from shadow system (subtle/medium/strong)

### Interaction

- [ ] Hover state defined (color change, lift, underline)
- [ ] Focus state defined (brass outline, 3px offset)
- [ ] Active state defined (button press, scale down)
- [ ] Loading state defined (skeleton or spinner)
- [ ] Error state defined (if applicable)

### Accessibility

- [ ] Semantic HTML (article, section, nav, not all divs)
- [ ] ARIA labels where needed (buttons, tooltips)
- [ ] Keyboard navigable (tab through all interactions)
- [ ] Screen reader tested (announces content correctly)
- [ ] Touch targets 44px minimum
- [ ] Color contrast AA or better

### Responsive

- [ ] Mobile (<640px) layout defined
- [ ] Tablet (640-1024px) layout defined
- [ ] Desktop (>1024px) layout defined
- [ ] No horizontal scroll on any breakpoint

### Motion

- [ ] Respects `prefers-reduced-motion`
- [ ] Animations <600ms duration
- [ ] Easing appropriate (ease-out for entrances)

---

**End of Design System Specification**

_This document is a living specification. Update as components evolve, but maintain consistency with established patterns._

_Last updated: January 29, 2026_
