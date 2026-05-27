import styles from './loading.module.css'

export default function VisitLoading() {
  return (
    <div className={styles.loadingContainer}>
      {/* Screen reader announcement */}
      <div role="status" aria-live="polite" className="sr-only">
        Loading visit information...
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={`${styles.skeletonDark} ${styles.skeletonEyebrow}`} />
          <div className={`${styles.skeletonDark} ${styles.skeletonHeadline}`} />
          <div className={`${styles.skeletonDark} ${styles.skeletonSubheadline}`} />
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          {/* Hours card */}
          <div className={`${styles.skeletonCard} ${styles.cardSkeleton}`}>
            <div className={`${styles.skeleton} ${styles.cardSkeletonTitle}`} />
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.cardSkeletonRow}>
                <div className={`${styles.skeleton} ${styles.cardSkeletonLabel}`} />
                <div className={`${styles.skeleton} ${styles.cardSkeletonValue}`} />
              </div>
            ))}
          </div>

          {/* Admission card */}
          <div className={`${styles.skeletonCard} ${styles.cardSkeleton}`}>
            <div
              className={`${styles.skeleton} ${styles.cardSkeletonTitle}`}
              style={{ width: '100px' }}
            />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.cardSkeletonRow}>
                <div
                  className={`${styles.skeleton} ${styles.cardSkeletonLabel}`}
                  style={{ width: '100px' }}
                />
                <div
                  className={`${styles.skeleton} ${styles.cardSkeletonValue}`}
                  style={{ width: '40px' }}
                />
              </div>
            ))}
          </div>

          {/* Location card */}
          <div className={`${styles.skeletonCard} ${styles.cardSkeleton}`}>
            <div className={`${styles.skeleton} ${styles.cardSkeletonTitle}`} />
            <div
              className={`${styles.skeleton} ${styles.skeletonText}`}
              style={{ width: '160px' }}
            />
            <div
              className={`${styles.skeleton} ${styles.skeletonText}`}
              style={{ width: '140px' }}
            />
            <div
              className={`${styles.skeleton} ${styles.skeletonButton}`}
              style={{ marginTop: 'var(--space-lg)' }}
            />
          </div>
        </div>
      </section>

      {/* Who Walked Here Section */}
      <section className={styles.figuresSection}>
        <div className={styles.figuresContent}>
          <div className={`${styles.skeleton} ${styles.skeletonSectionTitle}`} />
          <div className={styles.figuresGrid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={`${styles.skeletonCard} ${styles.figureCardSkeleton}`}>
                <div
                  className={`${styles.skeletonDark} ${styles.skeletonCircle} ${styles.figurePortrait}`}
                />
                <div className={`${styles.skeleton} ${styles.figureName}`} />
                <div className={`${styles.skeleton} ${styles.figureTitle}`} />
                <div className={`${styles.skeleton} ${styles.figureYears}`} />
                <div className={`${styles.skeleton} ${styles.figureHook}`} />
                <div className={`${styles.skeleton} ${styles.figureHookSecond}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.contactContent}>
          <div
            className={`${styles.skeleton} ${styles.skeletonSectionTitle}`}
            style={{ width: '180px', height: '1.5rem', marginBottom: 'var(--space-lg)' }}
          />
          <div
            className={`${styles.skeleton} ${styles.skeletonText}`}
            style={{ width: '140px', margin: '0 auto var(--space-md)' }}
          />
          <div
            className={`${styles.skeleton} ${styles.skeletonText}`}
            style={{ width: '200px', margin: '0 auto' }}
          />
        </div>
      </section>
    </div>
  )
}
