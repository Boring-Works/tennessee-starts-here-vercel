# Markdown Style Examples

Copy-paste ready examples of each style pattern used throughout Tennessee Starts Here.

---

## 1. PASSAGE TAGS (Recommended)

### Example: Historical Document Quote

```markdown
<passage id="glass-windows">
On the 11th instant, I arrived in this country, and was received with every mark
of attention and gladness that I could have wished. I am very well accommodated
with a Room with Glass Windows, Fireplace, etc., etc., at this place.
</passage>
```

### Guidelines

- ✅ Use kebab-case IDs (`glass-windows`, `treaty-location`, `capital-moved`)
- ✅ ID should describe the passage semantically
- ✅ Keep passages block-level (not inline)
- ✅ Can contain multiple sentences/paragraphs

### More Examples

```markdown
<passage id="cherokee-chiefs-visit">
The Principal Chiefs of the Cherokee Nation have appointed Commissioners to wait
on Congress...
</passage>

<passage id="territory-organization">
The territory is divided into counties and courts have been established...
</passage>

<passage id="treaty-concluded">
The treaty has been concluded successfully with all participating nations...
</passage>
```

---

## 2. BLOCKQUOTES

### ✅ CORRECT: Quote from Source

```markdown
> "Rocky Mount is where Tennessee's government began. The ground is the artifact.
> The house is the proof. Stand where they stood."
```

### ✅ CORRECT: Multi-line Quote

```markdown
> This letter, dated October 20, 1790, was written by William Blount to Henry Knox.
> Blount had been appointed Governor of the Southwest Territory and Superintendent
> of Indian Affairs by President George Washington.
```

### ✅ CORRECT: Cited Quote

```markdown
> "The presence of glass windows at Rocky Mount demonstrated the relative
> sophistication and prosperity of William Cobb's residence."
> — Tennessee Encyclopedia
```

### ⚠️ NON-STANDARD: Header Blockquote (Strategic Docs Only)

```markdown
> Director's Final Version | January 2026 | Version 5.0
>
> Strategic Messaging | Website Copy | Interpretive Scripts
```

**Note:** This pattern is used in BRAND-STRATEGY.md and COPY.md. It works but isn't standard. Consider using bold headers instead.

### ❌ AVOID: Blockquote for Instructions

```markdown
> NOTE: Always use ISO dates in YAML frontmatter
```

Better: Use bold header instead.

```markdown
**NOTE:** Always use ISO dates in YAML frontmatter
```

---

## 3. EMPHASIS FORMATTING

### **Bold** - For Key Terms

```markdown
**Rocky Mount** is where **Tennessee's government** began.

The **Southwest Territory** was established in **1790**.

**Key Details:**

- Established: 1770
- Location: **Piney Flats, Tennessee**
```

### **Bold** - For Feature Names

```markdown
The **Glass Windows** feature demonstrates frontier sophistication.

Use **FareHarbor** for ticket management.

Edit **lib/copy/brand.ts** for brand constants.
```

### **Bold** - In Tables

```markdown
| Element      | Value                           |
| ------------ | ------------------------------- |
| **Name**     | Rocky Mount State Historic Site |
| **Tagline**  | Tennessee Starts Here           |
| **Location** | **Piney Flats, Tennessee**      |
```

### **Bold** - For Callouts

```markdown
**CRITICAL:** This date must match the historical record.

**IMPORTANT:** Always run npm run validate:data before deploying.

**NOTE:** Glass windows were a luxury on the frontier.
```

### _Italic_ - For File References

```markdown
Edit the configuration in _lib/copy/brand.ts_.

See _docs/COPY.md_ for brand guidelines.

Run the script at _scripts/validate-data.ts_.
```

### _Italic_ - For Citations

```markdown
According to the _Tennessee Encyclopedia_, the glass windows indicate prosperity.

The _Blount Papers_ contain the original correspondence.

See the _Founders Online_ database for additional context.
```

### _Italic_ - For Subtle Emphasis

```markdown
This is _particularly_ important for historical accuracy.

The feature may _eventually_ be added in v2.

_Optional_: Add custom ticket URLs for specific events.
```

### _Italic_ - For Asides

```markdown
The settlement was established in _what is now_ Piney Flats, Tennessee.

Blount served as governor from _1790 to 1796_.

This pattern is _not_ currently in use.
```

---

## 4. LIST FORMATTING

### ✅ Numbered Lists (Steps/Procedures)

````markdown
## Setup Instructions

1. Install dependencies
   ```bash
   npm install
   ```
````

2. Configure environment variables

   ```bash
   cp .env.example .env.local
   ```

3. Run the development server

   ```bash
   npm run dev
   ```

4. Open your browser to localhost:3000

5. Verify all pages load correctly

````

### ✅ Bullet Lists (Items/Features)

```markdown
## Key Features

- **Historical documents** with full source citations
- **Interactive timeline** showing events in chronological order
- **People profiles** with biographical information
- **Evidence room** with archival materials
- **Mobile-responsive** design for on-site visitors
````

### ✅ Mixed Lists in Same Document

```markdown
## Implementation Plan

### Setup Phase

1. Create database tables
2. Import historical data
3. Verify data integrity

### Features to Build

- Homepage hero section
- Events calendar
- People directory
- Search functionality

### Testing

1. Unit tests for business logic
2. Integration tests for API routes
3. E2E tests for user journeys

### Deployment Checklist

- [ ] Code review completed
- [ ] All tests passing
- [ ] Performance audit passed
- [ ] Accessibility check passed
- [ ] Analytics configured
```

### Nested Lists

```markdown
## Navigation Structure

- Main Menu
  - Home
  - Visit
    - Hours & Admission
    - Directions
  - Events
    - Calendar
    - Lectures
  - Shop

- Footer Links
  - Contact
  - Privacy
  - Terms
```

---

## 5. DATE FORMATTING

### ✅ In YAML Frontmatter (ISO)

```markdown
---
id: blount-arrival-1790
title: 'Blount to Secretary of War'
date: 1790-10-20
content_type: letter
source: 'Tennessee Encyclopedia'
---
```

**Format:** `YYYY-MM-DD` (machine-readable, sortable)

### ✅ In Narrative Text (US_LONG)

```markdown
This letter, dated October 20, 1790, was written by William Blount to Henry Knox.

The arrival date was October 11, 1790 (the "11th instant" referenced in the letter).

Blount served as governor from 1790 to 1794.
```

**Format:** `Month DD, YYYY` (human-readable)

### ✅ In Metadata Tables (Either)

```markdown
| Date             | Event                     |
| ---------------- | ------------------------- |
| 1790-10-20       | Blount's Arrival          |
| October 11, 1790 | Rocky Mount Accommodation |
| 1791-07-02       | Treaty Signed             |
```

**Note:** ISO is preferred for machines, but US_LONG works for display.

### ✅ Period-Appropriate (Narrative)

```markdown
On the 11th instant, I arrived in this country...
(This preserves the original language from the 1790 letter)

The chiefs assembled in the spring of 1791...
(Period-appropriate phrasing)
```

### Summary

```
Context          | Format        | Example
─────────────────|───────────────|────────────────────
YAML frontmatter | ISO           | date: 1790-10-20
Body text        | US_LONG       | October 20, 1790
Tables (dates)   | Either        | 1790-10-20 or October 20, 1790
Original quotes  | Period-style  | "the 11th instant"
```

---

## 6. SECTION BREAKS

### ✅ Explicit Section Breaks

```markdown
# Main Title

## Section One

Content here...

---

## Section Two

Content here...

---

## Section Three

Content here...
```

### ✅ Heading-Only Structure (Preferred)

```markdown
# Main Title

## Section One

Content here...

## Section Two

Content here...

## Section Three

Content here...
```

**Cleaner and more readable.**

### ✅ With YAML Frontmatter

```markdown
---
id: document-id
title: Document Title
date: 1790-10-20
---

## Section One

Content...

---

## Section Two

Content...
```

### Don't Use

```markdown
\*\*\* (Use --- instead if needed)
\_\_\_ (Use --- instead if needed)
=== (Use # instead for headings)
```

---

## 7. HEADING HIERARCHY

### ✅ Correct Structure

```markdown
# Rocky Mount State Historic Site

## The Ground Endures

### Historical Significance

The ground beneath Rocky Mount...

### Modern Visitors

Today's visitors walk on...

## Interpretive Framework

### Three Tiers of Meaning

1. First tier
2. Second tier
3. Third tier

### Implementation

How to present this framework...

## Resources

### Citations

Complete citation list...

### Further Reading

Recommended sources...
```

### Don't Use H4 or Deeper

```markdown
# Title

## Section

### Subsection

#### Don't go deeper ❌
```

**Instead:**

```markdown
# Title

## Section

### Subsection

**Use bold for further emphasis** ✅
```

---

## 8. CODE BLOCKS

### ✅ With Language Tag

```typescript
import { HOOKS, BUTTONS } from '@/lib/copy'

export function HomePage() {
  return (
    <div>
      <h1>{HOOKS.primaryCTA}</h1>
      <button>{BUTTONS.primary}</button>
    </div>
  )
}
```

### ✅ Bash/Shell

```bash
npm run lint
npm run build
npm run validate:data
```

### ✅ JSON

```json
{
  "id": "revolutionary-war",
  "title": "Revolutionary War",
  "date": "1775-1783",
  "category": "era"
}
```

### ✅ Python

```python
import json

def validate_dates(data):
    """Validate date format in JSON data."""
    for item in data:
        assert 'date' in item
        assert len(item['date']) == 10
```

### ✅ Diff Format (For Changes)

```diff
  import { getTicketUrl } from '@/lib/data'

- const url = event.ticketUrl
+ const url = getTicketUrl(event)

  return <a href={url}>Book Now</a>
```

### ❌ Avoid: Code Without Language Tag

````markdown
```
Some code here
```
````

**Better:**

````markdown
```typescript
// Your code here
```
````

---

## 9. TABLES

### ✅ Simple Table

```markdown
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Value A  | Value B  | Value C  |
| Value D  | Value E  | Value F  |
```

### ✅ Table with Alignment

```markdown
| Left | Center | Right |
| :--- | :----: | ----: |
| L1   |   C1   |    R1 |
| L2   |   C2   |    R2 |
```

### ✅ Table with Bold/Italic

```markdown
| **Element**     | _Value_         | Description         |
| --------------- | --------------- | ------------------- |
| **Name**        | Rocky Mount     | Historic site       |
| **Established** | _1770_          | Original settlement |
| **Location**    | **Piney Flats** | East Tennessee      |
```

### ✅ Complex Table

```markdown
| Event                | Date             | Location      | Source                   |
| -------------------- | ---------------- | ------------- | ------------------------ |
| Blount's Arrival     | October 20, 1790 | Rocky Mount   | _Blount Papers_          |
| Treaty Signed        | July 2, 1791     | Holston River | _Tennessee Encyclopedia_ |
| Gazette Announcement | November 5, 1791 | Knoxville     | _Knoxville Gazette_      |
```

---

## 10. COMPLETE DOCUMENT EXAMPLES

### Example 1: Historical Document

```markdown
---
id: blount-arrival-1790
title: 'Blount to Secretary of War'
date: 1790-10-20
content_type: letter
source: 'Tennessee Encyclopedia, citing Blount Papers'
collection: blount-papers
author: william-blount
recipient: henry-knox
---

At William Cobb's Washington County...

<passage id="glass-windows">
On the 11th instant, I arrived in this country, and was received with every mark
of attention and gladness that I could have wished. I am very well accommodated
with a Room with Glass Windows, Fireplace, etc., etc., at this place.
</passage>

---

## Historical Context

This letter, dated October 20, 1790, was written by William Blount to Henry Knox,
the **Secretary of War**, shortly after Blount's arrival in the Southwest Territory.

### Key Details

- **Written from:** Rocky Mount, the home of William Cobb
- **Arrival date:** October 11, 1790 (the "11th instant")
- **Location:** Near the fork of the Holston and Watauga Rivers

### Significance

The mention of **Glass Windows** is notable because glass windows were a status
symbol on the frontier. Most frontier cabins had only wooden shutters or oiled
paper for window coverings.

---

## Source Notes

This letter is cited in the _Tennessee Encyclopedia_ article on Rocky Mount...
```

### Example 2: Technical Documentation

````markdown
# Data Validation System

> Master documentation for JSON schema validation

---

## Overview

The project validates all JSON data files against schemas defined in this guide.

### Files Validated

1. `data/events.json`
2. `data/lectures.json`
3. `data/siteInfo.json`

---

## Validation Rules

### Events

Each event must include:

- **id** — Unique identifier (kebab-case)
- **title** — Event name
- **date** — Event date (`YYYY-MM-DD`)
- **type** — Event type (workshop, tour, etc.)
- **requiresTicket** — Boolean

### Example

```json
{
  "id": "revolutionary-tour",
  "title": "Revolutionary War Tour",
  "date": "2026-04-15",
  "type": "tour",
  "requiresTicket": true
}
```
````

---

## Running Validation

```bash
npm run validate:data
```

Expected output:

```
✓ events.json validated
✓ lectures.json validated
✓ siteInfo.json validated
All data valid!
```

---

## Common Errors

| Error             | Cause            | Fix            |
| ----------------- | ---------------- | -------------- |
| **Date format**   | Not `YYYY-MM-DD` | Use ISO format |
| **Missing field** | Field omitted    | Check schema   |
| **Invalid type**  | Wrong data type  | Verify types   |

---

## See Also

- **Data Standards:** `docs/DATA-STANDARDS.md`
- **Copy Constants:** `lib/copy/`
- **Validation Script:** `scripts/validate-data.ts`

````

---

## Quick Copy-Paste Templates

### Document Header (with Frontmatter)

```markdown
---
id: document-id
title: 'Document Title'
date: YYYY-MM-DD
source: 'Source Name'
---

# Main Heading

## Section One

Content here...

---

## Section Two

Content here...
````

### Blog Post Template

```markdown
# Article Title

## Introduction

Hook and context...

## Main Points

- Point one
- Point two
- Point three

## Conclusion

Summary...

### Further Reading

- Link one
- Link two
```

### Specification Template

````markdown
# Feature Name

## Overview

What this feature does...

## Requirements

- Requirement 1
- Requirement 2
- Requirement 3

## Implementation

### Step 1: Setup

1. First step
2. Second step

### Step 2: Configure

Edit the file:

```typescript
// Code example
```
````

### Step 3: Test

```bash
npm run test
```

## See Also

- Related spec 1
- Related spec 2

```

---

*Examples compiled: January 30, 2026*
```
