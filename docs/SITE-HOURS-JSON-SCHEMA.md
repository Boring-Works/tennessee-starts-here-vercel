# Site Hours Configuration — JSON Schema & Examples

## Complete JSON Schema for siteInfo.json Hours Section

If you wanted to externalize the hours configuration to `data/siteInfo.json`, here's the schema:

### Root Level

```json
{
  "hours": {
    "regular": {
      "open": 10,
      "close": 17,
      "formatted": "10:00 AM - 5:00 PM"
    },
    "openDays": [3, 4, 5, 6],
    "openDaysFormatted": "Wednesday - Saturday",
    "seasonStart": {
      "month": 3,
      "weekOfMonth": 1,
      "dayOfWeek": 3,
      "description": "First Wednesday of March"
    },
    "seasonEnd": {
      "month": 12,
      "day": 15,
      "description": "Last Saturday before December 20"
    },
    "closures": [...],
    "specialEvents": [...],
    "notes": {
      "tours": "Hourly departures, last tour at 4:00 PM",
      "seasonal": "March through mid-December",
      "closed": "Sunday, Monday, Tuesday"
    }
  }
}
```

---

## Closures Schema

### Thanksgiving

```json
{
  "type": "thanksgiving",
  "pattern": {
    "name": "Fourth Thursday of November",
    "month": 11,
    "weekOfMonth": 4,
    "dayOfWeek": 4
  },
  "duration": {
    "days": 7,
    "description": "Thanksgiving week (Thanksgiving Day through following Thursday)"
  },
  "reason": "Thanksgiving Holiday",
  "label": "Thanksgiving"
}
```

### Christmas

```json
{
  "type": "christmas",
  "pattern": {
    "name": "December 24 through January 2",
    "start": {
      "month": 12,
      "day": 24
    },
    "end": {
      "month": 1,
      "day": 2
    }
  },
  "duration": {
    "days": 10,
    "spansYears": true,
    "description": "Christmas holiday (Dec 24 - Jan 2, next year)"
  },
  "reason": "Christmas Holiday",
  "label": "Christmas"
}
```

### Custom Closure (Example)

```json
{
  "type": "custom",
  "date": "2026-08-15",
  "reason": "Staff Appreciation Day",
  "duration": {
    "days": 1,
    "note": "Single day"
  },
  "label": "Staff Day"
}
```

---

## Special Events Schema

### Haunting on the Mount

```json
{
  "title": "Haunting on the Mount",
  "type": "seasonal",
  "category": "haunting",
  "datePattern": {
    "month": 10,
    "approximateDay": 15,
    "description": "Mid-October (~Oct 15)",
    "fuzzyMatch": {
      "days": 3,
      "note": "Matches Oct 12-18"
    }
  },
  "hours": {
    "open": 18,
    "openFormatted": "6:00 PM",
    "close": 21,
    "closeFormatted": "9:00 PM",
    "description": "Extended evening hours"
  },
  "ticketUrl": "https://fareharbor.com/rockymountmuseum/",
  "requiresTicket": true,
  "description": "Evening ghost stories and spooky history tour through the historic grounds"
}
```

### Candlelight Christmas

```json
{
  "title": "Candlelight Christmas",
  "type": "seasonal",
  "category": "seasonal",
  "datePattern": {
    "month": 12,
    "approximateDay": 4,
    "description": "Early December (~Dec 4)",
    "fuzzyMatch": {
      "days": 3,
      "note": "Matches Dec 1-7"
    }
  },
  "hours": {
    "open": 16,
    "openFormatted": "4:00 PM",
    "close": 20,
    "closeFormatted": "8:00 PM",
    "description": "Extended evening hours for candlelit tours"
  },
  "ticketUrl": "https://fareharbor.com/rockymountmuseum/",
  "requiresTicket": true,
  "description": "Experience Rocky Mount by candlelight as it would have been during frontier winters"
}
```

---

## Complete Example: siteInfo.json Hours Section

```json
{
  "site": {
    "name": "Rocky Mount State Historic Site"
  },
  "hours": {
    "regular": {
      "open": 10,
      "close": 17,
      "formatted": "10:00 AM - 5:00 PM"
    },
    "openDays": {
      "numbers": [3, 4, 5, 6],
      "formatted": "Wednesday - Saturday",
      "explanation": "3=Wed, 4=Thu, 5=Fri, 6=Sat (0=Sun)"
    },
    "season": {
      "start": {
        "month": 3,
        "pattern": "First Wednesday of March",
        "example": "March 4, 2026"
      },
      "end": {
        "month": 12,
        "pattern": "Last Saturday before December 20",
        "example": "December 19, 2026"
      },
      "formatted": "March through mid-December"
    },
    "tours": {
      "frequency": "Hourly",
      "firstTour": "10:00 AM",
      "lastTour": "4:00 PM",
      "note": "Tours depart every hour. Last tour at 4pm."
    },
    "closures": [
      {
        "type": "thanksgiving",
        "pattern": "4th Thursday of November",
        "month": 11,
        "weekOfMonth": 4,
        "dayOfWeek": 4,
        "durationDays": 7,
        "reason": "Thanksgiving Holiday",
        "2026": "November 26 - December 3"
      },
      {
        "type": "christmas",
        "pattern": "December 24 - January 2",
        "startMonth": 12,
        "startDay": 24,
        "endMonth": 1,
        "endDay": 2,
        "spansYears": true,
        "durationDays": 10,
        "reason": "Christmas Holiday",
        "2026": "December 24, 2026 - January 2, 2027"
      }
    ],
    "specialEvents": [
      {
        "title": "Haunting on the Mount",
        "type": "seasonal",
        "month": 10,
        "approximateDay": 15,
        "fuzzyMatchDays": 3,
        "2026": "October 12-18",
        "hours": {
          "open": 18,
          "close": 21,
          "formatted": "6:00 PM - 9:00 PM"
        },
        "requiresTicket": true
      },
      {
        "title": "Candlelight Christmas",
        "type": "seasonal",
        "month": 12,
        "approximateDay": 4,
        "fuzzyMatchDays": 3,
        "2026": "December 1-7",
        "hours": {
          "open": 16,
          "close": 20,
          "formatted": "4:00 PM - 8:00 PM"
        },
        "requiresTicket": true
      }
    ],
    "notes": [
      "Site closed Sunday, Monday, Tuesday (except for scheduled events)",
      "Tours are 1 hour, allowing arrival up to 4:00 PM",
      "Hours may vary for special events",
      "Configuration updates automatically for each year—no code changes needed"
    ]
  }
}
```

---

## Suggested siteInfo.json Integration

You could store this in `data/siteInfo.json` and load it at runtime:

### Option A: Minimal Config (Keep TypeScript Default)

```json
{
  "hours": {
    "note": "Configuration defined in lib/siteHours.ts (ROCKY_MOUNT_HOURS_CONFIG)",
    "humanReadable": {
      "season": "March through mid-December",
      "days": "Wednesday - Saturday",
      "time": "10:00 AM - 5:00 PM",
      "tours": "Hourly departures, last tour at 4:00 PM",
      "closed": "Sunday, Monday, Tuesday",
      "holidays": "Thanksgiving week, Christmas week"
    }
  }
}
```

### Option B: Full Config in JSON

```json
{
  "hours": {
    "config": {
      "regularHours": {
        "open": 10,
        "close": 17
      },
      "openDays": [3, 4, 5, 6],
      "seasonStart": {
        "month": 3,
        "weekOfMonth": 1,
        "dayOfWeek": 3
      },
      "seasonEnd": {
        "month": 12,
        "day": 15
      },
      "closures": [
        {
          "type": "thanksgiving",
          "endOffsetDays": 7
        },
        {
          "type": "christmas"
        }
      ],
      "specialEvents": [
        {
          "eventTitle": "Haunting on the Mount",
          "datePattern": {
            "month": 10,
            "approximateDay": 15
          },
          "hours": {
            "open": 18,
            "close": 21
          }
        },
        {
          "eventTitle": "Candlelight Christmas",
          "datePattern": {
            "month": 12,
            "approximateDay": 4
          },
          "hours": {
            "open": 16,
            "close": 20
          }
        }
      ]
    }
  }
}
```

---

## TypeScript Type Definitions (for JSON validation)

```typescript
interface HoursConfigJson {
  regularHours: {
    open: number
    close: number
    formatted?: string
  }
  openDays: number[]
  openDaysFormatted?: string
  seasonStart: {
    month: number
    weekOfMonth: number
    dayOfWeek: number
    description?: string
  }
  seasonEnd: {
    month: number
    day: number
    description?: string
  }
  closures: ClosureConfig[]
  specialEvents: SpecialEventConfig[]
  notes?: string[]
}

interface ClosureConfig {
  type: 'thanksgiving' | 'christmas' | 'custom'
  pattern?: string
  month?: number
  weekOfMonth?: number
  dayOfWeek?: number
  startMonth?: number
  startDay?: number
  endMonth?: number
  endDay?: number
  customDate?: string
  durationDays?: number
  spansYears?: boolean
  reason: string
  label?: string
}

interface SpecialEventConfig {
  title: string
  type: 'seasonal' | 'other'
  month: number
  approximateDay?: number
  weekOfMonth?: number
  dayOfWeek?: number
  fuzzyMatchDays?: number
  hours: {
    open: number
    close: number
    formatted?: string
  }
  requiresTicket?: boolean
  description?: string
}
```

---

## Loading Config from JSON

If you want to externalize the config:

```typescript
// lib/siteHours.ts

import siteInfoJson from '@/data/siteInfo.json'

export const ROCKY_MOUNT_HOURS_CONFIG: HoursConfig = siteInfoJson.hours.config

// Or validate and transform:
export const loadHoursConfig = (json: HoursConfigJson): HoursConfig => {
  return {
    regularHours: json.regularHours,
    openDays: json.openDays,
    seasonStart: json.seasonStart,
    seasonEnd: json.seasonEnd,
    closures: json.closures.map(transformClosureConfig),
    specialEvents: json.specialEvents.map(transformSpecialEventConfig),
  }
}
```

---

## Recommendation

For Rocky Mount 2026:

1. **Keep the TypeScript config** (`ROCKY_MOUNT_HOURS_CONFIG`) — It's well-documented and type-safe
2. **Add JSON display fields to siteInfo.json** — For human-readable descriptions
3. **Only externalize if hours change frequently** — Currently, they're stable year-round

The current approach is the right balance between maintainability and flexibility.

---

## Validation Checklist

When updating hours configuration:

- [ ] Season start is first Wednesday of March (not a specific date)
- [ ] Season end uses last Saturday before Dec 20 logic
- [ ] Thanksgiving is 4th Thursday + 7 days
- [ ] Christmas is Dec 24 - Jan 2 (spans year boundary)
- [ ] Open days are [3, 4, 5, 6] (Wed-Sat, 0=Sun)
- [ ] Regular hours are 10am-5pm
- [ ] Special events use approximate day or week pattern
- [ ] All dates calculated, not hardcoded

---

_Last updated: January 2026_
