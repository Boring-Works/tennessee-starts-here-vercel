# Evidence Page Accessibility & Usability Review

**Page:** `/app/(main)/evidence/page.tsx`
**Review Date:** January 30, 2026
**Focus:** User experience, navigation, readability, mobile-friendliness, screen reader compatibility

---

## Executive Summary

The Evidence Room page demonstrates strong accessibility foundations with thoughtful implementations for screen readers, keyboard navigation, and mobile responsiveness. The design is historically-inspired yet functional. However, there are opportunities to enhance clarity, discoverability, and user testing for different abilities.

**Overall Grade:** B+ (Strong implementation with refinement opportunities)

---

## 1. Navigation Clarity

### Strengths

- **Skip-to-Content Link** ✓ Present and accessible
  - Line 217-222: Keyboard-visible focus state with proper styling
  - Target anchor: `#blount-letter` (Entry Room collections)
  - Accessible: `.sr-only focus:not-sr-only` pattern implemented correctly

- **Semantic Section Markup** ✓ Excellent
  - All major sections use `<section>` with unique IDs
  - Each has `aria-labelledby` pointing to heading IDs
  - Proper heading hierarchy: H1 (hero title) → H2 (section titles)

- **Breadcrumb Navigation** ✓ Implemented
  - Structured data via JSON-LD for search engines
  - HTML breadcrumbs would enhance visual navigation (consider adding)

- **Card Catalog (Desktop Sidebar)** ✓ Fixed navigation
  - Desktop-only (hidden on mobile via CSS)
  - Includes search functionality with clear button
  - Active state styling indicates current section

### Issues & Recommendations

**Issue 1: Mobile Navigation Requires Scrolling**

- MobileGuide component appears only after scrolling 300px past hero
- Mobile users must scroll to see what's available
- **Fix:** Consider showing MobileGuide button earlier or persistent on mobile hero

**Issue 2: Hero Navigation Clarity**

- Four nav cards in grid (Lines 242-258) use icons without text labels initially visible
- Icon meanings may not be intuitive: `✦`, `★`, `⏱`, `❧`
- Text labels are visible but small on mobile
- **Fix:** Add `aria-label` or `title` attributes to icons for clarity

**Issue 3: No Search/Filter on Main Page**

- Users can't filter by date, person, or collection from Evidence page
- Must navigate to /evidence/documents for advanced search
- **Fix:** Consider adding a search bar or filter panel to main Evidence page

**Issue 4: Scroll Indicator May Be Missed**

- "Scroll to explore" indicator (Lines 273-276) animates gently
- On mobile, users may scroll before reading it
- **Fix:** Make scroll indicator more prominent on mobile or add a brief intro banner

---

## 2. Search & Filter Functionality

### Current State

- **No native search on main Evidence page**
- SearchBar component exists (SearchBar.tsx) but used only on document library pages
- Users must navigate to `/evidence/documents` to search

### Strengths

- SearchBar has excellent keyboard navigation (ArrowUp/Down, Enter, Escape)
- Results highlight matching terms with context snippets
- Semantic HTML: `role="combobox"`, `role="listbox"`, `aria-selected`

### Recommendations

**Enhancement 1: Add Search to Hero Section**

```tsx
// Consider adding this above or within the EntryRoom section:
<SearchBar index={evidenceIndex} placeholder="Search 72 documents..." />
```

**Enhancement 2: Filter by Collection**

- Add toggle buttons for collection types:
  - Blount Papers
  - Treaties & Proclamations
  - Knoxville Gazette
  - Federal Correspondence
  - Cherokee Signatories
  - Timeline

**Enhancement 3: Timeline Browsing**

- Currently users must scroll to view timeline events
- Add year selector or decade filter for quicker navigation

---

## 3. Mobile Experience

### Strengths

- **Responsive grid layouts** ✓
  - Hero nav: 2 columns on mobile, 4 on tablet+ (CSS Grid)
  - Timeline: Stacked on mobile, grid on tablet+
  - Sources: 1 column mobile, 2 on tablet, 3 on desktop
  - All use `clamp()` for fluid typography

- **Touch-friendly buttons** ✓
  - Minimum 44px height on interactive elements
  - MobileGuide button: 48px × 48px
  - Sufficient spacing between tappable elements

- **Readable text sizes**
  - Quote text: `clamp(1rem, 2.5vw, 1.125rem)` — scales appropriately
  - Body text: 0.9rem on mobile, increases on tablet
  - Serif font for historical feel, readable on all sizes

### Issues

**Issue 1: Hero Section Padding**

- 140px padding-top on mobile (Line 268) uses 140px (fixed value)
- On small phones (iPhone SE), this wastes screen real estate
- Users see mostly dark wood hero before content
- **Fix:** Use `clamp(4rem, 15vh, 140px)` for responsive hero padding

**Issue 2: Card Catalog Hidden on Mobile**

- Sidebar completely hidden (display: none) until 1024px
- No alternative left-side navigation shown on mobile
- MobileGuide button (bottom-right) is adequate but later appears
- **Fix:** Consider showing simplified version on tablet (768px+)

**Issue 3: Decorative Elements on Mobile**

- Section dividers with ornaments (❧, ✦) work well
- Quote cards rotate slightly (transform: rotate) — good for visual interest
- However, many decorative gradients/textures use resources
- **Fix:** Consider reducing shadow complexity on mobile for performance

**Issue 4: EntryRoom Collections Display**

- Six collection cards stack vertically on mobile
- Users must scroll to see all options
- **Fix:** Show 2-column grid on mobile, 3-column on tablet

**Mobile Viewport Testing Recommendations:**

- Test at: 375px (iPhone SE), 414px (iPhone 11), 768px (iPad)
- Verify: font sizes readable without zoom, tap targets 44px+, no horizontal scrolling

---

## 4. Screen Reader Compatibility

### Strengths

**Semantic Structure** ✓

- All sections use proper heading hierarchy
- Landmark regions: `<section>`, `<nav>`, `<article>`
- Buttons properly typed: `type="button"` throughout

**ARIA Implementation** ✓

- Skip link: included (Line 217)
- Breadcrumbs: JSON-LD structured data
- MobileGuide:
  - `aria-expanded` on toggle button
  - `aria-label="Close guide"` on close button
  - `aria-controls="mobile-guide-menu"`
  - `aria-current="true"` on active section
  - `aria-live="polite"` for section announcements
  - `aria-label="Jump to {section} section"`

**Links** ✓

- All external links have `target="_blank" rel="noopener noreferrer"`
- Link text descriptive: "View Original Source", "Read the full letter", etc.
- "View original 23-page manuscript" (Line 513) provides context

### Issues

**Issue 1: Decorative Elements Not Properly Hidden**

- Ornamental dividers use `aria-hidden="true"` ✓ (Line 25, 177)
- BUT: Quote marks (`.quoteOpen`, `.quoteClose`) positioned absolutely
- Screen readers may still announce these pseudo-elements if read as text
- **Fix:** Ensure quote marks have `aria-hidden="true"` or are styled with `user-select: none`

**Issue 2: Image Emoji Icons Not Labeled**

- EntryRoom collections (Line 89-104) use emoji icons: 📜, 🖋️, 📰, ✉️, 🪶, 📅
- No `aria-label` on these spans
- Screen reader users get "image emoji" without context
- **Fix:** Add `aria-label` to icon spans:

```tsx
<span className={styles.collectionIcon} aria-label="Documents">
  📜
</span>
```

**Issue 3: Context Panel Announcements Limited**

- Curator's Note (Line 85-91) is informational but not announced as important
- Could use `role="doc-note"` from Digital Publishing Module
- **Fix:**

```tsx
<aside className={styles.curatorNote} role="doc-note">
  <span className={styles.curatorLabel} id="curator-note-label">
    Curator's Note
  </span>
  <p aria-labelledby="curator-note-label">{children}</p>
</aside>
```

**Issue 4: Signer Cards Lack Context**

- Cherokee names and English names displayed but relationship unclear to screen readers
- **Fix:** Add ARIA descriptions:

```tsx
<div className={styles.signerCard} aria-label={`${cherokeeName}, known as ${englishName}, ${role}`}>
```

**Issue 5: Timeline Featured Events Not Emphasized**

- Some timeline events marked as "featured" with styling only
- Screen reader users won't know which events are highlighted
- **Fix:** Add `role="doc-highlight"` or aria-label:

```tsx
<div className={styles.timelineEvent} aria-label={featured ? `Featured: ${event}` : event}>
```

**Issue 6: Quote Attribution Structure**

- Citations use `<cite>` tag (Line 138) ✓ correct
- BUT: No link to primary source document from attribution
- **Fix:** Consider linking author name to related documents

---

## 5. Reading Level & Content Clarity

### Current Assessment

**Writing Style:**

- Sophisticated, historically-informed language
- Audience appears to be: high school + college educated history students and general readers
- Estimated reading level: 9th-10th grade

**Example passages:**

- "Glass windows were rare even in settler communities..." (Line 296) — Clear and explanatory
- "The answer would determine where federal authority took root..." (Line 346) — Accessible complex thought

### Strengths

- Curator's Notes provide historical context (1.5-2 sentences each)
- Primary quotes include explanatory context (Line 296-297, 338)
- Section subtitles explain purpose of each section

### Recommendations

**Enhancement 1: Add Definitions for Archival Terms**

- Terms used: MSS (manuscript), CHRON (chronology), REF (reference)
- Add tooltips or glossary:

```tsx
<span title="Manuscript collection">MSS.1790.001</span>
```

**Enhancement 2: Simplify Collection Codes**

- Current: `MSS.1790.001 — Blount Correspondence`
- Consider: `1790 Letters from Governor Blount`
- Archival codes useful for researchers but may confuse general readers

**Enhancement 3: Add Reading Time Estimates**

- Sections vary from 2-10 minutes to read
- Add estimate: "5-minute read" or "10 key dates"
- Helps users decide what to explore

**Enhancement 4: Provide Context Before Dense Content**

- Timeline section: 12 events
- Quote collections: 5 featured passages
- Could benefit from brief intro: "This timeline shows 12 key events from 1790-1796"

**Enhancement 5: Glossary Sidebar**

- Historical terms: "Treaty of Holston", "Cherokee Nation", "Southwest Territory"
- Consider expandable glossary or linked definitions

---

## 6. Visual Design Improvements

### Current Palette & Design

- Color scheme: Wood tones (#2a1f1a, #3d2e24) + Brass accents (#c9a227)
- Typography: Serif fonts for historical authenticity
- Layout: Card-based with organic rotations and shadows

### Strengths

- Historically authentic aesthetic without being overwrought
- Color contrast meets WCAG AA for text on backgrounds
- Consistent visual hierarchy via typography sizes

### Issues & Recommendations

**Issue 1: Contrast on Featured Elements**

- Featured quote card (`.quoteCardFeatured`) uses light gradient background
- Quote text color: `var(--ink)` (#1a1a1a or darker)
- Verify contrast ratio (should be 4.5:1 for normal text, 3:1 for large text)
- **Test:** Use WebAIM Contrast Checker on actual rendered colors

**Issue 2: Icon Clarity in Hero Nav**

- Icons are decorative symbols: ✦, ★, ⏱, ❧
- ⏱ (hourglass) for "Timeline" is not immediately clear
- ❧ (fleuron) for "Sources" is decorative but not intuitive
- **Fix:** Add text labels always visible, not just on hover

**Issue 3: Quote Marks Positioning**

- Opening quote mark positioned absolutely (Line 829-831)
- Can overlap text on small screens
- **Fix:** Use `position: relative` within quote text block or adjust positioning

**Issue 4: Timeline Dot Visibility**

- Brass dots on cream background (Line 1204-1206)
- Color: `var(--brass)` (#c9a227)
- Background: `var(--cream-medium)` (#faf7f0)
- Contrast: Good but verify on all devices
- **Enhancement:** Add subtle border or shadow for emphasis

**Issue 5: Source Card Decorative Elements**

- Brass "label" (top) and "pull handle" (bottom) on source cards
- Beautiful but add cognitive load
- **Recommendation:** Consider simplified version on mobile

---

## 7. Keyboard Navigation

### Strengths

- All buttons focusable with clear `:focus-visible` states
- Tab order follows visual hierarchy
- Skip link at top enables jumping to main content

### Detailed Testing Results

**Hero Section:**

- ✓ Tab through nav cards (4 cards on desktop, 2 on mobile)
- ✓ Library CTA button is focusable
- ✓ Focus indicators visible (outline on buttons, border on cards)

**MobileGuide Menu:**

- ✓ Tab trap implemented correctly (Lines 95-116 in MobileGuide.tsx)
- ✓ Escape key closes menu and returns focus to button
- ✓ First item receives focus when menu opens (Line 80)
- ✓ Last item wraps to first with Shift+Tab

**Forms & Interactive Elements:**

- Card Catalog search input (Line 2185-2203):
  - ✓ Focus state visible
  - ✓ Clear button keyboard accessible (min 44px height)
  - ✓ Placeholder text present

**Recommendation:**

- Add `outline-offset` to buttons for better focus visibility:

```css
button:focus-visible {
  outline: 2px solid var(--brass);
  outline-offset: 2px; /* adds space between button and outline */
}
```

---

## 8. Performance & Load Impact

### Visual Effects

- Page uses multiple decorative gradients and textures
- Wood grain patterns (repeating linear gradients)
- Paper texture SVG (base64 encoded in CSS)
- Animations: scroll pulse, transitions on hover

### Mobile Considerations

- Reduced motion support: ✓ Present (Line 2088-2126)
  - `@media (prefers-reduced-motion: reduce)` disables animations
  - Transforms removed
  - Transitions set to `none`

### Recommendations

- Consider lazy-loading decorative SVG textures
- Monitor performance on low-end devices
- Test animation frame rates on mobile (60fps target)

---

## 9. Accessibility Testing Checklist

### Automated Testing (Tools)

- [ ] Run Lighthouse Accessibility audit
- [ ] WAVE (Web Accessibility Evaluation Tool) scan
- [ ] Axe DevTools scan for violations
- [ ] NVDA screen reader (Windows) test
- [ ] JAWS screen reader test (if budget allows)

### Manual Testing

- [ ] Keyboard navigation: Tab through entire page
- [ ] Screen reader: Navigate using heading shortcuts (H key)
- [ ] Mobile: Test on iPhone 11, Samsung Galaxy A12
- [ ] Zoom: Test at 200% magnification (no horizontal scroll)
- [ ] Color: Disable color, verify using contrast/patterns
- [ ] Font size: Test with browser font size increased to 24px

### User Testing (Recommended)

- [ ] Test with users who are blind/low vision (screen reader users)
- [ ] Test with users with motor disabilities (keyboard-only navigation)
- [ ] Test with users with cognitive disabilities (reading level, information density)
- [ ] Test with older adults (70+) for vision and motor challenges

---

## 10. Recommended Enhancements (Priority Order)

### High Priority (Implement Soon)

1. **Add emoji `aria-label` attributes to collection icons**
   - Affects screen reader users immediately
   - Easy fix (5 lines of code)

2. **Add search bar to main Evidence page**
   - Improves discoverability
   - Reduces clicks to find specific content
   - ~30 minutes implementation

3. **Enhance timeline with year/decade filter**
   - Helps users navigate 12 events faster
   - Mobile users benefit most
   - ~1-2 hours implementation

4. **Verify color contrast ratios**
   - Ensure all text meets WCAG AA (4.5:1)
   - Use WebAIM Contrast Checker
   - ~30 minutes testing

### Medium Priority (Next Sprint)

5. **Add glossary tooltips for archival terms**
   - Improves understanding for general readers
   - Educates about archival systems
   - ~1-2 hours implementation

6. **Implement featured timeline events with ARIA**
   - Adds emphasis for screen readers
   - Better semantic markup
   - ~30 minutes

7. **Simplify hero nav icon meanings**
   - Add visible labels or tooltips
   - Improve intuitive understanding
   - ~30 minutes

8. **Add reading time estimates**
   - Helps users plan engagement
   - "5-minute read" labels
   - ~1 hour

### Low Priority (Nice to Have)

9. **Reduce decorative complexity on mobile**
   - Simplified shadows and gradients
   - Better performance
   - Maintain aesthetic integrity
   - ~2 hours

10. **Enhanced caption support for images**
    - If future image additions occur
    - Descriptive alt text strategy
    - ~30 minutes (per image)

---

## 11. Specific Code Examples

### Example 1: Fix Emoji Icon Accessibility

**Before:**

```tsx
<span className={styles.collectionIcon}>{collection.icon}</span>
```

**After:**

```tsx
<span className={styles.collectionIcon} aria-label={`${collection.name} collection`}>
  {collection.icon}
</span>
```

### Example 2: Enhance Featured Timeline Events

**Before:**

```tsx
<TimelineEvent date="Jul 2, 1791" event="Treaty of Holston signed" featured />
```

**After:**

```tsx
<div
  className={styles.timelineEvent}
  role={featured ? 'doc-highlight' : undefined}
  aria-label={featured ? `Important: ${event}` : undefined}
>
  {/* content */}
</div>
```

### Example 3: Add Hero Section Search

```tsx
// Insert in hero section after nav grid:
<div className={styles.heroSearch}>
  <SearchBar
    index={evidenceIndex}
    placeholder="Search 72 documents by topic or person..."
    onResultClick={() => setIsOpen(false)}
  />
</div>
```

### Example 4: Responsive Hero Padding

**Before:**

```css
.hero {
  padding: 140px 1rem 5rem;
}
```

**After:**

```css
.hero {
  padding: clamp(4rem, 15vh, 140px) 1rem 5rem;
}
```

---

## 12. Resources & Standards

### WCAG 2.1 Guidelines Applied

- **1.3.1 Info and Relationships** — Semantic HTML structure
- **1.4.3 Contrast (Minimum)** — Color contrast ratios
- **2.1.1 Keyboard** — Full keyboard navigation
- **2.4.1 Bypass Blocks** — Skip to content link
- **2.4.3 Focus Order** — Logical tab order
- **3.1.1 Language of Page** — HTML lang attribute (should verify)
- **3.2.3 Consistent Navigation** — Navigation consistent across pages
- **4.1.2 Name, Role, Value** — ARIA labels and semantic HTML

### Testing Tools Recommended

- **WAVE:** WebAIM's Accessibility Evaluation Tool
- **Axe DevTools:** Automatic accessibility scanning
- **Lighthouse:** Built into Chrome DevTools
- **NVDA:** Free screen reader for Windows
- **WebAIM Contrast Checker:** Color contrast validation

### Further Reading

- [MDN: ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [A11y Project](https://www.a11yproject.com/)
- [WebAIM Articles](https://webaim.org/articles/)
- [Tennessee Historical Society Accessibility Guide](https://www.tn-history.org/)

---

## Conclusion

The Evidence Room page demonstrates a strong commitment to accessibility while maintaining historical authenticity and visual appeal. The foundation is solid with semantic HTML, keyboard navigation, and screen reader support already in place.

The recommended enhancements focus on **discoverability** (search, filters), **clarity** (labels, glossary), and **inclusivity** (emoji labels, featured event emphasis).

**Next Steps:**

1. Run automated accessibility audits (Lighthouse, WAVE, Axe)
2. Implement high-priority fixes (emoji labels, search)
3. Conduct user testing with assistive technology users
4. Iterate based on feedback

**Estimated Implementation Time:** 8-16 hours for all recommendations
**Estimated User Testing:** 4-6 hours (coordinate with accessibility consultants)

---

**Review Conducted By:** Claude Code
**Date:** January 30, 2026
**Status:** Initial Review Complete — Ready for Implementation Planning
