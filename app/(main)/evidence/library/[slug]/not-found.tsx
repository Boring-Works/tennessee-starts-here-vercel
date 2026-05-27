import Link from 'next/link'

export default function DocumentNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight">
      <div className="text-center px-4">
        <h1 className="text-4xl font-serif mb-4 text-gold-leaf">Document Not Found</h1>
        <p className="mb-8 opacity-60 text-cream">
          This document could not be located in the archive.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/evidence/library"
            className="px-6 py-3 rounded-lg bg-gold-leaf text-midnight min-h-[44px] inline-flex items-center"
          >
            Document Library
          </Link>
          <Link
            href="/evidence"
            className="px-6 py-3 rounded-lg border border-gold-leaf/30 text-gold-leaf min-h-[44px] inline-flex items-center"
          >
            Evidence Room
          </Link>
        </div>
      </div>
    </div>
  )
}
