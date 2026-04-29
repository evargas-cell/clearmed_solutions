import { useEffect, useRef, useState } from 'react'

export default function GlowCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -200, y: -200 })
  const lerped = useRef({ x: -200, y: -200 })
  const raf = useRef<number>(0)
  const [isPointer, setIsPointer] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
      const el = e.target as HTMLElement
      setIsPointer(!!el.closest('a, button, [role="button"], input, select, textarea, label, [tabindex]'))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const tick = () => {
      lerped.current.x += (pos.current.x - lerped.current.x) * 0.1
      lerped.current.y += (pos.current.y - lerped.current.y) * 0.1

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${lerped.current.x}px, ${lerped.current.y}px)`
      }

      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  if (isTouchDevice) return null

  const dotSize = isPointer ? 12 : 7
  const glowSize = isPointer ? 80 : 48

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Precise dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          marginLeft: `${-dotSize / 2}px`,
          marginTop: `${-dotSize / 2}px`,
          background: isPointer ? '#f4a500' : '#009fc1',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, background 0.2s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />

      {/* Glow blob */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          marginLeft: `${-glowSize / 2}px`,
          marginTop: `${-glowSize / 2}px`,
          background: isPointer
            ? 'radial-gradient(circle, rgba(244,165,0,0.28) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,159,193,0.22) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          filter: 'blur(6px)',
          transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), margin 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, background 0.25s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
