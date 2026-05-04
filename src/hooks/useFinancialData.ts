'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { dataProvider } from '@/lib/providers'
import { reconcile } from '@/lib/finance'
import { makeId } from '@/lib/id'
import type {
  AppState,
  Debt,
  DebtInput,
  PaymentKind,
  Strategy,
} from '@/lib/types'
import { EMPTY_STATE } from '@/lib/types'

export type FinancialData = {
  state: AppState
  isLoading: boolean
  isReady: boolean
  providerId: 'manual' | 'plaid'
  addDebt: (input: DebtInput) => Debt
  updateDebt: (id: string, patch: Partial<Debt>) => void
  deleteDebt: (id: string) => void
  recordPayment: (debtId: string, amount: number, kind: PaymentKind) => void
  setStrategy: (s: Strategy) => void
  setExtraMonthly: (n: number) => void
  resetAll: () => void
  seedDemo: () => void
  refresh: () => Promise<void>
  syncFromInstitution: () => Promise<{ updated: number } | null>
}

const DEMO: DebtInput[] = [
  {
    name: 'Chase Sapphire',
    type: 'credit_card',
    apr: 24.99,
    currentBalance: 6480.32,
    originalBalance: 8200,
    minimumPayment: 145,
    monthlyPayment: 350,
    dueDayOfMonth: 14,
  },
  {
    name: 'Federal Student Loan',
    type: 'student_loan',
    apr: 6.8,
    currentBalance: 18420.15,
    originalBalance: 24000,
    minimumPayment: 220,
    monthlyPayment: 280,
    dueDayOfMonth: 1,
  },
  {
    name: 'Auto Loan — 4Runner',
    type: 'auto',
    apr: 4.5,
    currentBalance: 12800,
    originalBalance: 22000,
    minimumPayment: 410,
    monthlyPayment: 410,
    dueDayOfMonth: 22,
  },
]

function buildDebt(input: DebtInput): Debt {
  const now = new Date().toISOString()
  return {
    id: makeId(),
    name: input.name,
    type: input.type,
    apr: input.apr,
    currentBalance: input.currentBalance,
    originalBalance:
      input.originalBalance != null ? input.originalBalance : input.currentBalance,
    minimumPayment: input.minimumPayment,
    monthlyPayment: input.monthlyPayment,
    dueDayOfMonth: input.dueDayOfMonth,
    balanceAsOf: now,
    createdAt: now,
    updatedAt: now,
  }
}

export function useFinancialData(): FinancialData {
  const [state, setState] = useState<AppState>(EMPTY_STATE)
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const skipPersist = useRef(true)

  useEffect(() => {
    let cancelled = false
    dataProvider
      .load()
      .then(loaded => {
        if (cancelled) return
        setState(loaded)
        setIsLoading(false)
        setIsReady(true)
        // first commit after load shouldn't write back
        queueMicrotask(() => {
          skipPersist.current = false
        })
      })
      .catch(() => {
        if (cancelled) return
        setIsLoading(false)
        setIsReady(true)
        skipPersist.current = false
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isReady) return
    if (skipPersist.current) return
    void dataProvider.save(state)
  }, [state, isReady])

  const addDebt = useCallback((input: DebtInput): Debt => {
    const debt = buildDebt(input)
    setState(s => ({ ...s, debts: [...s.debts, debt] }))
    return debt
  }, [])

  const updateDebt = useCallback((id: string, patch: Partial<Debt>) => {
    setState(s => ({
      ...s,
      debts: s.debts.map(d =>
        d.id === id ? { ...d, ...patch, updatedAt: new Date().toISOString() } : d
      ),
    }))
  }, [])

  const deleteDebt = useCallback((id: string) => {
    setState(s => ({
      ...s,
      debts: s.debts.filter(d => d.id !== id),
      payments: s.payments.filter(p => p.debtId !== id),
    }))
  }, [])

  const recordPayment = useCallback((debtId: string, amount: number, kind: PaymentKind) => {
    setState(s => {
      const debt = s.debts.find(d => d.id === debtId)
      if (!debt || amount <= 0) return s
      const now = Date.now()
      const { newBalance, interestAccrued, balanceBefore } = reconcile(debt, amount, now)
      const nowIso = new Date(now).toISOString()
      const updated: Debt = {
        ...debt,
        currentBalance: newBalance,
        balanceAsOf: nowIso,
        updatedAt: nowIso,
      }
      return {
        ...s,
        debts: s.debts.map(d => (d.id === debtId ? updated : d)),
        payments: [
          ...s.payments,
          {
            id: makeId(),
            debtId,
            amount,
            date: nowIso,
            kind,
            balanceBefore,
            balanceAfter: newBalance,
            interestAccrued,
          },
        ],
      }
    })
  }, [])

  const setStrategy = useCallback((strategy: Strategy) => {
    setState(s => ({ ...s, strategy }))
  }, [])

  const setExtraMonthly = useCallback((extraMonthly: number) => {
    setState(s => ({ ...s, extraMonthly: Math.max(0, extraMonthly) }))
  }, [])

  const resetAll = useCallback(() => {
    setState({ ...EMPTY_STATE })
  }, [])

  const seedDemo = useCallback(() => {
    setState(s => ({ ...s, debts: DEMO.map(buildDebt) }))
  }, [])

  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      const loaded = await dataProvider.load()
      setState(loaded)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const syncFromInstitution = useCallback(async () => {
    if (!dataProvider.syncFromInstitution) return null
    return dataProvider.syncFromInstitution()
  }, [])

  return {
    state,
    isLoading,
    isReady,
    providerId: dataProvider.id,
    addDebt,
    updateDebt,
    deleteDebt,
    recordPayment,
    setStrategy,
    setExtraMonthly,
    resetAll,
    seedDemo,
    refresh,
    syncFromInstitution,
  }
}
