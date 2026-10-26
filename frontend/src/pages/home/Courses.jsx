import { Link } from 'react-router';
import { CourseCard } from '@/components/courses/CourseCard';
import { useCourses } from '@/hooks/useCourseCatalog';
import styles from './Courses.module.css';

export function Courses() {
  const { data: courses = [], isLoading, error } = useCourses();

  return (
    <section className={styles.sectionContainer} aria-labelledby="popular-courses-title">
      <div className={styles.innerContainer}>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>Learn by doing</p>
            <h2 className={styles.sectionTitle} id="popular-courses-title">Popular courses</h2>
            <div className={styles.thickDivider} />
            <p className={styles.sectionSubtitle}>
              Practical, industry-aligned training to help you build skills for work.
            </p>
          </div>
          <Link className={styles.viewAllLink} to="/academic/courses">
            Explore all courses
            <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>

        <div className={styles.coursesGrid}>
          {isLoading ? (
            <p role="status">Loading courses…</p>
          ) : error ? (
            <p role="alert">Courses could not be loaded: {error.message}</p>
          ) : (
            courses.map((course) => <CourseCard key={course.id} course={course} />)
          )}
        </div>
      </div>
    </section>
  );
}

export default Courses;
