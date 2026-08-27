---
kind: build_system
name: Vite + Docker Build & Deployment Pipeline
category: build_system
scope:
    - '**'
source_files:
    - Dockerfile
    - docker-compose.yml
    - package.json
    - vite.config.ts
    - nginx/default.conf
    - .dockerignore
---

This project uses a Vite-based build pipeline for the React/TypeScript SPA, with Docker multi-stage builds and optional Nginx serving for production deployment.

**Build toolchain**
- Vite (v8) is the primary bundler and dev server, configured via `vite.config.ts` with the React plugin and Tailwind CSS (`@tailwindcss/vite`) enabled.
- TypeScript compilation is run before bundling through the `build` script: `tsc -b && vite build`, using the project's three tsconfig files (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`).
- Development (`npm run dev`) and preview (`npm run preview`) scripts are provided; linting runs via ESLint (`eslint .`).

**Docker multi-stage build**
- `Dockerfile` defines two stages on `node:20-alpine`: a `builder` stage that installs dependencies with `npm ci` and runs `npm run build`, then a minimal runtime stage that installs the `serve` package globally and serves the generated `dist/` directory on port 3003.
- `docker-compose.yml` builds the image from the repository root and maps container port 3003 to host port 3000, with `restart: unless-stopped` policy.
- `.dockerignore` is present to exclude unnecessary files from the build context.

**Nginx deployment configuration**
- `nginx/default.conf` provides a production-ready static site server: SPA fallback routing (`try_files $uri $uri/ /index.html`), aggressive caching of static assets (`expires 1y`, `immutable`), security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`), and gzip compression for common content types.

**Artifacts and output**
- The build produces a `dist/` directory containing the bundled SPA assets, which is what both the `serve` runtime and the Nginx configuration target.
- No Makefile or shell build scripts are present; all orchestration is done through npm scripts, Docker, and docker-compose.

**Constraints and conventions observed**
- Production images are built from Alpine-based Node 20 containers for minimal size.
- Dependency installation uses `npm ci` in CI/Docker contexts for deterministic installs.
- The SPA routing requires either the `serve` fallback behavior or explicit Nginx `try_files` rules to avoid 404s on client-side routes.