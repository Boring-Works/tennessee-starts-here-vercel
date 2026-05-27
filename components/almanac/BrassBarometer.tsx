'use client'

interface BrassBarometerProps {
  pressure: number // hPa
}

export function BrassBarometer({ pressure }: BrassBarometerProps) {
  // Convert hPa to inches of mercury (27-31 range)
  const inchesHg = (pressure * 0.0295301).toFixed(1)

  // Map to dial angle (0-360 degrees)
  // 27 inches = -135°, 31 inches = 135° (270° total range)
  const normalizedPressure = Math.max(27, Math.min(31, parseFloat(inchesHg)))
  const angle = ((normalizedPressure - 27) / 4) * 270 - 135

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Brass ring with gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-yellow-600 to-amber-900 shadow-2xl border-8 border-yellow-900">
        {/* Wood backing */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-900 to-amber-950">
          {/* Dial face */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-b from-slate-50 to-slate-100 border-4 border-amber-900 flex items-center justify-center shadow-inner">
            {/* Pressure labels */}
            <div className="absolute top-8 text-sm font-bold text-amber-900">STORMY</div>
            <div className="absolute right-8 top-1/3 text-sm font-bold text-amber-900">RAIN</div>
            <div className="absolute right-8 bottom-1/3 text-sm font-bold text-amber-900">
              CHANGE
            </div>
            <div className="absolute bottom-8 text-sm font-bold text-amber-900">FAIR</div>
            <div className="absolute left-8 bottom-1/3 text-sm font-bold text-amber-900">
              VERY DRY
            </div>

            {/* Major tick marks */}
            {[...Array(13)].map((_, i) => {
              const tickAngle = -135 + i * 22.5
              return (
                <div
                  key={i}
                  className="absolute w-1 h-6 bg-amber-900 origin-bottom"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translateX(-50%) translateY(-50%) rotate(${tickAngle}deg) translateY(-80px)`,
                  }}
                />
              )
            })}

            {/* Minor tick marks */}
            {[...Array(48)].map((_, i) => {
              const tickAngle = -135 + i * 5.625
              if (i % 4 === 0) return null // Skip major ticks
              return (
                <div
                  key={`minor-${i}`}
                  className="absolute w-0.5 h-3 bg-amber-700 origin-bottom"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translateX(-50%) translateY(-50%) rotate(${tickAngle}deg) translateY(-80px)`,
                  }}
                />
              )
            })}

            {/* Number markers */}
            {[27, 28, 29, 30, 31].map((num, i) => {
              const numAngle = -135 + i * 67.5
              const radius = 60
              const x = Math.sin((numAngle * Math.PI) / 180) * radius
              const y = -Math.cos((numAngle * Math.PI) / 180) * radius

              return (
                <div
                  key={num}
                  className="absolute text-xs font-bold text-amber-900"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {num}
                </div>
              )
            })}

            {/* Needle */}
            <div
              className="absolute w-1 h-24 bg-gradient-to-b from-black to-red-900 rounded-full origin-bottom transition-transform duration-700 ease-out shadow-lg"
              style={{
                left: '50%',
                top: '50%',
                transform: `translateX(-50%) translateY(-24px) rotate(${angle}deg)`,
                transformOrigin: '50% 24px',
              }}
            />

            {/* Needle cap */}
            <div
              className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-yellow-900 to-yellow-950 border-2 border-yellow-700 shadow-lg z-10"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            />

            {/* Reading display */}
            <div className="absolute bottom-12 text-center">
              <div className="text-xl font-bold text-amber-900">{inchesHg}&quot;</div>
              <div className="text-xs text-amber-700">inches Hg</div>
            </div>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-cream">Barometer</h3>
        <p className="text-sm text-cream/60">Atmospheric Pressure</p>
      </div>
    </div>
  )
}
