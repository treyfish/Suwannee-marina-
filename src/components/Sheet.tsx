'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  widthClass?: string
}

// Right side panel on desktop (≥1024px), bottom sheet on mobile.
export function Sheet({ open, onClose, title, description, children, widthClass }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60 fade-in"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={
          'absolute right-0 top-0 h-full w-full overflow-y-auto bg-[var(--color-bg)] border-l border-[var(--color-border-strong)] sheet-in-right ' +
          (widthClass ?? 'lg:w-[460px]') +
          ' lg:rounded-l-2xl ' +
          'max-lg:right-auto max-lg:bottom-0 max-lg:top-auto max-lg:h-[92dvh] max-lg:w-full max-lg:rounded-t-2xl max-lg:border-l-0 max-lg:border-t max-lg:sheet-in-bottom'
        }
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 px-6 py-5 backdrop-blur">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>
            ) : null}
          </div>
          <button onClick={onClose} className="icon-btn" aria-label="Close panel">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  )
}
