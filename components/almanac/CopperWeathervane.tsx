'use client'

interface CopperWeathervaneProps {
  windDirection: number // degrees
  windSpeed: number // mph
}

export function CopperWeathervane({ windDirection, windSpeed }: CopperWeathervaneProps) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const directionName = directions[Math.round(windDirection / 45) % 8]

  // Wind speed description
  const getWindDescription = (speed: number): string => {
    if (speed < 1) return 'Calm'
    if (speed < 8) return 'Light breeze'
    if (speed < 15) return 'Moderate breeze'
    if (speed < 25) return 'Fresh wind'
    if (speed < 40) return 'Strong wind'
    return 'Gale'
  }

  return (
    <div className="relative w-96 h-96 mx-auto">
      {/* Base mount -->
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-gradient-to-b from-amber-800 to-amber-950 rounded shadow-lg" />

      {/* Mounting post */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3 h-64 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-full shadow-lg" />

      {/* Compass rose background */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full border-2 border-amber-700/30" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-amber-700/20" />

      {/* Cardinal directions */}
      <div className="absolute inset-0 flex items-center justify-center">
        {directions.map((dir, i) => {
          const angle = i * 45
          const radius = 140
          const x = Math.sin((angle * Math.PI) / 180) * radius
          const y = -Math.cos((angle * Math.PI) / 180) * radius
          const isCardinal = i % 2 === 0

          return (
            <div
              key={dir}
              className={`absolute ${isCardinal ? 'text-2xl font-bold' : 'text-xl'} text-amber-300`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {dir}
            </div>
          )
        })}
      </div>

      {/* Vane (rotates with wind direction) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ease-out"
        style={{ transform: `translate(-50%, -50%) rotate(${windDirection}deg)` }}
      >
        {/* Arrow pointer (points INTO wind) */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-20">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-amber-500 drop-shadow-lg" />
          {/* Arrow shine */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-amber-400/50" />
        </div>

        {/* Shaft */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-20 bottom-16 w-2 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 shadow-md" />

        {/* Tail (decorative finial) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-16">
          {/* Rooster tail shape */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 rounded-full shadow-lg" />
            {/* Tail feathers */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-gradient-to-r from-amber-500 to-amber-700 rounded-r-full" />
            <div className="absolute -right-2 top-1/4 w-6 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-r-full" />
            <div className="absolute -right-2 bottom-1/4 w-6 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-r-full" />
            {/* Shine */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/30 via-transparent to-black/20 rounded-full pointer-events-none" />
          </div>
        </div>

        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 border-2 border-amber-700 shadow-lg z-10" />
      </div>

      {/* Direction display */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <div className="text-3xl font-bold text-cream">{directionName}</div>
        <div className="text-sm text-cream/60">
          {windDirection}° · {getWindDescription(windSpeed)}
        </div>
        <h3 className="text-lg font-bold text-cream mt-2">Weathervane</h3>
        <p className="text-sm text-cream/60">Wind Direction</p>
      </div>
    </div>
  )
}
