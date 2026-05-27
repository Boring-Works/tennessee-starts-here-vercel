# Annual Data Maintenance Checklist

**Rocky Mount State Historic Site - Tennessee Starts Here**

This guide outlines the annual data maintenance schedule to keep site content fresh and accurate with minimal effort.

---

## Quick Overview

- **Estimated annual time:** 2-3 hours
- **Best time to complete:** Late December / Early January
- **Priority levels:** 🔴 Critical, 🟡 Important, 🟢 Nice-to-have

---

## December Tasks (Wrap-up Year)

### 1. 🔴 Finalize Year-End Operational Review

**Due:** December 15

**File(s):** `data/config/operatingSchedule.json`

**What to do:**

- [ ] Confirm all one-off closures for 2026 are recorded
- [ ] Review if any special event scheduling extended hours
- [ ] Check if tour schedule changes occurred (note them for 2027)
- [ ] Verify last event/program dates are accurate

**Time:** 10 minutes

---

### 2. 🔴 Update Testimonials with Year-End Reviews

**Due:** December 20

**File(s):** `data/testimonials.json`

**What to do:**

- [ ] Pull fresh reviews from TripAdvisor (check past 6 months)
- [ ] Pull fresh reviews from Google Reviews
- [ ] Identify 2-3 new featured testimonials
- [ ] Update `stats.tripAdvisor.totalReviews` count
- [ ] Update `stats.google.rating` if it changed
- [ ] Update `_meta.lastUpdated` timestamp

**Time:** 30 minutes

**Optional automation:** Use TripAdvisor API to auto-fetch top-rated reviews

---

### 3. 🟡 Archive Completed Programs

**Due:** December 31

**File(s):** `data/siteInfo.json`

**What to do:**

- [ ] Change `first250.status` from "active" to "archived"
- [ ] Change `america250.status` (in commemorations) to "archived" or "complete"
- [ ] Verify any time-limited programs have end dates set
- [ ] Check if ceremonial events need archiving

**Time:** 5 minutes

---

## January Tasks (Prepare New Year)

### 4. 🔴 Calculate Next Year's Season Dates

**Due:** January 5

**File(s):** `data/config/operatingSchedule.json`

**What to do:**

Use the pattern calculator below to determine 2027 dates:

```
2027 Season Window:
- Start: "First Wednesday of March 2027"
  → March 1, 2027 is Monday
  → First Wednesday = March 3, 2027

- End: "Second Wednesday of December 2027"
  → December 1, 2027 is Thursday
  → First Wednesday = December 1 (no, that's Wed before)
  → First Wed = December 1, Second Wed = December 8, 2027
```

Steps:

- [ ] Use online date calculator or calendar
- [ ] Calculate first-wednesday-march 2027
- [ ] Calculate second-wednesday-december 2027
- [ ] Update `nextYearTemplate` → `seasonalWindow` object
- [ ] Update `currentYear` to 2027
- [ ] Update `_meta.lastUpdated` to current date

**Time:** 10 minutes

**Formula for "first Wednesday of March":**

```
1. Find what day March 1 falls on
2. Count days until first Wednesday:
   - If March 1 = Monday: Wed = March 3
   - If March 1 = Tuesday: Wed = March 2
   - If March 1 = Wednesday: Wed = March 1
   - If March 1 = Thursday: Wed = March 7
   - etc.
```

---

### 5. 🟡 Recalculate Thanksgiving & Christmas Closures

**Due:** January 5

**File(s):** `data/config/operatingSchedule.json`

**What to do:**

These closures use recurrence patterns that change each year:

```
2027 Thanksgiving:
- Pattern: "fourth-thursday-november"
- November 1, 2027 = Monday
- Thursdays: 4, 11, 18, 25
- Fourth Thursday = November 25, 2027
- Closure Window: November 23-27, 2027 (Tue-Sat)

2027 Christmas:
- Fixed pattern: December 21 - January 5
- Example: 2027-12-21 to 2028-01-05
```

Steps:

- [ ] Find what day November 1, 2027 falls on
- [ ] Count to 4th Thursday (Thanksgiving)
- [ ] Calculate closure period (Thanksgiving to Saturday)
- [ ] Update dates in `closures.annual[0]` for 2027
- [ ] Christmas dates follow fixed pattern (Dec 21 - Jan 5)
- [ ] Verify JSON syntax is valid

**Time:** 15 minutes

**Helpful:** Use https://www.timeanddate.com/calendar/ to visualize

---

### 6. 🔴 Update events.json with New Year Events

**Due:** January 15

**File(s):** `data/events.json`

**What to do:**

This is the biggest job. Events must be entered for the full year.

- [ ] Open `data/templates/template-events.json` (recurring events only)
- [ ] Copy all recurring events from template
- [ ] Update dates for 2027 (e.g., "2026-07-04" → "2027-07-04")
- [ ] Add any new special events scheduled
- [ ] Verify all dates fall on Wed-Sat (open days)
- [ ] Verify no events fall during closure windows
- [ ] Check that `date` ≤ `endDate` for multi-day events
- [ ] Run `npm run validate:data` to check for errors
- [ ] Update `_meta.lastUpdated` timestamp
- [ ] Commit with message: "Update events calendar for 2027"

**Time:** 30-45 minutes

**Template events typically include:**

- Colonial Independence Day (July 4)
- First Families Reunion (mid-August)
- Founder's Day (specific date - check records)
- Seasonal events (spring planting, harvest, etc.)

---

### 7. 🔴 Update lectures.json with New Speaker Lineup

**Due:** January 31

**File(s):** `data/lectures.json`

**What to do:**

This requires planning with leadership team about next year's speakers.

- [ ] Confirm number of lectures (typically 6)
- [ ] Secure speaker commitments and availability
- [ ] Collect speaker bios (2-3 sentences)
- [ ] Determine lecture topics and descriptions
- [ ] Schedule dates (must fall on Wed-Sat during season)
- [ ] Update each lecture entry:
  - [ ] `id` (1, 2, 3, 4, 5, 6)
  - [ ] `title` (lecture subject)
  - [ ] `date` (YYYY-MM-DD format)
  - [ ] `time` (HH:MM AM/PM format)
  - [ ] Speaker details (name, title, institution, bio)
  - [ ] `description` (full lecture overview)
  - [ ] `topics` array (3-5 key topics)
- [ ] Run `npm run validate:data` to verify
- [ ] Update `_meta.lastUpdated`
- [ ] Commit with message: "Update lecture series for 2027"

**Time:** 90 minutes

**Tip:** Start outreach in November to finalize by end of January

---

### 8. 🟡 Review & Update Pricing (if needed)

**Due:** January 15

**File(s):** `data/config/operatingSchedule.json`

**What to do:**

- [ ] Consult with management on pricing changes
- [ ] If prices stay same: No action needed
- [ ] If prices increase: Create new tier entries with future dates

**Example: Price increase starting March 2027:**

```json
{
  "id": "adult-2027",
  "label": "Adults",
  "ageMin": 18,
  "ageMax": 64,
  "priceUSD": 13,
  "validFrom": "2027-01-01",
  "validUntil": "2027-12-31",
  "status": "active"
}
```

- [ ] If new tier added, update `lastUpdated` timestamp
- [ ] Run `npm run build` to verify JSON syntax
- [ ] Commit if changes made

**Time:** 10 minutes

---

## Monthly Check-Ins

### Every First Friday of Month

- [ ] Verify upcoming events have correct dates
- [ ] Check if any events conflict with closure windows
- [ ] Scan testimonials.json for any data quality issues
- [ ] Review integration statuses (check API keys aren't expiring)

**Time:** 10 minutes

---

## Quarterly Reviews

### January / April / July / October

**Focus Areas:**

**Q1 (January) - Planning:**

- [ ] Complete annual data refresh (see above)
- [ ] Audit all dates and times
- [ ] Confirm API integrations working

**Q2 (April) - Mid-Year Check:**

- [ ] Pull fresh testimonials
- [ ] Review event attendance/popularity
- [ ] Check if any events need rescheduling

**Q3 (July) - Summer Review:**

- [ ] Update testimonials with summer visitor feedback
- [ ] Monitor tour availability/capacity
- [ ] Plan fall season adjustments

**Q4 (October) - Year-End Prep:**

- [ ] Begin year-end closure planning
- [ ] Collect final event feedback
- [ ] Plan next year's speaker lineup

**Time:** 30 minutes per quarter

---

## Pre-Season Review (February)

**Due:** February 15 (before March opening)

**File(s):** All date-dependent files

**What to do:**

- [ ] Verify March events are all entered and correct
- [ ] Check tour times are accurately calculated
- [ ] Confirm opening day announcement is ready
- [ ] Verify any special opening weekend logistics
- [ ] Test all dynamic date calculations (open hours, tour times, etc.)
- [ ] Run full test suite: `npm run build && npm run validate:data`
- [ ] Create backup of all data files

**Time:** 30 minutes

---

## Post-Season Review (December)

**Due:** December 15

**File(s):** All files

**What to do:**

- [ ] Document year's events and attendance
- [ ] Collect year-end testimonials and feedback
- [ ] Note any operational improvements needed
- [ ] Archive year's data for historical records
- [ ] Prepare summary for annual report

**Time:** 1 hour (optional, for records)

---

## Automation Opportunities

### Already Available

- ✅ `npm run validate:data` - Checks JSON syntax, required fields, date formats
- ✅ `npm run build` - Verifies site builds with all data

### Could Be Automated (Future)

- ⭕ Daily date validation (check events fall on open days)
- ⭕ Weekly testimonials sync (TripAdvisor/Google API pull)
- ⭕ Monthly archive backup (snapshot current state)
- ⭕ GitHub Actions reminders (on-schedule notifications)

---

## File Organization

```
data/
├── siteInfo.json              ← Rarely changes
├── config/
│   └── operatingSchedule.json ← Update annually (main file)
├── events.json                ← Update annually (biggest task)
├── lectures.json              ← Update annually
├── testimonials.json          ← Update quarterly
├── navigation.json            ← Rarely changes
├── experiences.json           ← Rarely changes
├── integrations.json          ← Update as services change
└── templates/
    ├── template-events.json   ← Copy each year
    └── yearlyChecklist.json   ← This file
```

---

## Troubleshooting

### "I missed the deadline, what do I do?"

No problem! The system is designed for flexibility:

1. **If past January 31:** Update dates to whenever you complete the task
2. **If mid-season:** Add events as they occur, backdate if necessary
3. **If approaching season end:** Focus on 2027 prep, don't delay next year

### "I'm unsure about a date pattern"

Use this online tool: https://www.timeanddate.com/calendar/

Search for "March 2027" and count:

- 1st Wed = ?
- 2nd Wed = ?
- 4th Thu = ?

### "Date validation is failing"

Check for:

1. Correct format: `YYYY-MM-DD` (2027-03-03, not 03-03-2027)
2. Dates are logical: startDate ≤ endDate
3. No typos in month/day (03-31 is invalid, February has no 30th)

---

## Contacts & Escalation

**Questions about this process?**

- File lead: Data Architecture team
- Questions about events: Program Director
- Questions about operations: Executive Director

---

## Tips for Success

1. **Use a calendar:** Print a 2027 calendar and mark dates by hand first
2. **Double-check dates:** Verify events fall on Wed-Sat before entering
3. **Test locally:** Run `npm run validate:data` before committing
4. **Create backup:** Copy current JSON to a dated folder before major changes
5. **Document changes:** Write clear commit messages explaining what changed

---

## Sample Commit Messages

Good examples:

```
"Update events calendar for 2027 season"
"Add new lecture series speakers (6 confirmed)"
"Update testimonials with winter visitor feedback"
"Recalculate Thanksgiving 2027 closure dates"
```

---

_Last updated: January 30, 2026_
_Next review due: January 1, 2027_
