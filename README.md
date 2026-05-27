# Tennessee Starts Here

Rocky Mount State Historic Site — Where Tennessee's government began. Est. 1770.

**Live Site:** https://tennesseestartshere.com

---

## What This Is

A commemorative website for Rocky Mount State Historic Site's America 250 / Tennessee 230 programming. This is a **unified package** containing:

| Feature            | Route                              | Description                                     |
| ------------------ | ---------------------------------- | ----------------------------------------------- |
| **Welcome Screen** | `/`                                | Cinematic splash page with weather + brand hook |
| **Main Website**   | `/home`, `/visit`, `/events`, etc. | Marketing pages for the historic site           |
| **1775 Almanac**   | `/almanac`                         | Period-themed weather utility for Tennessee     |

Everything deploys together. One codebase, one build, one deployment.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Runtime | Node 22 |
| Styling | Tailwind CSS v4 |
| Linter | Biome |
| Test Runner | Vitest |
| Package Manager | npm |
| Deploy | Cloudflare Workers (Workers Builds) |
| Adapter | @opennextjs/cloudflare |
| Weather APIs | Open-Meteo, RainViewer, NWS Alerts |

---

## Development

```bash
# Install dependencies (also sets up git hooks)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Project Structure

```
app/
├── (welcome)/           # Splash screen (/)
├── (main)/              # Main site pages
│   ├── home/            # Homepage
│   ├── visit/           # Visit info
│   ├── events/          # Events calendar
│   ├── first-250/       # First 250 program
│   └── lectures/        # Lecture series
├── almanac/             # Weather utility
└── api/                 # API routes

lib/
├── copy/                # Brand copy constants (source of truth)
├── almanac/             # Weather business logic
└── logger.ts            # Dev-only logging

components/
├── welcome/             # Welcome screen components
├── almanac/             # Weather components
└── ...                  # Shared components

docs/
├── COPY.md              # Brand guide
├── ALMANAC.md           # Weather feature docs
├── PROJECT.md           # Technical spec
└── STYLE-GUIDE.md       # Design system
```

---

## Key Systems

### Brand Copy (`lib/copy/`)

All marketing copy is centralized in TypeScript:

```typescript
import { HOOKS, BUTTONS, MYSTERY_NARRATIVE } from '@/lib/copy'

// Components use constants directly
<p>{HOOKS.primaryCTA}</p>  // "Stand where they stood."
```

See `docs/COPY.md` for brand guidelines.

### Weather Almanac (`lib/almanac/`)

Farmer-focused weather utility with:

- Task scores (Sower, Shepherd, Keeper, Builder)
- Period-appropriate sayings
- Moon phase calculations
- Frost alerts
- Precipitation radar

See `docs/ALMANAC.md` for technical details.

---

## Scripts

| Script | Command | What it does |
|--------|---------|-------------|
| dev | `npm run dev` | Start Next.js dev server |
| build | `npm run build` | Production build (Next.js) |
| start | `npm run start` | Serve production build locally |
| lint | `npm run lint` | Lint with Biome |
| lint:fix | `npm run lint:fix` | Lint and auto-fix with Biome |
| format | `npm run format` | Format with Biome |
| check | `npm run check` | Full Biome check (lint + format) |
| check:fix | `npm run check:fix` | Full Biome check with auto-fix |
| test | `npm run test` | Run tests with Vitest |
| validate:data | `npm run validate:data` | Validate JSON data schemas |
| check:facts | `npm run check:facts` | Validate historical facts against reference library |
| preview:cf | `npm run preview:cf` | Build and preview on Cloudflare Workers locally |
| deploy:cf | `npm run deploy:cf` | Build and deploy to Cloudflare Workers |

## Code Quality

- **Pre-commit hooks** — Biome check runs on staged files via Husky + lint-staged
- **No console statements** — Use `logger` from `lib/logger.ts`
- **TypeScript strict mode** — Full type safety
- **Fact checking** — Historical claims validated against `lib/dredge/reference-library.ts`

---

## Deployment

Deployed to **Cloudflare Workers** via Workers Builds (auto-deploy on push).

| Action | Result |
|--------|--------|
| Push to `main` | Auto-builds and deploys to production via Workers Builds |
| Open a PR | CI checks run (build + lint) |

| Environment | URL |
|-------------|-----|
| Production (CF Workers) | tennessee-starts-here.codyboring.workers.dev |
| Production (Vercel) | tennesseestartshere.com |

---

## Documentation

| Document              | Purpose                        |
| --------------------- | ------------------------------ |
| `CLAUDE.md`           | AI assistant instructions      |
| `docs/COPY.md`        | Brand guide & messaging        |
| `docs/ALMANAC.md`     | Weather feature technical docs |
| `docs/PROJECT.md`     | Technical specification        |
| `docs/STYLE-GUIDE.md` | Visual design system           |
| `CONTRIBUTING.md`     | Coding standards               |

---

## Contributing

1. Create a feature branch from `main`
2. Make changes, ensure `npm run check` passes
3. Historical content must be validated: `npm run check:facts`
4. Open a PR — CI will run automatically

---

_Where Tennessee's government began. Stand where they stood._
