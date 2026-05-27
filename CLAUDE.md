# Tennessee Starts Here

> Rocky Mount State Historic Site — Where Tennessee's government began. Est. 1770.
> Commemorative website for America 250 / Tennessee 230 programming.

**Live Site:** https://tennesseestartshere.com

## Status

**Phase:** Production
**Last Updated:** 2026-02-03
**Version:** 0.2.1

## CRITICAL: Truth System Hierarchy

**SOURCE OF TRUTH:** `lib/dredge/reference-library.ts` (136 verified facts backed by external primary sources)

**BIBLIOGRAPHY:** `content/truth/BIBLIOGRAPHY.md` (Chicago-style citations for all sources)

**NOT A SOURCE:** The website (tennesseestartshere.com) is OUTPUT to be verified, NOT input

**Data Flow:**

```
External Sources → Reference Library → Website Content
(primary/scholarly)   (136 facts)      (to be verified)
         ↓
    Bibliography
  (Chicago citations)
```

**Never:**

- Use website content as a source of truth
- Add facts to reference library without external verification
- Trust published content without checking against reference library

**Always:**

- Verify all facts against external primary/scholarly sources
- Run fact checker before deployment: `npm run check:facts`
- Update reference library when new external sources are verified

---

## Active Plans (February 2026)

| Plan                          | File                                       | Status     |
| ----------------------------- | ------------------------------------------ | ---------- |
| **Navigation Implementation** | `docs/plans/NAVIGATION-IMPLEMENTATION.md`  | **READY**  |
| Navigation Restructure        | `docs/plans/NAVIGATION-PLAN.md`            | APPROVED   |
| Evidence Room Sub-Nav         | `docs/plans/EVIDENCE-ROOM-NAV.md`          | APPROVED   |
| Homepage Options              | `content/marketing/HOMEPAGE-BRAINSTORM.md` | Draft      |
| StoryBrand Analysis           | `content/marketing/STORYBRAND-SITEMAP.md`  | Reference  |
| Sitemap Options               | `content/marketing/SITEMAP-BRAINSTORM.md`  | Superseded |

**Implementation Status:**

- **Phase 1** (data updates): Ready — navigation.json changes
- **Phase 2** (featured tiles): Ready — dropdown styling + mobile cards
- **Phase 3** (Evidence sub-nav): Ready — EvidenceNav component
- **Phase 4** (polish): Ready — footer, metadata, testing

---

## Tech Stack

| Layer        | Technology                                      | Version |
| ------------ | ----------------------------------------------- | ------- |
| Framework    | Next.js (App Router)                            | 16.1.6  |
| Language     | TypeScript                                      | 5.9.3   |
| UI           | Tailwind CSS + custom CSS                       | 4.x     |
| Styling      | Framer Motion + CSS Modules                     | 12.29.0 |
| Fonts        | Google Fonts (Playfair, Cormorant, EB Garamond) | -       |
| Weather APIs | Open-Meteo, NWS, RainViewer                     | -       |
| Analytics    | Vercel Analytics + GA4                          | -       |
| Hosting      | Vercel                                          | -       |
| Deployment   | GitHub (auto-deploy from main)                  | -       |

---

## Project Structure

```
app/
├── (welcome)/                    # Splash screen route (/)
│   ├── page.tsx                 # Welcome/splash page
│   ├── layout.tsx
│   └── error.tsx
├── (main)/                       # Main site routes (grouped)
│   ├── home/                    # Homepage
│   ├── visit/                   # Visit information
│   ├── events/                  # Events calendar
│   │   ├── colonial-independence-day/
│   │   ├── first-families-reunion/
│   │   └── stitching-independence/
│   ├── first-250/               # First 250 program
│   ├── lectures/                # Lecture series
│   ├── educators/               # Educator resources
│   ├── programs/                # Programs listing
│   ├── evidence/                # Historical evidence + documents
│   │   ├── documents/[slug]/    # Primary source documents
│   │   ├── collections/[slug]/  # Curated collections
│   │   ├── people/[slug]/       # Historical figures
│   │   ├── library/[slug]/      # Legacy library route (redirects)
│   │   └── timeline/            # Timeline view
│   ├── membership/              # Membership programs
│   ├── groups/                  # Group visits
│   ├── support/                 # Support/donate
│   ├── explore/                 # Interactive exploration
│   └── our-story/               # About Rocky Mount
├── (almanac)/
│   └── almanac/                 # 1775 Almanac (farmer-focused weather)
├── api/                          # API routes
│   ├── nws-alerts/              # National Weather Service alerts
│   ├── weather/                 # Open-Meteo weather data
│   ├── precipitation-radar/      # RainViewer radar
│   ├── air-quality/             # AQICN air quality
│   ├── stream-levels/           # USGS stream gauge data
│   ├── fareharbor-webhook/      # Booking webhook handler
│   └── review-station/          # Visitor review admin
├── sitemap.ts                   # Dynamic sitemap
├── manifest.ts                  # PWA manifest
├── layout.tsx                   # Root layout (fonts, meta, GA4)
├── globals.css                  # Global styles
└── error.tsx                    # Global error boundary

lib/
├── copy/                         # Brand copy system (source of truth)
│   ├── index.ts                # Public API export
│   ├── brand.ts                # Brand constants (hooks, buttons, tiers)
│   ├── narratives.ts           # Content narratives (mystery, scarcity, etc.)
│   └── metadata.ts             # Meta tags, OG, structured data
├── almanac/                     # Weather/almanac business logic
│   ├── task-scores.ts          # Task scoring system
│   ├── moon-phases.ts          # Lunar calculations
│   ├── weather-fetchers.ts     # API calls
│   ├── frost-alerts.ts         # Frost prediction
│   ├── sayings.ts              # Period-appropriate phrases
│   └── index.ts
├── analytics-server.ts          # GA4 server-side measurement
├── analytics.ts                 # GA4 client-side tracking
├── calendar.ts                  # Event calendar utilities
├── calendar/                    # Calendar data
├── dateUtils.ts                # Date/time helpers
├── documents/                   # Document management
├── events/                      # Event utilities
├── eventUtils.ts               # Event business logic
├── evidence/                    # Historical evidence utils
├── hooks/                       # Custom React hooks (10+)
├── schemas/                     # Zod validation schemas
├── seo/                         # SEO utilities
├── siteHours.ts                # Operating hours config
├── logger.ts                   # Development logging (no console.log)
├── utils.ts                    # General utilities
└── weather-helpers/            # Weather-specific utilities

components/
├── almanac/                     # Weather/almanac UI (63+ files)
│   ├── AlmanacTaskCard.tsx
│   ├── WeatherDisplay.tsx
│   ├── MoonPhaseDisplay.tsx
│   └── ... (60+ more)
├── home/                        # Homepage components (12+ files)
├── evidence/                    # Evidence/document display (26+ files)
├── events/                      # Event components (11+ files)
├── booking/                     # FareHarbor booking (8 files)
├── Card/                        # Card variations (8 files)
├── Header/                      # Site header (3 files)
├── Footer/                      # Site footer (3 files)
├── Hero/                        # Hero sections (3 files)
├── SkipLinks.tsx               # A11y skip links
└── ... (40+ additional)

data/
├── config/                      # Configuration data
├── educatorPrograms.json       # Educator program data
├── enrollment.json             # Program enrollment
├── events.json                 # Event catalog (49 KB)
├── experiences.json            # Experience offerings
├── fareharborItems.json        # FareHarbor integration data
├── groups.json                 # Group visit info
├── integrations.json           # Third-party integrations
├── lectures.json               # Lecture series data
├── membership.json             # Membership tiers
├── navigation.json             # Site navigation structure
├── siteInfo.json               # General site information
├── testimonials.json           # Visitor testimonials
└── timeline.json               # Historical timeline (11 KB)

content/
├── campaigns/                  # Marketing campaign content
├── [80+ markdown/advisory docs] # Historical research, analysis
│   ├── ADVISORY-*.md
│   ├── CHEROKEE-*.md
│   ├── BLOUNT-*.md
│   ├── TREATY-*.md
│   └── ... (decision matrices, source analysis)

types/
└── [Shared TypeScript types]

scripts/
└── validate-data.ts            # Data validation script
```

---

## Key Systems

### 1. Copy System (`lib/copy/`)

All marketing copy is centralized in TypeScript constants:

```typescript
import { HOOKS, BUTTONS, MYSTERY_NARRATIVE, FIRST_250_CAMPAIGN } from '@/lib/copy'

// Brand hooks (core value propositions)
HOOKS.primaryCTA // "Stand where they stood."
HOOKS.mysteryHook // "Discover the founding moment..."

// Call-to-action buttons
BUTTONS.primary // "Plan Your Visit"
BUTTONS.booking // "Book Reservation"

// Narrative frameworks
MYSTERY_NARRATIVE // Structure for unraveling Tennessee's origins
FIRST_250_CAMPAIGN // First 250 visitor program content
```

**Why:** Single source of truth for brand messaging. Update once, reflected everywhere.

**Files:** `lib/copy/brand.ts`, `lib/copy/narratives.ts`, `lib/copy/metadata.ts`

### 2. Weather Almanac (`lib/almanac/`)

Farmer-focused weather utility with:

- **Task Scoring:** 4 seasonal roles (Sower, Shepherd, Keeper, Builder) with activity scores
- **Moon Phases:** SunCalc-based lunar calendar calculations
- **Frost Alerts:** Temperature trend analysis + freeze predictions
- **Precipitation Radar:** RainViewer integration for 48-hour forecast
- **Period Sayings:** 18th-century agriculture wisdom matched to current conditions
- **Fire Weather:** NWS alert detection for burn day recommendations

**API Routes:**

- `GET /api/weather?lat=36.0&lon=-83.5` - Open-Meteo + processed data
- `GET /api/nws-alerts?lat=36.0&lon=-83.5` - Active weather alerts
- `GET /api/precipitation-radar` - RainViewer tile URLs
- `GET /api/stream-levels` - USGS stream gauge data
- `GET /api/air-quality?lat=36.0&lon=-83.5` - AQICN index

**See:** `docs/ALMANAC.md` (if exists) for technical details

### 3. Evidence System (`lib/evidence/`, `/evidence/documents`, `/evidence/collections`)

Historical document management with:

- **Documents:** Primary sources (treaties, letters, proclamations) with metadata
- **Collections:** Curated groupings (Cherokee relations, founding documents, etc.)
- **People:** Historical figures with bios and related documents
- **Timeline:** Chronological view of events
- **Library Redirects:** Old `/library/:slug` routes redirect to `/documents/:slug`

**File Format:** Markdown + YAML frontmatter in `content/`

**Data Source:** `data/collections.json`, `data/documents.json`, `data/people.json`

### 4. Booking Integration (FareHarbor)

Connected to FareHarbor for ticketing:

- **Webhook Handler:** `POST /api/fareharbor-webhook` - Verifies webhook signature + logs bookings
- **Booking Widget:** Embedded modal on visit pages
- **DNS Prefetch:** Configured for performance (see `app/layout.tsx`)

**Webhook Secret:** Set in `.env.local` as `FAREHARBOR_WEBHOOK_SECRET`

### 5. Analytics

Dual analytics setup:

- **Vercel Analytics:** Automatic Web Vitals (LCP, FID, CLS) + page views
- **Google Analytics 4:**
  - Client-side: Automatic page tracking via `Analytics` component
  - Server-side: Custom events via Measurement Protocol API (purchase tracking for bookings)

**Environment Variables:**

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX              # GA4 Measurement ID
GA4_API_SECRET=your_api_secret_here         # GA4 Measurement Protocol secret
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX     # Facebook Pixel (if enabled)
```

**See:** `lib/analytics.ts`, `lib/analytics-server.ts`

### 6. Navigation & Site Structure (`data/navigation.json`)

Hierarchical navigation:

- Main sections: Home, Visit, Events, Educators, Evidence, Programs
- Sub-sections: Lectures, Groups, Membership, Support
- Breadcrumbs + mobile menu driven by this config

---

## Environment Variables

```bash
# Air Quality (AQICN)
AQICN_API_KEY=your_api_key_here

# Google Analytics 4 (Analytics)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# GA4 Measurement Protocol (for server-side purchase tracking)
GA4_API_SECRET=your_api_secret_here

# Facebook Pixel
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX

# FareHarbor Webhook Security
FAREHARBOR_WEBHOOK_SECRET=your_webhook_secret_here

# Review Station Admin Password
REVIEW_STATION_PASSWORD=your_secure_password_here
```

---

## API Routes

| Method | Route                        | Purpose                             | Auth       | Cache    |
| ------ | ---------------------------- | ----------------------------------- | ---------- | -------- |
| GET    | `/api/weather`               | Open-Meteo + processed weather      | None       | 1 hour   |
| GET    | `/api/nws-alerts`            | NWS weather alerts (Severe/Extreme) | None       | 5 min    |
| GET    | `/api/precipitation-radar`   | RainViewer radar URLs               | None       | 1 hour   |
| GET    | `/api/air-quality`           | AQICN air quality index             | None       | 1 hour   |
| GET    | `/api/stream-levels`         | USGS stream gauge data              | None       | 1 hour   |
| POST   | `/api/fareharbor-webhook`    | FareHarbor booking webhook          | Secret key | No cache |
| POST   | `/api/review-station/verify` | Review station admin auth           | Password   | No cache |

### Query Parameters

```typescript
// Weather endpoints accept:
?lat=36.0&lon=-83.5     // Latitude, longitude (required for some)

// Example:
/api/weather?lat=36.0&lon=-83.5
/api/nws-alerts?lat=36.0&lon=-83.5
/api/air-quality?lat=36.0&lon=-83.5
```

---

## Routes by Audience

### Visitors

| Route                  | Purpose                                |
| ---------------------- | -------------------------------------- |
| `/`                    | Welcome splash screen                  |
| `/home`                | Main site homepage                     |
| `/visit`               | Visit info + FareHarbor booking widget |
| `/events`              | Upcoming events                        |
| `/events/[event-slug]` | Individual event detail                |
| `/almanac`             | 1775 Almanac (weather + farming tasks) |
| `/programs`            | Programs overview                      |
| `/lectures`            | Lecture series                         |
| `/membership`          | Membership options                     |
| `/support`             | Donations/support                      |

### Educators

| Route        | Purpose                       |
| ------------ | ----------------------------- |
| `/educators` | Educator resources + programs |
| `/events`    | Field trip eligible events    |
| `/groups`    | Group visit booking           |

### Researchers

| Route                        | Purpose                          |
| ---------------------------- | -------------------------------- |
| `/evidence/documents`        | Primary source documents         |
| `/evidence/documents/[slug]` | Full document view + metadata    |
| `/evidence/collections`      | Curated document collections     |
| `/evidence/people`           | Historical figures + connections |
| `/evidence/timeline`         | Chronological event view         |

### Admin

| Route                  | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| `/review-station.html` | Visitor feedback review (password-protected) |

---

## Code Quality Standards

### Pre-commit Hooks

ESLint + Prettier run automatically on staged files:

```bash
# Commits are blocked if:
# - ESLint errors found (can be auto-fixed)
# - Prettier formatting doesn't match
# - TypeScript errors exist (blocking)
```

### No Console Statements

All logging goes through `lib/logger.ts`:

```typescript
import { logger } from '@/lib/logger'

logger.debug('Development info', { data }) // Dev only
logger.error('Error occurred', error) // Dev only
logger.warn('Warning message') // Dev only
```

**Why:** Console statements in browser are invisible to users. Logger helps with development debugging.

### TypeScript Strict Mode

Full type safety enforced:

```typescript
// Good: Explicit typing
interface Props {
  title: string
  count?: number
}

export function MyComponent({ title, count }: Props) {}

// Bad: any type (forbidden without justification)
export function MyComponent(props: any) {}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `WeatherDisplay.tsx`)
- Utilities: `kebab-case.ts` (e.g., `weather-helpers.ts`)
- Hooks: `use-kebab-case.ts` (e.g., `use-weather-data.ts`)

---

## Development Workflow

### Local Development

```bash
# Install dependencies (also sets up Husky git hooks)
npm install

# Start dev server on http://localhost:3000
npm run dev

# Build for production (must pass before deploying)
npm run build

# Run production build locally
npm run start

# Check code quality
npm run lint
npm run lint:fix
npm run format:check
npm run format

# Validate data files (events, tours, etc.)
npm run validate:data
```

### Deployment

| Branch                 | Action      | Result                     |
| ---------------------- | ----------- | -------------------------- |
| Push to `main`         | Auto-deploy | Production site updated    |
| Push to feature branch | Auto-deploy | Preview URL generated      |
| Open PR                | Auto-deploy | Preview URL in PR comments |

**Standard Workflow:**

```bash
# 1. Make changes
npm run dev

# 2. Code quality check
npm run lint:fix
npm run format

# 3. Build verification
npm run build

# 4. Commit (pre-commit hooks will run)
git add .
git commit -m "feat: add weather widget"

# 5. Push (auto-deploys to Vercel)
git push origin main
```

---

## Vercel Configuration

**Project URL:** https://vercel.com/maxtorborings-projects/tennessee-starts-here

**Features Enabled:**

- Web Analytics (Core Web Vitals + custom events)
- Speed Insights (real user performance data)
- Security headers (HSTS, CSP, XFrame, etc.)
- Image optimization (AVIF + WebP formats)

**Build Settings:**

- Framework: Next.js 16
- Build Command: `next build`
- Output Directory: `.next`

---

## Documentation

| Document                       | Purpose                          | Location |
| ------------------------------ | -------------------------------- | -------- |
| `README.md`                    | Overview + quick start           | Root     |
| `CONTRIBUTING.md`              | Coding standards + workflow      | Root     |
| `QUICK-START-GUIDE.md`         | Onboarding for developers        | Root     |
| `docs/COPY.md`                 | Brand guide (if exists)          | `/docs`  |
| `docs/ALMANAC.md`              | Weather feature docs (if exists) | `/docs`  |
| `docs/PROJECT.md`              | Technical spec (if exists)       | `/docs`  |
| `docs/STYLE-GUIDE.md`          | Design system (if exists)        | `/docs`  |
| `data/SCHEMA.md`               | Data structure documentation     | `/data`  |
| `MASTER-CONFLICT-MATRIX.md`    | Source conflict resolution       | Root     |
| `SOURCE-OF-TRUTH-HIERARCHY.md` | Data authority ranking           | Root     |

---

## Common Tasks

### Add a New Event

1. Add event to `data/events.json` with metadata
2. If detail page needed: Create `/app/(main)/events/[slug]/page.tsx`
3. Update `data/navigation.json` if in main nav
4. Test at `npm run dev`

### Add a Historical Document

1. Create markdown file in `content/documents/`
2. Add YAML frontmatter (title, date, category, etc.)
3. Add entry to `data/documents.json`
4. Document auto-renders at `/evidence/documents/[slug]`

### Update Weather Data

Weather APIs are cached:

```typescript
// Modify cache duration:
next: {
  revalidate: 300
} // Cache for 5 minutes
next: {
  revalidate: 3600
} // Cache for 1 hour
next: {
  revalidate: 0
} // No cache (always fresh)
```

See `app/api/weather/route.ts`, `app/api/nws-alerts/route.ts`, etc.

### Modify Brand Copy

1. Edit `lib/copy/brand.ts` (HOOKS, BUTTONS, BRAND constants)
2. Edit `lib/copy/narratives.ts` (story frameworks, campaigns)
3. Edit `lib/copy/metadata.ts` (meta tags, OG images, structured data)
4. All changes reflected across site automatically

### Update Navigation

1. Edit `data/navigation.json`
2. Add/remove sections, reorder items
3. Changes reflected in Header, Footer, breadcrumbs

---

## Gotchas & Troubleshooting

### Build Fails with TypeScript Errors

```bash
npx tsc --noEmit    # Check TS errors before building
npm run build       # Final pre-deploy check
```

**Common issues:**

- Missing type annotations on API responses
- Unused variables (treated as errors)
- Implicit `any` types

### Weather API Returns Empty

Check:

1. Query parameters: `?lat=36.0&lon=-83.5` (required)
2. API keys in `.env.local` (AQICN_API_KEY, etc.)
3. Third-party API status (Open-Meteo, NWS, RainViewer)
4. Browser Network tab for actual HTTP status

### Cache Issues

```bash
# Clear Next.js build cache
rm -rf .next

# Hard refresh in browser (Cmd+Shift+R)
# Or open DevTools → Network → Disable cache
```

### Data Not Updating

Check:

1. JSON file syntax (use JSON validator if unsure)
2. Data schema matches expected structure
3. Component is reading from correct data source

Run validation:

```bash
npm run validate:data    # Checks all data files
```

### ESLint/Prettier Blocking Commits

```bash
# Auto-fix most issues
npm run lint:fix

# Manually fix remaining issues
npm run lint             # See specific errors

# Format files
npm run format
```

---

## Performance Optimizations

### Fonts

Only 2-3 weights per font to reduce bundle:

```typescript
// Only 400 + 700 (not 6 weights)
const playfair = Playfair_Display({
  weight: ['400', '700'],
  display: 'swap', // System font until loaded
})
```

### Images

Automatic format conversion (AVIF/WebP) + responsive sizes:

```typescript
// next/image automatically optimizes
<Image src={url} width={1200} height={630} />
```

### APIs

Aggressive caching on external API calls:

```typescript
// Cache for 1 hour
fetch(url, { next: { revalidate: 3600 } })

// Cache for 5 minutes
fetch(url, { next: { revalidate: 300 } })
```

### Web Vitals

Tracked via Vercel Analytics:

- LCP (Largest Contentful Paint) < 2.5s target
- CLS (Cumulative Layout Shift) < 0.1 target
- FID (First Input Delay) < 100ms target

View in Vercel dashboard.

---

## Related Resources

- **GitHub:** https://github.com/getboring/tennessee-starts-here
- **Live Site:** https://tennesseestartshere.com
- **Vercel Dashboard:** https://vercel.com/maxtorborings-projects/tennessee-starts-here
- **FareHarbor Integration:** Contact FareHarbor support for webhook secrets
- **NWS Alerts API:** https://www.weather.gov/documentation/services-web-api
- **Open-Meteo API:** https://open-meteo.com/en/docs
- **RainViewer API:** https://www.rainviewer.com/api.html
- **AQICN API:** https://aqicn.org/data-platform/

---

## Decision Log

| Decision                                  | Rationale                                     | Status      |
| ----------------------------------------- | --------------------------------------------- | ----------- |
| Copy centralized in TypeScript            | Single source of truth for messaging          | Implemented |
| 1775 Almanac (weather util)               | Period-appropriate UX for historical site     | Implemented |
| Evidence system (documents + collections) | Research-friendly navigation for historians   | Implemented |
| FareHarbor integration                    | Professional ticketing for public bookings    | Implemented |
| Dual analytics (Vercel + GA4)             | Web Vitals + custom event tracking            | Implemented |
| No Supabase (JSON + static)               | Simpler infrastructure for content-heavy site | Implemented |

---

## Development Phases

### Phase 1: Foundation ✓

- [x] Next.js 16 + TypeScript setup
- [x] Tailwind CSS v4
- [x] Root layout (fonts, meta, analytics)
- [x] Route structure (welcome, main, almanac)

### Phase 2: Core Content ✓

- [x] Homepage + marketing pages
- [x] Event management system
- [x] Historical evidence/documents system
- [x] Almanac (weather + farming tasks)

### Phase 3: Integrations ✓

- [x] FareHarbor booking widget
- [x] Google Analytics 4 (client + server)
- [x] Vercel Analytics + Web Vitals
- [x] Weather APIs (NWS, Open-Meteo, RainViewer)

### Phase 4: Polish ✓

- [x] Mobile responsive design
- [x] Accessibility (skip links, semantic HTML)
- [x] Error boundaries + fallback UI
- [x] Code quality (ESLint, Prettier, Husky hooks)
- [x] Performance optimization (font weights, image formats, caching)

### Phase 5: Production ✓

- [x] Security headers (HSTS, CSP, X-Frame-Options)
- [x] SEO (meta tags, OG, sitemap, robots.txt)
- [x] Error handling + graceful degradation
- [x] Vercel deployment + auto-deploy on push

---

## Future Considerations

- [ ] Server-side rendering optimization (RSC patterns)
- [ ] Image gallery for events + programs
- [ ] Search functionality (events, documents, people)
- [ ] Admin dashboard for content management
- [ ] Newsletter signup integration (Mailchimp/Substack)
- [ ] Visitor feedback system improvements
- [ ] Multi-language support
- [ ] Progressive Web App (PWA) features beyond manifest

---

_Where Tennessee's government began. Stand where they stood._
