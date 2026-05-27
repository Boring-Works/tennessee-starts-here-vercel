'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'

/**
 * Client-side time hook for hydration-safe date handling.
 *
 * Problem: Using `new Date()` during SSR creates hydration mismatches
 * because the server time differs from client time.
 *
 * Solution: Use useSyncExternalStore with getServerSnapshot returning
 * a stable value, then sync to client time after hydration.
 */

// Global time store for consistent time across components
let clientTime: Date | null = null
const listeners: Set<() => void> = new Set()

function subscribe(callback: () => void): () => void {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

function getSnapshot(): Date | null {
  return clientTime
}

function getServerSnapshot(): Date | null {
  // Return null on server to avoid hydration mismatch
  return null
}

function notifyListeners() {
  listeners.forEach((listener) => listener())
}

// Initialize client time after hydration
if (typeof window !== 'undefined') {
  clientTime = new Date()
  // Update time every minute for components that need current time
  setInterval(() => {
    clientTime = new Date()
    notifyListeners()
  }, 60000)
}

/**
 * Hook that returns the current client time, hydration-safe.
 * Returns null during SSR and initial client render, then updates to current time.
 *
 * @returns Current Date or null if not yet hydrated
 */
export function useClientTime(): Date | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * Hook that returns a boolean indicating if we're on the client.
 * Use this to conditionally render time-dependent content.
 */
export function useIsClient(): boolean {
  // Using useSyncExternalStore for hydration-safe client detection
  return useSyncExternalStore(
    // Subscribe - no-op since this never changes
    () => () => {},
    // getSnapshot - always true on client
    () => true,
    // getServerSnapshot - always false on server
    () => false
  )
}

/**
 * Hook that manages time-based state with automatic hydration handling.
 * Provides a stable initial value during SSR, then calculates real value client-side.
 *
 * @param calculator Function that takes current time and returns computed value
 * @param initialValue Value to use during SSR (should match what server renders)
 * @param refreshInterval Optional interval in ms to refresh the calculation
 */
export function useClientTimeValue<T>(
  calculator: (now: Date) => T,
  initialValue: T,
  refreshInterval?: number
): T {
  // Use useSyncExternalStore for hydration-safe state management
  const isClient = useIsClient()
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    if (!isClient) return

    // Use setTimeout to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      setValue(calculator(new Date()))
    }, 0)

    if (refreshInterval) {
      const interval = setInterval(() => {
        setValue(calculator(new Date()))
      }, refreshInterval)
      return () => {
        clearTimeout(timeoutId)
        clearInterval(interval)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [isClient, calculator, refreshInterval])

  // During SSR, return initial value. After hydration, return calculated value.
  return isClient ? value : initialValue
}

/**
 * Hook specifically for daylight progress calculations.
 * Returns progress percentage (0-100) and remaining daylight info.
 */
export interface DaylightInfo {
  progress: number
  remainingHours: number
  remainingMinutes: number
  isDay: boolean
  isHydrated: boolean
}

export function useDaylightProgress(
  sunrise: string,
  sunset: string,
  refreshInterval = 60000
): DaylightInfo {
  const [info, setInfo] = useState<DaylightInfo>({
    progress: 50, // Default to midday for SSR
    remainingHours: 0,
    remainingMinutes: 0,
    isDay: true,
    isHydrated: false,
  })

  useEffect(() => {
    const calculate = () => {
      const now = new Date()
      const sunriseDate = new Date(sunrise)
      const sunsetDate = new Date(sunset)

      const totalDaylight = sunsetDate.getTime() - sunriseDate.getTime()
      const elapsed = now.getTime() - sunriseDate.getTime()
      const progress = Math.max(0, Math.min(100, (elapsed / totalDaylight) * 100))

      const isDay = now >= sunriseDate && now <= sunsetDate
      const remaining = Math.max(0, sunsetDate.getTime() - now.getTime())
      const remainingHours = Math.floor(remaining / (1000 * 60 * 60))
      const remainingMinutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))

      setInfo({
        progress,
        remainingHours,
        remainingMinutes,
        isDay,
        isHydrated: true,
      })
    }

    calculate()
    const interval = setInterval(calculate, refreshInterval)
    return () => clearInterval(interval)
  }, [sunrise, sunset, refreshInterval])

  return info
}

/**
 * Hook for finding the current hour index in hourly forecast data.
 * Handles the time-based calculation client-side to avoid hydration mismatch.
 */
export function useHourlyStartIndex(
  hourlyTimes: string[],
  refreshInterval = 60000
): { startIndex: number; isHydrated: boolean } {
  const [result, setResult] = useState({ startIndex: 0, isHydrated: false })

  useEffect(() => {
    const calculate = () => {
      const now = new Date()
      let startIndex = 0

      for (let i = 0; i < hourlyTimes.length; i++) {
        const hourDate = new Date(hourlyTimes[i])
        if (hourDate >= now) {
          startIndex = i
          break
        }
      }

      setResult({ startIndex, isHydrated: true })
    }

    calculate()
    const interval = setInterval(calculate, refreshInterval)
    return () => clearInterval(interval)
  }, [hourlyTimes, refreshInterval])

  return result
}
