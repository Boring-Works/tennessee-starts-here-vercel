# URL Verification Checklist - Evidence Room Documents

**Generated:** January 30, 2026
**Total Documents:** 38
**Documents with source_url:** 23
**Documents without source_url:** 15

---

## Summary

Out of 38 documents in the Evidence Room:

- **23 documents** have a `source_url` field in their frontmatter
- **15 documents** are missing a `source_url` field (need to be added)
- **3 URLs** have accessibility issues (403 Forbidden, 404 Not Found)

---

## Documents WITH source_url (23 total)

### ✅ Working URLs

#### Library of Congress - American State Papers

| Doc ID                       | Source URL                                   | Status | Notes                            |
| ---------------------------- | -------------------------------------------- | ------ | -------------------------------- |
| blount-commission-1790       | https://memory.loc.gov/ammem/amlaw/lwsp.html | OK     | American State Papers collection |
| blount-to-knox-1790-11       | https://memory.loc.gov/ammem/amlaw/lwsp.html | OK     | American State Papers collection |
| blount-to-knox-1790-12       | https://memory.loc.gov/ammem/amlaw/lwsp.html | OK     | American State Papers collection |
| blount-to-knox-1791-01       | https://memory.loc.gov/ammem/amlaw/lwsp.html | OK     | American State Papers collection |
| blount-to-knox-1791-03       | https://memory.loc.gov/ammem/amlaw/lwsp.html | OK     | American State Papers collection |
| blount-to-knox-1791-06       | https://memory.loc.gov/ammem/amlaw/lwsp.html | OK     | American State Papers collection |
| blount-to-knox-1791-07       | https://memory.loc.gov/ammem/amlaw/lwsp.html | OK     | American State Papers collection |
| blount-to-knox-1791-09       | https://memory.loc.gov/ammem/amlaw/lwsp.html | OK     | American State Papers collection |
| blount-to-knox-1791-11       | https://memory.loc.gov/ammem/amlaw/lwsp.html | OK     | American State Papers collection |
| knox-to-blount-1791-04       | https://memory.loc.gov/ammem/amlaw/lwsp.html | OK     | American State Papers collection |
| southwest-territory-act-1790 | https://memory.loc.gov/ammem/amlaw/lwsl.html | OK     | American State Papers - Laws     |

#### Library of Congress - Maps

| Doc ID           | Source URL                | Status | Notes         |
| ---------------- | ------------------------- | ------ | ------------- |
| bradley-map-1796 | https://www.loc.gov/maps/ | OK     | Maps homepage |

#### Founders Online (National Archives)

| Doc ID                           | Source URL                                                       | Status | Notes                               |
| -------------------------------- | ---------------------------------------------------------------- | ------ | ----------------------------------- |
| knox-to-washington-1790-08       | https://founders.archives.gov/documents/Washington/05-06-02-0148 | OK     | Washington Papers, Series 5, Vol. 6 |
| jefferson-to-blount-1791-08      | https://founders.archives.gov/                                   | OK     | Founders Online homepage            |
| washington-proclamation-1791     | https://founders.archives.gov/documents/Washington/05-09-02-0100 | OK     | Washington Papers, Series 5, Vol. 9 |
| washington-to-blount-1790-06     | https://founders.archives.gov/documents/Washington/05-05-02-0290 | OK     | Washington Papers, Series 5, Vol. 5 |
| washington-to-knox-1790-08       | https://founders.archives.gov/documents/Washington/05-06-02-0135 | OK     | Washington Papers, Series 5, Vol. 6 |
| washington-to-senate-1790-06     | https://founders.archives.gov/documents/Washington/05-05-02-0258 | OK     | Washington Papers, Series 5, Vol. 5 |
| williamson-to-washington-1790-05 | https://founders.archives.gov/documents/Washington/05-05-02-0277 | OK     | Washington Papers, Series 5, Vol. 5 |

#### Treaty & Legal Documents

| Doc ID              | Source URL                                         | Status | Notes                   |
| ------------------- | -------------------------------------------------- | ------ | ----------------------- |
| treaty-holston-1791 | https://digitreaties.org/treaties/treaty/88697242/ | OK     | DigiTreaties collection |

### ⚠️ Problematic URLs

#### 403 Forbidden (Server Blocking)

| Doc ID                       | Source URL                                                   | Status | Issue                     | Recommendation                                                           |
| ---------------------------- | ------------------------------------------------------------ | ------ | ------------------------- | ------------------------------------------------------------------------ |
| jackson-at-rocky-mount-1788  | https://tennesseeencyclopedia.net/entries/rocky-mount/       | 403    | Server rejecting requests | Consider updating to general Tennessee Encyclopedia URL or adding mirror |
| knoxville-gazette-1791-11-05 | https://tennesseeencyclopedia.net/entries/knoxville-gazette/ | 403    | Server rejecting requests | Consider updating to general Tennessee Encyclopedia URL or adding mirror |

#### 404 Not Found (Dead Link)

| Doc ID                         | Source URL                                           | Status | Issue                              | Recommendation                                             |
| ------------------------------ | ---------------------------------------------------- | ------ | ---------------------------------- | ---------------------------------------------------------- |
| treaty-holston-additional-1792 | https://avalon.law.yale.edu/18th_century/chr1792.asp | 404    | Document has been moved or removed | Search Avalon Project for correct link or use DigiTreaties |

---

## Documents WITHOUT source_url (15 total)

These documents need `source_url` values added to their YAML frontmatter:

| Doc ID                       | Current Source Field                         | Action Required               |
| ---------------------------- | -------------------------------------------- | ----------------------------- |
| blount-arrival-1790          | Tennessee Encyclopedia, citing Blount Papers | Add source_url                |
| knoxville-gazette-1791-11-12 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1791-12-03 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1792-01-07 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1792-02-25 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1792-04-14 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1792-07-07 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1792-10-06 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1793-03-16 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1793-08-24 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1794-06-07 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1795-02-14 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1796-01-17 | (missing source field)                       | Add source field & source_url |
| knoxville-gazette-1796-06-06 | (missing source field)                       | Add source field & source_url |
| rocky-mount-inventory-1791   | Sullivan County Records                      | Add source_url                |

---

## Recommendations

### Priority 1: Fix Broken Links (3 documents)

1. **treaty-holston-additional-1792** (404 Not Found)
   - Current: `https://avalon.law.yale.edu/18th_century/chr1792.asp`
   - Solution: Replace with DigiTreaties URL or find alternative Avalon Project URL
   - Suggested: `https://digitreaties.org/` (similar to treaty-holston-1791)

2. **jackson-at-rocky-mount-1788** (403 Forbidden)
   - Current: `https://tennesseeencyclopedia.net/entries/rocky-mount/`
   - Solution: Update to general Tennessee Encyclopedia homepage or add direct archive link
   - Suggested: `https://tennesseeencyclopedia.net/`

3. **knoxville-gazette-1791-11-05** (403 Forbidden)
   - Current: `https://tennesseeencyclopedia.net/entries/knoxville-gazette/`
   - Solution: Same as above
   - Suggested: `https://tennesseeencyclopedia.net/`

### Priority 2: Add Missing URLs (15 documents)

Most critical: The 14 Knoxville Gazette entries are missing both `source` and `source_url` fields. These should link to:

- Tennessee Encyclopedia Knoxville Gazette entry, OR
- Library of Congress Chronicling America (if digitized), OR
- University of Tennessee digital collections

Investigate and add source URLs for all 14 gazette documents.

### Priority 3: Verify URL Accessibility

All working URLs should be periodically tested (quarterly recommended) to catch:

- Site migrations
- URL structure changes
- Server access issues
- Broken redirects

---

## Testing Results (January 30, 2026)

### Test Method

- HTTP HEAD requests with 5-second timeout
- Followed redirects
- Reported HTTP status codes

### Summary of Results

| Status        | Count | Details                                          |
| ------------- | ----- | ------------------------------------------------ |
| 200 OK        | 19    | All working properly                             |
| 403 Forbidden | 2     | Tennessee Encyclopedia blocking automated access |
| 404 Not Found | 1     | Avalon Project link moved/deleted                |
| No URL        | 15    | Missing source_url field entirely                |

---

## Next Steps for Team

1. **Immediate:** Fix the 3 broken links (Priority 1)
2. **Short-term:** Add missing source URLs for 15 documents (Priority 2)
3. **Ongoing:** Establish quarterly URL verification schedule
4. **Documentation:** Create source URL standards guide for future documents

---

## Document URLs Reference

### All URLs by Type

**Library of Congress (American State Papers):**

```
https://memory.loc.gov/ammem/amlaw/lwsp.html     (12 documents)
https://memory.loc.gov/ammem/amlaw/lwsl.html     (1 document)
https://www.loc.gov/maps/                        (1 document)
```

**Founders Online (National Archives):**

```
https://founders.archives.gov/                                              (1 document)
https://founders.archives.gov/documents/Washington/05-05-02-0258           (1 document)
https://founders.archives.gov/documents/Washington/05-05-02-0277           (1 document)
https://founders.archives.gov/documents/Washington/05-05-02-0290           (1 document)
https://founders.archives.gov/documents/Washington/05-06-02-0135           (1 document)
https://founders.archives.gov/documents/Washington/05-06-02-0148           (1 document)
https://founders.archives.gov/documents/Washington/05-09-02-0100           (1 document)
```

**Treaty Collections:**

```
https://digitreaties.org/treaties/treaty/88697242/                         (1 document)
https://avalon.law.yale.edu/18th_century/chr1792.asp                       (1 document - BROKEN)
```

**Tennessee Encyclopedia:**

```
https://tennesseeencyclopedia.net/entries/rocky-mount/                     (1 document - 403 ERROR)
https://tennesseeencyclopedia.net/entries/knoxville-gazette/               (1 document - 403 ERROR)
```

---

_Verification Report prepared by: URL Checker Team #1_
_Date: January 30, 2026_
_Task: Evidence Room Source URL Verification_
