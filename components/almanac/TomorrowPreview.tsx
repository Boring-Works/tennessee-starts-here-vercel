'use client'

import { motion } from 'framer-motion'
import { Calendar, Droplets, ThermometerSun, ThermometerSnowflake } from 'lucide-react'

interface TomorrowData {
  high: number
  low: number
  precipChance: number
  weatherCode: number
}

interface TomorrowPreviewProps {
  tomorrow: TomorrowData | null
}

function getWeatherEmoji(code: number): string {
  if ([0, 1].includes(code)) return 'clear'
  if ([2, 3].includes(code)) return 'partlyCloudy'
  if ([45, 48].includes(code)) return 'foggy'
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rainy'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snowy'
  if ([95, 96, 99].includes(code)) return 'stormy'
  return 'partlyCloudy'
}

function getWeatherIcon(type: string): string {
  switch (type) {
    case 'clear':
      return '☀️'
    case 'partlyCloudy':
      return '⛅'
    case 'foggy':
      return '🌫️'
    case 'rainy':
      return '🌧️'
    case 'snowy':
      return '❄️'
    case 'stormy':
      return '⛈️'
    default:
      return '🌤️'
  }
}

function getTomorrowOutlook(data: TomorrowData): { text: string; color: string } {
  if (data.precipChance > 60) {
    return { text: 'Rain likely — plan indoor work', color: 'text-blue-400' }
  }
  if (data.high > 90) {
    return { text: 'Hot — work early or late', color: 'text-orange-400' }
  }
  if (data.low < 32) {
    return { text: 'Frost risk — protect plants', color: 'text-cyan-400' }
  }
  if (data.precipChance < 20 && data.high > 50 && data.high < 85) {
    return { text: 'Good conditions expected', color: 'text-almanac-success' }
  }
  return { text: 'Fair conditions expected', color: 'text-almanac-parchment/70' }
}

export default function TomorrowPreview({ tomorrow }: TomorrowPreviewProps) {
  if (!tomorrow) return null

  const outlook = getTomorrowOutlook(tomorrow)
  const weatherType = getWeatherEmoji(tomorrow.weatherCode)
  const emoji = getWeatherIcon(weatherType)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 border border-white/10 rounded-lg p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-almanac-gold" />
        <h3 className="text-sm font-medium text-almanac-gold">Tomorrow at a Glance</h3>
      </div>

      <div className="space-y-2">
        {/* Temperature row */}
        <div className="flex items-center gap-3">
          <span className="text-2xl w-8 text-center flex-shrink-0">{emoji}</span>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-almanac-parchment">
              <ThermometerSun className="w-4 h-4 text-orange-400" />
              <span className="text-almanac-parchment/50 text-xs">H</span>
              <span className="font-medium">{Math.round(tomorrow.high)}°</span>
            </span>
            <span className="flex items-center gap-1.5 text-almanac-parchment">
              <ThermometerSnowflake className="w-4 h-4 text-blue-400" />
              <span className="text-almanac-parchment/50 text-xs">L</span>
              <span className="font-medium">{Math.round(tomorrow.low)}°</span>
            </span>
          </div>
        </div>

        {/* Precipitation row */}
        {tomorrow.precipChance > 0 && (
          <div className="flex items-center gap-2 text-sm text-almanac-parchment/70 ml-11">
            <Droplets className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>{tomorrow.precipChance}% chance of precipitation</span>
          </div>
        )}

        {/* Outlook row */}
        <div className={`text-sm font-medium ml-11 ${outlook.color}`}>{outlook.text}</div>
      </div>
    </motion.div>
  )
}
