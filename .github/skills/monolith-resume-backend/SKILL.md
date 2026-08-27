---
name: monolith-resume-backend
description: 'Architecture blueprint for adding an Express.js monolith backend with MySQL to the resume-fathaV2 project. Covers backend folder structure, database schema, REST API endpoints, JWT auth (single hardcoded admin, no user management), and how the React frontend integrates with the backend. Use when building backend features, adding API routes, creating database migrations, connecting admin CRUD pages, or wiring the frontend to real API data.'
argument-hint: 'Which part to build (e.g. "database schema", "auth endpoint", "experience CRUD", "connect frontend to API")'
---

# Monolith Backend — resume-fathaV2

## Overview

Convert the React-only portfolio into a **full-stack monolith**:
- **Backend:** Express.js (Node.js) serving both API and static frontend build
- **Database:** MySQL via `mysql2` (raw queries, no ORM)
- **Auth:** JWT with a single hardcoded admin — no user table, no user management
- **Frontend:** Existing React/Vite app, served as static files by Express in production

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│  Express.js (single process, single port)           │
│                                                     │
│  GET  /          → serve dist/index.html (static)   │
│  GET  /assets/*  → serve dist/assets/* (static)     │
│  POST /api/auth/login  → JWT token                  │
│  GET/POST/PUT/DELETE /api/*  → REST API              │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  Middleware: authGuard (JWT verify)           │   │
│  │  Applied to: all /api/* except /api/auth/*   │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  MySQL (resume_db)                                   │
│  Tables: experiences, skills, skill_categories,     │
│          projects, project_images, certifications,  │
│          education, organizations, knowledge,       │
│          soft_skills, profile                        │
└─────────────────────────────────────────────────────┘
```

---

## Backend Folder Structure

Create a `server/` directory at project root:

```
server/
├── index.js              # Entry: Express app, middleware, routes, static serve
├── db.js                 # mysql2 connection pool (uses env vars)
├── middleware/
│   └── authGuard.js      # JWT verify middleware
├── routes/
│   ├── auth.js           # POST /api/auth/login
│   ├── experience.js     # CRUD /api/experiences
│   ├── skill.js          # CRUD /api/skills, /api/skill-categories
│   ├── project.js        # CRUD /api/projects
│   ├── certification.js  # CRUD /api/certifications
│   ├── education.js      # CRUD /api/education
│   ├── organization.js   # CRUD /api/organizations
│   ├── knowledge.js      # CRUD /api/knowledge
│   ├── softSkill.js      # CRUD /api/soft-skills
│   └── profile.js        # GET/PUT /api/profile (singleton)
└── migrations/
    └── 001_init.sql      # Full schema creation script
```

---

## Environment Variables

Add to `.env` (server root):

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=resume_db

# Auth
JWT_SECRET=change-this-to-a-random-string-at-least-32-chars
ADMIN_EMAIL=admin@fatha.dev
ADMIN_PASSWORD=admin123

# Server
PORT=3003
```

Use `dotenv` package to load them.

---

## Database Schema

Run `server/migrations/001_init.sql` against MySQL. See [schema.md](schema.md) for the full DDL.

**Key tables and relationships:**

| Table | Key columns | Notes |
|-------|------------|-------|
| `profile` | singleton row (id=1) | name, title, email, phone, location, github, linkedin, bio |
| `experiences` | id, company, role, period, current | Has child table `experience_bullets` and `experience_achievements` |
| `skill_categories` | id, name | e.g. "Backend Development", "Cloud & Deployment" |
| `skills` | id, category_id (FK), name | Belongs to a category |
| `projects` | id, title, description, gradient, icon | Has child table `project_images` |
| `project_images` | id, project_id (FK), gradient, label | Multiple images per project |
| `certifications` | id, title, issuer, category, gradient, icon, issuer_bg, issuer_text, accent_color, cert_label, recipient_name, date | Full styling fields |
| `education` | id, institution, degree, period, detail, icon, initials, color | |
| `organizations` | id, name, role, period, institution, icon, initials, color | |
| `knowledge` | id, text, sort_order | |
| `soft_skills` | id, text, sort_order | |

---

## Auth Flow

**No user table.** Single admin credentials from env vars.

```js
// server/routes/auth.js
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});
```

**authGuard middleware** (applied to all `/api/*` except `/api/auth/*`):

```js
// server/middleware/authGuard.js
module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

---

## REST API Endpoints

All protected endpoints require `Authorization: Bearer <token>`.

### Auth
| Method | Path | Auth | Body |
|--------|------|------|------|
| POST | `/api/auth/login` | No | `{ email, password }` → `{ token }` |

### Profile (singleton)
| Method | Path | Auth | Body |
|--------|------|------|------|
| GET | `/api/profile` | No | → profile object |
| PUT | `/api/profile` | Yes | `{ name, title, email, ... }` |

### Experiences
| Method | Path | Auth | Body |
|--------|------|------|------|
| GET | `/api/experiences` | No | → `[{ ...experience, bullets[], achievements[] }]` |
| GET | `/api/experiences/:id` | No | → single experience |
| POST | `/api/experiences` | Yes | `{ company, role, period, current, bullets[], achievements[] }` |
| PUT | `/api/experiences/:id` | Yes | same as POST |
| DELETE | `/api/experiences/:id` | Yes | |

### Skills
| Method | Path | Auth | Body |
|--------|------|------|------|
| GET | `/api/skills` | No | → `{ "Backend Development": ["PHP", ...] }` (grouped) |
| POST | `/api/skill-categories` | Yes | `{ name }` |
| POST | `/api/skills` | Yes | `{ category_id, name }` |
| PUT | `/api/skills/:id` | Yes | `{ name }` |
| DELETE | `/api/skills/:id` | Yes | |

### Projects
| Method | Path | Auth | Body |
|--------|------|------|------|
| GET | `/api/projects` | No | → `[{ ...project, images[] }]` |
| POST | `/api/projects` | Yes | `{ title, description, tags[], gradient, icon, images[] }` |
| PUT | `/api/projects/:id` | Yes | same as POST |
| DELETE | `/api/projects/:id` | Yes | |

### Certifications
| Method | Path | Auth | Body |
|--------|------|------|------|
| GET | `/api/certifications` | No | → `[{ ... }]` |
| POST | `/api/certifications` | Yes | full certification fields |
| PUT | `/api/certifications/:id` | Yes | same as POST |
| DELETE | `/api/certifications/:id` | Yes | |

### Education, Organizations, Knowledge, Soft Skills
Same CRUD pattern: `GET` (public), `POST/PUT/DELETE` (protected).

---

## Express Server Entry Point

```js
// server/index.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const authGuard = require('./middleware/authGuard');

const app = express();
app.use(express.json());

// Public API
app.use('/api/auth', require('./routes/auth'));

// Protected API
app.use('/api', authGuard, require('./routes/profile'));
app.use('/api', authGuard, require('./routes/experience'));
// ... register all routes

// Public read endpoints (no auth)
app.get('/api/experiences', require('./routes/experience').list);
app.get('/api/projects',    require('./routes/project').list);
// ... register public GETs separately

// Serve frontend (production)
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));

app.listen(process.env.PORT || 3003, () => {
  console.log(`Server running on port ${process.env.PORT || 3003}`);
});
```

---

## Frontend Integration Changes

### 1. Update `src/services/api.ts`

Change `baseURL` to use the same origin (already defaults to `/api`).

In dev mode, add a Vite proxy so `/api` calls reach Express:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: { '/api': 'http://localhost:3003' }
  }
});
```

### 2. Replace static imports with API calls

Current sections import from `src/data/resume.ts`. Replace with TanStack Query:

```tsx
// Before (static)
import { experiences } from '../data/resume';

// After (API)
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const { data: experiences = [] } = useQuery({
  queryKey: ['experiences'],
  queryFn: () => api.get('/experiences').then(r => r.data),
});
```

### 3. Wire admin CRUD pages

Each admin page (`ExperiencePage`, `SkillsPage`, etc.) should use:
- `useQuery` to fetch list
- `useMutation` for create/update/delete with `queryClient.invalidateQueries` on success
- Existing UI patterns (cards, buttons) already in place — add forms and edit dialogs

### 4. Update LoginPage

Replace the hardcoded check with a real API call (already has TODO comment):

```tsx
const res = await api.post('/auth/login', { email, password });
setToken(res.data.token);
navigate('/admin');
```

---

## Dev Workflow

**Two processes in development:**

```bash
# Terminal 1: Express server (port 3003)
node --watch server/index.js

# Terminal 2: Vite dev server (port 5173, proxies /api → 3003)
npm run dev
```

**Production:** Express serves both API and built frontend on a single port (3003).

---

## Migration from Static Data

1. Run `001_init.sql` to create tables
2. Run a seed script (or manually insert) using data from `src/data/resume.ts`
3. Verify `GET /api/experiences` etc. return correct data
4. Update section components to use `useQuery` instead of static imports
5. Keep `src/data/resume.ts` as a backup/reference until migration is complete

---

## Additional Resources

- Full database DDL: [schema.md](schema.md)
