// src/pages/HomePage.jsx
import { Slideshow } from './home/slideshow/Slideshow';
import { Accreditation } from './home/Accreditation';
import { Programs } from './home/Programs';
import { Mission } from './home/Mission';
import { Courses } from './home/Courses';
import { HowToJoin } from './home/HowToJoin';
import { VideoExplorer } from './home/Videos';
import { WhyA1 } from './home/WhyA1';
import { Testimonials } from './home/Testimonials';
import { NewsSection } from './home/NewsSection';
import { Partners } from './home/Partners';
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
      <VideoExplorer />
      <WhyA1 />
      <Testimonials />
      <NewsSection />
      <Partners />
    </div>
  );
}

export default HomePage;