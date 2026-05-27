import siteInfo from '@/data/siteInfo.json'

/**
 * Contact information interface
 */
export interface Contact {
  /** Raw phone number */
  phone: string
  /** Formatted phone for display: (423) 538-7396 */
  phoneFormatted: string
  /** Phone href for tel: links: tel:+14235387396 */
  phoneHref: string
  /** Email address */
  email: string
  /** Email href for mailto: links */
  emailHref: string
  /** Structured address object */
  address: {
    street: string
    city: string
    state: string
    zip: string
    county: string
    /** Full formatted address string */
    full: string
  }
  /** Social media handles and URLs */
  social: {
    facebook: {
      handle: string
      url: string
    }
    instagram: {
      handle: string
      url: string
    }
    tiktok: {
      handle: string
      url: string
    }
  }
  /** Website URL */
  website: string
  /** Map coordinates */
  coordinates: {
    lat: number
    lng: number
    /** Google Maps URL */
    mapsUrl: string
  }
  /** Driving directions text */
  directions: string
}

/**
 * Contact info hook with formatted helpers
 *
 * Provides contact information with pre-formatted phone numbers, email links,
 * social media URLs, and address strings ready for display.
 *
 * @returns Contact information with formatted helpers
 *
 * @example
 * ```tsx
 * function ContactSection() {
 *   const contact = useContact()
 *
 *   return (
 *     <div>
 *       <a href={contact.phoneHref}>{contact.phoneFormatted}</a>
 *       <a href={contact.emailHref}>{contact.email}</a>
 *       <p>{contact.address.full}</p>
 *       <a href={contact.social.facebook.url}>Facebook</a>
 *     </div>
 *   )
 * }
 * ```
 */
export function useContact(): Contact {
  const { contact, location } = siteInfo

  // Format phone number for tel: link (remove all non-digits, add +1)
  const phoneDigits = contact.phone.replace(/\D/g, '')
  const phoneHref = `tel:+1${phoneDigits}`

  // Build full address string
  const addressFull = `${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}`

  // Build Google Maps URL
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`

  return {
    phone: contact.phone,
    phoneFormatted: contact.phone,
    phoneHref,
    email: contact.email,
    emailHref: `mailto:${contact.email}`,
    address: {
      street: location.address.street,
      city: location.address.city,
      state: location.address.state,
      zip: location.address.zip,
      county: location.address.county,
      full: addressFull,
    },
    social: {
      facebook: {
        handle: contact.social.facebook,
        url: `https://facebook.com/${contact.social.facebook}`,
      },
      instagram: {
        handle: contact.social.instagram,
        url: `https://instagram.com/${contact.social.instagram}`,
      },
      tiktok: {
        handle: contact.social.tiktok,
        url: `https://tiktok.com/@${contact.social.tiktok}`,
      },
    },
    website: contact.website,
    coordinates: {
      lat: location.coordinates.lat,
      lng: location.coordinates.lng,
      mapsUrl,
    },
    directions: location.directions,
  }
}
