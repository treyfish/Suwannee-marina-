type Props = {
  size?: number
  className?: string
  showTrail?: boolean
  title?: string
}

// Paper airplane lifting off, leaving a trail of coins behind. The plane
// uses two opacities to suggest a folded crease without an extra background
// reference, so the mark works on any surface (incl. favicons).
export function BrandMark({ size = 32, className, showTrail = true, title }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {showTrail ? (
        <g fill="currentColor">
          <circle cx="3" cy="28.5" r="1" opacity="0.22" />
          <circle cx="6.6" cy="26.5" r="0.95" opacity="0.36" />
          <circle cx="10.2" cy="23.6" r="0.85" opacity="0.52" />
        </g>
      ) : null}

      {/* Lower flap — slightly dimmer to suggest the fold */}
      <path d="M 4 14 L 13 17 L 14 26 Z" fill="currentColor" opacity="0.55" />
      {/* Upper flap — full strength */}
      <path d="M 4 14 L 28 4 L 13 17 Z" fill="currentColor" />
    </svg>
  )
}
