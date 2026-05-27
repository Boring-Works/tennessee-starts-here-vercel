# Phase 3 Accessibility: Quick Reference Card

**For Developers & QA**

---

## 3 Issues at a Glance

### Issue 1: Semantic HTML (72 pts)

**Components:** OutdoorRiskMatrix, CurrentConditionsCard, WeatherDetails
**Problem:** Using `<div>` instead of semantic markup
**Pattern:** `<dl>` for definitions, `<table>` for data grids
**Status:** ❌ FAIL

### Issue 2: Modal Focus (71 pts)

**Components:** DayDetailModal, InfoPopup, ScoreExplainer (2 modals)
**Problem:** No focus trap, initial focus, or focus return
**Pattern:** Use `useModalFocus` hook
**Status:** ❌ FAIL (3/6 modals)

### Issue 3: Scrollable Region (58 pts)

**Component:** CompactSevenDay extended forecast
**Problem:** Unclear keyboard navigation
**Pattern:** Add aria-label with "use arrow keys" or Prev/Next buttons
**Status:** ⚠️ PARTIAL

---

## Semantic HTML Patterns

### Definition List (Label-Value Pairs)

```tsx
// Use this for: UV Index: 6, Cloud Cover: 68%, etc.
<dl>
  <div className="flex justify-between">
    <dt>Label</dt>
    <dd className="m-0">Value</dd>
  </div>
</dl>
```

### Table (Row-Column Data)

```tsx
// Use this for: 7-day forecast, data tables
<table>
  <thead className="sr-only">
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Temp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>72°</td>
    </tr>
  </tbody>
</table>
```

---

## Modal Focus Management

### Reusable Hook

```tsx
import { useModalFocus } from '@/lib/hooks/useModalFocus'

// In your modal component:
const modalRef = useRef<HTMLDivElement>(null)
const triggerRef = useRef<HTMLButtonElement>(null)

useModalFocus({
  isOpen: isOpen,
  onClose: handleClose,
  modalRef,
  triggerRef,
})
```

### Modal HTML Structure

```tsx
<div
  ref={modalRef}
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h2 id="modal-title">Title</h2>
  <p id="modal-desc">Description</p>
  {/* Content */}
  <button onClick={onClose} aria-label="Close">
    X
  </button>
</div>
```

---

## Scrollable Region Accessibility

### Add These ARIA Attributes

```tsx
;<div
  className="overflow-x-auto"
  role="region"
  aria-label="Extended forecast. Use left/right arrow keys to scroll."
  aria-orientation="horizontal"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      e.currentTarget.scrollBy({ left: 100, behavior: 'smooth' })
    }
  }}
>
  {/* Scrollable content */}
</div>

{
  /* Help text for users */
}
;<p className="text-xs text-muted">Use arrow keys or scroll buttons to navigate</p>
```

---

## Testing Checklist

### Keyboard Only

- [ ] Tab through page (unplug mouse)
- [ ] Modal opens/closes with keyboard
- [ ] Tab loops within modals (focus trap)
- [ ] Esc closes modals
- [ ] Focus returns to trigger button
- [ ] Arrow keys scroll extended forecast
- [ ] No keyboard traps (can always escape)

### Screen Reader (NVDA)

- [ ] Modal announced as dialog with name
- [ ] Definition lists announced correctly
- [ ] Tables navigable with T key
- [ ] Column headers announced with cells
- [ ] All buttons have accessible names

### Visual

- [ ] Focus indicators visible (blue ring)
- [ ] High contrast mode readable
- [ ] 200% zoom usable
- [ ] Text not cut off

---

## Component Checklist

### Before Phase 3

```
OutdoorRiskMatrix:      ❌ ❌ ❌
CurrentConditionsCard:  ❌ ❌ ❌
WeatherDetails:         ❌ ❌ ❌
DayDetailModal:         ⚠️ ❌ ❌
InfoPopup:              ❌ ❌ ❌
ScoreExplainer (2):     ❌ ❌ ❌
CompactSevenDay scroll: ❌ ❌ ⚠️

Legend: [Semantic] [Focus] [Keyboard]
```

### After Phase 3

```
OutdoorRiskMatrix:      ✅ - -
CurrentConditionsCard:  ✅ - -
WeatherDetails:         ✅ - -
DayDetailModal:         - ✅ ✅
InfoPopup:              - ✅ ✅
ScoreExplainer (2):     - ✅ ✅
CompactSevenDay scroll: - - ✅

ALL COMPONENTS:         ✅ ✅ ✅
```

---

## Common Mistakes

### ❌ DON'T

```tsx
// Missing m-0 on <dd>
<dd>{value}</dd>  // Has default margin-bottom

// Table with no <thead>
<table><tbody><tr>...

// Modal without focus management
<div role="dialog">...  // Focus can escape!

// Arrow keys without preventDefault
onKeyDown={(e) => {
  if (e.key === 'ArrowRight') {
    scroll()  // Page scrolls too!
  }
}}

// Region without aria-label
<div role="region" tabIndex={0}>...  // Purpose unclear
```

### ✅ DO

```tsx
// Reset <dd> margin
<dd className="m-0">{value}</dd>

// Table with visible/hidden headers
<table>
  <thead className="sr-only"><tr>...

// Modal with focus management hook
const modalRef = useRef(null)
useModalFocus({ isOpen, onClose, modalRef })

// Arrow keys with preventDefault
if (e.key === 'ArrowRight') {
  e.preventDefault()  // Prevents page scroll
  scroll()
}

// Region with clear purpose
role="region"
aria-label="Extended forecast. Use arrow keys to scroll."
aria-orientation="horizontal"
```

---

## Files to Read

| File                                  | Purpose                  | Read When                |
| ------------------------------------- | ------------------------ | ------------------------ |
| ACCESSIBILITY-AUDIT-PHASE-3.md        | Detailed technical audit | Understanding the issues |
| ACCESSIBILITY-IMPLEMENTATION-GUIDE.md | Code examples & patterns | Writing the fixes        |
| ACCESSIBILITY-TESTING-CHECKLIST.md    | Testing procedures       | Testing the fixes        |
| PHASE-3-SUMMARY.md                    | Executive overview       | Briefing leadership      |
| This file                             | Quick reference          | During development       |

---

## Terminal Commands

### Check for accessibility issues

```bash
npm run build                  # TypeScript checking
npx axe-core scan            # Scan for violations
npx pa11y http://localhost   # Pa11y audit
```

### Test keyboard navigation

```bash
# No command - just unplug mouse and Tab through page!
```

### Test with screen readers

```bash
# Mac: Cmd+F5 to enable VoiceOver
# Windows: Download NVDA from nvaccess.org
```

---

## WCAG Success Criteria

| Issue         | WCAG                         | Level | Status  |
| ------------- | ---------------------------- | ----- | ------- |
| Semantic HTML | 1.3.1 (Info & Relationships) | A     | FAIL    |
| Modal Focus   | 2.1.2 (Focus Order)          | A     | FAIL    |
| Modal Labels  | 4.1.2 (Name, Role, Value)    | A     | FAIL    |
| Keyboard      | 2.1.1 (Keyboard)             | A     | PARTIAL |

**Target:** WCAG 2.1 Level AA (all above PASS)

---

## Success Metrics (After Phase 3)

- [ ] Lighthouse Accessibility: **95+**
- [ ] axe violations: **0**
- [ ] Pa11y violations: **0**
- [ ] Keyboard-only: **Fully functional**
- [ ] Screen reader: **Tested & passing**
- [ ] WCAG 2.1 AA: **COMPLIANT**

---

## Need Help?

1. **Understanding the audit?** Read ACCESSIBILITY-AUDIT-PHASE-3.md
2. **How to implement?** Read ACCESSIBILITY-IMPLEMENTATION-GUIDE.md
3. **How to test?** Read ACCESSIBILITY-TESTING-CHECKLIST.md
4. **General questions?** Check PHASE-3-SUMMARY.md

**All files in:** `/docs/`

---

## Time Breakdown

| Task                   | Time       | Owner |
| ---------------------- | ---------- | ----- |
| Modal Focus Management | 4-6h       | Dev   |
| Semantic HTML          | 2-3h       | Dev   |
| Scrollable Region      | 2-3h       | Dev   |
| Testing & QA           | 3-4h       | QA    |
| Fix Issues             | 1-2h       | Dev   |
| **TOTAL**              | **14-20h** |       |

---

**Audit Date:** January 30, 2026
**Standard:** WCAG 2.1 Level AA
**Status:** Ready for Implementation
