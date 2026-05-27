# Quality Framework for Tennessee Starts Here

**Chief Quality Officer:** Dr. Malcolm Wright, PhD
**Version:** 1.0
**Date:** January 30, 2026

---

## Executive Summary for Cody

This document defines what "quality" means for Rocky Mount visitors and establishes the gates your team must pass before shipping any phase of the almanac improvements.

**The bottom line:** Quality is not about code passing tests. Quality is about a grandmother from Memphis being able to decide in 10 seconds whether to drive her grandkids to Rocky Mount today.

---

## Part 1: Visitor Persona Definitions

### Persona 1: Heritage Tourist (80% of visitors)

**Profile: The Hendersons**

- Doug (58) and Linda (56) from Nashville
- Driving 90 minutes to visit with their daughter's family
- Three grandkids ages 4, 8, and 12
- Own an iPhone SE (2022) - smaller screen
- Doug wears reading glasses; Linda has mild arthritis
- Looking for a "meaningful day out that isn't just another playground"

**What they need from the almanac:**

1. "Should we go today?" answered in under 10 seconds
2. Current weather - is it comfortable for outdoor walking?
3. Rain forecast - will we get caught in a storm?
4. Site hours - are they even open?
5. Temperature - should we bring jackets for the kids?

**What they do NOT need:**

- Sower/Shepherd/Keeper/Builder scores
- Burn day indicators
- Soil temperature readings
- Planting intelligence
- Historical weather patterns

**Success scenario:** Linda opens the almanac on her phone while Doug is pumping gas. She sees a green indicator, "Great day to visit - 72 degrees, sunny until 5pm." She tells Doug, "Let's go." Total time: 8 seconds.

---

### Persona 2: Educator Planning Field Trip

**Profile: Mrs. Patricia Coleman**

- 4th grade teacher at Johnson City Elementary
- 34 years teaching experience, age 61
- Planning a field trip for next Thursday (7 days out)
- Needs to justify the trip to principal and notify parents
- Uses an iPad at school, Android phone at home
- Has glaucoma - needs high contrast text

**What she needs from the almanac:**

1. 7-day forecast - will Thursday be safe?
2. Temperature range - what should parents pack?
3. Rain probability - do we need a backup plan?
4. Alert status - any severe weather expected?
5. Confidence level - how reliable is this forecast?

**What she do NOT need:**

- Current conditions (she's planning, not visiting today)
- Real-time radar
- Lightning watch
- Farm intelligence
- Historical proverbs

**Success scenario:** Mrs. Coleman opens the almanac on Monday, checks Thursday's forecast (67 degrees, 10% rain chance, no alerts), screenshots it for her parent email, and confirms the trip. Total time: 90 seconds.

---

### Persona 3: Local Farmer/Gardener (20% of users)

**Profile: Robert "Bobby" Sams**

- Third-generation farmer, 47 years old
- 180 acres in Sullivan County, primarily hay and cattle
- Checks weather daily at 5:30 AM before morning chores
- Uses a beat-up Android phone with cracked screen
- Knows weather patterns intuitively - wants data, not interpretation

**What he needs from the almanac:**

1. Current temperature and "feels like"
2. Precipitation timing - when will rain hit?
3. Wind speed and direction
4. Frost/freeze warnings
5. Burn day status
6. Soil temperature trends
7. Historical comparison (is this normal for January?)

**What he does NOT need:**

- Visitor recommendations
- Site hours
- Governor Blount content
- Heritage theming getting in the way of data

**Success scenario:** Bobby opens the almanac at 5:32 AM, sees the task scores grid (Sower: 3, Shepherd: 8, Builder: 9), notes "no rain until Thursday, frost risk tonight," and closes the app. He knows exactly what work to prioritize. Total time: 15 seconds.

---

## Part 2: The Core Quality Question

Every feature, every design decision, every code change must answer this question:

**"Does this help Doug and Linda decide whether to visit Rocky Mount today?"**

If the answer is yes, proceed.
If the answer is no, ask: "Does this help Bobby plan his farm work?"
If both answers are no, ask: "Why are we building this?"

---

## Part 3: Success Criteria by Persona

### Tourist Success Criteria

| Criteria                         | Measurement                                                     | Target                      |
| -------------------------------- | --------------------------------------------------------------- | --------------------------- |
| Time to answer "Should I visit?" | Stopwatch test, first-time user                                 | < 10 seconds                |
| Comprehension rate               | User testing - can they correctly interpret the recommendation? | > 95%                       |
| Mobile readability               | Text size on smallest iPhone                                    | >= 16px body text           |
| Touch target size                | Minimum interactive element                                     | >= 44x44 pixels             |
| Glare visibility                 | Outdoor brightness test                                         | Readable in direct sunlight |
| Scroll depth to visitor info     | Lines of scrolling on mobile                                    | Zero - above fold           |

### Educator Success Criteria

| Criteria                  | Measurement                            | Target                    |
| ------------------------- | -------------------------------------- | ------------------------- |
| 7-day forecast visibility | Location in mobile hierarchy           | First two screens         |
| Date selection clarity    | Can user quickly scan to specific day? | Yes, within 3 seconds     |
| Screenshot legibility     | Does captured forecast read clearly?   | Yes, full context visible |
| Risk communication        | Clear high/medium/low severity         | Traffic light system      |
| Reliability indicator     | Is forecast confidence communicated?   | Yes, for 5+ days out      |

### Farmer Success Criteria

| Criteria                | Measurement                       | Target                      |
| ----------------------- | --------------------------------- | --------------------------- |
| Task scores visible     | Location in mobile hierarchy      | Above first fold break      |
| Data density            | Key metrics per screen            | >= 6 data points            |
| Update timestamp        | Visibility of last refresh        | Always visible              |
| No "dumbing down"       | Technical terms preserved         | Yes (with optional i icons) |
| Farm section accessible | Scroll depth to Farm Intelligence | <= 3 swipes                 |

---

## Part 4: Quality Gates by Phase

### Phase 1 Quality Gate: Tourist-First Mobile Experience

**Must be TRUE before Phase 1 ships:**

1. **VisitorStatusCard is FIRST component after alerts**
   - Not buried below NowDisplay
   - Not after CompactSevenDay
   - FIRST thing tourists see

2. **10-second rule passes**
   - Tested with 5 real users who have never seen the site
   - All 5 correctly answer "Should I visit today?" in under 10 seconds
   - If any user takes longer, STOP and fix

3. **Touch targets are 44x44 minimum**
   - Every button, link, and interactive element measured
   - No exceptions for "looks better smaller"
   - Specifically: ViewToggle, refresh button, i-icons, collapse toggles

4. **Text passes outdoor readability test**
   - VisitorStatusCard headline visible on phone in direct sunlight
   - Temperature display readable without squinting
   - Color indicators (green/yellow/red) distinguishable to colorblind users

5. **Mobile hierarchy matches tourist priority**
   - Screen 1: Alerts + VisitorStatusCard
   - Screen 2: Current conditions + quick forecast
   - Screen 3: 7-day forecast
   - Screen 4+: Everything else (farmer content, radar, etc.)

6. **Farmer workflows NOT broken**
   - Task scores still accessible without excessive scrolling
   - Farm Intelligence section still functional
   - No functionality removed, only reordered

**Phase 1 Red Flags - STOP SHIPPING if:**

- VisitorStatusCard shows "Poor" when conditions are actually fine
- VisitorStatusCard shows "Excellent" during dangerous weather
- Any touch target measures less than 40x40 pixels
- Text contrast ratio falls below 4.5:1
- Mobile layout breaks on iPhone SE or older Android

---

### Phase 2 Quality Gate: Performance + Heritage Design

**Must be TRUE before Phase 2 ships:**

1. **Page load under 3 seconds on 3G**
   - Measured with Chrome DevTools throttling
   - First Contentful Paint under 1.5 seconds
   - Largest Contentful Paint under 3 seconds

2. **Heritage design feels authentic, not gimmicky**
   - Gold accents used sparingly (1-2 elements per screen)
   - Period typography does not reduce readability
   - No clip art, no cheesy Colonial Williamsburg aesthetics
   - Brand review with Cody: "Does this feel like Rocky Mount?"

3. **Animation does not delay critical information**
   - VisitorStatusCard appears immediately, no "fade in" delay
   - Temperature is readable before any animation completes
   - Users with `prefers-reduced-motion` see no decorative animation

4. **Governor's View is optional, not intrusive**
   - Toggle is discoverable but not prominent
   - Default view is always practical almanac
   - Governor content does not load unless requested

5. **Caching does not show stale data**
   - Cache duration matches API recommendations
   - Clear "last updated" timestamp always visible
   - Manual refresh always fetches fresh data

**Phase 2 Red Flags - STOP SHIPPING if:**

- Lighthouse Performance score drops below 80
- Any animation causes layout shift
- Heritage design elements obscure weather data
- Page takes longer than 5 seconds on slow connection
- Users mistake decorative elements for interactive controls

---

### Phase 3 Quality Gate: Accessibility (WCAG AA)

**Must be TRUE before Phase 3 ships:**

1. **Full keyboard navigation**
   - Tab order follows visual order
   - Focus indicators visible on all interactive elements
   - No keyboard traps
   - Enter/Space activates all buttons

2. **Screen reader compatible**
   - Tested with VoiceOver (iOS/Mac)
   - Tested with NVDA (Windows)
   - All images have meaningful alt text or are marked decorative
   - All charts/graphs have text alternatives
   - Recommendation level announced clearly ("Excellent conditions" not just color)

3. **Color is not the only indicator**
   - Green/yellow/red always paired with text or icon
   - Charts have patterns or labels, not just colors
   - Pass deuteranopia and protanopia simulation

4. **Text scaling supported**
   - Site remains usable at 200% zoom
   - No horizontal scrolling at 200% zoom
   - Text does not overflow containers

5. **Motion preferences respected**
   - `prefers-reduced-motion` disables all non-essential animation
   - Essential animations (loading states) simplified but functional
   - No auto-playing videos or GIFs

**Phase 3 Red Flags - STOP SHIPPING if:**

- WAVE accessibility checker shows any errors (not warnings, errors)
- Screen reader user cannot determine visit recommendation
- Any text falls below 4.5:1 contrast
- Focus indicator is invisible or barely visible
- Any interactive element is unreachable by keyboard

---

### Phase 4 Quality Gate: Server-Side Rendering

**Must be TRUE before Phase 4 ships:**

1. **Initial HTML contains critical content**
   - VisitorStatusCard renders in initial HTML
   - Temperature visible before JavaScript loads
   - Recommendation level readable in view-source

2. **JavaScript failure graceful**
   - If JS fails to load, page still shows weather data
   - If JS fails to hydrate, no broken UI
   - Core information accessible without JavaScript

3. **SEO impact positive**
   - Structured data for weather content
   - Meta tags reflect current conditions
   - Social sharing shows accurate preview

4. **No regression in any prior gates**
   - Phase 1 tests still pass
   - Phase 2 performance maintained or improved
   - Phase 3 accessibility unchanged

**Phase 4 Red Flags - STOP SHIPPING if:**

- Server render shows different content than client
- Hydration causes visible UI flicker
- Page errors when JavaScript is disabled
- Build time exceeds 5 minutes

---

## Part 5: Testing Protocol

### Scenario 1: First-Time Tourist (Critical)

**Setup:**

- Fresh browser, no cookies, no localStorage
- iPhone 13 Mini or iPhone SE
- Outdoor in daylight (not direct sun for v1, direct sun for v2)

**Tasks:**

1. "Look at this page. Should you visit Rocky Mount today?"
2. "Why or why not?"
3. "What's the temperature right now?"
4. "What's the weather going to be like on Saturday?"

**Pass criteria:**

- Task 1: Correct answer in under 10 seconds
- Task 2: Reason matches displayed information
- Task 3: Correct answer in under 5 seconds
- Task 4: Correct answer in under 15 seconds

### Scenario 2: Return Visitor Check-In

**Setup:**

- User has visited the almanac before
- Same device and browser (has localStorage)
- Indoor, normal lighting

**Tasks:**

1. "You visited last month. Is today better or worse?"
2. "What time is the last tour?"
3. "Is there any severe weather expected?"

**Pass criteria:**

- Task 1: User can compare (this requires we show historical context)
- Task 2: User finds answer without leaving almanac (this requires site hours integration)
- Task 3: User correctly identifies alert status in under 5 seconds

### Scenario 3: Educator Planning

**Setup:**

- iPad, landscape orientation
- User is familiar with weather apps but not this almanac

**Tasks:**

1. "You're planning a field trip for next Thursday. Will the weather be okay?"
2. "What should you tell parents to have kids wear?"
3. "Is there any chance of thunderstorms?"

**Pass criteria:**

- Task 1: Clear yes/no with confidence level
- Task 2: Temperature range clearly visible for that day
- Task 3: Thunderstorm probability clearly communicated

### Scenario 4: Farmer Morning Check

**Setup:**

- Android phone, any size
- User is experienced with weather apps and farming

**Tasks:**

1. "What's today's Sower score?"
2. "When is the next rain?"
3. "Is it a good burn day?"
4. "How does today compare to normal?"

**Pass criteria:**

- Task 1: Answer in under 5 seconds
- Task 2: Answer in under 10 seconds
- Task 3: Answer in under 5 seconds
- Task 4: Answer available (Farmer's Memory section)

### Scenario 5: Accessibility Check

**Setup:**

- Screen reader enabled (VoiceOver or NVDA)
- Keyboard only (no mouse)

**Tasks:**

1. "Navigate to the visitor recommendation and tell me what it says"
2. "Find tomorrow's forecast"
3. "Check if there are any weather alerts"

**Pass criteria:**

- All tasks completable without sighted assistance
- Announcement order matches logical reading order
- No information lost to screen reader users

---

## Part 6: Metrics for Measuring Improvement

### Quantitative Metrics

| Metric                           | Baseline | Phase 1 Target | Measurement Method |
| -------------------------------- | -------- | -------------- | ------------------ |
| Time to first meaningful info    | TBD      | < 3 seconds    | Lighthouse FCP     |
| Mobile Lighthouse Score          | TBD      | >= 80          | Lighthouse audit   |
| Accessibility Score              | TBD      | 100            | Lighthouse audit   |
| Bounce rate from almanac         | TBD      | < 40%          | Analytics          |
| Scroll depth (% reaching bottom) | TBD      | > 30%          | Analytics          |
| Average session duration         | TBD      | > 45 seconds   | Analytics          |

### Qualitative Metrics (User Testing)

| Metric                  | Measurement                             | Target                     |
| ----------------------- | --------------------------------------- | -------------------------- |
| Tourist task completion | 5-user test                             | 100% complete Task 1       |
| Farmer satisfaction     | Survey                                  | No regression from current |
| Design perception       | "Does this feel like Rocky Mount?"      | 80% positive               |
| Trust in recommendation | "Would you change plans based on this?" | > 90% say yes              |

---

## Part 7: Red Flags That Trigger "Stop Shipping"

The following issues are **blockers**. If any are present, do not ship:

### Safety Red Flags

1. VisitorStatusCard shows "Excellent" during active severe weather alert
2. VisitorStatusCard shows "Poor" during ideal conditions
3. Alert banner not visible or not prominent
4. Lightning watch data stale by more than 15 minutes during active storms

### Usability Red Flags

1. Any touch target under 40x40 pixels
2. Any text under 14px on mobile
3. Any text contrast under 4.5:1
4. Time to answer "Should I visit?" exceeds 15 seconds in user testing
5. More than 1 user out of 5 misinterprets the recommendation

### Technical Red Flags

1. Page load exceeds 5 seconds on 4G
2. JavaScript error visible in console on page load
3. Layout shift after initial render (CLS > 0.1)
4. API failures not gracefully handled

### Brand Red Flags

1. Cody says "this doesn't feel like Rocky Mount"
2. Heritage elements interfere with readability
3. Site looks like a generic weather app, not a 1775 almanac
4. Gold accents overused (more than 3 accent elements per screen)

---

## Part 8: How I Report to Cody

Cody needs to understand progress without reading code or technical specs. Here's how I'll communicate:

### Weekly Status Format

```
ALMANAC QUALITY REPORT - Week of [DATE]

VISITOR IMPACT SUMMARY:
- [One sentence: What did we improve for tourists this week?]
- [One sentence: What did we improve for farmers this week?]
- [One sentence: What risk did we reduce?]

QUALITY GATE STATUS:
Phase 1: [READY / BLOCKED / IN PROGRESS]
Phase 2: [READY / BLOCKED / IN PROGRESS]
Phase 3: [READY / BLOCKED / IN PROGRESS]
Phase 4: [READY / BLOCKED / IN PROGRESS]

BLOCKERS:
- [List any red flags currently present]

USER TESTING:
- Tourists: [X/5 passed 10-second test]
- Farmers: [Satisfaction score or "not yet tested"]

RECOMMENDATION:
[Ship Phase X / Hold Phase X / More testing needed]
```

### Example Report

```
ALMANAC QUALITY REPORT - Week of January 30, 2026

VISITOR IMPACT SUMMARY:
- Tourists now see "Should I visit?" answer above the fold on mobile
- Farmers can still access task scores without extra scrolling
- Touch targets on all critical buttons now meet 44x44 standard

QUALITY GATE STATUS:
Phase 1: IN PROGRESS (needs user testing)
Phase 2: NOT STARTED
Phase 3: NOT STARTED
Phase 4: NOT STARTED

BLOCKERS:
- VisitorStatusCard not yet integrated into almanac page
- Need 5-user test to verify 10-second rule

USER TESTING:
- Tourists: Not yet tested
- Farmers: Not yet tested

RECOMMENDATION:
Complete VisitorStatusCard integration, then run user tests before shipping Phase 1.
```

---

## Part 9: Current State Analysis

Based on my review of the existing codebase, here are my observations:

### What's Working Well

1. **VisitorStatusCard exists and is well-designed**
   - Clear traffic light system (green/yellow/red)
   - Accessible with proper ARIA labels
   - Mobile-responsive
   - Good headlines: "Excellent conditions," "Fair conditions - visit with caution," etc.

2. **Recommendation logic is sound**
   - Temperature thresholds are reasonable (65-75 ideal, 50-85 acceptable)
   - Considers alerts, wind, precipitation
   - Clear severity scoring system

3. **Farmer content is comprehensive**
   - Task scores, Farmer's Memory, Native Pulse
   - Planting Intelligence, Environmental Watch
   - Burn day indicator

4. **Site data is centralized**
   - `siteInfo.json` has hours, admission, accessibility info
   - Easy to keep in sync with actual site operations

### Current Issues

1. **VisitorStatusCard is not integrated into the main almanac page**
   - The component exists but is NOT rendered in `almanac/page.tsx`
   - There's a TODO comment: "Visitor Status Card (placeholder - Mei building this)"
   - This is the #1 priority to fix

2. **Mobile hierarchy serves farmers, not tourists**
   - Current order: QuickActions -> NowDisplay -> CompactSevenDay -> HourlySparkline
   - Farmer's Memory is in a collapsible deck
   - Task scores are prominent
   - Tourist-first would be: VisitorStatusCard -> Current conditions -> 7-day

3. **No site hours integration in almanac**
   - VisitorStatusCard has `isSiteAccessible` logic but it's placeholder
   - No mention of "Open Wed-Sat 10am-5pm"
   - Tourist doesn't know if site is even open today

4. **Governor content may confuse tourists**
   - ViewToggle offers "almanac" vs "governor" views
   - What is "Governor's View"? Will tourists understand?
   - Risk: tourists click it, get brass instruments, are confused

5. **Touch targets need verification**
   - Many elements use `min-h-[44px]` which is good
   - But some may not have 44px width
   - ViewToggle buttons appear small

### Immediate Recommendations

1. **Integrate VisitorStatusCard NOW**
   - Add it to the mobile layout after QuickActions
   - This is blocking all other Phase 1 work

2. **Add site hours to VisitorStatusCard**
   - Pull from `siteInfo.json`
   - Show "Open today 10am-5pm" or "Closed today (open Wed-Sat)"
   - If closed, recommendation should factor this in

3. **Reconsider ViewToggle naming**
   - "almanac" vs "governor" is insider language
   - Consider "Today's Weather" vs "Period Instruments"
   - Or hide Governor view behind settings

4. **Run touch target audit**
   - Measure every interactive element
   - Document any under 44x44

---

## Part 10: My Commitment

As Chief Quality Officer, I commit to:

1. **Representing visitors who will never see this document**
   - Every decision through their eyes
   - No feature ships without user testing

2. **Protecting Cody's brand**
   - Rocky Mount deserves better than a generic weather app
   - But heritage theming cannot compromise usability

3. **Being the voice that says "not yet"**
   - If quality gates aren't met, I will block the ship
   - I would rather delay than disappoint visitors

4. **Translating technical work into visitor impact**
   - Cody doesn't need to understand the code
   - Cody needs to understand what it means for guests

5. **Holding the line on accessibility**
   - This isn't optional
   - Every visitor deserves to use this tool

---

## Appendix A: VisitorStatusCard Integration Checklist

```
Before VisitorStatusCard can ship:

[ ] Component added to almanac/page.tsx mobile layout
[ ] Position: After QuickActions, before NowDisplay
[ ] Props passed correctly:
    - temperature={weather.current.temperature}
    - weatherCode={weather.current.weatherCode}
    - hasAlerts={hasActiveAlert}
    - windSpeed={weather.current.windSpeed}
    - precipitation={weather.current.precipitation}
[ ] Site hours integrated (shows if site is open today)
[ ] Tested on iPhone SE (375px width)
[ ] Tested on iPhone 14 Pro Max (430px width)
[ ] Tested with screen reader
[ ] Colors visible in bright light
[ ] 5-user test completed
[ ] All 5 users answer "Should I visit?" correctly in <10 seconds
```

---

## Appendix B: User Testing Script

### Introduction (read to participant)

"Thank you for helping us today. We're testing a weather tool for Rocky Mount State Historic Site. I'm going to ask you to look at a screen and answer some questions. There are no wrong answers - we're testing the tool, not you. Please think out loud as you work."

### Task 1: Visit Decision

"Imagine you're planning a trip to Rocky Mount today. Look at this screen and tell me: Should you visit today? Take your time."

[Start timer when screen is shown]
[Stop timer when participant gives answer]
[Record: answer, time, confidence level, any confusion]

### Task 2: Reasoning

"What made you decide that?"

[Record: Did they cite the correct information? Did they misread anything?]

### Task 3: Temperature

"What's the temperature right now?"

[Start timer]
[Record: answer, time, correct/incorrect]

### Task 4: Extended Forecast

"What's the weather going to be like on [pick a day 3-5 days out]?"

[Start timer]
[Record: answer, time, correct/incorrect, how they found it]

### Debrief

"How would you describe this tool to a friend?"
"Was anything confusing?"
"What would make this more useful for you?"

---

## Appendix C: Accessibility Audit Checklist

### Keyboard Navigation

- [ ] Can tab through all interactive elements
- [ ] Tab order matches visual order
- [ ] Focus indicator visible on all elements
- [ ] Can activate buttons with Enter/Space
- [ ] No keyboard traps
- [ ] Skip link present for main content

### Screen Reader

- [ ] Page title announced
- [ ] Headings properly nested (h1 > h2 > h3)
- [ ] All images have alt text or aria-hidden
- [ ] Form inputs have labels
- [ ] Recommendation level announced (not just color)
- [ ] Live regions announce dynamic updates
- [ ] No duplicate announcements

### Visual

- [ ] Color contrast >= 4.5:1 for text
- [ ] Color contrast >= 3:1 for large text
- [ ] Color not sole indicator of meaning
- [ ] Text readable at 200% zoom
- [ ] Focus indicators visible
- [ ] No text over busy backgrounds

### Motion

- [ ] Respects prefers-reduced-motion
- [ ] No essential info in animation only
- [ ] No auto-playing video/audio
- [ ] Parallax can be disabled

---

_This document is a living standard. It will be updated as we learn more from user testing and as the product evolves._

**Approved by:** Dr. Malcolm Wright, PhD - Chief Quality Officer
**Date:** January 30, 2026
