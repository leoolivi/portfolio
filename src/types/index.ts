import type { LucideIcon } from 'lucide-react'

export type ProjectStatus = 'live' | 'private' | 'wip' | 'soon'

export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  year: string
  type: string
  status: ProjectStatus
  url: string | null
  icon: LucideIcon
}

export interface Skill {
  category: string
  comment: string
  icon: LucideIcon
  items: string[]
}

export interface StatusConfig {
  label: string
  color: string
  bg: string
  icon: LucideIcon
}

export interface MousePosition {
  x: number
  y: number
}
