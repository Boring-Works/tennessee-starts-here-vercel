/**
 * Almanac TypeScript interfaces and constants
 *
 * Weather codes follow WMO (World Meteorological Organization) standard:
 * https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
 *
 * Code ranges:
 * - 0-3: Clear to cloudy
 * - 45-48: Fog
 * - 51-57: Drizzle
 * - 61-67: Rain
 * - 71-77: Snow
 * - 80-82: Showers
 * - 85-86: Snow showers
 * - 95-99: Thunderstorms
 */

export interface WeatherData {
  current: CurrentConditions
  hourly: HourlyForecast
  daily: DailyForecast
  location: Location
}

export interface CurrentConditions {
  temperature: number
  feelsLike: number
  humidity: number
  precipitation: number
  weatherCode: number
  windSpeed: number
  windDirection: number
  windGusts: number
  pressure: number
  soilTemperature?: number
  snowDepth?: number
  cloudCover?: number // NEW: 0-100%
  visibility?: number // NEW: in meters
  dewPoint?: number // NEW: in °F
  uvIndex?: number // NEW: 0-11+
  isDay?: boolean // NEW: true if daytime
}

export interface HourlyForecast {
  time: string[]
  temperature: number[]
  feelsLike?: number[] // NEW
  precipitationProbability: number[]
  precipitation: number[]
  weatherCode: number[]
  snowfall?: number[]
  snowDepth?: number[] // NEW: running snow depth
  cloudCover?: number[] // NEW
  visibility?: number[] // NEW
  windSpeed?: number[] // NEW
  windGusts?: number[] // NEW
  dewPoint?: number[] // NEW
  uvIndex?: number[] // NEW
  freezingLevel?: number[] // NEW: altitude in meters where temp = 32°F
}

export interface DailyForecast {
  time: string[]
  temperatureMax: number[]
  temperatureMin: number[]
  feelsLikeMax?: number[] // NEW
  feelsLikeMin?: number[] // NEW
  precipitationSum: number[]
  precipitationProbability: number[]
  precipitationHours?: number[] // NEW
  weatherCode: number[]
  sunrise: string[]
  sunset: string[]
  daylightDuration?: number[] // NEW: seconds of daylight
  snowfallSum?: number[]
  windSpeedMax?: number[] // NEW
  windGustsMax?: number[] // NEW
  windDirectionDominant?: number[] // NEW
  uvIndexMax?: number[] // NEW
}

export interface Location {
  latitude: number
  longitude: number
  timezone: string
}

export interface TaskScore {
  score: number // 1-10
  label: 'Perfect' | 'Good' | 'Fair' | 'Poor' | 'Avoid'
  instruction: string
}

export interface TaskScores {
  sower: TaskScore
  shepherd: TaskScore
  keeper: TaskScore
  builder: TaskScore
}

export interface MoonData {
  phase: number // 0-1 (0 = new, 0.5 = full)
  illumination: number // 0-1
  phaseName: string
  emoji: string
}

// Note: ExtendedMetrics in taskScores.ts is used for score calculations
// It includes all WeatherMetrics fields plus winter/forecast analysis

// WMO Weather codes mapping
export interface WeatherCodeInfo {
  condition: string
  icon: string
  category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm'
}

export const DEFAULT_WEATHER: WeatherCodeInfo = {
  condition: 'Unknown',
  icon: 'cloud',
  category: 'cloudy',
}

export const WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  0: { condition: 'Clear sky', icon: 'sun', category: 'clear' },
  1: { condition: 'Mainly clear', icon: 'sun', category: 'clear' },
  2: { condition: 'Partly cloudy', icon: 'cloud-sun', category: 'cloudy' },
  3: { condition: 'Overcast', icon: 'cloud', category: 'cloudy' },
  45: { condition: 'Fog', icon: 'cloud-fog', category: 'fog' },
  48: { condition: 'Depositing rime fog', icon: 'cloud-fog', category: 'fog' },
  51: { condition: 'Light drizzle', icon: 'cloud-drizzle', category: 'drizzle' },
  53: { condition: 'Moderate drizzle', icon: 'cloud-drizzle', category: 'drizzle' },
  55: { condition: 'Dense drizzle', icon: 'cloud-drizzle', category: 'drizzle' },
  56: { condition: 'Light freezing drizzle', icon: 'cloud-drizzle', category: 'drizzle' },
  57: { condition: 'Dense freezing drizzle', icon: 'cloud-drizzle', category: 'drizzle' },
  61: { condition: 'Slight rain', icon: 'cloud-rain', category: 'rain' },
  63: { condition: 'Moderate rain', icon: 'cloud-rain', category: 'rain' },
  65: { condition: 'Heavy rain', icon: 'cloud-rain', category: 'rain' },
  66: { condition: 'Light freezing rain', icon: 'cloud-rain', category: 'rain' },
  67: { condition: 'Heavy freezing rain', icon: 'cloud-rain', category: 'rain' },
  71: { condition: 'Slight snow', icon: 'snowflake', category: 'snow' },
  73: { condition: 'Moderate snow', icon: 'snowflake', category: 'snow' },
  75: { condition: 'Heavy snow', icon: 'snowflake', category: 'snow' },
  77: { condition: 'Snow grains', icon: 'snowflake', category: 'snow' },
  80: { condition: 'Slight rain showers', icon: 'cloud-rain', category: 'rain' },
  81: { condition: 'Moderate rain showers', icon: 'cloud-rain', category: 'rain' },
  82: { condition: 'Violent rain showers', icon: 'cloud-rain', category: 'rain' },
  85: { condition: 'Slight snow showers', icon: 'snowflake', category: 'snow' },
  86: { condition: 'Heavy snow showers', icon: 'snowflake', category: 'snow' },
  95: { condition: 'Thunderstorm', icon: 'cloud-lightning', category: 'thunderstorm' },
  96: {
    condition: 'Thunderstorm with slight hail',
    icon: 'cloud-lightning',
    category: 'thunderstorm',
  },
  99: {
    condition: 'Thunderstorm with heavy hail',
    icon: 'cloud-lightning',
    category: 'thunderstorm',
  },
}

export function getWeatherInfo(code: number): WeatherCodeInfo {
  return WEATHER_CODES[code] ?? DEFAULT_WEATHER
}

// Snow-related weather codes
export const SNOW_WEATHER_CODES = [71, 73, 75, 77, 85, 86]

// Ice-related weather codes (freezing rain/drizzle)
export const ICE_WEATHER_CODES = [56, 57, 66, 67]

export function isSnowCode(code: number): boolean {
  return SNOW_WEATHER_CODES.includes(code)
}

export function isIceCode(code: number): boolean {
  return ICE_WEATHER_CODES.includes(code)
}

// Visibility descriptions
export function getVisibilityDescription(meters: number): string {
  const miles = meters / 1609.34
  if (miles < 0.25) return 'Near zero visibility'
  if (miles < 0.5) return 'Very poor visibility'
  if (miles < 1) return 'Poor visibility'
  if (miles < 3) return 'Moderate visibility'
  if (miles < 6) return 'Good visibility'
  return 'Excellent visibility'
}

// UV Index descriptions
export function getUVDescription(uv: number): { level: string; advice: string; color: string } {
  if (uv <= 2) return { level: 'Low', advice: 'No protection needed', color: 'text-green-400' }
  if (uv <= 5) return { level: 'Moderate', advice: 'Seek shade midday', color: 'text-yellow-400' }
  if (uv <= 7) return { level: 'High', advice: 'Protection required', color: 'text-orange-400' }
  if (uv <= 10) return { level: 'Very High', advice: 'Extra protection', color: 'text-red-400' }
  return { level: 'Extreme', advice: 'Avoid sun exposure', color: 'text-purple-400' }
}

// ============================================================================
// Environmental Data Types (NWS, AQI, Lightning, Stream, Drought, Phenology)
// ============================================================================

// NWS Alert Types
export type AlertSeverity = 'Minor' | 'Moderate' | 'Severe' | 'Extreme'
export type AlertUrgency = 'Immediate' | 'Expected' | 'Future' | 'Past' | 'Unknown'

export interface NWSAlert {
  id: string
  event: string
  severity: AlertSeverity
  urgency: AlertUrgency
  headline: string
  description: string
  instruction: string | null
  onset: string
  expires: string
  areaDesc: string
}

export interface NWSAlertsResponse {
  alerts: NWSAlert[]
  hasFireWeatherAlert: boolean
  error?: string
}

// Air Quality Types
export type AQILevel =
  | 'good'
  | 'moderate'
  | 'sensitive'
  | 'unhealthy'
  | 'very-unhealthy'
  | 'hazardous'

export interface AirQualityData {
  aqi: number
  level: AQILevel
  dominantPollutant: string
  stationName: string
  timestamp: string
}

export function getAQILevel(aqi: number): {
  level: AQILevel
  label: string
  emoji: string
  color: string
  guidance: string
} {
  if (aqi <= 50)
    return {
      level: 'good',
      label: 'Good',
      emoji: '😊',
      color: 'text-green-400',
      guidance: 'Good for outdoor work',
    }
  if (aqi <= 100)
    return {
      level: 'moderate',
      label: 'Moderate',
      emoji: '😐',
      color: 'text-yellow-400',
      guidance: 'Acceptable for most',
    }
  if (aqi <= 150)
    return {
      level: 'sensitive',
      label: 'Unhealthy for Sensitive',
      emoji: '😷',
      color: 'text-orange-400',
      guidance: 'Sensitive groups limit prolonged exertion',
    }
  if (aqi <= 200)
    return {
      level: 'unhealthy',
      label: 'Unhealthy',
      emoji: '🤢',
      color: 'text-red-400',
      guidance: 'Limit outdoor activity',
    }
  if (aqi <= 300)
    return {
      level: 'very-unhealthy',
      label: 'Very Unhealthy',
      emoji: '☠️',
      color: 'text-purple-400',
      guidance: 'Avoid outdoor activity',
    }
  return {
    level: 'hazardous',
    label: 'Hazardous',
    emoji: '💀',
    color: 'text-rose-900',
    guidance: 'Stay indoors',
  }
}

// Lightning Types
// Alert thresholds based on NOAA/NWS safety guidelines:
// - DANGER (≤10 mi): Within typical lightning strike range
// - WARNING (≤20 mi): Storm approaching, prepare for shelter
// - WATCH (≤50 mi): Storms in area, monitor conditions
// See lightning.ts for full source documentation
export interface LightningStrike {
  lat: number
  lon: number
  timestamp: number
  distanceMiles: number
}

export type LightningAlertLevel = 'danger' | 'warning' | 'watch' | null

export interface LightningData {
  strikes: LightningStrike[]
  nearestMiles: number | null
  alertLevel: LightningAlertLevel
  strikeCount: number
}

export function getLightningAlertLevel(nearestMiles: number | null): {
  level: LightningAlertLevel
  label: string
  color: string
  message: string
} {
  if (nearestMiles === null) return { level: null, label: '', color: '', message: '' }
  if (nearestMiles <= 10)
    return {
      level: 'danger',
      label: 'DANGER',
      color: 'text-red-400',
      message: 'SEEK SHELTER IMMEDIATELY',
    }
  if (nearestMiles <= 20)
    return {
      level: 'warning',
      label: 'WARNING',
      color: 'text-orange-400',
      message: 'Prepare to seek shelter',
    }
  if (nearestMiles <= 50)
    return {
      level: 'watch',
      label: 'WATCH',
      color: 'text-yellow-400',
      message: 'Storms in area, monitor',
    }
  return { level: null, label: '', color: '', message: '' }
}

// Stream/Creek Types
export type StreamStatus = 'flood' | 'high' | 'normal' | 'low' | 'drought'

export interface StreamData {
  siteName: string
  siteCode: string
  gageHeight: number | null
  streamflow: number | null
  status: StreamStatus
  percentile: number
  distanceMiles: number
}

export function getStreamStatus(percentile: number): {
  status: StreamStatus
  label: string
  color: string
} {
  if (percentile >= 90) return { status: 'flood', label: 'Flood Stage', color: 'text-red-400' }
  if (percentile >= 75) return { status: 'high', label: 'Above Normal', color: 'text-orange-400' }
  if (percentile >= 25) return { status: 'normal', label: 'Normal', color: 'text-green-400' }
  if (percentile >= 10) return { status: 'low', label: 'Below Normal', color: 'text-yellow-400' }
  return { status: 'drought', label: 'Much Below Normal', color: 'text-amber-700' }
}

// Phenology Types
export type SpringStatus = 'dormant' | 'approaching' | 'spring' | 'summer'

export interface PhenologyData {
  springStatus: SpringStatus
  daysToFirstLeaf: number | null
  daysToFirstBloom: number | null
  anomaly: 'early' | 'on-schedule' | 'late'
  anomalyDays: number
}

// Drought Types
export type DroughtLevel = 'None' | 'D0' | 'D1' | 'D2' | 'D3' | 'D4'

export interface DroughtData {
  level: DroughtLevel
  label: string
  percentArea: number
  lastUpdated: string
}

export function getDroughtInfo(level: DroughtLevel): { label: string; color: string } {
  const info: Record<DroughtLevel, { label: string; color: string }> = {
    None: { label: 'No Drought', color: 'text-green-400' },
    D0: { label: 'Abnormally Dry', color: 'text-yellow-400' },
    D1: { label: 'Moderate Drought', color: 'text-orange-400' },
    D2: { label: 'Severe Drought', color: 'text-red-400' },
    D3: { label: 'Extreme Drought', color: 'text-red-600' },
    D4: { label: 'Exceptional Drought', color: 'text-rose-900' },
  }
  return info[level]
}

// Fire Weather Events for Burn Day
export const FIRE_WEATHER_EVENTS = [
  'Red Flag Warning',
  'Fire Weather Watch',
  'Extreme Fire Danger',
  'Fire Warning',
]

// ============================================================================
// Farmer's Memory Types
// ============================================================================

// Pattern matching - correlates current conditions to historical outcomes
export interface PatternMatch {
  description: string
  probability: number // 0-100
  sampleSize: number
  conditions: string // e.g., "Cold front + high pressure"
}

// Historical data for "This Day in Weather"
export interface HistoricalDay {
  date: string // MM-DD format
  avgHigh: number
  avgLow: number
  recordHigh: { value: number; year: number }
  recordLow: { value: number; year: number }
  avgPrecip: number // inches
}

// Proverb validation against historical data
export interface ValidatedProverb {
  text: string
  correlation: number // 0-100 accuracy percentage
  sampleSize: number
  explanation: string
}

// Complete Farmer's Memory data structure
export interface FarmerMemoryData {
  patternMatch: PatternMatch | null
  thisDay: HistoricalDay
  validatedProverb: ValidatedProverb | null
}
