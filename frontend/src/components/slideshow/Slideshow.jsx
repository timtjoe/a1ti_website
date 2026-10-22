// src/components/slideshow/Slideshow.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Button } from '@/components/common/Button';
import styles from './Slideshow.module.css';

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

const imageVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      ...slidePhysics,
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    scale: 0.98,
    transition: { duration: 0.38, ease: 'easeOut' },
  },
};

// Self-contained slide configuration with refined copy and actions
const HOME_SLIDES = [
  {
    headlinePrimary: 'Cohort 4',
    headlineOutlined: 'Enroll Today',
    subtitle: 'Learn it with your hands. Prove it with a certificate anyone can check. Classes meet once a week for 3 hours in your chosen session.',
  
    ctaButtons: [
      { 
        text: 'REGISTER NOW', 
        variant: 'secondary', 
        leftIcon: 'app_registration', 
        link: '/register' 
      },
      { 
        text: 'ABOUT COHORT 53', 
        variant: 'outline', 
        light: true, 
        leftIcon: 'info', 
        link: '/about/overview' 
      }
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=80',
      alt: 'Cohort 53 Hands-on Practical Training'
    }
  },
  {
    headlinePrimary: '1M Impacted',
    headlineOutlined: 'Target 2036',
    subtitle: 'Follow our mission to train one million young people. Track projected vs. actual impact stats live from Smart School records or on our mobile app.',
    ctaButtons: [
      { 
        text: 'SEE PROGRESS', 
        variant: 'secondary', 
        leftIcon: 'analytics', 
        link: '/media/reports' 
      },
      { 
        text: 'OUR MISSION', 
        variant: 'outline', 
        light: true, 
        leftIcon: 'visibility', 
        link: '/about/mission' 
      }
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
      alt: 'Hand holding Android phone displaying progress mobile app'
    }
  },
  {
    headlinePrimary: 'Instant Verification',
    headlineOutlined: 'QR & Unique ID',
    subtitle: 'Certificates employers can check in seconds. Every A-1 certificate carries a unique ID and QR code to verify graduate records instantly.',
    ctaButtons: [
      { 
        text: 'VERIFY CERTIFICATE', 
        variant: 'secondary', 
        leftIcon: 'verified', 
        link: '/verify' 
      },
      { 
        text: 'PARTNER WITH US', 
        variant: 'outline', 
        light: true, 
        leftIcon: 'handshake', 
        link: '/contact' 
      }
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
      alt: 'Student holding verified certificate'
    }
  },
  {
    headlinePrimary: 'Accredited Programs',
    headlineOutlined: 'MOE & AITB',
    subtitle: 'Technical & professional courses across Liberia — Solar, Electrical, AutoCAD, CCTV, Web Development, M&E and more. Accredited by MOE and AITB.',
    ctaButtons: [
      { 
        text: 'EXPLORE COURSES', 
        variant: 'secondary', 
        leftIcon: 'school', 
        link: '/academic/courses' 
      }
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
      alt: 'Accredited A1 Training Center Facilities'
    }
  }
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
          {/* Left Side Content */}
          <div className={styles.textContent}>
            <h1 className={styles.headline}>
              <motion.span variants={textItemVariants} className={styles.headlineTop}>
                {currentSlide.headlinePrimary}
              </motion.span>
              <motion.span variants={textItemVariants} className={styles.headlineBottom}>
                {currentSlide.headlineOutlined}
              </motion.span>
            </h1>

            <motion.p variants={textItemVariants} className={styles.subtitle}>
              {currentSlide.subtitle}
            </motion.p>

            {/* Optional Stats Badges (Cohort Slide) */}
            {currentSlide.stats && (
              <motion.div variants={textItemVariants} className={styles.statsContainer}>
                {currentSlide.stats.map((stat, sIdx) => (
                  <div key={sIdx} className={styles.statBox}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA Button Group */}
            {currentSlide.ctaButtons && currentSlide.ctaButtons.length > 0 && (
              <motion.div variants={textItemVariants} className={styles.buttonGroup}>
                {currentSlide.ctaButtons.map((btn, idx) => (
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

          {/* Right Side Visual Image */}
          {currentSlide.image && (
            <div className={styles.imageWrapper}>
              <motion.img
                variants={imageVariants}
                src={currentSlide.image.src}
                alt={currentSlide.image.alt || 'Banner graphic'}
                className={styles.foregroundImage}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Control Bar */}
      <div className={styles.bottomControlBar}>
        <div className={styles.indicators}>
          {HOME_SLIDES.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicatorBar} ${index === currentIndex ? styles.activeBar : ''}`}
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