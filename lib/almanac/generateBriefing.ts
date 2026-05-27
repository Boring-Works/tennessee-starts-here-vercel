import type { WeatherData } from './types'

export function generateGovernorsBriefing(weather: WeatherData): string {
  const temp = weather.current.temperature
  const pressure = (weather.current.pressure * 0.0295301).toFixed(1)
  const wind = getWindDirection(weather.current.windDirection)
  const windSpeed = weather.current.windSpeed
  // Note: Hourly pressure data not available in API, use 'steady' as default
  const trend = 'steady'

  const tempDesc = getTempDescription(temp)
  const windDesc = getWindDescription(windSpeed)
  const outlook = getOutlook(trend, parseFloat(pressure))

  // Build briefing sections
  const sections: string[] = []

  // Opening (pressure reading)
  sections.push(
    `The glass stands at ${pressure} inches and ${trend}, promising ${outlook} conditions for territorial affairs.`
  )

  // Current conditions
  sections.push(`Wind from the ${wind.toLowerCase()}, ${windDesc}. Temperature ${tempDesc}.`)

  // Work guidance
  const guidance = getWorkGuidance(weather)
  if (guidance) {
    sections.push(guidance)
  }

  // 24-hour outlook
  const prediction = get24HourPrediction(weather)
  sections.push(prediction)

  return sections.join('\n\n')
}

function getTempDescription(temp: number): string {
  if (temp < 20) return 'dangerously cold'
  if (temp < 32) return 'freezing'
  if (temp < 45) return 'quite cold'
  if (temp < 60) return 'cool but comfortable'
  if (temp < 75) return 'moderate and pleasant'
  if (temp < 85) return 'warm'
  if (temp < 95) return 'hot'
  return 'dangerously hot'
}

function getWindDescription(speed: number): string {
  if (speed < 3) return 'calm'
  if (speed < 8) return 'a light breeze'
  if (speed < 13) return 'a gentle breeze'
  if (speed < 19) return 'a moderate breeze'
  if (speed < 25) return 'a fresh breeze'
  if (speed < 32) return 'a strong wind'
  return 'gale conditions'
}

function getOutlook(trend: string, pressure: number): string {
  // High pressure = fair weather
  // Low pressure = storms
  // Falling = deteriorating
  // Rising = improving

  if (pressure > 30.2) {
    if (trend.includes('rising')) return 'continued fair'
    if (trend.includes('falling')) return 'changeable'
    return 'fair'
  }

  if (pressure < 29.8) {
    if (trend.includes('falling')) return 'stormy'
    if (trend.includes('rising')) return 'improving'
    return 'unsettled'
  }

  if (trend.includes('falling')) return 'deteriorating'
  if (trend.includes('rising')) return 'improving'
  return 'fair to moderate'
}

function getWorkGuidance(weather: WeatherData): string | null {
  const guidance: string[] = []
  const temp = weather.current.temperature
  const precip = weather.current.precipitation
  const wind = weather.current.windSpeed

  // Meeting conditions
  if (temp > 40 && temp < 85 && precip < 0.1 && wind < 15) {
    guidance.push('Good conditions for outdoor council meetings')
  } else if (temp < 40 || temp > 85 || precip > 0.1) {
    guidance.push('Conditions advise indoor proceedings')
  }

  // Survey/inspection conditions
  if (temp > 35 && temp < 90 && precip < 0.1 && wind < 20) {
    guidance.push('Suitable for land surveys and territorial inspections')
  }

  // Courier dispatch
  if (precip < 0.1 && wind < 20) {
    guidance.push('Roads dry, favorable for courier dispatch')
  } else if (precip > 0.5) {
    guidance.push('Heavy precipitation may delay messenger travel')
  }

  if (guidance.length === 0) return null

  return `${guidance.join('. ')}.`
}

function get24HourPrediction(weather: WeatherData): string {
  // Look at next 24 hours of forecast
  const nextDay = weather.hourly.weatherCode.slice(0, 24)
  const hasRain = nextDay.some((code) => code >= 51 && code <= 67)
  const hasSnow = nextDay.some((code) => code >= 71 && code <= 86)
  const hasStorms = nextDay.some((code) => code >= 95)

  if (hasStorms)
    return 'Expect thunderstorms within the day. Advise caution for outdoor activities.'
  if (hasSnow) return 'Snow expected. Prepare for difficult travel conditions.'
  if (hasRain) return 'Rain probable before tomorrow. Plan accordingly for outdoor affairs.'
  return 'Fair weather continuing. Favorable for territorial business.'
}

function getWindDirection(degrees: number): string {
  const dirs = [
    'North',
    'Northeast',
    'East',
    'Southeast',
    'South',
    'Southwest',
    'West',
    'Northwest',
  ]
  return dirs[Math.round(degrees / 45) % 8]
}
