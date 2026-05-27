/**
 * Rocky Mount Narrative Content
 * Master Source of Truth v4.0
 */

/**
 * Mystery Narrative (Tier 1: Curiosity)
 * Use for: Permanent brand, all audiences, website default
 */
export const MYSTERY_NARRATIVE = {
  welcome: {
    hook: 'Before there was a Tennessee, there was this ground.',
    year: '1770',
    context: 'William Cobb · Piney Flats · Sullivan County',
  },
  hero: {
    badge: 'Tennessee 230 · America 250',
    headline: 'STAND WHERE THEY STOOD',
    subhead: "In 1790, Governor Blount made this ground the first capital of the Southwest Territory.",
    supporting:
      "Where Tennessee's government began. The ground that became a state.",
    timeline: [
      'In 1770, the Cobbs settled this ground.',
      'In 1780, they armed the Revolution.',
      'In 1790, Governor Blount made it the seat of territorial power—and conducted preliminary diplomatic talks with 42 Cherokee leaders that led to the Treaty of Holston.',
    ],
    contrast:
      'This is not where they gathered. This is not where they farmed. This is where they governed.',
    bridge:
      'For approximately 14-16 months, this was the seat of power for everything that would become Tennessee.',
    cta: 'Plan your visit.',
  },
} as const

/**
 * Scarcity Narrative (Tier 2: Urgency)
 * Use for: 2026 campaign, ads, email, ticket conversion
 * Expires: December 31, 2026
 */
export const SCARCITY_NARRATIVE = {
  welcome: {
    hook: 'For approximately 14-16 months, this ground was the first capital of the Southwest Territory.',
    subhook: 'Then the capital moved to Knoxville. The ground remained.',
  },
  hero: {
    badge: 'Tennessee 230 · America 250',
    headline: 'ROCKY MOUNT',
    subhead: 'The capital that made a state.',
    timeline: [
      '1790. Governor Blount—one of 39 men who signed the Constitution—governed from this ground.',
      'Letters went to Washington. A territory was governed.',
      'A state was born.',
    ],
    bridge: 'Then the capital moved to Knoxville. The moment passed. The ground remained.',
    cta: 'Stand where they stood.',
  },
} as const

/**
 * Authority Narrative (Tier 3: Prestige)
 * Use for: Grants, press, THC presentations, academic contexts
 */
export const AUTHORITY_NARRATIVE = {
  welcome: {
    hook: 'The first capital of the Southwest Territory.',
    subhook: "The ground where Tennessee's government began.",
  },
  hero: {
    badge: 'Capital of the Southwest Territory · 1790–1792',
    headline: 'ROCKY MOUNT',
    subhead: "Where Tennessee's government began.",
    timeline: [
      'In 1787, William Blount signed the U.S. Constitution in Philadelphia.',
      'In 1790, President Washington appointed him Governor of the Southwest Territory.',
      'From this ground, he governed the territory that would become Tennessee.',
    ],
    bridge: 'The buildings have evolved. The ground endures.',
    cta: 'Stand where they stood.',
  },
} as const

/**
 * Historical Figures
 * For visitor-facing copy about key figures
 */
export const HISTORICAL_FIGURES = {
  williamBlount: {
    name: 'William Blount',
    title: 'Governor of the Southwest Territory',
    years: '1790–1796',
    hook: 'Signed the U.S. Constitution. Appointed by George Washington. Made Rocky Mount his headquarters.',
    highlight: 'Constitution Signer',
  },
  andrewJackson: {
    name: 'Andrew Jackson',
    title: 'Future 7th President',
    years: '1788 (oral tradition)',
    hook: 'According to local tradition, lodged at Rocky Mount while awaiting his law license. He was 21 years old.',
    highlight: 'Future President',
    note: 'Based on oral tradition, not primary documentation.',
  },
  williamCobb: {
    name: 'William Cobb',
    title: 'Original Settler',
    years: 'c. 1770',
    hook: 'Staked his claim on this ground six years before the Declaration of Independence was signed.',
    highlight: 'Pioneer',
  },
} as const

/**
 * Staff Scripts
 * For interpreter training and visitor interactions
 */
export const STAFF_SCRIPTS = {
  sycamoreDifferentiation: {
    context: 'Sycamore Shoals Differentiation',
    script:
      'No, the soldiers gathered at Sycamore Shoals—that was the muster point. Rocky Mount was the operational headquarters. The Army gathered at the Shoals. The State started here.',
  },
  friendlyRivalry: {
    context: 'Tone Guidance: Friendly Rivalry',
    script:
      'They provided the muscle; we provided the mind. We are the other half of the origin story—complementary, not competing.',
  },
  fameBridge: {
    context: 'Fame Bridge (Tours)',
    script: 'Governor Blount governed here. The State started here.',
    note: 'Jackson claim removed pending primary source verification.',
  },
  buildingAgeFAQ: {
    context: 'Building Age FAQ',
    script:
      "The Cobb House was built in the 1820s by the grandson. It stands as proof the family didn't just survive—they thrived. Three generations. One ground.",
  },
} as const

/**
 * First 250 Campaign (2026)
 */
export const FIRST_250_CAMPAIGN = {
  hook: 'Join the First 250. Be part of history.',
  promise: 'Your name will be read aloud on the capital grounds, July 4, 2026.',
  deadline: 'Enrollment closes June 1, 2026',
  keyDates: [
    'June 13-14: Stitching Independence / Tennessee 230',
    'July 4: Colonial Independence Day / America 250',
  ],
} as const

/**
 * Look For This: Pre-Visit Discovery Moments
 * Use for: Pre-visit guides, email campaigns, social teasers
 * Creates physical-only reveals that make the in-person visit essential
 */
export const DISCOVERY_MOMENTS = {
  intro: {
    hook: 'Five discoveries that make the in-person visit essential.',
    premise:
      'Before there was a Tennessee, there was this ground. When you arrive at Rocky Mount, you will not simply see a historic site. You will stand where a state began.',
  },
  windowBlountDescribed: {
    title: 'The Window Blount Described',
    context:
      'On October 20, 1790, Governor Blount wrote about "glass windows" that impressed him. On the frontier, glass windows marked a family of means.',
    lookFor:
      'The size and number of panes, the slight waviness of period glass, and how light enters the upstairs room.',
    whyItMatters:
      'These windows represented civilization pressing westward. When Blount saw them, he knew he had found the right place to establish federal authority.',
  },
  hearthGovernmentMeals: {
    title: 'The Hearth Where Government Meals Were Cooked',
    context:
      'Barsheba Cobb fed the territorial government. Governor Blount, officials, surveyors, and forty-two Cherokee chiefs plus their attendants all ate meals prepared at Rocky Mount.',
    lookFor:
      'The scale of the hearth, the hanging points for pots and kettles, the wear patterns on hearth stones, and the distance from kitchen to main house.',
    whyItMatters:
      'Without food, there are no negotiations. Without hospitality, there are no alliances. Stand at that hearth and acknowledge the labor that made governance possible.',
  },
  doorCherokeeChiefs: {
    title: 'The Door Forty-Two Cherokee Chiefs Entered',
    context:
      'In December 1790, Cherokee chiefs traveled to Rocky Mount to meet Governor Blount and discuss peace. Protocol demanded hospitality before diplomatic talks. These preliminary meetings led to the Treaty of Holston, negotiated at White\'s Fort in July 1791.',
    lookFor:
      'The width and height of the doorway, the wear on the threshold, and the transition from open grounds to enclosed space.',
    whyItMatters:
      'The Cherokee delegation negotiated as a sovereign nation. Their presence here shaped the borders of what would become Tennessee.',
  },
  roomTerritoryGoverned: {
    title: 'The Room Where the Territory Was Governed',
    context:
      'From 1790 to 1792, Blount administered the Southwest Territory from this room. Commissions were signed. Tennessee began here.',
    lookFor:
      'The natural light from those glass windows, the size of the space, the proximity to the stairs, and the view of the land Blount administered.',
    whyItMatters:
      'Every law Tennessee has ever passed traces its authority back to the government established in this room.',
  },
  groundTreatyBegan: {
    title: 'The Ground Where the Treaty Journey Began',
    context:
      'In December 1790, Cherokee chiefs stood on this ground and met Governor Blount. He promised them a formal treaty. Seven months later, at White\'s Fort (Knoxville), that promise became the Treaty of Holston.',
    lookFor:
      'The space available for gathering, the sight lines, the terrain, and the paths of approach where Cherokee delegates arrived.',
    whyItMatters:
      'Treaties are not signed in one moment—they are negotiated over months. This is where that process began. The buildings evolved. The ground endures.',
  },
  closing: {
    hook: 'The ground is the artifact.',
    tagline: 'Tennessee starts here. Will you?',
  },
} as const
