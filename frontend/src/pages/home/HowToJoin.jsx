import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/common/Button';
import styles from './HowToJoin.module.css';

// Step Configuration Data with Contrast Theme Flags
const JOIN_STEPS_DATA = [
  {
    stepNumber: '01',
    title: 'Choose',
    subtitle: 'Pick your course & schedule',
    accentColor: 'var(--navy-deep)',
    borderColor: 'var(--gold-bright)',
    textColorTheme: 'light',
    summary: 'Pick a course or program, your campus and your preferred weekly session.',
    extendedDetails: [
      'Browse 53+ accredited technical and professional courses.',
      'Select convenient morning, afternoon, or evening sessions.',
      'Choose between Main Campus or Regional Training Centers.',
    ],
    actionHint: 'Explore course catalog',
  },
  {
    stepNumber: '02',
    title: 'Register',
    subtitle: '4 simple screens or in-person',
    accentColor: 'var(--blue-royal)',
    borderColor: 'var(--indigo-soft)',
    textColorTheme: 'light',
    summary: 'Register online in four quick screens, or visit the Admissions Office.',
    extendedDetails: [
      'Fill out student biographic and contact information.',
      'Upload valid ID (National ID, Passport, or Student ID).',
      'Receive your instant digital pre-admission confirmation.',
    ],
    actionHint: 'Start online registration',
  },
  {
    stepNumber: '03',
    title: 'Pay',
    subtitle: 'Flexible payment pathways',
    accentColor: 'var(--amber-vibrant)',
    borderColor: 'var(--gold-bright)',
    textColorTheme: 'dark', // Ensures dark navy text for max contrast on bright amber
    summary: 'Pay in full or secure your seat with the first installment by cash, bank, or mobile money.',
    extendedDetails: [
      'Supported methods: Lonestar Cell MTN Mobile Money, Orange Money, or Bank Deposit.',
      'Flexible 3-stage installment payment plans available.',
      'Instant electronic payment receipt generated for verification.',
    ],
    actionHint: 'View fee structure',
  },
  {
    stepNumber: '04',
    title: 'Start Class',
    subtitle: 'Collect kit & join schedule',
    accentColor: 'var(--color-success)',
    borderColor: '#34D399',
    textColorTheme: 'light',
    summary: 'Collect your practical kit, ID card, and class schedule, then begin training.',
    extendedDetails: [
      'Pick up workshop safety gear, uniforms, and textbooks.',
      'Receive official student biometric ID card.',
      'Attend orientation session and begin first practical lab.',
    ],
    actionHint: 'View orientation dates',
  },
];

export function HowToJoin() {
  const navigate = useNavigate();
  const [hoveredStepIndex, setHoveredStepIndex] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ vertical: 'top', horizontal: 'center' });
  const circleRefs = useRef([]);

  // Calculate viewport boundary clearances relative to the circular badge element
  const handleCircleMouseEnter = (index) => {
    setHoveredStepIndex(index);
    const circleElement = circleRefs.current[index];

    if (circleElement) {
      const rect = circleElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Vertical position check relative to circle badge
      const vertical = rect.top < 280 ? 'bottom' : 'top';

      // Horizontal edge detection
      let horizontal = 'center';
      if (rect.left < 150) {
        horizontal = 'left';
      } else if (viewportWidth - rect.right < 150) {
        horizontal = 'right';
      }

      setPopoverPosition({ vertical, horizontal });
    }
  };

  const handleCircleMouseLeave = () => {
    setHoveredStepIndex(null);
  };

  const getPopoverPositionClasses = () => {
    const vClass =
      popoverPosition.vertical === 'bottom'
        ? styles.popoverBelow
        : styles.popoverAbove;

    let hClass = styles.popoverCenter;
    if (popoverPosition.horizontal === 'left') {
      hClass = styles.popoverAlignLeft;
    } else if (popoverPosition.horizontal === 'right') {
      hClass = styles.popoverAlignRight;
    }

    return `${vClass} ${hClass}`;
  };

  return (
    <section id="how-to-join" className={styles.sectionContainer}>
      <div className={styles.innerContainer}>
        {/* Header Section */}
        <div className={styles.headerRow}>
          <h2 className={styles.sectionTitle}>HOW TO JOIN</h2>
          <div className={styles.thickDivider} />
          <p className={styles.sectionSubtitle}>
            From choosing a course to stepping into your first practical class session in four simple stages.
          </p>
        </div>

        {/* Diagram Pipeline */}
        <div className={styles.diagramPipelineWrapper}>
          {/* Continuous Track Line */}
          <div className={styles.continuousRailLine} />

          {/* Animated Particles Motion Track with Connection Arrows */}
          <svg className={styles.animatedParticleSvg} viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
            <line x1="120" y1="30" x2="880" y2="30" className={styles.staticLineTrack} />
            <motion.line
              x1="120"
              y1="30"
              x2="880"
              y2="30"
              className={styles.animatedFlowLine}
              animate={{ strokeDashoffset: [0, -40] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            {/* Directional Arrowheads pointing from step to step & at the end */}
            <polygon points="365,24 375,30 365,36" className={styles.trackArrow} />
            <polygon points="615,24 625,30 615,36" className={styles.trackArrow} />
            <polygon points="875,24 885,30 875,36" className={styles.trackArrow} />
          </svg>

          <div className={styles.diagramPipeline}>
            {JOIN_STEPS_DATA.map((step, idx) => {
              const isHovered = hoveredStepIndex === idx;
              const isDarkTheme = step.textColorTheme === 'dark';

              return (
                <div key={step.stepNumber} className={styles.stepColumn}>
                  <div className={styles.stepNodeContainer}>
                    {/* Anchor Wrapper around Circular Step Badge */}
                    <div
                      className={styles.badgeAnchorWrapper}
                      ref={(el) => (circleRefs.current[idx] = el)}
                      onMouseEnter={() => handleCircleMouseEnter(idx)}
                      onMouseLeave={handleCircleMouseLeave}
                    >
                      <motion.div
                        className={styles.largeCircleBadge}
                        style={{
                          backgroundColor: step.accentColor,
                          borderColor: step.borderColor,
                        }}
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <span
                          className={styles.circleNumber}
                          style={{ color: isDarkTheme ? '#0D0460' : 'var(--gold-bright)' }}
                        >
                          {step.stepNumber}
                        </span>
                        <span
                          className={styles.circleLabel}
                          style={{ color: isDarkTheme ? '#0D0460' : '#FFFFFF' }}
                        >
                          {step.title}
                        </span>
                      </motion.div>

                      {/* Viewport-Aware Popover */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              scale: 0.92,
                              y: popoverPosition.vertical === 'bottom' ? -8 : 8,
                            }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                              opacity: 0,
                              scale: 0.94,
                              y: popoverPosition.vertical === 'bottom' ? -6 : 6,
                            }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className={`${styles.popoverCard} ${getPopoverPositionClasses()} ${
                              isDarkTheme ? styles.darkContrastTheme : ''
                            }`}
                            style={{
                              backgroundColor: step.accentColor,
                              borderColor: step.borderColor,
                            }}
                          >
                            <div className={styles.popoverHeader}>
                              <span className={styles.popoverBadge}>
                                STEP {step.stepNumber}
                              </span>
                              <span className={styles.popoverTitle}>{step.title}</span>
                            </div>

                            <div className={styles.popoverBody}>
                              <p className={styles.popoverHeading}>
                                Key Requirements & Next Steps:
                              </p>
                              <ul className={styles.popoverList}>
                                {step.extendedDetails.map((detail, dIdx) => (
                                  <li key={dIdx} className={styles.popoverListItem}>
                                    <i className="material-symbols-outlined">check_circle</i>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className={styles.popoverFooter}>
                              <span>{step.actionHint}</span>
                              <i className="material-symbols-outlined">arrow_forward</i>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Summary Card below circle */}
                    <div className={styles.stepCardContent}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <span className={styles.stepSubtitle}>{step.subtitle}</span>
                      <p className={styles.stepSummary}>{step.summary}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Action Row */}
        <div className={styles.bottomCtaRow}>
          <p className={styles.ctaPrompt}>
            Ready to gain hands-on technical skills? Admissions for the upcoming intake are currently open.
          </p>
          <div className={styles.ctaButtonGroup}>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/register')}
            >
              REGISTER ONLINE NOW
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              VISIT ADMISSIONS OFFICE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowToJoin;