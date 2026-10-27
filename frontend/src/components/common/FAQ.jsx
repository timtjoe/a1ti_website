import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { FAQ_ITEMS } from './faqData';
import styles from './FAQ.module.css';

export function FAQAccordion({ questions = FAQ_ITEMS }) {
  const [openQuestion, setOpenQuestion] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={styles.questions}>
      {questions.map(({ question, answer }) => {
        const isOpen = openQuestion === question;
        const answerId = `faq-answer-${question.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

        return (
          <div className={styles.item} key={question}>
            <button
              className={styles.questionButton}
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenQuestion(isOpen ? null : question)}
            >
              {question}
              <motion.span
                className="material-symbols-outlined"
                aria-hidden="true"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.2 }}
              >
                expand_more
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={answerId}
                  className={styles.answer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                >
                  <p>{answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function FAQ() {
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Need a hand?</p>
          <h2 id="faq-title">Frequently asked questions</h2>
          <p>Quick answers to help you take the next step.</p>
        </div>
        <FAQAccordion />
      </div>
    </section>
  );
}

export default FAQ;
