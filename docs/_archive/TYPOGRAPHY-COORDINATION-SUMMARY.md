# Typography Overflow Coordination Summary

**Coordinator:** Professor Marcus Webb, PhD
**Date:** January 30, 2026
**Status:** Ready for Worker Assignment

---

## Mission Statement

Ensure every piece of text on the Tennessee Starts Here website can be read in full, regardless of:

- Content length (short or long names/titles)
- Device size (mobile to desktop)
- Zoom level (100% to 200%+)
- Language (English or Cherokee syllabary)

---

## What We Found

### ✅ Good News

**50% of critical text containers already have overflow protection.**

Files with proper protection:

- Events calendar titles and descriptions
- Evidence people names (both Cherokee and English)
- Library document titles
- Timeline event titles

### 🚨 Action Needed

**16 text classes across 4 files need overflow protection added.**

Breakdown:

- **5 classes** - Cherokee signatory names
- **2 classes** - Event showcase titles
- **1 class** - Library descriptions
- **8 classes** - Homepage section titles

---

## The Fix (Simple)

Add these two CSS properties to each identified class:

```css
word-wrap: break-word;
overflow-wrap: break-word;
```

**Total lines of code to add:** 32 lines (2 per class × 16 classes)

---

## Documents Created

### 1. TYPOGRAPHY-OVERFLOW-AUDIT.md

**Purpose:** Comprehensive analysis and remediation plan
**Audience:** Project leads, senior developers
**Contents:**

- Current state assessment
- Risk analysis
- Detailed class-by-class breakdown
- Testing requirements
- Implementation phases
- Success criteria

**Use this for:** Understanding the full scope and context

---

### 2. TYPOGRAPHY-FIX-INSTRUCTIONS.md

**Purpose:** Quick worker instructions
**Audience:** Haiku agents, junior developers
**Contents:**

- Condensed fix list
- File paths and line numbers
- Before/after examples
- Verification commands

**Use this for:** Assigning tasks to workers

---

### 3. TYPOGRAPHY-STANDARDS.md

**Purpose:** Ongoing standards and best practices
**Audience:** All developers, code reviewers
**Contents:**

- Standard CSS patterns
- When to apply/not apply
- Common mistakes to avoid
- Testing requirements
- Accessibility considerations
- Review checklist

**Use this for:** Future development and code reviews

---

## Work Assignment Plan

### Phase 1: Critical Path (Assign First)

**Files:** 2 files, 7 classes
**Priority:** HIGH
**Impact:** Fixes Cherokee names and event showcase

**Assignments:**

- Worker A: `components/evidence/CherokeeSignatories.css` (5 classes)
- Worker B: `components/EventsShowcase/EventsShowcase.module.css` (2 classes)

**Estimated Time:** 30 minutes
**Verification:** Run `npm run lint` after each file

---

### Phase 2: Secondary Elements (Assign Second)

**Files:** 1 file, 1 class
**Priority:** MEDIUM
**Impact:** Fixes library card descriptions

**Assignment:**

- Worker C: `app/(main)/evidence/library/library.css` (1 class)

**Estimated Time:** 10 minutes
**Verification:** Run `npm run lint`

---

### Phase 3: Homepage (Assign Third)

**Files:** 1 file, 8 classes
**Priority:** MEDIUM
**Impact:** Fixes all homepage section titles

**Assignment:**

- Worker D: `app/(main)/home/page.module.css` (8 classes)

**Estimated Time:** 40 minutes
**Verification:** Run `npm run lint` + visual check

---

### Phase 4: QA & Testing (Assign Last)

**Responsibility:** QA team or senior developer
**Tasks:**

1. Visual regression testing with long content
2. Mobile device testing (iPhone SE, Android)
3. Zoom testing (200% magnification)
4. Screen reader testing (VoiceOver/NVDA)

**Estimated Time:** 30 minutes
**Deliverable:** Test report with screenshots

---

## Verification Process

### After Each File Change

```bash
npm run lint
```

**Expected:** No errors

### After All Changes Complete

```bash
npm run build
```

**Expected:** Successful build

### Manual Testing

Use these test cases:

**Long Cherokee Name:**

```
ᏓᏓᏬᏙᎯᎥᏍᎩᎾᎵᎢᏍᏗ
```

**Long English Name:**

```
Colonel Benjamin Franklin Griffin III Esq.
```

**Long Event Title:**

```
Special Evening Lecture Series Presentation: The Constitutional Conventions of Tennessee and Their Historical Significance for Modern Democracy
```

**Test at these widths:**

- 375px (iPhone SE)
- 320px (minimum mobile)
- 640px (tablet portrait)

**Expected results:**

- ✅ No horizontal scrolling
- ✅ All text visible
- ✅ Natural word wrapping
- ✅ No text cut off

---

## Risk Assessment

### Low Risk Changes

- Pure CSS additions
- No JavaScript changes
- No layout restructuring
- No breaking changes

### Rollback Plan

If issues arise:

1. Revert specific file: `git checkout HEAD^ -- path/to/file.css`
2. Test individually
3. Re-apply fix with adjustments

---

## Success Metrics

### Quantitative

- [ ] 16 classes updated
- [ ] 4 files modified
- [ ] 0 lint errors
- [ ] 0 build errors
- [ ] 0 horizontal scroll instances

### Qualitative

- [ ] All Cherokee names fully visible
- [ ] All event titles wrap naturally
- [ ] Library descriptions readable
- [ ] Passes 200% zoom test
- [ ] Passes mobile device test

---

## Timeline

| Phase     | Tasks                           | Duration    | Dependencies        |
| --------- | ------------------------------- | ----------- | ------------------- |
| Phase 1   | Cherokee + Showcase (7 classes) | 30 min      | None                |
| Phase 2   | Library (1 class)               | 10 min      | None                |
| Phase 3   | Homepage (8 classes)            | 40 min      | None                |
| Phase 4   | QA Testing                      | 30 min      | Phases 1-3 complete |
| **Total** | **All phases**                  | **110 min** | -                   |

**Parallel Work:** Phases 1-3 can run simultaneously (different files)
**Sequential Work:** Phase 4 must wait for Phases 1-3

---

## Communication Plan

### Worker Instructions

Send each worker:

1. Link to `TYPOGRAPHY-FIX-INSTRUCTIONS.md`
2. Specific phase assignment
3. Verification commands
4. Deadline (if applicable)

### Progress Tracking

Use checklist:

```
- [ ] Phase 1 - Worker A (CherokeeSignatories.css)
- [ ] Phase 1 - Worker B (EventsShowcase.module.css)
- [ ] Phase 2 - Worker C (library.css)
- [ ] Phase 3 - Worker D (page.module.css)
- [ ] Phase 4 - QA Testing
```

### Status Updates

Workers should report:

1. ✅ "Phase X complete - lint passed"
2. 🚨 "Phase X issue - [describe error]"

---

## Post-Implementation

### Documentation Updates

- [ ] Add entry to project changelog
- [ ] Update `CLAUDE.md` if relevant
- [ ] Link standards in `CONTRIBUTING.md`

### Knowledge Transfer

- [ ] Brief team on new standards
- [ ] Add to onboarding documentation
- [ ] Create code review checklist item

### Monitoring

- [ ] Watch for similar issues in new PRs
- [ ] Set up automated overflow detection (future)
- [ ] Schedule quarterly typography audit

---

## Contact & Questions

**Typography Standards Lead:** Professor Marcus Webb, PhD

**For questions about:**

- Standards interpretation → Read `TYPOGRAPHY-STANDARDS.md`
- Specific fix instructions → Read `TYPOGRAPHY-FIX-INSTRUCTIONS.md`
- Full context & analysis → Read `TYPOGRAPHY-OVERFLOW-AUDIT.md`

**For urgent issues:**

- Check lint output first
- Review browser console for errors
- Test with example content provided

---

## Approval & Sign-off

**Coordinator:** Professor Marcus Webb, PhD ✓
**Date:** January 30, 2026

**Ready for:**

- [x] Worker assignment
- [x] Implementation
- [x] Testing
- [ ] Deployment (pending testing)

---

## Quick Start (For Project Leads)

1. **Assign tasks:**
   - Give each worker their phase from `TYPOGRAPHY-FIX-INSTRUCTIONS.md`
   - Provide test cases (long names/titles)

2. **Monitor progress:**
   - Check for "lint passed" confirmations
   - Review PRs for correct pattern application

3. **Run QA:**
   - Test with long content examples
   - Test on iPhone SE (375px)
   - Verify no horizontal scrolling

4. **Deploy:**
   - Merge to main
   - Monitor production for issues
   - Document in changelog

---

_"Every character deserves to be read. Let's make it happen."_

**Professor Marcus Webb, PhD**
**Typography Standards Lead**
