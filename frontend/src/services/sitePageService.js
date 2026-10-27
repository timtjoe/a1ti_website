import galleryPhoto01 from '@/assets/img_006.jpeg';
import galleryPhoto02 from '@/assets/img_007.jpeg';
import galleryPhoto03 from '@/assets/img_008.jpeg';
import galleryPhoto04 from '@/assets/img_010.jpeg';
import galleryPhoto05 from '@/assets/img_011.jpeg';
import galleryPhoto06 from '@/assets/img_012.jpeg';

export const newsStories = [
  {
    slug: 'january-2027-intake',
    category: 'Admissions',
    title: 'Registration opens for the January 2027 intake',
    date: '',
    author: '',
    image: galleryPhoto02,
    summary: 'Learn how to explore current course openings, requirements, and registration steps.',
    paragraphs: [
      'Course availability and schedules vary by intake. Contact Admissions to confirm the latest registration dates and available courses.',
      'Applicants should review the course prerequisites and confirm current fees and payment instructions before registering.',
    ],
  },
  {
    slug: 'class-meet-and-greet',
    category: 'Events',
    title: 'Class meet & greet at the Main Campus',
    date: '',
    author: '',
    image: galleryPhoto06,
    summary: 'Information for learners and families attending the A-1 community event.',
    paragraphs: [
      'Meet fellow learners, instructors, and members of the A-1 community.',
      'Contact the Institute for current event details and attendance information.',
    ],
  },
  {
    slug: 'graduation-and-class-night',
    category: 'Events',
    title: 'Graduation ceremony and class night',
    date: '',
    author: '',
    image: galleryPhoto03,
    summary: 'Celebrate the achievements of A-1 learners and graduates.',
    paragraphs: [
      'A graduation ceremony recognizes learners who have completed their course of study.',
      'Contact the Institute for details about the next ceremony and participation.',
    ],
  },
  {
    slug: 'planned-campus-expansion',
    category: 'Campus',
    title: 'Planned campus expansion',
    date: '',
    author: '',
    image: galleryPhoto04,
    summary: 'Learn about A-1 campus locations and how to get directions.',
    paragraphs: [
      'Find campus address information and map directions on the campuses page.',
      'Contact A-1 to ask about current campus services and visiting hours.',
    ],
  },
  {
    slug: 'integrated-programs',
    category: 'Academics',
    title: 'Integrated programs',
    date: '',
    author: '',
    image: galleryPhoto01,
    summary: 'Explore how related courses can build a connected career pathway.',
    paragraphs: [
      'Integrated programs combine related courses into a career pathway.',
      'Browse the current course catalogue or contact Admissions for course availability and details.',
    ],
  },
  {
    slug: 'certificate-verification',
    category: 'Certificates',
    title: 'Certificate verification',
    date: '',
    author: '',
    image: galleryPhoto05,
    summary: 'Learn how employers can request information about certificate verification.',
    paragraphs: [
      'Employers seeking to verify a certificate can contact A-1 for assistance.',
      'Share the certificate details with the Institute to ask about verification.',
    ],
  },
];

const sitePages = {
  '/about': {
    title: 'About A-1',
    eyebrow: 'About us',
    description: 'Learn about A-1 Technical Institute and its hands-on technical and professional training.',
    sections: [
      { title: 'Practical learning for work', body: 'A-1 Technical Institute provides practical learning in technical and professional fields, supported by workshops and guided instruction.' },
      { title: 'Accreditation', body: 'The Institute is accredited by the Ministry of Education (MOE) and the Agricultural and Industrial Training Bureau (AITB).' },
    ],
    links: [{ label: 'Leadership & staff', to: '/about/leadership' }, { label: 'Explore courses', to: '/academic/courses' }],
  },
  '/about/us': {
    title: 'About A-1 Technical Institute',
    eyebrow: 'Who we are',
    description: 'A Liberian institute focused on practical technical and professional education.',
    sections: [
      { title: 'Learn by doing', body: 'Students build skills through practical exercises, guided by instructors and supported by training equipment.' },
      { title: 'Our focus', body: 'Our aim is to connect learning with useful skills, recognised certificates, and pathways into work.' },
    ],
    links: [{ label: 'Our mission', to: '/about/mission' }, { label: 'Browse courses', to: '/academic/courses' }],
  },
  '/about/overview': {
    title: 'About A-1 Technical Institute',
    eyebrow: 'Who we are',
    description: 'A Liberian institute focused on practical technical and professional education.',
    sections: [
      { title: 'Learn by doing', body: 'Students build skills through practical exercises, guided by instructors and supported by training equipment.' },
      { title: 'Our focus', body: 'Our aim is to connect learning with useful skills, recognised certificates, and pathways into work.' },
    ],
    links: [{ label: 'Our mission', to: '/about/mission' }, { label: 'Browse courses', to: '/academic/courses' }],
  },
  '/about/mission': {
    title: 'Our mission',
    eyebrow: 'Mission 2036',
    description: 'A-1’s mission is to equip young people with practical skills that can support a livelihood.',
    missionStatement: 'Equip young people with practical skills that can support a livelihood.',
    missionRequest: true,
    sections: [
      { title: 'Mission 2036', body: 'The Institute’s long-term ambition is to expand access to skills training and reach one million young people by 2036.' },
      { title: 'Progress and reporting', body: 'Impact figures and projections should be read alongside the Institute’s published reports and their reporting dates.' },
    ],
    links: [{ label: 'Read impact reports', to: '/media/reports' }, { label: 'Explore training', to: '/academic/courses' }],
  },
  '/about/history': {
    title: 'History of A-1 Technical Institute',
    eyebrow: 'History',
    description: 'The Institute’s background, development, and current profile.',
    historyProfile: true,
    sections: [
      { id: 'origins', title: 'Origins', body: 'A-1 Technical Institute grew from A-1 Technical Engineering Solutions, a Liberian engineering company working in solar systems, electrical installation, CCTV, and biodigester septic tanks. Practical experience in these fields informed the Institute’s hands-on approach to learning.' },
      { id: 'training', title: 'Technical and professional training', body: 'The Institute offers technical and professional courses with guided practical work. Students can explore course levels, learning outcomes, duration, and prerequisites in the current course catalogue.' },
      { id: 'recognition', title: 'Recognition', body: 'A-1 Technical Institute is accredited by Liberia’s Ministry of Education (MOE) and Agricultural and Industrial Training Bureau (AITB).' },
      { id: 'mission', title: 'Mission and future', body: 'The Institute’s stated long-term ambition is to expand access to practical skills training and reach one million young people by 2036. Progress figures should be interpreted alongside confirmed reporting and dates.' },
    ],
    historyFacts: [
      { label: 'Founded from', value: 'A-1 Technical Engineering Solutions' },
      { label: 'Headquarters', value: 'Nagbe’s Town Junction, ELWA Road, Paynesville, Liberia' },
      { label: 'Accreditation', value: 'MOE and AITB' },
      { label: 'Chief Executive', value: 'Name awaiting confirmation' },
      { label: 'Contact', value: 'Contact details awaiting confirmation' },
    ],
    links: [{ label: 'Our campuses', to: '/about/campuses' }, { label: 'Meet the team', to: '/about/leadership' }],
  },
  '/about/ceo': {
    title: 'From building solar systems to building careers',
    eyebrow: 'Our CEO’s story',
    description: 'The story of how practical engineering work grew into a technical institute.',
    sections: [
      { title: 'A story in progress', body: 'The Institute grew from A-1 Technical Engineering Solutions into a place for practical technical and professional training.' },
      { title: 'Founder profile', body: 'Personal details and the full founder story are awaiting review and confirmation by the CEO before publication.' },
    ],
    links: [{ label: 'About A-1', to: '/about/us' }, { label: 'Meet the leadership team', to: '/about/leadership' }],
  },
  '/about/partners': {
    title: 'Accreditation and partners',
    eyebrow: 'Recognition',
    description: 'A-1 Technical Institute is accredited by Liberia’s education and technical training authorities.',
    sections: [
      { title: 'Accreditation', body: 'The Institute is accredited by the Ministry of Education (MOE) and the Agricultural and Industrial Training Bureau (AITB).' },
      { title: 'Employers and partners', body: 'Partner and employer information will be listed here after the organisations and approved details are confirmed.' },
      { title: 'Certificate verification', body: 'Employers can contact the Institute to request certificate verification.' },
    ],
    links: [{ label: 'Verify a certificate', to: '/verify' }, { label: 'Contact A-1', to: '/contact' }],
  },
  '/about/alumni': {
    title: 'Alumni',
    eyebrow: 'Graduate network',
    description: 'A place for A-1 graduates to share their progress, stay connected, and hear about Institute updates.',
    alumniPage: true,
    sections: [
      { title: 'Graduate stories', body: 'Graduate profiles will be added as alumni approve their stories and contact details for publication.' },
      { title: 'Stay connected', body: 'Contact the Institute to share an alumni update or ask about joining the alumni network.' },
    ],
    links: [{ label: 'Contact A-1', to: '/contact' }, { label: 'Explore courses', to: '/academic/courses' }],
  },
  '/student/alumni': {
    title: 'Alumni program',
    eyebrow: 'Student services',
    description: 'Information for A-1 graduates and alumni.',
    sections: [
      { title: 'Connect with the Institute', body: 'Contact the Institute to share a graduate update or ask about alumni activities.' },
    ],
    links: [{ label: 'Alumni information', to: '/about/alumni' }, { label: 'Contact A-1', to: '/contact' }],
  },
  '/about/campuses': {
    title: 'Our campuses',
    eyebrow: 'Locations',
    description: 'Find current campus information and check with Admissions before travelling.',
    campuses: [
      {
        name: 'Main Campus',
        address: 'Nagbe’s Town Junction, ELWA Road, Paynesville, Liberia',
        phone: 'Contact number awaiting confirmation',
        hours: 'Contact the Institute to confirm office and class hours.',
      },
    ],
    sections: [
      { title: 'Main Campus', body: 'The Main Campus is the Institute’s current training and administrative location. Contact Admissions for directions and current office hours.' },
      { title: 'Additional campuses', body: 'Information about additional campus openings and course availability will be published as it is confirmed.' },
    ],
    links: [{ label: 'Contact Admissions', to: '/contact' }, { label: 'Intake calendar', to: '/admission/calendar' }],
  },
  '/academic': {
    title: 'Academics',
    eyebrow: 'Study at A-1',
    description: 'Explore technical and professional training, course levels, and integrated pathways.',
    sections: [
      { title: 'Course catalogue', body: 'Search by course name, category, or level to find available training and prerequisites.' },
      { title: 'Integrated programs', body: 'Integrated pathways combine related courses into a structured career direction.' },
    ],
    links: [{ label: 'All courses', to: '/academic/courses' }, { label: 'Integrated programs', to: '/academic/programs/integrated' }, { label: 'Departments', to: '/academic/departments' }],
  },
  '/academic/programs/integrated': {
    title: 'Integrated programs',
    eyebrow: 'Career pathways',
    description: 'Related courses can be combined into a structured pathway with coordinated sessions.',
    sections: [
      { title: 'How a pathway works', body: 'Each integrated pathway groups connected courses. Ask Admissions which pathways and schedules are currently open before registering.' },
      { title: 'Choose a starting point', body: 'Course prerequisites and levels are listed in the course catalogue.' },
    ],
    links: [{ label: 'Browse courses', to: '/academic/courses' }, { label: 'Ask Admissions', to: '/contact' }],
  },
  '/academic/programs': {
    title: 'Programs',
    eyebrow: 'Career pathways',
    description: 'Explore structured training pathways at A-1 Technical Institute.',
    sections: [
      { title: 'Program categories', body: 'Courses are organised by level and subject. Check the catalogue for current details.' },
    ],
    links: [{ label: 'Browse courses', to: '/academic/courses' }, { label: 'Integrated programs', to: '/academic/programs/integrated' }],
  },
  '/academic/integrated-programs': {
    title: 'Integrated programs',
    eyebrow: 'Career pathways',
    description: 'Related courses can be combined into a structured pathway with coordinated sessions.',
    sections: [
      { title: 'How a pathway works', body: 'Each integrated pathway groups connected courses. Ask Admissions which pathways and schedules are currently open before registering.' },
      { title: 'Choose a starting point', body: 'Course prerequisites and levels are listed in the course catalogue.' },
    ],
    links: [{ label: 'Browse courses', to: '/academic/courses' }, { label: 'Ask Admissions', to: '/contact' }],
  },
  '/academic/departments': {
    title: 'Departments',
    eyebrow: 'Areas of study',
    description: 'A developing catalogue of technical and professional subject areas.',
    sections: [
      { title: 'Technical training', body: 'Subject areas include electrical and power technology, solar and renewable energy, construction, building design, agriculture, information technology, electronics, telecommunications, and refrigeration.' },
      { title: 'Professional studies', body: 'Professional offerings include business, project work, safety, and applied technical studies.' },
      { title: 'Course availability', body: 'Courses open in stages. Check the course catalogue or contact Admissions for current availability.' },
    ],
    links: [{ label: 'All courses', to: '/academic/courses' }, { label: 'Contact Admissions', to: '/contact' }],
  },
  '/academic/computer-training': {
    title: 'Free computer training',
    eyebrow: 'Student benefit',
    description: 'Basic computer skills support students across technical and professional courses.',
    sections: [
      { title: 'Build computer confidence', body: 'Training covers computer operation, file management, Microsoft Office, and safe internet use.' },
      { title: 'Ask about your course', body: 'Contact Admissions to confirm the timing and delivery of computer training for your intake.' },
    ],
    links: [{ label: 'Explore courses', to: '/academic/courses' }, { label: 'Contact Admissions', to: '/contact' }],
  },
  '/academic/technical': {
    title: 'Technical courses',
    eyebrow: 'Technical training',
    description: 'Explore practical technical training at A-1.',
    sections: [{ title: 'Hands-on courses', body: 'Browse technical courses and check each course page for the level, learning outcomes, duration, sessions, and prerequisites.' }],
    links: [{ label: 'View technical courses', to: '/academic/courses?category=Technical' }],
  },
  '/academic/advance': {
    title: 'Advanced courses',
    eyebrow: 'Advanced training',
    description: 'Explore advanced-level courses in the course catalogue.',
    sections: [{ title: 'Check prerequisites', body: 'Each course page lists its level and entry prerequisites. Contact Admissions if you need help selecting a course.' }],
    links: [{ label: 'View advanced courses', to: '/academic/courses?level=ADVANCED' }],
  },
  '/admission': {
    title: 'Admissions',
    eyebrow: 'Start your application',
    description: 'Find the information you need to choose a course, prepare, and register.',
    sections: [
      { title: 'Choose a course', body: 'Review course levels and prerequisites before selecting a program.' },
      { title: 'Confirm your intake', body: 'Schedules and availability may change. Contact Admissions to confirm the current intake.' },
    ],
    links: [{ label: 'How to apply', to: '/admission/apply' }, { label: 'Entry requirements', to: '/admission/requirements' }, { label: 'Fees and payments', to: '/admission/fees' }, { label: 'Register online', to: '/admission/register' }],
  },
  '/admission/apply': {
    title: 'How to apply',
    eyebrow: 'Admissions',
    description: 'Follow the steps below to prepare for registration and your first class.',
    applyPage: true,
    sections: [
      { title: '1. Choose your course', body: 'Review course details, prerequisites, duration, and session options.' },
      { title: '2. Prepare your documents', body: 'Bring valid identification and any academic documents required for your course level.' },
      { title: '3. Register and confirm', body: 'Complete registration with Admissions and confirm fees, payment steps, and your class schedule.' },
    ],
    links: [{ label: 'Course catalogue', to: '/academic/courses' }, { label: 'Entry requirements', to: '/admission/requirements' }, { label: 'Register online', to: '/admission/register' }],
  },
  '/admission/fees': {
    title: 'Fees and payment',
    eyebrow: 'Admissions',
    description: 'Fees depend on the course and current intake. Confirm the applicable fee and payment terms with Finance before paying.',
    sections: [
      { title: 'Payment options', body: 'Ask the Finance Office which cash, bank, or mobile-money payment options are available for your intake. Always request an official receipt.' },
      { title: 'Installment plans', body: 'Installment availability and deadlines may depend on the course. Confirm your plan in writing with Finance before registration.' },
      { title: 'Fee confirmation', body: 'Do not rely on old fee information. The amount and terms in force at registration apply.' },
    ],
    links: [{ label: 'Course catalogue', to: '/academic/courses' }, { label: 'Contact Finance', to: '/contact' }, { label: 'Intake calendar', to: '/admission/calendar' }],
  },
  '/admission/requirements': {
    title: 'Entry requirements',
    eyebrow: 'Admissions',
    description: 'Entry requirements vary by course level. Contact Admissions to confirm requirements for your chosen course.',
    sections: [
      { title: 'Foundation courses', body: 'Foundation courses are designed for learners starting out. Some courses require basic literacy, numeracy, or a minimum school grade.' },
      { title: 'Intermediate and advanced courses', body: 'Higher-level courses may require a related foundation course or equivalent work experience.' },
      { title: 'What to bring', body: 'Bring valid identification and any school certificates or previous course records relevant to your application.' },
    ],
    links: [{ label: 'Browse course prerequisites', to: '/academic/courses' }, { label: 'Ask Admissions', to: '/contact' }],
  },
  '/admission/calendar': {
    title: 'Intake calendar',
    eyebrow: 'Admissions',
    description: 'Intake dates and course schedules are confirmed by Admissions as they become available.',
    intakeCalendar: true,
    sections: [
      { title: 'Confirm the next intake', body: 'Contact the Admissions Office for current registration dates, course start dates, and available sessions.' },
      { title: 'Plan your weekly schedule', body: 'Ask about morning, afternoon, and evening session availability for your selected course.' },
    ],
    links: [{ label: 'Choose a course', to: '/academic/courses' }, { label: 'Contact Admissions', to: '/contact' }],
  },
  '/admission/register': {
    title: 'Register online',
    eyebrow: 'Admissions',
    description: 'Start registration by selecting your course, then confirm your application details with Admissions.',
    registrationPage: true,
    sections: [
      { title: 'Before you begin', body: 'Choose a course and prepare your contact details and relevant identification or academic records.' },
      { title: 'Get registration assistance', body: 'Contact Admissions if you need help completing registration or confirming the current intake.' },
    ],
    links: [{ label: 'Browse courses', to: '/academic/courses' }, { label: 'Contact Admissions', to: '/contact' }],
  },
  '/register': {
    title: 'Register with A-1',
    eyebrow: 'Admissions',
    description: 'Choose a course and contact Admissions to confirm current registration steps.',
    registrationPage: true,
    sections: [
      { title: 'Get started', body: 'Review course prerequisites and confirm availability, fees, and class sessions before completing registration.' },
    ],
    links: [{ label: 'Browse courses', to: '/academic/courses' }, { label: 'How to apply', to: '/admission/apply' }, { label: 'Contact Admissions', to: '/contact' }],
  },
  '/admission/faq': {
    title: 'Frequently asked questions',
    eyebrow: 'Admissions',
    description: 'Find answers to common questions about choosing a course, registration, and student life.',
    faqPage: true,
    sections: [
      { title: 'Course and registration questions', body: 'Review the frequently asked questions below or contact Admissions for course-specific guidance.' },
    ],
    links: [{ label: 'How to apply', to: '/admission/apply' }, { label: 'Contact Admissions', to: '/contact' }],
  },
  '/admissions': {
    title: 'Admissions',
    eyebrow: 'Start your application',
    description: 'Find the information you need to choose a course, prepare, and register.',
    sections: [
      { title: 'Choose a course', body: 'Review course levels and prerequisites before selecting a program.' },
      { title: 'Confirm your intake', body: 'Schedules and availability may change. Contact Admissions to confirm the current intake.' },
    ],
    links: [{ label: 'How to apply', to: '/admission/apply' }, { label: 'Entry requirements', to: '/admission/requirements' }, { label: 'Fees and payments', to: '/admission/fees' }, { label: 'Register online', to: '/admission/register' }],
  },
  '/media': {
    title: 'News and media',
    eyebrow: 'At A-1',
    description: 'Updates, reports, events, and photographs from A-1 Technical Institute.',
    sections: [{ title: 'Explore A-1', body: 'Visit the news, reports, events, and gallery pages for Institute updates and training highlights.' }],
    links: [{ label: 'News', to: '/media/news' }, { label: 'Reports', to: '/media/reports' }, { label: 'Gallery', to: '/media/gallery' }, { label: 'Events', to: '/media/events' }],
  },
  '/media/news': {
    title: 'News',
    eyebrow: 'Latest updates',
    description: 'Announcements and stories from A-1 Technical Institute.',
    newsPage: true,
    newsStories,
    sections: [
      { title: 'Institute updates', body: 'News and announcements will be published here as they are confirmed by A-1.' },
      { title: 'Admissions updates', body: 'For current registration dates and course availability, contact Admissions directly.' },
    ],
    links: [{ label: 'Intake calendar', to: '/admission/calendar' }, { label: 'Contact A-1', to: '/contact' }],
  },
  '/media/reports': {
    title: 'Reports',
    eyebrow: 'Impact and accountability',
    description: 'Reports on A-1’s training activity, progress, and impact.',
    sections: [
      { title: 'Mission 2036', body: 'The Institute’s long-term mission is to expand access to practical training. Progress figures should be interpreted with their reporting period and methodology.' },
      { title: 'Publications', body: 'Official reports and downloadable documents will be listed here when they are approved for publication.' },
    ],
    reports: [
      {
        title: 'Mission 2036 overview',
        period: 'Long-term target',
        description: 'A concise overview of the Institute’s published mission and 2036 target.',
        downloadName: 'a1-mission-2036-overview.txt',
        downloadContent: 'A-1 TECHNICAL INSTITUTE\nMISSION 2036 OVERVIEW\n\nA-1 Technical Institute’s stated long-term ambition is to expand access to practical skills training and reach one million young people by 2036.\n\nThis is a summary of the published mission statement, not an annual impact report or a claim of achieved results.\n',
      },
      {
        title: 'Course catalogue overview',
        period: 'Current catalogue',
        description: 'An individual download listing courses, categories, levels, durations, and prerequisites.',
        downloadName: 'a1-course-catalogue-overview.txt',
        includeCourseList: true,
        downloadContent: 'A-1 TECHNICAL INSTITUTE\nCOURSE CATALOGUE OVERVIEW\n\nThe list below is generated from the course catalogue currently published on this site. Course schedules and fees should be confirmed with Admissions for the current intake.\n\nCOURSE | CATEGORY | LEVEL | DURATION | PREREQUISITES\n',
      },
    ],
    links: [{ label: 'Our mission', to: '/about/mission' }, { label: 'Contact A-1', to: '/contact' }],
  },
  '/media/resources': {
    title: 'Resources',
    eyebrow: 'Downloads and guides',
    description: 'Find course guides and useful information for prospective and current students.',
    sections: [
      { title: 'Student resources', body: 'Course guides, forms, and official student resources will be shared here when available.' },
      { title: 'Need a document?', body: 'Contact the Admissions Office to request current registration forms or course information.' },
    ],
    links: [{ label: 'Course catalogue', to: '/academic/courses' }, { label: 'Contact A-1', to: '/contact' }],
  },
  '/media/gallery': {
    title: 'Gallery',
    eyebrow: 'A-1 in action',
    description: 'Photos and videos from A-1 classes, practical training, workshops, and events.',
    sections: [
      { title: 'Practical learning', body: 'Explore student activities and training highlights from the Institute.' },
    ],
    galleryItems: [
      { id: 'training-01', src: galleryPhoto01, alt: 'A-1 students taking part in technical training', title: 'Technical training' },
      { id: 'training-02', src: galleryPhoto02, alt: 'A-1 students learning together in a classroom', title: 'Classroom learning' },
      { id: 'training-03', src: galleryPhoto03, alt: 'Students practicing satellite dish installation', title: 'Satellite installation practice' },
      { id: 'training-04', src: galleryPhoto04, alt: 'Students practicing electrical installation', title: 'Electrical installation practice' },
      { id: 'training-05', src: galleryPhoto05, alt: 'A group of A-1 students during a class session', title: 'Student class session' },
      { id: 'training-06', src: galleryPhoto06, alt: 'Students working together on a technical installation', title: 'Hands-on technical practice' },
    ],
    links: [{ label: 'Explore courses', to: '/academic/courses' }, { label: 'Upcoming events', to: '/media/events' }],
  },
  '/media/events': {
    title: 'Events',
    eyebrow: 'What’s happening',
    description: 'Find out about upcoming A-1 events and key dates.',
    sections: [
      { title: 'Upcoming dates', body: 'Event dates are published when confirmed. Contact the Institute to check the latest schedule.' },
      { title: 'Admissions and orientation', body: 'Ask Admissions about course start dates, orientation, and student meet-and-greet activities.' },
    ],
    links: [{ label: 'Intake calendar', to: '/admission/calendar' }, { label: 'Contact A-1', to: '/contact' }],
  },
  '/media/reports-and-publications': {
    title: 'Reports',
    eyebrow: 'Impact and accountability',
    description: 'Reports on A-1’s training activity, progress, and impact.',
    sections: [
      { title: 'Mission 2036', body: 'The Institute’s long-term mission is to expand access to practical training. Progress figures should be interpreted with their reporting period and methodology.' },
      { title: 'Publications', body: 'Official reports and downloadable documents will be listed here when they are approved for publication.' },
    ],
    links: [{ label: 'Our mission', to: '/about/mission' }, { label: 'Contact A-1', to: '/contact' }],
  },
  '/about/careers': {
    title: 'Career insights',
    eyebrow: 'Prepare for work',
    description: 'Practical guidance to help learners prepare for work and grow their careers.',
    sections: [
      { title: 'Build job-ready skills', body: 'Combine practical training with clear communication, safe work habits, and a willingness to keep learning.' },
      { title: 'Explore your options', body: 'Course pages describe the skills covered by each training pathway.' },
    ],
    links: [{ label: 'Browse courses', to: '/academic/courses' }, { label: 'Graduate community', to: '/about/alumni' }],
  },
  '/careers': {
    title: 'Career insights',
    eyebrow: 'Prepare for work',
    description: 'Practical guidance to help learners prepare for work and grow their careers.',
    sections: [
      { title: 'Build job-ready skills', body: 'Combine practical training with clear communication, safe work habits, and a willingness to keep learning.' },
    ],
    links: [{ label: 'Browse courses', to: '/academic/courses' }, { label: 'Graduate community', to: '/about/alumni' }],
  },
  '/vacancies': {
    title: 'Vacancies',
    eyebrow: 'Work with A-1',
    description: 'Information about open roles will be published when vacancies are available.',
    sections: [
      { title: 'Interested in teaching?', body: 'Experienced technicians and professionals can contact the Institute to ask about future instructor opportunities.' },
      { title: 'Current openings', body: 'No vacancy details have been confirmed for publication at this time.' },
    ],
    links: [{ label: 'Contact A-1', to: '/contact' }, { label: 'Leadership & staff', to: '/about/leadership' }],
  },
  '/contact': {
    title: 'Contact A-1',
    eyebrow: 'We’re here to help',
    description: 'Questions about courses, fees, registration, or campus visits? Contact the Institute for current information.',
    contactPage: true,
    sections: [
      { title: 'Admissions and course questions', body: 'Contact Admissions to confirm course availability, entry requirements, intake dates, and registration steps.' },
      { title: 'Finance questions', body: 'Contact the Finance Office to confirm fees, payment channels, and official receipts before making a payment.' },
      { title: 'Visit the Main Campus', body: 'Please contact the Institute for the current address, directions, and office hours before visiting.' },
    ],
    links: [{ label: 'Course catalogue', to: '/academic/courses' }, { label: 'Admissions information', to: '/admission' }],
  },
  '/track': {
    title: 'Track registration',
    eyebrow: 'Applicant services',
    description: 'Check the status of a registration with the reference details issued by Admissions.',
    loginRequired: true,
    sections: [
      { title: 'Need your reference?', body: 'If you do not have a registration reference or cannot find a status update, contact Admissions for help.' },
    ],
    links: [{ label: 'Contact Admissions', to: '/contact' }, { label: 'Registration information', to: '/admission/register' }],
  },
  '/verify': {
    title: 'Verify a certificate',
    eyebrow: 'For employers',
    description: 'Use the certificate ID or QR code to request verification of an A-1 certificate.',
    sections: [
      { title: 'Certificate verification', body: 'Enter the certificate ID printed on the document or scan its QR code. Verification results are only available when the Institute’s certificate verification service is connected.' },
      { title: 'Need assistance?', body: 'Contact the Institute and include the certificate ID so staff can assist with verification.' },
    ],
    links: [{ label: 'Contact A-1', to: '/contact' }],
  },
  '/student/portal': {
    title: 'Student portal',
    eyebrow: 'Student services',
    description: 'The student portal is provided through the Institute’s student information system.',
    sections: [
      { title: 'Sign-in access', body: 'Use the login details issued by the Institute. Contact student support if you need access help.' },
      { title: 'Portal availability', body: 'The portal will open here when the Institute provides the active sign-in address.' },
    ],
    links: [{ label: 'Student support', to: '/student/support' }, { label: 'How to use the portal', to: '/student/faq' }],
  },
  '/login': {
    title: 'Sign in',
    eyebrow: 'Applicant services',
    description: 'Sign in to access registration and applicant services.',
    loginPage: true,
  },
  '/student/faq': {
    title: 'Student portal help',
    eyebrow: 'Student services',
    description: 'Guidance for students using the A-1 student portal.',
    sections: [
      { title: 'Sign-in issues', body: 'Check the login details issued by the Institute. Contact student support if you need a password reset or cannot access your account.' },
      { title: 'Portal access', body: 'The portal sign-in link will be available here when the Institute confirms its active student system address.' },
    ],
    links: [{ label: 'Open student portal', to: '/student/portal' }, { label: 'Student support', to: '/student/support' }],
  },
  '/student/support': {
    title: 'Student support',
    eyebrow: 'Student services',
    description: 'Get help with student records, portal access, course schedules, and certificates.',
    sections: [
      { title: 'Contact student services', body: 'Include your name, course, and student reference when contacting the Institute so staff can direct your request.' },
    ],
    links: [{ label: 'Contact A-1', to: '/contact' }, { label: 'Student portal', to: '/student/portal' }],
  },
  '/sheet-all': {
    title: 'Course fee sheet',
    eyebrow: 'Admissions',
    description: 'Course fees and payment terms must be confirmed with the Finance Office for the current intake.',
    sections: [
      { title: 'Request current fees', body: 'Fees vary by course and may change between intakes. Contact Finance to request the current approved fee sheet before paying.' },
    ],
    links: [{ label: 'Fees and payment', to: '/admission/fees' }, { label: 'Contact Finance', to: '/contact' }],
  },
};

const pageAliases = {
  '/about': '/about/history',
  '/about/us': '/about/history',
  '/about/overview': '/about/history',
  '/partners': '/about/partners',
  '/about/accreditation': '/about/partners',
  '/admission/requirements': '/admission/requirements',
  '/admission/apply': '/admission/apply',
  '/admission/fees': '/admission/fees',
  '/admission/calendar': '/admission/calendar',
  '/admission/register': '/admission/register',
  '/admission/faq': '/admission/faq',
  '/media/careers': '/about/careers',
  '/academic/free-computer-training': '/academic/computer-training',
  '/academic/integrated-programs': '/academic/programs/integrated',
  '/computer': '/academic/computer-training',
  '/integrated-programs': '/academic/programs/integrated',
  '/departments': '/academic/departments',
  '/faq': '/admission/faq',
  '/fees': '/admission/fees',
  '/fees-payment': '/admission/fees',
  '/requirements': '/admission/requirements',
  '/calendar': '/admission/calendar',
  '/news': '/media/news',
  '/reports': '/media/reports',
  '/gallery': '/media/gallery',
  '/videos': '/media/videos',
  '/events': '/media/events',
  '/resources': '/media/resources',
  '/contact-us': '/contact',
  '/leadership': '/about/leadership',
  '/alumni': '/about/alumni',
  '/campuses': '/about/campuses',
  '/mission': '/about/mission',
  '/history': '/about/history',
  '/ceo': '/about/ceo',
};

function titleFromPath(pathname) {
  const segment = pathname.split('/').filter(Boolean).pop() || 'A-1 Technical Institute';
  return segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export const sitePageService = {
  async getByPath(pathname) {
    const normalizedPath = pathname.replace(/\/+$/, '') || '/';
    if (normalizedPath.startsWith('/media/news/')) {
      const storySlug = normalizedPath.slice('/media/news/'.length);
      const story = newsStories.find((item) => item.slug === storySlug);
      if (story) {
        return {
          path: normalizedPath,
          title: story.title,
          eyebrow: story.category,
          description: story.summary,
          newsArticle: story,
          newsStories,
        };
      }
    }
    if (normalizedPath === '/media/videos') {
      return {
        path: normalizedPath,
        title: 'YouTube Shorts ad examples',
        eyebrow: 'Watch',
        description: 'Browse short-form video advertisements and campaign examples.',
        videoPage: true,
      };
    }
    const canonicalPath = pageAliases[normalizedPath] || normalizedPath;
    const page = sitePages[canonicalPath];
    if (page) return { ...page, path: normalizedPath };

    return {
      path: normalizedPath,
      title: titleFromPath(normalizedPath),
      eyebrow: 'A-1 Technical Institute',
      description: 'Information and services from A-1 Technical Institute.',
      sections: [
        { title: 'Explore A-1', body: 'Browse courses, learn about admissions, or contact the Institute for current information.' },
      ],
      links: [
        { label: 'Browse courses', to: '/academic/courses' },
        { label: 'Admissions', to: '/admission' },
        { label: 'Contact A-1', to: '/contact' },
      ],
    };
  },
};

export default sitePageService;
