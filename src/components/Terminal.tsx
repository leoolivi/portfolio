import { useState, useRef, useEffect } from 'react'

const COMMANDS: Record<string, string[]> = {
  help:     ['available: whoami, skills, projects, status, mission, age, clear, exit'],
  whoami:   ['leonardo olivieri — backend developer, italy, 16yo, 4y coding'],
  skills:   ['java · spring boot · docker · nginx · react · typescript · postgresql · supabase'],
  projects: [
    '[live]    elcos italia',
    '[private] inventory manager',
    '[wip]     url shortener',
    '[soon]    chat app',
    '[soon]    video call app',
  ],
  status:   ['building: url-shortener · next: chat-app · goal: backend + devops mastery'],
  age:      ['16 years old. programming since 12. already shipping for real clients.'],
  mission:  ['go deep, not wide. backend + architecture + devops. build things that scale.'],
}

interface TerminalProps {
  onClose: () => void
}

export function Terminal({ onClose }: TerminalProps) {
  const [lines, setLines] = useState<string[]>([
    '// KONAMI CODE UNLOCKED — welcome to the terminal',
    '$ whoami',
    '> leonardo olivieri, 16yo backend dev',
    '$ _',
  ])
  const [input, setInput] = useState('')
  const endRef            = useRef<HTMLDivElement>(null)
  const inputRef          = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleCmd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !input.trim()) return

    const cmd = input.trim().toLowerCase()

    if (cmd === 'clear') {
      setLines(['// terminal cleared', '$ _'])
      setInput('')
      return
    }

    if (cmd === 'exit') {
      onClose()
      return
    }

    const res = COMMANDS[cmd] ?? [`command not found: ${cmd}. try 'help'`]
    setLines(l => [...l.slice(0, -1), `$ ${input}`, ...res.map(r => `> ${r}`), '$ _'])
    setInput('')
  }

  const lineColor = (l: string) => {
    if (l.startsWith('$'))  return 'var(--accent)'
    if (l.startsWith('>'))  return 'var(--fg)'
    if (l.startsWith('//')) return 'var(--fg-dim)'
    return 'var(--fg-dim)'
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#0a0a0a',
          border: '1px solid var(--accent)',
          width: '100%',
          maxWidth: 640,
          padding: 32,
          fontFamily: 'var(--mono)',
          fontSize: '0.75rem',
          lineHeight: 1.8,
          color: 'var(--fg)',
          maxHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* title bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
            color: 'var(--accent)',
          }}
        >
          <span>LO — TERMINAL v1.0</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              cursor: 'pointer',
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
            }}
          >
            ✕ close
          </button>
        </div>

        {/* output */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ color: lineColor(l) }}>
              {l}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* input */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginTop: 12,
            borderTop: '1px solid var(--border)',
            paddingTop: 12,
          }}
        >
          <span style={{ color: 'var(--accent)' }}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleCmd}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--fg)',
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
              flex: 1,
              cursor: 'text',
            }}
            placeholder="type 'help' for commands..."
          />
        </div>
      </div>
    </div>
  )
}
