// Type definitions for document evidence and physical location metadata

export interface DocumentLocation {
  building: string
  room?: string
  feature?: string
  description: string
}
