/**
 * Moon Phase and Sun calculations
 *
 * Uses SunCalc library (https://github.com/mourner/suncalc)
 * SunCalc implements astronomical algorithms from:
 * - "Astronomical Algorithms" by Jean Meeus (1991)
 * - US Naval Observatory data
 *
 * Moon phase is a value from 0 to 1:
 * - 0.00 = New Moon
 * - 0.25 = First Quarter
 * - 0.50 = Full Moon
 * - 0.75 = Last Quarter
 * - 1.00 = New Moon (cycle complete)
 *
 * Phase ranges below divide the lunar cycle into 8 equal segments (0.125 each)
 */
import SunCalc from 'suncalc'
import type { MoonData } from './types'

const MOON_PHASES = [
  { name: 'New Moon', emoji: '🌑', min: 0, max: 0.0625 },
  { name: 'Waxing Crescent', emoji: '🌒', min: 0.0625, max: 0.1875 },
  { name: 'First Quarter', emoji: '🌓', min: 0.1875, max: 0.3125 },
  { name: 'Waxing Gibbous', emoji: '🌔', min: 0.3125, max: 0.4375 },
  { name: 'Full Moon', emoji: '🌕', min: 0.4375, max: 0.5625 },
  { name: 'Waning Gibbous', emoji: '🌖', min: 0.5625, max: 0.6875 },
  { name: 'Last Quarter', emoji: '🌗', min: 0.6875, max: 0.8125 },
  { name: 'Waning Crescent', emoji: '🌘', min: 0.8125, max: 1 },
]

export function getMoonData(date: Date = new Date()): MoonData {
  const illumination = SunCalc.getMoonIllumination(date)

  // Defensive bounds check: clamp phase to 0-1 range
  const rawPhase = illumination.phase
  const phase = Math.max(0, Math.min(1, Number.isNaN(rawPhase) ? 0 : rawPhase))

  // Clamp illumination fraction as well
  const rawFraction = illumination.fraction
  const fraction = Math.max(0, Math.min(1, Number.isNaN(rawFraction) ? 0 : rawFraction))

  // Find phase name and emoji (handle wrap-around at 0.9375 for new moon)
  let phaseName = 'New Moon'
  let emoji = '🌑'

  for (const p of MOON_PHASES) {
    // Check if phase falls within this range (last entry handles 0.8125-1.0)
    if (phase >= p.min && phase < p.max) {
      phaseName = p.name
      emoji = p.emoji
      break
    }
  }

  // Phase values very close to 1 should show as "New Moon" (lunar cycle wrap-around)
  if (phase >= 0.9375) {
    phaseName = 'New Moon'
    emoji = '🌑'
  }

  return {
    phase,
    illumination: fraction,
    phaseName,
    emoji,
  }
}

export interface SunData {
  sunrise: Date
  sunset: Date
  goldenHour: Date
  goldenHourEnd: Date
}

export function getSunData(date: Date, latitude: number, longitude: number): SunData {
  const times = SunCalc.getTimes(date, latitude, longitude)

  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    goldenHour: times.goldenHour,
    goldenHourEnd: times.goldenHourEnd,
  }
}

export function isDay(date: Date, latitude: number, longitude: number): boolean {
  const sun = getSunData(date, latitude, longitude)
  return date >= sun.sunrise && date <= sun.sunset
}
