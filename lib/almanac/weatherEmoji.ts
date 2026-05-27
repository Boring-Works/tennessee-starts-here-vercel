/**
 * Weather Emoji Mapping
 *
 * Maps WMO weather codes to emoji representations for compact displays.
 * Used for inline weather indicators where Lucide icons aren't appropriate.
 */

/**
 * Get weather emoji based on WMO weather code
 */
export function getWeatherEmoji(weatherCode: number): string {
  // Clear conditions
  if (weatherCode === 0 || weatherCode === 1) return '☀️'

  // Partly cloudy
  if (weatherCode === 2) return '⛅'

  // Overcast/cloudy
  if (weatherCode === 3) return '☁️'

  // Fog
  if (weatherCode === 45 || weatherCode === 48) return '🌫️'

  // Drizzle
  if (weatherCode >= 51 && weatherCode <= 57) return '🌦️'

  // Rain
  if ((weatherCode >= 61 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) {
    return '🌧️'
  }

  // Snow
  if ((weatherCode >= 71 && weatherCode <= 77) || weatherCode === 85 || weatherCode === 86) {
    return '❄️'
  }

  // Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) return '⛈️'

  // Default to partly cloudy
  return '⛅'
}
