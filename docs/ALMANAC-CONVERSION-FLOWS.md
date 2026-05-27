# Almanac Marketing Integration - Conversion Flows

**Document Purpose:** Visual and text flows for how visitors convert from Almanac utility to Rocky Mount visitors/customers.

---

## Flow 1: Weather Condition → Tour Booking

```
┌─────────────────────────────────────────────────────────────┐
│ VISITOR ARRIVES AT /almanac                                  │
│ Primary intent: Check weather                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │ Weather Data Loaded    │
        │ Current: 72°F, sunny   │
        │ Wind: 6mph, clear      │
        └────────────┬───────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ EventWeatherCard Trigger Check         │
        │ Does current weather match tour day?   │
        │                                        │
        │ ✓ 65-75°F + sunny + <10mph = OPTIMAL  │
        └────────────┬───────────────────────────┘
                     │
        ┌────────────▼────────────┐
        │ CARD DISPLAYS:          │
        │                         │
        │ ✓ "Perfect touring     │
        │   weather today."      │
        │ ✓ "68°F, sunny,        │
        │   light breeze"        │
        │ ✓ Button:              │
        │   [Browse Events]      │
        │   → href: /events      │
        └────────────┬────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │ DECISION POINT: Does visitor click button?   │
        │                                               │
        │ NO  ──→ Continue browsing Almanac            │
        │         (Optional: see UpcomingEventCard)    │
        │                                               │
        │ YES ──→ [Continue to next section]           │
        └────────────┬──────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ LANDS ON /events                       │
        │ Context: "Perfect touring weather"    │
        │                                        │
        │ Visitor scans featured events for today
        │ or this week                          │
        └────────────┬───────────────────────────┘
                     │
        ┌────────────▼───────────────────────┐
        │ BOOKING DECISION                   │
        │                                    │
        │ NO  ──→ Bounce (visitor engaged 3x)
        │         Retarget via email         │
        │                                    │
        │ YES ──→ [Continue]                 │
        └────────────┬───────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ CLICK "Book Your Tour" / Event Button  │
        │ → FareHarbor booking flow              │
        └────────────┬───────────────────────────┘
                     │
        ┌────────────▼────────────────────────────────┐
        │ BOOKING COMPLETE                           │
        │                                            │
        │ Confirmation: "See you on [date]!"         │
        │ Email sent with details                    │
        │                                            │
        │ Analytics: UTM_source=almanac_weather_card │
        └────────────┬────────────────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────────────┐
        │ SUCCESS: Weather visitor → Customer     │
        │                                         │
        │ Metrics:                                │
        │ • Click rate: 8-12% (target)            │
        │ • Booking rate: 15-25% of clicks       │
        │ • Revenue impact: [TBD]                 │
        └─────────────────────────────────────────┘
```

**Key Decision Points:**

1. **Card Triggers:** Weather must match 65-75°F, sunny, low wind
2. **Button Click:** 8-12% expected CTR
3. **Event Selection:** 40-50% of /events visitors book something
4. **Final Booking:** 60-70% of those who click "Book" complete booking

**Copy Messaging:**

- Card: "Perfect touring weather today. 68°F, sunny, light breeze—exactly when Rocky Mount shines most."
- Page context (optional): "The Almanac recommended today. Here's why."

---

## Flow 2: Daily Habit → Loyalty Unlock → Booking

```
┌──────────────────────────────────────────────────────────────┐
│ VISITOR BEGINS DAILY ALMANAC HABIT                           │
│ Intent: Check weather for personal plans (farming, hiking)   │
└────────────────┬───────────────────────────────────────────┘
                 │
        ┌────────▼────────────────────────────────┐
        │ DAY 1: First visit                       │
        │ useAlmanacInsider hook initialized      │
        │ localStorage created:                   │
        │   - lastVisit: 2026-01-28               │
        │   - consecutiveDays: 1                  │
        └────────────┬─────────────────────────────┘
                     │
        ┌────────────▼────────────────────────────┐
        │ DAYS 2-4: Visitor returns each day      │
        │ (localStorage updates)                  │
        │                                         │
        │ Day 2: consecutiveDays: 2               │
        │ Day 3: consecutiveDays: 3               │
        │ Day 4: consecutiveDays: 4               │
        │                                         │
        │ No visual change yet                    │
        └────────────┬─────────────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────────────────────┐
        │ DAY 5: ACHIEVEMENT UNLOCK TRIGGERED             │
        │                                                 │
        │ Milestone: consecutiveDays === 5                │
        │ Achievement: "5-Day Forecaster"                 │
        │                                                 │
        │ Visual feedback:                                │
        │ 1. TopBar InsiderBadge appears (animated)      │
        │ 2. AchievementModal slides up                  │
        └────────────┬──────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────┐
        │ ACHIEVEMENT MODAL CONTENT:                │
        │                                          │
        │ "You're a Weather Expert.                │
        │                                          │
        │ You've checked the forecast 5 days      │
        │ in a row—you're seeing patterns most     │
        │ miss.                                    │
        │                                          │
        │ Reward: 10% Rocky Mount shop discount"  │
        │                                          │
        │ [Copy Code] [Dismiss]                    │
        │ Code: FORECASTER2026                     │
        │ Valid 365 days                           │
        └────────────┬──────────────────────────────┘
                     │
        ┌────────────▼────────────────────────┐
        │ VISITOR DECISION: Take discount?    │
        │                                    │
        │ NO  ──→ Dismiss (5 more days until │
        │         next milestone)             │
        │                                    │
        │ YES ──→ Copy code, browse shop     │
        │         or events (conversion!)    │
        └────────────┬────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ VISITOR CONTINUES DAILY VISITS         │
        │                                        │
        │ Day 6-14: Still locked at Tier 1       │
        │ (no new unlocks)                       │
        │                                        │
        │ Day 15: 30-day window triggers check   │
        │         daysIn30Days = 15              │
        │         → Tier 2 milestone reached     │
        └────────────┬───────────────────────────┘
                     │
        ┌────────────▼───────────────────────────────────┐
        │ TIER 2 UNLOCK: "Committed Watcher"            │
        │                                               │
        │ Modal content:                                │
        │ "You've checked 15 times this month.         │
        │  You understand our ground.                  │
        │                                              │
        │  Early Access Unlocked:                      │
        │  • Blacksmith Workshops (48h early)         │
        │  • Behind the Scenes tours (priority)        │
        │  • Seasonal events (first 10 seats)          │
        │                                              │
        │  [View Exclusive Events] [Decline]"          │
        └────────────┬───────────────────────────────────┘
                     │
        ┌────────────▼─────────────────────────────┐
        │ CONVERSION OPPORTUNITY                   │
        │                                          │
        │ Visitor clicks [View Exclusive Events]   │
        │ → Filtered view of invitation-only tours │
        │                                          │
        │ High intent (already a daily user!)      │
        │ → Booking rate: 40-50% expected         │
        │                                          │
        │ [Book Blacksmith Workshop] ──→ PURCHASE │
        └────────────┬─────────────────────────────┘
                     │
                     ▼
        ┌──────────────────────────────────────────┐
        │ VISITOR CONTINUES HABIT                  │
        │                                          │
        │ Days 16-90: Visits across multiple      │
        │ seasons (winter → spring → summer)       │
        │                                          │
        │ localStorage tracks:                     │
        │   seasonsVisited: ["winter","spring"]   │
        └────────────┬──────────────────────────────┘
                     │
        ┌────────────▼────────────────────────────────────┐
        │ AFTER 4 SEASON VISITS: TIER 3 UNLOCK           │
        │                                                 │
        │ Achievement: "Keeper of the Ground"             │
        │                                                 │
        │ Modal:                                          │
        │ "You've watched Rocky Mount through all        │
        │  four seasons. Your dedication is noticed.     │
        │                                                 │
        │  You're Invited:                               │
        │  • Annual Insider Gala (Nov 2026)             │
        │  • First access to 2027 events                │
        │  • Exclusive First Families stories            │
        │                                                 │
        │  [Email for Invitation]"                       │
        │                                                 │
        │  → Email capture (optional, first time)        │
        └────────────┬────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────────────────┐
        │ ULTIMATE CONVERSION                            │
        │                                                │
        │ Visitor has now:                               │
        │ 1. Used Almanac 90+ days                       │
        │ 2. Booked at least 1 paid event (Tier 2)      │
        │ 3. Given email for Tier 3                      │
        │ 4. Become invested in site/brand              │
        │                                                │
        │ Likely outcomes:                               │
        │ • Return visitor for 2027 season              │
        │ • Email list qualified lead                    │
        │ • Word-of-mouth advocate                       │
        │ • Potential seasonal ticket holder             │
        └────────────────────────────────────────────────┘
```

**Key Milestones:**

1. **Day 5:** 10% discount unlock (low friction, high impact)
2. **Day 15:** Early access unlock (high-value perks)
3. **Day 90+:** Gala invitation (prestige, community building)

**Expected Conversion Rates:**

- Tier 1 unlock rate: 40% of daily users
- Tier 1 → Tier 2 (first booking): 20-30%
- Tier 2 → Tier 3 (sustained engagement): 10-15%

---

## Flow 3: Social Share → Discovery → Booking

```
┌────────────────────────────────────────────────────────┐
│ VISITOR SEES SHAREBUTTON IN ALMANAC                    │
│ Content: Frontier saying + current weather             │
│ Mood: Happy (great weather), wants to share            │
└────────────────┬───────────────────────────────────────┘
                 │
        ┌────────▼─────────────────────────────┐
        │ OLD SHARE TEXT:                       │
        │ "Clear nights are good nights.        │
        │  38°F tonight in Sullivan County, TN" │
        │                                       │
        │ NEW SHARE TEXT:                       │
        │ "Clear nights are good nights—and     │
        │  perfect for exploring Rocky Mount.   │
        │  38°F tonight in Sullivan County, TN. │
        │                                       │
        │  Where Tennessee's government began:  │
        │  [link to /visit]                     │
        │  #TennesseeStartsHere"                │
        └────────────┬──────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────┐
        │ VISITOR CLICKS SHARE BUTTON               │
        │                                          │
        │ Platform options:                        │
        │ [Twitter] [Facebook] [LinkedIn] [Copy]   │
        │                                          │
        │ → Selects Twitter (most common)           │
        └────────────┬──────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ TWEET PUBLISHED                        │
        │                                        │
        │ "Clear nights are good nights—and     │
        │  perfect for exploring Rocky Mount.    │
        │  38°F tonight in Sullivan County, TN.  │
        │                                        │
        │  Where Tennessee's government began:   │
        │  [link] #TennesseeStartsHere"          │
        │                                        │
        │ Visibility:                            │
        │ • Visitor's followers: ~50-200 people  │
        │ • Hashtag searches: #TennesseeStartsHere
        │ • Platform algorithm: unknown          │
        └────────────┬─────────────────────────────┘
                     │
        ┌────────────▼────────────────────────────────┐
        │ NEW VISITOR SEES TWEET IN FEED              │
        │                                            │
        │ "Oh, there's a historic site in Tennessee  │
        │  with an Almanac? That's cool."            │
        │                                            │
        │ Curiosity + Weather context = Click        │
        │ → Visitor clicks link                      │
        └────────────┬────────────────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────────────┐
        │ COLD TRAFFIC LANDS ON /visit            │
        │ (Or /almanac, then /visit)              │
        │                                         │
        │ Intent: "What is this historic site?"   │
        │                                         │
        │ Key question: Is today good for visit?  │
        │ → Sees Almanac link in header            │
        │ → Clicks to check weather               │
        └────────────┬───────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────┐
        │ NEW VISITOR EXPLORES ALMANAC              │
        │                                          │
        │ Discovers:                               │
        │ • Current weather perfect for exploring  │
        │ • Task scores show good visiting day     │
        │ • EventWeatherCard shows tours available │
        │ • Upcoming events this month             │
        │                                          │
        │ Now engaged: Utilities + marketing       │
        │ working together                         │
        └────────────┬──────────────────────────────┘
                     │
        ┌────────────▼────────────────────────┐
        │ DECISION: Book or Browse?           │
        │                                    │
        │ Likely: "This is cool, let me     │
        │ book a tour"                       │
        │                                    │
        │ [Click EventWeatherCard] or        │
        │ [Navigate to /events]              │
        └────────────┬────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ BOOKING FLOW                           │
        │                                        │
        │ Visitor selects event, date, time      │
        │ → Proceeds to FareHarbor checkout      │
        │ → Completes payment                    │
        │                                        │
        │ Attribution: utm_source=twitter_share  │
        │            utm_medium=referral         │
        │                                        │
        │ EMAIL SENT: "See you on [date]!"      │
        └────────────┬────────────────────────────┘
                     │
                     ▼
        ┌──────────────────────────────────────────┐
        │ SUCCESS: Social share → New visitor      │
        │                                          │
        │ Multiplier effect:                       │
        │ • 1 share per day (avg user with 150   │
        │   followers)                            │
        │ • 3-5% CTR on tweet (~5-7 clicks)      │
        │ • 10-15% of clicks convert to booking  │
        │ • 1 book per 100 shares (conservative)  │
        │                                         │
        │ Monthly impact (100 daily Almanac users):
        │ • ~100 shares/month                     │
        │ • ~1-2 bookings attributed to social    │
        │ • Revenue: $30-50 per booking (ticket)  │
        └──────────────────────────────────────────┘
```

**Key Success Factors:**

1. **Copy Quality:** Must mention Rocky Mount + provide value
2. **Link Authority:** Use own domain (/visit), not bit.ly
3. **Hashtag Strategy:** #TennesseeStartsHere is searchable, branded
4. **Seasonal Messaging:** Summer/July 4 drives more shares
5. **Timing:** Share when visitor is happy (good weather day)

**Expected Share Metrics:**

- Share rate: 8-12% of daily visitors
- Click-through rate from tweet: 3-5%
- Booking conversion from social traffic: 10-15%

---

## Flow 4: Upcoming Event Countdown → FOMO → Booking

```
┌─────────────────────────────────────────────────────┐
│ UPCOMING FEATURED EVENT: Stitching Independence     │
│ Event date: June 13-14 (2 months away)              │
│ Days until: 28                                      │
└────────────────┬──────────────────────────────────┘
                 │
        ┌────────▼───────────────────────────┐
        │ DAILY ALMANAC VISITOR               │
        │ Checks weather habitually           │
        │ (Part of morning routine)           │
        │                                    │
        │ Doesn't think about events usually  │
        │ (Too far away)                      │
        └────────────┬────────────────────────┘
                     │
        ┌────────────▼────────────────────────────────┐
        │ UPCOMINGVENTCARD TRIGGERS                   │
        │                                            │
        │ Logic: getNextFeaturedEvent() = {          │
        │   id: "stitching-independence"             │
        │   title: "Stitching Independence"          │
        │   date: "2026-06-13"                       │
        │   daysUntil: 28                            │
        │   featured: true                           │
        │ }                                          │
        │                                            │
        │ Fetch forecast for June 13 from 7-day API  │
        │ (Forecast for day 28 = generic seasonal)   │
        │                                            │
        │ ✓ Card qualifies to show (≤ 30 days)       │
        └────────────┬────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────┐
        │ CARD DISPLAYS:                        │
        │                                      │
        │ "28 Days Until                       │
        │  Stitching Independence              │
        │                                      │
        │  June 13-14 — Two days of stars,    │
        │  stripes, and stitches. Saturday:   │
        │  Tennessee's 230th recognition and  │
        │  America 250 flag dedication.       │
        │  Sunday: Betsy Ross Sip & Sew—     │
        │  wine, needles, and flag-making.    │
        │                                      │
        │  Forecast: 72°F, partly cloudy—     │
        │  perfect for outdoor gathering.     │
        │                                      │
        │  [Reserve Your Spot]"               │
        │                                      │
        │  → href: FareHarbor booking page     │
        └────────────┬──────────────────────────┘
                     │
        ┌────────────▼────────────────────────────┐
        │ VISITOR REACTION:                       │
        │                                        │
        │ "Huh, that looks cool, but it's      │
        │  a month away. I'll remember..."      │
        │  (Probably won't)                     │
        │                                        │
        │ Most visitors dismiss (too far out)    │
        │ Expected: 5-7% CTR first exposure      │
        └────────────┬────────────────────────────┘
                     │
        ┌────────────▼─────────────────────────────┐
        │ DAYS 14-7: EVENT APPROACHING             │
        │                                         │
        │ Same visitor returns to Almanac          │
        │ (Daily habit)                           │
        │                                         │
        │ Card updates:                           │
        │ "14 Days Until Stitching Independence"  │
        │ (Same event, countdown updated)         │
        │                                         │
        │ Or if returning after a break:          │
        │ "Stitching Independence returns soon!" │
        │                                         │
        │ Expected: 8-10% CTR (closer proximity) │
        └────────────┬─────────────────────────────┘
                     │
        ┌────────────▼────────────────────────────┐
        │ DAYS 7-3: URGENCY KICKS IN               │
        │                                         │
        │ Card shows:                             │
        │ "7 Days Until Stitching Independence   │
        │  Forecast: 72°F, clear skies—ideal    │
        │  for outdoor activities.               │
        │  Book Your Spot: Limited seats available"
        │                                         │
        │ Psychological shift:                    │
        │ • FOMO increases (week away!)          │
        │ • Forecast is accurate now             │
        │ • "Limited seats" copy triggers action │
        │                                         │
        │ Expected: 12-15% CTR (peak engagement) │
        └────────────┬────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────┐
        │ DECISION MOMENT: CTR Spike             │
        │                                       │
        │ Visitor likely scenarios:              │
        │                                       │
        │ 1. "That's this weekend! Booking now" │
        │    → Click button → BOOKING            │
        │                                       │
        │ 2. "I need to check my schedule"      │
        │    → Click → /events → Browse dates   │
        │    → Likely books something           │
        │                                       │
        │ 3. "Not interested" → Dismiss         │
        │    (Will see different event card    │
        │     next day)                         │
        └────────────┬──────────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────────────┐
        │ BOOKING COMPLETE                        │
        │                                         │
        │ Email: "You're booked for             │
        │ Stitching Independence!"               │
        │                                         │
        │ Attribution: utm_source=almanac_event  │
        │            utm_medium=countdown        │
        │            utm_campaign=stitching-2026 │
        │                                         │
        │ Data captured:                         │
        │ • Which countdown exposure converted? │
        │ • 28 days out? 7 days? Day-of?        │
        │                                         │
        │ Metric: Event booking velocity         │
        └────────────┬─────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ SUCCESS: Habit visitor → Booked guest  │
        │                                        │
        │ Expected flow outcomes:                │
        │ • 30% of daily users see countdown     │
        │ • 10% click (avg of all exposures)     │
        │ • 40-50% of clickers complete booking │
        │ • ~1-2% of daily users = new bookings │
        │                                        │
        │ High-value conversion:                 │
        │ • Low friction (already on site)       │
        │ • High intent (daily habit user)       │
        │ • Long customer lifetime value         │
        └────────────────────────────────────────┘
```

**Key Timing Triggers:**

| Days Out | CTR | Copy Focus                       | Seasonal Context               |
| -------- | --- | -------------------------------- | ------------------------------ |
| 28-15    | 5%  | "Mark your calendar"             | Generic                        |
| 14-8     | 8%  | "Coming soon"                    | Weather becomes relevant       |
| 7-3      | 12% | "This week" + "Limited seats"    | FOMO peaks                     |
| 2        | 15% | "This weekend" + Live conditions | Highest urgency                |
| 1        | 10% | "Today" + "Join us now"          | Some miss, but day-of bookings |

**Implementation Note:**

- Card shows next featured event only (not all events)
- If event is today: Show live weather + "Enter now" button
- If event has passed: Show next featured event

---

## Summary: All Flows to Revenue

```
                    ALMANAC UTILITY
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    Weather Check   Event Check    Social Share
    (60% of use)   (25% of use)   (15% of use)
         │               │               │
         │               │               │
         ▼               ▼               ▼
    [EVENT            [UPCOMING        [TWEET]
     WEATHER          EVENT
     CARD]            CARD]
         │               │               │
         │               │               │
         ▼               ▼               ▼
    /events           /events         /visit
    (8-12% CTR)    (10-15% CTR)    (3-5% CTR)
         │               │               │
         │               │               │
         └───────────────┼───────────────┘
                         │
                         ▼
                [BOOKING FUNNEL]
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
         BOOKED              ADDED TO
         EVENT              EMAIL LIST
             │                       │
             │                       │
             ▼                       ▼
        REVENUE            RETARGETING
        $18-50             CAMPAIGN
        per ticket
```

**Expected Monthly Conversion (100 daily Almanac visitors):**

| Channel              | Monthly Reach | CTR | Booking % | Revenue    |
| -------------------- | ------------- | --- | --------- | ---------- |
| Event Weather Cards  | 3,000 visits  | 10% | 20%       | $1,080     |
| Upcoming Event Cards | 3,000 visits  | 12% | 25%       | $1,350     |
| Social Shares        | 300 shares    | 4%  | 12%       | $216       |
| **TOTAL**            | **6,300**     | -   | -         | **$2,646** |

_Conservative estimates; actual results will vary by season, weather, event type._

---

_Document created: January 28, 2026_
_Status: Visual flows complete, ready for design team_
