'use client'

import type { Debt } from '@/lib/types'
import { dailyInterestAt, liveBalance } from '@/lib/finance'
import { useNow } from '@/hooks/useNow'
import { formatCurrency } from '@/lib/format'

type Props = {
  debt: Debt
  className?: string
  showLabel?: boolean
}

export function LiveInterest({ debt, className, showLabel = true }: Props) {
  const now = useNow(1000)
  const live = liveBalance(debt, now)
  const daily = dailyInterestAt(live, debt.apr)
  const perSecond = daily / 86400
  // Show interest accrued in the last 24h continuously by stepping per second.
  const seconds = (now / 1000) % 86400
  const accrued = perSecond * seconds

  return (
    <div className={`flex items-baseline gap-2 ${className ?? ''}`}>
      <span
        className="mono text-[13px] tracking-tight"
        style={{ color: 'var(--color-danger)' }}
        aria-label="interest accrued today"
      >
        + {formatCurrency(accrued, { micro: true })}
      </span>
      {showLabel ? (
        <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
          today
        </span>
      ) : null}
    </div>
  )
}

type AggProps = {
  debts: Debt[]
  className?: string
}

export function LiveInterestTotal({ debts, className }: AggProps) {
  const now = useNow(1000)
  let totalDaily = 0
  for (const d of debts) {
    const live = liveBalance(d, now)
    totalDaily += dailyInterestAt(live, d.apr)
  }
  const perSecond = totalDaily / 86400
  const seconds = (now / 1000) % 86400
  const accruedToday = perSecond * seconds

  return (
    <div className={`flex flex-col gap-1 ${className ?? ''}`}>
      <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
        Interest accruing today
      </span>
      <span
        className="mono text-base font-medium"
        style={{ color: 'var(--color-danger)' }}
      >
        + {formatCurrency(accruedToday, { micro: true })}
      </span>
    </div>
  )
}
