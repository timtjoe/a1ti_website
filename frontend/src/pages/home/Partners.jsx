import { motion, useReducedMotion } from 'framer-motion';
import styles from './Partners.module.css';

const PARTNERS = [
  { short: 'MOE', name: 'Ministry of Education' },
  { short: 'AITB', name: 'Agricultural and Industrial Training Bureau' },
];

export function Partners() {
  const reduceMotion = useReducedMotion();
  const entries = [...PARTNERS, ...PARTNERS];

  return (
    <section className={styles.section} aria-labelledby="partners-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Accreditation & partners</p>
        <h2 id="partners-title">Working with Liberia’s education and TVET authorities</h2>
        <div className={styles.marquee}>
          <motion.div
            className={styles.track}
            aria-label="Accrediting authorities"
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={reduceMotion ? undefined : { duration: 28, ease: 'linear', repeat: Infinity }}
          >
            {entries.map((partner, index) => (
              <div className={styles.wordmark} key={`${partner.short}-${index}`} aria-hidden={index >= PARTNERS.length}>
                <span>{partner.short}</span>
                <strong>{partner.name}</strong>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Partners;
