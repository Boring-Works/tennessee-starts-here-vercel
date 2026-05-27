/**
 * Rocky Mount Brand Constants
 * Master Source of Truth v4.0 - Director's Final Version
 * January 2026
 */

export const BRAND = {
  name: 'Rocky Mount',
  fullName: 'Rocky Mount State Historic Site',
  tagline: 'Tennessee Starts Here',
  established: '1770',
  location: 'Piney Flats, Tennessee',

  // Core identity
  identity: {
    headline: 'ROCKY MOUNT',
    subhead: "Where Tennessee's government began.",
    elevatorPitch:
      "Rocky Mount is where Tennessee's government began. The ground is the artifact. The house is the proof. Stand where they stood.",
  },

  // Commemorative context
  commemorative: {
    tennessee230: {
      label: 'Tennessee 230',
      date: 'June 13-14, 2026',
    },
    america250: {
      label: 'America 250',
      date: 'July 4, 2026',
    },
    badge: 'Tennessee 230 · America 250',
  },
} as const

/**
 * Three-Tier Framework
 * Mystery (Curiosity) → Authority (Prestige) → Scarcity (Urgency)
 */
export const TIERS = {
  mystery: {
    name: 'The Mystery',
    tier: 'CURIOSITY',
    bestFor: 'Permanent brand · All audiences · Website default',
    expires: null,
  },
  authority: {
    name: 'The Authority',
    tier: 'PRESTIGE',
    bestFor: 'Grants · Press · Academic · THC presentations',
    expires: null,
  },
  scarcity: {
    name: 'The Scarcity',
    tier: 'URGENCY',
    bestFor: '2026 campaign · Ads · Email · Ticket conversion',
    expires: 'December 31, 2026',
  },
} as const

/**
 * Approved Hooks & CTAs
 */
/**
 * Primary Source Quotes
 * Verified from MASTER_CATALOG.md - use with citations
 */
export const PRIMARY_QUOTES = {
  // THE hero quote - use prominently
  glassWindows: {
    text: 'I am very well accommodated with a Room with Glass Windows, Fire Place &c &c at this place.',
    attribution: 'William Blount, October 20, 1790',
    source:
      'State Archives of North Carolina, John Gray Blount Papers, PC.193. Published in Keith, ed., The John Gray Blount Papers, Vol. II (1959), pp. 127-128',
    context: 'Letter to his half-brother describing accommodations at Rocky Mount',
  },
  // Full arrival quote
  glassWindowsFull: {
    text: 'On the 11th instant, I arrived in this country, and was received with every mark of attention and gladness that I could have wished. I am very well accommodated with a Room with Glass Windows, Fire Place &c &c at this place.',
    attribution: 'William Blount to John Gray Blount, October 20, 1790',
    source:
      'State Archives of North Carolina, John Gray Blount Papers, PC.193. Keith, ed., The John Gray Blount Papers, Vol. II (1959), pp. 127-128',
  },
  // Why Blount was chosen
  williamsonRecommendation: {
    text: 'there is not any other Man who possesses the Esteem and Confidence of both Parties so fully as Mr Blount',
    attribution: 'Hugh Williamson to George Washington, May 28, 1790',
    source: 'Founders Online',
  },
  // Washington's question that Rocky Mount answered
  washingtonsQuestion: {
    text: 'Where ought the Governor to reside?',
    attribution: 'George Washington to Henry Knox, August 13, 1790',
    source: 'Founders Online',
    context: 'The answer was Rocky Mount',
  },
  // Treaty authority
  treatyProclamation: {
    text: 'I, George Washington, President of the United States, having seen and considered the said Treaty, do, by and with the advice and consent of the Senate, accept, ratify and confirm the same, and every clause and article thereof.',
    attribution: 'George Washington, November 11, 1791',
    source: 'Founders Online, National Archives',
  },
} as const

export const HOOKS = {
  // Welcome/Mystery hook
  welcomeHook: 'Before there was a Tennessee, there was this ground.',

  // Primary CTA
  primaryCTA: 'Stand where they stood.',

  // Governance (Forever)
  governance: "Where Tennessee's government began.",

  // Fame Bridge (Tours, secondary marketing)
  // Note: Jackson claim removed pending primary source verification (oral tradition only)
  fameBridge: 'Governor Blount governed here. The State started here.',

  // Competitor Separation (Staff scripts, positioning)
  sycamoreSeparation: 'The Army gathered at the Shoals. The State started here.',

  // Contrast Line (Hero copy, differentiation)
  contrastLine:
    'This is not where they gathered. This is not where they farmed. This is where they governed.',

  // Defense Line (FAQ, building questions)
  defenseLine: 'The buildings evolved. The ground endures.',

  // Building Positive (FAQ, interpreter scripts)
  buildingPositive:
    "The Cobb House stands as proof: they didn't just survive—they thrived. Three generations. One ground.",

  // Grants/Academic
  grantsLine:
    'The first capital of the Southwest Territory, established under the U.S. Constitution.',

  // Scarcity (2026 only)
  scarcityLine: 'The capital that made a state.',

  // Closing tagline
  closingTagline: 'Tennessee starts here. Will you?',
} as const

/**
 * Approved Button Labels
 */
export const BUTTONS = {
  primary: 'Plan Your Visit',
  secondary: 'Join the First 250',
  book: 'Book Your Tour',
  events: 'Explore 2026 Events',
  enter: 'Stand Where They Stood',
} as const

/**
 * STOP/START Dictionary
 * These phrases should be replaced in all copy
 */
export const STOP_START = {
  'The Cobb Mansion': 'The Cobb House',
  '256 years you can walk through': 'The buildings evolved. The ground endures.',
  '235 years': 'The buildings evolved. The ground endures.',
  "America's first western capital": 'First Constitutional federal ground west of the mountains',
  'Where the frontier became a nation': "Where Tennessee's government began",
  'They gathered there...': 'The Army gathered at the Shoals.',
  'Frontier Cabin': 'The Cobb Family Residence',
  'Pop-up capital': 'The capital that made a state',
  Dynasty: 'Legacy / Lineage',
  'Walk the halls': 'Stand where they stood',
  'Hallowed Ground': 'Capital Grounds',
  'These walls remember': 'The ground endures',
} as const

/**
 * Visual Directive
 */
export const VISUAL_DIRECTIVE = {
  principle: 'Ground First. House Second.',
  guidance:
    'Hero images: low-angle shots emphasizing ground, feet, landscape. Cobb House in background, not foreground.',
} as const
