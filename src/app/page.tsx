'use client'

import { useEffect, useMemo, useState } from 'react'
import { Plus, RotateCcw, Database } from 'lucide-react'
import { useFinancialData } from '@/hooks/useFinancialData'
import { compareStrategies } from '@/lib/strategies'
import { AppShell, type Tab } from '@/components/AppShell'
import { DebtCard } from '@/components/DebtCard'
import { DebtForm } from '@/components/DebtForm'
import { Sheet } from '@/components/Sheet'
import { StrategyPanel } from '@/components/StrategyPanel'
import { QuickUpdate } from '@/components/QuickUpdate'
import { PayoffChart } from '@/components/PayoffChart'
import { EmptyState } from '@/components/EmptyState'
import type { Debt } from '@/lib/types'

type SheetMode =
  | { kind: 'closed' }
  | { kind: 'add' }
  | { kind: 'edit'; debt: Debt }
  | { kind: 'quick-update' }

export default function HomePage() {
  const data = useFinancialData()
  const [tab, setTab] = useState<Tab>('home')
  const [sheet, setSheet] = useState<SheetMode>({ kind: 'closed' })

  // Keyboard shortcuts: n = new debt, u = quick update, esc handled in Sheet
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (sheet.kind !== 'closed') return
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault()
        setSheet({ kind: 'add' })
      } else if ((e.key === 'u' || e.key === 'U') && data.state.debts.length > 0) {
        e.preventDefault()
        setSheet({ kind: 'quick-update' })
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [sheet.kind, data.state.debts.length])

  const debts = data.state.debts
  const hasDebts = debts.length > 0

  const comparison = useMemo(
    () => compareStrategies(debts, data.state.strategy, data.state.extraMonthly),
    [debts, data.state.strategy, data.state.extraMonthly]
  )

  if (!data.isReady) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-[var(--color-text-dim)]">
        <span className="mono text-sm">Loading…</span>
      </div>
    )
  }

  return (
    <>
      <AppShell
        debts={debts}
        tab={tab}
        onTabChange={setTab}
        onAddDebt={() => setSheet({ kind: 'add' })}
        onQuickUpdate={() => setSheet({ kind: 'quick-update' })}
        hasDebts={hasDebts}
      />

      <main
        className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6 md:pb-12"
        style={{ paddingTop: '24px' }}
      >
        {!hasDebts ? (
          <EmptyState
            onAdd={() => setSheet({ kind: 'add' })}
            onDemo={() => data.seedDemo()}
          />
        ) : (
          <>
            {/* Mobile: switch on tab. Desktop: show everything. */}
            <div className={tab === 'home' ? 'block' : 'hidden md:block'}>
              <PayoffChart
                active={comparison.active}
                baseline={comparison.baseline}
                className="mb-5"
              />
            </div>

            <div className={tab === 'strategy' ? 'block md:mt-0' : 'hidden md:block md:mt-0'}>
              <StrategyPanel
                debts={debts}
                strategy={data.state.strategy}
                extraMonthly={data.state.extraMonthly}
                onStrategyChange={data.setStrategy}
                onExtraChange={data.setExtraMonthly}
              />
            </div>

            <div
              className={
                'mt-5 ' + (tab === 'home' || tab === 'update' ? 'block' : 'hidden md:block')
              }
            >
              <SectionHeader
                title="Your debts"
                trailing={
                  <button
                    onClick={() => setSheet({ kind: 'add' })}
                    className="btn btn-ghost text-[12.5px]"
                  >
                    <Plus size={14} /> Add another
                  </button>
                }
              />
              <div className="grid gap-4 md:grid-cols-2">
                {debts.map((debt, idx) => (
                  <div
                    key={debt.id}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    className="fade-up"
                  >
                    <DebtCard
                      debt={debt}
                      onEdit={() => setSheet({ kind: 'edit', debt })}
                      onQuickPay={() => setSheet({ kind: 'quick-update' })}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={tab === 'settings' ? 'block' : 'hidden md:block'}>
              <SettingsBlock
                providerId={data.providerId}
                onReset={() => {
                  if (confirm('Erase all debts and payment history? This cannot be undone.')) {
                    data.resetAll()
                  }
                }}
                onSeedDemo={() => {
                  if (
                    debts.length === 0 ||
                    confirm('Replace current data with sample debts?')
                  ) {
                    data.resetAll()
                    data.seedDemo()
                  }
                }}
              />
            </div>
          </>
        )}
      </main>

      <Sheet
        open={sheet.kind === 'add'}
        onClose={() => setSheet({ kind: 'closed' })}
        title="Add a debt"
        description="Be precise. The math is only as accurate as your inputs."
      >
        {sheet.kind === 'add' ? (
          <DebtForm
            onSubmit={input => {
              data.addDebt(input)
              setSheet({ kind: 'closed' })
            }}
            onCancel={() => setSheet({ kind: 'closed' })}
          />
        ) : null}
      </Sheet>

      <Sheet
        open={sheet.kind === 'edit'}
        onClose={() => setSheet({ kind: 'closed' })}
        title="Edit debt"
      >
        {sheet.kind === 'edit' ? (
          <DebtForm
            debt={sheet.debt}
            onSubmit={input => {
              data.updateDebt(sheet.debt.id, input)
              setSheet({ kind: 'closed' })
            }}
            onDelete={() => {
              data.deleteDebt(sheet.debt.id)
              setSheet({ kind: 'closed' })
            }}
            onCancel={() => setSheet({ kind: 'closed' })}
          />
        ) : null}
      </Sheet>

      <Sheet
        open={sheet.kind === 'quick-update'}
        onClose={() => setSheet({ kind: 'closed' })}
        title="Update balances"
        description="One tap per debt. Interest accrued since you last reconciled is rolled in."
      >
        {sheet.kind === 'quick-update' ? (
          <QuickUpdate
            debts={debts}
            onPay={(id, amount, kind) => data.recordPayment(id, amount, kind)}
            onDone={() => setSheet({ kind: 'closed' })}
          />
        ) : null}
      </Sheet>
    </>
  )
}

function SectionHeader({
  title,
  trailing,
}: {
  title: string
  trailing?: React.ReactNode
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-dim)]">
        {title}
      </h2>
      {trailing}
    </div>
  )
}

function SettingsBlock({
  providerId,
  onReset,
  onSeedDemo,
}: {
  providerId: 'manual' | 'plaid'
  onReset: () => void
  onSeedDemo: () => void
}) {
  return (
    <section className="surface mt-5 flex flex-col gap-4 p-5 md:p-6 fade-up">
      <SectionHeader title="Settings" />
      <div className="flex flex-col gap-3 text-[13px]">
        <Row
          label="Data source"
          value={providerId === 'manual' ? 'Manual entry · localStorage' : 'Plaid (connected)'}
          icon={<Database size={14} />}
        />
        <Row
          label="Storage location"
          value="This device only. Nothing leaves your browser."
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-4">
        <button onClick={onSeedDemo} className="btn btn-secondary text-[12.5px]">
          Reload sample data
        </button>
        <button onClick={onReset} className="btn btn-danger text-[12.5px]">
          <RotateCcw size={14} /> Reset everything
        </button>
      </div>
    </section>
  )
}

function Row({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-[var(--color-text-muted)]">
        {icon}
        {label}
      </span>
      <span className="text-right text-[var(--color-text)]">{value}</span>
    </div>
  )
}
