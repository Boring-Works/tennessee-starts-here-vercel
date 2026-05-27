/**
 * Vapor Pressure Deficit (VPD) calculations
 *
 * VPD is the difference between the amount of moisture in the air
 * and how much moisture the air can hold when saturated.
 * It's a key indicator for plant transpiration and health.
 */

export type VPDLevel = 'low' | 'optimal' | 'high' | 'danger'

export interface VPDData {
  value: number // in kPa
  level: VPDLevel
  recommendation: string
}

/**
 * Calculate saturation vapor pressure using Tetens equation
 * @param tempF - Temperature in Fahrenheit
 * @returns Saturation vapor pressure in kPa
 */
function saturationVaporPressure(tempF: number): number {
  const tempC = ((tempF - 32) * 5) / 9
  return 0.6108 * Math.exp((17.27 * tempC) / (tempC + 237.3))
}

/**
 * Calculate Vapor Pressure Deficit
 * @param tempF - Temperature in Fahrenheit
 * @param humidity - Relative humidity (0-100)
 * @returns VPD in kPa
 */
export function calculateVPD(tempF: number, humidity: number): number {
  const svp = saturationVaporPressure(tempF)
  const actualVaporPressure = svp * (humidity / 100)
  const vpd = svp - actualVaporPressure
  return Math.round(vpd * 100) / 100 // Round to 2 decimal places
}

/**
 * Get VPD level and recommendations
 * Based on general plant guidelines:
 * - < 0.4 kPa: Low - risk of mold/disease, poor transpiration
 * - 0.4 - 1.2 kPa: Optimal - good for most vegetative growth
 * - 1.2 - 1.6 kPa: High - plants transpiring rapidly, need more water
 * - > 1.6 kPa: Danger - plant stress, wilting likely
 */
export function getVPDLevel(vpd: number): {
  level: VPDLevel
  label: string
  color: string
  bgColor: string
  recommendation: string
} {
  if (vpd < 0.4) {
    return {
      level: 'low',
      label: 'Low',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500',
      recommendation: 'Risk of mold/mildew. Increase ventilation or reduce humidity.',
    }
  }
  if (vpd <= 1.2) {
    return {
      level: 'optimal',
      label: 'Optimal',
      color: 'text-green-400',
      bgColor: 'bg-green-500',
      recommendation: 'Ideal conditions for plant growth and transpiration.',
    }
  }
  if (vpd <= 1.6) {
    return {
      level: 'high',
      label: 'High',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500',
      recommendation: 'Plants transpiring rapidly. Ensure adequate water.',
    }
  }
  return {
    level: 'danger',
    label: 'Stress',
    color: 'text-red-400',
    bgColor: 'bg-red-500',
    recommendation: 'Plant stress likely. Reduce temperature or increase humidity.',
  }
}

/**
 * Get full VPD data with calculations and recommendations
 */
export function getVPDData(tempF: number, humidity: number): VPDData {
  const value = calculateVPD(tempF, humidity)
  const { level, recommendation } = getVPDLevel(value)
  return { value, level, recommendation }
}
