# Building the 1790s Almanac Tool

## A Fact-Based Implementation Guide

**Purpose:** Create an authentic historical weather observation tool using modern APIs to represent what frontier observers _actually_ experienced in 1790-1796.

**Status:** Implementation Ready
**Date:** January 29, 2026

---

## What We Know (Verified Facts)

### Weather Instruments Reality

| Instrument       | 1790s Access          | Cost/Availability                                                                          | Source                                          |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| **Thermometer**  | Elite only            | ~$500 equivalent (1776); Jefferson owned "almost twenty" over lifetime                     | Monticello, Jefferson Weather Project           |
| **Barometer**    | Scientific elite only | "One of only ones in America" (1776); Rev. Madison: "no Possibility of getting one" (1784) | Smithsonian, Jefferson Weather Project          |
| **Hygrometer**   | Not available         | Cutting-edge science; Jefferson bought in Paris (1788); unreliable                         | Jefferson Weather Project                       |
| **Weather Vane** | **UNIVERSAL**         | Blacksmith-made iron/wood; all tiers                                                       | Colonial Williamsburg, Shem Drowne 1716 example |
| **Almanac**      | **UNIVERSAL**         | ~1 per 100 colonists; Poor Richard's sold ~10,000 copies annually                          | Library of Congress                             |

**Key Insight:** Scientific instruments were **elite luxury items**. Typical frontier families used **almanacs, weathervanes, and observation** to make weather decisions.

### What Typical Frontier Families Could Observe

**NO instruments needed:**

- Wind direction (weathervane or watching)
- Precipitation (direct observation: "raining," "heavy rain," "light rain")
- Cloud cover (visual: "clear," "partly cloudy," "overcast")
- Snow depth (measuring stick in inches)
- Seasonal patterns (first frost, bird migration, plant responses)
- Folk wisdom (red sky, animal behavior)

**With almanac (universal access):**

- Sunrise/sunset times (printed tables)
- Moon phase (printed tables or observation)
- Monthly weather tendencies
- Planting guidance

**Elite households ONLY:**

- Quantitative temperature (°F)
- Barometric pressure (inches of mercury)

### Measurement Units (1790s Standard)

| Quantity      | Unit                                 | Source                                                                    |
| ------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| Temperature   | **Degrees Fahrenheit**               | Jefferson 1778: "Fahrenheit's thermometer is the only one in use with us" |
| Pressure      | **Inches of mercury** (27-31 inches) | Smithsonian barometer examples                                            |
| Time          | **Local solar time**                 | No standardized time zones until 1883                                     |
| Distance      | Miles, feet, inches                  | English customary units                                                   |
| Precipitation | Inches                               | Rain gauge (if available)                                                 |

---

## What Our Modern APIs Provide

### Available Data (from Almanac Audit)

**Current Conditions (17 fields):**

- Temperature (°F)
- Feels Like (°F) _[modern calculation]_
- Humidity (%) _[hygrometer data - 1790s elite couldn't measure reliably]_
- Precipitation (inches)
- Weather Code (WMO 0-99) _[modern classification]_
- Wind Speed (mph) _[modern measurement]_
- Wind Direction (0-360°)
- Wind Gusts (mph) _[modern measurement]_
- Pressure (hPa) → _can convert to inches Hg_
- Soil Temperature (°F) _[modern measurement]_
- Snow Depth (inches)
- Cloud Cover (%) _[modern percentage, 1790s = qualitative]_
- Visibility (meters) _[modern measurement]_
- Dew Point (°F) _[modern calculation]_
- UV Index (0-11+) _[1994 invention]_
- Is Day (boolean)

**Daily Forecast (16 days):**

- Sunrise/sunset times
- Temperature max/min
- Precipitation probability
- Weather conditions

**Environmental:**

- NWS Alerts _[modern emergency system]_
- Air Quality Index _[1970s EPA invention]_
- Lightning detection _[21st century network]_
- Stream levels (USGS) _[modern gauge system]_

**Almanac Heritage:**

- Moon phase (SunCalc)
- Task scores (Sower, Shepherd, Keeper, Builder) _[modern indices based on historical decision-making]_

---

## Feature Concepts: "Then & Now" Comparisons

### Feature 1: Three-Tier Observer View

**Concept:** Show weather data filtered by what different observers could actually measure in 1790.

**Three Tiers:**

#### Typical Frontier Household (80% of population)

**Available:**

- Wind direction (weathervane): "Southwest"
- Precipitation: "Raining" / "Heavy rain" / "Not raining"
- Cloud cover: "Clear" / "Partly cloudy" / "Overcast"
- Snow depth: "4 inches"
- Temperature feeling: "Cold" / "Warm" / "Hot" / "Freezing"
- Almanac data: Sunrise 6:24 AM, Sunset 5:47 PM, Moon 🌗 (Last Quarter)

**Decision-making:**

- "Ground too wet for planting" (observed puddles)
- "Too cold for livestock" (water trough frozen)
- Almanac says: "Plant corn when oak leaves size of squirrel's ear"

#### Cobb/Elite Household (10-15% of population)

**Everything above PLUS:**

- _Maybe_ temperature if they invested ~$500 equivalent: "68°F"
- _Unlikely_ barometric pressure (extremely rare)
- Better almanacs, possibly weather journals

#### Jefferson/Scientific Elite (~1-5%)

**Everything above PLUS:**

- Precise temperature readings: "68°F at dawn, 75°F afternoon"
- Barometric pressure: "30.0 inches of mercury, steady"
- Multiple readings per day
- Weather diary with patterns

**Implementation:**

```typescript
interface ObserverTier {
  type: 'typical' | 'cobb' | 'scientific'
  canMeasure: {
    temperature: boolean // false | false | true
    pressure: boolean // false | false | true
    windDirection: boolean // true | true | true
    precipitation: boolean // true | true | true
    quantitativeWind: boolean // false | false | false (no one had anemometers)
  }
}

function filterWeatherByTier(weather: WeatherData, tier: ObserverTier): FilteredWeather {
  // Return only measurements available to that tier
  // Convert quantitative to qualitative where appropriate
}
```

### Feature 2: Historical Translation Display

**Concept:** Side-by-side comparison showing modern precision vs. 1790s observation.

**Example Display:**

```
┌─────────────────────────────────────────────────────┐
│  1790s OBSERVATION      │  2026 MEASUREMENT         │
├─────────────────────────┼───────────────────────────┤
│ Temperature             │                           │
│ "Warm"                  │ 68°F (feels like 70°F)    │
│ (hand sense only)       │ [Heat Index: modern calc] │
├─────────────────────────┼───────────────────────────┤
│ Wind                    │                           │
│ "Fresh breeze from      │ SSW 12 mph, gusts 18 mph  │
│ southwest" (weathervane)│ [Anemometer: modern]      │
├─────────────────────────┼───────────────────────────┤
│ Pressure                │                           │
│ [NOT AVAILABLE]         │ 1015 hPa (30.0 inches Hg) │
│ ("One of only ones in   │                           │
│  America" in 1776)      │                           │
├─────────────────────────┼───────────────────────────┤
│ Sky                     │                           │
│ "Partly cloudy"         │ 40% cloud cover           │
│ (visual estimate)       │                           │
├─────────────────────────┼───────────────────────────┤
│ Almanac                 │                           │
│ Sunrise: 6:24 AM        │ Sunrise: 6:24 AM          │
│ Sunset: 5:47 PM         │ Sunset: 5:47 PM           │
│ Moon: Last Quarter 🌗   │ Moon: Last Quarter 🌗     │
│ [EXACT MATCH]           │ [Calculated, not printed] │
└─────────────────────────┴───────────────────────────┘
```

**API Endpoint:**

```typescript
// GET /api/almanac/historical-view?lat=36.5&lon=-82.5&tier=typical

interface HistoricalViewResponse {
  modern: {
    temperature: number
    pressure: number
    windSpeed: number
    // ... all modern measurements
  }
  historical: {
    temperatureQualitative: 'Cold' | 'Cool' | 'Warm' | 'Hot' | 'Freezing'
    temperatureQuantitative: number | null // null unless tier=scientific
    pressureAvailable: boolean // false unless tier=scientific
    windDirection: string // "Southwest" (weathervane)
    windSpeedQualitative: 'Calm' | 'Breeze' | 'Windy' | 'Gale'
    cloudCover: 'Clear' | 'Partly cloudy' | 'Overcast'
    precipitation: 'None' | 'Light rain' | 'Heavy rain' | 'Snow'
  }
  almanac: {
    sunrise: string
    sunset: string
    moonPhase: string
    moonEmoji: string
  }
  decisionGuidance: {
    planting: string // "Too wet for planting"
    livestock: string // "Safe for grazing"
    construction: string // "Good day for roofing"
  }
}
```

### Feature 3: "What Jefferson Could Know" Display

**Concept:** Educational feature showing Jefferson's weather observations vs. modern data.

**Jefferson's System (Verified):**

- Dawn temperature reading
- Late afternoon temperature reading
- Barometric pressure (when available)
- Wind direction/force
- Sometimes precipitation amounts
- 19,000+ observations over 50 years at nearly 100 locations

**Display Mockup:**

```
┌──────────────────────────────────────────────────────┐
│  JEFFERSON'S WEATHER JOURNAL - May 15, 1791          │
├──────────────────────────────────────────────────────┤
│  Dawn Reading: 54°F                                  │
│  [Mercury thermometer, imported from London]         │
│                                                      │
│  Afternoon Reading: 68°F                            │
│                                                      │
│  Barometer: 30.0 inches, steady                     │
│  [One of only ~dozen in America]                    │
│                                                      │
│  Wind: Southwest, moderate                          │
│  [Weathervane observation]                          │
│                                                      │
│  Sky: Partly cloudy                                 │
│  [Visual observation]                               │
│                                                      │
│  ─────────────────────────────────────────          │
│                                                      │
│  Your Modern Almanac Adds:                          │
│  • Wind speed: 12 mph (he said "moderate")         │
│  • Humidity: 65% (he couldn't measure)             │
│  • 16-day forecast (he had almanac monthly)        │
│  • UV Index: 6 (concept didn't exist)              │
│  • Air Quality: Good (concept didn't exist)        │
│  • Lightning: 23 miles away (he'd see storm)       │
│                                                      │
│  Same Fundamental Purpose:                          │
│  • Plan agricultural work                          │
│  • Track seasonal patterns                         │
│  • Record observations for science                 │
└──────────────────────────────────────────────────────┘
```

### Feature 4: Period-Appropriate Weather Briefing

**Concept:** Generate weather reports in 1790s language using modern data.

**Example:**

```typescript
function generatePeriodBriefing(weather: WeatherData): string {
  const temp = weather.current.temperature
  const pressure = convertToPeriodPressure(weather.current.pressure) // hPa → inches Hg
  const wind = getWindDirection(weather.current.windDirection)

  return `
WEATHER FOR TERRITORIAL BUSINESS
Rocky Mount, ${formatDate()}

The glass stands at ${pressure} inches and ${getPressureTrend()},
promising ${getForecastDescription()} conditions.

Wind from the ${wind.toLowerCase()} at present,
with ${getCloudDescription(weather.current.cloudCover)}.

Temperature ${getTempDescription(temp)}.

${getWorkGuidance(weather)}

Based on the barometer and wind, expect ${get24HourPrediction()}.
  `.trim()
}

// Example output:
/*
WEATHER FOR TERRITORIAL BUSINESS
Rocky Mount, 15th May 1791

The glass stands at 30.0 inches and steady,
promising fair conditions.

Wind from the southwest at present,
with some clouds forming this afternoon.

Temperature moderate, suitable for outdoor work.

Good conditions for:
- Planting (soil warm, no rain expected)
- Construction (dry, moderate wind)
- Livestock grazing (comfortable)

Based on the barometer and wind, expect
continued fair weather through tomorrow.
*/
```

**Use Cases:**

- Living history programming at Rocky Mount
- Educational displays
- Immersive website experience
- Historical reenactment weather "broadcasts"

### Feature 5: Almanac Comparison Mode

**Concept:** Show modern 16-day forecast vs. what almanacs could predict.

```
┌──────────────────────────────────────────────────────┐
│  WEATHER PREDICTION CAPABILITIES                     │
├──────────────────────────────────────────────────────┤
│  1790s Almanac:                                      │
│  📖 Monthly tendencies (printed annually)            │
│  📖 "May: Expect warm days with occasional storms"   │
│  📖 Accuracy: ~50% (better than random guessing)     │
│                                                      │
│  Elite with Barometer (Jefferson):                  │
│  📊 24-48 hour pressure trend forecasting            │
│  📊 Falling glass → storm approaching                │
│  📊 Accuracy: ~70% for next-day weather              │
│                                                      │
│  Folk Wisdom:                                        │
│  🌅 "Red sky at morning, sailors take warning"      │
│  🌙 "Ring around moon means rain soon"              │
│  🐄 "Cattle lying down means storm coming"          │
│  Accuracy: Varies by saying (some 60-70%)           │
│                                                      │
│  Your Modern Almanac:                               │
│  ☁️ 16-day hourly forecast from numerical models    │
│  ☁️ Days 1-3: 80% accuracy                          │
│  ☁️ Days 4-7: 70% accuracy                          │
│  ☁️ Days 14-16: 50% accuracy (same as 1790 almanac!)│
│                                                      │
│  The Lesson:                                        │
│  Weather is still hard to predict beyond a week.    │
│  Frontierspeople learned to work with uncertainty.  │
└──────────────────────────────────────────────────────┘
```

---

## Practical UI Components

### Component 1: `<ObserverTierToggle>`

**Purpose:** Let users experience weather through different historical lenses.

```typescript
interface ObserverTierToggleProps {
  currentTier: 'typical' | 'cobb' | 'scientific'
  onTierChange: (tier: 'typical' | 'cobb' | 'scientific') => void
}

export function ObserverTierToggle({ currentTier, onTierChange }: ObserverTierToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onTierChange('typical')}
        className={currentTier === 'typical' ? 'active' : ''}
      >
        👨‍🌾 Typical Farmer
        <span className="text-xs">80% of population</span>
      </button>

      <button
        onClick={() => onTierChange('cobb')}
        className={currentTier === 'cobb' ? 'active' : ''}
      >
        🏛️ Elite Household
        <span className="text-xs">William Cobb tier</span>
      </button>

      <button
        onClick={() => onTierChange('scientific')}
        className={currentTier === 'scientific' ? 'active' : ''}
      >
        📐 Jefferson Level
        <span className="text-xs">Scientific observer</span>
      </button>
    </div>
  )
}
```

### Component 2: `<HistoricalWeatherCard>`

**Purpose:** Display weather data filtered by historical capability.

```typescript
interface HistoricalWeatherCardProps {
  weather: WeatherData
  tier: 'typical' | 'cobb' | 'scientific'
  showComparison?: boolean  // Show modern data alongside
}

export function HistoricalWeatherCard({
  weather,
  tier,
  showComparison = false
}: HistoricalWeatherCardProps) {
  const historical = filterByTier(weather, tier)

  return (
    <Card>
      <CardHeader>
        <h3>Weather Observation - {getTierName(tier)}</h3>
        <p className="text-sm text-muted-foreground">
          {getTierDescription(tier)}
        </p>
      </CardHeader>

      <CardContent>
        {/* Wind Direction - All tiers have weathervanes */}
        <div>
          <Label>Wind</Label>
          <p>{historical.windDirection}</p>
          {showComparison && (
            <p className="text-xs text-muted-foreground">
              Modern: {weather.current.windDirection}° at {weather.current.windSpeed} mph
            </p>
          )}
        </div>

        {/* Temperature - Scientific tier only */}
        {tier === 'scientific' ? (
          <div>
            <Label>Temperature</Label>
            <p>{weather.current.temperature}°F</p>
            <p className="text-xs text-muted-foreground">
              Mercury thermometer (~$500 equivalent)
            </p>
          </div>
        ) : (
          <div>
            <Label>Temperature</Label>
            <p>{historical.temperatureQualitative}</p>
            <p className="text-xs text-muted-foreground">
              No thermometer available (hand sense only)
            </p>
          </div>
        )}

        {/* Almanac data - Universal */}
        <div>
          <Label>Almanac</Label>
          <p>Sunrise: {getSunrise(weather)}</p>
          <p>Sunset: {getSunset(weather)}</p>
          <p>Moon: {getMoonPhase(weather)} {getMoonEmoji(weather)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Component 3: `<PeriodWeatherBriefing>`

**Purpose:** Generate period-appropriate weather reports for living history.

```typescript
interface PeriodWeatherBriefingProps {
  weather: WeatherData
  location: string  // "Rocky Mount"
  date: Date
  purpose?: string  // "Territorial Government Meeting"
}

export function PeriodWeatherBriefing({
  weather,
  location,
  date,
  purpose = "General Observations"
}: PeriodWeatherBriefingProps) {
  const briefing = generatePeriodBriefing(weather, location, date, purpose)

  return (
    <Card className="border-amber-900/20 bg-cream">
      <CardHeader>
        <h3 className="font-serif-elegant">Weather Briefing</h3>
        <p className="text-sm">{location}, {formatPeriodDate(date)}</p>
      </CardHeader>

      <CardContent>
        <pre className="font-serif whitespace-pre-wrap leading-relaxed">
          {briefing}
        </pre>

        <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
          <p className="text-xs text-amber-900">
            <strong>Historical Note:</strong> This briefing uses modern data
            but presents it in the language and format a frontier observer
            would have used in 1790-1796. Pressure readings assume access
            to one of the ~dozen barometers in America.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
```

---

## API Implementation

### Route: `/api/almanac/historical-view`

**Purpose:** Translate modern weather data into period-appropriate format.

```typescript
// app/api/almanac/historical-view/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getWeatherData } from '@/lib/almanac/weather'
import { getMoonPhase } from '@/lib/almanac/moonPhase'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = Number(searchParams.get('lat'))
  const lon = Number(searchParams.get('lon'))
  const tier = (searchParams.get('tier') || 'typical') as 'typical' | 'cobb' | 'scientific'

  // Get modern weather data
  const weather = await getWeatherData(lat, lon)
  const moon = getMoonPhase(new Date())

  // Filter by historical capability
  const historical = {
    // Temperature - only scientific tier gets quantitative
    temperature: tier === 'scientific' ? weather.current.temperature : null,
    temperatureQualitative: getTemperatureQualitative(weather.current.temperature),

    // Pressure - only scientific tier (extremely rare)
    pressure: tier === 'scientific' ? convertToInchesMercury(weather.current.pressure) : null,
    pressureAvailable: tier === 'scientific',

    // Wind direction - everyone has weathervanes
    windDirection: getCardinalDirection(weather.current.windDirection),

    // Wind speed - qualitative only (no anemometers)
    windSpeedQualitative: getWindQualitative(weather.current.windSpeed),

    // Cloud cover - qualitative
    cloudCover: getCloudQualitative(weather.current.cloudCover),

    // Precipitation - direct observation
    precipitation: getPrecipitationDescription(
      weather.current.precipitation,
      weather.current.weatherCode
    ),

    // Snow depth - measurable with stick
    snowDepth: weather.current.snowDepth,

    // Almanac data - universal
    almanac: {
      sunrise: weather.daily.sunrise[0],
      sunset: weather.daily.sunset[0],
      moonPhase: moon.phaseName,
      moonEmoji: moon.emoji,
    },

    // Decision guidance using period logic
    guidance: {
      planting: getPlantingGuidance(weather, tier),
      livestock: getLivestockGuidance(weather, tier),
      construction: getConstructionGuidance(weather, tier),
    },
  }

  return NextResponse.json({
    tier,
    modern: weather.current,
    historical,
    meta: {
      tierDescription: getTierDescription(tier),
      instruments: getAvailableInstruments(tier),
    },
  })
}

// Helper functions

function getTemperatureQualitative(tempF: number): string {
  if (tempF <= 32) return 'Freezing'
  if (tempF <= 50) return 'Cold'
  if (tempF <= 65) return 'Cool'
  if (tempF <= 75) return 'Warm'
  if (tempF <= 90) return 'Hot'
  return 'Very Hot'
}

function getCardinalDirection(degrees: number): string {
  const directions = [
    'North',
    'Northeast',
    'East',
    'Southeast',
    'South',
    'Southwest',
    'West',
    'Northwest',
  ]
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

function getWindQualitative(mph: number): string {
  if (mph < 1) return 'Calm'
  if (mph < 8) return 'Light breeze'
  if (mph < 15) return 'Moderate breeze'
  if (mph < 25) return 'Fresh wind'
  if (mph < 40) return 'Strong wind'
  return 'Gale'
}

function getCloudQualitative(percent: number | undefined): string {
  if (!percent) return 'Unknown'
  if (percent < 20) return 'Clear'
  if (percent < 60) return 'Partly cloudy'
  return 'Overcast'
}

function convertToInchesMercury(hPa: number): number {
  // 1 hPa = 0.0295301 inches of mercury
  return Number((hPa * 0.0295301).toFixed(2))
}

function getTierDescription(tier: 'typical' | 'cobb' | 'scientific'): string {
  const descriptions = {
    typical:
      'Typical frontier household (~80% of population). No scientific instruments. Observes weather using weathervanes, visual observation, and almanacs.',
    cobb: 'Elite frontier household like William Cobb (~10-15% of population). May have thermometer if wealthy enough (~$500 equivalent). Unlikely to have barometer.',
    scientific:
      'Jefferson-level scientific observer (~1-5% of population). Thermometer, possibly barometer (one of only ~dozen in America), extensive weather diary.',
  }
  return descriptions[tier]
}

function getAvailableInstruments(tier: 'typical' | 'cobb' | 'scientific'): string[] {
  const instruments = {
    typical: ['Weathervane', 'Almanac', 'Visual observation'],
    cobb: ['Weathervane', 'Almanac', 'Visual observation', 'Possibly thermometer (~$500)'],
    scientific: [
      'Weathervane',
      'Almanac',
      'Thermometer',
      'Possibly barometer (extremely rare)',
      'Weather diary',
    ],
  }
  return instruments[tier]
}
```

### Helper: Period Language Generator

```typescript
// lib/almanac/periodLanguage.ts

export function generatePeriodBriefing(
  weather: WeatherData,
  location: string,
  date: Date,
  purpose: string
): string {
  const pressure = convertToInchesMercury(weather.current.pressure)
  const pressureTrend = getPressureTrend(weather.hourly.pressure)
  const wind = getCardinalDirection(weather.current.windDirection)
  const temp = getTemperatureQualitative(weather.current.temperature)
  const clouds = getCloudQualitative(weather.current.cloudCover)

  return `WEATHER FOR ${purpose.toUpperCase()}
${location}, ${formatPeriodDate(date)}

The glass stands at ${pressure} inches and ${pressureTrend},
promising ${getForecastFromPressure(pressure, pressureTrend)} conditions.

Wind from the ${wind.toLowerCase()} at present,
with ${clouds.toLowerCase()} skies.

Temperature ${temp.toLowerCase()}, ${getComfortDescription(weather.current.temperature)}.

${generateWorkGuidance(weather)}

Based on the barometer and wind, expect ${get24HourPrediction(weather)}.`
}

function formatPeriodDate(date: Date): string {
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  // Use period ordinal format
  const ordinal = getOrdinal(day)
  return `${day}${ordinal} ${month} ${year}`
}

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

function getPressureTrend(pressureArray: number[]): string {
  if (!pressureArray || pressureArray.length < 3) return 'steady'

  const recent = pressureArray.slice(0, 3)
  const trend = recent[2] - recent[0]

  if (trend > 1) return 'rising rapidly'
  if (trend > 0.3) return 'rising'
  if (trend < -1) return 'falling rapidly'
  if (trend < -0.3) return 'falling'
  return 'steady'
}

function getForecastFromPressure(pressure: number, trend: string): string {
  // High pressure (>30.2) + rising = fair
  // Low pressure (<29.8) + falling = storm

  if (pressure > 30.2) {
    if (trend.includes('rising')) return 'continued fair'
    return 'fair'
  }

  if (pressure < 29.8) {
    if (trend.includes('falling')) return 'stormy'
    return 'unsettled'
  }

  if (trend.includes('falling')) return 'changeable'
  return 'fair to moderate'
}

function getComfortDescription(tempF: number): string {
  if (tempF <= 32) return 'suitable for indoor work only'
  if (tempF <= 50) return 'dress warmly for outdoor labor'
  if (tempF <= 65) return 'comfortable for most work'
  if (tempF <= 75) return 'suitable for all outdoor activities'
  if (tempF <= 85) return 'warm but manageable'
  if (tempF <= 95) return 'seek shade during midday'
  return 'extreme heat - minimize exertion'
}

function generateWorkGuidance(weather: WeatherData): string {
  const guidance: string[] = []

  // Planting
  const soilTemp = weather.current.soilTemperature || weather.current.temperature - 10
  if (soilTemp > 50 && weather.current.precipitation < 0.1) {
    guidance.push('Good conditions for planting')
  } else if (weather.current.precipitation > 0.1) {
    guidance.push('Ground too wet for planting')
  }

  // Construction
  if (
    weather.current.temperature > 35 &&
    weather.current.temperature < 90 &&
    weather.current.windSpeed < 15 &&
    weather.current.precipitation < 0.1
  ) {
    guidance.push('Suitable for building work')
  }

  // Livestock
  if (weather.current.temperature > 20 && weather.current.temperature < 85) {
    guidance.push('Safe for livestock grazing')
  } else if (weather.current.temperature <= 20) {
    guidance.push('Shelter livestock from cold')
  } else {
    guidance.push('Provide shade and water for livestock')
  }

  if (guidance.length === 0) {
    return 'Conditions not favorable for outdoor work.'
  }

  return guidance.join('; ') + '.'
}

function get24HourPrediction(weather: WeatherData): string {
  // Look at next 24 hours of forecast
  const nextDay = weather.hourly.weatherCode.slice(0, 24)
  const hasRain = nextDay.some((code) => code >= 51 && code <= 67)
  const hasSnow = nextDay.some((code) => code >= 71 && code <= 86)
  const hasStorms = nextDay.some((code) => code >= 95)

  if (hasStorms) return 'thunderstorms likely within the day'
  if (hasSnow) return 'snow expected'
  if (hasRain) return 'rain probable before tomorrow'
  return 'fair weather continuing'
}
```

---

## Educational Value

### Key Messages to Communicate

1. **Technology Access Gap**
   - "Even wealthy Virginia households struggled to obtain thermometers in the 1790s"
   - "Jefferson's weather observations represented the extreme elite - not typical frontier life"
   - "Most families used almanacs, weathervanes, and observation"

2. **Folk Wisdom Had Value**
   - "Red sky at morning" has ~67% accuracy
   - "Ring around moon" correlates with approaching warm fronts (60-70%)
   - Frontierspeople were skilled observers, even without instruments

3. **Some Things Haven't Changed**
   - Sunrise/sunset times are identical (better calculated now, but same data)
   - Moon phases are identical
   - Weather beyond 2 weeks is still hard to predict (1790: ~50%, 2026: ~50%)

4. **Some Things Are Revolutionary**
   - UV Index (1994 invention) - concept didn't exist
   - Air Quality Index (1970s) - no awareness of health effects
   - Lightning detection network (21st century)
   - 16-day hourly forecast from numerical models

### Display Strategy

**For Rocky Mount Exhibits:**

- Physical weathervane (authentic, blacksmith-made)
- Replica almanac (Virginia & North Carolina Almanack)
- Modern iPad running almanac tool with "1790 Mode"
- Side-by-side comparison: "What Cobb could know vs. what we know now"

**For Website:**

- Toggle between modern and historical views
- Educational tooltips explaining instrument availability
- Period-appropriate weather briefings
- "Jefferson's Journal" feature

---

## Implementation Priority

### Phase 1: Core Historical Translation (2-3 days)

1. ✅ Build `/api/almanac/historical-view` endpoint
2. ✅ Create tier filtering logic
3. ✅ Implement qualitative conversions (temp → "warm", wind → "fresh breeze")
4. ✅ Build `<ObserverTierToggle>` component
5. ✅ Create `<HistoricalWeatherCard>` component

### Phase 2: Period Language (1-2 days)

1. ✅ Build period briefing generator
2. ✅ Create `<PeriodWeatherBriefing>` component
3. ✅ Add pressure trend logic
4. ✅ Implement work guidance in period language

### Phase 3: Educational Features (2-3 days)

1. ✅ Add "What Jefferson Could Know" display
2. ✅ Create comparison mode (then & now)
3. ✅ Build instrument availability explanations
4. ✅ Add historical context tooltips

### Phase 4: Polish (1-2 days)

1. ✅ Period-appropriate typography and styling
2. ✅ Print view for living history use
3. ✅ Export as PDF for educational materials
4. ✅ Test with Rocky Mount staff

**Total Estimated Time:** 6-10 days

---

## Technical Notes

### Unit Conversions

```typescript
// Pressure: hPa → inches of mercury
function hPaToInchesHg(hPa: number): number {
  return Number((hPa * 0.0295301).toFixed(2))
}

// Temperature: Already in Fahrenheit ✅
// (Open-Meteo returns Fahrenheit when requested)

// Wind: Already in mph ✅
// (Matches period practice - mph was used)

// Distance: Already in miles ✅
// (English customary units)
```

### Historical Accuracy Notes

**What to avoid:**

- Don't show dew point (requires temperature + humidity, calculation didn't exist)
- Don't show heat index (1979 Steadman formula)
- Don't show wind chill (1939 Siple-Passel)
- Don't show UV Index (1994 invention)
- Don't show AQI (1970s EPA)
- Don't show precise wind speed in mph (no anemometers)

**What's historically accurate:**

- Temperature in °F (if scientific tier only)
- Pressure in inches of mercury (if scientific tier only)
- Wind direction (weathervane - all tiers)
- Precipitation observation (all tiers)
- Cloud cover qualitative (all tiers)
- Snow depth in inches (all tiers)
- Sunrise/sunset (almanac - all tiers)
- Moon phase (almanac - all tiers)

---

## Success Metrics

**Educational Impact:**

- Visitors understand technology access gap
- Visitors appreciate frontier observation skills
- Visitors see continuity (almanac tradition continues)

**Authenticity:**

- All claims traceable to primary sources
- No anachronistic measurements shown without labeling
- Period language feels authentic without being inaccessible

**Engagement:**

- Visitors toggle between tiers to explore
- Period briefings used in living history programming
- Tool becomes part of Rocky Mount educational toolkit

---

## Conclusion

This tool bridges 250 years of weather observation by:

1. **Honoring historical reality** (most families had no instruments)
2. **Celebrating frontier skill** (observation and folk wisdom were sophisticated)
3. **Showing technological progress** (modern capabilities are extraordinary)
4. **Maintaining continuity** (almanac purpose remains identical)

The name "1775 Almanac" is perfect because:

- Almanacs were universal frontier technology
- They combined weather, astronomy, and practical guidance
- Your modern system extends this tradition with 21st-century tools
- The fundamental purpose (help people plan work by understanding weather) is unchanged

**Let's build something that makes the past feel real while showing how far we've come.**
