---
kind: frontend_style
name: Tailwind CSS v4 Utility-First Styling
category: frontend_style
scope:
    - '**'
source_files:
    - src/index.css
    - vite.config.ts
    - package.json
---

The project uses Tailwind CSS v4 as its sole styling system, applied via the `@tailwindcss/vite` plugin integrated into Vite. All component styles are written inline using Tailwind utility classes directly in JSX `className` attributes — there is no custom CSS per component and no CSS-in-JS library. The global stylesheet (`src/index.css`) only imports Tailwind with `@import "tailwindcss"`, sets `scroll-behavior: smooth`, applies a universal `box-sizing: border-box`, defines the base font stack (`system-ui, Segoe UI, Roboto, sans-serif`), and sets the default white background with dark text. A small legacy `App.css` file remains for reference but is not imported by the application; it contains commented-out template styles that are explicitly noted as kept only for reference.

Design tokens are expressed through Tailwind's built-in color palette (e.g., `gray-950`, `blue-700`, `blue-50`) and spacing scale rather than CSS custom properties. Responsive design follows Tailwind's mobile-first breakpoint convention (e.g., `sm:px-6`, `lg:grid-cols-2`). Iconography comes from `lucide-react` components styled purely with Tailwind utilities. The Radix UI Dialog primitive (`@radix-ui/react-dialog`) is used for unstyled accessible primitives, with all visual styling provided by Tailwind classes within the local `Dialog.tsx` wrapper. No `tailwind.config.js` exists, so the project relies on Tailwind v4's default theme and configuration.