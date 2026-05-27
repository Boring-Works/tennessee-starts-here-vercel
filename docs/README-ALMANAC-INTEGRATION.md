# Almanac Marketing Integration - Complete Documentation

**Status:** Design Complete | Ready for Implementation
**Created:** January 28, 2026
**Owner:** Rocky Mount Marketing & Product Team

---

## What Is This?

A comprehensive strategy to transform the 1775 Almanac (weather utility at `/almanac`) into Rocky Mount's most effective daily marketing touchpoint.

**The Idea in One Sentence:**
When visitors check the weather and see "Perfect conditions for exploring outside," we show them Rocky Mount and its events.

---

## Document Map

This project is documented in 5 complementary documents:

### 1. **ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md** (START HERE)

- High-level overview
- Business case & ROI projections
- 4 features explained simply
- Success metrics & timeline
- Risk mitigation
- Decision checklist for leaders

**Read this if:** You're deciding whether to green-light the project

---

### 2. **ALMANAC-MARKETING-INTEGRATION.md** (DESIGN BIBLE)

- Complete strategic design
- 4 features with detailed specifications
- Copy guidelines & brand alignment
- Technical architecture notes
- Conversion flow explanations
- Social media strategy

**Read this if:** You're building the features or need to understand the full vision

---

### 3. **ALMANAC-IMPLEMENTATION-CHECKLIST.md** (DEVELOPMENT GUIDE)

- Phase-by-phase breakdown
- Task checklists (4 phases over 6 weeks)
- Component specifications
- File-by-file implementation guide
- QA testing matrix
- Pre-launch checklist
- Rollout plan

**Read this if:** You're a developer implementing the features

---

### 4. **ALMANAC-CONVERSION-FLOWS.md** (USER JOURNEY MAPS)

- 4 detailed conversion flows (visual + narrative)
- Flow 1: Weather condition → Tour booking
- Flow 2: Daily habit → Loyalty unlock → Booking
- Flow 3: Social share → Discovery → Booking
- Flow 4: Event countdown → FOMO → Booking
- Expected conversion rates & metrics

**Read this if:** You want to understand the user psychology & expected results

---

### 5. **ALMANAC-COPY-LIBRARY.md** (COPYWRITING REFERENCE)

- All copy templates by feature
- Seasonal variations (Spring, Summer, Fall, Winter)
- Insider achievement messaging
- Social sharing copy variants
- Hashtag strategy
- Copy-to-code mapping
- Do's and Don'ts

**Read this if:** You're writing or reviewing copy for the features

---

## The Four Features (Quick Reference)

### Feature 1: EventWeatherCard

**What:** Card showing "Perfect touring weather today"
**Where:** Mobile (below forecast), Desktop (ROW 2)
**Trigger:** 65-75°F, sunny, <10mph wind
**Expected CTR:** 8-12%
**Expected Monthly Revenue:** $1,080

### Feature 2: UpcomingEventCard

**What:** Countdown showing "7 days until [Event]"
**Where:** Mobile (after 7-day), Desktop (ROW 2 right)
**Trigger:** Featured event <= 30 days away
**Expected CTR:** 10-15%
**Expected Monthly Revenue:** $1,350

### Feature 3: Almanac Insider Program

**What:** 3-tier loyalty (5 days → 15 days → 4 seasons)
**Where:** TopBar badge + modal on unlock
**Trigger:** Automatic based on visit frequency
**Rewards:** Discount → Early access → Gala invite
**Expected Monthly Revenue:** $500-800

### Feature 4: Social Sharing Hooks

**What:** Enhanced ShareButton with Rocky Mount context
**Where:** ShareButton component (existing location)
**Trigger:** Seasonal variants + event-specific hooks
**Expected CTR:** 3-5%
**Expected Monthly Revenue:** $250-300

---

## Implementation Timeline

```
Week 1-2: Phase 1 (Core Cards)
├─ EventWeatherCard.tsx
├─ UpcomingEventCard.tsx
├─ Updated ShareButton
└─ Deploy to staging

Week 3-4: Phase 2 (Loyalty System)
├─ AlmanacInsiderTracker.ts
├─ Achievement Modals
├─ InsiderBadge component
└─ Full QA cycle

Week 5: Phase 3 (Social Hooks)
├─ Seasonal copy templates
├─ Hashtag suggestions
└─ Optional: Photo modal

Week 6+: Phase 4 (Optimization)
├─ GTM analytics setup
├─ A/B testing framework
└─ Continuous monitoring
```

---

## Key Files to Create

```
components/almanac/
├── EventWeatherCard.tsx
├── UpcomingEventCard.tsx
├── InsiderBadge.tsx
├── AchievementModal.tsx
└── SharePhotoModal.tsx (optional)

lib/
├── almanac/
│   ├── eventMatching.ts
│   ├── forecastMatching.ts
│   └── insiderProgress.ts
├── events.ts (new helper file)
└── copy/
    └── almanac-integration.ts (new constants file)

hooks/
└── useAlmanacInsider.ts

docs/
├── ALMANAC-MARKETING-INTEGRATION.md ✓
├── ALMANAC-IMPLEMENTATION-CHECKLIST.md ✓
├── ALMANAC-CONVERSION-FLOWS.md ✓
├── ALMANAC-COPY-LIBRARY.md ✓
└── ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md ✓
```

---

## Critical Success Factors

### 1. Context Matters

Cards only show when genuinely useful. Never feel spammy or intrusive.

### 2. Brand Consistency

All copy follows Rocky Mount's approved brand guidelines (COPY.md). No STOP phrases.

### 3. Data Accuracy

Forecasts must be current, event information must be accurate, no promise breaking.

### 4. Performance

Cards add <1% to page weight. Load time unchanged. Responsive on all devices.

### 5. Testability

All new code is unit-testable. Conversion flows are traceable via UTM params.

---

## Success Metrics Dashboard

Create a monitoring dashboard with these key metrics:

### Conversion Metrics

```
EventWeatherCard
├─ Daily impressions (expected: 30-50)
├─ Click-through rate (target: 8-12%)
├─ Destination: /events (80%), /visit (20%)
└─ Booking rate: 20-25% of clickers

UpcomingEventCard
├─ Daily impressions (expected: 30-50)
├─ Click-through rate (target: 10-15%)
├─ Peak CTR: 7 days before event (15-20%)
└─ Booking rate: 25-30% of clickers

Insider Program
├─ Tier 1 unlock rate (target: 40%)
├─ Tier 1 redemption rate (target: 50-60%)
├─ Tier 2 unlock rate (target: 15%)
├─ Tier 2 booking rate (target: 40-50%)
└─ Tier 3 unlock rate (target: 5%)

Social Sharing
├─ Share rate (target: 8-12%)
├─ Click-through rate from tweets (target: 3-5%)
└─ Booking rate from social (target: 10-15%)
```

### Business Metrics

```
Monthly Revenue
├─ Direct attributable bookings
├─ Attributed shop purchases
└─ Total: Target $2,600-3,200/month

Customer Acquisition
├─ CAC from Almanac channel: ~$15-20
├─ CLV from Almanac visitors: ~$200-300
└─ Payback period: 2-3 months

Engagement
├─ Repeat visitors (7-day): Target 35%
├─ Session time: Target +30 sec avg
└─ Insider retention: Track Tier 1 → 2 progression
```

---

## Quality Assurance Checklist

Before launch:

- [ ] All new components tested on mobile (375px), tablet (768px), desktop (1440px)
- [ ] ESLint: 0 errors, 0 warnings
- [ ] Lighthouse score >= 85
- [ ] Accessibility: WAVE scan, axe DevTools pass
- [ ] Copy reviewed against COPY.md (no STOP phrases)
- [ ] All links open correct destinations
- [ ] localStorage doesn't exceed 5MB
- [ ] Forecast API calls properly cached
- [ ] Share buttons work on Twitter, Facebook, LinkedIn
- [ ] Achievement modals appear at correct triggers
- [ ] UTM parameters on all links
- [ ] Director approval of copy & design

---

## Post-Launch Monitoring (First 30 Days)

**Daily Checks:**

- [ ] Page load time (should be unchanged)
- [ ] JavaScript errors in console
- [ ] Cards displaying correctly (different weather scenarios)
- [ ] Clicks are tracked in analytics

**Weekly Reviews:**

- [ ] Total impressions vs. expected
- [ ] Click-through rates by card type
- [ ] Conversion rates from click → booking
- [ ] User feedback (support tickets, reviews)

**Monthly Review (After Month 1):**

- [ ] Total revenue attributed to Almanac channel
- [ ] Compare actual vs. projected ROI
- [ ] Identify underperforming copy
- [ ] Plan optimizations for Phase 2

---

## Frequently Asked Questions

**Q: Will this distract from the Almanac's main purpose?**
A: No. Cards are optional, contextual, and can be dismissed. The weather data is still the primary focus.

**Q: What if weather doesn't match triggering conditions?**
A: Cards won't show. That's fine—bad weather days have lower visit intent anyway.

**Q: Can we disable cards instantly if they underperform?**
A: Yes. Feature flags can turn cards on/off immediately. No code deploy needed.

**Q: How do we know which cards drive bookings?**
A: UTM parameters track which card the visitor came from. Attribution is trackable in Google Analytics.

**Q: What's the cost of this project?**
A: ~$0 out-of-pocket (uses existing APIs). 180-240 developer hours (4-6 weeks of work).

**Q: How long until we see ROI?**
A: Break-even at ~$3,000 revenue. Conservative projections: Month 3-4. Optimistic: Month 2-3.

**Q: What if Insider program feels like spam?**
A: Lead with prestige (Tier 3 gala), not discount. Be transparent about tracking. Make opt-out easy.

**Q: Can we personalize cards by location?**
A: Yes, in Phase 2. We already know visitor location (from weather lookups). Could show nearby events.

---

## Ownership & Accountability

| Role                 | Responsibility                                   |
| -------------------- | ------------------------------------------------ |
| **Product Lead**     | Feature roadmap, success metrics, approval       |
| **Development Lead** | Technical implementation, code review, timeline  |
| **Design Lead**      | Component mockups, visual consistency, QA        |
| **Content Lead**     | Copy writing, brand alignment, A/B test variants |
| **Analytics**        | UTM setup, dashboard creation, metric reporting  |
| **Director (Cody)**  | Final approval, strategic alignment, budget      |

---

## Related Documents

- `/docs/COPY.md` — Brand guidelines (required reading)
- `/docs/DATA-STANDARDS.md` — Event data schema
- `/docs/STYLE-GUIDE.md` — Visual design system
- `/docs/PROJECT.md` — Technical specifications
- `/data/events.json` — Event data source

---

## Version History

| Date       | Version | Status      | Notes                           |
| ---------- | ------- | ----------- | ------------------------------- |
| 2026-01-28 | 1.0     | Draft       | Initial design complete         |
| TBD        | 1.1     | In Review   | Director & stakeholder feedback |
| TBD        | 2.0     | Final       | Approved for development        |
| TBD        | 3.0     | Post-Launch | Updates after Phase 1           |

---

## Next Action Items

**If you're the Director (Cody):**

1. Read ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md
2. Review success metrics & ROI projections
3. Decide: Green light or iterate?
4. If green light: Assign developer and designer

**If you're the Developer:**

1. Read ALMANAC-IMPLEMENTATION-CHECKLIST.md
2. Skim ALMANAC-MARKETING-INTEGRATION.md for context
3. Check ALMANAC-COPY-LIBRARY.md for copy templates
4. Set up development environment
5. Begin Phase 1

**If you're the Designer:**

1. Read ALMANAC-MARKETING-INTEGRATION.md (Features section)
2. Review ALMANAC-CONVERSION-FLOWS.md (User journeys)
3. Check existing Almanac components for design patterns
4. Create mockups for:
   - EventWeatherCard (3 variants)
   - UpcomingEventCard (4 timing variants)
   - InsiderBadge & Achievement Modals
5. Deliver to developer with design specs

**If you're the Content Lead:**

1. Read ALMANAC-COPY-LIBRARY.md
2. Review copy against COPY.md (brand guidelines)
3. Create seasonal variants (Spring, Summer, Fall, Winter)
4. Draft event-specific hooks for featured events
5. Prepare hashtag strategy for social team

---

## Getting Help

- **Questions about strategy?** → Read ALMANAC-MARKETING-INTEGRATION.md
- **Questions about implementation?** → Read ALMANAC-IMPLEMENTATION-CHECKLIST.md
- **Questions about copy?** → Read ALMANAC-COPY-LIBRARY.md
- **Questions about conversion flow?** → Read ALMANAC-CONVERSION-FLOWS.md
- **Need quick overview?** → Read ALMANAC-MARKETING-EXECUTIVE-SUMMARY.md

---

## Final Thought

The Almanac is Rocky Mount's most-visited standalone page after the homepage. Converting even 1% of daily visitors into paying customers could generate $30,000-40,000 annually.

This strategy does that—not through aggressive ads, but through helpful suggestions at the exact moment visitors are making outdoor decisions.

**It's native advertising done right: helpful utility + timely suggestions = genuine value, not interruption.**

---

_Created by: Claude Code (Assistant)_
_For: Rocky Mount State Historic Site_
_Project: Tennessee Starts Here Initiative_
_License: Internal Use Only_
