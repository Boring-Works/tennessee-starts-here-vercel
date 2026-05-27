/**
 * Task Score Engine v3.4 — Rocky Mount Almanac
 *
 * FIXES in v3.4:
 * - Uses centralized dateUtils for consistent date handling
 * - Exports date utilities for use by UI components
 *
 * FIXES in v3.3:
 * - CRITICAL: Forecast analysis now finds today's index (accounts for past_days=2)
 * - CRITICAL: precipProbability now reads from correct hourly index
 * - Hourly weather code analysis uses correct time window
 * - All date comparisons use consistent helper functions
 *
 * Previous fixes (v3.2):
 * - Floating point display (Math.round everywhere)
 * - Keeper's Gauge: temperature check BEFORE dew point
 * - Builder's Grade: stricter cold penalties (concrete won't cure)
 * - Sower's Index: 40°F soil is OK for cool-season crops
 * - Forecast awareness: warn about incoming weather
 */

import type { TaskScore, TaskScores, WeatherData } from './types'
import { isSnowCode, isIceCode } from './types'
import { findTodayDailyIndex, findTodayHourlyIndex, getEasternHour } from './dateUtils'

// Re-export date utilities for UI components
export {
  findTodayDailyIndex,
  findTodayHourlyIndex,
  isDateToday,
  isDateTomorrow,
  getWeekdayName,
  getDayDisplayName,
  getDateComponents,
  getEasternHour,
} from './dateUtils'

// ============================================
// EXTENDED METRICS
// ============================================

export interface ExtendedMetrics {
  temperature: number
  humidity: number
  windSpeed: number
  windGusts: number
  precipitation: number
  precipProbability: number
  feelsLike: number
  month: number
  soilTemperature: number | undefined
  snowDepth: number

  // Calculated
  heatIndex: number
  windChill: number
  dewPoint: number
  dewPointSpread: number

  // Winter flags
  hasSnowOnGround: boolean
  hasIceRisk: boolean
  isActivelySnowing: boolean
  isFrozenGround: boolean
  isWinterConditions: boolean
  winterSeverity: 'none' | 'light' | 'moderate' | 'severe'
  groundCondition: 'clear' | 'wet' | 'snowy' | 'icy' | 'frozen'

  // Forecast awareness
  snowInForecast: boolean
  heavyPrecipSoon: boolean
  forecastWarning: string | null
}

// ============================================
// SCIENTIFIC CALCULATIONS
// ============================================

/**
 * NOAA Rothfusz regression equation for Heat Index
 * Source: https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
 */
function calculateHeatIndex(tempF: number, humidity: number): number {
  if (tempF < 80) return tempF
  const T = tempF,
    R = humidity
  let HI =
    -42.379 +
    2.04901523 * T +
    10.14333127 * R -
    0.22475541 * T * R -
    0.00683783 * T * T -
    0.05481717 * R * R +
    0.00122874 * T * T * R +
    0.00085282 * T * R * R -
    0.00000199 * T * T * R * R
  // Low humidity adjustment
  if (R < 13 && T >= 80 && T <= 112) {
    HI -= ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17)
  }
  // High humidity adjustment
  if (R > 85 && T >= 80 && T <= 87) {
    HI += ((R - 85) / 10) * ((87 - T) / 5)
  }
  return Math.round(HI)
}

/**
 * NWS Wind Chill formula (post-2001)
 * Source: https://www.weather.gov/media/epz/wxcalc/windChill.pdf
 */
function calculateWindChill(tempF: number, windMph: number): number {
  // Wind chill only applies below 50°F with wind >= 3 mph
  if (tempF > 50 || windMph < 3) return Math.round(tempF)
  return Math.round(
    35.74 +
      0.6215 * tempF -
      35.75 * windMph ** 0.16 +
      0.4275 * tempF * windMph ** 0.16
  )
}

/**
 * Magnus-Tetens approximation for Dew Point
 * Using Sonntag 1990 constants: a=17.27, b=237.7
 */
function calculateDewPoint(tempF: number, humidity: number): number {
  // Guard against invalid humidity values
  if (humidity <= 0 || humidity > 100) {
    return Math.round(tempF) // Fallback to air temperature
  }

  const tempC = ((tempF - 32) * 5) / 9
  const alpha = (17.27 * tempC) / (237.7 + tempC) + Math.log(humidity / 100)

  // Guard against division by zero (extremely rare with real weather data)
  if (Math.abs(17.27 - alpha) < 0.001) {
    return Math.round(tempF) // Fallback to air temperature
  }

  const dewPointC = (237.7 * alpha) / (17.27 - alpha)
  return Math.round((dewPointC * 9) / 5 + 32)
}

/**
 * Temperature Humidity Index for livestock
 * Standard agricultural formula
 */
function calculateTHI(tempF: number, humidity: number): number {
  const tempC = ((tempF - 32) * 5) / 9
  return Math.round(1.8 * tempC + 32 - (0.55 - 0.0055 * humidity) * (1.8 * tempC - 26))
}

// ============================================
// WINTER + FORECAST ANALYSIS
// ============================================

function analyzeConditions(weather: WeatherData): {
  winter: {
    hasSnowOnGround: boolean
    hasIceRisk: boolean
    isActivelySnowing: boolean
    isFrozenGround: boolean
    isWinterConditions: boolean
    winterSeverity: 'none' | 'light' | 'moderate' | 'severe'
    groundCondition: 'clear' | 'wet' | 'snowy' | 'icy' | 'frozen'
    snowDepth: number
  }
  forecast: {
    snowInForecast: boolean
    heavyPrecipSoon: boolean
    forecastWarning: string | null
  }
} {
  // CRITICAL: Use Eastern Time hour since API data is in America/New_York timezone
  const currentHour = getEasternHour()
  const currentTemp = weather.current.temperature
  const snowDepth = weather.current.snowDepth ?? 0
  const currentCode = weather.current.weatherCode
  const isActivelySnowing = isSnowCode(currentCode)
  const isFreezingPrecipNow = isIceCode(currentCode)
  const soilTemp = weather.current.soilTemperature
  const isFrozenGround = soilTemp !== undefined && soilTemp < 32

  // CRITICAL: Find today's index in daily array (accounts for past_days=2)
  const todayDailyIdx = findTodayDailyIndex(weather.daily.time)

  // CRITICAL: Find today's starting index in hourly array
  const todayHourlyStart = findTodayHourlyIndex(weather.hourly.time)

  // Recent history analysis - look at today and previous 2 days
  let hadFreezing = false,
    hadAboveFreezing = false,
    coldDaysCount = 0
  let recentMinTemp = currentTemp,
    recentMaxTemp = currentTemp,
    recentSnowfall = 0

  if (weather.daily.temperatureMin && weather.daily.temperatureMax) {
    // Look at past 3 days INCLUDING today (indices todayDailyIdx-2 to todayDailyIdx)
    const startIdx = Math.max(0, todayDailyIdx - 2)
    const endIdx = todayDailyIdx + 1
    for (let i = startIdx; i < endIdx && i < weather.daily.temperatureMin.length; i++) {
      const minT = weather.daily.temperatureMin[i]
      const maxT = weather.daily.temperatureMax[i]
      if (minT !== undefined) {
        recentMinTemp = Math.min(recentMinTemp, minT)
        if (minT < 32) {
          hadFreezing = true
          coldDaysCount++
        }
      }
      if (maxT !== undefined) {
        recentMaxTemp = Math.max(recentMaxTemp, maxT)
        if (maxT > 35) hadAboveFreezing = true
      }
    }
  }

  if (weather.daily.snowfallSum) {
    // Sum snowfall from past 3 days
    const startIdx = Math.max(0, todayDailyIdx - 2)
    const endIdx = todayDailyIdx + 1
    for (let i = startIdx; i < endIdx && i < weather.daily.snowfallSum.length; i++) {
      recentSnowfall += weather.daily.snowfallSum[i] || 0
    }
  }

  // Check recent hourly weather codes (last 72 hours from current time)
  let hadRecentSnowCode = false,
    hadRecentIceCode = false
  if (weather.hourly.weatherCode) {
    const currentHourlyIdx = todayHourlyStart + currentHour
    const startIdx = Math.max(0, currentHourlyIdx - 72)
    const endIdx = Math.min(weather.hourly.weatherCode.length, currentHourlyIdx + 1)
    const codes = weather.hourly.weatherCode.slice(startIdx, endIdx)
    hadRecentSnowCode = codes.some((c) => isSnowCode(c))
    hadRecentIceCode = codes.some((c) => isIceCode(c))
  }

  // Snow detection logic
  const hasSnowOnGround =
    snowDepth >= 0.5 ||
    (recentSnowfall >= 0.5 && recentMaxTemp < 40) ||
    (hadRecentSnowCode && recentMaxTemp < 38 && coldDaysCount >= 2)

  // Ice detection logic
  const hasIceRisk =
    isFreezingPrecipNow ||
    hadRecentIceCode ||
    (hadFreezing && hadAboveFreezing && currentTemp < 36) ||
    (hasSnowOnGround && recentMaxTemp > 33 && currentTemp < 35) ||
    (isFrozenGround && weather.current.precipitation > 0 && currentTemp < 36)

  // Winter severity classification
  let winterSeverity: 'none' | 'light' | 'moderate' | 'severe' = 'none'
  if (hasIceRisk) winterSeverity = snowDepth > 2 ? 'severe' : 'moderate'
  else if (hasSnowOnGround)
    winterSeverity = snowDepth > 4 ? 'severe' : snowDepth > 1 ? 'moderate' : 'light'
  else if (isFrozenGround) winterSeverity = 'light'

  // Ground condition classification
  let groundCondition: 'clear' | 'wet' | 'snowy' | 'icy' | 'frozen' = 'clear'
  if (hasIceRisk) groundCondition = 'icy'
  else if (hasSnowOnGround) groundCondition = 'snowy'
  else if (isFrozenGround) groundCondition = 'frozen'
  else if (weather.current.precipitation > 0.05 || weather.current.humidity > 90)
    groundCondition = 'wet'

  // === FORECAST ANALYSIS (starts from today's index) ===
  let snowInForecast = false
  let heavyPrecipSoon = false
  let forecastWarning: string | null = null

  if (weather.daily.weatherCode && weather.daily.precipitationProbability) {
    // Check today and next 2 days (3 days total starting from todayDailyIdx)
    for (let offset = 0; offset < 3; offset++) {
      const i = todayDailyIdx + offset
      if (i >= weather.daily.weatherCode.length) break

      const code = weather.daily.weatherCode[i]
      const prob = weather.daily.precipitationProbability[i]

      if (isSnowCode(code) && prob > 50) {
        snowInForecast = true
        if (offset === 0) forecastWarning = 'Snow expected today'
        else if (offset === 1) forecastWarning = forecastWarning || 'Snow in forecast tomorrow'
        else if (offset === 2) forecastWarning = forecastWarning || 'Snow coming in 2 days'
      }

      if (prob > 70 && offset <= 1) {
        heavyPrecipSoon = true
      }
    }
  }

  return {
    winter: {
      hasSnowOnGround,
      hasIceRisk,
      isActivelySnowing,
      isFrozenGround,
      isWinterConditions: winterSeverity !== 'none',
      winterSeverity,
      groundCondition,
      snowDepth,
    },
    forecast: { snowInForecast, heavyPrecipSoon, forecastWarning },
  }
}

// ============================================
// BUILD EXTENDED METRICS
// ============================================

export function buildExtendedMetrics(weather: WeatherData): ExtendedMetrics {
  const now = new Date()
  // CRITICAL: Use Eastern Time hour since API data is in America/New_York timezone
  const currentHour = getEasternHour()
  const temp = weather.current.temperature
  const humidity = weather.current.humidity
  const windSpeed = weather.current.windSpeed

  const analysis = analyzeConditions(weather)

  // CRITICAL: Find today's starting index in hourly array
  const todayHourlyStart = findTodayHourlyIndex(weather.hourly.time)
  const currentHourlyIdx = todayHourlyStart + currentHour

  // Get precip probability for current hour (with bounds check)
  const precipProbability =
    currentHourlyIdx < weather.hourly.precipitationProbability.length
      ? weather.hourly.precipitationProbability[currentHourlyIdx] || 0
      : 0

  return {
    temperature: temp,
    humidity,
    windSpeed,
    windGusts: weather.current.windGusts,
    precipitation: weather.current.precipitation,
    precipProbability,
    feelsLike: weather.current.feelsLike,
    month: now.getMonth() + 1,
    soilTemperature: weather.current.soilTemperature,
    heatIndex: calculateHeatIndex(temp, humidity),
    windChill: calculateWindChill(temp, windSpeed),
    dewPoint: calculateDewPoint(temp, humidity),
    dewPointSpread: Math.round(temp - calculateDewPoint(temp, humidity)),
    ...analysis.winter,
    ...analysis.forecast,
  }
}

function getScoreLabel(score: number): TaskScore['label'] {
  if (score >= 9) return 'Perfect'
  if (score >= 7) return 'Good'
  if (score >= 5) return 'Fair'
  if (score >= 3) return 'Poor'
  return 'Avoid'
}

// ============================================
// SOWER'S INDEX — Gardening & Planting
// ============================================

export function calculateSowerScore(m: ExtendedMetrics): TaskScore {
  // BLOCKING: Ice/snow/frozen
  if (m.groundCondition === 'icy') {
    return { score: 1, label: 'Avoid', instruction: 'Ice on ground. No gardening possible.' }
  }
  if (m.hasSnowOnGround) {
    return {
      score: 1,
      label: 'Avoid',
      instruction:
        m.snowDepth > 0.5
          ? `${m.snowDepth.toFixed(1)}" of snow. Wait for complete melt.`
          : 'Snow on ground. Wait for it to clear.',
    }
  }
  if (m.isFrozenGround) {
    return {
      score: 2,
      label: 'Avoid',
      instruction: `Soil frozen at ${Math.round(m.soilTemperature!)}°F. Can't work ground.`,
    }
  }
  if (m.isActivelySnowing) {
    return { score: 2, label: 'Avoid', instruction: 'Currently snowing. Wait for it to stop.' }
  }

  let score = 10
  let instruction = ''

  // Soil temperature thresholds based on agricultural guidelines
  // Cool-season crops: peas 40°F, lettuce 40°F, spinach 45°F
  // Warm-season: tomatoes need 60°F+
  if (m.soilTemperature !== undefined) {
    if (m.soilTemperature < 35) {
      score -= 5
      instruction = `Soil at ${Math.round(m.soilTemperature)}°F—too cold for any planting.`
    } else if (m.soilTemperature < 40) {
      score -= 3
      instruction = `Soil at ${Math.round(m.soilTemperature)}°F. Only very hardy seeds (garlic, some cover crops).`
    } else if (m.soilTemperature < 50) {
      score -= 1
      instruction = `Soil at ${Math.round(m.soilTemperature)}°F. Good for peas, lettuce, spinach, onion sets.`
    } else if (m.soilTemperature < 60) {
      instruction = `Soil at ${Math.round(m.soilTemperature)}°F. Most cool-season crops and early beans.`
    } else if (m.soilTemperature <= 85) {
      instruction = `Soil at ${Math.round(m.soilTemperature)}°F—ideal for most vegetables.`
    } else {
      score -= 2
      instruction = `Soil at ${Math.round(m.soilTemperature)}°F. Too hot—mulch to cool soil.`
    }
  }

  // Air temperature
  if (m.temperature < 32) {
    score -= 4
    instruction = instruction || 'Frost conditions. Protect tender plants.'
  } else if (m.temperature < 40) {
    score -= 2
    instruction = instruction || `Only ${Math.round(m.temperature)}°F. Cool-season work only.`
  } else if (m.temperature > 95) {
    score -= 4
    instruction = `Heat index ${m.heatIndex}°F. Work early morning only.`
  }

  // Precipitation
  if (m.precipitation > 0.5) {
    score -= 5
    instruction = 'Heavy rain. Stay out of garden beds.'
  } else if (m.precipitation > 0.1) {
    score -= 3
    instruction = instruction || 'Rain falling. Wait for a break.'
  } else if (m.precipProbability > 70) {
    score -= 2
    instruction = instruction || `${Math.round(m.precipProbability)}% rain chance. Finish early.`
  }

  // Wind
  if (m.windSpeed > 25) {
    score -= 3
    instruction = instruction || `Winds ${Math.round(m.windSpeed)} mph. Too windy for transplants.`
  } else if (m.windSpeed > 15) {
    score -= 1
  }

  // Wet ground
  if (m.groundCondition === 'wet') {
    score -= 2
    instruction = instruction || 'Soil is soggy. Wait to avoid compaction.'
  }

  // Forecast warning
  if (m.forecastWarning && !instruction.includes('snow')) {
    instruction = `${instruction} ${m.forecastWarning}—plan accordingly.`
  }

  score = Math.max(1, Math.min(10, score))

  if (!instruction) {
    instruction =
      score >= 9
        ? 'Excellent conditions for planting!'
        : score >= 7
          ? 'Good gardening day.'
          : 'Mixed conditions. Light tasks only.'
  }

  return { score, label: getScoreLabel(score), instruction }
}

// ============================================
// SHEPHERD'S WATCH — Pets, Kids & Livestock
// ============================================

export function calculateOutdoorScore(m: ExtendedMetrics): TaskScore {
  const thi = calculateTHI(m.temperature, m.humidity)

  // ICE is dangerous for walking
  if (m.groundCondition === 'icy') {
    return {
      score: 3,
      label: 'Poor',
      instruction: 'ICE ON GROUND. Slip hazard—very short trips only.',
    }
  }

  let score = 10
  let instruction = ''

  // Snow: not blocking, but affects score
  if (m.hasSnowOnGround) {
    if (m.snowDepth > 4) {
      score -= 3
      instruction = `${m.snowDepth.toFixed(0)}" snow. Small dogs struggle. Keep trips short.`
    } else if (m.snowDepth > 1) {
      score -= 1
      instruction = 'Snow on ground. Check paws after walks.'
    }
  }

  if (m.isActivelySnowing) {
    score -= 1
    instruction = instruction || 'Snowing. Shorter walks recommended.'
  }

  // Heat stress (THI thresholds from livestock research)
  if (thi >= 99) {
    score -= 6
    instruction = `HEAT EMERGENCY: ${m.heatIndex}°F. No outdoor activity.`
  } else if (thi >= 89) {
    score -= 4
    instruction = `Dangerous heat—${m.heatIndex}°F. Bathroom breaks only.`
  } else if (thi >= 79) {
    score -= 2
    instruction = instruction || `Heat stress risk at ${m.heatIndex}°F. Keep outdoor time short.`
  } else if (thi >= 72) {
    score -= 1
    instruction = instruction || `Warm at ${m.heatIndex}°F. Provide shade and water.`
  }

  // Cold stress (veterinary guidelines)
  if (m.windChill < 0) {
    score -= 5
    instruction = `EXTREME: Wind chill ${m.windChill}°F. Frostbite in minutes.`
  } else if (m.windChill < 15) {
    score -= 3
    instruction = `Wind chill ${m.windChill}°F. Limit to 10-15 minutes outside.`
  } else if (m.windChill < 25) {
    score -= 2
    instruction = instruction || `Wind chill ${m.windChill}°F. Coats for short-haired breeds.`
  } else if (m.windChill < 32) {
    score -= 1
    instruction =
      instruction || `Chilly at ${m.windChill}°F. Most dogs fine, watch small/thin-coated breeds.`
  }

  // Freezing rain
  if (m.hasIceRisk && m.precipitation > 0) {
    score -= 4
    instruction = 'Freezing rain. Stay inside.'
  }

  // Wind
  if (m.windSpeed > 35) {
    score -= 2
    instruction = instruction || `Strong winds ${Math.round(m.windGusts)} mph. Debris hazard.`
  }

  score = Math.max(1, Math.min(10, score))

  if (!instruction) {
    instruction =
      score >= 9
        ? 'Great conditions for outdoor time!'
        : score >= 7
          ? 'Good for walks and outdoor play.'
          : 'Keep outdoor time moderate.'
  }

  return { score, label: getScoreLabel(score), instruction }
}

// ============================================
// KEEPER'S GAUGE — Property Maintenance
// ============================================

export function calculateKeeperScore(m: ExtendedMetrics): TaskScore {
  // BLOCKING: Snow/ice
  if (m.groundCondition === 'icy') {
    return {
      score: 1,
      label: 'Avoid',
      instruction: 'ICE ON SURFACES. Ladders deadly. Indoor planning only.',
    }
  }
  if (m.hasSnowOnGround) {
    return { score: 1, label: 'Avoid', instruction: 'Snow covering surfaces. No exterior work.' }
  }
  if (m.isActivelySnowing) {
    return { score: 2, label: 'Avoid', instruction: 'Snowing. Exterior work postponed.' }
  }

  let score = 10
  let instruction = ''

  // TEMPERATURE FIRST (paint needs 50°F+, most products need 40°F+)
  if (m.temperature < 35) {
    score -= 5
    instruction = `Only ${Math.round(m.temperature)}°F. Too cold for any exterior finishes.`
  } else if (m.temperature < 40) {
    score -= 4
    instruction = `At ${Math.round(m.temperature)}°F, only repairs—no paint or caulk.`
  } else if (m.temperature < 50) {
    score -= 3
    instruction = `At ${Math.round(m.temperature)}°F, limited products will work. Check labels.`
  }

  // DEW POINT (only matters if temp is warm enough to paint)
  // Industry standard: 5°F above dew point minimum
  if (m.temperature >= 50) {
    if (m.dewPointSpread < 3) {
      score -= 4
      instruction =
        instruction || `Dew point spread ${m.dewPointSpread}°F (needs 5°F+). Paint will fail.`
    } else if (m.dewPointSpread < 5) {
      score -= 2
      instruction =
        instruction || `Humidity risk—dew point spread ${m.dewPointSpread}°F. Work midday only.`
    } else if (m.humidity > 85) {
      score -= 2
      instruction = instruction || `Humidity ${Math.round(m.humidity)}%. Extended cure times.`
    }
  }

  // Precipitation
  if (m.precipitation > 0.1) {
    score -= 5
    instruction = 'Rain falling. All exterior work on hold.'
  } else if (m.precipProbability > 70) {
    score -= 3
    instruction = instruction || `${Math.round(m.precipProbability)}% rain chance. Finish early.`
  }

  // Wind (ladder safety) - OSHA recommends no ladder work above 25 mph sustained
  if (m.windGusts > 40) {
    score -= 5
    instruction = `DANGER: ${Math.round(m.windGusts)} mph gusts. No ladder work.`
  } else if (m.windGusts > 30) {
    score -= 3
    instruction = instruction || `Gusts ${Math.round(m.windGusts)} mph. Stay off ladders.`
  } else if (m.windGusts > 20) {
    score -= 2
    instruction = instruction || `Gusts ${Math.round(m.windGusts)} mph. Low work only.`
  }

  // Forecast
  if (m.forecastWarning) {
    instruction = `${instruction} ${m.forecastWarning}.`
  }

  score = Math.max(1, Math.min(10, score))

  if (!instruction) {
    instruction =
      score >= 9
        ? `Ideal—${m.dewPointSpread}°F dew point spread. Finishes will cure well.`
        : score >= 7
          ? 'Good for exterior repairs.'
          : 'Mixed conditions. Prep work only.'
  }

  return { score, label: getScoreLabel(score), instruction }
}

// ============================================
// BUILDER'S GRADE — Construction & Heavy Work
// ============================================

export function calculateBuilderScore(m: ExtendedMetrics): TaskScore {
  // BLOCKING: Ice
  if (m.groundCondition === 'icy') {
    return {
      score: 2,
      label: 'Avoid',
      instruction: 'ICE ON SITE. Equipment slides. Limited interior work only.',
    }
  }

  let score = 10
  let instruction = ''

  // Snow
  if (m.hasSnowOnGround) {
    if (m.snowDepth > 4) {
      score -= 5
      instruction = `${m.snowDepth.toFixed(0)}" snow. Clear before operations.`
    } else if (m.snowDepth > 1) {
      score -= 3
      instruction = 'Snow on site. Traction issues—careful with equipment.'
    } else {
      score -= 1
      instruction = 'Light snow. Clear work areas.'
    }
  }

  if (m.isActivelySnowing) {
    score -= 2
    instruction = instruction || 'Snowing. Conditions deteriorating.'
  }

  // Cold thresholds based on construction reality
  // ACI: protect concrete below 40°F
  // Below 32°F: mortar freezes
  // Below 20°F: OSHA cold stress protocols
  if (m.windChill < 0) {
    score -= 5
    instruction = `SITE CLOSED: ${m.windChill}°F wind chill. Frostbite risk.`
  } else if (m.windChill < 20) {
    score -= 4
    instruction = `Wind chill ${m.windChill}°F. OSHA cold stress protocols. Limited operations.`
  } else if (m.windChill < 32) {
    score -= 3
    instruction = `Wind chill ${m.windChill}°F. Concrete won't cure. Warm-up breaks required.`
  } else if (m.temperature < 40) {
    score -= 2
    instruction =
      instruction || `At ${Math.round(m.temperature)}°F—concrete needs additives/blankets.`
  }

  // Heat (OSHA heat illness prevention)
  if (m.heatIndex >= 115) {
    score -= 5
    instruction = `SITE CLOSED: ${m.heatIndex}°F heat index.`
  } else if (m.heatIndex >= 103) {
    score -= 4
    instruction = `DANGER: ${m.heatIndex}°F. Early AM only.`
  } else if (m.heatIndex >= 91) {
    score -= 2
    instruction = instruction || `Heat ${m.heatIndex}°F. Mandatory water breaks.`
  }

  // Precipitation
  if (m.precipitation > 0.25) {
    score -= 4
    instruction = instruction || 'Rain. Site work suspended.'
  } else if (m.precipitation > 0.1) {
    score -= 2
    instruction = instruction || 'Light rain. Covered work only.'
  }

  // Wind (crane operations typically limited at 30-45 mph)
  if (m.windGusts > 45) {
    score -= 5
    instruction = `CRANES DOWN: ${Math.round(m.windGusts)} mph gusts.`
  } else if (m.windGusts > 35) {
    score -= 3
    instruction = instruction || `Gusts ${Math.round(m.windGusts)} mph. No crane work.`
  }

  // Frozen ground (limits excavation)
  if (m.isFrozenGround) {
    score -= 2
    instruction = instruction || 'Ground frozen. No excavation possible.'
  }

  // Forecast
  if (m.snowInForecast) {
    instruction = `${instruction} ${m.forecastWarning}—secure materials.`
  }

  score = Math.max(1, Math.min(10, score))

  if (!instruction) {
    instruction =
      score >= 9
        ? 'Full operations. Good conditions.'
        : score >= 7
          ? 'Standard operations with safety protocols.'
          : 'Reduced productivity expected.'
  }

  return { score, label: getScoreLabel(score), instruction }
}

// ============================================
// CALCULATE ALL SCORES
// ============================================

export function calculateAllTaskScores(weather: WeatherData): TaskScores {
  const metrics = buildExtendedMetrics(weather)
  return {
    sower: calculateSowerScore(metrics),
    shepherd: calculateOutdoorScore(metrics),
    keeper: calculateKeeperScore(metrics),
    builder: calculateBuilderScore(metrics),
  }
}

// ============================================
// AQI SCORE ADJUSTMENT
// ============================================

/**
 * Adjust a TaskScore based on Air Quality Index
 *
 * AQI thresholds:
 * - ≤50 (Good): No change
 * - ≤100 (Moderate): No change
 * - ≤150 (Unhealthy for Sensitive): Cap at 6
 * - ≤200 (Unhealthy): Cap at 4
 * - >200 (Very Unhealthy/Hazardous): Cap at 2
 *
 * @param score - Original TaskScore
 * @param aqi - Air Quality Index value
 * @returns Adjusted TaskScore with updated instruction if AQI affected it
 */
export function adjustScoreForAQI(score: TaskScore, aqi: number | null): TaskScore {
  if (aqi === null || aqi <= 100) {
    return score
  }

  let maxScore: number
  let aqiWarning: string

  if (aqi <= 150) {
    maxScore = 6
    aqiWarning = 'AQI unhealthy for sensitive groups.'
  } else if (aqi <= 200) {
    maxScore = 4
    aqiWarning = 'AQI unhealthy. Limit outdoor time.'
  } else {
    maxScore = 2
    aqiWarning = 'AQI hazardous. Avoid outdoor activity.'
  }

  if (score.score <= maxScore) {
    // Score already below cap, just add AQI note
    return {
      ...score,
      instruction: `${score.instruction} ${aqiWarning}`,
    }
  }

  // Cap the score
  const cappedScore = maxScore
  return {
    score: cappedScore,
    label: getScoreLabel(cappedScore),
    instruction: `${aqiWarning} Score capped from ${score.score} due to air quality.`,
  }
}

// ============================================
// NATIVE PULSE — Seed Stratification
// ============================================

export interface NativePulseResult {
  status: 'Active Stratification' | 'Germination Trigger' | 'Growing Season' | 'Dormant'
  icon: string
  color: string
  tip: string
  progress: number
}

function calculateStratificationProgress(date: Date): number {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  // Leap year calculation (Gregorian)
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  const seasonLength = isLeapYear ? 91 : 90 // Dec 1 - Feb 28/29

  let daysIntoSeason: number
  if (month === 12) daysIntoSeason = day
  else if (month === 1) daysIntoSeason = 31 + day
  else if (month === 2) daysIntoSeason = 62 + day
  else return 0

  return Math.min(100, Math.round((daysIntoSeason / seasonLength) * 100))
}

/**
 * Calculate native plant pulse status based on weather metrics.
 *
 * @param metrics - Extended weather metrics
 * @param referenceDate - Optional reference date for calculations (defaults to now)
 */
export function calculateNativePulse(
  metrics: ExtendedMetrics,
  referenceDate?: Date
): NativePulseResult {
  const { temperature, precipitation, month } = metrics
  const date = referenceDate ?? new Date()
  const progress = calculateStratificationProgress(date)

  // Winter stratification period (Dec-Feb)
  if (month >= 12 || month <= 2) {
    if (temperature >= 28 && temperature <= 40) {
      return {
        status: 'Active Stratification',
        icon: '❄️',
        color: 'text-blue-400',
        tip: 'Cold moist stratification in progress. Native seeds breaking dormancy.',
        progress,
      }
    }
    return {
      status: 'Active Stratification',
      icon: '❄️',
      color: 'text-blue-400',
      tip:
        temperature < 28
          ? 'Hard freeze—protect seed beds.'
          : 'Warm spell may interrupt stratification.',
      progress,
    }
  }

  // Spring germination trigger (Mar-Apr)
  if (month === 3 || month === 4) {
    if (temperature > 55 && precipitation > 0) {
      return {
        status: 'Germination Trigger',
        icon: '🌱',
        color: 'text-green-400',
        tip: 'Warm rain! Perfect for native germination.',
        progress: 100,
      }
    }
    return {
      status: 'Germination Trigger',
      icon: '🌤️',
      color: 'text-yellow-400',
      tip: temperature > 55 ? 'Soil warming. Awaiting rain.' : 'Still cool. Wait for 55°F+.',
      progress: temperature > 55 ? 75 : 50,
    }
  }

  // Growing season (May-Oct)
  if (month >= 5 && month <= 10) {
    const monthProgress = Math.round(((month - 5) / 6) * 100)
    if (month <= 6) {
      return {
        status: 'Growing Season',
        icon: '🌻',
        color: 'text-green-500',
        tip: 'Peak growing season.',
        progress: monthProgress,
      }
    }
    if (month <= 8) {
      return {
        status: 'Growing Season',
        icon: '☀️',
        color: 'text-amber-500',
        tip: 'Midsummer. Water during dry spells.',
        progress: monthProgress,
      }
    }
    return {
      status: 'Growing Season',
      icon: '🍂',
      color: 'text-orange-500',
      tip: 'Season ending. Seeds setting.',
      progress: monthProgress,
    }
  }

  // November dormancy
  return {
    status: 'Dormant',
    icon: '💤',
    color: 'text-gray-400',
    tip: 'Dormancy. Collect seeds.',
    progress: 0,
  }
}
