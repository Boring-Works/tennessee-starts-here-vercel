import type { Metadata } from 'next'
import { PAGE_METADATA } from '@/lib/copy/metadata'

export const metadata: Metadata = {
  title: PAGE_METADATA.lectures.title,
  description: PAGE_METADATA.lectures.description,
  openGraph: {
    title: PAGE_METADATA.lectures.ogTitle,
    description: PAGE_METADATA.lectures.ogDescription,
    url: 'https://tennesseestartshere.com/lectures',
  },
}

export default function LecturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
