import { Link, useParams } from 'react-router';
import { useCourseBySlug } from '@/hooks/useCourseCatalog';
import { PageHero } from '@/components/common/PageHero';
import styles from './CourseDetailPage.module.css';

export default function CourseDetailPage() {
  const { courseSlug } = useParams();
  const { data: course, isLoading, error } = useCourseBySlug(courseSlug);

  if (isLoading) {
    return <p className={styles.notFound} role="status">Loading course details…</p>;
  }

  if (error) {
    return (
      <section className={styles.notFound} role="alert">
        <p className={styles.eyebrow}>Course details unavailable</p>
        <h1>We couldn’t load this course.</h1>
        <p>{error.message}</p>
        <Link to="/academic/courses">Explore all courses</Link>
      </section>
    );
  }

  if (!course) {
    return (
      <section className={styles.notFound}>
        <p className={styles.eyebrow}>Course not found</p>
        <h1>We couldn’t find that course.</h1>
        <p>Browse the full course catalogue to find a course that fits your goals.</p>
        <Link to="/academic/courses">Explore all courses</Link>
      </section>
    );
  }

  return (
    <div>
      <PageHero
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Courses', to: '/academic/courses' },
          { label: course.title },
        ]}
        eyebrow={`${course.category} · ${course.level.toLowerCase()}`}
        title={course.title}
        description={course.description}
      />
      <section className={styles.content}>
        <div className={styles.mainColumn}>
          <p className={styles.eyebrow}>Course overview</p>
          <h2>Build practical skills you can use</h2>
          <p className={styles.intro}>
            Learn through guided practice and develop a strong foundation in the skills covered by this course.
          </p>
          <h3>What you’ll learn</h3>
          <ul className={styles.learningList}>
            {course.learningPoints.map((point) => (
              <li key={point}>
                <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
                {point}
              </li>
            ))}
          </ul>
          <Link className={styles.backLink} to="/academic/courses">
            <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
            Browse all courses
          </Link>
        </div>

        <aside className={styles.detailsCard} aria-labelledby="course-details-title">
          <h2 id="course-details-title">Course details</h2>
          <dl>
            <div><dt>Course category</dt><dd>{course.category}</dd></div>
            <div><dt>Level</dt><dd>{course.level}</dd></div>
            <div><dt>Duration</dt><dd>{course.duration}</dd></div>
            <div><dt>Sessions</dt><dd>{course.sessions}</dd></div>
            <div><dt>Prerequisites</dt><dd>{course.prerequisites}</dd></div>
          </dl>
          <Link to="/#how-to-join" className={styles.registerLink}>Ask about registering</Link>
        </aside>
      </section>
    </div>
  );
}
