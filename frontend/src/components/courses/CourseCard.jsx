import { Link } from 'react-router';
import styles from './CourseCard.module.css';

export function CourseCard({ course }) {
  return (
    <article className={styles.card}>
      <Link
        to={`/academic/courses/${course.slug}`}
        className={styles.cardLink}
        aria-label={`View ${course.title} course details`}
      >
        <div className={styles.imageWrapper}>
          <img src={course.image} alt="" className={styles.image} loading="lazy" />
          <div className={styles.badges}>
            <span className={styles.levelBadge}>{course.level}</span>
            <span className={styles.categoryBadge}>{course.category}</span>
          </div>
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{course.title}</h3>
          <p className={styles.description}>{course.description}</p>
          <div className={styles.metaRow}>
            <span>{course.duration}</span>
            <span>{course.sessions}</span>
          </div>
          <div className={styles.cardFooter}>
            <span>Learn more</span>
            <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </div>
        </div>
        <div className={styles.hoverPreview}>
          <div className={styles.previewHeader}>
            <span className={styles.previewLevel}>{course.level}</span>
            <span className={styles.previewCategory}>{course.category}</span>
          </div>
          <h4>{course.title}</h4>
          <div className={styles.learningSection}>
            <p>What you will learn</p>
            <ul>
              {course.learningPoints.map((point) => (
                <li key={point}>
                  <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.previewMeta}>
            <span><strong>Duration:</strong> {course.duration}</span>
            <span><strong>Sessions:</strong> {course.sessions}</span>
            <span><strong>Prerequisites:</strong> {course.prerequisites}</span>
          </div>
          <div className={styles.previewAction}>
            <span>View course details</span>
            <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default CourseCard;
