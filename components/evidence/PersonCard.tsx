'use client'

import Link from 'next/link'
import * as HoverCard from '@radix-ui/react-hover-card'

interface PersonCardProps {
  person: {
    id: string
    name: string
    name_cherokee?: string
    role?: string
    bio_short?: string
  }
  showCherokeeName?: boolean
}

export function PersonCard({ person, showCherokeeName = true }: PersonCardProps) {
  // Build display name: Cherokee (English) or just English
  const displayName =
    showCherokeeName && person.name_cherokee
      ? `${person.name_cherokee} (${person.name})`
      : person.name

  return (
    <HoverCard.Root openDelay={200} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <span
          className="
            cursor-pointer
            text-[#8b4513] hover:text-[var(--gold-hover)]
            border-b border-dotted border-[#8b4513]/40 hover:border-[var(--gold-hover)]/60
            transition-colors duration-300
          "
        >
          {displayName}
        </span>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          className="
            w-80 p-5
            bg-gradient-to-br from-[#fffef8] via-[#faf7f0] to-[#f5f0e6]
            border border-[var(--gold-primary)]/30
            rounded-sm
            shadow-[0_4px_16px_rgba(42,31,26,0.12),0_8px_24px_rgba(201,162,39,0.08)]
            z-50
            animate-in fade-in-0 zoom-in-95
            data-[side=bottom]:slide-in-from-top-2
            data-[side=top]:slide-in-from-bottom-2
          "
          sideOffset={8}
          align="start"
        >
          {/* Brass accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--gold-hover)] via-[var(--gold-primary)] to-[var(--gold-hover)] rounded-t-sm" />

          {/* Name section */}
          <div className="mb-3 pb-3 border-b border-[#2a1f1a]/10">
            {person.name_cherokee && (
              <h4
                className="
                  font-serif text-lg text-[#2a1f1a]
                  tracking-wide mb-1
                "
              >
                {person.name_cherokee}
              </h4>
            )}
            <p
              className={`
                font-serif text-[#4a443e]
                ${person.name_cherokee ? 'text-sm italic' : 'text-lg text-[#2a1f1a]'}
              `}
            >
              {person.name}
            </p>
          </div>

          {/* Role */}
          {person.role && (
            <p
              className="
                text-xs uppercase tracking-[0.15em]
                text-[var(--gold-primary)] font-medium
                mb-3
              "
            >
              {person.role}
            </p>
          )}

          {/* Bio preview */}
          {person.bio_short && (
            <p
              className="
                font-serif text-sm text-[#4a443e]
                leading-relaxed
                mb-4
              "
            >
              {person.bio_short}
            </p>
          )}

          {/* Link to full profile */}
          <Link
            href={`/evidence/people/${person.id}`}
            className="
              inline-flex items-center gap-2
              font-serif text-sm text-[#8b4513] hover:text-[var(--gold-hover)]
              transition-colors duration-300
              group
            "
          >
            <span>View full profile</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>

          <HoverCard.Arrow className="fill-[#fffef8]" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
