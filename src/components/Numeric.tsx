'use client'

import { useEffect, useRef, useState } from 'react'
import { formatCurrency } from '@/lib/format'

type Props = {
  value: number
  className?: string
  whole?: boolean
  micro?: boolean
  duration?: number
  animate?: boolean
}

// Smoothly tweens between values so digits don't jump.
export function Numeric({
  value,
  className,
  whole,
  micro,
  duration = 600,
  animate = true,
}: Props) {
  const [display, setDisplay] = useState<number>(value)
  const fromRef = useRef<number>(value)
  const startRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!animate) {
      setDisplay(value)
      return
    }
    fromRef.current = display
    startRef.current = performance.now()
    const tick = (t: number) => {
      const elapsed = t - startRef.current
      const k = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - k, 3)
      const next = fromRef.current + (value - fromRef.current) * eased
      setDisplay(next)
      if (k < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, animate, duration])

  return (
    <span className={`tabular ${className ?? ''}`}>
      {formatCurrency(display, { whole, micro })}
    </span>
  )
}
