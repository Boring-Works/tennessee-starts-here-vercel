import siteInfo from '@/data/siteInfo.json'

/**
 * Site information interface
 */
export interface SiteInfo {
  site: {
    name: string
    tagline: string
    established: string
    territorialCapital: {
      start: number
      end: number
      description: string
    }
  }
  location: {
    address: {
      street: string
      city: string
      state: string
      zip: string
      county: string
    }
    coordinates: {
      lat: number
      lng: number
    }
    directions: string
    drivingDistances: Array<{
      city: string
      miles: number
      time: string
      route: string
    }>
  }
  contact: {
    phone: string
    email: string
    website: string
    social: {
      facebook: string
      instagram: string
      tiktok: string
    }
  }
  hours: {
    regular: {
      wednesday: string
      thursday: string
      friday: string
      saturday: string
      sunday: string
      monday: string
      tuesday: string
    }
    formatted: {
      days: string
      time: string
      short: string
    }
    season: string
    seasonNote: string
    tourSchedule: string
    lastTour: string
    tourNote: string
    note: string
  }
  admissionIncludes: string[]
  admission: {
    adults: { price: number; label: string }
    seniors: { price: number; label: string }
    children: { price: number; label: string }
    childrenFree: { price: number; label: string }
    groups: { note: string }
    note: string
  }
  whatToExpect: {
    tourDuration: string
    features: string[]
    accessibility: {
      summary: string
      museumGallery: {
        name: string
        description: string
        adaCompliant: boolean
        features: string[]
      }
      historicSiteTour: {
        name: string
        description: string
        adaCompliant: boolean
        features: string[]
        note: string
      }
    }
    recommendations: string[]
  }
  sisterSites: Array<{
    name: string
    city: string
    miles: number
    time: string
    description: string
    website: string
  }>
  nearbyAttractions: Array<{
    name: string
    distance: string
    description: string
  }>
  first250: {
    program: string
    description: string
    enrollmentStart: string
    enrollmentEnd: string
    goal: number
    ceremony: string
    benefits: string[]
    tiers: Array<{
      name: string
      price: number
      benefits: string[]
    }>
  }
  america250: {
    year: number
    significance: string
    tn230: {
      date: string
      significance: string
    }
    rockymountRole: string
  }
  historicalFigures: Array<{
    id: string
    name: string
    title: string
    years: string
    hook: string
    highlight: string
    details: string[]
  }>
}

/**
 * Master hook that returns typed siteInfo data
 *
 * @returns Fully typed site information object with all site details
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const site = useSiteInfo()
 *   return <h1>{site.site.name}</h1>
 * }
 * ```
 */
export function useSiteInfo(): SiteInfo {
  return siteInfo as SiteInfo
}
