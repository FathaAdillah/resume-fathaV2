// ─── Profile ───────────────────────────────────────────────────────────────
export const profile = {
  name: 'Fatharoni Adillah Rachman',
  title: 'Web Developer',
  email: 'fatha.adillah12@gmail.com',
  phone: '(62) 89 560 9674 762',
  location: 'Gresik, Indonesia, 61151',
  github: 'https://github.com/FathaAdillah',
  linkedin: 'https://www.linkedin.com/in/fatha-adillah/',
  credly: 'https://www.credly.com/users/fatharoni-adillah-rachman',
}

export const bio = `An IT professional with a focus on project management and web-based application development. Experienced in managing project planning, team coordination, and on-time delivery, as well as developing applications across various sectors using modern frameworks and API integrations. Supported by a solid understanding of cloud computing and relevant certifications, with a structured, efficient, and business-oriented approach to delivering optimal solutions.`

// ─── Experience ────────────────────────────────────────────────────────────
export interface Experience {
  id: number
  company: string
  role: string
  period: string
  current: boolean
  bullets: string[]
  achievements: string[]
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Pelindo Solusi Digital',
    role: 'Web Developer',
    period: 'May 2025 – Present',
    current: true,
    bullets: [
      'Develop and maintain ERP HCM and E-Recruitment applications across multiple business sectors.',
      'Design and implement RESTful APIs for seamless system integrations and data exchange.',
      'Integrate MyPelindo Employee Administration services via APIs for operational efficiency.',
      'Resolve user-reported issues and handle support tickets with timely and effective solutions.',
      'Collaborate with cross-functional teams using Agile Methodologies to ensure successful project delivery.',
    ],
    achievements: [
      'Successfully delivered task projects with high reliability.',
      'Improved integration performance and optimized workflows.',
    ],
  },
  {
    id: 2,
    company: 'Pelindo Solusi Digital',
    role: 'System Implementator',
    period: 'May 2023 – May 2025',
    current: false,
    bullets: [
      'Prepare enterprise master data Pelindo subholding for migration to database.',
      'Implementation of Enterprise Resource Planning (Centra Pelindo).',
      'Resolved user issues through application and database troubleshooting.',
      'Part of HCM Module (HRIS) of Centra Pelindo.',
      'Perform SIT and UAT in the process of implementing the application program to the Pelindo subholding company.',
    ],
    achievements: [
      'Implementation in 6 Pelindo holding companies in 2023.',
      'Carry out Managing Service with SLA predicate on time.',
    ],
  },
  {
    id: 3,
    company: 'PT. Pitik Digital Indonesia',
    role: 'IT Support IoT',
    period: 'September 2022 – April 2023',
    current: false,
    bullets: [
      'Deployment of sensors on the farm.',
      'Configuring the connection with coop ID to the server (MQTT).',
      'Creating visualizations for temperature and humidity sensors using Elastic.',
      'Maintaining devices both onsite and offsite.',
      'Controlling assets and inventory.',
    ],
    achievements: [
      'Achieved 85% on time SLA achievement.',
      'More than 90% of devices always online within a month.',
    ],
  },
  {
    id: 4,
    company: 'PT. Bringin Inti Teknologi',
    role: 'IT Support',
    period: 'May 2021 – December 2021',
    current: false,
    bullets: [
      'Equipment maintenance, function tests, and documentation for PT. Bank Rakyat Indonesia in all areas of the Regional Office of Surabaya.',
      'Antivirus installation, UPS installation, and employee operational equipment installation.',
      'Coordinating urgent corrective maintenance ticketing in all areas of BRI Regional Office Surabaya.',
    ],
    achievements: [
      'Completed maintenance of one district branch area within 1 month.',
    ],
  },
]

// ─── Skills ────────────────────────────────────────────────────────────────
export const skills: Record<string, string[]> = {
  'Backend Development': ['PHP (Laravel)', 'React', 'JavaScript', 'REST API Development'],
  'Database Management': ['MySQL', 'PostgreSQL', 'Oracle SQL', 'NoSQL'],
  'Cloud & Deployment': ['VPS', 'AWS', 'Alibaba Cloud', 'Docker'],
  'Tools & Collaboration': ['Git', 'GitHub', 'GitLab'],
  'Architecture': ['MVC', 'SDLC', 'Microservices', 'RESTful API'],
}

// ─── Projects (Dummy) ──────────────────────────────────────────────────────
export interface ProjectImage {
  gradient: string
  label: string
}

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  gradient: string
  icon: string
  images: ProjectImage[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'ERP HCM Module',
    description: 'Enterprise Resource Planning Human Capital Management system for Pelindo holding companies. Features employee data management, payroll integration, attendance tracking, and a comprehensive reporting dashboard.',
    tags: ['Laravel', 'Oracle SQL', 'PHP', 'REST API'],
    gradient: 'from-blue-500 to-blue-700',
    icon: '🏢',
    images: [
      { gradient: 'from-blue-400 to-blue-600', label: 'Dashboard Overview' },
      { gradient: 'from-blue-500 to-indigo-600', label: 'Employee Management' },
      { gradient: 'from-indigo-400 to-blue-600', label: 'Reports & Analytics' },
    ],
  },
  {
    id: 2,
    title: 'E-Recruitment System',
    description: 'Digital recruitment platform for Pelindo with job posting management, applicant tracking, automated screening features, and integration with MyPelindo Employee Administration services.',
    tags: ['Laravel', 'MySQL', 'React', 'REST API'],
    gradient: 'from-cyan-500 to-blue-600',
    icon: '👥',
    images: [
      { gradient: 'from-cyan-400 to-blue-500', label: 'Job Listing Page' },
      { gradient: 'from-blue-400 to-cyan-600', label: 'Applicant Tracker' },
      { gradient: 'from-sky-400 to-blue-600', label: 'Interview Schedule' },
    ],
  },
  {
    id: 3,
    title: 'IoT Farm Monitoring',
    description: 'Real-time monitoring dashboard for agricultural IoT sensors. Tracks temperature, humidity, and electrical data using MQTT protocol with Elasticsearch visualizations and alerting.',
    tags: ['IoT', 'MQTT', 'Elasticsearch', 'Node.js'],
    gradient: 'from-teal-500 to-blue-600',
    icon: '🌡️',
    images: [
      { gradient: 'from-teal-400 to-blue-500', label: 'Sensor Dashboard' },
      { gradient: 'from-green-400 to-teal-500', label: 'Temperature Trends' },
      { gradient: 'from-blue-400 to-teal-600', label: 'Alert System' },
    ],
  },
  {
    id: 4,
    title: 'Centra Pelindo ERP',
    description: 'Full-scale ERP implementation across 6 Pelindo holding companies. Managed system migration, enterprise master data preparation, SIT, and UAT processes ensuring smooth go-live.',
    tags: ['ERP', 'Oracle SQL', 'PostgreSQL', 'System Integration'],
    gradient: 'from-blue-600 to-violet-600',
    icon: '⚙️',
    images: [
      { gradient: 'from-blue-500 to-violet-500', label: 'Implementation Plan' },
      { gradient: 'from-violet-400 to-blue-600', label: 'Data Migration' },
      { gradient: 'from-blue-600 to-indigo-600', label: 'Go-Live Dashboard' },
    ],
  },
  {
    id: 5,
    title: 'API Integration Platform',
    description: 'Middleware platform for integrating third-party services including WHAPI and MyPelindo services. Handles authentication, rate limiting, request transformation, and monitoring.',
    tags: ['Laravel', 'REST API', 'Docker', 'MySQL'],
    gradient: 'from-sky-500 to-blue-700',
    icon: '🔗',
    images: [
      { gradient: 'from-sky-400 to-blue-600', label: 'API Gateway' },
      { gradient: 'from-blue-400 to-sky-600', label: 'Integration Map' },
      { gradient: 'from-indigo-400 to-sky-500', label: 'Monitoring Panel' },
    ],
  },
  {
    id: 6,
    title: 'IT Asset Management',
    description: 'Internal asset tracking and management system for BRI Regional Office Surabaya. Features inventory tracking, maintenance scheduling, ticketing system, and documentation management.',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'Git'],
    gradient: 'from-blue-500 to-sky-600',
    icon: '💻',
    images: [
      { gradient: 'from-blue-400 to-indigo-500', label: 'Asset Dashboard' },
      { gradient: 'from-sky-400 to-blue-600', label: 'Maintenance Log' },
      { gradient: 'from-blue-500 to-cyan-500', label: 'Inventory Report' },
    ],
  },
]

// ─── Education ─────────────────────────────────────────────────────────────
export const education = [
  {
    institution: 'Universitas Trunojoyo Madura',
    degree: 'Bachelor of Information System',
    period: '2017 – 2022',
    detail: 'GPA: 3.33',
    icon: '🎓',
    initials: 'UTM',
    color: 'from-blue-500 to-blue-700',
  },
  {
    institution: 'SMK Teknik PAL Surabaya',
    degree: 'Computer and Network Engineering',
    period: '2014 – 2017',
    detail: 'Final Score: 85/100',
    icon: '🏫',
    initials: 'PAL',
    color: 'from-sky-500 to-blue-600',
  },
]

// ─── Organizations ─────────────────────────────────────────────────────────
export const organizations = [
  {
    name: 'UKMFT-ITC (Information Technology Center)',
    role: 'Chair of Executive Board',
    period: 'January 2021 – December 2021',
    institution: 'Universitas Trunojoyo Madura',
    icon: '👑',
    initials: 'ITC',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    name: 'UKMFT-ITC (Information Technology Center)',
    role: 'Head of Public Relation Division',
    period: 'January 2020 – December 2020',
    institution: 'Universitas Trunojoyo Madura',
    icon: '📢',
    initials: 'ITC',
    color: 'from-sky-500 to-blue-600',
  },
]

// ─── Knowledge ─────────────────────────────────────────────────────────────
export const knowledge = [
  'Software Development Life Cycle (SDLC)',
  'Project Management (Agile & Waterfall)',
  'RESTful API Architecture & Integration',
  'Cloud Computing (deployment, scaling, monitoring)',
  'Database Design & Data Management',
  'System Integration & Automation',
  'Web Application Architecture (MVC, Microservices)',
]

// ─── Soft Skills ───────────────────────────────────────────────────────────
export const softSkills = [
  'Project Planning & Task Management',
  'Problem Solving & Analytical Thinking',
  'Communication with Technical & Non-Technical Teams',
  'Team Collaboration (Cross-functional)',
  'Time Management & Meeting Deadlines',
  'Adaptability to New Technologies',
  'Attention to Detail',
  'Responsibility & Ownership of Tasks',
]

// ─── Certifications (Dummy) ───────────────────────────────────────────────
export interface Certification {
  id: number
  title: string
  issuer: string
  category: string
  gradient: string
  icon: string
  issuerBg: string      // header background color
  issuerText: string    // issuer name text color
  accentColor: string   // accent line / seal color
  certLabel: string     // e.g. "Cloud Computing Certificate"
  recipientName: string
  date: string
}

export const certifications: Certification[] = [
  {
    id: 1, title: 'AWS Academy Cloud Foundations', issuer: 'AWS Academy', category: 'Cloud',
    gradient: 'from-orange-400 to-amber-500', icon: '☁️',
    issuerBg: '#232f3e', issuerText: '#ff9900', accentColor: '#ff9900',
    certLabel: 'Cloud Computing Foundations', recipientName: 'Fatharoni Adillah Rachman', date: 'January 2023',
  },
  {
    id: 2, title: 'ACA Cloud Computing Certification', issuer: 'Alibaba Cloud', category: 'Cloud',
    gradient: 'from-orange-500 to-red-500', icon: '☁️',
    issuerBg: '#ff6a00', issuerText: '#ffffff', accentColor: '#ff6a00',
    certLabel: 'Alibaba Cloud Certified Associate', recipientName: 'Fatharoni Adillah Rachman', date: 'March 2023',
  },
  {
    id: 3, title: 'Cloud Practitioner Essentials', issuer: 'Dicoding / AWS', category: 'Cloud',
    gradient: 'from-yellow-400 to-orange-500', icon: '☁️',
    issuerBg: '#146eb4', issuerText: '#ffffff', accentColor: '#ff9900',
    certLabel: 'Cloud Practitioner Essentials', recipientName: 'Fatharoni Adillah Rachman', date: 'April 2023',
  },
  {
    id: 4, title: 'Google Project Management', issuer: 'Google / Coursera', category: 'Management',
    gradient: 'from-blue-400 to-green-500', icon: '📊',
    issuerBg: '#ffffff', issuerText: '#4285f4', accentColor: '#34a853',
    certLabel: 'Professional Certificate — 7 Courses', recipientName: 'Fatharoni Rachman', date: 'October 2025',
  },
  {
    id: 5, title: 'Web Developer Certification', issuer: 'BPPTIK Kominfo', category: 'Web Dev',
    gradient: 'from-blue-500 to-purple-500', icon: '🌐',
    issuerBg: '#1d3557', issuerText: '#a8dadc', accentColor: '#e63946',
    certLabel: 'Sertifikat Kompetensi Web Developer', recipientName: 'Fatharoni Adillah Rachman', date: 'June 2022',
  },
  {
    id: 6, title: 'Belajar Dasar Pemrograman Web', issuer: 'Dicoding', category: 'Web Dev',
    gradient: 'from-green-400 to-teal-500', icon: '💻',
    issuerBg: '#1abc9c', issuerText: '#ffffff', accentColor: '#16a085',
    certLabel: 'Sertifikat Kelulusan', recipientName: 'Fatharoni Adillah Rachman', date: 'August 2022',
  },
  {
    id: 7, title: 'Aplikasi Backend untuk Pemula', issuer: 'Dicoding', category: 'Web Dev',
    gradient: 'from-purple-400 to-blue-500', icon: '⚙️',
    issuerBg: '#6c3483', issuerText: '#ffffff', accentColor: '#9b59b6',
    certLabel: 'Sertifikat Kelulusan', recipientName: 'Fatharoni Adillah Rachman', date: 'September 2022',
  },
  {
    id: 8, title: 'Dasar Pemrograman JavaScript', issuer: 'Dicoding', category: 'Web Dev',
    gradient: 'from-yellow-400 to-amber-500', icon: '📝',
    issuerBg: '#f39c12', issuerText: '#1a1a1a', accentColor: '#e67e22',
    certLabel: 'Sertifikat Kelulusan', recipientName: 'Fatharoni Adillah Rachman', date: 'July 2022',
  },
  {
    id: 9, title: 'Prinsip Pemrograman SOLID', issuer: 'Dicoding', category: 'Web Dev',
    gradient: 'from-indigo-400 to-blue-600', icon: '🔧',
    issuerBg: '#2c3e50', issuerText: '#3498db', accentColor: '#3498db',
    certLabel: 'Sertifikat Kelulusan', recipientName: 'Fatharoni Adillah Rachman', date: 'October 2022',
  },
  {
    id: 10, title: 'Python for Data Science', issuer: 'Cognitive Class (IBM)', category: 'Data',
    gradient: 'from-blue-400 to-cyan-500', icon: '🐍',
    issuerBg: '#054ada', issuerText: '#ffffff', accentColor: '#00bcd4',
    certLabel: 'Course Completion Certificate', recipientName: 'Fatharoni Adillah Rachman', date: 'May 2022',
  },
  {
    id: 11, title: 'Python for Data Professional', issuer: 'DQ Lab', category: 'Data',
    gradient: 'from-teal-400 to-blue-500', icon: '📈',
    issuerBg: '#009688', issuerText: '#ffffff', accentColor: '#4db6ac',
    certLabel: 'Sertifikat Kompetensi — Beginner', recipientName: 'Fatharoni Adillah Rachman', date: 'June 2022',
  },
  {
    id: 12, title: 'R Fundamental for Data Science', issuer: 'DQ Lab', category: 'Data',
    gradient: 'from-violet-400 to-purple-600', icon: '📊',
    issuerBg: '#7c3aed', issuerText: '#ffffff', accentColor: '#a78bfa',
    certLabel: 'Sertifikat Kompetensi — Fundamentals', recipientName: 'Fatharoni Adillah Rachman', date: 'July 2022',
  },
]
