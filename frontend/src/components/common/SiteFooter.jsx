import { Link } from 'react-router';
import styles from './SiteFooter.module.css';

const FOOTER_GROUPS = [
  {
    title: 'About',
    links: [
      { label: 'About A-1', to: '/' },
      { label: 'Leadership & staff', to: '/about/leadership' },
      { label: 'Mission 2036', to: '/about/mission' },
      { label: 'Our campuses', to: '/about/campuses' },
    ],
  },
  {
    title: 'Academics',
    links: [
      { label: 'All courses', to: '/academic/courses' },
      { label: 'Technical courses', to: '/academic/courses?category=Technical' },
      { label: 'Professional courses', to: '/academic/courses?category=Professional' },
      { label: 'Integrated programs', to: '/academic/programs/integrated' },
      { label: 'Departments', to: '/academic/departments' },
    ],
  },
  {
    title: 'Admissions',
    links: [
      { label: 'How to join', to: '/#how-to-join' },
      { label: 'Register', to: '/register' },
      { label: 'Fees & payment', to: '/admission/fees' },
      { label: 'Entry requirements', to: '/admission/requirements' },
      { label: 'FAQs', to: '/admission/faq' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Student voices', to: '/#testimonials-title' },
      { label: 'News', to: '/media/news' },
      { label: 'Reports', to: '/media/reports' },
      { label: 'Gallery', to: '/media/gallery' },
      { label: 'Contact', to: '/contact' },
      { label: 'Download the app', to: '/download' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.brandLink}>A-1 Technical Institute</Link>
            <p className={styles.tagline}>Your Future, Our Focus</p>
            <p className={styles.summary}>
              Hands-on technical and professional training to help you build skills for work.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <nav className={styles.linkGroup} aria-label={group.title} key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map((link) => (
                <Link key={link.label} to={link.to}>{link.label}</Link>
              ))}
            </nav>
          ))}
        </div>

        <div className={styles.accreditation}>
          Accredited by the Ministry of Education (MOE) and the Agricultural and Industrial Training Bureau (AITB).
        </div>

        <section className={styles.appCta} aria-labelledby="footer-app-title">
          <div>
            <p className={styles.appEyebrow}>Learning on the go</p>
            <h2 id="footer-app-title">Take A-1 with you</h2>
            <p>Get updates when the A-1 student app is ready to download.</p>
          </div>
          <Link to="/download" className={styles.appButton}>
            Download the app
            <span className="material-symbols-outlined" aria-hidden="true">download</span>
          </Link>
        </section>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} A-1 Technical Institute</span>
          <Link to="/academic/courses">Courses</Link>
          <Link to="/about/leadership">Contact & leadership</Link>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
