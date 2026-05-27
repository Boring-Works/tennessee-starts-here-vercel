/**
 * Almanac Library - Barrel Export
 *
 * Central export point for all almanac utilities, types, and functions.
 * Import from '@/lib/almanac' instead of individual files.
 */

// ============================================================================
// Types
// ============================================================================
export type {
  WeatherData,
  CurrentConditions,
  HourlyForecast,
  DailyForecast,
  Location,
  TaskScore,
  TaskScores,
  MoonData,
  WeatherCodeInfo,
  AlertSeverity,
  AlertUrgency,
  NWSAlert,
  NWSAlertsResponse,
  AQILevel,
  AirQualityData,
  LightningStrike,
  LightningAlertLevel,
  LightningData,
  StreamStatus,
  StreamData,
  SpringStatus,
  PhenologyData,
  DroughtLevel,
  DroughtData,
  PatternMatch,
  HistoricalDay,
  ValidatedProverb,
  FarmerMemoryData,
} from './types'

export type { GeoLocation } from './geocoding'
export type { SunData } from './moonPhase'
export type { VPDLevel, VPDData } from './vpd'
export type { ExtendedMetrics, NativePulseResult } from './taskScores'
export type { DualSaying } from './sayings'

// ============================================================================
// Types - Constants and Helpers
// ============================================================================
export {
  DEFAULT_WEATHER,
  WEATHER_CODES,
  SNOW_WEATHER_CODES,
  ICE_WEATHER_CODES,
  FIRE_WEATHER_EVENTS,
  getWeatherInfo,
  isSnowCode,
  isIceCode,
  getVisibilityDescription,
  getUVDescription,
  getAQILevel,
  getLightningAlertLevel,
  getStreamStatus,
  getDroughtInfo,
} from './types'

// ============================================================================
// Date Utilities
// ============================================================================
export {
  getDateComponents,
  getTodayString,
  isDateToday,
  isDateTomorrow,
  getWeekdayName,
  findTodayDailyIndex,
  findTodayHourlyIndex,
  getDayDisplayName,
  getEasternHour,
  getEasternDateString,
} from './dateUtils'

// ============================================================================
// Geocoding
// ============================================================================
export { DEFAULT_LOCATION, searchLocation, isInTennessee, formatLocationName } from './geocoding'

// ============================================================================
// Weather Data
// ============================================================================
export { transformWeatherData } from './weather'
export { getWeatherIcon } from './weatherIcons'

// ============================================================================
// Moon & Sun
// ============================================================================
export { getMoonData, getSunData, isDay } from './moonPhase'

// ============================================================================
// Task Scores
// ============================================================================
export {
  buildExtendedMetrics,
  calculateSowerScore,
  calculateOutdoorScore,
  calculateKeeperScore,
  calculateBuilderScore,
  calculateAllTaskScores,
  adjustScoreForAQI,
  calculateNativePulse,
} from './taskScores'

// ============================================================================
// Sayings
// ============================================================================
export {
  getCategoryFromConditions,
  FRONTIER_SAYINGS,
  getDeterministicSaying,
  getSaying,
  DUAL_SAYINGS,
  getDualSaying,
} from './sayings'

// ============================================================================
// Environmental Data
// ============================================================================
export {
  DROUGHT_LEVELS,
  getDroughtLevelInfo,
  getWorstDroughtLevel,
  getSimulatedDroughtData,
  SULLIVAN_COUNTY_FIPS,
} from './drought'

export {
  haversineDistance,
  calculateDirection,
  fetchLightningData,
  getNearestStrikeDirection,
} from './lightning'

export {
  getPhenologyData,
  getSpringStatusInfo,
  SULLIVAN_COUNTY_PHENOLOGY,
  getDayOfYear,
} from './phenology'

// ============================================================================
// Farmer's Memory
// ============================================================================
export {
  getHistoricalDay,
  findPatternMatch,
  getValidatedProverb,
  getFarmerMemoryData,
  getTemperatureAnomaly,
} from './farmerMemory'

// ============================================================================
// VPD (Vapor Pressure Deficit)
// ============================================================================
export { calculateVPD, getVPDLevel, getVPDData } from './vpd'

// ============================================================================
// Storage
// ============================================================================
export { saveLocation, loadLocation, clearLocation } from './storage'

// ============================================================================
// Hooks
// ============================================================================
export { useCountUp } from './useCountUp'
export {
  useClientTime,
  useIsClient,
  useClientTimeValue,
  useDaylightProgress,
  useHourlyStartIndex,
} from './useClientTime'
export type { DaylightInfo } from './useClientTime'

// ============================================================================
// Info Content
// ============================================================================
export type { InfoContent } from './infoContent'
export { INFO_CONTENT } from './infoContent'

// ============================================================================
// Precipitation Timing
// ============================================================================
export type {
  RadarFrame,
  RainViewerData,
  PrecipitationType,
  PrecipitationStatus,
} from './precipitationTiming'

export {
  latLonToTilePixel,
  sampleRadarPixel,
  analyzePrecipitation,
  sampleRadarTileClient,
  analyzePrecipitationClient,
} from './precipitationTiming'
