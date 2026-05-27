# Marketing Components - Visual Diagrams

Flowcharts, data flows, and architecture diagrams for the 5 marketing components.

---

## Component Data Dependencies

```
                            VISITOR BROWSER
                                  │
                ┌─────────────────┼─────────────────┐
                │                 │                 │
         ┌──────▼────────┐ ┌──────▼────────┐ ┌──────▼────────┐
         │   Server Side  │ │  Client Code  │ │   CSS/Design  │
         └────────────────┘ └───────────────┘ └───────────────┘
                │                 │                 │
    ┌───────────┼─────────────────┼─────────────────┼──────────────┐
    │           │                 │                 │              │
┌───▼────┐  ┌───▼─────┐  ┌───────▼─────┐  ┌────────▼────────┐   │
│ Events │  │ Site    │  │ ReviewCTA   │  │ Design Tokens  │   │
│ .json  │  │ Hours   │  │ (uses JS)   │  │ (globals.css)  │   │
└────────┘  │ .ts     │  └─────────────┘  └────────────────┘   │
            │         │                                         │
            │ getSite │  ┌──────────────────┐ ┌──────────────┐ │
            │ Status()│  │ lib/copy/        │ │ Design       │ │
            └─────────┘  │ brand.ts         │ │ tokens       │ │
                         └──────────────────┘ └──────────────┘ │
├─────────────────────────────────────────────────────────────┘
│
├── SiteStatusBadge
│   └─ getSiteStatus() → SiteStatus
│
├── TestimonialCard
│   └─ data/testimonials.json → Testimonial[]
│
├── NextEventCard
│   └─ data/events.json → Event[]
│
├── ReviewCTA
│   └─ data/integrations.json → Platform URLs
│
└── VisitorJourneyProgress
    └─ data/experiences.json → Experience[]
```

---

## Component Decision Tree

```
                    VISITOR LANDS ON SITE
                           │
                           ▼
                ┌────────────────────────┐
                │ Where should I use     │
                │ which component?       │
                └────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
    HERO SECTION      CONTENT AREA        FOOTER
        │                  │                  │
        ├─ Status          ├─ Status         ├─ Status (compact)
        │  Badge           │  Badge          │
        │  (detailed)      │  (standard)     ├─ Testimonial
        │                  │                 │  (social proof)
        ├─ Next Event      ├─ Testimonial    │
        │  (featured)      │  (quote/       ├─ Next Event
        │                  │   featured)     │  (compact)
        ├─ Testimonials    │                 │
        │  (featured ×3)   ├─ Journey        ├─ ReviewCTA
        │                  │  Progress       │  (badge)
        └─ ReviewCTA       │  (timeline/
           (hidden until    │   cards)
            engagement)     │
                           ├─ ReviewCTA
                           │  (inline)
                           │
                           └─ (contextual)
```

---

## Visitor Conversion Funnel

```
        AWARENESS → INTEREST → CONSIDERATION → DECISION → ACTION

        │            │            │              │          │
        │            │            │              │          │
STAGE 1 ▼            │            │              │          │
    [Lands on site]  │            │              │          │
    "Are you open?"  │            │              │          │
    SOLUTION:        │            │              │          │
    SiteStatusBadge  │            │              │          │
    "🟢 Open now!"   │            │              │          │
        │            │            │              │          │
        │      STAGE 2 ▼           │              │          │
        │      [Sees next event]  │              │          │
        │      "What's coming?"   │              │          │
        │      SOLUTION:          │              │          │
        │      NextEventCard      │              │          │
        │      "Colonial Ind. Day"│              │          │
        │      "In 42 days"       │              │          │
        │            │            │              │          │
        │            │      STAGE 3 ▼            │          │
        │            │      [Reads testimonials] │          │
        │            │      "Can I trust you?"  │          │
        │            │      SOLUTION:           │          │
        │            │      TestimonialCard     │          │
        │            │      "4.7⭐ Google"     │          │
        │            │      "Teleported in time"│          │
        │            │            │              │          │
        │            │            │        STAGE 4 ▼        │
        │            │            │        [Planning visit] │
        │            │            │        "What will I do?"│
        │            │            │        SOLUTION:       │
        │            │            │        VisitorJourney  │
        │            │            │        Progress        │
        │            │            │        "4 moments"     │
        │            │            │              │          │
        │            │            │              │    STAGE 5 ▼
        │            │            │              │    [Finished visit]
        │            │            │              │    "Should I review?"
        │            │            │              │    SOLUTION:
        │            │            │              │    ReviewCTA
        │            │            │              │    "Share experience"
        │            │            │              │          │
        └────────────────────────────────────────┴──────────┘
                        CONVERSION COMPLETE
```

---

## SiteStatusBadge State Machine

```
                         GET_CURRENT_DATE
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
    IN_SEASON?         ON_OPEN_DAY?         IN_OPEN_HOURS?
        │                     │                     │
        ├─ NO                ├─ NO                ├─ NO
        │  "Before"          │  "Closed"          │  "Closed"
        │  Show season start  │  Next open day     │  Show regular hours
        │                     │                    │
        ├─ YES               ├─ YES               ├─ YES
        │  Check next        │  Check hours       │  OPEN!
        │                     │                    │
        └──────┬──────────────┼────────────────────┘
               │              │
               ▼              ▼
        CHECK_CLOSURES  CHECK_SPECIAL_HOURS
        (Thanksgiving)  (Haunting/Candlelight)
               │              │
        ┌──────┴──────┬───────┴──────┐
        │             │              │
        ▼             ▼              ▼
    CLOSED      REGULAR_HOURS   SPECIAL_EVENT
    Return      10am-5pm        Show event time
    closure msg Show message    Show prep message
               "Last tour 4pm"  if day vs night
```

---

## TestimonialCard Rendering Logic

```
                TESTIMONIAL DATA
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    MODE SELECTOR
        │
        ├─ featured
        │  ├─ Large card
        │  ├─ Full quote
        │  ├─ Star rating
        │  ├─ Source link
        │  └─ Optional CTA
        │
        ├─ quote
        │  ├─ Smaller card
        │  ├─ Full quote
        │  ├─ Stars + attribution
        │  └─ Minimal styling
        │
        └─ social_proof
           ├─ Compact badge
           ├─ "4.7⭐ Google"
           ├─ Inline display
           └─ Just the stat


    VARIANT SELECTOR
        │
        ├─ light
        │  ├─ White background
        │  ├─ Dark text
        │  └─ Subtle borders
        │
        └─ dark
           ├─ Dark background
           ├─ Light text
           └─ Gold accents
```

---

## NextEventCard Flow

```
    GET_ALL_EVENTS from events.json
            │
            ▼
    FILTER: date > today
            │
            ▼
    SORT: featured first, then chronological
            │
            ▼
    GET_FIRST_UPCOMING_EVENT
            │
            ├─ NULL? → Show fallback message
            │
            └─ EVENT → Process:
                   │
                   ├─ CALCULATE: Days until event
                   │             "In 42 days" vs "Tonight"
                   │
                   ├─ CHECK: Capacity limits?
                   │         "Only X spots" if yes
                   │
                   ├─ GET: Ticket URL from FareHarbor
                   │       (or custom booking URL)
                   │
                   └─ RENDER by mode:
                        ├─ compact: Date + Title + Book
                        ├─ standard: + Description
                        └─ featured: + Countdown + Capacity
```

---

## ReviewCTA Display Logic

```
                    CONTEXT SELECTOR
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
    postVisit         postEvent          footer
        │                  │                  │
        │             Add eventName      Static message
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                    STYLE SELECTOR
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
      card              inline               badge
        │                  │                  │
    Large card      Horizontal buttons   Compact links
    Full copy       Grid on mobile      Minimal text
    All platforms   All platforms      Footer-friendly


                    PLATFORM SELECTION
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
      all           featured (2)         footer (3)
    Google          Google            Google
    TripAdvisor     TripAdvisor        TripAdvisor
    Facebook                          Facebook


                    OPTIONAL TIMING
                           │
        ├─ showDelay: false → Show immediately
        │
        └─ showDelay: true → Wait N ms before showing
                              (let visitor soak in experience first)
```

---

## VisitorJourneyProgress Styles

```
    DATA: experiences.json
    - 4 moments (I-IV)
    - 3 visit includes
    - 6 highlights list


    STYLE SELECTOR
            │
    ┌───────┼───────┬──────────┐
    │       │       │          │
    ▼       ▼       ▼          ▼
timeline  cards  checklist  carousel
    │       │       │          │
    │   Grid of  Vertical  Horizontal
    │   4 cards   list      scrollable
    │   with      (booking  (mobile
    │   icons     page)     email)
    │             with
    │             ✓ marks
    │
Vertical with
connectors
Shows all
moments +
includes +
highlights
(visit page)


    OPTIONAL: TOUR TYPE FILTERING
            │
    ├─ museum: Highlight museum/gallery focus
    │
    ├─ historic-site: Highlight outdoor/buildings
    │
    ├─ twilight: Highlight evening/smaller crowds
    │
    └─ null: No filtering (show all)
```

---

## Data File Relationships

```
┌─────────────────────────────────────────────────┐
│         JSON DATA FILES (Single Source)         │
└────────────────────┬────────────────────────────┘
                     │
        ┌────────────┼────────────┬────────────┐
        │            │            │            │
        ▼            ▼            ▼            ▼
  events.json  experiences.json  testimonials.json  integrations.json
        │            │            │            │
        │            │            │            │
    NextEvent-    VisitorJourney  Testimonial  ReviewCTA
    Card          Progress        Card         │
        │            │            │         (URLs for)
        │            │            │         - Google
        │            │            │         - TripAdvisor
        │            │            │         - Facebook
        │            │            │
        └────────────┼────────────┴────────────┘
                     │
                     ▼
            All Components Use:
              lib/copy/brand.ts
            (Centralized copy text)
                     │
                     ▼
            Design Tokens
            (app/globals.css)
            - Colors
            - Shadows
            - Spacing
```

---

## Placement Strategy Matrix

```
                    HOMEPAGE         VISIT PAGE      EVENTS          EMAIL           FOOTER
                                                    SIDEBAR

SiteStatusBadge     detailed         standard        none            compact         none
(urgency)          (hero bold)      (confirms)                     (confirms)


TestimonialCard    featured ×3       none           quote          featured        social_proof
(trust)            (proof           (filter by     (category       (1-2 cards)     (stat line)
                    carousel)        event)         matched)


NextEventCard      featured         compact         compact        compact         compact
(FOMO)             (countdown)      (sidebar)      (related)       (what's next)   (next up)


ReviewCTA          post-visit       inline         none            post-event      badge
(asks)             (hidden until    (post-click)                   (follow-up)     (passive)
                    engagement)


VisitorJourney     none             timeline       cards           none            none
Progress           (value on        (journey)      (per event)
(value)            visit page)
```

---

## Analytics Event Flow

```
            VISITOR INTERACTION
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    VIEW         HOVER        CLICK
        │            │            │
        │            │      ┌─────┴──────┐
        │            │      │            │
        │            │      ▼            ▼
        │            │  Click on   Click on
        │            │  "Learn"    "Book"
        │            │  button     button
        │            │      │            │
        └────────────┴──────┴───┬────────┴───┐
                                │            │
                                ▼            ▼
                        event('component_   event('booking_
                        _viewed',          started',
                        { component,       { component,
                          variant,           event_id,
                          mode })            booking_url })

These events feed into:
- Google Analytics (tracking)
- Conversion Rate Optimization (CRO)
- A/B Testing (variants)
- Visitor Journey mapping
```

---

## Copy Variant Selection Logic

```
                STATUS CHECK
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    OPEN         CLOSED        SPECIAL
    TODAY        SOON         EVENT
        │            │          PREP
        │            │            │
        │ Days till? │ Hours?     │
        │ <24        │ <12        │ Time?
        │            │            │
        ├─ <1 day    ├─ <2 days  ├─ Evening
        │ "Tonight"  │ "Tomorrow"│ "Join us
        │            │ "Opens"   │  tonight"
        │ "Last tour"│ "Set     │
        │ at 4pm"    │ reminder" │ "Spine-
        │            │           │ tingling"
        ├─ 1-7 days  ├─ 2-7 days│
        │ "This      │ "Next    │
        │ weekend"   │ [DAY]"   │
        │            │           │
        └─ 7+ days   └─ 7+ days  │
          "In X days"  "Season   │
                       opens"    │
                                 │
                        (show special
                         event copy)
```

---

## Mobile Responsive Breakpoints

```
                COMPONENT ADAPTS

<640px             640-1024px           >1024px
(Mobile)           (Tablet)             (Desktop)

SiteStatusBadge:   SiteStatusBadge:     SiteStatusBadge:
- Stacked          - Side-by-side       - Horizontal
- Full width       - 70% width          - Fixed width

TestimonialCard:   TestimonialCard:     TestimonialCard:
- 1 column         - 2 columns          - 3 columns
- Full text        - Abbreviated        - Full featured

NextEventCard:     NextEventCard:       NextEventCard:
- Stacked CTAs     - Inline CTAs        - Inline CTAs
- Compact date     - Full date          - Full date/time

ReviewCTA:         ReviewCTA:           ReviewCTA:
- Stacked buttons  - Grid 2-3           - Horizontal grid
- Small padding    - Medium padding     - Large padding

VisitorJourney:    VisitorJourney:      VisitorJourney:
- Vertical (no     - Vertical (no       - Timeline with
  connectors)      connectors)          connectors
```

---

## Accessibility Audit Checklist

```
EVERY COMPONENT MUST PASS:

✓ Color Contrast
  └─ 4.5:1 for text
  └─ 3:1 for large text
  └─ Test with Chrome DevTools

✓ Keyboard Navigation
  └─ Tab order logical
  └─ Focus visible
  └─ No tabindex > 0

✓ Screen Reader
  └─ Semantic HTML
  └─ alt text for images
  └─ ARIA labels for icons

✓ Labels & Descriptions
  └─ Form inputs have labels
  └─ Buttons have text
  └─ Links have descriptive text

✓ Timing
  └─ No auto-play with sound
  └─ Auto-advance: user can pause
  └─ Countdown: announced

✓ Responsive
  └─ 320px width minimum
  └─ Zoom 200% works
  └─ Touch targets 44×44px

Test with:
- WAVE (browser extension)
- axe DevTools
- Color Contrast Analyzer
- Screen reader (VoiceOver, NVDA)
```

---

**Last updated:** January 30, 2026
