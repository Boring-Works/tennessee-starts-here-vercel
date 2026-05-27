'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface Track {
  id: string
  name: string
  artist: string
  src: string
  license: string
}

interface AmbientMusicPlayerProps {
  /** Initial volume (0-1) */
  initialVolume?: number
}

// Curated frontier ambiance tracks
const TRACKS: Track[] = [
  {
    id: 'rocky-mount-ambient',
    name: 'Rocky Mount Ambiance',
    artist: 'Ambient Music',
    src: '/audio/rocky-mount-ambient.mp3',
    license: 'Licensed via Envato Elements',
  },
  {
    id: 'beautiful-nature',
    name: 'Beautiful Nature',
    artist: 'SFmusic',
    src: '/audio/beautiful-nature.mp3',
    license: 'Licensed via Envato Elements',
  },
]

// localStorage keys for persisting user preferences
const STORAGE_KEYS = {
  VOLUME: 'ambient-music-volume',
  TRACK_INDEX: 'ambient-music-track-index',
  HAS_INTERACTED: 'ambient-music-has-interacted',
} as const

// Safe localStorage helpers (handles SSR, private mode, quota exceeded)
const storage = {
  get: (key: string): string | null => {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set: (key: string, value: string): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, value)
    } catch {
      // Silently fail in private mode, quota exceeded, or when localStorage disabled
    }
  },
}

// Waveform bars animation - defined outside component to avoid re-creation on render
function WaveformBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end justify-center gap-[2px] h-5 w-5">
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`w-[3px] bg-[var(--gold-primary)] rounded-full transition-all duration-150 ${
            playing ? 'animate-waveform' : 'h-1'
          }`}
          style={{
            animationDelay: playing ? `${bar * 100}ms` : '0ms',
            height: playing ? undefined : '4px',
          }}
        />
      ))}
    </div>
  )
}

/**
 * Frontier Ambiance Player
 *
 * An elegant, expandable music player for period-appropriate ambient sounds.
 * Features animated waveform visualization and colonial-themed styling.
 *
 * Persists across all pages but only visible on welcome, home, and our-story pages.
 * Music continues playing when navigating between pages (maintains state).
 * Auto-plays on mount with 2.5s fade-in (gracefully handles browser restrictions).
 */
export function AmbientMusicPlayer({ initialVolume = 0.25 }: AmbientMusicPlayerProps) {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showClickHint, setShowClickHint] = useState(false)

  // Lazy initialization: Load saved preferences from localStorage
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    const savedIndex = storage.get(STORAGE_KEYS.TRACK_INDEX)
    if (savedIndex !== null) {
      const parsedIndex = parseInt(savedIndex, 10)
      // Validate index is within bounds (handles case where tracks were removed)
      if (!Number.isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < TRACKS.length) {
        return parsedIndex
      }
    }
    return 0
  })

  const [volume, setVolume] = useState(() => {
    const savedVolume = storage.get(STORAGE_KEYS.VOLUME)
    if (savedVolume !== null) {
      const parsedVolume = parseFloat(savedVolume)
      if (!Number.isNaN(parsedVolume) && parsedVolume >= 0 && parsedVolume <= 1) {
        return parsedVolume
      }
    }
    return initialVolume
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasAttemptedAutoplay = useRef(false)

  const currentTrack = TRACKS[currentTrackIndex]

  // Show player on welcome, home, and our-story pages (ambient experience pages)
  const shouldShowPlayer = pathname === '/' || pathname === '/home' || pathname === '/our-story'

  // Save volume to localStorage when it changes
  useEffect(() => {
    storage.set(STORAGE_KEYS.VOLUME, volume.toString())
  }, [volume])

  // Save track index to localStorage when it changes
  useEffect(() => {
    storage.set(STORAGE_KEYS.TRACK_INDEX, currentTrackIndex.toString())
  }, [currentTrackIndex])

  // Smooth fade function (2-3 seconds for auto-play, 1 second for manual)
  const fadeAudio = useCallback(
    (fadeIn: boolean, isAutoPlay = false) => {
      const audio = audioRef.current
      if (!audio) return

      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)

      const targetVolume = fadeIn ? volume : 0
      const duration = fadeIn && isAutoPlay ? 2500 : 1000 // Longer fade-in for auto-play
      const step = fadeIn ? 0.01 : -0.02
      const steps = Math.abs(targetVolume - audio.volume) / Math.abs(step)
      const interval = duration / steps

      fadeIntervalRef.current = setInterval(() => {
        if (!audioRef.current) return

        const newVolume = audioRef.current.volume + step

        if (fadeIn && newVolume >= targetVolume) {
          audioRef.current.volume = targetVolume
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
        } else if (!fadeIn && newVolume <= 0) {
          audioRef.current.volume = 0
          audioRef.current.pause()
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
        } else {
          audioRef.current.volume = Math.max(0, Math.min(1, newVolume))
        }
      }, interval)
    },
    [volume]
  )

  // Attempt auto-play with fade-in
  const attemptAutoPlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || hasAttemptedAutoplay.current) return

    hasAttemptedAutoplay.current = true

    // Check if user has interacted before
    const hasInteracted = storage.get(STORAGE_KEYS.HAS_INTERACTED) === 'true'

    try {
      await audio.play()
      fadeAudio(true, true) // Smooth 2.5s fade-in for auto-play
      setIsPlaying(true)
      storage.set(STORAGE_KEYS.HAS_INTERACTED, 'true')
    } catch (_error) {
      // Auto-play blocked by browser - show hint if user hasn't interacted before
      if (!hasInteracted) {
        setShowClickHint(true)
        // Hide hint after 5 seconds
        setTimeout(() => setShowClickHint(false), 5000)
      }
    }
  }, [fadeAudio])

  // Initialize audio element with Next.js optimizations
  useEffect(() => {
    // Reset auto-play flag on mount to allow re-attempts
    hasAttemptedAutoplay.current = false

    const audio = new Audio(currentTrack.src)
    audio.loop = true
    audio.volume = 0
    audio.preload = 'auto' // Preload full file for better auto-play success
    audio.crossOrigin = 'anonymous' // Enable CORS if needed
    audioRef.current = audio

    // Attempt auto-play after audio is fully loaded
    const handleCanPlayThrough = () => {
      if (!hasAttemptedAutoplay.current && shouldShowPlayer) {
        attemptAutoPlay()
      }
    }

    // Listen for when audio is ready to play
    audio.addEventListener('canplaythrough', handleCanPlayThrough)

    // Fallback: Try auto-play after delay if canplaythrough doesn't fire
    const timer = setTimeout(() => {
      if (!hasAttemptedAutoplay.current && shouldShowPlayer) {
        attemptAutoPlay()
      }
    }, 1500)

    return () => {
      clearTimeout(timer)
      audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
      audio.pause()
      audio.src = ''
    }
  }, [currentTrack.src, attemptAutoPlay, shouldShowPlayer])

  // Toggle playback
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      fadeAudio(false)
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        fadeAudio(true) // Standard 1s fade-in for manual play
        setIsPlaying(true)
        storage.set(STORAGE_KEYS.HAS_INTERACTED, 'true')
        setShowClickHint(false) // Hide hint once user manually plays
      } catch {
        // Audio playback requires user interaction - silently handle
      }
    }
  }, [isPlaying, fadeAudio])

  // Handle volume change
  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value)
      setVolume(newVolume)
      if (audioRef.current && isPlaying) {
        audioRef.current.volume = newVolume
      }
    },
    [isPlaying]
  )

  // Switch to next track
  const nextTrack = useCallback(() => {
    const wasPlaying = isPlaying
    if (wasPlaying) {
      fadeAudio(false)
      setIsPlaying(false)
    }

    setTimeout(() => {
      setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length)
      if (wasPlaying) {
        setTimeout(() => togglePlay(), 300)
      }
    }, 300)
  }, [isPlaying, fadeAudio, togglePlay])

  // Switch to previous track
  const prevTrack = useCallback(() => {
    const wasPlaying = isPlaying
    if (wasPlaying) {
      fadeAudio(false)
      setIsPlaying(false)
    }

    setTimeout(() => {
      setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
      if (wasPlaying) {
        setTimeout(() => togglePlay(), 300)
      }
    }, 300)
  }, [isPlaying, fadeAudio, togglePlay])

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6 transition-opacity duration-300 ${
        shouldShowPlayer ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Click Hint - Shows when auto-play is blocked */}
      {showClickHint && !isPlaying && (
        <div className="absolute bottom-full right-0 mb-16 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-[#0c1a2e]/95 backdrop-blur-lg border border-[var(--gold-shimmer)] rounded-lg p-3 min-w-[180px] shadow-xl">
            <p className="font-cormorant text-xs text-[var(--text-primary)] text-center">
              Click to start ambient music
            </p>
          </div>
        </div>
      )}

      {/* Expanded Panel */}
      <div
        className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ease-out origin-bottom-right ${
          isExpanded
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-[#0c1a2e]/95 backdrop-blur-lg border border-[var(--gold-shimmer)] rounded-lg p-4 min-w-[220px] shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-cinzel text-[10px] font-semibold tracking-[0.15em] text-[var(--gold-shimmer)] uppercase">
              Frontier Ambiance
            </h3>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors p-1"
              aria-label="Close music panel"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold-shimmer)] to-transparent mb-3" />

          {/* Track Info */}
          <div className="mb-4">
            <p className="font-cormorant text-sm text-[var(--text-primary)] mb-0.5">
              {currentTrack.name}
            </p>
            <p className="font-cormorant text-xs text-[var(--text-secondary)] italic">
              {currentTrack.artist}
            </p>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2 mb-4">
            {/* Previous Track */}
            <button
              type="button"
              onClick={prevTrack}
              className="flex items-center justify-center w-8 h-8 text-[var(--gold-shimmer)] hover:text-[var(--gold-primary)] transition-colors"
              aria-label="Previous track"
              disabled={TRACKS.length === 1}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            {/* Play/Pause */}
            <button
              type="button"
              onClick={togglePlay}
              className="flex items-center justify-center w-10 h-10 bg-[var(--gold-primary)]/10 hover:bg-[var(--gold-primary)]/20 border border-[var(--gold-shimmer)] hover:border-[var(--gold-primary)] rounded-full transition-all duration-200"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg
                  className="w-4 h-4 text-[var(--gold-primary)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-[var(--gold-primary)] ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next Track */}
            <button
              type="button"
              onClick={nextTrack}
              className="flex items-center justify-center w-8 h-8 text-[var(--gold-shimmer)] hover:text-[var(--gold-primary)] transition-colors"
              aria-label="Next track"
              disabled={TRACKS.length === 1}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>

            {/* Waveform Visualization */}
            <div className="flex-1 flex justify-center">
              <WaveformBars playing={isPlaying} />
            </div>
          </div>

          {/* Track Counter */}
          {TRACKS.length > 1 && (
            <div className="text-center mb-3">
              <span className="text-[9px] text-[var(--text-secondary)]/60 font-cormorant">
                Track {currentTrackIndex + 1} of {TRACKS.length}
              </span>
            </div>
          )}

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[var(--text-secondary)] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5L10 5v14l-3.5-3.5H4a1 1 0 01-1-1v-5a1 1 0 011-1h2.5z"
              />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-[var(--text-secondary)]/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--gold-primary)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--gold-primary)] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              aria-label="Volume"
            />
          </div>

          {/* License note */}
          <p className="mt-3 text-[9px] text-[var(--text-secondary)]/60 font-cormorant">
            {currentTrack.license}
          </p>
        </div>
      </div>

      {/* Main Toggle Button - Enhanced contrast for desktop */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border-2 backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? 'bg-[var(--gold-primary)]/20 border-[var(--gold-primary)] shadow-[0_0_30px_rgba(201,162,39,0.5),0_0_60px_rgba(201,162,39,0.2)] ring-2 ring-[var(--gold-primary)]/30 ring-offset-2 ring-offset-[#0a1628]'
            : 'bg-[#0c1a2e]/90 border-[var(--gold-shimmer)] hover:border-[var(--gold-primary)] hover:bg-[var(--gold-primary)]/10 hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:ring-2 hover:ring-[var(--gold-shimmer)]/20'
        }`}
        aria-label={isExpanded ? 'Close music player' : 'Open music player'}
        aria-expanded={isExpanded}
      >
        {isPlaying ? (
          <div className="scale-125">
            <WaveformBars playing={true} />
          </div>
        ) : (
          <svg
            className="w-6 h-6 md:w-7 md:h-7 text-[var(--gold-primary)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" fill="currentColor" opacity="0.3" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" fill="currentColor" opacity="0.3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>
    </div>
  )
}
