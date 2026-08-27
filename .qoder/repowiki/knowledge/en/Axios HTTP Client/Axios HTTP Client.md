---
kind: external_dependency
name: Axios HTTP Client
slug: axios
category: external_dependency
category_hints:
    - sdk_real_api
scope:
    - '**'
source_files:
    - src/services/api.ts
---

Axios is used as the HTTP client with baseURL from VITE_API_URL env var (defaults to '/api'). Request interceptor injects Authorization Bearer tokens from Zustand store; response interceptor handles 401 by clearing auth and redirecting to login.