/**
 * Rocky Mount SEO & Metadata Content
 * Master Source of Truth v4.0
 */

/**
 * Default site metadata
 */
export const DEFAULT_METADATA = {
  title: 'Tennessee Starts Here | Rocky Mount State Historic Site',
  titleTemplate: '%s | Tennessee Starts Here',
  description:
    "Where Tennessee's government began. Stand where Governor Blount governed the Southwest Territory. Join us for America 250 and Tennessee 230 programming at Rocky Mount State Historic Site in Piney Flats, TN.",
  siteName: 'Tennessee Starts Here',
  url: 'https://tennesseestartshere.com',
  locale: 'en_US',
  type: 'website',
} as const

/**
 * Page-specific metadata
 */
export const PAGE_METADATA = {
  home: {
    title: 'Tennessee Starts Here | Rocky Mount State Historic Site',
    description:
      "Where Tennessee's government began. Stand where Governor Blount governed the Southwest Territory at Rocky Mount State Historic Site.",
    ogTitle: 'Tennessee Starts Here | Rocky Mount State Historic Site',
    ogDescription: "Where Tennessee's government began. Stand where they stood.",
  },
  visit: {
    title: 'Plan Your Visit',
    description:
      "Visit Rocky Mount State Historic Site—where Tennessee's government began. Stand where Governor Blount governed the Southwest Territory. Living history tours daily.",
    ogTitle: 'Plan Your Visit | Tennessee Starts Here',
    ogDescription:
      "Stand where Tennessee's government began. Living history tours at Rocky Mount State Historic Site.",
  },
  events: {
    title: 'Events',
    description:
      "Join us for America 250 and Tennessee 230 programming at Rocky Mount State Historic Site. Stand where Tennessee's government began.",
    ogTitle: 'Events | Tennessee Starts Here',
    ogDescription: 'America 250 and Tennessee 230 events at Rocky Mount State Historic Site.',
  },
  welcome: {
    title: 'Rocky Mount State Historic Site',
    description:
      'Welcome to Rocky Mount State Historic Site in Piney Flats, Tennessee. Before there was a Tennessee, there was this ground. Celebrating America 250 and Tennessee 230 in 2026.',
    ogTitle: 'Rocky Mount State Historic Site | Tennessee Starts Here',
    ogDescription: 'Before there was a Tennessee, there was this ground. Stand where they stood.',
  },
  first250: {
    title: 'Join the First 250',
    description:
      'Join the First 250 and be part of history. Your name will be read aloud on the capital grounds, July 4, 2026.',
    ogTitle: 'Join the First 250 | Tennessee Starts Here',
    ogDescription:
      'Be part of history. Your name will be read aloud on the capital grounds, July 4, 2026.',
  },
  evidence: {
    title: 'The Evidence Room',
    description:
      "Primary source documents from Rocky Mount's history. Verified quotes from Founders Online, Tennessee Encyclopedia, and the National Archives.",
    ogTitle: 'The Evidence Room | Tennessee Starts Here',
    ogDescription:
      "Primary source documents proving Rocky Mount was where Tennessee's government began.",
  },
  explore: {
    title: 'The Original Seven',
    description:
      'Explore the seven counties that became Tennessee. Rocky Mount is your gateway to Sullivan County heritage and the founding story of the Volunteer State.',
    ogTitle: 'The Original Seven | Tennessee Starts Here',
    ogDescription: 'It all started here. Explore the seven counties that became Tennessee.',
  },
  ourStory: {
    title: 'Where Tennessee Began',
    description:
      'The history of Rocky Mount State Historic Site—first capital of the Southwest Territory. Stand where Governor William Blount governed from 1790-1792.',
    ogTitle: 'Where Tennessee Began | Tennessee Starts Here',
    ogDescription: "First capital of the Southwest Territory. Where Tennessee's government began.",
  },
  almanac: {
    title: 'The 1775 Almanac',
    description:
      'Weather and farming wisdom in the tradition of 18th-century almanacs. Plan your visit to Rocky Mount with period-appropriate agricultural guidance.',
    ogTitle: 'The 1775 Almanac | Tennessee Starts Here',
    ogDescription: 'Weather and farming wisdom in the tradition of the founders.',
  },
  programs: {
    title: 'Programs & Living History',
    description:
      'Experience history through demonstrations, workshops, and living history programs at Rocky Mount State Historic Site.',
    ogTitle: 'Programs & Living History | Tennessee Starts Here',
    ogDescription: 'Living history demonstrations and programs at Rocky Mount.',
  },
  educators: {
    title: 'Field Trips & Education',
    description:
      'Curriculum-aligned field trips and educational programs for K-12 students. Tennessee state standards supported at Rocky Mount State Historic Site.',
    ogTitle: 'Field Trips & Education | Tennessee Starts Here',
    ogDescription: 'Curriculum-aligned field trips for K-12 students.',
  },
  groups: {
    title: 'Group Tours',
    description:
      'Plan a group visit to Rocky Mount State Historic Site. Tour operators, bus groups, and private tours welcome.',
    ogTitle: 'Group Tours | Tennessee Starts Here',
    ogDescription: 'Group tours and private visits at Rocky Mount.',
  },
  lectures: {
    title: 'Lecture Series',
    description:
      'Speaker series and educational lectures at Rocky Mount State Historic Site. Expert historians and engaging presentations.',
    ogTitle: 'Lecture Series | Tennessee Starts Here',
    ogDescription: 'Expert historians and educational lectures at Rocky Mount.',
  },
  membership: {
    title: 'Membership',
    description:
      'Join the Rocky Mount Historical Association. Support preservation and enjoy exclusive member benefits.',
    ogTitle: 'Membership | Tennessee Starts Here',
    ogDescription: 'Join the Rocky Mount Historical Association.',
  },
  support: {
    title: 'Support Rocky Mount',
    description:
      'Support the preservation of Rocky Mount State Historic Site. Donations help maintain the first capital of the Southwest Territory.',
    ogTitle: 'Support Rocky Mount | Tennessee Starts Here',
    ogDescription: 'Support the preservation of Tennessee history.',
  },
  timeline: {
    title: 'Historical Timeline',
    description:
      'Chronological view of Rocky Mount history from 1770 to statehood. Key events in the founding of Tennessee.',
    ogTitle: 'Historical Timeline | Tennessee Starts Here',
    ogDescription: 'Key events in the founding of Tennessee.',
  },
} as const

/**
 * Social media content
 */
export const SOCIAL_CONTENT = {
  twitter: {
    card: 'summary_large_image',
    site: '@RockyMountTN',
    creator: '@RockyMountTN',
  },
  facebook: {
    appId: '', // Add if needed
  },
} as const

/**
 * Structured data snippets
 */
export const STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Museum',
    name: 'Rocky Mount State Historic Site',
    alternateName: 'Tennessee Starts Here',
    description: "Where Tennessee's government began.",
    url: 'https://tennesseestartshere.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '200 Hyder Hill Road',
      addressLocality: 'Piney Flats',
      addressRegion: 'TN',
      postalCode: '37686',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.433,
      longitude: -82.3,
    },
    foundingDate: '1770',
  },
} as const
