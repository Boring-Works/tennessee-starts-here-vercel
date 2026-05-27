'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Play, Pause, Maximize2, CloudOff } from 'lucide-react'
import { logger } from '@/lib/logger'

interface RadarPreviewProps {
  latitude: number
  longitude: number
  onExpand?: () => void
}

interface RadarFrame {
  time: number
  path: string
}

export function RadarPreview({ latitude, longitude, onExpand }: RadarPreviewProps) {
  const [frames, setFrames] = useState<RadarFrame[]>([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [loading, setLoading] = useState(true)
  const [hasPrecip, setHasPrecip] = useState(true)

  // Fetch radar data
  useEffect(() => {
    let isMounted = true

    async function fetchRadar() {
      try {
        const response = await fetch('/api/precipitation-radar')
        if (!response.ok) throw new Error('Failed to fetch radar')
        const data = await response.json()

        if (!isMounted) return

        const pastFrames = data.radar?.past || []
        const nowcastFrames = data.radar?.nowcast || data.nowcast || []
        const allFrames = [...pastFrames, ...nowcastFrames]

        setFrames(allFrames)
        setCurrentFrame(Math.max(0, pastFrames.length - 1))

        // Check if there's any precipitation (simplified check)
        setHasPrecip(allFrames.length > 0)
      } catch (error) {
        logger.error('Radar preview fetch error:', error)
        setHasPrecip(false)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchRadar()

    return () => {
      isMounted = false
    }
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || frames.length === 0) return

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length)
    }, 500)

    return () => clearInterval(interval)
  }, [isPlaying, frames.length])

  // Calculate tile coordinates
  const zoom = 7
  const n = 2 ** zoom
  const tileX = Math.floor(((longitude + 180) / 360) * n)
  const latRad = (latitude * Math.PI) / 180
  const tileY = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  )

  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-full flex items-center justify-center">
        <div className="animate-pulse text-almanac-parchment/50 text-sm">Loading radar...</div>
      </div>
    )
  }

  if (!hasPrecip || frames.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-full flex flex-col items-center justify-center">
        <CloudOff className="w-8 h-8 text-almanac-parchment/30 mb-2" />
        <p className="text-sm text-almanac-parchment/50">Clear skies</p>
        <p className="text-xs text-almanac-parchment/30">No precipitation detected</p>
      </div>
    )
  }

  const currentFrameData = frames[currentFrame]
  const radarUrl = currentFrameData
    ? `https://tilecache.rainviewer.com${currentFrameData.path}/256/${zoom}/${tileX}/${tileY}/2/1_1.png`
    : ''

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden h-full flex flex-col">
      {/* Radar image */}
      <div className="relative flex-1 min-h-[120px] bg-slate-900">
        {radarUrl && (
          <Image
            src={radarUrl}
            alt="Precipitation radar"
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-cover opacity-80"
            unoptimized
          />
        )}

        {/* Controls overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            aria-label={isPlaying ? 'Pause radar animation' : 'Play radar animation'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </button>

          {onExpand && (
            <button
              type="button"
              onClick={onExpand}
              className="p-1.5 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Expand radar view"
            >
              <Maximize2 className="w-4 h-4 text-white" />
            </button>
          )}
        </div>

        {/* Time indicator */}
        {currentFrameData && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/50 rounded text-xs text-white">
            {new Date(currentFrameData.time * 1000).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-almanac-parchment/50">Radar</span>
        <span className="text-xs text-almanac-parchment/40">
          {currentFrame + 1}/{frames.length}
        </span>
      </div>
    </div>
  )
}
