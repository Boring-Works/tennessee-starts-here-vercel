# Marketing-Focused UX Components

Standardized components that transform Rocky Mount's JSON data into high-conversion visitor experiences. These components drive urgency, social proof, value clarity, and action.

**Design Philosophy:** Every component is a funnel stage. Show status → Build trust → Create FOMO → Close the ask.

---

## Component 1: SiteStatusBadge

**Purpose:** Real-time open/closed indicator that creates urgency and anticipation
**Marketing Angle:** "Open now!" (drive immediate visit) OR "Opens tomorrow" (build anticipation)
**Placement:** Header, hero section, visit CTA section

### Props Interface

```typescript
interface SiteStatusBadgeProps {
  /**
   * When to show detailed info (full message vs compact badge)
   * compact: Icon + "Open"/"Closed" only
   * standard: Icon + message + next open time (if closed)
   * detailed: Full prose with marketing angle
   */
  mode?: 'compact' | 'standard' | 'detailed'

  /**
   * Visual emphasis level for conversion
   * urgent: Glowing red/gold for "Open now!" moments
   * normal: Subtle, informational
   */
  emphasis?: 'urgent' | 'normal'

  /**
   * Optional custom date/time to check (for preview/testing)
   */
  checkDate?: Date
}
```

### Data Source

```typescript
// Uses getSiteStatus() from lib/siteHours.ts
// Returns: SiteStatus {
//   isOpen: boolean
//   reason: string
//   message: string
//   nextOpen?: Date
//   specialHours?: SpecialHours
// }
```

### Placement Recommendations

1. **Header** (compact mode)
   - Always-visible badge in top-right
   - "🟢 Open now" or "🔴 Closed | Opens Wed 10am"
   - Tappable → scroll to hours section

2. **Hero Section** (detailed mode)
   - Large, prominent placement above fold
   - Full marketing message with urgency
   - "Step inside now" vs "We open Wednesday morning"

3. **Plan Your Visit CTA** (standard mode)
   - Shows real-time status before booking
   - Creates friction-free decision point

4. **Events Calendar** (compact mode on each event card)
   - Confirms the site will be open that day
   - Reduces "is it open?" friction

### Marketing Copy Variants

```typescript
// OPEN NOW - DRIVE VISIT
urgent_open: "🟢 Open right now! Last tour at 4pm. Step into history.",
urgent_open_special: "🟢 Open for [EVENT_NAME]! 6pm-9pm tonight.",

// OPENING SOON - BUILD ANTICIPATION
anticipation_today: "Opens at 10am today. We'll be waiting.",
anticipation_soon: "Opens [DAY] at 10am. Mark your calendar.",

// CLOSED - NEXT VISIT MOMENT
closed_info: "Currently closed. We open Wednesday-Saturday, 10am-5pm.",
closed_special: "Preparing for [EVENT] tonight. Join us at [TIME].",
closed_season: "Season ends mid-December. Next visit: March 4, 2026.",

// SPECIAL EVENTS - PREP MESSAGE
prepping_haunting: "Preparing for Haunting on the Mount tonight. Come experience spine-tingling history at 6pm.",
prepping_candlelight: "Preparing for Candlelight Christmas tonight. Candlelit grounds open at 5pm.",
```

### Conversion Trigger

- **Compact:** Visitor sees "Open" → Confidence to book
- **Standard:** Visitor sees next open time → Reduces hesitation
- **Detailed:** Visitor reads urgency copy → Books immediately or sets reminder

### Visual Examples

**Compact (Header)**

```
🟢 Open now (10am-5pm)
```

**Standard (Visit Page)**

```
┌─────────────────────────────────────────┐
│  🟢 OPEN NOW!                           │
│                                         │
│  Step inside. Last tour at 4pm.        │
│  Open Wed-Sat through mid-December.     │
│                                         │
│  [Plan Your Visit] [Learn About Hours]  │
└─────────────────────────────────────────┘
```

**Detailed (Hero Section - Special Event)**

```
╔═════════════════════════════════════════╗
║  🔴 PREPARING FOR TONIGHT               ║
║                                         ║
║  As we set up for Haunting on the Mount║
║  the site is closed during the day.    ║
║                                         ║
║  But join us tonight at 6pm for a      ║
║  spine-tingling candlelit tour through ║
║  the grounds—stories they only told    ║
║  after dark.                           ║
║                                         ║
║  [Reserve Your Spot Now] [Learn More]  ║
╚═════════════════════════════════════════╝
```

---

## Component 2: TestimonialCard

**Purpose:** Display verified social proof to build trust and credibility
**Marketing Angle:** Real visitors ✓ Real experiences ✓ Real impact
**Placement:** Homepage proof section, event pages, visit overview

### Props Interface

```typescript
interface TestimonialCardProps {
  /**
   * The testimonial object from data/testimonials.json
   */
  testimonial: {
    id: string
    quote: string
    attribution: string
    source: 'TripAdvisor' | 'Google Reviews' | 'Facebook'
    sourceUrl?: string
    rating: number
    tags: string[]
  }

  /**
   * Display mode affects styling and detail level
   * featured: Large card, full quote, star rating, CTA to leave review
   * quote: Just the quote + attribution + stars
   * social_proof: Compact, includes "4.7 ⭐ on Google"
   */
  mode?: 'featured' | 'quote' | 'social_proof'

  /**
   * Visual style for context
   * light: On light backgrounds
   * dark: On dark backgrounds (for hero sections)
   */
  variant?: 'light' | 'dark'

  /**
   * Optional: Show "Share your experience" CTA
   */
  showReviewCTA?: boolean
}
```

### Data Source

```typescript
// Uses data/testimonials.json
// Structure:
{
  "featured": [
    {
      "id": "ta-teleported",
      "quote": "It was like you got teleported back in time...",
      "attribution": "Rocky Mount visitor",
      "source": "TripAdvisor",
      "sourceUrl": "https://...",
      "rating": 5,
      "tags": ["authenticity", "immersion", "history"]
    }
  ],
  "byCategory": {
    "authenticity": [...],
    "family": [...]
  }
}
```

### Placement Recommendations

1. **Homepage - ConsolidatedProof Section** (featured mode, light)
   - 3-card carousel showing best testimonials
   - Large, prominent placement after hero
   - "See why 1000s of visitors give us 4.7 stars"

2. **Event Pages** (quote mode, dark)
   - Category-filtered testimonials
   - Event attendee quotes: "The July 4th celebration was incredible..."
   - Family quotes for family events

3. **Visit Planning Page** (social_proof mode)
   - Compact stat display: "Google: 4.7⭐ (87 reviews)"
   - Link to review platforms
   - "Read all reviews on..."

4. **Event Calendar** (social_proof mode, compact)
   - Below event details
   - "Visitors loved this event: 4.9⭐"

5. **Footer** (social_proof + CTA)
   - "Help others discover Rocky Mount"
   - Links to all review platforms

### Marketing Copy Variants

```typescript
// CAROUSEL INTRO TEXT
proof_intro: "Why visitors return again and again",
proof_stat: "4.7 stars. 87 reviews. Real voices.",
proof_authentic: "See what history lovers are saying",

// CTA COPY (show review CTA)
review_cta_default: "Share your experience",
review_cta_postVisit: "Had a great visit? Help others discover Rocky Mount",
review_cta_event: "Attended [EVENT_NAME]? Leave a review",

// BADGE COPY (for social proof mode)
badge_google: "Google Reviews",
badge_tripadvisor: "TripAdvisor",
badge_facebook: "Facebook",
badge_rating: "⭐⭐⭐⭐⭐",
```

### Conversion Trigger

- **Featured:** Visitor reads authentic praise → Confidence to book
- **Quote:** Event visitor recognizes themselves → Books that event
- **Social Proof:** Quick stat confirms credibility → Removes last objection

### Visual Examples

**Featured (Homepage)**

```
┌──────────────────────────────────────┐
│  ⭐⭐⭐⭐⭐                          │
│                                      │
│  "It was like you got teleported    │
│   back in time. The way the         │
│   buildings are furnished is        │
│   incredibly convincing."           │
│                                      │
│  — Rocky Mount visitor              │
│     TripAdvisor                      │
│                                      │
│  [Read more reviews on TripAdvisor] │
└──────────────────────────────────────┘
```

**Social Proof (Footer)**

```
Google Reviews: 4.7⭐ (87)  |  TripAdvisor: 4.5⭐ (78)  |  Facebook: 5⭐ (42)
[Leave a review]
```

**Dark Mode (Event Page)**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"The July 4th celebration was incredible.
Musket demonstrations, period music, and
the best view of fireworks in the region."

— Independence Day attendee  ⭐⭐⭐⭐⭐
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Component 3: NextEventCard

**Purpose:** Show upcoming event with FOMO urgency and easy booking
**Marketing Angle:** "Don't miss..." + Countdown + Limited spots (if applicable)
**Placement:** Homepage hero, sidebar, calendar view, email

### Props Interface

```typescript
interface NextEventCardProps {
  /**
   * Event object from data/events.json (or null for no upcoming event)
   */
  event: Event | null

  /**
   * Display density
   * compact: Date + Title + [Book button]
   * standard: Date + Title + Description excerpt + [Book button]
   * featured: Full card with countdown timer, capacity, highlights
   */
  mode?: 'compact' | 'standard' | 'featured'

  /**
   * Show countdown timer to event start
   * Shows "X days away" or "This weekend" or "Tonight at 6pm"
   */
  showCountdown?: boolean

  /**
   * Highlight if event has limited capacity
   * Shows "Only 10 spots" or "Selling fast"
   */
  showCapacity?: boolean

  /**
   * If event requiresTicket, show booking CTAs
   */
  showBooking?: boolean

  /**
   * Fallback text if no upcoming event
   * "Check back soon for spring events" etc
   */
  noEventFallback?: string
}
```

### Data Source

```typescript
// Uses data/events.json
// Structure:
{
  "events": [
    {
      "id": "road-to-250",
      "title": "Road to 250 Season Opening",
      "date": "2026-03-04",
      "endDate": null,
      "time": "10:00 AM",
      "type": "new",
      "category": "signature",
      "description": "The gates open on Tennessee's most historic year...",
      "ticketUrl": null,
      "requiresTicket": false,
      "featured": true,
      "pricing": {...},
      "capacity": null
    }
  ]
}
```

### Placement Recommendations

1. **Homepage Hero (featured mode)**
   - Large eye-catching card right after status badge
   - Countdown timer
   - Full description
   - Immediate booking CTA

2. **Homepage Sidebar (compact mode)**
   - "Next Event" quick reference
   - Click → event detail page

3. **Events Calendar (standard mode)**
   - Above calendar
   - "Coming up this weekend"

4. **Email Campaigns (compact mode)**
   - "What's happening this weekend?"
   - Optimized for mobile width

5. **Event Detail Pages (featured mode)**
   - When viewing a non-upcoming event
   - "Next similar event: [Event] on [Date]"

### Marketing Copy Variants

```typescript
// FOMO COPY
fomo_soon: "This weekend. Don't miss it.",
fomo_today: "Tonight. Doors open at [TIME].",
fomo_days: "In [X] days. Spots filling fast.",
fomo_capacity: "Only [X] spots left.",
fomo_selling_fast: "Selling out fast.",

// URGENCY FOR SIGNATURE EVENTS
urgency_first250: "Be among the First 250 Tennesseans. Enroll by June 1st.",
urgency_america250: "America turns 250. You're standing where Tennessee began.",
urgency_reunion: "Your family built Tennessee. Come home for our first families reunion.",

// SEASONAL/CONTEXTUAL
seasonal_spring: "Spring brings new workshops and hands-on learning.",
seasonal_summer: "Summer camps start June 15. Spots filling fast.",
seasonal_fall: "October brings Harvest Fest and Haunting.",
seasonal_holiday: "Experience Frontier Christmas and Candlelight Christmas.",

// TIME-SPECIFIC
time_tonight: "Tonight at [TIME]. Experience [EVENT_NAME].",
time_this_weekend: "This [DAY] at [TIME].",
time_next_week: "Next week. Spaces available.",
time_countdown: "[X] days away.",
```

### Conversion Trigger

- **Compact:** "What's next?" answered → Bookmark it
- **Standard:** Event details intrigue → Visit event page
- **Featured:** Full immersion + countdown + booking → Book immediately

### Visual Examples

**Compact (Sidebar)**

```
┌──────────────────────────┐
│ NEXT EVENT               │
│ Road to 250              │
│ March 4 at 10am         │
│                         │
│ [Learn More] [Book Now] │
└──────────────────────────┘
```

**Standard (Calendar)**

```
┌────────────────────────────────────────┐
│ THIS WEEKEND                          │
│ ★ Woolly Days & Colonial Gardening   │
│ April 25-26 • 10am-4pm               │
│                                      │
│ Watch fleece become thread on a      │
│ spinning wheel. Dig your hands into  │
│ soil where heirloom seeds take root. │
│                                      │
│ [Book Now] [Learn More]             │
└────────────────────────────────────────┘
```

**Featured (Homepage)**

```
╔════════════════════════════════════════╗
║  ⏰ IN 42 DAYS                         ║
║                                        ║
║  ★ Colonial Independence Day           ║
║  July 4, 2026 • 10am-4pm             ║
║                                        ║
║  America turns 250—and you're standing ║
║  where Tennessee began. The First 250  ║
║  ceremony reads each enrolled name     ║
║  aloud. Muskets fire. The flag rises.  ║
║  This is the day. This is the place.  ║
║                                        ║
║  The first 250 ceremony reads each     ║
║  enrolled name aloud.                 ║
║                                        ║
║  📍 Only [150] spots remaining        ║
║                                        ║
║  [Reserve Your Spot] [Learn More]    ║
╚════════════════════════════════════════╝
```

---

## Component 4: ReviewCTA

**Purpose:** Encourage visitors to leave reviews after experiencing Rocky Mount
**Marketing Angle:** "Help others discover" + Easy multi-platform linking
**Placement:** Post-visit email, thank-you page, event follow-up, footer

### Props Interface

```typescript
interface ReviewCTAProps {
  /**
   * Context for why we're asking for a review
   * postVisit: "Thank you for visiting"
   * postEvent: "Thank you for attending [EVENT_NAME]"
   * footer: Quiet background link
   * email: Standalone in email campaign
   */
  context?: 'postVisit' | 'postEvent' | 'footer' | 'email'

  /**
   * Optional event name if context is 'postEvent'
   */
  eventName?: string

  /**
   * Which review platforms to show
   * all: Google, TripAdvisor, Facebook
   * featured: Google + TripAdvisor only
   * footer: Horizontal list
   */
  platforms?: 'all' | 'featured' | 'footer'

  /**
   * Display style
   * card: Full card with description
   * inline: Horizontal button group
   * badge: Compact inline badges
   */
  style?: 'card' | 'inline' | 'badge'

  /**
   * Show this after visit complete (GA event triggered)
   * Prevent review fatigue
   */
  showDelay?: boolean
  showDelayMs?: number
}
```

### Data Source

```typescript
// Uses data/integrations.json - reviews section
// And lib/copy/brand.ts for copy
{
  "platforms": {
    "google": {
      "reviewUrl": "https://share.google/pH3cU63TP2bLc9SMV"
    },
    "tripadvisor": {
      "url": "https://www.tripadvisor.com/Attraction_Review-..."
    },
    "facebook": {
      "reviewUrl": "https://www.facebook.com/rockymountmuseum/reviews"
    }
  }
}
```

### Placement Recommendations

1. **Post-Visit Email** (card style, postVisit context)
   - Send 2-3 days after visit
   - "Your experience helps us improve"
   - Three platform buttons

2. **Thank-You Page** (postEvent context)
   - "Thank you for attending [EVENT_NAME]!"
   - Three platforms
   - "Share your experience"

3. **Event Follow-Up Email** (inline style)
   - "How was your visit? Tell us on..."
   - Horizontal button layout

4. **Footer** (footer style, badge variant)
   - Always available
   - Quiet, unobtrusive
   - "Leave a review"

5. **Booking Confirmation** (badge style)
   - "After your visit, help others discover us"
   - Links at bottom

### Marketing Copy Variants

```typescript
// POSTVISIT GRATITUDE
postvisit_thank: "Your visit meant the world to us.",
postvisit_share: "Help others discover what you found here.",
postvisit_help: "Your voice helps us preserve Tennessee history.",

// POSTEVENT GRATITUDE
postevent_thank: "Thank you for attending [EVENT_NAME]!",
postevent_share: "Your experience matters. Share it on...",
postevent_memory: "Help others experience the magic you just felt.",

// CTA VARIATIONS
cta_platform: "Review on [PLATFORM]",
cta_leave: "Leave a review",
cta_share: "Share your experience",
cta_tell: "Tell other travelers what you loved",
cta_help: "Help us serve you better",

// RATIONALE (why we ask)
rationale_discovery: "Real reviews help visitors like you discover Rocky Mount.",
rationale_improve: "Your feedback helps us improve the experience for everyone.",
rationale_authentic: "Only verified reviews. Your real experience matters.",

// PLATFORM-SPECIFIC
platform_google: "Google is trusted by millions. Share here.",
platform_tripadvisor: "TripAdvisor reaches travelers everywhere.",
platform_facebook: "Tell your Facebook friends.",
```

### Conversion Trigger

- **Card (Email):** Visitor in post-visit gratitude mindset → Leaves review
- **Inline (Thank-you page):** Fresh event experience → Warm review likely
- **Footer:** Ongoing reminder → Long-tail review generation

### Visual Examples

**Card (Post-Visit Email)**

```
╔════════════════════════════════════════╗
║  We hope you enjoyed your visit!      ║
║                                        ║
║  Your experience helps us improve &   ║
║  helps other history lovers discover  ║
║  Rocky Mount.                         ║
║                                        ║
║  [Google Reviews]  [TripAdvisor]      ║
║  [Facebook]                          ║
║                                        ║
║  Thank you for supporting Rocky Mount ║
╚════════════════════════════════════════╝
```

**Inline (Thank-You Page)**

```
Share Your Experience

[🔵 Google Review]  [🟦 TripAdvisor]  [🔵 Facebook]
```

**Badge (Footer)**

```
Help others discover Rocky Mount.
[Google] • [TripAdvisor] • [Facebook]
```

---

## Component 5: VisitorJourneyProgress

**Purpose:** Show visitor what's included in a visit—the value proposition
**Marketing Angle:** "Your visit includes 4 unforgettable moments"
**Placement:** Visit planning page, booking page, event details

### Props Interface

```typescript
interface VisitorJourneyProgressProps {
  /**
   * Shows all experience moments (I-IV)
   * Optionally highlight specific ones relevant to tour type
   */
  highlightCategories?: ('immersion' | 'interpretation' | 'hands-on' | 'education')[]

  /**
   * Display style affects visual hierarchy
   * timeline: Vertical timeline with icons
   * cards: Card grid
   * checklist: Checkmark list (what's included)
   * carousel: Horizontal scrollable (mobile)
   */
  style?: 'timeline' | 'cards' | 'checklist' | 'carousel'

  /**
   * Which tour type is being presented
   * Filters experience moments and visit includes
   */
  tourType?: 'museum' | 'historic-site' | 'twilight' | null

  /**
   * Show the "visitIncludes" section (Guided Tour, Historic Buildings, Museum)
   */
  showIncludes?: boolean

  /**
   * Show highlights list at bottom
   */
  showHighlights?: boolean
}
```

### Data Source

```typescript
// Uses data/experiences.json
{
  "experienceMoments": [
    {
      "numeral": "I",
      "title": "Stand on Historic Ground",
      "description": "Walk the same grounds where Governor Blount governed...",
      "icon": "footprints",
      "category": "immersion"
    },
    // I-IV total
  ],
  "visitIncludes": [
    {
      "icon": "theater",
      "title": "Guided Tour",
      "description": "Expert-led tour with costumed interpreters"
    },
    // 3 total
  ],
  "highlights": [
    "Original 1770s log buildings",
    "Costumed historical interpreters",
    // ...
  ]
}
```

### Placement Recommendations

1. **Visit Planning Page** (timeline + includes + highlights)
   - Full visual journey of what visitor will experience
   - Builds anticipation
   - Answers "What will I do?" question

2. **Booking Page** (checklist style)
   - Right sidebar
   - Final confirmation: "Your visit includes..."
   - Reduces booking hesitation

3. **Event Detail Pages** (cards style)
   - "Beyond the scheduled program, you'll also..."
   - Adds perceived value

4. **Email Campaign** (carousel on mobile)
   - "A day at Rocky Mount includes..."
   - Sets expectations

5. **Tour Type Comparison** (side-by-side)
   - Museum Tour vs Historic Site vs Twilight
   - Visual difference in experience types

### Marketing Copy Variants

```typescript
// JOURNEY INTRO
journey_intro: "Your visit unfolds in four unforgettable moments",
journey_title: "What You'll Experience",
journey_discover: "Discover what makes Rocky Mount different",

// MOMENT CALLOUTS
moment_immersion: "Step into an authentic 1770s homestead",
moment_interpretation: "Costumed interpreters bring family stories to life",
moment_handson: "Your hands shape history",
moment_education: "Primary sources reveal the truth",

// VISIT INCLUDES
includes_title: "Included in Every Visit",
includes_intro: "Your ticket includes all of this",
includes_guided: "Expert-led tour with costumed interpreters",
includes_buildings: "Access to all original 18th-century log structures",
includes_museum: "Museum exhibits and curated heritage gift shop",

// HIGHLIGHTS
highlights_intro: "You'll see",
highlights_authentic: "Original 1770s log buildings",
highlights_interpreters: "Costumed historical interpreters",
highlights_demonstrations: "Hands-on craft demonstrations",

// TOUR TYPE DIFFERENTIATION
tour_museum: "Explore artifacts and exhibits indoors",
tour_historic: "Guided walk through the grounds with interpreters",
tour_twilight: "Evening candlelit tour in cooler temps, smaller crowds",

// VALUE PROPOSITION
value_promise: "A day at Rocky Mount rewires how you understand history",
value_authentic: "Authenticity. Immersion. Impact.",
value_kids: "Kids remember this. Adults do too.",
```

### Conversion Trigger

- **Timeline (Visit Page):** Visitor imagines their day → Books visit
- **Checklist (Booking):** Visitor confirms value → Completes purchase
- **Highlights:** Visitor realizes breadth of experience → Extends visit time
- **Comparison:** Visitor understands tour differences → Selects right option

### Visual Examples

**Timeline (Visit Page)**

```
YOUR VISIT UNFOLDS IN FOUR MOMENTS

I  Stand on Historic Ground
   🚶 Walk the same grounds where Governor Blount
      governed and shaped Tennessee's future
                    ↓
II  Meet the Settlers
   👥 Costumed interpreters bring the Cobb family
      and their world to life
                    ↓
III  Touch the Past
   🔨 Experience authentic 18th-century crafts
      using period tools and techniques
                    ↓
IV  Discover the Evidence
   📜 Examine original documents, letters,
      and artifacts in our museum

EVERY VISIT INCLUDES
✓ Guided tour with costumed interpreters
✓ Access to all original log structures
✓ Museum exhibits & heritage gift shop
```

**Checklist (Booking Sidebar)**

```
INCLUDED IN YOUR VISIT

✓ Guided tour
✓ Historic buildings
✓ Museum & exhibits
✓ Hands-on activities
✓ Costumed interpreters
✓ Blue Ridge views

[You're About to Experience History]
```

**Cards (Event Page)**

```
┌─────────────────────┐
│ BEYOND THE PROGRAM  │
│                     │
│ ★ Stand on the      │
│   ground where a    │
│   nation began      │
│                     │
│ ★ Hear stories the  │
│   textbooks left    │
│   out               │
│                     │
│ ★ Touch 250-year-   │
│   old history       │
└─────────────────────┘
```

---

## Implementation Guidelines

### 1. Always Use Real Data

```typescript
// DO: Always pull from data files
import experiences from '@/data/experiences.json'
import testimonials from '@/data/testimonials.json'
import events from '@/data/events.json'
import integrations from '@/data/integrations.json'

// DON'T: Never hardcode testimonials or events
const fakeTestimonial = { quote: '...' } // ❌ WRONG
```

### 2. Create Client Components Only When Necessary

```typescript
// DO: Server component by default
export function SiteStatusBadge({ mode = 'compact' }: SiteStatusBadgeProps) {
  const status = getSiteStatus() // Server-side call
  return <div>{status.message}</div>
}

// If you need state/events, then use 'use client'
'use client'
export function BookingFlow() {
  const [step, setStep] = useState(0)
  // ...
}
```

### 3. Props Interface Always at Top

```typescript
interface ComponentProps {
  /** JSDoc description of each prop */
  prop1: string
  /** @default 'value' */
  prop2?: string
}

export function Component({ prop1, prop2 = 'value' }: ComponentProps) {
  // ...
}
```

### 4. Use Design Tokens for Colors

```typescript
// DO: Use existing CSS variables from globals.css
className="bg-white border border-accent/30 shadow-lg"
style={{
  boxShadow: 'var(--shadow-gold-lg)',
  borderColor: 'var(--gold-primary)'
}}

// DON'T: Create new hardcoded colors
style={{ color: '#c9a227' }} // ❌ Use var(--gold-primary) instead
```

### 5. Copy Always from lib/copy/

```typescript
// DO: Import from centralized copy system
import { HOOKS, BUTTONS } from '@/lib/copy'

// Then use in components
<p>{HOOKS.visitIncludes}</p>

// DON'T: Hardcode copy in components
<p>Your visit includes...</p> // ❌ Use lib/copy instead
```

### 6. Link Review URLs Properly

```typescript
// DO: Use review URLs from data
import integrations from '@/data/integrations.json'

const googleUrl = integrations.integrations.reviews.platforms.google.reviewUrl
<a href={googleUrl}>Leave a Google Review</a>

// DON'T: Hardcode URLs
<a href="https://share.google/...">Review</a> // ❌ Hard to maintain
```

### 7. Testing & Preview

When building components, test these scenarios:

- **SiteStatusBadge:**
  - Currently open (10am) → shows "Open now"
  - Currently closed (7pm) → shows next open
  - During special event (5pm) → shows special hours
  - Off-season → shows next season start

- **TestimonialCard:**
  - All 3 star ratings (5, 4.5, 3+)
  - All 3 sources (Google, TripAdvisor, Facebook)
  - Long quotes vs short quotes
  - Featured events vs general testimonials

- **NextEventCard:**
  - Events with capacity limits → show "Only X spots"
  - Events today, this week, next month
  - Events with/without tickets
  - No upcoming events → show fallback

- **ReviewCTA:**
  - Post-visit context
  - Post-event context
  - All 3 platform URLs valid
  - Mobile layout compression

- **VisitorJourneyProgress:**
  - All 4 experience moments
  - Tour type filtering
  - With/without highlights
  - Mobile carousel smooth scroll

---

## Accessibility Requirements

All components must:

1. **Pass WCAG 2.1 AA**
   - Sufficient color contrast (4.5:1 for text)
   - Keyboard navigable (no tabindex > 0)
   - Focus visible on all interactive elements

2. **Use Semantic HTML**

   ```typescript
   // DO
   <blockquote>Quote</blockquote>
   <time dateTime="2026-03-04">March 4</time>
   <cite>Attribution</cite>

   // DON'T
   <div>Quote</div>
   <div>2026-03-04</div>
   ```

3. **Provide alt text for icons**

   ```typescript
   <svg aria-label="Open now indicator">
     {/* or */}
     <span aria-hidden="true">🟢</span>
   </svg>
   ```

4. **Announce dynamic updates**
   ```typescript
   <div role="status" aria-live="polite">
     {status.message}
   </div>
   ```

---

## Performance Considerations

- **Image optimization:** Use `next/image` for all images
- **Data loading:** Fetch from JSON files (all data is static)
- **Animation:** Use CSS animations for performance, not JS
- **Lazy loading:** Use React lazy/Suspense for below-fold components

---

## Analytics Events to Track

Track these conversion moments:

```typescript
// SiteStatusBadge
event('status_badge_viewed', { mode, status: isOpen })
event('status_badge_clicked', { mode, destination })

// TestimonialCard
event('testimonial_viewed', { id, source })
event('testimonial_review_link_clicked', { source })

// NextEventCard
event('next_event_viewed', { eventId, daysAway })
event('event_booking_started', { eventId })

// ReviewCTA
event('review_cta_viewed', { context, platform })
event('review_link_clicked', { platform })

// VisitorJourneyProgress
event('visit_journey_viewed', { style, tourType })
```

---

## Component Checklist

Before shipping a component:

- [ ] Props interface documented with JSDoc
- [ ] Uses real data from JSON files
- [ ] All copy from lib/copy/
- [ ] Design tokens used (no hardcoded colors)
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Mobile responsive
- [ ] Tested with real data variations
- [ ] Analytics events tracked
- [ ] Updated CLAUDE.md if new component
- [ ] PR description includes use cases and placements

---

## Quick Reference: Which Component Where?

| Page          | Component              | Mode       |
| ------------- | ---------------------- | ---------- |
| Homepage      | SiteStatusBadge        | detailed   |
| Homepage      | NextEventCard          | featured   |
| Homepage      | TestimonialCard        | featured×3 |
| Visit Page    | SiteStatusBadge        | standard   |
| Visit Page    | VisitorJourneyProgress | timeline   |
| Events Page   | NextEventCard          | compact    |
| Event Detail  | TestimonialCard        | quote      |
| Event Detail  | VisitorJourneyProgress | cards      |
| Booking Page  | VisitorJourneyProgress | checklist  |
| Footer        | ReviewCTA              | footer     |
| Email (Post)  | ReviewCTA              | card       |
| Email (Event) | NextEventCard          | compact    |

---

## Future Enhancements

- **Dynamic countdown timer** (NextEventCard)
- **Real-time capacity tracking** (NextEventCard)
- **AI-powered testimonial selection** (TestimonialCard)
- **Personalized journey based on visitor type** (VisitorJourneyProgress)
- **A/B testing variants of copy** (All components)
- **Integration with booking confirmation** (ReviewCTA)
