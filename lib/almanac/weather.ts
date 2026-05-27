/**
 * Weather Data Transformation
 *
 * Transforms Open-Meteo API responses into our internal WeatherData format.
 *
 * API Documentation: https://open-meteo.com/en/docs
 *
 * Unit conversions:
 * - Snow depth: meters → inches (multiply by 39.3701)
 * - Snowfall: centimeters → inches (multiply by 0.393701)
 * - Visibility: meters (no conversion needed)
 * - Pressure: hPa (hectopascals, same as millibars)
 *
 * Temperature units: API configured to return Fahrenheit
 * Wind units: API configured to return mph
 *
 * Note: DEFAULT_LOCATION is defined in geocoding.ts as the single source of truth
 */
import type {
  WeatherData,
  CurrentConditions,
  HourlyForecast,
  DailyForecast,
  Location,
} from './types'

// Unit conversion constants
const METERS_TO_INCHES = 39.3701
const CM_TO_INCHES = 0.393701 // 1 cm = 0.393701 inches

interface OpenMeteoResponse {
  latitude: number
  longitude: number
  timezone: string
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    precipitation: number
    weather_code: number
    wind_speed_10m: number
    wind_direction_10m: number
    wind_gusts_10m: number
    surface_pressure: number
    soil_temperature_6cm?: number
    snow_depth?: number // Always in METERS from API
    cloud_cover?: number
    visibility?: number // In meters
    dew_point_2m?: number
    uv_index?: number
    is_day?: number // 0 or 1
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    apparent_temperature?: number[]
    precipitation_probability: number[]
    precipitation: number[]
    weather_code: number[]
    snowfall?: number[] // In CENTIMETERS from API
    snow_depth?: number[] // In METERS from API
    cloud_cover?: number[]
    visibility?: number[]
    wind_speed_10m?: number[]
    wind_gusts_10m?: number[]
    dew_point_2m?: number[]
    uv_index?: number[]
    freezing_level_height?: number[]
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    apparent_temperature_max?: number[]
    apparent_temperature_min?: number[]
    precipitation_sum: number[]
    precipitation_probability_max: number[]
    precipitation_hours?: number[]
    weather_code: number[]
    sunrise: string[]
    sunset: string[]
    daylight_duration?: number[]
    snowfall_sum?: number[] // In CENTIMETERS from API
    wind_speed_10m_max?: number[]
    wind_gusts_10m_max?: number[]
    wind_direction_10m_dominant?: number[]
    uv_index_max?: number[]
  }
}

export function transformWeatherData(data: OpenMeteoResponse): WeatherData {
  // Convert snow_depth from meters to inches
  const snowDepthInches =
    data.current.snow_depth !== undefined ? data.current.snow_depth * METERS_TO_INCHES : undefined

  const current: CurrentConditions = {
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    precipitation: data.current.precipitation,
    weatherCode: data.current.weather_code,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    windGusts: data.current.wind_gusts_10m,
    pressure: data.current.surface_pressure,
    soilTemperature: data.current.soil_temperature_6cm,
    snowDepth: snowDepthInches,
    cloudCover: data.current.cloud_cover,
    visibility: data.current.visibility,
    dewPoint: data.current.dew_point_2m,
    uvIndex: data.current.uv_index,
    isDay: data.current.is_day === 1,
  }

  // Convert hourly snow_depth from meters to inches
  const hourlySnowDepth = data.hourly.snow_depth?.map((d) => d * METERS_TO_INCHES)

  // Convert hourly snowfall from centimeters to inches
  const hourlySnowfall = data.hourly.snowfall?.map((s) => s * CM_TO_INCHES)

  const hourly: HourlyForecast = {
    time: data.hourly.time,
    temperature: data.hourly.temperature_2m,
    feelsLike: data.hourly.apparent_temperature,
    precipitationProbability: data.hourly.precipitation_probability,
    precipitation: data.hourly.precipitation,
    weatherCode: data.hourly.weather_code,
    snowfall: hourlySnowfall, // Now in inches
    snowDepth: hourlySnowDepth,
    cloudCover: data.hourly.cloud_cover,
    visibility: data.hourly.visibility,
    windSpeed: data.hourly.wind_speed_10m,
    windGusts: data.hourly.wind_gusts_10m,
    dewPoint: data.hourly.dew_point_2m,
    uvIndex: data.hourly.uv_index,
    freezingLevel: data.hourly.freezing_level_height,
  }

  // Convert daily snowfall_sum from centimeters to inches
  const dailySnowfall = data.daily.snowfall_sum?.map((s) => s * CM_TO_INCHES)

  const daily: DailyForecast = {
    time: data.daily.time,
    temperatureMax: data.daily.temperature_2m_max,
    temperatureMin: data.daily.temperature_2m_min,
    feelsLikeMax: data.daily.apparent_temperature_max,
    feelsLikeMin: data.daily.apparent_temperature_min,
    precipitationSum: data.daily.precipitation_sum,
    precipitationProbability: data.daily.precipitation_probability_max,
    precipitationHours: data.daily.precipitation_hours,
    weatherCode: data.daily.weather_code,
    sunrise: data.daily.sunrise,
    sunset: data.daily.sunset,
    daylightDuration: data.daily.daylight_duration,
    snowfallSum: dailySnowfall, // Now in inches
    windSpeedMax: data.daily.wind_speed_10m_max,
    windGustsMax: data.daily.wind_gusts_10m_max,
    windDirectionDominant: data.daily.wind_direction_10m_dominant,
    uvIndexMax: data.daily.uv_index_max,
  }

  const location: Location = {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
  }

  return { current, hourly, daily, location }
}

// Note: Weather fetching is done directly in page.tsx using the /api/weather endpoint
// The transformWeatherData function is used to process the API response
