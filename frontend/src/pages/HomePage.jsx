// src/pages/HomePage.jsx
import React from 'react';
import { Slideshow } from '@/components/slideshow/Slideshow';
import { Accreditation } from '@/components/sections/Accreditation';
import { Programs } from '@/components/sections/Programs';
import { Mission } from '@/components/sections/Mission';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <Slideshow />
      <Accreditation />
      <Mission />
      <Programs />
    </div>
  );
}

export default HomePage;