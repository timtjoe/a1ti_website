import { motion, useReducedMotion } from 'framer-motion';
import styles from './WhyA1.module.css';
import image01 from '@/assets/img_003.jpeg';
import image02 from '@/assets/img_004.jpeg';
import image03 from '@/assets/img_005.jpeg';
import image04 from '@/assets/img_006.jpeg';
import image05 from '@/assets/img_007.jpeg';
import image06 from '@/assets/img_008.jpeg';

const BENEFITS = [
  {
    title: 'Hands-on first',
    description: 'Practical work on real tools and training rigs, guided by working technicians.',
    image: image01,
    alt: 'Learners practicing technical skills',
  },
  {
    title: 'Choose your session',
    description: 'Morning, afternoon or evening sessions let you find a schedule that fits.',
    image: image02,
    alt: 'Learners taking part in a training session',
  },
  {
    title: 'Free computer training',
    description: 'Build foundational computer skills, including Microsoft Office and internet use.',
    image: image03,
    alt: 'Computer training at A-1',
  },
  {
    title: 'Kit included',
    description: 'Technical course fees include a T-shirt, cap, ID card, helmet and vest.',
    image: image04,
    alt: 'Technical training equipment',
  },
  {
    title: 'Pay in parts',
    description: 'Ask about cash, bank transfer, Orange Money or MTN MoMo and installment plans.',
    image: image05,
    alt: 'Learner working with technical equipment',
  },
  {
    title: 'Certificates employers can verify',
    description: 'Certificates include an ID and QR code for online verification.',
    image: image06,
    alt: 'A-1 technical training in progress',
  },
];

export function WhyA1() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="why-a1-title">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Why A-1</p>
          <h2 id="why-a1-title">Everything you need to learn a trade and prove it</h2>
        </header>
        <div className={styles.benefits}>
          {BENEFITS.map((benefit, index) => (
            <motion.article
              className={`${styles.benefit} ${index % 2 ? styles.reverse : ''}`}
              key={benefit.title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={reduceMotion ? { duration: 0.01 } : { duration: 0.4, delay: (index % 2) * 0.05 }}
            >
              <img src={benefit.image} alt={benefit.alt} loading="lazy" />
              <div className={styles.copy}>
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyA1;
