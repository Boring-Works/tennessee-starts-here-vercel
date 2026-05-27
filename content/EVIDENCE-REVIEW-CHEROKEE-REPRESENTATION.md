# Cherokee Representation in Evidence Room: Comprehensive Review & Recommendations

**Date:** January 30, 2026
**Reviewer:** Claude Code Analysis
**Focus:** Cherokee voices, perspectives, cultural accuracy, respectful presentation
**Project:** Tennessee Starts Here Evidence Room

---

## EXECUTIVE SUMMARY

### Current State: Critical Imbalance

The Evidence Room presents a **0% Cherokee-authored representation** problem:

- **42 Cherokee leaders** signed the Treaty of Holston
- **Zero documents** authored by Cherokee appear in Evidence Room
- Cherokee appear only as **subjects** in documents written about them by U.S. officials
- **50 Cherokee biographical profiles** exist, but written by project team ABOUT Cherokee, not BY Cherokee

**Result:** Visitors cannot hear Cherokee voices articulating their own perspectives, demands, or experiences.

### Cultural Impact Assessment

| Aspect             | Current State                    | Assessment                         | Impact                                          |
| ------------------ | -------------------------------- | ---------------------------------- | ----------------------------------------------- |
| **Voice & Agency** | Cherokee as objects              | Perpetuates colonial narrative     | Visitors see Cherokee as passive subjects       |
| **Authenticity**   | Only U.S. perspectives preserved | Single-sided historical record     | Incomplete understanding of treaty negotiations |
| **Representation** | Names and signatures present     | Signatory status without voice     | Dignified in form, silenced in substance        |
| **Education**      | Documentary bias unstated        | Visitors unaware of missing voices | Reinforces erasure rather than acknowledging it |

### Strength: Honest Bias Disclosure (Page.tsx lines 647-686)

The Evidence Room DOES include a significant "Bias Disclosure" section:

- Acknowledges primary sources were written by white male officials
- Explicitly names missing voices: enslaved people, Cherokee communities, women
- Commits to presenting documents accurately while acknowledging whose stories they tell
- This is ethical infrastructure—but it's not enough without actual Cherokee voices

**Problem:** The bias disclosure acknowledges what's missing but doesn't include remedies to fill those gaps.

---

## PART 1: CURRENT CHEROKEE REPRESENTATION ASSESSMENT

### What Exists Today

#### A. Cherokee Signatory Profiles (50 total)

**5 FULL BIOGRAPHIES:**

- Hanging Maw (Squollecuttah) - Principal Chief, Overhill Cherokee
- Bloody Fellow (Nenetooyah) - War Chief & Diplomatic Spokesman
- John Watts (Kunoskeskie) - War Council Head, Chickamauga
- Doublehead (Chuquilatague) - Feared Warrior
- Black Fox (Enoleh) - Later Principal Chief (1801-1811)

**45 STUB BIOGRAPHIES:**

- Basic biographical information
- Town affiliations
- Signature references
- Missing: Voice, agency, perspectives

**Quality Assessment:**

- Cherokee names properly displayed (primary, with English translation)
- Family relationships documented
- Historical context provided
- BUT: All written about Cherokee AFTER-THE-FACT, filtered through U.S. sources

**Metadata Verification Notes (Lines in bloody-fellow.md & john-watts.md):**

```
verification:
  status: reconstructed
  notes: "No Cherokee-authored documents about [name] have been identified
          in archives. This biography reflects how he was perceived by
          U.S. officials and settlers."
```

**This is honest.** But it's also a confession of absence.

#### B. Treaty of Holston Presentation (Page.tsx lines 414-465)

**Current Treatment:**

- 5 featured signatories displayed with names, roles, significance
- 37 others grouped together ("and thirty-seven more")
- SignerCard component (lines 95-111) shows: Cherokee name, English name, role
- Link to DigiTreaties manuscript allows visitors to see actual signatures

**Strength:**

- Cherokee names centered (displayed first in SignerCard)
- Signatories presented as individuals with documented roles
- CherokeeSignatories component (analyzed below) treats this as memorial

**Weakness:**

- These are names on a U.S. government document
- Visitors see Cherokee signatures but not what Cherokee said about signing
- No context about how Cherokee leaders negotiated, what they wanted, what they lost

#### C. Brand Copy Analysis (narratives.ts)

**How Cherokee Appears in Marketing Copy:**

1. **Mystery Narrative (Line 25):**

   > "negotiated the Treaty of Holston with 42 Cherokee leaders"
   - Cherokee mentioned but passive voice
   - No sense of who these 42 people were
   - No indication of what treaty meant to them

2. **First 250 Discovery Moment (Lines 178-185):**

   > "In July 1791, forty-two Cherokee chiefs arrived to negotiate the Treaty of Holston. Protocol demanded hospitality before formal negotiations."

   **Assessment:** This is better—acknowledges Cherokee as participants, notes they "negotiated." But:
   - Still vague about their identities (just "forty-two")
   - Focuses on settler hospitality, not Cherokee expectations
   - No indication these were sovereign leaders making demands

3. **Heritage Meal Context (Lines 169-177):**

   > "Barsheba Cobb fed the territorial government. Governor Blount, officials, surveyors, and forty-two Cherokee chiefs plus their attendants all ate meals prepared at Rocky Mount."

   **Assessment:** Humanizing (acknowledges they needed food), but:
   - Centers settler woman's labor, not Cherokee presence
   - Numbers them as guests in settler home, not sovereign diplomats at negotiation
   - Implies hospitality was generous gift, not diplomatic protocol

---

### What's Completely Missing

#### Document Types (From CHEROKEE-DOCUMENTS-RECOMMENDATIONS.md Analysis):

**ZERO Cherokee-Authored Sources Present:**

1. **Direct Cherokee Letters** (Confirmed to Exist)
   - Bloody Fellow to William Blount, September 10, 1792 (Vanderbilt)
   - John Watts Speech on Peace & Boundaries, December 22, 1796 (War Dept Papers)
   - The Glass (Ta'gwadihi) Correspondence, September 13, 1792 (Vanderbilt)
   - Cherokee Headmen to Governor Blount, January 28, 1791 (Digital Library of Georgia)

2. **Cherokee Delegation Speeches** (Documented, Partially Accessible)
   - Philadelphia January 1792 speeches to Washington & Knox (Founders Online—FREE)
   - Cherokee articulating positions, complaints, demands
   - Nenetooyah/Bloody Fellow speaking on behalf of delegation
   - Documented translation verification (interpreter James Carey)

3. **Cherokee Complaints & Petitions**
   - War Department records on Cherokee demands for boundary enforcement
   - Letters documenting treaty violations from Cherokee perspective
   - Requests for federal intervention against settler encroachment

4. **Oral Histories**
   - Unknown status—has Cherokee Nation documented oral traditions?
   - Possible family stories about Treaty signatories
   - Cultural interpretations of what treaty meant to Cherokee Nation

#### What This Means:

**Cherokee Nation members reading Evidence Room cannot:**

- Hear their ancestors speak in their own words
- Understand what treaty signers were negotiating for
- See how Cherokee leaders asserted sovereignty and agency
- Access Cherokee perspectives on broken promises
- Learn how oral traditions understand this period

**Visitors cannot:**

- Distinguish between Cherokee positions and U.S. interpretations
- Understand what Cherokee demanded vs. what they received
- Recognize Cherokee as active negotiators (not passive subjects)
- See evidence of treaty violations from Cherokee perspective

---

## PART 2: CULTURAL SENSITIVITY ASSESSMENT

### Strengths

#### A. Respectful Design Elements

**Component: CherokeeSignatories.tsx (Line 53-173)**

This component demonstrates sophisticated cultural respect:

1. **Cherokee Names Centered (Lines 90-91, 134-135)**

   ```tsx
   {
     person.name_cherokee && <span className="featuredCherokeeName">{person.name_cherokee}</span>
   }
   ```

   - Cherokee name presented first, prominently
   - English translation follows as secondary identifier
   - Honors Cherokee naming practices

2. **Memorial Treatment (Line 67-72)**

   ```tsx
   <section className="cherokeeMemorial" aria-labelledby="memorial-heading">
     <h2 id="memorial-heading" className="memorialTitle">
       The Forty-Two
     </h2>
   ```

   - Calls this a "memorial" not an "archive" or "list"
   - Language reflects dignity: "Forty-Two" as collective identity
   - Acknowledges mortality: "Some would be dead within five years"

3. **Contextual Human Stories (Lines 22-29)**

   ```javascript
   const FEATURED_CONTEXT: Record<string, string> = {
     'hanging-maw':
       'Nearly killed by settlers after making peace. Continued advocating for peace anyway.',
     'bloody-fellow':
       'Renamed "Clear Sky" by Washington. Transformed from war chief to principal chief.',
   ```

   - Each person gets human context, not just facts
   - Shows agency and difficult choices
   - Acknowledges personal cost of diplomacy

4. **Bias Disclosure Integrity (Page.tsx 647-686)**
   - Explicitly names whose stories are MISSING
   - Doesn't pretend to be comprehensive
   - Invites readers to question single perspective
   - Models historical honesty

#### B. Technical Accessibility

- Proper semantic HTML (role="list", aria-labelledby)
- Screen reader support for Cherokee/English names
- Mobile guide navigation (MOBILE_GUIDE_SECTIONS)
- Document linking to primary sources

### Weaknesses

#### A. Representation Imbalance

**Problem: "Respectful Silence"**

You can present someone's name with perfect respect while silencing their voice.

Current approach:

- ✓ Cherokee names displayed beautifully
- ✓ Signatures visible on treaty manuscript
- ✓ Biographical context provided
- ✗ **No Cherokee words in entire Evidence Room**
- ✗ **No record of what Cherokee said to each other**
- ✗ **No evidence Cherokee had positions beyond signatures**

**Cultural Impact:** Respectful form + silenced substance = symbolic inclusion without actual voice.

#### B. Incomplete Signatory Information

**What We Could Know About Each Signatory (But Don't):**

For each of 42 Cherokee leaders, we have access to:

- Their Cherokee name AND its meaning
- Their historical role and town
- Their family relationships
- Their faction affiliation (peace vs. war)
- Their later history and legacy

What's missing:

- What they said in negotiations
- What they demanded from treaty
- How they explained treaty to their people
- Whether they considered it a victory or loss
- What their descendants say about them today

**Example: John Watts**

Current profile mentions:

- He was a skilled strategist
- He led major military operation (1792)
- He negotiated peace agreement (1794)
- In 1796, he demanded formal boundary survey

**What's missing:**

- Direct quote from his December 1796 speech TO the U.S. government
- What his speech reveals about Cherokee interpretation of treaty
- Evidence that Cherokee held U.S. to account for terms

**The speech exists (War Dept Papers) and says:**

> "Peace has been faithfully observed by his Nation... I would insist on a formal boundary to be surveyed... Cherokee envoys must be present to verify the line"

**Why this matters:**

- Shows Cherokee as treaty enforcers, not passive signers
- Demonstrates Cherokee understanding of legal obligations
- Proves Cherokee tracked violations
- Reveals Cherokee agency 5 years after signing

---

## PART 3: CENTERING CHEROKEE VOICES - STRATEGIC RECOMMENDATIONS

### Tier 1: Immediate Actions (No Budget, 2-4 Weeks)

**Goal:** Add Cherokee-authorized documents already located and digitized

#### 1. Acquire & Integrate Free Documents

**Action A: Cherokee Delegation Speeches (Philadelphia, January 1792)**

- **Status:** Already digitized at Founders Online (FREE)
- **Content:** Multiple Cherokee leaders speaking to President Washington and Secretary of War
- **Significance:** Cherokee traveling to capital to protest treaty, successfully negotiating improvement
- **Integration:**
  - Create new Evidence Room entry: "Cherokee Perspectives on Treaty Terms"
  - Full transcripts of delegation speeches
  - Context: Who came (Bloody Fellow, Kingfisher, Northward, Disturber, Prince)
  - Outcome: Cherokee won $500 increase in annual payment
  - Link to each signer's profile

**Action B: John Watts December 1796 Speech**

- **Status:** Digitized at Papers of War Department (FREE)
- **Content:** Cherokee leader demanding boundary enforcement, surveying methods, verification
- **Significance:** Shows Cherokee holding U.S. to account 5 years after treaty
- **Integration:**
  - Add to John Watts profile with full quote
  - Create Evidence Room section: "Treaty Enforcement: Cherokee Perspective"
  - Show timeline: 1791 treaty signed → 1796 enforcement demanded
  - Context: Settlers violating boundary, Cherokee taking diplomatic action

**Action C: Download & Analyze Existing References**

- Search Founders Online for all Cherokee delegation documentation
- Extract Cherokee quotes from Knox-Washington correspondence
- Note translation methods (James Carey interpreter verification)

**Cost:** $0
**Timeline:** 2-4 weeks
**Impact:** Evidence Room goes from 0% to ~10% Cherokee authorship

#### 2. Update Cherokee Profiles with Their Words

**For Each Major Signatory, Add Section: "In Their Words"**

Example: Bloody Fellow profile should include:

> **In Their Words**
>
> In January 1792, just six months after signing the Treaty of Holston, Bloody Fellow led a Cherokee delegation to Philadelphia. He addressed President George Washington directly, speaking on behalf of Cherokee leaders who had concerns about treaty implementation:
>
> [Direct quote from delegation speech]
>
> This journey—traveling by ship to the capital—demonstrated Cherokee diplomatic sophistication and willingness to engage the U.S. government to enforce their understanding of the treaty terms. Bloody Fellow's presence showed Cherokee Nations could initiate foreign policy, not simply respond to U.S. demands.

**For John Watts, Black Fox, others: Add their 1796 perspectives**

**Cost:** $0 (research only)
**Timeline:** 1-2 weeks
**Impact:** Profiles shift from "about" to "with" voice

#### 3. Create "Cherokee Perspectives" Evidence Room Section

**New Navigation Card (Add to Evidence Page line 247):**

```
<a href="#cherokee-perspectives" className={styles.heroNavCard}>
  <span className={styles.heroNavIcon}>★</span>
  <span className={styles.heroNavName}>Cherokee Perspectives</span>
</a>
```

**Content Structure:**

1. **Introduction** (100 words)
   - Explain: Cherokee-authored documents from 1790s are rare but exist
   - Frame: These voices show Cherokee as negotiators and treaty enforcers
   - Acknowledge: Translation through interpreters (but still Cherokee voices)

2. **Delegation Speeches (1792)**
   - Full transcripts
   - Context about journey to Philadelphia
   - Outcome: Successfully negotiated treaty revision

3. **Boundary Enforcement Demands (1796)**
   - John Watts speech
   - Shows Cherokee tracking violations
   - Demands for surveying oversight

4. **Missing Voices Section**
   - Acknowledge: What documents we wish existed but don't
   - Explain: Cherokee syllabary not invented until 1820s (Sequoyah)
   - Note: Oral traditions may preserve more than written sources
   - Invite: Cherokee Nation partnership to fill gaps

**Cost:** $0-500 (minimal research)
**Timeline:** 3 weeks
**Impact:** Evidence Room acknowledges and begins to address imbalance

---

### Tier 2: Medium-Term Expansion (3 Months, $2K-5K Budget)

**Goal:** Acquire confirmed Cherokee-authored documents

#### 4. Contact Archives for Known Documents

**A. Vanderbilt University Special Collections**

- **Email:** special.collections@vanderbilt.edu
- **Request:** Bloody Fellow letter (September 10, 1792)
- **Reference:** https://collections.library.vanderbilt.edu/repositories/2/archival_objects/322787
- **Cost:** $50-100 (reproduction/high-res scan)
- **Content:** Cherokee leader writing to U.S. Governor during conflict period
- **Significance:** Shows Cherokee initiating correspondence, articulating positions

**B. Digital Library of Georgia**

- **Email:** dlg@uga.edu
- **Request:** Cherokee Headmen letter (January 28, 1791)
- **Reference:** https://dlg.usg.edu/record/dlg_zlna_krc004
- **Cost:** $25-50 (if not freely available)
- **Content:** Pre-treaty letter about Cherokee land sale concerns
- **Significance:** Shows Cherokee proactive diplomacy before Holston treaty

**C. Verify Additional Sources**

- Check University of Tennessee Digital Collections for additional Cherokee documents
- Review Gilcrease Museum (Tulsa) Cherokee manuscript holdings
- Search Tennessee State Library and Archives (Penelope Johnson Allen Cherokee Collection)

**Integration Strategy:**

- Create Evidence Room entries for each document
- Add to respective signatory profiles
- Update "Cherokee Perspectives" section with new documents
- Link to archive sources for verification

**Cost:** $2K-5K (research assistant + reproduction fees)
**Timeline:** 4-8 weeks
**Impact:** Evidence Room achieves 15-20% Cherokee authorship

---

### Tier 3: Strategic Long-Term Partnership (6-12 Months, $12K-45K)

**Goal:** Deep archival research + authentic Cherokee Nation partnership

#### 5. Professional Archival Research

**Hire:** Native American archival specialist
**Focus:** Complete Cherokee-authored document survey 1790-1800
**Locations:**

- National Archives (Washington D.C.) - Record Group 75, War Department
- Tennessee State Library and Archives (Nashville)
- Gilcrease Museum (Tulsa)
- Additional Vanderbilt, UT searches

**Expected Findings:** 15-30 additional Cherokee documents
**Timeline:** 6-9 months
**Cost:** $10K-20K (professional researcher + travel + reproduction)

**Output:**

- Comprehensive catalog of Cherokee-authored sources
- Digital copies of all documents
- Research report on findings and gaps
- Recommendations for Evidence Room integration

#### 6. Cherokee Nation Consultation & Partnership

**Formal Tribal Consultation:**

- Contact Cherokee Nation Cultural Resources (Tahlequah, Oklahoma)
- Contact Eastern Band Historical Preservation (Cherokee, North Carolina)
- Propose partnership for accurate Cherokee representation

**Cherokee Nation Engagement:**

1. **Archival Access** - Search Cherokee Nation Archives for 1790s materials
2. **Oral History Inquiry** - Do oral traditions about Treaty signatories survive?
3. **Scholar Commission** - Hire Cherokee historian to write perspective essay
4. **Review Process** - Cherokee Nation reviews all Cherokee-related content
5. **Ongoing Partnership** - Annual consultation on Cherokee content

**Potential Partners:**

- **Dr. Daniel Heath Justice** (Cherokee Nation citizen, UBC) - Cherokee literary history
- **Dr. Jace Weaver** (Cherokee Nation citizen, UGA) - Cherokee sovereignty and treaties
- **Cherokee Nation Cultural Resources Office** - Institutional partnership

**Commissioning Essay:**

- 3,000-word perspective essay on Treaty of Holston from Cherokee worldview
- Topics: Cherokee understanding of land, sovereignty, negotiating strategy
- Honorarium: $5,000-7,500

**Cost:** $12K-45K (consultation + commission + oral history if applicable)
**Timeline:** 6-12 months
**Impact:** Evidence Room achieves 25-40% Cherokee authorship with tribal endorsement

---

## PART 4: HOW TO CENTER CHEROKEE VOICES

### Language Shifts Required

| Current Language                                                | Problem                  | Reframed For Voice                                                                                                                                        |
| --------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "negotiated the Treaty of Holston **with** 42 Cherokee leaders" | Passive, unclear agency  | "42 Cherokee leaders **negotiated** the Treaty of Holston to establish boundaries and preserve remaining lands"                                           |
| "Cherokee chiefs were present"                                  | Objects in scene         | "Cherokee leaders **traveled to Rocky Mount** to negotiate territorial boundaries"                                                                        |
| "Blount made peace with Cherokee"                               | Settler achievement      | "Cherokee and American leaders **agreed** to the Treaty of Holston after weeks of negotiation"                                                            |
| "Barsheba Cobb fed forty-two Cherokee chiefs"                   | Settler generosity focus | "The **Cherokee delegation required diplomatic hospitality**—meals, lodging, formal protocol—to conduct treaty negotiations as sovereign representatives" |
| "Signatories on the treaty"                                     | Legal status only        | "These Cherokee leaders **signed the treaty to**... [their specific objectives]"                                                                          |

### Evidence Room Navigation Changes

**Add Section in Evidence Page (After "Treaty Signers" link):**

```tsx
<a href="#cherokee-perspectives" className={styles.heroNavCard}>
  <span className={styles.heroNavIcon}>✦</span>
  <span className={styles.heroNavName}>Cherokee Perspectives</span>
</a>
```

**Create New Hero Nav Card for Direct Access to:**

- Cherokee delegation speeches
- Boundary enforcement demands
- Missing voices acknowledgment
- Cherokee Nation partnership update

### Profile Presentation Changes

**For Each Signatory, Add Three Elements:**

1. **Primary Cherokee Name Display**
   - Make English name secondary (already doing this)
   - Add pronunciation guide
   - Add meaning/significance of name

2. **"In Their Words" Section**
   - Direct quotes from letters or speeches
   - Translation notes (explain interpreter role)
   - Historical context for statement

3. **Legacy Connection**
   - Which Cherokee Nation carries this person's name forward?
   - Contemporary descendants if known
   - What this person is remembered for in Cherokee tradition

### Marketing Copy Revisions

**In narratives.ts, Update DISCOVERY_MOMENTS:**

**Current (doorCherokeeChiefs, lines 178-185):**

> In July 1791, forty-two Cherokee chiefs arrived to negotiate the Treaty of Holston. Protocol demanded hospitality before formal negotiations.

**Revised for Voice:**

> In July 1791, forty-two Cherokee leaders traveled from towns across their nation to negotiate the Treaty of Holston. These were sovereign representatives—diplomats and warriors who risked their lives to argue for territorial boundaries, annuities, and trading rights. They negotiated for weeks. They won concessions. They signed a treaty to protect remaining Cherokee lands. Their names are preserved.

**Current (doorCherokeeChiefs "Why It Matters"):**

> The Cherokee delegation negotiated as a sovereign nation. Their presence here shaped the borders of what would become Tennessee.

**Enhanced for Voice:**

> The Cherokee delegation negotiated as a sovereign nation. They came with demands: boundary lines to be honored, settlers to be removed from Cherokee territory, federal government to enforce treaty terms. Some demands succeeded. Some failed. Either way, these leaders shaped the borders of what would become Tennessee—not as passive signers, but as active negotiators whose decisions protected their people.

---

## PART 5: PARTNERSHIP RECOMMENDATIONS WITH CHEROKEE NATION

### Why Partnership Is Essential

1. **Authenticity:** Only Cherokee Nation can verify accuracy of Cherokee representation
2. **Respect:** Tribal consultation honors Cherokee sovereignty
3. **Depth:** Access to oral traditions, archival materials, scholarly perspective
4. **Authority:** Cherokee Nation endorsement gives Evidence Room credibility
5. **Reciprocity:** Partnership benefits Cherokee Nation (representation, education, visibility)

### Two-Track Approach

#### Track A: Institutional Partnership

**Contact:** Cherokee Nation Cultural Resources Office
**Address:** 21192 S. Keeler Drive, Park Hill, OK 74451
**Phone:** (918) 453-5000
**Website:** https://www.cherokee.org

**Proposal:**

> Tennessee Starts Here is developing an Evidence Room featuring primary documents about the Treaty of Holston (1791) and territorial governance. We recognize that Cherokee voices are underrepresented in our current archive. We are seeking a formal partnership with Cherokee Nation to:
>
> 1. Review all Cherokee-related content for accuracy and respectful representation
> 2. Access Cherokee Nation archives for 1790s materials (if available)
> 3. Commission a Cherokee scholar to write interpretive essays on Treaty significance
> 4. Develop "Missing Voices" sections acknowledging documentary gaps
> 5. Establish ongoing consultation process for any future Cherokee-related content

**Expected Outcomes:**

- Cherokee Nation approval of Cherokee representation
- Potential new documents from Cherokee Nation Archives
- Scholar essay on Treaty from Cherokee perspective
- Formal acknowledgment of Cherokee Nation partnership on Evidence Room

**Timeline:** 6-12 months
**Budget:** $15K-25K

#### Track B: Scholarly Partnership

**Potential Commissioners:**

- **Dr. Daniel Heath Justice** (Cherokee Nation citizen, University of British Columbia)
- **Dr. Jace Weaver** (Cherokee Nation citizen, University of Georgia)

**Commission Scope:**

- 3,000-word essay on Treaty of Holston from Cherokee historical perspective
- Topics:
  - What Treaty meant to Cherokee Nation (strategic assessment)
  - Cherokee understanding of land, sovereignty, sovereignty post-1791
  - Whose interests Treaty served and whose it harmed
  - Long-term consequences for Cherokee people
  - What archive reveals about Cherokee diplomatic skill
- Honorarium: $5,000-7,500

**Integration:**

- Publish as special essay section in Evidence Room
- Byline with author credentials and Cherokee Nation affiliation
- Link from all Cherokee-related sections
- Model for how Evidence Room centers Native scholarship

---

## PART 6: SPECIFIC IMPROVEMENTS NEEDED (PRIORITIZED)

### IMMEDIATE (Week 1-2)

- [ ] Download Cherokee delegation speeches from Founders Online (FREE)
- [ ] Create Evidence Room entry: "Cherokee Delegation to Philadelphia (1792)"
- [ ] Add direct quotes to John Watts, Bloody Fellow, Hanging Maw profiles
- [ ] Create "In Their Words" section for top 5 signatories

### SHORT-TERM (Month 1-3, $2K-5K)

- [ ] Contact Vanderbilt for Bloody Fellow letter reproduction
- [ ] Contact Digital Library of Georgia for Cherokee headmen letter
- [ ] Update Evidence Page with "Cherokee Perspectives" navigation card
- [ ] Create "Missing Voices" section explaining archival gaps
- [ ] Add interpreter translation notes to all Cherokee documents

### MEDIUM-TERM (Month 3-6, $5K-10K)

- [ ] Hire research assistant for systematic archival search
- [ ] Initiate Cherokee Nation consultation (formal letter/call)
- [ ] Begin Cherokee scholar commission process
- [ ] Update brand copy (narratives.ts) to center Cherokee agency
- [ ] Revise DISCOVERY_MOMENTS to include Cherokee decision-making

### LONG-TERM (Month 6-12, $15K-45K)

- [ ] Complete professional archival research (15-30 new documents)
- [ ] Finalize Cherokee Nation partnership agreement
- [ ] Publish commissioned Cherokee scholar essay
- [ ] Implement Cherokee Nation review process
- [ ] Create comprehensive "Cherokee Perspectives" section
- [ ] Establish ongoing partnership protocol
- [ ] Apply for NEH grants to sustain and expand

---

## PART 7: WHAT SUCCESS LOOKS LIKE

### Outcome Metrics

#### Current State

- 0% Cherokee-authored documents
- 100% U.S.-authored documents
- Cherokee appear as objects/subjects in others' narratives

#### Phase 1 Success (2-4 weeks)

- 3-5 Cherokee documents integrated (speeches, letters)
- "In Their Words" sections added to major profiles
- New "Cherokee Perspectives" Evidence Room section
- "Missing Voices" acknowledgment section
- **Result: ~10% Cherokee authorship**

#### Phase 2 Success (3-6 months)

- 8-12 Cherokee documents acquired
- All major signatories have direct quotes
- Updated brand copy emphasizes Cherokee agency
- Active Cherokee Nation outreach
- **Result: ~15-20% Cherokee authorship**

#### Phase 3 Success (6-12 months)

- 20-30+ Cherokee documents in archive
- Cherokee Nation partnership formalized
- Commissioned Cherokee scholar essay published
- Cherokee Nation review process integrated
- Ongoing consultation agreement
- **Result: ~25-40% Cherokee authorship with tribal endorsement**

### Visitor Experience Transformation

**Before:**

- "Okay, 42 Cherokee signed a treaty. I saw their names. What did they get out of it?"

**After:**

- "I read what Cherokee leaders said about the treaty. They negotiated boundaries, won an increase in payment, demanded the U.S. enforce terms. They were sovereign diplomats, not victims."

---

## PART 8: RISK MITIGATION

### Risk 1: Cherokee Nation Declines Partnership

**Mitigation:**

- Approach Eastern Band Cherokee as alternative
- Commission Cherokee scholars independently
- Continue archival research
- Add disclaimer about partnership status

### Risk 2: Very Few Documents Exist

**Mitigation:**

- Accept realistic scenarios (10-15 documents likely)
- Amplify existing documents (deep analysis vs. quantity)
- Use contemporary Cherokee scholarship to fill gaps
- Be transparent about limitations

### Risk 3: Budget Constraints

**Mitigation:**

- Phase 1 is essential and low-cost ($0-500)
- Phase 2 can use graduate student researcher (cheaper)
- Phase 3 can be partial (skip oral history if needed)
- Seek grants: NEH, Cherokee Nation Education, Tennessee Historical Commission

### Risk 4: Translation Quality Questions

**Mitigation:**

- Document translator role thoroughly
- Explain historical limitations (pre-Sequoyah syllabary)
- Be transparent: "This is Cherokee voice filtered through English translation"
- Frame as "best available access to Cherokee perspectives"

---

## PART 9: GRANT OPPORTUNITIES

### Potential Funding Sources

| Grant                                | Amount    | Fit                                   | Timeline        |
| ------------------------------------ | --------- | ------------------------------------- | --------------- |
| **NEH Public Humanities**            | $30K-100K | Cherokee voice integration project    | Annual deadline |
| **NPS NAGPRA Consultation Grants**   | $10K-50K  | Tribal consultation, documentation    | Variable        |
| **Tennessee Historical Commission**  | Varies    | Historical research, public history   | Variable        |
| **Cherokee Nation Education Grants** | Varies    | Educational content, Cherokee history | Variable        |

**Recommended:** Apply to NEH Public Humanities with comprehensive Phase 1-3 plan. This is exactly what NEH funds—underrepresented perspectives in public digital projects.

---

## PART 10: ACTION PLAN SUMMARY

### Start This Week

1. Email Vanderbilt: Request Bloody Fellow letter (Week 1)
2. Download Cherokee delegation speeches (Week 1)
3. Create Evidence Room entry template (Week 2)
4. Add direct quotes to 5 signatory profiles (Week 2)

### Start This Month

5. Contact Digital Library of Georgia (Week 2)
6. Add "Cherokee Perspectives" navigation section (Week 3)
7. Create "Missing Voices" acknowledgment (Week 3)
8. Update brand copy for agency/voice (Week 4)

### Start Next Quarter

9. Hire research assistant for archival search (Month 2)
10. Draft formal Cherokee Nation partnership proposal (Month 2)
11. Begin Cherokee scholar commission process (Month 3)
12. Implement Cherokee Nation review process (Month 3)

### Start Next Year

13. Complete professional archival research
14. Finalize Cherokee Nation partnership
15. Publish commissioned Cherokee scholarship
16. Apply for NEH grants

---

## CONCLUSION

### The Case for Action

**Current Reality:**

- Cherokee-authored documents from 1790s **exist** and are **locatable**
- Archives are **accessible** (some free online)
- Cost is **reasonable** ($2K-5K for quick wins, $50K for comprehensive)
- Timeline is **achievable** (immediate actions take 2-4 weeks)

**Therefore:**
Tennessee Starts Here has **ethical obligation and practical ability** to include Cherokee voices.

### What's Possible

Evidence Room can become a **model project** for:

- Balanced representation in historical interpretation
- Ethical archival research including marginalized voices
- Partnership between historic sites and Native nations
- Digital humanities best practices for inclusive history

### The Opportunity

When Cherokee descendants visit Evidence Room, will they:

- See their ancestors silenced? OR
- Hear their ancestors speak?

The documents exist. The path is clear. The moment is now.

---

## APPENDICES

### A. Document Acquisition Checklist

| Document                                | Archive            | Status    | Action   | Cost    |
| --------------------------------------- | ------------------ | --------- | -------- | ------- |
| Bloody Fellow letter (Sept 1792)        | Vanderbilt         | Confirmed | Email    | $50-100 |
| John Watts speech (Dec 1796)            | War Dept Papers    | Confirmed | Download | Free    |
| Cherokee delegation speeches (Jan 1792) | Founders Online    | Confirmed | Download | Free    |
| Cherokee headmen letter (Jan 1791)      | Digital Library GA | Confirmed | Email    | $25-50  |
| The Glass correspondence (Sept 1792)    | Vanderbilt         | Verify    | Research | TBD     |

### B. Contact Information

**Archives:**

- Vanderbilt University Special Collections: special.collections@vanderbilt.edu | (615) 322-2807
- Papers of the War Department: wardepartmentpapers.org
- Digital Library of Georgia: dlg@uga.edu
- Founders Online: founders.archives.gov

**Cherokee Nation:**

- Cherokee Nation Cultural Resources: (918) 453-5000 | P.O. Box 948, Tahlequah, OK 74465
- Eastern Band: Museum of Cherokee People, (828) 497-3481

**Scholars:**

- Dr. Daniel Heath Justice: University of British Columbia
- Dr. Jace Weaver: University of Georgia

### C. Recommended Reading

**Cherokee Perspectives (1790s):**

- Perdue & Green: _The Cherokee Nation and the Trail of Tears_ (2007)
- McLoughlin: _Cherokee Renascence in the New Republic_ (1986)
- Justice: _Our Fire Survives the Storm_ (2006)
- Weaver: _Red Clay, 1835_ (2019)

---

**Report Prepared By:** Claude Code Analysis
**Date:** January 30, 2026
**Status:** Ready for Implementation
