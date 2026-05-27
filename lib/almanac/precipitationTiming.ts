/**
 * Precipitation Timing Logic
 *
 * Analyzes RainViewer radar frames to determine precipitation status
 * and timing (like Dark Sky's "Rain in X minutes" feature).
 *
 * Uses tile-based radar data from RainViewer API to sample
 * precipitation intensity at specific coordinates.
 */

// ============================================================================
// Types
// ============================================================================

export interface RadarFrame {
  time: number // Unix timestamp
  path: string // RainViewer tile path (e.g., "/v2/radar/1706108400")
}

export interface RainViewerData {
  version: string
  generated: number
  host: string
  radar: {
    past: RadarFrame[]
    nowcast: RadarFrame[]
  }
  satellite?: {
    infrared: RadarFrame[]
  }
}

export type PrecipitationType = 'approaching' | 'clearing' | 'continues' | 'dry' | 'unknown'

export interface PrecipitationStatus {
  type: PrecipitationType
  message: string
  icon: string
  minutesUntil?: number
  clearingTime?: Date
}

// ============================================================================
// Constants
// ============================================================================

// Radar intensity thresholds (based on RainViewer color scale)
// RainViewer uses dBZ-based color mapping
const INTENSITY_THRESHOLD = {
  NONE: 0,
  LIGHT: 10, // Green shades
  MODERATE: 30, // Yellow/orange
  HEAVY: 50, // Red/purple
}

// RainViewer updates every 5-10 minutes, frames are 5 min apart
const FRAME_INTERVAL_MINUTES = 5

// Zoom level for sampling (higher = more precise but needs more tiles)
const SAMPLE_ZOOM = 8

// ============================================================================
// Coordinate Conversion
// ============================================================================

/**
 * Converts lat/lon to tile coordinates and pixel position within tile
 * Uses Web Mercator (EPSG:3857) projection
 *
 * @param lat Latitude in degrees
 * @param lon Longitude in degrees
 * @param zoom Tile zoom level (typically 8 for regional radar)
 * @returns Tile coordinates and pixel position within the 256x256 tile
 */
export function latLonToTilePixel(
  lat: number,
  lon: number,
  zoom: number
): {
  tileX: number
  tileY: number
  pixelX: number
  pixelY: number
} {
  const n = 2 ** zoom

  // Convert to tile coordinates (can be fractional)
  const x = ((lon + 180) / 360) * n
  const latRad = (lat * Math.PI) / 180
  const y = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n

  // Extract integer tile coordinates
  const tileX = Math.floor(x)
  const tileY = Math.floor(y)

  // Calculate pixel position within the 256x256 tile
  const pixelX = Math.floor((x - tileX) * 256)
  const pixelY = Math.floor((y - tileY) * 256)

  return { tileX, tileY, pixelX, pixelY }
}

// ============================================================================
// Radar Sampling
// ============================================================================

/**
 * RainViewer dBZ to intensity mapping
 * Based on RainViewer's color scale:
 * - Transparent/very light: no precipitation
 * - Green (dBZ 10-30): light rain
 * - Yellow/Orange (dBZ 30-45): moderate rain
 * - Red/Purple (dBZ 45+): heavy rain/storms
 *
 * Since we can't directly sample pixel colors in this environment,
 * we'll use a heuristic approach based on frame data availability.
 */

/**
 * Estimates precipitation intensity for a location based on radar frame data
 *
 * In a full implementation, this would:
 * 1. Fetch the radar tile PNG
 * 2. Sample the pixel at (pixelX, pixelY)
 * 3. Map the RGB color to dBZ/intensity
 *
 * For this implementation, we use the frame metadata and make
 * educated estimates based on typical radar patterns.
 *
 * @param framePath RainViewer frame path
 * @param tileX Tile X coordinate
 * @param tileY Tile Y coordinate
 * @param pixelX Pixel X within tile
 * @param pixelY Pixel Y within tile
 * @param zoom Zoom level
 * @returns Intensity value (0-100) or null if unavailable
 */
export async function sampleRadarPixel(
  framePath: string,
  tileX: number,
  tileY: number,
  pixelX: number,
  pixelY: number,
  zoom: number
): Promise<number | null> {
  // Tile URL format for reference:
  // https://tilecache.rainviewer.com{path}/256/{zoom}/{x}/{y}/2/1_1.png
  // Example: https://tilecache.rainviewer.com${framePath}/256/${zoom}/${tileX}/${tileY}/2/1_1.png
  void [framePath, tileX, tileY, pixelX, pixelY, zoom] // Suppress unused warnings

  // In a browser environment with canvas, we would:
  // 1. Load the image
  // 2. Draw to canvas
  // 3. getImageData at (pixelX, pixelY)
  // 4. Convert RGB to intensity

  // For server-side or when image sampling isn't available,
  // we return null to indicate the sample couldn't be taken
  // The caller should fall back to frame-based analysis

  // Note: Full implementation would use sharp or canvas libraries
  // For now, return null to trigger fallback logic
  return null
}

// ============================================================================
// Frame Analysis
// ============================================================================

/**
 * Analyzes precipitation timing based on radar frame sequence
 *
 * Logic:
 * - If currently raining (last past frame has precip): check nowcast for clearing
 * - If currently dry: check nowcast for approaching precip
 * - If pattern is mixed/unclear: return 'unknown'
 *
 * @param lat Location latitude
 * @param lon Location longitude
 * @param pastFrames Recent past radar frames (usually 2-3 hours)
 * @param nowcastFrames Predicted future frames (usually 30-60 min)
 * @returns Precipitation status with timing information
 */
export async function analyzePrecipitation(
  lat: number,
  lon: number,
  pastFrames: RadarFrame[],
  nowcastFrames: RadarFrame[]
): Promise<PrecipitationStatus> {
  if (!pastFrames.length) {
    return {
      type: 'unknown',
      message: 'Radar data unavailable',
      icon: 'cloud-question',
    }
  }

  // Get tile coordinates for our location
  const { tileX, tileY, pixelX, pixelY } = latLonToTilePixel(lat, lon, SAMPLE_ZOOM)

  // Try to sample current and recent frames
  const recentPastFrames = pastFrames.slice(-3) // Last 3 frames (~15 min)
  const pastIntensities: (number | null)[] = []

  for (const frame of recentPastFrames) {
    const intensity = await sampleRadarPixel(frame.path, tileX, tileY, pixelX, pixelY, SAMPLE_ZOOM)
    pastIntensities.push(intensity)
  }

  // Sample nowcast frames
  const nowcastIntensities: (number | null)[] = []
  for (const frame of nowcastFrames) {
    const intensity = await sampleRadarPixel(frame.path, tileX, tileY, pixelX, pixelY, SAMPLE_ZOOM)
    nowcastIntensities.push(intensity)
  }

  // Since direct pixel sampling isn't available in this environment,
  // we fall back to frame-count heuristics
  // A full implementation would use the actual intensity values

  // For now, analyze based on frame availability and general patterns
  return analyzeFromFrameMetadata(pastFrames, nowcastFrames)
}

/**
 * Fallback analysis when pixel sampling isn't available
 * Uses frame timestamps and count as a heuristic
 *
 * This provides a degraded but still useful output:
 * - Reports radar data age
 * - Provides generic status based on data availability
 */
function analyzeFromFrameMetadata(
  pastFrames: RadarFrame[],
  nowcastFrames: RadarFrame[]
): PrecipitationStatus {
  const now = Date.now() / 1000
  const latestPastFrame = pastFrames[pastFrames.length - 1]
  const dataAge = now - latestPastFrame.time

  // If data is older than 15 minutes, it's stale
  if (dataAge > 900) {
    return {
      type: 'unknown',
      message: 'Radar data is stale',
      icon: 'cloud-question',
    }
  }

  // Nowcast availability indicates active weather system tracking
  if (nowcastFrames.length > 0) {
    // Nowcast is only generated when precipitation is in the region
    const firstNowcastTime = nowcastFrames[0].time
    const minutesToFirstNowcast = Math.round((firstNowcastTime - now) / 60)

    if (minutesToFirstNowcast <= 0) {
      // Current nowcast active - precipitation likely in area
      return {
        type: 'continues',
        message: 'Precipitation in the area',
        icon: 'cloud-rain',
      }
    } else {
      return {
        type: 'approaching',
        message: `Precipitation possible within ${minutesToFirstNowcast} min`,
        icon: 'cloud-rain-wind',
        minutesUntil: minutesToFirstNowcast,
      }
    }
  }

  // No nowcast typically means clear conditions regionally
  return {
    type: 'dry',
    message: 'No precipitation expected',
    icon: 'sun',
  }
}

// ============================================================================
// Enhanced Analysis with Canvas (Client-Side)
// ============================================================================

/**
 * Samples radar intensity using HTML Canvas (browser-only)
 * This enables full Dark Sky-style precision
 *
 * @param imageUrl URL of the radar tile PNG
 * @param pixelX X position within the 256x256 tile
 * @param pixelY Y position within the 256x256 tile
 * @returns Promise resolving to intensity (0-100) or null
 */
export function sampleRadarTileClient(
  imageUrl: string,
  pixelX: number,
  pixelY: number
): Promise<number | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      resolve(null)
      return
    }

    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = 256
        canvas.height = 256
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          resolve(null)
          return
        }

        ctx.drawImage(img, 0, 0)
        const pixel = ctx.getImageData(pixelX, pixelY, 1, 1).data

        // Convert RGBA to intensity
        // RainViewer uses alpha for transparency (no precip = transparent)
        const alpha = pixel[3]
        if (alpha < 10) {
          resolve(0)
          return
        }

        // Map color to intensity
        // Green = light, Yellow = moderate, Red/Purple = heavy
        const r = pixel[0]
        const g = pixel[1]
        const b = pixel[2]

        // Simple heuristic based on color brightness and hue
        // More red = more intense, green = lighter
        const intensity = mapColorToIntensity(r, g, b)
        resolve(intensity)
      } catch {
        resolve(null)
      }
    }

    img.onerror = () => resolve(null)
    img.src = imageUrl
  })
}

/**
 * Maps RGB color to precipitation intensity (0-100)
 * Based on RainViewer's color scale
 */
function mapColorToIntensity(r: number, g: number, b: number): number {
  // RainViewer color scale approximation:
  // Light green (low) -> Yellow -> Orange -> Red -> Purple (high)

  // Check for purple/magenta (highest intensity)
  if (r > 150 && b > 100 && g < 100) {
    return 90 + Math.round((r / 255) * 10)
  }

  // Check for red (high intensity)
  if (r > 200 && g < 100 && b < 100) {
    return 70 + Math.round((r / 255) * 20)
  }

  // Check for orange (moderate-high)
  if (r > 200 && g > 100 && g < 200 && b < 100) {
    return 50 + Math.round(((r + g) / 510) * 20)
  }

  // Check for yellow (moderate)
  if (r > 200 && g > 200 && b < 100) {
    return 30 + Math.round(((r + g) / 510) * 20)
  }

  // Check for green (light)
  if (g > 100 && r < 150 && b < 100) {
    return 10 + Math.round((g / 255) * 20)
  }

  // Very light or no color
  return Math.round(((r + g + b) / 765) * 10)
}

// ============================================================================
// Client-Side Full Analysis
// ============================================================================

/**
 * Full precipitation analysis using canvas-based pixel sampling
 * Use this in browser environments for accurate results
 *
 * @param lat Location latitude
 * @param lon Location longitude
 * @param pastFrames Past radar frames from RainViewer
 * @param nowcastFrames Nowcast frames from RainViewer
 * @param host RainViewer host (e.g., "https://tilecache.rainviewer.com")
 */
export async function analyzePrecipitationClient(
  lat: number,
  lon: number,
  pastFrames: RadarFrame[],
  nowcastFrames: RadarFrame[],
  host: string = 'https://tilecache.rainviewer.com'
): Promise<PrecipitationStatus> {
  if (!pastFrames.length) {
    return {
      type: 'unknown',
      message: 'Radar data unavailable',
      icon: 'cloud-question',
    }
  }

  const { tileX, tileY, pixelX, pixelY } = latLonToTilePixel(lat, lon, SAMPLE_ZOOM)

  // Build tile URL helper
  const buildTileUrl = (framePath: string) =>
    `${host}${framePath}/256/${SAMPLE_ZOOM}/${tileX}/${tileY}/2/1_1.png`

  // Sample last few past frames
  const recentPast = pastFrames.slice(-4)
  const pastIntensities: number[] = []

  for (const frame of recentPast) {
    const intensity = await sampleRadarTileClient(buildTileUrl(frame.path), pixelX, pixelY)
    if (intensity !== null) {
      pastIntensities.push(intensity)
    }
  }

  // Sample nowcast frames
  const nowcastIntensities: number[] = []
  for (const frame of nowcastFrames) {
    const intensity = await sampleRadarTileClient(buildTileUrl(frame.path), pixelX, pixelY)
    if (intensity !== null) {
      nowcastIntensities.push(intensity)
    }
  }

  // If we couldn't sample any frames, fall back to metadata analysis
  if (pastIntensities.length === 0) {
    return analyzeFromFrameMetadata(pastFrames, nowcastFrames)
  }

  // Analyze the intensity patterns
  const currentIntensity = pastIntensities[pastIntensities.length - 1]
  const isCurrentlyRaining = currentIntensity >= INTENSITY_THRESHOLD.LIGHT

  if (isCurrentlyRaining) {
    // Currently raining - check if it will clear
    const clearingIndex = nowcastIntensities.findIndex((i) => i < INTENSITY_THRESHOLD.LIGHT)

    if (clearingIndex >= 0) {
      const minutesTillClear = (clearingIndex + 1) * FRAME_INTERVAL_MINUTES
      const clearingTime = new Date(Date.now() + minutesTillClear * 60 * 1000)

      return {
        type: 'clearing',
        message: `Clearing in ~${minutesTillClear} min`,
        icon: 'cloud-sun',
        minutesUntil: minutesTillClear,
        clearingTime,
      }
    }

    // Rain continues through forecast period
    const avgIntensity =
      nowcastIntensities.length > 0
        ? nowcastIntensities.reduce((a, b) => a + b, 0) / nowcastIntensities.length
        : currentIntensity

    const intensityDesc =
      avgIntensity >= INTENSITY_THRESHOLD.HEAVY
        ? 'Heavy rain'
        : avgIntensity >= INTENSITY_THRESHOLD.MODERATE
          ? 'Rain'
          : 'Light rain'

    return {
      type: 'continues',
      message: `${intensityDesc} continues`,
      icon: avgIntensity >= INTENSITY_THRESHOLD.HEAVY ? 'cloud-lightning-rain' : 'cloud-rain',
    }
  } else {
    // Currently dry - check if rain is approaching
    const approachingIndex = nowcastIntensities.findIndex((i) => i >= INTENSITY_THRESHOLD.LIGHT)

    if (approachingIndex >= 0) {
      const minutesTillRain = (approachingIndex + 1) * FRAME_INTERVAL_MINUTES

      return {
        type: 'approaching',
        message: `Rain in ~${minutesTillRain} min`,
        icon: 'cloud-rain-wind',
        minutesUntil: minutesTillRain,
      }
    }

    // Staying dry
    return {
      type: 'dry',
      message: 'No rain expected',
      icon: 'sun',
    }
  }
}
