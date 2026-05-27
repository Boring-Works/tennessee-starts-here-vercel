# Tennessee Starts Here - Project Specification

## Claude Code Development Guidelines

**Project:** TennesseeStartsHere.com
**Stack:** Next.js 14 (App Router) + Tailwind CSS + Vercel
**Timeline:** This weekend (January 25-26, 2026)
**Owner:** Cody Boring, Executive Director, Rocky Mount State Historic Site

---

## CRITICAL: Read This First

This is a **constrained build**. No feature creep. No "nice to haves." Build exactly what is specified below and nothing more.

**YOU MUST:**

- Follow all historical accuracy guidelines (see HISTORICAL ACCURACY section)
- Use the exact content from the JSON data files
- Keep the design clean, professional, and mobile-responsive
- Ship a working site, not a perfect one

**YOU MUST NOT:**

- Add features not explicitly listed
- Suggest CMS integration, databases, or authentication
- Use placeholder content - all real content is provided
- Make shortcuts that sacrifice code quality
- Invent historical claims or embellish facts

---

## Project Overview

### What We're Building

A commemorative website for Rocky Mount State Historic Site's America 250 / Tennessee 230 programming. This site positions Rocky Mount as the place "Where Tennessee Began" and drives visitors to the 2026 events calendar.

### Site Purpose

1. Make the case for Rocky Mount's historical significance
2. Showcase 2026 events (America 250 / Tennessee 230)
3. Drive ticket purchases via FareHarbor
4. Capture email signups
5. Provide visit information

### What This Site Is NOT

- A replacement for the main Squarespace site (rockymountmuseum.com)
- A CMS-powered site (all content is hardcoded/JSON)
- An ecommerce platform
- A tour app or PWA

---

## Site Architecture

```
tennessestartshere.com/
├── / (Home)
│   ├── Hero with countdown to July 4, 2026
│   ├── "Tennessee Starts Here" positioning statement
│   ├── Brief historical overview
│   ├── Featured events preview (3-4 events)
│   ├── First 250 program CTA
│   └── Email signup form
│
├── /events (Full 2026 Calendar)
│   ├── All 17 events listed chronologically
│   ├── Event cards with date, title, description
│   ├── FareHarbor ticket buttons where applicable
│   └── Categorization: NEW vs ENHANCED programs
│
├── /lectures (Lecture Series)
│   ├── Series overview
│   ├── 5 lectures with speaker bios
│   └── Registration/ticket links
│
├── /first-250 (First 250 Program)
│   ├── Program explanation
│   ├── Enrollment deadline (June 1, 2026)
│   ├── What participants receive
│   └── Signup form (Formspree)
│
└── /visit (Plan Your Visit)
    ├── Address and directions
    ├── Hours and admission prices
    ├── Google Maps embed
    ├── FareHarbor booking widget
    └── What to expect
```

---

## Tech Stack & Setup

### Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Project Structure

```
tennessee-starts-here/
├── app/
│   ├── page.tsx              # Home
│   ├── events/page.tsx       # Events calendar
│   ├── lectures/page.tsx     # Lecture series
│   ├── first-250/page.tsx    # First 250 program
│   ├── visit/page.tsx        # Visit info
│   ├── layout.tsx            # Root layout with nav/footer
│   └── globals.css           # Tailwind + custom styles
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── Countdown.tsx         # Countdown to July 4, 2026
│   ├── EventCard.tsx
│   ├── LectureCard.tsx
│   ├── EmailSignup.tsx       # Formspree form
│   └── FareHarborWidget.tsx
├── data/
│   ├── events.json           # All 2026 events
│   ├── lectures.json         # Lecture series
│   └── siteInfo.json         # Hours, prices, contact
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── og-image.jpg          # Social sharing image
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## Design Guidelines

### Color Palette

```css
:root {
  --primary: #1a3a5c; /* Deep colonial blue */
  --secondary: #8b4513; /* Saddle brown / wood tone */
  --accent: #c9a227; /* Gold / brass accent */
  --background: #faf8f5; /* Warm off-white / parchment */
  --text: #2d2d2d; /* Near black for readability */
  --text-light: #666666; /* Secondary text */
}
```

### Typography

- Headings: Georgia or Playfair Display (serif, traditional)
- Body: System font stack (clean, readable)
- Keep it legible - this is for all ages

### Design Principles

- Clean and professional, not cluttered
- Mobile-first responsive design
- Large touch targets for buttons
- Clear visual hierarchy
- Generous whitespace
- No animations unless essential

---

## HISTORICAL ACCURACY GUIDELINES

### ✅ WHAT WE CAN SAY (Verified Claims)

| Claim                                                                                 | Source                                  |
| ------------------------------------------------------------------------------------- | --------------------------------------- |
| "First seat of government for the Southwest Territory (1790-1792)"                    | Tennessee Encyclopedia, primary sources |
| "Site settled by William Cobb around 1769-1770"                                       | Historical documentation                |
| "Where Governor William Blount administered territorial government"                   | Primary sources, Blount correspondence  |
| "Cobb family supplied the Overmountain Men with gunpowder, horses, and supplies"      | Historical accounts                     |
| "Tennessee's oldest documented farm (per Tennessee Century Farms program, est. 1775)" | TN Century Farms documentation          |
| "Andrew Jackson lodged here six weeks awaiting his law license"                       | Historical accounts                     |
| "William Blount was a signer of the U.S. Constitution"                                | Historical fact                         |

### ❌ WHAT WE MUST NOT SAY (Inaccurate Claims)

| Incorrect Claim                            | Why It's Wrong                                                                                                          |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| "Tennessee's first capital"                | Knoxville was the first STATE capital (1796). Rocky Mount was TERRITORIAL capital.                                      |
| "First territorial capital in America"     | Marietta, Ohio was the first US territorial capital (1788)                                                              |
| "Buildings date to 1770"                   | UT dendrochronology dates current structures to 1826-1830 (Massengill era). The SITE is old; the buildings are younger. |
| "George Washington visited Rocky Mount"    | No documentation supports this                                                                                          |
| "First capital of the Southwest Territory" | Use "first SEAT OF GOVERNMENT" instead - more precise                                                                   |

### Safe Positioning Language

**Primary tagline:**

> "Tennessee Starts Here"

**Explanation (use this exact framing):**

> "Rocky Mount served as the first seat of government for the Southwest Territory from 1790 to 1792—where federal government first operated in what would become Tennessee."

**Supporting statement:**

> "Six years before America declared independence, William Cobb and his family settled this land. Their home would later become the headquarters of Governor William Blount, who administered the territory that became Tennessee."

### Property Note (For Internal Reference)

Rocky Mount State Historic Site (THC-owned) and the 15-acre purchase (Association-owned, 2021) are two separate properties. The "oldest documented farm" claim (per TN Century Farms, est. 1775) applies to the 15-acre parcel, not the main Rocky Mount site. For the website, focus on the site history—avoid conflating these two properties.

---

## Content: 2026 Events Calendar

All events are listed in `/data/events.json`. Here is the verified schedule:

### MARCH 2026

| Date         | Event                      | Type   | Notes                                                 |
| ------------ | -------------------------- | ------ | ----------------------------------------------------- |
| Mar 4 (Wed)  | Road to 250 Season Opening | ⭐ NEW | **Video/digital launch**, First 250 enrollment begins |
| Mar 27 (Fri) | Lecture: Dr. James P. Byrd | ⭐ NEW | "Colonial Religion on the Frontier"                   |

### APRIL 2026

| Date         | Event                                | Type     | Notes                            |
| ------------ | ------------------------------------ | -------- | -------------------------------- |
| Apr 18 (Sat) | Lecture: Lisa Bennett as Mary Patton | ⭐ NEW   | "Powder for Kings Mountain"      |
| Apr 25-26    | Woolly Days                          | Enhanced | America 250 interpretation added |

### MAY 2026

| Date      | Event                                     | Type   | Notes                                                  |
| --------- | ----------------------------------------- | ------ | ------------------------------------------------------ |
| May 15    | Lecture: Thomas Bachelor                  | ⭐ NEW | "All In: The Overmountain Men's Gamble"                |
| May 22-24 | Early Frontier Days & Colonial Trade Fair | ⭐ NEW | 3-day festival with OVTA                               |
| May 29    | Lecture: Dr. Caroline Whitfield           | ⭐ NEW | "William Blount and the Birth of Tennessee Government" |

### JUNE 2026

| Date      | Event                      | Type    | Notes                                 |
| --------- | -------------------------- | ------- | ------------------------------------- |
| Jun 1     | Tennessee's 230th Birthday | Digital | First 250 enrollment closes           |
| Jun 13    | Lecture: David Doan        | ⭐ NEW  | "The Story of the American Flag"      |
| Jun 13-14 | America 250 Flag Weekend   | ⭐ NEW  | Flag dedication, Betsy Ross Sip & Sew |

### JULY 2026

| Date  | Event                     | Type   | Notes                               |
| ----- | ------------------------- | ------ | ----------------------------------- |
| Jul 4 | Colonial Independence Day | ⭐ NEW | America's 250th, First 250 ceremony |

### AUGUST 2026

| Date      | Event                     | Type   | Notes                    |
| --------- | ------------------------- | ------ | ------------------------ |
| Aug 22-23 | Cherokee Heritage Weekend | ⭐ NEW | Dr. Daniel Redbird Wolfe |

### SEPTEMBER 2026

| Date      | Event                               | Type   | Notes                               |
| --------- | ----------------------------------- | ------ | ----------------------------------- |
| Sep 11-13 | First Families of Tennessee Reunion | ⭐ NEW | Descendants gathering, oral history |

### OCTOBER 2026

| Date      | Event        | Type     | Notes                      |
| --------- | ------------ | -------- | -------------------------- |
| Oct 10-11 | Harvest Fest | Enhanced | America 250 interpretation |

---

## Content: Lecture Series

Rocky Mount's first-ever lecture series. Five lectures from March-August 2026.

| #   | Date   | Speaker                        | Topic                                                |
| --- | ------ | ------------------------------ | ---------------------------------------------------- |
| 1   | Mar 27 | Dr. James P. Byrd (Vanderbilt) | Colonial Religion on the Frontier                    |
| 2   | Apr 18 | Lisa Bennett as Mary Patton    | Powder for Kings Mountain                            |
| 3   | May 15 | Thomas Bachelor                | All In: The Overmountain Men's Gamble                |
| 4   | May 29 | Dr. Caroline H. Whitfield      | William Blount and the Birth of Tennessee Government |
| 5   | Jun 13 | David Doan                     | The Story of the American Flag                       |

**Note:** Cherokee Heritage Weekend (Aug 22-23) with Dr. Daniel Redbird Wolfe is a weekend event, not part of the formal lecture series.

---

## Content: First 250 Program

### What It Is

A community enrollment program inviting 250 Tennesseans to join Rocky Mount's America 250 commemoration. Their names will be read aloud at the July 4, 2026 ceremony.

### Key Details

- **Enrollment period:** March 4 - June 1, 2026
- **Goal:** 250 participants
- **Cost:** Free
- **What participants receive:**
  - Name read aloud at July 4, 2026 ceremony
  - Email updates on America 250 programming
  - Recognition as a "founding participant" in the commemoration

### Premium Tiers (Optional upsell)

| Tier                | Price | Includes                                                  |
| ------------------- | ----- | --------------------------------------------------------- |
| First 250 (Basic)   | Free  | Name read July 4, email updates                           |
| Founding Patron     | $50   | Above + commemorative certificate + priority seating      |
| Founding Benefactor | $250  | Above + special dinner invitation + permanent recognition |

---

## Content: Visit Information

### Address

Rocky Mount State Historic Site
200 Hyder Hill Road
Piney Flats, TN 37686

### Contact

- Phone: (423) 538-7396
- Website: rockymountmuseum.com

### Hours (Standard)

- Tuesday - Saturday: 10:00 AM - 5:00 PM
- Sunday: 1:00 PM - 5:00 PM
- Monday: Closed

### Admission

- Adults: $12
- Seniors (65+): $10
- Children (6-17): $8
- Children under 6: Free
- Groups (10+): Call for rates

### Google Maps Embed

Use coordinates: 36.4081° N, 82.3247° W

---

## Integrations

### FareHarbor (Ticketing)

Embed FareHarbor booking widget on /visit page.

```html
<!-- FareHarbor Lightframe -->
<script src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"></script>
```

Individual event ticket links should use FareHarbor URLs where available. For events without specific FareHarbor pages, link to main booking page.

### Formspree (Email Signup)

Use Formspree for email capture. Free tier: 50 submissions/month.

```html
<form action="https://formspree.io/f/{YOUR_FORM_ID}" method="POST">
  <input type="email" name="email" placeholder="Enter your email" required />
  <input type="hidden" name="_subject" value="Tennessee Starts Here Signup" />
  <button type="submit">Subscribe</button>
</form>
```

**Form fields to capture:**

- Email (required)
- Name (optional)
- Interest: General updates / First 250 program / Volunteer info

### Google Maps

Embed Google Maps iframe on /visit page.

---

## SEO & Meta Tags

### Every Page Must Include:

```tsx
export const metadata = {
  title: 'Page Title | Tennessee Starts Here',
  description: 'Page-specific description under 160 characters',
  openGraph: {
    title: 'Page Title | Tennessee Starts Here',
    description: 'Page-specific description',
    url: 'https://tennessestartshere.com/page',
    siteName: 'Tennessee Starts Here',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title | Tennessee Starts Here',
    description: 'Page-specific description',
    images: ['/og-image.jpg'],
  },
}
```

### Home Page Meta

- Title: "Tennessee Starts Here | Rocky Mount State Historic Site"
- Description: "Where Tennessee's government began. Join us for America 250 and Tennessee 230 programming at Rocky Mount State Historic Site in Piney Flats, TN."

---

## Low-Hanging Fruit (Include These)

1. **Favicon** - Simple colonial-era inspired icon
2. **Open Graph image** - For social sharing
3. **Sitemap** - Auto-generated via Next.js
4. **robots.txt** - Allow all
5. **404 page** - Simple "page not found" with link home
6. **Analytics ready** - Add Google Analytics or Plausible placeholder

---

## Deployment

### Vercel Configuration

- Framework: Next.js
- Build command: `npm run build`
- Output directory: `.next`
- Environment variables: None required (no secrets)

### Domain

Configure DNS for tennessestartshere.com to point to Vercel.

---

## Code Quality Standards

### Automated Enforcement

The project uses **pre-commit hooks** (Husky + lint-staged) to automatically:

- Run ESLint on all `.ts` and `.tsx` files
- Format with Prettier
- Block commits that fail linting

### Logging (No Raw Console)

ESLint enforces `no-console` - use the logger utility instead:

```typescript
import { logger } from '@/lib/logger'

logger.debug('Verbose info', { data }) // Dev only
logger.info('General info') // Dev only
logger.warn('Potential issue') // Dev only
logger.error('Something failed', error) // Dev only
```

The logger automatically suppresses all output in production builds.

### Do:

- Use TypeScript for type safety
- Keep components small and focused
- Use semantic HTML
- Add alt text to all images
- Test on mobile viewport
- Comment non-obvious code
- Use `logger` from `lib/logger.ts` for debugging

### Don't:

- Over-engineer solutions
- Add unnecessary dependencies
- Use client-side JavaScript where not needed
- Use raw `console.*` statements (ESLint will block)
- Hardcode colors (use Tailwind config)

---

## Testing Checklist Before Deploy

- [ ] All pages render without errors
- [ ] Mobile responsive on all pages
- [ ] All links work (internal and external)
- [ ] FareHarbor widget loads
- [ ] Formspree form submits
- [ ] Google Maps embed displays
- [ ] Countdown timer accurate to July 4, 2026
- [ ] Meta tags render in page source
- [ ] No console errors
- [ ] Images optimized and loading

---

## Questions? Stuck?

If you encounter ambiguity:

1. Check this document first
2. Default to simpler solution
3. When in doubt, leave it out
4. Ship working code over perfect code

**Remember:** This site launches this weekend. Done is better than perfect.
