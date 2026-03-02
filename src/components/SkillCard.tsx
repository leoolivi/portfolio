import { useState } from 'react'
import type { Skill } from '../types'

interface SkillCardProps extends Skill {
  delay: number
}

export function SkillCard({ category, comment, icon: Icon, items, delay }: SkillCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="reveal"
      style={{ transitionDelay: `${delay}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          padding: 40,
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
          background: hovered ? 'rgba(200,240,60,0.02)' : 'var(--bg2)',
          transition: 'border-color 0.3s, background 0.3s',
          height: '100%',
        }}
      >
        {/* header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 28,
          }}
        >
          <Icon size={14} color="var(--accent)" />
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}
          >
            {category}{' '}
            <span style={{ color: 'var(--fg-dim)' }}>{comment}</span>
          </span>
        </div>

        {/* items */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(item => (
            <li
              key={item}
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: '1.2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                color: hovered ? 'var(--fg)' : 'var(--fg-dim)',
                transition: 'color 0.2s',
              }}
            >
              <span
                style={{
                  width: hovered ? 24 : 16,
                  height: 1,
                  background: hovered ? 'var(--accent)' : 'var(--border)',
                  transition: 'width 0.3s, background 0.3s',
                  flexShrink: 0,
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
