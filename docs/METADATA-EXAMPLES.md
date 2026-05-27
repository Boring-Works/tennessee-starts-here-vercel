# Metadata Audit - Detailed Examples

## What Should Be There vs What Is There

---

## Example 1: events.json

### CURRENT STRUCTURE (No File-Level Metadata)

```json
{
  "events": [
    {
      "id": "lecture-byrd",
      "title": "James P. Byrd Guest Lecture: Colonial Religion",
      "date": "2026-03-27",
      "speaker": "Dr. James P. Byrd",
      "speakerTitle": "Vanderbilt University"
      // ... more fields
    }
  ],
  "recurringPrograms": { ... },
  "first250": { ... }
}
```

### WHAT IT SHOULD LOOK LIKE

```json
{
  "metadata": {
    "id": "events-2026-america250",
    "title": "Rocky Mount Events Calendar 2026",
    "date": "2026-03-04",
    "content_type": "event_collection",
    "source": "rockymountmuseum.com",
    "source_url": "https://rockymountmuseum.com/events",
    "collection": "america250-2026",
    "lastUpdated": "2026-01-30T15:30:00Z",
    "version": "1.0.0",
    "maintainer": "rockymountmuseum@gmail.com"
  },
  "people_mentioned": [
    "Dr. James P. Byrd",
    "Lisa Bennett",
    "Thomas Bachelor",
    "Dr. Caroline H. Whitfield",
    "David Doan",
    "Dr. Daniel Redbird Wolfe"
  ],
  "data": {
    "events": [
      {
        "id": "lecture-byrd",
        "title": "James P. Byrd Guest Lecture: Colonial Religion",
        "date": "2026-03-27",
        "speaker": "Dr. James P. Byrd",
        "speakerTitle": "Vanderbilt University",
        "responds_to": "lectures.json#lecture-1"
        // ... more fields
      }
    ]
    // ... rest of content
  }
}
```

### WHAT'S MISSING

| Field                           | Example                            | Why It Matters                           |
| ------------------------------- | ---------------------------------- | ---------------------------------------- |
| `id`                            | "events-2026-america250"           | Can't uniquely identify this file        |
| `title`                         | "Rocky Mount Events Calendar 2026" | Can't describe what this data is         |
| `date`                          | "2026-03-04"                       | No creation/update timestamp             |
| `content_type`                  | "event_collection"                 | Can't categorize data                    |
| `source`                        | "rockymountmuseum.com"             | Don't know where data comes from         |
| `collection`                    | "america250-2026"                  | Can't group related files                |
| `people_mentioned`              | ["Dr. James P. Byrd", ...]         | Can't search for people                  |
| `responds_to` (on lecture-byrd) | "lectures.json#lecture-1"          | Don't know event appears in lecture file |
| `verification`                  | On prices                          | No dates for price verification          |

---

## Example 2: lectures.json

### CURRENT STRUCTURE (Missing File-Level Metadata)

```json
{
  "series": {
    "title": "Rocky Mount Lecture Series",
    "subtitle": "Tennessee's Founding Story",
    "year": 2026
  },
  "lectures": [
    {
      "id": 1,
      "title": "Colonial Religion on the Frontier",
      "date": "2026-03-27",
      "speaker": {
        "name": "Dr. James P. Byrd",
        "title": "Professor",
        "institution": "Vanderbilt University",
        "bio": "..."
      }
    }
  ]
}
```

### WHAT IT SHOULD LOOK LIKE

```json
{
  "metadata": {
    "id": "lectures-2026-rocky-mount",
    "title": "Rocky Mount Lecture Series",
    "date": "2026-03-27",
    "content_type": "lecture_series",
    "source": "rockymountmuseum.com",
    "collection": "america250-2026",
    "lastUpdated": "2026-01-30T15:30:00Z",
    "version": "1.0.0",
    "maintainer": "rockymountmuseum@gmail.com"
  },
  "people_mentioned": [
    "Dr. James P. Byrd",
    "Lisa Bennett",
    "Mary Patton",
    "Thomas Bachelor",
    "Dr. Caroline H. Whitfield",
    "David Doan",
    "Dr. Daniel Redbird Wolfe"
  ],
  "data": {
    "series": {
      /* ... */
    },
    "lectures": [
      {
        "id": 1,
        "title": "Colonial Religion on the Frontier",
        "date": "2026-03-27",
        "speaker": {
          /* ... */
        },
        "responses": ["events.json#lecture-byrd"],
        "verification": {
          "lastVerified": "2026-01-30T10:00:00Z",
          "verifiedBy": "rockymountmuseum@gmail.com",
          "source": "speaker-confirmation"
        }
      }
    ]
  }
}
```

### CRITICAL ISSUE: Dual-Role Interpreter Not Indexed

**Current Problem:**

- Lisa Bennett portrayed as "Mary Patton" in lecture 2
- No indicator that these are the same person
- Search for "Lisa Bennett" would miss the Mary Patton performance
- Search for "Mary Patton" would miss Lisa Bennett's bio

**Solution:** Include both names in people_mentioned:

```json
"people_mentioned": [
  "Lisa Bennett (portrayed as Mary Patton)",
  "Mary Patton (portrayed by Lisa Bennett)"
]
```

---

## Example 3: siteInfo.json - Contact Verification Gap

### CURRENT STRUCTURE (No Verification Timestamps)

```json
{
  "contact": {
    "phone": "(423) 538-7396",
    "email": "rockymountmuseum@gmail.com",
    "website": "https://rockymountmuseum.com"
  },
  "hours": {
    "regular": {
      "wednesday": "10:00 AM - 5:00 PM",
      "thursday": "10:00 AM - 5:00 PM",
      "friday": "10:00 AM - 5:00 PM",
      "saturday": "10:00 AM - 5:00 PM",
      "sunday": "Closed"
    }
  }
}
```

### WHAT IT SHOULD LOOK LIKE

```json
{
  "metadata": {
    "id": "siteinfo-2026-rocky-mount",
    "title": "Rocky Mount Site Information",
    "date": "2026-01-30",
    "content_type": "site_information",
    "source": "rockymountmuseum.com",
    "collection": "america250-2026",
    "lastUpdated": "2026-01-30T15:30:00Z",
    "version": "1.0.0",
    "maintainer": "rockymountmuseum@gmail.com"
  },
  "people_mentioned": ["William Blount", "Andrew Jackson", "William Cobb"],
  "data": {
    "contact": {
      "phone": "(423) 538-7396",
      "email": "rockymountmuseum@gmail.com",
      "website": "https://rockymountmuseum.com",
      "verification": {
        "lastVerified": "2026-01-30T10:00:00Z",
        "verifiedBy": "cody@example.com",
        "source": "direct-contact",
        "nextReviewDue": "2026-04-30"
      }
    },
    "hours": {
      "regular": {
        "wednesday": "10:00 AM - 5:00 PM",
        "thursday": "10:00 AM - 5:00 PM",
        "friday": "10:00 AM - 5:00 PM",
        "saturday": "10:00 AM - 5:00 PM",
        "sunday": "Closed",
        "verification": {
          "lastVerified": "2026-01-30T10:00:00Z",
          "verifiedBy": "staff@rockymountmuseum.com",
          "source": "direct-staff-confirmation",
          "nextReviewDue": "2026-04-30",
          "note": "Season ends mid-December; hours may change"
        }
      }
    }
  }
}
```

### WHY THIS MATTERS

Without verification fields:

- ❌ Don't know if phone number is current
- ❌ Don't know if hours are still accurate
- ❌ Can't detect when data gets stale
- ❌ No audit trail of who confirmed what and when
- ❌ Can't schedule review dates

With verification fields:

- ✓ Audit trail of last verification
- ✓ Know who verified the data
- ✓ Can set reminders for periodic review
- ✓ Can mark data as potentially stale
- ✓ Can track data quality over time

---

## Example 4: enrollment.json - No Metadata At All

### CURRENT STRUCTURE (Minimal, No Metadata)

```json
{
  "currentEnrolled": 147,
  "totalSpots": 250,
  "note": "Update this file when enrollment changes. All pages pull from here."
}
```

### WHAT IT SHOULD LOOK LIKE

```json
{
  "metadata": {
    "id": "enrollment-first250-2026",
    "title": "First 250 Enrollment Status",
    "date": "2026-01-30T15:30:00Z",
    "content_type": "enrollment_tracker",
    "source": "rockymountmuseum.com",
    "collection": "america250-2026",
    "lastUpdated": "2026-01-30T15:30:00Z",
    "version": "1.0.0",
    "maintainer": "rockymountmuseum@gmail.com"
  },
  "data": {
    "currentEnrolled": 147,
    "totalSpots": 250,
    "note": "Update this file when enrollment changes. All pages pull from here.",
    "verification": {
      "lastUpdated": "2026-01-30T15:30:00Z",
      "updatedBy": "staff@rockymountmuseum.com",
      "source": "form-submission",
      "enrollmentStart": "2026-03-04",
      "enrollmentEnd": "2026-06-01"
    }
  },
  "history": [
    {
      "date": "2026-01-30T15:30:00Z",
      "enrolled": 147,
      "updatedBy": "staff@rockymountmuseum.com"
    },
    {
      "date": "2026-01-29T10:00:00Z",
      "enrolled": 145,
      "updatedBy": "staff@rockymountmuseum.com"
    }
  ]
}
```

### WHY THIS MATTERS

Without metadata:

- ❌ Don't know when enrollment count was last updated
- ❌ Can't see enrollment progression over time
- ❌ No audit trail of who made changes
- ❌ Can't track rate of enrollment
- ❌ No way to detect data errors

With metadata and history:

- ✓ Know exactly when each update happened
- ✓ Can see enrollment curve over time
- ✓ Audit trail of all changes
- ✓ Can calculate enrollment velocity
- ✓ Can detect anomalies (sudden drops, etc.)

---

## Example 5: Cross-File Relationship Issue

### THE PROBLEM: Same Event, Two Files, No Link

**In events.json:**

```json
{
  "id": "lecture-byrd",
  "title": "James P. Byrd Guest Lecture: Colonial Religion",
  "date": "2026-03-27",
  "time": "2:00 PM",
  "category": "lecture"
}
```

**In lectures.json:**

```json
{
  "id": 1,
  "title": "Colonial Religion on the Frontier",
  "date": "2026-03-27",
  "speaker": {
    "name": "Dr. James P. Byrd",
    "institution": "Vanderbilt University"
  }
}
```

**Current Problem:**

- These are clearly the same event
- No field indicates they're related
- No way to query "show me all files for this event"
- Manual cross-reference required
- Easy to accidentally duplicate content

**Solution:** Add relationship fields

```json
// In events.json
{
  "id": "lecture-byrd",
  "responds_to": "lectures.json#lecture-1"
}

// In lectures.json
{
  "id": 1,
  "responses": ["events.json#lecture-byrd"]
}
```

---

## Summary of Gaps

### For events.json

- ✗ No file-level identification
- ✗ 6 speakers not indexed as people_mentioned
- ✗ Event-lecture relationships unmarked
- ✗ Prices have no verification dates
- ✗ FareHarbor URLs not tracked as source_url

### For lectures.json

- ✗ No file-level identification
- ✗ Lisa Bennett/Mary Patton dual role invisible
- ✗ Event relationships unmarked
- ✗ Speaker bios not verified
- ✗ No version tracking

### For siteInfo.json

- ✗ No file-level identification
- ✗ 3 historical figures not indexed
- ✗ Contact information not verified
- ✗ Hours not verified
- ✗ Sister site URLs not tracked
- ✗ **CRITICAL:** No verification timestamps on frequently-changing data

### For enrollment.json

- ✗ No file-level identification
- ✗ No timestamp on updates
- ✗ No change history
- ✗ No verification trail
- ✗ **CRITICAL:** No audit trail for enrollment changes

---

## Implementation Priority

1. **IMMEDIATE** - Add file-level metadata object to all 4 files
2. **URGENT** - Add verification timestamps to siteInfo.json contact/hours
3. **URGENT** - Add history tracking to enrollment.json
4. **SHORT-TERM** - Extract people_mentioned for all files
5. **SHORT-TERM** - Add responds_to/responses linking
6. **MEDIUM-TERM** - Add source_url tracking for external data
7. **ONGOING** - Keep metadata current and verified
