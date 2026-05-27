# Add to Calendar - Integration Diff

## Exact changes needed in `app/(main)/events/page.tsx`

### Change 1: Add Import (Line 10)

```diff
import { EventsToursBanner } from '@/components/events/EventsToursBanner'
import { EventsHoursCTA } from '@/components/events/EventsHoursCTA'
import { BookingButton } from '@/components/booking'
+import { AddToCalendarButton } from '@/components/events/AddToCalendarButton'
import styles from './page.module.css'
```

### Change 2: Add Button (Line ~424, inside calendar-event-cta div)

```diff
                        {/* Event CTA */}
                        <div className={styles['calendar-event-cta']}>
                          {event.category === 'digital' ? (
                            <span className={styles['calendar-event-cta-btn-disabled']}>
                              Online Event
                            </span>
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
                            <Link
                              href="/visit"
                              className={styles['calendar-event-cta-btn-secondary']}
                            >
                              Plan Your Visit <span aria-hidden="true">→</span>
                            </Link>
                          )}
+
+                          {/* Add to Calendar - Secondary action */}
+                          <AddToCalendarButton
+                            event={{
+                              id: event.id,
+                              title: event.title,
+                              date: event.date,
+                              endDate: event.endDate,
+                              time: event.time,
+                              description: event.description,
+                            }}
+                            className="mt-3"
+                          />
                        </div>
```

## That's it!

Two small changes:

1. One import
2. One component

The button will appear below every event's main CTA, styled as a small, subtle secondary action.

## Visual Result

Before clicking:

```
┌─────────────────────────────────┐
│ Colonial Independence Day       │
│ Jul 4, 2026 • 10:00 AM         │
│                                 │
│ Join us for a special...        │
│                                 │
│  [Reserve Your Spot]            │
│  📅 Add to Calendar             │ ← NEW
└─────────────────────────────────┘
```

After clicking:

- Downloads `colonial-independence-day.ics`
- User can open in any calendar app
- Event appears with all details (date, time, location, description)

## Testing

```bash
npm run dev
```

Visit `/events` and click "Add to Calendar" on any event.
