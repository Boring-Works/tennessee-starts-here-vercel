# The 1775 Almanac - Complete System Audit

**Audit Date:** January 29, 2026
**Project:** Tennessee Starts Here
**Location:** `/app/(almanac)/almanac/`

---

## Executive Summary

The Tennessee Starts Here Almanac is a sophisticated agricultural weather intelligence system with:

- **50 UI Components** (weather display, forecasting, alerts, intelligence)
- **5 External API Routes** (Weather, Air Quality, NWS Alerts, Stream Levels, Precipitation Radar)
- **19 Calculation Files** implementing 50+ scientific algorithms
- **200+ Individual Data Points** tracked and computed
- **4 Proprietary Task Scores** (farmer-focused workability indices, 1-10 scale)
- **100+ User-Facing Measurements** displayed across the interface

---

## Table of Contents

1. [Measurements & Data Points](#measurements--data-points)
2. [API Routes & External Data Sources](#api-routes--external-data-sources)
3. [Calculation Engine](#calculation-engine)
4. [Component Inventory](#component-inventory)
5. [Data Model & Types](#data-model--types)
6. [Export Capabilities](#export-capabilities)
7. [Key Findings](#key-findings)

---

## Measurements & Data Points

### Weather Observations (51 base metrics)

#### Current Conditions (17 fields)

- **Temperature** (°F) - Current air temperature
- **Feels Like** (°F) - Wind chill/heat index adjusted
- **Humidity** (%) - Relative humidity (0-100)
- **Precipitation** (inches) - Current precipitation amount
- **Weather Code** (0-99) - WMO standard classification
- **Wind Speed** (mph) - Current wind speed
- **Wind Direction** (°) - 0-360 degrees
- **Wind Gusts** (mph) - Peak gust speed
- **Pressure** (hPa) - Barometric pressure
- **Soil Temperature** (°F) - 6cm depth
- **Snow Depth** (inches) - Current accumulation
- **Cloud Cover** (%) - Sky coverage
- **Visibility** (meters) - Distance visibility
- **Dew Point** (°F) - Condensation temperature
- **UV Index** (0-11+) - Solar radiation intensity
- **Is Day** (boolean) - Daytime flag

#### Hourly Forecast (14 arrays × 384 hours = 16 days)

- Temperature, Feels Like, Precipitation, Precip Probability
- Weather Code, Snowfall, Snow Depth, Cloud Cover
- Visibility, Wind Speed, Wind Gusts, Dew Point
- UV Index, Freezing Level Height

#### Daily Forecast (17 arrays × 16 days)

- Temperature Max/Min, Feels Like Max/Min
- Precipitation Sum/Probability/Hours
- Weather Code, Sunrise/Sunset, Daylight Duration
- Snowfall Sum, Wind Speed Max, Wind Gusts Max
- Wind Direction Dominant, UV Index Max

---

### Proprietary Task Scores (4 indices + 1 composite)

#### 1. Sower's Index (Gardening & Planting)

**Score:** 1-10 with label (Perfect/Good/Fair/Poor/Avoid)

**Calculation Factors:**

- Soil temperature (40% weight) - Ideal: 50-85°F
- Air temperature (20%) - Blocks: <35°F frost, >95°F heat
- Precipitation/wet ground (20%) - Blocks: >0.5" current, >70% probability
- Wind speed (10%) - Penalty: >15 mph
- Forecast warnings (10%) - Snow in next 3 days

**Blocking Conditions:**

- Ice (score 1)
- Snow on ground (score 1)
- Frozen ground (score 2)
- Active snowfall (score 2)

**Output:** Score integer + Label string + Instruction text

---

#### 2. Shepherd's Watch (Pets, Kids & Livestock)

**Score:** 1-10 (AQI-adjusted)

**Calculation Factors:**

- **Temperature Humidity Index (THI)** (35%) - Livestock stress
  - ≥99: Emergency (-6)
  - ≥89: Dangerous (-4)
  - ≥79: Heat stress (-2)
  - ≥72: Warm (-1)
- **Wind Chill** (25%) - Cold stress
  - <0°F: Frostbite danger (-5)
  - <15°F: Limited exposure (-3)
  - <25°F: Coats needed (-2)
  - <32°F: Watch small breeds (-1)
- **Snow/Ice** (20%)
  - > 4" snow: -3 (small dogs struggle)
  - > 1" snow: -1 (check paws)
  - Ice: Score capped at 3 (slip hazard)
- **Wind gusts** (10%) - >35 mph: -2
- **Heat stress** (10%) - Direct temperature impact

**Special Logic:**

- Ice is risky but not blocking (allows bathroom breaks)
- AQI adjustment caps score if air quality poor

**Output:** Score + Safety instruction

---

#### 3. Keeper's Gauge (Property Maintenance)

**Score:** 1-10

**Calculation Factors:**

- **Temperature thresholds** (40%)
  - <35°F: -5 (no exterior finishes)
  - <40°F: -4 (repairs only, no paint/caulk)
  - <50°F: -3 (limited products work)
- **Dew Point Spread** (30%) - Paint/finish moisture
  - <3°F spread: -4 (paint will fail)
  - <5°F spread: -2 (midday only)
  - Humidity >85%: -2 (extended cure)
- **Precipitation** (15%)
  - > 0.1": -5 (all exterior work on hold)
  - > 70% chance: -3 (finish early)
- **Wind gusts** (10%) - OSHA ladder safety
  - > 40 mph: -5 (no ladder work)
  - > 30 mph: -3 (stay off ladders)
  - > 20 mph: -2 (low work only)
- **Ice/Snow** (5%)

**Blocking Conditions:**

- Ice (score 1 - ladders deadly)
- Snow (score 1)
- Active snow (score 2)

**Industry Standards Applied:**

- Paint/caulk requires ≥50°F
- Dew point spread ≥5°F (industry standard)
- OSHA ladder wind limits

**Output:** Score + Work window guidance

---

#### 4. Builder's Grade (Construction & Heavy Work)

**Score:** 1-10

**Calculation Factors:**

- **Cold/Heat Extremes** (35%) - OSHA protocols
  - Wind chill <0°F: -5 (site closed, frostbite)
  - <20°F: -4 (OSHA protocols, limited ops)
  - <32°F: -3 (concrete won't cure)
  - Temp <40°F: -2 (ACI concrete protection)
  - ≥115°F: -5 (site closed)
  - ≥103°F: -4 (early AM only)
  - ≥91°F: -2 (water breaks)
- **Precipitation** (25%)
  - > 0.25": -4 (site suspended)
  - > 0.1": -2 (covered work only)
- **Wind Gusts** (20%) - Crane operations
  - > 45 mph: -5 (cranes down)
  - > 35 mph: -3 (no crane work)
- **Snow/Ice** (15%)
  - > 4" snow: -5 (clear before ops)
  - > 1" snow: -3 (traction issues)
  - Ice: Score 2 (equipment slides)
- **Frozen Ground** (5%) - -2 (no excavation)

**Standards Applied:**

- ACI concrete protection <40°F
- OSHA heat illness thresholds
- OSHA cold exposure protocols
- Crane wind limits

**Output:** Score + Site operation guidance

---

#### 5. Overall Workability (Composite Score)

**Score:** 1-10

**Formula:**

```
Overall = (Shepherd × 0.40) + (Sower × 0.30) + (Keeper × 0.20) + (Builder × 0.10)
```

**Labels:**

- 9-10: "Good Day for Work" (green)
- 7-8: "Fair Conditions" (yellow)
- 5-6: "Difficult Conditions" (orange)
- 1-4: "Avoid Outdoor Work" (red)

**Output:** Composite score + Status label

---

### Environmental Monitoring (30+ metrics)

#### Air Quality Index (5 fields)

- **AQI Value** (0-500+) - Numerical index
- **AQI Level** - Good/Moderate/Sensitive/Unhealthy/Very Unhealthy/Hazardous
- **Dominant Pollutant** - PM2.5, PM10, O3, NO2, SO2, CO
- **Station Name** - Reporting station
- **Timestamp** - Observation time

**AQI Ranges:**

- 0-50: Good (green)
- 51-100: Moderate (yellow)
- 101-150: Unhealthy for Sensitive Groups (orange)
- 151-200: Unhealthy (red)
- 201-300: Very Unhealthy (purple)
- 301+: Hazardous (maroon)

---

#### National Weather Service Alerts (9 fields per alert)

- **Alert ID** - Unique identifier
- **Event Type** - e.g., "Severe Thunderstorm Warning"
- **Severity** - Extreme/Severe/Moderate/Minor
- **Urgency** - Immediate/Expected/Future/Past/Unknown
- **Headline** - Alert summary
- **Description** - Full details
- **Instruction** - Recommended actions
- **Area Description** - Geographic scope
- **Onset/Expires** - Start and end times

**Fire Weather Detection:**

- Flags: Red Flag Warning, Fire Weather Watch, Extreme Fire Danger, Fire Warning

---

#### Lightning Detection (5 fields)

- **Strike Count** - Strikes within radius (last hour)
- **Nearest Distance** (miles) - Closest strike
- **Strike Direction** - 8-point compass bearing
- **Alert Level** - Danger/Warning/Watch/null
- **Individual Strikes** - Array with lat, lon, timestamp, distance

**Alert Thresholds:**

- ≤10 miles: DANGER (immediate shelter)
- ≤20 miles: WARNING (prepare shelter)
- ≤50 miles: WATCH (monitor conditions)

**Data Source:** Blitzortung.org community lightning network

---

#### Stream Levels - USGS Gauges (7 fields)

- **Gage Height** (feet) - Water surface elevation
- **Streamflow** (cfs) - Cubic feet per second discharge
- **Status** - Flood/High/Normal/Low/Drought
- **Percentile** - Historical flow comparison (0-100)
- **Station Name** - Stream/gauge name
- **USGS Site Code** - Official identifier
- **Distance** (miles) - From user location

**Status Classification:**

- ≥90th percentile: Flood Stage
- 75-89th: Above Normal
- 25-74th: Normal
- 10-24th: Below Normal
- <10th: Much Below Normal

**Regional Stations (Sullivan County, TN):**

1. South Fork Holston River at Bluff City (03473000)
2. Holston River near Rogersville (03474000)
3. Watauga River at Johnson City (03471500)
4. South Holston River near Damascus (03469000)
5. North Fork Holston River near Gate City (03475000)

---

#### Drought Monitoring (4 fields)

- **Drought Level** - None/D0/D1/D2/D3/D4
- **Label** - Human-readable level name
- **Percent Area** - % of county affected
- **Last Updated** - Date of last USDM update

**Drought Levels:**

- **None:** No drought
- **D0:** Abnormally Dry (short-term dryness)
- **D1:** Moderate Drought (crop/pasture damage)
- **D2:** Severe Drought (crop losses, water shortages)
- **D3:** Extreme Drought (major losses)
- **D4:** Exceptional Drought (widespread losses)

**Data Source:** US Drought Monitor (weekly updates, Thursdays 8am ET)

---

### Astronomical Data (9 metrics)

#### Moon Phase (5 fields)

- **Phase** (0-1 scale) - 0 = New Moon, 0.5 = Full Moon
- **Illumination** (0-100%) - Percentage lit
- **Phase Name** - New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Last Quarter, Waning Crescent
- **Phase Emoji** - 🌑🌒🌓🌔🌕🌖🌗🌘
- **Planting Guidance** - Crop type recommendations

**Moon Phase Planting Rules:**

- **New Moon** → Plant leafy crops (lettuce, spinach, cabbage)
- **Waxing/First Quarter** → Plant fruiting crops (tomatoes, peppers, beans)
- **Full Moon** → Harvest & preserve (sap is high)
- **Waning/Last Quarter** → Plant root crops (potatoes, carrots, beets)

**Algorithm:** SunCalc library (Jean Meeus 1991 + US Naval Observatory data)

---

#### Solar Data (4 fields)

- **Sunrise** (ISO 8601) - Morning sunrise time
- **Sunset** (ISO 8601) - Evening sunset time
- **Daylight Duration** (seconds) - Total daylight
- **Day/Night Status** (boolean) - Current time classification

---

### Agricultural Intelligence (25+ metrics)

#### Soil & Plant Health (6 fields)

- **Soil Temperature** (°F) - 6cm depth from Open-Meteo
- **VPD (Vapor Pressure Deficit)** (kPa) - Plant transpiration stress
  - Value: Precise to 0.01 kPa
  - Level: Low/Optimal/High/Danger
  - Recommendation: Actionable guidance text
- **GDD (Growing Degree Days)** - Accumulated since March 1
- **Daily GDD Contribution** - Today's incremental addition
- **Pest Emergence Alerts** - Active pests based on GDD thresholds
- **Next Pest Threshold** - Countdown to next pest emergence

**VPD Calculation:**

1. Saturation Vapor Pressure (Tetens equation): `0.6108 × exp((17.27 × TempC) / (TempC + 237.3))`
2. VPD = `SVP - (SVP × humidity/100)`

**VPD Ranges:**

- <0.4 kPa: Low (mold/disease risk, poor transpiration)
- 0.4-1.2 kPa: Optimal (ideal growth conditions)
- 1.2-1.6 kPa: High (rapid transpiration, frequent watering)
- > 1.6 kPa: Danger (plant stress, wilting risk)

**GDD Calculation:**

- Formula: `((Tmax + Tmin) / 2) - BaseTemp` (BaseTemp = 50°F)
- Accumulated daily from March 1 to October 31
- Used for pest emergence prediction (e.g., Japanese Beetles at 970 GDD)

---

#### Frost/Freeze Tracking (5 fields)

- **Days Until Last Spring Frost** - Countdown to April 15 (Sullivan County)
- **Days Since First Fall Frost** - Count from October 15
- **Freeze Risk Hours** - Countdown if freeze within 12 hours
- **Frost Risk Flag** - Boolean (humidity >80%, temp 32-36°F)
- **Growing Season Progress** (%) - Percentage through safe season

**Frost Dates (Sullivan County, TN - Zone 7a):**

- Last Spring Frost: April 15 (±14 days variance)
- First Fall Frost: October 15 (±14 days variance)
- Growing Season: ~183 days

---

#### Native Pulse - Seed Stratification Tracker (5 fields)

- **Season Progress** (0-100%) - Cycle completion percentage
- **Status** - Dormant/Active Stratification/Germination Trigger/Growing Season
- **Status Icon** - Emoji representation
- **Color Code** - Tailwind CSS class
- **Actionable Tip** - Species-specific guidance

**Stratification Seasons:**

- **Dec-Feb:** Active Stratification (28-40°F cold moist period)
- **Mar-Apr:** Germination Trigger (>55°F + precipitation)
- **May-Aug:** Growing Season (maintenance phase)
- **Sep-Nov:** Dormancy Preparation (seed collection)

**Heritage Context:** Tracks native Tennessee species suitable for 1775-era gardens

---

#### Spring Phenology (5 fields)

- **Spring Status** - Dormant/Approaching/Spring/Summer
- **Days to First Leaf** - Countdown to leaf-out
- **Days to First Bloom** - Countdown to flower bloom
- **Spring Anomaly** - Early/On-schedule/Late
- **Anomaly Days** - Days ahead/behind normal (±5-10)

**Phenology Dates (Sullivan County, TN - Zone 7a):**

- First Leaf: ~March 20 (day 79, ±10 days)
- First Bloom: ~April 5 (day 95, ±12 days)

**Data Source:** USA National Phenology Network 30-year averages

---

### Farmer's Memory - Historical Intelligence (14 metrics)

#### Historical Comparison (6 fields)

- **Normal High** (°F) - 30-year average high for this date
- **Normal Low** (°F) - 30-year average low
- **Record High** - All-time high (value + year)
- **Record Low** - All-time low (value + year)
- **Today vs Normal** - Temperature difference (°F)
- **Anomaly Description** - 8 categories:
  - "Much warmer than normal" (>15°F above)
  - "Warmer than normal" (8-15°F above)
  - "Slightly above normal" (3-8°F above)
  - "Near normal" (±3°F)
  - "Slightly below normal" (3-8°F below)
  - "Cooler than normal" (8-15°F below)
  - "Much cooler than normal" (>15°F below)

**Data Source:** NOAA climate normals for Sullivan County, TN (1991-2020, KTRI airport)

**Daily Adjustment Algorithm:**

- Sine wave approximation within month
- Formula: `sin(progress × π) × monthlySwing`
- Swing: 2°F (winter) / 3°F (other months)

---

#### Pattern Matching (4 fields)

Eight historical weather patterns detected with probability scoring:

1. **Pre-Frost Setup** (78% probability, 2,341 samples)
   - Condition: Oct-Apr, temp <45°F, humidity <50%, wind <5 mph
   - Outcome: "Frost likely within 24 hours"

2. **Rain Approaching** (72% probability, 3,156 samples)
   - Condition: Humidity >70%, pressure <29.8 inHg
   - Outcome: "Rain likely in 12-24 hours"

3. **Clearing Trend** (81% probability, 2,876 samples)
   - Condition: Humidity <60%, pressure >30.1 inHg
   - Outcome: "Fair weather for 2-3 days"

4. **Storm Front** (68% probability, 1,543 samples)
   - Condition: Mar-Sep, pressure <29.7 inHg, humidity >75%, wind >10 mph
   - Outcome: "Thunderstorms possible in 6-12 hours"

5. **Heat Dome** (75% probability, 987 samples)
   - Condition: Jun-Aug, temp >85°F, humidity >60%, pressure >30.0 inHg
   - Outcome: "Hot/humid persisting 3+ days"

6. **Cold Air Outbreak** (82% probability, 1,234 samples)
   - Condition: Nov-Mar, temp <35°F, pressure >30.3 inHg, wind >15 mph
   - Outcome: "Arctic air, temps 10-20°F below normal"

7. **Spring Transition** (71% probability, 654 samples)
   - Condition: Mar-Apr, temp 55-70°F, humidity >50%
   - Outcome: "Highly variable, 20°F+ swings possible"

8. **Indian Summer** (74% probability, 432 samples)
   - Condition: Oct-Nov, temp >70°F, humidity <55%, wind <10 mph
   - Outcome: "Warm spell 3-5 days before return to normal"

**Per Pattern Output:**

- **Description** - Condition explanation
- **Probability** (%) - Success rate
- **Sample Size** - Historical occurrence count
- **Explanation** - Why pattern is relevant

---

#### Validated Folk Wisdom (4 fields)

Seven frontier proverbs tested against historical data:

1. **"Red sky at night, sailor's delight. Red sky at morning, sailors take warning."**
   - Correlation: 67% (3,421 samples)
   - Explanation: Accurate for frontal system movement

2. **"When the dew is on the grass, rain will never come to pass."**
   - Correlation: 72% (1,856 samples)
   - Explanation: Dew forms under high pressure systems

3. **"A ring around the moon means rain will come soon."**
   - Correlation: 65% (987 samples)
   - Explanation: Cirrus clouds indicate approaching front

4. **"When leaves show their undersides, be sure that rain betides."**
   - Correlation: 58% (654 samples)
   - Explanation: Pre-storm wind patterns flip leaves

5. **"Clear moon, frost soon."** ✓ HIGHEST ACCURACY
   - Correlation: 81% (2,134 samples)
   - Explanation: Clear skies allow radiative cooling

6. **"When smoke descends, good weather ends."**
   - Correlation: 73% (1,234 samples)
   - Explanation: Dropping pressure traps smoke low

7. **"If March comes in like a lion, it goes out like a lamb."**
   - Correlation: 51% (125 samples) ❌ LOWEST ACCURACY
   - Explanation: Not supported by data, likely confirmation bias

**Per Proverb Output:**

- **Text** - Full proverb
- **Correlation** (%) - Accuracy percentage
- **Sample Size** - Historical validation cases
- **Explanation** - Scientific basis or refutation

---

### Forecasting & Predictions (12 outputs)

#### Next Major Change (6 fields)

Detects next significant weather event within 24 hours:

**Change Types:**

1. **Freeze** - Temperature crossing below 32°F
2. **Thaw** - Temperature rising above 32°F
3. **Precip Start** - Precipitation probability rising to ≥20%
4. **Precip End** - Precipitation ending
5. **Wind Increase** - Gusts rising to >25 mph
6. **Stable** - No major changes expected

**Output Fields:**

- **Change Type** - Category from above
- **Hours Until** - Time until change
- **Time String** - Formatted time of change
- **Headline** - Color-coded summary
- **Subtext** - Contextual explanation
- **Severity Icon** - Critical/Warning/Info

**Severity Encoding:**

- **Critical** (red) - Freeze within 2 hours
- **Warning** (amber) - Precip/wind change within 2 hours
- **Info** (neutral) - Changes beyond 2 hours

---

#### Precipitation Timing - Radar-Based (5 fields)

Dark Sky-style "rain in X minutes" prediction:

**Status Types:**

- **Approaching** - Precip arriving soon (provides minutes until)
- **Clearing** - Currently raining, will end soon (provides clearing time)
- **Continues** - Rain ongoing, expected to persist
- **Dry** - No precipitation expected
- **Unknown** - Insufficient radar data

**Output Fields:**

- **Type** - Status from above
- **Message** - Human-readable summary
- **Minutes Until** - Time until rain starts (if approaching)
- **Clearing Time** - When rain ends (if clearing)
- **Icon** - Visual indicator

**Technology:**

- RainViewer API radar tiles
- Web Mercator projection tile sampling
- Color-to-intensity mapping
- 5-minute frame intervals
- Nowcast range: 30-60 minutes

---

#### Tomorrow Preview (5 fields)

- **High Temperature** (°F)
- **Low Temperature** (°F)
- **Precipitation Chance** (%)
- **Weather Icon** - WMO code matched
- **Actionable Outlook** - Recommendation examples:
  - "Rain likely — plan indoor work"
  - "Hot — work early or late"
  - "Frost risk — protect plants"
  - "Good conditions expected"

---

## API Routes & External Data Sources

### 1. Weather API

**Route:** `/api/weather`
**External Service:** Open-Meteo API
**URL:** `https://api.open-meteo.com/v1/forecast`
**Authentication:** None (public, free tier)

**Request Parameters:**

- `lat` (latitude, -90 to 90, rounded to 2 decimals)
- `lon` (longitude, -180 to 180, rounded to 2 decimals)
- Default location: Rocky Mount, TN

**Data Fetched:**

- **Current:** 17 fields (temp, humidity, wind, pressure, soil temp, snow, clouds, visibility, dew point, UV, day/night)
- **Hourly:** 14 arrays × 384 hours (temp, apparent temp, precip prob/amount, weather code, snowfall, snow depth, clouds, visibility, wind speed/gusts, dew point, UV, freezing level)
- **Daily:** 17 arrays × 18 days (16 future + 2 past) (temp max/min, apparent temp max/min, precip sum/prob/hours, weather code, sunrise/sunset, daylight duration, snowfall, wind max/gusts/direction, UV max)

**Unit Conversions:**

- Snow depth: meters → inches (×39.3701)
- Snowfall: cm → inches (×0.393701)
- Temperature: Fahrenheit (API configured)
- Wind: mph (API configured)

**Caching:**

- Revalidate: 300 seconds (5 minutes)
- Cache-Control: `public, s-maxage=300, stale-while-revalidate=600`

---

### 2. Air Quality API

**Route:** `/api/air-quality`
**External Service:** AQICN (World Air Quality Index Project)
**URL:** `https://api.waqi.info/feed/geo:lat;lon/`
**Authentication:** Required (`AQICN_API_KEY` environment variable)

**Data Fetched:**

- **AQI** - Numerical value (0-500+)
- **Status** - API response status
- **City/Station Name** - Reporting location
- **Dominant Pollutant** - pm25, pm10, o3, no2, so2, co
- **Individual Pollutants** (iaqi):
  - PM2.5 (μg/m³)
  - PM10 (μg/m³)
  - O3 (ppb)
  - NO2 (ppb)
  - SO2 (ppb)
  - CO (ppm)
- **Forecast** (optional) - 6-day forecast with min/avg/max

**Transformations:**

- AQI to Level mapping (6 categories: good → hazardous)
- Pollutant code translation

**Caching:**

- Revalidate: 900 seconds (15 minutes)

---

### 3. NWS Alerts API

**Route:** `/api/nws-alerts`
**External Service:** National Weather Service API
**URL:** `https://api.weather.gov/alerts`
**Authentication:** None (requires User-Agent header)

**Query Parameters:**

- `?point=lat,lon&status=actual`

**Data Fetched (GeoJSON):**

- **Alert Properties:** id, event, severity, urgency, headline, description, instruction, onset, expires, status, areaDesc

**Transformations:**

- Active filtering (removes expired alerts)
- Status filtering (only "Actual" alerts)
- Severity sorting (Extreme → Severe → Moderate → Minor)
- Fire weather detection (flags Red Flag Warning, Fire Weather Watch, etc.)

**Caching:**

- Revalidate: 300 seconds (5 minutes)

---

### 4. Stream Levels API

**Route:** `/api/stream-levels`
**External Service:** USGS Water Services API
**URL:** `https://waterservices.usgs.gov/nwis/iv/`
**Authentication:** None (public)

**Pre-selected Stations (Sullivan County, TN):**

1. 03473000 - South Fork Holston River at Bluff City
2. 03474000 - Holston River near Rogersville
3. 03471500 - Watauga River at Johnson City
4. 03469000 - South Holston River near Damascus
5. 03475000 - North Fork Holston River near Gate City

**Data Fetched:**

- **Parameter 00065:** Gage Height (feet)
- **Parameter 00060:** Streamflow (cubic feet per second)
- Site code, site name, timestamp

**Selection Logic:**

- Finds nearest station within 50 miles using Haversine formula
- Earth radius: 3,959 miles

**Status Classification:**

- > 12 ft: Flood (95th percentile)
- > 8 ft: High (80th percentile)
- > 2 ft: Normal (50th percentile)
- > 1 ft: Low (20th percentile)
- ≤1 ft: Drought (5th percentile)

**Caching:**

- Revalidate: 900 seconds (15 minutes)

---

### 5. Precipitation Radar API

**Route:** `/api/precipitation-radar`
**External Service:** RainViewer API
**URL:** `https://api.rainviewer.com/public/weather-maps.json`
**Authentication:** None (public)

**Data Fetched:**

- **Version** - API version
- **Generated** - Data timestamp
- **Nowcast** - Array of radar maps (path, time, radar availability)
- **Satellite** - Satellite imagery maps
- **Animated Weather** - Animated map overlays

**Usage:**

- No transformation (passes through JSON)
- Frontend builds tile URLs for map rendering
- Enables radar-based precipitation timing

**Caching:**

- Revalidate: 300 seconds (5 minutes)

---

## Calculation Engine

### Core Calculation Files (19 files)

#### 1. `taskScores.ts` - Primary Scoring Engine

**Scientific Formulas Implemented:**

##### Heat Index (NOAA Rothfusz Regression)

```
When T ≥ 80°F:
HI = -42.379 + 2.04901523×T + 10.14333127×RH
     - 0.22475541×T×RH - 6.83783×10⁻³×T²
     - 5.481717×10⁻²×RH² + 1.22874×10⁻³×T²×RH
     + 8.5282×10⁻⁴×T×RH² - 1.99×10⁻⁶×T²×RH²

Where: T = Temperature (°F), RH = Relative Humidity (%)
```

##### Wind Chill (NWS Post-2001 Formula)

```
When T < 50°F AND Wind ≥ 3 mph:
WC = 35.74 + 0.6215×T - 35.75×V^0.16 + 0.4275×T×V^0.16

Where: T = Temperature (°F), V = Wind Speed (mph)
```

##### Dew Point (Magnus-Tetens Approximation, Sonntag 1990)

```
Step 1: Convert F to C: Tc = (T - 32) × 5/9
Step 2: γ(T,RH) = ln(RH/100) + (17.625×Tc)/(243.04+Tc)
Step 3: Td = (243.04×γ) / (17.625 - γ)
Step 4: Convert back to F: Td_F = Td × 9/5 + 32

Where: T = Temperature (°F), RH = Relative Humidity (%)
```

##### Temperature Humidity Index (THI) - Livestock Stress

```
THI = (1.8×Tc + 32) - ((0.55 - 0.0055×RH) × (1.8×Tc - 26))

Where: Tc = Temperature (°C), RH = Relative Humidity (%)

Stress Levels:
< 72: No stress
72-79: Mild stress (water/shade needed)
79-89: Moderate stress (cooling measures)
89-99: Severe stress (limit activity)
≥ 99: Emergency (no outdoor activity)
```

**Extended Metrics Calculated:**

- Winter condition flags (hasSnowOnGround, hasIceRisk, isActivelySnowing, isFrozenGround)
- Winter severity classification (none/light/moderate/severe)
- Ground condition assessment (clear/wet/snowy/icy/frozen)
- Forecast warnings (snow in next 3 days, heavy precip soon)

---

#### 2. `weather.ts` - Data Transformation

Converts Open-Meteo API responses to internal WeatherData format with unit conversions.

---

#### 3. `moonPhase.ts` - Astronomical Calculations

**Library:** SunCalc (Jean Meeus 1991 + US Naval Observatory algorithms)

**Moon Phase Segmentation:**

```
Phase 0.00-0.0625: New Moon 🌑
Phase 0.0625-0.1875: Waxing Crescent 🌒
Phase 0.1875-0.3125: First Quarter 🌓
Phase 0.3125-0.4375: Waxing Gibbous 🌔
Phase 0.4375-0.5625: Full Moon 🌕
Phase 0.5625-0.6875: Waning Gibbous 🌖
Phase 0.6875-0.8125: Last Quarter 🌗
Phase 0.8125-1.00: Waning Crescent 🌘
```

**Sun Calculations:**

- Sunrise/sunset times
- Golden hour start/end
- Day/night determination

---

#### 4. `farmerMemory.ts` - Historical Intelligence

**Historical Climate Normals:**

- NOAA 30-year normals (1991-2020) for Sullivan County, TN
- Monthly averages: avgHigh, avgLow, avgPrecip
- Records: recordHigh/Low with years

**Daily Adjustment Algorithm:**

```
Sine wave approximation:
adjustment = sin(dayProgress × π) × monthlySwing

Where:
dayProgress = currentDay / daysInMonth
monthlySwing = 2°F (winter) or 3°F (other months)
```

**Pattern Matching:**
8 patterns with probability scoring based on temperature, humidity, pressure, wind, and month.

**Proverb Validation:**
7 frontier sayings tested with correlation percentages and sample sizes.

---

#### 5. `vpd.ts` - Vapor Pressure Deficit

**Saturation Vapor Pressure (Tetens Equation):**

```
SVP = 0.6108 × exp((17.27 × Tc) / (Tc + 237.3))

Where: Tc = Temperature in Celsius
Output: SVP in kPa
```

**VPD Calculation:**

```
VPD = SVP - (SVP × (humidity / 100))

Output: VPD in kPa (rounded to 0.01)
```

**Classification:**

- <0.4 kPa: Low (mold risk)
- 0.4-1.2 kPa: Optimal (ideal growth)
- 1.2-1.6 kPa: High (water needed)
- > 1.6 kPa: Danger (plant stress)

---

#### 6. `lightning.ts` - Strike Detection & Safety

**Haversine Distance Formula:**

```
a = sin²(Δφ/2) + cos(φ1) × cos(φ2) × sin²(Δλ/2)
c = 2 × atan2(√a, √(1−a))
distance = R × c

Where:
φ = latitude (radians)
λ = longitude (radians)
R = Earth radius (3,959 miles)
```

**Compass Bearing:**

```
bearing = atan2(
  sin(Δλ) × cos(φ2),
  cos(φ1) × sin(φ2) - sin(φ1) × cos(φ2) × cos(Δλ)
)

Converted to 8-point compass (N, NE, E, SE, S, SW, W, NW)
```

---

#### 7. `precipitationTiming.ts` - Radar Analysis

**Web Mercator Projection (EPSG:3857):**

```
For zoom level 8:
x_tile = ((lon + 180) / 360) × 2^8
y_tile = ((1 - log(tan(lat) + sec(lat)) / π) / 2) × 2^8

Pixel within 256×256 tile:
pixel_x = floor((x_tile - floor(x_tile)) × 256)
pixel_y = floor((y_tile - floor(y_tile)) × 256)
```

**Radar Intensity Mapping:**

- Purple/magenta: 90-100 (extreme)
- Red: 70-90 (heavy)
- Orange: 50-70 (moderate-high)
- Yellow: 30-50 (moderate)
- Green: 10-30 (light)

---

#### 8. `phenology.ts` - Spring Timing

**Key Dates (Sullivan County, TN - Zone 7a):**

- First Leaf: Day 79 (March 20, ±10 days)
- First Bloom: Day 95 (April 5, ±12 days)

**Day of Year Calculation:**

```
dayOfYear = (Date - January 1) + 1

Range: 1-365 (366 in leap years)
```

**Status Classification:**

- Dormant: < (firstLeaf - 30 days)
- Approaching: Within 30 days of first leaf
- Spring: Between first leaf and first bloom + 30
- Summer: After spring complete

---

#### 9. `nextChange.ts` - 24-Hour Change Detection

**Thresholds:**

- Freeze/Thaw: 32°F crossing
- Precipitation: ≥20% probability
- Wind: ≥25 mph gusts

**Severity Assignment:**

- Critical: Freeze within 2 hours
- Warning: Precip/wind within 2 hours
- Info: Changes beyond 2 hours

---

### Additional Calculation Files

10. `dateUtils.ts` - Date manipulation utilities
11. `geocoding.ts` - Location name formatting
12. `storage.ts` - LocalStorage persistence
13. `types.ts` - TypeScript type definitions
14. `sayings.ts` - Frontier proverb database
15. `drought.ts` - USDM drought classification
16. `gdd.ts` - Growing degree day accumulation
17. `frostDates.ts` - Regional frost date calculator
18. `nativePulse.ts` - Seed stratification progress
19. `weatherInfo.ts` - WMO code interpretation

---

## Component Inventory

### Total: 50 Components

#### Weather Display Components (8)

1. **AlmanacHero** - Large temperature display
2. **NowDisplay** - Current conditions summary
3. **CurrentConditionsCard** - Grid of condition tiles
4. **HourlySparkline** - Temperature trend chart
5. **CompactSevenDay** - 7-day (expandable to 16-day) forecast
6. **WeatherDetails** - Vertical 7-day list
7. **TomorrowPreview** - Next day preview card
8. **WeatherAtmosphere** - Animated background effects

#### Radar & Precipitation (3)

9. **PrecipitationRadar** - Live radar with playback
10. **RadarPreview** - Compact radar preview
11. **PrecipitationTiming** - "Rain in X minutes" status

#### Environmental Monitoring (10)

12. **SoilTemperature** - Soil temp with planting status
13. **VPDGauge** - Vapor pressure deficit gauge
14. **GDDTracker** - Growing degree day accumulator
15. **FrostCountdown** - Days to frost dates
16. **SnowConditions** - Snow depth with status
17. **SunBarometer** - Sunrise/sunset + pressure
18. **MoonPhase** - Lunar phase with guidance
19. **NativePulse** - Seed stratification tracker
20. **SpringIndex** - Phenology countdown
21. **DaylightBar** - Sunrise to sunset progress

#### Workability Scores (2)

22. **TaskScores** - Four workability indices + overall
23. **ScoreExplainer** - Modal with score methodology

#### Task Intelligence (3)

24. **FarmerMemory** - Historical patterns + records
25. **FarmerMemorySummary** - One-line insight summary
26. **PlantingIntelligence** - Container for soil/VPD/frost/GDD

#### Alerts & Safety (7)

27. **NWSAlertBanner** - NWS severe weather alerts
28. **LightningWatch** - Real-time strike detection
29. **BurnDayIndicator** - Fire weather status
30. **AirQualityCard** - AQI with pollutant info
31. **CreekWatch** - USGS stream gauge data
32. **DroughtStatus** - USDM drought level
33. **OutdoorRiskMatrix** - Combined UV/AQI/visibility

#### Forecasting (2)

34. **NextChangeHero** - Next major weather change
35. **ConditionsTiles** - Cloud/wind/moon grid

#### Modals & UI (8)

36. **AboutModal** - Project information
37. **OnboardingModal** - First-time user guide
38. **LocationPicker** - Location search/selection
39. **TopBar** - Sticky header with brand/location
40. **InfoPopup** - Contextual help dialogs
41. **QuickActions** - Priority alert stack
42. **ShareButton** - Clipboard sharing
43. **StaleDataWarning** - Data age alert

#### Utility & Layout (4)

44. **CollapsibleDeck** - Expandable section wrapper
45. **EnvironmentalWatch** - Container for creek/spring/drought
46. **FrontierSaying** - Daily proverb card
47. **SectionDivider** - Visual separator

#### Branding (3)

48. **PresentedByBlock** - Attribution
49. **DecisionRail** - Temperature anomaly alert
50. **TopBar** - Brand + location display

---

## Data Model & Types

### Core Weather Types

```typescript
interface WeatherData {
  current: CurrentConditions
  hourly: HourlyForecast
  daily: DailyForecast
  latitude: number
  longitude: number
  timezone: string
}

interface CurrentConditions {
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
  cloudCover?: number
  visibility?: number
  dewPoint?: number
  uvIndex?: number
  isDay?: boolean
}

interface HourlyForecast {
  time: string[]
  temperature: number[]
  feelsLike?: number[]
  precipitationProbability: number[]
  precipitation: number[]
  weatherCode: number[]
  snowfall?: number[]
  snowDepth?: number[]
  cloudCover?: number[]
  visibility?: number[]
  windSpeed?: number[]
  windGusts?: number[]
  dewPoint?: number[]
  uvIndex?: number[]
  freezingLevel?: number[]
}

interface DailyForecast {
  time: string[]
  temperatureMax: number[]
  temperatureMin: number[]
  feelsLikeMax?: number[]
  feelsLikeMin?: number[]
  precipitationSum: number[]
  precipitationProbability: number[]
  precipitationHours?: number[]
  weatherCode: number[]
  sunrise: string[]
  sunset: string[]
  daylightDuration?: number[]
  snowfallSum?: number[]
  windSpeedMax?: number[]
  windGustsMax?: number[]
  windDirectionDominant?: number[]
  uvIndexMax?: number[]
}
```

### Task Score Types

```typescript
interface TaskScore {
  score: number // 1-10 integer
  label: string // 'Perfect' | 'Good' | 'Fair' | 'Poor' | 'Avoid'
  instruction: string // Actionable guidance
}

interface TaskScores {
  sower: TaskScore // Gardening & Planting
  shepherd: TaskScore // Outdoor/Livestock (calculateOutdoorScore)
  keeper: TaskScore // Property Maintenance
  builder: TaskScore // Construction & Heavy Work
}

interface ExtendedMetrics {
  // Raw measurements
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

  // Calculated indices
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
```

### Environmental Types

```typescript
interface NWSAlert {
  id: string
  event: string
  severity: 'Minor' | 'Moderate' | 'Severe' | 'Extreme'
  urgency: 'Immediate' | 'Expected' | 'Future' | 'Past' | 'Unknown'
  headline: string
  description: string
  instruction: string | null
  onset: string
  expires: string
  areaDesc: string
}

interface AirQualityData {
  aqi: number
  level: 'good' | 'moderate' | 'sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous'
  dominantPollutant: string
  stationName: string
  timestamp: string
}

interface LightningData {
  strikes: LightningStrike[]
  nearestMiles: number | null
  alertLevel: 'danger' | 'warning' | 'watch' | null
  strikeCount: number
}

interface StreamData {
  siteName: string
  siteCode: string
  gageHeight: number | null
  streamflow: number | null
  status: 'flood' | 'high' | 'normal' | 'low' | 'drought'
  percentile: number
  distanceMiles: number
}

interface PhenologyData {
  springStatus: 'dormant' | 'approaching' | 'spring' | 'summer'
  daysToFirstLeaf: number | null
  daysToFirstBloom: number | null
  anomaly: 'early' | 'on-schedule' | 'late'
  anomalyDays: number
}

interface DroughtData {
  level: 'None' | 'D0' | 'D1' | 'D2' | 'D3' | 'D4'
  label: string
  percentArea: number
  lastUpdated: string
}
```

### Farmer's Memory Types

```typescript
interface PatternMatch {
  description: string
  probability: number
  sampleSize: number
  conditions: string
}

interface HistoricalDay {
  date: string
  avgHigh: number
  avgLow: number
  recordHigh: { value: number; year: number }
  recordLow: { value: number; year: number }
  avgPrecip: number
}

interface ValidatedProverb {
  text: string
  correlation: number
  sampleSize: number
  explanation: string
}

interface FarmerMemoryData {
  patternMatch: PatternMatch | null
  thisDay: HistoricalDay
  validatedProverb: ValidatedProverb | null
}
```

### Astronomical Types

```typescript
interface MoonData {
  phase: number // 0-1 scale
  illumination: number // 0-1 scale (percentage)
  phaseName: string // Named phase
  emoji: string // 🌑-🌘
}

interface SunData {
  sunrise: Date
  sunset: Date
  goldenHour: Date
  goldenHourEnd: Date
}
```

### Special Indices

```typescript
interface NativePulseResult {
  status: string
  icon: string
  color: string
  tip: string
  progress: number // 0-100%
}

interface VPDData {
  value: number // kPa
  level: 'low' | 'optimal' | 'high' | 'danger'
  recommendation: string
}

interface PrecipitationStatus {
  type: 'approaching' | 'clearing' | 'continues' | 'dry' | 'unknown'
  message: string
  icon: string
  minutesUntil?: number
  clearingTime?: Date
}

interface NextChange {
  type: 'freeze' | 'thaw' | 'precip-start' | 'precip-end' | 'wind-increase' | 'stable'
  hoursUntil: number
  timeString: string
  headline: string
  subtext: string
  severity: 'critical' | 'warning' | 'info'
}
```

---

## Export Capabilities

### Currently Available

#### ✅ Share to Clipboard (Text Format)

**Function:** Copies formatted briefing text to clipboard

**Format:**

```
Today's Briefing from The 1775 Almanac
[Weekday], [Month] [Day] | [Location]

1775: "[Frontier saying]"
2026: "[Modern translation]"

Currently [temp]F

tennessee-starts-here.vercel.app/almanac
```

**Trigger Locations:**

- Full saying share button (below FrontierSaying component)
- Icon-only share (in component headers)

**Feedback:** "Copied!" confirmation message (2 seconds)

---

### Currently NOT Available

❌ **PDF Export** - Not implemented
❌ **CSV Data Download** - Not implemented
❌ **Historical Data Archive** - Not implemented
❌ **Custom Report Generation** - Not implemented
❌ **API Access for Third Parties** - Not implemented
❌ **Email/SMS Alerts** - Not implemented
❌ **Calendar Integration** - Not implemented
❌ **Webhook Notifications** - Not implemented
❌ **Batch Data Export** - Not implemented
❌ **JSON/XML Download** - Not implemented

---

## Key Findings

### Strengths

1. **Comprehensive Data Collection**
   - 5 external APIs (Open-Meteo, AQICN, NWS, USGS, RainViewer)
   - SunCalc astronomical library
   - Real-time + forecast + historical data

2. **Sophisticated Calculations**
   - 19 calculation files
   - 50+ scientific algorithms
   - Industry-standard formulas (NOAA, NWS, OSHA, ACI)

3. **Farmer-Focused Intelligence**
   - Proprietary task scores not in commercial apps
   - Historical pattern matching (8 patterns, 72% avg accuracy)
   - Validated folk wisdom (7 proverbs, 67% avg correlation)
   - Native seed stratification tracking

4. **Multi-Layer Safety**
   - NWS severe weather alerts
   - Lightning proximity detection
   - Burn day fire weather status
   - Priority-ordered Quick Actions

5. **Accessibility & Performance**
   - Dynamic imports for below-fold components (~30% bundle reduction)
   - Loading states for async components
   - Graceful degradation (returns partial data on errors)
   - Mobile-optimized with collapsible sections

### Weaknesses

1. **Limited Export Functionality**
   - Only clipboard text sharing available
   - No structured data exports (PDF, CSV, JSON)
   - No historical data download
   - No API for third-party integration

2. **No User Accounts**
   - No saved locations history
   - No personalized alerts
   - No cross-device sync

3. **Single Location Focus**
   - Real-time data for one location at a time
   - No multi-location comparison
   - No travel planning features

4. **Limited Customization**
   - Fixed alert thresholds
   - Can't customize score weightings
   - No user-defined task types

### Opportunities for Tennessee Starts Here

**High-Value Adaptations:**

1. **Historical Context Integration**
   - Apply Farmer's Memory pattern to 1775-1796 events
   - "On this day in Tennessee history" feature
   - Weather conditions during key founding events

2. **Interactive Timeline with Weather**
   - Show historical weather patterns for treaty signings
   - Seasonal context for frontier life exhibits

3. **Educational Scores System**
   - Adapt workability scores to educational programming
   - "Best Day to Visit" index
   - Field trip weather suitability

4. **Heritage Plant Calendar**
   - Native Pulse adapted to Tennessee heritage crops
   - Period-appropriate planting guide
   - 1775 agricultural calendar overlay

5. **Living History Integration**
   - Weather-appropriate activity suggestions
   - Seasonal programming recommendations
   - Historical accuracy weather context

---

## Technical Architecture

### Data Flow

```
External APIs
    ↓
API Routes (/api/weather, /api/air-quality, etc.)
    ↓
Transform Functions (weather.ts, etc.)
    ↓
WeatherData Object
    ↓
Calculation Engine (taskScores.ts, farmerMemory.ts, etc.)
    ↓
    ├─→ TaskScores
    ├─→ NativePulseResult
    ├─→ FarmerMemoryData
    ├─→ MoonData
    └─→ Various Environmental Data
    ↓
React Components (50 components)
    ↓
User Interface
```

### Caching Strategy

| API Route     | Revalidate | Cache-Control                              |
| ------------- | ---------- | ------------------------------------------ |
| Weather       | 5 min      | `s-maxage=300, stale-while-revalidate=600` |
| Air Quality   | 15 min     | `s-maxage=900, stale-while-revalidate=600` |
| NWS Alerts    | 5 min      | `s-maxage=300, stale-while-revalidate=600` |
| Stream Levels | 15 min     | `s-maxage=300, stale-while-revalidate=600` |
| Radar         | 5 min      | `s-maxage=300, stale-while-revalidate=600` |

### Performance Optimizations

- **Dynamic Imports** - Heavy components loaded on-demand
- **Loading States** - Skeleton screens during component load
- **Error Boundaries** - Graceful component failure handling
- **Memoization** - React useMemo for expensive calculations
- **Throttled Scroll** - requestAnimationFrame for smooth scrolling

---

## Conclusion

The 1775 Almanac represents a **sophisticated, farmer-focused weather intelligence system** with unique historical pattern matching, validated folk wisdom, and proprietary workability indices. While export capabilities are limited, the depth of calculation and breadth of data integration make it a reference implementation for agricultural weather applications.

**Total System Capacity:**

- **200+ measurements** tracked
- **50+ algorithms** executed
- **50 components** orchestrated
- **5 APIs** integrated
- **Real-time + 16-day forecast + 30-year historical** data coverage

---

**Document Version:** 1.0
**Last Updated:** January 29, 2026
**Maintainer:** Tennessee Starts Here Development Team
