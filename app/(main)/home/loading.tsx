import styles from '@/components/LoadingSkeleton/LoadingSkeleton.module.css'

export default function HomeLoading() {
  return (
    <div className={styles.loadingContainer}>
      {/* Hero Section - 60/40 Split */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--primary)',
        }}
      >
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(170deg, #030810 0%, var(--primary) 25%, #0a1a2e 60%, #0d1f35 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            padding: '140px 24px 60px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '2.5rem',
              alignItems: 'center',
              width: '100%',
              maxWidth: '1050px',
            }}
          >
            {/* Left column - Brand */}
            <div>
              {/* Eyebrow */}
              <div
                className={styles.skeletonDark}
                style={{ width: '200px', height: '0.65rem', marginBottom: '0.75rem' }}
              />
              {/* Headline */}
              <div
                className={styles.skeletonDark}
                style={{ width: '400px', height: '6rem', marginBottom: '0.5rem' }}
              />
              {/* Subhead */}
              <div
                className={styles.skeletonDark}
                style={{ width: '180px', height: '2.5rem', marginBottom: '1.5rem' }}
              />
              {/* Divider */}
              <div
                className={styles.skeletonDark}
                style={{ width: '60px', height: '2px', marginBottom: '1.5rem' }}
              />
              {/* Tagline */}
              <div
                className={styles.skeletonDark}
                style={{ width: '320px', height: '1rem', marginBottom: '0.75rem' }}
              />
              {/* Location */}
              <div
                className={styles.skeletonDark}
                style={{ width: '160px', height: '0.875rem', marginBottom: '2rem' }}
              />
              {/* CTAs */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div
                  className={styles.skeletonDark}
                  style={{ width: '150px', height: '48px', borderRadius: '4px' }}
                />
                <div
                  className={styles.skeletonDark}
                  style={{ width: '130px', height: '48px', borderRadius: '4px' }}
                />
              </div>
            </div>

            {/* Right column - Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                className={styles.skeletonCardDark}
                style={{
                  width: '320px',
                  height: '420px',
                  borderRadius: '8px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <div
            className={styles.skeletonDark}
            style={{ width: '280px', height: '0.875rem', margin: '0 auto' }}
          />
        </div>
      </section>

      {/* Blount Letter Section */}
      <section
        style={{
          background: 'var(--parchment)',
          padding: '5rem 1rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          className={styles.skeletonCard}
          style={{
            width: '100%',
            maxWidth: '700px',
            height: '400px',
            padding: '3rem',
          }}
        >
          {/* Document content skeleton */}
          <div
            className={styles.skeleton}
            style={{ width: '200px', height: '1rem', margin: '0 auto 2rem' }}
          />
          <div
            className={styles.skeletonHeading}
            style={{ width: '80%', height: '3rem', margin: '0 auto 2rem' }}
          />
          <div
            className={styles.skeleton}
            style={{ width: '90%', height: '1rem', margin: '0 auto 0.5rem' }}
          />
          <div
            className={styles.skeleton}
            style={{ width: '70%', height: '1rem', margin: '0 auto 2rem' }}
          />
          <div
            className={styles.skeleton}
            style={{ width: '150px', height: '1.5rem', margin: '0 auto' }}
          />
        </div>
      </section>

      {/* Experience Preview Section */}
      <section style={{ background: 'white', padding: '5rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              className={styles.skeleton}
              style={{ width: '100px', height: '0.75rem', margin: '0 auto 1rem' }}
            />
            <div
              className={styles.skeletonHeading}
              style={{ width: '300px', height: '2.5rem', margin: '0 auto 1rem' }}
            />
            <div
              className={styles.skeleton}
              style={{ width: '400px', maxWidth: '100%', height: '1rem', margin: '0 auto' }}
            />
          </div>

          {/* Cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={styles.skeletonCard}
                style={{
                  height: '280px',
                  padding: '2rem',
                }}
              >
                <div
                  className={styles.skeletonCircle}
                  style={{ width: '48px', height: '48px', marginBottom: '1.5rem' }}
                />
                <div
                  className={styles.skeleton}
                  style={{ width: '140px', height: '1.25rem', marginBottom: '1rem' }}
                />
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
            ))}
          </div>
        </div>
      </section>

      {/* Events Showcase Section */}
      <section style={{ background: 'var(--primary)', padding: '5rem 1rem', minHeight: '600px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              className={styles.skeletonDark}
              style={{ width: '100px', height: '0.75rem', margin: '0 auto 1rem' }}
            />
            <div
              className={styles.skeletonHeadingDark}
              style={{ width: '350px', height: '2.5rem', margin: '0 auto 1rem' }}
            />
          </div>

          {/* Event cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={styles.skeletonCardDark}
                style={{
                  height: '200px',
                  borderRadius: '8px',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ledger Section */}
      <section style={{ background: 'var(--parchment)', padding: '5rem 1rem', minHeight: '700px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div
            className={styles.skeletonHeading}
            style={{ width: '250px', height: '2rem', margin: '0 auto 3rem' }}
          />
          <div className={styles.skeletonCard} style={{ width: '100%', height: '400px' }} />
        </div>
      </section>

      {/* Story Section */}
      <section style={{ background: 'white', padding: '5rem 1rem', minHeight: '800px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div
            className={styles.skeleton}
            style={{ width: '120px', height: '0.75rem', margin: '0 auto 1.5rem' }}
          />
          <div
            className={styles.skeletonHeading}
            style={{ width: '400px', maxWidth: '100%', height: '3rem', margin: '0 auto 2rem' }}
          />
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={styles.skeleton}
              style={{ width: `${90 - i * 5}%`, height: '1rem', margin: '0 auto 0.75rem' }}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
