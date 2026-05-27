import styles from '@/components/LoadingSkeleton/LoadingSkeleton.module.css'

export default function LecturesLoading() {
  return (
    <div className={styles.loadingContainer}>
      {/* Hero Section */}
      <section
        style={{
          background: 'var(--primary)',
          padding: '7rem 1rem 5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          {/* Milestone badge */}
          <div
            className={styles.skeletonDark}
            style={{ width: '280px', height: '1rem', margin: '0 auto 1.5rem' }}
          />
          {/* Headline small */}
          <div
            className={styles.skeletonDark}
            style={{ width: '180px', height: '1rem', margin: '0 auto 0.5rem' }}
          />
          {/* Headline large */}
          <div
            className={styles.skeletonDark}
            style={{ width: '280px', height: '3rem', margin: '0 auto 1.5rem' }}
          />
          {/* Journey text */}
          <div
            className={styles.skeletonDark}
            style={{ width: '450px', maxWidth: '100%', height: '1.25rem', margin: '0 auto 2rem' }}
          />
          {/* Stats */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div
                  className={styles.skeletonDark}
                  style={{ width: '40px', height: '2rem', margin: '0 auto 0.5rem' }}
                />
                <div
                  className={styles.skeletonDark}
                  style={{ width: '60px', height: '0.75rem', margin: '0 auto' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lectures Timeline */}
      <section style={{ background: 'var(--parchment)', padding: '5rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Section header */}
          <div
            className={styles.skeletonHeading}
            style={{ width: '200px', height: '2rem', margin: '0 auto 3rem' }}
          />

          {/* Lecture cards */}
          {[1, 2, 3, 4, 5].map((lecture) => (
            <article
              key={lecture}
              style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: '3rem',
                paddingBottom: '3rem',
                borderBottom: '1px solid var(--gold-shimmer)',
              }}
            >
              {/* Date column */}
              <div style={{ width: '100px', flexShrink: 0 }}>
                <div
                  className={styles.skeleton}
                  style={{ width: '40px', height: '1rem', marginBottom: '0.25rem' }}
                />
                <div className={styles.skeleton} style={{ width: '30px', height: '2rem' }} />
              </div>

              {/* Content column */}
              <div style={{ flex: 1 }}>
                {/* Chapter number */}
                <div
                  className={styles.skeleton}
                  style={{ width: '80px', height: '0.75rem', marginBottom: '0.75rem' }}
                />
                {/* Title */}
                <div
                  className={styles.skeleton}
                  style={{ width: '250px', height: '1.5rem', marginBottom: '0.75rem' }}
                />
                {/* Speaker */}
                <div
                  className={styles.skeleton}
                  style={{ width: '180px', height: '1rem', marginBottom: '1rem' }}
                />
                {/* Description */}
                <div
                  className={styles.skeleton}
                  style={{ width: '100%', height: '0.875rem', marginBottom: '0.5rem' }}
                />
                <div
                  className={styles.skeleton}
                  style={{ width: '90%', height: '0.875rem', marginBottom: '0.5rem' }}
                />
                <div className={styles.skeleton} style={{ width: '60%', height: '0.875rem' }} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
