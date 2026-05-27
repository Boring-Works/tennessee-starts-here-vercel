# The 1775 Almanac — V1.x Enhancements

> **Purpose:** Features that can be added to the web app WITHOUT user accounts
> **Created:** January 26, 2026
> **Updated:** January 27, 2026

**For features requiring accounts/native apps, see:** `V2-ROADMAP.md`

---

## High Priority (V1.1)

### Voice Briefing

**What:** Audio summary of today's conditions using Web Speech API
**Effort:** LOW (client-side, no backend)
**Why:** Hands-free access for users getting ready or driving

**Example output:**

> "Good morning. Sower's Index is 8 - great day for planting. Outdoor Alert is 6 - mild heat this afternoon. Soil temperature is 62 degrees. No frost risk for 7 days."

**Tech:** Web Speech Synthesis API (free, browser-native)

---

### Best Window Today

**What:** Scan hourly forecast to find optimal work windows
**Effort:** MEDIUM (new scoring logic)
**Why:** Actionable - tells users WHEN to work, not just IF

**Example:**

> "Best planting window: 9 AM - 1 PM (Score: 9)"
> "Avoid: 3 PM - 6 PM (Heat stress)"

---

### Livestock Heat Stress Display

**What:** Surface THI calculation more prominently
**Effort:** LOW (code exists, just UI work)
**Why:** Directly serves farmers/ranchers

**Already have:**

```
THI = 0.8 × T + (RH/100) × (T - 14.4) + 46.4
```

**Add guidance:**

- Cattle: THI > 72 = reduced feed intake
- Poultry: THI > 80 = mortality risk
- Pigs: THI > 75 = heat stress

---

### Enhanced Pest Degree Days

**What:** User selects crops, app shows pest timing
**Effort:** MEDIUM (UI for crop selection, more pest data)
**Why:** $500/year ag-tech feature for free

**Current:** Basic GDD tracker
**Enhanced:** "Squash vine borer risk begins in ~3 weeks (900 GDD on March 15)"

---

## Medium Priority (V1.2)

### Basic Calendar Download

**What:** Download .ics file with frost dates, GDD milestones
**Effort:** LOW (generate file, no backend)
**Why:** Simple utility, no account needed

**Note:** Full calendar integration with user preferences is V2

---

### Print-Friendly View

**What:** Single-page printable "Today's Briefing"
**Effort:** MEDIUM (CSS print styles)
**Why:** Visitor center staff requested printed handouts

---

### Dynamic OG Image Generation

**What:** Shareable social cards with current weather stats
**Effort:** MEDIUM (edge function or canvas rendering)
**Why:** Social sharing / marketing

---

## Lower Priority

### Rocky Mount Pantry Integration

**What:** Weather-triggered product suggestions
**Blocked by:** Pantry catalog needs to be finalized
**When:** Once Pantry has consistent seasonal inventory

**Spec:**

- Freezing (<32°F): Warming products
- Rainy: Comfort foods
- Hot (>88°F): Refreshing items

---

### Custom Subdomain

**What:** `1775.rockymountmuseum.com` or `almanac.rockymountmuseum.com`
**Effort:** LOW (DNS + Vercel config)
**When:** Before major marketing push

---

## Technical Debt

### Rate Limiting on API Routes

**What:** Prevent abuse of `/api/*` endpoints
**Effort:** LOW-MEDIUM
**Options:** Vercel KV, Upstash, IP-based limiting

### Maskable PWA Icons

**What:** Create `icon-maskable-192.png` and `icon-maskable-512.png`
**Effort:** LOW (design task)
**Why:** Better PWA installation experience on Android

---

## Notes

- These features are NOT blockers for V1.0 launch
- Revisit quarterly based on user feedback
- Voice Briefing is highest priority for V1.1
- See `V2-ROADMAP.md` for account-dependent features
