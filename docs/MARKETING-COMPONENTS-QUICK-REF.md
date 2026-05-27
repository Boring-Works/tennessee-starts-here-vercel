# Marketing Components - Quick Reference

Fast lookup for designers and developers building with these components.

---

## At a Glance

| Component                  | Purpose                           | Data Source         | Best For                          |
| -------------------------- | --------------------------------- | ------------------- | --------------------------------- |
| **SiteStatusBadge**        | Real-time open/closed indicator   | `getSiteStatus()`   | Header, hero, visit page          |
| **TestimonialCard**        | Social proof & trust building     | `testimonials.json` | Homepage, events, footer          |
| **NextEventCard**          | Upcoming event showcase with FOMO | `events.json`       | Homepage, sidebar, calendar       |
| **ReviewCTA**              | Post-visit review encouragement   | `integrations.json` | Email, footer, thank-you page     |
| **VisitorJourneyProgress** | Value prop visualization          | `experiences.json`  | Visit page, booking, event detail |

---

## Component Anatomy

### SiteStatusBadge

```
Status Check
    ↓
[Open/Closed Decision]
    ↓
    ├─ Open → Show urgency copy
    │         ("Open now!", "Last tour at 4pm")
    │
    └─ Closed → Show next open time
               ("Opens Wednesday 10am")
```

**3 Modes:**

- `compact` — Icon + "Open"/"Closed" (header)
- `standard` — Icon + message + next time (visit page)
- `detailed` — Full marketing message (hero)

**Marketing angle:** Create urgency ("Now!") OR anticipation ("Soon!")

---

### TestimonialCard

```
Real testimonial from data/testimonials.json
    ↓
[Choose display mode]
    ↓
├─ featured: Full card, rating, source link + CTA
├─ quote:    Just quote + attribution + stars
└─ social_proof: Compact stat "4.7⭐ Google"
```

**Key:** Use `featured` on homepage, `quote` on event pages, `social_proof` in footer.

**Data source:** 3 sources (Google, TripAdvisor, Facebook) all verified, rated 5⭐

---

### NextEventCard

```
Get next upcoming event from events.json
    ↓
Calculate days until event
    ↓
[Choose display mode]
    ↓
├─ compact: Date + Title + Book button
├─ standard: + Description excerpt
└─ featured: + Countdown timer + Capacity + Full story
```

**Countdown text:** "Today" | "Tomorrow" | "This weekend" | "In X days"

**Capacity:** Shows "Only 10 spots" if limited

**Key:** First featured event (America 250 emphasis), fallback message if none

---

### ReviewCTA

```
Visitor completes event/visit
    ↓
(Optional: Wait N seconds for gratitude moment)
    ↓
Show review CTA with 3 platforms
    ↓
[Choose style]
    ↓
├─ card: Full featured card (post-visit email)
├─ inline: Horizontal buttons (thank-you page)
└─ badge: Compact badge links (footer)
```

**URLs:** All 3 stored in `integrations.json`

- Google: `rockymountmuseum` business
- TripAdvisor: Reviews page URL
- Facebook: `/rockymountmuseum/reviews`

**Key insight:** Post-visit gratitude mindset = highest conversion → ask 2-3 days after visit

---

### VisitorJourneyProgress

```
Experience moments (I-IV) from experiences.json
    ↓
[Choose display]
    ↓
├─ timeline: Vertical with connectors (visit page)
├─ cards: Grid of 4 cards (event page)
├─ checklist: ✓ List (booking page sidebar)
└─ carousel: Horizontal scroll (mobile email)
```

**Always includes:**

- 4 experience moments (immersion, interpretation, hands-on, education)
- 3 visit inclusions (guided tour, buildings, museum)
- 6 highlights list

**Key:** Answers "What will I do?" → Reduces booking hesitation

---

## Copy Patterns

### Urgency (When Open)

```
Status: Open
Copy: "Open right now! Last tour at 4pm. Step into history."
Emphasis: Glow/highlight effect
CTA: "Book Now"
Trigger: Current hour 10-16 (open hours)
```

### Anticipation (When Closed, Soon)

```
Status: Closed, Opens Tomorrow
Copy: "We open Wednesday at 10am. We'll be waiting."
Emphasis: Normal
CTA: "Set a Reminder"
Trigger: Less than 48 hours until next opening
```

### Special Event Prep (During Day, Event Tonight)

```
Status: Closed (Prepping)
Copy: "Preparing for Haunting on the Mount tonight.
       Come experience spine-tingling history at 6pm."
Special: Show event title + time
CTA: "Book Tonight"
Trigger: Special event configured, within 12 hours of start
```

### FOMO for Limited Capacity

```
Event Card:
"Only 42 spots remaining"
Copy: "Selling fast. Reserve your spot now."
Icon: 🔴 Red indicator
CTA: "Book Immediately"
Trigger: <50 spots left calculated from capacity
```

---

## Placement Strategy

### Homepage (Conversion Funnel)

```
1. SiteStatusBadge (detailed)
   → "Are you open?" Question answered immediately

2. NextEventCard (featured)
   → "What's next?" Creates FOMO, builds anticipation

3. TestimonialCard ×3 (featured)
   → "Should I trust you?" Social proof, builds confidence

CTA Pattern: Status → Interest → Confidence → Action
```

### Visit Planning Page

```
1. SiteStatusBadge (standard)
   → Confirms site availability

2. VisitorJourneyProgress (timeline)
   → "What will I do?" Answers questions

3. ReviewCTA (inline)
   → "Help us improve" Post-visit pitch

Goal: Remove all friction from booking
```

### Events Page

```
1. NextEventCard (compact, sidebar)
   → "What's coming up?"

2. Event list with TestimonialCard (quote mode)
   → Category-filtered reviews for event type

3. VisitorJourneyProgress (cards)
   → "What will I experience at THIS event?"

Goal: Drive bookings for specific events
```

### Footer

```
ReviewCTA (badge mode, minimal)
TestimonialCard (social_proof mode)
NextEventCard (compact mode)

Goal: Ambient conversion opportunities
```

---

## Data Dependencies

### Required Files

```
data/
├── events.json          (NextEventCard)
├── testimonials.json    (TestimonialCard)
├── experiences.json     (VisitorJourneyProgress)
└── integrations.json    (ReviewCTA)

lib/
├── siteHours.ts         (SiteStatusBadge)
├── copy/brand.ts        (All copy text)
└── data/
    └── ...utilities
```

### Key Functions

```typescript
// SiteStatusBadge
getSiteStatus(date?: Date) → SiteStatus

// NextEventCard + ReviewCTA
getTicketUrl(event) → string

// All components
import { HOOKS, BUTTONS } from '@/lib/copy'
```

---

## Quick Recipes

### "Make it urgent"

```typescript
// Add to SiteStatusBadge
<SiteStatusBadge
  mode="detailed"
  emphasis="urgent"  // ← Adds glow effect
/>

// Add to NextEventCard
showCapacity={true}  // ← Shows "Only X spots"
showCountdown={true} // ← Shows timer

// Add to ReviewCTA
showDelay={true}     // ← Wait for gratitude moment
showDelayMs={2000}
```

### "Add to header navigation"

```typescript
<div className="flex items-center gap-4">
  <SiteStatusBadge mode="compact" />
  {/* Shows "🟢 Open now" or "🔴 Closed" */}
</div>
```

### "Booking page sidebar"

```typescript
<aside className="bg-gray-50 p-6 rounded">
  <VisitorJourneyProgress
    style="checklist"
    showIncludes={true}
  />
  <NextEventCard mode="compact" />
  <ReviewCTA style="badge" />
</aside>
```

### "Event email"

```typescript
// Post-event follow-up
<NextEventCard mode="compact" />
<ReviewCTA context="postEvent" eventName="Candlelight Christmas" />
```

### "Homepage hero"

```typescript
<section className="py-24">
  <SiteStatusBadge mode="detailed" emphasis="urgent" />
  <NextEventCard mode="featured" showCountdown showCapacity />
  <TestimonialCard mode="featured" showReviewCTA />
</section>
```

---

## Styling Checklist

Before shipping each component:

- [ ] Uses design tokens (`var(--gold-primary)`, etc.)
- [ ] Accessible color contrast (4.5:1 text)
- [ ] Mobile responsive (<640px, 640-1024px, >1024px)
- [ ] Hover states on interactive elements
- [ ] Focus indicators for keyboard nav
- [ ] No hardcoded colors or shadows
- [ ] Consistent padding/spacing (use Tailwind scale)
- [ ] Semantic HTML (blockquote, time, cite, etc.)

---

## Common Customizations

### Change accent color scheme

Edit `app/globals.css`:

```css
--gold-primary: #your-color;
--gold-hover: #lighter-shade;
--gold-shimmer: rgba(...);
```

### Add new review platform

Edit `data/integrations.json` → `reviews.platforms`:

```json
"yelp": {
  "enabled": true,
  "reviewUrl": "https://...",
  "configured": true
}
```

Then update component platform list.

### Change social proof stats

Edit `data/testimonials.json` → `stats`:

```json
"stats": {
  "google": {
    "rating": 4.8,
    "totalReviews": 150,
    "url": "..."
  }
}
```

### Filter events by category

In `NextEventCard`, change event selection:

```typescript
events.events
  .filter((e) => e.category === 'signature')
  .sort((a, b) => new Date(a.date) - new Date(b.date))
```

---

## Troubleshooting

### Component shows no data

1. Check data file exists and valid JSON
2. Verify import path uses `@/` absolute path
3. Confirm prop types match interface
4. Check browser console for 404 errors
5. Verify JSON keys match component expectations

### Status badge always shows closed

1. Check `lib/siteHours.ts` logic
2. Verify today's date is within season (Mar 4 - Dec 20)
3. Check it's a Wed-Sat (open days)
4. Check no closure holiday (Thanksgiving)
5. Use test date prop: `checkDate={new Date('2026-07-04')}`

### Reviews not linking correctly

1. Verify URLs in `data/integrations.json`
2. Test links in browser (not building in isolation)
3. Check `target="_blank"` on links
4. Confirm rel="noopener noreferrer"

### Event card shows no countdown

1. Check event date in future
2. Verify date format YYYY-MM-DD
3. Ensure `showCountdown={true}` prop
4. Check component has `daysUntilEvent()` utility

---

## Performance Tips

- Use server components by default
- Only use `'use client'` for ReviewCTA (event handlers)
- Cache JSON file imports
- Lazy load below-fold components
- Use CSS animations (not JS)
- Image optimization via `next/image`

---

## Conversion Optimization

### A/B Test These

1. **Copy variants**
   - "Open now!" vs "Step inside"
   - "Book Now" vs "Reserve Spot"
   - "Share your experience" vs "Leave a review"

2. **Visual emphasis**
   - Glow effect on open badge
   - Countdown timer size
   - CTA button color/size

3. **Placement**
   - Above fold vs below fold
   - Hero vs sidebar
   - Standalone vs carousel

4. **Timing**
   - ReviewCTA delay (0s vs 2s vs 5s)
   - When to show NextEventCard

### Metrics to Track

```
SiteStatusBadge:
├─ Views
├─ Clicks (when compact)
└─ Conversion (to booking)

NextEventCard:
├─ Views
├─ "Learn More" clicks
└─ Booking starts

TestimonialCard:
├─ Views
└─ Review platform clicks

ReviewCTA:
├─ Views
├─ Platform click-through
└─ Review completion (via referrer tracking)

VisitorJourneyProgress:
├─ Views
└─ Scroll depth (did they see all moments?)
```

---

## Component Lifecycle

### Creation

1. Design component interface (props)
2. Choose data source (JSON file)
3. Pick marketing copy variants
4. Select placement(s)
5. Determine display modes

### Implementation

1. Create component file
2. Import data, utilities, copy
3. Build prop interface
4. Implement all display modes
5. Add accessibility attributes
6. Style with design tokens

### Testing

1. Test all modes/variants
2. Test all data variations
3. Check mobile responsive
4. Verify accessibility (a11y)
5. Confirm analytics events
6. Review with team

### Shipping

1. Update CLAUDE.md (new component)
2. Add to component library docs
3. Create usage examples
4. Deploy to staging
5. Monitor analytics
6. Iterate based on data

---

## Resources

- **Design tokens:** `docs/DESIGN-TOKENS.md`
- **Brand copy:** `docs/COPY.md`
- **Data standards:** `docs/DATA-STANDARDS.md`
- **Component specs:** `docs/MARKETING-COMPONENTS.md`
- **Code templates:** `docs/MARKETING-COMPONENTS-IMPLEMENTATION.md`

---

**Last updated:** January 30, 2026
