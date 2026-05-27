import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight">
      <div className="text-center px-4">
        <h1 className="text-4xl font-serif mb-4 text-gold-leaf">Person Not Found</h1>
        <p className="mb-8 opacity-60 text-cream">This person doesn&apos;t exist in our archive.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/evidence/people"
            className="px-6 py-3 rounded-lg bg-gold-leaf text-midnight min-h-[44px] inline-flex items-center"
          >
            View All People
          </Link>
          <Link
            href="/evidence"
            className="px-6 py-3 rounded-lg border border-gold-leaf/30 text-gold-leaf min-h-[44px] inline-flex items-center"
          >
            Back to Evidence Room
          </Link>
        </div>
      </div>
    </div>
  )
}
