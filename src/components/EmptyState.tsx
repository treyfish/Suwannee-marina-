'use client'

import { Plus, Sparkles } from 'lucide-react'

type Props = {
  onAdd: () => void
  onDemo: () => void
}

export function EmptyState({ onAdd, onDemo }: Props) {
  return (
    <div className="surface flex flex-col items-center justify-center gap-6 px-8 py-16 text-center fade-up">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: 'var(--color-accent-soft)',
          color: 'var(--color-accent)',
        }}
      >
        <Sparkles size={22} />
      </div>
      <div className="max-w-md">
        <h2 className="text-xl font-semibold tracking-tight">Clear runway, ahead.</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Add your debts to start watching the interest tick — and the balance fall.
          Everything stays on this device until you say otherwise.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button onClick={onAdd} className="btn btn-primary">
          <Plus size={16} /> Add your first debt
        </button>
        <button onClick={onDemo} className="btn btn-ghost">
          Try with sample data
        </button>
      </div>
    </div>
  )
}
