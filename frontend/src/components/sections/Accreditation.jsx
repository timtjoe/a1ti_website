// src/components/sections/Accreditation.jsx
import React, { useRef, useState, useEffect } from 'react';
import { animate, useInView } from 'framer-motion';
import styles from './Accreditation.module.css';

function CounterNumber({ value, title }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    const hasSeenCounter = sessionStorage.getItem('a1_has_seen_counter');

    if (hasSeenCounter) {
      setDisplayValue(value);
      return;
    }

    if (isInView) {
      const numericVal = parseInt(value, 10);
      const hasPlus = value.includes('+');

      if (isNaN(numericVal)) {
        setDisplayValue(value);
        return;
      }

      const controls = animate(0, numericVal, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(latest) {
          setDisplayValue(Math.floor(latest) + (hasPlus ? '+' : ''));
        },
        onComplete() {
          sessionStorage.setItem('a1_has_seen_counter', 'true');
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className={styles.statCard}>
      <span className={styles.statNumber}>{displayValue}</span>
      <span className={styles.statTitle}>{title}</span>
    </div>
  );
}

export function Accreditation() {
  const statsData = [
    {
      number: '12',
      title: 'Technical Courses',
    },
    {
      number: '3',
      title: 'Integrated Programs',
    },
    {
      number: '3+',
      title: 'Campuses by 2027',
    },
  ];

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.innerContainer}>
        {/* Top Section: Stamp Icon, Centered Heading & 200px Yellow Border Divider */}
        <div className={styles.topHeader}>
          <i className={`material-symbols-outlined ${styles.certificateStamp}`}>
            verified_user
          </i>
          <h2 className={styles.recognitionHeading}>
            Recognised by Liberia’s education and TVET authorities
          </h2>
          <div className={styles.textDivider} />
        </div>

        {/* Bottom Section: Single Row with Right Border Dividers */}
        <div className={styles.statsRow}>
          {statsData.map((stat, index) => (
            <CounterNumber
              key={index}
              value={stat.number}
              title={stat.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Accreditation;