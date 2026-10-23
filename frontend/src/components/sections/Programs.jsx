// src/components/sections/Programs.jsx
import React from 'react';
import { useNavigate } from 'react-router';
import styles from './Programs.module.css';

// Modular Program Data (5 Categories)
const PROGRAMS_DATA = [
  {
    id: 'foundation',
    title: 'Foundation',
    description: 'Start here. No experience needed. Foundation / Professional Certificate.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    courseCount: '14 courses',
    actionText: 'See foundation courses',
    link: '/academic/courses/foundation',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Build on a foundation or work experience. Intermediate Certificate.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80',
    courseCount: '13 courses',
    actionText: 'See intermediate courses',
    link: '/academic/courses/intermediate',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Design, lead and specialise. Advanced Certificate.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
    courseCount: '9 courses',
    actionText: 'See advanced courses',
    link: '/academic/courses/advanced',
  },
  {
    id: 'specialist',
    title: 'Specialist',
    description: 'Stage-based trades with a certificate every three months. Basic, Intermediate, Advanced & Specialist.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    courseCount: '17 courses',
    actionText: 'See specialist courses',
    link: '/academic/courses/specialist',
  },
  {
    id: 'integrated',
    title: 'Integrated Programs',
    description: 'Two to five related courses as one career pathway, with no timetable clashes. Integrated Program Certificate.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    courseCount: '12 programs',
    actionText: 'Explore integrated pathways',
    link: '/academic/programs/integrated',
  },
];

export function Programs() {
  const navigate = useNavigate();

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.innerContainer}>
        {/* 2x3 Grid Container (1 Title Cell + 5 Program Media-Object Cards) */}
        <div className={styles.programsGrid}>
          {/* Cell 1: Section Header Card (White Background with Thick Divider & Large Text) */}
          <div className={styles.headerCard}>
            <div className={styles.headerCardContent}>
              <h2 className={styles.sectionTitle}>OUR PROGRAM CATEGORIES</h2>
              <div className={styles.thickDivider} />
              <p className={styles.headerSubtitle}>
                Structured career pathways designed from foundational skills to specialist technical mastery.
              </p>
            </div>
          </div>

          {/* Cells 2 through 6: Program Cards */}
          {PROGRAMS_DATA.map((program) => (
            <article
              key={program.id}
              className={styles.programCard}
              onClick={() => navigate(program.link)}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Programs;