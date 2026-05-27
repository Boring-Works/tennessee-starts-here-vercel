/**
 * Confidence Gate
 * Determines when to escalate from Gemini Flash to Claude Sonnet
 */

export interface ConfidenceResult {
  overall: number
  date: number
  author: number
  transcription: number
  flags: EscalationFlag[]
}

export type EscalationFlag =
  | 'handwriting-detected'
  | 'low-contrast'
  | 'multiple-languages'
  | 'archaic-script'
  | 'damaged-document'
  | 'cherokee-content'
  | 'conflicting-dates'

/**
 * Threshold for escalation to Claude Sonnet
 * Below this confidence, we pay for the better model
 */
export const ESCALATION_THRESHOLD = 0.75

/**
 * Flags that always trigger escalation regardless of confidence
 * These documents are too important to risk
 */
export const ALWAYS_ESCALATE_FLAGS: EscalationFlag[] = [
  'cherokee-content', // Cultural sensitivity requires careful handling
  'conflicting-dates', // Historical accuracy is critical
]

/**
 * Determine if document should be escalated to Claude Sonnet
 */
export function shouldEscalate(confidence: ConfidenceResult): {
  escalate: boolean
  reason: string
} {
  // Always escalate for sensitive content
  const sensitiveFlag = confidence.flags.find((f) => ALWAYS_ESCALATE_FLAGS.includes(f))
  if (sensitiveFlag) {
    return {
      escalate: true,
      reason: `Sensitive content detected: ${sensitiveFlag}`,
    }
  }

  // Escalate for low overall confidence
  if (confidence.overall < ESCALATION_THRESHOLD) {
    return {
      escalate: true,
      reason: `Low confidence: ${(confidence.overall * 100).toFixed(0)}% (threshold: ${ESCALATION_THRESHOLD * 100}%)`,
    }
  }

  // Escalate for low transcription quality (OCR issues)
  if (confidence.transcription < 0.7) {
    return {
      escalate: true,
      reason: `Poor OCR quality: ${(confidence.transcription * 100).toFixed(0)}%`,
    }
  }

  // Escalate for handwriting (Flash struggles with 18th century cursive)
  if (confidence.flags.includes('handwriting-detected')) {
    return {
      escalate: true,
      reason: 'Handwritten document detected',
    }
  }

  // Escalate for damaged documents
  if (confidence.flags.includes('damaged-document') && confidence.overall < 0.85) {
    return {
      escalate: true,
      reason: 'Damaged document with moderate confidence',
    }
  }

  return {
    escalate: false,
    reason: 'Confidence acceptable',
  }
}

/**
 * Cost estimator for pipeline planning
 */
export const MODEL_COSTS = {
  'gemini-1.5-flash': {
    input: 0.000075, // per 1K tokens
    output: 0.0003,
    image: 0.0001, // per image
  },
  'claude-3.5-sonnet': {
    input: 0.003, // per 1K tokens
    output: 0.015,
    image: 0.0048, // per image (estimated)
  },
} as const

export function estimateCost(
  model: keyof typeof MODEL_COSTS,
  inputTokens: number,
  outputTokens: number,
  imageCount: number = 1
): number {
  const costs = MODEL_COSTS[model]
  return (
    (inputTokens / 1000) * costs.input +
    (outputTokens / 1000) * costs.output +
    imageCount * costs.image
  )
}

/**
 * Log escalation decision for analytics
 */
export interface EscalationLog {
  documentId: string
  originalModel: 'gemini-1.5-flash'
  escalatedTo: 'claude-3.5-sonnet' | null
  reason: string
  originalConfidence: number
  escalatedConfidence?: number
  costSavings?: number // Positive if escalation was worth it
  timestamp: string
}
