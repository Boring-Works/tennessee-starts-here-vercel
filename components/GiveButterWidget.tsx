'use client'

/**
 * GiveButter Widget Component
 *
 * Renders a button that triggers the GiveButter widget.
 * Assumes the GiveButter script is loaded globally (e.g., in layout.tsx).
 */
export function GiveButterWidget() {
  const openWidget = () => {
    // @ts-expect-error - GiveButter adds this to window
    if (typeof window !== 'undefined' && window.givebutter) {
      // @ts-expect-error - GiveButter adds this to window
      window.givebutter('open')
    }
  }

  return (
    <button
      onClick={openWidget}
      className="inline-flex items-center justify-center bg-accent text-primary px-6 py-3 font-bold uppercase tracking-wider hover:bg-accent-light transition-colors rounded-sm"
    >
      Donate / Tickets
    </button>
  )
}
