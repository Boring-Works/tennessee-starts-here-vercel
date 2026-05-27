'use client'

interface SectionDividerProps {
  label: string
}

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-4 py-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-almanac-gold/40 to-almanac-gold/40" />
      <span className="text-base font-serif text-almanac-gold/80 tracking-wide uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-almanac-gold/40 to-almanac-gold/40" />
    </div>
  )
}
