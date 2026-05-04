'use client'

import {
  CreditCard,
  GraduationCap,
  Car,
  Home,
  Wallet,
  HeartPulse,
  Coins,
  Pencil,
  ChevronRight,
} from 'lucide-react'
import type { Debt, DebtType } from '@/lib/types'
import { useNow } from '@/hooks/useNow'
import {
  forecastEndOfMonth,
  liveBalance,
  monthsToPayoff,
  payoffDate,
  payoffPercent,
} from '@/lib/finance'
import {
  formatCurrency,
  formatLongDate,
  formatMonths,
  formatPercent,
  ordinalDay,
} from '@/lib/format'
import { ProgressBar } from './ProgressBar'
import { LiveInterest } from './LiveInterest'

const typeMeta: Record<DebtType, { label: string; Icon: React.ComponentType<{ size?: number }> }> = {
  credit_card:  { label: 'Credit card',   Icon: CreditCard },
  student_loan: { label: 'Student loan',  Icon: GraduationCap },
  auto:         { label: 'Auto loan',     Icon: Car },
  mortgage:     { label: 'Mortgage',      Icon: Home },
  personal:     { label: 'Personal loan', Icon: Wallet },
  medical:      { label: 'Medical',       Icon: HeartPulse },
  other:        { label: 'Other',         Icon: Coins },
}

type Props = {
  debt: Debt
  onEdit: () => void
  onQuickPay?: () => void
}

export function DebtCard({ debt, onEdit, onQuickPay }: Props) {
  const now = useNow(1000)
  const live = liveBalance(debt, now)
  const pct = payoffPercent({ ...debt, currentBalance: live })
  const meta = typeMeta[debt.type]
  const Icon = meta.Icon

  const months = monthsToPayoff(live, debt.apr, debt.monthlyPayment)
  const date = payoffDate(months)
  const eom = forecastEndOfMonth(debt, new Date(now))

  const aprIsHigh = debt.apr >= 18
  const willNeverPayOff = !Number.isFinite(months)

  return (
    <article className="surface flex flex-col gap-5 p-5 fade-up transition-colors hover:border-[var(--color-border-strong)]">
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: 'var(--color-surface-elev)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border-strong)',
            }}
            aria-hidden
          >
            <Icon size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold tracking-tight">{debt.name}</h3>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
              <span>{meta.label}</span>
              <span className="text-[var(--color-text-dim)]">·</span>
              <span
                className="mono"
                style={{ color: aprIsHigh ? 'var(--color-danger)' : 'var(--color-text-muted)' }}
              >
                {formatPercent(debt.apr)} APR
              </span>
              <span className="text-[var(--color-text-dim)]">·</span>
              <span>Due {ordinalDay(debt.dueDayOfMonth)}</span>
            </div>
          </div>
        </div>
        <button onClick={onEdit} className="icon-btn" aria-label={`Edit ${debt.name}`}>
          <Pencil size={15} />
        </button>
      </header>

      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Balance
          </div>
          <div className="mono text-[28px] font-semibold leading-none tracking-tight">
            {formatCurrency(live)}
          </div>
        </div>
        <LiveInterest debt={debt} />
      </div>

      <div>
        <ProgressBar percent={pct} />
        <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-text-dim)]">
          <span>
            <span className="mono text-[var(--color-text-muted)]">{pct.toFixed(1)}%</span>{' '}
            paid off
          </span>
          <span className="mono text-[var(--color-text-dim)]">
            of {formatCurrency(debt.originalBalance, { whole: true })}
          </span>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--color-border)] pt-4 text-[12px]">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Min payment
          </dt>
          <dd className="mono mt-1 text-[var(--color-text)]">
            {formatCurrency(debt.minimumPayment)}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Your monthly
          </dt>
          <dd className="mono mt-1 text-[var(--color-text)]">
            {formatCurrency(debt.monthlyPayment)}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Payoff date
          </dt>
          <dd className="mono mt-1 text-[var(--color-text)]">
            {willNeverPayOff ? '—' : date ? formatLongDate(date) : '—'}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Time to clear
          </dt>
          <dd className="mono mt-1" style={{ color: willNeverPayOff ? 'var(--color-danger)' : 'var(--color-accent)' }}>
            {willNeverPayOff ? 'Never at this rate' : formatMonths(months)}
          </dd>
        </div>
      </dl>

      <div
        className="flex items-center justify-between rounded-lg border border-dashed border-[var(--color-border-strong)] px-3 py-2.5 text-[12px]"
      >
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Projected end of month
          </div>
          <div className="mono mt-0.5 text-[14px] font-medium">
            {formatCurrency(eom.balEOM)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Interest this month
          </div>
          <div
            className="mono mt-0.5 text-[13px]"
            style={{ color: 'var(--color-danger)' }}
          >
            + {formatCurrency(eom.interestThisMonth)}
          </div>
        </div>
      </div>

      {onQuickPay ? (
        <button
          onClick={onQuickPay}
          className="btn btn-secondary justify-between"
          aria-label={`Record a payment for ${debt.name}`}
        >
          <span>Record payment</span>
          <ChevronRight size={16} />
        </button>
      ) : null}
    </article>
  )
}
