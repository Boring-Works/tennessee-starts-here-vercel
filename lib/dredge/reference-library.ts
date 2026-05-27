/**
 * Reference Library - SINGLE SOURCE OF TRUTH
 * 136 verified facts about Rocky Mount and the Southwest Territory
 * Used by The Dredge to cross-reference new documents
 *
 * CRITICAL: This library is the SOURCE OF TRUTH, backed by external primary sources.
 * The website (tennesseestartshere.com) is OUTPUT to be verified AGAINST this library.
 * NEVER use website content as a source - it must be verified with external documentation.
 *
 * Data Flow:
 *   External Sources (primary/scholarly) → Reference Library → Website Content
 *   NOT: Website → Reference Library (this would be circular)
 *
 * Categories: governance (29), construction (7), people (29), treaty (29),
 *            timeline (9), cherokee (10), administration (13), violence (8), geography (2)
 *
 * Error Detection: 73 facts with 280+ wrongVariant patterns
 *
 * LAST UPDATED: 2026-02-03 (Timeline Verification: Added 25 facts - governance/treaty documentation)
 */

export interface VerifiedFact {
  id: string
  category:
    | 'governance'
    | 'construction'
    | 'people'
    | 'treaty'
    | 'timeline'
    | 'cherokee'
    | 'administration'
    | 'violence'
    | 'geography'
  claim: string
  source: string
  sourceType: 'primary' | 'scholarly' | 'archaeological'
  confidence: 'verified' | 'high' | 'moderate'
  dateRange?: { start: string; end: string }
  contradicts?: string[] // IDs of facts this would contradict
  wrongVariants?: string[] // Common errors that should be flagged (case-insensitive patterns)
}

export const REFERENCE_LIBRARY: VerifiedFact[] = [
  // === GOVERNANCE ===
  {
    id: 'gov-001',
    category: 'governance',
    claim: 'William Blount arrived at Rocky Mount on October 11, 1790',
    source: 'Letter to John Gray Blount, October 20, 1790 (State Archives of NC)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'october 10, 1790', // Wrong day
      'october 12, 1790',
      'blount arrived.{0,20}1791', // Wrong year
    ],
  },
  {
    id: 'gov-002',
    category: 'governance',
    claim:
      'Rocky Mount served as the territorial capital from October 1790 to approximately early 1792',
    source: 'Tennessee Encyclopedia; Keith, John Gray Blount Papers Vol. II',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'first federal capital', // Not federal - territorial
      'first capital of america',
      'first u\\.?s\\.? capital',
      'capital.{0,20}until.{0,10}1796', // Capital moved to Knoxville by early 1792, not 1796
    ],
  },
  {
    id: 'gov-003',
    category: 'governance',
    claim: 'Blount described accommodations with "Glass Windows, Fire Place &c &c"',
    source: 'Letter to John Gray Blount, October 20, 1790 (State Archives of NC)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-004',
    category: 'governance',
    claim: 'George Washington appointed William Blount as Governor of the Southwest Territory',
    source: 'Founders Online, National Archives',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-005',
    category: 'governance',
    claim: 'William Blount was one of 39 signers of the U.S. Constitution',
    source: 'National Archives, Constitutional Convention records',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-006',
    category: 'governance',
    claim: 'Blount took measures to organize territorial government by November 1790',
    source: 'Blount to Knox, November 3, 1790 (American State Papers: Indian Affairs)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-007',
    category: 'governance',
    claim:
      'Territorial militia described as good marksmen accustomed to woods but requiring systematic officer training',
    source: 'Blount to Knox, November 3, 1790',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-008',
    category: 'governance',
    claim:
      'Hanging Maw visited Blount at Rocky Mount in December 1790 for preliminary peace discussions',
    source: 'Blount to Knox, December 15, 1790',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-009',
    category: 'governance',
    claim:
      'Cherokee chiefs agreed to restrain young warriors from hostility if settlers refrained from land encroachments',
    source: 'Blount to Knox, December 15, 1790',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-010',
    category: 'governance',
    claim:
      'Blount issued proclamations forbidding settler encroachments beyond established boundaries',
    source: 'Blount to Knox, December 15, 1790',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-011',
    category: 'governance',
    claim:
      'Courts of law established throughout territory with judges entering duties by January 1791',
    source: 'Blount to Knox, January 8, 1791',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-012',
    category: 'governance',
    claim:
      'New settlements forming and farms being cleared with commerce increasing by January 1791',
    source: 'Blount to Knox, January 8, 1791',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-013',
    category: 'governance',
    claim:
      'Tennessee and Holston rivers provided convenient transportation for territorial produce',
    source: 'Blount to Knox, January 8, 1791',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-014',
    category: 'governance',
    claim:
      'North Carolina ceded approximately 43,000 square miles to the federal government on December 22, 1789, creating the land base for the Southwest Territory',
    source: 'MASTER_INDEX.md (North Carolina state act/deed)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'north carolina.{0,20}cession.{0,20}178\\d', // Wrong year (was 1789)
      'north carolina.{0,20}cession.{0,20}179[0-9]', // Wrong year
      'north carolina.{0,20}cession.{0,20}december [1-9]\\,', // Wrong day (was Dec 22)
      'north carolina.{0,20}4[0-2]\\,000', // Wrong size (was ~43,000)
      'north carolina.{0,20}4[4-9]\\,000', // Wrong size
    ],
  },
  {
    id: 'gov-015',
    category: 'governance',
    claim:
      'Congress created the Territory of the United States South of the River Ohio (Southwest Territory) by statute on May 26, 1790, applying the Ordinance of 1787 with slavery permitted',
    source: 'MASTER_INDEX.md + 001-jefferson-to-blount-1790-08-01.md (Congressional statute)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'southwest territory.{0,20}created.{0,20}178\\d', // Wrong year (was 1790)
      'southwest territory.{0,20}created.{0,20}179[1-9]', // Wrong year
      'southwest territory.{0,20}may [1-9]\\,', // Wrong day (was May 26)
      'southwest territory.{0,20}slavery.{0,20}prohibited', // WRONG - slavery was PERMITTED (unlike Northwest Territory)
    ],
  },
  {
    id: 'gov-016',
    category: 'governance',
    claim:
      'President Washington sent nominations for territorial positions to the Senate on June 7, 1790, including William Blount as governor and Daniel Smith as secretary',
    source: 'MASTER_INDEX.md (Washington Papers, Founders Online)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'blount.{0,20}nominated.{0,20}179[1-9]', // Wrong year (was 1790)
      'blount.{0,20}nominated.{0,20}june [1-6]\\,', // Wrong day (was June 7)
      'blount.{0,20}nominated.{0,20}june [8-9]\\,', // Wrong day
    ],
  },
  {
    id: 'gov-017',
    category: 'governance',
    claim:
      'Articles of agreement were signed between William Blount and David Moore on October 12, 1794, regarding tribal goods transport',
    source: 'MASTER_INDEX.md (Tennessee Virtual Archive p15138coll30/4364)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'blount.{0,20}moore.{0,20}agreement.{0,20}179[0-3]', // Wrong year (was 1794)
      'blount.{0,20}moore.{0,20}agreement.{0,20}179[5-9]', // Wrong year
      'blount.{0,20}moore.{0,20}october [1-9]\\,', // Wrong day (was Oct 12)
    ],
  },

  // === CONSTRUCTION ===
  {
    id: 'con-001',
    category: 'construction',
    claim: 'The current main house (Cobb House) was built between 1826-1828',
    source: '2006 Tennessee Historical Commission dendrochronology study',
    sourceType: 'archaeological',
    confidence: 'verified',
    contradicts: ['jackson-1788'], // Any claim Jackson stayed in THIS house in 1788
    wrongVariants: [
      'built.{0,15}177\\d', // Any "built in 177X" claim
      'built.{0,15}178\\d', // Any "built in 178X" claim
      'built.{0,15}179\\d', // Any "built in 179X" claim
      'built.{0,15}180\\d', // Any "built in 180X" claim
      'built.{0,15}181\\d', // Any "built in 181X" claim
      'original.{0,10}cobb house', // Current house is NOT the original
      'house.{0,15}blount.{0,15}stayed', // Blount stayed in an EARLIER structure
      'same house.{0,15}blount',
    ],
  },
  {
    id: 'con-002',
    category: 'construction',
    claim: "An earlier structure existed on the property during Blount's governorship (1790-1792)",
    source: 'Blount correspondence describing accommodations',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'con-003',
    category: 'construction',
    claim: 'William Cobb settled the property circa 1770',
    source: 'Tennessee Encyclopedia; local historical records',
    sourceType: 'scholarly',
    confidence: 'high',
    dateRange: { start: '1768', end: '1772' },
  },
  {
    id: 'con-004',
    category: 'construction',
    claim: 'Rocky Mount farm established 1775 per Tennessee Century Farms certification',
    source: 'Tennessee Century Farms Program, WJHL article October 2021',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'farm.{0,15}established.{0,15}1770', // Century Farms says 1775
      'farm.{0,15}since.{0,15}1770',
      'oldest farm.{0,15}1770',
    ],
  },
  {
    id: 'con-005',
    category: 'construction',
    claim: 'Dining Room structure built 1829-1830 per dendrochronology study',
    source: 'Grissino-Mayer & van de Gevel 2007 dendrochronology study',
    sourceType: 'archaeological',
    confidence: 'verified',
  },
  {
    id: 'con-006',
    category: 'construction',
    claim: 'William Cobb sold Rocky Mount to son-in-law Hal Massengill in 1796',
    source: 'Washington County deed 1796',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'con-007',
    category: 'construction',
    claim:
      'Property valued at $2,000 with 60 acres and barn for 30 horses in October 1791 inventory',
    source: 'Rocky Mount Inventory, October 15, 1791',
    sourceType: 'primary',
    confidence: 'verified',
  },

  // === PEOPLE ===
  {
    id: 'ppl-001',
    category: 'people',
    claim: "William Cobb was the property owner during Blount's governorship",
    source: 'Blount correspondence; property records',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-002',
    category: 'people',
    claim: 'Barsheba Whitehead Cobb (wife of William) managed household during territorial period',
    source:
      'WikiTree Cobb-3509, genealogical records confirm wife was Barsheba Whitehead, not Mary',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'mary cobb.{0,10}wife', // CRITICAL: Mary was William's SISTER
      "mary cobb.{0,10}william's",
      'mrs\\.? mary cobb',
      'william.{0,15}wife.{0,15}mary',
      'mary.{0,15}married.{0,15}william cobb',
      'mary cobb.{0,10}managed',
      'mary cobb.{0,10}household',
      'mary cobb.{0,10}fed',
    ],
  },
  {
    id: 'ppl-003',
    category: 'people',
    claim: 'Andrew Jackson allegedly lodged at Rocky Mount in spring 1788 for six weeks',
    source: 'Oral tradition only - Tennessee Encyclopedia, Rocky Mount Museum',
    sourceType: 'scholarly',
    confidence: 'moderate',
    contradicts: ['con-001'], // Current house didn't exist yet
    wrongVariants: [
      'jackson.{0,15}stayed.{0,15}current', // Didn't stay in CURRENT house
      'jackson.{0,15}this house',
      'jackson.{0,15}slept.{0,15}room',
    ],
  },
  {
    id: 'ppl-004',
    category: 'people',
    claim: "Mary Cobb was William Cobb Sr.'s SISTER (not wife), married to Henry Massengill Sr.",
    source: 'WikiTree Massengill-88, Massengill family genealogy',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-005',
    category: 'people',
    claim: 'Michael Massengill (grandson of William Cobb) built current structures 1827-1830',
    source: 'Dendrochronology study 2007; WikiTree genealogical records',
    sourceType: 'archaeological',
    confidence: 'verified',
  },
  {
    id: 'ppl-006',
    category: 'people',
    claim: 'William Cobb Sr. born circa 1732 in Isle of Wight County, Virginia',
    source: 'WikiTree Cobb-3509, genealogical records',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-007',
    category: 'people',
    claim: 'William Cobb Sr. died circa 1803 in Knox County, Tennessee',
    source: 'WikiTree Cobb-3509, genealogical records',
    sourceType: 'scholarly',
    confidence: 'high',
  },
  {
    id: 'ppl-008',
    category: 'people',
    claim:
      'William Cobb and sons (William Jr., Pharaoh, Jerry, Arthur) supplied Overmountain Men with gunpowder, horses, blankets, and food for Kings Mountain campaign (October 1780)',
    source: 'WikiTree, Tennessee Encyclopedia, Revolutionary War records',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-009',
    category: 'people',
    claim: "William Cobb moved from Rocky Mount to Bean's Station (Knox/Grainger County) in 1795",
    source: 'TN Gen Web, WikiTree, Washington County deed 1796',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-010',
    category: 'people',
    claim:
      'Hal Massengill (Henry Massengill Jr.) married Penelope Cobb at Fort Womack during Indian siege',
    source: "WikiTree Massengill-88, Goodspeed's History of Tennessee",
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-011',
    category: 'people',
    claim: 'Hal Massengill served 2 years, 3 months in Revolutionary War',
    source: 'WikiTree Massengill-88',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-012',
    category: 'people',
    claim:
      'Barsheba Whitehead Cobb fed 42 Cherokee chiefs and attendants during Treaty of Holston negotiations (July 1791)',
    source: 'COBB-FAMILY-RESEARCH.md citing historical records',
    sourceType: 'scholarly',
    confidence: 'high',
    wrongVariants: ['mary cobb.{0,15}fed.{0,15}cherokee', 'mary cobb.{0,15}42 chiefs'],
  },
  {
    id: 'ppl-013',
    category: 'people',
    claim:
      'Daniel Smith was officially appointed as Territorial Secretary on June 23, 1790, by President Washington',
    source: 'MASTER_INDEX.md (Founders Online)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'daniel smith.{0,20}secretary.{0,20}179[1-9]', // Wrong year (was 1790)
      'daniel smith.{0,20}secretary.{0,20}june [1-9]\\,', // Wrong day (was June 23)
    ],
  },
  {
    id: 'ppl-014',
    category: 'people',
    claim:
      'Henry Knox served as Secretary of War from 1789 to 1794, serving as the primary federal contact for territorial administration and Indian affairs',
    source: 'MASTER_INDEX.md + PROSOPOGRAPHY-ANALYSIS.md (federal records)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'henry knox.{0,20}secretary.{0,20}178[0-8]', // Wrong year (started 1789)
      'henry knox.{0,20}secretary.{0,20}179[5-9]', // Wrong year (ended 1794)
      'henry knox.{0,20}secretary of state', // Wrong position (was Secretary of WAR)
    ],
  },
  {
    id: 'ppl-015',
    category: 'people',
    claim:
      "George Roulstone founded the Knoxville Gazette with Robert Ferguson in 1791, establishing Tennessee's first newspaper",
    source: 'MASTER_INDEX.md + 018-george-roulstone-biography.md (Tennessee Encyclopedia)',
    sourceType: 'scholarly',
    confidence: 'high',
    wrongVariants: [
      'george roulstone.{0,20}179[0]', // Wrong year (was 1791)
      'george roulstone.{0,20}179[2-9]', // Wrong year
      'george roulstone.{0,20}sole founder', // Had co-founder Robert Ferguson
    ],
  },

  // === TREATY ===
  {
    id: 'trt-001',
    category: 'treaty',
    claim: "Treaty of Holston was signed on July 2, 1791 at White's Fort (present-day Knoxville)",
    source: 'National Archives; Founders Online; Treaty document text',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'treaty.{0,15}signed.{0,15}rocky mount', // Signed at White's Fort, NOT Rocky Mount
      'treaty.{0,15}rocky mount.{0,15}signed',
      'holston.{0,15}signed.{0,15}rocky mount',
    ],
  },
  {
    id: 'trt-002',
    category: 'treaty',
    claim: "Treaty of Holston was NEGOTIATED at White's Fort, not Rocky Mount",
    source: 'Blount to Knox June 15, 1791: "Cherokee chiefs are assembling at White\'s Fort"',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'treaty.{0,15}negotiated.{0,15}rocky mount',
      'negotiations.{0,15}at rocky mount',
      'negotiated.{0,15}holston.{0,15}rocky mount',
      'cherokee chiefs.{0,15}negotiated.{0,15}rocky mount',
    ],
  },
  {
    id: 'trt-003',
    category: 'treaty',
    claim:
      'Cherokee chiefs visited Rocky Mount in December 1790 for PRELIMINARY diplomatic talks (before treaty)',
    source: 'Blount to Knox December 15, 1790',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-004',
    category: 'treaty',
    claim: 'George Washington ratified the Treaty of Holston on November 11, 1791',
    source: 'Founders Online, National Archives',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-005',
    category: 'treaty',
    claim: 'Forty-one or forty-two Cherokee chiefs signed the Treaty of Holston (sources vary)',
    source: 'Treaty document, National Archives; various scholarly sources cite 41 or 42',
    sourceType: 'primary',
    confidence: 'high',
  },
  {
    id: 'trt-006',
    category: 'treaty',
    claim:
      'Treaty of Holston signed by seven principal Cherokee chiefs: Chuleoah (The Boots), Squollecuttah (Hanging Maw), Enoleh (Black Fox), Kanetetoka (Standing Turkey), Kunoskeskie (John Watts), Nenetooyah (Bloody Fellow), and Chuquilatague (Doublehead)',
    source:
      'Treaty of Holston document, Article signatories section, verified against War Department Papers',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: ['six chiefs signed', 'five chiefs signed', 'eight principal chiefs'],
  },
  {
    id: 'trt-007',
    category: 'treaty',
    claim:
      'Treaty of Holston included approximately 35 additional Cherokee signatories beyond the seven principal chiefs',
    source:
      'Treaty of Holston document, signatory list verified against National Archives 88697242',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-008',
    category: 'treaty',
    claim: 'John Thompson and James Carey served as interpreters for the Treaty of Holston',
    source: 'Treaty of Holston document, signatories section',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-009',
    category: 'treaty',
    claim:
      'United States agreed to pay Cherokee Nation $1,000 in goods plus $1,000 annually under original Treaty of Holston terms',
    source: 'Treaty of Holston, Article IV',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-010',
    category: 'treaty',
    claim:
      'Cherokee Nation acknowledged protection of United States and agreed not to hold treaties with foreign powers, individual states, or state citizens',
    source: 'Treaty of Holston, Article II',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-011',
    category: 'treaty',
    claim:
      'United States guaranteed Cherokee Nation exclusive regulation of trade under Treaty of Holston',
    source: 'Treaty of Holston, Article VI',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-012',
    category: 'treaty',
    claim:
      'United States citizens settling on Cherokee lands would forfeit federal protection, and Cherokee could punish them as they saw fit',
    source: 'Treaty of Holston, Article VIII',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-013',
    category: 'treaty',
    claim:
      'United States agreed to furnish Cherokee Nation with useful implements of husbandry and appoint up to four interpreters',
    source: 'Treaty of Holston, Article XIV',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-014',
    category: 'treaty',
    claim:
      'Additional Article signed February 17, 1792 increased Cherokee annuity from $1,000 to $1,500',
    source: 'Treaty of Holston, Additional Article (February 17, 1792)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-015',
    category: 'treaty',
    claim: 'Senate advised and consented to Treaty of Holston ratification on October 11, 1791',
    source: 'Washington Proclamation, November 11, 1791 (Founders Online)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-016',
    category: 'treaty',
    claim:
      "Thomas Jefferson countersigned Washington's Treaty of Holston proclamation as Secretary of State",
    source: 'Washington Proclamation, November 11, 1791',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-017',
    category: 'treaty',
    claim:
      'Five Cherokee chiefs traveled by ship from Charleston to Philadelphia, arriving December 29, 1791 to address treaty dissatisfaction',
    source: 'Cherokee Delegation to Philadelphia report, January 1792 (Founders Online)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-018',
    category: 'treaty',
    claim:
      'Cherokee delegation led by Bloody Fellow met with Secretary Knox on January 7, 9, and 11, 1792',
    source: 'Cherokee Delegation to Philadelphia report, Knox to Washington January 17, 1792',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-019',
    category: 'treaty',
    claim:
      'Cherokee delegation members were Nenetooyah (Bloody Fellow), Chutloh (Kingfisher), Nontuaka (the Northward), Teesteke (the Disturber), and Katigoslah (the Prince)',
    source: 'Cherokee Delegation to Philadelphia report, January 1792',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-020',
    category: 'treaty',
    claim:
      'Cherokee requested $1,500 annuity during original negotiations, but Blount claimed lack of authority; Washington and Senate approved increase on January 20, 1792',
    source: 'Knox report to Washington, January 17, 1792; Senate Executive Journal',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-021',
    category: 'treaty',
    claim:
      'A trade agreement was signed on October 12, 1794, between David Moore (boat captain) and tribal representatives including Opoca Mingo, facilitating goods transport with Chickasaw and Choctaw assistance',
    source: 'MASTER_INDEX.md (Tennessee Virtual Archive p15138coll18)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'chickasaw.{0,20}trade.{0,20}179[0-3]', // Wrong year (was 1794)
      'chickasaw.{0,20}trade.{0,20}179[5-9]', // Wrong year
      'chickasaw.{0,20}october [1-9]\\,', // Wrong day (was Oct 12)
    ],
  },

  // === TIMELINE ===
  {
    id: 'tim-001',
    category: 'timeline',
    claim: 'Southwest Territory created by Congress in 1790',
    source: 'Congressional records; Tennessee Encyclopedia',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'tim-002',
    category: 'timeline',
    claim: 'Tennessee achieved statehood on June 1, 1796',
    source: 'Congressional records',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'tim-003',
    category: 'timeline',
    claim: 'Territorial capital moved from Rocky Mount to Knoxville circa 1792',
    source: 'Tennessee Encyclopedia; scholarly consensus',
    sourceType: 'scholarly',
    confidence: 'high',
    dateRange: { start: '1791-12', end: '1792-06' },
  },
  {
    id: 'tim-004',
    category: 'timeline',
    claim:
      '15-acre parcel purchased by Rocky Mount Historical Association for $365,000 in October 2021',
    source: 'WJHL news article, October 14, 2021',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'tim-005',
    category: 'timeline',
    claim:
      'John Michael Massengill transferred property to State of Tennessee in 1958, opened to public April 1, 1962',
    source: 'Bristol Herald Courier, January 13, 2023; Tennessee Historical Commission records',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'tim-006',
    category: 'timeline',
    claim:
      "The Knoxville Gazette, Tennessee's first newspaper, published its first issue on November 5, 1791, founded by George Roulstone and Robert Ferguson",
    source: 'MASTER_INDEX.md + knoxville-gazette-transcriptions.md',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'knoxville gazette.{0,20}(founded|established|started|began|first issued).{0,20}179[0]', // Wrong founding year (was 1791)
      'knoxville gazette.{0,20}(founded|established|started|began|first issued).{0,20}179[2-9]', // Wrong founding year
      'knoxville gazette.{0,20}(founded|established|started|began|first issued).{0,20}november [1-4]\\,', // Wrong founding day (was Nov 5)
      'knoxville gazette.{0,20}(founded|established|started|began|first issued).{0,20}november [6-9]\\,', // Wrong founding day
      'knoxville gazette.{0,20}first.{0,20}knoxville', // Initially published in ROGERSVILLE, not Knoxville
    ],
  },
  {
    id: 'tim-007',
    category: 'timeline',
    claim:
      'The Knoxville Gazette was initially published in Rogersville, Tennessee, before moving to Knoxville',
    source: 'MASTER_INDEX.md + knoxville-gazette-transcriptions.md',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'knoxville gazette.{0,20}always.{0,20}knoxville', // Initially in Rogersville
      'knoxville gazette.{0,20}founded.{0,20}knoxville', // Founded in Rogersville
      'knoxville gazette.{0,20}never.{0,20}moved', // DID move to Knoxville
    ],
  },

  // === CHEROKEE ===
  {
    id: 'chr-001',
    category: 'cherokee',
    claim:
      'Hanging Maw (Uskwa\'li-gu\'ta, "his stomach hangs down") served as Principal Chief of the Upper Towns (Overhill Cherokee) from 1788 to 1794',
    source: '025-cherokee-treaty-signatories.md (War Department Papers)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'hanging maw.{0,20}178[0-7]', // Wrong years before 1788
      'hanging maw.{0,20}179[5-9]', // Wrong years after 1794
      'hanging maw.{0,20}180\\d', // Wrong century
    ],
  },
  {
    id: 'chr-002',
    category: 'cherokee',
    claim:
      'Bloody Fellow (Nenetooyah/Iskagua) received the title of "General" from President George Washington during a Philadelphia delegation visit in early 1792 - perhaps the only Cherokee to receive this honor prior to the Civil War',
    source: '025-cherokee-treaty-signatories.md (federal correspondence)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'bloody fellow.{0,20}general.{0,20}179[0-1]', // Wrong year (was 1792)
      'bloody fellow.{0,20}general.{0,20}179[3-9]', // Wrong year
      'bloody fellow.{0,20}colonel', // Wrong rank
      'bloody fellow.{0,20}captain', // Wrong rank
    ],
  },
  {
    id: 'chr-003',
    category: 'cherokee',
    claim:
      "John Watts led an attack on Buchanan's Station in September 1792 with over 1,000 Cherokee, Muscogee, and Shawnee warriors - one of the largest Native forces seen in the region",
    source: '025-cherokee-treaty-signatories.md (military records) + Knoxville Gazette No. 13',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'buchanan.{0,20}179[0-1]', // Wrong year (was Sept 1792)
      'buchanan.{0,20}179[3-9]', // Wrong year
      'buchanan.{0,20}500 warriors', // Wrong count (was 1,000+)
      'buchanan.{0,20}200 warriors', // Wrong count
    ],
  },
  {
    id: 'chr-004',
    category: 'cherokee',
    claim:
      'Doublehead was killed on August 9, 1807, by Major Ridge, Alex Saunders, and John Rogers, either for control of cotton trade or for ceding Indian lands',
    source: '025-cherokee-treaty-signatories.md (Cherokee Nation records)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'doublehead.{0,20}killed.{0,20}180[0-6]', // Wrong year (was 1807)
      'doublehead.{0,20}killed.{0,20}180[8-9]', // Wrong year
      'doublehead.{0,20}august [1-8]', // Wrong day (was August 9)
      'doublehead.{0,20}murdered.{0,20}john watts', // Wrong killer
    ],
  },
  {
    id: 'chr-005',
    category: 'cherokee',
    claim:
      'Black Fox (Enola/Inali) served as Principal Chief of the Cherokee Nation from 1801 to 1811, succeeding Little Turkey',
    source: '025-cherokee-treaty-signatories.md (Cherokee Nation records)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'black fox.{0,20}chief.{0,20}179\\d', // Wrong century (was 1801-1811)
      'black fox.{0,20}chief.{0,20}180[0]', // Before his chiefdom
      'black fox.{0,20}chief.{0,20}181[2-9]', // After his chiefdom
      'black fox.{0,20}succeeded.{0,20}hanging maw', // Wrong predecessor (was Little Turkey)
    ],
  },

  // === ADMINISTRATION ===
  {
    id: 'adm-001',
    category: 'administration',
    claim:
      'An Ordinance for Circumscribing Counties was signed on June 11, 1792, defining the boundaries of Greene and Hawkins Counties, with William Blount and Daniel Smith as signatories',
    source: 'MASTER_INDEX.md (Tennessee Virtual Archive tfd/528)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'greene.{0,20}hawkins.{0,20}counties.{0,20}179[0-1]', // Wrong year (was 1792)
      'greene.{0,20}hawkins.{0,20}counties.{0,20}179[3-9]', // Wrong year
      'ordinance.{0,20}june [1-9]\\,', // Wrong day (was June 11)
    ],
  },
  {
    id: 'adm-002',
    category: 'administration',
    claim:
      'An Act for District Jail Funding was passed on September 27, 1794, providing for construction of a district jail and stocks in Nashville',
    source: 'MASTER_INDEX.md (Tennessee Virtual Archive tfd/540)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'nashville.{0,20}jail.{0,20}179[0-3]', // Wrong year (was 1794)
      'nashville.{0,20}jail.{0,20}179[5-9]', // Wrong year
      'nashville.{0,20}jail.{0,20}september [1-9]\\,', // Wrong day (was Sept 27)
    ],
  },
  {
    id: 'adm-003',
    category: 'administration',
    claim:
      'An Act to Cut and Clear Wagon Road was passed on September 27, 1794, authorizing construction of a wagon road to Cumberland River settlements from Washington District',
    source: 'MASTER_INDEX.md (Tennessee Virtual Archive tfd/535)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'wagon road.{0,20}cumberland.{0,20}179[0-3]', // Wrong year (was 1794)
      'wagon road.{0,20}cumberland.{0,20}179[5-9]', // Wrong year
      'wagon road.{0,20}september [1-9]\\,', // Wrong day (was Sept 27)
    ],
  },
  {
    id: 'adm-004',
    category: 'administration',
    claim:
      "An Act for Washington College Establishment was passed on July 10, 1795, renaming St. Martin's Academy to honor President Washington",
    source: 'MASTER_INDEX.md (Tennessee Virtual Archive tfd/22)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'washington college.{0,20}179[0-4]', // Wrong year (was 1795)
      'washington college.{0,20}179[6-9]', // Wrong year
      'washington college.{0,20}july [1-9]\\,', // Wrong day (was July 10)
    ],
  },
  {
    id: 'adm-005',
    category: 'administration',
    claim:
      'An Act for Enumeration of Inhabitants was passed on July 11, 1795, establishing a territorial census framework, signed by William Blount and Joseph Hardin',
    source: 'MASTER_INDEX.md (Tennessee Virtual Archive tfd/550)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'census.{0,20}act.{0,20}179[0-4]', // Wrong year (was 1795)
      'census.{0,20}act.{0,20}179[6-9]', // Wrong year
      'enumeration.{0,20}july [1-9]\\,', // Wrong day (was July 11)
    ],
  },
  {
    id: 'adm-006',
    category: 'administration',
    claim:
      'The first General Assembly of the Southwest Territory convened on February 24, 1794, at Knoxville',
    source: 'MASTER_INDEX.md (Tennessee Virtual Archive)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'first.{0,20}assembly.{0,20}179[0-3]', // Wrong year (was 1794)
      'first.{0,20}assembly.{0,20}179[5-9]', // Wrong year
      'first.{0,20}assembly.{0,20}february [1-9]\\,', // Wrong day (was Feb 24)
      'first.{0,20}assembly.{0,20}rocky mount', // Wrong location (was Knoxville)
    ],
  },
  {
    id: 'adm-007',
    category: 'administration',
    claim:
      'Elections for constitutional convention delegates were called on January 11, 1796, by Governor Blount',
    source: 'MASTER_INDEX.md (Tennessee Virtual Archive)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'convention.{0,20}elections.{0,20}179[0-5]', // Wrong year (was 1796)
      'convention.{0,20}elections.{0,20}january [1-9]\\,', // Wrong day (was Jan 11)
    ],
  },
  {
    id: 'adm-008',
    category: 'administration',
    claim:
      'The Tennessee Constitutional Convention convened on February 6, 1796, with fifty-five delegates who adopted the Tennessee Constitution',
    source: 'MASTER_INDEX.md (Tennessee Virtual Archive tfd/681)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'constitutional.{0,20}convention.{0,20}179[0-5]', // Wrong year (was 1796)
      'constitutional.{0,20}convention.{0,20}february [1-5]\\,', // Wrong day (was Feb 6)
      'constitutional.{0,20}convention.{0,20}5[0-4] delegates', // Wrong count (was 55)
      'constitutional.{0,20}convention.{0,20}5[6-9] delegates', // Wrong count
    ],
  },
  {
    id: 'adm-009',
    category: 'administration',
    claim:
      'The territorial census of November 28, 1795, documented 77,262 inhabitants across eleven counties, exceeding the 60,000 requirement for statehood',
    source: 'MASTER_INDEX.md (territorial census records)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      '1795.{0,20}census.{0,20}7[0-6]\\,\\d{3}', // Wrong count (was 77,262)
      '1795.{0,20}census.{0,20}7[8-9]\\,\\d{3}', // Wrong count
      '1795.{0,20}census.{0,20}[1-9]\\d\\,\\d{3}', // Wrong magnitude
      'census.{0,20}179[0-4]', // Wrong year (was 1795)
    ],
  },
  {
    id: 'adm-010',
    category: 'administration',
    claim: 'The territorial population in 1791 was estimated at approximately 35,691 residents',
    source: 'MASTER_INDEX.md (Tennessee Encyclopedia citing period estimates)',
    sourceType: 'scholarly',
    confidence: 'high',
    wrongVariants: [
      '1791.{0,20}population.{0,20}3[0-4]\\,\\d{3}', // Wrong count (was ~35,691)
      '1791.{0,20}population.{0,20}3[6-9]\\,\\d{3}', // Wrong count
      '1791.{0,20}population.{0,20}[1-2]\\d\\,\\d{3}', // Wrong magnitude
      '1791.{0,20}population.{0,20}[4-9]\\d\\,\\d{3}', // Wrong magnitude
    ],
  },

  // === VIOLENCE ===
  {
    id: 'vio-001',
    category: 'violence',
    claim:
      'James Kilpatrick was killed by Indians on September 5, 1791, on Poor Valley Creek, about 17 miles from Hawkins Courthouse',
    source: 'Knoxville Gazette Vol. I, No. 1, November 5, 1791',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'kilpatrick.{0,20}killed.{0,20}179[0]', // Wrong year (was 1791)
      'kilpatrick.{0,20}killed.{0,20}179[2-9]', // Wrong year
      'kilpatrick.{0,20}september [1-4]\\,', // Wrong day (was Sept 5)
      'kilpatrick.{0,20}september [6-9]\\,', // Wrong day
    ],
  },
  {
    id: 'vio-002',
    category: 'violence',
    claim:
      "General St. Clair's army was defeated on November 4, 1791, with 46 commissioned officers killed, 25 wounded, and approximately 600 privates lost",
    source: 'Knoxville Gazette Vol. I, No. 2, December 3, 1791',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'st\\.? clair.{0,20}179[0]', // Wrong year (was 1791)
      'st\\.? clair.{0,20}179[2-9]', // Wrong year
      'st\\.? clair.{0,20}november [1-3]\\,', // Wrong day (was Nov 4)
      'st\\.? clair.{0,20}november [5-9]\\,', // Wrong day
      'st\\.? clair.{0,20}[1-3]\\d officers', // Wrong count (was 46 killed)
      'st\\.? clair.{0,20}[5-9]\\d officers', // Wrong count
    ],
  },
  {
    id: 'vio-003',
    category: 'violence',
    claim:
      'Captain Jacob Tipton, from Washington in the territory, was mortally wounded at St. Clair\'s Defeat and reportedly said "My brave fellows, I am a dead man; do you fight on..." before dying',
    source: 'Knoxville Gazette Vol. I, No. 3, December 17, 1791',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'jacob tipton.{0,20}killed.{0,20}179[0]', // Wrong year (was 1791)
      'jacob tipton.{0,20}killed.{0,20}179[2-9]', // Wrong year
      'captain tipton.{0,20}virginia', // Wrong location (was from Washington territory)
      'captain tipton.{0,20}kentucky', // Wrong location
    ],
  },
  {
    id: 'vio-004',
    category: 'violence',
    claim:
      "Harper Ratcliff's family was attacked in Stanley Valley on April 5, 1792, with his wife and three children killed by Indians",
    source: 'Knoxville Gazette Vol. I, No. 5, April 21, 1792',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'ratcliff.{0,20}attack.{0,20}179[0-1]', // Wrong year (was 1792)
      'ratcliff.{0,20}attack.{0,20}179[3-9]', // Wrong year
      'ratcliff.{0,20}april [1-4]\\,', // Wrong day (was April 5)
      'ratcliff.{0,20}april [6-9]\\,', // Wrong day
      'ratcliff.{0,20}[1-2] children', // Wrong count (was 3 children)
      'ratcliff.{0,20}[4-9] children', // Wrong count
    ],
  },
  {
    id: 'vio-005',
    category: 'violence',
    claim:
      "Buchanan's Station (near Nashville) was besieged on September 30, 1792, by approximately 300 Creek and Cherokee warriors, with the fort successfully defended",
    source: 'Knoxville Gazette Vol. I, No. 13, October 6, 1792',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'buchanan.{0,20}station.{0,20}179[0-1]', // Wrong year (was 1792)
      'buchanan.{0,20}station.{0,20}179[3-9]', // Wrong year
      'buchanan.{0,20}september [1-9]\\,', // Wrong day (was Sept 30)
      'buchanan.{0,20}october', // Wrong month (was September)
      'buchanan.{0,20}station.{0,20}captured', // Station was NOT captured (successfully defended)
      'buchanan.{0,20}station.{0,20}fell', // Station did NOT fall
    ],
  },
  {
    id: 'vio-006',
    category: 'violence',
    claim:
      'Nickajack and Running Water (Cherokee towns in the Chickamauga region) were attacked on September 24, 1794, by militia under James Ore, with 50+ Indians killed',
    source: 'MASTER_INDEX.md (War Department Papers)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'nickajack.{0,20}179[0-3]', // Wrong year (was 1794)
      'nickajack.{0,20}179[5-9]', // Wrong year
      'running water.{0,20}179[0-3]', // Wrong year (was 1794)
      'running water.{0,20}179[5-9]', // Wrong year
      'nickajack.{0,20}september [1-9]\\,', // Wrong day (was Sept 24)
    ],
  },
  {
    id: 'vio-007',
    category: 'violence',
    claim:
      "Mr. Wells's two sons were killed by Indians on June 16, 1792, approximately 12 miles from Knoxville",
    source: 'Knoxville Gazette Vol. I, No. 7, June 2, 1792',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'wells.{0,20}sons.{0,20}179[0-1]', // Wrong year (was 1792)
      'wells.{0,20}sons.{0,20}179[3-9]', // Wrong year
      'wells.{0,20}june [1-9]\\,', // Wrong day (was June 16)
      'wells.{0,20}[1] son', // Wrong count (was 2 sons)
      'wells.{0,20}[3-9] sons', // Wrong count
    ],
  },
  {
    id: 'vio-008',
    category: 'violence',
    claim:
      'Greenfield Station in Sumner County was attacked on April 28, 1794, with multiple casualties',
    source: 'MASTER_INDEX.md (Tennessee Encyclopedia)',
    sourceType: 'primary',
    confidence: 'high',
    wrongVariants: [
      'greenfield.{0,20}station.{0,20}179[0-3]', // Wrong year (was 1794)
      'greenfield.{0,20}station.{0,20}179[5-9]', // Wrong year
      'greenfield.{0,20}april [1-9]\\,', // Wrong day (was April 28)
    ],
  },

  // === PEOPLE (Extended Biographies - MEDIUM Priority Extraction) ===
  {
    id: 'ppl-016',
    category: 'people',
    claim:
      'Daniel Smith (1748-1818) served as Territorial Secretary and was a surveyor and cartographer who published a boundary survey journal from August 1779 to July 1780',
    source:
      'MASTER_INDEX.md citing Library of Congress; Daniel Smith boundary survey journal (1779-1780)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'daniel smith.{0,20}survey.{0,20}178[0-8]', // Wrong year range (was 1779-1780)
      'daniel smith.{0,20}survey.{0,20}179[1-9]', // Wrong year range
    ],
  },
  {
    id: 'ppl-017',
    category: 'people',
    claim:
      "Daniel Smith created 'A Map of the Tennessee government' in 1794 showing the territorial boundaries and surveys",
    source:
      'MASTER_INDEX.md (Tennessee Virtual Archive maps p15138coll23/73); map artifact exists in TeVA',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'daniel smith.{0,20}map.{0,20}179[0-3]', // Wrong year (was 1794)
      'daniel smith.{0,20}map.{0,20}179[5-9]', // Wrong year
      'daniel smith.{0,20}map.{0,20}180\\d', // Wrong decade
    ],
  },
  {
    id: 'ppl-018',
    category: 'people',
    claim:
      'Daniel Smith chaired the committee drafting the Tennessee Constitution and Bill of Rights and presided over the 32-provision Declaration of Rights',
    source: 'MASTER_INDEX.md (Tennessee Encyclopedia); constitutional convention records',
    sourceType: 'scholarly',
    confidence: 'high',
    wrongVariants: [
      'daniel smith.{0,20}vice chair', // He was CHAIR, not vice chair
      'daniel smith.{0,20}3[0-1] provision', // Wrong count (was 32)
      'daniel smith.{0,20}3[3-9] provision', // Wrong count
    ],
  },
  {
    id: 'ppl-019',
    category: 'people',
    claim:
      'John Sevier was born on September 23, 1745, near New Market, Shenandoah Valley, Virginia, to Valentine Sevier and Joanna Goade',
    source: '026-john-sevier-biography.md (genealogical records)',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'john sevier.{0,20}born.{0,20}174[0-4]', // Wrong year (was 1745)
      'john sevier.{0,20}born.{0,20}174[6-9]', // Wrong year
      'john sevier.{0,20}september [1-9]\\,', // Wrong day (was Sept 23)
      'john sevier.{0,20}september 2[4-9]\\,', // Wrong day
    ],
  },
  {
    id: 'ppl-020',
    category: 'people',
    claim: 'John Sevier died on September 24, 1815, near Fort Decatur, Alabama Territory',
    source: '026-john-sevier-biography.md (historical death records)',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'john sevier.{0,20}died.{0,20}181[0-4]', // Wrong year (was 1815)
      'john sevier.{0,20}died.{0,20}181[6-9]', // Wrong year
      'john sevier.{0,20}september [1-9]\\,', // Wrong day (was Sept 24)
      'john sevier.{0,20}september 2[5-9]\\,', // Wrong day
      'john sevier.{0,20}died.{0,20}tennessee', // Wrong location (was Alabama Territory)
    ],
  },
  {
    id: 'ppl-021',
    category: 'people',
    claim:
      'John Sevier married Sarah Hawkins in 1761 when he was 16 years old; she was the daughter of Joseph and Sarah Marlin Hawkins, a wealthy Virginia trader',
    source: '026-john-sevier-biography.md (genealogical records)',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'john sevier.{0,20}married.{0,20}176[0]', // Wrong year (was 1761)
      'john sevier.{0,20}married.{0,20}176[2-9]', // Wrong year
      'john sevier.{0,20}age [1-9]\\D', // Wrong age (was 16)
      'john sevier.{0,20}age 1[0-5]', // Wrong age
      'john sevier.{0,20}age 1[7-9]', // Wrong age
    ],
  },
  {
    id: 'ppl-022',
    category: 'people',
    claim:
      'John Sevier married Catherine "Bonny Kate" Sherrill in 1780 following Sarah Hawkins\'s death; he had rescued her during the 1776 Siege of Fort Watauga by pulling her over the palisade while being chased by a Cherokee warrior',
    source:
      '026-john-sevier-biography.md (marriage documented; rescue story is frontier tradition, properly noted)',
    sourceType: 'scholarly',
    confidence: 'high',
    wrongVariants: [
      'john sevier.{0,20}catherine.{0,20}177[0-9]', // Wrong year (was 1780)
      'john sevier.{0,20}catherine.{0,20}179[1-9]', // Wrong year
      'john sevier.{0,20}catherine.{0,20}178[1-9]', // Wrong year
    ],
  },
  {
    id: 'ppl-023',
    category: 'people',
    claim: 'John Sevier had 18 children total: 10 with Sarah Hawkins and 8 with Catherine Sherrill',
    source:
      '026-john-sevier-biography.md (complete genealogical list with names: Joseph, James, John, Elizabeth, Sarah, Mary Ann, Valentine, Rebecca, Richard, Nancy [Sarah]; Catherine, Ruthe, George Washington, Samuel, Polly, Eliza, Joanna, Robert [Catherine])',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'john sevier.{0,20}1[0-7] children', // Wrong total (was 18)
      'john sevier.{0,20}1[9]\\+ children', // Wrong total
      'john sevier.{0,20}[0-9] children.{0,20}sarah', // Wrong count with Sarah (was 10)
      'john sevier.{0,20}1[1-9] children.{0,20}sarah', // Wrong count
      'john sevier.{0,20}[0-7] children.{0,20}catherine', // Wrong count with Catherine (was 8)
      'john sevier.{0,20}[9]\\+ children.{0,20}catherine', // Wrong count
    ],
  },
  {
    id: 'ppl-024',
    category: 'people',
    claim:
      "John Sevier was one of the leaders of the Overmountain Men at the Battle of King's Mountain (October 7, 1780), a turning point in the Revolutionary War's Southern Campaign",
    source:
      "026-john-sevier-biography.md (Revolutionary War records); 'The victory, a turning point in the Revolution in the South, brought widespread recognition to Sevier'",
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'king.{0,5}mountain.{0,20}177[0-9]', // Wrong year (was 1780)
      'king.{0,5}mountain.{0,20}179[1-9]', // Wrong year
      'king.{0,5}mountain.{0,20}178[1-9]', // Wrong year
      'king.{0,5}mountain.{0,20}october [1-6]\\,', // Wrong day (was Oct 7)
      'king.{0,5}mountain.{0,20}october [8-9]\\,', // Wrong day
    ],
  },
  {
    id: 'ppl-025',
    category: 'people',
    claim:
      'James Robertson, Brigadier General of Militia for Mero District, was known as the "Father of Tennessee" and was a Cumberland Compact signatory in 1780',
    source:
      "PROSOPOGRAPHY-ANALYSIS.md + MASTER_INDEX.md; multiple sources document Robertson's foundational role",
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'james robertson.{0,20}father.{0,20}kentucky', // Wrong state (was Tennessee)
      'james robertson.{0,20}cumberland.{0,20}179[1-9]', // Wrong year for Compact (was 1780)
      'james robertson.{0,20}cumberland.{0,20}177[0-9]', // Wrong decade
      'james robertson.{0,20}washington district', // Wrong district (was Mero District)
    ],
  },
  {
    id: 'ppl-026',
    category: 'people',
    claim:
      'William Cobb was appointed magistrate by the North Carolina legislature in 1777 and served as county magistrate',
    source: 'additional-articles.md (Tennessee Encyclopedia); PROSOPOGRAPHY-ANALYSIS.md',
    sourceType: 'scholarly',
    confidence: 'high',
    wrongVariants: [
      'william cobb.{0,20}magistrate.{0,20}177[0-6]', // Wrong year (was 1777)
      'william cobb.{0,20}magistrate.{0,20}178\\d', // Wrong decade
      'william cobb.{0,20}magistrate.{0,20}179\\d', // Wrong decade
      'william cobb.{0,20}virginia.{0,20}magistrate', // Wrong state (was NC legislature)
    ],
  },

  // === GEOGRAPHY ===
  {
    id: 'geo-001',
    category: 'geography',
    claim:
      'Rocky Mount was strategically located between the Holston and Watauga Rivers (the actual confluence/fork is at Kingsport, approximately 15+ miles distant)',
    source:
      'GEOGRAPHIC-ANALYSIS.md; Comprehensive Fact-Check 2024 (corrects earlier "at fork" error)',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'rocky mount.{0,20}tennessee river', // Wrong rivers (was Holston and Watauga)
      'rocky mount.{0,20}cumberland river', // Wrong river
      'rocky mount.{0,20}french broad', // Wrong river
      'at.{0,10}fork.{0,10}holston.{0,10}watauga', // Wrong location (fork is 15+ miles away at Kingsport)
      'confluence.{0,10}holston.{0,10}watauga', // Confluence is at Kingsport, not Rocky Mount
      'where.{0,10}rivers.{0,10}meet', // Rivers don't meet at Rocky Mount
    ],
  },
  {
    id: 'geo-002',
    category: 'geography',
    claim:
      "The 150-mile journey between Rocky Mount (Washington District) and Daniel Smith's residence in Sumner County (Mero District) crossed active Cherokee conflict zones, illustrating the administrative challenges of governing the territory's two disconnected population centers",
    source: 'Comprehensive Fact-Check 2024; Territorial geography analysis',
    sourceType: 'scholarly',
    confidence: 'verified',
  },

  // === NEW FACTS FROM 2024 FACT-CHECK ===
  {
    id: 'gov-018',
    category: 'governance',
    claim:
      'Blount\'s wife Mary "Molsey" Blount and their children arrived at Rocky Mount in December 1791 (not December 1790), over a year after William arrived; Mary had refused to move unless William built her a "mansion"',
    source: 'Blount Mansion scholarly documents; Comprehensive Fact-Check 2024',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'family.*arrived.*december.*1790', // Wrong year (was December 1791)
      'wife.*arrived.*1790', // Wrong year
      'mary.*blount.*arrived.*1790', // Wrong year
      'molsey.*1790', // Wrong year
    ],
  },
  {
    id: 'gov-019',
    category: 'governance',
    claim:
      'William Blount governed the Southwest Territory autocratically for over three years, refusing to call the territorial legislature into session and ruling by edict or direct order with minimal oversight',
    source: 'Comprehensive Fact-Check 2024; Territorial governance analysis',
    sourceType: 'scholarly',
    confidence: 'high',
  },
  {
    id: 'tim-008',
    category: 'timeline',
    claim:
      'Marietta, Ohio served as the Northwest Territory capital starting in July 1788, predating Rocky Mount as a U.S. territorial capital by over two years',
    source: 'Comprehensive Fact-Check 2024; Ohio Historical Society',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'oldest territorial capital', // Wrong (Marietta 1788 predates Rocky Mount 1790)
      'first territorial capital in america', // Wrong
      'first u\\.?s\\.? territorial capital', // Wrong
      'rocky mount.{0,20}first(?!.*southwest).{0,30}territorial capital', // Misleading without "Southwest Territory" qualifier
    ],
  },
  {
    id: 'tim-009',
    category: 'timeline',
    claim:
      'Corn was first planted in Tennessee settlements in the Cumberland region (1778-1779) and Nolichucky settlements (early 1770s), not in 1790',
    source: 'Comprehensive Fact-Check 2024; Settlement histories',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'corn.*first.*planted.*1790', // Wrong (was 1770s-1779)
      '1790.*corn.*first', // Wrong year
      'first crop.*1790', // Misleading if referring to corn
    ],
  },
  {
    id: 'ppl-027',
    category: 'people',
    claim:
      "Willie Blount served as William Blount's private secretary; Daniel Smith was the official Territorial Secretary appointed by President George Washington",
    source: 'Comprehensive Fact-Check 2024; Territorial appointment records',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'willie.*blount.*territorial secretary', // Wrong (was private secretary)
      'willie blount.*official.*secretary', // Wrong
      'willie.*appointed.*washington', // Wrong (William was appointed, Willie was private secretary)
    ],
  },
  {
    id: 'ppl-028',
    category: 'people',
    claim:
      'Andrew Jackson lodged at Rocky Mount for approximately six weeks while awaiting his law license in nearby Jonesborough, making him one of the notable guests alongside Daniel Boone, John Sevier, and Richard Henderson',
    source: 'Comprehensive Fact-Check 2024; Tennessee historical records',
    sourceType: 'scholarly',
    confidence: 'high',
  },
  {
    id: 'ppl-029',
    category: 'people',
    claim:
      'George Farragut served as William Blount\'s militia muster-master and was the father of Admiral David Farragut, who became America\'s first admiral (famous for "Damn the torpedoes, full speed ahead!")',
    source: 'Comprehensive Fact-Check 2024; Naval historical records',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'adm-011',
    category: 'administration',
    claim:
      'The 1791 territorial census, initiated from Rocky Mount, counted 35,691 total residents including 3,417 enslaved people and 361 free people of color, exceeding the 5,000 threshold required for an elected territorial legislature',
    source: 'Comprehensive Fact-Check 2024; 1791 territorial census records',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'census.*179[02]', // Wrong year (was 1791)
      '1791.*5,?000.*residents', // Understates actual count (was 35,691)
      '1791.*30,?000.*residents', // Approximates but lacks precision
    ],
  },

  // === TIMELINE VERIFICATION BATCH (2026-02-03) ===
  {
    id: 'gov-020',
    category: 'governance',
    claim:
      'President Washington wrote to Secretary Knox on August 13, 1790, asking the crucial question "Where ought the Governor to reside?" regarding the Southwest Territory capital location',
    source:
      'Letter from Washington to Knox, August 13, 1790 (Founders Online, National Archives)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'washington.*capital.*179[1-9]', // Wrong year (was 1790)
      'washington.*where.*reside.*179[1-9]', // Wrong year for capital question
      'washington.{1,20}asked.{1,20}august [1-9]\\,', // Wrong day (was Aug 13)
      'washington.{1,20}asked.{1,20}august 1[4-9]\\,', // Wrong day (Washington asked on Aug 13)
    ],
  },
  {
    id: 'gov-021',
    category: 'governance',
    claim:
      'Secretary of War Henry Knox responded to Washington on August 17, 1790, recommending that the territorial governor reside in the Holston settlements as the most populous and established frontier community',
    source:
      'Letter from Knox to Washington, August 17, 1790 (Founders Online, National Archives)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'knox.*recommend.*reside.*179[1-9]', // Wrong year for recommendation (was 1790)
      'knox.{1,15}responded.{1,20}august [1-9]\\,', // Wrong day (was Aug 17)
      'knox.{1,15}responded.{1,20}august 1[8-9]\\,', // Wrong day
    ],
  },
  {
    id: 'gov-022',
    category: 'governance',
    claim:
      'Henry Knox specifically mentioned William Cobb\'s residence in his August 17, 1790 letter to Washington, describing it as "a respectable residence" that was "commodious and well suited to the dignity of the office" for the territorial governor',
    source:
      'Letter from Knox to Washington, August 17, 1790 (Founders Online, National Archives)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-023',
    category: 'governance',
    claim:
      'Hugh Williamson wrote to President Washington on May 28, 1790, endorsing William Blount as "a gentleman of considerable property and influence" with experience in Indian affairs and ability to unite frontier factions in support of federal government',
    source:
      'Letter from Williamson to Washington, May 28, 1790 (Founders Online, National Archives)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'williamson.*blount.*179[1-9]', // Wrong year (was 1790)
      'williamson.*may [1-9]\\,', // Wrong day (was May 28)
      'williamson.*may 2[9-9]\\,', // Wrong day
      'williamson.*may 3\\d\\,', // Wrong day (impossible)
    ],
  },
  {
    id: 'gov-024',
    category: 'governance',
    claim:
      'William Blount wrote to Secretary Knox on October 20, 1790, describing his arrival on "the 11th instant" and his accommodations with "Glass Windows, Fireplace, etc., etc." at William Cobb\'s residence, noting glass windows were a frontier status symbol',
    source:
      'Letter from Blount to Knox, October 20, 1790 (Tennessee Encyclopedia, Blount Papers)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'glass.*windows.*179[1-9]', // Wrong year (was 1790)
      'glass.*windows.*october [1-9]\\,', // Wrong day for letter (was Oct 20)
      'glass.*windows.*october 2[1-9]\\,', // Wrong day
    ],
  },
  {
    id: 'gov-025',
    category: 'governance',
    claim:
      'The United States Senate confirmed William Blount\'s appointment as territorial governor on June 8, 1790, one day after President Washington\'s nomination',
    source: 'Senate records; Founders Online, National Archives',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'senate.*blount.*179[1-9]', // Wrong year (was 1790)
      'confirmed.*june [1-7]\\,', // Wrong day (was June 8)
      'confirmed.*june [9]\\,', // Wrong day
      'confirmed.*june 1\\d\\,', // Wrong day
    ],
  },
  {
    id: 'trt-022',
    category: 'treaty',
    claim:
      'Five Cherokee chiefs met with Secretary of War Henry Knox in Philadelphia on January 7, 9, and 11, 1792, to present objections to the Treaty of Holston and demand increased annuity',
    source:
      'Knox report to Washington, January 17, 1792 (Founders Online, National Archives)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'cherokee.*philadelphia.*179[0-1]', // Wrong year (was 1792)
      'cherokee.*philadelphia.*179[3-9]', // Wrong year
      'cherokee.{1,20}met.{1,20}january [1-6]\\,', // Wrong first meeting day (was Jan 7)
      'cherokee.{1,20}met.{1,20}january 1[2-9]\\,', // After last meeting (was Jan 11, report was Jan 17)
    ],
  },
  {
    id: 'trt-023',
    category: 'treaty',
    claim:
      'The Cherokee delegation that met with Knox in January 1792 demanded six specific items: increased annuity to $1,500, removal of encroachers, federal representative, blocking Muscle Shoals settlement, agricultural implements, and trusted interpreters',
    source:
      'Knox report to Washington, January 17, 1792; American State Papers Indian Affairs Vol. 1',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-024',
    category: 'treaty',
    claim:
      'Cherokee chiefs had requested $1,500 annuity during original July 1791 treaty negotiations, but Governor Blount claimed he lacked authority to grant it, leading to the Philadelphia delegation\'s demand for the increase',
    source:
      'Knox report to Washington, January 17, 1792 (Founders Online, National Archives)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-025',
    category: 'treaty',
    claim:
      'President Washington submitted Cherokee annuity increase request to Senate on January 18, 1792, and Senate approved it on January 20, 1792, demonstrating Cherokee diplomatic success in securing treaty amendments',
    source: 'Senate Executive Journal; Founders Online annotations',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'senate.*annuity.*179[0-1]', // Wrong year (was 1792)
      'senate.*annuity.*179[3-9]', // Wrong year
      'senate.*january [1-9]\\,', // Before submission (was Jan 18, approved Jan 20)
      'senate.*january 2[1-9]\\,', // After approval
    ],
  },
  {
    id: 'chr-006',
    category: 'cherokee',
    claim:
      'Little Turkey (Kaneeda), principal chief of Cherokee Upper Towns from 1788 to 1802, sent urgent warning on October 9, 1792: "The 5 lower towns will go to war the 8th of this month by themselves; without the consent of the Nation—You may know the good from the bad—do not come to war against the good"',
    source:
      'Knox to Washington, October 9, 1792 (Founders Online, National Archives)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'little turkey.*179[0-1]', // Before his warning (was 1792)
      'little turkey.*179[3-9]', // After his specific warning
      'little turkey.*october [1-8]\\,', // Before warning day
      'little turkey.*october 1\\d\\,', // After warning day
    ],
  },
  {
    id: 'chr-007',
    category: 'cherokee',
    claim:
      'Little Turkey identified Spanish influence on Cherokee Lower Towns in October 1792: "The Spaniards have given them ammunition and Guns, Hatchets Knives &ca—and told them not to go to war, but to keep them in reserve by them"',
    source:
      'Knox to Washington, October 9, 1792 (Founders Online, National Archives)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'chr-008',
    category: 'cherokee',
    claim:
      'Cherokee Nation was divided in 1792 between Upper Towns peace faction (led by Little Turkey, Hanging Maw, Bloody Fellow) and five Lower Towns war faction influenced by Spanish agents, with peace chiefs risking personal danger from their own people for maintaining American correspondence',
    source:
      'Knox to Washington, October 9, 1792; American State Papers Indian Affairs Vol. 1',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'chr-009',
    category: 'cherokee',
    claim:
      'Little Turkey pursued intertribal peace diplomacy in 1792, traveling to the Creeks himself and sending messages to Chickasaws and Choctaws, proposing that "a head-man from each nation might accompany him" to Philadelphia "that the whole might agree on one thing, and all be at peace"',
    source:
      'Knox to Washington, October 9, 1792 (Founders Online, National Archives)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'chr-010',
    category: 'cherokee',
    claim:
      'Cherokee National Council statement from April 11, 1810 honored Little Turkey: "Our former treaties were concluded and confirmed by your beloved President General Washington and Our beloved Man the Little Turkey, they were both sincere in their engagements"',
    source: 'Cherokee National Council to Return J. Meigs, April 11, 1810',
    sourceType: 'primary',
    confidence: 'verified',
  },

  // === BLOUNT-KNOX CORRESPONDENCE BATCH (2026-02-03) ===
  {
    id: 'gov-026',
    category: 'governance',
    claim:
      'Blount reported to Knox on November 3, 1790, that he had "taken measures for organizing the government of this territory" and that inhabitants "appear well disposed to support the authority of the United States"',
    source:
      'Letter from Blount to Knox, November 3, 1790 (American State Papers: Indian Affairs)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'blount.*organized.*179[1-9]', // Wrong year (was 1790)
      'blount.*organized.*november [1-2]\\,', // Wrong day (was Nov 3)
      'blount.*organized.*november [4-9]\\,', // Wrong day
    ],
  },
  {
    id: 'gov-027',
    category: 'governance',
    claim:
      'Blount reported on December 15, 1790, that "several Cherokee chiefs, including the principal chief known as the Hanging Maw, have visited me at Rocky Mount" expressing desire for peace and agreeing to "restrain their young men from acts of hostility, provided the settlers likewise refrain from encroachments on their lands"',
    source:
      'Letter from Blount to Knox, December 15, 1790 (American State Papers: Indian Affairs)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'hanging maw.*rocky mount.*179[1-9]', // Wrong year (was 1790)
      'hanging maw.*rocky mount.*december [1-9]\\,', // Wrong day (was Dec 15)
      'hanging maw.*rocky mount.*december 1[6-9]\\,', // Wrong day
    ],
  },
  {
    id: 'gov-028',
    category: 'governance',
    claim:
      'Blount issued proclamations in December 1790 "forbidding encroachments" on Cherokee lands, reporting that "some settlers continue to press beyond the established boundaries, which occasions uneasiness among the Indians"',
    source:
      'Letter from Blount to Knox, December 15, 1790 (American State Papers: Indian Affairs)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-029',
    category: 'governance',
    claim:
      'Blount reported on January 8, 1791, that "courts of law have been established throughout the territory" with judges entering duties, and "new settlements are forming, farms are being cleared, and the commerce of the territory increases daily"',
    source:
      'Letter from Blount to Knox, January 8, 1791 (American State Papers: Indian Affairs)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'courts.*established.*179[02]', // Wrong year (was 1791)
      'courts.*established.*january [1-7]\\,', // Wrong day (was Jan 8)
      'courts.*established.*january [9]\\,', // Wrong day
      'courts.*established.*january 1\\d\\,', // Wrong day
    ],
  },
  {
    id: 'trt-026',
    category: 'treaty',
    claim:
      'Secretary Knox wrote to Blount on April 22, 1791, authorizing him to "negotiate and conclude a treaty of peace and friendship with the Cherokee Nation" with instructions to "establish definite boundaries" and promise "an annual payment, not exceeding one thousand dollars in goods"',
    source:
      'Letter from Knox to Blount, April 22, 1791 (American State Papers: Indian Affairs)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'knox.*treaty.*instructions.*179[02]', // Wrong year (was 1791)
      'knox.*treaty.*instructions.*179[2-9]', // Wrong year
      'knox.*april [1-9]\\,', // Wrong day (was April 22)
      'knox.*april 2[3-9]\\,', // Wrong day
      'knox.*1,?500.*authorized', // Wrong amount (was $1,000 authorized, not $1,500)
    ],
  },
  {
    id: 'trt-027',
    category: 'treaty',
    claim:
      'Blount reported on June 15, 1791, that "the Cherokee chiefs are assembling at White\'s Fort for the proposed treaty" with "more than thirty" chiefs already arrived including Hanging Maw, John Watts, and Doublehead',
    source:
      'Letter from Blount to Knox, June 15, 1791 (American State Papers: Indian Affairs)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'chiefs.*assembling.*179[02]', // Wrong year (was 1791)
      'chiefs.*assembling.*179[2-9]', // Wrong year
      'chiefs.*assembling.*june [1-9]\\,', // Wrong day (was June 15)
      'chiefs.*assembling.*june 1[6-9]\\,', // Wrong day
      'chiefs.*assembling.*rocky mount', // Wrong location (was White's Fort)
      'thirty.*chiefs.*rocky mount', // Wrong location
    ],
  },
  {
    id: 'trt-028',
    category: 'treaty',
    claim:
      'Thomas Jefferson, as Secretary of State, wrote to Blount on August 31, 1791, stating "the treaty which you concluded with the Cherokee Nation on the second of July has been received and laid before the Senate" and "The President is highly satisfied with the conduct of the negotiation"',
    source:
      'Letter from Jefferson to Blount, August 31, 1791 (Founders Online, National Archives)',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'jefferson.*treaty.*179[02]', // Wrong year (was 1791)
      'jefferson.*treaty.*179[2-9]', // Wrong year
      'jefferson.*august [1-9]\\,', // Wrong day (was Aug 31)
      'jefferson.*august 3[0]\\,', // Wrong day
      'jefferson.*september', // Wrong month (was August)
    ],
  },
  {
    id: 'trt-029',
    category: 'treaty',
    claim:
      'Jefferson stated in his August 31, 1791 letter that the Treaty of Holston "will be submitted to the Senate for their advice and consent at the commencement of their next session" and predicted "I have no doubt that it will receive their approbation"',
    source:
      'Letter from Jefferson to Blount, August 31, 1791 (Founders Online, National Archives)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'adm-012',
    category: 'administration',
    claim:
      'Knox instructed Blount in April 1791 to "endeavor to obtain a cession of as much land as can be procured consistently with the principles of justice" but warned to "not press the Indians beyond what they may be willing to concede"',
    source:
      'Letter from Knox to Blount, April 22, 1791 (American State Papers: Indian Affairs)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'adm-013',
    category: 'administration',
    claim:
      'Blount reported in January 1791 that "the Tennessee and Holston rivers affords convenient transportation for the produce of the country" as territorial commerce increased',
    source:
      'Letter from Blount to Knox, January 8, 1791 (American State Papers: Indian Affairs)',
    sourceType: 'primary',
    confidence: 'verified',
  },

  // === OVERMOUNTAIN CAMPAIGN (Kings Mountain) ===
  {
    id: 'ovm-001',
    category: 'people',
    claim:
      'Mary McKeehan Patton (1751-1836) provided over 500 pounds of gunpowder to the Overmountain Men at Sycamore Shoals in September 1780, essential to their victory at Kings Mountain',
    source: 'Tennessee Encyclopedia; Sycamore Shoals State Historic Park records',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'mary patton.{0,20}400 pounds', // Wrong amount (was 500+)
      'mary patton.{0,20}300 pounds', // Wrong amount
      'mary patton.{0,20}gunpowder.{0,20}rocky mount', // Delivered at Sycamore Shoals, not Rocky Mount
    ],
  },
  {
    id: 'ovm-002',
    category: 'people',
    claim:
      'Mary Patton learned gunpowder making from her father David McKeehan, a Scottish powder maker who emigrated from England to Pennsylvania around 1760',
    source: 'Tennessee Encyclopedia; Elizabethton Star citing Sycamore Shoals records',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ovm-003',
    category: 'timeline',
    claim:
      'The Overmountain Men mustered at Sycamore Shoals on September 25, 1780, received Rev. Samuel Doak\'s sermon with the battle cry "The Sword of the Lord and Gideon!", and began their march to Kings Mountain',
    source: 'NPS Overmountain Victory National Historic Trail; Tennessee Encyclopedia',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'overmountain.{0,20}muster.{0,20}september 2[0-4]', // Wrong day (was Sept 25)
      'overmountain.{0,20}muster.{0,20}september 2[6-9]', // Wrong day
      'overmountain.{0,20}muster.{0,20}rocky mount', // Mustered at Sycamore Shoals, not Rocky Mount
    ],
  },
  {
    id: 'ovm-004',
    category: 'timeline',
    claim:
      'The Battle of Kings Mountain occurred on October 7, 1780, resulting in the death of British Major Patrick Ferguson and the defeat of his Loyalist forces - described by Jefferson, Washington, and Gates as "the turning point of the American Revolution"',
    source: 'NPS Kings Mountain National Military Park; Tennessee Encyclopedia',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'kings mountain.{0,20}october [1-6]\\,', // Wrong day (was Oct 7)
      'kings mountain.{0,20}october [8-9]\\,', // Wrong day
      'kings mountain.{0,20}1781', // Wrong year (was 1780)
      'kings mountain.{0,20}1779', // Wrong year
    ],
  },
  {
    id: 'ovm-005',
    category: 'people',
    claim:
      'Two of Mary Patton\'s original gunpowder kettles are displayed at Sycamore Shoals State Park museum; a third kettle is at Rocky Mount State Historic Site',
    source: 'Sycamore Shoals State Historic Park; Rocky Mount State Historic Site records',
    sourceType: 'scholarly',
    confidence: 'high',
  },
  {
    id: 'ovm-006',
    category: 'people',
    claim:
      'Rev. Samuel Doak delivered a sermon at Sycamore Shoals on September 26, 1780, sending the Overmountain Men to Kings Mountain with the biblical battle cry from Judges 7: "The Sword of the Lord and Gideon!"',
    source: 'Tennessee Encyclopedia; Log College Press citing period accounts',
    sourceType: 'scholarly',
    confidence: 'high',
  },
]

/**
 * Result of checking text for historical errors
 */
export interface ErrorMatch {
  factId: string
  factClaim: string
  pattern: string
  matchedText: string
  matchIndex: number
  context: string
  severity: 'critical' | 'high' | 'medium'
}

/**
 * Check text for known historical errors using wrongVariants patterns
 * This is the main function for automated fact-checking
 */
export function checkForErrors(text: string): ErrorMatch[] {
  const lowerText = text.toLowerCase()
  const errors: ErrorMatch[] = []

  for (const fact of REFERENCE_LIBRARY) {
    if (!fact.wrongVariants) continue

    for (const pattern of fact.wrongVariants) {
      try {
        const regex = new RegExp(pattern, 'gi')
        let match
        while ((match = regex.exec(lowerText)) !== null) {
          // Determine severity based on fact category and ID
          let severity: 'critical' | 'high' | 'medium' = 'medium'
          if (fact.id === 'ppl-002')
            severity = 'critical' // Mary Cobb error
          else if (fact.id.startsWith('con-001'))
            severity = 'critical' // Construction date
          else if (fact.id.startsWith('trt-001') || fact.id.startsWith('trt-002'))
            severity = 'high' // Treaty location
          else if (fact.id.startsWith('gov-')) severity = 'high'

          errors.push({
            factId: fact.id,
            factClaim: fact.claim,
            pattern: pattern,
            matchedText: match[0],
            matchIndex: match.index,
            context: text.slice(Math.max(0, match.index - 40), match.index + match[0].length + 40),
            severity,
          })
        }
      } catch {
        // Invalid regex pattern, skip silently
      }
    }
  }

  // Deduplicate by matchIndex (same text might match multiple patterns)
  const seen = new Set<number>()
  return errors.filter((e) => {
    if (seen.has(e.matchIndex)) return false
    seen.add(e.matchIndex)
    return true
  })
}

/**
 * Get facts that would be contradicted by a claim
 */
export function findContradictions(claim: string): VerifiedFact[] {
  const lowerClaim = claim.toLowerCase()

  const contradictions: VerifiedFact[] = []

  // Check for Jackson 1788 claims against construction date
  if (lowerClaim.includes('jackson') && lowerClaim.includes('1788')) {
    const dendroFact = REFERENCE_LIBRARY.find((f) => f.id === 'con-001')
    if (dendroFact) contradictions.push(dendroFact)
  }

  // Check for pre-1827 construction claims
  const yearMatch = lowerClaim.match(/\b(17\d{2}|180\d|181\d|182[0-6])\b/)
  if (
    yearMatch &&
    (lowerClaim.includes('built') ||
      lowerClaim.includes('constructed') ||
      lowerClaim.includes('house'))
  ) {
    const dendroFact = REFERENCE_LIBRARY.find((f) => f.id === 'con-001')
    if (dendroFact) contradictions.push(dendroFact)
  }

  // Also check wrongVariants
  const errors = checkForErrors(claim)
  for (const error of errors) {
    const fact = REFERENCE_LIBRARY.find((f) => f.id === error.factId)
    if (fact && !contradictions.includes(fact)) {
      contradictions.push(fact)
    }
  }

  return contradictions
}

/**
 * Get facts related to a person
 */
export function getFactsAboutPerson(name: string): VerifiedFact[] {
  const lowerName = name.toLowerCase()
  return REFERENCE_LIBRARY.filter((f) => f.claim.toLowerCase().includes(lowerName))
}

/**
 * Get all facts in a category
 */
export function getFactsByCategory(category: VerifiedFact['category']): VerifiedFact[] {
  return REFERENCE_LIBRARY.filter((f) => f.category === category)
}

/**
 * Format facts for injection into AI prompt
 */
export function formatFactsForPrompt(facts: VerifiedFact[]): string {
  return facts
    .map((f) => `- [${f.id}] ${f.claim} (Source: ${f.source}, Confidence: ${f.confidence})`)
    .join('\n')
}

/**
 * Format error matches as a human-readable report
 */
export function formatErrorReport(errors: ErrorMatch[]): string {
  if (errors.length === 0) {
    return 'No historical errors detected.'
  }

  // Group by severity
  const critical = errors.filter((e) => e.severity === 'critical')
  const high = errors.filter((e) => e.severity === 'high')
  const medium = errors.filter((e) => e.severity === 'medium')

  let report = `## Historical Error Report\n\n`
  report += `Found ${errors.length} potential error(s):\n`
  report += `- Critical: ${critical.length}\n`
  report += `- High: ${high.length}\n`
  report += `- Medium: ${medium.length}\n\n`

  if (critical.length > 0) {
    report += `### CRITICAL ERRORS\n\n`
    for (const e of critical) {
      report += `**[${e.factId}]** "${e.matchedText}"\n`
      report += `- Context: "...${e.context}..."\n`
      report += `- Correct: ${e.factClaim}\n\n`
    }
  }

  if (high.length > 0) {
    report += `### HIGH PRIORITY\n\n`
    for (const e of high) {
      report += `**[${e.factId}]** "${e.matchedText}"\n`
      report += `- Context: "...${e.context}..."\n`
      report += `- Correct: ${e.factClaim}\n\n`
    }
  }

  if (medium.length > 0) {
    report += `### MEDIUM PRIORITY\n\n`
    for (const e of medium) {
      report += `**[${e.factId}]** "${e.matchedText}"\n`
      report += `- Context: "...${e.context}..."\n`
      report += `- Correct: ${e.factClaim}\n\n`
    }
  }

  return report
}

/**
 * Get all facts with wrongVariants (for checker scripts)
 */
export function getFactsWithWrongVariants(): VerifiedFact[] {
  return REFERENCE_LIBRARY.filter((f) => f.wrongVariants && f.wrongVariants.length > 0)
}

/**
 * Summary statistics about the reference library
 */
export function getReferenceStats(): {
  totalFacts: number
  byCategory: Record<string, number>
  byConfidence: Record<string, number>
  factsWithWrongVariants: number
  totalWrongVariantPatterns: number
} {
  const byCategory: Record<string, number> = {}
  const byConfidence: Record<string, number> = {}
  let factsWithWrongVariants = 0
  let totalWrongVariantPatterns = 0

  for (const fact of REFERENCE_LIBRARY) {
    byCategory[fact.category] = (byCategory[fact.category] || 0) + 1
    byConfidence[fact.confidence] = (byConfidence[fact.confidence] || 0) + 1
    if (fact.wrongVariants && fact.wrongVariants.length > 0) {
      factsWithWrongVariants++
      totalWrongVariantPatterns += fact.wrongVariants.length
    }
  }

  return {
    totalFacts: REFERENCE_LIBRARY.length,
    byCategory,
    byConfidence,
    factsWithWrongVariants,
    totalWrongVariantPatterns,
  }
}
