# The 1775 Almanac — V2 Roadmap

> **Purpose:** Features requiring user accounts, native apps, or paid infrastructure
> **Created:** January 27, 2026
> **Prerequisite:** User authentication system (Supabase Auth recommended)

---

## Why V2?

These features cannot be built as a pure static web app. They require:

- **User accounts** for personalization and data persistence
- **Native apps** for platform-specific capabilities
- **Backend infrastructure** for notifications, sync, or payments

---

## Account-Dependent Features

### Observation Journal

**Priority:** HIGH (biggest differentiator)
**What:** Users log planting dates, phenology observations, harvest dates, photos
**Why V2:** Data must persist across devices, requires user identity

**Capabilities:**

- Log events: "Planted tomatoes", "First fireflies", "Dogwood blooming"
- Attach photos to entries
- Record frost damage, pest sightings
- System learns: "Last year you planted April 15 when soil was 58°F"
- Community aggregation: "12 users saw first hummingbirds this week"

**Tech:** Supabase (free tier: 50K MAU), IndexedDB for offline draft

---

### Push Notifications

**Priority:** HIGH
**What:** Frost alerts, severe weather, score changes
**Why V2:** Requires service worker + user permission management + backend

**Use cases:**

- "Frost warning tonight - protect tender plants"
- "Sower's Index dropped to 3 - delay planting"
- "Lightning detected within 20 miles"

**Tech:** Web Push API, FCM for native, Supabase Edge Functions for triggers

---

### Offline Mode / Service Worker

**Priority:** MEDIUM
**What:** App works without internet, syncs when connected
**Why V2:** Service worker complexity, sync conflict resolution needs accounts

**Capabilities:**

- Cache last-fetched weather data
- Queue journal entries for sync
- Background sync when connection restored

**Tech:** Workbox, IndexedDB, Background Sync API

---

### Calendar Export (Full)

**Priority:** MEDIUM
**What:** Export frost dates, GDD milestones, planting windows to calendar
**Why V2:** Needs user preferences stored (which crops, reminder timing)

**Capabilities:**

- "Last frost date (April 15) added with 7-day reminder"
- GDD milestone alerts for selected crops
- Recurring seasonal reminders

**Tech:** .ics generation, Google Calendar API, Apple Calendar integration

---

### Commute Weather

**Priority:** LOW
**What:** Conditions at user's commute departure/arrival times
**Why V2:** Requires storing user preferences (commute times, route)

**Example:**

- "Your 7:30 AM commute: 34°F, fog likely"
- "Your 5:30 PM return: 52°F, clear"

---

### Personal Weather Station Integration

**Priority:** LOW (premium feature)
**What:** Connect Davis, Tempest, or Ambient stations for hyperlocal data
**Why V2:** Premium feature, needs account for station linking

**Tech:** Weather Underground API, Open-Meteo PWS, Tempest API

---

### Natural Language Queries

**Priority:** LOW
**What:** "When can I plant tomatoes?" → AI-powered answer
**Why V2:** Needs rate limiting, usage tracking, potential paid tier

**Tech:** Claude API (~$0.003/query), cached responses for common questions

---

## Native App Features

### Apple Watch / Wear OS

**What:** Glanceable workability score on wrist
**Requires:** Native app development (Swift/Kotlin)

**Capabilities:**

- Single score number (1-10) with color
- Tap for detail
- Complications for watch face

---

### iOS/Android Home Screen Widgets

**What:** Native widgets showing current conditions
**Requires:** Native app or advanced PWA support

**Capabilities:**

- Current temp + top workability score
- Alert badge if warnings active
- Tap to open full app

---

## Paid Tiers (Future)

From original spec - NOT implementing now, but preserved for reference:

| Tier                 | Price     | Features                                                         |
| -------------------- | --------- | ---------------------------------------------------------------- |
| **Free**             | $0        | Current conditions, 7-day, scores, NWS alerts, AQI               |
| **Grower**           | $4.99/mo  | Full planting intelligence, journal, 10-day, push notifications  |
| **Steward**          | $9.99/mo  | 14-day outlook, PWS integration, multi-location, voice briefings |
| **Heritage Sponsor** | $100 once | Lifetime Steward, name on supporters page                        |

---

## Implementation Order (When Ready)

1. **User Auth** - Supabase Auth setup
2. **Observation Journal** - Highest user value
3. **Push Notifications** - Retention driver
4. **Offline Mode** - Rural user need
5. **Calendar Export** - Low effort, high utility
6. Everything else based on user feedback

---

## Not Tracked Here

These can be done in V1.x (no accounts needed):

- Voice Briefing (Web Speech API)
- Enhanced Pest Degree Days
- Livestock Heat Stress surfacing
- Basic .ics download
- Print-friendly view
- Best Window Today algorithm

See `TODO-FUTURE.md` for V1.x enhancements.
