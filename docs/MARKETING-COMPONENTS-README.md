# Marketing Components System

**Goal:** Transform Rocky Mount's data into high-conversion visitor experiences through 5 standardized, reusable components.

**Philosophy:** Every component is a funnel stage. Show status → Build trust → Create FOMO → Close the ask.

---

## The 5 Components

### 1. SiteStatusBadge

Real-time open/closed indicator that creates urgency or anticipation.

- **Data:** `lib/siteHours.ts` → `getSiteStatus()`
- **Uses:** Header, hero section, visit planning
- **Magic:** "Open now!" (drive visit) OR "Opens tomorrow" (build anticipation)
- **Modes:** compact, standard, detailed

**Example:** Visitor hits site → sees "🟢 Open right now! Last tour at 4pm." → Books immediately

---

### 2. TestimonialCard

Displays verified social proof to build trust and credibility.

- **Data:** `data/testimonials.json`
- **Sources:** Google Reviews (4.7⭐), TripAdvisor (4.5⭐), Facebook (5⭐)
- **Uses:** Homepage proof section, event pages, footer
- **Magic:** Real visitors, real voices, real impact
- **Modes:** featured, quote, social_proof

**Example:** Carousel shows "It was like you got teleported back in time..." → Visitor confidence increases → Conversion rises

---

### 3. NextEventCard

Shows upcoming event with FOMO urgency and easy booking.

- **Data:** `data/events.json`
- **Sorts:** Featured events first, then by date
- **Uses:** Homepage hero, sidebar, calendar view, email
- **Magic:** Countdown timer ("In 42 days") + Capacity ("Only X spots") + Description
- **Modes:** compact, standard, featured

**Example:** Visitor sees "Colonial Independence Day: Only 150 spots left" → Feels FOMO → Books immediately

---

### 4. ReviewCTA

Encourages visitors to leave reviews after experiencing Rocky Mount.

- **Data:** `data/integrations.json` + platform URLs
- **Platforms:** Google Reviews, TripAdvisor, Facebook
- **Uses:** Post-visit email, thank-you page, event follow-up, footer
- **Magic:** Post-visit gratitude mindset = highest conversion rate
- **Styles:** card, inline, badge

**Example:** Send email 2-3 days after visit → Visitor in gratitude mindset → Leaves 5-star review

---

### 5. VisitorJourneyProgress

Shows visitor what's included in a visit—the complete value proposition.

- **Data:** `data/experiences.json`
- **Moments:** 4 experience moments (immersion → interpretation → hands-on → education)
- **Uses:** Visit planning page, booking page, event details
- **Magic:** Answers "What will I do?" → Removes booking hesitation
- **Styles:** timeline, cards, checklist, carousel

**Example:** Visitor on booking page sees "Your visit includes: I. Stand on historic ground. II. Meet settlers. III. Touch the past. IV. Discover evidence." → Confidence → Completes booking

---

## Getting Started

### Step 1: Read the Design Doc

**File:** `/docs/MARKETING-COMPONENTS.md`

- Purpose and marketing angle for each component
- Props interface specifications
- Data source details
- Placement recommendations (where on site)
- Marketing copy variants
- Conversion triggers

**Time:** 15 minutes to understand the system

### Step 2: Implement Components

**File:** `/docs/MARKETING-COMPONENTS-IMPLEMENTATION.md`

- Ready-to-use code templates
- Copy-paste component code
- Usage examples
- Composition patterns for full sections

**Time:** 30 minutes to build one component

### Step 3: Quick Lookup

**File:** `/docs/MARKETING-COMPONENTS-QUICK-REF.md`

- At-a-glance component comparison
- Copy patterns for urgency/FOMO
- Placement strategy matrix
- Quick recipes (common configurations)
- Troubleshooting guide

**Time:** 2-5 minutes for specific answers

---

## Component Architecture

### Data Flow

```
JSON Data Files
    ↓
[Component receives props]
    ↓
[Selects display mode]
    ↓
[Applies copy variants]
    ↓
[Renders with design tokens]
    ↓
Visitor sees high-conversion message
```

### Design Tokens

All colors from `app/globals.css`:

- `--gold-primary` (#c9a227) — Main brand color
- `--gold-hover` (#d4af37) — Interactive states
- `--gold-shimmer` (rgba) — Glows and borders
- `--shadow-gold-lg` — Premium emphasis

No hardcoded colors. No hardcoded shadows. All reusable, maintainable.

### Copy System

All copy from `lib/copy/`:

- `brand.ts` — Core copy (hooks, CTAs, metadata)
- `narratives.ts` — Longer form (brand story, staff scripts)
- Never hardcoded in components
- Easy to update site-wide

---

## Placement Map

### Homepage (Full Funnel)

```
┌─────────────────────────────────────────┐
│  Hero Section                           │
│  ┌─────────────────────────────────────┐│
│  │ SiteStatusBadge (detailed)          ││
│  │ "Open right now! Last tour at 4pm"  ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ NextEventCard (featured)            ││
│  │ "Colonial Independence Day"         ││
│  │ "Only 150 spots remaining"          ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ TestimonialCard (featured) ×3       ││
│  │ Social proof carousel               ││
│  │ "4.7⭐ Google | 4.5⭐ TripAdvisor"  ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### Visit Planning Page

```
┌─────────────────────────────────────────┐
│  Plan Your Visit                        │
│  ┌─────────────────────────────────────┐│
│  │ SiteStatusBadge (standard)          ││
│  │ "Open Wed-Sat, 10am-5pm"            ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ VisitorJourneyProgress (timeline)   ││
│  │ I. Stand on historic ground         ││
│  │ II. Meet the settlers              ││
│  │ III. Touch the past                ││
│  │ IV. Discover the evidence          ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ ReviewCTA (inline)                  ││
│  │ "Help us improve and help others    ││
│  │  discover Rocky Mount"              ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### Events Page

```
Sidebar                    Main Content
┌──────────────┐          ┌──────────────────┐
│ NextEventCard│          │ Events List      │
│ (compact)    │          │                  │
│              │          │ Event Card       │
│              │          │ ┌──────────────┐ │
│              │          │ │ Testimonial  │ │
│              │          │ │ (quote mode) │ │
│              │          │ │              │ │
│              │          │ │ VisitJourney│ │
│              │          │ │ (cards)      │ │
│              │          │ └──────────────┘ │
└──────────────┘          └──────────────────┘
```

### Footer

```
┌────────────────────────────────────────┐
│  TestimonialCard (social_proof mode)   │
│  "Google 4.7⭐ | TripAdvisor 4.5⭐"    │
│                                        │
│  ReviewCTA (badge mode)                │
│  "[Google] [TripAdvisor] [Facebook]"   │
│                                        │
│  NextEventCard (compact mode)          │
│  "Next Event: [Title] [Book]"          │
└────────────────────────────────────────┘
```

---

## Conversion Flow

### Visitor Journey

```
1. Lands on homepage
   ↓
   SiteStatusBadge: "🟢 Open now!"
   → Removes "Are we open?" friction

2. Sees NextEventCard
   → "Colonial Independence Day: In 42 days. Only 150 spots."
   → FOMO triggered
   → Explores more

3. Reads testimonials
   → TestimonialCard: "It was like teleported back in time"
   → Credibility established
   → Confidence increases

4. Wants to learn more
   → Clicks "Plan Your Visit"

5. On visit page, sees VisitorJourneyProgress
   → "Your visit includes 4 unforgettable moments"
   → Booking hesitation decreases
   → Completes booking

6. After visit (email 2-3 days later)
   → ReviewCTA: "Share your experience"
   → Still in gratitude mindset
   → Leaves review
   → Creates social proof for next visitor
```

---

## Key Design Decisions

### 1. Server Components by Default

- All components are server components
- Data fetched once at build/request time
- Only ReviewCTA is client (for event handling)
- Better performance, simpler code

### 2. Copy is Centralized

- All text in `lib/copy/`
- Not scattered in components
- Easy to update site-wide
- A/B testing friendly

### 3. Data is JSON

- Single source of truth
- No database required
- Easy to update in Vercel UI
- Perfect for static site with periodic updates

### 4. Design Tokens

- All colors from CSS variables
- Consistent brand everywhere
- Easy to rebrand if needed
- Better maintainability

### 5. No Hardcoded URLs

- All URLs from `data/integrations.json`
- Platform links stay current
- Bookings routed through FareHarbor
- Analytics can track click-through

---

## Implementation Checklist

Before using any component:

- [ ] Read `/docs/MARKETING-COMPONENTS.md` (design doc)
- [ ] Read `/docs/MARKETING-COMPONENTS-IMPLEMENTATION.md` (code templates)
- [ ] Verify data files exist and valid JSON
- [ ] Verify all utility functions exported properly
- [ ] Test component in isolation
- [ ] Test component at multiple breakpoints (mobile, tablet, desktop)
- [ ] Verify accessibility (WCAG 2.1 AA)
- [ ] Add analytics event tracking
- [ ] Update CLAUDE.md with new component
- [ ] Get design/marketing approval
- [ ] Deploy to staging, test live
- [ ] Monitor analytics in production

---

## Performance & Analytics

### Lightweight

- Server-rendered by default
- Static JSON data
- CSS animations (not JS)
- Image optimization via `next/image`
- No external dependencies beyond Next.js

### Trackable

Every component includes event hooks:

```typescript
event('component_viewed', { variant, mode })
event('cta_clicked', { destination, source })
```

This enables:

- Conversion rate tracking
- Component performance analysis
- A/B testing
- Visitor journey mapping

---

## Maintenance & Updates

### Adding a New Testimonial

1. Edit `data/testimonials.json`
2. Add to appropriate section (featured or byCategory)
3. Include source link if available
4. Component auto-updates

### Adding a New Event

1. Edit `data/events.json`
2. Include required fields (date, title, description, requiresTicket)
3. Set featured: true for promotion
4. NextEventCard automatically includes it

### Changing Status Copy

1. Edit `lib/copy/brand.ts`
2. Update `STATUS_MESSAGES` object
3. All components using that copy auto-update

### Updating Platform URLs

1. Edit `data/integrations.json`
2. Change review platform URLs
3. ReviewCTA automatically links new URLs

---

## Future Enhancements

- **AI testimonial selection:** Automatic rotation based on visitor profile
- **Real-time capacity:** Integration with FareHarbor booking
- **Dynamic countdown:** Server-sent updates for timers
- **Personalization:** Different messages for different visitor types
- **A/B testing variants:** Automatic split testing
- **Multi-language:** i18n support for copy variants

---

## Questions?

### Quick questions?

→ See `/docs/MARKETING-COMPONENTS-QUICK-REF.md`

### Need code?

→ See `/docs/MARKETING-COMPONENTS-IMPLEMENTATION.md`

### Want full details?

→ See `/docs/MARKETING-COMPONENTS.md`

### Specific component issue?

→ Check the troubleshooting section in QUICK-REF.md

---

## Related Documentation

- **Design tokens:** `docs/DESIGN-TOKENS.md`
- **Brand copy guide:** `docs/COPY.md`
- **Data standards:** `docs/DATA-STANDARDS.md`
- **Project overview:** `CLAUDE.md`

---

**Last updated:** January 30, 2026
**Status:** Ready for implementation
**Author:** Claude Opus 4.5
