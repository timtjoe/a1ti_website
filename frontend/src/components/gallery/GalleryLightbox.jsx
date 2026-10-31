// src/components/gallery/GalleryLightbox.jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { IconButton } from '@/components/common/IconButton';
import styles from './GalleryLightbox.module.css';

const entrySpring = { type: 'spring', stiffness: 380, damping: 34 };

export function GalleryLightbox({
  open,
  photos = [],
  activeIndex,
  onClose,
  onMove,
  reduceMotion,
}) {
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  const photo = open && activeIndex !== null ? photos[activeIndex] : null;
  const count = photos.length;

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onMove?.(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onMove?.(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      triggerRef.current?.focus?.();
    };
  }, [open, onClose, onMove]);

  const download = async () => {
    if (!photo?.src) return;
    try {
      const res = await fetch(photo.src);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const name = (photo.title || photo.alt || 'image').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      link.download = `${name}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(photo.src, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          className={styles.backdrop}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label={photo.title || photo.alt || 'Gallery image'}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={reduceMotion ? { duration: 0.01 } : entrySpring}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              icon="close"
              label="Close"
              className={styles.close}
              ref={closeRef}
              onClick={onClose}
            />
            <IconButton
              icon="arrow_back"
              label="Previous"
              className={`${styles.arrow} ${styles.prev}`}
              onClick={() => onMove?.(-1)}
            />
            <figure className={styles.figure}>
              <img src={photo.src} alt={photo.alt || photo.title || ''} />
              {(photo.title || count > 0) && (
                <figcaption className={styles.caption}>
                  <span>{photo.title || ''}</span>
                  {count > 1 && <span>{(activeIndex ?? 0) + 1} / {count}</span>}
                </figcaption>
              )}
            </figure>
            <IconButton
              icon="arrow_forward"
              label="Next"
              className={`${styles.arrow} ${styles.next}`}
              onClick={() => onMove?.(1)}
            />
            <IconButton
              icon="download"
              label="Download"
              className={styles.download}
              onClick={download}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GalleryLightbox;
