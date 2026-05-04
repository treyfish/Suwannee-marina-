'use client'

import { useMemo, useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import type { Debt } from '@/lib/types'
import { liveBalance } from '@/lib/finance'
import { formatCurrency } from '@/lib/format'
import { useNow } from '@/hooks/useNow'

type Props = {
  debts: Debt[]
  onPay: (debtId: string, amount: number, kind: 'minimum' | 'custom') => void
  onDone: () => void
}

type RowState = {
  status: 'pending' | 'paid' | 'skipped'
  customMode: boolean
  customValue: string
  appliedAmount?: number
}

const initialRow = (): RowState => ({
  status: 'pending',
  customMode: false,
  customValue: '',
})

export function QuickUpdate({ debts, onPay, onDone }: Props) {
  const now = useNow(2000)
  const [rows, setRows] = useState<Record<string, RowState>>(() =>
    Object.fromEntries(debts.map(d => [d.id, initialRow()]))
  )

  const total = useMemo(
    () => debts.reduce((s, d) => s + liveBalance(d, now), 0),
    [debts, now]
  )
  const paidCount = Object.values(rows).filter(r => r.status === 'paid').length
  const decidedCount = Object.values(rows).filter(r => r.status !== 'pending').length

  const setRow = (id: string, patch: Partial<RowState>) =>
    setRows(s => ({ ...s, [id]: { ...s[id], ...patch } }))

  const payMinimum = (debt: Debt) => {
    onPay(debt.id, debt.minimumPayment, 'minimum')
    setRow(debt.id, { status: 'paid', appliedAmount: debt.minimumPayment, customMode: false })
  }

  const payCustom = (debt: Debt) => {
    const n = Number(rows[debt.id]?.customValue.replace(/[$,\s]/g, '') ?? '')
    if (!Number.isFinite(n) || n <= 0) return
    onPay(debt.id, n, 'custom')
    setRow(debt.id, { status: 'paid', appliedAmount: n, customMode: false, customValue: '' })
  }

  const skip = (debt: Debt) => setRow(debt.id, { status: 'skipped', customMode: false })

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-elev)] px-4 py-4">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
          Total balance, live
        </div>
        <div className="mono mt-1 text-[26px] font-semibold tracking-tight">
          {formatCurrency(total)}
        </div>
        <div className="mt-1 text-[12px] text-[var(--color-text-muted)]">
          {paidCount} of {debts.length} paid · {decidedCount} of {debts.length} decided
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {debts.map(debt => {
          const row = rows[debt.id] ?? initialRow()
          const live = liveBalance(debt, now)
          const isPaid = row.status === 'paid'
          const isSkipped = row.status === 'skipped'

          return (
            <li
              key={debt.id}
              className={
                'rounded-xl border p-4 transition-colors ' +
                (isPaid
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] pulse-accent'
                  : isSkipped
                    ? 'border-[var(--color-border)] opacity-60'
                    : 'border-[var(--color-border-strong)] bg-[var(--color-surface)]')
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-medium">{debt.name}</div>
                  <div className="mono mt-1 text-[18px] tracking-tight">
                    {formatCurrency(live)}
                  </div>
                </div>
                {isPaid && row.appliedAmount != null ? (
                  <div
                    className="flex items-center gap-1 text-[12px]"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <Check size={14} /> Paid {formatCurrency(row.appliedAmount)}
                  </div>
                ) : isSkipped ? (
                  <div className="text-[12px] text-[var(--color-text-dim)]">Skipped</div>
                ) : null}
              </div>

              {!isPaid && !isSkipped ? (
                row.customMode ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      payCustom(debt)
                    }}
                    className="mt-3 flex flex-wrap items-center gap-2"
                  >
                    <span className="mono text-[var(--color-text-dim)]">$</span>
                    <input
                      autoFocus
                      className="field field-num flex-1 min-w-[120px]"
                      inputMode="decimal"
                      placeholder={`>= ${debt.minimumPayment}`}
                      value={row.customValue}
                      onChange={e => setRow(debt.id, { customValue: e.target.value })}
                    />
                    <button type="submit" className="btn btn-primary">
                      Apply
                    </button>
                    <button
                      type="button"
                      onClick={() => setRow(debt.id, { customMode: false })}
                      className="btn btn-ghost"
                    >
                      Back
                    </button>
                  </form>
                ) : (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => payMinimum(debt)}
                      className="btn btn-secondary text-[12.5px]"
                    >
                      Min · {formatCurrency(debt.minimumPayment, { whole: true })}
                    </button>
                    <button
                      onClick={() => setRow(debt.id, { customMode: true })}
                      className="btn btn-secondary text-[12.5px]"
                    >
                      Custom
                    </button>
                    <button
                      onClick={() => skip(debt)}
                      className="btn btn-ghost text-[12.5px]"
                    >
                      Skip
                    </button>
                  </div>
                )
              ) : null}
            </li>
          )
        })}
      </ul>

      <div className="flex justify-end gap-2 border-t border-[var(--color-border)] pt-5">
        <button onClick={onDone} className="btn btn-primary">
          Done <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
