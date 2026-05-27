'use client'

interface MercuryThermometerProps {
  temperature: number // °F
}

export function MercuryThermometer({ temperature }: MercuryThermometerProps) {
  // Map temp to column height (32°F = 0%, 104°F = 100%)
  const height = Math.min(100, Math.max(0, ((temperature - 32) / 72) * 100))

  return (
    <div className="flex flex-col items-center">
      {/* Wood backing plate */}
      <div className="bg-gradient-to-br from-amber-900 to-amber-950 rounded-lg p-6 shadow-2xl">
        <div className="flex items-center gap-6">
          {/* Temperature scale (left) */}
          <div className="flex flex-col justify-between h-96 py-4 text-xs text-amber-200 font-semibold">
            <div className="text-right">104°</div>
            <div className="text-right">95°</div>
            <div className="text-right">86°</div>
            <div className="text-right">77°</div>
            <div className="text-right">68°</div>
            <div className="text-right">59°</div>
            <div className="text-right">50°</div>
            <div className="text-right">41°</div>
            <div className="text-right">32°</div>
          </div>

          {/* Thermometer tube */}
          <div className="relative w-16 h-96 rounded-t-2xl rounded-b-full bg-gradient-to-r from-blue-100 via-white to-blue-100 border-4 border-slate-300 shadow-inner">
            {/* Mercury column */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-full transition-all duration-700 ease-out"
              style={{ height: `${height}%` }}
            >
              {/* Mercury shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />

              {/* Mercury top dome */}
              <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-b from-red-400 to-red-600 rounded-full" />
            </div>

            {/* Scale markings */}
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-slate-400"
                style={{ bottom: `${(i / 8) * 100}%` }}
              />
            ))}
          </div>

          {/* Empty space for visual balance */}
          <div className="w-2" />
        </div>

        {/* Bulb */}
        <div className="flex justify-center mt-2">
          <div className="w-20 h-16 bg-gradient-radial from-red-400 via-red-500 to-red-700 rounded-full shadow-lg border-4 border-slate-300">
            {/* Bulb highlight */}
            <div className="absolute w-20 h-16 bg-gradient-to-br from-white/30 via-transparent to-black/20 rounded-full pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Reading display */}
      <div className="mt-6 text-center">
        <div className="text-4xl font-bold text-cream">{Math.round(temperature)}°F</div>
        <h3 className="text-lg font-bold text-cream mt-2">Thermometer</h3>
        <p className="text-sm text-cream/60">Current Temperature</p>
      </div>
    </div>
  )
}
