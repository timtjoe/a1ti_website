import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import portrait01 from '@/assets/img_001.jpeg';
import portrait03 from '@/assets/img_003.jpeg';
import { StaffCard } from '@/components/staff/StaffCard';
import {
  submitAlumniJoinRequest,
  submitHireInquiry,
  submitJobApplication,
} from '@/services/alumniService';
import alumniProfilesData from '@/data/alumniProfiles.json';
import jobOpportunitiesData from '@/data/jobOpportunities.json';
import styles from './AlumniPage.module.css';

const alumniProfiles = alumniProfilesData.map((person) => ({
  ...person,
  image: person.id.includes('002') || person.id.includes('011') || person.id.includes('025') ? portrait03 : portrait01,
  imageAlt: `Portrait of ${person.name}`,
}));

const opportunities = jobOpportunitiesData;

const filters = [
  { id: 'leadership', label: 'Leadership', icon: 'workspace_premium' },
  { id: 'opportunities', label: 'Opportunities', icon: 'work' },
  { id: 'jobs', label: 'Jobs', icon: 'handshake' },
  { id: 'certificates', label: 'Certificates', icon: 'verified' },
];

// Replace this mock object with the Institute's reporting API response later.
const graduateOutcomeMock = {
  studentsTrained: 1250,
  opportunitiesSecured: 760,
};

const opportunityShare = Math.round(
  (graduateOutcomeMock.opportunitiesSecured / graduateOutcomeMock.studentsTrained) * 100,
);

const outcomePieData = [
  {
    id: 'secured',
    name: 'Opportunity secured',
    value: graduateOutcomeMock.opportunitiesSecured,
    share: opportunityShare,
    color: '#16a34a',
  },
  {
    id: 'not-recorded',
    name: 'No opportunity recorded',
    value: graduateOutcomeMock.studentsTrained - graduateOutcomeMock.opportunitiesSecured,
    share: 100 - opportunityShare,
    color: '#f6c30a',
  },
];

const formCopy = {
  hire: {
    eyebrow: 'Hire a graduate',
    description: 'Share your organization and role details so A-1 can connect you with this graduate.',
    fields: [
      { name: 'organization', label: 'Organization name', type: 'text', autoComplete: 'organization' },
      { name: 'contact', label: 'Your name', type: 'text', autoComplete: 'name' },
      { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email' },
      { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' },
    ],
    extraLabel: 'Role or hiring details',
    button: 'Send hiring inquiry',
    successMessage: 'Your hiring inquiry has been received.',
  },
  apply: {
    eyebrow: 'Application',
    description: 'Add your contact details, upload your CV, and attach any supporting documents.',
    fields: [
      { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name' },
      { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email' },
      { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' },
    ],
    extraLabel: 'Relevant experience',
    button: 'Submit application',
    successMessage: 'Your job application has been received.',
  },
  join: {
    eyebrow: 'Alumni network',
    description: 'Share your details so the Institute can keep you informed about alumni activities.',
    fields: [
      { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name' },
      { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email' },
      { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' },
      { name: 'course', label: 'Course or program', type: 'text' },
    ],
    extraLabel: 'Graduation year or message',
    button: 'Join the network',
    successMessage: 'Your alumni network request has been received.',
  },
};

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const CV_ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const DOCUMENT_ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,image/webp';

function formatFileSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function RequestForm({ formType, person, opportunity }) {
  const copy = formCopy[formType];
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [documentFiles, setDocumentFiles] = useState([]);

  if (!copy) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    const values = {};
    formData.forEach((value, key) => {
      if (typeof value === 'string') values[key] = value;
    });

    if (formType === 'apply') {
      const cv = formData.get('cv');
      const documents = formData
        .getAll('documents')
        .filter((file) => file instanceof File && file.size > 0);

      if (!(cv instanceof File) || cv.size === 0) {
        setError('Upload your CV to submit an application.');
        setStatus('error');
        return;
      }

      if (documents.length > 5) {
        setError('Attach up to five supporting documents.');
        setStatus('error');
        return;
      }

      const oversized = [cv, ...documents].find((file) => file.size > MAX_UPLOAD_BYTES);
      if (oversized) {
        setError(`"${oversized.name}" is larger than 5 MB. Please upload a smaller file.`);
        setStatus('error');
        return;
      }
    }

    setStatus('submitting');

    try {
      let response;
      if (formType === 'hire') {
        response = await submitHireInquiry({
          ...values,
          personId: person?.id,
          personName: person?.name,
        });
      } else if (formType === 'apply') {
        // Send multipart/form-data so the CV and supporting documents reach the API.
        formData.append('jobId', opportunity?.id || '');
        formData.append('jobTitle', opportunity?.title || '');
        formData.append('organization', opportunity?.organization || '');
        response = await submitJobApplication(formData);
      } else {
        response = await submitAlumniJoinRequest(values);
      }

      setReference(response?.reference || '');
      setStatus('success');
      setCvFile(null);
      setDocumentFiles([]);
      formRef.current?.reset();
    } catch (submitError) {
      setError(submitError.message || 'The form could not be sent. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.formSuccess} role="status">
        <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
        <div>
          <h4>{copy.successMessage}</h4>
          <p>
            {reference && <>Reference <strong>{reference}</strong>. </>}
            The A-1 team will follow up using the contact details you provided.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.requestForm} onSubmit={handleSubmit}>
      <div className={styles.formFields}>
        {copy.fields.map((field) => (
          <label key={field.name}>
            {field.label}
            <input
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
            />
          </label>
        ))}
      </div>
      <label>
        {copy.extraLabel}
        <textarea name="details" rows="4" required />
      </label>
      {formType === 'apply' && (
        <div className={styles.fileFields}>
          <label className={styles.fileField}>
            <span className={styles.fileLabel}>
              CV / résumé <span className={styles.requiredMark} aria-hidden="true">*</span>
            </span>
            <input
              className={styles.fileInput}
              name="cv"
              type="file"
              accept={CV_ACCEPT}
              required
              onChange={(event) => setCvFile(event.currentTarget.files?.[0] || null)}
            />
            <span className={styles.fileHint}>PDF or Word document, up to 5 MB.</span>
            {cvFile && (
              <span className={styles.fileSelected}>
                Selected: {cvFile.name} ({formatFileSize(cvFile.size)})
              </span>
            )}
          </label>

          <label className={styles.fileField}>
            <span className={styles.fileLabel}>
              Other documents <span className={styles.optionalMark}>(optional)</span>
            </span>
            <input
              className={styles.fileInput}
              name="documents"
              type="file"
              accept={DOCUMENT_ACCEPT}
              multiple
              onChange={(event) => setDocumentFiles(Array.from(event.currentTarget.files || []))}
            />
            <span className={styles.fileHint}>
              Certificates, transcripts, or portfolio files. Up to 5 files, 5 MB each.
            </span>
            {documentFiles.length > 0 && (
              <span className={styles.fileSelected}>
                {documentFiles.length} file{documentFiles.length > 1 ? 's' : ''} selected:{' '}
                {documentFiles.map((file) => file.name).join(', ')}
              </span>
            )}
          </label>
        </div>
      )}
      {status === 'error' && <p className={styles.formError} role="alert">{error}</p>}
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : copy.button}
      </button>
      <p className={styles.formNote}>By submitting, you agree that A-1 may contact you about this request.</p>
    </form>
  );
}

function Modal({ open, onClose, labelledBy, wide = false, children }) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseRef.current?.();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href]',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      trigger?.focus?.();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.dialogBackdrop}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduceMotion ? { duration: 0.01 } : undefined}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            className={`${styles.dialog} ${wide ? styles.dialogWide : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex="-1"
            ref={dialogRef}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            transition={reduceMotion ? { duration: 0.01 } : { duration: 0.2 }}
          >
            {children}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const getPieInnerRadius = (outerRadius, padding = 1) => {
  const inner = outerRadius - padding;
  return inner < 0 ? 0 : inner;
};

function OutcomeTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const datum = payload[0]?.payload;
  if (!datum) return null;

  return (
    <div className={styles.chartTooltip}>
      <strong>{datum.name}</strong>
      <span>{datum.value.toLocaleString()} graduates</span>
      <span>{datum.share}% share of students trained</span>
    </div>
  );
}

function PersonSummary({ person }) {
  return (
    <div className={styles.hireSummary}>
      <img src={person.image} alt={`Illustrative sample portrait of ${person.name}`} />
      <div>
        <p className={styles.profileRank}>{person.rank}</p>
        <h3>{person.name}</h3>
        <p className={styles.hirePosition}>{person.position}</p>
        <dl>
          <div><dt>Training</dt><dd>{person.course}</dd></div>
          <div><dt>Location</dt><dd>{person.location}</dd></div>
          <div><dt>Certificate</dt><dd>{person.certificate}</dd></div>
        </dl>
      </div>
    </div>
  );
}

function AlumniPage() {
  const [activeFilter, setActiveFilter] = useState('leadership');
  const [search, setSearch] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [dialog, setDialog] = useState(null);
  const reduceMotion = useReducedMotion();
  const resultsRef = useRef(null);
  const detailRef = useRef(null);
  const applyRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
  };

  const normalizedSearch = search.trim().toLowerCase();
  const visibleAlumni = useMemo(() => alumniProfiles.filter((person) => (
    [person.name, person.course, person.position, person.location, person.rank, person.certificate]
      .some((value) => value.toLowerCase().includes(normalizedSearch))
  )), [normalizedSearch]);

  const visibleOpportunities = useMemo(() => opportunities.filter((opportunity) => (
    [
      opportunity.title,
      opportunity.organization,
      opportunity.location,
      opportunity.type,
      opportunity.salary,
      opportunity.description,
      opportunity.requirements,
      opportunity.responsibilities.join(' '),
      opportunity.perks.join(' '),
    ].some((value) => value.toLowerCase().includes(normalizedSearch))
  )), [normalizedSearch]);

  const selectFilter = (filter) => {
    setActiveFilter(filter);
    setSelectedOpportunity(null);
    setDialog(null);
    requestAnimationFrame(() => scrollTo(resultsRef));
  };

  const openJob = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setDialog(null);
    requestAnimationFrame(() => scrollTo(detailRef));
  };

  const closeJob = () => {
    setSelectedOpportunity(null);
    requestAnimationFrame(() => scrollTo(resultsRef));
  };

  const scrollToApplication = () => {
    applyRef.current?.scrollIntoView({
      behavior: reduceMotion ? 'instant' : 'smooth',
      block: 'start',
    });
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
    leadership: 'Graduates',
    opportunities: 'Job opportunities',
    jobs: 'Career stories',
    certificates: 'Certificates',
  }[activeFilter];

  if (selectedOpportunity) {
    return (
      <div className={styles.alumniPage}>
        <section className={styles.jobDetailPage} ref={detailRef} aria-labelledby="job-detail-title">
          <button type="button" className={styles.backButton} onClick={closeJob}>
            <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
            Back to opportunities
          </button>

          <div className={styles.jobDetailHero}>
            <div>
              <p className={styles.eyebrow}>Opportunity</p>
              <h1 id="job-detail-title">{selectedOpportunity.title}</h1>
              <p className={styles.jobDetailOrg}>
                {selectedOpportunity.organization} · {selectedOpportunity.location}
              </p>
              <div className={styles.jobTags}>
                <span>{selectedOpportunity.type}</span>
              </div>
            </div>
            <div className={styles.jobSalaryCard}>
              <span className="material-symbols-outlined" aria-hidden="true">payments</span>
              <p>Salary</p>
              <strong>{selectedOpportunity.salary}</strong>
            </div>
          </div>

          <div className={styles.jobDetailBody}>
            <div className={styles.jobDetailMain}>
              <section>
                <h2>Job description</h2>
                <p>{selectedOpportunity.description}</p>
              </section>

              <section>
                <h2>Responsibilities</h2>
                <ul className={styles.detailList}>
                  {selectedOpportunity.responsibilities.map((item) => (
                    <li key={item}>
                      <span className="material-symbols-outlined" aria-hidden="true">task_alt</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2>Perks and benefits</h2>
                <ul className={styles.perkList}>
                  {selectedOpportunity.perks.map((perk) => (
                    <li key={perk}>
                      <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2>What to bring</h2>
                <p>{selectedOpportunity.requirements}</p>
              </section>

              <section className={styles.applicationSection} ref={applyRef} aria-labelledby="job-application-title">
                <div className={styles.applicationHeader}>
                  <div>
                    <p className={styles.eyebrow}>{formCopy.apply.eyebrow}</p>
                    <h2 id="job-application-title">Apply for {selectedOpportunity.title}</h2>
                    <p>{formCopy.apply.description}</p>
                  </div>
                </div>
                <RequestForm
                  key={selectedOpportunity.id}
                  formType="apply"
                  opportunity={selectedOpportunity}
                />
              </section>
            </div>

            <aside className={styles.jobFactCard} aria-label="Job summary">
              <h2>At a glance</h2>
              <dl>
                <div><dt>Employer</dt><dd>{selectedOpportunity.organization}</dd></div>
                <div><dt>Location</dt><dd>{selectedOpportunity.location}</dd></div>
                <div><dt>Type</dt><dd>{selectedOpportunity.type}</dd></div>
                <div><dt>Salary</dt><dd>{selectedOpportunity.salary}</dd></div>
                <div><dt>Perks</dt><dd>{selectedOpportunity.perks.join(', ')}</dd></div>
              </dl>
              <button type="button" className={styles.primaryButton} onClick={scrollToApplication}>
                Apply for this job
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </button>
            </aside>
          </div>

          <p className={styles.alumniDisclaimer}>
            Job listings are provided for opportunity purposes.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.alumniPage}>
      <section className={styles.alumniHero} aria-labelledby="alumni-hero-title">
        <div className={styles.alumniHeroContent}>
          <p className={styles.eyebrow}>Graduate network</p>
          <h1 id="alumni-hero-title">Alumni</h1>
          <p className={styles.alumniHeroLead}>Connect graduates with opportunity, employers, and the community.</p>
          <div className={styles.alumniHeroCards}>
            {heroCards.map((card) => (
              <button
                type="button"
                className={styles.alumniHeroCard}
                key={card.title}
                onClick={() => {
                  if (card.id === 'join') setDialog({ type: 'join' });
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
            <h2 id="alumni-stats-title">Graduate outcomes</h2>
          </div>
        </div>

        <div className={styles.outcomesLayout}>
          <div className={styles.statsKpisVertical}>
            <div className={styles.statKpi}>
              <span className="material-symbols-outlined" aria-hidden="true">groups</span>
              <div>
                <strong>{graduateOutcomeMock.studentsTrained.toLocaleString()}</strong>
                <span>Students trained</span>
              </div>
            </div>
            <div className={styles.statKpi}>
              <span className="material-symbols-outlined" aria-hidden="true">handshake</span>
              <div>
                <strong>{graduateOutcomeMock.opportunitiesSecured.toLocaleString()}</strong>
                <span>Opportunities secured after graduation</span>
              </div>
            </div>
            <div className={styles.statKpi}>
              <span className="material-symbols-outlined" aria-hidden="true">trending_up</span>
              <div>
                <strong>{opportunityShare}%</strong>
                <span>Graduate opportunity rate</span>
              </div>
            </div>
          </div>

          <figure className={styles.chartCardLarge} aria-labelledby="outcome-pie-title">
            <div className={styles.chartHeader}>
              <div>
                <p className={styles.eyebrow}>Graduate outcomes</p>
                <h3 id="outcome-pie-title">Where graduates land</h3>
              </div>
            </div>
            <div className={styles.pieCanvasLarge}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={outcomePieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={getPieInnerRadius(110)}
                    outerRadius={110}
                    paddingAngle={1}
                    stroke="#fff"
                    strokeWidth={2}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {outcomePieData.map((entry) => (
                      <Cell key={entry.id} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<OutcomeTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className={styles.chartLegendBelow}>
              {outcomePieData.map((item) => (
                <li key={item.id}>
                  <span className={styles.legendSwatch} style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                  <strong>{item.value.toLocaleString()} · {item.share}%</strong>
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </section>

      <section className={styles.alumniExplorer} ref={resultsRef} aria-label="Explore">
        <aside className={styles.alumniFilters} aria-labelledby="alumni-filter-title">
          <p className={styles.eyebrow}>Explore</p>
          <h2 id="alumni-filter-title">Browse</h2>
          <div role="group" aria-label="Filter">
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
        </aside>

        <div className={styles.alumniResults}>
          <div className={styles.resultsHeader}>
            <div>
              <p className={styles.eyebrow}>Alumni</p>
              <h2>{sectionTitle}</h2>
            </div>
            <label className={styles.alumniSearch}>
              <span className="material-symbols-outlined" aria-hidden="true">search</span>
              <span className={styles.visuallyHidden}>Search</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search..."
              />
            </label>
          </div>

          {(activeFilter === 'leadership' || activeFilter === 'certificates') && (
            <div className={styles.profileGrid}>
              {visibleAlumni
                .filter((person) => activeFilter !== 'certificates' || person.certificate)
                .map((person) => (
                  <div className={styles.profileMotion} key={person.id}>
                    <StaffCard
                      name={person.name}
                      position={person.position}
                      qualification={person.areaOfStudy || person.course}
                      image={person.image}
                      imageAlt={person.imageAlt || `Portrait of ${person.name}`}
                      reduceMotion={reduceMotion}
                      action={(
                        <button
                          type="button"
                          className={styles.hireButton}
                          onClick={() => setDialog({ type: 'hire', person })}
                        >
                          Hire now
                        </button>
                      )}
                    />
                    {activeFilter === 'certificates' && (
                      <p className={styles.certificateLabel}>
                        <span className="material-symbols-outlined" aria-hidden="true">verified</span>
                        {person.certificate}{person.yearGraduated ? ` · ${person.yearGraduated}` : ''}
                      </p>
                    )}
                  </div>
                ))}
              {visibleAlumni.length === 0 && <p className={styles.emptyState}>No alumni match that search.</p>}
            </div>
          )}

          {activeFilter === 'opportunities' && (
            <div className={styles.opportunityList}>
              {visibleOpportunities.map((opportunity) => (
                <article
                  className={styles.jobCard}
                  key={opportunity.id}
                  onClick={() => openJob(opportunity)}
                >
                  <div className={styles.jobCardMain}>
                    <p className={styles.opportunityBadge}>Sample opportunity</p>
                    <h3>{opportunity.title}</h3>
                    <p className={styles.jobCardOrg}>{opportunity.organization} · {opportunity.location}</p>
                    <p className={styles.jobCardDescription}>{opportunity.description}</p>

                    <div className={styles.jobCardMeta}>
                      <span>
                        <span className="material-symbols-outlined" aria-hidden="true">payments</span>
                        {opportunity.salary}
                      </span>
                      <span>
                        <span className="material-symbols-outlined" aria-hidden="true">schedule</span>
                        {opportunity.type}
                      </span>
                    </div>

                    <ul className={styles.jobCardPerks} aria-label="Perks and benefits">
                      {opportunity.perks.map((perk) => (
                        <li key={perk}>
                          <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    className={styles.outlineButton}
                    onClick={(event) => {
                      event.stopPropagation();
                      openJob(opportunity);
                    }}
                  >
                    View details
                    <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                  </button>
                </article>
              ))}
              {visibleOpportunities.length === 0 && <p className={styles.emptyState}>No opportunities match that search.</p>}
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
        </div>
      </section>

      <p className={styles.alumniDisclaimer}>All alumni profiles, photographs, job listings, and outcome figures shown here are illustrative demo content, not verified people or current opportunities.</p>

      <Modal
        open={dialog?.type === 'hire'}
        onClose={() => setDialog(null)}
        labelledBy="hire-dialog-title"
        wide
      >
        {dialog?.person && (
          <>
            <div className={styles.dialogHeader}>
              <div>
                <p className={styles.eyebrow}>{formCopy.hire.eyebrow}</p>
                <h2 id="hire-dialog-title">Hire {dialog.person.name}</h2>
                <p>{formCopy.hire.description}</p>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setDialog(null)}
                aria-label="Close hire form"
              >
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>
            <PersonSummary person={dialog.person} />
            <RequestForm key={dialog.person.id} formType="hire" person={dialog.person} />
          </>
        )}
      </Modal>

      <Modal
        open={dialog?.type === 'join'}
        onClose={() => setDialog(null)}
        labelledBy="join-dialog-title"
      >
        <div className={styles.dialogHeader}>
          <div>
            <p className={styles.eyebrow}>{formCopy.join.eyebrow}</p>
            <h2 id="join-dialog-title">Join the alumni network</h2>
            <p>{formCopy.join.description}</p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setDialog(null)}
            aria-label="Close alumni network form"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>
        <RequestForm key="join" formType="join" />
      </Modal>
    </div>
  );
}

export default AlumniPage;
