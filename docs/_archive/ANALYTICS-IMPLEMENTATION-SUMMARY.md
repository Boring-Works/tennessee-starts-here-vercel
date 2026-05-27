# Analytics Implementation Summary

## Changes Made

This document summarizes all changes made to implement minimum viable marketing tracking for Tennessee Starts Here.

### Date: January 30, 2026

---

## New Files Created

### 1. `lib/analytics.ts`

**Purpose:** Centralized analytics tracking utilities

**Functions:**

- `trackBeginCheckout(event)` - Fires GA4 `begin_checkout` and Facebook Pixel `InitiateCheckout` events
- `trackPageView(url)` - Fires page view events for both platforms

**Key Features:**

- TypeScript type safety with `CheckoutEvent` interface
- Automatically calculates lowest price from event pricing data
- Sends structured data to both GA4 and Facebook Pixel
- Graceful degradation if analytics scripts aren't loaded

### 2. `ANALYTICS-SETUP.md`

**Purpose:** Complete documentation for analytics setup and usage

**Contents:**

- Environment variable configuration
- Testing instructions (GA4 Debugger, Meta Pixel Helper)
- Data structure requirements
- Code usage examples
- Troubleshooting guide
- Privacy considerations

---

## Modified Files

### 1. `components/Analytics.tsx`

**Changes:**

- Added Facebook Pixel script loading
- Added environment variable check for `NEXT_PUBLIC_FB_PIXEL_ID`
- Both GA4 and Facebook Pixel now load conditionally based on env vars

**Before:** Only GA4 tracking
**After:** GA4 + Facebook Pixel tracking

### 2. `components/booking/BookingButton.tsx`

**Changes:**

- Added `eventData` prop for comprehensive tracking
- Integrated `trackBeginCheckout()` from `lib/analytics.ts`
- Maintained backward compatibility with legacy `analyticsEvent` prop

**Before:** Generic GA4 event tracking
**After:** Structured `begin_checkout` tracking with item details and pricing

### 3. `app/(main)/events/page.tsx`

**Changes:**

- Imported `BookingButton` from `@/components/booking`
- Replaced plain anchor tags with `BookingButton` component
- Added `eventData` prop with event details for analytics

**Before:** No tracking on booking clicks
**After:** Full GA4 + Facebook Pixel tracking on every "Reserve Your Spot" click

### 4. `app/(main)/programs/page.tsx`

**Changes:**

- Imported `BookingButton` from `@/components/booking`
- Replaced plain anchor tags with `BookingButton` component for ticketed programs
- Added `eventData` prop with program details

**Before:** No tracking on program bookings
**After:** Full analytics tracking on recurring program bookings

### 5. `types/data.ts`

**Changes:**

- Added `fareHarborId?: string` to `Event` interface
- Added `pricing` object to `Event` interface
- Added same fields to `RecurringProgram` interface

**Reason:** TypeScript needs to know these fields exist for type-safe analytics tracking

### 6. `.env.example`

**Changes:**

- Added `NEXT_PUBLIC_GA_ID` with example format
- Added `NEXT_PUBLIC_FB_PIXEL_ID` with example format
- Added comments with instructions on where to get these IDs

---

## What Gets Tracked

### Page Views (Automatic)

- **Trigger:** Every page load
- **GA4 Event:** `page_view`
- **Facebook Pixel Event:** `PageView`
- **Data Sent:** Current page path

### Event Bookings (On Click)

- **Trigger:** User clicks "Reserve Your Spot" on any event or program
- **GA4 Event:** `begin_checkout`
  - `currency`: USD
  - `value`: Lowest available price
  - `items[0].item_id`: FareHarbor ID or event ID
  - `items[0].item_name`: Event title
  - `items[0].price`: Lowest available price
- **Facebook Pixel Event:** `InitiateCheckout`
  - `content_name`: Event title
  - `content_ids`: [FareHarbor ID or event ID]
  - `content_type`: "product"
  - `value`: Lowest available price
  - `currency`: USD

---

## Configuration Required

To activate tracking, add these environment variables to `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Google Analytics 4 Measurement ID
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX # Facebook Pixel ID
```

**Important:**

- Variables MUST start with `NEXT_PUBLIC_` to be available in the browser
- Get GA4 ID from Google Analytics → Admin → Data Streams
- Get Facebook Pixel ID from Facebook Events Manager → Pixels

---

## Testing Checklist

### Before Going Live

- [ ] Set `NEXT_PUBLIC_GA_ID` in Vercel environment variables
- [ ] Set `NEXT_PUBLIC_FB_PIXEL_ID` in Vercel environment variables
- [ ] Deploy to production
- [ ] Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- [ ] Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- [ ] Visit site and verify PageView events fire
- [ ] Click "Reserve Your Spot" on an event
- [ ] Verify `begin_checkout` in GA4 Debugger
- [ ] Verify `InitiateCheckout` in Meta Pixel Helper
- [ ] Check that event name and price are correct
- [ ] Wait 24-48 hours and verify data in GA4 Reports

---

## Architecture Notes

### Why BookingButton Component?

The `BookingButton` component encapsulates:

1. FareHarbor Lightframe integration (modal booking)
2. Analytics tracking (GA4 + Facebook Pixel)
3. SSR/client-side hydration handling
4. Graceful fallback for no-JS environments

This keeps tracking logic centralized and DRY (Don't Repeat Yourself).

### Why Track "Lowest Price"?

Events often have multiple price tiers (adult, senior, child, member). We send the lowest price because:

1. It's the most attractive/conversion-focused number
2. Matches how pricing is displayed on the site ("From $X")
3. Provides consistent comparison across events

### Type Safety

All tracking functions use TypeScript interfaces to ensure:

- Event data structure is validated at compile time
- Required fields (id, title) can't be omitted
- Optional fields (fareHarborId, pricing) are handled safely

---

## Future Enhancements

Potential additions (not currently implemented):

1. **Purchase Tracking**
   - Requires FareHarbor webhook integration
   - Would track completed bookings with revenue data

2. **Cookie Consent**
   - GDPR/CCPA compliance banner
   - Allow users to opt out of tracking

3. **Google Tag Manager**
   - Easier tag management without code deployments
   - Support for additional marketing pixels

4. **Enhanced Ecommerce**
   - Cart abandonment tracking
   - Checkout funnel analysis

---

## Questions?

See `ANALYTICS-SETUP.md` for detailed documentation and troubleshooting.

---

**Implementation Date:** January 30, 2026
**Implemented By:** Claude Code Analytics Team
**Status:** Ready for Production
