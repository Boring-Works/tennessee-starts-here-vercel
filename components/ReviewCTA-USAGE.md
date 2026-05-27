# ReviewCTA Component Usage Guide

## Overview

The `ReviewCTA` component encourages website visitors to leave reviews on Google, TripAdvisor, and Facebook. It automatically imports review URLs from `/data/integrations.json`, ensuring consistency across the site.

## Features

- ✅ **Dynamic URLs** from integrations.json (no hardcoding)
- ✅ **Two layout variants**: standalone section or footer integration
- ✅ **Mobile-responsive** design (stacks vertically on mobile)
- ✅ **Platform-specific icons** (Google, TripAdvisor, Facebook)
- ✅ **Warm, inviting design** with cream/gold tinted backgrounds
- ✅ **Accessible** with proper ARIA labels and semantic HTML
- ✅ **Memoized** to prevent unnecessary re-renders
- ✅ **TypeScript** with full type safety

## Installation

The component is already created at:

```
/components/ReviewCTA.tsx
```

## Basic Usage

### Standalone Section

Use this to display the ReviewCTA as a full-width section on a page:

```tsx
import ReviewCTA from '@/components/ReviewCTA'

export default function Page() {
  return (
    <>
      {/* Other page content */}
      <ReviewCTA variant="standalone" />
    </>
  )
}
```

### Footer Integration

Use this for a more compact version in the footer or sidebar:

```tsx
import ReviewCTA from '@/components/ReviewCTA'

export default function Footer() {
  return (
    <footer>
      <ReviewCTA variant="footer" />
    </footer>
  )
}
```

### Custom Styling

Add additional Tailwind classes via the `className` prop:

```tsx
<ReviewCTA variant="standalone" className="bg-primary text-white" />
```

## Props

```typescript
interface ReviewCTAComponentProps {
  variant?: 'standalone' | 'footer' // Default: 'standalone'
  className?: string // Additional Tailwind classes
}
```

### Variant Differences

| Aspect      | Standalone               | Footer               |
| ----------- | ------------------------ | -------------------- |
| Background  | Cream gradient           | Inherits from parent |
| Padding     | py-16 md:py-20           | py-8 md:py-10        |
| Decorations | Top/bottom flourishes    | None                 |
| Tagline     | Full "Thank you" message | No closing message   |
| CTA Text    | "Leave a review on:"     | Same                 |

## Data Source

The component pulls review URLs from `/data/integrations.json`:

```json
{
  "integrations": {
    "reviews": {
      "platforms": {
        "google": {
          "reviewUrl": "https://share.google/pH3cU63TP2bLc9SMV"
        },
        "tripadvisor": {
          "url": "https://www.tripadvisor.com/Attraction_Review-..."
        },
        "facebook": {
          "reviewUrl": "https://www.facebook.com/rockymountmuseum/reviews"
        }
      }
    }
  }
}
```

To update review URLs, edit `data/integrations.json` directly. Changes will automatically reflect in the component on next build/deploy.

## Styling Details

### Colors Used

- **Primary text**: #0d1821 (dark blue/charcoal)
- **Accent/gold**: #c9a227 (brand gold)
- **Buttons**: White background with subtle gold border
- **Hover states**: Platform-specific colors (Google blue, TripAdvisor teal, Facebook blue)
- **Background gradient** (standalone): cream (#faf8f5) to cream-dark (#f0ebe3)

### Button Behavior

- **Default state**: White background, subtle gold border
- **Hover state**: Smooth color transition to platform brand color, slight lift effect
- **Focus state**: Ring outline in brand gold with offset
- **Mobile**: Buttons stack vertically, stretch full width
- **Tablet+**: Buttons arrange horizontally, center aligned

### Responsive Breakpoints

- **Mobile** (<640px): Single column, full-width buttons
- **Tablet** (≥640px): Three columns, icons with text, centered
- **Icons visible**: Always (SVG icons scale responsively)
- **Text visible**: Only on tablet+ (hidden with `hidden xs:inline`)

## Accessibility

- Proper heading hierarchy (h2)
- ARIA labels on all interactive elements
- SVG icons properly marked with `aria-hidden="true"`
- Focus-visible styles for keyboard navigation
- Semantic HTML structure with `<section>` wrapper
- All links open in new tabs with `rel="noopener noreferrer"`

## Marketing Copy (Built-in)

The component includes optimized messaging:

- **Headline**: "Share Your Experience"
- **Body**: "Enjoyed your visit? Help future visitors discover Rocky Mount. Your review helps families plan their Tennessee adventure."
- **Button prompt**: "Leave a review on:"
- **Closing**: "Thank you for visiting Rocky Mount State Historic Site."

This messaging aligns with the site's warm, inviting brand voice.

## Common Integration Points

### 1. Events Page Footer

Add ReviewCTA before the final section:

```tsx
// app/(main)/events/page.tsx
import ReviewCTA from '@/components/ReviewCTA'

export default function EventsPage() {
  return (
    <>
      <EventsList />
      <ReviewCTA variant="standalone" className="mt-12" />
    </>
  )
}
```

### 2. Visit Page CTA Section

Replace or supplement the FinalCTA:

```tsx
import ReviewCTA from '@/components/ReviewCTA'

export default function VisitPage() {
  return (
    <>
      <VisitInfo />
      <ReviewCTA variant="standalone" />
    </>
  )
}
```

### 3. Footer Component

Add to the existing Footer:

```tsx
import ReviewCTA from '@/components/ReviewCTA'

export default function Footer() {
  return (
    <footer>
      <ContactInfo />
      <ReviewCTA variant="footer" />
      <SocialLinks />
    </footer>
  )
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

All SVG icons render properly. CSS Grid/Flexbox fully supported.

## Performance

- **Memoized component** prevents unnecessary re-renders
- **Static icons** (no external image requests)
- **No dependencies** beyond React core
- **Minimal bundle impact** (~2KB minified)

## Troubleshooting

### URLs not showing?

1. Verify `/data/integrations.json` exists and contains the review URLs
2. Check the file path structure:
   ```
   integrations.integrations.reviews.platforms.{google|tripadvisor|facebook}.{reviewUrl|url}
   ```
3. Run `npm run build` to ensure the JSON is properly imported

### Styling issues?

1. Ensure Tailwind CSS v4 is configured (`app/globals.css`)
2. Verify color codes are present (check `--gold-primary` token)
3. Check that arbitrary color values work: `bg-[#hexcolor]`

### Accessibility warnings?

All ARIA attributes and semantic HTML are properly implemented. If accessibility tools flag issues, verify:

- Contrast ratios (should meet WCAG AA)
- Keyboard navigation works
- Screen reader announces all links and labels

## Future Enhancements

Potential improvements for future iterations:

1. **Additional platforms**: Yelp, Trustpilot (already in integrations.json structure)
2. **Analytics tracking**: Track which review button users click
3. **Conditional rendering**: Only show enabled platforms from integrations.json
4. **Custom copy**: Accept messaging via props
5. **Theme variants**: Dark mode version

## Files Modified

- Created: `/components/ReviewCTA.tsx`
- References: `/data/integrations.json` (read-only)

No other files were modified. The component is fully self-contained.

## Support

For questions or issues:

1. Check `data/integrations.json` for URL configuration
2. Review this usage guide
3. Ensure component is imported with correct path: `@/components/ReviewCTA`
