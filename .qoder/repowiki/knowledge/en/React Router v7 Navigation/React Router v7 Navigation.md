---
kind: external_dependency
name: React Router v7 Navigation
slug: react-router-dom
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
source_files:
    - package.json
    - src/router/index.tsx
---

React Router v7 handles client-side routing between public pages (LandingPage, LoginPage) and protected admin routes. Routes are defined in src/router/index.tsx with separate layouts for admin sections.