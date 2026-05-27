# Add to Calendar Integration Guide

## Quick Start

The "Add to Calendar" feature is ready to use. Here's how to integrate it into the events page.

## Import

```tsx
import { AddToCalendarButton } from '@/components/events/AddToCalendarButton'
```

## Placement in Events Page

Add the button below the main booking CTA, inside the `calendar-event-cta` div:

### Location: `app/(main)/events/page.tsx` line ~424

**Before:**

```tsx
{
  /* Event CTA */
}
;<div className={styles['calendar-event-cta']}>
  {event.category === 'digital' ? (
    <span className={styles['calendar-event-cta-btn-disabled']}>Online Event</span>
  ) : event.requiresTicket ? (
    <BookingButton
      itemId={'fareHarborId' in event ? event.fareHarborId : null}
      fallbackUrl={getTicketUrl(event) || `/events/${event.id}`}
      className={styles['calendar-event-cta-btn']}
      eventData={{
        id: event.id,
        title: event.title,
        fareHarborId: 'fareHarborId' in event ? event.fareHarborId : undefined,
        pricing: 'pricing' in event ? event.pricing : null,
      }}
    >
      Reserve Your Spot
    </BookingButton>
  ) : (
    <Link href="/visit" className={styles['calendar-event-cta-btn-secondary']}>
      Plan Your Visit <span aria-hidden="true">→</span>
    </Link>
  )}
</div>
```

**After:**

```tsx
{
  /* Event CTA */
}
;<div className={styles['calendar-event-cta']}>
  {event.category === 'digital' ? (
    <span className={styles['calendar-event-cta-btn-disabled']}>Online Event</span>
  ) : event.requiresTicket ? (
    <BookingButton
      itemId={'fareHarborId' in event ? event.fareHarborId : null}
      fallbackUrl={getTicketUrl(event) || `/events/${event.id}`}
      className={styles['calendar-event-cta-btn']}
      eventData={{
        id: event.id,
        title: event.title,
        fareHarborId: 'fareHarborId' in event ? event.fareHarborId : undefined,
        pricing: 'pricing' in event ? event.pricing : null,
      }}
    >
      Reserve Your Spot
    </BookingButton>
  ) : (
    <Link href="/visit" className={styles['calendar-event-cta-btn-secondary']}>
      Plan Your Visit <span aria-hidden="true">→</span>
    </Link>
  )}

  {/* Add to Calendar - Secondary action */}
  <AddToCalendarButton
    event={{
      id: event.id,
      title: event.title,
      date: event.date,
      endDate: event.endDate,
      time: event.time,
      description: event.description,
    }}
    className="mt-3"
  />
</div>
```

## Styling Notes

The button is already styled to be small and unobtrusive:

- Small text (`text-sm`)
- Muted color (`text-gray-600`)
- Subtle hover state
- Calendar emoji icon (📅)

The `className="mt-3"` adds a small top margin to separate it from the main CTA.

## Testing Locally

1. Add the button to the events page
2. Run `npm run dev`
3. Navigate to `/events`
4. Click "Add to Calendar" on any event
5. Verify the `.ics` file downloads
6. Open the file in Apple Calendar, Google Calendar, or Outlook
7. Verify all event details appear correctly

## What the User Sees

When they click "Add to Calendar":

1. Browser downloads a `.ics` file (e.g., `colonial-independence-day.ics`)
2. User can double-click the file to add to their default calendar
3. Or drag-and-drop into any calendar app

The event will include:

- Title
- Date and time (or all-day if no time)
- Location: Rocky Mount State Historic Site, 200 Hyder Hill Rd, Piney Flats, TN 37686
- Description
- Link back to the event page

## Example Downloads

### Single-day timed event

**File:** `colonial-independence-day.ics`

- Date: July 4, 2026
- Time: 10:00 AM - 11:00 AM

### Multi-day camp

**File:** `spring-break-camp-week-1.ics`

- Dates: March 16-20, 2026
- Time: 9:00 AM - 10:00 AM (uses first time from range)

### All-day event

**File:** `road-to-250-season-opening.ics`

- Date: March 4, 2026
- All-day event

## Browser Compatibility

Works in all modern browsers:

- Chrome/Edge
- Safari
- Firefox

No JavaScript polyfills needed.

## Future Enhancements

Once this is live, we can consider:

1. **Google Calendar direct link** - "Add to Google Calendar" button that opens Google Calendar
2. **Analytics tracking** - Track how often users download calendar files
3. **Reminder settings** - Add 1-day reminder to ICS file

## Questions?

See `docs/ADD-TO-CALENDAR.md` for full technical documentation.
