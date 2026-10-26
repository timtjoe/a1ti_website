import { PageHero } from '@/components/common/PageHero';
import { StaffCard } from '@/components/staff/StaffCard';
import styles from './LeadershipPage.module.css';

const LEADERSHIP_TEAM = Array.from({ length: 6 }, (_, index) => ({
  id: `leader-${index + 1}`,
  name: 'Name to be confirmed',
  qualification: 'Qualification to be added',
  phone: 'Phone number to be added',
}));

const INSTRUCTORS = Array.from({ length: 8 }, (_, index) => ({
  id: `instructor-${index + 1}`,
  name: 'Name to be confirmed',
  qualification: 'Qualification to be added',
  phone: 'Phone number to be added',
}));

function StaffSection({ title, people, id }) {
  return (
    <section className={styles.staffSection} id={id} aria-labelledby={`${id}-title`}>
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>A-1 Technical Institute</p>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      <div className={styles.grid}>
        {people.map((person) => <StaffCard key={person.id} {...person} />)}
      </div>
    </section>
  );
}

export default function LeadershipPage() {
  return (
    <div>
      <PageHero
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Leadership & staff' },
        ]}
        eyebrow="Our people"
        title="Leadership & staff"
        description="Meet the people supporting A-1 learners and practical training."
      />
      <div className={styles.content}>
        <p className={styles.notice}>
          Staff names, qualifications, and phone numbers are awaiting confirmation from the institute.
        </p>
        <StaffSection title="Leadership team" people={LEADERSHIP_TEAM} id="leadership-team" />
        <StaffSection title="Instructors" people={INSTRUCTORS} id="instructors" />
      </div>
    </div>
  );
}
