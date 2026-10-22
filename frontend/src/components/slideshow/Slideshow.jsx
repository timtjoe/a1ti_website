// src/components/slideshow/Slideshow.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export function Slideshow({ slides = [], autoPlayInterval = 6000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!slides || slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [slides, autoPlayInterval, isPaused]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

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

            {currentSlide.ctaButtons && currentSlide.ctaButtons.length > 0 && (
              <motion.div variants={textItemVariants} className={styles.buttonGroup}>
                {currentSlide.ctaButtons.map((btn, idx) => (
                  <Button
                    key={idx}
                    variant={btn.variant || 'secondary'}
                    light={btn.variant === 'outline'}
                    size="lg"
                    leftIcon={btn.leftIcon}
                    rightIcon={btn.rightIcon}
                    onClick={() => {
                      if (btn.onClick) btn.onClick();
                      else if (btn.link) window.location.href = btn.link;
                    }}
                  >
                    {btn.text}
                  </Button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right Side Image */}
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

      {/* Bottom Bar: Centered Indicators & Bottom-Right Pause Control */}
      {slides.length > 1 && (
        <div className={styles.bottomControlBar}>
          <div className={styles.indicators}>
            {slides.map((_, index) => (
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
      )}
    </section>
  );
}

export default Slideshow;