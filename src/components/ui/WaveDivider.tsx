interface WaveDividerProps {
  fill?: string
  fromColor?: string
  flip?: boolean
}

export default function WaveDivider({ fill = '#F0E6D3', flip = false }: WaveDividerProps) {
  return (
    <div
      className="w-full overflow-hidden leading-none"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-20"
      >
        <path
          d="M0 40C180 80 360 0 540 40C720 80 900 0 1080 40C1260 80 1350 20 1440 40V80H0V40Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
