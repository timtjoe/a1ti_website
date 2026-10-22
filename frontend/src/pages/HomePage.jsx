// src/pages/HomePage.jsx
import React from 'react';
import { Slideshow } from '@/components/slideshow/Slideshow';
import styles from './HomePage.module.css';

export function HomePage() {
  const homeSlides = [
    {
      headlinePrimary: 'Your Future',
      headlineOutlined: 'Our Focus',
      subtitle: 'We offer accredited courses with practical hand-on experience making you future ready.',
      ctaButtons: [
        { text: 'JOIN COHORT 3', variant: 'secondary', link: '/register' },
        { text: 'ALL COURSES', variant: 'outline', light: true, link: '/academic/programs' }
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=80',
        alt: 'Technical Engineering Team'
      }
    },
    {
      headlinePrimary: 'Empowering Growth',
      headlineOutlined: 'Building Skills',
      subtitle: 'Gain industry-recognized certifications and elevate your career with our specialized training programs.',
      ctaButtons: [
        { text: 'VERIFY CERTIFICATE', variant: 'secondary', leftIcon: 'verified', link: '/verify' },
        { text: 'EXPLORE CERTIFICATIONS', variant: 'outline', light: true, link: '/academic/programs' }
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
        alt: 'Students Collaborating'
      }
    },
    {
      headlinePrimary: 'Admissions Open',
      headlineOutlined: 'Apply Today',
      subtitle: 'Take the first step toward world-class academic excellence. Join our vibrant international learning community.',
      ctaButtons: [
        { text: 'APPLY NOW', variant: 'secondary', leftIcon: 'how_to_reg', link: '/admission/apply' },
        { text: 'TUITION & FEES', variant: 'outline', light: true, link: '/admission/fees' }
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
        alt: 'Students on Campus'
      }
    },
    {
      headlinePrimary: 'Student Portal',
      headlineOutlined: 'Seamless Access',
      subtitle: 'Track your registration, view course schedules, and manage your grades all in one integrated dashboard.',
      ctaButtons: [
        { text: 'STUDENT LOGIN', variant: 'secondary', leftIcon: 'dashboard', link: '/student/portal' },
        { text: 'PORTAL FAQ', variant: 'outline', light: true, link: '/student/faq' }
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
        alt: 'Digital Learning Experience'
      }
    },
    {
      headlinePrimary: 'Global Alumni',
      headlineOutlined: 'Infinite Potential',
      subtitle: 'Connect with a vast network of graduates thriving across global technology, engineering, and business industries.',
      ctaButtons: [
        { text: 'ALUMNI NETWORK', variant: 'secondary', leftIcon: 'group', link: '/student/alumni' },
        { text: 'GET THE APP', variant: 'outline', light: true, leftIcon: 'download', link: '/download' }
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
        alt: 'Successful Graduates'
      }
    }
  ];

  return (
    <div className={styles.homeContainer}>
      <Slideshow slides={homeSlides} autoPlayInterval={6000} />
    </div>
  );
}

export default HomePage;