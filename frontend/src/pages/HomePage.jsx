// src/pages/HomePage.jsx
import { Slideshow } from './home/slideshow/Slideshow';
import { Accreditation } from './home/Accreditation';
import { Programs } from './home/Programs';
import { Mission } from './home/Mission';
import { Courses } from './home/Courses';
import { HowToJoin } from './home/HowToJoin';
import { Testimonials } from './home/Testimonials';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <Slideshow />
      <Accreditation />
      <Mission />
      <Programs />
      <Courses />
      <HowToJoin />
      <Testimonials />
    </div>
  );
}

export default HomePage;