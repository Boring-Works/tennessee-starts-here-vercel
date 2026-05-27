import Link from 'next/link'
import { SiteHeader } from '@/components/welcome/SiteHeader'
import { StoryHook } from '@/components/welcome/StoryHook'
import { BrandStatement } from '@/components/welcome/BrandStatement'
import { DualPeaks } from '@/components/welcome/DualPeaks'
import { CTAGroup } from '@/components/welcome/CTAGroup'
import { BUTTONS, PAGE_METADATA, PRIMARY_QUOTES } from '@/lib/copy'
import './welcome.css'

export const metadata = {
  title: PAGE_METADATA.welcome.title,
  description: PAGE_METADATA.welcome.description,
  openGraph: {
    title: PAGE_METADATA.welcome.ogTitle,
    description: PAGE_METADATA.welcome.ogDescription,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_METADATA.welcome.ogTitle,
    description: PAGE_METADATA.welcome.ogDescription,
  },
}

const peaks: [
  { label: string; date: string; targetDate: string },
  { label: string; date: string; targetDate: string },
] = [
  {
    label: 'TENNESSEE 230',
    date: 'June 13-14',
    targetDate: '2026-06-13',
  },
  {
    label: 'AMERICA 250',
    date: 'July 4',
    targetDate: '2026-07-04',
  },
]

export default function WelcomePage() {
  return (
    <main id="main-content" className="welcome-page">
      <SiteHeader />

      <div className="welcome-container">
        <StoryHook line1="Before there was a Tennessee," line2="there was this ground." />

        <blockquote className="washingtons-question">
          <p>&ldquo;{PRIMARY_QUOTES.washingtonsQuestion.text}&rdquo;</p>
          <cite>— {PRIMARY_QUOTES.washingtonsQuestion.attribution}</cite>
        </blockquote>

        <BrandStatement
          headline="ROCKY MOUNT"
          descriptor="First Capital of the Southwest Territory · 1790"
          tagline="Tennessee Starts Here"
        />

        <DualPeaks peaks={peaks} />

        <CTAGroup
          primaryText={BUTTONS.enter.toUpperCase()}
          primaryHref="/home"
          secondaryText="Be One of the First 250 · Enrollment closes June 1"
          secondaryHref="/first-250"
          archiveText="Explore the Evidence"
          archiveDescription="Read the original documents from Tennessee's founding."
          archiveHref="/evidence"
        />

        {/* Almanac Link */}
        <Link
          href="/almanac"
          className="almanac-link"
          aria-label="The 1775 Almanac - Weather and farming wisdom"
        >
          ☀ The 1775 Almanac
        </Link>
      </div>
    </main>
  )
}
