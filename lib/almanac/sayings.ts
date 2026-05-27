/**
 * Frontier Sayings Engine
 *
 * Provides weather-appropriate proverbs in the voice of 1775 Tennessee settlers.
 * These sayings are original compositions inspired by:
 * - Historical Appalachian folk wisdom
 * - Benjamin Franklin's Poor Richard's Almanack (1732-1758)
 * - Traditional farming almanacs of the 18th-19th century
 *
 * Weather code mapping follows WMO standards (see types.ts).
 * Temperature thresholds based on agricultural impact zones.
 *
 * "The 10% Joy" - These add personality to an otherwise data-heavy app
 */

type SayingCategory =
  | 'clear_day'
  | 'clear_night'
  | 'partly_cloudy'
  | 'overcast'
  | 'fog'
  | 'light_rain'
  | 'heavy_rain'
  | 'thunderstorm'
  | 'light_snow'
  | 'heavy_snow'
  | 'freezing'
  | 'hot'
  | 'windy'

export function getCategoryFromConditions(
  weatherCode: number,
  temperature: number,
  windSpeed: number,
  isDay: boolean
): SayingCategory {
  // Temperature overrides
  if (temperature < 25) return 'freezing'
  if (temperature > 92) return 'hot'
  if (windSpeed > 25) return 'windy'

  // Weather code mapping
  if ([0, 1].includes(weatherCode)) {
    return isDay ? 'clear_day' : 'clear_night'
  }
  if (weatherCode === 2) return 'partly_cloudy'
  if (weatherCode === 3) return 'overcast'
  if ([45, 48].includes(weatherCode)) return 'fog'
  if ([51, 53, 55, 56, 57, 61, 80].includes(weatherCode)) return 'light_rain'
  if ([63, 65, 66, 67, 81, 82].includes(weatherCode)) return 'heavy_rain'
  if ([95, 96, 99].includes(weatherCode)) return 'thunderstorm'
  if ([71, 77, 85].includes(weatherCode)) return 'light_snow'
  if ([73, 75, 86].includes(weatherCode)) return 'heavy_snow'

  return 'partly_cloudy' // Default fallback
}

export const FRONTIER_SAYINGS: Record<SayingCategory, string[]> = {
  clear_day: [
    'Sky is blue as a whetstone. A fair day for open-air labor.',
    'High pressure is holding firm. Make hay while the sun shines.',
    'Clear skies across Tennessee. A fine day for the journey.',
    'The sun is generous today. Put it to good use.',
    'Not a cloud to trouble the eye. The kind of day worth remembering.',
  ],

  clear_night: [
    'Stars are sharp tonight. Frost may kiss the meadows by dawn.',
    'Moon is bright—a good night to finish the late chores.',
    'Clear skies after dark. Tomorrow promises fair weather.',
    'The heavens are open tonight. Check on things before bed.',
    'A still, clear night. The cold will settle in the hollows.',
  ],

  partly_cloudy: [
    'Fair skies with a few travelers. Should hold for the work ahead.',
    'Clouds are moving but not gathering. Proceed with your plans.',
    'Mixed skies over the valley. Keep one eye upward.',
    'The sun plays hide-and-seek. Conditions remain favorable.',
    "Some clouds drifting through. Nothing to delay the day's work.",
  ],

  overcast: [
    "Gray skies pressing low. The rain may hold, but don't wager on it.",
    'Clouds have drawn the curtain. A day for steady, covered work.',
    'Overcast and brooding. Keep the firewood close.',
    "The sun won't show itself today. Plan for indoor hours.",
    'Heavy lid on the sky. Not the worst, not the best.',
  ],

  fog: [
    'Fog thick as wool in the hollows. Travel slow this morning.',
    'The valley is socked in. Give it time to lift.',
    'Morning fog means the day will warm. Patience.',
    "Can't see the barn from the house. Give it an hour.",
    'Fog rising off the river. The sun will burn it clear by mid-morning.',
  ],

  light_rain: [
    'A light soaking coming down. Good for the gardens, poor for the roads.',
    'Steady drizzle settling in. Keep to the covered work.',
    'Rain enough to wet, not enough to flood. Mind your footing.',
    'The sky is weeping gently. No urgency, but stay prepared.',
    'Light rain across the region. The creeks will stay in their banks.',
  ],

  heavy_rain: [
    'A gully-washer is upon us. Stay clear of the low fords.',
    'Rain coming down in sheets. This is a day for the hearth.',
    'The creeks are rising fast. Check your stores and wait.',
    'Driving rain across the county. No fit day for travel.',
    'Heavy rains are flooding the fields. Tomorrow we assess the damage.',
  ],

  thunderstorm: [
    'Thunder rolling through the mountains. Seek solid shelter.',
    'Storm clouds stacking in the west. The lightning will follow.',
    'A tempest is building. Best to be under cover.',
    'Black clouds and rumbling. Best to pause and let it pass.',
    'Thunder over the ridgeline. Not a day to be caught in the open.',
  ],

  light_snow: [
    'Snow falling light as cotton. Pretty to watch, easy to manage.',
    "First flakes of the season. The ground isn't ready to hold it.",
    'A dusting coming down. Roads will be slick by evening.',
    'Light snow on the wind. Keep the paths clear as it falls.',
    'Snowflakes drifting down. The world goes quiet.',
  ],

  heavy_snow: [
    'Snow is piling fast. Check the roof load and stay close.',
    'A proper snowstorm settling in. Hunker down.',
    'Heavy snow burying the valley. This will last days.',
    'The white is coming thick. Make sure everyone has water.',
    'Deep snow by morning. Save your strength for the digging out.',
  ],

  freezing: [
    'Bitter cold has arrived. Keep the hearth stoked through the night.',
    'Ice in the water bucket this morning. Dress in layers.',
    'A hard freeze is upon us. Check the pipes and the pets.',
    'Cold enough to crack stone. Limit your time outside.',
    'The kind of cold that finds every gap. Seal up tight.',
  ],

  hot: [
    'Heat is bearing down heavy. Work the early hours, rest at noon.',
    'Sweltering in the valley. Keep water close and shade closer.',
    'Too hot for man or beast to labor. Wait for the evening cool.',
    'The air itself is tired. Pace yourself.',
    'Heat shimmering off the pavement. This is not a day to push.',
  ],

  windy: [
    'Wind is kicking up something fierce. Secure anything loose.',
    'Strong gusts across the ridges. No day for ladder work.',
    'The wind is restless today. Stay grounded.',
    'Blustery conditions—hold onto your hat and your plans.',
    'Wind howling through the valley. Best to wait it out.',
  ],
}

/**
 * Generate a seeded random number based on date
 * Same date = same "random" number (deterministic)
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/**
 * Get day of year (1-366) for seeding
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

/**
 * Get a saying deterministically based on category and date
 * Same day + same category = same saying
 */
export function getDeterministicSaying(category: SayingCategory, date: Date = new Date()): string {
  const sayings = FRONTIER_SAYINGS[category]
  const dayOfYear = getDayOfYear(date)
  // Combine day and category for unique seed per category per day
  const categoryIndex = Object.keys(FRONTIER_SAYINGS).indexOf(category)
  const seed = dayOfYear * 100 + categoryIndex
  const index = Math.floor(seededRandom(seed) * sayings.length)
  return sayings[index]
}

/**
 * Main entry point - get a saying based on current conditions
 */
export function getSaying(
  weatherCode: number,
  temperature: number,
  windSpeed: number,
  isDay: boolean
): string {
  const category = getCategoryFromConditions(weatherCode, temperature, windSpeed, isDay)
  return getDeterministicSaying(category)
}

// ============================================
// DUAL-LINE SAYINGS (1775 / 2026 format)
// ============================================

export interface DualSaying {
  frontier: string // 1775 line
  modern: string // 2026 line
}

export const DUAL_SAYINGS: Record<SayingCategory, DualSaying[]> = {
  clear_day: [
    {
      frontier: 'Sky is blue as a whetstone. A fair day for open-air labor.',
      modern: 'Perfect conditions. Get outside and get it done.',
    },
    {
      frontier: 'High pressure is holding firm. Make hay while the sun shines.',
      modern: "The weather's cooperating. Knock out the big stuff.",
    },
    {
      frontier: 'Not a cloud to trouble the eye. The kind of day worth remembering.',
      modern: 'Lock it in—this is a get-ahead day.',
    },
  ],

  clear_night: [
    {
      frontier: 'Stars are sharp tonight. Frost may kiss the meadows by dawn.',
      modern: 'Clear and cold. Cover the tender plants before bed.',
    },
    {
      frontier: 'Moon is bright—a good night to finish the late chores.',
      modern: "You can see well enough. Wrap up what's left.",
    },
  ],

  partly_cloudy: [
    {
      frontier: 'Fair skies with a few travelers. Should hold for the work ahead.',
      modern: 'Clouds are passing through. Stay on task.',
    },
    {
      frontier: 'The sun plays hide-and-seek. Conditions remain favorable.',
      modern: 'Keep working, but keep watching.',
    },
  ],

  overcast: [
    {
      frontier: "Gray skies pressing low. The rain may hold, but don't wager on it.",
      modern: 'Could go either way. Have a backup plan.',
    },
    {
      frontier: 'Clouds have drawn the curtain. A day for steady, covered work.',
      modern: 'Good day for the garage, the barn, or the desk.',
    },
  ],

  fog: [
    {
      frontier: 'Fog thick as wool in the hollows. Travel slow this morning.',
      modern: 'Headlights on. Take it slow.',
    },
    {
      frontier: 'Morning fog means the day will warm. Patience.',
      modern: "Give it an hour. The sun's coming.",
    },
  ],

  light_rain: [
    {
      frontier: 'A light soaking coming down. Good for the gardens, poor for the roads.',
      modern: "The plants are happy. Your commute won't be.",
    },
    {
      frontier: 'Steady drizzle settling in. Keep to the covered work.',
      modern: 'Not worth getting soaked. Work under a roof.',
    },
  ],

  heavy_rain: [
    {
      frontier: 'A gully-washer is upon us. Stay clear of the low fords.',
      modern: "Turn around, don't drown.",
    },
    {
      frontier: 'Rain coming down in sheets. This is a day for the hearth.',
      modern: "Stay home if you can. It's not letting up.",
    },
  ],

  thunderstorm: [
    {
      frontier: 'Thunder rolling through the mountains. Seek solid shelter.',
      modern: 'When thunder roars, go indoors.',
    },
    {
      frontier: 'Storm clouds stacking in the west. The lightning will follow.',
      modern: "It's coming. Wrap up outdoor work now.",
    },
  ],

  light_snow: [
    {
      frontier: 'Snow falling light as cotton. Pretty to watch, easy to manage.',
      modern: "A dusting. Drive careful, but don't panic.",
    },
    {
      frontier: "First flakes of the season. The ground isn't ready to hold it.",
      modern: "It'll melt. Enjoy it while it lasts.",
    },
  ],

  heavy_snow: [
    {
      frontier: 'Snow is piling fast. Check the roof load and stay close.',
      modern: 'This is accumulating. Clear the walks before it sets.',
    },
    {
      frontier: 'A proper snowstorm settling in. Hunker down.',
      modern: "Work from home if you can. The roads won't improve.",
    },
  ],

  freezing: [
    {
      frontier: 'Bitter cold has arrived. Keep the hearth stoked through the night.',
      modern: 'Set your thermostat. Check on elderly neighbors.',
    },
    {
      frontier: 'Cold enough to crack stone. Limit your time outside.',
      modern: 'Frostbite weather. Minimize exposure.',
    },
    {
      frontier: 'The kind of cold that finds every gap. Seal up tight.',
      modern: 'Insulate, insulate, insulate. Your pipes will thank you.',
    },
  ],

  hot: [
    {
      frontier: 'Heat is bearing down heavy. Work the early hours, rest at noon.',
      modern: "Start at sunrise, stop by 10. It's not worth the risk.",
    },
    {
      frontier: 'Too hot for man or beast to labor. Wait for the evening cool.',
      modern: "It's unsafe out there. Quit early or don't start.",
    },
  ],

  windy: [
    {
      frontier: 'Wind is kicking up something fierce. Secure anything loose.',
      modern: 'Tie it down or lose it.',
    },
    {
      frontier: 'Strong gusts across the ridges. No day for ladder work.',
      modern: 'Skip the roof work. Not worth the fall risk.',
    },
  ],
}

/**
 * Get a dual-line saying (1775 + 2026) based on conditions
 */
export function getDualSaying(
  weatherCode: number,
  temperature: number,
  windSpeed: number,
  isDay: boolean
): DualSaying {
  const category = getCategoryFromConditions(weatherCode, temperature, windSpeed, isDay)
  const sayings = DUAL_SAYINGS[category]

  // Use same deterministic selection as single sayings
  const date = new Date()
  const dayOfYear = getDayOfYear(date)
  const categoryIndex = Object.keys(DUAL_SAYINGS).indexOf(category)
  const seed = dayOfYear * 100 + categoryIndex
  const index = Math.floor(seededRandom(seed) * sayings.length)

  return sayings[index]
}
