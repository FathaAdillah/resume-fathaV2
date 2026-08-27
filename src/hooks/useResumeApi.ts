import { useQuery } from '@tanstack/react-query'
import api from '../services/api'
import type { Experience, Project, Certification } from '../data/resume'

// ─── Profile ──────────────────────────────────────────────────────────────
export interface ProfileData {
  id: number
  name: string
  title: string
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  credly: string
  bio: string
}

export function useProfile() {
  return useQuery<ProfileData>({
    queryKey: ['profile'],
    queryFn: () => api.get('/profile').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  })
}

// ─── Experiences ──────────────────────────────────────────────────────────
export function useExperiences() {
  return useQuery<Experience[]>({
    queryKey: ['experiences'],
    queryFn: () => api.get('/experiences').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  })
}

// ─── Skills (grouped) ─────────────────────────────────────────────────────
export function useSkills() {
  return useQuery<Record<string, string[]>>({
    queryKey: ['skills'],
    queryFn: () => api.get('/skills').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  })
}

// ─── Soft Skills ──────────────────────────────────────────────────────────
interface SoftSkillRow {
  id: number
  text: string
  sort_order: number
}

export function useSoftSkills() {
  return useQuery<string[]>({
    queryKey: ['softSkills'],
    queryFn: () =>
      api
        .get<SoftSkillRow[]>('/soft-skills')
        .then((r) => r.data.map((s) => s.text)),
    staleTime: 5 * 60 * 1000,
  })
}

// ─── Projects ─────────────────────────────────────────────────────────────
export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  })
}

// ─── Certifications ───────────────────────────────────────────────────────
interface CertRow {
  id: number
  title: string
  issuer: string
  category: string
  gradient: string
  icon: string
  issuer_bg: string
  issuer_text: string
  accent_color: string
  cert_label: string
  recipient_name: string
  date: string
  sort_order: number
}

function mapCert(row: CertRow): Certification {
  return {
    id: row.id,
    title: row.title,
    issuer: row.issuer,
    category: row.category,
    gradient: row.gradient,
    icon: row.icon,
    issuerBg: row.issuer_bg,
    issuerText: row.issuer_text,
    accentColor: row.accent_color,
    certLabel: row.cert_label,
    recipientName: row.recipient_name,
    date: row.date,
  }
}

export function useCertifications() {
  return useQuery<Certification[]>({
    queryKey: ['certifications'],
    queryFn: () =>
      api.get<CertRow[]>('/certifications').then((r) => r.data.map(mapCert)),
    staleTime: 5 * 60 * 1000,
  })
}

// ─── Education ────────────────────────────────────────────────────────────
export interface EducationItem {
  id: number
  institution: string
  degree: string
  period: string
  detail: string
  icon: string
  initials: string
  color: string
}

export function useEducation() {
  return useQuery<EducationItem[]>({
    queryKey: ['education'],
    queryFn: () => api.get('/education').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  })
}

// ─── Organizations ────────────────────────────────────────────────────────
export interface OrganizationItem {
  id: number
  name: string
  role: string
  period: string
  institution: string
  icon: string
  initials: string
  color: string
}

export function useOrganizations() {
  return useQuery<OrganizationItem[]>({
    queryKey: ['organizations'],
    queryFn: () => api.get('/organizations').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  })
}

// ─── Knowledge ────────────────────────────────────────────────────────────
interface KnowledgeRow {
  id: number
  text: string
  sort_order: number
}

export function useKnowledge() {
  return useQuery<string[]>({
    queryKey: ['knowledge'],
    queryFn: () =>
      api.get<KnowledgeRow[]>('/knowledge').then((r) => r.data.map((k) => k.text)),
    staleTime: 5 * 60 * 1000,
  })
}
