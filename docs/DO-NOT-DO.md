# DO NOT DO - Explicit Constraints for Claude Code

This file lists things you MUST NOT do when building the Tennessee Starts Here website.

---

## ⚠️ DATE VERIFICATION WARNING

All dates have been verified against the 2026 calendar. Key reference points:
- **July 4, 2026 = Saturday** (America's 250th)
- **June 1, 2026 = Monday** (TN's 230th)
- **June 13-14, 2026 = Sat-Sun** (Flag Weekend)

If a date seems wrong, verify before changing.

---

## Historical Claims - NEVER Say These

### ❌ FORBIDDEN PHRASES

```
"Tennessee's first capital"
"First capital of Tennessee"
"America's first territorial capital"
"First territorial capital in the United States"
"The buildings date to 1770"
"These 1770s structures"
"George Washington visited Rocky Mount"
"Where Tennessee was born"
"Birthplace of Tennessee"
```

### ✅ USE THESE INSTEAD

```
"First seat of government for the Southwest Territory"
"Where Tennessee's government began"
"The site was settled around 1770"
"Governor William Blount's headquarters"
"Tennessee Starts Here" (as tagline, not literal claim)
```

---

## Features - DO NOT Build

### ❌ NOT IN SCOPE

- [ ] CMS or admin panel
- [ ] Database or backend API
- [ ] User authentication or accounts
- [ ] Shopping cart or checkout
- [ ] Blog or news section
- [ ] Search functionality
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Animations or parallax effects
- [ ] Chat widget or AI assistant
- [ ] Newsletter archive
- [ ] Event RSVP system (use FareHarbor)
- [ ] Calendar download (.ics files)
- [ ] Social media feed embeds
- [ ] Video players or media galleries
- [ ] Interactive maps beyond Google embed
- [ ] Mobile app or PWA features
- [ ] Push notifications
- [ ] Cookie consent banner (not needed for simple site)

### ✅ IN SCOPE

- [x] Static pages (Home, Events, Lectures, First 250, Visit)
- [x] Navigation and footer
- [x] Countdown timer to July 4, 2026
- [x] Event cards displaying JSON data
- [x] FareHarbor widget embed
- [x] Formspree email signup
- [x] Google Maps embed
- [x] Basic SEO meta tags
- [x] Mobile responsive design

---

## Code Practices - DO NOT Do

### ❌ AVOID

```javascript
// Don't over-engineer
❌ Creating custom hooks for simple data
❌ Building a state management system
❌ Adding Redux, Zustand, or similar
❌ Creating API routes
❌ Server actions for static content
❌ Excessive component abstraction
❌ TypeScript generics for simple types
❌ Custom animation libraries
❌ CSS-in-JS solutions (use Tailwind)
❌ Third-party UI component libraries
```

### ✅ DO

```javascript
// Keep it simple
✅ Import JSON directly
✅ Use Next.js App Router conventions
✅ Tailwind utility classes
✅ Semantic HTML elements
✅ Simple, readable components
✅ Static site generation (default)
```

---

## Content - DO NOT

### ❌ AVOID

- Placeholder text ("Lorem ipsum")
- Stock photos without permission
- Invented quotes from historical figures
- Speculative historical claims
- Marketing hyperbole
- Exclamation points in historical content
- Emoji in formal content
- Informal language ("gonna", "wanna")

### ✅ DO

- Use provided JSON content exactly
- Keep tone professional and dignified
- Let facts speak for themselves
- Use active voice when possible
- Keep descriptions concise

---

## Design - DO NOT

### ❌ AVOID

- Bright neon colors
- More than 2-3 fonts
- Cluttered layouts
- Autoplay audio or video
- Pop-up modals
- Floating action buttons
- Hamburger menu on desktop
- Infinite scroll
- Skeleton loaders (content is static)
- Progress bars
- Confetti or celebration animations

### ✅ DO

- Colonial-inspired color palette
- Generous whitespace
- Clear visual hierarchy
- Large, tappable buttons on mobile
- Readable font sizes (16px minimum body)
- Consistent spacing system

---

## Dependencies - DO NOT Add

### ❌ FORBIDDEN PACKAGES

```json
// Do not install these
"framer-motion"
"gsap"
"three"
"react-spring"
"@radix-ui/*"
"@headlessui/*"
"react-query"
"swr"
"axios"
"lodash"
"moment"
"date-fns"
"react-hook-form"
"zod"
"yup"
```

### ✅ ALLOWED PACKAGES

```json
// Only these + core Next.js dependencies
"next": "^14.0.0"
"react": "^18.0.0"
"react-dom": "^18.0.0"
"tailwindcss": "^3.4.0"
"typescript": "^5.0.0"
```

---

## File Structure - DO NOT

### ❌ AVOID

```
// Don't create these
/api/                    # No API routes needed
/lib/db.ts              # No database
/hooks/useAuth.ts       # No auth
/store/                 # No state management
/styles/*.module.css    # Use Tailwind instead
/tests/                 # Not in weekend scope
/.storybook/            # Not needed
/prisma/                # No database
```

### ✅ EXPECTED STRUCTURE

```
/app/
  /page.tsx
  /events/page.tsx
  /lectures/page.tsx
  /first-250/page.tsx
  /visit/page.tsx
  /layout.tsx
  /globals.css
/components/
  /Navigation.tsx
  /Footer.tsx
  /EventCard.tsx
  /LectureCard.tsx
  /Countdown.tsx
  /EmailSignup.tsx
/data/
  /events.json
  /lectures.json
  /siteInfo.json
/public/
  /images/
```

---

## Deployment - DO NOT

### ❌ AVOID

- Environment variables (none needed)
- Edge functions
- ISR or revalidation (static is fine)
- Middleware
- Custom server configuration
- Docker containers
- CI/CD pipelines (just use Vercel default)

### ✅ DO

- Push to GitHub
- Connect to Vercel
- Deploy with defaults
- Point domain DNS to Vercel

---

## Time Management - DO NOT

### ❌ AVOID

- Scope creep ("while we're at it...")
- Perfectionism on design details
- Refactoring working code
- Adding "nice to have" features
- Optimizing prematurely
- Building for edge cases

### ✅ DO

- Build minimum viable pages first
- Test on mobile early
- Deploy early and iterate
- Ship working code over perfect code
- Ask "is this in scope?" before building

---

## If In Doubt

1. Check PROJECT.md
2. Check this file
3. Default to simpler solution
4. When in doubt, leave it out
5. Ship something working

**Remember: This site launches THIS WEEKEND. Done > Perfect.**
