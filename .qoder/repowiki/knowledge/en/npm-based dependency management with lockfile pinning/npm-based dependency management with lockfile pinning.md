---
kind: dependency_management
name: npm-based dependency management with lockfile pinning
category: dependency_management
scope:
    - '**'
source_files:
    - package.json
    - package-lock.json
---

This Vite + React project manages third-party dependencies through npm, using `package.json` for declaration and `package-lock.json` (lockfileVersion 3) for deterministic resolution. Dependencies are split into two categories:

- **Runtime dependencies** (`dependencies`): React 19, react-dom, react-router-dom, axios, zustand, @tanstack/react-query, tailwindcss, @tailwindcss/vite, lucide-react, and @radix-ui/react-dialog.
- **Development dependencies** (`devDependencies`): TypeScript (~6.0.2), Vite (^8.0.12), ESLint ecosystem (@eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint), and type definitions for Node, React, and React-DOM.

Version ranges use caret (`^`) for most packages, allowing compatible minor/patch updates while keeping major versions stable. The `package-lock.json` file is committed to the repository, ensuring reproducible builds across environments by pinning exact transitive dependency versions.

No vendoring strategy is used — all packages are fetched from the public npm registry at install time. There is no `.npmrc` file, private registry configuration, or `node_modules` directory in version control. Build scripts are minimal: `dev`, `build` (runs `tsc -b` then `vite build`), `lint`, and `preview`. No automated dependency update tooling (like Dependabot, Renovate, or npm audit automation) is configured in the repository.