import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeading({
  title, subtitle, centered = true, light = false, className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && 'text-center', 'mb-12', className)}>
      <h2
        className={cn(
          'font-serif text-3xl sm:text-4xl font-bold mb-4',
          light ? 'text-white' : 'text-marina-navy'
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          'h-1 w-16 rounded-full mb-4',
          centered && 'mx-auto',
          'bg-marina-teal'
        )}
      />
      {subtitle && (
        <p
          className={cn(
            'text-lg max-w-2xl leading-relaxed',
            centered && 'mx-auto',
            light ? 'text-white/70' : 'text-marina-slate/70'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
