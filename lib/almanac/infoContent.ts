/**
 * Almanac Info Content - Educational context for all tiles
 *
 * This file contains the informational content displayed in InfoPopups
 * across the almanac. Each entry provides context to help users understand
 * the data sources, scales, and why the information matters.
 */

export interface InfoContent {
  title: string
  scale?: { label: string; value: string; color: string }[]
  whyItMatters: string
  source: string
  updateFrequency?: string
}

/**
 * Info content for all almanac tiles
 *
 * Keys match the tile identifiers used throughout the almanac UI
 */
export const INFO_CONTENT: Record<string, InfoContent> = {
  // ============================================================================
  // Safety & Air Quality
  // ============================================================================

  airQuality: {
    title: 'Air Quality Index (AQI)',
    scale: [
      { label: 'Good', value: '0-50', color: 'text-green-400' },
      { label: 'Moderate', value: '51-100', color: 'text-yellow-400' },
      { label: 'Unhealthy for Sensitive Groups', value: '101-150', color: 'text-orange-400' },
      { label: 'Unhealthy', value: '151-200', color: 'text-red-400' },
      { label: 'Very Unhealthy', value: '201-300', color: 'text-purple-400' },
      { label: 'Hazardous', value: '301+', color: 'text-rose-600' },
    ],
    whyItMatters:
      'AQI affects outdoor work safety, especially for those with respiratory conditions. High AQI days mean limiting strenuous outdoor activity and considering masks for dust or smoke.',
    source: 'EPA AirNow',
    updateFrequency: 'Hourly',
  },

  burnDay: {
    title: 'Burn Day Status',
    scale: [
      { label: 'Open', value: 'Burning permitted', color: 'text-green-400' },
      { label: 'Restricted', value: 'Permit required', color: 'text-yellow-400' },
      { label: 'Closed', value: 'No burning', color: 'text-red-400' },
    ],
    whyItMatters:
      'Tennessee forestry guidelines protect against wildfire spread. Check burn status before any outdoor burning, brush piles, or debris fires. Violations can result in fines and liability for fire damage.',
    source: 'TN Division of Forestry',
    updateFrequency: 'Daily by 10am',
  },

  // ============================================================================
  // Task Scores
  // ============================================================================

  taskScores: {
    title: 'Workability Scores',
    scale: [
      { label: 'Ideal', value: '8-10', color: 'text-green-400' },
      { label: 'Workable', value: '5-7', color: 'text-yellow-400' },
      { label: 'Marginal', value: '3-4', color: 'text-orange-400' },
      { label: 'Avoid', value: '1-2', color: 'text-red-400' },
    ],
    whyItMatters:
      'Each score weighs temperature, precipitation, wind, and humidity differently based on the task. Sower score considers soil moisture and frost risk. Builder score prioritizes dry conditions and moderate temps.',
    source: 'Calculated from weather data',
    updateFrequency: 'Real-time',
  },

  // ============================================================================
  // Moon & Celestial
  // ============================================================================

  moonPhase: {
    title: 'Moon Phase',
    scale: [
      { label: 'New Moon', value: 'Dark sky, plant root crops', color: 'text-slate-400' },
      { label: 'Waxing', value: 'Plant above-ground crops', color: 'text-blue-400' },
      { label: 'Full Moon', value: 'Harvest, transplant', color: 'text-yellow-400' },
      { label: 'Waning', value: 'Prune, weed, cultivate', color: 'text-orange-400' },
    ],
    whyItMatters:
      'Traditional farming tied planting to lunar cycles. While scientific evidence is mixed, many gardeners follow moon phases for timing seeds and transplants. Full moons provide natural light for evening farm work.',
    source: 'SunCalc astronomical calculations',
    updateFrequency: 'Daily',
  },

  // ============================================================================
  // Soil & Plant Health
  // ============================================================================

  soilTemp: {
    title: 'Soil Temperature',
    scale: [
      { label: 'Cool Season Crops', value: '40-50°F', color: 'text-blue-400' },
      { label: 'Warm Season Crops', value: '60-70°F', color: 'text-green-400' },
      { label: 'Hot Weather Crops', value: '70-85°F', color: 'text-orange-400' },
    ],
    whyItMatters:
      "Seeds won't germinate in soil that's too cold. Peas and lettuce go in at 40°F. Tomatoes and peppers need 60°F+. Soil temp lags air temp by 2-4 weeks, so spring soil is cooler than the air feels.",
    source: 'Open-Meteo soil model',
    updateFrequency: 'Hourly',
  },

  frostCountdown: {
    title: 'Frost Date Countdown',
    whyItMatters:
      "Historical frost dates help time planting. 'Last frost' means when to transplant tender crops. 'First frost' means when to harvest before freeze damage. Dates are averages - plan buffer days for safety.",
    source: 'NOAA 30-year climate normals',
    updateFrequency: 'Seasonal',
  },

  vpd: {
    title: 'Vapor Pressure Deficit (VPD)',
    scale: [
      { label: 'Too Low', value: '< 0.4 kPa', color: 'text-blue-400' },
      { label: 'Ideal', value: '0.4-0.8 kPa', color: 'text-green-400' },
      { label: 'Acceptable', value: '0.8-1.2 kPa', color: 'text-yellow-400' },
      { label: 'Stress Zone', value: '> 1.2 kPa', color: 'text-red-400' },
    ],
    whyItMatters:
      "VPD measures the atmosphere's drying power. Low VPD means humid air that encourages mold and fungal disease. High VPD stresses plants as they lose water faster than roots can replace it. Ideal VPD keeps plants transpiring efficiently.",
    source: 'Calculated from temp & humidity',
    updateFrequency: 'Real-time',
  },

  gdd: {
    title: 'Growing Degree Days (GDD)',
    whyItMatters:
      'Plants develop based on accumulated heat, not calendar days. GDD tracks thermal time above a base temp (usually 50°F). Use GDD to predict crop maturity, pest emergence, and optimal spray timing. Compare to variety requirements.',
    source: 'Calculated from daily temps',
    updateFrequency: 'Daily',
  },

  // ============================================================================
  // Atmospheric Conditions
  // ============================================================================

  sunBarometer: {
    title: 'Barometric Pressure',
    scale: [
      { label: 'Rising', value: '> +0.02 in/hr', color: 'text-green-400' },
      { label: 'Steady', value: '+/- 0.02 in/hr', color: 'text-slate-400' },
      { label: 'Falling', value: '< -0.02 in/hr', color: 'text-orange-400' },
    ],
    whyItMatters:
      "Pressure changes predict weather shifts. Falling pressure often means storms approaching within 12-24 hours. Rising pressure indicates clearing. Old-timers used barometers to plan farm work - 'falling glass' meant get hay in the barn.",
    source: 'Open-Meteo surface pressure',
    updateFrequency: 'Hourly',
  },

  // ============================================================================
  // Water & Precipitation
  // ============================================================================

  creekWatch: {
    title: "Blount's Waterways Monitor",
    scale: [
      { label: 'Flood Stage', value: '90th+ percentile', color: 'text-red-400' },
      { label: 'Above Normal', value: '75-90th percentile', color: 'text-orange-400' },
      { label: 'Normal', value: '25-75th percentile', color: 'text-green-400' },
      { label: 'Below Normal', value: '10-25th percentile', color: 'text-yellow-400' },
      { label: 'Much Below', value: '< 10th percentile', color: 'text-amber-700' },
    ],
    whyItMatters:
      'From Rocky Mount, Governor William Blount monitored the Holston and Watauga river systems—vital passages for trade, communication, and territorial control. These waterways carried settlers west, floated goods to market, and defined settlement boundaries. Today we monitor the same rivers that shaped frontier Tennessee. This feature only works in Sullivan County, where Rocky Mount commands the view.',
    source: 'USGS real-time stream gauges (Sullivan County stations)',
    updateFrequency: 'Every 15 minutes',
  },

  drought: {
    title: 'Drought Monitor',
    scale: [
      { label: 'D0 - Abnormally Dry', value: 'Short-term dryness', color: 'text-yellow-400' },
      { label: 'D1 - Moderate', value: 'Some crop damage', color: 'text-orange-400' },
      { label: 'D2 - Severe', value: 'Crop losses likely', color: 'text-red-400' },
      { label: 'D3 - Extreme', value: 'Major losses', color: 'text-red-500' },
      { label: 'D4 - Exceptional', value: 'Widespread crisis', color: 'text-rose-600' },
    ],
    whyItMatters:
      'Drought conditions affect irrigation planning, hay prices, livestock water, and fire risk. The Monitor combines multiple data sources for the most authoritative drought assessment in the US.',
    source: 'US Drought Monitor',
    updateFrequency: 'Weekly (Thursdays)',
  },

  precipitationTiming: {
    title: 'Precipitation Timing',
    whyItMatters:
      'Knowing exactly when rain starts helps plan outdoor work. Nowcast radar analysis predicts precipitation arrival within the next 2 hours. Time-sensitive tasks like spraying, haying, or concrete work benefit from precise timing.',
    source: 'RainViewer nowcast',
    updateFrequency: 'Every 10 minutes',
  },

  radar: {
    title: 'Weather Radar',
    whyItMatters:
      'Radar shows current precipitation and storm movement. Watch for cells approaching your area. Green is light rain, yellow is moderate, red is heavy, and purple indicates severe weather or hail.',
    source: 'RainViewer composite radar',
    updateFrequency: 'Every 5-10 minutes',
  },

  // ============================================================================
  // Seasonal & Phenology
  // ============================================================================

  springIndex: {
    title: 'Spring Index',
    scale: [
      { label: 'Dormant', value: 'Winter conditions', color: 'text-blue-400' },
      { label: 'Approaching', value: '1-14 days to leaf-out', color: 'text-yellow-400' },
      { label: 'Spring', value: 'Active growth', color: 'text-green-400' },
      { label: 'Summer', value: 'Full canopy', color: 'text-emerald-400' },
    ],
    whyItMatters:
      'The Spring Index tracks biological spring arrival based on indicator plants. Earlier than normal spring means earlier pest pressure and pollinator activity. Use it to time sprays, plantings, and orchard care relative to natural cycles.',
    source: 'USA-NPN (National Phenology Network)',
    updateFrequency: 'Daily during spring',
  },

  nativePulse: {
    title: 'Native Pulse',
    whyItMatters:
      "Regional naturalist observations reveal what's happening in local ecosystems. Bird migrations, wildflower blooms, and insect activity provide context for your land. Nature's calendar varies year to year - this tracks the actual timing.",
    source: 'iNaturalist community observations',
    updateFrequency: 'Real-time aggregation',
  },

  // ============================================================================
  // Historical Context
  // ============================================================================

  farmerMemory: {
    title: "Farmer's Memory",
    whyItMatters:
      "30-year climate data puts today in historical context. Compare current temps to averages, see if you're running warm or cool for the season. Pattern recognition helps experienced farmers sense when conditions favor or threaten crops.",
    source: 'NOAA Climate Normals (1991-2020)',
    updateFrequency: 'Daily comparison',
  },

  // ============================================================================
  // Winter Conditions
  // ============================================================================

  snow: {
    title: 'Snow Conditions',
    scale: [
      { label: 'Trace', value: '< 1 inch', color: 'text-slate-400' },
      { label: 'Light', value: '1-3 inches', color: 'text-blue-300' },
      { label: 'Moderate', value: '3-6 inches', color: 'text-blue-400' },
      { label: 'Heavy', value: '6+ inches', color: 'text-blue-500' },
    ],
    whyItMatters:
      'Snow depth affects livestock access, road conditions, and winter crop protection. A good snow cover insulates winter wheat and garlic. Track accumulation to plan feeding routes and field access.',
    source: 'Open-Meteo snow model',
    updateFrequency: 'Hourly',
  },
}
