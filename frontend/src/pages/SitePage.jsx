import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/common/Button';
import { FAQAccordion } from '@/components/common/FAQ';
import { FAQ_ITEMS } from '@/components/common/faqData';
import { NewsStoryCards } from '@/components/common/NewsStoryCards';
import { PageHero } from '@/components/common/PageHero';
import RegisterButton from '@/components/common/RegisterButton';
import CertificateVerificationPage from '@/pages/CertificateVerificationPage';
import { StaffCard } from '@/components/staff/StaffCard';
import { MOCK_ALUMNI_LEADERS } from '@/components/staff/staffData';
import { useCourses } from '@/hooks/useCourseCatalog';
import { useSitePage } from '@/hooks/useSitePage';
import {
  createDemoApplicant,
  getSignedInApplicant,
  signInDemoApplicant,
  signOutDemoApplicant,
  submitDemoApplication,
} from '@/services/demoApplicantService';
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
  const navigate = useNavigate();

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
      </motion.section>
      <motion.section
        className={styles.missionStatement}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={shouldReduceMotion ? { duration: 0.01 } : { ...entrySpring, delay: 0.12 }}
      >
        <p className={styles.missionLabel}>Our vision</p>
        <p className={styles.missionText}>{page.visionStatement}</p>
      </motion.section>
      <motion.section
        className={styles.missionRequest}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={shouldReduceMotion ? { duration: 0.01 } : entrySpring}
      >
        <div className={styles.reportCardCopy}>
          <span className={styles.reportIcon} aria-hidden="true">
            <span className="material-symbols-outlined">description</span>
          </span>
          <div>
            <p className={styles.reportPeriod}>Mission 2036 report</p>
            <h2>Request the latest mission report</h2>
            <p>Contact the Institute to request an approved mission report.</p>
          </div>
        </div>
        <div className={styles.reportActions}>
          <Button
            variant="primary"
            size="lg"
            leftIcon="mail"
            onClick={() => navigate('/contact?topic=Mission%202036%20report')}
          >
            Request report
          </Button>
        </div>
      </motion.section>
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
  const navigate = useNavigate();

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
      <section className={styles.alumniCta} aria-labelledby="alumni-cta-title">
        <div>
          <p className={styles.reportPeriod}>Get involved</p>
          <h2 id="alumni-cta-title">Help the alumni network grow</h2>
          <p>Join the network or share your graduate story with the Institute.</p>
        </div>
        <Button
          variant="secondary"
          size="lg"
          leftIcon="mail"
          onClick={() => navigate('/contact?topic=Alumni%20network')}
        >
          Contact the Institute
        </Button>
      </section>
    </div>
  );
}

function ApplyPage() {
  const navigate = useNavigate();
  const onlineSteps = [
    'Choose your course or program, campus, and session.',
    'Fill in your personal and contact details.',
    'Pay the fee or first installment by bank transfer or mobile money. Enter the transaction ID and upload proof of payment, a valid ID, and your highest academic certificate.',
    'Submit your application and keep the confirmation. The Finance Office verifies payment and contacts you to confirm admission.',
    'Collect your uniform items, ID card, and class schedule before classes begin.',
  ];
  const officeSteps = [
    'Visit the Admissions Office with a valid ID and your highest academic certificate.',
    'Complete the registration form with help from Institute staff.',
    'Pay by cash, bank deposit, or mobile money and collect your official receipt.',
    'Receive your admission confirmation, uniform items, ID card, and class schedule.',
  ];

  return (
    <section className={styles.applyOptions} aria-label="Application options">
      <article className={styles.applyOption}>
        <span className={styles.applyOptionBadge}>Option 1</span>
        <h2>Register online</h2>
        <ol>
          {onlineSteps.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <RegisterButton
          variant="secondary"
          size="lg"
          leftIcon="how_to_reg"
        >
          Register Now
        </RegisterButton>
      </article>
      <article className={`${styles.applyOption} ${styles.applyOfficeOption}`}>
        <span className={styles.applyOptionBadge}>Option 2</span>
        <h2>Register at the office</h2>
        <ol>
          {officeSteps.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <Button
          variant="secondary"
          size="lg"
          leftIcon="location_on"
          onClick={() => navigate('/about/campuses')}
        >
          Find a campus
        </Button>
      </article>
    </section>
  );
}

function FeesPage() {
  const [search, setSearch] = useState('');
  const { data: courses = [], isLoading, error } = useCourses();
  const query = search.trim().toLowerCase();
  const matchingCourses = courses.filter((course) => (
    !query || [course.title, course.category, course.level]
      .some((value) => value.toLowerCase().includes(query))
  ));
  const formatFee = (fee) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(fee);

  return (
    <div className={styles.feesPage}>
      <section className={styles.feesSearchPanel} aria-labelledby="course-fee-title">
        <p className={styles.reportPeriod}>Course fee finder</p>
        <h2 id="course-fee-title">Search fees by course</h2>
        <p>Search the course catalogue to view a draft fee. Confirm the current amount with Finance before paying.</p>
        <label htmlFor="course-fee-search">Course name</label>
        <div className={styles.feesSearchControl}>
          <span className="material-symbols-outlined" aria-hidden="true">search</span>
          <input
            id="course-fee-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by course name, category, or level"
          />
        </div>
        {isLoading ? (
          <p className={styles.feeSearchStatus} role="status">Loading course fees…</p>
        ) : error ? (
          <p className={styles.feeSearchError} role="alert">Course fees could not be loaded: {error.message}</p>
        ) : query ? (
          matchingCourses.length ? (
            <ul className={styles.feeResults} aria-live="polite">
              {matchingCourses.map((course) => (
                <li key={course.id}>
                  <div>
                    <h3>{course.title}</h3>
                    <p>{course.category} · {course.level} · {course.duration}</p>
                  </div>
                  <strong>{course.fee == null ? 'Confirm with Finance' : formatFee(course.fee)}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.feeSearchStatus} aria-live="polite">No courses match “{search}”. Try another course name.</p>
          )
        ) : (
          <p className={styles.feeSearchStatus}>Enter a course name to see its fee.</p>
        )}
      </section>
      <section className={styles.applyOptions} aria-label="Fee and payment instructions">
        <article className={styles.applyOption}>
          <span className={styles.applyOptionBadge}>Before you pay</span>
          <h2>Confirm your course fee</h2>
          <ol>
            <li>Search for your course above to view its draft fee.</li>
            <li>Confirm the current fee and any installment plan with the Finance Office.</li>
            <li>Ask for the approved payment instructions before sending money.</li>
            <li>Keep your payment confirmation and request an official receipt.</li>
          </ol>
        </article>
        <article className={`${styles.applyOption} ${styles.applyOfficeOption}`}>
          <span className={styles.applyOptionBadge}>Payment options</span>
          <h2>Pay through an official channel</h2>
          <ol>
            <li>Cash payment at the Finance Office.</li>
            <li>Bank deposit or transfer using details confirmed by Finance.</li>
            <li>Orange Money or MTN Mobile Money using the official payment instructions.</li>
            <li>Confirm that your payment has been recorded before your course begins.</li>
          </ol>
        </article>
      </section>
    </div>
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

function RegistrationAccessPage({ isLogin, nextPath, accountCreated }) {
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    try {
      if (isLogin) {
        await signInDemoApplicant(formData.get('email'), formData.get('password'));
        const destination = nextPath?.startsWith('/') && !nextPath.startsWith('//')
          ? nextPath
          : '/student/portal';
        navigate(destination, { replace: true });
      } else {
        await createDemoApplicant({
          fullName: formData.get('fullName'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          password: formData.get('password'),
        });
        navigate('/login?created=1', { replace: true });
      }
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.accountLayout}>
      <section className={styles.accountIntro}>
        <p className={styles.reportPeriod}>A-1 applicant portal · Demo</p>
        <h2>{isLogin ? 'Welcome back' : 'Start your A-1 application'}</h2>
        <p>
          {isLogin
            ? 'Sign in to complete an application and check its status.'
            : 'Create your account with your contact details. Sign in afterward to choose a course, submit your application, and track its progress.'}
        </p>
        <ol>
          <li>Create your applicant account</li>
          <li>Sign in and choose a course</li>
          <li>Submit and track your application</li>
        </ol>
        <p className={styles.accountDemoNote}>Demo portal — account details stay in this browser and are not sent to Institute systems.</p>
      </section>
      <section className={styles.accessCard}>
        <p className={styles.reportPeriod}>{isLogin ? 'Applicant sign-in' : 'Create an account'}</p>
        <h2>{isLogin ? 'Sign in to continue' : 'Your details'}</h2>
        {accountCreated && isLogin && (
          <p className={styles.formSuccess} role="status">Your demo account is ready. Sign in to continue.</p>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label htmlFor="applicant-name">Full name</label>
              <input id="applicant-name" name="fullName" autoComplete="name" required maxLength={100} />
              <label htmlFor="applicant-phone">Phone number</label>
              <input id="applicant-phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} />
            </>
          )}
          <label htmlFor="applicant-email">Email address</label>
          <input id="applicant-email" name="email" type="email" autoComplete="email" required maxLength={254} />
          <label htmlFor="applicant-password">Password</label>
          <input
            id="applicant-password"
            name="password"
            type="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            required
            minLength={8}
            onChange={(event) => {
              if (isLogin) return;
              const confirmation = event.currentTarget.form.elements.passwordConfirm;
              confirmation.setCustomValidity(
                confirmation.value && confirmation.value !== event.currentTarget.value
                  ? 'Passwords do not match.'
                  : '',
              );
            }}
          />
          {!isLogin && (
            <>
              <label htmlFor="applicant-password-confirm">Confirm password</label>
              <input
                id="applicant-password-confirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                onChange={(event) => {
                  const password = event.currentTarget.form.elements.password;
                  event.currentTarget.setCustomValidity(
                    event.currentTarget.value === password.value ? '' : 'Passwords do not match.',
                  );
                }}
              />
            </>
          )}
          {formError && <p className={styles.formError} role="alert">{formError}</p>}
          <Button type="submit" variant="secondary" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Please wait…' : isLogin ? 'Sign in' : 'Create applicant account'}
          </Button>
        </form>
        <p className={styles.accessHelp}>
          {isLogin ? 'New applicant?' : 'Already have an applicant account?'}
          {' '}
          <Link to={isLogin ? '/register' : '/login'}>{isLogin ? 'Create an account' : 'Sign in'}</Link>
        </p>
        <Link className={styles.accountContactLink} to="/contact">Contact Admissions</Link>
      </section>
    </div>
  );
}

function ApplicantPortalPage() {
  const navigate = useNavigate();
  const { data: courses = [], isLoading, error } = useCourses();
  const [applicant, setApplicant] = useState(() => getSignedInApplicant());
  const [selectedCourse, setSelectedCourse] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError('');
    const course = courses.find((item) => item.id === selectedCourse);
    if (!course) {
      setFormError('Choose a course before submitting your application.');
      return;
    }
    try {
      submitDemoApplication(course);
      setApplicant(getSignedInApplicant());
      setSelectedCourse('');
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleSignOut = () => {
    signOutDemoApplicant();
    navigate('/login', { replace: true });
  };

  return (
    <div className={styles.portalLayout}>
      <section className={styles.portalWelcome}>
        <div>
          <p className={styles.reportPeriod}>Applicant portal · Demo</p>
          <h2>Hello, {applicant.fullName}</h2>
          <p>Submit an application for a course and check its status here.</p>
        </div>
        <Button type="button" variant="outline" size="md" onClick={handleSignOut}>Sign out</Button>
      </section>
      <section className={styles.portalPanel}>
        <h2>Start an application</h2>
        {isLoading ? (
          <p role="status">Loading courses…</p>
        ) : error ? (
          <p className={styles.formError} role="alert">Courses could not be loaded: {error.message}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="application-course">Choose a course</label>
            <select
              id="application-course"
              value={selectedCourse}
              onChange={(event) => setSelectedCourse(event.target.value)}
              required
            >
              <option value="">Select a course</option>
              {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
            </select>
            {formError && <p className={styles.formError} role="alert">{formError}</p>}
            <Button type="submit" variant="secondary" size="lg" leftIcon="send">Submit demo application</Button>
          </form>
        )}
      </section>
      <section className={styles.portalPanel} aria-labelledby="application-list-title">
        <h2 id="application-list-title">Your applications</h2>
        {applicant.applications.length ? (
          <ul className={styles.applicationList}>
            {applicant.applications.map((application) => (
              <li key={application.reference}>
                <div>
                  <h3>{application.courseTitle}</h3>
                  <p>Reference: {application.reference}</p>
                  <p>Submitted {new Date(application.submittedAt).toLocaleDateString()}</p>
                </div>
                <span>{application.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.accessHelp}>No applications yet. Choose a course above to get started.</p>
        )}
      </section>
    </div>
  );
}
function ReportsPage({ reports }) {
  const shouldReduceMotion = useReducedMotion();
  const { data: courses = [], isLoading, error } = useCourses();

  return (
    <div className={styles.content}>
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
            <div className={styles.reportCardCopy}>
              <span className={styles.reportIcon} aria-hidden="true">
                <span className="material-symbols-outlined">description</span>
              </span>
              <div>
                <p className={styles.reportPeriod}>{report.period}</p>
                <h2>{report.title}</h2>
                <p className={styles.reportDescription}>{report.description}</p>
              </div>
            </div>
            <div className={styles.reportActions}>
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
            </div>
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
  if (page.loginRequired && !getSignedInApplicant()) {
    return <Navigate to={`/login?next=${encodeURIComponent(pathname)}`} replace />;
  }

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
      {page.applyPage && <ApplyPage />}
      {page.feesPage && <FeesPage />}
      {page.faqPage && <FAQPage />}
      {page.intakeCalendar && <IntakeCalendar />}
      {page.newsPage && <NewsPage stories={page.newsStories} />}
      {page.newsArticle && <NewsArticle story={page.newsArticle} stories={page.newsStories} />}
      {page.videoPage && <VideosPage />}
      {page.contactPage && <ContactPage search={search} />}
      {page.certificateVerificationPage && <CertificateVerificationPage />}
      {page.registrationPage && <RegistrationAccessPage isLogin={false} />}
      {page.loginPage && (
        <RegistrationAccessPage
          isLogin
          nextPath={searchParams.get('next')}
          accountCreated={searchParams.get('created') === '1'}
        />
      )}
      {(page.studentPortalPage || page.trackingPage) && <ApplicantPortalPage />}
      {!page.missionStatement && !page.reports && !page.galleryItems &&
       !page.historyProfile && !page.campuses && !page.alumniPage && !page.applyPage &&
       !page.feesPage && !page.faqPage && !page.intakeCalendar && !page.newsPage && !page.newsArticle &&
       !page.videoPage && !page.contactPage && !page.certificateVerificationPage &&
       !page.registrationPage && !page.loginPage &&
       !page.studentPortalPage && !page.trackingPage && (
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
