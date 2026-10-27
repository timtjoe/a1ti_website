import { useState } from 'react';
import portrait01 from '@/assets/img_001.jpeg';
import portrait02 from '@/assets/img_002.jpeg';
import portrait03 from '@/assets/img_003.jpeg';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    quote: 'The hands-on practice helped me understand how these tools are used on the job.',
    attribution: 'Sample Graduate 01',
    course: 'Technical training',
    image: portrait01,
  },
  {
    quote: 'I learned new skills by working through real tasks with guidance from my instructors.',
    attribution: 'Sample Graduate 02',
    course: 'Practical learning',
    image: portrait02,
  },
  {
    quote: 'The course gave me a clear place to start and a pathway to keep improving.',
    attribution: 'Sample Graduate 03',
    course: 'Career pathway',
    image: portrait03,
  },
];

function TestimonialTrack({ reverse, paused }) {
  return (
    <div className={`${styles.track} ${reverse ? styles.reverse : ''}`} style={{ animationPlayState: paused ? 'paused' : 'running' }}>
      {TESTIMONIALS.map((item) => (
        <article className={styles.quoteCard} key={item.quote}>
          <span className={styles.quoteMark} aria-hidden="true">“</span>
          <blockquote>{item.quote}</blockquote>
          <div className={styles.person}>
            <img src={item.image} alt="" loading="lazy" />
            <div>
              <p className={styles.attribution}>{item.attribution}</p>
              <p className={styles.course}>{item.course}</p>
            </div>
          </div>
        </article>
      ))}
      {TESTIMONIALS.map((item) => (
        <article className={styles.quoteCard} key={`copy-${item.quote}`} aria-hidden="true">
          <span className={styles.quoteMark} aria-hidden="true">“</span>
          <blockquote>{item.quote}</blockquote>
          <div className={styles.person}>
            <img src={item.image} alt="" loading="lazy" />
            <div>
              <p className={styles.attribution}>{item.attribution}</p>
              <p className={styles.course}>{item.course}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.heading}>
        <p className={styles.eyebrow}>Student voices</p>
        <h2 id="testimonials-title">Learning that moves you forward</h2>
        <p className={styles.note}>Sample feedback is shown until approved graduate testimonials are provided.</p>
        <button
          type="button"
          className={styles.pauseButton}
          aria-pressed={paused}
          onClick={() => setPaused((current) => !current)}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {paused ? 'play_arrow' : 'pause'}
          </span>
          {paused ? 'Play testimonials' : 'Pause testimonials'}
        </button>
      </div>
      <div className={styles.marquee} aria-label="Sample student feedback">
        <TestimonialTrack paused={paused} />
        <TestimonialTrack reverse paused={paused} />
      </div>
    </section>
  );
}

export default Testimonials;
