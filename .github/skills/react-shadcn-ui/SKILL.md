---
name: react-shadcn-ui
description: 'Development workflow using React with ShadCN/UI component library. Use when installing ShadCN, adding components, customizing themes, building forms, tables, dialogs, or any UI work using ShadCN primitives in this project. Includes setup, theming with brand colors, and usage patterns.'
argument-hint: 'What UI component or feature to build (e.g. "data table", "login form", "dialog modal")'
---

# React + ShadCN/UI Development

## Stack
- React 19 + TypeScript + Vite
- **ShadCN/UI** (Radix UI primitives + Tailwind CSS)
- Tailwind CSS v3+
- Brand: `#0c7a3d` (green), white dominant

---

## Initial Setup

### 1. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Install ShadCN
```bash
npx shadcn@latest init
```
Answer prompts:
- Style: **Default**
- Base color: **White**  
- CSS variables: **Yes**

### 3. Configure Brand Color in CSS Variables
```css
/* src/index.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 152 82% 26%;        /* rgb(12 122 61) */
    --primary-foreground: 0 0% 100%;
    --ring: 152 82% 26%;
  }
}
```

### 4. Update `tailwind.config.js`
```js
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(12 122 61)',
          light: 'rgb(16 163 81)',
          dark: 'rgb(8 82 41)',
          muted: 'rgb(12 122 61 / 0.1)',
        }
      }
    }
  }
}
```

---

## Adding Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add form
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add badge
npx shadcn@latest add toast
npx shadcn@latest add separator
npx shadcn@latest add avatar
npx shadcn@latest add sheet
```

All components land in `src/components/ui/`.

---

## Usage Patterns

### Button (primary brand color)
```tsx
import { Button } from '@/components/ui/button'

<Button className="bg-brand hover:bg-brand-dark text-white">
  Download CV
</Button>
```

### Card
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

<Card className="border-l-4 border-l-brand">
  <CardHeader><CardTitle>Web Developer</CardTitle></CardHeader>
  <CardContent>Pelindo Solusi Digital</CardContent>
</Card>
```

### Badge (skill tags)
```tsx
import { Badge } from '@/components/ui/badge'

<Badge variant="outline" className="border-brand text-brand">
  Laravel
</Badge>
```

### Form with React Hook Form + Zod
```bash
npm install react-hook-form zod @hookform/resolvers
```
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const schema = z.object({ email: z.string().email(), password: z.string().min(8) })

const LoginForm = () => {
  const form = useForm({ resolver: zodResolver(schema) })
  const onSubmit = (data: z.infer<typeof schema>) => { /* call API */ }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}
```

### Data Table
```bash
npx shadcn@latest add table
npm install @tanstack/react-table
```
```tsx
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
```

### Toast Notifications
```tsx
import { useToast } from '@/components/ui/use-toast'

const { toast } = useToast()
toast({ title: 'Saved!', description: 'Data berhasil disimpan.' })
```

---

## Theming Checklist

- [ ] `--primary` CSS var mapped to brand green
- [ ] `--ring` uses brand green (focus rings)
- [ ] Button default variant uses `bg-primary`
- [ ] Dark mode tokens defined if needed
- [ ] `cn()` utility from `@/lib/utils` used for conditional classes

---

## `cn()` Utility (required)
```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
```bash
npm install clsx tailwind-merge
```

---

## Common Patterns

### Conditional active state
```tsx
<Button className={cn('bg-white', isActive && 'bg-brand text-white')}>
  Nav Item
</Button>
```

### Responsive grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
</div>
```

---

## Anti-Patterns to Avoid

- Do NOT import raw Radix primitives; always use ShadCN wrappers
- Do NOT override `src/components/ui/` files manually — use `npx shadcn add` to regenerate
- Do NOT use inline styles when Tailwind + `cn()` is available
