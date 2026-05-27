/* eslint-disable no-console */
/**
 * Centralized logger utility for development-only logging.
 * Prevents console statements from appearing in production builds.
 *
 * This is the ONLY file allowed to use console.* directly.
 * All other code should import and use `logger` from this module.
 *
 * @example
 * import { logger } from '@/lib/logger'
 *
 * logger.debug('Verbose info', { data })
 * logger.info('General info')
 * logger.warn('Potential issue')
 * logger.error('Something failed', error)
 */

interface LogData {
  [key: string]: unknown
}

class Logger {
  private isDev = process.env.NODE_ENV === 'development'

  /**
   * Debug level logging - verbose development info
   */
  debug(message: string, data?: LogData): void {
    if (this.isDev) {
      console.log(`[DEBUG] ${message}`, data ?? '')
    }
  }

  /**
   * Info level logging - general information
   */
  info(message: string, data?: LogData): void {
    if (this.isDev) {
      console.info(`[INFO] ${message}`, data ?? '')
    }
  }

  /**
   * Warning level logging - potential issues
   */
  warn(message: string, data?: LogData): void {
    if (this.isDev) {
      console.warn(`[WARN] ${message}`, data ?? '')
    }
  }

  /**
   * Error level logging - errors and failures
   * Note: In production, this could be extended to send to error tracking service
   */
  error(message: string, error?: unknown): void {
    if (this.isDev) {
      console.error(`[ERROR] ${message}`, error ?? '')
    }
    // Future: Send to error tracking service (e.g., Sentry)
    // if (!this.isDev && error) {
    //   captureException(error)
    // }
  }
}

export const logger = new Logger()
