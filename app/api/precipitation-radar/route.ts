import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://api.rainviewer.com/public/weather-maps.json', {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error('RainViewer API error')
    }

    const data = await response.json()
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch radar data' }, { status: 500 })
  }
}
