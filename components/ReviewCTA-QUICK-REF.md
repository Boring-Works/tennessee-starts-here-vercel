# ReviewCTA - Quick Reference

## Copy & Paste Examples

### Use as Standalone Section

```tsx
import ReviewCTA from '@/components/ReviewCTA'

export default function Page() {
  return <ReviewCTA />
}
```

### Use in Footer

```tsx
<ReviewCTA variant="footer" />
```

### Use with Custom Styling

```tsx
<ReviewCTA className="my-12 bg-primary text-white" />
```

## Props Cheatsheet

| Prop        | Type                       | Default        | Purpose                |
| ----------- | -------------------------- | -------------- | ---------------------- |
| `variant`   | `'standalone' \| 'footer'` | `'standalone'` | Layout style           |
| `className` | `string`                   | `''`           | Extra Tailwind classes |

## URLs (Auto-loaded from `/data/integrations.json`)

- **Google**: https://share.google/pH3cU63TP2bLc9SMV
- **TripAdvisor**: https://www.tripadvisor.com/Attraction_Review-g55272-d1866305-Reviews-Rocky_Mount_State_Historic_Site_Museum-Piney_Flats_Tennessee.html
- **Facebook**: https://www.facebook.com/rockymountmuseum/reviews

## Key Features

✅ Automatically reads URLs from integrations.json
✅ Mobile-responsive (stacks on small screens)
✅ Includes custom SVG icons for each platform
✅ Warm, inviting brand-aligned design
✅ Fully accessible (WCAG AA)
✅ Memoized (no unnecessary re-renders)

## Common Integration Points

```tsx
// Before footer
<ReviewCTA variant="standalone" className="mt-12" />

// In footer component
<ReviewCTA variant="footer" />

// Custom background (dark theme)
<ReviewCTA className="bg-primary text-white" />
```

## The Copy

**Headline**: Share Your Experience
**Message**: Enjoyed your visit? Help future visitors discover Rocky Mount. Your review helps families plan their Tennessee adventure.
**Closing**: Thank you for visiting Rocky Mount State Historic Site.

## Design Tokens

- Brand gold: `#c9a227`
- Button color (hover): Platform-specific
- Background gradient: `from-[#faf8f5] to-[#f0ebe3]`
- Text color: `#0d1821`

## Update Review URLs

1. Edit `/data/integrations.json`
2. Update paths:
   - `integrations.reviews.platforms.google.reviewUrl`
   - `integrations.reviews.platforms.tripadvisor.url`
   - `integrations.reviews.platforms.facebook.reviewUrl`
3. Component automatically uses new URLs

## File Locations

- Component: `/components/ReviewCTA.tsx`
- Usage guide: `/components/ReviewCTA-USAGE.md`
- Build report: `/REVIEWCTA-BUILD-REPORT.md`
- Data source: `/data/integrations.json`

---

**Status**: ✅ Production Ready | **Build**: ✅ Passes | **TypeScript**: ✅ Full Coverage
