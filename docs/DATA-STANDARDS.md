# Data Standards for Rocky Mount Website

> Single source of truth for all JSON data structures, validation rules, and maintenance processes.

---

## Overview

All dynamic site data lives in the `data/` folder. This ensures:

- **Single source of truth** — Change once, update everywhere
- **Type safety** — TypeScript interfaces validate structure
- **Easy maintenance** — Non-technical staff can update JSON
- **Consistency** — Validation prevents errors

---

## Data Files

| File            | Purpose                              | Update Frequency  |
| --------------- | ------------------------------------ | ----------------- |
| `siteInfo.json` | Hours, prices, contact, social links | Rarely (seasonal) |
| `events.json`   | 2026 event calendar                  | Quarterly         |
| `lectures.json` | Lecture series details               | Annual            |

---

## Default Ticket URL Behavior

**Smart Defaults:** Events with `requiresTicket: true` automatically use the FareHarbor booking flow:

```
https://fareharbor.com/embeds/book/rockymountmuseum/
```

**Override:** Set a custom `ticketUrl` in the JSON to use a different booking link.

**Examples:**

```json
// Uses default FareHarbor booking (no ticketUrl specified)
{
  "id": "harvest-fest",
  "title": "Harvest Fest",
  "requiresTicket": true,
  "ticketUrl": null
}

// Uses custom URL (specific item)
{
  "id": "homeschool-spring",
  "title": "Homeschool Day",
  "requiresTicket": true,
  "ticketUrl": "https://fareharbor.com/embeds/book/rockymountmuseum/items/258228/?full-items=yes&flow=no"
}
```

---

## events.json Schema

### Event Object

| Field               | Type           | Required | Description                                               |
| ------------------- | -------------- | -------- | --------------------------------------------------------- |
| `id`                | string         | Yes      | URL-safe slug (lowercase, hyphens)                        |
| `title`             | string         | Yes      | Display title                                             |
| `date`              | string         | Yes      | Start date (YYYY-MM-DD)                                   |
| `endDate`           | string \| null | No       | End date for multi-day events                             |
| `time`              | string \| null | No       | Time display (e.g., "10:00 AM - 4:00 PM")                 |
| `type`              | enum           | Yes      | `"new"` \| `"enhanced"` \| `"recurring"` \| `"milestone"` |
| `category`          | enum           | Yes      | See Category Types below                                  |
| `description`       | string         | Yes      | 1-3 sentence description                                  |
| `requiresTicket`    | boolean        | Yes      | Whether advance tickets needed                            |
| `ticketUrl`         | string \| null | No       | Custom booking URL (uses FareHarbor default if null)      |
| `featured`          | boolean        | No       | Show in featured events                                   |
| `capacity`          | number         | No       | Max attendees (for limited events)                        |
| `ageRecommendation` | string         | No       | Age guidance (e.g., "13+")                                |

### Category Types

| Category    | Use For                                               |
| ----------- | ----------------------------------------------------- |
| `signature` | Major marquee events (July 4, Flag Weekend)           |
| `festival`  | Multi-activity outdoor events                         |
| `lecture`   | Speaker presentations (add `speaker`, `speakerTitle`) |
| `workshop`  | Hands-on learning (blacksmith, hearth cooking)        |
| `camp`      | Youth programs (spring break, summer)                 |
| `education` | School/homeschool programs                            |
| `tour`      | Special tour experiences (twilight, behind-scenes)    |
| `family`    | Family-friendly activities                            |
| `seasonal`  | Holiday programming (Christmas, Halloween)            |
| `digital`   | Online-only events                                    |

### Event Type Meanings

| Type        | Badge Text         | Description                         |
| ----------- | ------------------ | ----------------------------------- |
| `new`       | "New for 2026"     | First-time event                    |
| `enhanced`  | "Enhanced"         | Returning event with improvements   |
| `recurring` | "Annual Tradition" | Established yearly event            |
| `milestone` | "Milestone"        | Commemorative moment (TN 230, etc.) |

### Lecture Category Fields

When `category: "lecture"`, add these fields:

```json
{
  "category": "lecture",
  "speaker": "Dr. James P. Byrd",
  "speakerTitle": "Vanderbilt University"
}
```

---

## lectures.json Schema

### Lecture Object

| Field         | Type   | Required | Description                                          |
| ------------- | ------ | -------- | ---------------------------------------------------- |
| `id`          | number | Yes      | Sequential ID                                        |
| `title`       | string | Yes      | Lecture title                                        |
| `date`        | string | Yes      | Date (YYYY-MM-DD)                                    |
| `time`        | string | Yes      | Start time (e.g., "2:00 PM")                         |
| `speaker`     | object | Yes      | Speaker details                                      |
| `description` | string | Yes      | 2-3 sentence description                             |
| `topics`      | array  | Yes      | 3-5 topic bullet points                              |
| `format`      | string | No       | Special format (e.g., "First-person interpretation") |
| `note`        | string | No       | Additional context                                   |

### Speaker Object

```json
{
  "name": "Dr. James P. Byrd",
  "title": "Professor",
  "institution": "Vanderbilt University",
  "bio": "Brief biography...",
  "portraying": "Mary Patton" // For first-person interpreters only
}
```

---

## siteInfo.json Schema

### Contact Section

```json
{
  "contact": {
    "phone": "(423) 538-7396",
    "email": "rockymountmuseum@gmail.com",
    "website": "https://rockymountmuseum.com",
    "social": {
      "facebook": "rockymountmuseum",
      "instagram": "rockymounttn",
      "tiktok": "rockymounttn"
    }
  }
}
```

### Hours Section

```json
{
  "hours": {
    "regular": {
      "wednesday": "10:00 AM - 5:00 PM",
      "thursday": "10:00 AM - 5:00 PM",
      "friday": "10:00 AM - 5:00 PM",
      "saturday": "10:00 AM - 5:00 PM",
      "sunday": "Closed",
      "monday": "Closed",
      "tuesday": "Closed"
    },
    "formatted": {
      "days": "Wednesday - Saturday",
      "time": "10am - 5pm",
      "short": "Wed-Sat 10am-5pm"
    },
    "season": "March 4 through mid-December",
    "lastTour": "4:00 PM",
    "tourNote": "Tours depart every hour. Last tour at 4pm."
  }
}
```

### Admission Section

```json
{
  "admission": {
    "adults": { "price": 12, "label": "Adults" },
    "seniors": { "price": 10, "label": "Seniors (65+)" },
    "children": { "price": 8, "label": "Children (6-17)" },
    "childrenFree": { "price": 0, "label": "Children under 6" }
  },
  "admissionIncludes": [
    "Guided living history tour",
    "Museum gallery access",
    "Historic site grounds",
    "Heritage trail",
    "Free parking"
  ]
}
```

---

## Validation Rules

### Date Validation

**Rule 1: Events must be on open days (Wed-Sat)**

Rocky Mount is open Wednesday through Saturday. Single-day events should not be scheduled on:

- Sunday
- Monday
- Tuesday

**Exceptions:**

- Multi-day events (camps) may start on Sunday/Monday
- Digital events have no day restriction
- Evening events (Haunting, Candlelight) may span Thursday-Saturday

**Rule 2: Events must be within season**

Season runs March 4 through mid-December 2026. Events should not be scheduled:

- Before March 4, 2026 (season opening)
- In January or early February

**Exception:** Recurring programs may have pre-season scheduling for staff planning.

### Ticket URL Validation

**Rule 3: Ticketed events should have booking path**

If `requiresTicket: true`:

- Event uses default FareHarbor booking if `ticketUrl` is null
- Custom `ticketUrl` overrides the default
- `ticketUrl` must be a valid URL if provided

**Rule 4: Free events should not have ticket URLs**

If `requiresTicket: false`, `ticketUrl` should be null.

### ID Validation

**Rule 5: IDs must be unique and URL-safe**

- Lowercase letters, numbers, hyphens only
- No spaces or special characters
- Unique across all events
- Descriptive (e.g., `colonial-independence-day` not `event-7`)

### Content Validation

**Rule 6: Descriptions should be 1-3 sentences**

Keep descriptions concise for card display:

- Minimum: 50 characters
- Maximum: 300 characters
- No HTML or markdown

---

## Adding New Events

### Step-by-Step Process

1. **Open** `data/events.json`

2. **Find correct position** (events sorted by date)

3. **Add event object:**

```json
{
  "id": "new-event-slug",
  "title": "Event Title",
  "date": "2026-MM-DD",
  "endDate": null,
  "time": "10:00 AM - 4:00 PM",
  "type": "new",
  "category": "festival",
  "description": "Brief description of the event in 1-3 sentences.",
  "ticketUrl": null,
  "requiresTicket": true,
  "featured": false
}
```

4. **Verify day of week** (must be Wed-Sat for single-day)

5. **Run validation** (see Validation Scripts below)

6. **Test locally** with `npm run dev`

7. **Deploy** via git push

### Event Checklist

- [ ] ID is unique and URL-safe
- [ ] Date is YYYY-MM-DD format
- [ ] Date falls on Wed-Sat (or has exception)
- [ ] Date is within 2026 season (March 4 - mid-December)
- [ ] Type is valid enum value
- [ ] Category is valid enum value
- [ ] Description is 1-3 sentences
- [ ] requiresTicket is boolean (not string)
- [ ] ticketUrl is null or valid URL

---

## Validation Scripts

### Quick Validation (npm script)

```bash
npm run validate:data
```

This runs all validation checks and reports issues.

### Manual Validation Checklist

Run these checks before committing:

**1. JSON Syntax**

```bash
cat data/events.json | jq . > /dev/null && echo "Valid JSON"
```

**2. Date Day-of-Week Check**

```bash
# Check if any single-day events are on closed days
node -e "
const events = require('./data/events.json').events;
const closedDays = [0, 1, 2]; // Sun, Mon, Tue
events.forEach(e => {
  if (!e.endDate) {
    const day = new Date(e.date + 'T12:00:00').getDay();
    if (closedDays.includes(day)) {
      console.log('WARNING: ' + e.id + ' is on ' + ['Sun','Mon','Tue'][day]);
    }
  }
});
"
```

**3. Missing Ticket URL Check**

```bash
node -e "
const events = require('./data/events.json').events;
events.forEach(e => {
  if (e.requiresTicket && !e.ticketUrl) {
    console.log('INFO: ' + e.id + ' will use default FareHarbor booking');
  }
});
"
```

---

## Recurring Programs

The `recurringPrograms` section handles programs with multiple dates:

```json
{
  "recurringPrograms": {
    "blacksmithWorkshops": {
      "id": "blacksmith",
      "title": "Blacksmith Workshops",
      "schedule": "Select Saturdays",
      "dates": ["2026-03-28", "2026-04-18", "2026-05-16"]
    }
  }
}
```

### Recurring Program Fields

| Field            | Type           | Required | Description                    |
| ---------------- | -------------- | -------- | ------------------------------ |
| `id`             | string         | Yes      | URL-safe slug                  |
| `title`          | string         | Yes      | Program name                   |
| `tagline`        | string         | No       | Short marketing hook           |
| `description`    | string         | Yes      | Program description            |
| `schedule`       | string         | Yes      | Human-readable schedule        |
| `scheduleNote`   | string         | No       | Additional timing info         |
| `time`           | string         | Yes      | Time of day                    |
| `duration`       | string         | Yes      | Length (e.g., "4 hours")       |
| `dates`          | array          | Yes      | All dates (YYYY-MM-DD)         |
| `ticketUrl`      | string \| null | No       | Booking URL                    |
| `requiresTicket` | boolean        | Yes      | Whether advance tickets needed |
| `category`       | string         | Yes      | Category type                  |
| `capacity`       | number         | No       | Max attendees                  |
| `highlights`     | array          | No       | Feature bullet points          |

---

## Common Mistakes to Avoid

### 1. Wrong Date Format

```json
// WRONG
"date": "March 27, 2026"
"date": "03/27/2026"

// CORRECT
"date": "2026-03-27"
```

### 2. Boolean as String

```json
// WRONG
"requiresTicket": "true"
"featured": "false"

// CORRECT
"requiresTicket": true
"featured": false
```

### 3. Missing Commas

```json
// WRONG
{
  "id": "test"
  "title": "Test Event"  // Missing comma!
}

// CORRECT
{
  "id": "test",
  "title": "Test Event"
}
```

### 4. Trailing Commas

```json
// WRONG (invalid JSON)
{
  "id": "test",
  "title": "Test Event",  // Trailing comma!
}

// CORRECT
{
  "id": "test",
  "title": "Test Event"
}
```

---

## Maintenance Schedule

| Task                | Frequency     | Owner |
| ------------------- | ------------- | ----- |
| Add new events      | As scheduled  | Staff |
| Update ticket URLs  | Before events | Staff |
| Validate all data   | Quarterly     | Dev   |
| Archive past events | Post-season   | Dev   |
| Update hours/prices | As changed    | Staff |

---

## Quick Reference

### FareHarbor Default Booking URL

```
https://fareharbor.com/embeds/book/rockymountmuseum/
```

### Open Days

Wednesday, Thursday, Friday, Saturday

### Season

March 4, 2026 - mid-December 2026

### Required Contact Email

rockymountmuseum@gmail.com

---

_Last updated: January 2026_
