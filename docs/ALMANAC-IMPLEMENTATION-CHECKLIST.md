# Almanac Marketing Integration - Implementation Checklist

**Scope:** 4 Phases, ~6 weeks of development
**Priority:** All Phase 1 items before Phase 2

---

## Phase 1: Core Event-to-Weather Integration (Week 1-2)

### Component: EventWeatherCard.tsx

- [ ] Create component skeleton with TypeScript interface
- [ ] Implement trigger rule logic (weather condition matching)
  - [ ] Rule 1: 65-75°F, sunny, <10mph wind (Optimal green)
  - [ ] Rule 2: 65-75°F, humidity <60% (Optimal green)
  - [ ] Rule 3: <20% rain, clear skies (Optimal green)
  - [ ] Rule 4: 50-65°F or 75-85°F, low wind (Good blue)
  - [ ] Rule 5: Frost risk ≤36°F (Low amber)
- [ ] Design card UI (3 visual variants: optimal, good, fair)
- [ ] Write copy templates (6 variations per variant type)
- [ ] Add call-to-action button with href logic
- [ ] Integrate with existing weather state in page.tsx
- [ ] Position on mobile (below NextChangeHero)
- [ ] Position on desktop (ROW 2, between NOW/7-day and Cards)
- [ ] Test with 5+ different weather scenarios
- [ ] Add analytics event tracking (optional: GTM tag)

**Files to Create:**

- `components/almanac/EventWeatherCard.tsx`
- `lib/almanac/eventMatching.ts` (trigger logic)

**Files to Modify:**

- `app/(almanac)/almanac/page.tsx` (import + render)

### Component: UpcomingEventCard.tsx

- [ ] Create component skeleton with TypeScript interface
- [ ] Add logic to fetch next featured event from events.json
- [ ] Implement countdown logic (daysUntil calculation)
- [ ] Integrate with existing weather API forecast
- [ ] Match event date to 7-day forecast array index
- [ ] Write copy templates for 4 scenarios (3+ weeks, 2 weeks, 7 days, today)
- [ ] Design card with event image/icon
- [ ] Add booking CTA button (href to ticketUrl or /events)
- [ ] Position on mobile (after CompactSevenDay)
- [ ] Position on desktop (ROW 2, right side)
- [ ] Test with 5+ upcoming events
- [ ] Verify forecast accuracy for future dates

**Files to Create:**

- `components/almanac/UpcomingEventCard.tsx`
- `lib/almanac/forecastMatching.ts` (event → forecast lookup)
- `lib/events.ts` (getNextFeaturedEvent, getFeaturedEvents helpers)

**Files to Modify:**

- `app/(almanac)/almanac/page.tsx` (import + render)
- `data/events.json` (verify "featured" field exists on all events)

### Component: Updated ShareButton

- [ ] Audit current ShareButton implementation
- [ ] Add Rocky Mount hook to share template
- [ ] Add hashtag suggestions based on season/weather
- [ ] Update Twitter share text
- [ ] Update Instagram share text (if applicable)
- [ ] Test share flow on Twitter, Facebook, LinkedIn
- [ ] Verify link UTM parameters (utm_source=almanac&utm_medium=share)

**Files to Modify:**

- `components/almanac/ShareButton.tsx`
- `lib/copy/brand.ts` (add event-specific hooks)
- `lib/copy/sayings.ts` (seasonal message templates)

### QA & Testing (Phase 1)

- [ ] Test all 5 EventWeatherCard trigger rules
- [ ] Verify UpcomingEventCard displays correct countdown
- [ ] Confirm share buttons include Rocky Mount mentions
- [ ] Mobile responsive testing (375px, 640px widths)
- [ ] Desktop responsive testing (1024px, 1440px widths)
- [ ] Accessibility audit (ARIA labels, contrast ratios)
- [ ] Performance: Page load time unchanged (<3% variance)
- [ ] Check localStorage permissions (if Insider system enabled)

---

## Phase 2: Almanac Insider Loyalty System (Week 3-4)

### Helper: AlmanacInsiderTracker.ts

- [ ] Create state interface (visits, achievements, seasons)
- [ ] Implement localStorage read/write logic
  - [ ] Function: initializeInsiderProgress()
  - [ ] Function: recordDailyVisit()
  - [ ] Function: getConsecutiveDayCount()
  - [ ] Function: getDaysIn30Days()
  - [ ] Function: checkSeasonVisited(season)
  - [ ] Function: getUnlockedAchievements()
- [ ] Add achievement unlock detection
  - [ ] Tier 1: consecutiveDays === 5
  - [ ] Tier 2: daysIn30Days >= 15 && unlockedAt null
  - [ ] Tier 3: seasonsVisited.length === 4
- [ ] Implement reset logic (annually on Jan 1)
- [ ] Add data export function (for privacy requests)
- [ ] Test with manual date manipulation

**Files to Create:**

- `lib/almanac/insiderProgress.ts`

### Hook: useAlmanacInsider.ts

- [ ] Create custom React hook
  - [ ] Function: useAlmanacInsider()
  - [ ] Returns: { progress, achievements, unlocks, recordVisit() }
- [ ] Integrate with useEffect on page mount
- [ ] Fetch achievements on first load
- [ ] Track daily visits automatically
- [ ] Expose unlock trigger to parent component

**Files to Create:**

- `hooks/useAlmanacInsider.ts`

### Component: InsiderBadge.tsx

- [ ] Create badge component for TopBar
- [ ] Show only if consecutive days > 0
- [ ] Display progress ring (5-day forecaster)
- [ ] On unlock, animate with bounce effect
- [ ] Clickable to show achievement details
- [ ] Add tooltip: "Check forecast X more days to unlock"

**Files to Create:**

- `components/almanac/InsiderBadge.tsx`

**Files to Modify:**

- `components/almanac/TopBar.tsx` (import InsiderBadge)
- `app/(almanac)/almanac/page.tsx` (pass tracking callback)

### Component: AchievementModal.tsx

- [ ] Create modal with 3 variants (Tier 1, 2, 3)
- [ ] Tier 1 variant: "5-Day Forecaster"
  - [ ] Show discount code (generated or static)
  - [ ] Copy-to-clipboard button
  - [ ] Instructions: "Valid for 365 days"
  - [ ] CTA: [Claim Now] button
- [ ] Tier 2 variant: "Committed Watcher"
  - [ ] List unlocked early-access events
  - [ ] Show next available exclusive event
  - [ ] CTA: [View Exclusive Events] link to /events?exclusive=true
  - [ ] Option to decline
- [ ] Tier 3 variant: "Keeper of the Ground"
  - [ ] Mention invitation-only gala
  - [ ] Preview exclusive First Families content
  - [ ] Email capture field (optional)
  - [ ] CTA: [Accept Invitation]
- [ ] Animation: Slide up from bottom, backdrop blur
- [ ] Dismissible: Click outside, Escape key

**Files to Create:**

- `components/almanac/AchievementModal.tsx`

### Integration

- [ ] Trigger modal on useAlmanacInsider hook unlock
- [ ] Pass trigger callback from page.tsx to hook
- [ ] Store "redeemed" state in localStorage
- [ ] Prevent showing same modal twice per session

**Files to Modify:**

- `app/(almanac)/almanac/page.tsx` (modal state management)

### QA & Testing (Phase 2)

- [ ] localStorage state persists across sessions
- [ ] Badge appears on day 1 visit
- [ ] Progress ring updates correctly (0-5 days)
- [ ] Modal triggers on day 5, day 15, after 4 seasons
- [ ] Consecutive day counter resets on missed day
- [ ] 30-day rolling window calculates correctly
- [ ] Season detection works (Mar-May = Spring, etc.)
- [ ] Reset on Jan 1 clears all progress
- [ ] Discount code is shareable (users can share in email)
- [ ] Achievement state doesn't show previously unlocked items

---

## Phase 3: Social Media Hooks & Sharing (Week 5)

### Update ShareButton Component

- [ ] Add seasonal hook logic to share text
  - [ ] Spring (Mar-May): Garden/planting theme
  - [ ] Summer (Jun-Aug): Adventure/America 250 theme
  - [ ] Fall (Sep-Nov): Harvest/gathering theme
  - [ ] Winter (Dec-Feb): Candlelight/warmth theme
- [ ] Add hashtag suggestion pill buttons (up to 4)
- [ ] Update Twitter text to include #TennesseeStartsHere
- [ ] Test character count (< 280 chars)
- [ ] Verify link shortening (bit.ly or native Twitter)
- [ ] Add UTM params: utm_source=almanac&utm_medium=social&utm_campaign=sharing

**Files to Modify:**

- `components/almanac/ShareButton.tsx`
- `lib/copy/sayings.ts` (add seasonal hooks)

### Optional: Photo Share Modal

**Scope:** Lower priority, implement if time permits

- [ ] Create modal: "Where will you explore today?"
- [ ] Radio buttons: Rocky Mount, hiking trail, park, other
- [ ] Generate pre-filled tweet based on selection
- [ ] Show preview of tweet before sending
- [ ] Track which option selected (optional analytics)

**Files to Create:**

- `components/almanac/SharePhotoModal.tsx`

**Files to Modify:**

- `app/(almanac)/almanac/page.tsx` (modal trigger logic)

### Copy Library Updates

- [ ] Add seasonal message templates to `lib/copy/sayings.ts`
- [ ] Add event-specific hooks to `lib/copy/brand.ts`
- [ ] Verify all copy aligns with brand guidelines
- [ ] Run STOP phrase audit on all new copy

**Files to Modify:**

- `lib/copy/brand.ts` (event hooks)
- `lib/copy/sayings.ts` (seasonal templates)

### QA & Testing (Phase 3)

- [ ] Seasonal hooks change correctly (Jan-Mar uses spring hook)
- [ ] Tweet text is < 280 characters
- [ ] Hashtags are clickable/searchable on Twitter
- [ ] Link opens to correct Rocky Mount URL
- [ ] Photo modal generates correct tweet preview
- [ ] Social sharing analytics (if enabled) captures clicks

---

## Phase 4: Optimization & Monitoring (Ongoing)

### Analytics & Metrics Setup

- [ ] Enable GTM tracking for EventWeatherCard clicks
- [ ] Enable GTM tracking for UpcomingEventCard clicks
- [ ] Enable GTM tracking for ShareButton clicks
- [ ] Enable GTM tracking for achievement unlocks
- [ ] Create dashboard: Almanac → Events conversion funnel
- [ ] Create dashboard: Insider tier progression (Tier 1, 2, 3 rates)
- [ ] Set up alerts for: Low CTR (<5%), High abandonment

### Data Collection (if Supabase enabled)

- [ ] Create table: almanac_card_interactions
  - [ ] Columns: user_session_id, card_type, clicked_at, click_destination
- [ ] Create table: insider_achievements
  - [ ] Columns: user_session_id, tier, unlocked_at, redeemed_at
- [ ] Daily export of metrics to CSV (optional)

### Performance Monitoring

- [ ] Monitor page load impact of new components
- [ ] Verify localStorage doesn't exceed 5MB
- [ ] Check forecast API call frequency (cache properly)
- [ ] Monitor memory usage in long-lived browser sessions

### A/B Testing Setup (Optional)

- [ ] Variant A: EventWeatherCard below NextChangeHero (control)
- [ ] Variant B: EventWeatherCard after CompactSevenDay (test)
- [ ] Run for 2 weeks, measure CTR difference
- [ ] Implement winner

### Seasonal Copy Updates

- [ ] January: Winter/early spring hooks
- [ ] March: Spring planting theme
- [ ] June: America 250 / summer adventure
- [ ] September: Fall harvest / back-to-school
- [ ] November: Holiday/candlelight theme

---

## Pre-Launch Checklist

### Code Quality

- [ ] All new components have TypeScript interfaces
- [ ] No `any` types (unless unavoidable)
- [ ] All functions documented with JSDoc
- [ ] ESLint passes with 0 errors
- [ ] Prettier formatting applied
- [ ] No console statements in production code
- [ ] All imports are used

### Testing

- [ ] Unit tests for: eventMatching.ts, forecastMatching.ts, insiderProgress.ts
- [ ] Component tests for: EventWeatherCard, UpcomingEventCard, AchievementModal
- [ ] Integration test: Full flow (visit → card → click → /events)
- [ ] Mobile: iOS Safari, Android Chrome
- [ ] Desktop: Chrome, Firefox, Safari, Edge
- [ ] Accessibility: WAVE scan, axe DevTools, manual ARIA check

### Brand & Copy

- [ ] Copy review against COPY.md guidelines
- [ ] STOP phrase audit (no "Cobb Mansion", "Hallowed Ground", etc.)
- [ ] Event-specific hooks reviewed by director
- [ ] Social media hashtags approved

### Performance

- [ ] Lighthouse score >= 85
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Page load time with cards: < 5% slower than baseline

### Security

- [ ] localStorage data is non-sensitive (no PII, tokens)
- [ ] Share URLs properly escaped (no XSS)
- [ ] No hardcoded API keys
- [ ] Discount codes generated securely (not sequential)

### Documentation

- [ ] README updated with new card explanations
- [ ] Component documentation: /docs/components/ALMANAC-CARDS.md
- [ ] Copy library documented: /docs/COPY-LIBRARY.md
- [ ] localStorage schema documented: /docs/INSIDER-SCHEMA.md

---

## Rollout Plan

### Internal Testing (3 days)

- [ ] Deploy to staging
- [ ] Team QA (dev, design, content)
- [ ] Director approval
- [ ] Fix any critical bugs

### Soft Launch (7 days)

- [ ] Deploy to production with feature flag disabled
- [ ] Enable for 25% of traffic (cookie-based)
- [ ] Monitor for errors, slow pages
- [ ] Collect initial feedback

### Full Launch (1 week)

- [ ] Roll out to 100% of traffic
- [ ] Update marketing: Email newsletter, social mentions
- [ ] Announce insider program via blog post
- [ ] Monitor metrics continuously

### Post-Launch (Ongoing)

- [ ] Weekly metric reviews (CTR, unlock rate, engagement)
- [ ] Seasonal copy updates (every 3 months)
- [ ] Bug fixes (on-demand)
- [ ] Feature requests (prioritize for Q2)

---

## Development Notes

### Key Decisions

1. **No Backend Required** (Phase 2)
   - All insider tracking via localStorage
   - No user accounts needed
   - Privacy-friendly (no data collection)

2. **Forecast Accuracy** (Phase 1)
   - Only show 7+ day forecasts for events < 14 days out
   - For distant events, use generic seasonal language
   - Add disclaimer: "Forecast subject to change"

3. **Card Visibility Logic** (Phase 1)
   - Max 1 card active per session
   - Hide card for 24h after click
   - EventWeatherCard takes priority over UpcomingEventCard

4. **Copy Tone**
   - Never pushy or spammy
   - Always tie back to weather utility
   - Lead with value (perfect conditions) before asking (visit us)

### Known Risks & Mitigations

| Risk                                 | Mitigation                                   |
| ------------------------------------ | -------------------------------------------- |
| Card fatigue                         | Contextual triggering only, hide after click |
| Insider system feels cheap           | Lead with Tier 3 prestige, not discount      |
| Social sharing doesn't drive traffic | Use as brand metric, not conversion KPI      |
| Forecast accuracy for future events  | Generic language for >14 days, update daily  |
| localStorage limits                  | Max ~4KB per user (well within limit)        |

---

## Post-Implementation Review

**Schedule:** 4 weeks after Phase 1 launch

- [ ] Review conversion metrics (target: 8-12% EventWeatherCard CTR)
- [ ] Review engagement metrics (target: 40% Tier 1 unlock rate)
- [ ] Collect user feedback via survey (optional)
- [ ] Identify any copy that underperforms
- [ ] Plan Phase 2 launch date

---

_Updated: January 28, 2026_
_Owner: Development Team_
