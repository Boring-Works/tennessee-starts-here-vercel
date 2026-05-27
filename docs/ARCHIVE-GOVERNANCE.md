# Rocky Mount Digital Archive Governance

**Version:** 1.0
**Effective Date:** January 30, 2026
**Maintained By:** Rocky Mount State Historic Site
**Author:** Dr. Eleanor Hartwell, PhD - Chief Digital Archivist

---

## Purpose

This document establishes governance rules for who can modify what in the Rocky Mount Digital Archive, with special attention to AI guardrails that protect historical integrity while enabling efficient content creation.

---

## Guiding Principles

### 1. Primary Sources Are Sacred

Original transcriptions of historical documents, once verified, are immutable. Corrections create new versions; they never overwrite the original.

### 2. Transparency Over Perfection

It is better to publish with clear limitations than to withhold because something isn't perfect. Mark uncertainty honestly.

### 3. Human Authority, AI Assistance

AI tools can draft, suggest, and analyze. Humans verify, approve, and take responsibility. The final word is always human.

### 4. Open Source Accountability

All changes are tracked in Git. Anyone can see who changed what and when. This is a feature, not a bug.

---

## Roles and Responsibilities

### Archive Director (Human Required)

**Current:** Cody Boring, Executive Director

**Responsibilities:**

- Final approval on all verification status changes
- Approval of disputed/reconstructed designations
- Final word on Cherokee representation accuracy
- Authority to merge/reject pull requests
- Responsibility for published claims

**Cannot be delegated to AI:** Any decision that affects verification status or historical claims.

### Content Curator (Human or AI-Assisted)

**Responsibilities:**

- Draft new document transcriptions
- Draft person biographies
- Suggest metadata improvements
- Flag potential errors for review

**AI-Assisted:** Yes, with human review required before publish

### Technical Maintainer (Human)

**Responsibilities:**

- Schema validation scripts
- Build and deployment
- TypeScript type definitions
- Component development

**AI-Assisted:** Yes, standard code review applies

### Researcher (Human)

**Responsibilities:**

- Verify sources
- Locate primary documents
- Write verification notes
- Cross-reference claims

**AI-Assisted:** AI can search and summarize; human must verify findings

---

## AI Guardrails

### What AI CAN Do

| Action                           | Conditions             | Review Required    |
| -------------------------------- | ---------------------- | ------------------ |
| Draft new document transcription | From identified source | Human verification |
| Draft person biography           | Using existing sources | Human verification |
| Suggest metadata corrections     | Schema validation      | Human approval     |
| Generate citation blocks         | Standard templates     | Automated OK       |
| Fix typos in non-source text     | Context sections only  | Quick human review |
| Add source URLs                  | From verified archives | Human verification |
| Create collection descriptions   | Based on existing docs | Human approval     |

### What AI CANNOT Do

| Action                       | Why                       | Alternative        |
| ---------------------------- | ------------------------- | ------------------ |
| Change verification status   | Affects scholarly claims  | Human only         |
| Edit passage text            | Primary source integrity  | Flag for human     |
| Change source_count          | Affects credibility       | Human verification |
| Add/remove people_mentioned  | Interpretation            | Human decision     |
| Write verification notes     | Claims responsibility     | Human authorship   |
| Publish without human review | Accountability            | Require approval   |
| Mark disputed as verified    | Major interpretive change | Director approval  |

### AI Attribution Requirements

When AI assists with content creation:

```yaml
provenance:
  transcribed_by: 'AI-assisted (Claude) with human review'
  verified_by: '[Human Name]'
  verified_date: '[Date of human verification]'
```

Never publish AI-generated content without human verification attribution.

---

## Content Modification Rules

### Document Text (Primary Sources)

**Immutability Rule:** Once a document's primary source text is verified, it CANNOT be changed.

**Exceptions:**

1. **Typo Correction:** Obvious OCR/transcription errors (requires note)
2. **Passage Addition:** New passages can be marked in existing text
3. **Context Updates:** Historical Context sections can be updated

**Process for Corrections:**

1. Do NOT edit the original
2. Add correction note in verification.notes
3. Keep original transcription visible
4. Document the correction in git commit

```yaml
verification:
  notes: >
    CORRECTION (2026-02-15): Original transcription read "October 10";
    corrected to "October 11" per cross-reference with Tennessee Encyclopedia.
    See commit abc123 for change history.
```

### Metadata Updates

**Low Risk (AI + Quick Review):**

- source_url updates (link rot fixes)
- Adding collection assignment
- Adding physical_location
- Updating description text

**Medium Risk (Human Required):**

- Changing content_type
- Adding/removing people_mentioned
- Modifying responds_to/responses
- Updating date with different precision

**High Risk (Director Approval):**

- Changing verification.status
- Modifying verification.source_count
- Editing verification.notes
- Changing author/recipient

### Person Records

**Cherokee Records - Special Care Required:**

All Cherokee person records MUST include this note pattern:

```yaml
verification:
  notes: >
    No Cherokee-authored documents about [Name] have been identified in archives.
    This biography reflects how they were perceived and documented by U.S. officials
    and settlers. Cherokee oral histories and tribal records may contain different
    perspectives.
```

**Biography Modifications:**

- Full biographies require human authorship or human revision of AI draft
- Basic bios can be AI-drafted with human approval
- All birth/death year estimates must be labeled as estimates

### Collection Records

**Auto-Update OK:**

- document_count (can be scripted)

**Human Required:**

- why_it_matters
- key_figures selection
- description changes

---

## Version Control Rules

### Commit Message Standards

```
type(scope): description

- Details of what changed
- Why it changed (if not obvious)

AI-assisted: [yes/no]
Verified-by: [human name if applicable]
```

**Types:**

- `doc`: Document content changes
- `person`: Person record changes
- `meta`: Metadata only changes
- `fix`: Corrections
- `schema`: Schema/type changes

**Examples:**

```
doc(blount-arrival): Add passage markers for key quotes

- Marked glass-windows passage
- Marked arrival-date passage

AI-assisted: yes
Verified-by: Cody Boring
```

```
fix(jackson-1788): Update verification status to disputed

- Changed from 'verified' to 'disputed'
- Added dendrochronology caveat to notes
- source_count changed from 4 to 0

AI-assisted: no
Verified-by: Cody Boring
```

### Branch Protection

**main branch:**

- Protected: requires review
- No direct pushes
- All changes via pull request

**content/ branches:**

- For new document work
- AI can commit
- Human review before merge

**fix/ branches:**

- For corrections
- Human authorship preferred
- Quick review acceptable for low-risk fixes

---

## Review Workflows

### New Document Workflow

```
1. Draft
   - AI or human creates document file
   - Follows ARCHIVE-STANDARDS.md format

2. Validate
   - npm run validate:evidence (when implemented)
   - Check all IDs resolve
   - Verify date format

3. Review
   - Human reads full document
   - Verifies source attribution
   - Confirms verification status appropriate

4. Approve
   - Director or delegated curator approves
   - Merge to main

5. Publish
   - Auto-deploys to production
   - Becomes part of public archive
```

### Verification Status Change Workflow

**This is the most sensitive workflow.**

```
1. Identify Need
   - Research reveals new information
   - Error discovered in current status

2. Document Evidence
   - Write justification in PR description
   - Include sources consulted
   - Explain what changed

3. Director Review
   - ONLY Director can approve status changes
   - Must review evidence personally

4. Apply Change
   - Update verification block
   - Update notes to explain change
   - Commit with detailed message

5. Announce
   - Significant changes may warrant public note
   - Major corrections should be transparent
```

### Cherokee Content Review

**Additional scrutiny for Cherokee-related content:**

1. All Cherokee biographies reviewed for:
   - Balanced perspective acknowledgment
   - Appropriate terminology
   - Source limitation notes

2. Cherokee names verified against:
   - DigiTreaties database
   - Multiple scholarly sources
   - Alternative spelling documentation

3. Avoid:
   - Language that diminishes Cherokee agency
   - One-sided "settler hero" narratives
   - Claims without Cherokee perspective acknowledgment

---

## Source of Truth Hierarchy

When conflicts exist between sources:

### 1. Original Document (Highest Authority)

The physical original document in its archive.

### 2. Verified Digital Copy

Trusted archives: National Archives, Library of Congress, Founders Online, Avalon Project.

### 3. Our Transcription

Once human-verified against #1 or #2.

### 4. Secondary Sources

Tennessee Encyclopedia, scholarly monographs, museum materials.

### 5. AI Summaries (Lowest Authority)

Never authoritative. Only for drafts.

### Conflict Resolution

When sources disagree:

1. Document the disagreement in verification.notes
2. Use the highest-authority source
3. Note alternatives consulted
4. Mark as appropriate status (disputed if significant)

---

## Emergency Procedures

### Discovered Error in Published Content

**Severity 1: Factual Error**

- Immediate correction
- Add correction note
- Do not delete original
- Document in commit

**Severity 2: Verification Status Wrong**

- Director approval required
- Full review before change
- Transparent documentation

**Severity 3: Offensive/Harmful Content**

- Immediate removal allowed
- Replace with placeholder
- Full review follows
- Document reasoning

### Source Link Rot

When external source URLs break:

1. Try archive.org Wayback Machine
2. Locate new canonical URL
3. Update source_url
4. Add note if content moved significantly
5. Low-risk change, quick review OK

---

## Audit Trail Requirements

### What Must Be Tracked

1. **All changes to verification status**
2. **All changes to source_count**
3. **All changes to primary source text**
4. **Person record modifications**
5. **Collection structure changes**

### How Tracking Works

1. **Git History** - Primary audit trail
2. **Commit Messages** - Human-readable changelog
3. **PR Descriptions** - Detailed justification
4. **verification.notes** - In-document history

### Retention

Git history is permanent. Never force-push to main. Never rewrite published history.

---

## Compliance Checklist

### Before Merging Any PR

- [ ] All IDs are unique and valid
- [ ] Date formats are ISO 8601
- [ ] References (author, collection, etc.) resolve
- [ ] verification.status matches source_count logic
- [ ] Cherokee content has perspective notes
- [ ] Citation block present for documents
- [ ] AI-assisted work has human verification
- [ ] Commit messages follow standards
- [ ] No direct edits to verified primary source text

### Monthly Archive Review

- [ ] Check for broken source URLs
- [ ] Review any disputed documents
- [ ] Verify document_count accuracy in collections
- [ ] Check for orphaned person records
- [ ] Review recent AI-assisted additions

---

## Changelog

| Version | Date       | Changes                    |
| ------- | ---------- | -------------------------- |
| 1.0     | 2026-01-30 | Initial governance release |

---

## Appendix: Decision Matrix

| Content Type           | AI Draft OK? | AI Edit OK?        | AI Approve? | Human Review   |
| ---------------------- | ------------ | ------------------ | ----------- | -------------- |
| Document transcription | Yes          | No                 | No          | Required       |
| Document metadata      | Yes          | Low-risk only      | No          | Required       |
| Document verification  | No           | No                 | No          | Director only  |
| Person biography       | Yes          | No                 | No          | Required       |
| Person metadata        | Yes          | Yes (non-Cherokee) | No          | Required       |
| Cherokee content       | Yes (draft)  | No                 | No          | Extra scrutiny |
| Collection description | Yes          | Yes                | No          | Required       |
| Code/types             | Yes          | Yes                | No          | Standard       |

---

_This governance framework ensures the Rocky Mount Digital Archive maintains scholarly integrity while enabling efficient, AI-assisted content creation. The key principle: AI helps, humans decide._
