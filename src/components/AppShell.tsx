'use client'

import { Plus, ListChecks, Home, BarChart3, Settings } from 'lucide-react'
import type { Debt } from '@/lib/types'
import { useNow } from '@/hooks/useNow'
import { liveBalance } from '@/lib/finance'
import { formatCurrency } from '@/lib/format'
import { Numeric } from './Numeric'
import { LiveInterestTotal } from './LiveInterest'

export type Tab = 'home' | 'strategy' | 'update' | 'settings'

type Props = {
  debts: Debt[]
  tab: Tab
  onTabChange: (t: Tab) => void
  onAddDebt: () => void
  onQuickUpdate: () => void
  hasDebts: boolean
}

export function AppShell({
  debts,
  tab,
  onTabChange,
  onAddDebt,
  onQuickUpdate,
  hasDebts,
}: Props) {
  const now = useNow(1000)
  const totalLive = debts.reduce((s, d) => s + liveBalance(d, now), 0)
  const totalOriginal = debts.reduce(
    (s, d) => s + Math.max(d.originalBalance, d.currentBalance),
    0
  )
  const cleared = Math.max(0, totalOriginal - totalLive)
  const pctCleared = totalOriginal > 0 ? (cleared / totalOriginal) * 100 : 0

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md"
            style={{
              background: 'var(--color-accent-soft)',
              color: 'var(--color-accent)',
              border: '1px solid rgba(52,211,153,0.25)',
            }}
            aria-hidden
          >
            <span className="mono text-[13px] font-semibold">C</span>
          </div>
          <span className="text-[13px] font-semibold tracking-tight">Clearance</span>
        </div>

        {/* Total balance — center on desktop */}
        {hasDebts ? (
          <div className="hidden flex-col items-center text-center md:flex">
            <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-dim)]">
              Total balance, live
            </span>
            <Numeric
              value={totalLive}
              className="text-[28px] font-semibold leading-tight tracking-tight"
            />
            <span className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">
              <span className="mono text-[var(--color-accent)]">
                {pctCleared.toFixed(1)}%
              </span>{' '}
              cleared · {formatCurrency(cleared, { whole: true })}
            </span>
          </div>
        ) : (
          <div className="hidden md:block" />
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {hasDebts ? (
            <button onClick={onQuickUpdate} className="btn btn-secondary text-[12.5px]">
              <ListChecks size={15} />
              <span className="hidden sm:inline">Quick update</span>
            </button>
          ) : null}
          <button onClick={onAddDebt} className="btn btn-primary text-[12.5px]">
            <Plus size={15} />
            <span className="hidden sm:inline">Add debt</span>
          </button>
        </div>
      </div>

      {/* Mobile: stacked total under top bar */}
      {hasDebts ? (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 md:hidden">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
                Total balance, live
              </div>
              <Numeric
                value={totalLive}
                className="text-[26px] font-semibold tracking-tight leading-none"
              />
              <div className="mt-1 text-[11px] text-[var(--color-text-muted)]">
                <span className="mono text-[var(--color-accent)]">
                  {pctCleared.toFixed(1)}%
                </span>{' '}
                cleared
              </div>
            </div>
            <LiveInterestTotal debts={debts} className="items-end text-right" />
          </div>
        </div>
      ) : null}

      {/* Mobile bottom tab bar */}
      {hasDebts ? <MobileTabBar tab={tab} onTabChange={onTabChange} /> : null}
    </header>
  )
}

function MobileTabBar({ tab, onTabChange }: { tab: Tab; onTabChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'strategy', label: 'Strategy', Icon: BarChart3 },
    { id: 'update', label: 'Update', Icon: ListChecks },
    { id: 'settings', label: 'Settings', Icon: Settings },
  ]
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {tabs.map(({ id, label, Icon }) => {
          const active = tab === id
          return (
            <li key={id} className="flex-1">
              <button
                onClick={() => onTabChange(id)}
                className="flex w-full flex-col items-center gap-1 py-2.5 text-[10px] uppercase tracking-wider transition-colors"
                style={{
                  color: active ? 'var(--color-accent)' : 'var(--color-text-dim)',
                }}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
