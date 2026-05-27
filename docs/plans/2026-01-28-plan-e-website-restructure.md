# Plan E: Website Restructure Implementation

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure Rocky Mount website with two-layer StoryBrand architecture, adding 4 new pages and lightening the homepage for March 4, 2026 launch.

**Architecture:** Layer 1 (Customer Journey) for conversion-focused routing, Layer 2 (Authority Building) for deep narrative. Homepage becomes a lightweight router; detailed content moves to dedicated pages.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4, TypeScript, CSS Modules

---

## Pre-Implementation Checklist

Before starting:

- [ ] Verify baseline tests pass: `npm run lint && npm run build`
- [ ] Current commit is tagged as `v1.0-baseline`
- [ ] Review Plan E design document: `Brand Guidelines/PLAN-E-IMPLEMENTATION.md`

---

## Task 1: Fix /visit Page — Remove "Est. 1770" and Update Description

**Files:**

- Modify: `app/(main)/visit/page.tsx:194-200` (badge section)
- Modify: `app/(main)/visit/page.tsx:219-222` (promise text)
- Modify: `app/(main)/visit/page.tsx:726-728` (closing section)

**Step 1: Remove "Est. 1770" badge**

In `app/(main)/visit/page.tsx`, find lines 194-200 and replace:

```tsx
{
  /* Establishment badge */
}
;<p className={styles['visit-hero-badge']}>
  <span className={styles['visit-hero-badge-year']}>Est. 1770</span>
  <span className={styles['visit-hero-badge-sep']} aria-hidden="true">
    ·
  </span>
  <span>Tennessee State Historic Site</span>
</p>
```

With:

```tsx
{
  /* Site designation badge */
}
;<p className={styles['visit-hero-badge']}>
  <span>Tennessee State Historic Site</span>
</p>
```

**Step 2: Update experience promise**

Find lines 219-222 and replace:

```tsx
<p className={styles['visit-hero-promise']}>
  History isn&apos;t behind glass here. Costumed interpreters bring 1790 to life on the same grounds
  where William Blount governed and Andrew Jackson once stayed.
</p>
```

With:

```tsx
<p className={styles['visit-hero-promise']}>
  This is where federal power first reached west of the Appalachians. Walk the same grounds where
  Governor Blount governed the Southwest Territory and negotiated the Treaty of Holston with
  forty-one Cherokee chiefs.
</p>
```

**Step 3: Update closing section**

Find lines 726-728 and replace:

```tsx
<p className={styles['visit-closing-lead']}>Tennessee&apos;s story started here in 1770.</p>
```

With:

```tsx
<p className={styles['visit-closing-lead']}>Tennessee&apos;s story started here in 1790.</p>
```

**Step 4: Update days from "Tue-Sun" to "Wed-Sat"**

Find lines 241-243 and replace:

```tsx
<div className={styles['visit-hero-fact']}>
  <span className={styles['visit-hero-fact-value']}>Tue–Sun</span>
  <span className={styles['visit-hero-fact-label']}>Open</span>
</div>
```

With:

```tsx
<div className={styles['visit-hero-fact']}>
  <span className={styles['visit-hero-fact-value']}>Wed–Sat</span>
  <span className={styles['visit-hero-fact-label']}>Open</span>
</div>
```

**Step 5: Verify changes**

Run: `npm run lint && npm run build`
Expected: Both pass

**Step 6: Commit**

```bash
git add app/(main)/visit/page.tsx
git commit -m "$(cat <<'EOF'
fix(visit): remove undocumented EST. 1770 claim, update description

- Remove "Est. 1770" badge (date not documented)
- Update promise text to focus on verifiable claims (Treaty of Holston)
- Change closing text from 1770 to 1790 (territorial capital period)
- Update days from Tue-Sun to Wed-Sat (current operating schedule)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Fix /events Page — Update Stats and Subhead

**Files:**

- Modify: `app/(main)/events/page.tsx:136-139` (subheadline)

**Step 1: Update subheadline**

Note: The current subheadline doesn't have the broken "5 LECTURES | 7 FESTIVALS" stats mentioned in Plan E — those appear to be elsewhere or in a header component. Let's update what's in the page file.

Find lines 136-139 in `app/(main)/events/page.tsx`:

```tsx
<p className={styles['calendar-subheadline']}>
  America turns 250. Tennessee turns 230.
  <br />
  <span className={styles['calendar-subheadline-tagline']}>Tennessee starts here.</span>
</p>
```

Replace with:

```tsx
<p className={styles['calendar-subheadline']}>
  The nation turns 250. Tennessee turns 230.
  <br />
  <span className={styles['calendar-subheadline-tagline']}>This is where that story started.</span>
</p>
```

**Step 2: Verify changes**

Run: `npm run lint && npm run build`
Expected: Both pass

**Step 3: Commit**

```bash
git add app/(main)/events/page.tsx
git commit -m "$(cat <<'EOF'
fix(events): strengthen subhead to emphasize Rocky Mount's role

- Update subhead to "The nation turns 250..." phrasing
- Emphasize Rocky Mount as the origin of the story

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Update Navigation — Add New Routes

**Files:**

- Modify: `components/Navigation.tsx:10-17` (NAV_LINKS array)

**Step 1: Update NAV_LINKS**

In `components/Navigation.tsx`, find lines 10-17:

```tsx
const NAV_LINKS = [
  { href: '/', label: 'Our Story' },
  { href: '/evidence', label: 'Evidence' },
  { href: '/events', label: 'Events' },
  { href: '/lectures', label: 'Lectures' },
  { href: '/visit', label: 'Visit' },
  { href: '/almanac', label: 'Almanac' },
]
```

Replace with:

```tsx
const NAV_LINKS = [
  { href: '/visit', label: 'Visit' },
  { href: '/events', label: 'Events' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/evidence', label: 'Evidence' },
  { href: '/support', label: 'Support' },
]

const EDUCATOR_LINK = { href: '/educators', label: 'For Educators' }
```

**Step 2: Add Educators button to desktop nav**

Find lines 140-169 (desktop nav section) and after the closing `</ul>` but before the divider, add the Educators button. The section should now look like:

```tsx
{
  /* Desktop Nav */
}
;<nav className={styles.nav} aria-label="Main navigation">
  <ul className={styles['nav-list']} role="menubar">
    {NAV_LINKS.map((link) => (
      <li key={link.href} role="none">
        <Link
          href={link.href}
          role="menuitem"
          aria-current={isActive(link.href) ? 'page' : undefined}
          className={`${styles['nav-link']} ${
            isActive(link.href) ? styles['nav-link--active'] : ''
          }`}
        >
          {link.label}
          <span className={styles['nav-link-underline']} aria-hidden="true" />
          <span className={styles['nav-link-glow']} aria-hidden="true" />
        </Link>
      </li>
    ))}
  </ul>

  {/* Divider */}
  <span className={styles['nav-divider']} aria-hidden="true" />

  {/* Educators Button */}
  <Link href={EDUCATOR_LINK.href} className={styles['cta-educators']}>
    <span className={styles['cta-text']}>{EDUCATOR_LINK.label}</span>
  </Link>

  {/* Divider */}
  <span className={styles['nav-divider']} aria-hidden="true" />

  {/* CTA */}
  <Link href="/visit" className={styles.cta}>
    <span className={styles['cta-text']}>Plan Your Visit</span>
    <Feather className={styles['cta-icon']} size={14} />
  </Link>
</nav>
```

**Step 3: Add Educators button to mobile nav**

In the mobile menu section, after the mobile CTA but before the footer, we need the Educators button visible on mobile header. Update the mobile-toggle area (around line 172) to include an Educators button before the hamburger.

Find the mobile toggle button and add the Educators button before it:

```tsx
{/* Educators Button - stays visible on mobile */}
<Link href={EDUCATOR_LINK.href} className={styles['mobile-educators']}>
  {EDUCATOR_LINK.label}
</Link>

{/* Mobile Toggle */}
<button
  type="button"
  className={styles['mobile-toggle']}
  ...
```

**Step 4: Add CSS for new buttons**

In `components/Header/Header.module.css`, add:

```css
/* Educators CTA Button */
.cta-educators {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-accent);
  color: var(--color-primary);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.cta-educators:hover {
  background: var(--color-secondary);
  color: var(--color-cream);
}

/* Mobile Educators Button */
.mobile-educators {
  display: none;
  padding: 0.5rem 0.75rem;
  background: var(--color-accent);
  color: var(--color-primary);
  border-radius: 4px;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-right: 0.75rem;
}

@media (max-width: 1023px) {
  .mobile-educators {
    display: flex;
  }
  .cta-educators {
    display: none;
  }
}
```

**Step 5: Verify changes**

Run: `npm run lint && npm run build`
Expected: Both pass

**Step 6: Commit**

```bash
git add components/Navigation.tsx components/Header/Header.module.css
git commit -m "$(cat <<'EOF'
feat(nav): restructure navigation for Plan E

- Reorder nav: Visit | Events | Our Story | Evidence | Support
- Add "For Educators" button (visible on both desktop and mobile header)
- Remove Almanac and Lectures from main nav
- Update styling for new educator CTA button

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Create /educators Page

**Files:**

- Create: `app/(main)/educators/page.tsx`
- Create: `app/(main)/educators/page.module.css`

**Step 1: Create educators page**

Create `app/(main)/educators/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'For Educators | Tennessee Starts Here',
  description:
    'Field trip programs at Rocky Mount State Historic Site. TN Standards aligned, hands-on learning for all ages.',
  openGraph: {
    title: 'For Educators | Tennessee Starts Here',
    description:
      'Field trip programs at Rocky Mount State Historic Site. TN Standards aligned, hands-on learning for all ages.',
    url: 'https://tennesseestartshere.com/educators',
  },
}

const PROGRAMS = [
  {
    name: 'Living History Tour',
    duration: '~2 hours',
    capacity: 'Any group size',
    description:
      'Guided tour with costumed interpreters, introductory video, and museum gallery access.',
  },
  {
    name: 'Tour & Craft',
    duration: '~3.5 hours',
    capacity: 'Up to 80 students',
    description: 'Tour plus hands-on frontier craft activity.',
  },
  {
    name: 'Living History Sampler',
    duration: '3-4 hours',
    capacity: '80+ students',
    description: 'Multiple demonstration stations for larger groups.',
  },
  {
    name: 'Preschool Program',
    duration: '~1.5 hours',
    capacity: 'Ages 3-5',
    description: 'Stories, games, and sheep interaction.',
  },
  {
    name: 'Kindergarten Program',
    duration: '~1.5 hours',
    capacity: 'Kindergarten',
    description: 'Scavenger hunt, wool processing demo.',
  },
  {
    name: 'Virtual Programs',
    duration: '45-60 min',
    capacity: 'Zoom/WebEx',
    description: 'Bring Rocky Mount to your classroom remotely.',
  },
]

const STATS = [
  { label: 'TN Standards Aligned', icon: '📚' },
  { label: 'Hands-On Learning', icon: '🎓' },
  { label: 'Bus Parking Available', icon: '🚌' },
]

export default function EducatorsPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>For Educators</p>
          <h1 className={styles.headline}>History happens here.</h1>
          <p className={styles.subhead}>
            Give your students a tangible connection to Tennessee&apos;s founding.
          </p>
          <a
            href="https://form.jotform.com/230155675460152"
            target="_blank"
            rel="noopener noreferrer"
            className={styles['cta-primary']}
          >
            Book a Field Trip
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.stats}>
        <div className={styles['stats-inner']}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles['stats-item']}>
              <span className={styles['stats-icon']}>{stat.icon}</span>
              <span className={styles['stats-label']}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className={styles.programs}>
        <div className={styles['programs-inner']}>
          <h2 className={styles['programs-headline']}>Programs</h2>
          <div className={styles['programs-grid']}>
            {PROGRAMS.map((program) => (
              <article key={program.name} className={styles['program-card']}>
                <h3 className={styles['program-name']}>{program.name}</h3>
                <div className={styles['program-meta']}>
                  <span>{program.duration}</span>
                  <span className={styles['program-divider']}>·</span>
                  <span>{program.capacity}</span>
                </div>
                <p className={styles['program-desc']}>{program.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className={styles.booking}>
        <div className={styles['booking-inner']}>
          <h2 className={styles['booking-headline']}>Book a Field Trip</h2>
          <a
            href="https://form.jotform.com/230155675460152"
            target="_blank"
            rel="noopener noreferrer"
            className={styles['cta-primary']}
          >
            Book a Field Trip →
          </a>
          <p className={styles['booking-contact']}>
            Questions? <a href="mailto:rockymountmuseum@gmail.com">rockymountmuseum@gmail.com</a> |{' '}
            <a href="tel:+14235387396">(423) 538-7396</a>
          </p>
        </div>
      </section>

      {/* Funding */}
      <section className={styles.funding}>
        <div className={styles['funding-inner']}>
          <h2 className={styles['funding-headline']}>Funding Your Trip</h2>
          <ul className={styles['funding-list']}>
            <li>
              <strong>TN Arts Commission:</strong> Student Ticket Subsidy Grants (30-day advance
              application required)
            </li>
            <li>
              <strong>OVTA:</strong> Needs-based funding for transportation and admission
            </li>
            <li>
              <strong>Title I:</strong> Check with your district
            </li>
          </ul>
        </div>
      </section>

      {/* Resources */}
      <section className={styles.resources}>
        <div className={styles['resources-inner']}>
          <h2 className={styles['resources-headline']}>Downloadable Resources</h2>
          <p className={styles['resources-coming']}>Classroom materials coming March 2026.</p>
          <p className={styles['resources-email']}>Or email us for current materials.</p>
        </div>
      </section>
    </>
  )
}
```

**Step 2: Create educators CSS module**

Create `app/(main)/educators/page.module.css`:

```css
/* Educators Page Styles */

.hero {
  background: var(--color-primary);
  color: var(--color-cream);
  padding: 6rem 1.5rem 4rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.headline {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  margin-bottom: 1rem;
}

.subhead {
  font-size: 1.125rem;
  color: var(--color-cream-dark);
  margin-bottom: 2rem;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--color-accent);
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.cta-primary:hover {
  background: var(--color-cream);
  transform: translateY(-2px);
}

/* Stats Bar */
.stats {
  background: var(--color-secondary);
  padding: 1.5rem;
}

.stats-inner {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.stats-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-cream);
}

.stats-icon {
  font-size: 1.25rem;
}

.stats-label {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Programs */
.programs {
  padding: 4rem 1.5rem;
  background: var(--color-cream);
}

.programs-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.programs-headline {
  font-family: var(--font-serif);
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.program-card {
  background: white;
  border: 1px solid var(--color-secondary);
  border-radius: 4px;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.program-card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.program-name {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.program-meta {
  font-size: 0.875rem;
  color: var(--color-secondary);
  margin-bottom: 1rem;
}

.program-divider {
  margin: 0 0.5rem;
}

.program-desc {
  font-size: 0.9375rem;
  color: #555;
  line-height: 1.6;
}

/* Booking */
.booking {
  padding: 4rem 1.5rem;
  background: var(--color-primary);
  text-align: center;
}

.booking-inner {
  max-width: 600px;
  margin: 0 auto;
}

.booking-headline {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--color-cream);
  margin-bottom: 1.5rem;
}

.booking-contact {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-cream-dark);
}

.booking-contact a {
  color: var(--color-accent);
  text-decoration: underline;
}

/* Funding */
.funding {
  padding: 3rem 1.5rem;
  background: var(--color-cream);
}

.funding-inner {
  max-width: 800px;
  margin: 0 auto;
}

.funding-headline {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.funding-list {
  list-style: disc;
  padding-left: 1.5rem;
  color: #333;
  line-height: 1.8;
}

.funding-list strong {
  color: var(--color-primary);
}

/* Resources */
.resources {
  padding: 3rem 1.5rem;
  background: white;
  border-top: 1px solid var(--color-cream-dark);
}

.resources-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.resources-headline {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.resources-coming {
  font-size: 1rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}

.resources-email {
  font-size: 0.875rem;
  color: #666;
}
```

**Step 3: Verify changes**

Run: `npm run lint && npm run build`
Expected: Both pass

**Step 4: Commit**

```bash
git add app/(main)/educators/
git commit -m "$(cat <<'EOF'
feat(educators): add /educators page with 6 programs

- Hero with "History happens here" headline
- Stats bar: TN Standards, Hands-On, Bus Parking
- 6 program cards with duration and capacity
- JotForm booking link (230155675460152)
- Funding section (TN Arts Commission, OVTA, Title I)
- Resources section (coming March 2026)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Create /groups Page

**Files:**

- Create: `app/(main)/groups/page.tsx`
- Create: `app/(main)/groups/page.module.css`

**Step 1: Create groups page**

Create `app/(main)/groups/page.tsx`:

```tsx
import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Group Visits | Tennessee Starts Here',
  description:
    'Special rates for bus tours, reunions, scouts, and groups of 10+ at Rocky Mount State Historic Site.',
  openGraph: {
    title: 'Group Visits | Tennessee Starts Here',
    description:
      'Special rates for bus tours, reunions, scouts, and groups of 10+ at Rocky Mount State Historic Site.',
    url: 'https://tennesseestartshere.com/groups',
  },
}

const GROUP_TYPES = [
  'Motor coach and bus tours (bus parking available)',
  'Family reunions',
  'Scout troops',
  'Church groups',
  'Senior organizations',
  'Historical societies',
]

const RATES = [
  { tier: 'Groups of 10+', price: '$10/person', note: '(regular $12)' },
  { tier: 'Groups of 25+', price: '$8/person', note: '' },
  { tier: 'Student groups', price: '$6/student', note: '' },
  { tier: 'Driver/escort', price: 'Complimentary', note: '' },
]

const WHAT_TO_KNOW = [
  'Book 2+ weeks in advance',
  'Tours are outdoors; dress for weather',
  'No air conditioning in historic house',
  'Museum gallery is ADA accessible with climate control',
  'Bus/RV parking available',
  'Picnic area for groups bringing lunch',
]

export default function GroupsPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>Group Visits</p>
          <h1 className={styles.headline}>Bring Your Group</h1>
          <p className={styles.subhead}>Special rates for tours, reunions, and organizations</p>
        </div>
      </section>

      {/* We Welcome */}
      <section className={styles.welcome}>
        <div className={styles['welcome-inner']}>
          <h2 className={styles['welcome-headline']}>We Welcome</h2>
          <ul className={styles['welcome-list']}>
            {GROUP_TYPES.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rates */}
      <section className={styles.rates}>
        <div className={styles['rates-inner']}>
          <h2 className={styles['rates-headline']}>Group Rates</h2>
          <div className={styles['rates-table']}>
            {RATES.map((rate) => (
              <div key={rate.tier} className={styles['rates-row']}>
                <span className={styles['rates-tier']}>{rate.tier}</span>
                <span className={styles['rates-price']}>
                  {rate.price}
                  {rate.note && <span className={styles['rates-note']}> {rate.note}</span>}
                </span>
              </div>
            ))}
          </div>
          <p className={styles['rates-includes']}>All visits include guided tour (~1 hour)</p>
        </div>
      </section>

      {/* Contact Form CTA */}
      <section className={styles.contact}>
        <div className={styles['contact-inner']}>
          <h2 className={styles['contact-headline']}>Plan Your Group Visit</h2>
          <p className={styles['contact-desc']}>Contact us to schedule your group tour.</p>
          <div className={styles['contact-methods']}>
            <a href="tel:+14235387396" className={styles['contact-btn-primary']}>
              Call (423) 538-7396
            </a>
            <a href="mailto:rockymountmuseum@gmail.com" className={styles['contact-btn-secondary']}>
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* What to Know */}
      <section className={styles.know}>
        <div className={styles['know-inner']}>
          <h2 className={styles['know-headline']}>What to Know</h2>
          <ul className={styles['know-list']}>
            {WHAT_TO_KNOW.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
```

**Step 2: Create groups CSS module**

Create `app/(main)/groups/page.module.css`:

```css
/* Groups Page Styles */

.hero {
  background: var(--color-primary);
  color: var(--color-cream);
  padding: 6rem 1.5rem 4rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.headline {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  margin-bottom: 1rem;
}

.subhead {
  font-size: 1.125rem;
  color: var(--color-cream-dark);
}

/* We Welcome */
.welcome {
  padding: 3rem 1.5rem;
  background: var(--color-cream);
}

.welcome-inner {
  max-width: 800px;
  margin: 0 auto;
}

.welcome-headline {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.welcome-list {
  list-style: disc;
  padding-left: 1.5rem;
  color: #333;
  line-height: 1.8;
}

/* Rates */
.rates {
  padding: 3rem 1.5rem;
  background: white;
}

.rates-inner {
  max-width: 600px;
  margin: 0 auto;
}

.rates-headline {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.rates-table {
  border: 1px solid var(--color-secondary);
  border-radius: 4px;
  overflow: hidden;
}

.rates-row {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.rates-row:last-child {
  border-bottom: none;
}

.rates-tier {
  font-weight: 500;
  color: var(--color-primary);
}

.rates-price {
  color: var(--color-secondary);
}

.rates-note {
  font-size: 0.875rem;
  color: #888;
}

.rates-includes {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #666;
}

/* Contact */
.contact {
  padding: 4rem 1.5rem;
  background: var(--color-primary);
  text-align: center;
}

.contact-inner {
  max-width: 600px;
  margin: 0 auto;
}

.contact-headline {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--color-cream);
  margin-bottom: 0.5rem;
}

.contact-desc {
  color: var(--color-cream-dark);
  margin-bottom: 1.5rem;
}

.contact-methods {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.contact-btn-primary {
  padding: 1rem 2rem;
  background: var(--color-accent);
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.contact-btn-primary:hover {
  background: var(--color-cream);
  transform: translateY(-2px);
}

.contact-btn-secondary {
  padding: 1rem 2rem;
  background: transparent;
  color: var(--color-cream);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  border: 1px solid var(--color-cream);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.contact-btn-secondary:hover {
  background: var(--color-cream);
  color: var(--color-primary);
}

/* What to Know */
.know {
  padding: 3rem 1.5rem;
  background: var(--color-cream);
}

.know-inner {
  max-width: 800px;
  margin: 0 auto;
}

.know-headline {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.know-list {
  list-style: disc;
  padding-left: 1.5rem;
  color: #333;
  line-height: 1.8;
}
```

**Step 3: Verify changes**

Run: `npm run lint && npm run build`
Expected: Both pass

**Step 4: Commit**

```bash
git add app/(main)/groups/
git commit -m "$(cat <<'EOF'
feat(groups): add /groups page with rates and contact info

- Hero with "Bring Your Group" headline
- Group types welcomed (bus tours, reunions, scouts, etc.)
- 4-tier rate structure (10+, 25+, students, driver)
- Contact CTAs (phone and email)
- What to Know section (practical info)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Create /support Page

**Files:**

- Create: `app/(main)/support/page.tsx`
- Create: `app/(main)/support/page.module.css`

**Step 1: Create support page**

Create `app/(main)/support/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Support Rocky Mount | Tennessee Starts Here',
  description:
    "Support Rocky Mount State Historic Site. Become a member, make a gift, or volunteer to preserve Tennessee's origin story.",
  openGraph: {
    title: 'Support Rocky Mount | Tennessee Starts Here',
    description:
      'Support Rocky Mount State Historic Site. Become a member, make a gift, or volunteer.',
    url: 'https://tennesseestartshere.com/support',
  },
}

const SUPPORT_OPTIONS = [
  {
    title: 'Become a Member',
    description: 'Join our community of history supporters',
    price: 'Memberships from $40/year',
    cta: 'Join Now',
    href: 'https://rockymountmuseum.z2systems.com/np/clients/rockymountmuseum/membershipJoin.jsp',
    external: true,
    trustLabel: 'Opens membership portal',
  },
  {
    title: 'Make a Gift',
    description: 'Support preservation and education',
    price: 'Gifts of any amount welcome',
    cta: 'Donate',
    href: 'https://rockymountmuseum.z2systems.com/np/clients/rockymountmuseum/donation.jsp',
    external: true,
    trustLabel: 'Secure checkout',
  },
  {
    title: 'Volunteer',
    description: 'Give time as interpreter or event support',
    price: 'Contact us to learn more',
    cta: 'Learn More',
    href: 'mailto:rockymountmuseum@gmail.com?subject=Volunteer%20Inquiry',
    external: false,
    trustLabel: '',
  },
]

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>Support Rocky Mount</p>
          <h1 className={styles.headline}>Keep Tennessee&apos;s Origin Story Alive</h1>
          <p className={styles.subhead}>
            Rocky Mount preserves the place where Tennessee&apos;s government began. Your support
            maintains these historic grounds, expands educational programs, and shares this story
            with future generations.
          </p>
        </div>
      </section>

      {/* Ways to Support */}
      <section className={styles.options}>
        <div className={styles['options-inner']}>
          <h2 className={styles['options-headline']}>Ways to Support</h2>
          <div className={styles['options-grid']}>
            {SUPPORT_OPTIONS.map((option) => (
              <article key={option.title} className={styles['option-card']}>
                <h3 className={styles['option-title']}>{option.title}</h3>
                <p className={styles['option-desc']}>{option.description}</p>
                <p className={styles['option-price']}>{option.price}</p>
                <a
                  href={option.href}
                  target={option.external ? '_blank' : undefined}
                  rel={option.external ? 'noopener noreferrer' : undefined}
                  className={styles['option-cta']}
                >
                  {option.cta} {option.external && '→'}
                </a>
                {option.trustLabel && <p className={styles['option-trust']}>{option.trustLabel}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* First 250 */}
      <section className={styles.first250}>
        <div className={styles['first250-inner']}>
          <h2 className={styles['first250-headline']}>The First 250</h2>
          <p className={styles['first250-desc']}>
            Join our founding circle for America&apos;s 250th.
          </p>
          <p className={styles['first250-limit']}>Limited to 250 members</p>
          <p className={styles['first250-opens']}>Enrollment opens March 4, 2026</p>
          <Link href="/first-250" className={styles['first250-cta']}>
            Learn More →
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contact}>
        <div className={styles['contact-inner']}>
          <p className={styles['contact-text']}>
            Questions? <a href="mailto:rockymountmuseum@gmail.com">rockymountmuseum@gmail.com</a> |{' '}
            <a href="tel:+14235387396">(423) 538-7396</a>
          </p>
        </div>
      </section>
    </>
  )
}
```

**Step 2: Create support CSS module**

Create `app/(main)/support/page.module.css`:

```css
/* Support Page Styles */

.hero {
  background: var(--color-primary);
  color: var(--color-cream);
  padding: 6rem 1.5rem 4rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.headline {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  margin-bottom: 1.5rem;
}

.subhead {
  font-size: 1.125rem;
  color: var(--color-cream-dark);
  line-height: 1.7;
}

/* Options */
.options {
  padding: 4rem 1.5rem;
  background: var(--color-cream);
}

.options-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.options-headline {
  font-family: var(--font-serif);
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.option-card {
  background: white;
  border: 1px solid var(--color-secondary);
  border-radius: 4px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.option-card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.option-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.option-desc {
  color: #555;
  margin-bottom: 0.5rem;
}

.option-price {
  font-size: 0.875rem;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
}

.option-cta {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--color-accent);
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.option-cta:hover {
  background: var(--color-secondary);
  color: var(--color-cream);
}

.option-trust {
  font-size: 0.75rem;
  color: #888;
  margin-top: 0.75rem;
}

/* First 250 */
.first250 {
  padding: 4rem 1.5rem;
  background: var(--color-secondary);
  text-align: center;
}

.first250-inner {
  max-width: 600px;
  margin: 0 auto;
}

.first250-headline {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--color-cream);
  margin-bottom: 0.5rem;
}

.first250-desc {
  color: var(--color-cream-dark);
  margin-bottom: 0.5rem;
}

.first250-limit {
  font-weight: 500;
  color: var(--color-accent);
  margin-bottom: 0.25rem;
}

.first250-opens {
  font-size: 0.875rem;
  color: var(--color-cream-dark);
  margin-bottom: 1.5rem;
}

.first250-cta {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--color-accent);
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.first250-cta:hover {
  background: var(--color-cream);
}

/* Contact */
.contact {
  padding: 2rem 1.5rem;
  background: var(--color-primary);
  text-align: center;
}

.contact-inner {
  max-width: 600px;
  margin: 0 auto;
}

.contact-text {
  font-size: 0.875rem;
  color: var(--color-cream-dark);
}

.contact-text a {
  color: var(--color-accent);
  text-decoration: underline;
}
```

**Step 3: Verify changes**

Run: `npm run lint && npm run build`
Expected: Both pass

**Step 4: Commit**

```bash
git add app/(main)/support/
git commit -m "$(cat <<'EOF'
feat(support): add /support page with giving options

- Hero with "Keep Tennessee's Origin Story Alive"
- 3 support cards: Membership, Donate, Volunteer
- NeonCRM links with trust labels
- First 250 teaser with link to /first-250
- Contact info footer

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Create /our-story Stub Page

**Files:**

- Create: `app/(main)/our-story/page.tsx`
- Create: `app/(main)/our-story/page.module.css`

**Step 1: Create our-story stub page**

Create `app/(main)/our-story/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Our Story | Tennessee Starts Here',
  description:
    "The story of Rocky Mount — from the Cobb family settlement through the territorial capital to statehood. Tennessee's origin story.",
  openGraph: {
    title: 'Our Story | Tennessee Starts Here',
    description:
      'The story of Rocky Mount — from the Cobb family settlement through the territorial capital to statehood.',
    url: 'https://tennesseestartshere.com/our-story',
  },
}

export default function OurStoryPage() {
  return (
    <section className={styles.stub}>
      <div className={styles['stub-content']}>
        <p className={styles.eyebrow}>Our Story</p>
        <h1 className={styles.headline}>Before There Was a Tennessee</h1>

        <div className={styles.message}>
          <p>
            The complete story of Rocky Mount—from the Cobb family settlement through the
            territorial capital to statehood—is coming soon.
          </p>
          <p>
            For now, explore our Evidence Room to see the primary documents that prove this history.
          </p>
        </div>

        <div className={styles.ctas}>
          <Link href="/evidence" className={styles['cta-primary']}>
            See the Original Documents →
          </Link>
          <Link href="/visit" className={styles['cta-secondary']}>
            Plan Your Visit →
          </Link>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Create our-story CSS module**

Create `app/(main)/our-story/page.module.css`:

```css
/* Our Story Stub Page Styles */

.stub {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1.5rem;
  background: var(--color-primary);
  color: var(--color-cream);
  text-align: center;
}

.stub-content {
  max-width: 700px;
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.headline {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  margin-bottom: 2rem;
}

.message {
  margin-bottom: 3rem;
}

.message p {
  font-size: 1.125rem;
  color: var(--color-cream-dark);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.message p:last-child {
  margin-bottom: 0;
}

.ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-primary {
  padding: 1rem 2rem;
  background: var(--color-accent);
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.cta-primary:hover {
  background: var(--color-cream);
  transform: translateY(-2px);
}

.cta-secondary {
  padding: 1rem 2rem;
  background: transparent;
  color: var(--color-cream);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  border: 1px solid var(--color-cream);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.cta-secondary:hover {
  background: var(--color-cream);
  color: var(--color-primary);
}
```

**Step 3: Verify changes**

Run: `npm run lint && npm run build`
Expected: Both pass

**Step 4: Commit**

```bash
git add app/(main)/our-story/
git commit -m "$(cat <<'EOF'
feat(our-story): add /our-story stub page

- Placeholder page for full narrative (coming post-March 4)
- "Before There Was a Tennessee" headline
- Routes to /evidence ("See the Original Documents")
- Routes to /visit ("Plan Your Visit")

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Update Footer — Add New Navigation Columns

**Files:**

- Modify: `components/Footer.tsx`

**Step 1: Update footer navigation**

In `components/Footer.tsx`, find the footer navigation section and update to match the 4-column structure from Plan E. The footer should have:

- VISIT column: Plan Your Visit, Group Visits, Contact
- EVENTS column: Full Calendar, Lectures
- DISCOVER column: Our Story, Evidence Room, For Educators, Almanac
- SUPPORT column: Membership (external), Donate (external), Volunteer, First 250

This task requires reading the current Footer.tsx structure and updating appropriately.

**Step 2: Verify changes**

Run: `npm run lint && npm run build`
Expected: Both pass

**Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "$(cat <<'EOF'
feat(footer): update navigation to 4-column structure

- VISIT: Plan Your Visit, Group Visits, Contact
- EVENTS: Full Calendar, Lectures
- DISCOVER: Our Story, Evidence Room, For Educators, Almanac
- SUPPORT: Membership, Donate, Volunteer, First 250
- External links (NeonCRM, Squarespace) marked with arrows

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Final Verification

**Step 1: Run full build check**

Run: `npm run lint && npm run build`
Expected: Both pass

**Step 2: Manual verification checklist**

- [ ] /visit — No "EST. 1770", updated description, correct days (Wed-Sat)
- [ ] /events — Updated subhead
- [ ] /educators — All 6 programs, JotForm link, funding section
- [ ] /groups — All 4 rate tiers, contact info
- [ ] /support — NeonCRM links, trust labels, First 250 teaser
- [ ] /our-story — Stub with Evidence and Visit CTAs
- [ ] Navigation — 5 links + Educators button
- [ ] Mobile — Educators button visible in header

**Step 3: Commit verification**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: Plan E Phase 1 complete — verified all pages

All verification checks passing:
- Critical fixes applied (/visit, /events)
- 4 new pages created (/educators, /groups, /support, /our-story)
- Navigation updated with Educators button
- Ready for March 4, 2026 launch

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Summary

| Task | Description                                          | Status  |
| ---- | ---------------------------------------------------- | ------- |
| 1    | Fix /visit — Remove EST. 1770, update description    | Pending |
| 2    | Fix /events — Update subhead                         | Pending |
| 3    | Update Navigation — New structure + Educators button | Pending |
| 4    | Create /educators page                               | Pending |
| 5    | Create /groups page                                  | Pending |
| 6    | Create /support page                                 | Pending |
| 7    | Create /our-story stub                               | Pending |
| 8    | Update Footer — 4-column structure                   | Pending |
| 9    | Final verification                                   | Pending |

---

## Post-March 4 Roadmap (Not in this plan)

- /our-story full 6-section narrative
- /evidence polish with Document Library
- /educators/resources with TN Standards lesson plans
- Homepage lightening (Task 10 — separate plan)
