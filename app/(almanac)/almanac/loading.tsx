import styles from '@/components/LoadingSkeleton/LoadingSkeleton.module.css'

export default function AlmanacLoading() {
  return (
    <div
      className={styles.loadingContainer}
      style={{
        background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
        minHeight: '100vh',
        padding: '2rem 1rem',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Hero section */}
        <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {/* Date */}
          <div
            className={styles.skeletonDark}
            style={{ width: '160px', height: '0.875rem', margin: '0 auto 1rem' }}
          />
          {/* Location */}
          <div
            className={styles.skeletonDark}
            style={{ width: '140px', height: '1rem', margin: '0 auto 1.5rem' }}
          />
          {/* Temperature */}
          <div
            className={styles.skeletonDark}
            style={{ width: '120px', height: '4rem', margin: '0 auto 1rem' }}
          />
          {/* Condition */}
          <div
            className={styles.skeletonDark}
            style={{ width: '100px', height: '1.25rem', margin: '0 auto 0.5rem' }}
          />
          {/* Feels like */}
          <div
            className={styles.skeletonDark}
            style={{ width: '80px', height: '0.875rem', margin: '0 auto' }}
          />
        </section>

        {/* Frontier saying */}
        <section
          style={{
            padding: '1.5rem',
            marginBottom: '1.5rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
          }}
        >
          <div
            className={styles.skeletonDark}
            style={{ width: '90%', height: '1rem', margin: '0 auto 0.5rem' }}
          />
          <div
            className={styles.skeletonDark}
            style={{ width: '70%', height: '1rem', margin: '0 auto' }}
          />
        </section>

        {/* Task Scores Grid */}
        <section style={{ marginBottom: '2rem' }}>
          <div
            className={styles.skeletonDark}
            style={{ width: '120px', height: '1rem', marginBottom: '1rem' }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={styles.skeletonCardDark}
                style={{
                  height: '80px',
                  borderRadius: '8px',
                  padding: '1rem',
                }}
              >
                <div
                  className={styles.skeletonDark}
                  style={{ width: '24px', height: '24px', marginBottom: '0.5rem' }}
                />
                <div className={styles.skeletonDark} style={{ width: '60%', height: '0.75rem' }} />
              </div>
            ))}
          </div>
        </section>

        {/* Weather Details */}
        <section
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            className={styles.skeletonDark}
            style={{ width: '120px', height: '1rem', marginBottom: '1.5rem' }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div
                  className={styles.skeletonDark}
                  style={{ width: '80px', height: '0.75rem', marginBottom: '0.5rem' }}
                />
                <div className={styles.skeletonDark} style={{ width: '60px', height: '1.25rem' }} />
              </div>
            ))}
          </div>
        </section>

        {/* Moon Phase */}
        <section
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <div
            className={styles.skeletonCircleDark}
            style={{ width: '60px', height: '60px', margin: '0 auto 1rem' }}
          />
          <div
            className={styles.skeletonDark}
            style={{ width: '100px', height: '1rem', margin: '0 auto 0.5rem' }}
          />
          <div
            className={styles.skeletonDark}
            style={{ width: '60px', height: '0.75rem', margin: '0 auto' }}
          />
        </section>
      </div>
    </div>
  )
}
