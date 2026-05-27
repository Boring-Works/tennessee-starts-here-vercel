/**
 * Central re-export of all TypeScript data types
 *
 * Usage:
 * - import type { NavItem, Testimonial } from '@/types'
 * - import type * as DataTypes from '@/types'
 */

// Re-export from data.ts (all JSON data interfaces)
export type {
  // Common
  MetaInfo,
  // Navigation
  NavItem,
  NavDropdownItem,
  NavigationData,
  // Testimonials
  Testimonial,
  ReviewStats,
  TestimonialsData,
  // Timeline
  TimelineEvent,
  ContrastStatement,
  KeyDates,
  TimelineData,
  // Experiences & Tours
  ExperienceMoment,
  TourType,
  VisitInclude,
  ExperiencesData,
  // Site Hours & Status
  SpecialHours,
  SiteStatus,
  HoursConfig,
  Closure,
  SpecialEvent,
  // Site Info
  Address,
  Coordinates,
  DrivingDistance,
  Pricing,
  SiteLocation,
  SiteIdentity,
  ContactInfo,
  SiteInfoData,
  // Events
  Event,
  RecurringProgram,
  First250Config,
  EventsData,
  // Lectures
  Speaker,
  Lecture,
  LectureSeries,
  AdditionalProgramming,
  LecturesData,
  // Document Evidence
  DocumentLocation,
  // Event Filter
  EventFilter,
} from './data'

// Re-export from events.ts (event filtering)
export type { EventFilter as EventFilterType } from './events'

// Re-export from evidence.ts (document location)
export type { DocumentLocation as EvidenceDocumentLocation } from './evidence'
