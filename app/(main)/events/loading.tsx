import styles from '@/components/LoadingSkeleton/LoadingSkeleton.module.css'

export default function EventsLoading() {
  return (
    <div className={styles.loadingContainer}>
      {/* Header skeleton */}
      <section
        style={{
          background: 'var(--primary)',
          padding: '7rem 1rem 4rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div
            className={styles.skeletonDark}
            style={{ width: '200px', height: '0.7rem', margin: '0 auto 1.5rem' }}
          />
          {/* Year */}
          <div
            className={styles.skeletonDark}
            style={{ width: '80px', height: '1rem', margin: '0 auto 0.5rem' }}
          />
          {/* Headline */}
          <div
            className={styles.skeletonDark}
            style={{ width: '300px', height: '3rem', margin: '0 auto 1.25rem' }}
          />
          {/* Subheadline */}
          <div
            className={styles.skeletonDark}
            style={{ width: '400px', maxWidth: '100%', height: '1.25rem', margin: '0 auto 2.5rem' }}
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
            {[1, 2, 3, 4].map((i) => (
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

      {/* Year progress bar skeleton */}
      <nav
        style={{
          position: 'sticky',
          top: '64px',
          background: 'var(--parchment)',
          borderBottom: '1px solid var(--gold-shimmer)',
          padding: '1rem',
          zIndex: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                className={styles.skeletonCircle}
                style={{ width: '8px', height: '8px', margin: '0 auto 0.25rem' }}
              />
              <div className={styles.skeleton} style={{ width: '24px', height: '0.6rem' }} />
            </div>
          ))}
        </div>
      </nav>

      {/* Month sections skeleton */}
      <section style={{ padding: '3rem 1rem', background: 'var(--parchment)' }}>
        {[1, 2, 3].map((month) => (
          <article
            key={month}
            style={{
              maxWidth: '72rem',
              margin: '0 auto 4rem',
            }}
          >
            {/* Month header */}
            <header
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                borderBottom: '1px solid var(--gold-shimmer)',
                paddingBottom: '1rem',
                marginBottom: '2rem',
              }}
            >
              <div>
                <div
                  className={styles.skeletonHeading}
                  style={{ width: '120px', height: '2.5rem', marginBottom: '0.5rem' }}
                />
                <div className={styles.skeleton} style={{ width: '160px', height: '1rem' }} />
              </div>
              <div className={styles.skeleton} style={{ width: '80px', height: '1rem' }} />
            </header>

            {/* Events grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {[1, 2, 3, 4].map((event) => (
                <div
                  key={event}
                  className={styles.skeletonCard}
                  style={{
                    height: '200px',
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '4px',
                  }}
                >
                  {/* Date block */}
                  <div
                    className={styles.skeleton}
                    style={{ width: '60px', height: '60px', marginBottom: '1rem' }}
                  />
                  {/* Badge */}
                  <div
                    className={styles.skeleton}
                    style={{ width: '80px', height: '0.75rem', marginBottom: '0.75rem' }}
                  />
                  {/* Title */}
                  <div
                    className={styles.skeleton}
                    style={{ width: '180px', height: '1.25rem', marginBottom: '0.5rem' }}
                  />
                  {/* Description */}
                  <div
                    className={styles.skeleton}
                    style={{ width: '100%', height: '0.875rem', marginBottom: '0.25rem' }}
                  />
                  <div className={styles.skeleton} style={{ width: '80%', height: '0.875rem' }} />
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
