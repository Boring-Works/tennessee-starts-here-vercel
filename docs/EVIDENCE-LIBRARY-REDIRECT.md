# Evidence Library to Documents Redirect

**Date:** 2026-01-29
**Status:** Implemented

## Summary

Redirects have been configured to deprecate the old `/evidence/library` routes in favor of the new content-driven `/evidence/documents` system.

## Changes Made

### File Modified

- `/next.config.ts` - Added `redirects()` function with 7 redirect rules

### Redirect Rules

All redirects use `permanent: true` (HTTP 301) to signal to search engines that these are permanent moves.

#### 1. Index Page

```
/evidence/library → /evidence/documents
```

#### 2. Specific Document Mappings

```
/evidence/library/treaty-of-holston-1791      → /evidence/documents/treaty-holston-1791
/evidence/library/washington-to-knox-1790     → /evidence/documents/washington-to-knox-1790-08
/evidence/library/washington-proclamation-1791 → /evidence/documents/washington-proclamation-1791
/evidence/library/jefferson-to-blount-1790    → /evidence/documents/blount-commission-1790
/evidence/library/cherokee-treaty-signatories → /evidence/documents/treaty-holston-1791
```

#### 3. Catch-all

```
/evidence/library/:slug → /evidence/documents/:slug
```

## Rationale

### Old System (`/evidence/library`)

- Hardcoded 6 documents in `/app/(main)/evidence/library/page.tsx`
- Document data stored in `/lib/documents/data.ts`
- Limited to manually coded documents
- Static, not scalable

### New System (`/evidence/documents`)

- Content-driven from `/content/documents/*.md` files
- 37+ documents and growing
- Uses `/lib/evidence/loader.ts` for dynamic content
- Includes search functionality
- Scalable architecture

## Document Migration Map

| Old Slug                       | New Slug                       | Notes                                       |
| ------------------------------ | ------------------------------ | ------------------------------------------- |
| `treaty-of-holston-1791`       | `treaty-holston-1791`          | Removed "of" from slug                      |
| `washington-to-knox-1790`      | `washington-to-knox-1790-08`   | Added month suffix for clarity              |
| `washington-proclamation-1791` | `washington-proclamation-1791` | Same slug ✓                                 |
| `jefferson-to-blount-1790`     | `blount-commission-1790`       | Jefferson sent Blount's commission          |
| `cherokee-treaty-signatories`  | `treaty-holston-1791`          | Signatories content merged into main treaty |

## Verification

✅ **Build Status:** Passing
✅ **Lint Status:** Passing
✅ **Routes Generated:** 122 total

- `/evidence/library/*`: 6 routes (preserved for build)
- `/evidence/documents/*`: 37+ routes

## Old Files Status

The following files remain in the codebase but are effectively deprecated:

```
app/(main)/evidence/library/
├── page.tsx               # Index page (redirects)
├── [slug]/page.tsx        # Dynamic route (redirects)
└── library.css            # Shared styles

lib/documents/
├── data.ts                # Hardcoded document data
├── types.ts               # Document type definitions
└── index.ts               # Exports
```

**Do not delete these files yet.** They are still part of the static build process. The redirect system ensures users never see them.

## SEO Impact

- 301 redirects preserve link equity from external sites
- Search engines will update their indexes to the new URLs
- No broken links for users following old bookmarks or links
- Sitemap should be updated to only include new `/evidence/documents` URLs

## Future Work

1. **Monitor Analytics:** Track redirect hits to see which old URLs are still receiving traffic
2. **Update Internal Links:** Search codebase for any hardcoded `/evidence/library` links
3. **Update Sitemap:** Ensure sitemap.xml only includes new document URLs
4. **Consider Removal:** After 6-12 months, evaluate removing old library files entirely

## Testing Checklist

After deployment to production:

- [ ] Test `/evidence/library` redirects to `/evidence/documents`
- [ ] Test all 5 specific document redirects
- [ ] Verify search engines can crawl new document URLs
- [ ] Check Google Search Console for redirect confirmation
- [ ] Monitor 404 errors for any unmapped old URLs

## Related Documentation

- `/docs/EVIDENCE-ROOM.md` - Evidence Room feature overview
- `/lib/evidence/loader.ts` - Document loading system
- `/content/documents/` - Document content files
