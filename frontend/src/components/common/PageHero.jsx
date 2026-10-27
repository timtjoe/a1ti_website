import { Link } from 'react-router';
import { motion, useReducedMotion } from 'framer-motion';
import defaultPortrait from '@/assets/img_008.jpeg';
import styles from './PageHero.module.css';

export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  image = defaultPortrait,
  imageAlt = 'A-1 trainees practicing technical installation',
}) {
  const shouldReduceMotion = useReducedMotion();
  const entrySpring = shouldReduceMotion
    ? { duration: 0.01 }
    : { type: 'spring', stiffness: 75, damping: 15, mass: 0.8 };

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.02 },
            },
          }}
        >
          <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
            <ol>
              {breadcrumbs.map((item, index) => {
                const isCurrent = index === breadcrumbs.length - 1;
                return (
                  <motion.li
                    key={`${item.label}-${index}`}
                    variants={{
                      hidden: { opacity: 0, y: 32 },
                      visible: { opacity: 1, y: 0, transition: entrySpring },
                    }}
                  >
                    {index > 0 && (
                      <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                    )}
                    {isCurrent ? (
                      <span aria-current="page">{item.label}</span>
                    ) : (
                      <Link to={item.to}>{item.label}</Link>
                    )}
                  </motion.li>
                );
              })}
            </ol>
          </nav>
          <motion.p
            className={styles.eyebrow}
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: { opacity: 1, y: 0, transition: entrySpring },
            }}
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            className={styles.title}
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: { opacity: 1, y: 0, transition: entrySpring },
            }}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              className={styles.description}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: entrySpring },
              }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
        <motion.div
          className={styles.imageFrame}
          initial={shouldReduceMotion ? false : { opacity: 0, x: 36, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={entrySpring}
        >
          <img src={image} alt={imageAlt} />
        </motion.div>
      </div>
    </section>
  );
}

export default PageHero;
