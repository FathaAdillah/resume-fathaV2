---
name: fullstack-react-admin
description: 'Fullstack React application with admin dashboard, login page, and CRUD features. Use when building admin panel, protected routes, authentication flow, data management tables, or REST API integration in this project. No user management — admin only. Covers frontend React + backend API setup, JWT auth, protected routes, and CRUD patterns.'
argument-hint: 'Which feature to build (e.g. "login page", "admin dashboard", "CRUD certifications", "protected routes")'
---

# Fullstack React Admin

## Architecture Overview

```
Frontend (React + Vite)          Backend (Laravel API / Node.js)
┌──────────────────────┐         ┌────────────────────────────┐
│  Landing Page        │         │  POST /api/auth/login       │
│  Login Page          │◄───────►│  GET  /api/profile          │
│  Admin Dashboard     │  REST   │  GET/POST/PUT/DELETE        │
│  CRUD Modules        │  JSON   │  /api/experiences           │
│  Protected Routes    │         │  /api/skills                │
└──────────────────────┘         │  /api/certifications        │
                                 │  /api/projects              │
                                 └────────────────────────────┘
```

**No user management** — single admin account, JWT-based auth.

---

## Frontend Folder Structure

```
src/
├── pages/
│   ├── LandingPage.tsx          ← public
│   ├── LoginPage.tsx            ← public
│   └── admin/
│       ├── DashboardPage.tsx
│       ├── ExperiencePage.tsx
│       ├── SkillsPage.tsx
│       ├── CertificationsPage.tsx
│       └── ProjectsPage.tsx
├── layouts/
│   ├── PublicLayout.tsx         ← Navbar + Footer
│   └── AdminLayout.tsx          ← Sidebar + TopBar
├── router/
│   └── index.tsx                ← route definitions + guards
├── features/
│   └── auth/
│       ├── LoginForm.tsx
│       ├── useAuth.ts
│       └── authStore.ts
├── services/
│   ├── api.ts                   ← axios instance
│   └── endpoints/
│       ├── auth.ts
│       ├── experience.ts
│       └── skills.ts
└── store/
    └── authStore.ts             ← Zustand
```

---

## Router Setup (React Router v6)

```bash
npm install react-router-dom
```

```tsx
// src/router/index.tsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore()
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/admin',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'experience', element: <ExperiencePage /> },
      { path: 'skills', element: <SkillsPage /> },
      { path: 'certifications', element: <CertificationsPage /> },
      { path: 'projects', element: <ProjectsPage /> },
    ]
  }
])

export const AppRouter = () => <RouterProvider router={router} />
```

---

## Auth Store (Zustand)

```bash
npm install zustand
```

```ts
// src/store/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    { name: 'auth-storage' }
  )
)
```

---

## Axios API Setup

```ts
// src/services/api.ts
import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
```

---

## Login Page

```tsx
// src/pages/LoginPage.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import api from '@/services/api'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const LoginPage = () => {
  const { setToken } = useAuthStore()
  const navigate = useNavigate()
  const form = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const res = await api.post('/auth/login', data)
    setToken(res.data.token)
    navigate('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-full max-w-md p-8 shadow-lg border-t-4 border-t-brand">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-brand">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form fields here */}
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## Admin Layout (Sidebar)

```tsx
// src/layouts/AdminLayout.tsx
const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Skills', href: '/admin/skills', icon: Code2 },
  { label: 'Certifications', href: '/admin/certifications', icon: Award },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
]
```

Sidebar: white bg, active item `bg-brand text-white`, hover `bg-brand/10 text-brand`.

---

## Generic CRUD Pattern

### List Page with Data Table
```tsx
const ExperiencePage = () => {
  const { data, isLoading } = useQuery({ queryKey: ['experience'], queryFn: fetchExperience })

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Experience</h1>
        <Button onClick={() => setOpenDialog(true)}>+ Add</Button>
      </div>
      <DataTable columns={columns} data={data ?? []} />
      <ExperienceDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  )
}
```

### Create / Edit Dialog
```tsx
const ExperienceDialog = ({ open, onClose, editData }) => {
  const mutation = useMutation({ mutationFn: editData ? updateExperience : createExperience })
  // form + submit
}
```

### Delete with Confirmation
```tsx
<AlertDialog>
  <AlertDialogTrigger><Button variant="destructive">Delete</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogDescription>Yakin ingin menghapus?</AlertDialogDescription>
    <AlertDialogAction onClick={() => mutation.mutate(id)}>Delete</AlertDialogAction>
  </AlertDialogContent>
</AlertDialog>
```

---

## React Query Setup

```bash
npm install @tanstack/react-query
```

```tsx
// src/main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <AppRouter />
  </QueryClientProvider>
)
```

---

## Environment Variables

```env
# .env
VITE_API_URL=http://localhost:8000/api
```

Never commit `.env` — always use `.env.example`.

---

## Security Checklist

- [ ] JWT stored in Zustand with `persist` (localStorage) — acceptable for admin-only app
- [ ] All admin routes wrapped in `<ProtectedRoute>`
- [ ] API calls use Bearer token header
- [ ] 401 interceptor auto-redirects to `/login`
- [ ] Form inputs validated with Zod before API calls
- [ ] No hardcoded credentials
- [ ] HTTPS in production
