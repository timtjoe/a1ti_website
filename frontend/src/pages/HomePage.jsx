// src/pages/HomePage.jsx
import React from 'react';
import { Slideshow } from '@/components/slideshow/Slideshow';
import { Accreditation } from '@/components/sections/Accreditation';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <Slideshow />
      <Accreditation />
    </div>
  );
}

export default HomePage;