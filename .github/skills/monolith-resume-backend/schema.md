# Database Schema — resume_db

Run this SQL against a fresh MySQL database.

```sql
CREATE DATABASE IF NOT EXISTS resume_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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

INSERT INTO profile (name, title, email, phone, location, github, linkedin, credly, bio)
VALUES (
  'Fatharoni Adillah Rachman',
  'Web Developer',
  'fatha.adillah12@gmail.com',
  '(62) 89 560 9674 762',
  'Gresik, Indonesia, 61151',
  'https://github.com/FathaAdillah',
  'https://www.linkedin.com/in/fatha-adillah/',
  'https://www.credly.com/users/fatharoni-adillah-rachman',
  'An IT professional with a focus on project management and web-based application development. Experienced in managing project planning, team coordination, and on-time delivery, as well as developing applications across various sectors using modern frameworks and API integrations. Supported by a solid understanding of cloud computing and relevant certifications, with a structured, efficient, and business-oriented approach to delivering optimal solutions.'
);

-- ─── Experience ──────────────────────────────────────────────────────────────
CREATE TABLE experiences (
  id       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  company  VARCHAR(100) NOT NULL,
  role     VARCHAR(100) NOT NULL,
  period   VARCHAR(50)  NOT NULL,
  `current` BOOLEAN     NOT NULL DEFAULT FALSE,
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

-- ─── Projects ────────────────────────────────────────────────────────────────
CREATE TABLE projects (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  tags        JSON,            -- ["Laravel","PHP","MySQL"]
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

-- ─── Knowledge ───────────────────────────────────────────────────────────────
CREATE TABLE knowledge (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  text       VARCHAR(300) NOT NULL,
  sort_order INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB;

-- ─── Soft Skills ─────────────────────────────────────────────────────────────
CREATE TABLE soft_skills (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  text       VARCHAR(300) NOT NULL,
  sort_order INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB;
```

---

## Seed Data

After creating the schema, seed using data from `src/data/resume.ts`. Example for experiences:

```sql
INSERT INTO experiences (company, role, period, `current`, sort_order) VALUES
('Pelindo Solusi Digital', 'Web Developer', 'May 2025 – Present', TRUE, 1),
('Pelindo Solusi Digital', 'System Implementator', 'May 2023 – May 2025', FALSE, 2),
('PT. Pitik Digital Indonesia', 'IT Support IoT', 'September 2022 – April 2023', FALSE, 3),
('PT. Bringin Inti Teknologi', 'IT Support', 'May 2021 – December 2021', FALSE, 4);

-- Bullets for experience id=1
INSERT INTO experience_bullets (experience_id, text, sort_order) VALUES
(1, 'Develop and maintain ERP HCM and E-Recruitment applications across multiple business sectors.', 1),
(1, 'Design and implement RESTful APIs for seamless system integrations and data exchange.', 2),
(1, 'Integrate MyPelindo Employee Administration services via APIs for operational efficiency.', 3),
(1, 'Resolve user-reported issues and handle support tickets with timely and effective solutions.', 4),
(1, 'Collaborate with cross-functional teams using Agile Methodologies to ensure successful project delivery.', 5);

-- Achievements for experience id=1
INSERT INTO experience_achievements (experience_id, text, sort_order) VALUES
(1, 'Successfully delivered task projects with high reliability.', 1),
(1, 'Improved integration performance and optimized workflows.', 2);
```

Seed all other tables similarly from `src/data/resume.ts` data.

---

## Index Recommendations

Add indexes if data grows or queries need optimization:

```sql
CREATE INDEX idx_skills_category ON skills(category_id);
CREATE INDEX idx_project_images_project ON project_images(project_id);
CREATE INDEX idx_exp_bullets_exp ON experience_bullets(experience_id);
CREATE INDEX idx_exp_achievements_exp ON experience_achievements(experience_id);
```
