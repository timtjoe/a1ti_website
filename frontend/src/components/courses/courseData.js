import img001 from '@/assets/img_001.jpeg';
import img002 from '@/assets/img_002.jpeg';
import img003 from '@/assets/img_003.jpeg';
import img004 from '@/assets/img_004.jpeg';
import img005 from '@/assets/img_005.jpeg';

export const COURSES = [
  {
    id: 'solar-installation',
    slug: 'basic-solar-system-installation',
    title: 'Basic Solar System Installation',
    level: 'FOUNDATION',
    category: 'Technical',
    description:
      'How solar power works: panels, charge controllers, batteries and inverters. Learn tools, materials and safety for solar work.',
    learningPoints: [
      'Solar PV panel sizing and tilt alignment',
      'Charge controller and battery wiring',
      'Inverter setup and AC/DC safety',
      'Fault troubleshooting and maintenance',
    ],
    duration: '3 months',
    sessions: '2 sessions / week',
    prerequisites: 'None. Open to all youth.',
    image: img001,
  },
  {
    id: 'electricity',
    slug: 'electricity',
    title: 'Electricity',
    level: 'FOUNDATION',
    category: 'Technical',
    description:
      'Learn electrical safety, personal protective equipment, safe isolation, and the fundamentals of circuits.',
    learningPoints: [
      'Electrical safety protocols and PPE',
      'Ohm’s Law and circuit calculations',
      'Conduit bending and wall mounting',
      'Residential breaker panel wiring',
    ],
    duration: '6 months',
    sessions: '2 sessions / week',
    prerequisites: 'Basic math and literacy.',
    image: img002,
  },
  {
    id: 'computer-intro',
    slug: 'intro-to-computer',
    title: 'Introduction to Computer',
    level: 'FOUNDATION',
    category: 'Technical',
    description:
      'Understand computer parts and learn Windows basics, file management, Microsoft Office, and safe internet use.',
    learningPoints: [
      'Computer hardware and operating system basics',
      'Keyboarding and file management',
      'Microsoft Office (Word and Excel)',
      'Safe internet browsing and email setup',
    ],
    duration: '3 months',
    sessions: '6 sessions / week',
    prerequisites: 'None required.',
    image: img003,
  },
  {
    id: 'cctv-installation',
    slug: 'biometric-cctv-installation',
    title: 'Biometric & CCTV Installation',
    level: 'INTERMEDIATE',
    category: 'Technical',
    description:
      'Install CCTV cameras, DVRs and NVRs, plan camera coverage, and configure biometric access controls.',
    learningPoints: [
      'Analog and IP camera positioning',
      'DVR/NVR storage and network setup',
      'Biometric reader and magnetic lock wiring',
      'Mobile remote viewing configuration',
    ],
    duration: '9 months',
    sessions: '2 sessions / week',
    prerequisites: 'Basic electrical or computer background.',
    image: img004,
  },
  {
    id: 'ai-prompting',
    slug: 'ai-prompt-engineering',
    title: 'AI & Prompt Engineering',
    level: 'FOUNDATION',
    category: 'Professional',
    description:
      'Explore AI tools and write clear prompts that produce accurate, useful results for everyday work.',
    learningPoints: [
      'Generative AI core fundamentals',
      'Prompt structuring and zero-shot techniques',
      'Automating document drafting and data summaries',
      'AI ethics and verifying output accuracy',
    ],
    duration: '3 months',
    sessions: '2 sessions / week',
    prerequisites: 'Basic computer literacy.',
    image: img005,
  },
  {
    id: 'web-development',
    slug: 'website-development',
    title: 'Website Development',
    level: 'ADVANCED',
    category: 'Technical',
    description:
      'Learn HTML, CSS, JavaScript, and modern frontend development to build responsive websites.',
    learningPoints: [
      'Semantic HTML5 and modern CSS Grid',
      'JavaScript ES6+ interactive logic',
      'React component state architecture',
      'Git version control and web hosting',
    ],
    duration: '6 months',
    sessions: '3 sessions / week',
    prerequisites: 'Intro to Computer or equivalent.',
    image: img001,
  },
  {
    id: 'autocad-design',
    slug: 'autocad-design',
    title: 'AutoCAD & Technical Drawing',
    level: 'INTERMEDIATE',
    category: 'Technical',
    description:
      'Develop 2D drafting skills, create architectural plans, and apply standard engineering design workflows.',
    learningPoints: [
      'AutoCAD workspace and precision tools',
      'Architectural floor plans and elevations',
      'Layer management and dimensioning',
      'Plotting and PDF blueprint export',
    ],
    duration: '4 months',
    sessions: '2 sessions / week',
    prerequisites: 'Basic technical drafting intuition.',
    image: img002,
  },
  {
    id: 'monitoring-evaluation',
    slug: 'monitoring-evaluation',
    title: 'Monitoring & Evaluation (M&E)',
    level: 'ADVANCED',
    category: 'Professional',
    description:
      'Learn project tracking frameworks, indicator development, and data collection for development initiatives.',
    learningPoints: [
      'Logical Framework (LogFrame) design',
      'KPI and indicator tracking matrices',
      'Data collection survey methodology',
      'Impact report writing for donors',
    ],
    duration: '6 months',
    sessions: '3 sessions / week',
    prerequisites: 'Professional or academic background.',
    image: img003,
  },
];
