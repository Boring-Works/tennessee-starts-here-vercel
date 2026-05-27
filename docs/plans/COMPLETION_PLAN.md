# TENNESSEE STARTS HERE — COMPLETION PLAN
**Created:** January 29, 2026
**Status:** 90% Complete — Final Polish & Sullivan County Positioning

---

## EXECUTIVE STATUS

### ✅ WHAT'S ALREADY DONE (90%)

**All Core Pages Built:**
- ✅ Welcome screen (cinematic splash)
- ✅ Homepage (/home)
- ✅ Visit page with hours, pricing, accessibility
- ✅ Programs page (recently launched)
- ✅ Events page (26 events in 2026)
- ✅ Lectures page
- ✅ Our Story page
- ✅ **Explore page** (Regional Heritage Trail — FULLY BUILT)
- ✅ Evidence section (library, people, documents, collections, timeline)
- ✅ Educators page
- ✅ Groups page
- ✅ Support page
- ✅ First 250 campaign page
- ✅ 1775 Almanac (weather utility)

**Components & Infrastructure:**
- ✅ OriginalSevenMap component (interactive SVG)
- ✅ Navigation (8-item nav with /explore included)
- ✅ Brand copy system (lib/copy/)
- ✅ Data system (siteInfo.json, events.json, lectures.json)
- ✅ Three itineraries on /explore (half-day, full-day, weekend)
- ✅ Sister sites grid (all 5 THC partner sites)
- ✅ Nearby attractions
- ✅ Visitor resources (lodging, dining)

---

## 🎯 WHAT NEEDS TO FINISH (10%)

### PHASE 1: SULLIVAN COUNTY POSITIONING (Weeks 1-2)
**Goal:** Add Original Seven / Sullivan County language to homepage & key touchpoints

#### 1.1 Homepage Hero Enhancement
**File:** `app/(main)/home/page.tsx`

**Add after line 106 (eyebrow text):**
```tsx
<p className="text-[11px] uppercase tracking-[0.3em] text-accent/80 font-medium animate-fade-in animation-delay-100">
  Sullivan County · Original Seven Counties
</p>
```

**OR integrate into existing eyebrow:**
```tsx
<p className="text-[11px] uppercase tracking-[0.3em] text-accent/80 font-medium animate-fade-in animation-delay-100">
  Sullivan County, Tennessee · First Federal Seat West of the Appalachians
</p>
```

**Strategic framing:** "The ground endures, county lines changed" (Washington County → Sullivan County boundary issue addressed)

#### 1.2 Brand Copy Updates
**File:** `lib/copy/narratives.ts`

**Update MYSTERY_NARRATIVE.hero to include Sullivan County:**
```typescript
hero: {
  badge: 'Tennessee 230 · America 250',
  eyebrow: 'Sullivan County · Original Seven Counties', // ADD THIS
  headline: 'ROCKY MOUNT',
  subhead: "Where Tennessee's government began.",
  // ... rest stays same
}
```

#### 1.3 Footer Micro-Copy
**Consider adding to footer/header:**
```
"Anchor of the Original Seven Counties Heritage Trail"
"Sullivan County's Capital Grounds"
```

**Impact:**
- Establishes Sullivan County identity without erasing Washington County history
- Positions Rocky Mount as regional heritage hub (THC Network strategy)
- Supports county tourism partnership goals

---

### PHASE 2: INTEGRATION POLISH (Weeks 2-3)
**Goal:** Finish external service integrations mentioned in strategic docs

#### 2.1 FareHarbor Integration
**Status:** Smart ticket URLs exist (`lib/data/ticketUrl.ts`)
**Gap:** Verify default booking flow works for events with `requiresTicket: true`

**Test:**
1. Book a test ticket through FareHarbor default URL
2. Confirm ticket confirmation emails work
3. Verify analytics tracking (if configured)

**File to check:** `lib/data/ticketUrl.ts`

#### 2.2 NeonCRM Integration (Support Page)
**Status:** Unknown if implemented
**Check:** `app/(main)/support/page.tsx`

**Verify:**
- [ ] Donation forms embed correctly
- [ ] First 250 enrollment links to NeonCRM form
- [ ] Support page CTAs functional

**If missing:** Add NeonCRM embedded donation form or link to external form

#### 2.3 Email Signup (First 250)
**Check:** `app/(main)/first-250/page.tsx`

**Verify:**
- [ ] Email signup form exists
- [ ] Form submits to NeonCRM or email service
- [ ] Confirmation message displays

---

### PHASE 3: DATA VALIDATION (Week 3)
**Goal:** Ensure all JSON data is complete and accurate

#### 3.1 Run Data Validator
```bash
cd /Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here
npm run validate:data
```

**Fix any:**
- Events on closed days (site closed Sun-Tue)
- Missing ticket URLs for ticketed events
- Incorrect dates or times
- Missing event descriptions

#### 3.2 Sister Sites Data Audit
**File:** `data/siteInfo.json` (lines 161-201)

**Verify:**
- [ ] All 5 THC sites have correct:
  - Website URLs (live & working)
  - Driving times from Rocky Mount
  - Descriptions match current branding
- [ ] Nearby attractions accurate
- [ ] Hours/pricing current for 2026 season

---

### PHASE 4: CONTENT POLISH (Week 4)
**Goal:** Refine copy, fix typos, ensure brand consistency

#### 4.1 Copy Audit Checklist
- [ ] Homepage hero — compelling, clear, consistent with brand.ts
- [ ] All CTAs use approved BUTTONS constants from lib/copy/brand.ts
- [ ] No orphaned "lorem ipsum" or placeholder text
- [ ] Consistent capitalization (Rocky Mount vs. rocky mount)
- [ ] All dates formatted as "June 13-14, 2026" (not 6/13/26)

#### 4.2 Image Audit
**Check all pages for:**
- [ ] Hero images load correctly
- [ ] Alt text descriptive (not "image.jpg")
- [ ] Images optimized (< 200KB per image)
- [ ] Next.js Image component used (not <img>)

#### 4.3 Accessibility Check
- [ ] All headings in semantic order (h1 → h2 → h3)
- [ ] All form inputs have labels
- [ ] Color contrast meets WCAG AA standards
- [ ] Skip links functional
- [ ] Keyboard navigation works on all pages

---

### PHASE 5: PRE-LAUNCH TESTING (Week 5)
**Goal:** Test everything before marketing push

#### 5.1 Cross-Browser Testing
**Test in:**
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & iOS)
- [ ] Edge
- [ ] Firefox

**Test scenarios:**
- [ ] Book a ticket
- [ ] Navigate all 8 nav items
- [ ] View /explore map on mobile
- [ ] Submit First 250 enrollment
- [ ] Check Almanac weather loads

#### 5.2 Performance Audit
```bash
npm run build
npm run start

# Lighthouse audit
# Target scores:
# Performance: 90+
# Accessibility: 95+
# SEO: 100
```

**Fix any:**
- Images not lazy-loading
- Unused JavaScript
- Missing meta descriptions
- Slow API calls

#### 5.3 Analytics Setup
**Verify:**
- [ ] Google Analytics installed (if desired)
- [ ] Event tracking configured for:
  - Ticket purchases
  - First 250 signups
  - External link clicks (sister sites)
  - Almanac usage

---

### PHASE 6: LAUNCH READINESS (Week 6)
**Goal:** Final deployment checklist

#### 6.1 Deployment Checklist
- [ ] All env variables set in Vercel
- [ ] Production domain configured (tennesseestartshere.com)
- [ ] SSL certificate active
- [ ] Redirects configured:
  - www → non-www (or vice versa)
  - / → /home or keep welcome screen
- [ ] 404 page styled to match brand
- [ ] robots.txt configured
- [ ] sitemap.xml generated

#### 6.2 Content Freeze
**Before launch:**
- [ ] Final copy approved by director
- [ ] All events.json dates verified
- [ ] Sister sites contacted about cross-promotion
- [ ] THC notified of launch (partnership courtesy)

#### 6.3 Marketing Assets Ready
- [ ] Social media graphics (announcing launch)
- [ ] Email announcement (to mailing list)
- [ ] Press release (optional)
- [ ] QR codes for site visitors → /explore page

---

## TIMELINE SUMMARY

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| **Phase 1** | Weeks 1-2 | Sullivan County positioning on homepage |
| **Phase 2** | Weeks 2-3 | Integrations verified (FareHarbor, NeonCRM) |
| **Phase 3** | Week 3 | Data validation complete |
| **Phase 4** | Week 4 | Content polished, images optimized |
| **Phase 5** | Week 5 | Cross-browser testing complete |
| **Phase 6** | Week 6 | **LAUNCH** 🚀 |

**Total Time:** 6 weeks to polish and launch
**Current Status:** 90% complete (core build done, polish remaining)

---

## PRIORITY LEVELS

### 🔴 MUST-HAVE (Launch Blockers)
1. Sullivan County positioning on homepage ← **Strategic priority**
2. Data validator run + fixes
3. FareHarbor ticket URLs tested
4. Cross-browser testing (Chrome, Safari minimum)
5. SSL certificate active on production

### 🟡 SHOULD-HAVE (Launch Week)
1. NeonCRM donation forms working
2. First 250 email signup functional
3. Accessibility audit complete
4. Performance Lighthouse > 90
5. Analytics tracking configured

### 🟢 NICE-TO-HAVE (Post-Launch)
1. Advanced Almanac features (multi-county, archives)
2. Event weather widget integration
3. Heritage Trail Pass program (mentioned in strategic docs)
4. QR code system for on-site visitors
5. Educator resource downloads (PDF lesson plans)

---

## STRATEGIC ALIGNMENT

### How This Completes the Three Strategic Documents:

| Document | What Was Planned | What's Implemented | What's Left |
|----------|-----------------|-------------------|-------------|
| **BUILD_PLAN.md** | Almanac MVP, Explore page, Events | ✅ All built | Data validation, integrations |
| **WEBSITE_STRATEGY.md** | Evidence Room, Sister Sites, Regional Hub | ✅ Evidence section complete, /explore live | Sullivan County positioning |
| **SITE-REDESIGN.md** | 41-page comprehensive site | ✅ 23 pages built, streamlined nav | Content polish, testing |

**Reconciliation:** The implementation chose a **hybrid approach** — comprehensive features (Evidence, Explore, Almanac) with streamlined navigation (8 items instead of 41). This was the right call.

---

## RISK MITIGATION

### Potential Blockers & Solutions

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| FareHarbor API issues | Low | High | Test early in Phase 2, have backup manual booking |
| Sullivan County copy takes too long | Medium | Low | Pre-written copy ready in Phase 1 |
| Performance issues on mobile | Low | Medium | Lighthouse audit in Phase 5, optimize images |
| Data validation errors | Medium | Low | Run validator weekly starting now |
| THC partner site URLs broken | Low | Medium | Verify all external links in Phase 3 |

---

## SUCCESS METRICS

**Launch Definition (What "Done" Means):**
1. ✅ All 8 nav pages live and functional
2. ✅ Sullivan County positioning visible on homepage
3. ✅ Data validator passes with 0 errors
4. ✅ Tickets purchasable via FareHarbor
5. ✅ Site loads < 3 seconds on mobile
6. ✅ Accessible via tennesseestartshere.com
7. ✅ Zero console errors in production

**Post-Launch Goals (First 90 Days):**
- 10,000+ unique visitors
- 100+ First 250 enrollments
- 500+ ticket purchases
- 1,000+ Almanac daily users
- 50+ cross-site visits (Rocky Mount → Sister Sites)

---

## NEXT IMMEDIATE STEPS

### Week 1 Action Items:
1. ✅ Review this completion plan
2. 🟡 Add Sullivan County language to homepage hero (1 hour)
3. 🟡 Run `npm run validate:data` and fix errors (2 hours)
4. 🟡 Test FareHarbor ticket flow end-to-end (1 hour)
5. 🟡 Verify all sister site URLs are live (30 min)

**Total Time This Week:** ~5 hours to complete critical path items

---

## APPENDIX: FILES TO EDIT

### For Sullivan County Positioning (Phase 1):
```
app/(main)/home/page.tsx (line 106)
lib/copy/narratives.ts (hero.eyebrow)
components/Navigation.tsx (optional tagline update)
```

### For Data Validation (Phase 3):
```
data/events.json
data/siteInfo.json
data/lectures.json
```

### For Integrations (Phase 2):
```
app/(main)/first-250/page.tsx
app/(main)/support/page.tsx
lib/data/ticketUrl.ts
```
