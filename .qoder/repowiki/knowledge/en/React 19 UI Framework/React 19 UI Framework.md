---
kind: external_dependency
name: React 19 UI Framework
slug: react
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
source_files:
    - src/main.tsx
    - src/App.tsx
    - package.json
---

React 19 is the core UI framework powering both the public landing page and the admin panel. Components are organized under src/components (sections, ui) and pages under src/pages. The app uses React Router v7 for client-side routing between LandingPage, LoginPage, and admin routes. Build pipeline runs through Vite with @vitejs/plugin-react.