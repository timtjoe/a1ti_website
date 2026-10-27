import { Link, useParams } from 'react-router';
import { useCourseBySlug } from '@/hooks/useCourseCatalog';
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
      <header className={styles.courseHeader}>
        <nav aria-label="Breadcrumb">
          <Link to="/">Home</Link><span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          <Link to="/academic/courses">Courses</Link><span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          <span aria-current="page">{course.title}</span>
        </nav>
        <p className={styles.eyebrow}>{course.category} · {course.level.toLowerCase()}</p>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </header>
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
          <section className={styles.detailSection}>
            <h3>Entry requirements</h3>
            <p><strong>Prerequisite:</strong> {course.prerequisites}</p>
            <p>Bring valid identification and any academic documents requested by Admissions. Confirm course-specific requirements before applying.</p>
          </section>
          <section className={styles.detailSection}>
            <h3>Equipment and materials</h3>
            <p>Ask the department to confirm which tools, safety equipment, and materials are issued for this course and intake. The site does not yet have a verified equipment list.</p>
          </section>
          <section className={styles.detailSection}>
            <h3>Payment details</h3>
            <p>Fees and accepted payment methods must be confirmed with the Finance Office for the current intake. Request an official receipt for every payment.</p>
            <Link to="/admission/fees">Fees and payment information</Link>
          </section>
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
          <Link to="/admission/apply" className={styles.registerLink}>How to apply</Link>
        </aside>
      </section>
    </div>
  );
}
