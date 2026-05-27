# Add to Calendar Feature

## Overview

The Add to Calendar feature allows users to download `.ics` (iCalendar) files for events, which can be imported into any calendar application (Apple Calendar, Google Calendar, Outlook, etc.).

## Files Created

### Utility: `lib/calendar/generateICS.ts`

Core business logic for generating ICS file content.

**Exports:**

- `generateICS(event)` - Generates ICS file content
- `generateICSFilename(event)` - Generates a sanitized filename

**Features:**

- Single-day events (with or without time)
- Multi-day events
- All-day events
- Proper escaping of special characters (`,`, `;`, `\`, newlines)
- Automatic end time calculation (1 hour after start if not specified)
- Location: Always "Rocky Mount State Historic Site, 200 Hyder Hill Rd, Piney Flats, TN 37686"
- Event URL: Links back to event on tennesseestartshere.com

### Component: `components/events/AddToCalendarButton.tsx`

Client-side React component that downloads the ICS file when clicked.

**Props:**

```typescript
{
  event: {
    id: string
    title: string
    date: string          // YYYY-MM-DD
    endDate?: string | null
    time?: string | null
    description: string
  }
  className?: string
}
```

**Design:**

- Small, unobtrusive (text-sm, muted colors)
- Calendar emoji icon (📅)
- Hover state for better UX
- Accessible (aria-label)

## Usage

### In Events Page

```tsx
import { AddToCalendarButton } from '@/components/events/AddToCalendarButton'

;<AddToCalendarButton
  event={{
    id: event.id,
    title: event.title,
    date: event.date,
    endDate: event.endDate,
    time: event.time,
    description: event.description,
  }}
/>
```

### Placement

The button should be placed **below** the main booking CTA, in a secondary position:

```tsx
<div className="calendar-event-cta">
  {/* Main CTA */}
  <BookingButton ... />

  {/* Secondary: Add to Calendar */}
  <AddToCalendarButton event={event} />
</div>
```

## Example ICS Output

### Single-day event with time

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tennessee Starts Here//Events//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:colonial-independence-day@tennesseestartshere.com
DTSTAMP:20260130T120000Z
DTSTART:20260704T100000
DTEND:20260704T110000
SUMMARY:Colonial Independence Day
DESCRIPTION:Join us for a special celebration of America's 250th birthday.
LOCATION:Rocky Mount State Historic Site, 200 Hyder Hill Rd, Piney Flats, TN 37686
URL:https://tennesseestartshere.com/events#colonial-independence-day
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR
```

### Multi-day all-day event

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tennessee Starts Here//Events//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:spring-break-camp-1@tennesseestartshere.com
DTSTAMP:20260130T120000Z
DTSTART;VALUE=DATE:20260316
DTEND;VALUE=DATE:20260321
SUMMARY:Spring Break Camp Week 1
DESCRIPTION:Trade screens for sawdust and adventure.
LOCATION:Rocky Mount State Historic Site, 200 Hyder Hill Rd, Piney Flats, TN 37686
URL:https://tennesseestartshere.com/events#spring-break-camp-1
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR
```

## Edge Cases Handled

1. **No time specified** → All-day event (`DTSTART;VALUE=DATE`)
2. **Multi-day event** → Uses `endDate`, adds 1 day to DTEND (iCal spec requirement)
3. **Time ranges** (e.g., "9:00 AM - 3:00 PM") → Uses first time, calculates 1-hour default end
4. **Special characters** → Escaped per RFC 5545 (`,`, `;`, `\`, newlines)
5. **12-hour to 24-hour conversion** → Handles AM/PM correctly
6. **Long titles** → Filename truncated to 50 characters + `.ics`

## Testing

Run the test file to verify all edge cases:

```bash
npx tsx lib/calendar/generateICS.test.ts
```

This will output sample ICS files for:

- Single-day timed event
- Single-day all-day event
- Multi-day timed event
- Multi-day all-day event
- Events with special characters

## Browser Compatibility

The download mechanism uses:

- `Blob` API (supported in all modern browsers)
- `URL.createObjectURL` (supported in all modern browsers)
- Automatic cleanup with `URL.revokeObjectURL`

**Fallback:** None needed - feature is purely additive. If JavaScript is disabled, the button simply won't appear.

## Styling Notes

The button uses:

- `text-sm` - Small, secondary text
- `text-gray-600` - Muted color
- `hover:text-gray-900` - Subtle hover state
- `inline-flex items-center gap-1.5` - Icon + text layout

Keep the button **visually subordinate** to the main booking CTA. This is a convenience feature, not a primary action.

## Future Enhancements

Potential additions (not currently implemented):

1. **Platform-specific links** - Google Calendar "Add to Calendar" link
2. **Reminder settings** - Add alarm/reminder to ICS file
3. **Organizer field** - Add Rocky Mount contact info
4. **Recurrence** - For recurring events (not applicable to current dataset)
5. **Analytics** - Track how often users download calendar files

## References

- [RFC 5545 (iCalendar)](https://datatracker.ietf.org/doc/html/rfc5545)
- [iCalendar Validator](https://icalendar.org/validator.html)
