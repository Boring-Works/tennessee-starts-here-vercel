# Source of Truth Hierarchy

**Quick Reference for Historical Content**

---

## The Four Levels

```
LEVEL 1: IMMUTABLE          /Historical/raw/           NEVER MODIFY
    ↓
LEVEL 2: VERIFIED           /Historical/processed/     SOURCE OF TRUTH
    ↓
LEVEL 3: WEBSITE SOURCE     /content/                  SYNC WITH LEVEL 2
    ↓
LEVEL 4: DISPLAY            /data/, /app/              AI CAN MODIFY
```

---

## Quick Rules

| Level | AI Can Edit?    | Human Review?        | Contains                        |
| ----- | --------------- | -------------------- | ------------------------------- |
| 1     | NO - Never      | N/A                  | Raw scans, original transcripts |
| 2     | Drafts only     | Always required      | Verified facts, source of truth |
| 3     | Formatting only | Required for facts   | Website markdown files          |
| 4     | Yes             | Standard code review | JSON, components, UI            |

---

## What Each Level Contains

### Level 1: `/Historical/raw/`

- PDF/image scans of original documents
- Transcriptions downloaded from archives
- `sources.json` - registry of all sources
- **IMMUTABLE after initial commit**

### Level 2: `/Historical/processed/`

- Clean, verified transcriptions (.txt)
- Verified person data (.json)
- `verification-log.md` - change history
- **THIS IS THE SOURCE OF TRUTH**

### Level 3: `/content/`

- `documents/` - Markdown for web display
- `people/` - Person bios for web
- `collections/` - Collection descriptions
- **Must not contradict Level 2**

### Level 4: `/data/`, `/app/`

- Timeline display configuration
- Navigation data
- React components
- **No historical claims here**

---

## When Editing Historical Content

### Scenario 1: Fixing a Typo in Website Display

```
1. Edit content/documents/[id].md
2. Commit: "[CONTENT] Fix typo in display text"
3. Standard review
```

### Scenario 2: Correcting a Historical Fact

```
1. FIRST update Historical/processed/[id].txt
2. Log change in verification-log.md
3. THEN update content/documents/[id].md
4. Commit: "[CONTENT] Correct date per Level 2 verification"
```

### Scenario 3: Changing Verification Status

```
1. HUMAN ONLY - no AI
2. Update Historical/processed/
3. Update content/ frontmatter
4. Commit: "[VERIFY] Changed status from X to Y - [reason]"
5. Director approval required
```

---

## AI Guardrails Summary

### AI CAN:

- Draft new transcriptions (human verifies)
- Format content for display
- Add citation blocks
- Update source URLs
- Create collection descriptions
- Modify Level 4 code/data

### AI CANNOT:

- Change verification status
- Edit verified transcription text
- Modify source_count
- Publish without human review
- Write verification notes
- Approve its own work

---

## File Location Guide

| I need to...         | Check Level | File Path                                    |
| -------------------- | ----------- | -------------------------------------------- |
| Verify a quote       | 2           | Historical/processed/documents/[id].txt      |
| See original source  | 1           | Historical/raw/transcripts/[source]/[id].txt |
| Edit website display | 3           | content/documents/[id].md                    |
| Check person facts   | 2           | Historical/processed/people/[id].json        |
| Update person bio    | 3           | content/people/[id].md                       |
| See what changed     | 2           | Historical/processed/verification-log.md     |

---

## Commit Message Prefixes

```
[CONTENT] - Website content changes (Level 3-4)
[VERIFY] - Verification status changes (Level 2, human only)
[SOURCE] - New source added (Level 1)
[MIGRATE] - Bulk migration work
```

---

## Full Documentation

| Document                         | Purpose             |
| -------------------------------- | ------------------- |
| `ARCHIVE-SCHEMA.md`              | Complete data model |
| `ARCHIVE-STANDARDS.md`           | Metadata formatting |
| `ARCHIVE-GOVERNANCE.md`          | Who can modify what |
| `ARCHIVE-DIRECTORY-STRUCTURE.md` | Where files live    |

---

_When in doubt: Level 2 is the source of truth. If Level 3 disagrees with Level 2, Level 2 wins._
