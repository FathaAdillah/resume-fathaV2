---
kind: external_dependency
name: Vite Build Tool
slug: vite
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
source_files:
    - package.json
    - Dockerfile
---

Vite 8 is the build tool and dev server. Scripts 'dev', 'build', and 'preview' drive development workflow. TypeScript compilation is delegated to tsc -b before vite build. Docker multi-stage build uses node:20-alpine to build static assets into dist/.