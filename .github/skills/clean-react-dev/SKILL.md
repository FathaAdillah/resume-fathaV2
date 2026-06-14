---
name: clean-react-dev
description: 'Clean React development standards and best practices for this project. Use when setting up new components, structuring folders, managing state, handling side effects, or enforcing code quality in React + TypeScript + Vite projects. Covers naming conventions, folder structure, component patterns, custom hooks, performance, and ESLint rules.'
argument-hint: 'Describe what you want to build or fix (e.g. "create a reusable Button component", "refactor this file")'
---

# Clean React Development

## Stack
- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** (utility-first styling)
- **ShadCN/UI** (component library)
- Branding: white dominant, green accent `rgb(12 122 61)`

---

## Folder Structure

```
src/
├── assets/              # Static files: images, fonts, icons
├── components/          # Reusable UI components
│   └── ui/              # ShadCN auto-generated components
├── features/            # Feature-scoped modules
│   └── <feature>/
│       ├── components/  # Feature-specific components
│       ├── hooks/       # Feature-specific hooks
│       ├── services/    # API calls for this feature
│       └── types.ts     # Feature types
├── hooks/               # Global custom hooks
├── layouts/             # Page layout wrappers
├── lib/                 # Utility functions (cn, formatDate, etc.)
├── pages/               # Route-level page components
├── router/              # React Router config
├── services/            # Global API/axios setup
├── store/               # Global state (Zustand / Context)
├── styles/              # Global CSS overrides
└── types/               # Shared TypeScript types
```

---

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Component files | PascalCase | `HeroSection.tsx` |
| Hook files | camelCase with `use` prefix | `useScrollSpy.ts` |
| Utility files | camelCase | `formatDate.ts` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_ITEMS` |
| CSS classes | Tailwind utility-first | No custom CSS unless necessary |
| Route pages | PascalCase + `Page` suffix | `AboutPage.tsx` |

---

## Component Patterns

### Functional Components Only
```tsx
// ✅ Correct
const HeroSection = ({ title }: { title: string }) => {
  return <h1>{title}</h1>
}
export default HeroSection
```

### Props Interface (always explicit)
```tsx
interface CardProps {
  title: string
  description: string
  href?: string
}
const Card = ({ title, description, href }: CardProps) => { ... }
```

### Avoid prop drilling > 2 levels → use Context or Zustand

---

## State Management Rules

- **Local UI state** → `useState`
- **Side effects / data fetching** → `useEffect` or custom hook
- **Shared global state** → Zustand store (preferred over Context for complex state)
- **Server state / API data** → React Query (`@tanstack/react-query`)
- Never mutate state directly

---

## Custom Hooks Pattern

```tsx
// src/hooks/useResume.ts
const useResume = () => {
  const [data, setData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // fetch logic
  }, [])

  return { data, loading }
}
export default useResume
```

---

## Performance

- Use `React.memo` for expensive pure components
- Use `useCallback` for handlers passed as props
- Use `useMemo` for derived computations
- Lazy-load route pages: `const AboutPage = lazy(() => import('./pages/AboutPage'))`
- Always add `key` prop in lists (never use array index as key for dynamic lists)

---

## ESLint & Code Quality

- No `any` type — use `unknown` or specific types
- No unused variables or imports
- Max component size: ~200 lines; split if larger
- One component per file
- All `useEffect` deps must be exhaustive
- No inline styles — use Tailwind

---

## File Creation Checklist

Before creating a new file:
1. Does a similar component already exist? Reuse it.
2. Is this UI-only? → `components/`
3. Is this page-level? → `pages/`
4. Is this reusable logic? → `hooks/`
5. Is this API-related? → `services/`

---

## Import Order (enforced by ESLint)
```tsx
// 1. React & framework
import { useState, useEffect } from 'react'

// 2. Third-party libraries
import { Button } from '@/components/ui/button'

// 3. Internal modules (absolute @/ paths)
import { cn } from '@/lib/utils'

// 4. Relative imports
import './HeroSection.css'
```
