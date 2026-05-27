# Advisory Board Debate: Homepage "Wow Factor" for Evidence Room Launch

**Date:** January 30, 2026
**Topic:** Homepage improvements and wow factor for Evidence Room beta launch
**Facilitator:** Strategic Advisory Board
**Constraints:** $0 budget, 2-4 hours implementation, beta philosophy (no overpromising), sustainable

---

## Current Homepage Analysis

The homepage currently flows through these sections:

1. **Hero** - "The Constitution's First Test" with commemorative card
2. **Quick Facts Bar** - Hours, admission, distance
3. **Original Seven Counties** - Interactive map
4. **Audience Router** - Educators, Groups, Our Story, Support
5. **2026 Commemorative Section** - Tennessee 230 / America 250
6. **Document Teaser** - "See the Evidence" with 2 featured quotes
7. **Events Calendar** - Next event + category counts
8. **Plan Your Visit** - Location, hours, admission
9. **Indigenous Acknowledgment**
10. **Final CTA** - Washington quote + closing

The Evidence Room teaser (DocumentTeaser component) currently shows:

- Blount's "Glass Windows" letter
- Washington's Treaty Proclamation

---

## Part 1: Individual Advisor Proposals

### Dr. Margaret Chen (Strategic Alignment)

**Proposal 1: "The Question That Started It All" Hero Treatment**

Replace or augment the commemorative card in the hero with Washington's question: "Where ought the Governor to reside?" Make this the intellectual hook that leads visitors into the Evidence Room.

_Rationale:_ This creates a through-line from homepage to Evidence Room. The visitor lands with a question, and the Evidence Room provides the answer. It aligns perfectly with museum mission of making history accessible through narrative.

**Proposal 2: Dynamic "Evidence Room: Beta" Badge**

Add a subtle, elegant badge in the hero or navigation that says "Evidence Room - Now Open" with a small beta indicator. Similar to how tech products announce new features, but period-appropriate.

_Rationale:_ Signals something new without overpromising. Beta language sets appropriate expectations while creating curiosity.

---

### James Torres (Risk Assessment)

**Proposal 1: Animated Quote Rotation in DocumentTeaser**

Instead of static quotes, create a gentle rotation between 3-4 primary source quotes. Each quote links to its full document in the Evidence Room. No API calls, no external dependencies - just CSS animation.

_Rationale:_ Low risk, pure frontend. Creates movement and discovery without requiring any backend work. If it breaks, the fallback is the current static display.

**Proposal 2: "Verified History" Trust Signal**

Add a small seal or badge near the Evidence Room link that says "42 Primary Sources" or "Verified by Original Documents." This is a trust signal that differentiates from sites making unsubstantiated claims.

_Rationale:_ Builds credibility without making promises about completeness. The number can grow over time. Concrete, not aspirational.

---

### Dr. Robert Whitehorse (Cherokee Representation)

**Proposal 1: Cherokee Voice in the Document Teaser**

Currently the DocumentTeaser shows only Blount and Washington. Add a third featured card: A Cherokee signer from the Treaty of Holston. This could feature Hanging Maw (Squollecuttah), with a brief note about his role.

_Rationale:_ The Evidence Room already features the 42 signatories. Surfacing Cherokee presence on the homepage signals that this isn't just a settler narrative. This is essential for scholarly credibility and ethical storytelling.

**Proposal 2: Indigenous Acknowledgment Elevation**

Move the Indigenous Acknowledgment section higher on the page - perhaps after the Original Seven Counties map. The map shows the territory; the acknowledgment provides crucial context about whose land it was.

_Rationale:_ Currently buried at the bottom. Elevating it demonstrates commitment to honest history without requiring new content.

---

### Dr. Patricia Williams (Scholarly Standards)

**Proposal 1: "Claims We Make, Evidence We Show" Statement**

Add a brief statement above or within the DocumentTeaser: "Every claim on this website links to its primary source." This is the scholarly promise that sets Rocky Mount apart.

_Rationale:_ This is the academic differentiator. Most historic sites make claims; Rocky Mount shows receipts. One sentence communicates scholarly rigor.

**Proposal 2: Citation Count Display**

Near the Evidence Room link, show a live count: "Explore 42 primary sources" or "47 documents with full citations." This demonstrates depth without making visitors guess.

_Rationale:_ Concrete numbers build trust. Scholars appreciate quantifiable claims. Visitors understand scope.

---

### Amanda Richardson (Communications/Marketing)

**Proposal 1: "The Room Where It Happened" Teaser Video Thumbnail**

Create a static "video thumbnail" image (not actual video) that shows the Evidence Room interface with a play button overlay. When clicked, it goes to the Evidence Room. This creates visual intrigue without requiring video production.

_Rationale:_ People click play buttons. It creates expectation of discovery. If we later add video, the infrastructure is ready.

**Proposal 2: Social Proof - "First to See" Counter**

Add a counter: "Join 247 visitors exploring the Evidence Room this week" or similar. Could be approximate/static for beta, updated periodically.

_Rationale:_ Social proof drives action. "Others are doing this" is powerful. Beta philosophy: start with modest, real numbers.

**Proposal 3: Shareable Quote Cards**

Make each quote in DocumentTeaser shareable. Small share icons that let visitors tweet/post the quote with attribution. The primary sources become marketing.

_Rationale:_ Turns visitors into ambassadors. Historical quotes have inherent shareability. Zero cost.

---

### Michael Stevens (Implementation Reality)

**Proposal 1: Animated Number Reveal for Source Count**

Simple CSS animation: "47 primary sources" where the number counts up from 0 when scrolling into view. Use the existing AnimatedCounter component pattern.

_Rationale:_ We already have AnimatedCounter for events. Reuse the pattern. 30 minutes max.

**Proposal 2: Enhanced DocumentTeaser with Evidence Room Preview**

Expand DocumentTeaser to show 3 documents instead of 2, add a "Browse all 47 documents" link, and include a mini-preview of the Evidence Room sections (Letters, Treaty, Timeline). Pure HTML/CSS.

_Rationale:_ This enhances existing infrastructure. No new components needed. 1-2 hours.

**Proposal 3: "New" Badge System**

Simple badge component: `<Badge>New</Badge>` that can be placed on any link. Add it to Evidence Room links. When beta ends, remove badges. 15 minutes.

_Rationale:_ Simplest possible solution. Communicates "something new" without complexity.

---

## Part 2: Debate Transcript

**Dr. Chen:** Let me start by saying Amanda's video thumbnail idea is brilliant in concept but dangerous in practice. Fake play buttons feel deceptive. Users expect video.

**Amanda Richardson:** Fair point. I withdraw that one. What about the shareable quote cards? That's authentic.

**James Torres:** The share buttons concern me from a maintenance perspective. Social media APIs change constantly. We'd be introducing external dependencies.

**Michael Stevens:** We could do simple share links - URL-based sharing that doesn't require APIs. Twitter's intent URL, Facebook's share URL. No JavaScript SDK needed.

**Dr. Williams:** I want to advocate strongly for the "Claims We Make, Evidence We Show" statement. This is our scholarly identity. One sentence, zero maintenance, enormous differentiation.

**Dr. Whitehorse:** I agree with Patricia, and I want to pair it with my first proposal - adding Cherokee presence to the DocumentTeaser. If we claim to show evidence, we must show _whose_ evidence, _whose_ story.

**Dr. Chen:** Robert makes a crucial point. The current DocumentTeaser is entirely settler perspective - Blount and Washington. Adding a Cherokee voice isn't just ethical, it's strategically sound. It demonstrates the nuanced history the Evidence Room contains.

**James Torres:** I support adding a third document, but I want to flag: we need to be careful about which Cherokee leader we feature and how we frame them. This requires thoughtfulness, not speed.

**Dr. Whitehorse:** Agreed. Hanging Maw (Squollecuttah) is appropriate - he was Principal Chief, a diplomat, someone who worked for peace. But the framing must acknowledge he signed under complex circumstances.

**Amanda Richardson:** From a communications standpoint, three cards work better than two visually anyway. The grid is more balanced.

**Michael Stevens:** Implementation-wise, adding a third card to DocumentTeaser is trivial - 30 minutes. The content decision is what takes time.

**Dr. Williams:** I want to advocate for the citation count. "47 primary sources" is concrete, verifiable, and impressive. It tells scholars this is serious.

**James Torres:** What if that number changes? We add documents, the homepage is wrong.

**Michael Stevens:** We could pull the count dynamically from the content files, or we could say "40+ primary sources" which allows growth without constant updates.

**Dr. Chen:** "40+" is smart. It's accurate, allows growth, and doesn't overpromise.

**Amanda Richardson:** I still think social proof matters. Can we do something simple like "Explore what 250 visitors discovered this month"? Even if it's a modest number?

**James Torres:** For beta, I'd avoid promises about visitor counts. We don't know what numbers we'll have. Let's not set expectations we can't verify.

**Dr. Chen:** What about framing it as invitation rather than social proof? "Be among the first to explore the Evidence Room"?

**Amanda Richardson:** That works! It's scarcity/exclusivity without lying about numbers.

**Dr. Whitehorse:** I want to return to my second proposal - elevating the Indigenous Acknowledgment. Currently it's section 9 of 10. That placement says "afterthought."

**Dr. Williams:** I understand the intent, but I worry about disrupting the page flow. The current structure builds: Hero > Context > Audience > Evidence > Visit. Moving acknowledgment earlier might feel jarring.

**Dr. Whitehorse:** What if we integrate it rather than move it? A brief line in the Original Seven Counties section: "These seven counties were carved from Cherokee homeland - a story told in full in the Evidence Room."

**Dr. Chen:** That's elegant. It weaves acknowledgment into narrative rather than separating it.

**Michael Stevens:** That's a text change, not a component change. Five minutes.

**Amanda Richardson:** I want to propose a synthesis: What if the "wow factor" isn't one big thing, but a coherent set of small signals that say "something new and serious is here"?

**Dr. Chen:** Explain.

**Amanda Richardson:**

1. A "New: Evidence Room" badge on the nav link (Michael's proposal)
2. The "Claims We Make, Evidence We Show" statement (Patricia)
3. Three documents instead of two, including Cherokee voice (Robert + existing)
4. "40+ primary sources" count (Patricia + James compromise)
5. "Be among the first to explore" language (scarcity without lying)

**Dr. Williams:** That's not a single wow factor - it's a coherent messaging upgrade.

**James Torres:** I like it because no single element is load-bearing. If one fails or needs to change, the others stand.

**Michael Stevens:** Time estimate: 2-3 hours total. All existing patterns, no new infrastructure.

**Dr. Whitehorse:** And my integrated acknowledgment in the Original Seven section?

**Amanda Richardson:** Yes. That becomes the fifth element.

**Dr. Chen:** I want to add one thing to the DocumentTeaser itself: the Washington question. "Where ought the Governor to reside?" That's the hook. Put it above the three document cards as a section header.

**Dr. Williams:** So the Evidence teaser becomes: Washington's question > Three answers (Blount, Washington proclamation, Cherokee signer) > "40+ sources" > "Be among the first to explore."

**Michael Stevens:** That's a compelling narrative arc in one section.

---

## Part 3: Consensus Recommendations

### Top 3 Ideas (Ranked)

#### 1. **Enhanced DocumentTeaser with Cherokee Voice** (Highest Impact)

- Add Washington's question as section header: "Where ought the Governor to reside?"
- Expand to three document cards (Blount's arrival, Washington's proclamation, Cherokee signer)
- Add "40+ primary sources" count
- Change CTA to: "Be among the first to explore the Evidence Room"

**Time:** 1.5-2 hours
**Risk:** Low (content-only changes to existing component)
**Sustainability:** High (static content, no external dependencies)

#### 2. **Scholarly Trust Statement**

- Add one-sentence statement above DocumentTeaser: "Every claim on this website links to its primary source."
- This is the differentiator. No other historic site says this.

**Time:** 15 minutes
**Risk:** None
**Sustainability:** Permanent

#### 3. **"New" Badge + Integrated Acknowledgment**

- Add "New" badge to Evidence Room nav link
- Add Cherokee context to Original Seven section: "These seven counties were carved from Cherokee homeland - a story told in full in the Evidence Room."

**Time:** 30 minutes
**Risk:** None
**Sustainability:** Badge removed after beta; acknowledgment is permanent

---

## Part 4: Implementation Estimates

| Enhancement                   | Time         | Complexity | Dependencies            |
| ----------------------------- | ------------ | ---------- | ----------------------- |
| Add third DocumentTeaser card | 45 min       | Low        | Cherokee signer content |
| Washington question header    | 15 min       | Trivial    | Copy from brand.ts      |
| "40+ sources" count           | 15 min       | Trivial    | None                    |
| CTA language change           | 5 min        | Trivial    | None                    |
| Trust statement               | 15 min       | Trivial    | None                    |
| "New" badge component         | 15 min       | Low        | None                    |
| Original Seven acknowledgment | 10 min       | Trivial    | None                    |
| **Total**                     | **~2 hours** | Low        | Minimal                 |

---

## Part 5: Risk Assessment

### What Could Go Wrong

| Risk                               | Likelihood | Impact | Mitigation                                                          |
| ---------------------------------- | ---------- | ------ | ------------------------------------------------------------------- |
| Cherokee signer framing criticized | Medium     | High   | Have Dr. Whitehorse review copy; link to full Evidence Room context |
| "New" badge looks cheap            | Low        | Low    | Use period-appropriate styling                                      |
| "40+" becomes inaccurate           | Low        | Low    | Use conservative floor number                                       |
| Trust statement feels arrogant     | Low        | Medium | Frame as commitment, not boast                                      |
| Changes break mobile layout        | Low        | Medium | Test on mobile before deploy                                        |

### Beta Philosophy Compliance

| Principle                     | Status                               |
| ----------------------------- | ------------------------------------ |
| No overpromising              | Pass - all claims verifiable         |
| Doing the right thing         | Pass - Cherokee inclusion is ethical |
| Let people discover naturally | Pass - badges invite, don't force    |
| Sustainable                   | Pass - no external dependencies      |

---

## Part 6: Final Recommendation

### Build This (2-3 Hours Total)

**1. Enhanced DocumentTeaser Section (1.5 hours)**

```
[Scholarly Trust Statement]
"Every claim on this website links to its primary source."

[Washington Question Header]
"Where ought the Governor to reside?"
— George Washington, August 13, 1790

[Three Document Cards]
1. Blount's Arrival (existing)
2. Washington's Proclamation (existing)
3. NEW: Cherokee Signer - Hanging Maw (Squollecuttah)
   "Principal Chief of the Overhill Cherokee, one of 42 signatories
   to the Treaty of Holston, July 2, 1791"

[Footer]
"Explore 40+ primary sources in the Evidence Room"
"Be among the first to explore" [Button]
```

**2. Navigation Badge (15 minutes)**

- Add subtle "New" indicator to Evidence Room nav link
- Style: period-appropriate, not flashy

**3. Original Seven Acknowledgment (10 minutes)**
Add to the Original Seven Counties section description:
"These seven counties were established on lands that had been Cherokee homeland for generations - a complex history explored in the Evidence Room."

### Why This Is the "Wow Factor"

The "wow" isn't a single flashy element. It's the _coherence_ of the message:

1. **A question** (Washington asks)
2. **Three answers** (Blount, Washington, Cherokee)
3. **A promise** (every claim has evidence)
4. **An invitation** (be among the first)

This tells visitors: "We're serious. We're honest. We include all voices. Come see."

That's more impressive than any animation.

---

## Appendix: Recommended Cherokee Signer Content

**Hanging Maw (Squollecuttah)**
Principal Chief of the Overhill Cherokee

_Suggested excerpt (paraphrased from treaty context):_
"As one of forty-two Cherokee leaders who signed the Treaty of Holston, Hanging Maw sought to establish lasting peace between nations. His mark on that document shaped the boundary between Cherokee homeland and the new American territory."

_Link:_ `/evidence/people/hanging-maw`

_Note:_ This framing acknowledges Cherokee agency while being honest about the treaty's consequences. Full context is available in the Evidence Room people section.

---

**Advisory Board Conclusion:**

The wow factor for the Evidence Room launch is _trust built through coherence_. Rather than one dramatic gesture, we recommend a unified message that says: "This site does history differently. We show our work. We include all voices. The evidence is here."

That's the wow.

---

_Document prepared by the Tennessee Starts Here Advisory Board_
_Dr. Margaret Chen, James Torres, Dr. Robert Whitehorse, Dr. Patricia Williams, Amanda Richardson, Michael Stevens_
