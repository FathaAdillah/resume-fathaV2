---
name: project-guide
description: 'Interactive guide for learning and navigating the resume-fathaV2 project. Use when the user wants to understand the project structure, architecture, tech stack, data flow, routing, or how components connect. Ideal for onboarding, code exploration, or answering "how does this work" questions about the codebase.'
argument-hint: 'What to learn (e.g. "architecture overview", "how admin works", "data flow", "section components")'
---

# Project Guide — resume-fathaV2

## Overview

A personal portfolio/resume web app built with **React 19 + TypeScript + Vite 8**.
Features a public landing page (resume sections) and a protected admin panel for managing content via API.

**Owner:** Fatharoni Adillah Rachman — Web Developer at Pelindo Solusi Digital

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19, Vite 8 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite` plugin) |
| Routing | React Router DOM v7 |
| State | Zustand v5 (auth only) |
| Data fetching | TanStack React Query v5, Axios |
| Icons | Lucide React |
| UI primitives | Radix UI (Dialog only) |
| Deployment | Docker (multi-stage), Nginx, `serve` on port 3003 |

---

## File Map

```
src/
├── main.tsx                  # Entry point: React root + QueryClientProvider
├── App.tsx                   # Landing page composition (all sections)
├── router/index.tsx          # React Router config: / , /login, /admin/*
├── data/resume.ts            # Single source of truth for all resume content
├── services/api.ts           # Axios instance with auth interceptor
├── store/authStore.ts        # Zustand store: token + logout (persisted to localStorage)
├── hooks/useInView.ts        # Intersection Observer hook for scroll animations
├── layouts/AdminLayout.tsx   # Admin shell: sidebar + topbar + Outlet
├── components/
│   ├── Navbar.tsx            # Sticky top nav with section links
│   ├── Footer.tsx            # Footer with social links
│   ├── FloatingScrollButton.tsx  # Scroll-to-top FAB
│   ├── ui/Dialog.tsx         # Reusable Radix Dialog wrapper
│   └── sections/             # One component per resume section
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ExperienceSection.tsx
│       ├── EducationSection.tsx
│       ├── KnowledgeSection.tsx
│       ├── SkillsSection.tsx
│       ├── ProjectsSection.tsx
│       ├── CertificationSection.tsx
│       └── OrganizationSection.tsx
└── pages/
    ├── LandingPage.tsx       # Wraps <App />
    ├── LoginPage.tsx         # Auth form → calls API → stores token
    └── admin/                # CRUD pages for dynamic content
        ├── DashboardPage.tsx
        ├── ExperiencePage.tsx
        ├── SkillsPage.tsx
        ├── ProjectsPage.tsx
        └── CertificationsPage.tsx
```

---

## Architecture

### Public Landing Page Flow

```
main.tsx
  → QueryClientProvider
    → AppRouter
      → LandingPage
        → App.tsx (composition root)
          → Navbar
          → HeroSection → AboutSection → ExperienceSection → ...
          → Footer + FloatingScrollButton
```

Each section component imports data directly from `src/data/resume.ts`.

### Admin Panel Flow

```
/login → LoginPage → POST /api/auth/login → store token in Zustand (localStorage)
/admin → ProtectedRoute (checks token) → AdminLayout
  → Outlet → DashboardPage | ExperiencePage | SkillsPage | ...
```

Admin pages use `api.ts` (Axios) + TanStack Query for CRUD operations against the backend API.

---

## Data Layer

### Static Data (`src/data/resume.ts`)

Single TypeScript file exporting typed constants:

| Export | Type | Used by |
|--------|------|---------|
| `profile` | object | HeroSection, Navbar, Footer |
| `bio` | string | AboutSection |
| `experiences` | `Experience[]` | ExperienceSection |
| `skills` | `Record<string, string[]>` | SkillsSection |
| `projects` | `Project[]` | ProjectsSection |
| `education` | array | EducationSection |
| `organizations` | array | OrganizationSection |
| `knowledge` | `string[]` | KnowledgeSection |
| `softSkills` | `string[]` | AboutSection |
| `certifications` | `Certification[]` | CertificationSection |

### Dynamic Data (API)

- Base URL: `VITE_API_URL` env var, defaults to `/api`
- Auth: Bearer token in `Authorization` header (auto-injected by interceptor)
- 401 response → auto-logout + redirect to `/login`

---

## Routing Table

| Path | Component | Auth |
|------|-----------|------|
| `/` | LandingPage | No |
| `/login` | LoginPage | No |
| `/admin` | AdminLayout → DashboardPage | Yes |
| `/admin/experience` | ExperiencePage | Yes |
| `/admin/skills` | SkillsPage | Yes |
| `/admin/projects` | ProjectsPage | Yes |
| `/admin/certifications` | CertificationsPage | Yes |

---

## Key Patterns

### Adding a New Section

1. Add data to `src/data/resume.ts` (export typed constant)
2. Create `src/components/sections/NewSection.tsx`
3. Import and add it to `src/App.tsx` in render order
4. (Optional) Add anchor link in `Navbar.tsx`

### Adding a New Admin Page

1. Create `src/pages/admin/NewPage.tsx`
2. Add route in `src/router/index.tsx` under `/admin` children
3. Add nav item to `navItems` array in `src/layouts/AdminLayout.tsx`
4. Use `api.ts` + `useQuery`/`useMutation` from TanStack Query

### Styling

- Tailwind v4 with CSS-first config (no `tailwind.config.js`)
- Use utility classes directly; no CSS modules
- Gradient cards are common: `from-blue-500 to-blue-700`

---

## Build & Deploy

```bash
npm run dev       # Vite dev server (HMR)
npm run build     # tsc + vite build → dist/
npm run preview   # preview production build
```

**Docker:**
```bash
docker compose up --build   # builds + serves on port 3003
```

The Dockerfile uses a multi-stage build: `node:20-alpine` for build, then `serve -s dist -l 3003` for production.

---

## Quick Reference

| Question | Answer |
|----------|--------|
| Where is resume content stored? | `src/data/resume.ts` |
| How is auth handled? | Zustand store + Axios interceptor + ProtectedRoute |
| What CSS framework? | Tailwind CSS v4 (Vite plugin) |
| How to add a section? | Data → Section component → App.tsx |
| How to add admin page? | Page → router → AdminLayout navItems |
| Production port? | 3003 |
| API base URL? | `VITE_API_URL` or `/api` |
