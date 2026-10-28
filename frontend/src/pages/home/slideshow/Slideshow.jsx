// src/components/slideshow/Slideshow.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Button } from '@/components/common/Button';
import { RegisterButton } from '@/components/common/RegisterButton';
import styles from './Slideshow.module.css';

// Importing local asset images
import img001 from '@/assets/img_005.jpeg';
import img002 from '@/assets/img_007.jpeg';
import img003 from '@/assets/img_003.jpeg';
import img004 from '@/assets/img_004.jpeg';

const slidePhysics = {
  type: 'spring',
  stiffness: 75,
  damping: 15,
  mass: 0.8,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
      duration: 0.38,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: slidePhysics,
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

// Slide configuration using local asset images
const HOME_SLIDES = [
  {
    headlinePrimary: 'Cohort 4',
    headlineOutlined: 'Enroll Today',
    subtitle:
      'Learn it with your hands. Prove it with a certificate anyone can check. Classes meet once a week for 3 hours in your chosen session.',
    ctaButtons: [
      {
        text: 'REGISTER NOW',
        variant: 'secondary',
        link: '/register',
      },
      {
        text: 'ABOUT COHORT 4',
        variant: 'outline',
        light: true,
        link: '/about/overview',
      },
    ],
    image: {
      src: img001 || '/assets/img_001.jpg',
      alt: 'Cohort 4 Hands-on Practical Training',
    },
  },
  {
    headlinePrimary: '1M Impacted',
    headlineOutlined: 'Target 2036',
    subtitle:
      'Follow our mission to train one million young people. Track projected vs. actual impact stats live from Smart School records or on our mobile app.',
    ctaButtons: [
      {
        text: 'SEE PROGRESS',
        variant: 'secondary',
        link: '/media/reports',
      },
      {
        text: 'OUR MISSION',
        variant: 'outline',
        light: true,
        link: '/about/mission',
      },
    ],
    image: {
      src: img002 || '/assets/img_002.jpg',
      alt: 'Hand holding Android phone displaying progress mobile app',
    },
  },
  {
    headlinePrimary: 'Verified Certificates',
    // headlineOutlined: 'Accredited & Trusted',
    subtitle:
      'Certificates employers can check in seconds. Every A-1 certificate carries a unique ID and QR code to verify graduate records instantly.',
    ctaButtons: [
      {
        text: 'VERIFY CERTIFICATE',
        variant: 'secondary',
        link: '/verify',
      },
      {
        text: 'PARTNER WITH US',
        variant: 'outline',
        light: true,
        link: '/contact',
      },
    ],
    image: {
      src: img003 || '/assets/img_003.jpg',
      alt: 'Student holding verified certificate',
    },
  },
  {
    headlinePrimary: 'Accredited by MOE and AITB',
    // headlineOutlined: 'MOE & AITB',
    subtitle:
      'Technical & professional courses across Liberia — Solar, Electrical, AutoCAD, CCTV, Web Development, M&E and more. Accredited by MOE and AITB.',
    ctaButtons: [
      {
        text: 'EXPLORE COURSES',
        variant: 'secondary',
        link: '/academic/courses',
      },
    ],
    image: {
      src: img004 || '/assets/img_004.jpg',
      alt: 'Accredited A1 Training Center Facilities',
    },
  },
];

export function Slideshow({ autoPlayInterval = 6000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HOME_SLIDES.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, isPaused]);

  const currentSlide = HOME_SLIDES[currentIndex];

  return (
    <section className={styles.slideshowContainer}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          className={styles.slideContentWrapper}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Full-Rectangular Background Image with Balanced Visibility */}
          {currentSlide.image && (
            <div className={styles.backgroundImageWrapper}>
              <img
                src={currentSlide.image.src}
                alt=""
                className={styles.backgroundImageBlur}
              />
              <div className={styles.backgroundOverlay} />
            </div>
          )}

          {/* Centered Content Container */}
          <div className={styles.textContent}>
            <h1 className={styles.headline}>
              <motion.span
                variants={textItemVariants}
                className={styles.headlineTop}
              >
                {currentSlide.headlinePrimary}
              </motion.span>
              <motion.span
                variants={textItemVariants}
                className={styles.headlineBottom}
              >
                {currentSlide.headlineOutlined}
              </motion.span>
            </h1>

            <motion.p variants={textItemVariants} className={styles.subtitle}>
              {currentSlide.subtitle}
            </motion.p>

            {/* CTA Button Group */}
            {currentSlide.ctaButtons && currentSlide.ctaButtons.length > 0 && (
              <motion.div
                variants={textItemVariants}
                className={styles.buttonGroup}
              >
                {currentSlide.ctaButtons.map((btn, idx) => btn.link === '/register' ? (
                  <RegisterButton
                    key={idx}
                    variant={btn.variant || 'secondary'}
                    size="lg"
                    leftIcon={btn.leftIcon}
                  >
                    {btn.text}
                  </RegisterButton>
                ) : (
                  <Button
                    key={idx}
                    variant={btn.variant || 'secondary'}
                    light={btn.variant === 'outline'}
                    size="lg"
                    leftIcon={btn.leftIcon}
                    onClick={() => {
                      if (btn.link) navigate(btn.link);
                    }}
                  >
                    {btn.text}
                  </Button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Control Bar */}
      <div className={styles.bottomControlBar}>
        <div className={styles.indicators}>
          {HOME_SLIDES.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicatorBar} ${
                index === currentIndex ? styles.activeBar : ''
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex && !isPaused && (
                <motion.span
                  className={styles.activeProgressFill}
                  layoutId="activeProgress"
                  transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          className={styles.pausePlayButton}
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
        >
          <i className="material-symbols-outlined">
            {isPaused ? 'play_arrow' : 'pause'}
          </i>
        </button>
      </div>
    </section>
  );
}

export default Slideshow;