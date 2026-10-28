import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router';
import { useSitePage } from '@/hooks/useSitePage';
import { NewsStoryCards } from '@/components/common/NewsStoryCards';
import styles from './NewsSection.module.css';

export function NewsSection() {
  const { data: news } = useSitePage('/media/news');
  const sliderRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section} aria-labelledby="home-news-title">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <div>
            <motion.p 
              className={styles.eyebrow}
              initial={reduceMotion ? false : { opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Newsroom
            </motion.p>
            <motion.h2 
              id="home-news-title"
              initial={reduceMotion ? false : { opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              From A-1
            </motion.h2>
          </div>

          <div className={styles.headerControls}>
            <div className={styles.scrollButtons}>
              <button 
                onClick={() => handleScroll('left')} 
                aria-label="Scroll left"
                className={styles.scrollBtn}
              >
                <i className="material-symbols-outlined">chevron_left</i>
              </button>
              <button 
                onClick={() => handleScroll('right')} 
                aria-label="Scroll right"
                className={styles.scrollBtn}
              >
                <i className="material-symbols-outlined">chevron_right</i>
              </button>
            </div>
            <Link to="/media/news" className={styles.allNewsLink}>
              All news <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        {news?.newsStories && (
          <div ref={sliderRef} className={styles.sliderContainer}>
            <NewsStoryCards stories={news.newsStories} />
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsSection;