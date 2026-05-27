'use client'

import { MapPin } from 'lucide-react'
import LocationPicker from './LocationPicker'
import AboutModal from './AboutModal'
import ShareButton from './ShareButton'
import type { GeoLocation } from '@/lib/almanac/geocoding'
import { formatLocationName } from '@/lib/almanac/geocoding'

interface TopBarProps {
  location: GeoLocation
  onLocationChange: (loc: GeoLocation) => void
  temperature: number
  condition: string
  isLoading?: boolean
}

export function TopBar({
  location,
  onLocationChange,
  temperature,
  condition,
  isLoading = false,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-midnight/95 backdrop-blur-sm border-b border-almanac-gold/20">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-lg md:text-xl text-almanac-gold tracking-wide uppercase">
            The 1775 Almanac
          </h1>
          <span className="hidden sm:inline text-almanac-parchment/40">|</span>
          <div className="hidden sm:flex items-center gap-1 text-sm text-almanac-parchment/70">
            <MapPin className="w-3.5 h-3.5" />
            {isLoading ? (
              <div className="h-4 w-32 bg-gradient-to-r from-white/10 to-white/20 animate-pulse rounded" />
            ) : (
              <span>{formatLocationName(location)}</span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <nav aria-label="Almanac actions" className="flex items-center gap-2">
          <LocationPicker location={location} onLocationChange={onLocationChange} compact />
          <AboutModal iconOnly />
          <ShareButton
            temperature={temperature}
            condition={condition}
            location={formatLocationName(location)}
            iconOnly
          />
        </nav>
      </div>
    </header>
  )
}
