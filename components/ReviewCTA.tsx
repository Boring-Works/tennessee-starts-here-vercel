import integrations from '@/data/integrations.json'

/**
 * ReviewCTA Component (Server Component)
 *
 * Encourages visitors to leave reviews on popular platforms.
 * Displays platform buttons linking to Google, TripAdvisor, and Facebook reviews.
 * No 'use client' - this is a pure Server Component.
 */

interface ReviewPlatform {
  name: string
  icon: React.ReactNode
  url: string
  color: string
}

interface ReviewCTAProps {
  /** Visual variant: standalone section or inline footer integration */
  variant?: 'standalone' | 'footer'
  /** Additional CSS classes */
  className?: string
  /** Custom headline text */
  headline?: string
  /** Custom subtext message */
  subtext?: string
}

// Google Reviews Icon
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
)

// TripAdvisor Icon
const TripAdvisorIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 6.63 5.37 12 12 12s12-5.37 12-12-5.37-12-12-12zm0 2.4c5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6-9.6-4.3-9.6-9.6 4.3-9.6 9.6-9.6z" />
    <path d="M8.4 7.2c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4-1.1-2.4-2.4-2.4zm7.2 0c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4-1.1-2.4-2.4-2.4zm-3.6 7.2c-2.7 0-4.8 2.1-4.8 4.8v2.4h9.6v-2.4c0-2.7-2.1-4.8-4.8-4.8z" />
  </svg>
)

// Facebook Icon
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

export function ReviewCTA({
  variant = 'standalone',
  className = '',
  headline = 'Share Your Experience',
  subtext = 'Enjoyed your visit? Help future visitors discover Rocky Mount. Your review helps families plan their Tennessee adventure.',
}: ReviewCTAProps) {
  // Extract review URLs from integrations.json
  const googleReviewUrl = integrations.integrations.reviews.platforms.google.reviewUrl
  const tripadvisorUrl = integrations.integrations.reviews.platforms.tripadvisor.url
  const facebookReviewUrl = integrations.integrations.reviews.platforms.facebook.reviewUrl

  const reviewPlatforms: ReviewPlatform[] = [
    {
      name: 'Google Reviews',
      icon: <GoogleIcon />,
      url: googleReviewUrl,
      color: 'hover:bg-[#4285F4] hover:text-white',
    },
    {
      name: 'TripAdvisor',
      icon: <TripAdvisorIcon />,
      url: tripadvisorUrl,
      color: 'hover:bg-[#00A699] hover:text-white',
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      url: facebookReviewUrl,
      color: 'hover:bg-[#1877F2] hover:text-white',
    },
  ]

  const isStandalone = variant === 'standalone'

  return (
    <section
      className={`${
        isStandalone
          ? 'bg-gradient-to-br from-[#faf8f5] to-[#f0ebe3] py-16 md:py-20'
          : 'py-8 md:py-10'
      } px-6 ${className}`}
      aria-labelledby="review-heading"
    >
      <div className={`max-w-2xl mx-auto ${isStandalone ? 'text-center' : ''}`}>
        {/* Decorative top flourish for standalone */}
        {isStandalone && (
          <div className="flex items-center justify-center gap-3 mb-8" aria-hidden="true">
            <span className="w-12 h-px" style={{ backgroundColor: 'rgba(201, 162, 39, 0.3)' }} />
            <span className="text-sm" style={{ color: 'var(--gold-primary)' }}>
              ✦
            </span>
            <span className="w-12 h-px" style={{ backgroundColor: 'rgba(201, 162, 39, 0.3)' }} />
          </div>
        )}

        {/* Headline */}
        <h2
          id="review-heading"
          className="font-serif text-2xl md:text-3xl font-bold mb-3"
          style={{ color: 'var(--primary)' }}
        >
          {headline}
        </h2>

        {/* Supporting message */}
        <p className="text-base md:text-lg mb-8" style={{ color: 'var(--text-light)' }}>
          {subtext}
        </p>

        {/* CTA text */}
        <p
          className="text-sm font-semibold mb-6 uppercase tracking-wider"
          style={{ color: 'var(--primary)' }}
        >
          Leave a review on:
        </p>

        {/* Platform buttons grid */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          {reviewPlatforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: 'white',
                border: '2px solid rgba(201, 162, 39, 0.2)',
                color: 'var(--primary)',
              }}
              className={`
                inline-flex items-center justify-center gap-2
                px-6 py-3 rounded-lg
                font-semibold
                transition-all duration-300 ease-out
                hover:shadow-lg hover:-translate-y-1
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                ${platform.color}
              `}
              aria-label={`Leave a review on ${platform.name}`}
            >
              {platform.icon}
              <span className="hidden xs:inline">{platform.name}</span>
            </a>
          ))}
        </div>

        {/* Closing tagline for standalone */}
        {isStandalone && (
          <div className="mt-10">
            <p className="text-sm italic" style={{ color: 'rgba(201, 162, 39, 0.8)' }}>
              Thank you for visiting Rocky Mount State Historic Site.
            </p>
            {/* Decorative bottom flourish */}
            <div className="flex items-center justify-center gap-3 mt-6" aria-hidden="true">
              <span className="text-xs" style={{ color: 'rgba(201, 162, 39, 0.4)' }}>
                ❧
              </span>
              <span className="w-8 h-px" style={{ backgroundColor: 'rgba(201, 162, 39, 0.2)' }} />
              <span className="text-xs" style={{ color: 'rgba(201, 162, 39, 0.4)' }}>
                ❧
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
