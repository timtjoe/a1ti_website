import { Link } from 'react-router';
import { useSitePage } from '@/hooks/useSitePage';
import { NewsStoryCards } from '@/components/common/NewsStoryCards';
import styles from './NewsSection.module.css';

export function NewsSection() {
  const { data: news } = useSitePage('/media/news');

  return (
    <section className={styles.section} aria-labelledby="home-news-title">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Newsroom</p>
            <h2 id="home-news-title">From A-1</h2>
          </div>
          <Link to="/media/news">All news <span aria-hidden="true">→</span></Link>
        </header>
        {news?.newsStories && <NewsStoryCards stories={news.newsStories.slice(0, 4)} />}
      </div>
    </section>
  );
}

export default NewsSection;
