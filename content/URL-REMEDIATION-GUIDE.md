# URL Remediation Guide

**How to Fix the Issues Found in Evidence Room**

---

## Overview

This guide walks through fixing the 18 documents with URL issues (3 broken, 15 missing).

---

## Part 1: Fix Broken URLs (3 documents)

### Issue 1: treaty-holston-additional-1792 (404 Not Found)

**Current URL:** `https://avalon.law.yale.edu/18th_century/chr1792.asp`
**Status:** Dead link - document has moved or been removed

**Solution Options:**

**Option A (Recommended):** Use DigiTreaties (like treaty-holston-1791)

```yaml
source_url: https://digitreaties.org/treaties/treaty/88697242/
```

Then search DigiTreaties for the specific treaty to verify the exact ID.

**Option B:** Find correct Avalon Project URL

```bash
# Visit https://avalon.law.yale.edu/18th_century/
# Search for "Treaty of Holston" or "Cherokee"
# Use the correct link found there
```

**Option C:** Use Library of Congress

```yaml
source_url: https://memory.loc.gov/ammem/amlaw/
```

**Recommended:** Option A - use DigiTreaties for consistency with treaty-holston-1791

---

### Issue 2: jackson-at-rocky-mount-1788 (403 Forbidden)

**Current URL:** `https://tennesseeencyclopedia.net/entries/rocky-mount/`
**Status:** Server rejecting automated access (likely bot protection)

**Solution Options:**

**Option A (Recommended):** Update to Tennessee Encyclopedia homepage

```yaml
source_url: https://tennesseeencyclopedia.net/
```

**Option B:** Try academic mirror

```yaml
source_url: https://www.lib.utk.edu/ # Check UT Knoxville Digital Collections
```

**Option C:** Use Internet Archive Wayback Machine

```yaml
source_url: https://web.archive.org/web/*/tennesseeencyclopedia.net/entries/rocky-mount/
```

**Recommended:** Option A - simple and always accessible

---

### Issue 3: knoxville-gazette-1791-11-05 (403 Forbidden)

**Current URL:** `https://tennesseeencyclopedia.net/entries/knoxville-gazette/`
**Status:** Server rejecting automated access (same as Issue 2)

**Solution Options:**

**Option A (Recommended):** Update to Tennessee Encyclopedia homepage

```yaml
source_url: https://tennesseeencyclopedia.net/
```

**Option B:** Try Library of Congress Chronicling America

```bash
# Search https://chroniclingamerica.loc.gov/ for "Knoxville Gazette"
# Use specific issue URL if found
source_url: https://chroniclingamerica.loc.gov/lccn/XXXXX/
```

**Option C:** University of Tennessee Digital Collections

```yaml
source_url: https://dlc.lib.utk.edu/ # Check for Knoxville Gazette holdings
```

**Recommended:** Option A for now, then investigate Option B for more specific links

---

## Part 2: Add Missing Source URLs (15 documents)

### Group 1: Knoxville Gazette Entries (14 documents)

These documents are missing BOTH `source` and `source_url` fields:

- knoxville-gazette-1791-11-12
- knoxville-gazette-1791-12-03
- knoxville-gazette-1792-01-07
- knoxville-gazette-1792-02-25
- knoxville-gazette-1792-04-14
- knoxville-gazette-1792-07-07
- knoxville-gazette-1792-10-06
- knoxville-gazette-1793-03-16
- knoxville-gazette-1793-08-24
- knoxville-gazette-1794-06-07
- knoxville-gazette-1795-02-14
- knoxville-gazette-1796-01-17
- knoxville-gazette-1796-06-06

**For each, add to YAML frontmatter:**

```yaml
source: 'Knoxville Gazette'
source_url: https://tennesseeencyclopedia.net/entries/knoxville-gazette/
```

OR (if using Chronicling America):

```yaml
source: 'Knoxville Gazette - Library of Congress'
source_url: https://chroniclingamerica.loc.gov/lccn/XXXXX/
```

**Note:** You'll need to find the actual Chronicling America LCCN (Library of Congress Control Number) for the Knoxville Gazette. The format would be something like `sn84024165` for Tennessee newspapers.

**How to find it:**

1. Visit https://chroniclingamerica.loc.gov/
2. Search for "Knoxville Gazette"
3. Click on the title to see all issues
4. Note the LCCN in the URL (e.g., `/lccn/sn12345678/`)
5. Use that in your source URLs

---

### Group 2: Single Missing URL

**blount-arrival-1790**

Current frontmatter has:

```yaml
source: Tennessee Encyclopedia, citing Blount Papers
```

Add:

```yaml
source_url: https://tennesseeencyclopedia.net/entries/rocky-mount/
```

OR (for more specificity, if the Blount Papers are digitized):

```yaml
source_url: https://memory.loc.gov/ammem/amlaw/lwsp.html
```

---

### Group 3: Single Missing URL

**rocky-mount-inventory-1791**

Current frontmatter has:

```yaml
source: Sullivan County Records
```

Suggested source URLs:

**Option A:** Sullivan County Historical Society

```yaml
source_url: https://www.sullivancountyhistory.org/
```

**Option B:** Tennessee State Library and Archives

```yaml
source_url: https://www.sos.tn.gov/tsla/
```

**Option C:** University of Tennessee Special Collections

```yaml
source_url: https://dlc.lib.utk.edu/
```

**Recommended:** Research which repository actually holds these records and use that URL.

---

## Part 3: Batch Editing Instructions

### Using a Text Editor

For each document that needs URL additions:

1. **Open** the file in your editor
2. **Find** the `source:` line in the YAML frontmatter
3. **Add** a `source_url:` line right after it
4. **Save** the file

Example before:

```yaml
---
id: knoxville-gazette-1791-11-12
title: Knoxville Gazette - November 12, 1791
source: Knoxville Gazette
---
```

Example after:

```yaml
---
id: knoxville-gazette-1791-11-12
title: Knoxville Gazette - November 12, 1791
source: Knoxville Gazette
source_url: https://tennesseeencyclopedia.net/entries/knoxville-gazette/
---
```

### Using Command Line (for batch operations)

For 14 identical Knoxville Gazette entries:

```bash
# Add source field if missing (example for one file)
sed -i '' '/^source: /a\
source_url: https://tennesseeencyclopedia.net/entries/knoxville-gazette/' knoxville-gazette-1791-11-12.md
```

(Requires careful testing before running on all files)

---

## Part 4: Verification After Fixes

Once you've updated URLs, test them:

```bash
# Quick check with curl
curl -I https://tennesseeencyclopedia.net/

# Or use Python
python3 -c "
import requests
urls = ['https://tennesseeencyclopedia.net/', 'https://digitreaties.org/']
for url in urls:
    try:
        r = requests.head(url, timeout=5)
        print(f'{r.status_code}: {url}')
    except Exception as e:
        print(f'ERROR: {url}')
"
```

---

## Priority Checklist

- [ ] **URGENT:** Fix 3 broken URLs (Part 1)
- [ ] **HIGH:** Add 14 Knoxville Gazette URLs (Part 2, Group 1)
- [ ] **HIGH:** Add 1 blount-arrival URL (Part 2, Group 2)
- [ ] **MEDIUM:** Add 1 rocky-mount-inventory URL (Part 2, Group 3)
- [ ] **AFTER:** Run verification tests (Part 4)
- [ ] **AFTER:** Update URL-VERIFICATION-CHECKLIST.md with new status

---

## Recommended Timeline

| Phase     | Tasks                                  | Est. Time     |
| --------- | -------------------------------------- | ------------- |
| 1         | Research optimal URLs for broken links | 1 hour        |
| 2         | Fix 3 broken URLs + test               | 30 min        |
| 3         | Add 14 Knoxville Gazette URLs          | 1 hour        |
| 4         | Add 2 remaining URLs                   | 30 min        |
| 5         | Final verification and reporting       | 30 min        |
| **TOTAL** |                                        | **3.5 hours** |

---

## Questions & Research Needed

Before proceeding, investigate:

1. **Knoxville Gazette LCCN:** What's the Library of Congress control number?
   - Check: https://chroniclingamerica.loc.gov/

2. **Sullivan County Records:** Which repository holds the Rocky Mount inventory?
   - Check: Sullivan County Historical Society, UT Special Collections, TN State Library

3. **Treaty of Holston Alternative:** Verify DigiTreaties has the 1792 additional treaty
   - Check: https://digitreaties.org/

---

_Prepared by: URL Checker Team #1_
_Date: January 30, 2026_
