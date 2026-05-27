import { type NextRequest, NextResponse } from 'next/server'

/**
 * Review Station Password Verification
 *
 * Simple endpoint to verify admin password for the review station.
 * Password is stored in environment variable, not in client code.
 *
 * Environment variable: REVIEW_STATION_PASSWORD
 * Default (dev only): rocky2024
 */
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    // Get password from environment (with dev fallback)
    const correctPassword =
      process.env.REVIEW_STATION_PASSWORD ||
      (process.env.NODE_ENV === 'development' ? 'rocky2024' : null)

    if (!correctPassword) {
      return NextResponse.json({ error: 'Review station not configured' }, { status: 503 })
    }

    if (password === correctPassword) {
      return NextResponse.json({ valid: true })
    }

    return NextResponse.json({ valid: false }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
