# Homepage & Welcome Page Brainstorm

## Rocky Mount State Historic Site

**Date:** February 3, 2026
**Analyst:** Claude
**Purpose:** 2 alternative approaches to improve visitor experience

---

## Current State Analysis

### Welcome Page (`/`)

- **Role:** Splash screen / title card before main site
- **Elements:** Story hook → Washington quote → Brand statement → Dual countdowns → 3 CTAs
- **Design:** Dark, ceremonial, text-heavy
- **Word count:** ~80 words of content before CTAs

### Homepage (`/home`)

- **Role:** Main landing after welcome screen
- **Sections:** 12 distinct sections, 775 lines of code
- **Scroll depth:** ~8 full viewport heights
- **CTAs:** 15+ links/buttons competing for attention

### What's Working

1. Brand voice is strong ("Stand where they stood," "The ground is the artifact")
2. Primary source quotes add authenticity
3. Indigenous acknowledgment is tasteful
4. Evidence Room integration is compelling
5. Verified facts throughout

### What's Not Working

1. **Redundancy:** Welcome and Homepage both explain significance
2. **Information overload:** 12 sections is too many; visitors won't scroll through all
3. **Unclear journey:** What should a first-time visitor do?
4. **Abstract headline:** "The Constitution's First Test" requires explanation
5. **CTA competition:** Too many calls-to-action dilute each other
6. **Commemorative fatigue:** TN 230 / America 250 appears 3+ times
7. **Two-click barrier:** Splash → Homepage → Actual content = friction

---

## IDEA 1: "THE SINGLE SCROLL"

### Eliminate the Welcome Page

**Core Concept:** Merge welcome and homepage into a single, focused experience. The splash screen adds friction without adding value.

**User Insight:** Modern visitors expect to land on content, not a lobby. The ceremonial splash screen feels like a museum gift shop before the museum.

### Implementation

**Welcome Page becomes:**

```
/ → redirect to /home
```

Or, minimal 3-second animated splash that auto-advances (optional).

**Homepage Hero (Redesigned):**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│           Before there was a Tennessee,                 │
│              there was this ground.                     │
│                                                         │
│    "Where ought the Governor to reside?"                │
│         — George Washington, 1790                       │
│                                                         │
│              [ PLAN YOUR VISIT ]                        │
│                                                         │
│          Tennessee 230 · America 250                    │
│          ↓ Scroll to explore                            │
└─────────────────────────────────────────────────────────┘
```

**Reduced Section Structure (7 sections, down from 12):**

| #   | Section                 | Purpose                               | Est. Height |
| --- | ----------------------- | ------------------------------------- | ----------- |
| 1   | Hero                    | Hook + Primary CTA                    | 100vh       |
| 2   | The Story (Brief)       | 1 paragraph + "Explore Evidence" link | 50vh        |
| 3   | Plan Your Visit         | Hours, admission, directions, booking | 60vh        |
| 4   | What's Happening        | Next 3 events + "See Calendar"        | 40vh        |
| 5   | Visitor Voices          | 3 testimonials, auto-rotate           | 40vh        |
| 6   | First 250               | Urgency campaign CTA                  | 30vh        |
| 7   | Footer + Acknowledgment | Indigenous note + contact             | 30vh        |

**Total:** ~350vh (vs. ~800vh currently)

**What Gets Cut/Moved:**

- ~~Original Seven Map~~ → Move to /explore (it's detailed content, not overview)
- ~~Audience Router~~ → Remove (navigation already serves this purpose)
- ~~Commemorative Section~~ → Consolidate into Hero badge
- ~~Document Teaser~~ → Simplify to single link in "The Story" section
- ~~Final CTA Section~~ → Hero CTA is sufficient; footer has secondary

**Headline Change:**

```
BEFORE: "THE CONSTITUTION'S FIRST TEST"
AFTER:  "WHERE TENNESSEE BEGAN"
```

Reason: More immediate, less abstract. Visitors don't come for constitutional theory; they come for Tennessee history.

### Pros

- Faster to content (1 click vs 2)
- Cleaner visitor journey
- Less scrolling required
- Modern UX expectations
- Reduces maintenance (fewer sections)

### Cons

- Loses ceremonial "moment" of the welcome page
- Less differentiated from generic historic site homepages
- Washington quote might get lost

### Code Impact

- Delete or simplify `app/(welcome)/page.tsx`
- Reduce `app/(main)/home/page.tsx` by ~40%
- Keep all components (just use fewer)

---

## IDEA 2: "THE DOORWAY"

### Welcome Page as True Portal

**Core Concept:** Transform the welcome page from a pass-through into a routing decision. Different visitors have different goals—let them self-select immediately.

**User Insight:** A teacher planning a field trip doesn't need the same experience as a history researcher or a tourist looking for hours. Route them to their ideal path.

### Implementation

**Welcome Page (Redesigned):**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    ROCKY MOUNT                          │
│               Tennessee Starts Here                     │
│                                                         │
│     ┌─────────────┐    ┌─────────────┐                 │
│     │ PLAN A      │    │ EXPLORE THE │                 │
│     │ VISIT       │    │ EVIDENCE    │                 │
│     │             │    │             │                 │
│     │ Hours &     │    │ Original    │                 │
│     │ tickets     │    │ documents   │                 │
│     └─────────────┘    └─────────────┘                 │
│                                                         │
│     ┌─────────────┐    ┌─────────────┐                 │
│     │ BRING A     │    │ JOIN THE    │                 │
│     │ GROUP       │    │ FIRST 250   │                 │
│     │             │    │             │                 │
│     │ Educators   │    │ Be part of  │                 │
│     │ & groups    │    │ history     │                 │
│     └─────────────┘    └─────────────┘                 │
│                                                         │
│              [ Explore the full site → ]                │
│                                                         │
│           "Where ought the Governor to reside?"         │
│                  — Washington, 1790                     │
└─────────────────────────────────────────────────────────┘
```

**Routing Destinations:**
| Card | Destination | User Type |
|------|-------------|-----------|
| Plan a Visit | /visit | Tourists, day-trippers |
| Explore the Evidence | /evidence | Researchers, history buffs |
| Bring a Group | /educators | Teachers, tour organizers |
| Join the First 250 | /first-250 | Supporters, members |
| Full site | /home | Browsers, return visitors |

**Homepage (Streamlined for Browsers):**
Since most goal-oriented visitors now bypass homepage, it becomes a "general interest" page:

| #   | Section      | Purpose                          |
| --- | ------------ | -------------------------------- |
| 1   | Hero         | Visual + "Tennessee Starts Here" |
| 2   | The Story    | Brief narrative overview         |
| 3   | Key Dates    | TN 230 / America 250 with dates  |
| 4   | Quick Links  | All major sections in grid       |
| 5   | Testimonials | Social proof                     |
| 6   | Footer       | Contact + acknowledgment         |

**Total:** 6 sections (vs 12 currently)

### Welcome Page Variants

**Variant A: Cards-Based (shown above)**

- 4 large cards with clear destinations
- Most aggressive routing

**Variant B: Questions-Based**

```
What brings you here today?

[ I'm planning a visit ]
[ I'm researching history ]
[ I'm organizing a group trip ]
[ I want to support Rocky Mount ]
[ Just browsing ]
```

More conversational, but adds a click.

**Variant C: Hybrid with Hero Image**

```
┌─────────────────────────────────────────┐
│  [Full-bleed image of Cobb House]       │
│                                         │
│         ROCKY MOUNT                     │
│      Tennessee Starts Here              │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Visit   │ │Evidence │ │First 250│   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                         │
│        [ Enter Full Site ]              │
└─────────────────────────────────────────┘
```

More visual, less text.

### Pros

- Respects visitor intent
- Reduces homepage load on goal-oriented visitors
- Each path can be optimized for its audience
- Welcome page becomes genuinely useful (not just ceremonial)
- Analytics: Can track which paths are most popular

### Cons

- More complex UX decision at entry
- Some visitors may feel forced to choose
- Requires maintaining quality on all destination pages
- "Full site" option might feel like punishment

### Code Impact

- Redesign `app/(welcome)/page.tsx` with card grid
- Reduce `app/(main)/home/page.tsx` by ~30%
- Potentially improve /visit, /educators, /evidence landing pages

---

## Comparison Matrix

| Factor            | Current      | Idea 1: Single Scroll | Idea 2: Doorway |
| ----------------- | ------------ | --------------------- | --------------- |
| Clicks to content | 2            | 1                     | 1               |
| Homepage sections | 12           | 7                     | 6               |
| Visitor routing   | None         | None                  | Explicit        |
| Ceremonial feel   | High         | Low                   | Medium          |
| Mobile experience | Heavy scroll | Less scroll           | Cards grid      |
| Maintenance       | High         | Medium                | Medium          |
| Analytics clarity | Low          | Medium                | High            |
| Uniqueness        | Medium       | Low                   | High            |

---

## Recommendation

**Primary:** Idea 2 (The Doorway) - Variant C (Hybrid with Hero)

**Reasoning:**

1. Preserves the "moment" of arrival that the current welcome page attempts
2. Actually helps visitors instead of making them click through
3. Reduces homepage bloat naturally
4. Creates clearer analytics (which paths do visitors choose?)
5. Each destination page can be optimized for its audience
6. Maintains Rocky Mount's distinctive brand feel

**Fallback:** Idea 1 if the team wants simpler implementation or prefers modern minimal aesthetic.

---

## Implementation Priority

If pursuing Idea 2:

**Phase 1 (Quick Win):**

- Redesign welcome page with 4 pathway cards
- Add "Enter Full Site" secondary link
- No changes to homepage yet

**Phase 2 (Optimization):**

- Audit /visit page for completeness (becomes primary tourist landing)
- Audit /evidence page for researcher needs
- Audit /educators page for teacher needs

**Phase 3 (Homepage Cleanup):**

- Remove redundant sections from homepage
- Reduce from 12 to 6-7 sections
- Test with real visitors

---

## Copy Alternatives for Welcome Page

### Current Hook

> "Before there was a Tennessee, there was this ground."

### Alternative Hooks (Tested Against Brand Voice)

**Option A: Question-based**

> "What if you could stand where Tennessee began?"

**Option B: Invitation-based**

> "Welcome to the ground where Tennessee started."

**Option C: Declaration-based**

> "This is where Tennessee began. Come see for yourself."

**Option D: Temporal-based**

> "1790. This ground. The moment everything changed."

**Recommendation:** Keep current hook. It's strong. But pair it with clearer pathways.

---

## Homepage Hero Alternatives

### Current Headline

> "THE CONSTITUTION'S FIRST TEST"

### Alternative Headlines

**Option A: Place-based (Recommended)**

> "WHERE TENNESSEE BEGAN"

**Option B: Story-based**

> "THE GROUND THAT BECAME A STATE"

**Option C: Invitation-based**

> "STAND WHERE THEY STOOD"

**Option D: Historical**

> "FIRST CAPITAL OF THE SOUTHWEST TERRITORY"

**Option E: Provocative**

> "236 YEARS. ONE GROUND."

### Subhead Alternatives

**Current:**

> "In 1790, this ground became the first seat of Constitutional governance west of the Appalachians."

**Alternative A (Simpler):**

> "In 1790, Governor Blount made this ground the first federal seat of power west of the mountains."

**Alternative B (Story):**

> "Washington sent Blount west. Blount chose this ground. Tennessee was born."

**Alternative C (Visitor-focused):**

> "Walk the same ground where Governor Blount governed, Cherokee chiefs negotiated, and a state began."

---

## Next Steps

1. Review this brainstorm with team
2. Choose direction (Idea 1 or Idea 2)
3. If Idea 2: Choose welcome page variant (A, B, or C)
4. Create wireframes for chosen approach
5. Test with 3-5 real visitors (guerilla testing)
6. Implement Phase 1

---

_Document created for Rocky Mount marketing review, February 2026_
