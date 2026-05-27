# Almanac Marketing Integration Strategy

**Mission:** Transform the 1775 Almanac from a utility feature into a daily marketing touchpoint that drives visits, event bookings, and engagement.

**Concept:** Weather.com has ads because everyone checks weather daily. Rocky Mount's Almanac should have "native content" that sells tours and events—not intrusive banners, but contextual, valuable recommendations.

---

## Core Philosophy

The Almanac serves 2-3 types of daily visitors:

1. **Farmers/Gardeners** — Check weather for planting decisions (primary use)
2. **Outdoor Enthusiasts** — Check conditions for activities
3. **Tourists/Event Planners** — Incidental traffic from search/direct

**Opportunity:** Every daily visit is a chance to convert Type 3 → Type 1 (visitor).

**Key Insight:** People visiting the Almanac ARE making outdoor decisions. They're thinking about whether TODAY is a good day to do something outside. That's the exact moment to suggest "Come to Rocky Mount—the weather is perfect for touring."

---

## Design 1: Smart Weather → Tour Conversion

### Concept: "Perfect Touring Weather" Card

Display a contextual card when weather conditions match tour activities.

**Location:** Mobile: Below `NextChangeHero` / Desktop: ROW 2 (Planning section)

**Trigger Rules:**

| Condition                         | Copy Hook                                                                  | Event Link                | Priority |
| --------------------------------- | -------------------------------------------------------------------------- | ------------------------- | -------- |
| 65-75°F, sunny, <10mph wind       | "Perfect touring weather today. See why locals love Rocky Mount."          | /visit (general)          | High     |
| 65-75°F, humidity <60%            | "Ideal day for exploring the grounds at Rocky Mount."                      | /visit                    | High     |
| <20% chance rain, clear skies     | "Clear skies for wandering where Tennessee began."                         | /almanac?cta=visit        | High     |
| 50-65°F, partly cloudy            | "Great day for a guided tour."                                             | /events                   | Medium   |
| 75-85°F, low wind                 | "Perfect conditions for a heritage craft workshop."                        | /events?category=workshop | Medium   |
| Frost risk (temp ≤36°F overnight) | "Frost protection tip: Tour during daylight, then return home to prepare." | /events                   | Low      |

**Component Design (EventWeatherCard.tsx):**

```tsx
interface EventWeatherCard {
  weatherCondition: string // "Perfect touring weather"
  reason: string // "65°F, sunny, light breeze"
  eventHook: string // "What to do today"
  cta: {
    text: string // "Browse Events"
    href: string // "/events?weather=perfect"
  }
  variant: 'optimal' | 'good' | 'fair' // Visual styling
}
```

**Visual Design:**

- **Optimal (green accent):** Sunny, 65-75°F, <10mph wind
- **Good (blue accent):** Clear, 50-65°F or 75-85°F
- **Fair (amber accent):** Cloudy, rain possible, cooler temps

**Copy Template:**

```
"Perfect touring weather today. The grounds are best explored when [condition].
See what's happening this week → [LINK: Browse Events]"
```

**Examples:**

1. "Perfect touring weather today. 68°F, sunny, light breeze—ideal for wandering where Tennessee began. See what's open → [Browse Events]"
2. "Clear skies forecast. A great day to experience a guided tour of Rocky Mount. [Book Your Tour]"
3. "Frost protection incoming. Plan an indoor activity this morning, then return home to prepare your garden. See our lecture series → [Explore]"

---

## Design 2: Event Countdown Integration

### Concept: "Days Until" Card with Weather Forecast

Show upcoming featured events with their weather forecast, creating urgency and reducing booking friction.

**Featured Events (2026):**

- Road to 250 Season Opening (March 4)
- Woolly Days (April 25-26)
- Early Frontier Days (May 22-24)
- Stitching Independence (June 13-14)
- Colonial Independence Day (July 4)
- Cherokee Heritage Weekend (Aug 22-23)
- First Families Reunion (Sept 11-13)
- Harvest Fest (Oct 10-11)
- Haunting on the Mount (Oct 15-24)
- Candlelight Christmas (Dec 4-5, 11-12)

**Location:** Mobile: After CompactSevenDay / Desktop: After 7-Day Outlook (ROW 2)

**Component Design (UpcomingEventCard.tsx):**

```tsx
interface UpcomingEventCard {
  eventId: string
  eventTitle: string // "Stitching Independence"
  eventDate: Date
  daysUntil: number // 7
  forecastHigh: number // 72
  forecastLow: number // 58
  forecastCondition: string // "Partly Cloudy"
  weatherLike: string // "72°F, perfect for outdoor activities"
  eventDescription: string // One-liner
  bookingUrl: string
  featured: boolean
}
```

**Logic:**

1. **Calculate next featured event** from `events.json`
2. **Fetch 7-day forecast**
3. **Pull forecast day matching event date**
4. **If <= 30 days away:** Show card
5. **If <= 7 days away:** Show daily countdown ("3 days until...")
6. **If event is today:** Show "Today!" with live conditions

**Copy Template:**

```
"[DAYS UNTIL] Stitching Independence

June 13-14 — Two days of stars, stripes, and stitches.
Forecast: 72°F, partly cloudy—perfect for outdoor gathering.

Book Early: [BUTTON: Reserve Your Spot]"
```

**Examples:**

1. **28 days out:** "28 days until Woolly Days. Forecast: 68°F, sunny. The perfect spring weather for exploring heritage fiber arts. → [Reserve]"

2. **7 days out:** "7 days until Early Frontier Days. Forecast: 71°F, clear skies. Join the largest Revolutionary-era gathering in the region. → [Get Tickets]"

3. **Today:** "TODAY: Colonial Independence Day. Live conditions: 74°F, sunny, light wind. The First 250 ceremony begins at 10 AM. → [Enter Now]"

**Decision Rules:**

- **Show next event IF:** Featured event && <= 30 days away
- **Update frequency:** Daily (cached at midnight)
- **Mobile:** Stack vertically, show 1 event at a time
- **Desktop:** Show current + next upcoming

---

## Design 3: "Almanac Insider" Benefits System

### Concept: Gamified Loyalty Loop

Daily Almanac visitors earn perks tied to visit frequency and engagement.

**Three-Tier System:**

#### Tier 1: "Check-In" (Free, Immediate)

- Visit Almanac 5 consecutive days
- Unlock: 10% discount code for shop

**Copy Hook:** "5-Day Forecaster"
**Trigger:** localStorage tracking consecutive days
**UI:** Small badge in TopBar with progress ring

#### Tier 2: "Committed Watcher" (Free, 30 days)

- Visit 15+ days in a 30-day period
- Unlock: Early access to limited events (blacksmith workshops, behind-the-scenes)

**Copy Hook:** "Weather Warden"
**Trigger:** localStorage + server-side tracking (optional)
**UI:** Modal at unlock: "You've earned early-access to our most exclusive experiences"

#### Tier 3: "Seasons Tracker" (Free, 90 days)

- Visit across all four seasons (visit in Mar/Apr, Jun/Jul, Sep/Oct, Dec)
- Unlock: Invite to invitation-only annual gala + special First Families content

**Copy Hook:** "Keeper of the Ground"
**Trigger:** localStorage season tracking
**UI:** Achievement screen with historical context

**Storage Design:**

```typescript
// localStorage: @almanac:insider-progress
{
  lastVisit: "2026-01-28",
  consecutiveDays: 5,
  daysIn30Days: 12,
  seasonsVisited: ["winter", "spring"],
  achievements: [
    { id: "five-day", unlockedAt: "2026-01-28", redeemed: false },
    { id: "committed-watcher", unlockedAt: null }
  ]
}
```

**Unlock Modals:**

1. **5-Day Forecaster Unlock:**

   ```
   "You're a Weather Expert.
   Check the Almanac 5 days in a row—now you're seeing patterns most miss.

   Reward: 10% Rocky Mount shop discount
   Code: FORECASTER2026 (email to claim)

   [Claim Now]"
   ```

2. **Committed Watcher Unlock:**

   ```
   "Weather Warden.
   You've checked the forecast 15 times this month. You understand our ground.

   Early Access Unlocked:
   - Blacksmith Workshops (48h early)
   - Behind the Scenes tours (priority booking)
   - Seasonal events (first 10 seats reserved)

   [View Exclusive Events] [Decline]"
   ```

3. **Keeper of the Ground Unlock:**

   ```
   "Keeper of the Ground.
   You've watched Rocky Mount through all four seasons.
   Your dedication doesn't go unnoticed.

   You're Invited:
   - Annual Insider Gala (November 2026)
   - First access to 2027 events
   - Exclusive First Families stories

   We'll send details via email.
   [Accept Invitation]"
   ```

**Implementation Details:**

- **No backend required** — All tracking via localStorage
- **Discount code:** Pre-generated, valid for 365 days from unlock
- **Email capture:** Optional, only at Tier 3 (gala invitation)
- **Reset logic:** Progress resets annually on January 1
- **Privacy:** Transparent about tracking; optional to participate

---

## Design 4: Social Media Hooks & Shareable Content

### Concept: Almanac Quotes + Rocky Mount Context = Viral Hooks

When visitors share weather updates, they mention Rocky Mount.

**Integration Points:**

#### 1. Enhanced ShareButton Component

**Current State:** Shares frontier saying + weather
**Upgrade:** Add contextual Rocky Mount CTAs

```typescript
interface ShareContent {
  frontierLine: string // "Clear nights are good nights"
  modernLine: string // "Today's low: 36°F"
  temperature: number // 65
  location: string // "Sullivan County, TN"
  rockymountCTA?: {
    // NEW
    hook: string // "Perfect day for touring."
    url: string // "https://tennesseestartshere.com/visit"
  }
}
```

**Share Template:**

**Before:**

```
"Clear nights are good nights. | 38°F tonight in Sullivan County, TN

#AlmanacWeather #Tennessee #1775"
```

**After:**

```
"Clear nights are good nights—and perfect for exploring Rocky Mount.
38°F tonight in Sullivan County, TN.

Where Tennessee's government began: [link to visit page]

#AlmanacWeather #TennesseeStartsHere #RockyMount"
```

#### 2. Seasonal Quote Integrations

**Spring Quote Hook:**

```
"When buds break, visitors should too.
Spring weather calls for exploring Rocky Mount.
Book now: [link]

#TennesseeStartsHere"
```

**Summer Quote Hook:**

```
"Golden light, perfect weather. The frontier invited visitors daily.
Now it's your turn.

Colonial Independence Day — July 4
#RockyMount #America250"
```

**Fall Quote Hook:**

```
"Harvest time meant gathering. Join us for Harvest Fest.
Perfect timing. Perfect weather.
Oct 10-11: [link]

#TennesseeStartsHere #RockyMount"
```

**Winter Quote Hook:**

```
"Candlelight was all they had. Now candlelight brings wonder.
A thousand candles. Carolers. Cider.
Dec 4-5, 11-12: [link]

#RockyMount #TennesseeStartsHere #HolidayTradition"
```

#### 3. Weather.com-Style "Share Your Photo" Widget

**Concept:** Visitors with "perfect touring weather" get prompted to share where they'll explore.

**Trigger:** When weather score = "Optimal"

**UI Modal:**

```
"Perfect Touring Weather Today.

Where will you explore?

O Rocky Mount (I'll visit!)
O Local hiking trail
O Park or garden
O Other

Share your plans with the forecast:
[Button: Share to Twitter]
[Button: Share to Instagram]"
```

**Tweet Template:**

```
"Just checked the Almanac—perfect weather in Sullivan County, TN
(72°F, sunny, light breeze). Heading to Rocky Mount to explore where
Tennessee's government began.

#TennesseeStartsHere #RockyMount"
```

#### 4. Hashtag Integration

**Official Almanac Hashtags:**

- `#AlmanacWeather` — Daily conditions
- `#TennesseeStartsHere` — Brand consistency
- `#RockyMount1791` — Historical emphasis
- `#PerfectTouringWeather` — Event tie-in

**Hashtag Suggestions in Share Modal:**

- Spring: `#SpringAtRockyMount #GardenWeather`
- Summer: `#SummerVisit #RockyMountWeather #America250`
- Fall: `#HarvestSeason #FallInTennessee`
- Winter: `#CandlelightChristmas #RockyMountHolidays`

---

## Conversion Flow Map

```
Visitor arrives at /almanac
           ↓
Check weather (primary intent)
           ↓
         [IF] Perfect touring weather
           ↓
  EventWeatherCard displays
  "68°F, sunny—perfect for touring"
           ↓
  [CLICK] Browse Events / Book Tour
           ↓
         /events or /visit
           ↓
      Purchase/Book

---

Alternative Path:

Visitor checks weather daily
           ↓
  localStorage tracks visits
           ↓
[DAY 5] "5-Day Forecaster" unlock badge appears
           ↓
[CLICK] Claim 10% discount code
           ↓
User motivated to use code → Shop/book something
           ↓
      Purchase/Book
```

---

## Technical Implementation Roadmap

### Phase 1: Core Integration (Week 1-2)

**Priority: High Conversion**

1. **EventWeatherCard.tsx** — Smart weather → event matching
   - 3 trigger rules implemented
   - Colors for optimal/good/fair conditions
   - 2 copy templates

2. **UpcomingEventCard.tsx** — Countdown + forecast
   - Pulls next featured event from events.json
   - Fetches forecast from existing weather API
   - Shows "X days until..."

3. **Updated ShareButton** — Add Rocky Mount CTA
   - Append Rocky Mount hook to frontier saying
   - Add hashtag suggestions
   - Track clicks (optional analytics)

### Phase 2: Loyalty System (Week 3-4)

**Priority: Medium (Retention)**

1. **AlmanacInsiderTracker.ts** — localStorage state management
   - Track consecutive days
   - Track season visits
   - Calculate achievement unlocks

2. **Achievement Modals** — Three unlock screens
   - Tier 1: Discount code
   - Tier 2: Early access events
   - Tier 3: Gala invitation

3. **InsiderBadge.tsx** — TopBar indicator
   - Shows progress ring
   - Clickable for details
   - Animates on new unlock

### Phase 3: Social Hooks (Week 5)

**Priority: Low (Virality)**

1. **Seasonal Quote Hooks** — Update sayings.ts
   - Tie frontier quotes to Rocky Mount messaging
   - Add contextual CTAs

2. **Photo Share Modal** — Optional feature
   - "Where will you explore?" prompt
   - Pre-filled tweet templates

3. **Share Analytics** — Track CTA clicks
   - Store in Supabase (optional)
   - Report on effectiveness

### Phase 4: Optimization (Ongoing)

- A/B test card positions (mobile vs. desktop)
- Adjust trigger rules based on CTR
- Seasonal copy updates
- Event-specific messaging

---

## Copy Guidelines

### Always Follow Brand Hierarchy

**TIER 1 (Mystery):** Lead with it

```
"Before there was a Tennessee, there was this ground."
+ Weather condition
+ CTA to explore
```

**TIER 2 (Scarcity):** For 2026-only events

```
"For approximately 16 months, this ground was the capital of everything west of the mountains."
+ Event context
+ Urgency (deadline/enrollment)
```

**TIER 3 (Authority):** For prestigious events

```
"The first federal seat of government under the Constitution, west of the Appalachians."
+ Event prestige
+ Academic/cultural angle

### Event-Specific Hooks

| Event | Hook | Tone |
|-------|------|------|
| Stitching Independence | "Stars, stripes, stitches—Tennessee celebrates." | Celebratory |
| Colonial Independence Day | "Where Tennessee began celebrates America turning 250." | Historical |
| Harvest Fest | "Autumn gathering, 1791 tradition. Join us." | Communal |
| Candlelight Christmas | "A thousand candles. The year's most magical nights." | Atmospheric |
| Haunting on the Mount | "Candlelight, shadows, stories told after dark." | Intriguing |

---

## Files to Create/Modify

### New Components

```

components/almanac/
├── EventWeatherCard.tsx # "Perfect touring weather" card
├── UpcomingEventCard.tsx # "7 days until..." countdown
├── InsiderBadge.tsx # Achievement indicator (TopBar)
├── AchievementModal.tsx # Unlock screen (3 variants)
└── SharePhotoModal.tsx # "Where will you explore?"

lib/
├── almanac/
│ ├── eventMatching.ts # Trigger rule logic
│ ├── forecastMatching.ts # Event date → forecast lookup
│ └── insiderProgress.ts # localStorage state management
└── events.ts # Helper: getNextFeaturedEvent(), getFeaturedEvents()

hooks/
└── useAlmanacInsider.ts # Custom hook for insider tracking

```

### Modified Files

```

components/almanac/
├── ShareButton.tsx # Add Rocky Mount CTA & hashtags
└── TopBar.tsx # Add InsiderBadge

app/(almanac)/almanac/page.tsx # Import & position new cards # Mobile: after NextChangeHero, CompactSevenDay # Desktop: ROW 2 (Planning section)

lib/copy/
├── brand.ts # Add event-specific hooks
└── sayings.ts # Seasonal message templates

data/
└── events.json # Add "featured: true" field (already exists)

```

---

## Success Metrics

### Conversion Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| EventWeatherCard CTR | 8-12% | Links to /events, /visit |
| UpcomingEventCard CTR | 10-15% | Links to event booking |
| Share clicks | 5-8% | Links in shared content |
| Insider unlock rate | 40% | Users reaching Tier 1 within 30 days |

### Engagement Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Return visitors (7-day) | 35% | Repeat daily visits |
| Avg session time | +30 sec | Time on /almanac page |
| Insider Tier 2 unlock | 15% | Users reaching "Committed Watcher" |
| Event booking attribution | 5-8% | "Referred by Almanac" in booking flow |

### Content Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Share rate | 8-12% | Shares via ShareButton |
| Hashtag mentions | +50 | Social monitoring |
| Photo uploads | 10+ per month | Photos shared to Rocky Mount |

---

## Risk & Mitigation

### Risk 1: Card Fatigue (Too Many CTAs)

**Problem:** Adding cards feels intrusive, reduces trust in Almanac as utility.

**Mitigation:**
- Keep cards contextual (only show when weather matches)
- Max 1 active card per session (EventWeatherCard OR UpcomingEventCard, not both)
- Hide after click for 24 hours (localStorage)
- A/B test positioning: below-fold initially

### Risk 2: Insider System Feels Cheap

**Problem:** "Visit 5 days for a 10% discount" feels like spam loyalty program.

**Mitigation:**
- Lead with Tier 3 (Gala invitation), not discount
- Discount is bonus, not primary unlock
- Frame as "appreciation for engagement" not "trick to sell"
- Transparent about tracking ("We count your visits to know you")

### Risk 3: Social Hooks Don't Drive Traffic

**Problem:** Most visitors won't share, even if CTA is easy.

**Mitigation:**
- Target "optimal weather" days only (highest engagement)
- Make sharing friction-free (pre-filled tweets)
- Measure month-over-month; pause if <3% of visitors share
- Use as brand-building, not conversion metric

### Risk 4: Event Forecasts Change, Copy Becomes Wrong

**Problem:** 7-day forecast is inaccurate for events 30+ days away.

**Mitigation:**
- Only show countdown if <= 14 days away (more accurate)
- Keep forecast generic: "Expected spring weather" for 3+ weeks out
- Update copy daily (no caching of event cards > 24 hours)
- Caveat: "Weather subject to change" for events >7 days

---

## Appendix: Copy Library

### EventWeatherCard Variations

**Optimal (Green)**
- "Perfect touring weather today. 68°F, sunny, light breeze—exactly when Rocky Mount shines most. See what's on today → [Browse Events]"
- "Clear skies are calling. A great day to explore where Tennessee began. [Plan Your Visit]"
- "Ideal conditions for a guided tour. Rocky Mount's grounds are best experienced when the weather's this perfect. [Book Now]"

**Good (Blue)**
- "Great day for exploring the historic grounds. Comfortable conditions for a full visit. [See Events]"
- "Pleasant temperatures ahead—perfect for discovering Rocky Mount's stories. [Learn More]"

**Fair (Amber)**
- "Rainy day coming? Indoor workshops and heated hearth cooking are available. [See Events]"
- "Cool and clear—bring a jacket and experience the frontier the way it was. [Explore]"

### UpcomingEventCard Variations

**3+ Weeks Out**
- "X weeks until [Event]. Expected [season] weather—perfect for outdoor exploration."

**2 Weeks Out**
- "X days until [Event]. Forecast: [high]°F, [condition]. The timing looks ideal."

**7 Days Out**
- "X days until [Event]. 7-day outlook: [condition], [high]°F. Time to book your spot."

**3 Days Out**
- "X days until [Event]. The weather is shaping up beautifully. [Reserve Now]"

**Today**
- "TODAY: [Event]. Live conditions: [temp]°F, [condition]. It's happening now. [Enter]"

### Hashtag Suggestions

**General:**
- #AlmanacWeather
- #TennesseeStartsHere
- #RockyMount1791
- #PerfectTouringWeather

**Spring:**
- #SpringAtRockyMount
- #GardenWeather
- #AprilInTennessee

**Summer:**
- #SummerVisit
- #RockyMountWeather
- #America250
- #ColonialIndependenceDay

**Fall:**
- #HarvestSeason
- #FallInTennessee
- #AutumnAtRockyMount

**Winter:**
- #CandlelightChristmas
- #RockyMountHolidays
- #FrontierChristmas

---

## Conclusion

The Almanac's daily utility creates natural return visitation. By adding contextual, non-intrusive marketing touchpoints, we convert weather-checkers into tour-bookers and event attendees.

**Key Principle:** Don't interrupt the Almanac. Enhance it. Every card should answer a question the visitor is already asking: "Is today a good day to be outside?" → "Yes, and here's where you should be."

**Success = Daily Almanac visitors → Weekly Rocky Mount visitors → Annual ticketholders**

---

_Created: January 28, 2026_
_Status: Design Complete, Ready for Implementation_
```
