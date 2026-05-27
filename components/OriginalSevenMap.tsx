'use client'

import { useState, useCallback, useMemo, memo } from 'react'

interface OriginalSevenMapProps {
  variant?: 'hero' | 'inline' | 'compact'
  showLabels?: boolean
  showDistances?: boolean
  interactive?: boolean
  className?: string
}

interface CountyInfo {
  name: string
  modernName?: string
  distance?: string
  description: string
  isEastTN: boolean
  defunct?: boolean
}

const COUNTY_INFO: Record<string, CountyInfo> = {
  sullivan: {
    name: 'Sullivan',
    modernName: 'Sullivan County',
    distance: '5 min',
    description: 'Home to Rocky Mount, the territorial capital',
    isEastTN: true,
  },
  washington: {
    name: 'Washington',
    modernName: 'Washington County',
    distance: '20 min',
    description: "Tennessee's first county, established 1777",
    isEastTN: true,
  },
  greene: {
    name: 'Greene',
    modernName: 'Greene County',
    distance: '35 min',
    description: 'Named for Revolutionary War hero Nathanael Greene',
    isEastTN: true,
  },
  hawkins: {
    name: 'Hawkins',
    modernName: 'Hawkins County',
    distance: '25 min',
    description: 'Named for Benjamin Hawkins, Indian affairs superintendent',
    isEastTN: true,
  },
  davidson: {
    name: 'Davidson',
    modernName: 'Nashville',
    distance: '4.5 hrs',
    description: 'Western seat, future state capital',
    isEastTN: false,
  },
  sumner: {
    name: 'Sumner',
    modernName: 'Gallatin',
    distance: '4 hrs',
    description: 'Named for Revolutionary War general Jethro Sumner',
    isEastTN: false,
  },
  tennessee: {
    name: 'Tennessee',
    modernName: 'Absorbed 1796',
    description: 'Divided into Montgomery and Robertson counties at statehood',
    isEastTN: false,
    defunct: true,
  },
}

function OriginalSevenMapComponent({
  variant = 'inline',
  showLabels = true,
  showDistances = false,
  interactive = true,
  className = '',
}: OriginalSevenMapProps) {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null)
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null)

  // Size configurations - memoized as they don't change
  const sizes = useMemo(
    () => ({
      hero: { width: 900, height: 500, fontSize: 14, starSize: 24 },
      inline: { width: 700, height: 400, fontSize: 12, starSize: 20 },
      compact: { width: 400, height: 280, fontSize: 10, starSize: 16 },
    }),
    []
  )

  const size = sizes[variant]

  // Colors matching site design - memoized as they don't change
  const colors = useMemo(
    () => ({
      eastTN: '#E8E0D4', // Warm cream for East TN counties
      middleTN: '#D4DDD4', // Sage for Middle TN counties
      eastTNHover: '#DDD4C4',
      middleTNHover: '#C4D4C4',
      border: '#8B7355', // Warm brown borders
      borderHover: '#0a1628', // Primary on hover
      text: '#0a1628', // Primary text
      textLight: '#525252', // Lighter text
      accent: 'var(--gold-primary)', // Gold accent
      star: 'var(--gold-primary)', // Star color
      defunct: '#F0EBE3', // Lighter for Tennessee County
      defunctBorder: '#A89880', // Dashed border color
    }),
    []
  )

  const handleCountyClick = useCallback(
    (county: string) => {
      if (interactive) {
        setSelectedCounty((prev) => (prev === county ? null : county))
      }
    },
    [interactive]
  )

  const handleCountyKeyDown = useCallback(
    (county: string, event: React.KeyboardEvent) => {
      if (interactive && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault()
        setSelectedCounty((prev) => (prev === county ? null : county))
      }
    },
    [interactive]
  )

  const getCountyFill = useCallback(
    (county: string, isEastTN: boolean, isDefunct?: boolean) => {
      if (isDefunct) return colors.defunct
      if (hoveredCounty === county || selectedCounty === county) {
        return isEastTN ? colors.eastTNHover : colors.middleTNHover
      }
      return isEastTN ? colors.eastTN : colors.middleTN
    },
    [hoveredCounty, selectedCounty, colors]
  )

  const getCountyStroke = useCallback(
    (county: string) => {
      if (hoveredCounty === county || selectedCounty === county) {
        return colors.borderHover
      }
      return colors.border
    },
    [hoveredCounty, selectedCounty, colors]
  )

  return (
    <div className={`original-seven-map ${className}`}>
      <svg
        viewBox={`0 0 ${size.width} ${size.height}`}
        width="100%"
        height="auto"
        role="img"
        aria-label="Map of the Original Seven Counties of the Southwest Territory, 1790"
        style={{ maxWidth: size.width }}
      >
        <defs>
          {/* Subtle texture pattern */}
          <pattern id="paperTexture" patternUnits="userSpaceOnUse" width="100" height="100">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.05" />
              </feComponentTransfer>
            </filter>
            <rect width="100" height="100" filter="url(#noise)" />
          </pattern>

          {/* Star marker for Rocky Mount */}
          <symbol id="starMarker" viewBox="0 0 24 24">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={colors.star}
              stroke={colors.text}
              strokeWidth="0.5"
            />
          </symbol>

          {/* Gradient for depth */}
          <linearGradient id="countyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="black" stopOpacity="0.05" />
          </linearGradient>

          {/* Drop shadow */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill="#FDFCFA" />
        <rect width="100%" height="100%" fill="url(#paperTexture)" />

        {/* Title */}
        {variant !== 'compact' && (
          <text
            x={size.width / 2}
            y="30"
            textAnchor="middle"
            fontFamily="var(--font-serif), Georgia, serif"
            fontSize={size.fontSize + 6}
            fontWeight="400"
            fill={colors.text}
            letterSpacing="0.05em"
          >
            The Original Seven Counties
          </text>
        )}

        {/* Subtitle */}
        {variant === 'hero' && (
          <text
            x={size.width / 2}
            y="52"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontSize={size.fontSize - 1}
            fill={colors.textLight}
            letterSpacing="0.1em"
          >
            SOUTHWEST TERRITORY · 1790
          </text>
        )}

        {/* Main map group */}
        <g
          transform={`translate(${size.width * 0.05}, ${variant === 'hero' ? 70 : variant === 'compact' ? 20 : 60})`}
          filter="url(#shadow)"
        >
          {/* ==========================================
              EAST TENNESSEE COUNTIES (Clustered)
              ========================================== */}

          {/* HAWKINS - Top */}
          <g
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? 'Hawkins County - click for details' : undefined}
            onMouseEnter={() => interactive && setHoveredCounty('hawkins')}
            onMouseLeave={() => interactive && setHoveredCounty(null)}
            onClick={() => handleCountyClick('hawkins')}
            onKeyDown={(e) => handleCountyKeyDown('hawkins', e)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            <path
              d="M280,20 L420,15 L440,45 L430,90 L380,100 L320,95 L270,70 L280,20"
              fill={getCountyFill('hawkins', true)}
              stroke={getCountyStroke('hawkins')}
              strokeWidth="1.5"
            />
            <rect
              width="100%"
              height="100%"
              fill="url(#countyGradient)"
              clipPath="polygon(280px 20px, 420px 15px, 440px 45px, 430px 90px, 380px 100px, 320px 95px, 270px 70px)"
              style={{ pointerEvents: 'none' }}
            />
            {showLabels && (
              <text
                x="355"
                y="60"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontSize={size.fontSize}
                fontWeight="600"
                fill={colors.text}
                letterSpacing="0.08em"
              >
                HAWKINS
              </text>
            )}
          </g>

          {/* SULLIVAN - Upper Left */}
          <g
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? 'Sullivan County - click for details' : undefined}
            onMouseEnter={() => interactive && setHoveredCounty('sullivan')}
            onMouseLeave={() => interactive && setHoveredCounty(null)}
            onClick={() => handleCountyClick('sullivan')}
            onKeyDown={(e) => handleCountyKeyDown('sullivan', e)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            <path
              d="M120,50 L270,45 L280,20 L270,70 L230,110 L190,130 L120,120 L100,80 L120,50"
              fill={getCountyFill('sullivan', true)}
              stroke={getCountyStroke('sullivan')}
              strokeWidth="1.5"
            />
            {showLabels && (
              <text
                x="185"
                y="85"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontSize={size.fontSize}
                fontWeight="600"
                fill={colors.text}
                letterSpacing="0.08em"
              >
                SULLIVAN
              </text>
            )}
          </g>

          {/* WASHINGTON - Center (Contains Rocky Mount) */}
          <g
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? 'Washington County - click for details' : undefined}
            onMouseEnter={() => interactive && setHoveredCounty('washington')}
            onMouseLeave={() => interactive && setHoveredCounty(null)}
            onClick={() => handleCountyClick('washington')}
            onKeyDown={(e) => handleCountyKeyDown('washington', e)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            <path
              d="M190,130 L230,110 L270,70 L320,95 L380,100 L370,150 L340,190 L280,200 L220,190 L180,160 L190,130"
              fill={getCountyFill('washington', true)}
              stroke={getCountyStroke('washington')}
              strokeWidth="1.5"
            />
            {showLabels && (
              <text
                x="280"
                y="155"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontSize={size.fontSize}
                fontWeight="600"
                fill={colors.text}
                letterSpacing="0.08em"
              >
                WASHINGTON
              </text>
            )}
          </g>

          {/* GREENE - Right */}
          <g
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? 'Greene County - click for details' : undefined}
            onMouseEnter={() => interactive && setHoveredCounty('greene')}
            onMouseLeave={() => interactive && setHoveredCounty(null)}
            onClick={() => handleCountyClick('greene')}
            onKeyDown={(e) => handleCountyKeyDown('greene', e)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            <path
              d="M380,100 L430,90 L480,100 L520,140 L500,190 L450,210 L380,200 L340,190 L370,150 L380,100"
              fill={getCountyFill('greene', true)}
              stroke={getCountyStroke('greene')}
              strokeWidth="1.5"
            />
            {showLabels && (
              <text
                x="430"
                y="155"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontSize={size.fontSize}
                fontWeight="600"
                fill={colors.text}
                letterSpacing="0.08em"
              >
                GREENE
              </text>
            )}
          </g>

          {/* ==========================================
              ROCKY MOUNT MARKER
              ========================================== */}
          <g transform="translate(205, 115)">
            <use
              href="#starMarker"
              width={size.starSize}
              height={size.starSize}
              x={-size.starSize / 2}
              y={-size.starSize / 2}
            />
            {showLabels && variant !== 'compact' && (
              <>
                <text
                  x="0"
                  y={size.starSize / 2 + 14}
                  textAnchor="middle"
                  fontFamily="var(--font-serif), Georgia, serif"
                  fontSize={size.fontSize - 1}
                  fontWeight="500"
                  fill={colors.text}
                >
                  Rocky Mount
                </text>
                <text
                  x="0"
                  y={size.starSize / 2 + 26}
                  textAnchor="middle"
                  fontFamily="system-ui, sans-serif"
                  fontSize={size.fontSize - 3}
                  fill={colors.textLight}
                >
                  Territorial Capital
                </text>
              </>
            )}
          </g>

          {/* ==========================================
              MIDDLE TENNESSEE COUNTIES (Spread West)
              ========================================== */}

          {/* Connector line to Middle TN */}
          <path
            d="M180,200 C100,240 80,260 60,280"
            fill="none"
            stroke={colors.border}
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity="0.5"
          />

          {/* DAVIDSON - Bottom Left */}
          <g
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? 'Davidson County - click for details' : undefined}
            onMouseEnter={() => interactive && setHoveredCounty('davidson')}
            onMouseLeave={() => interactive && setHoveredCounty(null)}
            onClick={() => handleCountyClick('davidson')}
            onKeyDown={(e) => handleCountyKeyDown('davidson', e)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            <path
              d="M20,280 L100,270 L120,310 L100,350 L40,360 L10,320 L20,280"
              fill={getCountyFill('davidson', false)}
              stroke={getCountyStroke('davidson')}
              strokeWidth="1.5"
            />
            {showLabels && (
              <>
                <text
                  x="65"
                  y="315"
                  textAnchor="middle"
                  fontFamily="system-ui, sans-serif"
                  fontSize={size.fontSize}
                  fontWeight="600"
                  fill={colors.text}
                  letterSpacing="0.08em"
                >
                  DAVIDSON
                </text>
                {variant !== 'compact' && (
                  <text
                    x="65"
                    y="330"
                    textAnchor="middle"
                    fontFamily="system-ui, sans-serif"
                    fontSize={size.fontSize - 2}
                    fill={colors.textLight}
                  >
                    (Nashville)
                  </text>
                )}
              </>
            )}
          </g>

          {/* SUMNER - Bottom Center */}
          <g
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? 'Sumner County - click for details' : undefined}
            onMouseEnter={() => interactive && setHoveredCounty('sumner')}
            onMouseLeave={() => interactive && setHoveredCounty(null)}
            onClick={() => handleCountyClick('sumner')}
            onKeyDown={(e) => handleCountyKeyDown('sumner', e)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            <path
              d="M100,270 L180,265 L200,300 L180,340 L120,350 L100,350 L120,310 L100,270"
              fill={getCountyFill('sumner', false)}
              stroke={getCountyStroke('sumner')}
              strokeWidth="1.5"
            />
            {showLabels && (
              <text
                x="150"
                y="310"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontSize={size.fontSize}
                fontWeight="600"
                fill={colors.text}
                letterSpacing="0.08em"
              >
                SUMNER
              </text>
            )}
          </g>

          {/* TENNESSEE COUNTY - Bottom Right (Defunct - dashed) */}
          <g
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? 'Tennessee County (defunct) - click for details' : undefined}
            onMouseEnter={() => interactive && setHoveredCounty('tennessee')}
            onMouseLeave={() => interactive && setHoveredCounty(null)}
            onClick={() => handleCountyClick('tennessee')}
            onKeyDown={(e) => handleCountyKeyDown('tennessee', e)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            <path
              d="M180,265 L260,260 L290,295 L270,340 L200,350 L180,340 L200,300 L180,265"
              fill={getCountyFill('tennessee', false, true)}
              stroke={colors.defunctBorder}
              strokeWidth="1.5"
              strokeDasharray="6,3"
            />
            {showLabels && (
              <>
                <text
                  x="230"
                  y="300"
                  textAnchor="middle"
                  fontFamily="system-ui, sans-serif"
                  fontSize={size.fontSize}
                  fontWeight="600"
                  fill={colors.textLight}
                  letterSpacing="0.08em"
                >
                  TENNESSEE
                </text>
                {variant !== 'compact' && (
                  <text
                    x="230"
                    y="315"
                    textAnchor="middle"
                    fontFamily="system-ui, sans-serif"
                    fontSize={size.fontSize - 3}
                    fill={colors.textLight}
                    fontStyle="italic"
                  >
                    (absorbed 1796)
                  </text>
                )}
              </>
            )}
          </g>
        </g>

        {/* Legend */}
        {variant === 'hero' && (
          <g transform={`translate(${size.width - 200}, ${size.height - 80})`}>
            <rect x="0" y="0" width="180" height="70" fill="white" fillOpacity="0.9" rx="2" />
            <rect
              x="0"
              y="0"
              width="180"
              height="70"
              stroke={colors.border}
              strokeWidth="0.5"
              fill="none"
              rx="2"
            />

            <rect
              x="15"
              y="15"
              width="16"
              height="12"
              fill={colors.eastTN}
              stroke={colors.border}
              strokeWidth="0.5"
            />
            <text x="40" y="24" fontFamily="system-ui, sans-serif" fontSize="10" fill={colors.text}>
              East Tennessee (4)
            </text>

            <rect
              x="15"
              y="35"
              width="16"
              height="12"
              fill={colors.middleTN}
              stroke={colors.border}
              strokeWidth="0.5"
            />
            <text x="40" y="44" fontFamily="system-ui, sans-serif" fontSize="10" fill={colors.text}>
              Middle Tennessee (3)
            </text>

            <use href="#starMarker" width="14" height="14" x="15" y="52" />
            <text x="40" y="63" fontFamily="system-ui, sans-serif" fontSize="10" fill={colors.text}>
              Territorial Capital
            </text>
          </g>
        )}

        {/* Caption */}
        {variant !== 'compact' && (
          <text
            x={size.width / 2}
            y={size.height - 12}
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontSize={size.fontSize - 2}
            fill={colors.textLight}
            fontStyle="italic"
          >
            Governing seat of the Original Seven Counties, 1790–1792
          </text>
        )}
      </svg>

      {/* Info panel for selected county */}
      {interactive && selectedCounty && COUNTY_INFO[selectedCounty] && (
        <div
          role="region"
          aria-live="polite"
          aria-label={`Information about ${COUNTY_INFO[selectedCounty].name} County`}
          style={{
            marginTop: '1rem',
            padding: '1rem 1.25rem',
            background: 'white',
            border: `1px solid ${colors.border}`,
            borderRadius: '2px',
            maxWidth: size.width,
          }}
        >
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: '1.125rem',
                  fontWeight: 400,
                  color: colors.text,
                  margin: 0,
                }}
              >
                {COUNTY_INFO[selectedCounty].name} County
              </h4>
              {COUNTY_INFO[selectedCounty].modernName && (
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: colors.textLight,
                    margin: '0.25rem 0 0',
                  }}
                >
                  {COUNTY_INFO[selectedCounty].modernName}
                </p>
              )}
            </div>
            {showDistances && COUNTY_INFO[selectedCounty].distance && (
              <span
                style={{
                  fontSize: '0.8125rem',
                  color: colors.accent,
                  fontWeight: 500,
                }}
              >
                {COUNTY_INFO[selectedCounty].distance} from Rocky Mount
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: '0.9375rem',
              color: colors.text,
              margin: '0.75rem 0 0',
              lineHeight: 1.5,
            }}
          >
            {COUNTY_INFO[selectedCounty].description}
          </p>
        </div>
      )}
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
export const OriginalSevenMap = memo(OriginalSevenMapComponent)
