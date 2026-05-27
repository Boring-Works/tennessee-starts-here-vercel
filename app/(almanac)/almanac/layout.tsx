import type { Metadata } from 'next'
import { PAGE_METADATA } from '@/lib/copy/metadata'

export const metadata: Metadata = {
  title: PAGE_METADATA.almanac.title,
  description: PAGE_METADATA.almanac.description,
  openGraph: {
    title: PAGE_METADATA.almanac.ogTitle,
    description: PAGE_METADATA.almanac.ogDescription,
    url: 'https://tennesseestartshere.com/almanac',
  },
}

export default function AlmanacLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
