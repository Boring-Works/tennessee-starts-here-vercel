'use client'

import { TrendingUp, TrendingDown, History, BookOpen, BarChart3 } from 'lucide-react'
import { getFarmerMemoryData, getTemperatureAnomaly } from '@/lib/almanac/farmerMemory'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'
import { ArchiveLinkCard } from './ArchiveLinkCard'
import { getRelevantDocuments } from '@/lib/almanac/archiveMapping'

interface FarmerMemoryProps {
  temperature: number
  humidity: number
  pressure: number
  windSpeed: number
  todayHigh: number
  todayLow: number
  precipitation?: number
  snowDepth?: number
}

export default function FarmerMemory({
  temperature,
  humidity,
  pressure,
  windSpeed,
  todayHigh,
  todayLow,
  precipitation = 0,
  snowDepth = 0,
}: FarmerMemoryProps) {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()

  // Let React Compiler handle memoization
  const data = getFarmerMemoryData(temperature, humidity, pressure, windSpeed)
  const anomaly = getTemperatureAnomaly(todayHigh, todayLow, month, day)

  // Get relevant archive documents for current conditions
  const relevantDocs = getRelevantDocuments({
    temperature,
    month,
    hasRain: precipitation > 0,
    hasSnow: snowDepth > 0,
    windSpeed,
  })

  // Pick the first matching document (if any)
  const featuredDoc = relevantDocs[0]

  return (
    <section
      className="rounded-sm border border-white/10 overflow-hidden h-full"
      aria-label="Farmer's Memory - Historical Weather Intelligence"
    >
      {/* Gold gradient header */}
      <div className="bg-gradient-to-r from-almanac-gold/20 to-almanac-gold/5 px-4 py-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-gold-leaf" aria-hidden="true" />
            <h2 className="font-serif text-lg text-gold-leaf">Farmer&apos;s Memory</h2>
          </div>
          <InfoPopup content={INFO_CONTENT.farmerMemory} iconSize="sm" />
        </div>
        <p className="text-xs text-almanac-parchment/60 mt-1">
          Historical patterns &amp; folk wisdom validated by data
        </p>
      </div>

      <div className="bg-white/5 divide-y divide-white/10">
        {/* This Day in Weather */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-almanac-parchment/70" aria-hidden="true" />
            <h3 className="text-sm font-medium text-almanac-parchment/90">Historical Averages</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Average temperatures */}
            <div className="space-y-1">
              <p className="text-xs text-almanac-parchment/50 uppercase tracking-wide">
                Normal Range
              </p>
              <p className="text-lg font-sans">
                <span className="text-almanac-parchment">{data.thisDay.avgHigh}°</span>
                <span className="text-almanac-parchment/50 mx-1">/</span>
                <span className="text-blue-400">{data.thisDay.avgLow}°</span>
              </p>
            </div>

            {/* Today vs normal */}
            <div className="space-y-1">
              <p className="text-xs text-almanac-parchment/50 uppercase tracking-wide">
                Today vs Normal
              </p>
              <div className="flex items-center gap-1">
                {anomaly.highDiff > 0 ? (
                  <TrendingUp className="w-4 h-4 text-orange-400" aria-hidden="true" />
                ) : anomaly.highDiff < 0 ? (
                  <TrendingDown className="w-4 h-4 text-blue-400" aria-hidden="true" />
                ) : null}
                <span
                  className={`text-sm ${
                    anomaly.highDiff > 5
                      ? 'text-orange-400'
                      : anomaly.highDiff < -5
                        ? 'text-blue-400'
                        : 'text-almanac-parchment/70'
                  }`}
                >
                  {anomaly.description}
                </span>
              </div>
            </div>
          </div>

          {/* Records */}
          <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-almanac-parchment/50">Record High: </span>
              <span className="text-orange-400">
                {data.thisDay.recordHigh.value}° ({data.thisDay.recordHigh.year})
              </span>
            </div>
            <div>
              <span className="text-almanac-parchment/50">Record Low: </span>
              <span className="text-blue-400">
                {data.thisDay.recordLow.value}° ({data.thisDay.recordLow.year})
              </span>
            </div>
          </div>
        </div>

        {/* Pattern Match */}
        {data.patternMatch && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gold-leaf" aria-hidden="true" />
              <h3 className="text-sm font-medium text-gold-leaf">Pattern Detected</h3>
            </div>

            <div className="bg-white/5 rounded-sm p-3 border border-white/5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 bg-gold-leaf/20 text-gold-leaf rounded">
                  {data.patternMatch.conditions}
                </span>
                <span className="text-sm font-semibold text-green-400">
                  {data.patternMatch.probability}% likely
                </span>
              </div>
              <p className="text-sm text-almanac-parchment/80">{data.patternMatch.description}</p>
              <p className="text-xs text-almanac-parchment/40 mt-2">
                Based on {data.patternMatch.sampleSize.toLocaleString()} historical observations
              </p>
            </div>
          </div>
        )}

        {/* Validated Proverb */}
        {data.validatedProverb && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-almanac-parchment/70" aria-hidden="true" />
              <h3 className="text-sm font-medium text-almanac-parchment/90">
                Validated Folk Wisdom
              </h3>
            </div>

            <blockquote className="border-l-2 border-gold-leaf/50 pl-3 mb-2">
              <p className="text-sm italic text-almanac-parchment/80">
                &ldquo;{data.validatedProverb.text}&rdquo;
              </p>
            </blockquote>

            <div className="flex items-center gap-3 text-sm">
              <span
                className={`font-medium ${
                  data.validatedProverb.correlation >= 70
                    ? 'text-green-400'
                    : data.validatedProverb.correlation >= 60
                      ? 'text-yellow-400'
                      : 'text-orange-400'
                }`}
              >
                {data.validatedProverb.correlation}% accurate
              </span>
              <span className="text-almanac-parchment/50">
                ({data.validatedProverb.sampleSize.toLocaleString()} cases)
              </span>
            </div>

            <p className="text-sm text-almanac-parchment/60 mt-2 leading-relaxed">
              {data.validatedProverb.explanation}
            </p>
          </div>
        )}

        {/* No pattern/proverb fallback */}
        {!data.patternMatch && !data.validatedProverb && (
          <div className="p-4 text-center">
            <p className="text-sm text-almanac-parchment/50">
              Current conditions don&apos;t match any notable historical patterns.
              <br />
              Check back as conditions change.
            </p>
          </div>
        )}

        {/* From the Archive - Featured document */}
        {featuredDoc && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-gold-leaf" aria-hidden="true" />
              <h3 className="text-sm font-medium text-gold-leaf">From the Archive</h3>
            </div>
            <ArchiveLinkCard
              title={featuredDoc.title}
              description={featuredDoc.context}
              href={`/evidence/documents/${featuredDoc.slug}`}
              type="document"
              date={featuredDoc.date}
              category={featuredDoc.theme}
            />
          </div>
        )}
      </div>
    </section>
  )
}
