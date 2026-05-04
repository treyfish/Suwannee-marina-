'use client'

import { useMemo } from 'react'
import type { Debt, Strategy } from '@/lib/types'
import { compareStrategies } from '@/lib/strategies'
import { formatCurrency, formatMonths } from '@/lib/format'
import { TrendingDown, Snowflake, Mountain } from 'lucide-react'

type Props = {
  debts: Debt[]
  strategy: Strategy
  extraMonthly: number
  onStrategyChange: (s: Strategy) => void
  onExtraChange: (n: number) => void
}

export function StrategyPanel({
  debts,
  strategy,
  extraMonthly,
  onStrategyChange,
  onExtraChange,
}: Props) {
  const comparison = useMemo(
    () => compareStrategies(debts, strategy, extraMonthly),
    [debts, strategy, extraMonthly]
  )

  const active = comparison.active
  const monthsSaved = comparison.monthsSavedVsBaseline
  const interestSaved = comparison.interestSavedVsBaseline
  const avalancheBetter =
    comparison.monthsAvalancheBeatsSnowball > 0 ||
    comparison.interestAvalancheBeatsSnowball > 0

  return (
    <section className="surface flex flex-col gap-5 p-5 md:p-6 fade-up">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Strategy
          </div>
          <h2 className="mt-1 text-lg font-semibold tracking-tight">
            Choose your line.
          </h2>
        </div>

        <div
          className="inline-flex items-center rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-elev)] p-1"
          role="tablist"
          aria-label="Payoff strategy"
        >
          <StrategyTab
            active={strategy === 'avalanche'}
            onClick={() => onStrategyChange('avalanche')}
            label="Avalanche"
            sublabel="Highest APR first"
            Icon={Mountain}
          />
          <StrategyTab
            active={strategy === 'snowball'}
            onClick={() => onStrategyChange('snowball')}
            label="Snowball"
            sublabel="Smallest balance first"
            Icon={Snowflake}
          />
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            Extra monthly payment
          </span>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={1500}
              step={25}
              value={extraMonthly}
              onChange={e => onExtraChange(Number(e.target.value))}
              className="flex-1 accent-[var(--color-accent)]"
              aria-label="Extra monthly payment"
            />
            <input
              className="field field-num w-28 text-right"
              inputMode="decimal"
              value={extraMonthly}
              onChange={e => {
                const n = Number(e.target.value.replace(/[$,\s]/g, ''))
                onExtraChange(Number.isFinite(n) ? n : 0)
              }}
              aria-label="Extra monthly amount"
            />
          </div>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat
          label="Debt-free in"
          value={formatMonths(active.monthsToDebtFree)}
          Icon={TrendingDown}
        />
        <Stat
          label="Total interest paid"
          value={formatCurrency(active.totalInterest, { whole: true })}
          tone="danger"
        />
        <Stat
          label="Vs minimum-only"
          value={
            monthsSaved > 0 || interestSaved > 0
              ? `${formatMonths(Math.max(0, monthsSaved))} saved`
              : '—'
          }
          sublabel={
            interestSaved > 0
              ? `${formatCurrency(interestSaved, { whole: true })} less in interest`
              : 'Add extra to save more'
          }
          tone="accent"
        />
      </div>

      <div className="rounded-lg border border-dashed border-[var(--color-border-strong)] px-4 py-3 text-[12.5px] text-[var(--color-text-muted)]">
        {extraMonthly === 0 ? (
          <>
            Add an extra <span className="text-[var(--color-text)]">monthly amount</span> above to
            see how much faster you clear.{' '}
            {Number.isFinite(comparison.avalanche.monthsToDebtFree) ? (
              <>
                At your current monthly payments alone, you&apos;re debt-free in{' '}
                <span className="mono text-[var(--color-text)]">
                  {formatMonths(comparison.avalanche.monthsToDebtFree)}
                </span>
                .
              </>
            ) : (
              <>Some debts won&apos;t pay off at the current monthly amount.</>
            )}
          </>
        ) : avalancheBetter && strategy !== 'avalanche' ? (
          <>
            Avalanche pays off{' '}
            <span className="mono text-[var(--color-accent)]">
              {formatCurrency(
                Math.max(0, comparison.interestAvalancheBeatsSnowball),
                { whole: true }
              )}
            </span>{' '}
            less in interest than snowball with this plan.
          </>
        ) : strategy === 'avalanche' && comparison.interestAvalancheBeatsSnowball > 0 ? (
          <>
            Avalanche is the math-optimal choice — saves you{' '}
            <span className="mono text-[var(--color-accent)]">
              {formatCurrency(comparison.interestAvalancheBeatsSnowball, { whole: true })}
            </span>{' '}
            more than snowball.
          </>
        ) : (
          <>
            With these debts, snowball and avalanche end at roughly the same place. Pick
            whichever feels more motivating.
          </>
        )}
      </div>
    </section>
  )
}

function StrategyTab({
  active,
  onClick,
  label,
  sublabel,
  Icon,
}: {
  active: boolean
  onClick: () => void
  label: string
  sublabel: string
  Icon: React.ComponentType<{ size?: number }>
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={
        'flex items-center gap-2 rounded-md px-3 py-2 text-left transition-colors ' +
        (active
          ? 'bg-[var(--color-bg)] text-[var(--color-text)]'
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]')
      }
    >
      <Icon size={15} />
      <div className="flex flex-col">
        <span className="text-[12.5px] font-medium leading-none">{label}</span>
        <span className="mt-1 text-[10px] text-[var(--color-text-dim)] leading-none">
          {sublabel}
        </span>
      </div>
    </button>
  )
}

function Stat({
  label,
  value,
  sublabel,
  tone,
  Icon,
}: {
  label: string
  value: string
  sublabel?: string
  tone?: 'accent' | 'danger'
  Icon?: React.ComponentType<{ size?: number }>
}) {
  const color =
    tone === 'accent'
      ? 'var(--color-accent)'
      : tone === 'danger'
        ? 'var(--color-danger)'
        : 'var(--color-text)'
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elev)] px-4 py-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
        {Icon ? <Icon size={11} /> : null}
        {label}
      </div>
      <div className="mono mt-1.5 text-[18px] font-semibold leading-tight" style={{ color }}>
        {value}
      </div>
      {sublabel ? (
        <div className="mt-0.5 text-[11px] text-[var(--color-text-dim)]">{sublabel}</div>
      ) : null}
    </div>
  )
}
