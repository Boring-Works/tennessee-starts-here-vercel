/**
 * Historical Constants - Southwest Territory
 *
 * Single source of truth for official names, dates, and key facts
 * about the Territory of the United States South of the River Ohio
 */

export const SOUTHWEST_TERRITORY = {
  officialName: 'Territory of the United States South of the River Ohio',
  shortName: 'Southwest Territory',
  firstCapital: 'Rocky Mount',
  firstCapitalYears: '1790–1792',
  permanentCapital: 'Knoxville',
  permanentCapitalYears: '1792–1796',
  blountArrival: 'October 1790',
  primarySource:
    "Correspondence of Governor William Blount, Oct. 1790, written from 'William Cobb's, Washington County.'",
} as const

/**
 * Usage:
 *
 * import { SOUTHWEST_TERRITORY } from '@/lib/constants/historical'
 *
 * `${SOUTHWEST_TERRITORY.firstCapital} served as the first capital of the
 *  ${SOUTHWEST_TERRITORY.officialName} from ${SOUTHWEST_TERRITORY.firstCapitalYears}`
 */
