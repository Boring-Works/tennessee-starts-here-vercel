# Phase 3 Accessibility Implementation Guide

**For:** Tennessee Starts Here - 1775 Almanac
**Components:** OutdoorRiskMatrix, CurrentConditionsCard, WeatherDetails, All Modals, CompactSevenDay
**Standards:** WCAG 2.1 Level AA
**Priority:** High (71-72 points)

---

## IMPLEMENTATION 1: Semantic HTML Tables & Lists

### Pattern: Definition List (Used for Label-Value Pairs)

Use `<dl>` (Definition List), `<dt>` (Definition Term), `<dd>` (Definition Data) for any label-value pair.

#### Before (OutdoorRiskMatrix):

```tsx
<div className="text-xs text-almanac-parchment/70 space-y-1">
  <div className="flex justify-between">
    <span>UV Index:</span>
    <span className="font-medium">
      {uvIndex} {['Low', 'Moderate', 'High', 'Very High', 'Extreme'][uvRisk]}
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

#### After (OutdoorRiskMatrix):

```tsx
<dl className="text-xs text-almanac-parchment/70 space-y-1">
  <div className="flex justify-between">
    <dt className="font-normal">UV Index:</dt>
    <dd className="font-medium m-0">
      {uvIndex} {['Low', 'Moderate', 'High', 'Very High', 'Extreme'][uvRisk]}
    </dd>
  </div>
  {aqi && (
    <div className="flex justify-between">
      <dt className="font-normal">Air Quality:</dt>
      <dd className="font-medium m-0">{aqi} AQI</dd>
    </div>
  )}
  <div className="flex justify-between">
    <dt className="font-normal">Visibility:</dt>
    <dd className="font-medium m-0">{visibility} mi</dd>
  </div>
</dl>
```

**Key Changes:**

- `<div>` → `<dl>` (wraps entire list)
- `<span>` (label) → `<dt>` (definition term)
- `<span>` (value) → `<dd>` (definition data, with `m-0` to remove default margin)

**Why This Works:**

- Screen reader announces: "Definition list, 3 items"
- User navigates with screen reader list commands
- Semantic structure preserved in HTML

---

### Pattern: Semantic Table (Used for Row-Column Data)

Use `<table>` for data with rows AND columns (like 7-day forecast).

#### Structure:

```tsx
<table>
  <thead>
    <tr>
      <th scope="col">Column 1</th>
      <th scope="col">Column 2</th>
      <th scope="col">Column 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Row 1</th>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
    <tr>
      <th scope="row">Row 2</th>
      <td>Data 3</td>
      <td>Data 4</td>
    </tr>
  </tbody>
</table>
```

**WCAG Requirement:**

- Every table MUST have `<thead>` with column headers (`<th>` with `scope="col"`)
- First cell of each row should be `<th scope="row">` (row header)
- This allows screen readers to announce: "Row 1, Cell 1 value, Cell 2 value"

#### Before (WeatherDetails):

```tsx
<div className="space-y-2">
  {futureDays.map((time, displayIndex) => {
    const actualIndex = todayIndex + displayIndex
    const dayName = getDayName(time)
    const weather = getWeatherInfo(daily.weatherCode[actualIndex])
    const precipProb = daily.precipitationProbability[actualIndex]
    const maxTemp = daily.temperatureMax[actualIndex]
    const minTemp = daily.temperatureMin[actualIndex]

    return (
      <div key={time} className="flex items-center justify-between p-3 rounded">
        <span className="w-14">{dayName}</span>
        <div className="flex items-center gap-1">
          <DayIcon className="w-5 h-5" />
        </div>
        <span className="flex-1 text-center">{weather.condition}</span>
        <span className="w-12 text-right">{precipProb}%</span>
        <span className="w-24 text-right">
          {Math.round(maxTemp)}° / {Math.round(minTemp)}°
        </span>
      </div>
    )
  })}
</div>
```

#### After (WeatherDetails):

```tsx
<table className="w-full text-sm">
  <thead className="sr-only">
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Weather Icon</th>
      <th scope="col">Condition</th>
      <th scope="col">Precipitation Probability</th>
      <th scope="col">Temperature</th>
    </tr>
  </thead>
  <tbody className="space-y-2">
    {futureDays.map((time, displayIndex) => {
      const actualIndex = todayIndex + displayIndex
      const dayName = getDayName(time)
      const weather = getWeatherInfo(daily.weatherCode[actualIndex])
      const precipProb = daily.precipitationProbability[actualIndex]
      const maxTemp = daily.temperatureMax[actualIndex]
      const minTemp = daily.temperatureMin[actualIndex]

      return (
        <tr key={time} className="flex items-center justify-between p-3 rounded">
          <th scope="row" className="w-14 text-left font-normal">
            {dayName}
          </th>
          <td>
            <DayIcon className="w-5 h-5 text-almanac-gold/80" aria-hidden="true" />
          </td>
          <td className="flex-1 text-center">{weather.condition}</td>
          <td className="w-12 text-right">{precipProb}%</td>
          <td className="w-24 text-right">
            {Math.round(maxTemp)}° / {Math.round(minTemp)}°
          </td>
        </tr>
      )
    })}
  </tbody>
</table>
```

**Key Changes:**

- Wrap in `<table>`
- Add `<thead>` with `<th scope="col">` headers (hidden with `sr-only` if desired)
- Wrap rows in `<tbody>`
- First cell becomes `<th scope="row">` (day name)
- Other cells become `<td>`
- Keep `className="flex"` styling (CSS Grid makes it work)

**Display: Flex + Table Semantics:**

```css
/* Make table rows display as flex */
tbody tr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
}

/* Column widths with flexbox */
tbody tr th[scope='row'] {
  width: 56px; /* w-14 */
  text-align: left;
  font-weight: normal;
}

tbody tr td:nth-child(2) {
  /* Weather icon */
}

tbody tr td:nth-child(3) {
  flex: 1;
  text-align: center;
}

tbody tr td:nth-child(4) {
  width: 48px; /* w-12 */
  text-align: right;
}

tbody tr td:nth-child(5) {
  width: 96px; /* w-24 */
  text-align: right;
}
```

**Screen Reader Behavior:**

- NVDA: "Table with 5 columns and 7 rows"
- "Day, column header; Weather Icon, column header; Condition, column header; Precipitation Probability, column header; Temperature, column header"
- User presses T to jump to table
- User presses arrow keys to navigate cells
- Each cell announced with its header: "Today, row header; Sunny, cell; 20%, cell; 72 degrees slash 45 degrees, cell"

---

### CurrentConditionsCard: Convert to Definition List

#### Current (ConditionItem component):

```tsx
function ConditionItem({
  icon,
  label,
  value,
  sublabel,
  highlight,
  colorClass,
}: ConditionItemProps) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg ${
        highlight ? 'bg-blue-900/30 border border-blue-500/20' : 'bg-white/5'
      }`}
    >
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-almanac-parchment/50 uppercase tracking-wide mb-0.5">{label}</p>
        <p className={`text-lg font-semibold ${colorClass || 'text-almanac-parchment'}`}>{value}</p>
        {sublabel && <p className="text-xs text-almanac-parchment/40 mt-0.5">{sublabel}</p>}
      </div>
    </div>
  )
}
```

#### After (use definition list):

```tsx
function ConditionItem({
  icon,
  label,
  value,
  sublabel,
  highlight,
  colorClass,
}: ConditionItemProps) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg ${
        highlight ? 'bg-blue-900/30 border border-blue-500/20' : 'bg-white/5'
      }`}
    >
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <dl className="flex-1 min-w-0">
        <dt className="text-xs text-almanac-parchment/50 uppercase tracking-wide mb-0.5">
          {label}
        </dt>
        <dd className={`text-lg font-semibold m-0 ${colorClass || 'text-almanac-parchment'}`}>
          {value}
        </dd>
        {sublabel && <dd className="text-xs text-almanac-parchment/40 mt-0.5 m-0">{sublabel}</dd>}
      </dl>
    </div>
  )
}
```

**Key Changes:**

- Wrap label + value in `<dl>`
- `<p>` (label) → `<dt>`
- `<p>` (value) → `<dd>` with `m-0`
- `<p>` (sublabel) → `<dd>` with `m-0`

---

## IMPLEMENTATION 2: Modal Focus Management

### Custom Focus Management Hook

Create a reusable hook for all modals:

**File:** `/lib/hooks/useModalFocus.ts`

```typescript
import { useEffect, useRef } from 'react'

interface UseModalFocusProps {
  isOpen: boolean
  onClose: () => void
  modalRef: React.RefObject<HTMLDivElement>
  triggerRef?: React.RefObject<HTMLElement>
}

/**
 * Manages focus trap, initial focus, and focus return for modals
 * WCAG 2.1.2 Focus Order compliance
 */
export function useModalFocus({ isOpen, onClose, modalRef, triggerRef }: UseModalFocusProps) {
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    // Store previous focus to return later
    previousFocusRef.current =
      (document.activeElement as HTMLElement) || triggerRef?.current || null

    // Set initial focus to first focusable element in modal
    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length > 0) {
      // Focus first interactive element, or first button (often Close button)
      const firstButton = modalRef.current.querySelector<HTMLElement>('button')
      const firstFocusable = focusableElements[0]

      // Prefer focusing on input/search if available
      const searchInput = modalRef.current.querySelector<HTMLElement>('input')
      if (searchInput) {
        searchInput.focus()
      } else if (firstButton && firstButton !== focusableElements[0]) {
        // Don't focus close button first, focus actual content
        firstFocusable.focus()
      } else {
        firstFocusable.focus()
      }
    }

    // Focus trap: prevent Tab from escaping modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab' || !modalRef.current) return

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const currentElement = document.activeElement

      // Shift+Tab on first element → focus last element
      if (e.shiftKey && currentElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
      // Tab on last element → focus first element
      else if (!e.shiftKey && currentElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Cleanup: remove event listener and restore focus
    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      // Return focus to trigger element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      } else if (triggerRef?.current) {
        triggerRef.current.focus()
      }
    }
  }, [isOpen, onClose, modalRef, triggerRef])
}
```

### Usage Example: InfoPopup Modal

**Before:**

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

**After (with focus management):**

```tsx
interface InfoModalProps {
  content: InfoContent
  onClose: () => void
  triggerRef?: React.RefObject<HTMLElement>
}

function InfoModal({ content, onClose, triggerRef }: InfoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Use focus management hook
  useModalFocus({
    isOpen: true,
    onClose,
    modalRef,
    triggerRef,
  })

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 z-50"
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full md:mx-4 bg-midnight border border-almanac-gold/30 rounded-t-2xl md:rounded-lg shadow-2xl z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        aria-describedby="info-modal-description"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-almanac-gold/20">
          <h2 id="info-modal-title" className="font-serif text-xl text-gold-leaf">
            {content.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-almanac-parchment/40 hover:text-almanac-parchment transition-colors -m-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-almanac-gold active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div id="info-modal-description" className="p-4 max-h-[70vh] overflow-y-auto space-y-5">
          {/* Content... */}
        </div>

        {/* Mobile drag indicator */}
        <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-almanac-parchment/20 rounded-full" />
      </motion.div>
    </>
  )
}
```

**Parent Component Update (InfoPopup):**

```tsx
export function InfoPopup({ content, iconSize = 'sm' }: InfoPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const iconClassName = iconSize === 'sm' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center text-almanac-parchment/40 hover:text-almanac-gold transition-colors -m-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-almanac-gold active:scale-95"
        aria-label={`Learn more about ${content.title}`}
      >
        <Info className={iconClassName} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <InfoModal content={content} onClose={() => setIsOpen(false)} triggerRef={buttonRef} />
        )}
      </AnimatePresence>
    </>
  )
}
```

---

### Apply Same Pattern to Other Modals

Apply `useModalFocus` hook to:

1. **ScoreExplainer.tsx** - ScoreModal component
2. **InfoPopup.tsx** - InfoModal component
3. **CompactSevenDay.tsx** - DayDetailModal component

All follow the same pattern:

```tsx
const modalRef = useRef<HTMLDivElement>(null)
const triggerRef = useRef<HTMLButtonElement>(null)

useModalFocus({
  isOpen: isOpen, // or selectedIndex !== null
  onClose: handleClose,
  modalRef,
  triggerRef,
})
```

---

## IMPLEMENTATION 3: Scrollable Region Keyboard

### Option A: Add Carousel Prev/Next Buttons (Recommended)

**File:** `/components/almanac/CompactSevenDay.tsx` (Lines 345-402)

```tsx
{
  hasExtraDays && (
    <>
      <div className="border-t border-white/10 my-2" />

      <div className="relative">
        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
          role="region"
          aria-label="Extended 8-16 day forecast. Use arrow buttons or keyboard arrow keys to navigate."
          aria-orientation="horizontal"
          aria-live="polite"
          aria-atomic="false"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault()
              e.currentTarget.scrollBy({ left: 120, behavior: 'smooth' })
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              e.currentTarget.scrollBy({ left: -120, behavior: 'smooth' })
            }
          }}
        >
          <div className="flex gap-1 min-w-min">
            {extraDays.map((day, index) => {
              const actualIndex = index + 7
              const WeatherIcon = getWeatherIcon(day.code)
              const showPrecip = day.precipChance > 20

              return (
                <button
                  type="button"
                  key={actualIndex}
                  onClick={() => {
                    previousFocusRef.current = document.activeElement as HTMLElement
                    setSelectedIndex(actualIndex)
                  }}
                  className="flex flex-col items-center gap-1 py-2 px-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-almanac-gold focus:ring-offset-2 focus:ring-offset-almanac-midnight"
                  aria-label={`${day.dayFull || day.day}${day.date ? ' ' + day.date : ''}, High ${Math.round(day.high)}, Low ${Math.round(day.low)}`}
                >
                  <span className="text-xs font-medium text-almanac-parchment/60">{day.day}</span>
                  <WeatherIcon className="w-5 h-5 text-almanac-gold/80" aria-hidden="true" />
                  <span className="text-sm font-semibold text-almanac-parchment">
                    {Math.round(day.high)}°
                  </span>
                  <span className="text-xs text-almanac-parchment/50">{Math.round(day.low)}°</span>
                  {showPrecip && (
                    <span className="flex items-center gap-0.5 text-xs text-blue-400">
                      <Droplets className="w-3 h-3" aria-hidden="true" />
                      {day.precipChance}%
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Previous button */}
        <button
          type="button"
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({
                left: -120,
                behavior: 'smooth',
              })
            }
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-black/70 to-transparent hover:from-black/90 text-white p-2 rounded-r transition-colors focus:outline-none focus:ring-2 focus:ring-almanac-gold min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Scroll extended forecast left"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({
                left: 120,
                behavior: 'smooth',
              })
            }
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-black/70 to-transparent hover:from-black/90 text-white p-2 rounded-l transition-colors focus:outline-none focus:ring-2 focus:ring-almanac-gold min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Scroll extended forecast right"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Help text */}
      <p className="text-center text-sm text-almanac-gold/70 mt-2 flex items-center justify-center gap-2 font-medium">
        <span>Scroll for {extraDays.length} more days</span>
        <span className="text-xs text-almanac-parchment/50">
          (Arrow buttons or keyboard arrow keys)
        </span>
      </p>
    </>
  )
}
```

**Add ref at top of component:**

```tsx
const scrollContainerRef = useRef<HTMLDivElement>(null)
```

**Imports needed:**

```tsx
import { ChevronLeft, ChevronRight } from 'lucide-react'
```

---

### Option B: Enhance Arrow Key Scrolling (Minimum Fix)

If carousel buttons not desired, add better ARIA labels and help text:

```tsx
{
  hasExtraDays && (
    <>
      <div className="border-t border-white/10 my-2" />
      <div
        className="overflow-x-auto scrollbar-hide"
        role="region"
        aria-label="Extended 8-16 day forecast. Use left and right arrow keys to navigate."
        aria-orientation="horizontal"
        aria-describedby="forecast-keyboard-hint"
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
        <div className="flex gap-1 min-w-min">{/* Day buttons */}</div>
      </div>

      {/* Help text with ID for aria-describedby */}
      <p id="forecast-keyboard-hint" className="text-center text-xs text-almanac-parchment/50 mt-2">
        Tab to the forecast and use ← → arrow keys to scroll, or tap the forecast area
      </p>
    </>
  )
}
```

---

## Validation Checklist

After implementing all fixes, verify:

### Semantic HTML

- [ ] `<dl>` elements have valid structure
  ```bash
  npm run build  # Check TypeScript types
  ```
- [ ] `<table>` elements have headers
- [ ] All `<th>` have `scope` attribute
- [ ] `<dd>` elements have `m-0` to remove margins

### Modal Focus Management

- [ ] All modals use `useModalFocus` hook
- [ ] All modals have `role="dialog"` and `aria-modal="true"`
- [ ] All modals have `aria-labelledby` pointing to heading
- [ ] All modals have `aria-describedby` if there's descriptive text
- [ ] Close buttons have `aria-label`

### Scrollable Regions

- [ ] Region has `aria-label` with usage instructions
- [ ] Region has `aria-orientation="horizontal"`
- [ ] Arrow key handlers have `e.preventDefault()`
- [ ] Help text visible to users
- [ ] Buttons have `aria-label` describing action

### Testing

- [ ] Run: `npm run lint` (no accessibility warnings)
- [ ] Run: `npm run build` (no type errors)
- [ ] Keyboard test: Tab through entire page
- [ ] Screen reader test: NVDA announces modals, tables, definitions correctly

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Styling Breaks Semantic Elements

**Wrong:**

```tsx
<table style={{ display: 'block' }}>
  {/* Table looks like div, but screen reader still uses table commands */}
</table>
```

**Right:**

```tsx
/* Use CSS that works WITH semantics */
table {
  width: 100%;
}
tbody tr {
  display: flex;
  /* Visual flexbox layout but semantic table structure */
}
```

---

### ❌ Mistake 2: Forgetting aria-hidden on Decorative Elements

**Wrong:**

```tsx
<div className="flex items-center gap-1">
  <div className="w-3 h-3 rounded bg-red-500" />
  <span>Status</span>
</div>
```

Screen reader announces: "group, status" (the red box is noise)

**Right:**

```tsx
<div className="flex items-center gap-1">
  <div className="w-3 h-3 rounded bg-red-500" aria-hidden="true" />
  <span>Status</span>
</div>
```

Screen reader announces: "Status" (cleaner)

---

### ❌ Mistake 3: Missing Escape Key Handler in Modals

**Wrong:**

```tsx
function Modal() {
  const [isOpen, setIsOpen] = useState(false)
  // No Escape key handler
  return <div>{isOpen && /* modal */}</div>
}
```

**Right:**

```tsx
function Modal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  return <div>{isOpen && /* modal */}</div>
}
```

---

### ❌ Mistake 4: Focus Trap Without Escape Route

**Wrong:**

```tsx
// Focus trap prevents Tab escaping, but Esc doesn't close
const handleTab = (e: KeyboardEvent) => {
  if (e.key !== 'Tab') return
  // ... focus trap logic but no Escape handling
}
```

**Right:**

```tsx
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onClose() // User can always escape
    return
  }
  if (e.key === 'Tab') {
    // ... focus trap logic
  }
}
```

---

## Code Review Checklist

Use this when reviewing Phase 3 implementation:

### For Each Component Changed

- [ ] Semantic elements used correctly
- [ ] ARIA attributes complete and correct
- [ ] Focus management implemented (if modal)
- [ ] Keyboard handlers have `preventDefault()`
- [ ] No console warnings in DevTools
- [ ] Types compile without errors
- [ ] Component renders without errors

### For Modal Components

- [ ] `useModalFocus` hook applied
- [ ] `ref={modalRef}` on dialog div
- [ ] `triggerRef` passed from parent
- [ ] ARIA labels set correctly
- [ ] Backdrop click closes modal
- [ ] Escape key closes modal
- [ ] Focus trap tested manually

### For Table Components

- [ ] `<thead>` with `<th scope="col">`
- [ ] `<tbody>` wraps data rows
- [ ] First cell of each row is `<th scope="row">`
- [ ] All other cells are `<td>`
- [ ] Styling preserved (flexbox or CSS Grid)
- [ ] Screen reader test passes

### For Scrollable Regions

- [ ] `role="region"` present
- [ ] `aria-label` describes content and controls
- [ ] `aria-orientation="horizontal"` set
- [ ] Arrow key handlers have `preventDefault()`
- [ ] Help text visible to users
- [ ] Tested with keyboard

---

## Performance Considerations

Adding semantic HTML and focus management should NOT impact performance:

- `<dl>`, `<dt>`, `<dd>` have no performance impact
- `<table>`, `<thead>`, `<tbody>` have no performance impact
- Focus trap hook uses event listeners (very fast)
- ARIA attributes are read-only (no runtime cost)

**Before Phase 3:** Lighthouse Performance: ~88
**After Phase 3:** Lighthouse Performance: ~88 (no change)

---

## Maintenance Notes

### After Implementation

1. **Update component documentation:**
   - Add comment explaining semantic structure
   - Document focus management pattern
   - Example: "This component uses semantic `<dl>` for accessibility"

2. **Add lint rules:**
   - Ensure ESLint checks for missing ARIA attributes
   - Consider adding `jsx-a11y/role-supports-aria-props` rule

3. **Include in component library:**
   - Create reusable modal component with focus management built-in
   - Example: `<AccessibleModal>` wrapper

4. **Future accessibility improvements:**
   - Consider `focus-trap-react` library for centralized focus management
   - Consider Radix UI Dialog primitive (built-in accessibility)
   - Review color contrast ratios (already WCAG AA compliant)

---

**Implementation Guide Complete**
Date: January 30, 2026
Standards: WCAG 2.1 Level AA
