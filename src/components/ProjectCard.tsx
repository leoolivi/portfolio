import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../types'
import { Badge } from './UI'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  const isSoon  = project.status === 'soon'
  const Icon    = project.icon
  const hasLink = !!project.url

  return (
    <div
      className="reveal"
      style={{ transitionDelay: `${index * 0.07}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={hasLink ? project.url! : '#'}
        target={hasLink ? '_blank' : '_self'}
        rel="noreferrer"
        onClick={e => { if (!hasLink) e.preventDefault() }}
        className="project-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '64px 1fr auto',
          alignItems: 'center',
          gap: '32px',
          padding: '28px 0',
          paddingLeft: hovered && !isSoon ? '20px' : '0',
          borderBottom: '1px solid var(--border)',
          textDecoration: 'none',
          color: 'inherit',
          position: 'relative',
          overflow: 'hidden',
          transition: 'padding-left 0.4s cubic-bezier(0.16,1,0.3,1)',
          opacity: isSoon ? 0.45 : 1,
          cursor: isSoon ? 'default' : 'pointer',
        }}
      >
        {/* accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: hovered && !isSoon ? '3px' : '0',
            background: 'var(--accent)',
            transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}
        />

        {/* num + icon */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              color: hovered && !isSoon ? 'var(--accent)' : 'var(--fg-dim)',
              transition: 'color 0.3s',
            }}
          >
            {project.id}
          </span>
          <Icon
            size={16}
            color={hovered && !isSoon ? 'var(--accent)' : 'var(--fg-dim)'}
            style={{ transition: 'color 0.3s' }}
          />
        </div>

        {/* info */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: 'clamp(20px, 2.5vw, 34px)',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                color: hovered && !isSoon ? 'var(--accent)' : 'var(--fg)',
                transition: 'color 0.3s',
              }}
            >
              {project.name}
            </span>
            <Badge status={project.status} />
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.5rem',
                color: 'var(--fg-dim)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {project.type}
            </span>
          </div>

          {/* expandable description */}
          <div
            style={{
              maxHeight: hovered && !isSoon ? '80px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s',
              opacity: hovered && !isSoon ? 1 : 0,
              marginTop: hovered && !isSoon ? 8 : 0,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: '0.82rem',
                color: 'var(--fg-dim)',
                lineHeight: 1.65,
                maxWidth: 520,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* tags */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              marginTop: 10,
              flexWrap: 'wrap',
            }}
          >
            {project.tags.map(t => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  border: '1px solid var(--border)',
                  color: 'var(--fg-dim)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* year + arrow */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 8,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              color: 'var(--fg-dim)',
            }}
          >
            {project.year}
          </span>
          {!isSoon && (
            <ArrowUpRight
              size={16}
              color={hovered ? 'var(--accent)' : 'var(--fg-dim)'}
              style={{
                transition: 'transform 0.3s, color 0.3s',
                transform: hovered ? 'translate(4px,-4px)' : 'none',
              }}
            />
          )}
        </div>
      </a>
    </div>
  )
}
