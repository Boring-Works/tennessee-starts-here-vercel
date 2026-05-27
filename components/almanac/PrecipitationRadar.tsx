'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Radar, Play, Pause, ExternalLink, MapPin } from 'lucide-react'
import { logger } from '@/lib/logger'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

interface PrecipitationRadarProps {
  latitude: number
  longitude: number
}

interface RadarFrame {
  time: number
  path: string
}

const RETRY_DELAYS = [1000, 2000, 4000]
const MAX_RETRIES = 3
const ZOOM = 8 // Zoom 8 with 3x3 = ~60 mile view (better regional coverage)

export default function PrecipitationRadar({ latitude, longitude }: PrecipitationRadarProps) {
  const [frames, setFrames] = useState<RadarFrame[]>([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Fetch radar data from RainViewer API with retry logic
  useEffect(() => {
    let isMounted = true
    let retryTimeout: NodeJS.Timeout | null = null
    let abortController: AbortController | null = null

    async function fetchRadarData(attempt = 0) {
      if (!isMounted) return

      // Cancel any in-flight request
      if (abortController) {
        abortController.abort()
      }

      // Create new abort controller for this request
      abortController = new AbortController()
      const signal = abortController.signal

      try {
        setLoading(true)
        if (attempt > 0) setRetryCount(attempt)

        const response = await fetch('/api/precipitation-radar', { signal })
        if (!response.ok) throw new Error('Failed to fetch radar data')

        const data = await response.json()
        const radarFrames = data.radar?.past || []
        const recentFrames = radarFrames.slice(-8) // Last 8 frames (40 min)

        if (!isMounted) return

        setFrames(recentFrames)
        setCurrentFrame(recentFrames.length - 1)
        setLastUpdated(new Date())
        setError(null)
        setRetryCount(0)
      } catch (err) {
        // Handle aborted requests gracefully
        if (err instanceof Error && err.name === 'AbortError') {
          return // Request was cancelled, don't update state
        }

        logger.error('Radar fetch error:', err)

        if (!isMounted) return

        // Retry with exponential backoff
        if (attempt < MAX_RETRIES) {
          const delay = RETRY_DELAYS[attempt] || RETRY_DELAYS[RETRY_DELAYS.length - 1]
          retryTimeout = setTimeout(() => fetchRadarData(attempt + 1), delay)
        } else {
          setError('Unable to load radar data')
          setRetryCount(0)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchRadarData()

    // Refresh every 5 minutes
    const interval = setInterval(() => fetchRadarData(), 300000)

    return () => {
      isMounted = false
      if (abortController) abortController.abort()
      clearInterval(interval)
      if (retryTimeout) clearTimeout(retryTimeout)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || frames.length === 0) return

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length)
    }, 600)

    return () => clearInterval(interval)
  }, [isPlaying, frames.length])

  const frame = frames[currentFrame]
  const timestamp = frame
    ? new Date(frame.time * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })
    : ''

  // Calculate center tile coordinates
  const centerTileX = Math.floor(((longitude + 180) / 360) * 2 ** ZOOM)
  const centerTileY = Math.floor(
    ((1 -
      Math.log(Math.tan((latitude * Math.PI) / 180) + 1 / Math.cos((latitude * Math.PI) / 180)) /
        Math.PI) /
      2) *
      2 ** ZOOM
  )

  // Generate 3x3 grid of tile coordinates
  const tileOffsets = [-1, 0, 1]
  const tiles = tileOffsets.flatMap((dy) =>
    tileOffsets.map((dx) => ({
      x: centerTileX + dx,
      y: centerTileY + dy,
      key: `${dx}-${dy}`,
    }))
  )

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Radar className="w-5 h-5 text-almanac-gold animate-pulse" />
          <span className="text-almanac-parchment/60 text-sm">
            {retryCount > 0
              ? `Retrying radar (${retryCount}/${MAX_RETRIES})...`
              : 'Loading radar...'}
          </span>
        </div>
        <div className="aspect-square bg-almanac-midnight/50 rounded animate-pulse" />
      </motion.div>
    )
  }

  if (error || frames.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4"
      >
        <div className="flex items-center gap-3">
          <Radar className="w-5 h-5 text-almanac-gold/50" />
          <span className="text-almanac-parchment/50 text-sm">{error || 'Radar unavailable'}</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-almanac-gold" />
          <span className="text-almanac-gold font-display">Regional Radar</span>
          <InfoPopup content={INFO_CONTENT.radar} iconSize="sm" />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded bg-almanac-gold/10 hover:bg-almanac-gold/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-almanac-gold"
            title={isPlaying ? 'Pause animation' : 'Play animation'}
            aria-label={isPlaying ? 'Pause radar animation' : 'Play radar animation'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-almanac-gold" />
            ) : (
              <Play className="w-4 h-4 text-almanac-gold" />
            )}
          </button>
        </div>
      </div>

      {/* 3x3 Radar Grid */}
      <div className="relative aspect-[4/3] bg-almanac-midnight rounded overflow-hidden mb-2">
        {/* 3x3 Grid Container */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {tiles.map((tile) => (
            <div key={tile.key} className="relative">
              {/* Base map tile */}
              <Image
                src={`https://tile.openstreetmap.org/${ZOOM}/${tile.x}/${tile.y}.png`}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 100px"
                className="object-cover opacity-50"
                priority
              />
              {/* Radar overlay tile */}
              <Image
                src={`https://tilecache.rainviewer.com${frame.path}/256/${ZOOM}/${tile.x}/${tile.y}/2/1_1.png`}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 100px"
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>

        {/* Center marker showing your location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <MapPin className="w-6 h-6 text-almanac-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Timestamp */}
        <div className="absolute bottom-2 left-2 bg-almanac-midnight/90 px-2 py-1 rounded text-xs text-almanac-parchment z-10">
          {timestamp}
        </div>

        {/* Scale indicator */}
        <div className="absolute bottom-2 right-2 bg-almanac-midnight/90 px-2 py-1 rounded text-xs text-almanac-parchment/60 z-10">
          ~60 mi view
        </div>

        {/* No precipitation indicator - shows when radar is clear */}
        <div className="absolute top-2 right-2 bg-green-900/80 border border-green-500/30 px-2 py-1 rounded text-xs text-green-400 z-10 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Clear skies
        </div>
      </div>

      {/* Timeline */}
      <div className="flex gap-1 mb-3 items-center">
        {frames.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsPlaying(false)
              setCurrentFrame(idx)
            }}
            className={`flex-1 min-h-[44px] py-4 px-0.5 rounded-full transition-colors flex items-center justify-center ${
              idx === currentFrame
                ? 'bg-almanac-gold'
                : 'bg-almanac-gold/20 hover:bg-almanac-gold/40'
            }`}
            aria-label={`Frame ${idx + 1} of ${frames.length}`}
          >
            <span
              className={`w-full h-1.5 rounded-full transition-colors ${
                idx === currentFrame ? 'bg-almanac-gold' : 'bg-almanac-gold/20'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-almanac-parchment/50 mb-3">
        <span>Light</span>
        <div className="flex gap-0.5">
          <div className="w-6 h-2 rounded-sm bg-green-500/70" title="Light rain" />
          <div className="w-6 h-2 rounded-sm bg-yellow-500/70" title="Moderate rain" />
          <div className="w-6 h-2 rounded-sm bg-orange-500/70" title="Heavy rain" />
          <div className="w-6 h-2 rounded-sm bg-red-500/70" title="Intense" />
          <div className="w-6 h-2 rounded-sm bg-purple-500/70" title="Extreme" />
        </div>
        <span>Heavy</span>
      </div>

      {/* Last Updated + External Link */}
      <div className="flex items-center justify-between">
        {lastUpdated && (
          <span className="text-xs text-almanac-parchment/40">
            Updated{' '}
            {lastUpdated.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </span>
        )}
        <a
          href={`https://www.rainviewer.com/map.html?loc=${latitude},${longitude},9`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-almanac-gold/70 hover:text-almanac-gold transition-colors"
        >
          <span>Full radar</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  )
}
