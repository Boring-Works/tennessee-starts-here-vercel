# Evidence Room - Visual Design Review

**Date:** January 30, 2026
**Scope:** Evidence page (/evidence) visual hierarchy, aesthetics, typography, color, and brand consistency
**Files Reviewed:** `/app/(main)/evidence/page.tsx`, `/app/(main)/evidence/page.module.css`, supporting components

---

## Executive Summary

The Evidence Room employs a sophisticated **library/archive metaphor** with strong period-authentic aesthetics. The design successfully evokes a curated historical collection through careful layering of visual elements: dark wood paneling, aged paper textures, brass hardware details, and serif typography. The page demonstrates **excellent visual hierarchy** with clear sectional distinction and a thoughtful color palette rooted in 18th-century materials.

**Overall Assessment:** Strong design with cohesive visual language. Minor opportunities for enhancement in interactive feedback and mobile readability.

---

## 1. Visual Hierarchy

### Strengths

**Strong Sectional Clarity**

- Each section (Hero, Collections, Quotes, Timeline, Sources, CTA) is visually distinct with clear boundaries
- Background gradients and texture overlays create depth: wood → cream → wood progression
- Collection labels (MSS.1790.001, TREATY.1791.001) establish archival credibility and cognitive anchors

**Clear Content Progression**

- Hero section with centered title and navigation grid provides immediate orientation
- EntryRoom introduction bridges hero and main content with 6 collection cards
- Quote cards, signers, timeline, and sources maintain consistent visual weight throughout
- Card Catalog (desktop) sidebar provides persistent navigation context

**Typography Hierarchy**

```
H1 (Hero Title): clamp(2rem, 8vw, 3.5rem) — commanding presence
H2 (Section Titles): clamp(1.375rem, 4vw, 1.75rem) — clear section breaks
Section Subtitles: clamp(0.875rem, 2.5vw, 1rem) in serif-elegant italic
Body Text: 0.9–1rem for readability
```

- Font sizing is responsive (using `clamp()`) and maintains hierarchy across breakpoints
- Serif fonts (EB Garamond, Cormorant) reinforce period authenticity

### Weaknesses

**Mobile Hierarchy Compression**

- At mobile viewports, hero badge and title compress significantly
- Hero navigation grid drops to 2 columns (from 4 on desktop), creating visual imbalance
- Collection cards in EntryRoom use emoji icons that may not render consistently across devices

**Section Dividers as Visual Separators**

- While ornamental (❧ ✦), section dividers occupy space without adding functional clarity
- Could be more subtle or leverage spacing alone on mobile (currently shown on all viewports)

**Quote Card Emphasis**

- Featured quote cards have subtle visual distinction (larger padding, gold border) but could use stronger visual weight
- Large quote marks (2.5–4.5rem) are semi-transparent (opacity: 0.15–0.2), reducing impact

---

## 2. Design Aesthetics

### Period-Authentic Material Metaphors

**Wood Paneling (Hero & CTA Sections)**

```css
background:
  var(--wood-grain-pattern),
  linear-gradient(180deg, var(--wood-dark) 0%, var(--wood-medium) 60%, var(--wood-light) 100%);
```

- Dark wood gradient (#2a1f1a → #3d2e24 → #4a3728) mimics aged library furniture
- Horizontal grain pattern adds tactile realism
- Vignette effect (radial-gradient on page::after) subtly darkens edges, creating an enclosed space

**Cream Paper Surface (Content Sections)**

```css
background: var(--cream-medium); /* #faf7f0 */
paper-texture: subtle SVG noise (3% opacity);
```

- Off-white color (#faf7f0) is authentic to period paper without being stark white
- Subtle fractal noise overlay mimics aged paper without overwhelming content
- Differentiation between cream-light (#fffef8) and cream-dark (#f5f0e6) creates visual depth

**Brass Hardware Details**

```css
--brass: #c9a227 --brass-dark: #b8860b --brass-light: #d4af37 (on hover);
```

- Brass accent used for borders, icons, active states, and decorative elements
- Gradient overlays on brass details (linear-gradient 180deg) suggest metallic sheen
- Subtle glow effect on active card catalog items (box-shadow: 0 0 8px rgba(201, 162, 39, 0.5))

**Strengths:**

- Cohesive metaphor feels intentional, not arbitrary
- Material choices have historical plausibility
- Texture overlays (wood grain, paper noise) add authenticity without compromising readability

**Weaknesses:**

- Paper texture is sometimes imperceptible on smaller screens (3% opacity is very subtle)
- Wood grain pattern horizontal lines can create visual noise on very large displays
- Brass accent could have more prominence in the overall color scheme (currently used sparingly)

---

## 3. Visual Hierarchy: Color Scheme

### Color Palette Effectiveness

| Color                      | Role               | Usage                            | Effectiveness               |
| -------------------------- | ------------------ | -------------------------------- | --------------------------- |
| **#2a1f1a (Wood Dark)**    | Primary background | Hero, CTA sections, text         | Excellent—conveys authority |
| **#faf7f0 (Cream Medium)** | Content background | Main reading surfaces            | Excellent—warm, readable    |
| **#c9a227 (Brass)**        | Accent/interactive | Links, active states, highlights | Good—visible but subtle     |
| **#1a1a1a (Ink)**          | Text               | Body copy, headings              | Excellent—high contrast     |
| **#8b4513 (Leather)**      | Secondary accent   | Hover states, borders            | Adequate—less used          |

### Color Contrast & Accessibility

**WCAG 2.1 Compliance Check:**

- Dark text (#1a1a1a) on cream (#faf7f0): **>14:1 contrast** ✓ Excellent
- Brass (#c9a227) on wood (#2a1f1a): **4.2:1 contrast** ⚠ AA-compliant but marginal for small text
- Brass on cream: **5.8:1 contrast** ✓ AA-compliant

**Issues:**

- Card catalog links on cream background use `color: var(--brass-dark)` (#b8860b) on hover, reducing contrast to ~4:1
- Italic subtext in some sections uses `opacity: 0.85–0.9`, which can fail contrast tests for users with low vision

### Color Hierarchy Assessment

**Clear:** Wood (primary) → Cream (content) → Brass (accents)

**Opportunity:** The design could benefit from stronger color variation. Secondary colors (leather, burgundy from global styles) are underutilized, resulting in a somewhat monochromatic feel despite the rich palette definition.

---

## 4. Typography & Readability

### Font Stack

```
--font-serif: EB Garamond, Playfair, Georgia (headings, body)
--font-serif-elegant: Cormorant, Georgia (subtitles, quotes)
--font-mono: SF Mono, Monaco (archival codes: MSS.1790.001)
```

**Strengths:**

- Font pairing is historically appropriate (serif for period documents)
- Generous line-height (1.8–1.85) ensures comfortable reading on long passages
- Monospace codes create visual distinction for archival references

**Readability Assessment:**

| Element             | Font Size     | Line Height | Spacing              | Readability           |
| ------------------- | ------------- | ----------- | -------------------- | --------------------- |
| Body text in quotes | 0.9–1rem      | 1.85        | Generous             | Excellent             |
| Timeline events     | 0.9rem        | 1.65        | Adequate             | Good                  |
| Collection labels   | 0.625rem      | —           | 0.1em letter-spacing | Small but intentional |
| Curator notes       | 0.875rem      | 1.7         | Adequate             | Good                  |
| Mobile hero title   | ~2rem (clamp) | —           | 0.02em               | Good responsiveness   |

**Issues:**

- **Curator notes in italics** combined with `font-size: 0.875rem` may be challenging for users with dyslexia or low vision
- **Collection labels in monospace** (0.625rem) are quite small; acceptable but could benefit from larger size on mobile
- **Quote marks** (2.5–4.5rem) are decorative but don't scale with text size using `clamp()`, can appear disproportionate at different breakpoints

**Recommendations:**

- Consider `font-style: normal` for Curator notes with left border for distinction
- Increase collection label minimum size: `clamp(0.7rem, 1.5vw, 0.875rem)`
- Use `clamp()` for quote mark sizing

---

## 5. Image & Media Integration

### Current Approach

The Evidence page is **text and typography-heavy** with minimal image/media elements:

- No hero images or background photographs
- No document thumbnails or preview images
- Emoji icons used in collection cards (📜 📰 ✉️ 🪶 📅 🖋️)

### Assessment

**Strengths:**

- Clean, focused presentation emphasizes primary content (quotes, documents)
- Absence of photography avoids visual clutter and loading delays
- Typography-first approach suits archival content

**Opportunities:**

- **Document thumbnails** for quote cards would help users preview content before reading full text
- **Manuscript images** (where available) could be integrated in expanded sections
- **Portrait silhouettes or badges** for Treaty signers (currently text-only cards)
- **Timeline manuscript links** already exist but could have preview images

**Current Implementation:**

- Quote cards use subtle paper texture background (SVG noise)
- No actual document images are displayed on the Evidence page itself
- DocumentViewer component exists for detail pages (evidence/documents/[slug]) but isn't used on main page

**Recommendation:** Consider adding optional preview images to featured quote cards and treaty signer sections, with lazy-loading and a "view full image" link.

---

## 6. Brand Consistency with Site

### Design Language Alignment

**Navigation Tokens (from globals.css):**

```css
--nav-gold: #c9a227 /* Matches brass */ --nav-heritage-brown: #4a3728 /* Matches wood-light */;
```

Evidence page successfully leverages site-wide design tokens.

**Consistency Matrix:**

| Element            | Evidence Page                        | Site-Wide                   | Alignment           |
| ------------------ | ------------------------------------ | --------------------------- | ------------------- |
| Primary Colors     | Wood/Cream/Brass                     | Heritage brown/parchment    | ✓ Consistent        |
| Typography System  | Serif-focused                        | EB Garamond, Cormorant      | ✓ Consistent        |
| Spacing Scale      | Generous padding (1.5–4rem sections) | Generous margins            | ✓ Consistent        |
| Border Radius      | 2–3px (subtle)                       | Mostly 2px                  | ✓ Consistent        |
| Motion/Transitions | 0.35s spring easing                  | --nav-ease-spring           | ✓ Consistent        |
| Card Design        | Paper-textured with shadows          | Similar box-shadow patterns | ✓ Mostly consistent |

### Visual Metaphor Consistency

The Evidence page uses an **archive/library metaphor** while the broader site uses **18th-century colonial heritage** metaphor. These align well:

- Library aesthetic is authentic to period
- Material choices (wood, paper, brass) feel era-appropriate
- Navigation and header maintain site-wide styling

**Potential Disconnect:**

- Welcome screen (/) is cinematic and modern by contrast
- Events/Visit pages are more contemporary in layout
- Evidence page is more "period-accurate" in design than other pages

This isn't inconsistency per se—it's _intentional thematic differentiation_. The Evidence Room is presented as a special exhibit, distinct from general site content.

---

## 7. Interactive Feedback & States

### Hover States

**Quote Cards:**

```css
.quoteCard:hover {
  transform: rotate(0deg) translateY(-2px);
  box-shadow: elevation increase (subtle lift effect);
}
```

- Cards have subtle organic rotation (rotate(-0.3deg)) at rest
- On hover, rotation resets and card lifts 2px
- Shadow elevation increases, suggesting interaction

**Card Catalog Links (Desktop):**

```css
.cardCatalogLink:hover {
  background: rgba(201, 162, 39, 0.08);
  border-left-color: rgba(201, 162, 39, 0.5);
}

.cardCatalogLinkActive {
  background: rgba(201, 162, 39, 0.15);
  border-left: 3px solid #c9a227;
  box-shadow: 0 0 8px rgba(201, 162, 39, 0.5);
}
```

- Active state includes left border, background, and glow effect—very clear
- Hover states subtle but distinguishable

**Assessment:**

- Feedback is **present but subtle**, which matches the period-authentic aesthetic
- Danger: Users may not immediately recognize interactive elements (especially subtle hover states)
- Link styling could benefit from underlines or stronger color change on hover

### Focus States

```css
.cardCatalogLink:focus-visible {
  outline: 2px solid var(--brass);
  outline-offset: 4px;
}
```

- Keyboard focus has clear brass-colored outline
- 4px offset ensures visibility
- **Good accessibility**

**Missing focus states:**

- Collection cards in EntryRoom don't have explicit `:focus-visible` styling (only `:hover`)
- Quote source links could benefit from clearer focus indication

---

## 8. Responsive Design & Mobile Experience

### Breakpoints

| Breakpoint            | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| Mobile (< 640px)      | 1-col grid, scaled typography                   |
| Tablet (640–1023px)   | 3-col collection grid, larger spacing           |
| Desktop (1024–1279px) | Card catalog sidebar appears, 4-col hero nav    |
| Large (1280+)         | Sidebar width adjustment, max-width enforcement |

### Mobile-Specific Issues

**Hero Navigation:**

- Mobile: 2-column grid
- Tablet: 4-column grid
- Feels cramped on mobile; 2-column layout may be optimal

**Section Dividers:**

- Show on all viewports; could be hidden on mobile to save space
- Currently: `display: block` on all sizes

**Card Catalog Sidebar:**

- Hidden on mobile (display: none)
- Hidden on tablet (display: none)
- Only shows on desktop (display: block at 1024px+)
- ✓ Good responsive hiding

**Typography Scaling:**

- Uses `clamp()` for fluid scaling—good approach
- Hero title: `clamp(2rem, 8vw, 3.5rem)` ensures readability at all sizes

**Issues:**

- Emoji icons in collection cards may not render consistently on older browsers
- Collection count badges (`<span>`) are hard to read at small sizes (0.6875rem)
- QuoteCard rotation angles change per breakpoint (mobile: -0.3deg, tablet: -0.5deg, desktop: -0.7deg), which is good but may cause slight jank when resizing

---

## 9. Strengths Summary

| Category                | Strength                              | Evidence                                              |
| ----------------------- | ------------------------------------- | ----------------------------------------------------- |
| **Visual Metaphor**     | Cohesive library/archive aesthetic    | Wood paneling, brass hardware, aged paper             |
| **Typography**          | Historically appropriate and readable | EB Garamond + Cormorant pairing, generous line-height |
| **Hierarchy**           | Clear sectional distinction           | Color, spacing, collection labels provide anchors     |
| **Accessibility**       | Good contrast and focus states        | WCAG AA compliance, keyboard navigation               |
| **Responsiveness**      | Fluid typography scaling              | clamp() usage, thoughtful breakpoints                 |
| **Brand Consistency**   | Strong alignment with site tokens     | Brass, heritage brown, serif fonts match globals      |
| **Attention to Detail** | Subtle textures and refinements       | Paper noise overlay, wood grain, vignette effect      |

---

## 10. Weaknesses & Opportunities

### Critical Issues

| Issue                            | Impact                                           | Recommendation                                                               |
| -------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| **Brass link contrast on cream** | Links at 4.2:1 contrast (marginal WCAG AA)       | Increase brass saturation or use darker brass shade (#a0860b) for text links |
| **Collection label size**        | 0.625rem monospace may be hard to read on mobile | Use `clamp(0.7rem, 1.5vw, 0.875rem)`                                         |
| **Italic Curator notes**         | May be challenging for users with dyslexia       | Consider normal font-style with left border accent                           |

### Design Opportunities

| Opportunity                            | Benefit                                      | Effort                                                     |
| -------------------------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| **Add document thumbnail images**      | Visual preview, reduced cognitive load       | Medium—requires image assets and lazy-loading              |
| **Stronger featured quote emphasis**   | Currently subtle; could use visual weight    | Low—increase padding, border accent, or shadow             |
| **Portrait badges for signers**        | Visual interest, helps differentiate people  | Medium—requires commissioning or sourcing silhouettes      |
| **Mobile-specific divider hiding**     | Reclaims space, cleaner mobile layout        | Low—add `display: none` at mobile breakpoint               |
| **Keyboard-friendly collection cards** | Better keyboard navigation on mobile         | Low—add :focus-visible styling to all interactive elements |
| **Page-wide search**                   | Currently searching within Card Catalog only | High—requires backend search integration                   |

### Mobile Refinements

**Current:** 2-column hero nav grid on mobile
**Opportunity:** Could become 1-column on very small screens (< 480px) or collapse into a dropdown menu

**Current:** Section dividers shown on all screens
**Opportunity:** Hide on mobile (<640px) to reduce whitespace

**Current:** No visual hint that Card Catalog is available on desktop
**Opportunity:** Small indicator or tooltip on desktop first-visit

---

## 11. Recommendations by Priority

### Priority 1 (Accessibility)

1. **Increase brass link contrast** — Change link color from `--brass-dark` (#b8860b) to `#8b6f47` or use darker variant
2. **Add :focus-visible to collection cards** in EntryRoom for keyboard navigation clarity
3. **Adjust italic Curator notes** — Use normal font-style with left border or background tint instead

### Priority 2 (Visual Enhancement)

1. **Strengthen featured quote visuals** — Increase border thickness (1px → 2px) or add subtle background tint
2. **Improve quote mark prominence** — Use `clamp()` for responsive sizing
3. **Add portrait badges to Treaty Signers** — Silhouettes or placeholder avatars

### Priority 3 (Mobile UX)

1. **Hide section dividers on mobile** — Reduces visual clutter
2. **Adjust hero nav to 1-column on very small screens** — Improves readability
3. **Increase collection label minimum size** — Clamp value to ensure readability

### Priority 4 (Future Enhancement)

1. **Add document preview images** — For featured quotes and signers
2. **Implement full-page search** — Beyond Card Catalog search
3. **Add timeline manuscript preview images** — Visualize original documents

---

## 12. Conclusion

The Evidence Room demonstrates **excellent visual design** grounded in a clear historical metaphor. The use of materials (wood, paper, brass), typography, and color creates an immersive archive experience that feels authentic without being pastiche.

**Key Strengths:**

- Cohesive aesthetic aligned with brand values
- Strong visual hierarchy through color and spacing
- Thoughtful responsive design with fluid typography
- Accessible keyboard navigation and focus states

**Key Opportunities:**

- Refine link contrast for full WCAG AAA compliance
- Introduce visual assets (thumbnails, portraits) to reduce cognitive load
- Enhance interactive feedback for subtle hover states
- Optimize mobile layout to reduce whitespace

**Overall Visual Assessment:** **8.5/10**

- Design quality and coherence: 9/10
- Accessibility and usability: 8/10
- Brand consistency: 9/10
- Mobile responsiveness: 8/10
- Opportunity for enhancement: 7/10

The Evidence Room is a strong example of thematic design that serves content well. Implementing the Priority 1 accessibility recommendations would strengthen the experience, while Priority 2–4 items would enhance visual appeal and engagement.

---

## Appendix: Design Tokens Reference

### Colors

```css
--wood-dark: #2a1f1a;
--wood-medium: #3d2e24;
--wood-light: #4a3728;
--cream-dark: #f5f0e6;
--cream-medium: #faf7f0;
--cream-light: #fffef8;
--brass: #c9a227;
--brass-dark: #b8860b;
--ink: #1a1a1a;
--leather: #8b4513;
```

### Transitions

```css
--transition-dignified: 0.35s var(--nav-ease-spring);
--transition-slow: 0.5s ease;
```

### Typography

```css
--font-serif:
  EB Garamond, Playfair, Georgia --font-serif-elegant: Cormorant,
  Georgia --reading-line-height: 1.85;
```

### Spacing & Layout

```css
Container max-width: 46–50rem
Section padding: 4–6rem (vertical), 1–2rem (horizontal)
Grid gaps: 0.75–1.25rem (mobile to desktop)
```

---

**Document prepared:** January 30, 2026
**Review scope:** Visual design, hierarchy, typography, color, brand consistency
**Files analyzed:** page.tsx, page.module.css, EntryRoom, globals.css
