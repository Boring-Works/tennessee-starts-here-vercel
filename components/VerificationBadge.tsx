import { AlertTriangle, CheckCircle2, Info } from 'lucide-react'

interface VerificationBadgeProps {
  status: 'verified' | 'nuance' | 'unverified' | 'single-source'
  notes?: string
  sourceCount?: number
  method?: string
  className?: string
}

export function VerificationBadge({
  status,
  notes,
  sourceCount,
  method,
  className = '',
}: VerificationBadgeProps) {
  if (status === 'verified') {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-md bg-green-50 px-3 py-1.5 text-sm font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400 ${className}`}
      >
        <CheckCircle2 className="h-4 w-4" />
        <span>Verified</span>
        {sourceCount && sourceCount > 0 && (
          <span className="text-xs opacity-75">({sourceCount} sources)</span>
        )}
      </div>
    )
  }

  if (status === 'single-source') {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-md bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 ${className}`}
      >
        <AlertTriangle className="h-4 w-4" />
        <span>Single Source</span>
        {notes && (
          <span className="text-xs opacity-75" title={notes}>
            (1 source only)
          </span>
        )}
      </div>
    )
  }

  if (status === 'nuance') {
    return (
      <details
        className={`group rounded-md border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 ${className}`}
      >
        <summary className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm font-medium text-amber-800 dark:text-amber-400">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <span>Requires Context</span>
          <span className="ml-auto text-xs opacity-75">Click for details</span>
        </summary>
        <div className="border-t border-amber-200 bg-amber-50/50 px-3 py-2 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/10 dark:text-amber-300">
          {notes ? (
            <div className="space-y-2">
              <p className="font-medium">Important Context:</p>
              <p className="whitespace-pre-wrap">{notes}</p>
              {method && (
                <p className="text-xs opacity-75">
                  <strong>Verification method:</strong> {method}
                </p>
              )}
            </div>
          ) : (
            <p>This claim requires additional context. See source notes below.</p>
          )}
        </div>
      </details>
    )
  }

  // status === 'unverified'
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400 ${className}`}
    >
      <Info className="h-4 w-4" />
      <span>Research in Progress</span>
      {notes && (
        <span className="text-xs opacity-75" title={notes}>
          (More info available)
        </span>
      )}
    </div>
  )
}

/**
 * Compact version for lists/cards
 */
export function VerificationBadgeCompact({
  status,
  className = '',
}: Pick<VerificationBadgeProps, 'status' | 'className'>) {
  if (status === 'verified') {
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400 ${className}`}
        title="Verified by multiple primary sources"
      >
        <CheckCircle2 className="h-3 w-3" />
        Verified
      </span>
    )
  }

  if (status === 'single-source') {
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs font-medium text-yellow-700 dark:text-yellow-400 ${className}`}
        title="Verified by single source only"
      >
        <AlertTriangle className="h-3 w-3" />
        Single Source
      </span>
    )
  }

  if (status === 'nuance') {
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 ${className}`}
        title="Requires additional context - click to view details"
      >
        <AlertTriangle className="h-3 w-3" />
        Context Required
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium text-blue-700 dark:text-blue-400 ${className}`}
      title="Research in progress"
    >
      <Info className="h-3 w-3" />
      In Progress
    </span>
  )
}
