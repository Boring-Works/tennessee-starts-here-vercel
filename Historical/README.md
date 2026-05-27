# Historical Archive

**Rocky Mount Digital Archive - Source of Truth**

---

## What This Directory Contains

This is the authoritative archive for all historical source materials used in the Tennessee Starts Here website. It implements a two-level system:

### Level 1: `/raw/` - Immutable Sources

Original files exactly as received from external archives.

**Contents:**

- `scans/` - PDF/image scans of physical documents
- `transcripts/` - Transcription files from Founders Online, Avalon Project, etc.
- `sources.json` - Registry of all source materials with provenance

**Rules:**

- NEVER modify files after initial commit
- Delete only with Director approval
- All files must have sources.json entry

### Level 2: `/processed/` - Verified Content

Clean, verified versions ready for website use.

**Contents:**

- `documents/` - Verified document transcriptions (.txt)
- `people/` - Verified biographical data (.json)
- `verification-log.md` - Change history for all modifications

**Rules:**

- Human verification required before adding
- All changes logged in verification-log.md
- This is the source of truth for historical facts

---

## How This Relates to Website Content

```
Level 1 (raw/)
    ↓ Human verifies accuracy
Level 2 (processed/)
    ↓ Add formatting, citations
Level 3 (/content/)
    ↓ Build website
Level 4 (/app/, /data/)
```

The website content in `/content/documents/` and `/content/people/` must not contradict what's in `/Historical/processed/`.

---

## Adding New Sources

1. Download original from external archive
2. Save to `raw/transcripts/[source-name]/[id].txt`
3. Add entry to `raw/sources.json`
4. Verify accuracy against original
5. Create `processed/documents/[id].txt`
6. Log in `processed/verification-log.md`
7. Then create/update `/content/documents/[id].md`

---

## Documentation

| Document                               | Purpose              |
| -------------------------------------- | -------------------- |
| `/docs/SOURCE-OF-TRUTH-HIERARCHY.md`   | Quick reference      |
| `/docs/ARCHIVE-SCHEMA.md`              | Complete data model  |
| `/docs/ARCHIVE-STANDARDS.md`           | Formatting standards |
| `/docs/ARCHIVE-GOVERNANCE.md`          | Who can modify what  |
| `/docs/ARCHIVE-DIRECTORY-STRUCTURE.md` | Detailed structure   |

---

## Contact

For archive inquiries: rockymountmuseum@gmail.com

Archive Director: Cody Boring, Executive Director
Rocky Mount State Historic Site
