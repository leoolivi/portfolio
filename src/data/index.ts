import {
  Globe,
  Database,
  Zap,
  MessageSquare,
  Video,
  Server,
  Monitor,
  Container,
  CheckCircle2,
  Lock,
  AlertCircle,
  Clock,
} from 'lucide-react'
import type { Project, Skill, StatusConfig, ProjectStatus } from '../types'

export const PROJECTS: Project[] = [
  {
    id: '001',
    name: 'ELCOS Italia',
    description:
      'Full corporate website built from scratch for a national renovation company. Custom design, PHP backend, zero frameworks — just clean hand-written code.',
    tags: ['HTML', 'CSS', 'JS', 'PHP'],
    year: '2024',
    type: 'Client Work',
    status: 'live',
    url: 'https://www.elcositalia.it',
    icon: Globe,
  },
  {
    id: '002',
    name: 'Inventory Manager',
    description:
      'Internal web app for warehouse and inventory management. I designed the full backend with Supabase Edge Functions and TypeScript integrations. Frontend scaffolded with AI assistance.',
    tags: ['React', 'TypeScript', 'Supabase', 'Edge Functions'],
    year: '2025',
    type: 'Client Work',
    status: 'private',
    url: null,
    icon: Database,
  },
  {
    id: '003',
    name: 'URL Shortener',
    description:
      'Project-based learning build going beyond the basics — rate limiting, redirect analytics, Dockerized deployment. The goal is a production-ready service, not a tutorial clone. Follow on my GitHub for the latest updates.',
    tags: ['Spring Boot', 'Java', 'Docker', 'PostgreSQL'],
    year: '2025',
    type: 'Personal',
    status: 'wip',
    url: null,
    icon: Zap,
  },
  {
    id: '004',
    name: 'Chat App',
    description:
      'Real-time messaging platform with WebSocket architecture. Focused on scalable backend design, message persistence, and low-latency delivery.',
    tags: ['Spring Boot', 'WebSocket', 'React', 'Docker'],
    year: '2025',
    type: 'Personal',
    status: 'soon',
    url: null,
    icon: MessageSquare,
  },
  {
    id: '005',
    name: 'Video Call App',
    description:
      'P2P video calling with WebRTC signaling server. Exploring STUN/TURN, media streams and the full networking stack behind real-time communication.',
    tags: ['WebRTC', 'Spring Boot', 'NGINX', 'Docker'],
    year: '2025',
    type: 'Personal',
    status: 'soon',
    url: null,
    icon: Video,
  },
]

export const SKILLS: Skill[] = [
  {
    category: 'Backend',
    comment: '// primary focus',
    icon: Server,
    items: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'System Design'],
  },
  {
    category: 'Frontend',
    comment: '// solid base',
    icon: Monitor,
    items: ['HTML / CSS / JS', 'React + Vite', 'React Native', 'TypeScript'],
  },
  {
    category: 'DevOps',
    comment: '// in progress',
    icon: Container,
    items: ['Docker', 'NGINX', 'GitHub Actions', 'Supabase', 'Linux'],
  },
]

export const STATUS_CONFIG: Record<ProjectStatus, StatusConfig> = {
  live: {
    label: 'Live',
    color: '#c8f03c',
    bg: 'rgba(200,240,60,0.1)',
    icon: CheckCircle2,
  },
  private: {
    label: 'Private',
    color: '#888',
    bg: 'rgba(136,136,136,0.1)',
    icon: Lock,
  },
  wip: {
    label: 'WIP',
    color: '#ffb400',
    bg: 'rgba(255,180,0,0.1)',
    icon: AlertCircle,
  },
  soon: {
    label: 'Soon',
    color: '#555',
    bg: 'rgba(80,80,80,0.1)',
    icon: Clock,
  },
}

export const ROLES: string[] = [
  'Backend Developer',
  'System Designer',
  'DevOps Learner',
  'Full Stack Builder',
]

export const KONAMI_CODE: string[] = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

// ⚠️  Change this to your real birth date
export const BIRTH_DATE = '2010-02-19'

export const NAV_ITEMS = [
  { id: 'projects', label: 'Work' },
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Stack' },
  { id: 'contact',  label: 'Contact' },
]
