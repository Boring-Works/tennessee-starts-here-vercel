'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

// Full list of Treaty of Holston signatories (42 Cherokee leaders)
const ALL_TREATY_SIGNERS = [
  {
    cherokeeName: 'Squollecuttah',
    englishName: 'Hanging Maw',
    role: 'Principal Chief of the Overhill Cherokee',
  },
  {
    cherokeeName: 'Nenetooyah',
    englishName: 'Bloody Fellow',
    role: 'War chief, given name "Clear Sky" by President Washington',
  },
  {
    cherokeeName: 'Kunoskeskie',
    englishName: 'John Watts',
    role: 'Succeeded Dragging Canoe as head of the war council',
  },
  {
    cherokeeName: 'Chuquilatague',
    englishName: 'Doublehead',
    role: 'One of the most feared warriors of the Cherokee-American wars',
  },
  {
    cherokeeName: 'Enoleh',
    englishName: 'Black Fox',
    role: 'Later served as Principal Chief, 1801-1811',
  },
  // Additional signatories
  {
    cherokeeName: 'Nontuaka',
    englishName: 'Northward',
    role: 'Cherokee leader from the Lower Towns',
  },
  {
    cherokeeName: 'Teesteke',
    englishName: 'Common Disturber',
    role: 'War leader who later worked for peace',
  },
  {
    cherokeeName: 'Chutloh',
    englishName: 'Kingfisher',
    role: 'Leader of Chilhowee',
  },
  {
    cherokeeName: 'Sequechee',
    englishName: 'Boot',
    role: 'Represented the Middle Towns',
  },
  {
    cherokeeName: 'Tuckasee',
    englishName: 'Terrapin',
    role: 'Negotiated on behalf of his town',
  },
  {
    cherokeeName: 'Kateh',
    englishName: 'Public Hair',
    role: 'Cherokee diplomat',
  },
  {
    cherokeeName: 'Kunnockatookee',
    englishName: 'Crane',
    role: 'Overhill town representative',
  },
  {
    cherokeeName: 'Cauquilehee',
    englishName: 'Thigh',
    role: 'Signed on behalf of his clan',
  },
  {
    cherokeeName: 'Chescoonwho',
    englishName: 'Bird in Close',
    role: 'Cherokee elder',
  },
  {
    cherokeeName: 'Tullotehe',
    englishName: 'Two Killer',
    role: 'War leader turned peacemaker',
  },
] as const

const SOURCE_LINKS = {
  digiTreatiesHolston: 'https://digitreaties.org/treaties/treaty/88697242/',
} as const

interface SignerCardProps {
  cherokeeName: string
  englishName: string
  role: string
}

function SignerCard({ cherokeeName, englishName, role }: SignerCardProps) {
  return (
    <div className={styles.signerCard}>
      <p className={styles.signerCherokeeName}>{cherokeeName}</p>
      <p className={styles.signerEnglishName}>{englishName}</p>
      <p className={styles.signerRole}>{role}</p>
    </div>
  )
}

export function TreatySigners() {
  const [isExpanded, setIsExpanded] = useState(false)

  const displayedSigners = isExpanded ? ALL_TREATY_SIGNERS : ALL_TREATY_SIGNERS.slice(0, 5)
  const remainingCount = ALL_TREATY_SIGNERS.length - 5

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  return (
    <section
      id="treaty-signers"
      className={styles.signersSection}
      aria-labelledby="treaty-signers-heading"
    >
      <div className={styles.container}>
        <span className={styles.collectionLabel}>TREATY.1791.001 — Holston Signatories</span>
        <h2 id="treaty-signers-heading" className={styles.sectionTitle}>
          Those Who Signed
        </h2>
        <p className={styles.sectionSubtitle}>
          {isExpanded ? 'Fifteen' : 'Five'} of the forty-two Cherokee leaders who signed the Treaty of Holston
        </p>

        <div className={styles.signersIntro}>
          <p>
            On July 2, 1791, after weeks of negotiation at White&apos;s Fort, these leaders signed
            on behalf of the Cherokee Nation. Their names are preserved in the treaty record.
          </p>
        </div>

        <div className={styles.signersList}>
          {displayedSigners.map((signer) => (
            <SignerCard
              key={signer.cherokeeName}
              cherokeeName={signer.cherokeeName}
              englishName={signer.englishName}
              role={signer.role}
            />
          ))}
        </div>

        {/* Expand/Collapse Button */}
        {!isExpanded && (
          <button
            type="button"
            onClick={handleToggle}
            className={styles.signersExpandButton}
            aria-expanded={isExpanded}
            aria-controls="treaty-signers-list"
          >
            Show {remainingCount} more signatories
          </button>
        )}

        {isExpanded && (
          <button
            type="button"
            onClick={handleToggle}
            className={styles.signersCollapseButton}
            aria-expanded={isExpanded}
          >
            Show fewer signatories
          </button>
        )}

        <div className={styles.signersFooter}>
          <Link href="/evidence/people" className={styles.signersLink}>
            View all 42 signatories with full biographies
          </Link>
          <a
            href={SOURCE_LINKS.digiTreatiesHolston}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.signersLink}
          >
            View treaty manuscript at DigiTreaties
          </a>

          <p className={styles.signersDescendants}>
            The Cherokee Nation, Eastern Band of Cherokee Indians, and United Keetoowah Band carry
            these names forward today.
          </p>
        </div>
      </div>
    </section>
  )
}
