# Visual QA Checklist - Tennessee Starts Here

## Production Launch Verification

**Mission:** Verify tennesseestartshere.com is visually perfect before declaring production-ready.

**Test Date:** ******\_******
**Tester:** ******\_******
**Environment:** Production (tennesseestartshere.com)

---

## Testing Matrix

Test ALL pages on these configurations:

### Browsers (Desktop)

- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)

### Viewports

- [ ] Mobile (375px - iPhone SE)
- [ ] Tablet (768px - iPad)
- [ ] Desktop (1920px - Standard monitor)

### Mobile Browsers

- [ ] iOS Safari (iPhone)
- [ ] Android Chrome

---

## 1. GLOBAL ELEMENTS

Test these on EVERY page:

### Navigation (Desktop)

- [ ] Logo visible and links to /home
- [ ] All nav links visible and correctly labeled
- [ ] Navigation scrolls to sticky header (dark background)
- [ ] Active page highlighted in navigation
- [ ] Hover states work on all links (gold underline)
- [ ] Dropdown menus (if any) open smoothly
- [ ] Focus states visible (gold outline on Tab)
- [ ] Text uses Cinzel font (uppercase, small, widely spaced)

### Navigation (Mobile)

- [ ] Hamburger menu visible
- [ ] Hamburger menu opens/closes smoothly
- [ ] All links accessible in mobile drawer
- [ ] Drawer has dark background with good text contrast
- [ ] Touch targets at least 44x44px
- [ ] No layout shift when opening menu

### Footer

- [ ] All sections render (About, Visit, Connect, Legal)
- [ ] Social media links work and open in new tab
- [ ] Contact information accurate
- [ ] Copyright year shows 2026
- [ ] Links styled correctly (white text, gold hover)
- [ ] Readable on dark background (--text-on-dark opacity)

### Skip Links

- [ ] "Skip to main content" appears on Tab key
- [ ] Skip link has gold background
- [ ] Skip link jumps to main content correctly

### Color System

- [ ] Gold accent color visible (#c9a227 / --gold-primary)
- [ ] Dark backgrounds use --primary (#0d1821)
- [ ] Text on dark backgrounds has good contrast (white with 0.87 opacity)
- [ ] Cream backgrounds use --cream (#f8f5f0)
- [ ] No harsh black/white - all colors from design system

---

## 2. HOMEPAGE (/home)

### Hero Section

- [ ] Hero takes full viewport height (100vh / 100dvh)
- [ ] "Tennessee" headline large and bold (Playfair Display)
- [ ] "starts here" in elegant italic (Cormorant Garamond)
- [ ] Gold accent visible in headline
- [ ] CTA buttons visible and styled correctly
- [ ] Primary button has gold background (#c9a227)
- [ ] Secondary button has outline style
- [ ] Hover states work (translateY, shadow)
- [ ] Background image/color visible
- [ ] Text readable over background

### Hero Section (Mobile)

- [ ] Headline scales down appropriately (clamp working)
- [ ] Buttons stack vertically
- [ ] Touch targets at least 44px tall
- [ ] No text overflow or line wrapping issues
- [ ] Spacing feels balanced

### Positioning Statement Section

- [ ] Heading visible and styled
- [ ] Body copy readable (15px / 0.9375rem)
- [ ] Line height comfortable (1.6)
- [ ] Max-width applied (prose not too wide)
- [ ] Background color correct (cream or white)

### Historical Overview

- [ ] Section has proper padding (4rem mobile, 5rem desktop)
- [ ] Cards layout properly (1 col mobile, 2-3 cols desktop)
- [ ] Card shadows consistent (--shadow-md)
- [ ] Card borders visible (--border-card)
- [ ] Text hierarchy clear (headings bold, body normal)

### Featured Events Preview

- [ ] 3-4 events visible
- [ ] Event cards styled consistently
- [ ] Dates formatted correctly
- [ ] "NEW" or "ENHANCED" badges visible
- [ ] CTA links work and styled correctly
- [ ] Cards have hover states (shadow, transform)

### First 250 CTA Section

- [ ] Dark background (--primary)
- [ ] White text readable (--text-on-dark)
- [ ] Progress bar visible if applicable
- [ ] CTA button prominent (gold background)
- [ ] Section has proper padding

### Email Signup Form

- [ ] Form fields visible and styled
- [ ] Input placeholder text visible
- [ ] Submit button styled (gold background)
- [ ] Focus states visible on inputs (gold ring)
- [ ] Form accessible via keyboard

---

## 3. EVENTS PAGE (/events)

### Page Header

- [ ] Page title clear and large
- [ ] Breadcrumb/eyebrow visible if present
- [ ] Header spacing appropriate

### Events List

- [ ] All events load and display
- [ ] Events in chronological order
- [ ] Date format consistent (e.g., "March 4, 2026")
- [ ] Event cards styled uniformly
- [ ] Card shadows consistent (--shadow-md)
- [ ] Featured events stand out (gold border or special styling)

### Event Card Details

- [ ] Title visible (proper font weight)
- [ ] Date badge or label visible
- [ ] Event type badge visible ("NEW" / "ENHANCED")
- [ ] Description text readable
- [ ] "Get Tickets" or "Learn More" button visible
- [ ] Button has correct styling (gold primary or outlined)
- [ ] Hover states work

### Event Card (Mobile)

- [ ] Cards stack cleanly (1 column)
- [ ] Images scale properly (if present)
- [ ] Text doesn't overflow
- [ ] Touch targets adequate

### Filtering/Sorting (if present)

- [ ] Filter buttons visible and styled
- [ ] Active filter highlighted
- [ ] Filtering works correctly
- [ ] No layout shift when filtering

---

## 4. EVIDENCE ROOM (/evidence)

### Evidence Hub Page

- [ ] Hero/intro section loads
- [ ] Navigation cards to sub-sections visible
- [ ] Cards use document-style styling (parchment background)
- [ ] Card shadows appropriate (--shadow-gold-sm or neutral)
- [ ] Icons or imagery visible and aligned

### Evidence Hub Cards

- [ ] People section card
- [ ] Documents section card
- [ ] Library section card
- [ ] Collections section card
- [ ] Timeline section card
- [ ] Each card links correctly
- [ ] Hover states work (border changes to gold)

### Evidence Room - People (/evidence/people)

- [ ] Page header styled correctly
- [ ] Person cards laid out properly (grid)
- [ ] Portrait images load (if present)
- [ ] Names visible and bold
- [ ] Titles/roles visible
- [ ] "Learn More" links styled correctly
- [ ] Card hover states work

### Evidence Room - Documents (/evidence/documents)

- [ ] Document cards styled like aged parchment
- [ ] Document titles clear
- [ ] Date labels visible
- [ ] Document type badges visible
- [ ] "View Document" button styled correctly
- [ ] Cards have appropriate shadows

### Evidence Room - Library (/evidence/library)

- [ ] Book/resource cards styled consistently
- [ ] Cover images load (if present)
- [ ] Titles and authors visible
- [ ] Publication info readable
- [ ] "Read More" or "View" buttons styled

### Evidence Room - Collections (/evidence/collections)

- [ ] Collection cards styled
- [ ] Collection names visible
- [ ] Item counts or descriptions visible
- [ ] Cards link correctly
- [ ] Hover states work

### Evidence Room - Timeline (/evidence/timeline)

- [ ] Timeline layout clear
- [ ] Date markers visible and aligned
- [ ] Event descriptions readable
- [ ] Progress bar or visual timeline indicator visible
- [ ] Gold accents used for milestone events
- [ ] Responsive on mobile (vertical timeline)

### Evidence Room - Individual Pages (e.g., person detail)

- [ ] Hero section with portrait/image
- [ ] Name and title prominent
- [ ] Biography text readable (prose styling)
- [ ] Related content cards visible
- [ ] Back/navigation links work

### Evidence Room - Card Catalog Component

- [ ] Catalog drawers styled correctly
- [ ] Drawer labels visible
- [ ] Click/tap to open works
- [ ] Cards inside drawer styled consistently
- [ ] Animations smooth (spring easing)

---

## 5. LECTURES PAGE (/lectures)

### Page Header

- [ ] Page title styled correctly
- [ ] Intro text readable

### Lecture Cards

- [ ] All 5 lectures visible
- [ ] Speaker names prominent
- [ ] Speaker titles/affiliations visible
- [ ] Date and time visible
- [ ] Topic/title clear
- [ ] Speaker photos load (if present)
- [ ] "Register" or "Get Tickets" button styled

### Lecture Cards (Mobile)

- [ ] Cards stack vertically
- [ ] Photos scale correctly
- [ ] Text remains readable
- [ ] No overflow issues

---

## 6. FIRST 250 PAGE (/first-250)

### Hero/Intro Section

- [ ] Program name prominent
- [ ] Enrollment dates clear
- [ ] Deadline emphasized (June 1, 2026)
- [ ] Background styled correctly

### What Participants Receive Section

- [ ] List items visible
- [ ] Checkmarks or bullets styled
- [ ] Text readable and spaced well

### Premium Tiers Section (if present)

- [ ] Tier cards laid out (1 col mobile, 3 cols desktop)
- [ ] Tier names clear
- [ ] Prices prominent
- [ ] Benefits list readable
- [ ] CTA buttons on each tier
- [ ] Featured tier (if any) stands out

### Enrollment Form

- [ ] Form fields styled
- [ ] Labels visible
- [ ] Input focus states work (gold ring)
- [ ] Submit button prominent (gold background)
- [ ] Form accessible via keyboard

---

## 7. VISIT PAGE (/visit)

### Page Header

- [ ] Page title clear

### Address & Directions Section

- [ ] Address formatted correctly
- [ ] Phone number clickable (tel: link)
- [ ] Directions text readable

### Hours Section

- [ ] Days and times clearly formatted
- [ ] "Closed" days visible
- [ ] Season info visible ("March 4 through mid-December")
- [ ] Text hierarchy clear

### Admission Pricing Section

- [ ] All price tiers visible (Adults, Seniors, Children, Under 6)
- [ ] Prices formatted consistently ($12, $10, $8, Free)
- [ ] Group rate note visible

### Google Maps Embed

- [ ] Map loads and displays
- [ ] Map centered on Rocky Mount
- [ ] Map interactive (zoom, pan)
- [ ] Map responsive (scales on mobile)

### FareHarbor Widget (if present)

- [ ] Widget loads
- [ ] Booking calendar visible
- [ ] Widget styled to match site
- [ ] Widget responsive on mobile

### What to Expect Section

- [ ] Tour duration visible
- [ ] Features list readable
- [ ] Accessibility info visible
- [ ] Recommendations list visible

### Sister Sites / Nearby Attractions Section

- [ ] Site cards styled consistently
- [ ] Site names and distances visible
- [ ] Descriptions readable
- [ ] Links work and open correctly

---

## 8. ALMANAC (/almanac)

### Page Layout

- [ ] Almanac page loads
- [ ] Dark "midnight" background (#0d1821)
- [ ] Gold accents visible (#c5a059 / --gold-leaf)
- [ ] Parchment cards readable (--almanac-parchment)

### Weather Widget

- [ ] Current weather displays
- [ ] Temperature visible
- [ ] Conditions text readable
- [ ] Weather icon loads (if present)

### Farmer Task Scores

- [ ] Sower score visible
- [ ] Shepherd score visible
- [ ] Keeper score visible
- [ ] Builder score visible
- [ ] Scores color-coded (green/yellow/red)
- [ ] Task recommendations readable

### Moon Phase

- [ ] Moon phase icon/image visible
- [ ] Phase name displayed
- [ ] Illumination percentage visible

### Period Sayings

- [ ] Saying text visible and styled
- [ ] Attribution visible
- [ ] Text readable on parchment background

---

## 9. WELCOME SCREEN (/)

### Splash Page

- [ ] Cinematic intro loads
- [ ] Site name animated or prominent
- [ ] "Enter Site" or "Explore" button visible
- [ ] Button styled correctly
- [ ] Button links to /home
- [ ] Background image/video loads (if present)
- [ ] No critical content hidden behind splash

---

## 10. TYPOGRAPHY CONSISTENCY

Test across ALL pages:

### Headings

- [ ] H1: Large, Playfair Display or EB Garamond, proper spacing
- [ ] H2: Scaled down from H1, serif font
- [ ] H3: Clear hierarchy, serif font
- [ ] H4-H6: Consistent styling
- [ ] Letter-spacing appropriate (tight on large headings)

### Body Text

- [ ] Font size 15px (0.9375rem)
- [ ] Line height 1.6 for readability
- [ ] Color readable (#2d2d2d on light, white on dark)
- [ ] No orphaned words or awkward line breaks

### Buttons

- [ ] Font size 13px (0.8125rem)
- [ ] Uppercase letters
- [ ] Letter-spacing 0.12em (widely spaced)
- [ ] Font weight 700 (bold)
- [ ] Consistent across all buttons

### Badges/Eyebrows

- [ ] Font size 11px (0.6875rem)
- [ ] Uppercase
- [ ] Letter-spacing 0.2em
- [ ] Color matches design system

---

## 11. SHADOWS & ELEVATION

Test consistency across site:

### Card Shadows

- [ ] Standard cards: `--shadow-md` (0 4px 12px rgba(0,0,0,0.12))
- [ ] Elevated cards: `--shadow-lg` (0 8px 24px rgba(0,0,0,0.15))
- [ ] Subtle cards: `--shadow-sm` (0 2px 4px rgba(0,0,0,0.08))
- [ ] Featured cards: `--shadow-gold-sm` or `--shadow-gold-lg`

### Button Shadows

- [ ] Hover state adds shadow (0 8px 24px rgba(0,0,0,0.3))
- [ ] Shadow animates smoothly (300ms ease)

---

## 12. SPACING & LAYOUT

### Section Padding

- [ ] Mobile: 4rem vertical, 1.5rem horizontal
- [ ] Tablet: 5rem vertical, 2rem horizontal
- [ ] Desktop: 5rem vertical, clamp(2rem, 5vw, 7.5rem) horizontal
- [ ] Spacing feels consistent across pages

### Card Padding

- [ ] Small cards: 1rem (--spacing-card-sm)
- [ ] Standard cards: 1.5rem (--spacing-card-md)
- [ ] Large cards: 2rem (--spacing-card-lg)

### Grid Gaps

- [ ] Tight layouts: 0.5rem (--gap-xs)
- [ ] Standard grids: 1rem (--gap-md)
- [ ] Comfortable grids: 1.5rem (--gap-lg)
- [ ] Spacious layouts: 2rem (--gap-xl)

---

## 13. ANIMATIONS & INTERACTIONS

### Page Load Animations

- [ ] Hero animations fire on load
- [ ] Staggered animations work (delay classes)
- [ ] No janky or laggy animations
- [ ] Animations respect prefers-reduced-motion

### Hover States

- [ ] Buttons transform on hover (translateY(-2px))
- [ ] Cards lift on hover (if interactive)
- [ ] Link underlines appear on hover (gold color)
- [ ] Transitions smooth (300ms ease)

### Click/Tap Feedback

- [ ] Buttons have active state
- [ ] Cards respond to clicks
- [ ] No delayed interactions (feels responsive)

---

## 14. RESPONSIVE BREAKPOINTS

### Mobile (375px)

- [ ] No horizontal scroll
- [ ] Text readable (not too small)
- [ ] Touch targets adequate (44x44px)
- [ ] Images scale correctly
- [ ] Navigation accessible

### Tablet (768px)

- [ ] Grid layouts adjust (2 columns)
- [ ] Navigation switches to desktop or stays mobile
- [ ] Spacing scales appropriately
- [ ] No awkward gaps or cramped layouts

### Desktop (1920px)

- [ ] Content not stretched too wide (max-width respected)
- [ ] Grid layouts show 3+ columns where appropriate
- [ ] Hero images/backgrounds not pixelated
- [ ] Navigation fully visible

---

## 15. ACCESSIBILITY

### Keyboard Navigation

- [ ] Tab through all interactive elements
- [ ] Focus states visible (gold outline)
- [ ] Skip links work (Tab on page load)
- [ ] No keyboard traps
- [ ] Logical tab order

### Screen Reader (Test with VoiceOver/NVDA)

- [ ] Page landmarks identified (header, nav, main, footer)
- [ ] Headings in logical order (H1 → H2 → H3)
- [ ] Images have alt text
- [ ] Links have descriptive text (not "click here")
- [ ] Buttons labeled correctly

### Color Contrast

- [ ] Text on light backgrounds passes WCAG AA (4.5:1)
- [ ] Text on dark backgrounds passes WCAG AA
- [ ] Gold accent readable where used
- [ ] No low-contrast text

---

## 16. PERFORMANCE

### Page Load

- [ ] Homepage loads in &lt;3 seconds (3G)
- [ ] No layout shift (CLS score good)
- [ ] Images lazy-load (below fold)
- [ ] Fonts load without flash (FOUT/FOIT)

### Images

- [ ] All images optimized (Next.js Image component)
- [ ] Images have proper width/height attributes
- [ ] No pixelated or stretched images
- [ ] Images have alt text

---

## 17. FUNCTIONAL TESTING

### Forms

- [ ] Email signup form submits (Formspree)
- [ ] First 250 enrollment form submits
- [ ] Required fields enforced
- [ ] Success message displays
- [ ] Error states visible if form fails

### External Links

- [ ] FareHarbor ticket links work
- [ ] Social media links open in new tab
- [ ] External links have rel="noopener noreferrer"

### Internal Links

- [ ] All navigation links work
- [ ] Footer links work
- [ ] "Back" or breadcrumb links work
- [ ] No 404 errors

### Embeds

- [ ] Google Maps embed loads
- [ ] FareHarbor widget loads
- [ ] No console errors from embeds

---

## 18. BROWSER-SPECIFIC CHECKS

### Safari (iOS/macOS)

- [ ] Input fields styled correctly (no default zoom)
- [ ] Fonts render correctly
- [ ] Animations smooth
- [ ] Date inputs work

### Chrome (Android/Desktop)

- [ ] All features work
- [ ] Fonts render correctly
- [ ] No layout issues

### Firefox (Desktop)

- [ ] All features work
- [ ] Grid layouts render correctly
- [ ] Shadows render correctly

---

## 19. CROSS-DEVICE TESTING

### iPhone (375px)

- [ ] Portrait mode works
- [ ] Landscape mode works
- [ ] No cut-off text or buttons
- [ ] Touch targets adequate

### iPad (768px)

- [ ] Portrait mode works
- [ ] Landscape mode works
- [ ] Grid layouts adjust correctly

### Android Phone

- [ ] Site works on Chrome
- [ ] Site works on Samsung Internet
- [ ] No device-specific issues

---

## 20. FINAL CHECKS

### Meta Tags

- [ ] Page titles correct in browser tab
- [ ] Descriptions accurate (view page source)
- [ ] Open Graph image loads (test with social share preview)
- [ ] Twitter Card image loads

### Favicon

- [ ] Favicon visible in browser tab
- [ ] Favicon loads on mobile (home screen icon)

### 404 Page

- [ ] Custom 404 page loads for bad URLs
- [ ] 404 page styled correctly
- [ ] Link back to home works

### Console Errors

- [ ] No console errors (open DevTools)
- [ ] No console warnings (or acceptable warnings only)
- [ ] No 404s for assets (images, fonts, scripts)

### Print Styles (Optional)

- [ ] Pages print cleanly
- [ ] Navigation/footer hidden in print
- [ ] Text readable in print

---

## CRITICAL USER PATHS

Test these end-to-end flows:

### Path 1: First-Time Visitor → Visit

1. [ ] Land on homepage
2. [ ] Read positioning statement
3. [ ] Click "Plan Your Visit"
4. [ ] View hours and admission
5. [ ] Click phone number or use map

### Path 2: Event Discovery → Ticket Purchase

1. [ ] Land on homepage
2. [ ] See featured events
3. [ ] Click "View All Events"
4. [ ] Find specific event
5. [ ] Click "Get Tickets"
6. [ ] Reach FareHarbor booking page

### Path 3: First 250 Enrollment

1. [ ] Land on homepage
2. [ ] See First 250 CTA
3. [ ] Click "Join First 250"
4. [ ] Read program details
5. [ ] Fill out enrollment form
6. [ ] Submit successfully

### Path 4: Evidence Room Exploration

1. [ ] Land on /evidence
2. [ ] See hub navigation cards
3. [ ] Click "People" or "Documents"
4. [ ] View list of items
5. [ ] Click individual item
6. [ ] View detail page
7. [ ] Navigate back to hub

---

## SIGN-OFF

### Testing Summary

- **Total Issues Found:** **\_**
- **Critical Issues (must fix):** **\_**
- **Minor Issues (nice to fix):** **\_**
- **Browser Compatibility:** Pass / Fail
- **Mobile Responsiveness:** Pass / Fail
- **Accessibility:** Pass / Fail
- **Visual Design Consistency:** Pass / Fail

### Recommendation

- [ ] **READY TO LAUNCH** - All critical issues resolved
- [ ] **NEEDS WORK** - Critical issues must be addressed
- [ ] **MAJOR ISSUES** - Significant rework required

### Tester Notes

_Use this space to note specific issues, patterns, or recommendations:_

---

---

## APPENDIX: Quick Visual Reference

### Gold Color Verification

The site should show gold (#c9a227 / --gold-primary) in these places:

- Primary CTA buttons (background)
- Hover states on links (underline)
- Featured event borders
- Focus rings (accessibility)
- Progress bars
- Accent badges/eyebrows
- Featured card shadows (--shadow-gold-sm/lg)

### Shadow Verification

Check these shadow tokens are used correctly:

- `--shadow-xs`: 0 1px 2px rgba(0,0,0,0.06)
- `--shadow-sm`: 0 2px 4px rgba(0,0,0,0.08)
- `--shadow-md`: 0 4px 12px rgba(0,0,0,0.12) ← Most common
- `--shadow-lg`: 0 8px 24px rgba(0,0,0,0.15)
- `--shadow-xl`: 0 12px 40px rgba(0,0,0,0.2)
- `--shadow-gold-sm`: 0 4px 12px rgba(201,162,39,0.4)
- `--shadow-gold-lg`: 0 8px 30px rgba(201,162,39,0.4)

### Font Verification

- **Headings:** Playfair Display or EB Garamond (serif)
- **Elegant italic:** Cormorant Garamond
- **Navigation (desktop):** Cinzel (uppercase, 0.75rem, 600 weight, 0.12em spacing)
- **Navigation (mobile):** Cormorant Garamond (1.5rem, 400 weight)
- **Body:** System UI (0.9375rem / 15px, 1.6 line-height)
- **Buttons:** 0.8125rem / 13px, uppercase, 0.12em spacing, 700 weight

---

**Last Updated:** January 30, 2026
**Version:** 1.0
