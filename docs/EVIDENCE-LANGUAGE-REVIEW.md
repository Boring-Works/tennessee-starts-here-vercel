# Evidence Archive Language & Tone Review

**Date:** January 2026
**Reviewer:** Claude Code
**Status:** Issues Identified
**Template:** Severity ratings & suggested replacements using Tennessee Pride framing

---

## Executive Summary

The Evidence Room pages present well-documented primary sources but contain language patterns that warrant careful revision:

1. **"Frontier" language** used without critical context (frontier to whom?)
2. **Passive voice** obscuring Cherokee agency in treaty negotiations
3. **"Indian" terminology** (outdated, requires replacement)
4. **Missing historical context** on land cession and Cherokee displacement
5. **Settler-centric framing** in several descriptive passages

**Good news:** The site already centers Cherokee signatories and includes Treaty of Holston details. These revisions strengthen what's already solid work.

---

## Issues by Page

---

### 1. app/(main)/evidence/page.tsx

#### Issue 1.1: Frontier Status Symbol Language

**Location:** Line 294 (context attribute)

**Current text:**

```
"Glass windows were a status symbol on the frontier. This detail proves Rocky Mount was no rough cabin."
```

**Problem:**

- "Status symbol on the frontier" implies a generic frontier context
- Frames glass as unusual without acknowledging who lived there before
- "No rough cabin" uses contrast that could erase Cherokee architectural traditions
- "Frontier" is vague—frontier to whom? From whose perspective?

**Why it's problematic:** HIGH

- Erases that this was Cherokee territory
- Romanticizes European settlement markers as civilization markers
- Uses passive framing that hides agency

**Suggested replacement:**

```
"Glass windows were rare even in settler communities east of the mountains—most used oiled paper or wooden shutters. At Rocky Mount, they signaled federal authority and investment in a site chosen as the first constitutional capital west of Appalachia. This detail proves the seat of government was substantial, not provisional."
```

**Alternative (shorter):**

```
"Glass windows were a luxury in settler architecture of this era. Their presence signals that Rocky Mount was built to last—federal investment, not temporary settlement."
```

---

#### Issue 1.2: Frontier Settlers Language

**Location:** Lines 313-314

**Current text:**

```
"on the frontier, most settlers used oiled paper or wooden shutters. Glass windows signaled that Rocky Mount was a proper seat of government, not a crude outpost."
```

**Problem:**

- "Crude outpost" language suggests hierarchy of civilization
- Doesn't acknowledge Cherokee towns in the region (e.g., Chota, Tanasee)
- "Proper seat of government" only from settler perspective
- Uses "frontier" without source criticism

**Why it's problematic:** HIGH

- Erases existing Indigenous governance and settlements
- Assumes settler architecture = proper government
- Romanticizes European markers of "civilization"

**Suggested replacement:**

```
"Most settler structures in the region used oiled paper or wooden shutters. Glass windows at Rocky Mount signaled federal commitment to permanence—this was not temporary settlement, but a capital of a new American territory. The investment in quality was strategic."
```

---

#### Issue 1.3: Blount Appointed "for the frontier"

**Location:** Line 357

**Current text:**

```
"<p className={styles.sectionSubtitle}>Why Washington chose Blount for the frontier</p>"
```

**Problem:**

- "For the frontier" erases the Cherokee Nation context
- Suggests Blount's role was frontier settlement, not treaty negotiation
- Passive voice hides Washington's colonial strategy

**Why it's problematic:** MEDIUM

- Incomplete framing of political purpose
- Diminishes the significance of Cherokee treaty negotiations

**Suggested replacement:**

```
"Why Washington chose Blount for governing the Territory and negotiating with the Cherokee Nation"
```

OR (if shorter needed):

```
"Washington's Choice: Blount and the Territory"
```

---

### 2. app/(main)/evidence/documents/page.tsx

#### Issue 2.1: Frontier Framing in Introduction

**Location:** Line 52

**Current text:**

```
"correspondence to the first newspaper of the frontier."
```

**Problem:**

- Vague use of "frontier"
- Doesn't clarify what territory is being discussed
- Could obscure Cherokee perspective on "first" anything

**Why it's problematic:** LOW

- Minor framing issue
- Opportunity to be more precise about what "frontier" means

**Suggested replacement:**

```
"correspondence to the first newspaper of the Southwest Territory."
```

---

### 3. app/(main)/evidence/people/page.tsx

#### Issue 3.1: Outdated Terminology in Description

**Location:** Line 9

**Current text:**

```
"Cherokee leaders and historical figures connected to the Treaty of Holston and the founding of Tennessee."
```

**Problem:**

- Actually well-framed and doesn't have problematic language here
- Good precedent for the rest of the site

**Status:** ✓ ACCEPTABLE

---

#### Issue 3.2: Terminology in Meta Description

**Location:** Line 12

**Current text:**

```
"Cherokee leaders and historical figures from Tennessee's founding era."
```

**Problem:**

- Technically acceptable, but could be strengthened
- "Founding era" is neutral but could emphasize Cherokee agency more

**Why it's worth noting:** MEDIUM

- Opportunity to strengthen

**Suggested enhancement:**

```
"Cherokee leaders who negotiated the Treaty of Holston and other historical figures from Tennessee's founding era."
```

---

### 4. lib/copy/brand.ts

#### Issue 4.1: Frontier Governance Language

**Location:** Line 163

**Current text (in STOP_START dictionary):**

```
'Where the frontier became a nation': "Where Tennessee's government began",
```

**Problem:**

- "Frontier became a nation" erases Cherokee Nation
- Suggests frontier _is_ the U.S., not a colonial claim on Cherokee land
- The replacement is better but the old phrase exists in code

**Why it's problematic:** MEDIUM

- This is in the replacement dictionary (good!), but the problematic phrase is captured here
- Ensure this STOP phrase is caught in all editorial reviews

**Status:** ✓ Already flagged for replacement—monitor editorial process

---

### 5. lib/copy/narratives.ts

#### Issue 5.1: "Govern the frontier"

**Location:** Line 72

**Current text:**

```
"In 1790, President Washington sent him here to govern the frontier."
```

**Problem:**

- "Govern the frontier" frames this as empty territory
- Ignores that he was specifically sent to negotiate with the Cherokee Nation
- Passive voice about Washington's strategy

**Why it's problematic:** HIGH

- Misrepresents the primary diplomatic mission
- Erases Cherokee government Blount had to negotiate with

**Suggested replacement:**

```
"In 1790, President Washington appointed him Governor of the Southwest Territory and tasked him with establishing federal authority and conducting treaty negotiations with the Cherokee Nation."
```

OR (if shorter):

```
"In 1790, President Washington appointed him Governor of the Southwest Territory, where he negotiated the Treaty of Holston with the Cherokee Nation."
```

---

### 6. lib/documents/data.ts

#### Issue 6.1: "Indian" Terminology (Multiple instances)

**Location:** Lines 16, 112, 113, 370, 390

**Current text (examples):**

```
Line 16: "all the individuals composing the whole Cherokee nation of Indians"
Line 112: "Regulations for trade with Indian tribes"
Line 113: "Restraining hostile Indian activities"
Line 370: "Eastern Band of Cherokee Indians, and United Keetoowah Band of Cherokee Indians"
Line 390: "Superintendent of Indian Affairs for the Southern District"
```

**Problem:**

- "Indian" is outdated federal terminology from 1790 documents
- Mixing historical sources (where "Indian" appears) with modern editorial voice
- When modernizing, should use "Native American" or "Indigenous"
- Important distinction: "Indians" can appear in _quotes from primary sources_, but editorial text should use contemporary terminology

**Why it's problematic:** HIGH

- "Indian" is considered outdated and can carry colonial baggage
- Inconsistent with modern best practices for Indigenous terminology
- Federal title "Indian Affairs" is historical—should be contextualized or modernized in editorial text

**What to do:**

1. **In primary source quotes:** Keep historical terminology as-is, but add footnote context when first appearing

   ```
   Example: "Indian tribes" [Note: This reflects 18th-century U.S. federal terminology. The Cherokee Nation is the precise contemporary term.]
   ```

2. **In editorial/explanation text:** Replace with specific nation names or "Native American/Indigenous"

   ```
   Line 112 (editorial): "Regulations for trade with Native American nations"
   Line 113 (editorial): "Concerns about conflicts with Indigenous peoples in the region"
   ```

3. **For institutional titles:** Acknowledge the historical term while noting modern terminology
   ```
   Line 390: "Superintendent of Indian Affairs [a federal office; the modern equivalent is the Bureau of Indian Affairs, now the Bureau of Indigenous Affairs]"
   ```

**Suggested corrections:**

- **Line 16:** Keep in quote (from Treaty of Holston), but add context note when source first appears
- **Line 112:** Change to "Regulations for trade with Native American nations"
- **Line 113:** Change to "Concerns about regional security involving conflicts with Indigenous peoples"
- **Line 370:** Change to "Eastern Band of Cherokee Indians, and United Keetoowah Band of Cherokee Indians in the U.S. today"
  - _OR:_ "...and today these communities continue as the Cherokee Nation, Eastern Band of Cherokee Indians, and United Keetoowah Band of Cherokee Indians in the United States"
- **Line 390:** Change to "Superintendent of Indian Affairs [federal terminology for the office managing federal relations with Native American nations]"

**Severity:** HIGH

---

#### Issue 6.2: Passive Voice Obscuring Agency

**Location:** Line 328

**Current text:**

```
"Farragut found it 'not quite safe to proceed' due to threats from 'northern Indians' (likely Shawnee or Chickamauga factions)."
```

**Problem:**

- Passive framing: "threats from northern Indians"
- No context that these were responses to U.S. expansion
- Uses outdated term "Indians"
- Doesn't explain _why_ there was conflict

**Why it's problematic:** HIGH

- Erases Indigenous agency and legitimate resistance
- Frames Indigenous peoples as obstacles rather than defending their territory
- Missing context on U.S. colonial policy that created the conflict

**Suggested replacement:**

```
"Farragut found it unsafe to proceed due to resistance from Shawnee and Chickamauga peoples who disputed the territorial boundaries the U.S. was establishing. This reflects the tensions between federal expansion and Indigenous sovereignty in the region."
```

OR (more concise):

```
"Farragut encountered resistance from Shawnee and Chickamauga warriors defending their contested territory from U.S. expansion."
```

**Severity:** HIGH

---

#### Issue 6.3: Context Missing on Treaty Signatories

**Location:** Lines 61-62

**Current text:**

```
"<p>Signed by forty-two Cherokee chiefs and warriors, including Squollecuttah (Hanging Maw), Nenetooyah (Bloody Fellow), Kunoskeskie (John Watts), Chuquilatague (Doublehead), and Enoleh (Black Fox).</p>"
```

**Problem:**

- NO CONTEXT on what these leaders negotiated for
- NO MENTION of land cession (Cherokee gave up significant territory)
- NO ACKNOWLEDGMENT of power imbalance
- Reads as celebratory of their signatures without noting what was extracted

**Why it's problematic:** MEDIUM

- Incomplete historical record
- Could be read as if Cherokee chose to sign without pressure
- Missing context on what was conceded

**Suggested addition (new paragraph after signatories):**

```
"<p><strong>Context:</strong> The Treaty of Holston represented a significant negotiation between the United States and the Cherokee Nation. Under Article IV, the Cherokee ceded lands east of a defined boundary in exchange for $1,000 in goods annually—and later $1,500. This marked the beginning of systematic territorial reduction that would accelerate over the next two decades, culminating in the forced removal of the Cherokee Nation in 1838-1839.</p>"
```

**Severity:** MEDIUM

---

### 7. Collection Pages and Library (archive/collections/page.tsx, archive/library/page.tsx)

#### Issue 7.1: "Newspaper of the frontier"

**Location:** Line 52 (collections/page.tsx)

**Current text:**

```
"...to the first newspaper of the frontier."
```

**Problem:**

- Same "frontier" framing issue as Issue 2.1
- Vague geographically
- Doesn't credit the primary location as "Southwest Territory" or "Tennessee Territory"

**Why it's problematic:** LOW

- Minor vagueness
- Opportunity for clarity

**Suggested replacement:**

```
"...to the first newspaper of the Southwest Territory, the Knoxville Gazette."
```

---

## Issues in Supporting Files

### 8. lib/documents/data.ts - Context Sections

**Multiple instances of "frontier" in editorial notes**

Examples:

- Line 324: "On the frontier, glass windows were a rare luxury"
- Line 328: "conditions surrounding the new seat of government"

**Assessment:** These are contextual and less problematic, but should still be reviewed for:

- Whether "frontier" needs specification
- Whether they reinforce "empty land" framing

**Suggested approach:** In editorial review, scan all contextual passages for "frontier" and ensure each instance specifies what territory and from whose perspective.

---

## Summary Table

| Issue ID | File                 | Line                   | Phrase                          | Severity | Category                        | Suggested Fix                                      |
| -------- | -------------------- | ---------------------- | ------------------------------- | -------- | ------------------------------- | -------------------------------------------------- |
| 1.1      | evidence/page.tsx    | 294                    | "status symbol on the frontier" | HIGH     | Settler-centric framing         | Specify federal investment context                 |
| 1.2      | evidence/page.tsx    | 313-314                | "crude outpost"                 | HIGH     | Civilization hierarchy          | Focus on federal commitment                        |
| 1.3      | evidence/page.tsx    | 357                    | "for the frontier"              | MEDIUM   | Erases treaty context           | Add "and negotiating with Cherokee"                |
| 2.1      | documents/page.tsx   | 52                     | "newspaper of the frontier"     | LOW      | Vague geography                 | Specify "Southwest Territory"                      |
| 4.1      | copy/brand.ts        | 163                    | "frontier became a nation"      | MEDIUM   | Already flagged for replacement | Continue monitoring                                |
| 5.1      | narratives.ts        | 72                     | "govern the frontier"           | HIGH     | Erases primary mission          | Emphasize treaty negotiation role                  |
| 6.1      | documents/data.ts    | 16, 112, 113, 370, 390 | "Indian/Indians" terminology    | HIGH     | Outdated terminology            | Use "Cherokee," "Native American," or "Indigenous" |
| 6.2      | documents/data.ts    | 328                    | "threats from northern Indians" | HIGH     | Passive voice, missing context  | Reframe as "resistance to expansion"               |
| 6.3      | documents/data.ts    | 61-62                  | Signatories section             | MEDIUM   | Missing land cession context    | Add paragraph on treaty terms & consequences       |
| 7.1      | collections/page.tsx | 52                     | "newspaper of the frontier"     | LOW      | Vague geography                 | Specify territory name                             |

---

## Patterns to Address Site-Wide

### Pattern 1: "Frontier" Without Context

**Where it appears:** Multiple files
**What to do:**

- Search: `frontier` (context-dependent search)
- For each instance, ask: "Frontier to whom? From whose perspective?"
- If in settler context, add clarifying context OR replace with "Southwest Territory" or specific year/territory
- If in Cherokee context, reframe to emphasize their agency and perspective

### Pattern 2: Passive Voice in Conflict/Displacement

**Where it appears:** Treaty and diplomacy sections
**What to do:**

- Search for: "threat," "hostile," "conflict," "resistance"
- For each, check who's the subject (active voice)
- If Indigenous peoples are passive recipients, reframe to show their agency
- Add context on _why_ conflicts occurred (expansion, land claims, etc.)

### Pattern 3: "Indian" Terminology

**Where it appears:** documents/data.ts, copy files
**What to do:**

- Global search for `Indian` (case-sensitive)
- In primary source quotes: Keep as-is, add footnote on terminology
- In editorial text: Replace with specific nation names or "Native American/Indigenous"
- In historical titles: Add note acknowledging historical terminology

### Pattern 4: Missing Cherokee Perspective

**Where it appears:** Throughout
**What to do:**

- Review each section for balance: Are Cherokee mentioned only in relation to conflict/treaties/removal?
- If so, add: Cherokee governance structures, Cherokee leadership beyond signatories, Cherokee territory context
- Strengthen profiles on Cherokee signatories (already in progress per people/page.tsx)

---

## Recommended Review Workflow

### Phase 1: Immediate Fixes (HIGH severity)

1. **Issue 1.1:** Rewrite context for "Glass Windows" section
2. **Issue 1.2:** Revise "frontier" section about settlers and windows
3. **Issue 5.1:** Update narratives.ts line 72
4. **Issue 6.1:** Audit all "Indian/Indians" terminology
5. **Issue 6.2:** Rewrite passive voice section about "threats"

### Phase 2: Context Enhancements (MEDIUM severity)

1. **Issue 1.3:** Revise subtitles to emphasize treaty negotiation
2. **Issue 6.3:** Add paragraph on treaty terms and land cession
3. **Issue 7.1:** Specify "Southwest Territory" instead of "frontier"

### Phase 3: Site-Wide Audit (LOW severity + pattern review)

1. Search and review all "frontier" language
2. Audit passive voice in conflict/diplomacy sections
3. Review Cherokee representation across all pages
4. Add footnotes for historical terminology

---

## Testing & Verification

After fixes:

1. **Read aloud test:** Do sentences avoid settler-centric framing?
2. **Cherokee perspective test:** Does text acknowledge Cherokee agency and sovereignty?
3. **Terminology audit:** Are outdated terms (Indian) removed from editorial text?
4. **Passive voice check:** Are active verbs used for Indigenous agency?
5. **Context check:** Is "frontier" always contextualized or eliminated?

---

## Resources & References

**For terminology:**

- [Cherokee Nation official terminology](https://www.cherokee.org/)
- [Native American terminology guide](https://www.americanindian.si.edu/)
- [Treaty of Holston (DigiTreaties)](https://digitreaties.org/treaties/treaty/88697242/)

**For framing:**

- [NAGPRA best practices](https://www.nagpra.org/)
- [National Humanities Council language guidance](https://www.neh.gov/)
- [Academic press guide: Indigenous terminology](https://www.oup.com/)

**For context:**

- Cherokee Nation history timeline
- Southwest Territory documentation
- Land cession maps and records

---

## Next Steps

1. **Assign fixes:** Allocate HIGH-severity issues to editorial team
2. **Create tracking issue:** Link to this review in project management
3. **Schedule site-wide audit:** Plan Phase 3 review after immediate fixes
4. **Stakeholder review:** Consult with Cherokee historians/consultants if available
5. **Update COPY.md:** Add terminology and framing guidance to brand documentation
