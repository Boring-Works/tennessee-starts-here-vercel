/**
 * Weather utility functions shared across components.
 * Maps Open-Meteo WMO weather codes to human-readable text and icons.
 */

/**
 * Convert WMO weather code to descriptive text.
 * @see https://open-meteo.com/en/docs#weathervariables
 */
export function getConditionText(code: number): string {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Partly Cloudy'
  if (code <= 49) return 'Foggy'
  if (code <= 59) return 'Drizzle'
  if (code <= 69) return 'Rainy'
  if (code <= 79) return 'Snowy'
  if (code <= 82) return 'Showers'
  if (code <= 99) return 'Stormy'
  return 'Fair'
}

/**
 * Convert WMO weather code to emoji icon.
 * @see https://open-meteo.com/en/docs#weathervariables
 */
export function getWeatherIcon(code: number): string {
  if (code === 0) return '\u2600\uFE0F' // sun
  if (code <= 3) return '\u26C5' // sun behind cloud
  if (code <= 49) return '\uD83C\uDF2B\uFE0F' // fog
  if (code <= 59) return '\uD83C\uDF26\uFE0F' // sun behind rain cloud
  if (code <= 69) return '\uD83C\uDF27\uFE0F' // cloud with rain
  if (code <= 79) return '\uD83C\uDF28\uFE0F' // cloud with snow
  if (code <= 82) return '\uD83C\uDF27\uFE0F' // cloud with rain
  if (code <= 99) return '\u26C8\uFE0F' // cloud with lightning and rain
  return '\uD83C\uDF24\uFE0F' // sun behind small cloud
}
