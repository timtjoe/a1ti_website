import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { CourseCard } from '@/components/courses/CourseCard';
import { useCourses } from '@/hooks/useCourseCatalog';
import { PageHero } from '@/components/common/PageHero';
import styles from './CoursesPage.module.css';

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const { data: courses = [], isLoading, error } = useCourses();
  const selectedCategories = searchParams.getAll('category');
  const selectedLevels = searchParams.getAll('level');
  const categories = [...new Set(courses.map((course) => course.category))];
  const levels = [...new Set(courses.map((course) => course.level))];
  const query = search.trim().toLowerCase();

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(course.category);
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
    const matchesSearch =
      !query ||
      [course.title, course.description, course.category, course.level]
        .some((field) => field.toLowerCase().includes(query));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const selectCategory = (category) => {
    const nextParams = new URLSearchParams(searchParams);
    const categoriesToSet = selectedCategories.includes(category)
      ? selectedCategories.filter((selected) => selected !== category)
      : [...selectedCategories, category];
    nextParams.delete('category');
    categoriesToSet.forEach((selected) => nextParams.append('category', selected));
    setSearchParams(nextParams);
  };

  const selectLevel = (level) => {
    const nextParams = new URLSearchParams(searchParams);
    const levelsToSet = selectedLevels.includes(level)
      ? selectedLevels.filter((selected) => selected !== level)
      : [...selectedLevels, level];
    nextParams.delete('level');
    levelsToSet.forEach((selected) => nextParams.append('level', selected));
    setSearchParams(nextParams);
  };

  const clearFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('category');
    nextParams.delete('level');
    setSearchParams(nextParams);
    setSearch('');
  };

  return (
    <div>
      <PageHero
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Courses' },
        ]}
        eyebrow="Find your path"
        title="Explore our courses"
        description="Search practical technical and professional training, then choose a course that fits your goals."
      />
      <section className={styles.catalog} aria-label="Course catalogue">
        <div className={styles.searchBox}>
          <label htmlFor="course-search">Search courses</label>
          <div className={styles.searchControl}>
            <span className="material-symbols-outlined" aria-hidden="true">search</span>
            <input
              id="course-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try solar, computer, AutoCAD..."
            />
          </div>
        </div>

        <div className={styles.catalogLayout}>
          <aside className={styles.filters} aria-labelledby="course-filter-title">
            <h2 id="course-filter-title">Filter courses</h2>
            <h3>Course</h3>
            <div className={styles.filterOptions} role="group" aria-label="Course">
              <button
                type="button"
                className={styles.filterButton}
                role="checkbox"
                aria-checked={selectedCategories.length === 0}
                onClick={() => {
                  const nextParams = new URLSearchParams(searchParams);
                  nextParams.delete('category');
                  setSearchParams(nextParams);
                }}
              >
                <span className={`material-symbols-outlined ${styles.chipCheck}`} aria-hidden="true">
                  {selectedCategories.length === 0 ? 'check' : ''}
                </span>
                All courses
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={styles.filterButton}
                  role="checkbox"
                  aria-checked={selectedCategories.includes(category)}
                  onClick={() => selectCategory(category)}
                >
                  <span className={`material-symbols-outlined ${styles.chipCheck}`} aria-hidden="true">
                    {selectedCategories.includes(category) ? 'check' : ''}
                  </span>
                  {category}
                </button>
              ))}
            </div>
            <h3 className={styles.levelHeading}>Course level</h3>
            <div className={styles.filterOptions} role="group" aria-label="Course level">
              <button
                type="button"
                className={styles.filterButton}
                role="checkbox"
                aria-checked={selectedLevels.length === 0}
                onClick={() => {
                  const nextParams = new URLSearchParams(searchParams);
                  nextParams.delete('level');
                  setSearchParams(nextParams);
                }}
              >
                <span className={`material-symbols-outlined ${styles.chipCheck}`} aria-hidden="true">
                  {selectedLevels.length === 0 ? 'check' : ''}
                </span>
                All levels
              </button>
              {levels.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={styles.filterButton}
                  role="checkbox"
                  aria-checked={selectedLevels.includes(level)}
                  onClick={() => selectLevel(level)}
                >
                  <span className={`material-symbols-outlined ${styles.chipCheck}`} aria-hidden="true">
                    {selectedLevels.includes(level) ? 'check' : ''}
                  </span>
                  {level === 'All levels' ? level : level.toLowerCase().replace(/^\w/, (letter) => letter.toUpperCase())}
                </button>
              ))}
            </div>
          </aside>

          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <h2>
                {selectedCategories.length
                  ? `${selectedCategories.join(' + ')} courses`
                  : selectedLevels.length
                    ? `${selectedLevels.map((level) => level.toLowerCase().replace(/^\w/, (letter) => letter.toUpperCase())).join(' + ')} courses`
                    : 'All courses'}
              </h2>
              <p aria-live="polite">{filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}</p>
            </div>
            {isLoading ? (
              <p role="status">Loading courses…</p>
            ) : error ? (
              <div className={styles.emptyState} role="alert">
                <h3>Courses are temporarily unavailable</h3>
                <p>{error.message}</p>
              </div>
            ) : filteredCourses.length ? (
              <div className={styles.courseGrid}>
                {filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h3>No courses match your search</h3>
                <p>Try another search term or choose a different course category.</p>
                <button type="button" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
