import type { MousePosition } from '../types'

interface CursorProps {
  pos: MousePosition
  ring: MousePosition
  hovering: boolean
}

export function Cursor({ pos, ring, hovering }: CursorProps) {
  return (
    <>
      {/* dot */}
      <div
        style={{
          position: 'fixed',
          width: hovering ? 6 : 10,
          height: hovering ? 6 : 10,
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 9997,
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.2s, height 0.2s',
          mixBlendMode: 'difference',
        }}
      />
      {/* ring */}
      <div
        style={{
          position: 'fixed',
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          borderRadius: '50%',
          border: '1px solid var(--accent)',
          pointerEvents: 'none',
          zIndex: 9996,
          left: ring.x,
          top: ring.y,
          transform: 'translate(-50%,-50%)',
          opacity: hovering ? 0.2 : 0.45,
          transition: 'width 0.3s, height 0.3s, opacity 0.3s',
        }}
      />
    </>
  )
}
