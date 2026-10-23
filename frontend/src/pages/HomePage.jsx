// src/pages/HomePage.jsx
import React from 'react';
import { Slideshow } from '@/components/slideshow/Slideshow';
import { Accreditation } from '@/components/sections/Accreditation';
import { Mission } from '@/components/sections/Mission';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <Slideshow />
      <Accreditation />
      <Mission />
    </div>
  );
}

export default HomePage;