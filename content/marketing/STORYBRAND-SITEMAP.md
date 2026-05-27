# StoryBrand Site Architecture

## Rocky Mount State Historic Site

**Date:** February 3, 2026
**Status:** REFERENCE - Informs `docs/plans/NAVIGATION-PLAN.md`
**Framework:** Donald Miller's StoryBrand
**Core Principle:** The visitor is the hero. Rocky Mount is the guide.

> **NOTE:** This document contains the StoryBrand analysis that informed the final navigation plan.
> Implementation details are in `docs/plans/NAVIGATION-PLAN.md`.

---

## What Rocky Mount Actually Is

Not just one thing. Multiple identities serving multiple heroes:

| Identity                  | What It Is                                      | Who It Serves       |
| ------------------------- | ----------------------------------------------- | ------------------- |
| **Historic Site**         | First SW Territory capital                      | History seekers     |
| **Living History Museum** | Interpreters, demonstrations                    | Families, tourists  |
| **Event Venue**           | Festivals, lectures, programs                   | Community           |
| **Educational Partner**   | Field trips, curriculum                         | Teachers, students  |
| **Regional Heritage Hub** | Gateway to Sullivan County & the Original Seven | Explorers, tourists |

**The Secret Mission:** Be the heritage welcome center for the region without saying "welcome center."

---

## StoryBrand Framework Applied

### The Heroes (Your Visitors)

Every visitor is asking: **"How will this help me thrive or survive?"**

#### Hero 1: The Day-Tripper

**External Problem:** "I need something to do this weekend."
**Internal Problem:** "I'm tired of the same boring stuff."
**Philosophical Problem:** "Life should include meaningful experiences."
**Success:** A memorable day they'll tell friends about.

#### Hero 2: The Educator

**External Problem:** "I need a field trip that meets standards."
**Internal Problem:** "I'm overwhelmed with planning."
**Philosophical Problem:** "Kids deserve engaging history education."
**Success:** Students excited about history; easy logistics.

#### Hero 3: The History Buff

**External Problem:** "I want to see original documents and artifacts."
**Internal Problem:** "I'm skeptical of dumbed-down tourist sites."
**Philosophical Problem:** "Real history deserves serious treatment."
**Success:** Intellectual satisfaction; new knowledge.

#### Hero 4: The Regional Explorer

**External Problem:** "What's worth seeing around here?"
**Internal Problem:** "I don't want to miss hidden gems."
**Philosophical Problem:** "Every place has stories worth knowing."
**Success:** Discover the authentic character of the region.

#### Hero 5: The Supporter

**External Problem:** "I want to help preserve this place."
**Internal Problem:** "I want my contribution to matter."
**Philosophical Problem:** "Heritage belongs to everyone."
**Success:** Feel connected to something lasting.

---

## The Guide's Role (Rocky Mount)

**Empathy:** "We understand you want more than a dusty museum."
**Authority:** "We're the first capital. The ground is the artifact. We have the documents."

**The One-Liner:**

> "Rocky Mount helps you experience where Tennessee began—through living history, original documents, and events that bring the founding story to life."

---

## StoryBrand Navigation Architecture

Instead of organizing by content type, organize by **hero journey**.

### Option: Hero-First Navigation

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   ROCKY MOUNT · Tennessee Starts Here                                  │
│                                                                        │
│   [Plan a Visit]   [Bring a Group]   [Explore History]   [Join Us]    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

| Section             | Hero Served              | Contains                                    |
| ------------------- | ------------------------ | ------------------------------------------- |
| **Plan a Visit**    | Day-tripper, Family      | Hours, tickets, events, what to expect      |
| **Bring a Group**   | Educator, Tour organizer | School programs, group rates, curriculum    |
| **Explore History** | History buff, Researcher | Evidence Room, Timeline, Documents, Stories |
| **Join Us**         | Supporter                | First 250, Membership, Donate, Volunteer    |

**The Original Seven** lives as a featured element on homepage + dedicated /explore page, not a nav item. It's the "regional hub" positioning that draws people in.

---

## StoryBrand-Aligned Site Map

```
ENTRY POINTS
├── /                     "Tennessee Starts Here" (The Promise)
└── /home                 The Guide introduces the journey

PLAN A VISIT (Day-tripper Hero)
├── /visit                "Here's how to have a great day"
│   └── Hours, tickets, directions, accessibility, what to see
├── /events               "Here's what's happening"
│   ├── /events/[slug]    Individual event pages
│   └── Calendar view
├── /programs             "Here's what we offer"
└── /almanac              "Plan around the weather" (utility for visit planning)

BRING A GROUP (Educator Hero)
├── /educators            "Here's how we make your job easier"
│   └── Curriculum alignment, standards, booking
├── /groups               "Here's how group visits work"
│   └── Rates, logistics, private tours
└── /events (filtered)    "Events perfect for school groups"

EXPLORE HISTORY (Researcher Hero)
├── /our-story            "Here's our story"
├── /evidence             "Here's the proof" (THE differentiator)
│   ├── /evidence/documents
│   ├── /evidence/collections
│   ├── /evidence/people
│   └── /evidence/timeline
├── /explore              "Here's the Original Seven" (Regional Hub)
└── /lectures             "Here's how to go deeper"

JOIN US (Supporter Hero)
├── /first-250            "Be part of the founding" (Scarcity)
├── /membership           "Belong to something lasting"
├── /support              "Make history together"
└── Volunteer (mailto)    "Your time matters"
```

---

## The Plan (StoryBrand Step 4)

Every hero needs a simple plan. Here's what Rocky Mount offers:

### Day-Tripper Plan

1. **Check hours** → /visit
2. **See what's on** → /events
3. **Book your visit** → FareHarbor
4. **Have a great day** → (experience)

### Educator Plan

1. **See what we offer** → /educators
2. **Pick your program** → Program details
3. **Book your group** → /groups
4. **Students love it** → (outcome)

### Researcher Plan

1. **Explore the evidence** → /evidence
2. **Go deep on topics** → Collections, Documents
3. **Attend a lecture** → /lectures
4. **Discover what others missed** → (outcome)

### Regional Explorer Plan

1. **Start at Rocky Mount** → /home
2. **See the Original Seven** → /explore
3. **Plan your heritage trail** → Regional connections
4. **Experience authentic Tennessee** → (outcome)

---

## Revised Navigation Options (StoryBrand-Aligned)

### Option SB-1: "The Four Journeys"

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   ROCKY MOUNT                                                  │
│                                                                │
│   PLAN A VISIT    BRING A GROUP    EXPLORE    GET INVOLVED    │
│        ↓               ↓              ↓            ↓          │
│   ┌────────┐      ┌────────┐     ┌────────┐   ┌────────┐     │
│   │Visit   │      │Schools │     │Our     │   │First   │     │
│   │Info    │      │        │     │Story   │   │250     │     │
│   │        │      │Groups  │     │        │   │        │     │
│   │Events  │      │        │     │Evidence│   │Member- │     │
│   │        │      │Programs│     │Room    │   │ship    │     │
│   │Almanac │      │        │     │        │   │        │     │
│   │        │      │        │     │The     │   │Donate  │     │
│   │        │      │        │     │Seven   │   │        │     │
│   └────────┘      └────────┘     └────────┘   └────────┘     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Mobile version:**

```
What brings you here?

[ 📍 Plan a Visit ]     ← Most common
[ 🎓 Bring a Group ]    ← High value
[ 📜 Explore History ]  ← Differentiator
[ ❤️ Get Involved ]     ← Conversion
```

---

### Option SB-2: "The Question Navigation"

Ask the hero's question, provide the answer.

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ROCKY MOUNT · Tennessee Starts Here                               │
│                                                                     │
│   What can I do?    What's the story?    How can I help?           │
│        ↓                  ↓                    ↓                    │
│   ┌──────────┐       ┌──────────┐        ┌──────────┐              │
│   │Visit     │       │Our Story │        │First 250 │              │
│   │Events    │       │Evidence  │        │Membership│              │
│   │Programs  │       │Timeline  │        │Donate    │              │
│   │Groups    │       │The Seven │        │Volunteer │              │
│   │Educators │       │Lectures  │        │          │              │
│   └──────────┘       └──────────┘        └──────────┘              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**The three questions every visitor has:**

1. **What can I do?** → Visit, Events, Programs
2. **What's the story?** → History, Evidence, Context
3. **How can I help?** → Support, Join, Give

---

### Option SB-3: "The Regional Hub" (Original Seven Forward)

Position Rocky Mount as THE starting point for Sullivan County heritage.

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   ROCKY MOUNT · Gateway to the Original Seven                          │
│                                                                        │
│   ┌─────────────────────────────────────────────────────────────────┐ │
│   │  🗺️ EXPLORE THE ORIGINAL SEVEN — Sullivan County Heritage Hub   │ │
│   └─────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│   Visit Rocky Mount    Events & Programs    The Evidence    Support   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Homepage hero:**

> "Start here. Explore everywhere."
> Rocky Mount is your gateway to the seven counties that became Tennessee.

**The Seven becomes the draw.** Rocky Mount is the home base. Visitors come for the regional exploration, stay for the site itself.

---

## Recommended: Option SB-1 with Regional Hub Integration

### Final Navigation Structure

```
UTILITY BAR:
[The Original Seven 🗺️]  [Evidence Room 📜]        Contact | Directions

MAIN NAV:
   PLAN A VISIT      BRING A GROUP      EXPLORE      GET INVOLVED
```

**Plan a Visit:**

- Visit Info (hours, tickets, directions)
- Events Calendar
- What to Expect
- 1775 Almanac

**Bring a Group:**

- School Programs
- Group Visits
- Curriculum Resources
- Book a Group

**Explore:**

- Our Story
- Evidence Room
- Timeline
- Lectures
- The Original Seven (link to /explore)

**Get Involved:**

- First 250 ★ Limited
- Membership
- Donate
- Volunteer

---

## The Homepage as Guide Introduction

Using StoryBrand, the homepage should:

1. **Show empathy** — "Looking for something meaningful?"
2. **Demonstrate authority** — "First capital. Original documents. Living history."
3. **Give a plan** — Clear paths for each hero type
4. **Call to action** — "Plan Your Visit"
5. **Show success** — Testimonials, visitor photos
6. **Hint at failure** — "Don't miss the commemorative year" (scarcity)

### Homepage Section Order (StoryBrand)

1. **Hero Image + Hook** — "Tennessee Starts Here"
2. **The Plan** — 4 cards for 4 hero journeys
3. **Authority** — Original Seven map (regional hub positioning)
4. **What's On** — Upcoming events (urgency)
5. **The Evidence** — Document teaser (credibility)
6. **Success Stories** — Testimonials
7. **Call to Action** — First 250 / Plan Visit
8. **Footer** — Practical info

---

## Key Insight: The Original Seven IS the Regional Hub Play

The Original Seven branding does exactly what you want:

- Positions Rocky Mount as THE starting point
- Creates regional authority without saying "welcome center"
- Differentiates from other historic sites (they're ONE place; you're THE place)
- Gives visitors a reason to explore beyond Rocky Mount

**Keep the Seven prominent on homepage.** It's not just branding—it's your regional hub strategy made visible.

---

## StoryBrand One-Liner Options

For consistent messaging across all touchpoints:

**Option A (Experience-focused):**

> "Rocky Mount helps visitors experience where Tennessee began—through living history, original documents, and events that bring the founding story to life."

**Option B (Problem-focused):**

> "Tired of boring historic sites? Rocky Mount is where you stand on the actual ground where Tennessee's government began, surrounded by original documents and living history."

**Option C (Regional hub):**

> "Rocky Mount is your gateway to the Original Seven—the counties that became Tennessee. Start here. Explore everywhere."

**Option D (Simple):**

> "Tennessee started here. Come see for yourself."

---

## Summary: What to Do

1. **Reframe navigation** around hero journeys, not content types
2. **Keep Original Seven prominent** — it's your regional hub strategy
3. **Use "Plan a Visit" language** — action-oriented, not passive
4. **Elevate Evidence Room** — it's your credibility differentiator
5. **Position as guide, not attraction** — "We help you experience..." not "Come see..."
6. **Every page answers:** "How does this help the visitor thrive?"

---

_"People don't buy the best products. They buy the ones they can understand the fastest."_
— Donald Miller
