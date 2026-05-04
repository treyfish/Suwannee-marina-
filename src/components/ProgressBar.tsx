'use client'

type Props = {
  percent: number
  className?: string
  height?: number
}

export function ProgressBar({ percent, className, height = 6 }: Props) {
  const clamped = Math.max(0, Math.min(100, percent))
  return (
    <div
      className={`relative w-full overflow-hidden rounded-full ${className ?? ''}`}
      style={{
        height,
        background: 'rgba(255,255,255,0.06)',
      }}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{
          width: `${clamped}%`,
          background:
            'linear-gradient(90deg, rgba(52,211,153,0.85), rgba(52,211,153,1))',
          boxShadow: clamped > 0 ? '0 0 12px rgba(52,211,153,0.25)' : 'none',
        }}
      />
    </div>
  )
}
