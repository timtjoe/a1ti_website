// src/pages/HomePage.jsx
import React from 'react';
import { Slideshow } from './home/slideshow/Slideshow';
import { Accreditation } from './home/Accreditation';
import { Programs } from './home/Programs';
import { Mission } from './home/Mission';
import { Courses } from './home/Courses';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <Slideshow />
      <Accreditation />
      <Mission />
      <Programs />
      <Courses /> 
    </div>
  );
}

export default HomePage;