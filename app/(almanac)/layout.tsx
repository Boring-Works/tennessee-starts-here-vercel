import Link from 'next/link'
import './almanac-layout.css'

export default function AlmanacLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Link
        href="/"
        className="almanac-home-button"
        aria-label="Return to Rocky Mount"
        title="Return to Rocky Mount"
      >
        <span className="home-button-text">RM</span>
      </Link>
      {children}
    </>
  )
}
