import { Link } from 'react-router';
import styles from './NewsStoryCards.module.css';

export function NewsStoryCards({ stories }) {
  const [featured, ...otherStories] = stories || [];
  if (!featured) return null;

  return (
    <div className={styles.stories}>
      <Link to={`/media/news/${featured.slug}`} className={styles.featured}>
        <img src={featured.image} alt="" />
        <div>
          <p>{featured.category}</p>
          <h3>{featured.title}</h3>
          <span>{featured.summary}</span>
          <strong>Read story</strong>
        </div>
      </Link>
      <div className={styles.smallGrid}>
        {otherStories.map((story) => (
          <Link to={`/media/news/${story.slug}`} className={styles.small} key={story.slug}>
            <img src={story.image} alt="" />
            <p>{story.category}</p>
            <h3>{story.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NewsStoryCards;
