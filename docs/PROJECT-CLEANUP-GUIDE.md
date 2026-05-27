# TNRocky Project Cleanup Guide
## For Claude Code Execution
### January 2026

---

## Overview

This guide reorganizes the TNRocky project folder to eliminate confusion and consolidate documentation. The main production app (`tennessee-starts-here`) is **NOT modified** except for adding documentation files.

**Project Root:** `/Users/codyboring/CodyML/projects/TNRocky`

---

## Current Structure (Before)

```
/TNRocky/
├── tennessee-starts-here/           ← PRODUCTION (keep as-is)
├── TN250v2/v2/                      ← Stale prototype → archive
├── sample projects/                  ← Reference designs → rename
│   ├── copy-of-rocky-mount-...      
│   └── rocky-mount---web--...       
├── Weather/                          ← Almanac specs → move to docs
├── Weather2/                         ← Blank boilerplate → DELETE
├── Build Files/                      ← Empty → DELETE
└── _delete/                          ← Trash → DELETE
```

---

## Target Structure (After)

```
/TNRocky/
├── tennessee-starts-here/           ← PRODUCTION (unchanged except docs)
│   └── docs/
│       └── almanac-specs/           ← NEW: moved from Weather/
├── _reference/                       ← NEW: design references
│   ├── sample-a-nav/                ← Renamed
│   └── sample-b-seal/               ← Renamed
└── _archive/                         ← NEW: historical versions
    └── tn250-premium-prototype/     ← Moved from TN250v2
```

---

## Safety Rules

1. **NEVER delete or modify files inside `tennessee-starts-here/` except:**
   - Creating new folder: `docs/almanac-specs/`
   - Copying files INTO that folder

2. **NEVER delete the sample projects** — only rename/move them

3. **NEVER delete TN250v2** — only move it to archive

4. **Only DELETE these folders (confirmed empty/trash):**
   - `Weather2/` (blank Next.js boilerplate)
   - `Build Files/` (empty except .claude)
   - `_delete/` (explicitly marked as trash)

---

## Step-by-Step Commands

### Phase 1: Create New Directory Structure

```bash
cd /Users/codyboring/CodyML/projects/TNRocky

# Create archive folder
mkdir -p _archive

# Create reference folder
mkdir -p _reference

# Create almanac-specs folder in production docs
mkdir -p tennessee-starts-here/docs/almanac-specs
```

### Phase 2: Move Almanac Specs to Production Docs

```bash
cd /Users/codyboring/CodyML/projects/TNRocky

# Copy Weather spec files to production docs (not move, copy first for safety)
cp Weather/rocky-mount-almanac-build-spec.md tennessee-starts-here/docs/almanac-specs/
cp Weather/rocky-mount-almanac-location-addendum.md tennessee-starts-here/docs/almanac-specs/
cp Weather/rocky-mount-almanac-supplement.md tennessee-starts-here/docs/almanac-specs/

# Verify files copied successfully
ls -la tennessee-starts-here/docs/almanac-specs/
```

### Phase 3: Archive TN250v2 Prototype

```bash
cd /Users/codyboring/CodyML/projects/TNRocky

# Move TN250v2 to archive with descriptive name
mv TN250v2 _archive/tn250-premium-prototype

# Verify
ls -la _archive/
```

### Phase 4: Rename Sample Projects

```bash
cd /Users/codyboring/CodyML/projects/TNRocky

# Move and rename sample projects
mv "sample projects/copy-of-rocky-mount---tennessee-starts-here (1)" _reference/sample-a-nav
mv "sample projects/rocky-mount---web--tennessee-starts-here---react (1)" _reference/sample-b-seal

# Remove empty sample projects folder
rmdir "sample projects"

# Verify
ls -la _reference/
```

### Phase 5: Delete Trash Folders

```bash
cd /Users/codyboring/CodyML/projects/TNRocky

# Delete blank Next.js boilerplate (Weather2)
rm -rf Weather2

# Delete empty Build Files folder
rm -rf "Build Files"

# Delete explicitly marked trash folder
rm -rf _delete

# Delete Weather folder (specs already copied)
rm -rf Weather
```

### Phase 6: Verify Final Structure

```bash
cd /Users/codyboring/CodyML/projects/TNRocky

# List top-level structure
ls -la

# Should show:
# tennessee-starts-here/
# _reference/
# _archive/

# Verify production docs
ls -la tennessee-starts-here/docs/almanac-specs/

# Verify reference projects
ls -la _reference/

# Verify archive
ls -la _archive/
```

---

## Verification Checklist

After running the cleanup, verify:

- [ ] `tennessee-starts-here/` still builds: `cd tennessee-starts-here && npm run build`
- [ ] `tennessee-starts-here/docs/almanac-specs/` contains 3 markdown files
- [ ] `_reference/sample-a-nav/` exists with Navigation.tsx
- [ ] `_reference/sample-b-seal/` exists with Navigation.tsx
- [ ] `_archive/tn250-premium-prototype/` exists with v2/ subfolder
- [ ] `Weather2/` is deleted
- [ ] `Build Files/` is deleted
- [ ] `_delete/` is deleted
- [ ] `Weather/` is deleted
- [ ] `sample projects/` is deleted

---

## Rollback (If Needed)

If something goes wrong, the only permanent deletions are:
- `Weather2/` — was blank boilerplate, can recreate with `npx create-next-app`
- `Build Files/` — was empty
- `_delete/` — was explicitly trash
- `Weather/` — specs were copied first, can restore from `tennessee-starts-here/docs/almanac-specs/`

All other operations are moves/renames and can be reversed.

---

## Files Being Preserved

### Almanac Specs (Moving to Production Docs)
- `rocky-mount-almanac-build-spec.md`
- `rocky-mount-almanac-location-addendum.md`
- `rocky-mount-almanac-supplement.md`

### Reference Projects (Renaming)
- Sample A: Navigation you liked (two-line logo, tricolor stripe)
- Sample B: Larger SVG seal implementation

### Archived Prototype (Moving)
- TN250v2: Premium interactive prototype with custom cursor, sound, compass

---

**End of Cleanup Guide**
