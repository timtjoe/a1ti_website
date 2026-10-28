import { motion, useReducedMotion } from 'framer-motion';
import styles from './WhyA1.module.css';

const BENEFITS = [
  {
    title: 'Hands-on first',
    description: 'Practical work on real tools and training rigs, guided by working technicians.',
    icon: 'school',
  },
  {
    title: 'Choose your session',
    description: 'Morning, afternoon or evening sessions let you find a schedule that fits.',
    icon: 'schedule',
  },
  {
    title: 'Free computer training',
    description: 'Build foundational computer skills, including Microsoft Office and internet use.',
    icon: 'computer',
  },
  {
    title: 'Kit included',
    description: 'Technical course fees include a T-shirt, cap, ID card, helmet and vest.',
    icon: 'backpack',
  },
  {
    title: 'Pay in parts',
    description: 'Ask about cash, bank transfer, Orange Money or MTN MoMo and installment plans.',
    icon: 'payments',
  },
  {
    title: 'Certificates employers can verify',
    description: 'Certificates include an ID and QR code for online verification.',
    icon: 'verified',
  },
];

export function WhyA1() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="why-a1-title">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <motion.p 
            className={styles.eyebrow}
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Why A-1
          </motion.p>
          <motion.h2 
            id="why-a1-title"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Everything you need to learn a trade and prove it
          </motion.h2>
        </header>

        <div className={styles.benefitsGrid}>
          {BENEFITS.map((benefit, index) => (
            <motion.article
              className={styles.benefitCard}
              key={benefit.title}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={reduceMotion ? { duration: 0.01 } : { duration: 0.4, delay: index * 0.06 }}
              whileHover={reduceMotion ? {} : { scale: 1.03, y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <i className="material-symbols-outlined">{benefit.icon}</i>
                </div>
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDescription}>{benefit.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyA1;