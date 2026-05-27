'use client'

// This component intentionally uses Math.random for visual particle effects
// The randomness is memoized and only regenerates when weather code changes
/* eslint-disable react-hooks/purity */

import { useMemo } from 'react'
import './weather-atmosphere.css'

interface WeatherAtmosphereProps {
  weatherCode: number
}

type ParticleType = 'dust' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'storm' | 'overcast'

interface Particle {
  id: number
  left: string
  top: string
  delay: string
  duration: string
  size?: string
  opacity?: number
  width?: string
}

// Determine particle type from weather code
function getParticleType(code: number): ParticleType {
  if (code === 0) return 'dust'
  if (code >= 1 && code <= 3) return 'overcast' // Cloudy - slow cloud shadows
  if (code >= 45 && code <= 48) return 'fog'
  if (code >= 51 && code <= 57) return 'drizzle'
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rain'
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow'
  if (code >= 95 && code <= 99) return 'storm'
  return 'dust' // Default
}

// Generate random particles with staggered properties
function generateParticles(
  count: number,
  baseDuration: number,
  durationVariance: number,
  baseSize?: number,
  sizeVariance?: number
): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${baseDuration + Math.random() * durationVariance}s`,
    size: baseSize ? `${baseSize + Math.random() * (sizeVariance || 0)}px` : undefined,
    opacity: 0.05 + Math.random() * 0.05,
    width: undefined,
  }))
}

// Generate fog wisps with varying widths
function generateFogWisps(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: '0%',
    top: `${15 + Math.random() * 70}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${20 + Math.random() * 10}s`,
    width: `${200 + Math.random() * 200}px`,
    opacity: 0.04 + Math.random() * 0.02,
  }))
}

export function WeatherAtmosphere({ weatherCode }: WeatherAtmosphereProps) {
  const particleType = getParticleType(weatherCode)

  // Memoize particles to prevent regeneration on re-render
  const particles = useMemo(() => {
    switch (particleType) {
      case 'dust': {
        // Clear weather: floating dust motes in sunlight
        // Sparse, slow, barely visible - like dust in a sunbeam
        const dustCount = 12 + Math.floor(Math.random() * 5)  // 12-16 particles
        return generateParticles(dustCount, 25, 10, 2, 2)  // 25-35s, very slow drift
      }

      case 'overcast':
        // Slow-drifting cloud shadows - gentle, barely noticeable
        return Array.from({ length: 5 }, (_, i): Particle => ({
          id: i,
          left: `${-10 + i * 25}%`,  // Spread across: -10%, 15%, 40%, 65%, 90%
          top: `${10 + Math.random() * 70}%`,  // Random vertical spread
          delay: `${i * 8}s`,  // Staggered start: 0s, 8s, 16s, 24s, 32s
          duration: `${50 + Math.random() * 20}s`,  // Slow: 50-70 seconds
          width: `${500 + Math.random() * 300}px`,  // Large: 500-800px
          opacity: 0.08 + Math.random() * 0.04,  // Subtle: 8-12%
        }))

      case 'fog':
        return generateFogWisps(4)

      case 'drizzle':
        // Light rain: thin, sparse, gentle
        return generateParticles(25, 2.0, 0.8)  // 25 drops, 2-2.8s fall

      case 'rain':
        // Steady rain: more drops, faster fall
        return generateParticles(45, 1.2, 0.5)  // 45 drops, 1.2-1.7s fall

      case 'snow':
        // Snowfall: gentle drift with wobble
        return generateParticles(25, 6, 3, 3, 2)  // 25 flakes, 6-9s fall, 3-5px

      case 'storm':
        // Heavy rain: dense, fast
        return generateParticles(55, 0.9, 0.4)  // 55 drops, 0.9-1.3s fall

      default:
        return []
    }
  }, [particleType])

  // Lightning flash delays - memoized for stability
  const lightningDelays = useMemo(() => ({
    flash1: `${6 + Math.random() * 6}s`,
    flash2: `${12 + Math.random() * 10}s`,
  }), [])

  return (
    <div className="weather-atmosphere" aria-hidden="true">
      {/* Dust motes */}
      {particleType === 'dust' && particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            left: p.left,
            top: p.top,
            '--dust-delay': p.delay,
            '--dust-duration': p.duration,
            '--dust-size': p.size,
            '--dust-opacity': 0.08,  // Very subtle
          } as React.CSSProperties}
        />
      ))}

      {/* Overcast - slow cloud shadows */}
      {particleType === 'overcast' && particles.map((p) => (
        <div
          key={p.id}
          className="cloud-shadow"
          style={{
            top: p.top,
            '--cloud-delay': p.delay,
            '--cloud-duration': p.duration,
            '--cloud-width': p.width,
            '--cloud-opacity': p.opacity,
          } as React.CSSProperties}
        />
      ))}

      {/* Fog wisps */}
      {particleType === 'fog' && particles.map((p) => (
        <div
          key={p.id}
          className="fog-wisp"
          style={{
            top: p.top,
            '--fog-delay': p.delay,
            '--fog-duration': p.duration,
            '--fog-width': p.width,
            '--fog-opacity': p.opacity,
          } as React.CSSProperties}
        />
      ))}

      {/* Drizzle */}
      {particleType === 'drizzle' && particles.map((p) => (
        <div
          key={p.id}
          className="rain-drop"
          style={{
            left: p.left,
            '--rain-delay': p.delay,
            '--rain-duration': p.duration,
            '--rain-height': '12px',
            '--rain-opacity': 0.08,  // Light drizzle
          } as React.CSSProperties}
        />
      ))}

      {/* Rain */}
      {particleType === 'rain' && particles.map((p) => (
        <div
          key={p.id}
          className="rain-drop rain-drop--heavy"
          style={{
            left: p.left,
            '--rain-delay': p.delay,
            '--rain-duration': p.duration,
            '--rain-height': '20px',
            '--rain-opacity': 0.12,  // Steady rain
          } as React.CSSProperties}
        />
      ))}

      {/* Snow */}
      {particleType === 'snow' && particles.map((p) => (
        <div
          key={p.id}
          className="snow-flake"
          style={{
            left: p.left,
            '--snow-delay': p.delay,
            '--snow-duration': p.duration,
            '--snow-size': p.size,
            '--snow-opacity': 0.20,  // Visible but soft
          } as React.CSSProperties}
        />
      ))}

      {/* Storm (rain + lightning) */}
      {particleType === 'storm' && (
        <>
          {particles.map((p) => (
            <div
              key={p.id}
              className="rain-drop rain-drop--heavy"
              style={{
                left: p.left,
                '--rain-delay': p.delay,
                '--rain-duration': p.duration,
                '--rain-height': '22px',
                '--rain-opacity': 0.14,
              } as React.CSSProperties}
            />
          ))}
          {/* Distant lightning - very subtle flashes */}
          <div
            className="lightning-flash"
            style={{
              '--flash-duration': '15s',
              '--flash-delay': lightningDelays.flash1,
            } as React.CSSProperties}
          />
          <div
            className="lightning-flash"
            style={{
              '--flash-duration': '20s',
              '--flash-delay': lightningDelays.flash2,
            } as React.CSSProperties}
          />
        </>
      )}
    </div>
  )
}
