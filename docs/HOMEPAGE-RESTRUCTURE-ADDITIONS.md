# Homepage Restructure - Site-Wide Additions

This document supplements `HOMEPAGE-RESTRUCTURE-SPEC.md` with changes needed across other pages and components.

---

## Site-Wide Philosophy Reminder

The core principle applies everywhere: **This is a historic site, not a SaaS funnel.**

The First 250 program is legitimate and valuable—but it should live on its dedicated page (`/first-250`). Other pages should:
- Mention First 250 **once** at most (usually in navigation/footer)
- Lead with **experience** and **variety**
- Drive visitors toward `/visit` and `/events` equally

---

## Components to Modify

### 1. MobileStickyCTA.tsx

**Location:** `components/MobileStickyCTA.tsx`

**Current Problem:** The sticky mobile CTA shows "Join First 250" as the primary gold button on every page (except /first-250). This creates constant enrollment pressure.

**Change:** Replace First 250 CTA with Visit CTA.

```tsx
// CURRENT (remove)
<Link
  href="/first-250"
  className="flex-1 bg-accent text-primary text-center py-3 rounded-sm font-semibold text-sm hover:bg-accent/90 transition-colors"
>
  Join First 250
</Link>

// REPLACEMENT
<Link
  href="/visit"
  className="flex-1 bg-accent text-primary text-center py-3 rounded-sm font-semibold text-sm hover:bg-accent/90 transition-colors"
>
  Plan Your Visit
</Link>
```

**Full updated component:**

```tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Don't show on Visit page (they're already there)
  const hideOnPages = ["/visit"];
  const shouldHide = hideOnPages.some((page) => pathname.startsWith(page));

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (shouldHide) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 md:hidden z-40 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-primary to-transparent pointer-events-none" />

      <nav aria-label="Quick actions" className="bg-primary border-t border-accent/30 px-4 py-3 safe-area-inset-bottom">
        <div className="flex gap-3">
          <Link
            href="/events"
            className="flex-1 bg-white/10 text-white text-center py-3 rounded-sm font-semibold text-sm hover:bg-white/20 transition-colors border border-white/30"
          >
            2026 Events
          </Link>
          <Link
            href="/visit"
            className="flex-1 bg-accent text-primary text-center py-3 rounded-sm font-semibold text-sm hover:bg-accent/90 transition-colors"
          >
            Plan Your Visit
          </Link>
        </div>
      </nav>
    </div>
  );
}
```

---

## Pages to Modify

### 2. Events Page (`app/events/page.tsx`)

**Current Problem:** Has a large "First 250 Reminder" CTA section at the bottom with enrollment gauge and "Claim Your Place" button. Also has First 250 CTA inside the July 4 event card.

**Changes Needed:**

#### A. Remove enrollment data imports and constants
```tsx
// REMOVE these lines
import enrollmentData from "@/data/enrollment.json";

const CURRENT_ENROLLED = enrollmentData.currentEnrolled;
const TOTAL_SPOTS = enrollmentData.totalSpots;
const PROGRESS_PERCENT = Math.round((CURRENT_ENROLLED / TOTAL_SPOTS) * 100);
```

#### B. Remove or soften the First 250 CTA inside July 4 event card

**Current (around line 140):**
```tsx
{/* Signature event CTA */}
{isSignature && event.id === "colonial-independence-day" && (
  <div className="calendar-event-cta">
    <Link href="/first-250" className="calendar-event-cta-link">
      Join the First 250
      <span aria-hidden="true">→</span>
    </Link>
  </div>
)}
```

**OPTION A - Remove entirely** (recommended):
Delete this block.

**OPTION B - Make it subtle:**
```tsx
{isSignature && event.id === "colonial-independence-day" && (
  <p className="calendar-event-note">
    <Link href="/first-250" className="calendar-event-note-link">
      Learn about the First 250 Registry
    </Link>
  </p>
)}
```

#### C. Replace the "First 250 Reminder" section with "Visit CTA"

**Current section (approximately lines 165-195):**
```tsx
{/* ============================================
    FIRST 250 REMINDER - Contextual CTA
    ============================================ */}
<section className="calendar-cta" ...>
  ...enrollment gauge and First 250 push...
</section>
```

**Replace with:**
```tsx
{/* ============================================
    VISIT CTA - See It In Person
    ============================================ */}
<section className="calendar-cta" aria-labelledby="calendar-cta-heading">
  <div className="calendar-cta-inner">
    <div className="calendar-cta-content">
      <p className="calendar-cta-eyebrow">Experience History</p>
      <h2 id="calendar-cta-heading" className="calendar-cta-headline">
        See Where Tennessee Began
      </h2>
      <p className="calendar-cta-desc">
        Walk the same grounds as William Blount and Andrew Jackson. Living history tours daily.
      </p>
    </div>

    <div className="calendar-cta-action">
      <Link href="/visit" className="calendar-cta-btn">
        Plan Your Visit
      </Link>
      <p className="calendar-cta-hours">
        Open Tue–Sat 10am–5pm, Sun 1pm–5pm
      </p>
    </div>
  </div>
</section>
```

#### D. Update CSS for the modified CTA section

The existing `.calendar-cta` styles should work, but remove any First 250-specific styles like `.calendar-cta-progress`, `.calendar-cta-progress-bar`, `.calendar-cta-progress-fill`, `.calendar-cta-progress-label`, `.calendar-cta-deadline`.

Add if needed:
```css
.calendar-cta-hours {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.75rem;
}
```

---

### 3. Lectures Page (`app/lectures/page.tsx`)

**Current State:** Clean. The CTA at bottom goes to `/visit` and `/events`. No changes needed unless you want to add period ornamentation.

**Optional Enhancement:** Add heritage dividers between sections for consistency with homepage design language.

---

### 4. Visit Page (`app/visit/page.tsx`)

**Current State:** Excellent. No First 250 mentions. Properly focused on the visitor experience. No changes needed.

---

### 5. First 250 Page (`app/first-250/page.tsx`)

**Current State:** This is the dedicated conversion page for the First 250 program. It's appropriate for this page to have multiple enrollment CTAs, VintageGauge components, and urgency messaging.

**No changes needed.** The program lives here—let it sell here.

---

### 6. Navigation (`components/Navigation.tsx`)

**Current State:** Has First 250 as one of 5 navigation links. This is appropriate—the program deserves a spot in main navigation.

**No changes needed.**

---

### 7. Footer (`components/Footer.tsx`)

**Current State:** Has "First 250 Program" as one of 4 links under "Explore". This is appropriate.

**No changes needed.**

---

## Summary of Changes

| File | Change Type | Description |
|------|-------------|-------------|
| `components/MobileStickyCTA.tsx` | **Modify** | Change "Join First 250" → "Plan Your Visit" |
| `app/events/page.tsx` | **Modify** | Remove enrollment imports, soften/remove July 4 First 250 CTA, replace bottom First 250 section with Visit CTA |
| `app/page.tsx` | **Major** | See main spec document |
| `app/globals.css` | **Add** | New component styles (see main spec) |
| `components/ExperiencePreview.tsx` | **Create** | New component (see main spec) |
| `components/EventsShowcase.tsx` | **Create** | New component (see main spec) |
| `app/lectures/page.tsx` | No change | Already clean |
| `app/visit/page.tsx` | No change | Already excellent |
| `app/first-250/page.tsx` | No change | Appropriate for its purpose |
| `components/Navigation.tsx` | No change | Balanced navigation |
| `components/Footer.tsx` | No change | Appropriate links |

---

## Missing Pages (Future Consideration)

The site could benefit from these additional pages in the future:

### /about or /history
A dedicated page about Rocky Mount's history, significance, and the Cobb family. Currently this information is scattered across the homepage Story section and Visit page.

### /contact
A dedicated contact page with:
- Group visit inquiry form
- General questions
- Email signup (currently only in footer/decision section)
- Social media links

### /gallery
Photo gallery of the site, events, and living history demonstrations.

These are **not required** for the current restructure but would strengthen the site.

---

## Design System Notes

### Period Ornamentation Classes

These CSS classes from the main spec should be available site-wide for any page that wants them:

```css
.heritage-divider      /* Decorative divider with star/diamond */
.heritage-card         /* Card with corner bracket flourishes */
.parchment-texture     /* Subtle paper texture overlay */
.ornament-star         /* Colored star symbol */
.ornament-diamond      /* Colored diamond symbol */
```

### Consistent Section Patterns

All pages should follow this section anatomy:
```
.section-eyebrow      → Small caps category label (gold)
.section-headline     → Serif headline
.section-intro        → Italic or regular intro paragraph
.section-content      → Main content area
.section-footer       → CTA or closing statement
```

---

## Testing Checklist (Site-Wide)

After all changes:

- [ ] MobileStickyCTA shows "Plan Your Visit" (not "Join First 250")
- [ ] Events page has no enrollment gauge
- [ ] Events page bottom CTA goes to /visit
- [ ] First 250 is mentioned in nav/footer only (plus its dedicated page)
- [ ] Homepage follows main spec (no gathering/decision sections)
- [ ] All pages have consistent period ornamentation available
- [ ] Mobile responsive across all modified pages
- [ ] No console errors
- [ ] All links work

---

## Order of Implementation

Recommended order for Claude Code:

1. **Homepage first** (main spec) - biggest impact
2. **MobileStickyCTA** - quick win, reduces pressure site-wide
3. **Events page** - remove First 250 saturation
4. **CSS additions** - heritage ornamentation classes
5. **Testing** - verify all changes work together
