---
name: my-resume
description: 'Complete resume data and content for Fatharoni Adillah Rachman. Use when building landing page sections, populating resume data files, writing bio text, listing skills or certifications, creating experience cards, or any content that should accurately reflect the owner. Contains full CV data ready to use in code.'
argument-hint: 'Which section to get data for (e.g. "experience data", "skills list", "certifications", "all data as TypeScript")'
---

# Resume — Fatharoni Adillah Rachman

## Personal Info

```ts
export const profile = {
  name: 'Fatharoni Adillah Rachman',
  title: 'Web Developer',
  tagline: 'IT Professional focused on Project Management & Web-Based Application Development',
  email: 'fatha.adillah12@gmail.com',
  phone: '(62) 89 560 9674 762',
  location: 'Gresik, Indonesia, 61151',
  github: '',     // fill if available
  linkedin: '',   // fill if available
}
```

---

## Personal Profile (Bio)

> An IT professional with a focus on project management and web-based application development.
> Experienced in managing project planning, team coordination, and on-time delivery, as well as
> developing applications across various sectors using modern frameworks and API integrations.
> Supported by a solid understanding of cloud computing and relevant certifications, with a structured,
> efficient, and business-oriented approach to delivering optimal solutions.

---

## Work Experience

```ts
export const experiences = [
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
      'Receive feedback from users regarding program development.',
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
      'Creating visualizations for temperature and humidity sensors, as well as electric sensors, using Elastic.',
      'Maintaining devices both onsite and offsite.',
      'Controlling assets and inventory.',
      'Managing production and deployment.',
    ],
    achievements: [
      'Achieve the IT Support Performance target with a total of 85% on time SLA achievement.',
      'More than 90% of devices are always online within a month.',
    ],
  },
  {
    id: 4,
    company: 'PT. Bringin Inti Teknologi',
    role: 'IT Support',
    period: 'May 2021 – December 2021',
    current: false,
    bullets: [
      'Equipment maintenance, function tests, and documentation for equipment belonging to PT. Bank Rakyat Indonesia in all areas of the Regional Office of Surabaya.',
      'Antivirus installation, UPS installation, and employee operational equipment installation.',
      'Uploading the documentation database for each device in the regional unit.',
      'Coordinating urgent corrective maintenance ticketing in all areas of BRI Regional Office Surabaya.',
    ],
    achievements: [
      'Achieve project targets by completing the maintenance office of one district branch area within 1 month.',
    ],
  },
]
```

---

## Technical Skills

```ts
export const skills = {
  backend: ['PHP (Laravel)', 'React', 'REST API Development & Integration'],
  database: ['MySQL', 'PostgreSQL', 'Oracle SQL', 'NoSQL'],
  cloud: ['VPS', 'AWS', 'Alibaba Cloud', 'Docker'],
  tools: ['Git', 'GitHub', 'GitLab'],
  architecture: ['MVC', 'SDLC', 'Microservices (Basic)', 'RESTful API Architecture'],
}

export const hardSkills = [
  'Laravel (Backend Development)',
  'PHP', 'JavaScript', 'MySQL',
  'REST API Development & Integration (WHAPI, third-party services)',
  'Git Version Control (GitHub/GitLab)',
  'Docker & Containerization',
  'Cloud Deployment (VPS / Cloud Env / On-Premise)',
  'ERP System Development',
]

export const softSkills = [
  'Project Planning & Task Management',
  'Problem Solving & Analytical Thinking',
  'Communication with Technical & Non-Technical Teams',
  'Team Collaboration (Cross-functional teams)',
  'Time Management & Meeting Deadlines',
  'Adaptability to New Technologies',
  'Attention to Detail',
  'Responsibility & Ownership of Tasks',
]
```

---

## Projects & Domain Expertise

```ts
export const projects = [
  {
    id: 1,
    title: 'ERP System Development',
    domain: 'HCM, HRIS',
    description: 'Developed and maintained ERP HCM and E-Recruitment applications for Pelindo holding companies.',
    tags: ['Laravel', 'PHP', 'MySQL', 'REST API', 'ERP'],
  },
  {
    id: 2,
    title: 'E-Recruitment System',
    domain: 'HR Tech',
    description: 'Built E-Recruitment module integrated with MyPelindo Employee Administration services.',
    tags: ['React', 'Laravel', 'REST API'],
  },
  {
    id: 3,
    title: 'IoT Monitoring System',
    domain: 'IoT / Agriculture',
    description: 'Deployed and maintained IoT sensor infrastructure with MQTT protocol and Elastic visualizations for farm monitoring.',
    tags: ['IoT', 'MQTT', 'Elasticsearch', 'Docker'],
  },
  {
    id: 4,
    title: 'Enterprise System Integration',
    domain: 'System Integration',
    description: 'Integrated enterprise systems across Pelindo subholding companies, performing SIT, UAT, and data migration.',
    tags: ['ERP', 'Integration', 'Oracle SQL', 'PostgreSQL'],
  },
]
```

---

## Education

```ts
export const education = [
  {
    institution: 'Universitas Trunojoyo Madura',
    degree: 'Bachelor of Information System',
    period: '2017 – 2022',
    gpa: '3.33',
  },
  {
    institution: 'SMK Teknik PAL Surabaya',
    degree: 'Computer and Network Engineering',
    period: '2014 – 2017',
    score: '85/100',
  },
]
```

---

## Organizational Experience

```ts
export const organizations = [
  {
    org: 'UKMFT-ITC (Information Technology Center)',
    role: 'Chair of Executive Board',
    period: 'January 2021 – December 2021',
    institution: 'Universitas Trunojoyo Madura',
  },
  {
    org: 'UKMFT-ITC (Information Technology Center)',
    role: 'Head of Public Relation Division',
    period: 'January 2020 – December 2020',
    institution: 'Universitas Trunojoyo Madura',
  },
]
```

---

## Certifications

```ts
export const certifications = [
  { title: 'AWS Academy Cloud Foundations', issuer: 'AWS Academy', category: 'Cloud' },
  { title: 'ACA Cloud Computing Certification', issuer: 'Alibaba Cloud', category: 'Cloud' },
  { title: 'Cloud Practitioner Essentials', issuer: 'AWS (Dicoding)', category: 'Cloud' },
  { title: 'Google Project Management Specialization', issuer: 'Google', category: 'Management' },
  { title: 'Web Developer', issuer: 'BPPTIK', category: 'Web Dev' },
  { title: 'Belajar Dasar Pemrograman Web', issuer: 'Dicoding', category: 'Web Dev' },
  { title: 'Aplikasi Backend untuk Pemula', issuer: 'Dicoding', category: 'Web Dev' },
  { title: 'Dasar Pemrograman JavaScript', issuer: 'Dicoding', category: 'Web Dev' },
  { title: 'Prinsip Pemrograman SOLID', issuer: 'Dicoding', category: 'Web Dev' },
  { title: 'Python for Data Science', issuer: 'Cognitive Class', category: 'Data' },
  { title: 'Python for Data Professional (Beginner)', issuer: 'DQ Lab', category: 'Data' },
  { title: 'R Fundamental for Data Science', issuer: 'DQ Lab', category: 'Data' },
]
```

---

## Knowledge Areas

```ts
export const knowledge = [
  'Software Development Life Cycle (SDLC)',
  'Project Management (Agile & Waterfall)',
  'RESTful API Architecture & Integration',
  'Cloud Computing (deployment, scaling, monitoring)',
  'Database Design & Data Management',
  'System Integration & Automation',
  'Web Application Architecture (MVC, Microservices basic)',
]
```

---

## Landing Page Content Notes

- **Hero tagline:** "Building reliable web applications with a structured, business-oriented approach."
- **CTA primary:** "Download CV" → link to PDF
- **CTA secondary:** "View Projects" → scroll to #projects
- **Highlight stats** (hero section):
  - 4+ Years in IT Industry
  - 6 Pelindo Holding Companies Implemented
  - 12+ Certifications
- **Accent color** throughout: `rgb(12 122 61)` — used for borders, badges, buttons, timeline line
- **Font pairing suggestion:** Inter (body) + Poppins (headings)
