// Event display configuration - maps event IDs to display info
// This overrides events.json titles/descriptions for card display

// Re-export shared date utilities for backward compatibility
export { parseLocalDate, formatDate, formatDateRange, daysFromNow } from './dateUtils'

export interface EventDisplayConfig {
  id: string
  title: string
  icon: string
  tagline: string
  ctaText?: string
  ctaUrl?: string
}

export const EVENT_DISPLAY_CONFIG: EventDisplayConfig[] = [
  {
    id: 'road-to-250',
    title: 'Season Opening',
    icon: '🎬',
    tagline: 'Launch of the commemorative year',
  },
  { id: 'woolly-days', title: 'Woolly Days', icon: '🐑', tagline: 'From the flock to the loom' },
  {
    id: 'early-frontier-days',
    title: 'Early Frontier Days',
    icon: '⚔️',
    tagline: 'Three days of frontier life',
  },
  {
    id: 'tn-230-birthday',
    title: "Tennessee's 230th",
    icon: '🏛️',
    tagline: 'The 16th state turns 230',
  },
  {
    id: 'stitching-independence',
    title: 'Stitching Independence',
    icon: '🧵',
    tagline: 'The flag that stitched a nation',
  },
  {
    id: 'colonial-independence-day',
    title: 'Colonial Independence Day',
    icon: '🇺🇸',
    tagline: "America's 250th birthday",
  },
  {
    id: 'cherokee-heritage',
    title: 'Cherokee Heritage',
    icon: '🪶',
    tagline: 'Honoring the first Tennesseans',
  },
  {
    id: 'first-families-reunion',
    title: 'First Families Reunion',
    icon: '👨‍👩‍👧‍👦',
    tagline: 'A gathering of descendants',
    ctaText: 'Register Your Family',
    ctaUrl: '/events/first-families-reunion',
  },
  { id: 'harvest-fest', title: 'Harvest Fest', icon: '🎃', tagline: 'Colonial harvest traditions' },
  { id: 'haunting', title: 'Haunting on the Mount', icon: '👻', tagline: 'Spooky frontier tales' },
  {
    id: 'frontier-christmas',
    title: 'Frontier Christmas',
    icon: '🎄',
    tagline: 'Holiday traditions from 1790',
  },
  {
    id: 'candlelight-christmas',
    title: 'Candlelight Christmas',
    icon: '🕯️',
    tagline: 'Rocky Mount by candlelight',
  },
]

// IDs of events to EXCLUDE from "Coming Next" rotation (lectures, etc)
export const EXCLUDED_EVENT_IDS = [
  'lecture-byrd',
  'lecture-patton',
  'lecture-bachelor',
  'lecture-whitfield',
  'lecture-doan',
]

// IDs of digital-only events to skip in "Coming Next" display
// These are events visitors can't physically attend
export const DIGITAL_ONLY_EVENT_IDS = ['road-to-250']

// Progress bar events (textile narrative + reunion finale)
export const PROGRESS_BAR_EVENTS = [
  { id: 'woolly-days', label: 'Woolly', shortLabel: 'Woolly' },
  { id: 'stitching-independence', label: 'Stitching', shortLabel: 'Stitch' },
  { id: 'colonial-independence-day', label: 'July 4', shortLabel: 'Jul 4' },
  { id: 'first-families-reunion', label: 'Reunion', shortLabel: 'Reunion' },
]

// Parse date string as local time (avoids timezone offset issues)
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Calculate days until a date
export function daysUntil(targetDate: string): number {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const target = parseLocalDate(targetDate)
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

// Format countdown with urgency messaging
export function formatCountdown(days: number): string {
  if (days < 0) return 'Completed'
  if (days === 0) return 'Today!'
  if (days === 1) return 'Tomorrow!'
  if (days <= 3) return `${days} days · This week!`
  if (days <= 7) return `${days} days`
  if (days <= 14) return `${days} days`
  return `${days} days`
}

// Get event status
export type EventStatus = 'upcoming' | 'happening' | 'passed'

export function getEventStatus(startDate: string, endDate: string | null): EventStatus {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const start = parseLocalDate(startDate)
  const end = endDate ? parseLocalDate(endDate) : new Date(start)
  end.setHours(23, 59, 59, 999)

  if (now < start) return 'upcoming'
  if (now <= end) return 'happening'
  return 'passed'
}

// Get display config for an event
export function getEventDisplayConfig(eventId: string): EventDisplayConfig | undefined {
  return EVENT_DISPLAY_CONFIG.find((e) => e.id === eventId)
}

// Milestone dates
export const TN_230_DATE = '2026-06-01'
export const USA_250_DATE = '2026-07-04'
