import dynamic from 'next/dynamic'
import Script from 'next/script'
import Navigation from '@/components/Navigation'
import MobileStickyCTA from '@/components/MobileStickyCTA'
import ScrollProgress from '@/components/ScrollProgress'
import Analytics from '@/components/Analytics'
import SkipLinks from '@/components/SkipLinks'

// Dynamic import for Footer (code splitting, SSR enabled)
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => (
    <footer
      style={{
        minHeight: '400px',
        background: 'var(--primary)',
        animation: 'pulse 2s ease-in-out infinite',
      }}
    />
  ),
})

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SkipLinks showNavigationLink />
      <Analytics />
      <ScrollProgress />
      <Navigation />
      <main id="main-content" className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileStickyCTA />

      {/* FareHarbor Lightframe Script - Enables booking modal overlay */}
      <Script
        src="https://fareharbor.com/embeds/script/calendar/rockymountmuseum/?fallback=simple"
        strategy="lazyOnload"
      />

      {/* GiveButter Widget Script */}
      <Script id="givebutter-init" strategy="lazyOnload">
        {`
          window.givebutter = window.givebutter || function () { (window.givebutter.q = window.givebutter.q || []).push(arguments) };
          window.givebutter.l = +new Date;
          // Only initialize if ID is present
          const givebutterId = '${process.env.NEXT_PUBLIC_GIVEBUTTER_ID || ''}';
          if (givebutterId) {
            window.givebutter('set', 'id', givebutterId);
          }
        `}
      </Script>
      <Script src="https://js.givebutter.com/js/widget.js" strategy="lazyOnload" />
    </>
  )
}
