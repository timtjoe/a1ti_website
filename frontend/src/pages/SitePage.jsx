import { Link, useLocation } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PageHero } from '@/components/common/PageHero';
import { useCourses } from '@/hooks/useCourseCatalog';
import { useSitePage } from '@/hooks/useSitePage';
import styles from './SitePage.module.css';

const entrySpring = { type: 'spring', stiffness: 75, damping: 15, mass: 0.8 };

function PageLoading() {
  return <p className={styles.status} role="status">Loading page…</p>;
}

function PageError({ message }) {
  return (
    <section className={styles.status} role="alert">
      <h1>We couldn’t load this page</h1>
      <p>{message}</p>
      <Link to="/">Return to the homepage</Link>
    </section>
  );
}

function MissionPage({ page }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={styles.content}>
      <motion.section
        className={styles.missionStatement}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={shouldReduceMotion ? { duration: 0.01 } : entrySpring}
      >
        <p className={styles.missionLabel}>Our mission</p>
        <p className={styles.missionText}>{page.missionStatement}</p>
        <p className={styles.missionTarget}>A long-term ambition: reach one million young people by 2036.</p>
      </motion.section>
      {page.sections.map((section, index) => (
        <motion.section
          className={styles.section}
          key={section.title}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={shouldReduceMotion ? { duration: 0.01 } : { ...entrySpring, delay: index * 0.08 }}
        >
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </motion.section>
      ))}
      <nav className={styles.actions} aria-label="Related pages">
        {page.links?.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
      </nav>
    </div>
  );
}

function ReportsPage({ reports }) {
  const shouldReduceMotion = useReducedMotion();
  const { data: courses = [], isLoading, error } = useCourses();

  return (
    <div className={styles.content}>
      <p className={styles.disclaimer}>
        These downloads summarize information currently published by A-1; they are not annual performance reports.
      </p>
      <div className={styles.reportGrid}>
        {reports.map((report, index) => (
          <motion.article
            className={styles.reportCard}
            key={report.downloadName}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { ...entrySpring, delay: index * 0.08 }}
          >
            <span className={styles.reportIcon} aria-hidden="true">
              <span className="material-symbols-outlined">description</span>
            </span>
            <p className={styles.reportPeriod}>{report.period}</p>
            <h2>{report.title}</h2>
            <p className={styles.reportDescription}>{report.description}</p>
            {report.includeCourseList && isLoading ? (
              <p className={styles.downloadStatus} role="status">Preparing the current course list…</p>
            ) : report.includeCourseList && error ? (
              <p className={styles.downloadError} role="alert">Course details could not be loaded: {error.message}</p>
            ) : (
              <a
                className={styles.downloadLink}
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  report.includeCourseList
                    ? `${report.downloadContent}\n${courses.map((course) => (
                      `${course.title} | ${course.category} | ${course.level} | ${course.duration} | Prerequisites: ${course.prerequisites}`
                    )).join('\n')}\n`
                    : report.downloadContent
                )}`}
                download={report.downloadName}
              >
                <span className="material-symbols-outlined" aria-hidden="true">download</span>
                Download report
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function GalleryPage({ photos }) {
  const [selectedCohort, setSelectedCohort] = useState('all');
  const [activeIndex, setActiveIndex] = useState(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const cohorts = [...new Set(photos.map((photo) => photo.cohort).filter(Boolean))];
  const isLightboxOpen = activeIndex !== null;
  const filteredPhotos = selectedCohort === 'all'
    ? photos
    : photos.filter((photo) => (photo.cohort || 'unassigned') === selectedCohort);
  const activePhoto = activeIndex === null ? null : filteredPhotos[activeIndex];

  useEffect(() => {
    if (!isLightboxOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActiveIndex(null);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % filteredPhotos.length);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + filteredPhotos.length) % filteredPhotos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isLightboxOpen, filteredPhotos.length]);

  const closeLightbox = () => setActiveIndex(null);
  const moveLightbox = (direction) => {
    setActiveIndex((index) => (index + direction + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <>
      <div className={styles.galleryLayout}>
        <aside className={styles.galleryFilters} aria-labelledby="gallery-filter-heading">
          <h2 id="gallery-filter-heading">Filter photos</h2>
          <p>Choose a cohort</p>
          <div className={styles.cohortOptions} role="group" aria-label="Filter gallery by cohort">
            <button
              type="button"
              className={styles.cohortButton}
              aria-pressed={selectedCohort === 'all'}
              onClick={() => setSelectedCohort('all')}
            >
              All photos
            </button>
            {cohorts.map((cohort) => (
              <button
                type="button"
                className={styles.cohortButton}
                key={cohort}
                aria-pressed={selectedCohort === cohort}
                onClick={() => setSelectedCohort(cohort)}
              >
                {cohort}
              </button>
            ))}
            {photos.some((photo) => !photo.cohort) && (
              <button
                type="button"
                className={styles.cohortButton}
                aria-pressed={selectedCohort === 'unassigned'}
                onClick={() => setSelectedCohort('unassigned')}
              >
                Cohort not recorded
              </button>
            )}
          </div>
          <p className={styles.cohortNote}>
            Cohort labels will appear when confirmed photo details are available.
          </p>
        </aside>

        <section className={styles.gallery} aria-label="Training photo gallery">
          <div className={styles.galleryHeading}>
            <h2>Training in action</h2>
            <p aria-live="polite">{filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}</p>
          </div>
          {filteredPhotos.length ? (
            <div className={styles.photoGrid}>
              {filteredPhotos.map((photo, index) => (
                <motion.button
                  type="button"
                  className={styles.photoCard}
                  key={photo.id}
                  aria-label={`Open photo ${index + 1} of ${filteredPhotos.length}: ${photo.title}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={shouldReduceMotion ? { duration: 0.01 } : { ...entrySpring, delay: (index % 4) * 0.06 }}
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setActiveIndex(index);
                  }}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <span>{photo.title}</span>
                </motion.button>
              ))}
            </div>
          ) : (
            <p className={styles.emptyGallery}>No photos are available for this cohort yet.</p>
          )}
        </section>
      </div>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className={styles.lightboxBackdrop}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.2 }}
            onClick={closeLightbox}
          >
            <motion.div
              className={styles.lightbox}
              role="dialog"
              aria-modal="true"
              aria-label={`Photo: ${activePhoto.title}`}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={shouldReduceMotion ? { duration: 0.01 } : entrySpring}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles.lightboxClose}
                aria-label="Close photo viewer"
                ref={closeButtonRef}
                onClick={closeLightbox}
              >
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
              <button
                type="button"
                className={`${styles.lightboxArrow} ${styles.lightboxPrevious}`}
                aria-label="Previous photo"
                onClick={() => moveLightbox(-1)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
              </button>
              <figure>
                <img src={activePhoto.src} alt={activePhoto.alt} />
                <figcaption>{activePhoto.title} <span>{activeIndex + 1} / {filteredPhotos.length}</span></figcaption>
              </figure>
              <button
                type="button"
                className={`${styles.lightboxArrow} ${styles.lightboxNext}`}
                aria-label="Next photo"
                onClick={() => moveLightbox(1)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function SitePage() {
  const { pathname } = useLocation();
  const { data: page, isLoading, error } = useSitePage(pathname);

  if (isLoading) return <PageLoading />;
  if (error) return <PageError message={error.message} />;

  return (
    <div>
      <PageHero
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: page.title },
        ]}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      {page.missionStatement && <MissionPage page={page} />}
      {page.reports && <ReportsPage reports={page.reports} />}
      {page.galleryItems && <GalleryPage photos={page.galleryItems} />}
      {!page.missionStatement && !page.reports && !page.galleryItems && (
      <div className={styles.content}>
        {page.sections.map((section) => (
          <section className={styles.section} key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.items && (
              <ul>
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
        {page.links?.length > 0 && (
          <nav className={styles.actions} aria-label="Related pages">
            {page.links.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </nav>
        )}
      </div>
      )}
    </div>
  );
}
