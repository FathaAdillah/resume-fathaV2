---
name: web-profile-resume
description: 'Build a personal web profile / resume portfolio site. Use when creating a landing page, portfolio, profile website, or online resume. Covers section layout, content structure, animations, responsive design, and best UX practices for personal branding. Designed for Fatharoni Adillah Rachman resume-fathaV2 project.'
argument-hint: 'Which section to build or improve (e.g. "hero section", "skills section", "contact form")'
---

# Web Profile / Resume Portfolio

## Project: resume-fathaV2
**Owner:** Fatharoni Adillah Rachman  
**Stack:** React 19 + TypeScript + Vite + Tailwind CSS + ShadCN/UI  
**Branding:** White dominant, green accent `rgb(12 122 61)` (`#0c7a3d`)

---

## Page Sections (Ordered)

### 1. Hero
- Full name + animated title
- Short bio / tagline
- CTA buttons: "Download CV" + "Contact Me"
- Profile photo (circular, green ring border)
- Social links: GitHub, LinkedIn, Email

### 2. About
- Personal profile paragraph
- Key strengths summary (3-4 icon+text cards)

### 3. Experience (Timeline)
- Chronological, newest first
- Each card: Company | Role | Period | Bullet achievements
- Green left-border timeline line

### 4. Skills
- Grouped: Backend, Database, Cloud, Tools, Architecture
- Use pill/badge style per skill
- Progress bars or icon grid

### 5. Projects / Domain Expertise
- ERP System (HCM, HRIS)
- E-Recruitment System
- IoT Monitoring System
- Enterprise System Integration

### 6. Education
- University + Vocational School
- GPA / Score visible

### 7. Certifications
- Badge list or carousel (12 certifications)
- Grouped by category: Cloud, Web Dev, Data

### 8. Contact
- Email, Phone, Location
- Contact form (optional) or direct links

---

## Layout Architecture

```
<RootLayout>
  <Navbar />          ← sticky, smooth scroll nav
  <main>
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <ProjectsSection />
    <EducationSection />
    <CertificationSection />
    <ContactSection />
  </main>
  <Footer />
</RootLayout>
```

---

## Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| Mobile < 768px | Single column, stacked |
| Tablet 768–1024px | 2-column grid for skills/certs |
| Desktop > 1024px | Full layout with side-by-side |

---

## Animation Guidelines

- Use `framer-motion` for section entrance animations
- Fade-in + slide-up on scroll (IntersectionObserver or `motion.div`)
- Stagger children in skill badges / cert list
- No auto-play videos or heavy parallax

---

## Color Tokens (Tailwind config)

```js
// tailwind.config.js
colors: {
  brand: {
    DEFAULT: 'rgb(12 122 61)',
    light: 'rgb(16 163 81)',
    dark: 'rgb(8 82 41)',
  }
}
```

---

## SEO & Meta

- `<title>Fatharoni Adillah Rachman – Web Developer</title>`
- Open Graph tags for social sharing
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Alt text on all images

---

## Component File Map

```
src/
├── pages/
│   └── LandingPage.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ExperienceSection.tsx
│       ├── SkillsSection.tsx
│       ├── ProjectsSection.tsx
│       ├── EducationSection.tsx
│       ├── CertificationSection.tsx
│       └── ContactSection.tsx
└── data/
    └── resume.ts       ← all static content from CV
```

---

## Data File Pattern

```ts
// src/data/resume.ts
export const profile = {
  name: 'Fatharoni Adillah Rachman',
  title: 'Web Developer',
  email: 'fatha.adillah12@gmail.com',
  phone: '(62) 89 560 9674 762',
  location: 'Gresik, Indonesia, 61151',
}

export const experiences = [
  {
    company: 'Pelindo Solusi Digital',
    role: 'Web Developer',
    period: 'May 2025 – Now',
    bullets: [...]
  },
  ...
]
// See my-resume skill for full data
```

---

## Build Steps

1. Set up folder structure per [clean-react-dev](../clean-react-dev/SKILL.md)
2. Install Tailwind + ShadCN per [react-shadcn-ui](../react-shadcn-ui/SKILL.md)
3. Create `src/data/resume.ts` from [my-resume](../my-resume/SKILL.md)
4. Build sections top-down: Hero → About → Experience → Skills → ...
5. Add scroll-based animations last
6. Test responsive on mobile, tablet, desktop
7. Validate SEO meta tags
