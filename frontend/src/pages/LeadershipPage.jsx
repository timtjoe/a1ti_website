import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PageHero } from '@/components/common/PageHero';
import { StaffCard } from '@/components/staff/StaffCard';
import { MOCK_INSTRUCTORS, MOCK_STAFF } from '@/components/staff/staffData';
import styles from './LeadershipPage.module.css';

const STAFF_GROUPS = [
  { id: 'staff', label: 'Leadership & Staff', people: MOCK_STAFF },
  { id: 'instructors', label: 'Instructors', people: MOCK_INSTRUCTORS },
];

export  function LeadershipPage() {
  const [selectedGroup, setSelectedGroup] = useState('all');
  const reduceMotion = useReducedMotion();

  const visibleGroups = selectedGroup === 'all'
    ? STAFF_GROUPS
    : STAFF_GROUPS.filter((group) => group.id === selectedGroup);

  return (
    <div>
      <PageHero
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Leadership & staff' },
        ]}
        eyebrow="Our people"
        title="Leadership & staff"
        description="Meet the experienced leaders and instructors supporting A-1 learners and practical training."
      />
      <div className={styles.content}>
        <aside className={styles.filters} aria-labelledby="people-filter-title">
          <h2 id="people-filter-title">Filter people</h2>
          <div role="group" aria-label="Choose people to display">
            {[
              { id: 'all', label: 'All' },
              ...STAFF_GROUPS,
            ].map((group) => (
              <button
                type="button"
                key={group.id}
                aria-pressed={selectedGroup === group.id}
                onClick={() => setSelectedGroup(group.id)}
              >
                {group.label}
              </button>
            ))}
          </div>
        </aside>

        <div className={styles.results}>
          {visibleGroups.map((group) => (
            <section className={styles.staffSection} id={group.id} key={group.id}>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>A-1 Technical Institute</p>
                <h2>{group.label}</h2>
              </div>
              <div className={styles.grid}>
                {group.people.map((person, index) => (
                  <StaffCard 
                    key={person.id} 
                    {...person} 
                    index={index} 
                    reduceMotion={reduceMotion} 
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeadershipPage;