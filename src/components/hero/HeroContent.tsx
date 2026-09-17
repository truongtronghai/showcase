import styles from "./Hero.module.css";

export default function HeroContent() {
  return (
    <div className={styles.content}>
      <p className={styles.eyebrow} data-hero-eyebrow>
        <span className={styles.eyebrowDot} aria-hidden="true" />
        Decentralized · Open · Sovereign
      </p>

      <h1 className={styles.title}>
        <span className={styles.line} data-hero-line>
          <span>BUILD</span>
        </span>
        <span className={styles.line} data-hero-line>
          <span>THE</span>
        </span>
        <span className={styles.line} data-hero-line>
          <span className={styles.titleAccent}>FUTURE.</span>
        </span>
      </h1>

      <p className={styles.sub} data-hero-sub>
        Autonomous infrastructure for the open web — identity, payments, and
        compute secured by code, not by middlemen.
      </p>

      <a className={styles.cta} href="#next" data-hero-cta>
        Explore the stack
        <span className={styles.ctaArrow} aria-hidden="true">
          →
        </span>
      </a>

      <div className={styles.scroll} data-hero-scroll aria-hidden="true">
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </div>
  );
}
