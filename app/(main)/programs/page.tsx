import type { Metadata } from 'next'
import { ProgramsContent } from './ProgramsContent'
import { PAGE_METADATA } from '@/lib/copy/metadata'

export const metadata: Metadata = {
  title: PAGE_METADATA.programs.title,
  description: PAGE_METADATA.programs.description,
  openGraph: {
    title: PAGE_METADATA.programs.ogTitle,
    description: PAGE_METADATA.programs.ogDescription,
    url: 'https://tennesseestartshere.com/programs',
  },
}

export default function ProgramsPage() {
  return <ProgramsContent />
}
