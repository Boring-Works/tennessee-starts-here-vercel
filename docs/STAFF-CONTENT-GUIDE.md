# Staff Content Guide

**For Rocky Mount staff updating website content via GitHub**

This guide shows you how to update website content by editing simple JSON files. No coding required - just follow the templates inside each file.

---

## Quick Links to Editable Files

| What to Update           | File to Edit                                                                  | How Often               |
| ------------------------ | ----------------------------------------------------------------------------- | ----------------------- |
| **Events & Programs**    | [`data/events.json`](../data/events.json)                                     | As events are scheduled |
| **Lecture Series**       | [`data/lectures.json`](../data/lectures.json)                                 | When lectures are added |
| **Visitor Testimonials** | [`data/testimonials.json`](../data/testimonials.json)                         | Monthly                 |
| **Hours & Admission**    | [`data/siteInfo.json`](../data/siteInfo.json)                                 | Annually or as needed   |
| **Operating Schedule**   | [`data/config/operatingSchedule.json`](../data/config/operatingSchedule.json) | Annually in January     |
| **Educator Programs**    | [`data/educatorPrograms.json`](../data/educatorPrograms.json)                 | As programs change      |
| **Membership Tiers**     | [`data/membership.json`](../data/membership.json)                             | Annually                |
| **Group Visit Info**     | [`data/groups.json`](../data/groups.json)                                     | As policies change      |
| **Historical Timeline**  | [`data/timeline.json`](../data/timeline.json)                                 | Rarely                  |
| **Visitor Experiences**  | [`data/experiences.json`](../data/experiences.json)                           | As tours change         |
| **Navigation Menu**      | [`data/navigation.json`](../data/navigation.json)                             | When adding pages       |

---

## How to Edit Files on GitHub

### Step-by-Step:

1. **Go to the file** - Click a link above or navigate to the `data/` folder
2. **Click the pencil icon** (Edit) in the top right corner
3. **Find the `_templates` section** in the file - copy a template
4. **Paste and fill in your details** following the `_meta.fieldGuide` explanations
5. **Scroll down** and click **"Commit changes"**
6. **Website updates automatically** in ~2 minutes

### Important: Every File Has Built-In Help!

Each JSON file contains:

- **`_meta.staffInstructions`** - What this file controls and how to edit it
- **`_meta.fieldGuide`** - What each field means with examples
- **`_meta.rules`** - Important constraints (don't break these!)
- **`_meta.commonMistakes`** - What to avoid
- **`_templates`** - Ready-to-copy examples

**Always read the `_meta` section before editing!**

---

## Most Common Tasks

### Adding a New Event

**File:** `data/events.json`

1. Open the file and scroll to `_templates`
2. Copy the appropriate template:
   - `simpleEvent` - Free events
   - `ticketedEvent` - Paid events
   - `multiDayEvent` - Festivals spanning multiple days
   - `lectureEvent` - Lectures (also add to lectures.json!)
3. Paste it into the `events` array
4. Fill in your details
5. Keep events sorted by date (earliest first)

**Key Rules:**

- Events must be on **Wed, Thu, Fri, or Sat** (our open days)
- Prices are in **CENTS** (multiply dollars by 100: $12 = `1200`)
- Date format: **YYYY-MM-DD** (example: `2026-05-15`)

---

### Adding a Testimonial

**File:** `data/testimonials.json`

1. Open the file and find `_templates`
2. Copy the `featuredTestimonial` template
3. Add it to the `featured` array (shows on homepage)
4. Or add to `byCategory` (archive only)

**Key Rules:**

- Only use **verified real quotes** - never fabricate
- Keep quotes **under 100 words**
- Valid sources: `TripAdvisor`, `Google Reviews`, `Facebook`

---

### Updating Prices (Annual Task)

**Files to update:**

1. `data/siteInfo.json` - Display prices
2. `data/config/operatingSchedule.json` - Pricing tiers

Both files have a `_priceUpdateChecklist` in the `_meta` section. Follow it step by step.

**Key Rules:**

- `siteInfo.json` prices are in **DOLLARS** ($12 = `12`)
- `operatingSchedule.json` prices are in **DOLLARS** ($12 = `12`)
- `events.json` prices are in **CENTS** ($12 = `1200`)

---

### Adding a Closure (Staff Training Day, etc.)

**File:** `data/config/operatingSchedule.json`

1. Find `_closureTemplates` in the file
2. Copy the appropriate template:
   - `staffTrainingDay` - Single day closure
   - `weatherClosure` - Emergency weather
   - `specialEventClosure` - Private event
3. Add it to `closures.oneOff` array
4. Fill in the dates and reason

---

### Updating Membership Tiers

**File:** `data/membership.json`

The file contains:

- `tiers` - The membership levels and prices
- `faqs` - Frequently asked questions
- `comparisonFeatures` - The comparison table

**Key Rules:**

- Membership prices are in **DOLLARS** (not cents)
- Only one tier should have `featured: true`
- Update FAQs when policies change

---

### Updating Educator Programs

**File:** `data/educatorPrograms.json`

Contains:

- `programs` - Each program offering
- `highlights` - The "TN Standards Aligned" badges
- `funding` - Grant information
- `bookingInfo` - Contact details

**Key Rules:**

- Prices are in **CENTS** per student ($6 = `600`)
- Keep program IDs unique
- Update funding sources annually

---

### Updating Group Rates

**File:** `data/groups.json`

Contains:

- `rates` - Pricing tiers for different group sizes
- `types` - Types of groups we serve
- `whatToKnow` - Policies and logistics
- `includes` - What's included in group visits
- `addOns` - Optional extras

**Key Rules:**

- Group prices are in **DOLLARS** (not cents)
- Keep rates sorted by minimum group size

---

## January Annual Checklist

Every January, update these files for the new year:

### 1. Operating Schedule (`data/config/operatingSchedule.json`)

- [ ] Update `currentYear`
- [ ] Update `seasonalWindow.year` and dates
- [ ] Calculate new Thanksgiving dates
- [ ] Update `pricingSchedule` dates if prices change
- [ ] Clear old one-off closures

### 2. Site Info (`data/siteInfo.json`)

- [ ] Update admission prices if changed
- [ ] Update any contact info changes
- [ ] Review hours text

### 3. Membership (`data/membership.json`)

- [ ] Update tier prices if changed
- [ ] Review FAQs for accuracy

### 4. Events (`data/events.json`)

- [ ] Archive previous year's events
- [ ] Add confirmed events for new year

---

## Price Format Quick Reference

| File                     | Format  | Example for $12.00 |
| ------------------------ | ------- | ------------------ |
| `events.json`            | CENTS   | `1200`             |
| `educatorPrograms.json`  | CENTS   | `1200`             |
| `siteInfo.json`          | DOLLARS | `12`               |
| `operatingSchedule.json` | DOLLARS | `12`               |
| `membership.json`        | DOLLARS | `12`               |
| `groups.json`            | DOLLARS | `12`               |

---

## Date Format

**Always use:** `YYYY-MM-DD`

| Correct      | Wrong               |
| ------------ | ------------------- |
| `2026-05-15` | `05/15/2026`        |
| `2026-12-20` | `December 20, 2026` |
| `2026-03-04` | `3/4/26`            |

---

## What Updates Where on the Website

| When You Change...       | These Pages Update                           |
| ------------------------ | -------------------------------------------- |
| `events.json`            | Events page, Homepage booking card, Calendar |
| `lectures.json`          | Lectures page, Events page                   |
| `testimonials.json`      | Homepage carousel, Visit page carousel       |
| `siteInfo.json`          | Footer, Visit page, Contact info everywhere  |
| `operatingSchedule.json` | Open/Closed banner on ALL pages              |
| `educatorPrograms.json`  | Educators page                               |
| `membership.json`        | Membership page, Support page                |
| `groups.json`            | Groups page                                  |

---

## Common Mistakes to Avoid

| Mistake                      | How to Fix                                 |
| ---------------------------- | ------------------------------------------ |
| Missing comma after an entry | Add `,` after `}` if another entry follows |
| Wrong date format            | Use `YYYY-MM-DD` like `2026-05-15`         |
| Event price in dollars       | Use cents: $12 = `1200`                    |
| Membership price in cents    | Use dollars: $100 = `100`                  |
| Event on closed day          | Schedule for Wed-Sat only                  |
| Forgot quotes around text    | All text needs `"quotes"`                  |
| Duplicate ID                 | Each `id` must be unique in its file       |

---

## Validation

The website automatically checks your changes when you commit. If something is wrong, you'll see an error message in GitHub.

To check locally before committing (optional):

```bash
npm run validate:data
```

---

## Need Help?

- **Technical issues:** Contact Cody
- **Content questions:** Look at existing entries for examples
- **Validation errors:** Read the error message - it tells you exactly what's wrong
- **Not sure what to change:** Read the `_meta.staffInstructions` in each file

---

---

## FareHarbor Booking Integration

### Connecting Events to FareHarbor Tickets

**File:** `data/events.json` (has `fareHarborGuide` section with full details)

**Quick Steps:**

1. **Find the FareHarbor Item ID:**
   - Log into FareHarbor Dashboard
   - Go to **Items** → click on the event
   - Look at the URL: `fareharbor.com/.../items/236456/edit/`
   - The number (236456) is your Item ID

2. **Add to events.json:**

   ```json
   {
     "id": "harvest-festival-2026",
     "title": "Harvest Festival",
     "fareHarborId": "236456",
     "requiresTicket": true,
     "ticketUrl": null
   }
   ```

3. **The website automatically generates the booking URL!**

### When to Use What

| Scenario                      | What to Set                                                      |
| ----------------------------- | ---------------------------------------------------------------- |
| FareHarbor tickets            | `fareHarborId: "123456"`, `ticketUrl: null`                      |
| External tickets (Eventbrite) | `fareHarborId: null`, `ticketUrl: "https://..."`                 |
| Free event                    | `fareHarborId: null`, `ticketUrl: null`, `requiresTicket: false` |

### FareHarbor Items Registry

**File:** `data/fareharborItems.json`

This file documents all FareHarbor booking items and links them to website events. Use it as a reference when setting up new ticketed events.

---

## Files Staff Should NOT Edit

These require developer involvement:

- `data/integrations.json` (API keys and technical configs)
- `data/config/components.json` (technical documentation)
- `data/config/bookingConfig.json` (webhook/analytics settings)
- Any file in `lib/`, `components/`, or `app/`

---

_Last updated: January 2026_
