
import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href: string
}

export interface PageHeaderProps {
  /** The main page title (renders as h1) */
  title: string
  /** Optional subtitle or description */
  description?: string
  /** Breadcrumb navigation items */
  breadcrumbs?: BreadcrumbItem[]
  /** Optional decorative flourish */
  showFlourish?: boolean
  /** Background variant */
  variant?: 'light' | 'dark' | 'cream'
  /** Additional CSS classes */
  className?: string
}

/**
 * PageHeader - Semantic page header component
 *
 * Ensures proper heading hierarchy, breadcrumb navigation, and accessibility
 * for all pages. Provides consistent structure for SEO and screen readers.
 *
 * @example
 * <PageHeader
 *   title="Evidence Library"
 *   description="Explore primary sources from Tennessee's founding"
 *   breadcrumbs={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Evidence', href: '/evidence' },
 *     { label: 'Library', href: '/evidence/library' }
 *   ]}
 *   showFlourish
 * />
 */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  showFlourish = false,
  variant = 'light',
  className = '',
}: PageHeaderProps) {
  const bgColors = {
    light: 'bg-cream',
    dark: 'bg-primary text-white',
    cream: 'bg-cream-dark',
  }

  const textColors = {
    light: 'text-primary',
    dark: 'text-white',
    cream: 'text-primary',
  }

  const breadcrumbColors = {
    light: 'text-text-light hover:text-accent',
    dark: 'text-white/70 hover:text-accent',
    cream: 'text-text-light hover:text-accent',
  }

  return (
    <header className={`${bgColors[variant]} py-12 md:py-16 ${className}`} aria-label="Page header">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {!isLast ? (
                      <>
                        <Link
                          href={crumb.href}
                          className={`${breadcrumbColors[variant]} transition-colors font-medium`}
                        >
                          {crumb.label}
                        </Link>
                        <span
                          className={variant === 'dark' ? 'text-white/50' : 'text-text-light'}
                          aria-hidden="true"
                        >
                          /
                        </span>
                      </>
                    ) : (
                      <span className={`${textColors[variant]} font-semibold`} aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        {/* Main Heading */}
        <div className="text-center">
          {showFlourish && (
            <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
              <span className="text-accent/60 text-sm">❧</span>
              <span className="text-accent/40 text-xs">✦</span>
              <span className="text-accent/60 text-sm">❧</span>
            </div>
          )}

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-serif-elegant font-bold ${textColors[variant]} mb-4`}
          >
            {title}
          </h1>

          {description && (
            <p
              className={`text-lg md:text-xl max-w-3xl mx-auto ${
                variant === 'dark' ? 'text-white/80' : 'text-text-light'
              }`}
            >
              {description}
            </p>
          )}

          {showFlourish && (
            <div className="flex items-center justify-center gap-3 mt-6" aria-hidden="true">
              <span className="h-px w-12 bg-accent/30"></span>
              <span className="text-accent/60 text-xs">✦</span>
              <span className="h-px w-12 bg-accent/30"></span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
