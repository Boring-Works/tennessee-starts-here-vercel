/**
 * Weather Icon Mapping
 *
 * Maps WMO weather codes to Lucide React icons.
 * Icon selection based on condition categories defined in types.ts.
 *
 * Icons used:
 * - Sun: Clear conditions (codes 0-1)
 * - CloudSun: Partly cloudy (code 2)
 * - Cloud: Overcast (code 3)
 * - CloudFog: Fog (codes 45, 48)
 * - CloudDrizzle: Drizzle (codes 51-57)
 * - CloudRain: Rain (codes 61-67, 80-82)
 * - CloudSnow/Snowflake: Snow (codes 71-77, 85-86)
 * - CloudLightning: Thunderstorms (codes 95-99)
 */
import {
  Sun,
  Cloud,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Snowflake,
  type LucideIcon,
} from 'lucide-react'
import { WEATHER_CODES } from './types'

// Map icon string names to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  sun: Sun,
  cloud: Cloud,
  'cloud-sun': CloudSun,
  'cloud-fog': CloudFog,
  'cloud-drizzle': CloudDrizzle,
  'cloud-rain': CloudRain,
  'cloud-snow': CloudSnow,
  'cloud-lightning': CloudLightning,
  snowflake: Snowflake,
}

/**
 * Get the Lucide icon component for a weather code
 */
export function getWeatherIcon(weatherCode: number): LucideIcon {
  const info = WEATHER_CODES[weatherCode]
  if (info && ICON_MAP[info.icon]) {
    return ICON_MAP[info.icon]
  }
  // Default to sun if unknown code
  return Sun
}

// Note: For weather condition text, use getWeatherInfo(code).condition from types.ts
