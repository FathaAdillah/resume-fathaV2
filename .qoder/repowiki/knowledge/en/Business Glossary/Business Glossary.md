---
kind: business_term
name: Business Glossary
category: business_term
scope:
    - '**'
---

### Resume Portfolio
- Definition：A personal portfolio website showcasing professional experience, skills, certifications, and projects for Fatharoni Adillah Rachman, built as a React single-page application with both public-facing and admin management interfaces.
- Aliases：resume site、portfolio app

### Admin Panel
- Definition：Protected section of the application providing CRUD management for resume content including experiences, projects, skills, and certifications. Requires authentication via Bearer token stored in Zustand.
- Aliases：admin dashboard、management interface

### Landing Page
- Definition：Public-facing homepage displaying profile information, work experience, education, skills, projects, and certifications without requiring authentication.
- Aliases：public page、home page

### Auth Store
- Definition：Global authentication state managed by Zustand that persists Bearer tokens in browser storage under key 'auth-storage'. Provides setToken and logout methods with automatic persistence.
- Aliases：authentication store、auth state

### API Service
- Definition：Centralized Axios instance configured with base URL from VITE_API_URL environment variable, request interceptor for Bearer token injection, and response interceptor for 401 unauthorized handling.
- Aliases：http client、axios instance

### Section Components
- Definition：Modular React components under src/components/sections/ that render specific resume sections: About, Experience, Education, Skills, Projects, Certifications, Knowledge, and Organization.
- Aliases：resume sections、display components

### Static Data Layer
- Definition：Centralized data file (src/data/resume.ts) containing all resume content including profile, bio, experiences, skills, projects, education, organizations, knowledge, soft skills, and certifications as TypeScript exports.
- Aliases：data layer、resume data、static content
