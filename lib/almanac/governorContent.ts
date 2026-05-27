import type { WeatherData } from './types'

/**
 * TL;DR Summary for Governor's Briefing
 * One-sentence verdict before the 200-300 word briefing
 * Format: "SUMMARY: [verdict] - [key detail]"
 * Max: 15 words
 */
export function generateTLDRSummary(weather: WeatherData): string {
  const verdict = determineVerdict(weather)
  const keyDetail = selectKeyDetail(weather)

  const summary = `SUMMARY: ${verdict} - ${keyDetail}`

  // Ensure within word budget
  const wordCount = summary.split(/\s+/).length
  if (wordCount > 15) {
    // If over budget, truncate key detail
    const truncated = keyDetail.split(/\s+/).slice(0, 5).join(' ')
    return `SUMMARY: ${verdict} - ${truncated}`
  }

  return summary
}

/**
 * Planning Intelligence Section
 * Two-line visitor planning content below brass instruments
 */
export interface PlanningIntelligence {
  icon: string
  line1: string
  line2: string
}

export function generatePlanningIntelligence(weather: WeatherData): PlanningIntelligence {
  const icon = getStatusIcon(weather)
  const line1 = buildStatusLine(weather, icon)
  const line2 = buildDetailLine(weather)

  return { icon, line1, line2 }
}

/**
 * VERDICT DETERMINATION LOGIC
 */
function determineVerdict(weather: WeatherData): string {
  const temp = weather.current.temperature
  const precip = weather.current.precipitation
  const wind = weather.current.windSpeed
  const nextDay = weather.hourly.weatherCode.slice(0, 24)

  // Check for safety-critical conditions
  const hasThunderstorms = nextDay.some((code) => code >= 95)
  const hasDangerousWind = wind > 30 || nextDay.some((code) => code >= 95) // storms often have high wind
  const hasExtremeHeat = temp > 95
  const hasExtremeCold = temp < 20

  if (hasThunderstorms || hasDangerousWind || hasExtremeHeat || hasExtremeCold) {
    return 'Hazardous'
  }

  // Check for precipitation and temperature problems
  const hasHeavyRain = precip > 0.5 || nextDay.some((code) => code >= 63)
  const hasSnow = nextDay.some((code) => code >= 71 && code <= 86)
  const hasConcerningTemp = temp < 35 || temp > 85

  if (hasHeavyRain || hasSnow || (hasConcerningTemp && hasHeavyRain)) {
    return 'Challenging'
  }

  // Ideal conditions
  const isClear =
    !hasHeavyRain && nextDay.slice(0, 12).every((code) => code < 50 || (code >= 51 && code <= 60))
  const isIdealTemp = temp >= 55 && temp <= 75
  const isLightWind = wind < 12
  const isDry = precip < 0.1

  if (isClear && isIdealTemp && isLightWind && isDry) {
    return 'Favorable'
  }

  // Pleasant but with minor concerns
  const isPartlyCloudy = nextDay.slice(0, 12).some((code) => code >= 2)
  const isComfortableTemp = temp >= 50 && temp <= 80
  const isModerateWind = wind < 18
  const isLightPrecip = precip < 0.2

  if (isPartlyCloudy && isComfortableTemp && isModerateWind && isLightPrecip) {
    return 'Agreeable'
  }

  // Overcast but manageable
  const isOvercast = nextDay.slice(0, 12).every((code) => code >= 2 && code < 50)
  const isModerateTemp = temp >= 45 && temp <= 80
  const isLowPrecipRisk = precip < 0.1 && !nextDay.slice(0, 12).some((code) => code >= 51)

  if (isOvercast && isModerateTemp && isLowPrecipRisk) {
    return 'Temperate'
  }

  // Default to concerning if doesn't fit other categories
  return 'Concerning'
}

function selectKeyDetail(weather: WeatherData): string {
  const temp = weather.current.temperature
  const high = weather.daily.temperatureMax[0]
  const precip = weather.current.precipitation
  const nextDay = weather.hourly.weatherCode.slice(0, 24)

  const hasThunderstorms = nextDay.some((code) => code >= 95)
  const hasHeavyRain = precip > 0.5 || nextDay.some((code) => code >= 63)
  const hasSnow = nextDay.some((code) => code >= 71 && code <= 86)
  const hasExtremeHeat = temp > 95
  const hasExtremeCold = temp < 20

  // Safety-first messaging
  if (hasThunderstorms) {
    return 'thunderstorms likely, lightning risk'
  }
  if (hasExtremeCold) {
    return `dangerous cold ${Math.round(temp)}°F`
  }
  if (hasExtremeHeat) {
    return `extreme heat ${Math.round(high)}°F`
  }

  // Precipitation details
  if (hasSnow) {
    return `snow expected, ${Math.round(temp)}°F`
  }
  if (hasHeavyRain) {
    return `heavy rain, ${Math.round(temp)}°F`
  }

  // Temperature + condition
  if (temp < 35) {
    return `cold ${Math.round(temp)}°F, clear`
  }
  if (temp > 85) {
    return `warm ${Math.round(high)}°F by afternoon`
  }

  // Default to just current temp
  return `${Math.round(temp)}°F, clear`
}

/**
 * PLANNING INTELLIGENCE LOGIC
 */
function getStatusIcon(weather: WeatherData): string {
  const temp = weather.current.temperature
  const nextDay = weather.hourly.weatherCode.slice(0, 24)

  const hasThunderstorms = nextDay.some((code) => code >= 95)
  const hasDangerousWind = weather.current.windSpeed > 30
  const hasExtremeHeat = temp > 95
  const hasExtremeCold = temp < 20

  // Red: Unsafe
  if (hasThunderstorms || hasDangerousWind || hasExtremeHeat || hasExtremeCold) {
    return '🔴'
  }

  const hasHeavyRain = weather.current.precipitation > 0.5
  const hasSnow = nextDay.some((code) => code >= 71 && code <= 86)
  const hasConcernTemp = temp < 35 || temp > 85

  // Red: Challenging
  if (hasHeavyRain || hasSnow || (hasConcernTemp && hasHeavyRain)) {
    return '🔴'
  }

  // Orange: Fair
  const isOvercast = nextDay.slice(0, 12).every((code) => code >= 2 && code < 50)
  const isModerateTemp = temp >= 45 && temp <= 80

  if (isOvercast && isModerateTemp && weather.current.windSpeed < 20) {
    return '🟠'
  }

  // Yellow: Good
  const hasModerateRainRisk = nextDay.slice(0, 6).some((code) => code >= 51 && code <= 60)
  const isComfortable = temp >= 50 && temp <= 80
  const isLightWind = weather.current.windSpeed < 18

  if (hasModerateRainRisk && isComfortable && isLightWind) {
    return '🟡'
  }

  // Green: Perfect
  const isClear = !nextDay.slice(0, 12).some((code) => code >= 50)
  const isIdeal = temp >= 55 && temp <= 75
  const isDry = weather.current.precipitation < 0.1

  if (isClear && isIdeal && isDry && isLightWind) {
    return '🟢'
  }

  // Yellow: Default good conditions
  return '🟡'
}

function buildStatusLine(weather: WeatherData, icon: string): string {
  const temp = weather.current.temperature
  const high = weather.daily.temperatureMax[0]
  const nextDay = weather.hourly.weatherCode.slice(0, 24)

  let status = ''
  let condition = ''

  // Determine status level
  if (icon === '🔴') {
    status = 'Unsafe conditions'
  } else if (icon === '🟠') {
    status = 'Fair touring weather'
  } else if (icon === '🟡') {
    status = 'Good conditions for touring'
  } else if (icon === '🟢') {
    status = 'Perfect conditions for touring'
  }

  // Determine condition description
  const hasThunderstorms = nextDay.some((code) => code >= 95)
  const hasHeavyRain = weather.current.precipitation > 0.5
  const hasSnow = nextDay.some((code) => code >= 71 && code <= 86)

  if (hasThunderstorms) {
    condition = `- severe thunderstorms expected`
  } else if (hasSnow) {
    condition = `- snow expected, ${Math.round(temp)}°F`
  } else if (hasHeavyRain) {
    condition = `- heavy rain expected`
  } else if (weather.current.precipitation > 0.1) {
    condition = `- rain possible, ${Math.round(temp)}°F`
  } else if (temp > 85) {
    condition = `- hot at ${Math.round(high)}°F`
  } else if (temp < 35) {
    condition = `- cold at ${Math.round(temp)}°F`
  } else if (weather.hourly.weatherCode[0] < 50) {
    condition = `- ${Math.round(temp)}°F, clear skies`
  } else {
    condition = `- ${Math.round(temp)}°F, mostly cloudy`
  }

  return `${icon} ${status} ${condition}`
}

function buildDetailLine(weather: WeatherData): string {
  const temp = weather.current.temperature
  const high = weather.daily.temperatureMax[0]
  const precip = weather.current.precipitation
  const wind = weather.current.windSpeed
  const nextDay = weather.hourly.weatherCode.slice(0, 24)

  const hasThunderstorms = nextDay.some((code) => code >= 95)
  const hasHeavyRain = precip > 0.5 || nextDay.some((code) => code >= 63)
  const hasSnow = nextDay.some((code) => code >= 71 && code <= 86)
  const hasModerateRain = precip > 0.1 && precip <= 0.5
  const hasStrongWind = wind > 20
  const hasExtremeHeat = temp > 95
  const hasExtremeCold = temp < 20

  // Safety first
  if (hasThunderstorms) {
    // Find first thunderstorm hour
    const stormHour = nextDay.findIndex((code) => code >= 95)
    const hours = stormHour >= 0 ? stormHour : 8 // default to afternoon
    const startTime = formatHourRange(hours)
    return `Lightning risk ${startTime}, stay indoors during storms`
  }

  if (hasExtremeCold && wind > 25) {
    return `Dangerous wind chill, extremely cold: limit outdoor time`
  }

  if (hasExtremeCold) {
    return `Dangerously cold: only brief outdoor time recommended`
  }

  if (hasExtremeHeat) {
    return `Heat index critical: seek shade, drink water constantly`
  }

  // Precipitation guidance
  if (hasHeavyRain) {
    return `Heavy rain all day, indoor activities recommended`
  }

  if (hasSnow) {
    return `Snow expected, roads may be difficult`
  }

  if (hasModerateRain) {
    // Find rain window
    const rainStart = nextDay.findIndex((code) => code >= 51)
    if (rainStart >= 0) {
      const timeWindow = formatHourRange(rainStart)
      return `Rain expected ${timeWindow}, bring umbrella`
    }
    return `Afternoon rain possible, have umbrella ready`
  }

  // Temperature guidance
  if (high > 80 && temp < 70) {
    return `Warming to ${Math.round(high)}°F this afternoon, bring water`
  }

  if (temp < 40 && temp > 32) {
    return `Cold morning: dress in layers, warms later`
  }

  // Wind impact
  if (hasStrongWind) {
    return `Strong winds ${Math.round(wind)} mph: secure loose items`
  }

  // Default - favorable day
  if (weather.hourly.weatherCode[0] < 50 && temp >= 55 && temp <= 75) {
    return `No rain expected through evening`
  }

  if (weather.hourly.weatherCode[0] < 50 && temp >= 50) {
    return `Clear conditions continuing`
  }

  return `Check conditions before heading out`
}

/**
 * HELPER FUNCTIONS
 */
function formatHourRange(hour: number): string {
  // Convert hour index to time range string
  if (hour < 6) return `early morning (${hour}-${hour + 1} AM)`
  if (hour < 12) return `late morning (${hour}-${hour + 1} AM)`
  if (hour < 15) return `early afternoon (${hour - 12}-${hour - 11} PM)`
  if (hour < 18) return `late afternoon (${hour - 12}-${hour - 11} PM)`
  if (hour < 21) return `evening (${hour - 12}-${hour - 11} PM)`
  return `night (${hour - 12}-${hour - 11} PM)`
}

/**
 * WEATHER CODE REFERENCE (for clarity)
 * 0 = Clear
 * 1-2 = Mostly clear / Partly cloudy
 * 3 = Overcast
 * 45-48 = Fog
 * 51-55 = Drizzle
 * 61-65 = Rain
 * 71-86 = Snow
 * 95+ = Thunderstorms
 */
