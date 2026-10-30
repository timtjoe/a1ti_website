import { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import portrait01 from '@/assets/img_001.jpeg';
import portrait03 from '@/assets/img_003.jpeg';
import styles from './AlumniPage.module.css';

const entrySpring = { type: 'spring', stiffness: 75, damping: 15, mass: 0.8 };

const alumniProfiles = [
  {
    id: 'sample-president',
    name: 'Sample Alumni President',
    course: 'Technical training graduate',
    position: 'Alumni network leader',
    location: 'Liberia',
    rank: 'Featured graduate',
    certificate: 'Technical training certificate',
    image: portrait01,
  },
  {
    id: 'sample-solar-technician',
    name: 'Sample Solar Technician',
    course: 'Solar installation',
    position: 'Solar installation technician',
    location: 'Paynesville',
    rank: 'Career spotlight',
    certificate: 'Solar installation certificate',
    image: portrait03,
  },
  {
    id: 'sample-ict-specialist',
    name: 'Sample ICT Specialist',
    course: 'Computer science and ICT',
    position: 'ICT support specialist',
    location: 'Monrovia',
    rank: 'Featured graduate',
    certificate: 'ICT training certificate',
    image: portrait01,
  },
  {
    id: 'sample-electrical-technician',
    name: 'Sample Electrical Technician',
    course: 'Electrical installation',
    position: 'Electrical technician',
    location: 'Buchanan',
    rank: 'Career spotlight',
    certificate: 'Electrical installation certificate',
    image: portrait03,
  },
];

const opportunities = [
  {
    id: 'sample-solar-role',
    title: 'Solar Installation Technician',
    organization: 'Sample employer',
    location: 'Paynesville, Liberia',
    type: 'Full time · Demo listing',
    description: 'Support residential solar installations, perform basic system checks, and follow safe work practices.',
    requirements: 'Practical solar installation training, careful attention to safety, and willingness to learn on the job.',
  },
  {
    id: 'sample-ict-role',
    title: 'Junior ICT Support Assistant',
    organization: 'Sample employer',
    location: 'Monrovia, Liberia',
    type: 'Entry level · Demo listing',
    description: 'Help users with common computer issues, set up workstations, and maintain basic support records.',
    requirements: 'Foundational computer skills, clear communication, and a service-oriented approach.',
  },
  {
    id: 'sample-electrical-role',
    title: 'Electrical Installation Trainee',
    organization: 'Sample employer',
    location: 'Buchanan, Liberia',
    type: 'Apprenticeship · Demo listing',
    description: 'Assist an experienced technician with supervised electrical installation and maintenance work.',
    requirements: 'Electrical training, commitment to safety, and availability for supervised practical work.',
  },
];

const filters = [
  { id: 'leadership', label: 'Leadership', icon: 'workspace_premium' },
  { id: 'opportunities', label: 'Opportunities', icon: 'work' },
  { id: 'jobs', label: 'Jobs', icon: 'handshake' },
  { id: 'certificates', label: 'Certificates', icon: 'workspace_premium' },
];

function AlumniProfileCard({ person, onHire }) {
  return (
    <article className={styles.profileCard}>
      <div className={styles.profilePhoto}>
        <img src={person.image} alt="Illustrative sample portrait" loading="lazy" />
        <span>Sample profile</span>
      </div>
      <div className={styles.profileInfo}>
        <p className={styles.profileRank}>{person.rank}</p>
        <h3>{person.name}</h3>
        <p className={styles.profilePosition}>{person.position}</p>
        <dl>
          <div><dt>Training</dt><dd>{person.course}</dd></div>
          <div><dt>Location</dt><dd>{person.location}</dd></div>
        </dl>
        <button type="button" className={styles.hireButton} onClick={() => onHire(person)}>
          Hire this graduate
          <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
        </button>
      </div>
    </article>
  );
}

function MessageForm({ formType, person, opportunity, onClose }) {
  const formCopy = {
    hire: {
      title: `Hire ${person?.name || 'a graduate'}`,
      description: 'Share your organization and role details. A-1 can connect you with the graduate after an approved delivery service is configured.',
      fields: [
        { name: 'organization', label: 'Organization name', type: 'text' },
        { name: 'contact', label: 'Your name', type: 'text' },
        { name: 'email', label: 'Work email', type: 'email' },
        { name: 'phone', label: 'Phone number', type: 'tel' },
      ],
      extraLabel: 'Role or hiring details',
      button: 'Send hiring inquiry',
    },
    apply: {
      title: `Apply for ${opportunity?.title || 'this opportunity'}`,
      description: 'Add your contact details and a short note for the opportunity. Applications are not delivered until a submission service is configured.',
      fields: [
        { name: 'name', label: 'Full name', type: 'text' },
        { name: 'email', label: 'Email address', type: 'email' },
        { name: 'phone', label: 'Phone number', type: 'tel' },
      ],
      extraLabel: 'Relevant experience',
      button: 'Submit application',
    },
    join: {
      title: 'Join the alumni network',
      description: 'Share your details so the Institute can keep you informed when alumni network registration is available.',
      fields: [
        { name: 'name', label: 'Full name', type: 'text' },
        { name: 'email', label: 'Email address', type: 'email' },
        { name: 'phone', label: 'Phone number', type: 'tel' },
        { name: 'course', label: 'Course or program', type: 'text' },
      ],
      extraLabel: 'Graduation year or message',
      button: 'Join the network',
    },
  }[formType];

  if (!formCopy) return null;

  return (
    <section className={styles.requestPanel} aria-labelledby="alumni-request-title">
      <div className={styles.requestHeader}>
        <div>
          <p className={styles.eyebrow}>Request form preview</p>
          <h3 id="alumni-request-title">{formCopy.title}</h3>
          <p>{formCopy.description}</p>
        </div>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close form">
          <span className="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
      </div>
      <div className={styles.deliveryNotice} role="status">
        Form delivery is not configured. Your details will not be sent or saved.
      </div>
      <form className={styles.requestForm} onSubmit={(event) => event.preventDefault()}>
        <div className={styles.formFields}>
          {formCopy.fields.map((field) => (
            <label key={field.name}>
              {field.label}
              <input name={field.name} type={field.type} required />
            </label>
          ))}
        </div>
        <label>
          {formCopy.extraLabel}
          <textarea name="details" rows="4" required />
        </label>
        <button type="submit" disabled aria-disabled="true">{formCopy.button}</button>
      </form>
    </section>
  );
}

function AlumniPage() {
  const [activeFilter, setActiveFilter] = useState('leadership');
  const [search, setSearch] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [request, setRequest] = useState(null);
  const reduceMotion = useReducedMotion();
  const resultsRef = useRef(null);
  const requestRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
  };

  const normalizedSearch = search.trim().toLowerCase();
  const visibleAlumni = useMemo(() => alumniProfiles.filter((person) => (
    [person.name, person.course, person.position, person.location, person.rank, person.certificate]
      .some((value) => value.toLowerCase().includes(normalizedSearch))
  )), [normalizedSearch]);
  const visibleOpportunities = useMemo(() => opportunities.filter((opportunity) => (
    [opportunity.title, opportunity.organization, opportunity.location, opportunity.type, opportunity.description]
      .some((value) => value.toLowerCase().includes(normalizedSearch))
  )), [normalizedSearch]);

  const selectFilter = (filter) => {
    setActiveFilter(filter);
    setSelectedOpportunity(null);
    setRequest(null);
    scrollTo(resultsRef);
  };

  const openRequest = (nextRequest) => {
    setRequest(nextRequest);
    requestAnimationFrame(() => scrollTo(requestRef));
  };

  const heroCards = [
    {
      id: 'opportunities',
      icon: 'work',
      title: 'Alumni opportunities',
      text: 'Explore sample job and apprenticeship listings.',
    },
    {
      id: 'join',
      icon: 'diversity_3',
      title: 'Join the alumni network',
      text: 'Reconnect with graduates and share your progress.',
    },
    {
      id: 'leadership',
      icon: 'person_search',
      title: 'Find a graduate',
      text: 'Discover featured sample profiles and hiring options.',
    },
  ];

  const sectionTitle = {
    leadership: 'Featured alumni',
    opportunities: 'Job opportunities',
    jobs: 'Graduate career stories',
    certificates: 'Graduate certificates',
  }[activeFilter];

  return (
    <div className={styles.alumniPage}>
      <section className={styles.alumniHero} aria-labelledby="alumni-hero-title">
        <div className={styles.alumniHeroContent}>
          <p className={styles.eyebrow}>A-1 graduate network</p>
          <h1 id="alumni-hero-title">What are you looking for?</h1>
          <p className={styles.alumniHeroLead}>Connect graduates with opportunity, employers, and the A-1 community.</p>
          <div className={styles.alumniHeroCards}>
            {heroCards.map((card) => (
              <button
                type="button"
                className={styles.alumniHeroCard}
                key={card.title}
                onClick={() => {
                  if (card.id === 'join') openRequest({ type: 'join' });
                  else selectFilter(card.id);
                }}
              >
                <span className="material-symbols-outlined" aria-hidden="true">{card.icon}</span>
                <span className={styles.heroCardTitle}>{card.title}</span>
                <span className={styles.heroCardText}>{card.text}</span>
                <span className={styles.heroCardLink}>Explore <span aria-hidden="true">→</span></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.alumniStats} aria-labelledby="alumni-stats-title">
        <div className={styles.statsHeading}>
          <div>
            <p className={styles.eyebrow}>Graduate outcomes</p>
            <h2 id="alumni-stats-title">A community moving forward</h2>
          </div>
          <p>Illustrative demo figures only — not verified Institute results.</p>
        </div>
        <figure className={styles.statsGraph} aria-label="Illustrative graduate outcome comparison">
          <div className={styles.statValue}>
            <span>Students trained</span>
            <strong>1,250</strong>
          </div>
          <div className={styles.statBarTrack}><span className={styles.trainedBar} /></div>
          <div className={styles.statValue}>
            <span>Graduates in work</span>
            <strong>760</strong>
          </div>
          <div className={styles.statBarTrack}><span className={styles.workBar} /></div>
          <figcaption>Sample data shown for layout demonstration; replace with dated, verified reporting.</figcaption>
        </figure>
      </section>

      <section className={styles.alumniExplorer} ref={resultsRef} aria-label="Explore alumni and opportunities">
        <aside className={styles.alumniFilters}>
          <p className={styles.eyebrow}>Explore</p>
          <h2>Browse the network</h2>
          <div role="group" aria-label="Filter alumni content">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter.id}
                aria-pressed={activeFilter === filter.id}
                onClick={() => selectFilter(filter.id)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
          <p className={styles.filterNote}>Profiles, openings, and outcomes on this page are illustrative samples.</p>
        </aside>

        <div className={styles.alumniResults}>
          <div className={styles.resultsHeader}>
            <div>
              <p className={styles.eyebrow}>A-1 alumni</p>
              <h2>{sectionTitle}</h2>
            </div>
            <label className={styles.alumniSearch}>
              <span className="material-symbols-outlined" aria-hidden="true">search</span>
              <span className={styles.visuallyHidden}>Search alumni and opportunities</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search alumni..."
              />
            </label>
          </div>

          {(activeFilter === 'leadership' || activeFilter === 'certificates') && (
            <div className={styles.profileGrid}>
              {visibleAlumni
                .filter((person) => activeFilter !== 'certificates' || person.certificate)
                .map((person, index) => (
                  <motion.article
                    className={styles.profileMotion}
                    key={person.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={reduceMotion ? { duration: 0.01 } : { ...entrySpring, delay: index * 0.05 }}
                  >
                    <AlumniProfileCard person={person} onHire={(selected) => openRequest({ type: 'hire', person: selected })} />
                    {activeFilter === 'certificates' && (
                      <p className={styles.certificateLabel}>
                        <span className="material-symbols-outlined" aria-hidden="true">verified</span>
                        Sample: {person.certificate}
                      </p>
                    )}
                  </motion.article>
                ))}
              {visibleAlumni.length === 0 && <p className={styles.emptyState}>No alumni match that search.</p>}
            </div>
          )}

          {activeFilter === 'opportunities' && (
            <div className={styles.opportunityList}>
              {visibleOpportunities.map((opportunity) => (
                <article className={styles.opportunityCard} key={opportunity.id}>
                  <div>
                    <p className={styles.opportunityBadge}>Sample opportunity</p>
                    <h3>{opportunity.title}</h3>
                    <p>{opportunity.organization} · {opportunity.location}</p>
                    <span>{opportunity.type}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.outlineButton}
                    aria-expanded={selectedOpportunity?.id === opportunity.id}
                    onClick={() => setSelectedOpportunity(
                      selectedOpportunity?.id === opportunity.id ? null : opportunity,
                    )}
                  >
                    {selectedOpportunity?.id === opportunity.id ? 'Hide details' : 'View details'}
                  </button>
                </article>
              ))}
              {visibleOpportunities.length === 0 && <p className={styles.emptyState}>No opportunities match that search.</p>}
              {selectedOpportunity && (
                <section className={styles.opportunityDetails} aria-labelledby="opportunity-title">
                  <p className={styles.eyebrow}>Illustrative job listing</p>
                  <h3 id="opportunity-title">{selectedOpportunity.title}</h3>
                  <p>{selectedOpportunity.description}</p>
                  <p><strong>What to bring:</strong> {selectedOpportunity.requirements}</p>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => openRequest({ type: 'apply', opportunity: selectedOpportunity })}
                  >
                    Apply for this opportunity
                  </button>
                </section>
              )}
            </div>
          )}

          {activeFilter === 'jobs' && (
            <div className={styles.hireStories}>
              {visibleAlumni
                .filter((person) => person.position)
                .map((person) => (
                  <article className={styles.hireStory} key={person.id}>
                    <span className="material-symbols-outlined" aria-hidden="true">work_history</span>
                    <div>
                      <p className={styles.opportunityBadge}>Illustrative sample</p>
                      <h3>{person.name}</h3>
                      <p>{person.position} · {person.location}</p>
                      <p>Training: {person.course}</p>
                    </div>
                  </article>
                ))}
              {visibleAlumni.length === 0 && <p className={styles.emptyState}>No graduate stories match that search.</p>}
            </div>
          )}

          {request && (
            <div ref={requestRef} className={styles.requestAnchor}>
              <MessageForm
                formType={request.type}
                person={request.person}
                opportunity={request.opportunity}
                onClose={() => setRequest(null)}
              />
            </div>
          )}
        </div>
      </section>
      <p className={styles.alumniDisclaimer}>All alumni profiles, photographs, job listings, and outcome figures shown here are illustrative demo content, not verified people or current opportunities.</p>
    </div>
  );
}

export default AlumniPage;
