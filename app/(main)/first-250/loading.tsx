import styles from '@/components/LoadingSkeleton/LoadingSkeleton.module.css'

export default function First250Loading() {
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
          {/* Eyebrow */}
          <div
            className={styles.skeletonDark}
            style={{ width: '220px', height: '0.75rem', margin: '0 auto 1.5rem' }}
          />
          {/* Headline small */}
          <div
            className={styles.skeletonDark}
            style={{ width: '120px', height: '1rem', margin: '0 auto 0.5rem' }}
          />
          {/* Headline large */}
          <div
            className={styles.skeletonDark}
            style={{ width: '300px', height: '3.5rem', margin: '0 auto 1.5rem' }}
          />
          {/* Hook */}
          <div
            className={styles.skeletonDark}
            style={{ width: '400px', maxWidth: '100%', height: '1.25rem', margin: '0 auto 2rem' }}
          />
          {/* Gauge placeholder */}
          <div
            className={styles.skeletonCircleDark}
            style={{ width: '200px', height: '200px', margin: '0 auto 2rem' }}
          />
          {/* CTA */}
          <div
            className={styles.skeletonDark}
            style={{ width: '180px', height: '48px', margin: '0 auto 1rem', borderRadius: '4px' }}
          />
          {/* Deadline */}
          <div
            className={styles.skeletonDark}
            style={{ width: '200px', height: '0.875rem', margin: '0 auto' }}
          />
        </div>
      </section>

      {/* Picture This Section */}
      <section style={{ background: 'var(--parchment)', padding: '5rem 1rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div
            className={styles.skeletonHeading}
            style={{ width: '150px', height: '2rem', margin: '0 auto 2rem' }}
          />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={styles.skeleton}
              style={{ width: `${95 - i * 5}%`, height: '1rem', margin: '0 auto 1rem' }}
            />
          ))}
        </div>
      </section>

      {/* Tiers Section */}
      <section style={{ background: 'white', padding: '5rem 1rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div
            className={styles.skeletonHeading}
            style={{ width: '250px', height: '2rem', margin: '0 auto 3rem' }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={styles.skeletonCard}
                style={{
                  height: '350px',
                  padding: '2rem',
                  borderRadius: '8px',
                }}
              >
                {/* Badge */}
                <div
                  className={styles.skeleton}
                  style={{ width: '80px', height: '0.75rem', margin: '0 auto 1.5rem' }}
                />
                {/* Title */}
                <div
                  className={styles.skeleton}
                  style={{ width: '140px', height: '1.5rem', margin: '0 auto 1rem' }}
                />
                {/* Price */}
                <div
                  className={styles.skeleton}
                  style={{ width: '100px', height: '2rem', margin: '0 auto 1.5rem' }}
                />
                {/* Features */}
                {[1, 2, 3, 4].map((j) => (
                  <div
                    key={j}
                    className={styles.skeleton}
                    style={{ width: '180px', height: '0.875rem', margin: '0 auto 0.75rem' }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
