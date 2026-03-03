import { useState, useCallback, lazy, Suspense } from 'react'
import {
  Github, Linkedin, Mail, ArrowUpRight,
  Code2, Clock, CheckCircle2, Terminal as TerminalIcon,
} from 'lucide-react'

import { Cursor }      from './components/Cursor'
import { Nav }         from './components/Nav'
import { ProjectCard } from './components/ProjectCard'
import { SkillCard }   from './components/SkillCard'
import { SectionHeader } from './components/UI'
import { Helmet } from 'react-helmet-async'

import {
  useMousePosition,
  useTypewriter,
  useLiveAge,
  useScrollReveal,
  useKonami,
  useActiveSection,
  useDelayedHint,
} from './hooks'

import { PROJECTS, SKILLS, ROLES, BIRTH_DATE, NAV_ITEMS } from './data'

export default function App() {
  const { pos, ring }         = useMousePosition()
  const [hovering, setHovering] = useState(false)
  const role                  = useTypewriter(ROLES, 75, 2200)
  const liveAge               = useLiveAge(BIRTH_DATE)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const konamiHint            = useDelayedHint(8000)
  const sectionIds            = NAV_ITEMS.map(n => n.id)
  const activeSection         = useActiveSection(['hero', ...sectionIds])

  useScrollReveal();

  const openTerminal = useCallback(() => setTerminalOpen(true), [])
  useKonami(openTerminal)

  const hoverOn  = () => setHovering(true)
  const hoverOff = () => setHovering(false)

  const Terminal = lazy(() => import('./components/Terminal').then(module => ({ default: module.Terminal })))
  
  return (
    <>
      <Helmet>
        <title>Leonardo Olivieri | Frontend Developer</title>
        <meta name="description" content="Sviluppatore React & TypeScript. Portfolio con progetti, skills e contatti." />
        
        {/* Open Graph / social sharing */}
        <meta property="og:title" content="Leonardo Olivieri — Portfolio" />
        <meta property="og:description" content="..." />
        <meta property="og:image" content="https://lolivieri.vercel.app/og-image.png" />
        <meta property="og:url" content="https://lolivieri.vercel.app/" />
        <meta name="twitter:card" content="https://lolivieri.vercel.app/og-image.png" />
        
        {/* Altri tag utili */}
        <meta name="keywords" content="react, backend, developer, portfolio, typescript, spring boot, java, docker, nginx, postgresql, supabase, edge functions" />
        <link rel="canonical" href="https://lolivieri.vercel.app/" />
      </Helmet>

      {/* ── Cursor ── */}
      <Cursor pos={pos} ring={ring} hovering={hovering} />

      {/* ── Konami hint ── */}
      {konamiHint && !terminalOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: 48,
            zIndex: 100,
            fontFamily: 'var(--mono)',
            fontSize: '0.55rem',
            color: 'var(--fg-dim)',
            letterSpacing: '0.1em',
            animation: 'slideIn 0.5s forwards',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <TerminalIcon size={10} color="var(--accent)" />
          <span>while(true) { '// keep scrolling' } </span>
        </div>
      )}

      {/* ── Terminal easter egg ── */}
      {terminalOpen && 
      <Suspense fallback={<div className="h-96" />}>
        <Terminal onClose={() => setTerminalOpen(false)} default={module => module.Terminal} />
      </Suspense>
      }

      {/* ── Nav ── */}
      <Nav activeSection={activeSection} onHover={setHovering} />

      {/* ════════════════════════════════ HERO ══════════════════════════════ */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 48px 80px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* bg ghost text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '-2%',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--display)',
            fontWeight: 900,
            fontSize: 'clamp(180px, 28vw, 400px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(232,228,220,0.03)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          LO
        </div>

        {/* tag line */}
        <div style={{ animation: 'fadeUp 0.8s 0.2s both' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 24,
            }}
          >
            <Code2 size={12} color="var(--accent)" />
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.62rem',
                color: 'var(--accent)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Full Stack Developer — Italy
            </span>
          </div>
        </div>

        {/* name */}
        <h1
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 900,
            fontSize: 'clamp(60px, 10vw, 136px)',
            lineHeight: 0.88,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            animation: 'fadeUp 0.8s 0.35s both',
          }}
        >
          Leonardo
          <br />
          <span style={{ WebkitTextStroke: '1px var(--fg)', color: 'transparent' }}>
            Olivieri
          </span>
          <br />
          <span style={{ color: 'var(--accent)' }}>Dev.</span>
        </h1>

        {/* sub row */}
        <div
          className="hero-sub"
          style={{
            marginTop: 36,
            display: 'flex',
            gap: 48,
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            animation: 'fadeUp 0.8s 0.5s both',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                color: 'var(--fg)',
                letterSpacing: '0.05em',
                minWidth: 240,
                height: 20,
              }}
            >
              {role}
              <span style={{ animation: 'blink 1s infinite', color: 'var(--accent)' }}>
                _
              </span>
            </div>
            <p
              style={{
                marginTop: 12,
                maxWidth: 360,
                fontSize: '0.9rem',
                lineHeight: 1.75,
                color: 'var(--fg-dim)',
              }}
            >
              Backend-focused builder. I write systems that{' '}
              <strong style={{ color: 'var(--fg)', fontWeight: 400 }}>
                actually scale
              </strong>
              , not just demos that look good.
            </p>
          </div>

          <div
            className="hero-cta"
            style={{
              marginLeft: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 12,
            }}
          >
            <a
              href="#projects"
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '13px 26px',
                background: 'var(--accent)',
                color: '#080808',
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                clipPath:
                  'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))',
                transition: 'gap 0.2s',
              }}
            >
              View Work <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* scroll hint */}
        <div
          style={{
            position: 'absolute',
            right: 48,
            bottom: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            animation: 'fadeUp 0.8s 1.2s both',
          }}
        >
          <div
            style={{
              width: 1,
              height: 48,
              background: 'var(--accent)',
              animation: 'lineGrow 2s 1.5s infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.55rem',
              color: 'var(--fg-dim)',
              letterSpacing: '0.15em',
              writingMode: 'vertical-rl',
            }}
          >
            scroll
          </span>
        </div>
      </section>

      {/* ════════════════════════════════ PROJECTS ═════════════════════════ */}
      <section id="projects" style={{ background: 'var(--bg)' }}>
        <SectionHeader num="01" title="Selected Work" />
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </section>

      {/* ════════════════════════════════ ABOUT ════════════════════════════ */}
      <section
        id="about"
        style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}
      >
        <SectionHeader num="02" title="About" />

        <div
          className="about-grid reveal"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}
        >
          {/* text */}
          <div>
            <p
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: 'clamp(26px, 3vw, 42px)',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: 28,
              }}
            >
              16 years old.
              <br />
              <span style={{ color: 'var(--accent)' }}>4 years</span> of code.
              <br />
              Already shipping.
            </p>
            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.8,
                color: 'var(--fg-dim)',
                marginBottom: 16,
              }}
            >
              I started at 12, broke a lot of things, and learned by building. After covering a
              lot of ground — frontend, scripting, small tools — I decided to go{' '}
              <strong style={{ color: 'var(--fg)', fontWeight: 400 }}>
                deep rather than wide
              </strong>
              .
            </p>
            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.8,
                color: 'var(--fg-dim)',
                marginBottom: 16,
              }}
            >
              I'm verticalizing on{' '}
              <strong style={{ color: 'var(--fg)', fontWeight: 400 }}>
                Spring Boot, Java, system design and architecture
              </strong>
              . DevOps is part of that story too — Docker, NGINX, GitHub Actions, everything
              that gets code from laptop to production.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--fg-dim)' }}>
              I've already delivered real work for a real client. I know how to take something
              from zero to shipped, not just from tutorial to GitHub.
            </p>
          </div>

          {/* stats */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { value: liveAge.split('y')[0],  label: 'Years old',                   sub: liveAge,              icon: Clock },
              { value: '4+',  label: 'Years programming',           sub: 'since age 12',       icon: Code2 },
              { value: '2',   label: 'Real clients, real products', sub: 'client work shipped', icon: CheckCircle2 },
            ].map(({ value, label, sub, icon: Icon }) => (
              <div key={label} style={{ padding: '28px 0', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <Icon size={12} color="var(--accent)" />
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.58rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--fg-dim)',
                    }}
                  >
                    {label}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 900,
                    fontSize: '3.5rem',
                    lineHeight: 1,
                    color: 'var(--fg)',
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.58rem',
                    color: sub === liveAge ? 'var(--accent)' : 'var(--fg-dim)',
                    marginTop: 6,
                    letterSpacing: '0.05em',
                  }}
                >
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ SKILLS ═══════════════════════════ */}
      <section
        id="skills"
        style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      >
        <SectionHeader num="03" title="Stack" />
        <div
          className="skills-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}
        >
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.category} {...skill} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════ CONTACT ══════════════════════════ */}
      <section
        id="contact"
        style={{
          background: 'var(--bg2)',
          borderTop: '1px solid var(--border)',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <SectionHeader num="04" title="Contact" />

        <div className="reveal">
          <div
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 900,
              fontSize: 'clamp(52px, 9vw, 128px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
              marginBottom: 48,
            }}
          >
            Let's build
            <br />
            <span style={{ WebkitTextStroke: '1px var(--fg)', color: 'transparent' }}>
              something
            </span>
            <br />
            <span style={{ color: 'var(--accent)' }}>real.</span>
          </div>

          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { href: 'mailto:leolivieri1910@gmail.com', label: 'leolivieri1910@gmail.com', icon: Mail },
              { href: 'https://github.com/leoolivi',           label: 'GitHub',                icon: Github },
              { href: 'https://linkedin.com',         label: 'LinkedIn',              icon: Linkedin },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: 'var(--mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-dim)',
                  paddingBottom: 6,
                  borderBottom: '1px solid var(--border)',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseOver={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'
                }}
                onMouseOut={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-dim)'
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'
                }}
              >
                <Icon size={13} />
                {label}
                <ArrowUpRight size={11} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: '28px 48px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.1em',
          color: 'var(--fg-dim)',
        }}
      >
        <span>© 2025 — Leonardo Olivieri</span>

        <button
          onClick={() => setTerminalOpen(true)}
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: 'var(--fg-dim)',
            fontFamily: 'var(--mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.1em',
            transition: 'color 0.2s',
          }}
          onMouseOver={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)')}
          onMouseOut={e  => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-dim)')}
        >
          <TerminalIcon size={11} />
          terminal
        </button>

        <span>Built with intention.</span>
      </footer>
    </>
  )
}
