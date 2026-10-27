import { Link, Navigate, useLocation, useSearchParams } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FAQAccordion } from '@/components/common/FAQ';
import { FAQ_ITEMS } from '@/components/common/faqData';
import { NewsStoryCards } from '@/components/common/NewsStoryCards';
import { PageHero } from '@/components/common/PageHero';
import { StaffCard } from '@/components/staff/StaffCard';
import { MOCK_ALUMNI_LEADERS } from '@/components/staff/staffData';
import { useCourses } from '@/hooks/useCourseCatalog';
import { useSitePage } from '@/hooks/useSitePage';
import { VideoExplorer } from '@/pages/home/Videos';
import styles from './SitePage.module.css';

const entrySpring = { type: 'spring', stiffness: 75, damping: 15, mass: 0.8 };

function PageLoading() {
  return <p className={styles.status} role="status">Loading page…</p>;
}

function PageError({ message }) {
  return (
    <section className={styles.status} role="alert">
      <h1>We couldn’t load this page</h1>
      <p>{message}</p>
      <Link to="/">Return to the homepage</Link>
    </section>
  );
}

function MissionPage({ page }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={styles.content}>
      <motion.section
        className={styles.missionStatement}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={shouldReduceMotion ? { duration: 0.01 } : entrySpring}
      >
        <p className={styles.missionLabel}>Our mission</p>
        <p className={styles.missionText}>{page.missionStatement}</p>
        <p className={styles.missionTarget}>A long-term ambition: reach one million young people by 2036.</p>
      </motion.section>
      {page.sections.map((section, index) => (
        <motion.section
          className={styles.section}
          key={section.title}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={shouldReduceMotion ? { duration: 0.01 } : { ...entrySpring, delay: index * 0.08 }}
        >
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </motion.section>
      ))}
      <section className={styles.missionRequest}>
        <p className={styles.reportPeriod}>Mission 2036 report</p>
        <h2>Request the latest mission report</h2>
        <p>Contact A-1 to request an approved progress report and its reporting period.</p>
        <Link to="/contact?topic=Mission%202036%20report">Request the report</Link>
      </section>
      <nav className={styles.actions} aria-label="Related pages">
        {page.links?.filter((link) => link.to !== '/media/reports')
          .map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
      </nav>
    </div>
  );
}

function HistoryPage({ page }) {
  return (
    <div className={styles.wikiLayout}>
      <nav className={styles.wikiContents} aria-label="History page contents">
        <h2>Contents</h2>
        {page.sections.map((section, index) => (
          <a key={section.id} href={`#${section.id}`}>{index + 1}. {section.title}</a>
        ))}
      </nav>
      <article className={styles.wikiArticle}>
        <p className={styles.wikiNotice}>This overview reflects currently confirmed institutional information. Personal names and dates are omitted where they have not been verified.</p>
        {page.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </article>
      <aside className={styles.historyFacts} aria-labelledby="history-facts-title">
        <h2 id="history-facts-title">Institute profile</h2>
        <div className={styles.factsPhoto}>
          <span className="material-symbols-outlined" aria-hidden="true">school</span>
          <span>A-1 Technical Institute</span>
        </div>
        <dl>
          {page.historyFacts.map(({ label, value }) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
        <Link to="/contact">Contact the Institute</Link>
      </aside>
    </div>
  );
}

function CampusPage({ campuses }) {
  return (
    <div className={styles.campusList}>
      {campuses.map((campus, index) => {
        const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(campus.address)}&output=embed`;
        return (
          <section className={styles.campusRow} key={campus.name}>
            <div className={styles.campusDetails}>
              <p className={styles.reportPeriod}>Campus {index + 1}</p>
              <h2>{campus.name}</h2>
              <dl>
                <div><dt>Location</dt><dd>{campus.address}</dd></div>
                <div><dt>Contact</dt><dd>{campus.phone}</dd></div>
                <div><dt>Office hours</dt><dd>{campus.hours}</dd></div>
              </dl>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campus.address)}`} target="_blank" rel="noreferrer">
                Get directions
              </a>
            </div>
            <iframe
              className={styles.campusMap}
              src={mapUrl}
              title={`Map directions to ${campus.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>
        );
      })}
      <p className={styles.wikiNotice}>Additional campus details will be added when their names, locations, and contact information are confirmed.</p>
    </div>
  );
}

function AlumniPage() {
  return (
    <div className={styles.alumniContent}>
      <section className={styles.alumniIntro}>
        <p className={styles.reportPeriod}>A-1 graduate network</p>
        <h2>Stay connected beyond the classroom</h2>
        <p>The alumni network can help graduates keep in touch with classmates, share career progress, and stay informed about Institute activities.</p>
      </section>
      <div className={styles.alumniGrid}>
        <article><span className="material-symbols-outlined" aria-hidden="true">diversity_3</span><h2>Connect</h2><p>Reconnect with classmates and take part in future graduate meet-ups.</p></article>
        <article><span className="material-symbols-outlined" aria-hidden="true">work</span><h2>Share your progress</h2><p>Share career and training updates to help prospective students understand graduate pathways.</p></article>
        <article><span className="material-symbols-outlined" aria-hidden="true">volunteer_activism</span><h2>Support learners</h2><p>Alumni may be able to contribute through mentoring, practical demonstrations, or career guidance.</p></article>
      </div>
      <section className={styles.alumniLeaders}>
        <h2>Alumni leadership</h2>
        <p>Illustrative mock profiles only. Replace with the elected alumni president and committee after their details are confirmed.</p>
        <div className={styles.pendingPeople}>
          {MOCK_ALUMNI_LEADERS.map((person) => (
            <StaffCard key={person.id} {...person} imageAlt="Illustrative mock alumni portrait, not a verified profile" />
          ))}
        </div>
      </section>
      <p className={styles.wikiNotice}>To join the alumni network or share a graduate story, contact the Institute.</p>
      <Link className={styles.primaryLink} to="/contact?topic=Alumni%20network">Contact the Institute</Link>
    </div>
  );
}

function ApplyPage({ page }) {
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const steps = [
    { id: 'choose-course', title: '1. Choose your course', text: 'Compare course levels, prerequisites, duration, and learning outcomes in the course catalogue. Contact Admissions to confirm that the course is open for your preferred intake.' },
    { id: 'prepare-documents', title: '2. Prepare your documents', text: 'Prepare valid identification and any academic certificates or previous course records relevant to your chosen course. Admissions can confirm the exact documents required.' },
    { id: 'submit-application', title: '3. Submit your application', text: 'Complete the registration form with your contact and course details. The online account service is not yet connected, so contact Admissions to submit an application.' },
    { id: 'confirm-payment', title: '4. Confirm fees and payment', text: 'Confirm current fees, accepted payment channels, and installment terms directly with Finance. Request an official receipt for any payment.' },
    { id: 'confirm-start', title: '5. Confirm your first class', text: 'Ask Admissions to confirm your intake start date, class session, campus, and any course-specific materials before travelling.' },
  ];

  useEffect(() => {
    if (!isChoiceOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const returnFocusTo = triggerRef.current;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsChoiceOpen(false);
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), a[href]');
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
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
      returnFocusTo?.focus();
    };
  }, [isChoiceOpen]);

  return (
    <>
      <div className={styles.wikiLayout}>
        <nav className={styles.wikiContents} aria-label="Application guide contents">
          <h2>On this page</h2>
          {steps.map((step) => <a key={step.id} href={`#${step.id}`}>{step.title}</a>)}
          <a href="#application-help">Get help</a>
        </nav>
        <article className={styles.applicationGuide}>
          <div className={styles.applyStart}>
            <div>
              <h2>Ready to apply?</h2>
              <p>Choose the application option that works best for you.</p>
            </div>
            <button type="button" ref={triggerRef} onClick={() => setIsChoiceOpen(true)}>
              Apply to A-1
            </button>
          </div>
          {steps.map((step) => (
            <section className={styles.guideStep} key={step.id} id={step.id}>
              <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
              <div><h2>{step.title}</h2><p>{step.text}</p></div>
            </section>
          ))}
          <section className={styles.guideHelp} id="application-help">
            <h2>Need application help?</h2>
            <p>{page.sections[0]?.body}</p>
            <Link to="/contact">Ask Admissions</Link>
          </section>
          <section className={styles.guideDirections} id="campus-directions">
            <h2>Visiting the Admissions Office</h2>
            <p>Nagbe’s Town Junction, ELWA Road, Paynesville, Liberia. Confirm current office hours before travelling.</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Nagbe%27s+Town+Junction%2C+ELWA+Road%2C+Paynesville%2C+Liberia" target="_blank" rel="noreferrer">
              Get directions in Google Maps
            </a>
          </section>
        </article>
      </div>
      <AnimatePresence>
        {isChoiceOpen && (
          <motion.div
            className={styles.applyBackdrop}
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsChoiceOpen(false);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              className={styles.applyDialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="apply-choice-title"
              tabIndex="-1"
              ref={dialogRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <button className={styles.applyDialogClose} type="button" aria-label="Close application options" onClick={() => setIsChoiceOpen(false)}>
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
              <p className={styles.reportPeriod}>Choose how to apply</p>
              <h2 id="apply-choice-title">Apply online or in person</h2>
              <p>Select the option that works best for you. You can review your course details before continuing.</p>
              <div className={styles.applyChoiceLinks}>
                <Link to="/admission/register" onClick={() => setIsChoiceOpen(false)}>
                  <span className="material-symbols-outlined" aria-hidden="true">computer</span>
                  <span><strong>Apply online</strong><small>Continue to online registration</small></span>
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </Link>
                <Link to="/contact" onClick={() => setIsChoiceOpen(false)}>
                  <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
                  <span><strong>Apply in person</strong><small>View campus contact and directions</small></span>
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </Link>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FAQPage() {
  const [search, setSearch] = useState('');
  const filteredQuestions = FAQ_ITEMS.filter(({ question, answer }) =>
    `${question} ${answer}`.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className={styles.faqPage}>
      <label htmlFor="faq-search">Search answers</label>
      <input
        id="faq-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search courses, fees, registration..."
      />
      <p className={styles.faqCount} aria-live="polite">
        {filteredQuestions.length} {filteredQuestions.length === 1 ? 'answer' : 'answers'}
      </p>
      {filteredQuestions.length
        ? <FAQAccordion questions={filteredQuestions} />
        : <p className={styles.emptyFaq}>No answers match that search. Try another phrase or contact Admissions.</p>}
      <Link className={styles.primaryLink} to="/contact">Ask Admissions</Link>
    </div>
  );
}

const INTAKE_EVENTS = [
  { date: '2026-11-06', course: 'Basic Solar System Installation', session: 'Sample morning intake', location: 'Main Campus' },
  { date: '2026-11-14', course: 'Introduction to Computer', session: 'Sample afternoon intake', location: 'Main Campus' },
  { date: '2026-12-01', course: 'Electricity', session: 'Sample morning intake', location: 'Main Campus' },
  { date: '2026-12-12', course: 'Website Development', session: 'Sample afternoon intake', location: 'Main Campus' },
  { date: '2027-01-11', course: 'Biometric & CCTV Installation', session: 'Sample morning intake', location: 'Main Campus' },
];

function IntakeCalendar() {
  const [month, setMonth] = useState(new Date(2026, 10, 1));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const firstWeekday = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const monthEvents = INTAKE_EVENTS.filter((event) => {
    const date = new Date(`${event.date}T00:00:00`);
    return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth();
  });
  const calendarCells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
  const eventAtDay = (day) => monthEvents.find((event) => Number(event.date.slice(-2)) === day);
  const formatDate = (isoDate) => new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  useEffect(() => {
    if (!selectedEvent) return undefined;
    const handleEscape = (event) => {
      if (event.key === 'Escape') setSelectedEvent(null);
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const index = INTAKE_EVENTS.findIndex((item) => item.date === selectedEvent.date);
        const offset = event.key === 'ArrowRight' ? 1 : -1;
        setSelectedEvent(INTAKE_EVENTS[(index + offset + INTAKE_EVENTS.length) % INTAKE_EVENTS.length]);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedEvent]);

  const shiftMonth = (offset) => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));

  return (
    <div className={styles.calendarPage}>
      <p className={styles.calendarDisclaimer}>Sample dates for layout and interaction only — confirm course starts with Admissions.</p>
      <div className={styles.calendarToolbar}>
        <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month">
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
        </button>
        <h2>{month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
        <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month">
          <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
        </button>
      </div>
      <div className={styles.calendarGrid} role="grid" aria-label={`Intake calendar for ${month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}>
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
          <div className={styles.calendarDayName} role="columnheader" key={day}>{day}</div>
        ))}
        {calendarCells.map((day, index) => {
          const intake = day ? eventAtDay(day) : null;
          return day ? (
            <button
              className={`${styles.calendarDay} ${intake ? styles.calendarIntakeDay : ''}`}
              type="button"
              role="gridcell"
              key={`${month.getFullYear()}-${month.getMonth()}-${day}`}
              aria-label={intake ? `${formatDate(intake.date)}: ${intake.course} intake` : `${month.toLocaleDateString('en-US', { month: 'long' })} ${day}`}
              onClick={() => intake && setSelectedEvent(intake)}
              disabled={!intake}
            >
              <span>{day}</span>
              {intake && <span className={styles.calendarEventLabel}>Course intake</span>}
            </button>
          ) : <div className={styles.calendarBlank} role="gridcell" key={`blank-${index}`} />;
        })}
      </div>
      <AnimatePresence>
        {selectedEvent && (
          <motion.div className={styles.lightboxBackdrop} role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEvent(null)}>
            <motion.section
              className={styles.intakeDialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="intake-dialog-title"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className={styles.dialogClose} aria-label="Close intake details" onClick={() => setSelectedEvent(null)}>
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
              <p className={styles.reportPeriod}>Sample intake date</p>
              <h2 id="intake-dialog-title">{formatDate(selectedEvent.date)}</h2>
              <dl>
                <div><dt>Course</dt><dd>{selectedEvent.course}</dd></div>
                <div><dt>Session</dt><dd>{selectedEvent.session}</dd></div>
                <div><dt>Location</dt><dd>{selectedEvent.location}</dd></div>
              </dl>
              <p className={styles.calendarDisclaimer}>Sample information only. Confirm the actual start date and schedule with Admissions.</p>
              <div className={styles.calendarDialogActions}>
                <button type="button" onClick={() => setSelectedEvent(INTAKE_EVENTS[(INTAKE_EVENTS.findIndex((item) => item.date === selectedEvent.date) - 1 + INTAKE_EVENTS.length) % INTAKE_EVENTS.length])}>Previous intake</button>
                <button type="button" onClick={() => setSelectedEvent(INTAKE_EVENTS[(INTAKE_EVENTS.findIndex((item) => item.date === selectedEvent.date) + 1) % INTAKE_EVENTS.length])}>Next intake</button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
      <p className={styles.calendarHelp}>Select a highlighted day to view the sample course and session information.</p>
    </div>
  );
}

function NewsPage({ stories }) {
  const featured = stories[0];

  return (
    <div className={styles.newsLayout}>
      <div className={styles.newsHeading}>
        <p className={styles.reportPeriod}>A-1 newsroom</p>
        <h2>Latest news</h2>
        <p>News and updates from A-1 Technical Institute.</p>
      </div>
      <NewsStoryCards stories={[featured, ...stories.slice(1)]} />
    </div>
  );
}

function NewsArticle({ story, stories }) {
  const nextStory = stories[(stories.findIndex((item) => item.slug === story.slug) + 1) % stories.length];
  const currentUrl = typeof window === 'undefined' ? '' : window.location.href;
  const shareUrl = encodeURIComponent(currentUrl);
  const shareTitle = encodeURIComponent(story.title);

  return (
    <article className={styles.articlePage}>
      <nav className={styles.articleBreadcrumb} aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
        <Link to="/media/news">News</Link>
        <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
        <span aria-current="page">{story.title}</span>
      </nav>
      <p className={styles.articleCategory}>{story.category}</p>
      <h1>{story.title}</h1>
      {(story.author || story.date) && (
        <div className={styles.articleByline}>
          {story.author && <span>{story.author}</span>}
          {story.date && <time>{story.date}</time>}
        </div>
      )}
      <img className={styles.articleImage} src={story.image} alt="" />
      <p className={styles.articleStandfirst}>{story.summary}</p>
      {story.paragraphs.map((paragraph) => <p className={styles.articleParagraph} key={paragraph}>{paragraph}</p>)}
      <nav className={styles.shareLinks} aria-label="Share this story">
        <span>Share</span>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer">Facebook</a>
        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noreferrer">X</a>
        <a href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`} target="_blank" rel="noreferrer">WhatsApp</a>
      </nav>
      <Link className={styles.nextStory} to={`/media/news/${nextStory.slug}`}>
        <span>Next story</span><strong>{nextStory.title}</strong>
      </Link>
    </article>
  );
}

function ContactPage({ search }) {
  const topic = new URLSearchParams(search).get('topic') || '';
  const address = 'Nagbe’s Town Junction, ELWA Road, Paynesville, Liberia';
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className={styles.contactLayout}>
      <aside className={styles.contactSidebar}>
        <h2>Contact A-1</h2>
        <dl>
          <div><dt>Address</dt><dd>{address}</dd></div>
          <div><dt>Phone</dt><dd>Contact number awaiting confirmation</dd></div>
          <div><dt>Email</dt><dd>Email address awaiting confirmation</dd></div>
          <div><dt>Office hours</dt><dd>Confirm current office hours before visiting.</dd></div>
        </dl>
        <Link to="/academic/courses">Course questions</Link>
        <Link to="/admission/fees">Fees and payments</Link>
        <Link to="/admission/apply">Application help</Link>
      </aside>
      <section className={styles.contactMain}>
        <h2>How can we help?</h2>
        <p>Admissions can confirm course availability, requirements, intakes, and registration steps. Finance can confirm fees, payment channels, and receipts.</p>
        <p className={styles.wikiNotice}>Phone and email details are not yet confirmed. No contact form is shown until a message delivery service is connected.</p>
        {topic && <p className={styles.contactTopic}>Your enquiry topic: <strong>{topic}</strong></p>}
        <h3>Find the Main Campus</h3>
        <iframe
          className={styles.contactMap}
          src={mapUrl}
          title="Google Map to A-1 Main Campus"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer">Open directions in Google Maps</a>
      </section>
    </div>
  );
}

function VideosPage() {
  return <VideoExplorer fullPage />;
}

function RegistrationAccessPage({ isLogin, nextPath }) {
  return (
    <div className={styles.accessLayout}>
      <section className={styles.accessCard}>
        <p className={styles.reportPeriod}>{isLogin ? 'Applicant services' : 'Start your application'}</p>
        <h2>{isLogin ? 'Sign in' : 'Create your applicant account'}</h2>
        <p className={styles.accessWarning}>
          Online account creation and sign-in are not connected to an authentication service yet. No account or application will be created until A-1 connects its approved service.
        </p>
        <form onSubmit={(event) => event.preventDefault()}>
          {!isLogin && (
            <>
              <label htmlFor="applicant-name">Full name</label>
              <input id="applicant-name" autoComplete="name" disabled />
              <label htmlFor="applicant-phone">Phone number</label>
              <input id="applicant-phone" type="tel" autoComplete="tel" disabled />
            </>
          )}
          <label htmlFor="applicant-email">Email address</label>
          <input id="applicant-email" type="email" autoComplete="email" disabled />
          <label htmlFor="applicant-password">Password</label>
          <input id="applicant-password" type="password" autoComplete={isLogin ? 'current-password' : 'new-password'} disabled />
          <button type="submit" disabled>
            {isLogin ? 'Sign-in service unavailable' : 'Registration service unavailable'}
          </button>
        </form>
        <p className={styles.accessHelp}>Please contact Admissions to register or request help with an existing application.</p>
        <Link to="/contact">Contact Admissions</Link>
        {isLogin && nextPath === '/track' && <p className={styles.accessHelp}>After sign-in is connected, you can return to track your registration.</p>}
      </section>
    </div>
  );
}
function ReportsPage({ reports }) {
  const shouldReduceMotion = useReducedMotion();
  const { data: courses = [], isLoading, error } = useCourses();

  return (
    <div className={styles.content}>
      <p className={styles.disclaimer}>
        These downloads summarize information currently published by A-1; they are not annual performance reports.
      </p>
      <div className={styles.reportGrid}>
        {reports.map((report, index) => (
          <motion.article
            className={styles.reportCard}
            key={report.downloadName}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { ...entrySpring, delay: index * 0.08 }}
          >
            <span className={styles.reportIcon} aria-hidden="true">
              <span className="material-symbols-outlined">description</span>
            </span>
            <p className={styles.reportPeriod}>{report.period}</p>
            <h2>{report.title}</h2>
            <p className={styles.reportDescription}>{report.description}</p>
            {report.includeCourseList && isLoading ? (
              <p className={styles.downloadStatus} role="status">Preparing the current course list…</p>
            ) : report.includeCourseList && error ? (
              <p className={styles.downloadError} role="alert">Course details could not be loaded: {error.message}</p>
            ) : (
              <a
                className={styles.downloadLink}
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  report.includeCourseList
                    ? `${report.downloadContent}\n${courses.map((course) => (
                      `${course.title} | ${course.category} | ${course.level} | ${course.duration} | Prerequisites: ${course.prerequisites}`
                    )).join('\n')}\n`
                    : report.downloadContent
                )}`}
                download={report.downloadName}
              >
                <span className="material-symbols-outlined" aria-hidden="true">download</span>
                Download report
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function GalleryPage({ photos }) {
  const [selectedCohort, setSelectedCohort] = useState('all');
  const [activeIndex, setActiveIndex] = useState(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const cohorts = [...new Set(photos.map((photo) => photo.cohort).filter(Boolean))];
  const isLightboxOpen = activeIndex !== null;
  const filteredPhotos = selectedCohort === 'all'
    ? photos
    : photos.filter((photo) => (photo.cohort || 'unassigned') === selectedCohort);
  const activePhoto = activeIndex === null ? null : filteredPhotos[activeIndex];

  useEffect(() => {
    if (!isLightboxOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActiveIndex(null);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % filteredPhotos.length);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + filteredPhotos.length) % filteredPhotos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isLightboxOpen, filteredPhotos.length]);

  const closeLightbox = () => setActiveIndex(null);
  const moveLightbox = (direction) => {
    setActiveIndex((index) => (index + direction + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <>
      <div className={styles.galleryLayout}>
        <aside className={styles.galleryFilters} aria-labelledby="gallery-filter-heading">
          <h2 id="gallery-filter-heading">Filter photos</h2>
          <p>Choose a cohort</p>
          <div className={styles.cohortOptions} role="group" aria-label="Filter gallery by cohort">
            <button
              type="button"
              className={styles.cohortButton}
              aria-pressed={selectedCohort === 'all'}
              onClick={() => setSelectedCohort('all')}
            >
              All photos
            </button>
            {cohorts.map((cohort) => (
              <button
                type="button"
                className={styles.cohortButton}
                key={cohort}
                aria-pressed={selectedCohort === cohort}
                onClick={() => setSelectedCohort(cohort)}
              >
                {cohort}
              </button>
            ))}
            {photos.some((photo) => !photo.cohort) && (
              <button
                type="button"
                className={styles.cohortButton}
                aria-pressed={selectedCohort === 'unassigned'}
                onClick={() => setSelectedCohort('unassigned')}
              >
                Cohort not recorded
              </button>
            )}
          </div>
          <p className={styles.cohortNote}>
            Cohort labels will appear when confirmed photo details are available.
          </p>
        </aside>

        <section className={styles.gallery} aria-label="Training photo gallery">
          <div className={styles.galleryHeading}>
            <h2>Training in action</h2>
            <p aria-live="polite">{filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}</p>
          </div>
          {filteredPhotos.length ? (
            <div className={styles.photoGrid}>
              {filteredPhotos.map((photo, index) => (
                <motion.button
                  type="button"
                  className={styles.photoCard}
                  key={photo.id}
                  aria-label={`Open photo ${index + 1} of ${filteredPhotos.length}: ${photo.title}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={shouldReduceMotion ? { duration: 0.01 } : { ...entrySpring, delay: (index % 4) * 0.06 }}
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setActiveIndex(index);
                  }}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <span>{photo.title}</span>
                </motion.button>
              ))}
            </div>
          ) : (
            <p className={styles.emptyGallery}>No photos are available for this cohort yet.</p>
          )}
        </section>
      </div>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className={styles.lightboxBackdrop}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.2 }}
            onClick={closeLightbox}
          >
            <motion.div
              className={styles.lightbox}
              role="dialog"
              aria-modal="true"
              aria-label={`Photo: ${activePhoto.title}`}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={shouldReduceMotion ? { duration: 0.01 } : entrySpring}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles.lightboxClose}
                aria-label="Close photo viewer"
                ref={closeButtonRef}
                onClick={closeLightbox}
              >
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
              <button
                type="button"
                className={`${styles.lightboxArrow} ${styles.lightboxPrevious}`}
                aria-label="Previous photo"
                onClick={() => moveLightbox(-1)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
              </button>
              <figure>
                <img src={activePhoto.src} alt={activePhoto.alt} />
                <figcaption>{activePhoto.title} <span>{activeIndex + 1} / {filteredPhotos.length}</span></figcaption>
              </figure>
              <button
                type="button"
                className={`${styles.lightboxArrow} ${styles.lightboxNext}`}
                aria-label="Next photo"
                onClick={() => moveLightbox(1)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function SitePage() {
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();
  const { data: page, isLoading, error } = useSitePage(pathname);

  if (isLoading) return <PageLoading />;
  if (error) return <PageError message={error.message} />;
  if (page.loginRequired) return <Navigate to={`/login?next=${encodeURIComponent(pathname)}`} replace />;

  return (
    <div>
      {!page.newsArticle && (
        <PageHero
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: page.title },
          ]}
          eyebrow={page.eyebrow}
          title={page.title}
          description={page.description}
        />
      )}
      {page.missionStatement && <MissionPage page={page} />}
      {page.reports && <ReportsPage reports={page.reports} />}
      {page.galleryItems && <GalleryPage photos={page.galleryItems} />}
      {page.historyProfile && <HistoryPage page={page} />}
      {page.campuses && <CampusPage campuses={page.campuses} />}
      {page.alumniPage && <AlumniPage />}
      {page.applyPage && <ApplyPage page={page} />}
      {page.faqPage && <FAQPage />}
      {page.intakeCalendar && <IntakeCalendar />}
      {page.newsPage && <NewsPage stories={page.newsStories} />}
      {page.newsArticle && <NewsArticle story={page.newsArticle} stories={page.newsStories} />}
      {page.videoPage && <VideosPage />}
      {page.contactPage && <ContactPage search={search} />}
      {page.registrationPage && <RegistrationAccessPage isLogin={false} />}
      {page.loginPage && <RegistrationAccessPage isLogin nextPath={searchParams.get('next')} />}
      {!page.missionStatement && !page.reports && !page.galleryItems &&
       !page.historyProfile && !page.campuses && !page.alumniPage && !page.applyPage &&
       !page.faqPage && !page.intakeCalendar && !page.newsPage && !page.newsArticle &&
       !page.videoPage && !page.contactPage && !page.registrationPage && !page.loginPage && (
      <div className={styles.content}>
        {page.sections.map((section) => (
          <section className={styles.section} key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.items && (
              <ul>
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
        {page.links?.length > 0 && (
          <nav className={styles.actions} aria-label="Related pages">
            {page.links.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </nav>
        )}
      </div>
      )}
    </div>
  );
}
