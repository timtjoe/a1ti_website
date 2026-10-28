import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router';
import styles from './NewsStoryCards.module.css';

export function NewsStoryCards({ stories }) {
  const reduceMotion = useReducedMotion();

  if (!stories || stories.length === 0) return null;

  return (
    <div className={styles.grid}>
      {stories.map((story, index) => (
        <motion.div
          key={story.slug}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.4, delay: index * 0.05 }}
          whileHover={reduceMotion ? {} : { y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
          style={{ display: 'contents' }}
        >
          <Link to={`/media/news/${story.slug}`} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={story.image} alt={story.title} loading="lazy" />
            </div>
            <div className={styles.content}>
              <div className={styles.metaRow}>
                <span className={styles.category}>{story.category}</span>
                {story.date && <span className={styles.date}>{story.date}</span>}
              </div>
              <h3 className={styles.title}>{story.title}</h3>
              <p className={styles.summary}>{story.summary}</p>
              <span className={styles.readMore}>
                Read story <i className="material-symbols-outlined">arrow_forward</i>
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default NewsStoryCards;