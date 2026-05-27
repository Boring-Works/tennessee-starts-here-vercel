import { type NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

// NWS Alert severity levels
type AlertSeverity = 'Minor' | 'Moderate' | 'Severe' | 'Extreme'
type AlertUrgency = 'Immediate' | 'Expected' | 'Future' | 'Past' | 'Unknown'

interface NWSAlertProperties {
  id: string
  areaDesc: string
  event: string
  severity: AlertSeverity
  urgency: AlertUrgency
  headline: string
  description: string
  instruction: string | null
  onset: string
  expires: string
  status: string
  messageType: string
}

interface NWSAlertFeature {
  properties: NWSAlertProperties
}

interface NWSAlertsResponse {
  features: NWSAlertFeature[]
}

export interface NWSAlert {
  id: string
  event: string
  severity: AlertSeverity
  urgency: AlertUrgency
  headline: string
  description: string
  instruction: string | null
  onset: string
  expires: string
  areaDesc: string
}

// Fire weather event types for burn day detection
export const FIRE_WEATHER_EVENTS = [
  'Red Flag Warning',
  'Fire Weather Watch',
  'Extreme Fire Danger',
  'Fire Warning',
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat/lon parameters' }, { status: 400 })
  }

  // Parse and validate coordinates
  const latNum = parseFloat(lat)
  const lonNum = parseFloat(lon)
  if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
    return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 })
  }

  // Round coordinates to 2 decimal places for cache efficiency
  const latRounded = Math.round(latNum * 100) / 100
  const lonRounded = Math.round(lonNum * 100) / 100

  try {
    const response = await fetch(
      `https://api.weather.gov/alerts?point=${latRounded},${lonRounded}&status=actual`,
      {
        headers: {
          'User-Agent': '1775Almanac/1.0 (contact@rockymounthistory.org)',
          Accept: 'application/geo+json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      // NWS API sometimes returns 404 for areas with no alerts
      if (response.status === 404) {
        return NextResponse.json(
          { alerts: [], hasFireWeatherAlert: false },
          {
            headers: {
              'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            },
          }
        )
      }
      throw new Error(`NWS API returned ${response.status}`)
    }

    const data: NWSAlertsResponse = await response.json()

    // Filter to active alerts only (not expired)
    const now = new Date()
    const activeAlerts: NWSAlert[] =
      data.features
        ?.filter((feature) => {
          const expires = new Date(feature.properties.expires)
          return expires > now && feature.properties.status === 'Actual'
        })
        .map((feature) => ({
          id: feature.properties.id,
          event: feature.properties.event,
          severity: feature.properties.severity,
          urgency: feature.properties.urgency,
          headline: feature.properties.headline,
          description: feature.properties.description,
          instruction: feature.properties.instruction,
          onset: feature.properties.onset,
          expires: feature.properties.expires,
          areaDesc: feature.properties.areaDesc,
        }))
        // Sort by severity (Extreme first, then Severe, etc.)
        .sort((a, b) => {
          const severityOrder: Record<AlertSeverity, number> = {
            Extreme: 0,
            Severe: 1,
            Moderate: 2,
            Minor: 3,
          }
          return severityOrder[a.severity] - severityOrder[b.severity]
        }) || []

    // Check for fire weather alerts
    const hasFireWeatherAlert = activeAlerts.some((alert) =>
      FIRE_WEATHER_EVENTS.includes(alert.event)
    )

    return NextResponse.json(
      {
        alerts: activeAlerts,
        hasFireWeatherAlert,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    logger.error('NWS alerts fetch error:', error)
    // Return empty alerts instead of failing
    // This ensures the app still works even if NWS is down
    return NextResponse.json(
      {
        alerts: [],
        hasFireWeatherAlert: false,
        error: 'Failed to fetch alerts',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  }
}
