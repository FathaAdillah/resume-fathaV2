---
kind: error_handling
name: Error Handling in React Portfolio (Vite + React)
category: error_handling
scope:
    - '**'
source_files:
    - src/services/api.ts
    - src/store/authStore.ts
    - src/router/index.tsx
    - src/pages/LoginPage.tsx
---

This Vite + React portfolio application uses a lightweight, component-local error handling approach without a centralized error type system or dedicated error-handling library.

**HTTP / API errors**
- A single Axios instance (`src/services/api.ts`) is configured with request and response interceptors. The request interceptor injects a Bearer token from the Zustand auth store when present. The response interceptor checks for HTTP 401 responses: on 401 it calls `useAuthStore.getState().logout()` and redirects to `/login` via `window.location.href`, then re-throws the error as `Promise.reject(err)` so callers can still handle it if needed.
- There are no custom error classes or structured error payloads; errors are plain Axios error objects propagated through Promise rejection.

**Authentication & routing errors**
- Route protection is handled declaratively via a `ProtectedRoute` wrapper in `src/router/index.tsx`. If no token is present, it renders `<Navigate to="/login" replace />`. This is a soft guard rather than an explicit error — unauthorized access results in navigation, not thrown exceptions.
- The auth store (`src/store/authStore.ts`) exposes a simple `logout()` action that clears the persisted token; it is invoked by both the login flow and the 401 interceptor.

**UI-level errors**
- User-facing errors are managed locally with React `useState` strings. The login page (`src/pages/LoginPage.tsx`) maintains an `error` state initialized to `""`, resets it on submit, sets specific messages like `"Invalid email or password."` on validation failure, and falls back to `"Login failed. Please try again."` in the `catch` block. Errors are rendered conditionally inside a styled red alert box.
- No global error boundary, `componentDidCatch`, or `unhandledrejection` handler was found in the codebase.

**Conventions observed**
- Network errors are surfaced at the Axios interceptor level for auth-related cases (401) and otherwise left for callers to handle via `.catch()` or `try/catch`.
- UI errors use plain string state per component rather than a shared error model.
- There is no centralized logging, error reporting service, or typed error hierarchy.