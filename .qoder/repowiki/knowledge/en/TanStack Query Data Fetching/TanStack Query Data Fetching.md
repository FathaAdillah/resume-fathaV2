---
kind: external_dependency
name: TanStack Query Data Fetching
slug: tanstack-query
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
source_files:
    - package.json
    - src/services/api.ts
---

@tanstack/react-query is included as a dependency alongside axios for API data fetching and caching. The api service is configured with axios interceptors for Bearer token injection and 401 auto-logout handling.