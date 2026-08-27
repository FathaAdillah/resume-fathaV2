---
kind: logging_system
name: No Dedicated Logging System
category: logging_system
scope:
    - '**'
source_files:
    - src/services/api.ts
    - package.json
---

This repository does not implement a dedicated logging system. There is no logging framework (e.g., Winston, Pino, loglevel), no centralized logger module, and no structured logging configuration. All output in the codebase relies on the browser's built-in `console` API, which is not used explicitly in the inspected files — error handling in the Axios interceptor (`src/services/api.ts`) silently redirects on 401 responses without emitting any logs. The project has no logging-related dependencies in `package.json`, no `log/` or `logging/` directories, and no environment variables for log levels or sinks. This is a client-side Vite + React portfolio application where runtime logging is neither configured nor required.