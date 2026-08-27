---
kind: external_dependency
name: Nginx Reverse Proxy Configuration
slug: nginx
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
source_files:
    - nginx/default.conf
---

Nginx configuration serves SPA with fallback to index.html for client-side routing. Includes aggressive static asset caching (1 year), security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy), and gzip compression for text-based assets.