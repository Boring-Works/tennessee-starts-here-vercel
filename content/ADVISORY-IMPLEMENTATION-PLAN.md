# Evidence Room Implementation Plan: Operations Reality Check

**Prepared by:** Michael Stevens, Implementation & Operations Advisor
**Date:** January 30, 2026
**For:** Cody Boring, Rocky Mount State Historic Site

---

## Executive Summary: The Brutal Truth

You have **70+ pages of excellent recommendations** spanning:

- Evidence data architecture improvements
- Scholarly citation standards
- CMS integration
- People profile audits
- Metadata enhancements
- API development

**Total estimated work: 200-300 hours**

**Your realistic capacity:** You're Executive Director of a state historic site, building SPE, managing BIDSPX, running Rocky Mount Pantry, and maintaining multiple other projects.

**This plan answers:** What ACTUALLY gets done, by whom, and when?

---

## Capacity Reality Check

### Cody's Available Time for Evidence Room

| Scenario          | Weekly Hours | Monthly Hours | What's Possible           |
| ----------------- | ------------ | ------------- | ------------------------- |
| **Minimum**       | 2-3 hrs      | 8-12 hrs      | Quick fixes only          |
| **Realistic**     | 5 hrs        | 20 hrs        | Phase 1 + maintenance     |
| **Optimistic**    | 10 hrs       | 40 hrs        | Phase 1 + Phase 2 partial |
| **Unsustainable** | 20 hrs       | 80 hrs        | Everything (burnout risk) |

**My Assessment:** You have 5 hours/week MAXIMUM without sacrificing other priorities.

---

## Work Breakdown: Time Required

### Phase 1: Quick Data Fixes (EVIDENCE-QUICK-FIXES.md)

| Task                           | Time         | Difficulty | Value    |
| ------------------------------ | ------------ | ---------- | -------- |
| Migrate TREATY_SIGNERS to JSON | 30 min       | Easy       | High     |
| Migrate PRIMARY_QUOTES to JSON | 20 min       | Easy       | High     |
| Migrate SOURCE_LINKS to JSON   | 15 min       | Easy       | Medium   |
| Create unified type schema     | 20 min       | Easy       | High     |
| Testing & verification         | 30 min       | Easy       | Critical |
| **TOTAL**                      | **~2 hours** | **Easy**   | **High** |

**Verdict:** DO THIS. High value, low effort, foundation for everything else.

### Phase 2: People Profile Audit Fixes (AUDIT_INDEX.md)

| Task                                 | Time        | Difficulty | Value    |
| ------------------------------------ | ----------- | ---------- | -------- |
| Fix 2 missing `name_cherokee` fields | 10 min      | Easy       | High     |
| Fix 1 `slug` vs `id` inconsistency   | 2 min       | Easy       | Low      |
| Research Cherokee names if needed    | 30 min      | Medium     | Medium   |
| **TOTAL**                            | **~45 min** | **Easy**   | **High** |

**Verdict:** DO THIS. 45 minutes fixes 96% → 100% compliance.

### Phase 3: Document ID Conflicts (EVIDENCE-REVIEW-SCHOLARLY-STANDARDS.md)

| Task                                    | Time        | Difficulty | Value        |
| --------------------------------------- | ----------- | ---------- | ------------ |
| Verify Williamson doc ID (0277 vs 0268) | 15 min      | Easy       | Critical     |
| Verify Washington doc ID (0135 vs 0076) | 15 min      | Easy       | Critical     |
| Fix line 393 generic Founders link      | 5 min       | Easy       | Critical     |
| Update all references                   | 15 min      | Easy       | Critical     |
| **TOTAL**                               | **~50 min** | **Easy**   | **Critical** |

**Verdict:** DO THIS. Citation accuracy is non-negotiable.

### Phase 4: Add Archival Metadata (Scholarly Standards)

| Task                                     | Time         | Difficulty | Value    |
| ---------------------------------------- | ------------ | ---------- | -------- |
| Research repository info for 10 key docs | 2 hrs        | Medium     | High     |
| Add archival metadata to frontmatter     | 1 hr         | Easy       | High     |
| Create ArchivalSource type               | 20 min       | Easy       | Medium   |
| Update document schema                   | 30 min       | Easy       | Medium   |
| **TOTAL**                                | **~4 hours** | **Medium** | **High** |

**Verdict:** PHASE 2. Worth doing but not urgent.

### Phase 5: CMS Integration (Sanity/Supabase)

| Task                   | Time          | Difficulty      | Value                |
| ---------------------- | ------------- | --------------- | -------------------- |
| Setup Sanity Studio    | 3 hrs         | Medium          | High (long-term)     |
| Create content schemas | 4 hrs         | Medium          | High                 |
| Migrate existing data  | 3 hrs         | Medium          | Medium               |
| Train staff/volunteers | 2 hrs         | Easy            | High                 |
| Git integration setup  | 2 hrs         | Hard            | Medium               |
| **TOTAL**              | **~14 hours** | **Medium-Hard** | **High (long-term)** |

**Verdict:** DELEGATE OR DELAY. Not something to DIY on limited time.

### Phase 6: Enhanced Citation Features (BibTeX, RIS, DOI)

| Task                      | Time            | Difficulty      | Value           |
| ------------------------- | --------------- | --------------- | --------------- |
| Add BibTeX export         | 2 hrs           | Medium          | Medium          |
| Add RIS export            | 1.5 hrs         | Medium          | Medium          |
| Research DOI registration | 1 hr            | Easy            | Low (for now)   |
| Implement DOI system      | 4 hrs           | Hard            | Low (premature) |
| JSON-LD enhancement       | 2 hrs           | Medium          | Medium          |
| **TOTAL**                 | **~10.5 hours** | **Medium-Hard** | **Medium**      |

**Verdict:** NICE TO HAVE. Not critical for current audience.

### Phase 7: API Development & TEI XML Export

| Task                        | Time          | Difficulty | Value                     |
| --------------------------- | ------------- | ---------- | ------------------------- |
| Build REST API endpoints    | 6 hrs         | Hard       | Low (no demand)           |
| TEI XML export              | 8 hrs         | Hard       | Low (academic niche)      |
| OAI-PMH metadata harvesting | 10 hrs        | Hard       | Low (library integration) |
| Documentation               | 4 hrs         | Easy       | Medium                    |
| **TOTAL**                   | **~28 hours** | **Hard**   | **Low**                   |

**Verdict:** DON'T DO. Zero current demand. Future hire material.

---

## Priority Matrix: Impact vs. Effort

```
HIGH IMPACT, LOW EFFORT (DO FIRST)
├─ Phase 1: Data migration (2 hrs)
├─ Phase 2: People audit fixes (45 min)
└─ Phase 3: Doc ID conflicts (50 min)
   TOTAL: ~4 hours

HIGH IMPACT, MEDIUM EFFORT (DO NEXT)
├─ Phase 4: Archival metadata (4 hrs)
└─ Enhanced verification tracking (3 hrs)
   TOTAL: ~7 hours

MEDIUM IMPACT, HIGH EFFORT (DELEGATE)
├─ Phase 5: CMS integration (14 hrs)
└─ Phase 6: Citation features (10.5 hrs)
   TOTAL: ~24.5 hours

LOW IMPACT, HIGH EFFORT (DON'T DO)
└─ Phase 7: API/TEI export (28 hrs)
   TOTAL: ~28 hours
```

---

## Implementation Scenarios

### Scenario A: Solo (5 hrs/week)

**Month 1:**

- Week 1: Phase 1 (data migration) — 2 hours
- Week 2: Phase 2 + 3 (audit fixes + doc IDs) — 2 hours
- Week 3: Start Phase 4 (archival metadata - 5 docs) — 2 hours
- Week 4: Continue Phase 4 (5 more docs) — 2 hours
- **Month 1 Total: 8 hours**

**Month 2:**

- Week 5-8: Finish Phase 4, add verification tracking
- **Month 2 Total: 20 hours**

**Month 3:**

- Maintenance, documentation updates, content additions
- **Month 3 Total: 15 hours**

**Outcome:** Phases 1-4 complete. CMS delayed indefinitely. No API work.

**Grade: B+** (Gets high-value work done, sustainable pace)

---

### Scenario B: Solo + Student Intern (10 hrs/week)

**Resources:**

- Cody: 5 hrs/week (technical work)
- Intern: 5 hrs/week (research, data entry)

**Month 1:**

- **Cody:** Phases 1-3 (4 hrs), setup intern workflow (1 hr)
- **Intern:** Research archival metadata for 20 documents
- **Month 1 Total: Cody 20 hrs, Intern 20 hrs**

**Month 2:**

- **Cody:** Phase 4 implementation, verification system
- **Intern:** Add metadata to 40 documents, research Cherokee names
- **Month 2 Total: Cody 20 hrs, Intern 20 hrs**

**Month 3:**

- **Cody:** Enhanced citation features (BibTeX/RIS)
- **Intern:** Document all sources, create finding aids
- **Month 3 Total: Cody 20 hrs, Intern 20 hrs**

**Outcome:** Phases 1-4 complete + Phase 6 partial. Deep archival research done. CMS still delayed.

**Grade: A-** (Significant progress, intern absorbs tedious research)

---

### Scenario C: Solo + Part-Time Contractor (15 hrs/week)

**Resources:**

- Cody: 5 hrs/week (direction, review, content decisions)
- Contractor: 10 hrs/week (implementation)

**Month 1:**

- **Cody:** Content decisions, research Cherokee names, verify sources
- **Contractor:** Phases 1-4 (all technical implementation)
- **Month 1 Total: Cody 20 hrs, Contractor 40 hrs**

**Month 2:**

- **Cody:** CMS content schema design, workflow requirements
- **Contractor:** CMS integration (Sanity Studio setup + migration)
- **Month 2 Total: Cody 20 hrs, Contractor 40 hrs**

**Month 3:**

- **Cody:** Staff training, documentation
- **Contractor:** Enhanced citation features, verification UI
- **Month 3 Total: Cody 20 hrs, Contractor 40 hrs**

**Outcome:** Phases 1-6 complete. CMS operational. Ready for staff to maintain.

**Grade: A** (Fast, sustainable, good ROI if contractor is competent)

---

## What NOT to Do

### 1. Don't Build an API (Yet)

**Why recommended:** "External researchers can access evidence via API"

**Why you shouldn't:**

- Zero current demand
- No researchers have asked for API access
- Maintenance burden (breaking changes, versioning, docs)
- Security considerations (rate limiting, auth, abuse prevention)
- 28+ hours of work for zero users

**When to reconsider:** When you have 5+ academic researchers requesting programmatic access.

---

### 2. Don't Implement TEI XML Export

**Why recommended:** "Digital humanities standard for scholarly text encoding"

**Why you shouldn't:**

- Niche academic format (tiny user base)
- 8+ hours to implement correctly
- Ongoing maintenance as documents change
- Zero visitor demand
- No institutional partners requesting it

**When to reconsider:** When a university partner says "we need TEI for our corpus" and has funding to help.

---

### 3. Don't Register DOIs (Yet)

**Why recommended:** "Persistent identifiers for long-term citation stability"

**Why you shouldn't:**

- Costs money (annual fees to DOI registrar)
- Bureaucratic overhead (organization registration, contracts)
- Citation formats already work fine
- No current citation problems
- Site is stable at tennesseestartshere.com

**When to reconsider:** When you're publishing peer-reviewed scholarship or partnering with academic publishers.

---

### 4. Don't Build a Full CMS Yourself

**Why recommended:** "Non-technical staff can manage evidence content"

**Why you shouldn't:**

- 14+ hours of complex work
- Ongoing maintenance burden
- Edge cases and bugs
- You're not a CMS developer
- Better to hire or use existing tools

**Alternative:** If CMS is truly needed:

1. Hire contractor for implementation ($800-1,200)
2. OR use simpler tool (Tina.CMS, Decap CMS - 2 hrs setup)
3. OR keep using JSON with GitHub Desktop (train staff to edit JSON)

---

### 5. Don't Add Linked Data URIs (VIAF, Wikidata)

**Why recommended:** "Enables machine linking with Wikipedia, library catalogs"

**Why you shouldn't:**

- Manual research: 2-5 minutes PER person to find URIs
- 50 people = 2.5 hours minimum
- Zero benefit for 99.9% of visitors
- No computational humanities projects requesting it
- Maintenance: URIs change, need re-verification

**When to reconsider:** When building partnerships with Wikidata or humanities computing projects.

---

## Quick Wins: Maximum Impact, Minimum Time

These give you visible progress in under 1 hour each:

### Quick Win 1: Fix Document ID Conflicts (50 min)

**Impact:** Citation accuracy, scholarly credibility
**Effort:** 50 minutes
**Visibility:** High (fixes errors researchers might notice)

### Quick Win 2: People Profile Audit (45 min)

**Impact:** 96% → 100% compliance, professional polish
**Effort:** 45 minutes
**Visibility:** Medium (cleaner data, no errors)

### Quick Win 3: Data Migration (2 hrs)

**Impact:** Foundation for all future work, cleaner codebase
**Effort:** 2 hours
**Visibility:** Low (backend improvement, invisible to users)

**Total Time: ~4 hours**
**Total Impact: Fixes critical errors, establishes foundation, shows progress**

---

## Delegation Opportunities

### What an Intern Can Do

**Perfect tasks:**

- Research archival metadata (repository names, collection IDs, call numbers)
- Find Cherokee name sources and verify spellings
- Check all document links for 404s
- Add missing dates/details to people profiles
- Create finding aids (document → repository mapping)
- Test all citation formats
- Document verification process

**Cannot do:**

- Write TypeScript code
- Design data schemas
- Make architectural decisions
- Train on CMS systems (unless technical background)

**Time savings:** 20-30 hours/month of tedious research work off your plate.

---

### What a Contractor Can Do

**Perfect tasks:**

- All of Phase 1-6 technical implementation
- CMS setup and configuration
- Component development (new citation formats, UI improvements)
- Type system enhancements
- API development (if truly needed)

**Cannot do (well):**

- Make content decisions
- Understand Rocky Mount history/context
- Train staff
- Determine scholarly priorities

**Cost estimate:** $800-1,200 for Phases 1-6 at $40-50/hr (20-30 hours)

---

### What a Volunteer Academic Partner Can Do

**Perfect tasks:**

- Peer review verification system design
- Recommend scholarly standards priorities
- Test citation formats
- Provide feedback on metadata completeness
- Write methodology documentation
- Connect with other institutions

**Cannot do:**

- Technical implementation
- Ongoing maintenance
- Daily content updates

**Cost:** Free (if relationship exists), but requires cultivation and coordination time.

---

## Automation Possibilities

### What Can Be Automated

**High ROI:**

1. **Link checking** - Script to verify all external URLs (30 min to write, saves 2 hrs/month)
2. **JSON validation** - Schema validation on commit (1 hr to setup, prevents errors)
3. **Document ID uniqueness** - Pre-commit hook (30 min, catches duplicates)
4. **Date format validation** - Script to check all YYYY-MM-DD dates (30 min)

**Medium ROI:**

1. **Citation format generation** - Already done ✓
2. **Metadata completeness report** - Show % complete per document (2 hrs)
3. **Verification status dashboard** - Show what needs review (3 hrs)

**Low ROI:**

1. **Automated DOI registration** - Complex, premature
2. **TEI XML generation** - No demand
3. **Linked data URI resolution** - Niche use case

**Recommended:** Implement high ROI automations (2-3 hours total), skip the rest.

---

## Monthly Capacity Budgets

### Month 1: Foundation (Phases 1-3)

**If 5 hrs/week available:**

- Week 1: Phase 1 (data migration) — 2 hrs
- Week 2: Phase 2 + 3 (audit fixes + doc IDs) — 2 hrs
- Week 3: Documentation + testing — 1 hr
- Week 4: Buffer/catch-up — 1 hr
- **Total: 6 hours used, 4 hours buffer**

**Deliverables:**

- ✓ All evidence data in JSON
- ✓ People profiles 100% compliant
- ✓ Document ID conflicts resolved
- ✓ Unified type schema in place

**Visibility:** Low (backend improvements) but critical foundation.

---

### Month 2: Enhancement (Phase 4 Partial)

**If 5 hrs/week available:**

- Week 5-6: Archival metadata for 10 key documents — 4 hrs
- Week 7: Enhanced verification tracking — 2 hrs
- Week 8: Testing + documentation — 2 hrs
- **Total: 8 hours used, 12 hours buffer**

**Deliverables:**

- ✓ 10 most important documents have full archival metadata
- ✓ Verification system shows who verified and when
- ✓ Documentation updated

**Visibility:** Medium (scholars notice improved citations)

---

### Month 3: Polish + Maintenance

**If 5 hrs/week available:**

- Week 9: Add more archival metadata — 2 hrs
- Week 10: Content additions (new documents, people) — 2 hrs
- Week 11: Review and test all changes — 1 hr
- Week 12: Plan next phase / CMS requirements — 2 hrs
- **Total: 7 hours used, 13 hours buffer**

**Deliverables:**

- ✓ 20 documents with full archival metadata
- ✓ Content updated and verified
- ✓ CMS requirements documented for future work

**Visibility:** High (content improvements visible to visitors)

---

## CMS Decision Framework

### Do You Actually Need a CMS?

**Ask:**

1. **Who needs to edit content besides Cody?**
   - If answer is "no one," skip CMS
   - If answer is "staff/volunteers," CMS is valuable

2. **How often does evidence content change?**
   - Daily: CMS critical
   - Weekly: CMS helpful
   - Monthly: CMS nice-to-have
   - Quarterly: JSON + GitHub fine

3. **Are staff comfortable with JSON files?**
   - Yes: Train on JSON editing, skip CMS
   - No: CMS worth the investment

4. **Budget for ongoing CMS hosting/maintenance?**
   - Sanity: Free tier up to 3 users, then $99/mo
   - Supabase: Free tier, then $25/mo
   - Self-hosted: Free but requires maintenance

**My Assessment:** If only Cody edits content, JSON + GitHub is fine for now. CMS becomes valuable when you have:

- Multiple content contributors
- Frequent updates (weekly+)
- Non-technical staff needing access

---

### CMS Implementation: Build vs. Buy vs. Wait

**Option 1: Wait (Recommended)**

- Continue with JSON files for 6-12 months
- Document pain points
- Revisit when you have clear multi-user need
- **Cost:** $0
- **Time:** 0 hours

**Option 2: Simple CMS (Tina/Decap - If needed soon)**

- Tina.CMS: Visual editor for Git-backed content
- 2-4 hours setup, free tier
- Staff can edit content in browser
- **Cost:** $0 (free tier)
- **Time:** 2-4 hours

**Option 3: Full CMS (Sanity - If scaling content)**

- Best for multiple editors, workflows, media library
- 14+ hours setup OR hire contractor
- Ongoing hosting costs
- **Cost:** $0-99/mo + setup time
- **Time:** 14 hours (DIY) or $800-1,200 (contractor)

**Recommendation:** Start with Option 1 (wait). Revisit in 6 months if pain points emerge.

---

## What Gets Done in Realistic Scenarios

### Solo, 5 hrs/week, 3 months

**DONE:**

- ✓ Phases 1-3: Data migration, audit fixes, doc ID conflicts (4 hrs)
- ✓ Phase 4 Partial: 10-15 docs with archival metadata (8 hrs)
- ✓ Enhanced verification tracking (3 hrs)
- ✓ Documentation updates (2 hrs)

**NOT DONE:**

- ❌ CMS integration
- ❌ Advanced citation features (BibTeX/RIS)
- ❌ API development
- ❌ TEI XML export
- ❌ Linked data URIs

**OUTCOME: 85% of high-value work complete**

---

### Solo + Intern, 10 hrs/week, 3 months

**DONE:**

- ✓ Everything from Solo scenario
- ✓ Phase 4 Complete: All 50 documents with archival metadata
- ✓ Cherokee name research for all people profiles
- ✓ Comprehensive source documentation
- ✓ Enhanced citation features (BibTeX/RIS)

**NOT DONE:**

- ❌ CMS integration
- ❌ API development
- ❌ TEI XML export

**OUTCOME: 95% of valuable work complete**

---

### Solo + Contractor, 15 hrs/week, 3 months

**DONE:**

- ✓ Everything from Intern scenario
- ✓ CMS integration (Sanity Studio operational)
- ✓ Staff trained on CMS
- ✓ All technical enhancements complete

**NOT DONE:**

- ❌ API development (by choice - no demand)
- ❌ TEI XML export (by choice - niche)

**OUTCOME: 100% of worthwhile work complete**

---

## Red Flags: When to Stop

### Warning Signs of Scope Creep

**Stop if you find yourself:**

1. "Just adding one more feature" repeatedly
2. Building for hypothetical future users
3. Implementing "nice to have" items before "must have"
4. Spending more time on Evidence Room than Rocky Mount operations
5. Delaying other projects for Evidence Room perfection

**Reality Check Questions:**

- Has anyone asked for this feature?
- Will visitors notice this improvement?
- Does this help tell Tennessee's story better?
- Is this the best use of limited time?

---

## Success Metrics: What Actually Matters

### Track These (Matter)

1. **Visitor engagement:**
   - Time on evidence pages
   - Most viewed documents
   - Search queries
   - Citation exports

2. **Content quality:**
   - Number of verified documents
   - Archival metadata completeness
   - Citation accuracy (zero errors)

3. **Scholarly impact:**
   - Citations in academic papers
   - Requests from researchers
   - Links from .edu domains

### Don't Track These (Vanity)

1. API call volume (if no API users)
2. TEI XML downloads (if not offered)
3. Number of metadata fields per document (completeness ≠ usefulness)
4. Lines of code (irrelevant to quality)

---

## Final Recommendations

### Do This (Week 1)

1. **Phase 1: Data Migration** (2 hours)
   - Migrate TREATY_SIGNERS, PRIMARY_QUOTES, SOURCE_LINKS to JSON
   - Create unified type schema
   - Test thoroughly

2. **Phase 2: Audit Fixes** (45 minutes)
   - Fix 2 missing Cherokee names
   - Fix slug/id inconsistency

3. **Phase 3: Doc ID Conflicts** (50 minutes)
   - Verify and fix all document ID conflicts
   - Update citations

**Total Week 1: 4 hours**

### Do This (Month 1-2)

4. **Phase 4 Partial: Key Documents** (4 hours)
   - Add archival metadata to 10 most important documents
   - Focus on: Treaty of Holston, Blount letters, Washington correspondence

5. **Enhanced Verification** (3 hours)
   - Add verification tracking metadata
   - Document who verified and when
   - Show verification history

**Total Month 1-2: Additional 7 hours**

### Consider Later (Month 3+)

6. **More Archival Metadata** (ongoing)
   - Add to remaining 40 documents as time permits
   - 15 minutes per document = 10 hours total

7. **Simple CMS** (if multiple editors needed)
   - Evaluate Tina.CMS or similar
   - 2-4 hours setup
   - Only if staff needs content access

### Never Do (Unless Circumstances Change)

8. **API Development** - No demand
9. **TEI XML Export** - Niche academic format
10. **Linked Data URIs** - Maintenance burden, low value
11. **DOI Registration** - Premature, costly

---

## The Bottom Line

**With 5 hours/week:**

- You can complete all HIGH IMPACT work in 3 months
- This gives you 85% of the value in 20% of the time
- Remaining 15% of value requires 80% of the time (classic Pareto)

**What you'll have after 3 months:**

- ✓ Clean, maintainable data architecture
- ✓ 100% compliant people profiles
- ✓ Accurate citations (zero conflicts)
- ✓ Key documents with full archival metadata
- ✓ Verification transparency
- ✓ Foundation for future enhancements

**What you won't have (and don't need):**

- ❌ CMS (yet - evaluate in 6 months)
- ❌ API (no demand)
- ❌ TEI XML (academic niche)
- ❌ Linked data (overkill)

**This is a win.**

The Evidence Room will be:

- Accurate (citations verified)
- Maintainable (clean data layer)
- Credible (archival metadata)
- Professional (zero errors)
- Ready to scale (when/if needed)

All in 15-20 hours of focused work.

**You can't clone yourself. But you can be strategic about what matters.**

---

**Implementation begins:** When you say go.

**First 4 hours gets you:** 50% of total value.

**Next 7 hours gets you:** Another 35% of value.

**Everything else:** Diminishing returns.

Choose wisely.

— Michael Stevens
