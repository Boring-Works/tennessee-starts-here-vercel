interface Speaker {
  name: string
  title: string
  institution?: string
  bio: string
  portraying?: string
}

interface LectureCardProps {
  number: number
  title: string
  date: string
  time: string
  speaker: Speaker
  description: string
  topics: string[]
  format?: string
  note?: string
}

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function LectureCard({
  number,
  title,
  date,
  time,
  speaker,
  description,
  topics,
  format,
  note,
}: LectureCardProps) {
  return (
    <article className="card-hover bg-white border border-gray-200 rounded-sm overflow-hidden shadow-md">
      {/* Accent top bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

      {/* Header */}
      <header className="bg-primary text-white px-6 py-5 relative">
        {/* Medallion */}
        <div
          className="absolute -bottom-6 right-6 w-12 h-12 rounded-full border-2 border-accent bg-primary flex items-center justify-center shadow-lg z-10"
          aria-hidden="true"
        >
          <span className="font-serif font-bold text-accent text-lg">{number}</span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">
            Lecture {number}
          </span>
          <span className="text-white/60" aria-hidden="true">
            •
          </span>
          <time className="text-white text-sm">{time}</time>
        </div>
        <h3 className="font-serif text-xl md:text-2xl font-bold pr-16">{title}</h3>
        <time dateTime={date} className="text-white/90 text-sm mt-1 block">
          {formatDate(date)}
        </time>
      </header>

      {/* Content */}
      <div className="p-6 pt-8">
        {/* Speaker Info */}
        <div className="mb-5 pb-5 border-b border-gray-100">
          <p className="font-serif font-bold text-primary text-lg">
            {speaker.portraying ? `${speaker.name} as ${speaker.portraying}` : speaker.name}
          </p>
          <p className="text-secondary font-medium">
            {speaker.title}
            {speaker.institution &&
              speaker.institution !== 'Independent Scholar' &&
              `, ${speaker.institution}`}
          </p>
        </div>

        {/* Description */}
        <p className="text-foreground leading-relaxed mb-5">{description}</p>

        {/* Topics */}
        <div className="mb-5">
          <p className="text-sm uppercase tracking-widest text-secondary font-semibold mb-3">
            Topics Covered
          </p>
          <ul className="space-y-2">
            {topics.map((topic, index) => (
              <li key={index} className="flex items-start gap-2 text-text-light">
                <span className="text-accent mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {/* Format / Note */}
        {(format || note) && (
          <div className="bg-cream rounded-sm p-4 text-sm border-l-4 border-secondary/50 mb-5">
            {format && <p className="text-secondary font-semibold mb-1">Format: {format}</p>}
            {note && <p className="text-text-light italic">{note}</p>}
          </div>
        )}

        {/* Speaker Bio */}
        <details className="group">
          <summary className="cursor-pointer text-primary font-semibold hover:text-secondary transition-colors flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm">
            <svg
              className="w-4 h-4 transition-transform group-open:rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            About the Speaker
          </summary>
          <p className="mt-3 text-text-light text-sm leading-relaxed pl-6 border-l-2 border-gray-100">
            {speaker.bio}
          </p>
        </details>
      </div>
    </article>
  )
}
