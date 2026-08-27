---
kind: external_dependency
name: Docker Containerization
slug: docker
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
source_files:
    - Dockerfile
    - docker-compose.yml
---

Multi-stage Docker build using node:20-alpine. Stage 1 builds the React app with npm ci and npm run build. Stage 2 serves static files using 'serve' package on port 3003. Docker Compose maps container port 3000 to host port 3000.