/**
 * Centralized TypeScript types for all JSON data structures
 * Single source of truth for data interfaces across the application
 *
 * Import structure:
 * - import type { NavItem, Testimonial, ... } from '@/types/data'
 * - or import type * as DataTypes from '@/types/data'
 */

// ============================================================================
// Common / Shared Types
// ============================================================================

/**
 * Metadata that appears in all JSON files
 * Provides context about the data file itself
 */
export interface MetaInfo {
  description: string
  updated: string
  usage?: string
}

// ============================================================================
// Navigation Types
// ============================================================================

/**
 * A single navigation link that may contain nested dropdown items
 */
export interface NavItem {
  label: string
  href: string
  external?: boolean
  dropdown?: NavDropdownItem[]
}

/**
 * Dropdown menu item in navigation
 */
export interface NavDropdownItem {
  label: string
  href: string
  description?: string
  featured?: boolean
  badge?: string
  external?: boolean
}

/**
 * Complete navigation data structure for the site
 * Includes main nav, utility nav, footer, and mobile CTAs
 */
export interface NavigationData {
  _meta: MetaInfo
  mainNav: NavItem[]
  utilityNav: NavItem[]
  footerNav: Record<string, NavItem[]>
  mobileNav: {
    primaryCTA: NavItem
    secondaryCTA: NavItem
  }
}

// ============================================================================
// Testimonials Types
// ============================================================================

/**
 * A single visitor testimonial with metadata about its source and usage
 */
export interface Testimonial {
  id: string
  quote: string
  attribution: string
  source: 'TripAdvisor' | 'Google' | 'Google Reviews' | 'Facebook' | 'Educator survey' | string
  sourceUrl?: string
  rating: number
  date?: string | null
  tags?: string[]
  usedOn?: string[]
}

/**
 * Testimonial review platform statistics
 */
export interface ReviewStats {
  rating: number
  totalReviews: number | null
  excellentPercent?: number
  url?: string | null
}

/**
 * Complete testimonials data structure organized by featured and category
 */
export interface TestimonialsData {
  _meta: MetaInfo
  featured: Testimonial[]
  byCategory: Record<string, Testimonial[]>
  stats: Record<string, ReviewStats>
  _templates?: {
    description: string
    postVisitRequest: string
    eventFollowUp: string
  }
}

// ============================================================================
// Timeline Types
// ============================================================================

/**
 * A historical event on the timeline
 */
export interface TimelineEvent {
  year: string
  title: string
  description?: string
  text?: string
  icon?: string
  period?: string
  category?: string
  highlight?: boolean
}

/**
 * Statement with optional strikethrough for contrast sections
 */
export interface ContrastStatement {
  text: string
  strike?: boolean
  finale?: boolean
}

/**
 * Key date references for quick lookups
 */
export interface KeyDates {
  [key: string]: string | number
}

/**
 * Complete timeline data including hero timeline, extended timeline, and key dates
 */
export interface TimelineData {
  _meta: MetaInfo
  heroTimeline: TimelineEvent[]
  extendedTimeline: TimelineEvent[]
  contrastStatements?: ContrastStatement[]
  keyDates?: KeyDates
}

// ============================================================================
// Experiences & Tours Types
// ============================================================================

/**
 * A single visitor experience moment or activity
 */
export interface ExperienceMoment {
  numeral: string
  title: string
  description: string
  icon: string
  category: string
}

/**
 * Information about a specific tour type
 */
export interface TourType {
  id: string
  name: string
  duration: string
  description: string
  accessibility: string
  included: boolean
  requiresTicket?: boolean
}

/**
 * Feature or amenity included in a visit
 */
export interface VisitInclude {
  icon: string
  title: string
  description: string
}

/**
 * Complete experiences and tour data
 */
export interface ExperiencesData {
  _meta: MetaInfo
  experienceMoments: ExperienceMoment[]
  tourTypes?: TourType[]
  visitIncludes?: VisitInclude[]
  highlights?: string[]
}

// ============================================================================
// Site Hours & Status Types
// ============================================================================

/**
 * Special hours configuration for events or closures
 */
export interface SpecialHours {
  opens: number // 24-hour format (14 = 2pm)
  closes: number
  reason: string
  eventTitle?: string
  replacesRegularHours?: boolean
  dayClosedMessage?: string
}

/**
 * Current site operating status
 */
export interface SiteStatus {
  isOpen: boolean
  reason: string
  message: string
  nextOpen?: Date
  specialHours?: SpecialHours
}

/**
 * Regular operating hours configuration
 */
export interface HoursConfig {
  regularHours: {
    open: number
    close: number
  }
  openDays: number[] // 0=Sun, 1=Mon, ... 6=Sat
  seasonStart: {
    month: number
    weekOfMonth: number
    dayOfWeek: number
  }
  seasonEnd: {
    month: number
    day: number
  }
  closures: Closure[]
  specialEvents: SpecialEvent[]
}

/**
 * Site closure configuration (Thanksgiving, Christmas, etc.)
 */
export interface Closure {
  type: 'thanksgiving' | 'christmas' | 'custom'
  calculateDate?: (year: number) => Date
  customDate?: string // YYYY-MM-DD
  reason: string
  endOffsetDays?: number
}

/**
 * Special event with custom hours (Haunting, Candlelight, etc.)
 */
export interface SpecialEvent {
  eventTitle: string
  type: 'haunting' | 'candlelight' | 'other'
  datePattern: {
    month: number
    approximateDay?: number
    weekOfMonth?: number
    dayOfWeek?: number
  }
  hours: {
    open: number
    close: number
  }
  replacesRegularHours: boolean
  dayClosedMessage?: string
}

// ============================================================================
// Site Info Types
// ============================================================================

/**
 * Physical address information
 */
export interface Address {
  street: string
  city: string
  state: string
  zip: string
  county?: string
}

/**
 * Geographic coordinates
 */
export interface Coordinates {
  lat: number
  lng: number
}

/**
 * Driving distance and time from another location
 */
export interface DrivingDistance {
  city: string
  miles: number
  time: string
  route: string
}

/**
 * Pricing tier for admission or events
 */
export interface Pricing {
  adult?: number | null
  senior?: number | null
  child?: number | null
  underFive?: number | null
  members?: number | null
}

/**
 * Site location and visitor information
 */
export interface SiteLocation {
  address: Address
  coordinates: Coordinates
  directions: string
  drivingDistances: DrivingDistance[]
}

/**
 * Basic site identity and historical info
 */
export interface SiteIdentity {
  name: string
  tagline: string
  established: string
  territorialCapital?: {
    start: number
    end: number
    description: string
  }
}

/**
 * Contact information and hours
 */
export interface ContactInfo {
  phone: string
  email: string
  website: string
  hoursNote?: string
}

/**
 * Complete site information
 */
export interface SiteInfoData {
  _meta: MetaInfo
  site: SiteIdentity
  location: SiteLocation
  contact: ContactInfo
  admission?: {
    general: number | null
    senior: number | null
    child: number | null
    underFive: number | null
    members: number | null
    group?: number | null
  }
  hours?: {
    regularOpen: number
    regularClose: number
    openDays: string[]
    seasonStart: string
    seasonEnd: string
  }
}

// ============================================================================
// Events Types
// ============================================================================

/**
 * A single event in the calendar
 */
export interface Event {
  id: string
  title: string
  date: string
  endDate?: string | null
  time?: string | null
  type: 'new' | 'enhanced' | 'recurring' | 'milestone'
  category: string
  description: string
  requiresTicket: boolean
  ticketUrl?: string | null
  fareHarborId?: string
  pricing?: Pricing | null
  featured?: boolean
  speaker?: string
  speakerTitle?: string
  capacity?: number
  ageRecommendation?: string
}

/**
 * Recurring program (workshops, classes, etc.)
 */
export interface RecurringProgram {
  id: string
  title: string
  tagline: string
  description: string
  schedule: string
  scheduleNote?: string
  time: string
  duration: string
  requiresTicket: boolean
  ticketUrl?: string | null
  fareHarborId?: string
  pricing?: Pricing | null
  category: string
  icon: string
  highlights?: string[]
  dates?: string[]
  capacity?: number
}

/**
 * First 250 program configuration
 */
export interface First250Config {
  enrollmentStart: string
  enrollmentEnd: string
  ceremonyDate: string
  url: string
}

/**
 * Complete events calendar data
 */
export interface EventsData {
  _meta?: MetaInfo
  events: Event[]
  recurringPrograms: Record<string, RecurringProgram>
  first250: First250Config
}

// ============================================================================
// Lectures Types
// ============================================================================

/**
 * Speaker information
 */
export interface Speaker {
  name: string
  title: string
  institution?: string
  bio: string
  portraying?: string
}

/**
 * Single lecture or presentation
 */
export interface Lecture {
  id: number
  title: string
  date: string
  time: string
  speaker: Speaker
  description: string
  topics: string[]
  format?: string
  note?: string
}

/**
 * Lecture series metadata
 */
export interface LectureSeries {
  title: string
  subtitle: string
  description: string
  year: number
  note: string
}

/**
 * Additional programming outside main series
 */
export interface AdditionalProgramming {
  title: string
  date: string
  endDate: string
  speaker: Omit<Speaker, 'institution' | 'portraying'>
  description: string
  note: string
}

/**
 * Complete lectures data
 */
export interface LecturesData {
  _meta?: MetaInfo
  series: LectureSeries
  lectures: Lecture[]
  additionalProgramming?: AdditionalProgramming
}

// ============================================================================
// Document Evidence Types
// ============================================================================

/**
 * Physical location of a document in the site
 */
export interface DocumentLocation {
  building: string
  room?: string
  feature?: string
  description: string
}

// ============================================================================
// Event Filter Types (for UI)
// ============================================================================

/**
 * Valid event categories for filtering
 */
export type EventFilter = 'all' | 'free' | 'camp' | 'lecture' | 'festival' | 'family'
