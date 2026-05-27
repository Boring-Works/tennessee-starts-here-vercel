'use client'

import Image from 'next/image'
import { memo } from 'react'

interface OriginalSevenMapImageProps {
  variant?: 'hero' | 'inline' | 'compact'
  className?: string
}

function OriginalSevenMapImageComponent({
  variant = 'inline',
  className = '',
}: OriginalSevenMapImageProps) {
  const sizes = {
    hero: { width: 900, height: 500 },
    inline: { width: 700, height: 400 },
    compact: { width: 400, height: 230 },
  }

  const size = sizes[variant]

  return (
    <div className={`original-seven-map-image ${className}`}>
      <figure style={{ margin: 0 }}>
        <Image
          src="/images/original-seven-map-1790.png"
          alt="Map of Tennessee at the beginning of 1790, showing approximate county divisions within present state boundaries. The seven original counties are Sullivan, Washington, Hawkins, Greene (in the east), and Davidson, Sumner, Tennessee (in the west). The western portion is labeled as Indian Lands."
          width={size.width}
          height={size.height}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: size.width,
            borderRadius: '4px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
          priority={variant === 'hero'}
        />
        <figcaption
          style={{
            marginTop: '0.75rem',
            fontSize: '0.8125rem',
            color: 'var(--text-light, #666)',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          Tennessee at the beginning of 1790 — Map by L. Pork Danville
        </figcaption>
      </figure>
    </div>
  )
}

export const OriginalSevenMapImage = memo(OriginalSevenMapImageComponent)
