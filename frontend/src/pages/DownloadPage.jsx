import { Link } from 'react-router';
import { PageHero } from '@/components/common/PageHero';
import styles from './DownloadPage.module.css';

export default function DownloadPage() {
  return (
    <div>
      <PageHero
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Download the app' },
        ]}
        eyebrow="A-1 student app"
        title="Learning on the go"
        description="The A-1 student app download link will be published here when it is available."
      />
      <section className={styles.content}>
        <span className={`material-symbols-outlined ${styles.icon}`} aria-hidden="true">phone_iphone</span>
        <h2>App download coming soon</h2>
        <p>In the meantime, explore courses and contact admissions for help with your next step.</p>
        <Link to="/academic/courses">Explore all courses</Link>
      </section>
    </div>
  );
}
