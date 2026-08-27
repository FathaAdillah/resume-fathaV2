-- ═══════════════════════════════════════════════════════════════════════════
-- resume_db — Full schema + seed data
-- Run: mysql -u root -p < server/migrations/001_init.sql
-- ═══════════════════════════════════════════════════════════════════════════

DROP DATABASE IF EXISTS resume_db;
CREATE DATABASE resume_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE resume_db;

-- ─── Profile (singleton — always 1 row, id=1) ──────────────────────────────
CREATE TABLE profile (
  id         TINYINT UNSIGNED PRIMARY KEY DEFAULT 1,
  name       VARCHAR(100) NOT NULL,
  title      VARCHAR(100) NOT NULL,
  email      VARCHAR(100) NOT NULL,
  phone      VARCHAR(50),
  location   VARCHAR(100),
  github     VARCHAR(255),
  linkedin   VARCHAR(255),
  credly     VARCHAR(255),
  bio        TEXT,
  CHECK (id = 1)
) ENGINE=InnoDB;

INSERT INTO profile (name, title, email, phone, location, github, linkedin, credly, bio) VALUES
('Fatharoni Adillah Rachman', 'Web Developer', 'fatha.adillah12@gmail.com',
 '(62) 89 560 9674 762', 'Gresik, Indonesia, 61151',
 'https://github.com/FathaAdillah', 'https://www.linkedin.com/in/fatha-adillah/',
 'https://www.credly.com/users/fatharoni-adillah-rachman',
 'An IT professional with a focus on project management and web-based application development. Experienced in managing project planning, team coordination, and on-time delivery, as well as developing applications across various sectors using modern frameworks and API integrations. Supported by a solid understanding of cloud computing and relevant certifications, with a structured, efficient, and business-oriented approach to delivering optimal solutions.');

-- ─── Experiences ─────────────────────────────────────────────────────────────
CREATE TABLE experiences (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  company    VARCHAR(100) NOT NULL,
  role       VARCHAR(100) NOT NULL,
  period     VARCHAR(50)  NOT NULL,
  `current`  BOOLEAN      NOT NULL DEFAULT FALSE,
  sort_order INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE experience_bullets (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  experience_id INT UNSIGNED NOT NULL,
  text          VARCHAR(500) NOT NULL,
  sort_order    INT UNSIGNED DEFAULT 0,
  FOREIGN KEY (experience_id) REFERENCES experiences(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE experience_achievements (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  experience_id INT UNSIGNED NOT NULL,
  text          VARCHAR(500) NOT NULL,
  sort_order    INT UNSIGNED DEFAULT 0,
  FOREIGN KEY (experience_id) REFERENCES experiences(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Seed experiences
INSERT INTO experiences (id, company, role, period, `current`, sort_order) VALUES
(1, 'Pelindo Solusi Digital', 'Web Developer', 'May 2025 – Present', TRUE, 1),
(2, 'Pelindo Solusi Digital', 'System Implementator', 'May 2023 – May 2025', FALSE, 2),
(3, 'PT. Pitik Digital Indonesia', 'IT Support IoT', 'September 2022 – April 2023', FALSE, 3),
(4, 'PT. Bringin Inti Teknologi', 'IT Support', 'May 2021 – December 2021', FALSE, 4);

-- Bullets for experience 1
INSERT INTO experience_bullets (experience_id, text, sort_order) VALUES
(1, 'Develop and maintain ERP HCM and E-Recruitment applications across multiple business sectors.', 1),
(1, 'Design and implement RESTful APIs for seamless system integrations and data exchange.', 2),
(1, 'Integrate MyPelindo Employee Administration services via APIs for operational efficiency.', 3),
(1, 'Resolve user-reported issues and handle support tickets with timely and effective solutions.', 4),
(1, 'Collaborate with cross-functional teams using Agile Methodologies to ensure successful project delivery.', 5);
-- Achievements for experience 1
INSERT INTO experience_achievements (experience_id, text, sort_order) VALUES
(1, 'Successfully delivered task projects with high reliability.', 1),
(1, 'Improved integration performance and optimized workflows.', 2);

-- Bullets for experience 2
INSERT INTO experience_bullets (experience_id, text, sort_order) VALUES
(2, 'Prepare enterprise master data Pelindo subholding for migration to database.', 1),
(2, 'Implementation of Enterprise Resource Planning (Centra Pelindo).', 2),
(2, 'Resolved user issues through application and database troubleshooting.', 3),
(2, 'Part of HCM Module (HRIS) of Centra Pelindo.', 4),
(2, 'Perform SIT and UAT in the process of implementing the application program to the Pelindo subholding company.', 5);
INSERT INTO experience_achievements (experience_id, text, sort_order) VALUES
(2, 'Implementation in 6 Pelindo holding companies in 2023.', 1),
(2, 'Carry out Managing Service with SLA predicate on time.', 2);

-- Bullets for experience 3
INSERT INTO experience_bullets (experience_id, text, sort_order) VALUES
(3, 'Deployment of sensors on the farm.', 1),
(3, 'Configuring the connection with coop ID to the server (MQTT).', 2),
(3, 'Creating visualizations for temperature and humidity sensors using Elastic.', 3),
(3, 'Maintaining devices both onsite and offsite.', 4),
(3, 'Controlling assets and inventory.', 5);
INSERT INTO experience_achievements (experience_id, text, sort_order) VALUES
(3, 'Achieved 85% on time SLA achievement.', 1),
(3, 'More than 90% of devices always online within a month.', 2);

-- Bullets for experience 4
INSERT INTO experience_bullets (experience_id, text, sort_order) VALUES
(4, 'Equipment maintenance, function tests, and documentation for PT. Bank Rakyat Indonesia in all areas of the Regional Office of Surabaya.', 1),
(4, 'Antivirus installation, UPS installation, and employee operational equipment installation.', 2),
(4, 'Coordinating urgent corrective maintenance ticketing in all areas of BRI Regional Office Surabaya.', 3);
INSERT INTO experience_achievements (experience_id, text, sort_order) VALUES
(4, 'Completed maintenance of one district branch area within 1 month.', 1);

-- ─── Skills ──────────────────────────────────────────────────────────────────
CREATE TABLE skill_categories (
  id   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE skills (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL,
  name        VARCHAR(100) NOT NULL,
  sort_order  INT UNSIGNED DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES skill_categories(id) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO skill_categories (id, name) VALUES
(1, 'Backend Development'), (2, 'Database Management'),
(3, 'Cloud & Deployment'), (4, 'Tools & Collaboration'), (5, 'Architecture');

INSERT INTO skills (category_id, name, sort_order) VALUES
(1, 'PHP (Laravel)', 1), (1, 'React', 2), (1, 'JavaScript', 3), (1, 'REST API Development', 4),
(2, 'MySQL', 1), (2, 'PostgreSQL', 2), (2, 'Oracle SQL', 3), (2, 'NoSQL', 4),
(3, 'VPS', 1), (3, 'AWS', 2), (3, 'Alibaba Cloud', 3), (3, 'Docker', 4),
(4, 'Git', 1), (4, 'GitHub', 2), (4, 'GitLab', 3),
(5, 'MVC', 1), (5, 'SDLC', 2), (5, 'Microservices', 3), (5, 'RESTful API', 4);

-- ─── Projects ────────────────────────────────────────────────────────────────
CREATE TABLE projects (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  tags        JSON,
  gradient    VARCHAR(100),
  icon        VARCHAR(10),
  sort_order  INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE project_images (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id INT UNSIGNED NOT NULL,
  gradient   VARCHAR(100) NOT NULL,
  label      VARCHAR(100) NOT NULL,
  sort_order INT UNSIGNED DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO projects (id, title, description, tags, gradient, icon, sort_order) VALUES
(1, 'ERP HCM Module',
 'Enterprise Resource Planning Human Capital Management system for Pelindo holding companies. Features employee data management, payroll integration, attendance tracking, and a comprehensive reporting dashboard.',
 '["Laravel","Oracle SQL","PHP","REST API"]', 'from-blue-500 to-blue-700', '🏢', 1),
(2, 'E-Recruitment System',
 'Digital recruitment platform for Pelindo with job posting management, applicant tracking, automated screening features, and integration with MyPelindo Employee Administration services.',
 '["Laravel","MySQL","React","REST API"]', 'from-cyan-500 to-blue-600', '👥', 2),
(3, 'IoT Farm Monitoring',
 'Real-time monitoring dashboard for agricultural IoT sensors. Tracks temperature, humidity, and electrical data using MQTT protocol with Elasticsearch visualizations and alerting.',
 '["IoT","MQTT","Elasticsearch","Node.js"]', 'from-teal-500 to-blue-600', '🌡️', 3),
(4, 'Centra Pelindo ERP',
 'Full-scale ERP implementation across 6 Pelindo holding companies. Managed system migration, enterprise master data preparation, SIT, and UAT processes ensuring smooth go-live.',
 '["ERP","Oracle SQL","PostgreSQL","System Integration"]', 'from-blue-600 to-violet-600', '⚙️', 4),
(5, 'API Integration Platform',
 'Middleware platform for integrating third-party services including WHAPI and MyPelindo services. Handles authentication, rate limiting, request transformation, and monitoring.',
 '["Laravel","REST API","Docker","MySQL"]', 'from-sky-500 to-blue-700', '🔗', 5),
(6, 'IT Asset Management',
 'Internal asset tracking and management system for BRI Regional Office Surabaya. Features inventory tracking, maintenance scheduling, ticketing system, and documentation management.',
 '["PHP","MySQL","Bootstrap","Git"]', 'from-blue-500 to-sky-600', '💻', 6);

INSERT INTO project_images (project_id, gradient, label, sort_order) VALUES
(1, 'from-blue-400 to-blue-600', 'Dashboard Overview', 1),
(1, 'from-blue-500 to-indigo-600', 'Employee Management', 2),
(1, 'from-indigo-400 to-blue-600', 'Reports & Analytics', 3),
(2, 'from-cyan-400 to-blue-500', 'Job Listing Page', 1),
(2, 'from-blue-400 to-cyan-600', 'Applicant Tracker', 2),
(2, 'from-sky-400 to-blue-600', 'Interview Schedule', 3),
(3, 'from-teal-400 to-blue-500', 'Sensor Dashboard', 1),
(3, 'from-green-400 to-teal-500', 'Temperature Trends', 2),
(3, 'from-blue-400 to-teal-600', 'Alert System', 3),
(4, 'from-blue-500 to-violet-500', 'Implementation Plan', 1),
(4, 'from-violet-400 to-blue-600', 'Data Migration', 2),
(4, 'from-blue-600 to-indigo-600', 'Go-Live Dashboard', 3),
(5, 'from-sky-400 to-blue-600', 'API Gateway', 1),
(5, 'from-blue-400 to-sky-600', 'Integration Map', 2),
(5, 'from-indigo-400 to-sky-500', 'Monitoring Panel', 3),
(6, 'from-blue-400 to-indigo-500', 'Asset Dashboard', 1),
(6, 'from-sky-400 to-blue-600', 'Maintenance Log', 2),
(6, 'from-blue-500 to-cyan-500', 'Inventory Report', 3);

-- ─── Certifications ──────────────────────────────────────────────────────────
CREATE TABLE certifications (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title           VARCHAR(200) NOT NULL,
  issuer          VARCHAR(100) NOT NULL,
  category        VARCHAR(50),
  gradient        VARCHAR(100),
  icon            VARCHAR(10),
  issuer_bg       VARCHAR(20),
  issuer_text     VARCHAR(20),
  accent_color    VARCHAR(20),
  cert_label      VARCHAR(200),
  recipient_name  VARCHAR(100),
  `date`          VARCHAR(50),
  sort_order      INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB;

INSERT INTO certifications (title, issuer, category, gradient, icon, issuer_bg, issuer_text, accent_color, cert_label, recipient_name, `date`, sort_order) VALUES
('AWS Academy Cloud Foundations','AWS Academy','Cloud','from-orange-400 to-amber-500','☁️','#232f3e','#ff9900','#ff9900','Cloud Computing Foundations','Fatharoni Adillah Rachman','January 2023',1),
('ACA Cloud Computing Certification','Alibaba Cloud','Cloud','from-orange-500 to-red-500','☁️','#ff6a00','#ffffff','#ff6a00','Alibaba Cloud Certified Associate','Fatharoni Adillah Rachman','March 2023',2),
('Cloud Practitioner Essentials','Dicoding / AWS','Cloud','from-yellow-400 to-orange-500','☁️','#146eb4','#ffffff','#ff9900','Cloud Practitioner Essentials','Fatharoni Adillah Rachman','April 2023',3),
('Google Project Management','Google / Coursera','Management','from-blue-400 to-green-500','📊','#ffffff','#4285f4','#34a853','Professional Certificate — 7 Courses','Fatharoni Rachman','October 2025',4),
('Web Developer Certification','BPPTIK Kominfo','Web Dev','from-blue-500 to-purple-500','🌐','#1d3557','#a8dadc','#e63946','Sertifikat Kompetensi Web Developer','Fatharoni Adillah Rachman','June 2022',5),
('Belajar Dasar Pemrograman Web','Dicoding','Web Dev','from-green-400 to-teal-500','💻','#1abc9c','#ffffff','#16a085','Sertifikat Kelulusan','Fatharoni Adillah Rachman','August 2022',6),
('Aplikasi Backend untuk Pemula','Dicoding','Web Dev','from-purple-400 to-blue-500','⚙️','#6c3483','#ffffff','#9b59b6','Sertifikat Kelulusan','Fatharoni Adillah Rachman','September 2022',7),
('Dasar Pemrograman JavaScript','Dicoding','Web Dev','from-yellow-400 to-amber-500','📝','#f39c12','#1a1a1a','#e67e22','Sertifikat Kelulusan','Fatharoni Adillah Rachman','July 2022',8),
('Prinsip Pemrograman SOLID','Dicoding','Web Dev','from-indigo-400 to-blue-600','🔧','#2c3e50','#3498db','#3498db','Sertifikat Kelulusan','Fatharoni Adillah Rachman','October 2022',9),
('Python for Data Science','Cognitive Class (IBM)','Data','from-blue-400 to-cyan-500','🐍','#054ada','#ffffff','#00bcd4','Course Completion Certificate','Fatharoni Adillah Rachman','May 2022',10),
('Python for Data Professional','DQ Lab','Data','from-teal-400 to-blue-500','📈','#009688','#ffffff','#4db6ac','Sertifikat Kompetensi — Beginner','Fatharoni Adillah Rachman','June 2022',11),
('R Fundamental for Data Science','DQ Lab','Data','from-violet-400 to-purple-600','📊','#7c3aed','#ffffff','#a78bfa','Sertifikat Kompetensi — Fundamentals','Fatharoni Adillah Rachman','July 2022',12);

-- ─── Education ───────────────────────────────────────────────────────────────
CREATE TABLE education (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  institution VARCHAR(200) NOT NULL,
  degree      VARCHAR(200) NOT NULL,
  period      VARCHAR(50),
  detail      VARCHAR(200),
  icon        VARCHAR(10),
  initials    VARCHAR(10),
  color       VARCHAR(100),
  sort_order  INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB;

INSERT INTO education (institution, degree, period, detail, icon, initials, color, sort_order) VALUES
('Universitas Trunojoyo Madura','Bachelor of Information System','2017 – 2022','GPA: 3.33','🎓','UTM','from-blue-500 to-blue-700',1),
('SMK Teknik PAL Surabaya','Computer and Network Engineering','2014 – 2017','Final Score: 85/100','🏫','PAL','from-sky-500 to-blue-600',2);

-- ─── Organizations ───────────────────────────────────────────────────────────
CREATE TABLE organizations (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  role        VARCHAR(200) NOT NULL,
  period      VARCHAR(50),
  institution VARCHAR(200),
  icon        VARCHAR(10),
  initials    VARCHAR(10),
  color       VARCHAR(100),
  sort_order  INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB;

INSERT INTO organizations (name, role, period, institution, icon, initials, color, sort_order) VALUES
('UKMFT-ITC (Information Technology Center)','Chair of Executive Board','January 2021 – December 2021','Universitas Trunojoyo Madura','👑','ITC','from-blue-600 to-indigo-600',1),
('UKMFT-ITC (Information Technology Center)','Head of Public Relation Division','January 2020 – December 2020','Universitas Trunojoyo Madura','📢','ITC','from-sky-500 to-blue-600',2);

-- ─── Knowledge ───────────────────────────────────────────────────────────────
CREATE TABLE knowledge (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  text       VARCHAR(300) NOT NULL,
  sort_order INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB;

INSERT INTO knowledge (text, sort_order) VALUES
('Software Development Life Cycle (SDLC)', 1),
('Project Management (Agile & Waterfall)', 2),
('RESTful API Architecture & Integration', 3),
('Cloud Computing (deployment, scaling, monitoring)', 4),
('Database Design & Data Management', 5),
('System Integration & Automation', 6),
('Web Application Architecture (MVC, Microservices)', 7);

-- ─── Soft Skills ─────────────────────────────────────────────────────────────
CREATE TABLE soft_skills (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  text       VARCHAR(300) NOT NULL,
  sort_order INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB;

INSERT INTO soft_skills (text, sort_order) VALUES
('Project Planning & Task Management', 1),
('Problem Solving & Analytical Thinking', 2),
('Communication with Technical & Non-Technical Teams', 3),
('Team Collaboration (Cross-functional)', 4),
('Time Management & Meeting Deadlines', 5),
('Adaptability to New Technologies', 6),
('Attention to Detail', 7),
('Responsibility & Ownership of Tasks', 8);

-- ─── Indexes ─────────────────────────────────────────────────────────────────
CREATE INDEX idx_skills_category ON skills(category_id);
CREATE INDEX idx_project_images_project ON project_images(project_id);
CREATE INDEX idx_exp_bullets_exp ON experience_bullets(experience_id);
CREATE INDEX idx_exp_achievements_exp ON experience_achievements(experience_id);
