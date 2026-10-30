export const FAQ_ITEMS = [
  {
    question: 'How do I choose a course?',
    answer: 'Browse the course catalogue and compare the course category, level, duration, and prerequisites. Contact admissions if you need help choosing.',
    category: 'courses',
    popular: true,
  },
  {
    question: 'How can I register?',
    answer: 'Use the registration option on the website or visit the Admissions Office for assistance with your application.',
    category: 'registration',
    popular: true,
  },
  {
    question: 'What should I expect from the training?',
    answer: 'A-1 focuses on practical, hands-on technical and professional training. Course activities and schedules vary by programme.',
    category: 'general',
    popular: true,
  },
  {
    question: 'Where can I find course requirements and schedules?',
    answer: 'Course prerequisites are listed on each course detail page. Contact the Admissions Office for the latest intake and class schedule information.',
    category: 'courses',
    popular: true,
  },
  {
    question: 'Where is A-1 Technical Institute located?',
    answer: 'The Main Campus is at Nagbe’s Town Junction, ELWA Road, Paynesville, Liberia. See the campuses page for directions and contact the Institute before visiting.',
    category: 'general',
  },
  {
    question: 'How can I contact the Institute?',
    answer: 'Use the Contact Us page for campus directions and the latest information. Phone and email details will be published when confirmed.',
    category: 'general',
  },
  {
    question: 'What documents should I prepare to register?',
    answer: 'Prepare your contact details and ask Admissions which identification or academic records are required for your chosen course and intake.',
    category: 'registration',
  },
  {
    question: 'Can I register in person?',
    answer: 'Yes. Visit the Admissions Office at a campus for help with the registration process. Confirm office hours before travelling.',
    category: 'registration',
  },
  {
    question: 'How do I check whether a course is available?',
    answer: 'Review the course catalogue, then contact Admissions to confirm that the course is running in the intake you want.',
    category: 'courses',
  },
  {
    question: 'How long do courses take?',
    answer: 'Course duration varies. Check the course details page for the current duration and contact Admissions if you need help planning.',
    category: 'courses',
  },
  {
    question: 'How much are course fees?',
    answer: 'Draft fee information is available on the Fees and Payments page. Confirm the current amount and any installment plan with Finance before paying.',
    category: 'fees',
  },
  {
    question: 'Which payment methods are accepted?',
    answer: 'Ask Finance for the currently approved payment channels and official payment instructions before sending money.',
    category: 'fees',
  },
  {
    question: 'How can I get an official payment receipt?',
    answer: 'Keep your payment confirmation and contact the Finance Office to confirm that your payment has been recorded and request an official receipt.',
    category: 'fees',
  },
  {
    question: 'Where can current students get help?',
    answer: 'Contact the Institute and include your name, course, and student reference so staff can direct your request.',
    category: 'student-life',
  },
  {
    question: 'How can graduates stay connected?',
    answer: 'Visit the Alumni page to learn about the graduate network and contact the Institute to share an update or ask about alumni activities.',
    category: 'student-life',
  },
  {
    question: 'Can I verify a certificate online?',
    answer: 'Use the certificate verification page to look up a sample record. For official verification, contact the Institute directly.',
    category: 'certificates',
  },
  {
    question: 'What should an employer provide for certificate verification?',
    answer: 'Share the certificate number and relevant certificate details when contacting the Institute. Sample lookup results are not official verification.',
    category: 'certificates',
  },
];

export const FAQ_CATEGORIES = [
  { id: 'general', title: 'General questions', description: 'Institute information, locations, and getting in touch.', icon: 'info' },
  { id: 'registration', title: 'Registration', description: 'Applications, documents, and registration support.', icon: 'how_to_reg' },
  { id: 'courses', title: 'Courses', description: 'Course choices, schedules, and requirements.', icon: 'menu_book' },
  { id: 'fees', title: 'Fees and payments', description: 'Draft fees, payment instructions, and receipts.', icon: 'payments' },
  { id: 'student-life', title: 'Student life', description: 'Support for current students and graduates.', icon: 'groups' },
  { id: 'certificates', title: 'Certificates', description: 'Sample lookups and official verification requests.', icon: 'verified' },
];

export const POPULAR_FAQ_ITEMS = FAQ_ITEMS.filter(({ popular }) => popular);
