// src/components/sections/Courses.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/common/Button';
import styles from './Courses.module.css';

// Importing local asset images
import img001 from '@/assets/img_001.jpeg';
import img002 from '@/assets/img_002.jpeg';
import img003 from '@/assets/img_003.jpeg';
import img004 from '@/assets/img_004.jpeg';
import img005 from '@/assets/img_005.jpeg';

// 8 Popular Courses Dataset with Bulleted "What You Will Learn" List
const POPULAR_COURSES_DATA = [
  {
    id: 'solar-installation',
    title: 'Basic Solar System Installation',
    level: 'FOUNDATION',
    category: 'Technical',
    description:
      'How solar power works: panels, charge controllers, batteries and inverters · Tools, materials and safety for solar work.',
    learningPoints: [
      'Solar PV panel sizing & tilt alignment',
      'Charge controller & battery wiring',
      'Inverter setup & AC/DC safety',
      'Fault troubleshooting & maintenance',
    ],
    duration: '3 months',
    sessions: '2 sessions / week',
    prerequisites: 'None. Open to all youth.',
    fee: '$230',
    image: img001 || '/assets/img_001.jpg',
    link: '/academic/courses/basic-solar-system-installation',
  },
  {
    id: 'electricity',
    title: 'Electricity',
    level: 'FOUNDATION',
    category: 'Technical',
    description:
      'Electrical safety, PPE and safe isolation · Voltage, current, resistance and Ohm’s law.',
    learningPoints: [
      'Electrical safety protocols & PPE',
      'Ohm’s Law & circuit calculations',
      'Conduit bending & wall mounting',
      'Residential breaker panel wiring',
    ],
    duration: '6 months',
    sessions: '2 sessions / week',
    prerequisites: 'Basic math and literacy.',
    fee: '$250',
    image: img002 || '/assets/img_002.jpg',
    link: '/academic/courses/electricity',
  },
  {
    id: 'computer-intro',
    title: 'Introduction to Computer',
    level: 'FOUNDATION',
    category: 'Technical',
    description:
      'Parts of a computer and how to use them · Windows basics: files, folders and system settings.',
    learningPoints: [
      'Computer hardware & operating system basics',
      'Keyboarding & file management',
      'Microsoft Office (Word & Excel)',
      'Safe internet browsing & email setup',
    ],
    duration: '3 months',
    sessions: '6 sessions / week',
    prerequisites: 'None required.',
    fee: '$110',
    image: img003 || '/assets/img_003.jpg',
    link: '/academic/courses/intro-to-computer',
  },
  {
    id: 'cctv-installation',
    title: 'Biometric & CCTV Installation',
    level: 'INTERMEDIATE',
    category: 'Technical',
    description:
      'CCTV cameras, DVRs and NVRs · Planning camera positions, lens coverage, and biometric access controls.',
    learningPoints: [
      'Analog & IP camera positioning',
      'DVR/NVR storage & network setup',
      'Biometric reader & magnetic lock wiring',
      'Mobile remote viewing configuration',
    ],
    duration: '9 months',
    sessions: '2 sessions / week',
    prerequisites: 'Basic electrical or computer background.',
    fee: '$175',
    image: img004 || '/assets/img_004.jpg',
    link: '/academic/courses/biometric-cctv-installation',
  },
  {
    id: 'ai-prompting',
    title: 'AI & Prompt Engineering',
    level: 'FOUNDATION',
    category: 'Professional',
    description:
      'What AI tools are and what they can do · Writing clear, high-impact prompts that produce accurate, actionable results.',
    learningPoints: [
      'Generative AI core fundamentals',
      'Prompt structuring & zero-shot techniques',
      'Automating document drafting & data summary',
      'AI ethics & verifying output accuracy',
    ],
    duration: '3 months',
    sessions: '2 sessions / week',
    prerequisites: 'Basic computer literacy.',
    fee: '$150',
    image: img005 || '/assets/img_005.jpg',
    link: '/academic/courses/ai-prompt-engineering',
  },
  {
    id: 'web-development',
    title: 'Website Development',
    level: 'ADVANCED',
    category: 'Technical',
    description:
      'HTML, CSS, JavaScript, and modern frontend development frameworks · Building responsive and scalable websites.',
    learningPoints: [
      'Semantic HTML5 & modern CSS Grid',
      'JavaScript ES6+ interactive logic',
      'React component state architecture',
      'Git version control & Web hosting',
    ],
    duration: '6 months',
    sessions: '3 sessions / week',
    prerequisites: 'Intro to Computer or equivalent.',
    fee: '$280',
    image: img001 || '/assets/img_001.jpg',
    link: '/academic/courses/website-development',
  },
  {
    id: 'autocad-design',
    title: 'AutoCAD & Technical Drawing',
    level: 'INTERMEDIATE',
    category: 'Technical',
    description:
      '2D drafting, architectural plan creation, and dimensioning layouts · Standard engineering design workflows.',
    learningPoints: [
      'AutoCAD workspace & precision tools',
      'Architectural floor plans & elevations',
      'Layer management & dimensioning',
      'Plotting & PDF blueprint export',
    ],
    duration: '4 months',
    sessions: '2 sessions / week',
    prerequisites: 'Basic technical drafting intuition.',
    fee: '$190',
    image: img002 || '/assets/img_002.jpg',
    link: '/academic/courses/autocad-design',
  },
  {
    id: 'monitoring-evaluation',
    title: 'Monitoring & Evaluation (M&E)',
    level: 'ADVANCED',
    category: 'Professional',
    description:
      'Project tracking frameworks, indicator development, and data collection methodologies for development initiatives.',
    learningPoints: [
      'Logical Framework (LogFrame) design',
      'KPI & indicator tracking matrices',
      'Data collection survey methodology',
      'Impact report writing for donors',
    ],
    duration: '6 months',
    sessions: '3 sessions / week',
    prerequisites: 'Professional or academic background.',
    fee: '$220',
    image: img003 || '/assets/img_003.jpg',
    link: '/academic/courses/monitoring-evaluation',
  },
];

export function Courses() {
  const navigate = useNavigate();
  const [hoveredCourseId, setHoveredCourseId] = useState(null);

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.innerContainer}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <h2 className={styles.sectionTitle}>POPULAR COURSES</h2>
            <div className={styles.thickDivider} />
            <p className={styles.sectionSubtitle}>
              Fees and duration up front. Choose from our top industry-aligned technical and professional offerings.
            </p>
          </div>
        </div>

        {/* 2x4 Course Grid */}
        <motion.div layout className={styles.coursesGrid}>
          <AnimatePresence mode="popLayout">
            {POPULAR_COURSES_DATA.map((course) => {
              const isHovered = hoveredCourseId === course.id;

              return (
                <motion.article
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className={styles.courseCard}
                  onMouseEnter={() => setHoveredCourseId(course.id)}
                  onMouseLeave={() => setHoveredCourseId(null)}
                  onClick={() => navigate(course.link)}
                >
                  {/* Top Card Image */}
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <div className={styles.badgeGroup}>
                      <span className={styles.levelBadge}>{course.level}</span>
                      <span className={styles.categoryBadge}>{course.category}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <p className={styles.courseDescription}>{course.description}</p>

                    {/* Restored Duration and Fee Specs on Main Card */}
                    <div className={styles.metaRow}>
                      <span className={styles.metaText}>{course.duration}</span>
                      <span className={styles.feeBadge}>Fee {course.fee}</span>
                    </div>
                  </div>

                  {/* Twitter-style Expanded Hover Preview with Bullets */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={styles.hoverCardPreview}
                      >
                        <div className={styles.previewHeader}>
                          <span className={styles.previewLevel}>{course.level}</span>
                          <span className={styles.previewFee}>Fee {course.fee}</span>
                        </div>
                        <h4 className={styles.previewTitle}>{course.title}</h4>

                        {/* Bulleted "What you will learn" section */}
                        <div className={styles.learningSection}>
                          <p className={styles.learningHeading}>What you will learn:</p>
                          <ul className={styles.learningList}>
                            {course.learningPoints.map((point, idx) => (
                              <li key={idx} className={styles.learningItem}>
                                <i className="material-symbols-outlined">check_circle</i>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Footer Specs preserved */}
                        <div className={styles.previewMeta}>
                          <span><strong>Duration:</strong> {course.duration}</span>
                          <span><strong>Sessions:</strong> {course.sessions}</span>
                          <span><strong>Prerequisite:</strong> {course.prerequisites}</span>
                        </div>

                        <div className={styles.previewActionPrompt}>
                          <span>Click to view full course details</span>
                          <i className="material-symbols-outlined">arrow_forward</i>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expanded Footer Action Area */}
                  <div className={styles.cardFooter}>
                    <span className={styles.linkLabel}>Learn More</span>
                    <i className={`material-symbols-outlined ${styles.linkIcon}`}>
                      arrow_forward
                    </i>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Explore All CTA Banner */}
        <div className={styles.bottomCtaWrapper}>
          <div className={styles.ctaUpperDivider} />
          <p className={styles.ctaCopyText}>
            Looking for something specific? Browse our complete catalog of 53 accredited technical and professional programs.
          </p>
          <Button
            variant="outline"
            light={false}
            size="lg"
            onClick={() => navigate('/academic/courses')}
          >
            EXPLORE ALL COURSES
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Courses;