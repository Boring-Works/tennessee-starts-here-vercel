# Phase 3 Accessibility Audit: Tennessee Starts Here

**Conducted by:** Dr. Fatima Al-Rashid (ARIA Specialist)
**Date:** January 30, 2026
**Scope:** Comprehensive audit of semantic HTML, modal focus management, and scrollable region accessibility
**WCAG Target:** 2.1 Level AA compliance

---

## Executive Summary

This audit identifies three critical accessibility violations affecting the 1775 Almanac component:

1. **Pseudo-tables using semantic divs** (Score: 72 priority)
2. **Modal focus management gaps** (Score: 71 priority)
3. **Scrollable region keyboard controls** (Score: 58 priority)

**Current State:** Multiple violations reduce usability for screen reader users, keyboard-only users, and those relying on assistive technology.

**Phase 3 Deliverables Required:**

- Convert all data tables to semantic HTML
- Implement proper focus management for all modals
- Make scrollable regions keyboard accessible with clear labeling

---

## ISSUE 1: Pseudo-Tables Using Non-Semantic Markup

### Priority Score: 72

### Affected Components

#### 1.1 OutdoorRiskMatrix.tsx (Lines 96-114)

**File:** `/components/almanac/OutdoorRiskMatrix.tsx`

**Current Issue:** Data presented as flex layout divs instead of semantic table/definition list.

```tsx
// CURRENT (INACCESSIBLE)
<div className="text-xs text-almanac-parchment/70 space-y-1">
  <div className="flex justify-between">
    <span>UV Index:</span>
    <span className="font-medium">
      {uvIndex} {riskLabel}
    </span>
  </div>
  {aqi && (
    <div className="flex justify-between">
      <span>Air Quality:</span>
      <span className="font-medium">{aqi} AQI</span>
    </div>
  )}
  <div className="flex justify-between">
    <span>Visibility:</span>
    <span className="font-medium">{visibility} mi</span>
  </div>
</div>
```

**Accessibility Violations:**

- Screen readers cannot identify this as tabular data
- No semantic relationship between labels and values
- Screen reader user hears: "UV Index: 6 High Air Quality: 45 AQI Visibility: 10 mi" as continuous text
- Keyboard users cannot navigate by columns/rows
- WCAG 1.3.1 (Info and Relationships) — **Fails**

**Semantic Issue:** This is **definition list data**, not a table.

**Correct Markup (Definition List Pattern):**

```tsx
<dl className="text-xs text-almanac-parchment/70 space-y-1">
  <div className="flex justify-between">
    <dt className="font-normal">UV Index:</dt>
    <dd className="font-medium">
      {uvIndex} {riskLabel}
    </dd>
  </div>
  {aqi && (
    <div className="flex justify-between">
      <dt className="font-normal">Air Quality:</dt>
      <dd className="font-medium">{aqi} AQI</dd>
    </div>
  )}
  <div className="flex justify-between">
    <dt className="font-normal">Visibility:</dt>
    <dd className="font-medium">{visibility} mi</dd>
  </div>
</dl>
```

**Why Definition List?**

- Each item is a **term-definition pair**: "UV Index" is the term, "6 High" is the definition
- Semantic structure tells screen readers: "This is a list of definitions"
- VoiceOver/NVDA announce: "definition list with 3 items" → "UV Index, definition: 6 High"

---

#### 1.2 CurrentConditionsCard.tsx (Lines 35-44)

**File:** `/components/almanac/CurrentConditionsCard.tsx`

**Current Issue:** ConditionItem component uses div with flex layout for label-value pairs.

```tsx
// CURRENT (INACCESSIBLE)
<div className="flex items-start gap-3 p-3 rounded-lg">
  <div className="flex-shrink-0 mt-0.5">{icon}</div>
  <div className="flex-1 min-w-0">
    <p className="text-xs text-almanac-parchment/50">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
    {sublabel && <p className="text-xs text-almanac-parchment/40">{sublabel}</p>}
  </div>
</div>
```

**Accessibility Violations:**

- Label-value relationship not semantically marked
- Screen reader announces: "Cloud Cover 68% Partly cloudy" as generic text
- No programmatic link between label and value
- WCAG 1.3.1 (Info and Relationships) — **Fails**

**Semantic Issue:** This is also definition list data.

**Correct Markup:**

```tsx
<div className="flex items-start gap-3 p-3 rounded-lg">
  <div className="flex-shrink-0 mt-0.5">{icon}</div>
  <dl className="flex-1 min-w-0">
    <dt className="text-xs text-almanac-parchment/50">{label}</dt>
    <dd className="text-lg font-semibold m-0">{value}</dd>
    {sublabel && <dd className="text-xs text-almanac-parchment/40 m-0">{sublabel}</dd>}
  </dl>
</div>
```

**Benefit:** Screen reader now announces: "definition list. Cloud Cover, definition: 68%, definition: Partly cloudy"

---

#### 1.3 WeatherDetails.tsx (Lines 92-143)

**File:** `/components/almanac/WeatherDetails.tsx`

**Current Issue:** 7-day forecast uses div rows with multiple span elements. No semantic structure.

```tsx
// CURRENT (INACCESSIBLE)
<div className="flex items-center justify-between">
  <span className="text-almanac-parchment w-14">Today</span>
  <div className="flex items-center gap-1">
    <DayIcon className="w-5 h-5" />
  </div>
  <span>{weather.condition}</span>
  <span>{precipProb}%</span>
  <span>72° / 45°</span>
</div>
```

**Accessibility Violations:**

- Data presented as continuous flex row with no markup indicating structure
- Screen reader user cannot understand column headers vs. data
- No row/column relationship marked
- Precipitation percentage not clearly associated with precipitation
- WCAG 1.3.1 (Info and Relationships) — **Fails**
- WCAG 2.1.1 (Keyboard) — **Fails** (cannot navigate by columns)

**Question:** Is this truly tabular data or a list of individual forecast items?

**Semantic Issue:** This **IS a table** with columns: Day | Weather | Condition | Precip | Temp

**Correct Markup:**

```tsx
<table className="w-full text-sm">
  <thead className="sr-only">
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Weather Icon</th>
      <th scope="col">Condition</th>
      <th scope="col">Precipitation</th>
      <th scope="col">Temperature</th>
    </tr>
  </thead>
  <tbody className="space-y-2">
    {futureDays.map((time, displayIndex) => (
      <tr key={time} className="flex items-center justify-between bg-white/5 p-3 rounded">
        <th scope="row" className="text-almanac-parchment w-14">
          {dayName}
        </th>
        <td>
          <DayIcon className="w-5 h-5" aria-hidden="true" />
        </td>
        <td className="flex-1">{weather.condition}</td>
        <td aria-label="Precipitation">{precipProb}%</td>
        <td aria-label="Temperature">
          {maxTemp}° / {minTemp}°
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

**Why Table Markup?**

- Horizontal data with column headers
- Screen reader announces: "table with 5 columns, Today row, Weather, Sunny, Precipitation 20%, Temperature 72/45 degrees"
- Keyboard users can navigate: Tab within row, arrow keys between rows (with CSS keyboard navigation)

**Styling Preservation:**
The `className="flex items-center justify-between"` can be kept if styled as CSS Grid:

```css
table {
  width: 100%;
}
tbody tr {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

Semantic markup and visual layout are independent!

---

### Summary: Semantic Violations Found

| Component             | Lines  | Issue               | Pattern   | Fix                                   |
| --------------------- | ------ | ------------------- | --------- | ------------------------------------- |
| OutdoorRiskMatrix     | 96-114 | Label-value pairs   | Flex divs | Use `<dl>` / `<dt>` / `<dd>`          |
| CurrentConditionsCard | 35-44  | Label-value pairs   | Flex divs | Use `<dl>` / `<dt>` / `<dd>`          |
| WeatherDetails        | 92-143 | 7-day forecast grid | Flex row  | Use semantic `<table>` with `<thead>` |

---

## ISSUE 2: Modal Focus Management Gaps

### Priority Score: 71

### Overview

WCAG 2.1.2 (Focus Order) and WCAG 4.1.3 (Status Messages) require:

1. **Focus trap:** Tab/Shift+Tab loops within modal, cannot escape to background
2. **Initial focus:** Focus moves to modal on open (usually first input or dialog heading)
3. **Focus return:** Focus returns to trigger button when modal closes
4. **Escape key:** Esc closes modal and returns focus
5. **Backdrop click:** Clicking outside closes modal
6. **Screen reader announcement:** Modal announced as dialog with accessible name/description

### Current State: Mixed Implementation

#### 2.1 LocationPicker.tsx — GOOD ✅ (Lines 78-111)

**Status:** This modal has EXCELLENT focus management.

```tsx
// Focus trap implemented manually
const handleTab = (e: KeyboardEvent) => {
  if (e.key !== 'Tab' || !modalRef.current) return

  const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (e.shiftKey && document.activeElement === firstElement) {
    e.preventDefault()
    lastElement?.focus()
  } else if (!e.shiftKey && document.activeElement === lastElement) {
    e.preventDefault()
    firstElement?.focus()
  }
}

// Return focus on close
return () => {
  document.removeEventListener('keydown', handleTab)
  previousActiveElement?.focus()
}
```

**Strengths:**

- ✅ Focus trap prevents escape to background
- ✅ Focus returned to trigger button on close
- ✅ Escape key handled (line 73)
- ✅ Modal announced with `role="dialog"` and `aria-labelledby`
- ✅ Backdrop click closes modal

**Minor Improvement:** Could use `focus-trap-react` library for simplified maintenance.

---

#### 2.2 CompactSevenDay.tsx — DAY DETAIL MODAL — PARTIAL ⚠️ (Lines 42-227)

**Status:** Focus management partially implemented but incomplete.

**Current Implementation:**

```tsx
function DayDetailModal({ day, onClose, onPrev, onNext, hasPrev, hasNext }) {
  // Keyboard navigation for Escape, Arrow keys
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev()
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="day-detail-title">
      {/* Modal content */}
    </div>
  )
}
```

**Issues Found:**

1. ❌ **NO FOCUS TRAP** — Tab key can escape to background content
2. ❌ **NO FOCUS RETURN** — `previousFocusRef` stored in parent but never used in modal close
3. ❌ **NO INITIAL FOCUS** — Focus not moved to modal on open
4. ✅ Escape key works
5. ✅ Dialog announced with proper ARIA

**Impact:**

- Keyboard user tabs → falls through modal → tabs through background calendar
- Screen reader user gets confused about focus location
- WCAG 2.1.2 (Focus Order) — **Fails**

**Fix Required:**

```tsx
function DayDetailModal({
  day,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  previousFocusRef, // Pass from parent
}) {
  const modalRef = useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev()
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext()
      } else if (e.key === 'Tab' && modalRef.current) {
        // Focus trap
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    // Initial focus
    const firstButton = modalRef.current?.querySelector('button')
    firstButton?.focus()

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Return focus on close
      if (previousFocusRef?.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [onClose, onPrev, onNext, hasPrev, hasNext, previousFocusRef])

  return (
    <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="day-detail-title">
      {/* Modal content */}
    </div>
  )
}
```

---

#### 2.3 InfoPopup.tsx — MODAL MISSING FOCUS MANAGEMENT ❌ (Lines 60-143)

**Status:** Focus management completely missing.

**Current Implementation:**

```tsx
function InfoModal({ content, onClose }: InfoModalProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full md:mx-4 bg-midnight border border-almanac-gold/30 rounded-t-2xl md:rounded-lg shadow-2xl z-50 overflow-hidden"
      >
        {/* Content */}
      </motion.div>
    </>
  )
}
```

**Missing:**

- ❌ **NO FOCUS TRAP** — Tab escapes to background
- ❌ **NO FOCUS RETURN** — No reference to trigger button
- ❌ **NO INITIAL FOCUS** — Focus not moved to modal
- ❌ **NO ESC HANDLER** — Must add in effect hook
- ❌ **NO ARIA LABELS** — Add `aria-labelledby` and `aria-describedby`
- ⚠️ **ACCESSIBLE NAME MISSING** — Screen readers don't announce what this modal is

**Impact:**

- Keyboard users get trapped if they tab while on focus-trappable modal
- Screen reader user cannot identify modal purpose
- WCAG 2.1.2 (Focus Order) — **Fails**
- WCAG 4.1.2 (Name, Role, Value) — **Fails**

**Fix Required:** Add focus management hook to InfoPopup component.

---

#### 2.4 ScoreExplainer.tsx — MODAL MISSING FOCUS MANAGEMENT ❌ (Lines 176-280)

**Status:** Same issues as InfoPopup.

**Current Implementation:**

```tsx
function ScoreModal({ explanation, onClose }: ScoreModalProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full bg-midnight border border-almanac-gold/30 rounded-lg shadow-2xl z-50 overflow-hidden"
      >
        {/* Content */}
      </motion.div>
    </>
  )
}
```

**Missing:** Same as InfoPopup — no focus management.

**Additional Issue:** WorkabilityExplainer (lines 287-361) also has same missing focus management.

---

#### 2.5 OnboardingModal.tsx — GOOD ✅ (Lines 9-178)

**Status:** Excellent focus management implemented.

```tsx
// Focus trap implemented manually
const handleTab = (e: KeyboardEvent) => {
  if (e.key !== 'Tab' || !modalRef.current) return

  const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (e.shiftKey && document.activeElement === firstElement) {
    e.preventDefault()
    lastElement?.focus()
  } else if (!e.shiftKey && document.activeElement === lastElement) {
    e.preventDefault()
    firstElement?.focus()
  }
}

document.addEventListener('keydown', handleTab)
return () => document.removeEventListener('keydown', handleTab)
```

**Strengths:**

- ✅ Focus trap active
- ✅ Initial focus moved to first focusable element
- ✅ Escape key handled
- ✅ Modal announced with `role="dialog"` and `aria-labelledby`
- ✅ Backdrop click closes

---

#### 2.6 AboutModal.tsx — GOOD ✅ (Lines 9-237)

**Status:** Excellent focus management implemented.

Same implementation as LocationPicker and OnboardingModal.

---

### Summary: Modal Focus Management Matrix

| Component                             | Focus Trap | Initial Focus | Focus Return | Escape Key | Aria Labels | Status   |
| ------------------------------------- | ---------- | ------------- | ------------ | ---------- | ----------- | -------- |
| LocationPicker                        | ✅         | ❓            | ✅           | ✅         | ✅          | **PASS** |
| CompactSevenDay (parent)              | ✅         | ✅            | ✅           | ✅         | ✅          | **PASS** |
| CompactSevenDay (DayDetailModal)      | ❌         | ❌            | ❌           | ✅         | ✅          | **FAIL** |
| InfoPopup                             | ❌         | ❌            | ❌           | ❌         | ❌          | **FAIL** |
| ScoreExplainer (ScoreModal)           | ❌         | ❌            | ❌           | ❌         | ❓          | **FAIL** |
| ScoreExplainer (WorkabilityExplainer) | ❌         | ❌            | ❌           | ❌         | ❌          | **FAIL** |
| OnboardingModal                       | ✅         | ✅            | ✅           | ✅         | ✅          | **PASS** |
| AboutModal                            | ✅         | ✅            | ✅           | ✅         | ✅          | **PASS** |

**Failing:** 3/8 modal implementations (37.5%)
**Partially Failing:** 1/8 (12.5%)
**Passing:** 4/8 (50%)

---

## ISSUE 3: Scrollable Region Keyboard Controls

### Priority Score: 58

### Affected Component

**File:** `/components/almanac/CompactSevenDay.tsx` (Lines 348-402)

**Location:** Extended forecast scrollable region (Days 8-16 when present).

### Current Implementation

```tsx
<div
  className="overflow-x-auto scrollbar-hide"
  role="region"
  aria-label="Extended 8-16 day forecast"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'ArrowRight') {
      e.currentTarget.scrollBy({ left: 100, behavior: 'smooth' })
    }
    if (e.key === 'ArrowLeft') {
      e.currentTarget.scrollBy({ left: -100, behavior: 'smooth' })
    }
  }}
>
  {/* Day buttons */}
</div>
```

### Issues Found

#### 3.1 Accessibility Violations

1. **Missing ARIA Attributes**
   - ❌ No `aria-orientation="horizontal"` (hints to screen reader it's horizontal scroll)
   - ❌ No live region announcement when scrolling completes

2. **Keyboard Control Unclear**
   - ⚠️ Focus indicator exists (ring-2) but user doesn't know arrow keys scroll
   - ⚠️ No hint text explaining keyboard controls

3. **Initial Focus**
   - ⚠️ `tabIndex={0}` makes region focusable but first day button might be selected instead

4. **Screen Reader Announcement**
   - ⚠️ Screen reader announces: "region, extended 8-16 day forecast" then lists all 9+ day buttons
   - ❌ No instruction: "Use left and right arrow keys to scroll"

### WCAG Impact

- **WCAG 2.1.1 (Keyboard):** Partially passes (arrow keys work but users don't know)
- **WCAG 1.3.1 (Info and Relationships):** Fails (no indication this is a horizontal scroll)
- **WCAG 1.4.11 (Non-Text Contrast):** Passes (has visual focus indicator)
- **WCAG 4.1.2 (Name, Role, Value):** Partially fails (needs aria-orientation)

### Current Behavior

**Keyboard User Experience:**

1. User tabs through page
2. Reaches extended forecast section
3. Sees "Extended 8-16 day forecast" region, but no visible focus indicator until inside
4. If user presses Tab again, they go to first day button
5. If user is inside div (from programmatic focus), arrow left/right scrolls
6. BUT: Many users never discover this because the region looks like a button list, not a scrollable container

**Screen Reader User Experience (NVDA/JAWS):**

1. "Region, extended 8-16 day forecast"
2. "Button, day 8, high 72, low 45"
3. "Button, day 9, high 70, low 44"
4. ... continues through all ~9 days
5. **Problem:** User doesn't know they can scroll. They think they have to Tab through all 9 buttons.

### Solution: Improve Scrollable Region Accessibility

#### Option A: Carousel with Prev/Next Buttons (Recommended)

This is the most accessible pattern for extended lists.

```tsx
{
  hasExtraDays && (
    <>
      <div className="border-t border-white/10 my-2" />
      <div className="relative">
        {/* Carousel wrapper */}
        <div
          className="overflow-x-auto scrollbar-hide"
          role="region"
          aria-label="Extended 8-16 day forecast, use arrow buttons or arrow keys to navigate"
          aria-live="polite"
          aria-atomic="false"
        >
          <div className="flex gap-1 min-w-min">
            {extraDays.map((day, index) => {
              const actualIndex = index + 7
              return (
                <button
                  key={actualIndex}
                  type="button"
                  onClick={() => setSelectedIndex(actualIndex)}
                  className="flex flex-col items-center gap-1 py-2 px-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-almanac-midnight"
                  aria-label={`${day.dayFull || day.day}${day.date ? ' ' + day.date : ''}, High ${Math.round(day.high)}, Low ${Math.round(day.low)}`}
                >
                  {/* Day content */}
                </button>
              )
            })}
          </div>
        </div>

        {/* Prev/Next buttons */}
        <button
          type="button"
          onClick={() => {
            const container = document.querySelector('[aria-label*="Extended 8-16"]')
            if (container) {
              container.scrollBy({ left: -100, behavior: 'smooth' })
            }
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-r z-10 focus:outline-none focus:ring-2 focus:ring-almanac-gold"
          aria-label="Scroll forecast left"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => {
            const container = document.querySelector('[aria-label*="Extended 8-16"]')
            if (container) {
              container.scrollBy({ left: 100, behavior: 'smooth' })
            }
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-l z-10 focus:outline-none focus:ring-2 focus:ring-almanac-gold"
          aria-label="Scroll forecast right"
        >
          →
        </button>
      </div>

      <p className="text-center text-sm text-almanac-gold/70 mt-2 flex items-center justify-center gap-2 font-medium">
        <span>Scroll for {extraDays.length} more days</span>
        <span className="text-xs">(Use arrow buttons or arrow keys)</span>
      </p>
    </>
  )
}
```

#### Option B: Improve Arrow Key Scrolling (Minimum Fix)

If carousel is not desired, enhance keyboard hint:

```tsx
;<div
  className="overflow-x-auto scrollbar-hide"
  role="region"
  aria-label="Extended 8-16 day forecast"
  aria-orientation="horizontal"
  aria-describedby="forecast-scroll-hint"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      e.currentTarget.scrollBy({ left: 100, behavior: 'smooth' })
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      e.currentTarget.scrollBy({ left: -100, behavior: 'smooth' })
    }
  }}
>
  {/* Day buttons */}
</div>

{
  /* Help text */
}
;<p id="forecast-scroll-hint" className="text-xs text-center text-almanac-parchment/50 mt-2">
  Keyboard tip: Tab to the forecast section, then use ← → arrow keys to scroll
</p>
```

**Important:** Add `e.preventDefault()` to prevent default arrow key behavior (which may scroll the page).

---

### Summary: Scrollable Region Issues

| Issue                      | Severity | Impact                                       | Fix                                                |
| -------------------------- | -------- | -------------------------------------------- | -------------------------------------------------- |
| Missing `aria-orientation` | High     | Screen readers cannot infer scroll direction | Add `aria-orientation="horizontal"`                |
| No keyboard hint           | High     | Users don't discover arrow key functionality | Add descriptive aria-label or help text            |
| Arrow keys not prevented   | Medium   | Default page scroll may interfere            | Add `e.preventDefault()`                           |
| No focus indicator clarity | Medium   | User uncertain if region is focusable        | Visual design makes it clear region is interactive |
| Help text missing          | High     | New users unclear how to navigate            | Add "Use arrow keys to scroll" hint                |

---

## IMPLEMENTATION ROADMAP: PHASE 3

### Priority Order

#### 1. Modal Focus Management (71 points) — CRITICAL

**Time Estimate:** 4-6 hours

**Why First:** Affects keyboard and screen reader users immediately. Easy to fix.

**Tasks:**

- [ ] Fix DayDetailModal in CompactSevenDay.tsx (add focus trap, initial focus, focus return)
- [ ] Fix InfoPopup.tsx modal (add focus management hook)
- [ ] Fix ScoreExplainer.tsx modals (add focus management hook, both ScoreModal and WorkabilityExplainer)
- [ ] Test with keyboard-only navigation
- [ ] Test with screen reader (NVDA/VoiceOver)

**Deliverable:** All modals pass keyboard focus test

---

#### 2. Semantic HTML Markup (72 points) — CRITICAL

**Time Estimate:** 2-3 hours

**Why Second:** Affects screen reader users reading content. Medium complexity.

**Tasks:**

- [ ] OutdoorRiskMatrix: Convert to `<dl>` / `<dt>` / `<dd>`
- [ ] CurrentConditionsCard: Convert ConditionItem to use `<dl>` / `<dt>` / `<dd>`
- [ ] WeatherDetails: Convert 7-day forecast to semantic `<table>`
- [ ] Run axe DevTools on all three components
- [ ] Test with screen reader

**Deliverable:** All components pass axe accessibility check

---

#### 3. Scrollable Region Keyboard (58 points) — IMPORTANT

**Time Estimate:** 2-3 hours

**Why Third:** Lower priority but important for accessibility.

**Tasks:**

- [ ] Option A (Recommended): Add Prev/Next carousel buttons
- [ ] OR Option B: Add `aria-orientation` + help text + `e.preventDefault()`
- [ ] Add aria-live region for scroll updates
- [ ] Test arrow key navigation
- [ ] Verify tab order

**Deliverable:** Extended forecast navigable by keyboard with clear instructions

---

### Testing Checklist for Phase 3

#### Automated Testing

```bash
# Install tools (if not already installed)
npm install --save-dev @axe-core/react pa11y-ci lighthouse

# Run tests
npm run lint                          # ESLint
npm run build                         # Type checking
npx axe-core scan                     # Automated a11y check
npx pa11y-ci --config pa11y.config    # Pa11y accessibility check
npx lighthouse /almanac --output html # Lighthouse audit
```

#### Manual Testing: Keyboard

- [ ] Unplug mouse
- [ ] Tab through entire page
- [ ] Verify tab order is logical
- [ ] Test each modal:
  - [ ] Can open with keyboard
  - [ ] Tab loops within modal
  - [ ] Esc closes modal
  - [ ] Focus returns to trigger button
- [ ] Test scrollable region:
  - [ ] Can reach with Tab
  - [ ] Arrow keys scroll
  - [ ] Instructions clear

#### Manual Testing: Screen Readers

**macOS/VoiceOver:**

```
Cmd+F5 to enable
VO = Control+Option
VO+U = Rotor (navigate by region, table, list)
VO+Right/Down = Read next item
VO+Space = Activate
```

**Windows/NVDA:**

- Download: https://www.nvaccess.org/
- Tab through page
- R key = Jump to next region
- T key = Jump to next table
- Verify table headers announced
- Verify modal announced as dialog

**Test Specific Components:**

- [ ] OutdoorRiskMatrix: Verify UV Index, AQI, Visibility announced as definitions
- [ ] CurrentConditionsCard: Verify Cloud Cover 68% Partly cloudy announced correctly
- [ ] WeatherDetails: Navigate table with T, arrow keys between cells
- [ ] Modals: Verify announced as dialogs, focus trapped, can close with Esc
- [ ] Scrollable region: Verify orientation, keyboard navigation announced

#### Manual Testing: High Contrast

**macOS:**

- System Preferences → Accessibility → Display → Increase Contrast

**Windows:**

- Settings → Ease of Access → Display → High Contrast mode

**Verify:**

- [ ] All text readable
- [ ] Focus indicators visible
- [ ] Color not only indicator of status

#### Zoom Testing

- [ ] Zoom to 200% (Browser zoom or OS zoom)
- [ ] Text still readable
- [ ] No horizontal scrolling
- [ ] Modals still usable

---

## Success Criteria: Phase 3 Completion

### Semantic HTML ✅

- [ ] OutdoorRiskMatrix uses `<dl>` / `<dt>` / `<dd>`
- [ ] CurrentConditionsCard uses `<dl>` / `<dt>` / `<dd>`
- [ ] WeatherDetails uses semantic `<table>` with `<thead>` / `<tbody>`
- [ ] All tables pass axe-core accessibility test
- [ ] WCAG 1.3.1 (Info and Relationships) — **PASS**

### Modal Focus Management ✅

- [ ] All 8 modals have focus trap (Tab loops within modal)
- [ ] All 8 modals have initial focus (moves to first focusable element)
- [ ] All 8 modals return focus on close (to trigger button)
- [ ] All 8 modals have escape key handler
- [ ] All 8 modals have proper ARIA labels (aria-labelledby, aria-describedby)
- [ ] WCAG 2.1.2 (Focus Order) — **PASS**
- [ ] WCAG 4.1.2 (Name, Role, Value) — **PASS**

### Scrollable Region Keyboard ✅

- [ ] Extended forecast region has aria-label with "use arrow keys"
- [ ] OR has Prev/Next carousel buttons
- [ ] Arrow key navigation working (with e.preventDefault())
- [ ] aria-orientation="horizontal" added
- [ ] Help text visible to users
- [ ] WCAG 2.1.1 (Keyboard) — **PASS**

### Overall Accessibility Metrics

- [ ] Lighthouse Accessibility Score: **95+** (currently ~70-75)
- [ ] axe DevTools violations: **0** (currently 10+)
- [ ] Pa11y violations: **0**
- [ ] Keyboard-only navigation: **Fully functional**
- [ ] Screen reader tested with NVDA/VoiceOver: **No confusion or errors**
- [ ] WCAG 2.1 Level AA: **COMPLIANT**

---

## Appendix A: WCAG 2.1 Standards Reference

### Relevant Success Criteria

| Criterion                    | Level | Status      | Phase 3 Fix            |
| ---------------------------- | ----- | ----------- | ---------------------- |
| 1.3.1 Info and Relationships | A     | **FAIL**    | Semantic markup        |
| 2.1.1 Keyboard               | A     | **PARTIAL** | Scrollable region hint |
| 2.1.2 Focus Order            | A     | **FAIL**    | Modal focus management |
| 4.1.2 Name, Role, Value      | A     | **FAIL**    | Modal ARIA labels      |
| 1.4.11 Non-Text Contrast     | AA    | PASS        | —                      |
| 2.4.7 Focus Visible          | AA    | PASS        | —                      |

---

## Appendix B: Testing Tools

### Automated Testing

| Tool         | Install                     | Use                        | Cost |
| ------------ | --------------------------- | -------------------------- | ---- |
| axe DevTools | npm install @axe-core/react | Browser DevTools extension | Free |
| Pa11y        | npm install pa11y-cli       | CLI: `pa11y https://...`   | Free |
| WAVE         | Browser extension           | Visual UI overlay          | Free |
| Lighthouse   | Built-in Chrome DevTools    | Audit → Accessibility      | Free |

### Screen Readers

| SR        | OS         | Cost | Notes                 |
| --------- | ---------- | ---- | --------------------- |
| VoiceOver | macOS, iOS | Free | Built-in, cmd+F5      |
| NVDA      | Windows    | Free | Download nvaccess.org |
| JAWS      | Windows    | Paid | Industry standard     |
| TalkBack  | Android    | Free | Built-in              |

---

## Appendix C: References

### WCAG 2.1 Specification

- https://www.w3.org/WAI/WCAG21/quickref/

### Semantic HTML Patterns

- **Definition Lists:** https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element
- **Tables:** https://html.spec.whatwg.org/multipage/tables.html#the-table-element
- **Aria Dialog Pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/

### Keyboard Accessibility

- **ARIA Authoring Practices Guide:** https://www.w3.org/WAI/ARIA/apg/
- **Focus Management in React:** https://reactjs.org/docs/refs-and-the-dom.html

### Testing Tools

- **axe DevTools:** https://www.deque.com/axe/devtools/
- **NVDA Keyboard Shortcuts:** https://www.nvaccess.org/files/nvda/documentation/userGuide.html#usingNVDA

---

## Next Steps

1. **Review this audit** with team
2. **Prioritize by score:** Modal fixes (71) → Semantic markup (72) → Scrollable regions (58)
3. **Create GitHub issues** for each component fix
4. **Assign to Phase 3 sprint**
5. **Set accessibility review checkpoint** before merge
6. **Run full axe scan** before deploying to production

---

**Audit Completed:** January 30, 2026
**Standards:** WCAG 2.1 Level AA
**Reviewer:** Dr. Fatima Al-Rashid, ARIA Specialist
**Contact:** For questions on implementation, consult Web Content Accessibility Guidelines 2.1
