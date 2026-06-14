---
name: web-architecture
description: 'Understand the web architecture of this resume-fathaV2 project. Use when asking about how the app is structured, how routing works, how data flows from backend to frontend, how authentication is designed, how components communicate, or when making architectural decisions. Covers the full system design including frontend layers, backend API design, and deployment topology.'
argument-hint: 'What aspect to understand (e.g. "routing", "data flow", "auth flow", "component hierarchy")'
---

# Web Architecture — resume-fathaV2

## System Overview

```
┌─────────────────────────────────────────────────┐
│                  BROWSER                         │
│  ┌─────────────────────────────────────────┐    │
│  │         React SPA (Vite build)           │    │
│  │  ┌──────────┐   ┌─────────────────────┐ │    │
│  │  │ Public   │   │  Admin (Protected)  │ │    │
│  │  │ Landing  │   │  Dashboard + CRUD   │ │    │
│  │  └──────────┘   └─────────────────────┘ │    │
│  └─────────────────────────────────────────┘    │
│                      ▲ HTTP/JSON                 │
└──────────────────────┼──────────────────────────┘
                       │
        ┌──────────────▼──────────────┐
        │        REST API Backend      │
        │  Laravel / Node.js           │
        │  JWT Authentication          │
        │  CRUD Endpoints              │
        └──────────────┬──────────────┘
                       │
        ┌──────────────▼──────────────┐
        │           Database           │
        │  MySQL / PostgreSQL          │
        └─────────────────────────────┘
```

---

## Frontend Architecture Layers

```
┌─────────────────────────────────────────────────┐
│  PRESENTATION LAYER (JSX + Tailwind + ShadCN)    │
│  Pages, Sections, UI Components                  │
├─────────────────────────────────────────────────┤
│  STATE LAYER (Zustand + React Query)             │
│  Auth state, server-synced data, UI state        │
├─────────────────────────────────────────────────┤
│  SERVICE LAYER (Axios + API modules)             │
│  HTTP calls, request/response transformation     │
├─────────────────────────────────────────────────┤
│  ROUTING LAYER (React Router v6)                 │
│  Route definitions, guards, layouts             │
└─────────────────────────────────────────────────┘
```

---

## Routing Map

```
/                    → LandingPage (public)
  ├── #hero          → HeroSection
  ├── #about         → AboutSection
  ├── #experience    → ExperienceSection
  ├── #skills        → SkillsSection
  ├── #projects      → ProjectsSection
  ├── #education     → EducationSection
  ├── #certifications → CertificationSection
  └── #contact       → ContactSection

/login               → LoginPage (public)

/admin               → AdminLayout (requires JWT token)
  ├── /              → DashboardPage
  ├── /experience    → ExperiencePage (CRUD)
  ├── /skills        → SkillsPage (CRUD)
  ├── /certifications → CertificationsPage (CRUD)
  └── /projects      → ProjectsPage (CRUD)
```

---

## Data Flow

### Public Landing (Static / API-fetched)
```
Browser → LandingPage → useQuery(fetchProfile) → Axios GET /api/profile
                                                ← JSON response
                      ← React renders sections with data
```

### Admin CRUD (Authenticated)
```
Admin → Fills Form → Zod Validation → useMutation → Axios POST /api/experience
                                                   + Bearer JWT header
                                                   ← 201 Created
             ← React Query invalidates cache
             ← Table re-fetches updated list
```

### Auth Flow
```
LoginPage → Submit credentials → POST /api/auth/login
                               ← { token: "JWT..." }
           → Zustand.setToken(token) → persisted to localStorage
           → Navigate to /admin
           
On page reload:
Zustand reads token from localStorage → ProtectedRoute allows access

On 401 response:
Axios interceptor → Zustand.logout() → Navigate to /login
```

---

## Component Communication Patterns

| Scenario | Pattern |
|---------|---------|
| Parent → Child data | Props |
| Child → Parent action | Callback props |
| Sibling components | Lift state up / Zustand |
| Global auth state | Zustand `useAuthStore` |
| Server data cache | React Query `useQuery` / `useMutation` |
| UI-only state (open/close) | Local `useState` |

---

## Backend API Design

### Auth Endpoint
```
POST /api/auth/login
Body: { email, password }
Response: { token: string, admin: { name, email } }
```

### Resume Data Endpoints (CRUD)
```
GET    /api/profile
PUT    /api/profile          [AUTH]

GET    /api/experiences
POST   /api/experiences      [AUTH]
PUT    /api/experiences/:id  [AUTH]
DELETE /api/experiences/:id  [AUTH]

GET    /api/skills
POST   /api/skills           [AUTH]
PUT    /api/skills/:id       [AUTH]
DELETE /api/skills/:id       [AUTH]

GET    /api/certifications
POST   /api/certifications   [AUTH]
PUT    /api/certifications/:id [AUTH]
DELETE /api/certifications/:id [AUTH]

GET    /api/projects
POST   /api/projects         [AUTH]
PUT    /api/projects/:id     [AUTH]
DELETE /api/projects/:id     [AUTH]
```

---

## State Management Decision Tree

```
Is the data from an API?
  └─ Yes → React Query (useQuery / useMutation)
  └─ No → Is it shared across many components?
           └─ Yes → Zustand store
           └─ No  → Local useState
```

---

## Build & Deployment

```
Development:
  npm run dev      → Vite dev server (HMR)
  
Production build:
  npm run build    → TypeScript compile + Vite bundle → dist/
  
Deploy:
  dist/            → Nginx / Apache (static files)
  API backend      → separate server / same VPS
  
Environment:
  .env             → VITE_API_URL (injected at build time)
```

---

## Security Architecture

| Concern | Solution |
|---------|---------|
| Auth token | JWT, Zustand persist, Bearer header |
| Route protection | `<ProtectedRoute>` wrapper |
| Input validation | Zod schema on all forms |
| API errors | Axios interceptor handles 401 |
| Sensitive data | Never committed to git (.env in .gitignore) |
| XSS | React escapes JSX by default |
| CORS | Configured on API backend |

---

## Key Dependencies & Roles

| Package | Role |
|---------|------|
| `react-router-dom` | Client-side routing + guards |
| `zustand` | Auth state + global state |
| `@tanstack/react-query` | Server data fetching + caching |
| `axios` | HTTP client with interceptors |
| `react-hook-form` | Form state management |
| `zod` | Schema validation |
| `shadcn/ui` | UI component library |
| `tailwindcss` | Utility-first styling |
| `framer-motion` | Scroll animations |
