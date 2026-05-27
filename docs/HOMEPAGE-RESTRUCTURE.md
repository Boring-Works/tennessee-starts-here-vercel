# Rocky Mount Homepage Restructure Implementation Guide

## Project Context

**Repository:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here`
**Stack:** Next.js 14+, Tailwind CSS, TypeScript
**Design System:** Federal Heritage (navy/gold/rust/parchment palette)

### What Rocky Mount Is
- Tennessee State Historic Site in Piney Flats, TN
- First capital of the Southwest Territory (1790-1792)
- Where Governor William Blount established government west of the Appalachians
- Site settled ~1770, buildings date to 1820s
- Part of Tennessee's oldest documented farm (Century Farms, est. 1775)
- Living history site with costumed interpreters

### 2026 Programming
- America's 250th anniversary (July 4, 2026)
- Tennessee's 230th birthday (June 1, 2026)
- 17 events across 10 months
- 6-part lecture series with historians
- First 250 Registry program (250 names read aloud July 4)

---

## THE PROBLEM

The current homepage is a **conversion funnel for the First 250 program**, not a historic site homepage.

### Current Homepage Structure
```
1. Hero → Countdown to July 4, 2026
2. Blount Letter → Historical quote (good)
3. Promise vs Proof → 1776 vs 1790 comparison (good)
4. Story → Timeline leading to "Join the Celebration" CTA
5. Gathering → GIANT July 4 spotlight + First 250 gauge + 3 tiny event cards
6. Decision → Binary choice: First 250 OR email signup
7. Homecoming → Finally mentions visiting
```

### Problems Identified

**1. First 250 Saturation**
The VintageGauge enrollment counter appears:
- Homepage `gathering-section`
- Homepage `decision-section`
- First 250 page (3 times)
- Events page CTA section

This creates sales pressure inappropriate for a state historic site.

**2. Event Variety is Hidden**
You have 17 diverse events:
- 6 lectures by historians (Byrd, Patton, Bachelor, Whitfield, Doan, Wolfe)
- Woolly Days & Colonial Gardening
- Early Frontier Days & Colonial Trade Fair
- America 250 Flag Weekend
- Colonial Independence Day (July 4)
- Cherokee Heritage Weekend
- First Families Reunion
- Harvest Fest
- Haunting on the Mount
- Frontier Christmas
- Candlelight Christmas

But the homepage shows: **1 giant July 4 card + 3 tiny cards**. The richness is buried.

**3. Rocky Mount as Destination is Missing**
The homepage barely mentions:
- Costumed interpreters in period dress
- Historic buildings you can enter
- Living history experience
- What you actually DO when you visit

**4. Design Lacks Period Character**
The v6 HTML prototype has rich ornamentation (corner brackets, flourishes, wax seal feel). The Next.js implementation is too clean/modern.

---

## THE SOLUTION

### New Homepage Structure
```
1. Hero → "2026 Commemorative Year" (broader framing, not just July 4)
2. Blount Letter → Keep as-is (excellent)
3. Experience Preview → NEW: "Step Into 1790" - what visiting is like
4. Events Showcase → NEW: Variety of programming (replaces Gathering)
5. Promise vs Proof → Keep as-is (excellent)
6. Story → Keep, but remove First 250 CTA at end
7. Homecoming → Keep as-is
```

**REMOVED:**
- `gathering-section` (giant July 4 spotlight)
- `decision-section` (First 250 vs email binary)
- All VintageGauge components from homepage
- First 250 CTAs (except one subtle nav link)

---

## IMPLEMENTATION DETAILS

### File: `app/page.tsx`

#### REMOVE these imports:
```tsx
// REMOVE
import VintageGauge from "@/components/VintageGauge";
import enrollmentData from "@/data/enrollment.json";

// REMOVE these constants
const CURRENT_ENROLLED = enrollmentData.currentEnrolled;
const TOTAL_SPOTS = enrollmentData.totalSpots;
const PROGRESS_PERCENT = Math.round((CURRENT_ENROLLED / TOTAL_SPOTS) * 100);
```

#### REMOVE the entire `gathering-section` (approximately lines 180-280)
This is the section that starts with:
```tsx
{/* ============================================
    FEATURED EVENTS - The Gathering
    ============================================ */}
<section className="gathering-section" ...>
```

#### REMOVE the entire `decision-section` (approximately lines 285-380)
This is the section that starts with:
```tsx
{/* ============================================
    THE DECISION POINT - Choose Your Path
    ============================================ */}
<section className="decision-section" ...>
```

#### MODIFY `story-footer` to remove First 250 reference
Change:
```tsx
<footer className="story-footer">
  <p className="story-footer-text">
    <strong>230 years later</strong>, we remember where it started.
  </p>
  <Link href="/events" className="story-footer-cta">
    Join the Celebration
    <span aria-hidden="true">→</span>
  </Link>
</footer>
```
To:
```tsx
<footer className="story-footer">
  <p className="story-footer-text">
    <strong>230 years later</strong>, we remember where it started.
  </p>
  <Link href="/events" className="story-footer-cta">
    Explore 2026 Events
    <span aria-hidden="true">→</span>
  </Link>
</footer>
```

#### ADD new sections after Blount Letter

Insert these two new sections after the `blount-section` and before `ledger-section`:

```tsx
{/* ============================================
    EXPERIENCE PREVIEW - Step Into 1790
    ============================================ */}
<ExperiencePreview />

{/* ============================================
    EVENTS SHOWCASE - The Commemorative Year
    ============================================ */}
<EventsShowcase events={eventsData.events} lectures={lecturesData} />
```

Add imports at top:
```tsx
import ExperiencePreview from "@/components/ExperiencePreview";
import EventsShowcase from "@/components/EventsShowcase";
import lecturesData from "@/data/lectures.json";
```

---

### NEW FILE: `components/ExperiencePreview.tsx`

```tsx
export default function ExperiencePreview() {
  return (
    <section className="experience-section" aria-labelledby="experience-heading">
      <div className="experience-container">
        {/* Section header */}
        <header className="experience-header">
          <p className="experience-eyebrow">The Living History Experience</p>
          <h2 id="experience-heading" className="experience-headline">
            Step Into 1790
          </h2>
          <p className="experience-intro">
            Rocky Mount isn&apos;t a museum behind glass. It&apos;s a place where history lives and breathes.
          </p>
        </header>

        {/* Experience moments grid */}
        <div className="experience-grid">
          <article className="experience-moment">
            <span className="experience-moment-icon" aria-hidden="true">⚑</span>
            <h3 className="experience-moment-title">Walk the Grounds</h3>
            <p className="experience-moment-text">
              Stand where Governor Blount first convened territorial government. The same soil. The same view of the mountains.
            </p>
          </article>

          <article className="experience-moment">
            <span className="experience-moment-icon" aria-hidden="true">☺</span>
            <h3 className="experience-moment-title">Meet the Settlers</h3>
            <p className="experience-moment-text">
              Costumed interpreters bring frontier life to vivid reality. Ask questions. Hear stories. See daily life as it was.
            </p>
          </article>

          <article className="experience-moment">
            <span className="experience-moment-icon" aria-hidden="true">⌂</span>
            <h3 className="experience-moment-title">Enter the Buildings</h3>
            <p className="experience-moment-text">
              Step inside structures from Tennessee&apos;s territorial period. Touch the hand-hewn logs. Feel the history.
            </p>
          </article>

          <article className="experience-moment">
            <span className="experience-moment-icon" aria-hidden="true">✦</span>
            <h3 className="experience-moment-title">Hear the Story</h3>
            <p className="experience-moment-text">
              Guided tours reveal how a frontier outpost became the birthplace of Tennessee&apos;s government.
            </p>
          </article>
        </div>

        {/* Visitor info teaser */}
        <footer className="experience-footer">
          <div className="experience-info">
            <p className="experience-info-item">
              <strong>Open:</strong> Tue–Sat 10am–5pm, Sun 1pm–5pm
            </p>
            <span className="experience-info-divider" aria-hidden="true">·</span>
            <p className="experience-info-item">
              <strong>30 min</strong> from Johnson City
            </p>
          </div>
          <a href="/visit" className="experience-cta">
            Plan Your Visit
            <span aria-hidden="true">→</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
```

---

### NEW FILE: `components/EventsShowcase.tsx`

```tsx
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  date: string;
  endDate?: string | null;
  time?: string | null;
  type: string;
  category: string;
  description: string;
  speaker?: string;
  speakerTitle?: string;
  featured?: boolean;
}

interface Lecture {
  id: string;
  title: string;
  date: string;
  speaker: string;
  speakerTitle: string;
  description: string;
}

interface EventsShowcaseProps {
  events: Event[];
  lectures: { lectures: Lecture[] };
}

function getNextUpcomingEvent(events: Event[]): Event | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcoming = events
    .filter(e => new Date(e.date + "T12:00:00") >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return upcoming[0] || null;
}

function formatEventDate(dateStr: string): { month: string; day: string } {
  const date = new Date(dateStr + "T12:00:00");
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }),
    day: date.getDate().toString(),
  };
}

export default function EventsShowcase({ events, lectures }: EventsShowcaseProps) {
  const nextEvent = getNextUpcomingEvent(events);
  const nextLecture = lectures.lectures[0];
  
  // Get variety of event types for showcase
  const festivals = events.filter(e => e.category === "festival");
  const signature = events.filter(e => e.category === "signature");
  const seasonal = events.filter(e => e.category === "seasonal");
  
  const eventCount = events.length;
  const lectureCount = lectures.lectures.length;

  return (
    <section className="showcase-section" aria-labelledby="showcase-heading">
      <div className="showcase-container">
        {/* Section header */}
        <header className="showcase-header">
          <p className="showcase-eyebrow">2026 Programming</p>
          <h2 id="showcase-heading" className="showcase-headline">
            The Commemorative Year
          </h2>
          <p className="showcase-intro">
            {eventCount} events across 10 months. Lectures, festivals, living history, and once-in-a-generation celebrations.
          </p>
        </header>

        {/* Stats bar */}
        <div className="showcase-stats">
          <div className="showcase-stat">
            <span className="showcase-stat-number">{eventCount}</span>
            <span className="showcase-stat-label">Events</span>
          </div>
          <div className="showcase-stat-divider" aria-hidden="true" />
          <div className="showcase-stat">
            <span className="showcase-stat-number">{lectureCount}</span>
            <span className="showcase-stat-label">Lectures</span>
          </div>
          <div className="showcase-stat-divider" aria-hidden="true" />
          <div className="showcase-stat">
            <span className="showcase-stat-number">{festivals.length}</span>
            <span className="showcase-stat-label">Festivals</span>
          </div>
          <div className="showcase-stat-divider" aria-hidden="true" />
          <div className="showcase-stat">
            <span className="showcase-stat-number">2</span>
            <span className="showcase-stat-label">Signature Events</span>
          </div>
        </div>

        {/* Event categories showcase */}
        <div className="showcase-grid">
          {/* Lecture Series Card */}
          <article className="showcase-card showcase-card--lecture">
            <div className="showcase-card-header">
              <span className="showcase-card-badge">Lecture Series</span>
              <span className="showcase-card-count">{lectureCount} Scholars</span>
            </div>
            <h3 className="showcase-card-title">The Founding Story</h3>
            <p className="showcase-card-desc">
              Six historians and interpreters explore Tennessee&apos;s founding. From frontier religion to the march to Kings Mountain.
            </p>
            {nextLecture && (
              <div className="showcase-card-next">
                <p className="showcase-card-next-label">Next Lecture</p>
                <p className="showcase-card-next-title">{nextLecture.title.replace("Lecture: ", "")}</p>
                <p className="showcase-card-next-speaker">{nextLecture.speaker}</p>
              </div>
            )}
            <Link href="/lectures" className="showcase-card-cta">
              View Lecture Series <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* Festivals & Living History Card */}
          <article className="showcase-card showcase-card--festival">
            <div className="showcase-card-header">
              <span className="showcase-card-badge">Festivals</span>
              <span className="showcase-card-count">{festivals.length} Events</span>
            </div>
            <h3 className="showcase-card-title">Living History Weekends</h3>
            <p className="showcase-card-desc">
              Immersive experiences bringing frontier life to vivid reality. Demonstrations, encampments, period vendors.
            </p>
            <ul className="showcase-card-list">
              <li>Woolly Days & Colonial Gardening</li>
              <li>Early Frontier Days</li>
              <li>Cherokee Heritage Weekend</li>
              <li>Harvest Fest</li>
            </ul>
            <Link href="/events" className="showcase-card-cta">
              View All Festivals <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* Signature Events Card */}
          <article className="showcase-card showcase-card--signature">
            <div className="showcase-card-header">
              <span className="showcase-card-badge showcase-card-badge--gold">Signature</span>
            </div>
            <h3 className="showcase-card-title">Once-in-a-Generation</h3>
            <p className="showcase-card-desc">
              Two landmark events marking America&apos;s 250th and Tennessee&apos;s founding families.
            </p>
            <div className="showcase-signature-events">
              <div className="showcase-signature-event">
                <time dateTime="2026-07-04" className="showcase-signature-date">July 4</time>
                <p className="showcase-signature-name">Colonial Independence Day</p>
                <p className="showcase-signature-note">America&apos;s 250th Birthday</p>
              </div>
              <div className="showcase-signature-event">
                <time dateTime="2026-09-11" className="showcase-signature-date">Sep 11–13</time>
                <p className="showcase-signature-name">First Families Reunion</p>
                <p className="showcase-signature-note">Descendants Gather</p>
              </div>
            </div>
          </article>

          {/* Seasonal Events Card */}
          <article className="showcase-card showcase-card--seasonal">
            <div className="showcase-card-header">
              <span className="showcase-card-badge">Seasonal</span>
            </div>
            <h3 className="showcase-card-title">Traditions</h3>
            <p className="showcase-card-desc">
              Annual favorites return with special America 250 programming.
            </p>
            <ul className="showcase-card-list">
              <li>Haunting on the Mount <span className="showcase-card-list-note">Oct</span></li>
              <li>Frontier Christmas <span className="showcase-card-list-note">Nov</span></li>
              <li>Candlelight Christmas <span className="showcase-card-list-note">Dec</span></li>
            </ul>
          </article>
        </div>

        {/* Footer CTA */}
        <footer className="showcase-footer">
          <Link href="/events" className="showcase-footer-cta">
            View Full 2026 Calendar
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}
```

---

### ADD CSS to `app/globals.css`

Add these styles for the new components:

```css
/* ============================================
   EXPERIENCE PREVIEW SECTION
   ============================================ */

.experience-section {
  padding: 4rem 1rem;
  background: var(--cream);
}

@media (min-width: 768px) {
  .experience-section {
    padding: 5rem 1.5rem;
  }
}

.experience-container {
  max-width: 64rem;
  margin: 0 auto;
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
  margin-bottom: 0.5rem;
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
  color: var(--foreground);
  max-width: 36rem;
  margin: 0 auto;
}

.experience-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

@media (min-width: 640px) {
  .experience-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .experience-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.experience-moment {
  background: white;
  padding: 1.5rem;
  text-align: center;
  border-left: 3px solid var(--accent);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.experience-moment-icon {
  display: block;
  font-size: 1.75rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.experience-moment-title {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.experience-moment-text {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-light);
}

.experience-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(10, 22, 40, 0.1);
}

@media (min-width: 640px) {
  .experience-footer {
    flex-direction: row;
    justify-content: space-between;
  }
}

.experience-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--text-light);
}

.experience-info-item strong {
  color: var(--primary);
}

.experience-info-divider {
  color: var(--accent);
}

.experience-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--primary);
  background: var(--accent);
  transition: all 0.3s ease;
}

.experience-cta:hover {
  background: var(--secondary);
  color: white;
  transform: translateY(-2px);
}

/* ============================================
   EVENTS SHOWCASE SECTION
   ============================================ */

.showcase-section {
  padding: 4rem 1rem;
  background: var(--primary);
  color: white;
}

@media (min-width: 768px) {
  .showcase-section {
    padding: 5rem 1.5rem;
  }
}

.showcase-container {
  max-width: 72rem;
  margin: 0 auto;
}

.showcase-header {
  text-align: center;
  margin-bottom: 2rem;
}

.showcase-eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.5rem;
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
  max-width: 40rem;
  margin: 0 auto;
}

/* Stats bar */
.showcase-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2.5rem;
}

@media (min-width: 640px) {
  .showcase-stats {
    gap: 0;
  }
}

.showcase-stat {
  text-align: center;
  padding: 0 1.5rem;
}

.showcase-stat-number {
  display: block;
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}

.showcase-stat-label {
  display: block;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.25rem;
}

.showcase-stat-divider {
  display: none;
  width: 1px;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.2);
}

@media (min-width: 640px) {
  .showcase-stat-divider {
    display: block;
  }
}

/* Cards grid */
.showcase-grid {
  display: grid;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
  .showcase-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .showcase-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Card base */
.showcase-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.showcase-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(201, 162, 39, 0.3);
}

.showcase-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.showcase-card-badge {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--primary);
  background: rgba(255, 255, 255, 0.9);
  padding: 0.25rem 0.625rem;
}

.showcase-card-badge--gold {
  background: var(--accent);
}

.showcase-card-count {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
}

.showcase-card-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.showcase-card-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.showcase-card-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.75);
}

.showcase-card-list li {
  padding: 0.375rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.showcase-card-list li:last-child {
  border-bottom: none;
}

.showcase-card-list-note {
  font-size: 0.7rem;
  color: var(--accent);
  font-weight: 600;
}

.showcase-card-next {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-left: 2px solid var(--accent);
}

.showcase-card-next-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.25rem;
}

.showcase-card-next-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.125rem;
}

.showcase-card-next-speaker {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
}

.showcase-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-top: auto;
  transition: color 0.2s ease;
}

.showcase-card-cta:hover {
  color: white;
}

/* Signature events special styling */
.showcase-card--signature {
  border-color: rgba(201, 162, 39, 0.3);
}

.showcase-signature-events {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.showcase-signature-event {
  padding: 0.75rem;
  background: rgba(201, 162, 39, 0.1);
  border-left: 3px solid var(--accent);
}

.showcase-signature-date {
  font-family: var(--font-serif);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--accent);
}

.showcase-signature-name {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0.125rem 0;
}

.showcase-signature-note {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Footer */
.showcase-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.showcase-footer-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  background: var(--accent);
  transition: all 0.3s ease;
}

.showcase-footer-cta:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* ============================================
   HERITAGE DECORATIVE ELEMENTS
   ============================================ */

/* Corner brackets for special cards */
.heritage-corners {
  position: relative;
}

.heritage-corners::before,
.heritage-corners::after {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border: 3px solid var(--accent);
  opacity: 0.5;
  pointer-events: none;
}

.heritage-corners::before {
  top: -1px;
  left: -1px;
  border-right: none;
  border-bottom: none;
}

.heritage-corners::after {
  bottom: -1px;
  right: -1px;
  border-left: none;
  border-top: none;
}

/* Decorative divider */
.heritage-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 3rem 0;
}

.heritage-divider::before,
.heritage-divider::after {
  content: "";
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}

.heritage-divider span {
  color: var(--accent);
  font-size: 1rem;
}

/* Period ornament utility classes */
.ornament-star { color: var(--accent); }
.ornament-diamond { color: var(--accent); }
.ornament-fleuron { color: var(--accent); opacity: 0.7; }
```

---

## DESIGN PHILOSOPHY

### This Is Not a SaaS Landing Page

The previous conversation established this core principle:

> "This is a **1790s historic site** celebrating 250 years of American history — it should feel like opening a letter sealed with wax, not like a SaaS landing page."

### Key Principles

1. **Lead with Experience, Not Enrollment**
   - What will I SEE when I visit?
   - What will I DO?
   - Who will I MEET?
   
2. **Show Variety, Not Just One Event**
   - 17 events deserve representation
   - Lectures, festivals, seasonal, signature
   - Something for everyone
   
3. **Respect Historic Site Dignity**
   - One First 250 mention max on homepage
   - Let the dedicated page do the selling
   - Avoid "spots remaining" pressure tactics
   
4. **Period Character Over Modern Clean**
   - Corner bracket flourishes
   - Decorative dividers (★ ◆ ❧)
   - "Would Governor Blount approve?"

### What Success Looks Like

A visitor to the homepage should:
1. Understand Rocky Mount is a PLACE they can VISIT
2. Feel the historical significance (1790, Southwest Territory)
3. See the VARIETY of 2026 programming
4. Want to explore further (events, lectures, visit info)
5. NOT feel like they're being sold a spot in a limited-enrollment program

---

## CHECKLIST FOR CLAUDE CODE

- [ ] Remove VintageGauge imports from homepage
- [ ] Remove enrollment data from homepage
- [ ] Delete `gathering-section` entirely
- [ ] Delete `decision-section` entirely
- [ ] Modify story footer CTA text
- [ ] Create `components/ExperiencePreview.tsx`
- [ ] Create `components/EventsShowcase.tsx`
- [ ] Add CSS for new components to `globals.css`
- [ ] Add heritage decorative CSS classes
- [ ] Import and place new components in `page.tsx`
- [ ] Test on mobile and desktop
- [ ] Verify no First 250 pressure tactics remain on homepage

---

## FILES TO MODIFY

| File | Action |
|------|--------|
| `app/page.tsx` | Major restructure - remove sections, add components |
| `app/globals.css` | Add ~300 lines of new component styles |
| `components/ExperiencePreview.tsx` | CREATE NEW |
| `components/EventsShowcase.tsx` | CREATE NEW |

---

## VERIFICATION

After implementation, the homepage should:

1. ✅ NOT mention "250 spots" or show enrollment gauge
2. ✅ Show at least 4 different event types
3. ✅ Include "Step Into 1790" or similar experience preview
4. ✅ Have ONE clear path to First 250 (nav link only)
5. ✅ Lead visitors toward /visit and /events equally
6. ✅ Feel like a historic site, not a ticketing platform
