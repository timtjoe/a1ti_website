import { motion } from 'framer-motion';
import styles from './StaffCard.module.css';

export function StaffCard({ name, position, qualification, image, imageAlt, index = 0, reduceMotion = false, action }) {
  return (
    <motion.article
      className={styles.card}
      initial={reduceMotion ? false : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.35, delay: index * 0.04 }}
      whileHover={reduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
    >
      <div className={styles.portraitWrapper}>
        {image ? (
          <img className={styles.portrait} src={image} alt={imageAlt || name} loading="lazy" />
        ) : (
          <div className={styles.portraitPlaceholder} aria-hidden="true">
            <span className="material-symbols-outlined">person</span>
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        {position && <p className={styles.position}>{position}</p>}
        <div className={styles.qualification}>
          <span className={`material-symbols-outlined ${styles.qualificationIcon}`} aria-hidden="true">school</span>
          <span>Education: {qualification}</span>
        </div>
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </motion.article>
  );
}

export default StaffCard;