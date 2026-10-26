import styles from './FAQ.module.css';

const QUESTIONS = [
  {
    question: 'How do I choose a course?',
    answer: 'Browse the course catalogue and compare the course category, level, duration, and prerequisites. Contact admissions if you need help choosing.',
  },
  {
    question: 'How can I register?',
    answer: 'Use the registration option on the website or visit the Admissions Office for assistance with your application.',
  },
  {
    question: 'What should I expect from the training?',
    answer: 'A-1 focuses on practical, hands-on technical and professional training. Course activities and schedules vary by programme.',
  },
  {
    question: 'Where can I find course requirements and schedules?',
    answer: 'Course prerequisites are listed on each course detail page. Contact the Admissions Office for the latest intake and class schedule information.',
  },
];

export function FAQ() {
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Need a hand?</p>
          <h2 id="faq-title">Frequently asked questions</h2>
          <p>Quick answers to help you take the next step.</p>
        </div>
        <div className={styles.questions}>
          {QUESTIONS.map(({ question, answer }) => (
            <details className={styles.item} key={question}>
              <summary>
                {question}
                <span className="material-symbols-outlined" aria-hidden="true">expand_more</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
