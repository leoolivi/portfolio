import { NAV_ITEMS } from '../data'

interface NavProps {
  activeSection: string
  onHover: (h: boolean) => void
}

export function Nav({ activeSection, onHover }: NavProps) {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        background: 'rgba(8,8,8,0.85)',
      }}
    >
      <a
        href="#hero"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        style={{
          fontFamily: 'var(--display)',
          fontWeight: 900,
          fontSize: '1rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        LO — DEV
      </a>

      <div
        className="hide-mobile"
        style={{ display: 'flex', gap: 36 }}
      >
        {NAV_ITEMS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: activeSection === id ? 'var(--accent)' : 'var(--fg-dim)',
              transition: 'color 0.2s',
              position: 'relative',
            }}
          >
            {label}
            {activeSection === id && (
              <span
                style={{
                  position: 'absolute',
                  bottom: -4, left: 0, right: 0,
                  height: 1,
                  background: 'var(--accent)',
                }}
              />
            )}
          </a>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--mono)',
          fontSize: '0.58rem',
          color: 'var(--fg-dim)',
        }}
      >
        <div
          style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'pulse 2s infinite',
          }}
        />
        Available
      </div>
    </nav>
  )
}
