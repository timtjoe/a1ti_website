import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router';
import styles from './Programs.module.css';

// Importing local asset images
import img001 from '@/assets/img_001.jpeg';
import img002 from '@/assets/img_002.jpeg';
import img003 from '@/assets/img_003.jpeg';
import img004 from '@/assets/img_004.jpeg';
import img005 from '@/assets/img_005.jpeg';

// Modular Program Data (5 Categories mapped to local assets)
const PROGRAMS_DATA = [
  {
    id: 'foundation',
    title: 'Foundation',
    description: 'Start here. No experience needed. Foundation / Professional Certificate.',
    image: img001 || '/assets/img_001.jpg',
    courseCount: '14 courses',
    actionText: 'See foundation courses',
    link: '/academic/courses?level=FOUNDATION',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Build on a foundation or work experience. Intermediate Certificate.',
    image: img002 || '/assets/img_002.jpg',
    courseCount: '13 courses',
    actionText: 'See intermediate courses',
    link: '/academic/courses?level=INTERMEDIATE',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Design, lead and specialise. Advanced Certificate.',
    image: img003 || '/assets/img_003.jpg',
    courseCount: '9 courses',
    actionText: 'See advanced courses',
    link: '/academic/courses?level=ADVANCED',
  },
  {
    id: 'specialist',
    title: 'Specialist',
    description: 'Stage-based trades with a certificate every three months. Basic, Intermediate, Advanced & Specialist.',
    image: img004 || '/assets/img_004.jpg',
    courseCount: '17 courses',
    actionText: 'See specialist courses',
    link: '/academic/courses?category=Technical',
  },
  {
    id: 'integrated',
    title: 'Integrated Programs',
    description: 'Two to five related courses as one career pathway, with no timetable clashes. Integrated Program Certificate.',
    image: img005 || '/assets/img_005.jpg',
    courseCount: '12 programs',
    actionText: 'Explore integrated pathways',
    link: '/academic/courses',
  },
];

export function Programs() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.sectionContainer} aria-labelledby="programs-title">
      <div className={styles.innerContainer}>
        {/* 2-Column Grid Container (1 Title Cell + 5 Program Media-Object Cards) */}
        <div className={styles.programsGrid}>
          {/* Cell 1: Section Header Card */}
          <motion.div 
            className={styles.headerCard}
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reduceMotion ? { duration: 0.01 } : { duration: 0.4 }}
          >
            <div className={styles.headerCardContent}>
              <h2 id="programs-title" className={styles.sectionTitle}>OUR PROGRAM CATEGORIES</h2>
              <div className={styles.thickDivider} />
              <p className={styles.headerSubtitle}>
                Structured career pathways designed from foundational skills to specialist technical mastery.
              </p>
            </div>
          </motion.div>

          {/* Cells 2 through 6: Program Cards */}
          {PROGRAMS_DATA.map((program, index) => (
            <motion.div
              key={program.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={reduceMotion ? { duration: 0.01 } : { duration: 0.4, delay: (index + 1) * 0.06 }}
              whileHover={reduceMotion ? {} : { scale: 1.02, y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
              style={{ display: 'contents' }}
            >
              <Link
                to={program.link}
                className={styles.programCard}
              >
                {/* Left Side: Image matching card height */}
                <div className={styles.imageWrapper}>
                  <img
                    src={program.image}
                    alt={program.title}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                </div>

                {/* Right Side: Media-Object Content */}
                <div className={styles.cardContent}>
                  <div className={styles.headerRow}>
                    <h3 className={styles.cardTitle}>{program.title}</h3>
                    <span className={styles.courseBadge}>{program.courseCount}</span>
                  </div>

                  <p className={styles.cardDescription}>{program.description}</p>

                  <div className={styles.actionRow}>
                    <span className={styles.linkLabel}>{program.actionText}</span>
                    <i className={`material-symbols-outlined ${styles.linkIcon}`}>
                      arrow_forward
                    </i>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Programs;