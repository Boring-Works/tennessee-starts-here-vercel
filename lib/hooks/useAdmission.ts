import siteInfo from '@/data/siteInfo.json'

/**
 * Admission tier type
 */
type AdmissionTier = 'adults' | 'seniors' | 'children' | 'childrenFree'

/**
 * Admission pricing interface
 */
export interface Admission {
  /** Adult pricing */
  adults: { price: number; label: string }
  /** Senior pricing (65+) */
  seniors: { price: number; label: string }
  /** Children pricing (6-17) */
  children: { price: number; label: string }
  /** Free admission (under 6) */
  childrenFree: { price: number; label: string }
  /** Group pricing note */
  groups: { note: string }
  /** General admission note */
  note: string
  /** What's included in admission */
  includes: string[]
  /** Calculate total for group */
  calculateGroupTotal: (counts: {
    adults?: number
    seniors?: number
    children?: number
    childrenFree?: number
  }) => number
  /** Get price for single tier */
  getPrice: (tier: AdmissionTier) => number
  /** Format price as currency string */
  formatPrice: (amount: number) => string
  /** Check if group rate applies */
  isGroupRate: (totalPeople: number) => boolean
}

/**
 * Admission hook with pricing calculations
 *
 * Provides admission pricing with helper functions to calculate group totals,
 * format prices, and determine if group rates apply.
 *
 * @returns Admission pricing with calculation helpers
 *
 * @example
 * ```tsx
 * function PricingCalculator() {
 *   const admission = useAdmission()
 *
 *   const total = admission.calculateGroupTotal({
 *     adults: 2,
 *     children: 3,
 *     childrenFree: 1
 *   })
 *
 *   const isGroup = admission.isGroupRate(6)
 *
 *   return (
 *     <div>
 *       <p>Total: {admission.formatPrice(total)}</p>
 *       {isGroup && <p>{admission.groups.note}</p>}
 *     </div>
 *   )
 * }
 * ```
 */
export function useAdmission(): Admission {
  const { admission, admissionIncludes } = siteInfo

  /**
   * Calculate total for a group
   */
  const calculateGroupTotal = (counts: {
    adults?: number
    seniors?: number
    children?: number
    childrenFree?: number
  }): number => {
    const adultsTotal = (counts.adults || 0) * admission.adults.price
    const seniorsTotal = (counts.seniors || 0) * admission.seniors.price
    const childrenTotal = (counts.children || 0) * admission.children.price
    const childrenFreeTotal = (counts.childrenFree || 0) * admission.childrenFree.price

    return adultsTotal + seniorsTotal + childrenTotal + childrenFreeTotal
  }

  /**
   * Get price for a single tier
   */
  const getPrice = (tier: AdmissionTier): number => {
    return admission[tier].price
  }

  /**
   * Format price as currency string
   */
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  /**
   * Check if group rate applies (10+ people)
   */
  const isGroupRate = (totalPeople: number): boolean => {
    return totalPeople >= 10
  }

  return {
    adults: admission.adults,
    seniors: admission.seniors,
    children: admission.children,
    childrenFree: admission.childrenFree,
    groups: admission.groups,
    note: admission.note,
    includes: admissionIncludes,
    calculateGroupTotal,
    getPrice,
    formatPrice,
    isGroupRate,
  }
}
