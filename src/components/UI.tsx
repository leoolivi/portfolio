import type { ProjectStatus } from '../types'
import { STATUS_CONFIG } from '../data'

// ── Badge ────────────────────────────────────────────────────────────────────

interface BadgeProps {
  status: ProjectStatus
}

export function Badge({ status }: BadgeProps) {
  const cfg  = STATUS_CONFIG[status]
  const Icon = cfg.icon

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 8px',
        border: `1px solid ${cfg.color}33`,
        background: cfg.bg,
        color: cfg.color,
        fontFamily: 'var(--mono)',
        fontSize: '0.5rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}
    >
      <Icon size={8} />
      {cfg.label}
    </span>
  )
}

// ── SectionHeader ────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  num: string
  title: string
}

export function SectionHeader({ num, title }: SectionHeaderProps) {
  return (
    <div
      className="reveal"
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 20,
        marginBottom: 64,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          color: 'var(--accent)',
          letterSpacing: '0.1em',
        }}
      >
        {num} /
      </span>
      <h2
        style={{
          fontFamily: 'var(--display)',
          fontWeight: 900,
          fontSize: 'clamp(36px, 5vw, 68px)',
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          flex: 1,
          height: 1,
          background: 'var(--border)',
          marginLeft: 16,
        }}
      />
    </div>
  )
}
