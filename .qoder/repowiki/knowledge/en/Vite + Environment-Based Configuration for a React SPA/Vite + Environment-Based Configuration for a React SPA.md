---
kind: configuration_system
name: Vite + Environment-Based Configuration for a React SPA
category: configuration_system
scope:
    - '**'
source_files:
    - vite.config.ts
    - src/services/api.ts
    - Dockerfile
    - docker-compose.yml
    - nginx/default.conf
    - package.json
---

This repository uses a minimal, Vite-native configuration system with no dedicated config files (no .env, application.properties, or YAML/JSON config). Runtime and build-time configuration is handled through three mechanisms:

1. **Vite environment variables** — The only explicit runtime configuration is the API base URL, read via `import.meta.env.VITE_API_URL` in `src/services/api.ts`, which falls back to `/api`. Vite's convention requires any client-facing variable to be prefixed with `VITE_`; no `.env` file is present in the repo, so this value must be supplied at build time or via the hosting environment.

2. **Build-time configuration in `vite.config.ts`** — The Vite config is intentionally minimal: it enables the React plugin and Tailwind CSS (`@tailwindcss/vite`). There are no custom plugins, proxy settings, or external config loaders; all build behavior is controlled through this single file.

3. **Container and deployment configuration** — `Dockerfile` defines a two-stage Node 20 Alpine build that runs `npm run build` (which invokes `tsc -b && vite build` per `package.json`) and serves the resulting `dist/` directory with the `serve` package on port 3003. `docker-compose.yml` maps container port 3003 to host port 3000. An Nginx configuration (`nginx/default.conf`) provides production serving with SPA fallback (`try_files $uri $uri/ /index.html`), aggressive static asset caching (`expires 1y; immutable`), security headers, and gzip compression.

There is no runtime feature-flag system, no layered config merging, and no secrets management beyond what the hosting environment injects as environment variables. All application data (resume sections, skills, projects, etc.) is embedded directly in `src/data/resume.ts` rather than loaded from external configuration files.