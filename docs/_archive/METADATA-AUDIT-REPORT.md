# Metadata Completeness Audit Report

**Project:** Tennessee Starts Here
**Audit Date:** 2026-01-30
**Scope:** All document data files in `/data/` directory

---

## Executive Summary

The project has **4 active data files** with inconsistent metadata implementation. None of the files currently implement the full recommended metadata schema. All files lack required identification and verification fields.

**Critical Finding:** No documents have unique `id` fields, proper `date` created/updated tracking, `content_type` designation, or `source` attribution.

---

## Files Audited

1. `/data/events.json` — Event calendar (26 events + 5 recurring programs)
2. `/data/lectures.json` — Lecture series (5 lectures + additional programming)
3. `/data/siteInfo.json` — Site operational information
4. `/data/enrollment.json` — First 250 enrollment tracker

---

## Detailed Findings by File

### 1. events.json

**Structure:** Array of 26 events + recurring programs section + first250 metadata

**Required Fields Check:**

- ✗ `id` — MISSING (file-level metadata object)
- ✗ `title` — MISSING (file-level metadata object)
- ✗ `date` — EXISTS but only on individual events (not file-level)
- ✗ `content_type` — MISSING
- ✗ `source` — MISSING
- ✗ `collection` — MISSING

**Individual Event Metadata:**
Events DO have event-specific metadata:

- ✓ `id` — Present (kebab-case)
- ✓ `date` — Present (YYYY-MM-DD)
- ✓ `type` — Present (new|enhanced|recurring|milestone)
- ✓ `category` — Present (lecture|festival|camp|etc.)

**Missing Optional Fields:**

- ✗ `source_url` — MISSING (FareHarbor IDs exist but not as URL references)
- ✗ `people_mentioned` — MISSING (speakers exist but not in array format)
- ✗ `responds_to` — MISSING (no relationship tracking)
- ✗ `responses` — MISSING (no bidirectional links)
- ✗ `verification` — MISSING (no data source attribution)

**Issues:**

1. No file-level metadata object (timestamp, version, maintainer)
2. Speaker info in events is inconsistent (some events have `speaker`/`speakerTitle`, not all)
3. FareHarbor IDs exist but scattered inconsistently (field placement varies)
4. No `people_mentioned` arrays for speakers/interpreters

---

### 2. lectures.json

**Required Fields Check:**

- ✗ `id` — MISSING (file-level)
- ✗ `title` — EXISTS (series.title exists, but not file-level)
- ✗ `date` — EXISTS on individual lectures only
- ✗ `content_type` — MISSING
- ✗ `source` — MISSING
- ✗ `collection` — MISSING

**Individual Lecture Metadata:**

- ✓ `id` — Present (numeric 1-5)
- ✓ `date` — Present (YYYY-MM-DD)
- ✓ `speaker` — Detailed object with name, title, institution, bio

**Missing Optional Fields:**

- ✗ `source_url` — MISSING
- ✗ `people_mentioned` — MISSING (speakers exist but not in array format)
- ✗ `responds_to` — MISSING
- ✗ `responses` — MISSING
- ✗ `verification` — MISSING

**Critical Issues:**

1. No file-level id or metadata object
2. Lecture speaker names are buried in objects, not indexed as `people_mentioned`
3. No relationship tracking between lectures and events (e.g., lecture-byrd is part of events.json but not linked)
4. Additional programming section not properly structured with full metadata
5. Speaker "Lisa Bennett" is portrayed as "Mary Patton" in lecture ID 2, but this dual-role data is not exposed for cross-reference

---

### 3. siteInfo.json

**Required Fields Check:**

- ✗ `id` — MISSING
- ✗ `title` — MISSING (implied: "Site Information")
- ✗ `date` — MISSING
- ✗ `content_type` — MISSING
- ✗ `source` — MISSING
- ✗ `collection` — MISSING

**Individual Section Metadata:**

- ✗ Historical figures have `id` but no dates
- ✗ Sister sites have no `id` or `source_url` consistency
- ✗ Contact info has no `last_verified` date

**Missing Optional Fields:**

- ✗ `source_url` — MISSING (only internal contacts)
- ✗ `people_mentioned` — MISSING (historical figures exist but not indexed)
- ✗ `responds_to` — MISSING
- ✗ `responses` — MISSING
- ✗ `verification` — MISSING

**Critical Gap:** Contact information (phone, email, hours) has no verification date. This is operational data that changes frequently and needs audit trails.

---

### 4. enrollment.json

**Required Fields Check:**

- ✗ `id` — MISSING
- ✗ `title` — MISSING
- ✗ `date` — MISSING
- ✗ `content_type` — MISSING
- ✗ `source` — MISSING
- ✗ `collection` — MISSING

**Structure:** Minimal object with only three fields

**Missing Optional Fields:**

- ✗ `source_url` — MISSING
- ✗ `people_mentioned` — MISSING
- ✗ `responds_to` — MISSING
- ✗ `responses` — MISSING
- ✗ `verification` — MISSING

**Critical Issues:**

1. Only `currentEnrolled`, `totalSpots`, and `note` fields present
2. No metadata object at all
3. No timestamp of last update
4. No source attribution
5. Can't track historical changes or create audit trail

---

## Metadata Compliance Summary

| Field              | Type     | Required | Status           | Coverage                    |
| ------------------ | -------- | -------- | ---------------- | --------------------------- |
| `id`               | string   | YES      | MISSING          | 0/4 files                   |
| `title`            | string   | YES      | MISSING (mostly) | 1/4 files (partial)         |
| `date`             | ISO 8601 | YES      | MISSING          | 0/4 files (only item-level) |
| `content_type`     | enum     | YES      | MISSING          | 0/4 files                   |
| `source`           | string   | YES      | MISSING          | 0/4 files                   |
| `collection`       | string   | YES      | MISSING          | 0/4 files                   |
| `source_url`       | URL      | OPTIONAL | MISSING          | 0/4 files                   |
| `people_mentioned` | string[] | OPTIONAL | MISSING          | 0/4 files                   |
| `responds_to`      | string   | OPTIONAL | MISSING          | 0/4 files                   |
| `responses`        | string[] | OPTIONAL | MISSING          | 0/4 files                   |
| `verification`     | object   | OPTIONAL | MISSING          | 0/4 files                   |

**Total Compliance: 0%** (0 of 24 required/recommended fields implemented correctly)

---

## Cross-File Relationship Issues

### Issue 1: No People Indexing

**People referenced across files but not indexed:**

- **Speakers:** Dr. James P. Byrd, Lisa Bennett, Thomas Bachelor, Dr. Caroline H. Whitfield, David Doan, Dr. Daniel Redbird Wolfe
- **Historical Figures:** William Blount, Andrew Jackson, William Cobb
- **Staff/Contact:** rockymountmuseum@gmail.com (implied staff)

**Problem:** Speaker names are scattered throughout documents as strings in nested objects. No unified `people_mentioned` arrays exist.

**Impact:**

- Can't query "all events featuring Dr. James P. Byrd"
- Can't find "all documents mentioning William Blount"
- Dual-role interpreter (Lisa Bennett / Mary Patton) is invisible to searches

### Issue 2: No Bidirectional Relationships

**Cross-file references that exist but aren't explicitly linked:**

1. `events.json` event ID "lecture-byrd" should link to `lectures.json` lecture ID 1
2. `events.json` "Cherokee Heritage Weekend" and `lectures.json` "additionalProgramming" are the same event
3. Multiple homeschool days reference same FareHarbor ID but are separate event entries

**Problem:** No `responds_to` or `responses` fields to mark these relationships.

**Impact:**

- Can't trace "this event appears in both calendar and lecture series"
- No way to detect duplicate records across files
- Manual cross-reference required for content management

### Issue 3: No Source Attribution

**Data sources not tracked:**

- FareHarbor (ticketing system) — IDs present but not as `source_url`
- Internal staff/museum — No `source` field
- External websites — Sister site URLs not tracked as `source_url`
- Historical records — No `source` or `verification` tracking

**Problem:** No `source` field to track where data comes from or who maintains it.

**Impact:**

- Can't audit data quality or reliability
- Can't determine update frequency
- Can't contact data source when questions arise

---

## Verification Field Gaps

**Operational data without verification timestamps:**

### Contact Information (siteInfo.json)

- Phone: "(423) 538-7396" — Last verified: ???
- Email: "rockymountmuseum@gmail.com" — Last verified: ???
- Website: "https://rockymountmuseum.com" — Last verified: ???
- Hours: "Wed-Sat 10am-5pm" — Last verified: ???

### Event Pricing (events.json)

- All prices stored in cents (e.g., 1200 = $12.00) — Last verified: ???
- FareHarbor IDs — Last verified: ???
- Ticket URLs — Last verified for accuracy: ???

### Historical Facts (siteInfo.json)

- William Blount dates "1790–1796" — Source: ???
- Andrew Jackson "stayed six weeks" — Verified: ???
- William Cobb settled "c. 1770" — Source: ???

**Problem:** No verification object tracking last check date, source attribution, or data quality flags.

**Impact:**

- Can't detect when operational data becomes stale
- No audit trail for when information changed
- No way to know if contact info is still current
- Can't see data decay over time

---

## Files with Incomplete Metadata

### CRITICAL - All 4 Files Missing Required Fields

#### 1. `/data/events.json` (26 events + 5 recurring programs)

- **Missing:** id, title, date, content_type, source, collection (all file-level fields)
- **Impact:** Can't identify or track the file itself; no version control
- **Sample Content:** 26 individual events ranging from "Road to 250 Season Opening" to "Candlelight Christmas"
- **Severity:** HIGH — File is updated frequently and needs audit trail

#### 2. `/data/lectures.json` (5 lectures + additional programming)

- **Missing:** id (file-level), content_type, source, collection (all file-level fields)
- **Impact:** Can't identify or version the lecture series; no audit trail for speaker information
- **Sample Content:** 5 lectures with speaker bios (Dr. James P. Byrd, Lisa Bennett, Thomas Bachelor, Dr. Caroline H. Whitfield, David Doan)
- **Severity:** MEDIUM — Stable content but lacks linkage to events.json

#### 3. `/data/siteInfo.json` (operational data)

- **Missing:** id, title, date, content_type, source, collection (all file-level fields)
- **Impact:** Can't audit when operational data was last verified; critical for hours/contact that change
- **Sample Content:** Hours, contact info, admission prices, historical figures, sister sites
- **Severity:** CRITICAL — Contact/hours data is dynamic and changes frequently with no audit trail

#### 4. `/data/enrollment.json` (enrollment tracker)

- **Missing:** id, title, date, content_type, source, collection (all file-level fields)
- **Impact:** No audit trail for enrollment changes; can't track historical enrollment progression
- **Sample Content:** Only 3 fields: currentEnrolled (147), totalSpots (250), note (instructions)
- **Severity:** CRITICAL — Updated frequently during enrollment period with no change history

---

## Optional Fields Not Implemented

| Field              | Purpose                                                 | Why It Matters                        | Coverage  |
| ------------------ | ------------------------------------------------------- | ------------------------------------- | --------- |
| `source_url`       | Track external data origin (FareHarbor, websites, etc.) | Enables data quality audits           | 0/4 files |
| `people_mentioned` | Index all people referenced in document                 | Enables cross-file people searches    | 0/4 files |
| `responds_to`      | Mark relationships (lecture linked to event, etc.)      | Detects duplication and relationships | 0/4 files |
| `responses`        | Bidirectional linking back to referring documents       | Maintains referential integrity       | 0/4 files |
| `verification`     | Track verification dates and data sources               | Prevents stale data usage             | 0/4 files |

---

## Recommendations

### Priority 1: Add File-Level Metadata to All Files

All four files should wrap data in a metadata object:

```json
{
  "metadata": {
    "id": "unique-identifier",
    "title": "Display Title",
    "date": "2026-03-04",
    "content_type": "event_collection|lecture_series|site_information|enrollment_tracker",
    "source": "rockymountmuseum.com",
    "collection": "america250-2026",
    "lastUpdated": "2026-01-30T15:30:00Z",
    "version": "1.0.0",
    "maintainer": "email@rockymountmuseum.com"
  },
  "data": {
    /* existing content */
  }
}
```

### Priority 2: Extract and Index All People

Create `people_mentioned` arrays at file level:

```json
{
  "metadata": {
    /* ... */
  },
  "people_mentioned": ["Dr. James P. Byrd", "Lisa Bennett", "William Blount", "Andrew Jackson"],
  "data": {
    /* ... */
  }
}
```

### Priority 3: Add Cross-File Relationships

Mark events/lectures that appear in multiple files with `responds_to`/`responses`.

### Priority 4: Add Verification Fields

For operational data (hours, contact, pricing):

```json
{
  "phone": "(423) 538-7396",
  "verification": {
    "lastVerified": "2026-01-30T10:00:00Z",
    "verifiedBy": "staff@example.com",
    "source": "direct-contact|website|internal-record",
    "nextReviewDue": "2026-04-30"
  }
}
```

---

## Conclusion

**Metadata Compliance: 0%**

All four data files have **complete structural data integrity** but **zero formal metadata governance**. Files cannot currently be:

- Uniquely identified
- Versioned independently
- Traced to authoritative sources
- Verified for staleness
- Cross-referenced reliably
- Audited for changes

Implementing the recommended metadata structure would enable:

- Proper data governance and audit trails
- Change tracking for operational information
- Cross-file relationship management
- People indexing and search
- Source attribution and verification workflows
- Staleness detection for time-sensitive data

---

**Report Generated:** 2026-01-30
**Auditor:** Claude Code
**Next Review:** Recommend quarterly metadata audits during America 250 season
