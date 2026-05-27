# Accessibility Testing Checklist: Phase 3

**For:** Tennessee Starts Here - 1775 Almanac
**Standard:** WCAG 2.1 Level AA
**Components Tested:** OutdoorRiskMatrix, CurrentConditionsCard, WeatherDetails, All Modals, CompactSevenDay Scrollable Region

---

## Pre-Testing Setup

### Environment

- [ ] Test in Chrome/Edge (for axe, Lighthouse)
- [ ] Test in Firefox (for NVDA Windows, or VoiceOver Mac)
- [ ] Test in Safari (for VoiceOver Mac)
- [ ] Clear browser cache and local storage between tests

### Tools Installed

- [ ] axe DevTools browser extension installed
- [ ] NVDA (Windows) or VoiceOver (Mac) available
- [ ] Lighthouse DevTools open
- [ ] Pa11y CLI installed: `npm install -g pa11y`

### Page Loaded

- [ ] Navigate to `/almanac` page
- [ ] Wait for weather data to load
- [ ] Ensure all components visible

---

## AUTOMATED TESTING

### Test 1: Lighthouse Accessibility Audit

**Tool:** Chrome DevTools → Lighthouse

**Steps:**

1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Accessibility" category
4. Click "Analyze page load"
5. Wait for scan to complete
6. Note the score and violations

**Pass Criteria:**

- [ ] Score: **95+**
- [ ] Violations: **0 (or document known issues)**
- [ ] Screenshot violations for review

**Screenshot Location:** Lighthouse results show:

- Issues sorted by impact
- List of affected elements
- Remediation tips

---

### Test 2: axe DevTools Scan

**Tool:** axe DevTools Chrome Extension

**Steps:**

1. Open axe DevTools (top right panel in DevTools)
2. Click "Scan ALL of my page"
3. Wait for scan to complete
4. Review violations

**Expected Results:**

**Before Phase 3:**

- Violations category: ~10-15 issues
- Should include:
  - Missing semantics on OutdoorRiskMatrix
  - Missing focus management on modals
  - Unclear scrollable region controls

**After Phase 3:**

- Violations: **0**
- All issues remediated

**Document Any Failures:**
| Element | Issue | Expected Fix | Status |
|---------|-------|--------------|--------|
| ... | ... | ... | ... |

---

### Test 3: Pa11y CLI Scan

**Tool:** Pa11y Command Line

**Steps:**

```bash
# Install if needed
npm install -g pa11y

# Run scan
pa11y http://localhost:3000/almanac

# With detailed output
pa11y --reporter=json http://localhost:3000/almanac > results.json

# Check specific component
pa11y --standard WCAG2AA http://localhost:3000/almanac
```

**Expected Results:**

- [ ] Errors: **0**
- [ ] Warnings: **Documented**
- [ ] Notices: Acceptable

**Save Report:**

```bash
pa11y --reporter csv http://localhost:3000/almanac > a11y-results.csv
```

---

## MANUAL TESTING: KEYBOARD NAVIGATION

### Test 4: Keyboard-Only Navigation

**Preparation:**

- [ ] Unplug mouse (or disable trackpad)
- [ ] Clear browser cache
- [ ] Reload `/almanac` page

**Steps:**

1. **Tab through entire page**
   - [ ] Tab order makes sense (top-to-bottom, left-to-right)
   - [ ] No keyboard traps (can always escape)
   - [ ] Focus visible at all times (blue ring)

   **Elements you should encounter:**
   - [ ] Location Picker button
   - [ ] Info buttons (OutdoorRiskMatrix, CurrentConditions, etc.)
   - [ ] Day buttons in CompactSevenDay
   - [ ] Extended forecast region (Days 8-16)
   - [ ] About modal button
   - [ ] Other navigation

2. **Test LocationPicker Modal**
   - [ ] Tab to "Location Picker" button
   - [ ] Press Enter to open modal
   - [ ] Can Tab through: Search input, Search button, Reset button, Close button
   - [ ] Shift+Tab cycles backward correctly
   - [ ] Tab from last button wraps to first (focus trap)
   - [ ] Press Esc closes modal
   - [ ] Focus returns to Location Picker button
   - [ ] Click backdrop closes modal
   - [ ] Focus still returns to trigger

   **Results:**
   - [ ] Modal opens/closes correctly: **PASS / FAIL**
   - [ ] Focus trap working: **PASS / FAIL**
   - [ ] Focus returns: **PASS / FAIL**

3. **Test CompactSevenDay (Extended Forecast)**
   - [ ] Tab through days 1-7
   - [ ] Reach extended forecast region
   - [ ] See "Extended 8-16 day forecast" region
   - [ ] Tab enters region or first extra day button
   - [ ] Arrow Right scrolls forecast right
   - [ ] Arrow Left scrolls forecast left
   - [ ] Can Tab through some days 8-16
   - [ ] Tab out of region continues to next page element

   **Results:**
   - [ ] Region keyboard accessible: **PASS / FAIL**
   - [ ] Arrow keys work: **PASS / FAIL**
   - [ ] User knows how to navigate: **PASS / FAIL** (look for hint text)

4. **Test Other Modals**
   - [ ] Info Popup (gear icon or info icons)
   - [ ] Score Explainer (info on task scores)
   - [ ] About Modal (book icon)

   For each:
   - [ ] Opens with keyboard
   - [ ] Can Tab through content
   - [ ] Esc closes
   - [ ] Focus returns

---

### Test 5: Tab Order Verification

**Expected Tab Order (approximately):**

1. Location Picker button
2. Onboarding dismiss button (if visible)
3. NWS Alert Close button (if visible)
4. Top Bar info buttons
5. Task Score buttons (Sower, Shepherd, Keeper, Builder)
6. Info buttons on various cards
7. Day buttons 1-7 (CompactSevenDay)
8. Extended forecast region
9. Day buttons 8-16 (in scrollable)
10. About modal button
11. Share button
12. Links in footer

**Test:**

- [ ] Actual order matches expected
- [ ] No skipped sections
- [ ] No cycling to background content within modals
- [ ] All interactive elements reachable

**Violations Found:**

- [ ] None
- [ ] Document any issues: ********\_\_********

---

## MANUAL TESTING: SCREEN READERS

### Test 6: NVDA (Windows) or VoiceOver (Mac)

#### Setup: Windows NVDA

```
Download: https://www.nvaccess.org/
Install: Run installer
Launch: NVDA Desktop shortcut
Enable: Laptop keyboard layout recommended
```

**Key Commands:**

```
Insert = NVDA modifier key
NVDA + Home = Read entire page from top
NVDA + H = Open help
H = Jump to next heading
T = Jump to next table
D = Jump to next landmark/region
R = Jump to next region
V = Jump to next form control
L = Jump to next list
↓ = Read next line
Enter = Activate button
```

#### Setup: macOS VoiceOver

```
Enable: Cmd+F5 or System Preferences → Accessibility → VoiceOver
VO = Control+Option
```

**Key Commands:**

```
VO+U = Rotor (table of contents)
VO+→ = Read next item
VO+↓ = Read next element hierarchically
VO+Space = Activate/Click
VO+Shift+Space = Context menu
```

---

### Test 7: OutdoorRiskMatrix Semantic Test

**Screen Reader: NVDA (Windows)**

**Steps:**

1. Navigate to OutdoorRiskMatrix component
2. Press T to jump to next table (if converted to `<table>` in Phase 3)
3. Expected announcement: "Table with 3 rows and 2 columns"
4. Listen to table header (should announce)
5. Use arrow keys to navigate cells
6. Verify each cell read correctly

**Before Phase 3:**

```
"UV Index 6 High Air Quality 45 AQI Visibility 10 mi"
(Read as continuous text, no structure)
```

**After Phase 3 (using `<dl>`):**

```
"Definition list with 3 items"
"UV Index, definition: 6 High"
"Air Quality, definition: 45 AQI"
"Visibility, definition: 10 mi"
```

**Results:**

- [ ] Component announced with semantic structure: **PASS / FAIL**
- [ ] Each definition-term pair clear: **PASS / FAIL**

---

### Test 8: CurrentConditionsCard Semantic Test

**Screen Reader: NVDA**

**Steps:**

1. Navigate to CurrentConditionsCard
2. Listen to how conditions are announced
3. Should hear "Cloud Cover, definition: 68%" format (after Phase 3)

**Before Phase 3:**

```
"Cloud Cover 68% Partly cloudy"
(Unclear which is label, which is value)
```

**After Phase 3 (using `<dl>`):**

```
"Definition list, Cloud Cover definition: 68%"
"Definition, Partly cloudy"
```

**Results:**

- [ ] Label-value relationship clear: **PASS / FAIL**

---

### Test 9: WeatherDetails Table Navigation

**Screen Reader: NVDA**

**Steps:**

1. Press T to jump to table
2. Listen to table header announcement
3. Should hear: "Table with 5 columns: Day, Weather, Condition, Precipitation, Temperature"
4. Use arrow keys to navigate through cells
5. Listen to cell content read with column headers

**Expected Reading (After Phase 3):**

```
"Table, 7 rows, 5 columns"
"Day, column header"
"Weather Icon, column header"
"Condition, column header"
"Precipitation, column header"
"Temperature, column header"
[Arrow down]
"Today, row header"
"Sunny, cell"
"20%, cell for Precipitation"
"72 degrees Fahrenheit slash 45 degrees, cell for Temperature"
```

**Results:**

- [ ] Table announced with headers: **PASS / FAIL**
- [ ] Column structure clear: **PASS / FAIL**
- [ ] Row navigation working: **PASS / FAIL**

---

### Test 10: Modal Focus Management

**Screen Reader: NVDA**

**Test LocationPicker Modal:**

1. Tab to LocationPicker button
2. Press Enter to open
3. Screen reader should announce: "Dialog, Change Location"
4. Can hear Close button
5. Can hear Search input with label
6. Tab through elements
7. Listen for focus cycling (should not escape to background)
8. Press Esc to close
9. Screen reader should return to: "LocationPicker button, expanded false"

**Expected:**

```
"Dialog, Change Location"
"Search, input"
"Search button"
"Reset button"
"Close button"
[Tab from close] → wraps to Search input (focus trap working)
[Esc pressed] → Dialog closes
"LocationPicker button, collapsed, current location: Sullivan County"
```

**Results:**

- [ ] Modal announced as dialog: **PASS / FAIL**
- [ ] Focus trap working: **PASS / FAIL**
- [ ] Focus returns on close: **PASS / FAIL**

---

### Test 11: DayDetailModal Focus Management

**Screen Reader: NVDA**

**Steps:**

1. Navigate to CompactSevenDay
2. Tab to any day button (e.g., "Mo")
3. Press Enter to open day detail modal
4. Listen for modal announcement
5. Tab through modal content (should be trapped)
6. Try arrow left/right to navigate to previous/next day
7. Press Esc to close
8. Verify focus returns to day button

**Expected:**

```
"Dialog, Monday, January 28"
"Previous Day button, disabled" (or enabled)
"Monday, heading"
"January 28, supplementary text"
"Next Day button"
[Tab from next] → wraps to Previous button (focus trap)
[Esc] → Dialog closes
"Monday, button, selected"
```

**Before Phase 3:**

```
❌ No focus trap (Tab escapes to background)
❌ No initial focus announcement
❌ Focus doesn't return to day button
```

**After Phase 3:**

```
✅ All three fixed
```

**Results:**

- [ ] Modal announced: **PASS / FAIL**
- [ ] Focus trap working: **PASS / FAIL**
- [ ] Can navigate with arrow keys: **PASS / FAIL**
- [ ] Esc closes, focus returns: **PASS / FAIL**

---

### Test 12: ScoreExplainer Modal Focus

**Screen Reader: NVDA**

**Steps:**

1. Find Score card (Sower, Shepherd, Keeper, or Builder)
2. Tab to info icon on score
3. Press Enter to open modal
4. Listen for announcement
5. Tab through content
6. Press Esc to close
7. Verify focus returns

**Before Phase 3:**

```
❌ No modal announcement
❌ No focus trap
❌ No focus return
```

**After Phase 3:**

```
✅ "Dialog, Sower's Index"
✅ Focus trapped within modal
✅ Focus returns to info button
```

**Results:**

- [ ] Modal announced with name: **PASS / FAIL**
- [ ] Focus trap active: **PASS / FAIL**
- [ ] Focus returns: **PASS / FAIL**

---

### Test 13: ExtendedForecast Region Announcement

**Screen Reader: NVDA**

**Steps:**

1. Navigate to extended forecast region (days 8-16 if present)
2. Listen to region announcement
3. Verify keyboard navigation hint in aria-label
4. Try keyboard navigation
5. Verify VoiceOver announces scroll actions

**Before Phase 3:**

```
"Region, Extended 8-16 day forecast"
[No indication of keyboard control]
```

**After Phase 3 (Option A - with help text):**

```
"Region, Extended 8-16 day forecast, use arrow keys to scroll"
[Or: Previous/Next buttons visible and labeled]
```

**Results:**

- [ ] Region announced clearly: **PASS / FAIL**
- [ ] Keyboard controls visible/announced: **PASS / FAIL**
- [ ] Arrow key scrolling working: **PASS / FAIL**

---

## MANUAL TESTING: VISUAL & CONTRAST

### Test 14: Focus Indicators

**Steps:**

1. Tab through page with keyboard
2. Look for blue focus rings (should be visible on all interactive elements)
3. Compare to unfocused state (should have clear visual difference)

**Expected:**

- [ ] All buttons have visible focus ring
- [ ] All links have visible focus ring
- [ ] All form inputs have visible focus ring
- [ ] Focus ring color: Blue (#c9a227 or almanac-gold)
- [ ] Focus ring offset visible
- [ ] Focus ring not obscured by other elements

**Violations:**

- [ ] None
- [ ] Document any elements missing focus indicator: ********\_\_********

---

### Test 15: High Contrast Mode

**Windows:**

- Settings → Ease of Access → Display → High Contrast mode (on)
- Reload page

**macOS:**

- System Preferences → Accessibility → Display → Increase Contrast (on)
- Reload page

**Test:**

- [ ] All text still readable (not just color-coded)
- [ ] Icons have sufficient contrast
- [ ] Focus indicators still visible
- [ ] Modals still usable
- [ ] No essential information lost

**Results:**

- [ ] Page usable in high contrast: **PASS / FAIL**

---

### Test 16: 200% Zoom

**Steps:**

1. Chrome: Ctrl+Plus (or Cmd+Plus on Mac) three times (to reach 200%)
2. Reload page
3. Test navigation

**Check:**

- [ ] Text readable without horizontal scroll
- [ ] Buttons still clickable
- [ ] Modals still fit on screen
- [ ] Focus indicators still visible
- [ ] Modals still keyboard navigable
- [ ] Touch targets still 44px minimum

**Results:**

- [ ] Page usable at 200% zoom: **PASS / FAIL**

---

## FINAL CHECKLIST: PHASE 3 COMPLETION

### Semantic Markup

- [ ] OutdoorRiskMatrix converted to `<dl>` with `<dt>` / `<dd>`
- [ ] CurrentConditionsCard ConditionItem uses `<dl>` with `<dt>` / `<dd>`
- [ ] WeatherDetails 7-day forecast uses semantic `<table>` with `<thead>` / `<tbody>`
- [ ] All semantic markup valid HTML
- [ ] axe scan shows 0 violations related to semantics

### Modal Focus Management

- [ ] LocationPicker: Focus trap + Return focus + ARIA labels ✅
- [ ] CompactSevenDay DayDetailModal: Focus trap + Initial focus + Return focus ✅
- [ ] InfoPopup: Focus trap + Initial focus + Return focus + ARIA labels ✅
- [ ] ScoreExplainer modals: Focus trap + Initial focus + Return focus + ARIA labels ✅
- [ ] OnboardingModal: Already compliant ✅
- [ ] AboutModal: Already compliant ✅
- [ ] All modals tested with keyboard-only navigation
- [ ] All modals tested with screen readers

### Scrollable Region

- [ ] Extended forecast region has `aria-orientation="horizontal"`
- [ ] Extended forecast region has clear keyboard hint
- [ ] Arrow key navigation working (with preventDefault)
- [ ] Help text visible: "Use arrow keys to scroll" or Prev/Next buttons
- [ ] aria-label updated to include usage instructions
- [ ] Tested with keyboard
- [ ] Tested with screen reader

### Testing Results

- [ ] Lighthouse Accessibility Score: **95+**
- [ ] axe DevTools violations: **0**
- [ ] Pa11y violations: **0**
- [ ] Keyboard navigation: **Fully functional**
- [ ] Screen reader (NVDA): **All components announced correctly**
- [ ] Screen reader (VoiceOver): **All components announced correctly**
- [ ] High contrast mode: **Readable**
- [ ] 200% zoom: **Usable**
- [ ] All focus indicators visible
- [ ] Tab order logical and complete

### Documentation

- [ ] This checklist completed and signed off
- [ ] ACCESSIBILITY-AUDIT-PHASE-3.md reviewed
- [ ] All fixes documented in code comments
- [ ] PR description references WCAG criteria addressed
- [ ] Testing results saved

---

## Sign-Off

**Tested by:** ************\_\_\_************
**Date:** ************\_\_\_************
**Accessibility Level Achieved:** **WCAG 2.1 Level AA** ✅

**Issues Found During Testing:**

| Component | Issue | Severity | Resolution |
| --------- | ----- | -------- | ---------- |
|           |       |          |            |
|           |       |          |            |

**Ready for Production:** **YES / NO**

If "NO", list blockers:

1. ***
2. ***
3. ***

---

## Notes

Any issues discovered or special testing notes:

---

---

---

---

**Document Last Updated:** January 30, 2026
