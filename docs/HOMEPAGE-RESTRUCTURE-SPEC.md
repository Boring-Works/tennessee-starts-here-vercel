# Rocky Mount Homepage Restructure Specification

## Project Context

**Site:** Tennessee Starts Here (tennesseestartshere.com)
**Client:** Rocky Mount State Historic Site, Piney Flats, TN
**Purpose:** America 250 / Tennessee 230 commemorative year (2026)
**Tech Stack:** Next.js 14+, Tailwind CSS, TypeScript
**Project Path:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here`

---

## What Rocky Mount IS

Rocky Mount State Historic Site is the **first capital of the Southwest Territory** (1790-1792). Governor William Blount established the first functioning government west of the Appalachians here. The site features:

- Original 1820s buildings on land settled ~1770
- Part of Tennessee's oldest documented farm (Century Farms, est. 1775)
- Costumed interpreters portraying 1790s frontier life
- Living history demonstrations
- 15 acres of historic grounds

**Historical Accuracy Notes:**
- Southwest Territory capital 1790-1792 (NOT first US territorial capital - that's Marietta, OH 1788)
- NOT Tennessee's first state capital (that's Knoxville, 1796)
- Site settled ~1770; current buildings date to 1820s
- Tennessee became 16th state on June 1, 1796

---

## The Problem We're Solving

The current homepage is a **conversion funnel for the First 250 program**, not a historic site homepage. It feels like a SaaS landing page pushing enrollment rather than celebrating a historic destination.

### Current Homepage Structure (PROBLEMATIC)

```
1. Hero                    → Countdown to July 4, 2026
2. Blount Letter           → Historical quote (good)
3. Promise vs Proof        → 1776 vs 1790 comparison (good)
4. Story                   → Timeline ending with "Join the Celebration" CTA
5. GATHERING SECTION       → GIANT July 4th card + VintageGauge + First 250 push
6. DECISION SECTION        → "Be One of 250" vs "Stay Informed" binary choice
7. Homecoming              → Finally mentions visiting
```

**Problems:**
1. First 250 enrollment appears 4+ times with progress gauges
2. 17 diverse events reduced to: 1 giant July 4 card + 3 tiny cards
3. No sense of what visiting Rocky Mount is actually LIKE
4. Sales pressure feels undignified for a state historic site
5. Lecture series (6 historians), Cherokee Heritage, First Families Reunion, seasonal events - all buried

---

## Design Philosophy

This is a **1790s historic site**, not a tech startup. The design should feel like:
- Opening correspondence sealed with wax
- Receiving a formal invitation from Governor Blount's office
- Stepping into a territorial government building

**NOT like:**
- A SaaS product landing page
- A ticket sales funnel
- A countdown timer to a product launch

### Visual Language (from v6 HTML prototype)

**Colors:**
```css
--navy: #0a1420;
--navy-mid: #0e1a26;
--gold: #d4a84b;
--gold-light: #e8c87a;
--gold-muted: #a8935c;
--rust: #8b4513;
--parchment: #f5f0e6;
```

**Typography:**
- Headlines: Playfair Display (serif, weight 700)
- Body: System sans-serif
- Accent/Signatures: Script font for "Wm. Blount" style signatures
- Italic subheads: Cormorant Garamond or Playfair Display italic

**Period Ornamentation (ENCOURAGED):**
- Corner bracket flourishes on cards
- Decorative dividers: ★ ◆ ❧ ❦ ☙
- Wax seal motifs for special CTAs
- Parchment texture overlays (subtle, 3% opacity)
- Gold rules and borders

---

## Proposed New Homepage Structure

```
1. Hero                    → "The Commemorative Year" (broader framing)
2. Blount Letter           → Keep as-is (historical gravitas)
3. EXPERIENCE PREVIEW      → NEW: "What You'll Experience" at Rocky Mount
4. EVENTS SHOWCASE         → NEW: Variety of 17 events, not just July 4
5. Promise vs Proof        → Keep (historical context)
6. Story                   → Keep timeline, REMOVE First 250 CTA at end
7. Homecoming              → Keep (visit CTA)
```

**Key Changes:**
- REMOVE `gathering-section` (giant July 4 spotlight)
- REMOVE `decision-section` (First 250 vs email binary)
- REMOVE all VintageGauge components from homepage
- ADD new "Experience Preview" section
- ADD new "Events Showcase" section showing variety

---

## File Structure Reference

```
app/
├── page.tsx                    # MAIN FILE TO MODIFY
├── globals.css                 # Add period ornamentation CSS
├── events/page.tsx             # Events calendar (reference)
├── first-250/page.tsx          # First 250 page (leave alone)
├── visit/page.tsx              # Visit page (reference)
├── lectures/page.tsx           # Lectures page (reference)

components/
├── EventCard.tsx               # Existing event card
├── LectureCard.tsx             # Existing lecture card
├── VintageGauge.tsx            # REMOVE from homepage imports
├── Countdown.tsx               # Keep but reduce prominence
├── EmailSignup.tsx             # Keep for footer only
├── Navigation.tsx              # Keep
├── Footer.tsx                  # Keep

data/
├── events.json                 # 17 events with full details
├── lectures.json               # 6 lectures with speaker info
├── enrollment.json             # First 250 enrollment numbers
├── siteInfo.json               # Site configuration
```

---

## Data Structures (for reference)

### events.json structure
```typescript
interface Event {
  id: string;
  title: string;
  date: string;           // "2026-03-04"
  endDate?: string | null;
  time?: string | null;
  type: "new" | "enhanced" | "recurring" | "milestone";
  category: "digital" | "lecture" | "festival" | "signature" | "seasonal";
  speaker?: string;
  speakerTitle?: string;
  description: string;
  ticketUrl?: string | null;
  featured: boolean;
}
```

### Key Events to Highlight
```
LECTURES (6):
- Colonial Religion on the Frontier (Dr. James P. Byrd, Vanderbilt)
- Powder for Kings Mountain (Lisa Bennett as Mary Patton)
- All In - The Overmountain Men's Gamble (Thomas Bachelor)
- William Blount and the Birth of Tennessee Government (Dr. Caroline H. Whitfield)
- The Story of the American Flag (David Doan)
- Cherokee Heritage Weekend (Dr. Daniel Redbird Wolfe)

FESTIVALS:
- Woolly Days & Colonial Gardening (Apr 25-26)
- Early Frontier Days & Colonial Trade Fair (May 22-24)
- America 250 Flag Weekend (Jun 13-14)
- Colonial Independence Day (Jul 4) - signature event
- Cherokee Heritage Weekend (Aug 22-23)
- First Families of Tennessee Reunion (Sep 11-13) - signature event
- Harvest Fest (Oct 10-11)

SEASONAL:
- Haunting on the Mount (Oct 15-24)
- Frontier Christmas (Nov 4-21)
- Candlelight Christmas (Dec 4-12)
```

---

## New Components to Create

### 1. ExperiencePreview.tsx

Purpose: Show what visiting Rocky Mount is actually LIKE before pushing events.

```tsx
// components/ExperiencePreview.tsx

interface ExperienceMoment {
  icon: string;      // Unicode symbol or SVG
  title: string;
  description: string;
}

const experiences: ExperienceMoment[] = [
  {
    icon: "🏛️",
    title: "Walk Historic Grounds",
    description: "The same soil where Governor Blount established Tennessee's first government in 1790."
  },
  {
    icon: "👤",
    title: "Meet the Settlers",
    description: "Costumed interpreters bring 1790s frontier life to vivid reality."
  },
  {
    icon: "🏠",
    title: "Enter the Past",
    description: "Original buildings from the territorial period, preserved and interpreted."
  },
  {
    icon: "📜",
    title: "Hear the Story",
    description: "Guided tours reveal how Tennessee's government began at this frontier outpost."
  }
];

export default function ExperiencePreview() {
  return (
    <section className="experience-section" aria-labelledby="experience-heading">
      <div className="experience-container">
        {/* Decorative header */}
        <div className="heritage-divider">
          <span>★</span>
        </div>
        
        <header className="experience-header">
          <p className="experience-eyebrow">The Living History Experience</p>
          <h2 id="experience-heading" className="experience-headline">
            Step Into 1790
          </h2>
          <p className="experience-intro">
            More than a museum. Rocky Mount is a living window into the birth of Tennessee.
          </p>
        </header>

        <div className="experience-grid">
          {experiences.map((exp, i) => (
            <article key={i} className="experience-moment">
              <span className="experience-icon" aria-hidden="true">{exp.icon}</span>
              <h3 className="experience-title">{exp.title}</h3>
              <p className="experience-desc">{exp.description}</p>
            </article>
          ))}
        </div>

        <footer className="experience-footer">
          <Link href="/visit" className="experience-cta">
            Plan Your Visit
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}
```

### 2. EventsShowcase.tsx

Purpose: Replace the "Gathering" section with a view showing EVENT VARIETY.

```tsx
// components/EventsShowcase.tsx

import Link from "next/link";
import eventsData from "@/data/events.json";
import lecturesData from "@/data/lectures.json";

// Get categorized events
const lectures = eventsData.events.filter(e => e.category === "lecture");
const festivals = eventsData.events.filter(e => e.category === "festival" || e.category === "signature");
const seasonal = eventsData.events.filter(e => e.category === "seasonal");

// Get next upcoming event (after today)
function getNextEvent() {
  const today = new Date();
  return eventsData.events.find(e => new Date(e.date) > today) || eventsData.events[0];
}

export default function EventsShowcase() {
  const nextEvent = getNextEvent();
  const eventCount = eventsData.events.length;
  
  return (
    <section className="showcase-section" aria-labelledby="showcase-heading">
      <div className="showcase-container">
        {/* Header */}
        <header className="showcase-header">
          <p className="showcase-eyebrow">2026 Programming</p>
          <h2 id="showcase-heading" className="showcase-headline">
            The Commemorative Year
          </h2>
          <p className="showcase-intro">
            {eventCount} events celebrating America's 250th and Tennessee's 230th—
            from scholarly lectures to frontier festivals.
          </p>
        </header>

        {/* Event Categories Grid */}
        <div className="showcase-grid">
          
          {/* Next Upcoming Event - Featured */}
          <article className="showcase-featured">
            <span className="showcase-badge">Coming Up</span>
            <time className="showcase-date" dateTime={nextEvent.date}>
              {new Date(nextEvent.date + "T12:00:00").toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </time>
            <h3 className="showcase-title">{nextEvent.title}</h3>
            <p className="showcase-desc">{nextEvent.description.split('. ')[0]}.</p>
            <Link href={`/events#${nextEvent.id}`} className="showcase-link">
              Event Details <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* Lecture Series Card */}
          <article className="showcase-category showcase-lectures">
            <div className="showcase-category-header">
              <span className="showcase-category-count">{lectures.length}</span>
              <h3 className="showcase-category-title">Lecture Series</h3>
            </div>
            <p className="showcase-category-desc">
              Historians and interpreters explore the founding era
            </p>
            <div className="showcase-speakers">
              {lectures.slice(0, 3).map(l => (
                <span key={l.id} className="showcase-speaker">
                  {l.speaker?.split(' ').slice(-1)[0]}
                </span>
              ))}
              {lectures.length > 3 && <span className="showcase-more">+{lectures.length - 3} more</span>}
            </div>
            <Link href="/lectures" className="showcase-link">
              View Series <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* Festivals Card */}
          <article className="showcase-category showcase-festivals">
            <div className="showcase-category-header">
              <span className="showcase-category-count">{festivals.length}</span>
              <h3 className="showcase-category-title">Festivals & Events</h3>
            </div>
            <p className="showcase-category-desc">
              Living history, trade fairs, and celebration
            </p>
            <ul className="showcase-list">
              <li>Woolly Days & Colonial Gardening</li>
              <li>Early Frontier Days</li>
              <li>Colonial Independence Day</li>
            </ul>
            <Link href="/events" className="showcase-link">
              Full Calendar <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* Seasonal Events Card */}
          <article className="showcase-category showcase-seasonal">
            <div className="showcase-category-header">
              <span className="showcase-category-count">{seasonal.length}</span>
              <h3 className="showcase-category-title">Seasonal Traditions</h3>
            </div>
            <p className="showcase-category-desc">
              Haunting tales and candlelit holidays
            </p>
            <ul className="showcase-list">
              <li>Haunting on the Mount</li>
              <li>Frontier Christmas</li>
              <li>Candlelight Christmas</li>
            </ul>
            <Link href="/events" className="showcase-link">
              See Dates <span aria-hidden="true">→</span>
            </Link>
          </article>

        </div>

        {/* Footer with stats */}
        <footer className="showcase-footer">
          <div className="showcase-stats">
            <div className="showcase-stat">
              <span className="showcase-stat-value">{eventCount}</span>
              <span className="showcase-stat-label">Events</span>
            </div>
            <div className="showcase-stat-divider" aria-hidden="true">◆</div>
            <div className="showcase-stat">
              <span className="showcase-stat-value">10</span>
              <span className="showcase-stat-label">Months</span>
            </div>
            <div className="showcase-stat-divider" aria-hidden="true">◆</div>
            <div className="showcase-stat">
              <span className="showcase-stat-value">1</span>
              <span className="showcase-stat-label">Historic Site</span>
            </div>
          </div>
          <Link href="/events" className="showcase-cta">
            View Full 2026 Calendar
          </Link>
        </footer>
      </div>
    </section>
  );
}
```

---

## CSS to Add (globals.css)

Add these period ornamentation styles:

```css
/* ============================================
   PERIOD ORNAMENTATION - Heritage Design System
   ============================================ */

/* Heritage Divider */
.heritage-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.heritage-divider::before,
.heritage-divider::after {
  content: "";
  width: clamp(60px, 15vw, 120px);
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(201, 162, 39, 0.4) 20%,
    rgba(201, 162, 39, 0.4) 80%,
    transparent 100%
  );
}

.heritage-divider span {
  color: var(--accent);
  font-size: 1rem;
}

/* Corner Bracket Flourishes */
.heritage-card {
  position: relative;
}

.heritage-card::before,
.heritage-card::after {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border: 3px solid var(--accent);
  opacity: 0.5;
  pointer-events: none;
}

.heritage-card::before {
  top: -2px;
  left: -2px;
  border-right: none;
  border-bottom: none;
}

.heritage-card::after {
  bottom: -2px;
  right: -2px;
  border-left: none;
  border-top: none;
}

/* Parchment Texture Overlay */
.parchment-texture {
  position: relative;
}

.parchment-texture::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  mix-blend-mode: overlay;
}

/* ============================================
   EXPERIENCE PREVIEW SECTION
   ============================================ */

.experience-section {
  padding: 4rem 0;
  background: var(--cream);
}

@media (min-width: 768px) {
  .experience-section {
    padding: 5rem 0;
  }
}

.experience-container {
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.experience-header {
  text-align: center;
  margin-bottom: 3rem;
}

.experience-eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.experience-headline {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.75rem;
}

.experience-intro {
  font-family: var(--font-serif-elegant);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-style: italic;
  color: var(--text-light);
  max-width: 32rem;
  margin: 0 auto;
}

.experience-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .experience-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .experience-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.experience-moment {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border: 1px solid rgba(10, 22, 40, 0.1);
}

.experience-icon {
  display: block;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.experience-title {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.experience-desc {
  font-size: 0.875rem;
  color: var(--text-light);
  line-height: 1.6;
}

.experience-footer {
  text-align: center;
  margin-top: 2.5rem;
}

.experience-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
  background: var(--primary);
  transition: all 0.3s ease;
}

.experience-cta:hover {
  background: var(--secondary);
  transform: translateY(-2px);
}

/* ============================================
   EVENTS SHOWCASE SECTION
   ============================================ */

.showcase-section {
  padding: 4rem 0;
  background: var(--primary);
  color: white;
}

@media (min-width: 768px) {
  .showcase-section {
    padding: 5rem 0;
  }
}

.showcase-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.showcase-header {
  text-align: center;
  margin-bottom: 3rem;
}

.showcase-eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.showcase-headline {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.showcase-intro {
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  color: rgba(255, 255, 255, 0.85);
  max-width: 36rem;
  margin: 0 auto;
}

.showcase-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .showcase-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .showcase-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  .showcase-featured {
    grid-row: span 2;
  }
}

/* Featured Event Card */
.showcase-featured {
  background: rgba(201, 162, 39, 0.1);
  border: 1px solid rgba(201, 162, 39, 0.3);
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.showcase-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--primary);
  background: var(--accent);
  padding: 0.375rem 0.75rem;
  margin-bottom: 1rem;
}

.showcase-date {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
}

.showcase-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.showcase-desc {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  flex: 1;
}

.showcase-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-top: 1rem;
  transition: color 0.2s ease;
}

.showcase-link:hover {
  color: white;
}

/* Category Cards */
.showcase-category {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
}

.showcase-category-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.showcase-category-count {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}

.showcase-category-title {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-weight: 700;
}

.showcase-category-desc {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}

.showcase-speakers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.showcase-speaker {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
}

.showcase-more {
  font-size: 0.75rem;
  color: var(--accent);
}

.showcase-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.showcase-list li {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.25rem 0;
  padding-left: 1rem;
  position: relative;
}

.showcase-list li::before {
  content: "◆";
  position: absolute;
  left: 0;
  color: var(--accent);
  font-size: 0.5rem;
  top: 0.5rem;
}

/* Footer */
.showcase-footer {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.showcase-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.showcase-stat {
  text-align: center;
}

.showcase-stat-value {
  display: block;
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}

.showcase-stat-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.showcase-stat-divider {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.75rem;
}

.showcase-cta {
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  background: var(--accent);
  transition: all 0.3s ease;
}

.showcase-cta:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
```

---

## Changes to app/page.tsx

### REMOVE these imports:
```tsx
// REMOVE
import VintageGauge from "@/components/VintageGauge";
import enrollmentData from "@/data/enrollment.json";

// REMOVE these lines
const CURRENT_ENROLLED = enrollmentData.currentEnrolled;
const TOTAL_SPOTS = enrollmentData.totalSpots;
const PROGRESS_PERCENT = Math.round((CURRENT_ENROLLED / TOTAL_SPOTS) * 100);
```

### ADD these imports:
```tsx
import ExperiencePreview from "@/components/ExperiencePreview";
import EventsShowcase from "@/components/EventsShowcase";
```

### REMOVE these sections entirely:
1. `gathering-section` (the giant July 4 spotlight with VintageGauge)
2. `decision-section` (the "Be One of 250" vs "Stay Informed" section)

### MODIFY the Story section footer:
```tsx
// CHANGE this:
<footer className="story-footer">
  <p className="story-footer-text">
    <strong>230 years later</strong>, we remember where it started.
  </p>
  <Link href="/events" className="story-footer-cta">
    Join the Celebration
    <span aria-hidden="true">→</span>
  </Link>
</footer>

// TO this:
<footer className="story-footer">
  <p className="story-footer-text">
    <strong>230 years later</strong>, we remember where it started.
  </p>
  <Link href="/visit" className="story-footer-cta">
    Visit Rocky Mount
    <span aria-hidden="true">→</span>
  </Link>
</footer>
```

### NEW page structure:
```tsx
export default function Home() {
  return (
    <>
      {/* THE 1790 WATERMARK */}
      <div className="watermark-1790" aria-hidden="true">1790</div>

      {/* HERO - keep but broaden framing */}
      <section className="hero-cinematic">
        {/* ... existing hero content ... */}
      </section>

      {/* BLOUNT LETTER - keep as-is */}
      <section className="blount-section">
        {/* ... existing content ... */}
      </section>

      {/* NEW: EXPERIENCE PREVIEW */}
      <ExperiencePreview />

      {/* NEW: EVENTS SHOWCASE */}
      <EventsShowcase />

      {/* PROMISE VS PROOF - keep as-is */}
      <section className="ledger-section">
        {/* ... existing content ... */}
      </section>

      {/* STORY - keep, modify CTA */}
      <section className="story-section">
        {/* ... existing content with modified footer ... */}
      </section>

      {/* HOMECOMING - keep as-is */}
      <section className="homecoming-section">
        {/* ... existing content ... */}
      </section>
    </>
  );
}
```

---

## Hero Section Modifications

The hero should feel broader than "countdown to July 4." Consider:

### Current hero date block:
```tsx
<div className="hero-date-block">
  <time dateTime="2026-07-04" className="hero-date">
    <span className="hero-date-month">July</span>
    <span className="hero-date-day">4</span>
    <span className="hero-date-year">2026</span>
  </time>
  <p className="hero-date-label">America's 250th Birthday</p>
  <div className="hero-countdown-inline">
    <Countdown />
  </div>
</div>
```

### Consider replacing with:
```tsx
<div className="hero-date-block">
  <p className="hero-commemorative-year">
    <span className="hero-year-badge">2026</span>
    <span className="hero-year-label">The Commemorative Year</span>
  </p>
  <p className="hero-milestones">
    America's 250th · Tennessee's 230th
  </p>
</div>
```

This shifts from "countdown to one day" to "year-long celebration."

---

## Testing Checklist

After implementation, verify:

- [ ] Homepage no longer has VintageGauge components
- [ ] Homepage no longer has "First 250" CTAs (except maybe one subtle mention)
- [ ] "Experience Preview" section appears after Blount Letter
- [ ] "Events Showcase" section shows variety (lectures, festivals, seasonal)
- [ ] Story section CTA goes to /visit, not /first-250
- [ ] Period ornamentation (dividers, etc.) renders correctly
- [ ] Mobile responsive at 320px, 768px, 1024px
- [ ] All links work
- [ ] No console errors
- [ ] WCAG contrast ratios maintained

---

## Philosophy Reminder

**Ask before shipping any component:**

- Does it feel like 1790 or 2024?
- Is there a flourish or ornament where one would add joy?
- Would Governor Blount approve of this correspondence?
- Does it make the visitor feel like they're part of history?

**If it feels sterile, add warmth. If it feels generic, add character.**

---

## Questions for Claude Code

If unclear about any direction:
1. Default to showing VARIETY of events over any single event
2. Default to "experience the site" over "enroll in program"
3. Default to period ornamentation over clean minimalism
4. The First 250 page exists and is comprehensive—let it do the selling
