# Tennessee Starts Here - Quick Start Guide

Get the site running in 5 minutes.

---

## 1. Create Project

```bash
npx create-next-app@latest tennessee-starts-here \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd tennessee-starts-here
```

---

## 2. Copy Data Files

Copy the JSON files from `/data/` in this spec folder to your project:

```bash
mkdir -p data
cp ../tennessee-starts-here-spec/data/*.json ./data/
```

---

## 3. Update Tailwind Config

Replace `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a3a5c",      // Colonial blue
        secondary: "#8b4513",    // Saddle brown
        accent: "#c9a227",       // Gold
        background: "#faf8f5",   // Parchment
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 4. Create Layout

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tennessee Starts Here | Rocky Mount State Historic Site",
  description: "Where Tennessee's government began. Join us for America 250 and Tennessee 230 programming at Rocky Mount State Historic Site.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-gray-800`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 5. Create Components Folder

```bash
mkdir -p components
```

Create minimal Navigation and Footer components to start.

---

## 6. Build Pages in Order

1. **Home** (`app/page.tsx`) - Hero, countdown, overview
2. **Events** (`app/events/page.tsx`) - Import events.json, map to cards
3. **Lectures** (`app/lectures/page.tsx`) - Import lectures.json
4. **First 250** (`app/first-250/page.tsx`) - Program info + Formspree form
5. **Visit** (`app/visit/page.tsx`) - Hours, map, FareHarbor widget

---

## 7. Test & Deploy

```bash
# Run locally
npm run dev

# Check mobile at http://localhost:3000

# Deploy to Vercel
npx vercel
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `PROJECT.md` | Full specification and constraints |
| `DO-NOT-DO.md` | What NOT to build |
| `data/events.json` | All 2026 events |
| `data/lectures.json` | Lecture series details |
| `data/siteInfo.json` | Visit info, hours, admission |

---

## Countdown Target

```javascript
// July 4, 2026
const targetDate = new Date("2026-07-04T00:00:00");
```

---

## External Services

### Formspree (Email)
1. Go to formspree.io
2. Create free account
3. Create form
4. Copy form endpoint URL

### FareHarbor
```html
<script src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"></script>
```

### Google Maps
Use embed URL with coordinates: `36.4081, -82.3247`

---

## Done!

Follow PROJECT.md for detailed content. Ship it this weekend.
