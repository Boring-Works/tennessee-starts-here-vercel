# Governor's View Content System

**Status:** Phase 1 Complete ✅ | Documentation & Implementation Ready
**Created:** January 2026
**Author:** Dr. Jonas Lindström (Content Strategy)

---

## What's Included

This content system provides everything needed to implement two Governor's View improvements:

1. **TL;DR Summary** — One-sentence verdict above the Governor's Briefing
2. **Planning Intelligence** — Two-line visitor planning section below brass instruments

---

## Documents

| Document                             | Purpose                                               | Audience                    |
| ------------------------------------ | ----------------------------------------------------- | --------------------------- |
| **GOVERNOR-CONTENT-SYSTEM.md**       | Complete system spec, tone guidelines, decision trees | Content editors, designers  |
| **GOVERNOR-CONTENT-EXAMPLES.md**     | 24 complete weather scenarios with outputs            | All (reference/testing)     |
| **GOVERNOR-IMPLEMENTATION-GUIDE.md** | Step-by-step developer instructions                   | React/TypeScript developers |
| **governorContent.ts**               | TypeScript functions for content generation           | Developers                  |

---

## Files Created

```
docs/
├── GOVERNOR-CONTENT-SYSTEM.md           ← System documentation
├── GOVERNOR-CONTENT-EXAMPLES.md         ← Weather scenario examples
├── GOVERNOR-IMPLEMENTATION-GUIDE.md     ← Developer guide
└── GOVERNOR-CONTENT-README.md           ← This file

lib/almanac/
└── governorContent.ts                   ← TypeScript functions
```

---

## Quick Summary

### TL;DR Summaries

**What:** One-sentence verdict that appears before the 200-300 word Governor's Briefing

**Format:** `SUMMARY: [verdict] - [key detail]`

**Word Limit:** 15 words maximum

**Example:**

```
SUMMARY: Favorable conditions - 68°F, clear, no concerns
```

**Verdicts:** Favorable, Agreeable, Temperate, Concerning, Challenging, Hazardous

---

### Planning Intelligence

**What:** Two-line visitor planning section that appears below brass instruments (thermometer, barometer, weathervane)

**Format:**

```
Line 1: [Icon] [Status] - [Condition]
Line 2: [Key detail for outdoor planning]
```

**Word Limit:** ~10 words per line

**Example:**

```
🟢 Perfect conditions for touring - 68°F, clear skies
No rain expected through evening
```

**Icons:** 🟢 Perfect, 🟡 Good, 🟠 Fair, 🔴 Concerning/Unsafe

---

## Implementation Sequence

### Phase 1 (Complete)

- ✅ Content strategy defined
- ✅ Tone guidelines established
- ✅ Decision trees created
- ✅ 24+ weather scenarios documented
- ✅ TypeScript functions written

### Phase 2 (Ready for Dev)

1. Update GovernorsBriefing component (add tldr prop)
2. Create PlanningIntelligence component
3. Import functions in almanac page
4. Connect to view toggle
5. Test all weather scenarios
6. Deploy

---

## Core Principles

### 1. Heritage Tone + Modern Clarity

- Use period-appropriate vocabulary (favorable, concerning, temperate)
- Prioritize visitor actionability over atmospheric language
- Maintain 8th-grade reading level

### 2. Visitor-First Language

- Every statement answers: "Should I visit today?"
- Focus on comfort and safety, not farming conditions
- Be specific (not "bad weather" but "rain expected 1-3 PM")

### 3. Consistency

- TL;DR and Planning Intelligence align with full briefing tone
- Share vocabulary across all three content pieces
- Maintain period-appropriate metaphors (glass/barometer, conditions)

---

## Tone Vocabulary

### Approved Verdicts

- **Favorable** — Ideal conditions (clear, 55-75°F, dry)
- **Agreeable** — Pleasant but minor concerns (clouds, light rain possible)
- **Temperate** — Manageable conditions (overcast, moderate temp, dry)
- **Concerning** — Notable issues (mixed weather, heat/cold building)
- **Challenging** — Multiple problems (heavy rain, cold, wind)
- **Hazardous** — Safety risk (storms, extreme heat/cold, dangerous wind)

### Forbidden Words

- "good," "bad," "safe," "dangerous" (use period terms instead)
- "optimal," "ideal" (outside period language)
- "slightly," "kind of," "pretty" (be specific, not vague)

---

## Testing Checklist

- [ ] TL;DR summaries always ≤15 words
- [ ] Planning Intelligence exactly 2 lines
- [ ] All verdicts from approved list
- [ ] No STOP phrases from COPY.md
- [ ] Temperatures use °F (not Celsius)
- [ ] Times use 12-hour format (2 PM, not 14:00)
- [ ] Heritage tone maintained throughout
- [ ] Visitor benefit is clear in each line
- [ ] Examples generated from actual weather data
- [ ] Responsive design tested mobile + desktop

---

## Next Steps for Development

### Step 1: Read the System Guide

Start with `GOVERNOR-CONTENT-SYSTEM.md` to understand:

- Verdict selection logic
- Key detail priorities
- Planning Intelligence format
- All 24 weather scenarios

### Step 2: Review Examples

Study `GOVERNOR-CONTENT-EXAMPLES.md` for:

- Real outputs for different conditions
- Tone in context
- How verdicts are justified

### Step 3: Follow Implementation Guide

Use `GOVERNOR-IMPLEMENTATION-GUIDE.md` to:

- Update components (copy/paste ready)
- Test scenarios
- Deploy with confidence

### Step 4: Integration

- Import `generateTLDRSummary()` and `generatePlanningIntelligence()`
- Pass weather data, get structured content back
- Render in Governor view

---

## Success Criteria

- ✅ TL;DR summaries instantly scannable (<15 words)
- ✅ Planning Intelligence provides actionable guidance
- ✅ Content maintains heritage brand voice
- ✅ All weather scenarios covered
- ✅ Focuses on visitor needs (not farming)
- ✅ Responsive across all devices
- ✅ No build warnings or errors
- ✅ ESLint and TypeScript pass

---

## Key Files

| Location                                       | Purpose                           |
| ---------------------------------------------- | --------------------------------- |
| `/lib/almanac/governorContent.ts`              | Core functions                    |
| `/components/almanac/GovernorsBriefing.tsx`    | Component (needs update)          |
| `/components/almanac/PlanningIntelligence.tsx` | New component (template in guide) |
| `/app/(almanac)/almanac/page.tsx`              | Page integration point            |
| `docs/GOVERNOR-CONTENT-SYSTEM.md`              | System specification              |
| `docs/GOVERNOR-CONTENT-EXAMPLES.md`            | Weather scenario library          |
| `docs/GOVERNOR-IMPLEMENTATION-GUIDE.md`        | Developer playbook                |

---

## Support Resources

**For Brand Guidelines:** See `docs/COPY.md`

- STOP/START dictionary
- Approved terminology
- Heritage tone requirements

**For Weather System:** See `docs/ALMANAC.md`

- Feature overview
- API integration
- Weather code reference

**For TypeScript Types:** See `lib/almanac/types.ts`

- WeatherData interface
- All type definitions

---

## Questions?

Refer to the documentation in this order:

1. **"How do I...?"** → Implementation Guide
2. **"What should I write?"** → Examples or System doc
3. **"Why this tone?"** → System doc (Principles section)
4. **"What are the rules?"** → COPY.md (STOP/START dictionary)

---

_Created January 2026 | Delivered complete, ready for implementation_
