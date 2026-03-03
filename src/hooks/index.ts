import { useState, useEffect, useRef, useCallback } from 'react'
import type { MousePosition } from '../types'
import { KONAMI_CODE } from '../data'

// ── Mouse position with smooth ring lag ──────────────────────────────────────

export function useMousePosition() {
  const [pos, setPos]   = useState<MousePosition>({ x: -100, y: -100 })
  const [ring, setRing] = useState<MousePosition>({ x: -100, y: -100 })

  const ringRef   = useRef<MousePosition>({ x: -100, y: -100 })
  const targetRef = useRef<MousePosition>({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', onMove)

    let raf: number
    const animate = () => {
      const dx = targetRef.current.x - ringRef.current.x
      const dy = targetRef.current.y - ringRef.current.y
      
      // aggiorna solo se si è mosso abbastanza
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        ringRef.current.x += dx * 0.12
        ringRef.current.y += dy * 0.12
        setRing({ x: ringRef.current.x, y: ringRef.current.y })
      }
      
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return { pos, ring }
}

// ── Typewriter effect ────────────────────────────────────────────────────────

export function useTypewriter(
  words: string[],
  speed  = 80,
  pause  = 2200,
) {
  const [display,    setDisplay]    = useState('')
  const [wordIndex,  setWordIndex]  = useState(0)
  const [charIndex,  setCharIndex]  = useState(0)
  const [deleting,   setDeleting]   = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(c => c + 1), speed)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(c => c - 1), speed / 2)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setWordIndex(i => (i + 1) % words.length)
    }

    setDisplay(current.slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words, speed, pause])

  return display
}

// ── Live age counter ─────────────────────────────────────────────────────────

export function useLiveAge(birthDate: string) {
  const [age, setAge] = useState('')

  useEffect(() => {
    const calc = () => {
      const now   = new Date()
      const birth = new Date(birthDate)
      const diff  = now.getTime() - birth.getTime()

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
      const rem   = diff % (1000 * 60 * 60 * 24 * 365.25)
      const days  = Math.floor(rem / (1000 * 60 * 60 * 24))
      const hours = Math.floor((rem % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const mins  = Math.floor((rem % (1000 * 60 * 60)) / (1000 * 60))
      const secs  = Math.floor((rem % (1000 * 60)) / 1000)

      setAge(`${years}y ${days}d ${hours}h ${mins}m ${secs}s`)
    }

    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [birthDate])

  return age
}

// ── Scroll reveal ────────────────────────────────────────────────────────────

export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    console.log(els)

    const obs = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        }),
      { threshold: 0.08 },
    )

    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ── Konami code detector ─────────────────────────────────────────────────────

export function useKonami(callback: () => void) {
  const seq = useRef<string[]>([])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI_CODE.length)
      if (seq.current.join(',') === KONAMI_CODE.join(',')) callback()
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [callback])
}

// ── Active nav section ───────────────────────────────────────────────────────

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const handler = () => {
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [sectionIds])

  return active
}

// ── Delayed hint visibility ──────────────────────────────────────────────────

export function useDelayedHint(delayMs: number) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delayMs)
    return () => clearTimeout(t)
  }, [delayMs])

  return visible
}

// ── Hover state helper ───────────────────────────────────────────────────────

export function useHover() {
  const [hovered, setHovered] = useState(false)
  const bind = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }
  return { hovered, bind }
}

// ── Stable callback ──────────────────────────────────────────────────────────

export { useCallback }
