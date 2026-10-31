// src/components/gallery/GalleryGrid.jsx
import { motion, useReducedMotion } from 'framer-motion';
import styles from './GalleryGrid.module.css';

const entrySpring = { type: 'spring', stiffness: 380, damping: 34 };

export function GalleryGrid({
  photos = [],
  onOpen,
  variant = 'masonry', // masonry or grid
  columns = 4,
}) {
  const reduceMotion = useReducedMotion();

  if (!photos.length) return null;

  const className = variant === 'masonry' ? styles.masonry : styles.grid;

  return (
    <div className={className} style={{ '--cols': columns }}>
      {photos.map((photo, index) => (
        <motion.button
          type="button"
          className={styles.item}
          key={photo.id || index}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={reduceMotion ? { duration: 0.01 } : { ...entrySpring, delay: (index % columns) * 0.05 }}
          onClick={() => onOpen?.(index)}
          aria-label={photo.title || photo.alt || `Open photo ${index + 1}`}
        >
          <img src={photo.src} alt={photo.alt || photo.title || ''} loading="lazy" />
          {photo.title && <span className={styles.overlay}>{photo.title}</span>}
        </motion.button>
      ))}
    </div>
  );
}

export default GalleryGrid;
