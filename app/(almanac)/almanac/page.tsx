'use client'

import './almanac.css'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Sprout, Leaf } from 'lucide-react'
import { WeatherAtmosphere } from '@/components/almanac/WeatherAtmosphere'
import { TopBar } from '@/components/almanac/TopBar'
import { ViewToggle } from '@/components/almanac/ViewToggle'
import { NextChangeHero } from '@/components/almanac/NextChangeHero'
import { NowDisplay } from '@/components/almanac/NowDisplay'
import { DecisionRail } from '@/components/almanac/DecisionRail'
import { QuickActions } from '@/components/almanac/QuickActions'
import { CollapsibleDeck } from '@/components/almanac/CollapsibleDeck'
import { ConditionsTiles } from '@/components/almanac/ConditionsTiles'
import { DaylightBar } from '@/components/almanac/DaylightBar'
import { FrontierSaying } from '@/components/almanac/FrontierSaying'
import { TaskScores } from '@/components/almanac/TaskScores'
import { MoonPhase } from '@/components/almanac/MoonPhase'
import NativePulse from '@/components/almanac/NativePulse'
import FarmerMemory from '@/components/almanac/FarmerMemory'
import { FarmerMemorySummary } from '@/components/almanac/FarmerMemorySummary'
import PlantingIntelligence from '@/components/almanac/PlantingIntelligence'
import NWSAlertBanner from '@/components/almanac/NWSAlertBanner'
import BurnDayIndicator from '@/components/almanac/BurnDayIndicator'
import StaleDataWarning from '@/components/almanac/StaleDataWarning'
import PresentedByBlock from '@/components/almanac/PresentedByBlock'
import ShareButton from '@/components/almanac/ShareButton'
import PrecipitationTiming from '@/components/almanac/PrecipitationTiming'
import { BrassBarometer } from '@/components/almanac/BrassBarometer'
import { MercuryThermometer } from '@/components/almanac/MercuryThermometer'
import { CopperWeathervane } from '@/components/almanac/CopperWeathervane'
import { GovernorsBriefing } from '@/components/almanac/GovernorsBriefing'
import { VisitorStatusCard } from '@/components/almanac/VisitorStatusCard'
import { PlanningIntelligenceCard } from '@/components/almanac/PlanningIntelligenceCard'
import { generateGovernorsBriefing } from '@/lib/almanac/generateBriefing'
import { generateTLDRSummary, generatePlanningIntelligence } from '@/lib/almanac/governorContent'

// 🚀 PERFORMANCE: Dynamic imports for heavy/below-fold components
// Reduces initial bundle size by ~30%
const EnvironmentalWatch = dynamic(() => import('@/components/almanac/EnvironmentalWatch'), {
  ssr: false,
  loading: () => <div className="h-32 animate-pulse bg-cream-dark rounded" />,
})
const PrecipitationRadar = dynamic(() => import('@/components/almanac/PrecipitationRadar'), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-cream-dark rounded" />,
})
const LightningWatch = dynamic(() => import('@/components/almanac/LightningWatch'), {
  ssr: false,
  loading: () => <div className="h-24 animate-pulse bg-cream-dark rounded" />,
})
const AirQualityCard = dynamic(() => import('@/components/almanac/AirQualityCard'), {
  ssr: false,
  loading: () => <div className="h-32 animate-pulse bg-cream-dark rounded" />,
})
const HourlySparkline = dynamic(() => import('@/components/almanac/HourlySparkline'), {
  ssr: false,
  loading: () => <div className="h-48 animate-pulse bg-cream-dark rounded" />,
})
const SnowConditions = dynamic(() => import('@/components/almanac/SnowConditions'), {
  ssr: false,
})
const OnboardingModal = dynamic(() => import('@/components/almanac/OnboardingModal'), {
  ssr: false,
})
const TomorrowPreview = dynamic(() => import('@/components/almanac/TomorrowPreview'), {
  ssr: false,
  loading: () => <div className="h-48 animate-pulse bg-cream-dark rounded" />,
})
const CompactSevenDay = dynamic(
  () =>
    import('@/components/almanac/CompactSevenDay').then((mod) => ({
      default: mod.CompactSevenDay,
    })),
  {
    ssr: false,
    loading: () => <div className="h-64 animate-pulse bg-cream-dark rounded" />,
  }
)
import type { DayForecast } from '@/components/almanac/CompactSevenDay'
import { transformWeatherData } from '@/lib/almanac/weather'
import {
  calculateAllTaskScores,
  calculateNativePulse,
  buildExtendedMetrics,
  type NativePulseResult,
} from '@/lib/almanac/taskScores'
import { findTodayDailyIndex } from '@/lib/almanac/dateUtils'
import { getDualSaying, type DualSaying } from '@/lib/almanac/sayings'
import { getMoonData, isDay } from '@/lib/almanac/moonPhase'
import { formatLocationName, type GeoLocation } from '@/lib/almanac/geocoding'
import { loadLocation } from '@/lib/almanac/storage'
import { getTemperatureAnomaly } from '@/lib/almanac/farmerMemory'
import { getWeatherInfo } from '@/lib/almanac/types'
import { logger } from '@/lib/logger'
import type { WeatherData, TaskScores as TaskScoresType, MoonData } from '@/lib/almanac/types'

const RETRY_DELAYS = [1000, 2000, 4000]
const MAX_RETRIES = 3

export default function AlmanacPage() {
  const [view, setView] = useState<'almanac' | 'governor'>('almanac')
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [taskScores, setTaskScores] = useState<TaskScoresType | null>(null)
  const [nativePulse, setNativePulse] = useState<NativePulseResult | null>(null)
  const [saying, setSaying] = useState<DualSaying | null>(null)
  const [moon, setMoon] = useState<MoonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [aqi, setAqi] = useState<number | null>(null)
  const [burnDayStatus, setBurnDayStatus] = useState<'burn' | 'no-burn' | 'unknown'>('unknown')
  const [hasActiveAlert, setHasActiveAlert] = useState(false)
  const [alertTitle, setAlertTitle] = useState<string | undefined>()
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchWeather = useCallback(async (loc: GeoLocation, attempt = 0) => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller for this request
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    try {
      setLoading(true)
      setRetryCount(attempt)

      const response = await fetch(`/api/weather?lat=${loc.latitude}&lon=${loc.longitude}`, {
        signal: abortController.signal,
      })

      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const weatherData = transformWeatherData(data)
      setWeather(weatherData)

      const metrics = buildExtendedMetrics(weatherData)
      const scores = calculateAllTaskScores(weatherData)
      setTaskScores(scores)

      const pulse = calculateNativePulse(metrics)
      setNativePulse(pulse)

      const daylight = isDay(new Date(), loc.latitude, loc.longitude)
      const dualSaying = getDualSaying(
        weatherData.current.weatherCode,
        weatherData.current.temperature,
        weatherData.current.windSpeed,
        daylight
      )
      setSaying(dualSaying)

      const moonData = getMoonData()
      setMoon(moonData)

      setLastUpdated(new Date())
      setError(null)
      setRetryCount(0)
    } catch (err) {
      // Handle aborted requests gracefully
      if (err instanceof Error && err.name === 'AbortError') {
        return // Request was cancelled, don't update state
      }

      logger.error('Weather fetch error:', err)

      if (attempt < MAX_RETRIES - 1) {
        const delay = RETRY_DELAYS[attempt] || RETRY_DELAYS[RETRY_DELAYS.length - 1]
        await new Promise((resolve) => setTimeout(resolve, delay))
        return fetchWeather(loc, attempt + 1)
      }

      setError('Unable to load weather data after multiple attempts. Please try again.')
      setRetryCount(0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const savedLocation = loadLocation()
    setLocation(savedLocation)
    fetchWeather(savedLocation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchWeather]) // Run only on mount

  const handleLocationChange = useCallback(
    (newLocation: GeoLocation) => {
      setLocation(newLocation)
      fetchWeather(newLocation)
    },
    [fetchWeather]
  )

  // Find today's index in the daily array (memoized)
  const todayIndex = useMemo(() => {
    if (!weather) return 0
    return findTodayDailyIndex(weather.daily.time)
  }, [weather])

  // Build extended forecast with all available days
  const compactDays: DayForecast[] = useMemo(() => {
    if (!weather) return []
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const dayNamesFull = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    // Use all available days from API (up to 16)
    return weather.daily.time.map((dateStr, i) => {
      const date = new Date(dateStr)
      return {
        day: dayNames[date.getDay()],
        dayFull: dayNamesFull[date.getDay()],
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        high: Math.round(weather.daily.temperatureMax[i]),
        low: Math.round(weather.daily.temperatureMin[i]),
        code: weather.daily.weatherCode[i],
        precipChance: weather.daily.precipitationProbability?.[i] || 0,
        precipSum: weather.daily.precipitationSum[i],
        sunrise: weather.daily.sunrise[i],
        sunset: weather.daily.sunset[i],
        windSpeedMax: weather.daily.windSpeedMax?.[i],
        windGustsMax: weather.daily.windGustsMax?.[i],
        uvIndexMax: weather.daily.uvIndexMax?.[i],
        feelsLikeMax: weather.daily.feelsLikeMax?.[i],
        feelsLikeMin: weather.daily.feelsLikeMin?.[i],
      }
    })
  }, [weather])

  // Calculate freeze info for DecisionRail
  const freezeInfo = useMemo(() => {
    if (!weather) return undefined
    const isBelow32 = weather.current.temperature <= 32
    const frostRisk = weather.current.temperature <= 36 && weather.current.humidity > 80
    // Find next freeze in hourly
    let nextFreezeHours: number | undefined
    if (weather.current.temperature > 32) {
      for (let i = 0; i < Math.min(24, weather.hourly.temperature.length); i++) {
        if (weather.hourly.temperature[i] <= 32) {
          nextFreezeHours = i
          break
        }
      }
    }
    return { isBelow32, frostRisk, nextFreezeHours }
  }, [weather])

  // Calculate temperature anomaly for DecisionRail
  const tempAnomaly = useMemo(() => {
    if (!weather || todayIndex === -1) return undefined
    const todayHigh = weather.daily.temperatureMax[todayIndex]
    const todayLow = weather.daily.temperatureMin[todayIndex]
    const now = new Date()
    const anomaly = getTemperatureAnomaly(todayHigh, todayLow, now.getMonth() + 1, now.getDate())
    return { diff: anomaly.highDiff, description: anomaly.description }
  }, [weather, todayIndex])

  if (loading || !location) {
    return (
      <main className="min-h-screen bg-midnight text-almanac-parchment">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-center">
              <p className="text-sm uppercase tracking-widest text-gold-leaf mb-4">
                {retryCount > 0 ? `Retrying (${retryCount}/${MAX_RETRIES})...` : 'Loading...'}
              </p>
              <div className="text-[96px] font-sans font-bold leading-none text-almanac-parchment/30">
                --°
              </div>
              <p className="text-xl text-almanac-parchment/30 mt-2">
                {retryCount > 0 ? 'Connection interrupted, retrying...' : 'Fetching conditions...'}
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !weather || !taskScores || !moon || !nativePulse) {
    return (
      <main className="min-h-screen bg-midnight text-almanac-parchment">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-almanac-danger text-center">{error || 'Something went wrong'}</p>
            <button
              type="button"
              onClick={() => location && fetchWeather(location)}
              className="mt-4 min-h-[44px] px-6 py-2 bg-gold-leaf text-midnight rounded-sm font-semibold hover:bg-gold-leaf/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-midnight active:scale-95"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    )
  }

  // Use todayIndex to get TODAY's data
  const todayHigh = weather.daily.temperatureMax[todayIndex]
  const todayLow = weather.daily.temperatureMin[todayIndex]
  const todaySunrise = weather.daily.sunrise[todayIndex]
  const todaySunset = weather.daily.sunset[todayIndex]

  // Tomorrow's preview data
  const tomorrowData =
    todayIndex !== -1 && weather.daily.time[todayIndex + 1]
      ? {
          high: weather.daily.temperatureMax[todayIndex + 1],
          low: weather.daily.temperatureMin[todayIndex + 1],
          precipChance: weather.daily.precipitationProbability?.[todayIndex + 1] || 0,
          weatherCode: weather.daily.weatherCode[todayIndex + 1],
        }
      : null

  // Get weather condition for sharing
  const weatherInfo = getWeatherInfo(weather.current.weatherCode)

  return (
    <div className="min-h-screen bg-midnight">
      <WeatherAtmosphere weatherCode={weather.current.weatherCode} />

      {/* Sticky TopBar */}
      <TopBar
        location={location}
        onLocationChange={handleLocationChange}
        temperature={weather.current.temperature}
        condition={weatherInfo.condition}
        isLoading={loading}
      />

      <main id="main-content" className="min-h-screen text-almanac-parchment relative z-10">
        {/* View Toggle */}
        <div className="max-w-3xl lg:max-w-7xl mx-auto px-4 lg:px-6 pt-6">
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        {view === 'almanac' && (
          /* Container: mobile narrow, desktop wide */
          <div className="max-w-3xl lg:max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
            {/* ============================================================
              ALERTS - Full width, always at top (safety first)
              ============================================================ */}
            <NWSAlertBanner
              lat={location.latitude}
              lon={location.longitude}
              onAlertChange={(hasAlert, title) => {
                setHasActiveAlert(hasAlert)
                setAlertTitle(title)
              }}
            />
            <LightningWatch lat={location.latitude} lon={location.longitude} />

            {/* Stale Data Warning */}
            <div className="flex justify-end mb-4">
              <StaleDataWarning
                lastUpdated={lastUpdated}
                onRefresh={() => location && fetchWeather(location)}
                isLoading={loading}
              />
            </div>

            {/* ============================================================
              MOBILE LAYOUT: Tourist-First Information Hierarchy
              Single column, organized for visit planning (80% of mobile users)
              ============================================================ */}
            <div className="flex flex-col gap-4 lg:hidden">
              {/* ===== ABOVE FOLD: Visitor Planning (3 screens) ===== */}

              {/* 1. Quick Actions - Critical decisions only */}
              <QuickActions
                hasActiveAlert={hasActiveAlert}
                alertTitle={alertTitle}
                burnDayStatus={burnDayStatus}
                freezeInfo={freezeInfo}
              />

              {/* 2. NOW Display - Current conditions */}
              <NowDisplay
                temperature={weather.current.temperature}
                feelsLike={weather.current.feelsLike}
                weatherCode={weather.current.weatherCode}
                windSpeed={weather.current.windSpeed}
                windDirection={weather.current.windDirection}
                windGusts={weather.current.windGusts}
                humidity={weather.current.humidity}
                dewPoint={weather.current.dewPoint}
                todayHigh={todayHigh}
                todayLow={todayLow}
                lastUpdated={lastUpdated}
              />

              {/* 3. Visitor Status Card - Answers "Should I visit today?"
                  Shows visit recommendation based on weather, alerts, and site status.
                  Wired from: weather.current, hasActiveAlert */}
              <VisitorStatusCard
                temperature={weather.current.temperature}
                weatherCode={weather.current.weatherCode}
                hasAlerts={hasActiveAlert}
                windSpeed={weather.current.windSpeed}
                precipitation={weather.current.precipitation}
              />

              {/* 4. 7-Day Forecast - Tourist planning horizon (MOVED UP from position 8) */}
              <CompactSevenDay days={compactDays} />

              {/* 5. Hourly Forecast - Next 12 hours detail */}
              <HourlySparkline hourly={weather.hourly} />

              {/* 6. Next Change Hero - Upcoming significant changes */}
              <NextChangeHero hourly={weather.hourly} currentTemp={weather.current.temperature} />

              {/* ===== BELOW FOLD: Detail sections (collapsed by default) ===== */}

              {/* Decision Rail - Climate Context */}
              <DecisionRail tempAnomaly={tempAnomaly} />

              {/* Workability Scores - Useful for farmers/gardeners */}
              <TaskScores
                sower={taskScores.sower}
                shepherd={taskScores.shepherd}
                keeper={taskScores.keeper}
                builder={taskScores.builder}
                aqi={aqi}
              />

              {/* Tomorrow + Burn Day Info */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <TomorrowPreview tomorrow={tomorrowData} />
                <BurnDayIndicator
                  lat={location.latitude}
                  lon={location.longitude}
                  onStatusChange={setBurnDayStatus}
                />
              </div>

              {/* Today Deck */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                {/* Farmer's Memory Summary (collapsed) */}
                <CollapsibleDeck title="Farmer's Memory" defaultOpen={false}>
                  <FarmerMemory
                    temperature={weather.current.temperature}
                    humidity={weather.current.humidity}
                    pressure={weather.current.pressure}
                    windSpeed={weather.current.windSpeed}
                    todayHigh={todayHigh}
                    todayLow={todayLow}
                    precipitation={weather.current.precipitation}
                    snowDepth={weather.current.snowDepth}
                  />
                </CollapsibleDeck>

                {/* Daily Proverb */}
                {saying && (
                  <div className="space-y-2">
                    <FrontierSaying
                      saying={saying.frontier}
                      modernLine={saying.modern}
                      temperature={weather.current.temperature}
                      location={formatLocationName(location)}
                    />
                    <ShareButton
                      frontierLine={saying.frontier}
                      modernLine={saying.modern}
                      temperature={weather.current.temperature}
                      location={formatLocationName(location)}
                    />
                  </div>
                )}
              </div>

              {/* Radar + Conditions */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <DaylightBar sunrise={todaySunrise} sunset={todaySunset} />
                <ConditionsTiles
                  uvIndex={weather.current.uvIndex}
                  visibility={weather.current.visibility}
                  cloudCover={weather.current.cloudCover}
                  windGusts={weather.current.windGusts}
                  moon={moon}
                  aqi={aqi}
                />
                <PrecipitationRadar latitude={location.latitude} longitude={location.longitude} />
              </div>

              {/* Farm Intelligence */}
              <CollapsibleDeck title="Farm Intelligence" icon={<Sprout className="w-4 h-4" />}>
                <PlantingIntelligence
                  temperature={weather.current.temperature}
                  humidity={weather.current.humidity}
                  soilTemperature={weather.current.soilTemperature}
                  tempHigh={todayHigh}
                  tempLow={todayLow}
                />
                <div className="mt-4">
                  <NativePulse pulse={nativePulse} />
                </div>
              </CollapsibleDeck>

              {/* Environmental Watch */}
              <CollapsibleDeck title="Environmental Watch" icon={<Leaf className="w-4 h-4" />}>
                <EnvironmentalWatch lat={location.latitude} lon={location.longitude} />
                <div className="mt-4">
                  <AirQualityCard
                    lat={location.latitude}
                    lon={location.longitude}
                    onAqiChange={setAqi}
                  />
                </div>
              </CollapsibleDeck>

              {/* Snow (conditional) */}
              {weather.current.snowDepth !== undefined && weather.current.snowDepth > 0 && (
                <SnowConditions
                  snowDepth={weather.current.snowDepth}
                  currentTemp={weather.current.temperature}
                  weatherCode={weather.current.weatherCode}
                />
              )}
            </div>

            {/* ============================================================
              DESKTOP LAYOUT: 12-column Grid
              ============================================================ */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4">
              {/* ========== ROW 1: Above the Fold (3-column) ========== */}
              <section
                aria-label="At a Glance"
                className="lg:col-span-12 grid lg:grid-cols-12 gap-4"
              >
                {/* LEFT: NOW Display (3 cols) */}
                <div className="lg:col-span-3">
                  <NowDisplay
                    temperature={weather.current.temperature}
                    feelsLike={weather.current.feelsLike}
                    weatherCode={weather.current.weatherCode}
                    windSpeed={weather.current.windSpeed}
                    windDirection={weather.current.windDirection}
                    windGusts={weather.current.windGusts}
                    humidity={weather.current.humidity}
                    dewPoint={weather.current.dewPoint}
                    todayHigh={todayHigh}
                    todayLow={todayLow}
                    lastUpdated={lastUpdated}
                  />
                </div>

                {/* CENTER: Next Change + Hourly (6 cols) */}
                <div className="lg:col-span-6 flex flex-col gap-3">
                  <NextChangeHero
                    hourly={weather.hourly}
                    currentTemp={weather.current.temperature}
                  />
                  <HourlySparkline hourly={weather.hourly} />
                  <PrecipitationTiming
                    lat={location.latitude}
                    lon={location.longitude}
                    hourlyPrecipFallback={
                      weather?.hourly?.precipitationProbability?.[new Date().getHours()]
                    }
                  />
                </div>

                {/* RIGHT: Quick Actions + Decision Rail (3 cols) */}
                <div className="lg:col-span-3 flex flex-col gap-3">
                  {/* Quick Actions - Critical decisions only */}
                  <QuickActions
                    hasActiveAlert={hasActiveAlert}
                    alertTitle={alertTitle}
                    burnDayStatus={burnDayStatus}
                    freezeInfo={freezeInfo}
                  />

                  {/* Decision Rail - Climate Context */}
                  <DecisionRail tempAnomaly={tempAnomaly} />
                </div>
              </section>

              {/* ========== ROW 2: Planning ========== */}
              <section aria-label="Planning" className="lg:col-span-12 grid lg:grid-cols-12 gap-4">
                {/* Visitor Status + Tomorrow + Burn Day (3 cols) */}
                <div className="lg:col-span-3 flex flex-col gap-3">
                  {/* Visitor Status Card - Answers "Should I visit today?"
                      Wired from: weather.current, hasActiveAlert */}
                  <VisitorStatusCard
                    temperature={weather.current.temperature}
                    weatherCode={weather.current.weatherCode}
                    hasAlerts={hasActiveAlert}
                    windSpeed={weather.current.windSpeed}
                    precipitation={weather.current.precipitation}
                  />
                  <TomorrowPreview tomorrow={tomorrowData} />
                  <BurnDayIndicator
                    lat={location.latitude}
                    lon={location.longitude}
                    onStatusChange={setBurnDayStatus}
                  />
                </div>

                {/* 7-Day Outlook */}
                <div className="lg:col-span-9">
                  <CompactSevenDay days={compactDays} />
                </div>
              </section>

              {/* ========== ROW 3: Today Deck ========== */}
              <section aria-label="Today's Details" className="lg:col-span-12">
                <div className="border-t border-white/10 pt-4 mt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-almanac-gold mb-4">
                    Today&apos;s Details
                  </h3>
                  <div className="grid lg:grid-cols-12 gap-4">
                    {/* Workability Scores */}
                    <div className="lg:col-span-8">
                      <TaskScores
                        sower={taskScores.sower}
                        shepherd={taskScores.shepherd}
                        keeper={taskScores.keeper}
                        builder={taskScores.builder}
                        aqi={aqi}
                        compact
                      />
                    </div>

                    {/* Farmer's Memory Summary */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <FarmerMemorySummary
                          temperature={weather.current.temperature}
                          humidity={weather.current.humidity}
                          pressure={weather.current.pressure}
                          windSpeed={weather.current.windSpeed}
                          todayHigh={todayHigh}
                          todayLow={todayLow}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById('farmer-memory-deck')
                            el?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className="min-h-[44px] text-xs text-almanac-gold hover:underline mt-2 px-2 -mx-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-almanac-gold active:scale-95"
                        >
                          View full analysis
                        </button>
                      </div>
                    </div>

                    {/* Daily Proverb + Share */}
                    <div className="lg:col-span-6">
                      {saying && (
                        <div className="space-y-2">
                          <FrontierSaying
                            saying={saying.frontier}
                            modernLine={saying.modern}
                            temperature={weather.current.temperature}
                            location={formatLocationName(location)}
                          />
                          <ShareButton
                            frontierLine={saying.frontier}
                            modernLine={saying.modern}
                            temperature={weather.current.temperature}
                            location={formatLocationName(location)}
                          />
                        </div>
                      )}
                    </div>

                    {/* Moon Phase */}
                    <div className="lg:col-span-6">
                      <MoonPhase moon={moon} />
                    </div>
                  </div>
                </div>
              </section>

              {/* ========== ROW 4: Radar + Conditions ========== */}
              <section
                aria-label="Radar and Conditions"
                className="lg:col-span-12 grid lg:grid-cols-12 gap-4"
              >
                {/* Radar */}
                <div className="lg:col-span-8">
                  <PrecipitationRadar latitude={location.latitude} longitude={location.longitude} />
                </div>

                {/* Conditions */}
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <DaylightBar sunrise={todaySunrise} sunset={todaySunset} />
                  <ConditionsTiles
                    uvIndex={weather.current.uvIndex}
                    visibility={weather.current.visibility}
                    cloudCover={weather.current.cloudCover}
                    windGusts={weather.current.windGusts}
                    moon={moon}
                    aqi={aqi}
                  />
                </div>
              </section>

              {/* ========== ROW 5: Farm Deck (CollapsibleDeck) ========== */}
              <div className="lg:col-span-12" id="farmer-memory-deck">
                <CollapsibleDeck
                  title="Farm Intelligence"
                  icon={<Sprout className="w-4 h-4" />}
                  defaultOpen={false}
                >
                  <div className="grid lg:grid-cols-2 gap-4">
                    <PlantingIntelligence
                      temperature={weather.current.temperature}
                      humidity={weather.current.humidity}
                      soilTemperature={weather.current.soilTemperature}
                      tempHigh={todayHigh}
                      tempLow={todayLow}
                    />
                    <FarmerMemory
                      temperature={weather.current.temperature}
                      humidity={weather.current.humidity}
                      pressure={weather.current.pressure}
                      windSpeed={weather.current.windSpeed}
                      todayHigh={todayHigh}
                      todayLow={todayLow}
                      precipitation={weather.current.precipitation}
                      snowDepth={weather.current.snowDepth}
                    />
                  </div>
                  <div className="mt-4">
                    <NativePulse pulse={nativePulse} />
                  </div>
                </CollapsibleDeck>
              </div>

              {/* ========== ROW 6: Environment Deck (CollapsibleDeck) ========== */}
              <div className="lg:col-span-12">
                <CollapsibleDeck
                  title="Environmental Watch"
                  icon={<Leaf className="w-4 h-4" />}
                  defaultOpen={false}
                >
                  <div className="grid lg:grid-cols-2 gap-4">
                    <EnvironmentalWatch lat={location.latitude} lon={location.longitude} />
                    <AirQualityCard
                      lat={location.latitude}
                      lon={location.longitude}
                      onAqiChange={setAqi}
                    />
                  </div>
                </CollapsibleDeck>
              </div>

              {/* Snow (conditional) */}
              {weather.current.snowDepth !== undefined && weather.current.snowDepth > 0 && (
                <div className="lg:col-span-12">
                  <SnowConditions
                    snowDepth={weather.current.snowDepth}
                    currentTemp={weather.current.temperature}
                    weatherCode={weather.current.weatherCode}
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <PresentedByBlock lastUpdated={lastUpdated} />

            {/* First-visit Onboarding */}
            <OnboardingModal />
          </div>
        )}

        {view === 'governor' && (
          /* Governor's View: Brass Instruments & Executive Briefing */
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
            {/* Alerts still show in Governor's View */}
            <NWSAlertBanner
              lat={location.latitude}
              lon={location.longitude}
              onAlertChange={(hasAlert, title) => {
                setHasActiveAlert(hasAlert)
                setAlertTitle(title)
              }}
            />
            <LightningWatch lat={location.latitude} lon={location.longitude} />

            {/* Stale Data Warning */}
            <div className="flex justify-end mb-4">
              <StaleDataWarning
                lastUpdated={lastUpdated}
                onRefresh={() => location && fetchWeather(location)}
                isLoading={loading}
              />
            </div>

            {/* Brass Instruments Display */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <BrassBarometer pressure={weather.current.pressure} />
              <MercuryThermometer temperature={weather.current.temperature} />
              <CopperWeathervane
                windDirection={weather.current.windDirection}
                windSpeed={weather.current.windSpeed}
              />
            </div>

            {/* TL;DR Summary & Planning Intelligence */}
            <PlanningIntelligenceCard
              tldr={generateTLDRSummary(weather)}
              planning={generatePlanningIntelligence(weather)}
            />

            {/* Governor's Intelligence Briefing */}
            <GovernorsBriefing briefing={generateGovernorsBriefing(weather)} />

            {/* Footer */}
            <PresentedByBlock lastUpdated={lastUpdated} />

            {/* First-visit Onboarding */}
            <OnboardingModal />
          </div>
        )}
      </main>
    </div>
  )
}
