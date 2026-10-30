import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PageHero } from '@/components/common/PageHero';
import { StaffCard } from '@/components/staff/StaffCard';
import { MOCK_INSTRUCTORS, MOCK_STAFF } from '@/components/staff/staffData';
import styles from './LeadershipPage.module.css';

const instituteDirector = MOCK_STAFF.find((person) => person.position.includes('Director'));
const staffLeads = MOCK_STAFF.filter((person) => person !== instituteDirector);
const chiefExecutive = {
  id: 'chief-executive-pending',
  name: 'Name awaiting confirmation',
  position: 'Chief Executive',
  qualification: 'Profile awaiting confirmation',
  image: null,
};

export  function LeadershipPage() {
  const [selectedGroup, setSelectedGroup] = useState('staff');
  const reduceMotion = useReducedMotion();

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
              { id: 'staff', label: 'Staff' },
              { id: 'instructors', label: 'Instructors' },
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
          {selectedGroup === 'staff' && (
            <section className={styles.staffSection} id="staff">
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>A-1 Technical Institute</p>
                <h2>Staff</h2>
              </div>
              <div className={styles.orgChart} aria-label="Staff hierarchy">
                <div className={`${styles.orgLevel} ${styles.orgLevelSingle}`}>
                  <StaffCard {...chiefExecutive} reduceMotion={reduceMotion} />
                </div>
                {instituteDirector && (
                  <>
                    <div
                      className={`${styles.orgConnector} ${styles.orgConnectorSingle}`}
                      aria-hidden="true"
                    />
                    <div className={`${styles.orgLevel} ${styles.orgLevelSingle}`}>
                      <StaffCard
                        {...instituteDirector}
                        index={0}
                        reduceMotion={reduceMotion}
                      />
                    </div>
                  </>
                )}
                {staffLeads.length > 0 && (
                  <>
                    <div className={styles.orgConnector} aria-hidden="true" />
                    <div className={styles.orgLevel}>
                      {staffLeads.map((person, index) => (
                        <StaffCard
                          key={person.id}
                          {...person}
                          index={index + 1}
                          reduceMotion={reduceMotion}
                        />
                      ))}
                    </div>
                  </>
                )}
                {!instituteDirector && (
                  <div className={styles.grid}>
                    {MOCK_STAFF.map((person, index) => (
                      <StaffCard
                        key={person.id}
                        {...person}
                        index={index}
                        reduceMotion={reduceMotion}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
          {selectedGroup === 'instructors' && (
            <section className={styles.staffSection} id="instructors">
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>A-1 Technical Institute</p>
                <h2>Instructors</h2>
              </div>
              <div className={styles.grid}>
                {MOCK_INSTRUCTORS.map((person, index) => (
                  <StaffCard
                    key={person.id}
                    {...person}
                    index={index}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeadershipPage;