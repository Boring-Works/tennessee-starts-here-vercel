# Almanac Marketing Integration - Quick Reference Card

**Print this. Post it. Reference it daily.**

---

## The 4 Features (At a Glance)

### Feature 1: EventWeatherCard ☀️

**Trigger:** Perfect touring weather (65-75°F, sunny, <10mph)
**Message:** "Perfect touring weather today. See what's on."
**CTR Target:** 8-12%
**Revenue:** $1,080/month

### Feature 2: UpcomingEventCard 📅

**Trigger:** Featured event <= 30 days away
**Message:** "7 days until [Event]. Perfect forecast for attending."
**CTR Target:** 10-15%
**Revenue:** $1,350/month

### Feature 3: Insider Program 🏆

**Trigger:** Visit frequency (Day 5 → Day 15 → 4 seasons)
**Rewards:** Discount → Early Access → Gala Invite
**Key Metric:** 40% Tier 1 unlock rate
**Revenue:** $500-800/month

### Feature 4: Social Hooks 📢

**Trigger:** ShareButton click + seasonal context
**Message:** "Perfect weather—perfect for exploring Rocky Mount"
**Share Rate:** 8-12%
**Revenue:** $250-300/month

---

## Copy Golden Rules

✓ **DO:**

- Lead with value ("Perfect weather for...") first
- Use real data (temp, condition, wind)
- Mention Rocky Mount, not buildings
- Use urgent time language ("7 days", "this week")
- Connect weather to activity

✗ **DON'T:**

- Say "Cobb Mansion" (use "Cobb House")
- Say "Tennessee's first capital" (inaccurate)
- Use CAPS for emphasis
- Compare to competitors
- Promise what you can't deliver

---

## Feature Positioning

**Mobile:**

```
┌─────────────────────────────┐
│      Weather Hero           │
│    [NOW: 72°F, Sunny]       │
├─────────────────────────────┤
│   [EventWeatherCard]        │  ← Perfect touring weather
├─────────────────────────────┤
│   Next Change Sparkline     │
├─────────────────────────────┤
│    Task Scores (Sower...)   │
├─────────────────────────────┤
│   CompactSevenDay           │
├─────────────────────────────┤
│ [UpcomingEventCard]         │  ← 7 days until...
└─────────────────────────────┘
```

**Desktop:**

```
┌─────────────────────────────────────────────────────────────┐
│                     ROW 1: Above the Fold                   │
│  [NOW Display]  [Next Change + Hourly]  [Quick Actions]    │
├─────────────────────────────────────────────────────────────┤
│                     ROW 2: Planning                          │
│ [Tomorrow]  [7-Day]  [EventWeatherCard]  [UpcomingEventCard]
├─────────────────────────────────────────────────────────────┤
│ ... rest of Almanac                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Conversion Funnel

```
100 daily Almanac visitors
        ↓
10 see EventWeatherCard (right conditions)
        ↓
1 clicks EventWeatherCard (10% CTR)
        ↓
/events page
        ↓
0.2 complete booking (20% conversion)
        ↓
✓ BOOKED - $25-50 revenue
```

---

## Success Metrics (Monthly)

| Metric                       | Target           | Alarm       |
| ---------------------------- | ---------------- | ----------- |
| EventWeatherCard impressions | 3,000            | <2,000      |
| EventWeatherCard CTR         | 10%              | <7%         |
| UpcomingEventCard CTR        | 12%              | <8%         |
| Total attributed bookings    | 80-100           | <50         |
| **Total revenue**            | **$2,600-3,200** | **<$1,500** |

---

## Implementation Timeline

```
Week 1-2: EventWeatherCard + UpcomingEventCard
        ↓
Week 3-4: Insider Loyalty System
        ↓
Week 5: Social Sharing Hooks
        ↓
Week 6+: Optimization & A/B Testing
```

---

## Copy by Season

| Season     | Hook                    | Example                                                                         |
| ---------- | ----------------------- | ------------------------------------------------------------------------------- |
| **Spring** | Gardens & planting      | "Garden weather calls for exploring Rocky Mount's heritage crops."              |
| **Summer** | Adventure & America 250 | "Perfect summer weather. Perfect historic grounds. Perfect July 4 destination." |
| **Fall**   | Harvest & gathering     | "Harvest time means gathering. Join us for Harvest Fest."                       |
| **Winter** | Candlelight & warmth    | "Candlelight was all they had. Now it brings wonder."                           |

---

## Troubleshooting

| Problem                        | Solution                                        |
| ------------------------------ | ----------------------------------------------- |
| Cards not showing              | Check weather trigger conditions                |
| Low CTR (<5%)                  | Review copy, test different position            |
| Insider unlocks not triggering | Check localStorage state, verify visit tracking |
| Social shares declining        | Update seasonal copy, check hashtag relevance   |
| Page load slow                 | Verify forecast API caching, check card render  |

---

## Key Files

```
NEW:
├── components/almanac/EventWeatherCard.tsx
├── components/almanac/UpcomingEventCard.tsx
├── lib/almanac/eventMatching.ts
├── lib/almanac/insiderProgress.ts

MODIFIED:
├── components/almanac/ShareButton.tsx
├── app/(almanac)/almanac/page.tsx
├── lib/copy/brand.ts

REFERENCE:
├── docs/COPY.md (brand guidelines)
├── data/events.json (event data)
```

---

## Launch Checklist

- [ ] All components built & tested
- [ ] Copy reviewed against COPY.md
- [ ] Analytics tracking configured (UTM params)
- [ ] Mobile & desktop responsive testing
- [ ] Accessibility audit passed
- [ ] Director approval granted
- [ ] Deploy to staging
- [ ] 24-hour production monitoring
- [ ] Soft launch (25% traffic) for 1 week
- [ ] Full launch (100% traffic)

---

## ROI Math

```
100 daily visitors
× 30 days
= 3,000 monthly visits

3,000 visits × 10% (avg CTR)
= 300 card clicks

300 clicks × 22% (avg booking rate)
= 66 bookings

66 bookings × $40 (avg ticket)
= $2,640/month

$2,640 × 12 months
= $31,680/year

Initial investment: ~$8,000 (dev time)
Payback: 3 months
Year 1 net: $23,680
```

---

## Red Flags (Pause & Investigate)

🚨 EventWeatherCard CTR below 5%
🚨 Page load time increased >5%
🚨 User feedback: "Ads feel spammy"
🚨 Insider unlock rate below 20%
🚨 Share button clicks declining
🚨 Booking conversion below 15%

---

## Team Contacts

**Questions about:**

- **Strategy?** → See ALMANAC-MARKETING-INTEGRATION.md
- **Implementation?** → See ALMANAC-IMPLEMENTATION-CHECKLIST.md
- **Copy?** → See ALMANAC-COPY-LIBRARY.md
- **Conversion flows?** → See ALMANAC-CONVERSION-FLOWS.md

---

## Key Insight

> The Almanac serves 100-150 daily visitors who are literally checking weather for outdoor activities. We're not interrupting them; we're suggesting perfect timing. That's not marketing—that's service.

---

_Bookmark this. Reference it. Keep it updated._
